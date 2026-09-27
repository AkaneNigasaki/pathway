import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { LuArrowRight as ArrowRight, LuBriefcase as Briefcase, LuChevronRight as ChevronRight, LuClock as Clock, LuFlag as Flag, LuLayers as Layers, LuMap as MapIcon, LuX as X } from "react-icons/lu";
import { RoadmapMap } from "../../components/RoadmapGraph/RoadmapMap";
import { RoadmapTimeline } from "../../components/RoadmapGraph/RoadmapTimeline";
import { SkillPanel } from "../../components/SkillPanel/SkillPanel";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Reveal } from "../../components/Reveal/Reveal";
import { getRoadmap, countProjects, getSkill, skillDepth } from "../../data/roadmaps";
import { getField } from "../../data/fields";
import { getBranchGuide } from "../../data/branch-guides";
import { CAREER_MAP } from "../../data/careers";
import { useProgress, progressPercent } from "../../hooks/useProgress";
import type { Skill } from "../../types";
import { NotFound } from "../NotFound/NotFound";
import styles from "./RoadmapDetail.module.css";

export function RoadmapDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const roadmap = slug ? getRoadmap(slug) : undefined;
  const [selected, setSelected] = useState<Skill | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  /** Vue principale : progression verticale. La carte reste accessible en second. */
  const [view, setView] = useState<"timeline" | "map">("timeline");
  /** Branche mise en évidence sur la carte (?stage= ou chips d'étapes). */
  const [highlightStage, setHighlightStage] = useState<string | null>(null);

  const { status, cycle, setStatus, doneCount, inProgressCount } = useProgress(
    roadmap?.id ?? ""
  );
  const field = roadmap ? getField(roadmap.fieldId) : undefined;

  // Ouverture directe d'une compétence via ?skill= (command palette, recherche).
  useEffect(() => {
    if (!roadmap) return;
    const skillId = searchParams.get("skill");
    if (skillId) {
      const s = getSkill(roadmap, skillId);
      if (s) {
        setSelected(s);
        setSearchParams({}, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roadmap]);

  // Navigation directe vers une branche via ?stage= (cartes de la page filière).
  useEffect(() => {
    if (!roadmap) return;
    const stageId = searchParams.get("stage");
    if (stageId && roadmap.stages.some((s) => s.id === stageId)) {
      setHighlightStage(stageId);
      const t = window.setTimeout(() => {
        scrollToStage(stageId);
        setSearchParams({}, { replace: true });
      }, 400);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roadmap, searchParams]);

  // Verrouille le scroll quand la carte plein écran est ouverte.
  useEffect(() => {
    if (!mapOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mapOpen]);

  const percent = useMemo(
    () => (roadmap ? progressPercent(doneCount, roadmap.skills.length) : 0),
    [doneCount, roadmap]
  );

  const careers = useMemo(
    () =>
      roadmap
        ? roadmap.careerSlugs
            .map((s) => CAREER_MAP[s])
            .filter((c): c is NonNullable<typeof c> => Boolean(c))
        : [],
    [roadmap]
  );

  /** Suggestions globales : prêtes à apprendre, classées par profondeur. */
  const nextUp = useMemo(() => {
    if (!roadmap) return [];
    return roadmap.skills
      .filter(
        (s) =>
          !status[s.id] && s.prerequisites.every((p) => status[p] === "done")
      )
      .sort((a, b) => skillDepth(roadmap, a.id) - skillDepth(roadmap, b.id))
      .slice(0, 6);
  }, [roadmap, status]);

  if (!roadmap) return <NotFound />;

  const scrollToStage = (stageId: string) => {
    const listEl = document.getElementById(`stage-${stageId}`);
    const target =
      view === "timeline" && listEl
        ? listEl
        : document.getElementById("roadmap-map");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const total = roadmap.skills.length;

  return (
    <div className={styles.page} style={{ "--field-accent": field?.accent } as React.CSSProperties}>
      <div className="scroll-progress" aria-hidden="true" />

      <div className="container">
        <Reveal>
          <nav className={styles.crumb} aria-label="Fil d'Ariane">
            <Link to="/" className={styles.crumbLink}>Home</Link>
            <ChevronRight size={14} aria-hidden="true" className={styles.crumbSep} />
            {field && (
              <>
                <Link to={`/fields/${field.id}`} className={styles.crumbLink}>
                  {field.name}
                </Link>
                <ChevronRight size={14} aria-hidden="true" className={styles.crumbSep} />
              </>
            )}
            <span aria-current="page" className={styles.crumbCurrent}>
              {roadmap.title}
            </span>
          </nav>
          {field && (
            <Link to={`/fields/${field.id}`} className={styles.crumbMobile}>
              <ChevronRight size={16} aria-hidden="true" className={styles.crumbBack} />
              {field.name}
            </Link>
          )}
        </Reveal>

        <Reveal className={styles.hero}>
          <p className={`${styles.field} fieldAccent`}>
            {field?.name.toUpperCase()}
          </p>
          <h1 className={styles.title}>{roadmap.title}</h1>
          <p className={styles.tagline}>{roadmap.tagline}</p>
          <p className={styles.desc}>{roadmap.description}</p>

          <div className={styles.statsGrid}>
            <div className={styles.progressBlock}>
              <ProgressBar value={percent} label="Progression" size="lg" />
              <p className={styles.progressHint}>
                {doneCount} terminée{doneCount > 1 ? "s" : ""}
                {inProgressCount > 0 &&
                  ` · ${inProgressCount} en cours`}
                {" "}sur {total}
              </p>
            </div>
            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt><Layers size={14} aria-hidden="true" /> Compétences</dt>
                <dd className="mono">{total}</dd>
              </div>
              <div className={styles.stat}>
                <dt><Flag size={14} aria-hidden="true" /> Projets</dt>
                <dd className="mono">{countProjects(roadmap)}</dd>
              </div>
              <div className={styles.stat}>
                <dt><Clock size={14} aria-hidden="true" /> Durée estimée</dt>
                <dd>{roadmap.duration}</dd>
              </div>
              <div className={styles.stat}>
                <dt>Niveau</dt>
                <dd className={styles.level}>{roadmap.levelLabel}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        {nextUp.length > 0 && (
          <Reveal className={styles.nextUp}>
            <h2 className={styles.nextUpTitle}>Prochaines étapes</h2>
            <p className={styles.nextUpHint}>
              Vos prérequis sont validés : plusieurs directions s'ouvrent, à vous de choisir.
            </p>
            <div className={styles.suggestGrid}>
              {nextUp.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={styles.suggestCard}
                  onClick={() => setSelected(s)}
                >
                  <span className={styles.suggestName}>{s.name}</span>
                  <span className={styles.suggestTag}>{s.tagline}</span>
                  <span className={styles.suggestGo}>
                    Explorer <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal className={styles.stageStrip} delay={80}>
          <nav aria-label="Étapes du parcours">
            <ol className={styles.stages}>
              {roadmap.stages.map((stage, i) => {
                const stageSkills = roadmap.skills.filter((s) => s.stage === stage.id);
                const done = stageSkills.filter((s) => status[s.id] === "done").length;
                const allDone = done === stageSkills.length && stageSkills.length > 0;
                return (
                  <li key={stage.id}>
                    <button
                      type="button"
                      className={`${styles.stageChip} ${allDone ? styles.stageDone : ""} ${
                        highlightStage === stage.id ? styles.stageActive : ""
                      }`}
                      aria-pressed={highlightStage === stage.id}
                      onClick={() => {
                        setHighlightStage((prev) => (prev === stage.id ? null : stage.id));
                        scrollToStage(stage.id);
                      }}
                    >
                      <span className={`${styles.stageNum} mono`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.stageName}>{stage.label}</span>
                      <span className={`${styles.stagePct} mono`}>{done}/{stageSkills.length}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </Reveal>

        {highlightStage && (() => {
          const activeStage = roadmap.stages.find((s) => s.id === highlightStage);
          if (!activeStage) return null;
          const branchGuide = getBranchGuide(activeStage.id);
          const stageSkills = roadmap.skills
            .filter((s) => s.stage === activeStage.id)
            .sort((a, b) => skillDepth(roadmap, a.id) - skillDepth(roadmap, b.id));
          const stageIndex = roadmap.stages.findIndex((s) => s.id === activeStage.id);
          const entrySkill = branchGuide?.entrySkillId
            ? getSkill(roadmap, branchGuide.entrySkillId)
            : undefined;
          return (
            <section className={styles.stageIntro} aria-label={`Introduction : ${activeStage.label}`}>
              <p className={`${styles.stageIntroEyebrow} mono`}>
                {stageIndex >= 0 ? `ÉTAPE ${String(stageIndex + 1).padStart(2, "0")}` : "ÉTAPE"}
              </p>
              <h2 className={styles.stageIntroTitle}>{activeStage.label}</h2>
              <p className={styles.stageIntroText}>
                {branchGuide?.intro ?? activeStage.description}
              </p>
              {entrySkill && (
                <button
                  type="button"
                  className={styles.stageIntroEntry}
                  onClick={() => setSelected(entrySkill)}
                >
                  Point d'entrée recommandé : {entrySkill.name} <ArrowRight size={14} aria-hidden="true" />
                </button>
              )}
              {stageSkills.length > 0 && (
                <>
                  <h3 className={styles.stageIntroSub}>Ce que vous allez apprendre</h3>
                  <ul className={styles.stageIntroSkills}>
                    {stageSkills.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          className={styles.stageIntroSkill}
                          onClick={() => setSelected(s)}
                        >
                          <span
                            className={`${styles.stageIntroDot} ${status[s.id] === "done" ? styles.stageIntroDotDone : ""}`}
                            aria-hidden="true"
                          />
                          {s.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          );
        })()}

        <div className={styles.viewBar}>
          <p className={`${styles.roadmapKicker} mono`}>Roadmap</p>
          <div className={styles.viewToggle} role="group" aria-label="Choisir la vue">
            <button
              type="button"
              className={`${styles.viewBtn} ${view === "timeline" ? styles.viewOn : ""}`}
              aria-pressed={view === "timeline"}
              onClick={() => setView("timeline")}
            >
              Verticale
            </button>
            <button
              type="button"
              className={`${styles.viewBtn} ${view === "map" ? styles.viewOn : ""}`}
              aria-pressed={view === "map"}
              onClick={() => setView("map")}
            >
              Carte
            </button>
          </div>
        </div>

        {view === "timeline" ? (
          <RoadmapTimeline
            roadmap={roadmap}
            status={status}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
            onCycle={cycle}
          />
        ) : (
          <div className={styles.graphWrap} id="roadmap-map">
            <RoadmapMap
              roadmap={roadmap}
              status={status}
              selectedId={selected?.id ?? null}
              onSelect={setSelected}
              onCycle={cycle}
              highlightStage={highlightStage}
            />
            <button
              type="button"
              className={styles.mapFab}
              onClick={() => setMapOpen(true)}
              aria-label="Ouvrir la carte en plein écran"
            >
              <MapIcon size={17} aria-hidden="true" /> Carte
            </button>
          </div>
        )}

        {careers.length > 0 && (
          <Reveal className={styles.careers}>
            <h2 className={styles.careersTitle}>Métiers visés</h2>
            <div className={styles.careerList}>
              {careers.map((c) => (
                <Link key={c.slug} to={`/careers/${c.slug}`} className={styles.careerLink}>
                  <Briefcase size={16} aria-hidden="true" />
                  <span>
                    <strong>{c.title}</strong>
                    <small>{c.tagline}</small>
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      {mapOpen && (
        <div
          className={styles.mapOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Carte des connaissances en plein écran"
        >
          <button
            type="button"
            className={styles.mapClose}
            onClick={() => setMapOpen(false)}
            aria-label="Fermer la carte"
          >
            <X size={18} aria-hidden="true" />
          </button>
          <RoadmapMap
            roadmap={roadmap}
            status={status}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
            onCycle={cycle}
            highlightStage={highlightStage}
            fullscreen
          />
        </div>
      )}

      {selected && (
        <SkillPanel
          skill={selected}
          roadmap={roadmap}
          statusMap={status}
          setStatus={setStatus}
          onSelect={setSelected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

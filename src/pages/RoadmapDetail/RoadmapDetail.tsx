import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Briefcase, Clock, Flag, Layers } from "lucide-react";
import { RoadmapGraph } from "../../components/RoadmapGraph/RoadmapGraph";
import { SkillPanel } from "../../components/SkillPanel/SkillPanel";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Reveal } from "../../components/Reveal/Reveal";
import { getRoadmap, countProjects, getSkill } from "../../data/roadmaps";
import { getField } from "../../data/fields";
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

  const { completed, toggle } = useProgress(roadmap?.id ?? "");
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

  const percent = useMemo(
    () => (roadmap ? progressPercent(completed.size, roadmap.skills.length) : 0),
    [completed, roadmap]
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

  if (!roadmap) return <NotFound />;

  const scrollToStage = (stageId: string) => {
    document.getElementById(`stage-${stageId}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page} style={{ "--accent": field?.accent } as React.CSSProperties}>
      <div className="scroll-progress" aria-hidden="true" />

      <div className="container">
        <Reveal>
          <Link to="/roadmaps" className={styles.back}>
            <ArrowLeft size={15} aria-hidden="true" /> Toutes les roadmaps
          </Link>
        </Reveal>

        <Reveal className={styles.hero}>
          <p className={styles.field} style={{ color: field?.accent }}>
            {field?.name.toUpperCase()}
          </p>
          <h1 className={styles.title}>{roadmap.title}</h1>
          <p className={styles.tagline}>{roadmap.tagline}</p>
          <p className={styles.desc}>{roadmap.description}</p>

          <div className={styles.statsGrid}>
            <div className={styles.progressBlock}>
              <ProgressBar value={percent} label="Progression" size="lg" />
              <p className={styles.progressHint}>
                {completed.size} compétence{completed.size > 1 ? "s" : ""} validée{completed.size > 1 ? "s" : ""} sur {roadmap.skills.length}
              </p>
            </div>
            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt><Layers size={14} aria-hidden="true" /> Compétences</dt>
                <dd className="mono">{roadmap.skills.length}</dd>
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

        <Reveal className={styles.stageStrip} delay={80}>
          <nav aria-label="Étapes du parcours">
            <ol className={styles.stages}>
              {roadmap.stages.map((stage, i) => {
                const stageSkills = roadmap.skills.filter((s) => s.stage === stage.id);
                const done = stageSkills.filter((s) => completed.has(s.id)).length;
                const allDone = done === stageSkills.length && stageSkills.length > 0;
                return (
                  <li key={stage.id}>
                    <button
                      type="button"
                      className={`${styles.stageChip} ${allDone ? styles.stageDone : ""}`}
                      onClick={() => scrollToStage(stage.id)}
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

        <div className={styles.graphWrap}>
          <RoadmapGraph
            roadmap={roadmap}
            completed={completed}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
            onToggle={toggle}
          />
        </div>

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

      {selected && (
        <SkillPanel
          skill={selected}
          roadmap={roadmap}
          completed={completed.has(selected.id)}
          onToggle={toggle}
          onSelect={setSelected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

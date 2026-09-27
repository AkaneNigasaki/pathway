import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LuArrowRight as ArrowRight, LuArrowUpRight as ArrowUpRight, LuBookOpen as BookOpen, LuCheck as Check, LuChevronRight as ChevronRight, LuClock as Clock, LuCompass as Compass, LuFlaskConical as FlaskConical, LuGauge as Gauge, LuLightbulb as Lightbulb, LuListChecks as ListChecks, LuLock as Lock, LuQuote as Quote, LuSparkles as Sparkles, LuWorkflow as Workflow, LuX as X } from "react-icons/lu";
import type { Roadmap, Skill, SkillLevel, SkillStatus } from "../../types";
import { SKILL_LEVEL_LABEL, NODE_TYPE_LABEL } from "../../types";
import type { ProgressMap } from "../../hooks/useProgress";
import { getNextSkills, skillMap } from "../../data/roadmaps";
import { getField } from "../../data/fields";
import { getSkillGuide } from "../../data/skill-guides";
import { FlowDiagram, SKILL_ILLUSTRATIONS } from "../illustrations";
import styles from "./SkillPanel.module.css";

interface SkillPanelProps {
  skill: Skill;
  roadmap: Roadmap;
  statusMap: ProgressMap;
  setStatus: (skillId: string, s: SkillStatus | null) => void;
  onSelect: (skill: Skill) => void;
  onClose: () => void;
}

interface Suggestion {
  skill: Skill;
  reason: string;
  ready: boolean;
}

const STATUS_OPTIONS: { value: SkillStatus | null; label: string }[] = [
  { value: null, label: "À faire" },
  { value: "in-progress", label: "En cours" },
  { value: "done", label: "Terminée" },
];

const COMPLEXITY: Record<SkillLevel, string> = {
  beginner: "Accessible",
  intermediate: "Modérée",
  advanced: "Élevée",
};

const LEVELS: SkillLevel[] = ["beginner", "intermediate", "advanced"];

/**
 * Panneau de détail d'une compétence : un guide pédagogique complet.
 * - Fil d'Ariane (où se situe la compétence)
 * - Introduction, définition, pourquoi l'apprendre, niveau
 * - Prérequis expliqués, concepts clés (accordéon), diagrammes de flux
 * - Exemple concret, projets progressifs, ressources
 * - « Vous êtes prêt pour » : suggestions classées
 * - Focus trap + restauration du focus
 */
export function SkillPanel({
  skill,
  roadmap,
  statusMap,
  setStatus,
  onSelect,
  onClose,
}: SkillPanelProps) {
  const [visible, setVisible] = useState(false);
  const [openConcept, setOpenConcept] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<Element | null>(null);
  const firstSkill = useRef(true);

  const map = useMemo(() => skillMap(roadmap), [roadmap]);
  const field = getField(roadmap.fieldId);
  const status = statusMap[skill.id] ?? null;
  const guide = getSkillGuide(roadmap.slug, skill.id);
  const stage = roadmap.stages.find((s) => s.id === skill.stage);
  const Illustration = guide?.illustration ? SKILL_ILLUSTRATIONS[guide.illustration] : null;
  const conceptDetails = guide?.conceptDetails ?? [];
  const projectsDetailed = guide?.projectsDetailed;

  const prereqSkills = skill.prerequisites
    .map((id) => map[id])
    .filter((s): s is Skill => Boolean(s));
  const nextSkills = getNextSkills(roadmap, skill.id);
  const relatedSkills = (skill.relatedSkills ?? [])
    .map((id) => map[id])
    .filter((s): s is Skill => Boolean(s) && s.id !== skill.id);

  const prereqsDone = prereqSkills.filter((p) => statusMap[p.id] === "done").length;

  /** Suggestions classées : dépendances prêtes → liées → dépendances verrouillées. */
  const suggestions: Suggestion[] = useMemo(() => {
    const ready: Suggestion[] = [];
    const locked: Suggestion[] = [];
    for (const n of nextSkills) {
      if (statusMap[n.id] === "done") continue;
      const missing = n.prerequisites.filter(
        (p) => p !== skill.id && statusMap[p] !== "done"
      ).length;
      if (missing === 0) ready.push({ skill: n, reason: "Suite directe", ready: true });
      else
        locked.push({
          skill: n,
          reason: `${missing} prérequis restant${missing > 1 ? "s" : ""}`,
          ready: false,
        });
    }
    const related = relatedSkills
      .filter((r) => statusMap[r.id] !== "done")
      .map((r) => ({ skill: r, reason: "Compétence liée", ready: true as boolean }));
    return [...ready, ...related, ...locked].slice(0, 6);
  }, [nextSkills, relatedSkills, statusMap, skill.id]);

  // Entrée animée, focus initial, restauration du focus à la fermeture.
  useEffect(() => {
    prevFocus.current = document.activeElement;
    const raf = requestAnimationFrame(() => setVisible(true));
    closeRef.current?.focus();
    return () => {
      cancelAnimationFrame(raf);
      if (prevFocus.current instanceof HTMLElement) prevFocus.current.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigation interne : le panneau reste monté, on le ré-affiche,
  // on remonte en haut et on referme l'accordéon.
  useEffect(() => {
    if (firstSkill.current) {
      firstSkill.current = false;
      return;
    }
    setOpenConcept(null);
    scrollRef.current?.scrollTo({ top: 0 });
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [skill.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setVisible(false);
    window.setTimeout(onClose, 300);
  };

  const goTo = (s: Skill) => {
    setVisible(false);
    window.setTimeout(() => onSelect(s), 120);
  };

  const typeLabel = NODE_TYPE_LABEL[skill.type ?? "concept"];

  return (
    <div className={styles.root} style={{ "--field-accent": field?.accent } as React.CSSProperties}>
      <div
        className={`${styles.overlay} ${visible ? styles.show : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <aside
        ref={panelRef}
        className={`${styles.panel} ${visible ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={`Détail : ${skill.name}`}
      >
        <div className={styles.handle} aria-hidden="true" />
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={handleClose}
          aria-label="Fermer le panneau"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div ref={scrollRef} className={styles.scroll}>
          <nav aria-label="Où se situe cette compétence" className={styles.crumb}>
            <Link to={`/fields/${roadmap.fieldId}`} onClick={handleClose}>
              {field?.name ?? roadmap.fieldId}
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            {stage ? (
              <Link to={`/roadmaps/${roadmap.slug}?stage=${stage.id}`} onClick={handleClose}>
                {stage.label}
              </Link>
            ) : (
              <span>{skill.stage}</span>
            )}
            <ChevronRight size={12} aria-hidden="true" />
            <span aria-current="page">{skill.name}</span>
          </nav>

          <p className={`${styles.eyebrow} fieldAccent`}>
            {roadmap.title.toUpperCase()}
          </p>
          <h2 className={styles.name}>{skill.name}</h2>
          <p className={styles.tagline}>{skill.tagline}</p>

          <div className={styles.badges}>
            <span className={styles.badge}>{typeLabel}</span>
            <span className={styles.badge}>{SKILL_LEVEL_LABEL[skill.level]}</span>
            <span className={styles.badge}>
              <Clock size={12} aria-hidden="true" /> {skill.duration}
            </span>
          </div>

          <div
            className={styles.statusGroup}
            role="group"
            aria-label={`Progression de ${skill.name}`}
          >
            {STATUS_OPTIONS.map((opt) => {
              const active =
                (opt.value === null && status === null) || opt.value === status;
              return (
                <button
                  key={opt.label}
                  type="button"
                  className={`${styles.statusOpt} ${active ? styles.statusActive : ""}`}
                  aria-pressed={active}
                  onClick={() => setStatus(skill.id, opt.value)}
                >
                  {opt.value === "done" && (
                    <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                  )}
                  {opt.label}
                </button>
              );
            })}
          </div>

          <section className={styles.block} aria-label="Introduction">
            <h3 className={styles.blockTitle}>
              <BookOpen size={13} aria-hidden="true" /> Introduction
            </h3>
            <p className={styles.description}>{skill.description}</p>
          </section>

          {Illustration && (
            <div className={styles.illusWrap}>
              <Illustration />
            </div>
          )}

          {guide?.definition && (
            <section className={styles.block} aria-label="Définition">
              <h3 className={styles.blockTitle}>
                <Quote size={13} aria-hidden="true" /> Définition
              </h3>
              <p className={styles.definition}>{guide.definition}</p>
            </section>
          )}

          {guide?.whyLearn && (
            <section className={styles.block} aria-label="Pourquoi l'apprendre">
              <h3 className={styles.blockTitle}>
                <Compass size={13} aria-hidden="true" /> Pourquoi l'apprendre ?
              </h3>
              <p className={styles.whyText}>{guide.whyLearn}</p>
            </section>
          )}

          <section className={styles.block} aria-label="Niveau de difficulté">
            <h3 className={styles.blockTitle}>
              <Gauge size={13} aria-hidden="true" /> Niveau
            </h3>
            <div className={styles.levelRow} role="img" aria-label={`Niveau : ${SKILL_LEVEL_LABEL[skill.level]}`}>
              {LEVELS.map((l) => (
                <span
                  key={l}
                  className={`${styles.levelDot} ${skill.level === l ? styles.levelDotActive : ""}`}
                  aria-hidden="true"
                >
                  <span className={styles.dot} />
                  {SKILL_LEVEL_LABEL[l]}
                </span>
              ))}
            </div>
            <dl className={styles.meta}>
              <div>
                <dt>Temps recommandé</dt>
                <dd>{skill.duration}</dd>
              </div>
              <div>
                <dt>Prérequis</dt>
                <dd>
                  {prereqSkills.length === 0
                    ? "Aucun — point d'entrée"
                    : `${prereqSkills.length} compétence${prereqSkills.length > 1 ? "s" : ""}`}
                </dd>
              </div>
              <div>
                <dt>Complexité</dt>
                <dd>{COMPLEXITY[skill.level]}</dd>
              </div>
            </dl>
          </section>

          {prereqSkills.length > 0 && (
            <section className={styles.block} aria-label="Prérequis expliqués">
              <h3 className={styles.blockTitle}>
                <Lock size={13} aria-hidden="true" /> Avant de commencer
                <span className={`${styles.count} mono`}>
                  {prereqsDone}/{prereqSkills.length}
                </span>
              </h3>
              <ul className={styles.prereqs}>
                {prereqSkills.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={styles.prereq}
                      onClick={() => goTo(p)}
                    >
                      <span className={styles.prereqHead}>
                        <span
                          className={`${styles.miniDot} ${statusDotClass(statusMap[p.id])}`}
                          aria-hidden="true"
                        />
                        <span className={styles.prereqName}>{p.name}</span>
                        <ChevronRight size={13} aria-hidden="true" />
                      </span>
                      <span className={styles.prereqNote}>
                        {guide?.prerequisiteNotes?.[p.id] ?? p.tagline}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {conceptDetails.length > 0 ? (
            <section className={styles.block} aria-label="Concepts clés">
              <h3 className={styles.blockTitle}>
                <ListChecks size={13} aria-hidden="true" /> Concepts clés
              </h3>
              <div className={styles.accordion}>
                {conceptDetails.map((c, i) => {
                  const open = openConcept === c.name;
                  const panelId = `concept-${skill.id}-${i}`;
                  return (
                    <div key={c.name} className={styles.accItem}>
                      <button
                        type="button"
                        className={styles.accButton}
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenConcept(open ? null : c.name)}
                      >
                        <code className="mono">{c.name}</code>
                        <ChevronRight
                          size={14}
                          aria-hidden="true"
                          className={`${styles.accChevron} ${open ? styles.accChevronOpen : ""}`}
                        />
                      </button>
                      {open && (
                        <p id={panelId} className={styles.accDef}>
                          {c.definition}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ) : (
            skill.concepts.length > 0 && (
              <section className={styles.block} aria-label="Concepts clés">
                <h3 className={styles.blockTitle}>
                  <ListChecks size={13} aria-hidden="true" /> Concepts
                </h3>
                <ul className={styles.list}>
                  {skill.concepts.map((c) => (
                    <li key={c} className={styles.concept}>
                      <code className="mono">{c}</code>
                    </li>
                  ))}
                </ul>
              </section>
            )
          )}

          {guide?.howItWorks && guide.howItWorks.length > 0 && (
            <section className={styles.block} aria-label={guide.howItWorksTitle ?? "Comment ça fonctionne"}>
              <h3 className={styles.blockTitle}>
                <Workflow size={13} aria-hidden="true" />{" "}
                {guide.howItWorksTitle ?? "Comment ça fonctionne"}
              </h3>
              <FlowDiagram
                steps={guide.howItWorks}
                label={`${guide.howItWorksTitle ?? "Fonctionnement"} de ${skill.name}`}
              />
            </section>
          )}

          {guide?.example && (
            <section className={styles.block} aria-label="Exemple concret">
              <h3 className={styles.blockTitle}>
                <Lightbulb size={13} aria-hidden="true" /> Exemple : {guide.example.title}
              </h3>
              <FlowDiagram
                steps={guide.example.steps}
                accentEnds
                label={`Exemple concret : ${guide.example.title}`}
              />
            </section>
          )}

          <section className={styles.block} aria-label="Projets pratiques">
            <h3 className={styles.blockTitle}>
              <FlaskConical size={13} aria-hidden="true" /> Mettez la compétence en pratique
            </h3>
            {projectsDetailed ? (
              <ol className={styles.projectsDetailed}>
                {projectsDetailed.map((p) => (
                  <li key={p.title}>
                    <span className={styles.projectTitle}>{p.title}</span>
                    {p.flow && <span className={`${styles.projectFlow} mono`}>{p.flow}</span>}
                  </li>
                ))}
              </ol>
            ) : (
              <ol className={styles.projects}>
                {skill.projects.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            )}
          </section>

          <section className={styles.block} aria-label="Ressources">
            <h3 className={styles.blockTitle}>
              <BookOpen size={13} aria-hidden="true" /> Ressources
            </h3>
            <ul className={styles.resources}>
              {skill.resources.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.resource}
                  >
                    <span className={styles.resourceTitle}>{r.title}</span>
                    <span className={styles.resourceProvider}>{r.provider}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {suggestions.length > 0 && (
            <section className={styles.block} aria-label="Vous êtes prêt pour">
              <h3 className={styles.blockTitle}>
                <Sparkles size={13} aria-hidden="true" /> Vous êtes prêt pour
              </h3>
              <ul className={styles.suggestions}>
                {suggestions.map(({ skill: s, reason, ready }) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className={`${styles.suggestion} ${ready ? "" : styles.suggestionLocked}`}
                      onClick={() => goTo(s)}
                    >
                      <span className={styles.suggestionMain}>
                        <span
                          className={`${styles.miniDot} ${statusDotClass(statusMap[s.id])}`}
                          aria-hidden="true"
                        />
                        <span className={styles.suggestionName}>{s.name}</span>
                      </span>
                      <span className={styles.suggestionReason}>{reason}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relatedSkills.length > 0 && (
            <section className={styles.block} aria-label="Compétences liées">
              <h3 className={styles.blockTitle}>Compétences liées</h3>
              <div className={styles.chips}>
                {relatedSkills.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`${styles.chip} ${styles.chipAccent}`}
                    onClick={() => goTo(r)}
                  >
                    {r.name} <ChevronRight size={13} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {status !== "done" && (
            <button
              type="button"
              className={styles.completeCta}
              onClick={() => setStatus(skill.id, "done")}
            >
              <Check size={16} strokeWidth={2.5} aria-hidden="true" />
              Marquer comme terminée
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

function statusDotClass(s: SkillStatus | undefined): string {
  if (s === "done") return styles.dotDone;
  if (s === "in-progress") return styles.dotActive;
  return styles.dotTodo;
}

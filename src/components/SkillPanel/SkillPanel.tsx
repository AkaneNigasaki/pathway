import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight, Clock, FlaskConical,
  ListChecks, Lock, Sparkles, X,
} from "lucide-react";
import type { Roadmap, Skill, SkillStatus } from "../../types";
import { SKILL_LEVEL_LABEL, NODE_TYPE_LABEL } from "../../types";
import type { ProgressMap } from "../../hooks/useProgress";
import { getNextSkills, skillMap } from "../../data/roadmaps";
import { getField } from "../../data/fields";
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

/**
 * Panneau de détail d'une compétence : drawer (desktop) / bottom sheet (mobile).
 * - Statut à 3 états, prérequis et dépendances cliquables
 * - « Que apprendre ensuite ? » : plusieurs options classées, jamais une direction unique
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
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<Element | null>(null);
  const firstSkill = useRef(true);

  const map = useMemo(() => skillMap(roadmap), [roadmap]);
  const field = getField(roadmap.fieldId);
  const status = statusMap[skill.id] ?? null;

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

  // Navigation interne (prérequis, suggestions…) : le panneau reste monté,
  // on le ré-affiche et on remonte en haut.
  useEffect(() => {
    if (firstSkill.current) {
      firstSkill.current = false;
      return;
    }
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
    <div className={styles.root} style={{ "--accent": field?.accent } as React.CSSProperties}>
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
          <X size={18} strokeWidth={2} aria-hidden="true" />
        </button>

        <div ref={scrollRef} className={styles.scroll}>
          <p className={styles.eyebrow} style={{ color: field?.accent }}>
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
                    <Check size={13} strokeWidth={3} aria-hidden="true" />
                  )}
                  {opt.label}
                </button>
              );
            })}
          </div>

          <p className={styles.description}>{skill.description}</p>

          {prereqSkills.length > 0 && (
            <section className={styles.block} aria-label="Prérequis">
              <h3 className={styles.blockTitle}>
                <Lock size={13} aria-hidden="true" /> Prérequis
                <span className={`${styles.count} mono`}>
                  {prereqsDone}/{prereqSkills.length}
                </span>
              </h3>
              <div className={styles.chips}>
                {prereqSkills.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`${styles.chip} ${
                      statusMap[p.id] === "done" ? styles.chipDone : ""
                    }`}
                    onClick={() => goTo(p)}
                  >
                    <span
                      className={`${styles.miniDot} ${statusDotClass(statusMap[p.id])}`}
                      aria-hidden="true"
                    />
                    {p.name}
                    <ChevronRight size={13} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {suggestions.length > 0 && (
            <section className={styles.block} aria-label="Que apprendre ensuite">
              <h3 className={styles.blockTitle}>
                <Sparkles size={13} aria-hidden="true" /> Que apprendre ensuite ?
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

          <section className={styles.block} aria-label="Projets">
            <h3 className={styles.blockTitle}>
              <FlaskConical size={13} aria-hidden="true" /> Projets
            </h3>
            <ol className={styles.projects}>
              {skill.projects.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
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

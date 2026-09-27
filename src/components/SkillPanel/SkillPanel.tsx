import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, BookOpen, Check, ChevronRight, Clock, FlaskConical,
  ListChecks, Lock, X,
} from "lucide-react";
import type { Roadmap, Skill } from "../../types";
import { SKILL_LEVEL_LABEL } from "../../types";
import { getNextSkills, skillMap } from "../../data/roadmaps";
import { getField } from "../../data/fields";
import styles from "./SkillPanel.module.css";

interface SkillPanelProps {
  skill: Skill;
  roadmap: Roadmap;
  completed: boolean;
  onToggle: (skillId: string) => void;
  onSelect: (skill: Skill) => void;
  onClose: () => void;
}

export function SkillPanel({ skill, roadmap, completed, onToggle, onSelect, onClose }: SkillPanelProps) {
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const map = skillMap(roadmap);
  const field = getField(roadmap.fieldId);
  const nextSkills = getNextSkills(roadmap, skill.id);
  const prereqSkills = skill.prerequisites
    .map((id) => map[id])
    .filter((s): s is Skill => Boolean(s));

  // Entrée animée (montage), sortie animée avant démontage.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    closeRef.current?.focus();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Échap + verrouillage du scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
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

  return (
    <div className={styles.root} style={{ "--accent": field?.accent } as React.CSSProperties}>
      <div
        className={`${styles.overlay} ${visible ? styles.show : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <aside
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

        <div className={styles.scroll}>
          <p className={styles.eyebrow} style={{ color: field?.accent }}>
            {roadmap.title.toUpperCase()}
          </p>
          <h2 className={styles.name}>{skill.name}</h2>
          <p className={styles.tagline}>{skill.tagline}</p>

          <div className={styles.badges}>
            <span className={styles.badge}>{SKILL_LEVEL_LABEL[skill.level]}</span>
            <span className={styles.badge}>
              <Clock size={12} aria-hidden="true" /> {skill.duration}
            </span>
            {completed && (
              <span className={`${styles.badge} ${styles.badgeDone}`}>
                <Check size={12} strokeWidth={3} aria-hidden="true" /> Terminée
              </span>
            )}
          </div>

          <p className={styles.description}>{skill.description}</p>

          <button
            type="button"
            className={`${styles.toggleBtn} ${completed ? styles.isDone : ""}`}
            onClick={() => onToggle(skill.id)}
            aria-pressed={completed}
          >
            <span className={styles.toggleCheck} aria-hidden="true">
              <Check size={15} strokeWidth={3} />
            </span>
            {completed ? "Marquer comme à faire" : "Marquer comme terminée"}
          </button>

          {prereqSkills.length > 0 && (
            <section className={styles.block} aria-label="Prérequis">
              <h3 className={styles.blockTitle}>
                <Lock size={13} aria-hidden="true" /> Prérequis
              </h3>
              <div className={styles.chips}>
                {prereqSkills.map((p) => (
                  <button key={p.id} type="button" className={styles.chip} onClick={() => goTo(p)}>
                    {p.name} <ChevronRight size={13} aria-hidden="true" />
                  </button>
                ))}
              </div>
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
            <ul className={styles.list}>
              {skill.projects.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>

          <section className={styles.block} aria-label="Ressources">
            <h3 className={styles.blockTitle}>
              <BookOpen size={13} aria-hidden="true" /> Ressources
            </h3>
            <ul className={styles.resources}>
              {skill.resources.map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className={styles.resource}>
                    <span className={styles.resourceTitle}>{r.title}</span>
                    <span className={styles.resourceProvider}>{r.provider}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {nextSkills.length > 0 && (
            <section className={styles.block} aria-label="Compétences suivantes">
              <h3 className={styles.blockTitle}>Compétences suivantes</h3>
              <div className={styles.chips}>
                {nextSkills.map((n) => (
                  <button key={n.id} type="button" className={styles.chipAccent} onClick={() => goTo(n)}>
                    {n.name} <ChevronRight size={13} aria-hidden="true" />
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

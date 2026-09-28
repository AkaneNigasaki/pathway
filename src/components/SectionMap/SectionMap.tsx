import { Fragment, useEffect, useState } from "react";
import type { LearningLevel } from "../../data/skill-guides";
import styles from "./SectionMap.module.css";

export interface MapSection {
  /** Ancre de la section (ex. « learn-installation »). */
  id: string;
  label: string;
  /** Niveau de la section, pour les Learning Pages. Absent pour les docs classiques. */
  level?: LearningLevel;
}

interface SectionMapProps {
  sections: MapSection[];
  /** Niveau actuellement affiché : les sections supérieures sont estompées. */
  level: LearningLevel;
  onSelect: (section: MapSection) => void;
}

const STAGE: Record<LearningLevel, { name: string; hint: string }> = {
  1: { name: "Aperçu", hint: "30 secondes" },
  2: { name: "Pratique", hint: "5 à 15 minutes" },
  3: { name: "Approfondi", hint: "En profondeur" },
};

/**
 * Sommaire d'une page documentation sous forme de graphe de nœuds,
 * façon roadmap : une colonne vertébrale verticale, un nœud par section,
 * des paliers par niveau d'information, la section visible mise en évidence.
 */
export function SectionMap({ sections, level, onSelect }: SectionMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections, level]);

  const go = (e: React.MouseEvent, section: MapSection) => {
    e.preventDefault();
    // Le parent met le hash à jour : le niveau bascule si besoin,
    // la section se déplie et la page cadre son en-tête.
    onSelect(section);
  };

  let lastStage = 0;

  return (
    <ol className={styles.spine}>
      {sections.map((s, i) => {
        const stage = s.level ?? 0;
        const showStage = stage !== 0 && stage !== lastStage;
        lastStage = stage;
        const future = (s.level ?? 1) > level;
        const active = activeId === s.id;
        return (
          <Fragment key={s.id}>
            {showStage && (
              <li className={styles.stage} aria-hidden="true">
                <span className={styles.stageName}>{STAGE[stage as LearningLevel].name}</span>
                <span className={styles.stageHint}>{STAGE[stage as LearningLevel].hint}</span>
              </li>
            )}
            <li
              className={`${styles.node}${future ? ` ${styles.future}` : ""}${
                active ? ` ${styles.active}` : ""
              }`}
            >
              <a
                href={`#${s.id}`}
                onClick={(e) => go(e, s)}
                aria-current={active ? "true" : undefined}
              >
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.num} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.label}>{s.label}</span>
              </a>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}

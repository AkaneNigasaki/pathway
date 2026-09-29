import { useState } from "react";
import { LuLightbulb, LuX } from "react-icons/lu";
import type { LearningLevel } from "../../data/skill-guides";
import styles from "./DocJourney.module.css";

export interface JourneySection {
  id: string;
  label: string;
  level?: LearningLevel;
}

interface DocJourneyProps {
  sections: JourneySection[];
  activeId: string | null;
  onSelect: (section: JourneySection) => void;
  /** Contenu de la section sélectionnée (affiché dans le panneau de droite). */
  renderContent?: (section: JourneySection) => React.ReactNode;
}

/**
 * Page documentation façon roadmap : chemin sinueux sur fond bleu nuit,
 * sections en cartes sombres comme les nœuds de la roadmap (icône + nom + pastille),
 * panneau d'explication en absolute à droite au clic.
 */
export function DocJourney({ sections, activeId, onSelect, renderContent }: DocJourneyProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId ? sections.find((s) => s.id === selectedId) : null;
  const activeIndex = activeId ? sections.findIndex((s) => s.id === activeId) : -1;

  const handleSelect = (s: JourneySection) => {
    setSelectedId(s.id);
    onSelect(s);
  };

  return (
    <div className={styles.journey}>
      {/* Ampoule de départ. */}
      <div className={styles.startNode} aria-hidden="true">
        <span className={styles.bulbCircle}>
          <LuLightbulb size={28} />
        </span>
      </div>

      {/* Chemin : cartes-nœuds alternées. */}
      <ol className={styles.path}>
        {sections.map((s, i) => {
          const active = activeId === s.id;
          const selected_ = selectedId === s.id;
          const done = activeIndex >= 0 && i < activeIndex;
          const side = i % 2 === 0 ? "right" : "left";
          return (
            <li key={s.id} className={`${styles.node} ${styles[`node_${side}`]}`}>
              <button
                type="button"
                className={`${styles.card}${selected_ ? ` ${styles.cardSelected}` : ""}${
                  active ? ` ${styles.cardActive}` : ""
                }`}
                onClick={() => handleSelect(s)}
                aria-current={active ? "step" : undefined}
                aria-expanded={selected_}
                title={s.label}
              >
                <span className={`${styles.num} mono`} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.label}>{s.label}</span>
                <span
                  className={`${styles.dot} ${done ? styles.dotDone : active ? styles.dotActive : styles.dotTodo}`}
                  aria-hidden="true"
                />
              </button>
            </li>
          );
        })}
      </ol>

      {/* Panneau d'explication en absolute à droite (desktop). */}
      {selected && (
        <div className={styles.panel} role="dialog" aria-label={selected.label}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>{selected.label}</h2>
            <button
              type="button"
              className={styles.panelClose}
              onClick={() => setSelectedId(null)}
              aria-label="Fermer le panneau"
            >
              <LuX size={18} />
            </button>
          </div>
          <div className={styles.panelBody}>
            {renderContent ? renderContent(selected) : (
              <p className={styles.panelHint}>Explication à venir.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

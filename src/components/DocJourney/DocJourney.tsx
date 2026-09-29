import { useState } from "react";
import { LuCheck, LuLightbulb, LuX } from "react-icons/lu";
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
  /** Contenu HTML/texte de la section sélectionnée (affiché dans le panneau). */
  renderContent?: (section: JourneySection) => React.ReactNode;
}

/**
 * Page documentation façon roadmap Softaims : un chemin sinueux crème
 * sur fond bleu nuit, avec TOUTES les sections en nœuds crème mélangés
 * (sans distinction de niveau). Clic sur un nœud → panneau d'explication.
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
      {/* Ampoule de départ, comme Softaims. */}
      <div className={styles.startNode} aria-hidden="true">
        <span className={styles.bulbCircle}>
          <LuLightbulb size={28} />
        </span>
      </div>

      {/* Chemin sinueux avec tous les nœuds mélangés. */}
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
                className={`${styles.pill}${selected_ ? ` ${styles.pillSelected}` : ""}${
                  active ? ` ${styles.pillActive}` : ""
                }`}
                onClick={() => handleSelect(s)}
                aria-current={active ? "step" : undefined}
                aria-expanded={selected_}
              >
                <span className={`${styles.num} mono`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.label}>{s.label}</span>
                {done && (
                  <span className={styles.check} aria-hidden="true">
                    <LuCheck size={14} />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Panneau d'explication de la section sélectionnée. */}
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
              <p className={styles.panelHint}>
                Cliquez sur un nœud du chemin pour voir son explication.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

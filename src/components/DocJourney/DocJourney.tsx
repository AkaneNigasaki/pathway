import { useMemo, useState } from "react";
import { LuCheck, LuLightbulb } from "react-icons/lu";
import type { LearningLevel } from "../../data/skill-guides";
import styles from "./DocJourney.module.css";

export interface JourneySection {
  id: string;
  label: string;
  level?: LearningLevel;
}

interface DocJourneyProps {
  sections: JourneySection[];
  level: LearningLevel;
  activeId: string | null;
  onSelect: (section: JourneySection) => void;
}

const STAGE: Record<LearningLevel, { name: string; hint: string }> = {
  1: { name: "Aperçu", hint: "30 secondes" },
  2: { name: "Pratique", hint: "5 à 15 minutes" },
  3: { name: "Approfondi", hint: "En profondeur" },
};

/**
 * Page documentation façon roadmap Softaims : un chemin sinueux crème
 * sur fond bleu nuit, avec les 3 niveaux en jalons crème et les sections
 * en pilules sombres reliées par des courbes pointillées.
 */
export function DocJourney({ sections, level, activeId, onSelect }: DocJourneyProps) {
  const [openLevel, setOpenLevel] = useState<LearningLevel | null>(1);

  const stages = useMemo(() => {
    const map = new Map<LearningLevel, JourneySection[]>();
    for (const s of sections) {
      const lv = (s.level ?? 1) as LearningLevel;
      if (!map.has(lv)) map.set(lv, []);
      map.get(lv)!.push(s);
    }
    return ([1, 2, 3] as LearningLevel[])
      .map((lv) => ({ level: lv, sections: map.get(lv) ?? [] }))
      .filter((g) => g.sections.length > 0);
  }, [sections]);

  const activeIndex = activeId ? sections.findIndex((s) => s.id === activeId) : -1;

  return (
    <div className={styles.journey}>
      {/* Ampoule de départ, comme Softaims. */}
      <div className={styles.startNode} aria-hidden="true">
        <span className={styles.bulbCircle}>
          <LuLightbulb size={28} />
        </span>
      </div>

      {stages.map((g, gi) => {
        const isOpen = openLevel === g.level;
        const isFuture = g.level > level;
        const side = gi % 2 === 0 ? "right" : "left";
        return (
          <div key={g.level} className={`${styles.stage} ${styles[`side_${side}`]}`}>
            {/* Jalon crème sur le chemin. */}
            <button
              type="button"
              className={`${styles.milestone}${isOpen ? ` ${styles.milestoneOpen}` : ""}${
                isFuture ? ` ${styles.milestoneFuture}` : ""
              }`}
              onClick={() => setOpenLevel(isOpen ? null : g.level)}
              aria-expanded={isOpen}
            >
              <span className={`${styles.mNum} mono`}>{String(gi + 1).padStart(2, "0")}</span>
              <span className={styles.mText}>
                <span className={styles.mName}>{STAGE[g.level].name}</span>
                <span className={styles.mHint}>{STAGE[g.level].hint}</span>
              </span>
              <span className={styles.mCount}>{g.sections.length}</span>
            </button>

            {/* Sections : pilules sombres reliées en pointillés. */}
            {isOpen && (
              <ol className={`${styles.children} ${styles[`children_${side}`]}`}>
                {g.sections.map((s) => {
                  const i = sections.findIndex((x) => x.id === s.id);
                  const active = activeId === s.id;
                  const done = activeIndex >= 0 && i >= 0 && i < activeIndex;
                  const future = (s.level ?? 1) > level;
                  return (
                    <li
                      key={s.id}
                      className={`${styles.child}${active ? ` ${styles.childActive}` : ""}${
                        done ? ` ${styles.childDone}` : ""
                      }${future ? ` ${styles.childFuture}` : ""}`}
                    >
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelect(s);
                        }}
                        aria-current={active ? "step" : undefined}
                      >
                        <span className={styles.childDot} aria-hidden="true">
                          {done && <LuCheck size={12} />}
                        </span>
                        <span className={styles.childLabel}>{s.label}</span>
                      </a>
                      <svg className={styles.wire} aria-hidden="true" focusable="false">
                        <path d="M 0 20 C 30 20, 30 20, 60 20" className={styles.wirePath} />
                      </svg>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        );
      })}
    </div>
  );
}

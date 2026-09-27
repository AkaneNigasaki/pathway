import { memo } from "react";
import type { Roadmap, Skill } from "../../types";
import type { ProgressMap } from "../../hooks/useProgress";
import { skillDepth } from "../../data/roadmaps";
import { SkillNode } from "../SkillNode/SkillNode";
import styles from "./RoadmapList.module.css";

interface RoadmapListProps {
  roadmap: Roadmap;
  status: ProgressMap;
  selectedId: string | null;
  onSelect: (skill: Skill) => void;
  onCycle: (skillId: string) => void;
}

/**
 * Version verticale de la roadmap (mobile) : les étapes deviennent
 * des sections, les compétences des cartes empilées, triées par
 * profondeur de dépendances.
 */
export const RoadmapList = memo(function RoadmapList({
  roadmap,
  status,
  selectedId,
  onSelect,
  onCycle,
}: RoadmapListProps) {
  const noop = () => {};
  return (
    <div className={styles.list}>
      {roadmap.stages.map((stage, i) => {
        const stageSkills = roadmap.skills
          .filter((s) => s.stage === stage.id)
          .sort(
            (a, b) => skillDepth(roadmap, a.id) - skillDepth(roadmap, b.id)
          );
        if (stageSkills.length === 0) return null;
        const done = stageSkills.filter((s) => status[s.id] === "done").length;
        return (
          <section
            key={stage.id}
            id={`stage-${stage.id}`}
            className={styles.stage}
            aria-label={`Étape ${i + 1} : ${stage.label}`}
          >
            <header className={styles.stageHead}>
              <span className={`${styles.stageNum} mono`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.stageLabel}>{stage.label}</h3>
              <span className={`${styles.stageCount} mono`}>
                {done}/{stageSkills.length}
              </span>
            </header>
            <div className={styles.nodes}>
              {stageSkills.map((s) => (
                <SkillNode
                  key={s.id}
                  skill={s}
                  status={status[s.id] ?? null}
                  selected={selectedId === s.id}
                  dimmed={false}
                  unlocked={
                    !status[s.id] &&
                    s.prerequisites.length > 0 &&
                    s.prerequisites.every((p) => status[p] === "done")
                  }
                  onSelect={onSelect}
                  onCycle={onCycle}
                  onHover={noop}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
});

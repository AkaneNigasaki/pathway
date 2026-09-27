import { memo } from "react";
import { LuArrowDown as ArrowDown } from "react-icons/lu";
import type { Roadmap, Skill } from "../../types";
import type { ProgressMap } from "../../hooks/useProgress";
import { skillDepth } from "../../data/roadmaps";
import { getBranchGuide } from "../../data/branch-guides";
import { SkillNode } from "../SkillNode/SkillNode";
import { Reveal } from "../Reveal/Reveal";
import styles from "./RoadmapTimeline.module.css";

interface RoadmapTimelineProps {
  roadmap: Roadmap;
  status: ProgressMap;
  selectedId: string | null;
  onSelect: (skill: Skill) => void;
  onCycle: (skillId: string) => void;
}

/**
 * Progression verticale de la roadmap : les étapes sont numérotées (01, 02…),
 * les compétences s'enchaînent le long d'un rail avec des connecteurs SVG
 * sobres. Apparition progressive au scroll, désactivée si
 * prefers-reduced-motion.
 */
export const RoadmapTimeline = memo(function RoadmapTimeline({
  roadmap,
  status,
  selectedId,
  onSelect,
  onCycle,
}: RoadmapTimelineProps) {
  const noop = () => {};
  const stages = roadmap.stages
    .map((stage, i) => ({
      stage,
      index: i,
      skills: roadmap.skills
        .filter((s) => s.stage === stage.id)
        .sort((a, b) => skillDepth(roadmap, a.id) - skillDepth(roadmap, b.id)),
    }))
    .filter(({ skills }) => skills.length > 0);

  return (
    <div className={styles.timeline}>
      {stages.map(({ stage, index, skills }, si) => {
        const done = skills.filter((s) => status[s.id] === "done").length;
        const guide = getBranchGuide(stage.id);
        return (
          <Reveal
            key={stage.id}
            delay={Math.min(si * 90, 450)}
            className={styles.stage}
          >
            <section id={`stage-${stage.id}`} aria-label={`Étape ${index + 1} : ${stage.label}`}>
              <header className={styles.stageHead}>
                <span className={`${styles.stageNum} mono`} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.stageHeadText}>
                  <h3 className={styles.stageLabel}>{stage.label}</h3>
                  {(guide?.intro || stage.description) && (
                    <p className={styles.stageDesc}>
                      {guide?.intro ?? stage.description}
                    </p>
                  )}
                </div>
                <span className={`${styles.stageCount} mono`} aria-label={`${done} sur ${skills.length} terminées`}>
                  {done}/{skills.length}
                </span>
              </header>

              <ol className={styles.nodes}>
                {skills.map((s) => {
                  const state = status[s.id] ?? null;
                  return (
                    <li
                      key={s.id}
                      className={`${styles.nodeRow} ${state === "done" ? styles.rowDone : ""}`}
                    >
                      <SkillNode
                        skill={s}
                        status={state}
                        selected={selectedId === s.id}
                        dimmed={false}
                        unlocked={
                          !state &&
                          s.prerequisites.length > 0 &&
                          s.prerequisites.every((p) => status[p] === "done")
                        }
                        onSelect={onSelect}
                        onCycle={onCycle}
                        onHover={noop}
                      />
                    </li>
                  );
                })}
              </ol>

              {si < stages.length - 1 && (
                <div className={styles.stageLink} aria-hidden="true">
                  <ArrowDown size={20} />
                </div>
              )}
            </section>
          </Reveal>
        );
      })}
    </div>
  );
});

import { forwardRef } from "react";
import { Check } from "lucide-react";
import type { Skill } from "../../types";
import { SKILL_LEVEL_LABEL } from "../../types";
import styles from "./SkillNode.module.css";

interface SkillNodeProps {
  skill: Skill;
  completed: boolean;
  selected: boolean;
  unlocked: boolean;
  onSelect: (skill: Skill) => void;
  onToggle: (skillId: string) => void;
}

/**
 * Un node de compétence du graphe.
 * - clic sur le node → ouvre le panneau détaillé
 * - clic sur le cercle → bascule "terminé"
 */
export const SkillNode = forwardRef<HTMLDivElement, SkillNodeProps>(function SkillNode(
  { skill, completed, selected, unlocked, onSelect, onToggle },
  ref
) {
  return (
    <div
      ref={ref}
      className={`${styles.nodeWrap} ${completed ? styles.done : ""} ${
        selected ? styles.selected : ""
      } ${unlocked ? styles.unlocked : ""}`}
    >
      <button
        type="button"
        className={styles.node}
        onClick={() => onSelect(skill)}
        aria-label={`${skill.name} — ${SKILL_LEVEL_LABEL[skill.level]}. Voir le détail.`}
        aria-pressed={selected}
      >
        <span className={styles.level}>{SKILL_LEVEL_LABEL[skill.level]}</span>
        <span className={styles.name}>{skill.name}</span>
        <span className={styles.meta}>
          <span className="mono">{skill.concepts.length}</span> concepts
          <span aria-hidden="true"> · </span>
          {skill.duration}
        </span>
      </button>
      <button
        type="button"
        className={styles.check}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(skill.id);
        }}
        aria-label={completed ? `Marquer ${skill.name} comme à faire` : `Marquer ${skill.name} comme terminée`}
        aria-pressed={completed}
        title={completed ? "Marquer comme à faire" : "Marquer comme terminée"}
      >
        <Check size={14} strokeWidth={3} aria-hidden="true" />
      </button>
    </div>
  );
});

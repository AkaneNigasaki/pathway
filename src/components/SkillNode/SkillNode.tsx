import { memo } from "react";
import { LuCheck as Check } from "react-icons/lu";
import type { NodeType, Skill, SkillStatus } from "../../types";
import { SKILL_LEVEL_LABEL, NODE_TYPE_LABEL } from "../../types";
import { SkillIcon } from "../SkillIcon/SkillIcon";
import styles from "./SkillNode.module.css";

const SHORT_LEVEL: Record<Skill["level"], string> = {
  beginner: "Déb.",
  intermediate: "Interm.",
  advanced: "Avancé",
};

interface SkillNodeProps {
  skill: Skill;
  status: SkillStatus | null;
  selected: boolean;
  dimmed: boolean;
  unlocked: boolean;
  onSelect: (skill: Skill) => void;
  onCycle: (skillId: string) => void;
  onHover: (skillId: string | null) => void;
}

/**
 * Nœud de la carte : identifiable au premier regard.
 * Pastille de statut, icône de type, titre, tagline, niveau.
 * La pastille cycle : non commencé → en cours → terminé.
 */
export const SkillNode = memo(function SkillNode({
  skill,
  status,
  selected,
  dimmed,
  unlocked,
  onSelect,
  onCycle,
  onHover,
}: SkillNodeProps) {
  const type: NodeType = skill.type ?? "concept";
  const state = status ?? "todo";

  const cycleLabel =
    state === "todo"
      ? `Marquer « ${skill.name} » en cours`
      : state === "in-progress"
        ? `Marquer « ${skill.name} » comme terminée`
        : `Réinitialiser « ${skill.name} »`;

  return (
    <div
      className={`${styles.node} ${styles[state]} ${selected ? styles.selected : ""} ${
        dimmed ? styles.dimmed : ""
      } ${unlocked ? styles.unlocked : ""}`}
      data-node={skill.id}
      data-type={type}
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(skill.id)}
      onBlur={() => onHover(null)}
    >
      <button
        type="button"
        className={styles.main}
        onClick={() => onSelect(skill)}
        aria-pressed={selected}
        title={`${skill.name} — ${skill.tagline} · ${SKILL_LEVEL_LABEL[skill.level]}`}
      >
        <span className={styles.topRow}>
          <SkillIcon
            skillId={skill.id}
            nodeType={type}
            label={`${skill.name} — ${NODE_TYPE_LABEL[type]}`}
            size={18}
          />
          <span className={styles.level}>{SHORT_LEVEL[skill.level]}</span>
        </span>
        <span className={styles.name}>{skill.name}</span>
        <span className={styles.tagline}>{skill.tagline}</span>
      </button>

      <button
        type="button"
        className={styles.statusBtn}
        onClick={(e) => {
          e.stopPropagation();
          onCycle(skill.id);
        }}
        aria-label={cycleLabel}
        title={cycleLabel}
      >
        <span key={state} className={styles.dot} aria-hidden="true">
          {state === "done" && <Check size={11} strokeWidth={2.5} />}
        </span>
      </button>

      {unlocked && (
        <span className={styles.nextBadge} aria-hidden="true">
          Prêt
        </span>
      )}
    </div>
  );
});

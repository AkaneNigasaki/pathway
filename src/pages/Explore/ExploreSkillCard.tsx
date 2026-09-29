import { Link } from "react-router-dom";
import { LuArrowUpRight as ArrowUpRight } from "react-icons/lu";
import { SkillIcon } from "../../components/SkillIcon/SkillIcon";
import type { ExploreSkill } from "../../data/explore";
import { NODE_TYPE_LABEL, SKILL_LEVEL_LABEL } from "../../types";
import styles from "./ExploreSkillCard.module.css";

interface ExploreSkillCardProps {
  skill: ExploreSkill;
}

/**
 * Carte de compétence pour /explore : contexte réel (niveau, type,
 * roadmaps concernées, prérequis) et lien vers la roadmap canonique.
 */
export function ExploreSkillCard({ skill }: ExploreSkillCardProps) {
  return (
    <Link
      to={`/roadmaps/${skill.canonicalRoadmap}?skill=${skill.id}`}
      className={styles.card}
      aria-label={`${skill.name} — ${NODE_TYPE_LABEL[skill.type]}, ${SKILL_LEVEL_LABEL[skill.level]}`}
    >
      <span className={styles.top}>
        <SkillIcon
          skillId={skill.id}
          nodeType={skill.type}
          label={skill.name}
          size={26}
          decorative
        />
        <ArrowUpRight size={16} aria-hidden="true" className={styles.arrow} />
      </span>
      <span className={styles.name}>{skill.name}</span>
      <span className={styles.badges}>
        <span className={styles.badge}>{NODE_TYPE_LABEL[skill.type]}</span>
        <span className={`${styles.badge} ${styles.level}`}>{SKILL_LEVEL_LABEL[skill.level]}</span>
      </span>
      <span className={styles.tagline}>{skill.tagline}</span>
      <span className={styles.meta}>
        <span className={`${styles.count} mono`}>{skill.roadmapSlugs.length}</span>
        &nbsp;roadmap{skill.roadmapSlugs.length > 1 ? "s" : ""}
        <span className={styles.dot} aria-hidden="true">·</span>
        <span className={`${styles.count} mono`}>{skill.prerequisites.length}</span>
        &nbsp;prérequis{skill.prerequisites.length > 1 ? "s" : ""}
      </span>
    </Link>
  );
}

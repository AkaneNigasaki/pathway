import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  LuBraces as Braces,
  LuLayers as Layers,
  LuCloud as Cloud,
  LuCompass as Compass,
  LuLightbulb as Lightbulb,
  LuWrench as Wrench,
} from "react-icons/lu";
import type { NodeType, SearchItem } from "../../types";
import { getRoadmap, skillMap } from "../../data/roadmaps";
import { BrandIcon, hasBrandIcon } from "../BrandIcon/BrandIcon";
import { CONCEPT_ICONS } from "./conceptIcons";
import { CONCEPT_IMAGES } from "./conceptImages";
import styles from "./SkillIcon.module.css";

/** Repli par type de nœud, si ni logo ni icône de concept. */
const TYPE_ICON: Record<NodeType, IconType> = {
  concept: Lightbulb,
  language: Braces,
  framework: Layers,
  tool: Wrench,
  platform: Cloud,
  specialization: Compass,
};

/**
 * Résout l'id brut et le type de nœud depuis un SearchItem
 * (format « roadmapSlug:skillId »). Null si ce n'est pas une compétence.
 */
export function searchItemSkill(item: SearchItem): { skillId: string; nodeType: NodeType } | null {
  if (item.type !== "skill") return null;
  const skillId = item.id.split(":").pop() ?? "";
  let nodeType: NodeType = "concept";
  if (item.roadmapSlug) {
    const roadmap = getRoadmap(item.roadmapSlug);
    const skill = roadmap ? skillMap(roadmap)[skillId] : undefined;
    if (skill?.type) nodeType = skill.type;
  }
  return { skillId, nodeType };
}

interface SkillIconProps {
  skillId: string;
  nodeType?: NodeType;
  /** Nom de la compétence, pour l'accessibilité. */
  label: string;
  size?: number;
  className?: string;
}

/**
 * Icône d'une compétence, partout où elle apparaît :
 * vrai logo de la technologie (svgl.app) si disponible,
 * sinon icône colorée du concept (Flat Color Icons),
 * sinon icône sémantique Lucide du concept,
 * sinon icône générique du type de nœud.
 */
export function SkillIcon({ skillId, nodeType = "concept", label, size = 18, className = "" }: SkillIconProps) {
  if (hasBrandIcon(skillId)) {
    return <BrandIcon skillId={skillId} label={label} size={size} className={className} />;
  }
  const conceptImage = CONCEPT_IMAGES[skillId];
  if (conceptImage) {
    return (
      <span
        className={`${styles.icon} ${className}`}
        style={{ width: size, height: size } as CSSProperties}
        role="img"
        aria-label={label}
      >
        <img src={conceptImage} alt="" aria-hidden="true" draggable={false} />
      </span>
    );
  }
  const ConceptIcon: IconType = CONCEPT_ICONS[skillId] ?? TYPE_ICON[nodeType];
  const style = { width: size, height: size } as CSSProperties;
  return (
    <span
      className={`${styles.icon} ${className}`}
      style={style}
      role="img"
      aria-label={label}
    >
      <ConceptIcon size={size} aria-hidden="true" />
    </span>
  );
}

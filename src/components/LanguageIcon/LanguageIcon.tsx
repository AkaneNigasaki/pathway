import type { CSSProperties } from "react";
import tsSvg from "../../assets/lang-icons/typescript.svg";
import jsSvg from "../../assets/lang-icons/javascript.svg";
import pySvg from "../../assets/lang-icons/python.svg";
import cppSvg from "../../assets/lang-icons/c-plusplus.svg";
import htmlSvg from "../../assets/lang-icons/html.svg";
import cssSvg from "../../assets/lang-icons/css.svg";
import bashSvg from "../../assets/lang-icons/bash.svg";
import styles from "./LanguageIcon.module.css";

/**
 * Vrais logos des langages (source : svgl.app), affichés à côté du nom
 * de la compétence partout où elle apparaît (nœuds, panneau, listes).
 * SQL n'a pas de logo de marque unique : il garde son icône générique.
 */
const LANG_ICONS: Record<string, string> = {
  typescript: tsSvg,
  javascript: jsSvg,
  python: pySvg,
  cpp: cppSvg,
  html: htmlSvg,
  css: cssSvg,
  bash: bashSvg,
};

export function hasLanguageIcon(skillId: string): boolean {
  return skillId in LANG_ICONS;
}

/**
 * Extrait l'id brut d'une compétence depuis un SearchItem
 * (format « roadmapSlug:skillId »), ou null si pas de logo.
 */
export function searchItemLanguageIcon(item: { type: string; id: string }): string | null {
  if (item.type !== "skill") return null;
  const skillId = item.id.split(":").pop() ?? "";
  return hasLanguageIcon(skillId) ? skillId : null;
}

interface LanguageIconProps {
  skillId: string;
  /** Nom du langage, pour l'accessibilité. */
  label: string;
  size?: number;
  className?: string;
}

export function LanguageIcon({ skillId, label, size = 18, className = "" }: LanguageIconProps) {
  const src = LANG_ICONS[skillId];
  if (!src) return null;
  const style = { width: size, height: size } as CSSProperties;
  return (
    <span
      className={`${styles.icon} ${skillId === "bash" ? styles.bash : ""} ${className}`}
      style={style}
      role="img"
      aria-label={label}
    >
      <img src={src} alt="" aria-hidden="true" draggable={false} />
    </span>
  );
}

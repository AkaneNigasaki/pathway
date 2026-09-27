import { Link } from "react-router-dom";
import {
  Cpu, Scale, TrendingUp, Landmark, FlaskConical, Stethoscope,
  Cog, PenTool, DraftingCompass, Megaphone, Users, type LucideIcon,
} from "lucide-react";
import type { Field } from "../../types";
import styles from "./FieldCard.module.css";

const ICONS: Record<string, LucideIcon> = {
  Cpu, Scale, TrendingUp, Landmark, FlaskConical, Stethoscope,
  Cog, PenTool, DraftingCompass, Megaphone, Users,
};

interface FieldCardProps {
  field: Field;
  roadmapCount: number;
  skillCount: number;
  careerCount: number;
}

export function FieldCard({ field, roadmapCount, skillCount, careerCount }: FieldCardProps) {
  const Icon = ICONS[field.icon] ?? Cpu;
  const empty = roadmapCount === 0;

  return (
    <Link
      to={empty ? "/fields" : `/fields/${field.id}`}
      className={`${styles.card} ${empty ? styles.empty : ""}`}
      style={{ "--accent": field.accent } as React.CSSProperties}
      aria-label={`${field.name} — ${roadmapCount} roadmaps`}
    >
      <span className={styles.topRow}>
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon size={19} strokeWidth={1.7} />
        </span>
        <span className={styles.accentDot} aria-hidden="true" />
      </span>
      <h3 className={styles.name}>{field.name}</h3>
      <p className={styles.tagline}>{field.tagline}</p>
      <div className={styles.meta}>
        {empty ? (
          <span className={styles.coming}>Bientôt disponible</span>
        ) : (
          <>
            <span><strong className="mono">{roadmapCount}</strong> roadmaps</span>
            <span aria-hidden="true">·</span>
            <span><strong className="mono">{skillCount}</strong> compétences</span>
            <span aria-hidden="true">·</span>
            <span><strong className="mono">{careerCount}</strong> métiers</span>
          </>
        )}
      </div>
    </Link>
  );
}

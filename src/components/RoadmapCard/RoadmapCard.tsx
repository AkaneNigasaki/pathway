import { Link } from "react-router-dom";
import {ArrowUpRight, Clock, Stack} from "@phosphor-icons/react";
import type { Roadmap } from "../../types";
import { getField } from "../../data/fields";
import styles from "./RoadmapCard.module.css";

interface RoadmapCardProps {
  roadmap: Roadmap;
  progress?: number;
}

export function RoadmapCard({ roadmap, progress = 0 }: RoadmapCardProps) {
  const field = getField(roadmap.fieldId);

  return (
    <Link
      to={`/roadmaps/${roadmap.slug}`}
      className={styles.card}
      style={{ "--field-accent": field?.accent ?? "#2563eb" } as React.CSSProperties}
    >
      <div className={styles.head}>
        <span className={`${styles.field} fieldAccent`}>
          {field?.name.toUpperCase()}
        </span>
        <ArrowUpRight size={17} className={styles.arrow} aria-hidden="true" />
      </div>
      <h3 className={styles.title}>{roadmap.title}</h3>
      <p className={styles.tagline}>{roadmap.tagline}</p>
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Stack size={13} aria-hidden="true" />
          <span className="mono">{roadmap.skills.length}</span> compétences
        </span>
        <span className={styles.metaItem}>
          <Clock size={13} aria-hidden="true" />
          {roadmap.duration}
        </span>
      </div>
      {progress > 0 && (
        <div className={styles.progress}>
          <div className={styles.bar} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Progression ${roadmap.title}`}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <span className={`${styles.pct} mono`}>{progress}%</span>
        </div>
      )}
    </Link>
  );
}

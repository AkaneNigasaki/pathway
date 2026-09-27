import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}

/** Barre de progression animée (transition width uniquement). */
export function ProgressBar({ value, label, size = "md" }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={styles.wrap}>
      {label && <span className={styles.label}>{label}</span>}
      <div
        className={`${styles.bar} ${styles[size]}`}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progression"}
      >
        <span className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
      <span className={`${styles.pct} mono`}>{pct}%</span>
    </div>
  );
}

import { Figure } from "./Figure";
import styles from "./Illustration.module.css";

const PATHS = [
  "M24,110 C140,110 190,36 300,36 C410,36 460,110 576,110",
  "M24,110 C160,110 220,150 310,140 C400,130 470,110 576,110",
  "M24,110 C140,110 190,184 300,184 C410,184 460,110 576,110",
  "M24,110 C200,60 400,160 576,110",
];

/**
 * Composition éditoriale abstraite : plusieurs chemins qui divergent
 * puis se rejoignent. Sobre, sans cliché figuratif.
 */
export function ExplorePaths() {
  return (
    <Figure label="Illustration abstraite : des chemins qui se séparent puis se rejoignent">
      <svg viewBox="0 0 600 220" className={styles.svg} aria-hidden="true">
        {PATHS.map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            className={`${i === 3 ? styles.edgeAccent : styles.edge} ${styles.draw}`}
            style={{
              transitionDelay: `${i * 220}ms`,
              transitionDuration: "1.8s",
              strokeWidth: i === 3 ? 1.75 : 1.25,
            }}
          />
        ))}
        <g className={styles.node} style={{ transitionDelay: "100ms" }}>
          <circle cx={24} cy={110} r={5} className={styles.arrowAccent} />
        </g>
        <g className={styles.node} style={{ transitionDelay: "1100ms" }}>
          <circle cx={576} cy={110} r={5} className={styles.arrowAccent} />
        </g>
      </svg>
    </Figure>
  );
}

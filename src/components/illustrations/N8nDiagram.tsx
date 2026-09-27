import { Figure } from "./Figure";
import { FlowPulse } from "./FlowPulse";
import styles from "./Illustration.module.css";

const BRANCHES = ["API", "Base de données", "Discord", "Email"];
const BRANCH_Y = [66, 128, 190, 252];

/**
 * n8n comme centre du workflow : un déclencheur en entrée,
 * plusieurs services connectés en sortie.
 */
export function N8nDiagram() {
  return (
    <Figure label="Schéma : un webhook déclenche n8n, qui appelle une API, une base de données, Discord et un email">
      <svg viewBox="0 0 440 320" className={styles.svg} aria-hidden="true">
        {/* Déclencheur */}
        <g className={styles.node} style={{ transitionDelay: "0ms" }}>
          <rect x={90} y={14} width={140} height={40} rx={10} className={styles.box} />
          <text x={160} y={35} className={styles.label}>
            Webhook
          </text>
        </g>
        <line
          x1={160}
          y1={54}
          x2={160}
          y2={112}
          pathLength={1}
          className={`${styles.edgeAccent} ${styles.draw}`}
          style={{ transitionDelay: "200ms" }}
        />
        <polygon
          points="155,104 165,104 160,112"
          className={`${styles.arrowAccent} ${styles.node}`}
          style={{ transitionDelay: "700ms" }}
        />

        {/* Cœur n8n */}
        <g className={styles.node} style={{ transitionDelay: "450ms" }}>
          <rect x={80} y={120} width={160} height={60} rx={12} className={styles.boxAccent} />
          <text x={160} y={151} className={styles.label}>
            n8n
          </text>
        </g>

        {/* Branches sortantes */}
        {BRANCHES.map((b, i) => {
          const y = BRANCH_Y[i];
          const d = `M240,150 C262,150 263,${y} 283,${y}`;
          return (
            <g key={b}>
              <path
                d={d}
                pathLength={1}
                className={`${styles.edge} ${styles.draw}`}
                style={{ transitionDelay: `${800 + i * 160}ms` }}
              />
              <polygon
                points={`277,${y - 5} 277,${y + 5} 285,${y}`}
                className={`${styles.arrow} ${styles.node}`}
                style={{ transitionDelay: `${1250 + i * 160}ms` }}
              />
              <g className={styles.node} style={{ transitionDelay: `${950 + i * 160}ms` }}>
                <rect x={285} y={y - 19} width={130} height={38} rx={10} className={styles.box} />
                <text x={350} y={y + 1} className={styles.label}>
                  {b}
                </text>
              </g>
            </g>
          );
        })}
        <FlowPulse path="M160,54 L160,112" dur={2.2} />
      </svg>
    </Figure>
  );
}

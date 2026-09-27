import { Figure } from "./Figure";
import { FlowPulse } from "./FlowPulse";
import styles from "./Illustration.module.css";

const STEPS = ["Code", "Git", "CI/CD", "Build", "Container", "Deploy", "Monitor", "Feedback"];
const CX = 175;
const BOX_W = 170;
const BOX_H = 42;
const GAP = 60;

/**
 * La boucle DevOps : du code au déploiement, puis retour d'expérience.
 * La flèche en pointillés matérialise l'itération continue.
 */
export function DevOpsDiagram() {
  const cy = (i: number) => 34 + i * GAP;
  const last = STEPS.length - 1;
  const loopPath = `M${CX - BOX_W / 2},${cy(last)} C60,${cy(last)} 40,${cy(last) - 40} 40,${cy(0) + 60} C40,${cy(0) - 10} 55,${cy(0) - 8} ${CX - BOX_W / 2 - 4},${cy(0)}`;

  return (
    <Figure label="Schéma : pipeline DevOps du code au déploiement, avec boucle de feedback vers le code">
      <svg viewBox="0 0 350 505" className={styles.svg} aria-hidden="true">
        {/* Boucle de feedback (derrière les nœuds) */}
        <path
          d={loopPath}
          pathLength={1}
          className={`${styles.edgeDashed} ${styles.draw}`}
          style={{ transitionDelay: `${last * 130 + 600}ms`, transitionDuration: "1.6s" }}
        />
        <polygon
          points={`${CX - BOX_W / 2 - 12},${cy(0) - 5} ${CX - BOX_W / 2 - 12},${cy(0) + 5} ${CX - BOX_W / 2 - 4},${cy(0)}`}
          className={`${styles.arrow} ${styles.node}`}
          style={{ transitionDelay: `${last * 130 + 1500}ms` }}
        />
        <text
          x={30}
          y={(cy(0) + cy(last)) / 2}
          textAnchor="middle"
          className={`${styles.labelSmall} ${styles.node}`}
          style={{ transitionDelay: `${last * 130 + 900}ms` }}
          transform={`rotate(-90 30 ${(cy(0) + cy(last)) / 2})`}
        >
          itération
        </text>

        {STEPS.map((s, i) => (
          <g key={s}>
            {i > 0 && (
              <g>
                <line
                  x1={CX}
                  y1={cy(i - 1) + BOX_H / 2}
                  x2={CX}
                  y2={cy(i) - BOX_H / 2 - 8}
                  pathLength={1}
                  className={`${styles.edge} ${styles.draw}`}
                  style={{ transitionDelay: `${i * 130}ms` }}
                />
                <polygon
                  points={`${CX - 5},${cy(i) - BOX_H / 2 - 14} ${CX + 5},${cy(i) - BOX_H / 2 - 14} ${CX},${cy(i) - BOX_H / 2 - 6}`}
                  className={`${styles.arrow} ${styles.node}`}
                  style={{ transitionDelay: `${i * 130 + 450}ms` }}
                />
              </g>
            )}
            <g className={styles.node} style={{ transitionDelay: `${i * 130 + 200}ms` }}>
              <rect
                x={CX - BOX_W / 2}
                y={cy(i) - BOX_H / 2}
                width={BOX_W}
                height={BOX_H}
                rx={10}
                className={i === 0 || i === last ? styles.boxAccent : styles.box}
              />
              <text x={CX} y={cy(i) + 1} className={styles.label}>
                {s}
              </text>
            </g>
          </g>
        ))}
        <FlowPulse path={`M${CX},${cy(0) + BOX_H / 2} L${CX},${cy(1) - BOX_H / 2}`} dur={2} />
      </svg>
    </Figure>
  );
}

import { Figure } from "./Figure";
import { FlowPulse } from "./FlowPulse";
import styles from "./Illustration.module.css";

const BRANCHES = [
  { label: "Authentification", x: 260, y: 44 },
  { label: "Autorisation", x: 442, y: 122 },
  { label: "Chiffrement", x: 442, y: 232 },
  { label: "Réseau", x: 260, y: 312 },
  { label: "Supervision", x: 78, y: 177 },
];
const BW = 152;
const BH = 40;
const CX = 260;
const CY = 177;

/**
 * La sécurité comme propriété transverse : une application protégée
 * sur cinq axes — authentification, autorisation, chiffrement,
 * réseau et supervision.
 */
export function CybersecurityDiagram() {
  // Points de départ sur le contour de la boîte centrale (150×54).
  const starts: Record<string, [number, number]> = {
    Authentification: [CX, CY - 27],
    Autorisation: [CX + 75, CY - 12],
    Chiffrement: [CX + 75, CY + 12],
    Réseau: [CX, CY + 27],
    Supervision: [CX - 75, CY],
  };

  return (
    <Figure label="Schéma : une application au centre, protégée par l'authentification, l'autorisation, le chiffrement, le réseau et la supervision">
      <svg viewBox="0 0 520 360" className={styles.svg} aria-hidden="true">
        {BRANCHES.map((b, i) => {
          const [sx, sy] = starts[b.label];
          const ex = b.x + (b.x < CX ? BW / 2 : b.x > CX ? -BW / 2 : 0);
          const ey = b.y + (b.y === CY ? 0 : b.y < CY ? BH / 2 : -BH / 2);
          const d = `M${sx},${sy} C${(sx + ex) / 2},${sy} ${(sx + ex) / 2},${ey} ${ex},${ey}`;
          const horiz = Math.abs(ey - sy) < 4;
          return (
            <g key={b.label}>
              <path
                d={d}
                pathLength={1}
                className={`${styles.edge} ${styles.draw}`}
                style={{ transitionDelay: `${500 + i * 150}ms` }}
              />
              <polygon
                points={
                  horiz
                    ? b.x < CX
                      ? `${ex + 8},${ey - 5} ${ex + 8},${ey + 5} ${ex},${ey}`
                      : `${ex - 8},${ey - 5} ${ex - 8},${ey + 5} ${ex},${ey}`
                    : `${ex - 5},${ey + (b.y < CY ? 8 : -8)} ${ex + 5},${ey + (b.y < CY ? 8 : -8)} ${ex},${ey}`
                }
                className={`${styles.arrow} ${styles.node}`}
                style={{ transitionDelay: `${950 + i * 150}ms` }}
              />
              <g className={styles.node} style={{ transitionDelay: `${650 + i * 150}ms` }}>
                <rect x={b.x - BW / 2} y={b.y - BH / 2} width={BW} height={BH} rx={10} className={styles.box} />
                <text x={b.x} y={b.y + 1} className={styles.label}>
                  {b.label}
                </text>
              </g>
            </g>
          );
        })}

        {/* Cœur : l'application */}
        <g className={styles.node} style={{ transitionDelay: "200ms" }}>
          <rect x={CX - 75} y={CY - 27} width={150} height={54} rx={12} className={styles.boxAccent} />
          <text x={CX} y={CY + 1} className={styles.label}>
            Application
          </text>
        </g>
        <FlowPulse path={`M${CX},${CY - 27} L${CX},${44 + BH / 2}`} dur={2.2} />
      </svg>
    </Figure>
  );
}

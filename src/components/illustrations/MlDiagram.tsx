import { Figure } from "./Figure";
import { FlowPulse } from "./FlowPulse";
import styles from "./Illustration.module.css";

const LEFT = ["Données", "Préparation", "Entraînement", "Modèle", "Évaluation", "Prédiction"];
const RIGHT = ["Déploiement", "Monitoring", "Réentraînement"];
const LX = 125;
const RX = 365;
const W = 180;
const H = 42;
const GAP = 66;

function VEdge({ x, y1, y2, delay, dashed = false }: { x: number; y1: number; y2: number; delay: number; dashed?: boolean }) {
  return (
    <g>
      <line
        x1={x}
        y1={y1}
        x2={x}
        y2={y2 - 8}
        pathLength={1}
        className={`${dashed ? styles.edgeDashed : styles.edge} ${styles.draw}`}
        style={{ transitionDelay: `${delay}ms` }}
      />
      <polygon
        points={`${x - 5},${y2 - 14} ${x + 5},${y2 - 14} ${x},${y2 - 6}`}
        className={`${styles.arrow} ${styles.node}`}
        style={{ transitionDelay: `${delay + 450}ms` }}
      />
    </g>
  );
}

/**
 * Pipeline de machine learning : de la donnée à la prédiction,
 * puis exploitation avec boucle de ré-entraînement.
 */
export function MlDiagram() {
  const ly = (i: number) => 34 + i * GAP;
  const ry = (i: number) => 34 + (i + 3) * GAP; // aligné sur Model (index 3)
  const retrainPath = `M${RX - W / 2},${ry(2)} C200,${ry(2) + 30} 60,${ry(2) + 10} 45,${ry(2) - 60} C35,${ry(2) - 110} 40,${ly(2) + 60} 48,${ly(2) + 30}`;

  return (
    <Figure label="Schéma : pipeline de machine learning, de la donnée à la prédiction, puis déploiement et ré-entraînement">
      <svg viewBox="0 0 490 430" className={styles.svg} aria-hidden="true">
        {/* Boucle de ré-entraînement (derrière) */}
        <path
          d={retrainPath}
          pathLength={1}
          className={`${styles.edgeDashed} ${styles.draw}`}
          style={{ transitionDelay: "2200ms", transitionDuration: "1.6s" }}
        />
        <polygon
          points={`40,${ly(2) + 24} 56,${ly(2) + 24} 48,${ly(2) + 32}`}
          className={`${styles.arrow} ${styles.node}`}
          style={{ transitionDelay: "3100ms" }}
        />
        <text
          x={26}
          y={(ly(2) + ry(2)) / 2 + 10}
          textAnchor="middle"
          className={`${styles.labelSmall} ${styles.node}`}
          style={{ transitionDelay: "2600ms" }}
          transform={`rotate(-90 26 ${(ly(2) + ry(2)) / 2 + 10})`}
        >
          ré-entraînement
        </text>

        {/* Colonne principale */}
        {LEFT.map((s, i) => (
          <g key={s}>
            {i > 0 && (
              <VEdge x={LX} y1={ly(i - 1) + H / 2} y2={ly(i) - H / 2} delay={i * 120} />
            )}
            <g className={styles.node} style={{ transitionDelay: `${i * 120 + 180}ms` }}>
              <rect
                x={LX - W / 2}
                y={ly(i) - H / 2}
                width={W}
                height={H}
                rx={10}
                className={s === "Modèle" ? styles.boxAccent : styles.box}
              />
              <text x={LX} y={ly(i) + 1} className={styles.label}>
                {s}
              </text>
            </g>
          </g>
        ))}

        {/* Lien Model → Deployment */}
        <path
          d={`M${LX + W / 2},${ly(3)} L${RX - W / 2 - 8},${ry(0)}`}
          pathLength={1}
          className={`${styles.edge} ${styles.draw}`}
          style={{ transitionDelay: "900ms" }}
        />
        <polygon
          points={`${RX - W / 2 - 14},${ry(0) - 5} ${RX - W / 2 - 14},${ry(0) + 5} ${RX - W / 2 - 6},${ry(0)}`}
          className={`${styles.arrow} ${styles.node}`}
          style={{ transitionDelay: "1350ms" }}
        />

        {/* Colonne exploitation */}
        {RIGHT.map((s, i) => (
          <g key={s}>
            {i > 0 && (
              <VEdge x={RX} y1={ry(i - 1) + H / 2} y2={ry(i) - H / 2} delay={1100 + i * 120} />
            )}
            <g className={styles.node} style={{ transitionDelay: `${1100 + i * 120 + 180}ms` }}>
              <rect
                x={RX - W / 2}
                y={ry(i) - H / 2}
                width={W}
                height={H}
                rx={10}
                className={styles.box}
              />
              <text x={RX} y={ry(i) + 1} className={styles.label}>
                {s}
              </text>
            </g>
          </g>
        ))}
        <FlowPulse path={`M${LX},${ly(0) + H / 2} L${LX},${ly(1) - H / 2}`} dur={2} />
      </svg>
    </Figure>
  );
}

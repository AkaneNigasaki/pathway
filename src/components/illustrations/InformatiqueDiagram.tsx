import { Figure } from "./Figure";
import { FlowPulse } from "./FlowPulse";
import styles from "./Illustration.module.css";

const COLS = [
  { label: "Logiciel", sub: "Web · IA", x: 100 },
  { label: "Données", sub: "ML · SQL", x: 260 },
  { label: "Systèmes", sub: "Linux · Cloud", x: 420 },
];
const CX = 260;

/**
 * Carte des grands domaines de l'informatique : un tronc commun
 * qui se ramifie en trois piliers, tous traversés par la cybersécurité.
 */
export function InformatiqueDiagram() {
  return (
    <Figure label="Schéma : l'informatique se divise en logiciel, données et systèmes, avec la cybersécurité en transverse">
      <svg viewBox="0 0 520 400" className={styles.svg} aria-hidden="true">
        {/* Tronc */}
        <g className={styles.node} style={{ transitionDelay: "0ms" }}>
          <rect x={CX - 115} y={12} width={230} height={50} rx={12} className={styles.boxAccent} />
          <text x={CX} y={38} className={styles.label}>
            Informatique
          </text>
        </g>

        {/* Trois piliers */}
        {COLS.map((c, i) => (
          <g key={c.label}>
            <line
              x1={CX}
              y1={62}
              x2={c.x}
              y2={104}
              pathLength={1}
              className={`${styles.edge} ${styles.draw}`}
              style={{ transitionDelay: `${250 + i * 120}ms` }}
            />
            <g className={styles.node} style={{ transitionDelay: `${400 + i * 120}ms` }}>
              <rect x={c.x - 78} y={104} width={156} height={62} rx={10} className={styles.box} />
              <text x={c.x} y={126} className={styles.label}>
                {c.label}
              </text>
              <text x={c.x} y={148} className={styles.labelSmall}>
                {c.sub}
              </text>
            </g>
            {/* Convergence vers la cybersécurité */}
            <path
              d={`M${c.x},166 C${c.x},230 ${(c.x + CX) / 2},240 ${CX - (i === 1 ? 105 : 0)},272`}
              pathLength={1}
              className={`${styles.edge} ${styles.draw}`}
              style={{ transitionDelay: `${900 + i * 140}ms` }}
            />
          </g>
        ))}

        {/* Cybersécurité transverse */}
        <g className={styles.node} style={{ transitionDelay: "1300ms" }}>
          <rect x={CX - 115} y={272} width={230} height={50} rx={12} className={styles.box} />
          <text x={CX} y={298} className={styles.label}>
            Cybersécurité
          </text>
        </g>
        <text
          x={CX}
          y={348}
          textAnchor="middle"
          className={`${styles.labelSmall} ${styles.node}`}
          style={{ transitionDelay: "1500ms" }}
        >
          transverse à tous les domaines
        </text>
        <FlowPulse path={`M${CX},62 L${CX},104`} dur={2.4} />
      </svg>
    </Figure>
  );
}

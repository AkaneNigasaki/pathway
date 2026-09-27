import { Figure } from "./Figure";
import { FlowPulse } from "./FlowPulse";
import styles from "./Illustration.module.css";

const BOX_W = 150;
const BOX_H = 46;
const CX = 160;

function Box({ cy, label, accent = false, delay }: { cy: number; label: string; accent?: boolean; delay: number }) {
  return (
    <g className={styles.node} style={{ transitionDelay: `${delay}ms` }}>
      <rect
        x={CX - BOX_W / 2}
        y={cy - BOX_H / 2}
        width={BOX_W}
        height={BOX_H}
        rx={10}
        className={accent ? styles.boxAccent : styles.box}
      />
      <text x={CX} y={cy + 1} className={styles.label}>
        {label}
      </text>
    </g>
  );
}

function Edge({ y1, y2, label, delay }: { y1: number; y2: number; label?: string; delay: number }) {
  return (
    <g>
      <line
        x1={CX}
        y1={y1}
        x2={CX}
        y2={y2 - 8}
        pathLength={1}
        className={`${styles.edge} ${styles.draw}`}
        style={{ transitionDelay: `${delay}ms` }}
      />
      <polygon
        points={`${CX - 5},${y2 - 14} ${CX + 5},${y2 - 14} ${CX},${y2 - 6}`}
        className={`${styles.arrow} ${styles.node}`}
        style={{ transitionDelay: `${delay + 500}ms` }}
      />
      {label && (
        <text
          x={CX + 12}
          y={(y1 + y2) / 2}
          textAnchor="start"
          dominantBaseline="central"
          className={`${styles.labelSmall} ${styles.node}`}
          style={{ transitionDelay: `${delay + 250}ms` }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/**
 * CLIENT → API → SERVEUR → BASE DE DONNÉES.
 * Montre le rôle d'une API : l'interface entre le client et le serveur.
 */
export function ApiDiagram() {
  return (
    <Figure label="Schéma : un client appelle une API, qui interroge le serveur puis la base de données">
      <svg viewBox="0 0 320 400" className={styles.svg} aria-hidden="true">
        <Box cy={40} label="Client" delay={0} />
        <Edge y1={63} y2={119} label="HTTP" delay={150} />
        <Box cy={142} label="API" accent delay={500} />
        <Edge y1={165} y2={221} delay={650} />
        <Box cy={244} label="Serveur" delay={1000} />
        <Edge y1={267} y2={323} label="SQL" delay={1150} />
        <Box cy={346} label="Base de données" delay={1500} />
        <FlowPulse path="M160,63 L160,111" dur={2.2} />
      </svg>
    </Figure>
  );
}

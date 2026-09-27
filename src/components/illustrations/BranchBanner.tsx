/**
 * Bannières abstraites des 8 branches de la filière Informatique.
 *
 * Motifs géométriques sobres dessinés à la main (aucun cliché visuel) :
 * adaptés au thème clair/sombre via currentColor et les variables CSS,
 * purement décoratifs (aria-hidden).
 *
 * Note : les couleurs passent par des classes de BranchBanner.module.css,
 * car var() n'est pas valide dans les attributs de présentation SVG.
 */

import styles from "./BranchBanner.module.css";

function Fondations() {
  return (
    <g>
      <path
        className={styles.motifFaint}
        d="M0 45H400M0 90H400M60 0V150M140 0V150M220 0V150M300 0V150M380 0V150"
      />
      <path className={styles.motifAccent} d="M52 78V52h26" />
      <circle className={styles.soft} cx={318} cy={62} r={34} />
      <path className={styles.motifFaint} d="M318 20v84M276 62h84" />
      <circle className={styles.dotAccent} cx={318} cy={62} r={3.5} />
      <path className={styles.motif} d="M52 118h120" />
      <circle className={styles.dot} cx={196} cy={118} r={3.5} />
    </g>
  );
}

function Developpement() {
  return (
    <g>
      <rect className={styles.soft} x={150} y={18} width={104} height={50} rx={9} />
      <rect className={styles.soft} x={164} y={52} width={104} height={50} rx={9} />
      <rect className={styles.motifAccent} x={178} y={86} width={104} height={50} rx={9} />
      <path className={styles.motif} d="M96 44h-16v62h16" />
      <path className={styles.motif} d="M316 44h16v62h-16" />
      <circle className={styles.dot} cx={88} cy={118} r={3.5} />
      <circle className={styles.dotAccent} cx={324} cy={32} r={3.5} />
    </g>
  );
}

function Ia() {
  return (
    <g>
      <path className={styles.motif} d="M-10 52C60 30 120 74 190 52s130-24 220 4" />
      <path className={styles.motifFaint} d="M-10 86C70 64 130 108 200 86s130-24 220 2" />
      <path className={styles.motifAccentSoft} d="M-10 120C80 98 140 140 210 118s120-22 200 0" />
      <path className={styles.motif} d="M292 34l26 18M318 52l30-12M292 34l-4 30" />
      <circle className={styles.dotAccent} cx={292} cy={34} r={4} />
      <circle className={styles.dot} cx={318} cy={52} r={4} />
      <circle className={styles.dot} cx={348} cy={40} r={4} />
      <circle className={styles.dot} cx={288} cy={64} r={4} />
    </g>
  );
}

function Infrastructure() {
  return (
    <g>
      <path className={styles.motif} d="M16 78h368" />
      <rect className={styles.soft} x={58} y={52} width={52} height={52} rx={10} />
      <rect className={styles.motifAccent} x={174} y={52} width={52} height={52} rx={10} />
      <rect className={styles.soft} x={290} y={52} width={52} height={52} rx={10} />
      <circle className={styles.dot} cx={142} cy={78} r={5} />
      <circle className={styles.dotAccent} cx={258} cy={78} r={5} />
      <path className={styles.motifFaint} d="M200 52v-14M200 104v14" />
    </g>
  );
}

function Data() {
  const bars = [44, 72, 52, 92, 64];
  return (
    <g>
      <path
        className={styles.motifAccentSoft}
        d="M16 58C100 22 190 96 280 60s80-18 110-8"
      />
      {[58, 106, 154, 202, 250].map((x, i) => (
        <rect
          key={x}
          className={i === 3 ? styles.motifAccent : styles.soft}
          x={x}
          y={132 - bars[i]}
          width={30}
          height={bars[i]}
          rx={6}
        />
      ))}
      <circle className={styles.dotAccent} cx={330} cy={46} r={4} />
      <circle className={styles.dot} cx={352} cy={40} r={3} />
    </g>
  );
}

function Automation() {
  return (
    <g>
      <path className={styles.motif} d="M70 78C105 74 118 52 156 48" />
      <path className={styles.motif} d="M156 48c38 2 50 44 88 50" />
      <path className={styles.motifAccentSoft} d="M244 98c36-2 48-34 84-36" />
      <circle className={styles.soft} cx={70} cy={78} r={10} />
      <circle className={styles.soft} cx={156} cy={48} r={10} />
      <circle className={styles.soft} cx={244} cy={98} r={10} />
      <circle className={styles.motifAccent} cx={328} cy={62} r={10} />
      <circle className={styles.dotAccent} cx={328} cy={62} r={3.5} />
    </g>
  );
}

function Cybersecurite() {
  return (
    <g>
      <path className={styles.motif} d="M150 138a52 52 0 0 1 104 0" />
      <path className={styles.motifFaint} d="M122 138a80 80 0 0 1 160 0" />
      <path className={styles.motifAccent} d="M178 138a24 24 0 0 1 48 0" />
      <circle className={styles.dotAccent} cx={202} cy={138} r={4} />
      <path className={styles.soft} d="M318 34l22 13v26l-22 13-22-13V47z" />
      <circle className={styles.dot} cx={318} cy={60} r={3.5} />
      <path className={styles.motifSoft} d="M96 44v10M88 49h16M96 108v10M88 113h16" />
    </g>
  );
}

function Robotique() {
  return (
    <g>
      <path className={styles.motif} d="M36 122h84V64h72" />
      <path className={styles.motifFaint} d="M108 122V94h72" />
      <circle className={styles.dot} cx={36} cy={122} r={4.5} />
      <circle className={styles.dotAccent} cx={192} cy={64} r={4.5} />
      <circle className={styles.dot} cx={108} cy={122} r={4.5} />
      <circle className={styles.dot} cx={180} cy={94} r={4.5} />
      <path className={styles.motifAccent} d="M268 108L312 66" />
      <circle className={styles.soft} cx={268} cy={108} r={11} />
      <circle className={styles.dotAccent} cx={268} cy={108} r={3.5} />
      <circle className={styles.soft} cx={312} cy={66} r={6} />
      <path className={styles.motif} d="M312 66l26-8" />
    </g>
  );
}

const MOTIFS: Record<string, () => React.JSX.Element> = {
  fondations: Fondations,
  developpement: Developpement,
  ia: Ia,
  infrastructure: Infrastructure,
  data: Data,
  automation: Automation,
  cybersecurite: Cybersecurite,
  robotique: Robotique,
};

export function BranchBanner({
  branch,
  className = "",
}: {
  branch: string;
  className?: string;
}) {
  const Motif = MOTIFS[branch] ?? Fondations;
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" focusable="false">
        <Motif />
      </svg>
    </div>
  );
}

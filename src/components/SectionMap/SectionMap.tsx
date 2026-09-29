import { Fragment, useEffect, useState } from "react";
import {
  LuLightbulb,
  LuBookOpen,
  LuTarget,
  LuWrench,
  LuDownload,
  LuBrain,
  LuFlaskConical,
  LuHammer,
  LuListChecks,
  LuLibrary,
  LuTriangleAlert,
  LuBug,
  LuBadgeCheck,
  LuShieldCheck,
  LuGauge,
  LuWorkflow,
  LuTerminal,
  LuCompass,
  LuNetwork,
  LuRefreshCw,
  LuBan,
  LuHistory,
  LuSettings,
  LuDatabase,
  LuRocket,
  LuSparkles,
  LuClipboardList,
  LuBriefcase,
  LuScale,
  LuTestTube,
  LuCircleHelp,
  LuBookMarked,
  LuPencilRuler,
  LuWaypoints,
  LuOrbit,
  LuBraces,
  LuCog,
  LuPlay,
  LuAccessibility,
  LuKeyRound,
  LuActivity,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import type { LearningLevel } from "../../data/skill-guides";
import styles from "./SectionMap.module.css";

export interface MapSection {
  /** Ancre de la section (ex. « learn-installation »). */
  id: string;
  label: string;
  /** Niveau de la section, pour les Learning Pages. Absent pour les docs classiques. */
  level?: LearningLevel;
}

interface SectionMapProps {
  sections: MapSection[];
  /** Niveau actuellement affiché : les sections supérieures sont estompées. */
  level: LearningLevel;
  onSelect: (section: MapSection) => void;
}

const STAGE: Record<LearningLevel, { name: string; hint: string }> = {
  1: { name: "Aperçu", hint: "30 secondes" },
  2: { name: "Pratique", hint: "5 à 15 minutes" },
  3: { name: "Approfondi", hint: "En profondeur" },
};

/**
 * Racinisation légère pour le français (pluriels, accords) : « ressources »,
 * « erreurs », « bonnes pratiques » matchent leurs formes de base.
 */
function stem(w: string): string {
  let s = w;
  if (s.length > 3 && s.endsWith("s")) s = s.slice(0, -1);
  if (s.length > 3 && s.endsWith("e")) s = s.slice(0, -1);
  return s;
}

/**
 * Associe chaque section à une icône pertinente, façon nœuds de roadmap.
 * Règles ordonnées : le premier mot-clé trouvé gagne. La comparaison se fait
 * sur l'id et le libellé normalisés (minuscules, sans accents, racinisés).
 * Le premier nœud est toujours l'ampoule du départ.
 */
const RAW_RULES: Array<[string[], IconType]> = [
  [["prerequis"], LuListChecks],
  [["ressource"], LuLibrary],
  [["debug", "debugging", "debogage"], LuBug],
  [["erreur"], LuTriangleAlert],
  [["anti pattern", "antipattern"], LuBan],
  [["bonne pratique", "bonnes pratiques"], LuBadgeCheck],
  [["securite"], LuShieldCheck],
  [["performance", "optimisation"], LuGauge],
  [["mise a jour", "migration"], LuRefreshCw],
  [["projet"], LuHammer],
  [["exemple"], LuFlaskConical],
  [["concept"], LuBrain],
  [["modele mental"], LuWaypoints],
  [["anatomie", "architecture"], LuNetwork],
  [["environnement"], LuWrench],
  [["installation", "mise en place"], LuDownload],
  [["cycle"], LuOrbit],
  [["syntaxe"], LuBraces],
  [["fonctionne", "fonctionnement"], LuCog],
  [["definition", "essentiel", "introduction", "presentation", "panorama", "vue d ensemble", "comprendre"], LuBookOpen],
  [["pourquoi"], LuTarget],
  [["workflow"], LuWorkflow],
  [["commande", "cli"], LuTerminal],
  [["editeur"], LuPencilRuler],
  [["outil"], LuWrench],
  [["que faire ensuite", "ensuite", "aller plus loin", "prochain", "continuer", "pas suivant"], LuCompass],
  [["comparaison", "versus", "vs", "face a"], LuScale],
  [["histoire", "historique"], LuHistory],
  [["glossaire", "vocabulaire", "terminologie"], LuBookMarked],
  [["faq", "question"], LuCircleHelp],
  [["astuce", "conseil"], LuSparkles],
  [["recapitulatif", "resume", "synthese"], LuClipboardList],
  [["cas d usage", "cas reel", "cas concret"], LuBriefcase],
  [["deploiement", "deploy"], LuRocket],
  [["configuration", "config"], LuSettings],
  [["reseau"], LuNetwork],
  [["donnee", "database", "sql"], LuDatabase],
  [["premier", "demarrage", "commencer", "premiers pas"], LuPlay],
  [["limite", "piege"], LuTriangleAlert],
  [["test", "tests", "testing"], LuTestTube],
  [["checklist"], LuListChecks],
  [["secret"], LuKeyRound],
  [["monitoring", "observabilite"], LuActivity],
  [["accessibilite"], LuAccessibility],
  [["script"], LuTerminal],
];

/** Règles de mapping section → icône, mots-clés racinisés. */
const RULES: Array<[string[], IconType]> = RAW_RULES.map(([keys, Icon]) => [
  keys.map((k) => k.split(" ").map(stem).join(" ")),
  Icon,
] as [string[], IconType]);

const norm = (v: string): string =>
  v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

function iconFor(section: MapSection, index: number): IconType | null {
  // Le départ du parcours : l'ampoule, façon Softaims (« la roadmap commence ici »).
  if (index === 0) return LuLightbulb;
  const words = new Set(norm(`${section.id} ${section.label}`).split(" ").map(stem));
  const flat = ` ${[...words].join(" ")} `;
  for (const [keys, Icon] of RULES) {
    if (keys.some((k) => (k.includes(" ") ? flat.includes(` ${k} `) : words.has(k)))) {
      return Icon;
    }
  }
  return null;
}

/**
 * Sommaire d'une page documentation sous forme de graphe de nœuds,
 * façon roadmap : une colonne vertébrale verticale, un vrai nœud
 * (disque + icône) par section, des paliers par niveau d'information,
 * la section visible mise en évidence.
 */
export function SectionMap({ sections, level, onSelect }: SectionMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections, level]);

  const go = (e: React.MouseEvent, section: MapSection) => {
    e.preventDefault();
    // Le parent met le hash à jour : le niveau bascule si besoin,
    // la section se déplie et la page cadre son en-tête.
    onSelect(section);
  };

  let lastStage = 0;

  return (
    <ol className={styles.spine}>
      {sections.map((s, i) => {
        const stage = s.level ?? 0;
        const showStage = stage !== 0 && stage !== lastStage;
        lastStage = stage;
        const future = (s.level ?? 1) > level;
        const active = activeId === s.id;
        const isStart = i === 0;
        const Icon = iconFor(s, i);
        const num = String(i + 1).padStart(2, "0");
        return (
          <Fragment key={s.id}>
            {showStage && (
              <li className={styles.stage} aria-hidden="true">
                <span className={styles.stageName}>{STAGE[stage as LearningLevel].name}</span>
                <span className={styles.stageHint}>{STAGE[stage as LearningLevel].hint}</span>
              </li>
            )}
            <li
              className={`${styles.node}${future ? ` ${styles.future}` : ""}${
                active ? ` ${styles.active}` : ""
              }${isStart ? ` ${styles.start}` : ""}`}
            >
              <a
                href={`#${s.id}`}
                onClick={(e) => go(e, s)}
                aria-current={active ? "true" : undefined}
              >
                <span className={styles.disc} aria-hidden="true">
                  {Icon ? <Icon size={17} /> : <span className={styles.discNum}>{num}</span>}
                </span>
                <span className={styles.num} aria-hidden="true">
                  {num}
                </span>
                <span className={styles.label}>{s.label}</span>
              </a>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}

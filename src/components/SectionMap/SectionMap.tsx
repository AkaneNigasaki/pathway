import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  LuCheck,
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

interface StageGroup {
  level: LearningLevel;
  sections: MapSection[];
}

interface WirePaths {
  spine: string;
  branches: string[];
  w: number;
  h: number;
}

/**
 * Sommaire d'une page documentation sous forme de graphe de nœuds,
 * façon vue « Colonne » : les niveaux sont des nœuds catégorie (pilules),
 * les sections des nœuds enfants (cartes), reliés par des courbes SVG
 * calculées depuis les positions réelles des nœuds.
 */
export function SectionMap({ sections, level, onSelect }: SectionMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Regroupe les sections par niveau, dans l'ordre.
  const stages: StageGroup[] = useMemo(() => {
    const map = new Map<LearningLevel, MapSection[]>();
    for (const s of sections) {
      const lv = (s.level ?? 1) as LearningLevel;
      if (!map.has(lv)) map.set(lv, []);
      map.get(lv)!.push(s);
    }
    return [...map.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([lv, secs]) => ({ level: lv, sections: secs }));
  }, [sections]);

  // Panneau repliable sur mobile.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Suit la section visible (scroll-spy).
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

  // Refs des nœuds pour le calcul des courbes SVG.
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLElement>());
  const [paths, setPaths] = useState<WirePaths>({ spine: "", branches: [], w: 0, h: 0 });

  const setNodeRef = (key: string) => (el: HTMLElement | null) => {
    if (el) nodeRefs.current.set(key, el);
    else nodeRefs.current.delete(key);
  };

  // Calcule les courbes depuis les positions réelles (getBoundingClientRect
  // relatif au conteneur + scrollTop pour l'espace de défilement).
  // Pas de coordonnées fixes, pas d'animation du SVG.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const compute = () => {
      const cRect = container.getBoundingClientRect();
      const scrollTop = container.scrollTop;
      const box = (key: string) => {
        const el = nodeRefs.current.get(key);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          cx: r.left - cRect.left + r.width / 2,
          top: r.top - cRect.top + scrollTop,
          bottom: r.top - cRect.top + scrollTop + r.height,
        };
      };
      // Courbe verticale douce entre deux pilules (colonne vertébrale).
      const vcurve = (x1: number, y1: number, x2: number, y2: number) => {
        if (y2 <= y1) return "";
        const dy = Math.max(18, (y2 - y1) * 0.5);
        const f = (n: number) => n.toFixed(1);
        return `M ${f(x1)} ${f(y1)} C ${f(x1)} ${f(y1 + dy)}, ${f(x2)} ${f(y2 - dy)}, ${f(x2)} ${f(y2)}`;
      };

      const spine: string[] = [];
      for (let i = 0; i < stages.length - 1; i++) {
        const a = box(`cat-${stages[i].level}`);
        const b = box(`cat-${stages[i + 1].level}`);
        if (a && b) {
          const d = vcurve(a.cx, a.bottom, b.cx, b.top);
          if (d) spine.push(d);
        }
      }

      setPaths({
        spine: spine.join(" "),
        branches: [],
        w: Math.ceil(container.scrollWidth),
        h: Math.ceil(container.scrollHeight),
      });
    };

    compute();
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    });
    ro.observe(container);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [sections, level, isMobile, stages]);

  const go = (e: React.MouseEvent, section: MapSection) => {
    e.preventDefault();
    // Le parent met le hash à jour : le niveau bascule si besoin,
    // la section se déplie et la page cadre son en-tête.
    onSelect(section);
  };

  // Heuristique de progression : les sections situées avant la section
  // visible sont considérées comme lues (icône coche, statut rempli).
  const activeIndex = activeId ? sections.findIndex((s) => s.id === activeId) : -1;

  // Panneau overlay : quelle catégorie est ouverte (ses sections à gauche).
  const [openLevel, setOpenLevel] = useState<LearningLevel | null>(null);
  const openStage = openLevel != null ? stages.find((g) => g.level === openLevel) : null;

  // Ferme le panneau à Échap.
  useEffect(() => {
    if (openLevel == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenLevel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openLevel]);

  const toggle = (lv: LearningLevel) => {
    setOpenLevel((cur) => (cur === lv ? null : lv));
  };

  const graph = (
    <div className={`${styles.graph}${openLevel != null ? ` ${styles.graphHasOverlay}` : ""}`} ref={containerRef}>
      <svg
        className={styles.wires}
        width={paths.w > 0 ? paths.w : undefined}
        height={paths.h > 0 ? paths.h : undefined}
        aria-hidden="true"
        focusable="false"
      >
        {paths.spine && <path d={paths.spine} className={styles.spinePath} />}
      </svg>

      <div className={styles.pills}>
        {stages.map((g, ci) => {
          const isOpen = openLevel === g.level;
          // Le niveau actif = celui qui contient la section visible.
          const hasActive = activeId != null && g.sections.some((s) => s.id === activeId);
          return (
            <button
              key={g.level}
              ref={setNodeRef(`cat-${g.level}`)}
              type="button"
              className={`${styles.catNode}${isOpen ? ` ${styles.catOpen}` : ""}${
                hasActive ? ` ${styles.catHasActive}` : ""
              }`}
              onClick={() => toggle(g.level)}
              aria-expanded={isOpen}
              aria-current={hasActive ? "step" : undefined}
            >
              <span className={`${styles.catNum} mono`} aria-hidden="true">
                {String(ci + 1).padStart(2, "0")}
              </span>
              <span className={styles.catText}>
                <span className={styles.catName}>{STAGE[g.level].name}</span>
                <span className={styles.catHint}>{STAGE[g.level].hint}</span>
              </span>
              <span className={styles.catCount} aria-label={`${g.sections.length} sections`}>
                {g.sections.length}
              </span>
            </button>
          );
        })}
      </div>

      {openStage && (
        <div className={styles.overlay} role="dialog" aria-label={`Sections ${STAGE[openStage.level].name}`}>
          <div className={styles.overlayHead}>
            <span className={styles.overlayTitle}>{STAGE[openStage.level].name}</span>
            <button
              type="button"
              className={styles.overlayClose}
              onClick={() => setOpenLevel(null)}
              aria-label="Fermer le panneau"
            >
              ×
            </button>
          </div>
          <ol className={styles.children}>
            {openStage.sections.map((s, idx) => {
              const i = sections.findIndex((x) => x.id === s.id);
              const future = (s.level ?? 1) > level;
              const active = activeId === s.id;
              const done = activeIndex >= 0 && i < activeIndex && i >= 0;
              const Icon = iconFor(s, i >= 0 ? i : idx);
              const num = String((i >= 0 ? i : idx) + 1).padStart(2, "0");
              return (
                <li
                  key={s.id}
                  className={`${styles.child}${future ? ` ${styles.childFuture}` : ""}${
                    active ? ` ${styles.childActive}` : ""
                  }${done ? ` ${styles.childDone}` : ""}`}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => {
                      go(e, s);
                      setOpenLevel(null);
                    }}
                    aria-current={active ? "step" : undefined}
                  >
                    <span className={styles.childIcon} aria-hidden="true">
                      {done ? (
                        <LuCheck size={15} />
                      ) : Icon ? (
                        <Icon size={15} />
                      ) : (
                        <span className={styles.childNum}>{num}</span>
                      )}
                    </span>
                    <span className={styles.childLabel}>{s.label}</span>
                    <span
                      className={`${styles.dot}${done ? ` ${styles.dotDone}` : ""}`}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <details className={styles.mobilePanel}>
        <summary className={styles.mobileSummary}>Sommaire</summary>
        <div className={styles.mobileBody}>{graph}</div>
      </details>
    );
  }

  return graph;
}

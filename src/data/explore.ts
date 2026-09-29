import type { Career, Field, Roadmap, SkillLevel, NodeType } from "../types";
import { ROADMAPS } from "./roadmaps";
import { FIELDS } from "./fields";
import { CAREERS } from "./careers";

/**
 * Couche d'agrégation pour la page /explore.
 *
 * La page d'exploration travaille au niveau des ENTITÉS (filières, métiers,
 * compétences, technologies, roadmaps) — jamais au niveau des micro-sections
 * de guides. Toutes les données proviennent du système existant : rien n'est
 * inventé ici.
 */

/** Une compétence dédupliquée sur l'ensemble des roadmaps. */
export interface ExploreSkill {
  id: string;
  name: string;
  tagline: string;
  description: string;
  level: SkillLevel;
  type: NodeType;
  /** Slugs de toutes les roadmaps contenant cette compétence. */
  roadmapSlugs: string[];
  /** Roadmap préférée pour le lien (la plus spécifique, pas la méga-carte). */
  canonicalRoadmap: string;
  fieldId: string;
  prerequisites: string[];
  relatedSkills: string[];
  duration: string;
}

const TECH_TYPES: NodeType[] = ["language", "framework", "tool", "platform"];

/**
 * Les données typent parfois des technologies concrètes en "concept".
 * Cette table corrige le type au niveau de la couche explore uniquement
 * (les données sources et leurs visuels ne sont pas modifiés).
 */
const TECH_TYPE_OVERRIDE: Record<string, NodeType> = {
  python: "language",
  javascript: "language",
  typescript: "language",
  java: "language",
  go: "language",
  rust: "language",
  csharp: "language",
  html: "language",
  css: "language",
  react: "framework",
  angular: "framework",
  vue: "framework",
  django: "framework",
  aspnet: "framework",
  nextjs: "framework",
  ros: "framework",
  docker: "tool",
  git: "tool",
  figma: "tool",
  "ci-cd": "tool",
  cicd: "tool",
  kubernetes: "platform",
  linux: "platform",
};

let skillsCache: ExploreSkill[] | null = null;

/**
 * Toutes les compétences des roadmaps, dédupliquées par id.
 * La roadmap canonique est la première roadmap spécifique (hors
 * "informatique", qui est la méga-carte) contenant la compétence.
 */
export function getExploreSkills(): ExploreSkill[] {
  if (skillsCache) return skillsCache;
  const byId = new Map<string, ExploreSkill>();
  const order = [...ROADMAPS].sort((a, b) =>
    a.slug === "informatique" ? 1 : b.slug === "informatique" ? -1 : 0
  );
  for (const roadmap of order) {
    for (const s of roadmap.skills) {
      const existing = byId.get(s.id);
      if (existing) {
        existing.roadmapSlugs.push(roadmap.slug);
      } else {
        byId.set(s.id, {
          id: s.id,
          name: s.name,
          tagline: s.tagline,
          description: s.description,
          level: s.level,
          type: TECH_TYPE_OVERRIDE[s.id] ?? s.type ?? "concept",
          roadmapSlugs: [roadmap.slug],
          canonicalRoadmap: roadmap.slug,
          fieldId: roadmap.fieldId,
          prerequisites: s.prerequisites,
          relatedSkills: s.relatedSkills ?? [],
          duration: s.duration,
        });
      }
    }
  }
  skillsCache = [...byId.values()].sort((a, b) => a.name.localeCompare(b.name, "fr"));
  return skillsCache;
}

/** Technologies = compétences concrètes (langages, frameworks, outils, plateformes). */
export function getTechnologies(): ExploreSkill[] {
  return getExploreSkills().filter((s) => TECH_TYPES.includes(s.type));
}

export function getExploreRoadmaps(): Roadmap[] {
  return ROADMAPS;
}

export function getExploreCareers(): Career[] {
  return CAREERS;
}

export function getExploreFields(): Field[] {
  return FIELDS;
}

/** Compte les entités rattachées à une filière (pour les cartes). */
export function getFieldStats(fieldId: string): {
  roadmaps: number;
  careers: number;
  skills: number;
} {
  const roadmaps = ROADMAPS.filter((r) => r.fieldId === fieldId);
  return {
    roadmaps: roadmaps.length,
    careers: CAREERS.filter((c) => c.fieldId === fieldId).length,
    skills: roadmaps.reduce((n, r) => n + r.skills.length, 0),
  };
}

/** Métiers dont la compétence fait partie du socle (nom exact ou roadmap du métier). */
export function getCareersForSkill(skill: ExploreSkill): Career[] {
  const norm = (v: string) => v.trim().toLowerCase();
  return CAREERS.filter(
    (c) =>
      c.roadmapSlug === skill.canonicalRoadmap ||
      [...c.coreSkills, ...c.complementarySkills].some((s) => norm(s) === norm(skill.name))
  );
}

// ---------------------------------------------------------------------------
// Recherche plein texte au niveau entités (sans l'index des micro-guides).
// ---------------------------------------------------------------------------

export type ExploreKind = "career" | "skill" | "technology" | "roadmap";

export interface ExploreHit {
  kind: ExploreKind;
  title: string;
  subtitle: string;
  url: string;
  level?: SkillLevel;
  type?: NodeType;
}

export interface ExploreSearchResults {
  careers: ExploreHit[];
  skills: ExploreHit[];
  technologies: ExploreHit[];
  roadmaps: ExploreHit[];
}

const norm = (v: string): string =>
  v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function scoreText(query: string, title: string, extra: string): number {
  const q = norm(query.trim());
  if (!q) return 0;
  const t = norm(title);
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 60;
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  if (words.length > 0 && words.every((w) => t.includes(w))) return 50;
  if (norm(extra).includes(q)) return 30;
  if (words.length > 0 && words.some((w) => norm(extra).includes(w))) return 15;
  return 0;
}

function skillUrl(s: ExploreSkill): string {
  return `/roadmaps/${s.canonicalRoadmap}?skill=${s.id}`;
}

/**
 * Recherche réelle dans les données Pathway : filières, métiers, compétences,
 * technologies et roadmaps. Aucun micro-guide de section n'est retourné.
 */
export function searchExplore(query: string, limit = 8): ExploreSearchResults {
  const q = query.trim();
  const empty: ExploreSearchResults = {
    careers: [],
    skills: [],
    technologies: [],
    roadmaps: [],
  };
  if (!q) return empty;

  const pick = (
    scored: { hit: ExploreHit; score: number }[]
  ): ExploreHit[] =>
    scored
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((x) => x.hit);

  const skills = getExploreSkills();
  const technologies = getTechnologies();

  return {
    careers: pick(
      CAREERS.map((c) => ({
        hit: {
          kind: "career" as const,
          title: c.title,
          subtitle: c.tagline,
          url: `/careers/${c.slug}`,
        },
        score: scoreText(q, c.title, `${c.tagline} ${c.description} ${c.coreSkills.join(" ")}`),
      }))
    ),
    skills: pick(
      skills.map((s) => ({
        hit: {
          kind: "skill" as const,
          title: s.name,
          subtitle: s.tagline,
          url: skillUrl(s),
          level: s.level,
          type: s.type,
        },
        score: scoreText(q, s.name, `${s.tagline} ${s.description}`),
      }))
    ),
    technologies: pick(
      technologies.map((s) => ({
        hit: {
          kind: "technology" as const,
          title: s.name,
          subtitle: s.tagline,
          url: skillUrl(s),
          level: s.level,
          type: s.type,
        },
        score: scoreText(q, s.name, `${s.tagline} ${s.description}`),
      }))
    ),
    roadmaps: pick(
      ROADMAPS.map((r) => ({
        hit: {
          kind: "roadmap" as const,
          title: r.title,
          subtitle: r.tagline,
          url: `/roadmaps/${r.slug}`,
        },
        score: scoreText(q, r.title, `${r.tagline} ${r.description}`),
      }))
    ),
  };
}

/** Vérifie qu'une compétence appartient (au moins par nom) au socle d'un métier. */
export function skillMatchesCareer(skill: ExploreSkill, career: Career): boolean {
  const n = skill.name.trim().toLowerCase();
  const names = [...career.coreSkills, ...career.complementarySkills].map((s) =>
    s.trim().toLowerCase()
  );
  return names.includes(n) || career.roadmapSlug === skill.canonicalRoadmap;
}

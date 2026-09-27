import type { Roadmap, Skill } from "../../types";
import { informatiqueRoadmap } from "./informatique";
import { frontendRoadmap } from "./frontend";
import { backendRoadmap } from "./backend";
import { devopsRoadmap } from "./devops";
import { aiRoadmap } from "./ai";
import { dataScienceRoadmap } from "./dataScience";
import { cybersecurityRoadmap } from "./cybersecurity";
import { uxRoadmap } from "./ux";
import { roboticsRoadmap } from "./robotics";

/**
 * Ajouter une roadmap = ajouter un module ici.
 * L'interface (listes, graphe, recherche, progression) s'adapte
 * automatiquement : aucune modification de composant n'est requise.
 */
export const ROADMAPS: Roadmap[] = [
  informatiqueRoadmap,
  frontendRoadmap,
  backendRoadmap,
  devopsRoadmap,
  aiRoadmap,
  dataScienceRoadmap,
  cybersecurityRoadmap,
  uxRoadmap,
  roboticsRoadmap,
];

export const ROADMAP_MAP: Record<string, Roadmap> = Object.fromEntries(
  ROADMAPS.map((r) => [r.slug, r])
);

export function getRoadmap(slug: string): Roadmap | undefined {
  return ROADMAP_MAP[slug];
}

export function getRoadmapsByField(fieldId: string): Roadmap[] {
  return ROADMAPS.filter((r) => r.fieldId === fieldId);
}

/** Index rapide skillId -> skill pour une roadmap donnée. */
export function skillMap(roadmap: Roadmap): Record<string, Skill> {
  return Object.fromEntries(roadmap.skills.map((s) => [s.id, s]));
}

export function getSkill(roadmap: Roadmap, skillId: string): Skill | undefined {
  return roadmap.skills.find((s) => s.id === skillId);
}

/** Compétences dont `skillId` est un prérequis direct. */
export function getNextSkills(roadmap: Roadmap, skillId: string): Skill[] {
  return roadmap.skills.filter((s) => s.prerequisites.includes(skillId));
}

/** Tous les prérequis transitifs d'une compétence (remontée du graphe). */
export function getAncestors(roadmap: Roadmap, skillId: string): Set<string> {
  const byId = skillMap(roadmap);
  const seen = new Set<string>();
  const visit = (id: string) => {
    const s = byId[id];
    if (!s) return;
    for (const p of s.prerequisites) {
      if (p === skillId || seen.has(p)) continue;
      seen.add(p);
      visit(p);
    }
  };
  visit(skillId);
  return seen;
}

/** Toutes les compétences qui dépendent transitivement de `skillId`. */
export function getDescendants(roadmap: Roadmap, skillId: string): Set<string> {
  const seen = new Set<string>();
  const visit = (id: string) => {
    for (const s of roadmap.skills) {
      if (s.prerequisites.includes(id) && !seen.has(s.id) && s.id !== skillId) {
        seen.add(s.id);
        visit(s.id);
      }
    }
  };
  visit(skillId);
  return seen;
}

/** Profondeur topologique : 0 = sans prérequis, sinon 1 + max(prérequis). */
export function skillDepth(roadmap: Roadmap, skillId: string): number {
  const byId = skillMap(roadmap);
  const memo = new Map<string, number>();
  const visiting = new Set<string>();
  const depth = (id: string): number => {
    const hit = memo.get(id);
    if (hit !== undefined) return hit;
    if (visiting.has(id)) return 0; // garde anti-cycle
    visiting.add(id);
    const s = byId[id];
    let d = 0;
    if (s && s.prerequisites.length > 0) {
      d = 1 + Math.max(...s.prerequisites.map((p) => depth(p)));
    }
    visiting.delete(id);
    memo.set(id, d);
    return d;
  };
  return depth(skillId);
}

export function countProjects(roadmap: Roadmap): number {
  return roadmap.skills.reduce((n, s) => n + s.projects.length, 0);
}

export function countConcepts(roadmap: Roadmap): number {
  return roadmap.skills.reduce((n, s) => n + s.concepts.length, 0);
}

export function totalSkills(): number {
  return ROADMAPS.reduce((n, r) => n + r.skills.length, 0);
}

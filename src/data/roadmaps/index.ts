import type { Roadmap, Skill } from "../../types";
import { frontendRoadmap } from "./frontend";
import { backendRoadmap } from "./backend";
import { devopsRoadmap } from "./devops";
import { aiRoadmap } from "./ai";
import { dataScienceRoadmap } from "./dataScience";
import { cybersecurityRoadmap } from "./cybersecurity";
import { droitRoadmap } from "./droit";
import { financeRoadmap } from "./finance";
import { economieRoadmap } from "./economie";
import { uxRoadmap } from "./ux";
import { roboticsRoadmap } from "./robotics";

/**
 * Ajouter une roadmap = ajouter un module ici.
 * L'interface (listes, graphe, recherche, progression) s'adapte
 * automatiquement : aucune modification de composant n'est requise.
 */
export const ROADMAPS: Roadmap[] = [
  frontendRoadmap,
  backendRoadmap,
  devopsRoadmap,
  aiRoadmap,
  dataScienceRoadmap,
  cybersecurityRoadmap,
  droitRoadmap,
  financeRoadmap,
  economieRoadmap,
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

export function countProjects(roadmap: Roadmap): number {
  return roadmap.skills.reduce((n, s) => n + s.projects.length, 0);
}

export function countConcepts(roadmap: Roadmap): number {
  return roadmap.skills.reduce((n, s) => n + s.concepts.length, 0);
}

export function totalSkills(): number {
  return ROADMAPS.reduce((n, r) => n + r.skills.length, 0);
}

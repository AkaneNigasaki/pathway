export type SkillLevel = "beginner" | "intermediate" | "advanced";

export const SKILL_LEVEL_LABEL: Record<SkillLevel, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

/** Catégorie visuelle d'un nœud de la carte des connaissances. */
export type NodeType =
  | "concept"
  | "language"
  | "framework"
  | "tool"
  | "platform"
  | "specialization";

export const NODE_TYPE_LABEL: Record<NodeType, string> = {
  concept: "Concept",
  language: "Langage",
  framework: "Framework",
  tool: "Outil",
  platform: "Plateforme",
  specialization: "Spécialisation",
};

export interface SkillResource {
  title: string;
  provider: string;
  url: string;
}

export interface Skill {
  id: string;
  name: string;
  tagline: string;
  description: string;
  level: SkillLevel;
  stage: string;
  /** Type de nœud (défaut : "concept"). */
  type?: NodeType;
  prerequisites: string[];
  /** Compétences liées (même écosystème, alternatives, usages proches). */
  relatedSkills?: string[];
  concepts: string[];
  projects: string[];
  resources: SkillResource[];
  duration: string;
}

/** État de progression d'une compétence : absent = non commencé. */
export type SkillStatus = "in-progress" | "done";

export const SKILL_STATUS_LABEL: Record<SkillStatus, string> = {
  "in-progress": "En cours",
  done: "Terminée",
};

export interface RoadmapStage {
  id: string;
  label: string;
  description: string;
}

export interface Roadmap {
  id: string;
  slug: string;
  fieldId: string;
  title: string;
  tagline: string;
  description: string;
  levelLabel: string;
  duration: string;
  stages: RoadmapStage[];
  skills: Skill[];
  careerSlugs: string[];
}

export interface Field {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  icon: string;
}

export interface Career {
  id: string;
  slug: string;
  fieldId: string;
  title: string;
  tagline: string;
  description: string;
  roadmapSlug: string;
  coreSkills: string[];
  complementarySkills: string[];
  projects: string[];
  demand: "Très forte" | "Forte" | "Stable" | "Émergente";
  salaryRange: string;
}

export type SearchItemType = "roadmap" | "field" | "career" | "skill";

export interface SearchItem {
  type: SearchItemType;
  id: string;
  title: string;
  subtitle: string;
  /** Fil d'Ariane affiché sous le titre, ex. "Informatique → Automation". */
  breadcrumb?: string;
  keywords: string;
  url: string;
  accent?: string;
  level?: SkillLevel;
  fieldId?: string;
  roadmapSlug?: string;
}

export type Theme = "light" | "dark";

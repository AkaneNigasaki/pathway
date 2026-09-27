export type SkillLevel = "beginner" | "intermediate" | "advanced";

export const SKILL_LEVEL_LABEL: Record<SkillLevel, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
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
  prerequisites: string[];
  concepts: string[];
  projects: string[];
  resources: SkillResource[];
  duration: string;
}

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
  keywords: string;
  url: string;
  accent?: string;
  level?: SkillLevel;
  fieldId?: string;
  roadmapSlug?: string;
}

export type Theme = "light" | "dark";

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

/** Concept clé d'une compétence, avec sa définition pédagogique. */
export interface SkillConcept {
  name: string;
  definition: string;
}

/** Exemple concret : un flux réel que l'utilisateur peut visualiser. */
export interface SkillExample {
  title: string;
  steps: string[];
}

/** Projet pratique progressif, avec son flux de réalisation. */
export interface SkillProject {
  title: string;
  /** Flux de réalisation, ex. "Formulaire → n8n → API → Base de données". */
  flow?: string;
}

/** Illustration SVG dédiée disponible pour une compétence ou une branche. */
export type SkillIllustration =
  | "api"
  | "n8n"
  | "devops"
  | "ml"
  | "cybersecurity"
  | "informatique";

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
  // --- Contenu pédagogique (optionnel, fusionné depuis skill-guides.ts) ---
  /** Définition courte : « Qu'est-ce que c'est ? » */
  definition?: string;
  /** Pourquoi apprendre cette compétence : son rôle dans le domaine. */
  whyLearn?: string;
  /** Explication de chaque prérequis : skillId → ce qu'il faut en retenir. */
  prerequisiteNotes?: Record<string, string>;
  /** Concepts clés avec définitions (prioritaire sur `concepts`). */
  conceptDetails?: SkillConcept[];
  /** Étapes du fonctionnement, rendues en diagramme de flux. */
  howItWorks?: string[];
  /** Titre de la section « Comment ça fonctionne ». */
  howItWorksTitle?: string;
  /** Exemple concret sous forme de flux. */
  example?: SkillExample;
  /** Projets détaillés (prioritaire sur `projects`). */
  projectsDetailed?: SkillProject[];
  /** Illustration SVG dédiée. */
  illustration?: SkillIllustration;
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

/**
 * Parcours guidés : points d'entrée concrets dans une filière.
 * Chaque parcours pointe vers une compétence de départ réelle
 * (ouverture directe du panneau via ?skill=) — jamais une direction inventée.
 */

export type GuidedPathIcon =
  | "web"
  | "ai"
  | "devops"
  | "data"
  | "automation"
  | "security"
  | "robotics"
  | "foundations";

export interface GuidedPath {
  id: string;
  fieldId: string;
  roadmapSlug: string;
  stageId: string;
  title: string;
  pitch: string;
  entrySkillId: string;
  icon: GuidedPathIcon;
}

export const GUIDED_PATHS: GuidedPath[] = [
  {
    id: "info-web",
    fieldId: "informatique",
    roadmapSlug: "informatique",
    stageId: "developpement",
    title: "Développement web",
    pitch: "De la première page HTML aux applications React et Node.js.",
    entrySkillId: "html",
    icon: "web",
  },
  {
    id: "info-ai",
    fieldId: "informatique",
    roadmapSlug: "informatique",
    stageId: "ia",
    title: "Intelligence artificielle",
    pitch: "Python, machine learning puis IA générative et LLM.",
    entrySkillId: "python",
    icon: "ai",
  },
  {
    id: "info-devops",
    fieldId: "informatique",
    roadmapSlug: "informatique",
    stageId: "infrastructure",
    title: "DevOps & Infrastructure",
    pitch: "Docker, CI/CD et cloud : livrer du logiciel comme un pro.",
    entrySkillId: "docker",
    icon: "devops",
  },
  {
    id: "info-data",
    fieldId: "informatique",
    roadmapSlug: "informatique",
    stageId: "data",
    title: "Data",
    pitch: "Bases de données, pipelines et science des données.",
    entrySkillId: "postgresql",
    icon: "data",
  },
  {
    id: "info-automation",
    fieldId: "informatique",
    roadmapSlug: "informatique",
    stageId: "automation",
    title: "Automation",
    pitch: "Connecter applications et APIs avec n8n, sans réinventer la roue.",
    entrySkillId: "n8n",
    icon: "automation",
  },
  {
    id: "info-cyber",
    fieldId: "informatique",
    roadmapSlug: "informatique",
    stageId: "cybersecurite",
    title: "Cybersécurité",
    pitch: "Cryptographie, sécurité web et réponse aux incidents.",
    entrySkillId: "cryptography",
    icon: "security",
  },
  {
    id: "info-robotics",
    fieldId: "informatique",
    roadmapSlug: "informatique",
    stageId: "robotique",
    title: "Robotique & Embarqué",
    pitch: "De l'électronique au robot autonome avec ROS.",
    entrySkillId: "electronics",
    icon: "robotics",
  },
  {
    id: "info-foundations",
    fieldId: "informatique",
    roadmapSlug: "informatique",
    stageId: "fondations",
    title: "Fondations",
    pitch: "Le tronc commun : culture, systèmes, réseaux et protocoles.",
    entrySkillId: "culture-info",
    icon: "foundations",
  },
];

export function getGuidedPaths(fieldId: string): GuidedPath[] {
  return GUIDED_PATHS.filter((p) => p.fieldId === fieldId);
}

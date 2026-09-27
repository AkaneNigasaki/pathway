import type { SkillIllustration } from "../types";
import { BRANCH_GUIDES_B } from "./guides/part-branches";

/**
 * Guides éditoriaux des grandes branches (stages) de la roadmap Informatique.
 *
 * Chaque branche reçoit une véritable introduction : ce qu'elle recouvre,
 * ce que l'utilisateur va y apprendre, et le point d'entrée recommandé.
 * Affichés sur la page de la filière Informatique (« Choisissez votre
 * spécialisation »).
 */
export interface BranchGuide {
  /** Identifiant du stage dans la roadmap (ex. "devops"). */
  stageId: string;
  /** Introduction éditoriale : ce qu'est la branche, son rôle. */
  intro: string;
  /** Ce que l'utilisateur va y apprendre : libellés courts. */
  learnItems: string[];
  /** Compétence recommandée comme point d'entrée (id de skill). */
  entrySkillId: string;
  /** Illustration SVG dédiée (optionnelle). */
  illustration?: SkillIllustration;
}

export const BRANCH_GUIDES: Record<string, BranchGuide> = {
  ...BRANCH_GUIDES_B,
  infrastructure: {
    stageId: "infrastructure",
    intro:
      "Le DevOps regroupe les pratiques et les outils qui rapprochent le développement logiciel et l'exploitation de l'infrastructure : automatiser la livraison, le déploiement et la maintenance des applications pour livrer plus vite, avec moins d'erreurs.",
    learnItems: [
      "Linux",
      "Git",
      "CI/CD",
      "Docker",
      "Kubernetes",
      "Cloud",
      "Infrastructure as Code",
      "Monitoring",
    ],
    entrySkillId: "linux",
    illustration: "devops",
  },
};

export function getBranchGuide(stageId: string): BranchGuide | undefined {
  return BRANCH_GUIDES[stageId];
}

/** Introduction éditoriale de la filière Informatique. */
export const INFORMATIQUE_INTRO = {
  title: "Informatique",
  intro:
    "L'informatique étudie le traitement de l'information à l'aide de systèmes programmables. Elle englobe le développement logiciel, les systèmes, les réseaux, les données, l'intelligence artificielle, la sécurité et de nombreux autres domaines.",
  heading: "Choisissez votre spécialisation",
  subheading:
    "Huit branches, un tronc commun. Commencez par les fondations, puis suivez la voie qui correspond à ce que vous voulez construire.",
};

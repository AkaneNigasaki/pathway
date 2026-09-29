/* Icônes générées pour les 10 roadmaps (style premium, thème or/bleu/noir). */

import ai from "../../assets/roadmap-icons/ai.webp";
import backend from "../../assets/roadmap-icons/backend.webp";
import cybersecurity from "../../assets/roadmap-icons/cybersecurity.webp";
import datascience from "../../assets/roadmap-icons/datascience.webp";
import devops from "../../assets/roadmap-icons/devops.webp";
import frontend from "../../assets/roadmap-icons/frontend.webp";
import informatique from "../../assets/roadmap-icons/informatique.webp";
import robotics from "../../assets/roadmap-icons/robotics.webp";
import typescript from "../../assets/roadmap-icons/typescript.webp";
import ux from "../../assets/roadmap-icons/ux.webp";

const ICONS: Record<string, string> = {
  "ai-engineer": ai,
  "backend-developer": backend,
  "cybersecurity-engineer": cybersecurity,
  "data-scientist": datascience,
  "devops-engineer": devops,
  "frontend-developer": frontend,
  informatique,
  "robotics-engineer": robotics,
  typescript,
  "ux-designer": ux,
};

/** Retourne l'icône d'une roadmap à partir de son slug (undefined si inconnue). */
export function getRoadmapIcon(slug: string): string | undefined {
  return ICONS[slug];
}

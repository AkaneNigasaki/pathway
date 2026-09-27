import type { Field } from "../types";

/**
 * Les 11 grandes filières de Pathway.
 * La couleur d'accent reste discrète : utilisée en touches
 * (pastille, soulignement, bordure active).
 */
export const FIELDS: Field[] = [
  {
    id: "informatique",
    name: "Informatique",
    tagline: "Code, systèmes & intelligence",
    description:
      "Des fondations du code aux systèmes les plus avancés : construisez une expertise technique solide, structurée et évolutive.",
    accent: "#2563eb",
    icon: "Cpu",
  },
  {
    id: "sciences",
    name: "Sciences",
    tagline: "La méthode avant tout",
    description:
      "Physique, chimie, biologie : la démarche scientifique comme discipline de pensée et de résolution de problèmes.",
    accent: "#7c3aed",
    icon: "FlaskConical",
  },
  {
    id: "medecine",
    name: "Médecine",
    tagline: "Rigueur & humanité",
    description:
      "Un parcours exigeant, de la biologie fondamentale à la pratique clinique, au service du patient.",
    accent: "#e11d48",
    icon: "Stethoscope",
  },
  {
    id: "ingenierie",
    name: "Ingénierie",
    tagline: "Concevoir & construire",
    description:
      "Concevoir, construire, optimiser : l'ingénierie comme art de résoudre des problèmes concrets à grande échelle.",
    accent: "#ea580c",
    icon: "Cog",
  },
  {
    id: "design",
    name: "Design",
    tagline: "Clarté & intention",
    description:
      "De la pensée visuelle aux systèmes de design : créez des expériences claires, accessibles et profondément humaines.",
    accent: "#db2777",
    icon: "PenTool",
  },
  {
    id: "architecture",
    name: "Architecture",
    tagline: "Penser l'espace",
    description:
      "Penser l'espace habité, du premier croquis à la construction : structure, matière, lumière et usage.",
    accent: "#b45309",
    icon: "DraftingCompass",
  },
  {
    id: "marketing",
    name: "Marketing",
    tagline: "Comprendre & convaincre",
    description:
      "Comprendre les audiences, construire des marques durables et mesurer l'impact de chaque action.",
    accent: "#c026d3",
    icon: "Megaphone",
  },
  {
    id: "management",
    name: "Management",
    tagline: "Guider & décider",
    description:
      "Guider des équipes et des organisations vers des résultats durables : stratégie, décision et leadership.",
    accent: "#475569",
    icon: "Users",
  },
];

export const FIELD_MAP: Record<string, Field> = Object.fromEntries(
  FIELDS.map((f) => [f.id, f])
);

export function getField(id: string): Field | undefined {
  return FIELD_MAP[id];
}

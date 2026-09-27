import type { Skill } from "../types";
import { GUIDES_A } from "./guides/part-a";
import { GUIDES_B } from "./guides/part-b";

/**
 * Guides pédagogiques des compétences.
 *
 * Chaque entrée enrichit une compétence existante (désignée par son `id`)
 * avec un contenu éditorial structuré. Tous les champs sont optionnels :
 * le SkillPanel n'affiche que les sections pour lesquelles des données
 * existent, en repli sur les champs de base (`description`, `concepts`,
 * `projects`, `tagline`) quand le guide est partiel.
 *
 * Ton : documentation technique premium, concret, sans marketing.
 * Langue : français. Phrases courtes, vocabulaire précis.
 */
export type SkillGuide = Pick<
  Skill,
  | "definition"
  | "whyLearn"
  | "prerequisiteNotes"
  | "conceptDetails"
  | "howItWorks"
  | "howItWorksTitle"
  | "example"
  | "projectsDetailed"
  | "illustration"
>;

/** Guide de référence rédigé à la main (modèle pour les autres entrées). */
const N8N_GUIDE: SkillGuide = {
    illustration: "n8n",
    definition:
      "n8n est une plateforme d'automatisation de workflows : elle connecte des applications et des services entre eux pour exécuter des séquences d'actions automatiques, sans développer manuellement chaque intégration.",
    whyLearn:
      "n8n permet de comprendre concrètement comment les applications communiquent entre elles : APIs, webhooks, données JSON et événements. C'est la porte d'entrée la plus visuelle vers l'intégration de systèmes, et un outil réellement utilisé pour automatiser des processus métier.",
    prerequisiteNotes: {
      http: "Comprendre comment un client envoie une requête à un serveur et lit sa réponse.",
      rest: "Savoir ce qu'est une API : ressources, méthodes, authentification.",
      json: "Savoir lire et manipuler des données structurées, le format de presque tous les échanges.",
      webhooks: "Comprendre comment un service externe peut déclencher un workflow automatiquement.",
    },
    conceptDetails: [
      {
        name: "Workflows",
        definition:
          "Un workflow est une séquence de nœuds reliés entre eux qui décrit un processus automatisé de bout en bout.",
      },
      {
        name: "Nodes",
        definition:
          "Un node est une étape du workflow : il déclenche, transforme des données ou appelle un service externe.",
      },
      {
        name: "Triggers",
        definition:
          "Un trigger est le point de départ d'un workflow : il l'exécute quand un événement se produit (webhook, planification, action manuelle).",
      },
      {
        name: "Webhooks",
        definition:
          "Un webhook permet à un service d'envoyer automatiquement une requête HTTP à une URL quand un événement se produit.",
      },
      {
        name: "Credentials",
        definition:
          "Les credentials stockent les clés d'API et identifiants de façon sécurisée pour authentifier les appels vers les services externes.",
      },
      {
        name: "Expressions",
        definition:
          "Les expressions permettent d'injecter des données dynamiques (issues des nœuds précédents) dans les paramètres d'un node.",
      },
      {
        name: "HTTP Requests",
        definition:
          "Le node HTTP Request appelle n'importe quelle API ou page web : la brique universelle quand aucune intégration native n'existe.",
      },
      {
        name: "API Integration",
        definition:
          "L'intégration d'API consiste à faire dialoguer n8n avec un service tiers : authentification, pagination, gestion d'erreurs.",
      },
    ],
    howItWorksTitle: "Comment fonctionne un workflow n8n",
    howItWorks: ["EVENT", "TRIGGER", "WORKFLOW", "NODE", "API", "RESULT"],
    example: {
      title: "Inscription à une newsletter",
      steps: [
        "Formulaire",
        "Webhook",
        "n8n",
        "Validation",
        "Base de données",
        "Email de confirmation",
      ],
    },
    projectsDetailed: [
      {
        title: "Automatiser un formulaire",
        flow: "Formulaire → n8n → API → Base de données",
      },
      {
        title: "Notification automatique",
        flow: "GitHub → Webhook → n8n → Discord",
      },
      {
        title: "Workflow IA",
        flow: "Formulaire → n8n → LLM → Réponse → Email",
      },
    ],
};

/**
 * Tous les guides pédagogiques, indexés par id de compétence.
 * `n8n` garde sa version rédigée à la main comme référence.
 */
export const SKILL_GUIDES: Record<string, SkillGuide> = {
  ...GUIDES_A,
  ...GUIDES_B,
  n8n: N8N_GUIDE,
};

export function getSkillGuide(skillId: string): SkillGuide | undefined {
  return SKILL_GUIDES[skillId];
}

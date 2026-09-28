import type { Skill } from "../types";
import { GUIDES_A } from "./guides/part-a";
import { GUIDES_B } from "./guides/part-b";
import { GUIDES_FRONTEND } from "./guides/part-frontend";
import { GUIDES_BACKEND } from "./guides/part-backend";
import { GUIDES_UX } from "./guides/part-ux";
import { GUIDES_AI } from "./guides/part-ai";
import { GUIDES_DATA } from "./guides/part-data";
import { GUIDES_DEVOPS } from "./guides/part-devops";
import { GUIDES_CYBER } from "./guides/part-cyber";
import { GUIDES_ROBOTICS } from "./guides/part-robotics";
import { GUIDES_TYPESCRIPT } from "./guides/part-typescript";
import { OFFICIAL_DOCS } from "./guides/official-docs";

/**
 * Guides pédagogiques des compétences.
 *
 * Chaque entrée enrichit une compétence existante (désignée par le slug
 * de sa roadmap et son `id`) avec un contenu éditorial structuré. Tous les champs sont optionnels :
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
> & {
  /** Checklist d'installation / mise en place (page documentation). */
  environment?: string[];
  /** Mise en place détaillée : installation, configuration, flux de travail, éditeurs. */
  setup?: SkillSetup;
  /** URL de la documentation officielle de la technologie. */
  docsUrl?: string;
  /**
   * Page d'apprentissage complète (« Learning Page ») : sections structurées
   * en 3 niveaux d'information avec divulgation progressive. Quand ce champ
   * est présent, la page /docs affiche l'expérience Learning Page.
   */
  learning?: LearningSection[];
};

/**
 * Niveau d'information d'une section :
 * 1 = Aperçu (30 secondes, comprendre le sujet),
 * 2 = Pratique (5-15 minutes, installer, configurer, premiers exemples),
 * 3 = Approfondi (concepts avancés, architecture, cas limites, performance).
 */
export type LearningLevel = 1 | 2 | 3;

/**
 * Blocs de contenu d'une section de Learning Page. Tous les textes
 * supportent le code inline entre backticks (rendu via renderRichText).
 */
export type LearningBlock =
  /** Paragraphe de texte. */
  | { kind: "text"; text: string }
  /** Commande expliquée : jamais une commande sans explication. */
  | { kind: "command"; label: string; command: string; why: string; verify?: string }
  /** Extrait de code avec langage affiché et bouton copier. */
  | { kind: "code"; language: string; title?: string; code: string }
  /** Liste à puces simple. */
  | { kind: "list"; items: string[] }
  /** Fiche champ/valeur (ex. une option tsconfig, un éditeur, une commande CLI). */
  | { kind: "fields"; title?: string; fields: { label: string; value: string }[] }
  /** Tableau comparatif. */
  | { kind: "table"; headers: string[]; rows: string[][] }
  /** Schéma en texte préformaté (arbres, flux verticaux). */
  | { kind: "diagram"; title?: string; lines: string[] }
  /** Tutoriel pas à pas. */
  | { kind: "steps"; steps: { title: string; detail: string }[] };

/** Une section de Learning Page : titre, niveau, blocs de contenu. */
export interface LearningSection {
  /** Identifiant stable pour l'ancre (ex. "installation"). */
  id: string;
  title: string;
  level: LearningLevel;
  /** Chapeau optionnel affiché sous le titre. */
  intro?: string;
  blocks: LearningBlock[];
}

/**
 * Informations pratiques pour démarrer avec une technologie :
 * comment l'installer, la configurer, travailler avec au quotidien
 * (éditeur, scripts, debug) et quels éditeurs / extensions choisir.
 * Tous les champs sont optionnels : seules les sections renseignées
 * sont affichées sur la page documentation.
 */
export interface SkillSetup {
  /** Étapes d'installation, commandes concrètes. */
  install?: string[];
  /** Configuration essentielle du projet. */
  configure?: string[];
  /** Flux de travail quotidien : scripts, debug, bonnes habitudes. */
  workflow?: string[];
  /** Éditeurs / IDE recommandés et extensions exactes. */
  editors?: string[];
}

/** Guide de référence rédigé à la main (modèle pour les autres entrées). */
const N8N_GUIDE: SkillGuide = {
  setup: {
    install: [
      "Via npm : `npm install -g n8n` (Node.js 18+ requis).",
      "Via Docker : `docker run -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n`.",
      "Vérifier : `n8n --version`.",
    ],
    configure: [
      "Variables d'environnement (fichier `.env`) : `N8N_HOST`, `N8N_PORT`, `N8N_ENCRYPTION_KEY`.",
      "Base SQLite par défaut (`~/.n8n/database.sqlite`) ; en production : `DB_TYPE=postgresdb` + `DB_POSTGRESDB_*`.",
      "Identifiants des services : créés dans « Credentials », jamais en dur dans les nœuds.",
    ],
    workflow: [
      "Lancer : `n8n start` ; interface : `http://localhost:5678`.",
      "Tester un déclencheur : nœud Webhook → « Listen for Test Event ».",
      "Déboguer : exécuter nœud par nœud, inspecter le JSON d'entrée/sortie.",
      "Historique : onglet « Executions ».",
    ],
    editors: [
      "Interface web intégrée : l'éditeur visuel de workflows suffit au quotidien.",
      "VS Code pour développer des nœuds personnalisés (TypeScript).",
      "Alternative : logs via `docker logs` si déployé en conteneur.",
    ],
  },
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
 * Tous les guides pédagogiques, indexés par slug de roadmap puis par id
 * de compétence. L'indexation par roadmap est volontaire : certains ids
 * (ex. `python`, `git`, `linux`) existent dans plusieurs roadmaps avec un
 * contenu adapté à chaque parcours. `n8n` garde sa version rédigée à la
 * main comme référence (roadmap Informatique).
 */
export const SKILL_GUIDES: Record<string, Record<string, SkillGuide>> = {
  informatique: {
    ...GUIDES_A,
    ...GUIDES_B,
    n8n: N8N_GUIDE,
  },
  "frontend-developer": GUIDES_FRONTEND,
  "backend-developer": GUIDES_BACKEND,
  "ux-designer": GUIDES_UX,
  "ai-engineer": GUIDES_AI,
  "data-scientist": GUIDES_DATA,
  "devops-engineer": GUIDES_DEVOPS,
  "cybersecurity-engineer": GUIDES_CYBER,
  "robotics-engineer": GUIDES_ROBOTICS,
  typescript: GUIDES_TYPESCRIPT,
};

/**
 * Injecte l'URL de documentation officielle dans chaque guide concerné.
 * Les concepts sans source officielle n'ont pas d'entrée dans OFFICIAL_DOCS
 * et n'affichent donc aucun lien.
 */
for (const [key, docsUrl] of Object.entries(OFFICIAL_DOCS)) {
  const [roadmapSlug, skillId] = key.split(":");
  const guide = SKILL_GUIDES[roadmapSlug]?.[skillId];
  if (guide && !guide.docsUrl) {
    guide.docsUrl = docsUrl;
  }
}

export function getSkillGuide(
  roadmapSlug: string,
  skillId: string
): SkillGuide | undefined {
  return SKILL_GUIDES[roadmapSlug]?.[skillId];
}

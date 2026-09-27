import type { BranchGuide } from "../branch-guides";

/**
 * Guides éditoriaux des branches — partie B.
 *
 * Fusionnés avec BRANCH_GUIDES par l’appelant. Mêmes conventions que
 * branch-guides.ts : français, concret, sans marketing. Les `stageId`
 * correspondent aux stages de la roadmap Informatique, les `entrySkillId`
 * aux ids de skills existants dans roadmaps/informatique.ts.
 */
export const BRANCH_GUIDES_B: Record<string, BranchGuide> = {
  // ------------------------------------------------------------ fondations
  fondations: {
    stageId: "fondations",
    intro:
      "Les fondations sont le tronc commun de toute la carte : ce qu’est un ordinateur, un système d’exploitation, un réseau, un programme. Sans ce socle, chaque technologie apprise ensuite reste une boîte noire — avec lui, tout devient démontable et compréhensible.",
    learnItems: [
      "Culture informatique",
      "Algorithmique",
      "Linux & Bash",
      "Git",
      "Réseaux",
      "HTTP & APIs",
      "Bases de données",
      "SQL",
    ],
    entrySkillId: "culture-info",
  },
  // --------------------------------------------------------- developpement
  developpement: {
    stageId: "developpement",
    intro:
      "Le développement web, c’est construire ce qui s’affiche dans un navigateur et ce qui tourne derrière : la structure avec HTML, le style avec CSS, la logique avec JavaScript. Puis viennent les frameworks qui accélèrent le frontend, et les APIs qui le relient au backend.",
    learnItems: [
      "HTML & CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "APIs REST",
      "Tests",
      "Performance",
    ],
    entrySkillId: "html",
  },
  // ------------------------------------------------------------------- ia
  ia: {
    stageId: "ia",
    intro:
      "L’intelligence artificielle vise à faire réaliser par des machines des tâches qui demandent de l’intelligence. Le machine learning apprend des motifs depuis des données, le deep learning le fait avec des réseaux de neurones profonds — et les modèles de langage génératifs n’en sont que la partie la plus visible.",
    learnItems: [
      "Python",
      "Statistiques",
      "Machine Learning",
      "Deep Learning",
      "Transformers",
      "LLMs & RAG",
      "Vision & NLP",
      "MLOps",
    ],
    entrySkillId: "python",
  },
  // ----------------------------------------------------------------- data
  data: {
    stageId: "data",
    intro:
      "La data couvre tout le cycle de vie des données. La data analysis répond aux questions business avec SQL et des dashboards, la data science modélise et prédit avec statistiques et machine learning, et le data engineering construit les pipelines qui rendent tout cela possible à l’échelle.",
    learnItems: [
      "SQL",
      "PostgreSQL",
      "MongoDB & Redis",
      "Data Engineering",
      "Kafka",
      "Data Science",
      "Data Analytics",
    ],
    entrySkillId: "sql",
  },
  // ------------------------------------------------------------ automation
  automation: {
    stageId: "automation",
    intro:
      "L’automation connecte applications et APIs pour que les données circulent sans intervention humaine : un événement dans un service déclenche une séquence d’actions dans d’autres. Workflows, webhooks et intégrations transforment des tâches répétitives en systèmes fiables.",
    learnItems: [
      "n8n",
      "Intégration d’APIs",
      "Webhooks",
      "Make",
      "Zapier",
    ],
    entrySkillId: "n8n",
  },
  // --------------------------------------------------------- cybersecurite
  cybersecurite: {
    stageId: "cybersecurite",
    intro:
      "La cybersécurité protège les systèmes selon trois objectifs : la confidentialité (qui peut voir ?), l’intégrité (les données sont-elles intactes ?) et la disponibilité (le service répond-il ?). Comprendre comment attaquent les attaquants est le préalable pour construire des défenses solides.",
    learnItems: [
      "Cryptographie",
      "Sécurité Web",
      "OWASP Top 10",
      "Authentification",
      "Pentest",
      "SIEM",
      "Réponse aux incidents",
    ],
    entrySkillId: "cryptography",
  },
  // ------------------------------------------------------------- robotique
  robotique: {
    stageId: "robotique",
    intro:
      "La robotique relie quatre mondes : le logiciel décide, l’électronique exécute, les capteurs perçoivent, l’asservissement corrige. Un robot n’est qu’une boucle — percevoir, décider, agir — répétée des centaines de fois par seconde.",
    learnItems: [
      "Électronique",
      "C/C++",
      "Capteurs",
      "Systèmes embarqués",
      "Asservissement",
      "ROS",
      "Robotique",
    ],
    entrySkillId: "electronics",
  },
};

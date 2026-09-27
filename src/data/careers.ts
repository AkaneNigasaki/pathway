import type { Career } from "../types";

export const CAREERS: Career[] = [
  {
    id: "frontend-developer",
    slug: "frontend-developer",
    fieldId: "informatique",
    title: "Frontend Developer",
    tagline: "Des interfaces rapides, accessibles et élégantes.",
    description:
      "Le développeur frontend transforme des maquettes en expériences web concrètes. Il maîtrise JavaScript, les frameworks modernes et l'art du détail : performance, accessibilité, design systems.",
    roadmapSlug: "frontend-developer",
    coreSkills: ["JavaScript", "TypeScript", "React", "CSS", "Next.js"],
    complementarySkills: ["Testing", "Accessibilité", "Performance web", "Design systems"],
    projects: [
      "Clone responsive d'une landing page complexe",
      "Application React + TypeScript avec appels API",
      "Design system documenté avec Storybook",
    ],
    demand: "Très forte",
    salaryRange: "38–65 k€ / an",
  },
  {
    id: "backend-developer",
    slug: "backend-developer",
    fieldId: "informatique",
    title: "Backend Developer",
    tagline: "La logique invisible qui fait tourner le produit.",
    description:
      "Le développeur backend conçoit les API, les bases de données et la logique métier. Rigueur sur la modélisation, la sécurité et la scalabilité.",
    roadmapSlug: "backend-developer",
    coreSkills: ["Python", "API REST", "SQL", "Authentification", "Docker"],
    complementarySkills: ["Caching", "Files de messages", "Observabilité", "CI/CD"],
    projects: [
      "API REST complète avec authentification JWT",
      "Schéma SQL normalisé pour une application e-commerce",
      "Service conteneurisé avec Docker Compose",
    ],
    demand: "Très forte",
    salaryRange: "40–68 k€ / an",
  },
  {
    id: "devops-engineer",
    slug: "devops-engineer",
    fieldId: "informatique",
    title: "DevOps Engineer",
    tagline: "Automatiser pour livrer sereinement.",
    description:
      "L'ingénieur DevOps fait le pont entre le code et la production : pipelines CI/CD, infrastructure as code, Kubernetes, observabilité.",
    roadmapSlug: "devops-engineer",
    coreSkills: ["Linux", "Docker", "Kubernetes", "CI/CD", "Cloud"],
    complementarySkills: ["Terraform", "Monitoring", "Réseaux", "Sécurité"],
    projects: [
      "Pipeline CI/CD complet vers un cluster Kubernetes",
      "Infrastructure reproductible avec Terraform",
      "Stack d'observabilité : métriques, logs, alertes",
    ],
    demand: "Très forte",
    salaryRange: "45–75 k€ / an",
  },
  {
    id: "ai-engineer",
    slug: "ai-engineer",
    fieldId: "informatique",
    title: "AI Engineer",
    tagline: "Mettre l'IA en production, pas seulement en démo.",
    description:
      "L'AI engineer conçoit des systèmes basés sur le machine learning et les LLM : du prototype au déploiement, en passant par l'évaluation rigoureuse.",
    roadmapSlug: "ai-engineer",
    coreSkills: ["Python", "Machine Learning", "Deep Learning", "LLM", "MLOps"],
    complementarySkills: ["Statistiques", "RAG", "Évaluation de modèles", "Vector DB"],
    projects: [
      "Chatbot RAG sur une base documentaire",
      "Fine-tuning d'un modèle open source",
      "Pipeline MLOps : entraînement, versioning, déploiement",
    ],
    demand: "Très forte",
    salaryRange: "50–85 k€ / an",
  },
  {
    id: "data-scientist",
    slug: "data-scientist",
    fieldId: "informatique",
    title: "Data Scientist",
    tagline: "Transformer des données en décisions.",
    description:
      "Le data scientist explore les données, construit des modèles prédictifs et communique des insights actionnables aux équipes produit et business.",
    roadmapSlug: "data-scientist",
    coreSkills: ["Python", "Statistiques", "SQL", "Machine Learning", "Data viz"],
    complementarySkills: ["A/B testing", "Feature engineering", "Storytelling", "dbt"],
    projects: [
      "Analyse exploratoire d'un jeu de données réel",
      "Modèle de prédiction avec évaluation rigoureuse",
      "Dashboard décisionnel interactif",
    ],
    demand: "Forte",
    salaryRange: "42–70 k€ / an",
  },
  {
    id: "cybersecurity-engineer",
    slug: "cybersecurity-engineer",
    fieldId: "informatique",
    title: "Cybersecurity Engineer",
    tagline: "Penser comme un attaquant, défendre comme un architecte.",
    description:
      "L'ingénieur cybersécurité protège les systèmes : tests d'intrusion, réponse aux incidents, cryptographie et gouvernance de la sécurité.",
    roadmapSlug: "cybersecurity-engineer",
    coreSkills: ["Réseaux", "Linux", "Sécurité web", "Pentest", "Cryptographie"],
    complementarySkills: ["Forensique", "SOC", "Cloud security", "Gouvernance"],
    projects: [
      "Audit de sécurité d'une application web",
      "Lab de pentest sur environnement isolé",
      "Politique de réponse aux incidents",
    ],
    demand: "Très forte",
    salaryRange: "45–78 k€ / an",
  },
  {
    id: "robotics-engineer",
    slug: "robotics-engineer",
    fieldId: "ingenierie",
    title: "Robotics Engineer",
    tagline: "Donner un corps à l'intelligence.",
    description:
      "L'ingénieur roboticien conçoit des systèmes mécatroniques : perception, contrôle, planification de mouvement et intégration sur ROS.",
    roadmapSlug: "robotics-engineer",
    coreSkills: ["Python", "ROS", "Contrôle", "Perception", "Systèmes embarqués"],
    complementarySkills: ["Électronique", "Mécanique", "C++", "Simulation Gazebo"],
    projects: [
      "Bras robotique simulé avec contrôle PID",
      "Robot mobile avec navigation autonome (SLAM)",
      "Pipeline de perception par vision",
    ],
    demand: "Forte",
    salaryRange: "42–72 k€ / an",
  },
  {
    id: "software-architect",
    slug: "software-architect",
    fieldId: "informatique",
    title: "Software Architect",
    tagline: "Voir le système avant qu'il n'existe.",
    description:
      "L'architecte logiciel définit la structure des systèmes complexes : choix techniques, patterns, scalabilité et vision long terme.",
    roadmapSlug: "backend-developer",
    coreSkills: ["Architecture distribuée", "API design", "Bases de données", "Sécurité", "Leadership technique"],
    complementarySkills: ["Event-driven", "DDD", "Documentation", "Mentorat"],
    projects: [
      "Document d'architecture (ADR) pour un système distribué",
      "Migration monolithe vers microservices",
      "Revue d'architecture et plan de scalabilité",
    ],
    demand: "Forte",
    salaryRange: "60–95 k€ / an",
  },
  {
    id: "ux-designer",
    slug: "ux-designer",
    fieldId: "design",
    title: "UX Designer",
    tagline: "Concevoir pour l'humain, prouver par la recherche.",
    description:
      "L'UX designer comprend les utilisateurs, prototype et itère. Recherche, wireframes, design systems : la méthode avant l'esthétique.",
    roadmapSlug: "ux-designer",
    coreSkills: ["UX Research", "Wireframing", "Prototypage", "Design systems", "Figma"],
    complementarySkills: ["Accessibilité", "Motion design", "Tests utilisateurs", "UI design"],
    projects: [
      "Refonte UX d'un parcours existant avec tests",
      "Design system complet documenté",
      "Étude utilisateurs : entretiens + synthèse",
    ],
    demand: "Forte",
    salaryRange: "38–62 k€ / an",
  },
];

export const CAREER_MAP: Record<string, Career> = Object.fromEntries(
  CAREERS.map((c) => [c.slug, c])
);

export function getCareer(slug: string): Career | undefined {
  return CAREER_MAP[slug];
}

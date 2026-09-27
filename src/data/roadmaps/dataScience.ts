import type { Roadmap } from "../../types";

export const dataScienceRoadmap: Roadmap = {
  id: "data-scientist",
  slug: "data-scientist",
  fieldId: "informatique",
  title: "Data Scientist",
  tagline: "Des données brutes aux décisions éclairées.",
  description:
    "Explorez, modélisez, communiquez : le parcours du data scientist allie statistiques rigoureuses, code Python et sens business pour transformer les données en décisions.",
  levelLabel: "Débutant → Avancé",
  duration: "8–12 mois",
  careerSlugs: ["data-scientist"],
  stages: [
    {
      id: "foundations",
      label: "Fondations",
      description: "Données, code et statistiques.",
    },
    {
      id: "analysis",
      label: "Analyse",
      description: "Explorer et raconter les données.",
    },
    {
      id: "modeling",
      label: "Modélisation",
      description: "Prédire avec rigueur.",
    },
    {
      id: "impact",
      label: "Impact",
      description: "De l'analyse à la décision.",
    },
  ],
  skills: [
    {
      id: "python",
      name: "Python",
      tagline: "L'outil quotidien du data scientist.",
      description:
        "pandas, NumPy, visualisation : Python est l'environnement de travail central de la data science.",
      level: "beginner",
      stage: "foundations",
      prerequisites: [],
      concepts: ["pandas", "NumPy", "Jupyter", "Nettoyage de données", "Visualisation de base"],
      projects: ["Nettoyage d'un dataset sale", "Exploration d'un dataset public"],
      resources: [
        { title: "Kaggle Learn", provider: "kaggle.com", url: "https://www.kaggle.com/learn" },
        { title: "Python Data Science Handbook", provider: "jakevdp.github.io", url: "https://jakevdp.github.io/PythonDataScienceHandbook/" },
      ],
      duration: "4–5 semaines",
    },
    {
      id: "sql",
      name: "SQL",
      tagline: "La première source de données.",
      description:
        "Les données vivent dans des bases : savoir les extraire, les joindre et les agréger efficacement est fondamental.",
      level: "beginner",
      stage: "foundations",
      prerequisites: [],
      concepts: ["SELECT & WHERE", "Jointures", "Agrégations", "Fenêtres (window functions)", "CTE"],
      projects: ["Analyses sur une base e-commerce", "Requêtes window avancées"],
      resources: [
        { title: "SQLBolt", provider: "sqlbolt.com", url: "https://sqlbolt.com/" },
        { title: "Mode SQL Tutorial", provider: "mode.com", url: "https://mode.com/sql-tutorial/" },
      ],
      duration: "3 semaines",
    },
    {
      id: "statistics",
      name: "Statistiques",
      tagline: "Le socle de toute analyse sérieuse.",
      description:
        "Distributions, tests, régressions : sans statistiques, une analyse n'est qu'une opinion avec des graphiques.",
      level: "intermediate",
      stage: "foundations",
      prerequisites: [],
      concepts: ["Statistiques descriptives", "Probabilités", "Tests d'hypothèses", "Régression", "Intervalles de confiance"],
      projects: ["Rapport statistique complet", "Test A/B simulé"],
      resources: [
        { title: "Seeing Theory", provider: "seeing-theory.brown.edu", url: "https://seeing-theory.brown.edu/" },
        { title: "StatQuest", provider: "YouTube", url: "https://www.youtube.com/c/joshstarmer" },
      ],
      duration: "5–6 semaines",
    },
    {
      id: "data-viz",
      name: "Data Visualization",
      tagline: "Rendre l'invisible évident.",
      description:
        "Un bon graphique vaut mille tableaux : choisir la bonne représentation et éviter les pièges visuels.",
      level: "intermediate",
      stage: "analysis",
      prerequisites: ["python", "statistics"],
      concepts: ["matplotlib / seaborn", "Plotly", "Choix du graphique", "Storytelling visuel", "Dashboards"],
      projects: ["Dashboard interactif", "Refonte de visualisations trompeuses"],
      resources: [
        { title: "Storytelling with Data", provider: "storytellingwithdata.com", url: "https://www.storytellingwithdata.com/" },
        { title: "From Data to Viz", provider: "data-to-viz.com", url: "https://www.data-to-viz.com/" },
      ],
      duration: "3 semaines",
    },
    {
      id: "eda",
      name: "Analyse exploratoire",
      tagline: "Interroger les données avant de modéliser.",
      description:
        "L'EDA est le dialogue avec les données : distributions, corrélations, anomalies. C'est là que naissent les vraies questions.",
      level: "intermediate",
      stage: "analysis",
      prerequisites: ["python", "statistics"],
      concepts: ["Distributions", "Corrélations", "Valeurs manquantes", "Outliers", "Hypothèses"],
      projects: ["EDA complète publiée sur Kaggle", "Rapport d'insights business"],
      resources: [
        { title: "Kaggle — EDA", provider: "kaggle.com", url: "https://www.kaggle.com/learn/data-visualization" },
        { title: "Think Stats", provider: "greenteapress.com", url: "https://greenteapress.com/wp/think-stats-2e/" },
      ],
      duration: "3–4 semaines",
    },
    {
      id: "machine-learning",
      name: "Machine Learning",
      tagline: "Prédire avec méthode.",
      description:
        "scikit-learn, validation, tuning : construire des modèles prédictifs évalués honnêtement, sans data leakage.",
      level: "advanced",
      stage: "modeling",
      prerequisites: ["statistics", "python"],
      concepts: ["scikit-learn", "Validation croisée", "Hyperparamètres", "Data leakage", "Interprétabilité (SHAP)"],
      projects: ["Modèle de scoring client", "Pipeline ML reproductible"],
      resources: [
        { title: "Hands-On ML (Géron)", provider: "O'Reilly", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/" },
        { title: "scikit-learn Docs", provider: "scikit-learn.org", url: "https://scikit-learn.org/stable/" },
      ],
      duration: "6–8 semaines",
    },
    {
      id: "experimentation",
      name: "Expérimentation",
      tagline: "Prouver l'impact, pas le corréler.",
      description:
        "A/B testing, causalité : distinguer ce qui marche vraiment de ce qui coïncide. La compétence la plus sous-estimée.",
      level: "advanced",
      stage: "modeling",
      prerequisites: ["statistics"],
      concepts: ["Design d'expériences", "Puissance statistique", "Causalité", "Bandits", "Peeking"],
      projects: ["Plan d'A/B test complet", "Analyse causale d'une feature"],
      resources: [
        { title: "Trustworthy Online Experiments", provider: "experimentguide.com", url: "https://www.experimentguide.com/" },
        { title: "Evan Miller — A/B testing", provider: "evanmiller.org", url: "https://www.evanmiller.org/ab-testing/" },
      ],
      duration: "3–4 semaines",
    },
    {
      id: "feature-engineering",
      name: "Feature Engineering",
      tagline: "Les données que le modèle mérite.",
      description:
        "Créer des variables pertinentes : souvent plus d'impact que le choix de l'algorithme. Art autant que technique.",
      level: "advanced",
      stage: "modeling",
      prerequisites: ["machine-learning"],
      concepts: ["Encodage", "Variables temporelles", "Target encoding", "Sélection de variables", "Pipelines"],
      projects: ["Amélioration mesurée d'un modèle", "Feature store minimal"],
      resources: [
        { title: "Feature Engineering (Zheng)", provider: "O'Reilly", url: "https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/" },
        { title: "Kaggle — Feature Engineering", provider: "kaggle.com", url: "https://www.kaggle.com/learn/feature-engineering" },
      ],
      duration: "3 semaines",
    },
    {
      id: "storytelling",
      name: "Storytelling data",
      tagline: "L'analyse qui change les décisions.",
      description:
        "Une analyse non communiquée n'existe pas : structurer le récit, adapter au public, recommander avec clarté.",
      level: "intermediate",
      stage: "impact",
      prerequisites: ["data-viz", "eda"],
      concepts: ["Structure narrative", "Recommandations", "Executive summaries", "Présentation", "Écriture claire"],
      projects: ["Mémo décisionnel pour dirigeants", "Présentation d'insights"],
      resources: [
        { title: "Storytelling with Data", provider: "storytellingwithdata.com", url: "https://www.storytellingwithdata.com/" },
        { title: "The Pyramid Principle", provider: "McKinsey", url: "https://www.mckinsey.com/" },
      ],
      duration: "2–3 semaines",
    },
    {
      id: "deployment",
      name: "Mise en production",
      tagline: "Le modèle qui tourne vraiment.",
      description:
        "API de scoring, batch, monitoring : un modèle en production vaut dix notebooks. Bases du MLOps pour data scientists.",
      level: "advanced",
      stage: "impact",
      prerequisites: ["machine-learning", "python"],
      concepts: ["API FastAPI", "Batch scoring", "Monitoring", "Dérive", "Versioning"],
      projects: ["API de prédiction déployée", "Pipeline batch schedulé"],
      resources: [
        { title: "FastAPI Docs", provider: "fastapi.tiangolo.com", url: "https://fastapi.tiangolo.com/" },
        { title: "MLOps Zoomcamp", provider: "GitHub", url: "https://github.com/DataTalksClub/mlops-zoomcamp" },
      ],
      duration: "4 semaines",
    },
  ],
};

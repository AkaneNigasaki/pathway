import type { SkillGuide } from "../skill-guides";

import { LEARNING_STATISTICS } from "./learning-statistics";
import { LEARNING_SQL } from "./learning-sql";
import { LEARNING_ML } from "./learning-ml";
import { LEARNING_DATA_VIZ } from "./learning-data-viz";
import { LEARNING_DEPLOYMENT } from "./learning-deployment";
import { LEARNING_EDA } from "./learning-eda";
import { LEARNING_EXPERIMENTATION } from "./learning-experimentation";
import { LEARNING_FEATURE_ENGINEERING } from "./learning-feature-engineering";
import { LEARNING_PYTHON } from "./learning-python";
import { LEARNING_STORYTELLING } from "./learning-storytelling";
/**
 * Guides pédagogiques — Data : roadmap Data Scientist.
 *
 * Ces entrées enrichissent les compétences de la roadmap `data-scientist`
 * (désignées par leur `id`) avec un contenu éditorial structuré :
 * définition, intérêt pédagogique, prérequis expliqués, concepts clés,
 * fonctionnement, exemple concret et projets progressifs.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - Ton : documentation technique premium, concret, sans marketing. Français.
 */
export const GUIDES_DATA: Record<string, SkillGuide> = {
  // ------------------------------------------------------------------ python
  python: {
    learning: LEARNING_PYTHON,
    definition:
      "Python est le langage central de la data science : avec pandas et NumPy pour manipuler les données, et Jupyter pour explorer, il constitue l'environnement de travail quotidien du data scientist.",
    whyLearn:
      "Charger, nettoyer, analyser, visualiser, modéliser : 90 % du travail de data science se fait en Python. Le maîtriser, c'est être autonome sur tout le cycle d'analyse, du CSV brut au rapport final.",
    conceptDetails: [
      {
        name: "pandas",
        definition:
          "La manipulation de données tabulaires : DataFrames, filtres, groupby, jointures. L'outil que vous ouvrirez chaque matin.",
      },
      {
        name: "NumPy",
        definition:
          "Le calcul numérique sous pandas : tableaux, opérations vectorisées, statistiques de base sur de gros volumes.",
      },
      {
        name: "Jupyter",
        definition:
          "Les notebooks interactifs : exécuter le code par cellules, visualiser au fil de l'exploration, raconter l'analyse.",
      },
      {
        name: "Nettoyage de données",
        definition:
          "Valeurs manquantes, doublons, types incohérents : la phase ingrate mais décisive, qui conditionne tout le reste.",
      },
      {
        name: "Visualisation de base",
        definition:
          "Tracer rapidement une distribution ou une série temporelle pour voir ce que les chiffres racontent avant de calculer.",
      },
    ],
    howItWorksTitle: "Le cycle d'analyse en Python",
    howItWorks: ["LOAD", "CLEAN", "EXPLORE", "VISUALIZE", "MODEL", "SHARE"],
    example: {
      title: "Nettoyer un fichier de ventes",
      steps: [
        "Charger le CSV avec pandas",
        "Repérer les valeurs manquantes et les doublons",
        "Convertir les dates et les montants",
        "Vérifier la cohérence des totaux",
        "Exporter un dataset propre",
      ],
    },
    projectsDetailed: [
      {
        title: "Nettoyage d'un dataset sale",
        flow: "CSV brut → Diagnostic → Nettoyage → Validation → Dataset propre",
      },
      {
        title: "Exploration d'un dataset public",
        flow: "Kaggle → Questions → Analyses → Visualisations → Notebook publié",
      },
    ],
  },

  // ------------------------------------------------------------------ sql
  sql: {
    learning: LEARNING_SQL,
    definition:
      "SQL (Structured Query Language) est le langage pour interroger les bases de données relationnelles : sélectionner, filtrer, joindre et agréger des données avec une syntaxe déclarative — on décrit le résultat voulu, pas comment l'obtenir.",
    whyLearn:
      "Les données de l'entreprise vivent dans des bases, pas dans des CSV. SQL est la première compétence demandée aux data scientists : extraire le bon périmètre de données, rapidement, sans dépendre de personne. C'est aussi le langage le plus rentable à apprendre rapport temps/investi.",
    conceptDetails: [
      {
        name: "SELECT & WHERE",
        definition:
          "Choisir les colonnes et filtrer les lignes : la base de toute extraction, à maîtriser jusqu'au réflexe.",
      },
      {
        name: "Jointures",
        definition:
          "Combiner plusieurs tables via des clés communes (INNER, LEFT, FULL) : reconstituer l'information éclatée dans la base.",
      },
      {
        name: "Agrégations",
        definition:
          "Résumer avec COUNT, SUM, AVG et GROUP BY : passer de millions de lignes à des indicateurs lisibles.",
      },
      {
        name: "Fenêtres (window functions)",
        definition:
          "Calculer sur des groupes glissants (classements, cumuls, variations) sans écraser le détail des lignes.",
      },
      {
        name: "CTE",
        definition:
          "Les Common Table Expressions (WITH) découpent une requête complexe en étapes nommées et lisibles.",
      },
    ],
    howItWorksTitle: "L'exécution d'une requête",
    howItWorks: ["FROM", "WHERE", "GROUP BY", "HAVING", "SELECT", "ORDER BY"],
    example: {
      title: "Top produits par mois",
      steps: [
        "Joindre commandes et produits",
        "Filtrer sur l'année en cours",
        "Agréger le chiffre d'affaires par mois et produit",
        "Classer avec une fonction de fenêtre",
        "Ne garder que le top 5 mensuel",
      ],
    },
    projectsDetailed: [
      {
        title: "Analyses sur une base e-commerce",
        flow: "Schéma → Questions business → Requêtes → Indicateurs",
      },
      {
        title: "Requêtes window avancées",
        flow: "Besoin → CTE → Fonctions de fenêtre → Résultat vérifié",
      },
    ],
  },

  // ------------------------------------------------------------------ statistics
  statistics: {
    learning: LEARNING_STATISTICS,
    definition:
      "Les statistiques fournissent les outils pour décrire des données, quantifier l'incertitude et tester des hypothèses : moyennes, distributions, tests, régressions. Sans elles, une analyse n'est qu'une opinion avec des graphiques.",
    whyLearn:
      "Chaque chiffre d'un rapport mérite une question : est-ce significatif ? Quelle est la marge d'erreur ? Les statistiques évitent les conclusions hâtives et donnent à vos analyses une crédibilité que les seuls graphiques ne procurent pas.",
    conceptDetails: [
      {
        name: "Statistiques descriptives",
        definition:
          "Résumer un dataset : moyennes, médianes, écarts-types, quantiles. La première lecture, avant toute modélisation.",
      },
      {
        name: "Probabilités",
        definition:
          "Le langage de l'incertitude : ce qui peut arriver, avec quelle chance. Indispensable pour interpréter tout résultat.",
      },
      {
        name: "Tests d'hypothèses",
        definition:
          "Décider si un effet observé est réel ou dû au hasard : p-valeurs, significativité, puissance du test.",
      },
      {
        name: "Régression",
        definition:
          "Modéliser la relation entre des variables : quantifier l'effet d'un facteur et prédire des valeurs continues.",
      },
      {
        name: "Intervalles de confiance",
        definition:
          "Encadrer une estimation par une plage plausible : l'honnêteté statistique face à l'incertitude.",
      },
    ],
    howItWorksTitle: "Du chiffre à la conclusion fiable",
    howItWorks: ["DATA", "DESCRIBE", "HYPOTHESIS", "TEST", "INTERVAL", "CONCLUDE"],
    example: {
      title: "Le taux de conversion a-t-il augmenté ?",
      steps: [
        "Collecter les conversions avant/après",
        "Formuler l'hypothèse à tester",
        "Appliquer le test adapté",
        "Calculer l'intervalle de confiance",
        "Conclure : effet réel ou bruit",
      ],
    },
    projectsDetailed: [
      {
        title: "Rapport statistique complet",
        flow: "Dataset → Descriptives → Tests → Intervalles → Conclusions",
      },
      {
        title: "Test A/B simulé",
        flow: "Simulation → Test → Interprétation → Pièges évités",
      },
    ],
  },

  // ------------------------------------------------------------------ data-viz
  "data-viz": {
    learning: LEARNING_DATA_VIZ,
    definition:
      "La data visualization transforme des données en représentations graphiques qui révèlent structures et anomalies d'un coup d'œil. Bien faite, elle rend l'invisible évident ; mal faite, elle trompe.",
    whyLearn:
      "Un décideur ne lira pas votre tableau de 10 000 lignes, mais il comprendra votre graphique en dix secondes. Choisir la bonne représentation et éviter les pièges visuels (axes tronqués, 3D inutile) fait la différence entre une analyse vue et une analyse qui agit.",
    prerequisiteNotes: {
      python:
        "Tracer avec matplotlib/seaborn/Plotly en Python : la dataviz du data scientist se code, elle ne se clique pas.",
      statistics:
        "Savoir ce qu'on représente (distributions, incertitudes) pour choisir des graphiques honnêtes et pertinents.",
    },
    conceptDetails: [
      {
        name: "matplotlib / seaborn",
        definition:
          "Les bibliothèques de référence en Python : contrôle total pour les graphiques statistiques, du rapide au publication-ready.",
      },
      {
        name: "Plotly",
        definition:
          "Des graphiques interactifs (zoom, survol, filtres) intégrables dans des dashboards et des notebooks partagés.",
      },
      {
        name: "Choix du graphique",
        definition:
          "Barres pour comparer, lignes pour le temps, nuages pour les relations, histogrammes pour les distributions : chaque question a sa forme.",
      },
      {
        name: "Storytelling visuel",
        definition:
          "Guider le regard : titre qui conclut, annotations, mise en évidence. Un graphique doit raconter, pas décorer.",
      },
      {
        name: "Dashboards",
        definition:
          "Assembler les indicateurs clés en une vue suivie dans le temps : l'outil de pilotage des équipes.",
      },
    ],
    howItWorksTitle: "Concevoir une visualisation qui agit",
    howItWorks: ["QUESTION", "DATA", "CHOICE", "DESIGN", "ANNOTATE", "SHARE"],
    example: {
      title: "Expliquer une baisse des ventes",
      steps: [
        "Tracer les ventes dans le temps",
        "Superposer les segments de produits",
        "Annoter les événements (rupture, promo)",
        "Titrer avec la conclusion",
        "Présenter en une slide",
      ],
    },
    projectsDetailed: [
      {
        title: "Dashboard interactif",
        flow: "Indicateurs → Plotly → Filtres → Mise en page → Partage",
      },
      {
        title: "Refonte de visualisations trompeuses",
        flow: "Graphiques fautifs → Diagnostic → Correction → Avant/après",
      },
    ],
  },

  // ------------------------------------------------------------------ eda
  eda: {
    learning: LEARNING_EDA,
    definition:
      "L'analyse exploratoire (EDA) est le dialogue avec les données avant toute modélisation : distributions, corrélations, valeurs aberrantes, hypothèses. C'est là que naissent les vraies questions — et que meurent les fausses.",
    whyLearn:
      "Modéliser sans explorer, c'est répondre avant d'avoir compris la question. L'EDA révèle les pièges (fuites, biais, erreurs de collecte) qui invalideraient tout modèle, et fait émerger les insights que personne n'avait demandés.",
    prerequisiteNotes: {
      python:
        "Manipuler et visualiser vite avec pandas et les librairies graphiques : l'EDA est un travail itératif en Python.",
      statistics:
        "Lire des distributions, repérer des corrélations fallacieuses, quantifier : l'œil statistique guide l'exploration.",
    },
    conceptDetails: [
      {
        name: "Distributions",
        definition:
          "La forme des variables : asymétries, multimodalités, queues lourdes. Elle dicte les transformations et les modèles adaptés.",
      },
      {
        name: "Corrélations",
        definition:
          "Les relations entre variables : utiles pour comprendre, trompeuses pour conclure (corrélation n'est pas causalité).",
      },
      {
        name: "Valeurs manquantes",
        definition:
          "Comprendre pourquoi des données manquent (aléatoire ou systématique) avant de décider : supprimer, imputer, modéliser.",
      },
      {
        name: "Outliers",
        definition:
          "Les valeurs extrêmes : erreurs de saisie à corriger, ou phénomènes rares les plus intéressants du dataset.",
      },
      {
        name: "Hypothèses",
        definition:
          "Formuler des questions testables à partir de l'exploration : l'EDA produit des hypothèses, les tests les valident.",
      },
    ],
    howItWorksTitle: "Le cycle d'exploration",
    howItWorks: ["OVERVIEW", "DISTRIBUTIONS", "RELATIONS", "ANOMALIES", "HYPOTHESES", "REPORT"],
    example: {
      title: "Comprendre l'attrition d'abonnés",
      steps: [
        "Profil global : qui part, quand",
        "Comparer les distributions (partants vs fidèles)",
        "Chercher les corrélations avec l'ancienneté, l'usage",
        "Repérer les segments surprenants",
        "Formuler trois hypothèses à tester",
      ],
    },
    projectsDetailed: [
      {
        title: "EDA complète publiée sur Kaggle",
        flow: "Dataset → Questions → Analyses → Visualisations → Notebook",
      },
      {
        title: "Rapport d'insights business",
        flow: "Exploration → Findings → Recommandations → Présentation",
      },
    ],
  },

  // ------------------------------------------------------------------ machine-learning
  "machine-learning": {
    learning: LEARNING_ML,
    definition:
      "Le machine learning apprend des motifs à partir de données pour prédire : qui va résilier, quel prix pratiquer, quelle transaction est frauduleuse. En data science, il prolonge l'analyse quand les règles manuelles ne suffisent plus.",
    whyLearn:
      "La prédiction est le passage de l'analyse descriptive à la valeur opérationnelle : scoring, recommandation, détection. Mais un modèle mal évalué (data leakage, métrique inadaptée) fait plus de dégâts qu'aucun modèle. La rigueur d'évaluation est la vraie compétence.",
    prerequisiteNotes: {
      statistics:
        "Validation, biais/variance, métriques : évaluer un modèle est un raisonnement statistique.",
      python:
        "scikit-learn et les pipelines s'utilisent en Python : manipulation de données et code structuré requis.",
    },
    conceptDetails: [
      {
        name: "scikit-learn",
        definition:
          "La bibliothèque standard du ML tabulaire : régression, arbres, forêts, avec une API fit/predict uniforme.",
      },
      {
        name: "Validation croisée",
        definition:
          "Estimer les performances sur des données jamais vues, en plusieurs plis : la seule évaluation honnête.",
      },
      {
        name: "Hyperparamètres",
        definition:
          "Les réglages de l'algorithme (profondeur, taux d'apprentissage) : optimisés par recherche systématique, jamais au hasard.",
      },
      {
        name: "Data leakage",
        definition:
          "Quand de l'information du futur fuit dans l'entraînement : des scores mirobolants, un modèle inutile en production.",
      },
      {
        name: "Interprétabilité (SHAP)",
        definition:
          "Expliquer pourquoi le modèle prédit ceci : indispensable pour convaincre un métier et détecter les biais.",
      },
    ],
    howItWorksTitle: "Construire un modèle fiable",
    howItWorks: ["FEATURES", "SPLIT", "TRAIN", "VALIDATE", "INTERPRET", "TEST"],
    example: {
      title: "Scorer le risque d'impayé",
      steps: [
        "Construire les features client",
        "Séparer temporellement train et test",
        "Entraîner un gradient boosting",
        "Valider sans leakage",
        "Expliquer les décisions avec SHAP",
      ],
    },
    projectsDetailed: [
      {
        title: "Modèle de scoring client",
        flow: "Données → Features → Modèle → Interprétation → Rapport",
      },
      {
        title: "Pipeline ML reproductible",
        flow: "Code versionné → Pipeline → Métriques → Documentation",
      },
    ],
  },

  // ------------------------------------------------------------------ experimentation
  experimentation: {
    learning: LEARNING_EXPERIMENTATION,
    definition:
      "L'expérimentation (A/B testing, inférence causale) permet de prouver qu'un changement cause un effet, et pas seulement qu'il coïncide avec. C'est la méthode la plus fiable pour décider en environnement incertain.",
    whyLearn:
      "Corrélation n'est pas causalité : sans expérimentation, on optimise des mirages. Savoir designer un test, calculer sa puissance et éviter le peeking transforme les intuitions produit en décisions prouvées. La compétence la plus sous-estimée du data scientist.",
    prerequisiteNotes: {
      statistics:
        "Tests d'hypothèses, p-valeurs, intervalles de confiance : l'A/B testing en est l'application directe.",
    },
    conceptDetails: [
      {
        name: "Design d'expériences",
        definition:
          "Randomisation, groupes contrôle/test, métriques primaires définies à l'avance : un bon test se conçoit avant de se lancer.",
      },
      {
        name: "Puissance statistique",
        definition:
          "La probabilité de détecter un effet réel : elle détermine la taille d'échantillon et la durée nécessaires.",
      },
      {
        name: "Causalité",
        definition:
          "Aller au-delà de la corrélation : ce qui se serait passé sans le changement (le contrefactuel) est la vraie question.",
      },
      {
        name: "Bandits",
        definition:
          "Les tests adaptatifs qui allouent plus de trafic à la variante gagnante en cours de route : expérimenter sans sacrifier trop de conversions.",
      },
      {
        name: "Peeking",
        definition:
          "Regarder les résultats en continu et s'arrêter au premier signal positif : la pratique qui invalide les tests. S'en prémunir.",
      },
    ],
    howItWorksTitle: "Mener une expérience fiable",
    howItWorks: ["HYPOTHESIS", "DESIGN", "SAMPLE", "RUN", "ANALYZE", "DECIDE"],
    example: {
      title: "Tester un nouveau tunnel d'inscription",
      steps: [
        "Définir la métrique (taux de complétion)",
        "Calculer la taille d'échantillon requise",
        "Randomiser les visiteurs",
        "Laisser tourner la durée prévue",
        "Analyser une seule fois, décider",
      ],
    },
    projectsDetailed: [
      {
        title: "Plan d'A/B test complet",
        flow: "Question → Design → Puissance → Protocole → Analyse",
      },
      {
        title: "Analyse causale d'une feature",
        flow: "Données historiques → Méthode causale → Effet estimé → Limites",
      },
    ],
  },

  // ------------------------------------------------------------------ feature-engineering
  "feature-engineering": {
    learning: LEARNING_FEATURE_ENGINEERING,
    definition:
      "Le feature engineering crée les variables d'entrée d'un modèle à partir des données brutes : encodages, agrégations temporelles, interactions. C'est souvent là que se gagnent les points de performance, pas dans l'algorithme.",
    whyLearn:
      "Un modèle ne voit que ce qu'on lui donne : des features bien conçues (ancienneté client, panier moyen sur 30 jours) valent mieux qu'un algorithme sophistiqué sur des données pauvres. C'est l'art du data scientist, à la frontière du métier et de la technique.",
    prerequisiteNotes: {
      "machine-learning":
        "Comprendre comment les modèles consomment les features (échelles, cardinalités) pour les construire efficacement.",
    },
    conceptDetails: [
      {
        name: "Encodage",
        definition:
          "Convertir les catégories en nombres : one-hot, ordinal, ou target encoding selon la cardinalité et le modèle.",
      },
      {
        name: "Variables temporelles",
        definition:
          "Extraire le signal du temps : ancienneté, récence, fréquences, tendances glissantes. Le temps est une feature riche.",
      },
      {
        name: "Target encoding",
        definition:
          "Remplacer une catégorie par la moyenne de la cible : puissant, mais à valider avec soin pour éviter le leakage.",
      },
      {
        name: "Sélection de variables",
        definition:
          "Garder l'utile, écarter le bruit : moins de features, c'est souvent un modèle plus robuste et plus rapide.",
      },
      {
        name: "Pipelines",
        definition:
          "Encapsuler les transformations dans des pipelines reproductibles : les mêmes features à l'entraînement et en production.",
      },
    ],
    howItWorksTitle: "Du brut à la feature",
    howItWorks: ["RAW", "EXPLORE", "CREATE", "ENCODE", "SELECT", "PIPELINE"],
    example: {
      title: "Features pour prédire le churn",
      steps: [
        "Calculer l'ancienneté et la récence d'activité",
        "Agréger l'usage sur 7, 30, 90 jours",
        "Encoder les segments d'offre",
        "Mesurer l'importance de chaque feature",
        "Figer le tout dans un pipeline",
      ],
    },
    projectsDetailed: [
      {
        title: "Amélioration mesurée d'un modèle",
        flow: "Baseline → Nouvelles features → Gain mesuré → Sélection",
      },
      {
        title: "Feature store minimal",
        flow: "Définitions → Calculs → Stockage → Réutilisation",
      },
    ],
  },

  // ------------------------------------------------------------------ storytelling
  storytelling: {
    learning: LEARNING_STORYTELLING,
    definition:
      "Le storytelling data est l'art de transformer une analyse en récit qui fait décider : structurer le propos, adapter au public, formuler des recommandations claires. Une analyse non communiquée n'existe pas.",
    whyLearn:
      "Les meilleures analyses meurent dans des notebooks illisibles. Savoir raconter — pyramide inversée, une idée par slide, recommandation explicite — convertit le travail technique en décisions. C'est la compétence qui rend toutes les autres visibles.",
    prerequisiteNotes: {
      "data-viz":
        "Des visualisations claires et honnêtes : le storytelling s'appuie sur des graphiques qui racontent déjà.",
      eda: "Des insights solides issus de l'exploration : on ne raconte bien que ce qu'on a bien compris.",
    },
    conceptDetails: [
      {
        name: "Structure narrative",
        definition:
          "Contexte, tension, résolution : ordonner l'analyse comme un récit, pas comme un journal de bord technique.",
      },
      {
        name: "Recommandations",
        definition:
          "Conclure par une action proposée, chiffrée si possible : « faire X » plutôt que « on observe Y ».",
      },
      {
        name: "Executive summaries",
        definition:
          "Le résumé d'une page pour les dirigeants : conclusion d'abord, détails ensuite, jamais l'inverse.",
      },
      {
        name: "Présentation",
        definition:
          "Présenter à l'oral : rythme, gestion des questions, adaptation au niveau technique de l'audience.",
      },
      {
        name: "Écriture claire",
        definition:
          "Phrases courtes, jargon traduit, chiffres contextualisés : l'écrit reste quand la présentation s'efface.",
      },
    ],
    howItWorksTitle: "Transformer une analyse en décision",
    howItWorks: ["INSIGHT", "AUDIENCE", "NARRATIVE", "VISUALS", "RECOMMEND", "DECIDE"],
    example: {
      title: "Convaincre de changer de pricing",
      steps: [
        "Identifier l'insight clé (élasticité par segment)",
        "Structurer : situation, problème, recommandation",
        "Illustrer avec deux graphiques",
        "Chiffrer l'impact attendu",
        "Proposer un test avant généralisation",
      ],
    },
    projectsDetailed: [
      {
        title: "Mémo décisionnel pour dirigeants",
        flow: "Analyse → Synthèse une page → Recommandation → Diffusion",
      },
      {
        title: "Présentation d'insights",
        flow: "Findings → Récit → Slides → Présentation",
      },
    ],
  },

  // ------------------------------------------------------------------ deployment
  deployment: {
    learning: LEARNING_DEPLOYMENT,
    definition:
      "La mise en production déploie un modèle pour qu'il serve réellement : API de scoring, batch planifié, monitoring. Un modèle en production vaut dix notebooks.",
    whyLearn:
      "Trop de modèles meurent dans un notebook. Savoir exposer une API FastAPI, planifier un scoring batch et surveiller la dérive fait passer le data scientist de l'analyse au produit — et c'est là que la valeur se crée.",
    prerequisiteNotes: {
      "machine-learning":
        "Un modèle entraîné et validé : on ne déploie que ce qu'on a rigoureusement évalué.",
      python:
        "Packager du code Python propre et des dépendances figées : la base d'un service déployable.",
    },
    conceptDetails: [
      {
        name: "API FastAPI",
        definition:
          "Exposer le modèle via des endpoints HTTP : recevoir des données, renvoyer des prédictions, en temps réel.",
      },
      {
        name: "Batch scoring",
        definition:
          "Scorer en masse à intervalles réguliers (chaque nuit) plutôt qu'à la demande : simple et suffisant dans bien des cas.",
      },
      {
        name: "Monitoring",
        definition:
          "Surveiller les prédictions en production : volumes, latences, distributions. Ce qui n'est pas surveillé dérive en silence.",
      },
      {
        name: "Dérive",
        definition:
          "Quand les données réelles s'éloignent des données d'entraînement : les performances chutent, il faut détecter et réagir.",
      },
      {
        name: "Versioning",
        definition:
          "Tracer quelle version du modèle tourne où, avec quelles données : pouvoir revenir en arrière en cas de problème.",
      },
    ],
    howItWorksTitle: "Du modèle au service",
    howItWorks: ["MODEL", "PACKAGE", "API", "DEPLOY", "MONITOR", "UPDATE"],
    example: {
      title: "API de scoring de leads",
      steps: [
        "Sérialiser le modèle entraîné",
        "Créer l'endpoint /predict avec FastAPI",
        "Conteneuriser le service",
        "Déployer et tester en charge",
        "Monitorer les distributions d'entrée",
      ],
    },
    projectsDetailed: [
      {
        title: "API de prédiction déployée",
        flow: "Modèle → FastAPI → Docker → Déploiement → Tests",
      },
      {
        title: "Pipeline batch schedulé",
        flow: "Données → Scoring nocturne → Table de résultats → Alertes",
      },
    ],
  },
};

import type { SkillGuide } from "../skill-guides";

/**
 * Guides pédagogiques — IA : roadmap AI Engineer.
 *
 * Ces entrées enrichissent les compétences de la roadmap `ai-engineer`
 * (désignées par leur `id`) avec un contenu éditorial structuré :
 * définition, intérêt pédagogique, prérequis expliqués, concepts clés,
 * fonctionnement, exemple concret et projets progressifs.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - Ton : documentation technique premium, concret, sans marketing. Français.
 */
export const GUIDES_AI: Record<string, SkillGuide> = {
  // ------------------------------------------------------------------ python
  python: {
    learning: () => import("./learning-python").then((m) => m.LEARNING_PYTHON),
    definition:
      "Python est un langage de programmation interprété, lisible et polyvalent. En IA, il est la lingua franca : presque toutes les bibliothèques de machine learning (NumPy, pandas, PyTorch, scikit-learn) sont écrites ou pilotées en Python.",
    whyLearn:
      "Tout l'écosystème IA parle Python : charger des données, entraîner un modèle, déployer une API. Sans une maîtrise solide du langage et de ses outils (environnements, notebooks), chaque étape suivante devient laborieuse. C'est le prérequis qui ne se négocie pas.",
    conceptDetails: [
      {
        name: "NumPy",
        definition:
          "La bibliothèque de calcul numérique : tableaux multidimensionnels et opérations vectorisées, la base de tout traitement de données en Python.",
      },
      {
        name: "pandas",
        definition:
          "Manipulation de données tabulaires via les DataFrames : filtrer, agréger, joindre et nettoyer des datasets avec une syntaxe expressive.",
      },
      {
        name: "Environnements",
        definition:
          "Isoler les dépendances d'un projet (venv, conda) pour garantir la reproductibilité : mêmes versions de bibliothèques, partout.",
      },
      {
        name: "Notebooks",
        definition:
          "Jupyter : exécuter le code par cellules, visualiser les résultats au fil de l'exploration. Idéal pour expérimenter, à discipliner pour la production.",
      },
      {
        name: "Bonnes pratiques",
        definition:
          "Structure de projet, typage, tests, linting : ce qui sépare un notebook jetable d'un code que l'on peut relire et maintenir six mois plus tard.",
      },
    ],
    howItWorksTitle: "Le cycle de travail Python en IA",
    howItWorks: ["DATA", "LOAD", "CLEAN", "ANALYZE", "MODEL", "EVALUATE"],
    example: {
      title: "Explorer un dataset de logements",
      steps: [
        "Charger le CSV avec pandas",
        "Inspecter les valeurs manquantes",
        "Nettoyer et convertir les types",
        "Tracer les distributions",
        "Calculer les corrélations avec le prix",
      ],
    },
    projectsDetailed: [
      {
        title: "Analyse de dataset avec pandas",
        flow: "Dataset brut → Nettoyage → Statistiques descriptives → Visualisations → Conclusions",
      },
      {
        title: "Pipeline de preprocessing",
        flow: "Données → Imputation → Encodage → Normalisation → Jeu prêt pour l'entraînement",
      },
      {
        title: "Template de projet reproductible",
        flow: "Environnement → Structure de dossiers → Scripts → README → Versionnement",
      },
    ],
  },

  // ------------------------------------------------------------------ maths
  maths: {
    learning: () => import("./learning-maths").then((m) => m.LEARNING_MATHS),
    definition:
      "Les mathématiques de l'IA regroupent trois piliers : l'algèbre linéaire (les données et les modèles sont des matrices), le calcul différentiel (comment on optimise un modèle) et les probabilités (comment on raisonne sous incertitude).",
    whyLearn:
      "Appeler `model.fit()` sans comprendre ce qui se passe dessous limite à du copier-coller fragile. Les maths permettent de diagnostiquer un entraînement qui diverge, de choisir une fonction de perte adaptée et de lire la littérature de recherche. C'est la différence entre utiliser des modèles et les comprendre.",
    conceptDetails: [
      {
        name: "Algèbre linéaire",
        definition:
          "Vecteurs, matrices, produits : le langage dans lequel les données et les paramètres des modèles sont représentés et transformés.",
      },
      {
        name: "Dérivées & gradients",
        definition:
          "La dérivée indique la direction de la plus forte variation : le gradient guide l'optimisation des modèles vers de meilleures performances.",
      },
      {
        name: "Probabilités",
        definition:
          "Modéliser l'incertitude : les prédictions d'un modèle sont des distributions de probabilités, pas des certitudes.",
      },
      {
        name: "Optimisation",
        definition:
          "Minimiser une fonction de perte en ajustant les paramètres : la descente de gradient est l'algorithme central de l'apprentissage.",
      },
      {
        name: "Statistiques bayésiennes",
        definition:
          "Mettre à jour une croyance à mesure que des données arrivent : le cadre formel derrière l'inférence et la calibration des modèles.",
      },
    ],
    howItWorksTitle: "Comment les maths pilotent l'apprentissage",
    howItWorks: ["PARAMÈTRES", "PRÉDICTION", "PERTE", "GRADIENT", "MISE À JOUR", "CONVERGENCE"],
    example: {
      title: "Régression linéaire à la main",
      steps: [
        "Représenter les données comme une matrice X",
        "Définir la perte (erreur quadratique moyenne)",
        "Calculer le gradient de la perte",
        "Ajuster les poids dans le sens opposé",
        "Répéter jusqu'à convergence",
      ],
    },
    projectsDetailed: [
      {
        title: "Régression linéaire from scratch",
        flow: "NumPy → Descente de gradient → Courbe de perte → Comparaison avec scikit-learn",
      },
      {
        title: "Descente de gradient visualisée",
        flow: "Fonction 2D → Trajectoire d'optimisation → Animation → Effet du pas d'apprentissage",
      },
    ],
  },

  // ------------------------------------------------------------------ git
  git: {
    learning: () => import("./learning-git").then((m) => m.LEARNING_GIT),
    definition:
      "Git est un système de gestion de versions : il enregistre l'historique des modifications d'un projet, permet de travailler en parallèle via des branches et de revenir à n'importe quel état antérieur.",
    whyLearn:
      "Les projets IA sont expérimentaux par nature : dizaines d'essais, d'hyperparamètres, de versions de datasets. Git, couplé à des outils comme DVC ou MLflow, apporte la traçabilité : savoir exactement quel code, quelles données et quels paramètres ont produit tel résultat. Sans cela, impossible de reproduire une expérience.",
    conceptDetails: [
      {
        name: "Branches",
        definition:
          "Des lignes de développement parallèles : expérimenter sans casser la version stable, puis fusionner ce qui fonctionne.",
      },
      {
        name: "Revues de code",
        definition:
          "Faire relire ses modifications avant fusion : la pratique qui attrape les bugs et diffuse les bonnes pratiques dans l'équipe.",
      },
      {
        name: "DVC",
        definition:
          "Data Version Control : versionner les datasets et les modèles lourds avec Git, sans les stocker dans le dépôt lui-même.",
      },
      {
        name: "MLflow",
        definition:
          "Tracer les expériences de ML : paramètres, métriques, artefacts de chaque entraînement, comparables dans une interface.",
      },
      {
        name: "Reproductibilité",
        definition:
          "Garantir qu'une expérience peut être rejouée à l'identique : code versionné, données versionnées, environnement figé.",
      },
    ],
    howItWorksTitle: "Le cycle d'une expérience versionnée",
    howItWorks: ["BRANCH", "CODE", "TRACK", "COMMIT", "COMPARE", "MERGE"],
    example: {
      title: "Comparer deux entraînements",
      steps: [
        "Créer une branche pour l'expérience",
        "Modifier les hyperparamètres",
        "Tracer les métriques avec MLflow",
        "Comparer avec l'expérience précédente",
        "Fusionner la meilleure version",
      ],
    },
    projectsDetailed: [
      {
        title: "Projet versionné avec expériences trackées",
        flow: "Dépôt Git → DVC pour les données → MLflow → Historique reproductible",
      },
      {
        title: "Template de projet ML",
        flow: "Structure standard → Environnements → Scripts d'entraînement → Documentation",
      },
    ],
  },

  // ------------------------------------------------------------------ statistics
  statistics: {
    learning: () => import("./learning-statistics").then((m) => m.LEARNING_STATISTICS),
    definition:
      "Les statistiques sont l'art de tirer des conclusions fiables de données incomplètes : estimer, tester des hypothèses, quantifier l'incertitude autour d'une mesure.",
    whyLearn:
      "Un modèle à 92 % de précision, est-ce mieux qu'un modèle à 91 % ? Sans tests d'hypothèses et intervalles de confiance, impossible de répondre honnêtement. Les statistiques fondent l'évaluation rigoureuse des modèles et la prise de décision sous incertitude — le cœur du métier.",
    prerequisiteNotes: {
      maths:
        "Les probabilités et l'algèbre de base : les distributions et les estimateurs s'expriment dans ce langage.",
    },
    conceptDetails: [
      {
        name: "Distributions",
        definition:
          "La forme que prennent les données : normale, binomiale, etc. Connaître la distribution guide le choix des tests et des modèles.",
      },
      {
        name: "Tests d'hypothèses",
        definition:
          "Décider si un effet observé est réel ou dû au hasard : p-valeurs, seuils de significativité, erreurs de type I et II.",
      },
      {
        name: "Intervalles de confiance",
        definition:
          "Encadrer une estimation par une plage plausible : dire « entre 88 % et 94 % » plutôt qu'un chiffre isolé trompeur.",
      },
      {
        name: "Biais & variance",
        definition:
          "Le dilemme central du ML : un modèle trop simple sous-apprend (biais), trop complexe mémorise le bruit (variance).",
      },
      {
        name: "A/B testing",
        definition:
          "Comparer deux versions sur des groupes aléatoires : la méthode de référence pour prouver qu'un changement a un effet réel.",
      },
    ],
    howItWorksTitle: "Valider un résultat statistiquement",
    howItWorks: ["HYPOTHÈSE", "ÉCHANTILLON", "TEST", "P-VALEUR", "INTERVALLE", "DÉCISION"],
    example: {
      title: "Le nouveau modèle est-il meilleur ?",
      steps: [
        "Évaluer les deux modèles sur le même jeu de test",
        "Formuler l'hypothèse nulle (pas de différence)",
        "Appliquer un test adapté",
        "Lire la p-valeur et l'intervalle de confiance",
        "Décider en connaissance de cause",
      ],
    },
    projectsDetailed: [
      {
        title: "Analyse A/B complète",
        flow: "Design de l'expérience → Collecte → Test statistique → Interprétation → Recommandation",
      },
      {
        title: "Étude de biais sur un dataset",
        flow: "Dataset → Sous-groupes → Métriques par groupe → Écarts → Rapport",
      },
    ],
  },

  // ------------------------------------------------------------------ machine-learning
  "machine-learning": {
    learning: () => import("./learning-ml").then((m) => m.LEARNING_ML),
    definition:
      "Le machine learning consiste à apprendre des motifs à partir de données plutôt que de coder des règles à la main : on fournit des exemples, l'algorithme ajuste ses paramètres pour généraliser à de nouveaux cas.",
    whyLearn:
      "Avant le deep learning, les algorithmes classiques (régression, arbres, SVM) résolvent une grande partie des problèmes réels — souvent plus vite, avec moins de données et plus d'interprétabilité. Les maîtriser, c'est aussi comprendre la validation, le feature engineering et l'évaluation honnête : des compétences transférables à tout le ML.",
    prerequisiteNotes: {
      python:
        "Manipuler des données avec pandas/NumPy et structurer du code : scikit-learn s'utilise en Python.",
      statistics:
        "Comprendre biais/variance, validation et tests : l'évaluation d'un modèle est un raisonnement statistique.",
    },
    conceptDetails: [
      {
        name: "scikit-learn",
        definition:
          "La bibliothèque de référence du ML classique : une API cohérente (fit/predict) pour des dizaines d'algorithmes éprouvés.",
      },
      {
        name: "Validation croisée",
        definition:
          "Évaluer un modèle sur des données qu'il n'a jamais vues, en plusieurs plis : l'antidote à l'auto-illusion sur les performances.",
      },
      {
        name: "Feature engineering",
        definition:
          "Créer des variables pertinentes à partir des données brutes : souvent plus d'impact que le choix de l'algorithme.",
      },
      {
        name: "Régularisation",
        definition:
          "Pénaliser la complexité du modèle pour éviter le surapprentissage : contraindre pour mieux généraliser.",
      },
      {
        name: "Métriques",
        definition:
          "Choisir la bonne mesure selon le problème : précision, rappel, F1, AUC, RMSE. La métrique définit ce que le modèle optimise vraiment.",
      },
    ],
    howItWorksTitle: "Le pipeline d'un projet ML classique",
    howItWorks: ["DATA", "FEATURES", "SPLIT", "TRAIN", "VALIDATE", "TUNE", "TEST"],
    example: {
      title: "Prédire le churn d'abonnés",
      steps: [
        "Construire les features (usage, ancienneté, incidents)",
        "Séparer train/validation/test",
        "Entraîner un gradient boosting",
        "Valider par validation croisée",
        "Évaluer une seule fois sur le jeu de test",
      ],
    },
    projectsDetailed: [
      {
        title: "Compétition Kaggle",
        flow: "Dataset → EDA → Features → Modèle → Validation → Soumission",
      },
      {
        title: "Modèle de churn from scratch",
        flow: "Données métier → Pipeline → Évaluation honnête → Rapport d'insights",
      },
    ],
  },

  // ------------------------------------------------------------------ deep-learning
  "deep-learning": {
    learning: () => import("./learning-deep-learning").then((m) => m.LEARNING_DEEP_LEARNING),
    definition:
      "Le deep learning utilise des réseaux de neurones à nombreuses couches qui apprennent eux-mêmes les représentations utiles des données : pixels, sons, texte. La profondeur permet de capturer des motifs hiérarchiques, du simple au complexe.",
    whyLearn:
      "Le deep learning domine la vision, le langage et l'audio. Comprendre les architectures (CNN, Transformers), les fonctions de perte et l'entraînement (PyTorch) ouvre la porte aux modèles les plus performants — et aux LLM, qui en sont l'aboutissement.",
    prerequisiteNotes: {
      "machine-learning":
        "La méthodologie ML (validation, métriques, surapprentissage) s'applique telle quelle au deep learning.",
      maths:
        "Algèbre linéaire et gradients : un réseau de neurones n'est qu'une fonction différentiable optimisée par descente de gradient.",
    },
    conceptDetails: [
      {
        name: "PyTorch",
        definition:
          "Le framework dominant de la recherche et de l'industrie : tenseurs, différentiation automatique et modules pour construire des réseaux.",
      },
      {
        name: "CNN",
        definition:
          "Réseaux convolutifs : des filtres qui détectent des motifs locaux (contours, textures) puis les composent en objets — la base de la vision.",
      },
      {
        name: "Transformers",
        definition:
          "L'architecture derrière les LLM : le mécanisme d'attention permet au modèle de pondérer l'importance de chaque élément du contexte.",
      },
      {
        name: "Fonctions de perte",
        definition:
          "La mesure que l'entraînement minimise : entropie croisée pour la classification, MSE pour la régression. Mal choisie, le modèle apprend la mauvaise chose.",
      },
      {
        name: "Régularisation & tuning",
        definition:
          "Dropout, augmentation de données, schedulers de learning rate : l'arsenal pour entraîner des modèles qui généralisent.",
      },
    ],
    howItWorksTitle: "L'entraînement d'un réseau de neurones",
    howItWorks: ["BATCH", "FORWARD", "LOSS", "BACKWARD", "UPDATE", "EPOCH"],
    example: {
      title: "Classifier des images de vêtements",
      steps: [
        "Charger le dataset (images + labels)",
        "Définir un CNN avec PyTorch",
        "Entraîner par mini-batchs",
        "Suivre perte et précision par époque",
        "Évaluer sur le jeu de test",
      ],
    },
    projectsDetailed: [
      {
        title: "Classifieur d'images (CNN)",
        flow: "Dataset → Augmentation → CNN → Entraînement → Évaluation → Erreurs analysées",
      },
      {
        title: "Modèle de langue miniature",
        flow: "Corpus texte → Tokenizer → Transformer → Entraînement → Génération",
      },
    ],
  },

  // ------------------------------------------------------------------ nlp
  nlp: {
    learning: () => import("./learning-nlp").then((m) => m.LEARNING_NLP),
    definition:
      "Le NLP (traitement du langage naturel) donne aux machines la capacité de comprendre et générer du texte : découper le langage en unités (tokens), le représenter en vecteurs (embeddings) et modéliser les relations entre les mots.",
    whyLearn:
      "Le NLP est devenu central avec les LLM : chatbots, recherche sémantique, résumés, assistants. Comprendre tokenization, embeddings et attention permet de passer de l'utilisation naïve d'une API à la construction de systèmes linguistiques maîtrisés — et au fine-tuning.",
    prerequisiteNotes: {
      "deep-learning":
        "Les Transformers et l'entraînement PyTorch : le NLP moderne est du deep learning appliqué au texte.",
      python:
        "L'écosystème Hugging Face s'utilise en Python : datasets, tokenizers, pipelines.",
    },
    conceptDetails: [
      {
        name: "Tokenizers",
        definition:
          "Découper le texte en unités (tokens) que le modèle comprend : le choix du découpage influence coût et qualité.",
      },
      {
        name: "Embeddings",
        definition:
          "Représenter chaque token par un vecteur dense où la proximité reflète la similarité de sens : la matière première du NLP neuronal.",
      },
      {
        name: "Attention",
        definition:
          "Permettre au modèle de pondérer les mots du contexte selon leur pertinence : le mécanisme au cœur des Transformers.",
      },
      {
        name: "Hugging Face",
        definition:
          "La plateforme incontournable : des milliers de modèles pré-entraînés, datasets et outils prêts à l'emploi.",
      },
      {
        name: "Fine-tuning",
        definition:
          "Réentraîner partiellement un modèle existant sur ses propres données pour l'adapter à une tâche ou un domaine spécifique.",
      },
    ],
    howItWorksTitle: "Du texte à la prédiction",
    howItWorks: ["TEXT", "TOKENS", "EMBEDDINGS", "ATTENTION", "MODEL", "OUTPUT"],
    example: {
      title: "Classifier des avis clients",
      steps: [
        "Charger un modèle pré-entraîné Hugging Face",
        "Tokeniser les avis",
        "Fine-tuner sur des avis étiquetés",
        "Évaluer précision et rappel",
        "Déployer le classifieur",
      ],
    },
    projectsDetailed: [
      {
        title: "Classifieur de sentiments",
        flow: "Avis étiquetés → Fine-tuning → Évaluation → API de classification",
      },
      {
        title: "Fine-tuning d'un petit modèle",
        flow: "Modèle de base → Dataset métier → Entraînement → Comparaison avant/après",
      },
    ],
  },

  // ------------------------------------------------------------------ computer-vision
  "computer-vision": {
    learning: () => import("./learning-computer-vision").then((m) => m.LEARNING_COMPUTER_VISION),
    definition:
      "La vision par ordinateur apprend aux machines à interpréter les images et vidéos : détecter des objets, segmenter des régions, classifier des scènes. Les pixels deviennent une information structurée et exploitable.",
    whyLearn:
      "De la conduite autonome au contrôle qualité industriel en passant par l'imagerie médicale, la vision est partout où une caméra existe. C'est aussi un excellent terrain pour maîtriser le deep learning appliqué : données, augmentation, déploiement sur edge.",
    prerequisiteNotes: {
      "deep-learning":
        "CNN, fonctions de perte, entraînement PyTorch : la vision moderne repose entièrement sur ces fondations.",
    },
    conceptDetails: [
      {
        name: "Détection d'objets (YOLO)",
        definition:
          "Localiser et classifier plusieurs objets dans une image en un seul passage : boîtes englobantes + labels, en temps réel.",
      },
      {
        name: "Segmentation",
        definition:
          "Classifier chaque pixel de l'image : délimiter précisément les régions (organe, route, défaut) au lieu d'une simple boîte.",
      },
      {
        name: "Vision Transformers",
        definition:
          "Appliquer l'architecture Transformer aux images découpées en patchs : l'état de l'art sur de nombreuses tâches visuelles.",
      },
      {
        name: "Augmentation",
        definition:
          "Créer des variantes artificielles des images (rotations, recadrages) pour entraîner des modèles robustes avec moins de données.",
      },
      {
        name: "Déploiement edge",
        definition:
          "Faire tourner les modèles sur l'appareil lui-même (caméra, téléphone) : latence minimale, sans dépendre du cloud.",
      },
    ],
    howItWorksTitle: "Le pipeline d'un système de vision",
    howItWorks: ["IMAGE", "PREPROCESS", "BACKBONE", "HEAD", "POST-PROCESS", "PREDICTION"],
    example: {
      title: "Détecter des défauts sur une chaîne",
      steps: [
        "Photographier des pièces bonnes et défectueuses",
        "Annoter les défauts",
        "Entraîner un détecteur YOLO",
        "Évaluer précision et faux positifs",
        "Déployer sur la ligne de production",
      ],
    },
    projectsDetailed: [
      {
        title: "Détecteur d'objets temps réel",
        flow: "Dataset annoté → YOLO → Évaluation → Webcam en direct",
      },
      {
        title: "Segmentation d'images médicales",
        flow: "Scans → Annotations → U-Net → Métriques → Visualisation des masques",
      },
    ],
  },

  // ------------------------------------------------------------------ llm-systems
  "llm-systems": {
    learning: () => import("./learning-llm-systems").then((m) => m.LEARNING_LLM_SYSTEMS),
    definition:
      "Les systèmes LLM assemblent un grand modèle de langage avec des composants — bases vectorielles, outils, mémoire, garde-fous — pour construire des applications fiables : assistants, agents, recherche augmentée. Le modèle seul ne suffit pas ; le système fait le produit.",
    whyLearn:
      "La valeur des LLM se crée dans l'ingénierie autour du modèle : RAG pour ancrer les réponses dans des données réelles, agents pour agir via des outils, évaluation pour mesurer la fiabilité. C'est la compétence la plus demandée de l'IA applicative actuelle.",
    prerequisiteNotes: {
      nlp: "Embeddings, attention, fine-tuning : comprendre ce qu'un LLM fait et ne fait pas.",
      "deep-learning":
        "L'architecture Transformer et ses limites (contexte, hallucinations) expliquent les choix de conception des systèmes.",
    },
    conceptDetails: [
      {
        name: "RAG",
        definition:
          "Retrieval-Augmented Generation : récupérer des passages pertinents dans une base documentaire et les fournir au modèle pour ancrer ses réponses.",
      },
      {
        name: "Agents & tools",
        definition:
          "Donner au LLM la capacité d'appeler des fonctions (recherche, calcul, API) et d'enchaîner les actions pour accomplir une tâche.",
      },
      {
        name: "Prompt engineering système",
        definition:
          "Concevoir les instructions et le contexte du modèle comme une interface : rôles, contraintes, formats de sortie structurés.",
      },
      {
        name: "Vector DB",
        definition:
          "Bases de données optimisées pour la recherche par similarité d'embeddings : le socle du RAG à l'échelle.",
      },
      {
        name: "Évaluation LLM",
        definition:
          "Mesurer la qualité des réponses (pertinence, factualité) avec des jeux de test et des juges automatiques : sans mesure, pas de fiabilité.",
      },
    ],
    howItWorksTitle: "Le cycle d'un système RAG",
    howItWorks: ["QUESTION", "EMBEDDING", "RETRIEVAL", "CONTEXT", "GENERATION", "ANSWER"],
    example: {
      title: "Assistant sur documentation interne",
      steps: [
        "Indexer la documentation en embeddings",
        "Recevoir la question de l'utilisateur",
        "Récupérer les passages pertinents",
        "Générer la réponse ancrée dans les passages",
        "Citer les sources utilisées",
      ],
    },
    projectsDetailed: [
      {
        title: "Assistant RAG sur docs internes",
        flow: "Documents → Chunking → Vector DB → API → Interface de chat",
      },
      {
        title: "Agent multi-outils",
        flow: "Objectif → Planification → Appels d'outils → Synthèse → Résultat",
      },
    ],
  },

  // ------------------------------------------------------------------ mlops
  mlops: {
    learning: () => import("./learning-mlops").then((m) => m.LEARNING_MLOPS),
    definition:
      "Le MLOps applique les pratiques DevOps au machine learning : versionner modèles et données, automatiser les pipelines d'entraînement, déployer et surveiller les modèles en production.",
    whyLearn:
      "Un notebook qui atteint 95 % ne sert à rien s'il ne tourne jamais en production. Le MLOps transforme des expériences en systèmes : réentraînements automatiques, détection de dérive, rollback. C'est ce qui sépare un prototype d'un produit.",
    prerequisiteNotes: {
      "machine-learning":
        "Le cycle de vie d'un modèle (entraînement, validation, métriques) : le MLOps l'industrialise.",
      git: "Versionnement du code et traçabilité des expériences : le socle sur lequel le MLOps se construit.",
    },
    conceptDetails: [
      {
        name: "Pipelines (Kubeflow, Airflow)",
        definition:
          "Orchestrer les étapes (ingestion, entraînement, validation, déploiement) en workflows reproductibles et planifiables.",
      },
      {
        name: "Model registry",
        definition:
          "Le catalogue des versions de modèles : quel modèle est en production, avec quelles métriques et quels artefacts.",
      },
      {
        name: "Monitoring & drift",
        definition:
          "Surveiller les performances et détecter la dérive (quand les données réelles s'éloignent des données d'entraînement).",
      },
      {
        name: "CI/CD pour ML",
        definition:
          "Tester et déployer automatiquement : les tests portent aussi sur les données et les performances du modèle, pas seulement le code.",
      },
      {
        name: "Inférence optimisée",
        definition:
          "Servir les prédictions vite et à moindre coût : quantization, batching, GPU partagés, mise en cache.",
      },
    ],
    howItWorksTitle: "Le cycle de vie MLOps",
    howItWorks: ["CODE", "TRAIN", "REGISTER", "DEPLOY", "MONITOR", "RETRAIN"],
    example: {
      title: "Modèle de recommandation en production",
      steps: [
        "Pipeline d'entraînement planifié chaque nuit",
        "Nouveau modèle enregistré avec ses métriques",
        "Déploiement après validation automatique",
        "Monitoring de la dérive des données",
        "Réentraînement déclenché si dérive",
      ],
    },
    projectsDetailed: [
      {
        title: "Pipeline complet train → deploy",
        flow: "Données → Entraînement → Registry → Déploiement → API",
      },
      {
        title: "Monitoring de dérive",
        flow: "Prédictions → Statistiques → Alertes → Réentraînement",
      },
    ],
  },

  // ------------------------------------------------------------------ ai-safety
  "ai-safety": {
    learning: () => import("./learning-ai-safety").then((m) => m.LEARNING_AI_SAFETY),
    definition:
      "L'évaluation et la fiabilité des systèmes IA consistent à mesurer rigoureusement leurs comportements — performances, biais, hallucinations, vulnérabilités — avant et après déploiement, puis à mettre en place des garde-fous.",
    whyLearn:
      "Un système IA déployé sans évaluation est une boîte noire en production : hallucinations, biais, failles de sécurité (prompt injection). Savoir construire des benchmarks, pratiquer le red-teaming et documenter les risques est devenu une exigence professionnelle et réglementaire.",
    prerequisiteNotes: {
      "llm-systems":
        "Connaître l'architecture des systèmes LLM : c'est sur ces systèmes que portent l'évaluation et les garde-fous.",
      "machine-learning":
        "Les fondamentaux de l'évaluation (métriques, jeux de test, biais) s'appliquent aux systèmes IA.",
    },
    conceptDetails: [
      {
        name: "Benchmarks",
        definition:
          "Des jeux de tests standardisés qui mesurent les capacités d'un modèle sur des tâches de référence, de façon comparable.",
      },
      {
        name: "Red-teaming",
        definition:
          "Attaquer volontairement son propre système (jailbreaks, injections) pour découvrir ses failles avant les utilisateurs malveillants.",
      },
      {
        name: "Guardrails",
        definition:
          "Des contrôles en entrée et sortie (filtrage, validation, limites) qui encadrent le comportement du système en production.",
      },
      {
        name: "Hallucinations",
        definition:
          "Quand le modèle génère des informations fausses avec assurance : les détecter et les réduire (RAG, citations, vérification).",
      },
      {
        name: "Biais & fairness",
        definition:
          "Mesurer les écarts de performance entre groupes et corriger les discriminations héritées des données d'entraînement.",
      },
    ],
    howItWorksTitle: "Le cycle d'évaluation d'un système IA",
    howItWorks: ["SYSTÈME", "TESTS", "MESURES", "FAILLES", "GARDE-FOUS", "SUIVI"],
    example: {
      title: "Évaluer un chatbot de support",
      steps: [
        "Constituer un jeu de questions pièges",
        "Mesurer le taux de bonnes réponses",
        "Tester les tentatives de jailbreak",
        "Ajouter des garde-fous sur les sorties",
        "Suivre les incidents en production",
      ],
    },
    projectsDetailed: [
      {
        title: "Suite d'évaluation d'un chatbot",
        flow: "Cas de test → Exécution → Scores → Rapport → Corrections",
      },
      {
        title: "Rapport de risques d'un système",
        flow: "Cartographie des risques → Tests → Mesures → Recommandations",
      },
    ],
  },
};

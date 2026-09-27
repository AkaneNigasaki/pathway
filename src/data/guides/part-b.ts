import type { SkillGuide } from "../skill-guides";

/**
 * Guides pédagogiques — partie B (IA, infrastructure, data, automation,
 * cybersécurité, robotique).
 *
 * Fusionnés avec SKILL_GUIDES par l’appelant. Mêmes conventions que
 * skill-guides.ts : français, documentation technique premium, concret,
 * sans marketing. Les clés de `prerequisiteNotes` sont les ids exacts des
 * prérequis déclarés dans roadmaps/informatique.ts ; les noms de
 * `conceptDetails` reprennent le tableau `concepts` de chaque skill.
 */
export const GUIDES_B: Record<string, SkillGuide> = {
  // ============================================================ TIER 1 ===
  // ---------------------------------------------------------------- python
  python: {
    definition:
      "Python est un langage de programmation généraliste conçu pour être lisible et simple à écrire. Sa syntaxe claire et son écosystème immense (data, IA, web, automatisation) en font le langage le plus utilisé pour la data science et le machine learning.",
    whyLearn:
      "Python est le dénominateur commun de la data et de l’IA : NumPy, pandas, scikit-learn et PyTorch sont tous construits pour lui. C’est aussi le langage idéal pour automatiser des tâches quotidiennes — on y écrit un script utile en quelques lignes, sans cérémonie.",
    prerequisiteNotes: {
      "culture-info":
        "Savoir ce qu’est un programme, un système d’exploitation et comment du code s’exécute sur une machine.",
    },
    conceptDetails: [
      {
        name: "Syntaxe",
        definition:
          "La grammaire du langage : indentation, mots-clés, blocs. Python se lit presque comme de l’anglais.",
      },
      {
        name: "Types",
        definition:
          "Les structures de données de base : nombres, chaînes, listes, dictionnaires, tuples. Savoir les choisir et les combiner.",
      },
      {
        name: "Fonctions",
        definition:
          "Découper un programme en blocs réutilisables : paramètres, valeurs de retour, portée des variables.",
      },
      {
        name: "Modules",
        definition:
          "Organiser le code en fichiers et réutiliser le travail des autres : la bibliothèque standard, puis les paquets externes.",
      },
      {
        name: "Environnements virtuels",
        definition:
          "Isoler les dépendances de chaque projet pour éviter les conflits de versions entre projets.",
      },
      {
        name: "pip",
        definition:
          "L’installateur de paquets Python : télécharger et gérer les bibliothèques depuis le dépôt PyPI.",
      },
    ],
    howItWorksTitle: "Comment s’exécute un programme Python",
    howItWorks: ["CODE SOURCE", "INTERPRÉTEUR", "BYTECODE", "EXÉCUTION", "RÉSULTAT"],
    example: {
      title: "Analyser un fichier CSV",
      steps: [
        "Fichier CSV",
        "Lecture avec pandas",
        "Nettoyage des données",
        "Statistiques descriptives",
        "Graphique",
        "Décision éclairée",
      ],
    },
    projectsDetailed: [
      {
        title: "Script d’automatisation",
        flow: "Dossier → Script Python → Fichiers renommés et triés",
      },
      {
        title: "Analyse d’un CSV",
        flow: "CSV brut → pandas → Nettoyage → Graphiques → Rapport",
      },
      {
        title: "Mini API ou bot",
        flow: "Requête → Python → API externe → Réponse formatée",
      },
    ],
  },
  // ------------------------------------------------------- machine-learning
  "machine-learning": {
    illustration: "ml",
    definition:
      "Le machine learning est la branche de l’intelligence artificielle où l’on entraîne des modèles à partir de données, au lieu de coder les règles à la main. Le modèle détecte des motifs dans les exemples qu’on lui montre, puis généralise à des cas inédits.",
    whyLearn:
      "Le ML est derrière les recommandations de contenu, la détection de fraude, la prédiction de pannes et la plupart des produits dits « intelligents ». Comprendre le ML, c’est comprendre comment des données brutes deviennent des décisions automatiques — la compétence centrale de la data et de l’IA.",
    prerequisiteNotes: {
      python:
        "Écrire des scripts propres, manipuler des tableaux et des DataFrames avec NumPy et pandas.",
      statistics:
        "Lire une distribution, comprendre la corrélation, éviter les biais d’échantillonnage.",
    },
    conceptDetails: [
      {
        name: "Supervisé/non-supervisé",
        definition:
          "En supervisé, le modèle apprend sur des exemples étiquetés ; en non-supervisé, il découvre seul des structures dans les données.",
      },
      {
        name: "Régression",
        definition:
          "Prédire une valeur continue (un prix, une température) à partir de variables d’entrée.",
      },
      {
        name: "Classification",
        definition:
          "Attribuer chaque exemple à une catégorie : spam ou non, malade ou sain, client à risque ou non.",
      },
      {
        name: "Overfitting",
        definition:
          "Quand un modèle apprend le bruit de ses données d’entraînement au lieu du motif général : il échoue alors sur de nouveaux cas.",
      },
      {
        name: "Validation",
        definition:
          "Mesurer la performance sur des données jamais vues pendant l’entraînement, pour estimer le comportement réel du modèle.",
      },
      {
        name: "Features",
        definition:
          "Les variables d’entrée choisies ou construites pour décrire chaque exemple : leur qualité décide souvent du résultat final.",
      },
    ],
    howItWorksTitle: "Comment s’entraîne un modèle",
    howItWorks: [
      "DONNÉES",
      "PRÉTRAITEMENT",
      "ENTRAÎNEMENT",
      "MODÈLE",
      "ÉVALUATION",
      "PRÉDICTION",
    ],
    example: {
      title: "Prédire des prix immobiliers",
      steps: [
        "Dataset de ventes",
        "Features : surface, quartier",
        "Entraînement du modèle",
        "Évaluation de l’erreur",
        "Prédiction sur un bien",
        "Prix estimé",
      ],
    },
    projectsDetailed: [
      {
        title: "Prédire des prix immobiliers",
        flow: "Dataset → Features → Régression → Évaluation → Prédictions",
      },
      {
        title: "Classifier des avis clients",
        flow: "Avis texte → Vectorisation → Classification → Score de sentiment",
      },
      {
        title: "Segmenter une clientèle",
        flow: "Données clients → Clustering → Segments → Actions marketing",
      },
    ],
  },
  // ---------------------------------------------------------- deep-learning
  "deep-learning": {
    definition:
      "Le deep learning est la sous-branche du machine learning qui utilise des réseaux de neurones à plusieurs couches. Ces architectures apprennent elles-mêmes les représentations utiles — contours dans une image, motifs dans du texte — sans features conçues à la main.",
    whyLearn:
      "Le deep learning est le moteur de la vision par ordinateur, de la reconnaissance vocale et des modèles de langage modernes. Il a rendu possible tout ce que le ML classique ne savait pas faire sur des données brutes comme les images, le son ou le texte.",
    prerequisiteNotes: {
      "machine-learning":
        "Maîtriser le cycle entraînement/validation, l’overfitting et l’évaluation d’un modèle.",
    },
    conceptDetails: [
      {
        name: "Neurones",
        definition:
          "L’unité de calcul de base : une somme pondérée de ses entrées, transformée par une fonction d’activation non linéaire.",
      },
      {
        name: "Backprop",
        definition:
          "La rétropropagation : calculer comment ajuster chaque poids du réseau pour réduire l’erreur, en propageant le gradient vers l’arrière.",
      },
      {
        name: "CNN",
        definition:
          "Les réseaux convolutifs, conçus pour les images : ils détectent des motifs locaux (contours, textures) puis les combinent en objets.",
      },
      {
        name: "RNN",
        definition:
          "Les réseaux récurrents, conçus pour les séquences : chaque étape tient compte des précédentes, utile pour le texte et les séries temporelles.",
      },
      {
        name: "Régularisation",
        definition:
          "L’ensemble des techniques (dropout, pénalités, augmentation de données) qui empêchent le réseau de mémoriser ses données d’entraînement.",
      },
      {
        name: "Optimiseurs",
        definition:
          "Les algorithmes (SGD, Adam) qui ajustent les poids du réseau pas à pas pour minimiser l’erreur.",
      },
    ],
    howItWorksTitle: "Comment apprend un réseau de neurones",
    howItWorks: [
      "ENTRÉE",
      "PROPAGATION",
      "PRÉDICTION",
      "ERREUR",
      "RÉTROPROPAGATION",
      "AJUSTEMENT",
    ],
    example: {
      title: "Classifier des images",
      steps: [
        "Image d’entrée",
        "Couches convolutives",
        "Extraction de motifs",
        "Couches denses",
        "Probabilités par classe",
        "Label prédit",
      ],
    },
    projectsDetailed: [
      {
        title: "Classifieur d’images CNN",
        flow: "Dataset d’images → CNN → Entraînement → Évaluation → Prédictions",
      },
      {
        title: "Générateur de texte RNN",
        flow: "Corpus texte → Séquences → RNN → Échantillonnage → Texte généré",
      },
      {
        title: "Transfer learning",
        flow: "Modèle pré-entraîné → Fine-tuning → Dataset métier → Modèle spécialisé",
      },
    ],
  },
  // ------------------------------------------------------------------ llms
  llms: {
    definition:
      "Les LLMs (grands modèles de langage) sont des réseaux de neurones entraînés sur d’immenses corpus de texte. Ils prédisent la suite la plus probable d’un texte, ce qui leur permet de répondre, résumer, traduire et coder à partir d’instructions en langage naturel.",
    whyLearn:
      "Les LLMs ont changé la façon de construire des produits : assistants, recherche, automatisation documentaire. Les utiliser intelligemment exige de comprendre le prompting, les hallucinations, les coûts et les limites — pas seulement d’appeler une API.",
    prerequisiteNotes: {
      transformers:
        "Comprendre l’architecture attention/tokens et le principe du pré-entraînement.",
    },
    conceptDetails: [
      {
        name: "Prompting",
        definition:
          "L’art de formuler des instructions claires au modèle : contexte, exemples, contraintes de format.",
      },
      {
        name: "Fenêtre de contexte",
        definition:
          "La quantité de texte que le modèle peut prendre en compte d’un coup : sa mémoire de travail, limitée et coûteuse.",
      },
      {
        name: "Hallucinations",
        definition:
          "Quand le modèle invente des faits avec assurance : une conséquence directe de son fonctionnement probabiliste, pas un bug ponctuel.",
      },
      {
        name: "Évaluation",
        definition:
          "Mesurer la qualité des réponses sur des cas de test représentatifs, plutôt que de se fier à quelques exemples.",
      },
      {
        name: "APIs",
        definition:
          "Utiliser un LLM via une API : authentification, paramètres (température, tokens), gestion des coûts et des quotas.",
      },
      {
        name: "Open vs closed",
        definition:
          "Les modèles propriétaires (API fermée) contre les modèles ouverts (poids téléchargeables, auto-hébergement possible) : des compromis coût, contrôle et confidentialité.",
      },
    ],
    howItWorksTitle: "Comment un LLM génère une réponse",
    howItWorks: [
      "PROMPT",
      "TOKENISATION",
      "PRÉDICTION",
      "ÉCHANTILLONNAGE",
      "TEXTE",
      "RÉPONSE",
    ],
    example: {
      title: "Assistant de support client",
      steps: [
        "Question client",
        "Prompt + contexte",
        "Appel API LLM",
        "Réponse générée",
        "Vérification",
        "Réponse envoyée",
      ],
    },
    projectsDetailed: [
      {
        title: "Assistant avec API LLM",
        flow: "Interface → Prompt → API → Réponse → Affichage",
      },
      {
        title: "Benchmark de prompts",
        flow: "Jeu de test → Variantes de prompts → Scores → Meilleur prompt",
      },
      {
        title: "Résumeur de documents",
        flow: "Document → Découpage → LLM → Synthèse → Rapport",
      },
    ],
  },
  // ---------------------------------------------------------------- docker
  docker: {
    definition:
      "Docker est une plateforme de conteneurisation : elle empaquette une application et toutes ses dépendances (bibliothèques, runtime, configuration) dans un conteneur isolé et portable. Le conteneur s’exécute de façon identique sur n’importe quelle machine équipée de Docker.",
    whyLearn:
      "Docker a résolu le « ça marche sur ma machine » : l’environnement de développement devient identique à la production. C’est devenu le format standard pour construire, livrer et déployer des applications — un prérequis pour Kubernetes, le MLOps et la plupart des pipelines CI/CD.",
    prerequisiteNotes: {
      linux:
        "Naviguer en ligne de commande, comprendre les processus, les fichiers et les permissions.",
    },
    conceptDetails: [
      {
        name: "Images",
        definition:
          "Un modèle immuable et versionné qui décrit tout ce qu’il faut pour exécuter une application : code, runtime, dépendances.",
      },
      {
        name: "Containers",
        definition:
          "Une instance en cours d’exécution d’une image : isolée, éphémère, démarrable en quelques secondes.",
      },
      {
        name: "Dockerfile",
        definition:
          "Le fichier texte qui décrit comment construire une image, instruction par instruction.",
      },
      {
        name: "Volumes",
        definition:
          "Le mécanisme qui persiste les données hors du cycle de vie du conteneur : sans volume, tout disparaît à l’arrêt.",
      },
      {
        name: "Compose",
        definition:
          "L’outil qui décrit et démarre une application multi-conteneurs (app, base, cache) avec un seul fichier YAML.",
      },
      {
        name: "Registries",
        definition:
          "Les dépôts où sont stockées et versionnées les images (Docker Hub, GHCR) : le point de passage vers le déploiement.",
      },
    ],
    howItWorksTitle: "Du code au conteneur en production",
    howItWorks: ["DOCKERFILE", "BUILD", "IMAGE", "REGISTRY", "PULL", "CONTAINER"],
    example: {
      title: "Dockeriser une application web",
      steps: [
        "Code source",
        "Dockerfile",
        "Build de l’image",
        "Test local",
        "Push vers le registry",
        "Déploiement",
      ],
    },
    projectsDetailed: [
      {
        title: "Dockeriser une app full-stack",
        flow: "App + Base → Dockerfiles → Compose → Stack locale",
      },
      {
        title: "Stack complète avec Compose",
        flow: "API → PostgreSQL → Redis → Nginx → Déploiement reproductible",
      },
      {
        title: "Pipeline de build",
        flow: "Commit → Build image → Scan → Push registry → Déploiement",
      },
    ],
  },
  // ------------------------------------------------------------------ cicd
  cicd: {
    illustration: "devops",
    definition:
      "Le CI/CD (intégration continue / déploiement continu) est l’automatisation du cycle de vie du code : à chaque commit, le code est testé, construit puis déployé automatiquement. L’objectif : livrer des changements petits, fréquents et fiables.",
    whyLearn:
      "Le CI/CD supprime les déploiements manuels, stressants et sources d’erreurs. C’est la colonne vertébrale du DevOps : sans pipeline automatisé, pas de livraison rapide ni de qualité logicielle durable en équipe.",
    prerequisiteNotes: {
      git: "Versionner son code, comprendre les branches et les pull requests — le déclencheur de tout pipeline.",
    },
    conceptDetails: [
      {
        name: "Pipelines",
        definition:
          "La séquence automatisée d’étapes (test, build, déploiement) exécutée à chaque changement de code.",
      },
      {
        name: "Tests auto",
        definition:
          "Les tests unitaires et d’intégration qui valident chaque commit : le filet de sécurité du pipeline.",
      },
      {
        name: "Artifacts",
        definition:
          "Les livrables produits par le build (image Docker, archive) : ce qui est testé est exactement ce qui est déployé.",
      },
      {
        name: "Environnements",
        definition:
          "Les cibles de déploiement (dev, staging, prod) : promouvoir le même artifact d’un environnement à l’autre.",
      },
      {
        name: "Rollback",
        definition:
          "La capacité à revenir instantanément à la version précédente quand un déploiement échoue.",
      },
      {
        name: "Stratégies de déploiement",
        definition:
          "Les techniques de mise en production sans coupure : blue/green, canary, rolling.",
      },
    ],
    howItWorksTitle: "Le cycle CI/CD",
    howItWorks: ["COMMIT", "TEST", "BUILD", "ARTIFACT", "DÉPLOIEMENT", "MONITORING"],
    example: {
      title: "Pipeline d’une application web",
      steps: [
        "Push sur main",
        "Lint + tests",
        "Build de l’image",
        "Déploiement staging",
        "Tests de fumée",
        "Mise en production",
      ],
    },
    projectsDetailed: [
      {
        title: "Pipeline complet d’un projet",
        flow: "Repo → Tests auto → Build → Déploiement → Monitoring",
      },
      {
        title: "Déploiement blue/green",
        flow: "Version verte → Tests → Bascule du trafic → Rollback si besoin",
      },
      {
        title: "Release automatisée",
        flow: "Tag → Changelog → Artifact → Déploiement → Notification",
      },
    ],
  },
  // ------------------------------------------------------------ kubernetes
  kubernetes: {
    definition:
      "Kubernetes est une plateforme d’orchestration de conteneurs : elle déploie, met à l’échelle et supervise automatiquement des centaines de conteneurs répartis sur plusieurs machines. Si un conteneur tombe, Kubernetes le remplace ; si la charge augmente, il en ajoute.",
    whyLearn:
      "Kubernetes est devenu le standard pour faire tourner des applications en production à grande échelle. Il concentre les concepts clés de l’infra moderne — déclaratif, auto-réparation, scaling — et conditionne l’accès aux métiers DevOps, SRE et platform engineering.",
    prerequisiteNotes: {
      docker:
        "Construire des images, comprendre conteneurs, volumes et réseaux : Kubernetes orchestre ce que Docker empaquette.",
      networking:
        "Comprendre DNS, ports et routage : la communication entre services est au cœur de Kubernetes.",
    },
    conceptDetails: [
      {
        name: "Pods",
        definition:
          "La plus petite unité déployable : un ou plusieurs conteneurs qui partagent réseau et stockage.",
      },
      {
        name: "Deployments",
        definition:
          "La ressource qui déclare l’état désiré d’une application (image, réplicas) et gère les mises à jour sans coupure.",
      },
      {
        name: "Services",
        definition:
          "L’adresse stable qui expose un ensemble de pods : le point d’entrée pour communiquer avec une application.",
      },
      {
        name: "Ingress",
        definition:
          "Le routeur HTTP(S) qui expose les services vers l’extérieur, avec TLS et règles de routage.",
      },
      {
        name: "ConfigMaps",
        definition:
          "Le mécanisme qui injecte la configuration (variables, fichiers) dans les pods sans reconstruire les images.",
      },
      {
        name: "Helm",
        definition:
          "Le gestionnaire de paquets de Kubernetes : des applications packagées en charts versionnés et paramétrables.",
      },
    ],
    howItWorksTitle: "Comment Kubernetes maintient une application en vie",
    howItWorks: [
      "ÉTAT DÉSIRÉ",
      "SCHEDULING",
      "PODS",
      "SURVEILLANCE",
      "AUTO-RÉPARATION",
      "SCALING",
    ],
    example: {
      title: "Déployer une API",
      steps: [
        "Image Docker",
        "Deployment YAML",
        "Service interne",
        "Ingress TLS",
        "Montée en charge",
        "Application disponible",
      ],
    },
    projectsDetailed: [
      {
        title: "Cluster local avec kind",
        flow: "kind → Cluster local → kubectl → Premiers déploiements",
      },
      {
        title: "Déployer une app avec ingress TLS",
        flow: "App → Deployment → Service → Ingress → HTTPS public",
      },
      {
        title: "Stack complète sur K8s",
        flow: "API + Base + Cache → Helm → Monitoring → Autoscaling",
      },
    ],
  },
  // -------------------------------------------------------------- terraform
  terraform: {
    definition:
      "Terraform est un outil d’infrastructure as code : on décrit l’infrastructure (serveurs, réseaux, bases, DNS) dans des fichiers de configuration versionnés, et Terraform crée, modifie ou détruit les ressources pour correspondre à cette description.",
    whyLearn:
      "Terraform rend l’infrastructure reproductible, auditable et automatisable : plus de serveurs configurés à la main et impossibles à reproduire. C’est le standard multi-cloud de l’IaC, et la base du platform engineering.",
    prerequisiteNotes: {
      linux:
        "Administrer un système, comprendre SSH, processus et fichiers : ce que Terraform provisionne.",
      networking:
        "Comprendre VPC, sous-réseaux, DNS et pare-feu : l’essentiel de ce qu’on décrit en IaC.",
    },
    conceptDetails: [
      {
        name: "HCL",
        definition:
          "Le langage de configuration de Terraform : déclaratif, lisible, conçu pour décrire des ressources.",
      },
      {
        name: "Providers",
        definition:
          "Les plugins qui connectent Terraform à chaque plateforme (AWS, Azure, GCP) : un même langage, plusieurs clouds.",
      },
      {
        name: "State",
        definition:
          "Le fichier qui mémorise l’état réel de l’infrastructure : c’est lui qui permet à Terraform de calculer les différences.",
      },
      {
        name: "Modules",
        definition:
          "Des blocs de configuration réutilisables : factoriser une architecture pour la déployer à l’identique partout.",
      },
      {
        name: "Plans",
        definition:
          "La prévisualisation des changements avant application : revoir exactement ce qui va être créé, modifié ou détruit.",
      },
      {
        name: "Workspaces",
        definition:
          "Des environnements isolés (dev, staging, prod) partageant la même configuration.",
      },
    ],
    howItWorksTitle: "Le cycle de Terraform",
    howItWorks: ["CONFIGURATION", "PLAN", "REVIEW", "APPLY", "STATE", "INFRASTRUCTURE"],
    example: {
      title: "Infrastructure AWS complète",
      steps: [
        "Fichiers HCL",
        "terraform plan",
        "Vérification des changements",
        "terraform apply",
        "VPC + EC2 + RDS",
        "Infra versionnée",
      ],
    },
    projectsDetailed: [
      {
        title: "Infra AWS complète en code",
        flow: "HCL → Plan → Apply → VPC + Serveurs + Base → Documentation vivante",
      },
      {
        title: "Module réutilisable",
        flow: "Module réseau → Variables → Multi-environnements → Registry interne",
      },
      {
        title: "IaC en CI/CD",
        flow: "Pull request → Plan auto → Review → Apply → Drift detection",
      },
    ],
  },
  // ---------------------------------------------------------- cybersecurity
  cybersecurity: {
    illustration: "cybersecurity",
    definition:
      "La cybersécurité est la discipline qui protège les systèmes d’information contre les accès non autorisés, les altérations et les interruptions. Elle combine technique (chiffrement, pare-feu, détection), processus (audits, réponse aux incidents) et facteur humain.",
    whyLearn:
      "Chaque application connectée est une cible potentielle : la sécurité n’est plus une option mais une condition de la confiance numérique. Comprendre la cybersécurité, c’est apprendre à penser comme un attaquant pour construire des systèmes résilients — une compétence recherchée dans tous les secteurs.",
    prerequisiteNotes: {
      networks:
        "Comprendre TCP/IP, DNS et le routage : les attaques et les défenses se jouent sur le réseau.",
      linux:
        "Administrer un système, lire des logs, gérer les permissions : le terrain de jeu de la sécurité.",
      cryptography:
        "Chiffrement, hachage, certificats : les briques de la confidentialité et de l’authentification.",
    },
    conceptDetails: [
      {
        name: "Menaces",
        definition:
          "Les acteurs et techniques d’attaque : malwares, phishing, ransomwares, exploitation de vulnérabilités.",
      },
      {
        name: "Défense en profondeur",
        definition:
          "Le principe de multiplier les couches de protection : si l’une cède, les autres tiennent.",
      },
      {
        name: "Blue/Red team",
        definition:
          "L’équipe bleue défend et détecte, l’équipe rouge attaque pour tester : deux métiers complémentaires.",
      },
      {
        name: "Forensique",
        definition:
          "L’analyse après incident : reconstituer ce qui s’est passé à partir des traces numériques.",
      },
      {
        name: "Veille",
        definition:
          "Suivre les vulnérabilités et les menaces en continu : la sécurité est une course permanente.",
      },
      {
        name: "Conformité",
        definition:
          "Les cadres légaux et normatifs (RGPD, ISO 27001) qui imposent des exigences de sécurité aux organisations.",
      },
    ],
    howItWorksTitle: "Le cycle de la sécurité",
    howItWorks: [
      "PRÉVENTION",
      "DÉTECTION",
      "RÉPONSE",
      "RÉCUPÉRATION",
      "ANALYSE",
      "AMÉLIORATION",
    ],
    example: {
      title: "Protéger une application web",
      steps: [
        "Inventaire des actifs",
        "Analyse des risques",
        "Durcissement",
        "Monitoring",
        "Test d’intrusion",
        "Amélioration continue",
      ],
    },
    projectsDetailed: [
      {
        title: "Lab de sécurité maison",
        flow: "VMs → Réseau isolé → Outils d’attaque → Cibles vulnérables → Entraînement",
      },
      {
        title: "Rapport d’analyse de menace",
        flow: "Collecte → Analyse → IOCs → Recommandations → Rapport",
      },
      {
        title: "Audit d’une application",
        flow: "Reconnaissance → Tests → Vulnérabilités → Correctifs → Re-test",
      },
    ],
  },
  // --------------------------------------------------------- authentication
  authentication: {
    definition:
      "L’authentification est le mécanisme qui vérifie l’identité d’un utilisateur ou d’un système avant de lui accorder l’accès. Mots de passe, double facteur, OAuth, passkeys : autant de façons de répondre à la question « qui êtes-vous ? » avec un niveau de confiance adapté.",
    whyLearn:
      "L’authentification est la porte d’entrée de toute application : mal conçue, elle est la première faille exploitée. La maîtriser, c’est savoir concilier sécurité et expérience utilisateur — un enjeu central du développement web moderne.",
    prerequisiteNotes: {
      "web-security":
        "Connaître les attaques classiques (XSS, CSRF, injections) pour ne pas introduire de failles dans le login.",
      cryptography:
        "Comprendre hachage, signatures et TLS : les fondations techniques de l’authentification moderne.",
    },
    conceptDetails: [
      {
        name: "Mots de passe",
        definition:
          "Le facteur le plus répandu et le plus faible : les stocker hachés et salés, jamais en clair, avec des politiques raisonnables.",
      },
      {
        name: "MFA",
        definition:
          "L’authentification multifacteur : combiner deux preuves indépendantes (mot de passe + code) pour bloquer le vol d’identifiants.",
      },
      {
        name: "OAuth/OIDC",
        definition:
          "La délégation d’authentification (« se connecter avec Google ») : un provider tiers vérifie l’identité à votre place.",
      },
      {
        name: "JWT",
        definition:
          "Les jetons auto-porteurs qui transportent l’identité et les droits : pratiques pour les APIs, à manier avec prudence.",
      },
      {
        name: "Sessions",
        definition:
          "Le suivi d’un utilisateur connecté côté serveur : cookies sécurisés, expiration, révocation.",
      },
      {
        name: "Passkeys",
        definition:
          "L’authentification sans mot de passe basée sur la cryptographie asymétrique : la direction prise par l’industrie.",
      },
    ],
    howItWorksTitle: "Comment fonctionne une connexion OAuth",
    howItWorks: ["LOGIN", "REDIRECTION", "CONSENTEMENT", "CODE", "JETON", "ACCÈS"],
    example: {
      title: "Connexion sécurisée",
      steps: [
        "Identifiants",
        "Vérification",
        "Second facteur",
        "Session créée",
        "Cookie sécurisé",
        "Accès autorisé",
      ],
    },
    projectsDetailed: [
      {
        title: "Login sécurisé avec MFA",
        flow: "Formulaire → Hachage → TOTP → Session → Protection CSRF",
      },
      {
        title: "SSO avec un provider OAuth",
        flow: "App → Provider → Consentement → Tokens → Profil utilisateur",
      },
      {
        title: "API avec JWT",
        flow: "Login → JWT signé → Refresh tokens → Révocation → Sécurisation",
      },
    ],
  },
  // -------------------------------------------------------- api-integration
  "api-integration": {
    definition:
      "L’intégration d’APIs est l’art de faire dialoguer des systèmes entre eux : s’authentifier, paginer les résultats, gérer les quotas et les erreurs, garantir l’idempotence. C’est le ciment technique de l’automation et des architectures distribuées.",
    whyLearn:
      "Aucune application moderne ne vit seule : elle paie via Stripe, envoie des emails via un provider, synchronise un CRM. Savoir intégrer des APIs proprement — avec retry, monitoring et gestion d’erreurs — est une compétence quotidienne du développeur backend et de l’automation.",
    prerequisiteNotes: {
      rest: "Maîtriser les ressources, les méthodes HTTP et les codes de statut : le vocabulaire des APIs.",
      webhooks:
        "Comprendre la réception d’événements entrants : l’autre moitié de l’intégration.",
    },
    conceptDetails: [
      {
        name: "OAuth",
        definition:
          "Le standard d’autorisation pour accéder à une API au nom d’un utilisateur, sans jamais voir son mot de passe.",
      },
      {
        name: "Pagination",
        definition:
          "Récupérer de grands volumes de données page par page : curseurs, offsets, et reprise sur panne.",
      },
      {
        name: "Rate limits",
        definition:
          "Les quotas imposés par les APIs : les respecter et les anticiper pour ne pas être bloqué en production.",
      },
      {
        name: "Retry",
        definition:
          "Réessayer intelligemment les appels en échec : backoff exponentiel, idempotence, circuit breaker.",
      },
      {
        name: "Idempotence",
        definition:
          "Garantir qu’une opération répétée n’a pas d’effet de bord supplémentaire : essentiel pour les retries et les webhooks.",
      },
      {
        name: "Monitoring",
        definition:
          "Surveiller la santé des intégrations : latence, taux d’erreur, alertes quand un connecteur casse.",
      },
    ],
    howItWorksTitle: "Le cycle d’une intégration robuste",
    howItWorks: [
      "AUTHENTIFICATION",
      "REQUÊTE",
      "PAGINATION",
      "RETRY",
      "TRANSFORMATION",
      "SYNCHRONISATION",
    ],
    example: {
      title: "Synchroniser un CRM",
      steps: [
        "Webhook entrant",
        "Authentification OAuth",
        "Récupération paginée",
        "Transformation",
        "Écriture idempotente",
        "Monitoring",
      ],
    },
    projectsDetailed: [
      {
        title: "Connecteur pour une API publique",
        flow: "Clé API → Client → Pagination → Cache → CLI utilisable",
      },
      {
        title: "Sync bidirectionnelle entre deux SaaS",
        flow: "Webhooks → File → Transformation → Écriture → Conflits gérés",
      },
      {
        title: "Supervision d’intégrations",
        flow: "Connecteurs → Métriques → Alertes → Dashboard → Runbook",
      },
    ],
  },
  // ------------------------------------------------------------ data-science
  "data-science": {
    definition:
      "La data science est la discipline qui transforme des données brutes en décisions : explorer, nettoyer, modéliser avec des statistiques et du machine learning, puis communiquer les résultats de façon actionnable.",
    whyLearn:
      "Les organisations prennent de plus en plus de décisions à partir de données : pricing, marketing, produit, risque. La data science combine analyse, modélisation et communication — un profil complet, à l’interface du business et de la technique.",
    prerequisiteNotes: {
      python:
        "Manipuler des données avec pandas et NumPy : l’outillage quotidien du data scientist.",
      statistics:
        "Interpréter correctement des résultats : distributions, tests, biais — sans quoi les conclusions sont fausses.",
      sql: "Extraire les données des bases : la première étape de toute analyse.",
    },
    conceptDetails: [
      {
        name: "Exploration",
        definition:
          "L’analyse exploratoire : comprendre la forme, la qualité et les limites d’un dataset avant toute modélisation.",
      },
      {
        name: "Modélisation",
        definition:
          "Choisir et entraîner un modèle adapté au problème : régression, classification, clustering.",
      },
      {
        name: "Visualisation",
        definition:
          "Rendre les données lisibles : des graphiques justes, qui montrent sans tromper.",
      },
      {
        name: "Storytelling",
        definition:
          "Raconter ce que disent les données : une analyse n’a de valeur que si elle est comprise et suivie d’effet.",
      },
      {
        name: "A/B testing",
        definition:
          "Comparer deux versions d’un produit de façon rigoureuse : le standard de la décision produit.",
      },
      {
        name: "Déploiement",
        definition:
          "Mettre un modèle en production : API, monitoring, réentraînement — là où la valeur se réalise.",
      },
    ],
    howItWorksTitle: "Le cycle d’un projet data science",
    howItWorks: [
      "QUESTION",
      "DONNÉES",
      "EXPLORATION",
      "MODÉLISATION",
      "COMMUNICATION",
      "DÉCISION",
    ],
    example: {
      title: "Analyser le churn clients",
      steps: [
        "Données d’usage",
        "Nettoyage",
        "Features",
        "Modèle de churn",
        "Segments à risque",
        "Actions de rétention",
      ],
    },
    projectsDetailed: [
      {
        title: "Étude complète d’un dataset public",
        flow: "Dataset Kaggle → EDA → Visualisations → Conclusions → Notebook publié",
      },
      {
        title: "Dashboard décisionnel",
        flow: "SQL → Métriques → Dashboard → KPIs → Présentation métier",
      },
      {
        title: "Modèle prédictif déployé",
        flow: "Modèle → API → Monitoring → Réentraînement → Valeur mesurée",
      },
    ],
  },
  // ============================================================ TIER 2 ===
  // ----------------------------------------------------------------- numpy
  numpy: {
    definition:
      "NumPy est la bibliothèque de calcul numérique de Python : elle apporte les tableaux n-dimensionnels et des opérations mathématiques rapides, exécutées en C sous le capot.",
    whyLearn:
      "NumPy est la fondation de tout le stack scientifique Python : pandas, scikit-learn et PyTorch sont construits dessus. Sans NumPy, le calcul sur de gros volumes de données en Python serait cent fois trop lent.",
    prerequisiteNotes: {
      python:
        "Maîtriser les listes, les boucles et les fonctions : NumPy remplace les boucles par des opérations vectorielles.",
    },
    conceptDetails: [
      {
        name: "ndarray",
        definition:
          "Le tableau n-dimensionnel, homogène et contigu en mémoire : la structure centrale de NumPy.",
      },
      {
        name: "Broadcasting",
        definition:
          "La règle qui permet d’appliquer une opération entre tableaux de formes différentes, sans boucle explicite.",
      },
      {
        name: "Indexation",
        definition:
          "Sélectionner des sous-parties d’un tableau : slicing, indexation booléenne, fancy indexing.",
      },
      {
        name: "Algèbre linéaire",
        definition:
          "Produit matriciel, inversion, valeurs propres : les opérations au cœur du machine learning.",
      },
      {
        name: "Vectorisation",
        definition:
          "Remplacer les boucles Python par des opérations sur tableaux entiers : le gain de performance principal.",
      },
      {
        name: "Performance",
        definition:
          "Comprendre pourquoi le code vectorisé est rapide : mémoire contiguë, boucles en C, parallélisme.",
      },
    ],
  },
  // ---------------------------------------------------------------- pandas
  pandas: {
    definition:
      "Pandas est la bibliothèque Python de manipulation de données tabulaires : elle apporte les DataFrames — des tables avec lignes et colonnes nommées — et des outils pour les nettoyer, transformer et analyser.",
    whyLearn:
      "Les données réelles sont sales : valeurs manquantes, doublons, formats incohérents. Pandas est l’outil quotidien pour les nettoyer, les transformer et les agréger avant toute analyse ou modélisation.",
    prerequisiteNotes: {
      python:
        "Être à l’aise avec les fonctions, les compréhensions de listes et les dictionnaires.",
    },
    conceptDetails: [
      {
        name: "DataFrames",
        definition:
          "La table de données : colonnes nommées et typées, index, sélection et filtrage expressifs.",
      },
      {
        name: "Nettoyage",
        definition:
          "Gérer les valeurs manquantes, les doublons, les types incorrects : 80 % du travail réel sur les données.",
      },
      {
        name: "GroupBy",
        definition:
          "Regrouper les lignes par catégorie puis agréger : la réponse à « combien par segment ? ».",
      },
      {
        name: "Jointures",
        definition:
          "Combiner plusieurs tables sur des clés communes : merge, concat — les équivalents des JOIN SQL.",
      },
      {
        name: "Time series",
        definition:
          "Manipuler des données temporelles : rééchantillonnage, fenêtres glissantes, décalages.",
      },
      {
        name: "IO",
        definition:
          "Lire et écrire CSV, Excel, Parquet, SQL : pandas est la porte d’entrée de presque tous les datasets.",
      },
    ],
  },
  // ------------------------------------------------------------- statistics
  statistics: {
    definition:
      "Les statistiques sont l’ensemble des méthodes pour collecter, décrire et interpréter des données : distributions, probabilités, tests d’hypothèses. Elles permettent de distinguer un vrai signal du bruit.",
    whyLearn:
      "Sans statistiques, on tire des conclusions fausses de données vraies : corrélation confondue avec causalité, échantillon biaisé, test mal interprété. C’est le socle théorique du machine learning et de toute décision data.",
    prerequisiteNotes: {
      "culture-info":
        "Savoir ce qu’est une donnée et un programme : les statistiques donnent les outils pour les interpréter.",
    },
    conceptDetails: [
      {
        name: "Distributions",
        definition:
          "La forme des données : normale, asymétrique, uniforme. La moyenne ne dit rien sans la distribution.",
      },
      {
        name: "Probabilités",
        definition:
          "Quantifier l’incertitude : la base du raisonnement sur des données incomplètes ou bruitées.",
      },
      {
        name: "Corrélation",
        definition:
          "Mesurer le lien entre deux variables — sans oublier que corrélation n’est pas causalité.",
      },
      {
        name: "Tests",
        definition:
          "Les tests d’hypothèses (t-test, chi²) : décider rigoureusement si un effet observé est significatif.",
      },
      {
        name: "Biais",
        definition:
          "Les biais de sélection, de survie, de confirmation : ce qui fausse silencieusement les analyses.",
      },
      {
        name: "Échantillonnage",
        definition:
          "Tirer un échantillon représentatif d’une population : la condition de toute généralisation.",
      },
    ],
  },
  // ----------------------------------------------------------- scikit-learn
  "scikit-learn": {
    definition:
      "Scikit-learn est la bibliothèque Python de référence pour le machine learning classique : régression, classification, clustering, avec une API uniforme et une documentation exemplaire.",
    whyLearn:
      "Pour la majorité des problèmes tabulaires, un modèle scikit-learn bien réglé bat des approches plus complexes — plus vite et avec moins de données. C’est l’outil de production du ML traditionnel et le meilleur terrain d’apprentissage des fondamentaux.",
    prerequisiteNotes: {
      "machine-learning":
        "Comprendre entraînement/validation, overfitting et le choix d’un modèle selon le problème.",
    },
    conceptDetails: [
      {
        name: "Estimators",
        definition:
          "L’interface uniforme fit/predict : tous les modèles s’utilisent de la même façon.",
      },
      {
        name: "Pipelines",
        definition:
          "Enchaîner prétraitement et modèle en un seul objet : éviter les fuites de données et industrialiser.",
      },
      {
        name: "Cross-validation",
        definition:
          "Évaluer un modèle sur plusieurs découpages des données : une estimation robuste de la performance réelle.",
      },
      {
        name: "Grid search",
        definition:
          "Explorer systématiquement les hyperparamètres pour trouver la meilleure configuration.",
      },
      {
        name: "Métriques",
        definition:
          "Choisir la bonne mesure : précision, rappel, F1, ROC-AUC — selon le coût des erreurs.",
      },
      {
        name: "Preprocessing",
        definition:
          "Préparer les données : mise à l’échelle, encodage des catégories, imputation — souvent décisif.",
      },
    ],
  },
  // --------------------------------------------------------------- pytorch
  pytorch: {
    definition:
      "PyTorch est le framework de deep learning préféré de la recherche : dynamique, pythonique, il permet de construire et d’entraîner des réseaux de neurones avec une grande flexibilité.",
    whyLearn:
      "PyTorch est au cœur de l’IA générative : la plupart des modèles publiés (LLMs, diffusion) sont entraînés avec lui. Le maîtriser ouvre la recherche, le fine-tuning et la compréhension réelle du deep learning moderne.",
    prerequisiteNotes: {
      "machine-learning": "Maîtriser les concepts d’entraînement, de loss et d’évaluation.",
      numpy:
        "Manipuler des tableaux multidimensionnels : les tenseurs PyTorch en sont l’extension.",
    },
    conceptDetails: [
      {
        name: "Tenseurs",
        definition:
          "Le tableau multidimensionnel de PyTorch, optimisé pour le calcul sur GPU.",
      },
      {
        name: "Autograd",
        definition:
          "La différentiation automatique : PyTorch calcule les gradients tout seul, c’est ce qui rend l’entraînement possible.",
      },
      {
        name: "Modules",
        definition:
          "Les briques nn.Module : composer des couches pour construire n’importe quelle architecture.",
      },
      {
        name: "DataLoaders",
        definition:
          "Charger les données par lots, en parallèle : l’alimentation efficace de l’entraînement.",
      },
      {
        name: "GPU",
        definition:
          "Exploiter les cartes graphiques pour accélérer l’entraînement d’un facteur 10 à 100.",
      },
      {
        name: "Checkpoints",
        definition:
          "Sauvegarder et reprendre l’entraînement : indispensable pour les runs longs.",
      },
    ],
  },
  // ----------------------------------------------------------- transformers
  transformers: {
    definition:
      "Les Transformers sont l’architecture de réseaux de neurones introduite en 2017 (« Attention Is All You Need »), basée sur le mécanisme d’attention. Elle est derrière les LLMs, la traduction moderne et une grande partie de l’IA générative.",
    whyLearn:
      "Comprendre les Transformers, c’est comprendre comment fonctionnent les grands modèles de langage : tokens, attention, pré-entraînement. C’est le prérequis pour utiliser, adapter et évaluer ces modèles en produit.",
    prerequisiteNotes: {
      "deep-learning":
        "Comprendre l’entraînement d’un réseau de neurones : loss, gradients, régularisation.",
    },
    conceptDetails: [
      {
        name: "Attention",
        definition:
          "Le mécanisme qui permet au modèle de pondérer l’importance de chaque mot par rapport aux autres : le cœur de l’architecture.",
      },
      {
        name: "Tokens",
        definition:
          "Les morceaux de texte (mots ou sous-mots) que le modèle manipule réellement : l’unité de base du traitement.",
      },
      {
        name: "Pré-entraînement",
        definition:
          "L’apprentissage initial sur d’immenses corpus : le modèle y acquiert la langue avant toute tâche spécifique.",
      },
      {
        name: "Fine-tuning",
        definition:
          "Réentraîner légèrement un modèle pré-entraîné sur des données métier : l’adapter à un usage précis.",
      },
      {
        name: "Hugging Face",
        definition:
          "La plateforme (hub de modèles, bibliothèque transformers) devenue le standard pour partager et utiliser ces modèles.",
      },
      {
        name: "Inférence",
        definition:
          "Faire générer du texte à un modèle entraîné : gestion de la mémoire, de la latence et des coûts.",
      },
    ],
  },
  // ------------------------------------------------------------------- rag
  rag: {
    definition:
      "Le RAG (Retrieval-Augmented Generation) combine recherche d’information et génération : avant de répondre, le LLM récupère les passages pertinents dans vos documents, puis formule sa réponse à partir de ces sources.",
    whyLearn:
      "Le RAG est la technique standard pour brancher un LLM sur des données privées (documentation, tickets, contrats) sans réentraînement coûteux. Il réduit les hallucinations en ancrant les réponses dans des sources réelles — la base des assistants d’entreprise.",
    prerequisiteNotes: {
      llms: "Comprendre prompting, fenêtre de contexte et hallucinations.",
      databases:
        "Savoir stocker et interroger des données : les bases vectorielles en sont une extension.",
    },
    conceptDetails: [
      {
        name: "Embeddings",
        definition:
          "La représentation vectorielle du sens d’un texte : deux passages proches en sens ont des vecteurs proches.",
      },
      {
        name: "Bases vectorielles",
        definition:
          "Les bases de données optimisées pour la recherche par similarité vectorielle (Pinecone, pgvector, Qdrant).",
      },
      {
        name: "Chunking",
        definition:
          "Découper les documents en morceaux de taille adaptée : trop gros, le bruit ; trop petits, le contexte manque.",
      },
      {
        name: "Recherche",
        definition:
          "Retrouver les passages pertinents pour une question : recherche sémantique, hybride, re-ranking.",
      },
      {
        name: "Évaluation",
        definition:
          "Mesurer la qualité des réponses : pertinence des passages, fidélité aux sources, taux de hallucination.",
      },
      {
        name: "Pipelines",
        definition:
          "Assembler ingestion, indexation, recherche et génération en un système maintenable et observable.",
      },
    ],
  },
  // -------------------------------------------------------- computer-vision
  "computer-vision": {
    definition:
      "La computer vision apprend aux machines à interpréter les images et les vidéos : classifier, détecter des objets, segmenter des scènes. Des caméras de sécurité aux voitures autonomes, c’est l’IA qui voit.",
    whyLearn:
      "La vision est le sens le plus riche en données : contrôle qualité industriel, imagerie médicale, robotique, surveillance. C’est aussi le domaine historique du deep learning, avec des techniques (CNN, transfer learning) transférables ailleurs.",
    prerequisiteNotes: {
      "deep-learning":
        "Maîtriser l’entraînement des réseaux de neurones, la régularisation et l’évaluation.",
    },
    conceptDetails: [
      {
        name: "CNN",
        definition:
          "Les réseaux convolutifs : l’architecture de référence pour extraire des motifs visuels hiérarchiques.",
      },
      {
        name: "Détection",
        definition:
          "Localiser et classifier les objets dans une image : boîtes englobantes (YOLO, Faster R-CNN).",
      },
      {
        name: "Segmentation",
        definition:
          "Classifier chaque pixel : découper précisément les objets dans l’image.",
      },
      {
        name: "Transfer learning",
        definition:
          "Réutiliser un modèle entraîné sur des millions d’images et l’adapter à son propre dataset, souvent petit.",
      },
      {
        name: "Datasets",
        definition:
          "Constituer et annoter des jeux d’images : la qualité des labels décide de la qualité du modèle.",
      },
      {
        name: "Temps réel",
        definition:
          "Optimiser pour la latence : modèles légers, quantization, déploiement edge pour la vidéo en direct.",
      },
    ],
  },
  // ------------------------------------------------------------------- nlp
  nlp: {
    definition:
      "Le NLP (traitement du langage naturel) apprend aux machines à comprendre et produire du texte : classification, extraction d’entités, résumé, traduction. Avec les Transformers, il a fusionné avec l’ère des LLMs.",
    whyLearn:
      "Le texte est partout : avis clients, tickets, documents, emails. Le NLP transforme cette masse non structurée en information exploitable — analyse de sentiments, routage automatique, recherche sémantique.",
    prerequisiteNotes: {
      transformers:
        "Comprendre tokens, attention et fine-tuning : les fondations du NLP moderne.",
    },
    conceptDetails: [
      {
        name: "Tokenisation",
        definition:
          "Découper le texte en unités traitables par le modèle : une étape qui influence tout le reste.",
      },
      {
        name: "Embeddings",
        definition:
          "Représenter les mots par des vecteurs qui capturent leur sens : la matière première du NLP.",
      },
      {
        name: "Classification",
        definition:
          "Attribuer un texte à des catégories : sentiment, intention, sujet.",
      },
      {
        name: "NER",
        definition:
          "La reconnaissance d’entités nommées : extraire personnes, lieux, dates et montants d’un texte.",
      },
      {
        name: "Résumé",
        definition:
          "Condenser un document en conservant l’essentiel : abstractif (généré) ou extractif (extraits).",
      },
      {
        name: "Évaluation",
        definition:
          "Mesurer sur des jeux de test annotés : le NLP se juge sur données réelles, pas sur des exemples choisis.",
      },
    ],
  },
  // ------------------------------------------------------------- networking
  networking: {
    definition:
      "Le networking version praticien : comprendre TCP/IP, DNS et le routage, puis savoir diagnostiquer, configurer et sécuriser un réseau réel.",
    whyLearn:
      "Tout passe par le réseau : quand une application ne répond plus, le problème est réseau une fois sur deux. Indispensable en infrastructure, en DevOps et en cybersécurité — c’est le diagnostic qui fait gagner des heures.",
    prerequisiteNotes: {
      networks:
        "Connaître les bases : modèle OSI, adressage IP, ce qu’est un paquet.",
      linux:
        "Utiliser la ligne de commande : les outils réseau vivent dans le terminal.",
    },
    conceptDetails: [
      {
        name: "TCP/IP",
        definition:
          "La suite de protocoles d’Internet : adressage, routage, fiabilisation des échanges.",
      },
      {
        name: "DNS",
        definition:
          "L’annuaire qui traduit les noms de domaine en adresses IP : le comprendre, c’est diagnostiquer la moitié des pannes.",
      },
      {
        name: "DHCP",
        definition:
          "L’attribution automatique des adresses IP : pratique, mais à comprendre pour dépanner.",
      },
      {
        name: "VLAN",
        definition:
          "Segmenter un réseau physique en réseaux logiques : isoler pour sécuriser.",
      },
      {
        name: "Firewall",
        definition:
          "Filtrer le trafic selon des règles : la première ligne de défense du réseau.",
      },
      {
        name: "Diagnostic",
        definition:
          "La méthode : ping, traceroute, dig, tcpdump — isoler la couche en faute, méthodiquement.",
      },
    ],
  },
  // --------------------------------------------------------- github-actions
  "github-actions": {
    definition:
      "GitHub Actions est le système CI/CD intégré à GitHub : des workflows décrits en YAML qui s’exécutent à chaque push, pull request ou planification, avec un marketplace d’actions réutilisables.",
    whyLearn:
      "C’est le CI/CD le plus accessible : zéro infrastructure à gérer, gratuit pour l’open source, intégré au dépôt. Le standard pour automatiser tests, builds et déploiements des projets hébergés sur GitHub.",
    prerequisiteNotes: {
      cicd: "Comprendre ce qu’est un pipeline : test, build, déploiement, artifacts.",
      github:
        "Maîtriser les dépôts, branches et pull requests : les événements qui déclenchent les workflows.",
    },
    conceptDetails: [
      {
        name: "Workflows",
        definition:
          "Les fichiers YAML dans .github/workflows : ils décrivent quand et quoi exécuter.",
      },
      {
        name: "Jobs",
        definition:
          "Les tâches parallélisables d’un workflow : chaque job tourne sur une machine fraîche.",
      },
      {
        name: "Actions",
        definition:
          "Les briques réutilisables du marketplace : checkout, setup-node, déploiement — ne pas réinventer.",
      },
      {
        name: "Secrets",
        definition:
          "Stocker clés et tokens chiffrés : jamais de secret en dur dans le YAML.",
      },
      {
        name: "Runners",
        definition:
          "Les machines qui exécutent les workflows : hébergées par GitHub ou auto-hébergées.",
      },
      {
        name: "Matrix",
        definition:
          "Exécuter un job sur plusieurs versions (Node 18/20/22) en une seule déclaration.",
      },
    ],
  },
  // -------------------------------------------------------------- gitlab-ci
  "gitlab-ci": {
    definition:
      "GitLab CI est le CI/CD natif de GitLab : un seul outil pour le code, les pipelines, les registries et le déploiement, configuré dans un fichier .gitlab-ci.yml.",
    whyLearn:
      "GitLab CI brille par son intégration : pas d’outil externe, des review apps automatiques, un modèle de pipeline expressif. Le choix naturel des équipes déjà sur GitLab et des organisations qui veulent une plateforme unique.",
    prerequisiteNotes: {
      cicd: "Comprendre les concepts de pipeline, stages, artifacts et environnements.",
    },
    conceptDetails: [
      {
        name: "Pipelines",
        definition:
          "Les stages (build, test, deploy) et leurs jobs : visualisation claire de la progression.",
      },
      {
        name: ".gitlab-ci.yml",
        definition:
          "Le fichier unique qui décrit tout le pipeline : simple à versionner et à reviewer.",
      },
      {
        name: "Runners",
        definition:
          "Les exécuteurs (partagés ou dédiés, Docker ou shell) qui font tourner les jobs.",
      },
      {
        name: "Environnements",
        definition:
          "Suivre ce qui est déployé où : dev, staging, prod, avec boutons de déploiement manuel.",
      },
      {
        name: "Review apps",
        definition:
          "Déployer automatiquement chaque merge request sur un environnement éphémère : reviewer du code en conditions réelles.",
      },
      {
        name: "Auto DevOps",
        definition:
          "Des pipelines préconfigurés qui détectent le type de projet : un point de départ rapide.",
      },
    ],
  },
  // ------------------------------------------------------------------- aws
  aws: {
    definition:
      "AWS (Amazon Web Services) est la plateforme cloud la plus complète : des centaines de services pour calculer, stocker, mettre en réseau et déployer, à la demande et à l’échelle mondiale.",
    whyLearn:
      "AWS est le cloud le plus demandé en entreprise et sa certification la plus reconnue. Le maîtriser, c’est comprendre le cloud en général : les concepts (IAM, VPC, serverless) se transfèrent aux autres providers.",
    prerequisiteNotes: {
      networks:
        "Comprendre IP, DNS et pare-feu : le VPC est un réseau virtuel à configurer.",
      linux: "Administrer des serveurs : EC2, c’est du Linux à distance.",
    },
    conceptDetails: [
      {
        name: "EC2",
        definition:
          "Les serveurs virtuels à la demande : la brique de calcul historique d’AWS.",
      },
      {
        name: "S3",
        definition:
          "Le stockage objet illimité : fichiers, backups, sites statiques, data lakes.",
      },
      {
        name: "RDS",
        definition:
          "Les bases de données managées : PostgreSQL, MySQL sans administrer de serveur.",
      },
      {
        name: "IAM",
        definition:
          "La gestion des identités et des permissions : le socle de la sécurité sur AWS, à maîtriser en premier.",
      },
      {
        name: "Lambda",
        definition:
          "Le serverless : exécuter du code sans serveur, facturé à la milliseconde.",
      },
      {
        name: "VPC",
        definition:
          "Le réseau privé virtuel : isoler ses ressources, contrôler le trafic entrant et sortant.",
      },
    ],
  },
  // --------------------------------------------------------------- ansible
  ansible: {
    definition:
      "Ansible est un outil d’automatisation de la configuration : il exécute des tâches sur des flottes de serveurs via SSH, sans agent à installer, à partir de playbooks YAML lisibles.",
    whyLearn:
      "Ansible est la façon la plus simple de configurer des serveurs de façon reproductible : un playbook remplace une documentation d’installation manuelle. Idéal pour provisionner des VMs, durcir des systèmes et automatiser les tâches d’exploitation.",
    prerequisiteNotes: {
      linux:
        "Administrer un système : paquets, services, fichiers de configuration.",
      bash: "Écrire des scripts shell : Ansible automatise ce qu’on ferait à la main.",
    },
    conceptDetails: [
      {
        name: "Playbooks",
        definition:
          "Les scénarios YAML qui décrivent l’état désiré des serveurs : lisibles même par un non-expert.",
      },
      {
        name: "Inventaires",
        definition:
          "La liste des machines cibles, groupées par rôle : sur quoi s’applique chaque playbook.",
      },
      {
        name: "Rôles",
        definition:
          "Des playbooks packagés et réutilisables : la bonne pratique pour factoriser.",
      },
      {
        name: "Idempotence",
        definition:
          "Réexécuter un playbook ne change rien si l’état est déjà correct : la propriété qui rend Ansible sûr.",
      },
      {
        name: "Vault",
        definition:
          "Chiffrer les secrets (mots de passe, clés) dans les playbooks : jamais de secret en clair.",
      },
      {
        name: "Galaxy",
        definition:
          "Le hub de rôles communautaires : réutiliser plutôt que réécrire.",
      },
    ],
  },
  // ----------------------------------------------------------------- nginx
  nginx: {
    definition:
      "Nginx est un serveur web et reverse proxy ultra-performant : il reçoit les requêtes HTTP, les route vers les bonnes applications, chiffre en TLS et répartit la charge. Il est devant une immense partie du web.",
    whyLearn:
      "Savoir exposer une application correctement — HTTPS, routage, équilibrage — est indispensable dès qu’on déploie. Nginx est l’outil standard pour ça : léger, stable, documenté, présent partout.",
    prerequisiteNotes: {
      http: "Comprendre requêtes, réponses, en-têtes et codes de statut.",
      linux:
        "Éditer des fichiers de configuration et gérer des services système.",
    },
    conceptDetails: [
      {
        name: "Reverse proxy",
        definition:
          "Recevoir les requêtes externes et les transmettre aux applications internes : une seule porte d’entrée.",
      },
      {
        name: "TLS",
        definition:
          "Terminer le HTTPS avec des certificats (Let’s Encrypt) : chiffrer le trafic sans toucher à l’app.",
      },
      {
        name: "Load balancing",
        definition:
          "Répartir la charge entre plusieurs instances : tenir la montée en trafic.",
      },
      {
        name: "Cache",
        definition:
          "Servir les réponses fréquentes depuis la mémoire : soulager l’application.",
      },
      {
        name: "Compression",
        definition:
          "Compresser les réponses (gzip, brotli) : des pages plus rapides à charger.",
      },
      {
        name: "Logs",
        definition:
          "Journaliser les accès et les erreurs : la matière première du diagnostic et de la sécurité.",
      },
    ],
  },
  // ------------------------------------------------------------ prometheus
  prometheus: {
    definition:
      "Prometheus est le système de supervision par métriques devenu standard : il collecte des séries temporelles (CPU, latence, erreurs), permet de les interroger avec PromQL et déclenche des alertes.",
    whyLearn:
      "On ne peut pas opérer ce qu’on ne mesure pas. Prometheus est le socle de l’observabilité moderne, natif de l’écosystème Kubernetes : savoir le déployer et écrire des alertes pertinentes est une compétence SRE centrale.",
    prerequisiteNotes: {
      kubernetes:
        "Comprendre pods, services et le déploiement d’applications : Prometheus y est généralement déployé.",
    },
    conceptDetails: [
      {
        name: "Métriques",
        definition:
          "Les mesures exposées au format texte (compteurs, gauges, histogrammes) : le langage de Prometheus.",
      },
      {
        name: "PromQL",
        definition:
          "Le langage de requête : agréger, filtrer, calculer des taux sur les séries temporelles.",
      },
      {
        name: "Alerting",
        definition:
          "Définir des règles qui déclenchent des alertes : seuils, durées, routage vers les bonnes personnes.",
      },
      {
        name: "Exporters",
        definition:
          "Les agents qui exposent les métriques : node-exporter, kube-state-metrics, exporters applicatifs.",
      },
      {
        name: "Targets",
        definition:
          "Les cibles scrutées : la découverte de services automatise leur inventaire.",
      },
      {
        name: "Rétention",
        definition:
          "Gérer la durée de conservation : les métriques haute résolution coûtent cher en stockage.",
      },
    ],
  },
  // ------------------------------------------------------------- postgresql
  postgresql: {
    definition:
      "PostgreSQL est le système de gestion de base de données relationnelle open source le plus avancé : robuste, extensible, conforme aux standards SQL, avec des fonctions modernes (JSON, recherche plein texte, géospatial).",
    whyLearn:
      "PostgreSQL est le choix par défaut des nouvelles applications : il fait aussi bien le relationnel strict que le semi-structuré avec JSONB. Le maîtriser (modélisation, index, requêtes) est une compétence backend durable.",
    prerequisiteNotes: {
      sql: "Écrire des requêtes SELECT, JOIN, GROUP BY : PostgreSQL en est l’implémentation de référence.",
    },
    conceptDetails: [
      {
        name: "Types",
        definition:
          "Un système de types riche : tableaux, JSON, plages, géométrie — bien au-delà des types SQL de base.",
      },
      {
        name: "Index",
        definition:
          "Accélérer les requêtes : B-tree, GIN, choix des colonnes indexées, mesure de l’impact.",
      },
      {
        name: "JSONB",
        definition:
          "Stocker et interroger du JSON en binaire indexable : la flexibilité du NoSQL dans du relationnel.",
      },
      {
        name: "Full-text",
        definition:
          "La recherche plein texte intégrée : ranking, dictionnaires, sans moteur externe pour beaucoup d’usages.",
      },
      {
        name: "Réplication",
        definition:
          "Répliquer vers des standbys : haute disponibilité et répartition de la lecture.",
      },
      {
        name: "EXPLAIN",
        definition:
          "Lire les plans d’exécution : comprendre ce que fait vraiment une requête pour l’optimiser.",
      },
    ],
  },
  // --------------------------------------------------------------- mongodb
  mongodb: {
    definition:
      "MongoDB est la base de données documentaire la plus populaire : elle stocke des documents JSON-like sans schéma rigide, avec un scaling horizontal natif et un langage d’agrégation puissant.",
    whyLearn:
      "Quand le modèle de données évolue vite ou est naturellement hiérarchique (catalogues, profils, contenus), le documentaire évite les migrations de schéma coûteuses. MongoDB est le NoSQL le plus demandé, complément naturel du relationnel.",
    prerequisiteNotes: {
      databases:
        "Comprendre ce qu’est une base de données, les index et les compromis de modélisation.",
    },
    conceptDetails: [
      {
        name: "Documents",
        definition:
          "Des enregistrements BSON (JSON binaire) imbriqués : modéliser par agrégats plutôt que par tables.",
      },
      {
        name: "Agrégations",
        definition:
          "Le pipeline d’agrégation : filtrer, grouper, projeter — l’équivalent puissant des requêtes analytiques.",
      },
      {
        name: "Index",
        definition:
          "Accélérer les requêtes et les tris : index simples, composés, géospatiaux, texte.",
      },
      {
        name: "Schéma flexible",
        definition:
          "Faire évoluer les documents sans migration : validation de schéma optionnelle pour garder le contrôle.",
      },
      {
        name: "Réplication",
        definition:
          "Les replica sets : haute disponibilité et bascule automatique.",
      },
      {
        name: "Atlas",
        definition:
          "La plateforme managée officielle : cluster en quelques clics, backups, monitoring intégrés.",
      },
    ],
  },
  // ----------------------------------------------------------------- redis
  redis: {
    definition:
      "Redis est un stockage clé-valeur en mémoire, ultra-rapide : il sert de cache, de gestionnaire de sessions, de file de messages et de compteur temps réel pour les applications à forte charge.",
    whyLearn:
      "Redis est le compagnon performance de toute application qui scale : un cache bien placé divise la charge de la base par dix. Simple à prendre en main, il enseigne les compromis mémoire/vitesse/persistance.",
    prerequisiteNotes: {
      databases:
        "Comprendre le rôle d’une base de données et quand le cache devient nécessaire.",
    },
    conceptDetails: [
      {
        name: "Cache",
        definition:
          "Stocker les résultats coûteux (requêtes, pages, API) pour les resservir en millisecondes.",
      },
      {
        name: "TTL",
        definition:
          "La durée de vie des clés : l’expiration automatique qui évite les données périmées.",
      },
      {
        name: "Structures",
        definition:
          "Listes, sets, sorted sets, hashes, streams : choisir la structure adaptée à chaque usage.",
      },
      {
        name: "Pub/Sub",
        definition:
          "La messagerie temps réel : publier des événements vers des abonnés (notifications, chat).",
      },
      {
        name: "Persistence",
        definition:
          "RDB et AOF : survivre à un redémarrage sans tout perdre, avec des compromis assumés.",
      },
      {
        name: "Cluster",
        definition:
          "Partitionner les données sur plusieurs nœuds : scaler au-delà d’une machine.",
      },
    ],
  },
  // -------------------------------------------------------- data-engineering
  "data-engineering": {
    definition:
      "Le data engineering est la discipline qui rend les données utilisables à l’échelle : ingérer des sources hétérogènes, les transformer, les orchestrer en pipelines fiables et les livrer aux analystes et aux modèles.",
    whyLearn:
      "Sans data engineering, pas de data science : 80 % d’un projet data, c’est d’avoir des données propres, fraîches et fiables. C’est le métier data le plus demandé, à l’interface entre software engineering et analytics.",
    prerequisiteNotes: {
      sql: "Écrire des requêtes complexes : la transformation des données se fait largement en SQL.",
      python: "Automatiser l’ingestion et les transformations : scripts, APIs, orchestration.",
    },
    conceptDetails: [
      {
        name: "ETL/ELT",
        definition:
          "Extraire, transformer, charger : les deux patterns d’alimentation des entrepôts de données.",
      },
      {
        name: "Orchestration",
        definition:
          "Planifier et superviser les pipelines : dépendances, reprises sur erreur, alertes.",
      },
      {
        name: "Warehouses",
        definition:
          "Les entrepôts analytiques (BigQuery, Snowflake) : stocker pour interroger vite, pas pour écrire vite.",
      },
      {
        name: "Streaming",
        definition:
          "Traiter les données en continu plutôt que par lots : quand la fraîcheur compte.",
      },
      {
        name: "Qualité",
        definition:
          "Tester les données comme on teste le code : contrats, contrôles, monitoring de la fraîcheur.",
      },
      {
        name: "Airflow/dbt",
        definition:
          "Les deux standards : Airflow orchestre les tâches, dbt transforme en SQL versionné et testé.",
      },
    ],
  },
  // ----------------------------------------------------------------- kafka
  kafka: {
    definition:
      "Kafka est une plateforme de streaming d’événements distribuée : elle ingère des millions d’événements par seconde, les stocke durablement et les redistribue aux consommateurs. La colonne vertébrale des architectures event-driven.",
    whyLearn:
      "Kafka est derrière les systèmes temps réel à grande échelle : transactions bancaires, tracking, IoT, microservices événementiels. Comprendre topics, partitions et consumers, c’est comprendre l’architecture événementielle moderne.",
    prerequisiteNotes: {
      "data-engineering":
        "Comprendre les pipelines de données : Kafka en est la version temps réel et distribuée.",
    },
    conceptDetails: [
      {
        name: "Topics",
        definition:
          "Les flux nommés où les producteurs publient les événements : l’unité logique de Kafka.",
      },
      {
        name: "Partitions",
        definition:
          "Le découpage d’un topic en segments parallèles : ce qui permet le débit et la scalabilité.",
      },
      {
        name: "Consumers",
        definition:
          "Les applications qui lisent les événements : groupes de consommateurs, offsets, rejeu possible.",
      },
      {
        name: "Exactly-once",
        definition:
          "La garantie de traitement unique : éviter les doublons dans les pipelines critiques.",
      },
      {
        name: "Schema Registry",
        definition:
          "Versionner les formats d’événements (Avro, Protobuf) : faire évoluer sans casser les consommateurs.",
      },
      {
        name: "Connect",
        definition:
          "Les connecteurs source/sink : brancher bases, fichiers et APIs sans écrire de code.",
      },
    ],
  },
  // ------------------------------------------------------------ web-security
  "web-security": {
    definition:
      "La sécurité web est l’ensemble des pratiques qui protègent les applications web : prévenir les injections, le XSS, le CSRF, sécuriser les sessions et configurer correctement les en-têtes. Penser sécurité dès la conception, pas après l’incident.",
    whyLearn:
      "La majorité des failles exploitées sont des failles web classiques, connues depuis vingt ans. Tout développeur web doit connaître ces attaques : c’est lui qui écrit le code vulnérable — ou le code qui résiste.",
    prerequisiteNotes: {
      http: "Maîtriser requêtes, cookies, en-têtes : le terrain où se jouent les attaques web.",
      networks: "Comprendre TCP/IP et DNS : le contexte réseau des attaques.",
    },
    conceptDetails: [
      {
        name: "XSS",
        definition:
          "L’injection de scripts dans les pages vues par d’autres utilisateurs : échapper toute donnée affichée.",
      },
      {
        name: "Injections",
        definition:
          "SQL, commandes, LDAP : ne jamais concaténer des entrées utilisateur dans des requêtes — requêtes préparées.",
      },
      {
        name: "CSRF",
        definition:
          "Forcer le navigateur d’une victime à exécuter une action à son insu : tokens anti-CSRF, SameSite.",
      },
      {
        name: "Headers",
        definition:
          "Les en-têtes de sécurité (CSP, HSTS, X-Frame-Options) : des protections déclaratives peu coûteuses.",
      },
      {
        name: "Sessions",
        definition:
          "Gérer les sessions côté serveur : cookies HttpOnly/Secure, expiration, fixation.",
      },
      {
        name: "CORS",
        definition:
          "Contrôler quelles origines peuvent appeler l’API depuis un navigateur : ni trop ouvert, ni cassé.",
      },
    ],
  },
  // ----------------------------------------------------------------- owasp
  owasp: {
    definition:
      "L’OWASP Top 10 est le référentiel des dix risques de sécurité les plus critiques pour les applications web, maintenu par la fondation OWASP. C’est la checklist de référence de tout audit de sécurité applicative.",
    whyLearn:
      "L’OWASP Top 10 donne un langage commun aux développeurs, auditeurs et pentesters : parler de « A03 Injection » plutôt que de décrire chaque faille. Le connaître, c’est savoir où chercher en priorité.",
    prerequisiteNotes: {
      "web-security":
        "Connaître les attaques web de base : l’OWASP les organise en référentiel actionnable.",
    },
    conceptDetails: [
      {
        name: "Top 10",
        definition:
          "Les dix catégories (injections, broken access control, cryptographic failures…) : la carte des risques.",
      },
      {
        name: "Exploitation",
        definition:
          "Comprendre comment chaque faille s’exploite concrètement : sans ça, la sévérité reste abstraite.",
      },
      {
        name: "Remédiation",
        definition:
          "Les correctifs recommandés pour chaque risque : patterns de code sûrs.",
      },
      {
        name: "Tests",
        definition:
          "Les méthodologies de test OWASP : vérifier systématiquement, pas au hasard.",
      },
      {
        name: "Cheatsheets",
        definition:
          "Les fiches pratiques (authentification, XSS, etc.) : des recettes directement applicables.",
      },
      {
        name: "Veille",
        definition:
          "Suivre l’évolution du Top 10 : les risques changent avec les architectures (API, cloud).",
      },
    ],
  },
  // ------------------------------------------------------------- pentesting
  pentesting: {
    definition:
      "Le pentest (test d’intrusion) est le hacking éthique et méthodique : simuler une attaque réelle, avec autorisation, pour trouver les failles avant les attaquants et documenter comment les corriger.",
    whyLearn:
      "Le pentest apprend à penser comme un attaquant : c’est la formation la plus efficace pour écrire du code et des architectures résistants. C’est aussi une voie d’entrée reconnue vers les métiers offensifs de la cybersécurité.",
    prerequisiteNotes: {
      linux:
        "Maîtriser le terminal et l’administration : l’environnement de travail du pentester.",
      networks:
        "Comprendre TCP/IP, DNS, routage : la reconnaissance et l’exploitation passent par le réseau.",
      "web-security":
        "Connaître les failles web : la majorité des cibles sont des applications.",
    },
    conceptDetails: [
      {
        name: "Reconnaissance",
        definition:
          "Collecter passivement puis activement des informations sur la cible : la phase qui décide du reste.",
      },
      {
        name: "Exploitation",
        definition:
          "Tirer parti des vulnérabilités trouvées pour obtenir un accès : toujours dans le périmètre autorisé.",
      },
      {
        name: "Post-exploitation",
        definition:
          "Évaluer l’impact : jusqu’où peut aller l’attaquant une fois entré (mouvements latéraux, exfiltration simulée).",
      },
      {
        name: "Reporting",
        definition:
          "Rédiger un rapport clair et actionnable : une faille non comprise n’est jamais corrigée.",
      },
      {
        name: "Kali",
        definition:
          "La distribution Linux outillée pour le pentest : des centaines d’outils préinstallés.",
      },
      {
        name: "Méthodologie",
        definition:
          "Travailler avec un cadre (PTES, OWASP Testing Guide) : un pentest est un processus, pas de l’improvisation.",
      },
    ],
  },
  // ------------------------------------------------------------------- ros
  ros: {
    definition:
      "ROS (Robot Operating System) est l’écosystème standard de la robotique : un middleware qui fait communiquer les composants d’un robot (capteurs, moteurs, algorithmes) via des messages, avec des outils de simulation et de visualisation.",
    whyLearn:
      "ROS est le langage commun de la robotique académique et industrielle : savoir y brancher un capteur, simuler un robot et déployer une navigation ouvre la porte aux projets robotiques sérieux, du drone au bras manipulateur.",
    prerequisiteNotes: {
      python: "Programmer en Python : le langage principal pour écrire des nodes ROS.",
      linux: "Travailler sous Linux en ligne de commande : l’environnement natif de ROS.",
    },
    conceptDetails: [
      {
        name: "Nodes",
        definition:
          "Les processus indépendants (perception, contrôle, planification) qui composent une application robotique.",
      },
      {
        name: "Topics",
        definition:
          "Les canaux de messages asynchrones : un capteur publie, plusieurs nodes s’abonnent.",
      },
      {
        name: "Services",
        definition:
          "Les appels synchrones requête/réponse : pour les actions ponctuelles.",
      },
      {
        name: "URDF",
        definition:
          "Le format qui décrit la géométrie et la cinématique du robot : son jumeau numérique.",
      },
      {
        name: "Gazebo",
        definition:
          "Le simulateur 3D : tester son robot dans un monde virtuel avant le matériel réel.",
      },
      {
        name: "Navigation",
        definition:
          "La stack de navigation autonome : cartographie, localisation, planification de trajectoire.",
      },
    ],
  },
  // -------------------------------------------------------------- embedded
  embedded: {
    definition:
      "Les systèmes embarqués sont des ordinateurs dédiés intégrés à un objet : microcontrôleurs, firmware, contraintes de temps réel et d’énergie. C’est le code qui fait bouger le monde physique.",
    whyLearn:
      "Objets connectés, automobile, médical, industrie : l’embarqué est partout où le logiciel rencontre le matériel. Il enseigne la rigueur (mémoire comptée, timing strict) que le développement applicatif ne demande jamais.",
    prerequisiteNotes: {
      cpp: "Programmer en C/C++ : les langages du firmware, proches du matériel.",
      electronics:
        "Lire un schéma, comprendre GPIO, bus et alimentations : le firmware pilote du hardware réel.",
    },
    conceptDetails: [
      {
        name: "Microcontrôleurs",
        definition:
          "Les puces tout-en-un (ESP32, STM32) : CPU, mémoire et périphériques dans quelques millimètres.",
      },
      {
        name: "Temps réel",
        definition:
          "Garantir une réponse dans un délai borné : la contrainte qui distingue l’embarqué.",
      },
      {
        name: "Bare metal",
        definition:
          "Programmer sans système d’exploitation, directement sur le hardware : contrôle total, zéro abstraction.",
      },
      {
        name: "RTOS",
        definition:
          "Les systèmes temps réel (FreeRTOS) : multitâche déterministe quand le bare metal ne suffit plus.",
      },
      {
        name: "Low power",
        definition:
          "Optimiser la consommation : modes sleep, duty cycling — des années sur une pile.",
      },
      {
        name: "Debug HW",
        definition:
          "Déboguer avec oscilloscope, analyseur logique, JTAG : quand le printf ne suffit plus.",
      },
    ],
  },
  // ------------------------------------------------------------------ make
  make: {
    definition:
      "Make (ex-Integromat) est une plateforme d’automatisation visuelle : on assemble des scénarios en reliant des modules qui représentent des applications, sans écrire de code.",
    whyLearn:
      "Make est l’outil no-code le plus puissant pour automatiser des processus métier complexes : logique conditionnelle, boucles, gestion d’erreurs visuelles. Idéal pour prototyper vite et automatiser sans équipe technique.",
    prerequisiteNotes: {
      http: "Comprendre les requêtes HTTP : les modules Make encapsulent des appels d’API.",
      webhooks:
        "Recevoir des événements externes : le déclencheur de la plupart des scénarios.",
    },
    conceptDetails: [
      {
        name: "Scénarios",
        definition:
          "Les workflows visuels : une séquence de modules reliés qui s’exécute automatiquement.",
      },
      {
        name: "Modules",
        definition:
          "Les briques (déclencheur, action, recherche) : chacune encapsule un appel vers une application.",
      },
      {
        name: "Routeurs",
        definition:
          "Diviser un scénario en plusieurs chemins parallèles selon des conditions.",
      },
      {
        name: "Filtres",
        definition:
          "Les conditions entre modules : ne continuer que si les données correspondent.",
      },
      {
        name: "Planification",
        definition:
          "Déclencher les scénarios sur planning ou à chaque événement : le rythme de l’automation.",
      },
      {
        name: "Erreurs",
        definition:
          "Gérer les échecs : routes d’erreur, retries, notifications — l’automation fiable se prévoit.",
      },
    ],
  },
  // ---------------------------------------------------------------- zapier
  zapier: {
    definition:
      "Zapier est le pionnier de l’automatisation no-code : il connecte plus de 6000 applications via des « Zaps » — un déclencheur dans une app provoque des actions dans d’autres, sans écrire de code.",
    whyLearn:
      "Zapier est la porte d’entrée la plus simple vers l’automation : en quelques minutes, on connecte ses outils quotidiens (Gmail, Sheets, Slack, CRM). Parfait pour automatiser sans compétence technique et valider un besoin avant d’industrialiser.",
    prerequisiteNotes: {
      http: "Comprendre qu’une application expose des événements et des actions via des APIs : ce que Zapier orchestre.",
    },
    conceptDetails: [
      {
        name: "Zaps",
        definition:
          "Les automatisations : un déclencheur + une ou plusieurs actions, activés en continu.",
      },
      {
        name: "Triggers",
        definition:
          "L’événement qui démarre le Zap : nouvel email, nouvelle ligne, nouveau paiement.",
      },
      {
        name: "Actions",
        definition:
          "Ce que fait le Zap : créer, mettre à jour, envoyer — dans n’importe quelle app connectée.",
      },
      {
        name: "Filtres",
        definition:
          "Ne continuer que si certaines conditions sont remplies : éviter les exécutions inutiles.",
      },
      {
        name: "Multi-étapes",
        definition:
          "Enchaîner plusieurs actions avec des chemins conditionnels : des workflows complets.",
      },
      {
        name: "Tables",
        definition:
          "Stocker des données simples dans Zapier : une mini-base pour les automatisations.",
      },
    ],
  },
  // ----------------------------------------------------------- cryptography
  cryptography: {
    definition:
      "La cryptographie est la science du secret et de la confiance numérique : chiffrer des données, vérifier leur intégrité, prouver une identité. Elle est derrière HTTPS, les mots de passe stockés et les blockchains.",
    whyLearn:
      "Toute la sécurité numérique repose sur la cryptographie : sans elle, pas de commerce en ligne, pas de messagerie privée, pas d’authentification fiable. La comprendre, c’est comprendre sur quoi repose la confiance dans les systèmes.",
    prerequisiteNotes: {
      "culture-info":
        "Savoir ce qu’est un programme et un réseau : la cryptographie protège les deux.",
    },
    conceptDetails: [
      {
        name: "Symétrique",
        definition:
          "Chiffrer et déchiffrer avec la même clé : rapide, mais il faut partager la clé en secret (AES).",
      },
      {
        name: "Asymétrique",
        definition:
          "Une clé publique pour chiffrer, une clé privée pour déchiffrer : échanger sans secret partagé (RSA).",
      },
      {
        name: "Hachage",
        definition:
          "Les fonctions à sens unique (SHA-256) : vérifier l’intégrité et stocker les mots de passe sans les connaître.",
      },
      {
        name: "Signatures",
        definition:
          "Prouver l’origine et l’intégrité d’un message avec sa clé privée : la base des certificats.",
      },
      {
        name: "TLS",
        definition:
          "Le protocole qui chiffre le web (HTTPS) : handshake, certificats, session chiffrée.",
      },
      {
        name: "PKI",
        definition:
          "L’infrastructure de clés publiques : autorités de certification, chaînes de confiance, révocation.",
      },
    ],
  },
  // ============================================================ TIER 3 ===
  // ------------------------------------------------------------- tensorflow
  tensorflow: {
    definition:
      "TensorFlow est la plateforme de machine learning de Google : un écosystème complet (Keras, TF Serving, TF Lite) pour entraîner et déployer des modèles en production, du serveur au mobile.",
    whyLearn:
      "TensorFlow excelle là où PyTorch est plus recherche : déploiement industrialisé, mobile et embarqué, pipelines de production. Le connaître ouvre les environnements Google Cloud et les équipes ML orientées production.",
  },
  // ----------------------------------------------------------------- mlops
  mlops: {
    definition:
      "Le MLOps applique les principes DevOps au machine learning : versionner données et modèles, automatiser l’entraînement et le déploiement, surveiller les modèles en production.",
    whyLearn:
      "Un modèle qui reste dans un notebook ne crée aucune valeur. Le MLOps est ce qui transforme une expérimentation en produit fiable : sans lui, les projets ML meurent en phase pilote.",
  },
  // ------------------------------------------------------- container-registry
  "container-registry": {
    definition:
      "Un container registry est un dépôt qui stocke, versionne et distribue les images de conteneurs : le point de passage entre le build et le déploiement, avec scan de vulnérabilités et gestion des accès.",
    whyLearn:
      "Aucun déploiement sérieux ne se fait sans registry : c’est lui qui garantit que la production exécute exactement l’image testée, et qui sécurise la chaîne d’approvisionnement logicielle.",
  },
  // ------------------------------------------------------------------ helm
  helm: {
    definition:
      "Helm est le gestionnaire de paquets de Kubernetes : il package des applications en « charts » versionnés et paramétrables, installables et mis à jour en une commande au lieu de YAML écrits à la main.",
    whyLearn:
      "Helm évite de maintenir des centaines de fichiers YAML : un chart paramétrable déploie la même application en dev, staging et prod. C’est le standard pour distribuer et opérer des apps sur Kubernetes.",
  },
  // ---------------------------------------------------------- k8s-operators
  "k8s-operators": {
    definition:
      "Les Operators sont des contrôleurs Kubernetes qui pilotent des applications complexes (bases de données, files) : ils étendent l’API Kubernetes avec des ressources custom et une logique de réconciliation automatique.",
    whyLearn:
      "Les Operators sont le niveau expert de Kubernetes : ils encapsulent l’expertise opérationnelle d’une application en code. Les comprendre, c’est passer d’utilisateur à concepteur de plateformes.",
  },
  // ----------------------------------------------------------------- azure
  azure: {
    definition:
      "Azure est la plateforme cloud de Microsoft : forte intégration avec l’écosystème Microsoft (Active Directory, Office, .NET), cloud hybride et services IA.",
    whyLearn:
      "Azure domine dans les entreprises utilisatrices de Microsoft : savoir y déployer (VM, App Service, Entra ID) ouvre un immense marché de l’emploi, notamment dans les grands comptes et le secteur public.",
  },
  // ------------------------------------------------------------------- gcp
  gcp: {
    definition:
      "GCP (Google Cloud Platform) est le cloud né de l’infrastructure de Google : excellence sur Kubernetes (GKE), la data (BigQuery) et la simplicité réseau.",
    whyLearn:
      "GCP est le choix naturel pour le Kubernetes managé et l’analytique à grande échelle. Ses concepts se transfèrent aux autres clouds, et BigQuery reste une référence pour la data.",
  },
  // --------------------------------------------------------------- grafana
  grafana: {
    definition:
      "Grafana est la plateforme de visualisation de l’observabilité : elle transforme métriques, logs et traces en dashboards lisibles, avec alerting intégré.",
    whyLearn:
      "Des métriques sans visualisation ne servent à personne. Grafana est le standard pour rendre l’état des systèmes lisible par toute l’équipe — et pour construire une culture d’alerting pertinente plutôt que bruyante.",
  },
  // ---------------------------------------------------- platform-engineering
  "platform-engineering": {
    definition:
      "Le platform engineering industrialise le DevOps : construire des plateformes internes (IDP) qui offrent aux développeurs du self-service (environnements, déploiements, observabilité) via des « golden paths ».",
    whyLearn:
      "C’est l’évolution naturelle du DevOps à l’échelle : au lieu que chaque équipe réinvente son infrastructure, une équipe plateforme fournit des briques standard. Le sommet actuel des carrières infra.",
  },
  // ----------------------------------------------------------------- mysql
  mysql: {
    definition:
      "MySQL est le système de gestion de base de données relationnelle le plus répandu : simple, rapide, il propulse une immense partie du web historique (WordPress et Cie).",
    whyLearn:
      "MySQL reste incontournable : des millions de sites en production l’utilisent. Le connaître — avec ses différences face à PostgreSQL — est indispensable pour maintenir l’existant et choisir en connaissance de cause.",
  },
  // --------------------------------------------------------------- rabbitmq
  rabbitmq: {
    definition:
      "RabbitMQ est un broker de messages robuste : il découple les services via des files d’attente, absorbe les pics de charge et garantit la livraison des messages.",
    whyLearn:
      "RabbitMQ est la façon éprouvée de rendre des architectures résilientes : workers asynchrones, notifications, découplage. Plus simple que Kafka pour les files classiques, il reste un standard du messaging.",
  },
  // -------------------------------------------------------------- analytics
  analytics: {
    definition:
      "La data analytics est l’analyse décisionnelle : avec SQL et des outils BI, transformer des données en dashboards, KPIs et réponses aux questions business.",
    whyLearn:
      "L’analytics est la voie la plus directe vers un métier data : pas de modèles complexes, mais des réponses fiables aux questions qui pilotent l’entreprise. C’est aussi le socle de la data science.",
  },
  // ------------------------------------------------------------------ siem
  siem: {
    definition:
      "Un SIEM (Security Information and Event Management) centralise les logs de toute l’infrastructure, corrèle les événements et détecte les attaques en temps réel : les yeux du SOC.",
    whyLearn:
      "Sans centralisation des logs, une attaque passe inaperçue pendant des mois. Le SIEM est le cœur de la détection : savoir écrire des règles de détection pertinentes est une compétence clé des analystes SOC.",
  },
  // ------------------------------------------------------- incident-response
  "incident-response": {
    definition:
      "La réponse aux incidents est la gestion de crise sécurité : contenir l’attaque, éradiquer la menace, récupérer les systèmes, puis tirer les leçons. Elle s’appuie sur des playbooks préparés à l’avance.",
    whyLearn:
      "La question n’est pas « si » mais « quand » un incident surviendra. Savoir réagir méthodiquement sous pression — plutôt qu’improviser — fait la différence entre un incident contenu et une crise majeure.",
  },
  // ------------------------------------------------------------------- cpp
  cpp: {
    definition:
      "C et C++ sont les langages du système et de l’embarqué : gestion manuelle de la mémoire, performance maximale, contrôle total sur le matériel. Ils sont derrière les OS, les moteurs de jeu et les microcontrôleurs.",
    whyLearn:
      "Le C/C++ enseigne ce que les langages managés cachent : mémoire, pointeurs, compilation. Indispensable pour l’embarqué, les systèmes et la performance — et une école de rigueur pour tout programmeur.",
  },
  // ------------------------------------------------------------ electronics
  electronics: {
    definition:
      "L’électronique est la compréhension du hardware : tension, courant, composants, lecture de schémas. Elle explique ce qui se passe physiquement dans la machine que le logiciel pilote.",
    whyLearn:
      "Pour la robotique et l’embarqué, le logiciel seul ne suffit pas : il faut comprendre capteurs, alimentations et signaux. L’électronique est le pont entre le code et le monde physique.",
  },
  // --------------------------------------------------------------- sensors
  sensors: {
    definition:
      "Les capteurs sont les sens des machines : ils convertissent le monde physique (distance, température, mouvement, image) en signaux numériques exploitables par le logiciel.",
    whyLearn:
      "Aucun robot ni objet connecté ne fonctionne sans capteurs : les choisir, les calibrer et filtrer leur bruit est au cœur de tout projet embarqué ou robotique.",
  },
  // --------------------------------------------------------- control-systems
  "control-systems": {
    definition:
      "L’asservissement (control systems) est la théorie du contrôle : boucles de régulation, correcteurs PID, stabilité. Faire en sorte qu’une machine atteigne précisément sa consigne malgré les perturbations.",
    whyLearn:
      "Un drone qui reste stable, un moteur qui tourne à vitesse constante, un bras qui atteint sa cible : tout repose sur l’asservissement. C’est la théorie qui transforme un prototype en machine fiable.",
  },
  // -------------------------------------------------------------- robotics
  robotics: {
    definition:
      "La robotique combine perception, décision et action : des machines qui comprennent leur environnement (capteurs, vision) et agissent dessus (moteurs, bras) de façon autonome.",
    whyLearn:
      "La robotique est la synthèse de l’informatique, de l’électronique et de l’IA : le domaine le plus complet techniquement. Industrie, logistique, médical — les robots autonomes sont un secteur en forte croissance.",
  },
};

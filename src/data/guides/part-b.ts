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
  setup: {
    install: [
      "Installer Python 3 depuis python.org, ou `brew install python3` / `winget install Python.Python.3`.",
      "Vérifier : `python3 --version`, puis mettre pip à jour : `pip install --upgrade pip`.",
    ],
    configure: [
      "Créer un environnement virtuel par projet : `python3 -m venv .venv`.",
      "L'activer : `source .venv/bin/activate` (Linux/macOS) ou `.\\.venv\\Scripts\\activate` (Windows).",
      "Figer les dépendances : `pip freeze > requirements.txt`, les restaurer : `pip install -r requirements.txt`.",
    ],
    workflow: [
      "Exécuter : `python script.py` ; tester une expression : REPL avec `python3` seul.",
      "Installer un paquet : `pip install requests` (dans le venv activé).",
      "Toujours travailler dans le venv : l'invite affiche `(.venv)` quand il est actif.",
    ],
    editors: [
      "VS Code : extension « Python » (Microsoft) + « Pylance » — exécution, debug, sélection d'interpréteur (`Ctrl+Maj+P` → « Python: Select Interpreter »).",
      "Alternative : PyCharm (gestion des venv intégrée).",
    ],
  },
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
  setup: {
    install: [
      "Installer la stack scientifique : `pip install scikit-learn pandas numpy matplotlib jupyter`.",
      "Alternative tout-en-un : la distribution Anaconda (Python + 300 paquets scientifiques).",
    ],
    configure: [
      "Travailler en notebooks `.ipynb` : un par expérience, avec un dossier `data/` pour les jeux de données.",
      "Figer l'environnement : `pip freeze > requirements.txt` pour la reproductibilité.",
      "Fixer `random_state=42` dans les modèles pour des résultats reproductibles.",
    ],
    workflow: [
      "Lancer : `jupyter lab`, charger un jeu d'essai : `from sklearn.datasets import load_iris`.",
      "Découper : `train_test_split(X, y, test_size=0.2)`, entraîner : `model.fit(X_train, y_train)`.",
      "Évaluer : `model.score(X_test, y_test)`, tracer les courbes avec `matplotlib`.",
    ],
    editors: [
      "VS Code : extension « Jupyter » (Microsoft) — notebooks natifs dans l'éditeur.",
      "Alternatives : JupyterLab dans le navigateur, PyCharm (édition Pro : support notebooks).",
    ],
  },
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
  setup: {
    install: [
      "Choisir un framework : `pip install torch torchvision jupyter matplotlib` (PyTorch) ou `pip install tensorflow`.",
      "GPU : pilote NVIDIA + version CUDA du framework (`torch.cuda.is_available()` doit répondre True).",
      "Sans GPU local : utiliser Google Colab (GPU gratuit en notebook).",
    ],
    configure: [
      "Dossiers : `data/` (jeux de données), `checkpoints/` (poids sauvegardés), notebooks `.ipynb` par expérience.",
      "Vérifier le GPU au début de chaque notebook : `torch.cuda.is_available()` ou `tf.config.list_physical_devices('GPU')`.",
      "Fixer les graines (`random`, `numpy`, framework) pour des runs comparables.",
    ],
    workflow: [
      "Prototyper en notebook : charger un batch, vérifier les dimensions (`x.shape`).",
      "Entraîner par epochs en surveillant la loss ; sauvegarder : `torch.save(model.state_dict(), 'checkpoints/e1.pt')`.",
      "Évaluer sur le jeu de test, ajuster hyperparamètres (learning rate, batch size), réentraîner.",
    ],
    editors: [
      "VS Code : extension « Jupyter » (Microsoft) — standard pour l'expérimentation.",
      "Alternatives : Google Colab (GPU gratuit), PyCharm.",
    ],
  },
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
  setup: {
    install: [
      "Installer Docker Desktop depuis docker.com (Windows/macOS), ou le moteur sur Linux via la documentation officielle.",
      "Vérifier : `docker --version` et `docker run hello-world`.",
    ],
    configure: [
      "Écrire le `Dockerfile` (image de base, `COPY`, `RUN`, `CMD`).",
      "Ajouter un `.dockerignore` (dépendances, `.git`, fichiers locaux).",
      "Décrire les services multi-conteneurs dans `compose.yaml`.",
    ],
    workflow: [
      "Construire l'image : `docker build -t mon-app .`.",
      "Lancer : `docker run -p 3000:3000 mon-app`.",
      "Orchestrer en local : `docker compose up --build`.",
      "Inspecter : `docker ps`, `docker logs -f <conteneur>`, `docker exec -it <conteneur> sh`.",
    ],
    editors: [
      "VS Code + extension « Docker » (Dockerfile, compose, conteneurs).",
      "Alternatives : lazydocker (TUI terminal), JetBrains Gateway.",
    ],
  },
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
  setup: {
    install: [
      "Installer `kubectl` : `brew install kubectl`.",
      "Créer un cluster local : `minikube start` (ou `kind create cluster`, ou le Kubernetes de Docker Desktop).",
      "Vérifier : `kubectl cluster-info` et `kubectl get nodes`.",
    ],
    configure: [
      "Écrire les manifests YAML : `deployment.yaml`, `service.yaml`.",
      "Basculer de contexte : `kubectl config use-context <nom>`.",
      "Externaliser la configuration : `ConfigMap`, `Secret`.",
    ],
    workflow: [
      "Appliquer les manifests : `kubectl apply -f k8s/`.",
      "Observer : `kubectl get pods`, `kubectl describe pod <nom>`.",
      "Lire les logs : `kubectl logs -f deploy/<nom>`.",
      "Exposer en local : `kubectl port-forward svc/<nom> 8080:80`.",
    ],
    editors: [
      "VS Code + extensions « Kubernetes » et « YAML ».",
      "Alternatives : k9s (TUI terminal), Lens (interface graphique).",
    ],
  },
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
  setup: {
    install: [
      "Installer : `brew install terraform` (ou le binaire depuis developer.hashicorp.com).",
      "Vérifier : `terraform version`.",
    ],
    configure: [
      "Déclarer les ressources dans `main.tf` et le provider (`required_providers`).",
      "Paramétrer avec `variables.tf` et les valeurs dans `terraform.tfvars` (non commité si secrets).",
      "Stocker l'état à distance (bucket S3, Terraform Cloud) dès qu'on travaille à plusieurs.",
    ],
    workflow: [
      "Initialiser : `terraform init`.",
      "Formater et valider : `terraform fmt` puis `terraform validate`.",
      "Prévisualiser : `terraform plan`.",
      "Appliquer / détruire : `terraform apply`, `terraform destroy`.",
    ],
    editors: [
      "VS Code + extension « HashiCorp Terraform ».",
      "Alternatives : JetBrains (plugin Terraform), Neovim + terraform-ls.",
    ],
  },
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
  setup: {
    install: [
      "VirtualBox ou VMware sur la machine hôte.",
      "Télécharger l'ISO Kali Linux (kali.org) et créer une VM dédiée.",
      "Règle absolue : ne jamais tester un réseau ou un système tiers sans autorisation écrite.",
    ],
    configure: [
      "Réseau VM en « Host-only » ou NAT isolé pour les laboratoires.",
      "Snapshot de la VM avant chaque exercice.",
      "Cibles d'entraînement légales : Metasploitable, DVWA, Hack The Box, TryHackMe.",
    ],
    workflow: [
      "Reconnaissance (lab uniquement) : `nmap -sV 192.168.x.x`.",
      "Énumération : `gobuster`, `hydra` sur les cibles autorisées.",
      "Documenter : `mkdir -p ~/labs/cible-01` et noter chaque commande et résultat.",
    ],
    editors: [
      "VS Code + « Python » (Microsoft) pour écrire les scripts d'automatisation.",
      "Alternatives : terminal Kali natif, Burp Suite (analyse web), Wireshark (analyse réseau).",
    ],
  },
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
  setup: {
    install: [
      "Python 3.11+ : `python3 --version`.",
      "Stack de base : `pip install numpy pandas matplotlib scikit-learn jupyterlab`.",
      "Vérifier : `jupyter lab --version`.",
    ],
    configure: [
      "Environnement virtuel : `python -m venv .venv && source .venv/bin/activate`.",
      "Épingler : `pip freeze > requirements.txt`.",
      "Noyau Jupyter du venv : `python -m ipykernel install --user --name ds`.",
    ],
    workflow: [
      "Lancer : `jupyter lab`.",
      "Explorer : `df.describe()`, `df.info()`, `df.plot()`.",
      "Nettoyer les sorties des notebooks avant de committer.",
      "Séparer : un notebook d'exploration, un script `train.py` reproductible.",
    ],
    editors: [
      "VS Code + « Jupyter » (Microsoft) et « Python » (Microsoft).",
      "Alternatives : JupyterLab (navigateur), PyCharm, Google Colab (cloud).",
    ],
  },
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
  setup: {
    install: [
      "Dans un venv Python : `pip install numpy`.",
      "Vérifier : `python -c \"import numpy; print(numpy.__version__)\"`.",
    ],
    configure: [
      "Rien à configurer : `import numpy as np` suffit après installation.",
      "Ajouter `numpy` à `requirements.txt` pour figer la version du projet.",
    ],
    workflow: [
      "Créer des tableaux : `np.array([1, 2, 3])`, `np.zeros((3, 3))`, `np.arange(10)`.",
      "Calculs vectorisés : `a * 2`, `np.sqrt(a)` — sans boucle Python.",
      "Inspecter : `a.shape`, `a.dtype`, `a.mean()`.",
    ],
    editors: [
      "VS Code : extensions « Python » et « Jupyter » (Microsoft) pour manipuler les tableaux en notebook.",
      "Alternative : PyCharm, avec visualiseur de tableaux intégré.",
    ],
  },
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
    howItWorksTitle: "Du tableau Python au calcul vectorisé",
    howItWorks: ["TABLEAU PYTHON", "NDARRAY", "VECTORISATION", "BROADCASTING", "BOUCLES C", "RÉSULTAT"],
    example: {
      title: "Normaliser une image",
      steps: [
        "Image RVB",
        "Chargement en ndarray",
        "Conversion en float",
        "Division par 255",
        "Tableau normalisé",
      ],
    },
    projectsDetailed: [
      {
        title: "Benchmark boucles vs NumPy",
        flow: "Listes Python → Version avec boucles → Version NumPy → Mesure du temps → Comparatif",
      },
      {
        title: "Traitement d’images en tableaux",
        flow: "Image → ndarray → Filtres vectorisés → Export → Galerie traitée",
      },
      {
        title: "Calcul matriciel pour le ML",
        flow: "Données → Matrices → Produit matriciel → Résolution → Prédictions",
      },
    ],
  },
  // ---------------------------------------------------------------- pandas
  pandas: {
  setup: {
    install: [
      "Dans un venv Python : `pip install pandas` (installe numpy avec).",
      "Vérifier : `python -c \"import pandas; print(pandas.__version__)\"`.",
    ],
    configure: [
      "Rien à configurer ; ajuster l'affichage si besoin : `pd.set_option('display.max_rows', 100)`.",
      "Ajouter `pandas` à `requirements.txt`.",
    ],
    workflow: [
      "Charger : `df = pd.read_csv('data.csv')` (aussi `read_excel`, `read_json`, `read_parquet`).",
      "Explorer : `df.head()`, `df.info()`, `df.describe()`.",
      "Transformer : `df.groupby('col').mean()`, `df[df['x'] > 0]`, `df.to_csv('out.csv', index=False)`.",
    ],
    editors: [
      "VS Code : extensions « Python » et « Jupyter » (Microsoft) — le visualiseur de DataFrame intégré est idéal.",
      "Alternatives : PyCharm, ou JupyterLab directement dans le navigateur.",
    ],
  },
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
    howItWorksTitle: "Du fichier brut au tableau exploitable",
    howItWorks: ["FICHIER", "LECTURE", "DATAFRAME", "NETTOYAGE", "TRANSFORMATION", "AGRÉGATION", "EXPORT"],
    example: {
      title: "Analyser des ventes e-commerce",
      steps: [
        "CSV des commandes",
        "Lecture avec pandas",
        "Suppression des doublons",
        "GroupBy par mois",
        "Chiffre d’affaires",
        "Graphique",
      ],
    },
    projectsDetailed: [
      {
        title: "Nettoyer un dataset sale",
        flow: "CSV brut → Valeurs manquantes → Doublons → Types → Dataset propre",
      },
      {
        title: "Analyse exploratoire complète",
        flow: "Dataset → Profilage → Jointures → Agrégations → Rapport",
      },
      {
        title: "Pipeline de séries temporelles",
        flow: "Séries temporelles → Resampling → Tendances → Prévisions → Dashboard",
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
    howItWorksTitle: "De la donnée à la conclusion fiable",
    howItWorks: ["QUESTION", "ÉCHANTILLON", "DISTRIBUTION", "HYPOTHÈSE", "TEST", "INTERVALLE", "CONCLUSION"],
    example: {
      title: "Analyser un A/B test",
      steps: [
        "Deux versions",
        "Groupes aléatoires",
        "Taux de conversion",
        "Test statistique",
        "Significativité",
        "Décision",
      ],
    },
    projectsDetailed: [
      {
        title: "Étude statistique d’un dataset",
        flow: "Dataset → Distributions → Corrélations → Intervalles → Conclusions",
      },
      {
        title: "A/B test analysé proprement",
        flow: "Hypothèse → Échantillonnage → Collecte → Test → Décision",
      },
      {
        title: "Détecter les biais",
        flow: "Données → Échantillon → Biais identifiés → Correction → Résultats fiables",
      },
    ],
  },
  // ----------------------------------------------------------- scikit-learn
  "scikit-learn": {
  setup: {
    install: [
      "`pip install scikit-learn` (dépendances numpy/scipy installées automatiquement).",
      "Vérifier : `python -c \"import sklearn; print(sklearn.__version__)\"`.",
    ],
    configure: [
      "Aucun fichier de config : l'API est uniforme (`fit` / `predict` / `score`).",
      "Fixer `random_state` sur les modèles et les splits pour la reproductibilité.",
    ],
    workflow: [
      "Découper : `from sklearn.model_selection import train_test_split` puis `X_train, X_test, y_train, y_test = train_test_split(X, y)`.",
      "Entraîner : `from sklearn.ensemble import RandomForestClassifier` → `clf = RandomForestClassifier()` → `clf.fit(X_train, y_train)`.",
      "Prédire et évaluer : `clf.predict(X_test)`, `clf.score(X_test, y_test)`.",
    ],
    editors: [
      "VS Code : extensions « Python » et « Jupyter » (Microsoft).",
      "Alternative : PyCharm.",
    ],
  },
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
    howItWorksTitle: "Du dataset au modèle évalué",
    howItWorks: ["DONNÉES", "PREPROCESSING", "SPLIT", "ENTRAÎNEMENT", "VALIDATION", "MÉTRIQUES", "PRÉDICTION"],
    example: {
      title: "Prédire des prix immobiliers",
      steps: [
        "Dataset de logements",
        "Encodage des variables",
        "Régression linéaire",
        "Validation croisée",
        "Erreur mesurée",
        "Prédiction",
      ],
    },
    projectsDetailed: [
      {
        title: "Pipeline de classification complet",
        flow: "Dataset → Preprocessing → Pipeline → Grid search → Modèle évalué",
      },
      {
        title: "Comparatif de modèles",
        flow: "Données → Plusieurs estimators → Cross-validation → Métriques → Meilleur modèle",
      },
      {
        title: "Détection de fraude",
        flow: "Transactions → Features → Classification → Seuil → Alertes",
      },
    ],
  },
  // --------------------------------------------------------------- pytorch
  pytorch: {
  setup: {
    install: [
      "CPU : `pip install torch` (suivre pytorch.org/get-started pour la commande exacte selon l'OS).",
      "GPU NVIDIA : `pip install torch --index-url https://download.pytorch.org/whl/cu121` (adapter `cu121` à la version CUDA).",
      "Vérifier : `python -c \"import torch; print(torch.cuda.is_available())\"`.",
    ],
    configure: [
      "Choisir l'appareil une fois : `device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')`.",
      "Déplacer modèle et tenseurs : `model.to(device)`, `x.to(device)`.",
      "Ajouter `torchvision` si vision : `pip install torchvision` (même index CUDA).",
    ],
    workflow: [
      "Tenseurs : `torch.tensor([1., 2.])`, `torch.randn(3, 3)`.",
      "Données : `from torch.utils.data import DataLoader`, itérer par batch.",
      "Boucle d'entraînement : `loss.backward()` → `optimizer.step()` → `optimizer.zero_grad()`.",
    ],
    editors: [
      "VS Code : extensions « Python » et « Jupyter » (Microsoft).",
      "Alternative : PyCharm.",
    ],
  },
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
    howItWorksTitle: "Du tenseur au modèle entraîné",
    howItWorks: ["TENSEURS", "MODULE", "FORWARD", "PERTE", "BACKWARD", "OPTIMISEUR", "CHECKPOINT"],
    example: {
      title: "Classifieur d’images simple",
      steps: [
        "Dataset MNIST",
        "DataLoader",
        "Réseau convolutif",
        "Boucle d’entraînement",
        "Précision mesurée",
        "Sauvegarde du modèle",
      ],
    },
    projectsDetailed: [
      {
        title: "Réseau de neurones from scratch",
        flow: "Tenseurs → Module custom → Boucle d’entraînement → GPU → Modèle entraîné",
      },
      {
        title: "Fine-tuner un modèle",
        flow: "Modèle pré-entraîné → Dataset → Fine-tuning → Évaluation → Déploiement",
      },
      {
        title: "Classifieur entraîné sur GPU",
        flow: "Dataset → DataLoader → Entraînement GPU → Checkpoints → Évaluation",
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
    howItWorksTitle: "Du texte aux tokens à la prédiction",
    howItWorks: ["TEXTE", "TOKENISATION", "EMBEDDINGS", "ATTENTION", "COUCHES", "PRÉDICTION", "DÉCODAGE"],
    example: {
      title: "Résumer un article",
      steps: [
        "Article long",
        "Tokenisation",
        "Modèle BART",
        "Inférence",
        "Résumé généré",
        "Évaluation",
      ],
    },
    projectsDetailed: [
      {
        title: "Fine-tuner un modèle Hugging Face",
        flow: "Dataset → Tokenizer → Fine-tuning → Évaluation → Modèle adapté",
      },
      {
        title: "Chatbot avec un modèle open source",
        flow: "Modèle → Prompt → Inférence → Mémoire → Chatbot",
      },
      {
        title: "Traduction automatique",
        flow: "Phrases → Tokenizer → Modèle seq2seq → Inférence → Texte traduit",
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
    howItWorksTitle: "De la question à la réponse sourcée",
    howItWorks: ["QUESTION", "EMBEDDING", "RECHERCHE", "CHUNKS", "CONTEXTE", "LLM", "RÉPONSE"],
    example: {
      title: "Chatbot sur une documentation",
      steps: [
        "Documents PDF",
        "Découpage en chunks",
        "Index vectoriel",
        "Question utilisateur",
        "Passages retrouvés",
        "Réponse avec sources",
      ],
    },
    projectsDetailed: [
      {
        title: "Chatbot sur votre documentation",
        flow: "Docs → Chunking → Embeddings → Base vectorielle → Chatbot",
      },
      {
        title: "Moteur de recherche sémantique",
        flow: "Corpus → Index → Requête → Similarité → Résultats",
      },
      {
        title: "Pipeline RAG évalué",
        flow: "Questions test → Réponses → Métriques → Ajustements → Pipeline fiable",
      },
    ],
  },
  // -------------------------------------------------------- computer-vision
  "computer-vision": {
  setup: {
    install: [
      "`pip install opencv-python numpy matplotlib` (le paquet s'importe avec `import cv2`).",
      "Ajouter un framework DL : `pip install torch torchvision` ou `pip install tensorflow`.",
      "Vérifier : `python -c \"import cv2; print(cv2.__version__)\"`.",
    ],
    configure: [
      "Dossier `images/` pour les fichiers de test ; index `0` = webcam par défaut.",
      "Rien d'autre à configurer : OpenCV fonctionne dès l'installation.",
    ],
    workflow: [
      "Lire et afficher : `img = cv2.imread('photo.jpg')`, `cv2.imshow('vue', img)`, `cv2.waitKey(0)`.",
      "Attention : OpenCV lit en BGR — convertir pour matplotlib : `cv2.cvtColor(img, cv2.COLOR_BGR2RGB)`.",
      "Vidéo/webcam : `cap = cv2.VideoCapture(0)`, lire les frames en boucle, libérer avec `cap.release()`.",
    ],
    editors: [
      "VS Code : extensions « Python » et « Jupyter » (Microsoft) pour visualiser les images en notebook.",
      "Alternative : PyCharm.",
    ],
  },
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
    howItWorksTitle: "Du pixel à la scène comprise",
    howItWorks: ["IMAGE", "PRÉTRAITEMENT", "CNN", "FEATURES", "DÉTECTION", "BOÎTES", "DÉCISION"],
    example: {
      title: "Détecter des objets en temps réel",
      steps: [
        "Flux webcam",
        "Modèle YOLO",
        "Inférence par frame",
        "Boîtes englobantes",
        "Labels",
        "Alertes",
      ],
    },
    projectsDetailed: [
      {
        title: "Détecteur d’objets temps réel",
        flow: "Caméra → Prétraitement → YOLO → Tracking → Interface",
      },
      {
        title: "Tri automatique de photos",
        flow: "Photos → Classification → Tags → Dossiers → Galerie triée",
      },
      {
        title: "Segmentation d’images médicales",
        flow: "Scans → Annotation → U-Net → Masques → Diagnostic assisté",
      },
    ],
  },
  // ------------------------------------------------------------------- nlp
  nlp: {
  setup: {
    install: [
      "Créer un environnement virtuel : `python -m venv .venv` puis `source .venv/bin/activate`.",
      "Installer spaCy et un modèle : `pip install spacy` puis `python -m spacy download fr_core_news_sm`.",
      "Installer les Transformers : `pip install transformers torch`.",
      "Optionnel : `pip install nltk` pour les outils classiques du TAL.",
    ],
    configure: [
      "Fixer les versions dans `requirements.txt` (`pip freeze > requirements.txt`).",
      "Télécharger les données NLTK utiles : `python -c \"import nltk; nltk.download('punkt')\"`.",
      "Stocker les modèles lourds hors du dépôt (dossier `models/` ignoré par Git).",
    ],
    workflow: [
      "Tester un pipeline spaCy : `python -c \"import spacy; nlp = spacy.load('fr_core_news_sm'); print([(t.text, t.pos_) for t in nlp('Bonjour le monde')])\"`.",
      "Charger un modèle Hugging Face : `from transformers import pipeline; ner = pipeline('ner', model='Jean-Baptiste/camembert-ner')`.",
      "Évaluer sur un jeu de test avant chaque changement de modèle ou de paramètres.",
    ],
    editors: [
      "VS Code + extensions « Python » et « Jupyter » pour les notebooks d'expérimentation.",
      "Alternatives : JupyterLab (exploration interactive), PyCharm (projets lourds).",
    ],
  },
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
    howItWorksTitle: "Du texte brut à l’information extraite",
    howItWorks: ["TEXTE", "NETTOYAGE", "TOKENISATION", "EMBEDDINGS", "MODÈLE", "EXTRACTION", "RÉSULTAT"],
    example: {
      title: "Analyser des sentiments clients",
      steps: [
        "Avis clients",
        "Nettoyage du texte",
        "Classification",
        "Scores de sentiment",
        "Agrégation",
        "Rapport",
      ],
    },
    projectsDetailed: [
      {
        title: "Analyseur de sentiments",
        flow: "Avis → Prétraitement → Modèle → Scores → Dashboard",
      },
      {
        title: "Résumeur d’articles",
        flow: "Articles → Extraction → Résumé → Évaluation → Flux automatisé",
      },
      {
        title: "Extracteur d’entités nommées",
        flow: "Documents → Tokenisation → NER → Entités → Base structurée",
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
    howItWorksTitle: "Le voyage d’un paquet sur le réseau",
    howItWorks: ["RÉSOLUTION DNS", "CONNEXION TCP", "DÉCOUPAGE", "ROUTAGE", "COMMUTATION", "RÉASSEMBLAGE"],
    example: {
      title: "Un site qui ne répond plus",
      steps: [
        "Ping de la passerelle",
        "Vérification DNS",
        "Traceroute vers la cible",
        "Analyse des routes",
        "Contrôle du firewall",
        "Restauration du service",
      ],
    },
    projectsDetailed: [
      {
        title: "Maquette réseau GNS3",
        flow: "Plan d’adressage → VLAN → Routage inter-VLAN → Tests de connectivité",
      },
      {
        title: "Segmentation d’un LAN",
        flow: "Sous-réseaux → ACL firewall → Isolement des services → Supervision",
      },
      {
        title: "Diagnostic de panne",
        flow: "Symptôme → Ping → Traceroute → Logs → Correctif documenté",
      },
    ],
  },
  // --------------------------------------------------------- github-actions
  "github-actions": {
  setup: {
    install: [
      "Aucune installation : GitHub Actions est inclus dans chaque dépôt GitHub.",
      "Installer la CLI GitHub pour piloter à distance : `brew install gh` puis `gh auth login`.",
    ],
    configure: [
      "Créer le workflow dans `.github/workflows/ci.yml`.",
      "Déclarer le déclencheur (`on: [push, pull_request]`) et l'image (`runs-on: ubuntu-latest`).",
      "Stocker les secrets dans `Settings > Secrets and variables > Actions`, lus via `${{ secrets.NOM }}`.",
    ],
    workflow: [
      "Lister les exécutions : `gh run list`.",
      "Suivre un run en direct : `gh run watch`.",
      "Déclencher manuellement : `gh workflow run ci.yml`.",
      "Itérer : pousser sur une branche, lire les logs, corriger le YAML.",
    ],
    editors: [
      "VS Code + extension « GitHub Actions » (autocomplétion du YAML).",
      "Alternatives : édition directe sur github.com, Neovim + plugin YAML.",
    ],
  },
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
    howItWorksTitle: "Du push au déploiement automatique",
    howItWorks: ["PUSH", "TRIGGER", "RUNNER", "JOBS", "STEPS", "ARTEFACTS", "DÉPLOIEMENT"],
    example: {
      title: "Pipeline CI d’une API Node",
      steps: [
        "Lint du code",
        "Tests unitaires",
        "Build de l’application",
        "Construction de l’image Docker",
        "Push vers le registry",
        "Déploiement en staging",
      ],
    },
    projectsDetailed: [
      {
        title: "CI lint + test + build",
        flow: "Push → Lint → Tests → Build → Badge de statut",
      },
      {
        title: "Déploiement auto sur VPS",
        flow: "Tag → Build image → Push GHCR → SSH → Redémarrage du service",
      },
      {
        title: "Matrice multi-versions",
        flow: "Matrix Node → Tests parallèles → Artefacts → Release GitHub",
      },
    ],
  },
  // -------------------------------------------------------------- gitlab-ci
  "gitlab-ci": {
  setup: {
    install: [
      "Aucune installation : GitLab CI est inclus dans chaque projet GitLab.",
      "Installer la CLI GitLab pour piloter à distance : `brew install glab` puis `glab auth login`.",
    ],
    configure: [
      "Déclarer le pipeline dans `.gitlab-ci.yml` à la racine.",
      "Définir les étapes (`stages: [test, build, deploy]`) et l'image Docker (`image: node:20`).",
      "Stocker les secrets dans `Settings > CI/CD > Variables` (les marquer masked/protected).",
    ],
    workflow: [
      "Lister les pipelines : `glab ci list`.",
      "Voir un pipeline : `glab ci view`.",
      "Relancer un job en échec depuis l'UI ou via `glab ci retry`.",
      "Tester la syntaxe avec l'éditeur de pipeline intégré avant de pousser.",
    ],
    editors: [
      "VS Code + extension « GitLab Workflow ».",
      "Alternatives : Web IDE de GitLab, éditeur de pipeline intégré.",
    ],
  },
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
    howItWorksTitle: "Du commit à la mise en production",
    howItWorks: ["COMMIT", "PIPELINE", "STAGES", "JOBS", "RUNNERS", "ENVIRONNEMENTS", "DÉPLOIEMENT"],
    example: {
      title: "Review app sur une merge request",
      steps: [
        "Merge request ouverte",
        "Pipeline déclenchée",
        "Build et tests",
        "Review app déployée",
        "Revue par l’équipe",
        "Merge → production",
      ],
    },
    projectsDetailed: [
      {
        title: "Pipeline avec review apps",
        flow: "MR → Build → Tests → Review app → Merge → Prod",
      },
      {
        title: "Environnements protégés",
        flow: "Dev → Staging → Approbation manuelle → Production",
      },
      {
        title: "Migration depuis GitHub Actions",
        flow: "Audit des workflows → Traduction du YAML → Runners → Validation",
      },
    ],
  },
  // ------------------------------------------------------------------- aws
  aws: {
  setup: {
    install: [
      "Créer un compte sur aws.amazon.com (offre gratuite 12 mois sur de nombreux services).",
      "Installer la CLI : `brew install awscli`.",
      "Configurer : `aws configure` (clé d'accès, région par défaut).",
      "Vérifier : `aws sts get-caller-identity`.",
    ],
    configure: [
      "Activer une alerte de facturation : console `Billing > Budgets` (budget à 0 € / 1 $).",
      "Comprendre la facturation : chaque service est facturé à l'usage, vérifier `Billing > Bills` régulièrement.",
      "Choisir une région proche (`eu-west-3` Paris) via `aws configure set region`.",
      "Ne jamais commiter les clés : elles vivent dans `~/.aws/credentials`.",
    ],
    workflow: [
      "Lister les buckets S3 : `aws s3 ls`.",
      "Lister les instances EC2 : `aws ec2 describe-instances`.",
      "Déployer via la console ou l'IaC (Terraform), éviter les clics manuels répétés.",
    ],
    editors: [
      "VS Code + extension « AWS Toolkit ».",
      "Alternatives : console web AWS, CloudShell intégré au navigateur.",
    ],
  },
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
    howItWorksTitle: "D’une idée à une infrastructure AWS",
    howItWorks: ["VPC", "EC2", "S3", "RDS", "IAM", "LAMBDA", "CLOUDFRONT"],
    example: {
      title: "Héberger un site statique sur S3",
      steps: [
        "Bucket S3 créé",
        "Fichiers uploadés",
        "Politique d’accès configurée",
        "Distribution CloudFront",
        "Certificat TLS",
        "Enregistrement DNS",
      ],
    },
    projectsDetailed: [
      {
        title: "Site statique sur S3",
        flow: "Bucket → Upload → CloudFront → Domaine → HTTPS",
      },
      {
        title: "API serverless avec Lambda",
        flow: "API Gateway → Lambda → DynamoDB → Déploiement",
      },
      {
        title: "Stack VPC complète",
        flow: "VPC → EC2 → RDS → Load balancer → Auto Scaling",
      },
    ],
  },
  // --------------------------------------------------------------- ansible
  ansible: {
  setup: {
    install: [
      "Installer : `pip install ansible` ou `brew install ansible`.",
      "Vérifier : `ansible --version`.",
    ],
    configure: [
      "Déclarer les serveurs dans `inventory.ini` (ou `hosts`).",
      "Régler les options dans `ansible.cfg` (utilisateur, clé SSH).",
      "Écrire les playbooks en YAML (`site.yml`) avec rôles réutilisables.",
    ],
    workflow: [
      "Tester la connectivité : `ansible all -i inventory.ini -m ping`.",
      "Exécuter : `ansible-playbook -i inventory.ini site.yml`.",
      "Chiffrer les secrets : `ansible-vault encrypt secrets.yml`.",
      "Mode dry-run : `ansible-playbook --check site.yml`.",
    ],
    editors: [
      "VS Code + extension « Ansible » (Red Hat).",
      "Alternatives : édition YAML simple, `ansible-lint` en CI.",
    ],
  },
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
    howItWorksTitle: "D’un inventaire à une flotte configurée",
    howItWorks: ["INVENTAIRE", "PLAYBOOK", "SSH", "MODULES", "TÂCHES", "IDEMPOTENCE", "RÉSULTAT"],
    example: {
      title: "Provisionner un VPS complet",
      steps: [
        "Inventaire des hôtes",
        "Utilisateurs et clés SSH",
        "Installation de Nginx",
        "Certificat TLS",
        "Application déployée",
        "Vérification des services",
      ],
    },
    projectsDetailed: [
      {
        title: "Provisionner un VPS",
        flow: "Inventaire → Playbook → Connexion SSH → Serveur prêt",
      },
      {
        title: "Rôle Ansible réutilisable",
        flow: "Rôle → Variables → Tests Molecule → Publication Galaxy",
      },
      {
        title: "Secrets avec Vault",
        flow: "Playbook → Vault chiffré → Pipeline CI → Déploiement sécurisé",
      },
    ],
  },
  // ----------------------------------------------------------------- nginx
  nginx: {
  setup: {
    install: [
      "Installer : `sudo apt install nginx` (Debian/Ubuntu) ou `brew install nginx` (macOS).",
      "Vérifier : `nginx -v`.",
    ],
    configure: [
      "Configuration principale : `nginx.conf` (ou `/etc/nginx/sites-available/` sur Debian).",
      "Déclarer un reverse proxy : bloc `server` + `location / { proxy_pass http://localhost:3000; }`.",
      "Toujours tester avant de recharger : `nginx -t`.",
    ],
    workflow: [
      "Recharger sans coupure : `nginx -s reload` (ou `sudo systemctl reload nginx`).",
      "Lire les logs : `/var/log/nginx/access.log` et `error.log`.",
      "Déboguer : augmenter `error_log` en mode `debug` temporairement.",
    ],
    editors: [
      "VS Code + extension « Remote - SSH » pour éditer la conf sur le serveur.",
      "Alternatives : édition directe en SSH avec nano/vim.",
    ],
  },
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
    howItWorksTitle: "De la requête au service backend",
    howItWorks: ["REQUÊTE", "TLS", "SERVER BLOCK", "REVERSE PROXY", "UPSTREAM", "CACHE", "RÉPONSE"],
    example: {
      title: "Reverse proxy multi-applications",
      steps: [
        "Domaines pointés",
        "Server blocks configurés",
        "Proxy vers les backends",
        "TLS avec Let’s Encrypt",
        "Compression activée",
        "Logs centralisés",
      ],
    },
    projectsDetailed: [
      {
        title: "Reverse proxy multi-apps",
        flow: "DNS → Server blocks → Upstreams → Services",
      },
      {
        title: "HTTPS avec Let’s Encrypt",
        flow: "Nginx → Certbot → Renouvellement auto → Redirection 443",
      },
      {
        title: "Load balancing",
        flow: "Upstreams → Health checks → Répartition → Basculement",
      },
    ],
  },
  // ------------------------------------------------------------ prometheus
  prometheus: {
  setup: {
    install: [
      "Installer : `brew install prometheus` ou le binaire depuis prometheus.io.",
      "Alternative Docker : `docker run -p 9090:9090 prom/prometheus`.",
      "Vérifier : ouvrir http://localhost:9090.",
    ],
    configure: [
      "Déclarer les cibles dans `prometheus.yml` (`scrape_configs`).",
      "Exposer `/metrics` sur chaque application surveillée.",
      "Définir des règles d'alerte dans `rules.yml` (optionnel au début).",
    ],
    workflow: [
      "Vérifier les cibles : onglet Status > Targets (http://localhost:9090/targets).",
      "Requêter en PromQL : `up`, `rate(http_requests_total[5m])`.",
      "Explorer les métriques avant d'écrire des alertes.",
    ],
    editors: [
      "VS Code + extension « Remote - SSH » pour éditer `prometheus.yml` sur le serveur.",
      "Alternatives : interface web Prometheus, Grafana pour la visualisation.",
    ],
  },
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
    howItWorksTitle: "De l’exporter à l’alerte",
    howItWorks: ["EXPORTERS", "SCRAPE", "STOCKAGE TSDB", "PROMQL", "RÈGLES", "ALERTMANAGER", "NOTIFICATION"],
    example: {
      title: "Superviser un cluster Kubernetes",
      steps: [
        "Exporters déployés",
        "Targets découvertes",
        "Métriques collectées",
        "Dashboards Grafana",
        "Règles d’alerte",
        "Notification Slack",
      ],
    },
    projectsDetailed: [
      {
        title: "Superviser un serveur",
        flow: "Node exporter → Scrape → Requêtes PromQL → Dashboard",
      },
      {
        title: "Superviser un cluster",
        flow: "kube-prometheus → Targets → Règles → Grafana",
      },
      {
        title: "Alertes avec Alertmanager",
        flow: "Seuils → Règles → Alertmanager → Routage → Astreinte",
      },
    ],
  },
  // ------------------------------------------------------------- postgresql
  postgresql: {
  setup: {
    install: [
      "Installer : `brew install postgresql` puis `brew services start postgresql` (ou `sudo apt install postgresql`).",
      "Alternative Docker : `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=secret postgres`.",
      "Vérifier : `psql --version`.",
    ],
    configure: [
      "Créer base et utilisateur : `createdb <nom>` et `createuser <nom>`.",
      "Réglages serveur dans `postgresql.conf`, accès réseau dans `pg_hba.conf`.",
      "Stocker l'URL de connexion (`postgres://user:pass@localhost:5432/db`) en variable d'environnement.",
    ],
    workflow: [
      "Ouvrir le client : `psql -U postgres`.",
      "Explorer : `\\l` (bases), `\\dt` (tables), `\\d <table>` (schéma).",
      "Sauvegarder / restaurer : `pg_dump <db> > backup.sql`, `psql <db> < backup.sql`.",
    ],
    editors: [
      "VS Code + extension « PostgreSQL » (Chris Kolkman).",
      "Alternatives : DBeaver, pgAdmin, psql en terminal.",
    ],
  },
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
    howItWorksTitle: "De la requête SQL au résultat",
    howItWorks: ["CONNEXION", "PARSE", "PLANIFICATEUR", "INDEX", "EXÉCUTION", "RÉSULTAT"],
    example: {
      title: "Recherche produit instantanée",
      steps: [
        "Requête utilisateur",
        "Index GIN",
        "Recherche full-text",
        "Tri par pertinence",
        "Résultats en JSON",
        "Affichage",
      ],
    },
    projectsDetailed: [
      {
        title: "Schéma e-commerce optimisé",
        flow: "Modélisation → Migrations → Index → Contraintes → EXPLAIN",
      },
      {
        title: "Recherche full-text sur un catalogue",
        flow: "Données → ts_vector → Index GIN → API de recherche → Tuning",
      },
      {
        title: "Réplication primaire / réplica",
        flow: "Configuration → Streaming → Réplica lecture → Bascule → Monitoring",
      },
    ],
  },
  // --------------------------------------------------------------- mongodb
  mongodb: {
  setup: {
    install: [
      "Via Docker : `docker run --name mongo -p 27017:27017 -d mongo:7`.",
      "Natif : paquet `mongodb-org` depuis le dépôt officiel (Debian/Ubuntu, voir mongodb.com).",
      "Vérifier : `mongosh --version`.",
    ],
    configure: [
      "Fichier `mongod.conf` (`/etc/mongod.conf`) : `net.bindIp`, `storage.dbPath`.",
      "Créer un admin : `db.createUser({user:\"admin\", pwd:\"...\", roles:[\"root\"]})` dans la base `admin`.",
      "Activer l'authentification : `security.authorization: enabled`.",
    ],
    workflow: [
      "Shell : `mongosh \"mongodb://localhost:27017\"`.",
      "Requêtes : `show dbs`, `db.users.find()`, `db.users.createIndex({email:1})`.",
      "Sauvegarder : `mongodump --out=./dump` ; restaurer : `mongorestore ./dump`.",
    ],
    editors: [
      "VS Code + « MongoDB for VS Code » (MongoDB, officiel) : playgrounds et exploration.",
      "Alternatives : MongoDB Compass (GUI officiel), Studio 3T.",
    ],
  },
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
    howItWorksTitle: "Du document au résultat d’agrégation",
    howItWorks: ["DOCUMENT", "COLLECTION", "REQUÊTE", "INDEX", "AGRÉGATION", "RÉSULTAT"],
    example: {
      title: "Catalogue produit flexible",
      steps: [
        "Document JSON",
        "Collection produits",
        "Index composé",
        "Pipeline d’agrégation",
        "Jointure $lookup",
        "Résultat paginé",
      ],
    },
    projectsDetailed: [
      {
        title: "API REST avec Mongoose",
        flow: "Modèles → Validation → CRUD → Index → Déploiement",
      },
      {
        title: "Dashboard analytique",
        flow: "Données → Pipeline d’agrégation → Facettes → API → Frontend",
      },
      {
        title: "Replica set local",
        flow: "Configuration → Réplication → Bascule → Monitoring",
      },
    ],
  },
  // ----------------------------------------------------------------- redis
  redis: {
  setup: {
    install: [
      "Via Docker : `docker run --name redis -p 6379:6379 -d redis:7`.",
      "Natif : `sudo apt install redis-server`.",
      "Vérifier : `redis-cli ping` (répond `PONG`).",
    ],
    configure: [
      "Fichier `redis.conf` : `bind`, `port 6379`, `requirepass <mot-de-passe>`.",
      "Persistance : `appendonly yes` (AOF) pour ne pas perdre les données.",
      "Mémoire : `maxmemory 256mb` et `maxmemory-policy allkeys-lru`.",
    ],
    workflow: [
      "CLI : `redis-cli` puis `SET`, `GET`, `EXPIRE`, `TTL`.",
      "Inspecter : `INFO`, `KEYS prefix:*` (développement uniquement).",
      "Observer en direct : `redis-cli MONITOR` ; vider (dev) : `FLUSHDB`.",
    ],
    editors: [
      "VS Code + « Redis for VS Code » (Redis, officiel) : explorer les clés, exécuter des commandes.",
      "Alternatives : RedisInsight (GUI officiel), Another Redis Desktop Manager.",
    ],
  },
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
    howItWorksTitle: "Le cycle de vie d’une clé en cache",
    howItWorks: ["SET", "TTL", "LECTURE", "HIT", "MISS", "INVALIDATION", "EXPIRATION"],
    example: {
      title: "Cache d’API avec invalidation",
      steps: [
        "Requête API",
        "Clé en cache",
        "Hit ou miss",
        "TTL de 5 minutes",
        "Invalidation à l’écriture",
        "Données fraîches",
      ],
    },
    projectsDetailed: [
      {
        title: "Cache de session",
        flow: "Connexion → SETEX → Lecture → TTL → Expiration",
      },
      {
        title: "Leaderboard temps réel",
        flow: "Scores → Sorted set → Classement → Pub/Sub → Temps réel",
      },
      {
        title: "Rate limiter",
        flow: "Compteur → Fenêtre glissante → Blocage → Headers → Tests",
      },
    ],
  },
  // -------------------------------------------------------- data-engineering
  "data-engineering": {
  setup: {
    install: [
      "Docker Desktop (indispensable pour Airflow, Spark ou Kafka en local).",
      "Python 3.11+ : `python3 --version`.",
      "Librairies de base : `pip install pandas pyarrow sqlalchemy`.",
    ],
    configure: [
      "Environnement virtuel : `python -m venv .venv && source .venv/bin/activate`.",
      "Dépendances épinglées dans `requirements.txt` ou `pyproject.toml`.",
      "Connexions aux bases dans un fichier `.env` (jamais commité).",
    ],
    workflow: [
      "Lancer un pipeline : `python pipeline.py`.",
      "Explorer un fichier local : `pip install duckdb` puis `duckdb data.duckdb`.",
      "Orchestrer en local : Airflow via Docker Compose (fichier officiel sur airflow.apache.org).",
      "Valider les données en sortie : compter les lignes, vérifier les valeurs nulles.",
    ],
    editors: [
      "VS Code + « Python » (Microsoft) et « Jupyter » (Microsoft).",
      "Alternatives : PyCharm, DBeaver (explorer les bases), interface web d'Airflow (navigateur).",
    ],
  },
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
    howItWorksTitle: "De la source brute au dashboard",
    howItWorks: ["INGESTION", "STOCKAGE BRUT", "CHARGEMENT", "TRANSFORMATION", "ORCHESTRATION", "CONSOMMATION"],
    example: {
      title: "Pipeline ELT quotidien",
      steps: [
        "Extraction via API",
        "Stockage brut S3",
        "Chargement du warehouse",
        "Transformation dbt",
        "Tests de qualité",
        "Dashboard BI",
      ],
    },
    projectsDetailed: [
      {
        title: "Pipeline ELT avec dbt",
        flow: "Sources → Extraction → Modèles dbt → Tests → Orchestration",
      },
      {
        title: "Warehouse analytique",
        flow: "Schéma en étoile → Chargement → Agrégats → BI → Documentation",
      },
      {
        title: "Streaming temps réel",
        flow: "Kafka → Transformation → Sink → Monitoring → Alertes",
      },
    ],
  },
  // ----------------------------------------------------------------- kafka
  kafka: {
  setup: {
    install: [
      "Via Docker (image officielle, mode KRaft, sans ZooKeeper) : `docker run -p 9092:9092 -d apache/kafka:3.8`.",
      "Vérifier : `kafka-topics.sh --bootstrap-server localhost:9092 --list`.",
    ],
    configure: [
      "En Docker : variables `KAFKA_*` ; en natif : `server.properties` (`advertised.listeners`, `num.partitions`).",
      "Créer un topic : `kafka-topics.sh --create --topic events --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1`.",
    ],
    workflow: [
      "Produire : `kafka-console-producer.sh --topic events --bootstrap-server localhost:9092`.",
      "Consommer : `kafka-console-consumer.sh --topic events --from-beginning --bootstrap-server localhost:9092`.",
      "Inspecter : `kafka-topics.sh --describe --topic events --bootstrap-server localhost:9092`.",
    ],
    editors: [
      "VS Code : pas d'extension officielle requise, le terminal suffit.",
      "Interface web : Kafka UI ou Kafdrop en conteneur Docker pour visualiser topics et messages.",
      "Alternative : Conduktor Desktop.",
    ],
  },
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
    howItWorksTitle: "Le parcours d’un événement",
    howItWorks: ["PRODUCER", "TOPIC", "PARTITION", "BROKER", "CONSUMER GROUP", "OFFSET"],
    example: {
      title: "Suivi de commandes en temps réel",
      steps: [
        "Événement commande",
        "Topic orders",
        "Partition par client",
        "Consumer group",
        "Traitement",
        "Offset commité",
      ],
    },
    projectsDetailed: [
      {
        title: "Pipeline de logs temps réel",
        flow: "Producer → Topic → Consumer → Stockage → Dashboard",
      },
      {
        title: "Event sourcing minimal",
        flow: "Événements → Topics → Projection → Replay → Snapshot",
      },
      {
        title: "Connecteur base vers warehouse",
        flow: "Kafka Connect → Schema Registry → Sink → Validation",
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
    howItWorksTitle: "Le cycle d’une requête sécurisée",
    howItWorks: ["REQUÊTE", "VALIDATION", "SESSION", "EN-TÊTES", "SORTIE", "JOURNAL"],
    example: {
      title: "Durcir un formulaire de connexion",
      steps: [
        "Requête POST",
        "Validation des entrées",
        "Requête paramétrée",
        "Session sécurisée",
        "En-têtes HTTP",
        "Journalisation",
      ],
    },
    projectsDetailed: [
      {
        title: "Sécuriser une app DVWA",
        flow: "Scan → Exploitation → Correctif → Re-test → Rapport",
      },
      {
        title: "Audit d’en-têtes de sécurité",
        flow: "Inventaire → Analyse → CSP et HSTS → Déploiement → Vérification",
      },
      {
        title: "Revue de code sécurisée",
        flow: "Checklist OWASP → Revue → Correctifs → Tests → Documentation",
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
    howItWorksTitle: "D’une faille à sa correction",
    howItWorks: ["IDENTIFICATION", "EXPLOITATION", "PREUVE", "REMÉDIATION", "VÉRIFICATION", "VEILLE"],
    example: {
      title: "Corriger une injection SQL",
      steps: [
        "Catégorie A03 du Top 10",
        "Payload d’injection",
        "Preuve d’exploitation",
        "Requête paramétrée",
        "Test de non-régression",
        "Documentation",
      ],
    },
    projectsDetailed: [
      {
        title: "Exploiter puis corriger chaque faille",
        flow: "Lab → Exploitation → Correctif → Vérification",
      },
      {
        title: "Checklist d’audit",
        flow: "Top 10 → Tests → Findings → Priorisation → Rapport",
      },
      {
        title: "Pipeline SAST et DAST",
        flow: "CI → Scan statique → Scan dynamique → Gate → Correctifs",
      },
    ],
  },
  // ------------------------------------------------------------- pentesting
  pentesting: {
  setup: {
    install: [
      "Kali Linux en VM (kali.org) : inclut déjà Nmap, Metasploit, Burp Suite.",
      "Mettre à jour : `sudo apt update && sudo apt full-upgrade -y`.",
      "Tester uniquement des cibles autorisées (lab personnel, programmes bug bounty).",
    ],
    configure: [
      "Lab isolé : VM cible (ex. Metasploitable2) en réseau host-only.",
      "Metasploit : `msfconsole` puis `db_status` pour vérifier la base.",
      "Notes : un dossier par cible (`~/pentest/cible-01/`).",
    ],
    workflow: [
      "Scan : `nmap -A <cible-lab>`.",
      "Exploitation (cible autorisée) : `msfconsole` → `use exploit/...` → `set RHOSTS ...` → `run`.",
      "Rapport : pour chaque finding, noter l'outil, la commande exacte et le résultat.",
    ],
    editors: [
      "VS Code + « Python » (Microsoft) pour les scripts et les rapports.",
      "Alternatives : Burp Suite (web), terminal + `tmux` pour les sessions longues.",
    ],
  },
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
    howItWorksTitle: "Les phases d’un test d’intrusion",
    howItWorks: ["RECONNAISSANCE", "SCANNING", "EXPLOITATION", "POST-EXPLOITATION", "REPORTING", "REMÉDIATION"],
    example: {
      title: "Pentest d’une VM vulnérable",
      steps: [
        "Reconnaissance passive",
        "Scan de ports",
        "Énumération",
        "Exploitation",
        "Élévation de privilèges",
        "Rapport",
      ],
    },
    projectsDetailed: [
      {
        title: "Pentest d’un lab vulnérable",
        flow: "Scope → Recon → Exploitation → Post-exploit → Rapport",
      },
      {
        title: "Rapport de pentest professionnel",
        flow: "Findings → CVSS → Preuves → Recommandations → Re-test",
      },
      {
        title: "Chaîne d’attaque complète",
        flow: "Phishing simulé → Accès initial → Mouvement latéral → Timeline",
      },
    ],
  },
  // ------------------------------------------------------------------- ros
  ros: {
  setup: {
    install: [
      "ROS 2 (Jazzy, Ubuntu 24.04) : ajouter le dépôt `packages.ros.org` (voir docs.ros.org).",
      "`sudo apt install ros-jazzy-desktop`.",
      "Sourcer l'environnement : `source /opt/ros/jazzy/setup.bash` ; vérifier : `ros2 --help`.",
    ],
    configure: [
      "Workspace : `mkdir -p ~/ros2_ws/src && cd ~/ros2_ws && colcon build`.",
      "Ajouter `source /opt/ros/jazzy/setup.bash` et `source ~/ros2_ws/install/setup.bash` dans `~/.bashrc`.",
      "Créer un paquet : `ros2 pkg create --build-type ament_python mon_paquet`.",
    ],
    workflow: [
      "Lancer un nœud : `ros2 run mon_paquet mon_noeud`.",
      "Lister : `ros2 node list`, `ros2 topic list` ; écouter : `ros2 topic echo /chatter`.",
      "Simuler : Gazebo (`sudo apt install ros-jazzy-ros-gz`).",
      "Visualiser : `rviz2`.",
    ],
    editors: [
      "VS Code + « ROS » (Microsoft) et « C/C++ » (Microsoft).",
      "Alternatives : terminaux multiples + `rqt`, RViz (inclus dans ROS).",
    ],
  },
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
    howItWorksTitle: "Du capteur au mouvement du robot",
    howItWorks: ["CAPTEUR", "TOPIC", "NODE", "TRAITEMENT", "COMMANDE", "ACTIONNEUR"],
    example: {
      title: "Robot simulé qui navigue",
      steps: [
        "Robot dans Gazebo",
        "Topic /scan du LiDAR",
        "Node de cartographie",
        "Plan global",
        "Plan local",
        "Commande /cmd_vel",
        "Robot en mouvement",
      ],
    },
    projectsDetailed: [
      {
        title: "Premier robot simulé",
        flow: "URDF → Gazebo → Nodes ROS → Topics → Simulation",
      },
      {
        title: "Robot qui navigue",
        flow: "LiDAR → SLAM → Stack navigation → Trajectoire → Déplacement",
      },
      {
        title: "Bras robotique contrôlé",
        flow: "URDF du bras → Services ROS → Planification → Commande → Mouvement réel",
      },
    ],
  },
  // -------------------------------------------------------------- embedded
  embedded: {
  setup: {
    install: [
      "Toolchain ARM : `sudo apt install gcc-arm-none-eabi`.",
      "Alternative Arduino : installer l'Arduino IDE ou PlatformIO.",
      "Flash/debug : `sudo apt install openocd`.",
    ],
    configure: [
      "Projet PlatformIO : `pio init --board <carte>` ; régler `platformio.ini` (`platform`, `board`, `framework`).",
      "Bare-metal : `Makefile` + script de link dédié à la cible.",
      "Port série : ajouter l'utilisateur au groupe `dialout` (`sudo usermod -aG dialout $USER`).",
    ],
    workflow: [
      "Compiler : `pio run` ; flasher : `pio run -t upload`.",
      "Console série : `pio device monitor -b 115200`.",
      "Debug : `openocd` + `gdb-multiarch` connecté à la cible.",
    ],
    editors: [
      "VS Code + « PlatformIO IDE » (PlatformIO) et « C/C++ » (Microsoft).",
      "Alternatives : STM32CubeIDE (officiel ST), Arduino IDE 2.",
    ],
  },
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
    howItWorksTitle: "Du code source au microcontrôleur",
    howItWorks: ["SOURCE", "CROSS-COMPILATION", "FLASH", "BOOT", "BOUCLE PRINCIPALE", "INTERRUPTIONS"],
    example: {
      title: "Firmware Arduino/ESP32",
      steps: [
        "Capteur de température",
        "Code Arduino",
        "Compilation croisée",
        "Upload du firmware",
        "Mesure périodique",
        "Envoi en Wi-Fi",
        "Données sur dashboard",
      ],
    },
    projectsDetailed: [
      {
        title: "Firmware Arduino/ESP32",
        flow: "Capteur → Code C → Flash → Mesures → Port série",
      },
      {
        title: "Objet connecté complet",
        flow: "ESP32 → Wi-Fi → MQTT → Broker → Dashboard",
      },
      {
        title: "Multitâche temps réel",
        flow: "FreeRTOS → Tâches → Files → Capteurs → Actuateurs",
      },
    ],
  },
  // ------------------------------------------------------------------ make
  make: {
  setup: {
    install: [
      "SaaS : créer un compte sur make.com, rien à installer.",
      "Application mobile Make (optionnel) pour suivre les exécutions.",
    ],
    configure: [
      "Connecter les applications : « Connections » → OAuth ou clé API.",
      "Organisation : inviter l'équipe dans « Organization ».",
      "Variables réutilisables : « Variables » au niveau du scénario.",
    ],
    workflow: [
      "Créer un scénario : module déclencheur (ex. Webhook) → modules d'action.",
      "Tester : « Run once », inspecter les bundles d'entrée/sortie.",
      "Planifier : « Scheduling » (ex. toutes les 15 minutes).",
      "Suivre les erreurs : « History » et notifications.",
    ],
    editors: [
      "Éditeur visuel web de Make (navigateur).",
      "VS Code pour préparer le JSON ou le JavaScript des modules HTTP.",
      "Alternative : Postman pour tester les API avant de les brancher.",
    ],
  },
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
    howItWorksTitle: "Comment fonctionne un scénario Make",
    howItWorks: ["ÉVÉNEMENT", "SCÉNARIO", "MODULE", "FILTRE", "ROUTEUR", "ACTION"],
    example: {
      title: "Synchroniser CRM et newsletter",
      steps: [
        "Nouveau contact CRM",
        "Module déclencheur",
        "Recherche de doublon",
        "Filtre de validation",
        "Inscription newsletter",
        "Tag mis à jour",
        "Log d’exécution",
      ],
    },
    projectsDetailed: [
      {
        title: "Synchroniser CRM et newsletter",
        flow: "CRM → Déclencheur → Filtre → Newsletter → Confirmation",
      },
      {
        title: "Pipeline de qualification de leads",
        flow: "Formulaire → Enrichissement → Score → Routeur → CRM",
      },
      {
        title: "Traitement de factures",
        flow: "Gmail → OCR → Validation → Comptabilité → Archive",
      },
    ],
  },
  // ---------------------------------------------------------------- zapier
  zapier: {
  setup: {
    install: [
      "SaaS : créer un compte sur zapier.com, rien à installer.",
      "Optionnel : extension navigateur Zapier (Chrome) pour créer des Zaps depuis une page web.",
    ],
    configure: [
      "Connecter les applications : « My Apps » → authentification OAuth ou clé API.",
      "Organiser : dossiers et équipes dans « Settings ».",
    ],
    workflow: [
      "Créer un Zap : Trigger (ex. « New Email ») → Action(s).",
      "Tester chaque étape : « Test step » avant d'activer.",
      "Activer : interrupteur « On » ; surveiller : « Zap History ».",
      "Étapes avancées : « Code by Zapier » (Python ou JavaScript).",
    ],
    editors: [
      "Éditeur web de Zapier (navigateur).",
      "VS Code pour écrire et tester le code des étapes « Code by Zapier ».",
      "Alternative : Postman pour tester les webhooks.",
    ],
  },
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
    howItWorksTitle: "Comment fonctionne un Zap",
    howItWorks: ["ÉVÉNEMENT", "TRIGGER", "DONNÉES", "FILTRE", "ACTION", "HISTORIQUE"],
    example: {
      title: "Sauvegarde auto de pièces jointes",
      steps: [
        "Email reçu",
        "Trigger Gmail",
        "Filtre pièce jointe",
        "Upload vers Drive",
        "Ligne ajoutée dans Sheets",
        "Notification Slack",
      ],
    },
    projectsDetailed: [
      {
        title: "Alertes automatiques",
        flow: "Source → Trigger → Filtre → Action → Notification",
      },
      {
        title: "Sauvegarde auto de pièces jointes",
        flow: "Gmail → Filtre → Drive → Sheets → Archive",
      },
      {
        title: "Reporting hebdomadaire",
        flow: "Planification → Collecte → Formatage → Email → Équipe",
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
    howItWorksTitle: "D’un message clair à un message vérifié",
    howItWorks: ["GÉNÉRATION DE CLÉS", "CHIFFREMENT", "TRANSMISSION", "DÉCHIFFREMENT", "SIGNATURE", "VÉRIFICATION"],
    example: {
      title: "Échanger un message chiffré avec GPG",
      steps: [
        "Génération de la paire de clés",
        "Partage de la clé publique",
        "Chiffrement du message",
        "Envoi",
        "Déchiffrement",
        "Vérification de la signature",
      ],
    },
    projectsDetailed: [
      {
        title: "Chiffrer des messages avec GPG",
        flow: "Clés → Chiffrement → Signature → Échange → Vérification",
      },
      {
        title: "Analyser un certificat TLS",
        flow: "Capture → Chaîne de confiance → Expiration → Algorithmes → Rapport",
      },
      {
        title: "Mini PKI maison",
        flow: "CA racine → Certificats → Révocation → Déploiement → Rotation",
      },
    ],
  },
  // ============================================================ TIER 3 ===
  // ------------------------------------------------------------- tensorflow
  tensorflow: {
  setup: {
    install: [
      "`pip install tensorflow` (CPU et GPU dans le même paquet depuis TF 2.x).",
      "Vérifier : `python -c \"import tensorflow as tf; print(tf.__version__)\"`.",
      "GPU : installer pilote NVIDIA + CUDA/cuDNN compatibles, puis `tf.config.list_physical_devices('GPU')`.",
    ],
    configure: [
      "Rien d'obligatoire : Keras est intégré (`tf.keras`).",
      "Limiter la mémoire GPU si besoin : `tf.config.experimental.set_memory_growth(gpu, True)`.",
      "Fixer la graine : `tf.random.set_seed(42)` pour la reproductibilité.",
    ],
    workflow: [
      "Construire : `model = tf.keras.Sequential([tf.keras.layers.Dense(64, activation='relu'), tf.keras.layers.Dense(10)])`.",
      "Compiler et entraîner : `model.compile(optimizer='adam', loss='mse')` puis `model.fit(X, y, epochs=10)`.",
      "Évaluer et sauvegarder : `model.evaluate(X_test, y_test)`, `model.save('mon_modele.keras')`.",
    ],
    editors: [
      "VS Code : extensions « Python » et « Jupyter » (Microsoft).",
      "Alternative : Google Colab (notebooks avec GPU gratuit) ou PyCharm.",
    ],
  },
    definition:
      "TensorFlow est la plateforme de machine learning de Google : un écosystème complet (Keras, TF Serving, TF Lite) pour entraîner et déployer des modèles en production, du serveur au mobile.",
    whyLearn:
      "TensorFlow excelle là où PyTorch est plus recherche : déploiement industrialisé, mobile et embarqué, pipelines de production. Le connaître ouvre les environnements Google Cloud et les équipes ML orientées production.",
    conceptDetails: [
      {
        name: "Keras",
        definition:
          "L’API haut niveau de TensorFlow : construire et entraîner un réseau de neurones en quelques lignes de code lisible.",
      },
      {
        name: "Graphes",
        definition:
          "La représentation compilée du calcul : TensorFlow transforme le modèle en graphe optimisé pour une exécution rapide.",
      },
      {
        name: "TF Serving",
        definition:
          "Le serveur de déploiement de modèles : exposer un modèle entraîné via une API gRPC ou REST, versionné et scalable.",
      },
      {
        name: "TF Lite",
        definition:
          "Le format allégé pour mobile et embarqué : exécuter un modèle sur téléphone ou microcontrôleur, sans serveur.",
      },
      {
        name: "Pipelines",
        definition:
          "Les pipelines de données et d’entraînement reproductibles : de l’ingestion à l’évaluation, automatisés de bout en bout.",
      },
      {
        name: "Distribution",
        definition:
          "L’entraînement réparti sur plusieurs GPU ou machines : réduire le temps d’entraînement des grands modèles.",
      },
    ],
    howItWorksTitle: "Du modèle Keras au service en production",
    howItWorks: ["DONNÉES", "KERAS", "ENTRAÎNEMENT", "GRAPHE", "EXPORT", "SERVING", "INFÉRENCE"],
    example: {
      title: "Classifier des images en production",
      steps: [
        "Dataset d’images",
        "Modèle Keras",
        "Entraînement",
        "Export SavedModel",
        "TF Serving",
        "API de prédiction",
      ],
    },
    projectsDetailed: [
      {
        title: "Modèle déployé en production",
        flow: "Dataset → Keras → Entraînement → TF Serving → API",
      },
      {
        title: "Classification d’images",
        flow: "Images → CNN → Entraînement → Évaluation → Modèle packagé",
      },
      {
        title: "Inférence mobile avec TF Lite",
        flow: "Modèle → Conversion → Optimisation → App mobile → Inférence locale",
      },
    ],
  },
  // ----------------------------------------------------------------- mlops
  mlops: {
  setup: {
    install: [
      "Installer MLflow : `pip install mlflow`.",
      "Installer DVC pour versionner les données : `pip install dvc`.",
      "Conteneuriser avec Docker : voir la fiche Docker.",
    ],
    configure: [
      "Initialiser DVC dans le dépôt : `dvc init`.",
      "Déclarer le backend de suivi MLflow (`mlruns/` local ou serveur distant).",
      "Versionner les jeux de données : `dvc add data/`, jamais de CSV dans Git.",
    ],
    workflow: [
      "Lancer l'interface MLflow : `mlflow ui` (puis http://localhost:5000).",
      "Logger paramètres et métriques dans le code d'entraînement (`mlflow.log_param`, `mlflow.log_metric`).",
      "Comparer les runs dans l'UI et enregistrer le meilleur modèle (`mlflow.register_model`).",
      "Reconstruire l'image d'inférence et la tester avant déploiement.",
    ],
    editors: [
      "VS Code + extensions « Python » et « Docker ».",
      "Alternatives : JupyterLab pour l'expérimentation, interface web MLflow pour le suivi.",
    ],
  },
    definition:
      "Le MLOps applique les principes DevOps au machine learning : versionner données et modèles, automatiser l’entraînement et le déploiement, surveiller les modèles en production.",
    whyLearn:
      "Un modèle qui reste dans un notebook ne crée aucune valeur. Le MLOps est ce qui transforme une expérimentation en produit fiable : sans lui, les projets ML meurent en phase pilote.",
    conceptDetails: [
      {
        name: "Versioning",
        definition:
          "Tracer chaque version du modèle, des données et du code : reproduire n’importe quelle prédiction passée à l’identique.",
      },
      {
        name: "Pipelines",
        definition:
          "Les chaînes automatisées d’entraînement : données, features, entraînement, évaluation, exécutées de façon reproductible.",
      },
      {
        name: "Déploiement",
        definition:
          "Mettre un modèle à disposition : API, batch ou embarqué, avec rollback possible en cas de problème.",
      },
      {
        name: "Monitoring",
        definition:
          "Surveiller le modèle en production : qualité des prédictions, latence, dérive des données d’entrée.",
      },
      {
        name: "Feature stores",
        definition:
          "Le répertoire central des features : les mêmes transformations en entraînement et en production, sans décalage.",
      },
      {
        name: "CI/CD ML",
        definition:
          "L’intégration et le déploiement continus appliqués au ML : tester et livrer les modèles comme du code.",
      },
    ],
    howItWorksTitle: "Du notebook au modèle surveillé en production",
    howItWorks: ["EXPÉRIMENTATION", "VERSIONING", "PIPELINE", "CI/CD", "DÉPLOIEMENT", "MONITORING", "RÉENTRAÎNEMENT"],
    example: {
      title: "Surveiller la dérive d’un modèle",
      steps: [
        "Modèle en production",
        "Logs de prédictions",
        "Comparaison statistique",
        "Dérive détectée",
        "Alerte",
        "Réentraînement",
      ],
    },
    projectsDetailed: [
      {
        title: "Pipeline ML de bout en bout",
        flow: "Données → Entraînement → Registry → Déploiement → Monitoring",
      },
      {
        title: "Monitoring de dérive de modèle",
        flow: "Prédictions → Métriques → Dérive → Alerte → Réentraînement",
      },
      {
        title: "CI/CD pour le ML",
        flow: "Commit → Tests → Entraînement → Validation → Déploiement auto",
      },
    ],
  },
  // ------------------------------------------------------- container-registry
  "container-registry": {
    definition:
      "Un container registry est un dépôt qui stocke, versionne et distribue les images de conteneurs : le point de passage entre le build et le déploiement, avec scan de vulnérabilités et gestion des accès.",
    whyLearn:
      "Aucun déploiement sérieux ne se fait sans registry : c’est lui qui garantit que la production exécute exactement l’image testée, et qui sécurise la chaîne d’approvisionnement logicielle.",
    conceptDetails: [
      {
        name: "Tags",
        definition:
          "Une étiquette posée sur une image : « latest » pour le développement, un numéro semver pour une version déployable et traçable.",
      },
      {
        name: "Vulnérabilités",
        definition:
          "Les registres scannent chaque couche de l’image et listent les CVE connues : un rapport à consulter avant chaque déploiement.",
      },
      {
        name: "Permissions",
        definition:
          "Les permissions contrôlent qui peut lire, écrire ou administrer le registre : dépôt public, privé, ou accès limité à une équipe.",
      },
      {
        name: "GHCR",
        definition:
          "Le registre de conteneurs de GitHub, intégré aux repositories et aux workflows Actions : push authentifié par token.",
      },
      {
        name: "Docker Hub",
        definition:
          "Le registre public de référence : des millions d’images officielles et communautaires, point de départ de presque tous les Dockerfiles.",
      },
      {
        name: "Nettoyage",
        definition:
          "La purge régulière des tags obsolètes et des images non utilisées : elle limite le stockage, les coûts et la surface d’attaque.",
      },
    ],
    howItWorksTitle: "Du build à la distribution d’image",
    howItWorks: ["BUILD", "TAG", "PUSH", "SCAN", "SIGNATURE", "PULL", "DÉPLOIEMENT"],
    example: {
      title: "Publier une image versionnée",
      steps: [
        "Build en local",
        "Tag semver",
        "Push vers GHCR",
        "Scan de vulnérabilités",
        "Validation du rapport",
        "Pull en CI",
        "Déploiement",
      ],
    },
    projectsDetailed: [
      {
        title: "Publier une image versionnée",
        flow: "Build → Tag → Push GHCR → Référence épinglée",
      },
      {
        title: "Scanner ses images",
        flow: "Push → Scan → Rapport CVE → Correctif → Rebuild",
      },
      {
        title: "Politique de nettoyage",
        flow: "Tags datés → Règles de rétention → Purge → Coûts maîtrisés",
      },
    ],
  },
  // ------------------------------------------------------------------ helm
  helm: {
  setup: {
    install: [
      "Installer Helm : `brew install helm` (ou le binaire depuis helm.sh).",
      "Vérifier : `helm version`.",
    ],
    configure: [
      "Structure d'un chart : `Chart.yaml`, `values.yaml`, dossier `templates/`.",
      "Paramétrer via `values.yaml` (image, replicas, ingress).",
      "Surcharger à l'installation avec `--set` ou `-f values-prod.yaml`.",
    ],
    workflow: [
      "Ajouter un dépôt : `helm repo add bitnami https://charts.bitnami.com/bitnami` puis `helm repo update`.",
      "Installer : `helm install <nom> bitnami/<chart>`.",
      "Mettre à jour : `helm upgrade <nom> bitnami/<chart> -f values.yaml`.",
      "Lister / désinstaller : `helm list`, `helm uninstall <nom>`.",
    ],
    editors: [
      "VS Code + extension « Kubernetes » (support des charts Helm).",
      "Alternatives : édition YAML simple, templates testés avec `helm template`.",
    ],
  },
    definition:
      "Helm est le gestionnaire de paquets de Kubernetes : il package des applications en « charts » versionnés et paramétrables, installables et mis à jour en une commande au lieu de YAML écrits à la main.",
    whyLearn:
      "Helm évite de maintenir des centaines de fichiers YAML : un chart paramétrable déploie la même application en dev, staging et prod. C’est le standard pour distribuer et opérer des apps sur Kubernetes.",
    conceptDetails: [
      {
        name: "Charts",
        definition:
          "Un chart est un paquet Helm : l’ensemble des manifestes Kubernetes d’une application, versionné et partageable.",
      },
      {
        name: "Values",
        definition:
          "Le fichier values.yaml contient les paramètres d’un chart : image, replicas, ressources — ce qui change entre dev et prod.",
      },
      {
        name: "Templates",
        definition:
          "Les templates sont des manifestes YAML avec des variables : Helm les rend avec les values pour générer les ressources finales.",
      },
      {
        name: "Releases",
        definition:
          "Une release est une instance installée d’un chart : chaque upgrade crée une révision, avec rollback en une commande.",
      },
      {
        name: "Repositories",
        definition:
          "Les repositories hébergent des charts partageables, publics ou privés : le catalogue d’où l’on installe Prometheus, Redis ou ingress-nginx.",
      },
      {
        name: "Hooks",
        definition:
          "Les hooks exécutent des jobs à des moments précis du cycle de vie (pré-install, post-upgrade) : migrations de base, sauvegardes, tests.",
      },
    ],
    howItWorksTitle: "Du chart au déploiement Kubernetes",
    howItWorks: ["CHART", "VALUES", "TEMPLATE", "RENDER", "RELEASE", "INSTALL", "UPGRADE"],
    example: {
      title: "Créer un chart pour son application",
      steps: [
        "Scaffolding du chart",
        "Templates paramétrés",
        "Values par défaut",
        "Lint et tests",
        "Packaging",
        "Install sur le cluster",
        "Upgrade",
      ],
    },
    projectsDetailed: [
      {
        title: "Créer un chart pour son app",
        flow: "Chart → Templates → Values → Install → Release",
      },
      {
        title: "Déployer une stack via charts publics",
        flow: "Repo → Recherche → Values custom → Install → Upgrade",
      },
      {
        title: "Releases multi-environnements",
        flow: "Values dev → Values prod → Diff → Rollback",
      },
    ],
  },
  // ---------------------------------------------------------- k8s-operators
  "k8s-operators": {
    definition:
      "Les Operators sont des contrôleurs Kubernetes qui pilotent des applications complexes (bases de données, files) : ils étendent l’API Kubernetes avec des ressources custom et une logique de réconciliation automatique.",
    whyLearn:
      "Les Operators sont le niveau expert de Kubernetes : ils encapsulent l’expertise opérationnelle d’une application en code. Les comprendre, c’est passer d’utilisateur à concepteur de plateformes.",
    conceptDetails: [
      {
        name: "CRD",
        definition:
          "Une Custom Resource Definition étend l’API Kubernetes avec un nouveau type d’objet : la base sur laquelle un opérateur agit.",
      },
      {
        name: "Contrôleurs",
        definition:
          "Un contrôleur observe les ressources et agit en conséquence : il traduit l’état désiré en actions concrètes sur le cluster.",
      },
      {
        name: "Reconciliation",
        definition:
          "La boucle de réconciliation compare en permanence l’état réel à l’état désiré et corrige les écarts : scale, redémarre, reprovisionne.",
      },
      {
        name: "OLM",
        definition:
          "L’Operator Lifecycle Manager gère l’installation, les mises à jour et les dépendances des opérateurs sur un cluster.",
      },
      {
        name: "Patterns",
        definition:
          "Les patterns d’opérateurs codifient les bonnes pratiques : un opérateur par application, état stocké dans les CR, actions idempotentes.",
      },
      {
        name: "SDK",
        definition:
          "L’Operator SDK fournit les outils pour générer un opérateur : scaffolding, génération de CRD, tests et packaging.",
      },
    ],
    howItWorksTitle: "D’une ressource custom à une application pilotée",
    howItWorks: ["CRD", "RESSOURCE", "WATCH", "RECONCILE", "ÉTAT DÉSIRÉ", "ACTIONS", "ÉTAT RÉEL"],
    example: {
      title: "Opérateur pour une base de données",
      steps: [
        "CRD définie",
        "Opérateur déployé",
        "Ressource créée",
        "Provisionnement automatique",
        "Sauvegardes planifiées",
        "Failover testé",
      ],
    },
    projectsDetailed: [
      {
        title: "CRD custom déployée",
        flow: "Schéma CRD → Ressource YAML → Validation → kubectl",
      },
      {
        title: "Opérateur pour une base de données",
        flow: "CRD → Contrôleur → Réconciliation → Sauvegardes auto",
      },
      {
        title: "Packager avec OLM",
        flow: "Bundle → Catalogue → Installation → Mises à jour gérées",
      },
    ],
  },
  // ----------------------------------------------------------------- azure
  azure: {
  setup: {
    install: [
      "Créer un compte sur azure.microsoft.com (compte gratuit + crédits d'essai).",
      "Installer la CLI : `brew install azure-cli`.",
      "Se connecter : `az login`.",
      "Vérifier : `az account list`.",
    ],
    configure: [
      "Sélectionner l'abonnement : `az account set --subscription <id>`.",
      "Créer un groupe de ressources : `az group create --name <rg> --location francecentral`.",
      "Comprendre la facturation : `Cost Management` dans le portail, créer un budget avec alerte.",
      "Stocker les secrets dans Azure Key Vault, jamais en clair.",
    ],
    workflow: [
      "Lister les groupes : `az group list`.",
      "Lister les VM : `az vm list -o table`.",
      "Déployer via Bicep/Terraform plutôt qu'en cliquant dans le portail.",
    ],
    editors: [
      "VS Code + extensions « Azure CLI Tools » et « Azure Resources ».",
      "Alternatives : portail Azure, Azure Cloud Shell.",
    ],
  },
    definition:
      "Azure est la plateforme cloud de Microsoft : forte intégration avec l’écosystème Microsoft (Active Directory, Office, .NET), cloud hybride et services IA.",
    whyLearn:
      "Azure domine dans les entreprises utilisatrices de Microsoft : savoir y déployer (VM, App Service, Entra ID) ouvre un immense marché de l’emploi, notamment dans les grands comptes et le secteur public.",
    conceptDetails: [
      {
        name: "VM",
        definition:
          "Une machine virtuelle Azure : un serveur Windows ou Linux à la demande, dimensionnable, facturé à l’usage.",
      },
      {
        name: "App Service",
        definition:
          "La plateforme d’hébergement managée pour applications web et API : déploiement Git, slots de staging, TLS intégré.",
      },
      {
        name: "Entra ID",
        definition:
          "Le service d’identité d’Azure (ex-Azure AD) : authentification unique, MFA et accès conditionnel pour utilisateurs et applications.",
      },
      {
        name: "Blob Storage",
        definition:
          "Le stockage objet d’Azure pour fichiers, médias et sauvegardes : hiérarchisé en niveaux d’accès chaud, froid et archive.",
      },
      {
        name: "Functions",
        definition:
          "Le serverless d’Azure : du code exécuté à l’événement, sans serveur à gérer, facturé à l’exécution.",
      },
      {
        name: "Hybride",
        definition:
          "Le modèle hybride connecte le datacenter existant au cloud Azure : VPN, ExpressRoute et Azure Arc pour une gestion unifiée.",
      },
    ],
    howItWorksTitle: "D’un abonnement à une application hébergée",
    howItWorks: ["ABONNEMENT", "RESOURCE GROUP", "RÉSEAU VNET", "COMPUTE", "IDENTITÉS", "DÉPLOIEMENT", "SUPERVISION"],
    example: {
      title: "Déployer une app .NET",
      steps: [
        "Code .NET",
        "App Service créé",
        "Pipeline CI/CD",
        "Base SQL Azure",
        "Entra ID configuré",
        "Domaine custom",
        "Supervision activée",
      ],
    },
    projectsDetailed: [
      {
        title: "Déployer une app .NET",
        flow: "Code → Build → App Service → SQL Azure → Domaine",
      },
      {
        title: "Fonctions serverless",
        flow: "Functions → Déclencheurs → Blob Storage → Intégrations",
      },
      {
        title: "Infrastructure hybride",
        flow: "On-premise → VPN/ExpressRoute → Arc → Gestion unifiée",
      },
    ],
  },
  // ------------------------------------------------------------------- gcp
  gcp: {
  setup: {
    install: [
      "Créer un compte sur cloud.google.com (essai gratuit avec crédits).",
      "Installer le SDK : `brew install --cask google-cloud-sdk`.",
      "Initialiser : `gcloud init` (authentification + projet).",
      "Vérifier : `gcloud auth login` et `gcloud projects list`.",
    ],
    configure: [
      "Définir le projet : `gcloud config set project <project-id>`.",
      "Définir la zone : `gcloud config set compute/zone europe-west1-b`.",
      "Comprendre la facturation : associer un compte de facturation, créer un budget avec alertes.",
      "Activer uniquement les API nécessaires (`gcloud services enable`).",
    ],
    workflow: [
      "Lister les instances : `gcloud compute instances list`.",
      "Voir la configuration active : `gcloud config list`.",
      "Déployer via Terraform ou Cloud Build plutôt qu'en cliquant dans la console.",
    ],
    editors: [
      "VS Code + extension « Cloud Code ».",
      "Alternatives : console Google Cloud, Cloud Shell.",
    ],
  },
    definition:
      "GCP (Google Cloud Platform) est le cloud né de l’infrastructure de Google : excellence sur Kubernetes (GKE), la data (BigQuery) et la simplicité réseau.",
    whyLearn:
      "GCP est le choix naturel pour le Kubernetes managé et l’analytique à grande échelle. Ses concepts se transfèrent aux autres clouds, et BigQuery reste une référence pour la data.",
    conceptDetails: [
      {
        name: "GCE",
        definition:
          "Google Compute Engine : des machines virtuelles haute performance, avec remises automatiques sur usage soutenu.",
      },
      {
        name: "GKE",
        definition:
          "Google Kubernetes Engine : Kubernetes managé par Google, en mode Standard ou Autopilot où les nœuds sont gérés pour vous.",
      },
      {
        name: "BigQuery",
        definition:
          "L’entrepôt de données serverless de Google : des requêtes SQL sur des pétaoctets en quelques secondes, sans infrastructure à gérer.",
      },
      {
        name: "Cloud Run",
        definition:
          "La plateforme serverless pour conteneurs : déployez une image, elle scale à zéro puis monte en charge automatiquement.",
      },
      {
        name: "IAM",
        definition:
          "Identity and Access Management : qui peut faire quoi sur quelles ressources, avec le principe du moindre privilège.",
      },
      {
        name: "Réseau",
        definition:
          "Le réseau mondial de Google : un seul VPC global, des sous-réseaux régionaux, pare-feu et Cloud NAT intégrés.",
      },
    ],
    howItWorksTitle: "D’un projet à une application conteneurisée",
    howItWorks: ["PROJET", "RÉSEAU VPC", "COMPUTE", "CONTENEURS", "IAM", "DONNÉES", "OBSERVABILITÉ"],
    example: {
      title: "App conteneurisée sur Cloud Run",
      steps: [
        "Image Docker",
        "Artifact Registry",
        "Service Cloud Run",
        "Variables d’environnement",
        "Domaine custom",
        "Autoscaling",
        "Logs centralisés",
      ],
    },
    projectsDetailed: [
      {
        title: "App conteneurisée sur Cloud Run",
        flow: "Image → Registry → Cloud Run → Domaine → HTTPS",
      },
      {
        title: "Pipeline data BigQuery",
        flow: "Données → Cloud Storage → BigQuery → Requêtes SQL → Dashboard",
      },
      {
        title: "Cluster GKE",
        flow: "VPC → GKE Autopilot → Workloads → Ingress → Monitoring",
      },
    ],
  },
  // --------------------------------------------------------------- grafana
  grafana: {
  setup: {
    install: [
      "Installer : `brew install grafana` ou via Docker : `docker run -p 3000:3000 grafana/grafana`.",
      "Vérifier : ouvrir http://localhost:3000 (identifiants par défaut `admin` / `admin`).",
    ],
    configure: [
      "Ajouter Prometheus comme source de données (`Configuration > Data sources`).",
      "Importer un dashboard communautaire via son ID (ex. Node Exporter).",
      "Sauvegarder les dashboards en JSON versionnés dans Git.",
    ],
    workflow: [
      "Explorer : `Explore` pour tester des requêtes PromQL ad hoc.",
      "Créer des panels (graph, stat, table) reliés aux métriques utiles.",
      "Configurer des alertes sur les seuils critiques (latence, erreurs, disque).",
    ],
    editors: [
      "Interface web Grafana (création visuelle des dashboards).",
      "VS Code pour versionner les JSON de dashboards et le provisioning.",
    ],
  },
    definition:
      "Grafana est la plateforme de visualisation de l’observabilité : elle transforme métriques, logs et traces en dashboards lisibles, avec alerting intégré.",
    whyLearn:
      "Des métriques sans visualisation ne servent à personne. Grafana est le standard pour rendre l’état des systèmes lisible par toute l’équipe — et pour construire une culture d’alerting pertinente plutôt que bruyante.",
    conceptDetails: [
      {
        name: "Dashboards",
        definition:
          "Les vues qui assemblent plusieurs panels : la synthèse visuelle de l’état d’un système, partageable à toute l’équipe.",
      },
      {
        name: "Datasources",
        definition:
          "Les connexions vers les sources de données (Prometheus, Loki, SQL…) : Grafana interroge, il ne stocke rien lui-même.",
      },
      {
        name: "Alertes",
        definition:
          "Les règles qui surveillent une métrique et notifient (Slack, PagerDuty) quand un seuil est franchi.",
      },
      {
        name: "Variables",
        definition:
          "Les paramètres dynamiques d’un dashboard (environnement, instance) : un seul dashboard pour toute l’infrastructure.",
      },
      {
        name: "Panels",
        definition:
          "Les blocs de visualisation (graphique, jauge, table) : chacun exécute une requête contre une datasource.",
      },
      {
        name: "Provisioning",
        definition:
          "Déclarer dashboards et datasources en fichiers versionnés : les déployer via Git plutôt qu’à la main.",
      },
    ],
    howItWorksTitle: "De la métrique au dashboard d’alerte",
    howItWorks: ["DATASOURCE", "REQUÊTE", "PANEL", "DASHBOARD", "VARIABLE", "ALERTE", "NOTIFICATION"],
    example: {
      title: "Dashboard SRE complet",
      steps: [
        "Prometheus en datasource",
        "Panels latence et erreurs",
        "Variables d’environnement",
        "Seuils d’alerte",
        "Règles configurées",
        "Notifications Slack",
        "Dashboard partagé à l’équipe",
      ],
    },
    projectsDetailed: [
      {
        title: "Dashboard SRE complet",
        flow: "Prometheus → Datasource → Panels → Variables → Dashboard",
      },
      {
        title: "Alerting multi-sources",
        flow: "Métriques + Logs → Règles → Alertmanager → Astreinte",
      },
      {
        title: "Dashboards versionnés",
        flow: "JSON → Provisioning → Git → Déploiement → Infra as code",
      },
    ],
  },
  // ---------------------------------------------------- platform-engineering
  "platform-engineering": {
  setup: {
    install: [
      "Installer Docker et `kubectl` (voir fiches Docker et Kubernetes).",
      "Créer un cluster local : `kind create cluster`.",
      "Installer Terraform : `brew install terraform`.",
    ],
    configure: [
      "Organiser la plateforme en mono-dépôt (`platform/` : clusters, modules, charts).",
      "Définir les « golden paths » : templates de service, pipelines CI de référence.",
      "Centraliser la configuration partagée (versions, politiques) dans le dépôt.",
    ],
    workflow: [
      "Prototyper localement : `kind create cluster`, `terraform apply`, `kubectl apply -f`.",
      "Fournir aux équipes des templates plutôt que des clusters à la main.",
      "Mesurer l'adoption : temps de mise en route d'un nouveau service, tickets récurrents.",
    ],
    editors: [
      "VS Code + extensions « Docker », « Kubernetes », « HashiCorp Terraform ».",
      "Alternatives : portail développeur (ex. Backstage) côté consommateurs de la plateforme.",
    ],
  },
    definition:
      "Le platform engineering industrialise le DevOps : construire des plateformes internes (IDP) qui offrent aux développeurs du self-service (environnements, déploiements, observabilité) via des « golden paths ».",
    whyLearn:
      "C’est l’évolution naturelle du DevOps à l’échelle : au lieu que chaque équipe réinvente son infrastructure, une équipe plateforme fournit des briques standard. Le sommet actuel des carrières infra.",
    conceptDetails: [
      {
        name: "IDP",
        definition:
          "Internal Developer Platform : l’ensemble des outils et APIs self-service qui permettent à un développeur de livrer sans attendre l’équipe infra.",
      },
      {
        name: "Self-service",
        definition:
          "Le principe clé de la plateforme : le développeur provisionne lui-même environnements, bases et déploiements, sans ticket.",
      },
      {
        name: "Golden paths",
        definition:
          "Les chemins standardisés et supportés (templates, pipelines) : la voie rapide et sécurisée pour mettre en production.",
      },
      {
        name: "Backstage",
        definition:
          "Le portail open source de Spotify : catalogue de services, documentation et scaffolding réunis au même endroit.",
      },
      {
        name: "GitOps",
        definition:
          "Git comme source de vérité : tout changement d’infrastructure passe par une pull request, puis est déployé automatiquement.",
      },
      {
        name: "DX",
        definition:
          "Developer Experience : la mesure d’une plateforme — réduire la friction entre une idée et sa mise en production.",
      },
    ],
    howItWorksTitle: "De la demande développeur au déploiement self-service",
    howItWorks: ["BESOIN", "GOLDEN PATH", "IDP", "SELF-SERVICE", "GITOPS", "OBSERVABILITÉ"],
    example: {
      title: "Portail développeur minimal",
      steps: [
        "Backstage déployé",
        "Catalogue de services",
        "Template de scaffold",
        "Création du repo",
        "Pipeline générée",
        "Déploiement auto",
        "Documentation à jour",
      ],
    },
    projectsDetailed: [
      {
        title: "Portail développeur minimal",
        flow: "Backstage → Catalogue → Templates → Self-service",
      },
      {
        title: "Pipeline GitOps complète",
        flow: "Commit → CI → Git → ArgoCD → Cluster",
      },
      {
        title: "Golden path applicatif",
        flow: "Template → Environnements → Observabilité → Standards",
      },
    ],
  },
  // ----------------------------------------------------------------- mysql
  mysql: {
  setup: {
    install: [
      "Via Docker : `docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8`.",
      "Natif (Debian/Ubuntu) : `sudo apt install mysql-server`.",
      "Vérifier : `mysql --version`.",
    ],
    configure: [
      "Sécuriser l'installation : `sudo mysql_secure_installation`.",
      "Fichier `my.cnf` (`/etc/mysql/my.cnf`) : régler `bind-address` et `max_connections`.",
      "Créer base et utilisateur : `CREATE DATABASE app; CREATE USER 'app'@'%' IDENTIFIED BY 'secret'; GRANT ALL ON app.* TO 'app'@'%';`.",
    ],
    workflow: [
      "Se connecter : `mysql -u app -p`.",
      "Sauvegarder : `mysqldump -u root -p app > backup.sql` ; restaurer : `mysql -u root -p app < backup.sql`.",
      "Analyser une requête lente : `EXPLAIN SELECT ...;`.",
      "Lister : `SHOW DATABASES;`, `SHOW TABLES;`.",
    ],
    editors: [
      "VS Code + extension « MySQL » (Weijan Chen) : explorer, requêtes, résultats.",
      "Alternatives : DBeaver (gratuit, multi-bases), MySQL Workbench (officiel), TablePlus.",
    ],
  },
    definition:
      "MySQL est le système de gestion de base de données relationnelle le plus répandu : simple, rapide, il propulse une immense partie du web historique (WordPress et Cie).",
    whyLearn:
      "MySQL reste incontournable : des millions de sites en production l’utilisent. Le connaître — avec ses différences face à PostgreSQL — est indispensable pour maintenir l’existant et choisir en connaissance de cause.",
    conceptDetails: [
      {
        name: "InnoDB",
        definition:
          "Le moteur de stockage par défaut : transactions ACID, verrouillage au niveau ligne, clés étrangères.",
      },
      {
        name: "Index",
        definition:
          "Une structure B-tree qui accélère les recherches : à créer sur les colonnes filtrées et jointes, avec modération sur les tables très écrites.",
      },
      {
        name: "Réplication",
        definition:
          "Un primaire propage ses écritures vers des réplicas en lecture : scale-out des lectures et bascule en cas de panne.",
      },
      {
        name: "Optimisation",
        definition:
          "EXPLAIN, index, requêtes réécrites, buffer pool : mesurer avant d’optimiser, vérifier après.",
      },
      {
        name: "Sauvegarde",
        definition:
          "mysqldump pour les petites bases, sauvegardes physiques pour les grosses : tester la restauration, pas seulement la sauvegarde.",
      },
      {
        name: "Sécurité",
        definition:
          "Comptes à privilèges minimaux, mot de passe root, TLS, suppression des comptes anonymes et de la base de test.",
      },
    ],
    howItWorksTitle: "De la requête à la ligne retournée",
    howItWorks: ["CONNEXION", "PARSE", "OPTIMISEUR", "MOTEUR INNODB", "LECTURE", "RÉSULTAT"],
    example: {
      title: "Optimiser une boutique WordPress",
      steps: [
        "Requêtes lentes",
        "Slow query log",
        "Index manquants",
        "EXPLAIN",
        "Cache applicatif",
        "Temps de réponse divisé",
      ],
    },
    projectsDetailed: [
      {
        title: "Base WordPress optimisée",
        flow: "Audit → Index → Cache → Configuration → Monitoring",
      },
      {
        title: "Migration vers PostgreSQL",
        flow: "Schéma → Conversion → Données → Tests → Bascule",
      },
      {
        title: "Réplication primaire / réplica",
        flow: "Configuration → GTID → Réplica → Bascule → Supervision",
      },
    ],
  },
  // --------------------------------------------------------------- rabbitmq
  rabbitmq: {
  setup: {
    install: [
      "Via Docker (avec console d'admin) : `docker run --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:4-management`.",
      "Vérifier : `docker exec rabbitmq rabbitmq-diagnostics ping`.",
    ],
    configure: [
      "Console d'admin : `http://localhost:15672` (guest/guest, localhost uniquement par défaut).",
      "Créer un utilisateur : `rabbitmqctl add_user app secret` puis `rabbitmqctl set_permissions -p / app \".*\" \".*\" \".*\"`.",
      "Fichier `rabbitmq.conf` : `listeners.tcp.local`, `loopback_users`.",
    ],
    workflow: [
      "Déclarer exchanges et files via la console web ou `rabbitmqadmin`.",
      "Publier/consommer depuis le code : `amqplib` (Node.js) ou `pika` (Python).",
      "Surveiller : `rabbitmqctl list_queues name messages consumers`.",
    ],
    editors: [
      "VS Code : le terminal et la console web intégrée suffisent.",
      "Alternative : Postman ou `curl` pour tester les endpoints de l'API de management.",
    ],
  },
    definition:
      "RabbitMQ est un broker de messages robuste : il découple les services via des files d’attente, absorbe les pics de charge et garantit la livraison des messages.",
    whyLearn:
      "RabbitMQ est la façon éprouvée de rendre des architectures résilientes : workers asynchrones, notifications, découplage. Plus simple que Kafka pour les files classiques, il reste un standard du messaging.",
    conceptDetails: [
      {
        name: "Queues",
        definition:
          "Une file stocke les messages en attente de traitement : FIFO, durable si configurée ainsi, consommée par un ou plusieurs workers.",
      },
      {
        name: "Exchanges",
        definition:
          "Le routeur qui reçoit les messages publiés et les distribue aux files selon des règles : direct, topic, fanout, headers.",
      },
      {
        name: "Routing",
        definition:
          "La clé de routage détermine quelle file reçoit chaque message : le binding lie une clé à une file.",
      },
      {
        name: "ACK",
        definition:
          "L’acquittement confirme le traitement : sans ACK, le message est renvoyé à un autre consommateur.",
      },
      {
        name: "Persistance",
        definition:
          "Les messages et files durables survivent au redémarrage du broker : écrits sur disque, pas seulement en mémoire.",
      },
      {
        name: "Clustering",
        definition:
          "Plusieurs nœuds partagent la charge et assurent la haute disponibilité : les files miroir répliquent les messages.",
      },
    ],
    howItWorksTitle: "De la publication à l’acquittement",
    howItWorks: ["PUBLISH", "EXCHANGE", "ROUTING", "QUEUE", "DELIVERY", "ACK"],
    example: {
      title: "Envoi d’emails asynchrone",
      steps: [
        "Inscription utilisateur",
        "Publication du message",
        "Exchange direct",
        "File emails",
        "Worker",
        "ACK et suppression",
      ],
    },
    projectsDetailed: [
      {
        title: "Workers asynchrones",
        flow: "Publisher → Exchange → Queue → Worker → ACK",
      },
      {
        title: "Notifications découplées",
        flow: "Événements → Topic exchange → Files par canal → Workers → Retry",
      },
      {
        title: "Cluster haute disponibilité",
        flow: "Nœuds → Files miroir → Bascule → Monitoring",
      },
    ],
  },
  // -------------------------------------------------------------- analytics
  analytics: {
  setup: {
    install: [
      "Python 3.11+ : `pip install pandas matplotlib seaborn jupyterlab`.",
      "Alternative R : `sudo apt install r-base`.",
      "SQL embarqué : `pip install duckdb`.",
    ],
    configure: [
      "Environnement virtuel + `requirements.txt` épinglé.",
      "Arborescence : `data/` (brutes), `notebooks/`, `reports/`.",
      "`.gitignore` : exclure les CSV volumineux de `data/`.",
    ],
    workflow: [
      "Agréger : `df.groupby(...).agg(...)`.",
      "Interroger un CSV en SQL : `duckdb -c \"SELECT ... FROM 'data.csv'\"`.",
      "Exporter un graphique : `plt.savefig(\"fig.png\", dpi=150)`.",
    ],
    editors: [
      "VS Code + « Jupyter » (Microsoft).",
      "Alternatives : DBeaver (SQL), Metabase ou Power BI (tableaux de bord).",
    ],
  },
    definition:
      "La data analytics est l’analyse décisionnelle : avec SQL et des outils BI, transformer des données en dashboards, KPIs et réponses aux questions business.",
    whyLearn:
      "L’analytics est la voie la plus directe vers un métier data : pas de modèles complexes, mais des réponses fiables aux questions qui pilotent l’entreprise. C’est aussi le socle de la data science.",
    conceptDetails: [
      {
        name: "SQL avancé",
        definition:
          "Aller au-delà du SELECT : fenêtres analytiques, CTE, agrégations complexes pour répondre aux questions business.",
      },
      {
        name: "BI",
        definition:
          "La business intelligence : transformer les données brutes en indicateurs exploitables pour la décision.",
      },
      {
        name: "Dashboards",
        definition:
          "Les tableaux de bord interactifs : visualiser les KPI en temps réel, filtrables par les utilisateurs métier.",
      },
      {
        name: "KPI",
        definition:
          "Les indicateurs clés de performance : les quelques métriques qui pilotent réellement l’activité.",
      },
      {
        name: "Nettoyage",
        definition:
          "Préparer les données avant analyse : doublons, valeurs manquantes, formats incohérents.",
      },
      {
        name: "Présentation",
        definition:
          "Raconter les résultats : un insight sans narration claire ne déclenche aucune décision.",
      },
    ],
    howItWorksTitle: "De la question business au dashboard",
    howItWorks: ["QUESTION", "DONNÉES", "SQL", "NETTOYAGE", "AGRÉGATION", "VISUALISATION", "DÉCISION"],
    example: {
      title: "Dashboard KPI e-commerce",
      steps: [
        "Base de commandes",
        "Requêtes SQL",
        "KPI calculés",
        "Dashboard BI",
        "Filtres interactifs",
        "Revue hebdo",
      ],
    },
    projectsDetailed: [
      {
        title: "Dashboard KPI e-commerce",
        flow: "Données → SQL → Modèle BI → Dashboard → Décisions",
      },
      {
        title: "Rapport automatisé",
        flow: "Requêtes → Agrégations → Template → Envoi planifié → Stakeholders",
      },
      {
        title: "Analyse de cohorte",
        flow: "Événements → Cohortes → Rétention → Insights → Recommandations",
      },
    ],
  },
  // ------------------------------------------------------------------ siem
  siem: {
  setup: {
    install: [
      "Wazuh (open source) : déployer via le script d'installation officiel sur une VM Ubuntu (voir documentation wazuh.com).",
      "Alternative : essai gratuit de Splunk.",
    ],
    configure: [
      "Agents : installer `wazuh-agent` sur les machines surveillées, les enregistrer via `manage_agents`.",
      "Règles personnalisées : `/var/ossec/etc/rules/local_rules.xml`.",
      "Alertes : configurer e-mail ou webhook dans `ossec.conf`.",
    ],
    workflow: [
      "Tableau de bord : `https://<serveur>:443`, onglet « Discover » pour chercher dans les logs.",
      "Trier les alertes par niveau (priorité aux niveaux 7+).",
      "Créer une règle de test, générer l'événement, vérifier l'alerte.",
    ],
    editors: [
      "VS Code + « XML » (Red Hat) pour éditer les règles et `ossec.conf`.",
      "Alternatives : interface web de Wazuh, Graylog (autre SIEM open source).",
    ],
  },
    definition:
      "Un SIEM (Security Information and Event Management) centralise les logs de toute l’infrastructure, corrèle les événements et détecte les attaques en temps réel : les yeux du SOC.",
    whyLearn:
      "Sans centralisation des logs, une attaque passe inaperçue pendant des mois. Le SIEM est le cœur de la détection : savoir écrire des règles de détection pertinentes est une compétence clé des analystes SOC.",
    conceptDetails: [
      {
        name: "Logs",
        definition:
          "La matière première : événements système, réseau et applicatifs, collectés et horodatés depuis toutes les sources.",
      },
      {
        name: "Corrélation",
        definition:
          "Relier des événements isolés entre eux — même IP, même utilisateur, fenêtre de temps — pour révéler une attaque.",
      },
      {
        name: "Règles",
        definition:
          "Des conditions qui déclenchent des alertes : seuils, séquences, listes noires — le cœur de la détection.",
      },
      {
        name: "Wazuh/Splunk",
        definition:
          "Les plateformes SIEM de référence : Wazuh en open source auto-hébergé, Splunk en solution entreprise.",
      },
      {
        name: "Triage",
        definition:
          "Qualifier une alerte — vrai positif, faux positif, criticité — avant d’escalader vers l’équipe de réponse.",
      },
      {
        name: "Dashboards",
        definition:
          "Les vues qui résument la posture sécurité : alertes par criticité, top sources, tendances — pour le pilotage quotidien.",
      },
    ],
    howItWorksTitle: "Du log brut à l’alerte qualifiée",
    howItWorks: ["COLLECTE", "NORMALISATION", "CORRÉLATION", "RÈGLE", "ALERTE", "TRIAGE"],
    example: {
      title: "Détecter une connexion suspecte",
      steps: [
        "Logs d’authentification",
        "Collecte centralisée",
        "Corrélation d’événements",
        "Règle déclenchée",
        "Alerte qualifiée",
        "Investigation",
      ],
    },
    projectsDetailed: [
      {
        title: "SIEM maison avec Wazuh",
        flow: "Agents → Collecte → Règles → Alertes → Dashboard",
      },
      {
        title: "Règles de détection custom",
        flow: "Scénario → Source de logs → Règle → Test → Tuning",
      },
      {
        title: "Runbook de triage",
        flow: "Alertes → Qualification → Escalade → Documentation → Métriques",
      },
    ],
  },
  // ------------------------------------------------------- incident-response
  "incident-response": {
    definition:
      "La réponse aux incidents est la gestion de crise sécurité : contenir l’attaque, éradiquer la menace, récupérer les systèmes, puis tirer les leçons. Elle s’appuie sur des playbooks préparés à l’avance.",
    whyLearn:
      "La question n’est pas « si » mais « quand » un incident surviendra. Savoir réagir méthodiquement sous pression — plutôt qu’improviser — fait la différence entre un incident contenu et une crise majeure.",
    conceptDetails: [
      {
        name: "Playbooks",
        definition:
          "Des procédures pas-à-pas par scénario — ransomware, phishing, fuite de données : qui fait quoi, dans quel ordre, avec quels outils.",
      },
      {
        name: "Confinement",
        definition:
          "Isoler les systèmes affectés du réseau sans les éteindre : stopper la propagation tout en préservant les preuves.",
      },
      {
        name: "Forensique",
        definition:
          "L’analyse des traces — disque, mémoire, logs — pour comprendre le vecteur d’entrée, l’étendue et la chronologie de l’attaque.",
      },
      {
        name: "Communication",
        definition:
          "Informer les parties prenantes au bon moment : direction, juridique, clients, autorités — avec des messages préparés à l’avance.",
      },
      {
        name: "Retour d’expérience",
        definition:
          "La revue post-incident : ce qui a fonctionné, ce qui a raté, les actions correctives — sans blâmer.",
      },
      {
        name: "Préparation",
        definition:
          "Le travail en amont : playbooks testés, sauvegardes vérifiées, rôles définis, exercices de simulation réguliers.",
      },
    ],
    howItWorksTitle: "Le cycle de vie d’un incident",
    howItWorks: ["PRÉPARATION", "DÉTECTION", "CONFINEMENT", "ÉRADICATION", "RÉCUPÉRATION", "RETOUR D’EXPÉRIENCE"],
    example: {
      title: "Ransomware sur un poste",
      steps: [
        "Détection EDR",
        "Isolement réseau",
        "Analyse forensique",
        "Éradication",
        "Restauration",
        "Retour d’expérience",
      ],
    },
    projectsDetailed: [
      {
        title: "Simuler une réponse à incident",
        flow: "Scénario → Tabletop → Chronologie → Décisions → Débrief",
      },
      {
        title: "Rédiger un playbook",
        flow: "Scénario → Rôles → Procédures → Contacts → Test",
      },
      {
        title: "Kit forensique",
        flow: "Images disque → Timeline → IOC → Rapport → Leçons",
      },
    ],
  },
  // ------------------------------------------------------------------- cpp
  cpp: {
  setup: {
    install: [
      "Linux : `sudo apt install build-essential` (g++, gdb, make).",
      "Alternative LLVM : `sudo apt install clang`.",
      "Windows : « Build Tools for Visual Studio » (charge de travail C++).",
      "Vérifier : `g++ --version`.",
    ],
    configure: [
      "Fichier `CMakeLists.txt` : `cmake_minimum_required`, `project()`, `set(CMAKE_CXX_STANDARD 20)`.",
      "Configurer et compiler : `cmake -B build && cmake --build build`.",
      "Debug : compiler avec `-g`, déboguer avec `gdb ./build/app`.",
    ],
    workflow: [
      "Compiler un fichier : `g++ -std=c++20 -Wall -Wextra main.cpp -o app`.",
      "Exécuter : `./app`.",
      "Déboguer : `gdb ./app` puis `break main`, `run`, `print var`.",
    ],
    editors: [
      "VS Code (recommandé) + « C/C++ » (Microsoft) et « CMake Tools » (Microsoft).",
      "Alternatives : CLion (JetBrains), Visual Studio (Windows), Qt Creator.",
    ],
  },
    definition:
      "C et C++ sont les langages du système et de l’embarqué : gestion manuelle de la mémoire, performance maximale, contrôle total sur le matériel. Ils sont derrière les OS, les moteurs de jeu et les microcontrôleurs.",
    whyLearn:
      "Le C/C++ enseigne ce que les langages managés cachent : mémoire, pointeurs, compilation. Indispensable pour l’embarqué, les systèmes et la performance — et une école de rigueur pour tout programmeur.",
    environment: [
      "Installer un compilateur : GCC (Linux), Clang (macOS) ou MSVC via Visual Studio (Windows). Vérifier avec `g++ --version`.",
      "Installer VS Code + l'extension C/C++ officielle (coloration, débogueur, IntelliSense).",
      "Pour les projets : installer CMake, le standard pour compiler des projets C++ multi-fichiers.",
      "Compiler un premier programme : `g++ main.cpp -o main -Wall -Wextra` puis `./main`. Activer les warnings dès le jour 1.",
      "Apprendre GDB (ou le débogueur de VS Code) : points d'arrêt, inspection mémoire, pile d'appels.",
    ],
    conceptDetails: [
      {
        name: "Pointeurs",
        definition:
          "Les adresses mémoire manipulées directement : la base du C, source de sa puissance comme de ses bugs.",
      },
      {
        name: "Mémoire",
        definition:
          "La gestion manuelle (new/delete, RAII) : allouer, libérer, éviter fuites et corruptions.",
      },
      {
        name: "POO",
        definition:
          "Classes, héritage, polymorphisme : organiser le code en objets avec un coût d’abstraction quasi nul.",
      },
      {
        name: "Templates",
        definition:
          "La programmation générique : écrire du code indépendant du type, résolu à la compilation.",
      },
      {
        name: "STL",
        definition:
          "La bibliothèque standard (vector, map, algorithms) : des conteneurs et algorithmes éprouvés, à connaître avant de réinventer.",
      },
      {
        name: "Compilation",
        definition:
          "Le pipeline préprocesseur → compilation → édition de liens : comprendre les erreurs et optimiser le binaire.",
      },
    ],
    howItWorksTitle: "Du source au binaire natif",
    howItWorks: ["SOURCE", "PRÉPROCESSEUR", "COMPILATION", "ÉDITION DE LIENS", "BINAIRE", "EXÉCUTION"],
    example: {
      title: "Driver pour microcontrôleur",
      steps: [
        "Datasheet du périphérique",
        "Registres identifiés",
        "Code C bare metal",
        "Compilation croisée",
        "Flash du firmware",
        "Périphérique piloté",
      ],
    },
    projectsDetailed: [
      {
        title: "Moteur de jeu minimal",
        flow: "Boucle de jeu → Entités → Rendu → Build → Exécutable",
      },
      {
        title: "Parseur de protocole binaire",
        flow: "Buffer → Pointeurs → Machine d’états → Tests → Benchmarks",
      },
      {
        title: "Driver pour microcontrôleur",
        flow: "Datasheet → Registres → Code C → Flash → Hardware",
      },
    ],
  },
  // ------------------------------------------------------------ electronics
  electronics: {
    definition:
      "L’électronique est la compréhension du hardware : tension, courant, composants, lecture de schémas. Elle explique ce qui se passe physiquement dans la machine que le logiciel pilote.",
    whyLearn:
      "Pour la robotique et l’embarqué, le logiciel seul ne suffit pas : il faut comprendre capteurs, alimentations et signaux. L’électronique est le pont entre le code et le monde physique.",
    conceptDetails: [
      {
        name: "Circuits",
        definition:
          "Les lois de base (Ohm, Kirchhoff) : calculer courant, tension et puissance dans une maille.",
      },
      {
        name: "Composants",
        definition:
          "Résistances, condensateurs, transistors, diodes : le rôle de chacun et comment les dimensionner.",
      },
      {
        name: "Numérique",
        definition:
          "La logique binaire et les portes : comment des 0 et des 1 deviennent des calculs.",
      },
      {
        name: "Signaux",
        definition:
          "Analogique contre numérique, PWM, bruit : la forme réelle des tensions dans un circuit.",
      },
      {
        name: "Alimentation",
        definition:
          "Fournir une tension stable et suffisante : régulateurs, découplage, dimensionnement du courant.",
      },
      {
        name: "Schémas",
        definition:
          "Le langage de l’électronique : symboles, nets, masses — lire un schéma avant de câbler.",
      },
    ],
    howItWorksTitle: "Du schéma au circuit qui fonctionne",
    howItWorks: ["SCHÉMA", "COMPOSANTS", "BREADBOARD", "ALIMENTATION", "MESURES", "DEBUG"],
    example: {
      title: "Monter un circuit sur breadboard",
      steps: [
        "Schéma du montage",
        "Composants rassemblés",
        "Câblage breadboard",
        "Alimentation 5 V",
        "Vérification au multimètre",
        "LED allumée",
      ],
    },
    projectsDetailed: [
      {
        title: "Monter un circuit sur breadboard",
        flow: "Schéma → Composants → Breadboard → Alimentation → Mesures",
      },
      {
        title: "Alimentation régulée",
        flow: "Transformateur → Redressement → Régulateur → Filtrage → 5 V stable",
      },
      {
        title: "Capteur câblé à un microcontrôleur",
        flow: "Datasheet → Schéma → Câblage → Code → Mesures",
      },
    ],
  },
  // --------------------------------------------------------------- sensors
  sensors: {
    definition:
      "Les capteurs sont les sens des machines : ils convertissent le monde physique (distance, température, mouvement, image) en signaux numériques exploitables par le logiciel.",
    whyLearn:
      "Aucun robot ni objet connecté ne fonctionne sans capteurs : les choisir, les calibrer et filtrer leur bruit est au cœur de tout projet embarqué ou robotique.",
    conceptDetails: [
      {
        name: "Types de capteurs",
        definition:
          "Température, distance (ultrasons, LiDAR), IMU, pression, caméras : choisir selon la grandeur mesurée et la précision requise.",
      },
      {
        name: "ADC",
        definition:
          "Le convertisseur analogique-numérique : transformer une tension continue en valeur discrète, avec une résolution à connaître.",
      },
      {
        name: "Calibration",
        definition:
          "Corriger les biais du capteur (offset, gain) par comparaison avec une référence : sans elle, les mesures dérivent.",
      },
      {
        name: "Bruit",
        definition:
          "Les fluctuations parasites de la mesure : les quantifier, puis les réduire par moyennage ou filtrage.",
      },
      {
        name: "Fusion",
        definition:
          "Combiner plusieurs capteurs (accéléromètre + gyroscope) pour une estimation plus fiable qu’aucun capteur seul.",
      },
      {
        name: "Protocoles",
        definition:
          "I2C, SPI, UART, 1-Wire : les bus qui transportent les mesures du capteur au microcontrôleur.",
      },
    ],
    howItWorksTitle: "Du phénomène physique à la donnée",
    howItWorks: ["PHÉNOMÈNE", "CAPTEUR", "SIGNAL", "ADC", "CALIBRATION", "FILTRAGE", "DONNÉE"],
    example: {
      title: "Station météo connectée",
      steps: [
        "Capteurs BME280",
        "Câblage I2C",
        "Lecture brute",
        "Calibration des offsets",
        "Moyennage des mesures",
        "Envoi MQTT",
        "Dashboard météo",
      ],
    },
    projectsDetailed: [
      {
        title: "Station météo connectée",
        flow: "Capteurs → ESP32 → MQTT → Broker → Dashboard",
      },
      {
        title: "Robot suiveur de ligne",
        flow: "Capteurs IR → Seuils → Calibration → Boucle → Moteurs",
      },
      {
        title: "Centrale inertielle filtrée",
        flow: "IMU → Bruit → Filtre de Kalman → Angles → Affichage",
      },
    ],
  },
  // --------------------------------------------------------- control-systems
  "control-systems": {
    definition:
      "L’asservissement (control systems) est la théorie du contrôle : boucles de régulation, correcteurs PID, stabilité. Faire en sorte qu’une machine atteigne précisément sa consigne malgré les perturbations.",
    whyLearn:
      "Un drone qui reste stable, un moteur qui tourne à vitesse constante, un bras qui atteint sa cible : tout repose sur l’asservissement. C’est la théorie qui transforme un prototype en machine fiable.",
    conceptDetails: [
      {
        name: "PID",
        definition:
          "Le correcteur proportionnel-intégral-dérivé : réagir à l’erreur présente, passée et future pour atteindre la consigne.",
      },
      {
        name: "Boucles",
        definition:
          "Boucle ouverte contre boucle fermée : mesurer la sortie et corriger en continu, le principe de tout asservissement.",
      },
      {
        name: "Stabilité",
        definition:
          "Garantir que le système converge sans osciller ni diverger : marges de gain et de phase, réglage des gains.",
      },
      {
        name: "Modélisation",
        definition:
          "Décrire le système par des équations (fonction de transfert) pour prédire son comportement avant de régler.",
      },
      {
        name: "Filtrage",
        definition:
          "Nettoyer la mesure avant de l’utiliser : un capteur bruité injecté dans une boucle rend le système instable.",
      },
      {
        name: "Simulation",
        definition:
          "Tester le correcteur sur un modèle (Python, MATLAB) avant le hardware : régler sans rien casser.",
      },
    ],
    howItWorksTitle: "De la consigne à la régulation stable",
    howItWorks: ["CONSIGNE", "MESURE", "ERREUR", "CORRECTEUR", "COMMANDE", "SYSTÈME"],
    example: {
      title: "Réguler un moteur en PID",
      steps: [
        "Moteur + encodeur",
        "Consigne de vitesse",
        "Erreur mesurée",
        "Réglage des gains PID",
        "Commande PWM",
        "Vitesse stable",
      ],
    },
    projectsDetailed: [
      {
        title: "Réguler un moteur en PID",
        flow: "Encodeur → Erreur → PID → PWM → Vitesse stable",
      },
      {
        title: "Régulation de température",
        flow: "Capteur → Consigne → PID → Chauffage → Stabilité",
      },
      {
        title: "Simuler un drone",
        flow: "Modèle → Boucles → PID → Perturbations → Stabilité",
      },
    ],
  },
  // -------------------------------------------------------------- robotics
  robotics: {
  setup: {
    install: [
      "ROS 2 desktop : `sudo apt install ros-jazzy-desktop` (voir `ros`).",
      "Simulateur : `sudo apt install ros-jazzy-ros-gz` (Gazebo).",
      "Python : `pip install numpy`.",
    ],
    configure: [
      "Workspace colcon : `~/ros2_ws` (voir `ros`).",
      "Description du robot : `description/urdf/robot.urdf`.",
      "Monde de simulation : fichier `.sdf` ou `.world` pour Gazebo.",
    ],
    workflow: [
      "Lancer la simulation : `ros2 launch mon_robot sim.launch.py`.",
      "Visualiser : `rviz2` ; capteurs : `ros2 topic echo /scan`.",
      "Téléopérer : `ros2 run teleop_twist_keyboard teleop_twist_keyboard`.",
    ],
    editors: [
      "VS Code + « ROS » (Microsoft) pour les nœuds.",
      "Alternatives : Gazebo (simulation), RViz (visualisation, inclus ROS), PyCharm (nœuds Python).",
    ],
  },
    definition:
      "La robotique combine perception, décision et action : des machines qui comprennent leur environnement (capteurs, vision) et agissent dessus (moteurs, bras) de façon autonome.",
    whyLearn:
      "La robotique est la synthèse de l’informatique, de l’électronique et de l’IA : le domaine le plus complet techniquement. Industrie, logistique, médical — les robots autonomes sont un secteur en forte croissance.",
    conceptDetails: [
      {
        name: "Perception",
        definition:
          "Comprendre l’environnement via capteurs et caméras : détection d’obstacles, reconnaissance d’objets.",
      },
      {
        name: "Planification",
        definition:
          "Calculer une trajectoire du point A au point B en évitant les obstacles : A*, RRT, planification de mouvement.",
      },
      {
        name: "SLAM",
        definition:
          "Localisation et cartographie simultanées : construire la carte tout en s’y localisant.",
      },
      {
        name: "Contrôle",
        definition:
          "Transformer une trajectoire planifiée en commandes moteurs précises, malgré les perturbations.",
      },
      {
        name: "IA embarquée",
        definition:
          "Exécuter des modèles (détection, vision) directement sur le robot, avec des ressources limitées.",
      },
      {
        name: "Sécurité",
        definition:
          "Arrêts d’urgence, zones de sécurité, limitation de vitesse : un robot physique ne doit jamais blesser.",
      },
    ],
    howItWorksTitle: "De la perception à l’action",
    howItWorks: ["PERCEPTION", "CARTOGRAPHIE", "PLANIFICATION", "CONTRÔLE", "ACTIONNEURS", "BOUCLE"],
    example: {
      title: "Robot mobile autonome",
      steps: [
        "Châssis + moteurs",
        "LiDAR embarqué",
        "Cartographie SLAM",
        "Planification de trajectoire",
        "Évitement d’obstacles",
        "Navigation autonome",
      ],
    },
    projectsDetailed: [
      {
        title: "Robot téléopéré",
        flow: "Châssis → ROS → Téléopération → Capteurs → Contrôle manuel",
      },
      {
        title: "Robot mobile autonome",
        flow: "Châssis → Capteurs → SLAM → Navigation → Autonomie",
      },
      {
        title: "Bras robotique avec vision",
        flow: "Caméra → Détection → Cinématique → Contrôle → Saisie",
      },
    ],
  },
};

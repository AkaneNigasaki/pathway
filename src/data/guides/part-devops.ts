import type { SkillGuide } from "../skill-guides";

/**
 * Guides pédagogiques — DevOps : roadmap DevOps Engineer.
 *
 * Ces entrées enrichissent les compétences de la roadmap `devops-engineer`
 * (désignées par leur `id`) avec un contenu éditorial structuré :
 * définition, intérêt pédagogique, prérequis expliqués, concepts clés,
 * fonctionnement, exemple concret et projets progressifs.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - Ton : documentation technique premium, concret, sans marketing. Français.
 */
export const GUIDES_DEVOPS: Record<string, SkillGuide> = {
  // ------------------------------------------------------------------ linux
  linux: {
    learning: () => import("./learning-linux").then((m) => m.LEARNING_LINUX),
    definition:
      "Linux est le système d'exploitation de la quasi-totalité des serveurs de production : processus, fichiers, réseau, permissions. Le comprendre, c'est comprendre la machine sur laquelle tout tourne.",
    whyLearn:
      "On ne peut pas automatiser ce qu'on ne comprend pas. Chaque conteneur, chaque VM cloud, chaque pipeline tourne sur Linux : savoir lire les logs, gérer les processus et les permissions transforme le débogage d'une loterie en méthode.",
    conceptDetails: [
      {
        name: "Filesystem & permissions",
        definition:
          "L'arborescence Unix et les droits (rwx, chmod, chown) : qui peut lire, écrire, exécuter quoi. La base de la sécurité système.",
      },
      {
        name: "systemd",
        definition:
          "Le gestionnaire de services : démarrer, arrêter, superviser les processus et lire leurs journaux avec journalctl.",
      },
      {
        name: "Réseau (iptables, ss)",
        definition:
          "Voir les connexions (ss), comprendre les ports et filtrer le trafic (iptables/nftables) : le réseau commence sur la machine.",
      },
      {
        name: "Scripting bash",
        definition:
          "Enchaîner les commandes en scripts : la première forme d'automatisation, encore omniprésente en production.",
      },
      {
        name: "SSH & clés",
        definition:
          "Se connecter à distance de façon sécurisée avec des clés cryptographiques : le canal d'administration des serveurs.",
      },
    ],
    howItWorksTitle: "Diagnostiquer un serveur Linux",
    howItWorks: ["CONNECT", "PROCESSES", "LOGS", "DISK", "NETWORK", "FIX"],
    example: {
      title: "Un service ne répond plus",
      steps: [
        "Se connecter en SSH",
        "Vérifier le statut du service (systemd)",
        "Lire les logs récents",
        "Contrôler le disque et la mémoire",
        "Redémarrer proprement et documenter",
      ],
    },
    projectsDetailed: [
      {
        title: "Hardening d'un serveur",
        flow: "Installation minimale → SSH par clés → Firewall → Mises à jour → Audit",
      },
      {
        title: "Scripts de provisioning",
        flow: "Besoins → Script bash → Tests → Documentation",
      },
    ],
  },

  // ------------------------------------------------------------------ git
  git: {
    learning: () => import("./learning-git").then((m) => m.LEARNING_GIT),
    definition:
      "Git est un système de gestion de versions décentralisé : il enregistre l'historique des modifications, permet de travailler en branches parallèles et de fusionner proprement. En DevOps, c'est la colonne vertébrale du delivery.",
    whyLearn:
      "Tout le DevOps part de Git : le code, mais aussi l'infrastructure, les pipelines et les configurations y sont versionnés. Maîtriser les stratégies de branches, les tags et les releases, c'est maîtriser le contrat de livraison de l'équipe.",
    conceptDetails: [
      {
        name: "GitFlow / trunk-based",
        definition:
          "Deux philosophies de branches : GitFlow structure les releases, le trunk-based privilégie l'intégration continue sur la branche principale.",
      },
      {
        name: "Hooks",
        definition:
          "Des scripts déclenchés automatiquement (pre-commit, pre-push) : lint, tests rapides, garde-fous avant que le code ne parte.",
      },
      {
        name: "Tags & releases",
        definition:
          "Marquer des versions immuables (v1.2.0) : le tag déclenche souvent la construction et le déploiement d'une release.",
      },
      {
        name: "Bisect",
        definition:
          "Retrouver par dichotomie le commit qui a introduit un bug : l'outil de détective le plus efficace de Git.",
      },
      {
        name: "Monorepos",
        definition:
          "Un seul dépôt pour plusieurs projets : simplifie les dépendances internes, exige une discipline de CI adaptée.",
      },
    ],
    howItWorksTitle: "Du commit à la release",
    howItWorks: ["BRANCH", "COMMIT", "PUSH", "REVIEW", "TAG", "RELEASE"],
    example: {
      title: "Livrer une version 2.4.0",
      steps: [
        "Fusionner les features sur main",
        "Créer le tag v2.4.0",
        "Le pipeline construit les artefacts",
        "La release est publiée",
        "Le changelog est généré",
      ],
    },
    projectsDetailed: [
      {
        title: "Stratégie de branches documentée",
        flow: "Choix du modèle → Règles → Protection de branches → Documentation",
      },
      {
        title: "Release automatisée par tags",
        flow: "Tag → Pipeline → Artefacts → Notes de release",
      },
    ],
  },

  // ------------------------------------------------------------------ networking
  networking: {
    learning: () => import("./learning-networking").then((m) => m.LEARNING_NETWORKING),
    definition:
      "Les réseaux sont ce qui relie tout : le modèle TCP/IP, le DNS, TLS, le load balancing. La majorité des incidents « mystérieux » en production sont, au fond, des problèmes réseau.",
    whyLearn:
      "Comprendre les couches réseau transforme le débogage : un timeout n'est plus une fatalité mais un symptôme localisable (DNS ? TLS ? firewall ?). C'est aussi le prérequis au cloud, à Kubernetes et à toute architecture distribuée.",
    conceptDetails: [
      {
        name: "Modèle TCP/IP",
        definition:
          "Les couches (lien, réseau, transport, application) : chaque couche a son rôle, ses protocoles et ses outils de diagnostic.",
      },
      {
        name: "DNS",
        definition:
          "La résolution des noms en adresses IP : premier maillon de toute connexion, première cause de panne quand il casse.",
      },
      {
        name: "TLS & certificats",
        definition:
          "Le chiffrement des échanges et la chaîne de confiance des certificats : expirés, ils mettent un service à genoux.",
      },
      {
        name: "HTTP en profondeur",
        definition:
          "Méthodes, statuts, en-têtes, keep-alive : lire le protocole pour diagnostiquer APIs et proxys avec précision.",
      },
      {
        name: "Load balancing",
        definition:
          "Répartir le trafic sur plusieurs instances : haute disponibilité et montée en charge, avec la terminaison TLS en prime.",
      },
    ],
    howItWorksTitle: "Diagnostiquer un incident réseau",
    howItWorks: ["SYMPTOM", "DNS", "TCP", "TLS", "HTTP", "FIX"],
    example: {
      title: "Le site ne charge plus",
      steps: [
        "Tester la résolution DNS",
        "Vérifier la connectivité TCP au port 443",
        "Contrôler la validité du certificat",
        "Lire la réponse HTTP réelle",
        "Identifier la couche fautive",
      ],
    },
    projectsDetailed: [
      {
        title: "Debug d'un incident réseau simulé",
        flow: "Panne provoquée → Diagnostic couche par couche → Résolution → Post-mortem",
      },
      {
        title: "Reverse proxy avec TLS",
        flow: "Nginx → Certificats → Routage → Renouvellement auto",
      },
    ],
  },

  // ------------------------------------------------------------------ scripting
  scripting: {
    learning: () => import("./learning-scripting").then((m) => m.LEARNING_SCRIPTING),
    definition:
      "Le scripting automatise les tâches répétitives avec Bash et Python : provisioning, sauvegardes, vérifications. Règle d'or : ce qui est fait trois fois à la main devient un script versionné.",
    whyLearn:
      "L'automatisation commence ici, pas dans les outils complexes. Un bon script idempotent, testé et versionné élimine les erreurs manuelles et libère du temps pour le vrai travail d'ingénierie.",
    prerequisiteNotes: {
      linux:
        "Maîtriser le shell, les processus et les permissions : un script ne fait qu'enchaîner ce qu'on sait faire à la main.",
    },
    conceptDetails: [
      {
        name: "Bash avancé",
        definition:
          "Pipes, conditions, boucles, gestion des codes de retour : écrire des scripts robustes, pas des one-liners fragiles.",
      },
      {
        name: "Python ops",
        definition:
          "Quand Bash atteint ses limites (JSON, APIs, logique complexe) : Python pour les scripts d'exploitation sérieux.",
      },
      {
        name: "Cron & schedulers",
        definition:
          "Planifier l'exécution régulière : sauvegardes nocturnes, nettoyages, vérifications. Le temps comme déclencheur.",
      },
      {
        name: "Idempotence",
        definition:
          "Un script rejoué deux fois donne le même résultat qu'une fois : la propriété qui rend l'automatisation sûre.",
      },
      {
        name: "Gestion d'erreurs",
        definition:
          "Échouer vite et bruyamment (set -euo pipefail), logger, alerter : un script silencieux qui échoue est un piège.",
      },
    ],
    howItWorksTitle: "Industrialiser une tâche manuelle",
    howItWorks: ["MANUAL", "SCRIPT", "IDEMPOTENT", "SCHEDULE", "VERSION", "ALERT"],
    example: {
      title: "Sauvegarde automatisée",
      steps: [
        "Dumper la base de données",
        "Compresser et chiffrer l'archive",
        "La copier vers un stockage distant",
        "Vérifier l'intégrité et purger les anciennes",
        "Alerter en cas d'échec",
      ],
    },
    projectsDetailed: [
      {
        title: "Runbook automatisé",
        flow: "Procédure manuelle → Script → Tests → Documentation",
      },
      {
        title: "Script de backup avec rotation",
        flow: "Dump → Chiffrement → Rotation → Vérification → Alertes",
      },
    ],
  },

  // ------------------------------------------------------------------ docker
  docker: {
    learning: () => import("./learning-docker").then((m) => m.LEARNING_DOCKER),
    definition:
      "Docker package une application et ses dépendances dans un conteneur : une image immuable et reproductible qui tourne partout pareil. Il a standardisé l'unité de déploiement moderne.",
    whyLearn:
      "« Ça marche sur ma machine » n'est plus une excuse acceptable : Docker garantit le même environnement en local, en test et en production. C'est aussi la brique de base de Kubernetes et des pipelines CI/CD.",
    prerequisiteNotes: {
      linux:
        "Comprendre processus, namespaces et filesystem : un conteneur n'est qu'un processus Linux isolé.",
    },
    conceptDetails: [
      {
        name: "Dockerfile optimisé",
        definition:
          "Décrire la construction de l'image par couches : ordre des instructions et cache pour des builds rapides et légers.",
      },
      {
        name: "Multi-stage builds",
        definition:
          "Compiler dans une image, livrer dans une autre : des images finales minimales, sans les outils de build.",
      },
      {
        name: "Registries",
        definition:
          "Les dépôts d'images versionnées (Docker Hub, ECR, GHCR) : le point de distribution entre le build et le déploiement.",
      },
      {
        name: "Sécurité des images",
        definition:
          "Scanner les vulnérabilités, éviter le root, minimiser la surface : une image est un vecteur d'attaque potentiel.",
      },
      {
        name: "Compose",
        definition:
          "Décrire un stack multi-conteneurs (app + base + cache) en un fichier YAML : l'environnement local reproductible.",
      },
    ],
    howItWorksTitle: "Du code au conteneur en production",
    howItWorks: ["CODE", "BUILD", "IMAGE", "REGISTRY", "PULL", "RUN"],
    example: {
      title: "Conteneuriser une API",
      steps: [
        "Écrire un Dockerfile multi-stage",
        "Construire et tester l'image en local",
        "La pousser vers le registry",
        "La déployer avec Compose",
        "Vérifier le comportement identique",
      ],
    },
    projectsDetailed: [
      {
        title: "Pipeline de build d'images",
        flow: "Dockerfile → Build → Scan → Push → Tag versionné",
      },
      {
        title: "Scan de vulnérabilités automatisé",
        flow: "Image → Scan Trivy → Rapport → Seuil bloquant",
      },
    ],
  },

  // ------------------------------------------------------------------ ci-cd
  "ci-cd": {
    learning: () => import("./learning-ci-cd").then((m) => m.LEARNING_CI_CD),
    definition:
      "La CI/CD automatise le chemin du commit à la production : intégration continue (build + tests à chaque push) puis livraison/déploiement continu. Objectif : rendre chaque commit un candidat sûr à la production.",
    whyLearn:
      "La livraison manuelle est lente et anxiogène ; la livraison automatisée est un non-événement. La CI/CD rend les déploiements fréquents, petits et réversibles — la marque des équipes qui livrent vite sans casser.",
    prerequisiteNotes: {
      git: "Branches, tags et reviews : le pipeline se déclenche sur les événements Git.",
      docker:
        "Les pipelines construisent et poussent des images : comprendre leur cycle de vie est indispensable.",
    },
    conceptDetails: [
      {
        name: "GitHub Actions / GitLab CI",
        definition:
          "Les plateformes de CI dominantes : des workflows déclarés en YAML, déclenchés par les événements du dépôt.",
      },
      {
        name: "Stratégies de déploiement",
        definition:
          "Rolling, blue/green, canary : comment basculer le trafic vers la nouvelle version en limitant le risque.",
      },
      {
        name: "Environnements",
        definition:
          "Dev, staging, prod : des cibles de déploiement aux exigences croissantes, avec promotions contrôlées.",
      },
      {
        name: "Secrets",
        definition:
          "Injecter clés et tokens dans le pipeline sans jamais les écrire en clair : coffres et variables chiffrées.",
      },
      {
        name: "Rollback",
        definition:
          "Revenir à la version précédente en minutes quand un déploiement échoue : la sécurité qui autorise la vitesse.",
      },
    ],
    howItWorksTitle: "Le pipeline de livraison",
    howItWorks: ["PUSH", "BUILD", "TEST", "SCAN", "DEPLOY", "VERIFY"],
    example: {
      title: "Livrer une correction urgente",
      steps: [
        "Push sur la branche de fix",
        "Tests automatiques en quelques minutes",
        "Déploiement canary sur 5 % du trafic",
        "Vérification des métriques",
        "Généralisation ou rollback",
      ],
    },
    projectsDetailed: [
      {
        title: "Pipeline complet : test → build → deploy",
        flow: "Workflow YAML → Jobs → Artefacts → Déploiement → Notifications",
      },
      {
        title: "Blue/green deployment",
        flow: "Version verte → Tests → Bascule du trafic → Version bleue en stand-by",
      },
    ],
  },

  // ------------------------------------------------------------------ cloud
  cloud: {
    learning: () => import("./learning-cloud").then((m) => m.LEARNING_CLOUD),
    definition:
      "Le cloud fournit l'infrastructure à la demande via API : machines virtuelles, stockage, réseau managé, bases de données. On ne gère plus du matériel, on consomme des services facturés à l'usage.",
    whyLearn:
      "Le cloud est le terrain de jeu du DevOps moderne : élasticité, automatisation totale, services managés. Mais sans comprendre les briques (VPC, IAM, coûts), on construit des architectures chères et fragiles. Les trade-offs économiques font partie du design.",
    prerequisiteNotes: {
      networking:
        "VPC, sous-réseaux, groupes de sécurité : le cloud est d'abord du réseau virtualisé.",
      linux:
        "Les instances cloud sont des machines Linux : tout le socle système s'applique.",
    },
    conceptDetails: [
      {
        name: "EC2 / Compute",
        definition:
          "Les machines virtuelles à la demande : choisir taille, OS et cycle de vie (on-demand, spot, réservé) selon le besoin.",
      },
      {
        name: "Stockage objet",
        definition:
          "S3 et équivalents : du stockage quasi illimité, durable et bon marché, accessible par API. La base des backups et des assets.",
      },
      {
        name: "VPC & sous-réseaux",
        definition:
          "Votre réseau privé dans le cloud : segmentation public/privé, routage, isolation des workloads.",
      },
      {
        name: "IAM",
        definition:
          "La gestion des identités et permissions : qui peut faire quoi, avec le principe du moindre privilège.",
      },
      {
        name: "Coûts & FinOps",
        definition:
          "Le cloud se facture au compteur : taguer, budgéter, alerter. Une architecture sans contrôle des coûts est une dette.",
      },
    ],
    howItWorksTitle: "Provisionner une infrastructure cloud",
    howItWorks: ["VPC", "SUBNETS", "INSTANCES", "SECURITY", "DNS", "MONITOR"],
    example: {
      title: "Héberger une application web",
      steps: [
        "Créer un VPC avec sous-réseaux publics/privés",
        "Lancer les instances dans le privé",
        "Exposer via un load balancer",
        "Configurer le DNS et le TLS",
        "Mettre en place les alertes de coûts",
      ],
    },
    projectsDetailed: [
      {
        title: "VPC multi-AZ from scratch",
        flow: "Plan d'adressage → Sous-réseaux → Routage → NAT → Tests",
      },
      {
        title: "Budget et alertes de coûts",
        flow: "Tags → Budgets → Alertes → Rapport mensuel",
      },
    ],
  },

  // ------------------------------------------------------------------ kubernetes
  kubernetes: {
    learning: () => import("./learning-kubernetes").then((m) => m.LEARNING_KUBERNETES),
    definition:
      "Kubernetes orchestre des conteneurs à l'échelle : il place les workloads, les redémarre en cas de panne, expose les services et monte en charge automatiquement. Devenu le standard, il est exigeant mais incontournable.",
    whyLearn:
      "Kubernetes est la plateforme cible de la plupart des déploiements modernes. Le comprendre, c'est pouvoir déployer, scaler et opérer des applications distribuées de façon déclarative — et c'est le socle de GitOps et du platform engineering.",
    prerequisiteNotes: {
      docker:
        "Pods et images : Kubernetes orchestre des conteneurs, il faut d'abord savoir les construire.",
      cloud:
        "Réseau, load balancing, stockage persistant : le cluster s'appuie sur les briques cloud.",
    },
    conceptDetails: [
      {
        name: "Pods & Deployments",
        definition:
          "Le Pod est l'unité d'exécution ; le Deployment déclare l'état désiré (image, réplicas) et Kubernetes le maintient.",
      },
      {
        name: "Services & Ingress",
        definition:
          "Le Service expose les Pods en interne, l'Ingress route le trafic HTTP externe : la couche réseau applicative.",
      },
      {
        name: "ConfigMaps & Secrets",
        definition:
          "Séparer la configuration du code : variables et fichiers injectés, secrets chiffrés et montés proprement.",
      },
      {
        name: "Helm",
        definition:
          "Le gestionnaire de paquets Kubernetes : des charts paramétrables pour déployer des applications complexes en une commande.",
      },
      {
        name: "Autoscaling",
        definition:
          "Ajuster automatiquement le nombre de réplicas (HPA) selon la charge : l'élasticité déclarative.",
      },
    ],
    howItWorksTitle: "Le cycle de vie d'un déploiement K8s",
    howItWorks: ["MANIFEST", "APPLY", "SCHEDULE", "RUN", "SERVICE", "SCALE"],
    example: {
      title: "Déployer une API sur un cluster",
      steps: [
        "Écrire le Deployment et le Service",
        "Appliquer les manifests",
        "Vérifier le rollout des Pods",
        "Exposer via un Ingress",
        "Activer l'autoscaling",
      ],
    },
    projectsDetailed: [
      {
        title: "Cluster local (kind) multi-services",
        flow: "kind → Namespaces → Deployments → Ingress → Tests",
      },
      {
        title: "Chart Helm réutilisable",
        flow: "Templates → Values → Lint → Installation → Partage",
      },
    ],
  },

  // ------------------------------------------------------------------ iac
  iac: {
    learning: () => import("./learning-iac").then((m) => m.LEARNING_IAC),
    definition:
      "L'Infrastructure as Code déclare l'infrastructure comme du code versionné (Terraform/OpenTofu) : on la relit en pull request, on l'applique automatiquement, on peut la détruire et la reconstruire à volonté.",
    whyLearn:
      "Cliquer dans une console ne se relit pas, ne se teste pas, ne se reproduit pas. L'IaC apporte au provisionnement ce que Git a apporté au code : historique, revue, reproductibilité. C'est le passage à l'infrastructure d'équipe.",
    prerequisiteNotes: {
      cloud:
        "Connaître les ressources (VPC, instances, IAM) qu'on va déclarer : l'IaC modélise le cloud, elle ne l'invente pas.",
      git: "L'infrastructure vit dans Git : branches, reviews et historique s'appliquent aux fichiers Terraform.",
    },
    conceptDetails: [
      {
        name: "Terraform / OpenTofu",
        definition:
          "Les outils déclaratifs de référence : on décrit l'état désiré, l'outil calcule et applique les changements.",
      },
      {
        name: "State & backends",
        definition:
          "L'état (state) mémorise ce qui est déployé : stocké à distance et verrouillé, c'est la source de vérité partagée.",
      },
      {
        name: "Modules",
        definition:
          "Des briques réutilisables et paramétrables (un VPC, un cluster) : la factorisation appliquée à l'infrastructure.",
      },
      {
        name: "Plan & apply en CI",
        definition:
          "Le plan est affiché en pull request pour revue, l'apply s'exécute en CI : jamais d'apply manuel depuis un laptop.",
      },
      {
        name: "Drift detection",
        definition:
          "Détecter quand la réalité a divergé du code (modification manuelle) : l'IaC ne vaut que si elle reste la vérité.",
      },
    ],
    howItWorksTitle: "Le workflow Terraform",
    howItWorks: ["WRITE", "PLAN", "REVIEW", "APPLY", "STATE", "DRIFT"],
    example: {
      title: "Créer un environnement de staging",
      steps: [
        "Écrire les modules (réseau, base, app)",
        "Générer le plan en pull request",
        "Faire relire les changements",
        "Appliquer via la CI",
        "Vérifier l'état et la conformité",
      ],
    },
    projectsDetailed: [
      {
        title: "Infra complète en modules",
        flow: "Modules → Environnement → State distant → Documentation",
      },
      {
        title: "Pipeline Terraform avec plan en PR",
        flow: "PR → terraform plan → Revue → Merge → Apply auto",
      },
    ],
  },

  // ------------------------------------------------------------------ monitoring
  monitoring: {
    learning: () => import("./learning-monitoring").then((m) => m.LEARNING_MONITORING),
    definition:
      "Le monitoring et l'observabilité consistent à savoir ce qui se passe en production avant que les utilisateurs ne s'en plaignent : métriques, logs, traces, et des SLO qui définissent ce que « ça marche » veut dire.",
    whyLearn:
      "Sans observabilité, on pilote à l'aveugle : les incidents se découvrent par les tickets, les causes restent mystérieuses. Passer de la surveillance réactive à des SLO proactifs avec alertes pertinentes, c'est le cœur du métier SRE.",
    prerequisiteNotes: {
      kubernetes:
        "Surveiller un cluster : métriques des Pods, événements, ressources. L'observabilité suit la plateforme.",
      linux:
        "Lire les logs système, comprendre CPU/mémoire/disque : les signaux de base viennent de la machine.",
    },
    conceptDetails: [
      {
        name: "Prometheus & Grafana",
        definition:
          "Le duo standard : Prometheus collecte les métriques en séries temporelles, Grafana les visualise en dashboards.",
      },
      {
        name: "Loki / ELK",
        definition:
          "La centralisation des logs : agréger, chercher et corréler les journaux de tous les services au même endroit.",
      },
      {
        name: "SLO & SLI",
        definition:
          "Les SLI mesurent (latence, disponibilité), les SLO fixent l'objectif contractuel : l'alerting se base sur l'écart, pas sur le bruit.",
      },
      {
        name: "Alerting",
        definition:
          "Des alertes actionnables, avec runbooks, pas du spam : chaque alerte doit mériter de réveiller quelqu'un.",
      },
      {
        name: "On-call",
        definition:
          "L'astreinte organisée : rotations, escalade, post-mortems sans blâme. La culture qui rend l'alerting soutenable.",
      },
    ],
    howItWorksTitle: "De l'incident à la résolution",
    howItWorks: ["METRICS", "THRESHOLD", "ALERT", "TRIAGE", "MITIGATE", "POST-MORTEM"],
    example: {
      title: "Latence anormale sur l'API",
      steps: [
        "L'alerte SLO se déclenche",
        "Le dashboard montre le pic de latence",
        "Les traces identifient le service lent",
        "Les logs révèlent la requête fautive",
        "Correctif, puis post-mortem",
      ],
    },
    projectsDetailed: [
      {
        title: "Stack d'observabilité complète",
        flow: "Prometheus → Grafana → Loki → Dashboards → Alertes",
      },
      {
        title: "Définition de SLO avec alertes",
        flow: "SLI → Objectifs → Budget d'erreur → Alertes → Runbooks",
      },
    ],
  },

  // ------------------------------------------------------------------ devsecops
  devsecops: {
    learning: () => import("./learning-devsecops").then((m) => m.LEARNING_DEVSECOPS),
    definition:
      "Le DevSecOps intègre la sécurité à chaque étape du delivery plutôt qu'en audit final : scans automatiques, gestion des secrets, politiques as code. La sécurité devient un garde-fou du pipeline, pas un frein.",
    whyLearn:
      "Les vulnérabilités découvertes en production coûtent cent fois plus cher qu'en développement. Le shift-left — scanner tôt, bloquer les builds à risque, tracer les dépendances — rend la sécurité continue sans ralentir les livraisons.",
    prerequisiteNotes: {
      "ci-cd":
        "Les contrôles de sécurité s'exécutent dans le pipeline : il faut d'abord en maîtriser la structure.",
      kubernetes:
        "Sécuriser les workloads orchestrés : images, RBAC, network policies, secrets du cluster.",
    },
    conceptDetails: [
      {
        name: "SAST / DAST",
        definition:
          "Analyser le code source (SAST) et tester l'application en exécution (DAST) : deux angles complémentaires pour trouver les failles.",
      },
      {
        name: "Scan d'images",
        definition:
          "Détecter les CVE dans les images de conteneurs avant déploiement, avec des seuils qui bloquent le pipeline.",
      },
      {
        name: "Gestion des secrets",
        definition:
          "Ne jamais commiter de secret : coffres (Vault), rotation, injection au runtime. Un secret en Git est un secret compromis.",
      },
      {
        name: "Policy as code",
        definition:
          "Exprimer les règles (pas de root, ressources limitées) en code vérifié automatiquement à chaque déploiement.",
      },
      {
        name: "SBOM",
        definition:
          "L'inventaire des composants logiciels (Software Bill of Materials) : savoir exactement ce qui tourne pour réagir aux CVE.",
      },
    ],
    howItWorksTitle: "Les gates de sécurité du pipeline",
    howItWorks: ["COMMIT", "SAST", "BUILD", "SCAN", "POLICY", "DEPLOY"],
    example: {
      title: "Bloquer une image vulnérable",
      steps: [
        "Le pipeline construit l'image",
        "Trivy scanne et trouve une CVE critique",
        "Le seuil bloque la promotion",
        "L'équipe met à jour la dépendance",
        "Le pipeline repasse au vert",
      ],
    },
    projectsDetailed: [
      {
        title: "Pipeline avec gates de sécurité",
        flow: "SAST → Build → Scan → Policy → Déploiement conditionnel",
      },
      {
        title: "Vault pour les secrets",
        flow: "Coffre → Politiques d'accès → Injection → Rotation",
      },
    ],
  },

  // ------------------------------------------------------------------ platform-engineering
  "platform-engineering": {
    learning: () => import("./learning-platform-engineering").then((m) => m.LEARNING_PLATFORM_ENGINEERING),
    definition:
      "Le platform engineering construit la plateforme interne que les équipes produit utilisent en self-service : templates, golden paths, portails développeur. La plateforme est traitée comme un produit, dont les développeurs sont les clients.",
    whyLearn:
      "À l'échelle, chaque équipe ne peut pas devenir experte Kubernetes, Terraform et sécurité. La plateforme abstrait la complexité et standardise les bonnes pratiques : les développeurs livrent plus vite, les ops gardent le contrôle. C'est l'aboutissement du parcours DevOps.",
    prerequisiteNotes: {
      kubernetes:
        "La plateforme s'appuie sur l'orchestration : il faut maîtriser ce qu'on abstrait.",
      iac: "Les golden paths provisionnent via l'IaC : modules et state sont les fondations.",
      monitoring:
        "Une plateforme sans observabilité intégrée reporte les problèmes aux équipes : les standards incluent les SLO.",
    },
    conceptDetails: [
      {
        name: "IDP",
        definition:
          "L'Internal Developer Platform : l'ensemble des outils, APIs et docs en self-service pour construire et livrer.",
      },
      {
        name: "Golden paths",
        definition:
          "Les chemins pavés et recommandés (template + pipeline + observabilité) : la voie facile est aussi la voie sûre.",
      },
      {
        name: "Backstage",
        definition:
          "Le portail développeur open source (Spotify) : catalogue de services, templates, docs. La vitrine de la plateforme.",
      },
      {
        name: "GitOps (ArgoCD)",
        definition:
          "Git comme source de vérité du cluster : ArgoCD synchronise en continu l'état désiré vers Kubernetes.",
      },
      {
        name: "DX",
        definition:
          "La Developer Experience : mesurer et améliorer la vie des développeurs (temps de setup, de build, de déploiement).",
      },
    ],
    howItWorksTitle: "Le golden path d'un nouveau service",
    howItWorks: ["TEMPLATE", "CODE", "PIPELINE", "DEPLOY", "OBSERVE", "SCALE"],
    example: {
      title: "Lancer un microservice en une heure",
      steps: [
        "Choisir le template dans le portail",
        "Renseigner nom et paramètres",
        "Le pipeline crée dépôt, CI et manifests",
        "ArgoCD déploie sur le cluster",
        "Dashboards et alertes prêts d'office",
      ],
    },
    projectsDetailed: [
      {
        title: "Template de service self-service",
        flow: "Backstage → Template → Pipeline → Cluster → Documentation",
      },
      {
        title: "GitOps avec ArgoCD",
        flow: "Dépôt Git → ArgoCD → Sync → Drift auto-corrigé",
      },
    ],
  },
};

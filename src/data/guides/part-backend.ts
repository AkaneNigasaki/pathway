import type { SkillGuide } from "../skill-guides";

/**
 * Guides pédagogiques — backend : parcours Backend Developer.
 *
 * Ces entrées enrichissent les compétences de la roadmap `backend-developer`
 * (désignées par leur `id`) avec un contenu éditorial structuré :
 * définition, intérêt pédagogique, prérequis expliqués, concepts clés,
 * fonctionnement, exemple concret et projets progressifs.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - Ton : documentation technique premium, concret, sans marketing. Français.
 */
export const GUIDES_BACKEND: Record<string, SkillGuide> = {
  // ------------------------------------------------------------------ git
  git: {
    learning: () => import("./learning-git").then((m) => m.LEARNING_GIT),
    definition:
      "Git est un système de gestion de versions distribué : il enregistre l'historique des modifications d'un projet, permet de travailler en branches parallèles et de fusionner le travail de plusieurs personnes.",
    whyLearn:
      "Git est l'outil de collaboration universel du développement : chaque projet sérieux vit dans un dépôt. Un historique propre raconte les intentions, les pull requests structurent la revue de code, et la capacité à revenir en arrière transforme les erreurs en incidents mineurs.",
    conceptDetails: [
      {
        name: "Commits atomiques",
        definition:
          "Un commit = un changement logique unique, avec un message clair : l'historique devient lisible et chaque modification est réversible isolément.",
      },
      {
        name: "Branches & merges",
        definition:
          "Les branches isolent les travaux en cours ; le merge les réunit. C'est le mécanisme qui permet à dix développeurs d'avancer sans se marcher dessus.",
      },
      {
        name: "Rebase",
        definition:
          "Rejouer ses commits sur une base à jour pour un historique linéaire : propre, mais à réserver aux branches non partagées.",
      },
      {
        name: "Pull requests",
        definition:
          "La demande de fusion est le lieu de la revue de code : discussion, suggestions, validation automatisée avant intégration.",
      },
      {
        name: "Résolution de conflits",
        definition:
          "Quand deux modifications touchent les mêmes lignes, Git demande un arbitrage humain : comprendre les marqueurs et choisir le bon résultat.",
      },
    ],
    howItWorksTitle: "Le cycle d'une modification",
    howItWorks: ["WORKDIR", "STAGE", "COMMIT", "PUSH", "PR", "MERGE"],
    example: {
      title: "Corriger un bug",
      steps: [
        "Création d'une branche fix/login",
        "Commits atomiques décrivant chaque étape",
        "Push de la branche sur le dépôt distant",
        "Pull request avec description du correctif",
        "Revue par un pair puis merge",
      ],
    },
    projectsDetailed: [
      {
        title: "Workflow Git propre sur un projet",
        flow: "Branches nommées → Commits atomiques → Pull requests → Historique lisible",
      },
      {
        title: "Contribution open source",
        flow: "Fork → Issue choisie → Pull request → Retours des mainteneurs → Merge",
      },
    ],
  },

  // ------------------------------------------------------------------ linux
  linux: {
    learning: () => import("./learning-linux").then((m) => m.LEARNING_LINUX),
    definition:
      "Linux est le système d'exploitation de la quasi-totalité des serveurs : le maîtriser via le terminal, c'est administrer les machines où le code tourne réellement en production.",
    whyLearn:
      "Votre code s'exécute sur Linux : déploiements, conteneurs, intégration continue et debugging en production passent par le terminal. Comprendre permissions, processus et SSH, c'est passer du « ça marche sur ma machine » au « ça tourne en production ».",
    conceptDetails: [
      {
        name: "Terminal & shell",
        definition:
          "Le shell (bash, zsh) interprète vos commandes et les enchaîne via pipes et redirections : l'interface la plus puissante du système.",
      },
      {
        name: "Permissions",
        definition:
          "Chaque fichier a un propriétaire et des droits (lecture, écriture, exécution) : le premier rempart de la sécurité d'un serveur.",
      },
      {
        name: "Processus & services",
        definition:
          "Les programmes tournent comme des processus gérés par systemd : démarrer, arrêter, surveiller un service est un réflexe d'exploitation.",
      },
      {
        name: "SSH",
        definition:
          "Secure Shell ouvre un terminal chiffré sur une machine distante : le canal par lequel on administre les serveurs, idéalement avec des clés.",
      },
      {
        name: "Scripting bash",
        definition:
          "Assembler des commandes en scripts automatise les tâches répétitives : sauvegardes, déploiements, vérifications.",
      },
    ],
    howItWorksTitle: "Une commande, de bout en bout",
    howItWorks: ["PROMPT", "PARSE", "PROCESSUS", "SYSCALL", "SORTIE", "CODE"],
    example: {
      title: "Déployer à la main",
      steps: [
        "Connexion SSH au serveur",
        "Récupération du code (git pull)",
        "Variables d'environnement vérifiées",
        "Redémarrage du service",
        "Lecture des logs pour valider",
      ],
    },
    projectsDetailed: [
      {
        title: "Serveur configuré de zéro",
        flow: "VPS → Clés SSH → Pare-feu → Utilisateur dédié → Service applicatif",
      },
      {
        title: "Scripts d'automatisation",
        flow: "Sauvegarde → Planification cron → Rotation des logs → Alerte en cas d'échec",
      },
    ],
  },

  // ------------------------------------------------------------------ python
  python: {
    learning: () => import("./learning-python-general").then((m) => m.LEARNING_PYTHON_GENERAL),
    definition:
      "Python est un langage de programmation généraliste réputé pour sa lisibilité : syntaxe claire, typage dynamique, écosystème immense — du scripting aux APIs en passant par la data.",
    whyLearn:
      "Python est le langage backend le plus polyvalent : APIs web, automatisation, data science, outillage. Sa lisibilité accélère l'apprentissage des concepts fondamentaux (POO, asynchrone, packaging), transférables ensuite à tous les autres langages.",
    conceptDetails: [
      {
        name: "Syntaxe & types",
        definition:
          "Indentation significative, types dynamiques : un code qui se lit presque comme du pseudo-code, idéal pour apprendre les structures de programmation.",
      },
      {
        name: "POO",
        definition:
          "Classes, héritage, encapsulation : la programmation orientée objet structure le code en entités qui portent données et comportements.",
      },
      {
        name: "Environnements virtuels",
        definition:
          "Un venv isole les dépendances d'un projet : deux projets peuvent utiliser deux versions d'une même bibliothèque sans conflit.",
      },
      {
        name: "Gestion de paquets",
        definition:
          "pip et les fichiers requirements verrouillent les dépendances : un projet s'installe de façon reproductible sur n'importe quelle machine.",
      },
      {
        name: "Asyncio",
        definition:
          "La boucle événementielle async/await traite des milliers d'opérations d'attente (réseau, disque) avec un seul thread : la base des APIs performantes.",
      },
    ],
    howItWorksTitle: "L'exécution d'un script",
    howItWorks: ["SOURCE", "BYTECODE", "INTERPRÉTEUR", "OBJETS", "GC", "SORTIE"],
    example: {
      title: "Un script de renommage de fichiers",
      steps: [
        "Parcours du dossier cible",
        "Règle de renommage définie",
        "Mode dry-run : aperçu sans toucher",
        "Application des renommages",
        "Journal des actions effectuées",
      ],
    },
    projectsDetailed: [
      {
        title: "CLI utilitaire",
        flow: "argparse → Sous-commandes → Gestion d'erreurs → Packaging pip",
      },
      {
        title: "Scraper avec gestion d'erreurs",
        flow: "Requêtes HTTP → Parsing HTML → Retry exponentiel → Stockage CSV",
      },
    ],
  },

  // ------------------------------------------------------------------ api-rest
  "api-rest": {
    learning: () => import("./learning-api-rest").then((m) => m.LEARNING_API_REST),
    definition:
      "Une API REST expose les données d'un système comme des ressources adressées par des URLs et manipulées avec les verbes HTTP : le contrat standard entre un client et un serveur.",
    whyLearn:
      "REST est le langage commun du backend : frontends, applications mobiles et services tiers consomment vos APIs. Savoir modéliser des ressources, choisir les bons statuts et documenter avec OpenAPI, c'est construire des interfaces que d'autres développeurs utilisent sans friction.",
    prerequisiteNotes: {
      python:
        "Les fondamentaux du langage : fonctions, classes et gestion d'erreurs pour écrire les handlers de routes.",
    },
    conceptDetails: [
      {
        name: "Ressources & verbes HTTP",
        definition:
          "Les données sont des ressources nommées (/users, /articles) manipulées par GET, POST, PUT, PATCH, DELETE : des URLs stables, des verbes sémantiques.",
      },
      {
        name: "Codes de statut",
        definition:
          "201 pour une création, 404 pour une ressource absente, 422 pour des données invalides : le statut raconte le résultat sans lire le corps.",
      },
      {
        name: "Pagination",
        definition:
          "Découper les collections en pages (limit/offset ou curseurs) : on ne renvoie jamais des millions d'objets en une seule réponse.",
      },
      {
        name: "Validation",
        definition:
          "Vérifier les données entrantes (types, formats, contraintes) avant tout traitement : la première ligne de défense de l'API.",
      },
      {
        name: "Documentation OpenAPI",
        definition:
          "Un contrat lisible par les humains et les machines : schémas, exemples, codes d'erreur — générable automatiquement avec FastAPI.",
      },
    ],
    howItWorksTitle: "Le cycle d'une requête",
    howItWorks: ["CLIENT", "ROUTE", "VALIDATION", "LOGIQUE", "BASE", "RÉPONSE"],
    example: {
      title: "Créer un article",
      steps: [
        "POST /articles avec un JSON",
        "Validation du schéma (titre requis)",
        "Insertion en base de données",
        "Réponse 201 avec l'article créé",
        "En-tête Location vers la ressource",
      ],
    },
    projectsDetailed: [
      {
        title: "API CRUD complète avec FastAPI",
        flow: "Modèles → Routes → Validation Pydantic → Tests",
      },
      {
        title: "API documentée avec OpenAPI",
        flow: "Schémas → Interface Swagger → Exemples → Versioning /v1",
      },
    ],
  },

  // ------------------------------------------------------------------ sql
  sql: {
    learning: () => import("./learning-sql").then((m) => m.LEARNING_SQL),
    definition:
      "SQL (Structured Query Language) est le langage d'interrogation des bases de données relationnelles : il permet de définir, lire et modifier des données structurées en tables liées entre elles.",
    whyLearn:
      "Les données sont le cœur de presque toute application, et SQL reste leur langage universel. Savoir modéliser un schéma, écrire des jointures efficaces et comprendre les index, c'est éviter les lenteurs et les incohérences qui plombent les projets en production.",
    prerequisiteNotes: {
      python:
        "Manipuler des données en Python : SQL prend le relais quand elles doivent persister, se lier et s'interroger à grande échelle.",
    },
    conceptDetails: [
      {
        name: "Modélisation & normalisation",
        definition:
          "Découper les données en tables liées sans redondance (formes normales) : chaque fait est stocké une seule fois, à un seul endroit.",
      },
      {
        name: "Jointures",
        definition:
          "INNER, LEFT, RIGHT JOIN recombinent les tables via leurs clés : le mécanisme central pour reconstituer l'information éclatée par la normalisation.",
      },
      {
        name: "Index",
        definition:
          "Des structures qui accélèrent les recherches et les tris, au prix d'écritures plus lentes : à poser sur les colonnes filtrées, jamais au hasard.",
      },
      {
        name: "Transactions",
        definition:
          "Un groupe d'opérations atomique (tout ou rien, ACID) : garantit la cohérence quand plusieurs écritures dépendent les unes des autres.",
      },
      {
        name: "PostgreSQL",
        definition:
          "Le SGBD open source de référence : robuste, riche en types et en fonctionnalités avancées (JSON, full-text, extensions).",
      },
    ],
    howItWorksTitle: "L'exécution d'une requête",
    howItWorks: ["SQL", "PARSE", "PLAN", "INDEX", "SCAN", "ROWS"],
    example: {
      title: "Les commandes récentes d'un client",
      steps: [
        "Tables clients et commandes liées",
        "JOIN sur la clé client_id",
        "Filtre sur les 30 derniers jours",
        "Tri par date décroissante",
        "Résultat paginé, 20 par page",
      ],
    },
    projectsDetailed: [
      {
        title: "Schéma e-commerce normalisé",
        flow: "Entités → Relations → Contraintes → Migrations versionnées",
      },
      {
        title: "Requêtes analytiques complexes",
        flow: "Agrégations → Fonctions de fenêtre → CTE → Analyse du plan d'exécution",
      },
    ],
  },

  // ------------------------------------------------------------------ auth
  auth: {
    learning: () => import("./learning-auth").then((m) => m.LEARNING_AUTH),
    definition:
      "L'authentification vérifie l'identité d'un utilisateur, l'autorisation définit ce qu'il peut faire : ensemble, elles protègent l'accès aux ressources d'une application.",
    whyLearn:
      "La sécurité des accès est non négociable : une faille d'authentification expose toutes les données. Comprendre JWT, OAuth2, le hachage des mots de passe et les attaques classiques du OWASP Top 10, c'est construire des systèmes dignes de confiance.",
    prerequisiteNotes: {
      "api-rest":
        "Les endpoints à protéger : l'authentification s'applique sur les routes de l'API, pas à côté.",
    },
    conceptDetails: [
      {
        name: "JWT & sessions",
        definition:
          "Les JWT portent l'identité dans un token signé et sans état ; les sessions la conservent côté serveur : deux stratégies aux compromis différents.",
      },
      {
        name: "OAuth2 / OIDC",
        definition:
          "Le standard de la délégation d'accès (« Se connecter avec Google ») : l'application ne voit jamais le mot de passe de l'utilisateur.",
      },
      {
        name: "Hachage (bcrypt, Argon2)",
        definition:
          "Les mots de passe ne se stockent jamais en clair : des fonctions de hachage lentes et salées les rendent inexploitables en cas de fuite.",
      },
      {
        name: "RBAC",
        definition:
          "Le contrôle d'accès par rôles (admin, éditeur, lecteur) centralise les permissions : qui peut faire quoi, défini en un seul endroit.",
      },
      {
        name: "OWASP Top 10",
        definition:
          "Le classement des failles web les plus critiques (injection, XSS, broken access control) : la checklist de tout développeur backend.",
      },
    ],
    howItWorksTitle: "Une connexion sécurisée",
    howItWorks: ["IDENTIFIANTS", "VÉRIFICATION", "TOKEN", "REQUÊTE", "VALIDATION", "ACCÈS"],
    example: {
      title: "Se connecter à une application",
      steps: [
        "Envoi de l'email et du mot de passe",
        "Comparaison avec le hash stocké",
        "Émission d'un JWT de courte durée",
        "Stockage en cookie httpOnly sécurisé",
        "Chaque requête suivante est vérifiée",
      ],
    },
    projectsDetailed: [
      {
        title: "Auth complète avec refresh tokens",
        flow: "Inscription → Login → Refresh silencieux → Révocation à la déconnexion",
      },
      {
        title: "SSO avec un provider OAuth",
        flow: "Redirection → Code d'autorisation → Échange de tokens → Profil utilisateur",
      },
    ],
  },

  // ------------------------------------------------------------------ testing-api
  "testing-api": {
    learning: () => import("./learning-testing-api").then((m) => m.LEARNING_TESTING_API),
    definition:
      "Les tests backend vérifient automatiquement que l'API se comporte comme promis : réponses correctes, données valides, erreurs gérées — à chaque modification du code.",
    whyLearn:
      "Une API sans tests est une promesse sans garantie : chaque déploiement devient un risque. Les tests d'intégration, qui exercent les vraies routes contre une vraie base, forment le filet qui permet de refactorer sereinement et de livrer en continu.",
    prerequisiteNotes: {
      python:
        "Pytest et les fixtures s'écrivent en Python : assertions, organisation, bonnes pratiques de test.",
      "api-rest":
        "Connaître les routes et leurs contrats : on teste ce que l'API promet à ses consommateurs.",
    },
    conceptDetails: [
      {
        name: "Pytest",
        definition:
          "Le framework de test Python de référence : assertions simples, plugins riches, exécution rapide — le standard de l'écosystème.",
      },
      {
        name: "Fixtures",
        definition:
          "Des contextes réutilisables (client de test, base isolée) injectés dans les tests : chaque test part d'un état propre et prévisible.",
      },
      {
        name: "Tests d'intégration",
        definition:
          "Exercer les vraies routes HTTP de bout en bout, base de données comprise : ils valident le comportement réel, pas des mocks.",
      },
      {
        name: "Testcontainers",
        definition:
          "Des conteneurs Docker éphémères (Postgres, Redis) pour les tests : une vraie base, sans installation ni état partagé.",
      },
      {
        name: "Couverture utile",
        definition:
          "Le pourcentage de code exécuté par les tests n'est qu'un indicateur : ce qui compte, c'est la couverture des chemins critiques et des cas limites.",
      },
    ],
    howItWorksTitle: "Un test d'intégration",
    howItWorks: ["FIXTURE", "REQUÊTE", "API", "BASE TEST", "ASSERT", "ROLLBACK"],
    example: {
      title: "Tester la création d'un article",
      steps: [
        "Base de données de test isolée",
        "POST /articles via le client de test",
        "Vérification du statut 201",
        "Lecture de l'article en base",
        "Rollback : la base reste propre",
      ],
    },
    projectsDetailed: [
      {
        title: "Suite de tests à 80 %+ sur une API",
        flow: "Routes critiques → Tests d'intégration → Exécution en CI → Couverture suivie",
      },
      {
        title: "Tests de contrat",
        flow: "Schémas OpenAPI → Vérification producteur → Vérification consommateur → CI",
      },
    ],
  },

  // ------------------------------------------------------------------ caching
  caching: {
    learning: () => import("./learning-caching").then((m) => m.LEARNING_CACHING),
    definition:
      "Le caching consiste à conserver les résultats coûteux (requêtes, calculs, réponses HTTP) pour les resservir instantanément : la technique la plus rentable pour accélérer un backend.",
    whyLearn:
      "La plupart des lenteurs backend viennent de calculs répétés inutilement. Une stratégie de cache bien pensée — quoi cacher, combien de temps, comment invalider — transforme des réponses en secondes en réponses en millisecondes et soulage les bases de données.",
    prerequisiteNotes: {
      "api-rest":
        "Identifier les endpoints chauds : le cache se place devant les routes lentes et fréquemment appelées.",
      sql: "Comprendre les requêtes coûteuses : on ne cache bien que ce que l'on a mesuré.",
    },
    conceptDetails: [
      {
        name: "Redis",
        definition:
          "Le magasin clé-valeur en mémoire de référence : cache, sessions, files, compteurs — simple, rapide, omniprésent.",
      },
      {
        name: "Stratégies de cache",
        definition:
          "Cache-aside, write-through, TTL : qui remplit le cache, quand, et combien de temps les données y restent valides.",
      },
      {
        name: "N+1 & optimisation requêtes",
        definition:
          "Le piège classique : N requêtes au lieu d'une seule. Avant de cacher, on corrige — un cache ne doit pas masquer un mauvais SQL.",
      },
      {
        name: "Pagination curseur",
        definition:
          "Paginer par curseur plutôt que par offset : stable et performant sur les grandes collections, même quand les données bougent.",
      },
      {
        name: "Rate limiting",
        definition:
          "Limiter le nombre de requêtes par client et par période : protège l'API des abus et garantit un service équitable.",
      },
    ],
    howItWorksTitle: "Une requête cachée",
    howItWorks: ["REQUÊTE", "CLÉ", "HIT ?", "MISS → BASE", "STOCKAGE", "RÉPONSE"],
    example: {
      title: "Le top des articles populaires",
      steps: [
        "GET /articles/popular reçu",
        "Clé Redis consultée, TTL de 5 minutes",
        "Hit : réponse en 5 ms",
        "Miss : calcul en base puis mise en cache",
        "Invalidation à chaque nouvelle publication",
      ],
    },
    projectsDetailed: [
      {
        title: "Cache Redis sur endpoints chauds",
        flow: "Mesure des latences → Clés et TTL → Invalidation → Gain documenté",
      },
      {
        title: "Optimisation : 2 s → 80 ms",
        flow: "Profiling → Correction N+1 → Index → Cache ciblé",
      },
    ],
  },

  // ------------------------------------------------------------------ messaging
  messaging: {
    learning: () => import("./learning-messaging").then((m) => m.LEARNING_MESSAGING),
    definition:
      "Les files de messages (RabbitMQ, Kafka) permettent aux services de communiquer de façon asynchrone : un producteur dépose des événements, des consommateurs les traitent à leur rythme.",
    whyLearn:
      "L'asynchrone découple les systèmes : un pic de trafic n'écrase plus l'API, un service en panne ne bloque pas les autres. C'est le fondement des architectures événementielles et le prérequis pour scaler au-delà d'un serveur unique.",
    prerequisiteNotes: {
      "api-rest":
        "Les APIs synchrones montrent leurs limites : timeouts, pics de charge, traitements longs à externaliser.",
    },
    conceptDetails: [
      {
        name: "Queues & topics",
        definition:
          "Les queues distribuent les tâches aux workers, les topics diffusent les événements aux abonnés : deux modèles pour deux besoins.",
      },
      {
        name: "Idempotence",
        definition:
          "Un consommateur doit supporter les doublons : traiter deux fois le même message sans effet de bord, car les redélivrances arrivent.",
      },
      {
        name: "Retry & DLQ",
        definition:
          "Les échecs sont réessayés avec backoff, puis dirigés vers une dead-letter queue pour analyse : aucun message ne disparaît silencieusement.",
      },
      {
        name: "Event-driven",
        definition:
          "Des services qui réagissent à des événements plutôt qu'à des appels directs : couplage faible, extensibilité forte.",
      },
      {
        name: "Kafka vs RabbitMQ",
        definition:
          "RabbitMQ excelle en routage flexible de tâches, Kafka en journal d'événements à haut débit rejouable : le choix dépend du cas d'usage.",
      },
    ],
    howItWorksTitle: "Le voyage d'un message",
    howItWorks: ["EVENT", "PRODUCER", "BROKER", "QUEUE", "CONSUMER", "ACK"],
    example: {
      title: "Envoyer un email de bienvenue",
      steps: [
        "Inscription traitée par l'API",
        "Événement user.created publié",
        "Le worker consommateur le reçoit",
        "Envoi de l'email via le provider",
        "Accusé de réception du message",
      ],
    },
    projectsDetailed: [
      {
        title: "Worker asynchrone d'envoi d'emails",
        flow: "Queue → Worker → Retry exponentiel → Dead-letter queue",
      },
      {
        title: "Pipeline événementiel",
        flow: "Événements métier → Topics → Consommateurs → Monitoring des lag",
      },
    ],
  },

  // ------------------------------------------------------------------ docker
  docker: {
    learning: () => import("./learning-docker").then((m) => m.LEARNING_DOCKER),
    definition:
      "Docker conteneurise les applications : il embarque le code et toutes ses dépendances dans une image portable qui s'exécute de façon identique sur n'importe quelle machine.",
    whyLearn:
      "Docker élimine le « ça marche sur ma machine » : les environnements de développement, de test et de production deviennent identiques. C'est aussi la brique de base du déploiement moderne — Compose en local, orchestrateurs en production.",
    prerequisiteNotes: {
      linux:
        "Le terminal et les processus : Docker s'utilise en ligne de commande et isole au niveau du système d'exploitation.",
    },
    conceptDetails: [
      {
        name: "Images & layers",
        definition:
          "Une image est un empilement de couches en lecture seule : chaque instruction du Dockerfile ajoute une couche, partagée et mise en cache.",
      },
      {
        name: "Dockerfile",
        definition:
          "La recette de construction de l'image : image de base, dépendances, code, commande de démarrage — versionnée comme le code.",
      },
      {
        name: "Volumes & réseaux",
        definition:
          "Les volumes persistent les données au-delà de la vie du conteneur, les réseaux virtuels relient les conteneurs entre eux.",
      },
      {
        name: "Docker Compose",
        definition:
          "Un fichier YAML qui décrit une stack complète (API, base, cache) et la démarre d'une commande : l'environnement de dev reproductible.",
      },
      {
        name: "Multi-stage builds",
        definition:
          "Construire dans une image outillée puis copier le résultat dans une image minimale : des images finales légères et sûres.",
      },
    ],
    howItWorksTitle: "De l'image au conteneur",
    howItWorks: ["DOCKERFILE", "LAYERS", "IMAGE", "RUN", "CONTAINER", "ISOLATION"],
    example: {
      title: "Conteneuriser une API Python",
      steps: [
        "Dockerfile multi-stage rédigé",
        "Build de l'image versionnée",
        "docker-compose avec Postgres",
        "Variables d'environnement injectées",
        "API joignable en local, à l'identique",
      ],
    },
    projectsDetailed: [
      {
        title: "Stack complète en Compose",
        flow: "API → Base de données → Redis → Réseaux → Volumes persistants",
      },
      {
        title: "Image optimisée < 100 Mo",
        flow: "Base Alpine → Multi-stage → .dockerignore → Scan de vulnérabilités",
      },
    ],
  },

  // ------------------------------------------------------------------ observability
  observability: {
    learning: () => import("./learning-observability").then((m) => m.LEARNING_OBSERVABILITY),
    definition:
      "L'observabilité regroupe les pratiques pour comprendre un système en production : logs structurés, métriques et traces distribuées qui racontent ce qui s'y passe réellement.",
    whyLearn:
      "En production, on ne peut plus « mettre un breakpoint » : il faut des instruments. Savoir instrumenter son code, construire des dashboards et des alertes pertinentes, c'est diagnostiquer en minutes au lieu d'heures — et dormir la nuit.",
    prerequisiteNotes: {
      docker:
        "Les conteneurs produisent les logs : savoir les collecter et les agréger vers une plateforme centrale.",
      "api-rest":
        "Instrumenter les handlers : durées, erreurs et volumétrie par endpoint pour savoir quoi surveiller.",
    },
    conceptDetails: [
      {
        name: "Logs structurés",
        definition:
          "Des logs en JSON avec champs normalisés (niveau, service, trace_id) : requêtables et corrélables, contrairement au texte libre.",
      },
      {
        name: "Métriques (Prometheus)",
        definition:
          "Des valeurs numériques agrégées dans le temps (latence, erreurs, saturation) : la base des dashboards et des alertes.",
      },
      {
        name: "Tracing (OpenTelemetry)",
        definition:
          "Suivre une requête à travers tous les services via des spans corrélés : indispensable dès que l'architecture se distribue.",
      },
      {
        name: "Alerting",
        definition:
          "Des seuils sur les bons signaux (taux d'erreur, latence p99) qui préviennent avant que les utilisateurs ne se plaignent — sans bruit inutile.",
      },
      {
        name: "Dashboards",
        definition:
          "La vue d'ensemble de la santé du système : RED (rate, errors, duration) par service, lisible en un coup d'œil pendant un incident.",
      },
    ],
    howItWorksTitle: "D'un incident à sa cause",
    howItWorks: ["ALERTE", "DASHBOARD", "LOGS", "TRACES", "CAUSE", "FIX"],
    example: {
      title: "Une API qui ralentit",
      steps: [
        "Alerte : latence p99 au-delà du seuil",
        "Dashboard : un seul endpoint concerné",
        "Trace d'une requête lente isolée",
        "Requête SQL sans index identifiée",
        "Index ajouté, latence redescendue",
      ],
    },
    projectsDetailed: [
      {
        title: "Stack Prometheus + Grafana",
        flow: "Instrumentation → Scraping → Dashboards → Alertes",
      },
      {
        title: "Tracing distribué sur 3 services",
        flow: "OpenTelemetry → Spans corrélés → Visualisation → Analyse des lenteurs",
      },
    ],
  },

  // ------------------------------------------------------------------ system-design
  "system-design": {
    learning: () => import("./learning-system-design").then((m) => m.LEARNING_SYSTEM_DESIGN),
    definition:
      "Le system design est l'art de concevoir des systèmes logiciels à grande échelle : choisir les composants, leurs interactions et les compromis (cohérence, disponibilité, coût) avant d'écrire la moindre ligne de code.",
    whyLearn:
      "Passer d'une application à un système, c'est changer d'échelle de pensée : un million d'utilisateurs ne se gère pas comme cent. Savoir raisonner en trade-offs, dessiner une architecture et la défendre, c'est la compétence qui distingue un développeur senior.",
    prerequisiteNotes: {
      "api-rest":
        "Les APIs sont les interfaces du système : leur design conditionne le découpage en services.",
      sql: "Le stockage est souvent le goulot : sharding, réplication et dénormalisation à connaître.",
      auth: "La sécurité traverse tout le système : identité, secrets, principe du moindre privilège.",
      caching: "Le cache est un composant d'architecture à part entière, pas une rustine posée après coup.",
    },
    conceptDetails: [
      {
        name: "Load balancing",
        definition:
          "Répartir le trafic sur plusieurs instances : la première réponse à la montée en charge, avant toute complexité.",
      },
      {
        name: "Sharding & réplication",
        definition:
          "Le sharding divise les données entre serveurs, la réplication les copie pour la disponibilité : deux leviers complémentaires du passage à l'échelle.",
      },
      {
        name: "CAP theorem",
        definition:
          "En cas de partition réseau, impossible de garantir à la fois cohérence et disponibilité : tout système distribué choisit son compromis.",
      },
      {
        name: "Microservices vs monolithe",
        definition:
          "Un monolithe modulaire bien conçu bat souvent des microservices prématurés : découper pour des raisons d'équipe et de charge, pas par dogme.",
      },
      {
        name: "ADR",
        definition:
          "Les Architecture Decision Records capturent chaque choix structurant avec son contexte : la mémoire des arbitrages du système.",
      },
    ],
    howItWorksTitle: "Concevoir un système",
    howItWorks: ["BESOINS", "VOLUMES", "COMPOSANTS", "FLUX", "TRADE-OFFS", "ADR"],
    example: {
      title: "Un raccourcisseur d'URL",
      steps: [
        "Estimation : 100 M d'URLs par mois",
        "API fine + base clé-valeur",
        "Cache des URLs populaires",
        "Sharding par hash de la clé",
        "Monitoring dès le jour un",
      ],
    },
    projectsDetailed: [
      {
        title: "Design d'un système à 1 M d'utilisateurs",
        flow: "Besoins fonctionnels → Estimation des volumes → Schéma → Trade-offs documentés",
      },
      {
        title: "Revue d'architecture complète",
        flow: "Système existant → Points faibles → Propositions → Feuille de route",
      },
    ],
  },

  // ------------------------------------------------------------------ csharp
  csharp: {
    learning: () => import("./learning-csharp").then((m) => m.LEARNING_CSHARP),
    "conceptDetails": [
      {
        "definition": "Le système de types distingue types valeur (struct, int) et types référence (class) : comprendre cette différence explique la plupart des comportements surprenants du langage.",
        "name": "Types & classes"
      },
      {
        "definition": "Language Integrated Query : interroger des collections (filtrage, tri, projection) avec une syntaxe déclarative intégrée au langage, exécutée en mémoire ou traduite en SQL.",
        "name": "LINQ"
      },
      {
        "definition": "La programmation asynchrone sans callback hell : `async`/`await` suspend l'exécution en attendant une opération d'entrée-sortie tout en libérant le thread pour d'autres tâches.",
        "name": "Async/await"
      },
      {
        "definition": "Les types référence nullables (`string?`) et l'analyse de nullabilité du compilateur détectent les déréférencements nuls avant l'exécution.",
        "name": "Nullable"
      },
      {
        "definition": "Des types immuables à sémantique de valeur, déclarés en une ligne, idéaux pour les modèles de données et les objets de transfert.",
        "name": "Records"
      },
      {
        "definition": "Le filtrage par motif (expressions `switch`, opérateur `is`) remplace les cascades de `if` et de conversions par des tests de forme lisibles et vérifiés par le compilateur.",
        "name": "Pattern matching"
      }
    ],
    "definition": "C# (prononcé « C sharp ») est un langage moderne et typé statiquement, conçu par Microsoft : il associe la productivité d'un langage managé (ramasse-miettes, bibliothèque standard riche) à une syntaxe expressive. Il est le langage principal de la plateforme .NET, utilisé pour le web (ASP.NET Core), le jeu vidéo (Unity), le desktop et le mobile.",
    "environment": [
      "SDK .NET (LTS) installé et `dotnet` dans le PATH",
      "Un terminal (PowerShell, bash ou zsh)",
      "VS Code + extension « C# Dev Kit », Visual Studio ou JetBrains Rider",
      "Un débogueur configuré (inclus dans les trois IDE ci-dessus)",
      "Git pour versionner le projet"
    ],
    "example": {
      "steps": [
        "Créer le projet avec `dotnet new webapi -n TasksApi` puis entrer dans le dossier.",
        "Lancer avec `dotnet run` et ouvrir l'URL affichée pour vérifier que le contrôleur d'exemple répond.",
        "Ajouter un `record TaskItem(int Id, string Title, bool Done)` et un contrôleur avec des endpoints GET et POST en mémoire.",
        "Relancer avec `dotnet run`, tester les endpoints (créer puis lister des tâches) et observer les logs de requêtes."
      ],
      "title": "Créer une API de gestion de tâches"
    },
    "howItWorks": [
      "SOURCE",
      "COMPILATION",
      "IL",
      "JIT",
      "CLR"
    ],
    "howItWorksTitle": "Du code source à l'exécution",
    "prerequisiteNotes": {
      "python": "Les bases de la programmation (variables, fonctions, boucles) se transfèrent directement à C#."
    },
    "projectsDetailed": [
      {
        "flow": "Lecture clavier → Calculs avec types valeur → Affichage formaté → `dotnet run` pour tester",
        "title": "Convertisseur d'unités en console"
      },
      {
        "flow": "`dotnet new webapi` → Modèles `record` → Contrôleurs CRUD → Tests des endpoints",
        "title": "API REST de bibliothèque"
      },
      {
        "flow": "API + base de données → Authentification → Validation des entrées → Déploiement",
        "title": "Application complète avec persistance"
      }
    ],
    "setup": {
      "configure": [
        "Créez un projet console avec `dotnet new console -n HelloWorld` : la commande génère un dossier contenant un fichier `.csproj` (qui décrit le framework cible et les dépendances) et un `Program.cs` — la présence du `.csproj` prouve que le projet est bien structuré.",
        "Ajoutez un `.gitignore` adapté avec `dotnet new gitignore` à la racine : les dossiers `bin/` et `obj/` créés par la compilation seront exclus du versionnement — vérifiez-le avec `git status` après une première compilation."
      ],
      "editors": [
        "VS Code avec l'extension « C# Dev Kit » (Microsoft) : coloration, IntelliSense, débogage et gestion des projets .NET.",
        "Visual Studio (Windows/macOS) : l'IDE complet de Microsoft, le plus intégré à .NET.",
        "JetBrains Rider : l'alternative multiplateforme, appréciée pour son analyse de code et son débogueur."
      ],
      "install": [
        "Installez le SDK .NET depuis `dotnet.microsoft.com` (prenez la version LTS la plus récente) : une fois installé, `dotnet --version` doit afficher le numéro de version dans un terminal fraîchement ouvert.",
        "Vérifiez que la CLI est dans le PATH : fermez puis rouvrez le terminal et relancez `dotnet --version` — si la commande est introuvable, ajoutez le dossier d'installation du SDK au PATH."
      ],
      "workflow": [
        "Compilez et exécutez d'un coup avec `dotnet run` dans le dossier du projet : la sortie du programme s'affiche dans le terminal, ce qui valide tout le cycle édition-compilation-exécution.",
        "Créez une API web avec `dotnet new webapi -n TasksApi` : ce modèle génère un projet ASP.NET Core avec un contrôleur d'exemple — lancez-le avec `dotnet run` et ouvrez l'URL affichée pour vérifier que le serveur répond."
      ]
    },
    "whyLearn": "C# ouvre l'écosystème .NET : backend web avec ASP.NET Core, jeux avec Unity (l'un des moteurs les plus utilisés au monde), applications desktop et cloud. Le langage évolue vite, reste très demandé en entreprise, et sa syntaxe moderne (LINQ, async/await, records) en fait un excellent langage principal."
  }
,
  // ------------------------------------------------------------------ java
  java: {
    learning: () => import("./learning-java").then((m) => m.LEARNING_JAVA),
    "conceptDetails": [
      {
        "definition": "Le code Java est compilé en bytecode, un format intermédiaire exécuté par la JVM : c'est ce qui rend Java portable et optimisable à chaud par le compilateur JIT.",
        "name": "JVM & bytecode"
      },
      {
        "definition": "Classes, héritage, interfaces et polymorphisme : Java est le langage de référence de la programmation orientée objet, avec une discipline stricte d'encapsulation.",
        "name": "POO"
      },
      {
        "definition": "List, Set, Map et leurs implémentations (ArrayList, HashMap...) : choisir la bonne collection selon l'usage est la compétence Java la plus rentable.",
        "name": "Collections"
      },
      {
        "definition": "Les streams traitent les collections de façon déclarative (filter, map, reduce) et les lambdas fournissent des fonctions anonymes concises pour les callbacks.",
        "name": "Streams & lambdas"
      },
      {
        "definition": "Le modèle d'exceptions vérifiées force à traiter les erreurs prévisibles : `try`/`catch`/`finally` et la hiérarchie Throwable structurent la gestion d'erreurs.",
        "name": "Exceptions"
      },
      {
        "definition": "Les gestionnaires de build déclarent les dépendances, compilent, testent et empaquettent le projet : `pom.xml` pour Maven, scripts Kotlin ou Groovy pour Gradle.",
        "name": "Maven/Gradle"
      }
    ],
    "definition": "Java est un langage orienté objet, typé statiquement, qui compile vers un bytecode exécuté par la machine virtuelle Java (JVM) : « écrire une fois, exécuter partout ». Il domine le backend d'entreprise, Android et les systèmes à forte charge depuis près de trente ans.",
    "environment": [
      "Un JDK LTS (Adoptium Temurin ou Oracle) avec `java` et `javac` dans le PATH",
      "La variable `JAVA_HOME` pointant vers le dossier du JDK (requise par Maven/Gradle et certains IDE)",
      "Un terminal",
      "IntelliJ IDEA, VS Code + « Extension Pack for Java » ou Eclipse",
      "Maven ou Gradle pour les projets multi-fichiers",
      "Git pour versionner le projet"
    ],
    "example": {
      "steps": [
        "Écrire `Main.java` contenant `public class Main` avec une méthode `main` qui affiche un message.",
        "Compiler avec `javac Main.java` : aucune sortie et un fichier `Main.class` créé = succès.",
        "Exécuter avec `java Main` (sans `.class`) et vérifier que le message s'affiche.",
        "Modifier le message, recompiler, réexécuter : ce cycle manuel est le fondement de tout build Java."
      ],
      "title": "Compiler et exécuter son premier programme"
    },
    "howItWorks": [
      "SOURCE",
      "JAVAC",
      "BYTECODE",
      "JVM",
      "JIT"
    ],
    "howItWorksTitle": "Du .java au bytecode",
    "prerequisiteNotes": {
      "python": "Les bases de la programmation (variables, fonctions, POO) se transfèrent directement à Java."
    },
    "projectsDetailed": [
      {
        "flow": "Classes `Contact`/`Carnet` → Collections `ArrayList`/`HashMap` → Menu texte → Compilation `javac`",
        "title": "Carnet d'adresses en console"
      },
      {
        "flow": "Structure Maven → Couche service → Tests unitaires → Build `mvn compile`",
        "title": "API REST avec Maven"
      },
      {
        "flow": "Threads et `synchronized` → File d'attente concurrente → Gestion des exceptions → Tests de charge",
        "title": "Système de réservation multithreadé"
      }
    ],
    "setup": {
      "configure": [
        "Compilez à la main pour comprendre la chaîne : `javac Main.java` produit `Main.class` (le bytecode) sans afficher de sortie en cas de succès — l'apparition du fichier `.class` est la preuve que la compilation a réussi.",
        "Exécutez avec `java Main` (sans l'extension `.class`) : la JVM charge le bytecode et lance la méthode `main` — la sortie du programme confirme que tout fonctionne.",
        "Pour les projets réels, ajoutez un outil de build : Maven, vérifié par `mvn -v` puis utilisé avec `mvn compile` pour compiler selon le `pom.xml`, ou Gradle, vérifié par `gradle -v`."
      ],
      "editors": [
        "IntelliJ IDEA (édition Community gratuite) : l'IDE Java de référence, avec le meilleur support Maven/Gradle et un excellent débogueur.",
        "VS Code avec l'« Extension Pack for Java » (Microsoft) : une alternative légère avec compilation, tests et débogage intégrés.",
        "Eclipse : l'IDE historique, encore très présent en entreprise."
      ],
      "install": [
        "Installez un JDK : Adoptium Temurin (gratuit, open source) ou Oracle JDK, en version LTS — les deux fournissent `java` et `javac`, vérifiez le JDK actif avec `java -version`.",
        "Confirmez la présence du compilateur avec `javac -version` : si `java` répond mais pas `javac`, vous avez installé un JRE seul — réinstallez un JDK complet."
      ],
      "workflow": [
        "Cycle quotidien en ligne de commande : éditez, compilez avec `javac`, exécutez avec `java` — ce cycle manuel rend visible ce que les IDE automatisent.",
        "Avec Maven, `mvn compile` compile les sources selon la structure standard `src/main/java` : un BUILD SUCCESS confirme que le projet est sain.",
        "Nommez toujours le fichier comme la classe publique (`Main.java` pour `class Main`) : `javac` refuse de compiler sinon, et cette convention est la base de l'organisation du code Java."
      ]
    },
    "whyLearn": "Java reste le langage roi de l'entreprise : banques, assurances et grandes plateformes tournent dessus, et son écosystème (Spring, Maven, JVM) est immense. L'apprendre, c'est aussi maîtriser la JVM, les threads et la programmation orientée objet à grande échelle."
  }
,
  // ------------------------------------------------------------------ rust
  rust: {
    learning: () => import("./learning-rust").then((m) => m.LEARNING_RUST),
    "conceptDetails": [
      {
        "definition": "Chaque valeur a un propriétaire unique ; quand il sort de portée, la valeur est libérée : pas de ramasse-miettes, pas de libération manuelle, pas de double libération.",
        "name": "Ownership"
      },
      {
        "definition": "On peut emprunter une valeur par référence immuable (plusieurs lecteurs) ou mutable (un seul écrivain) : le compilateur refuse toute combinaison dangereuse.",
        "name": "Borrowing"
      },
      {
        "definition": "Les durées de vie annotent combien de temps une référence reste valide : elles garantissent à la compilation qu'aucune référence ne survit à sa donnée.",
        "name": "Lifetimes"
      },
      {
        "definition": "L'équivalent des interfaces : un trait déclare un comportement partagé que les types implémentent, avec polymorphisme statique (génériques) ou dynamique.",
        "name": "Traits"
      },
      {
        "definition": "Pas d'exceptions : les erreurs récupérables sont des valeurs `Result<T, E>` et l'absence de valeur des `Option<T>`, forcées à être traitées explicitement.",
        "name": "Gestion d'erreurs"
      },
      {
        "definition": "Le gestionnaire de paquets et de build officiel : il crée les projets, résout les dépendances (crates.io), compile, teste et formate.",
        "name": "Cargo"
      }
    ],
    "definition": "Rust est un langage système qui garantit la sécurité mémoire sans ramasse-miettes, grâce à son système d'ownership vérifié à la compilation. Il vise les performances du C++ avec des garanties fortes : pas de data races, pas de pointeurs nuls, pas de fuites faciles.",
    "environment": [
      "rustup avec la toolchain stable, `cargo` et `rustc` dans le PATH",
      "Un terminal",
      "VS Code + « rust-analyzer » ou RustRover",
      "Un débogueur natif (l'extension CodeLLDB sous VS Code, ou celui intégré à RustRover)",
      "Git pour versionner le projet"
    ],
    "example": {
      "steps": [
        "Créer le projet avec `cargo new fileinfo` et ouvrir `src/main.rs`.",
        "Lancer avec `cargo run` : la compilation initiale puis l'exécution prouvent que la toolchain fonctionne.",
        "Ajouter une fonction qui lit les arguments (`std::env::args`) et affiche des statistiques sur un fichier, puis tester avec `cargo run -- fichier.txt`.",
        "Ajouter un test unitaire, le valider avec `cargo test`, puis nettoyer le style avec `cargo fmt` et `cargo clippy`."
      ],
      "title": "Créer un outil en ligne de commande"
    },
    "howItWorks": [
      "SOURCE",
      "RUSTC",
      "LLVM",
      "BINAIRE",
      "EXÉCUTION"
    ],
    "howItWorksTitle": "Compilation native directe",
    "prerequisiteNotes": {
      "python": "Les bases de la programmation aident, mais Rust impose de réapprendre la gestion mémoire."
    },
    "projectsDetailed": [
      {
        "flow": "`cargo new` → Lecture de fichiers → `cargo test` → `cargo run` pour valider",
        "title": "Utilitaire CLI de statistiques"
      },
      {
        "flow": "API publique propre → Documentation `///` → Tests d'intégration → `cargo clippy` sans avertissement",
        "title": "Bibliothèque avec tests"
      },
      {
        "flow": "Gestion d'erreurs `Result` → Concurrence sans data races → Binaire natif rapide",
        "title": "Outil système concurrent"
      }
    ],
    "setup": {
      "configure": [
        "Créez un projet avec `cargo new hello` : cela génère un `Cargo.toml` (le manifeste : nom, version, dépendances) et un `src/main.rs` — la présence du `Cargo.toml` confirme que Cargo gère le projet.",
        "Compilez avec `cargo build` : la première compilation télécharge les dépendances et produit le binaire dans `target/debug/` — un binaire exécutable prouve que la toolchain est complète."
      ],
      "editors": [
        "VS Code avec l'extension « rust-analyzer » : complétion, diagnostics en temps réel et refactorings — l'outil quasi obligatoire du développeur Rust.",
        "RustRover (JetBrains) : l'IDE dédié, avec débogueur intégré et excellent support Cargo."
      ],
      "install": [
        "Installez Rust via rustup, l'installateur officiel, avec `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh` : il télécharge et installe la toolchain stable — acceptez l'installation par défaut quand le script le propose.",
        "Vérifiez l'installation dans un nouveau terminal avec `rustc --version` (le compilateur) et `cargo --version` (le gestionnaire de build) : les deux doivent afficher un numéro de version.",
        "Si les commandes sont introuvables, rechargez l'environnement du shell (le script modifie votre fichier de profil) : fermez puis rouvrez le terminal et relancez `cargo --version`."
      ],
      "workflow": [
        "Développez avec `cargo run` : il recompile si nécessaire puis exécute — la sortie du programme valide le cycle complet.",
        "Testez avec `cargo test` : il compile et exécute les tests unitaires du projet — un rapport « ok » confirme que le code se comporte comme attendu.",
        "Gardez un code propre avec `cargo fmt` (formate le code selon le style officiel, vérifiez le diff avec git) et `cargo clippy` (signale les constructions douteuses : zéro avertissement = code idiomatique)."
      ]
    },
    "whyLearn": "Rust est le langage le plus apprécié des développeurs depuis des années et s'impose dans les systèmes, l'embarqué, le WebAssembly et l'infrastructure (déjà adopté dans le noyau Linux). L'apprendre transforme votre rapport à la mémoire et à la concurrence, même dans d'autres langages."
  }
,
  // ------------------------------------------------------------------ go
  go: {
    learning: () => import("./learning-go").then((m) => m.LEARNING_GO),
    "conceptDetails": [
      {
        "definition": "Les goroutines sont des fonctions exécutées en concurrence, légères (quelques Ko) : on en lance des milliers. Les channels échangent des données entre elles en toute sécurité.",
        "name": "Goroutines & channels"
      },
      {
        "definition": "Une interface déclare un ensemble de méthodes ; tout type qui les implémente la satisfait implicitement, sans déclaration explicite. C'est la clé de la composition en Go.",
        "name": "Interfaces"
      },
      {
        "definition": "Le système de modules (`go.mod` / `go.sum`) gère les dépendances versionnées depuis 2018 : fini le `GOPATH` obligatoire, chaque projet est autonome et reproductible.",
        "name": "Modules Go"
      },
      {
        "definition": "Pas d'exceptions : les fonctions retournent `(valeur, error)` et l'appelant vérifie `if err != nil`. Verbeux, mais chaque point de défaillance est visible.",
        "name": "Gestion d'erreurs"
      },
      {
        "definition": "Exceptionnellement riche : HTTP, JSON, crypto, templates, tests… La plupart des projets Go n'ont besoin que d'elle, ce qui limite les dépendances externes.",
        "name": "Bibliothèque standard"
      },
      {
        "definition": "Le paquet `testing` intégré suffit : fonctions `TestXxx`, benchmarks `BenchmarkXxx`, `go test ./...` pour tout exécuter. Le testing est une pratique culturelle forte en Go.",
        "name": "Tests"
      }
    ],
    "definition": "Go est un langage compilé, statiquement typé, créé chez Google : sa simplicité volontaire, sa compilation rapide et son exécution en binaire unique en font un choix standard pour les APIs, les outils CLI et les systèmes distribués. Il embarque la concurrence comme un citoyen de première classe avec les goroutines.",
    "environment": [
      "Go installé depuis go.dev/dl, `go version` répond dans le terminal",
      "Un dossier de projet initialisé avec `go mod init` (fichier `go.mod` présent)",
      "VS Code + extension \"Go\" (golang) ou GoLand",
      "`go fmt` et `go vet` exécutables depuis le terminal"
    ],
    "example": {
      "steps": [
        "Créer le dossier du projet et l'initialiser avec `go mod init exemple.com/monapi`",
        "Écrire un `main.go` qui enregistre un handler sur `/hello` avec le paquet `net/http`",
        "Lancer avec `go run .` puis vérifier la réponse dans le navigateur ou avec `curl http://localhost:8080/hello`",
        "Ajouter un test `TestHello` dans `main_test.go` et le valider avec `go test ./...`",
        "Compiler le binaire final avec `go build -o monapi .` et le lancer avec `./monapi`"
      ],
      "title": "Une API HTTP minimaliste"
    },
    "howItWorks": [
      "SOURCE",
      "MODULE",
      "COMPILE",
      "BINAIRE",
      "GOROUTINES",
      "EXÉCUTE"
    ],
    "howItWorksTitle": "Du code source au binaire",
    "prerequisiteNotes": {
      "python": "Les bases de la programmation (fonctions, structures de données) se transfèrent directement à Go."
    },
    "projectsDetailed": [
      {
        "flow": "Arguments (`os.Args`) → Stockage en fichier JSON → Sous-commandes add/list → `go build` → Binaire partageable",
        "title": "CLI de notes en terminal"
      },
      {
        "flow": "Serveur `net/http` → Handlers JSON → Goroutines pour tâches de fond → Channels pour résultats → Tests `go test`",
        "title": "API REST avec concurrence"
      },
      {
        "flow": "Worker pool de goroutines → Channels de jobs/résultats → Contexte avec timeout → `go vet` + benchmarks → Binaire optimisé",
        "title": "Scraper concurrent avec rate limiting"
      }
    ],
    "setup": {
      "configure": [
        "Le fichier `go.mod` centralise la configuration du projet : module, version de Go, dépendances. Éditez-le rarement à la main, préférez `go get` / `go mod tidy`.",
        "Activez le formatage automatique à l'enregistrement dans votre éditeur : Go exige un style unique imposé par `gofmt`, c'est une convention non négociable de la communauté.",
        "Les variables d'environnement `GOPATH` et `GOMODCACHE` contrôlent où sont stockés modules et binaires ; laissez les valeurs par défaut sauf besoin spécifique."
      ],
      "editors": [
        "VS Code + l'extension `\"Go\"` (publiée par golang) : complétion, navigation, debug Delve, formatage à l'enregistrement — la configuration la plus répandue.",
        "`GoLand` (JetBrains) : IDE payant très complet, excellent refactoring et intégration des tests ; vérifiez la version d'évaluation gratuite sur le site de JetBrains."
      ],
      "install": [
        "Téléchargez l'installeur officiel pour votre OS depuis go.dev/dl, puis vérifiez avec `go version` : le terminal doit afficher la version installée (ex. `go1.24.x`).",
        "Initialisez un module avec `go mod init exemple.com/monapp` dans un dossier vide : cela crée un fichier `go.mod` qui déclare le nom du module et la version de Go ; vérifiez qu'il existe avec `ls go.mod` (ou `dir`).",
        "Ajoutez une dépendance via `go get <module>` : le fichier `go.mod` se met à jour et `go.sum` fige les versions ; lancez ensuite `go mod tidy` pour nettoyer les dépendances inutilisées."
      ],
      "workflow": [
        "Développement itératif : `go run .` compile et exécute le paquet courant en une seule commande — idéal pour tester un changement sans produire de binaire.",
        "Production : `go build -o monapp .` produit un binaire natif autonome ; exécutez `./monapp` pour vérifier qu'il démarre sans erreur.",
        "Tests : `go test ./...` exécute tous les tests du projet et de ses sous-paquets ; un résultat `ok` par paquet confirme que tout passe.",
        "Qualité systématique : `go fmt ./...` reformate tout le code et `go vet ./...` détecte les constructions suspectes (erreurs d'arguments, `printf` mal formés). Lancez les deux avant chaque commit."
      ]
    },
    "whyLearn": "Go offre un rapport productivité-performance rare : syntaxe réduite à l'essentiel, démarrage quasi instantané, et un modèle de concurrence (goroutines, channels) bien plus accessible que les threads classiques. C'est le langage des infrastructures modernes — conteneurs, proxies, API haute charge — et un excellent second langage après Python ou JavaScript."
  }
,
  // ------------------------------------------------------------------ aspnet
  aspnet: {
    learning: () => import("./learning-aspnet").then((m) => m.LEARNING_ASPNET),
    "conceptDetails": [
      {
        "definition": "Chaîne de composants qui traitent chaque requête dans l'ordre (authentification, logs, erreurs) : on l'assemble dans `Program.cs` avec `app.Use...`, et chacun peut court-circuiter le pipeline.",
        "name": "Middleware"
      },
      {
        "definition": "Depuis .NET 6, on déclare des endpoints en quelques lignes (`app.MapGet(...)`) sans contrôleur : idéal pour les microservices et les prototypes, sans sacrifier la puissance.",
        "name": "Minimal APIs"
      },
      {
        "definition": "Le conteneur intégré fournit les dépendances (services, `DbContext`) aux constructeurs : durées de vie `Transient`, `Scoped`, `Singleton` à choisir selon l'usage.",
        "name": "Dependency Injection"
      },
      {
        "definition": "ORM officiel : on décrit les entités en C#, EF Core génère le SQL. Les migrations versionnent le schéma de base et se pilotent avec `dotnet ef`.",
        "name": "Entity Framework Core"
      },
      {
        "definition": "Support natif des JWT, cookies et fournisseurs externes (OAuth/OIDC) via des schémas configurables : `AddAuthentication().AddJwtBearer(...)` reste le point d'entrée standard des API.",
        "name": "Authentification"
      },
      {
        "definition": "Système hiérarchique : `appsettings.json`, variables d'environnement, secrets utilisateur. On y accède via `IConfiguration` ou le pattern Options typé.",
        "name": "Configuration"
      }
    ],
    "definition": "ASP.NET Core est le framework web de la plateforme .NET : il permet de construire des API REST, des applications web et des microservices en C#, avec un pipeline de middleware modulaire et des performances parmi les meilleures du marché.",
    "environment": [
      "SDK .NET installé, `dotnet --version` répond dans le terminal",
      "Projet créé via `dotnet new webapi -n MonApi`",
      "Outil EF Core installé (`dotnet ef --version` répond)",
      "Visual Studio, VS Code + `\"C# Dev Kit\"`, ou JetBrains Rider"
    ],
    "example": {
      "steps": [
        "Créer le projet avec `dotnet new webapi -n MonApi` et le lancer avec `dotnet run`",
        "Ajouter un contrôleur `TodosController` exposant `GET /todos` et `POST /todos`",
        "Définir l'entité `Todo`, générer la migration avec `dotnet ef migrations add Initiale` puis `dotnet ef database update`",
        "Tester les endpoints avec `dotnet watch run` actif et des requêtes HTTP (Swagger intégré en développement)",
        "Protéger `POST /todos` avec l'authentification JWT"
      ],
      "title": "Une API de tâches (todo)"
    },
    "howItWorks": [
      "REQUÊTE",
      "MIDDLEWARE",
      "ROUTAGE",
      "CONTRÔLEUR",
      "EF CORE",
      "RÉPONSE"
    ],
    "howItWorksTitle": "Le voyage d'une requête",
    "prerequisiteNotes": {
      "csharp": "ASP.NET Core se programme en C# : classes, async/await et LINQ sont le quotidien."
    },
    "projectsDetailed": [
      {
        "flow": "`dotnet new webapi` → Contrôleur → Réponses JSON → Tests manuels → Documentation Swagger",
        "title": "API CRUD simple"
      },
      {
        "flow": "Entity Framework Core → Migrations → JWT → Validation des entrées → Gestion d'erreurs centralisée (middleware)",
        "title": "API avec base de données et auth"
      },
      {
        "flow": "Minimal APIs → Redis (cache) → `IHostedService` pour tâches de fond → Logs structurés → Déploiement en conteneur",
        "title": "Microservice avec cache et background jobs"
      }
    ],
    "setup": {
      "configure": [
        "Le fichier `appsettings.json` centralise la configuration (chaînes de connexion, clés API) : utilisez `appsettings.Development.json` pour les valeurs locales et ne versionnez jamais les secrets.",
        "Enregistrez vos services dans `Program.cs` via le conteneur d'injection de dépendances (`builder.Services.Add...`) : c'est le point d'entrée unique de la configuration de l'application.",
        "Créez une migration initiale avec `dotnet ef migrations add Initiale` : un dossier `Migrations` apparaît ; appliquez-la avec `dotnet ef database update` et vérifiez que la base contient les tables."
      ],
      "editors": [
        "`Visual Studio` (Windows/Mac) : l'IDE historique de l'écosystème .NET, templates et debug intégrés — vérifiez l'édition Community gratuite sur le site Microsoft.",
        "VS Code + extension `\"C# Dev Kit\"` (Microsoft) : léger et multiplateforme, avec IntelliSense et debug C# complets.",
        "`JetBrains Rider` : alternative payante très appréciée pour sa vitesse et son analyse de code poussée."
      ],
      "install": [
        "Installez le SDK .NET (version LTS recommandée) depuis le site officiel Microsoft, puis vérifiez avec `dotnet --version` : le terminal doit afficher le numéro de version du SDK.",
        "Créez une API avec `dotnet new webapi -n MonApi` : cela génère un projet minimal fonctionnel ; entrez dans le dossier avec `cd MonApi` et listez les fichiers pour vérifier la structure.",
        "Pour Entity Framework Core, installez l'outil CLI avec `dotnet tool install --global dotnet-ef`, puis vérifiez avec `dotnet ef --version`."
      ],
      "workflow": [
        "Développement quotidien : `dotnet watch run` relance automatiquement l'application à chaque modification de fichier (rechargement à chaud) — vérifiez dans la console que le rebuild se déclenche après une sauvegarde.",
        "Compilation et exécution simple : `dotnet run` compile puis démarre l'application ; l'URL d'écoute s'affiche dans la console.",
        "Évolutions de schéma : modifiez vos entités, puis `dotnet ef migrations add <Nom>` suivi de `dotnet ef database update` pour synchroniser la base de données."
      ]
    },
    "whyLearn": "ASP.NET Core domine le développement d'entreprise et excelle dans les API performantes : typage fort de C#, outillage de premier ordre, et Entity Framework Core qui rend l'accès aux données productif sans sacrifier le contrôle. C'est aussi la porte d'entrée vers l'écosystème .NET complet (desktop, mobile, cloud Azure)."
  }
,
  // ------------------------------------------------------------------ django
  django: {
    learning: () => import("./learning-django").then((m) => m.LEARNING_DJANGO),
    "conceptDetails": [
      {
        "definition": "Les modèles sont des classes Python qui décrivent les tables : l'ORM traduit `Article.objects.filter(...)` en SQL. On manipule la base sans écrire une ligne de SQL.",
        "name": "Modèles & ORM"
      },
      {
        "definition": "Les vues (fonctions ou classes) reçoivent la requête et retournent la réponse ; `urls.py` associe chaque chemin d'URL à une vue. Le routage est explicite et lisible.",
        "name": "Vues & URLs"
      },
      {
        "definition": "Le moteur de templates génère le HTML avec héritage (`{% extends %}`), boucles et filtres : la présentation reste séparée de la logique, avec échappement anti-XSS par défaut.",
        "name": "Templates"
      },
      {
        "definition": "Interface d'administration générée automatiquement à partir des modèles : CRUD complet, filtres et permissions, sans écrire de code. Un atout majeur pour les back-offices.",
        "name": "Admin Django"
      },
      {
        "definition": "Chaque changement de modèle génère un fichier de migration versionné (`makemigrations`), appliqué avec `migrate` : le schéma de base évolue de façon traçable et réversible.",
        "name": "Migrations"
      },
      {
        "definition": "Système d'utilisateurs, groupes et permissions intégré : inscription, connexion, sessions et décorateurs `@login_required` fonctionnent dès l'installation.",
        "name": "Auth"
      }
    ],
    "definition": "Django est le framework web « batteries included » de Python : ORM, admin auto-générée, authentification, migrations et système de templates sont intégrés d'origine. Sa devise, « le framework web pour perfectionnistes sous pression », résume sa philosophie : productivité sans magie obscure.",
    "environment": [
      "Python 3 installé, environnement virtuel `.venv` créé et activé",
      "Django installé (`python -m django --version` répond)",
      "Projet créé (`django-admin startproject`), base initialisée (`migrate`)",
      "VS Code + extension `\"Python\"` (Microsoft) ou PyCharm"
    ],
    "example": {
      "steps": [
        "Créer le projet avec `django-admin startproject monsite`, puis une app avec `python manage.py startapp blog`",
        "Définir le modèle `Article` (titre, contenu, date), générer et appliquer les migrations (`makemigrations` puis `migrate`)",
        "Créer un superutilisateur avec `python manage.py createsuperuser` et publier des articles via l'admin sur `/admin`",
        "Écrire une vue qui liste les articles et un template qui les affiche, câblés dans `urls.py`",
        "Lancer avec `python manage.py runserver` et vérifier le rendu sur http://127.0.0.1:8000"
      ],
      "title": "Un mini-blog"
    },
    "howItWorks": [
      "URL",
      "VUE",
      "MODÈLE",
      "ORM",
      "TEMPLATE",
      "RÉPONSE"
    ],
    "howItWorksTitle": "Le cycle requête-réponse",
    "prerequisiteNotes": {
      "python": "Django est un framework Python : modules, classes et environnements virtuels sont requis."
    },
    "projectsDetailed": [
      {
        "flow": "Modèles → Migrations → Admin configurée → Vues + templates → Publication d'articles",
        "title": "Blog avec admin"
      },
      {
        "flow": "Auth intégrée → Inscription/connexion → Profils → Permissions par objet → Formulaires Django",
        "title": "Application avec comptes utilisateurs"
      },
      {
        "flow": "Django REST Framework → Sérialiseurs → Endpoints → Auth par token → Consommation depuis un client JS",
        "title": "API REST + frontend"
      }
    ],
    "setup": {
      "configure": [
        "Le fichier `settings.py` centralise la configuration : `INSTALLED_APPS` liste les applications actives, `DATABASES` la connexion, `TEMPLATES` le moteur de rendu. Adaptez `ALLOWED_HOSTS` et `DEBUG` selon l'environnement.",
        "Créez un compte administrateur avec `python manage.py createsuperuser` : répondez aux invites (nom, email, mot de passe) puis connectez-vous sur `/admin` pour vérifier.",
        "Les fichiers statiques et médias se configurent via `STATIC_URL` / `MEDIA_URL` : en développement Django les sert automatiquement, en production ils sont collectés avec `collectstatic`."
      ],
      "editors": [
        "VS Code + l'extension `\"Python\"` (Microsoft) : IntelliSense, debug, détection automatique du venv — la combinaison la plus courante pour Django.",
        "`PyCharm` (JetBrains) : support Django natif (templates, ORM, run configurations) ; l'édition Community est gratuite, la Professional ajoute le support web complet."
      ],
      "install": [
        "Créez un environnement virtuel isolé avec `python -m venv .venv` : un dossier `.venv` apparaît à la racine ; c'est lui qui contiendra les paquets du projet, séparés du Python système.",
        "Activez le venv (`source .venv/bin/activate` sur Linux/macOS, `.venv\\Scripts\\activate` sur Windows) : votre prompt affiche `(.venv)`, signe que l'environnement est actif — vérifiez avec `which python` (ou `where python`).",
        "Installez Django dans le venv actif avec `pip install django`, puis vérifiez avec `python -m django --version` : le numéro de version doit s'afficher.",
        "Créez le projet avec `django-admin startproject monsite` : un dossier `monsite` contenant `manage.py` et les réglages apparaît ; initialisez la base avec `python manage.py migrate`."
      ],
      "workflow": [
        "Serveur de développement : `python manage.py runserver` démarre l'application avec rechargement automatique ; ouvrez http://127.0.0.1:8000 dans le navigateur pour vérifier qu'elle répond.",
        "Évolution du schéma : modifiez vos modèles, générez la migration avec `python manage.py makemigrations`, inspectez-la, puis appliquez avec `python manage.py migrate`.",
        "Console interactive : `python manage.py shell` ouvre un shell Python avec le projet chargé — idéal pour tester l'ORM (`MonModel.objects.all()`) avant d'écrire du code."
      ]
    },
    "whyLearn": "Django permet de passer d'une idée à une application complète (base de données, back-office, authentification) en un temps record, avec des conventions solides qui structurent les projets. C'est le framework de référence pour les MVP, les CMS, les SaaS et les API adossées à l'écosystème Python (data, IA)."
  }
,
};

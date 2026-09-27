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
};

import type { SkillGuide } from "../skill-guides";

/**
 * Guides pédagogiques — partie A : fondations & développement web.
 *
 * Ces entrées enrichissent les compétences de la roadmap Informatique
 * (désignées par leur `id`) avec un contenu éditorial structuré :
 * définition, intérêt pédagogique, prérequis expliqués, concepts clés,
 * fonctionnement, exemple concret et projets progressifs.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - Ton : documentation technique premium, concret, sans marketing. Français.
 */
export const GUIDES_A: Record<string, SkillGuide> = {
  // ============================================================ TIER 1
  // Guides complets : fondations & piliers du développement.

  // ------------------------------------------------------------------ http
  http: {
    definition:
      "HTTP est le protocole qui permet à un client (navigateur, application) et un serveur de dialoguer sur le web. Chaque échange suit le même schéma : une requête (méthode + URL + en-têtes) puis une réponse (code de statut + en-têtes + contenu).",
    whyLearn:
      "HTTP sous-tend absolument tout : pages web, APIs, webhooks, applications mobiles. Comprendre les méthodes, les codes de statut et les en-têtes permet de déboguer n'importe quel problème réseau et de concevoir des APIs correctes. C'est le vocabulaire commun de tout le web.",
    prerequisiteNotes: {
      "culture-info":
        "Savoir ce qu'est un réseau et une relation client-serveur : HTTP est le langage qu'ils parlent.",
    },
    conceptDetails: [
      {
        name: "Méthodes",
        definition:
          "GET lit une ressource, POST en crée une, PUT/PATCH la modifient, DELETE la supprime : le verbe indique l'intention de la requête.",
      },
      {
        name: "Codes de statut",
        definition:
          "Le serveur répond par un code : 2xx succès, 3xx redirection, 4xx erreur du client, 5xx erreur du serveur.",
      },
      {
        name: "Headers",
        definition:
          "Les en-têtes transmettent les métadonnées de l'échange : type de contenu, authentification, règles de cache, langue.",
      },
      {
        name: "HTTPS",
        definition:
          "La version chiffrée de HTTP (via TLS) : elle protège les échanges contre l'écoute et la falsification.",
      },
      {
        name: "Cookies",
        definition:
          "De petits jetons stockés par le navigateur pour maintenir une session entre des requêtes qui sont, par nature, sans état.",
      },
      {
        name: "Cache",
        definition:
          "Conserver une copie des réponses pour éviter de les redemander : plus rapide pour l'utilisateur, moins de charge pour le serveur.",
      },
    ],
    howItWorksTitle: "Le cycle d'une requête HTTP",
    howItWorks: ["CLIENT", "REQUEST", "SERVER", "HANDLER", "RESPONSE", "RENDER"],
    example: {
      title: "Charger une page web",
      steps: [
        "Clic sur un lien",
        "Requête GET vers le serveur",
        "Réponse 200 avec le HTML",
        "Chargement des ressources (CSS, images)",
        "Affichage de la page",
      ],
    },
    projectsDetailed: [
      {
        title: "Inspecter le trafic d'un site",
        flow: "Navigateur → Onglet réseau → Requêtes → En-têtes → Codes de statut",
      },
      {
        title: "Construire un mini-serveur HTTP",
        flow: "Node.js → Routes → Réponses JSON → Codes de statut adaptés",
      },
      {
        title: "Déboguer une API qui échoue",
        flow: "Requête → Code 4xx/5xx → Lecture des en-têtes → Correction",
      },
    ],
  },

  // ------------------------------------------------------------------ rest
  rest: {
    illustration: "api",
    definition:
      "REST est un style d'architecture pour concevoir des APIs web : les données sont exposées comme des ressources adressées par des URLs, manipulées avec les verbes HTTP, dans des échanges sans état.",
    whyLearn:
      "REST est le contrat standard entre un frontend et un backend, et entre services. Savoir modéliser des ressources, choisir les bons verbes et statuts, gérer la pagination et l'authentification permet de construire des APIs prévisibles que d'autres développeurs utilisent sans friction.",
    prerequisiteNotes: {
      http: "Maîtriser méthodes, codes de statut et en-têtes : REST les utilise comme grammaire.",
      json: "Savoir lire et produire du JSON : c'est le format de presque toutes les réponses REST.",
    },
    conceptDetails: [
      {
        name: "Ressources",
        definition:
          "Les données sont exposées comme des ressources nommées par des URLs (/users, /articles) plutôt que comme des actions.",
      },
      {
        name: "Verbes HTTP",
        definition:
          "GET, POST, PUT, PATCH, DELETE : chaque verbe a une sémantique précise qui rend l'API prévisible.",
      },
      {
        name: "Statuts",
        definition:
          "201 pour une création, 404 pour une ressource absente, 422 pour des données invalides : le statut raconte le résultat.",
      },
      {
        name: "Pagination",
        definition:
          "Découper les grandes collections en pages (limit/offset ou curseurs) pour ne jamais renvoyer des millions d'objets d'un coup.",
      },
      {
        name: "Authentification",
        definition:
          "Prouver son identité via clés d'API, tokens JWT ou OAuth avant d'accéder aux ressources protégées.",
      },
      {
        name: "Versioning",
        definition:
          "Faire évoluer une API (/v1, /v2) sans casser les clients existants : un contrat se respecte.",
      },
    ],
    howItWorksTitle: "Le cycle d'un appel REST",
    howItWorks: ["CLIENT", "GET /users", "AUTH", "CONTROLLER", "DATABASE", "JSON 200"],
    example: {
      title: "Créer un article de blog",
      steps: [
        "POST /articles avec un JSON",
        "Validation des données",
        "Enregistrement en base",
        "Réponse 201 avec la ressource créée",
      ],
    },
    projectsDetailed: [
      {
        title: "Concevoir une API de blog",
        flow: "Ressources → Routes → Validation → Codes de statut → Documentation",
      },
      {
        title: "Documenter avec OpenAPI",
        flow: "Schéma → Exemples → Documentation interactive → Tests",
      },
      {
        title: "Versionner une API",
        flow: "v1 en production → v2 → Rétrocompatibilité → Migration des clients",
      },
    ],
  },

  // -------------------------------------------------------------- webhooks
  webhooks: {
    definition:
      "Un webhook est un mécanisme où un service appelle automatiquement une URL que vous lui avez fournie dès qu'un événement se produit. Au lieu d'interroger l'API en boucle, c'est elle qui vous prévient.",
    whyLearn:
      "Les webhooks sont le système nerveux des intégrations : paiements Stripe, notifications GitHub, déclencheurs n8n. Les comprendre permet de construire des systèmes réactifs en temps réel, sans gaspiller de ressources en polling.",
    prerequisiteNotes: {
      http: "Un webhook n'est qu'une requête HTTP POST entrante : il faut savoir la recevoir et la lire.",
      rest: "Comprendre les APIs REST aide à concevoir l'endpoint qui recevra les événements.",
    },
    conceptDetails: [
      {
        name: "Événements",
        definition:
          "Le fait déclencheur notifié par le service : paiement reçu, push sur un dépôt, nouveau ticket.",
      },
      {
        name: "Endpoints",
        definition:
          "L'URL publique que vous exposez pour recevoir les appels du service externe.",
      },
      {
        name: "Signatures",
        definition:
          "Une empreinte cryptographique qui prouve que la requête vient bien du service attendu, pas d'un imposteur.",
      },
      {
        name: "Retry",
        definition:
          "Si votre endpoint ne répond pas, le service renvoie l'événement plus tard : il faut supporter les doublons.",
      },
      {
        name: "Idempotence",
        definition:
          "Traiter deux fois le même événement doit produire le même résultat qu'une fois : la clé des retries sûrs.",
      },
      {
        name: "Sécurité",
        definition:
          "Vérifier les signatures, limiter les IPs sources, répondre vite : un endpoint public est une surface d'attaque.",
      },
    ],
    howItWorksTitle: "Comment un webhook est délivré",
    howItWorks: ["EVENT", "PAYLOAD", "POST", "ENDPOINT", "VERIFY", "PROCESS"],
    example: {
      title: "Paiement reçu sur Stripe",
      steps: [
        "Le client paie",
        "Stripe construit l'événement",
        "POST vers votre URL",
        "Vérification de la signature",
        "Commande marquée comme payée",
      ],
    },
    projectsDetailed: [
      {
        title: "Recevoir des notifications Stripe",
        flow: "Endpoint → Vérification de signature → Traitement → Réponse 200",
      },
      {
        title: "Déclencher un workflow n8n",
        flow: "GitHub → Webhook → n8n → Action automatisée",
      },
      {
        title: "Gérer les échecs proprement",
        flow: "Retry → Idempotence → File d'attente → Alertes",
      },
    ],
  },

  // ------------------------------------------------------------------ json
  json: {
    definition:
      "JSON (JavaScript Object Notation) est un format texte pour représenter des données structurées : objets, tableaux, chaînes, nombres, booléens. Lisible par les humains, natif pour les machines.",
    whyLearn:
      "JSON est le format d'échange du web : réponses d'API, fichiers de configuration, stockage de documents. Savoir le lire, le valider et le manipuler est un prérequis à presque tout le développement moderne.",
    prerequisiteNotes: {
      http: "HTTP transporte les données ; JSON est le format dans lequel elles voyagent le plus souvent.",
    },
    conceptDetails: [
      {
        name: "Objets",
        definition:
          "Des paires clé/valeur entre accolades : la structure de base pour représenter une entité.",
      },
      {
        name: "Tableaux",
        definition:
          "Des listes ordonnées entre crochets : pour les collections d'éléments.",
      },
      {
        name: "Types",
        definition:
          "Chaînes, nombres, booléens, null, objets, tableaux : six types, pas un de plus.",
      },
      {
        name: "Parsing",
        definition:
          "Convertir une chaîne JSON en objet manipulable dans le code (JSON.parse), et l'inverse (JSON.stringify).",
      },
      {
        name: "Schémas",
        definition:
          "Décrire la forme attendue des données (JSON Schema) pour les valider automatiquement.",
      },
      {
        name: "Sérialisation",
        definition:
          "Transformer des objets mémoire en texte JSON pour les transmettre ou les stocker.",
      },
    ],
    howItWorksTitle: "Du serveur au code",
    howItWorks: ["DATA", "SERIALIZE", "TRANSFER", "PARSE", "OBJECT", "USE"],
    example: {
      title: "Récupérer un utilisateur via API",
      steps: [
        "GET /users/42",
        "Réponse : texte JSON",
        "Parsing en objet",
        "Affichage du nom à l'écran",
      ],
    },
    projectsDetailed: [
      {
        title: "Consommer une API publique",
        flow: "fetch → JSON → Parsing → Affichage",
      },
      {
        title: "Valider des payloads",
        flow: "Schéma → Validation → Messages d'erreur clairs",
      },
      {
        title: "Concevoir un fichier de configuration",
        flow: "Besoins → Structure JSON → Lecture par l'application",
      },
    ],
  },

  // ------------------------------------------------------------------- git
  git: {
    definition:
      "Git est un système de gestion de versions : il enregistre l'historique des modifications d'un projet sous forme de commits, permet de travailler sur des branches parallèles et de fusionner le travail de plusieurs personnes.",
    whyLearn:
      "Git permet de suivre l'évolution du code, de travailler à plusieurs sans écraser le travail des autres, d'expérimenter en sécurité sur des branches et de revenir à n'importe quelle version antérieure. C'est l'outil de collaboration universel du développement : aucun projet sérieux ne s'en passe.",
    prerequisiteNotes: {
      "culture-info":
        "Comprendre ce qu'est un fichier, un dossier et un projet : Git versionne tout cela.",
    },
    conceptDetails: [
      {
        name: "Commits",
        definition:
          "Un instantané du projet avec un message : l'unité d'historique, petite et explicite.",
      },
      {
        name: "Branches",
        definition:
          "Des lignes de développement parallèles : on expérimente sans toucher au code stable.",
      },
      {
        name: "Merge & rebase",
        definition:
          "Deux façons de réintégrer une branche : fusionner en gardant l'historique, ou réécrire un historique linéaire.",
      },
      {
        name: "Remotes",
        definition:
          "Les copies distantes du dépôt (GitHub, GitLab) : push envoie, pull et fetch récupèrent.",
      },
      {
        name: "Conflits",
        definition:
          "Quand deux personnes modifient les mêmes lignes, Git demande de choisir : c'est normal, pas une erreur.",
      },
      {
        name: "Workflows",
        definition:
          "Les conventions d'équipe : feature branches, pull requests, trunk-based — l'organisation autour de l'outil.",
      },
    ],
    howItWorksTitle: "Le cycle de vie d'une modification",
    howItWorks: ["EDIT", "STAGE", "COMMIT", "PUSH", "REVIEW", "MERGE"],
    example: {
      title: "Corriger un bug en équipe",
      steps: [
        "Créer une branche dédiée",
        "Modifier le code et commiter",
        "Pousser et ouvrir une pull request",
        "Revue par un collègue",
        "Fusion dans la branche principale",
      ],
    },
    projectsDetailed: [
      {
        title: "Versionner un projet personnel",
        flow: "init → Commits réguliers → Historique lisible → Dépôt distant",
      },
      {
        title: "Contribuer à l'open source",
        flow: "Fork → Branche → Pull request → Review → Merge",
      },
      {
        title: "Résoudre un conflit",
        flow: "Merge → Conflit → Choix des changements → Commit de résolution",
      },
    ],
  },

  // ----------------------------------------------------------------- linux
  linux: {
    definition:
      "Linux est un système d'exploitation libre qui fait tourner la majorité des serveurs, du cloud et des outils de développement. L'utiliser, c'est naviguer en ligne de commande : fichiers, permissions, processus, paquets.",
    whyLearn:
      "Déployer une application, administrer un serveur, utiliser Docker ou un pipeline CI : tout passe par Linux. Le maîtriser donne une autonomie totale sur l'infrastructure et une compréhension concrète de la façon dont les programmes s'exécutent réellement.",
    prerequisiteNotes: {
      "culture-info":
        "Savoir ce qu'est un système d'exploitation et un système de fichiers.",
    },
    conceptDetails: [
      {
        name: "Terminal",
        definition:
          "L'interface en ligne de commande : le moyen le plus direct et le plus scriptable de piloter le système.",
      },
      {
        name: "Permissions",
        definition:
          "Qui peut lire, écrire, exécuter chaque fichier : la base de la sécurité sur un système multi-utilisateurs.",
      },
      {
        name: "Processus",
        definition:
          "Les programmes en cours d'exécution : les lister, les surveiller, les arrêter proprement.",
      },
      {
        name: "Paquets",
        definition:
          "Installer et mettre à jour des logiciels via le gestionnaire de paquets (apt, dnf) plutôt qu'à la main.",
      },
      {
        name: "SSH",
        definition:
          "Se connecter à une machine distante de façon chiffrée : l'administration serveur à distance.",
      },
      {
        name: "Système de fichiers",
        definition:
          "L'arborescence unique (/etc, /var, /home) : savoir où vit chaque chose sur un système Linux.",
      },
    ],
    howItWorksTitle: "Exécuter une commande",
    howItWorks: ["SHELL", "PARSE", "PERMISSIONS", "PROCESS", "KERNEL", "OUTPUT"],
    example: {
      title: "Déployer un site sur un VPS",
      steps: [
        "Connexion SSH au serveur",
        "Installation des paquets nécessaires",
        "Copie des fichiers du site",
        "Lancement du service web",
        "Vérification des logs",
      ],
    },
    projectsDetailed: [
      {
        title: "Administrer un VPS",
        flow: "SSH → Utilisateurs → Pare-feu → Mises à jour → Surveillance",
      },
      {
        title: "Script de sauvegarde",
        flow: "Archive → Rotation → Planification cron → Vérification",
      },
      {
        title: "Diagnostiquer un serveur lent",
        flow: "Processus → Mémoire → Disque → Logs → Cause racine",
      },
    ],
  },

  // ------------------------------------------------------------------- sql
  sql: {
    definition:
      "SQL (Structured Query Language) est le langage standard pour interroger et manipuler les bases de données relationnelles : sélectionner, filtrer, joindre et agréger des données.",
    whyLearn:
      "Les données sont au cœur de toute application, et SQL est leur langage d'accès depuis cinquante ans. Savoir écrire des requêtes efficaces, comprendre les jointures et les index reste l'une des compétences les plus durables — et les plus demandées — du métier.",
    prerequisiteNotes: {
      databases:
        "Connaître les tables, les clés primaires et les relations : SQL les interroge.",
    },
    conceptDetails: [
      {
        name: "SELECT",
        definition:
          "Choisir les colonnes et filtrer les lignes (WHERE, ORDER BY, LIMIT) : la requête de base.",
      },
      {
        name: "JOIN",
        definition:
          "Combiner des lignes de plusieurs tables via leurs clés : le cœur des bases relationnelles.",
      },
      {
        name: "Agrégations",
        definition:
          "Résumer des données avec COUNT, SUM, AVG et GROUP BY : des lignes brutes aux indicateurs.",
      },
      {
        name: "Sous-requêtes",
        definition:
          "Imbriquer une requête dans une autre pour des filtres ou calculs intermédiaires.",
      },
      {
        name: "Index",
        definition:
          "Des structures qui accélèrent la lecture au prix d'un coût à l'écriture : à placer avec discernement.",
      },
      {
        name: "Transactions",
        definition:
          "Un groupe d'opérations indivisible : tout réussit ou rien n'est appliqué, pour garder des données cohérentes.",
      },
    ],
    howItWorksTitle: "Exécution d'une requête",
    howItWorks: ["QUERY", "PARSER", "PLANNER", "INDEX", "EXECUTE", "ROWS"],
    example: {
      title: "Top 10 des clients par chiffre d'affaires",
      steps: [
        "SELECT depuis la table clients",
        "JOIN avec la table commandes",
        "GROUP BY client avec SUM des montants",
        "ORDER BY décroissant, LIMIT 10",
      ],
    },
    projectsDetailed: [
      {
        title: "Analyser un jeu de données réel",
        flow: "Import → SELECT → Filtres → Agrégations → Conclusions",
      },
      {
        title: "Optimiser une requête lente",
        flow: "EXPLAIN → Index manquant → Ajout → Mesure du gain",
      },
      {
        title: "Modéliser une base e-commerce",
        flow: "Entités → Tables → Clés → Contraintes → Requêtes métier",
      },
    ],
  },

  // ------------------------------------------------------------ javascript
  javascript: {
    definition:
      "JavaScript est le langage de programmation du web : il rend les pages interactives dans le navigateur et, via Node.js, fait tourner des serveurs, des outils et des applications complètes.",
    whyLearn:
      "JavaScript est partout : frontend, backend, mobile, desktop. Le maîtriser vraiment — types, fonctions, objets, asynchrone — ouvre l'écosystème le plus vaste du développement et rend l'apprentissage de TypeScript, React ou Node.js naturel.",
    prerequisiteNotes: {
      html: "Savoir structurer une page : JavaScript la rend interactive.",
      css: "Savoir la mettre en forme : JavaScript manipule aussi les styles dynamiquement.",
    },
    conceptDetails: [
      {
        name: "Types",
        definition:
          "Nombres, chaînes, booléens, objets, tableaux, null, undefined : les briques de toute valeur en JS.",
      },
      {
        name: "Fonctions",
        definition:
          "Des blocs réutilisables, citoyens de première classe : on les passe, on les retourne, on les compose.",
      },
      {
        name: "Objets",
        definition:
          "Des collections clé/valeur qui modélisent les entités du programme, avec prototypes en héritage.",
      },
      {
        name: "Tableaux",
        definition:
          "Des listes ordonnées et leurs méthodes (map, filter, reduce) : le travail quotidien sur les données.",
      },
      {
        name: "Asynchrone",
        definition:
          "Promesses et async/await : attendre réseau ou timers sans bloquer l'exécution.",
      },
      {
        name: "ES2024",
        definition:
          "Le JavaScript moderne : modules, classes, optional chaining, syntaxes récentes à connaître.",
      },
    ],
    howItWorksTitle: "Exécution d'un script",
    howItWorks: ["SOURCE", "PARSE", "COMPILE", "EXECUTE", "EVENT LOOP", "OUTPUT"],
    example: {
      title: "Compteur interactif",
      steps: [
        "Clic sur le bouton",
        "L'événement est capturé",
        "La variable d'état est incrémentée",
        "Le DOM est mis à jour",
      ],
    },
    projectsDetailed: [
      {
        title: "Jeu du serpent en canvas",
        flow: "Boucle de jeu → Entrées clavier → Collisions → Score",
      },
      {
        title: "Todo app sans framework",
        flow: "État en mémoire → Rendu → Événements → localStorage",
      },
      {
        title: "Consommer une API",
        flow: "fetch → JSON → Transformation → Affichage",
      },
    ],
  },

  // ------------------------------------------------------------ typescript
  typescript: {
    definition:
      "TypeScript est JavaScript avec un système de types statiques : on décrit la forme des données, et le compilateur détecte les erreurs avant l'exécution.",
    whyLearn:
      "TypeScript ajoute un système de typage à JavaScript afin de détecter certaines erreurs avant l'exécution et de rendre les grandes bases de code plus faciles à maintenir. Les types servent aussi de documentation vivante : ils rendent le code prévisible, l'autocomplétion précise et le refactoring sûr.",
    prerequisiteNotes: {
      javascript:
        "Maîtriser les bases de JS — fonctions, objets, asynchrone : TypeScript ajoute les types par-dessus.",
    },
    conceptDetails: [
      {
        name: "Types",
        definition:
          "Annoter variables, paramètres et retours : string, number, boolean, tableaux, littéraux.",
      },
      {
        name: "Interfaces",
        definition:
          "Décrire la forme d'un objet : le contrat que le code doit respecter.",
      },
      {
        name: "Génériques",
        definition:
          "Écrire des fonctions et classes réutilisables qui s'adaptent au type fourni, sans le perdre.",
      },
      {
        name: "Union types",
        definition:
          "Autoriser plusieurs types possibles (string | null) : modéliser la réalité sans tricher.",
      },
      {
        name: "Narrowing",
        definition:
          "Affiner un type par des vérifications (typeof, in) pour que le compilateur suive votre raisonnement.",
      },
      {
        name: "Strict mode",
        definition:
          "Le mode strict active toutes les vérifications : plus exigeant à l'écriture, bien plus sûr ensuite.",
      },
    ],
    howItWorksTitle: "De TypeScript à JavaScript",
    howItWorks: ["SOURCE", "CHECKER", "ERRORS", "ERASE", "JAVASCRIPT", "RUN"],
    example: {
      title: "Typer une fonction",
      steps: [
        "Définir une interface User",
        "Annoter les paramètres de la fonction",
        "Erreur détectée à la compilation",
        "Correction avant toute exécution",
      ],
    },
    projectsDetailed: [
      {
        title: "Migrer un projet JS vers TS",
        flow: "Renommage → Annotations progressives → Strict mode → Zéro erreur",
      },
      {
        title: "Typer une API REST de bout en bout",
        flow: "Schémas partagés → Client typé → Erreurs impossibles par construction",
      },
      {
        title: "Créer une bibliothèque typée",
        flow: "Génériques → Inférence → Documentation par les types → Publication",
      },
    ],
  },

  // ----------------------------------------------------------------- react
  react: {
    definition:
      "React est une bibliothèque JavaScript pour construire des interfaces utilisateur par composants : des briques réutilisables qui décrivent l'UI en fonction de l'état, et se mettent à jour automatiquement quand il change.",
    whyLearn:
      "React est l'écosystème frontend le plus riche : documentation, composants, offres d'emploi. Son modèle composants + état unidirectionnel structure la pensée UI, et ouvre la voie à React Native, Next.js et tout l'outillage moderne.",
    prerequisiteNotes: {
      typescript:
        "Le typage rend les props et l'état prévisibles : la plupart des projets React sont en TS.",
      "js-modules":
        "Les composants vivent dans des modules importés : import/export est indispensable.",
    },
    conceptDetails: [
      {
        name: "Composants",
        definition:
          "Des fonctions qui retournent de l'UI : l'unité de construction, réutilisable et composable.",
      },
      {
        name: "Props",
        definition:
          "Les données passées d'un parent à un enfant : le flux descend, jamais l'inverse.",
      },
      {
        name: "État",
        definition:
          "Les données qui changent dans le temps : quand l'état change, React re-rend.",
      },
      {
        name: "Effets",
        definition:
          "Synchroniser le composant avec l'extérieur : appels API, abonnements, timers.",
      },
      {
        name: "Rendu",
        definition:
          "React calcule le DOM virtuel, compare avec le précédent et n'applique que les différences.",
      },
      {
        name: "Écosystème",
        definition:
          "Router, formulaires, data fetching, state : un outillage immense autour du cœur de la bibliothèque.",
      },
    ],
    howItWorksTitle: "Le cycle de rendu",
    howItWorks: ["STATE", "RENDER", "VIRTUAL DOM", "DIFF", "COMMIT", "DOM"],
    example: {
      title: "Liste de tâches filtrable",
      steps: [
        "État : tâches + filtre actif",
        "Rendu de la liste filtrée",
        "Clic sur un filtre",
        "Nouvel état → nouveau rendu automatique",
      ],
    },
    projectsDetailed: [
      {
        title: "Application de notes avec recherche",
        flow: "État → Filtre → Persistance locale → Interface",
      },
      {
        title: "Galerie avec appels API",
        flow: "Chargement → Données → Grille → États d'erreur",
      },
      {
        title: "Formulaire multi-étapes",
        flow: "État partagé → Validation → Navigation → Résumé",
      },
    ],
  },

  // ---------------------------------------------------------------- nodejs
  nodejs: {
    definition:
      "Node.js est un environnement d'exécution qui fait tourner JavaScript hors du navigateur, côté serveur. Il excelle dans les opérations d'entrées/sorties grâce à son modèle non bloquant piloté par événements.",
    whyLearn:
      "Node.js permet à un développeur web de construire un backend complet avec le même langage : APIs REST, scripts, outils en ligne de commande. C'est la passerelle la plus directe du frontend vers le full stack.",
    prerequisiteNotes: {
      javascript:
        "Maîtriser JS, surtout l'asynchrone : Node.js en est entièrement construit.",
    },
    conceptDetails: [
      {
        name: "Event loop",
        definition:
          "La boucle qui traite les événements et les callbacks : un seul thread, des milliers de connexions.",
      },
      {
        name: "Modules",
        definition:
          "CommonJS et ES modules : organiser le code serveur en fichiers importables.",
      },
      {
        name: "Express/Fastify",
        definition:
          "Les frameworks minimalistes pour déclarer routes, middlewares et gestion d'erreurs.",
      },
      {
        name: "APIs REST",
        definition:
          "Exposer des ressources JSON : le cas d'usage serveur le plus courant.",
      },
      {
        name: "Streams",
        definition:
          "Traiter les données par morceaux (fichiers, réseau) sans tout charger en mémoire.",
      },
      {
        name: "npm",
        definition:
          "Le gestionnaire de paquets intégré : dépendances, scripts, publication.",
      },
    ],
    howItWorksTitle: "Traiter une requête",
    howItWorks: ["REQUEST", "EVENT LOOP", "HANDLER", "I/O", "CALLBACK", "RESPONSE"],
    example: {
      title: "API de notes",
      steps: [
        "GET /notes reçu",
        "Lecture du fichier de données",
        "Réponse JSON renvoyée",
        "POST /notes → écriture persistée",
      ],
    },
    projectsDetailed: [
      {
        title: "API REST avec Express",
        flow: "Routes → Middlewares → Validation → Persistance → Tests",
      },
      {
        title: "CLI en Node.js",
        flow: "Arguments → Fichiers → Traitement → Sortie formatée",
      },
      {
        title: "Serveur de fichiers statiques",
        flow: "Requête → Streams → Cache → En-têtes → Réponse",
      },
    ],
  },

  // ============================================================ TIER 2
  // Guides intermédiaires : définition, intérêt, prérequis, concepts clés.

  // ---------------------------------------------------------- culture-info
  "culture-info": {
    definition:
      "La culture informatique rassemble les fondamentaux : ce qu'est un ordinateur, un système d'exploitation, un réseau, un programme — et comment tout cela s'articule.",
    whyLearn:
      "C'est le socle : sans ces repères, chaque outil semble magique et chaque erreur incompréhensible. Comprendre la machine rend tout le reste — programmation, réseaux, systèmes — plus rapide à apprendre et plus facile à déboguer.",
    conceptDetails: [
      {
        name: "Systèmes d'exploitation",
        definition:
          "Le logiciel qui pilote le matériel et fournit des services (fichiers, processus, réseau) aux programmes.",
      },
      {
        name: "Binaire",
        definition:
          "Le langage des machines : toute information — texte, image, programme — est codée en 0 et 1.",
      },
      {
        name: "Réseaux",
        definition:
          "Des machines reliées qui échangent des données selon des protocoles convenus.",
      },
      {
        name: "Algorithmes",
        definition:
          "Une suite d'étapes précises qui résout un problème : la matière première des programmes.",
      },
      {
        name: "Compilation",
        definition:
          "Traduire du code source lisible en instructions exécutables par la machine.",
      },
      {
        name: "Cloud",
        definition:
          "Des serveurs distants loués à la demande via internet, au lieu de machines physiques à gérer.",
      },
    ],
  },

  // ------------------------------------------------------------ algorithms
  algorithms: {
    definition:
      "L'algorithmique est l'art de décomposer un problème en une suite d'étapes précises, correctes et efficaces qu'une machine peut exécuter.",
    whyLearn:
      "C'est la grammaire de la programmation : trier, rechercher, parcourir des données. Savoir évaluer la complexité d'un algorithme permet de choisir la bonne approche avant d'écrire une ligne de code — et c'est le sujet central des entretiens techniques.",
    prerequisiteNotes: {
      "culture-info":
        "Savoir ce qu'est un programme et comment il s'exécute, étape par étape.",
    },
    conceptDetails: [
      {
        name: "Complexité",
        definition:
          "Mesurer le coût d'un algorithme en temps et en mémoire selon la taille des données (notation O).",
      },
      {
        name: "Tri",
        definition:
          "Ordonner des éléments : tri à bulles pour comprendre, tri rapide et tri fusion pour performer.",
      },
      {
        name: "Recherche",
        definition:
          "Retrouver un élément : parcours linéaire, ou recherche dichotomique dans un tableau trié.",
      },
      {
        name: "Récursivité",
        definition:
          "Une fonction qui s'appelle elle-même pour résoudre des sous-problèmes de plus en plus petits.",
      },
      {
        name: "Structures de contrôle",
        definition:
          "Conditions et boucles : les briques qui composent tout algorithme.",
      },
      {
        name: "Pseudocode",
        definition:
          "Décrire un algorithme en langage naturel structuré avant de l'écrire dans un vrai langage.",
      },
    ],
  },

  // -------------------------------------------------------- data-structures
  "data-structures": {
    definition:
      "Les structures de données sont des façons d'organiser l'information en mémoire — tableaux, listes, arbres, tables de hachage — chacune avec ses forces et ses coûts.",
    whyLearn:
      "Choisir la bonne structure change tout en performance : chercher dans une table de hachage ou parcourir un arbre n'a rien à voir avec une liste chaînée. C'est aussi, avec l'algorithmique, le sujet central des entretiens techniques.",
    prerequisiteNotes: {
      algorithms:
        "Savoir analyser un algorithme : les structures existent pour les rendre efficaces.",
    },
    conceptDetails: [
      {
        name: "Tableaux",
        definition:
          "Des éléments contigus indexés : accès direct en O(1), insertion coûteuse.",
      },
      {
        name: "Listes chaînées",
        definition:
          "Des nœuds reliés par pointeurs : insertion facile, accès séquentiel.",
      },
      {
        name: "Piles & files",
        definition:
          "LIFO (pile) et FIFO (file) : c'est l'ordre d'accès qui définit la structure.",
      },
      {
        name: "Arbres",
        definition:
          "Une hiérarchie de nœuds : DOM, systèmes de fichiers, recherche binaire.",
      },
      {
        name: "Tables de hachage",
        definition:
          "Association clé → valeur en temps quasi constant : le dictionnaire des programmes.",
      },
      {
        name: "Graphes",
        definition:
          "Nœuds et arêtes : réseaux sociaux, cartes routières, dépendances entre tâches.",
      },
    ],
  },

  // ------------------------------------------------------------------ bash
  bash: {
    definition:
      "Bash est le langage du shell Linux : il permet d'enchaîner des commandes, de manipuler des fichiers et d'écrire des scripts qui automatisent les tâches.",
    whyLearn:
      "Le terminal est l'interface des serveurs et des outils de développement. Savoir scripter en Bash transforme les tâches répétitives — déploiements, sauvegardes, traitements de fichiers — en commandes fiables et rejouables.",
    prerequisiteNotes: {
      linux:
        "Être à l'aise dans le terminal Linux : Bash est son langage.",
    },
    conceptDetails: [
      {
        name: "Pipes",
        definition:
          "Chaîner des commandes : la sortie de l'une devient l'entrée de la suivante.",
      },
      {
        name: "Variables",
        definition:
          "Stocker des valeurs réutilisables pour rendre un script paramétrable.",
      },
      {
        name: "Boucles",
        definition:
          "Répéter une action sur une liste de fichiers, de serveurs ou de valeurs.",
      },
      {
        name: "Scripts",
        definition:
          "Des fichiers exécutables qui automatisent une séquence de commandes.",
      },
      {
        name: "Cron",
        definition:
          "Planifier l'exécution de scripts à intervalles réguliers, sans intervention.",
      },
      {
        name: "Expressions régulières",
        definition:
          "Décrire des motifs de texte pour chercher, filtrer et remplacer avec précision.",
      },
    ],
  },

  // --------------------------------------------------------------- networks
  networks: {
    definition:
      "Les réseaux sont l'infrastructure qui relie les machines : protocoles, adressage, routage. Comprendre ce qui se passe entre le clic et la réponse du serveur.",
    whyLearn:
      "Chaque application moderne est distribuée : DNS, TCP/IP, ports, latence. Ces notions expliquent les pannes, les lenteurs et les problèmes de sécurité rencontrés au quotidien — et sont indispensables en DevOps comme en cybersécurité.",
    prerequisiteNotes: {
      "culture-info":
        "Savoir ce qu'est un réseau et un protocole au sens large.",
    },
    conceptDetails: [
      {
        name: "TCP/IP",
        definition:
          "La pile de protocoles qui transporte les données sur internet, de façon fiable et ordonnée.",
      },
      {
        name: "DNS",
        definition:
          "L'annuaire qui traduit les noms de domaine en adresses IP.",
      },
      {
        name: "Adressage IP",
        definition:
          "L'identifiant unique d'une machine sur un réseau, avec masques et sous-réseaux.",
      },
      {
        name: "Modèle OSI",
        definition:
          "Les 7 couches qui décrivent la communication, du câble physique jusqu'à l'application.",
      },
      {
        name: "Ports",
        definition:
          "Les numéros qui distinguent les services sur une même machine (80, 443, 22…).",
      },
      {
        name: "Routage",
        definition:
          "Acheminer les paquets d'un réseau à l'autre jusqu'à leur destination.",
      },
    ],
  },

  // -------------------------------------------------------------- databases
  databases: {
    definition:
      "Les bases de données stockent et organisent l'information de façon durable et interrogeable : relationnel, document, clé-valeur — chaque famille a ses usages.",
    whyLearn:
      "La donnée est au cœur de toute application : choisir le bon type de base, modéliser correctement et garantir l'intégrité détermine la fiabilité de tout le système. C'est un choix d'architecture, pas un détail d'implémentation.",
    prerequisiteNotes: {
      "culture-info":
        "Comprendre ce qu'est un programme et la persistance des données.",
    },
    conceptDetails: [
      {
        name: "Relationnel",
        definition:
          "Des tables liées par des clés : rigueur du schéma et puissance de SQL.",
      },
      {
        name: "NoSQL",
        definition:
          "Document, clé-valeur, graphe : flexibilité du schéma et passage à l'échelle horizontal.",
      },
      {
        name: "Index",
        definition:
          "Des structures qui accélèrent la recherche, au prix d'un coût à l'écriture.",
      },
      {
        name: "Transactions",
        definition:
          "Un groupe d'opérations indivisible : tout réussit ou rien n'est appliqué.",
      },
      {
        name: "Modélisation",
        definition:
          "Concevoir le schéma : entités, relations, contraintes d'intégrité.",
      },
      {
        name: "Sauvegarde",
        definition:
          "Protéger les données contre la perte : dumps réguliers, réplication, restauration testée.",
      },
    ],
  },

  // ------------------------------------------------------------------ html
  html: {
    definition:
      "HTML est le langage de balisage qui structure le contenu des pages web : titres, paragraphes, liens, images, formulaires — avec une sémantique que navigateurs et lecteurs d'écran comprennent.",
    whyLearn:
      "C'est la première brique du web : sans HTML sémantique, pas d'accessibilité, pas de SEO, pas de base solide pour CSS et JavaScript. Bien le maîtriser rend tout le reste plus simple et plus robuste.",
    prerequisiteNotes: {
      "culture-info":
        "Savoir ce qu'est une page web et un navigateur.",
    },
    conceptDetails: [
      {
        name: "Sémantique",
        definition:
          "Choisir la balise qui décrit le sens — article, nav, main — plutôt que des div partout.",
      },
      {
        name: "Formulaires",
        definition:
          "Collecter des données : champs, labels associés, validation native du navigateur.",
      },
      {
        name: "Accessibilité",
        definition:
          "Un HTML propre et sémantique est la fondation d'un site utilisable par tous.",
      },
      {
        name: "Médias",
        definition:
          "Intégrer images, audio et vidéo de façon responsive et performante.",
      },
      {
        name: "SEO",
        definition:
          "Une structure claire (titres hiérarchisés, métadonnées) aide les moteurs à comprendre la page.",
      },
      {
        name: "Balises",
        definition:
          "Les éléments de base : p, a, img, ul, table, section — le vocabulaire du document.",
      },
    ],
  },

  // ------------------------------------------------------------------- css
  css: {
    definition:
      "CSS est le langage qui met en forme les pages web : couleurs, typographies, espacements, positionnement et mises en page.",
    whyLearn:
      "CSS transforme un document brut en interface utilisable. Comprendre la cascade, le box model et le positionnement est indispensable avant tout framework — et c'est là que se jouent la plupart des bugs visuels.",
    prerequisiteNotes: {
      html: "Savoir structurer une page : CSS s'applique à cette structure.",
    },
    conceptDetails: [
      {
        name: "Sélecteurs",
        definition:
          "Cibler les éléments à styler : classes, IDs, attributs, pseudo-classes.",
      },
      {
        name: "Cascade",
        definition:
          "Les règles de priorité — spécificité, ordre, héritage — quand plusieurs styles s'appliquent.",
      },
      {
        name: "Box model",
        definition:
          "Content, padding, border, margin : l'anatomie de chaque élément et de son espace.",
      },
      {
        name: "Positionnement",
        definition:
          "Static, relative, absolute, fixed, sticky : placer les éléments dans et hors du flux.",
      },
      {
        name: "Variables",
        definition:
          "Des custom properties réutilisables pour des thèmes cohérents et maintenables.",
      },
      {
        name: "Media queries",
        definition:
          "Adapter le style selon la taille de l'écran : la base du responsive design.",
      },
    ],
  },

  // -------------------------------------------------------------- async-js
  "async-js": {
    definition:
      "JavaScript est mono-thread mais non bloquant : l'event loop, les promesses et async/await permettent d'attendre réseau, fichiers ou timers sans figer le programme.",
    whyLearn:
      "Dès qu'on parle réseau, fichiers ou timers, tout est asynchrone en JavaScript. Mal comprendre les promesses, c'est des bugs subtils et des interfaces figées ; bien les maîtriser, c'est écrire du code fluide et prévisible.",
    prerequisiteNotes: {
      javascript:
        "Maîtriser les fonctions et les callbacks : l'asynchrone s'appuie dessus.",
    },
    conceptDetails: [
      {
        name: "Event loop",
        definition:
          "La boucle qui exécute les tâches une par une et traite les événements au fur et à mesure.",
      },
      {
        name: "Promesses",
        definition:
          "Des objets représentant une valeur future : pending, fulfilled ou rejected.",
      },
      {
        name: "async/await",
        definition:
          "Écrire du code asynchrone comme s'il était synchrone : lisible, avec try/catch.",
      },
      {
        name: "Callbacks",
        definition:
          "Des fonctions passées en argument, exécutées plus tard quand l'opération se termine.",
      },
      {
        name: "Erreurs",
        definition:
          "Les erreurs asynchrones doivent être capturées : try/catch avec await, .catch() avec les promesses.",
      },
      {
        name: "Concurrence",
        definition:
          "Promise.all, race, allSettled : orchestrer plusieurs opérations en parallèle proprement.",
      },
    ],
  },

  // -------------------------------------------------------------- fetch-api
  "fetch-api": {
    definition:
      "Fetch est l'API native du navigateur pour envoyer des requêtes HTTP et recevoir des réponses, généralement en JSON.",
    whyLearn:
      "C'est le pont entre une interface et un serveur : charger des données, envoyer des formulaires, appeler des APIs. Tout frontend moderne dialogue avec le backend via fetch ou ses équivalents.",
    prerequisiteNotes: {
      "async-js":
        "fetch retourne des promesses : il faut savoir les manipuler avec then ou await.",
      http: "Comprendre méthodes, codes de statut et en-têtes pour construire de bonnes requêtes.",
    },
    conceptDetails: [
      {
        name: "Requêtes",
        definition:
          "Composer un appel : URL, méthode, corps et options (mode, credentials).",
      },
      {
        name: "JSON",
        definition:
          "La plupart des réponses se lisent avec response.json() : du texte vers un objet.",
      },
      {
        name: "Headers",
        definition:
          "Content-Type, Authorization : les métadonnées qui accompagnent chaque échange.",
      },
      {
        name: "Erreurs",
        definition:
          "fetch ne rejette que sur échec réseau : il faut tester response.ok pour les erreurs HTTP.",
      },
      {
        name: "Auth (tokens)",
        definition:
          "Envoyer un token Bearer dans l'en-tête Authorization pour les routes protégées.",
      },
      {
        name: "Abort",
        definition:
          "Annuler une requête en cours avec AbortController : éviter les réponses périmées.",
      },
    ],
  },

  // ------------------------------------------------------------------- dom
  dom: {
    definition:
      "Le DOM (Document Object Model) est la représentation en mémoire d'une page HTML : un arbre d'objets que JavaScript peut lire et modifier.",
    whyLearn:
      "Comprendre le DOM, c'est comprendre ce que React et les frameworks abstraient : sélection, événements, mises à jour. Cela rend le débogage plus facile, les frameworks moins magiques, et permet de se passer d'eux quand ils sont superflus.",
    prerequisiteNotes: {
      javascript:
        "Savoir manipuler objets et fonctions : le DOM est une API entièrement objet.",
    },
    conceptDetails: [
      {
        name: "Sélecteurs",
        definition:
          "querySelector et querySelectorAll : cibler des éléments avec la syntaxe CSS.",
      },
      {
        name: "Événements",
        definition:
          "click, input, submit : réagir aux actions de l'utilisateur via des écouteurs.",
      },
      {
        name: "Manipulation",
        definition:
          "Créer, déplacer, modifier et supprimer des nœuds de l'arbre.",
      },
      {
        name: "Délégation",
        definition:
          "Écouter un parent plutôt que cent enfants : plus simple, plus rapide, robuste aux ajouts dynamiques.",
      },
      {
        name: "Performance",
        definition:
          "Chaque modification peut déclencher un recalcul de mise en page : regrouper les changements.",
      },
      {
        name: "Shadow DOM",
        definition:
          "Encapsuler le markup et le style d'un composant pour l'isoler du reste de la page.",
      },
    ],
  },

  // ------------------------------------------------------------------- npm
  npm: {
    definition:
      "npm est le gestionnaire de paquets de l'écosystème JavaScript : il installe des bibliothèques depuis un registre de plusieurs millions de paquets, gère les versions et automatise les scripts.",
    whyLearn:
      "Aucun projet JS moderne ne se construit sans dépendances. Comprendre package.json, le versioning semver et les lockfiles évite les installations cassées, les comportements non reproductibles et les failles via des dépendances.",
    prerequisiteNotes: {
      javascript:
        "Savoir ce qu'est un projet JS : npm organise ses dépendances et ses scripts.",
    },
    conceptDetails: [
      {
        name: "Install",
        definition:
          "Télécharger et lier les dépendances déclarées dans package.json.",
      },
      {
        name: "package.json",
        definition:
          "Le manifeste du projet : dépendances, scripts, métadonnées, version.",
      },
      {
        name: "Semver",
        definition:
          "Le versionnage sémantique major.minor.patch : la grammaire qui dit ce qu'une mise à jour peut casser.",
      },
      {
        name: "Scripts",
        definition:
          "Automatiser les tâches courantes — dev, build, test — avec npm run.",
      },
      {
        name: "Registres",
        definition:
          "Le dépôt central, public ou privé, d'où proviennent les paquets.",
      },
      {
        name: "Lockfiles",
        definition:
          "Figer les versions exactes installées pour des environnements reproductibles.",
      },
    ],
  },

  // ------------------------------------------------------------------ vite
  vite: {
    definition:
      "Vite est l'outil de build moderne de l'écosystème JS : serveur de développement instantané grâce aux modules ES natifs, rechargement à chaud éclair, build de production optimisé.",
    whyLearn:
      "Vite a remplacé les bundlers lents pour le développement quotidien : démarrer en millisecondes change le rythme de travail. C'est le standard pour les nouveaux projets React, Vue ou vanilla — et la base d'outils comme Vitest.",
    prerequisiteNotes: {
      npm: "Vite s'installe et se lance via npm : comprendre les scripts et les dépendances.",
      javascript:
        "Comprendre les modules ES, que Vite exploite nativement sans les bundler en dev.",
    },
    conceptDetails: [
      {
        name: "Dev server",
        definition:
          "Démarrage quasi instantané : les modules sont servis à la demande, sans bundling préalable.",
      },
      {
        name: "HMR",
        definition:
          "Hot Module Replacement : voir les changements appliqués sans recharger la page ni perdre l'état.",
      },
      {
        name: "Build",
        definition:
          "En production : bundling Rollup, minification, code splitting et assets optimisés.",
      },
      {
        name: "Plugins",
        definition:
          "Étendre Vite : React, PWA, images, Markdown — un écosystème de plugins riche.",
      },
      {
        name: "Optimisations",
        definition:
          "Pré-bundling des dépendances et cache agressif pour garder le dev server rapide.",
      },
      {
        name: "Lib mode",
        definition:
          "Compiler une bibliothèque publiable plutôt qu'une application : un autre mode de build.",
      },
    ],
  },

  // ---------------------------------------------------------------- nextjs
  nextjs: {
    definition:
      "Next.js est le framework React de référence pour la production : rendu côté serveur, génération statique, App Router, routes API et déploiement simplifié.",
    whyLearn:
      "Next.js résout les vrais problèmes des applications React : SEO, performance du premier chargement, routing, backend léger. C'est le standard pour les applications React sérieuses et la voie naturelle vers le full stack.",
    prerequisiteNotes: {
      react:
        "Maîtriser les composants, l'état et les effets : Next.js s'appuie entièrement dessus.",
    },
    conceptDetails: [
      {
        name: "App Router",
        definition:
          "Le routing basé sur le système de fichiers, avec layouts imbriqués et conventions de dossiers.",
      },
      {
        name: "SSR/SSG",
        definition:
          "Rendre les pages côté serveur à la demande (SSR) ou les générer en statique au build (SSG).",
      },
      {
        name: "Server Components",
        definition:
          "Des composants qui s'exécutent uniquement sur le serveur : moins de JS envoyé au client.",
      },
      {
        name: "API routes",
        definition:
          "Créer des endpoints backend dans le même projet, sans serveur séparé.",
      },
      {
        name: "Middleware",
        definition:
          "Intercepter les requêtes avant le rendu : authentification, redirections, internationalisation.",
      },
      {
        name: "Déploiement",
        definition:
          "Build optimisé et adapté aux plateformes serverless : du commit à la production en quelques minutes.",
      },
    ],
  },

  // --------------------------------------------------------------- tailwind
  tailwind: {
    definition:
      "Tailwind CSS est un framework de classes utilitaires : on style directement dans le HTML (flex, pt-4, text-center) au lieu d'écrire du CSS personnalisé.",
    whyLearn:
      "Tailwind accélère la construction d'interfaces cohérentes sans quitter le markup, avec un design system intégré (échelles d'espacement, couleurs, breakpoints). C'est devenu l'approche dominante pour styler rapidement des projets modernes.",
    prerequisiteNotes: {
      css: "Comprendre le CSS sous-jacent : les utilitaires n'en sont qu'une abstraction.",
    },
    conceptDetails: [
      {
        name: "Utilitaires",
        definition:
          "Des classes à usage unique qui appliquent une propriété CSS : composition plutôt que customisation.",
      },
      {
        name: "Responsive",
        definition:
          "Préfixes sm:, md:, lg: pour adapter le style à chaque breakpoint, en mobile-first.",
      },
      {
        name: "Dark mode",
        definition:
          "La variante dark: applique un style conditionnel pour un thème sombre propre.",
      },
      {
        name: "Config",
        definition:
          "Personnaliser couleurs, espacements et polices via le fichier de configuration.",
      },
      {
        name: "Design tokens",
        definition:
          "Une échelle cohérente de valeurs partagées par toute l'interface : la base d'un design system.",
      },
      {
        name: "JIT",
        definition:
          "Compilation à la volée : seules les classes réellement utilisées sont générées dans le CSS final.",
      },
    ],
  },

  // --------------------------------------------------------------- testing
  testing: {
    definition:
      "Les tests vérifient automatiquement que le code se comporte comme prévu : tests unitaires, d'intégration, end-to-end. Ils permettent de refactorer sans peur.",
    whyLearn:
      "Tester, c'est pouvoir faire évoluer un projet sans tout casser. La culture du test distingue un prototype d'un logiciel maintenable — et c'est une attente standard du travail en équipe.",
    prerequisiteNotes: {
      javascript:
        "Savoir écrire du code testable : fonctions pures, modules découplés, effets isolés.",
    },
    conceptDetails: [
      {
        name: "Unitaires",
        definition:
          "Tester une fonction ou un module isolé : rapide, précis, la base de la pyramide.",
      },
      {
        name: "Intégration",
        definition:
          "Tester la collaboration de plusieurs modules : l'API avec sa base, le composant avec son store.",
      },
      {
        name: "E2E",
        definition:
          "Tester l'application comme un utilisateur, dans un vrai navigateur : le parcours complet.",
      },
      {
        name: "TDD",
        definition:
          "Écrire le test avant le code : une spécification exécutable qui guide la conception.",
      },
      {
        name: "Mocks",
        definition:
          "Simuler dépendances et APIs pour des tests déterministes et rapides.",
      },
      {
        name: "Coverage",
        definition:
          "Mesurer la part du code exercée par les tests : un indicateur utile, pas un objectif en soi.",
      },
    ],
  },

  // ---------------------------------------------------------------- github
  github: {
    definition:
      "GitHub est la plateforme qui héberge le code Git et organise le travail d'équipe : pull requests, code review, issues, automatisation.",
    whyLearn:
      "C'est là que vit le code du monde : collaborer via pull requests et code review est la compétence sociale du développement. Un profil GitHub actif est aussi une vitrine professionnelle qui parle plus qu'un CV.",
    prerequisiteNotes: {
      git: "Maîtriser commits, branches et remotes : GitHub les orchestre à l'échelle d'une équipe.",
    },
    conceptDetails: [
      {
        name: "Pull requests",
        definition:
          "Proposer des changements : discussion, revue, puis fusion dans la branche principale.",
      },
      {
        name: "Code review",
        definition:
          "Relire le code des autres : qualité, détection de bugs, partage de connaissance.",
      },
      {
        name: "Issues",
        definition:
          "Suivre bugs, fonctionnalités et discussions liés au projet.",
      },
      {
        name: "Projects",
        definition:
          "Organiser le travail en tableaux : colonnes, priorités, avancement.",
      },
      {
        name: "Forks",
        definition:
          "Copier un dépôt sur son compte pour contribuer sans accès direct en écriture.",
      },
      {
        name: "Actions",
        definition:
          "Automatiser tests, builds et déploiements à chaque push : la CI/CD intégrée.",
      },
    ],
  },

  // --------------------------------------------------------------- postman
  postman: {
    definition:
      "Postman est l'atelier des APIs : envoyer des requêtes HTTP, les organiser en collections, les automatiser et les documenter.",
    whyLearn:
      "Avant d'écrire le moindre code client, Postman permet d'explorer une API, de comprendre ses réponses et ses erreurs, puis d'automatiser des suites de tests. Indispensable dès qu'on consomme ou conçoit des APIs.",
    prerequisiteNotes: {
      http: "Savoir construire une requête : méthode, URL, en-têtes, corps.",
      rest: "Comprendre les ressources et les conventions REST que l'on va tester.",
    },
    conceptDetails: [
      {
        name: "Requêtes",
        definition:
          "Composer et envoyer des appels HTTP avec corps, en-têtes et paramètres.",
      },
      {
        name: "Collections",
        definition:
          "Organiser les requêtes par API ou par parcours utilisateur, partageables en équipe.",
      },
      {
        name: "Environnements",
        definition:
          "Des variables par contexte — dev, staging, prod — pour basculer d'un backend à l'autre.",
      },
      {
        name: "Tests",
        definition:
          "Des assertions automatiques sur les réponses : statut, temps, contenu.",
      },
      {
        name: "Documentation",
        definition:
          "Générer une documentation interactive et testable depuis une collection.",
      },
      {
        name: "Mocks",
        definition:
          "Simuler une API pas encore implémentée pour développer le client en parallèle.",
      },
    ],
  },

  // -------------------------------------------------------------- fullstack
  fullstack: {
    definition:
      "Full stack désigne la capacité à construire une application de bout en bout : base de données, API backend, interface frontend et déploiement.",
    whyLearn:
      "C'est le profil le plus polyvalent : comprendre toute la chaîne permet de concevoir des fonctionnalités complètes, de déboguer à tous les niveaux et de livrer seul un produit fonctionnel.",
    prerequisiteNotes: {
      nextjs:
        "Le frontend et les API routes : la moitié de la stack, côté interface.",
      nodejs:
        "Le backend : APIs, authentification, logique métier et persistance.",
    },
    conceptDetails: [
      {
        name: "BDD",
        definition:
          "Modéliser et interroger les données : le socle persistant de l'application.",
      },
      {
        name: "API",
        definition:
          "Le contrat entre frontend et backend : ressources, validation, erreurs.",
      },
      {
        name: "Frontend",
        definition:
          "L'interface que l'utilisateur manipule : composants, état, navigation.",
      },
      {
        name: "Auth",
        definition:
          "Identifier les utilisateurs et protéger les routes : sessions, tokens, OAuth.",
      },
      {
        name: "Déploiement",
        definition:
          "Mettre en ligne : build, hébergement, domaine, variables d'environnement.",
      },
      {
        name: "Observabilité",
        definition:
          "Logs, métriques, suivi d'erreurs : savoir ce qui se passe vraiment en production.",
      },
    ],
  },

  // ---------------------------------------------------------- accessibility
  accessibility: {
    definition:
      "L'accessibilité consiste à concevoir des interfaces utilisables par tous : lecteurs d'écran, navigation au clavier, contrastes suffisants.",
    whyLearn:
      "C'est une exigence légale dans de nombreux pays, un impératif éthique, et souvent un gain pour tous les utilisateurs. Un HTML sémantique et quelques réflexes suffisent à éviter la plupart des barrières.",
    prerequisiteNotes: {
      html: "Un HTML sémantique est la fondation de toute accessibilité.",
    },
    conceptDetails: [
      {
        name: "ARIA",
        definition:
          "Des attributs qui décrivent rôles et états aux technologies d'assistance, quand le HTML seul ne suffit pas.",
      },
      {
        name: "Navigation clavier",
        definition:
          "Tout doit être atteignable et actionnable au clavier seul : tabulation logique, raccourcis.",
      },
      {
        name: "Contrastes",
        definition:
          "Un ratio suffisant entre texte et fond pour rester lisible, y compris en plein soleil.",
      },
      {
        name: "Lecteurs d'écran",
        definition:
          "Des logiciels qui vocalisent la page : ils lisent le DOM, pas le visuel.",
      },
      {
        name: "WCAG",
        definition:
          "Le référentiel international des critères d'accessibilité, en niveaux A, AA et AAA.",
      },
      {
        name: "Focus",
        definition:
          "Un indicateur visible montre toujours où se trouve le clavier : ne jamais le masquer.",
      },
    ],
  },

  // ============================================================ TIER 3
  // Définitions : definition + whyLearn uniquement.

  // ------------------------------------------------------------ responsive
  responsive: {
    definition:
      "Le responsive design adapte une interface à toutes les tailles d'écran : du mobile 360 px à l'écran 4K, via media queries, unités fluides et approche mobile-first.",
    whyLearn:
      "Plus de la moitié du trafic web est mobile. Une interface qui casse sur petit écran perd ses utilisateurs : le responsive n'est plus une option, c'est la façon standard de construire.",
  },

  // --------------------------------------------------------------- flexbox
  flexbox: {
    definition:
      "Flexbox est le module CSS de mise en page unidimensionnel : il aligne, distribue et ordonne des éléments le long d'un axe, avec un contrôle fin de l'alignement et de l'espace.",
    whyLearn:
      "C'est l'outil quotidien du layout : barres de navigation, cartes, centrages verticaux. Quelques propriétés suffisent à résoudre la grande majorité des problèmes d'alignement.",
  },

  // -------------------------------------------------------------- css-grid
  "css-grid": {
    definition:
      "CSS Grid est le système de mise en page bidimensionnel : lignes et colonnes définissent une grille où placer les éléments, pour des layouts complexes en quelques lignes.",
    whyLearn:
      "Grid excelle là où Flexbox atteint ses limites : dashboards, mises en page magazine, grilles responsives. Les deux sont complémentaires, pas concurrents.",
  },

  // -------------------------------------------------------- css-animations
  "css-animations": {
    definition:
      "Les animations CSS (transitions et keyframes) ajoutent du mouvement aux interfaces : micro-interactions, feedbacks visuels, changements d'état fluides — sans JavaScript.",
    whyLearn:
      "L'animation guide l'attention et rend les changements d'état compréhensibles. Utilisée avec mesure, et dans le respect de prefers-reduced-motion, elle améliore réellement l'expérience.",
  },

  // ------------------------------------------------------------ js-modules
  "js-modules": {
    definition:
      "Les modules ES (import/export) découpent une application JavaScript en fichiers indépendants qui déclarent explicitement leurs dépendances.",
    whyLearn:
      "C'est la base de tout projet moderne : organisation, réutilisation, tree-shaking par les bundlers. Sans modules, pas de React, pas de Vite, pas d'écosystème.",
  },

  // ------------------------------------------------------------------ pnpm
  pnpm: {
    definition:
      "pnpm est un gestionnaire de paquets compatible npm, plus rapide et plus économe : un store global unique évite de dupliquer les dépendances, avec un support natif des monorepos.",
    whyLearn:
      "Des installations en quelques secondes et des node_modules propres changent le quotidien, surtout sur les gros projets et monorepos. La migration depuis npm est quasi transparente.",
  },

  // ---------------------------------------------------------------- eslint
  eslint: {
    definition:
      "ESLint analyse statiquement le code JavaScript/TypeScript : il détecte les erreurs probables, les mauvaises pratiques et impose un style cohérent en équipe.",
    whyLearn:
      "Il attrape les bugs avant l'exécution et met fin aux débats de style. Intégré à l'éditeur et à la CI, c'est un filet de sécurité permanent.",
  },

  // --------------------------------------------------------------- prettier
  prettier: {
    definition:
      "Prettier est un formateur de code : il réécrit automatiquement le code selon des règles fixes — indentation, guillemets, points-virgules — à chaque sauvegarde.",
    whyLearn:
      "Fini les débats sur les espaces en code review : le style est uniforme et automatique. Combiné à ESLint, il couvre la forme pendant qu'ESLint couvre le fond.",
  },

  // ------------------------------------------------------------ react-hooks
  "react-hooks": {
    definition:
      "Les Hooks (useState, useEffect, useRef, useMemo…) sont les fonctions qui donnent aux composants React accès à l'état, aux effets de bord et au cycle de vie.",
    whyLearn:
      "C'est la grammaire moderne de React : tout l'écosystème actuel s'écrit avec des hooks. Bien les comprendre — surtout useEffect — évite la majorité des bugs React.",
  },

  // ------------------------------------------------------------ react-state
  "react-state": {
    definition:
      "Le state management organise l'état d'une application quand l'état local ne suffit plus : Context, Zustand, Redux Toolkit, React Query — chacun à son niveau.",
    whyLearn:
      "Choisir le bon outil évite le prop drilling comme la sur-ingénierie. Comprendre la distinction entre état client et état serveur (le cache) clarifie toute l'architecture frontend.",
  },

  // ------------------------------------------------------------ react-forms
  "react-forms": {
    definition:
      "Les formulaires React gèrent la saisie utilisateur : état des champs, validation, messages d'erreur, soumission — un domaine où les détails font la qualité.",
    whyLearn:
      "Les formulaires sont partout et bourrés de cas limites : validation, accessibilité, UX d'erreur. Les maîtriser change concrètement la qualité perçue d'une application.",
  },

  // ---------------------------------------------------------------- vitest
  vitest: {
    definition:
      "Vitest est le runner de tests pensé pour l'écosystème Vite : rapide, API compatible Jest, watch mode et interface de debug soignée.",
    whyLearn:
      "Tester devient agréable quand c'est instantané : Vitest s'intègre naturellement aux projets Vite et couvre tests unitaires et d'intégration sans configuration lourde.",
  },

  // ------------------------------------------------------------- playwright
  playwright: {
    definition:
      "Playwright automatise de vrais navigateurs (Chromium, Firefox, WebKit) pour tester une application comme un utilisateur : clics, formulaires, navigation.",
    whyLearn:
      "Les tests E2E attrapent ce que les tests unitaires manquent : les parcours réels, les régressions visuelles, les intégrations. Playwright est devenu la référence pour des suites fiables, y compris en CI.",
  },

  // -------------------------------------------------------------- web-perf
  "web-perf": {
    definition:
      "La performance web mesure et optimise la vitesse ressentie : Core Web Vitals, temps de chargement, fluidité — via code splitting, lazy loading, cache et images optimisées.",
    whyLearn:
      "La vitesse est une fonctionnalité : elle impacte conversion, SEO et rétention. Mesurer d'abord avec Lighthouse, optimiser ensuite — jamais l'inverse.",
  },

  // -------------------------------------------------------- frontend-archi
  "frontend-archi": {
    definition:
      "L'architecture frontend organise le code quand projets et équipes grandissent : monorepos, design systems, découpage par fonctionnalités, conventions partagées.",
    whyLearn:
      "Un projet qui grandit sans architecture devient ingérable. Ces patterns — feature-sliced, design systems documentés, monorepos — gardent une base de code compréhensible à dix comme à cent développeurs.",
  },

  // ---------------------------------------------------------- react-native
  "react-native": {
    definition:
      "React Native permet de créer des applications mobiles iOS et Android avec React : le code JavaScript pilote des composants d'interface réellement natifs.",
    whyLearn:
      "Un seul code pour deux plateformes, avec des compétences React existantes : c'est la voie la plus directe du web vers le mobile pour un développeur frontend.",
  },

  // ---------------------------------------------------------------- flutter
  flutter: {
    definition:
      "Flutter est le framework UI de Google (langage Dart) : il dessine lui-même chaque pixel, pour des applications mobiles, web et desktop depuis une seule base de code.",
    whyLearn:
      "Son moteur de rendu maison garantit un visuel identique partout et des performances élevées. Une alternative crédible quand on vise le multiplateforme sans passer par les technologies web.",
  },

  // --------------------------------------------------------------- electron
  electron: {
    definition:
      "Electron emballe une application web (HTML/CSS/JS) dans un shell desktop : Chromium pour l'interface, Node.js pour le système — c'est la stack de VS Code, Discord et Slack.",
    whyLearn:
      "Il permet de livrer une vraie application desktop avec des compétences web. Le revers : un coût mémoire à assumer — d'où l'importance de comprendre son architecture main/renderer avant de l'adopter.",
  },
};

import type { SkillGuide } from "../skill-guides";
import { LEARNING_TYPESCRIPT } from "./learning-typescript";
import { LEARNING_LINUX } from "./learning-linux";
import { LEARNING_GIT } from "./learning-git";
import { LEARNING_HTML } from "./learning-html";
import { LEARNING_CSS } from "./learning-css";
import { LEARNING_JAVASCRIPT } from "./learning-javascript";
import { LEARNING_REACT } from "./learning-react";
import { LEARNING_CSHARP } from "./learning-csharp";
import { LEARNING_ANGULAR } from "./learning-angular";
import { LEARNING_DJANGO } from "./learning-django";
import { LEARNING_VUE } from "./learning-vue";
import { LEARNING_GO } from "./learning-go";
import { LEARNING_ASPNET } from "./learning-aspnet";
import { LEARNING_RUST } from "./learning-rust";
import { LEARNING_JAVA } from "./learning-java";
import { LEARNING_NODEJS } from "./learning-nodejs";
import { LEARNING_DEVOPS } from "./learning-devops";
import { LEARNING_SQL } from "./learning-sql";
import { LEARNING_ACCESSIBILITY } from "./learning-accessibility";
import { LEARNING_ALGORITHMS } from "./learning-algorithms";
import { LEARNING_ASYNC_JS } from "./learning-async-js";
import { LEARNING_BASH } from "./learning-bash";
import { LEARNING_CSS_ANIMATIONS } from "./learning-css-animations";
import { LEARNING_CSS_GRID } from "./learning-css-grid";
import { LEARNING_CULTURE_INFO } from "./learning-culture-info";
import { LEARNING_DATA_STRUCTURES } from "./learning-data-structures";
import { LEARNING_DATABASES } from "./learning-databases";
import { LEARNING_DOM } from "./learning-dom";
import { LEARNING_ELECTRON } from "./learning-electron";
import { LEARNING_ESLINT } from "./learning-eslint";
import { LEARNING_FETCH_API } from "./learning-fetch-api";
import { LEARNING_FLEXBOX } from "./learning-flexbox";
import { LEARNING_FLUTTER } from "./learning-flutter";
import { LEARNING_FRONTEND_ARCHI } from "./learning-frontend-archi";
import { LEARNING_FULLSTACK } from "./learning-fullstack";
import { LEARNING_GITHUB } from "./learning-github";
import { LEARNING_HTTP } from "./learning-http";
import { LEARNING_JS_MODULES } from "./learning-js-modules";
import { LEARNING_JSON } from "./learning-json";
import { LEARNING_NETWORKS } from "./learning-networks";
import { LEARNING_NEXTJS } from "./learning-nextjs";
import { LEARNING_NPM } from "./learning-npm";
import { LEARNING_PLAYWRIGHT } from "./learning-playwright";
import { LEARNING_PNPM } from "./learning-pnpm";
import { LEARNING_POSTMAN } from "./learning-postman";
import { LEARNING_PRETTIER } from "./learning-prettier";
import { LEARNING_REACT_FORMS } from "./learning-react-forms";
import { LEARNING_REACT_HOOKS } from "./learning-react-hooks";
import { LEARNING_REACT_NATIVE } from "./learning-react-native";
import { LEARNING_REACT_STATE } from "./learning-react-state";
import { LEARNING_RESPONSIVE } from "./learning-responsive";
import { LEARNING_REST } from "./learning-rest";
import { LEARNING_TAILWIND } from "./learning-tailwind";
import { LEARNING_TESTING } from "./learning-testing";
import { LEARNING_VITE } from "./learning-vite";
import { LEARNING_VITEST } from "./learning-vitest";
import { LEARNING_WEB_PERF } from "./learning-web-perf";
import { LEARNING_WEBHOOKS } from "./learning-webhooks";

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
    learning: LEARNING_HTTP,
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
    learning: LEARNING_REST,
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
    learning: LEARNING_WEBHOOKS,
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
    learning: LEARNING_JSON,
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
    learning: LEARNING_GIT,
  setup: {
    install: [
      "`sudo apt install git` (Debian/Ubuntu) ou `brew install git` (macOS).",
      "Windows : Git pour Windows depuis git-scm.com.",
      "Vérifier : `git --version`.",
    ],
    configure: [
      "Déclarer son identité : `git config --global user.name` et `git config --global user.email`.",
      "Branche par défaut : `git config --global init.defaultBranch main`.",
      "Authentification sans mot de passe : `ssh-keygen -t ed25519`, puis ajouter la clé publique sur l'hébergeur.",
    ],
    workflow: [
      "Cycle quotidien : `git status`, `git add`, `git commit -m`.",
      "Branches : `git switch -c feature/x`, `git merge`, `git pull --rebase`.",
      "Historique et annulation : `git log --oneline --graph`, `git restore`, `git revert`.",
    ],
    editors: [
      "VS Code : Git intégré dans la vue Source Control, extension GitLens pour l'historique.",
      "Alternatives : GitHub Desktop (interface simple), lazygit (dans le terminal).",
    ],
  },
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
    learning: LEARNING_LINUX,
  setup: {
    install: [
      "Natif à la plupart des distributions : rien à installer.",
      "Sur Windows, utiliser WSL2 : `wsl --install` dans un PowerShell administrateur.",
      "Choisir une distribution stable pour débuter : Ubuntu LTS ou Debian.",
    ],
    configure: [
      "Mettre à jour les paquets : `sudo apt update && sudo apt upgrade`.",
      "Choisir le shell par défaut : `chsh -s /bin/bash`.",
      "Travailler avec un utilisateur non-root et `sudo` pour l'administration.",
    ],
    workflow: [
      "Naviguer et inspecter : `pwd`, `ls -la`, `cd`, `cat`, `less`.",
      "Gérer fichiers et droits : `cp`, `mv`, `rm`, `mkdir`, `chmod`, `chown`.",
      "Chercher et filtrer : `find`, `grep -r`, `ps aux`, `df -h`.",
    ],
    editors: [
      "VS Code : extension WSL ou Remote - SSH pour éditer directement sur la machine Linux.",
      "En terminal : `nano` pour débuter, Vim pour un usage avancé.",
      "Alternative : GNOME Text Editor ou Kate selon l'environnement de bureau.",
    ],
  },
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
    learning: LEARNING_SQL,
  setup: {
    install: [
      "Aucune installation : SQL est un langage, pas un logiciel.",
      "Installer un SGBD pour pratiquer : PostgreSQL (`sudo apt install postgresql`) ou SQLite (`sqlite3 base.db`).",
      "Vérifier : `psql --version` ou `sqlite3 --version`.",
    ],
    configure: [
      "PostgreSQL : créer un rôle et une base avec `createuser` et `createdb`.",
      "Stocker la connexion dans `DATABASE_URL` ou un fichier `.env` (jamais commité).",
      "Client graphique optionnel : DBeaver ou pgAdmin.",
    ],
    workflow: [
      "`SELECT`, `WHERE`, `JOIN`, `GROUP BY` : l'essentiel du quotidien.",
      "Faire évoluer le schéma avec `ALTER TABLE`, via des migrations versionnées.",
      "Tester chaque requête sur une copie des données, jamais en production.",
    ],
    editors: [
      "VS Code : extension SQLTools pour exécuter des requêtes depuis l'éditeur.",
      "DBeaver (multi-SGBD, gratuit) ou pgAdmin (PostgreSQL) en client dédié.",
    ],
  },
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
    learning: LEARNING_JAVASCRIPT,
  setup: {
    install: [
      "Installer Node.js LTS depuis nodejs.org (ou via nvm : `nvm install --lts`).",
      "Vérifier : `node -v` et `npm -v`.",
      "Côté navigateur : rien à installer, la console (F12) suffit.",
    ],
    configure: [
      "Initialiser le projet : `npm init -y`.",
      "Ajouter `\"type\": \"module\"` dans `package.json` pour `import` / `export` natifs.",
    ],
    workflow: [
      "Exécuter un fichier : `node app.js`.",
      "Découper le code en modules ES (`import` / `export`).",
      "Déboguer : `console.log` ciblés ou le débogueur VS Code (F5).",
    ],
    editors: [
      "VS Code : support JavaScript intégré, sans extension.",
      "Extensions utiles : ESLint, Prettier, Error Lens.",
      "Alternatives : WebStorm (tout intégré), Zed (rapide et léger).",
    ],
  },
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
  learning: LEARNING_TYPESCRIPT,
  setup: {
    install: [
      "Installer en dépendance de dev : `npm install -D typescript`.",
      "Vérifier : `npx tsc --version`.",
      "Aucune installation globale nécessaire : on l'appelle via `npx tsc`.",
    ],
    configure: [
      "Générer le config : `npx tsc --init` → `tsconfig.json`.",
      "Base saine : `strict: true`, `target: ES2022`.",
      "Séparer sources et build : `rootDir: src`, `outDir: dist`.",
    ],
    workflow: [
      "Vérifier sans émettre : `npx tsc --noEmit` ; dev continu : `npx tsc --watch`.",
      "Scripts npm : `\"build\": \"tsc\"`, `\"typecheck\": \"tsc --noEmit\"`.",
      "Mettre `tsc --noEmit` dans la CI : aucun code mal typé ne passe.",
    ],
    editors: [
      "VS Code (recommandé) : le meilleur support TypeScript du marché, intégré.",
      "Extensions : Error Lens, ESLint, Prettier.",
      "Forcer la version du workspace : `Ctrl+Maj+P` → TypeScript: Select TypeScript Version → Use Workspace Version.",
    ],
  },
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
    learning: LEARNING_REACT,
  setup: {
    install: [
      "Via Vite : `npm create vite@latest mon-app -- --template react-ts`, puis `npm install`.",
      "Alternative : `npx create-next-app@latest` pour un framework complet.",
      "Démarrer : `npm run dev`.",
    ],
    configure: [
      "Point d'entrée `src/main.tsx`, composant racine `src/App.tsx`.",
      "Aucun fichier de config React : tout passe par `vite.config.ts` et `tsconfig.json`.",
    ],
    workflow: [
      "Composants fonctions + hooks : `useState`, `useEffect`, `useMemo`.",
      "État partagé : remonter l'état ou Context ; données serveur via une bibliothèque dédiée.",
      "Découper en petits composants nommés par leur rôle, un fichier par composant.",
    ],
    editors: [
      "VS Code : support TSX intégré.",
      "Extensions : ES7+ React snippets, ESLint.",
      "React Developer Tools (extension navigateur) pour inspecter l'arbre des composants.",
    ],
  },
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
    learning: LEARNING_NODEJS,
  setup: {
    install: [
      "Installer Node.js LTS depuis nodejs.org, ou via nvm : `nvm install --lts`.",
      "Vérifier : `node -v` et `npm -v`.",
      "Sur Windows, préférer l'installeur officiel ou `winget install OpenJS.NodeJS.LTS`.",
    ],
    configure: [
      "Épingler la version par projet : fichier `.nvmrc` contenant par ex. `20`.",
      "Déclarer la version minimale dans `package.json` : `\"engines\": { \"node\": \">=20\" }`.",
      "Choisir le système de modules : `\"type\": \"module\"` pour import/export natifs.",
    ],
    workflow: [
      "Exécuter un script : `node app.js` ; rechargement auto : `node --watch app.js`.",
      "Scripts projet : `npm run dev`, `npm run start` définis dans `package.json`.",
      "REPL rapide : taper `node` seul pour tester une expression.",
      "Installer une dépendance : `npm install <paquet>` ; exécutable local : `npx <commande>`.",
    ],
    editors: [
      "VS Code : support Node.js intégré, débogage via `launch.json` sans extension.",
      "Extensions utiles : ESLint, Prettier.",
      "Alternatives : WebStorm (débogueur Node avancé), Zed (léger).",
    ],
  },
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
    learning: LEARNING_CULTURE_INFO,
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
    howItWorksTitle: "De la pensée au programme",
    howItWorks: ["IDÉE", "ALGORITHME", "CODE", "COMPILATION", "EXÉCUTION", "RÉSULTAT"],
    example: {
      title: "Afficher une page web",
      steps: [
        "Clic sur un lien dans le navigateur",
        "Requête réseau vers un serveur distant",
        "Le serveur exécute un programme",
        "Réponse HTML reçue par le navigateur",
        "Interprétation et affichage à l'écran",
      ],
    },
    projectsDetailed: [
      {
        title: "Cartographier le trajet d'un clic",
        flow: "Clic → Réseau → Serveur → Programme → HTML → Écran",
      },
      {
        title: "Expliquer la machine à un débutant",
        flow: "Binaire → Processeur → OS → Programme → Application",
      },
      {
        title: "Installer Linux sur une machine virtuelle",
        flow: "Image ISO → VirtualBox → Installation → Terminal → Premier script",
      },
    ],
  },

  // ------------------------------------------------------------ algorithms
  algorithms: {
    learning: LEARNING_ALGORITHMS,
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
    howItWorksTitle: "Le cycle de résolution d'un problème",
    howItWorks: ["PROBLÈME", "DÉCOMPOSITION", "PSEUDOCODE", "IMPLÉMENTATION", "TEST", "ANALYSE"],
    example: {
      title: "Trier une liste de contacts",
      steps: [
        "Données en entrée : 10 000 noms",
        "Choisir un algorithme de tri adapté",
        "Comparer et échanger les éléments",
        "Vérifier que l'ordre final est correct",
        "Mesurer le temps d'exécution",
        "Comparer avec un autre algorithme",
      ],
    },
    projectsDetailed: [
      {
        title: "Implémenter deux tris et les comparer",
        flow: "Tri à bulles → Benchmark → Tri rapide → Comparaison O(n²) vs O(n log n)",
      },
      {
        title: "Résoudre 20 problèmes d'algorithmique",
        flow: "Énoncé → Pseudocode → Code → Tests → Analyse de complexité",
      },
      {
        title: "Visualiser un tri pas à pas",
        flow: "Tableau → Animation des échanges → Affichage du résultat",
      },
    ],
  },

  // -------------------------------------------------------- data-structures
  "data-structures": {
    learning: LEARNING_DATA_STRUCTURES,
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
    howItWorksTitle: "Choisir la bonne structure",
    howItWorks: ["BESOIN", "OPÉRATIONS", "CANDIDATS", "COMPARAISON", "CHOIX", "IMPLÉMENTATION"],
    example: {
      title: "Un annuaire de contacts",
      steps: [
        "Besoin : retrouver un contact par son nom",
        "Table de hachage : clé nom → fiche contact",
        "Recherche en temps quasi constant",
        "Ajout et suppression directs",
        "Itération sur les valeurs pour tout afficher",
      ],
    },
    projectsDetailed: [
      {
        title: "Implémenter une table de hachage",
        flow: "Tableau → Fonction de hachage → Gestion des collisions → Tests",
      },
      {
        title: "File d'attente d'imprimante",
        flow: "Requêtes → File FIFO → Traitement → Résultat",
      },
      {
        title: "Modéliser un réseau social en graphe",
        flow: "Utilisateurs → Nœuds → Amitiés → Arêtes → Parcours",
      },
    ],
  },

  // ------------------------------------------------------------------ bash
  bash: {
  learning: LEARNING_BASH,
  setup: {
    install: [
      "Natif à Linux et macOS : rien à installer.",
      "Sur Windows : via WSL2 (`wsl --install`) ou Git Bash, fourni avec Git pour Windows.",
      "Vérifier : `bash --version`.",
    ],
    configure: [
      "Personnaliser l'invite dans `~/.bashrc` via la variable `PS1`.",
      "Centraliser alias et fonctions dans `~/.bash_aliases` ou `~/.bashrc`.",
      "Recharger la configuration : `source ~/.bashrc`.",
    ],
    workflow: [
      "Rendre un script exécutable : `chmod +x script.sh`, puis `./script.sh`.",
      "Enchaîner les commandes : pipes `|`, redirections `>`, `>>`, opérateurs `&&` et `||`.",
      "Déboguer : `bash -x script.sh` ou `set -x` en début de script.",
    ],
    editors: [
      "VS Code : extensions Bash IDE et ShellCheck (diagnostics en direct).",
      "Valider avant d'exécuter : `shellcheck script.sh`.",
      "Alternative : Vim, avec coloration syntaxique shell intégrée.",
    ],
  },
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
    howItWorksTitle: "Le cycle d'un script Bash",
    howItWorks: ["COMMANDE", "PIPE", "SCRIPT", "VARIABLES", "BOUCLE", "AUTOMATISATION"],
    example: {
      title: "Nettoyer un dossier de téléchargements",
      steps: [
        "Lister les fichiers avec ls",
        "Filtrer par extension avec grep",
        "Déplacer chaque fichier avec une boucle for",
        "Écrire le tout dans un script .sh",
        "Planifier l'exécution avec cron",
      ],
    },
    projectsDetailed: [
      {
        title: "Script de sauvegarde quotidienne",
        flow: "Dossier → Archive tar → Compression → Copie distante",
      },
      {
        title: "Renommage en masse de fichiers",
        flow: "Fichiers → Boucle → Expression régulière → Nouveau nom",
      },
      {
        title: "Script de déploiement",
        flow: "Git pull → Build → Copie → Redémarrage → Vérification",
      },
    ],
  },

  // --------------------------------------------------------------- networks
  networks: {
    learning: LEARNING_NETWORKS,
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
    howItWorksTitle: "Le voyage d'un paquet",
    howItWorks: ["APPLICATION", "TCP", "IP", "ROUTEURS", "SERVEUR", "RÉPONSE"],
    example: {
      title: "Ouvrir un site web",
      steps: [
        "Saisie de l'URL dans le navigateur",
        "Résolution DNS : nom → adresse IP",
        "Connexion TCP sur le port 443",
        "Requête HTTPS chiffrée",
        "Paquets routés à travers internet",
        "Page reçue, déchiffrée et affichée",
      ],
    },
    projectsDetailed: [
      {
        title: "Analyser du trafic avec Wireshark",
        flow: "Capture → Filtres → Paquets TCP → Requêtes DNS",
      },
      {
        title: "Configurer un réseau local",
        flow: "Routeur → DHCP → Adresses IP → Test ping",
      },
      {
        title: "Diagnostiquer une panne réseau",
        flow: "ping → traceroute → Vérification DNS → Test des ports",
      },
    ],
  },

  // -------------------------------------------------------------- databases
  databases: {
    learning: LEARNING_DATABASES,
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
    howItWorksTitle: "De la question à la donnée",
    howItWorks: ["REQUÊTE", "PARSER", "PLAN", "INDEX", "STOCKAGE", "RÉSULTAT"],
    example: {
      title: "Lister les commandes d'un client",
      steps: [
        "Requête SQL avec jointure clients/commandes",
        "Le moteur choisit un plan via les index",
        "Lecture des pages de données sur disque",
        "Filtrage, tri et agrégation",
        "Résultat retourné à l'application",
      ],
    },
    projectsDetailed: [
      {
        title: "Modéliser une base e-commerce",
        flow: "Entités → Relations → Schéma SQL → Contraintes d'intégrité",
      },
      {
        title: "Comparer SQL et NoSQL sur un cas concret",
        flow: "Même besoin → Deux modèles → Requêtes → Benchmark",
      },
      {
        title: "Sauvegarde automatisée",
        flow: "Dump → Compression → Stockage distant → Test de restauration",
      },
    ],
  },

  // ------------------------------------------------------------------ html
  html: {
    learning: LEARNING_HTML,
  setup: {
    install: [
      "Natif au navigateur : rien à installer.",
      "Un navigateur récent suffit : Chrome, Firefox ou Edge.",
    ],
    configure: [
      "Pas de configuration : un fichier `index.html` s'ouvre directement dans le navigateur.",
      "Structurer le projet : un dossier par projet, assets dans `assets/`.",
    ],
    workflow: [
      "Écrire une structure sémantique : `header`, `main`, `section`, `footer`.",
      "Inspecter et ajuster : outils de développement (F12), onglet Éléments.",
      "Accessibilité : attributs `alt`, hiérarchie des titres `h1` → `h2`, labels sur les formulaires.",
    ],
    editors: [
      "VS Code : coloration et Emmet intégrés (`!` + Tab génère le squelette).",
      "Extensions utiles : Live Server (rechargement auto), HTMLHint.",
      "Alternative : WebStorm.",
    ],
  },
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
    howItWorksTitle: "Du document à la page",
    howItWorks: ["BALISE", "STRUCTURE", "SÉMANTIQUE", "FORMULAIRE", "MÉDIAS", "ACCESSIBILITÉ"],
    example: {
      title: "Une page d'article de blog",
      steps: [
        "En-tête avec navigation sémantique",
        "Article avec titres hiérarchisés",
        "Images avec texte alternatif",
        "Formulaire de commentaire labellisé",
        "Pied de page avec informations",
      ],
    },
    projectsDetailed: [
      {
        title: "Page personnelle sémantique",
        flow: "Structure → Sections → Liens → Validation W3C",
      },
      {
        title: "Formulaire accessible complet",
        flow: "Champs → Labels → Validation native → Messages d'erreur",
      },
      {
        title: "Recette de cuisine en HTML",
        flow: "Article → Listes d'ingrédients → Tableau nutritionnel",
      },
    ],
  },

  // ------------------------------------------------------------------- css
  css: {
    learning: LEARNING_CSS,
  setup: {
    install: [
      "Natif au navigateur : rien à installer.",
      "Se lie au HTML via `<link rel=\"stylesheet\" href=\"style.css\">`.",
    ],
    configure: [
      "Organiser les styles : `styles/` avec `base.css`, `layout.css`, `components.css` — ou un seul `style.css` pour débuter.",
      "Centraliser couleurs et espacements dans des variables CSS (`:root`).",
    ],
    workflow: [
      "Ajuster en direct : F12, onglet Styles, puis reporter dans le fichier.",
      "Mobile-first : écrire le mobile d'abord, `@media (min-width: ...)` ensuite.",
      "Éviter `!important` : comprendre la spécificité à la place.",
    ],
    editors: [
      "VS Code : IntelliSense CSS intégré.",
      "Extensions : CSS Peek (aller à la définition), Tailwind CSS IntelliSense si utilisé.",
      "Alternative : WebStorm.",
    ],
  },
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
    howItWorksTitle: "De la règle au rendu",
    howItWorks: ["SÉLECTEUR", "CASCADE", "BOX MODEL", "LAYOUT", "RESPONSIVE", "RENDU"],
    example: {
      title: "Styler une carte produit",
      steps: [
        "Sélectionner la carte par sa classe",
        "Définir le box model : padding, bordure",
        "Centrer le contenu verticalement",
        "Ajouter un état hover distinct",
        "Adapter la carte en mobile via media query",
      ],
    },
    projectsDetailed: [
      {
        title: "Reproduire une maquette",
        flow: "Maquette → Structure HTML → Styles → Ajustements pixel-perfect",
      },
      {
        title: "Design system miniature",
        flow: "Variables → Boutons → Cartes → Documentation",
      },
      {
        title: "Thème clair/sombre",
        flow: "Custom properties → Bascule → Transitions douces",
      },
    ],
  },

  // -------------------------------------------------------------- async-js
  "async-js": {
    learning: LEARNING_ASYNC_JS,
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
    howItWorksTitle: "Le cycle de l'event loop",
    howItWorks: ["CALL STACK", "TÂCHE", "FILE D'ATTENTE", "PROMESSE", "RÉSOLUTION", "CALLBACK"],
    example: {
      title: "Charger un profil utilisateur",
      steps: [
        "Clic sur le bouton de chargement",
        "fetch() retourne une promesse",
        "Le programme continue sans bloquer",
        "La réponse arrive : la promesse se résout",
        "Le .then() s'exécute avec les données",
        "Le profil s'affiche dans la page",
      ],
    },
    projectsDetailed: [
      {
        title: "Client API avec retry",
        flow: "Requête → Échec → Attente → Nouvelle tentative → Succès",
      },
      {
        title: "Chargement parallèle de ressources",
        flow: "3 promesses → Promise.all → Rendu combiné",
      },
      {
        title: "File de tâches séquentielles",
        flow: "Liste → async/await → Barre de progression → Résultat",
      },
    ],
  },

  // -------------------------------------------------------------- fetch-api
  "fetch-api": {
    learning: LEARNING_FETCH_API,
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
    howItWorksTitle: "Le cycle d'un appel API",
    howItWorks: ["REQUÊTE", "HEADERS", "ENVOI", "RÉPONSE", "JSON", "ERREUR"],
    example: {
      title: "Afficher la météo d'une ville",
      steps: [
        "Saisie du nom de la ville",
        "GET vers l'API météo avec la clé",
        "Réponse 200 avec le JSON",
        "Extraction de la température et de l'icône",
        "Affichage dans l'interface",
        "Message d'erreur si la ville est inconnue",
      ],
    },
    projectsDetailed: [
      {
        title: "Dashboard météo",
        flow: "Champ de recherche → API → Cartes → Rafraîchissement auto",
      },
      {
        title: "Client GitHub API paginé",
        flow: "Requête → Pagination → Liste des dépôts → Détails",
      },
      {
        title: "Formulaire avec envoi JSON",
        flow: "Champs → POST → Validation serveur → Confirmation",
      },
    ],
  },

  // ------------------------------------------------------------------- dom
  dom: {
    learning: LEARNING_DOM,
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
    howItWorksTitle: "De l'événement à la mise à jour",
    howItWorks: ["SÉLECTION", "ÉCOUTE", "ÉVÉNEMENT", "LECTURE", "MODIFICATION", "RENDU"],
    example: {
      title: "Un compteur de clics",
      steps: [
        "Sélectionner le bouton et l'affichage",
        "Écouter l'événement click",
        "Incrémenter la valeur au clic",
        "Mettre à jour le texte du compteur",
        "Le navigateur repeint la page",
      ],
    },
    projectsDetailed: [
      {
        title: "Liste de tâches interactive",
        flow: "Champ → Ajout → Suppression → Sauvegarde locale",
      },
      {
        title: "Galerie avec lightbox",
        flow: "Miniatures → Clic → Overlay → Navigation clavier",
      },
      {
        title: "Drag & drop natif",
        flow: "Événements souris → Position → Dépôt → Réorganisation",
      },
    ],
  },

  // ------------------------------------------------------------------- npm
  npm: {
  learning: LEARNING_NPM,
  setup: {
    install: [
      "Fourni avec Node.js : rien à installer séparément.",
      "Mettre à jour npm lui-même : `npm install -g npm`.",
      "Vérifier : `npm -v`.",
    ],
    configure: [
      "Initialiser : `npm init -y` (crée `package.json`).",
      "Déclarer les scripts dans `package.json` : `dev`, `build`, `test`, `lint`.",
      "Réglages avancés (registre, préfixe global) dans `.npmrc`.",
    ],
    workflow: [
      "Installer : `npm install` ; ajouter : `npm install <paquet>` ; dev : `npm install -D <paquet>`.",
      "Lancer : `npm run dev`, `npm run build`, `npm test`.",
      "Maintenir : `npm audit` pour les vulnérabilités, `npm update` pour les mises à jour.",
    ],
    editors: [
      "VS Code : vue NPM Scripts intégrée à l'explorateur pour lancer les scripts.",
      "Extension npm Intellisense (autocomplétion des modules dans `import`).",
    ],
  },
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
    howItWorksTitle: "Le cycle de vie d'une dépendance",
    howItWorks: ["RECHERCHE", "INSTALL", "LOCKFILE", "SCRIPTS", "BUILD", "PUBLISH"],
    example: {
      title: "Ajouter une librairie de dates",
      steps: [
        "Recherche du paquet sur le registre npm",
        "npm install date-fns",
        "Version exacte figée dans package-lock.json",
        "Import dans le code source",
        "Le script de build l'inclut dans le bundle",
        "Mise à jour contrôlée selon semver",
      ],
    },
    projectsDetailed: [
      {
        title: "Publier un package",
        flow: "Code → package.json → npm publish → Installation de test",
      },
      {
        title: "Auditer les dépendances d'un projet",
        flow: "npm audit → Vulnérabilités → Mises à jour → Tests",
      },
      {
        title: "Automatiser avec des scripts",
        flow: "dev → build → test → lint → prepublish",
      },
    ],
  },

  // ------------------------------------------------------------------ vite
  vite: {
  learning: LEARNING_VITE,
  setup: {
    install: [
      "Créer un projet : `npm create vite@latest mon-app`.",
      "Choisir le template (vanilla, react, vue…), puis `cd mon-app && npm install`.",
      "Démarrer : `npm run dev`.",
    ],
    configure: [
      "Fichier `vite.config.ts` : plugins, alias `@` vers `src`, proxy API (`server.proxy`).",
      "Variables d'environnement : préfixe `VITE_`, fichier `.env`.",
    ],
    workflow: [
      "Développement : `npm run dev` (démarrage instantané, HMR).",
      "Production : `npm run build` → dossier `dist/`, puis `npm run preview` pour vérifier.",
    ],
    editors: [
      "VS Code : aucun plugin requis, tout passe par le terminal.",
      "Extensions utiles selon le template : ESLint, Prettier.",
      "Alternatives : WebStorm, Zed.",
    ],
  },
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
    howItWorksTitle: "Du fichier au navigateur",
    howItWorks: ["SOURCE", "DEV SERVER", "ESM", "HMR", "BUILD", "BUNDLE"],
    example: {
      title: "Démarrer un projet React",
      steps: [
        "npm create vite@latest",
        "Le dev server démarre en millisecondes",
        "Les modules sont servis à la demande",
        "Chaque modification s'applique sans recharger (HMR)",
        "npm run build produit le bundle final",
        "Fichiers minifiés prêts à déployer",
      ],
    },
    projectsDetailed: [
      {
        title: "Scaffolder un projet React + Vite",
        flow: "Template → Composants → HMR → Build de production",
      },
      {
        title: "Écrire un plugin Vite",
        flow: "Hook → Transformation → Test → Publication",
      },
      {
        title: "Migrer un projet depuis un bundler lent",
        flow: "Config → Plugins équivalents → Build → Comparaison des temps",
      },
    ],
  },

  // ---------------------------------------------------------------- nextjs
  nextjs: {
  learning: LEARNING_NEXTJS,
  setup: {
    install: [
      "Créer l'app : `npx create-next-app@latest mon-app` (choisir TypeScript et App Router).",
      "Démarrer : `npm run dev`.",
    ],
    configure: [
      "Fichier `next.config.ts` pour les options du framework.",
      "Routes : dossiers dans `app/` — `page.tsx` pour une page, `layout.tsx` pour un layout.",
      "Secrets et URLs : `.env.local` (jamais commité).",
    ],
    workflow: [
      "`npm run dev`, `npm run build`, `npm start` en production.",
      "Server Components par défaut ; `\"use client\"` en haut du fichier pour l'interactivité.",
      "Données : `fetch` côté serveur avec cache et revalidation.",
    ],
    editors: [
      "VS Code : support TSX intégré.",
      "Extensions : ESLint (la config Next.js est incluse à la création), Prettier.",
      "Alternative : WebStorm.",
    ],
  },
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
    howItWorksTitle: "De la route au rendu",
    howItWorks: ["ROUTE", "SERVER", "RENDU", "HYDRATATION", "NAVIGATION", "CACHE"],
    example: {
      title: "Une page de blog",
      steps: [
        "Visite de /blog/mon-article",
        "Le serveur génère le HTML",
        "La page s'affiche immédiatement",
        "Hydratation : React prend le relais",
        "La navigation suivante est instantanée",
        "Le contenu est mis en cache",
      ],
    },
    projectsDetailed: [
      {
        title: "Blog avec génération statique",
        flow: "Markdown → Pages statiques → Build → Déploiement",
      },
      {
        title: "E-commerce avec panier",
        flow: "Catalogue → Panier → Checkout → API routes",
      },
      {
        title: "Dashboard authentifié",
        flow: "Middleware → Session → Server Components → Données",
      },
    ],
  },

  // --------------------------------------------------------------- tailwind
  tailwind: {
  learning: LEARNING_TAILWIND,
  setup: {
    install: [
      "Via Vite : `npm install -D tailwindcss @tailwindcss/vite`, puis ajouter le plugin dans `vite.config.ts`.",
      "Avec Next.js : option proposée directement par `create-next-app`.",
    ],
    configure: [
      "CSS d'entrée : `@import \"tailwindcss\";` dans `src/index.css` (Tailwind v4).",
      "Thème : bloc `@theme` dans le CSS pour couleurs et polices personnalisées.",
      "Contenu scanné automatiquement en v4 : rien à déclarer.",
    ],
    workflow: [
      "Classes utilitaires dans le JSX : `flex`, `gap-4`, `md:grid-cols-2`.",
      "Responsive : préfixes `sm:`, `md:`, `lg:` sur les mêmes classes.",
      "Ne pas construire de noms de classes par concaténation : ils ne seraient pas détectés.",
    ],
    editors: [
      "VS Code : extension Tailwind CSS IntelliSense (autocomplétion officielle).",
      "Alternative : WebStorm, avec support Tailwind natif.",
    ],
  },
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
    howItWorksTitle: "De la classe au style",
    howItWorks: ["CLASSE", "UTILITAIRE", "VARIANTE", "JIT", "CSS FINAL", "DESIGN"],
    example: {
      title: "Une carte responsive",
      steps: [
        "Structure HTML sémantique",
        "Classes flex, gap, p-6 pour la mise en forme",
        "Variante md: pour l'affichage desktop",
        "Variante dark: pour le mode sombre",
        "Le moteur JIT génère le CSS minimal",
        "Carte cohérente sur tous les écrans",
      ],
    },
    projectsDetailed: [
      {
        title: "Landing page complète",
        flow: "Maquette → Sections → Responsive → Dark mode",
      },
      {
        title: "Design system avec Tailwind",
        flow: "Config → Design tokens → Composants → Documentation",
      },
      {
        title: "Refonte d'un CSS spaghetti",
        flow: "Audit → Utilitaires → Suppression du CSS mort",
      },
    ],
  },

  // --------------------------------------------------------------- testing
  testing: {
    learning: LEARNING_TESTING,
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
    howItWorksTitle: "Le cycle du test",
    howItWorks: ["CAS", "ARRANGE", "ACT", "ASSERT", "MOCK", "CI"],
    example: {
      title: "Tester un calcul de panier",
      steps: [
        "Définir le cas : panier avec 3 articles",
        "Préparer les données de test",
        "Appeler calculerTotal()",
        "Vérifier le résultat attendu",
        "Simuler l'API de prix avec un mock",
        "Le test tourne à chaque commit en CI",
      ],
    },
    projectsDetailed: [
      {
        title: "Suite de tests pour une app existante",
        flow: "Unitaires → Intégration → E2E → Mesure du coverage",
      },
      {
        title: "Développer un module en TDD",
        flow: "Test rouge → Code minimal → Test vert → Refactor",
      },
      {
        title: "Pipeline CI avec tests E2E",
        flow: "Push → Tests → Build → Déploiement",
      },
    ],
  },

  // ---------------------------------------------------------------- github
  github: {
  learning: LEARNING_GITHUB,
  setup: {
    install: [
      "Installer Git : `git --version` pour vérifier (git-scm.com si absent).",
      "Créer un compte sur github.com.",
      "Installer la CLI officielle : `gh` (via `winget`, `brew` ou apt), puis `gh auth login`.",
    ],
    configure: [
      "Identité : `git config --global user.name \"Nom\"` et `git config --global user.email \"email\"`.",
      "Clé SSH : `ssh-keygen -t ed25519`, puis ajouter la clé publique dans GitHub → Settings → SSH keys.",
      "Fichier `.gitignore` : `node_modules/`, `.env`, `dist/` dès le premier commit.",
    ],
    workflow: [
      "Cloner : `gh repo clone user/repo` ou `git clone <url>`.",
      "Branche de travail : `git checkout -b feature/x`, puis `git add`, `git commit -m`, `git push -u origin feature/x`.",
      "Ouvrir la pull request : `gh pr create`, la suivre : `gh pr status`.",
    ],
    editors: [
      "VS Code : extensions « GitHub Pull Requests » (GitHub) et GitLens pour l'historique.",
      "Alternative : GitHub Desktop (interface graphique officielle).",
    ],
  },
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
    howItWorksTitle: "Le cycle d'une contribution",
    howItWorks: ["FORK", "BRANCHE", "COMMITS", "PULL REQUEST", "REVIEW", "MERGE"],
    example: {
      title: "Corriger un bug en open source",
      steps: [
        "Fork du dépôt sur son compte",
        "Création de la branche fix/typo-bouton",
        "Commit de la correction",
        "Pull request avec description claire",
        "Discussion et review du mainteneur",
        "Fusion dans la branche principale",
      ],
    },
    projectsDetailed: [
      {
        title: "Contribuer à l'open source",
        flow: "Issue → Fork → Pull request → Review → Merge",
      },
      {
        title: "Gérer un projet en équipe",
        flow: "Issues → Branches → Pull requests → Releases",
      },
      {
        title: "Soigner son profil GitHub",
        flow: "README → Projets épinglés → Contributions → Pages",
      },
    ],
  },

  // --------------------------------------------------------------- postman
  postman: {
  learning: LEARNING_POSTMAN,
  setup: {
    install: [
      "Télécharger Postman depuis postman.com, ou `brew install --cask postman` sur macOS.",
      "Créer un compte (gratuit) pour synchroniser collections et environnements.",
    ],
    configure: [
      "Créer un environnement : variables `{{baseUrl}}`, `{{token}}` pour basculer local/prod.",
      "Organiser les requêtes en collections, une par API.",
      "Exporter en JSON (`collection.json`) pour versionner ou partager.",
    ],
    workflow: [
      "Construire une requête GET/POST, envoyer, inspecter statut et JSON de réponse.",
      "Ajouter des assertions dans l'onglet Tests : `pm.test(\"statut 200\", () => pm.response.to.have.status(200));`.",
      "Enchaîner avec le Collection Runner ; en CI : `npm install -g newman` puis `newman run collection.json`.",
    ],
    editors: [
      "Postman est sa propre application ; alternative légère dans VS Code : extensions « Thunder Client » ou « REST Client ».",
      "Autres outils réels : Insomnia, Bruno (open source).",
    ],
  },
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
    howItWorksTitle: "Du brouillon à la collection testée",
    howItWorks: ["REQUÊTE", "VARIABLES", "TESTS", "COLLECTION", "RUNNER", "DOC"],
    example: {
      title: "Tester une API de connexion",
      steps: [
        "POST /login avec email et mot de passe",
        "Test : le statut doit être 200",
        "Extraction du token dans une variable",
        "Réutilisation du token sur /profile",
        "Lancement de toute la collection d'un coup",
        "Génération de la documentation",
      ],
    },
    projectsDetailed: [
      {
        title: "Collection de tests d'API",
        flow: "Endpoints → Tests automatisés → Environnements → CI",
      },
      {
        title: "Documenter une API publique",
        flow: "Collection → Exemples → Publication → Partage",
      },
      {
        title: "Mocker une API pas encore prête",
        flow: "Schéma → Serveur mock → Développement parallèle",
      },
    ],
  },

  // -------------------------------------------------------------- fullstack
  fullstack: {
  learning: LEARNING_FULLSTACK,
  setup: {
    install: [
      "Installer Node.js LTS (`nvm install --lts`) pour le backend et les outils frontend.",
      "Installer PostgreSQL (ou démarrer léger avec SQLite : `npm install sqlite3`).",
      "Créer l'API : `npm init -y` puis `npm install express` et `npm install dotenv`.",
    ],
    configure: [
      "Fichier `.env` (jamais commité) : `DATABASE_URL`, `PORT`, clés secrètes — chargé via `dotenv`.",
      "`package.json` : scripts `\"dev\": \"node --watch server.js\"` et `\"start\": \"node server.js\"`.",
      "CORS côté API pour autoriser le frontend local (`http://localhost:5173`).",
    ],
    workflow: [
      "Lancer l'API : `npm run dev`, puis tester les routes avec Postman ou `curl`.",
      "Créer le frontend (Vite, Next.js…), brancher les appels via `fetch('/api/...')`.",
      "Itérer : endpoint → test manuel → composant frontend → vérification navigateur.",
    ],
    editors: [
      "VS Code : extensions ESLint, Prettier, et « Thunder Client » ou « REST Client » pour tester l'API sans quitter l'éditeur.",
      "Alternative : WebStorm, avec client HTTP intégré.",
    ],
  },
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
    howItWorksTitle: "De l'idée au produit en ligne",
    howItWorks: ["MODÈLE", "API", "FRONTEND", "AUTH", "DÉPLOIEMENT", "MONITORING"],
    example: {
      title: "Une app de notes partagées",
      steps: [
        "Schéma : utilisateurs, notes, partages",
        "API REST : CRUD + authentification",
        "Frontend : éditeur et liste des notes",
        "Connexion via tokens",
        "Déploiement du frontend et du backend",
        "Logs et suivi d'erreurs en production",
      ],
    },
    projectsDetailed: [
      {
        title: "SaaS complet de A à Z",
        flow: "Modèle → API → Interface → Auth → Paiement → Déploiement",
      },
      {
        title: "App temps réel avec websockets",
        flow: "Serveur socket → Rooms → Frontend réactif → Tests",
      },
      {
        title: "Clone simplifié d'un service connu",
        flow: "Maquette → API → Frontend → Mise en ligne",
      },
    ],
  },

  // ---------------------------------------------------------- accessibility
  accessibility: {
    learning: LEARNING_ACCESSIBILITY,
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
    howItWorksTitle: "Le parcours d'un utilisateur au clavier",
    howItWorks: ["TAB", "FOCUS", "LECTURE", "ACTION", "FEEDBACK", "VALIDATION"],
    example: {
      title: "Remplir un formulaire au clavier",
      steps: [
        "Tabulation jusqu'au premier champ",
        "L'indicateur de focus est visible",
        "Le lecteur d'écran annonce le label",
        "Saisie puis validation avec Entrée",
        "Les erreurs sont annoncées clairement",
        "Confirmation de la soumission",
      ],
    },
    projectsDetailed: [
      {
        title: "Auditer un site existant",
        flow: "Lighthouse → Navigation clavier → Lecteur d'écran → Corrections",
      },
      {
        title: "Construire un composant 100% accessible",
        flow: "Sémantique → ARIA → Gestion du focus → Tests",
      },
      {
        title: "Checklist d'accessibilité d'équipe",
        flow: "Critères WCAG → Revue de code → CI → Documentation",
      },
    ],
  },

  // ============================================================ TIER 3
  // Définitions : definition + whyLearn uniquement.

  // ------------------------------------------------------------ responsive
  responsive: {
    learning: LEARNING_RESPONSIVE,
    definition:
      "Le responsive design adapte une interface à toutes les tailles d'écran : du mobile 360 px à l'écran 4K, via media queries, unités fluides et approche mobile-first.",
    whyLearn:
      "Plus de la moitié du trafic web est mobile. Une interface qui casse sur petit écran perd ses utilisateurs : le responsive n'est plus une option, c'est la façon standard de construire.",
    conceptDetails: [
      {
        name: "Media queries",
        definition: "Des règles CSS qui s'appliquent selon la largeur de l'écran, l'orientation ou la densité de pixels.",
      },
      {
        name: "Mobile-first",
        definition: "Concevoir d'abord pour le petit écran, puis enrichir pour les grands : la contrainte force la clarté.",
      },
      {
        name: "Unités fluides",
        definition: "%, vw, rem, clamp() : des dimensions qui s'adaptent au contexte au lieu de pixels fixes.",
      },
      {
        name: "Breakpoints",
        definition: "Les largeurs seuils où la mise en page change : à choisir selon le contenu, pas selon l'appareil.",
      },
      {
        name: "Images responsives",
        definition: "srcset et sizes : servir la bonne taille d'image selon l'écran pour ne pas gaspiller de bande passante.",
      },
      {
        name: "Viewport",
        definition: "La meta viewport indique au navigateur mobile la largeur réelle à utiliser : sans elle, le site s'affiche zoomé.",
      },
    ],
    howItWorksTitle: "Le cycle d'adaptation d'une page",
    howItWorks: ["MOBILE", "FLUIDE", "BREAKPOINT", "GRILLE", "IMAGES", "TEST"],
    example: {
      title: "Une landing page mobile-first",
      steps: [
        "Maquette mobile 360 px en colonne unique",
        "Contenu fluide qui remplit la largeur",
        "Breakpoint 768 px : passage à deux colonnes",
        "Breakpoint 1024 px : grille complète",
        "Images adaptées via srcset",
        "Test sur trois tailles d'écran réelles",
      ],
    },
    projectsDetailed: [
      {
        title: "Rendre un site existant responsive",
        flow: "Audit → Meta viewport → Media queries → Tests multi-écrans",
      },
      {
        title: "Maquette mobile-first complète",
        flow: "Mobile → Breakpoints → Desktop → Polissage",
      },
      {
        title: "Grille d'images adaptative",
        flow: "srcset → Lazy loading → Layout fluide",
      },
    ],
  },

  // --------------------------------------------------------------- flexbox
  flexbox: {
    learning: LEARNING_FLEXBOX,
    definition:
      "Flexbox est le module CSS de mise en page unidimensionnel : il aligne, distribue et ordonne des éléments le long d'un axe, avec un contrôle fin de l'alignement et de l'espace.",
    whyLearn:
      "C'est l'outil quotidien du layout : barres de navigation, cartes, centrages verticaux. Quelques propriétés suffisent à résoudre la grande majorité des problèmes d'alignement.",
    conceptDetails: [
      {
        name: "Axes",
        definition: "L'axe principal et l'axe transversal : toute la logique Flexbox part de là, selon flex-direction.",
      },
      {
        name: "Alignement",
        definition: "align-items et justify-content placent les éléments sur les deux axes : le centrage vertical devient trivial.",
      },
      {
        name: "Distribution",
        definition: "Répartir l'espace libre entre les éléments : space-between, space-around, espacements réguliers.",
      },
      {
        name: "Ordre",
        definition: "order modifie l'ordre visuel sans toucher au HTML : pratique, mais à manier avec prudence pour l'accessibilité.",
      },
      {
        name: "Wrap",
        definition: "flex-wrap autorise le passage à la ligne : la base des grilles flexibles.",
      },
      {
        name: "Flex sizing",
        definition: "flex-grow, flex-shrink, flex-basis : comment chaque élément grandit, rétrécit et définit sa taille de départ.",
      },
    ],
    howItWorksTitle: "De l'axe au centrage",
    howItWorks: ["CONTAINER", "AXE", "DIRECTION", "ALIGNEMENT", "ESPACE", "CENTRAGE"],
    example: {
      title: "Une barre de navigation",
      steps: [
        "Conteneur en display: flex",
        "Logo à gauche, liens à droite",
        "justify-content: space-between",
        "Alignement vertical avec align-items: center",
        "Passage en colonne sur mobile",
      ],
    },
    projectsDetailed: [
      {
        title: "Barre de navigation complexe",
        flow: "Logo → Liens → Bouton d'action → Version mobile",
      },
      {
        title: "Galerie flexible",
        flow: "Wrap → Espacements → Ratios d'image → Effet hover",
      },
      {
        title: "Le centrage parfait",
        flow: "Conteneur → Axes → Contenu centré horizontalement et verticalement",
      },
    ],
  },

  // -------------------------------------------------------------- css-grid
  "css-grid": {
    learning: LEARNING_CSS_GRID,
    definition:
      "CSS Grid est le système de mise en page bidimensionnel : lignes et colonnes définissent une grille où placer les éléments, pour des layouts complexes en quelques lignes.",
    whyLearn:
      "Grid excelle là où Flexbox atteint ses limites : dashboards, mises en page magazine, grilles responsives. Les deux sont complémentaires, pas concurrents.",
    conceptDetails: [
      {
        name: "Grilles",
        definition: "grid-template-columns et rows définissent la structure : des pistes fixes, flexibles (fr) ou automatiques.",
      },
      {
        name: "Zones",
        definition: "grid-template-areas nomme des régions (header, sidebar, main) : la mise en page devient lisible.",
      },
      {
        name: "Placement",
        definition: "Placer un élément sur des lignes précises : grid-column: 1 / 3, avec des chevauchements contrôlés.",
      },
      {
        name: "Grilles implicites",
        definition: "Les lignes et colonnes créées automatiquement quand le contenu dépasse la grille déclarée.",
      },
      {
        name: "Subgrid",
        definition: "Une grille imbriquée qui hérite des pistes de son parent : l'alignement parfait des cartes.",
      },
      {
        name: "Responsive",
        definition: "repeat(auto-fit, minmax(250px, 1fr)) : des grilles qui s'adaptent sans media queries.",
      },
    ],
    howItWorksTitle: "De la grille au layout",
    howItWorks: ["PISTES", "ZONES", "PLACEMENT", "GAPS", "IMPLICITE", "RESPONSIVE"],
    example: {
      title: "Un dashboard admin",
      steps: [
        "Grille de 12 colonnes",
        "Zone header sur toute la largeur",
        "Sidebar sur 3 colonnes",
        "Cartes de statistiques en auto-fit",
        "Graphiques sur 8 colonnes",
        "Réorganisation en colonne sur mobile",
      ],
    },
    projectsDetailed: [
      {
        title: "Dashboard en grille",
        flow: "Zones nommées → Placement → Version responsive",
      },
      {
        title: "Layout magazine",
        flow: "Grille → Chevauchements → Typographie éditoriale",
      },
      {
        title: "Galerie dense",
        flow: "Auto-flow → Remplissage dense → Ratios variés",
      },
    ],
  },

  // -------------------------------------------------------- css-animations
  "css-animations": {
    learning: LEARNING_CSS_ANIMATIONS,
    definition:
      "Les animations CSS (transitions et keyframes) ajoutent du mouvement aux interfaces : micro-interactions, feedbacks visuels, changements d'état fluides — sans JavaScript.",
    whyLearn:
      "L'animation guide l'attention et rend les changements d'état compréhensibles. Utilisée avec mesure, et dans le respect de prefers-reduced-motion, elle améliore réellement l'expérience.",
    conceptDetails: [
      {
        name: "Transitions",
        definition: "Animer le passage d'un état à un autre (hover, ouverture) : simple, déclaratif, performant.",
      },
      {
        name: "Keyframes",
        definition: "@keyframes décrit une séquence d'étapes : pour les animations complexes et en boucle.",
      },
      {
        name: "Easing",
        definition: "La courbe d'accélération (ease-out, cubic-bezier) : c'est elle qui rend un mouvement naturel ou mécanique.",
      },
      {
        name: "Performance",
        definition: "Animer transform et opacity uniquement : ce sont les propriétés que le GPU compose sans recalcul de layout.",
      },
      {
        name: "prefers-reduced-motion",
        definition: "La media query qui respecte les utilisateurs sensibles au mouvement : réduire ou couper les animations.",
      },
      {
        name: "Micro-interactions",
        definition: "De petits feedbacks (bouton qui réagit, toggle qui glisse) qui rendent l'interface vivante et compréhensible.",
      },
    ],
    howItWorksTitle: "Du déclencheur au mouvement",
    howItWorks: ["ÉTAT", "DÉCLENCHEUR", "TRANSITION", "EASING", "GPU", "FEEDBACK"],
    example: {
      title: "Un bouton avec feedback",
      steps: [
        "État de repos du bouton",
        "Hover : transition douce de la couleur",
        "Clic : léger scale via transform",
        "Easing ease-out pour un mouvement naturel",
        "Animation désactivée si reduced-motion",
        "Retour fluide à l'état initial",
      ],
    },
    projectsDetailed: [
      {
        title: "Bibliothèque de micro-interactions",
        flow: "Boutons → Toggles → Tooltips → Documentation",
      },
      {
        title: "Loader animé en pur CSS",
        flow: "Keyframes → Boucle infinie → Optimisation GPU",
      },
      {
        title: "Menu animé et accessible",
        flow: "Transition → Gestion du focus → prefers-reduced-motion",
      },
    ],
  },

  // ------------------------------------------------------------ js-modules
  "js-modules": {
    learning: LEARNING_JS_MODULES,
    definition:
      "Les modules ES (import/export) découpent une application JavaScript en fichiers indépendants qui déclarent explicitement leurs dépendances.",
    whyLearn:
      "C'est la base de tout projet moderne : organisation, réutilisation, tree-shaking par les bundlers. Sans modules, pas de React, pas de Vite, pas d'écosystème.",
    conceptDetails: [
      {
        name: "import/export",
        definition: "La syntaxe qui déclare ce qu'un fichier expose et ce qu'il consomme : le contrat entre modules.",
      },
      {
        name: "ES Modules",
        definition: "Le système natif du navigateur et de Node.js : statique, analysable, sans outil.",
      },
      {
        name: "Bundlers",
        definition: "Vite, webpack ou Rollup assemblent les modules en fichiers optimisés pour la production.",
      },
      {
        name: "Tree-shaking",
        definition: "Éliminer le code importé mais jamais utilisé : des bundles plus légers, automatiquement.",
      },
      {
        name: "Dépendances",
        definition: "Le graphe d'imports d'un projet : qui dépend de qui, et détecter les cycles.",
      },
      {
        name: "Barrel files",
        definition: "Des index.ts qui réexportent un dossier : des imports propres, à manier avec mesure.",
      },
    ],
    howItWorksTitle: "Du fichier au bundle",
    howItWorks: ["FICHIER", "EXPORT", "IMPORT", "GRAPHE", "BUNDLE", "TREE-SHAKING"],
    example: {
      title: "Découper une app en modules",
      steps: [
        "Repérer les responsabilités : API, UI, utilitaires",
        "Créer api.js avec ses exports",
        "Importer les fonctions dans app.js",
        "Le bundler construit le graphe de dépendances",
        "Tree-shaking du code inutilisé",
        "Un seul bundle optimisé en sortie",
      ],
    },
    projectsDetailed: [
      {
        title: "Refactorer une app en modules",
        flow: "Monolithe → Découpage → Imports explicites → Tests",
      },
      {
        title: "Publier un package npm",
        flow: "Modules → Build → package.json → Publication",
      },
      {
        title: "Nettoyer les imports d'un projet",
        flow: "Barrel files → Aliases → Suppression des cycles",
      },
    ],
  },

  // ------------------------------------------------------------------ pnpm
  pnpm: {
  learning: LEARNING_PNPM,
  setup: {
    install: [
      "Via npm : `npm install -g pnpm`.",
      "Alternative : `corepack enable` puis `corepack prepare pnpm@latest --activate`.",
      "Vérifier : `pnpm -v`.",
    ],
    configure: [
      "Mêmes `package.json` et scripts que npm : migration transparente.",
      "Le store global partagé évite les doublons : voir `pnpm store path`.",
      "Réglages dans `.npmrc`, comme npm.",
    ],
    workflow: [
      "Équivalents directs : `pnpm install`, `pnpm add <paquet>`, `pnpm add -D <paquet>`, `pnpm dev`.",
      "Monorepo : `pnpm -r <commande>` (récursif) et `pnpm --filter <paquet>`.",
    ],
    editors: [
      "VS Code : mêmes extensions que pour npm, rien de spécifique.",
      "`package.json` reste le standard : aucun fichier propre à pnpm à éditer.",
    ],
  },
    definition:
      "pnpm est un gestionnaire de paquets compatible npm, plus rapide et plus économe : un store global unique évite de dupliquer les dépendances, avec un support natif des monorepos.",
    whyLearn:
      "Des installations en quelques secondes et des node_modules propres changent le quotidien, surtout sur les gros projets et monorepos. La migration depuis npm est quasi transparente.",
    conceptDetails: [
      {
        name: "Store global",
        definition: "Un seul dossier content-adressable pour toutes les versions : fini les gigaoctets dupliqués.",
      },
      {
        name: "Monorepos",
        definition: "Plusieurs paquets dans un seul dépôt, avec des dépendances locales liées proprement.",
      },
      {
        name: "Workspaces",
        definition: "Le mécanisme pnpm-workspace.yaml qui relie les paquets d'un monorepo entre eux.",
      },
      {
        name: "Vitesse",
        definition: "Installations en quelques secondes grâce au store global et aux liens durs.",
      },
      {
        name: "Compatibilité npm",
        definition: "Mêmes commandes, même registre, même package.json : la migration est quasi transparente.",
      },
      {
        name: "Lockfile",
        definition: "pnpm-lock.yaml fige l'arbre exact des dépendances pour des installations reproductibles.",
      },
    ],
    howItWorksTitle: "De l'install au store partagé",
    howItWorks: ["INSTALL", "RÉSOLUTION", "STORE", "LIENS", "WORKSPACE", "LOCKFILE"],
    example: {
      title: "Migrer un projet npm vers pnpm",
      steps: [
        "Supprimer node_modules",
        "Importer depuis le package-lock existant",
        "pnpm install : secondes au lieu de minutes",
        "Vérifier que tous les scripts passent",
        "Commiter le pnpm-lock.yaml",
        "Mettre la CI en cache sur le store",
      ],
    },
    projectsDetailed: [
      {
        title: "Migrer un projet npm → pnpm",
        flow: "Import → Install → Tests → Mise à jour de la CI",
      },
      {
        title: "Monorepo avec workspaces",
        flow: "Dossiers → pnpm-workspace.yaml → Dépendances locales",
      },
      {
        title: "CI optimisée",
        flow: "Cache du store → Install éclair → Build → Test",
      },
    ],
  },

  // ---------------------------------------------------------------- eslint
  eslint: {
  learning: LEARNING_ESLINT,
  setup: {
    install: [
      "Installer en dépendance de dev : `npm install -D eslint`.",
      "Assistant d'initialisation : `npx eslint --init`.",
      "Ajouter les plugins du stack : `typescript-eslint`, `eslint-plugin-react`.",
    ],
    configure: [
      "Fichier `eslint.config.js` (format « flat config », standard depuis ESLint 9).",
      "Étendre `eslint:recommended` puis ajuster les règles (`rules`) au projet.",
    ],
    workflow: [
      "Vérifier : `npx eslint .` ; corriger automatiquement : `npx eslint . --fix`.",
      "Script npm : `\"lint\": \"eslint .\"`.",
      "Faire échouer la CI si le lint échoue.",
    ],
    editors: [
      "VS Code : extension ESLint (soulignage en direct, correction à l'enregistrement).",
      "Activer la correction au save via `editor.codeActionsOnSave`.",
    ],
  },
    definition:
      "ESLint analyse statiquement le code JavaScript/TypeScript : il détecte les erreurs probables, les mauvaises pratiques et impose un style cohérent en équipe.",
    whyLearn:
      "Il attrape les bugs avant l'exécution et met fin aux débats de style. Intégré à l'éditeur et à la CI, c'est un filet de sécurité permanent.",
    conceptDetails: [
      {
        name: "Règles",
        definition: "Chaque règle détecte un problème précis : variable inutilisée, comparaison dangereuse, import manquant.",
      },
      {
        name: "Configs",
        definition: "Des ensembles prêts à l'emploi (recommended, TypeScript, React) : une base solide en quelques lignes.",
      },
      {
        name: "Plugins",
        definition: "Des règles spécialisées par écosystème : React Hooks, imports, accessibilité.",
      },
      {
        name: "Flat config",
        definition: "Le format moderne eslint.config.js : explicite, composable, sans héritage magique.",
      },
      {
        name: "CI",
        definition: "Faire échouer le pipeline sur une erreur de lint : la qualité devient non négociable.",
      },
      {
        name: "Autofix",
        definition: "--fix corrige automatiquement ce qui est sûr : le linter répare, pas seulement signale.",
      },
    ],
    howItWorksTitle: "Du code au verdict",
    howItWorks: ["FICHIER", "PARSE", "RÈGLES", "DIAGNOSTIC", "AUTOFIX", "CI"],
    example: {
      title: "Attraper un bug avant l'exécution",
      steps: [
        "Écriture d'un useEffect sans tableau de dépendances",
        "ESLint signale la règle exhaustive-deps",
        "Le message explique le risque concret",
        "Correction manuelle ou via --fix",
        "Le hook se comporte correctement",
        "La CI bloque les futures régressions",
      ],
    },
    projectsDetailed: [
      {
        title: "Configurer ESLint sur un projet",
        flow: "Flat config → Plugins → Règles d'équipe → Intégration IDE",
      },
      {
        title: "Créer une règle custom",
        flow: "AST → Visiteur → Tests → Plugin interne",
      },
      {
        title: "Durcir une CI existante",
        flow: "Lint → Erreurs bloquantes → Rapports lisibles",
      },
    ],
  },

  // --------------------------------------------------------------- prettier
  prettier: {
  learning: LEARNING_PRETTIER,
  setup: {
    install: [
      "Installer en dépendance de dev : `npm install -D prettier`.",
      "Vérifier : `npx prettier --version`.",
      "Aucune installation globale nécessaire : on l'appelle via `npx`.",
    ],
    configure: [
      "Fichier `.prettierrc` (ou clé `\"prettier\"` dans `package.json`) : `semi`, `singleQuote`, `printWidth`.",
      "Exclure via `.prettierignore` : `dist/`, `*.min.js`, fichiers générés.",
      "Éviter les conflits avec ESLint : ajouter `eslint-config-prettier`.",
    ],
    workflow: [
      "Formater : `npx prettier --write .` ; contrôler sans modifier : `npx prettier --check .`.",
      "Script npm : `\"format\": \"prettier --write .\"`.",
      "Ne jamais débattre du style en revue : Prettier tranche.",
    ],
    editors: [
      "VS Code : extension Prettier - Code formatter.",
      "La définir comme formateur par défaut (`editor.defaultFormatter`) avec `formatOnSave`.",
    ],
  },
    definition:
      "Prettier est un formateur de code : il réécrit automatiquement le code selon des règles fixes — indentation, guillemets, points-virgules — à chaque sauvegarde.",
    whyLearn:
      "Fini les débats sur les espaces en code review : le style est uniforme et automatique. Combiné à ESLint, il couvre la forme pendant qu'ESLint couvre le fond.",
    conceptDetails: [
      {
        name: "Formatage",
        definition: "Indentation, guillemets, virgules : Prettier réécrit le code de façon déterministe.",
      },
      {
        name: "Config",
        definition: "Quelques options (.prettierrc) : largeur de ligne, point-virgules. Le reste n'est pas négociable, c'est le principe.",
      },
      {
        name: "Hooks pre-commit",
        definition: "lint-staged + husky : formater uniquement les fichiers modifiés avant chaque commit.",
      },
      {
        name: "Intégration IDE",
        definition: "Format on save : le code se range tout seul pendant qu'on écrit.",
      },
      {
        name: "ESLint",
        definition: "ESLint couvre les erreurs, Prettier la forme : les deux se complètent sans se marcher dessus.",
      },
      {
        name: "CI",
        definition: "Un check --check en CI garantit que tout le code commité est bien formaté.",
      },
    ],
    howItWorksTitle: "Du code brut au code formaté",
    howItWorks: ["ÉDITION", "SAVE", "PARSE", "RÉÉCRITURE", "COMMIT", "CI"],
    example: {
      title: "Mettre fin à un débat de style",
      steps: [
        "Deux développeurs, deux styles d'indentation",
        "Prettier configuré une seule fois",
        "Format on save activé dans l'éditeur",
        "Le code devient uniforme partout",
        "Les reviews parlent de logique, plus d'espaces",
        "Le hook pre-commit verrouille le tout",
      ],
    },
    projectsDetailed: [
      {
        title: "Configurer les pre-commit hooks",
        flow: "Husky → lint-staged → Prettier → Test du hook",
      },
      {
        title: "Uniformiser un vieux projet",
        flow: "Config → Formatage global → Commit dédié → CI",
      },
      {
        title: "Prettier + ESLint sans conflit",
        flow: "Séparation forme/fond → Config compatible → Vérification CI",
      },
    ],
  },

  // ------------------------------------------------------------ react-hooks
  "react-hooks": {
    learning: LEARNING_REACT_HOOKS,
    definition:
      "Les Hooks (useState, useEffect, useRef, useMemo…) sont les fonctions qui donnent aux composants React accès à l'état, aux effets de bord et au cycle de vie.",
    whyLearn:
      "C'est la grammaire moderne de React : tout l'écosystème actuel s'écrit avec des hooks. Bien les comprendre — surtout useEffect — évite la majorité des bugs React.",
    conceptDetails: [
      {
        name: "useState",
        definition: "Déclarer un état local : une valeur et sa fonction de mise à jour, avec re-rendu à chaque changement.",
      },
      {
        name: "useEffect",
        definition: "Synchroniser avec l'extérieur (API, timers, DOM) après le rendu : le hook le plus puissant et le plus piégeux.",
      },
      {
        name: "useRef",
        definition: "Une boîte mutable qui survit aux rendus sans en déclencher : timers, éléments DOM, valeurs précédentes.",
      },
      {
        name: "useMemo",
        definition: "Mémoriser un calcul coûteux : ne le refaire que quand ses dépendances changent.",
      },
      {
        name: "Custom hooks",
        definition: "Extraire de la logique réutilisable (useFetch, useLocalStorage) : la vraie puissance des hooks.",
      },
      {
        name: "Règles des hooks",
        definition: "Toujours au niveau racine, jamais dans des conditions : l'ordre d'appel doit rester stable entre les rendus.",
      },
    ],
    howItWorksTitle: "Du rendu à la synchronisation",
    howItWorks: ["RENDU", "ÉTAT", "EFFET", "SYNCHRO", "NETTOYAGE", "RE-RENDU"],
    example: {
      title: "Charger des données au montage",
      steps: [
        "Le composant est monté",
        "useEffect se déclenche une fois",
        "Appel fetch vers l'API",
        "useState stocke le résultat",
        "Re-rendu avec les données affichées",
        "Cleanup : annule la requête si démonté",
      ],
    },
    projectsDetailed: [
      {
        title: "Bibliothèque de hooks customs",
        flow: "useFetch → useDebounce → useLocalStorage → Tests",
      },
      {
        title: "Refactorer des classes vers les hooks",
        flow: "Lifecycle → useEffect → Cleanup → Simplification",
      },
      {
        title: "Formulaire piloté par hooks",
        flow: "useState → Validation → useEffect → Soumission",
      },
    ],
  },

  // ------------------------------------------------------------ react-state
  "react-state": {
    learning: LEARNING_REACT_STATE,
    definition:
      "Le state management organise l'état d'une application quand l'état local ne suffit plus : Context, Zustand, Redux Toolkit, React Query — chacun à son niveau.",
    whyLearn:
      "Choisir le bon outil évite le prop drilling comme la sur-ingénierie. Comprendre la distinction entre état client et état serveur (le cache) clarifie toute l'architecture frontend.",
    conceptDetails: [
      {
        name: "État local/global",
        definition: "Local (useState) pour un composant, global pour ce qui est partagé : choisir le niveau minimal suffisant.",
      },
      {
        name: "Context",
        definition: "La solution native pour éviter le prop drilling : simple, mais re-rend tous les consommateurs.",
      },
      {
        name: "Zustand",
        definition: "Un store externe minimaliste : sélecteurs fins, pas de boilerplate, le choix pragmatique actuel.",
      },
      {
        name: "Redux Toolkit",
        definition: "Le standard historique, modernisé : slices, thunks, DevTools — pour les états complexes en équipe.",
      },
      {
        name: "React Query",
        definition: "Gérer l'état serveur comme un cache : fetching, invalidation, retry — pas comme un état local.",
      },
      {
        name: "Cache serveur",
        definition: "Les données du serveur ont un cycle de vie (frais, périmé) : les traiter comme du cache change tout.",
      },
    ],
    howItWorksTitle: "De la donnée à l'interface",
    howItWorks: ["SOURCE", "NIVEAU", "STORE", "SÉLECTEUR", "MISE À JOUR", "SYNCHRO"],
    example: {
      title: "Un panier e-commerce",
      steps: [
        "État local : quantité dans le composant",
        "État global : panier partagé via Zustand",
        "État serveur : catalogue via React Query",
        "Ajout → mise à jour optimiste de l'UI",
        "Sélecteurs : seuls les composants concernés re-rendent",
        "Persistance du panier en localStorage",
      ],
    },
    projectsDetailed: [
      {
        title: "App avec cache serveur intelligent",
        flow: "React Query → Invalidation → UI optimiste → Retry",
      },
      {
        title: "Refactor d'un état global chaotique",
        flow: "Audit → Niveaux d'état → Store adapté → Migration",
      },
      {
        title: "Comparatif de solutions",
        flow: "Context → Zustand → Redux Toolkit → Benchmark",
      },
    ],
  },

  // ------------------------------------------------------------ react-forms
  "react-forms": {
    learning: LEARNING_REACT_FORMS,
    definition:
      "Les formulaires React gèrent la saisie utilisateur : état des champs, validation, messages d'erreur, soumission — un domaine où les détails font la qualité.",
    whyLearn:
      "Les formulaires sont partout et bourrés de cas limites : validation, accessibilité, UX d'erreur. Les maîtriser change concrètement la qualité perçue d'une application.",
    conceptDetails: [
      {
        name: "Controlled inputs",
        definition: "React pilote la valeur de chaque champ via l'état : contrôle total, au prix de re-rendus.",
      },
      {
        name: "Validation",
        definition: "Vérifier à la saisie, au blur, à la soumission : synchrone pour le format, asynchrone pour l'unicité.",
      },
      {
        name: "React Hook Form",
        definition: "La librairie de référence : inputs non contrôlés, validation intégrée, excellentes performances.",
      },
      {
        name: "Erreurs",
        definition: "Des messages précis, liés au champ via aria-describedby, affichés au bon moment.",
      },
      {
        name: "UX",
        definition: "Feedback immédiat, états de chargement, soumission idempotente : un formulaire doit rassurer.",
      },
      {
        name: "Accessibilité",
        definition: "Labels associés, ordre de tabulation, annonce des erreurs : le test ultime de l'accessibilité.",
      },
    ],
    howItWorksTitle: "De la saisie à la soumission",
    howItWorks: ["CHAMP", "SAISIE", "VALIDATION", "ERREUR", "SOUMISSION", "CONFIRMATION"],
    example: {
      title: "Inscription avec validation",
      steps: [
        "Champs contrôlés : email et mot de passe",
        "Validation du format pendant la saisie",
        "Vérification d'unicité via l'API",
        "Erreurs annoncées près de chaque champ",
        "Soumission avec état de chargement",
        "Confirmation et redirection",
      ],
    },
    projectsDetailed: [
      {
        title: "Formulaire multi-étapes validé",
        flow: "Étapes → Validation par étape → Progression → Récapitulatif",
      },
      {
        title: "Upload de fichiers avec progression",
        flow: "Fichiers → Envoi par morceaux → Barre → Nouvelle tentative",
      },
      {
        title: "Formulaire 100% accessible",
        flow: "Labels → ARIA → Navigation clavier → Tests",
      },
    ],
  },

  // ---------------------------------------------------------------- vitest
  vitest: {
  learning: LEARNING_VITEST,
  setup: {
    install: [
      "Installer en dépendance de dev : `npm install -D vitest`.",
      "Interface visuelle optionnelle : `npm install -D @vitest/ui`.",
      "DOM en tests : `npm install -D jsdom` si besoin.",
    ],
    configure: [
      "Dans `vite.config.ts` : bloc `test: { environment: \"jsdom\" }` pour les composants.",
      "Fichiers `*.test.ts` / `*.spec.ts` détectés par défaut, sans autre réglage.",
    ],
    workflow: [
      "`npx vitest` (mode watch), `npx vitest run` (une passe, pour la CI).",
      "Script npm : `\"test\": \"vitest run\"`.",
      "API compatible Jest : `describe`, `it` / `test`, `expect`.",
    ],
    editors: [
      "VS Code : extension Vitest (lancer et déboguer les tests depuis l'éditeur).",
      "Alternative : WebStorm, avec intégration Vitest native.",
    ],
  },
    definition:
      "Vitest est le runner de tests pensé pour l'écosystème Vite : rapide, API compatible Jest, watch mode et interface de debug soignée.",
    whyLearn:
      "Tester devient agréable quand c'est instantané : Vitest s'intègre naturellement aux projets Vite et couvre tests unitaires et d'intégration sans configuration lourde.",
    conceptDetails: [
      {
        name: "Assertions",
        definition: "expect(...).toBe(...) : déclarer le comportement attendu, de façon lisible.",
      },
      {
        name: "Mocks",
        definition: "vi.fn() et vi.mock() : simuler modules et fonctions pour isoler le code testé.",
      },
      {
        name: "Watch",
        definition: "Le mode watch relance les tests concernés à chaque sauvegarde : un feedback instantané.",
      },
      {
        name: "Coverage",
        definition: "Mesurer la part du code exercée par les tests : viser les chemins critiques, pas 100%.",
      },
      {
        name: "UI",
        definition: "L'interface @vitest/ui pour explorer et déboguer les tests visuellement.",
      },
      {
        name: "Snapshots",
        definition: "Figer une sortie avec toMatchSnapshot : détecter les changements involontaires.",
      },
    ],
    howItWorksTitle: "Du test au verdict",
    howItWorks: ["FICHIER", "WATCH", "EXÉCUTION", "ASSERTION", "MOCK", "RAPPORT"],
    example: {
      title: "Tester un hook custom",
      steps: [
        "Écrire le test avec renderHook",
        "Assertion sur l'état initial",
        "Simuler une action utilisateur",
        "Vérifier le nouvel état",
        "Mocker l'appel API sous-jacent",
        "Coverage du hook à 100%",
      ],
    },
    projectsDetailed: [
      {
        title: "Tester des hooks customs",
        flow: "Cas d'usage → Mocks → Assertions → Coverage",
      },
      {
        title: "Atteindre 80% de coverage",
        flow: "Audit → Tests manquants → Mocks → Intégration CI",
      },
      {
        title: "Migrer de Jest vers Vitest",
        flow: "Config → API compatibles → Mocks → Benchmark",
      },
    ],
  },

  // ------------------------------------------------------------- playwright
  playwright: {
  learning: LEARNING_PLAYWRIGHT,
  setup: {
    install: [
      "Installer Node.js LTS, puis initialiser : `npm init playwright@latest` (crée tests/, playwright.config.ts et installe le paquet).",
      "Installer les navigateurs : `npx playwright install` (Chromium, Firefox, WebKit).",
      "Vérifier : `npx playwright test` lance la suite d'exemple.",
    ],
    configure: [
      "`playwright.config.ts` : `testDir: './tests'`, `use: { baseURL: 'http://localhost:3000' }`.",
      "Déclarer les projets navigateurs : `projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]`.",
      "Option `webServer` pour démarrer l'app avant les tests en CI.",
    ],
    workflow: [
      "Lancer les tests : `npx playwright test` ; un seul fichier : `npx playwright test login.spec.ts`.",
      "Mode interactif : `npx playwright test --ui` ; debug pas à pas : `npx playwright test --debug`.",
      "Générer un test en naviguant : `npx playwright codegen http://localhost:3000`.",
      "Consulter le rapport HTML : `npx playwright show-report`.",
    ],
    editors: [
      "VS Code : extension « Playwright Test for VSCode » (Microsoft) — lance et débugue les tests depuis l'éditeur.",
      "Alternative : WebStorm, support Playwright intégré.",
    ],
  },
    definition:
      "Playwright automatise de vrais navigateurs (Chromium, Firefox, WebKit) pour tester une application comme un utilisateur : clics, formulaires, navigation.",
    whyLearn:
      "Les tests E2E attrapent ce que les tests unitaires manquent : les parcours réels, les régressions visuelles, les intégrations. Playwright est devenu la référence pour des suites fiables, y compris en CI.",
    conceptDetails: [
      {
        name: "Navigateurs",
        definition: "Chromium, Firefox et WebKit pilotés réellement : de vrais moteurs, pas de simulation.",
      },
      {
        name: "Sélecteurs",
        definition: "getByRole, getByLabel : cibler comme un utilisateur, pas comme le DOM — des tests résistants.",
      },
      {
        name: "Assertions",
        definition: "Des attentes auto-retry (toBeVisible) : fini les tests instables à cause du timing.",
      },
      {
        name: "Fixtures",
        definition: "Préparer l'état (connexion, données) avant chaque test : des scénarios isolés et reproductibles.",
      },
      {
        name: "CI",
        definition: "Lancer la suite sur chaque pull request, en parallèle sur plusieurs navigateurs.",
      },
      {
        name: "Debug",
        definition: "Trace viewer, mode headed, codegen : rejouer un échec pas à pas.",
      },
    ],
    howItWorksTitle: "Du scénario au rapport",
    howItWorks: ["SCÉNARIO", "NAVIGATEUR", "ACTIONS", "ASSERTIONS", "TRACE", "CI"],
    example: {
      title: "Tester un parcours d'achat",
      steps: [
        "Ouverture de la boutique (fixture)",
        "Ajout d'un article au panier",
        "Passage au checkout",
        "Remplissage du formulaire",
        "Assertion : page de confirmation visible",
        "Trace enregistrée en cas d'échec",
      ],
    },
    projectsDetailed: [
      {
        title: "Suite E2E d'un parcours d'achat",
        flow: "Scénarios → Fixtures → CI → Rapports HTML",
      },
      {
        title: "Tests visuels de régression",
        flow: "Screenshots → Comparaison → Seuils de tolérance",
      },
      {
        title: "Matrice multi-navigateurs",
        flow: "Chromium → Firefox → WebKit → Résultats consolidés",
      },
    ],
  },

  // -------------------------------------------------------------- web-perf
  "web-perf": {
    learning: LEARNING_WEB_PERF,
    definition:
      "La performance web mesure et optimise la vitesse ressentie : Core Web Vitals, temps de chargement, fluidité — via code splitting, lazy loading, cache et images optimisées.",
    whyLearn:
      "La vitesse est une fonctionnalité : elle impacte conversion, SEO et rétention. Mesurer d'abord avec Lighthouse, optimiser ensuite — jamais l'inverse.",
    conceptDetails: [
      {
        name: "Core Web Vitals",
        definition: "LCP, INP, CLS : les trois métriques qui mesurent vitesse d'affichage, réactivité et stabilité visuelle.",
      },
      {
        name: "Lighthouse",
        definition: "L'audit de référence : un score, des opportunités chiffrées — à lancer avant toute optimisation.",
      },
      {
        name: "Code splitting",
        definition: "Découper le bundle et ne charger que le nécessaire : dynamic import() par route.",
      },
      {
        name: "Lazy loading",
        definition: "Charger images et composants à la demande : loading='lazy', IntersectionObserver.",
      },
      {
        name: "Cache",
        definition: "Cache HTTP, service workers, CDN : ne pas retélécharger ce qui n'a pas changé.",
      },
      {
        name: "Images",
        definition: "Formats modernes (WebP, AVIF), srcset, dimensions explicites : souvent le plus gros gain.",
      },
    ],
    howItWorksTitle: "De la mesure à l'optimisation",
    howItWorks: ["MESURE", "AUDIT", "GOULOT", "OPTIMISATION", "RE-MESURE", "BUDGET"],
    example: {
      title: "Passer Lighthouse de 60 à 95",
      steps: [
        "Audit initial : LCP à 4,2 secondes",
        "Images non optimisées identifiées",
        "Conversion en WebP avec srcset",
        "Code splitting par route",
        "LCP à 1,8 s, score de 95",
        "Budget de performance ajouté en CI",
      ],
    },
    projectsDetailed: [
      {
        title: "Audit Lighthouse : 60 → 95+",
        flow: "Mesure → Images → Splitting → Cache → Vérification",
      },
      {
        title: "Optimiser une app lente",
        flow: "Profilage → Goulots → Correctifs → Suivi continu",
      },
      {
        title: "Budgets de performance en CI",
        flow: "Seuils → Lighthouse CI → Alertes automatiques",
      },
    ],
  },

  // -------------------------------------------------------- frontend-archi
  "frontend-archi": {
    learning: LEARNING_FRONTEND_ARCHI,
    definition:
      "L'architecture frontend organise le code quand projets et équipes grandissent : monorepos, design systems, découpage par fonctionnalités, conventions partagées.",
    whyLearn:
      "Un projet qui grandit sans architecture devient ingérable. Ces patterns — feature-sliced, design systems documentés, monorepos — gardent une base de code compréhensible à dix comme à cent développeurs.",
    conceptDetails: [
      {
        name: "Monorepos",
        definition: "Un seul dépôt pour apps et librairies partagées : cohérence des versions, refactors transverses.",
      },
      {
        name: "Design systems",
        definition: "Composants, tokens et documentation partagés : la source unique de vérité visuelle.",
      },
      {
        name: "Feature-Sliced",
        definition: "Découper par fonctionnalité (app, pages, features, entities) plutôt que par type de fichier.",
      },
      {
        name: "Micro-frontends",
        definition: "Des équipes autonomes qui déploient leurs morceaux d'interface indépendamment.",
      },
      {
        name: "Conventions",
        definition: "Nommage, structure, imports : des règles écrites qui évitent les débats permanents.",
      },
      {
        name: "Documentation",
        definition: "ADRs, README vivants, Storybook : l'architecture se lit, elle ne se devine pas.",
      },
    ],
    howItWorksTitle: "Du chaos à la structure",
    howItWorks: ["CROISSANCE", "DOULEUR", "DÉCOUPAGE", "CONVENTIONS", "PARTAGE", "GOUVERNANCE"],
    example: {
      title: "Structurer une app qui grandit",
      steps: [
        "100 composants dans un seul dossier",
        "Découpage par fonctionnalités",
        "Extraction du design system",
        "Conventions d'imports écrites",
        "Documentation des décisions (ADRs)",
        "Onboarding d'un nouveau dev en un jour",
      ],
    },
    projectsDetailed: [
      {
        title: "Monorepo avec Turborepo",
        flow: "Apps → Packages partagés → Pipeline → Cache",
      },
      {
        title: "Design system documenté",
        flow: "Tokens → Composants → Storybook → Versioning",
      },
      {
        title: "Migration vers feature-sliced",
        flow: "Audit → Découpage → Migration progressive",
      },
    ],
  },

  // ---------------------------------------------------------- react-native
  "react-native": {
  learning: LEARNING_REACT_NATIVE,
  setup: {
    install: [
      "Installer Node.js LTS.",
      "Créer le projet avec Expo (voie recommandée) : `npx create-expo-app@latest MonApp`.",
      "Installer l'app Expo Go sur le téléphone, ou un émulateur via Android Studio / Xcode.",
    ],
    configure: [
      "`app.json` : nom, slug, icône et splash de l'application.",
      "`eas.json` : profils de build (development, preview, production) via EAS.",
      "Installer EAS CLI si besoin de builds cloud : `npm install -g eas-cli`.",
    ],
    workflow: [
      "Démarrer : `npx expo start`, scanner le QR code avec Expo Go.",
      "Build natif local : `npx expo run:android` / `npx expo run:ios`.",
      "Build cloud : `eas build --platform android` (nécessite un compte Expo).",
      "Rechargement à chaud : sauvegarder suffit, l'app se met à jour.",
    ],
    editors: [
      "VS Code : extension « React Native Tools » (Microsoft) pour lancer et déboguer.",
      "Android Studio : indispensable pour l'émulateur Android et le SDK.",
      "Alternative : WebStorm, support React Native intégré.",
    ],
  },
    definition:
      "React Native permet de créer des applications mobiles iOS et Android avec React : le code JavaScript pilote des composants d'interface réellement natifs.",
    whyLearn:
      "Un seul code pour deux plateformes, avec des compétences React existantes : c'est la voie la plus directe du web vers le mobile pour un développeur frontend.",
    conceptDetails: [
      {
        name: "Composants natifs",
        definition: "View, Text, FlatList : du JavaScript qui pilote de vrais composants iOS et Android.",
      },
      {
        name: "Navigation",
        definition: "React Navigation : stacks, tabs, drawers — la navigation mobile a ses propres patterns.",
      },
      {
        name: "APIs natives",
        definition: "Caméra, géolocalisation, notifications : accessibles via des modules natifs ou Expo.",
      },
      {
        name: "Build",
        definition: "Compiler en .apk et .ipa : certificats, provisioning, profils — la partie la moins glamour.",
      },
      {
        name: "Stores",
        definition: "App Store et Play Store : review, métadonnées, releases progressives.",
      },
      {
        name: "OTA",
        definition: "Over-the-air : pousser des correctifs JavaScript sans repasser par les stores.",
      },
    ],
    howItWorksTitle: "Du composant au store",
    howItWorks: ["CODE", "BRIDGE", "NATIF", "BUILD", "TEST", "STORE"],
    example: {
      title: "Une app de notes synchronisée",
      steps: [
        "Liste des notes en FlatList",
        "Écran d'édition de note",
        "Stockage local avec AsyncStorage",
        "Synchronisation via API REST",
        "Build iOS et Android",
        "Publication avec mises à jour OTA",
      ],
    },
    projectsDetailed: [
      {
        title: "App de notes synchronisée",
        flow: "Interface → Stockage local → Sync API → Builds",
      },
      {
        title: "Clone d'une app existante",
        flow: "Maquette → Navigation → APIs natives → Polish",
      },
      {
        title: "App avec notifications push",
        flow: "Permissions → Push → Deep links → Tests",
      },
    ],
  },

  // ---------------------------------------------------------------- flutter
  flutter: {
  learning: LEARNING_FLUTTER,
  setup: {
    install: [
      "Télécharger le SDK Flutter depuis docs.flutter.dev et l'ajouter au PATH.",
      "Installer Android Studio (SDK Android + émulateur).",
      "Diagnostiquer : `flutter doctor`, puis accepter les licences : `flutter doctor --android-licenses`.",
    ],
    configure: [
      "`pubspec.yaml` : nom, version, dépendances et assets (images, polices).",
      "Android Studio → SDK Manager : installer la plateforme Android cible.",
      "Sur macOS pour iOS : Xcode depuis l'App Store.",
    ],
    workflow: [
      "Créer : `flutter create mon_app`, lancer : `flutter run` (choisir l'appareil).",
      "Ajouter un paquet : `flutter pub add http` ; installer : `flutter pub get`.",
      "Analyser : `flutter analyze` ; produire l'APK : `flutter build apk`.",
    ],
    editors: [
      "VS Code : extension « Flutter » (Dart Code) — run, debug, hot reload.",
      "Android Studio : plugin Flutter officiel, émulateur intégré.",
      "Le hot reload (`r` dans le terminal) applique les changements instantanément.",
    ],
  },
    definition:
      "Flutter est le framework UI de Google (langage Dart) : il dessine lui-même chaque pixel, pour des applications mobiles, web et desktop depuis une seule base de code.",
    whyLearn:
      "Son moteur de rendu maison garantit un visuel identique partout et des performances élevées. Une alternative crédible quand on vise le multiplateforme sans passer par les technologies web.",
    conceptDetails: [
      {
        name: "Dart",
        definition: "Le langage de Flutter : typé, compilé en natif, avec hot reload pendant le développement.",
      },
      {
        name: "Widgets",
        definition: "Tout est widget : boutons, layouts, l'app elle-même — une arborescence reconstruite à chaque changement d'état.",
      },
      {
        name: "State",
        definition: "setState pour le local, Provider/Riverpod/Bloc pour le partagé : choisir selon la complexité.",
      },
      {
        name: "Navigation",
        definition: "Navigator 2.0 : piles de routes, deep links, transitions personnalisées.",
      },
      {
        name: "Packages",
        definition: "pub.dev : des milliers de packages (caméra, cartes, Firebase) prêts à l'emploi.",
      },
      {
        name: "Build",
        definition: "Un seul code vers iOS, Android, web et desktop : flutter build pour chaque cible.",
      },
    ],
    howItWorksTitle: "Du widget à l'app",
    howItWorks: ["WIDGET", "ÉTAT", "REBUILD", "NAVIGATION", "PACKAGE", "BUILD"],
    example: {
      title: "Une app météo multiplateforme",
      steps: [
        "Arborescence de widgets pour l'UI",
        "Écran de recherche de ville",
        "Appel à l'API météo",
        "setState reconstruit l'interface",
        "Navigation vers les détails",
        "Build Android et iOS depuis le même code",
      ],
    },
    projectsDetailed: [
      {
        title: "App météo multiplateforme",
        flow: "Interface → API → État → Builds Android/iOS",
      },
      {
        title: "Portfolio app",
        flow: "Design → Animations → Versions web + mobile",
      },
      {
        title: "App avec Firebase",
        flow: "Auth → Firestore → Notifications → Release",
      },
    ],
  },

  // --------------------------------------------------------------- electron
  electron: {
  learning: LEARNING_ELECTRON,
  setup: {
    install: [
      "Installer Node.js LTS.",
      "Installer Electron en dev : `npm install -D electron`.",
      "Vérifier : `npx electron --version`.",
    ],
    configure: [
      "`package.json` : `\"main\": \"main.js\"` désigne le processus principal.",
      "`main.js` : crée la fenêtre via `new BrowserWindow({ width: 1200, height: 800 })`.",
      "`preload.js` : pont sécurisé entre Node et la page (`contextBridge`), avec `contextIsolation: true`.",
    ],
    workflow: [
      "Lancer l'app : `npx electron .` (script `\"start\": \"electron .\"`).",
      "Déboguer le rendu avec les DevTools Chromium intégrés (`win.webContents.openDevTools()`).",
      "Packager : `npm install -D electron-builder`, configurer `build` dans package.json, puis `npx electron-builder`.",
    ],
    editors: [
      "VS Code : support JS/TS intégré, débogage du processus main via `launch.json`.",
      "Extensions utiles : ESLint, Prettier.",
      "Alternative : WebStorm.",
    ],
  },
    definition:
      "Electron emballe une application web (HTML/CSS/JS) dans un shell desktop : Chromium pour l'interface, Node.js pour le système — c'est la stack de VS Code, Discord et Slack.",
    whyLearn:
      "Il permet de livrer une vraie application desktop avec des compétences web. Le revers : un coût mémoire à assumer — d'où l'importance de comprendre son architecture main/renderer avant de l'adopter.",
    conceptDetails: [
      {
        name: "Main/Renderer",
        definition: "Le processus main (Node.js : fenêtres, système) et les renderers (Chromium : l'UI) : deux mondes séparés.",
      },
      {
        name: "IPC",
        definition: "Inter-Process Communication : le pont sécurisé entre l'UI et le système, via contextBridge et preload.",
      },
      {
        name: "Packaging",
        definition: "electron-builder : produire des installateurs .exe, .dmg et .AppImage signés.",
      },
      {
        name: "Auto-update",
        definition: "Livrer les nouvelles versions sans réinstallation manuelle.",
      },
      {
        name: "APIs natives",
        definition: "Menus, tray, notifications, presse-papiers : l'intégration au système d'exploitation.",
      },
      {
        name: "Performance",
        definition: "Un Chromium par fenêtre : limiter les renderers, éviter les fuites mémoire, mesurer.",
      },
    ],
    howItWorksTitle: "Du web au desktop",
    howItWorks: ["WEB APP", "MAIN", "RENDERER", "IPC", "PACKAGE", "UPDATE"],
    example: {
      title: "Un éditeur de notes desktop",
      steps: [
        "Partir d'une app web existante",
        "Main : crée la fenêtre de l'application",
        "Renderer : affiche l'éditeur",
        "IPC : sauvegarde des fichiers sur disque",
        "Packaging en installateur signé",
        "Auto-update à chaque release",
      ],
    },
    projectsDetailed: [
      {
        title: "Éditeur de notes desktop",
        flow: "UI web → IPC → Fichiers locaux → Packaging",
      },
      {
        title: "Wrapper desktop d'une PWA",
        flow: "URL → Fenêtre native → Menus → Distribuable",
      },
      {
        title: "App avec icône système",
        flow: "Tray → Menus contextuels → Notifications → Tests",
      },
    ],
  },

  // ------------------------------------------------------------------ csharp
  csharp: {
    learning: LEARNING_CSHARP,
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
      "algorithms": "L'algorithmique de base (structures de données, complexité, récursion) s'applique telle quelle : en C#, retenez surtout le choix de la bonne collection (`List`, `Dictionary`, `HashSet`) avant d'optimiser le code."
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
    learning: LEARNING_JAVA,
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
      "algorithms": "Retenez l'essentiel : structures de données (List, Map, Set), complexité temporelle pour choisir la bonne collection, et récursion — le reste se lit dans les signatures des API Java."
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
    learning: LEARNING_RUST,
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
      "algorithms": "L'algorithmique classique (structures de données, complexité, récursion) s'applique telle quelle : la difficulté en Rust est de l'exprimer en respectant le borrow checker, pas de réinventer les algorithmes."
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
    learning: LEARNING_GO,
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
      "algorithms": "Des bases d'algorithmique (boucles, conditions, structures de données simples) suffisent : Go est volontairement un petit langage, la difficulté est dans la conception concurrente, pas dans la syntaxe."
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
  // ------------------------------------------------------------------ vue
  vue: {
    learning: LEARNING_VUE,
    "conceptDetails": [
      {
        "definition": "Le cœur de Vue : `ref()` et `reactive()` encapsulent des valeurs dans des proxies JavaScript qui notifient le framework à chaque modification, déclenchant un re-rendu ciblé sans manipulation manuelle du DOM.",
        "name": "Réactivité"
      },
      {
        "definition": "Unités d'interface autonomes (fichiers `.vue`) qui reçoivent des données via les props et signalent les événements vers le parent via `emit`. Ils se composent comme des briques pour former des pages entières.",
        "name": "Composants"
      },
      {
        "definition": "Attributs spéciaux du template qui ajoutent du comportement au DOM : `v-if` pour le rendu conditionnel, `v-for` pour les listes, `v-model` pour la liaison bidirectionnelle des formulaires, `v-bind` et `v-on` pour les attributs et événements.",
        "name": "Directives"
      },
      {
        "definition": "Le style moderne d'écriture des composants avec `<script setup>` : `ref`, `computed` et `watch` organisent la logique par fonctionnalité plutôt que par option, et facilitent sa réutilisation via les composables.",
        "name": "Composition API"
      },
      {
        "definition": "Le routeur officiel : il associe des URL à des composants, gère les paramètres et les routes imbriquées, et protège les pages via des gardes de navigation. Le chargement différé des routes garde le bundle initial léger.",
        "name": "Vue Router"
      },
      {
        "definition": "Le store officiel de Vue : il centralise l'état partagé (utilisateur connecté, panier, préférences) avec des `stores` composés d'état, de getters calculés et d'actions. Remplace les props qui descendraient sur dix niveaux.",
        "name": "Pinia"
      }
    ],
    "definition": "Vue.js est un framework JavaScript progressif pour construire des interfaces utilisateur à partir de composants : un template déclaratif se lie à un état réactif, et Vue synchronise le DOM automatiquement quand l'état change. Il s'adopte par incréments, d'une simple portion de page à une application complète avec routage et store.",
    "environment": [
      "Node.js LTS installé et vérifié via `node --version`",
      "npm fonctionnel, vérifié via `npm --version`",
      "Git disponible pour versionner le projet (`git --version`)",
      "Un navigateur récent (Chrome ou Firefox) pour tester le rendu",
      "VS Code avec l'extension « Vue (Official) », ou WebStorm"
    ],
    "example": {
      "steps": [
        "Générez le projet avec `npm create vue@latest` puis démarrez-le avec `npm run dev`",
        "Créez un composant `TodoList.vue` : un `ref([])` stocke les tâches, un `ref('')` la recherche",
        "Liez un champ de recherche avec `v-model` et filtrez la liste via un `computed`",
        "Affichez les tâches avec `v-for` et un bouton qui bascule leur état via un gestionnaire d'événement `@click`",
        "Vérifiez dans le navigateur : chaque frappe filtre instantanément la liste, sans rechargement"
      ],
      "title": "Une liste de tâches filtrable"
    },
    "howItWorks": [
      "ÉTAT RÉACTIF",
      "PROXY",
      "TEMPLATE",
      "VIRTUAL DOM",
      "DIFF",
      "PATCH"
    ],
    "howItWorksTitle": "De l'état au DOM",
    "prerequisiteNotes": {
      "javascript": "DOM, événements, modules ES : Vue manipule le DOM à votre place, mais vous devez comprendre ce qu'il remplace pour débugger efficacement."
    },
    "projectsDetailed": [
      {
        "flow": "Scaffolding create-vue → Composant de recherche (v-model) → Appel API météo → Affichage conditionnel (v-if) → Build de production",
        "title": "Application météo avec recherche de ville"
      },
      {
        "flow": "Vue Router (routes articles/auteurs) → Pinia (articles, favoris) → Composables (fetch réutilisable) → Formulaires commentés (v-model) → Déploiement statique",
        "title": "Blog avec routage et état global"
      },
      {
        "flow": "WebSocket dans un composable → Store Pinia synchronisé → Graphiques mis à jour par la réactivité → Routes protégées par gardes → Tests et build optimisé",
        "title": "Tableau de bord temps réel"
      }
    ],
    "setup": {
      "configure": [
        "Chaque composant est un fichier `.vue` en trois blocs : `<template>` pour le markup, `<script setup>` pour la logique, `<style scoped>` pour le CSS isolé au composant. C'est la convention Single-File Component à respecter dès le départ.",
        "Le fichier `vite.config.ts` centralise la configuration du build : plugins Vue, alias de chemins (ex. `@` vers `src/`). Ajoutez-y l'alias `@` pour éviter les chemins relatifs profonds dès les premiers imports.",
        "Si vous avez activé TypeScript lors du scaffolding, `tsconfig.json` règle le typage des templates et des props : laissez la configuration générée en place tant que vous ne savez pas exactement ce que vous changez."
      ],
      "editors": [
        "VS Code avec l'extension « Vue (Official) » : coloration, autocomplétion et vérification de types dans les blocs `<template>`, `<script>` et `<style>` des fichiers `.vue`.",
        "WebStorm : support intégré de Vue (completion des templates, navigation entre blocs, inspection des props) sans extension supplémentaire."
      ],
      "install": [
        "Exécutez `npm create vue@latest` : l'assistant officiel `create-vue` génère le squelette du projet. Répondez à ses questions (TypeScript, Vue Router, Pinia...) ; vérifiez que le dossier du projet est créé avec `package.json` à sa racine.",
        "Exécutez `npm install` dans le dossier du projet : installe les dépendances déclarées dans `package.json`. Vérifiez la fin du journal d'installation (aucune erreur) et la présence du dossier `node_modules/`.",
        "Exécutez `npm run dev` : démarre le serveur de développement Vite avec rechargement à chaud. Vérifiez que le terminal affiche une URL locale et que l'application s'affiche en l'ouvrant dans le navigateur.",
        "Exécutez `npm run build` : compile et optimise le projet pour la production. Vérifiez la création du dossier `dist/` contenant les fichiers statiques prêts à être déployés."
      ],
      "workflow": [
        "Travaillez avec `npm run dev` en permanence : le rechargement à chaud reflète chaque modification du template ou du script quasi instantanément. Un changement d'état visible à l'écran sans rechargement confirme que la réactivité fonctionne.",
        "Débuggez avec l'extension navigateur officielle Vue DevTools : elle inspecte l'arbre des composants, leurs props et leur état réactif en direct. Si l'extension ne détecte pas l'application, vérifiez que vous êtes bien en mode développement.",
        "Avant chaque déploiement, exécutez `npm run build` et corrigez les avertissements affichés : un build propre sans erreurs est la condition d'une mise en production sereine."
      ]
    },
    "whyLearn": "Vue combine la courbe d'apprentissage la plus douce des grands frameworks avec un modèle de production complet : réactivité intuitive, Single-File Components lisibles, écosystème officiel cohérent (Router, Pinia). C'est le choix pragmatique pour des équipes qui veulent livrer vite sans sacrifier la structure."
  }
,
  // ------------------------------------------------------------------ angular
  angular: {
    learning: LEARNING_ANGULAR,
    "conceptDetails": [
      {
        "definition": "Classes TypeScript décorées avec `@Component` qui associent un template HTML, des styles et de la logique. Chaque composant contrôle une portion de l'écran ; l'application entière est un arbre de composants.",
        "name": "Composants"
      },
      {
        "definition": "L'injection de dépendances fournit les services (classes `@Injectable` : appels HTTP, logique métier) aux composants qui les demandent dans leur constructeur. Un même service partagé reste une instance unique : l'état est cohérent partout.",
        "name": "Services & DI"
      },
      {
        "definition": "La bibliothèque de programmation réactive d'Angular : les `Observable` modélisent les flux asynchrones (requêtes HTTP, événements, formulaires). Les opérateurs (`map`, `filter`, `switchMap`) transforment ces flux, et le pipe `async` du template gère l'abonnement automatiquement.",
        "name": "RxJS"
      },
      {
        "definition": "Deux approches : les formulaires pilotés par template (simples, déclaratifs) et les formulaires réactifs (`FormControl`, `FormGroup`, `Validators`) qui décrivent le formulaire en TypeScript. Les réactifs dominent dès que la validation devient sérieuse.",
        "name": "Formulaires"
      },
      {
        "definition": "Le routeur associe des chemins d'URL aux composants, avec paramètres, routes enfants et chargement différé des modules. Les gardes (`CanActivate`) protègent les routes selon l'authentification ou les rôles.",
        "name": "Router"
      },
      {
        "definition": "Le système de réactivité moderne d'Angular (depuis v16) : `signal()` crée une valeur réactive, `computed()` en dérive une valeur, `effect()` réagit aux changements. Plus simple et plus performant que la détection de changements par défaut pour l'état local.",
        "name": "Signals"
      }
    ],
    "definition": "Angular est un framework TypeScript complet, maintenu par Google, pour construire des applications web d'entreprise : composants, injection de dépendances, routage et formulaires sont intégrés dans une architecture opinionée. Tout passe par son CLI, qui génère, sert, teste et compile les projets.",
    "environment": [
      "Node.js LTS installé et vérifié via `node --version`",
      "npm fonctionnel, vérifié via `npm --version`",
      "Angular CLI installé en global et vérifié via `ng version`",
      "Un navigateur récent (Chrome recommandé pour `ng test` et le debug)",
      "VS Code avec l'extension « Angular Language Service », ou WebStorm"
    ],
    "example": {
      "steps": [
        "Générez le projet avec `ng new mon-app` (avec routage) et démarrez-le avec `ng serve`",
        "Créez un composant avec `ng generate component inscription`",
        "Décrivez le formulaire en réactif : `FormGroup` avec `FormControl` pour chaque champ et `Validators.required`, `Validators.email`",
        "Affichez les erreurs dans le template quand un champ est touché et invalide, et désactivez le bouton tant que le formulaire est invalide",
        "Soumettez vers un service qui envoie les données en HTTP ; vérifiez la requête dans l'onglet réseau du navigateur"
      ],
      "title": "Un formulaire d'inscription avec validation"
    },
    "howItWorks": [
      "MODULE",
      "COMPONENT",
      "TEMPLATE",
      "DATA BINDING",
      "CHANGE DETECTION",
      "RENDU"
    ],
    "howItWorksTitle": "Le cycle d'une application",
    "prerequisiteNotes": {
      "typescript": "Types, classes, décorateurs : Angular est écrit en TypeScript et son API (services, injection de dépendances, décorateurs) suppose ces notions acquises."
    },
    "projectsDetailed": [
      {
        "flow": "ng new → Composants liste/détail → Service en mémoire (DI) → Router (routes paramétrées) → Build",
        "title": "Carnet d'adresses"
      },
      {
        "flow": "Formulaires réactifs (login) → Guard CanActivate → Service HTTP + intercepteur JWT → RxJS (switchMap, catchError) → Tests ng test → Build production",
        "title": "Back-office avec authentification"
      },
      {
        "flow": "Modules lazy-loaded → Signals pour l'état local → Store/state partagé via services → Tests unitaires + e2e → Budgets de bundle et optimisation du build",
        "title": "Plateforme e-learning modulaire"
      }
    ],
    "setup": {
      "configure": [
        "Le fichier `angular.json` centralise la configuration du workspace : projets, builds, assets, budgets de taille des bundles. Laissez les valeurs générées par défaut jusqu'à en comprendre chaque section.",
        "Les fichiers `src/environments/` séparent les variables par environnement (URL d'API de dev vs de prod). Le build de production substitue automatiquement le bon fichier : ne codez jamais une URL d'API en dur dans un service.",
        "Pour le développement local contre une API, créez un fichier proxy (ex. `proxy.conf.json`) et servez avec l'option correspondante : les appels `/api` sont redirigés vers le backend sans problème CORS. Vérifiez dans l'onglet réseau du navigateur que les requêtes atteignent bien le backend."
      ],
      "editors": [
        "VS Code avec l'extension « Angular Language Service » : autocomplétion et vérification de types dans les templates HTML, navigation vers les définitions des composants.",
        "WebStorm : support Angular intégré (templates, injection de dépendances, refactoring des composants) sans extension supplémentaire."
      ],
      "install": [
        "Exécutez `npm install -g @angular/cli` : installe la CLI Angular en global sur votre machine. Vérifiez avec `ng version`, qui doit afficher les versions d'Angular, de Node.js et du gestionnaire de paquets.",
        "Exécutez `ng version` seul à tout moment pour diagnostiquer l'environnement : il liste les versions installées du framework, du CLI et des dépendances. Des versions incohérentes ici expliquent la plupart des erreurs de build.",
        "Exécutez `ng new mon-app` : génère l'arborescence complète du projet (configuration, dossier `src/`, tests). Répondez aux questions (routage, style) ; vérifiez que le dossier `mon-app/` est créé et contient `angular.json`.",
        "Exécutez `ng generate component nom` dans le projet : crée les quatre fichiers d'un composant (TypeScript, template, styles, test). Vérifiez leur présence dans `src/app/nom/` et l'enregistrement automatique du composant."
      ],
      "workflow": [
        "Développez avec `ng serve` : serveur local avec rechargement à chaud sur `http://localhost:4200`. Chaque sauvegarde recompile ; une erreur de compilation TypeScript s'affiche directement dans le terminal et le navigateur.",
        "Générez tout avec la CLI (`ng generate service`, `ng generate guard`...) plutôt qu'en créant les fichiers à la main : les conventions de nommage et d'enregistrement sont respectées automatiquement.",
        "Testez avec `ng test` : lance la suite Karma/Jasmine dans le navigateur. Des tests verts avant chaque commit garantissent que la refactorisation n'a rien cassé.",
        "Livrez avec `ng build` : compile en mode production (optimisations, tree-shaking). Vérifiez le dossier `dist/` et les tailles de bundles affichées dans le rapport de build."
      ]
    },
    "whyLearn": "Angular est le standard des grandes applications d'équipe : son architecture imposée (modules, services, typage strict) rend le code prévisible à grande échelle. Le maîtriser ouvre les postes entreprise et donne une culture solide de l'ingénierie frontend : DI, RxJS, tests."
  }
,
  // ------------------------------------------------------------------ aspnet
  aspnet: {
    learning: LEARNING_ASPNET,
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
      "csharp": "Maîtrisez les fondamentaux de C# : classes et interfaces, propriétés, collections génériques (`List<T>`, `Dictionary<K,V>`), `async`/`await` pour le code asynchrone, et les bases de LINQ pour interroger les collections — ASP.NET Core en fait un usage intensif."
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
    learning: LEARNING_DJANGO,
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
      "python": "Soyez à l'aise avec Python : modules et imports, classes et héritage, décorateurs en lecture, et surtout les environnements virtuels (`venv`) — Django s'utilise toujours dans un venv isolé."
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
  // ------------------------------------------------------------------ devops
  devops: {
    learning: LEARNING_DEVOPS,
    "conceptDetails": [
      {
        "definition": "L'intégration continue compile et teste le code à chaque push ; le déploiement continu pousse automatiquement les versions validées en production. Le pipeline est la chaîne de montage du logiciel : chaque étape doit être verte pour passer à la suivante.",
        "name": "CI/CD"
      },
      {
        "definition": "Les serveurs, réseaux et configurations sont décrits dans des fichiers versionnés (Terraform, Ansible...) plutôt que configurés à la main. L'infrastructure devient reproductible, auditable et recréable en une commande.",
        "name": "Infrastructure as code"
      },
      {
        "definition": "Docker empaquette l'application et toutes ses dépendances dans une image immuable qui tourne identiquement partout : du laptop au serveur. Les registres stockent les images versionnées prêtes à déployer.",
        "name": "Conteneurs"
      },
      {
        "definition": "Métriques, logs centralisés et alertes qui disent comment l'application se comporte en production. On ne pilote que ce qu'on mesure : temps de réponse, taux d'erreur, saturation des ressources, avec des seuils qui déclenchent des alertes avant les utilisateurs.",
        "name": "Monitoring"
      },
      {
        "definition": "Le dépôt Git devient la source de vérité de l'infrastructure et des déploiements : un agent (ArgoCD, Flux...) synchronise en continu l'état réel du cluster avec l'état décrit dans Git. Tout changement passe par une pull request, traçable et réversible.",
        "name": "GitOps"
      },
      {
        "definition": "Le versant humain : collaboration dev/ops, post-mortems sans blâme, responsabilité partagée de la production. Les métriques DORA (fréquence de déploiement, délai de mise en prod, taux d'échec, temps de rétablissement) mesurent la maturité d'une équipe.",
        "name": "Culture DevOps"
      }
    ],
    "definition": "DevOps n'est pas un logiciel à installer mais une discipline : l'ensemble des pratiques, de la culture et de l'outillage qui automatisent la construction, le test et le déploiement des applications. Elle rapproche développement et exploitation pour livrer plus vite, plus souvent et plus sûrement.",
    "environment": [
      "Git installé et vérifié via `git --version`",
      "Docker installé, moteur démarré et vérifié via `docker --version` (Docker Desktop sur macOS/Windows)",
      "Un compte GitHub (Actions) ou GitLab (CI) pour héberger le dépôt et exécuter les pipelines",
      "VS Code avec les extensions « Docker » (Microsoft) et « YAML » (Red Hat)"
    ],
    "example": {
      "steps": [
        "Créez un dépôt GitHub et poussez-y votre application avec ses tests",
        "Ajoutez `.github/workflows/ci.yml` : déclencheur sur `push`, job sur `ubuntu-latest`, étapes de récupération du code, installation des dépendances, tests et build",
        "Poussez le fichier : observez le pipeline se déclencher et passer au vert dans l'onglet Actions",
        "Protégez la branche `main` pour exiger un pipeline vert avant toute fusion",
        "Écrivez un `Dockerfile`, construisez l'image et poussez-la vers un registre avec un tag de version : votre application est désormais déployable de façon reproductible"
      ],
      "title": "Automatiser les tests et le build d'une app Node"
    },
    "howItWorks": [
      "CODE",
      "COMMIT",
      "PIPELINE CI",
      "BUILD",
      "TEST",
      "DÉPLOIEMENT"
    ],
    "howItWorksTitle": "Le cycle de livraison",
    "prerequisiteNotes": {
      "git": "Branches, fusions, pull requests : les pipelines CI/CD se déclenchent sur vos commits et vos merges.",
      "linux": "Terminal, services, permissions : les serveurs, les conteneurs et les agents de CI vivent sous Linux."
    },
    "projectsDetailed": [
      {
        "flow": "Dépôt Git → Workflow de test et build → Badge de statut → Branche main protégée",
        "title": "Pipeline CI pour un projet existant"
      },
      {
        "flow": "Dockerfile par service → Compose local → Pipeline qui build et pousse les images → Déploiement sur un serveur avec tags versionnés",
        "title": "Application conteneurisée multi-services"
      },
      {
        "flow": "Infrastructure as code (Terraform) → Cluster Kubernetes → ArgoCD synchronisé sur Git → Monitoring (métriques + alertes) → Post-mortems et métriques DORA",
        "title": "Plateforme GitOps complète"
      }
    ],
    "setup": {
      "configure": [
        "Stockez les secrets (clés d'API, tokens de déploiement) dans les secrets chiffrés de la plateforme (GitHub : Settings → Secrets and variables → Actions), jamais en dur dans le dépôt. Un secret qui fuit dans l'historique Git est compromis : il faut le révoquer, pas le supprimer.",
        "Écrivez un `Dockerfile` pour votre application : image de base officielle, copie des fichiers, installation des dépendances, exposition du port, commande de démarrage. Ajoutez un `.dockerignore` (node_modules, .git...) pour des builds rapides et des images légères.",
        "Protégez la branche `main` : exigez un pipeline CI vert et une revue avant toute fusion. C'est la configuration qui transforme la CI d'un gadget en garde-fou réel."
      ],
      "editors": [
        "VS Code avec l'extension « Docker » (Microsoft) : gestion des images et conteneurs, coloration et validation des Dockerfiles, exécution des builds depuis l'éditeur.",
        "VS Code avec l'extension « YAML » (Red Hat) : validation de schéma et autocomplétion pour les fichiers de pipeline (GitHub Actions, GitLab CI) et les manifests Kubernetes."
      ],
      "install": [
        "Vérifiez Git avec `git --version` : le versionnement est la fondation de tout le reste — les pipelines CI/CD se déclenchent sur vos commits et vos fusions. Si la commande échoue, installez Git depuis le site officiel avant de continuer.",
        "Vérifiez Docker avec `docker --version` : le moteur de conteneurs qui empaquette vos applications de façon reproductible. Sur macOS et Windows, installez Docker Desktop (moteur + interface) ; vérifiez ensuite que le moteur répond, car un Docker installé mais éteint bloque tout build d'image.",
        "Choisissez votre plateforme CI : GitHub Actions se configure avec un fichier `.github/workflows/ci.yml` dans le dépôt (aucune installation, la CI est intégrée à GitHub) ; GitLab CI utilise un fichier `.gitlab-ci.yml` à la racine. Vérifiez votre choix en poussant un commit et en observant le premier pipeline se déclencher.",
        "Écrivez un pipeline minimal réel : un déclencheur sur `push`, un job sur `ubuntu-latest`, avec des étapes qui récupèrent le code, installent les dépendances, lancent les tests puis le build. Vérifiez que le pipeline passe au vert sur la page Actions (GitHub) ou Pipelines (GitLab) avant d'ajouter la moindre étape de déploiement."
      ],
      "workflow": [
        "Travaillez en cycle court : commit sur une branche → push → le pipeline teste et build automatiquement → revue du code → fusion vers `main` après un pipeline vert. Un pipeline rouge bloque la fusion : lisez ses logs, corrigez, recommencez.",
        "Construisez l'image Docker à chaque version et poussez-la vers un registre (Docker Hub, GitHub Container Registry...) avec un tag de version explicite, jamais uniquement `latest` en production : un tag immuable permet de revenir en arrière en cas de problème.",
        "Déployez par étapes (staging puis production) et surveillez les métriques et les logs après chaque déploiement. Un déploiement n'est terminé que lorsque la surveillance confirme que l'application se comporte comme prévu.",
        "Documentez chaque incident dans un post-mortem sans blâme : ce qui s'est passé, comment le détecter plus tôt, quelle automatisation l'empêchera de se reproduire. C'est le mécanisme d'apprentissage de la culture DevOps."
      ]
    },
    "whyLearn": "Savoir coder ne suffit plus : la valeur arrive quand le code tourne en production de façon fiable et reproductible. DevOps (pipelines CI/CD, conteneurs, infrastructure as code) est la compétence qui transforme un projet local en service déployé, surveillé et réversible — et c'est un différenciateur majeur sur le marché."
  }
,
};

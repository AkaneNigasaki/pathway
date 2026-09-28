import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du développement full stack : construire une
 * application de bout en bout — base de données, API, interface et
 * déploiement. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code
 * inline entre backticks. Approche conceptuelle et architecturale :
 * les exemples utilisent des outils cités dans le guide du parcours.
 */
export const LEARNING_FULLSTACK: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que « full stack » signifie vraiment — et ce que ça ne signifie pas.",
    blocks: [
      {
        kind: "text",
        text: "Full stack désigne la capacité à construire une application de bout en bout : modéliser les données, exposer une API, créer l'interface, gérer l'authentification et mettre le tout en ligne. C'est le profil le plus polyvalent : il conçoit des fonctionnalités complètes, débogue à tous les niveaux et peut livrer seul un produit fonctionnel.",
      },
      {
        kind: "text",
        text: "Ce que ça ne signifie pas : tout maîtriser en profondeur. Personne n'est expert en bases de données, en CSS, en sécurité et en DevOps à la fois. Le développeur full stack connaît toute la chaîne assez bien pour avancer seul, et sait quand creuser ou demander de l'aide. La polyvalence est une largeur, pas une collection d'expertises.",
      },
      {
        kind: "list",
        items: [
          "Backend : API, logique métier, persistance, authentification.",
          "Frontend : interface, état, navigation, expérience utilisateur.",
          "Données : modélisation, requêtes, intégrité.",
          "Opérations : build, déploiement, variables d'environnement, supervision.",
        ],
      },
    ],
  },
  {
    id: "chaine-complete",
    title: "La chaîne complète en une image",
    level: 1,
    intro:
      "Le trajet d'une fonctionnalité, du clic au disque et retour.",
    blocks: [
      {
        kind: "diagram",
        title: "De l'idée au produit en ligne",
        lines: [
          "  UTILISATEUR",
          "       │ clic",
          "       ▼",
          "  FRONTEND (navigateur)",
          "   composants, état, routing",
          "       │  HTTP : GET /api/notes",
          "       ▼",
          "  API BACKEND",
          "   routes, validation, auth, logique métier",
          "       │  SQL",
          "       ▼",
          "  BASE DE DONNÉES",
          "   tables, index, transactions",
          "       │  JSON",
          "       ▼",
          "  FRONTEND ← affichage",
          "",
          "  Le tout empaqueté (build), déployé (hébergeur),",
          "  surveillé (logs, erreurs) → PRODUIT EN LIGNE",
        ],
      },
      {
        kind: "text",
        text: "Chaque couche a son rôle et son langage, mais elles ne sont pas indépendantes : un choix de modélisation influence l'API, qui influence l'interface. C'est précisément cette vision transversale qui fait la valeur du full stack.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "prerequis",
    title: "Prérequis",
    level: 2,
    intro:
      "Le socle avant d'assembler les couches.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations nécessaires",
        fields: [
          {
            label: "HTML / CSS / JavaScript",
            value:
              "La base du frontend : structurer une page, la styler, la rendre interactive. Sans JavaScript solide, tout le reste flotte.",
          },
          {
            label: "HTTP",
            value:
              "Requêtes, méthodes, statuts, en-têtes : le protocole qui relie le frontend au backend.",
          },
          {
            label: "Un langage backend",
            value:
              "JavaScript via Node.js est la voie la plus directe quand on vient du frontend : un seul langage pour les deux côtés.",
          },
          {
            label: "Git et terminal",
            value:
              "Versionner, naviguer, lancer des commandes : l'outillage quotidien.",
          },
          {
            label: "SQL (bases)",
            value:
              "Créer des tables et les interroger : voir la page Bases de données.",
          },
        ],
      },
    ],
  },
  {
    id: "verifier-outils",
    title: "Vérifier ses outils",
    level: 2,
    intro:
      "Trois commandes pour valider l'environnement de travail.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier Node.js",
        command: "node --version",
        why: "Node.js exécute le JavaScript côté serveur : c'est le runtime du backend dans ce parcours. Une version LTS récente est attendue.",
        verify: "npm --version",
      },
      {
        kind: "command",
        label: "Vérifier Git",
        command: "git --version",
        why: "Git versionne le projet dès la première ligne : chaque couche (frontend, backend, infra) évolue dans le même dépôt.",
        verify: "git status",
      },
      {
        kind: "text",
        text: "Un gestionnaire de versions de Node (type `nvm`) permet d'installer et de basculer entre versions sans toucher au système — utile quand les projets n'exigent pas la même.",
      },
    ],
  },
  {
    id: "scaffolding",
    title: "Structurer le projet",
    level: 2,
    intro:
      "L'arborescence qui sépare clairement les responsabilités.",
    blocks: [
      {
        kind: "command",
        label: "Initialiser le backend",
        command: "mkdir mon-app && cd mon-app && npm init -y",
        why: "Crée le dossier du projet et un `package.json` par défaut : le backend vit ici, avec ses dépendances et ses scripts (`dev`, `start`, `test`).",
        verify: "ls package.json",
      },
      {
        kind: "diagram",
        title: "Arborescence type",
        lines: [
          "mon-app/",
          "├── client/               (frontend : Vite, React, Next.js…)",
          "│   ├── src/",
          "│   └── package.json",
          "├── server/               (backend : API)",
          "│   ├── src/",
          "│   │   ├── routes/       (les endpoints)",
          "│   │   ├── db/           (accès base de données)",
          "│   │   └── server.js     (point d'entrée)",
          "│   └── package.json",
          "├── .env                  (secrets locaux, JAMAIS commité)",
          "├── .gitignore",
          "└── README.md             (comment lancer le projet)",
        ],
      },
      {
        kind: "text",
        text: "Deux `package.json` séparés (ou un monorepo) : le frontend et le backend ont des dépendances, des scripts et des cycles de vie différents. Les mélanger, c'est s'offrir des conflits permanents.",
      },
    ],
  },
  {
    id: "variables-environnement",
    title: "Variables d'environnement",
    level: 2,
    intro:
      "Séparer le code des secrets : la règle qui évite les catastrophes.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: ".env — jamais commité",
        code: `# .env : configuration locale, listé dans .gitignore\nPORT=3000\nDATABASE_URL=postgresql://postgres:secret@localhost:5432/monapp\nJWT_SECRET=une-valeur-longue-et-aleatoire\n# .env.example : les NOMS sans les valeurs, commité, pour documenter.`,
      },
      {
        kind: "list",
        items: [
          "Tout ce qui change entre la machine locale, la préproduction et la production va en variable d'environnement : URLs, clés, mots de passe.",
          "Le code lit `process.env.DATABASE_URL`, jamais une valeur en dur.",
          "`.env` est dans `.gitignore` ; `.env.example` (sans valeurs) est commité pour documenter.",
          "Un secret commité par accident est compromis : le révoquer et le régénérer, pas juste le supprimer du fichier.",
        ],
      },
    ],
  },
  {
    id: "premiere-api",
    title: "Première API",
    level: 2,
    intro:
      "Le plus petit backend qui répond : une route, du JSON.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Serveur Express minimal",
        code: `import express from "express";\n\nconst app = express();\napp.use(express.json()); // lit le corps JSON des requêtes\n\napp.get("/api/health", (req, res) => {\n  res.json({ status: "ok" });\n});\n\nconst port = process.env.PORT || 3000;\napp.listen(port, () => console.log("API sur le port " + port));`,
      },
      {
        kind: "command",
        label: "Installer Express et lancer",
        command: "npm install express",
        why: "Express est le framework minimal pour exposer des routes HTTP en Node.js : il route, parse et répond, sans imposer d'architecture. Après installation, lancer le serveur puis interroger la route de santé.",
        verify: "curl http://localhost:3000/api/health",
      },
      {
        kind: "text",
        text: "`/api/health` est la première route de tout projet : elle prouve que le serveur tourne et répond du JSON. On la teste avec le navigateur, `curl` ou un client REST avant d'écrire la moindre logique métier.",
      },
    ],
  },
  {
    id: "crud-rest",
    title: "CRUD REST : les cinq routes",
    level: 2,
    intro:
      "Le vocabulaire standard pour manipuler des ressources.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "CRUD pour des notes",
        code: `// Lister           GET    /api/notes\n// Lire une        GET    /api/notes/:id\n// Créer            POST   /api/notes        { title, content }\n// Remplacer        PUT    /api/notes/:id    { title, content }\n// Modifier partiel PATCH  /api/notes/:id    { title }\n// Supprimer        DELETE /api/notes/:id\n\napp.get("/api/notes", async (req, res) => {\n  const notes = await db.query("SELECT * FROM notes ORDER BY id");\n  res.json(notes.rows);\n});\n\napp.post("/api/notes", async (req, res) => {\n  const { title, content } = req.body;\n  if (!title) return res.status(400).json({ error: "title requis" });\n  const created = await db.query(\n    "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",\n    [title, content || null]\n  );\n  res.status(201).json(created.rows[0]);\n});`,
      },
      {
        kind: "text",
        text: "À noter : validation de l'entrée (`title` requis → 400), requête paramétrée (jamais de concaténation SQL), code 201 pour une création. Ces trois réflexes s'appliquent à chaque route d'écriture.",
      },
    ],
  },
  {
    id: "frontend-fetch",
    title: "Brancher le frontend",
    level: 2,
    intro:
      "Le frontend consomme l'API : `fetch`, états de chargement, erreurs.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Lire l'API depuis le navigateur",
        code: `async function getNotes() {\n  const res = await fetch("/api/notes");\n  if (!res.ok) throw new Error("Erreur " + res.status);\n  return res.json();\n}\n\n// Dans le composant : trois états à gérer.\n// 1. chargement → spinner ; 2. succès → liste ; 3. erreur → message.`,
      },
      {
        kind: "list",
        items: [
          "Toujours tester `res.ok` : `fetch` ne rejette que sur erreur réseau, pas sur 404 ou 500.",
          "Trois états d'interface pour chaque appel : chargement, succès, erreur — jamais d'écran vide silencieux.",
          "En développement, le frontend (port 5173) appelle l'API (port 3000) : le proxy ou CORS fait le pont (section suivante).",
        ],
      },
    ],
  },
  {
    id: "cors-bases",
    title: "CORS : le pont entre les deux ports",
    level: 2,
    intro:
      "Pourquoi le navigateur bloque l'appel, et comment l'autoriser proprement.",
    blocks: [
      {
        kind: "text",
        text: "Le navigateur applique la same-origin policy : une page servie depuis `localhost:5173` ne peut pas appeler `localhost:3000` sans autorisation explicite. CORS est cette autorisation : le serveur déclare quelles origines ont le droit de l'appeler, via l'en-tête `Access-Control-Allow-Origin`.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Autoriser le frontend local",
        code: `// En développement : autoriser l'origine exacte du frontend.\napp.use((req, res, next) => {\n  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");\n  next();\n});\n// En production : l'origine du vrai domaine, jamais "*"\n// quand des identifiants (cookies) sont envoyés.`,
      },
      {
        kind: "text",
        text: "Alternative en développement : le proxy du bundler (le frontend redirige `/api` vers le backend) — le navigateur ne voit qu'une seule origine et CORS disparaît. En production, frontend et backend sont souvent servis sous le même domaine.",
      },
    ],
  },
  {
    id: "auth-apercu",
    title: "Authentification : l'aperçu full stack",
    level: 2,
    intro:
      "Où l'authentification se branche dans la chaîne.",
    blocks: [
      {
        kind: "diagram",
        title: "Le flux de connexion",
        lines: [
          "Frontend                      Backend                    Base",
          "   │                             │                       │",
          "   │ POST /api/login {email, pw}   │                       │",
          "   │────────────────────────────►│                       │",
          "   │                             │── cherche l'utilisateur",
          "   │                             │──────────────────────►│",
          "   │                             │◄──── hash stocké ─────│",
          "   │                             │ vérifie le mot de passe",
          "   │◄─── cookie de session ───────│                       │",
          "   │   (HttpOnly, Secure)        │                       │",
          "   │                             │",
          "   │ GET /api/notes + cookie     │",
          "   │────────────────────────────►│── session valide ? ───►│",
          "   │◄────── les notes ────────────│                       │",
        ],
      },
      {
        kind: "text",
        text: "Le détail des mécanismes (hachage, sessions, JWT, OAuth) est l'objet de la page Authentification. Ici, l'essentiel architectural : le frontend ne décide jamais qui est connecté — il présente des identifiants et transporte la preuve ; le backend vérifie à chaque requête protégée.",
      },
    ],
  },
  {
    id: "bdd-branchement",
    title: "Brancher la base de données",
    level: 2,
    intro:
      "Le backend lit sa connexion dans l'environnement, pas dans le code.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Connexion via DATABASE_URL",
        code: `// db.js : un seul endroit crée le pool de connexions.\nimport pg from "pg";\n\nexport const db = new pg.Pool({\n  connectionString: process.env.DATABASE_URL,\n});\n\n// Les routes importent db et exécutent des requêtes paramétrées.`,
      },
      {
        kind: "list",
        items: [
          "Un pool partagé : les connexions sont réutilisées, pas recréées à chaque requête.",
          "La chaîne de connexion vient de `DATABASE_URL` : locale, préprod et prod diffèrent sans changer le code.",
          "Requêtes paramétrées systématiques : l'injection SQL se prévient ici, une fois pour toutes.",
        ],
      },
    ],
  },
  {
    id: "deploiement-apercu",
    title: "Déploiement : l'aperçu",
    level: 2,
    intro:
      "Mettre en ligne : les pièces du puzzle avant le détail.",
    blocks: [
      {
        kind: "diagram",
        title: "Du dépôt au produit en ligne",
        lines: [
          "Dépôt Git",
          "   │ push",
          "   ▼",
          "Build : frontend → fichiers statiques ; backend → image/start",
          "   │",
          "   ▼",
          "Hébergeur : sert le frontend + exécute l'API + base managée",
          "   │",
          "   ▼",
          "Domaine + HTTPS → utilisateurs",
          "",
          "Variables d'environnement de PROD configurées sur l'hébergeur",
          "(jamais les valeurs locales)",
        ],
      },
      {
        kind: "fields",
        title: "Les décisions",
        fields: [
          { label: "Frontend statique", value: "Les fichiers buildés (HTML/CSS/JS) sont servis par un CDN ou un hébergeur statique : rapide, peu cher, très fiable." },
          { label: "Backend", value: "Un service qui tourne en continu (conteneur, PaaS) : il expose l'API et se connecte à la base." },
          { label: "Base managée", value: "En production, on loue une base gérée (sauvegardes, mises à jour incluses) plutôt que d'administrer un serveur." },
          { label: "HTTPS partout", value: "Certificat TLS sur le domaine : non négociable dès qu'il y a des identifiants." },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Quatre projets qui assemblent progressivement toute la chaîne.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Liste de tâches",
        fields: [
          { label: "Stack", value: "API Express + SQLite/PostgreSQL, frontend simple, CRUD complet." },
          { label: "Compétences", value: "Routes REST, fetch, formulaires, persistance." },
          { label: "Difficulté", value: "Faible — une semaine" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Notes partagées avec comptes",
        fields: [
          { label: "Stack", value: "Précédent + authentification (sessions), pages login/register, notes privées par utilisateur." },
          { label: "Compétences", value: "Hachage, sessions, autorisation (mes notes uniquement), variables d'environnement." },
          { label: "Difficulté", value: "Moyenne — deux à trois semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — SaaS miniature déployé",
        fields: [
          { label: "Stack", value: "Précédent + déploiement réel, domaine, HTTPS, base managée, tests." },
          { label: "Compétences", value: "Build, CI, migrations, sauvegardes, monitoring, gestion d'erreurs." },
          { label: "Difficulté", value: "Élevée — un mois" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Application complète en équipe",
        fields: [
          { label: "Stack", value: "Monorepo, revue de code, CI/CD, environnements multiples, observabilité." },
          { label: "Compétences", value: "Architecture, conventions, documentation, exploitation." },
          { label: "Difficulté", value: "Professionnelle — plusieurs mois" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-tiers",
    title: "Architecture en couches",
    level: 3,
    intro: "Organiser le backend pour qu'il reste compréhensible quand il grandit.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois couches du backend",
        lines: [
          "Requête HTTP",
          "    │",
          "    ▼",
          "ROUTES — quoi : quelle URL, quelle méthode, qui a le droit",
          "    │      (validation des entrées, authentification)",
          "    ▼",
          "SERVICES — comment : la logique métier (créer, calculer, orchestrer)",
          "    │      (aucune notion de HTTP ici)",
          "    ▼",
          "DATA — où : l'accès aux données (requêtes SQL, transactions)",
          "    │      (aucune notion de métier ici)",
          "    ▼",
          "Base de données",
        ],
      },
      {
        kind: "text",
        text: "La séparation compte plus que les noms : les routes ne contiennent pas de SQL, les accès données ne connaissent pas HTTP. Quand la logique métier est testable sans serveur HTTP ni base réelle, l'architecture est saine.",
      },
    ],
  },
  {
    id: "monolithe-vs-microservices",
    title: "Monolithe vs microservices",
    level: 3,
    intro: "Le choix d'architecture le plus débattu — tranché pragmatiquement.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Monolithe modulaire", "Microservices"],
        rows: [
          ["Déploiement", "Un seul : simple", "Indépendants : flexible mais complexe"],
          ["Communication", "Appels internes (rapides, fiables)", "Réseau (latence, pannes partielles)"],
          ["Données", "Une base, transactions ACID", "Bases par service, cohérence éventuelle"],
          ["Équipe", "Petite à moyenne", "Plusieurs équipes autonomes"],
          ["Complexité", "Dans le code (à discipliner)", "Dans l'infrastructure (à opérer)"],
        ],
      },
      {
        kind: "text",
        text: "La règle : commencer monolithe modulaire (modules bien séparés dans un seul déploiement), et n'extraire un service que lorsqu'une frontière s'impose d'elle-même — équipe dédiée, charge très différente, cycle de déploiement incompatible. Le monolithe bien découpé se divise plus tard ; les microservices prématurés se réunissent rarement.",
      },
    ],
  },
  {
    id: "rest-principes",
    title: "Principes REST",
    level: 3,
    intro: "Ce qui fait une API prévisible plutôt qu'une collection de routes ad hoc.",
    blocks: [
      {
        kind: "fields",
        title: "Les principes",
        fields: [
          { label: "Ressources nommées", value: "Des noms (`/api/notes/42`), pas des verbes (`/api/getNote`) : le verbe est déjà dans la méthode HTTP." },
          { label: "Méthodes sémantiques", value: "`GET` lit (sans effet), `POST` crée, `PUT` remplace, `PATCH` modifie partiellement, `DELETE` supprime." },
          { label: "Stateless", value: "Chaque requête porte son contexte (session, jeton) : le serveur ne « se souvient » pas entre deux appels." },
          { label: "Codes de statut", value: "Le statut HTTP dit le résultat : le corps JSON donne le détail. Ne pas tout renvoyer en 200." },
          { label: "Représentations", value: "La même ressource peut se rendre en JSON, avec les champs nécessaires — ni plus (données sensibles), ni moins." },
        ],
      },
    ],
  },
  {
    id: "codes-http",
    title: "Codes HTTP essentiels",
    level: 3,
    intro: "Le vocabulaire des réponses : chaque code a un sens précis.",
    blocks: [
      {
        kind: "table",
        headers: ["Code", "Sens", "Usage typique"],
        rows: [
          ["200", "OK", "Lecture réussie, mise à jour réussie"],
          ["201", "Created", "Création réussie (avec la ressource créée en réponse)"],
          ["204", "No Content", "Suppression réussie, rien à renvoyer"],
          ["400", "Bad Request", "Entrée invalide (validation échouée)"],
          ["401", "Unauthorized", "Non authentifié : identifiants manquants ou invalides"],
          ["403", "Forbidden", "Authentifié mais non autorisé"],
          ["404", "Not Found", "Ressource inexistante"],
          ["409", "Conflict", "Conflit d'état : doublon, version obsolète"],
          ["422", "Unprocessable Entity", "Syntaxe OK mais sémantique invalide"],
          ["500", "Internal Server Error", "Erreur serveur non gérée — jamais de détail interne au client"],
        ],
      },
    ],
  },
  {
    id: "validation-entrees",
    title: "Validation des entrées",
    level: 3,
    intro: "Ne jamais faire confiance au client : valider à la frontière.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Valider avant toute logique",
        code: `app.post("/api/notes", async (req, res) => {\n  const { title, content } = req.body ?? {};\n\n  if (typeof title !== "string" || title.trim().length === 0) {\n    return res.status(400).json({ error: "title: chaîne non vide requise" });\n  }\n  if (title.length > 200) {\n    return res.status(400).json({ error: "title: 200 caractères maximum" });\n  }\n  if (content !== undefined && typeof content !== "string") {\n    return res.status(400).json({ error: "content: chaîne ou absent" });\n  }\n  // ... seulement ici, la logique métier.\n});`,
      },
      {
        kind: "text",
        text: "Valider type, présence, longueur et format avant toute logique — et valider aussi côté base via les contraintes. La validation frontend améliore l'UX mais ne protège de rien : l'attaquant appelle l'API directement.",
      },
    ],
  },
  {
    id: "erreurs-api",
    title: "Gestion d'erreurs de l'API",
    level: 3,
    intro: "Des erreurs prévisibles pour le client, informatives pour le développeur.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Format d'erreur constant",
        code: `// Toujours la même forme : { error: "message lisible" }\nres.status(404).json({ error: "Note introuvable" });\n\n// Erreurs inattendues : log complet côté serveur, message générique côté client.\napp.use((err, req, res, next) => {\n  console.error(err); // stack trace : pour nous\n  res.status(500).json({ error: "Erreur interne" }); // pour le client\n});`,
      },
      {
        kind: "list",
        items: [
          "Format constant : le frontend sait toujours où lire le message.",
          "Jamais de stack trace ni de détail SQL au client : c'est de l'information pour l'attaquant.",
          "Logger l'erreur complète côté serveur avec un identifiant de requête pour la retrouver.",
          "Distinguer les erreurs métier (400, 404, 409) des bugs (500) : les premières sont documentées, les secondes sont des incidents.",
        ],
      },
    ],
  },
  {
    id: "pagination",
    title: "Pagination",
    level: 3,
    intro: "Ne jamais renvoyer « tout » : paginer dès que la liste peut grandir.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Pagination par offset (simple) et par curseur (robuste)",
        code: `// Offset : simple, mais lent sur les grandes pages et instable si ça bouge.\n// GET /api/notes?page=3&limit=20\nconst page = Math.max(1, parseInt(req.query.page) || 1);\nconst limit = Math.min(100, parseInt(req.query.limit) || 20);\nconst offset = (page - 1) * limit;\n\n// Curseur : WHERE id > dernier_id, stable et rapide avec un index.\n// GET /api/notes?after=150&limit=20\n// → WHERE id > 150 ORDER BY id LIMIT 20`,
      },
      {
        kind: "text",
        text: "La réponse inclut les métadonnées utiles : nombre total, page courante, lien ou curseur vers la suite. L'offset suffit pour un back-office ; le curseur gagne dès que les données bougent ou que le volume compte.",
      },
    ],
  },
  {
    id: "authentification-detail",
    title: "Authentification : sessions vs JWT",
    level: 3,
    intro: "Le choix structurant, résumé pour l'architecte full stack.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Sessions serveur", "JWT"],
        rows: [
          ["État", "Stocké côté serveur", "Auto-porteur, sans état"],
          ["Révocation", "Immédiate (supprimer la session)", "Difficile (TTL court + refresh)"],
          ["Échelle", "Nécessite un store partagé", "Naturellement horizontale"],
          ["Transport", "Cookie HttpOnly", "Cookie ou en-tête Authorization"],
          ["Idéal pour", "Applications web classiques", "API stateless, microservices"],
        ],
      },
      {
        kind: "text",
        text: "Le détail complet (hachage, OAuth, MFA, refresh rotation) est dans la page Authentification. Retenir ici : le choix se fait selon le besoin de révocation et l'architecture — beaucoup d'applications combinent JWT court + refresh révocable.",
      },
    ],
  },
  {
    id: "autorisation-rbac",
    title: "Autorisation : RBAC",
    level: 3,
    intro: "Qui peut faire quoi : le contrôle d'accès basé sur les rôles.",
    blocks: [
      {
        kind: "fields",
        title: "Les concepts",
        fields: [
          { label: "Rôles", value: "Des casquettes (`admin`, `editor`, `viewer`) attribuées aux utilisateurs : on gère des rôles, pas des individus." },
          { label: "Permissions", value: "Des actions (`notes:write`, `users:delete`) accordées aux rôles : fines et nommées explicitement." },
          { label: "Vérification systématique", value: "Chaque route protégée vérifie le rôle — pas seulement l'interface qui cache le bouton. Le frontend guide, le backend décide." },
          { label: "Propriété", value: "Au-delà des rôles : « mes notes » vs « les notes » — vérifier que la ressource appartient bien à l'utilisateur." },
        ],
      },
    ],
  },
  {
    id: "securite-api",
    title: "Sécurité de l'API : la checklist",
    level: 3,
    intro: "Les contrôles à passer sur chaque API avant la production.",
    blocks: [
      {
        kind: "list",
        items: [
          "HTTPS uniquement : rediriger tout le HTTP vers HTTPS.",
          "Validation de toutes les entrées : type, longueur, format — côté serveur.",
          "Requêtes SQL paramétrées : aucune concaténation.",
          "Authentification sur toutes les routes sensibles, sans exception ni oubli.",
          "Autorisation vérifiée par ressource, pas seulement par rôle global.",
          "Limitation de débit (rate limiting) : sur le login et les routes coûteuses au minimum.",
          "En-têtes de sécurité : `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`…",
          "Secrets en variables d'environnement, jamais dans le code ni les logs.",
          "Gestion d'erreurs qui ne fuit pas d'internals.",
          "Dépendances à jour : les vulnérabilités arrivent souvent par les bibliothèques.",
        ],
      },
    ],
  },
  {
    id: "frontend-structure",
    title: "Structurer le frontend",
    level: 3,
    intro: "Le pendant de l'architecture backend, côté interface.",
    blocks: [
      {
        kind: "diagram",
        title: "Découpage du frontend",
        lines: [
          "client/src/",
          "├── components/     (boutons, champs, cartes : l'UI réutilisable)",
          "├── pages/          (les écrans : assemblent composants + données)",
          "├── api/            (les appels : un module par ressource)",
          "├── hooks/          (la logique partagée : useNotes, useAuth…)",
          "├── state/          (l'état global, si nécessaire)",
          "└── styles/         (thème, utilitaires)",
          "",
          "Règle : les composants affichent, les modules api parlent au réseau,",
          "les hooks orchestrent. Un composant qui fetch, transforme et affiche",
          "fait trois métiers — le découper.",
        ],
      },
    ],
  },
  {
    id: "etat-frontend",
    title: "État local vs état serveur",
    level: 3,
    intro: "La distinction qui simplifie toute la gestion d'état.",
    blocks: [
      {
        kind: "fields",
        title: "Deux natures d'état",
        fields: [
          { label: "État serveur", value: "Les données de l'API (notes, utilisateur) : possédées par le serveur, mises en cache côté client, avec chargement, erreur, et rafraîchissement. C'est 80 % de « l'état » d'une app." },
          { label: "État local", value: "L'UI éphémère (menu ouvert, champ en cours de saisie) : vit et meurt dans le composant, jamais dans un store global." },
          { label: "La règle", value: "Ne mettre en état global que ce qui est vraiment partagé par des zones éloignées (utilisateur connecté, thème). Le reste : local ou cache serveur." },
        ],
      },
    ],
  },
  {
    id: "temps-reel",
    title: "Temps réel : polling, SSE, WebSocket",
    level: 3,
    intro: "Quand l'interface doit suivre le vivant : trois techniques.",
    blocks: [
      {
        kind: "fields",
        title: "Comparatif",
        fields: [
          { label: "Polling", value: "Le client réinterroge toutes les N secondes. Simple, universel — mais requêtes inutiles et latence de N secondes. Suffit pour « à peu près à jour »." },
          { label: "SSE (Server-Sent Events)", value: "Le serveur pousse des événements sur une connexion HTTP longue. Unidirectionnel (serveur → client), simple, auto-reconnexion native. Idéal pour notifications, flux." },
          { label: "WebSocket", value: "Canal bidirectionnel persistant. Puissant (chat, collaboration, jeux) — mais connexion à maintenir, à scaler et à sécuriser." },
        ],
      },
      {
        kind: "text",
        text: "Choisir la technique la plus simple qui satisfait le besoin réel : la plupart des « temps réel » se contentent de SSE ou même de polling. WebSocket est un engagement d'infrastructure.",
      },
    ],
  },
  {
    id: "uploads-fichiers",
    title: "Upload de fichiers",
    level: 3,
    intro: "Les fichiers ne vivent pas en base : le pattern standard.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le client envoie le fichier (`multipart/form-data`) ; le serveur valide (type, taille, contenu réel).",
          "Stockage dans un service objet (S3 ou équivalent), pas dans la base : la base ne garde que l'URL/la référence.",
          "URLs signées pour l'upload direct : le client envoie vers le stockage sans transiter par le serveur — le serveur ne fait que signer.",
          "Antivirus et limites de taille : un upload est une porte d'entrée comme une autre.",
        ],
      },
    ],
  },
  {
    id: "bdd-choix",
    title: "Choisir sa base",
    level: 3,
    intro: "Le rappel architectural : la base se choisit, elle ne se subit pas.",
    blocks: [
      {
        kind: "table",
        headers: ["Besoin", "Choix typique"],
        rows: [
          ["Données métier structurées", "Relationnel (PostgreSQL par défaut)"],
          ["Prototype rapide, schéma mouvant", "SQLite local, puis relationnel"],
          ["Cache, sessions, compteurs", "Clé-valeur (Redis)"],
          ["Documents hétérogènes", "Base document (MongoDB)"],
          ["Recherche plein texte", "Moteur de recherche dédié"],
        ],
      },
      {
        kind: "text",
        text: "Le détail est dans la page Bases de données. Ici : une application combine souvent relationnel + cache, et c'est normal — chaque besoin a sa famille.",
      },
    ],
  },
  {
    id: "tests-pyramide",
    title: "Tests : la pyramide",
    level: 3,
    intro: "Quoi tester, à quel niveau, dans quelles proportions.",
    blocks: [
      {
        kind: "diagram",
        title: "La pyramide des tests",
        lines: [
          "            /\\",
          "           /e2e\\          Peu : parcours critiques (login, paiement)",
          "          /------\\       (navigateur réel, lents, fragiles)",
          "         /  API   \\      Moyennement : chaque route (statuts, erreurs, auth)",
          "        /----------\\    (rapides, stables, grande valeur)",
          "       /  UNITAIRES \\    Beaucoup : logique métier pure, validation, utils",
          "      /--------------\\  (très rapides, première défense)",
        ],
      },
      {
        kind: "command",
        label: "Lancer les tests",
        command: "npm test",
        why: "La convention : `npm test` exécute la suite du projet (script défini dans `package.json`). La CI lance exactement cette commande — aucun test « qui ne marche qu'en local ».",
        verify: "npm test -- --coverage",
      },
    ],
  },
  {
    id: "ci-cd",
    title: "CI/CD pour full stack",
    level: 3,
    intro: "Automatiser la vérification et la livraison des deux côtés.",
    blocks: [
      {
        kind: "diagram",
        title: "Pipeline typique",
        lines: [
          "push sur main",
          "    │",
          "    ▼",
          "INSTALL — npm ci (frontend + backend, versions verrouillées)",
          "    │",
          "    ▼",
          "VÉRIFIER — lint + typecheck + tests (les deux côtés)",
          "    │",
          "    ▼",
          "BUILD — frontend statique + backend prêt",
          "    │",
          "    ▼",
          "DÉPLOYER — preview par PR, production sur main verte",
        ],
      },
      {
        kind: "command",
        label: "Installation reproductible en CI",
        command: "npm ci",
        why: "`npm ci` installe exactement les versions du lockfile (et échoue s'il diverge) : la CI rejoue un environnement identique à chaque exécution, contrairement à `npm install` qui peut résoudre différemment.",
      },
    ],
  },
  {
    id: "dockerfile",
    title: "Dockerfile pour le backend",
    level: 3,
    intro: "Empaqueter l'API de façon reproductible.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Dockerfile Node.js",
        code: `FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY server/ ./server/\nEXPOSE 3000\nCMD ["node", "server/server.js"]`,
      },
      {
        kind: "fields",
        title: "Lire le fichier",
        fields: [
          { label: "Image légère", value: "`node:22-alpine` : le runtime sans le superflu — image petite, surface d'attaque réduite." },
          { label: "Cache des couches", value: "`COPY package*.json` puis `npm ci` avant le code : les dépendances ne sont réinstallées que si elles changent." },
          { label: "`--omit=dev`", value: "Pas d'outils de développement en production : moins de poids, moins de risques." },
          { label: "Configuration externe", value: "Aucun secret dans l'image : tout arrive par variables d'environnement au lancement." },
        ],
      },
    ],
  },
  {
    id: "compose-dev",
    title: "Docker Compose en développement",
    level: 3,
    intro: "Toute la stack locale en une commande.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "compose.yaml : API + base",
        code: `services:\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: secret\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    ports:\n      - "5432:5432"\n  api:\n    build: ./server\n    environment:\n      DATABASE_URL: postgresql://postgres:secret@db:5432/monapp\n      PORT: 3000\n    ports:\n      - "3000:3000"\n    depends_on:\n      - db\nvolumes:\n  pgdata:`,
      },
      {
        kind: "text",
        text: "`docker compose up -d` démarre base + API avec le bon câblage (`db` comme nom d'hôte) et des données persistantes via le volume. Chaque développeur obtient le même environnement — la fin du « ça marche sur ma machine ».",
      },
    ],
  },
  {
    id: "logs-observabilite",
    title: "Logs et observabilité",
    level: 3,
    intro: "Savoir ce qui se passe vraiment en production.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois piliers",
        fields: [
          { label: "Logs", value: "Événements horodatés et structurés (JSON) : requêtes, erreurs, avec identifiant de requête pour suivre un appel de bout en bout. Jamais de secrets dedans." },
          { label: "Métriques", value: "Chiffres agrégés : requêtes/seconde, latence p95, taux d'erreur, usage mémoire — avec alertes sur seuils." },
          { label: "Tracing", value: "Suivre une requête à travers frontend → API → base : indispensable dès que ça se distribue." },
        ],
      },
      {
        kind: "text",
        text: "Le minimum viable : logs structurés centralisés + alerte sur taux d'erreur + tableau de bord des métriques clés. On ajoute le reste quand la complexité l'exige.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance : les leviers",
    level: 3,
    intro: "Où se gagnent les millisecondes, par ordre de rentabilité.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers",
        fields: [
          { label: "Base de données", value: "Index manquants, N+1, requêtes lourdes : la cause n°1 des lenteurs. Mesurer d'abord ici." },
          { label: "Cache", value: "Réponses coûteuses mises en cache (mémoire, Redis, CDN) avec invalidation pensée." },
          { label: "Frontend", value: "Bundle allégé (code splitting), images optimisées, requêtes groupées." },
          { label: "Réseau", value: "Compression, HTTP/2, CDN pour le statique, proximité géographique." },
          { label: "Backend", value: "Dernier levier le plus souvent : le code applicatif est rarement le goulot." },
        ],
      },
    ],
  },
  {
    id: "debugging-fullstack",
    title: "Déboguer à travers la stack",
    level: 3,
    intro: "La méthode quand « ça ne marche pas » sans précision.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Reproduire", detail: "Le plus petit cas qui échoue, à chaque fois. Sans reproduction fiable, on tâtonne." },
          { title: "Localiser la couche", detail: "L'API répond-elle (onglet réseau) ? La requête SQL s'exécute-t-elle (client SQL) ? Le frontend affiche-t-il ce qu'il reçoit (console) ?" },
          { title: "Lire les erreurs exactes", detail: "Statut HTTP, message d'erreur, logs serveur avec l'identifiant de requête — pas d'interprétation, les faits." },
          { title: "Isoler", detail: "Tester l'API sans le frontend (curl), la requête sans l'API (psql), le composant avec des données factices." },
          { title: "Vérifier l'environnement", detail: "Variables d'environnement, versions, CORS, réseau : la moitié des « bugs » en développement sont de la configuration." },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Le catalogue des fautes full stack.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Secrets committés",
            value:
              "Problem : clés et mots de passe dans Git. Better : `.env` ignoré, `.env.example` documenté, secrets révoqués si exposés.",
          },
          {
            label: "CORS en * en production",
            value:
              "Problem : n'importe quel site peut appeler l'API avec les identifiants. Better : origines exactes, jamais de wildcard avec credentials.",
          },
          {
            label: "Validation uniquement frontend",
            value:
              "Problem : l'attaquant appelle l'API directement. Better : valider côté serveur, toujours.",
          },
          {
            label: "N+1",
            value:
              "Problem : 101 requêtes au lieu d'une jointure. Better : joindre, charger en masse, profiler.",
          },
          {
            label: "Pas de gestion d'erreurs API",
            value:
              "Problem : crash serveur = page blanche + stack trace au client. Better : format d'erreur constant, 500 générique, logs complets.",
          },
          {
            label: "Migrations oubliées au déploiement",
            value:
              "Problem : le code attend des colonnes qui n'existent pas en prod. Better : migrations dans le pipeline, avant le démarrage.",
          },
          {
            label: "État global pour tout",
            value:
              "Problem : store ingérable, re-rendus en cascade. Better : local par défaut, global pour le vraiment partagé.",
          },
          {
            label: "Pas de limite de débit",
            value:
              "Problem : brute force et abus sans frein. Better : rate limiting au minimum sur auth et routes coûteuses.",
          },
          {
            label: "Logs avec données sensibles",
            value:
              "Problem : mots de passe et jetons dans les journaux. Better : ne jamais logger les secrets, structurer les logs.",
          },
          {
            label: "« Ça marche en local »",
            value:
              "Problem : environnements divergents. Better : Compose/Docker en dev, CI identique, variables par environnement.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Les réflexes d'un full stack fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Séparer les responsabilités : routes, métier, données — des deux côtés.",
          "Valider à la frontière serveur, paramétrer le SQL, vérifier l'autorisation par ressource.",
          "Secrets hors du code, configuration par environnement.",
          "Tester la pyramide : beaucoup d'unitaires, des tests d'API, peu d'e2e ciblés.",
          "CI qui rejoue tout : lint, types, tests, build — à chaque push.",
          "Migrations versionnées, sauvegardes testées, logs sans secrets.",
          "Documenter : README pour lancer, API pour consommer, ADRs pour les choix.",
          "Mesurer avant d'optimiser : la base d'abord, le cache ensuite.",
          "Penser révocation et observabilité dès la conception, pas après l'incident.",
          "Rester simple : monolithe modulaire d'abord, distribué si prouvé nécessaire.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "Node.js", value: "https://nodejs.org/docs/latest/api/ — la référence du runtime backend." },
          { label: "Next.js", value: "https://nextjs.org/docs — le framework React full stack : routing, API routes, rendu." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pages liées de cette plateforme : Authentification, Bases de données, Docker, Git, Sécurité web.",
          "Pratique : déployer chaque projet de cette page pour de vrai — le déploiement est une compétence, pas une formalité.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le full stack maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Creuser le backend : `nodejs` — streams, workers, performance.",
          "Creuser le frontend : `react` — patterns avancés, performance.",
          "Typer de bout en bout : `typescript` — un seul langage, zéro `any`.",
          "Données sérieuses : `postgresql` — administration et optimisation.",
          "Industrialiser : `docker` puis `github-actions` — conteneurs et CI/CD.",
          "Sécuriser : `authentication` — aller au fond des mécanismes.",
        ],
      },
    ],
  },
];

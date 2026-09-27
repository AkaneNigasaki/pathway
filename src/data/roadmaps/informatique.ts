import type { Roadmap, Skill } from "../../types";

/**
 * Carte Informatique — la carte interactive de tout l'écosystème :
 * langages, outils, plateformes et spécialisations, reliés par leurs
 * dépendances réelles. Les connexions du graphe sont générées
 * automatiquement à partir des prérequis.
 */

const S = (
  id: string,
  name: string,
  tagline: string,
  description: string,
  level: Skill["level"],
  stage: string,
  type: Skill["type"],
  prerequisites: string[],
  concepts: string[],
  projects: string[],
  resources: Skill["resources"],
  duration: string,
  relatedSkills: string[] = []
): Skill => ({
  id,
  name,
  tagline,
  description,
  level,
  stage,
  type,
  prerequisites,
  relatedSkills,
  concepts,
  projects,
  resources,
  duration,
});

const DOC = (title: string, provider: string, url: string) => ({ title, provider, url });

const FONDATIONS: Skill[] = [
  S(
    "culture-info",
    "Culture informatique",
    "Comprendre la machine",
    "Les fondamentaux : ce qu'est un ordinateur, un système d'exploitation, un réseau et un programme. Le socle sur lequel tout le reste se construit.",
    "beginner", "fondations", "concept", [],
    ["Systèmes d'exploitation", "Binaire", "Réseaux", "Algorithmes", "Compilation", "Cloud"],
    ["Installer Linux sur une machine virtuelle", "Expliquer comment une page web s'affiche"],
    [DOC("CS50 — Introduction à l'informatique", "Harvard", "https://cs50.harvard.edu/x/"), DOC("Culture informatique — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Informatique")],
    "2 semaines"
  ),
  S(
    "algorithms",
    "Algorithmique",
    "Penser en algorithmes",
    "Décomposer un problème en étapes précises et efficaces. Complexité, tris, recherche : la grammaire de la programmation.",
    "beginner", "fondations", "concept", ["culture-info"],
    ["Complexité", "Tri", "Recherche", "Récursivité", "Structures de contrôle", "Pseudocode"],
    ["Implémenter tri à bulles et tri rapide", "Résoudre 20 problèmes sur une plateforme d'exercices"],
    [DOC("Algorithme — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Algorithme"), DOC("Khan Academy — Algorithmes", "Khan Academy", "https://fr.khanacademy.org/computing/computer-science/algorithms")],
    "3 semaines", ["data-structures"]
  ),
  S(
    "data-structures",
    "Structures de données",
    "Organiser l'information",
    "Tableaux, listes, piles, files, arbres, tables de hachage : choisir la bonne structure change tout en performance.",
    "beginner", "fondations", "concept", ["algorithms"],
    ["Tableaux", "Listes chaînées", "Piles & files", "Arbres", "Tables de hachage", "Graphes"],
    ["Implémenter une table de hachage", "Modéliser un réseau social en graphe"],
    [DOC("Structure de données — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Structure_de_donn%C3%A9es"), DOC("Visualgo — visualisations", "Visualgo", "https://visualgo.net/fr")],
    "3 semaines", ["algorithms", "cpp"]
  ),
  S(
    "linux",
    "Linux",
    "Le système des serveurs",
    "Le système d'exploitation qui fait tourner l'immense majorité du web. Naviguer, administrer, comprendre les permissions et les processus.",
    "beginner", "fondations", "tool", ["culture-info"],
    ["Terminal", "Permissions", "Processus", "Paquets", "SSH", "Système de fichiers"],
    ["Administrer un VPS", "Écrire un script de sauvegarde"],
    [DOC("Linux Journey", "linuxjourney.com", "https://linuxjourney.com/"), DOC("Documentation Ubuntu", "Canonical", "https://doc.ubuntu-fr.org/")],
    "1 mois", ["bash", "docker", "networking"]
  ),
  S(
    "bash",
    "Bash",
    "Automatiser le terminal",
    "Le langage du shell Linux : enchaîner des commandes, écrire des scripts, automatiser les tâches répétitives.",
    "beginner", "fondations", "language", ["linux"],
    ["Pipes", "Variables", "Boucles", "Scripts", "Cron", "Expressions régulières"],
    ["Script de déploiement", "Automatiser ses sauvegardes avec cron"],
    [DOC("Manuel Bash", "GNU", "https://www.gnu.org/software/bash/manual/"), DOC("Bash Guide", "linuxjourney.com", "https://linuxjourney.com/lesson/the-shell")],
    "2 semaines", ["linux", "ansible"]
  ),
  S(
    "git",
    "Git",
    "Versionner son code",
    "Le gestionnaire de versions incontournable : commits, branches, merges. Travailler seul ou à cinquante sans jamais perdre de code.",
    "beginner", "fondations", "tool", ["culture-info"],
    ["Commits", "Branches", "Merge & rebase", "Remotes", "Conflits", "Workflows"],
    ["Versionner un projet personnel", "Contribuer à un projet open source"],
    [DOC("Documentation Git", "git-scm.com", "https://git-scm.com/doc"), DOC("Pro Git (livre)", "git-scm.com", "https://git-scm.com/book/fr/v2")],
    "2 semaines", ["github", "cicd"]
  ),
  S(
    "http",
    "HTTP",
    "Le protocole du web",
    "Requêtes, réponses, codes de statut, headers : le dialogue entre client et serveur qui sous-tend chaque page et chaque API.",
    "beginner", "fondations", "concept", ["culture-info"],
    ["Méthodes", "Codes de statut", "Headers", "HTTPS", "Cookies", "Cache"],
    ["Inspecter des requêtes dans l'onglet réseau", "Construire un mini-serveur HTTP"],
    [DOC("HTTP — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/HTTP"), DOC("HTTP — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Hypertext_Transfer_Protocol")],
    "1 semaine", ["rest", "webhooks", "nginx"]
  ),
  S(
    "networks",
    "Réseaux",
    "Comment les machines communiquent",
    "Modèle OSI, TCP/IP, DNS, adressage : comprendre ce qui se passe entre le clic et la réponse du serveur.",
    "beginner", "fondations", "concept", ["culture-info"],
    ["TCP/IP", "DNS", "Adressage IP", "Modèle OSI", "Ports", "Routage"],
    ["Analyser du trafic avec Wireshark", "Configurer un réseau local"],
    [DOC("Réseau informatique — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/R%C3%A9seau_informatique"), DOC("Cours réseaux — Cisco", "Cisco", "https://www.cisco.com/")],
    "1 mois", ["networking", "cybersecurity"]
  ),
  S(
    "json",
    "JSON",
    "Le format d'échange universel",
    "Le format de données du web : lisible, léger, supporté partout. APIs, configuration, stockage : JSON est omniprésent.",
    "beginner", "fondations", "concept", ["http"],
    ["Objets", "Tableaux", "Types", "Parsing", "Schémas", "Sérialisation"],
    ["Consommer une API publique", "Valider des payloads JSON"],
    [DOC("JSON.org", "json.org", "https://www.json.org/json-fr.html"), DOC("JSON — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON")],
    "3 jours", ["rest", "webhooks"]
  ),
  S(
    "rest",
    "API REST",
    "Concevoir des APIs",
    "L'architecture des APIs web : ressources, verbes HTTP, statuts, pagination, authentification. Le contrat entre frontend et backend.",
    "intermediate", "fondations", "concept", ["http", "json"],
    ["Ressources", "Verbes HTTP", "Statuts", "Pagination", "Authentification", "Versioning"],
    ["Concevoir une API de blog", "Documenter une API avec OpenAPI"],
    [DOC("REST — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Glossaire/REST"), DOC("RESTful API Design", "restfulapi.net", "https://restfulapi.net/")],
    "2 semaines", ["webhooks", "postman", "api-integration"]
  ),
  S(
    "webhooks",
    "Webhooks",
    "Des callbacks HTTP",
    "Recevoir des événements en temps réel : au lieu d'interroger une API, c'est elle qui vous appelle quand quelque chose se passe.",
    "intermediate", "fondations", "concept", ["http", "rest"],
    ["Événements", "Endpoints", "Signatures", "Retry", "Idempotence", "Sécurité"],
    ["Recevoir des notifications Stripe", "Déclencher un workflow n8n via webhook"],
    [DOC("Webhooks — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Webhook"), DOC("Webhooks expliqués", "Svix", "https://www.svix.com/resources/guides/what-are-webhooks/")],
    "1 semaine", ["n8n", "make", "api-integration"]
  ),
  S(
    "databases",
    "Bases de données",
    "Stocker et interroger",
    "Relationnel, document, clé-valeur : les grandes familles de stockage et quand les utiliser. La donnée est au cœur de toute application.",
    "beginner", "fondations", "concept", ["culture-info"],
    ["Relationnel", "NoSQL", "Index", "Transactions", "Modélisation", "Sauvegarde"],
    ["Modéliser une base e-commerce", "Comparer SQL et NoSQL sur un cas concret"],
    [DOC("Base de données — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Base_de_donn%C3%A9es"), DOC("DB-Engines — panorama", "DB-Engines", "https://db-engines.com/en/ranking")],
    "2 semaines", ["sql", "postgresql", "mongodb"]
  ),
  S(
    "sql",
    "SQL",
    "Interroger les données",
    "Le langage des bases relationnelles depuis 50 ans : SELECT, JOIN, agrégations. Une compétence qui ne se démode pas.",
    "beginner", "fondations", "language", ["databases"],
    ["SELECT", "JOIN", "Agrégations", "Sous-requêtes", "Index", "Transactions"],
    ["Analyser un jeu de données réel", "Optimiser une requête lente"],
    [DOC("SQL.sh — cours", "sql.sh", "https://sql.sh/"), DOC("PostgreSQL Tutorial", "postgresql.org", "https://www.postgresql.org/docs/current/tutorial.html")],
    "3 semaines", ["postgresql", "mysql", "data-engineering"]
  ),
];

const DEVELOPPEMENT: Skill[] = [
  S(
    "html",
    "HTML",
    "La structure des pages",
    "Le langage de balisage du web : structurer du contenu de façon sémantique et accessible. La première brique du développement web.",
    "beginner", "developpement", "language", ["culture-info"],
    ["Sémantique", "Formulaires", "Accessibilité", "Médias", "SEO", "Balises"],
    ["Page personnelle sémantique", "Formulaire accessible complet"],
    [DOC("HTML — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/HTML"), DOC("Apprendre HTML — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Learn/HTML")],
    "2 semaines", ["css", "accessibility"]
  ),
  S(
    "accessibility",
    "Accessibilité",
    "Un web pour tout le monde",
    "Concevoir des interfaces utilisables par tous : lecteurs d'écran, navigation clavier, contrastes. Une exigence légale et éthique.",
    "intermediate", "developpement", "concept", ["html"],
    ["ARIA", "Navigation clavier", "Contrastes", "Lecteurs d'écran", "WCAG", "Focus"],
    ["Auditer un site existant", "Construire un composant 100% accessible"],
    [DOC("Accessibilité — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/Accessibility"), DOC("WCAG — W3C", "W3C", "https://www.w3.org/WAI/standards-guidelines/wcag/")],
    "2 semaines", ["html"]
  ),
  S(
    "css",
    "CSS",
    "Le style des pages",
    "Mettre en forme le web : sélecteurs, cascade, positionnement. Du style de base aux layouts complexes.",
    "beginner", "developpement", "language", ["html"],
    ["Sélecteurs", "Cascade", "Box model", "Positionnement", "Variables", "Media queries"],
    ["Reproduire une maquette", "Créer un design system miniature"],
    [DOC("CSS — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/CSS"), DOC("Apprendre CSS — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Learn/CSS")],
    "1 mois", ["responsive", "tailwind", "javascript"]
  ),
  S(
    "responsive",
    "Responsive Design",
    "S'adapter à tous les écrans",
    "Une interface qui fonctionne du mobile 360px à l'écran 4K : media queries, unités fluides, approches mobile-first.",
    "intermediate", "developpement", "concept", ["css"],
    ["Media queries", "Mobile-first", "Unités fluides", "Breakpoints", "Images responsives", "Viewport"],
    ["Rendre un site existant responsive", "Maquette mobile-first complète"],
    [DOC("Responsive — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Learn/CSS/CSS_layout/Responsive_Design"), DOC("web.dev — Responsive", "Google", "https://web.dev/learn/design/")],
    "2 semaines", ["flexbox", "css-grid"]
  ),
  S(
    "flexbox",
    "Flexbox",
    "Mise en page flexible",
    "Le module de layout unidimensionnel : aligner, distribuer, ordonner. Indispensable au quotidien.",
    "intermediate", "developpement", "concept", ["css"],
    ["Axes", "Alignement", "Distribution", "Ordre", "Wrap", "Flex sizing"],
    ["Barre de navigation complexe", "Galerie flexible"],
    [DOC("Flexbox — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/CSS/CSS_flexible_box_layout"), DOC("Flexbox Froggy (jeu)", "Codepip", "https://flexboxfroggy.com/#fr")],
    "1 semaine", ["css-grid"]
  ),
  S(
    "css-grid",
    "CSS Grid",
    "Des grilles puissantes",
    "Le layout bidimensionnel : des mises en page complexes en quelques lignes, sans framework.",
    "intermediate", "developpement", "concept", ["css"],
    ["Grilles", "Zones", "Placement", "Grilles implicites", "Subgrid", "Responsive"],
    ["Dashboard en grille", "Layout magazine"],
    [DOC("Grid — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/CSS/CSS_grid_layout"), DOC("Grid Garden (jeu)", "Codepip", "https://cssgridgarden.com/#fr")],
    "1 semaine", ["flexbox"]
  ),
  S(
    "css-animations",
    "Animations CSS",
    "Donner vie aux interfaces",
    "Transitions et keyframes : micro-interactions, feedbacks, delight. L'animation au service de l'UX, jamais gratuite.",
    "intermediate", "developpement", "concept", ["css"],
    ["Transitions", "Keyframes", "Easing", "Performance", "prefers-reduced-motion", "Micro-interactions"],
    ["Bibliothèque de micro-interactions", "Loader animé en pur CSS"],
    [DOC("Animations — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/CSS/CSS_animations"), DOC("web.dev — Animations", "Google", "https://web.dev/learn/css/animations/")],
    "2 semaines", ["javascript"]
  ),
  S(
    "javascript",
    "JavaScript",
    "Le langage du web",
    "Le langage incontournable du web, côté client comme serveur. Types, fonctions, objets, asynchrone : le cœur de l'écosystème.",
    "intermediate", "developpement", "language", ["html", "css"],
    ["Types", "Fonctions", "Objets", "Tableaux", "Asynchrone", "ES2024"],
    ["Jeu du serpent en canvas", "Todo app sans framework"],
    [DOC("JavaScript — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/JavaScript"), DOC("javascript.info", "javascript.info", "https://fr.javascript.info/")],
    "2 mois", ["typescript", "dom", "nodejs"]
  ),
  S(
    "dom",
    "DOM",
    "Manipuler la page",
    "Le Document Object Model : sélectionner, créer et modifier des éléments. Comprendre ce que les frameworks abstraient.",
    "intermediate", "developpement", "concept", ["javascript"],
    ["Sélecteurs", "Événements", "Manipulation", "Délégation", "Performance", "Shadow DOM"],
    ["Galerie interactive sans framework", "Drag & drop natif"],
    [DOC("DOM — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model"), DOC("Événements — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/Events")],
    "2 semaines", ["async-js"]
  ),
  S(
    "async-js",
    "JavaScript asynchrone",
    "Promesses et async/await",
    "Le modèle asynchrone de JS : event loop, promesses, async/await. Essentiel dès qu'on parle réseau, fichiers ou timers.",
    "intermediate", "developpement", "concept", ["javascript"],
    ["Event loop", "Promesses", "async/await", "Callbacks", "Erreurs", "Concurrence"],
    ["Client API avec retry", "Chargement parallèle de ressources"],
    [DOC("Asynchrone — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous"), DOC("Event loop — javascript.info", "javascript.info", "https://fr.javascript.info/event-loop")],
    "2 semaines", ["fetch-api"]
  ),
  S(
    "fetch-api",
    "Fetch API",
    "Appeler des APIs",
    "Dialoguer avec des serveurs depuis le navigateur : requêtes, réponses JSON, gestion d'erreurs, authentification.",
    "intermediate", "developpement", "concept", ["async-js", "http"],
    ["Requêtes", "JSON", "Headers", "Erreurs", "Auth (tokens)", "Abort"],
    ["Dashboard météo via API", "Client GitHub API paginé"],
    [DOC("Fetch — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API"), DOC("Using Fetch — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch")],
    "1 semaine", ["postman", "rest"]
  ),
  S(
    "js-modules",
    "Modules JS",
    "Organiser son code",
    "Découper une application en modules importables : la base de tout projet moderne et de tous les bundlers.",
    "intermediate", "developpement", "concept", ["javascript"],
    ["import/export", "ES Modules", "Bundlers", "Tree-shaking", "Dépendances", "Barrel files"],
    ["Refactorer une app en modules", "Publier un package npm"],
    [DOC("Modules — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules"), DOC("Modules — javascript.info", "javascript.info", "https://fr.javascript.info/modules-intro")],
    "1 semaine", ["npm", "vite", "react"]
  ),
  S(
    "npm",
    "npm",
    "Gérer ses dépendances",
    "Le registre et le gestionnaire de paquets de l'écosystème JS : installer, versionner, publier. 2 millions de paquets à portée de main.",
    "beginner", "developpement", "tool", ["javascript"],
    ["Install", "package.json", "Semver", "Scripts", "Registres", "Lockfiles"],
    ["Publier un package", "Auditer les dépendances d'un projet"],
    [DOC("Documentation npm", "npm", "https://docs.npmjs.com/"), DOC("package.json — npm", "npm", "https://docs.npmjs.com/cli/v10/configuring-npm/package-json")],
    "1 semaine", ["pnpm", "vite"]
  ),
  S(
    "pnpm",
    "pnpm",
    "Des installs rapides",
    "L'alternative rapide et économe à npm : un seul store global, des installs éclair, des monorepos propres.",
    "beginner", "developpement", "tool", ["npm"],
    ["Store global", "Monorepos", "Workspaces", "Vitesse", "Compatibilité npm", "Lockfile"],
    ["Migrer un projet npm → pnpm", "Monorepo avec workspaces"],
    [DOC("Documentation pnpm", "pnpm", "https://pnpm.io/fr/"), DOC("Workspaces — pnpm", "pnpm", "https://pnpm.io/fr/workspaces")],
    "3 jours", ["npm"]
  ),
  S(
    "vite",
    "Vite",
    "Le bundler nouvelle génération",
    "Le build tool moderne : démarrage instantané, HMR éclair, build Rollup optimisé. Le standard des nouveaux projets.",
    "intermediate", "developpement", "tool", ["npm", "javascript"],
    ["Dev server", "HMR", "Build", "Plugins", "Optimisations", "Lib mode"],
    ["Scaffolder un projet React+Vite", "Écrire un plugin Vite"],
    [DOC("Guide Vite", "Vite", "https://vite.dev/guide/"), DOC("Pourquoi Vite", "Vite", "https://vite.dev/guide/why.html")],
    "1 semaine", ["vitest", "react"]
  ),
  S(
    "eslint",
    "ESLint",
    "Un code propre et cohérent",
    "L'analyseur statique de référence : détecter les erreurs, imposer un style d'équipe, automatiser la qualité.",
    "beginner", "developpement", "tool", ["javascript"],
    ["Règles", "Configs", "Plugins", "Flat config", "CI", "Autofix"],
    ["Configurer ESLint sur un projet", "Créer une règle custom"],
    [DOC("Documentation ESLint", "ESLint", "https://eslint.org/docs/latest/"), DOC("Règles — ESLint", "ESLint", "https://eslint.org/docs/latest/rules/")],
    "1 semaine", ["prettier"]
  ),
  S(
    "prettier",
    "Prettier",
    "Formater automatiquement",
    "Le formateur de code : fini les débats sur les espaces, le style est appliqué automatiquement à chaque sauvegarde.",
    "beginner", "developpement", "tool", ["javascript"],
    ["Formatage", "Config", "Hooks pre-commit", "Intégration IDE", "ESLint", "CI"],
    ["Configurer pre-commit hooks", "Uniformiser un legacy codebase"],
    [DOC("Documentation Prettier", "Prettier", "https://prettier.io/docs/"), DOC("Options — Prettier", "Prettier", "https://prettier.io/docs/en/options.html")],
    "3 jours", ["eslint"]
  ),
  S(
    "typescript",
    "TypeScript",
    "JavaScript typé",
    "Le sur-ensemble typé de JavaScript : détecter les erreurs avant l'exécution, documenter par les types, scaler sereinement.",
    "intermediate", "developpement", "language", ["javascript"],
    ["Types", "Interfaces", "Génériques", "Union types", "Narrowing", "Strict mode"],
    ["Migrer un projet JS vers TS", "Typer une API REST de bout en bout"],
    [DOC("Documentation TypeScript", "Microsoft", "https://www.typescriptlang.org/docs/"), DOC("Handbook — TS", "Microsoft", "https://www.typescriptlang.org/docs/handbook/intro.html")],
    "1 mois", ["react", "nodejs"]
  ),
  S(
    "react",
    "React",
    "Des interfaces par composants",
    "La bibliothèque UI dominante : composants, état, effets. L'écosystème le plus riche du développement frontend.",
    "intermediate", "developpement", "framework", ["typescript", "js-modules"],
    ["Composants", "Props", "État", "Effets", "Rendu", "Écosystème"],
    ["Application de notes avec recherche", "Galerie avec appels API"],
    [DOC("Documentation React", "React", "https://react.dev/"), DOC("Learn React", "React", "https://react.dev/learn")],
    "2 mois", ["react-hooks", "nextjs", "react-native"]
  ),
  S(
    "react-hooks",
    "Hooks React",
    "L'état et le cycle de vie",
    "useState, useEffect, useRef, useMemo : la grammaire moderne de React pour gérer état et effets de bord.",
    "intermediate", "developpement", "concept", ["react"],
    ["useState", "useEffect", "useRef", "useMemo", "Custom hooks", "Règles des hooks"],
    ["Bibliothèque de hooks customs", "Refactorer des classes vers hooks"],
    [DOC("Hooks — React", "React", "https://react.dev/reference/react/hooks"), DOC("Built-in Hooks", "React", "https://react.dev/reference/react")],
    "3 semaines", ["react-state"]
  ),
  S(
    "react-state",
    "State Management",
    "Gérer l'état global",
    "Quand l'état local ne suffit plus : Context, Zustand, Redux Toolkit, React Query. Choisir le bon outil au bon niveau.",
    "intermediate", "developpement", "concept", ["react-hooks"],
    ["État local/global", "Context", "Zustand", "Redux Toolkit", "React Query", "Cache serveur"],
    ["App avec cache serveur intelligent", "Refactor d'un état global chaotique"],
    [DOC("Managing State — React", "React", "https://react.dev/learn/managing-state"), DOC("TanStack Query", "TanStack", "https://tanstack.com/query/latest")],
    "3 semaines", ["nextjs"]
  ),
  S(
    "react-forms",
    "Formulaires React",
    "Inputs, validation, UX",
    "Le cauchemar discret du frontend : états, validation, erreurs, accessibilité. Bien les maîtriser change tout.",
    "intermediate", "developpement", "concept", ["react"],
    ["Controlled inputs", "Validation", "React Hook Form", "Erreurs", "UX", "Accessibilité"],
    ["Formulaire multi-étapes validé", "Upload de fichiers avec progression"],
    [DOC("React Hook Form", "RHF", "https://react-hook-form.com/"), DOC("Forms — React", "React", "https://react.dev/reference/react-dom/components/form")],
    "2 semaines", ["accessibility"]
  ),
  S(
    "nextjs",
    "Next.js",
    "Le framework React full-stack",
    "Le framework React de référence : SSR, SSG, App Router, API routes. Le standard production pour les apps React sérieuses.",
    "advanced", "developpement", "framework", ["react"],
    ["App Router", "SSR/SSG", "Server Components", "API routes", "Middleware", "Déploiement"],
    ["Blog avec SSG", "E-commerce avec panier et checkout"],
    [DOC("Documentation Next.js", "Vercel", "https://nextjs.org/docs"), DOC("Learn Next.js", "Vercel", "https://nextjs.org/learn")],
    "2 mois", ["frontend-archi", "fullstack"]
  ),
  S(
    "tailwind",
    "Tailwind CSS",
    "Du CSS utilitaire",
    "Styler directement dans le HTML avec des classes utilitaires : rapidité, cohérence, design systems sans quitter le markup.",
    "beginner", "developpement", "framework", ["css"],
    ["Utilitaires", "Responsive", "Dark mode", "Config", "Design tokens", "JIT"],
    ["Landing page complète", "Design system avec Tailwind"],
    [DOC("Documentation Tailwind", "Tailwind", "https://tailwindcss.com/docs"), DOC("Cours Tailwind", "Tailwind", "https://tailwindcss.com/docs/installation")],
    "2 semaines", ["css"]
  ),
  S(
    "testing",
    "Tests",
    "Prouver que ça marche",
    "La culture du test : unitaires, intégration, e2e. Écrire du code qu'on ose refactorer.",
    "intermediate", "developpement", "concept", ["javascript"],
    ["Unitaires", "Intégration", "E2E", "TDD", "Mocks", "Coverage"],
    ["Suite de tests pour une app existante", "Pipeline CI avec tests E2E"],
    [DOC("Testing Library", "Testing Library", "https://testing-library.com/"), DOC("Guide du test — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Learn/Tools_and_testing")],
    "1 mois", ["vitest", "playwright"]
  ),
  S(
    "vitest",
    "Vitest",
    "Tests unitaires rapides",
    "Le runner de tests pensé pour Vite : rapide, compatible Jest, watch mode délicieux.",
    "intermediate", "developpement", "tool", ["testing", "vite"],
    ["Assertions", "Mocks", "Watch", "Coverage", "UI", "Snapshots"],
    ["Tester des hooks customs", "Coverage à 80% d'un projet"],
    [DOC("Guide Vitest", "Vitest", "https://vitest.dev/guide/"), DOC("API — Vitest", "Vitest", "https://vitest.dev/api/")],
    "2 semaines", ["playwright"]
  ),
  S(
    "playwright",
    "Playwright",
    "Tests end-to-end",
    "Automatiser de vrais navigateurs : tester comme un utilisateur, sur Chromium, Firefox et WebKit.",
    "intermediate", "developpement", "tool", ["testing"],
    ["Navigateurs", "Sélecteurs", "Assertions", "Fixtures", "CI", "Debug"],
    ["Suite E2E d'un parcours d'achat", "Tests visuels de régression"],
    [DOC("Documentation Playwright", "Microsoft", "https://playwright.dev/"), DOC("Getting started", "Microsoft", "https://playwright.dev/docs/intro")],
    "3 semaines", ["vitest"]
  ),
  S(
    "web-perf",
    "Performance Web",
    "Des sites ultra-rapides",
    "Core Web Vitals, lazy loading, code splitting : la vitesse est une fonctionnalité. Mesurer, puis optimiser.",
    "advanced", "developpement", "concept", ["javascript"],
    ["Core Web Vitals", "Lighthouse", "Code splitting", "Lazy loading", "Cache", "Images"],
    ["Audit Lighthouse : 60 → 95+", "Optimiser une app lente"],
    [DOC("web.dev — Performance", "Google", "https://web.dev/learn/performance/"), DOC("Core Web Vitals", "Google", "https://web.dev/articles/vitals")],
    "1 mois", ["vite"]
  ),
  S(
    "frontend-archi",
    "Architecture Frontend",
    "Structurer à grande échelle",
    "Monorepos, design systems, micro-frontends, feature-sliced : organiser le code quand l'équipe grandit.",
    "advanced", "developpement", "concept", ["nextjs", "testing"],
    ["Monorepos", "Design systems", "Feature-Sliced", "Micro-frontends", "Conventions", "Documentation"],
    ["Monorepo Turborepo", "Design system documenté"],
    [DOC("Turborepo", "Vercel", "https://turbo.build/repo/docs"), DOC("Feature-Sliced Design", "FSD", "https://feature-sliced.design/")],
    "2 mois", ["fullstack"]
  ),
  S(
    "nodejs",
    "Node.js",
    "JavaScript côté serveur",
    "Le runtime qui a sorti JS du navigateur : APIs, scripts, tooling. La porte vers le backend pour un développeur web.",
    "intermediate", "developpement", "platform", ["javascript"],
    ["Event loop", "Modules", "Express/Fastify", "APIs REST", "Streams", "npm"],
    ["API REST avec Express", "CLI en Node.js"],
    [DOC("Documentation Node.js", "OpenJS", "https://nodejs.org/docs/latest/api/"), DOC("Guides Node.js", "OpenJS", "https://nodejs.org/en/learn")],
    "1 mois", ["fullstack", "electron"]
  ),
  S(
    "fullstack",
    "Full Stack",
    "De la base au navigateur",
    "Maîtriser toute la chaîne : base de données, API, frontend, déploiement. Le profil le plus polyvalent.",
    "advanced", "developpement", "specialization", ["nextjs", "nodejs"],
    ["BDD", "API", "Frontend", "Auth", "Déploiement", "Observabilité"],
    ["SaaS complet de A à Z", "App temps réel avec websockets"],
    [DOC("Full Stack Open", "Helsinki", "https://fullstackopen.com/"), DOC("The Odin Project", "Odin", "https://www.theodinproject.com/")],
    "3 mois", ["platform-engineering"]
  ),
  S(
    "github",
    "GitHub",
    "Collaborer sur du code",
    "La plateforme des développeurs : pull requests, code review, issues, projects. Travailler en équipe à l'échelle mondiale.",
    "beginner", "developpement", "platform", ["git"],
    ["Pull requests", "Code review", "Issues", "Projects", "Forks", "Actions"],
    ["Contribuer à l'open source", "Gérer un projet en équipe"],
    [DOC("Documentation GitHub", "GitHub", "https://docs.github.com/"), DOC("Hello World — GitHub", "GitHub", "https://docs.github.com/fr/get-started")],
    "2 semaines", ["github-actions"]
  ),
  S(
    "postman",
    "Postman",
    "Tester ses APIs",
    "L'atelier des APIs : envoyer des requêtes, automatiser des collections, documenter. Indispensable avec REST.",
    "beginner", "developpement", "tool", ["http", "rest"],
    ["Requêtes", "Collections", "Environnements", "Tests", "Documentation", "Mocks"],
    ["Collection de tests d'API", "Documenter une API publique"],
    [DOC("Learning Center", "Postman", "https://learning.postman.com/docs/"), DOC("Postman API Network", "Postman", "https://www.postman.com/explore")],
    "1 semaine", ["rest", "fetch-api"]
  ),
  S(
    "react-native",
    "React Native",
    "Des apps mobiles en React",
    "Créer des applications iOS et Android avec React : un seul code, deux plateformes.",
    "intermediate", "developpement", "framework", ["react"],
    ["Composants natifs", "Navigation", "APIs natives", "Build", "Stores", "OTA"],
    ["App de notes synchronisée", "Clone d'app existante"],
    [DOC("Documentation React Native", "Meta", "https://reactnative.dev/docs/getting-started"), DOC("Expo", "Expo", "https://docs.expo.dev/")],
    "2 mois", ["flutter"]
  ),
  S(
    "flutter",
    "Flutter",
    "Des apps multiplateformes",
    "Le framework UI de Google (Dart) : mobile, web et desktop depuis une seule base de code, avec un rendu maison.",
    "intermediate", "developpement", "framework", ["culture-info"],
    ["Dart", "Widgets", "State", "Navigation", "Packages", "Build"],
    ["App météo multiplateforme", "Portfolio app"],
    [DOC("Documentation Flutter", "Google", "https://docs.flutter.dev/"), DOC("Dart — langage", "Google", "https://dart.dev/guides")],
    "2 mois", ["react-native"]
  ),
  S(
    "electron",
    "Electron",
    "Des apps desktop en web",
    "Emballer une app web en application desktop (VS Code, Discord, Slack) : Chromium + Node.js.",
    "intermediate", "developpement", "framework", ["nodejs"],
    ["Main/Renderer", "IPC", "Packaging", "Auto-update", "APIs natives", "Performance"],
    ["Éditeur de notes desktop", "Wrapper desktop d'une PWA"],
    [DOC("Documentation Electron", "OpenJS", "https://www.electronjs.org/docs/latest"), DOC("Tutoriel — Electron", "OpenJS", "https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app")],
    "1 mois", ["nodejs"]
  ),
];

const IA: Skill[] = [
  S(
    "python",
    "Python",
    "Le langage de l'IA",
    "Simple, lisible, doté du meilleur écosystème data/IA : le langage à apprendre pour la data science et le machine learning.",
    "beginner", "ia", "language", ["culture-info"],
    ["Syntaxe", "Types", "Fonctions", "Modules", "Environnements virtuels", "pip"],
    ["Script d'automatisation", "Analyse d'un CSV"],
    [DOC("Documentation Python", "Python.org", "https://docs.python.org/3/"), DOC("Tutoriel Python — FR", "Python.org", "https://docs.python.org/fr/3/tutorial/")],
    "1 mois", ["numpy", "pandas", "data-science"]
  ),
  S(
    "numpy",
    "NumPy",
    "Le calcul numérique",
    "Les tableaux n-dimensionnels et l'algèbre linéaire rapide : la fondation de tout le stack scientifique Python.",
    "beginner", "ia", "framework", ["python"],
    ["ndarray", "Broadcasting", "Indexation", "Algèbre linéaire", "Vectorisation", "Performance"],
    ["Traitement d'images en tableaux", "Benchmark Python pur vs NumPy"],
    [DOC("Documentation NumPy", "NumPy", "https://numpy.org/doc/"), DOC("Quickstart — NumPy", "NumPy", "https://numpy.org/doc/stable/user/quickstart.html")],
    "2 semaines", ["pandas", "pytorch"]
  ),
  S(
    "pandas",
    "Pandas",
    "Manipuler des datasets",
    "Nettoyer, transformer, agréger des données tabulaires : l'outil quotidien de l'analyse de données.",
    "beginner", "ia", "framework", ["python"],
    ["DataFrames", "Nettoyage", "GroupBy", "Jointures", "Time series", "IO"],
    ["Nettoyer un dataset sale", "Analyse exploratoire complète"],
    [DOC("Documentation Pandas", "pandas", "https://pandas.pydata.org/docs/"), DOC("Guide 10 min — pandas", "pandas", "https://pandas.pydata.org/docs/user_guide/10min.html")],
    "3 semaines", ["data-science", "analytics"]
  ),
  S(
    "statistics",
    "Statistiques",
    "Lire les données",
    "Distributions, corrélations, tests d'hypothèses : comprendre les données avant de les modéliser. Le socle théorique du ML.",
    "intermediate", "ia", "concept", ["culture-info"],
    ["Distributions", "Probabilités", "Corrélation", "Tests", "Biais", "Échantillonnage"],
    ["Étude statistique d'un dataset", "A/B test analysé proprement"],
    [DOC("Statistique — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Statistique"), DOC("Seeing Theory", "Brown", "https://seeing-theory.brown.edu/")],
    "1 mois", ["machine-learning", "data-science"]
  ),
  S(
    "machine-learning",
    "Machine Learning",
    "Apprendre depuis les données",
    "La spécialisation qui apprend aux machines à partir d'exemples : régression, classification, clustering, évaluation.",
    "intermediate", "ia", "specialization", ["python", "statistics"],
    ["Supervisé/non-supervisé", "Régression", "Classification", "Overfitting", "Validation", "Features"],
    ["Prédire des prix immobiliers", "Classifier des avis clients"],
    [DOC("Machine Learning — Google", "Google", "https://developers.google.com/machine-learning"), DOC("ML — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Apprentissage_automatique")],
    "3 mois", ["scikit-learn", "deep-learning", "mlops"]
  ),
  S(
    "scikit-learn",
    "Scikit-learn",
    "Le ML classique",
    "La bibliothèque de référence pour le ML traditionnel : des modèles robustes en quelques lignes, parfaitement documentés.",
    "intermediate", "ia", "framework", ["machine-learning"],
    ["Estimators", "Pipelines", "Cross-validation", "Grid search", "Métriques", "Preprocessing"],
    ["Pipeline de classification complet", "Comparatif de modèles"],
    [DOC("Documentation scikit-learn", "scikit-learn", "https://scikit-learn.org/stable/"), DOC("Tutoriels — sklearn", "scikit-learn", "https://scikit-learn.org/stable/tutorial/index.html")],
    "1 mois", ["mlops"]
  ),
  S(
    "pytorch",
    "PyTorch",
    "Le deep learning flexible",
    "Le framework de deep learning préféré de la recherche : dynamique, pythonique, au cœur de l'IA générative.",
    "advanced", "ia", "framework", ["machine-learning", "numpy"],
    ["Tenseurs", "Autograd", "Modules", "DataLoaders", "GPU", "Checkpoints"],
    ["Réseau de neurones from scratch", "Fine-tuner un modèle"],
    [DOC("Documentation PyTorch", "PyTorch", "https://pytorch.org/docs/stable/"), DOC("Tutoriels — PyTorch", "PyTorch", "https://pytorch.org/tutorials/")],
    "2 mois", ["deep-learning", "transformers"]
  ),
  S(
    "tensorflow",
    "TensorFlow",
    "Le deep learning à l'échelle",
    "La plateforme ML de Google : production, mobile, écosystème complet pour industrialiser les modèles.",
    "advanced", "ia", "framework", ["machine-learning"],
    ["Keras", "Graphes", "TF Serving", "TF Lite", "Pipelines", "Distribution"],
    ["Modèle déployé en production", "Classification d'images"],
    [DOC("Learn TensorFlow", "Google", "https://www.tensorflow.org/learn"), DOC("Guide — TensorFlow", "Google", "https://www.tensorflow.org/guide")],
    "2 mois", ["mlops"]
  ),
  S(
    "deep-learning",
    "Deep Learning",
    "Les réseaux de neurones",
    "La spécialisation des réseaux profonds : CNN, RNN, entraînement, régularisation. Le moteur de la vision et du langage.",
    "advanced", "ia", "specialization", ["machine-learning"],
    ["Neurones", "Backprop", "CNN", "RNN", "Régularisation", "Optimiseurs"],
    ["Classifieur d'images CNN", "Générateur de texte RNN"],
    [DOC("Deep Learning — Goodfellow (livre)", "MIT Press", "https://www.deeplearningbook.org/"), DOC("Cours — Andrew Ng", "DeepLearning.AI", "https://www.deeplearning.ai/")],
    "3 mois", ["transformers", "computer-vision", "nlp"]
  ),
  S(
    "transformers",
    "Transformers",
    "L'architecture derrière l'IA générative",
    "L'architecture qui a tout changé (2017) : attention, tokens, pré-entraînement. Comprendre les modèles qui écrivent et codent.",
    "advanced", "ia", "concept", ["deep-learning"],
    ["Attention", "Tokens", "Pré-entraînement", "Fine-tuning", "Hugging Face", "Inférence"],
    ["Fine-tuner un modèle Hugging Face", "Chatbot avec un modèle open source"],
    [DOC("Transformers — Hugging Face", "Hugging Face", "https://huggingface.co/docs/transformers"), DOC("Attention Is All You Need", "arXiv", "https://arxiv.org/abs/1706.03762")],
    "2 mois", ["llms", "nlp"]
  ),
  S(
    "llms",
    "LLMs",
    "Comprendre les grands modèles",
    "Les grands modèles de langage : prompting, limites, évaluation, coûts. Les utiliser intelligemment en produit.",
    "advanced", "ia", "concept", ["transformers"],
    ["Prompting", "Fenêtre de contexte", "Hallucinations", "Évaluation", "APIs", "Open vs closed"],
    ["Assistant avec API LLM", "Benchmark de prompts"],
    [DOC("Prompt Engineering Guide", "promptingguide.ai", "https://www.promptingguide.ai/"), DOC("OpenAI — Docs", "OpenAI", "https://platform.openai.com/docs")],
    "1 mois", ["rag"]
  ),
  S(
    "rag",
    "RAG",
    "Brancher l'IA sur vos données",
    "Retrieval-Augmented Generation : combiner recherche vectorielle et LLM pour répondre à partir de vos propres documents.",
    "advanced", "ia", "concept", ["llms", "databases"],
    ["Embeddings", "Bases vectorielles", "Chunking", "Recherche", "Évaluation", "Pipelines"],
    ["Chatbot sur votre documentation", "Moteur de recherche sémantique"],
    [DOC("RAG — Pinecone", "Pinecone", "https://www.pinecone.io/learn/retrieval-augmented-generation/"), DOC("LangChain — Docs", "LangChain", "https://python.langchain.com/")],
    "1 mois", ["mlops"]
  ),
  S(
    "computer-vision",
    "Computer Vision",
    "Apprendre à voir aux machines",
    "La spécialisation de l'image : classification, détection, segmentation. Des caméras de sécurité aux voitures autonomes.",
    "advanced", "ia", "specialization", ["deep-learning"],
    ["CNN", "Détection", "Segmentation", "Transfer learning", "Datasets", "Temps réel"],
    ["Détecteur d'objets temps réel", "Tri automatique de photos"],
    [DOC("TorchVision", "PyTorch", "https://pytorch.org/vision/stable/"), DOC("OpenCV — Docs", "OpenCV", "https://docs.opencv.org/")],
    "3 mois", ["robotics"]
  ),
  S(
    "nlp",
    "NLP",
    "Comprendre le langage",
    "Le traitement du langage naturel : classification de texte, NER, résumé, traduction. Avant et avec les LLMs.",
    "advanced", "ia", "specialization", ["transformers"],
    ["Tokenisation", "Embeddings", "Classification", "NER", "Résumé", "Évaluation"],
    ["Analyseur de sentiments", "Résumeur d'articles"],
    [DOC("Cours NLP — Hugging Face", "Hugging Face", "https://huggingface.co/learn/nlp-course"), DOC("spaCy — Docs", "spaCy", "https://spacy.io/")],
    "2 mois", ["llms"]
  ),
  S(
    "mlops",
    "MLOps",
    "Industrialiser le ML",
    "La spécialisation qui met le ML en production : versioning de modèles, pipelines, monitoring, déploiement continu.",
    "advanced", "ia", "specialization", ["machine-learning", "docker"],
    ["Versioning", "Pipelines", "Déploiement", "Monitoring", "Feature stores", "CI/CD ML"],
    ["Pipeline ML de bout en bout", "Monitoring de dérive de modèle"],
    [DOC("MLOps — Google", "Google", "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning"), DOC("MLflow — Docs", "MLflow", "https://mlflow.org/docs/latest/")],
    "2 mois", ["kubernetes"]
  ),
];

const INFRASTRUCTURE: Skill[] = [
  S(
    "networking",
    "Networking",
    "TCP/IP, DNS, routage",
    "Le réseau version praticien : diagnostiquer, configurer, sécuriser. Indispensable en infra et en cybersécurité.",
    "intermediate", "infrastructure", "concept", ["networks", "linux"],
    ["TCP/IP", "DNS", "DHCP", "VLAN", "Firewall", "Diagnostic"],
    ["Maquette réseau avec GNS3", "Diagnostic complet d'une panne réseau"],
    [DOC("Practical Networking", "YouTube/PracNet", "https://www.youtube.com/@PracticalNetworking"), DOC("TCP/IP — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Suite_des_protocoles_Internet")],
    "1 mois", ["kubernetes", "nginx", "cybersecurity"]
  ),
  S(
    "cicd",
    "CI/CD",
    "Intégration et déploiement continus",
    "Automatiser test, build et déploiement à chaque commit : livrer vite, livrer sûr, sans stress.",
    "intermediate", "infrastructure", "concept", ["git"],
    ["Pipelines", "Tests auto", "Artifacts", "Environnements", "Rollback", "Stratégies de déploiement"],
    ["Pipeline complet d'un projet", "Déploiement blue/green"],
    [DOC("CI/CD — Atlassian", "Atlassian", "https://www.atlassian.com/fr/continuous-delivery"), DOC("CI/CD — GitLab", "GitLab", "https://docs.gitlab.com/ee/ci/introduction/")],
    "3 semaines", ["github-actions", "gitlab-ci"]
  ),
  S(
    "github-actions",
    "GitHub Actions",
    "Automatiser ses pipelines",
    "Le CI/CD intégré à GitHub : workflows YAML, marketplace d'actions, runners. Le standard des projets open source.",
    "intermediate", "infrastructure", "tool", ["cicd", "github"],
    ["Workflows", "Jobs", "Actions", "Secrets", "Runners", "Matrix"],
    ["CI complète : lint + test + build", "Déploiement auto sur VPS"],
    [DOC("Documentation Actions", "GitHub", "https://docs.github.com/fr/actions"), DOC("Marketplace", "GitHub", "https://github.com/marketplace?type=actions")],
    "2 semaines", ["gitlab-ci", "n8n"]
  ),
  S(
    "gitlab-ci",
    "GitLab CI",
    "Des pipelines intégrés",
    "Le CI/CD natif de GitLab : un seul outil pour le code, les pipelines et le déploiement.",
    "intermediate", "infrastructure", "tool", ["cicd"],
    ["Pipelines", ".gitlab-ci.yml", "Runners", "Environnements", "Review apps", "Auto DevOps"],
    ["Pipeline avec review apps", "Migration depuis GitHub Actions"],
    [DOC("Documentation GitLab CI", "GitLab", "https://docs.gitlab.com/ee/ci/"), DOC("Exemples — GitLab", "GitLab", "https://docs.gitlab.com/ee/ci/examples/")],
    "2 semaines", ["github-actions"]
  ),
  S(
    "docker",
    "Docker",
    "Des conteneurs partout",
    "L'outil qui a standardisé le déploiement : empaqueter une app et ses dépendances dans un conteneur portable et reproductible.",
    "intermediate", "infrastructure", "tool", ["linux"],
    ["Images", "Containers", "Dockerfile", "Volumes", "Compose", "Registries"],
    ["Dockeriser une app full-stack", "Stack complète avec Compose"],
    [DOC("Documentation Docker", "Docker", "https://docs.docker.com/"), DOC("Get Started — Docker", "Docker", "https://docs.docker.com/get-started/")],
    "1 mois", ["kubernetes", "container-registry", "mlops"]
  ),
  S(
    "container-registry",
    "Container Registry",
    "Stocker ses images",
    "Les registres d'images : versionner, scanner et distribuer ses conteneurs en équipe.",
    "intermediate", "infrastructure", "concept", ["docker"],
    ["Tags", "Vulnérabilités", "Permissions", "GHCR", "Docker Hub", "Nettoyage"],
    ["Publier une image versionnée", "Scanner ses images"],
    [DOC("Docker Hub", "Docker", "https://hub.docker.com/"), DOC("GHCR — GitHub", "GitHub", "https://docs.github.com/fr/packages/working-with-a-github-packages-registry/working-with-the-container-registry")],
    "1 semaine", ["cicd"]
  ),
  S(
    "kubernetes",
    "Kubernetes",
    "Orchestrer à grande échelle",
    "La plateforme d'orchestration devenue standard : déployer, scaler et auto-réparer des centaines de conteneurs.",
    "advanced", "infrastructure", "platform", ["docker", "networking"],
    ["Pods", "Deployments", "Services", "Ingress", "ConfigMaps", "Helm"],
    ["Cluster local avec kind", "Déployer une app avec ingress TLS"],
    [DOC("Documentation Kubernetes", "CNCF", "https://kubernetes.io/fr/docs/home/"), DOC("Concepts — K8s", "CNCF", "https://kubernetes.io/fr/docs/concepts/")],
    "2 mois", ["helm", "k8s-operators", "prometheus"]
  ),
  S(
    "helm",
    "Helm",
    "Packager pour Kubernetes",
    "Le gestionnaire de paquets de Kubernetes : des charts versionnés et paramétrables au lieu de YAML à la main.",
    "advanced", "infrastructure", "tool", ["kubernetes"],
    ["Charts", "Values", "Templates", "Releases", "Repositories", "Hooks"],
    ["Créer un chart pour son app", "Déployer une stack via charts publics"],
    [DOC("Documentation Helm", "Helm", "https://helm.sh/fr/docs/"), DOC("Artifact Hub", "Artifact Hub", "https://artifacthub.io/")],
    "3 semaines", ["k8s-operators"]
  ),
  S(
    "k8s-operators",
    "Operators",
    "Étendre Kubernetes",
    "Des contrôleurs qui pilotent des applications complexes : le niveau expert de l'orchestration.",
    "advanced", "infrastructure", "concept", ["kubernetes"],
    ["CRD", "Contrôleurs", "Reconciliation", "OLM", "Patterns", "SDK"],
    ["Opérateur pour une base de données", "CRD custom déployée"],
    [DOC("Operator Pattern — K8s", "CNCF", "https://kubernetes.io/docs/concepts/extend-kubernetes/operator/"), DOC("Operator Framework", "CNCF", "https://operatorframework.io/")],
    "2 mois", ["platform-engineering"]
  ),
  S(
    "aws",
    "AWS",
    "Le cloud leader",
    "La plateforme cloud la plus complète : EC2, S3, RDS, Lambda. La certification la plus demandée en infra.",
    "intermediate", "infrastructure", "platform", ["networks", "linux"],
    ["EC2", "S3", "RDS", "IAM", "Lambda", "VPC"],
    ["Héberger un site statique sur S3", "API serverless avec Lambda"],
    [DOC("Documentation AWS", "AWS", "https://docs.aws.amazon.com/"), DOC("Skill Builder — AWS", "AWS", "https://skillbuilder.aws/")],
    "2 mois", ["terraform", "azure", "gcp"]
  ),
  S(
    "azure",
    "Azure",
    "Le cloud Microsoft",
    "Le cloud des entreprises Microsoft : intégration Active Directory, hybride, services IA.",
    "intermediate", "infrastructure", "platform", ["networks"],
    ["VM", "App Service", "Entra ID", "Blob Storage", "Functions", "Hybride"],
    ["Déployer une app .NET", "Infrastructure hybride"],
    [DOC("Documentation Azure", "Microsoft", "https://learn.microsoft.com/fr-fr/azure/"), DOC("Learn — Microsoft", "Microsoft", "https://learn.microsoft.com/fr-fr/training/azure/")],
    "2 mois", ["aws", "terraform"]
  ),
  S(
    "gcp",
    "GCP",
    "Le cloud Google",
    "Le cloud né de l'infrastructure Google : Kubernetes (GKE), BigQuery, simplicité réseau.",
    "intermediate", "infrastructure", "platform", ["networks"],
    ["GCE", "GKE", "BigQuery", "Cloud Run", "IAM", "Réseau"],
    ["App conteneurisée sur Cloud Run", "Pipeline data BigQuery"],
    [DOC("Documentation GCP", "Google", "https://cloud.google.com/docs?hl=fr"), DOC("Tutorials — GCP", "Google", "https://cloud.google.com/tutorials?hl=fr")],
    "2 mois", ["aws", "terraform"]
  ),
  S(
    "terraform",
    "Terraform",
    "L'infrastructure as code",
    "Décrire son infrastructure en code : versionnée, reproductible, automatisable. Le standard IaC multi-cloud.",
    "advanced", "infrastructure", "tool", ["linux", "networking"],
    ["HCL", "Providers", "State", "Modules", "Plans", "Workspaces"],
    ["Infra AWS complète en code", "Module réutilisable"],
    [DOC("Documentation Terraform", "HashiCorp", "https://developer.hashicorp.com/terraform/docs"), DOC("Tutorials — HashiCorp", "HashiCorp", "https://developer.hashicorp.com/terraform/tutorials")],
    "2 mois", ["platform-engineering", "ansible"]
  ),
  S(
    "ansible",
    "Ansible",
    "Automatiser la configuration",
    "Configurer des flottes de serveurs sans agent : playbooks YAML idempotents, simples à lire et à maintenir.",
    "intermediate", "infrastructure", "tool", ["linux", "bash"],
    ["Playbooks", "Inventaires", "Rôles", "Idempotence", "Vault", "Galaxy"],
    ["Provisionner un VPS complet", "Rôle Ansible réutilisable"],
    [DOC("Documentation Ansible", "Red Hat", "https://docs.ansible.com/"), DOC("Getting started", "Red Hat", "https://docs.ansible.com/ansible/latest/getting_started/index.html")],
    "1 mois", ["terraform"]
  ),
  S(
    "nginx",
    "Nginx",
    "Reverse proxy et serveur web",
    "Le serveur web le plus déployé : reverse proxy, load balancing, TLS, cache. Devant presque toutes les apps.",
    "intermediate", "infrastructure", "tool", ["http", "linux"],
    ["Reverse proxy", "TLS", "Load balancing", "Cache", "Compression", "Logs"],
    ["Reverse proxy multi-apps", "HTTPS avec Let's Encrypt"],
    [DOC("Documentation Nginx", "Nginx", "https://nginx.org/en/docs/"), DOC("Beginner's Guide", "Nginx", "https://nginx.org/en/docs/beginners_guide.html")],
    "3 semaines", ["docker"]
  ),
  S(
    "prometheus",
    "Prometheus",
    "Superviser ses systèmes",
    "La collecte de métriques devenue standard : alerting, requêtes PromQL, base temps réel.",
    "advanced", "infrastructure", "tool", ["kubernetes"],
    ["Métriques", "PromQL", "Alerting", "Exporters", "Targets", "Rétention"],
    ["Superviser un cluster", "Alertes avec Alertmanager"],
    [DOC("Documentation Prometheus", "Prometheus", "https://prometheus.io/docs/introduction/overview/"), DOC("Querying — PromQL", "Prometheus", "https://prometheus.io/docs/prometheus/latest/querying/basics/")],
    "1 mois", ["grafana"]
  ),
  S(
    "grafana",
    "Grafana",
    "Visualiser ses métriques",
    "Les dashboards d'observabilité : métriques, logs, traces réunis en vues lisibles pour toute l'équipe.",
    "advanced", "infrastructure", "tool", ["prometheus"],
    ["Dashboards", "Datasources", "Alertes", "Variables", "Panels", "Provisioning"],
    ["Dashboard SRE complet", "Alerting multi-sources"],
    [DOC("Documentation Grafana", "Grafana", "https://grafana.com/docs/grafana/latest/"), DOC("Getting started", "Grafana", "https://grafana.com/docs/grafana/latest/getting-started/")],
    "3 semaines", ["prometheus"]
  ),
  S(
    "platform-engineering",
    "Platform Engineering",
    "Construire des plateformes internes",
    "La discipline qui industrialise le DevOps : developer platforms, self-service, golden paths. Le sommet de l'infra moderne.",
    "advanced", "infrastructure", "specialization", ["kubernetes", "terraform"],
    ["IDP", "Self-service", "Golden paths", "Backstage", "GitOps", "DX"],
    ["Portail développeur minimal", "Pipeline GitOps complète"],
    [DOC("Platform Engineering — CNCF", "CNCF", "https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/"), DOC("ArgoCD — GitOps", "CNCF", "https://argo-cd.readthedocs.io/")],
    "3 mois", ["kubernetes"]
  ),
];

const DATA: Skill[] = [
  S(
    "postgresql",
    "PostgreSQL",
    "La base relationnelle de référence",
    "Le SGBD open source le plus avancé : robustesse, JSON, full-text, extensions. Le choix par défaut des nouvelles applications.",
    "intermediate", "data", "tool", ["sql"],
    ["Types", "Index", "JSONB", "Full-text", "Réplication", "EXPLAIN"],
    ["Schéma e-commerce optimisé", "Recherche full-text"],
    [DOC("Documentation PostgreSQL", "PostgreSQL", "https://www.postgresql.org/docs/"), DOC("Tutorial — PostgreSQL", "PostgreSQL", "https://www.postgresql.org/docs/current/tutorial.html")],
    "1 mois", ["mysql", "mongodb"]
  ),
  S(
    "mysql",
    "MySQL",
    "La base la plus répandue",
    "Le SGBD historique du web (WordPress, etc.) : simple, rapide, partout. Toujours incontournable.",
    "intermediate", "data", "tool", ["sql"],
    ["InnoDB", "Index", "Réplication", "Optimisation", "Sauvegarde", "Sécurité"],
    ["Base WordPress optimisée", "Migration vers PostgreSQL"],
    [DOC("Documentation MySQL", "Oracle", "https://dev.mysql.com/doc/"), DOC("Tutorial — MySQL", "Oracle", "https://dev.mysql.com/doc/mysql-getting-started/en/")],
    "1 mois", ["postgresql"]
  ),
  S(
    "mongodb",
    "MongoDB",
    "La base documentaire",
    "Le NoSQL document le plus populaire : flexibilité du schéma, scaling horizontal, agrégations puissantes.",
    "intermediate", "data", "tool", ["databases"],
    ["Documents", "Agrégations", "Index", "Schéma flexible", "Réplication", "Atlas"],
    ["API avec Mongoose", "Pipeline d'agrégation complexe"],
    [DOC("Documentation MongoDB", "MongoDB", "https://www.mongodb.com/docs/"), DOC("University — MongoDB", "MongoDB", "https://learn.mongodb.com/")],
    "1 mois", ["postgresql", "redis"]
  ),
  S(
    "redis",
    "Redis",
    "Le cache ultra-rapide",
    "Le store en mémoire : cache, sessions, files, pub/sub. Le compagnon performance de toute app qui scale.",
    "intermediate", "data", "tool", ["databases"],
    ["Cache", "TTL", "Structures", "Pub/Sub", "Persistence", "Cluster"],
    ["Cache d'API avec invalidation", "Leaderboard temps réel"],
    [DOC("Documentation Redis", "Redis", "https://redis.io/docs/latest/"), DOC("Commands — Redis", "Redis", "https://redis.io/docs/latest/commands/")],
    "3 semaines", ["mongodb"]
  ),
  S(
    "data-engineering",
    "Data Engineering",
    "Construire des pipelines",
    "La spécialisation des flux de données : ingestion, transformation, orchestration. Rendre la donnée utilisable à l'échelle.",
    "intermediate", "data", "specialization", ["sql", "python"],
    ["ETL/ELT", "Orchestration", "Warehouses", "Streaming", "Qualité", "Airflow/dbt"],
    ["Pipeline ELT avec dbt", "Warehouse analytique"],
    [DOC("Data Engineering — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Ing%C3%A9nierie_des_donn%C3%A9es"), DOC("dbt — Docs", "dbt", "https://docs.getdbt.com/")],
    "3 mois", ["kafka", "rabbitmq", "analytics"]
  ),
  S(
    "kafka",
    "Kafka",
    "Le streaming d'événements",
    "La plateforme de streaming distribuée : des millions d'événements par seconde, la colonne vertébrale des architectures event-driven.",
    "advanced", "data", "tool", ["data-engineering"],
    ["Topics", "Partitions", "Consumers", "Exactly-once", "Schema Registry", "Connect"],
    ["Pipeline temps réel", "Event sourcing minimal"],
    [DOC("Documentation Kafka", "Apache", "https://kafka.apache.org/documentation/"), DOC("Kafka — Confluent", "Confluent", "https://developer.confluent.io/")],
    "2 mois", ["rabbitmq"]
  ),
  S(
    "rabbitmq",
    "RabbitMQ",
    "Des files de messages",
    "Le broker de messages robuste : découpler des services, gérer la charge, garantir la livraison.",
    "intermediate", "data", "tool", ["data-engineering"],
    ["Queues", "Exchanges", "Routing", "ACK", "Persistance", "Clustering"],
    ["Workers asynchrones", "Notifications découplées"],
    [DOC("Documentation RabbitMQ", "RabbitMQ", "https://www.rabbitmq.com/docs"), DOC("Tutorials — RabbitMQ", "RabbitMQ", "https://www.rabbitmq.com/tutorials")],
    "1 mois", ["kafka"]
  ),
  S(
    "data-science",
    "Data Science",
    "Extraire de la valeur des données",
    "La spécialisation analyse + ML : explorer, modéliser, communiquer. Transformer des données brutes en décisions.",
    "intermediate", "data", "specialization", ["python", "statistics", "sql"],
    ["Exploration", "Modélisation", "Visualisation", "Storytelling", "A/B testing", "Déploiement"],
    ["Étude complète d'un dataset public", "Dashboard décisionnel"],
    [DOC("Data Science — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Science_des_donn%C3%A9es"), DOC("Kaggle Learn", "Kaggle", "https://www.kaggle.com/learn")],
    "3 mois", ["machine-learning", "analytics"]
  ),
  S(
    "analytics",
    "Data Analytics",
    "Raconter des histoires avec des données",
    "L'analyse décisionnelle : SQL, BI, dashboards. Répondre aux questions business avec des données fiables.",
    "intermediate", "data", "specialization", ["sql", "pandas"],
    ["SQL avancé", "BI", "Dashboards", "KPI", "Nettoyage", "Présentation"],
    ["Dashboard KPI e-commerce", "Rapport automatisé"],
    [DOC("Google Data Analytics", "Google", "https://grow.google/certificates/data-analytics/"), DOC("Metabase — Docs", "Metabase", "https://www.metabase.com/docs/latest/")],
    "2 mois", ["data-science"]
  ),
];

const AUTOMATION: Skill[] = [
  S(
    "n8n",
    "n8n",
    "Workflow Automation",
    "La plateforme d'automatisation open source et auto-hébergeable : connecter applications, APIs et services via des workflows visuels, avec du code quand il faut.",
    "intermediate", "automation", "tool", ["http", "rest", "json", "webhooks"],
    ["Workflows", "Nodes", "Triggers", "Webhooks", "Credentials", "Expressions", "Intégrations API"],
    [
      "Automatiser un formulaire : chaque réponse crée une tâche et envoie un email",
      "Créer une notification Discord via webhook",
      "Synchroniser une API avec une base de données",
      "Créer un workflow utilisant une API d'IA",
    ],
    [DOC("Documentation n8n", "n8n", "https://docs.n8n.io/"), DOC("n8n — Concepts", "n8n", "https://docs.n8n.io/workflows/")],
    "1 mois", ["make", "zapier", "github-actions", "api-integration"]
  ),
  S(
    "make",
    "Make",
    "Automatiser visuellement",
    "La plateforme no-code d'automatisation (ex-Integromat) : des scénarios visuels puissants entre des milliers d'applications.",
    "intermediate", "automation", "tool", ["http", "webhooks"],
    ["Scénarios", "Modules", "Routeurs", "Filtres", "Planification", "Erreurs"],
    ["Synchroniser CRM et newsletter", "Pipeline de qualification de leads"],
    [DOC("Help Center — Make", "Make", "https://www.make.com/en/help"), DOC("Make Academy", "Make", "https://www.make.com/en/academy")],
    "3 semaines", ["n8n", "zapier"]
  ),
  S(
    "zapier",
    "Zapier",
    "Connecter 6000+ apps",
    "Le pionnier de l'automatisation no-code : des Zaps simples entre applications, sans écrire une ligne de code.",
    "beginner", "automation", "tool", ["http"],
    ["Zaps", "Triggers", "Actions", "Filtres", "Multi-étapes", "Tables"],
    ["Alertes automatiques", "Sauvegarde auto de pièces jointes"],
    [DOC("Help — Zapier", "Zapier", "https://help.zapier.com/"), DOC("Zapier University", "Zapier", "https://learn.zapier.com/")],
    "2 semaines", ["n8n", "make"]
  ),
  S(
    "api-integration",
    "Intégration d'APIs",
    "Faire dialoguer les services",
    "L'art de connecter des systèmes : authentification, pagination, webhooks, gestion d'erreurs, idempotence. Le ciment de l'automation.",
    "intermediate", "automation", "concept", ["rest", "webhooks"],
    ["OAuth", "Pagination", "Rate limits", "Retry", "Idempotence", "Monitoring"],
    ["Connecteur pour une API publique", "Sync bidirectionnelle entre deux SaaS"],
    [DOC("API Integration — Postman", "Postman", "https://www.postman.com/api-platform/api-integration/"), DOC("OAuth 2.0 — RFC", "IETF", "https://oauth.net/2/")],
    "1 mois", ["n8n", "postman"]
  ),
];

const CYBERSECURITE: Skill[] = [
  S(
    "cryptography",
    "Cryptographie",
    "Chiffrer et signer",
    "La science du secret : chiffrement symétrique/asymétrique, hachage, signatures, certificats. La base de la confiance numérique.",
    "intermediate", "cybersecurite", "concept", ["culture-info"],
    ["Symétrique", "Asymétrique", "Hachage", "Signatures", "TLS", "PKI"],
    ["Chiffrer des messages avec GPG", "Analyser un certificat TLS"],
    [DOC("Cryptographie — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Cryptographie"), DOC("Crypto 101 (livre)", "Crypto 101", "https://www.crypto101.io/")],
    "1 mois", ["authentication", "web-security"]
  ),
  S(
    "web-security",
    "Sécurité Web",
    "Protéger ses applications",
    "Sécuriser les apps web : injections, XSS, CSRF, en-têtes, sessions. Penser sécurité dès la conception.",
    "intermediate", "cybersecurite", "concept", ["http", "networks"],
    ["XSS", "Injections", "CSRF", "Headers", "Sessions", "CORS"],
    ["Sécuriser une app vulnérable (DVWA)", "Audit d'en-têtes de sécurité"],
    [DOC("Web Security — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/Security"), DOC("OWASP — Guides", "OWASP", "https://owasp.org/")],
    "2 mois", ["owasp", "pentesting"]
  ),
  S(
    "owasp",
    "OWASP Top 10",
    "Les failles les plus critiques",
    "Le référentiel des 10 risques majeurs des applications web : la checklist de tout audit de sécurité.",
    "intermediate", "cybersecurite", "concept", ["web-security"],
    ["Top 10", "Exploitation", "Remédiation", "Tests", "Cheatsheets", "Veille"],
    ["Exploiter puis corriger chaque faille", "Checklist d'audit"],
    [DOC("OWASP Top 10", "OWASP", "https://owasp.org/www-project-top-ten/"), DOC("Cheat Sheets — OWASP", "OWASP", "https://cheatsheetseries.owasp.org/")],
    "1 mois", ["pentesting"]
  ),
  S(
    "authentication",
    "Authentification",
    "Prouver son identité",
    "Mots de passe, MFA, OAuth, passkeys : vérifier qui se connecte, sans compromettre l'UX ni la sécurité.",
    "intermediate", "cybersecurite", "concept", ["web-security", "cryptography"],
    ["Mots de passe", "MFA", "OAuth/OIDC", "JWT", "Sessions", "Passkeys"],
    ["Login sécurisé avec MFA", "SSO avec un provider OAuth"],
    [DOC("Web Authentication — MDN", "MDN", "https://developer.mozilla.org/fr/docs/Web/API/Web_Authentication_API"), DOC("OAuth 2.0", "oauth.net", "https://oauth.net/2/")],
    "1 mois", ["web-security"]
  ),
  S(
    "cybersecurity",
    "Cybersécurité",
    "Penser comme un attaquant",
    "La spécialisation défensive et offensive : comprendre les menaces pour construire des systèmes résilients.",
    "intermediate", "cybersecurite", "specialization", ["networks", "linux", "cryptography"],
    ["Menaces", "Défense en profondeur", "Blue/Red team", "Forensique", "Veille", "Conformité"],
    ["Lab de sécurité maison", "Rapport d'analyse de menace"],
    [DOC("ANSSI — Guides", "ANSSI", "https://www.ssi.gouv.fr/"), DOC("Cybersécurité — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/S%C3%A9curit%C3%A9_des_syst%C3%A8mes_d%27information")],
    "3 mois", ["pentesting", "siem"]
  ),
  S(
    "pentesting",
    "Pentest",
    "Tester les défenses",
    "Le hacking éthique : trouver les failles avant les attaquants, méthodiquement et légalement.",
    "advanced", "cybersecurite", "specialization", ["linux", "networks", "web-security"],
    ["Reconnaissance", "Exploitation", "Post-exploitation", "Reporting", "Kali", "Méthodologie"],
    ["Pentest d'un lab vulnérable", "Rapport de pentest professionnel"],
    [DOC("TryHackMe", "TryHackMe", "https://tryhackme.com/"), DOC("HackTheBox", "HackTheBox", "https://www.hackthebox.com/")],
    "3 mois", ["incident-response"]
  ),
  S(
    "siem",
    "SIEM",
    "Détecter les intrusions",
    "La supervision sécurité : centraliser les logs, corréler les événements, détecter les attaques en temps réel.",
    "advanced", "cybersecurite", "tool", ["networks", "linux"],
    ["Logs", "Corrélation", "Règles", "Wazuh/Splunk", "Triage", "Dashboards"],
    ["SIEM maison avec Wazuh", "Règles de détection custom"],
    [DOC("Wazuh — Docs", "Wazuh", "https://documentation.wazuh.com/"), DOC("Splunk — Docs", "Splunk", "https://docs.splunk.com/")],
    "2 mois", ["incident-response"]
  ),
  S(
    "incident-response",
    "Réponse aux incidents",
    "Réagir à une attaque",
    "Le playbook quand ça casse : contenir, éradiquer, récupérer, apprendre. La gestion de crise sécurité.",
    "advanced", "cybersecurite", "concept", ["siem"],
    ["Playbooks", "Confinement", "Forensique", "Communication", "Retour d'expérience", "Préparation"],
    ["Simuler une réponse à incident", "Rédiger un playbook"],
    [DOC("Incident Response — NIST", "NIST", "https://csrc.nist.gov/pubs/sp/800/61/r2/final"), DOC("ANSSI — Réponse", "ANSSI", "https://www.ssi.gouv.fr/")],
    "1 mois", ["siem"]
  ),
];

const ROBOTIQUE: Skill[] = [
  S(
    "cpp",
    "C/C++",
    "La performance brute",
    "Les langages du système et de l'embarqué : mémoire manuelle, performance maximale, contrôle total.",
    "intermediate", "robotique", "language", ["algorithms"],
    ["Pointeurs", "Mémoire", "POO", "Templates", "STL", "Compilation"],
    ["Moteur de jeu minimal", "Driver pour microcontrôleur"],
    [DOC("cppreference", "cppreference", "https://fr.cppreference.com/w/"), DOC("Learn C++", "learncpp.com", "https://www.learncpp.com/")],
    "2 mois", ["embedded", "data-structures"]
  ),
  S(
    "electronics",
    "Électronique",
    "Comprendre le hardware",
    "Tension, courant, composants : lire un schéma et comprendre ce qui se passe dans la machine.",
    "intermediate", "robotique", "concept", ["culture-info"],
    ["Circuits", "Composants", "Numérique", "Signaux", "Alimentation", "Schémas"],
    ["Monter un circuit sur breadboard", "Lire une datasheet"],
    [DOC("Électronique — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/%C3%89lectronique"), DOC("All About Circuits", "AAC", "https://www.allaboutcircuits.com/")],
    "2 mois", ["sensors", "embedded"]
  ),
  S(
    "sensors",
    "Capteurs",
    "Donner des sens aux machines",
    "Lire le monde physique : distance, température, IMU, caméras. L'interface entre réel et numérique.",
    "intermediate", "robotique", "concept", ["electronics"],
    ["Types de capteurs", "ADC", "Calibration", "Bruit", "Fusion", "Protocoles"],
    ["Station météo connectée", "Robot suiveur de ligne"],
    [DOC("Capteur — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Capteur"), DOC("Arduino — Docs", "Arduino", "https://docs.arduino.cc/")],
    "1 mois", ["embedded"]
  ),
  S(
    "control-systems",
    "Asservissement",
    "Contrôler avec précision",
    "La théorie du contrôle : PID, stabilité, boucles de régulation. Faire faire exactement ce qu'on veut à une machine.",
    "advanced", "robotique", "concept", ["electronics"],
    ["PID", "Boucles", "Stabilité", "Modélisation", "Filtrage", "Simulation"],
    ["Réguler un moteur en PID", "Simuler un drone"],
    [DOC("Asservissement — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Asservissement_(automatique)"), DOC("Control Tutorials", "Michigan", "https://ctms.engin.umich.edu/CTMS/")],
    "2 mois", ["robotics"]
  ),
  S(
    "ros",
    "ROS",
    "Le framework robotique",
    "Robot Operating System : l'écosystème standard de la robotique — nodes, topics, simulation, navigation.",
    "advanced", "robotique", "framework", ["python", "linux"],
    ["Nodes", "Topics", "Services", "URDF", "Gazebo", "Navigation"],
    ["Robot simulé qui navigue", "Bras robotique contrôlé"],
    [DOC("Documentation ROS", "Open Robotics", "https://docs.ros.org/"), DOC("Tutoriels — ROS", "Open Robotics", "https://docs.ros.org/en/humble/Tutorials.html")],
    "3 mois", ["robotics"]
  ),
  S(
    "embedded",
    "Systèmes embarqués",
    "Du code au plus près du matériel",
    "La spécialisation du firmware : microcontrôleurs, temps réel, contraintes extrêmes. Le code qui fait bouger le monde.",
    "intermediate", "robotique", "specialization", ["cpp", "electronics"],
    ["Microcontrôleurs", "Temps réel", "Bare metal", "RTOS", "Low power", "Debug HW"],
    ["Firmware Arduino/ESP32", "Objet connecté complet"],
    [DOC("Système embarqué — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Syst%C3%A8me_embarqu%C3%A9"), DOC("ESP-IDF — Docs", "Espressif", "https://docs.espressif.com/projects/esp-idf/fr/latest/")],
    "3 mois", ["robotics"]
  ),
  S(
    "robotics",
    "Robotique",
    "Des machines autonomes",
    "La spécialisation ultime : perception, décision, action. Des robots qui comprennent et agissent dans le monde réel.",
    "advanced", "robotique", "specialization", ["ros", "control-systems"],
    ["Perception", "Planification", "SLAM", "Contrôle", "IA embarquée", "Sécurité"],
    ["Robot mobile autonome", "Bras robotique avec vision"],
    [DOC("Robotique — Wikipedia", "Wikipedia", "https://fr.wikipedia.org/wiki/Robotique"), DOC("Modern Robotics (livre)", "Northwestern", "http://hades.mech.northwestern.edu/index.php/Modern_Robotics")],
    "6 mois", ["computer-vision", "embedded"]
  ),
];

export const informatiqueRoadmap: Roadmap = {
  id: "informatique",
  slug: "informatique",
  fieldId: "informatique",
  title: "Informatique",
  tagline: "La carte interactive de tout l'écosystème : langages, outils, plateformes et spécialisations.",
  description:
    "Une véritable carte des connaissances : partez des fondations, explorez les branches — développement, IA, infrastructure, data, automation, cybersécurité, robotique — et suivez les dépendances réelles entre technologies. Chaque nœud est un langage, un outil, un framework, une plateforme ou une spécialisation utilisé dans l'industrie.",
  levelLabel: "Tous niveaux",
  duration: "12 à 24 mois",
  stages: [
    { id: "fondations", label: "Fondations", description: "Le tronc commun : culture, systèmes, réseaux et protocoles." },
    { id: "developpement", label: "Développement", description: "Web, mobile et desktop : langages, frameworks et outils." },
    { id: "ia", label: "Intelligence artificielle", description: "Machine learning, deep learning et IA générative." },
    { id: "infrastructure", label: "Infrastructure & DevOps", description: "Conteneurs, cloud et automatisation du déploiement." },
    { id: "data", label: "Data", description: "Bases de données, pipelines et science des données." },
    { id: "automation", label: "Automation", description: "Connecter applications, APIs et services." },
    { id: "cybersecurite", label: "Cybersécurité", description: "Protéger systèmes, réseaux et applications." },
    { id: "robotique", label: "Robotique & Embarqué", description: "Du microcontrôleur au robot autonome." },
  ],
  skills: [
    ...FONDATIONS,
    ...DEVELOPPEMENT,
    ...IA,
    ...INFRASTRUCTURE,
    ...DATA,
    ...AUTOMATION,
    ...CYBERSECURITE,
    ...ROBOTIQUE,
  ],
  careerSlugs: [
    "frontend-developer",
    "backend-developer",
    "devops-engineer",
    "ai-engineer",
    "data-scientist",
    "cybersecurity-engineer",
  ],
};

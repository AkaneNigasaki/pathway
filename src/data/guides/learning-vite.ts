import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Vite : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Version couverte : Vite 5/6 (dev server ESM, build Rollup).
 */
export const LEARNING_VITE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Vite : l'outil de build moderne de l'écosystème JavaScript.",
    blocks: [
      {
        kind: "text",
        text: "Vite est l'outil de build moderne de l'écosystème JS : serveur de développement instantané grâce aux modules ES natifs du navigateur, rechargement à chaud éclair (HMR), et build de production optimisé via Rollup.",
      },
      {
        kind: "text",
        text: "Pourquoi Vite existe : les bundlers historiques (webpack et assimilés) rebundlaient tout le projet à chaque démarrage — des dizaines de secondes sur les gros projets. Vite a inversé le modèle : en développement, le navigateur charge les modules ES directement, sans bundling préalable. Le démarrage passe de dizaines de secondes à quelques centaines de millisecondes.",
      },
      {
        kind: "text",
        text: "Positionnement : Vite est devenu le standard pour les nouveaux projets React, Vue ou vanilla — et la base d'outils comme Vitest. Il ne remplace pas le framework : il fournit le serveur de dev, le build et le pipeline d'assets autour.",
      },
    ],
  },
  {
    id: "dev-vs-build",
    title: "Dev server vs build : deux moteurs",
    level: 1,
    intro:
      "Le point clé : Vite utilise deux stratégies différentes en développement et en production.",
    blocks: [
      {
        kind: "diagram",
        title: "Les deux modes de Vite",
        lines: [
          "DÉVELOPPEMENT (`npm run dev`)",
          "Navigateur demande les modules ES un par un",
          "  → Vite les sert à la demande, transformés à la volée",
          "  → pas de bundling : démarrage instantané",
          "  → HMR : les modifications s'appliquent sans recharger",
          "",
          "PRODUCTION (`npm run build`)",
          "Rollup bundle tout en fichiers optimisés",
          "  → minification, code splitting, hash des assets",
          "  → dossier `dist/` : fichiers statiques à déployer",
        ],
      },
      {
        kind: "text",
        text: "Conséquence : le comportement peut légèrement différer entre dev et build (résolution, ordre) — d'où l'importance de tester le build (`npm run preview`) avant de déployer. Et les dépendances sont pré-bundlées en dev (esbuild) pour réduire le nombre de requêtes : c'est l'optimisation invisible qui garde le dev server rapide.",
      },
      {
        kind: "list",
        items: [
          "Dev = ESM natif à la demande : rapide, fidèle aux modules.",
          "Build = Rollup : optimisé pour le réseau (peu de fichiers, minifiés).",
          "`preview` : servir localement le build — la répétition avant la production.",
        ],
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
      "Vite orchestre des outils JS : il faut comprendre ceux qu'il orchestre.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "npm",
            value:
              "Vite s'installe et se lance via npm : comprendre les scripts (`npm run dev`), les dépendances et le lockfile.",
          },
          {
            label: "JavaScript — modules ES",
            value:
              "`import` / `export` : Vite les exploite nativement sans les bundler en dev. Sans cette base, le modèle mental s'effondre.",
          },
          {
            label: "TypeScript (bases)",
            value:
              "La config et les templates sont en TS : lire un `vite.config.ts` typé.",
          },
          {
            label: "Terminal",
            value:
              "Lancer des commandes, lire les erreurs du dev server, comprendre les ports.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. Le plus important : les modules ES — tout le design de Vite (dev server, HMR, pré-bundling) en découle.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Créer un projet Vite avec le scaffolder officiel, comprendre les templates.",
    blocks: [
      {
        kind: "command",
        label: "Créer un projet",
        command: "npm create vite@latest mon-app",
        why: "Le scaffolder officiel : pose les questions (nom, framework, variante TypeScript ou non) et génère la structure. `@latest` garantit la dernière version du scaffolder.",
        verify: "ls mon-app",
      },
      {
        kind: "command",
        label: "Installer puis démarrer",
        command: "cd mon-app && npm install && npm run dev",
        why: "`npm install` installe les dépendances (dont `vite`), `npm run dev` lance le dev server — démarrage quasi instantané, URL affichée dans le terminal (http://localhost:5173 par défaut).",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:5173",
      },
      {
        kind: "list",
        items: [
          "Templates : `vanilla`, `react`, `vue`, `svelte`… — choisir le framework puis la variante TS.",
          "Le template n'est qu'un point de départ : la structure générée est minimale et lisible.",
          "Node.js récent requis : vérifier la version minimale dans la documentation si le scaffolder échoue.",
        ],
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet",
    level: 2,
    intro:
      "De la création au build : le cycle complet sur un projet React + Vite.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Scaffolder le projet",
            detail:
              "`npm create vite@latest mon-app` : choisir `React` puis `TypeScript`. `cd mon-app && npm install`.",
          },
          {
            title: "Explorer la structure",
            detail:
              "`index.html` à la racine (le point d'entrée, particularité Vite), `src/main.tsx` qui monte l'app, `src/App.tsx` le composant racine, `vite.config.ts` la configuration.",
          },
          {
            title: "Lancer le dev server",
            detail:
              "`npm run dev` : ouvrir l'URL affichée. Le compteur de clics du template prouve que le HMR fonctionne.",
          },
          {
            title: "Modifier et observer le HMR",
            detail:
              "Changer le texte dans `App.tsx` et sauvegarder : la page se met à jour sans recharger, l'état (le compteur) est préservé — c'est le Hot Module Replacement.",
          },
          {
            title: "Builder pour la production",
            detail:
              "`npm run build` : génère `dist/` (HTML + JS/CSS minifiés avec hash). `npm run preview` sert ce build localement pour vérification.",
          },
          {
            title: "Comparer dev et build",
            detail:
              "Ouvrir les DevTools → Network sur les deux : en dev, des dizaines de modules ; en build, quelques fichiers optimisés. Les deux doivent afficher la même application.",
          },
        ],
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Éditeur, terminal, navigateur : le trio du développement Vite quotidien.",
    blocks: [
      {
        kind: "diagram",
        title: "La boucle de développement",
        lines: [
          "Éditeur (VS Code : aucun plugin Vite requis)",
          "      ↓  sauvegarde",
          "Terminal (`npm run dev` : dev server + HMR)",
          "      ↓  transformation à la volée",
          "Navigateur (modules ES, DevTools)",
          "      ↓  erreur ? overlay dans le navigateur",
          "Retour à l'éditeur",
        ],
      },
      {
        kind: "text",
        text: "Vite affiche les erreurs de compilation en overlay dans le navigateur : pas besoin de surveiller le terminal en permanence. VS Code ne requiert aucun plugin Vite — tout passe par le terminal ; les extensions utiles dépendent du template (ESLint, Prettier).",
      },
    ],
  },
  {
    id: "structure-projet",
    title: "Structure du projet",
    level: 2,
    intro:
      "Comprendre chaque fichier généré : `index.html`, `src/`, `public/`, `vite.config.ts`.",
    blocks: [
      {
        kind: "diagram",
        title: "Arborescence d'un projet Vite",
        lines: [
          "mon-app/",
          " ├── index.html          ← point d'entrée (particularité Vite)",
          " ├── public/             ← assets copiés tels quels",
          " ├── src/",
          " │   ├── main.tsx        ← point d'entrée JS (référencé par index.html)",
          " │   ├── App.tsx         ← composant racine",
          " │   ├── index.css       ← styles globaux",
          " │   └── assets/         ← images importées (hashées au build)",
          " ├── vite.config.ts      ← configuration",
          " ├── package.json        ← scripts dev/build/preview",
          " └── tsconfig.json       ← configuration TypeScript",
        ],
      },
      {
        kind: "list",
        items: [
          "`index.html` à la racine : Vite le traite comme point d'entrée et y injecte les scripts — il est servi tel quel en dev.",
          "`public/` : fichiers copiés sans transformation, accessibles à la racine (`/logo.png`).",
          "`src/assets/` : assets importés dans le code — optimisés et hashés au build.",
          "Le script `dev` / `build` / `preview` dans `package.json` : les trois commandes du quotidien.",
        ],
      },
    ],
  },
  {
    id: "dev-server",
    title: "Le dev server",
    level: 2,
    intro:
      "Pourquoi il démarre si vite : ESM natif, transformation à la demande, pré-bundling.",
    blocks: [
      {
        kind: "list",
        items: [
          "ESM natif : le navigateur demande chaque module via `import` — Vite les sert un par un, transformés (TS → JS, JSX → JS) à la volée.",
          "Pas de bundling en dev : seuls les modules demandés sont traités — d'où le démarrage en millisecondes quel que soit le projet.",
          "Pré-bundling (esbuild) : les dépendances (`node_modules`) sont pré-bundlées en un seul fichier chacune — réduit les centaines de requêtes en quelques-unes.",
          "HMR : quand un fichier change, seul le module concerné est remplacé — l'état de l'application est préservé.",
          "Limites du HMR : un changement de config ou d'export racine peut forcer un rechargement complet — normal.",
        ],
      },
    ],
  },
  {
    id: "configuration-base",
    title: "Configuration de base",
    level: 2,
    intro:
      "Le fichier `vite.config.ts` : plugins, alias et les options du quotidien.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "vite.config.ts typique",
        code: `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport path from "node:path";\n\nexport default defineConfig({\n  plugins: [react()],\n  resolve: {\n    alias: {\n      "@": path.resolve(__dirname, "./src"),\n    },\n  },\n  server: {\n    port: 5173,\n  },\n});`,
      },
      {
        kind: "list",
        items: [
          "`defineConfig` : le helper typé — autocomplétion et vérification de la config.",
          "`plugins` : le plugin du framework (`@vitejs/plugin-react` pour React) est indispensable — sans lui, le JSX n'est pas transformé.",
          "`resolve.alias` : `@` → `src` — des imports absolus (`@/components/Bouton`) au lieu de `../../../`.",
          "`server.port` : le port du dev server — 5173 par défaut, incrémenté si occupé.",
        ],
      },
    ],
  },
  {
    id: "variables-environnement",
    title: "Variables d'environnement",
    level: 2,
    intro:
      "Le préfixe `VITE_`, les fichiers `.env` et `import.meta.env`.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: ".env — déclaration",
        code: `VITE_API_URL=https://api.exemple.com\nVITE_DEBUG=false`,
      },
      {
        kind: "code",
        language: "typescript",
        title: "Lecture dans le code",
        code: `const apiUrl = import.meta.env.VITE_API_URL;\nconst isDev = import.meta.env.DEV;   // true en dev server\nconst isProd = import.meta.env.PROD; // true après build`,
      },
      {
        kind: "list",
        items: [
          "Préfixe obligatoire : seules les variables `VITE_*` sont exposées au code client — les autres restent côté build.",
          "Sécurité : tout ce qui est préfixé `VITE_` finit dans le bundle public — jamais de secret.",
          "Fichiers : `.env`, `.env.local` (non commité), `.env.production` — chargés selon le mode.",
          "`import.meta.env` : l'objet d'accès — `DEV`, `PROD` et `MODE` sont toujours disponibles.",
        ],
      },
    ],
  },
  {
    id: "build-production",
    title: "Build de production",
    level: 2,
    intro:
      "`npm run build` : ce qui se passe quand Rollup prend le relais.",
    blocks: [
      {
        kind: "command",
        label: "Builder le projet",
        command: "npm run build",
        why: "Lance le build de production : Rollup bundle les modules, minifie, découpe le code (code splitting), hashe les noms d'assets et écrit le tout dans `dist/`.",
        verify: "ls dist/",
      },
      {
        kind: "command",
        label: "Prévisualiser le build",
        command: "npm run preview",
        why: "Sert localement le contenu de `dist/` : la répétition générale avant déploiement. Toute différence avec le dev doit être investiguée ici, pas en production.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:4173",
      },
      {
        kind: "list",
        items: [
          "`dist/` : fichiers statiques — déployables sur n'importe quel hébergeur statique.",
          "Hash des assets (`index-a3f9c2.js`) : le cache navigateur est invalidé à chaque build.",
          "Minification : esbuild par défaut — rapide et suffisante.",
        ],
      },
    ],
  },
  {
    id: "assets",
    title: "Gérer les assets",
    level: 2,
    intro:
      "`public/` vs `src/assets/` : deux stratégies, deux cas d'usage.",
    blocks: [
      {
        kind: "table",
        headers: ["", "`public/`", "`src/assets/` (importé)"],
        rows: [
          ["Traitement", "Copié tel quel", "Optimisé + hashé au build"],
          ["Référence", "URL absolue `/logo.png`", "`import logo from \"./assets/logo.png\"`"],
          ["Cas d'usage", "robots.txt, favicons, assets rarement changés", "Images du design, liées au code"],
          ["Avantage", "URL stable et prévisible", "Cache invalidé automatiquement"],
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Importer un asset",
        code: `import logo from "./assets/logo.png";\n\nfunction Header() {\n  return <img src={logo} alt="Logo" />;\n}`,
      },
    ],
  },
  {
    id: "debugging-debutant",
    title: "Debugging : les pannes classiques",
    level: 2,
    intro:
      "Port occupé, page blanche, HMR capricieux : les diagnostics de base.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic",
        fields: [
          {
            label: "Port déjà utilisé",
            value:
              "Vite incrémente automatiquement le port (5174, 5175…) : vérifier l'URL affichée dans le terminal plutôt que de supposer 5173.",
          },
          {
            label: "Page blanche sans erreur visible",
            value:
              "Ouvrir la console du navigateur : l'overlay d'erreur Vite n'apparaît que pour les erreurs de transformation. Une erreur runtime se voit dans la console.",
          },
          {
            label: "Changement non pris en compte",
            value:
              "Le HMR a ses limites (config, certains exports) : recharger la page. Si ça persiste, redémarrer le dev server — surtout après modification de `vite.config.ts`.",
          },
          {
            label: "Dépendance qui ne se met pas à jour",
            value:
              "Le pré-bundling met en cache les dépendances : après mise à jour d'un paquet, relancer avec `npm run dev -- --force` pour forcer le re-bundling.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Quatre projets de difficulté croissante, du site statique au build optimisé.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Site vitrine",
        fields: [
          { label: "Compétences requises", value: "Scaffolding, dev server, assets" },
          { label: "Ce que vous construisez", value: "Un site vitrine multi-sections avec images et styles" },
          { label: "Ce que vous apprenez", value: "Structure du projet, `public/` vs imports, HMR" },
          { label: "Difficulté attendue", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "App React configurée" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — App React configurée",
        fields: [
          { label: "Compétences requises", value: "vite.config.ts, alias, variables d'environnement" },
          { label: "Ce que vous construisez", value: "Une application React avec alias `@`, proxy API et variables d'env" },
          { label: "Ce que vous apprenez", value: "Configuration, proxy de dev, `.env` par mode" },
          { label: "Difficulté attendue", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Build optimisé" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Build optimisé",
        fields: [
          { label: "Compétences requises", value: "Code splitting, analyse du bundle, plugins" },
          { label: "Ce que vous construisez", value: "Une app avec lazy loading, bundle analysé et taille maîtrisée" },
          { label: "Ce que vous apprenez", value: "Découpage, analyse, optimisation du build Rollup" },
          { label: "Difficulté attendue", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "Plugin maison" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Plugin maison",
        fields: [
          { label: "Compétences requises", value: "Tout le programme : hooks, HMR API, lib mode" },
          { label: "Ce que vous construisez", value: "Un plugin Vite résolvant un besoin réel (ex. import d'un format custom)" },
          { label: "Ce que vous apprenez", value: "Pipeline de transformation, compatibilité dev/build" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "Publier le plugin sur npm" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "config-avancee",
    title: "Configuration avancée",
    level: 3,
    intro:
      "Au-delà des bases : `base`, `define`, `server` et la config conditionnelle.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Config selon le mode",
        code: `import { defineConfig, loadEnv } from "vite";\n\nexport default defineConfig(({ mode }) => {\n  const env = loadEnv(mode, process.cwd());\n  return {\n    base: "/mon-app/",        // sous-chemin de déploiement\n    define: {\n      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION),\n    },\n    server: { port: 5173, strictPort: true },\n  };\n});`,
      },
      {
        kind: "list",
        items: [
          "`base: \"/mon-app/\"` : déployer sous un sous-chemin (GitHub Pages projet) — les URLs d'assets suivent.",
          "`define` : constantes remplacées à la compilation — attention, les valeurs doivent être sérialisées (`JSON.stringify`).",
          "`loadEnv` : charger les variables d'environnement dans la config elle-même.",
          "Config fonction : `defineConfig(({ mode, command }) => ...)` — adapter selon dev/build.",
          "`server.strictPort: true` : échoue si le port est occupé au lieu d'incrémenter — utile en équipe/CI.",
        ],
      },
    ],
  },
  {
    id: "proxy-dev",
    title: "Proxy de développement",
    level: 3,
    intro:
      "Appeler une API sans CORS en dev : `server.proxy` redirige vers le backend.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Proxy API",
        code: `export default defineConfig({\n  server: {\n    proxy: {\n      "/api": {\n        target: "http://localhost:3000",\n        changeOrigin: true,\n      },\n    },\n  },\n});`,
      },
      {
        kind: "text",
        text: "En dev, `fetch(\"/api/utilisateurs\")` est redirigé vers le backend local — le navigateur ne voit qu'une même origine, donc pas de CORS. En production, c'est le serveur (ou le CDN) qui gère ce routage : le proxy n'existe qu'en dev. Ne pas confondre avec une solution de production.",
      },
    ],
  },
  {
    id: "plugins",
    title: "Plugins Vite",
    level: 3,
    intro:
      "L'écosystème et l'écriture de plugins : les hooks Rollup compatibles.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Squelette d'un plugin",
        code: `import type { Plugin } from "vite";\n\nexport function monPlugin(): Plugin {\n  return {\n    name: "mon-plugin",\n    transform(code, id) {\n      if (id.endsWith(".txt")) {\n        return "export default " + JSON.stringify(code);\n      }\n    },\n  };\n}`,
      },
      {
        kind: "list",
        items: [
          "Interface Rollup : `resolveId`, `load`, `transform` — les plugins Vite sont des plugins Rollup avec des hooks dev en plus.",
          "`transform(code, id)` : transformer un module (ex. `.txt` → string exportée) — le hook le plus utile.",
          "`configureServer` / `handleHotUpdate` : hooks spécifiques au dev server.",
          "Plugins connus : `@vitejs/plugin-react`, `vite-plugin-pwa`, `@tailwindcss/vite` — à installer via npm.",
          "Règle : un plugin doit se comporter pareil en dev et en build — tester les deux.",
        ],
      },
    ],
  },
  {
    id: "hmr-api",
    title: "L'API HMR",
    level: 3,
    intro:
      "Contrôler le rechargement à chaud depuis le code : `import.meta.hot`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Accepter le HMR manuellement",
        code: `if (import.meta.hot) {\n  import.meta.hot.accept((nouveauModule) => {\n    // Appliquer la mise à jour sans recharger la page\n    mettreAJour(nouveauModule);\n  });\n\n  import.meta.hot.dispose(() => {\n    // Nettoyer : timers, listeners, connexions\n    nettoyer();\n  });\n}`,
      },
      {
        kind: "list",
        items: [
          "`import.meta.hot` : n'existe qu'en dev — toujours le garder derrière un `if`.",
          "`accept()` : gérer soi-même la mise à jour — pour l'état non géré par le framework.",
          "`dispose()` : nettoyer avant remplacement — sinon fuites (timers, sockets) à chaque sauvegarde.",
          "En pratique : les plugins de frameworks (React, Vue) gèrent le HMR — l'API manuelle sert aux cas spécifiques.",
        ],
      },
    ],
  },
  {
    id: "optimizedeps",
    title: "optimizeDeps : le pré-bundling",
    level: 3,
    intro:
      "Comprendre et régler le pré-bundling des dépendances : la mécanique qui rend le dev rapide.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Régler le pré-bundling",
        code: `export default defineConfig({\n  optimizeDeps: {\n    include: ["ma-lib-lente"],   // forcer l'inclusion\n    exclude: ["ma-lib-esm"],     // exclure (déjà ESM pur)\n  },\n});`,
      },
      {
        kind: "list",
        items: [
          "Pourquoi : une dépendance CommonJS = des centaines de petits fichiers — esbuild les fusionne en un seul module ESM.",
          "`include` : forcer une dépendance découverte tardivement (import dynamique).",
          "`exclude` : les librairies déjà ESM pures n'ont pas besoin d'être pré-bundlées.",
          "Cache : `node_modules/.vite` — le supprimer si une dépendance semble « gelée » après mise à jour.",
          "`--force` : `npm run dev -- --force` force le re-bundling — le premier réflexe en cas de comportement étrange.",
        ],
      },
    ],
  },
  {
    id: "build-rollup",
    title: "Le build Rollup en détail",
    level: 3,
    intro:
      "Piloter le bundling de production : `build.rollupOptions` et le découpage manuel.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Options Rollup",
        code: `export default defineConfig({\n  build: {\n    target: "es2020",\n    sourcemap: true,\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          vendor: ["react", "react-dom"],\n        },\n      },\n    },\n  },\n});`,
      },
      {
        kind: "list",
        items: [
          "`build.target` : la cible JS émise — alignée sur les navigateurs à supporter.",
          "`manualChunks` : regrouper des dépendances dans un chunk séparé — le vendor change rarement, il reste en cache.",
          "`sourcemap: true` : source maps de production — indispensables pour debugger les erreurs en prod.",
          "Attention : trop découper nuit au chargement (plus de requêtes) — mesurer avant d'optimiser.",
        ],
      },
    ],
  },
  {
    id: "code-splitting",
    title: "Code splitting et lazy loading",
    level: 3,
    intro:
      "Charger le code à la demande : `import()` dynamique et `React.lazy`.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Route chargée à la demande",
        code: `import { lazy, Suspense } from "react";\n\nconst TableauDeBord = lazy(() => import("./pages/TableauDeBord"));\n\nfunction App() {\n  return (\n    <Suspense fallback={<p>Chargement…</p>}>\n      <TableauDeBord />\n    </Suspense>\n  );\n}`,
      },
      {
        kind: "text",
        text: "`import()` dynamique crée un chunk séparé chargé uniquement quand la route s'affiche : le bundle initial reste léger. Stratégie : découper par route, pas par composant — le découpage trop fin multiplie les requêtes. Vérifier les chunks générés dans `dist/` après build.",
      },
    ],
  },
  {
    id: "css-vite",
    title: "CSS dans Vite",
    level: 3,
    intro:
      "Modules CSS, préprocesseurs et options : le pipeline CSS de Vite.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "CSS Modules",
        code: `// Bouton.module.css → classes scopées au composant\nimport styles from "./Bouton.module.css";\n\nfunction Bouton() {\n  return <button className={styles.primaire}>OK</button>;\n}`,
      },
      {
        kind: "code",
        language: "typescript",
        title: "Préprocesseur Sass",
        code: `export default defineConfig({\n  css: {\n    preprocessorOptions: {\n      scss: { additionalData: \`@use "@/styles/vars" as *;\` },\n    },\n  },\n});`,
      },
      {
        kind: "list",
        items: [
          "CSS Modules (`*.module.css`) : classes scopées automatiquement — le standard pour styler par composant sans collision.",
          "Préprocesseurs : Sass/Less/Stylus via `preprocessorOptions` — nécessite le paquet correspondant (`sass`).",
          "`additionalData` : préfixe injecté dans chaque fichier — variables globales sans import manuel.",
          "PostCSS : `postcss.config.js` détecté automatiquement — Tailwind et Autoprefixer s'y branchent.",
        ],
      },
    ],
  },
  {
    id: "typescript-esbuild",
    title: "TypeScript : transpilation sans vérification",
    level: 3,
    intro:
      "Vite transpile le TS avec esbuild mais ne vérifie pas les types : comprendre cette séparation.",
    blocks: [
      {
        kind: "list",
        items: [
          "esbuild transpile (supprime les types) sans les vérifier : une erreur de type n'empêche ni le dev ni le build.",
          "Conséquence : `tsc --noEmit` (ou `vue-tsc`) doit tourner séparément — en CI et/ou en watch dans l'éditeur.",
          "Le template ajoute `tsc -b && vite build` dans le script `build` : la vérification bloque le build en cas d'erreur.",
          "Limites esbuild : certaines fonctionnalités TS exotiques (`const enum` isolés, décorateurs legacy) — la doc liste les cas.",
        ],
      },
      {
        kind: "command",
        label: "Vérifier les types séparément",
        command: "npx tsc --noEmit",
        why: "Vérifie les types de tout le projet sans émettre de fichiers : le complément indispensable au dev server Vite, qui lui ne vérifie rien.",
        verify: "npx tsc --noEmit && echo OK",
      },
    ],
  },
  {
    id: "assets-avance",
    title: "Assets avancés : glob et requêtes",
    level: 3,
    intro:
      "`import.meta.glob`, `?raw`, `?url` : les imports d'assets spéciaux de Vite.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Imports spéciaux",
        code: `// Importer tous les fichiers d'un dossier\nconst modules = import.meta.glob("./articles/*.md", { eager: true });\n\n// Contenu brut d'un fichier texte\nimport texte from "./notes.txt?raw";\n\n// URL d'un asset sans l'importer comme module\nimport imgUrl from "./photo.png?url";`,
      },
      {
        kind: "list",
        items: [
          "`import.meta.glob` : importe un ensemble de fichiers par motif — parfait pour un blog ou une galerie sans liste manuelle.",
          "`?raw` : le contenu du fichier comme chaîne — pour afficher du code ou du Markdown brut.",
          "`?url` : l'URL de l'asset sans l'importer — quand on a juste besoin du chemin.",
          "Types : ces imports nécessitent `vite/client` dans les types (`tsconfig` du template l'inclut).",
        ],
      },
    ],
  },
  {
    id: "workers",
    title: "Web Workers",
    level: 3,
    intro:
      "Déporter les calculs lourds : le pattern Worker de Vite, en dev comme en build.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Créer un worker",
        code: `// main.ts\nconst worker = new Worker(new URL("./calcul.worker.ts", import.meta.url), {\n  type: "module",\n});\nworker.postMessage(donnees);\nworker.onmessage = (e) => afficher(e.data);`,
      },
      {
        kind: "text",
        text: "Le pattern `new URL(\"./worker.ts\", import.meta.url)` fonctionne en dev et en build : Vite bundle le worker séparément. Cas d'usage : parsing, chiffrement, calculs — tout ce qui bloquerait le thread principal plus de quelques dizaines de millisecondes.",
      },
    ],
  },
  {
    id: "lib-mode",
    title: "Mode bibliothèque",
    level: 3,
    intro:
      "Compiler une librairie publiable plutôt qu'une application : `build.lib`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Config lib",
        code: `import { defineConfig } from "vite";\nimport { resolve } from "node:path";\n\nexport default defineConfig({\n  build: {\n    lib: {\n      entry: resolve(__dirname, "src/index.ts"),\n      name: "MaLib",\n      fileName: "ma-lib",\n    },\n    rollupOptions: {\n      external: ["react"],  // les deps du consommateur, pas bundlées\n    },\n  },\n});`,
      },
      {
        kind: "list",
        items: [
          "`build.lib.entry` : le point d'entrée public de la librairie.",
          "`external` : les dépendances fournies par le consommateur (react, vue) — ne pas les bundler.",
          "Formats : ESM + UMD/CJS générés — compatibilité maximale.",
          "Types : `vite-plugin-dts` (ou `tsc`) génère les `.d.ts` — une lib sans types est incomplète.",
        ],
      },
    ],
  },
  {
    id: "ssr-bases",
    title: "SSR : les bases",
    level: 3,
    intro:
      "Le rendu côté serveur avec Vite : le principe, sans framework meta.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : Vite peut servir les modules à un serveur Node qui rend le HTML — le SSR « à la main ».",
          "En pratique : les frameworks meta (Next, Nuxt, SvelteKit) gèrent le SSR — Vite y est le moteur interne.",
          "`ssr` dans la config : options pour externaliser les dépendances côté serveur.",
          "Hydratation : le HTML servi est « réveillé » par le JS client — le même code doit tourner des deux côtés.",
          "Pièges : `window`/`document` inexistants côté serveur — garder ce code derrière des vérifications.",
        ],
      },
    ],
  },
  {
    id: "env-modes",
    title: "Modes et fichiers .env",
    level: 3,
    intro:
      "Dev, production, staging : les modes Vite et leurs fichiers d'environnement.",
    blocks: [
      {
        kind: "table",
        headers: ["Fichier", "Chargé quand", "Committé ?"],
        rows: [
          [".env", "Toujours", "Oui (valeurs non sensibles)"],
          [".env.local", "Toujours (prioritaire)", "Non — machine locale"],
          [".env.production", "Mode production", "Oui si non sensible"],
          [".env.staging", "`--mode staging`", "Selon sensibilité"],
        ],
      },
      {
        kind: "command",
        label: "Builder avec un mode custom",
        command: "npx vite build --mode staging",
        why: "Construit avec le mode `staging` : charge `.env.staging` en plus des `.env` de base. Permet des environnements intermédiaires (recette) avec leurs propres variables.",
        verify: "ls .env*",
      },
    ],
  },
  {
    id: "deploiement-statique",
    title: "Déploiement statique",
    level: 3,
    intro:
      "`dist/` est autonome : les règles pour le servir correctement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Servir `dist/` : n'importe quel serveur statique ou CDN — aucune logique serveur requise pour une SPA.",
          "SPA fallback : rediriger les 404 vers `index.html` — sinon le refresh sur `/dashboard` casse le routage client.",
          "`base` : à régler si déploiement sous un sous-chemin — sinon les assets sont introuvables.",
          "Cache : les assets hashés se cachent « pour toujours » ; `index.html` ne se cache pas (ou très peu).",
          "Prévisualiser avant : `npm run preview` localement — le déploiement ne doit jamais être le premier test du build.",
        ],
      },
    ],
  },
  {
    id: "pwa",
    title: "PWA avec Vite",
    level: 3,
    intro:
      "Transformer l'app en Progressive Web App : le plugin officiel.",
    blocks: [
      {
        kind: "command",
        label: "Installer le plugin PWA",
        command: "npm install -D vite-plugin-pwa",
        why: "Le plugin PWA de l'écosystème Vite : génère le service worker (via Workbox), le manifeste et les icônes — l'app devient installable et fonctionne hors-ligne.",
        verify: "npm list vite-plugin-pwa",
      },
      {
        kind: "list",
        items: [
          "Manifeste : nom, icônes, couleurs — ce qui rend l'app « installable ».",
          "Service worker : cache des assets — stratégie à choisir (cache-first pour les assets versionnés).",
          "Tester : le service worker ne s'active qu'en build — tester via `preview`, jamais en dev.",
        ],
      },
    ],
  },
  {
    id: "analyse-bundle",
    title: "Analyser le bundle",
    level: 3,
    intro:
      "Voir ce qui pèse dans le build : la visualisation avant l'optimisation.",
    blocks: [
      {
        kind: "command",
        label: "Installer le visualiseur",
        command: "npm install -D rollup-plugin-visualizer",
        why: "Génère une treemap interactive du bundle : chaque dépendance et son poids réel. On optimise ce qu'on voit — jamais à l'aveugle.",
        verify: "npm list rollup-plugin-visualizer",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Brancher le visualiseur",
        code: `import { visualizer } from "rollup-plugin-visualizer";\n\nexport default defineConfig({\n  plugins: [\n    visualizer({ filename: "stats.html", open: false }),\n  ],\n});`,
      },
      {
        kind: "list",
        items: [
          "Lire la treemap : les gros rectangles sont les cibles — souvent une librairie importée en entier.",
          "Coupables classiques : import de toute une lib d'icônes, moment.js, lodash non tree-shaké.",
          "Après optimisation : rebuilder et comparer — l'analyse est itérative.",
        ],
      },
    ],
  },
  {
    id: "performance-dev",
    title: "Performance du dev server",
    level: 3,
    intro:
      "Garder le dev server rapide quand le projet grandit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le dev server scale bien par design : seuls les modules visités sont transformés.",
          "Dépendances lourdes : `optimizeDeps.include` pour celles découvertes tardivement.",
          "Éviter les imports en cascade de fichiers géants non découpés — le HMR les retraite à chaque fois.",
          "Disque réseau / Docker : la latence FS ralentit le scan — monter les volumes en mode délégué si besoin.",
          "Mesurer : le temps de démarrage affiché dans le terminal est l'indicateur — pas une impression.",
        ],
      },
    ],
  },
  {
    id: "tests-vitest",
    title: "Tester avec Vitest",
    level: 3,
    intro:
      "Vite et Vitest partagent le pipeline : tester dans le même environnement que le dev.",
    blocks: [
      {
        kind: "list",
        items: [
          "Même config : Vitest lit `vite.config.ts` — alias, plugins et resolve sont partagés.",
          "Environnement : `jsdom` ou `happy-dom` pour les tests de composants (paquet à installer).",
          "Fichiers `*.test.ts(x)` à côté du code — la convention.",
          "`npm run test` : ajouter le script — `vitest run` en CI, `vitest` en watch local.",
          "Voir la compétence Tests pour les techniques de test elles-mêmes.",
        ],
      },
    ],
  },
  {
    id: "migration",
    title: "Migrer vers Vite",
    level: 3,
    intro:
      "Passer depuis Create React App ou webpack : les points de friction connus.",
    blocks: [
      {
        kind: "list",
        items: [
          "Variables d'env : `REACT_APP_*` → `VITE_*`, `process.env` → `import.meta.env` — recherche/remplacement systématique.",
          "`require()` : l'ESM ne le supporte pas — convertir en `import` (Vite ne polyfille pas Node en client).",
          "Polyfills Node : `buffer`, `process` autrefois implicites — à fournir explicitement si une lib en dépend.",
          "Stratégie : migrer sur une branche, faire passer les tests, comparer les builds — pas de big bang en production.",
          "Gain typique : démarrage dev et HMR transformés — c'est la motivation principale, pas le build.",
        ],
      },
    ],
  },
  {
    id: "monorepo",
    title: "Vite en monorepo",
    level: 3,
    intro:
      "Plusieurs apps/paquets Vite dans un workspace : les réglages qui évitent les surprises.",
    blocks: [
      {
        kind: "list",
        items: [
          "Workspaces npm/pnpm : dépendances hoistées — Vite résout via le workspace, généralement sans config.",
          "Paquets internes : les lier en `workspace:*` — le HMR les suit comme du code source.",
          "Dedupe : `resolve.dedupe: [\"react\"]` — une seule copie de React quand plusieurs paquets l'utilisent.",
          "Lib mode : pour publier les paquets internes — `build.lib` + types.",
          "CI : builder chaque app depuis sa racine — les chemins relatifs restent locaux au paquet.",
        ],
      },
    ],
  },
  {
    id: "multi-pages",
    title: "Applications multi-pages",
    level: 3,
    intro:
      "Vite n'est pas que pour les SPA : déclarer plusieurs points d'entrée HTML.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Entrées multiples",
        code: `import { defineConfig } from "vite";\nimport { resolve } from "node:path";\n\nexport default defineConfig({\n  build: {\n    rollupOptions: {\n      input: {\n        main: resolve(__dirname, "index.html"),\n        admin: resolve(__dirname, "admin/index.html"),\n      },\n    },\n  },\n});`,
      },
      {
        kind: "text",
        text: "Chaque HTML devient un point d'entrée avec son propre graphe de modules — les dépendances communes sont automatiquement partagées en chunks. Utile pour : site + back-office, landing + app, pages à SEO distinct.",
      },
    ],
  },
  {
    id: "cli-vite",
    title: "La CLI Vite",
    level: 3,
    intro:
      "Les commandes et flags : `vite`, `vite build`, `vite preview`, `vite optimize`.",
    blocks: [
      {
        kind: "command",
        label: "Aide de la CLI",
        command: "npx vite --help",
        why: "Affiche les commandes et options : dev, build, preview, optimize — avec leurs flags (`--port`, `--host`, `--mode`, `--force`).",
        verify: "npx vite --version",
      },
      {
        kind: "list",
        items: [
          "`vite` : dev server — `--host` pour exposer sur le réseau local (tester sur mobile).",
          "`vite build` : build — `--mode`, `--sourcemap`, `--minify`.",
          "`vite preview` : sert le build — `--port` pour choisir le port.",
          "`vite optimize` : force le pré-bundling des dépendances sans lancer le server.",
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand le dev server se comporte bizarrement : logs, inspect et résolution.",
    blocks: [
      {
        kind: "command",
        label: "Mode debug",
        command: "npx vite --debug",
        why: "Active les logs détaillés du dev server : résolution des modules, transform appliqués, HMR — le point de départ quand un import ne se résout pas comme prévu.",
      },
      {
        kind: "list",
        items: [
          "`DEBUG=vite:*` : granularité par namespace si `--debug` est trop verbeux.",
          "Résolution : `resolve.conditions`, `mainFields` — quand un paquet expose plusieurs builds.",
          "Conflit de versions : `npm ls <paquet>` — deux versions d'une lib = deux instances = bugs subtils.",
          "Reproduction minimale : un nouveau `npm create vite@latest` + le cas isolé — avant d'ouvrir une issue.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-avancees",
    title: "Erreurs courantes (avancé)",
    level: 3,
    intro:
      "Les pièges qui survivent aux débuts : ESM/CJS, `import.meta` et dépendances.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "`process is not defined`",
            value:
              "Du code (ou une lib) utilise `process.env` côté client. Vite ne fournit pas les globals Node : migrer vers `import.meta.env` ou fournir un polyfill explicite.",
          },
          {
            label: "Ça marche en dev, pas en build",
            value:
              "Différences ESM vs bundle : ordre d'évaluation, `import.meta.glob` eager/lazy, assets. Toujours tester `preview` avant de déployer.",
          },
          {
            label: "Dépendance non optimisée",
            value:
              "Lib CJS profonde qui ralentit le dev : `optimizeDeps.include` — ou remplacer par une alternative ESM.",
          },
          {
            label: "Double React",
            value:
              "Deux copies de React (app + lib liée) : hooks qui explosent. `resolve.dedupe` et `external` en lib mode.",
          },
          {
            label: "Base path oublié",
            value:
              "App déployée sous `/app/` avec `base: \"/\"` : assets en 404. Régler `base` selon le chemin réel de déploiement.",
          },
          {
            label: "Secret exposé",
            value:
              "Clé API en `VITE_*` : elle est dans le bundle public, lisible par tous. Les secrets restent côté serveur.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "La checklist d'un usage professionnel de Vite.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tester `preview` avant chaque déploiement — le build n'est pas le dev.",
          "`tsc --noEmit` en CI : Vite ne vérifie pas les types.",
          "Variables `VITE_*` : jamais de secret — le bundle est public.",
          "Découper par route (lazy) ; analyser le bundle avant d'optimiser.",
          "Épingler les versions (lockfile) : le build doit être reproductible.",
          "Alias `@` et structure `src/` cohérente dès le début.",
          "Documenter les variables d'environnement requises (`.env.example`).",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "Guide", value: "vite.dev : le guide complet — config, plugins, build, déploiement." },
          { label: "Référence config", value: "La référence des options : chaque clé de `vite.config.ts` documentée." },
          { label: "Dépôt", value: "Le dépôt GitHub vitejs/vite : code source, issues, discussions." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : migrer un petit projet existant — le meilleur exercice.",
          "Écosystème : explorer les plugins (PWA, images, Markdown) pour comprendre l'architecture.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Vite maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir un framework : React ou Vue — Vite en est le socle.",
          "Tester : Vitest partage le pipeline — la suite logique.",
          "Typer : TypeScript — la vérification que Vite ne fait pas.",
          "Optimiser : performance web — le build n'est que le début.",
          "Revenir à la roadmap : valider Vite et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

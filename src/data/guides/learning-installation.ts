import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'Installation & environnement : de zéro à un
 * projet TypeScript fonctionnel et sain. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_INSTALLATION: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'installer TypeScript signifie concrètement, et les pièces du puzzle.",
    blocks: [
      {
        kind: "text",
        text: "Installer TypeScript, c'est assembler une chaîne d'outils : Node.js (le runtime et son gestionnaire npm), le compilateur `tsc` (installé comme dépendance de développement du projet), et un fichier `tsconfig.json` qui règle la compilation. À la fin, un fichier `.ts` compile vers du JavaScript exécutable.",
      },
      {
        kind: "diagram",
        title: "La chaîne d'outils minimale",
        lines: [
          "Node.js (LTS)",
          "  └─ npm : installe les paquets",
          "     │",
          "     ▼",
          "Projet : package.json + node_modules/",
          "  └─ typescript (devDependency)",
          "     │  npx tsc",
          "     ▼",
          "tsconfig.json ──► tsc ──► dist/*.js (exécutable par node)",
        ],
      },
      {
        kind: "text",
        text: "Chaque pièce a un rôle distinct : Node exécute, npm installe, `tsc` vérifie et compile, `tsconfig.json` configure. Comprendre qui fait quoi évite 90 % des erreurs d'environnement.",
      },
    ],
  },
  {
    id: "chaine-outils",
    title: "Qui fait quoi",
    level: 1,
    intro: "Ne plus confondre Node, npm, npx et tsc.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre acteurs",
        fields: [
          { label: "Node.js", value: "Le runtime : il exécute le JavaScript produit. Il fournit aussi npm." },
          { label: "npm", value: "Le gestionnaire de paquets : il installe les dépendances décrites dans package.json." },
          { label: "npx", value: "L'exécuteur : il lance un binaire installé localement (comme `tsc`) sans installation globale." },
          { label: "tsc", value: "Le compilateur TypeScript : il vérifie les types puis émet du JavaScript." },
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
    intro: "Ce qu'il faut avant de commencer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un terminal fonctionnel (Terminal, PowerShell, ou le terminal intégré de VS Code).",
          "Une connexion internet pour télécharger Node.js et les paquets npm.",
          "Aucune connaissance TypeScript requise : l'environnement se monte avant le langage.",
        ],
      },
    ],
  },
  {
    id: "installer-node-lts",
    title: "Installer Node.js LTS",
    level: 2,
    intro: "La fondation : un runtime JavaScript moderne et stable.",
    blocks: [
      {
        kind: "command",
        label: "Installer la LTS via nvm",
        command: "nvm install --lts",
        why: "nvm (Node Version Manager) installe la version LTS — support long terme — de Node.js. La LTS reçoit les correctifs de sécurité pendant 30 mois : c'est la version recommandée pour apprendre et produire. nvm permet aussi de jongler entre versions si un projet l'exige.",
        verify: "node -v",
      },
      {
        kind: "text",
        text: "Sans nvm : téléchargez l'installeur LTS depuis nodejs.org (bouton vert « LTS ») et suivez l'assistant. Sur Linux, le dépôt NodeSource ou le gestionnaire de paquets de la distribution convient aussi. Fermez puis rouvrez le terminal après l'installation.",
      },
    ],
  },
  {
    id: "verifier-environnement",
    title: "Vérifier l'environnement",
    level: 2,
    intro: "Confirmer que Node et npm répondent avant d'aller plus loin.",
    blocks: [
      {
        kind: "command",
        label: "Afficher les versions installées",
        command: "node -v && npm -v",
        why: "Si les deux commandes affichent un numéro de version (par ex. `v22.x.x` et `10.x.x`), Node.js et npm fonctionnent. Tout diagnostic commence ici : une commande qui ne répond pas signale un problème d'installation ou de PATH, à régler avant d'installer quoi que ce soit.",
        verify: "which node && which npm",
      },
    ],
  },
  {
    id: "creer-dossier-projet",
    title: "Créer le dossier du projet",
    level: 2,
    intro: "Un projet propre commence par un dossier dédié.",
    blocks: [
      {
        kind: "command",
        label: "Créer et ouvrir le dossier",
        command: "mkdir mon-projet && cd mon-projet",
        why: "Chaque projet vit dans son propre dossier : ses dépendances (`node_modules/`), sa configuration et ses sources y sont isolées. Travailler dans un dossier dédié évite de polluer le dossier personnel avec des `node_modules` orphelins.",
        verify: "pwd",
      },
    ],
  },
  {
    id: "npm-init",
    title: "Initialiser avec npm",
    level: 2,
    intro: "Créer le `package.json`, la carte d'identité du projet.",
    blocks: [
      {
        kind: "command",
        label: "Générer un package.json",
        command: "npm init -y",
        why: "Crée un `package.json` avec des valeurs par défaut (`-y` répond « oui » à toutes les questions). Ce fichier liste les dépendances, les scripts et les métadonnées du projet : c'est lui qui rend l'installation reproductible sur une autre machine avec un simple `npm install`.",
        verify: "cat package.json",
      },
      {
        kind: "code",
        language: "json",
        title: "package.json minimal",
        code: `{
  "name": "mon-projet",
  "version": "1.0.0",
  "type": "module",
  "scripts": {},
  "devDependencies": {}
}`,
      },
    ],
  },
  {
    id: "installer-typescript-dev",
    title: "Installer TypeScript",
    level: 2,
    intro: "Le compilateur comme dépendance de développement.",
    blocks: [
      {
        kind: "command",
        label: "Installer TypeScript en devDependency",
        command: "npm install --save-dev typescript",
        why: "Télécharge TypeScript dans `node_modules/` et l'enregistre dans `devDependencies` : il sert à développer et à compiler, jamais à s'exécuter en production. L'installation locale lie la version au projet — chaque projet peut utiliser sa propre version de TypeScript sans conflit.",
        verify: "npx tsc --version",
      },
      {
        kind: "text",
        text: "Évitez l'installation globale (`npm install -g typescript`) : elle fige une version unique pour toute la machine et masque les différences entre projets. `npx tsc` trouve toujours le binaire local en priorité.",
      },
    ],
  },
  {
    id: "tsconfig-init",
    title: "Générer le tsconfig",
    level: 2,
    intro: "Le fichier qui pilote le compilateur.",
    blocks: [
      {
        kind: "command",
        label: "Créer tsconfig.json",
        command: "npx tsc --init",
        why: "Génère un `tsconfig.json` avec toutes les options commentées. Sans ce fichier, `tsc` compile avec des valeurs par défaut peu adaptées (pas de mode strict, sortie mélangée aux sources). Le tsconfig déclare : quels fichiers compiler, vers quel JavaScript cibler, et avec quelle rigueur vérifier.",
        verify: "ls tsconfig.json",
      },
      {
        kind: "code",
        language: "json",
        title: "tsconfig.json de démarrage",
        code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "strict": true,
    "outDir": "dist",
    "rootDir": "src",
    "moduleResolution": "NodeNext"
  },
  "include": ["src"]
}`,
      },
    ],
  },
  {
    id: "premier-fichier-ts",
    title: "Premier fichier TypeScript",
    level: 2,
    intro: "Écrire du `.ts` et le voir compiler.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "src/index.ts",
        code: `const message: string = "Bonjour TypeScript !";
console.log(message);`,
      },
      {
        kind: "command",
        label: "Compiler le projet",
        command: "npx tsc",
        why: "Lance le compilateur sur le projet : il lit `tsconfig.json`, vérifie les types de `src/`, puis émet le JavaScript dans `dist/`. Sans erreur affichée, la compilation a réussi. C'est LA commande centrale — tout le workflow tourne autour d'elle.",
        verify: "ls dist",
      },
    ],
  },
  {
    id: "compiler-executer",
    title: "Exécuter le résultat",
    level: 2,
    intro: "Boucler la boucle : du `.ts` au programme qui tourne.",
    blocks: [
      {
        kind: "command",
        label: "Exécuter le JavaScript compilé",
        command: "node dist/index.js",
        why: "Node.js exécute le JavaScript produit par `tsc`. Rappelez-vous : TypeScript ne s'exécute jamais directement — `node` ne comprend que le `.js` généré. Ce cycle écrire → compiler → exécuter est le rythme de base du développement TypeScript sans outil supplémentaire.",
        verify: "echo $?",
      },
      {
        kind: "text",
        text: "Si `dist/` contient bien `index.js`, tout fonctionne. En cas d'erreur de type dans le `.ts`, `tsc` l'affiche et (par défaut) émet quand même : réglez `noEmitOnError: true` pour bloquer l'émission en cas d'erreur (voir niveau 3).",
      },
    ],
  },
  {
    id: "scripts-npm-base",
    title: "Scripts npm de base",
    level: 2,
    intro: "Nommer les commandes pour ne plus les retaper.",
    blocks: [
      {
        kind: "command",
        label: "Ajouter des scripts au package.json",
        command: "npm pkg set scripts.build=\"tsc\" scripts.typecheck=\"tsc --noEmit\"",
        why: "Enregistre deux commandes nommées : `build` compile le projet, `typecheck` vérifie les types sans émettre de fichiers. Les scripts standardisent le workflow : `npm run build` fonctionne partout, sans que chacun retienne les flags exacts.",
        verify: "npm run",
      },
      {
        kind: "command",
        label: "Vérifier les types sans compiler",
        command: "npm run typecheck",
        why: "Lance `tsc --noEmit` : vérification complète des types, zéro fichier produit. C'est la commande idéale pour l'intégration continue et les vérifications rapides — elle répond à « mon code est-il correct ? » sans toucher à `dist/`.",
        verify: "echo $?",
      },
    ],
  },
  {
    id: "erreurs-debutant",
    title: "Premières erreurs, premiers réflexes",
    level: 2,
    intro: "Les trois messages que tout débutant rencontre.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic express",
        fields: [
          { label: "`tsc: command not found`", value: "TypeScript n'est pas installé dans ce dossier : relancez `npm install --save-dev typescript` ici, pas ailleurs." },
          { label: "`Cannot find module`", value: "Le fichier importé n'existe pas au chemin indiqué, ou l'extension est manquante (NodeNext exige `./utils.js` même pour un `.ts`)." },
          { label: "Rien ne se compile", value: "`tsc` sans `include` compile tous les `.ts` du dossier, y compris `node_modules` par défaut exclu. Vérifiez que `src/` contient bien vos fichiers." },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "versions-node-nvm",
    title: "Gérer les versions de Node avec nvm",
    level: 3,
    intro: "Plusieurs projets, plusieurs versions de Node : sans conflit.",
    blocks: [
      {
        kind: "command",
        label: "Lister et changer de version",
        command: "nvm ls && nvm use 20",
        why: "Affiche les versions installées puis bascule sur la 20 pour le shell courant. Chaque projet peut exiger une version différente (champ `engines` du package.json) : nvm isole les environnements au lieu d'imposer une version unique à toute la machine.",
        verify: "node -v",
      },
      {
        kind: "command",
        label: "Figer la version du projet",
        command: "nvm alias default lts/*",
        why: "Définit la version par défaut des nouveaux shells sur la LTS. Pour figer la version d'un projet précis, créez un fichier `.nvmrc` contenant `20` à la racine : `nvm use` le lira automatiquement.",
        verify: "cat .nvmrc 2>/dev/null || echo \"pas de .nvmrc\"",
      },
    ],
  },
  {
    id: "gestionnaires-paquets",
    title: "npm, yarn, pnpm : panorama",
    level: 3,
    intro: "npm suffit pour débuter ; connaître les alternatives aide à lire les projets existants.",
    blocks: [
      {
        kind: "table",
        headers: ["Gestionnaire", "Lockfile", "Particularité"],
        rows: [
          ["npm", "`package-lock.json`", "Livré avec Node, standard par défaut"],
          ["yarn", "`yarn.lock`", "Historiquement plus rapide, workspaces matures"],
          ["pnpm", "`pnpm-lock.yaml`", "Stockage par liens : `node_modules` légers, installations rapides"],
          ["bun", "`bun.lockb`", "Runtime + gestionnaire + bundler tout-en-un"],
        ],
      },
      {
        kind: "text",
        text: "Un projet = un gestionnaire = un lockfile : ne mélangez jamais npm et yarn sur le même projet, les lockfiles se contredisent. Pour cette page, tout est en npm — la compétence `outillage` détaille les autres.",
      },
    ],
  },
  {
    id: "package-json-anatomie",
    title: "Anatomie du package.json",
    level: 3,
    intro: "Lire et écrire le manifeste sans deviner.",
    blocks: [
      {
        kind: "fields",
        title: "Champs essentiels",
        fields: [
          { label: "`name` / `version`", value: "Identité du paquet. `name` doit être unique si vous publiez sur npm." },
          { label: "`type\": \"module\"`", value: "Active les modules ES natifs (`import`/`export`) dans Node. Sans lui, Node attend du CommonJS (`require`)." },
          { label: "`scripts`", value: "Commandes nommées du projet : `build`, `dev`, `test`, `typecheck`. Le vocabulaire partagé de l'équipe." },
          { label: "`engines`", value: "Versions exigées : `\"engines\": { \"node\": \">=20\" }` documente le prérequis runtime." },
        ],
      },
      {
        kind: "text",
        text: "Le `package.json` est le seul fichier indispensable : supprimez `node_modules/`, il se régénère avec `npm install`. L'inverse est faux — sans `package.json`, les dépendances sont perdues.",
      },
    ],
  },
  {
    id: "dependencies-vs-devdependencies",
    title: "dependencies vs devDependencies",
    level: 3,
    intro: "Séparer ce qui tourne en production de ce qui sert à développer.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Les deux installations",
        code: `# Outil de dev : compilation, tests, lint
npm install --save-dev typescript vitest

# Dépendance runtime : nécessaire à l'exécution
npm install express`,
      },
      {
        kind: "text",
        text: "TypeScript, les linters et les frameworks de test vont en `devDependencies` : inutiles une fois le code compilé. Les bibliothèques utilisées par le code exécuté (framework web, driver de base de données) vont en `dependencies`. Cette séparation permet des installations de production allégées (`npm ci --omit=dev`).",
      },
    ],
  },
  {
    id: "lockfiles",
    title: "Les lockfiles",
    level: 3,
    intro: "Garantir que `npm install` installe toujours la même chose.",
    blocks: [
      {
        kind: "text",
        text: "`package.json` déclare des plages de versions (`^5.4.0` = « 5.x compatible »). Le lockfile (`package-lock.json`) fige l'arbre exact installé, dépendances transitives incluses. Commitez toujours le lockfile : c'est lui qui rend les installations reproductibles entre développeurs et en CI.",
      },
      {
        kind: "command",
        label: "Installation reproductible",
        command: "npm ci",
        why: "Installe exactement les versions du lockfile, en supprimant d'abord `node_modules/`. Plus rapide et strict que `npm install` : c'est la commande des pipelines CI et des environnements propres, là où la reproductibilité prime sur la flexibilité.",
        verify: "ls node_modules | head -3",
      },
    ],
  },
  {
    id: "npx-fonctionnement",
    title: "Comment fonctionne npx",
    level: 3,
    intro: "Le chaînon entre `node_modules` et votre terminal.",
    blocks: [
      {
        kind: "text",
        text: "`npx tsc` cherche `tsc` dans `node_modules/.bin/` du projet courant (puis des dossiers parents), et l'exécute. S'il est introuvable localement, npx propose de le télécharger temporairement — refusez pour un outil de build : installez-le en dépendance du projet.",
      },
      {
        kind: "diagram",
        title: "Résolution d'un binaire par npx",
        lines: [
          "npx tsc",
          "  │",
          "  ├─ ./node_modules/.bin/tsc existe ? → l'exécute (prioritaire)",
          "  │",
          "  ├─ remonte aux dossiers parents (monorepo)",
          "  │",
          "  └─ sinon : propose un téléchargement temporaire",
        ],
      },
    ],
  },
  {
    id: "global-vs-local",
    title: "Global vs local : la règle",
    level: 3,
    intro: "Pourquoi l'installation locale gagne presque toujours.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Local (`--save-dev`)", "Global (`-g`)"],
        rows: [
          ["Version", "Par projet, figée dans package.json", "Unique pour toute la machine"],
          ["Reproductibilité", "Oui : `npm ci` restaure tout", "Non : dépend de la machine"],
          ["Conflits", "Aucun entre projets", "Fréquents (outil X veut v1, projet Y veut v2)"],
          ["Usage légitime", "Compilateurs, linters, testeurs", "CLI utilitaires (serveurs statiques, générateurs)"],
        ],
      },
      {
        kind: "text",
        text: "Règle : tout ce qui participe au build du projet est local. Le global est réservé aux outils personnels indépendants des projets. Un `tsc` global est presque toujours une erreur qui masquera un jour la vraie version du projet.",
      },
    ],
  },
  {
    id: "tsconfig-essentiel",
    title: "tsconfig : les options essentielles",
    level: 3,
    intro: "Les réglages qui comptent, sans le bruit des 100+ options.",
    blocks: [
      {
        kind: "fields",
        title: "Le socle recommandé",
        fields: [
          { label: "`strict: true`", value: "Active toute la rigueur du vérificateur. Non négociable sur un nouveau projet (voir compétence `strict`)." },
          { label: "`target: \"ES2022\"`", value: "Le JavaScript généré : syntaxe moderne si l'environnement l'exécute (Node 18+)." },
          { label: "`module` / `moduleResolution: \"NodeNext\"`", value: "Le format des modules, aligné sur le Node.js moderne (extensions `.js` dans les imports)." },
          { label: "`outDir` / `rootDir`", value: "Séparent sources (`src/`) et build (`dist/`) : un `dist/` propre, sans fichiers parasites." },
          { label: "`include: [\"src\"]`", value: "Restreint la compilation aux sources : `tsc` ignore le reste du dossier." },
        ],
      },
      {
        kind: "command",
        label: "Voir la configuration effective",
        command: "npx tsc --showConfig",
        why: "Affiche la configuration finale après résolution de l'héritage (`extends`) et des valeurs par défaut. Indispensable quand un comportement semble contredire le `tsconfig.json` lu à l'écran : la vérité est dans la sortie de cette commande.",
        verify: "npx tsc --showConfig | head -20",
      },
    ],
  },
  {
    id: "module-resolution",
    title: "Résolution des modules",
    level: 3,
    intro: "Comment `tsc` trouve les fichiers importés — et pourquoi l'extension `.js` est obligatoire.",
    blocks: [
      {
        kind: "text",
        text: "Avec `moduleResolution: \"NodeNext\"`, TypeScript imite Node.js : `import { x } from \"./utils.js\"` désigne le fichier `./utils.ts` à la compilation et `./utils.js` à l'exécution. Écrire `./utils` sans extension échoue : Node exige l'extension explicite en mode ESM.",
      },
      {
        kind: "list",
        items: [
          "Toujours importer avec l'extension `.js` (même si le fichier source est `.ts`).",
          "Les imports de paquets (`import express from \"express\"`) se résolvent via `node_modules/`.",
          "Les alias de chemins (`@/utils`) exigent `paths` dans le tsconfig — et un bundler qui les comprend.",
        ],
      },
    ],
  },
  {
    id: "sourcemap-declaration",
    title: "Source maps et déclarations",
    level: 3,
    intro: "Déboguer le `.ts` et typer les consommateurs.",
    blocks: [
      {
        kind: "fields",
        title: "Deux options à connaître",
        fields: [
          { label: "`sourceMap: true`", value: "Génère des `.js.map` reliant le JS exécuté au TS source : les piles d'erreur et le débogueur affichent le vrai code." },
          { label: "`declaration: true`", value: "Émet des `.d.ts` décrivant les types publics : indispensable si le projet est une bibliothèque consommée par d'autres." },
        ],
      },
      {
        kind: "text",
        text: "Activez `sourceMap` dès que vous déboguez (voir compétence `editeur`, section launch.json). Activez `declaration` quand vous publiez un paquet — inutile pour une application.",
      },
    ],
  },
  {
    id: "watch-mode",
    title: "Mode watch",
    level: 3,
    intro: "Recompiler à chaque sauvegarde, sans y penser.",
    blocks: [
      {
        kind: "command",
        label: "Compiler en continu",
        command: "npx tsc --watch",
        why: "Relance la compilation à chaque modification d'un fichier source et affiche les erreurs en continu dans le terminal. C'est la boucle de feedback la plus simple : éditer, sauvegarder, lire les erreurs — sans retaper de commande.",
        verify: "npx tsc --watch --version",
      },
      {
        kind: "text",
        text: "Combinez avec un script npm (`\"dev\": \"tsc --watch\"`) pour le lancer via `npm run dev`. Pour exécuter ET recompiler, les outils comme `tsx` (voir plus bas) vont plus loin.",
      },
    ],
  },
  {
    id: "noemit-typecheck",
    title: "`--noEmit` : vérifier sans produire",
    level: 3,
    intro: "Séparer la vérification des types de la production de fichiers.",
    blocks: [
      {
        kind: "text",
        text: "`tsc --noEmit` répond uniquement à « le code est-il correctement typé ? » sans écrire dans `dist/`. C'est le mode de la CI, des pre-commit hooks et des vérifications rapides. Dans le `tsconfig.json`, l'option équivalente est `\"noEmit\": true` — pratique pour les projets où un bundler (Vite, esbuild) s'occupe de l'émission.",
      },
      {
        kind: "list",
        items: [
          "CI : `tsc --noEmit` échoue si un type est faux, sans polluer l'environnement.",
          "Avec Vite/esbuild : le bundler transpile vite sans vérifier ; `tsc --noEmit` en parallèle apporte la vérification.",
        ],
      },
    ],
  },
  {
    id: "incremental-builds",
    title: "Builds incrémentaux",
    level: 3,
    intro: "Accélérer la compilation des gros projets.",
    blocks: [
      {
        kind: "fields",
        title: "Options de performance",
        fields: [
          { label: "`incremental: true`", value: "tsc mémorise l'état de la compilation (`.tsbuildinfo`) et ne revérifie que les fichiers modifiés et leurs dépendants." },
          { label: "`skipLibCheck: true`", value: "Ne revérifie pas les types des bibliothèques (`node_modules`) : gain de temps significatif, quasi aucun risque." },
        ],
      },
      {
        kind: "text",
        text: "Sur un petit projet, l'effet est invisible ; sur des milliers de fichiers, il est décisif. `skipLibCheck` est recommandé presque partout : les `.d.ts` des bibliothèques sont censées être correctes.",
      },
    ],
  },
  {
    id: "tsx-alternative",
    title: "Exécuter du TS directement : tsx",
    level: 3,
    intro: "Le chaînon manquant entre `tsc` et `node`.",
    blocks: [
      {
        kind: "command",
        label: "Installer tsx en dépendance de dev",
        command: "npm install --save-dev tsx",
        why: "tsx exécute les fichiers `.ts` directement, en transpilant à la volée avec esbuild : plus besoin du cycle `tsc` puis `node dist/`. Idéal en développement (`tsx watch src/index.ts` relance à chaque sauvegarde). Attention : il transpile sans vérifier les types — `tsc --noEmit` reste nécessaire pour la vérification.",
        verify: "npx tsx --version",
      },
      {
        kind: "text",
        text: "Usage typique : `\"dev\": \"tsx watch src/index.ts\"` pour développer, `\"build\": \"tsc\"` pour produire. Deux outils, deux rôles : vitesse d'un côté, rigueur de l'autre.",
      },
    ],
  },
  {
    id: "vscode-premier-pas",
    title: "VS Code : premier pas",
    level: 3,
    intro: "Ouvrir le projet dans l'éditeur et profiter du support natif.",
    blocks: [
      {
        kind: "command",
        label: "Ouvrir le projet dans VS Code",
        command: "code .",
        why: "Ouvre le dossier courant dans VS Code. L'éditeur détecte le `tsconfig.json`, démarre son serveur TypeScript intégré et offre immédiatement erreurs en ligne, autocomplétion et navigation. La compétence `editeur` détaille tout le réglage fin.",
        verify: "code --version",
      },
      {
        kind: "text",
        text: "Si `code` n'est pas reconnu dans le terminal, installez la commande via la palette (`Ctrl+Maj+P` → « Shell Command: Install 'code' command in PATH »).",
      },
    ],
  },
  {
    id: "launch-json-debug",
    title: "Déboguer : launch.json",
    level: 3,
    intro: "Poser des points d'arrêt directement dans le `.ts`.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: ".vscode/launch.json",
        code: `{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug TS",
      "runtimeExecutable": "npx",
      "runtimeArgs": ["tsx", "src/index.ts"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}`,
      },
      {
        kind: "text",
        text: "Avec `F5`, VS Code lance le programme via tsx et s'arrête sur vos points d'arrêt posés dans le TypeScript source. `skipFiles` évite de plonger dans les entrailles de Node. Les source maps (`sourceMap: true` + `tsc`) offrent la même expérience sur du code compilé.",
      },
    ],
  },
  {
    id: "eslint-prettier-setup",
    title: "ESLint + Prettier : setup minimal",
    level: 3,
    intro: "Qualité et formatage automatiques dès le premier jour.",
    blocks: [
      {
        kind: "command",
        label: "Installer ESLint et Prettier",
        command: "npm install --save-dev eslint prettier",
        why: "ESLint détecte les problèmes de code (variables inutilisées, erreurs logiques) et Prettier formate uniformément. Les deux en dépendances de dev : chaque membre de l'équipe obtient les mêmes règles via `npm install`, sans configuration machine.",
        verify: "npx eslint --version && npx prettier --version",
      },
      {
        kind: "command",
        label: "Formater tout le projet",
        command: "npx prettier --write .",
        why: "Applique le formatage Prettier à tous les fichiers du projet en une fois. À lancer une fois à l'installation pour normaliser la base existante, puis automatiquement à chaque sauvegarde via l'éditeur (voir compétence `editeur`).",
        verify: "npx prettier --check .",
      },
    ],
  },
  {
    id: "ci-github-actions",
    title: "Intégration continue minimale",
    level: 3,
    intro: "Vérifier automatiquement à chaque push.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/ci.yml",
        code: `name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm test`,
      },
      {
        kind: "text",
        text: "Trois étapes, zéro excuse : installation reproductible (`npm ci`), vérification des types (`typecheck`), tests. Chaque push est validé dans un environnement propre — les erreurs d'environnement « ça marche sur ma machine » disparaissent.",
      },
    ],
  },
  {
    id: "dockeriser",
    title: "Dockeriser le build",
    level: 3,
    intro: "Un environnement identique partout, jusqu'en production.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Dockerfile multi-étapes",
        code: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
CMD ["node", "dist/index.js"]`,
      },
      {
        kind: "text",
        text: "Deux étapes : on compile avec toutes les dépendances, puis on ne garde que le runtime (`--omit=dev`) et le `dist/`. L'image finale est légère et ne contient ni TypeScript ni sources — seulement le JavaScript exécutable.",
      },
    ],
  },
  {
    id: "mise-a-jour-ts",
    title: "Mettre à jour TypeScript",
    level: 3,
    intro: "Suivre les versions sans casser le projet.",
    blocks: [
      {
        kind: "command",
        label: "Mettre à jour vers la dernière version",
        command: "npm install --save-dev typescript@latest",
        why: "Installe la dernière version stable et met à jour `package.json` + lockfile. Chaque version majeure de TypeScript apporte des types plus précis et parfois des erreurs nouvelles sur du code existant : lisez les release notes, mettez à jour, puis lancez `npm run typecheck` pour mesurer l'impact.",
        verify: "npx tsc --version",
      },
      {
        kind: "text",
        text: "Mettez à jour régulièrement (chaque version mineure) plutôt que par bonds de deux ans : les migrations sont alors triviales. Figez la version exacte dans le lockfile commité.",
      },
    ],
  },
  {
    id: "erreurs-tsc-introuvable",
    title: "Erreur : tsc introuvable",
    level: 3,
    intro: "Le classique `command not found`, décortiqué.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cause 1 : TypeScript n'est pas installé dans ce projet — `npm install --save-dev typescript`.",
          "Cause 2 : vous êtes dans le mauvais dossier — `npx` ne remonte qu'aux parents, pas aux voisins.",
          "Cause 3 : `node_modules/` corrompu — supprimez-le ainsi que le lockfile, puis `npm install`.",
          "Ne contournez jamais avec une installation globale : elle masque le vrai problème.",
        ],
      },
    ],
  },
  {
    id: "erreurs-cannot-find-module",
    title: "Erreur : Cannot find module",
    level: 3,
    intro: "L'erreur de résolution la plus fréquente.",
    blocks: [
      {
        kind: "fields",
        title: "Causes et remèdes",
        fields: [
          { label: "Extension manquante", value: "En ESM/NodeNext, `import \"./utils\"` échoue : écrivez `import \"./utils.js\"`." },
          { label: "Faute de frappe / casse", value: "`./Utils.js` ≠ `./utils.js` sur Linux et macOS : respectez la casse exacte." },
          { label: "Paquet non installé", value: "`import express` sans `npm install express` : installez la dépendance manquante." },
          { label: "Types manquants", value: "Certains paquets JS n'embarquent pas leurs types : `npm install --save-dev @types/nom-du-paquet`." },
        ],
      },
    ],
  },
  {
    id: "erreurs-version-node",
    title: "Erreur : version de Node incompatible",
    level: 3,
    intro: "Quand le runtime est trop vieux pour le code.",
    blocks: [
      {
        kind: "list",
        items: [
          "Symptôme : `SyntaxError: Unexpected token` sur du code pourtant valide — souvent un Node trop ancien face à une syntaxe récente.",
          "Vérifiez `node -v` et comparez au champ `engines` du projet.",
          "Basculez avec `nvm use` (et figez via `.nvmrc`).",
          "Côté `tsc`, un `target` trop récent pour le Node de production produit le même effet à l'exécution.",
        ],
      },
    ],
  },
  {
    id: "nettoyage-cache-npm",
    title: "Nettoyage : cache et réinstallation",
    level: 3,
    intro: "La procédure de dernier recours, dans l'ordre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Supprimer node_modules", detail: "`rm -rf node_modules` : élimine toute installation partielle ou corrompue." },
          { title: "Réinstaller proprement", detail: "`npm install` (ou `npm ci` si le lockfile est sain) reconstruit l'arbre exact." },
          { title: "Vider le cache si besoin", detail: "`npm cache clean --force` : uniquement si npm lui-même se comporte bizarrement (téléchargements corrompus)." },
          { title: "Vérifier", detail: "`npx tsc --version` puis `npm run typecheck` : l'environnement doit être revenu à un état sain." },
        ],
      },
    ],
  },
  {
    id: "projets-installation",
    title: "Projets : environnement pro",
    level: 3,
    intro: "Valider l'environnement par la pratique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Squelette réutilisable", detail: "Un dossier modèle avec `package.json`, `tsconfig.json` strict, scripts `build`/`typecheck`/`dev`, `.gitignore` (`node_modules`, `dist`) et README d'installation." },
          { title: "Script de vérification", detail: "Un script `npm run doctor` qui contrôle `node -v`, la présence du tsconfig et l'état de `node_modules` — le diagnostic en une commande." },
          { title: "CI verte", detail: "Pousser le squelette sur GitHub avec le workflow CI : le badge vert prouve l'environnement reproductible." },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-installation",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les réflexes d'un environnement sain.",
    blocks: [
      {
        kind: "list",
        items: [
          "Node LTS, jamais la version « current » en production.",
          "TypeScript en dépendance locale, jamais global.",
          "Lockfile commité, `npm ci` en CI.",
          "`strict: true` dès le premier `tsc --init`.",
          "`src/` et `dist/` séparés via `rootDir`/`outDir`.",
          "Scripts npm nommés : `build`, `typecheck`, `dev`, `test`.",
          "`node_modules/` et `dist/` dans `.gitignore`, toujours.",
          "Mettre à jour TypeScript par petites versions, régulièrement.",
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
          { label: "Téléchargement TS", value: "typescriptlang.org/download : le guide d'installation officiel, npm et éditeurs." },
          { label: "Référence tsconfig", value: "typescriptlang.org/tsconfig : chaque option documentée avec exemples." },
          { label: "Docs npm", value: "docs.npmjs.com : commandes, package.json, scripts et lockfiles à la source." },
          { label: "Docs Node.js", value: "nodejs.org/docs : API, modules natifs et guides du runtime." },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'environnement est prêt : place au langage et aux outils.",
    blocks: [
      {
        kind: "list",
        items: [
          "Passer à la compétence `tsc` : comprendre la compilation en profondeur.",
          "Puis `tsconfig` : maîtriser chaque option de configuration.",
          "Ensuite `editeur` : régler VS Code pour exploiter le serveur de langage.",
          "Enfin `types-base` : écrire les premières annotations dans ce projet fonctionnel.",
        ],
      },
    ],
  },
];

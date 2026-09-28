import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de « TSC — le compilateur » : vérifier, transpiler,
 * diagnostiquer — comprendre l'outil qui est derrière chaque erreur.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_TSC: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "TSC (TypeScript Compiler) est le compilateur officiel : il vérifie les types puis émet du JavaScript.",
    blocks: [
      {
        kind: "text",
        text: "`tsc` lit vos fichiers `.ts`, contrôle que chaque valeur respecte son type déclaré ou inféré, puis produit du JavaScript exécutable. Chaque erreur soulignée dans votre éditeur vient de lui : l'éditeur n'est qu'une vitrine, `tsc` est le moteur.",
      },
      {
        kind: "text",
        text: "On l'appelle via `npx tsc` (la version locale du projet, jamais une installation globale approximative). Tout son comportement se pilote depuis `tsconfig.json` — et depuis ses flags en ligne de commande, qui écrasent la configuration le temps d'un appel.",
      },
    ],
  },
  {
    id: "deux-metiers",
    title: "Deux métiers : vérifier et transpiler",
    level: 1,
    intro:
      "La distinction fondamentale : `tsc` fait deux choses différentes, qu'il faut comprendre séparément.",
    blocks: [
      {
        kind: "diagram",
        title: "Vérification vs transpilation",
        lines: [
          "VÉRIFIER (checker)",
          "  Question : les types sont-ils cohérents ?",
          "  Sortie : des erreurs (ou rien)",
          "  Commande : tsc --noEmit",
          "",
          "TRANSPIILER (émetteur)",
          "  Question : quel JavaScript produire ?",
          "  Sortie : des fichiers .js (+ .d.ts, .js.map)",
          "  Commande : tsc",
        ],
      },
      {
        kind: "text",
        text: "La vérification peut exister sans transpilation (`--noEmit` : c'est le mode « typecheck » utilisé en CI et par les bundlers modernes). La transpilation, elle, efface les types et convertit la syntaxe vers la cible choisie (`target`). Comprendre cette séparation explique pourquoi Vite peut « compiler » du TypeScript sans vérifier les types : il ne fait que la seconde moitié du travail.",
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
      "Ce qu'il faut avant d'utiliser le compilateur.",
    blocks: [
      {
        kind: "fields",
        title: "Avant tsc",
        fields: [
          {
            label: "Projet npm initialisé",
            value:
              "Un `package.json` : `tsc` s'installe et s'exécute dans le contexte d'un projet.",
          },
          {
            label: "Bases de TypeScript",
            value:
              "Types de base, annotations : pour comprendre ce que le compilateur vérifie.",
          },
          {
            label: "Terminal",
            value:
              "`tsc` est un outil en ligne de commande : savoir exécuter des commandes et lire leur sortie.",
          },
        ],
      },
    ],
  },
  {
    id: "installer",
    title: "Installer le compilateur",
    level: 2,
    intro:
      "Le compilateur est livré avec le paquet `typescript` : rien d'autre à installer.",
    blocks: [
      {
        kind: "command",
        label: "Installer TypeScript localement",
        command: "npm install -D typescript",
        why: "Le paquet `typescript` contient le compilateur `tsc`. En dépendance de développement et en local : la version est verrouillée dans `package.json`, chaque projet et chaque développeur utilisent exactement la même.",
        verify: "npx tsc --version",
      },
      {
        kind: "text",
        text: "`npx tsc` exécute la version locale du projet. Si TypeScript n'est pas installé, `npx` le télécharge temporairement — pratique pour un essai, pas pour un projet suivi. L'installation globale (`npm install -g typescript`) reste un usage ponctuel, jamais la base d'un projet d'équipe.",
      },
    ],
  },
  {
    id: "premier-compile",
    title: "Première compilation",
    level: 2,
    intro:
      "Du `.ts` au `.js` : la boucle complète, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire un fichier TypeScript",
            detail:
              "Créer `src/index.ts` avec `const message: string = \"Bonjour\";` suivi de `console.log(message);`.",
          },
          {
            title: "Compiler",
            detail:
              "Lancer `npx tsc` (avec un `tsconfig.json` minimal). Le compilateur vérifie les types puis émet le JavaScript.",
          },
          {
            title: "Observer la sortie",
            detail:
              "Le `.js` généré contient le même code, sans les annotations `: string` : les types ont été effacés.",
          },
          {
            title: "Exécuter",
            detail:
              "Lancer le `.js` avec `node` : c'est du JavaScript ordinaire qui s'exécute. Le `.ts` ne s'exécute jamais directement.",
          },
          {
            title: "Introduire une erreur",
            detail:
              "Écrire `const message: string = 42;` et recompiler : `tsc` affiche l'erreur et, par défaut, n'émet rien d'exploitable proprement.",
          },
        ],
      },
    ],
  },
  {
    id: "cli-essentielle",
    title: "La CLI essentielle",
    level: 2,
    intro:
      "Les commandes `tsc` du quotidien, avec pour chacune son rôle.",
    blocks: [
      {
        kind: "fields",
        title: "Commandes principales",
        fields: [
          {
            label: "Command — `tsc`",
            value: "Purpose : compile le projet selon `tsconfig.json`. Example : `npx tsc`. When : pour produire le JavaScript final ou vérifier tout le projet.",
          },
          {
            label: "Command — `tsc --init`",
            value: "Purpose : génère un `tsconfig.json` commenté. Example : `npx tsc --init`. When : une seule fois, à la création du projet.",
          },
          {
            label: "Command — `tsc --watch`",
            value: "Purpose : recompile automatiquement à chaque modification. Example : `npx tsc --watch`. When : pendant le développement, dans un terminal dédié.",
          },
          {
            label: "Command — `tsc --noEmit`",
            value: "Purpose : vérifie les types sans produire de fichiers. Example : `npx tsc --noEmit`. When : en CI ou comme script `typecheck`, quand un autre outil produit le JavaScript.",
          },
          {
            label: "Command — `tsc --project`",
            value: "Purpose : compile avec un `tsconfig` précis. Example : `npx tsc --project tsconfig.build.json`. When : projets avec plusieurs configurations.",
          },
          {
            label: "Command — `tsc --showConfig`",
            value: "Purpose : affiche la configuration résolue (avec les `extends` appliqués). Example : `npx tsc --showConfig`. When : pour déboguer une configuration héritée ou comprendre les valeurs effectives.",
          },
          {
            label: "Command — `tsc --version`",
            value: "Purpose : affiche la version utilisée. Example : `npx tsc --version`. When : pour vérifier que c'est bien la version locale du projet.",
          },
        ],
      },
    ],
  },
  {
    id: "watch",
    title: "Le mode watch",
    level: 2,
    intro:
      "Recompiler à chaque sauvegarde : la boucle de feedback rapide.",
    blocks: [
      {
        kind: "command",
        label: "Compiler en continu",
        command: "npx tsc --watch",
        why: "Relance la vérification et l'émission à chaque fichier modifié, sans quitter le terminal. C'est la boucle de feedback rapide pendant le développement : on voit les erreurs apparaître en direct, sans relancer la commande.",
        verify: "npx tsc --watch --preserveWatchOutput",
      },
      {
        kind: "text",
        text: "Le mode watch garde le programme en mémoire entre les compilations : seules les parties affectées sont revérifiées, ce qui le rend bien plus rapide que des appels répétés à `tsc`. En pratique, on le lance dans un terminal dédié pendant qu'on code dans l'éditeur.",
      },
    ],
  },
  {
    id: "noemit",
    title: "Vérifier sans émettre",
    level: 2,
    intro:
      "`--noEmit` : le mode « typecheck » pur, la commande la plus utilisée en équipe.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier les types sans produire de fichiers",
        command: "npx tsc --noEmit",
        why: "Exécute uniquement la vérification des types, sans écrire aucun `.js`. C'est le mode quand un autre outil (Vite, esbuild, bundler) produit le JavaScript : `tsc` ne sert alors qu'à prouver la cohérence des types. Rapide, propre, sans artefacts.",
        verify: "npx tsc --noEmit 2>&1 | wc -l",
      },
      {
        kind: "text",
        text: "En pratique : `'typecheck': 'tsc --noEmit'` dans les scripts npm, exécuté en CI à chaque pull request. Aucun code mal typé ne fusionne — sans que `tsc` ait à produire quoi que ce soit.",
      },
    ],
  },
  {
    id: "scripts-npm",
    title: "Scripts npm",
    level: 2,
    intro:
      "Exposer le compilateur à l'équipe : les scripts standard.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json — scripts",
        code: "{\n  \"scripts\": {\n    \"build\": \"tsc\",\n    \"typecheck\": \"tsc --noEmit\",\n    \"watch\": \"tsc --watch\"\n  }\n}",
      },
      {
        kind: "text",
        text: "`npm run build` produit le JavaScript, `npm run typecheck` vérifie sans produire, `npm run watch` développe en continu. Trois scripts, trois usages — toute l'équipe parle le même langage.",
      },
    ],
  },
  {
    id: "lire-erreurs",
    title: "Lire les erreurs de tsc",
    level: 2,
    intro:
      "Anatomie d'un message d'erreur : chaque partie a un sens.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Un message d'erreur décortiqué",
        code: "src/index.ts(3,7): error TS2322: Type 'number' is not assignable\nto type 'string'.\n# ├── fichier et position (ligne 3, colonne 7)\n# ├── code d'erreur (TS2322 : recherchable)\n# └── explication en langage clair",
      },
      {
        kind: "list",
        items: [
          "Le code (`TS2322`) est la clé de recherche : il mène à la documentation et aux discussions pour ce cas précis.",
          "La position (ligne, colonne) localise ; le message explique l'incompatibilité détectée.",
          "L'erreur décrit un fait sur les types, jamais un jugement : la lire littéralement, sans l'interpréter.",
          "Souvent, l'erreur est signalée à l'endroit où le type est violé, pas où il est défini : remonter à la source du type.",
        ],
      },
    ],
  },
  {
    id: "workflow-dev",
    title: "tsc dans le workflow dev",
    level: 2,
    intro:
      "Où le compilateur intervient dans la journée d'un développeur.",
    blocks: [
      {
        kind: "diagram",
        title: "tsc aux trois échelles",
        lines: [
          "Éditeur (temps réel)",
          "  → le serveur de langage (même moteur que tsc) signale en direct",
          "     ↓",
          "Terminal (manuel)",
          "  → npx tsc --watch ou --noEmit pour vérifier à la demande",
          "     ↓",
          "CI (automatique)",
          "  → npm run typecheck à chaque pull request : le verdict officiel",
        ],
      },
      {
        kind: "text",
        text: "Trois vitesses, un seul moteur : l'éditeur donne le feedback immédiat, le terminal le feedback à la demande, la CI le feedback officiel. Si l'éditeur et la CI se contredisent, c'est presque toujours un problème de version (l'éditeur n'utilise pas le TypeScript du projet).",
      },
    ],
  },
  {
    id: "editeur-integration",
    title: "L'éditeur et tsc",
    level: 2,
    intro:
      "VS Code embarque le même moteur : l'aligner sur le projet.",
    blocks: [
      {
        kind: "list",
        items: [
          "VS Code intègre un serveur de langage TypeScript : c'est le même moteur de vérification que `tsc`, en temps réel.",
          "« Use Workspace Version » : forcer VS Code à utiliser le TypeScript de `node_modules` plutôt que sa version intégrée — sinon l'éditeur et la CI peuvent diverger.",
          "Le `tsconfig.json` du projet est lu automatiquement : les erreurs affichées sont celles de votre configuration.",
          "Si une erreur apparaît dans le terminal mais pas dans l'éditeur (ou l'inverse), suspecter en premier la version utilisée.",
        ],
      },
    ],
  },
  {
    id: "projets-tsc",
    title: "Projets compilateur",
    level: 2,
    intro:
      "Trois chantiers pour apprivoiser `tsc` en profondeur.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Explorateur de cibles",
        fields: [
          { label: "Skills required", value: "`--target`, lecture du JS émis" },
          { label: "What you build", value: "La compilation d'un même fichier vers ES5, ES2015 et ES2022, avec comparaison des sorties" },
          { label: "What you learn", value: "Ce que `target` change concrètement : helpers générés, syntaxe transformée" },
          { label: "Expected difficulty", value: "Faible — quelques heures" },
          { label: "Next project", value: "Catalogue d'erreurs" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Catalogue d'erreurs",
        fields: [
          { label: "Skills required", value: "Lecture des messages, codes TS" },
          { label: "What you build", value: "Un catalogue personnel des 20 erreurs les plus fréquentes, avec cause et correction" },
          { label: "What you learn", value: "Diagnostiquer vite : du code d'erreur à la correction sans détour" },
          { label: "Expected difficulty", value: "Moyenne — quelques jours" },
          { label: "Next project", value: "Monorepo en mode build" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Monorepo en mode build",
        fields: [
          { label: "Skills required", value: "`tsc -b`, `references`, `composite`" },
          { label: "What you build", value: "Un monorepo de deux paquets compilé avec `tsc -b`, incrémental" },
          { label: "What you learn", value: "La compilation multi-projets : ordre, cache, fichiers `.tsbuildinfo`" },
          { label: "Expected difficulty", value: "Élevée — une semaine" },
          { label: "Next project", value: "Optimiser le temps de compilation d'un gros projet" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "pipeline-interne",
    title: "Le pipeline interne de tsc",
    level: 3,
    intro: "Ce qui se passe entre le `.ts` et le `.js` : les quatre phases.",
    blocks: [
      {
        kind: "diagram",
        title: "Les phases du compilateur",
        lines: [
          "1. PARSE — le code source devient un arbre syntaxique (AST)",
          "2. BIND — les symboles sont liés (quelle déclaration pour quel nom ?)",
          "3. CHECK — les types sont vérifiés (les erreurs naissent ici)",
          "4. EMIT — le JavaScript est produit (les types sont effacés)",
        ],
      },
      {
        kind: "text",
        text: "Comprendre ces phases explique beaucoup : une erreur de syntaxe vient du parse, une erreur « cannot find name » du bind, une erreur de type du check. Et l'emit ne fait qu'effacer les types et transformer la syntaxe — il ne « comprend » rien aux types, d'où la séparation vérification/transpilation.",
      },
    ],
  },
  {
    id: "target-detail",
    title: "target en détail",
    level: 3,
    intro: "Choisir la version de JavaScript émise : le levier le plus visible.",
    blocks: [
      {
        kind: "text",
        text: "`target` définit la version d'ECMAScript du JavaScript produit (`ES5`, `ES2015`, …, `ES2022`, `ESNext`). Plus la cible est basse, plus `tsc` transforme le code (classes → fonctions, async/await → machines à états avec helpers) ; plus elle est haute, plus la sortie ressemble à la source.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Comparer deux cibles",
        code: "npx tsc index.ts --target ES5 --outDir dist-es5\nnpx tsc index.ts --target ES2022 --outDir dist-es2022\n# Comparer dist-es5/index.js et dist-es2022/index.js :\n# le premier est méconnaissable, le second quasi identique à la source.",
      },
      {
        kind: "text",
        text: "Règle : cibler la version la plus basse supportée par vos environnements d'exécution réels — ni plus bas (code gonflé inutilement), ni plus haut (syntaxe que le runtime ne comprend pas). `ES2022` est un bon défaut moderne pour Node.js récent.",
      },
    ],
  },
  {
    id: "lib-detail",
    title: "lib en détail",
    level: 3,
    intro: "Déclarer quelles API existent : le pendant de `target` côté déclarations.",
    blocks: [
      {
        kind: "text",
        text: "`lib` liste les bibliothèques de déclarations disponibles : `ES2022` (les API du langage), `DOM` (les API du navigateur), `WebWorker`, etc. `target` choisit la syntaxe émise ; `lib` choisit les API connues. Les deux sont liés mais distincts : on peut cibler `ES2022` en syntaxe tout en déclarant les API `DOM`.",
      },
      {
        kind: "list",
        items: [
          "Sans `DOM`, `document` et `window` sont des erreurs de type : normal pour du code Node.js.",
          "Avec `DOM` dans un projet Node.js, utiliser `window` compile mais échoue à l'exécution : la déclaration ne crée pas l'API.",
          "Par défaut, `lib` est déduit de `target` : on ne le règle explicitement que pour les cas particuliers.",
        ],
      },
    ],
  },
  {
    id: "module-emission",
    title: "L'émission des modules",
    level: 3,
    intro: "Comment `module` transforme les `import`/`export` : voir la sortie.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Source (math.ts)",
        code: "export function add(a: number, b: number): number {\n  return a + b;\n}",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Émis avec module: CommonJS",
        code: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction add(a, b) {\n    return a + b;\n}\nexports.add = add;",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Émis avec module: NodeNext + type module (ESM)",
        code: "export function add(a, b) {\n    return a + b;\n}",
      },
      {
        kind: "text",
        text: "Le même source produit deux sorties radicalement différentes selon `module`. C'est pourquoi cette option doit correspondre à l'environnement d'exécution : du CommonJS émis pour un runtime ESM (ou l'inverse) échoue au chargement.",
      },
    ],
  },
  {
    id: "declaration-detail",
    title: "Générer les .d.ts",
    level: 3,
    intro: "`declaration: true` : exposer les types sans le code.",
    blocks: [
      {
        kind: "text",
        text: "Avec `declaration: true`, `tsc` génère à côté de chaque `.js` un fichier `.d.ts` qui décrit les types publics du module — signatures, interfaces, sans implémentation. C'est indispensable pour publier une bibliothèque : les consommateurs obtiennent les types sans vos sources.",
      },
      {
        kind: "list",
        items: [
          "`declarationMap: true` ajoute des source maps pour les déclarations : « aller à la définition » mène au `.ts` d'origine.",
          "`emitDeclarationOnly: true` ne génère que les `.d.ts` (utile avec `allowJs` pour typer du JS existant).",
          "Pour une application non publiée, `declaration` est inutile : il ralentit la compilation pour rien.",
        ],
      },
    ],
  },
  {
    id: "sourcemaps-detail",
    title: "Les source maps",
    level: 3,
    intro: "Relier le JavaScript exécuté au TypeScript écrit : le débogage lisible.",
    blocks: [
      {
        kind: "text",
        text: "`\"sourceMap\": true` génère pour chaque `.js` un fichier `.js.map` qui mappe chaque position du code émis vers le `.ts` d'origine. Le débogueur (VS Code, navigateur) affiche alors votre TypeScript : points d'arrêt, pas à pas, inspection des variables — tout se fait dans la source, pas dans le code généré.",
      },
      {
        kind: "list",
        items: [
          "En développement : toujours activées — déboguer du JS généré est une perte de temps.",
          "En production : à décider consciemment — les source maps déployées exposent le code source.",
          "`inlineSourceMap` embarque la carte dans le `.js` lui-même : pratique pour des outils, plus lourd.",
        ],
      },
    ],
  },
  {
    id: "incremental",
    title: "La compilation incrémentale",
    level: 3,
    intro: "Ne recompiler que ce qui a changé : `.tsbuildinfo` et `incremental`.",
    blocks: [
      {
        kind: "text",
        text: "Avec `\"incremental\": true`, `tsc` écrit un fichier `.tsbuildinfo` qui mémorise l'état de la dernière compilation : au run suivant, seuls les fichiers affectés sont revérifiés. Sur un gros projet, c'est la différence entre quelques secondes et une minute.",
      },
      {
        kind: "list",
        items: [
          "Le `.tsbuildinfo` est un artefact de build : il va dans le `.gitignore`, pas dans le dépôt.",
          "`tsc --watch` utilise ce mécanisme en mémoire : c'est pourquoi le watch est si rapide après le premier passage.",
          "Le mode build (`tsc -b`) l'active implicitement via `composite`.",
        ],
      },
    ],
  },
  {
    id: "build-mode",
    title: "Le mode build (tsc -b)",
    level: 3,
    intro: "Compiler des projets multi-paquets dans le bon ordre : `-b`.",
    blocks: [
      {
        kind: "command",
        label: "Compiler en mode build",
        command: "npx tsc -b",
        why: "Le mode build lit les `references` entre projets, compile les dépendances d'abord, et ne recompile que ce qui a changé (via les `.tsbuildinfo`). C'est le mode pour les monorepos et les projets découpés : `tsc` simple ne connaît pas l'ordre des projets.",
        verify: "npx tsc -b --verbose",
      },
      {
        kind: "text",
        text: "Chaque projet référencé doit avoir `composite: true` (qui active `declaration` et le suivi incrémental). `--verbose` montre l'ordre de compilation et ce qui a été ignoré car à jour — utile pour comprendre le mécanisme.",
      },
    ],
  },
  {
    id: "references-composite",
    title: "references et composite",
    level: 3,
    intro: "Déclarer les dépendances entre projets : le `tsconfig.json` d'un paquet.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "tsconfig.json d'un paquet dépendant",
        code: "{\n  \"compilerOptions\": {\n    \"composite\": true,\n    \"outDir\": \"dist\",\n    \"rootDir\": \"src\"\n  },\n  \"references\": [{ \"path\": \"../core\" }]\n}",
      },
      {
        kind: "text",
        text: "`references` liste les projets dont celui-ci dépend ; `composite: true` marque le projet comme « référençable » (déclarations générées, pas de fichiers hors `rootDir`). Le paquet consommateur importe les types du paquet `core` via ses `.d.ts` générés — la dépendance est explicite et vérifiée par le compilateur.",
      },
    ],
  },
  {
    id: "monorepo-tsc",
    title: "tsc en monorepo",
    level: 3,
    intro: "Plusieurs paquets, une compilation cohérente : les règles du jeu.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un `tsconfig.json` par paquet, avec `composite: true` pour ceux qui sont référencés.",
          "`tsc -b` à la racine compile tout dans l'ordre des dépendances, incrémentalement.",
          "Chaque paquet expose ses types via ses `.d.ts` : les imports inter-paquets sont typés comme des imports de bibliothèques.",
          "La CI lance `tsc -b` : une erreur est localisée au paquet fautif, pas noyée dans un programme géant.",
        ],
      },
    ],
  },
  {
    id: "diagnostics",
    title: "Diagnostiquer avec tsc",
    level: 3,
    intro: "Quand la compilation se comporte bizarrement : les flags de diagnostic.",
    blocks: [
      {
        kind: "fields",
        title: "Flags de diagnostic",
        fields: [
          {
            label: "`--showConfig`",
            value:
              "Affiche la configuration effective après résolution des `extends` : pour vérifier quelles options sont vraiment actives.",
          },
          {
            label: "`--listFiles`",
            value:
              "Liste tous les fichiers inclus dans le programme : pour comprendre pourquoi un fichier est (ou n'est pas) compilé.",
          },
          {
            label: "`--traceResolution`",
            value:
              "Trace pas à pas la résolution de chaque import : l'outil définitif contre les `TS2307` mystérieux.",
          },
          {
            label: "`--pretty`",
            value:
              "Colore et formate les erreurs dans le terminal : plus lisible, surtout avec des types complexes.",
          },
          {
            label: "`--explainFiles`",
            value:
              "Explique pourquoi chaque fichier a été inclus : utile quand un fichier parasite entre dans la compilation.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-ts-catalogue",
    title: "Catalogue des erreurs courantes",
    level: 3,
    intro: "Les codes qu'on rencontre en boucle, et ce qu'ils signifient vraiment.",
    blocks: [
      {
        kind: "table",
        headers: ["Code", "Message", "Signification"],
        rows: [
          ["TS2304", "Cannot find name 'x'", "Nom inconnu : faute de frappe, import manquant, ou variable hors de portée."],
          ["TS2322", "Type 'X' is not assignable to type 'Y'", "Incompatibilité de types : la valeur ne correspond pas au type attendu."],
          ["TS2339", "Property 'x' does not exist on type 'Y'", "Propriété inexistante sur ce type : faute de frappe ou mauvaise hypothèse sur la forme."],
          ["TS2345", "Argument of type 'X' is not assignable to parameter of type 'Y'", "Argument du mauvais type à l'appel : vérifier la signature de la fonction."],
          ["TS2307", "Cannot find module 'x'", "Module introuvable : chemin, extension, `@types` ou déclaration manquante."],
          ["TS7006", "Parameter implicitly has an 'any' type", "Paramètre non annoté sous `noImplicitAny` : écrire le type."],
          ["TS6133", "'x' is declared but its value is never read", "Variable inutilisée sous `noUnusedLocals` : supprimer."],
          ["TS18048", "'x' is possibly 'undefined'", "Valeur potentiellement absente sous `strictNullChecks` : garder avant usage."],
        ],
      },
    ],
  },
  {
    id: "tsc-vs-transpileurs",
    title: "tsc vs les transpileurs",
    level: 3,
    intro: "Pourquoi esbuild et SWC sont 100× plus rapides : ils ne font que la moitié du travail.",
    blocks: [
      {
        kind: "table",
        headers: ["", "tsc", "esbuild / SWC"],
        rows: [
          ["Vérifie les types", "Oui", "Non"],
          ["Émet du JavaScript", "Oui", "Oui"],
          ["Vitesse", "Lente (analyse complète)", "Très rapide (efface les types)"],
          ["Usage typique", "Vérification (`--noEmit`), builds finaux", "Dev (Vite), transpilation"],
        ],
      },
      {
        kind: "text",
        text: "Le pattern moderne : esbuild/SWC transpile (Vite en dev), `tsc --noEmit` vérifie (CI, éditeur). Les deux moitiés du travail de `tsc`, réparties sur deux outils spécialisés — rapide ET sûr. Oublier la moitié vérification, c'est du JavaScript déguisé.",
      },
    ],
  },
  {
    id: "limites-tsc",
    title: "Les limites de tsc",
    level: 3,
    intro: "Ce que le compilateur ne fait pas — et ne fera jamais.",
    blocks: [
      {
        kind: "list",
        items: [
          "Pas de bundling : `tsc` émet un `.js` par `.ts`, il n'assemble pas — c'est le travail des bundlers.",
          "Pas de vérification à l'exécution : les types sont effacés, aucune protection une fois compilé.",
          "Pas d'optimisation du code : pas de minification, pas de tree-shaking — l'émission est fidèle, pas optimale.",
          "Pas de typage des données externes : une réponse API reste `any`/`unknown` tant qu'on ne la valide pas.",
          "Le comprendre évite les attentes déçues : `tsc` est un vérificateur et un transpileur, rien de plus — et c'est déjà beaucoup.",
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance de compilation",
    level: 3,
    intro: "Quand `tsc` devient lent : les leviers, par ordre d'impact.",
    blocks: [
      {
        kind: "fields",
        title: "Accélérer tsc",
        fields: [
          {
            label: "`skipLibCheck: true`",
            value:
              "Ne pas revérifier les `.d.ts` des dépendances : le gain le plus important sur les gros projets, sans perte pour votre code.",
          },
          {
            label: "Restreindre `include`",
            value:
              "Ne compiler que `src` : chaque dossier scanné inutilement (`dist`, `coverage`) coûte du temps.",
          },
          {
            label: "`incremental: true`",
            value:
              "Mémoriser l'état entre les runs : seuls les fichiers affectés sont revérifiés.",
          },
          {
            label: "`tsc -b` en monorepo",
            value:
              "Ne recompiler que les paquets modifiés et leurs dépendants, pas tout le repo.",
          },
          {
            label: "Types ciblés",
            value:
              "`types: []` + imports explicites plutôt que l'inclusion automatique de tous les `@types` : moins de déclarations à analyser.",
          },
        ],
      },
    ],
  },
  {
    id: "api-compilateur",
    title: "L'API du compilateur",
    level: 3,
    intro: "Le paquet `typescript` expose aussi une API : pour les outils, pas pour le quotidien.",
    blocks: [
      {
        kind: "text",
        text: "Le paquet `typescript` n'est pas qu'une CLI : il expose une API programmatique (`ts.createProgram`, `ts.transpileModule`…) utilisée par les éditeurs, les linters et les outils de build. C'est ainsi que VS Code, ESLint et Vite réutilisent le moteur de `tsc` sans le relancer en processus.",
      },
      {
        kind: "list",
        items: [
          "Usage direct réservé aux auteurs d'outils : écrire un linter, un plugin, un analyseur.",
          "Pour le développeur applicatif, la CLI et le `tsconfig.json` suffisent — l'API est un détail d'implémentation des outils.",
          "Comprendre son existence explique l'écosystème : un seul moteur de types, réutilisé partout.",
        ],
      },
    ],
  },
  {
    id: "watch-avance",
    title: "Le watch en profondeur",
    level: 3,
    intro: "Comment le mode watch reste rapide : stratégies de surveillance.",
    blocks: [
      {
        kind: "text",
        text: "Le mode `--watch` garde le programme en mémoire et ne revérifie que les fichiers affectés par un changement — d'où sa rapidité après le premier passage. Si le watch semble rater des changements (rare), c'est généralement un problème de surveillance du système de fichiers, pas du compilateur.",
      },
      {
        kind: "list",
        items: [
          "`--preserveWatchOutput` : ne pas effacer l'écran entre les compilations — utile pour garder l'historique des erreurs.",
          "Le watch émet aussi : c'est un vrai cycle compiler-à-chaque-sauvegarde, pas seulement une vérification.",
          "Pour la vérification seule en continu, combiner `--watch` et `--noEmit`.",
        ],
      },
    ],
  },
  {
    id: "multi-configs",
    title: "Plusieurs configurations",
    level: 3,
    intro: "Dev, build, tests : quand un seul `tsconfig.json` ne suffit plus.",
    blocks: [
      {
        kind: "text",
        text: "Le pattern courant : un `tsconfig.json` de base (avec les options communes), étendu par `tsconfig.app.json` (le code applicatif) et `tsconfig.node.json` (les scripts d'outillage). Les templates Vite utilisent exactement ce découpage. `--project` sélectionne la configuration à compiler.",
      },
      {
        kind: "code",
        language: "json",
        title: "tsconfig.app.json — étend la base",
        code: "{\n  \"extends\": \"./tsconfig.json\",\n  \"include\": [\"src\"],\n  \"compilerOptions\": {\n    \"noEmit\": true\n  }\n}",
      },
    ],
  },
  {
    id: "emit-declaration-only",
    title: "Émission des déclarations seules",
    level: 3,
    intro: "`emitDeclarationOnly` : produire les types sans le JavaScript.",
    blocks: [
      {
        kind: "text",
        text: "Avec `emitDeclarationOnly: true`, `tsc` ne génère que les fichiers `.d.ts`, sans `.js`. Combiné à `allowJs`, cela produit des déclarations à partir de JavaScript existant (via les JSDoc) — utile en migration. Combiné à un bundler qui émet le JS, cela sépare proprement les responsabilités : le bundler produit le code, `tsc` produit les types.",
      },
    ],
  },
  {
    id: "noemitonerror-detail",
    title: "noEmitOnError",
    level: 3,
    intro: "Bloquer l'émission en cas d'erreur : le build qui refuse le code douteux.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, `tsc` émet du JavaScript même en présence d'erreurs de types (les types sont effacés de toute façon). `noEmitOnError: true` change ce comportement : en cas d'erreur, rien n'est émis. C'est le réglage des builds de production — un build qui réussit avec des erreurs de types est un mensonge.",
      },
    ],
  },
  {
    id: "debugging-avec-tsc",
    title: "Déboguer avec tsc",
    level: 3,
    intro: "Le compilateur comme outil de diagnostic : au-delà de la simple compilation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Isoler : reproduire l'erreur dans un fichier minimal — si elle disparaît, le contexte (imports, config) est en cause.",
          "`--traceResolution` pour les problèmes d'imports, `--explainFiles` pour les fichiers inclus par surprise.",
          "Comparer avec `--showConfig` : l'erreur vient-elle vraiment de la configuration qu'on croit ?",
          "Le playground TypeScript (en ligne) permet de tester une hypothèse de typage sans projet — idéal pour isoler un comportement.",
        ],
      },
    ],
  },
  {
    id: "aligner-versions",
    title: "Aligner les versions",
    level: 3,
    intro: "Éditeur, projet, CI : un seul TypeScript partout.",
    blocks: [
      {
        kind: "text",
        text: "Trois endroits exécutent le compilateur : l'éditeur (serveur de langage), le terminal (`npx tsc`), la CI (`npm run typecheck`). S'ils utilisent trois versions différentes, ils peuvent se contredire — l'erreur la plus déroutante étant « ça passe en local mais pas en CI ».",
      },
      {
        kind: "list",
        items: [
          "La version de référence est celle de `package.json` : `npx tsc --version` fait foi.",
          "VS Code : « Use Workspace Version » pour utiliser celle du projet.",
          "La CI installe via `npm ci` : elle obtient exactement la version verrouillée.",
          "Mettre à jour TypeScript se fait comme une dépendance normale : bump de version, `tsc --noEmit`, correction des nouvelles erreurs éventuelles.",
        ],
      },
    ],
  },
  {
    id: "tsc-et-ci",
    title: "tsc en CI",
    level: 3,
    intro: "La vérification automatique : ce que la CI doit exécuter.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Étape typecheck dans un workflow",
        code: "- run: npm ci\n- run: npm run typecheck   # tsc --noEmit\n- run: npm run lint\n- run: npm run test",
      },
      {
        kind: "text",
        text: "Le `typecheck` est la première porte après l'installation : si les types sont incohérents, inutile de lancer les tests. `npm ci` (pas `npm install`) garantit la version exacte du compilateur. Le tout doit passer avant le merge — sans exception.",
      },
    ],
  },
  {
    id: "cas-limites-tsc",
    title: "Cas limites",
    level: 3,
    intro: "Fichiers vides, encodages, très gros projets : les frontières du compilateur.",
    blocks: [
      {
        kind: "fields",
        title: "Situations particulières",
        fields: [
          {
            label: "Aucun fichier d'entrée (TS18003)",
            value:
              "« No inputs were found » : le motif `include` ne matche rien — vérifier les chemins et les fautes de frappe dans `include`.",
          },
          {
            label: "Fichiers générés dans la compilation",
            value:
              "Si `outDir` est sous `include`, `tsc` compile ses propres sorties : toujours exclure `dist` (et vérifier avec `--listFiles`).",
          },
          {
            label: "Très gros projets",
            value:
              "Au-delà de plusieurs milliers de fichiers, envisager le découpage en références de projet (`tsc -b`) : un programme unique devient lent à vérifier.",
          },
          {
            label: "Erreurs dans les .d.ts tiers",
            value:
              "Des erreurs dans `node_modules` signalent des déclarations tierces défectueuses : `skipLibCheck: true` les ignore proprement.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-tsc",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques dans l'usage du compilateur.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Utiliser le tsc global au lieu du local",
            value:
              "Problem : des erreurs différentes entre développeurs. Why : chacun a sa version globale. Better : toujours `npx tsc`, version verrouillée par projet.",
          },
          {
            label: "Compiler sans tsconfig",
            value:
              "Problem : `tsc index.ts` ignore le `tsconfig.json` et utilise des défauts. Why : passer des fichiers en argument désactive la config. Better : `npx tsc` seul, ou `--project` explicite.",
          },
          {
            label: "Lire l'erreur au mauvais endroit",
            value:
              "Problem : corriger la ligne signalée alors que le problème est à la définition du type. Why : l'erreur pointe la violation, pas la cause. Better : remonter à la source du type.",
          },
          {
            label: "Ignorer les codes d'erreur",
            value:
              "Problem : chercher « TypeScript error » au lieu de « TS2322 ». Why : le message seul est générique. Better : le code est la clé de recherche précise.",
          },
          {
            label: "Émettre malgré les erreurs en production",
            value:
              "Problem : un build « réussi » avec des erreurs de types. Why : `tsc` émet par défaut même en erreur. Better : `noEmitOnError: true` sur les builds.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-tsc",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les habitudes d'un usage sain du compilateur.",
    blocks: [
      {
        kind: "list",
        items: [
          "Toujours le `tsc` local : `npx tsc`, version verrouillée dans `package.json`.",
          "Séparer vérification et émission : `--noEmit` pour vérifier, `tsc` pour produire.",
          "`typecheck` en CI : aucune erreur de type ne fusionne.",
          "Lire les codes d'erreur (`TS2322`) : ce sont des clés de diagnostic précises.",
          "Déboguer la config avec `--showConfig` avant de la modifier à l'aveugle.",
          "`noEmitOnError` sur les builds : un build en erreur n'émet rien.",
          "Aligner éditeur, terminal et CI sur la même version de TypeScript.",
          "En monorepo : `tsc -b`, pas `tsc` — l'ordre et l'incrémental sont garantis.",
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
          { label: "Compiler Options", value: "https://www.typescriptlang.org/docs/handbook/compiler-options.html : toutes les options de tsc expliquées." },
          { label: "tsconfig Reference", value: "La référence exhaustive de chaque option de configuration." },
          { label: "Project References", value: "La documentation du mode build `tsc -b` et des références." },
        ],
      },
      {
        kind: "list",
        items: [
          "Playground : tester une hypothèse de typage sans projet.",
          "Community : le dépôt GitHub microsoft/TypeScript pour les comportements inattendus.",
          "Practice : le catalogue d'erreurs personnel — diagnostiquer vite est une compétence qui se construit.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le compilateur maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir `tsconfig` : le fichier qui pilote tout ce que fait `tsc`.",
          "Activer `strict` : les vérifications les plus exigeantes du compilateur.",
          "Comprendre `modules` : résolution et émission des modules en détail.",
          "Sécuriser avec `outillage` : `typecheck` dans la CI, avec lint et tests.",
          "Migrer avec `migration` : `tsc` est le guide d'une migration incrémentale.",
          "Revenir à la roadmap : valider la compétence et passer à la suivante du parcours.",
        ],
      },
    ],
  },
];

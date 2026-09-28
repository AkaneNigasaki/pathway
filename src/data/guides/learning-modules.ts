import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de « Modules & organisation » : découper le code
 * en fichiers aux dépendances explicites, comprendre les systèmes de modules
 * et leur résolution, publier des bibliothèques typées.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_MODULES: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Organiser le code en modules : des fichiers aux dépendances explicites, vérifiées par le compilateur.",
    blocks: [
      {
        kind: "text",
        text: "Un module est un fichier qui expose une partie de son contenu (`export`) et consomme celui des autres (`import`). Les dépendances deviennent explicites : en lisant les imports en tête de fichier, on sait exactement de quoi ce fichier dépend. TypeScript vérifie ces dépendances — un import inexistant ou mal typé est une erreur de compilation.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est fondamental : un projet grandit vite, et sans organisation les imports deviennent un labyrinthe — chemins relatifs interminables, dépendances circulaires, responsabilités mélangées. Les modules sont l'architecture invisible qui garde le projet navigable : découper, exposer une API claire par module, et laisser le compilateur garantir la cohérence de l'ensemble.",
      },
    ],
  },
  {
    id: "script-vs-module",
    title: "Script vs module",
    level: 1,
    intro:
      "La distinction la plus importante : tout fichier n'est pas un module.",
    blocks: [
      {
        kind: "diagram",
        title: "Deux natures de fichiers",
        lines: [
          "Fichier AVEC import/export → MODULE",
          "  - portée locale au fichier",
          "  - dépendances explicites",
          "  - c'est le cas normal",
          "",
          "Fichier SANS import/export → SCRIPT",
          "  - déclarations globales",
          "  - visible partout sans import",
          "  - à éviter sauf cas documenté",
        ],
      },
      {
        kind: "text",
        text: "Un fichier contenant au moins un `import` ou un `export` est un module : tout ce qu'il déclare reste local, sauf ce qu'il exporte explicitement. Un fichier sans import ni export est un script : ses déclarations polluent l'espace global. En TypeScript moderne, chaque fichier source devrait être un module — les scripts globaux sont une exception à documenter, jamais la norme.",
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
      "Ce qu'il faut maîtriser avant d'organiser un projet en modules.",
    blocks: [
      {
        kind: "fields",
        title: "Avant les modules",
        fields: [
          {
            label: "Syntaxe import / export",
            value:
              "Importer et exporter en JavaScript : sans cette base, la configuration TypeScript des modules restera abstraite.",
          },
          {
            label: "Types de base et interfaces",
            value:
              "Avoir des types à organiser : les modules servent à répartir interfaces, fonctions et classes entre fichiers.",
          },
          {
            label: "tsconfig.json",
            value:
              "Comprendre `target`, `module` et `moduleResolution` : trois options qui déterminent comment les modules sont émis et résolus.",
          },
          {
            label: "npm et package.json",
            value:
              "Le champ `\"type\"` de `package.json` déclare le système de modules du projet : c'est le contrat avec Node.js.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-module",
    title: "Premier module",
    level: 2,
    intro:
      "Créer deux fichiers qui se parlent : exporter d'un côté, importer de l'autre.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "math.ts — expose des fonctions",
        code: "export function add(a: number, b: number): number {\n  return a + b;\n}\n\nexport function multiply(a: number, b: number): number {\n  return a * b;\n}",
      },
      {
        kind: "code",
        language: "typescript",
        title: "main.ts — consomme le module",
        code: "import { add, multiply } from \"./math.js\";\n\nconsole.log(add(2, 3));      // 5\nconsole.log(multiply(2, 3)); // 6",
      },
      {
        kind: "text",
        text: "`export` rend les fonctions visibles depuis l'extérieur ; `import` les consomme en les nommant explicitement. Le compilateur vérifie que `add` existe bien dans `./math.ts` et que les arguments ont le bon type : une erreur d'import est détectée avant l'exécution.",
      },
    ],
  },
  {
    id: "exports-nommes-defaut",
    title: "Exports nommés et par défaut",
    level: 2,
    intro:
      "Deux façons d'exposer, avec des conséquences sur la maintenabilité.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Les deux formes d'export",
        code: "// Exports nommés : plusieurs par fichier, noms vérifiés\n export function add(a: number, b: number): number { return a + b; }\n export const PI = 3.14159;\n\nimport { add, PI } from \"./math.js\";\n\n// Export par défaut : un seul par fichier, nom libre à l'import\n export default function sub(a: number, b: number): number { return a - b; }\n\nimport subtract from \"./math.js\"; // le nom est libre",
      },
      {
        kind: "table",
        headers: ["", "Exports nommés", "Export par défaut"],
        rows: [
          ["Nombre", "Plusieurs par fichier", "Un seul par fichier"],
          ["Import", "Nom exact entre accolades", "Nom libre, sans accolades"],
          ["Renommage", "Détecté par l'éditeur (F2)", "Invisible : chaque importeur choisit son nom"],
          ["Recommandation", "À privilégier : explicite et vérifiable", "À réserver aux cas où un module n'a vraiment qu'une chose à exposer"],
        ],
      },
    ],
  },
  {
    id: "imports-relatifs",
    title: "Imports relatifs",
    level: 2,
    intro:
      "Les chemins `./` et `../` : simples, mais qui deviennent vite illisibles.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Chemins relatifs",
        code: "import { User } from \"./models/user.js\";       // même dossier\nimport { api } from \"../services/api.js\";       // dossier parent\nimport { config } from \"../../config/index.js\";  // deux niveaux plus haut",
      },
      {
        kind: "text",
        text: "`./` désigne le dossier courant, `../` le dossier parent. Le système est simple et ne nécessite aucune configuration — mais dans un projet profond, les `../../../` deviennent illisibles et fragiles : déplacer un fichier casse tous ses imports. C'est le problème que les alias de chemins (`paths`) résolvent.",
      },
    ],
  },
  {
    id: "extension-js-imports",
    title: "L'extension .js dans les imports",
    level: 2,
    intro:
      "Pourquoi on écrit `./math.js` pour importer `./math.ts` : une règle qui surprend.",
    blocks: [
      {
        kind: "text",
        text: "En mode `moduleResolution: NodeNext`, TypeScript exige d'écrire l'extension du fichier tel qu'il existera après compilation : on importe `./math.js` alors que la source est `./math.ts`. C'est parce que Node.js, à l'exécution, résoudra `./math.js` — le compilateur veut que le code source reflète exactement ce que le runtime verra.",
      },
      {
        kind: "list",
        items: [
          "Règle : écrire l'extension `.js` (ou `.mjs`) dans les imports relatifs, même si le fichier source est `.ts`.",
          "Cette règle ne s'applique qu'avec les résolutions modernes (`NodeNext`, `Bundler`) ; les bundlers comme Vite l'acceptent aussi.",
          "Oublier l'extension donne une erreur de résolution : le message de `tsc` indique le chemin qu'il n'a pas trouvé.",
        ],
      },
    ],
  },
  {
    id: "barrel-files",
    title: "Barrel files",
    level: 2,
    intro:
      "Un `index.ts` qui réexporte tout un dossier : des imports courts et stables.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "models/index.ts — le barrel",
        code: "// Réexporte tout le dossier models depuis un point unique\nexport { User } from \"./user.js\";\nexport { Product } from \"./product.js\";\nexport type { Order } from \"./order.js\";",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Consommation simplifiée",
        code: "// Sans barrel :\nimport { User } from \"./models/user.js\";\nimport { Product } from \"./models/product.js\";\n\n// Avec barrel :\nimport { User, Product } from \"./models/index.js\";",
      },
      {
        kind: "text",
        text: "Le barrel (fichier `index.ts`) définit l'API publique d'un dossier : les consommateurs importent depuis le dossier, pas depuis chaque fichier. Avantage : on peut réorganiser les fichiers internes sans casser les imports externes. À doser cependant : des barrels qui se réexportent en cascade peuvent ralentir l'analyse du compilateur et masquer les dépendances réelles.",
      },
    ],
  },
  {
    id: "tsconfig-modules",
    title: "Configurer les modules dans tsconfig",
    level: 2,
    intro:
      "Les trois options qui gouvernent les modules : `module`, `moduleResolution`, et leur cohérence.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Configuration recommandée (Node.js moderne)",
        code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"NodeNext\",\n    \"moduleResolution\": \"NodeNext\",\n    \"esModuleInterop\": true\n  }\n}",
      },
      {
        kind: "fields",
        title: "Ce que fait chaque option",
        fields: [
          {
            label: "`module`",
            value:
              "Le format des `import`/`export` dans le JavaScript émis. `NodeNext` émet selon le champ `\"type\"` du `package.json` : ESM si `\"type\": \"module\"`, CommonJS sinon.",
          },
          {
            label: "`moduleResolution`",
            value:
              "L'algorithme qui retrouve le fichier correspondant à un import. Doit imiter l'environnement réel : `NodeNext` suit les règles strictes de Node.js moderne.",
          },
          {
            label: "Cohérence",
            value:
              "Les deux options doivent raconter la même histoire : `NodeNext`/`NodeNext` pour Node.js moderne, `Bundler`/`Bundler` pour Vite ou Webpack. Un mélange incohérent compile mais échoue à l'exécution.",
          },
        ],
      },
    ],
  },
  {
    id: "package-json-type",
    title: "Le champ \"type\" de package.json",
    level: 2,
    intro:
      "Une ligne dans `package.json` qui décide du système de modules de tout le projet.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json — déclarer ESM",
        code: "{\n  \"name\": \"mon-projet\",\n  \"type\": \"module\"\n}",
      },
      {
        kind: "table",
        headers: ["Champ \"type\"", ".js = ", ".ts + module NodeNext = "],
        rows: [
          ["\"module\"", "ESM", "ESM (import/export émis)"],
          ["absent (défaut)", "CommonJS", "CommonJS (require/module.exports émis)"],
        ],
      },
      {
        kind: "text",
        text: "Node.js lit ce champ pour savoir comment exécuter les `.js`. Avec `module: NodeNext`, TypeScript s'aligne dessus automatiquement : le code émis correspond à ce que Node.js attend. C'est le contrat central entre le compilateur et le runtime — le rompre produit des erreurs d'exécution incompréhensibles.",
      },
    ],
  },
  {
    id: "alias-chemins",
    title: "Alias de chemins",
    level: 2,
    intro:
      "Remplacer les `../../../` par des imports lisibles : `baseUrl` et `paths`.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "tsconfig.json — alias @/*",
        code: "{\n  \"compilerOptions\": {\n    \"baseUrl\": \".\",\n    \"paths\": {\n      \"@/*\": [\"src/*\"]\n    }\n  }\n}",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Import avec alias",
        code: "// Avant :\nimport { User } from \"../../../models/user.js\";\n\n// Après :\nimport { User } from \"@/models/user.js\";",
      },
      {
        kind: "text",
        text: "`paths` dit au compilateur comment résoudre `@/...` ; mais attention : `tsc` seul ne réécrit pas ces alias dans le JavaScript émis. À l'exécution, Node.js ne comprend pas `@/` : il faut un bundler (Vite, Webpack) configuré avec le même alias, ou un outil de réécriture. L'alias est donc un contrat à honorer des deux côtés — compilation et exécution.",
      },
    ],
  },
  {
    id: "resolution-erreurs",
    title: "Résoudre les erreurs de résolution",
    level: 2,
    intro:
      "Quand `tsc` ne trouve pas un module : diagnostiquer au lieu de deviner.",
    blocks: [
      {
        kind: "command",
        label: "Tracer la résolution d'un import",
        command: "npx tsc --noEmit --traceResolution | grep \"math\"",
        why: "Affiche pas à pas où `tsc` a cherché chaque module : quels dossiers, quelles extensions, quelle règle de `package.json`. Quand un import échoue, cette trace montre exactement où la recherche s'est arrêtée — bien plus rapide que de deviner.",
        verify: "npx tsc --noEmit",
      },
      {
        kind: "list",
        items: [
          "Erreur `TS2307` (« Cannot find module ») : le fichier n'existe pas à cet endroit, l'extension est oubliée, ou les `@types` manquent.",
          "Vérifier d'abord le chemin littéralement : faute de frappe, mauvais dossier, extension manquante.",
          "Puis la configuration : `moduleResolution` cohérent avec l'environnement, `paths` corrects.",
          "Enfin les types : la bibliothèque a-t-elle ses propres types ou faut-il un `@types/*` ?",
        ],
      },
    ],
  },
  {
    id: "projets-modulaires",
    title: "Projets modulaires",
    level: 2,
    intro:
      "Trois chantiers pour pratiquer l'organisation en modules.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Découper un fichier monolithique",
        fields: [
          { label: "Skills required", value: "import/export, barrel files, `tsc --noEmit`" },
          { label: "What you build", value: "Le découpage d'un fichier de 500+ lignes en modules cohérents avec un barrel" },
          { label: "What you learn", value: "Identifier les responsabilités, définir des API de modules, vérifier l'absence de cycles" },
          { label: "Expected difficulty", value: "Faible — quelques heures" },
          { label: "Next project", value: "Bibliothèque avec alias" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Bibliothèque avec alias",
        fields: [
          { label: "Skills required", value: "paths, barrels, `declaration: true`" },
          { label: "What you build", value: "Une petite bibliothèque organisée en dossiers, avec alias `@/*` et API publique via barrels" },
          { label: "What you learn", value: "Configurer les alias des deux côtés (tsc + bundler), générer les `.d.ts`" },
          { label: "Expected difficulty", value: "Moyenne — quelques jours" },
          { label: "Next project", value: "Monorepo à références" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Monorepo à références",
        fields: [
          { label: "Skills required", value: "Project references, `tsc -b`, `composite: true`" },
          { label: "What you build", value: "Deux paquets liés par `references`, compilés dans le bon ordre avec `tsc -b`" },
          { label: "What you learn", value: "La compilation incrémentale multi-projets, les dépendances explicites entre paquets" },
          { label: "Expected difficulty", value: "Élevée — une semaine" },
          { label: "Next project", value: "Publier la bibliothèque sur npm" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "esm-detail",
    title: "ESM en détail",
    level: 3,
    intro: "Le système de modules standard : sa sémantique exacte.",
    blocks: [
      {
        kind: "text",
        text: "Les modules ES (`import`/`export`) sont le standard du langage depuis ES2015. Sémantique clé : les imports sont résolus avant l'exécution (les liaisons sont « vivantes » — un `export let` modifié dans le module est visible chez l'importeur), les imports sont en lecture seule côté consommateur, et le graphe de modules est statique (analysable sans exécuter le code).",
      },
      {
        kind: "list",
        items: [
          "Les `import` sont hoistés : ils s'exécutent avant le reste du module, quel que soit leur emplacement.",
          "Un module n'est évalué qu'une fois, même importé depuis plusieurs fichiers : c'est un singleton naturel.",
          "L'ordre d'évaluation suit l'ordre des imports : un effet de bord dans un module s'exécute au moment de son premier import.",
        ],
      },
    ],
  },
  {
    id: "commonjs-detail",
    title: "CommonJS en détail",
    level: 3,
    intro: "Le système historique de Node.js : toujours présent, à comprendre.",
    blocks: [
      {
        kind: "text",
        text: "CommonJS (`require`/`module.exports`) est le système historique de Node.js. Contrairement à l'ESM, `require` est un appel de fonction ordinaire : il peut être conditionnel, dynamique, et s'exécute à l'endroit où il est appelé. `module.exports` est un objet mutable que le module remplit.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "CommonJS — sémantique",
        code: "// utils.js (CommonJS)\nfunction add(a, b) { return a + b; }\nmodule.exports = { add };\n\n// main.js\nconst { add } = require(\"./utils.js\"); // appel synchrone, à cet endroit",
      },
      {
        kind: "text",
        text: "Beaucoup de paquets npm historiques sont en CommonJS. TypeScript les consomme sans problème, mais l'interopérabilité avec l'ESM a des règles précises (voir la section interopérabilité).",
      },
    ],
  },
  {
    id: "interop-modules",
    title: "Interopérabilité ESM / CommonJS",
    level: 3,
    intro: "Importer un module CommonJS depuis de l'ESM : les règles et les options.",
    blocks: [
      {
        kind: "text",
        text: "Le cas le plus courant : `import express from \"express\"` alors qu'Express est un module CommonJS. `esModuleInterop: true` autorise cette écriture en ajoutant une couche d'interopérabilité à l'émission : l'export par défaut synthétisé correspond à `module.exports`. Sans cette option, TypeScript exige `import * as express` — et signale `TS1259` si on tente l'import par défaut.",
      },
      {
        kind: "fields",
        title: "Les options d'interopérabilité",
        fields: [
          {
            label: "`esModuleInterop`",
            value:
              "Ajoute des helpers à l'émission pour que l'import par défaut d'un module CommonJS fonctionne. Le réglage recommandé dans la quasi-totalité des projets.",
          },
          {
            label: "`allowSyntheticDefaultImports`",
            value:
              "Autorise la syntaxe d'import par défaut au niveau des types uniquement, sans helper à l'émission. Utile quand un bundler gère déjà l'interopérabilité.",
          },
          {
            label: "Sans les deux",
            value:
              "L'import par défaut d'un CommonJS est une erreur de type (TS1259). Seul `import * as` est accepté — plus verbeux mais sans magie.",
          },
        ],
      },
    ],
  },
  {
    id: "modulereSolution-nodenext",
    title: "moduleResolution NodeNext",
    level: 3,
    intro: "La résolution stricte qui imite Node.js moderne au plus près.",
    blocks: [
      {
        kind: "text",
        text: "`NodeNext` (et son jumeau `Node16`) applique les règles exactes de Node.js : respect du champ `\"type\"` de `package.json`, du champ `\"exports\"` (qui restreint les points d'entrée exposés), et extension obligatoire dans les imports relatifs. C'est la résolution la plus exigeante — et la plus fidèle : ce qui compile s'exécute.",
      },
      {
        kind: "list",
        items: [
          "Le champ `\"exports\"` d'un paquet définit ses points d'entrée autorisés : importer un sous-chemin non déclaré est une erreur, même si le fichier existe.",
          "Les sous-chemins (`\"./utils\"`) doivent être déclarés dans `\"exports\"` pour être importables.",
          "C'est le bon choix pour les bibliothèques publiées sur npm et les projets Node.js sans bundler.",
        ],
      },
    ],
  },
  {
    id: "modulereSolution-bundler",
    title: "moduleResolution Bundler",
    level: 3,
    intro: "La résolution pensée pour Vite, Webpack et les autres bundlers.",
    blocks: [
      {
        kind: "text",
        text: "`Bundler` imite le comportement des bundlers modernes : il résout les imports comme Vite ou Webpack le feraient, sans imposer les contraintes strictes de Node.js (l'extension dans les imports relatifs reste recommandée mais le champ `\"exports\"` est interprété avec plus de souplesse). C'est le bon choix quand un bundler produit le JavaScript final.",
      },
      {
        kind: "list",
        items: [
          "À utiliser avec `module: Preserve` ou `ESNext` : le bundler choisit le format final.",
          "Ne jamais utiliser `Bundler` pour du code exécuté directement par Node.js : la résolution différerait à l'exécution.",
          "La règle reste : la résolution du compilateur doit imiter celle de l'environnement d'exécution réel.",
        ],
      },
    ],
  },
  {
    id: "modulereSolution-comparatif",
    title: "Comparatif des résolutions",
    level: 3,
    intro: "Choisir la bonne résolution selon l'environnement : le tableau de décision.",
    blocks: [
      {
        kind: "table",
        headers: ["", "NodeNext / Node16", "Bundler", "Classic"],
        rows: [
          ["Environnement visé", "Node.js moderne, sans bundler", "Vite, Webpack, Rspack…", "Historique, à éviter"],
          ["Champ \"exports\"", "Respecté strictement", "Interprété avec souplesse", "Ignoré"],
          ["Extension en import relatif", "Obligatoire", "Recommandée", "Optionnelle"],
          ["Usage typique", "Bibliothèques npm, CLI Node", "Applications frontend", "Ne plus utiliser"],
        ],
      },
    ],
  },
  {
    id: "verbatimmodulesyntax",
    title: "verbatimModuleSyntax",
    level: 3,
    intro: "Des imports et exports qui signifient exactement ce qu'ils disent.",
    blocks: [
      {
        kind: "text",
        text: "Avec `verbatimModuleSyntax: true`, TypeScript n'essaie plus de deviner si un import est un type ou une valeur : `import { User }` importe une valeur, `import type { User }` importe un type — et le compilateur exige la bonne forme. Sans cette option, `tsc` élimine automatiquement les imports uniquement utilisés comme types ; avec elle, un import de type écrit sans `type` devient une erreur à l'exécution potentielle.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "import type explicite",
        code: "import type { User } from \"./models/user.js\"; // type uniquement : effacé à l'émission\nimport { fetchUser } from \"./api.js\";              // valeur : conservé\n\nexport type { User }; // réexport de type explicite",
      },
    ],
  },
  {
    id: "isolatedmodules",
    title: "isolatedModules",
    level: 3,
    intro: "L'option qui garantit que chaque fichier se transpile isolément.",
    blocks: [
      {
        kind: "text",
        text: "`isolatedModules: true` impose que chaque fichier puisse être transpilé sans connaître les autres — c'est le mode de fonctionnement d'esbuild, de SWC et de Vite. Conséquence pratique : les réexports de types doivent utiliser `export type`, et certaines formes ambiguës (comme `export =` dans certains contextes) sont interdites. L'erreur `TS1208` rappelle la règle.",
      },
      {
        kind: "text",
        text: "À activer dès qu'un transpileur rapide (Vite, esbuild) traite le code : elle garantit que ce que `tsc` vérifie correspond à ce que le transpileur produira. Sans elle, un code qui passe `tsc` peut être mal transpilé par esbuild.",
      },
    ],
  },
  {
    id: "import-type",
    title: "import type",
    level: 3,
    intro: "Importer uniquement des types : plus sûr, plus rapide, plus clair.",
    blocks: [
      {
        kind: "text",
        text: "`import type { User }` déclare explicitement qu'on n'importe qu'un type : l'import est garanti effacé à l'émission, sans risque d'import à l'exécution accidentel. C'est aussi une documentation : en lisant les imports, on distingue les dépendances de types (sans coût runtime) des dépendances de valeurs.",
      },
      {
        kind: "list",
        items: [
          "Préférer `import type` pour tout ce qui n'est utilisé qu'en position de type.",
          "Combine avec `verbatimModuleSyntax` pour une séparation stricte types/valeurs.",
          "Les bundlers éliminent ces imports : aucun impact sur le bundle final.",
        ],
      },
    ],
  },
  {
    id: "export-egal",
    title: "export = et import =",
    level: 3,
    intro: "La syntaxe d'export unique héritée de CommonJS : à connaître pour lire le code existant.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "export = (style CommonJS)",
        code: "// legacy.ts\nfunction compute(x: number): number { return x * 2; }\nexport = compute;\n\n// consommation\nimport compute = require(\"./legacy.js\");\n// ou, avec esModuleInterop :\nimport compute from \"./legacy.js\";",
      },
      {
        kind: "text",
        text: "`export =` modélise exactement `module.exports = ...` : le module n'exporte qu'une seule chose. C'est la forme historique pour typer des modules CommonJS. Dans le code neuf, on préfère les exports nommés ou l'export par défaut standard — mais on rencontre `export =` dans les déclarations de bibliothèques anciennes.",
      },
    ],
  },
  {
    id: "declare-module",
    title: "declare module",
    level: 3,
    intro: "Déclarer les types d'un module sans son code : les blocs ambiants.",
    blocks: [
      {
        kind: "text",
        text: "Un bloc `declare module \"nom\" { ... }` dans un fichier `.d.ts` décrit les types d'un module JavaScript existant : ses exports, leurs types, sans aucune implémentation. C'est le mécanisme derrière les paquets `@types/*` et les déclarations locales — la façon de typer l'existant sans le réécrire.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Déclaration ambiante",
        code: "declare module \"ma-lib-js\" {\n  export function parse(input: string): unknown;\n  export const version: string;\n}",
      },
    ],
  },
  {
    id: "fichiers-dts",
    title: "Les fichiers .d.ts",
    level: 3,
    intro: "Des types sans code : à quoi servent les fichiers de déclaration.",
    blocks: [
      {
        kind: "text",
        text: "Un fichier `.d.ts` ne contient que des déclarations de types : interfaces, signatures de fonctions, `declare module`. Il n'est jamais exécuté et n'émet rien. Deux usages : décrire du JavaScript existant (bibliothèques tierces, déclarations locales) et exposer l'API publique typée d'une bibliothèque compilée.",
      },
      {
        kind: "list",
        items: [
          "Les `.d.ts` des dépendances sont lus automatiquement par `tsc` : c'est ainsi que les imports externes sont typés.",
          "`tsc` peut générer les `.d.ts` d'un projet avec `declaration: true` : c'est indispensable pour publier une bibliothèque.",
          "Un `.d.ts` écrit à la main est une promesse : s'il ment sur les types réels, le compilateur croira le mensonge.",
        ],
      },
    ],
  },
  {
    id: "publier-lib",
    title: "Publier une bibliothèque typée",
    level: 3,
    intro: "De la source TypeScript au paquet npm consommable : les pièces du puzzle.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "tsconfig.json d'une bibliothèque",
        code: "{\n  \"compilerOptions\": {\n    \"declaration\": true,\n    \"outDir\": \"dist\",\n    \"rootDir\": \"src\"\n  }\n}",
      },
      {
        kind: "code",
        language: "json",
        title: "package.json — points d'entrée",
        code: "{\n  \"main\": \"dist/index.js\",\n  \"types\": \"dist/index.d.ts\",\n  \"files\": [\"dist\"]\n}",
      },
      {
        kind: "text",
        text: "`declaration: true` génère les `.d.ts` à côté du JavaScript compilé ; `\"types\"` dans `package.json` indique aux consommateurs où les trouver. Le champ `\"exports\"` (Node.js moderne) déclare précisément les points d'entrée publics. Sans ces trois éléments, une bibliothèque TypeScript publiée est inutilisable proprement.",
      },
    ],
  },
  {
    id: "cycles-dependances",
    title: "Dépendances circulaires",
    level: 3,
    intro: "Quand A importe B qui importe A : pourquoi c'est un problème et comment s'en sortir.",
    blocks: [
      {
        kind: "text",
        text: "Une dépendance circulaire (A importe B, B importe A) n'est pas une erreur de compilation — mais c'est un problème d'exécution : selon l'ordre d'évaluation des modules, l'un des deux peut voir l'autre partiellement initialisé (`undefined` là où on attendait une fonction). En ESM, les liaisons vivantes atténuent le problème sans l'éliminer.",
      },
      {
        kind: "list",
        items: [
          "Symptôme typique : une valeur `undefined` à l'exécution alors que les types sont corrects.",
          "Solution structurelle : extraire les types ou constantes partagés dans un troisième module C, importé par A et B.",
          "Solution tactique : remplacer un import de valeur par un `import type` quand seule la partie type crée le cycle.",
          "Détecter : certains linters et outils d'analyse signalent les cycles ; le plus simple reste de les éviter par conception.",
        ],
      },
    ],
  },
  {
    id: "imports-dynamiques",
    title: "Imports dynamiques",
    level: 3,
    intro: "Charger un module à la demande : `import()` comme fonction.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Chargement différé",
        code: "async function loadEditor(): Promise<void> {\n  // Le module n'est chargé qu'à l'appel, pas au démarrage.\n  const { createEditor } = await import(\"./editor.js\");\n  createEditor(document.getElementById(\"app\")!);\n}",
      },
      {
        kind: "text",
        text: "`import()` retourne une promesse du namespace du module : le typage est préservé (`createEditor` est vérifié comme un import statique). Usage principal : le découpage de code (code splitting) — charger une fonctionnalité lourde uniquement quand l'utilisateur en a besoin. Les bundlers transforment chaque `import()` en chunk séparé.",
      },
    ],
  },
  {
    id: "top-level-await",
    title: "Top-level await",
    level: 3,
    intro: "`await` au sommet d'un module : pratique, avec des conditions.",
    blocks: [
      {
        kind: "text",
        text: "Le top-level await permet d'utiliser `await` directement dans le corps d'un module, sans fonction `async` englobante. Condition : le module doit être ESM et la cible le supporter (`target: ES2022` ou supérieur, ou `module: ESNext`). Le module qui l'utilise devient asynchrone : ses importeurs attendent implicitement sa fin d'évaluation.",
      },
      {
        kind: "list",
        items: [
          "Utile pour l'initialisation (charger une configuration distante avant d'exporter).",
          "À utiliser avec parcimonie : il sérialise l'évaluation des modules et peut ralentir le démarrage.",
          "Interdit en CommonJS : c'est une fonctionnalité ESM uniquement.",
        ],
      },
    ],
  },
  {
    id: "subpath-imports",
    title: "Subpath imports (#)",
    level: 3,
    intro: "Des alias internes au paquet, sans `paths` : le champ `imports` de `package.json`.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json — imports internes",
        code: "{\n  \"imports\": {\n    \"#utils/*\": \"./src/utils/*\"\n  }\n}",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Utilisation",
        code: "import { format } from \"#utils/format.js\";",
      },
      {
        kind: "text",
        text: "Le champ `\"imports\"` déclare des alias résolus par Node.js lui-même : contrairement à `paths` du `tsconfig`, ils fonctionnent à l'exécution sans réécriture. TypeScript les comprend avec `moduleResolution: NodeNext` ou `Bundler`. C'est la solution moderne aux imports relatifs interminables dans un paquet — portée au paquet, pas globale comme `paths`.",
      },
    ],
  },
  {
    id: "resolvejsonmodule",
    title: "resolveJsonModule",
    level: 3,
    intro: "Importer un fichier JSON comme un module typé.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Import JSON typé",
        code: "// tsconfig : \"resolveJsonModule\": true\nimport config from \"./config.json\";\n\n// config est typé d'après le contenu réel du fichier :\n// { port: number, host: string }\nconsole.log(config.port.toFixed());",
      },
      {
        kind: "text",
        text: "Avec `resolveJsonModule: true`, l'import d'un `.json` produit un type inféré de son contenu : les clés et les types de valeurs sont vérifiés. Pratique pour les fichiers de configuration et les données statiques. Limite : le type suit le contenu exact du fichier — un JSON modifié change le type.",
      },
    ],
  },
  {
    id: "declare-assets",
    title: "Typer les imports d'assets",
    level: 3,
    intro: "CSS, images, SVG : dire au compilateur ce qu'est un import non-JS.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "src/types/assets.d.ts",
        code: "declare module \"*.css\" {\n  const classes: { [key: string]: string };\n  export default classes;\n}\n\ndeclare module \"*.png\" {\n  const src: string;\n  export default src;\n}",
      },
      {
        kind: "text",
        text: "Les bundlers permettent d'importer des fichiers non-JS, mais `tsc` ne sait pas ce qu'ils valent : ces déclarations ambiantes à joker (`*.css`, `*.png`) lui donnent un type. Chaque motif déclare la forme de l'import (objet de classes, URL…). Les frameworks (Vite, Next.js) fournissent souvent ces déclarations via leurs propres types.",
      },
    ],
  },
  {
    id: "moduledetection",
    title: "moduleDetection",
    level: 3,
    intro: "Forcer la nature module d'un fichier : l'option `moduleDetection`.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut (`\"auto\"`), un fichier sans `import`/`export` est un script global. `moduleDetection: \"force\"` traite tous les fichiers comme des modules, même sans import ni export — utile pour éviter les globales accidentelles. C'est un garde-fou : avec `\"force\"`, un fichier qui devait être un module mais auquel il manque l'export ne pollue plus silencieusement l'espace global.",
      },
    ],
  },
  {
    id: "monorepo-references",
    title: "Références de projet",
    level: 3,
    intro: "Plusieurs paquets TypeScript qui se connaissent : `references` et `tsc -b`.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "packages/app/tsconfig.json — référence vers le paquet core",
        code: "{\n  \"compilerOptions\": {\n    \"composite\": true,\n    \"outDir\": \"dist\",\n    \"rootDir\": \"src\"\n  },\n  \"references\": [{ \"path\": \"../core\" }]\n}",
      },
      {
        kind: "command",
        label: "Compiler le monorepo dans le bon ordre",
        command: "npx tsc -b packages/app",
        why: "Le mode build (`-b`) lit les `references` et compile les dépendances d'abord, uniquement si elles ont changé (via les fichiers `.tsbuildinfo`). Sur un monorepo, c'est la seule façon fiable de compiler : l'ordre est garanti et le travail inutile est évité.",
        verify: "npx tsc -b --verbose packages/app",
      },
      {
        kind: "text",
        text: "`composite: true` est requis pour un projet référencé : il active `declaration` et le suivi incrémental. Chaque paquet expose ses types aux autres via ses `.d.ts` générés — les dépendances entre paquets deviennent explicites et vérifiées.",
      },
    ],
  },
  {
    id: "architecture-couches",
    title: "Architecture en couches",
    level: 3,
    intro: "Organiser les modules par responsabilité : un exemple de structure qui tient la route.",
    blocks: [
      {
        kind: "diagram",
        title: "Couches et sens des dépendances",
        lines: [
          "presentation/   (UI, handlers) ──┐",
          "                                │ dépend de",
          "application/    (cas d'usage) ──┤",
          "                                │ dépend de",
          "domain/         (modèles, règles) │",
          "                                │ (ne dépend de rien)",
          "",
          "infrastructure/ (API, base) ────┘ implémente les interfaces du domaine",
          "",
          "Règle : les dépendances vont vers le bas, jamais l'inverse.",
        ],
      },
      {
        kind: "text",
        text: "Le principe : le domaine (règles métier, types centraux) ne dépend de rien ; les couches externes en dépendent. Les modules d'infrastructure implémentent des interfaces définies par le domaine. Cette discipline se vérifie par les imports : si `domain/` importe `infrastructure/`, l'architecture est inversée.",
      },
    ],
  },
  {
    id: "cas-limites-modules",
    title: "Cas limites",
    level: 3,
    intro: "Extensions exotiques, JSONC, et autres situations aux frontières.",
    blocks: [
      {
        kind: "fields",
        title: "Situations particulières",
        fields: [
          {
            label: "`.mts` / `.cts`",
            value:
              "Extensions explicites : `.mts` force ESM, `.cts` force CommonJS, quel que soit le champ `\"type\"`. Utile pour mélanger les deux systèmes dans un même paquet.",
          },
          {
            label: "JSON avec commentaires",
            value:
              "`resolveJsonModule` ne gère que le JSON strict. Pour du JSONC, il faut le lire via `fs` et le parser — le typage passe alors par une validation explicite.",
          },
          {
            label: "Effets de bord à l'import",
            value:
              "Un module qui exécute du code à son import (connexion, enregistrement global) crée un couplage invisible : préférer des fonctions d'initialisation explicites appelées par le point d'entrée.",
          },
          {
            label: "Réexports massifs",
            value:
              "`export * from` réexporte tout sauf le défaut : pratique pour les barrels, mais il masque l'origine réelle des symboles et peut créer des conflits de noms silencieux.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-resolution",
    title: "Déboguer la résolution",
    level: 3,
    intro: "Quand le runtime ne trouve pas ce que `tsc` a validé : les deux mondes à réconcilier.",
    blocks: [
      {
        kind: "text",
        text: "Le piège classique : le code compile (`tsc` résout l'import) mais échoue à l'exécution (Node.js ne le résout pas). Les deux utilisent des règles différentes — `paths` du tsconfig sans équivalent runtime, alias bundler non configuré côté Node, extension oubliée. Le diagnostic commence toujours par la même question : qui résout à l'exécution, et avec quelles règles ?",
      },
      {
        kind: "list",
        items: [
          "`--traceResolution` montre la logique de `tsc` ; pour Node.js, l'erreur `ERR_MODULE_NOT_FOUND` montre le chemin cherché.",
          "Avec les alias `paths`, prévoir la réécriture côté runtime (bundler, ou subpath imports `#` qui sont natifs).",
          "Tester l'exécution réelle après chaque changement de configuration des modules : la compilation seule ne suffit pas.",
        ],
      },
    ],
  },
  {
    id: "erreurs-ts-modules",
    title: "Erreurs tsc liées aux modules",
    level: 3,
    intro: "Les codes d'erreur spécifiques aux modules, et leur résolution.",
    blocks: [
      {
        kind: "table",
        headers: ["Code", "Message", "Résolution"],
        rows: [
          ["TS2307", "Cannot find module 'x'", "Chemin incorrect, extension manquante, `@types` absent, ou sous-chemin non déclaré dans `\"exports\"`."],
          ["TS1259", "Module can only be default-imported with 'esModuleInterop'", "Activer `esModuleInterop`, ou utiliser `import * as`."],
          ["TS1208", "All files must be modules with 'isolatedModules'", "Ajouter un `import`/`export` (même `export {}`), ou utiliser `import type`."],
          ["TS2305", "Module has no exported member 'x'", "Le symbole n'est pas exporté : vérifier le nom et l'export dans le module source."],
          ["TS2497", "Module resolves to a non-module entity", "Le fichier cible est un script global : il ne peut pas être importé comme un module."],
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-modules",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques de l'organisation en modules.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Oublier l'extension .js dans les imports",
            value:
              "Problem : `TS2307` sous `NodeNext` alors que le fichier existe. Why : Node.js exige l'extension à l'exécution. Better : toujours écrire `./module.js` pour `./module.ts`.",
          },
          {
            label: "Incohérence module / moduleResolution",
            value:
              "Problem : ça compile mais ça échoue à l'exécution. Why : la résolution du compilateur n'imite pas le runtime. Better : `NodeNext`/`NodeNext` ou `Bundler`/`Bundler`, jamais de mélange.",
          },
          {
            label: "Alias paths sans équivalent runtime",
            value:
              "Problem : `tsc` résout `@/x`, Node.js lance `ERR_MODULE_NOT_FOUND`. Why : `paths` n'est qu'une indication pour `tsc`. Better : configurer l'alias aussi côté bundler/runtime, ou utiliser les subpath imports `#`.",
          },
          {
            label: "Barrels en cascade",
            value:
              "Problem : compilation lente, dépendances masquées. Why : des `index.ts` qui se réexportent en chaîne. Better : des barrels par dossier, sans cascade excessive.",
          },
          {
            label: "Dépendances circulaires silencieuses",
            value:
              "Problem : `undefined` à l'exécution avec des types corrects. Why : A importe B qui importe A. Better : extraire le partagé dans un troisième module.",
          },
          {
            label: "Tout exporter par défaut",
            value:
              "Problem : renommages invisibles, imports incohérents. Why : habitude. Better : exports nommés par défaut, défaut réservé au cas « un module = une chose ».",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-modules",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les habitudes d'une base modulaire saine.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un module = une responsabilité : si le nom du fichier contient « et », il faut le découper.",
          "Exports nommés par défaut : explicites, renommables, vérifiables.",
          "`import type` pour les types : séparer les dépendances de types des dépendances d'exécution.",
          "Barrels pour l'API publique des dossiers, pas pour tout réexporter aveuglément.",
          "Pas de cycles : les dépendances forment un graphe acyclique, vérifié par conception.",
          "Configuration cohérente : `module`/`moduleResolution` alignés avec l'environnement d'exécution.",
          "Zéro import relatif interminable : alias ou subpath imports au-delà de deux niveaux.",
          "Tester l'exécution, pas seulement la compilation : la résolution a deux juges.",
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
          { label: "Modules (Handbook)", value: "https://www.typescriptlang.org/docs/handbook/2/modules.html : la référence complète sur les modules TypeScript." },
          { label: "moduleResolution", value: "La documentation des stratégies de résolution et de leurs différences." },
          { label: "tsconfig Reference", value: "Le détail de `module`, `paths`, `verbatimModuleSyntax`, `isolatedModules`." },
        ],
      },
      {
        kind: "list",
        items: [
          "Guides : la documentation Node.js sur les modules ES et le champ `\"exports\"`.",
          "Community : le dépôt GitHub microsoft/TypeScript pour les cas limites de résolution.",
          "Practice : découper un vrai projet monolithique — l'organisation ne s'apprend que sur du code réel.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les modules maîtrisés, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir `tsconfig` : chaque option de modules (`paths`, `verbatimModuleSyntax`) en détail.",
          "Comprendre `tsc` : le compilateur qui résout et émet les modules, le mode build `tsc -b`.",
          "Activer `strict` : des modules bien typés méritent des vérifications exigeantes.",
          "Migrer un projet avec `migration` : appliquer l'organisation modulaire à une base existante.",
          "Sécuriser avec `outillage` : lint et tests pour garder l'architecture propre.",
          "Revenir à la roadmap : valider la compétence et passer à la suivante du parcours.",
        ],
      },
    ],
  },
];

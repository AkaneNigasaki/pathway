import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'ESLint : de la première vérification à l'écriture
 * de règles personnalisées.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_ESLINT: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est ESLint et quel problème il résout dans un projet JavaScript/TypeScript.",
    blocks: [
      {
        kind: "text",
        text: "ESLint analyse statiquement le code JavaScript et TypeScript : sans l'exécuter, il détecte les erreurs probables (variable inutilisée, comparaison dangereuse), les mauvaises pratiques et les écarts au style décidé en équipe. Chaque problème détecté est un « diagnostic » rattaché à une règle précise.",
      },
      {
        kind: "text",
        text: "Pourquoi ESLint existe : relire du code pour y traquer les erreurs mécaniques est coûteux et faillible. Un linter automatise cette relecture partielle : il attrape les bugs avant l'exécution, met fin aux débats de style (« points-virgules ou pas ») et fait respecter les conventions d'équipe en continu, dans l'éditeur comme dans la CI.",
      },
      {
        kind: "text",
        text: "Où on le rencontre : intégré aux éditeurs (soulignage en direct), aux scripts `npm run lint`, aux pipelines CI qui font échouer le build sur une erreur de lint. C'est un filet de sécurité permanent, pas un outil qu'on lance une fois de temps en temps.",
      },
    ],
  },
  {
    id: "eslint-n-est-pas-un-formateur",
    title: "ESLint n'est pas un formateur",
    level: 1,
    intro:
      "Trois outils complémentaires aux rôles distincts : les confondre est la source de bien des débats.",
    blocks: [
      {
        kind: "diagram",
        title: "Linter, formateur, vérificateur de types",
        lines: [
          "ESLint (linter)",
          "     │",
          "     ├── détecte : bugs probables, mauvaises pratiques",
          "     ├── impose : conventions logiques (pas de var, === ...)",
          "     └── corrige : --fix pour ce qui est sûr",
          "     │",
          "Prettier (formateur)",
          "     │",
          "     ├── réécrit : indentation, guillemets, retours à la ligne",
          "     └── tranche : le style, sans débat",
          "     │",
          "TypeScript (vérificateur)",
          "     │",
          "     └── vérifie : la cohérence des types",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : ESLint dit « cette variable est inutilisée » (logique), Prettier dit « cette ligne doit être indentée de deux espaces » (forme), TypeScript dit « ce n'est pas une chaîne » (types). Les trois cohabitent : ESLint pour le fond, Prettier pour la forme, TypeScript pour les types. Depuis ESLint 9, les règles purement stylistiques ont été retirées au profit des formateurs.",
      },
      {
        kind: "list",
        items: [
          "ESLint = qualité logique du code. Prettier = présentation du code.",
          "Les deux se lancent ensemble : `lint` vérifie, `format` réécrit.",
          "Le paquet `eslint-config-prettier` désactive les règles ESLint qui entreraient en conflit avec Prettier.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer ESLint dans un projet et générer sa première configuration.",
    blocks: [
      {
        kind: "command",
        label: "Installer ESLint en dépendance de développement",
        command: "npm install -D eslint",
        why: "Installe ESLint localement dans le projet (`devDependencies`) : le lint fait partie de l'outillage de développement, jamais du code livré. L'installation locale fige la version dans `package.json` — toute l'équipe linte avec les mêmes règles.",
        verify: "npx eslint --version",
      },
      {
        kind: "command",
        label: "Générer la configuration initiale",
        command: "npx eslint --init",
        why: "L'assistant interactif pose quelques questions (usage du projet, modules, framework, TypeScript ou non) puis génère un `eslint.config.js` adapté et installe les dépendances nécessaires. C'est le point de départ le plus sûr, avant de personnaliser.",
        verify: "ls eslint.config.js",
      },
    ],
  },
  {
    id: "premiere-verification",
    title: "Première vérification",
    level: 2,
    intro:
      "Lancer ESLint sur le projet et comprendre ce qu'il rapporte.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier tout le projet",
        command: "npx eslint .",
        why: "Analyse récursivement le dossier courant selon la configuration trouvée. Chaque problème est affiché avec le fichier, la ligne, la règle concernée et la sévérité : c'est le rapport de base, celui que la CI exécutera.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Exemple de sortie",
        code: `/projet/src/app.js\n  12:7  error  'total' is assigned a value but never used  no-unused-vars\n  28:3  warn   Unexpected console statement                no-console\n\n2 problems (1 error, 1 warning)`,
      },
      {
        kind: "text",
        text: "Lecture d'un diagnostic : position (ligne:colonne), sévérité (`error` fait échouer la commande, `warn` signale seulement), message explicite, et identifiant de la règle (`no-unused-vars`) — cet identifiant est la clé pour configurer ou documenter le problème.",
      },
    ],
  },
  {
    id: "lire-un-diagnostic",
    title: "Lire un diagnostic",
    level: 2,
    intro:
      "Chaque message ESLint suit le même format : savoir le décoder.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre parties d'un diagnostic",
        fields: [
          {
            label: "Position",
            value:
              "Fichier, ligne et colonne : où se situe le problème exactement.",
          },
          {
            label: "Sévérité",
            value:
              "`error` (bloquant : la commande échoue) ou `warn` (signalement non bloquant). Configurable par règle.",
          },
          {
            label: "Message",
            value:
              "L'explication en clair : ce qui ne va pas et souvent pourquoi c'est risqué.",
          },
          {
            label: "Identifiant de règle",
            value:
              "Le nom technique (`no-unused-vars`) : permet de retrouver la documentation de la règle et de l'ajuster.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe : face à un diagnostic incompris, chercher son identifiant dans la documentation (eslint.org/rules/). Chaque règle y est documentée avec des exemples corrects et incorrects — c'est souvent plus formateur que de juste appliquer la correction.",
      },
    ],
  },
  {
    id: "autofix",
    title: "Correction automatique",
    level: 2,
    intro:
      "Laisser ESLint réparer ce qui est sûr : le linter qui agit, pas seulement qui signale.",
    blocks: [
      {
        kind: "command",
        label: "Corriger automatiquement",
        command: "npx eslint . --fix",
        why: "Applique les corrections sûres proposées par les règles (points-virgules manquants selon la config, `var` en `let`, imports triés selon les plugins…). Les problèmes ambigus restent signalés pour correction manuelle : `--fix` ne devine jamais.",
        verify: "npx eslint .",
      },
      {
        kind: "text",
        text: "Après un `--fix`, relancer `npx eslint .` sans option : il ne doit rester que les problèmes nécessitant une décision humaine. Dans l'éditeur, l'extension ESLint propose la correction au survol ou à l'enregistrement — le même mécanisme, en continu.",
      },
    ],
  },
  {
    id: "config-de-base",
    title: "La configuration de base",
    level: 2,
    intro:
      "Le fichier `eslint.config.js` : le format moderne (« flat config »), standard depuis ESLint 9.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "eslint.config.js minimal",
        code: `import js from "@eslint/js";\n\nexport default [\n  js.configs.recommended,\n  {\n    rules: {\n      "no-unused-vars": "warn",\n      "no-console": "off",\n    },\n  },\n];`,
      },
      {
        kind: "text",
        text: "La flat config est un tableau d'objets : chaque objet s'applique aux fichiers qu'il cible et peut étendre des configurations partagées (`js.configs.recommended`), déclarer des règles ou des plugins. Explicite et composable : on voit exactement ce qui s'applique, sans héritage magique de fichiers `.eslintrc` en cascade.",
      },
    ],
  },
  {
    id: "regles-recommended",
    title: "Les règles recommandées",
    level: 2,
    intro:
      "Le socle `recommended` : une base saine sans y passer la journée.",
    blocks: [
      {
        kind: "text",
        text: "Le jeu `eslint:recommended` (via `@eslint/js`) active les règles qui détectent les erreurs probables sans faux positifs gênants : variables inutilisées, code inaccessible, comparaisons dangereuses, boucles suspectes. C'est le point de départ de toute configuration.",
      },
      {
        kind: "table",
        headers: ["Règle", "Ce qu'elle détecte"],
        rows: [
          ["`no-unused-vars`", "Variables déclarées mais jamais utilisées"],
          ["`no-undef`", "Utilisation de variables non déclarées"],
          ["`no-redeclare`", "Redéclaration d'une variable existante"],
          ["`no-unreachable`", "Code placé après un `return` / `throw`"],
          ["`eqeqeq` (à activer)", "Comparaisons `==` à remplacer par `===`"],
        ],
      },
    ],
  },
  {
    id: "activer-desactiver-regles",
    title: "Activer et régler les règles",
    level: 2,
    intro:
      "Ajuster la sévérité règle par règle : l'équipe décide, la config applique.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Régler les règles dans la config",
        code: `export default [\n  {\n    rules: {\n      "no-console": "warn",\n      // error : bloque (CI rouge). warn : signale. off : désactive.\n      "eqeqeq": ["error", "always"],\n      // Certaines règles acceptent des options en second élément.\n      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],\n      // Ici : les arguments préfixés par _ sont tolérés (convention courante).\n    },\n  },\n];`,
      },
      {
        kind: "text",
        text: "Trois sévérités : `off` (0), `warn` (1), `error` (2). Les options affinent le comportement — la documentation de chaque règle liste les siennes. Conseil d'équipe : peu de règles custom au début, durcir progressivement ; une config de 200 règles que personne ne comprend finit désactivée.",
      },
    ],
  },
  {
    id: "commentaires-directives",
    title: "Directives en commentaire",
    level: 2,
    intro:
      "Désactiver une règle localement, quand c'est justifié — et seulement là.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "eslint-disable avec justification",
        code: `// eslint-disable-next-line no-console -- log temporaire de debug\nconsole.log("état:", etat);\n\n/* eslint-disable no-alert -- démo pédagogique, jamais en production */\nalert("Bonjour");\n/* eslint-enable no-alert */`,
      },
      {
        kind: "text",
        text: "La désactivation se fait au plus près du problème : une ligne (`eslint-disable-next-line`) plutôt qu'un fichier entier. Toujours avec un commentaire qui justifie : une désactivation non expliquée sera supprimée à la prochaine revue — ou pire, copiée partout. L'option `--report-unused-disable-directives` signale les désactivations devenues inutiles.",
      },
    ],
  },
  {
    id: "integration-vscode",
    title: "Intégration à l'éditeur",
    level: 2,
    intro:
      "Le lint en direct : voir les problèmes pendant l'écriture, pas après.",
    blocks: [
      {
        kind: "list",
        items: [
          "Extension ESLint (Microsoft) : soulignage en direct, diagnostic au survol, correction rapide.",
          "Correction à l'enregistrement : `editor.codeActionsOnSave` avec `source.fixAll.eslint` applique les fixes sûrs à chaque save.",
          "L'éditeur lit la même `eslint.config.js` que la CI : ce qu'on voit en local est ce que la CI vérifiera.",
          "Si l'extension ne voit pas la config : vérifier qu'elle pointe sur le bon workspace et que le fichier de config est valide.",
        ],
      },
    ],
  },
  {
    id: "scripts-npm",
    title: "Scripts npm",
    level: 2,
    intro:
      "Rendre le lint invocable en une commande mémorisable.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json",
        code: `{\n  "scripts": {\n    "lint": "eslint .",\n    "lint:fix": "eslint . --fix"\n  }\n}`,
      },
      {
        kind: "text",
        text: "`npm run lint` devient la commande canonique, documentée dans le README et appelée par la CI. Le script fige l'invocation exacte (options, dossiers) : plus personne n'a à retenir la ligne de commande complète.",
      },
    ],
  },
  {
    id: "ignorer",
    title: "Ignorer des fichiers",
    level: 2,
    intro:
      "Ne pas linter ce qui n'est pas du code source : build, dépendances, généré.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Bloc ignores global dans la flat config",
        code: `export default [\n  {\n    ignores: ["dist/**", "build/**", "coverage/**", "*.min.js"],\n  },\n  // ... le reste de la configuration\n];`,
      },
      {
        kind: "text",
        text: "En flat config, l'exclusion se déclare avec un objet `{ ignores: [...] }` — de préférence global, en tête du tableau. Linter `dist/` ou `node_modules/` ralentit et produit du bruit : la règle est simple, on ne linte que ce qu'on écrit.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "anatomie-regle",
    title: "Anatomie d'une règle",
    level: 3,
    intro:
      "Ce qu'est vraiment une règle : un visiteur d'arbre syntaxique.",
    blocks: [
      {
        kind: "text",
        text: "ESLint parse chaque fichier en arbre syntaxique abstrait (AST), puis chaque règle « visite » les nœuds qui l'intéressent (déclarations de variables, appels de fonctions…) et rapporte les problèmes trouvés. Comprendre ce modèle, c'est comprendre pourquoi les règles sont précises et rapides : elles ne font pas du texte, elles raisonnent sur la structure.",
      },
      {
        kind: "diagram",
        title: "Le parcours d'une règle",
        lines: [
          "[Fichier source]",
          "        │",
          "        ▼",
          "[Parser → AST]",
          "        │",
          "        ▼",
          "[Règles : visiteurs de nœuds]",
          "        │",
          "        ▼",
          "[Diagnostics : position + message + fix]",
          "        │",
          "        ▼",
          "[Rapport (error/warn) → code de sortie]",
        ],
      },
    ],
  },
  {
    id: "severities",
    title: "Sévérités et stratégie d'équipe",
    level: 3,
    intro:
      "`off`, `warn`, `error` : trois niveaux, une politique à définir.",
    blocks: [
      {
        kind: "table",
        headers: ["Sévérité", "Effet", "Usage recommandé"],
        rows: [
          ["`off` / 0", "Règle désactivée", "Règles non pertinentes pour le projet"],
          ["`warn` / 1", "Signale sans faire échouer", "Transition : durcir progressivement, legacy à nettoyer"],
          ["`error` / 2", "Fait échouer `eslint` (et la CI)", "Règles non négociables : bugs probables, conventions d'équipe"],
        ],
      },
      {
        kind: "text",
        text: "Le motif courant : `warn` à l'adoption d'une nouvelle règle (l'équipe s'habitue), `error` une fois le code nettoyé. L'option `--max-warnings 0` en CI transforme les warnings en échec : zéro tolérance une fois la dette résorbée.",
      },
    ],
  },
  {
    id: "plugins",
    title: "Plugins",
    level: 3,
    intro:
      "Étendre ESLint à un écosystème : TypeScript, React, imports…",
    blocks: [
      {
        kind: "text",
        text: "Un plugin apporte des règles spécialisées pour un écosystème. Les deux incontournables du développement moderne : `typescript-eslint` (le lint adapté à TypeScript — les règles de base ne comprennent pas les types) et `eslint-plugin-react` / `eslint-plugin-react-hooks` (règles React et règles des Hooks).",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Brancher typescript-eslint",
        code: `import tseslint from "typescript-eslint";\n\nexport default tseslint.config(\n  ...tseslint.configs.recommended,\n);`,
      },
      {
        kind: "text",
        text: "Le helper `tseslint.config()` compose les configurations recommandées avec les vôtres. Principe général : un plugin = un préfixe de règles (`@typescript-eslint/…`, `react/…`, `react-hooks/…`) — l'identifiant du diagnostic indique toujours son origine.",
      },
    ],
  },
  {
    id: "flat-config",
    title: "Flat config en détail",
    level: 3,
    intro:
      "Le format moderne décortiqué : tableaux, objets universels et ciblage.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Composer plusieurs blocs",
        code: `export default [\n  { ignores: ["dist/**"] },\n  js.configs.recommended,\n  {\n    files: ["src/**/*.js"],\n    rules: { "no-console": "warn" },\n  },\n  {\n    files: ["tests/**/*.js"],\n    rules: { "no-console": "off" },\n  },\n];`,
      },
      {
        kind: "text",
        text: "Chaque objet du tableau peut cibler des fichiers (`files`) : les blocs se combinent dans l'ordre, les derniers prévalant en cas de conflit. Fini les `.eslintrc` en cascade par dossier et l'héritage implicite : tout est visible dans un seul fichier, dans l'ordre de lecture.",
      },
    ],
  },
  {
    id: "language-options",
    title: "Language options",
    level: 3,
    intro:
      "Dire à ESLint quel JavaScript on écrit : version, modules, globales.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Déclarer l'environnement du code",
        code: `export default [\n  {\n    languageOptions: {\n      ecmaVersion: 2022, // syntaxe autorisée\n      sourceType: "module", // import/export plutôt que CommonJS\n      globals: {\n        console: "readonly",\n        process: "readonly",\n      },\n    },\n  },\n];`,
      },
      {
        kind: "text",
        text: "`ecmaVersion` fixe la syntaxe acceptée (le parsing échoue sinon), `sourceType` distingue modules et scripts, `globals` déclare les variables d'environnement (`console`, `process`, `window`…) pour éviter les faux positifs de `no-undef`. Le paquet `globals` fournit les jeux prédéfinis (`globals.node`, `globals.browser`).",
      },
    ],
  },
  {
    id: "regles-typescript",
    title: "Règles TypeScript",
    level: 3,
    intro:
      "Ce que `typescript-eslint` ajoute au-delà des règles JavaScript.",
    blocks: [
      {
        kind: "table",
        headers: ["Règle", "Ce qu'elle détecte"],
        rows: [
          ["`@typescript-eslint/no-explicit-any`", "`any` explicites : le typage qui abdique"],
          ["`@typescript-eslint/no-unused-vars`", "Version TS de la règle de base (comprend les types)"],
          ["`@typescript-eslint/no-non-null-assertion`", "Assertions `!` qui court-circuitent la sécurité null"],
          ["`@typescript-eslint/consistent-type-imports`", "Imports de types avec `import type`"],
          ["`@typescript-eslint/no-floating-promises`", "Promesses non attendues ni gérées (requiert le type-checking)"],
        ],
      },
      {
        kind: "text",
        text: "Certaines règles utilisent les informations de types (`no-floating-promises`) : elles exigent la configuration du « typed linting » (projet TypeScript déclaré), plus lente mais bien plus puissante. Les règles de base d'ESLint ont leurs équivalents TS à préférer systématiquement.",
      },
    ],
  },
  {
    id: "regles-react",
    title: "Règles React et Hooks",
    level: 3,
    intro:
      "Les règles qui évitent les bugs React les plus coûteux.",
    blocks: [
      {
        kind: "table",
        headers: ["Règle", "Ce qu'elle détecte"],
        rows: [
          ["`react-hooks/rules-of-hooks`", "Hooks appelés conditionnellement ou hors composant"],
          ["`react-hooks/exhaustive-deps`", "Dépendances manquantes ou superflues des effets"],
          ["`react/no-array-index-key`", "`key={index}` qui casse la réconciliation"],
          ["`react/jsx-no-target-blank`", "Liens `target=_blank` sans `rel` sécurisé"],
        ],
      },
      {
        kind: "text",
        text: "Les règles des Hooks sont particulières : elles encodent les règles d'or de React (ordre d'appel stable, dépendances exhaustives) que le compilateur ne vérifie pas. `exhaustive-deps` en `warn` puis `error` est le chemin classique — ses avertissements signalent presque toujours un vrai bug d'effet.",
      },
    ],
  },
  {
    id: "ecrire-une-regle",
    title: "Écrire une règle personnalisée",
    level: 3,
    intro:
      "Quand les règles existantes ne couvrent pas une convention d'équipe.",
    blocks: [
      {
        kind: "text",
        text: "Une règle est un objet avec une fonction `create(context)` qui retourne des visiteurs de nœuds AST. Cas typique : interdire un import interne, imposer un préfixe de nom, bannir une API dépréciée maison. On commence toujours par vérifier qu'aucune règle existante (ou option) ne couvre le besoin.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Squelette d'une règle",
        code: `export default {\n  meta: {\n    type: "suggestion",\n    docs: { description: "Interdit l'import de moment" },\n    fixable: "code",\n  },\n  create(context) {\n    return {\n      ImportDeclaration(node) {\n        if (node.source.value === "moment") {\n          context.report({\n            node,\n            message: "Utiliser date-fns plutôt que moment.",\n            fix(fixer) {\n              return fixer.replaceText(node.source, "'date-fns'");\n            },\n          });\n        }\n      },\n    };\n  },\n};`,
      },
      {
        kind: "text",
        text: "Le visiteur `ImportDeclaration` est appelé pour chaque import ; `context.report` émet le diagnostic, avec un `fix` optionnel pour la correction automatique. L'explorateur AST (astexplorer.net) permet de visualiser les nœuds — mais la règle elle-même reste du code ordinaire testable.",
      },
    ],
  },
  {
    id: "tester-regles",
    title: "Tester ses règles",
    level: 3,
    intro:
      "Une règle non testée est une règle qui se retournera contre vous.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "RuleTester : cas valides et invalides",
        code: `import { RuleTester } from "eslint";\nimport regle from "./regles/pas-de-moment.js";\n\nconst tester = new RuleTester();\n\ntester.run("pas-de-moment", regle, {\n  valid: ["import { format } from 'date-fns'"],\n  invalid: [\n    {\n      code: "import moment from 'moment'",\n      errors: [{ message: /date-fns/ }],\n      output: "import moment from 'date-fns'",\n    },\n  ],\n});`,
      },
      {
        kind: "text",
        text: "`RuleTester` (fourni par ESLint) vérifie que les cas valides ne rapportent rien et que les cas invalides rapportent les erreurs attendues — y compris la sortie du `fix` (`output`). Les règles maison vivent dans un plugin interne au projet ou au monorepo, versionné comme le reste.",
      },
    ],
  },
  {
    id: "migration-eslintrc",
    title: "Migrer depuis .eslintrc",
    level: 3,
    intro:
      "L'ancien format en cascade vers la flat config : la méthode sans casse.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Faire l'inventaire",
            detail:
              "Lister les `.eslintrc*` du projet et leurs `extends` : chaque extension deviendra un élément du tableau flat config.",
          },
          {
            title: "Utiliser l'outil de migration",
            detail:
              "Le paquet `@eslint/migrate-config` convertit automatiquement la plupart des configurations vers `eslint.config.js` — point de départ à relire, pas résultat final.",
          },
          {
            title: "Traiter les cas spéciaux",
            detail:
              "Les `overrides` deviennent des blocs `files:`, les `.eslintignore` deviennent des blocs `ignores:`, les `env` deviennent `languageOptions.globals`.",
          },
          {
            title: "Valider à parité",
            detail:
              "Comparer les rapports avant/après sur le même code (`eslint .` des deux côtés) : même nombre de diagnostics, puis basculer.",
          },
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    level: 3,
    intro:
      "Quand le lint devient lent : les leviers connus.",
    blocks: [
      {
        kind: "command",
        label: "Activer le cache",
        command: "npx eslint . --cache",
        why: "Ne re-vérifie que les fichiers modifiés depuis la dernière exécution : le lint passe de plusieurs secondes à quasi instantané au quotidien. Le fichier de cache (`.eslintcache`) est à ignorer dans Git.",
      },
      {
        kind: "list",
        items: [
          "Le typed linting TypeScript est le principal coût : le réserver aux règles qui en ont besoin.",
          "Ignorer les dossiers générés (`dist`, `coverage`) : moins de fichiers, moins de temps.",
          "Paralléliser en CI : linter par lots ou utiliser les matrices.",
          "`TIMING=1 npx eslint .` affiche le temps par règle : identifier les règles lentes avant d'accuser l'outil.",
        ],
      },
    ],
  },
  {
    id: "ci",
    title: "ESLint en CI",
    level: 3,
    intro:
      "Faire du lint une porte, pas une suggestion.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Étape lint dans un workflow",
        code: `jobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm run lint`,
      },
      {
        kind: "text",
        text: "Le job `lint` échoue si ESLint rapporte une erreur : la PR ne peut pas fusionner (avec la protection de branche). Exécuter le lint dans un job séparé du build et des tests : un échec de lint se lit immédiatement, sans attendre la suite du pipeline.",
      },
    ],
  },
  {
    id: "monorepo",
    title: "ESLint en monorepo",
    level: 3,
    intro:
      "Plusieurs paquets, une seule config : organiser le lint à l'échelle.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une `eslint.config.js` à la racine avec des blocs `files:` par paquet : règles communes + spécificités (frontend, backend, scripts).",
          "Les règles communes en premier, les surcharges par paquet ensuite : l'ordre du tableau fait la priorité.",
          "Un plugin interne pour les règles maison partagées entre paquets.",
          "`--cache` devient crucial : des milliers de fichiers à chaque exécution sinon.",
        ],
      },
    ],
  },
  {
    id: "prettier-cohabitation",
    title: "Cohabitation avec Prettier",
    level: 3,
    intro:
      "La recette officielle pour que les deux outils ne se marchent pas dessus.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Installer le pont",
            detail:
              "`npm install -D prettier eslint-config-prettier` : Prettier formate, le paquet de config désactive les règles ESLint redondantes avec lui.",
          },
          {
            title: "Placer le pont en dernier",
            detail:
              "Dans `eslint.config.js`, `eslint-config-prettier` doit être le dernier élément du tableau : il écrase les règles stylistiques précédentes.",
          },
          {
            title: "Séparer les responsabilités",
            detail:
              "`npm run lint` pour ESLint (logique), `npm run format` pour Prettier (forme). En CI, les deux sont vérifiés ; en local, les deux s'exécutent à l'enregistrement.",
          },
        ],
      },
    ],
  },
  {
    id: "regles-imports",
    title: "Règles sur les imports",
    level: 3,
    intro:
      "Des imports propres : le plugin `eslint-plugin-import` et ses règles les plus utiles.",
    blocks: [
      {
        kind: "table",
        headers: ["Règle", "Ce qu'elle détecte"],
        rows: [
          ["`import/no-unresolved`", "Imports vers des fichiers ou paquets introuvables"],
          ["`import/order`", "Ordre des imports (externes, internes, relatifs) non respecté"],
          ["`import/no-duplicates`", "Plusieurs imports depuis le même module"],
          ["`import/no-cycle`", "Dépendances circulaires entre modules"],
        ],
      },
      {
        kind: "text",
        text: "`import/order` avec tri automatique (`--fix`) est le plus rentable : les imports se rangent seuls en groupes lisibles. `no-cycle` mérite un `error` : les cycles de dépendances sont une source de bugs subtils au chargement des modules.",
      },
    ],
  },
  {
    id: "accessibilite",
    title: "Accessibilité JSX",
    level: 3,
    intro:
      "Le lint comme garde-fou d'accessibilité : `eslint-plugin-jsx-a11y`.",
    blocks: [
      {
        kind: "text",
        text: "Le plugin `jsx-a11y` détecte les problèmes d'accessibilité statiques : images sans `alt`, éléments interactifs non clavier-accessibles, rôles ARIA invalides. C'est le premier filet — il ne remplace ni les tests manuels au clavier ni les lecteurs d'écran, mais il élimine les erreurs mécaniques.",
      },
      {
        kind: "list",
        items: [
          "La config `recommended` du plugin couvre l'essentiel sans bruit.",
          "Chaque règle pointe vers la documentation WCAG correspondante : formateur en passant.",
          "À combiner avec des tests d'accessibilité automatisés pour la couverture dynamique.",
        ],
      },
    ],
  },
  {
    id: "plugin-securite",
    title: "Règles de sécurité",
    level: 3,
    intro:
      "Détecter les motifs dangereux : `eslint-plugin-security`.",
    blocks: [
      {
        kind: "text",
        text: "Le plugin `security` signale les motifs à risque : `eval`, expressions régulières vulnérables au ReDoS, génération de nombres pseudo-aléatoires pour de la sécurité, détection d'objets non filtrés. Ce sont des alertes, pas des verdicts : chaque signalement se juge en contexte.",
      },
      {
        kind: "list",
        items: [
          "Utile en revue : attire l'œil sur les zones sensibles avant lecture humaine.",
          "Ne remplace pas un audit de sécurité ni le code scanning de la forge.",
          "Calibrer la sévérité : trop de faux positifs et l'équipe ignore le plugin entier.",
        ],
      },
    ],
  },
  {
    id: "stylistic",
    title: "Règles stylistiques officielles",
    level: 3,
    intro:
      "Quand on veut du style sans Prettier : `@stylistic/eslint-plugin`.",
    blocks: [
      {
        kind: "text",
        text: "ESLint 9 a retiré ses règles de formatage du cœur ; le projet `@stylistic` les maintient comme plugin officiel (`@stylistic/semi`, `@stylistic/quotes`, `@stylistic/indent`…). C'est l'option pour les équipes qui veulent un style vérifié par ESLint sans adopter Prettier.",
      },
      {
        kind: "list",
        items: [
          "Alternative à Prettier, pas complément : choisir l'un ou l'autre, jamais les deux en conflit.",
          "Les règles stylistiques sont les plus débattues : les figer tôt évite les guerres de formatage.",
          "Avec Prettier adopté, `eslint-config-prettier` désactive tout ce plugin d'un coup.",
        ],
      },
    ],
  },
  {
    id: "compat-legacy",
    title: "Compatibilité avec l'ancien écosystème",
    level: 3,
    intro:
      "Utiliser d'anciens plugins et configs en flat config : `FlatCompat`.",
    blocks: [
      {
        kind: "text",
        text: "Le paquet `@eslint/eslintrc` fournit `FlatCompat`, un adaptateur qui permet d'utiliser des configurations et plugins au format eslintrc dans une flat config. C'est le pont pour les plugins pas encore migrés — une solution de transition, pas un état permanent.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Adapter une ancienne config",
        code: `import { FlatCompat } from "@eslint/eslintrc";\n\nconst compat = new FlatCompat();\n\nexport default [\n  ...compat.extends("plugin:ancien/recommended"),\n];`,
      },
    ],
  },
  {
    id: "debug-config",
    title: "Déboguer la configuration",
    level: 3,
    intro:
      "Savoir exactement quelles règles s'appliquent à un fichier.",
    blocks: [
      {
        kind: "command",
        label: "Afficher la config calculée pour un fichier",
        command: "npx eslint --print-config src/app.js",
        why: "Affiche la configuration effective (règles, plugins, languageOptions) telle qu'ESLint la calcule pour ce fichier précis, après composition de tous les blocs. Indispensable quand une règle ne se comporte pas comme prévu : on vérifie ce qui s'applique vraiment.",
      },
      {
        kind: "list",
        items: [
          "L'inspecteur de config officiel (interface web) visualise la même chose graphiquement.",
          "Vérifier aussi les fichiers ciblés : un bloc `files:` mal écrit peut ne s'appliquer à rien.",
          "`--debug` affiche le détail du chargement : utile quand un plugin ne se charge pas.",
        ],
      },
    ],
  },
  {
    id: "config-partagee",
    title: "Publier une config partageable",
    level: 3,
    intro:
      "Mutualiser la config d'équipe dans un paquet npm.",
    blocks: [
      {
        kind: "text",
        text: "Une configuration partageable est un paquet npm qui exporte un tableau flat config : les projets l'installent et l'étendent. C'est la façon propre de diffuser les conventions d'une organisation sur des dizaines de dépôts.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Côté paquet, côté projet",
        code: `// eslint-config-maison/index.js\nimport js from "@eslint/js";\nexport default [js.configs.recommended, { rules: { /* … */ } }];\n\n// eslint.config.js d'un projet\nimport maison from "eslint-config-maison";\nexport default [...maison, { rules: { /* surcharges */ } }];`,
      },
      {
        kind: "text",
        text: "Versionner la config comme une dépendance : les montées de version se font explicitement, projet par projet, avec la CI pour valider. Documenter chaque règle non évidente — une config partagée sans documentation devient une boîte noire.",
      },
    ],
  },
  {
    id: "lint-staged",
    title: "Linter avant de committer",
    level: 3,
    intro:
      "Le hook pre-commit : ne linter que les fichiers modifiés.",
    blocks: [
      {
        kind: "text",
        text: "`lint-staged` (outil réel, à installer en dev) exécute ESLint — et Prettier — uniquement sur les fichiers stagés, via un hook pre-commit (souvent posé par `husky`). Le commit est bloqué si le lint échoue : les erreurs n'atteignent jamais le dépôt distant.",
      },
      {
        kind: "code",
        language: "json",
        title: "package.json",
        code: `{\n  "lint-staged": {\n    "*.{js,ts}": ["eslint --fix", "prettier --write"]\n  }\n}`,
      },
      {
        kind: "text",
        text: "Complément de la CI, pas substitut : le hook protège le poste local, la CI protège `main` contre les commits qui contournent les hooks. Rapide par construction — seuls les fichiers du commit sont vérifiés.",
      },
    ],
  },
  {
    id: "env-specifiques",
    title: "Environnements spécifiques",
    level: 3,
    intro:
      "Node, navigateur, tests : des globales différentes par zone du projet.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Blocs par environnement",
        code: `import globals from "globals";\n\nexport default [\n  {\n    files: ["src/**/*.js"],\n    languageOptions: { globals: globals.browser },\n  },\n  {\n    files: ["scripts/**/*.js", "tests/**/*.js"],\n    languageOptions: { globals: globals.node },\n  },\n];`,
      },
      {
        kind: "text",
        text: "Le paquet `globals` fournit les jeux de variables globales par environnement (`browser`, `node`, `jest`…). Des blocs `files:` distincts évitent les faux positifs (`process` inconnu côté front, `window` inconnu côté back) sans désactiver `no-undef` globalement.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques de la configuration et de l'usage.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Remède"],
        rows: [
          ["`Couldn't find config`", "Pas de `eslint.config.js` trouvé", "Vérifier le nom et l'emplacement du fichier"],
          ["Règles TS non reconnues", "Plugin `typescript-eslint` non branché", "Ajouter `tseslint.config(...)` à la config"],
          ["Conflits avec Prettier", "`eslint-config-prettier` absent ou mal placé", "L'installer et le mettre en dernier"],
          ["Faux positifs `no-undef`", "Globales non déclarées", "`languageOptions.globals` ou paquet `globals`"],
          ["Lint très lent", "Typed linting partout ou dossiers générés inclus", "`--cache`, ignores, limiter le typed linting"],
          ["`--fix` casse le code", "Règle avec fix agressif sur du code limite", "Vérifier le diff après chaque `--fix` massif"],
          ["Désactivations qui s'accumulent", "`eslint-disable` sans justification", "Justifier chaque désactivation, nettoyer régulièrement"],
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets progressifs pour ancrer les réflexes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Linter un projet existant",
            detail:
              "Prendre un petit projet sans lint, installer ESLint, générer la config, corriger tous les diagnostics (d'abord `--fix`, puis à la main). Objectif : lire des diagnostics réels et décider des sévérités.",
          },
          {
            title: "Projet 2 — Config d'équipe",
            detail:
              "Écrire une `eslint.config.js` complète pour un stack précis (React + TypeScript) : recommended, plugins, règles d'équipe documentées, `lint` et `lint:fix` dans les scripts, job CI dédié. Objectif : la config comme document d'équipe.",
          },
          {
            title: "Projet 3 — Règle maison",
            detail:
              "Identifier une convention d'équipe non couverte (ex. interdire une API dépréciée interne), écrire la règle avec son fix, la tester avec RuleTester, l'intégrer via un plugin local. Objectif : le cycle complet de la règle personnalisée.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "ESLint Docs",
            value:
              "eslint.org/docs : guide d'utilisation, référence de la configuration et documentation de chaque règle.",
          },
          {
            label: "Règles",
            value:
              "eslint.org/docs/rules : la liste complète avec exemples corrects et incorrects — la lecture la plus formatrice.",
          },
          {
            label: "typescript-eslint",
            value:
              "typescript-eslint.io : le guide du lint TypeScript, du setup au typed linting.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : l'explorateur AST (astexplorer.net) pour comprendre ce que « voit » une règle.",
          "Communauté : les configurations partagées (Airbnb, Standard) comme sources d'inspiration — à adapter, pas à subir.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "ESLint maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Couvrir la forme : `prettier` pour le formatage automatique.",
          "Couvrir les types : `typescript` pour la vérification statique des types.",
          "Tester le comportement : `vitest` pour les tests unitaires.",
          "Industrialiser : `ci-cd` pour intégrer le lint dans les pipelines.",
          "Revenir à la roadmap : valider ESLint et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de « Lint, format & tests » : ESLint, Prettier,
 * Vitest et l'outillage qualité d'un projet TypeScript.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_OUTILLAGE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "L'outillage complète les types : détecter les mauvaises pratiques, uniformiser le style, prouver que le code fonctionne.",
    blocks: [
      {
        kind: "text",
        text: "Les types vérifient la cohérence, pas la qualité ni le comportement. Trois outils complètent le tableau : ESLint signale les problèmes de qualité et les bugs probables (variables inutilisées, `await` oublié), Prettier uniformise la présentation du code, et un testeur comme Vitest prouve que le code fait ce qu'il doit faire. Ensemble, ils forment le filet de sécurité d'un projet professionnel.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est indispensable : sans lint ni formatage, même un code bien typé devient illisible à plusieurs — chacun son style, les revues polluées par du bruit. Sans tests, chaque modification est un pari. L'outillage transforme la qualité en processus automatique plutôt qu'en effort de volonté.",
      },
    ],
  },
  {
    id: "trois-roles",
    title: "Trois outils, trois rôles",
    level: 1,
    intro:
      "Ne jamais confondre leurs métiers : chacun répond à une question différente.",
    blocks: [
      {
        kind: "diagram",
        title: "Qui fait quoi",
        lines: [
          "TypeScript (tsc)  → « Les types sont-ils cohérents ? »",
          "ESLint           → « Le code est-il sain ? » (bugs probables, pratiques risquées)",
          "Prettier         → « Le code est-il bien présenté ? » (style uniforme)",
          "Vitest / Jest    → « Le code fait-il ce qu'il doit ? » (comportement)",
        ],
      },
      {
        kind: "text",
        text: "ESLint n'est pas un compilateur : il n'émet pas de JavaScript et ne remplace pas `tsc`. Prettier ne détecte aucun bug : il ne fait que reformater. Les tests ne vérifient pas les types : ils exécutent le code. Confondre ces rôles — par exemple attendre du formateur qu'il corrige la logique — est une source classique de déception.",
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
      "Ce qu'il faut avoir avant d'installer l'outillage.",
    blocks: [
      {
        kind: "fields",
        title: "Avant l'outillage",
        fields: [
          {
            label: "Projet TypeScript fonctionnel",
            value:
              "Un projet qui compile (`tsc --noEmit` vert) : l'outillage se greffe sur une base saine, pas sur un chantier.",
          },
          {
            label: "tsconfig.json propre",
            value:
              "Les outils (notamment les règles ESLint sensibles aux types) lisent la configuration du compilateur.",
          },
          {
            label: "npm et scripts",
            value:
              "Savoir ajouter des scripts dans `package.json` : c'est ainsi qu'on expose `lint`, `format` et `test` à l'équipe.",
          },
          {
            label: "Éditeur configuré",
            value:
              "VS Code avec le support TypeScript : les retours des outils arrivent en direct dans l'éditeur.",
          },
        ],
      },
    ],
  },
  {
    id: "installer-eslint",
    title: "Installer ESLint",
    level: 2,
    intro:
      "Le linter et son pont vers TypeScript : trois paquets aux rôles distincts.",
    blocks: [
      {
        kind: "command",
        label: "Installer ESLint avec le support TypeScript",
        command: "npm install -D eslint @eslint/js typescript-eslint",
        why: "`eslint` est le linter, `@eslint/js` fournit les règles recommandées pour JavaScript, et `typescript-eslint` est le parser et le plugin officiels qui permettent à ESLint de comprendre la syntaxe TypeScript. Sans ce dernier, ESLint ne sait pas lire un fichier `.ts`.",
        verify: "npx eslint --version",
      },
      {
        kind: "text",
        text: "Depuis ESLint 9, la configuration utilise le format « flat config » (`eslint.config.js`) : un fichier JavaScript qui exporte un tableau de configurations. L'ancien format `.eslintrc` est dépassé — tout nouveau projet utilise le flat config.",
      },
    ],
  },
  {
    id: "config-eslint",
    title: "Configurer ESLint",
    level: 2,
    intro:
      "Un fichier `eslint.config.mjs` minimal et compris, pas copié aveuglément.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "eslint.config.mjs",
        code: "// @ts-check\nimport js from \"@eslint/js\";\nimport { defineConfig } from \"eslint/config\";\nimport tseslint from \"typescript-eslint\";\n\nexport default defineConfig(\n  js.configs.recommended,\n  tseslint.configs.recommended,\n);",
      },
      {
        kind: "list",
        items: [
          "`js.configs.recommended` : les règles recommandées d'ESLint pour JavaScript.",
          "`tseslint.configs.recommended` : les règles recommandées pour TypeScript (dont `no-explicit-any`).",
          "`defineConfig` (depuis `eslint/config`) apporte l'autocomplétion et la vérification de la configuration.",
          "Le `// @ts-check` en tête fait vérifier le fichier de config lui-même par TypeScript.",
        ],
      },
    ],
  },
  {
    id: "verifier-eslint",
    title: "Lancer ESLint",
    level: 2,
    intro:
      "Analyser le projet et corriger : les deux commandes essentielles.",
    blocks: [
      {
        kind: "command",
        label: "Analyser tout le projet",
        command: "npx eslint .",
        why: "Parcourt le projet et signale chaque règle violée : erreurs de qualité, bugs probables, mauvaises pratiques. C'est la commande de référence — celle que la CI exécutera.",
        verify: "npx eslint . --max-warnings 0",
      },
      {
        kind: "command",
        label: "Corriger automatiquement ce qui peut l'être",
        command: "npx eslint . --fix",
        why: "Applique les corrections automatiques sûres (imports inutilisés supprimés, syntaxe normalisée…). Ce qui reste après `--fix` demande une décision humaine : c'est le vrai travail de qualité.",
        verify: "npx eslint .",
      },
      {
        kind: "text",
        text: "`--max-warnings 0` transforme les avertissements en échec : en CI, un warning non traité bloque comme une erreur. C'est ce qui empêche l'accumulation silencieuse de dette.",
      },
    ],
  },
  {
    id: "installer-prettier",
    title: "Installer Prettier",
    level: 2,
    intro:
      "Le formateur : un seul paquet, zéro décision de style à prendre.",
    blocks: [
      {
        kind: "command",
        label: "Installer Prettier",
        command: "npm install -D prettier",
        why: "Prettier est un formateur d'opinion : il reformate tout le code selon ses propres règles, sans configuration complexe. L'installer en dépendance de développement garantit que toute l'équipe utilise la même version.",
        verify: "npx prettier --version",
      },
      {
        kind: "text",
        text: "Philosophie de Prettier : le projet ne choisit plus son style — la décision est prise une fois pour toutes par l'outil. Fini les débats d'indentation, de guillemets ou de points-virgules en revue de code.",
      },
    ],
  },
  {
    id: "config-prettier",
    title: "Configurer Prettier",
    level: 2,
    intro:
      "Les quelques options qu'on règle vraiment, et le formatage à la sauvegarde.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: ".prettierrc",
        code: "{\n  \"singleQuote\": true,\n  \"semi\": true,\n  \"trailingComma\": \"all\"\n}",
      },
      {
        kind: "list",
        items: [
          "Peu d'options existent volontairement : Prettier refuse les micro-réglages pour garder un style uniforme entre projets.",
          "Le formatage à la sauvegarde dans l'éditeur (`editor.formatOnSave`) rend le code toujours propre sans y penser.",
          "Règle d'équipe : le formateur ne se discute pas — on l'adopte tel quel, avec ses deux ou trois options de base.",
        ],
      },
    ],
  },
  {
    id: "verifier-prettier",
    title: "Vérifier le formatage",
    level: 2,
    intro:
      "Contrôler sans modifier : la commande de CI pour le style.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier le formatage sans modifier",
        command: "npx prettier --check .",
        why: "Vérifie que tous les fichiers respectent le formatage, sans les toucher. En CI, cette commande échoue si un fichier n'est pas formaté — chacun formate avant de pousser, avec `npx prettier --write .`.",
        verify: "npx prettier --write .",
      },
    ],
  },
  {
    id: "installer-vitest",
    title: "Installer Vitest",
    level: 2,
    intro:
      "Le testeur unitaire moderne : installation minimale, compatible avec l'API de Jest.",
    blocks: [
      {
        kind: "command",
        label: "Installer Vitest",
        command: "npm install -D vitest",
        why: "Vitest est le testeur unitaire de référence pour les projets modernes : il exécute du TypeScript directement (via esbuild), démarre instantanément et propose un mode watch pendant le développement. Son API est compatible avec Jest, ce qui facilite la migration.",
        verify: "npx vitest --version",
      },
    ],
  },
  {
    id: "premier-test",
    title: "Premier test",
    level: 2,
    intro:
      "Écrire un test, le lancer, le voir passer : la boucle complète.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "math.test.ts",
        code: "import { describe, expect, it } from \"vitest\";\nimport { add } from \"./math.js\";\n\ndescribe(\"add\", () => {\n  it(\"additionne deux nombres\", () => {\n    expect(add(2, 3)).toBe(5);\n  });\n\n  it(\"gère les nombres négatifs\", () => {\n    expect(add(-1, 1)).toBe(0);\n  });\n});",
      },
      {
        kind: "command",
        label: "Lancer les tests une fois",
        command: "npx vitest run",
        why: "`vitest run` exécute les tests une fois puis s'arrête — c'est le mode pour la CI et les scripts. Sans `run`, Vitest reste en mode watch : il relance les tests à chaque sauvegarde pendant le développement.",
        verify: "npx vitest run",
      },
      {
        kind: "text",
        text: "Convention : les fichiers de test se nomment `*.test.ts` à côté du code testé. `describe` regroupe, `it` décrit un cas, `expect(...).toBe(...)` affirme. Un test est une spécification exécutable : il dit ce que le code doit faire, et le prouve.",
      },
    ],
  },
  {
    id: "scripts-npm",
    title: "Scripts npm unifiés",
    level: 2,
    intro:
      "Exposer l'outillage à toute l'équipe : quatre scripts, quatre portes.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json — scripts qualité",
        code: "{\n  \"scripts\": {\n    \"typecheck\": \"tsc --noEmit\",\n    \"lint\": \"eslint .\",\n    \"lint:fix\": \"eslint . --fix\",\n    \"format\": \"prettier --write .\",\n    \"format:check\": \"prettier --check .\",\n    \"test\": \"vitest run\",\n    \"test:watch\": \"vitest\",\n    \"check\": \"npm run typecheck && npm run lint && npm run format:check && npm run test\"\n  }\n}",
      },
      {
        kind: "text",
        text: "`npm run check` enchaîne tout : c'est la commande que chaque développeur lance avant de pousser, et que la CI rejoue. Un seul point d'entrée pour la qualité — personne n'a à retenir quatre commandes.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "À quoi ressemble une journée avec l'outillage : les réflexes.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de développement outillée",
        lines: [
          "Écrire du code",
          "  (erreurs tsc + ESLint en direct dans l'éditeur,",
          "   formatage à la sauvegarde)",
          "     ↓",
          "vitest (watch) — les tests tournent à chaque sauvegarde",
          "     ↓",
          "npm run check — avant de commiter",
          "     ↓",
          "git commit / push",
          "     ↓",
          "CI : typecheck → lint → format:check → test",
        ],
      },
      {
        kind: "text",
        text: "L'éditeur donne le feedback immédiat, `npm run check` le feedback complet avant commit, la CI le feedback officiel. Trois niveaux de filet, du plus rapide au plus fiable.",
      },
    ],
  },
  {
    id: "editeur-outillage",
    title: "L'éditeur et l'outillage",
    level: 2,
    intro:
      "Les extensions VS Code qui branchent les outils dans l'éditeur.",
    blocks: [
      {
        kind: "fields",
        title: "Extensions VS Code",
        fields: [
          {
            label: "ESLint (`dbaeumer.vscode-eslint`)",
            value:
              "Affiche les problèmes en direct et corrige à la sauvegarde (`source.fixAll.eslint`). C'est l'extension qui rend le lint visible pendant la frappe.",
          },
          {
            label: "Prettier (`esbenp.prettier-vscode`)",
            value:
              "Formate à la sauvegarde quand elle est définie comme formateur par défaut. Le code est toujours propre sans commande manuelle.",
          },
          {
            label: "Vitest (`vitest.explorer`)",
            value:
              "Lance et débogue les tests depuis l'explorateur de tests de VS Code, avec les résultats en ligne.",
          },
        ],
      },
      {
        kind: "code",
        language: "json",
        title: ".vscode/settings.json — réglages d'équipe",
        code: "{\n  \"editor.formatOnSave\": true,\n  \"editor.defaultFormatter\": \"esbenp.prettier-vscode\",\n  \"editor.codeActionsOnSave\": {\n    \"source.fixAll.eslint\": \"explicit\"\n  }\n}",
      },
    ],
  },
  {
    id: "projets-outillage",
    title: "Projets d'outillage",
    level: 2,
    intro:
      "Trois chantiers pour mettre l'outillage en place en conditions réelles.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Outiller un petit projet",
        fields: [
          { label: "Skills required", value: "ESLint, Prettier, scripts npm" },
          { label: "What you build", value: "ESLint + Prettier configurés sur un projet existant, avec les scripts `lint` et `format`" },
          { label: "What you learn", value: "Le flat config, la différence lint/format, le formatage à la sauvegarde" },
          { label: "Expected difficulty", value: "Faible — quelques heures" },
          { label: "Next project", value: "Ajouter les tests" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Suite de tests",
        fields: [
          { label: "Skills required", value: "Vitest, assertions, organisation des tests" },
          { label: "What you build", value: "Une suite de tests Vitest couvrant un module utilitaire, avec mode watch" },
          { label: "What you learn", value: "Écrire des tests lisibles, structurer describe/it, lire les rapports d'échec" },
          { label: "Expected difficulty", value: "Moyenne — quelques jours" },
          { label: "Next project", value: "CI complète" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — CI complète",
        fields: [
          { label: "Skills required", value: "GitHub Actions, l'ensemble de l'outillage" },
          { label: "What you build", value: "Un workflow CI qui enchaîne typecheck, lint, format:check et tests à chaque pull request" },
          { label: "What you learn", value: "Automatiser la qualité, lire les logs CI, empêcher les régressions" },
          { label: "Expected difficulty", value: "Élevée — une semaine" },
          { label: "Next project", value: "Règles ESLint sur mesure" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "typescript-eslint-detail",
    title: "typescript-eslint en détail",
    level: 3,
    intro: "Comment ESLint comprend TypeScript : parser, plugin et configurations.",
    blocks: [
      {
        kind: "text",
        text: "`typescript-eslint` est le projet officiel qui branche ESLint sur TypeScript. Il fournit un parser (qui transforme le `.ts` en arbre syntaxique qu'ESLint comprend) et un plugin (les règles spécifiques à TypeScript). Le paquet unique `typescript-eslint` réexporte les deux — c'est la façon moderne de l'installer.",
      },
      {
        kind: "list",
        items: [
          "Sans le parser, ESLint échoue sur la moindre annotation de type : il ne sait lire que du JavaScript.",
          "Les règles du plugin couvrent ce que les règles JS ne voient pas : `no-explicit-any`, conventions de nommage des types, `no-non-null-assertion`…",
          "Les règles « type-aware » vont plus loin : elles utilisent les informations de types du compilateur (voir la section dédiée).",
        ],
      },
    ],
  },
  {
    id: "configs-partagees",
    title: "Les configurations partagées",
    level: 3,
    intro: "`recommended`, `stylistic`, `strict` : trois niveaux d'exigence prédéfinis.",
    blocks: [
      {
        kind: "fields",
        title: "Les presets typescript-eslint",
        fields: [
          {
            label: "`tseslint.configs.recommended`",
            value:
              "Le point de départ : les règles qui évitent les vrais problèmes (dont `no-explicit-any`). Suffisant pour la plupart des projets.",
          },
          {
            label: "`tseslint.configs.stylistic`",
            value:
              "S'ajoute à `recommended` : des règles de style cohérent (préférer `Array<T>` ou `T[]`, etc.). Subjectif par nature — à adopter si l'équipe est d'accord.",
          },
          {
            label: "`tseslint.configs.strict`",
            value:
              "Remplace `recommended` pour les équipes exigeantes : plus de règles activées, moins de tolérance. À réserver aux bases déjà saines.",
          },
        ],
      },
      {
        kind: "text",
        text: "Stratégie : commencer par `recommended`, corriger tout ce qu'il signale, puis envisager `stylistic` ou `strict`. Activer `strict` sur une base pleine de `any` produit des centaines d'erreurs décourageantes — le palier se mérite.",
      },
    ],
  },
  {
    id: "regles-type-aware",
    title: "Les règles type-aware",
    level: 3,
    intro: "Des règles qui utilisent les types du compilateur : le lint qui voit comme `tsc`.",
    blocks: [
      {
        kind: "text",
        text: "Certaines règles ont besoin des informations de types pour fonctionner (ex. détecter une promesse non attendue, ou un `await` sur une valeur non-promise). Elles nécessitent que le parser connaisse le projet TypeScript : c'est le « typed linting », plus lent mais beaucoup plus puissant.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "eslint.config.mjs — activer le typed linting",
        code: "import tseslint from \"typescript-eslint\";\n\nexport default [\n  ...tseslint.configs.recommendedTypeChecked,\n  {\n    languageOptions: {\n      parserOptions: {\n        projectService: true,\n        tsconfigRootDir: import.meta.dirname,\n      },\n    },\n  },\n];",
      },
      {
        kind: "text",
        text: "`projectService: true` est la façon moderne d'activer le typed linting : le parser interroge le compilateur à la demande, sans la lourdeur de l'ancienne option `project`. Les règles `recommendedTypeChecked` remplacent alors `recommended`.",
      },
    ],
  },
  {
    id: "regles-cles",
    title: "Les règles clés",
    level: 3,
    intro: "Les règles qui comptent vraiment au quotidien, et ce qu'elles interdisent.",
    blocks: [
      {
        kind: "fields",
        title: "Règles essentielles",
        fields: [
          {
            label: "`@typescript-eslint/no-explicit-any`",
            value:
              "Interdit le `any` explicite : chaque usage doit être justifié ou remplacé par `unknown` + affinement. La règle la plus structurante pour un projet typé.",
          },
          {
            label: "`@typescript-eslint/no-non-null-assertion`",
            value:
              "Interdit l'opérateur `!` : force à traiter la nullabilité par des gardes plutôt que des affirmations. À activer quand le projet est sain.",
          },
          {
            label: "`@typescript-eslint/no-unused-vars`",
            value:
              "Signale les variables et imports inutilisés : le ménage automatique du code mort révélé par les refactors.",
          },
          {
            label: "`@typescript-eslint/no-floating-promises` (type-aware)",
            value:
              "Signale les promesses non attendues ni gérées : une source classique de bugs silencieux en async/await.",
          },
          {
            label: "`no-console` (cœur ESLint)",
            value:
              "Signale les `console.log` oubliés : en warning pendant le dev, en erreur en CI pour éviter les logs parasites en production.",
          },
        ],
      },
    ],
  },
  {
    id: "ignorer-fichiers",
    title: "Ignorer des fichiers",
    level: 3,
    intro: "Dire à ESLint ce qu'il ne doit pas analyser : le bloc `ignores` du flat config.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "eslint.config.mjs — ignores",
        code: "export default [\n  {\n    ignores: [\"dist/**\", \"node_modules/**\", \"coverage/**\"],\n  },\n  // ... le reste de la configuration\n];",
      },
      {
        kind: "text",
        text: "En flat config, l'exclusion se fait avec un bloc `ignores` global (plus de `.eslintignore` séparé). Toujours exclure le code généré (`dist/`, `coverage/`) : linter du JavaScript produit par `tsc` n'a aucun sens et ralentit l'analyse.",
      },
    ],
  },
  {
    id: "eslint-vs-prettier",
    title: "ESLint vs Prettier : qui fait quoi",
    level: 3,
    intro: "La frontière exacte entre les deux outils — et pourquoi ils ne se remplacent pas.",
    blocks: [
      {
        kind: "table",
        headers: ["Question", "ESLint", "Prettier"],
        rows: [
          ["Détecte les bugs probables", "Oui", "Non"],
          ["Reformate le code", "Partiellement (`--fix`)", "Oui, c'est son métier"],
          ["Décide du style", "Non (règles configurables)", "Oui (style d'opinion)"],
          ["Comprend les types TS", "Oui (via typescript-eslint)", "Non (syntaxe uniquement)"],
          ["Ralenti par les gros projets", "Oui (analyse sémantique)", "Non (très rapide)"],
        ],
      },
      {
        kind: "text",
        text: "En pratique : Prettier formate (présentation), ESLint signale (qualité). Les deux sont complémentaires, aucun ne remplace l'autre. Un projet sain utilise les deux, chacun dans son rôle.",
      },
    ],
  },
  {
    id: "biome-alternative",
    title: "Biome, l'alternative unifiée",
    level: 3,
    intro: "Un seul outil pour le formatage et le lint : plus rapide, plus simple.",
    blocks: [
      {
        kind: "text",
        text: "Biome est une chaîne d'outils écrite en Rust qui combine formateur et linter dans un seul binaire — très rapide, sans configuration obligatoire. C'est l'alternative crédible au duo ESLint + Prettier pour les équipes qui préfèrent un outil unique.",
      },
      {
        kind: "command",
        label: "Installer Biome",
        command: "npm install -D --save-exact @biomejs/biome",
        why: "Installe le binaire Biome en dépendance de développement. `--save-exact` épingle la version exacte : Biome évolue vite, et son formatage peut changer entre versions — épingler évite les reformats surprises.",
        verify: "npx @biomejs/biome --version",
      },
      {
        kind: "command",
        label: "Vérifier le projet avec Biome (mode CI)",
        command: "npx @biomejs/biome ci",
        why: "`biome ci` vérifie formatage et lint sans rien modifier : c'est la commande pour la CI. En développement, `npx @biomejs/biome check --write` applique les corrections sûres.",
        verify: "npx @biomejs/biome check .",
      },
      {
        kind: "text",
        text: "Limite à connaître : l'écosystème de règles de Biome est moins riche que celui d'ESLint (pas de règles type-aware équivalentes). Le choix dépend du projet : simplicité et vitesse (Biome) contre profondeur d'analyse (ESLint + typescript-eslint).",
      },
    ],
  },
  {
    id: "vitest-detail",
    title: "Vitest en détail",
    level: 3,
    intro: "Le mode watch, l'isolation, et l'organisation d'une suite de tests.",
    blocks: [
      {
        kind: "text",
        text: "Vitest exécute chaque fichier de test dans un environnement isolé (par défaut via des workers) : les tests ne se polluent pas entre eux. Le mode watch (`npx vitest`, sans `run`) ne relance que les tests affectés par les fichiers modifiés — le feedback est quasi instantané pendant le développement.",
      },
      {
        kind: "list",
        items: [
          "Fichiers `*.test.ts` (ou `*.spec.ts`) : la convention de nommage que Vitest détecte.",
          "`describe` / `it` / `expect` : l'API familière héritée de Jest.",
          "Le TypeScript des tests est vérifié par `tsc` comme le reste : un test mal typé est une erreur de compilation.",
          "Les tests doivent être déterministes : pas de dépendance à l'heure, au réseau ou à l'ordre d'exécution.",
        ],
      },
    ],
  },
  {
    id: "vitest-coverage",
    title: "La couverture de tests",
    level: 3,
    intro: "Mesurer ce que les tests couvrent — sans en faire une religion.",
    blocks: [
      {
        kind: "command",
        label: "Lancer les tests avec couverture",
        command: "npx vitest run --coverage",
        why: "Génère un rapport de couverture : quelles lignes, branches et fonctions sont exécutées par les tests. Nécessite le paquet `@vitest/coverage-v8` installé en dépendance de développement.",
        verify: "npx vitest run --coverage",
      },
      {
        kind: "text",
        text: "La couverture est un indicateur, pas un objectif : 100 % de couverture ne prouve pas l'absence de bugs, et viser le pourcentage pousse à écrire des tests vides de sens. Son vrai usage : repérer les zones jamais testées — le code mort ou les chemins oubliés.",
      },
    ],
  },
  {
    id: "jest-alternative",
    title: "Jest, l'alternative historique",
    level: 3,
    intro: "Le testeur historique de l'écosystème : quand on le rencontre encore.",
    blocks: [
      {
        kind: "text",
        text: "Jest a dominé le testing JavaScript pendant des années : écosystème immense, documentation abondante, API que Vitest a reprise. Pour le TypeScript, il passe par `ts-jest` (ou Babel). On le rencontre surtout dans les projets existants déjà configurés — pour un nouveau projet, Vitest est le choix par défaut.",
      },
      {
        kind: "command",
        label: "Installer Jest avec TypeScript (projet existant)",
        command: "npm install -D jest @types/jest ts-jest",
        why: "`jest` est le testeur, `@types/jest` type ses globales (`describe`, `it`, `expect`), `ts-jest` est le transformateur qui compile le TypeScript des tests. Trois paquets car Jest est historiquement pensé pour JavaScript.",
        verify: "npx jest --version",
      },
    ],
  },
  {
    id: "e2e-playwright",
    title: "Tests end-to-end avec Playwright",
    level: 3,
    intro: "Tester l'application réelle comme un utilisateur : le troisième niveau de tests.",
    blocks: [
      {
        kind: "text",
        text: "Les tests unitaires vérifient des fonctions isolées ; les tests e2e pilotent un vrai navigateur : clics, formulaires, navigation. Playwright pilote Chromium, Firefox et WebKit avec une API moderne et des attentes automatiques (il attend que les éléments soient prêts avant d'agir).",
      },
      {
        kind: "command",
        label: "Installer Playwright",
        command: "npm install -D @playwright/test",
        why: "Installe le testeur e2e. Les navigateurs s'installent ensuite avec `npx playwright install` : ce sont de vrais binaires de navigateurs, téléchargés une fois.",
        verify: "npx playwright --version",
      },
      {
        kind: "text",
        text: "Les tests e2e sont lents et parfois instables : on en écrit peu, sur les parcours critiques (inscription, paiement, connexion). La pyramide des tests reste la règle : beaucoup d'unitaires rapides, quelques e2e ciblés.",
      },
    ],
  },
  {
    id: "tsx-runner",
    title: "Exécuter du TypeScript directement",
    level: 3,
    intro: "tsx et ts-node : lancer du `.ts` sans étape de build, pour les scripts et le dev.",
    blocks: [
      {
        kind: "command",
        label: "Exécuter un script TypeScript avec tsx",
        command: "npx tsx scripts/seed.ts",
        why: "tsx exécute directement un fichier `.ts` en le transpilant à la volée via esbuild : aucune étape `tsc` préalable. Idéal pour les scripts utilitaires, le seed de base de données, ou le développement d'un serveur. (Installation : `npm install -D tsx`.)",
        verify: "npx tsx --version",
      },
      {
        kind: "text",
        text: "Attention : tsx transpile sans vérifier les types — c'est un exécuteur, pas un vérificateur. En développement, on le combine avec `tsc --noEmit` (ou le watch de l'éditeur) pour garder la vérification. Pour la production, le code reste compilé proprement avec `tsc` ou le bundler.",
      },
    ],
  },
  {
    id: "debugging-outils",
    title: "Déboguer avec l'outillage",
    level: 3,
    intro: "Quand un outil signale un problème : lire, comprendre, corriger.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lire le message en entier : ESLint donne la règle violée (`@typescript-eslint/no-explicit-any`) — son nom explique souvent le problème.",
          "La documentation de chaque règle (sur le site de typescript-eslint) explique le pourquoi et montre le avant/après.",
          "Ne jamais désactiver une règle globalement pour faire taire un cas : utiliser un commentaire `// eslint-disable-next-line` ciblé, avec une justification.",
          "Un test qui échoue est un message : lire l'assertion attendue vs reçue avant de toucher au code.",
        ],
      },
    ],
  },
  {
    id: "precommit-hooks",
    title: "Hooks pre-commit",
    level: 3,
    intro: "Empêcher le code non conforme d'entrer dans l'historique : les hooks Git.",
    blocks: [
      {
        kind: "text",
        text: "Un hook `pre-commit` exécute les vérifications avant chaque commit : si le lint ou les tests échouent, le commit est bloqué. `lint-staged` (paquet npm) ne vérifie que les fichiers modifiés — rapide même sur un gros projet. Husky est le gestionnaire de hooks le plus répandu pour les installer.",
      },
      {
        kind: "list",
        items: [
          "Rapide ou rien : un hook qui prend 30 secondes sera désactivé par l'équipe — limiter aux fichiers modifiés.",
          "Le hook est un filet local, pas un remplacement de la CI : la CI reste la vérification officielle.",
          "Documenter les hooks dans le README : un nouveau développeur doit comprendre pourquoi son commit est bloqué.",
        ],
      },
    ],
  },
  {
    id: "ci-github-actions",
    title: "CI avec GitHub Actions",
    level: 3,
    intro: "La vérification automatique à chaque pull request : le workflow de référence.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/ci.yml",
        code: "name: CI\non: [push, pull_request]\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm\n      - run: npm ci\n      - run: npm run typecheck\n      - run: npm run lint\n      - run: npm run format:check\n      - run: npm run test",
      },
      {
        kind: "text",
        text: "Chaque étape rejoue localement ce que le développeur peut lancer (`npm run check`) : aucune magie, aucune divergence entre la machine et la CI. `npm ci` installe exactement les versions du lockfile — reproductible par construction.",
      },
    ],
  },
  {
    id: "cache-outils",
    title: "Accélérer les outils",
    level: 3,
    intro: "Le lint et les tests sur un gros projet : les leviers de vitesse.",
    blocks: [
      {
        kind: "list",
        items: [
          "ESLint met en cache ses résultats : relancer sur un projet inchangé est quasi instantané.",
          "Vitest ne relance en watch que les tests affectés : le feedback reste rapide même avec des centaines de fichiers.",
          "En CI, le cache des dépendances (`cache: npm` dans le workflow) évite de retélécharger à chaque run.",
          "Le typed linting est le poste le plus coûteux : le réserver aux règles qui en ont vraiment besoin.",
        ],
      },
    ],
  },
  {
    id: "monorepo-outillage",
    title: "Outillage en monorepo",
    level: 3,
    intro: "Plusieurs paquets, un outillage cohérent : les patterns qui marchent.",
    blocks: [
      {
        kind: "text",
        text: "En monorepo, chaque paquet a ses outils, mais la configuration est partagée : un paquet interne (ou un dossier `config/`) expose la config ESLint, Prettier et Vitest, que chaque paquet étend. Les scripts racine (`npm run check --workspaces`) propagent les vérifications.",
      },
      {
        kind: "list",
        items: [
          "Une seule version de chaque outil pour tout le repo : pas de divergence entre paquets.",
          "ESLint en mode flat config gère nativement plusieurs dossiers avec des règles par paquet.",
          "La CI vérifie les paquets affectés par la pull request — pas tout le monorepo à chaque fois.",
        ],
      },
    ],
  },
  {
    id: "adopter-existant",
    title: "Adopter l'outillage sur l'existant",
    level: 3,
    intro: "Un projet sans lint ni tests : l'introduire sans tout casser.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Commencer par Prettier",
            detail:
              "`npx prettier --write .` reformate tout en un commit dédié (« chore: format »). Un seul diff de formatage, jamais mélangé à du fonctionnel.",
          },
          {
            title: "ESLint en warnings d'abord",
            detail:
              "Configurer avec les règles en `warn` : le projet passe, mais les problèmes sont visibles. Convertir en erreurs fichier par fichier, au fil des corrections.",
          },
          {
            title: "Tester les modules critiques",
            detail:
              "Écrire les premiers tests sur le code le plus critique ou le plus fragile — pas sur tout. La couverture grandit avec les nouvelles fonctionnalités.",
          },
          {
            title: "Brancher la CI",
            detail:
              "Dès que `lint` et `test` passent, les ajouter au workflow : plus aucune régression ne passe inaperçue.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-outillage",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques de l'outillage, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Confondre lint et format",
            value:
              "Problem : des règles ESLint qui reforment le style pendant que Prettier fait l'inverse — conflits permanents. Why : chevauchement des responsabilités. Better : Prettier pour le style, ESLint pour la qualité, sans recouvrement.",
          },
          {
            label: "Désactiver des règles au lieu de corriger",
            value:
              "Problem : une config pleine de `\"off\"` qui ne protège plus rien. Why : faire taire l'outil plutôt que le code. Better : corriger, ou désactiver localement avec justification.",
          },
          {
            label: "Tests qui dépendent de l'ordre",
            value:
              "Problem : des tests verts seuls, rouges ensemble. Why : état partagé entre tests (mocks non réinitialisés, fichiers). Better : isolation totale, chaque test repart de zéro.",
          },
          {
            label: "Vouloir 100 % de couverture",
            value:
              "Problem : des tests vides écrits pour le pourcentage. Why : confondre indicateur et objectif. Better : utiliser la couverture pour trouver les zones non testées, pas comme cible.",
          },
          {
            label: "Hook pre-commit trop lent",
            value:
              "Problem : l'équipe contourne le hook (`--no-verify`). Why : vérifications trop lourdes. Better : limiter aux fichiers modifiés avec lint-staged, garder le lourd pour la CI.",
          },
          {
            label: "CI différente du local",
            value:
              "Problem : vert en local, rouge en CI (ou l'inverse). Why : étapes magiques dans le workflow. Better : la CI rejoue exactement `npm run check`, rien de plus.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-cli",
    title: "Erreurs CLI courantes",
    level: 3,
    intro: "Les messages d'erreur des outils, décryptés.",
    blocks: [
      {
        kind: "table",
        headers: ["Outil", "Erreur", "Signification"],
        rows: [
          ["ESLint", "Parsing error", "Le parser ne comprend pas le fichier : config `typescript-eslint` manquante ou mal branchée."],
          ["ESLint", "Definition for rule not found", "Règle inconnue : faute de frappe dans le nom, ou plugin non installé."],
          ["Prettier", "[error] No parser could be inferred", "Extension de fichier inconnue : Prettier ne sait pas quel langage formater."],
          ["Vitest", "No test files found", "Aucun `*.test.ts` détecté : vérifier le motif `include` et le dossier d'exécution."],
          ["Vitest", "Error: Missing coverage provider", "`--coverage` sans `@vitest/coverage-v8` installé."],
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-outillage",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les habitudes d'un projet durablement sain.",
    blocks: [
      {
        kind: "list",
        items: [
          "Automatiser, ne pas exhorter : la qualité passe par des outils qui bloquent, pas par des consignes.",
          "Un seul point d'entrée : `npm run check` enchaîne tout, en local comme en CI.",
          "Corriger avant de committer : le lint se traite au fil de l'eau, pas en fin de sprint.",
          "Ne jamais committer du code que la CI refusera : lancer `check` avant de pousser.",
          "Règles justifiées : chaque règle désactivée ou durcie a une raison documentée.",
          "Tests déterministes : un test qui échoue aléatoirement est pire qu'aucun test.",
          "Formatage non négociable : le style ne se discute pas, il s'applique.",
          "Mesurer sans idolâtrer : la couverture éclaire, elle ne dirige pas.",
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
          { label: "typescript-eslint", value: "https://typescript-eslint.io : le site officiel — guides de démarrage, règles documentées une par une, typed linting." },
          { label: "ESLint", value: "https://eslint.org : la documentation du linter et du format flat config." },
          { label: "Prettier", value: "https://prettier.io : options, intégrations éditeurs, différences avec les linters." },
          { label: "Vitest", value: "https://vitest.dev : guide, API d'assertion, couverture, mode watch." },
          { label: "Biome", value: "https://biomejs.dev : documentation du formateur/linter unifié." },
        ],
      },
      {
        kind: "list",
        items: [
          "Guides : la documentation de Playwright (playwright.dev) pour les tests e2e.",
          "Community : les dépôts GitHub des outils pour les cas limites et les discussions.",
          "Practice : outiller un vrai projet de bout en bout — la qualité ne s'apprend qu'en l'automatisant.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'outillage en place, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir `tsconfig` : la configuration que les outils partagent.",
          "Activer `strict` : combiner vérification de types exigeante et lint strict.",
          "Comprendre `tsc` : le compilateur derrière `typecheck`, ses modes et diagnostics.",
          "Migrer avec `migration` : l'outillage est le filet de sécurité d'une migration.",
          "Structurer avec `modules` : une architecture propre se linte mieux.",
          "Revenir à la roadmap : valider la compétence et passer à la suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "niveaux-tests",
    title: "Les trois niveaux de tests",
    level: 3,
    intro: "Unitaires, intégration, e2e : trois granularités complémentaires.",
    blocks: [
      {
        kind: "fields",
        title: "Pyramide des tests",
        fields: [
          {
            label: "Tests unitaires",
            value:
              "Une fonction, un module, isolé de ses dépendances (mocks). Rapides (millisecondes), nombreux : la base de la pyramide, exécutée en permanence.",
          },
          {
            label: "Tests d'intégration",
            value:
              "Plusieurs modules ensemble : une route API avec une base de données de test, un service avec ses dépendances réelles. Plus lents, moins nombreux.",
          },
          {
            label: "Tests end-to-end",
            value:
              "L'application réelle pilotée dans un navigateur (Playwright). Les plus lents et les plus fragiles : réservés aux parcours critiques.",
          },
        ],
      },
      {
        kind: "text",
        text: "La règle : beaucoup d'unitaires, quelques intégrations, très peu d'e2e. Inverser la pyramide (tout tester via le navigateur) donne une suite lente et instable que personne ne lance.",
      },
    ],
  },
  {
    id: "lint-staged-detail",
    title: "lint-staged en détail",
    level: 3,
    intro: "Ne vérifier que les fichiers modifiés : la configuration qui rend le pre-commit rapide.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json — configuration lint-staged",
        code: "{\n  \"lint-staged\": {\n    \"*.{ts,tsx}\": [\"eslint --fix\", \"prettier --write\"],\n    \"*.{json,md}\": [\"prettier --write\"]\n  }\n}",
      },
      {
        kind: "text",
        text: "`lint-staged` (paquet npm) exécute les commandes uniquement sur les fichiers en staging : le hook pre-commit reste rapide même sur un gros projet. Chaque motif de fichiers a sa chaîne d'outils — le TypeScript passe par ESLint puis Prettier, les JSON et Markdown par Prettier seul.",
      },
    ],
  },
  {
    id: "debug-tests",
    title: "Déboguer les tests",
    level: 3,
    intro: "Quand un test échoue : les techniques pour comprendre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lire l'assertion : Vitest affiche la valeur attendue vs la valeur reçue — 90 % des diagnostics s'arrêtent là.",
          "Isoler : lancer uniquement le fichier fautif (`npx vitest run src/math.test.ts`) pour éliminer le bruit.",
          "Le mode watch relance à chaque sauvegarde : idéal pour corriger par itérations rapides.",
          "L'extension Vitest de VS Code permet de poser des points d'arrêt dans un test et de l'exécuter en mode debug.",
          "Pour un test instable (flaky), relancer le fichier plusieurs fois de suite : s'il échoue une fois sur dix, c'est un problème de déterminisme (timing, ordre d'exécution), pas de logique.",
        ],
      },
    ],
  },
];

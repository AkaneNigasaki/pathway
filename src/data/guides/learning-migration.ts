import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de « Migrer un projet JS » : passer une base
 * JavaScript existante à TypeScript par étapes, sans big bang.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_MIGRATION: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Migrer un projet JavaScript existant vers TypeScript, fichier par fichier, sans arrêter la production.",
    blocks: [
      {
        kind: "text",
        text: "Peu de projets naissent en TypeScript : la plupart des bases de code JavaScript existantes doivent être migrées. La migration consiste à introduire le compilateur `tsc` dans un projet JavaScript, à typer les modules un par un, puis à resserrer les vérifications jusqu'au mode strict — tout en gardant le projet compilable et déployable à chaque étape.",
      },
      {
        kind: "text",
        text: "Le principe fondamental : jamais de big bang. Réécrire tout un projet d'un coup est risqué, long et bloque les autres développements. Une migration incrémentale convertit un module à la fois, en commençant par les feuilles du graphe de dépendances (les modules qui ne dépendent de rien d'autre). Chaque étape reste fonctionnelle : le projet compile, les tests passent, on peut déployer.",
      },
    ],
  },
  {
    id: "migration-incrementale",
    title: "Le principe incrémental",
    level: 1,
    intro:
      "Pourquoi on ne réécrit jamais tout d'un coup, et à quoi ressemble une migration bien menée.",
    blocks: [
      {
        kind: "diagram",
        title: "Les cinq phases d'une migration",
        lines: [
          "Projet JavaScript",
          "     │",
          "     ▼",
          "1. COHABITATION (allowJs : .js et .ts compilés ensemble)",
          "     │",
          "     ▼",
          "2. TYPES EXTERNES (@types/*, déclarations locales)",
          "     │",
          "     ▼",
          "3. MODULES (conversion .js → .ts, un par un)",
          "     │",
          "     ▼",
          "4. RESSERREMENT (checkJs, noImplicitAny, strict partiel)",
          "     │",
          "     ▼",
          "Projet TypeScript en mode strict",
        ],
      },
      {
        kind: "text",
        text: "TypeScript est conçu pour cette cohabitation : l'option `allowJs` laisse `tsc` compiler des fichiers `.js` à côté des `.ts`. Les deux langages partagent le même projet pendant toute la transition. C'est ce qui rend la migration progressive possible techniquement — et sûre organisationnellement.",
      },
      {
        kind: "list",
        items: [
          "Chaque étape est déployable : le projet ne reste jamais dans un état cassé.",
          "Les bénéfices arrivent tôt : dès les premiers modules typés, le compilateur détecte des bugs réels.",
          "Le rythme est maîtrisable : un ou deux modules par jour, entre les autres tâches.",
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
      "Ce qu'il faut avoir en place avant de toucher au premier fichier.",
    blocks: [
      {
        kind: "fields",
        title: "Avant de migrer",
        fields: [
          {
            label: "JavaScript moderne maîtrisé",
            value:
              "Modules ES, promesses, async/await : la migration révèle les approximations. Un socle JS solide évite de confondre erreur de type et incompréhension du langage.",
          },
          {
            label: "Bases de TypeScript",
            value:
              "Types de base, interfaces, unions, `strictNullChecks` : on ne peut pas typer un module sans connaître les outils de typage.",
          },
          {
            label: "Tests existants",
            value:
              "Une suite de tests qui passe avant la migration est le filet de sécurité : elle prouve que chaque conversion ne change pas le comportement.",
          },
          {
            label: "Git propre",
            value:
              "Une branche dédiée, des commits petits et fréquents : chaque module migré = un commit. Le retour en arrière reste possible à tout moment.",
          },
          {
            label: "Node.js et dépendances à jour",
            value:
              "Vérifier que le projet installe et démarre proprement (`npm install`, `npm test`) avant d'ajouter TypeScript au mélange.",
          },
        ],
      },
    ],
  },
  {
    id: "etat-des-lieux",
    title: "État des lieux",
    level: 2,
    intro:
      "Auditer le projet avant de migrer : on ne planifie bien que ce qu'on a mesuré.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Compter et cartographier",
            detail:
              "Compter les fichiers `.js`, identifier les points d'entrée, dessiner le graphe de dépendances (qui importe qui). Les modules sans dépendants internes sont les feuilles : ce sont eux qu'on migrera en premier.",
          },
          {
            title: "Lister les dépendances",
            detail:
              "Ouvrir `package.json` : quelles bibliothèques sont utilisées ? Pour chacune, vérifier si elle fournit ses propres types ou s'il existe un paquet `@types/*` correspondant.",
          },
          {
            title: "Repérer les zones à risque",
            detail:
              "Code dynamique (`eval`, accès par chaînes), magie de prototype, dépendances circulaires : ces zones demanderont plus de travail de typage, voire un refactor préalable.",
          },
          {
            title: "Mesurer la couverture de tests",
            detail:
              "Quels modules sont testés ? Les modules non testés sont des angles morts : la migration y est plus risquée, car rien ne prouvera l'absence de régression.",
          },
          {
            title: "Choisir le périmètre du premier jalon",
            detail:
              "Ne pas viser tout le projet : choisir un sous-ensemble (un dossier, une fonctionnalité), le migrer entièrement jusqu'au strict, puis généraliser. Un premier succès crée la dynamique.",
          },
        ],
      },
    ],
  },
  {
    id: "etape-installer-typescript",
    title: "Étape 1 — Installer TypeScript",
    level: 2,
    intro:
      "Ajouter le compilateur au projet JavaScript existant, sans rien changer au code.",
    blocks: [
      {
        kind: "command",
        label: "Installer TypeScript en dépendance de développement",
        command: "npm install -D typescript",
        why: "Ajoute le compilateur `tsc` au projet existant. En dépendance de développement (`-D`) : il sert pendant la migration et le build, jamais à l'exécution. Le code JavaScript existant continue de fonctionner à l'identique.",
        verify: "npx tsc --version",
      },
      {
        kind: "text",
        text: "À ce stade, rien ne change pour l'équipe : le projet démarre, se teste et se déploie exactement comme avant. TypeScript est présent mais inactif — c'est l'étape suivante qui l'active.",
      },
    ],
  },
  {
    id: "etape-tsconfig-initial",
    title: "Étape 2 — tsconfig de cohabitation",
    level: 2,
    intro:
      "Créer une configuration qui accepte le JavaScript tel quel : le but est d'abord de compiler, pas de typer.",
    blocks: [
      {
        kind: "command",
        label: "Générer le fichier de configuration",
        command: "npx tsc --init",
        why: "Crée un `tsconfig.json` avec toutes les options commentées. On part d'une base permissive pensée pour la cohabitation : le compilateur doit d'abord accepter le code existant sans broncher.",
        verify: "npx tsc --showConfig",
      },
      {
        kind: "code",
        language: "json",
        title: "tsconfig.json de démarrage (cohabitation)",
        code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"NodeNext\",\n    \"moduleResolution\": \"NodeNext\",\n    \"allowJs\": true,\n    \"checkJs\": false,\n    \"strict\": false,\n    \"outDir\": \"dist\",\n    \"esModuleInterop\": true,\n    \"skipLibCheck\": true\n  },\n  \"include\": [\"src\"],\n  \"exclude\": [\"node_modules\", \"dist\"]\n}",
      },
      {
        kind: "text",
        text: "Les trois réglages clés de cette phase : `allowJs: true` autorise `tsc` à traiter les `.js`, `checkJs: false` les compile sans les vérifier, `strict: false` désactive les vérifications exigeantes. Le premier objectif est modeste et essentiel : `npx tsc --noEmit` doit passer sur le projet JavaScript inchangé.",
      },
    ],
  },
  {
    id: "etape-checkjs",
    title: "Étape 3 — Activer checkJs",
    level: 2,
    intro:
      "Faire vérifier le JavaScript existant par le compilateur, avant même de renommer un fichier.",
    blocks: [
      {
        kind: "text",
        text: "Avec `checkJs: true`, `tsc` vérifie les types des fichiers `.js` en s'appuyant sur l'inférence et les annotations JSDoc. C'est une révélation : le compilateur signale déjà des incohérences dans le code JavaScript existant — variables potentiellement `undefined`, appels suspects, propriétés inexistantes.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Activer la vérification sur un seul fichier d'abord",
        code: "// @ts-check\n// En tête d'un fichier .js : active checkJs pour ce fichier seul.\n\n/** @param {string} name */\nfunction greet(name) {\n  return \"Hello \" + name;\n}\n\ngreet(42); // Erreur détectée : 42 n'est pas une string",
      },
      {
        kind: "text",
        text: "Le commentaire `// @ts-check` en tête de fichier active la vérification fichier par fichier, sans toucher au `tsconfig.json`. C'est la granularité idéale : on durcit les fichiers les plus critiques d'abord, on corrige les erreurs révélées, et la base s'assainit avant même la conversion en `.ts`.",
      },
    ],
  },
  {
    id: "ordre-de-migration",
    title: "Ordre de migration",
    level: 2,
    intro:
      "Par quels fichiers commencer : la règle des feuilles du graphe de dépendances.",
    blocks: [
      {
        kind: "diagram",
        title: "Migrer des feuilles vers la racine",
        lines: [
          "utils.js  ──┐  (feuilles : aucun import interne)",
          "           ├──▶ api.js ──▶ app.js  (racine : tout dépend d'elle)",
          "config.js ─┘",
          "  ▲",
          "  │  1. Migrer utils.js et config.js d'abord",
          "  │  2. Puis api.js (ses dépendances sont déjà typées)",
          "  │  3. Enfin app.js",
        ],
      },
      {
        kind: "text",
        text: "Pourquoi cet ordre : quand on type un module, ses dépendances doivent déjà être typées pour que le compilateur vérifie correctement les imports. Migrer une feuille d'abord donne des types solides aux modules qui en dépendent. Migrer dans l'ordre inverse force à typer dans le vide, avec des `any` temporaires partout.",
      },
      {
        kind: "list",
        items: [
          "Feuilles d'abord : utilitaires purs, helpers, constantes, validation.",
          "Ensuite le domaine : logique métier qui utilise les utilitaires.",
          "Enfin les racines : points d'entrée, UI, orchestration.",
          "Les dépendances externes (`@types/*`) se règlent en parallèle, indépendamment de l'ordre.",
        ],
      },
    ],
  },
  {
    id: "dependances-types",
    title: "Typer les dépendances",
    level: 2,
    intro:
      "Sans types pour les bibliothèques externes, les imports restent `any` : la migration perd son intérêt.",
    blocks: [
      {
        kind: "command",
        label: "Installer les types d'une dépendance",
        command: "npm install -D @types/node",
        why: "Les paquets `@types/*` (DefinitelyTyped) fournissent les déclarations de types des bibliothèques JavaScript qui n'en incluent pas. `@types/node` type les API Node.js (`fs`, `path`, `process`) ; il existe un paquet équivalent pour la plupart des bibliothèques populaires (`@types/express`, `@types/jest`…). Sans eux, chaque import externe est un `any` implicite.",
        verify: "npx tsc --noEmit",
      },
      {
        kind: "text",
        text: "Vérifier d'abord si la bibliothèque fournit ses propres types : un champ `\"types\"` dans son `package.json` ou un fichier `.d.ts` livré avec le paquet signifie qu'il n'y a rien à installer. N'installer un `@types/*` que pour les bibliothèques qui n'en fournissent pas.",
      },
    ],
  },
  {
    id: "jsdoc-tremplin",
    title: "JSDoc comme tremplin",
    level: 2,
    intro:
      "Les annotations JSDoc existantes sont comprises par `tsc` : elles servent de point de départ gratuit.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "JSDoc compris par le compilateur",
        code: "/**\n * @param {string} name\n * @param {number} [age]\n * @returns {string}\n */\nfunction describe(name, age) {\n  return age ? name + \" (\" + age + \")\" : name;\n}\n\n// tsc vérifie les appels grâce à ces annotations,\n// sans qu'aucun fichier .ts n'existe encore.",
      },
      {
        kind: "text",
        text: "Si le projet utilise déjà JSDoc, la migration est à moitié faite : `tsc` lit ces annotations comme des types. La conversion ultérieure en `.ts` consistera largement à transformer ces commentaires en annotations natives. Si le projet n'en utilise pas, en ajouter sur les fonctions critiques pendant la phase `checkJs` est un excellent investissement.",
      },
    ],
  },
  {
    id: "renommer-fichiers",
    title: "Renommer .js en .ts",
    level: 2,
    intro:
      "La conversion proprement dite : un fichier à la fois, avec Git comme témoin.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le prochain fichier",
            detail:
              "Prendre une feuille du graphe de dépendances dont les dépendances sont déjà migrées (ou typées via `@types`). Un seul fichier à la fois.",
          },
          {
            title: "Renommer avec Git",
            detail:
              "`git mv utils.js utils.ts` : Git suit le renommage et l'historique du fichier est préservé. Un renommage pur, sans modification du contenu, dans un commit dédié.",
          },
          {
            title: "Ajouter les annotations",
            detail:
              "Typer les paramètres, les retours, les structures de données. Convertir les JSDoc en annotations natives. Le compilateur guide : chaque erreur `TS7006` (paramètre implicitement `any`) indique une annotation manquante.",
          },
          {
            title: "Compiler et tester",
            detail:
              "`npx tsc --noEmit` doit passer, puis la suite de tests. Si un test échoue, la conversion a changé le comportement : corriger avant de continuer.",
          },
          {
            title: "Commiter",
            detail:
              "Un commit par fichier migré, avec un message explicite. La migration devient une série de petites victoires relisibles, pas un chantier opaque.",
          },
        ],
      },
    ],
  },
  {
    id: "scripts-npm",
    title: "Scripts npm de migration",
    level: 2,
    intro:
      "Des scripts qui rendent l'état de la migration visible et la vérification automatique.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json — scripts",
        code: "{\n  \"scripts\": {\n    \"typecheck\": \"tsc --noEmit\",\n    \"typecheck:strict\": \"tsc --noEmit --strict\",\n    \"count-any\": \"grep -rn \\\": any\\\" src --include=\\\"*.ts\\\" | wc -l\"\n  }\n}",
      },
      {
        kind: "text",
        text: "`npm run typecheck` est la commande de référence pendant toute la migration : elle doit passer à chaque commit. Le script `typecheck:strict` montre l'écart restant avec l'objectif final sans bloquer le travail courant. Compter les `any` explicites suit la dette de typage comme on suit une jauge.",
      },
    ],
  },
  {
    id: "workflow-migration",
    title: "Le rythme de migration",
    level: 2,
    intro:
      "À quoi ressemble une journée de migration bien menée, en boucle.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de migration par module",
        lines: [
          "Choisir un module feuille",
          "     ↓",
          "git mv module.js → module.ts",
          "     ↓",
          "Ajouter les annotations (guidé par tsc)",
          "     ↓",
          "npx tsc --noEmit (doit passer)",
          "     ↓",
          "Lancer les tests du module",
          "     ↓",
          "Commit",
          "     ↓",
          "Module suivant",
        ],
      },
      {
        kind: "text",
        text: "Un module par boucle, jamais plus. Si un module résiste (trop dynamique, trop couplé), on le laisse en `.js` avec `// @ts-check` et on passe au suivant : la migration n'a pas à être linéaire pour être efficace. Les modules difficiles se traitent en fin de parcours, quand le reste du projet typé les éclaire.",
      },
    ],
  },
  {
    id: "projets-migration",
    title: "Projets de migration",
    level: 2,
    intro:
      "Trois chantiers de taille croissante pour pratiquer la migration en conditions réelles.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Migrer un utilitaire",
        fields: [
          { label: "Skills required", value: "allowJs, checkJs, annotations de base, `tsc --noEmit`" },
          { label: "What you build", value: "La migration complète d'un dossier d'utilitaires (5 à 10 fichiers JS)" },
          { label: "What you learn", value: "Le cycle renommer-typer-vérifier-tester, la lecture des erreurs TS7006" },
          { label: "Expected difficulty", value: "Faible — une demi-journée" },
          { label: "Next project", value: "Migrer une API Express" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Migrer une API",
        fields: [
          { label: "Skills required", value: "JSDoc, @types/*, interfaces, gestion du strict partiel" },
          { label: "What you build", value: "La migration d'une petite API (routes, modèles, accès données)" },
          { label: "What you learn", value: "Typer les dépendances externes, gérer les zones dynamiques, activer checkJs globalement" },
          { label: "Expected difficulty", value: "Moyenne — quelques jours" },
          { label: "Next project", value: "Plan de migration d'équipe" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Plan de migration d'équipe",
        fields: [
          { label: "Skills required", value: "Stratégie par module, CI, ESLint, mode strict" },
          { label: "What you build", value: "Un plan de migration documenté pour un projet réel : audit, ordre des modules, jalons, critères de fin" },
          { label: "What you learn", value: "Estimer, prioriser, mesurer la progression, embarquer une équipe" },
          { label: "Expected difficulty", value: "Élevée — une semaine de travail" },
          { label: "Next project", value: "Mener la migration jusqu'au strict complet" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "allowjs-en-detail",
    title: "allowJs en détail",
    level: 3,
    intro: "L'option qui rend la cohabitation possible : ce qu'elle fait exactement, et ses limites.",
    blocks: [
      {
        kind: "text",
        text: "`allowJs: true` autorise `tsc` à inclure des fichiers `.js` (et `.jsx`) dans la compilation. Sans elle, le compilateur ignore purement ces fichiers : un projet mixte est impossible. Avec elle, les `.js` participent à la résolution des modules, à l'émission, et — si `checkJs` est actif — à la vérification.",
      },
      {
        kind: "list",
        items: [
          "Les `.js` sont émis vers `outDir` comme les `.ts` : le build produit un projet homogène.",
          "Sans `checkJs`, les `.js` sont compilés sans vérification : aucune fausse sécurité, mais aucune erreur non plus.",
          "`allowJs` ne change rien à l'exécution : c'est une option de compilation uniquement.",
          "En fin de migration, quand le dernier `.js` a disparu, `allowJs` devient inutile : on peut le retirer.",
        ],
      },
    ],
  },
  {
    id: "checkjs-en-detail",
    title: "checkJs en détail",
    level: 3,
    intro: "Vérifier du JavaScript sans le convertir : le mode hybride le plus puissant de la migration.",
    blocks: [
      {
        kind: "text",
        text: "`checkJs: true` demande à `tsc` de vérifier les types des fichiers JavaScript, en combinant inférence et annotations JSDoc. Le compilateur applique les mêmes règles qu'au TypeScript, y compris le mode strict si actif. Sur une base JS ancienne, l'activation globale révèle souvent des dizaines d'erreurs : c'est normal, et c'est précisément l'intérêt.",
      },
      {
        kind: "text",
        text: "Stratégie d'activation : globalement à `false` dans le `tsconfig.json`, puis `// @ts-check` en tête des fichiers qu'on durcit un par un. Chaque fichier passé au crible voit ses erreurs corrigées avant de passer au suivant. Quand tous les fichiers critiques sont propres, on peut activer `checkJs` globalement.",
      },
    ],
  },
  {
    id: "ts-check-selectif",
    title: "Le commentaire // @ts-check",
    level: 3,
    intro: "Le scalpel de la migration : activer la vérification fichier par fichier.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Contrôle fin par fichier",
        code: "// @ts-check\n// Active la vérification pour ce fichier .js.\n\n// @ts-nocheck\n// Désactive la vérification pour ce fichier (échappatoire temporaire).",
      },
      {
        kind: "text",
        text: "`// @ts-check` force la vérification d'un fichier même si `checkJs` est désactivé globalement. `// @ts-nocheck` fait l'inverse : il exempte un fichier. En pratique, on marque les fichiers difficiles avec `// @ts-nocheck` en début de migration (avec un commentaire expliquant pourquoi), puis on retire ces exemptions une par une.",
      },
    ],
  },
  {
    id: "jsdoc-avance",
    title: "JSDoc avancé",
    level: 3,
    intro: "Aller au-delà de `@param` : typer des structures complexes sans quitter le JavaScript.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Typedef, génériques et imports de types en JSDoc",
        code: "/**\n * @typedef {Object} User\n * @property {number} id\n * @property {string} name\n * @property {string} [email]\n */\n\n/**\n * @template T\n * @param {T[]} items\n * @returns {T|undefined}\n */\nfunction first(items) {\n  return items[0];\n}\n\n/** @type {import('./types').Config} */\nconst config = loadConfig();",
      },
      {
        kind: "list",
        items: [
          "`@typedef` définit des formes d'objets réutilisables, l'équivalent d'une interface.",
          "`@template T` déclare un générique : `first` ci-dessus est typée comme son équivalent TypeScript.",
          "`import('./types')` dans un `@type` importe un type d'un autre fichier sans import à l'exécution.",
          "Ces annotations se convertissent mécaniquement en syntaxe TypeScript au moment du renommage.",
        ],
      },
    ],
  },
  {
    id: "types-externes",
    title: "Les types des dépendances",
    level: 3,
    intro: "Trois cas de figure pour chaque bibliothèque externe, à traiter méthodiquement.",
    blocks: [
      {
        kind: "fields",
        title: "D'où viennent les types",
        fields: [
          {
            label: "La bibliothèque fournit ses types",
            value:
              "De plus en plus de paquets livrent leurs propres `.d.ts` (champ `\"types\"` dans leur `package.json`). Rien à faire : les imports sont typés automatiquement.",
          },
          {
            label: "DefinitelyTyped (`@types/*`)",
            value:
              "Pour les bibliothèques sans types intégrés, la communauté maintient des déclarations : `npm install -D @types/express`. Vérifier que la version majeure du paquet `@types` correspond à celle de la bibliothèque.",
          },
          {
            label: "Aucun type disponible",
            value:
              "Écrire une déclaration locale minimale (`declare module \"lib-x\"`) pour les API utilisées, ou typer au fur et à mesure des besoins. Mieux vaut une déclaration partielle et juste qu'un `any` global.",
          },
        ],
      },
    ],
  },
  {
    id: "declarations-locales",
    title: "Déclarations locales",
    level: 3,
    intro: "Typer soi-même une bibliothèque sans types : le fichier `declarations.d.ts`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "src/types/declarations.d.ts",
        code: "declare module \"legacy-lib\" {\n  export function compute(input: string): number;\n  export const VERSION: string;\n}",
      },
      {
        kind: "text",
        text: "Un fichier `.d.ts` avec `declare module` décrit les types d'un module JavaScript sans en contenir le code. On ne déclare que ce qu'on utilise : chaque fonction ajoutée est une promesse de typage à tenir. Quand la bibliothèque finit par fournir ses types (ou qu'on la remplace), on supprime la déclaration.",
      },
    ],
  },
  {
    id: "scripts-vs-modules",
    title: "Scripts vs modules",
    level: 3,
    intro: "Un piège classique : un fichier `.js` sans `import`/`export` n'est pas un module.",
    blocks: [
      {
        kind: "text",
        text: "En JavaScript, un fichier sans `import` ni `export` est un script : ses déclarations sont globales. TypeScript applique la même règle, et l'option `moduleDetection` la contrôle (`\"auto\"` par défaut). Pendant une migration, un vieux fichier utilitaire sans imports devient silencieusement global — ses fonctions sont visibles partout sans import, et `tsc` ne le signale pas forcément.",
      },
      {
        kind: "text",
        text: "Conduite à tenir : lors de la conversion d'un fichier, vérifier qu'il contient bien des `import`/`export`. Si un fichier `.js` était un script global volontaire (polyfill, configuration globale), le documenter explicitement plutôt que de le laisser ambigu.",
      },
    ],
  },
  {
    id: "interop-modules",
    title: "Interopérabilité des modules",
    level: 3,
    intro: "Pendant la migration, CommonJS et ESM cohabitent : comprendre les frictions.",
    blocks: [
      {
        kind: "text",
        text: "Un projet JavaScript ancien utilise souvent CommonJS (`require`/`module.exports`) quand le nouveau code TypeScript s'écrit en ESM (`import`/`export`). `esModuleInterop: true` permet d'écrire `import express from \"express\"` pour un module CommonJS. Sans cette option, il faut `import * as express` — et l'erreur `TS1259` rappelle la règle quand on l'oublie.",
      },
      {
        kind: "list",
        items: [
          "Choisir le système cible dès le début (`module: NodeNext` + `\"type\": \"module\"`, ou CommonJS assumé) et s'y tenir.",
          "Les fichiers convertis en `.ts` suivent le système cible ; les `.js` restants gardent le leur.",
          "Tester l'exécution après chaque conversion : une erreur de module se voit à l'exécution, pas toujours à la compilation.",
        ],
      },
    ],
  },
  {
    id: "renommage-progressif",
    title: "Stratégie de renommage",
    level: 3,
    intro: "L'ordre et la granularité qui évitent les chantiers interminables.",
    blocks: [
      {
        kind: "text",
        text: "Règle d'or : un fichier à la fois, des feuilles vers la racine. Chaque fichier converti doit compiler (`tsc --noEmit`) et passer ses tests avant de passer au suivant. Si un fichier dépend d'un module non encore migré, ses imports restent faiblement typés : c'est acceptable temporairement, le typage se resserre quand la dépendance est migrée.",
      },
      {
        kind: "list",
        items: [
          "Utiliser `git mv` pour préserver l'historique des fichiers.",
          "Séparer le commit de renommage pur du commit d'ajout d'annotations : la relecture est plus simple.",
          "Ne pas refactorer pendant la migration : convertir à comportement identique, refactorer après.",
          "Les fichiers qui résistent (trop dynamiques) restent en `.js` avec `// @ts-check` : ils se traiteront en fin de parcours.",
        ],
      },
    ],
  },
  {
    id: "strict-progressif",
    title: "Activer le strict progressivement",
    level: 3,
    intro: "Le mode strict est l'objectif final, pas le point de départ : l'atteindre par paliers.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Palier 1 — noImplicitAny",
            detail:
              "Activer `noImplicitAny: true` seul. Chaque paramètre non typé devient une erreur TS7006 : les corriger un par un. À la fin du palier, plus aucun type n'est implicite.",
          },
          {
            title: "Palier 2 — strictNullChecks",
            detail:
              "Activer `strictNullChecks: true`. Les `null`/`undefined` deviennent visibles : ajouter les gardes et les unions `| null` nécessaires. C'est le palier le plus long, et le plus rentable.",
          },
          {
            title: "Palier 3 — strict complet",
            detail:
              "Passer `strict: true`. Les vérifications restantes (initialisation des propriétés, `this` implicite…) se corrigent généralement vite une fois les deux premiers paliers passés.",
          },
          {
            title: "Palier 4 — au-delà du strict",
            detail:
              "Envisager `noUncheckedIndexedAccess` et `exactOptionalPropertyTypes` si l'équipe est à l'aise. Ces options ne font pas partie de `strict` mais prolongent sa philosophie.",
          },
        ],
      },
    ],
  },
  {
    id: "noimplicitany-migration",
    title: "noImplicitAny pendant la migration",
    level: 3,
    intro: "Le premier palier de resserrement : éliminer les types implicites.",
    blocks: [
      {
        kind: "text",
        text: "Avec `noImplicitAny`, tout ce que le compilateur ne peut pas inférer doit être annoté. L'erreur `TS7006` (« le paramètre a implicitement un type `any` ») devient le guide de travail : chaque occurrence est une annotation à écrire. C'est un travail mécanique mais exhaustif — à la fin, chaque fonction du projet déclare ses intentions.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Avant / après noImplicitAny",
        code: "// Avant : compile en non-strict, any implicite\nfunction formatPrice(amount) {\n  return amount.toFixed(2) + \" €\";\n}\n\n// Après : intention explicite\nfunction formatPrice(amount: number): string {\n  return amount.toFixed(2) + \" €\";\n}",
      },
    ],
  },
  {
    id: "strictnullchecks-legacy",
    title: "strictNullChecks sur du code legacy",
    level: 3,
    intro: "Le palier le plus rentable : traquer les `null` oubliés d'une base ancienne.",
    blocks: [
      {
        kind: "text",
        text: "Sur du code JavaScript ancien, `strictNullChecks` révèle des dizaines d'endroits où `null` ou `undefined` n'étaient pas envisagés : accès à des propriétés d'objets potentiellement absents, retours de fonctions non testés, paramètres optionnels utilisés comme s'ils étaient toujours définis. Chaque erreur est un bug potentiel en production.",
      },
      {
        kind: "list",
        items: [
          "Corriger par des gardes explicites (`if (user != null)`), pas par des assertions `!` : l'assertion masque, la garde protège.",
          "Typer les absences possibles en `| null` ou `| undefined` dans les interfaces : le type raconte la réalité.",
          "Les erreurs se regroupent par motif : corriger un motif (ex. « accès à `req.user` ») en traite souvent dix d'un coup.",
        ],
      },
    ],
  },
  {
    id: "any-balise",
    title: "Les any balisés",
    level: 3,
    intro: "Quand un `any` temporaire est inévitable : le rendre visible et traçable.",
    blocks: [
      {
        kind: "text",
        text: "Pendant la migration, certains `any` sont pragmatiques : une bibliothèque sans types, une zone trop dynamique pour être typée maintenant. La règle est de les rendre explicites et traçables : un `any` écrit noir sur blanc avec un commentaire `// TODO(migration): typer quand X sera migré` plutôt qu'un `any` implicite qui se fait oublier.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Balisage d'un any temporaire",
        code: "// TODO(migration): remplacer par le type retourné par legacy-lib\n// une fois le module migré.\nconst result: any = legacyLib.compute(input);",
      },
    ],
  },
  {
    id: "assertions-temporaires",
    title: "Assertions temporaires",
    level: 3,
    intro: "`as` et `!` comme échafaudage : utiles pendant le chantier, à démonter après.",
    blocks: [
      {
        kind: "text",
        text: "Une assertion (`value as string`, `value!`) dit au compilateur de faire confiance au développeur. Pendant la migration, c'est un échafaudage acceptable pour avancer sur un fichier dont une dépendance n'est pas encore typée. Mais chaque assertion est une dette : elle désactive la vérification exactement là où on en aurait besoin.",
      },
      {
        kind: "list",
        items: [
          "Toujours commenter une assertion temporaire : pourquoi elle est là, quand elle disparaîtra.",
          "En fin de migration, rechercher systématiquement `!` et `as` pour les réévaluer.",
          "La règle ESLint `@typescript-eslint/no-non-null-assertion` peut interdire les nouvelles assertions une fois le projet sain.",
        ],
      },
    ],
  },
  {
    id: "tests-filet",
    title: "Les tests comme filet",
    level: 3,
    intro: "Les types vérifient la cohérence, les tests vérifient le comportement : les deux pendant la migration.",
    blocks: [
      {
        kind: "text",
        text: "Un risque propre à la migration : en typant, on peut subtilement changer le comportement (une garde ajoutée qui modifie un cas limite, une valeur par défaut qui change). Les types ne détectent pas ces régressions — seuls les tests le font. Exiger que la suite de tests passe après chaque fichier migré transforme la migration en opération sûre.",
      },
      {
        kind: "list",
        items: [
          "Si un module n'a pas de tests, en écrire quelques-uns avant de le migrer : c'est le moment idéal.",
          "Les tests existants doivent passer à l'identique : la migration ne change pas le comportement.",
          "Après la migration, les tests eux-mêmes peuvent être typés plus strictement (les fichiers de test passent aussi en `.ts`).",
        ],
      },
    ],
  },
  {
    id: "eslint-migration",
    title: "ESLint pendant la migration",
    level: 3,
    intro: "Le linter comme second filet : détecter ce que les types ne voient pas.",
    blocks: [
      {
        kind: "text",
        text: "Installer ESLint avec `typescript-eslint` dès le début de la migration apporte un second regard : variables inutilisées révélées par les renommages, `any` explicites à traquer, règles de qualité sur le nouveau code. La configuration doit couvrir les `.js` et les `.ts` pendant la cohabitation.",
      },
      {
        kind: "list",
        items: [
          "`@typescript-eslint/no-explicit-any` en avertissement : chaque `any` reste visible sans bloquer.",
          "`@typescript-eslint/no-non-null-assertion` : à activer en fin de migration pour bannir les nouvelles assertions.",
          "Le linter tourne sur les deux langages : la qualité ne dépend pas de l'extension du fichier.",
        ],
      },
    ],
  },
  {
    id: "ci-migration",
    title: "La CI pendant la migration",
    level: 3,
    intro: "Automatiser la vérification pour que la migration ne régresse jamais silencieusement.",
    blocks: [
      {
        kind: "text",
        text: "Dès que `tsc --noEmit` passe sur le projet, l'ajouter à la CI : chaque pull request est alors vérifiée automatiquement. Pendant la migration, la CI rejoue `typecheck` + `lint` + `test` — le trio qui garantit qu'un module migré le reste et que le code non encore migré ne se dégrade pas.",
      },
      {
        kind: "diagram",
        title: "Pipeline de migration",
        lines: [
          "Pull Request",
          "     ↓",
          "Install (npm ci)",
          "     ↓",
          "Type check (tsc --noEmit) — doit passer",
          "     ↓",
          "Lint (eslint .) — sans nouvelle erreur",
          "     ↓",
          "Test — tout vert",
          "     ↓",
          "Merge autorisé",
        ],
      },
    ],
  },
  {
    id: "debugging-migration",
    title: "Déboguer pendant la migration",
    level: 3,
    intro: "Le code change de forme (`.js` → `.ts`) : garder le débogage lisible.",
    blocks: [
      {
        kind: "text",
        text: "Activer `\"sourceMap\": true` dans le `tsconfig.json` dès le début : les fichiers `.js.map` générés permettent au débogueur de VS Code d'afficher le TypeScript d'origine, même pour les modules déjà convertis. Sans source maps, on débogue le JavaScript généré — illisible et décourageant en pleine migration.",
      },
      {
        kind: "list",
        items: [
          "Poser les points d'arrêt dans les `.ts` : le débogueur suit grâce aux source maps.",
          "Vérifier que `outDir` et les source maps sont exclus du versionnement (`.gitignore`).",
          "En cas de comportement étrange après conversion, comparer l'émission avant/après : `tsc` ne doit changer que les types, jamais la logique.",
        ],
      },
    ],
  },
  {
    id: "declaration-pour-js",
    title: "Générer des déclarations depuis JS",
    level: 3,
    intro: "Exposer des types pour du JavaScript qu'on ne migrera pas tout de suite.",
    blocks: [
      {
        kind: "text",
        text: "La combinaison `allowJs: true` + `declaration: true` (+ `emitDeclarationOnly: true` pour ne générer que les `.d.ts`) produit des fichiers de déclaration à partir du JavaScript — en s'appuyant sur les JSDoc. Utile quand un module JS stable n'a pas vocation à être converti mais que ses consommateurs TypeScript ont besoin de ses types.",
      },
      {
        kind: "code",
        language: "json",
        title: "tsconfig pour générer uniquement les déclarations",
        code: "{\n  \"compilerOptions\": {\n    \"allowJs\": true,\n    \"declaration\": true,\n    \"emitDeclarationOnly\": true,\n    \"outDir\": \"types\"\n  }\n}",
      },
    ],
  },
  {
    id: "cas-limites",
    title: "Cas limites",
    level: 3,
    intro: "JSON, assets, `require` dynamique : les zones que le typage n'aime pas.",
    blocks: [
      {
        kind: "fields",
        title: "Situations particulières",
        fields: [
          {
            label: "Imports JSON",
            value:
              "`resolveJsonModule: true` permet d'importer un `.json` avec son type inféré. Pendant la migration, c'est souvent la première chose à activer pour les fichiers de configuration.",
          },
          {
            label: "Assets (CSS, images)",
            value:
              "Un `declare module \"*.css\"` (ou `*.png`) dans un `.d.ts` suffit à faire taire le compilateur sur les imports d'assets, en attendant un typage plus fin.",
          },
          {
            label: "require dynamique",
            value:
              "`require(variable)` ne peut pas être typé statiquement : isoler ces appels dans un module dédié, typé en `unknown` + garde, plutôt que de les laisser contaminer le reste.",
          },
          {
            label: "Prototypes modifiés",
            value:
              "Le code qui étend les prototypes natifs (`Array.prototype.maMethode = ...`) se type via la fusion de déclarations d'interfaces globales — à documenter explicitement, car c'est une pratique à éliminer à terme.",
          },
        ],
      },
    ],
  },
  {
    id: "monorepo-migration",
    title: "Migrer dans un monorepo",
    level: 3,
    intro: "Plusieurs paquets, des dépendances croisées : ordonner la migration à l'échelle.",
    blocks: [
      {
        kind: "text",
        text: "Dans un monorepo, migrer paquet par paquet, en commençant par les paquets les plus bas dans le graphe (les bibliothèques internes). Les références de projet TypeScript (`references` + `tsc -b`) expriment ces dépendances au compilateur : chaque paquet a son `tsconfig.json`, et `tsc -b` compile dans le bon ordre.",
      },
      {
        kind: "list",
        items: [
          "Un paquet migré expose ses types via `declaration: true` : les paquets consommateurs en profitent immédiatement.",
          "Ne pas migrer deux paquets dépendants en même temps : finir le paquet feuille d'abord.",
          "La CI du monorepo vérifie chaque paquet : une régression de typage est localisée au paquet fautif.",
        ],
      },
    ],
  },
  {
    id: "mesurer-progression",
    title: "Mesurer la progression",
    level: 3,
    intro: "Ce qui se mesure s'achève : des indicateurs simples pour piloter la migration.",
    blocks: [
      {
        kind: "command",
        label: "Compter les fichiers restant à migrer",
        command: "find src -name '*.js' | wc -l",
        why: "Le nombre de fichiers `.js` restants est l'indicateur le plus lisible de l'avancement. Il ne diminue que lorsqu'un fichier est réellement converti et vérifié — pas quand on le renomme à la va-vite.",
        verify: "npx tsc --noEmit",
      },
      {
        kind: "list",
        items: [
          "Fichiers `.js` restants : l'indicateur principal, à afficher dans le suivi du chantier.",
          "Nombre de `any` explicites : la dette de typage, à faire décroître.",
          "Erreurs sous `--strict` : l'écart restant avec l'objectif final.",
          "Ces trois chiffres, relevés chaque semaine, racontent l'histoire de la migration mieux qu'un long rapport.",
        ],
      },
    ],
  },
  {
    id: "quand-s-arreter",
    title: "Quand s'arrêter",
    level: 3,
    intro: "Définir la fin du chantier avant de le commencer : des critères objectifs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Zéro fichier `.js` dans `src` (hors cas documentés et assumés).",
          "`strict: true` dans le `tsconfig.json`, sans exemption.",
          "`tsc --noEmit`, ESLint et les tests verts en CI.",
          "Zéro `// @ts-nocheck`, zéro `any` non justifié.",
          "Ces critères se vérifient automatiquement : la fin de la migration n'est pas une impression, c'est un état mesurable.",
        ],
      },
    ],
  },
  {
    id: "performance-migration",
    title: "Performance de la vérification",
    level: 3,
    intro: "Un gros projet mixte peut ralentir `tsc` : les réglages qui aident.",
    blocks: [
      {
        kind: "text",
        text: "Pendant la cohabitation, `tsc` analyse les `.js`, les `.ts` et tous les `.d.ts` des dépendances : sur une grosse base, la vérification peut prendre du temps. `skipLibCheck: true` évite de revérifier les fichiers de déclaration des bibliothèques (le gain le plus important), et `exclude` doit tenir `dist/` et `node_modules` à l'écart du programme.",
      },
      {
        kind: "list",
        items: [
          "`skipLibCheck: true` : ne pas revérifier les `.d.ts` tiers — le premier levier de vitesse.",
          "Restreindre `include` à `src` : chaque dossier scanné inutilement coûte du temps.",
          "En fin de migration, `tsc -b` avec des références de projet ne recompile que ce qui a changé.",
        ],
      },
    ],
  },
  {
    id: "erreurs-ts-migration",
    title: "Erreurs tsc typiques en migration",
    level: 3,
    intro: "Les codes d'erreur qu'on rencontre en boucle pendant une migration, et leur sens.",
    blocks: [
      {
        kind: "table",
        headers: ["Code", "Message", "Signification pendant une migration"],
        rows: [
          ["TS7006", "Parameter implicitly has an 'any' type", "Un paramètre sans annotation sous `noImplicitAny` : écrire le type."],
          ["TS2307", "Cannot find module 'x'", "Module introuvable : `@types` manquant, chemin incorrect, ou déclaration locale absente."],
          ["TS2322", "Type 'X' is not assignable to type 'Y'", "Incohérence entre le type déclaré et la valeur réelle : souvent un bug préexistant révélé."],
          ["TS2339", "Property 'x' does not exist on type 'Y'", "Propriété inexistante : faute de frappe, ou forme réelle différente du type supposé."],
          ["TS18048", "'x' is possibly 'undefined'", "Valeur potentiellement absente sous `strictNullChecks` : ajouter une garde."],
          ["TS1259", "Module can only be default-imported with 'esModuleInterop'", "Import par défaut d'un module CommonJS sans `esModuleInterop` : activer l'option."],
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-migration",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques d'une migration, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Vouloir tout migrer d'un coup",
            value:
              "Problem : un chantier de plusieurs semaines sans rien de déployable. Why : sous-estimer l'intérêt de l'incrémental. Better : un module à la fois, chaque étape verte.",
          },
          {
            label: "Activer strict trop tôt",
            value:
              "Problem : des centaines d'erreurs décourageantes dès le premier jour. Why : confondre objectif final et point de départ. Better : cohabitation permissive d'abord, paliers de strict ensuite.",
          },
          {
            label: "Refactorer pendant la migration",
            value:
              "Problem : impossible de distinguer une régression de typage d'un changement volontaire. Why : mélanger deux chantiers. Better : convertir à comportement identique, refactorer après.",
          },
          {
            label: "Laisser les any implicites",
            value:
              "Problem : un projet « migré » qui n'est pas vérifié. Why : ne pas activer `noImplicitAny`. Better : traquer chaque TS7006 jusqu'à zéro.",
          },
          {
            label: "Oublier les @types",
            value:
              "Problem : tous les imports externes en `any`, la moitié du bénéfice perdue. Why : négliger les dépendances. Better : régler les types externes dès la phase 2.",
          },
          {
            label: "Ne pas mesurer",
            value:
              "Problem : une migration qui s'éternise sans visibilité. Why : aucun indicateur. Better : compter les `.js` restants et les `any` chaque semaine.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-migration",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les habitudes qui distinguent une migration réussie d'un chantier qui s'enlise.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un module à la fois : chaque conversion est un commit vert et testé.",
          "Des feuilles vers la racine : typer les dépendances avant leurs consommateurs.",
          "Comportement identique : la migration ne change rien à l'exécution, les tests en témoignent.",
          "Paliers de strict : `noImplicitAny`, puis `strictNullChecks`, puis `strict` complet.",
          "Any balisés : chaque `any` temporaire est explicite, commenté, traçable.",
          "Mesurer chaque semaine : fichiers `.js` restants, `any` explicites, écart au strict.",
          "CI dès que possible : `tsc --noEmit` + lint + tests à chaque pull request.",
          "Documenter les exceptions : chaque `// @ts-nocheck` et chaque déclaration locale a une raison écrite.",
        ],
      },
    ],
  },
  {
    id: "migration-outils-ide",
    title: "L'éditeur pendant la migration",
    level: 3,
    intro: "VS Code accompagne chaque phase : savoir ce qu'il fait automatiquement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Avec `checkJs`, les erreurs apparaissent dans les `.js` en direct : la phase 3 se fait à vue.",
          "« Rename Symbol » (`F2`) renomme à travers les `.js` et les `.ts` : fiabilise les renommages pendant les conversions.",
          "L'auto-import propose les symboles des modules déjà migrés : les nouveaux imports sont corrects d'emblée.",
          "Aligner la version TypeScript de VS Code sur celle du projet (« Use Workspace Version ») : l'éditeur et `tsc` doivent dire la même chose.",
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
          { label: "Migrating from JavaScript", value: "https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html : le guide officiel de migration, dont cette page suit la démarche." },
          { label: "JSDoc Reference", value: "La référence des annotations JSDoc comprises par le compilateur (`@param`, `@typedef`, `@template`)." },
          { label: "tsconfig Reference", value: "Le détail de `allowJs`, `checkJs`, `strict` et de chaque palier de resserrement." },
        ],
      },
      {
        kind: "list",
        items: [
          "Guides : la documentation des outils de build utilisés pour l'intégration (`tsc`, bundler).",
          "Community : le dépôt GitHub microsoft/TypeScript pour les cas limites de migration.",
          "Practice : migrer un vrai projet, même petit — la migration ne s'apprend que sur du code réel.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "La migration terminée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir `strict` : comprendre chaque vérification que la migration a activée.",
          "Maîtriser `tsconfig` : relire chaque option du fichier de cohabitation devenu fichier définitif.",
          "Comprendre `tsc` : le compilateur qui a guidé toute la migration, ses modes et ses diagnostics.",
          "Structurer avec `modules` : profiter du projet typé pour assainir l'organisation.",
          "Sécuriser avec `outillage` : ESLint, Prettier et tests pour garder le projet sain.",
          "Revenir à la roadmap : valider la compétence et passer à la suivante du parcours.",
        ],
      },
    ],
  },
];

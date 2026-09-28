import type { LearningSection } from "../skill-guides";

/**
 * Learning Page des types de base TypeScript : primitifs, tableaux,
 * tuples, objets simples, `any` / `unknown` / `never` et inférence.
 * Angle « vocabulaire quotidien du typage » — complément de la page
 * TypeScript générale, qui reste la référence d'ensemble.
 */
export const LEARNING_TYPES_BASE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Les types de base sont le vocabulaire quotidien du typage TypeScript : ce que vous écrirez dans 80 % de vos annotations.",
    blocks: [
      {
        kind: "text",
        text: "Typer une valeur, c'est déclarer ce qu'elle contient : `string`, `number`, `boolean`, tableaux, tuples, objets. Ces annotations documentent l'intention et permettent au compilateur de vérifier chaque usage — un argument du mauvais type est signalé avant l'exécution, pas en production.",
      },
      {
        kind: "text",
        text: "Deux mécanismes rendent le typage supportable au quotidien : l'annotation explicite (`const n: number = 1`) quand l'intention doit être visible, et l'inférence quand le type est évident (`const n = 1` donne `number` sans rien écrire). Un bon code TypeScript mélange les deux : explicite aux frontières (paramètres, retours), inféré à l'intérieur.",
      },
      {
        kind: "text",
        text: "Trois types spéciaux méritent une attention particulière : `any` désactive toute vérification (à bannir), `unknown` impose un contrôle avant usage (l'alternative sûre pour les données externes), `never` représente l'impossible (fonctions qui ne retournent jamais, cas exhaustifs). Les confondre est la source d'erreur n° 1 des débutants.",
      },
    ],
  },
  {
    id: "types-de-base-en-30-secondes",
    title: "Les types de base en 30 secondes",
    level: 1,
    intro: "La carte mentale minimale à retenir.",
    blocks: [
      {
        kind: "diagram",
        title: "Panorama des types de base",
        lines: [
          "Types de base",
          "     │",
          "     ├── Primitifs : string, number, boolean",
          "     │        └─ bigInt, symbol (cas particuliers)",
          "     ├── Tableaux : string[], number[]",
          "     ├── Tuples : [string, number] (longueur fixe)",
          "     ├── Objets : { name: string; age: number }",
          "     ├── Enums : ensemble fini de valeurs nommées",
          "     │        └─ souvent remplaçables par des unions de littéraux",
          "     └── Spéciaux",
          "              ├── any      → vérification désactivée (éviter)",
          "              ├── unknown  → vérifier avant d'utiliser (sûr)",
          "              ├── never    → l'impossible (exhaustivité)",
          "              ├── void     → fonction sans retour utile",
          "              └── null / undefined → avec strict, explicites",
        ],
      },
      {
        kind: "text",
        text: "Retenez trois réflexes : annoter les frontières (paramètres, retours de fonctions), laisser l'inférence travailler à l'intérieur, et traiter chaque erreur du compilateur comme une information — pas comme une punition.",
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
      "Ce qu'il faut maîtriser avant d'attaquer les types de base, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "JavaScript — les fondations indispensables",
        fields: [
          {
            label: "`let` / `const`",
            value:
              "Déclarer des variables et comprendre la portée. Les types de base annotent justement le contenu de ces variables.",
          },
          {
            label: "Valeurs primitives",
            value:
              "Chaînes, nombres, booléens : leurs opérations (`+`, comparaisons, méthodes de `String`). Sans ça, `string` et `number` n'ont pas de sens.",
          },
          {
            label: "Tableaux et objets",
            value:
              "Créer des tableaux et des objets littéraux, accéder aux propriétés. Les annotations décrivent ces structures.",
          },
          {
            label: "Fonctions",
            value:
              "Paramètres, valeur de retour, fonctions fléchées. Vous annoterez les deux : des bases fragiles ici rendent tout le typage confus.",
          },
        ],
      },
      {
        kind: "text",
        text: "Prérequis TypeScript : avoir installé le compilateur (`tsc`) et compris qu'il vérifie les annotations avant d'émettre le JavaScript. Si ce n'est pas le cas, commencez par la page TypeScript générale.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Bonne nouvelle : les types de base sont natifs à TypeScript. Rien à installer de plus.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier que TypeScript est disponible",
        command: "npx tsc --version",
        why: "Les types de base (`string`, `number`, `boolean`, tableaux, tuples…) font partie du langage lui-même : aucune dépendance supplémentaire n'est nécessaire. Cette commande confirme simplement que le compilateur est installé dans le projet.",
        verify: "npx tsc --noEmit",
      },
      {
        kind: "text",
        text: "`npx tsc --noEmit` vérifie les types sans émettre de fichiers : c'est la commande de contrôle à lancer après chaque exercice de cette page. Si elle ne renvoie rien, vos annotations sont correctes.",
      },
    ],
  },
  {
    id: "activer-le-mode-strict",
    title: "Activer le mode strict",
    level: 2,
    intro:
      "Sans le mode strict, les types de base sont à moitié vérifiés. C'est la configuration la plus importante de cette page.",
    blocks: [
      {
        kind: "command",
        label: "Créer le fichier de configuration",
        command: "npx tsc --init",
        why: "Génère un `tsconfig.json` avec les options commentées. Vous y activerez `strict` : sans lui, `null` et `undefined` sont acceptés partout et les `any` implicites passent inaperçus — les types de base perdent alors l'essentiel de leur valeur.",
        verify: "ls tsconfig.json",
      },
      {
        kind: "code",
        language: "json",
        title: "tsconfig.json — l'essentiel",
        code: `{\n  "compilerOptions": {\n    "strict": true,\n    "target": "ES2020",\n    "module": "ESNext",\n    "noEmitOnError": true\n  },\n  "include": ["src"]\n}`,
      },
      {
        kind: "text",
        text: "Avec `strict: true`, chaque section suivante se comporte comme décrit : `null` n'est plus assignable à `string`, les paramètres non typés sont signalés, les propriétés d'objet éventuellement absentes doivent être gérées. Activez-le dès le début : le corriger après coup coûte cher.",
      },
    ],
  },
  {
    id: "annotations-vs-inference",
    title: "Annotations vs inférence",
    level: 2,
    intro:
      "Les deux façons de donner un type à une valeur, et quand utiliser chacune.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Explicite et inféré",
        code: `// Annotation explicite : l'intention est visible\nconst username: string = "akane";\n\n// Inférence : le compilateur déduit string tout seul\nconst greeting = "Bonjour"; // type: string\n\n// Inférence sur les retours : le type se propage\nfunction double(n: number) {\n  return n * 2; // inféré comme (n: number) => number\n}\n\nconst result = double(21); // result: number`,
      },
      {
        kind: "list",
        items: [
          "Annoter aux frontières : paramètres de fonctions, valeurs de retour publiques, propriétés d'objets exportés.",
          "Laisser inférer à l'intérieur : variables locales, résultats intermédiaires, retours de fonctions privées.",
          "Ne jamais annoter pour redire l'évidence : `const n: number = 1` n'apporte rien par rapport à `const n = 1`.",
          "Le survol dans l'éditeur révèle le type inféré : c'est votre vérificateur permanent.",
        ],
      },
    ],
  },
  {
    id: "premier-fichier-type",
    title: "Premier fichier typé",
    level: 2,
    intro:
      "Écrire un premier fichier qui utilise les types de base, puis le faire vérifier par le compilateur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le fichier source",
            detail:
              "Créez `src/bases.ts`. C'est là que vous écrirez les exemples des sections suivantes : un seul fichier suffit pour tout manipuler.",
          },
          {
            title: "Déclarer des variables typées",
            detail:
              "`const name: string = \"Akane\";`, `const level: number = 42;`, `const active: boolean = true;`. Chaque annotation déclare le contenu attendu.",
          },
          {
            title: "Ajouter un tableau et un tuple",
            detail:
              "`const scores: number[] = [10, 20];` puis `const position: [number, number] = [3, 7];`. Observez la différence : longueur libre contre longueur fixe.",
          },
          {
            title: "Provoquer une erreur volontairement",
            detail:
              "Ajoutez `name = 123;` en bas du fichier. Le compilateur doit protester : c'est la preuve que la vérification fonctionne.",
          },
          {
            title: "Vérifier avec le compilateur",
            detail:
              "Lancez `npx tsc --noEmit`. Lisez l'erreur (fichier, ligne, message), corrigez la ligne fautive, relancez : le silence du compilateur signifie que tout est correct.",
          },
        ],
      },
    ],
  },
  {
    id: "chaines-de-caracteres",
    title: "Chaînes de caractères",
    level: 2,
    intro: "`string` au quotidien : déclaration, opérations sûres, pièges.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "string en pratique",
        code: `const firstName: string = "Akane";\nconst lastName = "Nigasaki"; // inféré : string\n\n// Les méthodes de String restent disponibles, typées\nconst full = firstName + " " + lastName;\nconst upper: string = full.toUpperCase();\nconst initial: string = firstName.charAt(0);\n\n// Template literals : le type reste string\nconst message: string = \`Bonjour, \${firstName} !\`;\n\n// Erreur typique : confondre string et String (objet)\n// const bad: String = "x"; // fonctionne mais déconseillé`,
      },
      {
        kind: "text",
        text: "Utilisez toujours le type primitif `string` en minuscule, jamais l'objet `String` en majuscule : le second est un wrapper rarement utile qui complique les comparaisons.",
      },
    ],
  },
  {
    id: "nombres",
    title: "Nombres",
    level: 2,
    intro: "`number` couvre entiers et décimaux — avec les limites du flottant JavaScript.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "number en pratique",
        code: `const age: number = 28;\nconst price = 19.99; // inféré : number\nconst hex: number = 0xff;\n\n// number couvre aussi les cas limites du runtime\nconst ratio: number = 10 / 3; // 3.333...\nconst notANumber: number = 0 / 0; // NaN, mais toujours number\nconst infinite: number = 1 / 0; // Infinity, toujours number\n\nfunction toCents(euros: number): number {\n  return Math.round(euros * 100);\n}`,
      },
      {
        kind: "text",
        text: "TypeScript ne distingue pas entier et flottant : c'est `number` dans les deux cas. Pour des calculs monétaires précis ou de grands entiers, voyez `bigint` au niveau 3 — avec ses contraintes propres.",
      },
    ],
  },
  {
    id: "booleens",
    title: "Booléens",
    level: 2,
    intro: "`boolean` : le type le plus simple, et celui des conditions.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "boolean en pratique",
        code: `const isActive: boolean = true;\nconst hasAccess = age >= 18; // inféré : boolean\n\nfunction canEnter(isMember: boolean, isOpen: boolean): boolean {\n  return isMember && isOpen;\n}\n\n// Les conditions n'exigent pas un boolean strict...\nconst name = "Akane";\nif (name) {\n  // ...mais typer en boolean rend l'intention explicite\n}`,
      },
      {
        kind: "text",
        text: "JavaScript accepte n'importe quelle valeur dans un `if` (valeurs « truthy » / « falsy »). Typer explicitement en `boolean` les flags et les retours de prédicats rend le code plus lisible et les erreurs plus visibles.",
      },
    ],
  },
  {
    id: "editeurs-survol",
    title: "L'éditeur comme vérificateur",
    level: 2,
    intro:
      "Le survol des types dans l'éditeur est l'outil d'apprentissage le plus rapide pour les types de base.",
    blocks: [
      {
        kind: "fields",
        title: "VS Code — réflexes types de base",
        fields: [
          {
            label: "Survol d'une variable",
            value:
              "Affiche le type inféré ou annoté. Faites-le systématiquement après chaque déclaration pour valider votre modèle mental.",
          },
          {
            label: "`F12` — aller à la définition",
            value:
              "Sur un type nommé, saute à sa déclaration. Utile dès que vous utilisez des alias ou des interfaces.",
          },
          {
            label: "`Ctrl` + clic",
            value:
              "Équivalent souris de `F12`. Sur `Partial` ou un utilitaire, ouvre sa définition dans les fichiers lib.",
          },
          {
            label: "Problèmes (`Ctrl`+`Maj`+`M`)",
            value:
              "Liste toutes les erreurs de type du projet avec fichier et ligne : votre todo-list de typage.",
          },
          {
            label: "Renommage (`F2`)",
            value:
              "Renomme une variable et toutes ses utilisations : sûr grâce aux types, impossible à faire à l'aveugle en JS pur.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : si le type affiché au survol vous surprend, c'est votre compréhension qu'il faut corriger — pas l'annotation. L'inférence ne se trompe pas, elle révèle.",
      },
    ],
  },
  {
    id: "erreurs-frequentes-debut",
    title: "Erreurs fréquentes au début",
    level: 2,
    intro: "Les trois erreurs que tout débutant rencontre dans la première heure.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue express",
        fields: [
          {
            label: "`Type 'number' is not assignable to type 'string'`",
            value:
              "Vous affectez une valeur d'un type à une variable d'un autre. Corrigez la valeur ou le type déclaré — ne forcez pas avec un cast.",
          },
          {
            label: "`Object is possibly 'null'` / `'undefined'`",
            value:
              "Le mode strict vous protège : la valeur peut être absente. Vérifiez-la (`if (x)`) ou gérez le cas avant usage.",
          },
          {
            label: "`Property 'x' does not exist on type '...'`",
            value:
              "Faute de frappe dans un nom de propriété, ou objet mal typé. Le compilateur connaît la forme exacte : fiez-vous à lui.",
          },
        ],
      },
      {
        kind: "text",
        text: "Face à une erreur : lisez le message en entier, repérez le fichier et la ligne, comprenez ce que le compilateur a inféré (souvent affiché entre guillemets). La correction suit presque toujours de la lecture attentive.",
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro: "Quatre projets pour ancrer les types de base, du plus simple au plus complet.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Beginner — Convertisseur d'unités",
            value:
              "Fonctions `celsiusToFahrenheit(c: number): number`, `formatPrice`. Objectif : annoter paramètres et retours, vérifier avec `tsc --noEmit`.",
          },
          {
            label: "Intermediate — Carnet d'adresses",
            value:
              "Tableau d'objets typés `{ name: string; phone?: string }`, fonctions de recherche et d'ajout. Objectif : tableaux, objets, propriétés optionnelles.",
          },
          {
            label: "Advanced — Chasse au `any`",
            value:
              "Prenez un fichier JavaScript existant, renommez-le en `.ts`, corrigez chaque erreur sans utiliser `any`. Objectif : `unknown` + gardes de type.",
          },
          {
            label: "Professional — Mini-bibliothèque typée",
            value:
              "Utilitaires (`groupBy`, `unique`, `pick`) avec signatures précises et tests. Objectif : API publiques dont les types se lisent comme de la documentation.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "string-en-detail",
    title: "`string` en détail",
    level: 3,
    intro: "Tout ce que le type chaîne recouvre — et ses limites.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Opérations typées sur les chaînes",
        code: `const text: string = "  TypeScript  ";\n\nconst trimmed: string = text.trim();\nconst parts: string[] = text.split(" ");\nconst hasTs: boolean = text.includes("Type");\nconst sliced: string = text.slice(2, 8);\n\n// Les méthodes retournent des types précis...\nconst len: number = text.length;\n\n// ...mais le contenu reste invérifié : string ne dit rien du format\nconst email: string = "pas-un-email"; // compile sans problème`,
      },
      {
        kind: "text",
        text: "`string` garantit le conteneur, pas le contenu : un email, une URL ou un JSON restent des `string` ordinaires pour le compilateur. Pour valider le format, il faut une vérification à l'exécution (expression régulière, bibliothèque de validation) — les types littéraux et les template literal types (niveau avancé) offrent un contrôle statique partiel.",
      },
    ],
  },
  {
    id: "number-en-detail",
    title: "`number` en détail",
    level: 3,
    intro: "Le type numérique unique de TypeScript, avec ses angles morts.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Limites de number",
        code: `// Pas de distinction entier / flottant\nconst count: number = 42;\nconst pi: number = 3.14159;\n\n// Précision flottante : le classique 0.1 + 0.2\nconsole.log(0.1 + 0.2); // 0.30000000000000004\n\n// Limite des entiers sûrs\nconsole.log(Number.MAX_SAFE_INTEGER); // 9007199254740991\nconst unsafe: number = 9007199254740993; // perd en précision\n\n// NaN est un number : les calculs invalides ne sont pas typés\nconst bad: number = Math.sqrt(-1); // NaN`,
      },
      {
        kind: "list",
        items: [
          "`number` ne protège pas contre `NaN`, `Infinity` ou la perte de précision : ce sont des valeurs d'exécution, pas des erreurs de type.",
          "Au-delà de `Number.MAX_SAFE_INTEGER`, passez à `bigint` — mais les deux types ne se mélangent pas.",
          "Pour la monnaie, travaillez en centimes entiers (`toCents`) plutôt qu'en décimaux flottants.",
        ],
      },
    ],
  },
  {
    id: "boolean-en-detail",
    title: "`boolean` en détail",
    level: 3,
    intro: "Strictement `true` ou `false` — et la différence avec les valeurs truthy.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "boolean strict vs truthy",
        code: `const flag: boolean = true;\n// const bad: boolean = 1; // erreur : number ≠ boolean\n// const bad2: boolean = "yes"; // erreur : string ≠ boolean\n\n// Les prédicats retournent de vrais booléens\nconst isEmpty = (s: string): boolean => s.length === 0;\n\n// Double négation pour convertir en boolean strict\nconst hasName = (s: string): boolean => !!s;\n\n// Attention : Boolean() et !! ne valident rien d'autre que la vacuité\nif ("false") {\n  // cette chaîne non vide est truthy !\n}`,
      },
      {
        kind: "text",
        text: "TypeScript est strict sur `boolean` : seul `true`/`false` est assignable. Mais les conditions JavaScript restent permissives. Quand une fonction doit répondre par oui/non, déclarez le retour `: boolean` — c'est un contrat lisible pour tous les appelants.",
      },
    ],
  },
  {
    id: "bigint",
    title: "`bigint`",
    level: 3,
    intro: "Les entiers arbitrairement grands — un type à part, avec ses règles.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "bigint : usages et contraintes",
        code: `// Littéral bigint : suffixe n (nécessite target ES2020+)\nconst huge: bigint = 9007199254740993n;\nconst fromNumber: bigint = BigInt(123);\n\nconst sum: bigint = huge + 10n; // OK\n\n// INTERDIT : mélanger bigint et number\n// const mixed = huge + 10; // erreur de type\n\n// Comparaison autorisée, arithmétique séparée\nconst isBigger: boolean = huge > 100;`,
      },
      {
        kind: "list",
        items: [
          "`bigint` et `number` sont deux types incompatibles : toute opération mixte est une erreur de compilation.",
          "Le littéral `10n` exige `target: ES2020` ou supérieur dans le `tsconfig.json`.",
          "Cas d'usage réels : identifiants très grands, cryptographie, calculs financiers en unités minimales.",
          "`JSON.stringify` échoue sur les `bigint` : prévoyez une sérialisation explicite (`toString()`).",
        ],
      },
    ],
  },
  {
    id: "symbol",
    title: "`symbol`",
    level: 3,
    intro: "Des identifiants uniques garantis — le type le plus discret du langage.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "symbol : unicité garantie",
        code: `const id: symbol = Symbol("id");\nconst id2: symbol = Symbol("id");\n\nconsole.log(id === id2); // false : chaque Symbol est unique\n\n// Usage classique : clés de propriétés non collisionnelles\nconst KEY = Symbol("cache");\nconst store: { [KEY]?: string } = {};\n\n// Symboles prédéfinis : personnaliser le comportement des objets\nclass Collection {\n  [Symbol.iterator]() {\n    // rend la classe itérable avec for...of\n    return [][Symbol.iterator]();\n  }\n}`,
      },
      {
        kind: "text",
        text: "`symbol` sert quand une chaîne comme clé risque une collision : propriétés « privées » par convention, protocoles internes (`Symbol.iterator`, `Symbol.toPrimitive`). En pratique applicative, vous le croiserez plus souvent que vous ne le déclarerez.",
      },
    ],
  },
  {
    id: "tableaux",
    title: "Tableaux",
    level: 3,
    intro: "Typer le contenu des tableaux — la base des collections.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Tableaux typés",
        code: `const names: string[] = ["Ada", "Grace"];\nconst scores: Array<number> = [10, 20]; // syntaxe équivalente\n\n// L'élément est typé : les méthodes sont vérifiées\nconst upper = names.map((n) => n.toUpperCase()); // string[]\nconst total = scores.reduce((a, b) => a + b, 0); // number\n\n// Erreur : le compilateur connaît le type des éléments\n// names.push(42); // number ≠ string\n\n// Tableaux multidimensionnels\nconst matrix: number[][] = [\n  [1, 2],\n  [3, 4],\n];`,
      },
      {
        kind: "list",
        items: [
          "`string[]` et `Array<string>` sont équivalents : la première forme est la plus courante.",
          "Les méthodes (`map`, `filter`, `find`) propagent le type des éléments : l'inférence fait le gros du travail.",
          "Un tableau vide a besoin d'une annotation (`const xs: string[] = []`) sinon il est inféré `never[]` ou `any[]` selon le contexte.",
        ],
      },
    ],
  },
  {
    id: "tableaux-readonly",
    title: "Tableaux en lecture seule",
    level: 3,
    intro: "`readonly` fige un tableau au niveau des types : une garantie documentée.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "readonly : interdire la mutation",
        code: `const config: readonly string[] = ["a", "b"];\n// config.push("c"); // erreur : push n'existe pas sur readonly string[]\n\n// Syntaxe générique équivalente\nconst frozen: ReadonlyArray<number> = [1, 2, 3];\n\nfunction sum(values: readonly number[]): number {\n  return values.reduce((a, b) => a + b, 0);\n}\n\n// Un tableau mutable est assignable à readonly...\nconst mutable: number[] = [1, 2];\nsum(mutable); // OK\n// ...mais pas l'inverse\n// const back: number[] = frozen; // erreur`,
      },
      {
        kind: "text",
        text: "`readonly` est une promesse de non-mutation vérifiée à la compilation — pas une immuabilité d'exécution (un cast peut toujours contourner). Utilisez-le pour les paramètres de fonctions qui ne doivent pas modifier leurs entrées : l'intention devient un contrat.",
      },
    ],
  },
  {
    id: "tuples",
    title: "Tuples",
    level: 3,
    intro: "Des tableaux à longueur et types fixés : l'ordre compte.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Tuples : forme et usages",
        code: `// Chaque position a son type\nconst point: [number, number] = [3, 7];\nconst entry: [string, number] = ["age", 28];\n\n// Destructuration typée\nconst [x, y] = point; // x: number, y: number\n\n// Longueur vérifiée : ni plus, ni moins\n// const bad: [number, number] = [1, 2, 3]; // erreur\n\n// Usage classique : retours multiples d'une fonction\nfunction parse(input: string): [boolean, string] {\n  return input.length > 0 ? [true, input.trim()] : [false, ""];\n}\nconst [ok, value] = parse(" hello ");`,
      },
      {
        kind: "list",
        items: [
          "Un tuple est un tableau dont chaque position est typée : l'ordre fait partie du contrat.",
          "Pratique pour les paires clé/valeur, les coordonnées, les retours `[succès, valeur]`.",
          "Au-delà de 2-3 éléments, préférez un objet nommé : `[string, number, boolean, string]` devient illisible.",
        ],
      },
    ],
  },
  {
    id: "tuples-nommes",
    title: "Tuples nommés",
    level: 3,
    intro: "Donner un nom à chaque position d'un tuple : la lisibilité sans le coût d'un objet.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Labeled tuples",
        code: `// Les labels documentent chaque position\ntype Point = [x: number, y: number];\nconst p: Point = [3, 7];\n\ntype Range = [start: number, end: number];\nfunction clamp(value: number, [min, max]: Range): number {\n  return Math.min(Math.max(value, min), max);\n}\n\n// Les labels apparaissent au survol et dans les erreurs\n// mais n'existent pas à l'exécution : p[0] reste la syntaxe d'accès`,
      },
      {
        kind: "text",
        text: "Les tuples nommés (TypeScript 4.0+) ne changent rien au comportement : ils ajoutent de la documentation là où un objet serait trop lourd. Le survol affiche `[x: number, y: number]` au lieu de `[number, number]` — un gain de lisibilité gratuit.",
      },
    ],
  },
  {
    id: "objets-anonymes",
    title: "Objets : les types anonymes",
    level: 3,
    intro: "Décrire la forme d'un objet directement dans l'annotation.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Types d'objets inline",
        code: `const user: { name: string; age: number } = {\n  name: "Akane",\n  age: 28,\n};\n\n// Objets imbriqués : l'annotation suit la structure\nconst config: {\n  host: string;\n  port: number;\n  tls: { enabled: boolean };\n} = {\n  host: "localhost",\n  port: 3000,\n  tls: { enabled: true },\n};\n\n// L'excès de propriétés est signalé sur les littéraux\n// const bad: { name: string } = { name: "x", extra: 1 }; // erreur`,
      },
      {
        kind: "text",
        text: "Les types d'objets inline conviennent aux usages ponctuels. Dès qu'une forme est réutilisée deux fois ou traverse une frontière de module, extrayez-la dans un `interface` ou un `type` nommé : la duplication des formes anonymes est une dette silencieuse.",
      },
    ],
  },
  {
    id: "proprietes-optionnelles",
    title: "Propriétés optionnelles",
    level: 3,
    intro: "Le `?` qui rend une propriété facultative — et ce qu'il implique.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Le point d'interrogation",
        code: `interface User {\n  name: string;\n  nickname?: string; // peut être absente\n}\n\nconst u1: User = { name: "Akane" }; // OK\nconst u2: User = { name: "Akane", nickname: "aka" }; // OK\n\nfunction greet(user: User): string {\n  // nickname est string | undefined : le strict l'impose\n  return user.nickname ? \`Salut \${user.nickname}\` : \`Salut \${user.name}\`;\n}\n\n// Avec exactOptionalPropertyTypes, l'assignation explicite\n// de undefined serait refusée : la propriété doit être absente.`,
      },
      {
        kind: "list",
        items: [
          "`nickname?: string` signifie `string | undefined` : en mode strict, chaque lecture doit gérer l'absence.",
          "Ne rendez optionnel que ce qui est réellement facultatif : trop de `?` dilue le contrat et multiplie les vérifications.",
          "Alternative : les unions de types pour des variantes exclusives plutôt qu'un objet à moitié optionnel.",
        ],
      },
    ],
  },
  {
    id: "signatures-d-index",
    title: "Signatures d'index",
    level: 3,
    intro: "Typer des objets dont on ne connaît pas les clés à l'avance.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Dictionnaires typés",
        code: `// Toutes les clés string mènent à un number\nconst scores: { [key: string]: number } = {\n  alice: 10,\n  bob: 20,\n};\n\nconst s: number = scores["alice"]; // number\n\n// Avec strict, une clé absente donne undefined...\n// ...mais le type dit number : angle mort connu\n// Préférez Record<string, number> (même effet, plus lisible)\n\n// Clés numériques possibles aussi\nconst byId: { [id: number]: string } = {\n  1: "Ada",\n  2: "Grace",\n};`,
      },
      {
        kind: "text",
        text: "Les signatures d'index modélisent les dictionnaires : clés dynamiques, valeurs homogènes. Limite connue : le compilateur ne peut pas savoir si une clé existe, le type promet une valeur même quand il n'y en a pas. Pour des clés connues à l'avance, préférez un objet aux propriétés explicites.",
      },
    ],
  },
  {
    id: "tableau-des-types-speciaux",
    title: "Les types spéciaux en un tableau",
    level: 3,
    intro: "`any`, `unknown`, `never`, `void`, `null`, `undefined` : les confusions fréquentes, tranchées.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Signifie", "Vérification", "Usage"],
        rows: [
          ["`any`", "N'importe quoi", "Aucune — le compilateur se tait", "À bannir ; dernier recours en migration"],
          ["`unknown`", "N'importe quoi, non vérifié", "Contrôle obligatoire avant usage", "Données externes : API, JSON.parse"],
          ["`never`", "Aucune valeur possible", "Totale", "Fonctions qui ne retournent jamais, exhaustivité"],
          ["`void`", "Pas de valeur de retour utile", "Totale", "Fonctions qui ne retournent rien"],
          ["`null`", "Absence volontaire", "Explicite en strict", "Valeur « vide » délibérée"],
          ["`undefined`", "Absence non initialisée", "Explicite en strict", "Propriété optionnelle, paramètre omis"],
        ],
      },
      {
        kind: "text",
        text: "La hiérarchie à retenir : `unknown` est le sommet sûr (tout y entre, rien n'en sort sans contrôle), `never` est le fond (rien n'y entre), `any` est l'échappatoire qui court-circuite tout le système. Chaque usage de `any` est une zone aveugle assumée.",
      },
    ],
  },
  {
    id: "unknown-et-gardes",
    title: "`unknown` et les gardes de type",
    level: 3,
    intro: "L'alternative sûre à `any` : accepter l'inconnu, puis le vérifier.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "unknown force la vérification",
        code: `// JSON.parse retourne any : le convertir en unknown est un réflexe sain\nconst data: unknown = JSON.parse('{"name": "Akane"}');\n\n// data.name; // erreur : unknown n'autorise aucune opération\n\n// Garde de type : après le test, le type est affiné\nif (typeof data === "object" && data !== null && "name" in data) {\n  // ici, data est affiné et utilisable\n  console.log((data as { name: string }).name);\n}\n\n// Prédicat personnalisé : réutilisable et lisible\nfunction isUser(value: unknown): value is { name: string } {\n  return (\n    typeof value === "object" &&\n    value !== null &&\n    "name" in value &&\n    typeof (value as { name: unknown }).name === "string"\n  );}\n\nif (isUser(data)) {\n  console.log(data.name); // data: { name: string } ici\n}`,
      },
      {
        kind: "text",
        text: "Le flux de travail : toute donnée externe (réponse HTTP, `JSON.parse`, entrée utilisateur) entre en `unknown`, traverse une garde, et n'est utilisée qu'affinée. C'est plus verbeux que `any` — et c'est exactement ce qui élimine une classe entière de bugs d'exécution.",
      },
    ],
  },
  {
    id: "never-en-detail",
    title: "`never` en détail",
    level: 3,
    intro: "Le type de l'impossible : quand il ne reste aucune valeur possible.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "never : deux usages fondamentaux",
        code: `// 1. Fonction qui ne retourne jamais\nfunction fail(message: string): never {\n  throw new Error(message);\n}\n\nfunction infinite(): never {\n  while (true) {\n    // boucle infinie\n  }\n}\n\n// 2. Preuve d'exhaustivité dans un switch\ntype Status = "idle" | "loading" | "done";\n\nfunction render(status: Status): string {\n  switch (status) {\n    case "idle":\n      return "En attente";\n    case "loading":\n      return "Chargement…";\n    case "done":\n      return "Terminé";\n    default:\n      // Si un cas manque, status n'est pas never : erreur\n      const exhaustive: never = status;\n      return exhaustive;\n  }\n}`,
      },
      {
        kind: "text",
        text: "Le `default` avec assignation à `never` est un filet de sécurité : ajoutez une valeur à l'union `Status` sans ajouter son `case`, et le compilateur hurle. C'est l'exhaustivité prouvée par le système de types — un motif central, détaillé dans la page Unions.",
      },
    ],
  },
  {
    id: "any-danger",
    title: "Le danger de `any`",
    level: 3,
    intro: "Pourquoi `any` est un anti-pattern — et les rares cas où il se justifie.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "any désactive tout",
        code: `function legacy(data: any) {\n  return data.user.profile.name; // aucune vérification\n  // Si data est null → crash à l'exécution, silence à la compilation\n}\n\n// Le any est contagieux : il se propage\nconst result = legacy({}); // result: any\nresult.anything.goes(); // aucune erreur détectée\n\n// Migration progressive : unknown + garde, pas any\nfunction safe(data: unknown) {\n  if (isUser(data)) {\n    return data.name; // vérifié\n  }\n  throw new Error("Format inattendu");\n}`,
      },
      {
        kind: "list",
        items: [
          "Chaque `any` est une zone où le compilateur ne vous protège plus : l'erreur réapparaît à l'exécution.",
          "`any` est contagieux : toute expression qui en touche un devient `any` à son tour.",
          "Exceptions légitimes : migration d'un gros code JS (temporaire, avec un plan de retrait), interopérabilité avec une bibliothèque non typée.",
          "Même en migration, préférez `unknown` : la vérification explicite documente ce que vous savez vraiment des données.",
        ],
      },
    ],
  },
  {
    id: "void",
    title: "`void`",
    level: 3,
    intro: "Le type des fonctions qui ne retournent rien d'utile.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "void en pratique",
        code: `function log(message: string): void {\n  console.log(message);\n  // pas de return avec une valeur\n}\n\n// void comme type de callback : le retour est ignoré\nfunction onClick(handler: () => void): void {\n  // ...\n}\n\n// Subtilité : une fonction retournant une valeur est assignable à () => void\nconst getNumber = (): number => 42;\nonClick(getNumber); // OK : la valeur est simplement ignorée`,
      },
      {
        kind: "text",
        text: "`void` signale « cette fonction s'exécute pour son effet, pas pour son résultat ». La subtilité d'assignabilité (`() => number` accepté là où `() => void` est attendu) existe pour les callbacks type `forEach` : le retour est ignoré, pas interdit.",
      },
    ],
  },
  {
    id: "null-et-undefined",
    title: "`null` et `undefined`",
    level: 3,
    intro: "Deux absences différentes — que le mode strict rend explicites.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Gérer l'absence en mode strict",
        code: `// En strict, null et undefined ne sont assignables qu'aux types qui les déclarent\nlet name: string | null = null; // absence volontaire\nlet nickname: string | undefined; // non initialisé\n\nfunction greet(n: string | null): string {\n  if (n === null) {\n    return "Anonyme";\n  }\n  return \`Bonjour \${n}\`; // n: string ici (narrowing)\n}\n\n// Enchaînement optionnel + coalescence : les opérateurs de l'absence\ndeclare const user: { profile?: { email?: string } };\nconst email: string = user.profile?.email ?? "non renseigné";`,
      },
      {
        kind: "list",
        items: [
          "`undefined` = pas encore défini (variable non initialisée, propriété absente, paramètre omis) ; `null` = vide délibéré, posé intentionnellement.",
          "En mode strict, `string` n'accepte ni l'un ni l'autre : l'absence doit être déclarée (`string | null`).",
          "`?.` évite le crash sur une chaîne d'accès, `??` fournit une valeur par défaut — mais seulement pour `null`/`undefined`, pas pour `0` ou `\"\"`.",
        ],
      },
    ],
  },
  {
    id: "enums",
    title: "Enums",
    level: 3,
    intro: "Nommer un ensemble fini de valeurs — avec un coût à connaître.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Enums et leur alternative",
        code: `// Enum numérique : valeurs auto-incrémentées\n// (génère du code JavaScript à la compilation)\nenum Direction {\n  Up, // 0\n  Down, // 1\n  Left, // 2\n  Right, // 3\n}\n\n// Enum de chaînes : plus lisible au débogage\nenum Status {\n  Idle = "idle",\n  Loading = "loading",\n  Done = "done",\n}\n\n// Alternative légère : union de littéraux (aucun code généré)\ntype StatusLite = "idle" | "loading" | "done";\n\nfunction setStatus(s: StatusLite): void {\n  /* ... */\n}\nsetStatus("idle"); // OK`,
      },
      {
        kind: "text",
        text: "Les enums génèrent du JavaScript réel (un objet de correspondance) : c'est à la fois leur force (valeurs accessibles à l'exécution) et leur coût. Pour un simple ensemble de valeurs connues à la compilation, une union de littéraux est plus légère et tout aussi sûre.",
      },
    ],
  },
  {
    id: "enums-vs-unions",
    title: "Enums vs unions de littéraux",
    level: 3,
    intro: "Choisir entre les deux formes d'ensembles finis, en connaissance de cause.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "Enum", "Union de littéraux"],
        rows: [
          ["Code généré", "Oui (objet JS réel)", "Non (effacé à la compilation)"],
          ["Valeurs à l'exécution", "Accessibles (`Status.Idle`)", "Inexistantes (juste des chaînes)"],
          ["Autocomplétion", "Oui", "Oui"],
          ["Exhaustivité en switch", "Oui", "Oui (avec `never`)"],
          ["Itération des valeurs", "Possible (`Object.values`)", "Manuelle (tableau `as const`)"],
          ["Interopérabilité", "Compliquée (objet propriétaire)", "Naturelle (chaînes simples)"],
          ["Recommandation", "Valeurs numériques, bidirectionnalité", "Cas général : plus simple, plus léger"],
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : par défaut, union de littéraux. Enum quand vous avez besoin des valeurs à l'exécution (mapping bidirectionnel nombre ↔ nom) ou quand une API externe impose ce format. Évitez les enums numériques implicites : `0`, `1`, `2` ne se lisent pas dans les logs.",
      },
    ],
  },
  {
    id: "const-assertions",
    title: "Assertions `as const`",
    level: 3,
    intro: "Figer un littéral dans son type le plus précis — d'un mot-clé.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "as const : du mutable vers le littéral",
        code: `// Sans as const : inférence élargie\nconst method = "GET"; // type: string (élargi)\n\n// Avec as const : type littéral conservé\nconst method2 = "GET" as const; // type: "GET"\n\n// Sur les objets : tout devient readonly et littéral\nconst config = {\n  host: "localhost",\n  port: 3000,\n  retries: [1, 2, 3],\n} as const;\n// config.host: "localhost" (pas string)\n// config.port = 8080; // erreur : readonly\n\n// Tableaux as const : tuples readonly de littéraux\nconst verbs = ["GET", "POST"] as const;\ntype Verb = (typeof verbs)[number]; // "GET" | "POST"`,
      },
      {
        kind: "text",
        text: "`as const` est l'outil le plus rentable du typage précis : il transforme des valeurs ordinaires en types littéraux sans les réécrire. Le motif `const X = [...] as const; type T = (typeof X)[number]` génère une union exhaustive à partir d'un tableau — la base des listes de valeurs maintenables.",
      },
    ],
  },
  {
    id: "elargissement-inference",
    title: "Élargissement de l'inférence",
    level: 3,
    intro: "Pourquoi `let` donne `string` et `const` donne `\"hello\"` : le widening.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Widening : les règles",
        code: `let a = "hello"; // let → élargi : string (réassignable)\nconst b = "hello"; // const → littéral : "hello" (non réassignable)\n\nlet n = 1; // number\nconst m = 1; // 1 (littéral)\n\n// let avec littéral explicite : pas d'élargissement\nlet mode: "a" | "b" = "a"; // reste "a" | "b"\n\n// Les objets s'élargissent aussi\nconst obj = { name: "Akane" }; // { name: string }, pas { name: "Akane" }\n\n// ...sauf avec as const (voir section précédente)\nconst frozen = { name: "Akane" } as const; // { readonly name: "Akane" }`,
      },
      {
        kind: "text",
        text: "L'élargissement (widening) est le compromis de l'inférence : `let` suppose que la valeur changera, donc élargit au type de base ; `const` sait qu'elle ne changera pas, donc conserve le littéral. Quand l'inférence vous surprend, c'est presque toujours le widening — corrigez avec une annotation explicite ou `as const`.",
      },
    ],
  },
  {
    id: "alias-de-types",
    title: "Alias de types",
    level: 3,
    intro: "Nommer un type pour le réutiliser : la première abstraction.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "type : nommer et composer",
        code: `// Nommer un type de base\ntype UserId = string;\ntype Port = number;\n\n// Documenter l'intention : deux string qui ne se mélangent pas\n// (au niveau des types, ils restent compatibles — voir branded types au niveau avancé)\n\n// Composer des alias\ntype ID = string | number;\ntype Coordinates = [number, number];\ntype Handler = (event: string) => void;\n\nfunction getUser(id: UserId): void {\n  // ...\n}`,
      },
      {
        kind: "list",
        items: [
          "Un alias ne crée pas un nouveau type : `UserId` reste `string` pour le compilateur. C'est de la documentation exécutable.",
          "Convention : `interface` pour les formes d'objets, `type` pour les unions, tuples, fonctions et alias de primitifs.",
          "Un alias utilisé trois fois mérite d'exister ; un alias utilisé une fois ajoute du bruit.",
        ],
      },
    ],
  },
  {
    id: "decrypter-les-erreurs-tsc",
    title: "Décrypter les erreurs de `tsc`",
    level: 3,
    intro: "Lire une erreur TypeScript comme un pro : anatomie et méthode.",
    blocks: [
      {
        kind: "command",
        label: "Reproduire une erreur lisible",
        command: "npx tsc --noEmit",
        why: "Affiche toutes les erreurs de type du projet sans émettre de fichiers. Chaque erreur suit le format `fichier(ligne,colonne) : error TSXXXX : message` : le code TSXXXX identifie la règle violée et se recherche dans la documentation.",
        verify: "npx tsc --noEmit 2>&1 | head -20",
      },
      {
        kind: "code",
        language: "bash",
        title: "Anatomie d'une erreur",
        code: `src/bases.ts(12,5): error TS2322: Type 'number' is not assignable to type 'string'.\n# │          │ │          │ └─ message : ce qui ne va pas, en clair\n# │          │ │          └─ code d'erreur : TS2322 = assignation incompatible\n# │          │ └─ error : c'est bloquant (vs un avertissement)\n# │          └─ colonne 5 : où exactement dans la ligne\n# └─ fichier et ligne : où chercher`,
      },
      {
        kind: "text",
        text: "Méthode : lire le message en entier (la fin contient souvent le type réellement inféré), aller à la ligne indiquée, comparer le type attendu et le type reçu. Si le message est cryptique, réduisez le cas : extrayez l'expression fautive dans une variable et survolez-la pour voir ce que le compilateur a compris.",
      },
    ],
  },
  {
    id: "tsconfig-pertinent",
    title: "`tsconfig.json` pertinent",
    level: 3,
    intro: "Les options qui comptent vraiment pour les types de base.",
    blocks: [
      {
        kind: "fields",
        title: "Option par option",
        fields: [
          {
            label: "`strict: true`",
            value:
              "Active `strictNullChecks`, `noImplicitAny` et les autres vérifications strictes. Sans lui, cette page perd la moitié de son sens.",
          },
          {
            label: "`noImplicitAny: true`",
            value:
              "Refuse les `any` implicites (paramètres non typés dont le type ne peut être inféré). Inclus dans `strict`, à connaître nommément.",
          },
          {
            label: "`strictNullChecks: true`",
            value:
              "Rend `null` et `undefined` explicites : `string` n'accepte plus l'absence. Inclus dans `strict`.",
          },
          {
            label: "`exactOptionalPropertyTypes: true`",
            value:
              "Optionnel strict : `nickname?: string` n'accepte plus l'assignation explicite de `undefined`. Plus précis, un peu plus exigeant.",
          },
          {
            label: "`noEmitOnError: true`",
            value:
              "N'émet aucun JavaScript tant qu'il reste une erreur de type : impossible d'ignorer silencieusement le compilateur.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-unitaires",
    title: "Tester des fonctions typées",
    level: 3,
    intro: "Les types ne remplacent pas les tests : ils se complètent.",
    blocks: [
      {
        kind: "command",
        label: "Installer Vitest en dépendance de développement",
        command: "npm install --save-dev vitest",
        why: "Vitest est le lanceur de tests standard de l'écosystème Vite : rapide, compatible avec TypeScript sans configuration, API proche de Jest. Les types vérifient les formes, les tests vérifient les comportements — les deux couches sont nécessaires.",
        verify: "npx vitest --version",
      },
      {
        kind: "code",
        language: "typescript",
        title: "src/math.test.ts",
        code: `import { describe, it, expect } from "vitest";\nimport { toCents } from "./math";\n\ndescribe("toCents", () => {\n  it("convertit les euros en centimes", () => {\n    expect(toCents(19.99)).toBe(1999);\n  });\n\n  it("arrondit les flottants", () => {\n    expect(toCents(10.005)).toBe(1001);\n  });\n});`,
      },
      {
        kind: "text",
        text: "Lancez avec `npx vitest run` (une fois) ou `npx vitest` (mode watch). Notez la répartition des rôles : TypeScript aurait signalé `toCents(\"19.99\")` à la compilation, mais seul le test détecte une erreur d'arrondi dans l'implémentation.",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Comment travaillent les professionnels",
    level: 3,
    intro: "Le flux quotidien d'un développeur qui type son code.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de développement typée",
        lines: [
          "Écrire (annotations aux frontières, inférence dedans)",
          "      ↓",
          "Survoler (vérifier les types inférés)",
          "      ↓",
          "npx tsc --noEmit (vérification globale)",
          "      ↓",
          "Lire l'erreur → corriger le type ou le code",
          "      ↓",
          "npx vitest run (les comportements)",
          "      ↓",
          "Commit (le typage fait partie de la revue)",
        ],
      },
      {
        kind: "list",
        items: [
          "Typer d'abord les signatures, coder ensuite : les annotations guident l'implémentation.",
          "Ne jamais commiter avec des erreurs `tsc` : la CI doit rejeter ce que le local a laissé passer.",
          "En revue de code, les types se relisent comme de la documentation : un nom de type obscur est un défaut.",
          "Mesurer la dette : un `grep -r \": any\" src` périodique montre où la vérification est désactivée.",
        ],
      },
    ],
  },
  {
    id: "organiser-ses-types",
    title: "Organiser ses types",
    level: 3,
    intro: "Où mettre les types quand le projet grandit.",
    blocks: [
      {
        kind: "diagram",
        title: "Progression de l'organisation",
        lines: [
          "Petit projet : types à côté du code qui les utilise",
          "     │",
          "     ▼",
          "Projet moyen : src/types.ts ou src/types/ (alias partagés)",
          "     │",
          "     ▼",
          "Grand projet : types par domaine (src/users/types.ts)",
          "     │",
          "     ▼",
          "Bibliothèque : types exportés depuis l'index (l'API publique)",
        ],
      },
      {
        kind: "text",
        text: "Règles : un type utilisé par un seul module reste dans ce module ; un type partagé par deux modules ou plus migre vers un emplacement partagé ; les types d'une bibliothèque font partie de son API publique et se versionnent comme elle. Évitez le fichier `types.ts` fourre-tout de 2000 lignes : organisez par domaine, pas par commodité.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques sur les types de base, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Utiliser `any` par facilité",
            value:
              "Problem : le code compile mais n'est plus vérifié ; le `any` se propage. Why : faire taire le compilateur au lieu de typer. Bad example : `function f(x: any) { return x.a.b; }`. Better : typer précisément, ou `unknown` + garde de type.",
          },
          {
            label: "Désactiver `strict` face aux erreurs",
            value:
              "Problem : `strict: false` laisse passer les erreurs de nullabilité et les `any` implicites. Why : corriger semble long. Bad example : passer `strict` à `false` pour 50 erreurs. Better : corriger progressivement, `strict` actif dès le départ.",
          },
          {
            label: "Confondre `String` et `string`",
            value:
              "Problem : l'objet wrapper `String` complique les comparaisons et n'apporte rien. Why : habitude d'autres langages. Bad example : `const s: String = \"x\"`. Better : toujours le primitif `string` en minuscule.",
          },
          {
            label: "Oublier d'annoter les tableaux vides",
            value:
              "Problem : `const xs = []` est inféré `never[]` (ou `any[]`) et refuse ensuite tout `push` typé. Why : l'inférence ne peut pas deviner le contenu. Bad example : `const xs = []; xs.push(\"a\");`. Better : `const xs: string[] = [];`.",
          },
          {
            label: "Croire que les types protègent à l'exécution",
            value:
              "Problem : caster des données d'API avec `as` sans validation. Why : les types sont effacés à la compilation. Bad example : `const u = data as User`. Better : valider (garde, schéma) avant de typer.",
          },
          {
            label: "Mélanger `number` et `bigint`",
            value:
              "Problem : l'arithmétique mixte est interdite et échoue à la compilation. Why : deux types numériques incompatibles. Bad example : `10n + 5`. Better : convertir explicitement (`BigInt(5)` ou `Number(x)`).",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Des repères de contexte, pas des règles absolues.",
    blocks: [
      {
        kind: "list",
        items: [
          "Strict dès le début : `strict: true` sur tout nouveau projet, sans négociation.",
          "Frontières explicites : paramètres et retours annotés ; inférence à l'intérieur des fonctions.",
          "Pas d'annotation redondante : `const n = 1` suffit, `const n: number = 1` est du bruit.",
          "`unknown` plutôt que `any` : l'inconnu se vérifie, il ne se subit pas.",
          "Nommage : les alias racontent une intention (`UserId`, `Port`), pas un mécanisme (`StringType`).",
          "Littéraux précis : préférez `\"idle\" | \"loading\"` à `string` quand l'ensemble est fini.",
          "Tableaux vides annotés : `const xs: string[] = []`, toujours.",
          "Survol systématique : si le type inféré surprend, comprendre avant de continuer.",
          "Tests + types : les types prouvent les formes, les tests prouvent les comportements.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : ces pratiques s'appliquent différemment selon le projet. Un script jetable n'a pas les mêmes exigences qu'une bibliothèque publique. La maturité, c'est savoir quand appliquer chaque pratique — et quand s'en dispenser consciemment.",
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
          {
            label: "Handbook — Everyday Types",
            value:
              "typescriptlang.org/docs/handbook/2/everyday-types : la référence officielle des types de base, avec exemples interactifs.",
          },
          {
            label: "Handbook — Narrowing",
            value:
              "typescriptlang.org/docs/handbook/2/narrowing : comment le compilateur affine les types après les vérifications.",
          },
          {
            label: "Référence tsconfig",
            value:
              "typescriptlang.org/tsconfig : chaque option expliquée, dont `strict` et ses sous-options.",
          },
          {
            label: "Playground",
            value:
              "typescriptlang.org/play : essayer les annotations dans le navigateur, erreurs en direct, sans rien installer.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Guides : la documentation de Vitest pour les tests, celle de votre framework pour l'intégration pratique.",
          "Community : le dépôt GitHub microsoft/TypeScript (issues, discussions) pour les cas limites.",
          "Practice : les projets progressifs de cette page, puis la relecture de code open source typé.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les types de base maîtrisés, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Interfaces : décrire des formes d'objets réutilisables au lieu de types anonymes.",
          "Fonctions : signatures précises, surcharges, types de callbacks.",
          "Unions : modéliser des états finis et affiner les types avec le narrowing.",
          "Génériques : des fonctions et structures réutilisables sans perdre la précision.",
          "Revenir à la roadmap : valider les types de base et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

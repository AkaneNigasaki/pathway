import type { LearningSection } from "../skill-guides";

/**
 * Learning Page des types avancés : mapped types, conditional types,
 * `infer`, template literal types, récursivité — programmer le système
 * de types au lieu de le subir.
 */
export const LEARNING_TYPES_AVANCES: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Les types avancés programment le système de types : transformer, brancher, extraire, calculer.",
    blocks: [
      {
        kind: "text",
        text: "Jusqu'ici, vous décriviez des types. Avec les types avancés, vous les calculez : les mapped types (`{ [K in keyof T]: ... }`) transforment chaque propriété d'un type, les conditional types (`T extends U ? X : Y`) branchent selon une condition, `infer` capture un type à l'intérieur d'un motif, les template literal types génèrent des unions de chaînes.",
      },
      {
        kind: "text",
        text: "C'est le niveau qui distingue un utilisateur de TypeScript d'un concepteur : écrire des bibliothèques dont les types s'adaptent aux usages, valider des conventions à la compilation, automatiser ce que les autres font à la main. Les utility types natifs (`Partial`, `Pick`, `Omit`) sont eux-mêmes écrits avec ces mécanismes — les comprendre en usage, c'était déjà les approcher.",
      },
      {
        kind: "text",
        text: "Avertissement honnête : la puissance a un coût. Un type trop clever devient illisible, ralentit le compilateur et rend les erreurs incompréhensibles. La discipline des types avancés, c'est d'automatiser le répétitif — pas d'impressionner le lecteur.",
      },
    ],
  },
  {
    id: "calculer-des-types-en-30-secondes",
    title: "Calculer des types en 30 secondes",
    level: 1,
    intro: "Les quatre mécanismes en un schéma.",
    blocks: [
      {
        kind: "diagram",
        title: "Les quatre opérations",
        lines: [
          "Mapped      : { [K in keyof T]: boolean }",
          "              « transformer chaque propriété »",
          "Conditional : T extends U ? X : Y",
          "              « brancher selon une condition »",
          "infer       : T extends Promise<infer U> ? U : T",
          "              « capturer le type contenu »",
          "Template    : `on${Capitalize<Event>}`",
          "              « générer des chaînes typées »",
          "",
          "Combinés : des types qui s'adaptent seuls.",
        ],
      },
      {
        kind: "text",
        text: "Retenez l'ordre d'apprentissage : mapped types d'abord (la syntaxe de transformation), conditional types ensuite (la logique), `infer` pour l'extraction, les template literals pour les chaînes. Chaque mécanisme se combine avec les précédents.",
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
    intro: "Ce qu'il faut maîtriser avant les types avancés, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations indispensables",
        fields: [
          {
            label: "Utility types",
            value:
              "`Partial`, `Pick`, `Omit`, `Record` en usage : ce sont des exemples de mapped et conditional types à comprendre d'abord.",
          },
          {
            label: "Génériques",
            value:
              "Paramètres `<T>`, contraintes `extends`, inférence : les types avancés sont des génériques qui calculent.",
          },
          {
            label: "Unions et narrowing",
            value:
              "Les conditional types distribuent sur les unions : sans les unions, la distributivité n'a pas de sens.",
          },
          {
            label: "`keyof` et `typeof`",
            value:
              "Lister les clés d'un type, capturer le type d'une valeur : les deux opérateurs d'introspection de base.",
          },
        ],
      },
      {
        kind: "text",
        text: "Si un prérequis est fragile, consolidez-le d'abord : les types avancés amplifient les lacunes au lieu de les combler. Un mapped type mal compris produit des erreurs que seul un bon modèle mental des génériques permet de déboguer.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro: "Les types avancés sont natifs : rien à installer.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier la version du compilateur",
        command: "npx tsc --version",
        why: "Mapped types, conditional types et `infer` existent depuis TypeScript 2.1-2.8 ; les template literal types depuis la 4.1, `satisfies` depuis la 4.9, les `const` type params depuis la 5.0. Une version récente (5.x) donne accès à tout le contenu de cette page.",
        verify: "npx tsc --noEmit",
      },
      {
        kind: "text",
        text: "Si votre projet est coincé sur une vieille version de TypeScript, certaines sections (template literals, `satisfies`) ne compileront pas. La montée de version se fait via `npm install --save-dev typescript@latest` — en vérifiant ensuite que `tsc --noEmit` reste silencieux.",
      },
    ],
  },
  {
    id: "configurer-le-target",
    title: "Configurer le target",
    level: 2,
    intro: "Les motifs avancés supposent un JavaScript cible moderne.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "tsconfig.json",
        code: `{\n  "compilerOptions": {\n    "strict": true,\n    "target": "ES2020",\n    "module": "ESNext",\n    "moduleResolution": "bundler"\n  }\n}`,
      },
      {
        kind: "text",
        text: "Un `target` bas (ES5, ES2015) n'empêche pas d'écrire des types avancés — les types sont effacés à la compilation — mais certaines constructions d'exécution associées (itérateurs, `??`, `?.`) exigent des libs adaptées. `ES2020` est un plancher raisonnable en 2026 ; les bundlers modernes (Vite, esbuild) ciblent de toute façon des navigateurs récents.",
      },
    ],
  },
  {
    id: "premier-mapped-type",
    title: "Premier mapped type",
    level: 2,
    intro: "La syntaxe `{ [K in keyof T]: ... }` : transformer chaque propriété.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Mapper un type",
        code: `interface User {\n  id: string;\n  name: string;\n  age: number;\n}\n\n// Pour chaque clé K de User, produire un boolean\ntype Flags = {\n  [K in keyof User]: boolean;\n};\n// { id: boolean; name: boolean; age: boolean }\n\nconst flags: Flags = { id: true, name: false, age: true };\n\n// Réimplémenter Partial soi-même : la démystification\ntype MyPartial<T> = {\n  [K in keyof T]?: T[K];\n};\ntype P = MyPartial<User>; // { id?: string; name?: string; age?: number }`,
      },
      {
        kind: "text",
        text: "Lisez `[K in keyof T]` comme une boucle sur les clés : pour chaque clé `K`, `T[K]` est le type de la propriété. Le `?` ajouté rend chaque propriété optionnelle — c'est exactement l'implémentation réelle de `Partial`. Écrire ses propres utilitaires est le meilleur exercice.",
      },
    ],
  },
  {
    id: "premier-conditional-type",
    title: "Premier conditional type",
    level: 2,
    intro: "La syntaxe `T extends U ? X : Y` : brancher selon une condition de types.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Brancher sur les types",
        code: `// Si T est un tableau, donner le type des éléments, sinon never\ntype Element<T> = T extends (infer U)[] ? U : never;\n\ntype A = Element<string[]>; // string\ntype B = Element<number>; // never\n\n// Exclure null et undefined\ntype NonNull<T> = T extends null | undefined ? never : T;\ntype C = NonNull<string | null>; // string\n\n// Choisir un type selon une condition\ntype IsString<T> = T extends string ? "oui" : "non";\ntype D = IsString<"hello">; // "oui"\ntype E = IsString<42>; // "non"`,
      },
      {
        kind: "text",
        text: "`T extends U` ne teste pas l'héritage au sens objet : il teste la compatibilité — « est-ce que `T` est assignable à `U` ? ». Le résultat est un type, pas une valeur : le branchement se produit à la compilation, sans aucun code généré.",
      },
    ],
  },
  {
    id: "infer-en-pratique",
    title: "`infer` en pratique",
    level: 2,
    intro: "Capturer un type à l'intérieur d'un motif.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Extraire avec infer",
        code: `// Extraire le type contenu d'une promesse\ntype Unwrap<T> = T extends Promise<infer U> ? U : T;\n\ntype A = Unwrap<Promise<string>>; // string\ntype B = Unwrap<number>; // number (pas une promesse : inchangé)\n\n// Extraire le retour d'une fonction (c'est ReturnType)\ntype MyReturn<T> = T extends (...args: any[]) => infer R ? R : never;\n\ndeclare function fetchUser(id: string): Promise<{ name: string }>;\ntype User = Unwrap<MyReturn<typeof fetchUser>>;\n// { name: string }\n\n// Extraire l'élément d'un tableau\ntype Item<T> = T extends (infer E)[] ? E : T;\ntype C = Item<string[]>; // string`,
      },
      {
        kind: "text",
        text: "`infer U` déclare une variable de type à l'intérieur du motif : si `T` correspond à `Promise<...>`, `U` capture le contenu. C'est le mécanisme derrière `ReturnType`, `Parameters`, `Awaited` — et derrière tous vos futurs extracteurs maison.",
      },
    ],
  },
  {
    id: "template-literals-en-pratique",
    title: "Template literal types en pratique",
    level: 2,
    intro: "Des unions de chaînes calculées, pas écrites à la main.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Générer des chaînes typées",
        code: `type Event = "click" | "hover" | "focus";\n\n// Générer les noms de handlers\ntype Handler = \`on\${Capitalize<Event>}\`;\n// "onClick" | "onHover" | "onFocus"\n\n// Routes typées\ntype Route = \`/users/\${string}\` | \`/posts/\${string}\`;\nconst r1: Route = "/users/123"; // OK\n// const r2: Route = "/other/123"; // erreur\n\n// Clés d'API dérivées\ntype Method = "get" | "post";\ntype Endpoint = \`\${Method}:/api/users\`;\n// "get:/api/users" | "post:/api/users"`,
      },
      {
        kind: "text",
        text: "Les template literal types portent les gabarits de chaînes au niveau des types : routes, noms d'événements, clés d'API. Ajoutez un membre à l'union source, les dérivés suivent — avec l'exhaustivité des `switch` qui casse proprement si un cas manque.",
      },
    ],
  },
  {
    id: "lire-les-types-des-bibliotheques",
    title: "Lire les types des bibliothèques",
    level: 2,
    intro: "La meilleure école : les `.d.ts` des bibliothèques que vous utilisez.",
    blocks: [
      {
        kind: "fields",
        title: "Méthode de lecture",
        fields: [
          {
            label: "`Ctrl` + clic sur un type importé",
            value:
              "Saute à sa définition dans `node_modules` : observez les mapped et conditional types en conditions réelles, pas dans des exemples jouets.",
          },
          {
            label: "Chercher les motifs connus",
            value:
              "Repérez `infer`, `[K in keyof`, `extends ... ?` : chaque occurrence est un cas d'école de ce que cette page enseigne.",
          },
          {
            label: "Survoler les appels",
            value:
              "L'inférence affichée au survol montre le calcul des types en action : paramètres capturés, retours dérivés.",
          },
          {
            label: "Comparer avant/après",
            value:
              "Pour un utilitaire maison, écrivez d'abord la version naïve (répétitive), puis la version calculée : le gain se mesure en lignes supprimées.",
          },
        ],
      },
      {
        kind: "text",
        text: "Les bibliothèques bien typées sont des manuels : chaque type exporté résout un vrai problème. Lisez-les activement — recopiez un motif qui vous plaît dans un fichier d'essai, modifiez-le, cassez-le, comprenez-le.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs : rendre les erreurs lisibles",
    level: 2,
    intro: "Les erreurs de types complexes sont verbeuses : outillez-vous.",
    blocks: [
      {
        kind: "fields",
        title: "VS Code — travailler avec des types complexes",
        fields: [
          {
            label: "Extension Pretty TypeScript Errors",
            value:
              "Reformate les erreurs de types complexes en messages lisibles, avec les différences mises en évidence. Indispensable dès les conditional types imbriqués.",
          },
          {
            label: "Survoler les alias intermédiaires",
            value:
              "Nommez chaque étape d'un calcul de types et survolez-la : le type affiché à chaque étape localise l'erreur.",
          },
          {
            label: "Playground TypeScript",
            value:
              "typescriptlang.org/play : isolez un type récalcitrant, expérimentez sans le bruit du projet.",
          },
          {
            label: "Raccourci « Go to Type Definition »",
            value:
              "Sur un type calculé, saute à sa définition plutôt qu'à sa déclaration : vous voyez le calcul, pas le résultat.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes-debut",
    title: "Erreurs fréquentes au début",
    level: 2,
    intro: "Les trois pièges de l'entrée dans les types avancés.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue express",
        fields: [
          {
            label: "`Type 'X' does not satisfy the constraint`",
            value:
              "Le paramètre ne respecte pas le `extends` : vérifiez la contrainte du générique avant le corps du type.",
          },
          {
            label: "Conditional type qui ne distribue pas",
            value:
              "`T extends U ? X : Y` avec `T` enveloppé (`[T] extends [U]`) ne distribue plus sur l'union. C'est parfois voulu, souvent une surprise.",
          },
          {
            label: "Récursion infinie",
            value:
              "Un type récursif sans cas de base fait exploser le compilateur (`Type instantiation is excessively deep`). Ajoutez toujours une condition d'arrêt.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro: "Quatre projets pour ancrer les types avancés.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Beginner — Utilitaires maison",
            value:
              "Réimplémentez `Partial`, `Pick`, `Required`, `Readonly` vous-même. Objectif : la syntaxe des mapped types.",
          },
          {
            label: "Intermediate — DeepPartial",
            value:
              "`Partial` récursif qui descend dans les objets imbriqués. Objectif : récursivité + cas de base.",
          },
          {
            label: "Advanced — Routeur typé",
            value:
              "Routes en littéraux, paramètres extraits par template literal types, handlers typés par route. Objectif : combiner les quatre mécanismes.",
          },
          {
            label: "Professional — Validateur de schéma",
            value:
              "Un schéma décrit une forme, le type est inféré du schéma, la validation d'exécution suit. Objectif : types calculés en conditions réelles.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "mapped-types-bases",
    title: "Mapped types : les bases",
    level: 3,
    intro: "L'anatomie complète de `{ [K in keyof T]: ... }`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Les trois parties d'un mapped type",
        code: `// [K in keyof T] : pour chaque clé K parmi les clés de T\n// T[K]          : le type de la propriété\n// Le corps       : ce qu'on en fait\n\ntype Nullable<T> = {\n  [K in keyof T]: T[K] | null;\n};\n\ninterface User {\n  id: string;\n  age: number;\n}\ntype N = Nullable<User>;\n// { id: string | null; age: number | null }\n\n// Mapper sur une union de clés arbitraire (pas forcément keyof)\ntype Flags = {\n  [K in "read" | "write" | "delete"]: boolean;\n};\n// { read: boolean; write: boolean; delete: boolean }`,
      },
      {
        kind: "text",
        text: "Un mapped type n'est pas limité à `keyof T` : il itère sur n'importe quelle union de clés (`string | number | symbol`). C'est ce qui permet de construire des objets ex nihilo (`Record` en est un cas particulier) autant que de transformer des types existants.",
      },
    ],
  },
  {
    id: "mapped-types-modificateurs",
    title: "Mapped types : modificateurs",
    level: 3,
    intro: "Ajouter ou retirer `?` et `readonly` pendant le mapping.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Les modificateurs + et -",
        code: `interface Example {\n  readonly id: string;\n  name?: string;\n  age: number;\n}\n\n// -readonly retire, -? rend obligatoire : tout devient mutable et requis\ntype MutableRequired<T> = {\n  -readonly [K in keyof T]-?: T[K];\n};\ntype M = MutableRequired<Example>;\n// { id: string; name: string; age: number }\n\n// +? explicite (comportement par défaut : les modificateurs sont conservés)\ntype KeepOptional<T> = {\n  [K in keyof T]+?: T[K];\n};\n\n// Rendre readonly seulement certaines clés\ntype ReadonlyBy<T, K extends keyof T> = Omit<T, K> &\n  Readonly<Pick<T, K>>;`,
      },
      {
        kind: "text",
        text: "Par défaut, un mapped type conserve les modificateurs (`readonly`, `?`) du type source — c'est l'homomorphisme. Les préfixes `-` et `+` permettent de les retirer ou de les forcer explicitement. Retenez : `-readonly` et `-?` pour normaliser, rien pour conserver.",
      },
    ],
  },
  {
    id: "mapped-types-homomorphes",
    title: "Mapped types homomorphes",
    level: 3,
    intro: "Pourquoi `Partial` préserve les modificateurs : l'homomorphisme.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Homomorphe vs non homomorphe",
        code: `interface Example {\n  readonly id: string;\n  name?: string;\n}\n\n// Homomorphe : \"in keyof T\" → modificateurs conservés\ntype H<T> = { [K in keyof T]?: T[K] };\ntype H1 = H<Example>;\n// { readonly id?: string; name?: string }\n// id reste readonly !\n\n// Non homomorphe : \"in\" sur autre chose → modificateurs perdus\ntype NH<T> = { [K in keyof T & string]?: T[K] };\ntype NH1 = NH<Example>;\n// { id?: string; name?: string }\n// id a perdu son readonly\n\n// Conséquence pratique : pour VRAIMENT tout rendre mutable,\n// utilisez -readonly explicitement (voir section précédente)`,
      },
      {
        kind: "text",
        text: "Un mapped type est homomorphe quand il itère exactement sur `keyof T` : il préserve alors `readonly` et `?`. Toute transformation des clés (`& string`, `as`, union externe) brise l'homomorphisme. C'est subtil, rarement bloquant — mais c'est l'explication quand un `readonly` survit ou disparaît mystérieusement.",
      },
    ],
  },
  {
    id: "key-remapping",
    title: "Remapping des clés avec `as`",
    level: 3,
    intro: "Renommer ou filtrer les clés pendant le mapping.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "La clause as",
        code: `interface User {\n  id: string;\n  name: string;\n  age: number;\n}\n\n// Renommer : préfixer chaque clé\ntype Prefixed = {\n  [K in keyof User as \`user_\${string & K}\`]: User[K];\n};\n// { user_id: string; user_name: string; user_age: number }\n\n// Filtrer : exclure des clés (never les retire)\ntype NoId = {\n  [K in keyof User as K extends "id" ? never : K]: User[K];\n};\n// { name: string; age: number }\n\n// Générer des getters typés\ntype Getters<T> = {\n  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];\n};\ntype UserGetters = Getters<User>;\n// { getId: () => string; getName: () => string; getAge: () => number }`,
      },
      {
        kind: "text",
        text: "La clause `as` transforme les clés pendant l'itération : renommage via template literals, filtrage via `never`. Le `string & K` est nécessaire car `Capitalize` exige une `string` et `K` peut être `string | number | symbol`. C'est le mécanisme derrière les utilitaires de renommage des bibliothèques.",
      },
    ],
  },
  {
    id: "conditional-types-bases",
    title: "Conditional types : les bases",
    level: 3,
    intro: "L'anatomie de `T extends U ? X : Y` et ce que `extends` teste vraiment.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Ce que extends vérifie",
        code: `// extends = \"est assignable à\" : compatibilité, pas héritage\ntype A = string extends string ? true : false; // true\ntype B = "hello" extends string ? true : false; // true (littéral → base)\ntype C = string extends "hello" ? true : false; // false (base → littéral : non)\ntype D = number extends any ? true : false; // true\ntype E = any extends number ? true : false; // boolean ! (any est ambigu)\n\n// Conditions en chaîne : le \"switch\" des types\ntype TypeName<T> = T extends string\n  ? "string"\n  : T extends number\n    ? "number"\n    : T extends boolean\n      ? "boolean"\n      : "unknown";\n\ntype F = TypeName<"x">; // \"string\"\ntype G = TypeName<Date>; // \"unknown\"`,
      },
      {
        kind: "text",
        text: "Deux subtilités : `any` des deux côtés d'un conditional donne `boolean` (les deux branches sont possibles) — source classique de bugs dans les types génériques. Et les chaînes de ternaires sont le « switch » des types : lisibles jusqu'à 3-4 branches, à refactorer au-delà.",
      },
    ],
  },
  {
    id: "distributivite",
    title: "Distributivité des conditional types",
    level: 3,
    intro: "Le comportement le plus important — et le plus surprenant — des conditional types.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Distribution sur les unions",
        code: `// Quand T est un paramètre \"nu\", le test se distribue sur chaque membre\ntype ToArray<T> = T extends any ? T[] : never;\n\ntype A = ToArray<string | number>;\n// string[] | number[]  (pas (string | number)[] !)\n\n// Pour empêcher la distribution : envelopper dans un tuple\ntype ToArrayNoDist<T> = [T] extends [any] ? T[] : never;\ntype B = ToArrayNoDist<string | number>;\n// (string | number)[]\n\n// C'est ainsi que Exclude fonctionne :\n// type Exclude<T, U> = T extends U ? never : T\ntype C = Exclude<"a" | "b" | "c", "a">;\n// \"b\" | \"c\" — chaque membre testé séparément, \"a\" devient never et disparaît`,
      },
      {
        kind: "text",
        text: "Règle : si le type testé est un paramètre générique « nu » (`T extends ...`), le conditional se distribue sur chaque membre de l'union. Pour tester l'union entière, enveloppez-la (`[T] extends [U]`). `Exclude`, `Extract`, `NonNullable` reposent tous sur la distribution — la comprendre, c'est les comprendre.",
      },
    ],
  },
  {
    id: "infer-patterns",
    title: "`infer` : les motifs courants",
    level: 3,
    intro: "La boîte à outils de l'extraction : les patterns à connaître par cœur.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Catalogue de patterns infer",
        code: `// Élément de tableau\ntype Item<T> = T extends (infer E)[] ? E : never;\n\n// Retour de fonction\ntype Ret<T> = T extends (...args: any[]) => infer R ? R : never;\n\n// Paramètres de fonction\ntype Args<T> = T extends (...args: infer A) => any ? A : never;\n\n// Contenu de promesse\ntype Unwrap<T> = T extends Promise<infer U> ? U : T;\n\n// Premier élément d'un tuple\ntype Head<T> = T extends [infer H, ...any[]] ? H : never;\ntype H = Head<["a", "b", "c"]>; // \"a\"\n\n// Queue d'un tuple\ntype Tail<T> = T extends [any, ...infer R] ? R : never;\ntype T2 = Tail<["a", "b", "c"]>; // [\"b\", \"c\"]\n\n// infer avec contrainte (TS 4.8+) : U doit être une string\ntype Str<T> = T extends infer U extends string ? U : never;`,
      },
      {
        kind: "text",
        text: "Chaque pattern suit la même grammaire : décrire la forme attendue avec `infer` à la place du morceau voulu. `infer` ne peut apparaître que dans la branche `extends` d'un conditional — c'est une capture, pas une déclaration libre. Avec une contrainte (`infer U extends string`), la capture est validée.",
      },
    ],
  },
  {
    id: "template-literal-types-detail",
    title: "Template literal types en détail",
    level: 3,
    intro: "Au-delà des exemples simples : parsing et composition de chaînes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Parser des chaînes au niveau des types",
        code: `// Extraire un paramètre de route \"/users/:id\"\ntype Param<Path extends string> = Path extends \`\${string}:\${infer P}/\${infer Rest}\`\n  ? P | Param<Rest>\n  : Path extends \`\${string}:\${infer P}\`\n    ? P\n    : never;\n\ntype P1 = Param<"/users/:id">; // \"id\"\ntype P2 = Param<"/users/:id/posts/:postId">; // \"id\" | \"postId\"\n\n// Construire un objet de paramètres typé\ntype Params<Path extends string> = {\n  [K in Param<Path>]: string;\n};\ntype RP = Params<"/users/:id">; // { id: string }\n\n// Combiner : toutes les combinaisons méthode × route\ntype Method = "GET" | "POST";\ntype Path = "/users" | "/posts";\ntype Route = \`\${Method} \${Path}\`;\n// \"GET /users\" | \"GET /posts\" | \"POST /users\" | \"POST /posts\"`,
      },
      {
        kind: "text",
        text: "Les template literal types transforment des conventions de nommage en contrats vérifiés : routes, clés de cache, noms d'événements. Le parsing récursif (`Param`) montre la puissance combinée avec `infer` — mais c'est aussi là que la lisibilité se dégrade le plus vite. Documentez ces types avec des exemples.",
      },
    ],
  },
  {
    id: "types-recursifs",
    title: "Types récursifs",
    level: 3,
    intro: "Un type qui se référence : structures imbriquées et cas de base.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Récursivité maîtrisée",
        code: `// JSON : le type récursif canonique\ntype Json =\n  | string\n  | number\n  | boolean\n  | null\n  | Json[]\n  | { [key: string]: Json };\n\n// DeepPartial : Partial récursif (avec cas de base)\ntype DeepPartial<T> = T extends object\n  ? { [K in keyof T]?: DeepPartial<T[K]> }\n  : T;\n\ninterface Config {\n  host: string;\n  db: { port: number; ssl: { enabled: boolean } };\n}\ntype PC = DeepPartial<Config>;\n// { host?: string; db?: { port?: number; ssl?: { enabled?: boolean } } }\n\n// Limite connue : les tableaux deviennent des objets\n// (les tuples sont des object pour extends). Pour les préserver,\n// ajoutez une branche : T extends any[] ? DeepPartial<T[number]>[] : ...`,
      },
      {
        kind: "list",
        items: [
          "Tout type récursif exige un cas de base : ici `T extends object ? ... : T` — les primitifs arrêtent la récursion.",
          "Sans cas de base : `Type instantiation is excessively deep` — le compilateur abandonne.",
          "Les structures récursives réelles : JSON, arbres, commentaires imbriqués, menus.",
          "Attention aux tableaux : `extends object` les capture ; traitez-les explicitement si besoin.",
        ],
      },
    ],
  },
  {
    id: "keyof-typeof-avances",
    title: "`keyof` et `typeof` avancés",
    level: 3,
    intro: "L'introspection poussée : clés, valeurs, et leurs dérivations.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Opérateurs d'introspection",
        code: `const CONFIG = {\n  host: "localhost",\n  port: 3000,\n  debug: false,\n} as const;\n\n// keyof typeof : union des clés\ntype Key = keyof typeof CONFIG; // \"host\" | \"port\" | \"debug\"\n\n// (typeof X)[K] : le type des valeurs\ntype Value = (typeof CONFIG)[Key]; // \"localhost\" | 3000 | false\n\n// Filtrer les clés par type de valeur\ntype StringKeys<T> = {\n  [K in keyof T]: T[K] extends string ? K : never;\n}[keyof T];\n\ninterface Mixed {\n  a: string;\n  b: number;\n  c: string;\n}\ntype SK = StringKeys<Mixed>; // \"a\" | \"c\"\n// Mécanisme : mapped vers K|never, puis indexation [keyof T] pour unir`,
      },
      {
        kind: "text",
        text: "Le motif `{ [K in keyof T]: ... }[keyof T]` est l'idiome « filtrer des clés » : on mappe chaque clé vers elle-même ou `never`, puis on indexe par toutes les clés pour obtenir l'union des survivants. C'est la brique des utilitaires de filtrage maison.",
      },
    ],
  },
  {
    id: "satisfies",
    title: "`satisfies`",
    level: 3,
    intro: "Vérifier sans élargir : le chaînon entre annotation et inférence.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "satisfies : le meilleur des deux mondes",
        code: `interface Palette {\n  [color: string]: { r: number; g: number; b: number };\n}\n\n// Annotation classique : élargit, perd les clés littérales\nconst p1: Palette = { red: { r: 255, g: 0, b: 0 } };\n// p1.red est { r: number; ... } — les clés sont perdues\n\n// satisfies : vérifie la conformité SANS élargir\nconst p2 = {\n  red: { r: 255, g: 0, b: 0 },\n  blue: { r: 0, g: 0, b: 255 },\n} satisfies Palette;\n// p2.red.r est number, mais les clés \"red\" | \"blue\" sont conservées !\n\ntype ColorName = keyof typeof p2; // \"red\" | \"blue\"\n\n// Erreur si non conforme\n// const bad = { red: { r: \"x\", g: 0, b: 0 } } satisfies Palette; // erreur`,
      },
      {
        kind: "text",
        text: "`satisfies` (TypeScript 4.9+) vérifie qu'une valeur est conforme à un type tout en conservant son type inféré précis. Le cas d'usage roi : les objets de configuration dont on veut à la fois la validation et les clés littérales pour dériver des unions.",
      },
    ],
  },
  {
    id: "const-type-params",
    title: "Paramètres `const`",
    level: 3,
    intro: "L'inférence littérale par défaut : `function f<const T>`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "const type params (TS 5.0+)",
        code: `// Sans const : T s'élargit\ndeclare function get<T>(x: T): T;\nconst a = get(["a", "b"]); // string[]\n\n// Avec const : inférence \"as const\" implicite\ndeclare function getConst<const T>(x: T): T;\nconst b = getConst(["a", "b"]); // readonly [\"a\", \"b\"]\n\n// Cas réel : fabrique de routes typées\nfunction routes<const T extends string[]>(...paths: T): T {\n  return paths;\n}\nconst r = routes("/users", "/posts");\n// readonly [\"/users\", \"/posts\"] — les littéraux sont conservés\ntype R = (typeof r)[number]; // \"/users\" | \"/posts\"`,
      },
      {
        kind: "text",
        text: "Le modificateur `const` sur un paramètre de type applique l'inférence `as const` à l'argument : littéraux conservés, tableaux en tuples readonly. Idéal pour les fabriques (routes, schémas, configurations) où la précision des littéraux est la valeur ajoutée.",
      },
    ],
  },
  {
    id: "branded-types",
    title: "Branded types",
    level: 3,
    intro: "Des types nominalement distincts dans un système structurel.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Marquer les types",
        code: `// Deux string qui ne doivent pas se mélanger\ntype UserId = string & { readonly __brand: "UserId" };\ntype PostId = string & { readonly __brand: "PostId" };\n\ndeclare function getUser(id: UserId): void;\ndeclare function getPost(id: PostId): void;\n\nconst uid = "u-123" as UserId;\ngetUser(uid); // OK\n// getPost(uid); // erreur : UserId ≠ PostId\n\n// Fabrique : centraliser le marquage\nfunction toUserId(raw: string): UserId {\n  if (!raw.startsWith("u-")) throw new Error("ID invalide");\n  return raw as UserId;\n}`,
      },
      {
        kind: "list",
        items: [
          "TypeScript est structurel : `type A = string` et `type B = string` sont interchangeables. Le brand (`& { __brand }`) crée une distinction artificielle mais vérifiée.",
          "Le champ `__brand` n'existe qu'au niveau des types : aucun coût à l'exécution, aucune propriété réelle.",
          "Cas d'usage : identifiants, unités (mètres vs secondes), données validées vs brutes, montants en centimes vs euros.",
          "Ne brandez que ce qui traverse des frontières : un brand sur chaque variable locale est du bruit.",
        ],
      },
    ],
  },
  {
    id: "validation-compile-time",
    title: "Validation à la compilation",
    level: 3,
    intro: "Faire du compilateur un validateur de conventions.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Contraindre par les types",
        code: `// Les clés de traduction doivent exister dans les deux langues\ntype Lang = "fr" | "en";\ntype Key = "title" | "cta";\ntype Dict = Record<Lang, Record<Key, string>>;\n\nconst dict: Dict = {\n  fr: { title: "Bonjour", cta: "Allons-y" },\n  en: { title: "Hello", cta: "Go" },\n};\n// Oublier une clé ou une langue → erreur de compilation\n\n// Routes : seules les routes déclarées sont navigables\nconst ROUTES = ["/", "/about", "/contact"] as const;\ntype Route = (typeof ROUTES)[number];\n\nfunction navigate(to: Route): void {\n  // ...\n}\nnavigate("/about"); // OK\n// navigate(\"/secret\"); // erreur : route inconnue\n\n// États de machine : transitions autorisées\ntype Transition = {\n  idle: "loading";\n  loading: "success" | "error";\n  success: "idle";\n  error: "idle";\n};\nfunction next<S extends keyof Transition>(s: S, t: Transition[S]): void {\n  /* ... */\n}\n// next(\"idle\", \"success\"); // erreur : transition interdite`,
      },
      {
        kind: "text",
        text: "La validation à la compilation déplace des bugs d'exécution vers des erreurs de build : traductions manquantes, routes inexistantes, transitions illégales. Le coût est un typage plus exigeant ; le gain est une classe entière d'erreurs qui ne peut plus atteindre la production.",
      },
    ],
  },
  {
    id: "lire-les-fichiers-dts",
    title: "Lire les fichiers `.d.ts`",
    level: 3,
    intro: "Les déclarations de types : où vivent les types des bibliothèques.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Anatomie d'un .d.ts",
        code: `// node_modules/ma-lib/dist/index.d.ts (exemple simplifié)\ndeclare module "ma-lib" {\n  // Types exportés : l'API publique typée\n  export interface Options {\n    timeout?: number;\n  }\n  // Fonctions déclarées sans implémentation\n  export function connect(url: string, opts?: Options): Promise<Client>;\n  export interface Client {\n    send(data: string): void;\n    close(): void;\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "Un `.d.ts` décrit les types sans le code : `declare` annonce l'existence, l'implémentation est ailleurs (ou en JS).",
          "Les bibliothèques publient leurs `.d.ts` via le champ `types` du `package.json` ; TypeScript les résout automatiquement.",
          "Pour une lib sans types, `declare module \"x\"` dans un `.d.ts` local fournit une déclaration minimale — mieux que `any`.",
          "`skipLibCheck: true` ignore les erreurs dans les `.d.ts` tiers : pragmatique, car vous ne contrôlez pas ces fichiers.",
        ],
      },
    ],
  },
  {
    id: "ecrire-des-declarations",
    title: "Écrire ses déclarations",
    level: 3,
    intro: "Typer l'existant : `declare module` et l'augmentation.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Déclarations locales",
        code: `// types/legacy.d.ts — typer une lib JS sans types\ndeclare module "legacy-lib" {\n  export function parse(input: string): { ok: boolean; value: unknown };\n  export const version: string;\n}\n\n// Typer des imports non-code (avec un bundler)\ndeclare module "*.css" {\n  const classes: Record<string, string>;\n  export default classes;\n}\ndeclare module "*.png" {\n  const src: string;\n  export default src;\n}\n\n// Augmenter un module existant : ajouter une méthode\ndeclare module "./client" {\n  interface Client {\n    ping(): Promise<number>;\n  }\n}`,
      },
      {
        kind: "text",
        text: "Les déclarations locales vivent dans des `.d.ts` inclus par le `tsconfig` : elles comblent les trous du typage (lib JS, assets, variables globales) sans toucher au code. Règle : déclarez le minimum vrai — une déclaration mensongère est pire qu'aucune déclaration.",
      },
    ],
  },
  {
    id: "variance-bases",
    title: "Variance : les bases",
    level: 3,
    intro: "Quand `A<B>` est-il assignable à `A<C>` ? La variance répond.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Covariance au quotidien",
        code: `// Les tableaux sont covariants : Dog[] assignable à Animal[]\ninterface Animal {\n  name: string;\n}\ninterface Dog extends Animal {\n  bark(): void;\n}\nconst dogs: Dog[] = [];\nconst animals: Animal[] = dogs; // OK (covariance)\n\n// Les fonctions : paramètres contravariants (en strictFunctionTypes)\ntype Handler = (e: Dog) => void;\ntype GeneralHandler = (e: Animal) => void;\n// Une fonction acceptant Animal accepte aussi Dog :\nconst h: Handler = (e: Animal) => console.log(e.name); // OK\n\n// Retours covariants : un retour Dog convient où Animal est attendu\ntype Maker = () => Dog;\nconst m: () => Animal = (): Dog => ({ name: "Rex", bark() {} }); // OK`,
      },
      {
        kind: "text",
        text: "Intuition : les « sorties » (retours, propriétés lues) sont covariantes — un `Dog` convient où un `Animal` est attendu. Les « entrées » (paramètres) sont contravariantes — une fonction acceptant `Animal` convient où une fonction acceptant `Dog` est attendue. En pratique, vous croiserez la variance dans les erreurs de génériques : ce vocabulaire permet de les décoder.",
      },
    ],
  },
  {
    id: "performance-du-compilateur",
    title: "Performance du compilateur",
    level: 3,
    intro: "Les types avancés ont un coût : le mesurer et le contenir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Symptôme : `tsc` lent, éditeur qui rame sur certains fichiers, erreurs `Type instantiation is excessively deep`.",
          "Cause fréquente : récursion non bornée, unions énormes générées par template literals, conditional types imbriqués sur de gros types.",
          "Mesure : `npx tsc --extendedDiagnostics` affiche le temps par phase ; `--generateTrace` produit une trace analysable.",
          "Remède 1 : borner la récursion (profondeur max explicite) et la taille des unions générées.",
          "Remède 2 : préférer des interfaces nommées aux types anonymes calculés — le compilateur les met en cache mieux.",
          "Remède 3 : découper les types géants en étapes intermédiaires nommées.",
          "Règle : un type qui ralentit l'éditeur est un bug, même s'il est « correct ».",
        ],
      },
      {
        kind: "text",
        text: "La performance des types est une contrainte de conception au même titre que la lisibilité : un type brillant qui fait ramer toute l'équipe est un échec. Mesurez avant d'optimiser, et privilégiez toujours la solution la plus simple qui satisfait le besoin.",
      },
    ],
  },
  {
    id: "debugging-types-complexes",
    title: "Déboguer les types complexes",
    level: 3,
    intro: "Méthode systématique face à un type qui refuse de compiler.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Nommer chaque étape",
            detail:
              "Extrayez chaque niveau du calcul dans un alias (`type Step1 = ...`) et survolez-le : l'étape dont le type affiché diverge de l'attente est la fautive.",
          },
          {
            title: "Réduire au cas minimal",
            detail:
              "Reproduisez dans le playground avec des types jouets (`{ a: string }`). Si le cas minimal fonctionne, réintroduisez la complexité morceau par morceau.",
          },
          {
            title: "Vérifier la distributivité",
            detail:
              "Un conditional qui « ne marche pas » sur une union distribue souvent quand on ne veut pas (ou l'inverse). Testez avec un membre unique, puis l'union.",
          },
          {
            title: "Lire l'erreur en entier",
            detail:
              "Les erreurs de types complexes sont longues : la fin contient souvent le type réellement calculé. L'extension Pretty TypeScript Errors aide.",
          },
          {
            title: "Questionner la nécessité",
            detail:
              "Le type est-il vraiment nécessaire ? Un mapped type à 4 niveaux pour éviter 3 lignes de duplication est un mauvais échange.",
          },
        ],
      },
    ],
  },
  {
    id: "tsconfig-pertinent",
    title: "`tsconfig.json` pertinent",
    level: 3,
    intro: "Les options qui comptent pour les types avancés.",
    blocks: [
      {
        kind: "fields",
        title: "Option par option",
        fields: [
          {
            label: "`strict: true`",
            value:
              "Non négociable : les types avancés sans strict produisent des résultats imprécis qui masquent les erreurs.",
          },
          {
            label: "`skipLibCheck: true`",
            value:
              "Ignore les erreurs dans les `.d.ts` tiers : pragmatique quand les types avancés d'une bibliothèque sont bogués.",
          },
          {
            label: "`exactOptionalPropertyTypes: true`",
            value:
              "Affine les mapped types avec `?` : les propriétés optionnelles n'acceptent plus `undefined` explicite.",
          },
          {
            label: "`noUncheckedIndexedAccess: true`",
            value:
              "Les accès indexés dans les mapped types retournent `T | undefined` : plus sûr pour les dictionnaires.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-de-types",
    title: "Tester les types",
    level: 3,
    intro: "Prouver qu'un type calcule ce qu'on attend : les tests au niveau des types.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier les types sans émettre",
        command: "npx tsc --noEmit",
        why: "Le premier « test de types » est le compilateur lui-même : des assignations de test (`const x: MonType = ...`) qui compilent prouvent le comportement. Pour des bibliothèques, des fichiers de test dédiés (`types.test-d.ts`) centralisent ces vérifications.",
        verify: "npx tsc --noEmit",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Assertions de types",
        code: `// Utilitaire d'assertion : deux types sont-ils identiques ?\ntype Equals<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B\n  ? 1\n  : 2\n  ? true\n  : false;\n\ntype Element<T> = T extends (infer U)[] ? U : never;\n\n// Ces lignes compilent si et seulement si les types sont corrects\nconst t1: Equals<Element<string[]>, string> = true;\nconst t2: Equals<Element<number>, never> = true;\n// const t3: Equals<Element<string[]>, number> = true; // erreur : le test échoue\n\n// Pour l'égalité simple, l'assignation suffit souvent\nconst t4: Element<string[]> = "hello"; // OK si Element<string[]> = string`,
      },
      {
        kind: "text",
        text: "Les tests de types vivent dans des fichiers vérifiés par `tsc` : si une assertion est fausse, la compilation échoue. C'est le pendant statique des tests unitaires — indispensable pour les utilitaires maison partagés en équipe.",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Comment travaillent les professionnels",
    level: 3,
    intro: "La discipline des types avancés en équipe.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie d'un type avancé",
        lines: [
          "Besoin réel (duplication constatée, pas anticipée)",
          "      ↓",
          "Prototype dans le playground (cas minimal)",
          "      ↓",
          "Nommer chaque étape (alias intermédiaires)",
          "      ↓",
          "Documenter avec exemples (le type + 2-3 usages)",
          "      ↓",
          "Tests de types (assertions qui compilent)",
          "      ↓",
          "Revue (lisibilité par un pair, perf de l'éditeur)",
        ],
      },
      {
        kind: "list",
        items: [
          "Ne jamais introduire un type avancé « au cas où » : attendez la troisième duplication.",
          "Tout type non trivial est documenté avec des exemples : un futur lecteur ne doit pas reverse-engineer votre génie.",
          "En revue, la question n'est pas « est-ce clever ? » mais « un nouveau dev le comprendra-t-il en 5 minutes ? ».",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques des types avancés, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Récursion sans cas de base",
            value:
              "Problem : `Type instantiation is excessively deep`. Why : le type se rappelle indéfiniment. Bad example : DeepPartial sans branche `T extends object ? ... : T`. Better : toujours une condition d'arrêt.",
          },
          {
            label: "Distribution surprise",
            value:
              "Problem : un conditional produit une union inattendue. Why : `T` nu se distribue sur l'union. Bad example : `ToArray<string | number>` → `string[] | number[]`. Better : envelopper `[T] extends [U]` pour tester l'union entière.",
          },
          {
            label: "`any` dans un conditional",
            value:
              "Problem : le résultat est `boolean` au lieu d'une branche. Why : `any extends X` est ambigu. Bad example : `T extends string ? A : B` avec `T = any`. Better : contraindre les paramètres pour exclure `any`, ou tester explicitement.",
          },
          {
            label: "Types trop clever",
            value:
              "Problem : personne ne comprend le type, les erreurs sont cryptiques. Why : optimisation prématurée de la factorisation. Bad example : 4 niveaux de mapped imbriqués pour 3 champs. Better : écrire simplement, n'abstraire qu'à la troisième duplication.",
          },
          {
            label: "Oublier l'homomorphisme",
            value:
              "Problem : `readonly` qui survit ou disparaît mystérieusement. Why : mapped homomorphe vs non homomorphe. Bad example : `in keyof T & string` en espérant conserver les modificateurs. Better : `-readonly` / `-?` explicites quand on normalise.",
          },
          {
            label: "Performance ignorée",
            value:
              "Problem : l'éditeur rame, `tsc` lent. Why : unions géantes, récursion profonde. Bad example : template literals sur des unions de centaines de membres. Better : borner, nommer des étapes, mesurer avec `--extendedDiagnostics`.",
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
          "Besoin d'abord : la troisième duplication justifie l'abstraction, pas la première.",
          "Nommer chaque étape : un calcul de types se lit comme un pipeline documenté.",
          "Documenter avec exemples : le type seul ne suffit jamais pour les non-initiés.",
          "Tester les types : des assertions qui compilent pour chaque utilitaire maison.",
          "Borne la récursion : cas de base explicite, profondeur raisonnable.",
          "Maîtriser la distributivité : savoir quand elle aide et quand l'envelopper.",
          "Préférer `satisfies` aux annotations élargissantes pour les configs.",
          "Mesurer la perf : un type qui ralentit l'éditeur est un bug.",
          "Relire les `.d.ts` des bibliothèques : la meilleure école, en continu.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : dans une bibliothèque publique, les types avancés sont un investissement rentable (chaque utilisateur en profite). Dans une application, ils doivent rester rares et justifiés. La maturité, c'est la retenue.",
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
            label: "Handbook — Mapped Types",
            value:
              "typescriptlang.org/docs/handbook/2/mapped-types : la référence, des bases au remapping de clés.",
          },
          {
            label: "Handbook — Conditional Types",
            value:
              "typescriptlang.org/docs/handbook/2/conditional-types : distributivité, `infer`, contraintes.",
          },
          {
            label: "Handbook — Template Literal Types",
            value:
              "typescriptlang.org/docs/handbook/2/template-literal-types : manipulation de chaînes au niveau des types.",
          },
          {
            label: "Release notes",
            value:
              "Les notes de version (4.1, 4.9, 5.0) documentent `satisfies`, les `const` type params, les variadic tuples : l'histoire des fonctionnalités.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Playground : typescriptlang.org/play pour prototyper chaque type de cette page en isolation.",
          "Pratique : réimplémentez les utilitaires natifs, puis lisez leurs vraies définitions dans `lib.es5.d.ts`.",
        ],
      },
    ],
  },
  {
    id: "utilitaires-personnalises",
    title: "Écrire ses utilitaires",
    level: 3,
    intro: "Composer les briques (mapped, conditional, infer) en utilitaires sur mesure.",
    blocks: [
      {
        kind: "code",
        language: "ts",
        title: "DeepPartial et DeepReadonly",
        code: `// Partial récursif : utile pour les formulaires imbriqués, les patchs API\ntype DeepPartial<T> = {\n  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];\n};\n\ninterface Config {\n  server: { host: string; port: number };\n  debug: boolean;\n}\n\nconst patch: DeepPartial<Config> = {\n  server: { port: 8080 }, // host optionnel aussi\n};\n\n// Readonly récursif\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];\n};`,
      },
      {
        kind: "list",
        items: [
          "Recette : mapped type pour itérer, conditional type pour la récursion, cas de base (`T[K] extends object ? … : T[K]`).",
          "Attention aux tableaux et fonctions : `T[K] extends object` est vrai pour les tableaux — traitez-les explicitement si besoin (`T extends any[] ? …`).",
          "Les utilitaires maison se testent : écrivez des assignations qui doivent compiler et d'autres qui doivent échouer (vérifiées via `@ts-expect-error`).",
          "Ne réinventez pas `Partial` ou `Pick` : un utilitaire personnalisé naît d'un besoin récurrent, pas d'un exercice de style.",
        ],
      },
    ],
  },
  {
    id: "variance",
    title: "Variance : sous-typage des fonctions",
    level: 3,
    intro: "Quand une fonction est-elle assignable à un autre type de fonction ?",
    blocks: [
      {
        kind: "code",
        language: "ts",
        title: "Contravariance des paramètres, covariance des retours",
        code: `interface Animal {\n  nom: string;\n}\ninterface Chien extends Animal {\n  aboie(): void;\n}\n\n// Paramètres : CONTRAvariants (avec strictFunctionTypes)\n// (a: Animal) => void accepte tout ce que (c: Chien) => void accepte\nconst f: (c: Chien) => void = (a: Animal) => console.log(a.nom); // OK\n\n// Retours : COVariants\nconst g: () => Animal = (): Chien => ({ nom: "Rex", aboie() {} }); // OK\n\n// Les tableaux sont covariants (historique, pas totalement sûr)\nconst chiens: Chien[] = [];\nconst animaux: Animal[] = chiens; // OK, mais…\nanimaux.push({ nom: "Félix" }); // …un Animal non-Chien entre dans chiens !`,
      },
      {
        kind: "list",
        items: [
          "Règle : les paramètres sont contravariants (on peut élargir le type accepté), les retours sont covariants (on peut préciser le type renvoyé).",
          "`strictFunctionTypes` active la vérification stricte des paramètres — sauf pour les méthodes, restées bivariantes pour compatibilité.",
          "La covariance des tableaux est un trou historique : préférez `readonly Animal[]` quand le tableau ne doit pas être modifié.",
          "En pratique : si une assignation de fonction échoue, vérifiez le sens — élargir les paramètres, préciser les retours.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Types avancés maîtrisés, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Modules : organiser les types avancés partagés dans une architecture propre.",
          "Mode strict : pousser `exactOptionalPropertyTypes` et les options fines avec les mapped types.",
          "Outillage : publier une bibliothèque avec des `.d.ts` propres et des tests de types.",
          "Migration : appliquer ces motifs pour typer progressivement un gros code JavaScript.",
          "Revenir à la roadmap : valider les types avancés et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

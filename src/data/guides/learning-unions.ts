import type { LearningSection } from "../skill-guides";

/**
 * Learning Page des unions, littéraux et narrowing : modéliser des états
 * finis, affiner les types au fil des vérifications, prouver l'exhaustivité.
 */
export const LEARNING_UNIONS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Les unions expriment qu'une valeur peut être de plusieurs types ; le narrowing resserre ce type au fil des vérifications.",
    blocks: [
      {
        kind: "text",
        text: "Une union `string | number` déclare : « cette valeur est une chaîne ou un nombre ». Le compilateur n'autorise alors que les opérations valables pour les deux. Les types littéraux vont plus loin : `'draft' | 'published'` restreint aux valeurs exactes — idéal pour modéliser des états finis (statut, étape, rôle).",
      },
      {
        kind: "text",
        text: "Le narrowing (affinement) est l'analyse de flux de contrôle de TypeScript : après un test (`typeof x === \"string\"`, `status === \"done\"`), le compilateur sait que dans cette branche, `x` est une `string`. Vous n'avez rien à déclarer : la vérification à l'exécution affine le type statique.",
      },
      {
        kind: "text",
        text: "Le motif roi : les unions discriminées. Plusieurs interfaces partagent un champ discriminant (`kind: \"circle\" | \"square\"`) ; un `switch` sur ce champ traite chaque cas, et une assignation à `never` en `default` prouve qu'aucun cas n'est oublié. Le compilateur devient exhaustif à votre place.",
      },
    ],
  },
  {
    id: "unions-litteraux-narrowing-en-30-secondes",
    title: "Unions, littéraux et narrowing en 30 secondes",
    level: 1,
    intro: "Le triptyque en un schéma.",
    blocks: [
      {
        kind: "diagram",
        title: "Du possible vers le certain",
        lines: [
          "Union : string | number | boolean",
          "   « la valeur est l'un de ces types »",
          "     │",
          "     ▼",
          "Littéraux : \"idle\" | \"loading\" | \"error\"",
          "   « la valeur est exactement l'une de celles-ci »",
          "     │",
          "     ▼",
          "Narrowing : if (typeof x === \"string\") { ... }",
          "   « dans cette branche, x est une string »",
          "     │",
          "     ▼",
          "Exhaustivité : switch + never",
          "   « tous les cas sont traités, prouvé par le compilateur »",
        ],
      },
      {
        kind: "text",
        text: "Retenez l'enchaînement : modéliser avec des unions, préciser avec des littéraux, affiner avec des tests, verrouiller avec `never`. C'est le squelette de la gestion d'états typée.",
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
    intro: "Ce qu'il faut maîtriser avant les unions, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations indispensables",
        fields: [
          {
            label: "Types de base",
            value:
              "Connaître `string`, `number`, `boolean`, `null`, `undefined` : une union combine ces briques.",
          },
          {
            label: "Objets et interfaces",
            value:
              "Savoir décrire des objets pour construire des unions d'interfaces discriminées.",
          },
          {
            label: "Fonctions",
            value:
              "Comprendre les signatures pour typer les retours multiples (`string | null`).",
          },
          {
            label: "Conditions JavaScript",
            value:
              "`if`, `switch`, `typeof`, `instanceof` : le narrowing s'appuie sur ces tests d'exécution.",
          },
        ],
      },
      {
        kind: "text",
        text: "Prérequis TypeScript : le mode `strict` doit être actif — sans `strictNullChecks`, `null` et `undefined` se glissent partout et les unions perdent leur précision.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro: "Les unions sont natives au langage : rien à installer.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier que le compilateur est prêt",
        command: "npx tsc --version",
        why: "Unions, littéraux et narrowing font partie de TypeScript lui-même : aucune dépendance. Cette commande confirme que `tsc` est disponible pour vérifier vos exercices.",
        verify: "npx tsc --noEmit",
      },
      {
        kind: "text",
        text: "La seule « installation » requise est conceptuelle : activez `strict: true` dans votre `tsconfig.json` (voir la section suivante) pour que les unions avec `null` / `undefined` soient explicites.",
      },
    ],
  },
  {
    id: "strict-null-checks",
    title: "Rendre `null` explicite",
    level: 2,
    intro:
      "La configuration qui donne tout son sens aux unions : `strictNullChecks`.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "tsconfig.json",
        code: `{\n  "compilerOptions": {\n    "strict": true\n  }\n}`,
      },
      {
        kind: "code",
        language: "typescript",
        title: "Avec et sans strictNullChecks",
        code: `// Sans strict : null passe partout, silencieusement\n// let name: string = null; // autorisé (dangereux)\n\n// Avec strict : l'absence doit être déclarée\nlet name: string | null = null; // explicite\n\nfunction getLength(s: string | null): number {\n  // s peut être null : le compilateur l'impose\n  return s === null ? 0 : s.length;\n}`,
      },
      {
        kind: "text",
        text: "`strict` (qui inclut `strictNullChecks`) transforme `null` et `undefined` en membres d'union à part entière : ils doivent être déclarés et gérés. C'est le fondement du narrowing — sans lui, l'absence est invisible et les vérifications sont optionnelles.",
      },
    ],
  },
  {
    id: "premieres-unions",
    title: "Premières unions",
    level: 2,
    intro: "Déclarer et utiliser une union `A | B` au quotidien.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Unions de base",
        code: `// Une valeur, plusieurs types possibles\nlet id: string | number;\nid = "abc-123"; // OK\nid = 42; // OK\n// id = true; // erreur : boolean non autorisé\n\n// Seules les opérations communes sont permises\nfunction formatId(value: string | number): string {\n  return String(value); // String() accepte les deux\n  // return value.toFixed(2); // erreur : string n'a pas toFixed\n}\n\n// Retours multiples : le cas le plus fréquent\nfunction findUser(name: string): { name: string } | null {\n  return name === "Akane" ? { name } : null;\n}`,
      },
      {
        kind: "list",
        items: [
          "La syntaxe `A | B` autorise plusieurs types : le compilateur n'autorise que ce qui marche pour tous les membres.",
          "Pour utiliser une opération spécifique à un membre, il faut d'abord affiner (narrowing) — voir les sections suivantes.",
          "Les retours `T | null` / `T | undefined` sont le pain quotidien : recherche, accès optionnel, parsing.",
        ],
      },
    ],
  },
  {
    id: "litteraux-en-pratique",
    title: "Littéraux en pratique",
    level: 2,
    intro: "Des types à une seule valeur, combinés en unions d'états.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Unions de littéraux",
        code: `// Un littéral est un type à une seule valeur\ntype Status = "idle" | "loading" | "success" | "error";\n\nlet status: Status = "idle";\nstatus = "loading"; // OK\n// status = "pending"; // erreur : pas dans l'union\n\n// Littéraux numériques et booléens possibles aussi\ntype Dice = 1 | 2 | 3 | 4 | 5 | 6;\ntype Yes = true; // rarement utile seul, utile en union\n\n// Dans une fonction : les cas sont connus\nfunction label(status: Status): string {\n  if (status === "idle") return "En attente";\n  if (status === "loading") return "Chargement…";\n  if (status === "success") return "Terminé";\n  return "Erreur"; // le seul cas restant : "error"\n}`,
      },
      {
        kind: "text",
        text: "Les unions de littéraux remplacent avantageusement les enums dans la plupart des cas : aucune génération de code, interopérabilité naturelle (ce sont de simples chaînes), exhaustivité vérifiable. Réservez les enums aux cas où les valeurs doivent exister à l'exécution.",
      },
    ],
  },
  {
    id: "narrowing-typeof",
    title: "Narrowing avec `typeof`",
    level: 2,
    intro: "Le premier réflexe d'affinement : tester le type à l'exécution.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "typeof affine la branche",
        code: `function describe(value: string | number): string {\n  if (typeof value === "string") {\n    // ici, value: string — le compilateur le sait\n    return \`Texte de \${value.length} caractères\`;\n  }\n  // ici, value: number — le cas restant\n  return \`Nombre : \${value.toFixed(2)}\`;\n}\n\n// typeof couvre les primitifs : string, number, boolean,\n// bigint, symbol, undefined, function, object\nfunction handle(input: string | string[]): void {\n  if (typeof input === "string") {\n    console.log(input.toUpperCase()); // string\n  } else {\n    console.log(input.join(", ")); // string[]\n  }\n}`,
      },
      {
        kind: "text",
        text: "Après `typeof value === \"string\"`, le type dans la branche est `string` — sans annotation supplémentaire. C'est l'analyse de flux de contrôle : TypeScript suit votre logique et resserre les types en conséquence. Survolez la variable dans chaque branche pour le constater.",
      },
    ],
  },
  {
    id: "narrowing-operateur-in",
    title: "Narrowing avec l'opérateur `in`",
    level: 2,
    intro: "Affiner des unions d'objets en testant la présence d'une propriété.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "L'opérateur in",
        code: `type Circle = { kind: "circle"; radius: number };\ntype Square = { kind: "square"; side: number };\ntype Shape = Circle | Square;\n\nfunction area(shape: Shape): number {\n  if ("radius" in shape) {\n    // shape: Circle ici\n    return Math.PI * shape.radius ** 2;\n  }\n  // shape: Square ici\n  return shape.side ** 2;\n}\n\n// Le discriminant est encore plus direct (voir unions discriminées)\nfunction perimeter(shape: Shape): number {\n  if (shape.kind === "circle") {\n    return 2 * Math.PI * shape.radius; // Circle\n  }\n  return 4 * shape.side; // Square\n}`,
      },
      {
        kind: "text",
        text: "`in` teste l'existence d'une propriété à l'exécution et affine l'union en conséquence. Quand les membres partagent un champ discriminant (`kind`), préférez le test d'égalité sur ce champ : plus lisible, et c'est la base des unions discriminées.",
      },
    ],
  },
  {
    id: "premier-switch-discriminé",
    title: "Premier switch discriminé",
    level: 2,
    intro: "Le motif complet, pas à pas : union discriminée + switch + exhaustivité.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir les membres avec un discriminant commun",
            detail:
              "Trois interfaces `Loading`, `Success`, `Failure` partageant le champ `status: \"loading\" | \"success\" | \"failure\"`. Le discriminant est un littéral différent par membre.",
          },
          {
            title: "Créer l'union",
            detail:
              "`type RequestState = Loading | Success | Failure;`. Une seule valeur de ce type est toujours exactement l'un des trois cas.",
          },
          {
            title: "Écrire le switch sur le discriminant",
            detail:
              "`switch (state.status)` avec un `case` par valeur. Dans chaque `case`, le type est affiné : `state.data` n'existe que dans le cas `success`.",
          },
          {
            title: "Ajouter le filet `never`",
            detail:
              "En `default`, assignez `state` à une variable de type `never`. Si un cas manque, la compilation échoue : l'exhaustivité est prouvée.",
          },
          {
            title: "Tester l'exhaustivité",
            detail:
              "Ajoutez un quatrième membre à l'union sans ajouter son `case` : `tsc --noEmit` doit signaler l'oubli. Retirez-le ensuite.",
          },
        ],
      },
      {
        kind: "code",
        language: "typescript",
        title: "Le motif complet",
        code: `type RequestState =\n  | { status: "loading" }\n  | { status: "success"; data: string[] }\n  | { status: "failure"; error: string };\n\nfunction render(state: RequestState): string {\n  switch (state.status) {\n    case "loading":\n      return "Chargement…";\n    case "success":\n      return \`Reçu : \${state.data.length} éléments\`;\n    case "failure":\n      return \`Erreur : \${state.error}\`;\n    default:\n      const exhaustive: never = state;\n      return exhaustive;\n  }\n}`,
      },
    ],
  },
  {
    id: "editeurs-narrowing",
    title: "Voir le narrowing dans l'éditeur",
    level: 2,
    intro: "Le survol révèle l'affinement : l'outil d'apprentissage du narrowing.",
    blocks: [
      {
        kind: "fields",
        title: "VS Code — observer l'affinement",
        fields: [
          {
            label: "Survol après un test",
            value:
              "Survolez la variable avant puis après un `if (typeof x === ...)` : le type affiché change. C'est la preuve visuelle du narrowing.",
          },
          {
            label: "Survol dans chaque `case`",
            value:
              "Dans un switch discriminé, survolez `state` dans chaque branche : le membre de l'union correspondant s'affiche.",
          },
          {
            label: "`F12` sur le discriminant",
            value:
              "Saute à la définition de l'union : vérifiez que tous les membres partagent bien le même champ discriminant.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe : quand le narrowing ne se produit pas comme attendu, survolez la variable. Si le type affiché est plus large que prévu, c'est que le test ne permet pas au compilateur de trancher — reformulez le test (égalité stricte sur le discriminant, garde explicite).",
      },
    ],
  },
  {
    id: "erreurs-frequentes-debut",
    title: "Erreurs fréquentes au début",
    level: 2,
    intro: "Les trois erreurs que tout débutant rencontre avec les unions.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue express",
        fields: [
          {
            label: "`Property 'x' does not exist on type 'A | B'`",
            value:
              "Vous accédez à une propriété qui n'existe que sur un membre. Affinez d'abord avec un test (`typeof`, `in`, discriminant), puis accédez.",
          },
          {
            label: "`Object is possibly 'null'`",
            value:
              "Le mode strict vous rappelle qu'une union `T | null` peut être vide. Testez (`if (x)`, `?.`) avant usage.",
          },
          {
            label: "`Type 'X' is not assignable to type 'never'`",
            value:
              "Dans un `default` exhaustif, un cas n'est pas traité : le `state` restant n'est pas `never`. Ajoutez le `case` manquant.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro: "Quatre projets pour ancrer unions et narrowing.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Beginner — Parseur de configuration",
            value:
              "Fonction qui accepte `string | string[]` et normalise en `string[]`. Objectif : `typeof` et affinement de base.",
          },
          {
            label: "Intermediate — Machine à états d'un formulaire",
            value:
              "Union discriminée `idle | editing | submitting | done | error`, rendus par état. Objectif : switch exhaustif avec filet `never`.",
          },
          {
            label: "Advanced — Réponse d'API typée",
            value:
              "`{ ok: true; data: T } | { ok: false; error: string }` générique, avec garde `isOk`. Objectif : prédicats personnalisés.",
          },
          {
            label: "Professional — Réducteur d'état",
            value:
              "Actions en union discriminée, `switch` exhaustif, tests de chaque transition. Objectif : exhaustivité prouvée en conditions réelles.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "anatomie-union",
    title: "Anatomie d'une union",
    level: 3,
    intro: "Ce que `A | B` autorise, interdit et implique.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Règles de l'union",
        code: `type A = string | number;\n\n// 1. Assignation : chaque membre est accepté\nconst a1: A = "x";\nconst a2: A = 1;\n\n// 2. Opérations : seules les communes sont permises\nfunction f(x: A) {\n  x.toString(); // OK : existe sur string et number\n  // x.toFixed(); // erreur : n'existe pas sur string\n}\n\n// 3. Les unions s'aplatissent : (A | B) | C = A | B | C\ntype B = (string | number) | boolean; // string | number | boolean\n\n// 4. Les doublons disparaissent\ntype C = string | string; // string`,
      },
      {
        kind: "text",
        text: "Une union est un « ou » inclusif au niveau des types : la valeur est l'un des membres, et le compilateur exige un traitement valable pour chacun. Cette règle unique explique toutes les erreurs d'union : dès qu'une opération n'est pas commune, il faut affiner.",
      },
    ],
  },
  {
    id: "litteraux-en-detail",
    title: "Littéraux en détail",
    level: 3,
    intro: "Types à une seule valeur : au-delà des chaînes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Toutes les formes de littéraux",
        code: `// Littéraux de chaînes : le cas courant\ntype Method = "GET" | "POST" | "PUT" | "DELETE";\n\n// Littéraux numériques\ntype Dice = 1 | 2 | 3 | 4 | 5 | 6;\ntype HttpOk = 200;\n\n// Littéraux booléens (utiles en combinaison)\ntype FeatureFlag = { enabled: true; config: string } | { enabled: false };\n\n// Dériver une union depuis un tableau (motif as const)\nconst METHODS = ["GET", "POST", "PUT", "DELETE"] as const;\ntype Method2 = (typeof METHODS)[number]; // "GET" | "POST" | "PUT" | "DELETE"\n\n// Le tableau reste la source de vérité : ajoutez-y une valeur,\n// l'union suit automatiquement — et les switch deviennent non exhaustifs.`,
      },
      {
        kind: "text",
        text: "Le motif `as const` + `(typeof X)[number]` est la façon maintenable de définir des unions de littéraux : une seule source de vérité (le tableau), l'union dérivée automatiquement, et l'exhaustivité des `switch` qui casse dès qu'une valeur est ajoutée sans traitement.",
      },
    ],
  },
  {
    id: "unions-d-objets",
    title: "Unions d'objets",
    level: 3,
    intro: "Combiner des formes différentes — et accéder à leurs propriétés.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Propriétés communes et spécifiques",
        code: `interface Bird {\n  kind: "bird";\n  wingspan: number;\n}\ninterface Fish {\n  kind: "fish";\n  depth: number;\n}\ntype Animal = Bird | Fish;\n\nfunction describe(a: Animal): string {\n  // Propriété commune (même nom, types compatibles) : accès direct\n  const kind: "bird" | "fish" = a.kind;\n\n  // Propriété spécifique : affinement obligatoire\n  if (a.kind === "bird") {\n    return \`Oiseau, envergure \${a.wingspan} cm\`;\n  }\n  return \`Poisson, profondeur \${a.depth} m\`;\n}`,
      },
      {
        kind: "list",
        items: [
          "Les propriétés présentes sur tous les membres (avec des types compatibles) sont accessibles sans affinement.",
          "Les propriétés spécifiques exigent un narrowing : discriminant, `in`, ou garde.",
          "Sans discriminant commun, l'union reste utilisable mais chaque accès spécifique demande un test — d'où l'intérêt de toujours prévoir un champ discriminant.",
        ],
      },
    ],
  },
  {
    id: "unions-discriminees",
    title: "Unions discriminées : conception",
    level: 3,
    intro: "Le motif en profondeur : règles de conception d'un bon discriminant.",
    blocks: [
      {
        kind: "fields",
        title: "Règles du discriminant",
        fields: [
          {
            label: "Un champ commun, des littéraux distincts",
            value:
              "Chaque membre porte le même champ (`kind`, `status`, `type`) avec un littéral unique. C'est ce qui permet au compilateur de trancher.",
          },
          {
            label: "Littéraux, pas `string`",
            value:
              "Si le discriminant est typé `string` au lieu d'un littéral, l'affinement est impossible : le compilateur ne peut pas distinguer les membres.",
          },
          {
            label: "Nommer le discriminant par convention",
            value:
              "`kind`, `status`, `type` sont les noms usuels. La constance du nom à travers le projet rend les unions reconnaissables.",
          },
          {
            label: "Un membre = un cas métier",
            value:
              "Chaque membre représente un état réel distinct (chargement, succès, erreur), pas une variation technique. L'union modélise le domaine.",
          },
        ],
      },
      {
        kind: "code",
        language: "typescript",
        title: "Bon et mauvais discriminant",
        code: `// Bon : littéraux distincts\ntype Good =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; side: number };\n\n// Mauvais : discriminant trop large, affinement impossible\ntype Bad =\n  | { kind: string; radius: number }\n  | { kind: string; side: number };\n\nfunction area(s: Good): number {\n  return s.kind === "circle" ? Math.PI * s.radius ** 2 : s.side ** 2;\n  // s.radius n'existe que si kind === "circle" : le test tranche\n}`,
      },
    ],
  },
  {
    id: "narrowing-flux-controle",
    title: "Narrowing par flux de contrôle",
    level: 3,
    intro: "L'affinement suit votre logique : `if`, ternaires, early returns.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Le compilateur suit le flux",
        code: `function process(input: string | null | undefined): string {\n  // Early return : après ce point, input n'est plus null/undefined\n  if (input == null) {\n    return "vide";\n  }\n  // input: string ici\n  return input.trim().toUpperCase();\n}\n\nfunction check(value: string | number): void {\n  if (typeof value === "string" || value > 10) {\n    // Dans cette branche : string | number (le || élargit)\n  }\n  if (typeof value !== "string") {\n    // value: number ici (négation affine aussi)\n    console.log(value.toFixed(1));\n  }\n}\n\n// Les affectations réinitialisent l'affinement\nlet x: string | number = "a";\nx = 42; // x redevient string | number après réassignation`,
      },
      {
        kind: "text",
        text: "Le narrowing n'est pas lié à un test unique : c'est une analyse du flux. Early returns, négations, conditions composées — le compilateur resserre ou élargit le type à chaque point du programme. Une réassignation réinitialise l'affinement : le type redevient l'union complète.",
      },
    ],
  },
  {
    id: "typeof-guards",
    title: "Gardes `typeof` : le détail",
    level: 3,
    intro: "Ce que `typeof` distingue vraiment — et ses limites.",
    blocks: [
      {
        kind: "table",
        headers: ["Test", "Affine vers", "Limite"],
        rows: [
          ["`typeof x === \"string\"`", "`string`", "—"],
          ["`typeof x === \"number\"`", "`number`", "—"],
          ["`typeof x === \"boolean\"`", "`boolean`", "—"],
          ["`typeof x === \"undefined\"`", "`undefined`", "—"],
          ["`typeof x === \"function\"`", "`Function` / signature", "—"],
          ["`typeof x === \"object\"`", "`object`", "`null` aussi ! Tester `x !== null`"],
          ["`typeof x === \"bigint\"`", "`bigint`", "—"],
          ["`typeof x === \"symbol\"`", "`symbol`", "—"],
        ],
      },
      {
        kind: "text",
        text: "Le piège classique : `typeof null === \"object\"`. Pour affiner `object | null`, combinez les deux tests. Et `typeof` ne distingue pas les classes entre elles ni les formes d'objets : pour ça, `instanceof` et les prédicats personnalisés prennent le relais.",
      },
    ],
  },
  {
    id: "instanceof-guards",
    title: "Gardes `instanceof`",
    level: 3,
    intro: "Affiner vers des classes : le narrowing orienté objet.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "instanceof en pratique",
        code: `class NetworkError extends Error {\n  constructor(public code: number) {\n    super("Network error");\n  }\n}\nclass ValidationError extends Error {\n  constructor(public fields: string[]) {\n    super("Validation error");\n  }\n}\n\nfunction handle(error: NetworkError | ValidationError): string {\n  if (error instanceof NetworkError) {\n    // error: NetworkError — code accessible\n    return \`Réseau : code \${error.code}\`;\n  }\n  // error: ValidationError\n  return \`Champs invalides : \${error.fields.join(", ")}\`;\n}\n\n// instanceof fonctionne avec les classes natives aussi\nfunction stringify(value: Date | string): string {\n  return value instanceof Date ? value.toISOString() : value;\n}`,
      },
      {
        kind: "list",
        items: [
          "`instanceof` vérifie la chaîne de prototypes à l'exécution et affine vers la classe testée.",
          "Limite : deux copies d'une même classe (deux versions d'une bibliothèque) ne se reconnaissent pas — le prototype diffère.",
          "Pour les objets littéraux (pas des instances de classe), `instanceof` ne sert à rien : utilisez le discriminant ou `in`.",
        ],
      },
    ],
  },
  {
    id: "predicats-personnalises",
    title: "Prédicats personnalisés",
    level: 3,
    intro: "Écrire ses propres gardes avec `x is T` : le narrowing sur mesure.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Type predicates",
        code: `interface User {\n  id: string;\n  name: string;\n}\n\n// Le retour \"value is User\" est un prédicat de type\nfunction isUser(value: unknown): value is User {\n  return (\n    typeof value === "object" &&\n    value !== null &&\n    "id" in value &&\n    "name" in value\n  );\n}\n\nfunction greet(value: unknown): string {\n  if (isUser(value)) {\n    return \`Bonjour \${value.name}\`; // value: User\n  }\n  return "Inconnu";\n}\n\n// Les prédicats composent avec filter\nconst mixed: unknown[] = [{ id: "1", name: "Akane" }, 42, null];\nconst users: User[] = mixed.filter(isUser); // User[] !`,
      },
      {
        kind: "text",
        text: "Un prédicat `value is T` transforme une fonction de test en garde reconnue par le compilateur : le narrowing s'applique dans les `if`, les ternaires, et même `Array.filter`. C'est le pont entre vos validations d'exécution et le système de types — et la façon propre de traiter les données externes.",
      },
    ],
  },
  {
    id: "exhaustivite-never",
    title: "Exhaustivité avec `never`",
    level: 3,
    intro: "Prouver qu'aucun cas n'est oublié — le filet de sécurité ultime.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Le filet never",
        code: `type Event =\n  | { type: "click"; x: number; y: number }\n  | { type: "keypress"; key: string }\n  | { type: "scroll"; delta: number };\n\nfunction handleEvent(event: Event): void {\n  switch (event.type) {\n    case "click":\n      console.log(\`Clic en \${event.x},\${event.y}\`);\n      break;\n    case "keypress":\n      console.log(\`Touche \${event.key}\`);\n      break;\n    case "scroll":\n      console.log(\`Défilement \${event.delta}\`);\n      break;\n    default:\n      // Si un cas manque, event n'est PAS never → erreur TS2322\n      const exhaustive: never = event;\n      throw new Error(\`Cas non géré : \${JSON.stringify(exhaustive)}\`);\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "Ajoutez un membre à l'union sans son `case` : la compilation échoue sur l'assignation à `never`. L'oubli devient impossible à merger.",
          "Le `default` avec `never` sert aussi de documentation : « tous les cas sont traités ici ».",
          "Alternative sans `switch` : une fonction `assertNever(x: never): never` appelée en fin de chaîne `if/else`.",
        ],
      },
    ],
  },
  {
    id: "unions-vs-intersections",
    title: "Unions vs intersections",
    level: 3,
    intro: "`|` ou `&` : deux compositions opposées, à ne pas confondre.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Union `A | B`", "Intersection `A & B`"],
        rows: [
          ["Signifie", "L'un ou l'autre", "Les deux à la fois"],
          ["Valeur", "Un seul membre à la fois", "Doit satisfaire tous les membres"],
          ["Accès", "Propriétés communes seulement", "Toutes les propriétés"],
          ["Usage typique", "États, variantes, options", "Composition, mixins, extensions"],
        ],
      },
      {
        kind: "code",
        language: "typescript",
        title: "Contraste",
        code: `interface Named {\n  name: string;\n}\ninterface Aged {\n  age: number;\n}\n\n// Intersection : les deux formes à la fois\nconst person: Named & Aged = { name: "Akane", age: 28 };\nconsole.log(person.name, person.age); // tout est accessible\n\n// Union : l'une ou l'autre\nconst entity: Named | Aged = { name: "Akane" };\n// entity.age; // erreur : pas forcément présent\n\n// Intersection de littéraux incompatibles = never\ntype Impossible = "a" & "b"; // never : aucune valeur possible`,
      },
    ],
  },
  {
    id: "null-undefined-unions",
    title: "Unions avec `null` et `undefined`",
    level: 3,
    intro: "L'absence comme membre d'union : les opérateurs qui vont avec.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "?. et ?? : les compagnons de l'absence",
        code: `interface Profile {\n  email?: string;\n}\ninterface Account {\n  profile?: Profile | null;\n}\n\ndeclare const account: Account | null;\n\n// Enchaînement optionnel : s'arrête au premier null/undefined\nconst email = account?.profile?.email; // string | undefined\n\n// Coalescence : valeur par défaut si null/undefined\nconst display: string = email ?? "non renseigné";\n\n// ?? ne remplace QUE null/undefined (pas 0, pas "")\nconst count: number = 0;\nconst shown: number = count ?? 10; // 0, pas 10 !\n\n// Narrowing classique reste valable\nif (account !== null && account.profile) {\n  console.log(account.profile.email); // affiné\n}`,
      },
      {
        kind: "text",
        text: "`?.` et `??` sont du sucre syntaxique au-dessus du narrowing : ils évitent les pyramides de `if` pour les accès profonds. Mais ils ne remplacent pas l'affinement explicite quand la logique métier dépend du cas (erreur vs chargement vs vide) — là, l'union discriminée reste supérieure.",
      },
    ],
  },
  {
    id: "unions-generiques",
    title: "Unions et génériques",
    level: 3,
    intro: "Paramétrer les unions : le motif `Result<T>` et ses cousins.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Unions génériques",
        code: `// Le motif Result : succès ou échec, typé\ntype Result<T> =\n  | { ok: true; value: T }\n  | { ok: false; error: string };\n\nfunction parseNumber(input: string): Result<number> {\n  const n = Number(input);\n  return Number.isNaN(n)\n    ? { ok: false, error: \`"\${input}" n'est pas un nombre\` }\n    : { ok: true, value: n };\n}\n\nconst r = parseNumber("42");\nif (r.ok) {\n  console.log(r.value.toFixed(2)); // r.value: number\n} else {\n  console.error(r.error); // r.error: string\n}\n\n// Optionnel générique\ntype Maybe<T> = T | null | undefined;`,
      },
      {
        kind: "text",
        text: "Les unions génériques transforment des motifs ad hoc en abstractions réutilisables : `Result<T>`, `Maybe<T>`, `AsyncState<T>`. Le discriminant (`ok`) reste un littéral, donc tout le narrowing (switch, `if`, exhaustivité `never`) continue de fonctionner avec le paramètre `T`.",
      },
    ],
  },
  {
    id: "unions-de-fonctions",
    title: "Unions dans les signatures",
    level: 3,
    intro: "Paramètres et retours en union : la flexibilité contrôlée des API.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Signatures avec unions",
        code: `// Paramètre flexible : une valeur ou un producteur de valeur\nfunction resolve<T>(input: T | (() => T)): T {\n  return typeof input === "function"\n    ? (input as () => T)()\n    : input;\n}\n\n// Retour conditionnel : l'appelant gère les cas\nfunction divide(a: number, b: number): number | null {\n  return b === 0 ? null : a / b;\n}\n\nconst q = divide(10, 2); // number | null\nif (q !== null) {\n  console.log(q.toFixed(2)); // number\n}\n\n// Callbacks en union : attention à l'appel\ntype Handler = ((e: string) => void) | null;\ndeclare const handler: Handler;\n// handler("x"); // erreur : peut être null\nif (handler) handler("x"); // OK après vérification`,
      },
      {
        kind: "text",
        text: "Règle de conception : une union en paramètre rend l'API flexible (l'appelant choisit), une union en retour rend l'appelant responsable (il gère les cas). Les deux sont légitimes — mais un retour `T | null` silencieux vaut moins qu'un `Result<T>` explicite quand l'échec est un cas métier.",
      },
    ],
  },
  {
    id: "etats-ui",
    title: "États d'interface en unions",
    level: 3,
    intro: "Le cas d'usage roi des unions : modéliser le cycle de vie d'une vue.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "AsyncState : le motif standard",
        code: `type AsyncState<T> =\n  | { status: "idle" }\n  | { status: "loading" }\n  | { status: "success"; data: T }\n  | { status: "error"; error: string };\n\n// Chaque état porte exactement les données qu'il garantit :\n// - idle/loading : rien (pas de data fantôme)\n// - success : data est TOUJOURS présent\n// - error : error est TOUJOURS présent\n\nfunction View<T>(state: AsyncState<T>): string {\n  switch (state.status) {\n    case "idle":\n      return "En attente";\n    case "loading":\n      return "Chargement…";\n    case "success":\n      return \`Données : \${JSON.stringify(state.data)}\`;\n    case "error":\n      return \`Erreur : \${state.error}\`;\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "Avantage sur `{ data, loading, error }` séparés : les états impossibles (`loading` + `error` remplis) ne peuvent pas exister.",
          "Chaque branche du rendu accède à des données garanties : pas de `data?.` défensif dans le cas succès.",
          "Ce motif s'applique aux formulaires (idle/editing/submitting/done), aux étapes d'assistant, aux machines à états métier.",
        ],
      },
    ],
  },
  {
    id: "narrowing-limites",
    title: "Limites du narrowing",
    level: 3,
    intro: "Quand l'affinement ne traverse pas : closures, async, mutations.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Ce que le compilateur ne suit pas",
        code: `function delayed(value: string | null): void {\n  if (value === null) return;\n  // value: string ici...\n\n  setTimeout(() => {\n    // ...mais plus ici : la closure peut s'exécuter après réassignation\n    // console.log(value.toUpperCase()); // erreur en strict ? non...\n    // En fait : value est capturé, mais le narrowing ne traverse pas\n    // la frontière de fonction. Copiez dans une const :\n  }, 100);\n\n  const safe = value; // safe: string, figé\n  setTimeout(() => console.log(safe.toUpperCase()), 100); // OK\n}\n\n// Les propriétés mutables ne sont pas affinées durablement\ninterface Box {\n  content: string | null;\n}\ndeclare const box: Box;\nif (box.content !== null) {\n  // box.content: string ici...\n  mutate(box); // ...mais un appel peut l'avoir modifié\n  // box.content.toUpperCase(); // erreur : réaffinement nécessaire\n}`,
      },
      {
        kind: "text",
        text: "Le narrowing est une analyse locale et prudente : il ne traverse pas les frontières de fonctions (callbacks, `setTimeout`, `async`) ni les mutations possibles entre deux accès à une propriété mutable. Le remède est simple : copiez la valeur affinée dans une `const` locale — le type y est figé et le compilateur est rassuré.",
      },
    ],
  },
  {
    id: "deriver-des-unions",
    title: "Dériver des unions",
    level: 3,
    intro: "Générer des unions à partir de données : `as const`, `keyof`, utilitaires.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Trois sources de dérivation",
        code: `// 1. Depuis un tableau (source de vérité unique)\nconst ROLES = ["admin", "editor", "viewer"] as const;\ntype Role = (typeof ROLES)[number]; // "admin" | "editor" | "viewer"\n\n// 2. Depuis les clés d'un objet\nconst permissions = {\n  read: true,\n  write: false,\n  admin: false,\n};\ntype Permission = keyof typeof permissions; // "read" | "write" | "admin"\n\n// 3. Depuis les valeurs via un mapping\nconst STATUS_LABELS = {\n  idle: "En attente",\n  loading: "Chargement…",\n  done: "Terminé",\n} as const;\ntype StatusKey = keyof typeof STATUS_LABELS;\n// Les labels restent synchronisés avec les clés`,
      },
      {
        kind: "text",
        text: "Ne jamais écrire une union à la main quand elle peut être dérivée : la dérivation garantit la synchronisation (ajoutez un rôle au tableau, l'union suit, les `switch` non exhaustifs cassent proprement). C'est le principe DRY appliqué aux types.",
      },
    ],
  },
  {
    id: "unions-trop-larges",
    title: "Unions trop larges",
    level: 3,
    intro: "Quand l'union devient un fourre-tout : signes et remèdes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Signe : chaque usage exige une cascade de 5+ vérifications pour faire quoi que ce soit — l'union modélise trop de réalités différentes.",
          "Signe : des membres qui ne partagent aucune propriété ni aucun comportement — ce n'est plus une union, ce sont des types distincts.",
          "Remède 1 : scinder en plusieurs unions ciblées (une par contexte d'usage).",
          "Remède 2 : remonter l'affinement — affiner tôt (à la frontière : parsing, validation) pour manipuler des types précis à l'intérieur.",
          "Remède 3 : vérifier la modélisation — une union de 12 membres cache souvent deux concepts mélangés.",
        ],
      },
      {
        kind: "text",
        text: "Une union est un contrat : « la valeur est l'un de ces cas, traitez-les tous ». Si la liste des cas n'a plus de sens métier, le contrat est rompu. Les unions restent lisibles jusqu'à ~5-7 membres ; au-delà, c'est un signal de reconception, pas une fierté.",
      },
    ],
  },
  {
    id: "tsconfig-pertinent",
    title: "`tsconfig.json` pertinent",
    level: 3,
    intro: "Les options qui comptent pour les unions et le narrowing.",
    blocks: [
      {
        kind: "fields",
        title: "Option par option",
        fields: [
          {
            label: "`strictNullChecks: true`",
            value:
              "Le fondement : `null` et `undefined` deviennent des membres d'union explicites. Inclus dans `strict`.",
          },
          {
            label: "`noUncheckedIndexedAccess: true`",
            value:
              "Les accès par index (`arr[0]`, `dict[key]`) retournent `T | undefined` : l'absence possible devient une union à gérer. Plus sûr, plus verbeux.",
          },
          {
            label: "`exactOptionalPropertyTypes: true`",
            value:
              "Distingue propriété absente et propriété à `undefined` : affine la modélisation des objets partiels.",
          },
          {
            label: "`strict: true`",
            value:
              "Active tout le reste. Pour les unions, c'est non négociable.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-unions",
    title: "Tester les unions",
    level: 3,
    intro: "Prouver le comportement de chaque cas — les types ne suffisent pas.",
    blocks: [
      {
        kind: "command",
        label: "Installer Vitest",
        command: "npm install --save-dev vitest",
        why: "Les types garantissent que chaque cas est traité (exhaustivité), mais pas que chaque cas fait ce qu'il doit. Les tests vérifient le comportement de chaque membre de l'union.",
        verify: "npx vitest run",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Tester chaque membre",
        code: `import { describe, it, expect } from "vitest";\nimport { render, type RequestState } from "./states";\n\ndescribe("render", () => {\n  it("affiche le chargement", () => {\n    const s: RequestState = { status: "loading" };\n    expect(render(s)).toContain("Chargement");\n  });\n\n  it("affiche les données en cas de succès", () => {\n    const s: RequestState = { status: "success", data: ["a"] };\n    expect(render(s)).toContain("1 élément");\n  });\n\n  it("affiche l'erreur", () => {\n    const s: RequestState = { status: "failure", error: "timeout" };\n    expect(render(s)).toContain("timeout");\n  });\n});`,
      },
      {
        kind: "text",
        text: "Un test par membre de l'union : c'est la contrepartie exécutable de l'exhaustivité statique. Si un nouveau cas est ajouté à l'union, le `switch` casse à la compilation (filet `never`) et la suite de tests réclame son cas de test.",
      },
    ],
  },
  {
    id: "debugging-narrowing",
    title: "Déboguer le narrowing",
    level: 3,
    intro: "Quand l'affinement ne se produit pas : méthode de diagnostic.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Survoler la variable",
            detail:
              "Avant et après le test : le type affiché révèle ce que le compilateur a compris. Si l'affinement n'a pas eu lieu, le test n'est pas discriminant.",
          },
          {
            title: "Vérifier le discriminant",
            detail:
              "Le champ est-il un littéral (`\"circle\"`) ou un `string` large ? Un discriminant typé `string` ne permet aucun affinement.",
          },
          {
            title: "Isoler le test",
            detail:
              "Extrayez la condition dans une `const` et survolez-la : son type doit être un prédicat clair (`boolean` ne suffit pas toujours, préférez `x is T`).",
          },
          {
            title: "Chercher la mutation",
            detail:
              "Propriété mutable, réassignation, closure : le narrowing a pu être invalidé entre le test et l'usage. Copiez dans une `const` locale.",
          },
          {
            title: "Simplifier",
            detail:
              "Réduisez l'union au minimum reproductible dans le playground : si le cas minimal fonctionne, réintroduisez les membres un par un.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Comment travaillent les professionnels",
    level: 3,
    intro: "La discipline des unions dans une base de code d'équipe.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie d'une union",
        lines: [
          "Modéliser (états métier → union discriminée)",
          "      ↓",
          "Dériver (as const / keyof, jamais à la main)",
          "      ↓",
          "Affiner tôt (garde à la frontière : API, parsing)",
          "      ↓",
          "Traiter partout (switch exhaustif + never)",
          "      ↓",
          "Tester chaque cas (un test par membre)",
          "      ↓",
          "Revue (un nouveau membre = nouveau case + nouveau test)",
        ],
      },
      {
        kind: "list",
        items: [
          "Affiner aux frontières : dès les données validées, manipulez des types précis — pas des unions défensives jusqu'au fond du code.",
          "Le filet `never` est obligatoire dans tout `switch` sur union discriminée en code d'équipe.",
          "En revue : chaque nouveau membre d'union doit s'accompagner de son `case` et de son test, sinon la PR est incomplète.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques sur les unions, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Accéder sans affiner",
            value:
              "Problem : `Property 'x' does not exist on type 'A | B'`. Why : la propriété n'existe que sur un membre. Bad example : `shape.radius` sur `Circle | Square`. Better : tester le discriminant d'abord.",
          },
          {
            label: "Oublier un cas dans le switch",
            value:
              "Problem : comportement indéfini pour le cas manquant. Why : pas de filet `never`. Bad example : switch sans `default`. Better : `default` avec assignation à `never` — l'oubli devient une erreur de compilation.",
          },
          {
            label: "Discriminant typé `string`",
            value:
              "Problem : aucun narrowing possible. Why : `string` ne distingue pas les membres. Bad example : `{ kind: string }`. Better : littéraux distincts par membre.",
          },
          {
            label: "Narrowing à travers une closure",
            value:
              "Problem : le type affiné n'est plus valable dans un callback. Why : l'analyse ne traverse pas les frontières de fonctions. Bad example : utiliser `value` affiné dans `setTimeout`. Better : copier dans une `const` locale.",
          },
          {
            label: "`typeof null === \"object\"`",
            value:
              "Problem : `null` passe le test `typeof x === \"object\"`. Why : bizarrerie historique de JavaScript. Bad example : affiner `object | null` avec `typeof` seul. Better : combiner avec `x !== null`.",
          },
          {
            label: "Unions fourre-tout",
            value:
              "Problem : 12 membres sans cohérence, chaque usage exige 6 vérifications. Why : deux concepts mélangés. Bad example : `type Data = A | B | C | ... | L`. Better : scinder par contexte, affiner tôt.",
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
          "Discriminant systématique : toute union d'objets porte un champ discriminant en littéraux.",
          "Filet `never` : tout `switch` sur union discriminée se termine par une assignation à `never`.",
          "Dériver, ne pas écrire : `as const` + `(typeof X)[number]`, `keyof` — une seule source de vérité.",
          "Affiner tôt : valider et affiner aux frontières, manipuler des types précis à l'intérieur.",
          "Un test par membre : l'exhaustivité statique + l'exhaustivité des tests.",
          "Prédicats nommés : `isUser(x)` plutôt que des conditions inline répétées.",
          "Unions ciblées : 5-7 membres maximum par union ; au-delà, scinder.",
          "`?.` / `??` pour l'accès défensif, unions discriminées pour la logique métier.",
          "Ne pas confondre absence technique (`null`) et cas métier (`\"error\"`) : deux modélisations différentes.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : un prototype peut se contenter de `?.` défensif ; une base de code d'équipe exige des unions discriminées avec exhaustivité prouvée. La maturité, c'est choisir le niveau de rigueur adapté à la durée de vie du code.",
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
            label: "Handbook — Narrowing",
            value:
              "typescriptlang.org/docs/handbook/2/narrowing : la référence complète de l'affinement, avec tous les mécanismes.",
          },
          {
            label: "Handbook — Everyday Types",
            value:
              "typescriptlang.org/docs/handbook/2/everyday-types : unions et littéraux dans leur contexte.",
          },
          {
            label: "Handbook — More on Functions",
            value:
              "typescriptlang.org/docs/handbook/2/functions : prédicats `is`, assertions, signatures avec unions.",
          },
          {
            label: "Playground",
            value:
              "typescriptlang.org/play : expérimenter le narrowing, survolez les variables pour voir l'affinement en direct.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Community : le dépôt GitHub microsoft/TypeScript pour les discussions sur l'analyse de flux de contrôle.",
          "Practice : modélisez un flux réel (panier, authentification, import de fichier) en unions discriminées exhaustives.",
        ],
      },
    ],
  },
  {
    id: "in-operateur-avance",
    title: "Opérateur in : cas avancés",
    level: 3,
    intro: "Au-delà des bases : propriétés optionnelles, pièges des prototypes, combinaisons.",
    blocks: [
      {
        kind: "code",
        language: "ts",
        title: "in avec propriétés optionnelles et chevauchement",
        code: `type Reponse =\n  | { data: string; erreur?: undefined }\n  | { data?: undefined; erreur: Error };\n\nfunction traiter(r: Reponse) {\n  // "data" in r affine même si la propriété existe (optionnelle)\n  // dans les deux membres : le test porte sur la présence réelle\n  if ("data" in r && r.data !== undefined) {\n    console.log(r.data.toUpperCase()); // r.data: string\n  } else {\n    console.error(r.erreur.message);\n  }\n}\n\n// Piège : in traverse les prototypes\nclass Base {\n  methode() {}\n}\nclass Derive extends Base {}\nconst d = new Derive();\nconsole.log("methode" in d); // true — héritée, pas propre`,
      },
      {
        kind: "list",
        items: [
          "Propriétés optionnelles : `in` teste la présence réelle, pas le type déclaré — combinez avec un test de valeur (`!== undefined`) quand la propriété existe des deux côtés.",
          "Prototypes : `in` remonte la chaîne d'héritage — pour des instances de classes, préférez un discriminant explicite ou `hasOwnProperty` quand la distinction compte.",
          "Narrowing partiel : si plusieurs membres possèdent la propriété, `in` ne filtre que ceux qui ne l'ont pas — affinez ensuite par discriminant.",
          "Règle pratique : `in` pour les données externes non discriminées (JSON d'API), discriminant (`kind`) pour vos propres types.",
        ],
      },
    ],
  },
  {
    id: "const-assertions-unions",
    title: "Dériver une union d'une valeur",
    level: 3,
    intro: "Une seule source de vérité entre le runtime et les types.",
    blocks: [
      {
        kind: "code",
        language: "ts",
        title: "as const + typeof + indexation",
        code: `const MODES = ["light", "dark", "system"] as const;\n\n// Union dérivée : "light" | "dark" | "system"\ntype Mode = (typeof MODES)[number];\n\nfunction setMode(mode: Mode) {\n  // ...\n}\n\nsetMode("light"); // OK\n// setMode("sepia"); // Erreur : pas dans l'union\n\n// Le tableau reste utilisable au runtime (menus, validation)\nfor (const mode of MODES) {\n  console.log(mode); // mode: "light" | "dark" | "system"\n}`,
      },
      {
        kind: "list",
        items: [
          "`as const` fige le tableau en tuple readonly de littéraux : sans lui, `MODES` serait `string[]` et l'union serait `string`.",
          "Motif puissant : la liste sert à la fois au runtime (itération, `<select>`) et au typage — impossible de les désynchroniser.",
          "Même technique avec un objet : `keyof typeof CONFIG` dérive l'union des clés.",
          "Quand la liste vient d'une API externe, validez au runtime (garde de type) au lieu de dériver.",
        ],
      },
    ],
  },
  {
    id: "state-machines",
    title: "Machines à états typées",
    level: 3,
    intro: "Les unions discriminées comme machines à états : les états impossibles deviennent irreprésentables.",
    blocks: [
      {
        kind: "code",
        language: "ts",
        title: "État de chargement d'une ressource",
        code: `type RemoteData<T> =\n  | { status: "idle" }\n  | { status: "loading" }\n  | { status: "success"; data: T }\n  | { status: "error"; error: Error };\n\nfunction afficher<T>(etat: RemoteData<T>): string {\n  switch (etat.status) {\n    case "idle":\n      return "En attente";\n    case "loading":\n      return "Chargement…";\n    case "success":\n      return \`Données : \${JSON.stringify(etat.data)}\`;\n    case "error":\n      return \`Erreur : \${etat.error.message}\`;\n  }\n}\n\n// Impossible : { status: "success" } sans data → erreur de compilation\n// Impossible : accéder à .data quand status === "loading"`,
      },
      {
        kind: "text",
        text: "Le slogan : « make impossible states impossible ». Au lieu de booléens indépendants (`isLoading`, `isError`, `data?`) qui autorisent les combinaisons absurdes (`isLoading && isError`), un seul discriminant énumère les états valides — et le switch exhaustif garantit que chaque état est géré.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Unions et narrowing maîtrisés, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Génériques : paramétrer les unions (`Result<T>`, `AsyncState<T>`) pour des abstractions réutilisables.",
          "Utility types : dériver des variantes (`Pick`, `Omit`, `Partial`) au lieu de redéclarer.",
          "Types avancés : mapped et conditional types pour calculer des unions programmatiquement.",
          "Type guards : approfondir les prédicats personnalisés et les assertions.",
          "Revenir à la roadmap : valider les unions et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

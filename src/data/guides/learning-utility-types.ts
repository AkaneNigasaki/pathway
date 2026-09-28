import type { LearningSection } from "../skill-guides";

/**
 * Learning Page des utility types : Partial, Pick, Omit, Record,
 * ReturnType et les autres — dériver des types au lieu de les dupliquer.
 */
export const LEARNING_UTILITY_TYPES: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Les utility types transforment des types existants : un seul type source, des variantes dérivées automatiquement.",
    blocks: [
      {
        kind: "text",
        text: "Sans utilitaires, chaque variante d'une interface se rédige à la main : `User`, `UserCreate` (sans `id`), `UserUpdate` (tout optionnel), `UserPreview` (quelques champs). Quatre déclarations à maintenir, quatre endroits où oublier un champ. Avec les utility types, une seule source de vérité : `Omit<User, \"id\">`, `Partial<User>`, `Pick<User, \"name\" | \"avatar\">` — ajoutez un champ à `User`, tout suit.",
      },
      {
        kind: "text",
        text: "Ces utilitaires sont natifs : disponibles sans import, sans installation. Ils sont eux-mêmes implémentés avec des mapped types et des conditional types — les comprendre en usage prépare à les comprendre en profondeur (page Types avancés).",
      },
      {
        kind: "text",
        text: "Deux familles : les utilitaires d'objets (`Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`) qui transforment des formes, et les utilitaires de fonctions et d'unions (`Parameters`, `ReturnType`, `Awaited`, `Exclude`, `Extract`, `NonNullable`) qui extraient de l'information des types existants.",
      },
    ],
  },
  {
    id: "deriver-au-lieu-de-dupliquer",
    title: "Dériver au lieu de dupliquer",
    level: 1,
    intro: "Le principe en un schéma.",
    blocks: [
      {
        kind: "diagram",
        title: "Une source, des variantes",
        lines: [
          "interface User { id, name, email, passwordHash, createdAt }",
          "     │",
          "     ├── Omit<User, \"passwordHash\">        → UserPublic",
          "     ├── Omit<User, \"id\" | \"createdAt\">   → UserCreate",
          "     ├── Partial<UserCreate>                → UserUpdate",
          "     ├── Pick<User, \"id\" | \"name\">        → UserPreview",
          "     └── Record<Role, User[]>               → annuaire par rôle",
          "",
          "Un champ ajouté à User → toutes les variantes suivent.",
          "Zéro duplication, zéro oubli.",
        ],
      },
      {
        kind: "text",
        text: "Retenez la règle : dès qu'une variante d'un type existe en deux exemplaires écrits à la main, c'est un utility type qui manque. La duplication des formes est une dette qui se paie à chaque évolution du modèle.",
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
    intro: "Ce qu'il faut maîtriser avant les utility types, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations indispensables",
        fields: [
          {
            label: "Interfaces et objets",
            value:
              "Décrire des formes d'objets : les utilitaires transforment ces formes.",
          },
          {
            label: "Génériques (`<T>`)",
            value:
              "Les utilitaires sont eux-mêmes génériques : `Partial<User>` applique `Partial` au paramètre `User`. Sans les génériques, la syntaxe reste magique.",
          },
          {
            label: "Unions",
            value:
              "`Pick<User, \"a\" | \"b\">` prend une union de clés : comprendre les unions pour sélectionner.",
          },
          {
            label: "Propriétés optionnelles",
            value:
              "Le `?` : `Partial` ne fait que le généraliser à toutes les propriétés.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro: "Les utility types sont globaux : rien à installer, rien à importer.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier que le compilateur les connaît",
        command: "npx tsc --version",
        why: "`Partial`, `Pick`, `Omit`, `Record`, `ReturnType` et les autres sont déclarés dans les fichiers lib de TypeScript : disponibles dans tout projet sans import. Cette commande confirme simplement que le compilateur est en place.",
        verify: "npx tsc --noEmit",
      },
      {
        kind: "text",
        text: "Pas d'import, pas de paquet : écrivez `Partial<User>` directement. Si l'éditeur ne le reconnaît pas, c'est la configuration du projet (`lib`, version de TypeScript) qu'il faut vérifier — pas une dépendance manquante.",
      },
    ],
  },
  {
    id: "partial-en-pratique",
    title: "`Partial` en pratique",
    level: 2,
    intro: "Tout optionnel : le cas du formulaire d'édition.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Partial : mise à jour partielle",
        code: `interface User {\n  id: string;\n  name: string;\n  email: string;\n}\n\n// Partial<User> = { id?: string; name?: string; email?: string }\nfunction updateUser(id: string, patch: Partial<User>): void {\n  // patch ne contient que les champs modifiés\n}\n\nupdateUser("1", { name: "Akane" }); // OK : le reste est optionnel\nupdateUser("1", {}); // OK aussi : rien à modifier\n\n// Profondeur : Partial ne touche que le premier niveau\ninterface Config {\n  db: { host: string; port: number };\n}\ntype PartialConfig = Partial<Config>;\n// db?: { host: string; port: number } — l'objet db reste complet s'il est fourni`,
      },
      {
        kind: "text",
        text: "`Partial<T>` rend chaque propriété optionnelle — uniquement au premier niveau. Pour des mises à jour imbriquées, il faut un `DeepPartial` maison (page Types avancés) ou aplatir la structure.",
      },
    ],
  },
  {
    id: "pick-omit-en-pratique",
    title: "`Pick` et `Omit` en pratique",
    level: 2,
    intro: "Sélectionner ou exclure des propriétés : les DTO d'API.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Pick et Omit : sous-ensembles",
        code: `interface User {\n  id: string;\n  name: string;\n  email: string;\n  passwordHash: string;\n  createdAt: Date;\n}\n\n// Pick : ne garder que certaines clés\ntype UserPreview = Pick<User, "id" | "name">;\n// { id: string; name: string }\n\n// Omit : tout sauf certaines clés\ntype UserPublic = Omit<User, "passwordHash">;\ntype UserCreate = Omit<User, "id" | "createdAt">;\n\n// Les clés inexistantes sont refusées\n// type Bad = Pick<User, "unknown">; // erreur : "unknown" n'est pas une clé`,
      },
      {
        kind: "list",
        items: [
          "`Pick<T, K>` : sous-ensemble explicite — idéal quand on expose peu de champs (vues, listes).",
          "`Omit<T, K>` : tout sauf — idéal quand on retire peu de champs (création sans `id`, exposition sans secret).",
          "Les deux vérifient que les clés existent : une faute de frappe est une erreur de compilation.",
        ],
      },
    ],
  },
  {
    id: "record-en-pratique",
    title: "`Record` en pratique",
    level: 2,
    intro: "Des dictionnaires typés : clés connues, valeurs homogènes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Record : clés vers valeurs",
        code: `type Role = "admin" | "editor" | "viewer";\n\n// Chaque rôle mappe vers une liste de permissions\nconst permissions: Record<Role, string[]> = {\n  admin: ["read", "write", "delete"],\n  editor: ["read", "write"],\n  viewer: ["read"],\n};\n// Oublier un rôle → erreur : Record exige toutes les clés\n\n// Dictionnaire à clés dynamiques\nconst cache: Record<string, number> = {};\ncache["hits"] = 42;\n\n// Record avec valeurs objets\ntype Translations = Record<"fr" | "en", { title: string }>;\nconst t: Translations = {\n  fr: { title: "Bonjour" },\n  en: { title: "Hello" },\n};`,
      },
      {
        kind: "text",
        text: "`Record<K, V>` type un objet dont les clés sont `K` et les valeurs `V`. Avec une union de littéraux en clés, l'exhaustivité est vérifiée : impossible d'oublier un cas. C'est l'alternative typée aux signatures d'index.",
      },
    ],
  },
  {
    id: "returntype-parameters-en-pratique",
    title: "`ReturnType` et `Parameters` en pratique",
    level: 2,
    intro: "Extraire les types d'une fonction existante — sans la réécrire.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Introspection des fonctions",
        code: `function createUser(name: string, age: number) {\n  return { id: crypto.randomUUID(), name, age };\n}\n\n// Le type de retour, sans le dupliquer\ntype NewUser = ReturnType<typeof createUser>;\n// { id: string; name: string; age: number }\n\n// Les paramètres, sous forme de tuple\ntype CreateArgs = Parameters<typeof createUser>;\n// [name: string, age: number]\n\n// Usage : wrapper qui conserve la signature\nfunction logged(...args: CreateArgs): NewUser {\n  console.log("création", args);\n  return createUser(...args);\n}`,
      },
      {
        kind: "text",
        text: "Le motif `typeof fn` capture le type de la fonction, puis `ReturnType` / `Parameters` en extraient les morceaux. Quand la signature de `createUser` change, `NewUser`, `CreateArgs` et `logged` suivent automatiquement — zéro duplication.",
      },
    ],
  },
  {
    id: "required-readonly-en-pratique",
    title: "`Required` et `Readonly` en pratique",
    level: 2,
    intro: "L'inverse de `Partial`, et l'immutabilité déclarée.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Required et Readonly",
        code: `interface Draft {\n  title?: string;\n  body?: string;\n}\n\n// Required : tout devient obligatoire\ntype Published = Required<Draft>;\n// { title: string; body: string }\n\nfunction publish(draft: Draft): Published {\n  if (!draft.title || !draft.body) {\n    throw new Error("Brouillon incomplet");\n  }\n  return draft as Published; // vérifié à l'exécution, acté dans les types\n}\n\n// Readonly : interdire la mutation\ninterface Settings {\n  theme: string;\n  lang: string;\n}\nfunction apply(s: Readonly<Settings>): void {\n  // s.theme = "dark"; // erreur : readonly\n  console.log(s.theme);\n}`,
      },
      {
        kind: "text",
        text: "`Required<T>` est le miroir de `Partial<T>` : utile quand un type partiel devient complet après validation (brouillon → publié). `Readonly<T>` fige les propriétés en lecture seule — une promesse de non-mutation vérifiée à la compilation.",
      },
    ],
  },
  {
    id: "premier-dto",
    title: "Premier DTO complet",
    level: 2,
    intro: "Assembler les utilitaires sur un cas réel : les objets d'une API.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir le modèle source",
            detail:
              "Une interface `Article` complète : `id`, `slug`, `title`, `body`, `authorId`, `publishedAt`, `views`. C'est la seule déclaration manuelle du flux.",
          },
          {
            title: "Dériver le DTO de création",
            detail:
              "`type ArticleCreate = Omit<Article, \"id\" | \"publishedAt\" | \"views\">` : le client n'envoie que ce qu'il connaît.",
          },
          {
            title: "Dériver le DTO de mise à jour",
            detail:
              "`type ArticleUpdate = Partial<ArticleCreate>` : seules les modifications transitent.",
          },
          {
            title: "Dériver la vue publique",
            detail:
              "`type ArticlePreview = Pick<Article, \"id\" | \"slug\" | \"title\">` : la liste n'expose que l'essentiel.",
          },
          {
            title: "Typer les fonctions avec ces dérivés",
            detail:
              "`create(data: ArticleCreate)`, `update(id: string, patch: ArticleUpdate)`. Ajoutez un champ à `Article` : tout suit, `tsc --noEmit` reste silencieux.",
          },
        ],
      },
    ],
  },
  {
    id: "editeurs",
    title: "Lire les définitions des utilitaires",
    level: 2,
    intro: "Les utilitaires sont du code ordinaire : lisez leur implémentation.",
    blocks: [
      {
        kind: "fields",
        title: "VS Code — explorer les utilitaires",
        fields: [
          {
            label: "`Ctrl` + clic sur `Partial`",
            value:
              "Ouvre sa définition dans `lib.es5.d.ts` : `type Partial<T> = { [P in keyof T]?: T[P]; }`. Une ligne qui démystifie tout.",
          },
          {
            label: "Survol d'un type dérivé",
            value:
              "Survolez `UserCreate` : l'éditeur affiche la forme résultante après transformation. Vérifiez que le dérivé correspond à l'intention.",
          },
          {
            label: "Autocomplétion des clés",
            value:
              "Dans `Pick<User, \"|\">`, l'éditeur propose les clés de `User` : impossible de se tromper de nom.",
          },
        ],
      },
      {
        kind: "text",
        text: "Lire `lib.es5.d.ts` est la meilleure école des utility types : chaque définition tient en une ligne de mapped type. Quand vous comprendrez ces lignes, vous serez prêt pour la page Types avancés.",
      },
    ],
  },
  {
    id: "erreurs-frequentes-debut",
    title: "Erreurs fréquentes au début",
    level: 2,
    intro: "Les trois erreurs que tout débutant rencontre avec les utilitaires.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue express",
        fields: [
          {
            label: "`Type '\"x\"' is not assignable to type 'keyof T'`",
            value:
              "La clé passée à `Pick`/`Omit` n'existe pas dans le type source. Vérifiez l'orthographe — ou le type source a changé.",
          },
          {
            label: "`Partial` ne rend pas tout optionnel",
            value:
              "Seul le premier niveau est affecté : `Partial<Config>` avec `db: { host }` laisse `db.host` obligatoire si `db` est fourni. C'est le comportement normal, pas un bug.",
          },
          {
            label: "Appliquer un utilitaire d'objet à une union",
            value:
              "`Partial<A | B>` ne fait pas `Partial<A> | Partial<B>` : le mapped type s'applique à l'union entière. Pour distribuer, écrivez le conditional type vous-même.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro: "Quatre projets pour ancrer les utility types.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Beginner — Fiche contact",
            value:
              "`Contact` complet, `ContactPreview = Pick<...>`, `ContactUpdate = Partial<...>`. Objectif : manipuler les trois utilitaires de base.",
          },
          {
            label: "Intermediate — API REST typée",
            value:
              "Modèles + DTO dérivés (`Omit` création, `Partial` patch, `Pick` listes) pour 3 ressources. Objectif : zéro duplication de formes.",
          },
          {
            label: "Advanced — Client d'API générique",
            value:
              "`fetchJson<T>`, réponses typées via `Awaited<ReturnType<...>>`. Objectif : combiner utilitaires de fonctions et promesses.",
          },
          {
            label: "Professional — Couche d'accès aux données",
            value:
              "Entités, DTO, projections `Pick` par écran, `Record` pour les caches. Objectif : les utilitaires comme langage de conception.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "partial-en-detail",
    title: "`Partial` en détail",
    level: 3,
    intro: "L'implémentation, les limites, les usages avancés.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Définition réelle (lib.es5.d.ts)",
        code: `// La vraie définition : un mapped type d'une ligne\ntype Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n\n// Ce qu'elle produit\ninterface User {\n  id: string;\n  name: string;\n}\ntype PartialUser = Partial<User>;\n// { id?: string; name?: string }\n\n// Limite : premier niveau uniquement\ninterface Nested {\n  a: string;\n  inner: { b: string };\n}\ntype PN = Partial<Nested>;\n// { a?: string; inner?: { b: string } } — inner.b reste obligatoire si inner est fourni`,
      },
      {
        kind: "list",
        items: [
          "`Partial` itère les clés (`keyof T`) et rend chacune optionnelle (`?`) : c'est un mapped type homomorphique.",
          "Les modificateurs existants sont préservés : une propriété déjà `readonly` le reste.",
          "Pour la profondeur, voir `DeepPartial` maison dans la page Types avancés.",
        ],
      },
    ],
  },
  {
    id: "required-en-detail",
    title: "`Required` en détail",
    level: 3,
    intro: "Le miroir de `Partial` : tout obligatoire.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Required : définition et usage",
        code: `// Définition réelle : le modificateur -? retire l'optionnalité\ntype Required<T> = {\n  [P in keyof T]-?: T[P];\n};\n\ninterface Options {\n  host?: string;\n  port?: number;\n  retries?: number;\n}\n\n// Après application des défauts, tout est garanti\nfunction withDefaults(opts: Options): Required<Options> {\n  return {\n    host: opts.host ?? "localhost",\n    port: opts.port ?? 3000,\n    retries: opts.retries ?? 3,\n  };\n}\n\nconst cfg: Required<Options> = withDefaults({});\ncfg.port.toFixed(); // port: number, pas number | undefined`,
      },
      {
        kind: "text",
        text: "Le motif canonique : options partielles en entrée, configuration complète en sortie. `Required` exprime le contrat « après cette fonction, plus rien n'est optionnel » — le code aval n'a plus de vérifications défensives à faire.",
      },
    ],
  },
  {
    id: "readonly-en-detail",
    title: "`Readonly` en détail",
    level: 3,
    intro: "L'immutabilité déclarée — premier niveau, comme `Partial`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Readonly : définition et portée",
        code: `// Définition réelle\ntype Readonly<T> = {\n  readonly [P in keyof T]: T[P];\n};\n\ninterface Point {\n  x: number;\n  y: number;\n}\n\nfunction distance(a: Readonly<Point>, b: Readonly<Point>): number {\n  // a.x = 0; // erreur : lecture seule\n  return Math.hypot(a.x - b.x, a.y - b.y);\n}\n\n// Tableaux : ReadonlyArray<T> / readonly T[]\nfunction total(values: readonly number[]): number {\n  // values.push(1); // erreur\n  return values.reduce((s, v) => s + v, 0);\n}`,
      },
      {
        kind: "list",
        items: [
          "`Readonly` est une garantie de compilation, pas d'exécution : un cast ou du JS externe peut toujours muter.",
          "Usage principal : paramètres de fonctions qui ne doivent pas modifier leurs entrées — l'intention devient un contrat vérifié.",
          "Premier niveau uniquement : pour l'immutabilité profonde, voir les motifs récursifs (page Types avancés).",
        ],
      },
    ],
  },
  {
    id: "record-en-detail",
    title: "`Record` en détail",
    level: 3,
    intro: "L'implémentation et les trois visages de `Record`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Record : définition et usages",
        code: `// Définition réelle\ntype Record<K extends keyof any, T> = {\n  [P in K]: T;\n};\n\n// 1. Mapping exhaustif sur une union de littéraux\ntype Status = "idle" | "loading" | "done";\nconst labels: Record<Status, string> = {\n  idle: "En attente",\n  loading: "Chargement…",\n  done: "Terminé",\n}; // oublier une clé → erreur\n\n// 2. Dictionnaire à clés libres\nconst counters: Record<string, number> = {};\n\n// 3. Indexation par union de types\ntype ById = Record<number, string>;\nconst names: ById = { 1: "Ada", 2: "Grace" };`,
      },
      {
        kind: "text",
        text: "La force de `Record` avec une union de littéraux : l'exhaustivité. Chaque membre de l'union doit être présent — c'est un `switch` sous forme d'objet, vérifié à la compilation. Pour les tables de correspondance (labels, handlers, composants par type), c'est l'outil par défaut.",
      },
    ],
  },
  {
    id: "pick-en-detail",
    title: "`Pick` en détail",
    level: 3,
    intro: "Le sous-ensemble explicite : définition et discipline.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Pick : définition réelle",
        code: `// Définition réelle\ntype Pick<T, K extends keyof T> = {\n  [P in K]: T[P];\n};\n\ninterface Article {\n  id: string;\n  slug: string;\n  title: string;\n  body: string;\n  views: number;\n}\n\n// Projection pour une liste : que l'essentiel\ntype ArticleRow = Pick<Article, "id" | "slug" | "title">;\n\nfunction renderRow(row: ArticleRow): string {\n  return \`<li><a href="/\${row.slug}">\${row.title}</a></li>\`;\n}\n// renderRow ne peut pas accéder à row.body : il n'est pas dans le type`,
      },
      {
        kind: "text",
        text: "`Pick` documente exactement ce qu'une fonction consomme : `renderRow` déclare ne lire que `id`, `slug`, `title`. C'est une forme de moindre privilège appliquée aux types — et quand `Article` évolue, les projections restent valides.",
      },
    ],
  },
  {
    id: "omit-en-detail",
    title: "`Omit` en détail",
    level: 3,
    intro: "Le complément de `Pick` : tout sauf — et son implémentation.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Omit : définition réelle",
        code: `// Définition réelle : Pick + Exclude\ntype Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;\n\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n  passwordHash: string;\n}\n\n// Tout sauf le secret\ntype SafeUser = Omit<User, "passwordHash">;\n\n// Plusieurs clés : union de littéraux\ntype UserCreate = Omit<User, "id" | "passwordHash">;\n\n// Omit accepte des clés hors de T ? Non : K extends keyof any,\n// mais seules les clés de T sont retirées — les autres sont ignorées\ntype StillSafe = Omit<User, "passwordHash" | "totallyUnknown">; // OK`,
      },
      {
        kind: "list",
        items: [
          "`Omit` est défini via `Pick` et `Exclude` : il ne garde que les clés de `T` non listées.",
          "Choisir entre `Pick` et `Omit` : `Pick` quand on garde peu (liste blanche), `Omit` quand on retire peu (liste noire).",
          "Attention : avec `Omit`, un champ ajouté plus tard au type source est inclus par défaut — parfois indésirable pour des vues publiques. `Pick` est plus conservateur.",
        ],
      },
    ],
  },
  {
    id: "pick-vs-omit",
    title: "`Pick` ou `Omit` : choisir",
    level: 3,
    intro: "Les deux produisent des sous-ensembles — avec des conséquences différentes sur l'évolution.",
    blocks: [
      {
        kind: "table",
        headers: ["", "`Pick<T, K>`", "`Omit<T, K>`"],
        rows: [
          ["Logique", "Liste blanche : ce qu'on garde", "Liste noire : ce qu'on retire"],
          ["Nouveau champ dans T", "Non inclus (sûr par défaut)", "Inclus (fuite possible)"],
          ["Idéal pour", "Vues, projections, DTO restreints", "Création, nettoyage de secrets"],
          ["Lisibilité", "Explicite : on voit ce qui est exposé", "Concise quand on retire 1-2 champs"],
          ["Risque", "Oublier d'ajouter un champ utile", "Exposer un champ sensible ajouté plus tard"],
        ],
      },
      {
        kind: "text",
        text: "Pour les données exposées (API publiques, vues), préférez `Pick` : un champ sensible ajouté à la source n'est pas exposé par accident. Pour les données internes (création, formulaires), `Omit` est plus concis. Le choix est une décision de sécurité autant que de style.",
      },
    ],
  },
  {
    id: "exclude-extract",
    title: "`Exclude` et `Extract`",
    level: 3,
    intro: "Filtrer des unions : les conditional types les plus utiles au quotidien.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Définitions réelles et usages",
        code: `// Définitions réelles : des conditional types distributifs\ntype Exclude<T, U> = T extends U ? never : T;\ntype Extract<T, U> = T extends U ? T : never;\n\ntype Event =\n  | { type: "click"; x: number }\n  | { type: "keypress"; key: string }\n  | { type: "scroll"; delta: number };\n\n// Ne garder que les événements souris\ntype MouseEvent = Extract<Event, { type: "click" }>;\n// { type: "click"; x: number }\n\n// Retirer un cas\ntype NonScroll = Exclude<Event, { type: "scroll" }>;\n\n// Sur des littéraux : le cas le plus courant\ntype Status = "idle" | "loading" | "done" | "error";\ntype Active = Exclude<Status, "idle" | "done">; // "loading" | "error"`,
      },
      {
        kind: "text",
        text: "`Exclude` retire des membres d'une union, `Extract` ne garde que ceux qui correspondent. Ce sont des conditional types distributifs : le test `T extends U` s'applique à chaque membre séparément. Retenez-les comme « le filtre des unions ».",
      },
    ],
  },
  {
    id: "nonnullable",
    title: "`NonNullable`",
    level: 3,
    intro: "Retirer `null` et `undefined` d'un type.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "NonNullable en pratique",
        code: `// Retire null et undefined\ntype A = NonNullable<string | null | undefined>; // string\n\n// Usage : après une vérification, figer le résultat\nfunction getName(input: string | null): NonNullable<typeof input> {\n  if (input === null) throw new Error("Nom requis");\n  return input; // string\n}\n\n// Avec les accès indexés (noUncheckedIndexedAccess)\ndeclare const dict: Record<string, string>;\nconst value: string | undefined = dict["key"];\nif (value !== undefined) {\n  const sure: NonNullable<typeof value> = value; // string\n}`,
      },
      {
        kind: "text",
        text: "`NonNullable<T>` exprime « ce type, garanti non vide ». Utile pour typer le résultat d'une validation ou d'une assertion : la garantie d'exécution devient un type que le code aval peut utiliser sans vérification redondante.",
      },
    ],
  },
  {
    id: "returntype-parameters-en-detail",
    title: "`ReturnType` et `Parameters` en détail",
    level: 3,
    intro: "L'introspection des fonctions : définitions et motifs.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Définitions réelles (simplifiées)",
        code: `// Principe : infer capture le morceau voulu\n// type ReturnType<T> = T extends (...args: any) => infer R ? R : any;\n// type Parameters<T> = T extends (...args: any) => infer P ? P : never;\n\nasync function fetchUsers(page: number, limit: number) {\n  const res = await fetch(\`/api/users?page=\${page}&limit=\${limit}\`);\n  return (await res.json()) as { id: string; name: string }[];\n}\n\n// Le type de retour SANS exécuter la fonction\ntype Users = ReturnType<typeof fetchUsers>; // Promise<{...}[]>\ntype UserList = Awaited<Users>; // {...}[] — promesse déballée\n\n// Les paramètres pour un wrapper\ntype FetchArgs = Parameters<typeof fetchUsers>; // [page: number, limit: number]\n\nfunction cachedFetch(...args: FetchArgs): Users {\n  // ... cache puis appel réel\n  return fetchUsers(...args);\n}`,
      },
      {
        kind: "text",
        text: "Le motif `Awaited<ReturnType<typeof fn>>` donne le type « utile » d'une fonction async : ce qu'elle résout, pas la promesse. Combiné à `Parameters`, il permet d'écrire des wrappers (cache, log, retry) qui suivent automatiquement la signature wrappée.",
      },
    ],
  },
  {
    id: "awaited-en-detail",
    title: "`Awaited` en détail",
    level: 3,
    intro: "Déballer les promesses — même imbriquées.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Awaited : le déballeur de promesses",
        code: `type A = Awaited<Promise<string>>; // string\ntype B = Awaited<Promise<Promise<number>>>; // number (récursif)\ntype C = Awaited<string>; // string (non-promesse inchangée)\n\n// Cas réel : typer ce que await produit\ndeclare function loadConfig(): Promise<{ host: string; port: number }>;\n\n// Sans Awaited : le type de la promesse\ntype P = ReturnType<typeof loadConfig>; // Promise<{...}>\n\n// Avec Awaited : le type après await\ntype Config = Awaited<P>; // { host: string; port: number }\n\nasync function main(): Promise<void> {\n  const config: Config = await loadConfig(); // directement utilisable\n}`,
      },
      {
        kind: "text",
        text: "`Awaited<T>` reproduit au niveau des types ce que `await` fait à l'exécution : il déballe récursivement les promesses. Indispensable dès qu'on manipule des types de fonctions async sans les appeler (wrappers, mocks, tests).",
      },
    ],
  },
  {
    id: "utilitaires-chaines",
    title: "Utilitaires de chaînes",
    level: 3,
    intro: "`Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize` : transformer des littéraux.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Manipulation de casse au niveau des types",
        code: `type Shout = Uppercase<"hello">; // "HELLO"\ntype Quiet = Lowercase<"HeLLo">; // "hello"\ntype Titled = Capitalize<"hello world">; // "Hello world"\ntype Untitled = Uncapitalize<"Hello">; // "hello"\n\n// Usage réel : dériver des noms d'événements\ntype EventName = "click" | "hover";\ntype HandlerName = \`on\${Capitalize<EventName>}\`;\n// "onClick" | "onHover"\n\n// Getters dérivés d'un état\ntype State = { user: string; theme: string };\ntype Getter<K extends keyof State & string> = \`get\${Capitalize<K>}\`;\ntype Getters = Getter<keyof State>; // "getUser" | "getTheme"`,
      },
      {
        kind: "text",
        text: "Ces utilitaires sont « intrinsèques » : implémentés par le compilateur, pas en TypeScript. Ils brillent combinés aux template literal types pour générer des noms (handlers, getters, clés) à partir d'unions existantes — sans les écrire à la main.",
      },
    ],
  },
  {
    id: "combiner-utilitaires",
    title: "Combiner les utilitaires",
    level: 3,
    intro: "L'imbrication est la norme : lire et écrire des compositions.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Compositions courantes",
        code: `interface User {\n  id: string;\n  name: string;\n  email: string;\n  passwordHash: string;\n  createdAt: Date;\n}\n\n// Lecture : de l'intérieur vers l'extérieur\ntype UserUpdateDto = Partial<Omit<User, "id" | "createdAt" | "passwordHash">>;\n// 1. Omit retire id, createdAt, passwordHash\n// 2. Partial rend le reste optionnel\n\n// Readonly + Pick : projection immuable\ntype UserBadge = Readonly<Pick<User, "id" | "name">>;\n\n// Record + Exclude : mapping sans un cas\ntype Status = "idle" | "loading" | "done" | "error";\ntype Handler = () => void;\nconst handlers: Record<Exclude<Status, "idle">, Handler> = {\n  loading: () => {},\n  done: () => {},\n  error: () => {},\n};\n\n// NonNullable + ReturnType\ndeclare function find(id: string): User | null;\ntype FoundUser = NonNullable<ReturnType<typeof find>>; // User`,
      },
      {
        kind: "text",
        text: "Lisez les compositions de l'intérieur vers l'extérieur : chaque couche transforme le résultat de la précédente. Quand une composition devient illisible (4+ niveaux), extrayez des étapes intermédiaires nommées — un alias par étape documente le pipeline.",
      },
    ],
  },
  {
    id: "ecrire-ses-utilitaires",
    title: "Écrire ses propres utilitaires",
    level: 3,
    intro: "Le pas vers les types avancés : un utility type maison.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Deux utilitaires sur mesure",
        code: `// 1. Rendre optionnelles SEULEMENT certaines clés\ntype PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;\n\ninterface Article {\n  id: string;\n  title: string;\n  body: string;\n}\ntype Draft = PartialBy<Article, "title" | "body">;\n// { id: string; title?: string; body?: string }\n\n// 2. Rendre obligatoires SEULEMENT certaines clés\ntype RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;\n\ninterface Options {\n  host?: string;\n  port?: number;\n  verbose?: boolean;\n}\ntype StrictOptions = RequiredBy<Options, "host" | "port">;\n// { host: string; port: number; verbose?: boolean }`,
      },
      {
        kind: "text",
        text: "Le motif est toujours le même : `Omit` pour retirer, `Pick` + transformation pour reconstruire, `&` pour recoller. Maîtriser cette grammaire, c'est pouvoir exprimer n'importe quelle transformation de forme — et c'est exactement ce que fait la page Types avancés, en généralisant.",
      },
    ],
  },
  {
    id: "contraintes-generiques",
    title: "Utilitaires et contraintes génériques",
    level: 3,
    intro: "Appliquer les utilitaires à des paramètres de type contraints.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Génériques + utilitaires",
        code: `// Contrainte : T doit être un objet\nfunction freeze<T extends object>(obj: T): Readonly<T> {\n  return Object.freeze(obj) as Readonly<T>;\n}\n\n// Patch typé : les clés doivent exister dans T\nfunction patch<T extends object>(target: T, p: Partial<T>): T {\n  return { ...target, ...p };\n}\n\n// Clés contraintes par keyof\nfunction pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {\n  const out = {} as Pick<T, K>;\n  for (const k of keys) out[k] = obj[k];\n  return out;\n}\n\nconst user = { id: "1", name: "Akane", age: 28 };\nconst preview = pick(user, "id", "name");\n// Pick<{...}, "id" | "name"> — précis, sans annotation`,
      },
      {
        kind: "text",
        text: "`K extends keyof T` est la contrainte qui rend `pick` sûr : seules les clés réelles sont acceptées, et le type retourné est précis. C'est le même mécanisme que les utilitaires natifs utilisent — vous écrivez désormais du code « standard library ».",
      },
    ],
  },
  {
    id: "dto-api-complet",
    title: "Architecture DTO complète",
    level: 3,
    intro: "Les utilitaires comme langage de conception d'une API.",
    blocks: [
      {
        kind: "diagram",
        title: "Dérivations d'une entité",
        lines: [
          "interface Product (source unique)",
          "  id, sku, name, description, priceCents,",
          "  stock, categoryId, createdAt, updatedAt",
          "     │",
          "     ├── ProductCreate = Omit<Product, \"id\" | \"createdAt\" | \"updatedAt\">",
          "     ├── ProductUpdate = Partial<ProductCreate>",
          "     ├── ProductListItem = Pick<Product, \"id\" | \"sku\" | \"name\" | \"priceCents\">",
          "     ├── ProductPublic = Omit<Product, \"stock\">",
          "     ├── ProductSortKey = keyof Pick<Product, \"name\" | \"priceCents\" | \"createdAt\">",
          "     └── Inventory = Record<string, Pick<Product, \"sku\" | \"stock\">>",
        ],
      },
      {
        kind: "text",
        text: "Chaque DTO répond à une question : que reçoit la création ? que contient le patch ? qu'affiche la liste ? qu'expose le public ? Les réponses sont des dérivations, pas des déclarations. Ajoutez `weight` à `Product` : `ProductCreate` l'exige, `ProductListItem` l'ignore — chaque dérivation réagit selon sa sémantique.",
      },
    ],
  },
  {
    id: "formulaires-partial",
    title: "Formulaires et `Partial`",
    level: 3,
    intro: "L'état d'un formulaire est un `Partial` : le typer comme tel.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "État de formulaire typé",
        code: `interface SignupData {\n  username: string;\n  email: string;\n  password: string;\n}\n\n// Le formulaire se remplit progressivement : tout est optionnel\ntype SignupForm = Partial<SignupData>;\n\nfunction updateForm(patch: SignupForm): void {\n  // fusion avec l'état courant\n}\n\n// À la soumission : validation puis Required\nfunction submit(form: SignupForm): void {\n  if (!form.username || !form.email || !form.password) {\n    throw new Error("Formulaire incomplet");\n  }\n  const data: Required<SignupForm> = form as Required<SignupForm>;\n  // data : SignupData complet — garanti par la vérification\n  sendToApi(data);\n}\n\ndeclare function sendToApi(data: SignupData): void;`,
      },
      {
        kind: "text",
        text: "Le cycle `Partial` → validation → `Required` modélise fidèlement un formulaire : incomplet pendant la saisie, complet à la soumission. Le cast `as Required<...>` après vérification est légitime : la garantie vient du test d'exécution, le type ne fait que l'enregistrer.",
      },
    ],
  },
  {
    id: "etat-global",
    title: "État global et projections",
    level: 3,
    intro: "`Pick` pour les sélecteurs : ne consommer que le nécessaire.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Sélecteurs typés",
        code: `interface AppState {\n  user: { id: string; name: string } | null;\n  theme: "light" | "dark";\n  notifications: string[];\n  draft: string;\n}\n\n// Un sélecteur déclare ce qu'il lit\ntype UserSlice = Pick<AppState, "user">;\ntype ThemeSlice = Pick<AppState, "theme">;\n\nfunction selectUser(state: AppState): UserSlice["user"] {\n  return state.user;\n}\n\n// Mise à jour partielle du state\nfunction setState(patch: Partial<AppState>): void {\n  // fusion\n}\nsetState({ theme: "dark" }); // seul le thème change`,
      },
      {
        kind: "text",
        text: "Dans un store, `Partial<State>` type les mises à jour et `Pick<State, ...>` type les sélecteurs. Chaque fonction déclare son périmètre : le jour où `AppState` gagne un champ, seules les fonctions concernées sont impactées — et le compilateur montre lesquelles.",
      },
    ],
  },
  {
    id: "lire-les-definitions",
    title: "Lire les définitions de la librairie",
    level: 3,
    intro: "`lib.es5.d.ts` : la grammaire complète des utilitaires en quelques lignes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Extraits réels de la librairie standard",
        code: `// Tous ces types existent tels quels dans lib.es5.d.ts :\ntype Partial<T> = { [P in keyof T]?: T[P] };\ntype Required<T> = { [P in keyof T]-?: T[P] };\ntype Readonly<T> = { readonly [P in keyof T]: T[P] };\ntype Pick<T, K extends keyof T> = { [P in K]: T[P] };\ntype Record<K extends keyof any, T> = { [P in K]: T };\ntype Exclude<T, U> = T extends U ? never : T;\ntype Extract<T, U> = T extends U ? T : never;\ntype Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;`,
      },
      {
        kind: "text",
        text: "Huit lignes, trois mécanismes : les mapped types (`[P in K]`), les conditional types (`T extends U ? ...`), les modificateurs (`?`, `-?`, `readonly`). Tout le reste de cette page n'est que combinaison de ces briques. Quand vous les lisez couramment, les types avancés ne sont plus qu'une formalisation.",
      },
    ],
  },
  {
    id: "debugging-derives",
    title: "Déboguer les types dérivés",
    level: 3,
    intro: "Quand le dérivé ne correspond pas à l'intention : méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Survoler le type dérivé",
            detail:
              "L'éditeur affiche la forme résultante après transformation. Comparez-la à l'intention : une propriété manquante ou en trop saute aux yeux.",
          },
          {
            title: "Isoler chaque couche",
            detail:
              "Pour `Partial<Omit<T, K>>`, créez des alias intermédiaires (`type Step1 = Omit<T, K>`) et survolez chacun. La couche fautive se révèle.",
          },
          {
            title: "Vérifier les clés",
            detail:
              "Avec `Pick`/`Omit`, l'erreur vient souvent d'une clé mal orthographiée ou d'un type source qui a évolué. L'autocomplétion des clés évite ce cas.",
          },
          {
            title: "Tester l'assignabilité dans les deux sens",
            detail:
              "Assignez le dérivé au type attendu et inversement : le sens qui échoue indique si le dérivé est trop large ou trop étroit.",
          },
          {
            title: "Simplifier vers le cas minimal",
            detail:
              "Reproduisez avec une interface de 2-3 champs dans le playground. Si le cas minimal fonctionne, le problème vient des données, pas du mécanisme.",
          },
        ],
      },
    ],
  },
  {
    id: "tsconfig-pertinent",
    title: "`tsconfig.json` pertinent",
    level: 3,
    intro: "Les options qui influencent les utility types.",
    blocks: [
      {
        kind: "fields",
        title: "Option par option",
        fields: [
          {
            label: "`strict: true`",
            value:
              "Fondamental : sans lui, les dérivations propagent des `any` implicites et perdent leur précision.",
          },
          {
            label: "`exactOptionalPropertyTypes: true`",
            value:
              "Change la sémantique de `Partial` : les propriétés deviennent absentes-ou-présentes, sans `undefined` explicite assignable. Plus précis.",
          },
          {
            label: "`lib` / `target`",
            value:
              "Les utilitaires existent depuis longtemps (`lib.es5`), mais `Awaited` et les utilitaires de chaînes exigent des libs récentes. Un `target` moderne (ES2020+) évite les surprises.",
          },
        ],
      },
    ],
  },
  {
    id: "tests",
    title: "Tester les dérivations",
    level: 3,
    intro: "Les types se vérifient à la compilation ; les transformations se testent à l'exécution.",
    blocks: [
      {
        kind: "command",
        label: "Installer Vitest",
        command: "npm install --save-dev vitest",
        why: "Les utilitaires maison (`PartialBy`, `pick`) contiennent de la logique d'exécution : `pick` doit réellement extraire les bonnes clés. Les tests prouvent le comportement, `tsc` prouve les types.",
        verify: "npx vitest run",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Tester une fonction utilitaire",
        code: `import { describe, it, expect } from "vitest";\n\nfunction pick<T extends object, K extends keyof T>(\n  obj: T,\n  ...keys: K[]\n): Pick<T, K> {\n  const out = {} as Pick<T, K>;\n  for (const k of keys) out[k] = obj[k];\n  return out;\n}\n\ndescribe("pick", () => {\n  it("extrait les clés demandées", () => {\n    const user = { id: "1", name: "Akane", age: 28 };\n    expect(pick(user, "id", "name")).toEqual({ id: "1", name: "Akane" });\n  });\n\n  it("ignore les autres clés", () => {\n    const user = { id: "1", name: "Akane", age: 28 };\n    expect(pick(user, "age")).toEqual({ age: 28 });\n  });\n});`,
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Comment travaillent les professionnels",
    level: 3,
    intro: "Les utilitaires dans une base de code d'équipe.",
    blocks: [
      {
        kind: "diagram",
        title: "Discipline des dérivations",
        lines: [
          "Modèle source unique (interface par entité)",
          "      ↓",
          "DTO dérivés (Pick / Omit / Partial — jamais réécrits)",
          "      ↓",
          "Survol systématique (le dérivé correspond-il à l'intention ?)",
          "      ↓",
          "Composition nommée (alias intermédiaires si 3+ niveaux)",
          "      ↓",
          "Revue (un champ ajouté → vérifier chaque dérivation impactée)",
        ],
      },
      {
        kind: "list",
        items: [
          "Interdire les formes dupliquées en revue : deux interfaces qui se ressemblent doivent devenir une source + des dérivations.",
          "Nommer les dérivations par leur rôle (`UserCreate`, `ArticlePreview`), pas par leur mécanisme (`UserOmitId`).",
          "Documenter les utilitaires maison (`PartialBy`) : un commentaire avec exemple vaut mieux qu'un nom astucieux.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques sur les utility types, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Dupliquer au lieu de dériver",
            value:
              "Problem : `User`, `UserCreate`, `UserUpdate` écrits à la main divergent. Why : habitude ou méconnaissance. Bad example : trois interfaces quasi identiques. Better : une source + `Omit`/`Partial`/`Pick`.",
          },
          {
            label: "Croire `Partial` profond",
            value:
              "Problem : `Partial<Config>` laisse les objets imbriqués complets. Why : les mapped types natifs sont superficiels. Bad example : patch imbriqué refusé. Better : `DeepPartial` maison ou aplatir la structure.",
          },
          {
            label: "`Omit` sur des données exposées",
            value:
              "Problem : un champ sensible ajouté plus tard est exposé par défaut. Why : `Omit` inclut les nouveaux champs. Bad example : `Omit<User, \"passwordHash\">` pour l'API publique. Better : `Pick` explicite pour l'exposition.",
          },
          {
            label: "Appliquer `Partial` à une union",
            value:
              "Problem : `Partial<A | B>` ne distribue pas. Why : le mapped type s'applique à l'union entière. Bad example : résultat inattendu sur union. Better : conditional type distributif maison.",
          },
          {
            label: "Compositions illisibles",
            value:
              "Problem : `Readonly<Partial<Pick<Omit<T, K>, L>>>` incompréhensible. Why : trop de couches anonymes. Bad example : 4 niveaux inline. Better : alias intermédiaires nommés par étape.",
          },
          {
            label: "Oublier `Awaited` sur les retours async",
            value:
              "Problem : manipuler `Promise<T>` au lieu de `T`. Why : `ReturnType` d'une fonction async donne la promesse. Bad example : `ReturnType<typeof fetchUsers>` utilisé comme la donnée. Better : `Awaited<ReturnType<typeof fetchUsers>>`.",
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
          "Une source, des dérivés : jamais deux déclarations manuelles de la même forme.",
          "`Pick` pour exposer, `Omit` pour nettoyer : la liste blanche protège, la liste noire simplifie.",
          "Nommer par le rôle (`UserCreate`), pas par le mécanisme (`UserOmitId`).",
          "Composer de l'intérieur vers l'extérieur ; nommer les étapes au-delà de 3 niveaux.",
          "Survoler chaque dérivé : le type affiché doit correspondre à l'intention.",
          "`Partial` pour les patchs et formulaires, `Required` après validation.",
          "`Record` + union de littéraux pour les tables exhaustives (labels, handlers).",
          "Utilitaires maison documentés : un exemple d'usage dans le commentaire.",
          "Lire `lib.es5.d.ts` : huit lignes qui expliquent tous les mécanismes.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : sur un prototype, quelques interfaces dupliquées sont acceptables ; sur une base durable, chaque duplication est une future incohérence. Les utility types sont l'outil qui rend la rigueur moins chère que la négligence.",
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
            label: "Handbook — Utility Types",
            value:
              "typescriptlang.org/docs/handbook/utility-types : la référence complète, chaque utilitaire documenté avec exemple.",
          },
          {
            label: "Handbook — Mapped Types",
            value:
              "typescriptlang.org/docs/handbook/2/mapped-types : comprendre comment les utilitaires sont implémentés.",
          },
          {
            label: "Handbook — Conditional Types",
            value:
              "typescriptlang.org/docs/handbook/2/conditional-types : `Exclude`, `Extract` et la distributivité.",
          },
          {
            label: "lib.es5.d.ts",
            value:
              "Les définitions réelles, lisibles via `Ctrl` + clic dans l'éditeur : la source de vérité.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Community : le dépôt GitHub microsoft/TypeScript pour les propositions de nouveaux utilitaires.",
          "Practice : reprenez une API existante et remplacez chaque interface dupliquée par une dérivation.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Utility types maîtrisés, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Types avancés : écrire vos propres mapped et conditional types — la grammaire derrière les utilitaires.",
          "Génériques : contraindre et composer (`K extends keyof T`) pour des utilitaires sur mesure.",
          "Modules : organiser les types partagés dans une architecture propre.",
          "Mode strict : exploiter `exactOptionalPropertyTypes` et `noUncheckedIndexedAccess` avec les dérivations.",
          "Revenir à la roadmap : valider les utility types et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

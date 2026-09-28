import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des Génériques : paramétrer les types pour
 * écrire du code réutilisable sans perdre la précision. 3 niveaux
 * d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_GENERIQUES: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Les génériques paramètrent les types : une seule implémentation, un typage précis pour chaque usage.",
    blocks: [
      {
        kind: "text",
        text: "Sans génériques, deux options : dupliquer le code pour chaque type, ou tout typer en `any` et perdre la vérification. Les génériques offrent la troisième voie : `function premier<T>(liste: T[]): T` fonctionne pour n'importe quel `T` tout en conservant le type exact à chaque appel.",
      },
      {
        kind: "diagram",
        title: "Le problème résolu par les génériques",
        lines: [
          "Sans génériques :",
          "  premierNombre(liste: number[]): number  }",
          "  premierTexte(liste: string[]): string   } duplication",
          "  premierQuelconque(liste: any[]): any    } plus de vérification",
          "",
          "Avec génériques :",
          "  premier<T>(liste: T[]): T  — une seule fonction,",
          "  T capturé à chaque appel : number, string, User…",
        ],
      },
    ],
  },
  {
    id: "pourquoi-generiques",
    title: "Où les génériques brillent",
    level: 1,
    intro: "Les situations où ils sont incontournables.",
    blocks: [
      {
        kind: "list",
        items: [
          "Fonctions utilitaires : `map`, `filter`, `groupBy` — elles manipulent des données sans connaître leur type.",
          "Structures de données : `Array<T>`, `Map<K, V>`, `Set<T>`, piles, files.",
          "Clients d'API : `fetchJson<User[]>` — une seule fonction, des retours typés par endpoint.",
          "Composants et stores : un formulaire ou un état global typé par son contenu.",
        ],
      },
      {
        kind: "text",
        text: "Partout où le même code traite des types différents, un générique remplace la duplication ou le `any`. C'est l'abstraction au niveau des types.",
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
    intro: "Les bases à maîtriser d'abord.",
    blocks: [
      {
        kind: "list",
        items: [
          "Fonctions typées : signatures, paramètres, retours (voir `fonctions`).",
          "Interfaces : décrire la forme des objets (voir `interfaces`).",
          "Unions : `string | number` pour les alternatives (voir `unions`).",
        ],
      },
    ],
  },
  {
    id: "premier-generique",
    title: "Premier générique",
    level: 2,
    intro: "La syntaxe `<T>` en cinq lignes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Identité typée",
        code: `// T est un paramètre de type : une variable qui représente un type
function identite<T>(valeur: T): T {
  return valeur;
}

const n = identite(42);       // n: number — T capturé comme number
const s = identite("hello");  // s: string — T capturé comme string
const u = identite({ id: 1 }); // u: { id: number }`,
      },
      {
        kind: "text",
        text: "Le paramètre `<T>` se déclare après le nom de la fonction. À l'appel, le compilateur capture le type réel et le réutilise partout dans la signature : entrée et sortie restent liées.",
      },
    ],
  },
  {
    id: "inference",
    title: "Inférence des arguments",
    level: 2,
    intro: "Le compilateur déduit `T` — rarement besoin de l'écrire.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "T déduit du contexte",
        code: `function envelopper<T>(valeur: T): { contenu: T } {
  return { contenu: valeur };
}

envelopper(42);          // T = number (déduit)
envelopper<string>(42);  // Erreur : 42 n'est pas un string

// L'annotation explicite sert à forcer ou documenter :
envelopper<number | string>(42); // T = number | string (élargi volontairement)`,
      },
      {
        kind: "text",
        text: "Dans 95 % des cas, omettez `<T>` à l'appel : l'inférence fait le travail et le code reste lisible. L'annotation explicite est utile pour élargir volontairement (`number | string`) ou lever une ambiguïté.",
      },
    ],
  },
  {
    id: "contraintes-extends",
    title: "Contraintes avec `extends`",
    level: 2,
    intro: "Exiger une forme minimale sans figer le type.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Contraindre T",
        code: `// T doit avoir un id: string — le reste est libre
function trouverParId<T extends { id: string }>(liste: T[], id: string): T | undefined {
  return liste.find((e) => e.id === id);
}

trouverParId([{ id: "a", nom: "x" }], "a"); // OK : { id: string, nom: string }
trouverParId([{ nom: "x" }], "a");          // Erreur : pas de id`,
      },
      {
        kind: "text",
        text: "`<T extends Forme>` limite les types acceptés à ceux compatibles avec `Forme`. On garde la flexibilité du générique tout en pouvant utiliser `e.id` en sécurité dans le corps : le contrat minimal est garanti.",
      },
    ],
  },
  {
    id: "defauts-type",
    title: "Paramètres par défaut",
    level: 2,
    intro: "Un type de repli quand l'inférence ne peut pas déduire.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Défaut de T",
        code: `interface Boite<T = string> {
  contenu: T;
}

const b1: Boite = { contenu: "texte" };      // T = string par défaut
const b2: Boite<number> = { contenu: 42 };   // T surchargé

// Utile quand T n'apparaît qu'en retour :
declare function creer<T = {}>(): T;`,
      },
      {
        kind: "text",
        text: "Le défaut s'applique quand le type ne peut être ni inféré ni fourni — typiquement sur les interfaces et les fonctions où `T` n'apparaît qu'en position de retour.",
      },
    ],
  },
  {
    id: "generiques-multiples",
    title: "Plusieurs paramètres",
    level: 2,
    intro: "Typer les relations entre valeurs.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "K et V liés",
        code: `// La clé K et la valeur V sont liées : on ne peut pas les mélanger
function associer<K, V>(cle: K, valeur: V): [K, V] {
  return [cle, valeur];
}

const paire = associer("niveau", 12); // [string, number]

// Contrainte entre paramètres : V doit contenir K comme clé
function get<V, K extends keyof V>(obj: V, cle: K): V[K] {
  return obj[cle];
}`,
      },
      {
        kind: "text",
        text: "Plusieurs paramètres typent des relations : `Map<K, V>`, paires clé/valeur, conversions. `K extends keyof V` est le pattern standard pour « une clé valide de cet objet » — il rend les accès dynamiques sûrs.",
      },
    ],
  },
  {
    id: "interfaces-generiques",
    title: "Interfaces génériques",
    level: 2,
    intro: "Des formes paramétrées par leur contenu.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Conteneurs typés",
        code: `interface ReponseApi<T> {
  data: T;
  statut: number;
  erreur?: string;
}

// Le même conteneur pour chaque endpoint :
type ReponseUsers = ReponseApi<{ id: number; pseudo: string }[]>;
type ReponseConfig = ReponseApi<{ theme: string }>;

function traiter(r: ReponseUsers): void {
  r.data.forEach((u) => console.log(u.pseudo)); // data est typé !
}`,
      },
      {
        kind: "text",
        text: "Les interfaces génériques modélisent les enveloppes : réponses d'API, résultats paginés, états de store. La structure est définie une fois, le contenu varie par usage — sans duplication.",
      },
    ],
  },
  {
    id: "fonctions-utilitaires",
    title: "Utilitaires génériques",
    level: 2,
    intro: "Les fonctions qu'on écrit une fois pour toutes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Boîte à outils",
        code: `// groupBy : regroupe une liste selon une clé
function groupBy<T, K extends string | number>(
  liste: T[],
  cle: (e: T) => K
): Record<K, T[]> {
  const resultat = {} as Record<K, T[]>;
  for (const e of liste) {
    const k = cle(e);
    (resultat[k] ??= []).push(e);
  }
  return resultat;
}

const parNiveau = groupBy(
  [{ pseudo: "a", nv: 1 }, { pseudo: "b", nv: 2 }],
  (j) => j.nv
); // Record<number, { pseudo: string; nv: number }[]>`,
      },
    ],
  },
  {
    id: "tableaux-generiques",
    title: "Tableaux et collections génériques",
    level: 2,
    intro: "`Array<T>` est déjà un générique.",
    blocks: [
      {
        kind: "text",
        text: "`string[]` n'est qu'un raccourci pour `Array<string>`. Toutes les méthodes de tableau sont génériques : `map`, `filter`, `find` préservent ou transforment le type des éléments automatiquement.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Chaînage typé",
        code: `const users = [
  { pseudo: "akane", nv: 12 },
  { pseudo: "dada", nv: 8 },
];

const noms = users
  .filter((u) => u.nv >= 10) // { pseudo: string; nv: number }[]
  .map((u) => u.pseudo);      // string[] — le type suit le chaînage`,
      },
    ],
  },
  {
    id: "classes-generiques-intro",
    title: "Classes génériques : aperçu",
    level: 2,
    intro: "Des structures de données typées par leur contenu.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Pile typée",
        code: `class Pile<T> {
  private elements: T[] = [];

  empiler(e: T): void {
    this.elements.push(e);
  }

  depiler(): T | undefined {
    return this.elements.pop();
  }

  get taille(): number {
    return this.elements.length;
  }
}

const p = new Pile<number>();
p.empiler(1);
// p.empiler("x"); // Erreur : la pile est de number`,
      },
      {
        kind: "text",
        text: "Le paramètre se déclare sur la classe (`class Pile<T>`) et s'utilise dans les propriétés et méthodes. `Map<K, V>` et `Set<T>` du standard sont construits exactement ainsi.",
      },
    ],
  },
  {
    id: "mini-exemple-api",
    title: "Mini-exemple : client d'API générique",
    level: 2,
    intro: "Le cas d'usage roi, de bout en bout.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "fetchJson",
        code: `async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<T>;
}

interface User { id: number; pseudo: string }

// Un seul client, des retours typés par appel :
const users = await fetchJson<User[]>("https://api.exemple.com/users");
users.forEach((u) => console.log(u.pseudo)); // u: User — autocomplétion`,
      },
      {
        kind: "command",
        label: "Vérifier la compilation",
        command: "npx tsc --noEmit",
        why: "Valide que les génériques sont bien formés : contraintes respectées, inférences cohérentes. Les erreurs de génériques sont verbeuses — les lire attentivement est un exercice en soi, et cette commande les affiche sans émettre de fichiers.",
        verify: "echo $?",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "keyof-contraintes",
    title: "`keyof` : les clés comme type",
    level: 3,
    intro: "Manipuler les noms de propriétés en toute sécurité.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Clés valides uniquement",
        code: `interface User { id: number; pseudo: string; nv: number }

type ClesUser = keyof User; // "id" | "pseudo" | "nv"

function getProp<T, K extends keyof T>(obj: T, cle: K): T[K] {
  return obj[cle];
}

const u: User = { id: 1, pseudo: "akane", nv: 12 };
getProp(u, "pseudo"); // OK : string
// getProp(u, "email"); // Erreur : "email" n'est pas une clé de User`,
      },
      {
        kind: "text",
        text: "`keyof T` produit l'union des clés de `T`. Combiné à `T[K]` (le type de la propriété), il rend les accès dynamiques aussi sûrs que les accès statiques : une faute de frappe dans un nom de clé devient une erreur de compilation.",
      },
    ],
  },
  {
    id: "mapped-types-bases",
    title: "Mapped types : transformer des formes",
    level: 3,
    intro: "Construire des types en itérant sur des clés.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Le pattern",
        code: `interface User { id: number; pseudo: string }

// Rendre toutes les propriétés optionnelles — à la main :
type UserPartiel = {
  [K in keyof User]?: User[K];
};
// => { id?: number; pseudo?: string }

// C'est exactement ce que fait Partial<T> en interne.
// Autre exemple : un dictionnaire typé
type Scores = {
  [pseudo: string]: number;
};`,
      },
      {
        kind: "text",
        text: "La syntaxe `[K in keyof T]` itère sur les clés et reconstruit l'objet propriété par propriété. C'est le mécanisme derrière `Partial`, `Pick`, `Readonly` et `Record` (voir `utility-types`) — les comprendre, c'est comprendre comment ces utilitaires sont fabriqués.",
      },
    ],
  },
  {
    id: "conditional-types-bases",
    title: "Types conditionnels",
    level: 3,
    intro: "Des `if` au niveau des types.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "T extends U ? X : Y",
        code: `// Si T est un tableau, extrait le type des éléments ; sinon never
type ElementDe<T> = T extends (infer E)[] ? E : never;

type A = ElementDe<string[]>; // string
type B = ElementDe<number>;   // never

// Cas pratique : aplatir les promesses
type Deballe<T> = T extends Promise<infer U> ? Deballe<U> : T;
type C = Deballe<Promise<Promise<number>>>; // number (récursif !)`,
      },
      {
        kind: "text",
        text: "Les types conditionnels choisissent un type selon une relation `extends`. Avec `infer`, on capture une partie du type testé. La distributivité (voir plus bas) les rend particulièrement puissants sur les unions — mais aussi plus subtils.",
      },
    ],
  },
  {
    id: "infer-mot-cle",
    title: "Le mot-clé `infer`",
    level: 3,
    intro: "Capturer un morceau de type en plein test.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Extraire des morceaux",
        code: `// Type de retour d'une fonction
type Retour<T> = T extends (...args: never[]) => infer R ? R : never;
type R1 = Retour<() => string>; // string

// Premier élément d'un tuple
type Tete<T> = T extends [infer H, ...unknown[]] ? H : never;
type H1 = Tete<[string, number]>; // string

// Paramètres d'une fonction
type Params<T> = T extends (...args: infer P) => unknown ? P : never;`,
      },
      {
        kind: "text",
        text: "`infer X` déclare une variable de type à l'intérieur du test `extends` : si le motif correspond, `X` capture la partie correspondante. C'est ainsi que `ReturnType` et `Parameters` sont implémentés dans la bibliothèque standard.",
      },
    ],
  },
  {
    id: "distribution-unions",
    title: "Distributivité sur les unions",
    level: 3,
    intro: "Le comportement subtil des conditionnels.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Distribution automatique",
        code: `type ElementDe<T> = T extends (infer E)[] ? E : never;

// T est une union : le conditionnel s'applique à CHAQUE membre
type D = ElementDe<string[] | number[]>;
// = ElementDe<string[]> | ElementDe<number[]>
// = string | number

// Pour empêcher la distribution : envelopper dans un tuple
type NonDistrib<T> = [T] extends [unknown[]] ? true : false;
type ND = NonDistrib<string[] | number>; // false (testé en bloc)`,
      },
      {
        kind: "text",
        text: "Quand `T` est un paramètre de type « nu » dans le test, le conditionnel se distribue sur chaque membre de l'union. C'est voulu dans la plupart des utilitaires — et la source de surprises quand on l'ignore. L'enrobage `[T]` désactive la distribution.",
      },
    ],
  },
  {
    id: "variance-intro",
    title: "Variance : intuition",
    level: 3,
    intro: "Quand `Boite<Chat>` est-il une `Boite<Animal>` ?",
    blocks: [
      {
        kind: "text",
        text: "La variance décrit comment la relation entre types se propage aux génériques. En TypeScript (structurel et pragmatique) : un `Array<Chat>` est assignable à `Array<Animal>` (covariance) — pratique, même si théoriquement risqué à l'écriture. Les fonctions sont contravariantes sur leurs paramètres en mode strict : une fonction acceptant `Animal` peut remplacer une fonction exigeant `Chat`.",
      },
      {
        kind: "list",
        items: [
          "En pratique : laissez le compilateur juger, et lisez ses messages quand il refuse.",
          "Les tableaux sont covariants en TS : `chats.push(chien)` n'est pas attrapé — d'où l'importance des tests.",
          "`readonly T[]` est la version sûre quand on ne fait que lire.",
        ],
      },
    ],
  },
  {
    id: "classes-generiques-detail",
    title: "Classes génériques avancées",
    level: 3,
    intro: "Contraintes et fabriques au niveau classe.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Dépôt contraint",
        code: `interface Entite { id: string }

class Depot<T extends Entite> {
  private items = new Map<string, T>();

  ajouter(e: T): void {
    this.items.set(e.id, e); // e.id garanti par la contrainte
  }

  parId(id: string): T | undefined {
    return this.items.get(id);
  }

  lister(): T[] {
    return [...this.items.values()];
  }
}

interface Produit extends Entite { prix: number }
const produits = new Depot<Produit>(); // OK`,
      },
      {
        kind: "text",
        text: "La contrainte sur la classe garantit les opérations communes (`e.id`) tandis que `T` préserve le type précis à la sortie. C'est le pattern des repositories, des stores et des collections métier.",
      },
    ],
  },
  {
    id: "contraintes-avancees",
    title: "Contraintes avancées",
    level: 3,
    intro: "Combiner `extends`, `keyof` et les conditionnels.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Contraintes composées",
        code: `// T doit être un objet non-tableau avec des valeurs sérialisables
type ObjetSimple<T> = T extends unknown[]
  ? never
  : T extends Record<string, string | number | boolean | null>
    ? T
    : never;

// Clé dont la valeur est d'un type donné
type ClesDeType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

interface Config { hote: string; port: number; debug: boolean }
type ClesNum = ClesDeType<Config, number>; // "port"`,
      },
      {
        kind: "text",
        text: "Les contraintes se composent comme des fonctions : chaque niveau affine. Ce style déclaratif remplace des pages de validation runtime — mais gardez-le lisible : un type que personne ne comprend est un type à simplifier.",
      },
    ],
  },
  {
    id: "utilitaires-natifs-apercu",
    title: "Les utilitaires natifs",
    level: 3,
    intro: "Le pont vers la compétence `utility-types`.",
    blocks: [
      {
        kind: "fields",
        title: "Fabriqués avec des génériques",
        fields: [
          { label: "`Partial<T>`", value: "Toutes les propriétés deviennent optionnelles (mapped type)." },
          { label: "`Pick<T, K>`", value: "Ne garde que les clés `K` : `Pick<User, \"id\" | \"pseudo\">`." },
          { label: "`Omit<T, K>`", value: "Retire les clés `K` — l'inverse de `Pick`." },
          { label: "`Record<K, V>`", value: "Dictionnaire typé : `Record<string, number>`." },
          { label: "`ReturnType<T>`", value: "Le retour d'un type fonction (via `infer`)." },
        ],
      },
      {
        kind: "text",
        text: "Ces utilitaires sont des génériques fournis par le langage : pas d'import, disponibles partout. La compétence `utility-types` les détaille un par un avec leurs cas d'usage.",
      },
    ],
  },
  {
    id: "types-recursifs",
    title: "Types récursifs",
    level: 3,
    intro: "Des types qui se référencent eux-mêmes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Structures arborescentes",
        code: `// Un commentaire avec des réponses imbriquées
interface Commentaire {
  auteur: string;
  texte: string;
  reponses: Commentaire[]; // récursion directe
}

// JSON générique : la définition récursive du format
type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [cle: string]: Json };`,
      },
      {
        kind: "text",
        text: "Les types récursifs modélisent les arbres : DOM, AST, commentaires, menus. TypeScript les accepte via interfaces ou alias récursifs — attention aux récursions infinies dans les conditionnels, le compilateur limite la profondeur.",
      },
    ],
  },
  {
    id: "template-literal-types",
    title: "Template literal types",
    level: 3,
    intro: "Des types construits comme des chaînes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Chaînes typées",
        code: `type Methode = "GET" | "POST";
type Chemin = "/users" | "/posts";

// Produit cartésien au niveau des types !
type Route = \`\${Methode} \${Chemin}\`;
// "GET /users" | "GET /posts" | "POST /users" | "POST /posts"

function appeler(route: Route): void { /* ... */ }
appeler("GET /users");  // OK
// appeler("DELETE /users"); // Erreur`,
      },
      {
        kind: "text",
        text: "Les template literal types combinent des unions de chaînes en d'autres unions — parfait pour les routes, les clés d'événements (`on${Capitalize<E>}`), les noms de propriétés préfixées. Puissant, à réserver aux cas où la combinatoire reste maîtrisée.",
      },
    ],
  },
  {
    id: "surcharges-vs-generiques",
    title: "Surcharges vs génériques",
    level: 3,
    intro: "Deux outils pour les fonctions à formes multiples.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Surcharges", "Génériques"],
        rows: [
          ["Cas typique", "Comportements vraiment différents par type d'entrée", "Même logique, types variables"],
          ["Relation entrée/sortie", "Décrite cas par cas", "Capturée par le paramètre T"],
          ["Lisibilité", "Se dégrade vite au-delà de 3 signatures", "Reste compacte"],
          ["Exemple", "`formater(n: number)` / `formater(d: Date)`", "`premier<T>(liste: T[])`"],
        ],
      },
      {
        kind: "text",
        text: "Quand un générique suffit, préférez-le : une signature vaut mieux que trois. Les surcharges restent pour les cas où le comportement (pas seulement les types) change selon les arguments.",
      },
    ],
  },
  {
    id: "promesses-generiques",
    title: "Promesses et génériques",
    level: 3,
    intro: "`Promise<T>` est le générique le plus utilisé.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Composer l'asynchrone typé",
        code: `// Promise.all préserve le tuple des types
const [users, config] = await Promise.all([
  fetchJson<User[]>("https://api.exemple.com/users"),
  fetchJson<Config>("https://api.exemple.com/config"),
]);
// users: User[], config: Config — pas de any

// Fonction qui « déballe » n'importe quelle promesse
async function avecTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, rej) =>
    setTimeout(() => rej(new Error("Timeout")), ms)
  );
  return Promise.race([p, timeout]);
}`,
      },
    ],
  },
  {
    id: "generic-factories",
    title: "Fabriques génériques",
    level: 3,
    intro: "Créer des instances sans connaître la classe.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Constructeur en paramètre",
        code: `// Le type du constructeur : new (...args) => T
function creer<T>(Ctor: new () => T): T {
  return new Ctor();
}

class Service { demarrer(): void { /* ... */ } }

const s = creer(Service); // s: Service — typé sans annotation`,
      },
      {
        kind: "text",
        text: "Le pattern `new (...args) => T` type les fabriques et l'injection de dépendances : le conteneur crée l'instance, le type suit. C'est la base des conteneurs IoC légers.",
      },
    ],
  },
  {
    id: "pattern-repository",
    title: "Pattern : repository générique",
    level: 3,
    intro: "L'accès aux données, typé une fois pour toutes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Repository",
        code: `interface Entite { id: string }

class Repository<T extends Entite> {
  constructor(private charger: (id: string) => Promise<T>) {}

  private cache = new Map<string, T>();

  async parId(id: string): Promise<T> {
    const connu = this.cache.get(id);
    if (connu) return connu;
    const e = await this.charger(id);
    this.cache.set(id, e);
    return e;
  }
}

// Usage : la logique (cache) est partagée, le type est précis
const users = new Repository<User>((id) =>
  fetchJson<User>(\`https://api.exemple.com/users/\${id}\`)
);`,
      },
    ],
  },
  {
    id: "pattern-event-emitter",
    title: "Pattern : émetteur d'événements typé",
    level: 3,
    intro: "Des événements vérifiés à l'émission comme à l'écoute.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "EventEmitter typé",
        code: `type Ecouteurs<E> = {
  [K in keyof E]: Array<(payload: E[K]) => void>;
};

class Emetteur<E extends Record<string, unknown>> {
  private ecouteurs = {} as Ecouteurs<E>;

  sur<K extends keyof E>(event: K, fn: (p: E[K]) => void): void {
    (this.ecouteurs[event] ??= []).push(fn);
  }

  emettre<K extends keyof E>(event: K, payload: E[K]): void {
    this.ecouteurs[event]?.forEach((fn) => fn(payload));
  }
}

interface Events { message: { texte: string }; quitter: undefined }
const bus = new Emetteur<Events>();
bus.sur("message", (p) => console.log(p.texte)); // p typé !
bus.emettre("message", { texte: "salut" });       // payload vérifié`,
      },
    ],
  },
  {
    id: "erreurs-contraintes",
    title: "Erreur : contrainte non satisfaite",
    level: 3,
    intro: "Quand `T` refuse le type fourni.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lisez la contrainte : `T extends { id: string }` exige `id` — le type fourni en manque.",
          "Souvent, c'est l'inférence qui a choisi un `T` trop étroit : annotez explicitement `<MonType>`.",
          "Vérifiez que vous n'avez pas inversé la relation : la contrainte est un minimum, pas un maximum.",
        ],
      },
    ],
  },
  {
    id: "erreurs-inference",
    title: "Erreur : inférence inattendue",
    level: 3,
    intro: "Quand `T` n'est pas ce que vous croyiez.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Élargissement",
        code: `function premier<T>(liste: T[]): T | undefined {
  return liste[0];
}

// T inféré comme string[] — pas comme tuple !
const t = premier([["a"], ["b"]]); // T = string[][], pas [string[], string[]]

// Forcer le tuple si besoin :
const t2 = premier([["a"], ["b"]] as [string[], string[]]);`,
      },
      {
        kind: "text",
        text: "L'inférence élargit (`\"a\"` → `string`, tableaux → `T[]`). Quand la précision compte (tuples, littéraux), utilisez `as const` ou annotez. Survolez l'appel dans l'éditeur : l'infobulle révèle le `T` réellement choisi.",
      },
    ],
  },
  {
    id: "debug-types",
    title: "Déboguer les types",
    level: 3,
    intro: "Voir ce que le compilateur voit.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          { label: "Survol", value: "L'infobulle de l'éditeur affiche le type inféré à chaque position : le premier outil de debug." },
          { label: "Assignation volontaire", value: "Assignez le type à une variable d'un type incompatible : l'erreur révèle sa forme exacte." },
          { label: "`satisfies`", value: "Vérifie qu'une valeur satisfait un type sans l'élargir : le meilleur des deux mondes." },
          { label: "Décomposer", value: "Extrayez les morceaux (`type X = T[K]`) dans des alias nommés pour les inspecter un par un." },
        ],
      },
    ],
  },
  {
    id: "projets-generiques",
    title: "Projets : génériques en action",
    level: 3,
    intro: "Valider par des abstractions réelles.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Bibliothèque utilitaire", detail: "`groupBy`, `unique`, `partition`, `zip` : quatre fonctions génériques testées, typées, documentées." },
          { title: "Client API typé", detail: "`fetchJson<T>` + `Repository<T>` + cache : un accès données complet sans `any`." },
          { title: "Mini-store", detail: "Un store générique `createStore<T>(initial: T)` avec abonnements typés : le pattern des state managers." },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-generiques",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Des génériques lisibles, pas des puzzles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Nommez clairement : `T` pour un paramètre, `TKey`/`TValue` ou `K`/`V` pour plusieurs — évitez les lettres seules au-delà de deux.",
          "Contraignez dès que le corps utilise une propriété : `<T extends { id: string }>` plutôt qu'un `as` interne.",
          "Laissez l'inférence travailler : n'annotez `<T>` à l'appel que pour forcer ou élargir.",
          "Préférez un générique à trois surcharges.",
          "Ne faites pas de la magie de types pour impressionner : un type incompréhensible est un bug en attente.",
          "Documentez les paramètres de type comme les paramètres de fonction.",
        ],
      },
    ],
  },
  {
    id: "alias-generiques",
    title: "Alias génériques",
    level: 3,
    intro: "Nommer des formes paramétrées avec `type`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Types utilitaires maison",
        code: `// Un dictionnaire dont on ne connaît pas encore le contenu
type Dict<T> = Record<string, T>;

// Une paire nommée réutilisable
type Paire<A, B> = [premier: A, second: B];

// Une fonction de rappel typée par son payload
type Handler<E> = (event: E) => void;

const scores: Dict<number> = { akane: 1500 };
const coord: Paire<number, number> = [48.8, 2.3];`,
      },
      {
        kind: "text",
        text: "Les alias génériques nomment des patterns récurrents : plus besoin de répéter `Record<string, T>` partout. Les labels de tuple (`[premier: A, second: B]`) documentent chaque position.",
      },
    ],
  },
  {
    id: "widening-litteraux",
    title: "Widening : l'élargissement des littéraux",
    level: 3,
    intro: "Pourquoi `\"akane\"` devient `string`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Élargissement à l'inférence",
        code: `function identite<T>(x: T): T { return x; }

const s = identite("akane"); // T = string, pas "akane" !
// Les littéraux sont élargis sauf contrainte contraire.

// Garder le littéral : contraindre par string
function f<T extends string>(x: T): T { return x; }
const s2 = f("akane"); // T = "akane" — littéral préservé

// Ou figer avec as const :
const s3 = identite("akane" as const); // T = "akane"`,
      },
      {
        kind: "text",
        text: "Par défaut, l'inférence élargit les littéraux vers leur type de base. Une contrainte `extends string` (ou `number`) préserve le littéral : c'est ce qui rend les template literal types et les unions de littéraux possibles.",
      },
    ],
  },
  {
    id: "contraintes-fonctions",
    title: "Contraindre par des signatures",
    level: 3,
    intro: "Exiger qu'un type soit appelable.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "T extends fonction",
        code: `// Exécute n'importe quelle fonction en mesurant son temps
async function mesure<T extends (...args: never[]) => unknown>(
  fn: T,
  ...args: Parameters<T>
): Promise<{ resultat: Awaited<ReturnType<T>>; dureeMs: number }> {
  const debut = Date.now();
  const resultat = (await fn(...args)) as Awaited<ReturnType<T>>;
  return { resultat, dureeMs: Date.now() - debut };
}

async function charger(id: number): Promise<string> { return \`u\${id}\`; }
const r = await mesure(charger, 1);
// r.resultat: string, r.dureeMs: number — tout est inféré`,
      },
      {
        kind: "text",
        text: "`Parameters<T>` et `ReturnType<T>` extraient la signature du type contraint : le wrapper reste transparent. `Awaited<T>` déballe les promesses imbriquées. C'est le niveau « framework » des génériques — à utiliser quand le gain en réutilisabilité le justifie.",
      },
    ],
  },
  {
    id: "generiques-et-heritage",
    title: "Génériques et héritage",
    level: 3,
    intro: "Combiner paramètres de type et hiérarchies de classes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Sous-classe générique",
        code: `class Boite<T> {
  constructor(public contenu: T) {}
}

// La sous-classe peut fixer ou propager le paramètre
class BoiteNombre extends Boite<number> {
  doubler(): number {
    return this.contenu * 2;
  }
}

class BoiteEtiquetee<T> extends Boite<T> {
  constructor(contenu: T, public etiquette: string) {
    super(contenu);
  }
}

const b = new BoiteEtiquetee("texte", "important"); // BoiteEtiquetee<string>`,
      },
      {
        kind: "text",
        text: "Une classe générique s'étend comme une classe normale : on fixe le paramètre (`extends Boite<number>`) ou on le propage (`class X<T> extends Boite<T>`). Les contraintes se déclarent une fois sur la classe de base.",
      },
    ],
  },
  {
    id: "defaut-avec-contrainte",
    title: "Défaut combiné à une contrainte",
    level: 3,
    intro: "Le paramètre par défaut doit satisfaire la contrainte.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Contrainte + défaut",
        code: `interface ConfigBase { verbose: boolean }

// Le défaut {} ne satisfait pas la contrainte : il faut un défaut complet
function demarrer<T extends ConfigBase = ConfigBase>(config?: T): T {
  const finale = { verbose: false, ...config } as T;
  return finale;
}

demarrer(); // T = ConfigBase
demarrer({ verbose: true, niveau: 3 }); // T = { verbose: boolean; niveau: number }`,
      },
      {
        kind: "text",
        text: "Règle : le type par défaut doit lui-même satisfaire la contrainte `extends`. Cette combinaison est courante dans les options de configuration : un défaut raisonnable, surchargeable par des options plus précises.",
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
          { label: "Handbook — Generics", value: "typescriptlang.org/docs/handbook/2/generics.html : la référence complète, des bases aux contraintes." },
          { label: "Handbook — Mapped Types", value: "La transformation de types pas à pas, avec `Partial` et `Pick` décortiqués." },
          { label: "Handbook — Conditional Types", value: "`infer`, distributivité et cas d'usage avancés à la source." },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les génériques ouvrent la porte du typage avancé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Passer à `utility-types` : `Partial`, `Pick`, `Omit`, `Record` — des génériques prêts à l'emploi.",
          "Puis `types-avances` : unions discriminées, gardes et exhaustivité.",
          "Ensuite `modules` : organiser le code générique en bibliothèques.",
          "Revenir ici quand un utilitaire mérite d'être généralisé sans perdre ses types.",
        ],
      },
    ],
  },
];

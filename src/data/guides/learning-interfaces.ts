import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'Interfaces & aliases : décrire la forme des
 * objets, composer des contrats, modéliser un domaine. 3 niveaux
 * d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_INTERFACES: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Les interfaces nomment la forme des objets : le contrat explicite au cœur de TypeScript.",
    blocks: [
      {
        kind: "text",
        text: "Les applications manipulent des objets partout : utilisateurs, réponses d'API, options, états. Sans interfaces, ces formes restent implicites — chaque fonction les devine, et la documentation n'existe que dans la tête des développeurs. Une interface (`interface User { pseudo: string; nv: number }`) transforme cette forme implicite en contrat vérifié par le compilateur.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Le contrat en action",
        code: `interface User {
  pseudo: string;
  nv: number;
}

function presenter(u: User): string {
  return \`\${u.pseudo} (nv \${u.nv})\`;
}

presenter({ pseudo: "akane", nv: 12 }); // OK
// presenter({ pseudo: "akane" });      // Erreur : il manque nv`,
      },
    ],
  },
  {
    id: "contrat",
    title: "Interfaces : des contrats, pas des classes",
    level: 1,
    intro: "La distinction fondamentale avec la programmation orientée objet classique.",
    blocks: [
      {
        kind: "diagram",
        title: "Ce que décrit une interface",
        lines: [
          "interface User { pseudo: string; nv: number }",
          "     │",
          "     ├── Décrit une FORME : quelles propriétés, de quels types",
          "     ├── N'existe qu'à la compilation (zéro code généré)",
          "     ├── N'importe quel objet compatible est accepté (typage structurel)",
          "     │",
          "     ▼",
          "Pas besoin de « implements » : la forme suffit.",
        ],
      },
      {
        kind: "text",
        text: "Contrairement à d'autres langages, TypeScript ne demande pas de déclarer qu'un objet « implémente » une interface : si la forme correspond, c'est accepté. C'est le typage structurel — plus souple, et parfaitement adapté aux objets littéraux et aux données JSON.",
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
    intro: "Les bases à avoir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Objets JavaScript : littéraux, propriétés, imbrication (voir `js-moderne`).",
          "Types de base : `string`, `number`, `boolean`, tableaux (voir `types-base`).",
        ],
      },
    ],
  },
  {
    id: "premiere-interface",
    title: "Première interface",
    level: 2,
    intro: "Déclarer et utiliser une forme.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Déclaration et usage",
        code: `interface Produit {
  id: string;
  nom: string;
  prix: number;
  enStock: boolean;
}

const clavier: Produit = {
  id: "kb-01",
  nom: "Clavier mécanique",
  prix: 89.9,
  enStock: true,
};

function prixTTC(p: Produit): number {
  return p.prix * 1.2; // p.prix est un number : autocomplétion + vérification
}`,
      },
      {
        kind: "text",
        text: "Convention : noms en `PascalCase` (`User`, `Produit`, `ApiResponse`). L'annotation `: Produit` déclenche la vérification : propriété manquante, type incorrect ou faute de frappe sont signalés immédiatement.",
      },
    ],
  },
  {
    id: "proprietes-types",
    title: "Propriétés et leurs types",
    level: 2,
    intro: "Chaque propriété porte un type — y compris des objets.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Propriétés variées",
        code: `interface Commande {
  id: string;
  lignes: LigneCommande[];       // tableau d'un autre type
  client: { nom: string };       // objet inline (ou une interface nommée)
  payee: boolean;
  total: number;
}

interface LigneCommande {
  produitId: string;
  quantite: number;
}`,
      },
      {
        kind: "text",
        text: "Préférez les interfaces nommées aux objets inline dès qu'une forme est réutilisée ou mérite un nom. Les interfaces se composent : une `Commande` contient des `LigneCommande`, qui référencent des produits.",
      },
    ],
  },
  {
    id: "optionnel",
    title: "Propriétés optionnelles",
    level: 2,
    intro: "Le marqueur `?` : modéliser l'absence.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Le ? qui change tout",
        code: `interface Profil {
  pseudo: string;
  bio?: string;        // peut être absente
  avatarUrl?: string;
}

function afficherBio(p: Profil): string {
  // p.bio est string | undefined : le compilateur force à gérer l'absence
  return p.bio ?? "Pas de bio pour le moment.";
}

const p1: Profil = { pseudo: "akane" };              // OK
const p2: Profil = { pseudo: "dada", bio: "Joueur" }; // OK`,
      },
      {
        kind: "text",
        text: "`bio?: string` équivaut à `bio: string | undefined`. Le compilateur vous interdit d'utiliser `p.bio` comme un `string` pur : l'absence est traitée, pas subie. C'est exactement le genre d'erreur qui plantait en production en JavaScript.",
      },
    ],
  },
  {
    id: "readonly",
    title: "`readonly` : l'immutabilité déclarée",
    level: 2,
    intro: "Interdire la réassignation après création.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Propriétés en lecture seule",
        code: `interface Config {
  readonly hote: string;
  readonly port: number;
}

const cfg: Config = { hote: "localhost", port: 8080 };
// cfg.port = 9090; // Erreur : propriété en lecture seule

// Aussi sur les tableaux :
const tags: readonly string[] = ["ts", "web"];
// tags.push("x"); // Erreur : push n'existe pas sur readonly string[]`,
      },
      {
        kind: "text",
        text: "`readonly` protège les données partagées (configuration, constantes métier) contre les modifications accidentelles. Notez que c'est une garantie de compilation uniquement : à l'exécution, rien n'empêche la mutation.",
      },
    ],
  },
  {
    id: "alias-type",
    title: "Alias de type (`type`)",
    level: 2,
    intro: "Nommer n'importe quel type, pas seulement des objets.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "type vs interface",
        code: `// Alias : nomme n'importe quel type
type Identifiant = string | number;
type Statut = "brouillon" | "publie" | "archive";
type Coordonnee = [number, number]; // tuple

// Interface : nomme la forme d'un objet
interface User {
  id: Identifiant;
  statut: Statut;
}`,
      },
      {
        kind: "text",
        text: "Les deux se complètent : `interface` pour les formes d'objets extensibles, `type` pour les unions, les tuples, les fonctions et les utilitaires. Un alias donne un nom parlant à une idée — `Statut` vaut mieux que `\"brouillon\" | \"publie\" | \"archive\"` répété dix fois.",
      },
    ],
  },
  {
    id: "interface-vs-type",
    title: "Interface ou type : que choisir ?",
    level: 2,
    intro: "La règle pratique, sans dogme.",
    blocks: [
      {
        kind: "table",
        headers: ["Besoin", "Préférer", "Raison"],
        rows: [
          ["Forme d'un objet / classe", "`interface`", "Extensible via `extends`, messages d'erreur plus clairs"],
          ["Union, tuple, fonction", "`type`", "`interface` ne peut pas les exprimer"],
          ["API publique d'une bibliothèque", "`interface`", "Les consommateurs peuvent l'étendre par fusion"],
          ["Transformation de type", "`type`", "Combiné aux mapped/conditional types"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, la plupart des équipes utilisent les deux librement : `interface` pour les modèles du domaine, `type` pour le reste. L'important est la cohérence au sein du projet, pas le choix absolu.",
      },
    ],
  },
  {
    id: "extends",
    title: "Héritage avec `extends`",
    level: 2,
    intro: "Spécialiser une interface sans la recopier.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Extension",
        code: `interface Animal {
  nom: string;
}

interface Chien extends Animal {
  race: string;
  aboie: boolean;
}

const medor: Chien = {
  nom: "Médor",
  race: "Labrador",
  aboie: true,
}; // les trois propriétés sont exigées`,
      },
      {
        kind: "text",
        text: "`extends` ajoute des propriétés à une forme existante — et peut étendre plusieurs interfaces à la fois (`interface C extends A, B`). La forme enfant reste compatible avec le parent : un `Chien` est utilisable partout où un `Animal` est attendu.",
      },
    ],
  },
  {
    id: "intersection",
    title: "Intersection (`&`)",
    level: 2,
    intro: "Combiner des types sans hiérarchie.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Composer avec &",
        code: `interface Nommable { nom: string }
interface Datable { creeLe: Date }

type EntiteNommee = Nommable & Datable;
// => { nom: string; creeLe: Date }

function enregistrer(e: EntiteNommee): void {
  console.log(e.nom, e.creeLe);
}`,
      },
      {
        kind: "text",
        text: "L'intersection fusionne les propriétés : l'objet doit satisfaire les deux côtés. Là où `extends` crée une hiérarchie nommée, `&` compose à la volée — idéal pour les mixins, les options combinées et les types utilitaires.",
      },
    ],
  },
  {
    id: "objets-imbriques",
    title: "Objets imbriqués",
    level: 2,
    intro: "Modéliser des structures profondes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Imbrication propre",
        code: `interface Adresse {
  rue: string;
  ville: string;
  codePostal?: string;
}

interface Client {
  id: string;
  nom: string;
  adresse: Adresse;            // interface nommée réutilisable
  adressesLivraison: Adresse[]; // tableau d'adresses
}

function villeDe(c: Client): string {
  return c.adresse.ville; // navigation typée en profondeur
}`,
      },
      {
        kind: "command",
        label: "Vérifier les interfaces",
        command: "npx tsc --noEmit",
        why: "Valide toutes les formes du projet : propriétés manquantes, types incompatibles, fautes de frappe dans les noms. Sur un modèle de domaine, cette commande est le test de cohérence permanent — elle échoue dès qu'une forme ne correspond plus à son usage.",
        verify: "echo $?",
      },
    ],
  },
  {
    id: "mini-exemple-api",
    title: "Mini-exemple : modéliser une réponse d'API",
    level: 2,
    intro: "Le cas d'usage le plus fréquent.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Copier le JSON réel", detail: "Prenez une vraie réponse de l'API (navigateur → onglet Réseau, ou `curl`)." },
          { title: "Décrire la forme", detail: "Une interface par niveau d'imbrication : `ApiResponse`, `User`, `Adresse`." },
          { title: "Typer le fetch", detail: "`fetchJson<ApiResponse>(url)` : le retour est typé de bout en bout." },
          { title: "Gérer l'optionnel", detail: "Les champs parfois absents deviennent `?` : le compilateur force leur traitement." },
          { title: "Vérifier", detail: "`npx tsc --noEmit` : tout accès à un champ inexistant est signalé." },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "declaration-merging",
    title: "Fusion de déclarations",
    level: 3,
    intro: "La particularité des interfaces : elles fusionnent.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Deux déclarations, une interface",
        code: `interface Config {
  hote: string;
}

interface Config {
  port: number;
}

// Config = { hote: string; port: number } — fusion automatique
const c: Config = { hote: "localhost", port: 8080 };`,
      },
      {
        kind: "text",
        text: "Deux interfaces de même nom fusionnent leurs propriétés. C'est le mécanisme de l'extension de bibliothèques : on enrichit une interface tierce sans la modifier. Les alias `type`, eux, ne fusionnent jamais — une redéclaration est une erreur.",
      },
      {
        kind: "list",
        items: [
          "Usage légitime : étendre les types d'une bibliothèque (`declare module`).",
          "À éviter dans son propre code : une interface doit être définie en un seul endroit lisible.",
        ],
      },
    ],
  },
  {
    id: "index-signatures",
    title: "Signatures d'index",
    level: 3,
    intro: "Typer les dictionnaires à clés dynamiques.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Dictionnaires typés",
        code: `interface Scores {
  [pseudo: string]: number; // n'importe quelle clé string => number
}

const scores: Scores = { akane: 1500, dada: 1200 };
scores["nouveau"] = 900; // OK

// Avec des clés contraintes :
type Role = "admin" | "membre";
type Permissions = Record<Role, string[]>;
const perms: Permissions = {
  admin: ["tout"],
  membre: ["lire"],
};`,
      },
      {
        kind: "text",
        text: "La signature d'index `[cle: string]: T` accepte n'importe quelle clé — pratique pour les caches et les maps dynamiques, mais moins sûre que des clés connues. Quand les clés sont un ensemble fini, préférez `Record<Union, T>`.",
      },
    ],
  },
  {
    id: "interfaces-callable",
    title: "Interfaces appelables",
    level: 3,
    intro: "Décrire des fonctions avec des propriétés.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Fonction + propriétés",
        code: `// Une fonction qui porte aussi des métadonnées
interface CompteurFn {
  (pas?: number): number; // signature d'appel
  total: number;           // propriétés attachées
  reset(): void;
}

function creerCompteur(): CompteurFn {
  const fn = ((pas: number = 1) => {
    fn.total += pas;
    return fn.total;
  }) as CompteurFn;
  fn.total = 0;
  fn.reset = () => { fn.total = 0; };
  return fn;
}`,
      },
      {
        kind: "text",
        text: "Les interfaces peuvent décrire des objets appelables — le pattern des bibliothèques comme jQuery ou des middlewares Express. En pratique moderne, on préfère souvent un objet avec une méthode, plus lisible.",
      },
    ],
  },
  {
    id: "classes-implements",
    title: "`implements` : les classes face aux interfaces",
    level: 3,
    intro: "Garantir qu'une classe respecte un contrat.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Contrat de classe",
        code: `interface Stockable {
  reference: string;
  quantite(): number;
}

class ProduitPhysique implements Stockable {
  constructor(
    public reference: string,
    private stock: number
  ) {}

  quantite(): number {
    return this.stock;
  }
}

// class Mauvais implements Stockable {} // Erreur : membres manquants`,
      },
      {
        kind: "text",
        text: "`implements` vérifie à la compilation que la classe fournit tous les membres — sans changer le JavaScript généré. Utile pour les architectures à plugins ou les adaptateurs : le contrat est explicite et vérifié.",
      },
    ],
  },
  {
    id: "interfaces-generiques-rappel",
    title: "Interfaces génériques : rappel",
    level: 3,
    intro: "Le pont vers la compétence `generiques`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Formes paramétrées",
        code: `interface Pagine<T> {
  items: T[];
  page: number;
  totalPages: number;
  aSuivant: boolean;
}

type PageUsers = Pagine<{ pseudo: string }>;

// Contrainte sur le paramètre :
interface Identifiable { id: string }
interface Depot<T extends Identifiable> {
  parId(id: string): T | undefined;
  tous(): T[];
}`,
      },
      {
        kind: "text",
        text: "Les interfaces génériques modélisent les enveloppes (pagination, réponses API, dépôts) : la structure est définie une fois, le contenu varie. Tout le détail dans la compétence `generiques`.",
      },
    ],
  },
  {
    id: "tuples-records",
    title: "Tuples et Record dans les interfaces",
    level: 3,
    intro: "Des propriétés aux formes précises.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Formes exactes",
        code: `interface Position {
  coords: [number, number]; // tuple : exactement 2 nombres
  etiquettes: Record<string, string>; // dictionnaire
  historique: Array<{ date: Date; action: string }>;
}

const p: Position = {
  coords: [48.85, 2.35],
  etiquettes: { ville: "Paris" },
  historique: [],
};`,
      },
      {
        kind: "text",
        text: "Les tuples fixent la longueur et le type par position — idéal pour les coordonnées, les paires clé/valeur, les retours multiples. `Record<K, V>` est le dictionnaire typé standard.",
      },
    ],
  },
  {
    id: "unions-discriminantes-apercu",
    title: "Unions discriminées : aperçu",
    level: 3,
    intro: "Le pont vers la compétence `unions`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Le pattern",
        code: `interface Succes { statut: "ok"; data: string }
interface Echec { statut: "erreur"; message: string }

type Resultat = Succes | Echec;

function traiter(r: Resultat): void {
  if (r.statut === "ok") {
    console.log(r.data); // r est Succes ici — affiné automatiquement
  } else {
    console.error(r.message); // r est Echec ici
  }
}`,
      },
      {
        kind: "text",
        text: "Une propriété littérale commune (`statut`) permet au compilateur de distinguer les membres de l'union : c'est l'union discriminée, le pattern central pour les états (chargement/succès/erreur) et les messages. Détail complet dans `unions`.",
      },
    ],
  },
  {
    id: "as-const",
    title: "`as const` : figer les littéraux",
    level: 3,
    intro: "Des objets aux types les plus précis possibles.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Const assertion",
        code: `const config = {
  hote: "localhost",
  port: 8080,
  roles: ["admin", "membre"],
} as const;

// config.hote: "localhost" (littéral, pas string)
// config.roles: readonly ["admin", "membre"] (tuple readonly)

// config.port = 9090; // Erreur : tout est readonly`,
      },
      {
        kind: "text",
        text: "`as const` fige un objet : littéraux au lieu de types élargis, `readonly` partout, tuples au lieu de tableaux. Parfait pour les constantes de configuration et les maps de référence dont les valeurs ne doivent jamais changer.",
      },
    ],
  },
  {
    id: "satisfies",
    title: "`satisfies` : vérifier sans élargir",
    level: 3,
    intro: "Le meilleur des deux mondes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Vérification préservant la précision",
        code: `interface Route { chemin: string; methode: "GET" | "POST" }

const routes = {
  accueil: { chemin: "/", methode: "GET" },
  login: { chemin: "/login", methode: "POST" },
} satisfies Record<string, Route>;

// Vérifié contre Route... mais les types restent précis :
// routes.accueil.methode est "GET", pas "GET" | "POST" !`,
      },
      {
        kind: "text",
        text: "Avec une annotation classique, les littéraux seraient élargis ; sans annotation, aucune vérification. `satisfies` vérifie la conformité tout en gardant les types inférés précis — idéal pour les registres de configuration.",
      },
    ],
  },
  {
    id: "excess-property-checks",
    title: "Excès de propriétés : la vérification",
    level: 3,
    intro: "Pourquoi l'objet littéral est plus strict que la variable.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Le contrôle des littéraux",
        code: `interface User { pseudo: string }

// Littéral direct : les propriétés INCONNUES sont refusées
// const u: User = { pseudo: "a", age: 3 }; // Erreur : 'age' n'existe pas

// Via une variable : pas de contrôle d'excès (typage structurel)
const data = { pseudo: "a", age: 3 };
const u2: User = data; // OK — age est simplement ignoré`,
      },
      {
        kind: "text",
        text: "L'« excess property check » ne s'applique qu'aux littéraux d'objet assignés directement : c'est un filet contre les fautes de frappe (`psuedo` au lieu de `pseudo`). Via une variable intermédiaire, le typage structurel reprend ses droits.",
      },
    ],
  },
  {
    id: "typage-structurel",
    title: "Typage structurel",
    level: 3,
    intro: "La philosophie du système de types.",
    blocks: [
      {
        kind: "text",
        text: "TypeScript compare les formes, pas les noms : tout objet avec les bonnes propriétés est accepté, d'où qu'il vienne. C'est ce qui rend les données JSON immédiatement utilisables et les mocks de test triviaux à écrire.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "La forme suffit",
        code: `interface Volant { diametre: number }

class Roue { diametre = 40; }
const pizza = { diametre: 30, garniture: "4 fromages" };

function installer(v: Volant): void { /* ... */ }

installer(new Roue()); // OK : la forme correspond
installer(pizza);       // OK aussi ! La garniture est ignorée.`,
      },
      {
        kind: "text",
        text: "Contrepartie : le système ne distingue pas deux formes identiques à sens différent (voir les branded types plus bas). Pour le domaine métier, c'est parfois trop permissif — d'où les techniques de marquage.",
      },
    ],
  },
  {
    id: "branded-types",
    title: "Branded types : des types nominaux",
    level: 3,
    intro: "Distinguer des formes identiques.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Marquer les types",
        code: `// Deux string indistinguables... sauf par la marque
type UserId = string & { readonly __marque: "UserId" };
type CommandeId = string & { readonly __marque: "CommandeId" };

function chargerUser(id: UserId): void { /* ... */ }

const id = "u-123" as UserId;
chargerUser(id);              // OK
// chargerUser("c-456" as CommandeId); // Erreur : marques différentes`,
      },
      {
        kind: "text",
        text: "L'intersection avec un objet fantôme crée des types incompatibles entre eux malgré une base identique : impossible de confondre un `UserId` et un `CommandeId`. La marque n'existe qu'à la compilation (zéro coût runtime).",
      },
    ],
  },
  {
    id: "composition-vs-heritage",
    title: "Composition vs héritage",
    level: 3,
    intro: "Deux façons d'assembler des formes.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Héritage (`extends`)", "Composition (`&` / champs)"],
        rows: [
          ["Relation", "« est un » : `Chien extends Animal`", "« a un » : `Voiture { moteur: Moteur }`"],
          ["Flexibilité", "Rigide : hiérarchie figée", "Souple : on assemble à la demande"],
          ["Cas typique", "Taxonomies stables du domaine", "Options, mixins, variantes"],
          ["Risque", "Hiérarchies profondes fragiles", "Objets plats verbeux"],
        ],
      },
      {
        kind: "text",
        text: "Préférez la composition par défaut : elle survit mieux aux évolutions du domaine. Réservez `extends` aux hiérarchies réellement stables (rarement plus de 2 niveaux).",
      },
    ],
  },
  {
    id: "methodes-dans-interfaces",
    title: "Méthodes dans les interfaces",
    level: 3,
    intro: "Décrire aussi les comportements.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Deux syntaxes",
        code: `interface Service {
  // Syntaxe méthode (recommandée) :
  demarrer(): void;
  // Syntaxe propriété fonction (équivalente, plus verbeuse) :
  arreter: () => void;
}

// En mode strict, la syntaxe méthode est bivariante (plus permissive),
// la syntaxe propriété est stricte : un détail qui compte pour les callbacks.`,
      },
      {
        kind: "text",
        text: "Les interfaces décrivent les comportements autant que les données : c'est le contrat des services, des adaptateurs et des stratégies. Pour les types de callbacks stockés, la syntaxe propriété-fonction offre la vérification la plus stricte.",
      },
    ],
  },
  {
    id: "readonly-tableaux",
    title: "`readonly` en profondeur",
    level: 3,
    intro: "Les limites de l'immutabilité déclarée.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Superficiel par défaut",
        code: `interface Equipe {
  readonly nom: string;
  readonly membres: string[]; // le TABLEAU est readonly, pas son contenu !
}

const e: Equipe = { nom: "F", membres: ["a"] };
// e.membres.push("b"); // Erreur : push absent de readonly string[]
e.membres[0] = "z";      // PAS d'erreur ! Le contenu reste mutable.

// Pour une vraie profondeur : Readonly<T> récursif (voir utility-types).`,
      },
      {
        kind: "text",
        text: "`readonly` est superficiel : il fige la propriété, pas l'objet pointé. Pour les structures partagées critiques, combinez `readonly` avec des utilitaires profonds ou des conventions d'équipe (ne jamais muter les entrées).",
      },
    ],
  },
  {
    id: "optional-vs-undefined-detail",
    title: "Optionnel vs `| undefined` : la nuance",
    level: 3,
    intro: "Avec `exactOptionalPropertyTypes`, la différence compte.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "La nuance",
        code: `interface A { bio?: string }          // peut être absente
interface B { bio: string | undefined } // DOIT être présente (même undefined)

const a: A = {};                    // OK
// const b: B = {};                 // Erreur : bio manque
const b2: B = { bio: undefined };   // OK

// Avec exactOptionalPropertyTypes: true,
// bio?: string n'accepte plus undefined explicite : encore plus strict.`,
      },
      {
        kind: "text",
        text: "Par défaut, `?` et `| undefined` se comportent presque pareil. Le flag `exactOptionalPropertyTypes` (strict+) les distingue rigoureusement : utile pour les API où « absent » et « explicitement undefined » ont des sens différents.",
      },
    ],
  },
  {
    id: "modelisation-api",
    title: "Modéliser une API complète",
    level: 3,
    intro: "Du JSON brut au domaine typé.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Domaine d'une API",
        code: `// 1. Les entités
interface User { id: string; pseudo: string; nv: number }
interface Post { id: string; auteurId: string; titre: string; tags: string[] }

// 2. Les enveloppes de réponse
interface Page<T> { items: T[]; page: number; total: number }
interface ApiError { code: string; message: string }

// 3. Les requêtes
interface CreerPostInput {
  titre: string;
  contenu: string;
  tags?: string[];
}

// 4. Usage
async function listerPosts(page: number): Promise<Page<Post>> { /* ... */ }`,
      },
      {
        kind: "text",
        text: "Structure type : entités, enveloppes génériques, inputs de création (souvent `Omit<Entite, \"id\">`), erreurs. Ce découpage rend l'API lisible et chaque couche testable séparément.",
      },
    ],
  },
  {
    id: "evolution-interfaces",
    title: "Faire évoluer les interfaces",
    level: 3,
    intro: "Changer les formes sans casser les consommateurs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ajouter une propriété optionnelle (`?`) : compatible — les anciens objets restent valides.",
          "Ajouter une propriété obligatoire : cassant — chaque construction doit être mise à jour.",
          "Renommer : utilisez `F2` dans l'éditeur, le serveur met tout à jour.",
          "Supprimer : cherchez d'abord toutes les références (`Maj+F12`) pour mesurer l'impact.",
          "Versionner les API : préférez de nouvelles interfaces (`UserV2`) aux modifications silencieuses.",
        ],
      },
    ],
  },
  {
    id: "erreurs-prop-manquante",
    title: "Erreur : propriété manquante",
    level: 3,
    intro: "L'erreur d'interface la plus fréquente.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le message cite la propriété manquante et le type attendu : ajoutez-la ou rendez-la optionnelle (`?`).",
          "Si l'objet vient d'une API, la forme réelle diffère peut-être : vérifiez le JSON, pas votre supposition.",
          "Ne contournez pas avec `as` : vous mentiriez au compilateur et le bug reviendrait à l'exécution.",
        ],
      },
    ],
  },
  {
    id: "erreurs-excess",
    title: "Erreur : propriété en excès",
    level: 3,
    intro: "Quand le littéral en fait trop.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cause typique : faute de frappe (`psuedo` au lieu de `pseudo`) — le compilateur vous rend service.",
          "Si la propriété est légitime, ajoutez-la à l'interface (ou étendez-la).",
          "Pour les objets à forme variable, utilisez une signature d'index ou `Record<string, T>`.",
        ],
      },
    ],
  },
  {
    id: "erreurs-assignabilite",
    title: "Erreur : types incompatibles",
    level: 3,
    intro: "Lire les messages d'assignabilité.",
    blocks: [
      {
        kind: "text",
        text: "« Type X is not assignable to type Y » : le message détaille ensuite la propriété fautive en profondeur. Lisez de bas en haut : la cause racine est à la fin. Les coupables habituels : un `undefined` non géré, un tableau là où un tuple est attendu, ou une optionnalité oubliée.",
      },
    ],
  },
  {
    id: "projets-interfaces",
    title: "Projets : modélisation",
    level: 3,
    intro: "Valider par un domaine complet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Schéma de domaine", detail: "Modélisez un domaine réel (bibliothèque, boutique, jeu) : entités, relations, états — 10+ interfaces cohérentes." },
          { title: "Client API typé", detail: "Enveloppes génériques + entités + inputs : consommez une API publique avec zéro `any`." },
          { title: "Branded types", detail: "Introduisez `UserId`, `Email` marqués dans le domaine : mesurez les erreurs attrapées." },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-interfaces",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Des contrats clairs et durables.",
    blocks: [
      {
        kind: "list",
        items: [
          "`PascalCase` pour les noms, descriptifs (`ApiResponse`, pas `Data`).",
          "`interface` pour les objets du domaine, `type` pour unions et utilitaires.",
          "Optionnel (`?`) pour ce qui peut manquer, jamais par paresse.",
          "`readonly` pour la configuration et les données partagées.",
          "Composer (`&`, champs) plutôt qu'hériter profondément.",
          "Une interface = une responsabilité ; découper les formes géantes.",
          "Ne pas mentir avec `as` : corriger la forme ou l'usage.",
        ],
      },
    ],
  },
  {
    id: "serialisation-dto",
    title: "DTO : séparer transport et domaine",
    level: 3,
    intro: "Les formes d'API ne sont pas les formes métier.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Deux couches de types",
        code: `// Ce que l'API envoie (snake_case, dates en string)
interface UserDto {
  id: string;
  pseudo: string;
  created_at: string;
}

// Ce que le domaine manipule (camelCase, vrais types)
interface User {
  id: string;
  pseudo: string;
  creeLe: Date;
}

function versUser(dto: UserDto): User {
  return {
    id: dto.id,
    pseudo: dto.pseudo,
    creeLe: new Date(dto.created_at),
  };
}`,
      },
      {
        kind: "text",
        text: "Ne laissez pas les formes brutes de l'API contaminer le domaine : une fonction de mapping `versX` convertit à la frontière (dates, casse, champs calculés). Le domaine reste propre et les changements d'API sont isolés en un seul endroit.",
      },
    ],
  },
  {
    id: "proprietes-symboles",
    title: "Clés symboliques et uniques",
    level: 3,
    intro: "Des propriétés vraiment privées au niveau objet.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "unique symbol",
        code: `declare const CleInterne: unique symbol;

interface Compte {
  titulaire: string;
  [CleInterne]: number; // propriété symbolique typée
}

const c: Compte = {
  titulaire: "akane",
  [CleInterne]: 42,
};

// Invisible à Object.keys et JSON.stringify : métadonnées internes.`,
      },
      {
        kind: "text",
        text: "Les `unique symbol` comme clés créent des propriétés invisibles à l'itération normale : utiles pour attacher des métadonnées (cache, identifiants internes) sans polluer la forme publique. Un usage avancé, réservé aux bibliothèques.",
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
          { label: "Handbook — Object Types", value: "typescriptlang.org/docs/handbook/2/objects.html : interfaces, alias, extends, en détail." },
          { label: "Handbook — Everyday Types", value: "Le quotidien : tableaux, tuples, littéraux et leurs interactions." },
          { label: "Handbook — Narrowing", value: "Affiner les unions d'interfaces avec les gardes de type." },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les formes sont modélisées : exploitez-les.",
    blocks: [
      {
        kind: "list",
        items: [
          "Passer à `unions` : alternatives, discrimination et exhaustivité.",
          "Puis `generiques` : des interfaces paramétrées par leur contenu.",
          "Ensuite `utility-types` : `Partial`, `Pick`, `Omit` pour dériver des variantes.",
          "Enfin `classes` : quand le comportement rejoint les données.",
        ],
      },
    ],
  },
];

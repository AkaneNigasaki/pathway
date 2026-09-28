import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Fonctions typées : signatures, paramètres,
 * surcharges et patterns avancés. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_FONCTIONS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Typer les fonctions, c'est écrire le contrat de chaque frontière du code.",
    blocks: [
      {
        kind: "text",
        text: "Les fonctions sont les frontières de votre programme : c'est par leurs paramètres qu'entrent les données, et par leur retour qu'elles ressortent. Typer une fonction, c'est décrire ce contrat — `(a: string, b: number) => boolean` — pour que le compilateur vérifie chaque appel.",
      },
      {
        kind: "text",
        text: "En JavaScript, une fonction accepte n'importe quoi et retourne n'importe quoi : les erreurs apparaissent à l'exécution. En TypeScript, un appel avec un mauvais type est refusé avant même de compiler. Les bugs « mauvais argument » disparaissent de la production.",
      },
    ],
  },
  {
    id: "signature-contrat",
    title: "La signature comme contrat",
    level: 1,
    intro: "Lire une signature, c'est lire la documentation.",
    blocks: [
      {
        kind: "diagram",
        title: "Anatomie d'une signature",
        lines: [
          "function inscrire(pseudo: string, age?: number): Promise<User>",
          "       │              │              │                  │",
          "       │              │              │                  └─ retour : promesse d'utilisateur",
          "       │              │              └─ paramètre optionnel",
          "       │              └─ paramètre typé",
          "       └─ nom de la fonction",
          "",
          "Le compilateur vérifie : nombre d'arguments, leurs types, le type retourné.",
        ],
      },
      {
        kind: "text",
        text: "Une bonne signature se lit sans ouvrir le corps de la fonction. C'est aussi une documentation qui ne ment jamais : si elle ment, le code ne compile pas.",
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
    intro: "Les bases à avoir en tête.",
    blocks: [
      {
        kind: "list",
        items: [
          "Fonctions JavaScript : déclaration, fléchées, callbacks (voir `js-moderne`).",
          "Types de base : `string`, `number`, `boolean`, `undefined` (voir `types-base`).",
          "Un projet qui compile avec `npx tsc --noEmit`.",
        ],
      },
    ],
  },
  {
    id: "anatomie-signature",
    title: "Anatomie d'une signature",
    level: 2,
    intro: "La syntaxe complète, morceau par morceau.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Signatures typées",
        code: `// Fonction nommée typée
function addition(a: number, b: number): number {
  return a + b;
}

// Fonction fléchée typée
const addition2 = (a: number, b: number): number => a + b;

// Le type d'une fonction comme annotation
const operation: (a: number, b: number) => number = addition;`,
      },
      {
        kind: "text",
        text: "Chaque paramètre porte son type après `:`, le retour après la parenthèse fermante. La troisième forme — typer une variable avec un type fonction — est utile pour les callbacks et les tables de stratégies.",
      },
    ],
  },
  {
    id: "parametres",
    title: "Paramètres typés",
    level: 2,
    intro: "Le compilateur vérifie chaque argument à chaque appel.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Vérification des appels",
        code: `function inscrire(pseudo: string, niveau: number): string {
  return \`\${pseudo} (nv \${niveau})\`;
}

inscrire("Akane", 12);   // OK
// inscrire("Akane");    // Erreur : il manque niveau
// inscrire(12, "Akane"); // Erreur : types inversés`,
      },
      {
        kind: "text",
        text: "Avec `strict`, un paramètre sans annotation est interdit (`implicit any`) : tout est typé, sans exception. C'est une contrainte qui paie : chaque appel est prouvé correct à la compilation.",
      },
    ],
  },
  {
    id: "valeur-retour",
    title: "Valeur de retour",
    level: 2,
    intro: "Annoter le retour, ou laisser l'inférence travailler.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Retour explicite vs inféré",
        code: `// Explicite : recommandé pour les fonctions exportées (le contrat est visible)
function prixTTC(ht: number): number {
  return ht * 1.2;
}

// Inféré : le compilateur déduit number — parfait pour les fonctions internes
const double = (n: number) => n * 2;

// Pas de retour : void
function journaliser(msg: string): void {
  console.log(msg);
}`,
      },
      {
        kind: "text",
        text: "Convention : annotez le retour des fonctions publiques (API, exports) pour figer le contrat ; laissez l'inférence pour les petites fonctions internes. `void` signale « aucun retour utile » — différent de `undefined` (voir niveau 3).",
      },
    ],
  },
  {
    id: "optionnels-defauts",
    title: "Paramètres optionnels et défauts",
    level: 2,
    intro: "Rendre un argument facultatif, proprement.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Deux syntaxes",
        code: `// Optionnel : le paramètre peut être omis (vaut undefined)
function saluer(nom: string, titre?: string): string {
  return titre ? \`\${titre} \${nom}\` : nom;
}

// Valeur par défaut : omis => la valeur s'applique
function connecter(hote: string, port: number = 8080): string {
  return \`\${hote}:\${port}\`;
}

saluer("Akane");            // "Akane"
connecter("localhost");     // "localhost:8080"`,
      },
      {
        kind: "text",
        text: "Règle d'ordre : les paramètres optionnels ou à défaut viennent après les obligatoires. `titre?: string` équivaut à `titre: string | undefined` — le compilateur vous force à gérer l'absence.",
      },
    ],
  },
  {
    id: "rest-params",
    title: "Paramètres rest",
    level: 2,
    intro: "Accepter un nombre variable d'arguments, typés.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Rest typé",
        code: `function somme(...nombres: number[]): number {
  return nombres.reduce((total, n) => total + n, 0);
}

somme(1, 2, 3);    // 6
somme();           // 0
// somme(1, "x");  // Erreur : "x" n'est pas un number`,
      },
      {
        kind: "text",
        text: "Le paramètre rest est toujours le dernier et devient un tableau typé dans le corps. C'est la version sûre de l'ancien objet `arguments`.",
      },
    ],
  },
  {
    id: "fonctions-flechees",
    title: "Fonctions fléchées typées",
    level: 2,
    intro: "La forme standard des callbacks et utilitaires.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Fléchées partout",
        code: `const utilisateurs = ["akane", "dada"];

// Callback typé par le contexte : pas besoin d'annoter u
const majuscules = utilisateurs.map((u) => u.toUpperCase());

// Quand le contexte ne suffit pas, on annote
const filtrer = (liste: string[], prefixe: string): string[] =>
  liste.filter((nom) => nom.startsWith(prefixe));`,
      },
      {
        kind: "text",
        text: "Dans un `map` ou `filter`, le type du paramètre est inféré depuis le tableau : inutile de le répéter. Les fléchées héritent le `this` englobant — préférez-les pour les callbacks, gardez les méthodes classiques pour les objets.",
      },
    ],
  },
  {
    id: "callbacks",
    title: "Callbacks typés",
    level: 2,
    intro: "Garantir l'accord entre l'appelant et l'appelé.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Typer la fonction reçue",
        code: `// Le paramètre onSucces est lui-même une fonction typée
function telecharger(url: string, onSucces: (data: string) => void): void {
  // ... téléchargement ...
  onSucces("contenu");
}

telecharger("https://exemple.com", (data) => {
  console.log(data.length); // data: string — autocomplétion active
});`,
      },
      {
        kind: "text",
        text: "Typer le callback, c'est typer les deux côtés du contrat : celui qui appelle sait quoi fournir, celui qui reçoit sait quoi attendre. L'inférence propage ensuite les types dans le corps du callback.",
      },
    ],
  },
  {
    id: "methodes-objets",
    title: "Méthodes d'objets",
    level: 2,
    intro: "Typer les fonctions qui vivent dans des objets.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Méthodes et this",
        code: `const compteur = {
  total: 0,
  incrementer(pas: number = 1): number {
    this.total += pas; // this est inféré : le type de compteur
    return this.total;
  },
};

compteur.incrementer(2); // 2`,
      },
      {
        kind: "text",
        text: "Dans une méthode d'objet littéral, `this` est inféré automatiquement. Attention au détachement : `const f = compteur.incrementer; f()` perd le `this` — utilisez une fléchée ou `.bind()` (voir `js-moderne`).",
      },
    ],
  },
  {
    id: "inference-signatures",
    title: "L'inférence au service des signatures",
    level: 2,
    intro: "Écrire moins, vérifier autant.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Quand ne pas annoter",
        code: `// Le retour est inféré : string — inutile de le répéter ici
function pseudo(nom: string, tag: number) {
  return \`\${nom}#\${tag}\`;
}

// En revanche, une fonction exportée gagne à être explicite :
export function creerId(prefixe: string): string {
  return \`\${prefixe}-\${Date.now()}\`;
}`,
      },
      {
        kind: "text",
        text: "L'inférence déduit le retour depuis le corps : sur les fonctions internes, c'est du bruit en moins. Sur les fonctions exportées, l'annotation explicite fige le contrat public et produit de meilleurs messages d'erreur.",
      },
    ],
  },
  {
    id: "mini-exemples",
    title: "Mini-exemples guidés",
    level: 2,
    intro: "Trois fonctions du quotidien, bien typées.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Utilitaires",
        code: `// Formater un prix : paramètres typés, retour typé
function formaterPrix(montant: number, devise: string = "Ar"): string {
  return \`\${montant.toFixed(2)} \${devise}\`;
}

// Valider : retour boolean explicite
function estMajeur(age: number): boolean {
  return age >= 18;
}

// Transformer une liste : générique léger via le contexte
function premiers<T>(liste: T[], n: number = 3): T[] {
  return liste.slice(0, n);
}`,
      },
      {
        kind: "command",
        label: "Vérifier les exemples",
        command: "npx tsc --noEmit",
        why: "Compile en mémoire sans émettre de fichiers : si les signatures sont cohérentes, silence total. C'est le réflexe après chaque modification de signature — la vérification est instantanée et ne pollue pas `dist/`.",
        verify: "echo $?",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "surcharges-bases",
    title: "Surcharges : le principe",
    level: 3,
    intro: "Une fonction, plusieurs formes d'appel.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Signatures multiples",
        code: `// Deux signatures publiques...
function formater(valeur: number): string;
function formater(valeur: Date): string;
// ...une implémentation (non visible de l'extérieur)
function formater(valeur: number | Date): string {
  if (typeof valeur === "number") return valeur.toFixed(2);
  return valeur.toISOString();
}

formater(3.14159);      // OK : string
formater(new Date());   // OK : string
// formater(true);      // Erreur : aucune surcharge ne correspond`,
      },
      {
        kind: "text",
        text: "Les surcharges décrivent des comportements différents selon les arguments — là où une union en paramètre perdrait la relation entrée/sortie. L'implémentation doit accepter l'union de toutes les signatures, mais elle n'est jamais appelable directement avec cette union.",
      },
    ],
  },
  {
    id: "implementation-surcharge",
    title: "Écrire l'implémentation",
    level: 3,
    intro: "Les règles que le compilateur impose.",
    blocks: [
      {
        kind: "list",
        items: [
          "L'implémentation n'est pas comptée comme une surcharge appelable : elle doit être compatible avec chacune.",
          "Les surcharges sont résolues dans l'ordre de déclaration : mettez les plus spécifiques en premier.",
          "À l'intérieur de l'implémentation, affinez avec des gardes de type (`typeof`, `instanceof`).",
          "Alternative moderne : une seule signature avec des paramètres union + un retour conditionnel — souvent plus lisible.",
        ],
      },
      {
        kind: "text",
        text: "À utiliser avec parcimonie : chaque surcharge double le coût de lecture. Si les formes d'appel se multiplient, c'est souvent le signe qu'il faut deux fonctions distinctes ou un paramètre objet.",
      },
    ],
  },
  {
    id: "surcharges-vs-unions",
    title: "Surcharges vs unions",
    level: 3,
    intro: "Choisir la bonne modélisation.",
    blocks: [
      {
        kind: "table",
        headers: ["Situation", "Préférer", "Pourquoi"],
        rows: [
          ["Retour dépend du type d'entrée", "Surcharges", "`formater(n: number): string` vs `formater(d: Date): string` : le retour suit l'entrée"],
          ["Même traitement, types variés", "Union", "`afficher(v: string \\| number)` : le corps fait la même chose"],
          ["Options nombreuses", "Paramètre objet", "`creer(opts: Options)` : lisible, extensible, nommable"],
          ["Deux comportements distincts", "Deux fonctions", "Plus clair que deux surcharges qui divergent"],
        ],
      },
    ],
  },
  {
    id: "this-type",
    title: "Typer `this` explicitement",
    level: 3,
    intro: "Le premier paramètre fantôme.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Paramètre this",
        code: `interface Compteur {
  total: number;
}

// this: Compteur — un faux paramètre qui ne compte pas à l'appel
function incrementer(this: Compteur, pas: number = 1): number {
  this.total += pas;
  return this.total;
}

const c: Compteur = { total: 0 };
incrementer.call(c, 2); // OK : this est bien un Compteur
// incrementer.call({}, 2); // Erreur : {} n'est pas un Compteur`,
      },
      {
        kind: "text",
        text: "Le paramètre `this` se déclare en première position et disparaît à l'appel : il ne fait que typer le contexte. Utile pour les fonctions utilitaires appelées avec `.call`/`.apply`, ou détachées de leurs objets. Avec `noImplicitThis` (inclus dans `strict`), un `this` implicite `any` devient une erreur.",
      },
    ],
  },
  {
    id: "methodes-vs-flechees",
    title: "Méthodes vs fléchées : le `this` décide",
    level: 3,
    intro: "Deux sémantiques, deux usages.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Méthode classique", "Propriété fléchée"],
        rows: [
          ["`this`", "Dynamique : dépend de l'appel", "Lexical : hérité de la définition"],
          ["Détachement", "Perd le `this` (piège)", "Garde le `this` (sûr)"],
          ["Héritage", "Surchargeable via `super`", "Non surchargeable proprement"],
          ["Usage typique", "Méthodes de classe métier", "Callbacks, gestionnaires d'événements"],
        ],
      },
      {
        kind: "text",
        text: "Dans une classe, les méthodes classiques participent à l'héritage ; les propriétés fléchées garantissent le `this`. Beaucoup d'équipes utilisent des fléchées pour les gestionnaires d'événements et des méthodes pour la logique métier surchargeable.",
      },
    ],
  },
  {
    id: "generiques-fonctions",
    title: "Fonctions génériques : aperçu",
    level: 3,
    intro: "Le pont vers la compétence `generiques`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Premier générique",
        code: `// T est capturé à l'appel et réutilisé : le typage est préservé
function premier<T>(liste: T[]): T | undefined {
  return liste[0];
}

const n = premier([1, 2, 3]);     // n: number | undefined
const s = premier(["a", "b"]);    // s: string | undefined
// premier<number>(["a"]);        // Erreur : conflit explicite`,
      },
      {
        kind: "text",
        text: "Un paramètre de type `<T>` rend la fonction réutilisable sans retomber sur `any`. L'inférence déduit presque toujours `T` depuis les arguments — l'annotation explicite `<number>` reste possible pour forcer ou documenter. Tout le détail dans la compétence `generiques`.",
      },
    ],
  },
  {
    id: "async-fonctions",
    title: "Fonctions async : `Promise<T>`",
    level: 3,
    intro: "Le retour d'une fonction `async` est toujours une promesse.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Typer l'asynchrone",
        code: `interface User { id: number; pseudo: string }

// async => le retour déclaré est encapsulé dans Promise<...>
async function chargerUser(id: number): Promise<User> {
  const res = await fetch(\`https://api.exemple.com/users/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json(); // res.json(): Promise<any> — à typer en pratique
}

// À l'appel : await déballe la promesse
const user = await chargerUser(1); // user: User`,
      },
      {
        kind: "text",
        text: "Même si le corps retourne un `User`, la signature dit `Promise<User>` : c'est `await` qui déballe. Oublier `await`, c'est manipuler une promesse au lieu de sa valeur — l'erreur de typage apparaît souvent deux appels plus loin.",
      },
    ],
  },
  {
    id: "gestion-erreurs-fonctions",
    title: "Erreurs : les modéliser dans les signatures",
    level: 3,
    intro: "Rendre l'échec visible dans le type.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Le pattern Result",
        code: `// Au lieu de throw implicite : un retour qui dit tout
type Result<T> =
  | { ok: true; valeur: T }
  | { ok: false; erreur: string };

function diviser(a: number, b: number): Result<number> {
  if (b === 0) return { ok: false, erreur: "Division par zéro" };
  return { ok: true, valeur: a / b };
}

const r = diviser(10, 2);
if (r.ok) console.log(r.valeur); // r.valeur accessible : la garde affine l'union
else console.error(r.erreur);`,
      },
      {
        kind: "text",
        text: "TypeScript ne trace pas les exceptions dans les signatures : une fonction qui `throw` a le même type qu'une fonction sûre. Le pattern `Result` rend l'échec explicite et oblige l'appelant à le traiter — idéal pour la validation et les opérations métier.",
      },
    ],
  },
  {
    id: "type-predicates",
    title: "Prédicats de type (`is`)",
    level: 3,
    intro: "Des fonctions qui affinent les types.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Gardes personnalisées",
        code: `// Le retour « x is string » informe le compilateur
function estChaine(x: unknown): x is string {
  return typeof x === "string";
}

function traiter(valeur: unknown): void {
  if (estChaine(valeur)) {
    console.log(valeur.toUpperCase()); // valeur: string ici
  }
}`,
      },
      {
        kind: "text",
        text: "Un prédicat `x is T` transforme un test runtime en information de typage : après le `if`, le compilateur connaît le type affiné. C'est le mécanisme derrière les validations de données externes (API, formulaires) — le pont entre le monde non typé et le monde typé.",
      },
    ],
  },
  {
    id: "assertion-functions",
    title: "Fonctions d'assertion",
    level: 3,
    intro: "Valider ou échouer, sans `if` à chaque fois.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "asserts",
        code: `import assert from "node:assert/strict";

// asserts x : si la fonction retourne, x est garanti
function affirmerNonNul<T>(x: T | null | undefined): asserts x is T {
  if (x == null) throw new Error("Valeur inattendue");
}

function utiliser(id: string | undefined): void {
  affirmerNonNul(id);
  console.log(id.toUpperCase()); // id: string — plus besoin de garde
}`,
      },
      {
        kind: "text",
        text: "Les fonctions d'assertion centralisent les validations : au lieu de répéter des gardes, on appelle l'assertion et le type est affiné pour la suite. Le module natif `node:assert/strict` fournit déjà `assert.ok`, `assert.equal` et consorts.",
      },
    ],
  },
  {
    id: "higher-order",
    title: "Fonctions d'ordre supérieur",
    level: 3,
    intro: "Des fonctions qui manipulent des fonctions.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Composer et décorer",
        code: `// withRetry : enveloppe n'importe quelle fonction async
function withRetry<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  tentatives: number = 3
): (...args: T) => Promise<R> {
  return async (...args) => {
    let derniere: unknown;
    for (let i = 0; i < tentatives; i++) {
      try { return await fn(...args); }
      catch (e) { derniere = e; }
    }
    throw derniere;
  };
}`,
      },
      {
        kind: "text",
        text: "Le typage préserve la signature d'origine (`...args: T` → `R`) : la fonction décorée reste aussi bien typée que l'originale. C'est le pattern des middlewares, des décorateurs de logging et des wrappers de cache.",
      },
    ],
  },
  {
    id: "debounce-exemple",
    title: "Cas pratique : debounce typé",
    level: 3,
    intro: "Un utilitaire classique, correctement typé.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "debounce générique",
        code: `function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  delai: number
): (...args: T) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delai);
  };
}

const recherche = debounce((requete: string) => {
  console.log("Recherche :", requete);
}, 300);

recherche("ts"); // les args sont typés : (requete: string) => void`,
      },
      {
        kind: "text",
        text: "Le générique `T extends unknown[]` capture les paramètres de la fonction d'origine : la version « debouncée » accepte exactement les mêmes arguments. `ReturnType<typeof setTimeout>` type le timer sans dépendre de l'environnement (navigateur vs Node).",
      },
    ],
  },
  {
    id: "event-handlers-dom",
    title: "Gestionnaires d'événements DOM",
    level: 3,
    intro: "Typer les callbacks du navigateur.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Événements typés",
        code: `const bouton = document.querySelector<HTMLButtonElement>("#valider");

// L'événement est typé : e.target est un HTMLButtonElement | null
bouton?.addEventListener("click", (e) => {
  console.log("Clic sur", (e.target as HTMLButtonElement).textContent);
});

// Formulaire : typer la soumission
const form = document.querySelector<HTMLFormElement>("#inscription");
form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const data = new FormData(e.target as HTMLFormElement);
});`,
      },
      {
        kind: "text",
        text: "`querySelector<HTMLButtonElement>` précise le type d'élément : l'autocomplétion connaît alors les propriétés du bouton. `e.target` reste large par conception (l'événement peut venir d'un enfant) — d'où l'affinage explicite quand on est sûr de la source.",
      },
    ],
  },
  {
    id: "void-vs-undefined",
    title: "`void` vs `undefined`",
    level: 3,
    intro: "Deux notions proches, un piège réel.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "La subtilité",
        code: `// void : « la valeur de retour ne doit pas être utilisée »
function journaliser(msg: string): void {
  console.log(msg);
}

// MAIS : un callback retournant void accepte une fonction qui retourne une valeur !
type Callback = () => void;
const cb: Callback = () => 42; // OK — intentionnel : permet Array.push dans un forEach

// undefined : une vraie valeur typée
function peutEtreRien(): undefined {
  return undefined;
}`,
      },
      {
        kind: "text",
        text: "La règle spéciale du `void` existe pour que `liste.forEach((x) => liste2.push(x))` compile : `push` retourne un nombre, mais le callback est déclaré `void`. Retenez : `void` = « ignorez le retour », `undefined` = « le retour est la valeur undefined ».",
      },
    ],
  },
  {
    id: "never-retour",
    title: "Le retour `never`",
    level: 3,
    intro: "Les fonctions qui ne reviennent jamais.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Cas d'usage",
        code: `// throw systématique : la fonction ne « retourne » jamais
function echec(message: string): never {
  throw new Error(message);
}

// Boucle infinie : ne termine jamais non plus
function attendre(): never {
  while (true) { /* ... */ }
}

function traiter(x: string | number): string {
  if (typeof x === "string") return x;
  if (typeof x === "number") return String(x);
  return echec("Impossible"); // never est assignable à tout
}`,
      },
      {
        kind: "text",
        text: "`never` marque les chemins impossibles : le compilateur sait que le code après l'appel est inatteignable. C'est aussi l'outil des vérifications d'exhaustivité sur les unions (voir `unions`).",
      },
    ],
  },
  {
    id: "strict-function-types",
    title: "`strictFunctionTypes`",
    level: 3,
    intro: "La vérification stricte des paramètres de fonction.",
    blocks: [
      {
        kind: "text",
        text: "Activé par `strict`, ce flag rend la comparaison des types de fonctions rigoureuse sur les paramètres : une fonction acceptant un type large ne peut pas remplacer une fonction qui exige un type précis. En pratique, il attrape les callbacks incompatibles — par exemple passer `(e: Event) => void` là où `(e: MouseEvent) => void` est attendu.",
      },
      {
        kind: "list",
        items: [
          "Exception historique : les méthodes de classe restent bivariantes (compatibilité avec l'écosystème).",
          "Si une assignation de fonction est refusée, c'est souvent ce flag qui parle : lisez les types des paramètres des deux côtés.",
        ],
      },
    ],
  },
  {
    id: "fonctions-pures",
    title: "Fonctions pures",
    level: 3,
    intro: "Le style qui rend le code testable.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Pure vs impure",
        code: `// Pure : mêmes entrées => même sortie, aucun effet externe
function tva(montant: number, taux: number): number {
  return montant * taux;
}

// Impure : dépend d'un état externe et le modifie
let total = 0;
function ajouter(montant: number): void {
  total += montant; // effet de bord caché
}`,
      },
      {
        kind: "text",
        text: "TypeScript ne vérifie pas la pureté — c'est une discipline. Mais les fonctions pures se testent trivialement (pas de setup, pas de mocks) et se composent sans surprise. Visez le maximum de pureté, isolez les effets de bord aux frontières (I/O, DOM).",
      },
    ],
  },
  {
    id: "tests-fonctions-vitest",
    title: "Tester les fonctions",
    level: 3,
    intro: "Les types ne remplacent pas les tests.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "fonctions.test.ts",
        code: `import { describe, expect, it } from "vitest";
import { diviser } from "./fonctions.js";

describe("diviser", () => {
  it("divise deux nombres", () => {
    expect(diviser(10, 2)).toEqual({ ok: true, valeur: 5 });
  });

  it("signale la division par zéro", () => {
    expect(diviser(10, 0)).toEqual({
      ok: false,
      erreur: "Division par zéro",
    });
  });
});`,
      },
      {
        kind: "command",
        label: "Lancer les tests",
        command: "npx vitest run",
        why: "Exécute la suite de tests en une fois (`run` = mode non-watch). Les types garantissent la forme des données, les tests garantissent le comportement : `diviser(10, 0)` est bien typé ET bien testé. Les deux se complètent, aucun ne remplace l'autre.",
        verify: "npx vitest --version",
      },
    ],
  },
  {
    id: "erreurs-param-mismatch",
    title: "Erreur : arguments incompatibles",
    level: 3,
    intro: "L'erreur de signature la plus courante.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lire le message en entier : il dit quel argument, attendu quoi, reçu quoi.",
          "Cause fréquente : l'ordre des paramètres — vérifiez la signature avec `F12`.",
          "Après un refactoring, les appels obsolètes sont listés un par un : corrigez-les, ne forcez pas avec `as`.",
          "Un `undefined` là où une valeur est attendue : le paramètre devrait-il être optionnel (`?`) ?",
        ],
      },
    ],
  },
  {
    id: "erreurs-this-detache",
    title: "Erreur : `this` détaché",
    level: 3,
    intro: "La méthode passée en callback perd son contexte.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Le piège typé",
        code: `class Service {
  prefixe = "[svc]";
  log(msg: string): void {
    console.log(this.prefixe, msg);
  }
}

const s = new Service();
setTimeout(s.log, 100); // BUG runtime : this = undefined
// Solutions :
setTimeout((m) => s.log(m), 100);
setTimeout(s.log.bind(s), 100);`,
      },
      {
        kind: "text",
        text: "TypeScript ne peut pas toujours détecter ce bug : la signature est correcte, c'est le contexte d'appel qui est faux. Le réflexe : dès qu'une méthode devient un callback, l'envelopper dans une fléchée.",
      },
    ],
  },
  {
    id: "erreurs-surcharges",
    title: "Erreur : aucune surcharge ne correspond",
    level: 3,
    intro: "Quand l'appel ne matche aucune signature.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le compilateur liste chaque surcharge essayée : comparez votre appel à chacune.",
          "Souvent, c'est l'ordre des surcharges : la première compatible gagne — les spécifiques d'abord.",
          "Si l'appel « devrait » marcher, il manque peut-être une surcharge : ajoutez-la plutôt que de forcer l'implémentation.",
          "Alternative : remplacez les surcharges par une signature unique à paramètre objet.",
        ],
      },
    ],
  },
  {
    id: "projets-fonctions",
    title: "Projets : fonctions en action",
    level: 3,
    intro: "Valider par des utilitaires réutilisables.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Bibliothèque d'utilitaires", detail: "Une vingtaine de fonctions (formatage, validation, tableaux) avec signatures explicites et tests Vitest : le kata de typage par excellence." },
          { title: "Wrappers d'API", detail: "Un client `fetch` avec retry, timeout et `Result<T>` : surcharges ou génériques selon les endpoints." },
          { title: "Mini-framework d'événements", detail: "Un `EventEmitter` typé par nom d'événement : les callbacks sont vérifiés à l'enregistrement comme à l'émission." },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-fonctions",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Des signatures qui documentent.",
    blocks: [
      {
        kind: "list",
        items: [
          "Annoter le retour des fonctions exportées, inférer celui des internes.",
          "Paramètres optionnels après les obligatoires ; au-delà de 3 paramètres, un objet.",
          "Préférer les surcharges sobres : 2-3 signatures, pas 10.",
          "Rendre l'échec explicite (`Result`, erreurs typées) plutôt que silencieux.",
          "Fonctions pures par défaut, effets de bord isolés et nommés.",
          "Ne jamais utiliser `as` pour faire taire une erreur de signature : corriger l'appel ou la signature.",
        ],
      },
    ],
  },
  {
    id: "retours-multiples",
    title: "Retours multiples avec tuples",
    level: 3,
    intro: "Retourner plusieurs valeurs de façon typée.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Tuples nommés",
        code: `// Un tuple typé : chaque position a son type
function diviser(a: number, b: number): [quotient: number, reste: number] {
  return [Math.floor(a / b), a % b];
}

const [q, r] = diviser(10, 3); // q: number, r: number — positions nommées

// Avec un objet, c'est souvent plus lisible :
function analyser(texte: string): { mots: number; lignes: number } {
  return { mots: texte.split(/\\s+/).length, lignes: texte.split("\\n").length };
}`,
      },
      {
        kind: "text",
        text: "Les labels de tuple (`[quotient: number, reste: number]`) documentent chaque position. Pour plus de deux valeurs ou des retours complexes, un objet nommé est plus lisible qu'un long tuple.",
      },
    ],
  },
  {
    id: "composition-fonctions",
    title: "Composer des fonctions",
    level: 3,
    intro: "Enchaîner des transformations typées.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "pipe typé",
        code: `// pipe : applique les fonctions en séquence, types enchaînés
function pipe<A, B>(a: A, f1: (x: A) => B): B;
function pipe<A, B, C>(a: A, f1: (x: A) => B, f2: (x: B) => C): C;
function pipe(a: unknown, ...fns: Array<(x: unknown) => unknown>): unknown {
  return fns.reduce((acc, fn) => fn(acc), a);
}

const resultat = pipe(
  "  hello ",
  (s) => s.trim(),        // string => string
  (s) => s.toUpperCase(), // string => string
  (s) => s.length         // string => number
); // resultat: number — le type suit la chaîne`,
      },
      {
        kind: "text",
        text: "Les surcharges de `pipe` chaînent les types : la sortie de chaque étape devient l'entrée de la suivante, vérifiée par le compilateur. Une erreur de type au milieu de la chaîne est localisée précisément.",
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
          { label: "Handbook — Functions", value: "typescriptlang.org/docs/handbook/2/functions.html : signatures, surcharges, `this`, génériques — la référence." },
          { label: "Handbook — Narrowing", value: "Le rétrécissement de types : gardes, prédicats `is` et discrimination d'unions." },
          { label: "MDN — Fonctions", value: "developer.mozilla.org : la sémantique JavaScript (closures, `this`, fléchées) sous les types." },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les fonctions sont typées : élargissez au reste du système de types.",
    blocks: [
      {
        kind: "list",
        items: [
          "Passer à `generiques` : des fonctions réutilisables sans perdre la précision.",
          "Puis `unions` : modéliser les alternatives et l'exhaustivité.",
          "Ensuite `interfaces` : typer les objets que ces fonctions manipulent.",
          "Enfin `utility-types` : transformer les types existants (`Partial`, `Pick`, `ReturnType`).",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de JavaScript moderne : le socle indispensable
 * avant TypeScript. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code inline
 * entre backticks.
 */
export const LEARNING_JS_MODERNE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce que recouvre « JavaScript moderne » et pourquoi c'est le prérequis n°1 de TypeScript.",
    blocks: [
      {
        kind: "text",
        text: "JavaScript moderne désigne le JavaScript des standards ES2015 et suivants : modules `import`/`export`, classes, fonctions fléchées, promesses, `async`/`await`, destructuration, `optional chaining`. C'est le langage vivant des navigateurs et de Node.js — et c'est exactement le langage que TypeScript étend.",
      },
      {
        kind: "text",
        text: "TypeScript n'ajoute que des types par-dessus JavaScript. Toute la sémantique d'exécution — comment `this` se comporte, comment une promesse se résout, ce que fait `==` — reste du JavaScript pur. Apprendre TypeScript sans JavaScript solide, c'est mettre des étiquettes sur des boîtes qu'on ne sait pas ouvrir.",
      },
      {
        kind: "diagram",
        title: "La relation entre les deux langages",
        lines: [
          "JavaScript moderne (ES2015+)",
          "  sémantique d'exécution : valeurs, objets, async, modules",
          "     │",
          "     ▼",
          "TypeScript = JavaScript moderne + annotations de types",
          "  vérification statique : le compilateur lit les annotations",
          "     │",
          "     ▼",
          "JavaScript (le seul code qui s'exécute vraiment)",
        ],
      },
    ],
  },
  {
    id: "javascript-avant-typescript",
    title: "Pourquoi JavaScript d'abord",
    level: 1,
    intro:
      "Ce que TypeScript vérifie, et ce qu'il ne peut pas vérifier à votre place.",
    blocks: [
      {
        kind: "text",
        text: "Le compilateur TypeScript répond à une seule question : « les types sont-ils cohérents ? ». Il ne répond jamais à « ce code fait-il ce que je veux ? ». Une `Promise` mal chaînée, un `this` perdu dans un callback, une boucle `forEach` avec `await` qui ne fait pas ce qu'on croit : ce sont des bugs JavaScript, et aucun type ne les attrapera.",
      },
      {
        kind: "list",
        items: [
          "Les erreurs de types se lisent dans l'éditeur ; les erreurs de logique se déboguent à l'exécution.",
          "Maîtriser `async`/`await`, les closures et les modules rend les messages du compilateur deux fois plus lisibles.",
          "Objectif de cette page : un socle JavaScript qui rend l'apprentissage de TypeScript fluide, pas douloureux.",
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
    intro: "Le minimum vital pour suivre cette page sans friction.",
    blocks: [
      {
        kind: "list",
        items: [
          "Savoir utiliser un terminal : naviguer (`cd`), lister (`ls`), lancer une commande.",
          "Avoir un éditeur de code installé (VS Code suffit).",
          "Aucune connaissance JavaScript préalable requise : on part de zéro.",
        ],
      },
    ],
  },
  {
    id: "installer-node",
    title: "Installer Node.js",
    level: 2,
    intro: "Node.js exécute JavaScript hors navigateur : c'est votre terrain d'entraînement.",
    blocks: [
      {
        kind: "command",
        label: "Installer Node.js LTS",
        command: "nvm install --lts",
        why: "Installe la version LTS (support long terme) de Node.js via nvm, le gestionnaire de versions. Travailler sur la LTS garantit les fonctionnalités JavaScript modernes stables sans les surprises des versions expérimentales.",
        verify: "node -v",
      },
      {
        kind: "command",
        label: "Vérifier Node et npm",
        command: "node -v && npm -v",
        why: "Affiche les versions installées de Node.js et de npm (son gestionnaire de paquets, livré avec). Si les deux répondent, l'environnement est prêt : tout le reste de cette page s'exécute avec `node`.",
        verify: "npm --version",
      },
      {
        kind: "text",
        text: "Sans nvm : téléchargez l'installeur LTS depuis nodejs.org. Vérifiez ensuite `node -v` dans un nouveau terminal.",
      },
    ],
  },
  {
    id: "premier-script",
    title: "Premier script",
    level: 2,
    intro: "Écrire et exécuter du JavaScript en moins d'une minute.",
    blocks: [
      {
        kind: "command",
        label: "Tester une expression dans le REPL",
        command: 'node -e "console.log(2 + 3 * 4)"',
        why: "Le flag `-e` évalue une expression JavaScript directement, sans fichier. Idéal pour vérifier un comportement en dix secondes : le REPL de Node est votre brouillon permanent.",
        verify: "node --version",
      },
      {
        kind: "code",
        language: "javascript",
        title: "bonjour.js",
        code: `const prenom = "Akane";
console.log(\`Bonjour, \${prenom} !\`);`,
      },
      {
        kind: "command",
        label: "Exécuter un fichier JavaScript",
        command: "node bonjour.js",
        why: "Lance le fichier avec Node.js : le code s'exécute de haut en bas, `console.log` affiche dans le terminal. C'est le cycle de base de tout ce qui suit — écrire, exécuter, observer.",
        verify: "echo $?",
      },
    ],
  },
  {
    id: "variables-portee",
    title: "Variables et portée",
    level: 2,
    intro: "`let`, `const`, et pourquoi `var` appartient au passé.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Déclarations",
        code: `const PI = 3.14159;      // constante : jamais réassignée
let compteur = 0;       // variable : peut changer
compteur = compteur + 1;

const user = { nom: "Akane" };
user.nom = "Diavolana"; // OK : l'objet est mutable, la référence ne change pas
// user = {};           // Erreur : réassignation d'un const`,
      },
      {
        kind: "text",
        text: "Règle simple : `const` par défaut, `let` quand la valeur doit vraiment changer, jamais `var`. `const` n'interdit pas de modifier le contenu d'un objet — seulement de réassigner la variable. La portée est le bloc `{ }` : une variable déclarée dans un `if` n'existe pas en dehors.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Portée de bloc",
        code: `if (true) {
  const message = "visible ici";
  console.log(message); // OK
}
// console.log(message); // ReferenceError : message n'existe plus`,
      },
    ],
  },
  {
    id: "fonctions-js",
    title: "Fonctions",
    level: 2,
    intro: "Déclarer, appeler, retourner : les trois formes à connaître.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Trois syntaxes",
        code: `// Déclaration classique
function addition(a, b) {
  return a + b;
}

// Fonction fléchée (arrow function)
const addition2 = (a, b) => a + b;

// Avec corps multi-lignes
const formate = (nom) => {
  const propre = nom.trim().toLowerCase();
  return \`user:\${propre}\`;
};`,
      },
      {
        kind: "text",
        text: "Les fonctions fléchées sont la forme standard en JavaScript moderne : concises, elles héritent le `this` du contexte englobant (détail important, voir niveau 3). Une fonction sans `return` explicite retourne `undefined`. Les paramètres non fournis valent `undefined` sauf valeur par défaut.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Valeurs par défaut",
        code: `const saluer = (nom = "inconnu") => \`Bonjour, \${nom}\`;
console.log(saluer());        // Bonjour, inconnu
console.log(saluer("Akane")); // Bonjour, Akane`,
      },
    ],
  },
  {
    id: "objets",
    title: "Objets",
    level: 2,
    intro: "La structure de données centrale de JavaScript.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Créer et manipuler",
        code: `const user = {
  nom: "Akane",
  niveau: 12,
  actif: true,
};

console.log(user.nom);      // notation point
console.log(user["niveau"]); // notation crochet (clé dynamique)

user.niveau = 13;           // modification
delete user.actif;          // suppression`,
      },
      {
        kind: "text",
        text: "Un objet est un dictionnaire clé → valeur. Les clés sont des chaînes (ou symboles). Accéder à une propriété inexistante retourne `undefined`, sans erreur — source classique de bugs silencieux que TypeScript aidera à détecter plus tard.",
      },
    ],
  },
  {
    id: "tableaux-essentiels",
    title: "Tableaux : l'essentiel",
    level: 2,
    intro: "Les quatre méthodes qui couvrent 90 % des usages : `map`, `filter`, `find`, `forEach`.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Méthodes clés",
        code: `const notes = [12, 8, 17, 5, 14];

const doublees = notes.map((n) => n * 2);      // transforme chaque élément
const reussies = notes.filter((n) => n >= 10); // garde ceux qui passent le test
const premiere = notes.find((n) => n > 15);    // premier élément correspondant
notes.forEach((n) => console.log(n));           // effet de bord, sans retour

console.log(doublees); // [24, 16, 34, 10, 28]`,
      },
      {
        kind: "text",
        text: "`map`, `filter` et `find` retournent un nouveau tableau (ou une valeur) sans modifier l'original : c'est la programmation fonctionnelle de base, omniprésente en JavaScript moderne. `forEach` ne retourne rien — il sert uniquement aux effets de bord comme l'affichage.",
      },
    ],
  },
  {
    id: "modules-es",
    title: "Modules ES",
    level: 2,
    intro: "Découper le code en fichiers avec `import` et `export`.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "maths.js — ce qu'on exporte",
        code: `export const PI = 3.14159;

export function carre(n) {
  return n * n;
}

export default function cube(n) {
  return n * n * n;
}`,
      },
      {
        kind: "code",
        language: "javascript",
        title: "app.js — ce qu'on importe",
        code: `import cube, { PI, carre } from "./maths.js";

console.log(carre(3)); // 9
console.log(cube(3));  // 27
console.log(PI);       // 3.14159`,
      },
      {
        kind: "text",
        text: "Deux formes d'export : nommés (`export const x`) et par défaut (`export default`). L'import par défaut s'écrit sans accolades. Pour utiliser ces modules dans Node.js, ajoutez `\"type\": \"module\"` dans `package.json`, ou nommez vos fichiers `.mjs`.",
      },
    ],
  },
  {
    id: "promesses-bases",
    title: "Promesses : les bases",
    level: 2,
    intro: "Représenter une valeur qui n'existe pas encore.",
    blocks: [
      {
        kind: "text",
        text: "Une `Promise` est un objet qui représente le résultat futur d'une opération asynchrone (appel réseau, lecture de fichier). Elle a trois états : en attente, tenue (`resolved`), ou rejetée (`rejected`). On consomme le résultat avec `.then()` et on gère l'échec avec `.catch()`.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Chaîner des promesses",
        code: `fetch("https://api.github.com/users/octocat")
  .then((res) => res.json())
  .then((data) => console.log(data.login))
  .catch((err) => console.error("Échec :", err.message));`,
      },
      {
        kind: "text",
        text: "Chaque `.then()` retourne une nouvelle promesse : on peut chaîner les transformations. Un seul `.catch()` en fin de chaîne attrape toutes les erreurs des étapes précédentes. Oublier le `.catch()` laisse des rejets non gérés — Node.js les signale bruyamment, à raison.",
      },
    ],
  },
  {
    id: "async-await",
    title: "async / await",
    level: 2,
    intro: "Écrire du code asynchrone comme s'il était synchrone.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "La même logique, lisible",
        code: `async function chargerUtilisateur(login) {
  try {
    const res = await fetch(\`https://api.github.com/users/\${login}\`);
    const data = await res.json();
    return data.login;
  } catch (err) {
    console.error("Échec :", err.message);
    return null;
  }
}

const pseudo = await chargerUtilisateur("octocat");
console.log(pseudo);`,
      },
      {
        kind: "text",
        text: "`await` suspend la fonction jusqu'à la résolution de la promesse, sans bloquer le reste du programme. `try`/`catch` remplace `.catch()` : les erreurs asynchrones se gèrent comme des erreurs synchrones. Une fonction `async` retourne toujours une promesse — même si son corps retourne une valeur simple.",
      },
    ],
  },
  {
    id: "destructuration-bases",
    title: "Destructuration",
    level: 2,
    intro: "Extraire des valeurs d'objets et de tableaux en une ligne.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Objets et tableaux",
        code: `const user = { nom: "Akane", niveau: 12, guilde: "Fantôme" };
const { nom, niveau } = user; // nom = "Akane", niveau = 12

const [premier, second] = [10, 20, 30]; // premier = 10, second = 20

// Dans les paramètres de fonction : très courant
const afficher = ({ nom, niveau = 1 }) => \`\${nom} (nv \${niveau})\`;
console.log(afficher(user));`,
      },
      {
        kind: "text",
        text: "La destructuration rend le code déclaratif : on nomme ce qu'on veut extraire au lieu d'écrire `user.nom` partout. Dans les paramètres de fonction, elle documente la forme attendue — TypeScript s'appuiera exactement là-dessus pour typer les options.",
      },
    ],
  },
  {
    id: "mini-projet-todo-cli",
    title: "Mini-projet : pense-bête en CLI",
    level: 2,
    intro: "Assembler les bases dans un programme complet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Créer le projet", detail: "Un dossier `todo/`, un fichier `todo.js`, un `package.json` avec `npm init -y` et `\"type\": \"module\"`." },
          { title: "Stocker les tâches", detail: "Un tableau `taches` en mémoire, chaque tâche étant un objet `{ texte, fait }`." },
          { title: "Ajouter", detail: "`node todo.js ajouter \"Acheter du lait\"` : lire `process.argv`, pousser l'objet, afficher la liste." },
          { title: "Lister et cocher", detail: "Commandes `liste` (avec `forEach` et index) et `cocher <n>` (bascule `fait`)." },
          { title: "Persister", detail: "Lire/écrire un `taches.json` avec `fs/promises` et `await` : premier contact avec l'asynchrone réel." },
        ],
      },
      {
        kind: "text",
        text: "Ce projet mobilise variables, fonctions, objets, tableaux, modules, `process.argv` et l'asynchrone fichier. S'il fonctionne de bout en bout, les bases sont acquises : le niveau 3 peut creuser la sémantique fine.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "closures",
    title: "Closures",
    level: 3,
    intro: "Une fonction garde la mémoire des variables de son lieu de naissance.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Compteur privé",
        code: `function creerCompteur() {
  let total = 0; // variable « capturée »
  return {
    incrementer: () => { total += 1; return total; },
    valeur: () => total,
  };
}

const c = creerCompteur();
console.log(c.incrementer()); // 1
console.log(c.incrementer()); // 2
// total est inaccessible directement : encapsulation réelle`,
      },
      {
        kind: "text",
        text: "Une closure naît quand une fonction interne utilise une variable de la fonction externe, après que celle-ci a terminé. Le moteur garde la variable en vie. C'est le mécanisme derrière les callbacks, les factories, les modules, et la plupart des patterns JavaScript.",
      },
      {
        kind: "list",
        items: [
          "Piège classique : une closure dans une boucle `var` capture la même variable — avec `let`, chaque itération a la sienne.",
          "Les closures retiennent la mémoire : un gestionnaire d'événement jamais retiré garde tout son contexte.",
        ],
      },
    ],
  },
  {
    id: "this-dynamique",
    title: "Le `this` dynamique",
    level: 3,
    intro: "En JavaScript, `this` dépend de l'appel, pas de la définition.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Ce qui change tout",
        code: `const equipe = {
  nom: "Fantôme",
  membres: ["Akane", "Dada"],
  lister() {
    // this = equipe : la méthode est appelée sur l'objet
    this.membres.forEach((m) => console.log(\`\${m} — \${this.nom}\`));
  },
};

equipe.lister(); // OK : la fléchée hérite le this de lister()

const f = equipe.lister;
f(); // Erreur ou undefined : this n'est plus equipe`,
      },
      {
        kind: "text",
        text: "Règle : `this` vaut l'objet devant le point au moment de l'appel. Détacher une méthode (`const f = obj.methode`) casse ce lien. Les fonctions fléchées n'ont pas de `this` propre : elles héritent celui du contexte englobant, d'où leur usage massif dans les callbacks.",
      },
      {
        kind: "list",
        items: [
          "Solutions quand `this` se perd : fonction fléchée, `.bind(obj)`, ou stocker la référence.",
          "Dans les classes, les méthodes ont le même comportement : un gestionnaire d'événement passé tel quel perd son `this`.",
        ],
      },
    ],
  },
  {
    id: "prototypes",
    title: "Prototypes",
    level: 3,
    intro: "L'héritage de JavaScript : des objets liés à d'autres objets.",
    blocks: [
      {
        kind: "text",
        text: "Chaque objet possède un prototype, un autre objet vers lequel le moteur se tourne quand une propriété est introuvable. La chaîne se termine à `Object.prototype`. C'est ainsi que tous les tableaux partagent `map` ou `filter` : ces méthodes vivent sur `Array.prototype`, pas sur chaque tableau.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Chaîne de prototypes",
        code: `const animal = { parler() { return "..."; } };
const chien = Object.create(animal);
chien.parler = () => "Ouaf !";

console.log(chien.parler()); // Ouaf ! (propriété propre)
delete chien.parler;
console.log(chien.parler()); // "..." (hérité du prototype)`,
      },
      {
        kind: "text",
        text: "En pratique moderne, on écrit des `class` plutôt que de manipuler les prototypes à la main — mais les classes ne sont que du sucre syntaxique par-dessus ce mécanisme. Comprendre les prototypes explique les comportements « magiques » de l'héritage.",
      },
    ],
  },
  {
    id: "classes",
    title: "Classes",
    level: 3,
    intro: "Le sucre syntaxique moderne par-dessus les prototypes.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Classe complète",
        code: `class Joueur {
  #score = 0; // champ privé (vrai privé, pas une convention)

  constructor(pseudo) {
    this.pseudo = pseudo;
  }

  marquer(points) {
    this.#score += points;
    return this.#score;
  }

  get score() {
    return this.#score;
  }

  static comparer(a, b) {
    return a.score - b.score;
  }
}

const j = new Joueur("Akane");
j.marquer(10);
console.log(j.score); // 10`,
      },
      {
        kind: "text",
        text: "Les champs privés `#x` sont réellement inaccessibles de l'extérieur (contrairement à la convention `_x`). Les méthodes `static` appartiennent à la classe, pas aux instances. Les getters/setters (`get`/`set`) exposent des propriétés calculées.",
      },
    ],
  },
  {
    id: "heritage-classes",
    title: "Héritage avec extends",
    level: 3,
    intro: "`extends` et `super` : réutiliser sans dupliquer.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Sous-classe",
        code: `class Personnage {
  constructor(nom) { this.nom = nom; }
  presenter() { return \`Je suis \${this.nom}\`; }
}

class Mage extends Personnage {
  constructor(nom, mana) {
    super(nom); // appelle le constructeur parent (obligatoire avant this)
    this.mana = mana;
  }
  presenter() {
    return super.presenter() + \` (mana : \${this.mana})\`;
  }
}`,
      },
      {
        kind: "text",
        text: "Dans un constructeur de sous-classe, `super(...)` doit être appelé avant tout usage de `this`. Les méthodes se surchargent simplement en les redéfinissant ; `super.methode()` appelle la version parente. L'héritage profond reste à manier avec prudence : la composition (un objet qui contient d'autres objets) est souvent plus souple.",
      },
    ],
  },
  {
    id: "spread-rest-avance",
    title: "Spread et rest",
    level: 3,
    intro: "Les trois points `...` : éclater ou rassembler.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Les deux directions",
        code: `// SPREAD : éclate un itérable
const a = [1, 2];
const b = [...a, 3, 4]; // [1, 2, 3, 4] — copie superficielle
const config = { host: "localhost", port: 3000 };
const prod = { ...config, port: 8080 }; // surcharge propre

// REST : rassemble les restes
const somme = (...nombres) => nombres.reduce((t, n) => t + n, 0);
somme(1, 2, 3); // 6

const { nom, ...reste } = { nom: "Akane", nv: 12, guilde: "F" };
// reste = { nv: 12, guilde: "F" }`,
      },
      {
        kind: "text",
        text: "Le spread copie à plat : les objets imbriqués restent partagés par référence. Pour cloner en profondeur, il faut une fonction dédiée (ou `structuredClone`, disponible dans les environnements modernes).",
      },
    ],
  },
  {
    id: "optional-chaining",
    title: "Optional chaining `?.`",
    level: 3,
    intro: "Naviguer dans des données incertaines sans cascade de `if`.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Accès sécurisé",
        code: `const reponse = { data: { user: { nom: "Akane" } } };

// Avant : vérifications manuelles
const nom1 = reponse && reponse.data && reponse.data.user && reponse.data.user.nom;

// Après : court-circuit élégant
const nom2 = reponse?.data?.user?.nom; // "Akane" ou undefined

// Aussi sur les appels et les crochets
const longueur = reponse?.data?.tags?.length;
reponse?.notifier?.("hello"); // n'appelle que si la méthode existe`,
      },
      {
        kind: "text",
        text: "`?.` s'arrête au premier maillon `null` ou `undefined` et retourne `undefined`. Il ne protège que contre ces deux valeurs : `0`, `\"\"` et `false` passent normalement. Pour les valeurs par défaut, c'est le rôle de `??` (section suivante).",
      },
    ],
  },
  {
    id: "nullish-coalescing",
    title: "Nullish coalescing `??`",
    level: 3,
    intro: "Des valeurs par défaut qui respectent `0` et `\"\"`.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "?? contre ||",
        code: `const options = { volume: 0, nom: "" };

// || : 0 et "" sont « falsy » → remplacés à tort
console.log(options.volume || 10); // 10  (surprise !)
console.log(options.nom || "anon"); // "anon" (surprise !)

// ?? : seuls null/undefined déclenchent le défaut
console.log(options.volume ?? 10); // 0   (correct)
console.log(options.nom ?? "anon"); // ""  (correct)

// Assignation logique (ES2021)
let cache;
cache ??= charger(); // n'appelle charger() que si cache est null/undefined`,
      },
      {
        kind: "text",
        text: "La paire `?.` + `??` couvre la quasi-totalité des accès à des données externes (réponses d'API, configuration) : `config?.timeout ?? 5000` se lit « le timeout configuré, ou 5000 par défaut ».",
      },
    ],
  },
  {
    id: "template-literals",
    title: "Template literals avancés",
    level: 3,
    intro: "Au-delà de l'interpolation : les tagged templates.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Fonction tag",
        code: `// Un « tag » reçoit les morceaux de chaîne et les valeurs séparément
function sql(morceaux, ...valeurs) {
  // Ici on pourrait échapper les valeurs contre l'injection
  return morceaux.reduce(
    (acc, m, i) => acc + m + (valeurs[i] !== undefined ? \`$\${i + 1}\` : ""),
    ""
  );
}

const id = 42;
console.log(sql\`SELECT * FROM users WHERE id = \${id}\`);
// SELECT * FROM users WHERE id = $1`,
      },
      {
        kind: "text",
        text: "Les tagged templates permettent de traiter les interpolations avant assemblage : c'est le mécanisme derrière les librairies SQL sûres, le CSS-in-JS ou l'internationalisation. Un usage avancé, mais qui montre la souplesse du langage.",
      },
    ],
  },
  {
    id: "egalite-transtypage",
    title: "Égalité et transtypage",
    level: 3,
    intro: "Pourquoi `==` est un piège et `===` la règle.",
    blocks: [
      {
        kind: "table",
        headers: ["Expression", "Résultat", "Explication"],
        rows: [
          ["`0 == \"0\"`", "`true`", "`==` convertit les types avant de comparer"],
          ["`0 === \"0\"`", "`false`", "`===` exige même type et même valeur"],
          ["`null == undefined`", "`true`", "Seule conversion `==` jugée acceptable"],
          ["`[] == false`", "`true`", "Conversions en chaîne : à bannir"],
          ["`NaN === NaN`", "`false`", "`NaN` n'est égal à rien, même pas lui-même"],
        ],
      },
      {
        kind: "text",
        text: "Règle absolue : toujours `===` et `!==`. Tester `NaN` avec `Number.isNaN()`. Les conversions explicites (`Number(x)`, `String(x)`, `Boolean(x)`) sont lisibles et prévisibles ; les conversions implicites de `==` et de `+` sont des pièges.",
      },
    ],
  },
  {
    id: "event-loop",
    title: "Event loop",
    level: 3,
    intro: "Comment JavaScript fait de l'asynchrone avec un seul thread.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle d'exécution",
        lines: [
          "Call stack (pile d'appels)",
          "     │  tâche terminée",
          "     ▼",
          "Event loop : « la pile est-elle vide ? »",
          "     │  oui",
          "     ▼",
          "File des microtâches (promesses, await) — vidée en priorité",
          "     │  vide",
          "     ▼",
          "File des macrotâches (setTimeout, I/O, événements)",
          "     │  une tâche exécutée",
          "     ▼",
          "Retour à l'event loop",
        ],
      },
      {
        kind: "text",
        text: "JavaScript n'exécute qu'une chose à la fois. L'asynchrone ne signifie pas « en parallèle » mais « planifié plus tard » : pendant qu'une requête réseau attend, la boucle traite d'autres tâches. Un calcul synchrone long bloque tout — y compris l'interface.",
      },
    ],
  },
  {
    id: "microtaches-macrotaches",
    title: "Microtâches vs macrotâches",
    level: 3,
    intro: "L'ordre d'exécution précis qui surprend les débutants.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Ordre garanti",
        code: `console.log("1");

setTimeout(() => console.log("2"), 0); // macrotâche

Promise.resolve().then(() => console.log("3")); // microtâche

console.log("4");

// Affiche : 1, 4, 3, 2
// Les microtâches (promesses) passent toujours avant les macrotâches,
// même avec un setTimeout de 0 ms.`,
      },
      {
        kind: "text",
        text: "Conséquence pratique : un `await` rend toujours la suite asynchrone, même si la promesse est déjà résolue. Et `setTimeout(..., 0)` ne signifie pas « immédiat » mais « après tout le travail synchrone et les promesses en attente ».",
      },
    ],
  },
  {
    id: "erreurs-try-catch",
    title: "Gestion d'erreurs",
    level: 3,
    intro: "`try`/`catch`/`finally` et les erreurs personnalisées.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Erreurs métier",
        code: `class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

async function charger(url) {
  const res = await fetch(url);
  if (!res.ok) throw new HttpError(res.status, \`HTTP \${res.status}\`);
  return res.json();
}

try {
  await charger("https://api.example.com/x");
} catch (err) {
  if (err instanceof HttpError) console.error("HTTP :", err.status);
  else throw err; // on ne masque pas ce qu'on ne comprend pas
} finally {
  console.log("nettoyage éventuel");
}`,
      },
      {
        kind: "text",
        text: "Deux principes : ne capturer que ce qu'on sait traiter (sinon re-lancer), et typer ses erreurs métier en étendant `Error` pour les distinguer avec `instanceof`. `finally` s'exécute dans tous les cas — idéal pour libérer des ressources.",
      },
    ],
  },
  {
    id: "fetch-http",
    title: "fetch et HTTP",
    level: 3,
    intro: "L'API réseau native : requêtes, options, pièges.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "POST avec en-têtes",
        code: `const res = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nom: "Akane" }),
});

if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const cree = await res.json();`,
      },
      {
        kind: "list",
        items: [
          "`fetch` ne rejette que sur erreur réseau : un 404 ou un 500 résout normalement — d'où le test `res.ok`.",
          "`res.json()` est asynchrone : il retourne une promesse.",
          "Timeout : `fetch` n'en a pas par défaut — utilisez `AbortController` avec `signal`.",
          "Côté navigateur, la politique CORS peut bloquer des requêtes que Node.js autorise.",
        ],
      },
    ],
  },
  {
    id: "json-manipulation",
    title: "JSON",
    level: 3,
    intro: "Le format d'échange universel et ses limites.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Sérialiser / parser",
        code: `const obj = { nom: "Akane", date: new Date(), score: undefined };

// JSON.stringify ignore undefined, fonctions et symboles
// et convertit les Date en chaînes ISO
const texte = JSON.stringify(obj, null, 2);

const copie = JSON.parse(texte);
// copie.date est une CHAÎNE, plus une Date : à reconvertir si besoin`,
      },
      {
        kind: "text",
        text: "JSON ne connaît ni `Date`, ni `Map`, ni `undefined` : tout passe par des chaînes, nombres, booléens, tableaux et objets. Pour cloner un objet simple, `JSON.parse(JSON.stringify(x))` fonctionne mais perd les types spéciaux — préférez `structuredClone(x)` dans les environnements modernes.",
      },
    ],
  },
  {
    id: "es2020-nouveautes",
    title: "ES2020 : les nouveautés clés",
    level: 3,
    intro: "L'édition qui a apporté `?.`, `??` et `BigInt`.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'ES2020 a ajouté",
        fields: [
          { label: "`?.` et `??`", value: "Optional chaining et nullish coalescing : l'accès sécurisé aux données (voir sections dédiées)." },
          { label: "`BigInt`", value: "Entiers de précision arbitraire : `10n`, `9007199254740993n`. Les opérations ne mélangent pas `BigInt` et `Number`." },
          { label: "`Promise.allSettled`", value: "Attend toutes les promesses et rapporte chaque résultat (tenue ou rejetée), contrairement à `Promise.all` qui échoue vite." },
          { label: "`globalThis`", value: "Un accès unifié à l'objet global, quel que soit l'environnement (navigateur, Node, worker)." },
          { label: "Import dynamique", value: "`import(url)` charge un module à la demande et retourne une promesse — base du code-splitting." },
        ],
      },
    ],
  },
  {
    id: "es2021-nouveautes",
    title: "ES2021 : les nouveautés clés",
    level: 3,
    intro: "Petite édition, mais avec des outils du quotidien.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'ES2021 a ajouté",
        fields: [
          { label: "Assignation logique", value: "`&&=`, `||=`, `??=` : `options.timeout ??= 5000` n'assigne que si la valeur est `null`/`undefined`." },
          { label: "`String.replaceAll`", value: "Remplace toutes les occurrences sans regex : `\"a-b-c\".replaceAll(\"-\", \"_\")`." },
          { label: "`Promise.any`", value: "Se résout avec la première promesse tenue ; ne rejette que si toutes échouent (erreur `AggregateError`)." },
          { label: "Séparateurs numériques", value: "`1_000_000` : les underscores rendent les grands nombres lisibles, sans changer la valeur." },
        ],
      },
    ],
  },
  {
    id: "es2022-nouveautes",
    title: "ES2022 : les nouveautés clés",
    level: 3,
    intro: "Top-level await et les méthodes de tableau modernes.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'ES2022 a ajouté",
        fields: [
          { label: "Top-level await", value: "`await` utilisable directement au sommet d'un module ES, sans fonction `async` englobante." },
          { label: "`.at()`", value: "Accès par index négatif : `arr.at(-1)` retourne le dernier élément, lisible et sûr." },
          { label: "Champs de classe", value: "Déclaration directe dans le corps de la classe, y compris les champs privés `#x`." },
          { label: "`Error` cause", value: "`new Error(\"échec\", { cause: err })` : chaîner les erreurs en gardant l'origine." },
          { label: "`Object.hasOwn`", value: "Remplacement sûr de `obj.hasOwnProperty` (qui pouvait être écrasé)." },
        ],
      },
    ],
  },
  {
    id: "es2023-es2024",
    title: "ES2023 / ES2024",
    level: 3,
    intro: "Les ajouts récents : tableaux non-mutants et groupement.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Nouveautés tableaux et objets",
        code: `const notes = [12, 8, 17];

// ES2023 : variantes NON mutantes (l'original est préservé)
const triees = notes.toSorted((a, b) => a - b); // [8, 12, 17]
const inversees = notes.toReversed();           // [17, 8, 12]
const maj = notes.with(0, 20);                 // [20, 8, 17]
console.log(notes); // [12, 8, 17] — inchangé

// ES2023 : findLast / findLastIndex
notes.findLast((n) => n > 10); // 17

// ES2024 : Object.groupBy
const eleves = [{ nom: "A", nv: 1 }, { nom: "B", nv: 2 }, { nom: "C", nv: 1 }];
Object.groupBy(eleves, (e) => e.nv);
// { 1: [...], 2: [...] }`,
      },
      {
        kind: "text",
        text: "La tendance est claire : des API qui évitent la mutation (`toSorted` vs `sort`). En JavaScript moderne, on préfère produire de nouvelles valeurs plutôt que modifier en place — un style que TypeScript et les frameworks apprécient.",
      },
    ],
  },
  {
    id: "iterables-iterateurs",
    title: "Itérables et itérateurs",
    level: 3,
    intro: "Le protocole derrière `for...of` et le spread.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "for...of et déstructuration",
        code: `const equipe = new Map([
  ["Akane", "stratège"],
  ["Dada", "support"],
]);

// Les Map sont itérables : paires [clé, valeur]
for (const [nom, role] of equipe) {
  console.log(\`\${nom} : \${role}\`);
}

// for...of marche sur tableaux, chaînes, Map, Set, générateurs…
// for...in énumère les CLÉS d'un objet : à éviter sur les tableaux`,
      },
      {
        kind: "text",
        text: "Un itérable implémente `Symbol.iterator`. Tableaux, chaînes, `Map` et `Set` le sont ; les objets littéraux, non. D'où la règle : `for...of` pour les collections, `Object.keys`/`entries` pour les objets.",
      },
    ],
  },
  {
    id: "map-set",
    title: "Map et Set",
    level: 3,
    intro: "Les collections modernes, au-delà des objets et tableaux.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Usages typiques",
        code: `// Map : clés de n'importe quel type, ordre d'insertion préservé
const scores = new Map();
scores.set("Akane", 1500);
scores.set("Dada", 1200);
console.log(scores.get("Akane")); // 1500
console.log(scores.has("X"));     // false

// Set : valeurs uniques
const tags = new Set(["js", "ts", "js"]);
console.log([...tags]); // ["js", "ts"] — dédupliqué`,
      },
      {
        kind: "text",
        text: "`Map` bat l'objet littéral quand les clés ne sont pas des chaînes, ou quand on itère souvent. `Set` déduplique en une ligne. Les deux ont une `size` (pas `length`) et se parcourent avec `for...of`.",
      },
    ],
  },
  {
    id: "debugging-node",
    title: "Déboguer avec Node",
    level: 3,
    intro: "Aller au-delà de `console.log`.",
    blocks: [
      {
        kind: "command",
        label: "Lancer l'inspecteur de Node",
        command: "node --inspect app.js",
        why: "Démarre le programme en mode débogage et expose l'inspecteur sur un port local. On peut alors connecter les DevTools (chrome://inspect) pour poser des points d'arrêt, inspecter les variables et avancer pas à pas — indispensable quand `console.log` ne suffit plus.",
        verify: "node --inspect --version",
      },
      {
        kind: "fields",
        title: "Techniques de débogage",
        fields: [
          { label: "`console.table`", value: "Affiche un tableau d'objets sous forme de tableau lisible dans le terminal." },
          { label: "`console.time` / `timeEnd`", value: "Mesure la durée d'un bloc : `console.time(\"requête\")` puis `console.timeEnd(\"requête\")`." },
          { label: "Points d'arrêt", value: "Le mot-clé `debugger;` stoppe l'exécution quand l'inspecteur est attaché." },
          { label: "Stack traces", value: "Lire la pile d'appels de bas en haut : l'erreur est en haut, votre code fautif juste en dessous." },
        ],
      },
    ],
  },
  {
    id: "tests-node-test",
    title: "Tester avec node:test",
    level: 3,
    intro: "Le lanceur de tests intégré à Node, sans dépendance.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "maths.test.js",
        code: `import { test } from "node:test";
import assert from "node:assert/strict";
import { carre } from "./maths.js";

test("carre(3) vaut 9", () => {
  assert.equal(carre(3), 9);
});

test("carre gère les négatifs", () => {
  assert.equal(carre(-4), 16);
});`,
      },
      {
        kind: "command",
        label: "Exécuter les tests",
        command: "node --test",
        why: "Lance tous les fichiers `*.test.js` du projet avec le lanceur intégré de Node. Aucune installation requise : `node:test` pour structurer, `node:assert/strict` pour vérifier. Quand les besoins grandissent (mocks, couverture), on migre vers Vitest ou Jest.",
        verify: "node --test --version",
      },
    ],
  },
  {
    id: "npm-scripts-outils",
    title: "Scripts npm et outils",
    level: 3,
    intro: "Standardiser les commandes du projet.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json — scripts",
        code: `{
  "name": "mon-projet",
  "type": "module",
  "scripts": {
    "start": "node app.js",
    "dev": "node --watch app.js",
    "test": "node --test"
  }
}`,
      },
      {
        kind: "command",
        label: "Lancer un script npm",
        command: "npm run dev",
        why: "Exécute la commande définie sous `scripts.dev` dans `package.json`. Les scripts documentent le workflow : un nouveau contributeur lance `npm test` sans connaître les flags internes. `npm start` et `npm test` sont les deux raccourcis sans `run`.",
        verify: "npm run",
      },
      {
        kind: "text",
        text: "`node --watch` relance le programme à chaque modification de fichier : la boucle de développement la plus simple qui soit, sans outil externe.",
      },
    ],
  },
  {
    id: "erreurs-courantes-egalite",
    title: "Erreurs courantes : comparaisons",
    level: 3,
    intro: "Les pièges de `==` et des valeurs spéciales.",
    blocks: [
      {
        kind: "list",
        items: [
          "Utiliser `==` « par habitude » : `0 == \"\"` vaut `true`. Toujours `===`.",
          "Comparer `NaN` avec `===` : toujours `false`. Utilisez `Number.isNaN(x)`.",
          "Tester l'existence avec `if (x)` quand `0` ou `\"\"` sont des valeurs légitimes : préférez `x == null` (attrape `null` et `undefined`) ou `x ?? défaut`.",
          "Oublier que `typeof null === \"object\"` : un bug historique du langage, à connaître.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-this",
    title: "Erreurs courantes : `this` perdu",
    level: 3,
    intro: "Le bug le plus déroutant pour les débutants.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Le piège et ses remèdes",
        code: `class Compteur {
  constructor() { this.total = 0; }
  incrementer() { this.total += 1; }
}

const c = new Compteur();
setTimeout(c.incrementer, 100); // BUG : this vaut undefined → TypeError

// Remèdes :
setTimeout(() => c.incrementer(), 100); // fléchée : this préservé
setTimeout(c.incrementer.bind(c), 100); // bind explicite`,
      },
      {
        kind: "text",
        text: "Dès qu'une méthode est passée comme callback (`setTimeout`, gestionnaire d'événement, `map`), elle perd son `this`. La fonction fléchée est le remède standard ; `.bind()` est l'alternative explicite.",
      },
    ],
  },
  {
    id: "erreurs-courantes-hoisting",
    title: "Erreurs courantes : hoisting et TDZ",
    level: 3,
    intro: "Utiliser une variable avant sa déclaration.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Temporal dead zone",
        code: `console.log(a); // undefined (var est « hissée », valeur undefined)
var a = 1;

console.log(b); // ReferenceError : TDZ — b existe mais pas encore initialisée
let b = 2;

direBonjour(); // OK : les déclarations de fonction sont hissées entièrement
function direBonjour() { console.log("salut"); }`,
      },
      {
        kind: "text",
        text: "La « temporal dead zone » : entre le début du bloc et la déclaration `let`/`const`, la variable existe mais y accéder lève une erreur. Moralité : déclarez en haut du bloc, et oubliez `var` définitivement.",
      },
    ],
  },
  {
    id: "erreurs-courantes-async",
    title: "Erreurs courantes : async",
    level: 3,
    intro: "Les trois illusions de l'asynchrone.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "forEach + await ne fait pas ce qu'on croit",
        code: `// BUG : forEach n'attend pas les callbacks async
ids.forEach(async (id) => {
  await traiter(id); // les traitements se chevauchent, l'ordre n'est pas garanti
});

// CORRECT : boucle for...of séquentielle
for (const id of ids) {
  await traiter(id);
}

// CORRECT : parallèle voulu
await Promise.all(ids.map((id) => traiter(id)));`,
      },
      {
        kind: "list",
        items: [
          "`forEach` ignore les promesses retournées par son callback : utilisez `for...of` ou `Promise.all` + `map`.",
          "Oublier `await` : on manipule alors une promesse, pas sa valeur — l'erreur apparaît deux fonctions plus loin.",
          "`Promise.all` échoue vite : si une promesse rejette, les autres résultats sont perdus — `allSettled` quand chaque résultat compte.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-mutation",
    title: "Erreurs courantes : mutation",
    level: 3,
    intro: "Modifier sans le vouloir un objet partagé.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Références partagées",
        code: `const config = { db: { host: "localhost" } };
const copie = { ...config }; // copie SUPERFICIELLE
copie.db.host = "prod";      // BUG : modifie aussi config.db.host !

const vraieCopie = structuredClone(config); // copie profonde (moderne)
vraieCopie.db.host = "prod"; // config intacte`,
      },
      {
        kind: "text",
        text: "Objets et tableaux se passent par référence : les « copier » avec `...` ne duplique que le premier niveau. `structuredClone` (disponible dans Node 17+ et les navigateurs modernes) fait une vraie copie profonde des données sérialisables.",
      },
    ],
  },
  {
    id: "bonnes-pratiques-js",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les habitudes qui rendent le JavaScript prévisible.",
    blocks: [
      {
        kind: "list",
        items: [
          "`const` par défaut, `let` si réassigné, jamais `var`.",
          "`===` strict partout ; conversions explicites (`Number()`, `String()`).",
          "Fonctions courtes, un seul niveau d'abstraction par fonction.",
          "Préférer l'immutabilité : `map`/`filter` plutôt que `push` dans une boucle.",
          "Nommer les promesses et toujours gérer le rejet (`.catch` ou `try`/`catch`).",
          "Un module = une responsabilité ; exporter le minimum.",
          "Éviter les variables globales : tout vit dans des modules.",
          "Commenter le « pourquoi », jamais le « quoi » évident.",
        ],
      },
    ],
  },
  {
    id: "projets-js",
    title: "Projets pour progresser",
    level: 3,
    intro: "Du script utilitaire au mini-serveur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Générateur de mots de passe", detail: "CLI qui combine `crypto.randomInt`, options de longueur et caractères : pratique des modules natifs." },
          { title: "Agrégateur d'API", detail: "Interroger 3 API publiques en parallèle avec `Promise.all`, fusionner et afficher : async réel." },
          { title: "Mini-serveur HTTP", detail: "`node:http` natif : router des URLs, servir du JSON, gérer les méthodes — sans framework." },
          { title: "Jeu en terminal", detail: "Devine-nombre ou morpion avec `readline/promises` : boucles, état, entrées utilisateur." },
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
          { label: "MDN Web Docs", value: "developer.mozilla.org : la référence JavaScript la plus complète et fiable, avec exemples exécutables." },
          { label: "Node.js Docs", value: "nodejs.org/docs : API du runtime, modules natifs (`fs`, `http`, `test`)." },
          { label: "TC39 Proposals", value: "github.com/tc39/proposals : suivre les futures fonctionnalités du langage à la source." },
          { label: "Playground", value: "Tester les nouveautés directement dans la console du navigateur ou le REPL Node." },
        ],
      },
      {
        kind: "list",
        items: [
          "Practice : les projets ci-dessus, puis des katas (exercices courts) sur les tableaux et l'async.",
          "Revue : relire son vieux code après chaque section du niveau 3 — les progrès sont visibles.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le socle JavaScript est posé : direction TypeScript.",
    blocks: [
      {
        kind: "list",
        items: [
          "Passer à la compétence `installation` : mettre en place un vrai projet TypeScript.",
          "Puis `tsc` : comprendre la compilation et la vérification des types.",
          "Ensuite `types-base` et `interfaces` : le vocabulaire quotidien du typage.",
          "Revenir ici quand une erreur TypeScript semble parler de sémantique JavaScript : c'est souvent le cas.",
        ],
      },
    ],
  },
];

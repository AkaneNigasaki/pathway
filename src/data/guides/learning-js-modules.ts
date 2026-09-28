import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des modules JavaScript : ESM (import/export),
 * résolution, import dynamique, interop CommonJS, npm et bundlers.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_JS_MODULES: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre pourquoi le code JS se découpe en modules.",
    blocks: [
      {
        kind: "text",
        text: "Un module est un fichier JavaScript qui exporte des morceaux de code (fonctions, classes, constantes) et importe ceux d'autres fichiers. Sans modules, tout partage le même scope global : collisions de noms, ordre de chargement fragile, code monolithique. Les modules apportent encapsulation, dépendances explicites et chargement contrôlé.",
      },
      {
        kind: "text",
        text: "Le standard moderne s'appelle ESM (ECMAScript Modules) : `import` / `export`. Il fonctionne nativement dans les navigateurs et dans Node.js. L'ancien système de Node, CommonJS (`require` / `module.exports`), coexiste encore : comprendre les deux et leur interopérabilité est indispensable.",
      },
      {
        kind: "text",
        text: "Ce parcours couvre la syntaxe ESM, la résolution des chemins, les imports dynamiques, les cycles de dépendances, npm, l'interop avec CommonJS et le rôle des bundlers. C'est la compétence qui transforme des scripts épars en application structurée.",
      },
    ],
  },
  {
    id: "module-30s",
    title: "Un module en 30 secondes",
    level: 1,
    intro:
      "Exporter, importer : le geste fondamental.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "math.js — exporte",
        code: `// math.js\nexport function addition(a, b) {\n  return a + b;\n}\n\nexport const PI = 3.14159;`,
      },
      {
        kind: "code",
        language: "js",
        title: "app.js — importe",
        code: `// app.js\nimport { addition, PI } from "./math.js";\n\nconsole.log(addition(2, 3)); // 5\nconsole.log(PI);             // 3.14159`,
      },
      {
        kind: "text",
        text: "Chaque fichier est un scope isolé : rien ne fuit dans le global sans `export` explicite. Les dépendances sont déclarées en haut, lisibles d'un coup d'œil.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "prerequis-modules",
    title: "Prérequis",
    level: 2,
    intro:
      "Les bases avant de découper le code.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations requises",
        fields: [
          {
            label: "JavaScript",
            value:
              "Fonctions, objets, tableaux, destructuration : la compétence `javascript`. Les modules organisent ce code, ils ne le remplacent pas.",
          },
          {
            label: "Asynchrone",
            value:
              "`import()` dynamique retourne une promesse : voir `async-js` pour `await` et les promesses.",
          },
          {
            label: "Terminal (utile)",
            value:
              "Savoir lancer `node` et `npm` : la pratique des modules Node se fait en ligne de commande.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-module",
    title: "Premier module dans le navigateur",
    level: 2,
    intro:
      "Faire fonctionner ESM sans aucun outil.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "index.html",
        code: `<!DOCTYPE html>\n<html lang="fr">\n<head><meta charset="utf-8"><title>Modules</title></head>\n<body>\n  <!-- type="module" : le script est un module ESM -->\n  <script type="module" src="./app.js"></script>\n</body>\n</html>`,
      },
      {
        kind: "list",
        items: [
          "`type=\"module\"` : active `import`/`export`, scope isolé, chargement différé (comme `defer`).",
          "Contrainte : les modules exigent HTTP(S) — ouvrir le fichier en `file://` bloque les imports (CORS). Servez le dossier : `npx serve` ou `python3 -m http.server`.",
          "Les chemins d'import navigateur exigent l'extension : `\"./math.js\"`, pas `\"./math\"`.",
          "Les modules sont en mode strict automatiquement (`\"use strict\"` implicite).",
        ],
      },
    ],
  },
  {
    id: "export-import",
    title: "export et import : la syntaxe",
    level: 2,
    intro:
      "Les formes d'export et d'import à connaître.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Exports nommés",
        code: `// utils.js\n// Forme 1 : export inline\n export function formater(date) { /* … */ }\n export const VERSION = "1.0";\n\n// Forme 2 : export groupé en fin de fichier\nfunction parser(texte) { /* … */ }\nconst CONFIG = { /* … */ };\nexport { parser, CONFIG };`,
      },
      {
        kind: "code",
        language: "js",
        title: "Imports nommés",
        code: `import { formater, VERSION } from "./utils.js";\nimport { parser as analyser } from "./utils.js"; // renommage\nimport * as utils from "./utils.js";            // namespace\n\nutils.formater(new Date()); // via le namespace`,
      },
      {
        kind: "text",
        text: "Les imports sont en lecture seule (live bindings, voir niveau 3) et hissés en haut du module : déclarez-les toujours en premier, même si la syntaxe les autorise ailleurs.",
      },
    ],
  },
  {
    id: "export-default",
    title: "L'export par défaut",
    level: 2,
    intro:
      "Un seul export principal par module.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Default export",
        code: `// Button.js\n export default function Button(props) { /* … */ }\n\n// ou :\n// class Compteur { /* … */ }\n// export default Compteur;`,
      },
      {
        kind: "code",
        language: "js",
        title: "Import sans accolades, nom libre",
        code: `import Bouton from "./Button.js";      // le nom est libre\nimport MonBouton, { VARIANTES } from "./Button.js"; // défaut + nommés`,
      },
      {
        kind: "list",
        items: [
          "Un seul `export default` par module ; imports sans accolades, nom au choix.",
          "Convention : le default export est « la » chose principale du fichier (un composant, une classe).",
          "Débats d'équipe : certains projets bannissent le default au profit du tout-nommé (refactoring plus sûr, autocomplétion). Les deux se défendent — soyez cohérent.",
        ],
      },
    ],
  },
  {
    id: "chemins-resolution",
    title: "Chemins et résolution",
    level: 2,
    intro:
      "Comment le moteur trouve le fichier importé.",
    blocks: [
      {
        kind: "table",
        headers: ["Forme", "Signification"],
        rows: [
          ["`\"./utils.js\"`", "Relatif au fichier courant"],
          ["`\"../lib/aide.js\"`", "Dossier parent"],
          ["`\"/racine/app.js\"`", "Absolu (navigateur : racine du serveur)"],
          ["`\"lodash\"`", "Spécificateur « nu » : paquet npm — résolu par le bundler/Node, PAS par le navigateur seul"],
        ],
      },
      {
        kind: "list",
        items: [
          "Navigateur natif : extension obligatoire, pas de spécificateurs nus (sans import maps).",
          "Node.js ESM : extension obligatoire aussi (ou résolution via `package.json`).",
          "Bundlers (Vite, webpack) : extensions optionnelles, spécificateurs nus OK — ils résolvent `node_modules`.",
        ],
      },
    ],
  },
  {
    id: "modules-node",
    title: "Modules côté Node.js",
    level: 2,
    intro:
      "Activer ESM dans Node.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json",
        code: `{\n  "name": "mon-app",\n  "version": "1.0.0",\n  "type": "module"\n}`,
      },
      {
        kind: "code",
        language: "js",
        title: "app.js (Node ESM)",
        code: `// Avec "type": "module", les .js sont des modules ESM\nimport { readFile } from "node:fs/promises";\nimport { addition } from "./math.js";\n\nconst contenu = await readFile("./notes.txt", "utf8"); // top-level await OK\nconsole.log(addition(2, 3));`,
      },
      {
        kind: "list",
        items: [
          "`\"type\": \"module\"` : tous les `.js` du paquet sont ESM. Sans lui, `.js` = CommonJS et il faut `.mjs` pour l'ESM.",
          "`node:` : préfixe des modules natifs (`node:fs`, `node:path`) — explicite et recommandé.",
          "Top-level `await` : autorisé dans les modules, pas dans les scripts classiques.",
        ],
      },
    ],
  },
  {
    id: "npm-bases-pratique",
    title: "npm : installer et utiliser un paquet",
    level: 2,
    intro:
      "Le workflow quotidien avec les dépendances.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Commandes essentielles",
        code: `npm init -y                 # crée package.json\nnpm install lodash         # dépendance (→ dependencies)\nnpm install -D vitest      # dépendance de dev (→ devDependencies)\nnpm uninstall lodash       # retire\nnpm update                 # met à jour selon les plages de versions\nnpx vitest                 # exécute un binaire sans l'installer`,
      },
      {
        kind: "code",
        language: "js",
        title: "Utilisation",
        code: `import { chunk } from "lodash"; // spécificateur nu → node_modules\nconsole.log(chunk([1, 2, 3, 4], 2)); // [[1, 2], [3, 4]]`,
      },
      {
        kind: "list",
        items: [
          "`package.json` liste les dépendances, `package-lock.json` fige les versions exactes — commitez les deux.",
          "`node_modules/` ne se committe jamais (`.gitignore`).",
          "`npx` exécute un paquet sans l'installer durablement : idéal pour les outils ponctuels.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-modules",
    title: "Les erreurs les plus courantes",
    level: 2,
    intro:
      "Les messages d'erreur que tout le monde rencontre.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Cause probable"],
        rows: [
          ["`Cannot use import statement outside a module`", "Fichier traité comme script : `type=\"module\"` ou `\"type\": \"module\"` manquant"],
          ["`Failed to resolve module specifier`", "Spécificateur nu dans le navigateur sans import map, ou extension oubliée"],
          ["`does not provide an export named`", "Nom mal orthographié, ou confusion default/nommé"],
          ["`require is not defined`", "`require` (CommonJS) utilisé dans un module ESM"],
          ["`__dirname is not defined`", "Équivalent ESM : `import.meta.dirname` (Node 20.11+)"],
        ],
      },
    ],
  },
  {
    id: "projet-decoupage",
    title: "Projet : découper une app",
    level: 2,
    intro:
      "Transformer un script monolithique en modules.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Point de départ",
            detail:
              "Un `app.js` monolithique (ex. la todo-list du parcours DOM) : tout dans un seul fichier.",
          },
          {
            title: "Découper",
            detail:
              "`storage.js` (localStorage), `ui.js` (rendu DOM), `events.js` (écouteurs), `app.js` (orchestration).",
          },
          {
            title: "Règle de découpe",
            detail:
              "Un module = une responsabilité ; les dépendances vont dans un seul sens (ui ← app, jamais l'inverse).",
          },
          {
            title: "Vérifier",
            detail:
              "Chaque module importable isolément, aucun accès au global, `index.html` en `type=\"module\"` servi en HTTP.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "exports-avances",
    title: "Exports avancés",
    level: 3,
    intro:
      "Renommage, agrégation et exports conditionnels.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Formes avancées",
        code: `// Renommer à l'export\nconst interne = 42;\nexport { interne as reponse }; // import { reponse } from …\n\n// Ré-export : un module qui regroupe (barrel)\nexport { addition } from "./math.js";\nexport * from "./utils.js"; // tout, sauf le default\n\n// Export d'une expression\n export default { version: "2.0" };`,
      },
      {
        kind: "text",
        text: "`export *` ne ré-exporte pas le `default` : c'est une source classique d'« export manquant ». Les barrels (`index.js` qui ré-exporte) simplifient les imports mais peuvent nuire au tree-shaking s'ils sont mal conçus (voir sections dédiées).",
      },
    ],
  },
  {
    id: "re-exports-barrel",
    title: "Le pattern barrel",
    level: 3,
    intro:
      "Un point d'entrée unique par dossier.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "components/index.js",
        code: `// Au lieu d'importer depuis des chemins profonds…\n// import { Button } from "./components/Button/Button.js";\n\n// …le barrel ré-exporte :\nexport { default as Button } from "./Button/Button.js";\nexport { default as Card } from "./Card/Card.js";\n\n// Usage : un seul import\nimport { Button, Card } from "./components/index.js";`,
      },
      {
        kind: "list",
        items: [
          "Avantage : imports courts et stables, réorganisation interne sans casser les consommateurs.",
          "Risque : cycles de dépendances si deux barrels se ré-exportent mutuellement.",
          "Risque perf : un barrel géant peut empêcher le tree-shaking — préférez des barrels par domaine, pas un seul global.",
        ],
      },
    ],
  },
  {
    id: "import-dynamique",
    title: "L'import dynamique",
    level: 3,
    intro:
      "Charger un module à la demande, quand on veut.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "import()",
        code: `// import() retourne une promesse → utilisable partout, même hors module\nasync function ouvrirEditeur() {\n  // Le module n'est téléchargé qu'au premier appel\n  const { Editeur } = await import("./editeur.js");\n  new Editeur().monter();\n}\n\n// Chargement conditionnel\nif (utilisateur.estAdmin) {\n  const { panneauAdmin } = await import("./admin.js");\n  panneauAdmin.init();\n}`,
      },
      {
        kind: "list",
        items: [
          "`import()` fonctionne avec une expression : `await import(\"./lang/\" + langue + \".js\")` — les bundlers détectent le motif et incluent les fichiers correspondants.",
          "Cas d'usage : code-splitting par route, fonctionnalités lourdes rarement utilisées, chargement selon les droits ou la langue.",
          "Toujours `await` ou `.then()` : c'est une promesse, avec gestion d'erreur (`try/catch`).",
        ],
      },
    ],
  },
  {
    id: "code-splitting",
    title: "Code splitting",
    level: 3,
    intro:
      "Découper le bundle pour ne charger que le nécessaire.",
    blocks: [
      {
        kind: "text",
        text: "Sans découpage, toute l'app part en un seul fichier : l'utilisateur télécharge le panneau admin sans jamais l'ouvrir. Avec `import()` dynamique, le bundler crée automatiquement des « chunks » séparés, chargés à la demande. Stratégies : par route (une page = un chunk), par fonctionnalité lourde (éditeur, graphiques), par condition (langue, droits).",
      },
      {
        kind: "list",
        items: [
          "Le découpage est automatique avec les bundlers modernes : chaque `import()` devient un point de split.",
          "Préchargez intelligemment : `import()` au survol d'un lien pour masquer la latence.",
          "Mesurez avec l'analyseur de bundle (ex. `rollup-plugin-visualizer`) : on ne découpe bien que ce qu'on voit.",
        ],
      },
    ],
  },
  {
    id: "tree-shaking",
    title: "Tree shaking",
    level: 3,
    intro:
      "Éliminer le code mort du bundle.",
    blocks: [
      {
        kind: "text",
        text: "Le tree shaking supprime les exports jamais importés. Il repose sur la nature statique d'ESM : les imports/exports étant déclaratifs, le bundler sait ce qui est utilisé sans exécuter le code. Conditions : ESM (pas CommonJS), pas d'effets de bord cachés, et `\"sideEffects\": false` dans le `package.json` des librairies pour autoriser l'élagage agressif.",
      },
      {
        kind: "list",
        items: [
          "`import { chunk } from \"lodash\"` + bundler moderne : seul `chunk` part en production (avec la version ESM de la lib).",
          "Les effets de bord au top-level (ex. `window.x = …` à l'import) empêchent l'élagage : isolez-les.",
          "Vérifiez le résultat : un import de 3 fonctions ne doit pas embarquer toute la librairie.",
        ],
      },
    ],
  },
  {
    id: "cycles-dependances",
    title: "Dépendances circulaires",
    level: 3,
    intro:
      "Quand A importe B qui importe A.",
    blocks: [
      {
        kind: "text",
        text: "ESM tolère les cycles grâce aux live bindings : si A importe B pendant que B importe A, le binding existe mais peut valoir `undefined` au moment où B s'évalue (ordre d'évaluation). Symptôme typique : une valeur `undefined` « impossible » à l'import. En CommonJS, le cycle donne un `module.exports` partiellement rempli — encore plus trompeur.",
      },
      {
        kind: "list",
        items: [
          "Prévention : architecture en couches (jamais d'import « vers le haut »), extraction du code partagé dans un troisième module.",
          "Détection : l'avertissement du bundler (« circular dependency ») est à traiter, pas à ignorer.",
          "Solution de contournement : `import()` dynamique pour briser le cycle au moment de l'évaluation.",
        ],
      },
    ],
  },
  {
    id: "live-bindings",
    title: "Les live bindings",
    level: 3,
    intro:
      "Les imports sont des vues, pas des copies.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "compteur.js",
        code: `// compteur.js\nexport let compteur = 0;\nexport function incrementer() {\n  compteur++; // l'importateur voit la nouvelle valeur\n}`,
      },
      {
        kind: "code",
        language: "js",
        title: "app.js",
        code: `import { compteur, incrementer } from "./compteur.js";\n\nconsole.log(compteur); // 0\nincrementer();\nconsole.log(compteur); // 1 — le binding est \"vivant\"\n\n// compteur = 5; // ❌ TypeError : les imports sont en lecture seule`,
      },
      {
        kind: "text",
        text: "Contrairement à CommonJS (copie de la valeur exportée au moment du `require`), ESM crée un lien vivant : l'importateur observe les mutations faites par l'exportateur. Ne pas réassigner un import : exposez une fonction mutatrice.",
      },
    ],
  },
  {
    id: "top-level-await",
    title: "Top-level await",
    level: 3,
    intro:
      "`await` au sommet d'un module.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Configuration chargée avant le reste",
        code: `// config.js — le module ne \"termine\" que quand la config est là\nconst reponse = await fetch("/api/config");\nif (!reponse.ok) throw new Error("Config indisponible");\nexport const config = await reponse.json();\n\n// app.js — l'import attend la résolution\nimport { config } from "./config.js"; // bloqué jusqu'au fetch ci-dessus\nconsole.log(config.theme);`,
      },
      {
        kind: "list",
        items: [
          "Les importateurs attendent : un top-level `await` lent retarde toute la chaîne d'imports — à réserver aux initialisations vraiment bloquantes.",
          "Support : navigateurs modernes et Node 14.8+. Les bundlers le gèrent.",
          "Alternative : exporter une promesse d'initialisation et l'attendre explicitement là où c'est nécessaire.",
        ],
      },
    ],
  },
  {
    id: "import-maps",
    title: "Les import maps",
    level: 3,
    intro:
      "Des spécificateurs nus sans bundler, dans le navigateur.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Mapper les noms de paquets",
        code: `<script type="importmap">\n{\n  "imports": {\n    "lodash": "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.js",\n    "utils/": "./src/utils/"\n  }\n}\n</script>\n<script type="module">\n  import { chunk } from "lodash";        // résolu via la map\n  import { aide } from "utils/aide.js";  // préfixe mappé\n</script>`,
      },
      {
        kind: "text",
        text: "Les import maps apportent au navigateur natif ce que les bundlers font pour les spécificateurs nus. Utile pour prototyper sans build, micro-frontends, ou pages à dépendances CDN. Limite : une seule import map par page, déclarée avant tout module.",
      },
    ],
  },
  {
    id: "commonjs-vs-esm",
    title: "CommonJS vs ESM",
    level: 3,
    intro:
      "Les deux systèmes face à face.",
    blocks: [
      {
        kind: "table",
        headers: ["", "CommonJS", "ESM"],
        rows: [
          ["Syntaxe", "`require()` / `module.exports`", "`import` / `export`"],
          ["Chargement", "Synchrone, dynamique", "Asynchrone, statique (sauf `import()`)"],
          ["Où", "Node.js historique", "Navigateurs + Node.js moderne (standard)"],
          ["Tree shaking", "Non (dynamique)", "Oui"],
          ["Top-level await", "Non", "Oui"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "CommonJS (pour lire le code existant)",
        code: `// utils.cjs (ou .js sans "type": "module")\nfunction formater(d) { /* … */ }\nmodule.exports = { formater }; // ou exports.formater = …\n\n// usage\nconst { formater } = require("./utils.cjs");`,
      },
      {
        kind: "text",
        text: "ESM est le standard d'avenir ; CommonJS reste omniprésent dans l'écosystème Node (dépendances anciennes, configs d'outils). Sachez lire les deux, écrivez en ESM pour le nouveau code.",
      },
    ],
  },
  {
    id: "interop-cjs-esm",
    title: "Interopérabilité CJS/ESM",
    level: 3,
    intro:
      "Faire cohabiter les deux systèmes.",
    blocks: [
      {
        kind: "table",
        headers: ["Sens", "Comment", "Note"],
        rows: [
          ["ESM → CJS", "`import pkg from \"./truc.cjs\"`", "Le `module.exports` devient le default export ; les nommés sont déduits statiquement (imparfait)"],
          ["CJS → ESM", "`await import(\"./truc.mjs\")`", "`import()` dynamique depuis CommonJS — asynchrone"],
          ["CJS → ESM (sync)", "`require(esm)`", "Node 22+ : `require()` d'un module ESM (synchrone, sans top-level await)"],
        ],
      },
      {
        kind: "list",
        items: [
          "Piège classique : `import { x } from \"cjs-lib\"` échoue si la lib fait `module.exports = …` non analysable — utilisez le default import.",
          "`__dirname`/`__filename` n'existent pas en ESM : `import.meta.dirname` (Node 20.11+) ou le duo `fileURLToPath` + `import.meta.url`.",
        ],
      },
    ],
  },
  {
    id: "dual-package",
    title: "Le dual package (avancé)",
    level: 3,
    intro:
      "Publier une librairie utilisable en CJS et ESM.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json d'une librairie",
        code: `{\n  "name": "ma-lib",\n  "type": "module",\n  "main": "./dist/index.cjs",\n  "module": "./dist/index.js",\n  "exports": {\n    ".": {\n      "import": "./dist/index.js",\n      "require": "./dist/index.cjs"\n    }\n  }\n}`,
      },
      {
        kind: "text",
        text: "Le champ `exports` est la porte d'entrée moderne : il définit ce qui est importable et sous quelle condition (`import` vs `require`, `node` vs `browser`, `types`). Il remplace progressivement `main`/`module` et bloque les imports profonds non déclarés — une encapsulation voulue.",
      },
    ],
  },
  {
    id: "node-resolution",
    title: "Résolution Node.js",
    level: 3,
    intro:
      "Comment Node trouve un paquet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Spécificateur nu",
            detail:
              "`import \"lodash\"` : Node remonte les dossiers en cherchant `node_modules/lodash`, puis lit son `package.json` (`exports` d'abord, sinon `main`).",
          },
          {
            title: "Sous-chemins",
            detail:
              "`import \"lodash/chunk\"` : autorisé seulement si le `package.json` l'expose via `exports` — sinon erreur (encapsulation).",
          },
          {
            title: "Relatif",
            detail:
              "`import \"./x.js\"` : relatif au fichier, extension requise en ESM.",
          },
          {
            title: "Natif",
            detail:
              "`import \"node:fs\"` : module intégré, prioritaire sur tout `node_modules`.",
          },
        ],
      },
    ],
  },
  {
    id: "side-effects",
    title: "Effets de bord et sideEffects",
    level: 3,
    intro:
      "Quand l'import fait plus qu'importer.",
    blocks: [
      {
        kind: "text",
        text: "Un module a des effets de bord s'il fait quelque chose à l'import : modifier le DOM, patcher un prototype, ouvrir une connexion. Ces effets empêchent le tree shaking (le bundler n'ose pas supprimer un module « actif ») et créent des dépendances d'ordre cachées.",
      },
      {
        kind: "code",
        language: "json",
        title: "Déclarer l'absence d'effets",
        code: `{\n  "name": "ma-lib",\n  "sideEffects": false\n}\n// ou ciblé : ["*.css", "./src/polyfill.js"]\n// → seuls ces fichiers sont considérés comme ayant des effets`,
      },
      {
        kind: "text",
        text: "Bonne pratique : modules purs par défaut ; les effets (init, polyfills) dans des modules dédiés, importés explicitement pour leur effet (`import \"./init.js\"`).",
      },
    ],
  },
  {
    id: "package-exports",
    title: "Le champ exports en détail",
    level: 3,
    intro:
      "L'API publique d'un paquet.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Exports multiples et conditions",
        code: `{\n  "exports": {\n    ".": {\n      "types": "./dist/index.d.ts",\n      "import": "./dist/index.js",\n      "require": "./dist/index.cjs",\n      "default": "./dist/index.js"\n    },\n    "./utils": "./dist/utils.js",\n    "./package.json": "./package.json"\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "Tout ce qui n'est pas déclaré est inaccessible : fini les imports profonds dans les entrailles du paquet.",
          "Conditions : `node`, `browser`, `development`, `default` — le résolveur prend la première qui matche.",
          "`types` : pointe vers les déclarations TypeScript.",
        ],
      },
    ],
  },
  {
    id: "bundlers-intro",
    title: "Bundlers : pourquoi et lesquels",
    level: 3,
    intro:
      "Le rôle des bundlers dans l'écosystème modules.",
    blocks: [
      {
        kind: "text",
        text: "En production, livrer des centaines de modules séparés multiplie les requêtes HTTP. Les bundlers (Vite, webpack, Rollup, esbuild) résolvent tous les imports, appliquent tree shaking et code splitting, et produisent quelques fichiers optimisés. En développement, Vite sert les modules natifs sans bundler (démarrage instantané) et ne bundle qu'au build.",
      },
      {
        kind: "table",
        headers: ["Outil", "Rôle"],
        rows: [
          ["Vite", "Dev + build (Rollup en dessous) — le standard actuel"],
          ["webpack", "Le vétéran, très configurable"],
          ["Rollup", "Bundler de librairies, excellent tree shaking"],
          ["esbuild", "Transpilation/bundling ultra-rapide (Go)"],
        ],
      },
    ],
  },
  {
    id: "vite-bases",
    title: "Vite et les modules",
    level: 3,
    intro:
      "Ce que Vite fait de vos imports.",
    blocks: [
      {
        kind: "list",
        items: [
          "En dev, Vite sert vos fichiers tels quels en ESM natif : `import` du navigateur direct, HMR (remplacement à chaud) par module.",
          "Les dépendances `node_modules` sont pré-bundlées en ESM (esbuild) : les spécificateurs nus fonctionnent dans le navigateur.",
          "Au build (`vite build`), Rollup produit des chunks optimisés avec hash pour le cache long.",
          "Alias de chemins : `import { x } from \"@/utils\"` via `resolve.alias` + `paths` du `tsconfig` — fini les `../../../../`.",
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "vite.config.js — alias",
        code: `import { defineConfig } from "vite";\nimport path from "node:path";\n\nexport default defineConfig({\n  resolve: {\n    alias: {\n      "@": path.resolve(import.meta.dirname, "./src"),\n    },\n  },\n});`,
      },
    ],
  },
  {
    id: "ts-modules",
    title: "Modules et TypeScript",
    level: 3,
    intro:
      "Types, résolution et `import type`.",
    blocks: [
      {
        kind: "code",
        language: "ts",
        title: "import type",
        code: `// Les types disparaissent à la compilation :\n// import type garantit qu'aucun import réel n'est émis\nimport type { Utilisateur } from "./types.js";\nimport { charger } from "./api.js";\n\n// verbatimModuleSyntax (recommandé) : exige 'import type'\n// pour tout ce qui n'est utilisé qu'en type.`,
      },
      {
        kind: "list",
        items: [
          "`moduleResolution: \"bundler\"` (Vite) ou `\"nodenext\"` (Node pur) : la résolution TS doit matcher l'environnement d'exécution.",
          "Les types voyagent via `@types/*` ou le champ `types`/`exports.types` du paquet.",
          "En ESM+TS, gardez l'extension `.js` dans les imports même si le fichier est `.ts` (le compilateur la réécrit).",
        ],
      },
    ],
  },
  {
    id: "json-modules",
    title: "Importer du JSON (et autres)",
    level: 3,
    intro:
      "Au-delà du JS : JSON, CSS, assets.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "JSON modules",
        code: `// Navigateurs modernes + Node 22+ (import attributes)\nimport donnees from "./data.json" with { type: "json" };\n\n// Node historique : createRequire ou fs + JSON.parse\n// Bundlers : import JSON direct, souvent sans attribut`,
      },
      {
        kind: "list",
        items: [
          "`with { type: \"json\" }` (import attributes) : la forme standard, sécurisée (le moteur vérifie le type MIME).",
          "Bundlers : `import image from \"./logo.png\"` → URL du fichier émis ; `import styles from \"./x.module.css\"` → objet de classes (CSS Modules).",
          "Ne jamais importer de JSON contenant des secrets côté client : il part dans le bundle public.",
        ],
      },
    ],
  },
  {
    id: "workers-modules",
    title: "Modules dans les Workers",
    level: 3,
    intro:
      "ESM dans les Web Workers et Service Workers.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Worker en module",
        code: `// Création : type: "module" autorise import/export dans le worker\nconst worker = new Worker(new URL("./calcul.worker.js", import.meta.url), {\n  type: "module",\n});\n\n// calcul.worker.js\nimport { calculer } from "./moteur.js";\nself.onmessage = (e) => {\n  self.postMessage(calculer(e.data));\n};`,
      },
      {
        kind: "text",
        text: "`new URL(\"./x.js\", import.meta.url)` : le pattern standard pour référencer un fichier relativement au module courant — fonctionne en dev comme en build (le bundler réécrit l'URL).",
      },
    ],
  },
  {
    id: "singleton-pattern",
    title: "Pattern : le singleton de module",
    level: 3,
    intro:
      "L'instance partagée grâce au cache des modules.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "store.js",
        code: `// Un module n'est évalué qu'UNE fois : son état est partagé\n// par tous les importateurs → singleton naturel.\nlet utilisateur = null;\n\n export async function connecter(identifiants) {\n  const r = await fetch("/api/login", { method: "POST", body: JSON.stringify(identifiants) });\n  utilisateur = await r.json();\n  return utilisateur;\n}\n\nexport function utilisateurCourant() {\n  return utilisateur;\n}\n\nexport function deconnecter() {\n  utilisateur = null;\n}`,
      },
      {
        kind: "text",
        text: "Le cache des modules fait du singleton le pattern le plus simple : pas de classe, pas de `getInstance()`. Limite : état global déguisé — à réserver aux vrais singletons (session, config, bus d'événements), pas à l'état métier.",
      },
    ],
  },
  {
    id: "versioning-semver",
    title: "SemVer : lire les versions",
    level: 3,
    intro:
      "Comprendre `^1.2.3` dans package.json.",
    blocks: [
      {
        kind: "table",
        headers: ["Plage", "Autorise", "Exemple"],
        rows: [
          ["`1.2.3` (exact)", "Cette version uniquement", "Reproductibilité maximale"],
          ["`^1.2.3`", "`1.x.x` (pas `2.0.0`)", "Le défaut npm : mineurs + patchs"],
          ["`~1.2.3`", "`1.2.x` uniquement", "Patchs seulement"],
          ["`*` / `latest`", "Tout", "À éviter : non déterministe"],
        ],
      },
      {
        kind: "list",
        items: [
          "SemVer : MAJEUR (ruptures) . MINEUR (nouveautés compatibles) . PATCH (correctifs).",
          "`package-lock.json` fige l'arbre exact : `npm ci` l'installe tel quel (CI, production).",
          "Mettre à jour : `npm update` (dans les plages) ou `npm install pkg@2` (changement majeur, à tester).",
        ],
      },
    ],
  },
  {
    id: "testing-modules",
    title: "Tester les modules",
    level: 3,
    intro:
      "Isoler un module de ses dépendances.",
    blocks: [
      {
        kind: "list",
        items: [
          "Modules purs (fonctions sans effets) : tests directs, aucun mock nécessaire — c'est l'argument n°1 pour la découpe en modules.",
          "Mocker un module : `vi.mock(\"./api.js\")` (Vitest) ou `jest.mock` — remplace les exports pour le test.",
          "Imports dynamiques : injectez la dépendance en paramètre plutôt que d'importer en dur — le module devient testable sans mock.",
          "E2E des cycles : un test d'import du point d'entrée détecte les cycles qui explosent à l'évaluation.",
        ],
      },
    ],
  },
  {
    id: "debugging-modules",
    title: "Déboguer les modules",
    level: 3,
    intro:
      "Quand l'import ne fait pas ce qu'on attend.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire l'erreur exacte",
            detail:
              "Le message dit tout : nom de l'export manquant, spécificateur non résolu, `require` dans de l'ESM. La table des erreurs courantes (niveau 2) couvre 90 % des cas.",
          },
          {
            title: "Vérifier le graphe",
            detail:
              "L'onglet Network / Sources des DevTools montre quels fichiers sont chargés et dans quel ordre. Un module absent du graphe = import non résolu ou tree-shaké.",
          },
          {
            title: "Tracer les cycles",
            detail:
              "Valeur `undefined` à l'import : suspectez un cycle. L'avertissement du bundler ou `madge --circular src/` le confirme.",
          },
          {
            title: "Isoler",
            detail:
              "Importez le module suspect seul dans un script minimal : s'il fonctionne isolé, le problème est dans le graphe, pas dans le module.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-subtiles-modules",
    title: "Erreurs subtiles de niveau avancé",
    level: 3,
    intro:
      "Les pièges qui persistent après des mois de pratique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Double instance : le même paquet chargé en CJS ET en ESM (dual package mal configuré) → deux états, bugs fantômes.",
          "`import` d'un JSON sans attribut `with` : fonctionne en bundler, échoue en natif — incohérence dev/prod.",
          "Barrel qui ré-exporte tout : un import anodin embarque la librairie entière si le tree shaking échoue.",
          "Ordre des effets de bord : deux modules qui s'initialisent mutuellement — l'ordre d'évaluation décide du résultat.",
          "`npm install` qui « ne change rien » : le lockfile fige — `npm update` ou suppression ciblée du lock pour forcer.",
          "Extension `.js` oubliée dans un import TS/Node ESM : marche en bundler, casse en Node natif.",
        ],
      },
    ],
  },
  {
    id: "projet-librairie",
    title: "Projet : publier une mini-librairie",
    level: 3,
    intro:
      "Le projet de synthèse : un paquet npm complet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Code",
            detail:
              "3-4 utilitaires purs en ESM, `index.js` barrel, JSDoc ou TypeScript pour les types.",
          },
          {
            title: "Packaging",
            detail:
              "`package.json` : `exports`, `types`, `sideEffects: false`, `files` (ce qui part sur npm). Build dual ESM/CJS si besoin.",
          },
          {
            title: "Test local",
            detail:
              "`npm pack` puis installation de l'archive dans un projet test : vérifiez les imports nommés ET le default.",
          },
          {
            title: "Publication",
            detail:
              "`npm publish --dry-run` d'abord, puis publication (ou registre privé). Versionnez en SemVer dès le début.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-modules",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par les sources officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "MDN — Modules JavaScript", value: "developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules : le guide de référence ESM." },
          { label: "Node.js — Modules ESM", value: "nodejs.org/api/esm.html : la documentation officielle des modules Node." },
          { label: "npm Docs", value: "docs.npmjs.com : package.json, semver, CLI." },
        ],
      },
      {
        kind: "list",
        items: [
          "Spécification : le chapitre modules de javascript.info, rigoureux sur les subtilités.",
          "Pratique : publiez un paquet « bac à sable » en version 0.x pour comprendre le cycle publish/install.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite-modules",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les modules maîtrisés, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Outillage : `vite` / `bundlers` pour le build, les alias et le HMR.",
          "Backend : `nodejs` pour les modules natifs, les CLI et les APIs.",
          "Qualité : `testing` (tests unitaires des modules purs) et `typescript` (types des APIs).",
          "Architecture : `design-patterns` et l'organisation des grandes bases de code.",
          "Revenir à la roadmap : valider JS Modules et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "env-config-pattern",
    title: "Pattern : configuration par environnement",
    level: 3,
    intro:
      "Centraliser les variables d'environnement.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "config.js",
        code: `// Un seul module lit l'environnement ; le reste importe config.
// Vite : import.meta.env | Node : process.env
const env = typeof import.meta !== "undefined" && import.meta.env
  ? import.meta.env
  : process.env;

function requis(nom) {
  const valeur = env[nom];
  if (!valeur) throw new Error("Variable manquante : " + nom);
  return valeur;
}

export const config = {
  apiUrl: env.VITE_API_URL ?? "http://localhost:3000",
  sentryDsn: env.SENTRY_DSN ?? null,
  estProd: (env.MODE ?? env.NODE_ENV) === "production",
};

// Pour les variables critiques : requis("SENTRY_DSN")`,
      },
      {
        kind: "list",
        items: [
          "Un seul point de lecture : valeurs par défaut, validation et noms documentés au même endroit.",
          "Échec rapide : une variable critique manquante doit faire échouer le démarrage, pas produire un bug à 3h du matin.",
          "Jamais de secret dans le bundle client : les `VITE_*` partent dans le JS public — les clés serveur restent côté serveur.",
        ],
      },
    ],
  },
];

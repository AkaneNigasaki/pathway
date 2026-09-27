import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de TypeScript : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_TYPESCRIPT: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est TypeScript, pourquoi il existe et quelle est sa relation avec JavaScript.",
    blocks: [
      {
        kind: "text",
        text: "TypeScript est un langage basé sur JavaScript qui ajoute notamment un système de typage statique permettant de détecter certaines erreurs avant l'exécution du programme. Le code TypeScript est ensuite compilé vers du JavaScript classique, exécutable partout où JavaScript s'exécute.",
      },
      {
        kind: "text",
        text: "Pourquoi TypeScript existe : JavaScript est un langage à typage dynamique — une variable peut contenir n'importe quoi, et une erreur de type n'apparaît qu'à l'exécution, parfois en production. Sur un petit script, c'est gérable. Sur une application de plusieurs dizaines de milliers de lignes maintenue par une équipe, ces erreurs deviennent coûteuses. TypeScript ajoute des annotations de types que le compilateur vérifie : beaucoup d'erreurs sont détectées pendant l'écriture du code, dans l'éditeur, avant même de lancer le programme.",
      },
      {
        kind: "text",
        text: "Relation avec JavaScript : TypeScript est un sur-ensemble de JavaScript. Tout code JavaScript valide est (en principe) du TypeScript valide. Apprendre TypeScript, c'est donc apprendre JavaScript plus un système de types, pas un langage totalement différent.",
      },
    ],
  },
  {
    id: "typescript-pas-un-runtime",
    title: "TypeScript n'est pas un runtime",
    level: 1,
    intro:
      "Le point le plus mal compris par les débutants : TypeScript ne s'exécute jamais directement.",
    blocks: [
      {
        kind: "diagram",
        title: "Le rôle de TypeScript dans la chaîne de développement",
        lines: [
          "JavaScript",
          "     │",
          "     ▼",
          "TypeScript",
          "     │",
          "     ├── Static typing (typage statique)",
          "     ├── Tooling (outillage)",
          "     ├── Editor intelligence (autocomplétion, navigation)",
          "     └── Compile-time checking (vérification à la compilation)",
          "     │",
          "     ▼",
          "JavaScript (le seul code qui s'exécute)",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : vous écrivez du `.ts`, le compilateur `tsc` vérifie les types puis produit du `.js`. Ce JavaScript généré s'exécute ensuite dans un navigateur, Node.js, Deno ou Bun. Les types n'existent qu'au moment de la compilation : ils sont effacés du code final et n'ont aucun coût à l'exécution — mais n'apportent non plus aucune protection à l'exécution.",
      },
      {
        kind: "list",
        items: [
          "TypeScript = un langage + un compilateur/vérificateur, pas un environnement d'exécution.",
          "Le navigateur ne comprend pas le TypeScript : il faut toujours compiler vers JavaScript.",
          "Les outils comme Deno ou Bun exécutent du `.ts` en compilant à la volée — le principe reste le même : du JavaScript s'exécute.",
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
      "Avant d'apprendre TypeScript, il faut des bases solides en JavaScript. Voici exactement ce qu'il faut maîtriser, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "JavaScript — ce qu'il faut savoir",
        fields: [
          {
            label: "Variables (`let`, `const`)",
            value:
              "Déclarer des variables, comprendre la portée (scope), la différence entre `let` et `const`. TypeScript type justement le contenu de ces variables.",
          },
          {
            label: "Fonctions",
            value:
              "Paramètres, valeur de retour, portée, fonctions fléchées (`=>`), callbacks. En TypeScript, vous annoterez les paramètres et le retour : sans ces bases, les annotations n'ont pas de sens.",
          },
          {
            label: "Objets",
            value:
              "Créer des objets littéraux, accéder aux propriétés, comprendre les références. Les `interfaces` TypeScript décrivent la forme de ces objets.",
          },
          {
            label: "Tableaux",
            value:
              "Créer et manipuler des tableaux (`map`, `filter`, `find`). TypeScript ajoute le typage des éléments (`string[]`, `number[]`).",
          },
          {
            label: "Classes",
            value:
              "Constructeurs, méthodes, héritage de base. TypeScript ajoute les modificateurs d'accès (`private`, `public`) et le typage des propriétés.",
          },
          {
            label: "Modules (`import` / `export`)",
            value:
              "Importer et exporter entre fichiers. La configuration des modules (`module`, `moduleResolution` dans `tsconfig.json`) est une source fréquente d'erreurs en TypeScript.",
          },
          {
            label: "Async / Promises",
            value:
              "`async`/`await`, chaînage de promesses. En TypeScript, une fonction `async` retourne `Promise<T>` : il faut comprendre les promesses pour typer correctement.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap : si un point est fragile, apprenez-le d'abord en JavaScript, puis revenez ici. TypeScript ne pardonne pas les bases approximatives — le compilateur vous le rappellera.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer TypeScript dans un projet, en comprenant ce que fait chaque commande.",
    blocks: [
      {
        kind: "command",
        label: "Installer TypeScript localement dans le projet",
        command: "npm install --save-dev typescript",
        why: "Installe TypeScript comme dépendance de développement (`devDependencies`) : il n'est utile qu'au moment du développement et de la compilation, jamais dans le code qui s'exécute en production. L'installation locale lie la version de TypeScript au projet — chaque projet peut ainsi utiliser sa propre version.",
        verify: "npx tsc --version",
      },
      {
        kind: "command",
        label: "Créer le fichier de configuration du compilateur",
        command: "npx tsc --init",
        why: "Génère un fichier `tsconfig.json` avec les options du compilateur commentées. Ce fichier définit comment `tsc` compile votre projet : quels fichiers inclure, vers quel JavaScript cibler, et surtout si le mode strict est activé. Sans lui, `tsc` utilise des valeurs par défaut peu adaptées à un vrai projet.",
        verify: "ls tsconfig.json",
      },
      {
        kind: "text",
        text: "`npx` exécute la version locale du paquet installé dans le projet (ici `tsc`, le compilateur TypeScript). Si TypeScript n'est pas installé localement, `npx` le télécharge temporairement — pratique pour un essai, mais pas pour un projet suivi.",
      },
    ],
  },
  {
    id: "global-vs-local",
    title: "Installation globale vs locale",
    level: 2,
    intro:
      "Deux façons d'installer TypeScript, avec des conséquences très différentes pour vos projets.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Globale (`npm install -g typescript`)", "Locale (`npm install -D typescript`)"],
        rows: [
          ["Où", "Une seule copie sur la machine", "Une copie par projet, dans `node_modules/`"],
          ["Version", "La même pour tous les projets", "Chaque projet choisit la sienne"],
          ["Reproductibilité", "Fragile : deux développeurs peuvent avoir deux versions", "Fiable : la version est dans `package.json`"],
          ["CI / équipe", "Chacun doit l'installer à la main", "Installée automatiquement avec `npm install`"],
        ],
      },
      {
        kind: "text",
        text: "Pourquoi la locale est préférable : un projet doit compiler de la même façon sur toutes les machines. Avec une installation locale, la version de TypeScript est verrouillée dans `package.json` / `package-lock.json` et installée avec le reste des dépendances. L'installation globale reste utile pour un usage ponctuel en ligne de commande, jamais comme base d'un projet d'équipe.",
      },
      {
        kind: "diagram",
        title: "Arborescence d'un projet TypeScript minimal",
        lines: [
          "project/",
          "├── node_modules/      (dépendances installées, dont typescript)",
          "├── src/",
          "│   └── index.ts       (votre code)",
          "├── package.json       (dépendances + scripts)",
          "├── package-lock.json  (versions exactes verrouillées)",
          "└── tsconfig.json      (configuration du compilateur)",
        ],
      },
    ],
  },
  {
    id: "package-managers",
    title: "Gestionnaires de paquets",
    level: 2,
    intro:
      "npm n'est pas le seul gestionnaire de paquets. Voici les quatre principaux, présentés factuellement.",
    blocks: [
      {
        kind: "table",
        headers: ["", "npm", "pnpm", "yarn", "bun"],
        rows: [
          ["Rôle", "Gestionnaire historique de Node.js, livré avec", "Alternative rapide, économie d'espace disque", "Pionnier des lockfiles et workspaces", "Gestionnaire intégré au runtime Bun"],
          ["Installation", "Livré avec Node.js", "`npm install -g pnpm`", "`npm install -g yarn` ou via corepack", "Livré avec Bun"],
          ["Installer les dépendances", "`npm install`", "`pnpm install`", "`yarn install`", "`bun install`"],
          ["Lockfile", "`package-lock.json`", "`pnpm-lock.yaml`", "`yarn.lock`", "`bun.lock`"],
          ["Particularité", "Référence universelle, documentation la plus abondante", "`node_modules` non aplati + store partagé : installations rapides, pas de dépendances fantômes", "Écosystème mature, Berry (v2+) très strict", "Le plus rapide à l'installation, lié au runtime Bun"],
        ],
      },
      {
        kind: "text",
        text: "Différences factuelles à connaître : `pnpm` utilise des liens symboliques vers un magasin partagé, ce qui évite de dupliquer les paquets entre projets et empêche d'importer une dépendance non déclarée. `yarn` a introduit les lockfiles et les workspaces. `bun` est le plus rapide mais impose le runtime Bun. Aucun n'est universellement supérieur : le choix dépend du projet, de l'équipe et des contraintes (CI, monorepo, compatibilité).",
      },
      {
        kind: "text",
        text: "Point commun essentiel : quel que soit l'outil, le lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lock`) doit être versionné avec Git. C'est lui qui garantit que tous les développeurs installent exactement les mêmes versions.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet",
    level: 2,
    intro:
      "Créer un projet TypeScript de zéro, écrire du code typé, le compiler et comprendre chaque étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le dossier et l'initialiser",
            detail:
              "`mkdir typescript-demo` crée le dossier, `cd typescript-demo` s'y déplace, `npm init -y` génère un `package.json` avec les valeurs par défaut (le `-y` évite le questionnaire interactif).",
          },
          {
            title: "Installer TypeScript en dépendance de développement",
            detail:
              "`npm install -D typescript` (`-D` = `--save-dev`) installe le compilateur localement. Il servira uniquement à vérifier et compiler : il ne fera jamais partie du code exécuté.",
          },
          {
            title: "Initialiser la configuration",
            detail:
              "`npx tsc --init` crée le `tsconfig.json`. Ouvrez-le : activez au minimum `\"strict\": true` pour profiter réellement du typage.",
          },
          {
            title: "Créer le premier fichier",
            detail:
              "Créez `src/index.ts` contenant `const message: string = \"Hello TypeScript\";` suivi de `console.log(message);`. L'annotation `: string` déclare que `message` est une chaîne — le compilateur refusera d'y affecter un nombre.",
          },
          {
            title: "Compiler",
            detail:
              "`npx tsc` lit le `tsconfig.json`, vérifie les types puis émet le JavaScript compilé (par défaut à côté des sources, ou dans `outDir` si configuré). S'il y a une erreur de type, rien n'est émis (avec `noEmitOnError`) et l'erreur est affichée.",
          },
          {
            title: "Exécuter le résultat",
            detail:
              "Lancez le fichier `.js` généré avec `node` : c'est du JavaScript ordinaire qui s'exécute. Retenez le schéma : le `.ts` ne s'exécute jamais directement.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "Ce qui se passe lors de la compilation",
        lines: [
          "src/index.ts",
          "     │",
          "     ▼",
          "TypeScript Compiler (tsc)",
          "  1. vérifie les types (erreurs affichées ici)",
          "  2. efface les annotations de types",
          "  3. émet du JavaScript",
          "     │",
          "     ▼",
          "JavaScript (.js) → exécuté par Node.js ou le navigateur",
        ],
      },
      {
        kind: "code",
        language: "typescript",
        title: "src/index.ts",
        code: `const message: string = "Hello TypeScript";\n\nconsole.log(message);`,
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Travailler avec TypeScript ne se résume pas au langage : c'est toute une chaîne d'outils à comprendre.",
    blocks: [
      {
        kind: "diagram",
        title: "La chaîne complète, de bas en haut",
        lines: [
          "Operating System (Windows, macOS, Linux)",
          "      ↓",
          "Terminal (le shell : exécuter des commandes)",
          "      ↓",
          "Node.js (exécute le JavaScript produit)",
          "      ↓",
          "Package Manager (npm, pnpm, yarn, bun : dépendances)",
          "      ↓",
          "Editor / IDE (écrire le code)",
          "      ↓",
          "TypeScript (vérification + compilation)",
          "      ↓",
          "Linter — ESLint (qualité du code)",
          "      ↓",
          "Formatter — Prettier ou Biome (mise en forme)",
          "      ↓",
          "Tests — Vitest ou Jest (le code fait-il ce qu'il doit ?)",
          "      ↓",
          "Git (historique et collaboration)",
        ],
      },
      {
        kind: "text",
        text: "Chaque couche a un rôle distinct : le terminal exécute les commandes, Node.js exécute le JavaScript compilé, le gestionnaire de paquets installe les dépendances, l'éditeur écrit le code avec l'aide du serveur de langage TypeScript, le linter signale les problèmes de qualité, le formateur uniformise le style, les tests valident le comportement, Git garde l'historique. Confondre ces rôles (par exemple attendre du linter qu'il vérifie les types) est une source classique de confusion.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et environnements",
    level: 2,
    intro:
      "Plusieurs profils d'éditeurs, sans classement artificiel : chacun a ses forces et son public.",
    blocks: [
      {
        kind: "fields",
        title: "VS Code",
        fields: [
          { label: "Type", value: "Éditeur extensible (gratuit, open source)" },
          { label: "Platform", value: "Windows, macOS, Linux" },
          { label: "Language support", value: "TypeScript intégré nativement" },
          { label: "LSP", value: "Oui, serveur TypeScript intégré" },
          { label: "Debugger", value: "Oui, intégré avec points d'arrêt" },
          { label: "Git", value: "Oui, intégré" },
          { label: "Extensions", value: "Écosystème immense (ESLint, Prettier via extensions)" },
          { label: "Performance", value: "Bonne pour la plupart des projets" },
          { label: "Learning curve", value: "Faible" },
          { label: "Best suited for", value: "La majorité des développeurs TypeScript, du débutant au professionnel" },
        ],
      },
      {
        kind: "fields",
        title: "WebStorm",
        fields: [
          { label: "Type", value: "IDE complet (payant, JetBrains)" },
          { label: "Platform", value: "Windows, macOS, Linux" },
          { label: "Language support", value: "JavaScript/TypeScript de premier ordre, frontend et backend" },
          { label: "LSP", value: "Moteur propriétaire intégré" },
          { label: "Debugger", value: "Oui, avancé (Node.js, navigateur)" },
          { label: "Git", value: "Oui, intégré et riche" },
          { label: "Extensions", value: "Plugins JetBrains, moins nombreux que VS Code" },
          { label: "Performance", value: "Plus gourmand en mémoire, indexation puissante" },
          { label: "Learning curve", value: "Moyenne" },
          { label: "Best suited for", value: "Développeurs qui veulent un IDE tout-en-un avec refactoring et navigation avancés" },
        ],
      },
      {
        kind: "fields",
        title: "Zed",
        fields: [
          { label: "Type", value: "Éditeur moderne (gratuit, open source)" },
          { label: "Platform", value: "macOS, Linux (Windows en cours)" },
          { label: "Language support", value: "Via LSP, dont TypeScript" },
          { label: "LSP", value: "Oui, support LSP natif" },
          { label: "Debugger", value: "En développement" },
          { label: "Git", value: "Oui, intégré" },
          { label: "Extensions", value: "Écosystème jeune, en croissance" },
          { label: "Performance", value: "Excellente, écrit en Rust" },
          { label: "Learning curve", value: "Faible" },
          { label: "Best suited for", value: "Développeurs cherchant vitesse et collaboration en temps réel" },
        ],
      },
      {
        kind: "fields",
        title: "Neovim",
        fields: [
          { label: "Type", value: "Éditeur modal dans le terminal (gratuit, open source)" },
          { label: "Platform", value: "Windows, macOS, Linux" },
          { label: "Language support", value: "Via LSP (`typescript-language-server` ou `vtsls`)" },
          { label: "LSP", value: "Oui, client LSP natif à configurer" },
          { label: "Debugger", value: "Via plugins (nvim-dap)" },
          { label: "Git", value: "Via plugins (ou terminal)" },
          { label: "Extensions", value: "Plugins Lua très riches, configuration manuelle" },
          { label: "Performance", value: "Excellente, très léger" },
          { label: "Learning curve", value: "Élevée (édition modale + configuration)" },
          { label: "Best suited for", value: "Développeurs voulant un contrôle total et une vitesse d'édition maximale" },
        ],
      },
      {
        kind: "fields",
        title: "Vim",
        fields: [
          { label: "Type", value: "Éditeur modal classique (gratuit)" },
          { label: "Platform", value: "Partout, souvent préinstallé" },
          { label: "Language support", value: "Coloration syntaxique ; TypeScript via plugins" },
          { label: "LSP", value: "Via plugins uniquement" },
          { label: "Debugger", value: "Limité, via plugins" },
          { label: "Git", value: "Via plugins (ou terminal)" },
          { label: "Extensions", value: "Écosystème de plugins historique" },
          { label: "Performance", value: "Excellente" },
          { label: "Learning curve", value: "Élevée" },
          { label: "Best suited for", value: "Édition rapide sur serveurs et environnements distants" },
        ],
      },
      {
        kind: "fields",
        title: "Sublime Text",
        fields: [
          { label: "Type", value: "Éditeur rapide (licence payante, essai libre)" },
          { label: "Platform", value: "Windows, macOS, Linux" },
          { label: "Language support", value: "Via paquets, dont TypeScript" },
          { label: "LSP", value: "Via le paquet LSP" },
          { label: "Debugger", value: "Basique, via paquets" },
          { label: "Git", value: "Via paquets (ou terminal)" },
          { label: "Extensions", value: "Paquets via Package Control" },
          { label: "Performance", value: "Excellente" },
          { label: "Learning curve", value: "Faible" },
          { label: "Best suited for", value: "Édition légère et rapide de fichiers" },
        ],
      },
      {
        kind: "fields",
        title: "Emacs",
        fields: [
          { label: "Type", value: "Éditeur programmable historique (gratuit, open source)" },
          { label: "Platform", value: "Windows, macOS, Linux" },
          { label: "Language support", value: "Via `tide` ou LSP (`eglot`, `lsp-mode`)" },
          { label: "LSP", value: "Oui, via eglot ou lsp-mode" },
          { label: "Debugger", value: "Via paquets" },
          { label: "Git", value: "Oui, Magit (référence)" },
          { label: "Extensions", value: "Écosystème immense et ancien" },
          { label: "Performance", value: "Bonne" },
          { label: "Learning curve", value: "Élevée" },
          { label: "Best suited for", value: "Développeurs voulant un environnement entièrement programmable" },
        ],
      },
      {
        kind: "fields",
        title: "Visual Studio",
        fields: [
          { label: "Type", value: "IDE complet Microsoft (édition Community gratuite)" },
          { label: "Platform", value: "Windows (et macOS historiquement)" },
          { label: "Language support", value: "Excellent pour C# et .NET, correct pour TypeScript" },
          { label: "LSP", value: "Oui, intégré" },
          { label: "Debugger", value: "Oui, très avancé" },
          { label: "Git", value: "Oui, intégré" },
          { label: "Extensions", value: "Marketplace Visual Studio" },
          { label: "Performance", value: "Gourmand, adapté aux grosses solutions" },
          { label: "Learning curve", value: "Moyenne" },
          { label: "Best suited for", value: "Équipes .NET utilisant aussi TypeScript (ex. ASP.NET + frontend)" },
        ],
      },
    ],
  },
  {
    id: "configuration-vscode",
    title: "TypeScript + VS Code",
    level: 2,
    intro:
      "Configurer VS Code pour TypeScript en comprenant les concepts, pas en copiant des réglages.",
    blocks: [
      {
        kind: "list",
        items: [
          "Installez VS Code puis ouvrez le dossier du projet : VS Code détecte automatiquement le `tsconfig.json`.",
          "Le service de langage TypeScript intégré analyse votre code en continu : erreurs soulignées, autocomplétion, navigation vers les définitions. C'est le même moteur que `tsc`, mais en temps réel.",
          "Le terminal intégré (`Ctrl+`` `) exécute `npx tsc --watch` pour recompiler à chaque sauvegarde pendant le développement.",
          "Le débogage utilise les source maps (voir section Debugging) : vous posez des points d'arrêt dans le `.ts`, VS Code les relie au `.js` exécuté.",
          "Le formatage à la sauvegarde se configure avec l'extension Prettier ; le linting avec l'extension ESLint. Ce sont deux extensions distinctes aux rôles distincts.",
        ],
      },
      {
        kind: "text",
        text: "Extensions utiles uniquement si elles apportent quelque chose : `ESLint` (signale les problèmes de qualité), `Prettier` (formate le code), et éventuellement `Error Lens` (affiche les erreurs en ligne). N'installez pas d'extension « TypeScript » tierce : le support est déjà intégré.",
      },
    ],
  },
  {
    id: "configuration-webstorm",
    title: "TypeScript + WebStorm",
    level: 2,
    intro:
      "WebStorm intègre presque tout nativement : la configuration consiste surtout à vérifier que l'IDE utilise les bons outils du projet.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ouvrez le projet : WebStorm détecte `package.json` et propose d'exécuter le gestionnaire de paquets.",
          "Interpréteur Node : vérifiez dans les réglages que WebStorm utilise la version de Node du projet (via `nvm` ou le binaire système choisi).",
          "TypeScript : WebStorm peut utiliser sa version intégrée ou celle du projet — préférez toujours celle du projet (`node_modules/typescript`) pour compiler comme la CI.",
          "Gestionnaire de paquets : indiquez npm, pnpm, yarn ou bun selon le lockfile présent.",
          "Inspections : WebStorm signale en temps réel les problèmes (types, imports inutilisés) ; le débogage Node.js et navigateur est intégré sans extension.",
          "Refactoring (renommer, extraire) et navigation (aller à la définition, trouver les usages) sont les points forts : utilisez-les au lieu d'éditer à la main.",
          "Git est intégré avec une vue des changements, l'historique et la résolution de conflits.",
        ],
      },
    ],
  },
  {
    id: "configuration-neovim",
    title: "TypeScript + Neovim",
    level: 2,
    intro:
      "Avec Neovim, on assemble soi-même la chaîne : comprendre chaque concept vaut mieux que copier une configuration Lua.",
    blocks: [
      {
        kind: "list",
        items: [
          "LSP (Language Server Protocol) : un protocole standard par lequel l'éditeur dialogue avec un serveur de langage. Pour TypeScript : `typescript-language-server` ou `vtsls`.",
          "Le serveur de langage fournit : complétion, diagnostics (erreurs), aller à la définition, renommer un symbole, lister les références — les mêmes fonctions qu'un IDE, via le protocole LSP.",
          "Completion : un plugin de complétion (ex. `nvim-cmp` ou le système natif) affiche les suggestions du serveur pendant la frappe.",
          "Diagnostics : les erreurs de types apparaissent en ligne et dans la liste des diagnostics ; ce sont les mêmes erreurs que `tsc` signalerait.",
          "Formatting : le formatage peut passer par le serveur TypeScript ou un formateur externe (Prettier) déclenché à la sauvegarde.",
          "Go to definition / Rename / References : trois opérations LSP fondamentales pour naviguer dans le code — apprenez leurs raccourcis avant tout le reste.",
        ],
      },
      {
        kind: "text",
        text: "La configuration Neovim demande du temps, mais chaque brique comprise (LSP, complétion, diagnostics, formatage) est réutilisable pour tous les autres langages.",
      },
    ],
  },
  {
    id: "cli-typescript",
    title: "La CLI TypeScript",
    level: 2,
    intro:
      "Les commandes du compilateur `tsc`, avec pour chacune son rôle et quand l'utiliser.",
    blocks: [
      {
        kind: "fields",
        title: "Commandes principales",
        fields: [
          {
            label: "Command — `tsc`",
            value: "Purpose : compile le projet selon `tsconfig.json`. Example : `npx tsc`. When : pour produire le JavaScript final ou vérifier tout le projet.",
          },
          {
            label: "Command — `tsc --init`",
            value: "Purpose : génère un `tsconfig.json` commenté. Example : `npx tsc --init`. When : une seule fois, à la création du projet.",
          },
          {
            label: "Command — `tsc --watch`",
            value: "Purpose : recompile automatiquement à chaque modification de fichier. Example : `npx tsc --watch`. When : pendant le développement, dans un terminal dédié.",
          },
          {
            label: "Command — `tsc --noEmit`",
            value: "Purpose : vérifie les types sans produire de fichiers. Example : `npx tsc --noEmit`. When : dans la CI ou comme script `typecheck`, quand un autre outil (bundler) produit le JavaScript.",
          },
          {
            label: "Command — `tsc --project`",
            value: "Purpose : compile en pointant vers un `tsconfig` précis. Example : `npx tsc --project tsconfig.build.json`. When : projets avec plusieurs configurations (dev, build, tests).",
          },
          {
            label: "Command — `tsc --version`",
            value: "Purpose : affiche la version du compilateur utilisé. Example : `npx tsc --version`. When : pour vérifier que c'est bien la version locale du projet qui est utilisée.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Comment travaillent les professionnels",
    level: 2,
    intro:
      "Le flux de développement typique d'une équipe TypeScript, de la branche au déploiement.",
    blocks: [
      {
        kind: "diagram",
        title: "Development workflow",
        lines: [
          "Create branch (git switch -c ma-fonctionnalite)",
          "     ↓",
          "Install dependencies (npm install)",
          "     ↓",
          "Write code (éditeur + vérification en temps réel)",
          "     ↓",
          "Type check (npx tsc --noEmit)",
          "     ↓",
          "Lint (npx eslint .)",
          "     ↓",
          "Test (npm test)",
          "     ↓",
          "Commit (git commit)",
          "     ↓",
          "Pull Request",
          "     ↓",
          "CI : Install → Type check → Lint → Test → Build",
          "     ↓",
          "Review (relecture par un pair)",
          "     ↓",
          "Merge",
          "     ↓",
          "Deploy",
        ],
      },
      {
        kind: "text",
        text: "Chaque étape a un rôle : la vérification des types attrape les erreurs de typage, le lint les problèmes de qualité, les tests les régressions de comportement, la CI rejoue tout cela automatiquement à chaque pull request pour que rien ne dépende de la machine d'un développeur. La revue par un pair reste irremplaçable pour la lisibilité et les choix de conception.",
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Quatre projets de difficulté croissante pour passer de la théorie à la pratique professionnelle.",
    blocks: [
      {
        kind: "fields",
        title: "Beginner — Utilitaire en ligne de commande",
        fields: [
          { label: "Skills required", value: "Types de base, fonctions, modules, `tsc`, Node.js" },
          { label: "What you build", value: "Un petit outil CLI (ex. renommer des fichiers en masse, convertir un CSV en JSON)" },
          { label: "What you learn", value: "Configurer un projet, compiler, lire les arguments, manipuler des fichiers" },
          { label: "Expected difficulty", value: "Faible — quelques heures" },
          { label: "Next project", value: "Client d'API" },
        ],
      },
      {
        kind: "fields",
        title: "Intermediate — Client d'API typé",
        fields: [
          { label: "Skills required", value: "Interfaces, generics de base, async/await, `fetch`" },
          { label: "What you build", value: "Un client typé pour une API publique (ex. affichage de données météo ou de dépôts GitHub)" },
          { label: "What you learn", value: "Typer des réponses JSON, gérer les erreurs, séparer le code en modules" },
          { label: "Expected difficulty", value: "Moyenne — quelques jours" },
          { label: "Next project", value: "Bibliothèque npm" },
        ],
      },
      {
        kind: "fields",
        title: "Advanced — Bibliothèque publiée sur npm",
        fields: [
          { label: "Skills required", value: "Generics, `declaration: true`, tests, documentation" },
          { label: "What you build", value: "Une petite bibliothèque réutilisable publiée sur npm (ex. utilitaires de validation)" },
          { label: "What you learn", value: "Concevoir une API publique typée, générer les fichiers `.d.ts`, tester avec Vitest, versionner" },
          { label: "Expected difficulty", value: "Élevée — une à deux semaines" },
          { label: "Next project", value: "Application complète" },
        ],
      },
      {
        kind: "fields",
        title: "Professional — Application complète",
        fields: [
          { label: "Skills required", value: "Tout le programme : types avancés, framework, tests, CI/CD" },
          { label: "What you build", value: "Une application complète : React + TypeScript, API backend, base de données, tests, pipeline CI/CD" },
          { label: "What you learn", value: "Architecture, typage de bout en bout, qualité logicielle, déploiement" },
          { label: "Expected difficulty", value: "Professionnelle — plusieurs semaines" },
          { label: "Next project", value: "Contribuer à un projet open source TypeScript" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "tsconfig",
    title: "tsconfig.json en détail",
    level: 3,
    intro:
      "Le fichier `tsconfig.json` définit les options du compilateur et la racine du projet TypeScript. Le comprendre vraiment, option par option, plutôt que copier une configuration magique.",
    blocks: [
      {
        kind: "text",
        text: "Rôle du fichier : il indique à `tsc` quels fichiers font partie du projet (`include`, `exclude`, `files`), comment les compiler (cible JavaScript, système de modules) et avec quelle rigueur vérifier les types (`strict` et ses sous-options). La documentation officielle décrit précisément ce rôle : c'est le contrat entre votre code et le compilateur.",
      },
      {
        kind: "code",
        language: "json",
        title: "Exemple de tsconfig.json raisonnable",
        code: `{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext",\n    "strict": true,\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    "outDir": "dist",\n    "rootDir": "src",\n    "sourceMap": true,\n    "declaration": true,\n    "noEmitOnError": true\n  },\n  "include": ["src"],\n  "exclude": ["node_modules"]\n}`,
      },
      {
        kind: "fields",
        title: "Option par option",
        fields: [
          {
            label: "`target`",
            value:
              "What does it do ? Définit la version de JavaScript émise (ex. `ES2022`). Why use it ? Pour cibler les environnements d'exécution visés. What changes ? Un `target` bas transpile les fonctionnalités modernes (classes, async) vers du JS plus ancien ; un `target` haut émet un code plus proche de la source. When might it cause problems ? Un `target` trop bas gonfle le code généré ; trop haut, le code peut utiliser des API absentes des vieux navigateurs. À aligner aussi avec `lib`.",
          },
          {
            label: "`module`",
            value:
              "What does it do ? Définit le système de modules du code émis (`CommonJS`, `ESNext`, `NodeNext`…). Why use it ? Le format des `import`/`export` générés doit correspondre à l'environnement d'exécution. What changes ? `CommonJS` émet `require`/`module.exports`, les valeurs ES conservent `import`/`export`. When might it cause problems ? Un mauvais réglage produit l'erreur classique : du `import` dans un projet CommonJS, ou l'inverse.",
          },
          {
            label: "`moduleResolution`",
            value:
              "What does it do ? Définit l'algorithme de résolution des imports (comment `tsc` trouve le fichier correspondant à `'./utils'`). Why use it ? Il doit imiter le comportement réel de l'environnement (Node.js, bundler). What changes ? `NodeNext` suit les règles modernes de Node (exports de `package.json`, ESM strict). When might it cause problems ? Si la résolution du compilateur diffère de celle de Node, le code compile mais échoue à l'exécution — d'où l'importance de l'aligner avec `module`.",
          },
          {
            label: "`lib`",
            value:
              "What does it do ? Liste les bibliothèques de déclarations d'API disponibles (`DOM`, `ES2022`, `WebWorker`…). Why use it ? Pour déclarer quelles API globales existent (ex. `document` n'existe que si `DOM` est inclus). What changes ? Sans `DOM`, `document.querySelector` est une erreur de type. When might it cause problems ? Dans Node.js, inclure `DOM` par défaut masque des erreurs (utiliser `window` dans du code serveur).",
          },
          {
            label: "`outDir`",
            value:
              "What does it do ? Dossier de sortie du JavaScript compilé. Why use it ? Séparer les sources (`.ts`) du code généré (`.js`) garde le projet lisible. What changes ? Les `.js` vont dans `dist/` au lieu de polluer `src/`. When might it cause problems ? Oublier d'exclure `outDir` du versionnement ou des outils (linter) qui scanneraient du code généré.",
          },
          {
            label: "`rootDir`",
            value:
              "What does it do ? Dossier racine des sources ; sa structure est reproduite dans `outDir`. Why use it ? Garantit une sortie prévisible. What changes ? Sans lui, `tsc` calcule une racine commune qui peut produire une arborescence inattendue. When might it cause problems ? Erreur classique : `rootDir` mal défini quand des fichiers hors `src` sont inclus par accident.",
          },
          {
            label: "`sourceMap`",
            value:
              "What does it do ? Génère des fichiers `.js.map` reliant le JS compilé au TS source. Why use it ? Indispensable pour déboguer : le débogueur affiche le TypeScript d'origine. What changes ? Chaque `.js` est accompagné de sa carte. When might it cause problems ? En production, les source maps exposent le code source si elles sont déployées — à gérer consciemment.",
          },
          {
            label: "`declaration`",
            value:
              "What does it do ? Génère des fichiers `.d.ts` décrivant les types publics. Why use it ? Obligatoire pour publier une bibliothèque : les consommateurs ont besoin des types sans vos sources. What changes ? Chaque module émet son fichier de déclarations. When might it cause problems ? Ralentit la compilation ; inutile pour une application (non publiée).",
          },
          {
            label: "`noEmit`",
            value:
              "What does it do ? Vérifie les types sans écrire aucun fichier. Why use it ? Quand un autre outil produit le JavaScript (Vite, esbuild) et que `tsc` ne sert qu'à vérifier. What changes ? Rien n'est écrit sur disque. When might it cause problems ? Aucun — c'est le réglage standard des scripts `typecheck`.",
          },
          {
            label: "`noEmitOnError`",
            value:
              "What does it do ? Bloque l'émission si une erreur de type est détectée. Why use it ? Évite de produire du JavaScript à partir d'un code dont les types sont faux. What changes ? En cas d'erreur, aucun `.js` n'est généré. When might it cause problems ? En migration progressive d'un projet JS existant, peut bloquer le build sur des erreurs non critiques — à activer une fois le projet sain.",
          },
          {
            label: "`esModuleInterop`",
            value:
              "What does it do ? Permet d'importer par défaut des modules CommonJS (`import express from 'express'`). Why use it ? Sans lui, il faudrait `import * as express`, moins naturel. What changes ? Le code émis ajoute une interopérabilité à l'exécution. When might it cause problems ? Presque jamais : c'est le réglage recommandé dans la quasi-totalité des projets.",
          },
          {
            label: "`allowJs`",
            value:
              "What does it do ? Autorise `tsc` à traiter aussi les fichiers `.js`. Why use it ? Pour migrer progressivement un projet JavaScript vers TypeScript. What changes ? Les `.js` sont inclus dans la compilation. When might it cause problems ? Sans `checkJs`, ils sont compilés sans vérification — une fausse sécurité.",
          },
          {
            label: "`checkJs`",
            value:
              "What does it do ? Vérifie les types des fichiers `.js` (via inférence et annotations JSDoc). Why use it ? Pour bénéficier d'un contrôle pendant la migration, avant de renommer en `.ts`. What changes ? Les erreurs de types sont signalées aussi dans le JS. When might it cause problems ? Peut révéler beaucoup d'erreurs sur une base JS ancienne — à activer fichier par fichier via `// @ts-check`.",
          },
          {
            label: "`strict`",
            value:
              "What does it do ? Active l'ensemble des vérifications strictes (`strictNullChecks`, `noImplicitAny`, etc.). Why use it ? C'est ce qui fait de TypeScript un vrai garde-fou : sans `strict`, beaucoup d'erreurs passent inaperçues. What changes ? Le compilateur refuse les `null`/`undefined` non gérés, les `any` implicites, etc. When might it cause problems ? Sur du code existant non strict, l'activation révèle des dizaines d'erreurs — c'est normal, corrigez-les progressivement plutôt que de le désactiver.",
          },
          {
            label: "`strictNullChecks`",
            value:
              "What does it do ? `null` et `undefined` deviennent des types à part : une variable `string` ne peut pas valoir `null`. Why use it ? La majorité des erreurs d'exécution JS sont des `Cannot read properties of null`. What changes ? Il faut typer explicitement `string | null` et tester avant usage. When might it cause problems ? Code défensif plus verbeux au début — mais c'est précisément le but.",
          },
          {
            label: "`noImplicitAny`",
            value:
              "What does it do ? Interdit les `any` implicites : tout ce que le compilateur ne peut pas inférer doit être annoté. Why use it ? Un `any` implicite désactive silencieusement la vérification. What changes ? Les paramètres de fonction non annotés deviennent des erreurs. When might it cause problems ? Avec des bibliothèques JS sans types, il faut écrire les annotations soi-même ou installer les `@types` correspondants.",
          },
          {
            label: "`noUncheckedIndexedAccess`",
            value:
              "What does it do ? L'accès par index (`arr[0]`, `obj[key]`) retourne `T | undefined` au lieu de `T`. Why use it ? Accéder à un index inexistant est une erreur fréquente et silencieuse. What changes ? Il faut tester le résultat avant usage. When might it cause problems ? Rend le code plus verbeux, notamment avec des tableaux manipulés intensivement — à n'activer que si l'équipe est à l'aise avec le strict de base.",
          },
        ],
      },
    ],
  },
  {
    id: "primitive-types",
    title: "Types primitifs",
    level: 3,
    intro: "Les briques de base : chaque valeur a un type, et le compilateur le vérifie.",
    blocks: [
      {
        kind: "text",
        text: "Les types primitifs décrivent les valeurs les plus simples : `string` (texte), `number` (nombres), `boolean` (`true`/`false`), `bigint`, `symbol`, `null` et `undefined`. En mode strict, `null` et `undefined` sont des types à part entière : une variable déclarée `string` ne peut pas recevoir `null` sans erreur.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Annotations de base",
        code: `const name: string = "Ada";\nconst age: number = 36;\nconst active: boolean = true;\n\n// Erreur en mode strict :\n// const name: string = null;`,
      },
    ],
  },
  {
    id: "arrays",
    title: "Tableaux",
    level: 3,
    intro: "Typer le contenu d'un tableau, pas seulement le fait que c'en est un.",
    blocks: [
      {
        kind: "text",
        text: "`string[]` (ou `Array<string>`) signifie « tableau de chaînes ». Le compilateur vérifie chaque élément ajouté et le type retourné par les méthodes comme `map` ou `filter`. Avec `noUncheckedIndexedAccess`, `arr[0]` vaut `string | undefined` : l'accès hors limites devient visible.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Tableaux typés",
        code: `const scores: number[] = [10, 20, 30];\nconst names: Array<string> = ["Ada", "Grace"];\n\nscores.push(40);      // OK\n// scores.push("x");  // Erreur : string n'est pas number`,
      },
    ],
  },
  {
    id: "tuples",
    title: "Tuples",
    level: 3,
    intro: "Des tableaux de longueur et de types fixes, position par position.",
    blocks: [
      {
        kind: "text",
        text: "Un tuple décrit un tableau dont chaque position a son propre type : `[string, number]` est exactement une chaîne suivie d'un nombre. Utile pour les paires clé/valeur, les coordonnées, ou les retours multiples d'une fonction.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Tuple",
        code: `const point: [number, number] = [3, 4];\nconst entry: [string, number] = ["score", 10];\n\n// entry = [10, "score"]; // Erreur : ordre inversé`,
      },
    ],
  },
  {
    id: "objects",
    title: "Objets",
    level: 3,
    intro: "Décrire la forme d'un objet : quelles propriétés, de quels types.",
    blocks: [
      {
        kind: "text",
        text: "Le type d'un objet liste ses propriétés et leur type. Une propriété suivie de `?` est optionnelle. Le compilateur refuse les propriétés manquantes (non optionnelles) et les propriétés inconnues dans un littéral — c'est la vérification dite « d'excès de propriétés ».",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Type d'objet",
        code: `const user: { name: string; age?: number } = {\n  name: "Ada",\n};\n\n// user.age.toFixed(); // Erreur : age peut être undefined`,
      },
    ],
  },
  {
    id: "functions",
    title: "Fonctions",
    level: 3,
    intro: "Typer les paramètres et la valeur de retour : le contrat d'une fonction.",
    blocks: [
      {
        kind: "text",
        text: "Chaque paramètre est annoté, ainsi que le type de retour. Un paramètre avec `?` ou une valeur par défaut est optionnel. Le compilateur vérifie les appels : nombre d'arguments, types, et que la valeur retournée est utilisée correctement.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Fonction typée",
        code: `function greet(name: string, punctuation: string = "!"): string {\n  return "Hello " + name + punctuation;\n}\n\ngreet("Ada");        // OK\n// greet(42);        // Erreur : 42 n'est pas string\n// greet("Ada", "Bob", "!"); // Erreur : trop d'arguments`,
      },
    ],
  },
  {
    id: "unions",
    title: "Unions",
    level: 3,
    intro: "« Ce type OU cet autre » : la flexibilité contrôlée.",
    blocks: [
      {
        kind: "text",
        text: "`string | number` signifie « chaîne ou nombre ». Sur une union, on ne peut utiliser que les opérations valables pour tous les membres — sauf après un affinement (narrowing) qui prouve de quel membre il s'agit. Les unions sont le fondement des états (« chargement », « succès », « erreur ») et des paramètres acceptant plusieurs formes.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Union et narrowing",
        code: `function formatId(id: string | number): string {\n  if (typeof id === "string") {\n    return id.toUpperCase(); // ici, id est string\n  }\n  return id.toFixed(2);      // ici, id est number\n}`,
      },
    ],
  },
  {
    id: "intersections",
    title: "Intersections",
    level: 3,
    intro: "« Ce type ET cet autre » : combiner plusieurs formes.",
    blocks: [
      {
        kind: "text",
        text: "`A & B` décrit une valeur qui satisfait à la fois `A` et `B` : elle possède toutes les propriétés des deux. C'est le mécanisme derrière la composition (ex. ajouter des métadonnées à un objet existant) et les mixins.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Intersection",
        code: `type Named = { name: string };\ntype Aged = { age: number };\n\ntype Person = Named & Aged;\nconst p: Person = { name: "Ada", age: 36 }; // les deux requis`,
      },
    ],
  },
  {
    id: "literal-types",
    title: "Types littéraux",
    level: 3,
    intro: "Des types qui n'acceptent qu'une valeur précise.",
    blocks: [
      {
        kind: "text",
        text: "`\"success\"` comme type n'accepte que la chaîne exacte `\"success\"`. Combinés en unions (`\"small\" | \"medium\" | \"large\"`), ils modélisent les choix fermés : statuts, variantes, modes. Le compilateur refuse toute autre valeur, fautes de frappe incluses.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Littéraux en union",
        code: `type Status = "idle" | "loading" | "success" | "error";\n\nlet s: Status = "loading";\n// s = "done"; // Erreur : "done" n'est pas un Status`,
      },
    ],
  },
  {
    id: "enums",
    title: "Enums",
    level: 3,
    intro: "Des ensembles nommés de constantes — à utiliser avec discernement.",
    blocks: [
      {
        kind: "text",
        text: "Un `enum` regroupe des constantes nommées sous un même type. Pratique pour des codes métier stables, mais les unions de littéraux sont souvent préférables : plus légères, mieux supportées par l'inférence, sans code généré à l'exécution (sauf `const enum`).",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Enum et alternative",
        code: `enum Direction { Up, Down, Left, Right }\nconst d: Direction = Direction.Up;\n\n// Souvent préférable :\ntype Direction2 = "up" | "down" | "left" | "right";`,
      },
    ],
  },
  {
    id: "interfaces",
    title: "Interfaces",
    level: 3,
    intro: "Nommer la forme d'un objet : le contrat le plus courant en TypeScript.",
    blocks: [
      {
        kind: "text",
        text: "Une `interface` donne un nom à la forme d'un objet. Elle peut être étendue (`extends`), implémentée par une classe, et fusionnée par déclaration. C'est l'outil standard pour décrire les données qui circulent : réponses d'API, état d'application, paramètres de fonctions.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Interface",
        code: `interface User {\n  id: number;\n  name: string;\n  email?: string; // optionnel\n}\n\nfunction printUser(u: User): void {\n  console.log(u.id, u.name);\n}`,
      },
    ],
  },
  {
    id: "type-aliases",
    title: "Aliases de types",
    level: 3,
    intro: "Donner un nom à n'importe quel type, pas seulement aux objets.",
    blocks: [
      {
        kind: "text",
        text: "`type` crée un alias pour tout type : union, tuple, fonction, primitif. Contrairement à l'`interface`, un alias ne peut pas être fusionné ni étendu de la même façon, mais il couvre plus de cas (unions, intersections complexes). En pratique : `interface` pour les formes d'objets publiques, `type` pour le reste.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Alias",
        code: `type ID = string | number;\ntype Handler = (event: string) => void;\ntype Point = [number, number];\n\nconst id: ID = "abc-123"; // lisible et réutilisable`,
      },
    ],
  },
  {
    id: "generics",
    title: "Generics",
    level: 3,
    intro: "Écrire du code réutilisable qui reste typé : des types paramétrés par d'autres types.",
    blocks: [
      {
        kind: "text",
        text: "Un générique (`<T>`) est un paramètre de type : la fonction ou la classe fonctionne avec n'importe quel type, mais le type exact est conservé et vérifié à chaque usage. C'est le mécanisme derrière `Array<T>`, `Promise<T>` et la plupart des utilitaires.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Fonction générique",
        code: `function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconst n = first([1, 2, 3]);    // n: number | undefined\nconst s = first(["a", "b"]);   // s: string | undefined`,
      },
    ],
  },
  {
    id: "conditional-types",
    title: "Types conditionnels",
    level: 3,
    intro: "Des types qui se calculent : « si T est X, alors A, sinon B ».",
    blocks: [
      {
        kind: "text",
        text: "`T extends U ? A : B` choisit un type selon qu'un autre type satisfait une contrainte. C'est la brique des utilitaires avancés et des API typées finement (ex. le type de retour dépend du paramètre). À réserver aux bibliothèques et au code très générique : dans le code applicatif, c'est souvent un signe de sur-ingénierie.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Type conditionnel",
        code: `type IsString<T> = T extends string ? true : false;\n\ntype A = IsString<string>; // true\ntype B = IsString<number>; // false`,
      },
    ],
  },
  {
    id: "mapped-types",
    title: "Types mappés",
    level: 3,
    intro: "Transformer un type existant, propriété par propriété.",
    blocks: [
      {
        kind: "text",
        text: "Un type mappé itère sur les clés d'un type pour en produire un nouveau : rendre toutes les propriétés optionnelles, en lecture seule, ou en changer le type. `Partial<T>` et `Readonly<T>` sont des types mappés fournis par le langage.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Type mappé",
        code: `interface User { id: number; name: string; }\n\n// Équivalent de Partial<User> :\ntype PartialUser = { [K in keyof User]?: User[K] };\n\nconst patch: PartialUser = { name: "Ada" }; // OK, partiel`,
      },
    ],
  },
  {
    id: "template-literal-types",
    title: "Template literal types",
    level: 3,
    intro: "Composer des types de chaînes avec la syntaxe des template literals.",
    blocks: [
      {
        kind: "text",
        text: "Comme les template literals à l'exécution, mais au niveau des types : `` `on${Event}` `` génère l'union de toutes les combinaisons. Utile pour typer des noms d'événements, des clés d'API ou des chemins de routes de façon exhaustive.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Template literal type",
        code: "type Event = \"Click\" | \"Hover\";\ntype Handler = `on${Event}`; // \"onClick\" | \"onHover\"\n\nconst h: Handler = \"onClick\";\n// const h: Handler = \"onScroll\"; // Erreur",
      },
    ],
  },
  {
    id: "utility-types",
    title: "Utility types",
    level: 3,
    intro: "Les utilitaires fournis par TypeScript : les connaître évite de les réinventer.",
    blocks: [
      {
        kind: "text",
        text: "TypeScript fournit des utilitaires prêts à l'emploi : `Partial<T>` (tout optionnel), `Required<T>` (tout requis), `Readonly<T>` (lecture seule), `Pick<T, K>` (sous-ensemble de propriétés), `Omit<T, K>` (tout sauf certaines), `Record<K, V>` (objet indexé), `ReturnType<T>` (type de retour d'une fonction), `Awaited<T>` (type résolu d'une promesse). Les utiliser rend le code plus lisible que des types mappés maison.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Utilitaires courants",
        code: `interface User { id: number; name: string; email: string; }\n\ntype UserPreview = Pick<User, "id" | "name">;\ntype UserUpdate = Partial<User>;\ntype UserMap = Record<number, User>; // { [id: number]: User }`,
      },
    ],
  },
  {
    id: "narrowing",
    title: "Narrowing (affinement)",
    level: 3,
    intro: "Réduire un type large vers un type précis grâce au contrôle de flux.",
    blocks: [
      {
        kind: "text",
        text: "Le narrowing est le mécanisme par lequel TypeScript « resserre » un type après un test : `typeof x === \"string\"` prouve que `x` est une chaîne dans ce bloc. Autres formes : vérification de `null`, `in` pour les propriétés, `instanceof` pour les classes, et les discriminants (une propriété littérale commune aux membres d'une union).",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Affinement par discriminant",
        code: `type Result =\n  | { status: "ok"; data: string }\n  | { status: "error"; message: string };\n\nfunction handle(r: Result): void {\n  if (r.status === "ok") {\n    console.log(r.data);    // r est le membre "ok"\n  } else {\n    console.log(r.message); // r est le membre "error"\n  }\n}`,
      },
    ],
  },
  {
    id: "type-guards",
    title: "Type guards",
    level: 3,
    intro: "Des fonctions qui prouvent un type au compilateur.",
    blocks: [
      {
        kind: "text",
        text: "Un type guard est une fonction dont le retour `x is T` indique au compilateur : « si elle retourne vrai, alors `x` est de type `T` ». Cela permet d'encapsuler des tests complexes (validation de données, vérification de forme) tout en gardant l'affinement automatique.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Garde de type",
        code: `function isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\nfunction shout(value: unknown): string {\n  if (isString(value)) {\n    return value.toUpperCase(); // value: string ici\n  }\n  return "";\n}`,
      },
    ],
  },
  {
    id: "type-assertions",
    title: "Type assertions",
    level: 3,
    intro: "Dire au compilateur « fais-moi confiance » — avec parcimonie.",
    blocks: [
      {
        kind: "text",
        text: "`value as T` affirme un type sans aucune vérification à l'exécution : si vous vous trompez, le compilateur vous croit quand même. À réserver aux cas où vous en savez réellement plus que le compilateur (ex. après une validation manuelle). Préférez toujours le narrowing et les guards : une assertion qui ment est pire qu'aucun type.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Assertion",
        code: `const input = document.getElementById("name") as HTMLInputElement;\n// On affirme que c'est un <input> : .value devient accessible.\n// Si l'élément n'existe pas ou n'est pas un input -> erreur à l'exécution.`,
      },
    ],
  },
  {
    id: "unknown",
    title: "`unknown`",
    level: 3,
    intro: "« Je ne sais pas ce que c'est » — la version sûre de `any`.",
    blocks: [
      {
        kind: "text",
        text: "`unknown` accepte n'importe quelle valeur, comme `any`, mais interdit toute utilisation tant que le type n'a pas été affiné. C'est le type correct pour les données non vérifiées : entrées utilisateur, réponses JSON, valeurs de `catch`. Il force à valider avant d'utiliser.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "unknown force la vérification",
        code: `function parse(input: string): unknown {\n  return JSON.parse(input);\n}\n\nconst data = parse("{}");\n// data.foo; // Erreur : data est unknown\nif (typeof data === "object" && data !== null) {\n  // utilisation après vérification\n}`,
      },
    ],
  },
  {
    id: "never",
    title: "`never`",
    level: 3,
    intro: "Le type des choses qui n'arrivent jamais.",
    blocks: [
      {
        kind: "text",
        text: "`never` représente l'absence de valeur : une fonction qui ne retourne jamais (erreur toujours levée, boucle infinie) ou une union vidée par affinement. Son usage le plus précieux : la vérification d'exhaustivité — si un `switch` sur une union oublie un cas, affecter le résidu à `never` produit une erreur de compilation.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Exhaustivité avec never",
        code: `type Shape = { kind: "circle"; r: number } | { kind: "square"; s: number };\n\nfunction area(sh: Shape): number {\n  switch (sh.kind) {\n    case "circle": return Math.PI * sh.r ** 2;\n    case "square": return sh.s ** 2;\n    default: {\n      const _exhaustive: never = sh; // Erreur si un cas manque\n      return _exhaustive;\n    }\n  }\n}`,
      },
    ],
  },
  {
    id: "any",
    title: "`any`",
    level: 3,
    intro: "Désactiver la vérification : à comprendre pour l'éviter.",
    blocks: [
      {
        kind: "text",
        text: "`any` accepte tout et autorise tout : aucune vérification. C'est parfois nécessaire (migration, bibliothèque sans types), mais chaque `any` est un trou dans le filet de sécurité. En mode `strict` + `noImplicitAny`, les `any` implicites sont interdits ; les `any` explicites doivent rester exceptionnels et documentés. Quand on hésite entre `any` et `unknown`, `unknown` est presque toujours le bon choix.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Le danger de any",
        code: `function risky(value: any) {\n  return value.foo.bar; // Aucune erreur à la compilation...\n}                        // ...mais crash possible à l'exécution.`,
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
        kind: "text",
        text: "`void` s'utilise pour le type de retour des fonctions qui ne retournent pas de valeur (ou dont la valeur de retour est ignorée, comme les callbacks). À ne pas confondre avec `undefined` : `void` exprime une intention (« le retour ne compte pas »), utile notamment pour typer les gestionnaires d'événements et les callbacks.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "void",
        code: `function log(message: string): void {\n  console.log(message);\n}\n\ntype ClickHandler = (event: string) => void;`,
      },
    ],
  },
  {
    id: "diagrammes-type-system",
    title: "Diagrammes du système de types",
    level: 3,
    intro: "Visualiser comment l'affinement réduit progressivement un type large.",
    blocks: [
      {
        kind: "diagram",
        title: "De `unknown` vers un type précis",
        lines: [
          "unknown",
          "   │",
          "   │ narrowing (typeof, guards, discriminants)",
          "   ▼",
          "string | number",
          "   │",
          "   ├── string",
          "   └── number",
        ],
      },
      {
        kind: "diagram",
        title: "Vers `never` : quand il ne reste aucune valeur possible",
        lines: [
          "All possible values",
          "       │",
          "       ▼",
          "   narrowing",
          "       │",
          "       ▼",
          "      never  (ensemble vide : contradiction)",
        ],
      },
      {
        kind: "text",
        text: "Ces diagrammes sont interactifs dans l'application : chaque nœud correspond à une section détaillée ci-dessus. L'idée clé : le système de types est un entonnoir — on part du plus large (`unknown`) et on affine jusqu'au type exact, ou jusqu'à `never` quand aucun cas ne subsiste.",
      },
    ],
  },
  {
    id: "javascript-vers-typescript",
    title: "De JavaScript à TypeScript, pas à pas",
    level: 3,
    intro: "Voir concrètement ce que chaque annotation apporte, sur un exemple minimal.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Avant — JavaScript",
        code: `function add(a, b) {\n  return a + b;\n}`,
      },
      {
        kind: "code",
        language: "typescript",
        title: "Après — TypeScript",
        code: `function add(a: number, b: number): number {\n  return a + b;\n}`,
      },
      {
        kind: "list",
        items: [
          "`a: number` — le premier paramètre doit être un nombre ; appeler `add(\"x\", 1)` devient une erreur de compilation au lieu d'un résultat surprenant (`\"x1\"`).",
          "`b: number` — même garantie pour le second paramètre.",
          "`: number` après les parenthèses — la fonction promet de retourner un nombre ; si le corps retourne autre chose (ou rien), le compilateur le signale.",
          "Ce qui n'a pas changé : à l'exécution, c'est exactement le même code JavaScript. Les annotations sont effacées à la compilation.",
        ],
      },
    ],
  },
  {
    id: "modules",
    title: "Modules",
    level: 3,
    intro: "Organiser le code en fichiers : systèmes de modules et leur configuration.",
    blocks: [
      {
        kind: "text",
        text: "Deux systèmes coexistent : les modules ES (`import`/`export`, standard du langage) et CommonJS (`require`/`module.exports`, historique de Node.js). Le `package.json` déclare le système utilisé (`\"type\": \"module\"` pour l'ESM pur sous Node.js), tandis que `module` et `moduleResolution` dans `tsconfig.json` disent au compilateur quel format émettre et comment résoudre les imports.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Exports nommés et par défaut",
        code: `// math.ts\n export function add(a: number, b: number): number { return a + b; }\n export const PI = 3.14159;\n export default function sub(a: number, b: number): number { return a - b; }\n\n// main.ts\nimport sub, { add, PI } from "./math.js";`,
      },
      {
        kind: "list",
        items: [
          "Exports nommés : plusieurs par fichier, importés par leur nom exact entre accolades.",
          "Export par défaut : un seul par fichier, importé sous le nom de votre choix.",
          "Notez l'extension `.js` dans l'import : en mode `NodeNext`, TypeScript exige d'écrire l'extension du fichier émis, même si la source est `.ts`.",
          "Interactions : Node.js exécute nativement les deux systèmes (avec des règles strictes pour l'ESM) ; les bundlers (Vite, Webpack) acceptent les deux et les unifient au moment du build.",
        ],
      },
    ],
  },
  {
    id: "runtime-vs-compiler",
    title: "Runtime vs compilateur",
    level: 3,
    intro: "Distinguer clairement qui vérifie, qui compile et qui exécute.",
    blocks: [
      {
        kind: "diagram",
        title: "La chaîne complète",
        lines: [
          "TypeScript (.ts)",
          "    ↓",
          "Compile / check (tsc : vérifie les types, émet du JS)",
          "    ↓",
          "JavaScript (.js)",
          "    ↓",
          "Runtime (exécute réellement le code)",
        ],
      },
      {
        kind: "fields",
        title: "Les runtimes et leur rôle",
        fields: [
          {
            label: "Browser (navigateur)",
            value: "Exécute le JavaScript dans les pages web. Ne comprend pas TypeScript : le code doit être compilé et bundlé avant d'être servi.",
          },
          {
            label: "Node.js",
            value: "Exécute JavaScript côté serveur. Le runtime historique de l'écosystème npm ; `tsc` lui-même s'exécute sur Node.js.",
          },
          {
            label: "Deno",
            value: "Runtime moderne qui exécute directement du TypeScript en le transpilant à la volée (sans vérification de types complète par défaut). Sécurité par permissions explicites.",
          },
          {
            label: "Bun",
            value: "Runtime très rapide qui exécute aussi le TypeScript directement (transpilation à la volée). Intègre bundler, testeur et gestionnaire de paquets.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point essentiel : même quand Deno ou Bun « exécutent du TypeScript », ils le transforment d'abord en JavaScript en mémoire. Le principe ne change pas : seul du JavaScript s'exécute. Et la vérification stricte des types reste le travail de `tsc` (via `tsc --noEmit` dans ces environnements).",
      },
    ],
  },
  {
    id: "build-tools",
    title: "Outils de build",
    level: 3,
    intro: "Bundlers et transpileurs : pourquoi ils existent et comment ils s'articulent avec TypeScript.",
    blocks: [
      {
        kind: "text",
        text: "Distinction fondamentale : le compilateur TypeScript (`tsc`) vérifie les types et émet du JavaScript fichier par fichier. Un bundler assemble des centaines de modules en quelques fichiers optimisés pour le navigateur. Ce sont deux métiers différents — et la plupart des bundlers modernes transpilent le TypeScript sans vérifier les types (plus rapide), la vérification restant confiée à `tsc --noEmit`.",
      },
      {
        kind: "fields",
        title: "Les outils et leur rôle",
        fields: [
          {
            label: "Vite",
            value: "Rôle : serveur de dev instantané + build de production. Pourquoi il existe : remplacer le démarrage lent des anciens bundlers grâce aux modules ES natifs. Relation avec TS : transpile via esbuild (sans vérification de types) ; le template officiel inclut `tsc --noEmit` dans le build.",
          },
          {
            label: "Webpack",
            value: "Rôle : bundler historique et très configurable. Pourquoi il existe : assembler et optimiser les assets web (JS, CSS, images). Relation avec TS : via `ts-loader` (vérifie) ou `esbuild-loader`/`swc-loader` (transpile seulement).",
          },
          {
            label: "Rspack",
            value: "Rôle : bundler compatible Webpack écrit en Rust. Pourquoi il existe : les performances de Webpack sans changer sa configuration. Relation avec TS : transpile via SWC intégré, comme esbuild pour Vite.",
          },
          {
            label: "Rollup",
            value: "Rôle : bundler orienté bibliothèques, excellent tree-shaking. Pourquoi il existe : produire des bundles propres pour les paquets npm. Relation avec TS : via plugins (`@rollup/plugin-typescript` ou `rollup-plugin-esbuild`).",
          },
          {
            label: "esbuild",
            value: "Rôle : transpileur/bundler ultrarapide écrit en Go. Pourquoi il existe : la vitesse (10 à 100× plus rapide que les outils JS). Relation avec TS : efface les types sans les vérifier — c'est un transpileur, pas un vérificateur.",
          },
          {
            label: "SWC",
            value: "Rôle : plateforme de compilation rapide écrite en Rust (transpilation, minification). Pourquoi il existe : même motivation qu'esbuild, avec une architecture extensible. Relation avec TS : transpile sans vérifier les types ; utilisé par Next.js et Rspack.",
          },
          {
            label: "Parcel",
            value: "Rôle : bundler « zéro configuration ». Pourquoi il existe : démarrer sans configurer. Relation avec TS : support TypeScript intégré par transpilation.",
          },
        ],
      },
    ],
  },
  {
    id: "framework-integration",
    title: "TypeScript dans les frameworks",
    level: 3,
    intro: "Comment TypeScript s'intègre aux frameworks et runtimes les plus courants.",
    blocks: [
      {
        kind: "fields",
        title: "React",
        fields: [
          { label: "Fichiers", value: "Les fichiers contenant du JSX utilisent l'extension `.tsx`." },
          { label: "Props", value: "Les props d'un composant se typent via une interface ou un type : `function Button({ label }: { label: string })`." },
          { label: "Hooks", value: "`useState<string>(\"\")` précise le type d'état ; `useRef<HTMLInputElement>(null)` type la référence." },
          { label: "Event types", value: "Les gestionnaires reçoivent des types d'événements React (`React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent`)." },
          { label: "Context", value: "`createContext<User | null>(null)` type la valeur partagée." },
          { label: "Generics", value: "Les composants génériques (`<T>`) permettent des listes ou formulaires réutilisables et typés." },
          { label: "Types React", value: "Selon le projet, `@types/react` et `@types/react-dom` fournissent les déclarations de types de React." },
        ],
      },
      {
        kind: "list",
        items: [
          "Next.js : framework React avec support TypeScript intégré — un `tsconfig.json` est généré automatiquement à l'initialisation.",
          "Node.js / Express : typer `Request` et `Response` (via `@types/express`) pour des handlers d'API sûrs.",
          "NestJS : framework backend construit autour de TypeScript (décorateurs, injection de dépendances typée).",
          "Vue : le `<script setup lang=\"ts\">` active TypeScript dans les composants monofichiers.",
          "Angular : framework entièrement basé sur TypeScript depuis son origine.",
          "Svelte : support TypeScript via `lang=\"ts\"` dans les composants.",
        ],
      },
    ],
  },
  {
    id: "linting",
    title: "Linting",
    level: 3,
    intro: "La qualité du code au-delà des types : ce que fait (et ne fait pas) ESLint.",
    blocks: [
      {
        kind: "text",
        text: "Trois outils, trois rôles : la vérification de types (`tsc`) prouve la cohérence des types ; le linting (ESLint) signale les problèmes de qualité et les pratiques risquées (variables inutilisées, `await` oublié, code mort) ; le formatage (Prettier) uniformise la présentation. ESLint n'est pas un compilateur : il n'émet pas de JavaScript et ne remplace pas `tsc`.",
      },
      {
        kind: "command",
        label: "Analyser le code avec ESLint",
        command: "npx eslint .",
        why: "Parcourt le projet et signale les règles violées (style, bugs probables, bonnes pratiques). Avec `typescript-eslint`, ESLint comprend la syntaxe TypeScript et peut même utiliser les informations de types pour des règles plus fines.",
        verify: "npx eslint . --max-warnings 0",
      },
      {
        kind: "text",
        text: "En pratique : `tsc --noEmit` dans le script `typecheck`, `eslint` dans le script `lint`, les deux exécutés par la CI. L'un ne remplace pas l'autre.",
      },
    ],
  },
  {
    id: "formatting",
    title: "Formatting",
    level: 3,
    intro: "Un style uniforme, appliqué automatiquement : fini les débats d'indentation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Prettier : formateur d'opinion — il reformate tout le code selon ses propres règles (points-virgules, guillemets, largeur). Le projet n'a plus à choisir : la décision est prise une fois pour toutes.",
          "Biome : alternative rapide écrite en Rust, qui combine formatage et linting dans un seul outil.",
          "Format on save : l'éditeur reformate à chaque sauvegarde — le code est toujours propre sans y penser.",
          "Avantage : les pull requests ne contiennent plus de bruit de formatage, les revues se concentrent sur le fond. Limite : un formateur ne rend pas un mauvais code bon, il le rend seulement lisible.",
        ],
      },
      {
        kind: "command",
        label: "Vérifier le formatage sur tout le projet",
        command: "npx prettier --check .",
        why: "Vérifie que tous les fichiers respectent le formatage, sans les modifier. En CI, cette commande échoue si un fichier n'est pas formaté — chacun formate avant de pousser.",
        verify: "npx prettier --write .",
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging",
    level: 3,
    intro: "Déboguer du TypeScript : les concepts du débogueur et le rôle des source maps.",
    blocks: [
      {
        kind: "diagram",
        title: "Comment le débogueur retrouve votre TypeScript",
        lines: [
          "TypeScript (.ts, ce que vous écrivez)",
          "     ↓  (tsc avec \"sourceMap\": true)",
          "JavaScript (.js) + Source map (.js.map)",
          "     ↓",
          "Debugger (point d'arrêt posé dans le .ts,",
          "         exécution suivie dans le .js)",
        ],
      },
      {
        kind: "fields",
        title: "Les concepts du débogage",
        fields: [
          { label: "Breakpoint", value: "Point d'arrêt : l'exécution se suspend à cette ligne." },
          { label: "Step over", value: "Exécute la ligne courante sans entrer dans les fonctions appelées." },
          { label: "Step into", value: "Entre dans la fonction appelée pour la suivre ligne par ligne." },
          { label: "Step out", value: "Termine la fonction courante et revient à l'appelant." },
          { label: "Watch", value: "Expressions surveillées, réévaluées à chaque pas." },
          { label: "Call stack", value: "Pile des appels : qui a appelé quoi, dans quel ordre." },
          { label: "Variables", value: "Inspection des variables locales et de leur type au point d'arrêt." },
          { label: "Source maps", value: "Fichiers `.js.map` reliant le JS exécuté au TS source — sans eux, on débogue du JavaScript généré illisible." },
        ],
      },
      {
        kind: "text",
        text: "En pratique : activez `\"sourceMap\": true` dans `tsconfig.json`, posez un point d'arrêt dans le `.ts` depuis VS Code ou WebStorm, lancez en mode debug. Vous déboguez votre code source, pas le code généré.",
      },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    level: 3,
    intro: "Prouver que le code fonctionne : les trois niveaux de tests et leurs outils.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tests unitaires : une fonction, un module, isolé. Rapides, nombreux, première ligne de défense.",
          "Tests d'intégration : plusieurs modules ensemble (ex. route API + base de données de test).",
          "Tests end-to-end (e2e) : l'application réelle pilotée comme un utilisateur, dans un vrai navigateur.",
        ],
      },
      {
        kind: "fields",
        title: "Les outils",
        fields: [
          {
            label: "Vitest",
            value: "Rôle : testeur unitaire moderne, compatible avec l'API de Jest. Installation : `npm install -D vitest`. Configuration : minimale, fonctionne directement avec Vite. Exemple : `expect(add(1, 2)).toBe(3)`. Quand l'utiliser : projets Vite et applications modernes — le choix par défaut aujourd'hui.",
          },
          {
            label: "Jest",
            value: "Rôle : testeur historique de l'écosystème. Installation : `npm install -D jest @types/jest ts-jest`. Configuration : `ts-jest` ou `babel` pour le TypeScript. Quand l'utiliser : projets existants déjà configurés avec Jest, écosystème très riche.",
          },
          {
            label: "Playwright",
            value: "Rôle : tests e2e multi-navigateurs. Installation : `npm install -D @playwright/test` puis `npx playwright install`. Configuration : `playwright.config.ts`. Quand l'utiliser : tester l'application réelle comme un utilisateur (clics, formulaires, navigation).",
          },
          {
            label: "Cypress",
            value: "Rôle : tests e2e avec une interface visuelle de débogage. Installation : `npm install -D cypress`. Quand l'utiliser : équipes voulant une expérience de debug visuelle des tests navigateur.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lancer les tests unitaires",
        command: "npx vitest run",
        why: "`vitest run` exécute les tests une fois (sans `run`, Vitest reste en mode watch pendant le développement). Chaque fichier `*.test.ts` est exécuté et le résultat affiché.",
        verify: "npx vitest run --coverage",
      },
    ],
  },
  {
    id: "git",
    title: "Git et le contrôle de version",
    level: 3,
    intro: "L'historique du code : les commandes essentielles et les plateformes.",
    blocks: [
      {
        kind: "fields",
        title: "Commandes fondamentales",
        fields: [
          { label: "`git init`", value: "Initialise un dépôt dans le dossier courant." },
          { label: "`git add`", value: "Prépare les fichiers modifiés pour le commit (la « staging area »)." },
          { label: "`git commit`", value: "Enregistre un instantané avec un message décrivant le changement." },
          { label: "`git branch`", value: "Liste ou crée des branches (lignes de développement parallèles)." },
          { label: "`git switch`", value: "Change de branche (`git switch -c nom` la crée et y bascule)." },
          { label: "`git merge`", value: "Fusionne une branche dans la branche courante." },
          { label: "`git rebase`", value: "Rejoue vos commits sur une base plus récente — historique linéaire, à éviter sur des branches partagées." },
          { label: "`git pull`", value: "Récupère et fusionne les changements distants." },
          { label: "`git push`", value: "Envoie vos commits vers le dépôt distant." },
        ],
      },
      {
        kind: "list",
        items: [
          "GitHub : plateforme la plus utilisée, avec Actions pour la CI et les pull requests.",
          "GitLab : alternative complète intégrant CI/CD nativement.",
          "Bitbucket : orienté équipes Atlassian (Jira).",
          "Le `.gitignore` d'un projet TypeScript exclut au minimum `node_modules/` et le dossier de sortie (`dist/`).",
        ],
      },
    ],
  },
  {
    id: "ci-cd",
    title: "CI/CD",
    level: 3,
    intro: "Comment TypeScript est vérifié automatiquement dans une vraie équipe.",
    blocks: [
      {
        kind: "diagram",
        title: "Pipeline typique à chaque pull request",
        lines: [
          "Developer push",
          "     ↓",
          "CI",
          " ├── Install (npm ci — installation reproductible)",
          " ├── Type check (tsc --noEmit)",
          " ├── Lint (eslint .)",
          " ├── Test (vitest run)",
          " └── Build (tsc / vite build)",
          "     ↓",
          "Deploy (si la branche principale est verte)",
        ],
      },
      {
        kind: "list",
        items: [
          "GitHub Actions : workflows définis dans `.github/workflows/`, exécutés sur les runners GitHub à chaque push ou pull request.",
          "GitLab CI : pipeline définie dans `.gitlab-ci.yml`, exécutée par les runners GitLab.",
          "Règle d'or : la CI rejoue exactement ce que le développeur peut lancer en local (`npm run typecheck`, `npm run lint`, `npm test`). Aucune étape magique.",
          "`npm ci` (plutôt que `npm install`) est la commande d'installation en CI : elle respecte strictement le lockfile.",
        ],
      },
    ],
  },
  {
    id: "architecture-projet",
    title: "Architecture de projet",
    level: 3,
    intro: "Structurer le code selon la taille du projet — sans appliquer de modèle aveuglément.",
    blocks: [
      {
        kind: "diagram",
        title: "Petit projet",
        lines: ["src/", "├── index.ts", "└── utils.ts"],
      },
      {
        kind: "diagram",
        title: "Projet plus important",
        lines: [
          "src/",
          "├── components/",
          "├── services/",
          "├── models/",
          "├── utils/",
          "├── config/",
          "├── types/",
          "└── index.ts",
        ],
      },
      {
        kind: "text",
        text: "Pourquoi ne pas appliquer une structure aveuglément : une architecture se justifie par les besoins réels (taille de l'équipe, complexité du domaine, durée de vie du projet). Un dossier `services/` vide dans un projet de trois fichiers n'apporte rien ; un projet qui grandit sans structure devient illisible. Laissez la structure émerger des besoins, extrayez des modules quand un fichier devient trop gros, et documentez les conventions choisies.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques des développeurs TypeScript, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Utiliser `any` partout",
            value:
              "Problem : le code compile toujours mais n'est plus vérifié. Why : facilité pendant la migration ou par méconnaissance. Bad example : `function f(x: any) { return x.a.b; }`. Better : typer précisément, ou `unknown` + affinement.",
          },
          {
            label: "Ignorer le mode strict",
            value:
              "Problem : `strict: false` laisse passer les erreurs de nullabilité et les `any` implicites. Why : pour faire taire le compilateur au lieu de corriger. Bad example : désactiver `strict` face à 50 erreurs. Better : corriger progressivement, activer `strict` dès le début d'un nouveau projet.",
          },
          {
            label: "Confondre type et runtime",
            value:
              "Problem : croire qu'une interface protège à l'exécution (ex. valider des données d'API avec un simple cast). Why : les types sont effacés à la compilation. Bad example : `const u = data as User` sans validation. Better : valider les données externes (guards, schémas) avant de les typer.",
          },
          {
            label: "Abuser des enums",
            value:
              "Problem : code généré inutile, interopérabilité compliquée. Why : habitude d'autres langages. Bad example : un `enum` pour trois statuts. Better : union de littéraux (`\"a\" | \"b\" | \"c\"`).",
          },
          {
            label: "Mauvaise configuration des modules",
            value:
              "Problem : erreurs `Cannot find module` ou imports qui fonctionnent en dev mais pas en build. Why : `module`/`moduleResolution` incohérents avec l'environnement. Better : `NodeNext`/`NodeNext` pour Node moderne, `Bundler`/`Bundler` pour Vite/Webpack.",
          },
          {
            label: "Ignorer la nullabilité",
            value:
              "Problem : `Cannot read properties of null` en production. Why : `strictNullChecks` désactivé ou assertions `!` abusives. Bad example : `user!.name`. Better : typer `| null` et tester explicitement.",
          },
          {
            label: "Assertions au lieu d'affinement",
            value:
              "Problem : `as` ment au compilateur quand la valeur réelle diffère. Why : plus rapide à écrire qu'un guard. Bad example : `el as HTMLInputElement` sur un élément inexistant. Better : narrowing, type guards, vérifications.",
          },
          {
            label: "Types énormes et illisibles",
            value:
              "Problem : un type de 40 lignes que personne ne comprend. Why : tout typer en un seul endroit. Better : découper en petits types nommés et composés.",
          },
          {
            label: "Sur-ingénierie des generics",
            value:
              "Problem : des génériques à trois paramètres là où un type simple suffirait. Why : vouloir un code « générique » prématurément. Better : commencer concret, généraliser quand le besoin se répète vraiment.",
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
          "Typage strict : activez `strict` et traitez chaque erreur comme un bug potentiel, pas comme du bruit.",
          "Petits modules : un fichier, une responsabilité ; extrayez quand ça grandit.",
          "Nommage clair : les types racontent une histoire (`User`, `PaymentStatus`), pas des puzzles (`Data2`).",
          "Types réutilisables : un type dupliqué trois fois mérite un nom et une place partagée.",
          "API publiques explicites : ce qu'une fonction accepte et retourne doit se lire dans sa signature.",
          "Gestion d'erreurs : typer les cas d'échec (`Result`, unions d'états) plutôt que les ignorer.",
          "Tests : les types ne remplacent pas les tests — ils se complètent.",
          "Documentation : documentez les intentions non évidentes, pas chaque ligne.",
          "Dépendances : peu, à jour, verrouillées par le lockfile.",
          "Versionnage : semver pour les bibliothèques, changements cassants annoncés.",
          "Revue de code : la lisibilité se juge à deux, jamais seul.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : ces pratiques s'appliquent différemment selon le projet. Un prototype jetable n'a pas les mêmes exigences qu'une bibliothèque publique. La maturité, c'est savoir quand appliquer chaque pratique — et quand s'en dispenser consciemment.",
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
          { label: "Parcours", value: "typescriptlang.org/docs : parcours distincts pour débutants, programmeurs JavaScript, développeurs Java/C# et programmation fonctionnelle." },
          { label: "Handbook", value: "Le manuel de référence, du niveau débutant aux types avancés." },
          { label: "Reference", value: "Référence exhaustive : `tsconfig`, CLI, utilitaires, déclarations." },
          { label: "Playground", value: "typescriptlang.org/play : essayer TypeScript dans le navigateur, avec les erreurs en direct." },
        ],
      },
      {
        kind: "list",
        items: [
          "Guides : la documentation des frameworks utilisés (React, Node.js, Vite) pour l'intégration pratique.",
          "API reference : la référence `tsconfig` et les release notes pour suivre les nouveautés.",
          "Community : le dépôt GitHub microsoft/TypeScript (issues, discussions) et les forums d'entraide.",
          "Practice : les projets progressifs de cette page, puis la contribution à des projets open source typés.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "TypeScript maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir un framework : React + TypeScript, Next.js, ou NestJS côté backend.",
          "Apprendre les tests : Vitest pour l'unitaire, Playwright pour l'e2e.",
          "Découvrir le typage avancé en conditions réelles : contribuer à une bibliothèque open source.",
          "Explorer l'écosystème : Node.js, puis les bases de données (PostgreSQL) et le déploiement (Docker).",
          "Revenir à la roadmap : valider TypeScript et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

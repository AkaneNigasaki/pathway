import type { SkillGuide } from "../skill-guides";
import { LEARNING_EDITEUR } from "./learning-editeur";
import { LEARNING_FONCTIONS } from "./learning-fonctions";
import { LEARNING_INSTALLATION } from "./learning-installation";
import { LEARNING_INTERFACES } from "./learning-interfaces";
import { LEARNING_JS_MODERNE } from "./learning-js-moderne";
import { LEARNING_TSC } from "./learning-tsc";
import { LEARNING_TSCONFIG } from "./learning-tsconfig";
import { LEARNING_TYPES_BASE } from "./learning-types-base";
import { LEARNING_GENERIQUES } from "./learning-generiques";
import { LEARNING_MIGRATION } from "./learning-migration";
import { LEARNING_MODULES } from "./learning-modules";
import { LEARNING_OUTILLAGE } from "./learning-outillage";
import { LEARNING_STRICT } from "./learning-strict";
import { LEARNING_TYPES_AVANCES } from "./learning-types-avances";
import { LEARNING_UNIONS } from "./learning-unions";
import { LEARNING_UTILITY_TYPES } from "./learning-utility-types";

/**
 * Guides pédagogiques de la roadmap TypeScript.
 * Ton : documentation technique, concret, sans marketing. Français.
 */
export const GUIDES_TYPESCRIPT: Record<string, SkillGuide> = {
  "js-moderne": {
  learning: LEARNING_JS_MODERNE,
  setup: {
    install: [
      "Installer Node.js LTS depuis nodejs.org (ou via nvm : `nvm install --lts`).",
      "Vérifier l'installation : `node -v` et `npm -v` dans un terminal.",
    ],
    configure: [
      "Initialiser le projet : `npm init -y`.",
      "Ajouter `\"type\": \"module\"` dans package.json pour utiliser import/export natifs.",
    ],
    workflow: [
      "Exécuter un fichier : `node app.js`.",
      "Découper le code en modules ES (`import` / `export`).",
      "Tester les nouveautés (optional chaining `?.`, nullish `??`) directement en console Node.",
    ],
    editors: [
      "VS Code : coloration et IntelliSense JavaScript intégrés, sans extension.",
      "Extensions utiles : ESLint, Prettier.",
      "Alternatives : WebStorm (tout intégré), Zed (rapide et léger).",
    ],
  },
    definition:
      "JavaScript moderne désigne le JavaScript des standards ES2015 et suivants : modules, classes, promesses, async/await, destructuration. C'est le langage que TypeScript étend — chaque fichier TypeScript valide est d'abord du JavaScript valide.",
    whyLearn:
      "TypeScript n'ajoute que des types par-dessus JavaScript : si les closures, le modèle asynchrone ou les modules ES sont flous, les erreurs du compilateur resteront incompréhensibles. Un socle JS solide rend l'apprentissage de TypeScript deux fois plus rapide.",
    conceptDetails: [
      {
        name: "Portée & closures",
        definition:
          "Une closure est une fonction qui capture les variables de son contexte de création. C'est le mécanisme derrière les callbacks, les factories et la plupart des patterns JS.",
      },
      {
        name: "Promesses & async/await",
        definition:
          "Les promesses représentent une valeur future ; async/await permet d'écrire du code asynchrone de façon linéaire. TypeScript type ces valeurs avec Promise<T>.",
      },
      {
        name: "Modules ES",
        definition:
          "Les modules ES (import/export) découpent le code en fichiers aux dépendances explicites. TypeScript s'appuie dessus pour la résolution et la vérification inter-fichiers.",
      },
      {
        name: "Destructuration",
        definition:
          "La destructuration extrait des valeurs d'objets ou de tableaux en une ligne. Combinée aux types, elle rend les signatures de fonctions très lisibles.",
      },
      {
        name: "Égalité & transtypage",
        definition:
          "JavaScript convertit implicitement les types (==, +). Comprendre ces conversions évite des bugs que TypeScript, justement, aide à détecter.",
      },
    ],
    howItWorksTitle: "Ce qu'il faut maîtriser avant TypeScript",
    howItWorks: ["SYNTAXE", "FONCTIONS", "ASYNCHRONE", "MODULES", "OUTILS"],
    example: {
      title: "Charger des données et les afficher",
      steps: [
        "Définir un module api.js qui exporte une fonction fetchUsers",
        "Appeler l'API avec fetch et await dans une fonction async",
        "Destructurer la réponse JSON",
        "Injecter les résultats dans le DOM",
        "Gérer les erreurs avec try/catch",
      ],
    },
    projectsDetailed: [
      {
        title: "Mini-application sans framework",
        flow: "HTML → JS modules → fetch API → DOM → Événements",
      },
      {
        title: "Utilitaires async",
        flow: "Promesses → async/await → retry → timeout → Tests manuels",
      },
    ],
  },
  installation: {
  learning: LEARNING_INSTALLATION,
  setup: {
    install: [
      "Installer Node.js LTS depuis nodejs.org.",
      "Créer le dossier projet puis `npm init -y`.",
      "Installer TypeScript en dépendance de dev : `npm install -D typescript`.",
      "Vérifier : `npx tsc --version`.",
    ],
    configure: [
      "Générer le tsconfig : `npx tsc --init`.",
      "Régler `target: ES2022`, `module: NodeNext`, `strict: true`.",
      "Définir `rootDir: src` et `outDir: dist` pour séparer sources et build.",
    ],
    workflow: [
      "Compiler : `npx tsc` ; vérifier sans émettre : `npx tsc --noEmit`.",
      "Développement continu : `npx tsc --watch`.",
      "Ajouter des scripts npm : `\"build\": \"tsc\"`, `\"typecheck\": \"tsc --noEmit\"`.",
    ],
    editors: [
      "VS Code (recommandé) : le meilleur support TypeScript du marché, intégré.",
      "Extensions : Error Lens, Pretty TypeScript Errors, ESLint, Prettier.",
      "Forcer la version du workspace : `Ctrl+Maj+P` → « TypeScript: Select TypeScript Version » → Use Workspace Version.",
      "Alternative : WebStorm, excellent support TS natif.",
    ],
  },
    definition:
      "Installer TypeScript consiste à disposer de Node.js, du gestionnaire npm, puis du compilateur tsc dans un projet initialisé avec un package.json. À la fin, un fichier .ts compile vers du JavaScript exécutable.",
    whyLearn:
      "Sans environnement fonctionnel, impossible de pratiquer : chaque notion du parcours se vérifie en compilant du vrai code. Une installation propre évite les erreurs parasites qui découragent au démarrage.",
    environment: [
      "Installer Node.js LTS depuis nodejs.org",
      "Vérifier avec node -v et npm -v dans un terminal",
      "Créer un dossier de projet et lancer npm init -y",
      "Installer TypeScript : npm install -D typescript",
      "Créer src/index.ts avec un console.log de test",
      "Compiler avec npx tsc --init puis npx tsc, exécuter le JS produit",
    ],
    conceptDetails: [
      {
        name: "Node.js",
        definition:
          "Node.js exécute du JavaScript hors navigateur. Il fournit aussi npm, indispensable pour installer TypeScript et ses outils.",
      },
      {
        name: "npm & npx",
        definition:
          "npm installe les dépendances listées dans package.json ; npx exécute un binaire local (comme tsc) sans installation globale.",
      },
      {
        name: "Dépendance de dev",
        definition:
          "TypeScript s'installe en devDependency (-D) : il sert à développer et compiler, pas à s'exécuter en production.",
      },
      {
        name: "package.json",
        definition:
          "Le manifeste du projet : dépendances, scripts npm (build, dev) et métadonnées. Les scripts standardisent les commandes de compilation.",
      },
    ],
    howItWorksTitle: "Mettre en place un projet TypeScript",
    howItWorks: ["NODE", "INIT", "INSTALL", "CONFIG", "COMPILE"],
    example: {
      title: "Premier projet compilé",
      steps: [
        "mkdir mon-projet puis npm init -y",
        "npm install -D typescript",
        "npx tsc --init pour générer le tsconfig",
        "Écrire src/index.ts : const message: string = 'Bonjour'",
        "npx tsc puis node dist/index.js",
      ],
    },
    projectsDetailed: [
      {
        title: "Squelette de projet réutilisable",
        flow: "Dossier → package.json → tsconfig → Scripts npm → README",
      },
      {
        title: "Script de build",
        flow: "npm script → tsc → dist/ → node → Vérification",
      },
    ],
  },
  tsc: {
  learning: LEARNING_TSC,
  setup: {
    install: [
      "Inclus dans le paquet `typescript` : `npm install -D typescript`.",
      "Aucune installation globale nécessaire : on l'appelle via `npx tsc`.",
    ],
    configure: [
      "Tout se pilote depuis tsconfig.json : fichiers inclus, cible, niveau de strictness.",
      "Options clés : `noEmit` (vérifier sans compiler), `watch`, `declaration` (générer les .d.ts).",
    ],
    workflow: [
      "Vérification rapide : `npx tsc --noEmit`.",
      "Mettre `tsc --noEmit` dans la CI : aucun code mal typé ne passe.",
      "Ne jamais masquer une erreur avec `as any` : corriger le type, pas le compilateur.",
    ],
    editors: [
      "VS Code : les erreurs tsc s'affichent en direct dans l'éditeur.",
      "Aligner la version TS de VS Code sur celle du projet (Use Workspace Version).",
    ],
  },
    definition:
      "TSC (TypeScript Compiler) est le compilateur officiel : il lit les fichiers .ts, vérifie la cohérence des types, puis émet du JavaScript. Il effectue deux tâches distinctes — vérifier et transpiler — qu'il faut comprendre séparément.",
    whyLearn:
      "Chaque erreur affichée dans l'éditeur vient de tsc. Comprendre ses options (target, module, strict) permet de lire ses messages comme des indications précises plutôt que comme des obstacles.",
    prerequisiteNotes: {
      installation:
        "Avoir un projet avec TypeScript installé pour exécuter tsc en local.",
    },
    conceptDetails: [
      {
        name: "Vérification de types",
        definition:
          "tsc contrôle que chaque valeur respecte son type déclaré ou inféré, avant toute exécution. Une erreur de type bloque l'émission par défaut.",
      },
      {
        name: "Transpilation",
        definition:
          "tsc convertit la syntaxe moderne (et supprime les annotations) vers la version de JavaScript choisie via target. Les types n'existent jamais à l'exécution.",
      },
      {
        name: "Option target",
        definition:
          "target choisit la version d'ECMAScript du JavaScript émis (ES2020, ES2022…). Plus la cible est récente, moins tsc transforme le code.",
      },
      {
        name: "Fichiers .d.ts",
        definition:
          "Les fichiers de déclaration décrivent les types d'un code JavaScript existant, sans en contenir l'implémentation. tsc peut aussi les générer (declaration: true).",
      },
      {
        name: "Mode watch",
        definition:
          "Avec --watch, tsc recompile à chaque sauvegarde. C'est la boucle de feedback rapide pendant le développement.",
      },
    ],
    howItWorksTitle: "Le cycle du compilateur",
    howItWorks: ["SOURCES .ts", "ANALYSE", "VÉRIFICATION", "ÉMISSION .js", "EXÉCUTION"],
    example: {
      title: "Compiler vers différentes cibles",
      steps: [
        "Écrire une fonction utilisant async/await et le spread",
        "Compiler avec --target ES5 : observer les helpers générés",
        "Compiler avec --target ES2022 : comparer la sortie",
        "Introduire une erreur de type et lire le message de tsc",
        "Corriger puis recompiler en mode --watch",
      ],
    },
    projectsDetailed: [
      {
        title: "Explorateur de cibles",
        flow: "Source TS → tsc multi-cibles → Diff des sorties → Notes",
      },
      {
        title: "Catalogue d'erreurs",
        flow: "Code fautif → Message tsc → Diagnostic → Correction",
      },
    ],
  },
  tsconfig: {
  learning: LEARNING_TSCONFIG,
  setup: {
    install: [
      "Généré automatiquement : `npx tsc --init`.",
    ],
    configure: [
      "`strict: true` : active tous les contrôles stricts d'un coup.",
      "`target: ES2022` : JavaScript moderne en sortie.",
      "`module` + `moduleResolution: NodeNext` : imports compatibles Node.",
      "`include: [\"src\"]`, `exclude: [\"node_modules\", \"dist\"]`.",
      "`outDir: dist`, `rootDir: src`, `sourceMap: true` pour debugger le TS d'origine.",
    ],
    workflow: [
      "Un tsconfig par paquet dans un monorepo, liés par `references` + `tsc -b`.",
      "Valider le fichier avec `npx tsc --showConfig` (configuration résolue).",
    ],
    editors: [
      "VS Code applique le tsconfig du projet automatiquement.",
      "Autocomplétion des options grâce au schéma JSON intégré.",
    ],
  },
    definition:
      "tsconfig.json est le fichier de configuration du compilateur : il déclare quels fichiers compiler, avec quelles options de rigueur et vers quelle cible. C'est le contrat qualité du projet.",
    whyLearn:
      "Deux projets TypeScript peuvent se comporter très différemment selon leur tsconfig : strict ou permissif, alias de chemins ou non. Savoir le lire et l'écrire, c'est contrôler l'exigence de votre base de code.",
    prerequisiteNotes: {
      tsc: "Comprendre le rôle du compilateur que ce fichier configure.",
    },
    conceptDetails: [
      {
        name: "target & module",
        definition:
          "target fixe la version JS émise ; module choisit le système de modules (CommonJS, ESNext, NodeNext). Ils doivent correspondre à l'environnement d'exécution.",
      },
      {
        name: "strict",
        definition:
          "Le mode strict active d'un coup toutes les vérifications exigeantes (null checks, noImplicitAny…). À activer dès le début d'un projet.",
      },
      {
        name: "include / exclude",
        definition:
          "Ces motifs glob définissent les fichiers pris en compte par tsc — typiquement src inclus, node_modules et dist exclus.",
      },
      {
        name: "lib",
        definition:
          "lib liste les définitions de l'environnement (DOM, ES2022…). Sans DOM, document n'existe pas pour le compilateur.",
      },
      {
        name: "paths & baseUrl",
        definition:
          "Les alias de chemins (@/components/…) remplacent les imports relatifs interminables (../../../). Ils exigent une résolution cohérente côté bundler.",
      },
    ],
    howItWorksTitle: "Configurer un projet",
    howItWorks: ["INIT", "TARGET", "STRICT", "CHEMINS", "VÉRIF"],
    example: {
      title: "tsconfig strict avec alias",
      steps: [
        "npx tsc --init pour générer la base",
        "Passer strict à true et target à ES2022",
        "Ajouter baseUrl et paths pour l'alias @/*",
        "Restreindre include à src/**/*",
        "Compiler et corriger les nouvelles erreurs strictes",
      ],
    },
    projectsDetailed: [
      {
        title: "tsconfig de référence",
        flow: "Besoins → Options → Documentation → Modèle réutilisable",
      },
      {
        title: "Migration vers strict",
        flow: "strict:false → Activation progressive → Corrections → strict:true",
      },
    ],
  },
  editeur: {
  learning: LEARNING_EDITEUR,
  setup: {
    install: [
      "Télécharger VS Code depuis code.visualstudio.com (Windows, macOS, Linux).",
      "L'installer via le gestionnaire de paquets pour les mises à jour auto : `winget`, `brew` ou dépôt apt.",
    ],
    configure: [
      "`settings.json` : `\"editor.formatOnSave\": true`, `\"editor.defaultFormatter\": \"esbenp.prettier-vscode\"`.",
      "Régler `editor.tabSize: 2` pour le JS/TS.",
      "Activer `typescript.preferGoToSourceDefinition` pour naviguer au source plutôt qu'aux .d.ts.",
    ],
    workflow: [
      "Terminal intégré (`Ctrl+``) : compiler sans quitter l'éditeur.",
      "Déboguer avec un `launch.json` : points d'arrêt directs dans le .ts.",
      "Palette de commandes `Ctrl+Maj+P` : tout est accessible au clavier.",
      "Renommer un symbole avec `F2` : le refactoring suit les types.",
    ],
    editors: [
      "VS Code : le meilleur support TypeScript, gratuit.",
      "Extensions indispensables : ESLint, Prettier, Error Lens, GitLens, Pretty TypeScript Errors.",
      "WebStorm : alternative payante, tout intégré sans extensions.",
      "Zed ou Neovim : pour les machines légères ou les puristes du clavier.",
    ],
  },
    definition:
      "L'outillage éditeur (VS Code en pratique) exploite le serveur de langage TypeScript : erreurs soulignées en temps réel, autocomplétion contextuelle, renommage et navigation sûrs dans tout le projet.",
    whyLearn:
      "La moitié de la valeur de TypeScript se vit dans l'éditeur : une erreur vue à la frappe coûte dix fois moins cher qu'une erreur vue en production. Un éditeur bien réglé, c'est un filet permanent.",
    prerequisiteNotes: {
      installation: "Avoir un projet TypeScript ouvert dans l'éditeur.",
    },
    conceptDetails: [
      {
        name: "Serveur de langage",
        definition:
          "tsserver analyse le projet en continu et fournit à l'éditeur erreurs, complétions et définitions. VS Code l'intègre nativement.",
      },
      {
        name: "Refactoring sûr",
        definition:
          "Renommer un symbole ou extraire une fonction met à jour toutes les occurrences typées : le compilateur garantit qu'aucun usage n'est oublié.",
      },
      {
        name: "typescript-eslint",
        definition:
          "Le plugin ESLint officiel applique des règles de qualité spécifiques à TypeScript (pas de any implicite, conventions de nommage…).",
      },
      {
        name: "Débogage source",
        definition:
          "Les source maps relient le JS exécuté au TS source : on pose des breakpoints directement dans le code TypeScript.",
      },
    ],
    howItWorksTitle: "Boucle de développement",
    howItWorks: ["FRAPPE", "ANALYSE", "ERREUR", "CORRECTION", "REFACTOR"],
    example: {
      title: "Renommage global sans risque",
      steps: [
        "Ouvrir un projet avec une fonction utilisée à dix endroits",
        "F2 sur son nom et le renommer",
        "Constater la mise à jour de tous les appels",
        "Lancer tsc --noEmit : zéro erreur",
        "Comparer avec un renommage manuel (recherche/remplace)",
      ],
    },
    projectsDetailed: [
      {
        title: "VS Code aux petits oignons",
        flow: "Extensions → Paramètres → ESLint → Raccourcis → Export",
      },
      {
        title: "Session de refactoring",
        flow: "Code dupliqué → Extraction → Renommage → tsc --noEmit",
      },
    ],
  },
  "types-base": {
  learning: LEARNING_TYPES_BASE,
  setup: {
    install: [
      "Aucune installation supplémentaire : les types de base sont natifs à TypeScript.",
    ],
    configure: [
      "Activer `strict: true` dans tsconfig.json pour que les types soient vraiment vérifiés.",
    ],
    workflow: [
      "Typer les paramètres et retours de fonctions ; laisser l'inférence faire le reste.",
      "Survoler une variable pour voir le type inféré par le compilateur.",
      "Lire chaque erreur de type comme une information, pas comme une punition.",
    ],
    editors: [
      "VS Code : infobulle de type au survol, `F12` pour aller à la définition du type.",
    ],
  },
    definition:
      "Les types de base annotent les valeurs : string, number, boolean, tableaux, tuples, enums, ainsi que les types spéciaux any, unknown et never. L'inférence permet souvent de ne pas tout écrire explicitement.",
    whyLearn:
      "C'est le vocabulaire quotidien : 80 % du typage d'une application tient dans ces types. Les maîtriser, c'est passer d'un code « qui marche » à un code « prouvé correct » par le compilateur.",
    prerequisiteNotes: {
      tsc: "Savoir que tsc vérifie les annotations avant d'émettre le JS.",
    },
    conceptDetails: [
      {
        name: "Annotations",
        definition:
          "La syntaxe `const n: number = 1` déclare explicitement le type. Elle documente l'intention et déclenche la vérification.",
      },
      {
        name: "Inférence",
        definition:
          "TypeScript déduit le type quand il est évident (`const n = 1` → number). Inutile d'annoter partout : l'inférence garde le code concis.",
      },
      {
        name: "Tuples",
        definition:
          "Un tuple `[string, number]` est un tableau de longueur et de types fixés — utile pour les paires clé/valeur ou les retours multiples.",
      },
      {
        name: "any vs unknown",
        definition:
          "any désactive toute vérification (à bannir) ; unknown impose un contrôle avant usage. unknown est l'alternative sûre pour les données externes.",
      },
      {
        name: "Enums",
        definition:
          "Les enums nomment un ensemble fini de valeurs (jours, statuts). Les unions de littéraux sont souvent préférables, plus légères.",
      },
    ],
    howItWorksTitle: "Typer au quotidien",
    howItWorks: ["ANNOTER", "INFÉRER", "VÉRIFIER", "CORRIGER", "BANNIR any"],
    example: {
      title: "Fonctions utilitaires typées",
      steps: [
        "Écrire une fonction formatPrice sans types",
        "Ajouter les annotations de paramètres et de retour",
        "Laisser tsc détecter un appel avec un mauvais type",
        "Remplacer un any par unknown + garde de type",
        "Vérifier avec tsc --noEmit",
      ],
    },
    projectsDetailed: [
      {
        title: "Chasse au any",
        flow: "Fichier JS → Annotations → unknown → Gardes → tsc propre",
      },
      {
        title: "Kata de typage",
        flow: "Exercices → Inférence → Tuples → Enums → Revue",
      },
    ],
  },
  interfaces: {
  learning: LEARNING_INTERFACES,
  setup: {
    install: [
      "Natif à TypeScript, rien à installer.",
    ],
    configure: [
      "Convention : nommer les interfaces en PascalCase (`User`, `ApiResponse`).",
      "Préférer `interface` pour les objets, `type` pour les unions et utilitaires.",
    ],
    workflow: [
      "Définir les formes de données (API, props) avant d'écrire la logique.",
      "Étendre avec `extends`, composer avec l'intersection `&`.",
    ],
    editors: [
      "VS Code : « Implement interface » génère le squelette d'une classe.",
      "Renommage `F2` : toutes les utilisations suivent.",
    ],
  },
    definition:
      "Les interfaces (et les alias de type) décrivent la forme des objets : quelles propriétés, de quel type, obligatoires ou non. Elles transforment des objets anonymes en contrats explicites.",
    whyLearn:
      "Les applications manipulent des objets partout : utilisateurs, réponses d'API, options. Sans interfaces, ces formes restent implicites et chaque fonction les devine — source d'erreurs et de documentation manquante.",
    prerequisiteNotes: {
      "types-base":
        "Connaître les types primitifs pour décrire les propriétés.",
    },
    conceptDetails: [
      {
        name: "interface",
        definition:
          "Une interface nomme la forme d'un objet : `interface User { name: string }`. Elle se fusionne par déclaration et s'étend avec extends.",
      },
      {
        name: "Alias de type",
        definition:
          "Un alias `type ID = string | number` nomme n'importe quel type, pas seulement des objets. Complémentaire des interfaces.",
      },
      {
        name: "Propriétés optionnelles",
        definition:
          "Le marqueur `?` rend une propriété facultative (`email?: string`). Le compilateur force alors à gérer son absence.",
      },
      {
        name: "readonly",
        definition:
          "readonly interdit la réassignation d'une propriété après création : une garantie précieuse pour les données partagées.",
      },
      {
        name: "Extension & intersection",
        definition:
          "extends combine des interfaces ; l'intersection `A & B` fusionne des types. Deux façons de composer des formes complexes.",
      },
    ],
    howItWorksTitle: "Modéliser un domaine",
    howItWorks: ["DONNÉES", "FORMES", "COMPOSITION", "CONTRATS", "USAGE"],
    example: {
      title: "Modéliser une réponse d'API",
      steps: [
        "Copier un JSON réel de réponse",
        "Décrire sa forme en interfaces (imbriquées si besoin)",
        "Typer la fonction fetch qui la retourne : Promise<ApiResponse>",
        "Rendre optionnels les champs parfois absents",
        "Laisser tsc signaler les accès à des champs inexistants",
      ],
    },
    projectsDetailed: [
      {
        title: "Schéma de domaine complet",
        flow: "Entités → Interfaces → Relations → Validation → tsc",
      },
      {
        title: "Types partagés",
        flow: "Dossier shared → Alias → Imports → Cohérence front/back",
      },
    ],
  },
  fonctions: {
  learning: LEARNING_FONCTIONS,
  setup: {
    install: [
      "Natif à TypeScript, rien à installer.",
    ],
    configure: [
      "Avec `strict`, les paramètres implicites `any` sont interdits : tout est typé.",
    ],
    workflow: [
      "Typer paramètres et valeur de retour : `(a: number, b: number): number`.",
      "Utiliser les signatures de surcharge pour les API à formes multiples.",
      "Préférer les fonctions fléchées typées pour les callbacks.",
    ],
    editors: [
      "VS Code : l'autocomplétion suggère les paramètres attendus pendant la frappe.",
    ],
  },
    definition:
      "Typer les fonctions, c'est décrire leurs paramètres et leur valeur de retour, gérer les paramètres optionnels et, si besoin, déclarer plusieurs signatures via les surcharges. Chaque appel est alors vérifié.",
    whyLearn:
      "Les fonctions sont les frontières de votre code : c'est là que les mauvaises données entrent. Des signatures précises transforment les erreurs d'exécution en erreurs de compilation.",
    prerequisiteNotes: {
      "types-base":
        "Maîtriser annotations et inférence pour écrire des signatures lisibles.",
    },
    conceptDetails: [
      {
        name: "Signatures",
        definition:
          "Une signature `(a: string, b: number) => boolean` décrit les entrées et la sortie. Le compilateur vérifie chaque appel contre elle.",
      },
      {
        name: "Paramètres optionnels & défauts",
        definition:
          "`b?: number` ou `b = 0` rendent un paramètre facultatif. L'ordre compte : les optionnels viennent après les obligatoires.",
      },
      {
        name: "Surcharges",
        definition:
          "Plusieurs signatures pour une implémentation permettent des comportements différents selon les arguments — à utiliser avec parcimonie.",
      },
      {
        name: "Typage de this",
        definition:
          "Dans les méthodes, `this` peut être typé explicitement pour éviter les surprises quand la fonction est détachée de son objet.",
      },
      {
        name: "Callbacks typés",
        definition:
          "Typer les fonctions passées en argument garantit que l'appelant et l'appelé s'accordent sur les données échangées.",
      },
    ],
    howItWorksTitle: "Des fonctions sûres",
    howItWorks: ["SIGNER", "OPTIONNELS", "SURCHARGER", "VÉRIFIER", "RÉUTILISER"],
    example: {
      title: "Bibliothèque de helpers",
      steps: [
        "Écrire debounce et throttle en JavaScript",
        "Ajouter les signatures avec génériques simples",
        "Typer les callbacks et leurs paramètres",
        "Tester les appels incorrects : tsc doit protester",
        "Documenter chaque helper par sa signature",
      ],
    },
    projectsDetailed: [
      {
        title: "Utils typés",
        flow: "Besoins → Signatures → Implémentation → Tests → tsc",
      },
      {
        title: "Gestionnaires d'événements",
        flow: "DOM → Types d'événements → Callbacks → Vérification",
      },
    ],
  },
};
const EXTRA: Record<string, SkillGuide> = {
  unions: {
  learning: LEARNING_UNIONS,
  setup: {
    install: [
      "Natif à TypeScript, rien à installer.",
    ],
    configure: [
      "`strictNullChecks` (inclus dans `strict`) rend les unions avec `null` / `undefined` explicites.",
    ],
    workflow: [
      "Modéliser les états finis : `type Status = \"idle\" | \"loading\" | \"error\"`.",
      "Réduire avec `typeof`, `in` ou les fonctions garde (`isString(x): x is string`).",
      "Laisser le compilateur signaler les cas non traités dans un `switch`.",
    ],
    editors: [
      "VS Code : le narrowing est visible — le type affiné s'affiche au survol après un test.",
    ],
  },
    definition:
      "Les union types expriment qu'une valeur peut être de plusieurs types (`string | number`) ; les types littéraux restreignent à des valeurs exactes (`'draft' | 'published'`). Le narrowing permet au compilateur de resserrer le type au fil des vérifications.",
    whyLearn:
      "Les états réels sont rarement binaires : chargement, succès, erreur. Les unions modélisent cette réalité et le narrowing garantit que chaque cas est traité — le compilateur devient exhaustif à votre place.",
    prerequisiteNotes: {
      interfaces:
        "Savoir décrire des objets pour construire des unions d'interfaces.",
      fonctions:
        "Comprendre les signatures pour typer les retours multiples.",
    },
    conceptDetails: [
      {
        name: "Union types",
        definition:
          "La syntaxe `A | B` autorise plusieurs types pour une valeur. Le compilateur n'autorise que les opérations valables pour tous les membres.",
      },
      {
        name: "Types littéraux",
        definition:
          "Un littéral comme `'success'` est un type à une seule valeur. Combiné aux unions, il modélise des états finis précis.",
      },
      {
        name: "Narrowing",
        definition:
          "Après un test (typeof, in, ===), TypeScript resserre automatiquement le type dans la branche. C'est l'analyse de flux de contrôle.",
      },
      {
        name: "Unions discriminées",
        definition:
          "Des interfaces partageant un champ discriminant (`kind: 'a' | 'b'`) permettent un switch exhaustif : aucun cas ne peut être oublié.",
      },
      {
        name: "never",
        definition:
          "never représente l'impossible (fonction qui ne retourne jamais). Dans un switch exhaustif, il prouve qu'aucun cas ne manque.",
      },
    ],
    howItWorksTitle: "Rendre les états exhaustifs",
    howItWorks: ["UNION", "DISCRIMINANT", "SWITCH", "NARROWING", "never"],
    example: {
      title: "Machine à états typée",
      steps: [
        "Définir trois interfaces : Loading, Success, Failure",
        "Les unir avec un champ discriminant status",
        "Écrire un switch sur status",
        "Constater le narrowing dans chaque case",
        "Ajouter un check never en default pour l'exhaustivité",
      ],
    },
    projectsDetailed: [
      {
        title: "Gestion d'état d'une page",
        flow: "États → Union discriminée → Rendu → Exhaustivité → tsc",
      },
      {
        title: "Résultats d'opérations",
        flow: "Ok/Err → Fonctions → Pattern matching → Tests",
      },
    ],
  },
  generiques: {
  learning: LEARNING_GENERIQUES,
  setup: {
    install: [
      "Natif à TypeScript, rien à installer.",
    ],
    configure: [
      "Contraindre avec `extends` : `function first<T extends { id: string }>(arr: T[])`.",
      "Fournir des défauts : `interface Box<T = string>`.",
    ],
    workflow: [
      "Créer des fonctions utilitaires réutilisables sans perdre le typage.",
      "Typer les wrappers : fetch générique, cache, store.",
    ],
    editors: [
      "VS Code : l'inférence des génériques s'affiche au survol de l'appel.",
    ],
  },
    definition:
      "Les génériques paramètrent les types : `function identity<T>(x: T): T` fonctionne pour n'importe quel T tout en conservant le typage précis. C'est l'abstraction au niveau des types.",
    whyLearn:
      "Sans génériques, on duplique du code ou on retombe sur any. Avec eux, une seule fonction utilitaire, un seul composant, un seul client d'API restent parfaitement typés pour chaque usage.",
    prerequisiteNotes: {
      unions:
        "Comprendre les unions aide à contraindre les paramètres génériques.",
    },
    conceptDetails: [
      {
        name: "Paramètres de type",
        definition:
          "Le paramètre `<T>` est une variable de type : il capture le type réel à l'appel et le réutilise dans la signature.",
      },
      {
        name: "Contraintes extends",
        definition:
          "`<T extends { id: string }>` limite T aux types compatibles : on garde la flexibilité tout en exigeant une forme minimale.",
      },
      {
        name: "Génériques multiples",
        definition:
          "Plusieurs paramètres (`<K, V>`) typent des relations entre valeurs, comme les clés et valeurs d'un objet.",
      },
      {
        name: "Inférence des arguments",
        definition:
          "Le compilateur déduit souvent T depuis les arguments : `identity('x')` donne string sans annotation explicite.",
      },
    ],
    howItWorksTitle: "Abstraire sans perdre les types",
    howItWorks: ["PARAMÈTRE", "CONTRAINTE", "INFÉRENCE", "RÉUTILISATION", "COMPOSITION"],
    example: {
      title: "Client d'API générique",
      steps: [
        "Écrire fetchJson sans types (retour any)",
        "Paramétrer : async function fetchJson<T>(url: string): Promise<T>",
        "Appeler avec fetchJson<User[]> : le retour est typé",
        "Ajouter une contrainte sur les options",
        "Constater l'autocomplétion sur le résultat",
      ],
    },
    projectsDetailed: [
      {
        title: "Boîte à outils générique",
        flow: "map/filter → get → groupBy → Tests typés",
      },
      {
        title: "Store typé",
        flow: "État générique → Actions → Sélecteurs → Usage",
      },
    ],
  },
  "utility-types": {
  learning: LEARNING_UTILITY_TYPES,
  setup: {
    install: [
      "Natifs, disponibles sans import.",
    ],
    configure: [
      "Rien à configurer : `Partial`, `Pick`, `Omit`, `Record`, `ReturnType` sont globaux.",
    ],
    workflow: [
      "Dériver des variantes : `Partial<User>` pour un formulaire d'édition.",
      "`Pick<User, \"id\" | \"name\">` pour exposer un sous-ensemble.",
      "`Record<string, T>` pour les dictionnaires typés.",
    ],
    editors: [
      "VS Code : `Ctrl+clic` sur `Partial` ouvre sa définition dans lib.es5.d.ts.",
    ],
  },
    definition:
      "Les utility types sont des types prédéfinis qui transforment d'autres types : Partial rend tout optionnel, Pick extrait un sous-ensemble, Omit en retire, Record construit des dictionnaires typés.",
    whyLearn:
      "Ils évitent de redéclarer des variantes d'interfaces à la main (User, UserUpdate, UserPreview…). Un seul type source, des dérivations automatiques : moins de duplication, plus de cohérence.",
    prerequisiteNotes: {
      generiques:
        "Les utilitaires sont eux-mêmes génériques : comprendre <T> pour les utiliser.",
    },
    conceptDetails: [
      {
        name: "Partial / Required",
        definition:
          "Partial<T> rend toutes les propriétés optionnelles (formulaires en cours d'édition) ; Required<T> fait l'inverse.",
      },
      {
        name: "Pick / Omit",
        definition:
          "Pick<T, 'a'|'b'> ne garde que certaines clés ; Omit<T, 'secret'> les retire. Idéal pour les DTO d'API.",
      },
      {
        name: "Record",
        definition:
          "Record<Keys, Value> type un objet dictionnaire : `Record<Role, string[]>` associe chaque rôle à une liste.",
      },
      {
        name: "ReturnType / Parameters",
        definition:
          "Ces utilitaires extraient le type de retour ou des paramètres d'une fonction existante — sans la réécrire.",
      },
      {
        name: "Awaited",
        definition:
          "Awaited<Promise<T>> donne T : il « déballe » les promesses imbriquées pour typer les résultats async.",
      },
    ],
    howItWorksTitle: "Dériver plutôt que dupliquer",
    howItWorks: ["SOURCE", "TRANSFORMER", "DÉRIVER", "UTILISER", "ÉVOLUER"],
    example: {
      title: "DTO d'API",
      steps: [
        "Définir l'interface User complète",
        "Créer UserCreate = Omit<User, 'id' | 'createdAt'>",
        "Créer UserUpdate = Partial<UserCreate>",
        "Typer les endpoints avec ces dérivés",
        "Ajouter un champ à User : tout suit automatiquement",
      ],
    },
    projectsDetailed: [
      {
        title: "Couche API typée",
        flow: "Modèles → DTO dérivés → Endpoints → Validation",
      },
      {
        title: "Formulaires dynamiques",
        flow: "État Partial → Champs → Soumission Required → tsc",
      },
    ],
  },
  "types-avances": {
  learning: LEARNING_TYPES_AVANCES,
  setup: {
    install: [
      "Natifs à TypeScript, rien à installer.",
    ],
    configure: [
      "Monter `target` à ES2019+ pour les motifs avancés bien supportés.",
    ],
    workflow: [
      "Mapped types : transformer un type existant (`{ [K in keyof T]: boolean }`).",
      "Conditional types : `T extends U ? X : Y` pour la logique de types.",
      "Lire les types des bibliothèques (Zod, tRPC) : c'est la meilleure école.",
    ],
    editors: [
      "VS Code + extension Pretty TypeScript Errors : rend les erreurs de types complexes lisibles.",
    ],
  },
    definition:
      "Les types avancés programment le système de types : les mapped types transforment chaque propriété, les conditional types branchent selon une condition, infer extrait des types, les template literal types calculent des chaînes.",
    whyLearn:
      "C'est le niveau qui distingue un utilisateur de TypeScript d'un concepteur : écrire des bibliothèques dont les types s'adaptent, valider des conventions au compile-time, automatiser ce que les autres font à la main.",
    prerequisiteNotes: {
      "utility-types":
        "Les utilitaires sont des exemples de mapped/conditional types à comprendre d'abord.",
    },
    conceptDetails: [
      {
        name: "Mapped types",
        definition:
          "La syntaxe `{ [K in keyof T]: … }` reconstruit un objet en transformant chaque propriété : c'est ainsi que Partial est implémenté.",
      },
      {
        name: "Conditional types",
        definition:
          "`T extends U ? X : Y` choisit un type selon une condition. Couplé aux unions, il distribue le test sur chaque membre.",
      },
      {
        name: "infer",
        definition:
          "infer capture un type à l'intérieur d'un pattern : `T extends Promise<infer U> ? U : T` extrait le type contenu d'une promesse.",
      },
      {
        name: "Template literal types",
        definition:
          "Les littéraux de gabarit au niveau des types (``on${Event}`)`) génèrent des unions de chaînes : routes, noms d'événements, clés.",
      },
      {
        name: "Types récursifs",
        definition:
          "Un type peut se référencer lui-même (JSON, arbres) : utile pour les structures imbriquées comme DeepPartial.",
      },
    ],
    howItWorksTitle: "Calculer des types",
    howItWorks: ["MAPPER", "BRANCHER", "EXTRAIRE", "COMPOSER", "VALIDER"],
    example: {
      title: "DeepPartial maison",
      steps: [
        "Partir de Partial<T> (un seul niveau)",
        "Écrire le mapped type récursif sur les objets",
        "Tester sur une interface imbriquée à trois niveaux",
        "Comparer avec l'utilitaire fourni par une librairie",
        "L'utiliser pour un patch partiel d'API",
      ],
    },
    projectsDetailed: [
      {
        title: "Routeur typé",
        flow: "Routes littérales → Params extraits → Handlers → tsc",
      },
      {
        title: "Validateur de schéma",
        flow: "Schéma → Type inféré → Validation → Erreurs typées",
      },
    ],
  },
  modules: {
  learning: LEARNING_MODULES,
  setup: {
    install: [
      "Natif ; l'écosystème npm fournit les modules tiers.",
    ],
    configure: [
      "`moduleResolution: NodeNext` + `\"type\": \"module\"` : imports ES modernes.",
      "Utiliser les `paths` du tsconfig pour les alias (`@/*` vers `src/*`).",
    ],
    workflow: [
      "Un module = une responsabilité ; exposer l'API publique via un `index.ts` (barrel).",
      "Imports relatifs courts grâce aux alias de chemins.",
    ],
    editors: [
      "VS Code : auto-import automatique, déplacement de fichier qui réécrit les imports.",
    ],
  },
    definition:
      "Les modules organisent le code en fichiers aux dépendances explicites : import et export, stratégies de résolution, barrel files pour simplifier les imports, fichiers de déclaration pour typer l'existant.",
    whyLearn:
      "Un projet TypeScript grandit vite : sans organisation, les imports deviennent un labyrinthe et les cycles de dépendances apparaissent. Les modules sont l'architecture invisible qui garde le projet navigable.",
    prerequisiteNotes: {
      unions:
        "Avoir des types à organiser : interfaces et unions à répartir.",
    },
    conceptDetails: [
      {
        name: "import / export",
        definition:
          "export expose, import consomme. Les exports nommés sont préférables aux défauts : ils se renomment et se vérifient mieux.",
      },
      {
        name: "Résolution de modules",
        definition:
          "moduleResolution définit comment tsc trouve les fichiers (node, bundler, nodenext). Elle doit refléter l'environnement réel.",
      },
      {
        name: "Barrel files",
        definition:
          "Un index.ts qui réexporte un dossier simplifie les imports (`@/models`). À doser : trop de barrels ralentissent l'analyse.",
      },
      {
        name: "Fichiers de déclaration",
        definition:
          "Les .d.ts décrivent les types d'un module sans son code : pour typer une librairie JS ou exposer une API publique.",
      },
    ],
    howItWorksTitle: "Structurer un projet",
    howItWorks: ["DÉCOUPER", "EXPORTER", "RÉSOUDRE", "SIMPLIFIER", "DÉCLARER"],
    example: {
      title: "Découper un projet monolithique",
      steps: [
        "Partir d'un fichier de 800 lignes",
        "Identifier les domaines (types, api, utils)",
        "Créer un module par domaine avec exports nommés",
        "Ajouter un barrel par dossier",
        "Vérifier l'absence de cycles avec tsc",
      ],
    },
    projectsDetailed: [
      {
        title: "Architecture en couches",
        flow: "Domain → Application → Infra → Dépendances → Règles",
      },
      {
        title: "Librairie publiable",
        flow: "API publique → .d.ts → package → Test d'import",
      },
    ],
  },
  strict: {
  learning: LEARNING_STRICT,
  setup: {
    install: [
      "Natif : c'est une option du compilateur, rien à installer.",
    ],
    configure: [
      "`strict: true` dans tsconfig.json (active strictNullChecks, noImplicitAny, etc.).",
      "Aller plus loin : `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.",
    ],
    workflow: [
      "Corriger les erreurs une à une en activant le strict sur un projet existant.",
      "Bannir `any` : utiliser `unknown` + narrowing quand le type est inconnu.",
    ],
    editors: [
      "VS Code : chaque violation du mode strict est soulignée en direct pendant la frappe.",
    ],
  },
    definition:
      "Le mode strict active les vérifications les plus rigoureuses de tsc, dont strictNullChecks : null et undefined deviennent des valeurs à traiter explicitement, et l'implicite any est interdit.",
    whyLearn:
      "La majorité des bugs d'exécution viennent de null inattendus et de types implicites. Le mode strict déplace ces bugs au moment de la compilation — c'est le plus grand gain de TypeScript.",
    prerequisiteNotes: {
      "types-avances":
        "Comprendre les types fins pour satisfaire les vérifications strictes.",
      modules:
        "Avoir un projet structuré sur lequel activer strict.",
    },
    conceptDetails: [
      {
        name: "strictNullChecks",
        definition:
          "Avec cette option, `string` n'accepte plus null : il faut écrire `string | null` et tester avant usage. Fini les Cannot read properties of null.",
      },
      {
        name: "noImplicitAny",
        definition:
          "Interdit les any implicites : chaque paramètre, chaque variable ambiguë doit être typée. Le code devient auto-documenté.",
      },
      {
        name: "Contrôle de flux",
        definition:
          "tsc suit l'affectation des variables : après un test `if (x != null)`, x est resserré. Le strict exploite cette analyse au maximum.",
      },
      {
        name: "Assertions",
        definition:
          "L'opérateur `!` affirme la non-nullité, `as` convertit. Ce sont des échappatoires : chacun doit être justifié, jamais systématique.",
      },
    ],
    howItWorksTitle: "Rendre le code infaillible",
    howItWorks: ["ACTIVER", "RÉVÉLER", "TRAITER", "JUSTIFIER", "GARDER"],
    example: {
      title: "Activer strict sur un projet",
      steps: [
        "Passer strict à true dans tsconfig",
        "Lancer tsc et lister les erreurs par catégorie",
        "Corriger les strictNullChecks (gardes explicites)",
        "Typer les any implicites révélés",
        "Interdire les nouveaux `!` via ESLint",
      ],
    },
    projectsDetailed: [
      {
        title: "Zéro non-null assertion",
        flow: "Recherche `!` → Gardes → Refactor → Règle ESLint",
      },
      {
        title: "Gestion d'erreurs totale",
        flow: "unknown → Narrowing → Exhaustivité → Tests",
      },
    ],
  },
  outillage: {
  learning: LEARNING_OUTILLAGE,
  setup: {
    install: [
      "ESLint : `npm install -D eslint @eslint/js typescript-eslint`.",
      "Prettier : `npm install -D prettier`.",
      "Vitest : `npm install -D vitest`.",
    ],
    configure: [
      "`eslint.config.js` avec le preset recommandé de `typescript-eslint`.",
      "`.prettierrc` : `singleQuote: true, semi: true` (ou les choix de l'équipe).",
      "`vitest.config.ts` minimal pour les tests unitaires.",
    ],
    workflow: [
      "`npm run lint`, `npm run format`, `npm test` : les trois portes de la CI.",
      "Corriger le lint avant de committer, pas après.",
    ],
    editors: [
      "VS Code : extensions ESLint (correction à la sauvegarde), Prettier (formatage à la sauvegarde), Vitest (lancer les tests depuis l'éditeur).",
    ],
  },
    definition:
      "L'outillage complète les types : ESLint avec le parser TypeScript détecte les mauvaises pratiques, Prettier uniformise le format, Vitest ou Jest exécutent des tests typés, la CI enchaîne le tout à chaque commit.",
    whyLearn:
      "Les types vérifient la cohérence, pas la logique : un test reste indispensable. Et sans lint ni formatage, même un code bien typé devient illisible à plusieurs.",
    prerequisiteNotes: {
      tsconfig:
        "Un tsconfig propre pour que les outils partagent la même config.",
      editeur:
        "L'éditeur déjà configuré pour voir les retours en direct.",
    },
    conceptDetails: [
      {
        name: "typescript-eslint",
        definition:
          "Le parser et les règles ESLint officiels comprennent la syntaxe TS : no-explicit-any, conventions de nommage, règles type-aware.",
      },
      {
        name: "Prettier",
        definition:
          "Le formateur impose un style unique (guillemets, virgules…). Il élimine les débats de style des revues de code.",
      },
      {
        name: "Vitest / Jest",
        definition:
          "Les frameworks de test exécutent du TypeScript via esbuild ou ts-jest. Les tests eux-mêmes sont typés : les régressions de types sont captées.",
      },
      {
        name: "tsx & ts-node",
        definition:
          "Ces exécuteurs lancent directement du .ts sans étape de build : pratiques pour les scripts et le développement.",
      },
      {
        name: "Intégration continue",
        definition:
          "La CI lance tsc --noEmit, ESLint et les tests à chaque push : aucune régression ne fusionne sans être vue.",
      },
    ],
    howItWorksTitle: "Le filet de sécurité complet",
    howItWorks: ["LINT", "FORMAT", "TEST", "TYPECHECK", "CI"],
    example: {
      title: "Pipeline local complet",
      steps: [
        "Installer typescript-eslint et Prettier",
        "Ajouter les scripts lint, format, test, typecheck",
        "Écrire un test Vitest pour une fonction utilitaire",
        "Introduire volontairement une régression et la voir échouer",
        "Documenter le workflow dans le README",
      ],
    },
    projectsDetailed: [
      {
        title: "CI GitHub Actions",
        flow: "Workflow → Install → typecheck → lint → test → Badge",
      },
      {
        title: "Kit de démarrage",
        flow: "tsconfig → ESLint → Prettier → Vitest → Template",
      },
    ],
  },
  migration: {
  learning: LEARNING_MIGRATION,
  setup: {
    install: [
      "`npm install -D typescript` dans le projet JS existant.",
      "Vérifier que Node et les dépendances sont à jour avant de migrer.",
    ],
    configure: [
      "Créer un tsconfig avec `allowJs: true`, `checkJs: false` au départ.",
      "Activer `checkJs: true` puis `strict: true` fichier par fichier.",
    ],
    workflow: [
      "Renommer les fichiers `.js` → `.ts` un par un, en commençant par les feuilles (sans dépendants).",
      "Ajouter les `@types/*` manquants : `npm install -D @types/node`.",
      "Chaque fichier migré doit compiler avant de passer au suivant.",
    ],
    editors: [
      "VS Code : le mode `checkJs` affiche déjà les erreurs dans les .js.",
      "Utiliser « Rename Symbol » (`F2`) pour fiabiliser les renommages pendant la migration.",
    ],
  },
    definition:
      "Migrer un projet JavaScript vers TypeScript se fait par étapes : autoriser le JS dans la compilation (allowJs), typer module par module en commençant par les feuilles du graphe de dépendances, puis resserrer jusqu'au mode strict.",
    whyLearn:
      "Peu de projets naissent en TypeScript : la compétence la plus demandée en entreprise est de faire migrer l'existant sans arrêter la production. Une migration incrémentale, c'est un risque maîtrisé.",
    prerequisiteNotes: {
      strict:
        "Connaître l'objectif final : un projet en mode strict.",
      outillage:
        "Disposer du lint et des tests pour sécuriser la migration.",
    },
    conceptDetails: [
      {
        name: "allowJs",
        definition:
          "Cette option laisse tsc compiler des .js à côté des .ts : les deux cohabitent pendant la transition, sans big bang.",
      },
      {
        name: "Migration incrémentale",
        definition:
          "On convertit un module à la fois, en commençant par ceux sans dépendances internes. Chaque étape reste déployable.",
      },
      {
        name: "JSDoc vers types",
        definition:
          "Les annotations JSDoc existantes sont comprises par tsc : elles servent de point de départ avant la conversion en vraie syntaxe TS.",
      },
      {
        name: "Typage des dépendances",
        definition:
          "Les librairies JS s'accompagnent de @types/... ou de déclarations locales. Sans elles, les imports restent any.",
      },
      {
        name: "Stratégie par module",
        definition:
          "Prioriser : utilitaires purs d'abord, puis domaine, puis UI. Mesurer la couverture avec tsc --noEmit à chaque étape.",
      },
    ],
    howItWorksTitle: "Migrer sans tout casser",
    howItWorks: ["ALLOWJS", "TYPES EXTERNES", "MODULES", "RESSERRER", "STRICT"],
    example: {
      title: "Migrer un petit projet",
      steps: [
        "Activer allowJs et checkJs dans le tsconfig",
        "Installer les @types des dépendances",
        "Renommer un module feuille en .ts et le typer",
        "Convertir les JSDoc en annotations TypeScript",
        "Répéter module par module jusqu'au strict complet",
      ],
    },
    projectsDetailed: [
      {
        title: "Migration d'une TODO app",
        flow: "JS → allowJs → Modules → Strict → Bilan",
      },
      {
        title: "Plan de migration",
        flow: "Audit → Priorités → Jalons → Risques → Planning",
      },
    ],
  },
};

Object.assign(GUIDES_TYPESCRIPT, EXTRA);

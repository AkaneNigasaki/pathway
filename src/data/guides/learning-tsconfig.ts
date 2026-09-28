import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de « tsconfig — configurer TypeScript » : le fichier
 * qui pilote le compilateur — structure, options essentielles, cas avancés.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_TSCONFIG: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "`tsconfig.json` est le fichier de configuration de TypeScript : il dit à `tsc` quels fichiers compiler et comment.",
    blocks: [
      {
        kind: "text",
        text: "Un projet TypeScript sans `tsconfig.json`, c'est un compilateur sans instructions : il faut tout lui passer en flags à chaque appel. Le fichier centralise tout — les fichiers à inclure, la sévérité des vérifications, la version de JavaScript à produire — dans un format versionné avec le projet.",
      },
      {
        kind: "text",
        text: "Placé à la racine du projet, il est lu automatiquement par `tsc`, par VS Code et par les outils (`tsc --showConfig` affiche la configuration effective). Un seul fichier, trois lecteurs : la configuration est la source de vérité partagée de tout l'outillage.",
      },
    ],
  },
  {
    id: "tsconfig-anatomie",
    title: "Anatomie d'un tsconfig",
    level: 1,
    intro:
      "Trois blocs à connaître : quels fichiers, quelles options, quelles dépendances.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "tsconfig.json — squelette",
        code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"NodeNext\",\n    \"strict\": true\n  },\n  \"include\": [\"src\"],\n  \"exclude\": [\"node_modules\"]\n}",
      },
      {
        kind: "diagram",
        title: "Les trois blocs",
        lines: [
          "compilerOptions",
          "  → comment compiler : cible, modules, sévérité, sorties",
          "include / exclude / files",
          "  → quoi compiler : quels fichiers entrent dans le programme",
          "references / extends",
          "  → comment le projet se relie aux autres (monorepo, bases partagées)",
        ],
      },
      {
        kind: "text",
        text: "`compilerOptions` contient les réglages du compilateur (la partie la plus riche : une centaine d'options possibles). `include`/`exclude` définissent le périmètre. `extends` et `references` gèrent les relations entre configurations. Le niveau 2 détaille chacun ; le niveau 3 dissèque les options une par une.",
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
      "Ce qu'il faut avant de configurer un projet.",
    blocks: [
      {
        kind: "fields",
        title: "Avant tsconfig",
        fields: [
          {
            label: "Projet npm avec TypeScript",
            value:
              "TypeScript installé en local : la configuration pilote le `tsc` du projet.",
          },
          {
            label: "Comprendre tsc",
            value:
              "Le rôle du compilateur : `tsconfig.json` n'est que sa télécommande.",
          },
          {
            label: "JSON",
            value:
              "Le fichier est du JSON (strict : pas de commentaires dans la version écrite à la main — en pratique, beaucoup d'équipes en mettent, `tsc` les tolère).",
          },
        ],
      },
    ],
  },
  {
    id: "init",
    title: "Générer la configuration",
    level: 2,
    intro:
      "`tsc --init` : partir d'un modèle commenté plutôt que d'une page blanche.",
    blocks: [
      {
        kind: "command",
        label: "Initialiser tsconfig.json",
        command: "npx tsc --init",
        why: "Génère un `tsconfig.json` complet avec chaque option commentée et sa valeur par défaut. C'est la meilleure documentation des options : on décommente et on ajuste au lieu d'écrire de mémoire.",
        verify: "npx tsc --showConfig",
      },
      {
        kind: "text",
        text: "Le fichier généré est volontairement verbeux : la plupart des options restent commentées (donc inactives). On ne garde décommenté que ce qu'on comprend et ce dont on a besoin — un `tsconfig` minimal et compris vaut mieux qu'un `tsconfig` copié-collé de 200 lignes.",
      },
    ],
  },
  {
    id: "include-exclude-files",
    title: "include, exclude, files",
    level: 2,
    intro:
      "Définir le périmètre : quels fichiers entrent dans le programme.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Périmètre typique d'une application",
        code: "{\n  \"include\": [\"src\"],\n  \"exclude\": [\"node_modules\", \"dist\"],\n  \"compilerOptions\": {}\n}",
      },
      {
        kind: "fields",
        title: "Les trois champs",
        fields: [
          {
            label: "`include`",
            value:
              "Motifs glob des fichiers à compiler : `[\"src\"]` couvre tout le dossier `src`, récursivement.",
          },
          {
            label: "`exclude`",
            value:
              "Motifs à retirer du périmètre : `node_modules` et le dossier de sortie (`dist`) n'ont rien à y faire.",
          },
          {
            label: "`files`",
            value:
              "Liste explicite de fichiers (alternative à `include`) : pour les tout petits projets ou les points d'entrée précis.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : `outDir` (là où le JS est émis) ne doit jamais être dans le périmètre — sinon `tsc` compile ses propres sorties. Si `exclude` est omis, `node_modules` est exclu par défaut, mais pas `dist`.",
      },
    ],
  },
  {
    id: "compilerOptions-essentielles",
    title: "Les options essentielles",
    level: 2,
    intro:
      "Le socle que tout projet devrait avoir : huit options à connaître par cœur.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Socle recommandé",
        code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"NodeNext\",\n    \"moduleResolution\": \"NodeNext\",\n    \"strict\": true,\n    \"esModuleInterop\": true,\n    \"skipLibCheck\": true,\n    \"outDir\": \"dist\",\n    \"rootDir\": \"src\"\n  },\n  \"include\": [\"src\"]\n}",
      },
      {
        kind: "fields",
        title: "Ce que fait chacune",
        fields: [
          {
            label: "`target`",
            value:
              "Version de JavaScript émise : `ES2022` est un bon défaut moderne.",
          },
          {
            label: "`module` + `moduleResolution`",
            value:
              "Format des modules émis et stratégie de résolution : `NodeNext` suit le `package.json` (`type: module` ou non).",
          },
          {
            label: "`strict`",
            value:
              "Active toute la famille de vérifications strictes : le niveau d'exigence recommandé.",
          },
          {
            label: "`esModuleInterop`",
            value:
              "Interopérabilité douce entre ESM et CommonJS : `import` par défaut depuis des modules CommonJS.",
          },
          {
            label: "`skipLibCheck`",
            value:
              "Ne pas revérifier les `.d.ts` des dépendances : compilation plus rapide, sans perte pour votre code.",
          },
          {
            label: "`outDir` / `rootDir`",
            value:
              "Dossier de sortie du JS (`dist`) et racine des sources (`src`) : la structure du projet est explicite.",
          },
        ],
      },
    ],
  },
  {
    id: "target-module-pratique",
    title: "target et module en pratique",
    level: 2,
    intro:
      "Choisir selon l'environnement d'exécution, pas selon la mode.",
    blocks: [
      {
        kind: "list",
        items: [
          "`target` suit le runtime le plus ancien à supporter : Node.js 20+ → `ES2022` ; navigateurs récents → `ES2020`/`ES2022` ; support large → `ES2017` et on vérifie avec les données de compatibilité.",
          "`module` suit le format du projet : `NodeNext` pour Node.js (il lit `type: \"module\"` dans `package.json`), `Bundler` pour Vite/webpack (le bundler gère les modules).",
          "Les deux options sont liées à l'exécution réelle : une cible trop haute produit du JS que le runtime ne comprend pas ; un mauvais format de module échoue au chargement.",
          "Le détail complet (sorties comparées, `lib`) est dans la Learning Page `tsc`.",
        ],
      },
    ],
  },
  {
    id: "strict-essentiels",
    title: "Les essentiels de strict",
    level: 2,
    intro:
      "Ce que `strict: true` change au quotidien, en trois points.",
    blocks: [
      {
        kind: "list",
        items: [
          "`strictNullChecks` : `null` et `undefined` deviennent des types à part — on ne les utilise plus par accident.",
          "`noImplicitAny` : chaque paramètre et chaque inférence ambiguë doit être typé explicitement — fini les `any` silencieux.",
          "Le reste de la famille (`strictFunctionTypes`, `noImplicitThis`, `strictPropertyInitialization`…) resserre les coins : la Learning Page `strict` les détaille un par un.",
          "Nouveau projet : `strict: true` dès le premier jour. Projet existant : activation progressive, flag par flag.",
        ],
      },
    ],
  },
  {
    id: "extends-bases",
    title: "extends et les bases partagées",
    level: 2,
    intro:
      "Hériter d'une configuration : factoriser au lieu de dupliquer.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Héritage simple",
        code: "{\n  \"extends\": \"./tsconfig.base.json\",\n  \"include\": [\"src\"],\n  \"compilerOptions\": {\n    \"outDir\": \"dist\"\n  }\n}",
      },
      {
        kind: "text",
        text: "`extends` charge une configuration de base puis applique les surcharges locales : les options du fichier enfant écrasent celles du parent. Le paquet `@tsconfig/node22` fournit une base officielle pour Node.js 22 — `npm install -D @tsconfig/node22` puis `\"extends\": \"@tsconfig/node22/tsconfig.json\"`.",
      },
      {
        kind: "list",
        items: [
          "En monorepo : un `tsconfig.base.json` à la racine, étendu par chaque paquet — la cohérence est garantie.",
          "Les bases `@tsconfig/*` existent pour Node (16/18/20/22), React, Deno, les bibliothèques… : partir d'une base officielle plutôt que de zéro.",
          "`tsc --showConfig` affiche la configuration fusionnée : indispensable pour vérifier l'héritage.",
        ],
      },
    ],
  },
  {
    id: "verifier-sa-config",
    title: "Vérifier sa configuration",
    level: 2,
    intro:
      "Ne pas configurer à l'aveugle : les commandes qui montrent la vérité.",
    blocks: [
      {
        kind: "command",
        label: "Afficher la configuration effective",
        command: "npx tsc --showConfig",
        why: "Affiche le `tsconfig` après résolution complète : `extends` appliqués, valeurs par défaut remplies, chemins résolus. C'est la configuration réellement utilisée — la seule qui compte pour diagnostiquer.",
        verify: "npx tsc --showConfig | head -50",
      },
      {
        kind: "command",
        label: "Lister les fichiers compilés",
        command: "npx tsc --listFiles --noEmit",
        why: "Affiche chaque fichier inclus dans le programme. Si un fichier manque ou si un parasite (`dist`, tests) s'y glisse, c'est ici qu'on le voit — le diagnostic direct des problèmes de `include`/`exclude`.",
        verify: "npx tsc --listFiles --noEmit | wc -l",
      },
    ],
  },
  {
    id: "multi-configs-pratique",
    title: "Plusieurs configurations",
    level: 2,
    intro:
      "Quand un seul fichier ne suffit plus : le découpage standard.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "tsconfig.app.json — configuration applicative",
        code: "{\n  \"extends\": \"./tsconfig.json\",\n  \"include\": [\"src\"],\n  \"compilerOptions\": {\n    \"noEmit\": true\n  }\n}",
      },
      {
        kind: "text",
        text: "Le pattern des templates Vite : `tsconfig.json` (base), `tsconfig.app.json` (le code, vérifié sans émission car Vite transpile), `tsconfig.node.json` (les fichiers de config comme `vite.config.ts`). Chaque contexte a ses options ; `--project` sélectionne. Les références de projet (`tsc -b`) vont plus loin pour les monorepos.",
      },
    ],
  },
  {
    id: "projets-tsconfig",
    title: "Projets tsconfig",
    level: 2,
    intro:
      "Trois chantiers pour maîtriser la configuration en profondeur.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Configurer de zéro",
        fields: [
          { label: "Skills required", value: "`tsc --init`, options de base" },
          { label: "What you build", value: "Un `tsconfig.json` minimal et compris pour un petit projet, avec `typecheck` en script npm" },
          { label: "What you learn", value: "Chaque option activée est une option comprise : pas de copié-collé aveugle" },
          { label: "Expected difficulty", value: "Faible — quelques heures" },
          { label: "Next project", value: "Base partagée en monorepo" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Base partagée en monorepo",
        fields: [
          { label: "Skills required", value: "`extends`, `references`" },
          { label: "What you build", value: "Un `tsconfig.base.json` racine étendu par deux paquets, compilé avec `tsc -b`" },
          { label: "What you learn", value: "Factoriser la config, vérifier l'héritage avec `--showConfig`" },
          { label: "Expected difficulty", value: "Moyenne — quelques jours" },
          { label: "Next project", value: "Durcissement strict progressif" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Durcissement strict progressif",
        fields: [
          { label: "Skills required", value: "Famille `strict`, lecture d'erreurs" },
          { label: "What you build", value: "L'activation flag par flag de toute la famille `strict` sur un projet existant, documentée" },
          { label: "What you learn", value: "Ce que chaque flag interdit vraiment, et pourquoi il vaut le coût" },
          { label: "Expected difficulty", value: "Élevée — une semaine" },
          { label: "Next project", value: "Optimiser le temps de compilation d'un gros projet" },
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes-tsconfig",
    title: "Erreurs fréquentes de configuration",
    level: 2,
    intro:
      "Les messages qui signalent un problème de config, pas de code.",
    blocks: [
      {
        kind: "table",
        headers: ["Message", "Cause probable", "Correction"],
        rows: [
          ["TS18003: No inputs were found", "`include` ne matche aucun fichier", "Vérifier les chemins et motifs dans `include`"],
          ["TS2307: Cannot find module", "Résolution des modules mal configurée", "Vérifier `moduleResolution`, les `paths`, les extensions"],
          ["TS6142: Module X was resolved but --jsx is not set", "Fichier `.tsx` sans option `jsx`", "Ajouter `\"jsx\": \"react-jsx\"`"],
          ["Erreurs dans node_modules", "`.d.ts` tiers défectueux ou vérifiés", "Activer `skipLibCheck: true`"],
          ["Le JS est émis dans src", "`outDir` non défini ou dans le périmètre", "Définir `outDir: dist` et l'exclure"],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "champs-racine",
    title: "Les champs racine",
    level: 3,
    intro: "Tout ce qui peut vivre à la racine du fichier, en un tableau.",
    blocks: [
      {
        kind: "table",
        headers: ["Champ", "Rôle"],
        rows: [
          ["`compilerOptions`", "Les réglages du compilateur (la partie principale)."],
          ["`include`", "Motifs glob des fichiers sources à compiler."],
          ["`exclude`", "Motifs à retirer (par défaut : `node_modules`, `bower_components`, `jspm_packages`, et `outDir`)."],
          ["`files`", "Liste explicite de fichiers (alternative précise à `include`)."],
          ["`extends`", "Chemin ou paquet de la configuration parente à hériter."],
          ["`references`", "Projets dépendants pour le mode build `tsc -b`."],
          ["`watchOptions`", "Réglages fins du mode watch (rarement nécessaire)."],
          ["`typeAcquisition`", "Acquisition automatique de types (projets sans npm, rare)."],
        ],
      },
    ],
  },
  {
    id: "include-patterns",
    title: "include : les motifs glob",
    level: 3,
    intro: "La syntaxe des motifs : `*`, `**`, `?` — et leurs pièges.",
    blocks: [
      {
        kind: "list",
        items: [
          "`*` matche tout sauf les séparateurs de dossiers : `src/*` couvre les fichiers directs de `src`, pas les sous-dossiers.",
          "`**` matche récursivement : `src/**/*` ou simplement `src` couvre toute l'arborescence.",
          "`?` matche un caractère : `file?.ts` couvre `file1.ts`, pas `file10.ts`.",
          "Les motifs sont relatifs au `tsconfig.json` : un fichier déplacé change le périmètre.",
          "Si `files` et `include` sont tous deux absents, tout est inclus sauf les exclusions par défaut — pratique, mais implicite.",
        ],
      },
    ],
  },
  {
    id: "exclude-patterns",
    title: "exclude : les pièges",
    level: 3,
    intro: "`exclude` ne fait que retirer : il ne peut pas ajouter.",
    blocks: [
      {
        kind: "list",
        items: [
          "`exclude` ne s'applique qu'aux fichiers trouvés via `include` : un fichier listé dans `files` ou importé explicitement reste inclus même s'il matche `exclude`.",
          "`node_modules` est exclu par défaut — mais seulement si `exclude` n'est pas redéfini : dès qu'on écrit `exclude`, on remplace la liste par défaut.",
          "Toujours exclure `outDir` (et `dist` en général) : compiler ses propres sorties est l'erreur classique.",
          "Les dossiers de tests : à exclure de la config de build (`tsconfig.build.json`), à inclure dans celle des tests — d'où les multi-configs.",
        ],
      },
    ],
  },
  {
    id: "files-usage",
    title: "files : la liste explicite",
    level: 3,
    intro: "Quand énumérer vaut mieux que matcher.",
    blocks: [
      {
        kind: "text",
        text: "`files` liste explicitement les fichiers d'entrée, sans glob : idéal pour les petits projets, les points d'entrée uniques, ou quand le périmètre doit être exact au fichier près. Combiné à `include`, les deux s'additionnent. Les fichiers importés par ceux de `files` sont inclus automatiquement — `files` définit les racines, pas la totalité.",
      },
    ],
  },
  {
    id: "target-options",
    title: "target : toutes les valeurs",
    level: 3,
    intro: "De `ES5` à `ESNext` : ce que chaque cible implique.",
    blocks: [
      {
        kind: "table",
        headers: ["Valeur", "Usage typique"],
        rows: [
          ["`ES5`", "Compatibilité maximale (IE11…) : helpers générés, code transformé en profondeur."],
          ["`ES2015`–`ES2017`", "Bases modernes : classes, async/await natifs."],
          ["`ES2020`", "Navigateurs récents : chaînage optionnel, `??`, `BigInt`."],
          ["`ES2022`", "Défaut moderne recommandé : champs de classe, `at()`, top-level await."],
          ["`ESNext`", "Dernière version : instable par nature, pour tester — jamais en production."],
        ],
      },
      {
        kind: "text",
        text: "`target` influence aussi la valeur par défaut de `lib` et certains comportements (les classes émettent des champs différemment selon la cible). Changer de cible, c'est changer la sortie : toujours retester après.",
      },
    ],
  },
  {
    id: "lib-options",
    title: "lib : les bibliothèques de déclarations",
    level: 3,
    intro: "Déclarer les API disponibles, indépendamment de la syntaxe émise.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "lib explicite",
        code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"lib\": [\"ES2022\", \"DOM\", \"DOM.Iterable\"]\n  }\n}",
      },
      {
        kind: "text",
        text: "Chaque entrée déclare un ensemble d'API : `ES2022` (le langage), `DOM` (navigateur), `DOM.Iterable` (itération sur les collections DOM), `WebWorker`… Par défaut, `lib` est déduit de `target` (avec `DOM` inclus). On ne le règle explicitement que pour les cas particuliers : projet Node.js sans `DOM`, web worker, ou API très récentes sur cible plus basse.",
      },
    ],
  },
  {
    id: "module-options",
    title: "module : les formats",
    level: 3,
    intro: "Le format des modules émis, valeur par valeur.",
    blocks: [
      {
        kind: "table",
        headers: ["Valeur", "Quand l'utiliser"],
        rows: [
          ["`CommonJS`", "Node.js classique (`require`/`module.exports`), sans `type: module`."],
          ["`ES2015`/`ES2020`/`ES2022`", "Modules ES purs, sans adaptation Node : pour les bundlers simples ou le navigateur natif."],
          ["`NodeNext`", "Suit `package.json` (`type: module` → ESM, sinon CommonJS) : le choix moderne pour Node.js."],
          ["`Bundler`", "Vite, webpack, esbuild : syntaxe ESM conservée, le bundler fait le reste."],
          ["`None`", "Scripts globaux sans modules : cas particuliers (snippets, legacy)."],
          ["`Preserve`", "Conserve la syntaxe telle quelle (avec `verbatimModuleSyntax`) : pour les outils qui gèrent eux-mêmes."],
        ],
      },
    ],
  },
  {
    id: "moduleResolution-options",
    title: "moduleResolution : les stratégies",
    level: 3,
    intro: "Comment `tsc` trouve les fichiers derrière les imports.",
    blocks: [
      {
        kind: "table",
        headers: ["Valeur", "Comportement"],
        rows: [
          ["`Node` (Node10)", "Résolution CommonJS historique : `node_modules`, `index.js`, sans prise en compte des `exports` de package.json."],
          ["`NodeNext`", "Résolution Node.js moderne : respecte `type: module`, les `exports`, les sous-chemins — à utiliser avec `module: NodeNext`."],
          ["`Bundler`", "Résolution façon bundler : `exports`, alias, sans extensions obligatoires — à utiliser avec `module: Bundler`."],
          ["`Classic`", "Stratégie historique pré-Node : obsolète, à ne plus utiliser."],
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : `module` et `moduleResolution` vont par paire (`NodeNext`/`NodeNext`, `Bundler`/`Bundler`). Les mélanger est la cause n°1 des `TS2307` incompréhensibles : la résolution cherche d'une façon, l'émission suppose l'autre.",
      },
    ],
  },
  {
    id: "jsx-options",
    title: "jsx : les modes",
    level: 3,
    intro: "Comment le JSX est transformé : quatre modes, un choix selon le framework.",
    blocks: [
      {
        kind: "table",
        headers: ["Valeur", "Sortie"],
        rows: [
          ["`react`", "`React.createElement(...)` : React classique (nécessite `React` importé)."],
          ["`react-jsx`", "Transform automatique : `jsx(...)` — le défaut moderne pour React 17+."],
          ["`react-jsxdev`", "Version développement du transform automatique (messages d'erreur enrichis)."],
          ["`preserve`", "Le JSX est conservé tel quel : pour les outils qui transforment eux-mêmes (ou les `.tsx` typés sans émission)."],
        ],
      },
      {
        kind: "text",
        text: "Pour React moderne : `\"jsx\": \"react-jsx\"`. L'erreur « Module X was resolved but --jsx is not set » signifie simplement qu'un `.tsx` est compilé sans ce réglage.",
      },
    ],
  },
  {
    id: "strict-famille",
    title: "La famille strict",
    level: 3,
    intro: "`strict: true` active huit vérifications : le récapitulatif.",
    blocks: [
      {
        kind: "table",
        headers: ["Flag", "Ce qu'il interdit"],
        rows: [
          ["`strictNullChecks`", "`null`/`undefined` assignés ou utilisés sans garde."],
          ["`noImplicitAny`", "Les `any` implicites (paramètres non typés…)."],
          ["`strictFunctionTypes`", "Les affectations de fonctions aux paramètres incompatibles (contravariance)."],
          ["`strictBindCallApply`", "`bind`/`call`/`apply` avec des arguments mal typés."],
          ["`strictPropertyInitialization`", "Les propriétés de classe utilisées avant assignation."],
          ["`noImplicitThis`", "`this: any` implicite dans les fonctions."],
          ["`alwaysStrict`", "Émet toujours `\"use strict\"` dans le JS produit."],
          ["`useUnknownInCatchVariables`", "Les variables de `catch` typées `unknown` au lieu de `any`."],
        ],
      },
      {
        kind: "text",
        text: "Chacun de ces flags est détaillé dans la Learning Page `strict`, avec exemples et stratégies d'activation progressive. Ici, l'essentiel : `strict: true` les active tous d'un coup, et on peut désactiver individuellement un flag (`\"strictNullChecks\": false`) pendant une migration — en le documentant comme une dette.",
      },
    ],
  },
  {
    id: "esModuleInterop-detail",
    title: "esModuleInterop en détail",
    level: 3,
    intro: "L'option qui adoucit le mariage ESM/CommonJS.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Import par défaut depuis CommonJS",
        code: "import express from \"express\";\n// Sans esModuleInterop : erreur, car express n'a pas de défaut ES.\n// Avec esModuleInterop : tsc génère un helper d'interopérabilité\n// qui enveloppe le module CommonJS.",
      },
      {
        kind: "text",
        text: "Sans cette option, `import express from \"express\"` est une erreur de types : le module CommonJS n'exporte pas de défaut ES. Avec `esModuleInterop: true`, `tsc` génère un helper qui rend l'import valide à l'exécution. À activer dans quasiment tous les projets qui consomment des dépendances CommonJS — c'est-à-dire presque tous.",
      },
    ],
  },
  {
    id: "allowSyntheticDefaultImports",
    title: "allowSyntheticDefaultImports",
    level: 3,
    intro: "La moitié « types » d'`esModuleInterop`.",
    blocks: [
      {
        kind: "text",
        text: "Cette option autorise l'import par défaut au niveau des types uniquement, sans générer le helper d'interopérabilité à l'exécution. En pratique : `esModuleInterop: true` l'active implicitement. On ne la règle séparément que si un bundler gère déjà l'interopérabilité à l'exécution et qu'on veut seulement calmer le vérificateur.",
      },
    ],
  },
  {
    id: "resolveJsonModule",
    title: "resolveJsonModule",
    level: 3,
    intro: "Importer du JSON comme un module typé.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Import JSON typé",
        code: "import config from \"./config.json\";\n// config est typé d'après le contenu du JSON :\n// { port: number, host: string } — autocomplétion incluse.",
      },
      {
        kind: "text",
        text: "Avec `\"resolveJsonModule\": true`, `tsc` résout les imports de fichiers `.json` et infère leur type depuis le contenu réel. Pratique pour les fichiers de configuration embarqués. Limite : le JSON est figé à la compilation — pour des données dynamiques, préférer une lecture à l'exécution validée.",
      },
    ],
  },
  {
    id: "declaration-options",
    title: "declaration et declarationMap",
    level: 3,
    intro: "Générer les `.d.ts` : pour qui, et avec quelles cartes.",
    blocks: [
      {
        kind: "list",
        items: [
          "`declaration: true` génère les fichiers de déclarations à côté du JS : indispensable pour publier une bibliothèque, inutile pour une application.",
          "`declarationMap: true` génère les source maps des déclarations : « aller à la définition » chez le consommateur mène au `.ts` d'origine.",
          "`emitDeclarationOnly: true` ne génère que les `.d.ts` : pour séparer la production des types (tsc) de celle du JS (bundler).",
          "En monorepo avec `tsc -b`, `composite: true` active `declaration` implicitement : les paquets se consomment via leurs déclarations.",
        ],
      },
    ],
  },
  {
    id: "sourceMap-options",
    title: "Les options de source maps",
    level: 3,
    intro: "`sourceMap`, `inlineSourceMap`, `sourceRoot` : cartographier la sortie.",
    blocks: [
      {
        kind: "list",
        items: [
          "`sourceMap: true` : un fichier `.js.map` par fichier émis — le débogage dans le `.ts` d'origine.",
          "`inlineSourceMap: true` : la carte est embarquée en base64 dans le `.js` — un seul fichier, plus lourd.",
          "`inlineSources: true` : embarque aussi le contenu des sources — le `.ts` est lisible même sans les fichiers d'origine.",
          "En développement : activées. En production : décision consciente (les cartes déployées exposent les sources).",
        ],
      },
    ],
  },
  {
    id: "outDir-rootDir",
    title: "outDir et rootDir",
    level: 3,
    intro: "Séparer sources et sorties : la structure qui évite les catastrophes.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Séparation stricte",
        code: "{\n  \"compilerOptions\": {\n    \"rootDir\": \"src\",\n    \"outDir\": \"dist\"\n  },\n  \"include\": [\"src\"],\n  \"exclude\": [\"dist\"]\n}",
      },
      {
        kind: "text",
        text: "`rootDir` déclare la racine des sources : `tsc` refuse les fichiers hors de cette racine (erreur TS6059) — c'est une garde, pas une contrainte. `outDir` reçoit le JS émis en miroir de la structure de `src`. Sans `rootDir` explicite, `tsc` calcule la racine commune des fichiers d'entrée — et un fichier égaré peut changer toute l'arborescence de sortie.",
      },
    ],
  },
  {
    id: "baseUrl-paths",
    title: "baseUrl et paths : les alias",
    level: 3,
    intro: "Des imports lisibles : `@/utils` au lieu de `../../../utils`.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Alias classique",
        code: "{\n  \"compilerOptions\": {\n    \"baseUrl\": \".\",\n    \"paths\": {\n      \"@/*\": [\"src/*\"]\n    }\n  }\n}",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Usage",
        code: "import { format } from \"@/utils/format\";\n// Au lieu de : import { format } from \"../../../utils/format\";",
      },
      {
        kind: "text",
        text: "Attention, piège majeur : `paths` n'est qu'une indication pour le vérificateur — `tsc` ne réécrit pas les chemins dans le JS émis. À l'exécution, `@/utils/format` doit être résolu par autre chose (alias du bundler, `tsc-alias`, sous-chemins `imports` de package.json). Sans cela, le code compile mais échoue au runtime.",
      },
    ],
  },
  {
    id: "types-typeRoots",
    title: "types et typeRoots",
    level: 3,
    intro: "Contrôler quelles déclarations globales sont chargées.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, `tsc` charge tous les paquets `@types` trouvés : chaque `@types/*` installé ajoute ses déclarations globales, même inutilisées — ce qui peut créer des conflits (deux définitions de `window`, par exemple). `\"types\": []` désactive le chargement automatique ; on liste ensuite explicitement ce qu'on veut : `\"types\": [\"node\", \"jest\"]`.",
      },
      {
        kind: "list",
        items: [
          "`typeRoots` change les dossiers scrutés (défaut : `node_modules/@types`) : pour des types internes à l'entreprise, par exemple.",
          "Des erreurs « Duplicate identifier » entre `@types` se règlent en restreignant `types` au nécessaire.",
          "Sur les gros projets, limiter `types` accélère aussi la compilation : moins de déclarations à analyser.",
        ],
      },
    ],
  },
  {
    id: "skipLibCheck-detail",
    title: "skipLibCheck en détail",
    level: 3,
    intro: "Pourquoi on ne revérifie pas les dépendances.",
    blocks: [
      {
        kind: "text",
        text: "Les fichiers `.d.ts` des bibliothèques sont censés être corrects : les revérifier à chaque compilation coûte cher pour un bénéfice nul sur votre code. `skipLibCheck: true` saute leur vérification — les erreurs dans `node_modules` disparaissent, la compilation accélère. Ce n'est pas un laxisme : votre code reste vérifié avec la même rigueur, seules les déclarations tierces sont prises pour acquises.",
      },
    ],
  },
  {
    id: "noEmit-detail",
    title: "noEmit en détail",
    level: 3,
    intro: "La configuration « vérification pure ».",
    blocks: [
      {
        kind: "text",
        text: "`\"noEmit\": true` dans le `tsconfig` rend permanente l'option `--noEmit` : `tsc` vérifie sans jamais écrire de fichiers. C'est la configuration des projets où un autre outil produit le JavaScript (Vite, esbuild) — le `tsconfig.app.json` des templates Vite l'utilise. Incompatible avec `emitDeclarationOnly` : on ne peut pas à la fois ne rien émettre et n'émettre que les déclarations.",
      },
    ],
  },
  {
    id: "isolatedModules-detail",
    title: "isolatedModules",
    level: 3,
    intro: "Écrire du code que chaque transpileur peut traiter fichier par fichier.",
    blocks: [
      {
        kind: "text",
        text: "esbuild et SWC transpilent chaque fichier isolément, sans information inter-fichiers : certaines constructions TypeScript deviennent alors ambiguës (`export =`, la ré-exportation de types sans `type`, les enums `const`). `\"isolatedModules\": true` fait signaler par `tsc` tout code qui ne survivrait pas à une transpilation isolée — la garantie que Vite/esbuild produiront le même résultat que `tsc`.",
      },
      {
        kind: "list",
        items: [
          "À activer dans tout projet transpilé par Vite, esbuild ou SWC : c'est le cas standard aujourd'hui.",
          "L'erreur typique : ré-exporter un type sans le mot-clé `type` — la correction est d'écrire `export type { X }`.",
          "Voir aussi `verbatimModuleSyntax` : la version plus stricte et plus explicite de la même idée.",
        ],
      },
    ],
  },
  {
    id: "noEmitOnError-detail",
    title: "noEmitOnError",
    level: 3,
    intro: "Le build qui refuse de produire du code douteux.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, `tsc` émet du JavaScript même si la vérification a échoué — les types étant effacés, l'émission « réussit » techniquement. `\"noEmitOnError\": true` bloque l'émission en cas d'erreur : un build qui passe avec des erreurs de types devient impossible. À activer sur les configurations de build et en CI ; à laisser désactivé en `--watch` de développement, où on veut voir le résultat malgré les erreurs temporaires.",
      },
    ],
  },
  {
    id: "composite-incremental",
    title: "composite et incremental",
    level: 3,
    intro: "Les options des projets référençables et de la compilation rapide.",
    blocks: [
      {
        kind: "list",
        items: [
          "`composite: true` marque un projet comme référençable par `tsc -b` : il active `declaration`, impose `rootDir`, et interdit les options incompatibles avec l'incrémental.",
          "`incremental: true` écrit un `.tsbuildinfo` qui mémorise l'état : seuls les fichiers affectés sont revérifiés au run suivant.",
          "`tsBuildInfoFile` choisit l'emplacement du fichier d'état : utile pour le mettre dans un dossier de cache.",
          "Le `.tsbuildinfo` est un artefact : il va dans `.gitignore`, jamais dans le dépôt.",
        ],
      },
    ],
  },
  {
    id: "allowJs-checkJs",
    title: "allowJs et checkJs",
    level: 3,
    intro: "Faire entrer du JavaScript dans le programme TypeScript.",
    blocks: [
      {
        kind: "text",
        text: "`allowJs: true` inclut les fichiers `.js` dans la compilation : `tsc` les transpile (et peut générer leurs `.d.ts` via JSDoc). `checkJs: true` va plus loin : il vérifie les types du JavaScript, en s'appuyant sur les annotations JSDoc. C'est le socle d'une migration incrémentale — voir la Learning Page `migration` pour la stratégie complète.",
      },
      {
        kind: "list",
        items: [
          "`outDir` doit être défini avec `allowJs` : sinon le JS serait réécrit sur lui-même.",
          "`maxNodeModuleJsDepth` limite la profondeur d'exploration du JS dans `node_modules`.",
          "Combiner `allowJs` + `emitDeclarationOnly` : générer des `.d.ts` depuis du JS documenté en JSDoc.",
        ],
      },
    ],
  },
  {
    id: "forceConsistentCasing",
    title: "forceConsistentCasingInFileNames",
    level: 3,
    intro: "L'option qui évite le bug « ça marche sur mon Mac ».",
    blocks: [
      {
        kind: "text",
        text: "macOS et Windows ont des systèmes de fichiers insensibles à la casse : `import \"./Utils\"` trouve `./utils.ts` en local, mais échoue sur Linux (CI, production). `\"forceConsistentCasingInFileNames\": true` interdit les imports dont la casse ne correspond pas exactement au fichier — l'erreur est détectée en développement, pas en CI. À activer systématiquement.",
      },
    ],
  },
  {
    id: "cas-limites-tsconfig",
    title: "Cas limites",
    level: 3,
    intro: "Héritages multiples, conflits, fichiers hors projet : les frontières.",
    blocks: [
      {
        kind: "fields",
        title: "Situations particulières",
        fields: [
          {
            label: "extends en chaîne",
            value:
              "Plusieurs niveaux d'héritage (base → paquet → app) : chaque niveau surcharge le précédent. `--showConfig` est le seul moyen fiable de voir le résultat.",
          },
          {
            label: "Conflit module/moduleResolution",
            value:
              "`module: NodeNext` avec `moduleResolution: Node` : la résolution et l'émission se contredisent. Toujours les appairer.",
          },
          {
            label: "Fichier hors de rootDir (TS6059)",
            value:
              "Un import qui sort de `rootDir` : soit élargir `rootDir`, soit déplacer le fichier — jamais les deux à moitié.",
          },
          {
            label: "Options incompatibles",
            value:
              "`noEmit` + `emitDeclarationOnly`, `composite` sans `declaration`… : `tsc` signale les combinaisons interdites au lancement.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-config",
    title: "Déboguer sa configuration",
    level: 3,
    intro: "La méthode quand la config semble ignorée.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier le fichier lu",
            detail:
              "`tsc` sans argument lit le `tsconfig.json` du dossier courant ; avec des fichiers en argument, il l'ignore. Lancer `npx tsc` seul d'abord.",
          },
          {
            title: "Afficher la config effective",
            detail:
              "`npx tsc --showConfig` : comparer avec ce qu'on croit avoir écrit — l'héritage réserve des surprises.",
          },
          {
            title: "Lister les fichiers",
            detail:
              "`npx tsc --listFiles --noEmit` : vérifier que le périmètre est celui attendu.",
          },
          {
            title: "Tracer la résolution",
            detail:
              "`npx tsc --traceResolution` : pour les imports introuvables, voir exactement où `tsc` a cherché.",
          },
          {
            title: "Réduire au minimal",
            detail:
              "Reproduire avec un `tsconfig` minimal : si le problème disparaît, réintroduire les options une par une.",
          },
        ],
      },
    ],
  },
  {
    id: "config-par-environnement",
    title: "Configurer par environnement",
    level: 3,
    intro: "Dev, build, test : des configurations sœurs, pas des copies.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "tsconfig.build.json — build strict",
        code: "{\n  \"extends\": \"./tsconfig.json\",\n  \"include\": [\"src\"],\n  \"exclude\": [\"src/**/*.test.ts\"],\n  \"compilerOptions\": {\n    \"noEmit\": false,\n    \"noEmitOnError\": true,\n    \"outDir\": \"dist\"\n  }\n}",
      },
      {
        kind: "text",
        text: "Le pattern : une base commune, une config par usage. La config de dev privilégie la vitesse (`noEmit`, `incremental`), celle de build la rigueur (`noEmitOnError`, exclusion des tests), celle des tests inclut les fichiers de test. Chacune hérite, aucune ne duplique.",
      },
    ],
  },
  {
    id: "erreurs-courantes-tsconfig",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques dans l'écriture de la configuration.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Copier un tsconfig sans le comprendre",
            value:
              "Problem : des options contradictoires ou inadaptées au projet. Why : chaque projet a son runtime et ses outils. Better : partir de `tsc --init` ou d'une base `@tsconfig/*`, option par option.",
          },
          {
            label: "paths sans résolution au runtime",
            value:
              "Problem : ça compile, mais `Cannot find module` à l'exécution. Why : `paths` n'est qu'une indication pour tsc. Better : configurer aussi le bundler / le runtime / `tsc-alias`.",
          },
          {
            label: "module et moduleResolution désaccordés",
            value:
              "Problem : des TS2307 incompréhensibles. Why : la résolution cherche d'une façon, l'émission suppose l'autre. Better : les appairer (`NodeNext`/`NodeNext`, `Bundler`/`Bundler`).",
          },
          {
            label: "outDir dans le périmètre",
            value:
              "Problem : tsc compile ses propres sorties, boucle ou erreurs étranges. Why : `dist` non exclu. Better : toujours exclure le dossier de sortie.",
          },
          {
            label: "Oublier --showConfig",
            value:
              "Problem : modifier la config à l'aveugle. Why : l'héritage rend la config effective différente de la config écrite. Better : vérifier avec `--showConfig` avant et après.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-tsconfig",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les habitudes d'une configuration saine.",
    blocks: [
      {
        kind: "list",
        items: [
          "Partir de `tsc --init` ou d'une base `@tsconfig/*` : jamais d'une page blanche, jamais d'un copié-collé aveugle.",
          "Chaque option activée est une option comprise : un `tsconfig` court et maîtrisé bat un `tsconfig` long et mystérieux.",
          "Appairer `module` et `moduleResolution` : `NodeNext`/`NodeNext` ou `Bundler`/`Bundler`.",
          "`strict: true` par défaut ; toute désactivation partielle est une dette documentée.",
          "`skipLibCheck: true`, `forceConsistentCasingInFileNames: true` : les deux options « toujours ».",
          "Vérifier avec `--showConfig` et `--listFiles` : la config effective, pas la config imaginée.",
          "En monorepo : base partagée + `extends`, `tsc -b` pour compiler.",
          "Versionner le `tsconfig.json` : c'est du code, il se relit en revue comme le reste.",
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
          { label: "tsconfig Reference", value: "https://www.typescriptlang.org/tsconfig : la référence exhaustive, option par option, avec exemples." },
          { label: "Compiler Options", value: "https://www.typescriptlang.org/docs/handbook/compiler-options.html : les options dans leur contexte d'utilisation." },
          { label: "Project References", value: "La documentation de `tsc -b`, `references` et `composite` pour les monorepos." },
        ],
      },
      {
        kind: "list",
        items: [
          "Bases `@tsconfig/*` : les configurations officielles par environnement (Node 16/18/20/22, React, Deno…), à étendre plutôt qu'à réinventer.",
          "Practice : `--showConfig` sur trois projets open source — comparer leurs choix et comprendre pourquoi.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "La configuration maîtrisée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir `tsc` : le compilateur que cette configuration pilote.",
          "Activer `strict` : tirer le maximum des vérifications configurées ici.",
          "Comprendre `modules` : résolution et formats en détail.",
          "Sécuriser avec `outillage` : `typecheck` en CI sur la base de cette config.",
          "Migrer avec `migration` : `allowJs`/`checkJs` pour une adoption progressive.",
          "Revenir à la roadmap : valider la compétence et passer à la suivante du parcours.",
        ],
      },
    ],
  },
];

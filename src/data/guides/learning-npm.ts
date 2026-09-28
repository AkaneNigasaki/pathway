import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de npm : du premier `npm install` à la publication
 * et à la sécurisation des dépendances. 3 niveaux d'information (Aperçu /
 * Pratique / Approfondi) avec divulgation progressive. Tous les textes
 * supportent le code inline entre backticks.
 */
export const LEARNING_NPM: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est npm, ce qu'il fait pour un projet JavaScript et pourquoi il est incontournable.",
    blocks: [
      {
        kind: "text",
        text: "npm est le gestionnaire de paquets de l'écosystème JavaScript : il installe des bibliothèques depuis un registre de plusieurs millions de paquets, gère leurs versions et automatise les tâches du projet via des scripts. Aucun projet JavaScript moderne ne se construit sans dépendances — et donc sans un outil pour les gérer.",
      },
      {
        kind: "text",
        text: "Concrètement, npm fait trois choses : résoudre (« quelle version de chaque paquet ? »), installer (télécharger et organiser dans `node_modules`), et exécuter (lancer les scripts définis dans `package.json` : dev, build, test). Comprendre `package.json`, le versionnage semver et les lockfiles évite les installations cassées, les comportements non reproductibles et les failles introduites via des dépendances.",
      },
    ],
  },
  {
    id: "package-json-le-coeur",
    title: "package.json, le cœur du projet",
    level: 1,
    intro:
      "Le fichier qui décrit un projet : dépendances, scripts, métadonnées.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json minimal",
        code: "{\n  \"name\": \"mon-app\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"test\": \"vitest run\"\n  },\n  \"dependencies\": {\n    \"react\": \"^18.3.1\"\n  },\n  \"devDependencies\": {\n    \"typescript\": \"~5.4.2\"\n  }\n}",
      },
      {
        kind: "text",
        text: "Tout projet npm tourne autour de ce manifeste : `dependencies` (nécessaires à l'exécution), `devDependencies` (outils de développement : compilateurs, testeurs), et `scripts` (les commandes du quotidien). Le reste de cette page explique comment chaque pièce fonctionne et comment éviter les pièges.",
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
      "Ce qu'il faut savoir avant de gérer des dépendances, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations nécessaires",
        fields: [
          {
            label: "JavaScript",
            value:
              "Savoir ce qu'est un projet JS (fichiers, modules `import`/`export`) : npm organise ses dépendances et ses scripts.",
          },
          {
            label: "Terminal",
            value:
              "Exécuter des commandes, comprendre le répertoire courant : npm est un outil en ligne de commande avant tout.",
          },
          {
            label: "Git (bases)",
            value:
              "Versionner `package.json` et le lockfile : la reproductibilité des installations repose sur Git.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-node-npm",
    title: "Installation de Node.js et npm",
    level: 2,
    intro:
      "npm est fourni avec Node.js : l'installer et le garder à jour.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier l'installation",
        command: "node -v && npm -v",
        why: "Affiche les versions de Node.js et npm. Si les commandes sont introuvables, Node.js n'est pas installé ou pas dans le PATH. Notez les versions : beaucoup de problèmes viennent d'une version trop ancienne.",
        verify: "npm --version",
      },
      {
        kind: "command",
        label: "Mettre à jour npm lui-même",
        command: "npm install -g npm@latest",
        why: "npm se met à jour comme n'importe quel paquet global. Les nouvelles versions apportent des corrections de bugs, de meilleures performances et parfois de nouvelles commandes — restez à jour, surtout en équipe où tout le monde doit utiliser des comportements identiques.",
        verify: "npm -v",
      },
      {
        kind: "text",
        text: "Pour gérer plusieurs versions de Node.js (un projet en Node 18, un autre en Node 22), utilisez un gestionnaire de versions comme `nvm` ou `fnm` : ils installent chaque version dans votre dossier utilisateur et permettent de basculer avec une commande. Évitez d'installer Node.js via `sudo` : les problèmes de permissions qui en découlent sont une source classique d'erreurs `EACCES`.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet",
    level: 2,
    intro:
      "Initialiser un projet, installer une dépendance, lancer un script.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Initialiser le projet",
            detail:
              "`npm init -y` crée un `package.json` avec des valeurs par défaut. Le `-y` accepte tout sans poser de questions — parfait pour démarrer vite.",
          },
          {
            title: "Installer une dépendance",
            detail:
              "`npm install lodash` télécharge le paquet, l'ajoute à `dependencies` dans `package.json`, et crée `node_modules/` plus `package-lock.json`.",
          },
          {
            title: "Utiliser le paquet",
            detail:
              "Dans votre code : `import _ from \"lodash\"`. Node.js résout l'import en cherchant dans `node_modules/`.",
          },
          {
            title: "Ajouter un script",
            detail:
              "Dans `package.json`, ajoutez `\"start\": \"node index.js\"` sous `scripts`, puis lancez avec `npm start` (ou `npm run start`).",
          },
        ],
      },
      {
        kind: "command",
        label: "Initialiser un projet",
        command: "mkdir mon-projet && cd mon-projet && npm init -y",
        why: "Crée le dossier du projet et génère `package.json` avec les valeurs par défaut (nom = nom du dossier, version 1.0.0). C'est le point de départ de tout projet npm — sans `package.json`, `npm install` n'a rien où enregistrer les dépendances.",
        verify: "cat package.json",
      },
    ],
  },
  {
    id: "installer-des-paquets",
    title: "Installer des paquets",
    level: 2,
    intro:
      "Les quatre façons d'ajouter une dépendance, et quand utiliser chacune.",
    blocks: [
      {
        kind: "command",
        label: "Ajouter une dépendance de production",
        command: "npm install lodash",
        why: "Installe la dernière version compatible et l'enregistre dans `dependencies` : ces paquets sont nécessaires à l'exécution de l'application et seront installés en production.",
        verify: "npm ls lodash",
      },
      {
        kind: "command",
        label: "Ajouter une dépendance de développement",
        command: "npm install -D typescript",
        why: "Le flag `-D` (alias de `--save-dev`) enregistre dans `devDependencies` : outils de build, testeurs, linters. Ils sont installés en développement mais exclus des builds de production allégés (`npm ci --omit=dev`).",
        verify: "npm ls typescript",
      },
      {
        kind: "command",
        label: "Installer un outil global",
        command: "npm install -g npm-check-updates",
        why: "Le flag `-g` installe le paquet pour tout le système et expose ses binaires dans le PATH. Réservé aux outils en ligne de commande (pas aux bibliothèques) : un paquet global n'est pas versionné avec votre projet.",
        verify: "npm ls -g --depth=0",
      },
      {
        kind: "text",
        text: "Règle simple : bibliothèque utilisée par votre code → `dependencies` ; outil de build/test → `-D` ; utilitaire CLI utilisé partout → `-g`. Mettre une bibliothèque en global « pour ne pas l'installer partout » casse la reproductibilité : chaque machine aurait sa propre version.",
      },
    ],
  },
  {
    id: "scripts-npm",
    title: "Scripts npm",
    level: 2,
    intro:
      "Automatiser les tâches du projet : dev, build, test, lint.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Scripts typiques",
        code: "{\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"tsc && vite build\",\n    \"preview\": \"vite preview\",\n    \"test\": \"vitest run\",\n    \"lint\": \"eslint src\"\n  }\n}",
      },
      {
        kind: "command",
        label: "Lancer un script",
        command: "npm run build",
        why: "Exécute la commande associée dans `scripts`. npm ajoute automatiquement `node_modules/.bin` au PATH pendant l'exécution : les binaires des dépendances (vite, tsc, eslint) sont donc disponibles sans installation globale.",
        verify: "npm run",
      },
      {
        kind: "text",
        text: "`npm run` sans argument liste tous les scripts disponibles — utile pour découvrir les commandes d'un projet qu'on ne connaît pas. Notez les raccourcis : `npm test` et `npm start` fonctionnent sans `run`, par convention historique.",
      },
    ],
  },
  {
    id: "semver-les-bases",
    title: "Semver : les bases",
    level: 2,
    intro:
      "Lire un numéro de version et comprendre ce qu'une mise à jour peut casser.",
    blocks: [
      {
        kind: "table",
        headers: ["Version", "Signification", "Exemple"],
        rows: [
          ["`1.4.2`", "`major.minor.patch`", "Version 1, 4e fonctionnalité, 2e correctif"],
          ["`^1.4.2`", "Compatible : `>=1.4.2 <2.0.0`", "Accepte 1.5.0 et 1.4.9, refuse 2.0.0"],
          ["`~1.4.2`", "Correctifs : `>=1.4.2 <1.5.0`", "Accepte 1.4.9, refuse 1.5.0"],
          ["`1.4.2` exact", "Version figée", "Toujours exactement 1.4.2"],
          ["`*` / `latest`", "N'importe quelle version", "À éviter : non reproductible"],
        ],
      },
      {
        kind: "text",
        text: "Le versionnage sémantique est un contrat : `major` = changements incompatibles, `minor` = nouveautés compatibles, `patch` = correctifs. `^` (défaut de npm) accepte les minor et patch : c'est le compromis standard entre fraîcheur et stabilité. En pratique, tous les mainteneurs ne respectent pas parfaitement semver — d'où l'importance du lockfile.",
      },
    ],
  },
  {
    id: "lockfile",
    title: "Le lockfile",
    level: 2,
    intro:
      "Pourquoi `package-lock.json` garantit des installations identiques partout.",
    blocks: [
      {
        kind: "text",
        text: "`package.json` déclare des plages (`^1.4.2`), mais `package-lock.json` fige les versions exactes installées — y compris toutes les dépendances transitives (les dépendances des dépendances). Quand un collègue ou la CI lance `npm ci`, ce sont exactement ces versions qui sont installées : plus de « ça marche sur ma machine ».",
      },
      {
        kind: "command",
        label: "Installation reproductible (CI, déploiement)",
        command: "npm ci",
        why: "`ci` (clean install) supprime `node_modules` et réinstalle exactement les versions du lockfile, sans le modifier. Plus rapide et plus strict que `npm install`, qui lui peut mettre à jour le lockfile. C'est la commande à utiliser en CI et en production.",
        verify: "npm ls --depth=0",
      },
      {
        kind: "list",
        items: [
          "Versionnez toujours `package-lock.json` avec Git. Ne l'ajoutez jamais au `.gitignore` (sauf pour une bibliothèque publiée, où il est ignoré par convention).",
          "`npm install` peut mettre à jour le lockfile ; `npm ci` ne le touche jamais.",
          "Après un `git pull` qui modifie le lockfile, relancez `npm ci` pour synchroniser `node_modules`.",
        ],
      },
    ],
  },
  {
    id: "gestionnaires-alternatifs",
    title: "Les gestionnaires alternatifs",
    level: 2,
    intro:
      "npm n'est pas seul : pnpm, yarn et bun, présentés factuellement.",
    blocks: [
      {
        kind: "table",
        headers: ["", "npm", "pnpm", "yarn", "bun"],
        rows: [
          ["Livré avec", "Node.js", "À installer (`npm i -g pnpm`)", "À installer ou via corepack", "Le runtime Bun"],
          ["Installer", "`npm install`", "`pnpm install`", "`yarn install`", "`bun install`"],
          ["Lockfile", "`package-lock.json`", "`pnpm-lock.yaml`", "`yarn.lock`", "`bun.lock`"],
          ["Particularité", "Référence universelle", "Store partagé + liens : rapide, pas de dépendances fantômes", "Pionnier des lockfiles et workspaces", "Le plus rapide, lié au runtime Bun"],
        ],
      },
      {
        kind: "text",
        text: "Aucun n'est universellement supérieur : pnpm économise l'espace disque et empêche d'importer une dépendance non déclarée, yarn a un écosystème mature, bun est le plus rapide mais impose son runtime. L'essentiel : un projet = un gestionnaire = un lockfile. Mélanger npm et pnpm dans le même projet, c'est l'assurance du chaos.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs",
    level: 2,
    intro:
      "Le support npm dans l'éditeur au quotidien.",
    blocks: [
      {
        kind: "fields",
        title: "Les options",
        fields: [
          {
            label: "VS Code",
            value: "Vue « NPM Scripts » intégrée à l'explorateur pour lancer les scripts d'un clic. L'extension « npm Intellisense » autocomplète les noms de modules dans les `import`.",
          },
          {
            label: "WebStorm",
            value: "Support npm natif : exécution des scripts, navigation vers les paquets, inspections de `package.json`.",
          },
          {
            label: "Terminal",
            value: "`npm run` liste les scripts, `npx` exécute les binaires locaux. Beaucoup de développeurs n'utilisent que ça.",
          },
        ],
      },
    ],
  },
  {
    id: "npmrc",
    title: "Configuration avec .npmrc",
    level: 2,
    intro:
      "Régler le comportement de npm : registre, versions exactes, scripts.",
    blocks: [
      {
        kind: "command",
        label: "Voir la configuration effective",
        command: "npm config list",
        why: "Affiche toute la configuration active et d'où vient chaque valeur (fichier projet, utilisateur, global, défaut). Quand npm se comporte bizarrement (mauvais registre, proxy), c'est ici qu'on diagnostique.",
      },
      {
        kind: "code",
        language: "ini",
        title: ".npmrc d'exemple (à la racine du projet)",
        code: "save-exact=true\nengine-strict=true\nfund=false\naudit=false",
      },
      {
        kind: "text",
        text: "`save-exact=true` enregistre des versions exactes plutôt que des plages `^` (choix d'équipe). `engine-strict=true` fait échouer l'installation si la version de Node.js ne correspond pas au champ `engines` de `package.json`. Ne commitez jamais de secrets dans `.npmrc` : les tokens de registre appartiennent au `.npmrc` utilisateur (`~/.npmrc`), pas au dépôt.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "Les commandes de maintenance : audit, mises à jour, nettoyage.",
    blocks: [
      {
        kind: "command",
        label: "Auditer les vulnérabilités",
        command: "npm audit",
        why: "Compare vos dépendances à la base de vulnérabilités connues et affiche un rapport par sévérité. À lancer régulièrement : les dépendances sont la principale surface d'attaque d'une application JS.",
        verify: "npm audit --audit-level=high",
      },
      {
        kind: "command",
        label: "Voir les mises à jour disponibles",
        command: "npm outdated",
        why: "Liste les paquets dont une version plus récente existe, avec la version voulue (selon semver) et la dernière disponible. Le point de départ d'une session de mise à jour raisonnée — jamais en aveugle avant une mise en production.",
        verify: "npm update --dry-run",
      },
      {
        kind: "command",
        label: "Mettre à jour les dépendances",
        command: "npm update",
        why: "Met à jour chaque paquet vers la version maximale autorisée par sa plage semver et réécrit le lockfile. Pour les mises à jour majeures (breaking changes), il faut modifier la plage à la main puis réinstaller.",
        verify: "npm ls --depth=0",
      },
    ],
  },
  {
    id: "npx-en-pratique",
    title: "npx en pratique",
    level: 2,
    intro:
      "Exécuter des binaires sans les installer globalement.",
    blocks: [
      {
        kind: "command",
        label: "Exécuter un binaire local",
        command: "npx tsc --version",
        why: "`npx` cherche le binaire dans `node_modules/.bin` du projet et l'exécute — avec la version du projet, pas une version globale arbitraire. Si le paquet n'est pas installé, `npx` le télécharge temporairement : pratique pour un essai ponctuel, pas pour un usage régulier.",
        verify: "npx --yes cowsay \"bonjour\"",
      },
      {
        kind: "text",
        text: "Depuis npm 7, `npm exec` est l'équivalent intégré (`npm exec -- tsc --version`). Dans les scripts `package.json`, inutile de préfixer : `node_modules/.bin` est déjà dans le PATH, écrivez directement `tsc --version`.",
      },
    ],
  },
  {
    id: "depannage-installation",
    title: "Dépannage d'installation",
    level: 2,
    intro:
      "Quand `npm install` échoue : la procédure standard.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire l'erreur en entier",
            detail:
              "npm affiche un résumé puis un log détaillé. Le code d'erreur (`EACCES`, `ERESOLVE`, `ELIFECYCLE`) oriente le diagnostic — voir la section Erreurs courantes.",
          },
          {
            title: "Réinstallation propre",
            detail:
              "Supprimez `node_modules` et `package-lock.json`, puis relancez `npm install`. Ça résout la majorité des états incohérents (installation interrompue, mélange de gestionnaires).",
          },
          {
            title: "Vérifier le cache",
            detail:
              "`npm cache verify` contrôle l'intégrité du cache local. En dernier recours, `npm cache clean --force` le vide entièrement.",
          },
          {
            title: "Vérifier Node et npm",
            detail:
              "`node -v && npm -v` : une version trop ancienne (ou une installation via `sudo`) explique beaucoup d'échecs. Utilisez un gestionnaire de versions.",
          },
        ],
      },
      {
        kind: "command",
        label: "Réinstallation propre",
        command: "rm -rf node_modules package-lock.json && npm install",
        why: "Repart d'un état vierge : supprime les dépendances installées et le lockfile, puis réinstalle tout depuis `package.json`. Radical mais efficace contre les états corrompus. Ne faites jamais ça sans avoir commité le lockfile avant — sinon vous perdez les versions exactes.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "anatomy-package-json",
    title: "Anatomie de package.json",
    level: 3,
    intro:
      "Les champs importants au-delà de `name` et `version`.",
    blocks: [
      {
        kind: "fields",
        title: "Les champs à connaître",
        fields: [
          { label: "`main` / `exports`", value: "Point d'entrée du paquet quand il est importé. `exports` (moderne) contrôle finement ce qui est exposable et permet les doubles builds CJS/ESM." },
          { label: "`type`", value: "`\"module\"` = ESM (`import`), absent ou `\"commonjs\"` = CJS (`require`). Détermine comment Node.js interprète vos `.js`." },
          { label: "`engines`", value: "Versions de Node.js requises (`{\"node\": \">=18\"}`). Avec `engine-strict=true`, l'installation échoue si la version ne convient pas." },
          { label: "`bin`", value: "Déclare les exécutables du paquet : npm crée les liens dans `node_modules/.bin` (et globalement si installé avec `-g`)." },
          { label: "`files`", value: "Liste blanche des fichiers inclus dans le paquet publié. Sans lui, tout le dossier part (moins les exclus par défaut)." },
          { label: "`peerDependencies`", value: "« J'ai besoin que l'hôte fournisse ce paquet » (ex. un plugin React exige `react`). Détails dans la section dédiée." },
          { label: "`overrides`", value: "Force une version précise d'une dépendance transitive : l'arme anti-vulnérabilité quand le mainteneur tarde à corriger." },
        ],
      },
    ],
  },
  {
    id: "types-de-dependances",
    title: "Types de dépendances",
    level: 3,
    intro:
      "dependencies, devDependencies, peerDependencies, optionalDependencies : le bon tiroir pour chaque paquet.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Installé en prod", "Usage typique"],
        rows: [
          ["`dependencies`", "Oui", "Bibliothèques utilisées par le code en production (react, express, lodash)"],
          ["`devDependencies`", "Non (`--omit=dev`)", "Build, tests, lint (typescript, vitest, eslint)"],
          ["`peerDependencies`", "Par l'hôte", "Plugins qui s'attendent à la lib hôte (un plugin babel attend `@babel/core`)"],
          ["`optionalDependencies`", "Oui (échec toléré)", "Optimisations non critiques (binaire natif avec fallback JS)"],
          ["`bundledDependencies`", "Oui (empaqueté)", "Paquets inclus dans le tarball publié — rare, cas offline"],
        ],
      },
      {
        kind: "text",
        text: "L'erreur la plus coûteuse : mettre un outil de build en `dependencies` (image Docker gonflée, surface d'attaque élargie) ou, pire, une bibliothèque de runtime en `devDependencies` (application qui plante en production car le paquet manque).",
      },
    ],
  },
  {
    id: "peer-dependencies",
    title: "Peer dependencies",
    level: 3,
    intro:
      "Le mécanisme des plugins : « apporte ta propre version de l'hôte ».",
    blocks: [
      {
        kind: "text",
        text: "Un plugin (ex. un plugin ESLint) ne doit pas embarquer sa propre copie de l'hôte (ESLint) : il déclare `peerDependencies: { \"eslint\": \"^8.0.0\" }` pour dire « installe-moi à côté d'un ESLint compatible, fourni par le projet ». Depuis npm 7, les peer deps sont installées automatiquement ; en cas de conflit de versions, npm échoue avec `ERESOLVE` au lieu d'installer silencieusement des doublons — un comportement plus strict mais plus sain.",
      },
      {
        kind: "command",
        label: "Voir l'arbre des dépendances",
        command: "npm ls eslint",
        why: "Affiche où chaque version d'un paquet est installée dans l'arbre et qui la demande. Indispensable pour comprendre les doublons et les conflits de peer dependencies.",
        verify: "npm explain eslint",
      },
    ],
  },
  {
    id: "semver-avance",
    title: "Semver avancé",
    level: 3,
    intro:
      "Les subtilités des plages de versions : pré-releases, `0.x`, et pièges.",
    blocks: [
      {
        kind: "fields",
        title: "Cas particuliers",
        fields: [
          { label: "Versions `0.x`", value: "En `0.y.z`, tout peut casser à chaque release : `^0.2.3` n'accepte que `>=0.2.3 <0.3.0`. Beaucoup de paquets restent longtemps en 0.x — lisez leur changelog." },
          { label: "Pré-releases", value: "`1.0.0-beta.1` : npm ne les installe jamais via une plage normale (`^1.0.0` ignore les betas). Il faut les demander explicitement." },
          { label: "`>=`, `<`, plages composées", value: "`>=1.2.0 <2.0.0`, `1.2.0 - 1.4.0` : expressif mais à réserver aux cas particuliers — `^` et `~` couvrent 95 % des besoins." },
          { label: "Tags (`latest`, `next`)", value: "`npm install pkg@next` installe le tag `next` plutôt que `latest`. Utile pour tester une prochaine version, jamais en production." },
        ],
      },
      {
        kind: "text",
        text: "Rappel important : semver est une convention, pas une loi. Certains mainteneurs introduisent des breaking changes en minor. D'où la règle : lisez le changelog avant toute mise à jour majeure, et testez après chaque `npm update` significatif.",
      },
    ],
  },
  {
    id: "lockfiles-en-detail",
    title: "Lockfiles en détail",
    level: 3,
    intro:
      "Ce que contient vraiment `package-lock.json` et comment il est utilisé.",
    blocks: [
      {
        kind: "text",
        text: "Le lockfile enregistre pour chaque paquet : la version exacte résolue, l'URL du tarball téléchargé, son hash d'intégrité (`integrity`), et l'arbre complet des dépendances transitives. Le hash est vérifié à chaque installation : si le registre servait un tarball différent, npm refuserait de l'installer. C'est à la fois un mécanisme de reproductibilité et une protection contre les compromissions du registre.",
      },
      {
        kind: "list",
        items: [
          "`lockfileVersion` : le format du lockfile — npm le migre automatiquement, mais un lockfile v3 n'est pas lisible par un npm 6.",
          "Ne jamais éditer le lockfile à la main : utilisez `npm install pkg@version` pour changer une version proprement.",
          "Conflits de merge sur le lockfile : supprimez-le et régénérez avec `npm install` plutôt que de résoudre à la main (puis vérifiez le diff).",
        ],
      },
    ],
  },
  {
    id: "resolution-des-modules",
    title: "Résolution des modules",
    level: 3,
    intro:
      "Comment Node.js trouve le code d'un `import` dans `node_modules`.",
    blocks: [
      {
        kind: "text",
        text: "Quand vous écrivez `import _ from \"lodash\"`, Node.js cherche `node_modules/lodash` en remontant les dossiers parents depuis votre fichier. À l'intérieur du paquet, il lit `package.json` : le champ `exports` (ou `main` en fallback) indique le fichier d'entrée. Les imports relatifs (`./utils`) sont résolus par chemin de fichier, les imports nus (`lodash`) par cette recherche dans `node_modules`.",
      },
      {
        kind: "diagram",
        title: "Résolution d'un import nu",
        lines: [
          "import \"lodash\" depuis /projet/src/app.js",
          "   │",
          "   ▼",
          "1. /projet/src/node_modules/lodash ?",
          "2. /projet/node_modules/lodash ?  ◄── trouvé ici",
          "3. /node_modules/lodash ?",
          "   │",
          "   ▼  lit package.json → exports → fichier d'entrée",
        ],
      },
    ],
  },
  {
    id: "node-modules-anatomie",
    title: "Anatomie de node_modules",
    level: 3,
    intro:
      "Ce que npm installe vraiment : arborescence, `.bin`, doublons.",
    blocks: [
      {
        kind: "text",
        text: "npm « aplati » l'arbre des dépendances : tout ce qui peut être partagé va à la racine de `node_modules`, et les versions en conflit sont nichées dans le `node_modules` du paquet qui les demande. `node_modules/.bin` contient les liens vers les exécutables — c'est lui que npm ajoute au PATH dans les scripts. Les doublons (deux versions d'un même paquet) sont normaux et parfois inévitables ; `npm dedupe` tente de les réduire en remontant les versions compatibles.",
      },
      {
        kind: "command",
        label: "Réduire les doublons",
        command: "npm dedupe",
        why: "Réorganise l'arbre pour partager un maximum de versions compatibles et supprimer les copies redondantes. Utile après plusieurs installations successives qui ont laissé des doublons. Vérifiez que les tests passent après — le dédoublonnage change les versions réellement chargées.",
        verify: "npm ls --depth=0 | wc -l",
      },
    ],
  },
  {
    id: "npx-et-npm-exec",
    title: "npx et npm exec",
    level: 3,
    intro:
      "Les nuances de l'exécution de binaires : cache, versions, sécurité.",
    blocks: [
      {
        kind: "fields",
        title: "À savoir",
        fields: [
          { label: "`npx pkg`", value: "Utilise la version locale si installée, sinon télécharge et exécute temporairement. Pratique, mais chaque exécution d'un paquet non installé va sur le réseau." },
          { label: "`npx --no-install`", value: "Refuse de télécharger : n'exécute que ce qui est déjà installé. À utiliser dans les scripts CI pour éviter les surprises." },
          { label: "`npx -p pkg commande`", value: "Installe temporairement `pkg` puis exécute `commande` dedans. Utile pour les outils qu'on ne veut pas dans le projet." },
          { label: "`npm exec`", value: "L'équivalent intégré depuis npm 7. `npm exec -- tsc --version` : le `--` sépare les options de npm de celles de la commande." },
          { label: "Sécurité", value: "`npx` qui télécharge à la volée exécute du code non audité : ne l'utilisez jamais avec un nom de paquet incertain (risque de typosquatting)." },
        ],
      },
    ],
  },
  {
    id: "workspaces",
    title: "Workspaces",
    level: 3,
    intro:
      "Gérer un monorepo : plusieurs paquets, une seule installation.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Déclarer des workspaces",
        code: "{\n  \"name\": \"monorepo\",\n  \"private\": true,\n  \"workspaces\": [\"packages/*\", \"apps/*\"]\n}",
      },
      {
        kind: "text",
        text: "Les workspaces lient les paquets locaux entre eux : `packages/ui` peut dépendre de `packages/utils` via une dépendance normale, et npm crée un lien symbolique au lieu de télécharger. Un seul `npm install` à la racine installe tout, avec un seul lockfile. `npm run build -w packages/ui` exécute un script dans un workspace précis. Le `\"private\": true` à la racine empêche de publier accidentellement le monorepo entier.",
      },
      {
        kind: "command",
        label: "Exécuter un script dans un workspace",
        command: "npm run build -w packages/ui",
        why: "Le flag `-w` (workspace) cible un paquet précis du monorepo. Sans lui, il faudrait `cd` dans chaque paquet. `--workspaces` (pluriel) exécute le script dans tous les workspaces qui le définissent.",
        verify: "npm ls --workspaces",
      },
    ],
  },
  {
    id: "registres",
    title: "Registres",
    level: 3,
    intro:
      "D'où viennent les paquets : registre public, privé, et miroirs.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, npm télécharge depuis le registre public (registry.npmjs.org). Les entreprises utilisent souvent un registre privé ou un proxy (qui met en cache le public et héberge les paquets internes). On change de registre par projet (`.npmrc` avec `registry=...`) ou par scope (`@monorg:registry=...`) : ce dernier point est crucial — il évite qu'un paquet interne `@monorg/secret` soit cherché (et potentiellement substitué) sur le registre public.",
      },
      {
        kind: "command",
        label: "Voir le registre configuré",
        command: "npm config get registry",
        why: "Affiche le registre utilisé pour les installations. Si vos paquets privés ne se trouvent pas, c'est souvent ici que ça coince : mauvais registre, ou scope non configuré.",
        verify: "npm ping",
      },
    ],
  },
  {
    id: "scopes",
    title: "Scopes",
    level: 3,
    intro:
      "Les paquets `@organisation/nom` : espaces de noms et publication.",
    blocks: [
      {
        kind: "text",
        text: "Un scope (`@angular/core`, `@types/node`) est un espace de noms : il regroupe les paquets d'une organisation et évite les collisions de noms. Les paquets scopés sont privés par défaut à la publication (il faut `--access public` pour les rendre publics). Côté configuration, on peut associer un registre différent par scope — la base d'une séparation propre entre paquets internes et registre public.",
      },
      {
        kind: "command",
        label: "Associer un registre à un scope",
        command: "npm config set @monorg:registry https://registry.interne/",
        why: "Dit à npm de chercher tous les paquets `@monorg/*` sur le registre interne. Enregistré dans `~/.npmrc` (jamais dans le dépôt si l'URL est sensible). C'est aussi une protection contre la substitution de dépendances (dependency confusion).",
      },
    ],
  },
  {
    id: "scripts-avances",
    title: "Scripts avancés",
    level: 3,
    intro:
      "Hooks pre/post, chaînage et composition de scripts.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Hooks et chaînage",
        code: "{\n  \"scripts\": {\n    \"prebuild\": \"npm run lint\",\n    \"build\": \"tsc && vite build\",\n    \"postbuild\": \"node scripts/verify-dist.js\",\n    \"check\": \"npm run lint && npm run test\"\n  }\n}",
      },
      {
        kind: "text",
        text: "`prebuild` s'exécute automatiquement avant `build`, `postbuild` après : les hooks `pre`/`post` existent pour tout script. `&&` enchaîne les commandes (la suivante ne tourne que si la précédente réussit). Attention : la syntaxe des scripts est celle du shell (`sh`) — les constructions spécifiques à bash/zsh ne fonctionneront pas partout, notamment sur Windows. Pour des scripts complexes multi-plateformes, préférez un vrai fichier JS exécuté avec `node`.",
      },
    ],
  },
  {
    id: "variables-environnement",
    title: "Variables d'environnement",
    level: 3,
    intro:
      "Passer des valeurs aux scripts sans les écrire en dur.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Variables dans les scripts",
        code: "# Dans package.json :\n# \"scripts\": { \"dev\": \"vite --port $PORT\" }\n\nPORT=3000 npm run dev",
      },
      {
        kind: "text",
        text: "Les variables d'environnement préfixées sont transmises aux scripts : `PORT=3000 npm run dev`. Pour les variables spécifiques à npm, tout ce qui est défini sous `config` dans `package.json` devient `npm_package_config_*` dans le script. Règle d'or : jamais de secret en dur dans `package.json` — utilisez des fichiers `.env` (non versionnés) chargés par votre application.",
      },
    ],
  },
  {
    id: "securite-audit",
    title: "Sécurité : audit",
    level: 3,
    intro:
      "Exploiter `npm audit` au-delà du simple rapport.",
    blocks: [
      {
        kind: "command",
        label: "Corriger automatiquement",
        command: "npm audit fix",
        why: "Tente de corriger les vulnérabilités en montant les paquets vers des versions corrigées compatibles semver. Relancez vos tests après : une montée de version, même mineure, peut changer un comportement. `npm audit fix --force` monte aussi les majeures — à n'utiliser qu'en connaissance de cause.",
        verify: "npm audit",
      },
      {
        kind: "text",
        text: "`npm audit` ne voit que les vulnérabilités connues et publiées : zéro alerte ne signifie pas zéro risque. Complétez avec : mises à jour régulières, un nombre minimal de dépendances (chaque paquet est une responsabilité), et la vérification des mainteneurs pour les paquets critiques. En CI, `npm audit --audit-level=high` fait échouer le build au-delà d'un seuil — à calibrer pour ne pas bloquer l'équipe en permanence.",
      },
    ],
  },
  {
    id: "signatures-et-provenance",
    title: "Signatures et provenance",
    level: 3,
    intro:
      "Vérifier que le paquet installé est bien celui publié par son auteur.",
    blocks: [
      {
        kind: "text",
        text: "Chaque tarball du registre est accompagné d'un hash d'intégrité vérifié à l'installation (stocké dans le lockfile) : ça protège contre la corruption et la substitution en transit. Au-delà, la provenance (Sigstore) atteste qu'un paquet a été publié depuis un pipeline CI précis : `npm publish --provenance` lie le paquet à son dépôt GitHub. Côté consommation, `npm view <pkg> dist.integrity` montre le hash attendu. Ces mécanismes ne remplacent pas l'audit du code, mais ils ferment la porte aux compromissions du registre.",
      },
    ],
  },
  {
    id: "publication",
    title: "Publier un paquet",
    level: 3,
    intro:
      "Les étapes d'une publication propre sur le registre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer le paquet",
            detail:
              "Vérifiez `name` (unique sur le registre), `version`, `main`/`exports`, `files` (ce qui sera inclus), et le `README` qui servira de page sur npmjs.com.",
          },
          {
            title: "Tester le contenu avec un dry-run",
            detail:
              "`npm publish --dry-run` affiche ce qui serait publié sans rien envoyer : vérifiez la liste des fichiers, surtout avec un champ `files` restrictif.",
          },
          {
            title: "S'authentifier",
            detail:
              "`npm login` (ou un token via `npm token`). Activez la 2FA sur votre compte npm : les prises de contrôle de comptes sont la voie royale des attaques supply-chain.",
          },
          {
            title: "Publier",
            detail:
              "`npm publish`. Pour un paquet scopé public : `npm publish --access public`. La version publiée est immuable — toute correction passe par une nouvelle version.",
          },
        ],
      },
      {
        kind: "command",
        label: "Simuler une publication",
        command: "npm publish --dry-run",
        why: "Affiche le tarball qui serait envoyé (fichiers inclus, taille) sans publier. Le filet de sécurité avant chaque release : on y repère les fichiers oubliés (build non généré) ou en trop (secrets, dossiers de test).",
        verify: "npm pack --dry-run",
      },
    ],
  },
  {
    id: "dist-tags",
    title: "Dist-tags",
    level: 3,
    intro:
      "Gérer plusieurs lignes de versions : `latest`, `next`, `beta`.",
    blocks: [
      {
        kind: "command",
        label: "Lister et gérer les tags",
        command: "npm dist-tag ls mon-paquet",
        why: "Un dist-tag est un alias mutable vers une version (`latest` → 2.1.0). `npm install pkg` installe le tag `latest` par défaut. Les tags permettent de maintenir une `next` (beta testée par les volontaires) sans perturber les utilisateurs de `latest`.",
        verify: "npm view mon-paquet dist-tags",
      },
      {
        kind: "text",
        text: "Workflow typique : publiez les betas avec `--tag next`, et ne déplacez `latest` que quand la version est validée. Jamais de breaking change surprise sur `latest` : c'est ce que des millions d'installations récupèrent par défaut.",
      },
    ],
  },
  {
    id: "deprecation",
    title: "Déprécier un paquet",
    level: 3,
    intro:
      "Signaler proprement qu'une version (ou un paquet) ne doit plus être utilisée.",
    blocks: [
      {
        kind: "command",
        label: "Marquer une version comme dépréciée",
        command: "npm deprecate mon-paquet@\"<2.0.0\" \"Utilisez la v2 : breaking changes, voir le guide de migration\"",
        why: "Affiche un avertissement à chaque installation des versions concernées, sans les supprimer (le code existant continue de fonctionner). C'est la manière respectueuse de faire migrer les utilisateurs — bien plus propre qu'une suppression brutale.",
      },
    ],
  },
  {
    id: "unpublish",
    title: "Unpublish : les règles",
    level: 3,
    intro:
      "Pourquoi on ne supprime quasiment jamais un paquet publié.",
    blocks: [
      {
        kind: "text",
        text: "npm ne permet de dépublier que dans les 72 heures suivant la publication (et jamais si le paquet a des dépendants significatifs) : au-delà, les versions sont immuables. Cette règle existe depuis l'incident « left-pad » de 2016, où la suppression d'un micro-paquet avait cassé des milliers de builds dans le monde. Moralité : publiez avec `--dry-run` d'abord, dépréciez plutôt que supprimer, et considérez chaque publication comme définitive.",
      },
    ],
  },
  {
    id: "versioning-strategies",
    title: "Stratégies de versionnage",
    level: 3,
    intro:
      "Choisir comment incrémenter les versions : manuel, conventional commits, CI.",
    blocks: [
      {
        kind: "command",
        label: "Incrémenter la version proprement",
        command: "npm version patch",
        why: "Incrémente la version dans `package.json` (et `package-lock.json`), crée un commit et un tag Git. `patch`, `minor`, `major` suivent semver ; `prerelease` gère les betas. Bien plus fiable qu'une édition manuelle qui oublierait le lockfile ou le tag.",
        verify: "git log --oneline -2 && git tag | tail -2",
      },
      {
        kind: "text",
        text: "En équipe, le versionnage manuel ne passe pas l'échelle : les conventional commits (`feat:`, `fix:`) permettent de dériver automatiquement le bon incrément (minor vs patch) et de générer le changelog en CI. Quel que soit l'outil, la règle reste : la version reflète la nature du changement, pas l'humeur du moment.",
      },
    ],
  },
  {
    id: "ci-avec-npm-ci",
    title: "npm en CI",
    level: 3,
    intro:
      "Des pipelines rapides et fiables avec le cache et `npm ci`.",
    blocks: [
      {
        kind: "list",
        items: [
          "Toujours `npm ci`, jamais `npm install` : installation exacte du lockfile, échec si le lockfile est désynchronisé.",
          "Mettez en cache `~/.npm` entre les runs : le téléchargement est le poste le plus lent, le cache le divise par 5 à 10.",
          "Figez la version de Node.js (fichier `.nvmrc` ou matrice CI) : le même code doit tourner sur la même version partout.",
          "Séparez les jobs : `lint`, `test`, `build` en parallèle après une seule installation.",
          "`npm audit --audit-level=high` comme garde-fou, calibré pour ne pas bloquer sur chaque alerte mineure.",
        ],
      },
      {
        kind: "code",
        language: "bash",
        title: "Séquence CI typique",
        code: "npm ci\nnpm run lint\nnpm test -- --run\nnpm run build",
      },
    ],
  },
  {
    id: "cache",
    title: "Le cache npm",
    level: 3,
    intro:
      "Comment npm évite de retélécharger, et quand le vider.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier l'intégrité du cache",
        command: "npm cache verify",
        why: "Contrôle que le contenu du cache (`~/.npm/_cacache`) est cohérent et affiche sa taille. Le cache rend les installations répétées quasi instantanées : npm ne retélécharge que ce qui a changé.",
        verify: "npm cache ls 2>/dev/null | head -5",
      },
      {
        kind: "text",
        text: "Le cache est indexé par hash d'intégrité : un tarball corrompu ne peut pas en sortir silencieusement. `npm cache clean --force` vide tout — rarement nécessaire, à réserver aux cas où `verify` signale un problème ou après un changement de registre.",
      },
    ],
  },
  {
    id: "installation-hors-ligne",
    title: "Installation hors ligne",
    level: 3,
    intro:
      "Installer sans accès réseau : cache, tarballs et registres locaux.",
    blocks: [
      {
        kind: "list",
        items: [
          "Avec un cache chaud : `npm ci --offline` (ou `--prefer-offline`) installe depuis le cache sans toucher le réseau — échoue proprement si un paquet manque.",
          "`npm pack` produit un tarball installable avec `npm install ./pkg-1.0.0.tgz` : utile pour tester un paquet local ou transférer sans registre.",
          "En entreprise : un registre proxy avec cache (qui sert les paquets déjà vus même si le réseau externe coupe) est la solution robuste.",
          "`bundledDependencies` embarque les dépendances dans le paquet publié — le dernier recours pour les environnements vraiment isolés.",
        ],
      },
    ],
  },
  {
    id: "performance-installation",
    title: "Performance d'installation",
    level: 3,
    intro:
      "Pourquoi `npm install` est parfois lent, et comment l'accélérer.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers",
        fields: [
          { label: "Le réseau", value: "Le poste dominant : chaque tarball est téléchargé. Un registre miroir proche géographiquement ou un proxy d'entreprise change tout." },
          { label: "Le cache", value: "Deuxième installation du même arbre = quasi instantanée grâce à `~/.npm/_cacache`." },
          { label: "Les scripts postinstall", value: "Certains paquets compilent du natif à l'installation (node-gyp) : c'est lent et fragile. Préférez les paquets avec binaires précompilés." },
          { label: "`--no-audit`, `--no-fund`", value: "Désactivent l'audit et les messages de financement pendant l'install : quelques secondes gagnées en CI." },
          { label: "Moins de dépendances", value: "Le plus efficace : chaque paquet en moins, c'est du temps, du disque et du risque en moins." },
        ],
      },
    ],
  },
  {
    id: "debugging-dependances",
    title: "Debugging des dépendances",
    level: 3,
    intro:
      "Comprendre pourquoi tel paquet, telle version, est installé.",
    blocks: [
      {
        kind: "command",
        label: "Expliquer la présence d'un paquet",
        command: "npm explain lodash",
        why: "Affiche la chaîne complète : qui dépend de lodash, en quelle version, pourquoi cette version a été choisie. Quand deux versions coexistent ou qu'une version surprend, `explain` donne la réponse en une commande.",
        verify: "npm ls lodash",
      },
      {
        kind: "command",
        label: "Inspecter un paquet distant",
        command: "npm view react versions --json | tail -5",
        why: "Interroge le registre sans rien installer : versions disponibles, dépendances, date de publication. Idéal pour vérifier qu'une version existe avant de l'épingler, ou comparer les dates de release.",
      },
    ],
  },
  {
    id: "licences",
    title: "Licences",
    level: 3,
    intro:
      "Les obligations légales cachées dans `node_modules`.",
    blocks: [
      {
        kind: "text",
        text: "Chaque paquet a une licence (`MIT`, `Apache-2.0`, `GPL`…) déclarée dans son `package.json`. La plupart sont permissives, mais certaines (GPL, AGPL) imposent de publier votre code sous la même licence si vous distribuez l'application — un risque juridique réel pour un produit commercial. Auditez les licences de vos dépendances (directes et transitives) avant une mise en production sérieuse, et bannissez les paquets sans licence déclarée.",
      },
    ],
  },
  {
    id: "npm-view-et-explore",
    title: "Explorer le registre",
    level: 3,
    intro:
      "Trouver et évaluer un paquet avant de l'installer.",
    blocks: [
      {
        kind: "command",
        label: "Rechercher un paquet",
        command: "npm search \"validation schema\" --no-description",
        why: "Recherche dans le registre depuis le terminal. Pour une évaluation sérieuse, complétez sur le site : date de dernière publication, nombre de téléchargements hebdo, dépôt GitHub (issues ouvertes, activité), qualité du README.",
      },
      {
        kind: "command",
        label: "Voir les métadonnées d'un paquet",
        command: "npm view zod dist.tarball engines repository.url",
        why: "Affiche des champs précis sans installer : où est le tarball, quelles versions de Node sont supportées, où est le dépôt source. La vérification rapide avant d'ajouter une dépendance.",
      },
      {
        kind: "text",
        text: "Critères d'évaluation d'un paquet : maintenance active (release récente), popularité, taille et nombre de dépendances transitives, licence, et qualité du code si le paquet est critique pour vous. Un paquet abandonné avec 2 millions de téléchargements hebdo reste un paquet abandonné.",
      },
    ],
  },
  {
    id: "npm-doctor",
    title: "npm doctor",
    level: 3,
    intro:
      "Le diagnostic automatique de l'environnement npm.",
    blocks: [
      {
        kind: "command",
        label: "Diagnostiquer l'environnement",
        command: "npm doctor",
        why: "Vérifie en une fois : versions de node/npm/git, permissions des dossiers, connectivité au registre, intégrité du cache. Chaque check affiche OK ou un conseil de correction. Le premier réflexe quand « npm ne marche plus » sans erreur claire.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les codes d'erreur npm les plus fréquents, décodés.",
    blocks: [
      {
        kind: "table",
        headers: ["Code", "Signification", "Solution"],
        rows: [
          ["`EACCES`", "Permission refusée (souvent `~/.npm` ou dossier global)", "Ne pas utiliser `sudo` ; réparer les permissions ou utiliser un gestionnaire de versions"],
          ["`ERESOLVE`", "Conflit de peer dependencies", "`npm explain` pour comprendre, mettre à jour les paquets concernés, `--legacy-peer-deps` en dernier recours"],
          ["`ELIFECYCLE`", "Un script a échoué (exit non-zéro)", "Lancer le script à la main pour voir la vraie erreur — npm ne fait que rapporter"],
          ["`ENOENT`", "Fichier ou binaire introuvable", "Vérifier le chemin, réinstaller le paquet, vérifier `node_modules/.bin`"],
          ["`EAI_AGAIN` / `ENOTFOUND`", "Problème réseau / DNS vers le registre", "Vérifier la connexion, le proxy, `npm ping`"],
          ["`EINTEGRITY`", "Hash du tarball ne correspond pas", "Cache corrompu ou registre compromis : `npm cache verify`, ne pas forcer aveuglément"],
          ["`EBADENGINE`", "Version de Node incompatible", "Changer de version Node (nvm/fnm) ou mettre à jour le paquet"],
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes d'une gestion saine des dépendances.",
    blocks: [
      {
        kind: "list",
        items: [
          "Versionnez `package.json` ET `package-lock.json`. Toujours.",
          "`npm ci` en CI et en production, `npm install` en développement.",
          "Un minimum de dépendances : chaque paquet est du temps, du risque et de la maintenance.",
          "Évaluez un paquet avant de l'adopter : maintenance, licence, dépendances transitives.",
          "Mettez à jour régulièrement par petites touches, pas une fois par an dans la panique.",
          "`npm audit` régulier, et `overrides` pour corriger vite les transitives vulnérables.",
          "Ne commitez jamais de secrets (tokens, `.npmrc` avec credentials).",
          "Figez Node.js (`.nvmrc`) pour que toute l'équipe et la CI utilisent la même version.",
        ],
      },
    ],
  },
  {
    id: "projet-cli",
    title: "Projet : publier un CLI",
    level: 3,
    intro:
      "Créer et publier un petit outil en ligne de commande.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire l'outil",
            detail:
              "Un script Node avec shebang (`#!/usr/bin/env node`), déclaré dans `bin` de `package.json`. Testez en local avec `npm link` qui crée le lien global.",
          },
          {
            title: "Préparer la publication",
            detail:
              "Renseignez `name`, `version`, `description`, `files`, `engines`. Rédigez un README avec exemples d'utilisation.",
          },
          {
            title: "Dry-run puis publication",
            detail:
              "`npm publish --dry-run` pour vérifier le contenu, puis `npm publish --access public` (si scopé). Vérifiez la page du paquet sur le registre.",
          },
          {
            title: "Itérer",
            detail:
              "Corrigez un bug, `npm version patch`, republiez. Observez le cycle complet version → tag → release.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-monorepo",
    title: "Projet : monorepo avec workspaces",
    level: 3,
    intro:
      "Structurer plusieurs paquets liés dans un seul dépôt.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Initialiser",
            detail:
              "Racine avec `\"private\": true` et `\"workspaces\": [\"packages/*\"]`. Créez deux paquets : `ui` et `utils`.",
          },
          {
            title: "Lier",
            detail:
              "`ui` dépend de `utils` via une version locale : un seul `npm install` à la racine crée le lien symbolique.",
          },
          {
            title: "Scripter",
            detail:
              "Scripts racine qui délèguent : `\"build\": \"npm run build --workspaces\"`. Testez `npm run test -w packages/utils`.",
          },
          {
            title: "Versionner ensemble ou séparément",
            detail:
              "Réfléchissez à la stratégie : versions indépendantes par paquet (flexible) ou version unique (simple). Documentez le choix.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-pipeline-audit",
    title: "Projet : pipeline d'audit",
    level: 3,
    intro:
      "Mettre en place une garde de sécurité automatisée sur les dépendances.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Baseline",
            detail:
              "`npm audit` sur le projet : notez les vulnérabilités existantes par sévérité.",
          },
          {
            title: "Corriger",
            detail:
              "`npm audit fix` pour les correctifs compatibles, `overrides` ciblés pour les transitives bloquées. Validez par les tests.",
          },
          {
            title: "Automatiser",
            detail:
              "En CI : `npm audit --audit-level=high` fait échouer le build. Planifiez aussi un job hebdomadaire de mise à jour.",
          },
          {
            title: "Documenter la politique",
            detail:
              "Seuils, exceptions justifiées, responsable des mises à jour : écrivez la politique de dépendances de l'équipe.",
          },
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
          { label: "npm Docs", value: "docs.npmjs.com : la référence complète — CLI, package.json, registre, publication." },
          { label: "Référence CLI", value: "Une page par commande (`npm install`, `npm audit`…) avec tous les flags et exemples." },
          { label: "Blog et changelog npm", value: "Suivre les évolutions du client npm et les changements de comportement entre versions." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : créez un paquet factice et publiez-le en privé pour apprivoiser tout le cycle sans risque.",
          "Comparez les lockfiles (`package-lock.json` vs `pnpm-lock.yaml`) pour comprendre les philosophies des gestionnaires.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "npm maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Accélérer : essayer `pnpm` — store partagé, installations rapides, dépendances fantômes impossibles.",
          "Construire : `vite` — le bundler moderne qui s'appuie sur l'écosystème npm.",
          "Publier : approfondir les registres privés et les pipelines de release automatisés.",
          "Sécuriser : supply-chain (signatures, provenance, SBOM) pour les projets critiques.",
          "Revenir à la roadmap : valider npm et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

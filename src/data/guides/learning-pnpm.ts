import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de pnpm : de zéro à une gestion professionnelle
 * des dépendances et des monorepos. 3 niveaux d'information (Aperçu /
 * Pratique / Approfondi) avec divulgation progressive. Tous les textes
 * supportent le code inline entre backticks. Commandes toujours
 * expliquées : label, commande, pourquoi, vérification.
 */
export const LEARNING_PNPM: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est pnpm, quel problème il résout et sa relation avec npm.",
    blocks: [
      {
        kind: "text",
        text: "pnpm est un gestionnaire de paquets pour JavaScript, compatible avec le registre npm. Il installe les dépendances d'un projet comme npm, mais avec une architecture différente : au lieu de copier chaque paquet dans chaque projet, pnpm conserve une seule copie de chaque version dans un store global sur disque, puis relie les projets à ce store par des liens. Le résultat : des installations plus rapides et beaucoup moins d'espace disque utilisé.",
      },
      {
        kind: "text",
        text: "Pourquoi pnpm existe : avec npm, dix projets qui dépendent de la même version de React copient React dix fois sur le disque. Avec pnpm, React n'est stocké qu'une fois. Au-delà de l'économie de disque, pnpm crée par défaut un `node_modules` strict et isolé : un paquet ne peut accéder qu'aux dépendances déclarées, ce qui élimine toute une classe de bugs silencieux (les « phantom dependencies »).",
      },
      {
        kind: "text",
        text: "Relation avec npm : pnpm lit le même `package.json`, installe depuis le même registre, et produit un lockfile (`pnpm-lock.yaml`). Un projet pnpm reste un projet npm standard — les outils (bundlers, frameworks) ne voient aucune différence.",
      },
    ],
  },
  {
    id: "pnpm-vs-npm",
    title: "pnpm vs npm : le store partagé",
    level: 1,
    intro:
      "La différence fondamentale, en une image : un seul store, des liens partout.",
    blocks: [
      {
        kind: "diagram",
        title: "npm : chaque projet copie tout",
        lines: [
          "projet-a/node_modules/react/...      (copie 1)",
          "projet-b/node_modules/react/...      (copie 2, identique)",
          "projet-c/node_modules/react/...      (copie 3, identique)",
          "",
          "3 projets = 3 copies sur le disque.",
        ],
      },
      {
        kind: "diagram",
        title: "pnpm : un store, des liens",
        lines: [
          "~/.pnpm-store/react@18.2.0/          (une seule copie réelle)",
          "     ├── projet-a/node_modules/react  → lien",
          "     ├── projet-b/node_modules/react  → lien",
          "     └── projet-c/node_modules/react  → lien",
          "",
          "3 projets = 1 copie sur le disque.",
        ],
      },
      {
        kind: "text",
        text: "Conséquence pratique : après la première installation d'une version d'un paquet, les projets suivants l'installent quasi instantanément — le store la contient déjà, il suffit de créer les liens. Sur une machine avec beaucoup de projets, la différence d'espace disque et de vitesse est spectaculaire.",
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
      "Ce qu'il faut connaître avant d'adopter pnpm au quotidien.",
    blocks: [
      {
        kind: "fields",
        title: "Connaissances requises",
        fields: [
          {
            label: "npm et `package.json`",
            value:
              "Les concepts sont identiques : dépendances, devDependencies, scripts, semver. pnpm est une alternative à npm, pas un nouveau paradigme — la compétence `npm` de la roadmap couvre ces bases.",
          },
          {
            label: "Terminal",
            value:
              "Installer, ajouter et mettre à jour des paquets se fait en ligne de commande. Les commandes pnpm ressemblent beaucoup à celles de npm.",
          },
          {
            label: "Node.js",
            value:
              "pnpm s'installe via npm lui-même et nécessite une version récente de Node.js.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer pnpm sur sa machine, en comprenant ce que fait chaque méthode.",
    blocks: [
      {
        kind: "command",
        label: "Installer pnpm globalement via npm",
        command: "npm install -g pnpm",
        why: "La méthode la plus simple quand npm est déjà installé : pnpm devient une commande globale disponible partout. La documentation officielle documente aussi un script d'installation standalone et Corepack pour figer la version de pnpm par projet.",
        verify: "pnpm --version",
      },
      {
        kind: "text",
        text: "Une fois installé, pnpm gère lui-même l'emplacement de son store global (dans le dossier personnel par défaut). Aucune configuration n'est nécessaire pour commencer : `pnpm install` dans un projet fonctionne immédiatement.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Votre premier projet pnpm en 10 minutes",
    level: 2,
    intro:
      "Créer un projet, installer des dépendances et lancer un script, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Initialiser le projet",
            detail:
              "`pnpm init` crée un `package.json` minimal, comme `npm init -y`.",
          },
          {
            title: "Ajouter une dépendance",
            detail:
              "`pnpm add lodash` : télécharge le paquet dans le store (s'il n'y est pas déjà), crée les liens dans `node_modules`, et met à jour `package.json` et `pnpm-lock.yaml`.",
          },
          {
            title: "Ajouter un script",
            detail:
              "Dans `package.json`, ajouter `\"scripts\": { \"start\": \"node index.js\" }` puis lancer avec `pnpm start`.",
          },
          {
            title: "Réinstaller à partir du lockfile",
            detail:
              "Supprimer `node_modules` puis lancer `pnpm install` : les dépendances sont restaurées à l'identique grâce au lockfile, en quelques secondes si le store les contient déjà.",
          },
        ],
      },
      {
        kind: "code",
        language: "bash",
        title: "Séquence complète",
        code: `mkdir mon-projet && cd mon-projet\npnpm init\npnpm add lodash\npnpm add -D typescript\nnode -e "console.log(require('lodash').VERSION)"`,
      },
    ],
  },
  {
    id: "installer-ajouter-supprimer",
    title: "Installer, ajouter, supprimer",
    level: 2,
    intro:
      "Les trois commandes du quotidien, et leurs équivalents npm.",
    blocks: [
      {
        kind: "command",
        label: "Installer les dépendances du projet",
        command: "pnpm install",
        why: "Lit `pnpm-lock.yaml` et reconstruit `node_modules` à l'identique. Équivalent de `npm ci` en esprit (reproductible), mais c'est aussi la commande d'installation normale.",
      },
      {
        kind: "command",
        label: "Ajouter une dépendance",
        command: "pnpm add axios",
        why: "Équivalent de `npm install axios` : ajoute à `dependencies` et met à jour le lockfile. Avec `-D`, la dépendance va dans `devDependencies` (`pnpm add -D vitest`).",
      },
      {
        kind: "command",
        label: "Supprimer une dépendance",
        command: "pnpm remove axios",
        why: "Équivalent de `npm uninstall axios` : retire du `package.json`, du lockfile et de `node_modules`.",
      },
      {
        kind: "command",
        label: "Mettre à jour les dépendances",
        command: "pnpm up",
        why: "Équivalent de `npm update` : met à jour selon les plages semver du `package.json`. Avec `--latest`, ignore les plages et prend les dernières versions.",
      },
      {
        kind: "table",
        headers: ["npm", "pnpm", "Note"],
        rows: [
          ["`npm install`", "`pnpm install`", "Identique en usage"],
          ["`npm install <pkg>`", "`pnpm add <pkg>`", "Nom différent, même effet"],
          ["`npm uninstall <pkg>`", "`pnpm remove <pkg>`", "Nom différent, même effet"],
          ["`npm update`", "`pnpm up`", "Nom différent, même effet"],
          ["`npx <pkg>`", "`pnpm dlx <pkg>`", "Exécution sans installation"],
          ["`npm run <script>`", "`pnpm <script>`", "`run` optionnel avec pnpm"],
        ],
      },
    ],
  },
  {
    id: "scripts",
    title: "Scripts : `pnpm run` et raccourcis",
    level: 2,
    intro:
      "Lancer les scripts du `package.json` avec pnpm.",
    blocks: [
      {
        kind: "command",
        label: "Lancer un script",
        command: "pnpm dev",
        why: "Équivalent de `npm run dev` : le `run` est optionnel avec pnpm. Les binaires des dépendances (`node_modules/.bin`) sont automatiquement dans le PATH pendant l'exécution du script.",
        verify: "pnpm run",
      },
      {
        kind: "text",
        text: "`pnpm run` sans argument liste les scripts disponibles — pratique pour découvrir les commandes d'un projet inconnu. Les variables d'environnement et le cycle de vie des scripts (`predev`, `postbuild`) fonctionnent comme avec npm.",
      },
    ],
  },
  {
    id: "pnpm-dlx",
    title: "`pnpm dlx` : exécuter sans installer",
    level: 2,
    intro:
      "L'équivalent pnpm de `npx` : lancer un paquet sans l'ajouter au projet.",
    blocks: [
      {
        kind: "command",
        label: "Exécuter un outil sans l'installer",
        command: "pnpm dlx create-vite@latest",
        why: "Télécharge le paquet dans un emplacement temporaire, l'exécute, puis nettoie. Parfait pour les scaffolders (`create-vite`, `create-next-app`) et les outils ponctuels : le projet reste propre, sans dépendance inutile.",
      },
      {
        kind: "text",
        text: "Différence avec `npx` : `pnpm dlx` n'installe jamais dans le projet courant et ne pollue pas le cache npm global — tout passe par le store pnpm. Pour exécuter un binaire déjà installé dans le projet, on utilise `pnpm exec` (voir la section dédiée).",
      },
    ],
  },
  {
    id: "lockfile",
    title: "Le lockfile `pnpm-lock.yaml`",
    level: 2,
    intro:
      "Le fichier qui garantit des installations reproductibles.",
    blocks: [
      {
        kind: "text",
        text: "`pnpm-lock.yaml` enregistre l'arbre exact des dépendances résolues : chaque paquet avec sa version précise et son intégrité vérifiée. Quand un collègue (ou la CI) lance `pnpm install`, il obtient exactement les mêmes versions. C'est le même rôle que `package-lock.json` pour npm.",
      },
      {
        kind: "list",
        items: [
          "À commiter dans le dépôt : sans lui, chaque installation peut résoudre des versions différentes.",
          "Ne jamais l'éditer à la main : il est généré par `pnpm add`, `pnpm up`, `pnpm install`.",
          "Après un `git pull` qui modifie le lockfile, relancer `pnpm install` pour synchroniser `node_modules`.",
          "En cas de lockfile corrompu ou incohérent : le supprimer puis relancer `pnpm install` le régénère proprement.",
        ],
      },
    ],
  },
  {
    id: "versions-semver",
    title: "Versions et semver",
    level: 2,
    intro:
      "Lire et écrire les plages de versions comme pnpm les comprend.",
    blocks: [
      {
        kind: "table",
        headers: ["Notation", "Signification", "Exemple"],
        rows: [
          ["`^1.2.3`", "Compatible : `>=1.2.3 <2.0.0`", "Comportement par défaut de `pnpm add`"],
          ["`~1.2.3`", "Patchs uniquement : `>=1.2.3 <1.3.0`", "Mises à jour très conservatrices"],
          ["`1.2.3`", "Version exacte", "Reproductibilité maximale"],
          ["`latest`", "Dernière version publiée", "À éviter dans un projet suivi"],
        ],
      },
      {
        kind: "text",
        text: "Le caret (`^`) est le défaut : il autorise les mises à jour mineures et de patch, qui sont censées ne pas casser la compatibilité. Le lockfile fige ensuite la version exacte résolue, donc le caret n'introduit pas d'aléatoire entre deux installations — seulement lors des mises à jour volontaires (`pnpm up`).",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "La boucle de travail typique avec pnpm.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie des dépendances",
        lines: [
          "pnpm add <pkg>        (nouvelle dépendance)",
          "     │",
          "     ▼",
          "pnpm install          (après git pull / changement de branche)",
          "     │",
          "     ▼",
          "pnpm dev / test / build   (scripts du projet)",
          "     │",
          "     ▼",
          "pnpm up               (mise à jour volontaire)",
          "     │",
          "     ▼",
          "pnpm audit            (vérifier les vulnérabilités)",
        ],
      },
      {
        kind: "list",
        items: [
          "On commence la journée par `pnpm install` si le lockfile a changé.",
          "On ajoute les dépendances avec `pnpm add` / `pnpm add -D`.",
          "On met à jour volontairement avec `pnpm up`, jamais par accident.",
          "On vérifie périodiquement avec `pnpm audit` et `pnpm outdated`.",
        ],
      },
    ],
  },
  {
    id: "erreurs-debutants",
    title: "Erreurs classiques des débutants",
    level: 2,
    intro:
      "Les pièges spécifiques à pnpm quand on vient de npm.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["Mélanger npm et pnpm", "Deux lockfiles, `node_modules` incohérent", "Choisir l'un, supprimer l'autre lockfile et `node_modules`, réinstaller"],
          ["Oublier le lockfile dans git", "« Ça marche chez moi » en CI", "Commiter `pnpm-lock.yaml`"],
          ["`pnpm install <pkg>`", "Erreur : pnpm n'a pas cette syntaxe", "Utiliser `pnpm add <pkg>`"],
          ["Dépendance fantôme", "`Cannot find module` sur un paquet non déclaré", "Déclarer explicitement chaque import direct avec `pnpm add`"],
          ["Supprimer le store à la main", "Installations cassées", "Utiliser `pnpm store prune`, jamais `rm -rf` manuel"],
        ],
      },
    ],
  },
  {
    id: "migration-npm-pnpm",
    title: "Migrer un projet npm vers pnpm",
    level: 2,
    intro:
      "La migration est réversible et prend quelques minutes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Sauvegarder l'état actuel",
            detail: "Commiter le travail en cours : en cas de problème, on peut revenir en arrière proprement.",
          },
          {
            title: "Supprimer les artefacts npm",
            detail: "Supprimer `node_modules` et `package-lock.json`. Le `package.json` est conservé tel quel — pnpm le lit directement.",
          },
          {
            title: "Installer avec pnpm",
            detail: "`pnpm install` : pnpm résout les dépendances depuis le `package.json` et génère `pnpm-lock.yaml`. Les versions peuvent différer légèrement de l'ancien lockfile.",
          },
          {
            title: "Vérifier que tout fonctionne",
            detail: "Lancer les scripts du projet (`pnpm dev`, `pnpm test`, `pnpm build`). La plupart des projets fonctionnent sans modification.",
          },
          {
            title: "Traiter les dépendances fantômes",
            detail: "Si le build échoue avec `Cannot find module`, c'est le `node_modules` strict qui révèle un import non déclaré : l'ajouter explicitement avec `pnpm add`.",
          },
        ],
      },
    ],
  },
  {
    id: "editeurs-outils",
    title: "Éditeurs et outils",
    level: 2,
    intro:
      "pnpm s'intègre sans friction aux outils existants.",
    blocks: [
      {
        kind: "fields",
        title: "Intégrations",
        fields: [
          {
            label: "VS Code et autres IDE",
            value:
              "Aucune configuration spécifique : l'IDE lit `package.json` et résout les types via `node_modules`, que les paquets soient des liens ou des copies.",
          },
          {
            label: "TypeScript",
            value:
              "La résolution des types fonctionne normalement à travers les liens symboliques. Aucun réglage particulier requis.",
          },
          {
            label: "ESLint / Prettier",
            value:
              "S'exécutent via `pnpm exec` ou les scripts npm comme d'habitude.",
          },
          {
            label: "Volta / asdf",
            value:
              "Les gestionnaires de versions de Node fonctionnent avec pnpm sans configuration supplémentaire.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-store",
    title: "Architecture : le store adressable par contenu",
    level: 3,
    intro:
      "Comment pnpm stocke réellement les paquets : le mécanisme au cœur de sa vitesse.",
    blocks: [
      {
        kind: "text",
        text: "Le store pnpm est « adressable par contenu » : chaque fichier d'un paquet est stocké sous un nom dérivé de son contenu (hash), pas de son nom de paquet. Deux versions différentes de React qui partagent des fichiers identiques ne stockent ces fichiers qu'une fois. C'est ce qui rend le store si compact.",
      },
      {
        kind: "diagram",
        title: "Du store au node_modules",
        lines: [
          "Store global (~/.local/share/pnpm/store)",
          " └── fichiers adressés par hash (une seule copie)",
          "          │",
          "          │ hard links",
          "          ▼",
          "node_modules/.pnpm/react@18.2.0/node_modules/react/",
          "          │",
          "          │ symlinks",
          "          ▼",
          "node_modules/react  →  .pnpm/react@18.2.0/node_modules/react",
        ],
      },
      {
        kind: "text",
        text: "Deux niveaux de liens : des liens physiques (hard links) du store vers un dossier `.pnpm` par version, puis des liens symboliques de `node_modules/<pkg>` vers ce dossier. Les liens physiques ne dupliquent pas les données sur le disque — c'est toute l'économie.",
      },
      {
        kind: "command",
        label: "Voir où se trouve le store",
        command: "pnpm store path",
        why: "Affiche le chemin du store global. Utile pour vérifier l'espace disque utilisé ou pour le déplacer via la configuration `store-dir` (par exemple vers un disque plus grand).",
      },
      {
        kind: "command",
        label: "Nettoyer le store",
        command: "pnpm store prune",
        why: "Supprime du store les paquets qui ne sont plus référencés par aucun projet. À lancer occasionnellement quand le disque se remplit — jamais de suppression manuelle.",
      },
    ],
  },
  {
    id: "node-linker-isole",
    title: "Le `node_modules` isolé par défaut",
    level: 3,
    intro:
      "La différence de comportement la plus importante avec npm : la stricte isolation.",
    blocks: [
      {
        kind: "text",
        text: "Avec npm, tout est aplati : si `A` dépend de `B`, alors `B` est accessible depuis n'importe quel fichier du projet, même sans être déclaré. Avec pnpm, chaque paquet ne voit que ses propres dépendances déclarées. Un paquet ne peut pas importer un module qu'il n'a pas déclaré — l'import échoue immédiatement au lieu de fonctionner par accident.",
      },
      {
        kind: "table",
        headers: ["Situation", "npm (hoisted)", "pnpm (isolé)"],
        rows: [
          ["Importer une dépendance non déclarée", "Fonctionne (par accident)", "Échoue avec `Cannot find module`"],
          ["Deux versions d'un même paquet", "Une seule version survit à l'aplatissement", "Chaque paquet voit sa version déclarée"],
          ["Bugs silencieux", "Fréquents : le code dépend de l'arbre aplati", "Rares : l'arbre reflète les déclarations"],
        ],
      },
      {
        kind: "text",
        text: "Cette stricte isolation révèle les « phantom dependencies » : des imports qui fonctionnaient avec npm uniquement grâce à l'aplatissement. Les corriger (déclarer explicitement chaque import direct) rend le projet plus sain, quel que soit le gestionnaire utilisé ensuite.",
      },
    ],
  },
  {
    id: "symlinks-modele",
    title: "Le modèle des liens symboliques",
    level: 3,
    intro:
      "Comprendre la structure réelle de `node_modules` avec pnpm.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure d'un node_modules pnpm",
        lines: [
          "node_modules/",
          " ├── react  →  .pnpm/react@18.2.0/node_modules/react",
          " ├── react-dom  →  .pnpm/react-dom@18.2.0+react@18.2.0/node_modules/react-dom",
          " └── .pnpm/",
          "      ├── react@18.2.0/node_modules/",
          "      │    ├── react/            (liens physiques vers le store)",
          "      │    └── loose-envify/     (dépendance de react, visible par react seul)",
          "      └── react-dom@18.2.0+react@18.2.0/node_modules/",
          "           └── ...",
        ],
      },
      {
        kind: "text",
        text: "Le dossier `.pnpm` contient un sous-dossier par paquet et par combinaison de pairs (`react-dom@18.2.0+react@18.2.0` signifie : react-dom avec son peer react en 18.2.0). Chaque paquet n'a accès qu'à ses dépendances déclarées — l'isolation est structurelle, pas conventionnelle.",
      },
    ],
  },
  {
    id: "workspaces",
    title: "Workspaces : le monorepo natif",
    level: 3,
    intro:
      "Gérer plusieurs paquets dans un seul dépôt, avec des dépendances croisées propres.",
    blocks: [
      {
        kind: "text",
        text: "Un workspace pnpm déclare dans `pnpm-workspace.yaml` les dossiers qui sont des paquets du monorepo. Les paquets peuvent dépendre les uns des autres avec la version `workspace:*` : pnpm crée des liens directs au lieu d'aller chercher sur le registre, et une seule commande à la racine installe tout.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "pnpm-workspace.yaml",
        code: `packages:\n  - "apps/*"\n  - "packages/*"\n  # exclure un dossier :\n  - "!packages/interne-legacy"`,
      },
      {
        kind: "code",
        language: "json",
        title: "apps/web/package.json : dépendre d'un paquet local",
        code: `{\n  "name": "@monorepo/web",\n  "dependencies": {\n    "@monorepo/ui": "workspace:*"\n  }\n}`,
      },
      {
        kind: "text",
        text: "`workspace:*` signifie « prendre la version locale, quelle qu'elle soit ». À la publication, pnpm remplace automatiquement par la version réelle. Les workspaces partagent aussi un lockfile unique à la racine par défaut.",
      },
    ],
  },
  {
    id: "filter-syntax",
    title: "Filtrer : `--filter`",
    level: 3,
    intro:
      "Exécuter une commande sur un sous-ensemble précis du monorepo.",
    blocks: [
      {
        kind: "command",
        label: "Lancer le build d'un seul paquet",
        command: "pnpm --filter @monorepo/web build",
        why: "Exécute le script `build` uniquement dans le paquet nommé. Indispensable dans un monorepo de 20 paquets : on ne rebuild pas tout pour tester un changement localisé.",
      },
      {
        kind: "command",
        label: "Inclure les dépendances du paquet",
        command: "pnpm --filter @monorepo/web... build",
        why: "Les trois points après le nom incluent aussi ses dépendances workspace. Pour builder `web` correctement, il faut d'abord builder `ui` dont il dépend.",
      },
      {
        kind: "command",
        label: "Filtrer par dossier ou par dépendant",
        command: "pnpm --filter \"./packages/*\" test",
        why: "Les filtres acceptent des globs de chemins. Avec `...` devant (`...@monorepo/ui`), on sélectionne les dépendants : tous les paquets qui dépendent de `ui` — parfait pour tester l'impact d'un changement.",
      },
    ],
  },
  {
    id: "commandes-recursives",
    title: "Commandes récursives : `-r`",
    level: 3,
    intro:
      "Appliquer une commande à tout le workspace d'un coup.",
    blocks: [
      {
        kind: "command",
        label: "Exécuter un script dans tous les paquets",
        command: "pnpm -r build",
        why: "Équivalent de `--recursive` : lance `build` dans chaque paquet du workspace, dans un ordre qui respecte les dépendances (les dépendances d'abord). La commande échoue si un paquet n'a pas le script — sauf avec `--if-present`.",
      },
      {
        kind: "command",
        label: "Ajouter une dépendance partout",
        command: "pnpm -r add -D typescript",
        why: "Ajoute TypeScript en devDependency de chaque paquet. Pratique pour uniformiser l'outillage du monorepo en une commande.",
      },
      {
        kind: "text",
        text: "Ordre d'exécution : pnpm trie topologiquement — un paquet est traité après ses dépendances workspace. Pour du parallélisme contrôlé sur les scripts longs, les options de concurrence de pnpm s'appliquent.",
      },
    ],
  },
  {
    id: "peer-dependencies",
    title: "Peer dependencies : la gestion stricte",
    level: 3,
    intro:
      "pnpm est strict sur les peer dependencies : comprendre pourquoi c'est une qualité.",
    blocks: [
      {
        kind: "text",
        text: "Une peer dependency déclare « j'ai besoin que le projet hôte fournisse telle version de tel paquet » (ex. un plugin ESLint qui exige ESLint). npm les installe automatiquement depuis sa version 7, ce qui masque les conflits. pnpm, lui, exige qu'elles soient résolues explicitement — un conflit de peers est une erreur visible, pas un comportement silencieux.",
      },
      {
        kind: "list",
        items: [
          "Si `pnpm install` échoue sur un conflit de peers, c'est une information : deux paquets exigent des versions incompatibles.",
          "Solution propre : ajouter explicitement la peer dependency au projet (`pnpm add -D`) avec une version qui satisfait tout le monde.",
          "Le réglage `auto-install-peers=true` dans `.npmrc` restaure le comportement automatique façon npm — pratique, mais on perd la visibilité.",
          "Le réglage `strict-peer-dependencies=true` rend les conflits bloquants même quand ils ne le seraient pas par défaut.",
        ],
      },
    ],
  },
  {
    id: "npmrc-configuration",
    title: "Configuration : le fichier `.npmrc`",
    level: 3,
    intro:
      "Les réglages pnpm vivent dans `.npmrc`, au format npm standard.",
    blocks: [
      {
        kind: "code",
        language: "ini",
        title: ".npmrc — réglages courants",
        code: `# Installer automatiquement les peer dependencies (façon npm)\nauto-install-peers=true\n\n# Échouer sur les conflits de peers non résolus\nstrict-peer-dependencies=true\n\n# Utiliser un node_modules aplati (compatibilité, voir section dédiée)\n# node-linker=hoisted\n\n# Déplacer le store (ex. autre disque)\n# store-dir=/mnt/data/pnpm-store`,
      },
      {
        kind: "text",
        text: "Le `.npmrc` peut vivre à la racine du projet (versionné, partagé par l'équipe) ou dans le dossier personnel (préférences individuelles). pnpm lit aussi les variables d'environnement préfixées et les flags de ligne de commande, avec la priorité habituelle : CLI > projet > utilisateur.",
      },
    ],
  },
  {
    id: "overrides",
    title: "Overrides : forcer une version",
    level: 3,
    intro:
      "Quand une dépendance transitive pose problème, la forcer à une version saine.",
    blocks: [
      {
        kind: "text",
        text: "Les `pnpm.overrides` dans `package.json` forcent la résolution d'un paquet — y compris transitif — vers une version choisie. Cas typique : une faille de sécurité dans une sous-dépendance qu'aucun paquet parent n'a encore mise à jour.",
      },
      {
        kind: "code",
        language: "json",
        title: "package.json — forcer une version",
        code: `{\n  "pnpm": {\n    "overrides": {\n      "lodash@<4.17.21": "4.17.21"\n    }\n  }\n}`,
      },
      {
        kind: "text",
        text: "Ici, toute résolution de lodash inférieure à 4.17.21 est remplacée par 4.17.21, partout dans l'arbre. À utiliser avec parcimonie : un override masque le vrai problème (le paquet parent obsolète) et doit être retiré quand celui-ci est corrigé.",
      },
    ],
  },
  {
    id: "pnpm-patch",
    title: "`pnpm patch` : corriger un paquet",
    level: 3,
    intro:
      "Appliquer un correctif local à une dépendance, de façon versionnée et reproductible.",
    blocks: [
      {
        kind: "command",
        label: "Créer un patch pour un paquet",
        command: "pnpm patch lodash",
        why: "Ouvre une copie modifiable du paquet : on y applique le correctif, puis `pnpm patch-commit <chemin>` génère un fichier de patch versionné dans `patches/`. Le patch est appliqué automatiquement à chaque `pnpm install` — toute l'équipe et la CI en bénéficient.",
      },
      {
        kind: "text",
        text: "Le patch est déclaré dans `package.json` sous `pnpm.patchedDependencies`. C'est la solution propre quand on ne peut pas attendre la correction officielle : le correctif est visible, réversible (`pnpm patch-remove`), et disparaît proprement quand on met à jour vers la version corrigée.",
      },
    ],
  },
  {
    id: "catalogs",
    title: "Catalogs : centraliser les versions",
    level: 3,
    intro:
      "Une seule source de vérité pour les versions dans un monorepo.",
    blocks: [
      {
        kind: "text",
        text: "Les catalogs (définis dans `pnpm-workspace.yaml`) déclarent les versions des dépendances partagées une seule fois. Chaque paquet référence le catalogue au lieu de répéter la version : mettre à jour React dans 15 paquets devient une modification d'une ligne.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "pnpm-workspace.yaml avec catalogue",
        code: `packages:\n  - "apps/*"\n  - "packages/*"\n\ncatalog:\n  react: ^18.2.0\n  typescript: ~5.4.0`,
      },
      {
        kind: "code",
        language: "json",
        title: "package.json d'un paquet du workspace",
        code: `{\n  "dependencies": {\n    "react": "catalog:"\n  }\n}`,
      },
      {
        kind: "text",
        text: "À la publication, pnpm remplace `catalog:` par la version résolue. Les catalogs nommés permettent plusieurs groupes de versions (ex. un catalogue `legacy` pour les paquets non migrés).",
      },
    ],
  },
  {
    id: "audit-dependances",
    title: "Auditer : `pnpm audit`",
    level: 3,
    intro:
      "Détecter les vulnérabilités connues dans l'arbre de dépendances.",
    blocks: [
      {
        kind: "command",
        label: "Auditer les dépendances",
        command: "pnpm audit",
        why: "Interroge la base de vulnérabilités du registre npm et liste les failles affectant le projet, avec leur sévérité. À lancer régulièrement et en CI : une dépendance vulnérable est une porte d'entrée.",
        verify: "pnpm audit --help",
      },
      {
        kind: "text",
        text: "Réponse graduée : `pnpm up <pkg>` si une version corrigée existe dans la plage semver ; `pnpm.overrides` si le correctif nécessite de forcer une transitive ; `pnpm patch` en dernier recours. Un audit rouge n'est pas toujours bloquant — on évalue l'exploitabilité réelle avant de paniquer.",
      },
    ],
  },
  {
    id: "why-et-outdated",
    title: "`pnpm why` et `pnpm outdated`",
    level: 3,
    intro:
      "Deux commandes d'inspection : pourquoi ce paquet est là, et ce qui peut être mis à jour.",
    blocks: [
      {
        kind: "command",
        label: "Comprendre pourquoi un paquet est installé",
        command: "pnpm why lodash",
        why: "Affiche la chaîne de dépendance qui amène lodash dans le projet : quel paquet direct en dépend, et à travers quels intermédiaires. Indispensable quand on veut supprimer ou mettre à jour une transitive.",
      },
      {
        kind: "command",
        label: "Lister les mises à jour disponibles",
        command: "pnpm outdated",
        why: "Compare les versions installées aux dernières publiées, en distinguant les mises à jour compatibles (vertes) des majeures (rouges, potentiellement cassantes). Le point de départ d'une session de mise à jour raisonnée.",
      },
    ],
  },
  {
    id: "pnpm-exec",
    title: "`pnpm exec` : lancer un binaire local",
    level: 3,
    intro:
      "Exécuter les outils installés dans le projet, sans les installer globalement.",
    blocks: [
      {
        kind: "command",
        label: "Exécuter un binaire du projet",
        command: "pnpm exec eslint src/",
        why: "Lance le binaire `eslint` de `node_modules/.bin` avec les arguments donnés. Équivalent direct de `npx eslint` mais sans risque de télécharger une autre version depuis le registre : c'est toujours la version du projet qui s'exécute.",
      },
      {
        kind: "text",
        text: "Triptyque à retenir : `pnpm dlx` = exécuter un paquet distant sans l'installer ; `pnpm exec` = exécuter un paquet déjà installé dans le projet ; script `package.json` = la forme versionnée et partageable des deux.",
      },
    ],
  },
  {
    id: "publier-package",
    title: "Publier un paquet",
    level: 3,
    intro:
      "De `pnpm publish` aux bonnes pratiques de publication.",
    blocks: [
      {
        kind: "command",
        label: "Publier sur le registre",
        command: "pnpm publish",
        why: "Publie le paquet courant sur le registre npm configuré, après avoir vérifié les champs requis (`name`, `version`). Avec `--dry-run`, affiche ce qui serait publié sans rien envoyer — à utiliser systématiquement avant la vraie publication.",
      },
      {
        kind: "list",
        items: [
          "Le champ `files` de `package.json` contrôle ce qui est empaqueté : ne publier que le nécessaire (dist, README, LICENSE).",
          "Ne jamais publier avec des dépendances `workspace:*` non résolues : pnpm les remplace automatiquement à la publication.",
          "Versionner selon semver : patch pour un correctif, minor pour une fonctionnalité, major pour un changement cassant.",
          "En monorepo : `pnpm -r publish` publie chaque paquet, avec gestion des versions indépendantes.",
        ],
      },
    ],
  },
  {
    id: "monorepo-patterns",
    title: "Patterns de monorepo",
    level: 3,
    intro:
      "Organiser un monorepo pnpm qui reste maintenable en grandissant.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure type",
        lines: [
          "monorepo/",
          " ├── pnpm-workspace.yaml   (packages, catalog)",
          " ├── package.json          (scripts racine : build, test, lint)",
          " ├── apps/",
          " │    ├── web/             (application)",
          " │    └── api/             (application)",
          " └── packages/",
          "      ├── ui/              (composants partagés)",
          "      ├── config/          (configs eslint/ts partagées)",
          "      └── utils/           (fonctions partagées)",
        ],
      },
      {
        kind: "list",
        items: [
          "Nommage : préfixer les paquets internes (`@monorepo/ui`) pour les distinguer des paquets publics.",
          "Scripts racine : `pnpm -r build` orchestre tout ; des scripts ciblés (`pnpm --filter web dev`) pour le quotidien.",
          "Configs partagées : un paquet `@monorepo/config` centralise ESLint, TypeScript, Prettier — une seule source de vérité.",
          "Lockfile unique à la racine : une seule résolution pour tout le monorepo, des versions cohérentes partout.",
        ],
      },
    ],
  },
  {
    id: "ci-cache",
    title: "pnpm en CI : cache du store",
    level: 3,
    intro:
      "Rendre les installations CI aussi rapides qu'en local grâce au cache.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Cache pnpm dans GitHub Actions",
        code: `steps:\n  - uses: pnpm/action-setup@v4\n  - uses: actions/setup-node@v4\n    with:\n      node-version: 20\n      cache: "pnpm"\n  - run: pnpm install --frozen-lockfile`,
      },
      {
        kind: "text",
        text: "Le cache conserve le store entre les exécutions : `pnpm install` ne retélécharge que ce qui a changé. `--frozen-lockfile` fait échouer la CI si le lockfile n'est pas à jour — il doit refléter exactement le `package.json` commité.",
      },
      {
        kind: "command",
        label: "Vérifier la synchronisation lockfile/CI",
        command: "pnpm install --frozen-lockfile",
        why: "Refuse d'installer si le lockfile est désynchronisé du `package.json`, au lieu de le mettre à jour silencieusement. En CI, une désynchronisation est une erreur à corriger, pas à masquer.",
      },
    ],
  },
  {
    id: "phantom-dependencies",
    title: "Phantom dependencies en détail",
    level: 3,
    intro:
      "Le bug silencieux que le `node_modules` strict de pnpm élimine.",
    blocks: [
      {
        kind: "text",
        text: "Avec npm, si votre code importe `lodash` sans l'avoir déclaré mais qu'une dépendance l'inclut, l'import fonctionne — par accident, grâce à l'aplatissement. Le jour où cette dépendance retire lodash, votre code casse sans que vous ayez rien changé. C'est une phantom dependency : un import qui marche sans être déclaré.",
      },
      {
        kind: "text",
        text: "Avec pnpm, ce code échoue immédiatement avec `Cannot find module 'lodash'` : le paquet n'est pas dans les dépendances déclarées, il n'est donc pas lié. La correction est simple et saine : `pnpm add lodash`. Le `node_modules` strict transforme une classe entière de bugs silencieux en erreurs immédiates et explicites.",
      },
    ],
  },
  {
    id: "node-linker-hoisted",
    title: "Mode compatibilité : `node-linker=hoisted`",
    level: 3,
    intro:
      "Quand un outil ancien ne supporte pas les liens symboliques.",
    blocks: [
      {
        kind: "text",
        text: "Quelques outils anciens (ou mal écrits) supposent un `node_modules` aplati façon npm et échouent avec la structure à liens de pnpm. Le réglage `node-linker=hoisted` dans `.npmrc` demande à pnpm de produire un `node_modules` aplati classique — on garde la vitesse et le store, on perd l'isolation stricte.",
      },
      {
        kind: "list",
        items: [
          "À n'utiliser qu'en dernier recours, après avoir vérifié qu'il n'existe pas de version corrigée de l'outil.",
          "Documenter dans le README pourquoi ce réglage existe, pour le retirer quand l'outil sera corrigé.",
          "Alternative ciblée : `public-hoist-pattern` ne remonte que certains paquets, en gardant l'isolation pour le reste.",
        ],
      },
    ],
  },
  {
    id: "side-effects-cache",
    title: "Side effects cache",
    level: 3,
    intro:
      "Pourquoi pnpm réexécute les scripts d'installation — et quand l'éviter.",
    blocks: [
      {
        kind: "text",
        text: "Certains paquets exécutent des scripts à l'installation (compilation native, téléchargement de binaires). pnpm met en cache le résultat de ces scripts : si le paquet est déjà dans le store avec ses side effects calculés, l'installation est instantanée. C'est une des raisons pour lesquelles les réinstallations pnpm sont si rapides.",
      },
      {
        kind: "text",
        text: "Si un paquet se comporte bizarrement après installation (binaire manquant, compilation incomplète), la cause est parfois un cache de side effects périmé : `pnpm store prune` suivi d'une réinstallation force le recalcul. Les paquets dont les scripts sont connus pour être sûrs peuvent être listés dans `onlyBuiltDependencies` pour un contrôle fin.",
      },
    ],
  },
  {
    id: "offline-mirror",
    title: "Miroir hors-ligne et environnements contraints",
    level: 3,
    intro:
      "Installer sans accès réseau : le store comme cache distribuable.",
    blocks: [
      {
        kind: "text",
        text: "Dans les environnements sans accès au registre (CI isolée, réseau d'entreprise), pnpm peut installer entièrement depuis un store pré-rempli ou un tarball local. La stratégie : préparer le store sur une machine avec accès réseau, puis le transférer.",
      },
      {
        kind: "list",
        items: [
          "`pnpm fetch` : télécharge tous les paquets du lockfile dans le store sans créer `node_modules` — idéal pour une image Docker en deux étapes.",
          "Le store peut être copié entre machines : son contenu est adressé par hash, donc vérifiable et dédupliqué.",
          "En dernier recours, `--offline` force pnpm à n'utiliser que le store local et échoue explicitement si un paquet manque.",
        ],
      },
      {
        kind: "command",
        label: "Pré-remplir le store sans installer",
        command: "pnpm fetch",
        why: "Télécharge dans le store tout ce que le lockfile référence, sans toucher au projet. Dans un Dockerfile, on exécute `pnpm fetch` après avoir copié uniquement les fichiers de dépendances : le cache Docker est invalidé moins souvent.",
      },
    ],
  },
  {
    id: "debugging-resolution",
    title: "Déboguer la résolution des dépendances",
    level: 3,
    intro:
      "Quand `pnpm install` ne fait pas ce qu'on attend : les outils de diagnostic.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier qui amène le paquet",
            detail: "`pnpm why <pkg>` : remonter la chaîne de dépendance jusqu'au paquet fautif.",
          },
          {
            title: "Lister l'arbre réel",
            detail: "`pnpm list <pkg>` : voir les versions effectivement installées et où. Avec `--depth`, contrôler la profondeur affichée.",
          },
          {
            title: "Vérifier le lockfile",
            detail: "Chercher le paquet dans `pnpm-lock.yaml` : la section `snapshots` montre exactement quelle version chaque dépendant a résolue.",
          },
          {
            title: "Isoler le problème",
            detail: "Reproduire dans un dossier vide avec un `package.json` minimal : si le problème disparaît, c'est une interaction avec le reste de l'arbre (override ou peer à ajouter).",
          },
        ],
      },
      {
        kind: "command",
        label: "Lister l'arbre des dépendances",
        command: "pnpm list --depth=1",
        why: "Affiche les dépendances directes et leurs enfants immédiats. Plus lisible que le `node_modules` brut pour comprendre la structure réelle.",
      },
    ],
  },
  {
    id: "dlx-vs-exec",
    title: "`dlx` vs `exec` vs scripts : que choisir",
    level: 3,
    intro:
      "Trois façons d'exécuter un outil, trois intentions différentes.",
    blocks: [
      {
        kind: "table",
        headers: ["", "`pnpm dlx`", "`pnpm exec`", "Script `package.json`"],
        rows: [
          ["Source du paquet", "Registre (temporaire)", "`node_modules` du projet", "`node_modules` du projet"],
          ["Installation requise", "Non", "Oui (`pnpm add`)", "Oui"],
          ["Usage typique", "Scaffolder, essai ponctuel", "Commande ad hoc", "Commande d'équipe / CI"],
          ["Reproductible", "Non (dernière version)", "Oui (version du projet)", "Oui"],
          ["Exemple", "`pnpm dlx create-vite`", "`pnpm exec tsc --noEmit`", "`pnpm typecheck`"],
        ],
      },
      {
        kind: "text",
        text: "Règle : ce qui est exécuté en CI ou par l'équipe va dans les scripts ; ce qui est ponctuel et jetable passe par `dlx` ; `exec` sert aux commandes ad hoc pendant le développement.",
      },
    ],
  },
  {
    id: "dedupe",
    title: "`pnpm dedupe` : réduire les doublons",
    level: 3,
    intro:
      "Quand l'arbre contient plusieurs versions d'un même paquet sans raison.",
    blocks: [
      {
        kind: "command",
        label: "Dédupliquer les dépendances",
        command: "pnpm dedupe",
        why: "Réécrit le lockfile en remontant les versions vers la plus haute compatible avec toutes les plages. Réduit le nombre de versions distinctes installées — moins de code, moins de surface d'attaque, installations plus rapides.",
      },
      {
        kind: "text",
        text: "À lancer après des mises à jour en cascade ou l'ajout de plusieurs paquets : l'arbre a tendance à accumuler des versions intermédiaires. Vérifier ensuite que les tests passent — la déduplication change des versions, elle n'est pas gratuite.",
      },
    ],
  },
  {
    id: "bonnes-pratiques-pro",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Ce qui distingue un projet aux dépendances saines d'un projet qui pourrit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un seul gestionnaire par projet : pnpm ou npm, jamais les deux.",
          "Lockfile commité, à jour, vérifié en CI avec `--frozen-lockfile`.",
          "Dépendances minimales : chaque paquet ajouté est un engagement de maintenance.",
          "Mises à jour volontaires et testées (`pnpm up`, puis suite de tests), jamais automatiques en production.",
          "Audit régulier des vulnérabilités, avec une politique de réponse.",
          "Overrides et patchs documentés et réévalués à chaque mise à jour.",
          "En monorepo : catalogs pour les versions partagées, scripts racine pour l'orchestration.",
          "CI : cache du store, installation reproductible, artefacts versionnés.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes et solutions",
    level: 3,
    intro:
      "Les messages d'erreur pnpm que l'on rencontre vraiment.",
    blocks: [
      {
        kind: "table",
        headers: ["Message / symptôme", "Cause probable", "Solution"],
        rows: [
          ["`Cannot find module 'x'`", "Phantom dependency : import non déclaré", "`pnpm add x` (ou `-D` si dev)"],
          ["`ERR_PNPM_OUTDATED_LOCKFILE`", "Lockfile désynchronisé du `package.json`", "`pnpm install` pour régénérer"],
          ["Échec sur les peer dependencies", "Conflit de versions entre paquets", "Déclarer la peer explicitement ou ajuster les versions"],
          ["`EACCES` lors de l'install globale", "Permissions npm mal configurées", "Configurer un préfixe utilisateur npm ou utiliser le script standalone"],
          ["Le patch ne s'applique plus", "Le paquet a été mis à jour", "Régénérer le patch avec `pnpm patch` sur la nouvelle version"],
          ["Lenteurs inexpliquées", "Store corrompu ou disque plein", "`pnpm store prune`, vérifier l'espace disque"],
        ],
      },
    ],
  },
  {
    id: "projet-migration",
    title: "Projet : migrer un projet réel",
    level: 3,
    intro:
      "Le projet canonique : convertir un projet npm existant et mesurer le gain.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le projet",
            detail: "Un projet personnel ou professionnel avec au moins 50 dépendances : le gain sera mesurable.",
          },
          {
            title: "Mesurer l'avant",
            detail: "Noter la taille de `node_modules` (`du -sh`) et le temps d'une installation fraîche (`time npm ci` après suppression).",
          },
          {
            title: "Migrer",
            detail: "Supprimer `node_modules` et `package-lock.json`, lancer `pnpm install`, corriger les phantom dependencies révélées.",
          },
          {
            title: "Mesurer l'après",
            detail: "Comparer taille et temps. Documenter les corrections apportées (dépendances déclarées explicitement) : ce sont des bugs corrigés, pas des effets de bord.",
          },
          {
            title: "Industrialiser",
            detail: "Mettre à jour la CI (cache pnpm, `--frozen-lockfile`), documenter la migration dans le README.",
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
      "Construire un monorepo complet : applications + paquets partagés.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Scaffolder la structure",
            detail: "`pnpm-workspace.yaml` avec `apps/*` et `packages/*`, un paquet `ui` et une app `web` minimale.",
          },
          {
            title: "Lier les paquets",
            detail: "`web` dépend de `ui` via `workspace:*`. Vérifier avec `pnpm --filter web install` que le lien est créé.",
          },
          {
            title: "Centraliser les versions",
            detail: "Déclarer un `catalog` pour React/TypeScript et l'utiliser dans chaque paquet.",
          },
          {
            title: "Orchestrer",
            detail: "Scripts racine : `pnpm -r build`, `pnpm -r test`. Vérifier l'ordre topologique en cassant volontairement une dépendance.",
          },
          {
            title: "Publier (optionnel)",
            detail: "Configurer `pnpm -r publish` avec `--dry-run` pour comprendre le flux sans rien envoyer.",
          },
        ],
      },
    ],
  },
  {
    id: "publier-paquet-workspace",
    title: "Publier un paquet du workspace",
    level: 3,
    intro:
      "Du monorepo vers le registre npm : publier proprement.",
    blocks: [
      {
        kind: "command",
        label: "Publier tous les paquets",
        command: "pnpm -r publish",
        why: "Publie chaque paquet du workspace vers le registre configuré (public ou privé). Le `-r` (récursif) applique la commande à tous les paquets qui ont un nom et une version.",
        verify: "npm view <nom-du-paquet> version",
      },
      {
        kind: "list",
        items: [
          "Avant de publier : `pnpm -r build` puis `pnpm -r test` — jamais de publication sans build vert.",
          "Versionner avec `pnpm -r version <patch|minor|major>` ou, en équipe, avec Changesets : le workflow pro standard.",
          "Publier d'abord en tag `beta` (`pnpm publish --tag beta`) pour tester l'installation avant la release officielle.",
          "Configurer `publishConfig` (registry, access) dans le package.json des paquets privés.",
          "Toujours publier depuis une branche propre : un `git status` sale = publication reportée.",
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
          {
            label: "Documentation pnpm",
            value: "pnpm.io : le guide complet — CLI, workspaces, configuration, FAQ. La version française existe (pnpm.io/fr).",
          },
          {
            label: "Workspaces",
            value: "pnpm.io/fr/workspaces : la référence des monorepos, filtres et publication.",
          },
          {
            label: "Dépôt GitHub",
            value: "pnpm/pnpm : issues, discussions et release notes pour suivre les évolutions.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les projets de cette page — migration d'un projet réel, puis monorepo.",
          "Complément : la compétence `npm` pour les fondamentaux du registre, `vite` pour le build des paquets.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "pnpm maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir les fondamentaux du registre avec la compétence `npm` : publication, scopes, registres privés.",
          "Industrialiser avec `cicd` et `github-actions` : cache du store, `--frozen-lockfile`, qualité gates.",
          "Construire avec `vite` : bundler les paquets du monorepo pour la publication.",
          "Conteneuriser avec `docker` : images multi-étapes avec `pnpm fetch` pour des builds rapides.",
          "Revenir à la roadmap : valider pnpm et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

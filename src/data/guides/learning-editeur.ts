import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'Éditeur & DX : exploiter VS Code et le serveur
 * de langage TypeScript comme un pro. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_EDITEUR: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Pourquoi l'éditeur est la moitié de la valeur de TypeScript.",
    blocks: [
      {
        kind: "text",
        text: "TypeScript ne vit pas que dans le terminal : son serveur de langage (`tsserver`) analyse votre projet en continu et dialogue avec l'éditeur. Résultat : erreurs soulignées pendant la frappe, autocomplétion qui connaît vos types, renommage qui met à jour tout le projet sans rien oublier.",
      },
      {
        kind: "text",
        text: "Une erreur vue à la frappe coûte dix fois moins cher qu'une erreur vue en production. Un éditeur bien réglé, c'est un filet permanent sous chaque ligne de code — et c'est là que TypeScript rembourse son apprentissage, bien avant la compilation.",
      },
    ],
  },
  {
    id: "tsserver",
    title: "Le serveur de langage",
    level: 1,
    intro: "Comprendre ce qui travaille pendant que vous tapez.",
    blocks: [
      {
        kind: "diagram",
        title: "La boucle éditeur",
        lines: [
          "Vous frappez du code",
          "     │",
          "     ▼",
          "tsserver analyse le projet en continu",
          "     │",
          "     ├── Erreurs soulignées en temps réel",
          "     ├── Autocomplétion contextuelle (connaît vos types)",
          "     ├── Navigation : définition, références, implémentations",
          "     └── Refactoring sûr : renommage, extraction",
          "     │",
          "     ▼",
          "Vous corrigez avant même de compiler",
        ],
      },
      {
        kind: "text",
        text: "VS Code intègre `tsserver` nativement : aucune extension requise pour le support TypeScript de base. Les autres éditeurs (WebStorm, Zed, Neovim) branchent le même serveur via le protocole LSP.",
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
    intro: "Avoir de quoi ouvrir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un projet TypeScript fonctionnel (voir compétence `installation`).",
          "VS Code installé — ou la volonté de régler finement votre éditeur actuel.",
        ],
      },
    ],
  },
  {
    id: "installer-vscode",
    title: "Installer VS Code",
    level: 2,
    intro: "L'éditeur de référence pour TypeScript, gratuit et multi-plateforme.",
    blocks: [
      {
        kind: "text",
        text: "Téléchargez VS Code depuis code.visualstudio.com (Windows, macOS, Linux). Sur Linux, préférez le dépôt officiel ou le paquet de votre distribution pour les mises à jour automatiques.",
      },
      {
        kind: "command",
        label: "Vérifier l'installation",
        command: "code --version",
        why: "Affiche la version de VS Code et d'Electron. Si la commande répond, l'éditeur est installé et sa CLI est dans le PATH — vous pourrez l'ouvrir depuis n'importe quel dossier avec `code .`.",
        verify: "which code",
      },
    ],
  },
  {
    id: "ouvrir-projet",
    title: "Ouvrir le projet",
    level: 2,
    intro: "Toujours ouvrir le dossier racine, jamais un fichier isolé.",
    blocks: [
      {
        kind: "command",
        label: "Ouvrir le dossier du projet",
        command: "code .",
        why: "Ouvre le dossier courant comme workspace : VS Code détecte alors le `tsconfig.json`, démarre `tsserver` sur tout le projet et active la résolution des imports entre fichiers. Ouvrir un seul `.ts` hors contexte prive l'éditeur de toute cette intelligence.",
        verify: "code --version",
      },
    ],
  },
  {
    id: "terminal-integre",
    title: "Terminal intégré",
    level: 2,
    intro: "Compiler sans quitter l'éditeur.",
    blocks: [
      {
        kind: "text",
        text: "Le raccourci `Ctrl+`` (backtick) ouvre un terminal dans le dossier du projet. Lancez-y `npx tsc --watch` : les erreurs de compilation s'affichent en continu pendant que vous codez dans l'onglet d'à côté. Plusieurs terminaux peuvent coexister (un pour `tsc`, un pour les tests).",
      },
      {
        kind: "list",
        items: [
          "`Ctrl+`` : ouvrir/fermer le terminal intégré.",
          "`Ctrl+Maj+`` : créer un nouveau terminal.",
          "Les problèmes détectés remontent aussi dans le panneau « Problèmes » (`Ctrl+Maj+M`).",
        ],
      },
    ],
  },
  {
    id: "palette-commandes",
    title: "Palette de commandes",
    level: 2,
    intro: "Tout VS Code est accessible au clavier.",
    blocks: [
      {
        kind: "text",
        text: "`Ctrl+Maj+P` (ou `Cmd+Maj+P` sur macOS) ouvre la palette : tapez quelques lettres pour trouver n'importe quelle commande — « Format Document », « TypeScript: Restart TS Server », « Preferences: Open Settings ». C'est le moyen le plus rapide de découvrir les fonctionnalités sans mémoriser cinquante raccourcis.",
      },
      {
        kind: "list",
        items: [
          "`Ctrl+P` : ouvrir un fichier par son nom (recherche floue).",
          "`Ctrl+Maj+P` : exécuter une commande.",
          "Préfixez par `>` dans `Ctrl+P` pour équivaloir à la palette.",
        ],
      },
    ],
  },
  {
    id: "navigation-base",
    title: "Navigation de base",
    level: 2,
    intro: "Se déplacer dans le code comme dans un graphe.",
    blocks: [
      {
        kind: "fields",
        title: "Les gestes essentiels",
        fields: [
          { label: "`F12`", value: "Aller à la définition du symbole sous le curseur — d'un appel vers la fonction, d'un type vers sa déclaration." },
          { label: "`Alt+F12`", value: "Aperçu de la définition sans quitter le fichier courant." },
          { label: "`Maj+F12`", value: "Trouver toutes les références : qui utilise cette fonction, ce type, cette variable." },
          { label: "`Ctrl+clic`", value: "Équivalent souris de `F12` ; `Ctrl+Alt+clic` pour l'aperçu." },
        ],
      },
      {
        kind: "text",
        text: "Ces gestes transforment la lecture de code : au lieu de chercher un symbole à la main, on le suit. Avec TypeScript, la navigation est précise car le serveur connaît les types réels, pas seulement les noms.",
      },
    ],
  },
  {
    id: "extensions-essentielles",
    title: "Extensions essentielles",
    level: 2,
    intro: "Le quatuor qui couvre 95 % des besoins TypeScript.",
    blocks: [
      {
        kind: "command",
        label: "Installer Prettier",
        command: "code --install-extension esbenp.prettier-vscode",
        why: "Le formateur de code standard : il uniformise l'indentation, les guillemets et les points-virgules. Combiné au formatage à la sauvegarde, il élimine tous les débats de style — le code est toujours propre, sans y penser.",
        verify: "code --list-extensions | grep prettier",
      },
      {
        kind: "command",
        label: "Installer ESLint",
        command: "code --install-extension dbaeumer.vscode-eslint",
        why: "Le linter souligne les problèmes logiques (variables inutilisées, `await` manquant, mauvaises pratiques) directement dans l'éditeur. C'est le complément de `tsc` : là où le compilateur vérifie les types, ESLint vérifie la qualité du code.",
        verify: "code --list-extensions | grep eslint",
      },
      {
        kind: "command",
        label: "Installer Error Lens",
        command: "code --install-extension usernamehw.errorlens",
        why: "Affiche les erreurs et avertissements en ligne, à la fin de la ligne fautive, au lieu de les cacher dans le panneau Problèmes. On voit immédiatement ce qui cloche sans quitter le code des yeux — un gain de feedback considérable.",
        verify: "code --list-extensions | grep errorlens",
      },
      {
        kind: "command",
        label: "Installer GitLens",
        command: "code --install-extension eamodio.gitlens",
        why: "Supercharge l'intégration Git : auteur de chaque ligne au survol, historique d'un fichier, comparaison de branches. Comprendre qui a écrit quoi (et pourquoi) accélère la lecture de tout projet d'équipe.",
        verify: "code --list-extensions | grep gitlens",
      },
    ],
  },
  {
    id: "format-on-save",
    title: "Formatage à la sauvegarde",
    level: 2,
    intro: "Le réglage qui change le quotidien.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "settings.json — formatage",
        code: `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}`,
      },
      {
        kind: "text",
        text: "Avec ces réglages, chaque `Ctrl+S` reformate le fichier : fini les discussions sur les espaces. Le bloc `[typescript]` garantit que Prettier (et pas le formateur intégré) traite les fichiers TS. Le fichier `settings.json` se trouve via la palette : « Preferences: Open User Settings (JSON) ».",
      },
    ],
  },
  {
    id: "raccourcis-essentiels",
    title: "Raccourcis essentiels",
    level: 2,
    intro: "Dix gestes pour coder sans la souris.",
    blocks: [
      {
        kind: "fields",
        title: "À mémoriser en premier",
        fields: [
          { label: "`F2`", value: "Renommer le symbole sous le curseur partout dans le projet — sûr grâce aux types." },
          { label: "`Ctrl+D`", value: "Sélectionner l'occurrence suivante du mot (multi-curseur progressif)." },
          { label: "`Alt+↑/↓`", value: "Déplacer la ligne courante vers le haut ou le bas." },
          { label: "`Ctrl+/`", value: "Commenter / décommenter la sélection." },
          { label: "`Ctrl+Maj+F`", value: "Rechercher dans tout le projet." },
          { label: "`Ctrl+W`", value: "Fermer l'onglet courant." },
        ],
      },
    ],
  },
  {
    id: "erreurs-editeur-base",
    title: "Erreurs fréquentes au début",
    level: 2,
    intro: "Quand l'éditeur semble « ne pas voir » les types.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic express",
        fields: [
          { label: "Aucune erreur affichée alors que `tsc` échoue", value: "VS Code utilise peut-être sa version TypeScript intégrée au lieu de celle du projet : basculez sur la version du workspace (voir niveau 3)." },
          { label: "Autocomplétion absente", value: "Le fichier est ouvert hors du dossier projet, ou `tsserver` a planté : palette → « TypeScript: Restart TS Server »." },
          { label: "Faux positifs après un `git pull`", value: "Les dépendances ont changé : relancez `npm install`, puis redémarrez le serveur TS." },
        ],
      },
    ],
  },
  {
    id: "mini-flux-quotidien",
    title: "Mini-flux : une session type",
    level: 2,
    intro: "Assembler les gestes en une boucle de travail.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Ouvrir", detail: "`code .` à la racine du projet, terminal intégré avec `npx tsc --watch`." },
          { title: "Naviguer", detail: "`Ctrl+P` vers le fichier, `F12` pour suivre les types inconnus." },
          { title: "Écrire", detail: "Laisser l'autocomplétion proposer, Error Lens signaler, Prettier formater à la sauvegarde." },
          { title: "Refactorer", detail: "`F2` pour renommer sans peur : le serveur met tout à jour." },
          { title: "Vérifier", detail: "Le panneau Problèmes doit être vide, `npm run typecheck` confirme." },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "workspace-typescript-version",
    title: "Forcer la version TypeScript du workspace",
    level: 3,
    intro: "Le réglage le plus important — et le plus oublié.",
    blocks: [
      {
        kind: "text",
        text: "VS Code embarque sa propre version de TypeScript, souvent plus récente (ou plus ancienne) que celle de votre projet. Résultat : l'éditeur signale des erreurs que `tsc` ne voit pas, ou l'inverse. La solution : utiliser la version du workspace.",
      },
      {
        kind: "steps",
        steps: [
          { title: "Ouvrir la palette", detail: "`Ctrl+Maj+P` dans un fichier TypeScript du projet." },
          { title: "Choisir la version", detail: "Taper « TypeScript: Select TypeScript Version » puis « Use Workspace Version »." },
          { title: "Vérifier", detail: "Le numéro affiché en bas à droite doit correspondre à `npx tsc --version`." },
          { title: "Pérenniser", detail: "VS Code mémorise ce choix par workspace : à refaire une fois par projet." },
        ],
      },
    ],
  },
  {
    id: "tsdk-setting",
    title: "Le réglage `typescript.tsdk`",
    level: 3,
    intro: "La version déclarative du choix précédent.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: ".vscode/settings.json",
        code: `{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}`,
      },
      {
        kind: "text",
        text: "Ce réglage pointe VS Code vers le TypeScript du projet, commité dans `.vscode/settings.json` : toute l'équipe partage la même version d'analyse. `enablePromptUseWorkspaceTsdk` affiche une invite pour adopter la version du workspace à l'ouverture — pratique pour les nouveaux contributeurs.",
      },
    ],
  },
  {
    id: "settings-avancees",
    title: "Réglages avancés utiles",
    level: 3,
    intro: "Les options qui affinent l'expérience TypeScript.",
    blocks: [
      {
        kind: "fields",
        title: "À connaître",
        fields: [
          { label: "`typescript.preferGoToSourceDefinition`", value: "`true` : `F12` navigue vers le source `.ts` plutôt que vers les `.d.ts` des bibliothèques." },
          { label: "`typescript.updateImportsOnFileMove`", value: "`\"always\"` : déplacer un fichier met à jour automatiquement tous les imports qui le référencent." },
          { label: "`typescript.suggest.autoImports`", value: "`true` : l'autocomplétion propose les symboles non importés et ajoute l'import à la sélection." },
          { label: "`editor.codeActionsOnSave`", value: "Exécute des actions à la sauvegarde : organiser les imports, corriger les problèmes ESLint (voir section dédiée)." },
        ],
      },
    ],
  },
  {
    id: "code-actions-on-save",
    title: "Actions automatiques à la sauvegarde",
    level: 3,
    intro: "Laisser l'éditeur ranger le code à chaque `Ctrl+S`.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "settings.json — actions",
        code: `{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  }
}`,
      },
      {
        kind: "text",
        text: "À chaque sauvegarde : ESLint corrige ce qu'il peut (imports inutilisés, `const` préféré à `let`) et les imports sont triés et dédupliqués. Le code reste propre sans effort conscient — la qualité devient le défaut, pas l'exception.",
      },
    ],
  },
  {
    id: "multi-curseur",
    title: "Multi-curseur",
    level: 3,
    intro: "Éditer dix endroits à la fois.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          { label: "`Alt+clic`", value: "Ajoute un curseur à l'endroit cliqué : édition simultanée en points arbitraires." },
          { label: "`Ctrl+D`", value: "Sélectionne l'occurrence suivante du mot courant : renommage local rapide." },
          { label: "`Ctrl+Maj+L`", value: "Sélectionne toutes les occurrences d'un coup." },
          { label: "`Maj+Alt+↑/↓`", value: "Duplique le curseur sur la ligne du dessus/dessous : parfait pour les listes." },
        ],
      },
      {
        kind: "text",
        text: "Le multi-curseur excelle pour les modifications mécaniques (ajouter un paramètre à cinq appels similaires). Pour un vrai renommage sémantique, préférez `F2` : lui comprend les types, le multi-curseur ne voit que du texte.",
      },
    ],
  },
  {
    id: "rename-refactoring",
    title: "Renommage sûr (`F2`)",
    level: 3,
    intro: "Le refactoring que les types rendent infaillible.",
    blocks: [
      {
        kind: "text",
        text: "Placez le curseur sur un symbole, `F2`, tapez le nouveau nom : toutes les références du projet sont mises à jour — imports, usages, et même les chaînes dans les templates quand c'est pertinent. Le serveur de langage garantit qu'aucun usage n'est oublié, y compris dans les fichiers que vous n'avez pas ouverts.",
      },
      {
        kind: "list",
        items: [
          "Fonctionne sur variables, fonctions, classes, interfaces, propriétés, fichiers (renomme aussi les imports).",
          "Comparez avec un chercher/remplacer textuel : celui-ci renomme aussi les homonymes sans rapport.",
          "Après un gros renommage, `npm run typecheck` valide qu'il ne reste aucune référence cassée.",
        ],
      },
    ],
  },
  {
    id: "extract-refactoring",
    title: "Extractions",
    level: 3,
    intro: "Découper le code sans le casser.",
    blocks: [
      {
        kind: "fields",
        title: "Actions d'extraction",
        fields: [
          { label: "Extraire en fonction", value: "Sélectionnez un bloc, `Ctrl+Maj+R` → « Extract function » : les variables utilisées deviennent des paramètres, le résultat un retour." },
          { label: "Extraire en constante", value: "« Extract constant » : une expression répétée devient une variable nommée dans la portée." },
          { label: "Extraire en interface", value: "« Extract to interface » sur un type objet : la forme devient réutilisable et nommée." },
        ],
      },
      {
        kind: "text",
        text: "Ces refactorings sont sûrs parce que le serveur connaît les types : les paramètres extraits sont typés correctement du premier coup. C'est la façon la plus rapide de faire émerger une structure propre d'un code qui a grandi trop vite.",
      },
    ],
  },
  {
    id: "go-to-definition-avance",
    title: "Navigation avancée",
    level: 3,
    intro: "Au-delà de `F12` : explorer les relations du code.",
    blocks: [
      {
        kind: "fields",
        title: "Geste par intention",
        fields: [
          { label: "`F12` — définition", value: "Où ce symbole est-il déclaré ? Le point de départ de toute exploration." },
          { label: "`Maj+F12` — références", value: "Qui utilise ce symbole ? Indispensable avant de modifier une fonction partagée." },
          { label: "`Ctrl+T`", value: "Aller à un symbole du workspace par son nom : navigation globale instantanée." },
          { label: "`Ctrl+Maj+O`", value: "Aller à un symbole dans le fichier courant : le sommaire du fichier." },
          { label: "Fil d'Ariane", value: "Le breadcrumb en haut de l'éditeur montre la hiérarchie (fichier › classe › méthode) : cliquez pour remonter." },
        ],
      },
    ],
  },
  {
    id: "quick-fix",
    title: "Quick Fix (`Ctrl+.`)",
    level: 3,
    intro: "L'ampoule qui propose des corrections.",
    blocks: [
      {
        kind: "text",
        text: "Sur une erreur ou un avertissement, `Ctrl+.` ouvre les actions disponibles : ajouter l'import manquant, convertir une promesse en `async`/`await`, extraire un type, corriger l'orthographe d'une propriété. Ces suggestions viennent du serveur TypeScript et d'ESLint — elles appliquent les corrections canoniques au lieu de bricolages.",
      },
      {
        kind: "list",
        items: [
          "Réflexe : face à une erreur soulignée, essayez `Ctrl+.` avant de corriger à la main.",
          "Les « code actions » incluent aussi des refactorings contextuels (convertir en fonction fléchée, ajouter des accolades).",
        ],
      },
    ],
  },
  {
    id: "snippets",
    title: "Snippets",
    level: 3,
    intro: "Générer les structures répétitives.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Snippets personnalisés",
        code: `{
  "Test vitest": {
    "prefix": "tvit",
    "body": [
      "import { describe, expect, it } from \"vitest\";",
      "",
      "describe(\"\${1:module}\", () => {",
      "  it(\"\${2:fait quelque chose}\", () => {",
      "    expect(\${3:resultat}).toBe(\${4:attendu});",
      "  });",
      "});"
    ]
  }
}`,
      },
      {
        kind: "text",
        text: "Les snippets (fichier via la palette : « Snippets: Configure User Snippets ») génèrent des blocs avec des points de tabulation (`$1`, `$2`). Les extensions en fournissent pour les frameworks ; les vôtres couvrent vos patterns d'équipe. Un snippet bien conçu fait gagner des minutes par jour.",
      },
    ],
  },
  {
    id: "debug-launch-json",
    title: "Déboguer : launch.json",
    level: 3,
    intro: "Des points d'arrêt directement dans le TypeScript.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: ".vscode/launch.json",
        code: `{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug TS",
      "runtimeExecutable": "npx",
      "runtimeArgs": ["tsx", "src/index.ts"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}`,
      },
      {
        kind: "text",
        text: "`F5` lance cette configuration : le programme démarre via tsx, et l'exécution s'arrête sur vos points d'arrêt posés dans le `.ts`. `skipFiles` évite de stepper dans les entrailles de Node. Pour du code compilé avec `tsc`, activez `sourceMap: true` : le débogueur remonte alors au source.",
      },
    ],
  },
  {
    id: "breakpoints-avances",
    title: "Points d'arrêt avancés",
    level: 3,
    intro: "S'arrêter seulement quand ça compte.",
    blocks: [
      {
        kind: "fields",
        title: "Types de points d'arrêt",
        fields: [
          { label: "Conditionnel", value: "Clic droit sur le point → « Edit Breakpoint » → expression : pause uniquement quand `user.id === 42`." },
          { label: "Compteur (hit count)", value: "Pause après N passages : idéal pour les boucles où le bug survient à l'itération 1000." },
          { label: "Journal (logpoint)", value: "Affiche un message sans arrêter l'exécution : le `console.log` sans modifier le code." },
          { label: "Sur exception", value: "Le panneau « Breakpoints » permet de pauser sur toutes les exceptions, capturées ou non." },
        ],
      },
    ],
  },
  {
    id: "watch-debug-console",
    title: "Espions et console de débogage",
    level: 3,
    intro: "Observer l'état pendant la pause.",
    blocks: [
      {
        kind: "text",
        text: "En pause sur un point d'arrêt : le panneau « Variables » montre les portées locales, « Espion » évalue vos expressions à chaque pas (`user.panier.length`), et la « Console de débogage » exécute du code arbitraire dans le contexte courant — appeler une fonction, inspecter un objet, tester une hypothèse sans relancer.",
      },
      {
        kind: "list",
        items: [
          "La console de débogage connaît les variables locales : parfait pour vérifier une hypothèse en direct.",
          "Les espions se réévaluent à chaque pas : surveillez l'évolution d'une valeur dans une boucle.",
        ],
      },
    ],
  },
  {
    id: "eslint-setup-detail",
    title: "ESLint : configuration",
    level: 3,
    intro: "Des règles de qualité adaptées à TypeScript.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "eslint.config.js (flat config)",
        code: `import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  }
);`,
      },
      {
        kind: "text",
        text: "Le paquet `typescript-eslint` apporte les règles spécifiques à TypeScript (pas de `any` explicite, conventions de nommage). La flat config (`eslint.config.js`) est le format actuel. L'extension VS Code applique ces règles en direct ; `npx eslint .` les vérifie en CI.",
      },
    ],
  },
  {
    id: "prettier-setup-detail",
    title: "Prettier : configuration",
    level: 3,
    intro: "Un style unique, sans débat.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: ".prettierrc",
        code: `{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100
}`,
      },
      {
        kind: "text",
        text: "Quelques options suffisent ; l'essentiel est qu'elles soient commitées et partagées. Règle d'or : ne jamais laisser ESLint et Prettier se contredire — désactivez les règles de formatage d'ESLint (la config `eslint-config-prettier` le fait) et laissez Prettier seul maître du style.",
      },
    ],
  },
  {
    id: "git-integre",
    title: "Git intégré",
    level: 3,
    intro: "Versionner sans quitter l'éditeur.",
    blocks: [
      {
        kind: "fields",
        title: "Le panneau Source Control",
        fields: [
          { label: "`Ctrl+Maj+G`", value: "Ouvre le panneau Git : fichiers modifiés, diff par fichier, zone de staging." },
          { label: "Staging partiel", value: "Sélectionnez des lignes dans le diff pour ne commiter qu'un morceau d'un fichier." },
          { label: "Blame inline (GitLens)", value: "L'auteur et le commit de chaque ligne au survol : le contexte historique immédiat." },
          { label: "Timeline", value: "L'historique complet d'un fichier dans l'explorateur : voir son évolution." },
        ],
      },
      {
        kind: "text",
        text: "Écrivez des messages de commit qui expliquent le « pourquoi » : le « quoi » est visible dans le diff. Un historique propre se relit comme une documentation.",
      },
    ],
  },
  {
    id: "profils-vscode",
    title: "Profils VS Code",
    level: 3,
    intro: "Des configurations par contexte.",
    blocks: [
      {
        kind: "text",
        text: "Les profils (palette → « Profiles: Create Profile ») regroupent extensions, réglages, raccourcis et snippets. Un profil « TypeScript » (ESLint, Prettier, Error Lens), un profil « Python », un profil « présentation » sans distractions : on bascule en deux clics, chaque contexte garde ses outils.",
      },
    ],
  },
  {
    id: "settings-sync",
    title: "Synchronisation des réglages",
    level: 3,
    intro: "Retrouver son éditeur sur toute machine.",
    blocks: [
      {
        kind: "text",
        text: "« Settings Sync » (icône engrenage → « Turn on Settings Sync ») sauvegarde réglages, extensions, snippets et raccourcis sur votre compte. Sur une nouvelle machine, VS Code se reconfigure seul en quelques minutes. Les réglages projet (`.vscode/`) restent prioritaires sur les réglages synchronisés.",
      },
    ],
  },
  {
    id: "perfs-gros-projets",
    title: "Performance sur gros projets",
    level: 3,
    intro: "Quand l'éditeur ralentit.",
    blocks: [
      {
        kind: "fields",
        title: "Leviers",
        fields: [
          { label: "`files.exclude` / `search.exclude`", value: "Exclure `dist/`, `coverage/` de l'explorateur et de la recherche : moins de fichiers indexés." },
          { label: "`typescript.tsserver.maxTsServerMemory`", value: "Augmenter la mémoire du serveur TS sur les très gros projets (ex. `8192`)." },
          { label: "Extensions", value: "Désactiver par workspace les extensions inutiles ici : chaque extension coûte au démarrage." },
          { label: "`skipLibCheck`", value: "Côté tsconfig : ne pas revérifier les `.d.ts` des dépendances accélère aussi l'éditeur." },
        ],
      },
    ],
  },
  {
    id: "multi-root-workspaces",
    title: "Workspaces multi-racines",
    level: 3,
    intro: "Plusieurs projets dans une fenêtre.",
    blocks: [
      {
        kind: "text",
        text: "« File → Add Folder to Workspace » puis « Save Workspace As… » crée un `.code-workspace` : plusieurs dossiers (front, back, paquets partagés) cohabitent avec leurs réglages propres. Chaque dossier garde son `tsconfig.json` et sa version TypeScript — pratique en monorepo.",
      },
    ],
  },
  {
    id: "tasks-json",
    title: "Tâches (`tasks.json`)",
    level: 3,
    intro: "Lancer les commandes du projet au clavier.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: ".vscode/tasks.json",
        code: `{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "typecheck",
      "type": "npm",
      "script": "typecheck",
      "problemMatcher": "$tsc",
      "group": { "kind": "build", "isDefault": true }
    }
  ]
}`,
      },
      {
        kind: "text",
        text: "Avec cette tâche, `Ctrl+Maj+B` lance le typecheck et les erreurs remontent dans le panneau Problèmes, cliquables vers le code. Le `problemMatcher: \"$tsc\"` parse la sortie du compilateur. Les tâches se partagent via `.vscode/` : toute l'équipe a les mêmes raccourcis de build.",
      },
    ],
  },
  {
    id: "remote-ssh",
    title: "Développement à distance",
    level: 3,
    intro: "Coder sur une autre machine sans friction.",
    blocks: [
      {
        kind: "text",
        text: "L'extension Remote-SSH ouvre VS Code sur un serveur distant : le code, le terminal et `tsserver` tournent sur la machine distante, l'interface reste locale. Idéal pour les environnements lourds (gros projets, GPU) ou les serveurs de développement partagés. Les dev containers vont plus loin : l'environnement complet est décrit dans un `Dockerfile` versionné.",
      },
    ],
  },
  {
    id: "alternatives-editors",
    title: "Alternatives à VS Code",
    level: 3,
    intro: "Le même serveur de langage, d'autres philosophies.",
    blocks: [
      {
        kind: "fields",
        title: "Panorama",
        fields: [
          { label: "WebStorm", value: "Payant, tout intégré : refactoring, débogage et inspections sans extensions. Excellent support TypeScript natif." },
          { label: "Zed", value: "Gratuit, très rapide, écrit en Rust. Support TypeScript via LSP, encore jeune mais prometteur." },
          { label: "Neovim", value: "Le terminal comme éditeur : LSP natif, extensible à l'infini, courbe d'apprentissage raide." },
        ],
      },
      {
        kind: "text",
        text: "Tous branchent `tsserver` via LSP : l'intelligence TypeScript est la même, seule l'ergonomie change. Le choix est une affaire de goût et de workflow — les concepts de cette page (serveur, refactoring, navigation) s'y appliquent.",
      },
    ],
  },
  {
    id: "erreur-mauvaise-version-ts",
    title: "Erreur : mauvaise version TypeScript",
    level: 3,
    intro: "Quand l'éditeur et `tsc` se contredisent.",
    blocks: [
      {
        kind: "list",
        items: [
          "Symptôme : une erreur soulignée en rouge que `npx tsc --noEmit` ne reproduit pas (ou l'inverse).",
          "Cause : VS Code utilise sa version intégrée au lieu de celle du projet.",
          "Remède : palette → « TypeScript: Select TypeScript Version » → « Use Workspace Version ».",
          "Prévention : commitez `.vscode/settings.json` avec `typescript.tsdk` pointant vers `node_modules/typescript/lib`.",
        ],
      },
    ],
  },
  {
    id: "erreur-eslint-conflit",
    title: "Erreur : ESLint et Prettier se battent",
    level: 3,
    intro: "Le formatage qui oscille à chaque sauvegarde.",
    blocks: [
      {
        kind: "list",
        items: [
          "Symptôme : la sauvegarde reformate, puis ESLint signale l'inverse — boucle sans fin.",
          "Cause : des règles de style ESLint contredisent Prettier.",
          "Remède : désactivez les règles de formatage d'ESLint (config `eslint-config-prettier`), un seul formateur : Prettier.",
          "Vérifiez `editor.defaultFormatter` par langage : une seule extension doit formater les `.ts`.",
        ],
      },
    ],
  },
  {
    id: "erreur-tsserver-lent",
    title: "Problème : tsserver lent ou planté",
    level: 3,
    intro: "Quand l'intelligence de l'éditeur s'essouffle.",
    blocks: [
      {
        kind: "list",
        items: [
          "Premier réflexe : palette → « TypeScript: Restart TS Server ».",
          "Si ça persiste : vérifiez que `node_modules` est à jour (`npm install`).",
          "Sur les gros projets : `skipLibCheck: true` et excluez `dist/` du tsconfig.",
          "En dernier recours, la commande « Reload Window » redémarre tout l'environnement éditeur.",
        ],
      },
    ],
  },
  {
    id: "projets-editeur",
    title: "Projets : setup parfait",
    level: 3,
    intro: "Valider la maîtrise par un environnement reproductible.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Template d'équipe", detail: "Un dépôt modèle avec `.vscode/` (settings, launch, tasks, extensions recommandées), ESLint + Prettier configurés, `typescript.tsdk` fixé." },
          { title: "Extensions recommandées", detail: "Fichier `.vscode/extensions.json` : à l'ouverture, VS Code propose d'installer le pack d'équipe en un clic." },
          { title: "Session de refactoring", detail: "Prenez un vieux projet JS, renommez et extrayez à coups de `F2` et `Ctrl+Maj+R` : mesurez le temps gagné vs manuel." },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-editeur",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les réflexes d'un cockpit bien réglé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Toujours la version TypeScript du workspace, jamais celle de l'éditeur.",
          "Formatage à la sauvegarde + un seul formateur (Prettier).",
          "`F2` pour renommer, jamais le chercher/remplacer sur un symbole.",
          "Lire les erreurs via Error Lens, corriger via Quick Fix (`Ctrl+.`).",
          "Commiter `.vscode/` : l'environnement se partage comme le code.",
          "Redémarrer tsserver avant de conclure à un bug de l'éditeur.",
          "Apprendre un raccourci par semaine : l'investissement est rentabilisé en jours.",
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
          { label: "Docs VS Code", value: "code.visualstudio.com/docs : tout l'éditeur, du débogage aux tâches, avec guides pas à pas." },
          { label: "TypeScript dans VS Code", value: "code.visualstudio.com/docs/languages/typescript : l'intégration du serveur de langage en détail." },
          { label: "Docs typescript-eslint", value: "typescript-eslint.io : règles, configurations et migration depuis les anciens setups." },
          { label: "Raccourcis PDF", value: "code.visualstudio.com/shortcuts : les aide-mémoires officiels par système d'exploitation." },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'établi est prêt : place au code.",
    blocks: [
      {
        kind: "list",
        items: [
          "Revenir à `types-base` : écrire les premières annotations avec l'autocomplétion comme guide.",
          "Explorer `tsconfig` : comprendre chaque option que l'éditeur exploite.",
          "Puis `outillage` : ESLint, Prettier et les hooks en profondeur.",
          "À chaque erreur incomprise : `F12` sur le type, lire sa définition — l'éditeur est aussi un outil d'apprentissage.",
        ],
      },
    ],
  },
];

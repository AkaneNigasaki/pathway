import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Prettier : de zéro à un formatage
 * professionnel et industrialisé. 3 niveaux d'information (Aperçu /
 * Pratique / Approfondi) avec divulgation progressive. Tous les textes
 * supportent le code inline entre backticks. Commandes toujours
 * expliquées : label, commande, pourquoi, vérification.
 */
export const LEARNING_PRETTIER: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Prettier et quel problème il élimine définitivement.",
    blocks: [
      {
        kind: "text",
        text: "Prettier est un formateur de code : il réécrit votre code avec un style cohérent — indentation, guillemets, points-virgules, retours à la ligne — sans en changer le comportement. On l'exécute, il reformate ; le style est appliqué, pas débattu.",
      },
      {
        kind: "text",
        text: "Pourquoi Prettier existe : dans toute équipe, une partie des revues de code porte sur le style (espaces, retours à la ligne, longueur des lignes). Ces discussions sont coûteuses et sans valeur. Prettier tranche une fois pour toutes : le style est automatique, les revues se concentrent sur la logique.",
      },
      {
        kind: "text",
        text: "Prettier supporte JavaScript, TypeScript, CSS, HTML, JSON, Markdown, YAML et bien d'autres via ses plugins. Il est délibérément peu configurable : quelques options, pas de guerre de style.",
      },
    ],
  },
  {
    id: "prettier-vs-eslint",
    title: "Prettier vs ESLint : deux rôles",
    level: 1,
    intro:
      "La confusion la plus fréquente : formateur et linter ne font pas la même chose.",
    blocks: [
      {
        kind: "diagram",
        title: "Deux outils complémentaires",
        lines: [
          "Prettier (formateur)",
          " └── COMMENT le code est écrit : espaces, retours, guillemets",
          " └── Décision automatique, pas de discussion",
          "",
          "ESLint (linter)",
          " └── CE QUE le code fait : bugs, mauvaises pratiques",
          " └── Règles configurables, parfois subjectives",
          "",
          "On utilise les deux : Prettier formate, ESLint analyse.",
        ],
      },
      {
        kind: "text",
        text: "Exemple : Prettier décide si la ligne est coupée après 80 caractères ; ESLint signale qu'une variable est inutilisée. Les deux peuvent cohabiter sans conflit grâce à `eslint-config-prettier`, qui désactive les règles ESLint de style redondantes avec Prettier.",
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
      "Ce qu'il faut connaître avant d'adopter Prettier.",
    blocks: [
      {
        kind: "fields",
        title: "Connaissances requises",
        fields: [
          {
            label: "Un langage supporté",
            value:
              "JavaScript/TypeScript le plus souvent : savoir lire du code suffit, Prettier s'occupe du style.",
          },
          {
            label: "npm et `package.json`",
            value:
              "Installer Prettier en devDependency et ajouter des scripts (`format`, `format:check`).",
          },
          {
            label: "Git (bases)",
            value:
              "Comprendre les hooks pre-commit pour automatiser le formatage avant chaque commit.",
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
      "Installer Prettier dans un projet, en devDependency.",
    blocks: [
      {
        kind: "command",
        label: "Installer Prettier",
        command: "npm install --save-dev --save-exact prettier",
        why: "Prettier est un outil de développement : il va en `devDependencies`, jamais dans le code de production. `--save-exact` fige la version sans caret : le formatage doit être identique pour toute l'équipe, et une mise à jour mineure de Prettier peut changer le style appliqué.",
        verify: "npx prettier --version",
      },
      {
        kind: "text",
        text: "Ensuite, on ajoute les scripts dans `package.json` : `\"format\": \"prettier --write .\"` pour formater, `\"format:check\": \"prettier --check .\"` pour vérifier (utilisé en CI).",
      },
    ],
  },
  {
    id: "premier-formatage",
    title: "Votre premier formatage en 5 minutes",
    level: 2,
    intro:
      "Formater un fichier et observer ce que Prettier change.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un fichier mal formaté",
            detail:
              "Écrire volontairement du code avec des espacements incohérents, des lignes trop longues, des guillemets mélangés.",
          },
          {
            title: "Formater",
            detail:
              "`npx prettier --write exemple.js` : Prettier réécrit le fichier avec un style cohérent.",
          },
          {
            title: "Observer le diff",
            detail:
              "`git diff` : seuls des changements de style apparaissent — aucune logique modifiée. C'est la garantie fondamentale de Prettier.",
          },
          {
            title: "Vérifier sans modifier",
            detail:
              "`npx prettier --check exemple.js` : indique si le fichier est conforme, sans le toucher. C'est ce mode que la CI utilise.",
          },
        ],
      },
    ],
  },
  {
    id: "cli-write-check",
    title: "La CLI : `--write` et `--check`",
    level: 2,
    intro:
      "Les deux modes de la ligne de commande : corriger ou contrôler.",
    blocks: [
      {
        kind: "command",
        label: "Formater (réécrire les fichiers)",
        command: "npx prettier --write .",
        why: "Parcourt le projet et réécrit tous les fichiers non conformes. À lancer avant de commiter, ou via un hook pre-commit. Le `.prettierignore` exclut ce qui ne doit pas être touché (build, dépendances).",
      },
      {
        kind: "command",
        label: "Vérifier sans modifier",
        command: "npx prettier --check .",
        why: "Liste les fichiers non conformes et retourne un code d'erreur s'il y en a : parfait pour la CI, qui doit constater sans modifier. Zéro fichier modifié, verdict binaire.",
      },
      {
        kind: "command",
        label: "Cibler des fichiers précis",
        command: "npx prettier --write \"src/**/*.ts\"",
        why: "Les globs limitent le formatage à un périmètre : utile pour uniformiser progressivement un gros projet, dossier par dossier, sans reformater tout le dépôt d'un coup.",
      },
    ],
  },
  {
    id: "configuration",
    title: "Configuration : où mettre les options",
    level: 2,
    intro:
      "Un seul fichier de config, partagé par toute l'équipe.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: ".prettierrc — configuration typique",
        code: `{\n  "printWidth": 100,\n  "tabWidth": 2,\n  "useTabs": false,\n  "semi": true,\n  "singleQuote": false,\n  "trailingComma": "all"\n}`,
      },
      {
        kind: "fields",
        title: "Les formats de configuration",
        fields: [
          {
            label: "`.prettierrc` / `.prettierrc.json`",
            value: "Le plus courant : un JSON simple à la racine du projet, versionné avec le code.",
          },
          {
            label: "`prettier.config.js`",
            value: "Quand la config doit être dynamique (calculée, partagée via un paquet).",
          },
          {
            label: "Clé `\"prettier\"` dans `package.json`",
            value: "Possible, mais mélange config et manifeste : préférer un fichier dédié.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'équipe : la configuration se décide une fois, collectivement, puis ne se rediscute plus. Changer une option reformate tout le projet : c'est un commit dédié, jamais mélangé à du code fonctionnel.",
      },
    ],
  },
  {
    id: "options-essentielles",
    title: "Les options essentielles",
    level: 2,
    intro:
      "Les réglages que l'on rencontre dans presque tous les projets.",
    blocks: [
      {
        kind: "table",
        headers: ["Option", "Effet", "Défaut"],
        rows: [
          ["`printWidth`", "Longueur de ligne cible avant coupure", "80"],
          ["`tabWidth`", "Nombre d'espaces par niveau d'indentation", "2"],
          ["`useTabs`", "Indenter avec des tabulations au lieu d'espaces", "false"],
          ["`semi`", "Point-virgule en fin d'instruction", "true"],
          ["`singleQuote`", "Guillemets simples plutôt que doubles", "false"],
          ["`trailingComma`", "Virgule finale dans les structures multilignes", "\"all\""],
        ],
      },
      {
        kind: "text",
        text: "Ces six options couvrent 95 % des débats de style. Les autres (espacement des accolades, parenthèses des fonctions fléchées, fins de ligne) sont détaillées dans la section avancée — mais la recommandation reste de garder les défauts sauf raison forte.",
      },
    ],
  },
  {
    id: "integration-editeur",
    title: "Intégration à l'éditeur",
    level: 2,
    intro:
      "Le formatage à la sauvegarde : on ne pense plus au style.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Installer l'extension Prettier",
            detail:
              "Dans VS Code : l'extension officielle « Prettier - Code formatter ».",
          },
          {
            title: "En faire le formateur par défaut",
            detail:
              "Dans les réglages : `editor.defaultFormatter` = Prettier, et `editor.formatOnSave` activé.",
          },
          {
            title: "Vérifier la config utilisée",
            detail:
              "L'extension lit le `.prettierrc` du projet automatiquement : le formatage à la sauvegarde respecte la config d'équipe, pas les préférences personnelles.",
          },
        ],
      },
      {
        kind: "text",
        text: "Avec le formatage à la sauvegarde, le code est toujours conforme avant même le commit : le hook pre-commit devient un filet de sécurité, pas le mécanisme principal.",
      },
    ],
  },
  {
    id: "pre-commit-hooks",
    title: "Hooks pre-commit",
    level: 2,
    intro:
      "Garantir que rien de non formaté n'entre dans le dépôt.",
    blocks: [
      {
        kind: "text",
        text: "Le duo standard : Husky installe le hook Git, lint-staged n'exécute Prettier que sur les fichiers stagés (rapide même sur un gros dépôt).",
      },
      {
        kind: "code",
        language: "json",
        title: "package.json — configuration lint-staged",
        code: `{\n  "scripts": {\n    "prepare": "husky install"\n  },\n  "lint-staged": {\n    "*.{js,ts,css,md,json}": "prettier --write"\n  }\n}`,
      },
      {
        kind: "text",
        text: "À chaque `git commit`, les fichiers modifiés sont formatés automatiquement avant d'être committés. Le développeur n'a rien à faire — et ne peut pas oublier.",
      },
    ],
  },
  {
    id: "eslint-cohabitation",
    title: "Cohabiter avec ESLint",
    level: 2,
    intro:
      "Éviter que les deux outils se contredisent.",
    blocks: [
      {
        kind: "command",
        label: "Installer la config de compatibilité",
        command: "npm install --save-dev eslint-config-prettier",
        why: "Ce paquet désactive toutes les règles ESLint qui entreraient en conflit avec Prettier (indentation, guillemets…). On l'ajoute en dernier dans la config ESLint : ESLint s'occupe de la qualité, Prettier du style, sans doublon ni contradiction.",
      },
      {
        kind: "text",
        text: "Ordre dans la config ESLint : les configs de règles d'abord, `eslint-config-prettier` en dernier pour avoir le dernier mot sur le style. Il n'y a plus besoin de plugin Prettier dans ESLint : les deux outils s'exécutent séparément.",
      },
    ],
  },
  {
    id: "ignorer-fichiers",
    title: "Ignorer : `.prettierignore`",
    level: 2,
    intro:
      "Tout ne doit pas être formaté : les fichiers générés s'excluent.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: ".prettierignore typique",
        code: `node_modules\ndist\nbuild\ncoverage\n*.min.js`,
      },
      {
        kind: "text",
        text: "Syntaxe identique au `.gitignore`. Principe : on ne formate que le code source écrit par des humains — jamais les dépendances, les builds, ni les fichiers générés. Pour un fichier ponctuel, le commentaire `// prettier-ignore` (ou `<!-- prettier-ignore -->` en HTML) protège le bloc suivant.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "Une fois configuré, Prettier disparaît du quotidien.",
    blocks: [
      {
        kind: "diagram",
        title: "Le formatage dans le flux de travail",
        lines: [
          "Édition (formatage à la sauvegarde : toujours propre)",
          "     │",
          "     ▼",
          "git commit (hook pre-commit : filet de sécurité)",
          "     │",
          "     ▼",
          "CI (prettier --check : verdict binaire)",
          "     │",
          "     ▼",
          "Revue de code (zéro commentaire de style)",
        ],
      },
      {
        kind: "list",
        items: [
          "Trois couches : éditeur (confort), hook (garantie locale), CI (garantie collective).",
          "En cas de `--check` rouge en CI : `prettier --write` sur les fichiers listés, puis commit.",
        ],
      },
    ],
  },
  {
    id: "erreurs-debutants",
    title: "Erreurs classiques des débutants",
    level: 2,
    intro:
      "Les pièges les plus fréquents avec Prettier.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["Prettier et ESLint se contredisent", "Le fichier oscille entre deux styles", "Ajouter `eslint-config-prettier` en dernier dans la config ESLint"],
          ["Oublier le `.prettierignore`", "Prettier reformate `dist/` ou `node_modules/`", "Créer le fichier d'exclusion dès l'installation"],
          ["Changer les options en cours de projet", "Diff géant mêlé au code", "Un commit dédié au reformatage, jamais mélangé"],
          ["`--write` sur tout le dépôt d'un coup", "Historique Git illisible", "Uniformiser progressivement, dossier par dossier"],
          ["Version de Prettier différente par développeur", "Formatages incohérents", "`--save-exact` et version figée dans le lockfile"],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-interne",
    title: "Architecture : parser, AST, printer",
    level: 3,
    intro:
      "Pourquoi Prettier ne casse jamais le code : il ne manipule pas du texte.",
    blocks: [
      {
        kind: "diagram",
        title: "Le pipeline de formatage",
        lines: [
          "Code source (texte)",
          "     │  parser (ex. babel, typescript)",
          "     ▼",
          "AST (arbre syntaxique : la structure, pas le style)",
          "     │  printer (règles de mise en page)",
          "     ▼",
          "Code formaté (même AST = même comportement)",
        ],
      },
      {
        kind: "text",
        text: "Prettier parse le code en arbre syntaxique abstrait, jette tout le style d'origine (espaces, retours), puis réimprime l'arbre selon ses règles. Puisque l'AST est inchangé, le comportement est inchangé — c'est une garantie structurelle, pas une promesse. C'est aussi pourquoi Prettier ne formate que du code syntaxiquement valide : un fichier avec une erreur de syntaxe est signalé, pas deviné.",
      },
    ],
  },
  {
    id: "options-detaillees",
    title: "Toutes les options importantes",
    level: 3,
    intro:
      "Le catalogue complet des réglages, avec leurs valeurs par défaut.",
    blocks: [
      {
        kind: "table",
        headers: ["Option", "Valeurs", "Défaut", "Note"],
        rows: [
          ["`printWidth`", "nombre", "80", "Cible, pas limite stricte"],
          ["`tabWidth`", "nombre", "2", "Espaces par niveau"],
          ["`useTabs`", "booléen", "false", "Tabulations vs espaces"],
          ["`semi`", "booléen", "true", "Points-virgules"],
          ["`singleQuote`", "booléen", "false", "Guillemets simples"],
          ["`jsxSingleQuote`", "booléen", "false", "Guillemets simples en JSX"],
          ["`quoteProps`", "\"as-needed\"/\"consistent\"/\"preserve\"", "\"as-needed\"", "Guillemets des clés d'objet"],
          ["`trailingComma`", "\"all\"/\"es5\"/\"none\"", "\"all\"", "Virgules finales"],
          ["`bracketSpacing`", "booléen", "true", "`{ a }` vs `{a}`"],
          ["`bracketSameLine`", "booléen", "false", "`>` du JSX en fin de ligne"],
          ["`arrowParens`", "\"always\"/\"avoid\"", "\"always\"", "`(x) =>` vs `x =>`"],
          ["`endOfLine`", "\"lf\"/\"crlf\"/\"cr\"/\"auto\"", "\"lf\"", "Fins de ligne"],
          ["`singleAttributePerLine`", "booléen", "false", "Un attribut JSX par ligne"],
          ["`embeddedLanguageFormatting`", "\"auto\"/\"off\"", "\"auto\"", "Formater le CSS/JS embarqué"],
        ],
      },
      {
        kind: "text",
        text: "Recommandation : garder les défauts sauf `printWidth` (souvent monté à 100-120 sur grands écrans) et les choix d'équipe historiques (`singleQuote`, `semi`). Chaque option non-défaut est un écart à documenter.",
      },
    ],
  },
  {
    id: "printwidth-detail",
    title: "`printWidth` : la largeur cible",
    level: 3,
    intro:
      "L'option la plus influente : comprendre ce qu'elle fait vraiment.",
    blocks: [
      {
        kind: "text",
        text: "`printWidth` (80 par défaut) est la longueur de ligne à partir de laquelle Prettier cherche à couper. C'est une cible, pas une limite dure : une longue chaîne de caractères ou une URL ne sera pas coupée artificiellement — Prettier ne casse jamais le code pour respecter la largeur.",
      },
      {
        kind: "list",
        items: [
          "80 : le défaut historique, issu des terminaux. Sûr mais parfois verbeux.",
          "100-120 : le choix courant des équipes modernes sur grands écrans.",
          "Au-delà de 120 : les diffs deviennent difficiles à lire en revue côte à côte.",
          "Changer `printWidth` reformate tout le projet : décision d'équipe, commit dédié.",
        ],
      },
    ],
  },
  {
    id: "guillemets-points-virgules",
    title: "Guillemets et points-virgules",
    level: 3,
    intro:
      "Les deux débats éternels du JavaScript, tranchés par deux booléens.",
    blocks: [
      {
        kind: "fields",
        title: "Les options de style",
        fields: [
          {
            label: "`semi` (défaut : true)",
            value: "Ajoute les points-virgules en fin d'instruction. Le style sans points-virgules (`semi: false`) existe mais exige de comprendre l'insertion automatique (ASI) pour éviter les pièges — d'où le défaut prudent.",
          },
          {
            label: "`singleQuote` (défaut : false)",
            value: "Utilise des apostrophes plutôt que des guillemets doubles. Prettier choisit automatiquement le délimiteur qui minimise les échappements : une chaîne contenant une apostrophe utilisera des guillemets doubles même avec `singleQuote: true`.",
          },
          {
            label: "`quoteProps` (défaut : \"as-needed\")",
            value: "N'ajoute des guillemets aux clés d'objet que si nécessaire (`{ \"ma-clé\": 1 }` mais `{ nom: 1 }`).",
          },
          {
            label: "`jsxSingleQuote` (défaut : false)",
            value: "Guillemets des attributs JSX, indépendant de `singleQuote` car les conventions JSX diffèrent souvent.",
          },
        ],
      },
    ],
  },
  {
    id: "trailing-comma",
    title: "`trailingComma` : la virgule finale",
    level: 3,
    intro:
      "Un détail qui change la lisibilité des diffs.",
    blocks: [
      {
        kind: "text",
        text: "La virgule finale après le dernier élément d'une structure multiligne. Avec `\"all\"` (défaut depuis Prettier 3), ajouter un élément ne modifie qu'une ligne dans le diff ; sans virgule finale, c'est deux lignes (l'ancienne dernière ligne + la nouvelle). Sur des années de revues, la différence est énorme.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Diff avec trailingComma: \"all\"",
        code: `const couleurs = [\n  "rouge",\n  "vert",\n+ "bleu",\n ];`,
      },
      {
        kind: "text",
        text: "Valeurs : `\"all\"` (partout, y compris les paramètres de fonction), `\"es5\"` (partout sauf là où ES5 l'interdit), `\"none\"` (jamais). Le défaut `\"all\"` est le bon choix pour le code moderne.",
      },
    ],
  },
  {
    id: "parentheses-espacements",
    title: "Parenthèses et espacements",
    level: 3,
    intro:
      "Les options fines : accolades, flèches, crochets JSX.",
    blocks: [
      {
        kind: "fields",
        title: "Réglages de détail",
        fields: [
          {
            label: "`bracketSpacing` (défaut : true)",
            value: "`{ nom }` vs `{nom}` : espaces à l'intérieur des accolades d'objet. Le défaut aéré est le plus lisible.",
          },
          {
            label: "`arrowParens` (défaut : \"always\")",
            value: "`(x) => x` vs `x => x`. `\"avoid\"` omet les parenthèses à un seul paramètre ; `\"always\"` les garde — plus cohérent et plus sûr avec TypeScript.",
          },
          {
            label: "`bracketSameLine` (défaut : false)",
            value: "En JSX/HTML : le `>` de fermeture va-t-il à la ligne (`false`, style React historique) ou en fin de dernière ligne d'attribut (`true`) ?",
          },
          {
            label: "`singleAttributePerLine` (défaut : false)",
            value: "Force un attribut par ligne en HTML/JSX/Vue. Utile pour les composants aux nombreux props.",
          },
        ],
      },
    ],
  },
  {
    id: "endofline",
    title: "`endOfLine` : les fins de ligne",
    level: 3,
    intro:
      "Le problème invisible des équipes multi-OS.",
    blocks: [
      {
        kind: "text",
        text: "Windows utilise CRLF (`\\r\\n`), Unix LF (`\\n`). Sans réglage, un fichier édité sur les deux OS accumule des fins de ligne mélangées — et Git signale des modifications fantômes. `endOfLine: \"lf\"` (défaut) normalise tout en LF.",
      },
      {
        kind: "list",
        items: [
          "Garder `\"lf\"` : le standard des dépôts modernes, compatible avec tous les outils.",
          "Compléter avec un `.gitattributes` (`* text=auto eol=lf`) pour normaliser à l'entrée dans Git.",
          "Ne jamais utiliser `\"auto\"` en équipe : il conserve les fins de ligne existantes, donc les incohérences.",
        ],
      },
    ],
  },
  {
    id: "overrides",
    title: "`overrides` : configurer par fichier",
    level: 3,
    intro:
      "Des règles différentes selon le langage, dans un seul fichier de config.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: ".prettierrc avec overrides",
        code: `{\n  "semi": true,\n  "overrides": [\n    {\n      "files": "*.md",\n      "options": { "printWidth": 80, "proseWrap": "always" }\n    },\n    {\n      "files": "*.{yml,yaml}",\n      "options": { "tabWidth": 2 }\n    }\n  ]\n}`,
      },
      {
        kind: "text",
        text: "Les `overrides` appliquent des options à des motifs de fichiers : prose du Markdown (`proseWrap`), YAML, ou tout langage avec des conventions propres. La config de base reste commune — les overrides sont l'exception, pas la règle.",
      },
    ],
  },
  {
    id: "plugins-mecanisme",
    title: "Plugins : étendre les langages",
    level: 3,
    intro:
      "Comment Prettier apprend de nouveaux langages.",
    blocks: [
      {
        kind: "text",
        text: "Un plugin Prettier apporte un parser et un printer pour un langage non supporté nativement (XML, Java, PHP, Tailwind pour le tri de classes…). On l'installe en devDependency et on le déclare dans la config.",
      },
      {
        kind: "code",
        language: "json",
        title: ".prettierrc avec plugin",
        code: `{\n  "plugins": ["prettier-plugin-tailwindcss"]\n}`,
      },
      {
        kind: "list",
        items: [
          "N'ajouter un plugin que pour un besoin réel : chaque plugin est une dépendance à maintenir.",
          "Vérifier la compatibilité avec la version de Prettier du projet.",
          "Les plugins communautaires suivent le même pipeline (parser → AST → printer) : la garantie « même comportement » s'applique.",
        ],
      },
    ],
  },
  {
    id: "plugin-tailwind",
    title: "Cas pratique : le plugin Tailwind",
    level: 3,
    intro:
      "Le plugin le plus répandu : trier automatiquement les classes utilitaires.",
    blocks: [
      {
        kind: "text",
        text: "`prettier-plugin-tailwindcss` (plugin officiel de l'écosystème Tailwind) trie les classes utilitaires dans un ordre canonique à chaque formatage. Fini les `class` avec 15 classes dans un ordre aléatoire : le diff ne montre plus que les vrais changements de classes.",
      },
      {
        kind: "code",
        language: "html",
        title: "Avant / après formatage",
        code: `<!-- avant -->\n<div class="p-4 flex text-red-500 md:p-8 font-bold">\n\n<!-- après -->\n<div class="flex p-4 font-bold text-red-500 md:p-8">`,
      },
      {
        kind: "text",
        text: "Le plugin détecte automatiquement la configuration Tailwind du projet. Comme tout plugin, il s'ajoute à la clé `plugins` de la config Prettier.",
      },
    ],
  },
  {
    id: "editorconfig",
    title: "EditorConfig : la couche universelle",
    level: 3,
    intro:
      "Un standard que Prettier respecte nativement.",
    blocks: [
      {
        kind: "text",
        text: "EditorConfig (`.editorconfig`) est un format universel de style de base (indentation, fins de ligne, charset) compris par la plupart des éditeurs. Quand Prettier trouve un `.editorconfig`, il en applique les réglages correspondants (`indent_style`, `tab_width`, `end_of_line`…) sauf si la config Prettier les surcharge explicitement.",
      },
      {
        kind: "list",
        items: [
          "Utile dans les dépôts multi-langages où tous les éditeurs ne connaissent pas Prettier.",
          "La config Prettier reste prioritaire : en cas de conflit, c'est elle qui gagne.",
          "Ne pas dupliquer : si Prettier gère le projet, `.editorconfig` est redondant — le garder seulement pour les outils qui l'exigent.",
        ],
      },
    ],
  },
  {
    id: "ci-integration",
    title: "Intégration CI",
    level: 3,
    intro:
      "Le contrôle automatique : `--check` dans le pipeline.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Étape de vérification (GitHub Actions)",
        code: `steps:\n  - uses: actions/checkout@v4\n  - uses: actions/setup-node@v4\n    with:\n      node-version: 20\n      cache: npm\n  - run: npm ci\n  - run: npm run format:check`,
      },
      {
        kind: "text",
        text: "`format:check` = `prettier --check .` : la CI échoue si un fichier n'est pas formaté. Le développeur corrige en local avec `prettier --write` — jamais la CI ne modifie le code elle-même.",
      },
    ],
  },
  {
    id: "stdin-filepath",
    title: "`--stdin-filepath` : les intégrations",
    level: 3,
    intro:
      "Comment les éditeurs et outils dialoguent avec Prettier.",
    blocks: [
      {
        kind: "command",
        label: "Formater depuis l'entrée standard",
        command: "echo \"const x={a:1}\" | npx prettier --stdin-filepath exemple.js",
        why: "Lit le code sur stdin et écrit le résultat sur stdout. `--stdin-filepath` indique le nom (donc le langage et la config applicable) sans créer de fichier. C'est le protocole qu'utilisent les extensions d'éditeur et les scripts : pas de fichier temporaire, pas d'effet de bord.",
        verify: "echo \"const x={a:1}\" | npx prettier --stdin-filepath exemple.js",
      },
    ],
  },
  {
    id: "debug-check",
    title: "`--debug-check` : vérifier l'innocuité",
    level: 3,
    intro:
      "Prouver que le formatage ne change pas le comportement.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier la stabilité du formatage",
        command: "npx prettier --debug-check src/",
        why: "Formate chaque fichier deux fois et compare les AST avant/après : si le formatage modifiait le comportement, la commande le signalerait. Utile après l'ajout d'un plugin ou une montée de version de Prettier, pour valider sur tout le projet.",
      },
    ],
  },
  {
    id: "cache-option",
    title: "L'option `--cache`",
    level: 3,
    intro:
      "Accélérer les vérifications sur les gros dépôts.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier avec cache",
        command: "npx prettier --check . --cache",
        why: "Mémorise les fichiers déjà conformes : seules les modifications sont revérifiées. Sur un gros monorepo, `--check` passe de plusieurs secondes à quelques dizaines de millisecondes. Le cache vit dans `node_modules/.cache` par défaut.",
      },
      {
        kind: "text",
        text: "À combiner avec `--cache-strategy` si besoin (contenu vs métadonnées). En CI, le cache est moins utile (environnement frais à chaque fois) sauf si le cache est persisté entre les runs.",
      },
    ],
  },
  {
    id: "formatage-plage",
    title: "Formatage de plage (range formatting)",
    level: 3,
    intro:
      "Ne reformater qu'une sélection : l'outil des migrations progressives.",
    blocks: [
      {
        kind: "text",
        text: "Les extensions d'éditeur permettent de formater uniquement la sélection courante. Usage principal : uniformiser un fichier legacy morceau par morceau, sans créer un diff géant — on formate ce que l'on touche, au fil des modifications.",
      },
      {
        kind: "list",
        items: [
          "En CLI, les options `--range-start` / `--range-end` offrent la même granularité.",
          "Stratégie legacy : ne jamais reformater un fichier entier « pour le principe » ; formater les zones modifiées.",
          "Le résultat reste cohérent : Prettier formate la plage comme s'il formatait le fichier.",
        ],
      },
    ],
  },
  {
    id: "langages-embarques",
    title: "Langages embarqués",
    level: 3,
    intro:
      "Le CSS dans le JS, le GraphQL dans les template strings : tout est formaté.",
    blocks: [
      {
        kind: "text",
        text: "Prettier détecte et formate les langages embarqués : le CSS dans les template literals `styled-components`, le GraphQL dans les appels `gql`, le Markdown dans les commentaires JSDoc. L'option `embeddedLanguageFormatting` (défaut `\"auto\"`) contrôle ce comportement.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "CSS embarqué reformaté",
        code: `const Bouton = styled.button\`\n  background: palevioletred;\n  color: white;\n  font-size: 1em;\n\`;`,
      },
      {
        kind: "text",
        text: "La détection repose sur des conventions (tags connus comme `css`, `gql`) : pour les cas exotiques, un commentaire magique ou un plugin peut être nécessaire. En cas de doute, `\"off\"` désactive le formatage embarqué.",
      },
    ],
  },
  {
    id: "tri-imports",
    title: "Tri des imports",
    level: 3,
    intro:
      "Ordonner les imports automatiquement : via plugin dédié.",
    blocks: [
      {
        kind: "text",
        text: "Prettier natif ne trie pas les imports (il ne réordonne pas le code, il ne fait que le mettre en page). Des plugins communautaires ajoutent ce tri : les imports sont regroupés et ordonnés (externes, internes, relatifs) à chaque formatage.",
      },
      {
        kind: "list",
        items: [
          "Le tri des imports est une décision d'équipe : il modifie l'ordre du code, pas seulement sa présentation.",
          "Vérifier que le plugin choisi est maintenu et compatible avec la version de Prettier.",
          "Alternative sans plugin : la règle ESLint de tri d'imports — mais alors c'est ESLint qui s'en charge, pas Prettier.",
        ],
      },
    ],
  },
  {
    id: "migration-legacy",
    title: "Uniformiser un projet legacy",
    level: 3,
    intro:
      "Introduire Prettier sur une base existante sans paralyser l'équipe.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Décider la config",
            detail: "Choisir les options avec l'équipe (ou garder les défauts). Un seul débat, une seule fois.",
          },
          {
            title: "Mesurer l'impact",
            detail: "`prettier --check .` : quantifier les fichiers non conformes. Si c'est 90 % du dépôt, un reformatage global est inévitable.",
          },
          {
            title: "Choisir la stratégie",
            detail: "Big bang (un commit « format: apply prettier », historique assumé) ou progressif (formatage des fichiers touchés uniquement, via pre-commit). Le big bang est plus simple ; le progressif préserve le `git blame`.",
          },
          {
            title: "Geler pendant l'opération",
            detail: "En big bang : coordonner pour éviter les branches longues qui divergeraient massivement.",
          },
          {
            title: "Verrouiller",
            detail: "Hook pre-commit + CI `--check` : le projet ne reviendra jamais en arrière.",
          },
        ],
      },
    ],
  },
  {
    id: "monorepo-config",
    title: "Prettier en monorepo",
    level: 3,
    intro:
      "Une config à la racine, des exceptions par paquet si nécessaire.",
    blocks: [
      {
        kind: "text",
        text: "Dans un monorepo, la configuration vit à la racine et s'applique à tout. Les paquets avec des besoins spécifiques (documentation avec une prose différente, paquet legacy) utilisent les `overrides` par motif de chemin plutôt que des configs locales divergentes.",
      },
      {
        kind: "list",
        items: [
          "Un seul `.prettierrc` à la racine : la cohérence du style sur tout le monorepo.",
          "Les `overrides` ciblent `apps/docs/**` ou `packages/legacy/**` quand nécessaire.",
          "Le hook pre-commit (lint-staged) ne formate que les fichiers modifiés : rapide même à grande échelle.",
          "`--cache` rend le `--check` CI quasi instantané sur les gros dépôts.",
        ],
      },
    ],
  },
  {
    id: "conflits-git",
    title: "Prettier et les conflits Git",
    level: 3,
    intro:
      "Pourquoi un projet formaté a moins de conflits — et comment gérer les restants.",
    blocks: [
      {
        kind: "text",
        text: "Un style uniforme réduit mécaniquement les conflits : deux développeurs qui modifient des lignes adjacentes produisent le même formatage, donc Git fusionne sans conflit là où des styles différents auraient divergé. Les `trailingComma: \"all\"` aident aussi : ajouter un élément ne touche qu'une ligne.",
      },
      {
        kind: "list",
        items: [
          "Après résolution d'un conflit, relancer `prettier --write` sur le fichier : la fusion manuelle a pu introduire un style incohérent.",
          "Ne jamais commiter un fichier en conflit non résolu : Prettier refusera de le parser de toute façon (marqueurs `<<<<<<<`).",
          "Le commit de reformatage global invalide les branches en cours : le rebaser juste après l'opération.",
        ],
      },
    ],
  },
  {
    id: "check-vs-write-strategie",
    title: "Stratégie `--check` vs `--write`",
    level: 3,
    intro:
      "Qui fait quoi : la répartition des responsabilités.",
    blocks: [
      {
        kind: "table",
        headers: ["Contexte", "Commande", "Rôle"],
        rows: [
          ["Éditeur (sauvegarde)", "Formatage auto", "Confort : le code est propre en continu"],
          ["Pre-commit (hook)", "`--write` sur fichiers stagés", "Filet : rien de non formaté n'entre"],
          ["CI", "`--check`", "Garantie : échec si non conforme"],
          ["Migration", "`--write` ciblé", "Opération volontaire et isolée"],
          ["Débogage", "`--debug-check`", "Validation après changement d'outillage"],
        ],
      },
      {
        kind: "text",
        text: "Principe : les humains et les hooks écrivent (`--write`), la CI constate (`--check`). Une CI qui reformate elle-même crée des commits surprises et des boucles infinies de pipeline.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance sur gros dépôts",
    level: 3,
    intro:
      "Garder le formatage instantané quand le projet grandit.",
    blocks: [
      {
        kind: "list",
        items: [
          "`--cache` : le levier principal pour `--check` répétés.",
          "lint-staged en pre-commit : seuls les fichiers modifiés sont formatés.",
          "`.prettierignore` strict : ne jamais faire scanner les dossiers générés.",
          "Parallélisme : Prettier traite les fichiers en parallèle nativement ; sur des dizaines de milliers de fichiers, découper par dossier si besoin.",
          "Mesurer avant d'optimiser : `time npx prettier --check .` donne la base.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-pro",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Ce qui distingue une adoption réussie d'un outil qui énerve l'équipe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Décider la config une fois, collectivement, puis ne plus en débattre.",
          "Version de Prettier figée (`--save-exact`) : identique pour tous.",
          "Trois couches : éditeur, pre-commit, CI.",
          "Commits de reformatage isolés, jamais mélangés au fonctionnel.",
          "`eslint-config-prettier` pour une cohabitation sans conflit.",
          "Ne pas chercher à tout configurer : les défauts sont d'excellents défauts.",
          "Documenter les écarts aux défauts (pourquoi `printWidth: 120` ?) dans le README.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes et solutions",
    level: 3,
    intro:
      "Les problèmes que l'on rencontre vraiment avec Prettier.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Solution"],
        rows: [
          ["L'éditeur ne formate pas à la sauvegarde", "Mauvais formateur par défaut ou extension désactivée", "Vérifier `editor.defaultFormatter` et `formatOnSave` par langage"],
          ["Deux styles coexistent dans le projet", "Pas de hook ni de CI, formatage manuel", "Mettre en place les trois couches (éditeur, hook, CI)"],
          ["Prettier échoue avec une erreur de syntaxe", "Le fichier contient une erreur réelle", "Corriger l'erreur : Prettier ne formate que du code valide"],
          ["`--check` rouge après un merge", "Branche non reformatée", "`prettier --write` sur les fichiers listés, puis commit"],
          ["Le plugin ne s'applique pas", "Plugin non déclaré dans `plugins` ou version incompatible", "Vérifier la config et la compatibilité des versions"],
          ["Fichiers générés reformatés", "`.prettierignore` incomplet", "Ajouter les dossiers de build et les artefacts"],
        ],
      },
    ],
  },
  {
    id: "projet-uniformiser-legacy",
    title: "Projet : uniformiser un projet legacy",
    level: 3,
    intro:
      "Le projet canonique : introduire Prettier sur une base existante.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Auditer",
            detail: "`prettier --check .` : mesurer l'ampleur. Identifier les fichiers générés à exclure.",
          },
          {
            title: "Configurer",
            detail: "Choisir les options (ou les défauts), créer `.prettierrc` et `.prettierignore`.",
          },
          {
            title: "Reformater",
            detail: "Stratégie choisie (big bang ou progressif). Commit dédié et documenté.",
          },
          {
            title: "Verrouiller",
            detail: "Extension recommandée, hook pre-commit, étape CI `--check`.",
          },
          {
            title: "Cohabiter",
            detail: "Ajuster ESLint avec `eslint-config-prettier`, vérifier qu'aucun conflit ne subsiste.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-config-equipe",
    title: "Projet : standard d'équipe",
    level: 3,
    intro:
      "Créer un standard de formatage partageable entre projets.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir la config de référence",
            detail: "Un `.prettierrc` d'équipe, versionné dans un dépôt dédié ou un paquet interne.",
          },
          {
            title: "Partager",
            detail: "Via un paquet de config partagé (`@equipe/prettier-config`) étendu par chaque projet, ou par duplication documentée.",
          },
          {
            title: "Documenter les choix",
            detail: "Chaque écart aux défauts est justifié par écrit : la config se lit comme une décision, pas comme une habitude.",
          },
          {
            title: "Automatiser l'adoption",
            detail: "Template de projet ou script d'initialisation qui installe Prettier, la config, le hook et l'étape CI d'un coup.",
          },
        ],
      },
    ],
  },
  {
    id: "prettier-api",
    title: "Utiliser Prettier par programme",
    level: 3,
    intro:
      "Quand le CLI ne suffit pas : formater depuis du code.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "API programmatique",
        code: `import * as prettier from "prettier";\n\n// Formater une chaîne\nconst formate = await prettier.format(code, { parser: "babel" });\n\n// Vérifier sans modifier (booléen)\nconst propre = await prettier.check(code, { parser: "babel" });\n\n// Résoudre la config effective pour un fichier\nconst config = await prettier.resolveConfig("./src/app.ts");`,
      },
      {
        kind: "text",
        text: "Cas d'usage : générateurs de code (formater le code produit), éditeurs et plugins maison, scripts de migration qui normalisent des fichiers générés. Le CLI couvre 95 % des besoins ; l'API sert les 5 % restants.",
      },
    ],
  },
  {
    id: "migrer-projet-existant",
    title: "Adopter Prettier sur un projet existant",
    level: 3,
    intro:
      "Introduire le formatage sans polluer l'historique git.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir la config",
            detail:
              "Créer `.prettierrc` avec les options de l'équipe, en partant des défauts et en ne changeant que le nécessaire.",
          },
          {
            title: "Un commit dédié",
            detail:
              "`npx prettier . --write` sur tout le dépôt, puis un commit unique intitulé « style: formater avec Prettier ». Jamais mélangé avec du fonctionnel : le diff est énorme et la revue impossible sinon.",
          },
          {
            title: "Verrouiller",
            detail:
              "Ajouter le check en CI et le hook pre-commit le même jour : sans verrouillage, le formatage se dégrade en une semaine.",
          },
          {
            title: "Gérer les conflits",
            detail:
              "Prévenir l'équipe avant le commit de formatage : tout le monde rebase ses branches juste après. Coordonner, pas surprendre.",
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
          {
            label: "Documentation Prettier",
            value: "prettier.io/docs : installation, CLI, configuration, tous les détails.",
          },
          {
            label: "Référence des options",
            value: "prettier.io/docs/en/options : le catalogue exhaustif avec exemples avant/après.",
          },
          {
            label: "Dépôt GitHub",
            value: "prettier/prettier : issues, discussions et changelog pour suivre les évolutions du style.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les projets de cette page — uniformiser un legacy, puis standardiser l'équipe.",
          "Complément : la compétence `eslint` pour l'analyse statique complémentaire.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Prettier maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Compléter avec `eslint` : l'analyse statique qui détecte les bugs, pendant que Prettier soigne le style.",
          "Automatiser avec `git` (hooks) et `cicd` : qualité gates sur chaque commit.",
          "Écrire du code typé avec `typescript` : Prettier formate, le compilateur vérifie.",
          "Revenir à la roadmap : valider Prettier et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

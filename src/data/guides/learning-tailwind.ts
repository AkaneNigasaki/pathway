import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Tailwind CSS : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Version couverte : Tailwind CSS v4 (configuration CSS-first).
 */
export const LEARNING_TAILWIND: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Tailwind CSS, pourquoi il existe et en quoi il diffère d'écrire du CSS classique.",
    blocks: [
      {
        kind: "text",
        text: "Tailwind CSS est un framework CSS dit « utility-first » : au lieu d'écrire des règles CSS dans des feuilles de style, on applique des classes utilitaires directement dans le HTML. `flex`, `pt-4`, `text-center` : chaque classe fait une seule chose, et on les compose pour construire l'interface.",
      },
      {
        kind: "text",
        text: "Pourquoi Tailwind existe : dans le CSS classique, on invente des noms de classes (`card-wrapper-inner`), on écrit des règles dispersées dans plusieurs fichiers, et le CSS mort s'accumule. Avec les utilitaires, le style vit à côté du markup : on voit exactement ce qu'un élément affiche en lisant sa balise, et le CSS inutilisé n'est jamais généré.",
      },
      {
        kind: "text",
        text: "Ce que Tailwind n'est pas : ce n'est pas une bibliothèque de composants prêts à l'emploi. Il ne fournit ni bouton ni modale : il fournit les briques (espacement, couleurs, layout) avec lesquelles on construit ses propres composants, cohérents avec son design system.",
      },
    ],
  },
  {
    id: "utilitaire-plutot-que-css",
    title: "L'utilitaire plutôt que la règle CSS",
    level: 1,
    intro:
      "Le changement de mentalité central : une classe Tailwind correspond à une déclaration CSS, pas à un composant.",
    blocks: [
      {
        kind: "diagram",
        title: "La correspondance classe → CSS",
        lines: [
          "Classe utilitaire          Déclaration CSS générée",
          "─────────────────          ─────────────────────────",
          "flex                   →   display: flex",
          "pt-4                   →   padding-top: 1rem",
          "text-center            →   text-align: center",
          "md:grid-cols-2         →   @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr) }",
          "hover:bg-blue-600      →   :hover { background-color: … }",
          "dark:text-white        →   thème sombre { color: #fff }",
        ],
      },
      {
        kind: "text",
        text: "Conséquence pratique : styler un élément, c'est choisir des utilitaires et les écrire dans l'attribut `class`. Le responsive se fait avec des préfixes (`sm:`, `md:`, `lg:`), les états avec des variantes (`hover:`, `focus:`), le thème sombre avec `dark:`. Tout le vocabulaire visuel tient dans le markup.",
      },
      {
        kind: "list",
        items: [
          "Une classe = une propriété CSS : pas de noms inventés, pas de fichiers séparés à synchroniser.",
          "La composition remplace l'héritage : on assemble des utilitaires plutôt qu'on étend des classes.",
          "Le moteur JIT ne génère que le CSS des classes réellement utilisées : le fichier final reste minuscule.",
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
      "Tailwind est une abstraction au-dessus du CSS : sans les bases du CSS, les utilitaires restent du vocabulaire vide.",
    blocks: [
      {
        kind: "fields",
        title: "CSS — ce qu'il faut savoir",
        fields: [
          {
            label: "Modèle de boîte",
            value:
              "`content`, `padding`, `border`, `margin` : les utilitaires `p-4`, `m-2`, `border` n'en sont que des raccourcis. Sans ce modèle, l'espacement reste du tâtonnement.",
          },
          {
            label: "Flexbox",
            value:
              "`display: flex`, `justify-content`, `align-items`, `gap` : les classes `flex`, `justify-between`, `items-center`, `gap-4` les exposent directement.",
          },
          {
            label: "Grid",
            value:
              "`grid-template-columns`, placement des éléments : les classes `grid`, `grid-cols-2`, `col-span-2` en sont la traduction.",
          },
          {
            label: "Sélecteurs et spécificité",
            value:
              "Comprendre pourquoi une règle gagne sur une autre : indispensable quand un style Tailwind semble « ignoré ».",
          },
          {
            label: "Media queries",
            value:
              "Les préfixes `sm:`, `md:`, `lg:` sont des media queries : la logique mobile-first doit être acquise.",
          },
          {
            label: "Pseudo-classes",
            value:
              "`:hover`, `:focus`, `:disabled` : les variantes `hover:`, `focus:`, `disabled:` les encapsulent.",
          },
          {
            label: "Couleurs et unités",
            value:
              "Hexadécimal, `rgb()`, `rem` : les échelles Tailwind (`blue-500`, `p-4`) sont des valeurs CSS ordinaires.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. Règle simple : si vous ne savez pas écrire l'équivalent en CSS pur d'un utilitaire, apprenez d'abord le CSS correspondant — Tailwind ira ensuite deux fois plus vite.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer Tailwind CSS v4 dans un projet Vite, en comprenant ce que fait chaque étape.",
    blocks: [
      {
        kind: "command",
        label: "Installer Tailwind et son plugin Vite",
        command: "npm install -D tailwindcss @tailwindcss/vite",
        why: "Installe Tailwind CSS et le plugin officiel qui l'intègre au dev server et au build de Vite. En dépendances de développement : Tailwind ne sert qu'à générer le CSS, il n'est jamais exécuté dans le navigateur.",
        verify: "npm list tailwindcss",
      },
      {
        kind: "command",
        label: "Ajouter le plugin dans la configuration Vite",
        command: "npx tailwindcss --help",
        why: "Vérifie que le paquet est bien installé et affiche l'aide de la CLI. La configuration réelle se fait ensuite dans `vite.config.ts` en ajoutant le plugin Tailwind à la liste des plugins.",
        verify: "ls node_modules/@tailwindcss/vite",
      },
      {
        kind: "code",
        language: "typescript",
        title: "vite.config.ts — enregistrer le plugin",
        code: `import { defineConfig } from "vite";\nimport tailwindcss from "@tailwindcss/vite";\n\nexport default defineConfig({\n  plugins: [tailwindcss()],\n});`,
      },
      {
        kind: "code",
        language: "css",
        title: "src/index.css — point d'entrée CSS (v4)",
        code: `@import "tailwindcss";`,
      },
      {
        kind: "text",
        text: "En v4, une seule ligne `@import \"tailwindcss\";` suffit : le contenu scanné est détecté automatiquement (plus de `content: []` à déclarer comme en v3), et la personnalisation se fait en CSS avec `@theme` plutôt que dans un `tailwind.config.js`.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet",
    level: 2,
    intro:
      "Mettre en place un projet complet et afficher une première interface stylée, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le projet Vite",
            detail:
              "`npm create vite@latest tailwind-demo` puis choisir le template (React, Vue ou vanilla), `cd tailwind-demo` et `npm install` : la base de l'application.",
          },
          {
            title: "Installer Tailwind",
            detail:
              "`npm install -D tailwindcss @tailwindcss/vite`, puis ajouter `tailwindcss()` aux plugins dans `vite.config.ts`.",
          },
          {
            title: "Créer le CSS d'entrée",
            detail:
              "Dans `src/index.css`, écrire `@import \"tailwindcss\";`. Importer ce fichier dans le point d'entrée JS (`import \"./index.css\"`).",
          },
          {
            title: "Écrire les premiers utilitaires",
            detail:
              "Dans le composant principal, ajouter des classes : un conteneur `max-w-md mx-auto p-6`, un titre `text-2xl font-bold`, un bouton `bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700`.",
          },
          {
            title: "Lancer le dev server",
            detail:
              "`npm run dev` : le plugin Tailwind scanne les fichiers, génère le CSS des classes utilisées et l'injecte. Modifier une classe met à jour le style instantanément grâce au HMR.",
          },
          {
            title: "Vérifier le build",
            detail:
              "`npm run build` : le CSS final ne contient que les utilitaires réellement utilisés. Ouvrir le fichier généré dans `dist/` pour constater sa taille réduite.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Une carte simple en utilitaires",
        code: `<div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md dark:bg-neutral-900">\n  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">\n    Ma première carte\n  </h2>\n  <p className="mt-2 text-neutral-600 dark:text-neutral-300">\n    Stylée uniquement avec des utilitaires Tailwind.\n  </p>\n  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">\n    Action\n  </button>\n</div>`,
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "La chaîne d'outils autour de Tailwind : comprendre qui fait quoi entre l'éditeur, Vite et le navigateur.",
    blocks: [
      {
        kind: "diagram",
        title: "De la classe au pixel",
        lines: [
          "Éditeur (classes écrites dans le markup)",
          "      ↓  autocomplétion via l'extension Tailwind",
          "Vite + plugin @tailwindcss/vite",
          "      ↓  scan des fichiers, génération JIT",
          "CSS généré (uniquement les classes utilisées)",
          "      ↓  injecté en dev, fichier .css en build",
          "Navigateur (rendu + DevTools pour inspecter)",
        ],
      },
      {
        kind: "text",
        text: "En développement, le plugin Vite régénère le CSS à chaque modification de fichier : ajouter une classe jamais vue déclenche sa génération immédiate. Dans les DevTools du navigateur, chaque utilitaire apparaît comme une règle CSS ordinaire — on peut y lire exactement la déclaration produite, ce qui est la meilleure façon d'apprendre la correspondance classe → CSS.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs",
    level: 2,
    intro:
      "L'extension officielle change tout : autocomplétion, aperçu des couleurs et documentation au survol.",
    blocks: [
      {
        kind: "fields",
        title: "VS Code — Tailwind CSS IntelliSense",
        fields: [
          {
            label: "Extension",
            value:
              "« Tailwind CSS IntelliSense » (l'extension officielle) : autocomplétion des classes, aperçu de la couleur au survol, documentation de chaque utilitaire.",
          },
          {
            label: "Pourquoi c'est essentiel",
            value:
              "Sans autocomplétion, on doit mémoriser des centaines de noms de classes. Avec, on découvre les utilitaires en tapant et on voit immédiatement le CSS généré.",
          },
          {
            label: "Réglage utile",
            value:
              "L'extension détecte automatiquement le projet Tailwind. Si l'autocomplétion ne fonctionne pas, vérifier que le CSS d'entrée contient bien `@import \"tailwindcss\";`.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Autres éditeurs",
        fields: [
          {
            label: "WebStorm",
            value:
              "Support Tailwind natif : complétion et navigation sans extension supplémentaire.",
          },
          {
            label: "Neovim / Zed",
            value:
              "Via le serveur de langage Tailwind CSS (`tailwindcss-language-server`) : mêmes fonctions que l'extension VS Code.",
          },
        ],
      },
    ],
  },
  {
    id: "classes-fondamentales",
    title: "Classes fondamentales",
    level: 2,
    intro:
      "Le vocabulaire de base qui couvre 80 % des besoins : espacement, typographie, couleurs, layout.",
    blocks: [
      {
        kind: "table",
        headers: ["Famille", "Exemples", "CSS équivalent"],
        rows: [
          ["Espacement", "`p-4`, `px-6`, `m-2`, `mt-8`, `gap-4`", "`padding`, `margin` — l'échelle va de `0` à `96` (× 0,25rem)"],
          ["Typographie", "`text-sm`, `font-bold`, `leading-6`, `tracking-wide`", "`font-size`, `font-weight`, `line-height`, `letter-spacing`"],
          ["Couleurs", "`bg-blue-600`, `text-neutral-800`, `border-neutral-200`", "Palette intégrée (`50`–`950`) + opacité via `/50`"],
          ["Layout", "`flex`, `grid`, `block`, `hidden`", "`display`"],
          ["Position", "`relative`, `absolute`, `fixed`, `sticky`", "`position`"],
          ["Tailles", "`w-full`, `h-10`, `max-w-md`, `min-h-screen`", "`width`, `height` et contraintes"],
          ["Bordures", "`border`, `rounded-lg`, `border-neutral-200`", "`border`, `border-radius`"],
        ],
      },
      {
        kind: "text",
        text: "L'échelle d'espacement est la clé : `p-4` vaut `1rem`, `p-8` vaut `2rem`, toujours des multiples de `0,25rem`. Cette échelle partagée garantit un rythme visuel cohérent sans réfléchir aux pixels — c'est le « design system intégré » de Tailwind.",
      },
    ],
  },
  {
    id: "responsive",
    title: "Responsive mobile-first",
    level: 2,
    intro:
      "Les préfixes de breakpoint : écrire d'abord pour mobile, puis ajuster vers le haut.",
    blocks: [
      {
        kind: "table",
        headers: ["Préfixe", "Breakpoint", "Signification"],
        rows: [
          ["(aucun)", "—", "Mobile : le style de base, sans préfixe"],
          ["`sm:`", "640px", "Petites tablettes et plus"],
          ["`md:`", "768px", "Tablettes et plus"],
          ["`lg:`", "1024px", "Desktop et plus"],
          ["`xl:`", "1280px", "Grand desktop"],
          ["`2xl:`", "1536px", "Très grand écran"],
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Une grille qui s'adapte",
        code: `<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">\n  <!-- 1 colonne sur mobile, 2 dès md, 3 dès lg -->\n</div>`,
      },
      {
        kind: "text",
        text: "Mobile-first signifie : la classe sans préfixe s'applique toujours, et chaque préfixe ne fait que surcharger à partir de son breakpoint. `grid-cols-1 md:grid-cols-2` se lit donc « une colonne par défaut, deux à partir de 768px ». On n'écrit jamais de media query à la main.",
      },
    ],
  },
  {
    id: "etats-et-variantes",
    title: "États et variantes",
    level: 2,
    intro:
      "Les variantes préfixent un utilitaire pour l'appliquer conditionnellement : survol, focus, état désactivé.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Variantes d'état courantes",
        code: `<button class="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed">\n  Envoyer\n</button>`,
      },
      {
        kind: "list",
        items: [
          "`hover:` — au survol de la souris : le retour visuel de base de tout élément cliquable.",
          "`focus:` et `focus-visible:` — au focus clavier : indispensable pour l'accessibilité, ne jamais le supprimer sans remplacement.",
          "`active:` — pendant le clic : un léger assombrissement donne du feedback.",
          "`disabled:` — quand l'élément est désactivé : opacité réduite et curseur adapté.",
          "`first:`, `last:`, `odd:`, `even:` — selon la position dans le parent : utile pour les listes.",
          "Les variantes se combinent : `md:hover:bg-blue-700` applique le survol seulement à partir du breakpoint `md`.",
        ],
      },
    ],
  },
  {
    id: "dark-mode",
    title: "Mode sombre",
    level: 2,
    intro:
      "La variante `dark:` applique un style quand le thème sombre est actif : un dark mode propre sans CSS supplémentaire.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Composant compatible clair/sombre",
        code: `<div class="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">\n  <p class="text-neutral-600 dark:text-neutral-300">Texte secondaire</p>\n</div>`,
      },
      {
        kind: "text",
        text: "Par défaut en v4, `dark:` suit la préférence système (`prefers-color-scheme`). Pour un basculeur manuel basé sur une classe `.dark`, on déclare `@custom-variant dark (&:where(.dark, .dark *));` dans le CSS. Règle d'or : chaque couleur de fond claire doit avoir son pendant `dark:`, sinon le texte devient illisible sur fond sombre.",
      },
      {
        kind: "list",
        items: [
          "Penser les paires : `bg-white dark:bg-neutral-900`, `text-neutral-900 dark:text-white`.",
          "Les couleurs neutres (`neutral`, `zinc`, `stone`) sont faites pour ça : elles restent lisibles dans les deux thèmes.",
          "Tester les deux thèmes systématiquement : un oubli de `dark:` se voit immédiatement.",
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "Les habitudes qui rendent Tailwind rapide au quotidien — et l'erreur à ne jamais commettre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Composer dans le markup : lire la balise doit suffire à comprendre l'apparence — c'est le contrat du utility-first.",
          "Extraire des composants (React, Vue…), pas des classes CSS : quand un motif se répète, on crée un composant, pas une feuille de style.",
          "Utiliser l'autocomplétion pour découvrir : taper `flex-` ou `text-` affiche tout le vocabulaire disponible.",
          "Inspecter dans les DevTools : chaque utilitaire y apparaît comme une règle CSS lisible — la meilleure documentation.",
          "Garder l'échelle : préférer les valeurs de l'échelle (`p-4`, `gap-6`) aux valeurs arbitraires, sauf besoin précis.",
        ],
      },
      {
        kind: "text",
        text: "L'erreur fatale : construire des noms de classes par concaténation (`\"text-\" + color`). Le scanner ne voit que des chaînes littérales complètes dans le code source : une classe assemblée dynamiquement ne sera jamais détectée et son CSS ne sera pas généré. Toujours écrire les noms de classes en entier.",
      },
      {
        kind: "code",
        language: "tsx",
        title: "À faire / à éviter",
        code: `// À ÉVITER : classe construite dynamiquement — non détectée\nconst cls = "bg-" + color + "-500";\n\n// À FAIRE : noms complets, même en conditionnel\nconst cls = isPrimary ? "bg-blue-600" : "bg-neutral-600";`,
      },
    ],
  },
  {
    id: "debugging-debutant",
    title: "Debugging : quand le style ne s'applique pas",
    level: 2,
    intro:
      "Les quatre causes qui expliquent 90 % des « ma classe ne marche pas ».",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic en 4 questions",
        fields: [
          {
            label: "La classe est-elle écrite en entier ?",
            value:
              "Concaténation dynamique (`\"p-\" + n`) : le scanner ne la voit pas. Écrire le nom complet littéralement.",
          },
          {
            label: "Le fichier est-il scanné ?",
            value:
              "En v4 la détection est automatique, mais un fichier hors du projet ou ignoré ne sera pas analysé. Vérifier que le fichier fait partie des sources.",
          },
          {
            label: "Une autre règle gagne-t-elle ?",
            value:
              "Dans les DevTools, une déclaration barrée signifie qu'une règle plus spécifique la surcharge. Preflight (le reset Tailwind) ou du CSS custom peuvent interférer.",
          },
          {
            label: "Le dev server a-t-il bien rechargé ?",
            value:
              "Après un changement de configuration, redémarrer `npm run dev`. Le HMR gère les classes, pas toujours la config.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Quatre projets de difficulté croissante pour ancrer les utilitaires, le responsive et le design system.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Carte de profil",
        fields: [
          { label: "Compétences requises", value: "Classes fondamentales, espacement, typographie" },
          { label: "Ce que vous construisez", value: "Une carte de profil : avatar, nom, rôle, bouton — uniquement des utilitaires" },
          { label: "Ce que vous apprenez", value: "Composer des utilitaires, l'échelle d'espacement, les arrondis et ombres" },
          { label: "Difficulté attendue", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "Landing page responsive" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Landing page responsive",
        fields: [
          { label: "Compétences requises", value: "Responsive, variantes d'état, layout flex/grid" },
          { label: "Ce que vous construisez", value: "Une landing page complète : hero, fonctionnalités, témoignages, footer" },
          { label: "Ce que vous apprenez", value: "Mobile-first, grilles adaptatives, hiérarchie typographique" },
          { label: "Difficulté attendue", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Application avec mode sombre" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Application avec mode sombre",
        fields: [
          { label: "Compétences requises", value: "dark:, @theme, composants" },
          { label: "Ce que vous construisez", value: "Une petite application (tableau de bord) avec basculeur clair/sombre persistant" },
          { label: "Ce que vous apprenez", value: "Paires de couleurs, `@custom-variant`, tokens personnalisés via `@theme`" },
          { label: "Difficulté attendue", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "Design system d'équipe" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Design system d'équipe",
        fields: [
          { label: "Compétences requises", value: "Tout le programme : @theme, plugins, documentation" },
          { label: "Ce que vous construisez", value: "Un design system : tokens, composants documentés, plugin interne" },
          { label: "Ce que vous apprenez", value: "Cohérence d'échelle, documentation vivante, contraintes d'usage" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "Contribuer à un projet open source utilisant Tailwind" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "tailwind-v4-css-first",
    title: "Tailwind v4 : la configuration CSS-first",
    level: 3,
    intro:
      "La v4 abandonne le `tailwind.config.js` : tout se configure en CSS. Comprendre ce changement pour ne pas appliquer les réflexes de la v3.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Tailwind v3", "Tailwind v4"],
        rows: [
          ["Point d'entrée", "`@tailwind base; @tailwind components; @tailwind utilities;`", "`@import \"tailwindcss\";`"],
          ["Personnalisation", "`tailwind.config.js` (`theme.extend`)", "CSS : `@theme { --color-...: ...; }`"],
          ["Contenu scanné", "`content: [\"./src/**/*\"]` à déclarer", "Détection automatique"],
          ["Plugins", "`plugins: [require(...)]` dans la config JS", "`@plugin \"...\";` dans le CSS"],
          ["Variante dark (classe)", "`darkMode: \"class\"`", "`@custom-variant dark (...);`"],
        ],
      },
      {
        kind: "text",
        text: "Conséquence : la configuration devient du CSS standard, versionnable et lisible par n'importe quel développeur CSS. Les anciens projets v3 gardent leur `tailwind.config.js` (toujours supporté en mode compatibilité), mais tout nouveau projet doit partir sur l'approche CSS-first.",
      },
    ],
  },
  {
    id: "directive-theme",
    title: "La directive @theme : vos design tokens",
    level: 3,
    intro:
      "Personnaliser la palette, les polices et les espacements en déclarant des variables dans `@theme`.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "src/index.css — thème personnalisé",
        code: `@import "tailwindcss";\n\n@theme {\n  --color-primary-500: #6d5ef0;\n  --color-primary-700: #4a3fc1;\n  --font-display: "Sora", sans-serif;\n  --spacing-card: 1.75rem;\n}`,
      },
      {
        kind: "text",
        text: "Chaque variable `--color-primary-500` génère automatiquement les utilitaires `bg-primary-500`, `text-primary-500`, `border-primary-500`… De même, `--font-display` crée `font-display`. Le nommage suit la convention `--<famille>-<clé>` : c'est elle qui détermine les classes disponibles.",
      },
      {
        kind: "list",
        items: [
          "Couleurs : `--color-<nom>-<nuance>` → `bg-<nom>-<nuance>`, `text-<nom>-<nuance>`.",
          "Polices : `--font-<nom>` → `font-<nom>`.",
          "Breakpoints custom : `--breakpoint-<nom>: 900px` → préfixe `<nom>:` utilisable.",
          "Animations : `--animate-<nom>` + `@keyframes` dans `@theme` → `animate-<nom>`.",
        ],
      },
    ],
  },
  {
    id: "preflight",
    title: "Preflight : le reset intégré",
    level: 3,
    intro:
      "Tailwind injecte un reset CSS moderne (Preflight). Savoir ce qu'il fait évite les surprises.",
    blocks: [
      {
        kind: "list",
        items: [
          "Marges supprimées : les titres, paragraphes et listes n'ont plus de marges par défaut — c'est voulu, l'espacement se fait avec les utilitaires.",
          "Titres non stylés : `h1`–`h6` ont la même taille que le texte courant tant qu'on ne leur applique pas `text-xl`, `font-bold`…",
          "Images et médias en `display: block` avec `max-width: 100%` : comportement sain par défaut.",
          "Bordures : `border-width: 0` et couleur par défaut, d'où la nécessité d'écrire `border` pour voir une bordure.",
          "Boutons et inputs : styles natifs neutralisés — prévoir systématiquement leur style.",
          "Désactivation : `@import \"tailwindcss\"` accepte des options, mais en pratique on garde Preflight et on s'y habitue plutôt que de lutter contre.",
        ],
      },
      {
        kind: "text",
        text: "La plupart des « Tailwind a cassé mon style » viennent de Preflight : un titre qui semble trop petit ou un bouton sans bordure sont des comportements normaux du reset, pas des bugs. La solution est toujours d'ajouter les utilitaires explicites.",
      },
    ],
  },
  {
    id: "moteur-jit",
    title: "Le moteur JIT",
    level: 3,
    intro:
      "Comprendre comment Tailwind génère le CSS à la volée : la clé de sa rapidité et de sa petite taille.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle du JIT",
        lines: [
          "Fichiers source (HTML, JSX, Vue…)",
          "     │  scan des chaînes littérales",
          "     ▼",
          "Candidats (ex. \"md:hover:bg-blue-700\")",
          "     │  découpage : variantes + utilitaire",
          "     ▼",
          "Génération CSS à la demande",
          "     │  media queries, pseudo-classes assemblées",
          "     ▼",
          "CSS final = uniquement les classes utilisées",
        ],
      },
      {
        kind: "text",
        text: "Depuis la v3 (et a fortiori la v4), le JIT est le seul mode : il n'y a plus de « purge » séparée. Implications : toute valeur arbitraire (`w-[37px]`) fonctionne sans configuration, et le temps de génération reste constant quelle que soit la taille du projet — seules les classes utilisées coûtent quelque chose.",
      },
    ],
  },
  {
    id: "valeurs-arbitraires",
    title: "Valeurs arbitraires",
    level: 3,
    intro:
      "Quand l'échelle ne suffit pas : injecter n'importe quelle valeur CSS entre crochets.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Exemples de valeurs arbitraires",
        code: `<div class="w-[calc(100%-2rem)] text-[#1a2b3c] grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">\n  <!-- largeur calculée, couleur hexadécimale, grille custom -->\n</div>`,
      },
      {
        kind: "list",
        items: [
          "Syntaxe : `propriété-[valeur]` — les espaces dans la valeur sont remplacés par des underscores (`grid-cols-[repeat(2,_1fr)]`).",
          "Cas légitimes : une maquette impose `37px` précis, une couleur de marque hors palette, une grille non standard.",
          "Abus : si les valeurs arbitraires se multiplient, c'est le signe qu'il manque un token dans `@theme` — mieux vaut l'ajouter proprement.",
          "Les valeurs arbitraires sont aussi scannées comme des classes ordinaires : elles doivent être écrites en entier dans le code.",
        ],
      },
    ],
  },
  {
    id: "variantes-avancees",
    title: "Variantes avancées : group, peer, has, aria, data",
    level: 3,
    intro:
      "Styler un élément en fonction de l'état d'un autre élément ou d'attributs : le niveau au-dessus de `hover:`.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "group- et peer- : styler selon le parent ou le voisin",
        code: `<div class="group relative">\n  <img class="group-hover:opacity-75" src="photo.jpg" alt="" />\n  <span class="invisible group-hover:visible">Légende au survol du parent</span>\n</div>\n\n<label>\n  <input type="checkbox" class="peer sr-only" />\n  <span class="peer-checked:bg-blue-600">Interrupteur custom</span>\n</label>`,
      },
      {
        kind: "list",
        items: [
          "`group-*` : réagit à l'état du parent marqué `group` — le motif standard pour les cartes survolées.",
          "`peer-*` : réagit à l'état du frère précédent marqué `peer` — la base des checkboxes et radios custom.",
          "`has-*` : `has-[:checked]:bg-blue-600` style le parent selon ses enfants — puissant, à utiliser avec mesure.",
          "`aria-*` : `aria-[expanded=true]:rotate-180` — styler selon les attributs ARIA, excellent pour l'accessibilité.",
          "`data-*` : `data-[state=open]:block` — styler selon des attributs de données posés par le JS.",
        ],
      },
    ],
  },
  {
    id: "pseudo-elements",
    title: "Pseudo-éléments : before, after, placeholder",
    level: 3,
    intro:
      "Générer du contenu décoratif sans markup supplémentaire grâce aux variantes de pseudo-éléments.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Décoration avec before:",
        code: `<h2 class="relative pl-4 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-blue-600 before:content-['']">\n  Titre avec barre latérale\n</h2>\n\n<input class="placeholder:text-neutral-400 placeholder:italic" placeholder="Rechercher…" />`,
      },
      {
        kind: "text",
        text: "`before:content-['']` est obligatoire : sans `content`, le pseudo-élément n'est pas généré. `placeholder:` cible le texte d'aide des inputs, `selection:` la couleur de sélection du texte, `file:` et `marker:` existent aussi pour des cas spécifiques.",
      },
    ],
  },
  {
    id: "layout-flex",
    title: "Layout : Flexbox en utilitaires",
    level: 3,
    intro:
      "Tout le vocabulaire flexbox, sans écrire une ligne de CSS : le layout quotidien de 90 % des interfaces.",
    blocks: [
      {
        kind: "table",
        headers: ["Besoin", "Classes", "CSS équivalent"],
        rows: [
          ["Ligne / colonne", "`flex flex-row`, `flex-col`", "`display: flex; flex-direction`"],
          ["Centrer les deux axes", "`flex items-center justify-center`", "`align-items: center; justify-content: center`"],
          ["Espacer les extrémités", "`flex justify-between`", "`justify-content: space-between`"],
          ["Écart entre enfants", "`flex gap-4`", "`gap: 1rem`"],
          ["Retour à la ligne", "`flex flex-wrap`", "`flex-wrap: wrap`"],
          ["Enfant qui grandit", "`flex-1`", "`flex: 1 1 0%`"],
          ["Enfant de taille fixe", "`shrink-0`", "`flex-shrink: 0`"],
        ],
      },
      {
        kind: "text",
        text: "Le trio `flex items-center justify-between` structure à lui seul la majorité des barres de navigation et en-têtes. Retenir aussi `shrink-0` : sans lui, un élément flex peut être écrasé par ses voisins — cause fréquente d'icônes déformées.",
      },
    ],
  },
  {
    id: "layout-grid",
    title: "Layout : Grid en utilitaires",
    level: 3,
    intro:
      "Les grilles bidimensionnelles : `grid-cols-*`, placement et zones, pour les layouts structurés.",
    blocks: [
      {
        kind: "table",
        headers: ["Besoin", "Classes", "CSS équivalent"],
        rows: [
          ["Grille N colonnes", "`grid grid-cols-3 gap-6`", "`display: grid; grid-template-columns: repeat(3, 1fr)`"],
          ["Élément sur 2 colonnes", "`col-span-2`", "`grid-column: span 2`"],
          ["Ligne de taille auto", "`auto-rows-fr`, `auto-rows-min`", "`grid-auto-rows`"],
          ["Alignement du contenu", "`place-items-center`", "`place-items: center`"],
          ["Grille fluide", "`grid-cols-[repeat(auto-fill,minmax(240px,1fr))]`", "Colonnes auto selon la largeur"],
        ],
      },
      {
        kind: "text",
        text: "Règle de choix : flexbox pour aligner des éléments sur un axe (une rangée de boutons), grid pour des layouts à deux dimensions (galeries, tableaux de bord). La grille fluide en valeur arbitraire est le motif standard des grilles de cartes responsives sans breakpoints.",
      },
    ],
  },
  {
    id: "espacement",
    title: "Espacement : space, divide, gap",
    level: 3,
    intro:
      "Trois façons de gérer l'espace entre enfants, avec leurs cas d'usage respectifs.",
    blocks: [
      {
        kind: "list",
        items: [
          "`gap-4` : l'écart dans un conteneur `flex` ou `grid` — la méthode moderne, à privilégier toujours.",
          "`space-x-4` / `space-y-4` : marges entre enfants successifs — pratique mais ajoute aussi une marge au premier enfant dans certains cas ; `gap` est presque toujours préférable.",
          "`divide-x` / `divide-y` : séparateurs (bordures) entre enfants — idéal pour les listes et les menus à onglets.",
          "Cohérence : choisir une échelle d'écarts (4, 6, 8) et s'y tenir sur tout le projet plutôt que de varier au jugé.",
        ],
      },
    ],
  },
  {
    id: "typographie",
    title: "Typographie",
    level: 3,
    intro:
      "Tailles, graisses, interlignages et chasses : une hiérarchie lisible avec les utilitaires de texte.",
    blocks: [
      {
        kind: "table",
        headers: ["Rôle", "Classes typiques"],
        rows: [
          ["Titre hero", "`text-4xl md:text-6xl font-extrabold tracking-tight`"],
          ["Titre de section", "`text-2xl font-bold`"],
          ["Corps de texte", "`text-base leading-7 text-neutral-600`"],
          ["Texte secondaire", "`text-sm text-neutral-500`"],
          ["Légende", "`text-xs uppercase tracking-wider`"],
        ],
      },
      {
        kind: "text",
        text: "`leading-*` (interlignage) compte autant que la taille : un `text-base leading-7` respire, un `text-base leading-4` étouffe. `tracking-tight` resserre les grands titres, `tracking-wide` espace les labels en capitales. Définir ces 5 rôles une fois dans des composants évite les 47 tailles de texte différentes.",
      },
    ],
  },
  {
    id: "couleurs",
    title: "Couleurs et opacité",
    level: 3,
    intro:
      "La palette intégrée, le modificateur d'opacité et les couleurs sémantiques.",
    blocks: [
      {
        kind: "list",
        items: [
          "Palette : chaque couleur (`blue`, `emerald`, `rose`, `neutral`…) décline 11 nuances de `50` (très clair) à `950` (très sombre).",
          "Opacité : le slash ajuste l'alpha — `bg-blue-600/80`, `text-white/70` — sans nouvelle couleur.",
          "Couleurs sémantiques : `red`/`emerald`/`amber` pour erreur/succès/alerte ; les neutres (`neutral`, `zinc`) pour le texte et les fonds.",
          "`current` (`text-current`, `border-current`) hérite de la couleur du texte : pratique pour les icônes SVG (`fill-current`).",
          "Contraste : vérifier le ratio texte/fond (les DevTools le signalent) — `text-neutral-400` sur blanc est souvent insuffisant.",
        ],
      },
    ],
  },
  {
    id: "bordures-ombres",
    title: "Bordures, ombres et anneaux",
    level: 3,
    intro:
      "Le relief d'une interface : bordures subtiles, ombres portées et anneaux de focus.",
    blocks: [
      {
        kind: "table",
        headers: ["Effet", "Classes", "Usage"],
        rows: [
          ["Bordure", "`border border-neutral-200`", "Séparer sans lourdeur ; `border` seul = 1px"],
          ["Arrondi", "`rounded-lg`, `rounded-full`", "`lg` pour les cartes, `full` pour les pills et avatars"],
          ["Ombre", "`shadow-sm`, `shadow-lg`", "Élévation : `sm` pour les cartes, `lg` pour les modales"],
          ["Anneau", "`ring-2 ring-blue-500`", "Focus visible et mise en avant, sans déplacer le layout"],
          ["Anneau intérieur", "`ring-inset`", "Anneau à l'intérieur de la bordure"],
        ],
      },
      {
        kind: "text",
        text: "Préférer `ring` à `border` pour les états de focus : l'anneau ne modifie pas les dimensions de l'élément, donc pas de saut de layout au focus. Pour les cartes, la combinaison `border border-neutral-200 shadow-sm rounded-xl` est le standard discret.",
      },
    ],
  },
  {
    id: "transitions-animations",
    title: "Transitions et animations",
    level: 3,
    intro:
      "Des micro-interactions propres avec `transition-*` et les animations intégrées — sans librairie.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Transitions et animations utilitaires",
        code: `<button class="transition-colors duration-200 hover:bg-blue-700">Douceur</button>\n<div class="animate-spin h-5 w-5 rounded-full border-2 border-blue-600 border-t-transparent"></div>\n<div class="animate-pulse h-4 w-32 rounded bg-neutral-200"></div>`,
      },
      {
        kind: "list",
        items: [
          "`transition-colors`, `transition-transform`, `transition-all` + `duration-200` + `ease-out` : la base des survols doux.",
          "`animate-spin` (chargement), `animate-pulse` (squelettes), `animate-bounce` : les trois animations intégrées.",
          "Animation custom : déclarer `@keyframes` dans `@theme` et `--animate-<nom>` pour obtenir `animate-<nom>`.",
          "`motion-safe:` / `motion-reduce:` : respecter la préférence « réduire les animations » de l'utilisateur — une question d'accessibilité.",
        ],
      },
    ],
  },
  {
    id: "formulaires",
    title: "Formulaires",
    level: 3,
    intro:
      "Preflight neutralise les styles natifs : chaque champ doit être stylé explicitement.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Champ de formulaire standard",
        code: `<label class="block text-sm font-medium text-neutral-700 dark:text-neutral-200">\n  Email\n  <input type="email"\n    class="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:bg-neutral-100" />\n</label>\n<p class="mt-1 text-xs text-red-600">Message d'erreur éventuel</p>`,
      },
      {
        kind: "list",
        items: [
          "`accent-*` : colore nativement les cases à cocher et radios (`accent-blue-600`) sans les reconstruire.",
          "États : `focus:` pour l'anneau de focus, `disabled:` pour l'état inactif, `invalid:` pour la validation native.",
          "Le plugin officiel `@tailwindcss/forms` normalise davantage les contrôles si on veut un rendu homogène entre navigateurs.",
        ],
      },
    ],
  },
  {
    id: "accessibilite",
    title: "Accessibilité",
    level: 3,
    intro:
      "Les utilitaires qui rendent une interface utilisable au clavier et aux lecteurs d'écran.",
    blocks: [
      {
        kind: "list",
        items: [
          "`sr-only` : masque visuellement tout en restant lisible par les lecteurs d'écran — le standard pour les labels d'icônes.",
          "`not-sr-only` : l'inverse, pour réafficher conditionnellement.",
          "`focus-visible:` : n'afficher l'anneau de focus qu'au clavier, pas au clic souris.",
          "Contraste : ne pas se contenter de `text-neutral-400` sur fond clair — vérifier le ratio.",
          "`motion-reduce:` : désactiver les animations pour les utilisateurs qui les réduisent.",
          "Ordre du DOM : les utilitaires ne changent pas l'ordre de tabulation — structurer le HTML dans l'ordre logique.",
        ],
      },
    ],
  },
  {
    id: "composants",
    title: "Composants : extraire sans dupliquer",
    level: 3,
    intro:
      "Quand un motif se répète, on extrait un composant — dans le framework, pas dans une feuille CSS.",
    blocks: [
      {
        kind: "text",
        text: "La voie recommandée : créer un composant dans le framework (React, Vue, Svelte) qui encapsule les classes. Les listes de classes longues restent lisibles parce qu'elles sont écrites une seule fois, dans le composant.",
      },
      {
        kind: "code",
        language: "css",
        title: "Alternative CSS : @utility (v4)",
        code: `@utility btn-primary {\n  @apply px-4 py-2 rounded-lg bg-blue-600 text-white font-medium;\n  @apply hover:bg-blue-700 focus:ring-2;\n}`,
      },
      {
        kind: "list",
        items: [
          "`@utility` (v4) définit un utilitaire custom utilisable avec les variantes (`hover:btn-primary` fonctionne).",
          "`@apply` dans `@layer components` reste possible mais fige les styles : à réserver aux cas où le composant framework n'est pas envisageable.",
          "Règle : composant d'abord, `@utility` ensuite, `@apply` en dernier recours.",
        ],
      },
    ],
  },
  {
    id: "plugins-officiels",
    title: "Plugins officiels",
    level: 3,
    intro:
      "Deux plugins maintenus par l'équipe Tailwind pour les cas que les utilitaires seuls couvrent mal.",
    blocks: [
      {
        kind: "command",
        label: "Installer le plugin typography",
        command: "npm install -D @tailwindcss/typography",
        why: "Ajoute la classe `prose` qui style proprement le HTML brut (articles Markdown rendus) : titres, listes, citations, code — sans écrire de CSS.",
        verify: "npm list @tailwindcss/typography",
      },
      {
        kind: "code",
        language: "css",
        title: "Déclarer les plugins en v4",
        code: `@import "tailwindcss";\n@plugin "@tailwindcss/typography";\n@plugin "@tailwindcss/forms";`,
      },
      {
        kind: "list",
        items: [
          "`@tailwindcss/typography` : `prose prose-neutral dark:prose-invert` sur un conteneur d'article — le standard pour les blogs et la documentation.",
          "`@tailwindcss/forms` : normalise l'apparence des inputs, selects et checkboxes entre navigateurs avec un style de base propre.",
          "Les deux s'installent via npm et se déclarent avec `@plugin` : aucune configuration JS.",
        ],
      },
    ],
  },
  {
    id: "css-personnalise",
    title: "Écrire du CSS personnalisé",
    level: 3,
    intro:
      "Tailwind n'interdit pas le CSS : `@layer` permet d'ajouter des styles custom au bon endroit de la cascade.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "CSS custom dans les couches Tailwind",
        code: `@import "tailwindcss";\n\n@layer base {\n  html {\n    scroll-behavior: smooth;\n  }\n  ::selection {\n    background: var(--color-primary-500);\n    color: white;\n  }\n}\n\n@layer components {\n  .card {\n    @apply rounded-xl border border-neutral-200 bg-white p-6 shadow-sm;\n  }\n}`,
      },
      {
        kind: "text",
        text: "`@layer base` reçoit les styles globaux (sélection, scrollbar, `scroll-behavior`), `@layer components` les classes custom réutilisables. Mettre son CSS dans les couches garantit l'ordre de cascade correct face aux utilitaires — du CSS hors couche peut écraser ou être écrasé de façon imprévisible.",
      },
    ],
  },
  {
    id: "integration-frameworks",
    title: "Intégration aux frameworks",
    level: 3,
    intro:
      "Tailwind s'intègre à chaque framework de la même façon : un CSS d'entrée importé une fois.",
    blocks: [
      {
        kind: "list",
        items: [
          "React (Vite) : `@import \"tailwindcss\";` dans `src/index.css`, importé dans `main.tsx` — le plugin `@tailwindcss/vite` fait le reste.",
          "Next.js : proposé par `create-next-app` ; le CSS global contient l'import Tailwind.",
          "Vue / Nuxt : même principe via le plugin Vite ; Nuxt propose un module dédié.",
          "Astuce `class` vs `className` : en React on écrit `className`, mais ce sont bien des classes CSS ordinaires — le HTML généré porte l'attribut `class`.",
          "Bibliothèques de composants (shadcn-style) : elles ne font qu'emballer des utilitaires — comprendre Tailwind, c'est comprendre leur code.",
        ],
      },
    ],
  },
  {
    id: "optimisation-build",
    title: "Optimisation du build",
    level: 3,
    intro:
      "Garder le CSS final minuscule : ce que le JIT fait seul, et ce qu'il faut vérifier.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le JIT ne génère que les classes détectées : un projet complet tient typiquement en quelques dizaines de kilo-octets.",
          "Vérifier : après `npm run build`, inspecter la taille du fichier CSS dans `dist/assets/` — une taille anormale signale souvent des classes générées en masse.",
          "Minification : Vite minifie le CSS en production automatiquement.",
          "Éviter les valeurs arbitraires redondantes : dix `w-[347px]` différents pèsent plus qu'un token `--spacing-*` réutilisé.",
          "`@theme` : ne déclarer que les tokens utilisés — chaque token étend le vocabulaire généré.",
        ],
      },
    ],
  },
  {
    id: "design-system",
    title: "Construire un design system",
    level: 3,
    intro:
      "Passer d'utilitaires épars à un langage visuel cohérent : tokens, rôles typographiques, documentation.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir les tokens",
            detail:
              "Dans `@theme` : couleurs de marque (`--color-brand-*`), polices (`--font-display`, `--font-body`), rayons et ombres si besoin. Ce sont les seules valeurs « maison » autorisées.",
          },
          {
            title: "Fixer les rôles typographiques",
            detail:
              "Cinq rôles (hero, titre, corps, secondaire, légende) traduits en combinaisons de classes, encapsulés dans des composants.",
          },
          {
            title: "Normaliser les espacements",
            detail:
              "Une échelle d'écarts (4/6/8/12) appliquée partout : deux éléments de même importance ont le même espacement.",
          },
          {
            title: "Documenter les composants",
            detail:
              "Chaque composant (bouton, carte, champ) avec ses variantes et ses règles d'usage : quand l'utiliser, quand ne pas l'utiliser.",
          },
          {
            title: "Contraindre",
            detail:
              "Un design system vit par ses interdictions : pas de couleur hors palette, pas de valeur arbitraire sans justification. La revue de code les fait respecter.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand les bases ne suffisent pas : lire le CSS généré et comprendre la cascade.",
    blocks: [
      {
        kind: "list",
        items: [
          "DevTools → onglet Styles : chaque utilitaire affiche sa règle et son fichier d'origine ; une règle barrée est surchargée par une règle plus spécifique.",
          "L'ordre des classes dans `class` ne change rien : c'est l'ordre dans le CSS généré qui compte — d'où l'importance des couches (`@layer`).",
          "Conflit utilitaire vs utilitaire : `p-4 p-8` sur le même élément — le gagnant dépend de l'ordre interne de Tailwind, comportement à ne jamais exploiter volontairement.",
          "Isoler : reproduire le cas dans un fichier minimal pour distinguer un problème Tailwind d'un problème de CSS custom ou du framework.",
          "Cache : après une mise à jour de Tailwind ou du plugin Vite, supprimer `node_modules/.vite` si le CSS semble figé.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques, avec leur cause et leur correction.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Classes construites dynamiquement",
            value:
              "Cause : `\"text-\" + size` — le scanner ne voit pas la classe. Correction : écrire les noms complets, même dans les ternaires.",
          },
          {
            label: "`hover:` sans état de base",
            value:
              "Cause : on ne définit que le survol, l'état normal hérite d'un style inattendu. Correction : toujours définir l'état de base d'abord.",
          },
          {
            label: "Oubli du `dark:`",
            value:
              "Cause : fond sombre sans texte adapté. Correction : penser systématiquement en paires clair/sombre.",
          },
          {
            label: "Conflit de spécificité",
            value:
              "Cause : du CSS custom hors `@layer` écrase les utilitaires. Correction : placer le CSS custom dans `@layer base` / `@layer components`.",
          },
          {
            label: "Préfixes dans le désordre mental",
            value:
              "Cause : `md:` puis `lg:` qui ne surcharge pas comme prévu. Correction : relire mobile-first — chaque préfixe surcharge les précédents à partir de son breakpoint.",
          },
          {
            label: "Trop de valeurs arbitraires",
            value:
              "Cause : `w-[347px]` partout au lieu de tokens. Correction : ajouter le token dans `@theme` quand une valeur se répète.",
          },
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    level: 3,
    intro:
      "Tailwind est léger par construction ; les rares problèmes viennent des usages, pas du framework.",
    blocks: [
      {
        kind: "list",
        items: [
          "CSS final : grâce au JIT, la taille dépend du nombre de classes distinctes utilisées — pas de la taille du projet.",
          "Éviter la génération explosive : des centaines de valeurs arbitraires uniques (`top-[123px]`, `top-[124px]`…) gonflent le CSS — signe d'un design non systématisé.",
          "Runtime : Tailwind ne shippe aucun JavaScript — zéro coût d'exécution, contrairement aux solutions CSS-in-JS.",
          "Dev server : le scan est incrémental ; un projet avec des milliers de fichiers reste fluide.",
          "Mesurer : la taille du CSS dans `dist/` après build est l'indicateur à surveiller, pas une intuition.",
        ],
      },
    ],
  },
  {
    id: "migration-v3-v4",
    title: "Migration v3 → v4",
    level: 3,
    intro:
      "Les points de vigilance pour migrer un projet existant vers la configuration CSS-first.",
    blocks: [
      {
        kind: "list",
        items: [
          "`tailwind.config.js` : son contenu (`theme.extend`, `plugins`) doit être traduit en `@theme`, `@plugin` et CSS — il n'y a pas de conversion automatique fiable pour les configs complexes.",
          "Directives `@tailwind` : remplacées par `@import \"tailwindcss\";`.",
          "`content` : à supprimer, la détection est automatique — vérifier qu'aucun fichier n'est oublié après suppression.",
          "Classes renommées : quelques utilitaires ont changé entre v3 et v4 (ex. ombres, arrondis) — la documentation officielle liste les changements cassants.",
          "Stratégie : migrer sur une branche, comparer visuellement les pages clés, valider le build de production avant de fusionner.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "La checklist d'un usage professionnel de Tailwind, à relire avant chaque revue de code.",
    blocks: [
      {
        kind: "list",
        items: [
          "Noms de classes toujours écrits en entier, jamais concaténés.",
          "État de base défini avant les variantes (`hover:`, `dark:`).",
          "Paires clair/sombre systématiques sur les couleurs de fond et de texte.",
          "Échelle respectée : tokens et valeurs de l'échelle plutôt que valeurs arbitraires dispersées.",
          "Composants extraits dans le framework dès qu'un motif se répète trois fois.",
          "CSS custom placé dans `@layer`, jamais en vrac.",
          "`focus-visible` préservé sur tous les éléments interactifs.",
          "Build de production vérifié : taille du CSS et rendu des pages clés.",
        ],
      },
    ],
  },
  {
    id: "qa-visuelle",
    title: "QA visuelle",
    level: 3,
    intro:
      "Tester une interface Tailwind : ce que les tests automatisés ne voient pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "Revue par breakpoint : chaque page clé vérifiée à 390px, 768px, 1280px — les oublis de préfixes s'y révèlent.",
          "Les deux thèmes : basculer clair/sombre sur chaque écran et traquer les `dark:` manquants.",
          "États interactifs : survol, focus clavier, désactivé — tabuler à travers les formulaires.",
          "Zoom 200 % : le layout doit tenir — un test d'accessibilité simple et révélateur.",
          "Contenu réel : tester avec des textes longs et des données vides, pas seulement la maquette idéale.",
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
          { label: "Documentation", value: "tailwindcss.com/docs : la référence complète, avec recherche par classe — le réflexe quotidien." },
          { label: "Guide v4", value: "Le guide de la v4 : configuration CSS-first, `@theme`, `@plugin`, `@utility`." },
          { label: "Dépôt", value: "Le dépôt GitHub tailwindlabs/tailwindcss : code source, issues, discussions." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : reconstruire des interfaces existantes en utilitaires — le meilleur exercice.",
          "Communauté : les exemples de composants (type shadcn) pour voir des usages réels et propres.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Tailwind maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir le CSS sous-jacent : animations, Grid avancé, propriétés custom.",
          "Travailler le responsive systématique et l'accessibilité des interfaces.",
          "Apprendre un framework : React ou Vue pour componentiser les interfaces.",
          "Découvrir les tests d'interface : tests composants et tests end-to-end.",
          "Revenir à la roadmap : valider Tailwind et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

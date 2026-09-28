import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'architecture frontend : organiser le code
 * quand projets et équipes grandissent. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 * Approche conceptuelle et architecturale : méthodologies nommées
 * telles que documentées dans le guide du parcours.
 */
export const LEARNING_FRONTEND_ARCHI: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que l'architecture frontend organise — et quand elle devient nécessaire.",
    blocks: [
      {
        kind: "text",
        text: "L'architecture frontend organise le code d'interface quand projets et équipes grandissent : comment découper les dossiers, partager les composants, nommer les choses, documenter les décisions. Sur un petit projet solo, c'est de l'overhead ; à dix développeurs ou 500 composants, c'est ce qui sépare un projet maintenable d'un chantier.",
      },
      {
        kind: "text",
        text: "Les outils du métier : monorepos (un dépôt pour apps et librairies partagées), design systems (composants et tokens documentés), découpage par fonctionnalités (plutôt que par type de fichier), conventions écrites et documentation des décisions (ADRs). Aucun n'est magique ; ensemble, ils rendent le code lisible par d'autres que son auteur.",
      },
      {
        kind: "list",
        items: [
          "Échelle : l'architecture répond à la taille — équipe, codebase, durée de vie.",
          "Lisibilité : un nouveau développeur doit comprendre où aller sans guide.",
          "Cohérence : les mêmes problèmes se résolvent de la même façon partout.",
          "Évolution : changer sans tout casser, extraire sans tout réécrire.",
        ],
      },
    ],
  },
  {
    id: "pourquoi-architecturer",
    title: "Du chaos à la structure",
    level: 1,
    intro:
      "La trajectoire classique d'un projet qui grandit sans architecture.",
    blocks: [
      {
        kind: "diagram",
        title: "Les six phases",
        lines: [
          "CROISSANCE — le projet marche, on ajoute des écrans, vite",
          "    │",
          "    ▼",
          "DOULEUR — personne ne sait où mettre le nouveau code,",
          "          les mêmes composants existent en 3 versions",
          "    │",
          "    ▼",
          "DÉCOUPAGE — on range par fonctionnalité, on extrait le partagé",
          "    │",
          "    ▼",
          "CONVENTIONS — nommage, imports, structure : écrits, pas devinés",
          "    │",
          "    ▼",
          "PARTAGE — design system, librairies internes, monorepo",
          "    │",
          "    ▼",
          "GOUVERNANCE — revues, ADRs, qui décide de quoi",
        ],
      },
      {
        kind: "text",
        text: "L'erreur symétrique : appliquer la phase 6 à un projet de phase 1. L'architecture se dose : juste assez de structure pour la taille actuelle, avec des portes de sortie pour la taille suivante.",
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
      "On n'architecte bien que ce qu'on sait déjà construire.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations nécessaires",
        fields: [
          {
            label: "JavaScript / TypeScript",
            value:
              "Modules, fonctions, objets : le matériau de base. L'architecture organise du code — il faut d'abord savoir en écrire.",
          },
          {
            label: "Un framework à composants",
            value:
              "React, Vue, Angular… : composants, props, état. Les patterns d'architecture s'appliquent à ces briques.",
          },
          {
            label: "Git",
            value:
              "Branches, revues, historique : l'architecture se discute et se versionne comme le code.",
          },
          {
            label: "Avoir souffert",
            value:
              "Idéalement : avoir maintenu un projet devenu confus. L'architecture répond à des douleurs vécues, pas à des théories.",
          },
        ],
      },
    ],
  },
  {
    id: "signaux-alarme",
    title: "Signaux d'alarme",
    level: 2,
    intro:
      "Comment savoir qu'il est temps d'architecturer : les symptômes.",
    blocks: [
      {
        kind: "fields",
        title: "Les symptômes",
        fields: [
          { label: "Peur de toucher", value: "Modifier un composant casse un écran lointain : les dépendances sont invisibles." },
          { label: "Duplication", value: "Le même bouton, le même appel API, existent en plusieurs versions légèrement différentes." },
          { label: "Onboarding de semaines", value: "Un nouveau développeur met un mois à être productif : rien n'est à sa place évidente." },
          { label: "Débats permanents", value: "« Où je mets ce fichier ? » à chaque PR : aucune convention écrite." },
          { label: "Build qui enfle", value: "Tout est recompilé, retesté, redéployé ensemble : aucune frontière." },
        ],
      },
      {
        kind: "text",
        text: "Un ou deux symptômes : ranger au fil de l'eau. Quatre ou cinq : c'est un chantier d'architecture à planifier — en commençant par figer les nouvelles dettes avant de rembourser les anciennes.",
      },
    ],
  },
  {
    id: "decoupage-fonctionnalites",
    title: "Découper par fonctionnalité",
    level: 2,
    intro:
      "Le premier geste architectural : ranger par métier, pas par type.",
    blocks: [
      {
        kind: "diagram",
        title: "Par type (à éviter) vs par fonctionnalité (à préférer)",
        lines: [
          "PAR TYPE : tout est mélangé par nature      PAR FONCTIONNALITÉ : tout est",
          "src/                                       regroupé par métier",
          "├── components/  (200 fichiers)            src/features/",
          "├── hooks/       (80 fichiers)             ├── auth/",
          "├── utils/       (60 fichiers)             │   ├── LoginForm.tsx",
          "└── pages/       (40 fichiers)             │   ├── useAuth.ts",
          "                                              │   └── api.ts",
          "→ Pour toucher au login : 4 dossiers.      ├── checkout/",
          "                                           │   ├── Cart.tsx",
          "                                           │   ├── useCart.ts",
          "                                           │   └── api.ts",
          "                                           └── shared/  (le vraiment partagé)",
          "                                           → Pour toucher au login : 1 dossier.",
        ],
      },
      {
        kind: "text",
        text: "Le principe : ce qui change ensemble vit ensemble. Un dossier par fonctionnalité contient ses composants, sa logique et ses appels — le code partagé par plusieurs fonctionnalités descend dans `shared/`, qui est volontairement difficile à agrandir.",
      },
    ],
  },
  {
    id: "feature-sliced-apercu",
    title: "Feature-Sliced Design : l'aperçu",
    level: 2,
    intro:
      "La méthodologie de découpage la plus structurée : des couches, des règles.",
    blocks: [
      {
        kind: "diagram",
        title: "Les couches, du haut vers le bas",
        lines: [
          "app/         (configuration : providers, styles globaux, routing)",
          "  │ peut importer ↓",
          "pages/       (les écrans : assemblent des features)",
          "  │ peut importer ↓",
          "features/    (les actions métier : LoginForm, AddToCart)",
          "  │ peut importer ↓",
          "entities/    (les objets métier : User, Product, Order)",
          "  │ peut importer ↓",
          "shared/      (l'agnostique : UI kit, utils, api client)",
          "",
          "RÈGLE D'OR : on n'importe que vers le bas.",
          "Une entity n'importe jamais une feature ; shared n'importe rien.",
        ],
      },
      {
        kind: "text",
        text: "La force de la méthode est sa règle d'import unidirectionnelle : elle rend les dépendances visibles et les cycles impossibles. Chaque couche a aussi ses segments internes (`ui/`, `model/`, `api/`) — le détail est au niveau 3.",
      },
    ],
  },
  {
    id: "design-system-apercu",
    title: "Design system : l'aperçu",
    level: 2,
    intro:
      "La source unique de vérité visuelle : composants, tokens, documentation.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois piliers",
        fields: [
          { label: "Tokens", value: "Les décisions atomiques : couleurs, espacements, typographies, rayons — nommées (`color.primary.500`) et partagées." },
          { label: "Composants", value: "Boutons, champs, modales… : une seule implémentation par besoin, avec ses variantes documentées." },
          { label: "Documentation", value: "Quand utiliser quoi, avec quels états : sans doc, le système n'est qu'une librairie que personne n'ose utiliser." },
        ],
      },
      {
        kind: "text",
        text: "Un design system ne commence pas par 50 composants : il commence par les tokens et les 5 composants les plus dupliqués (bouton, champ, carte, modale, badge). Le reste s'extrait au fil des besoins réels.",
      },
    ],
  },
  {
    id: "tokens-apercu",
    title: "Design tokens en pratique",
    level: 2,
    intro:
      "Le mécanisme concret : des variables, pas des valeurs en dur.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Tokens en variables CSS",
        code: `:root {\n  --color-primary-500: #1a73e8;\n  --color-primary-600: #1558b0;\n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --radius-md: 8px;\n  --font-body: "Inter", system-ui, sans-serif;\n}\n\n.button-primary {\n  background: var(--color-primary-500);\n  padding: var(--space-2) var(--space-4);\n  border-radius: var(--radius-md);\n  font-family: var(--font-body);\n}`,
      },
      {
        kind: "text",
        text: "Changer le primaire de toute l'application = changer une ligne. Le mode sombre = redéfinir les tokens sous un sélecteur. Les valeurs en dur (`#1a73e8` copié 40 fois) sont l'exact inverse : chaque changement est une chasse au trésor.",
      },
    ],
  },
  {
    id: "conventions-apercu",
    title: "Conventions : l'aperçu",
    level: 2,
    intro:
      "Les règles écrites qui évitent les débats permanents.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'on écrit",
        fields: [
          { label: "Nommage", value: "Composants en PascalCase, hooks en `use*`, fichiers qui reflètent ce qu'ils exportent : `UserCard.tsx` exporte `UserCard`." },
          { label: "Structure", value: "Où va quoi : features, shared, pages — avec les exceptions documentées." },
          { label: "Imports", value: "Ordre (externes, internes, relatifs), alias (`@/features/...`) plutôt que `../../../../`." },
          { label: "État", value: "Local par défaut, global pour le partagé : la règle qui évite les stores fourre-tout." },
        ],
      },
      {
        kind: "text",
        text: "Une convention non écrite n'existe pas : elle vit dans la tête des anciens et meurt à leur départ. Un fichier `CONVENTIONS.md` court, relu en revue, vaut mieux que dix règles orales.",
      },
    ],
  },
  {
    id: "adr-apercu",
    title: "ADR : documenter les décisions",
    level: 2,
    intro:
      "Pourquoi ce choix ? La réponse doit survivre à son auteur.",
    blocks: [
      {
        kind: "code",
        language: "markdown",
        title: "Template d'ADR (Architecture Decision Record)",
        code: `# ADR-004 : Découpage par fonctionnalités (Feature-Sliced)\n\n## Statut\nAcceptée (2026-09-15)\n\n## Contexte\n120 composants dans 4 dossiers par type ; onboarding de 3 semaines.\n\n## Décision\nAdopter le découpage par fonctionnalités avec couches app/pages/features/entities/shared.\n\n## Conséquences\n+ Dépendances visibles, onboarding guidé par les dossiers.\n- Migration progressive : 2 sprints de cohabitation.\n- Formation express de l'équipe aux règles d'import.`,
      },
      {
        kind: "text",
        text: "Une ADR tient en une page : contexte, décision, conséquences — y compris négatives. Dans six mois, quand quelqu'un demandera « pourquoi on fait comme ça ? », la réponse sera écrite au lieu d'être devinée.",
      },
    ],
  },
  {
    id: "monorepo-apercu",
    title: "Monorepo : l'aperçu",
    level: 2,
    intro:
      "Un dépôt pour les apps et les librairies partagées.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure d'un monorepo",
        lines: [
          "monorepo/",
          "├── apps/",
          "│   ├── web/          (l'application principale)",
          "│   └── admin/        (le back-office)",
          "├── packages/",
          "│   ├── ui/           (le design system)",
          "│   ├── config/       (tsconfig, eslint partagés)",
          "│   └── utils/        (fonctions partagées)",
          "├── package.json      (workspaces : apps/*, packages/*)",
          "└── turbo.json        (le pipeline : build, test, lint)",
        ],
      },
      {
        kind: "fields",
        title: "Pourquoi / pourquoi pas",
        fields: [
          { label: "Pour", value: "Une seule version de chaque librairie partagée ; refactors transverses en un commit ; CI unique ; pas de « quelle version de ui utilise admin ? »." },
          { label: "Contre", value: "Outillage (workspaces, pipeline) à maîtriser ; builds à optimiser (cache) ; gouvernance des packages partagés." },
          { label: "Quand", value: "Dès qu'on a 2+ apps qui partagent du code — avant, un simple dossier `shared/` suffit." },
        ],
      },
    ],
  },
  {
    id: "tests-strategie-apercu",
    title: "Stratégie de tests : l'aperçu",
    level: 2,
    intro:
      "Tester à chaque niveau ce qui lui appartient.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois niveaux",
        fields: [
          { label: "Unitaires", value: "Fonctions pures, hooks isolés, utils : rapides, nombreux. La logique métier se teste ici, pas dans le navigateur." },
          { label: "Composants", value: "Un composant rendu avec ses props : il affiche quoi ? Il réagit comment au clic ? (Testing Library : tester le comportement, pas l'implémentation)." },
          { label: "End-to-end", value: "Parcours critiques dans un vrai navigateur (login, tunnel d'achat) : peu nombreux, à forte valeur." },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Trois chantiers qui appliquent l'architecture sur du réel.",
    blocks: [
      {
        kind: "fields",
        title: "Intermédiaire — Migration vers feature-sliced",
        fields: [
          { label: "Objectif", value: "Prendre une app « par type » et la redécouper par fonctionnalités, couche par couche." },
          { label: "Compétences", value: "Audit, règles d'import, migration progressive sans tout casser." },
          { label: "Difficulté", value: "Moyenne — deux semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Design system documenté",
        fields: [
          { label: "Objectif", value: "Tokens, 8-10 composants, documentation d'usage, versionné comme un package." },
          { label: "Compétences", value: "API de composants, tokens, documentation, semver." },
          { label: "Difficulté", value: "Élevée — un mois" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Monorepo avec pipeline",
        fields: [
          { label: "Objectif", value: "Deux apps + packages partagés, workspaces, pipeline build/test avec cache." },
          { label: "Compétences", value: "Workspaces npm, Turborepo (pipeline, cache), versioning des packages." },
          { label: "Difficulté", value: "Élevée — un mois" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "principes-conception",
    title: "Principes de conception",
    level: 3,
    intro: "Les idées qui sous-tendent toutes les méthodologies.",
    blocks: [
      {
        kind: "fields",
        title: "Les principes",
        fields: [
          { label: "Séparation des préoccupations", value: "Chaque module a un métier : l'affichage n'appelle pas le réseau, la donnée ne connaît pas le DOM." },
          { label: "Responsabilité unique (SRP)", value: "Un module, une raison de changer : un composant qui affiche ET charge ET transforme changera pour trois raisons." },
          { label: "DRY (avec modération)", value: "Ne pas répéter — mais une duplication de 3 lignes entre deux features vaut mieux qu'une abstraction prématurée qui les couple." },
          { label: "KISS / YAGNI", value: "Simple d'abord ; ne pas construire ce dont on n'a pas besoin. L'architecture anticipe les portes, pas les pièces." },
          { label: "Inversion de dépendance", value: "Les modules métier dépendent d'abstractions, pas de détails : la feature dépend d'une interface `api`, pas du client HTTP concret." },
        ],
      },
    ],
  },
  {
    id: "fsd-couches-detail",
    title: "Feature-Sliced : les couches en détail",
    level: 3,
    intro: "Chaque couche a un contenu précis et des segments internes.",
    blocks: [
      {
        kind: "fields",
        title: "Les cinq couches",
        fields: [
          { label: "app/", value: "La composition : providers (store, thème, router), styles globaux, configuration. Elle assemble, elle ne contient pas de métier." },
          { label: "pages/", value: "Les écrans routés : `HomePage`, `CheckoutPage`. Minces — elles composent des features et des entities." },
          { label: "features/", value: "Les actions utilisateur à valeur métier : `AuthByUsername`, `AddToCart`, `PostComment`. C'est ici que vit l'interactivité métier." },
          { label: "entities/", value: "Les objets métier : `User` (carte, avatar), `Product` (prix, fiche). Réutilisables, sans actions transverses." },
          { label: "shared/", value: "L'agnostique métier : UI kit, utilitaires, client API, constantes. Le socle que tout le monde importe." },
        ],
      },
      {
        kind: "fields",
        title: "Segments internes (dans chaque slice)",
        fields: [
          { label: "ui/", value: "Les composants visuels du slice." },
          { label: "model/", value: "L'état et la logique : stores, hooks, sélecteurs." },
          { label: "api/", value: "Les appels réseau du slice." },
          { label: "lib/ / config/", value: "Utilitaires et constantes spécifiques au slice." },
        ],
      },
    ],
  },
  {
    id: "fsd-regles",
    title: "Feature-Sliced : les règles d'import",
    level: 3,
    intro: "La règle qui fait toute la valeur de la méthode.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un module ne peut importer que des couches inférieures : `pages` → `features` → `entities` → `shared`.",
          "Jamais d'import horizontal entre slices du même niveau (`features/auth` n'importe pas `features/cart`).",
          "Jamais d'import vers le haut (`entities` n'importe pas `features`).",
          "Chaque slice expose une API publique (`index.ts`) : on importe le slice, pas ses fichiers internes.",
          "Ces règles se vérifient automatiquement (lint sur les imports) : une règle non vérifiée est un vœu pieux.",
        ],
      },
      {
        kind: "text",
        text: "Conséquence : les dépendances forment un graphe acyclique lisible. Quand une feature a besoin d'une autre, c'est le signe qu'il manque une entity partagée en dessous — la règle force à découvrir la bonne abstraction.",
      },
    ],
  },
  {
    id: "alternatives-decoupage",
    title: "Alternatives au découpage",
    level: 3,
    intro: "Feature-Sliced n'est pas la seule école : les situer.",
    blocks: [
      {
        kind: "fields",
        title: "Les approches",
        fields: [
          { label: "Par type (classique)", value: "Dossiers `components/`, `hooks/`, `utils/` : simple au début, ingérable au-delà de ~100 fichiers." },
          { label: "Modulaire / DDD léger", value: "Modules métier avec API publique, sans les couches strictes de FSD : plus souple, moins guidé." },
          { label: "Colocation extrême", value: "Tout ce qu'un écran utilise vit à côté de lui : excellent pour les apps à écrans indépendants." },
          { label: "Micro-frontends", value: "Des apps indépendantes assemblées au runtime : pour des équipes autonomes qui déploient séparément (voir section dédiée)." },
        ],
      },
      {
        kind: "text",
        text: "Le critère de choix : la taille de l'équipe et la longévité du projet. Solo/short : par type ou colocation. Équipe/produit durable : découpage par fonctionnalités avec règles explicites.",
      },
    ],
  },
  {
    id: "design-tokens-detail",
    title: "Design tokens : le système complet",
    level: 3,
    intro: "Des variables aux thèmes : l'anatomie d'un système de tokens.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Tokens en JSON (source de vérité)",
        code: `{\n  "color": {\n    "primary": { "500": "#1a73e8", "600": "#1558b0" },\n    "surface": { "default": "#ffffff", "muted": "#f5f5f5" }\n  },\n  "space": { "1": "4px", "2": "8px", "4": "16px" },\n  "radius": { "sm": "4px", "md": "8px", "lg": "16px" }\n}`,
      },
      {
        kind: "fields",
        title: "Les niveaux de tokens",
        fields: [
          { label: "Tokens bruts", value: "Les valeurs : `#1a73e8`, `4px`. Stables, rarement utilisés directement." },
          { label: "Tokens sémantiques", value: "Le sens : `color.background.primary`, `space.card-padding` — ils pointent vers les bruts et changent selon le thème." },
          { label: "Tokens de composants", value: "Le spécifique : `button.primary.background` — dérivés des sémantiques, pour les cas particuliers." },
        ],
      },
      {
        kind: "text",
        text: "Le mode sombre devient une redéfinition des tokens sémantiques, pas une réécriture des composants. Et les tokens se génèrent vers toutes les plateformes (CSS, iOS, Android) depuis la même source JSON.",
      },
    ],
  },
  {
    id: "api-composants",
    title: "Concevoir l'API d'un composant",
    level: 3,
    intro: "Un bon composant se juge à son interface : props, composition, états.",
    blocks: [
      {
        kind: "fields",
        title: "Les règles",
        fields: [
          { label: "Props explicites", value: "`<Button variant=\"primary\" size=\"md\" disabled>` : des props nommées et typées, pas de `style` libre qui casse le système." },
          { label: "Composition", value: "Des enfants plutôt que des props de configuration : `<Card><Card.Header/>…</Card>` compose mieux que 12 props booléennes." },
          { label: "États couverts", value: "Chaque composant gère ses états : défaut, hover, focus, disabled, chargement, erreur — documentés et visibles." },
          { label: "Accessibilité incluse", value: "Rôles, labels, navigation clavier : intégrés au composant, pas ajoutés par chaque consommateur." },
          { label: "Pas de fuite", value: "Le composant n'expose pas ses détails internes : changer son implémentation ne casse pas ses utilisateurs." },
        ],
      },
    ],
  },
  {
    id: "documentation-composants",
    title: "Documenter les composants",
    level: 3,
    intro: "Un composant non documenté est un composant non utilisé.",
    blocks: [
      {
        kind: "text",
        text: "La documentation d'un design system montre chaque composant dans tous ses états, avec ses props et des exemples de code copiables — classiquement via un outil de type Storybook (cité dans le guide du parcours). Chaque exemple répond à « quand utiliser quoi » : Button primaire pour l'action principale, secondaire pour les alternatives, tertiaire pour les actions discrètes.",
      },
      {
        kind: "list",
        items: [
          "Un exemple par variante et par état, exécutable et copiable.",
          "Les règles d'usage : quand utiliser ce composant plutôt qu'un autre.",
          "Les contre-exemples : ce qu'il ne faut pas faire, avec la raison.",
          "La documentation vit avec le code : même dépôt, même revue, même version.",
        ],
      },
    ],
  },
  {
    id: "versioning-packages",
    title: "Versionner les packages partagés",
    level: 3,
    intro: "Le design system et les utilitaires sont des produits avec des utilisateurs.",
    blocks: [
      {
        kind: "fields",
        title: "Semantic versioning appliqué",
        fields: [
          { label: "MAJOR", value: "Changement cassant : prop renommée, composant supprimé. Les consommateurs migrent consciemment." },
          { label: "MINOR", value: "Ajout compatible : nouveau composant, nouvelle prop optionnelle. Mise à jour sans risque." },
          { label: "PATCH", value: "Correctif : bug visuel, ajustement. Mise à jour transparente." },
          { label: "Changelog", value: "Chaque version dit ce qui change et comment migrer : sans lui, personne ne met à jour." },
        ],
      },
      {
        kind: "text",
        text: "Dans un monorepo, les apps consomment les packages via les workspaces : la version est gérée en interne, mais le changelog reste indispensable pour savoir ce qui a changé et pourquoi.",
      },
    ],
  },
  {
    id: "monorepo-detail",
    title: "Monorepo : workspaces et pipeline",
    level: 3,
    intro: "Les deux mécanismes qui font fonctionner un monorepo.",
    blocks: [
      {
        kind: "fields",
        title: "Les mécanismes",
        fields: [
          { label: "Workspaces npm", value: "Le `package.json` racine déclare `workspaces: [\"apps/*\", \"packages/*\"]` : les packages se référencent par nom (`\"@monorepo/ui\": \"workspace:*\"`), installés une fois, liés en local." },
          { label: "Pipeline (Turborepo)", value: "Un `turbo.json` déclare les tâches et leurs dépendances : `build` dépend du `build` des packages utilisés. Le cache évite de reconstruire ce qui n'a pas changé." },
          { label: "Dépendances de tâches", value: "`test` d'une app attend le `build` du package `ui` qu'elle consomme : l'ordre est déduit du graphe, pas écrit à la main." },
          { label: "Affected", value: "Ne tester/builder que ce qui est impacté par les fichiers modifiés : indispensable quand le dépôt grandit." },
        ],
      },
      {
        kind: "command",
        label: "Construire tout ce qui a changé",
        command: "npm run build",
        why: "Dans un monorepo bien configuré, le script `build` racine orchestre le pipeline : chaque package et app est construit dans le bon ordre, avec cache. Une seule commande pour tout vérifier.",
        verify: "npm run test",
      },
    ],
  },
  {
    id: "micro-frontends-detail",
    title: "Micro-frontends en détail",
    level: 3,
    intro: "Quand les équipes doivent déployer indépendamment.",
    blocks: [
      {
        kind: "fields",
        title: "Les approches d'assemblage",
        fields: [
          { label: "Build-time", value: "Les micro-apps sont des packages versionnés assemblés au build : simple, mais déploiement lié." },
          { label: "Runtime", value: "Un conteneur (shell) charge les micro-apps au runtime : déploiement vraiment indépendant, mais contrats d'interface stricts." },
          { label: "Iframe", value: "Isolation maximale, intégration minimale : pour des contenus tiers ou hérités, pas pour une app cohérente." },
        ],
      },
      {
        kind: "text",
        text: "Le coût : duplication des dépendances, cohérence visuelle à maintenir via le design system, routage et état partagé à concevoir. À réserver aux organisations où l'autonomie des équipes vaut ce prix — la plupart des équipes n'en ont pas besoin.",
      },
    ],
  },
  {
    id: "etat-architecture",
    title: "Placer l'état dans l'architecture",
    level: 3,
    intro: "Où vit chaque donnée : la carte complète.",
    blocks: [
      {
        kind: "diagram",
        title: "La carte de l'état",
        lines: [
          "État SERVEUR (API)          → cache dédié, par ressource",
          "  notes, utilisateur,        (chargement / erreur / rafraîchissement",
          "  produits                   gérés par la couche de fetch)",
          "",
          "État GLOBAL client          → store minimal : utilisateur connecté,",
          "  vraiment partagé            thème, préférences",
          "",
          "État FEATURE                → dans le slice : panier, filtres de la page",
          "",
          "État LOCAL                  → dans le composant : champ en cours,",
          "  éphémère                    onglet ouvert, menu déplié",
          "",
          "Règle : monter l'état au plus bas niveau qui le partage.",
        ],
      },
    ],
  },
  {
    id: "data-fetching-patterns",
    title: "Patterns de récupération de données",
    level: 3,
    intro: "Charger, mettre en cache, synchroniser : les stratégies.",
    blocks: [
      {
        kind: "fields",
        title: "Les stratégies",
        fields: [
          { label: "Fetch au rendu", value: "Chaque page charge ses données en arrivant : simple, mais cascades de requêtes et états de chargement partout." },
          { label: "Cache normalisé", value: "Les ressources sont mises en cache par clé : deux écrans qui affichent le même utilisateur partagent la donnée et son rafraîchissement." },
          { label: "Optimistic UI", value: "L'interface reflète l'action immédiatement, puis se réconcilie avec le serveur : indispensable pour la fluidité, avec rollback en cas d'échec." },
          { label: "Invalidation", value: "Après une mutation, invalider les caches concernés : la donnée affichée redevient vraie sans rechargement manuel." },
        ],
      },
    ],
  },
  {
    id: "performance-budgets",
    title: "Budgets de performance",
    level: 3,
    intro: "La performance comme contrainte d'architecture, pas comme vernis final.",
    blocks: [
      {
        kind: "fields",
        title: "Les signaux web (Core Web Vitals)",
        fields: [
          { label: "LCP (Largest Contentful Paint)", value: "Le temps d'affichage du plus gros élément : < 2,5 s. Dépend du chemin critique (HTML, CSS, image principale)." },
          { label: "INP (Interaction to Next Paint)", value: "La réactivité aux interactions : < 200 ms. Dépend du JavaScript qui bloque le thread principal." },
          { label: "CLS (Cumulative Layout Shift)", value: "La stabilité visuelle : < 0,1. Dépend des dimensions réservées (images, pubs, fonts)." },
        ],
      },
      {
        kind: "list",
        items: [
          "Budget chiffré : ex. « JS initial < 200 Ko » — vérifié en CI, pas à la main.",
          "Code splitting par route : ne charger que l'écran demandé.",
          "Images : dimensions, formats modernes, chargement différé hors écran.",
          "Mesurer sur mobile réel, pas sur une fibre avec un MacBook Pro.",
        ],
      },
    ],
  },
  {
    id: "code-splitting",
    title: "Code splitting",
    level: 3,
    intro: "Ne charger que ce que l'écran demande.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Import dynamique par route",
        code: `// Au lieu d'importer toutes les pages d'un coup :\n// import AdminPage from "./pages/AdminPage";\n\n// On charge chaque page à la demande :\nconst AdminPage = lazy(() => import("./pages/AdminPage"));\n\n// <Suspense fallback={<Spinner />}>\n//   <AdminPage />\n// </Suspense>\n// → le bundle admin n'est téléchargé que si on visite /admin.`,
      },
      {
        kind: "text",
        text: "Les bundlers découpent automatiquement les `import()` dynamiques en chunks séparés. Le découpage par route est le premier geste ; ensuite : les gros composants rarement utilisés (éditeur riche, graphiques) et les dépendances lourdes.",
      },
    ],
  },
  {
    id: "conventions-nommage",
    title: "Conventions de nommage",
    level: 3,
    intro: "Des noms qui disent ce que c'est, où ça va, comment ça s'utilise.",
    blocks: [
      {
        kind: "table",
        headers: ["Élément", "Convention", "Exemple"],
        rows: [
          ["Composant", "PascalCase, nom du fichier = nom exporté", "`UserCard.tsx` → `UserCard`"],
          ["Hook", "`use` + verbe", "`useAuth`, `useDebounce`"],
          ["Feature / slice", "kebab-case, nom métier", "`features/checkout/`"],
          ["Constante", "UPPER_SNAKE", "`MAX_UPLOAD_SIZE`"],
          ["Événement / handler", "`on` + nom / `handle` + nom", "`onSubmit` → `handleSubmit`"],
          ["Booléen", "préfixe `is/has/can`", "`isLoading`, `hasError`"],
        ],
      },
      {
        kind: "text",
        text: "La convention parfaite n'existe pas ; la convention écrite et appliquée, si. Le lint automatise ce qui est automatisable (casse, ordre des imports) ; la revue couvre le reste.",
      },
    ],
  },
  {
    id: "revues-code",
    title: "Revues de code",
    level: 3,
    intro: "Le mécanisme de gouvernance quotidien de l'architecture.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'on relit",
        fields: [
          { label: "Architecture", value: "Le code est-il à sa place (bonne couche, bon slice) ? Respecte-t-il les règles d'import ?" },
          { label: "Lisibilité", value: "Un inconnu comprend-il en une lecture ? Noms, découpage, commentaires sur le pourquoi." },
          { label: "Conventions", value: "Nommage, structure, patterns : ce que le lint ne voit pas." },
          { label: "Tests", value: "Le nouveau comportement est-il couvert ? Les cas d'erreur aussi ?" },
        ],
      },
      {
        kind: "list",
        items: [
          "Petites PR : une PR de 200 lignes est relue, une de 2000 est survolée.",
          "Critiquer le code, jamais l'auteur ; proposer, pas seulement rejeter.",
          "Les conventions se discutent dans les ADRs, pas dans chaque PR.",
        ],
      },
    ],
  },
  {
    id: "adr-detail",
    title: "Écrire une bonne ADR",
    level: 3,
    intro: "La méthode : quand, quoi, et surtout quoi ne pas y mettre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Quand", detail: "Pour toute décision structurante et réversible difficilement : choix de découpage, adoption d'un outil, règle d'équipe." },
          { title: "Contexte", detail: "Le problème concret et ses contraintes, en 3-5 lignes. Pas d'historique romancé." },
          { title: "Options envisagées", detail: "Les alternatives sérieuses avec leurs avantages/inconvénients — prouve que le choix est un choix." },
          { title: "Décision", detail: "Une phrase claire : « nous adoptons X »." },
          { title: "Conséquences", detail: "Les positives ET les négatives : coût de migration, formation, dette acceptée." },
        ],
      },
      {
        kind: "text",
        text: "Les ADRs se numérotent et ne se réécrivent pas : une décision annulée donne lieu à une nouvelle ADR qui la remplace. L'historique des décisions est aussi précieux que le code.",
      },
    ],
  },
  {
    id: "gouvernance",
    title: "Gouvernance",
    level: 3,
    intro: "Qui décide de quoi quand l'équipe grandit.",
    blocks: [
      {
        kind: "fields",
        title: "Les rôles",
        fields: [
          { label: "Propriétaires de zones", value: "Chaque grande zone (design system, plateforme) a des responsables : ils relisent, arbitrent, maintiennent." },
          { label: "RFC pour les changements larges", value: "Une proposition écrite, discutée avant implémentation : évite les refactors surprises." },
          { label: "Guilde / communauté", value: "Les sujets transverses (accessibilité, performance) ont un lieu de discussion, pas seulement des individus isolés." },
          { label: "Automatisation", value: "Lint, vérification des règles d'import, budgets en CI : la gouvernance qui ne dépend pas de la vigilance humaine." },
        ],
      },
    ],
  },
  {
    id: "dette-technique",
    title: "Dette technique",
    level: 3,
    intro: "La nommer, la mesurer, la rembourser — sans moralisme.",
    blocks: [
      {
        kind: "text",
        text: "La dette technique est un emprunt conscient : aller vite maintenant en acceptant un coût plus tard. Le problème n'est pas la dette, c'est la dette non tracée et non remboursée. On la gère comme une dette financière : inventaire (où, combien ça coûte), intérêts (ce qu'elle ralentit chaque semaine), et remboursement planifié (un pourcentage fixe de chaque sprint).",
      },
      {
        kind: "list",
        items: [
          "Tracer : TODO datés et expliqués, pas des TODO orphelins.",
          "Distinguer dette délibérée (choix assumé, ADR) et dette accidentelle (à corriger vite).",
          "Règle du boy-scout : laisser chaque zone un peu meilleure qu'en arrivant.",
          "Ne jamais faire de « grande réécriture » : rembourser par incréments livrables.",
        ],
      },
    ],
  },
  {
    id: "migration-strangler",
    title: "Migration progressive (strangler fig)",
    level: 3,
    intro: "Remplacer sans tout casser : la méthode du figuier étrangleur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Identifier la frontière", detail: "Découper le périmètre à migrer (une feature, un écran) avec une interface claire vers le reste." },
          { title: "Construire à côté", detail: "Implémenter le nouveau dans la nouvelle architecture, sans toucher l'ancien qui continue de tourner." },
          { title: "Basculer le trafic", detail: "Rediriger progressivement (feature flag, pourcentage) : l'ancien reste le filet de sécurité." },
          { title: "Supprimer l'ancien", detail: "Une fois la bascule totale et stable, effacer l'ancien code. Pas avant." },
        ],
      },
      {
        kind: "text",
        text: "C'est ainsi qu'on migre un découpage, un design system ou même un framework : jamais de big bang, toujours coexistence temporaire et suppression finale. La cohabitation est un coût accepté, pas un échec.",
      },
    ],
  },
  {
    id: "diagnostiquer-archi",
    title: "Auditer une architecture",
    level: 3,
    intro: "La méthode pour évaluer un projet existant avant d'agir.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Cartographier", detail: "Dessiner les modules et leurs dépendances réelles (pas celles du README) : où sont les cycles, les god objects ?" },
          { title: "Mesurer", detail: "Taille des bundles, temps de build, couverture de tests, temps d'onboarding : des chiffres, pas des impressions." },
          { title: "Interroger", detail: "Demander à l'équipe ce qui fait peur, ce qui est dupliqué, ce qui ralentit : la douleur vécue priorise." },
          { title: "Prioriser", detail: "Trier par (coût de la douleur × fréquence) / coût de réparation : attaquer le ratio le plus rentable." },
          { title: "Planifier", detail: "Incréments livrables avec critères d'arrêt : on sait quand c'est « assez bien »." },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les fautes d'architecture les plus coûteuses.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Sur-architecturer trop tôt",
            value:
              "Problem : monorepo + micro-frontends pour 3 écrans. Better : commencer simple, architecturer quand la douleur apparaît.",
          },
          {
            label: "Le dossier shared fourre-tout",
            value:
              "Problem : tout ce qu'on ne sait pas placer finit dans `shared/`, qui devient le nouveau chaos. Better : barrière à l'entrée haute, revues strictes.",
          },
          {
            label: "Abstraction prématurée",
            value:
              "Problem : un composant « générique » avec 15 props pour 2 usages. Better : dupliquer d'abord, abstraire au 3e usage.",
          },
          {
            label: "Conventions orales",
            value:
              "Problem : « tout le monde sait » — jusqu'au départ de « tout le monde ». Better : écrire, linter, relire.",
          },
          {
            label: "Design system sans utilisateurs",
            value:
              "Problem : 40 composants parfaits que personne n'utilise. Better : extraire des apps réelles, documenter, versionner.",
          },
          {
            label: "Imports qui violent les couches",
            value:
              "Problem : les règles existent mais rien ne les vérifie. Better : lint automatisé sur les imports.",
          },
          {
            label: "État global par défaut",
            value:
              "Problem : tout dans le store, re-rendus en cascade. Better : local d'abord, global pour le partagé.",
          },
          {
            label: "Big bang rewrite",
            value:
              "Problem : 6 mois de réécriture, zéro livraison. Better : strangler fig, incréments.",
          },
          {
            label: "Accessibilité en option",
            value:
              "Problem : rattrapage coûteux voire impossible. Better : intégrée aux composants du design system dès le début.",
          },
          {
            label: "Pas de décision écrite",
            value:
              "Problem : les mêmes débats reviennent tous les 6 mois. Better : ADRs numérotées et consultables.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Les réflexes d'une architecture qui dure.",
    blocks: [
      {
        kind: "list",
        items: [
          "Architecturer pour la taille réelle, avec des portes vers la taille suivante.",
          "Découper par fonctionnalité ; ce qui change ensemble vit ensemble.",
          "Règles d'import explicites et vérifiées automatiquement.",
          "Design tokens avant composants ; composants avant pages.",
          "Documenter les décisions (ADR) et les usages (docs des composants).",
          "Conventions écrites, lintées, relues — jamais orales.",
          "État au plus bas niveau qui le partage ; cache serveur pour la donnée.",
          "Budgets de performance en CI, mesurés sur mobile.",
          "Dette tracée et remboursée par incréments, jamais en big bang.",
          "Gouvernance légère : propriétaires de zones, RFC pour les gros changements.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin : méthodologies et références.",
    blocks: [
      {
        kind: "fields",
        title: "Références",
        fields: [
          { label: "Feature-Sliced Design", value: "La méthodologie de découpage : documentation de la communauté, exemples de migration." },
          { label: "Design systems", value: "Étudier des systèmes publics matures : leur documentation d'usage vaut tous les tutoriels." },
          { label: "Web Performance", value: "https://developer.mozilla.org/en-US/docs/Web/Performance — la référence MDN sur la performance web." },
          { label: "TypeScript", value: "https://www.typescriptlang.org/docs/ — le typage est un outil d'architecture : des contrats vérifiés entre modules." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : auditer une app réelle avec la méthode du niveau 3, puis planifier trois incréments.",
          "Pages liées de cette plateforme : React, TypeScript, Tests, Accessibilité, Performance web.",
        ],
      },
    ],
  },
  {
    id: "theming",
    title: "Thèmes : clair, sombre et au-delà",
    level: 3,
    intro: "Le mode sombre comme conséquence des tokens, pas comme projet séparé.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Thème via tokens sémantiques",
        code: `:root {\n  --surface-default: #ffffff;\n  --text-default: #1a1a1a;\n}\n\n[data-theme="dark"] {\n  --surface-default: #121212;\n  --text-default: #f5f5f5;\n}\n\n.card {\n  background: var(--surface-default);\n  color: var(--text-default);\n}`,
      },
      {
        kind: "text",
        text: "Les composants n'utilisent que des tokens sémantiques : le thème n'est qu'une redéfinition de ces tokens. Préférence système (`prefers-color-scheme`), choix utilisateur persisté, et transition sans flash au chargement — les trois détails qui font un thème propre.",
      },
    ],
  },
  {
    id: "internationalisation",
    title: "Internationalisation (i18n)",
    level: 3,
    intro: "Penser multi-langue avant d'en avoir besoin.",
    blocks: [
      {
        kind: "fields",
        title: "Les règles",
        fields: [
          { label: "Zéro texte en dur", value: "Chaque chaîne visible passe par un catalogue de clés : `t(\"checkout.title\")`. Le texte en dur est une dette i18n." },
          { label: "Pluriels et genres", value: "Les règles varient par langue : utiliser un système qui gère les formes plurielles, pas des concaténations." },
          { label: "Formats locaux", value: "Dates, nombres, devises : formatés selon la locale via les API natives (`Intl`), jamais à la main." },
          { label: "Sens de lecture", value: "Prévoir le RTL (arabe, hébreu) : propriétés logiques CSS (`margin-inline-start`) plutôt que `margin-left`." },
        ],
      },
    ],
  },
  {
    id: "feature-flags",
    title: "Feature flags",
    level: 3,
    intro: "Découpler le déploiement de la livraison.",
    blocks: [
      {
        kind: "text",
        text: "Un feature flag active ou désactive une fonctionnalité sans redéployer : on fusionne le code tôt, on l'expose progressivement (équipe, 10 %, 100 %), et on le coupe en cas de problème. Les règles : nommer explicitement, dater, et surtout supprimer les flags obsolètes — un flag permanent est une dette.",
      },
      {
        kind: "list",
        items: [
          "Déploiement continu + exposition progressive : le code part en production éteint.",
          "Tests A/B et kill switch : le flag sert aussi à expérimenter et à se protéger.",
          "Nettoyage systématique : chaque flag a une date de suppression prévue.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'architecture frontend maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir le framework : `react` — patterns avancés et performance.",
          "Typer les contrats : `typescript` — des interfaces entre modules qui tiennent.",
          "Tester à chaque niveau : `testing`, `vitest`, `playwright`.",
          "Rendre accessible : `accessibility` — l'architecture inclusive.",
          "Industrialiser : `github-actions` — CI qui vérifie règles et budgets.",
          "Passer à l'échelle : `nextjs` — routing, rendu et conventions d'un framework full stack.",
        ],
      },
    ],
  },
];

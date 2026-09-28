import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Flexbox : le layout unidimensionnel, des axes
 * au dimensionnement fin (grow/shrink/basis), avec les patterns quotidiens
 * et les pièges classiques. Tous les textes supportent le code inline
 * entre backticks.
 */
export const LEARNING_FLEXBOX: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Flexbox et pourquoi c'est l'outil quotidien du layout.",
    blocks: [
      {
        kind: "text",
        text: "Flexbox est le module CSS de mise en page unidimensionnel : il dispose des éléments le long d'un axe — une rangée ou une colonne — en contrôlant leur alignement, leur ordre et la distribution de l'espace. Barres de navigation, groupes de boutons, cartes, centrages : c'est l'outil qu'on utilise dix fois par jour.",
      },
      {
        kind: "text",
        text: "Le concept central : un conteneur (`display: flex`) et deux axes. L'axe principal suit `flex-direction` (horizontal par défaut) ; l'axe transversal est perpendiculaire. `justify-content` aligne sur l'axe principal, `align-items` sur l'axe transversal. Toute la logique Flexbox découle de ces deux axes.",
      },
      {
        kind: "text",
        text: "Flexbox et Grid sont complémentaires : Flexbox pour les composants et les dispositions en une dimension, Grid pour les layouts de page en deux dimensions. Quelques propriétés Flexbox suffisent à résoudre la grande majorité des problèmes d'alignement du quotidien.",
      },
    ],
  },
  {
    id: "axes-30s",
    title: "Les deux axes en 30 secondes",
    level: 1,
    intro:
      "Le modèle mental sans lequel rien n'est compréhensible.",
    blocks: [
      {
        kind: "diagram",
        title: "Axe principal et axe transversal",
        lines: [
          "flex-direction: row (défaut)",
          "",
          "axe principal ──────────────────────▶",
          "┌─────┐ ┌─────┐ ┌─────┐",
          "│  A  │ │  B  │ │  C  │",
          "└─────┘ └─────┘ └─────┘",
          "   ▲",
          "   │ axe transversal",
          "   ▼",
          "",
          "flex-direction: column",
          "",
          "   ┌─────┐  ◀── axe principal (vertical)",
          "   │  A  │",
          "   └─────┘",
          "   ┌─────┐",
          "   │  B  │   ──▶ axe transversal (horizontal)",
          "   └─────┘",
          "",
          "justify-content → axe principal | align-items → axe transversal",
        ],
      },
      {
        kind: "text",
        text: "Retenez : changer `flex-direction` échange les rôles des deux propriétés d'alignement. C'est la source n°1 de confusion — et la clé de tout.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "prerequis-flex",
    title: "Prérequis",
    level: 2,
    intro:
      "Les bases CSS avant de manipuler les axes.",
    blocks: [
      {
        kind: "fields",
        title: "CSS — ce qu'il faut maîtriser",
        fields: [
          {
            label: "Le modèle de boîte",
            value:
              "Les éléments flexibles restent des boîtes : contenu, padding, bordure, marge. `box-sizing: border-box` évite les calculs de largeur surprises.",
          },
          {
            label: "display et positionnement",
            value:
              "Comprendre `block` vs `inline` pour sentir ce que `display: flex` change sur le conteneur et ses enfants.",
          },
          {
            label: "Sélecteurs",
            value:
              "Cibler les enfants (`:first-child`, `:last-child`, `:nth-child`) pour les traiter différemment.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-flex",
    title: "Premier conteneur flex",
    level: 2,
    intro:
      "Trois lignes pour transformer une pile verticale en rangée.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Une rangée d'éléments",
        code: `.conteneur {\n  display: flex; /* les enfants deviennent des \"flex items\" */\n  gap: 1rem;     /* espace entre les éléments */\n}\n\n/* Avant : les div s'empilent verticalement (block) */\n/* Après : ils s'alignent horizontalement, hauteur égale */`,
      },
      {
        kind: "code",
        language: "html",
        title: "Le HTML correspondant",
        code: `<div class="conteneur">\n  <div class="carte">Carte 1</div>\n  <div class="carte">Carte 2</div>\n  <div class="carte">Carte 3</div>\n</div>`,
      },
      {
        kind: "list",
        items: [
          "Seuls les enfants directs deviennent des flex items : les petits-enfants ne sont pas concernés.",
          "`display: flex` = conteneur block ; `display: inline-flex` = conteneur inline (rare).",
          "Par défaut, les items s'étirent sur l'axe transversal (`align-items: stretch`) : hauteurs égales gratuites.",
        ],
      },
    ],
  },
  {
    id: "flex-direction",
    title: "flex-direction",
    level: 2,
    intro:
      "Choisir l'orientation de l'axe principal.",
    blocks: [
      {
        kind: "table",
        headers: ["Valeur", "Axe principal", "Ordre"],
        rows: [
          ["`row` (défaut)", "Horizontal, gauche → droite", "Ordre du DOM"],
          ["`row-reverse`", "Horizontal, droite → gauche", "Inversé"],
          ["`column`", "Vertical, haut → bas", "Ordre du DOM"],
          ["`column-reverse`", "Vertical, bas → haut", "Inversé"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Passer en colonne",
        code: `/* Navigation verticale (sidebar, menu mobile) */\n.menu {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}`,
      },
      {
        kind: "text",
        text: "Attention : `row-reverse` et `column-reverse` inversent l'ordre visuel mais pas l'ordre du DOM (tabulation, lecteurs d'écran). À utiliser avec parcimonie, comme `order` (niveau 3).",
      },
    ],
  },
  {
    id: "justify-content",
    title: "justify-content : l'axe principal",
    level: 2,
    intro:
      "Distribuer les éléments et l'espace libre le long de l'axe principal.",
    blocks: [
      {
        kind: "table",
        headers: ["Valeur", "Effet"],
        rows: [
          ["`flex-start` (défaut)", "Tassés au début"],
          ["`flex-end`", "Tassés à la fin"],
          ["`center`", "Centrés"],
          ["`space-between`", "Premier au début, dernier à la fin, espace réparti entre"],
          ["`space-around`", "Espace égal autour de chaque élément (demi-espace aux bords)"],
          ["`space-evenly`", "Espace strictement égal partout, bords inclus"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Barre de navigation espacée",
        code: `.navbar {\n  display: flex;\n  justify-content: space-between; /* logo à gauche, liens à droite */\n  align-items: center;\n  padding: 1rem 2rem;\n}`,
      },
    ],
  },
  {
    id: "align-items",
    title: "align-items : l'axe transversal",
    level: 2,
    intro:
      "Aligner les éléments perpendiculairement à l'axe principal.",
    blocks: [
      {
        kind: "table",
        headers: ["Valeur", "Effet"],
        rows: [
          ["`stretch` (défaut)", "Les items s'étirent pour remplir (hauteurs égales en row)"],
          ["`flex-start`", "Alignés au début de l'axe transversal"],
          ["`center`", "Centrés — le fameux centrage vertical"],
          ["`flex-end`", "Alignés à la fin"],
          ["`baseline`", "Alignés sur la ligne de base du texte"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Le centrage vertical devenu trivial",
        code: `/* Avant Flexbox : le centrage vertical était un casse-tête */\n.centrer {\n  display: flex;\n  align-items: center; /* vertical */\n  gap: 0.75rem;\n}\n\n/* Icône + texte alignés, quelle que soit la hauteur */\n.ligne {\n  display: flex;\n  align-items: center;\n}`,
      },
    ],
  },
  {
    id: "centrage-parfait",
    title: "Le centrage parfait",
    level: 2,
    intro:
      "Centrer horizontalement ET verticalement en deux lignes.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Centrage complet",
        code: `.plein-ecran {\n  display: flex;\n  justify-content: center; /* axe principal */\n  align-items: center;     /* axe transversal */\n  min-height: 100vh;\n}\n\n/* Alternative : margin auto sur l'enfant absorbe l'espace libre */\n.enfant-centre {\n  margin: auto;\n}`,
      },
      {
        kind: "text",
        text: "Les deux approches sont valides : `justify-content` + `align-items` sur le parent (le plus explicite), ou `margin: auto` sur l'enfant (pratique quand le parent a déjà d'autres réglages).",
      },
    ],
  },
  {
    id: "gap-flex",
    title: "gap : l'espacement propre",
    level: 2,
    intro:
      "Espacer les éléments sans marges parasites.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "gap vs marges",
        code: `/* Moderne : gap gère tout, pas de marge sur le dernier élément */\n.liste {\n  display: flex;\n  gap: 1rem;\n}\n\n/* Ancien monde : marges + sélecteur pour annuler la dernière */\n/* .liste > * + * { margin-left: 1rem; } — à oublier */`,
      },
      {
        kind: "list",
        items: [
          "`gap` s'applique entre les éléments uniquement : jamais d'espace avant le premier ni après le dernier.",
          "Fonctionne aussi avec `flex-wrap` : `row-gap` et `column-gap` pour des valeurs distinctes.",
          "Support universel depuis 2021 : plus aucune raison d'utiliser les marges négatives.",
        ],
      },
    ],
  },
  {
    id: "flex-wrap",
    title: "flex-wrap : passer à la ligne",
    level: 2,
    intro:
      "Quand les éléments débordent : les laisser s'enrouler.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Galerie flexible",
        code: `.galerie {\n  display: flex;\n  flex-wrap: wrap; /* les éléments passent à la ligne */\n  gap: 1rem;\n}\n\n.galerie > * {\n  flex: 1 1 200px; /* base 200px, grandit et rétrécit */\n}`,
      },
      {
        kind: "list",
        items: [
          "Sans `wrap` (`nowrap`, le défaut), les éléments rétrécissent jusqu'à déborder plutôt que de passer à la ligne.",
          "`wrap-reverse` : les lignes s'empilent dans le sens inverse — rarement utile, à connaître.",
          "`flex-flow` est le raccourci : `flex-flow: row wrap` = direction + wrap en une ligne.",
        ],
      },
    ],
  },
  {
    id: "navbar-flex",
    title: "Cas pratique : barre de navigation",
    level: 2,
    intro:
      "Le composant Flexbox par excellence, décomposé.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Structure",
        code: `<nav class="navbar">\n  <a class="logo" href="/">MonSite</a>\n  <ul class="liens">\n    <li><a href="/docs">Docs</a></li>\n    <li><a href="/blog">Blog</a></li>\n  </ul>\n  <button class="cta">Commencer</button>\n</nav>`,
      },
      {
        kind: "code",
        language: "css",
        title: "Layout",
        code: `.navbar {\n  display: flex;\n  align-items: center;\n  gap: 2rem;\n  padding: 1rem 2rem;\n}\n\n.liens {\n  display: flex;\n  gap: 1.5rem;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.cta {\n  margin-left: auto; /* pousse le bouton tout à droite */\n}`,
      },
      {
        kind: "text",
        text: "`margin-left: auto` sur le bouton : la marge auto absorbe tout l'espace libre et pousse l'élément au bout — la technique la plus élégante pour « un élément à droite, le reste à gauche ».",
      },
    ],
  },
  {
    id: "devtools-flex",
    title: "Inspecter avec les DevTools",
    level: 2,
    intro:
      "Visualiser les axes et tester les alignements en direct.",
    blocks: [
      {
        kind: "list",
        items: [
          "Badge « flex » dans l'inspecteur (Chrome, Firefox) : cliquez pour superposer les axes et les numéros des items.",
          "L'éditeur visuel dans l'onglet Styles permet de changer `justify-content` / `align-items` en cliquant — idéal pour expérimenter.",
          "L'overlay montre aussi les tailles de base et les écarts : utile pour comprendre pourquoi un élément ne prend pas la taille voulue.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-flex",
    title: "Les erreurs les plus courantes",
    level: 2,
    intro:
      "Les pièges classiques des débuts avec Flexbox.",
    blocks: [
      {
        kind: "list",
        items: [
          "Confondre `justify-content` et `align-items` après un changement de `flex-direction`.",
          "Oublier que seuls les enfants directs sont des flex items.",
          "`flex: 1` qui écrase les contenus : `flex-shrink` fait rétrécir plus que prévu (voir niveau 3).",
          "Vouloir un vrai tableau 2D : Flexbox fait des rangées indépendantes, pas des colonnes alignées — c'est le travail de Grid.",
          "`margin: auto` qui « ne marche pas » : il faut de l'espace libre à absorber (conteneur plus grand que le contenu).",
          "Texte qui déborde d'un item flexible : `min-width: 0` à venir au niveau 3.",
        ],
      },
    ],
  },
  {
    id: "projet-cartes-flex",
    title: "Projet : rangée de cartes",
    level: 2,
    intro:
      "Des cartes à hauteurs égales avec bouton aligné en bas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Le conteneur",
            detail:
              "`display: flex`, `gap: 1.5rem`, `flex-wrap: wrap` pour le responsive. Chaque carte en `flex: 1 1 280px`.",
          },
          {
            title: "Hauteurs égales gratuites",
            detail:
              "`align-items: stretch` (défaut) : toutes les cartes font la hauteur de la plus grande, sans calcul.",
          },
          {
            title: "Carte en colonne",
            detail:
              "Chaque carte est elle-même un flex en `column` : titre, texte, puis bouton poussé en bas avec `margin-top: auto`.",
          },
          {
            title: "Vérifier",
            detail:
              "Textes de longueurs très différentes : les boutons restent alignés sur la même ligne dans chaque rangée.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Bouton aligné en bas de chaque carte",
        code: `.carte {\n  display: flex;\n  flex-direction: column;\n}\n\n.carte .bouton {\n  margin-top: auto; /* absorbe l'espace libre : le bouton descend */\n}`,
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "axes-detail-flex",
    title: "Les axes : le modèle complet",
    level: 3,
    intro:
      "Maîtriser le modèle mental qui explique toutes les propriétés.",
    blocks: [
      {
        kind: "diagram",
        title: "Les quatre directions et leurs axes",
        lines: [
          "row            → principal: horizontal →  | transversal: vertical ↕",
          "row-reverse    → principal: horizontal ←  | transversal: vertical ↕",
          "column         → principal: vertical ↓    | transversal: horizontal ↔",
          "column-reverse → principal: vertical ↑    | transversal: horizontal ↔",
          "",
          "Propriétés par axe (indépendantes de la direction) :",
          "principal   → justify-content, gap (row/column-gap), flex-grow/shrink/basis",
          "transversal → align-items, align-self, align-content",
        ],
      },
      {
        kind: "text",
        text: "Toutes les propriétés d'alignement se réfèrent aux axes, jamais à « horizontal » ou « vertical ». Quand un layout se comporte bizarrement après un changement de direction, revenez à ce schéma : quelle propriété agit sur quel axe ?",
      },
    ],
  },
  {
    id: "flex-grow",
    title: "flex-grow : grandir",
    level: 3,
    intro:
      "Distribuer l'espace libre entre les éléments.",
    blocks: [
      {
        kind: "text",
        text: "`flex-grow` est un facteur de proportion, pas une taille. Avec `flex-grow: 1` sur tous les items, l'espace libre est partagé équitablement. Avec `2` sur l'un et `1` sur les autres, le premier reçoit deux parts. À `0` (défaut), l'élément ne grandit pas.",
      },
      {
        kind: "code",
        language: "css",
        title: "Sidebar + contenu",
        code: `.layout {\n  display: flex;\n  gap: 1rem;\n}\n\n.sidebar {\n  flex: 0 0 250px; /* taille fixe : ne grandit ni ne rétrécit */\n}\n\n.contenu {\n  flex: 1; /* prend tout l'espace restant */\n}`,
      },
      {
        kind: "text",
        text: "L'espace distribué est l'espace *libre* : ce qui reste après les tailles de base. Deux éléments `flex-grow: 1` avec des contenus de tailles différentes n'auront donc pas exactement la même taille finale — leurs bases diffèrent.",
      },
    ],
  },
  {
    id: "flex-shrink",
    title: "flex-shrink : rétrécir",
    level: 3,
    intro:
      "Ce qui se passe quand ça ne rentre plus.",
    blocks: [
      {
        kind: "text",
        text: "Quand la somme des tailles dépasse le conteneur, les éléments rétrécissent selon `flex-shrink` (défaut `1` : tous rétrécissent proportionnellement). `flex-shrink: 0` interdit le rétrécissement : l'élément garde sa taille et c'est le conteneur qui déborde (ou les autres qui rétrécissent davantage).",
      },
      {
        kind: "code",
        language: "css",
        title: "Élément qui refuse de rétrécir",
        code: `.barre {\n  display: flex;\n}\n\n.barre .icone {\n  flex-shrink: 0; /* l'icône garde sa taille, le texte rétrécit */\n}\n\n.barre .texte {\n  flex: 1;\n  min-width: 0; /* autorise le rétrécissement sous le contenu */\n  overflow: hidden;\n  text-overflow: ellipsis;\n}`,
      },
      {
        kind: "text",
        text: "Le couple `flex-shrink: 0` (élément fixe) + `min-width: 0` (élément flexible qui accepte de rétrécir) est le pattern standard des barres d'outils, chips et listes.",
      },
    ],
  },
  {
    id: "flex-basis",
    title: "flex-basis : la taille de départ",
    level: 3,
    intro:
      "La taille initiale avant distribution de l'espace.",
    blocks: [
      {
        kind: "table",
        headers: ["Valeur", "Signification"],
        rows: [
          ["`auto` (défaut)", "La taille naturelle de l'élément (`width`/`height` ou contenu)"],
          ["`0`", "On part de zéro : la taille finale vient uniquement de `flex-grow`"],
          ["`200px`, `30%`…", "Une taille de départ explicite"],
          ["`content`", "La taille du contenu, en ignorant `width`"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Colonnes égales garanties",
        code: `/* flex-basis: 0 + grow : des colonnes strictement égales */\n.colonnes > * {\n  flex: 1 1 0; /* raccourci : grow shrink basis */\n}\n\n/* vs flex: 1 (basis auto) : les colonnes diffèrent selon le contenu */`,
      },
      {
        kind: "text",
        text: "Subtilité clé : `flex: 1` signifie `1 1 0%` (base zéro, parts égales) tandis que `flex: 1 1 auto` part de la taille du contenu. Pour des colonnes vraiment égales, la base zéro est indispensable.",
      },
    ],
  },
  {
    id: "flex-raccourci",
    title: "Le raccourci flex",
    level: 3,
    intro:
      "Lire et écrire `flex` sans se tromper.",
    blocks: [
      {
        kind: "table",
        headers: ["Écriture", "Équivaut à", "Usage"],
        rows: [
          ["`flex: 1`", "`1 1 0%`", "Prendre l'espace disponible, parts égales"],
          ["`flex: auto`", "`1 1 auto`", "Grandir/rétrécir depuis la taille naturelle"],
          ["`flex: none`", "`0 0 auto`", "Taille fixe, jamais de flexibilité"],
          ["`flex: 2`", "`2 1 0%`", "Deux parts d'espace libre"],
          ["`flex: 0 0 250px`", "—", "Colonne fixe de 250 px"],
        ],
      },
      {
        kind: "text",
        text: "Écrire `flex` avec une seule valeur est presque toujours suffisant. La forme à trois valeurs sert aux cas précis (sidebar fixe, élément incompressible). Notez que `flex: 1` seul réinitialise `flex-basis` à `0%` : c'est voulu, pas un bug.",
      },
    ],
  },
  {
    id: "auto-margins",
    title: "Les marges auto : l'alignement individuel",
    level: 3,
    intro:
      "Pousser un élément seul, sans toucher aux autres.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Patterns de marges auto",
        code: `/* Un élément à droite, les autres à gauche */\n.barre .dernier { margin-left: auto; }\n\n/* Élément centré entre deux groupes */\n.barre .gauche { margin-right: auto; }\n.barre .droite { margin-left: auto; }\n/* (le centre reste au milieu si les groupes sont équilibrés) */\n\n/* Centrage total d'un enfant unique */\n.conteneur > .seul { margin: auto; }`,
      },
      {
        kind: "text",
        text: "Dans un conteneur flex, une marge `auto` absorbe tout l'espace libre disponible dans sa direction. C'est plus ciblé que `justify-content` (qui agit sur tout le groupe) et ça fonctionne sur les deux axes.",
      },
    ],
  },
  {
    id: "order-accessibilite",
    title: "order et l'accessibilité",
    level: 3,
    intro:
      "Réordonner visuellement : un pouvoir dangereux.",
    blocks: [
      {
        kind: "text",
        text: "`order` change l'ordre visuel des flex items (défaut `0` ; valeurs négatives = plus tôt). Mais l'ordre du DOM — tabulation clavier, ordre de lecture des lecteurs d'écran — ne change pas. Un bouton « Suivant » affiché avant « Précédent » mais tabulé après crée une incohérence grave.",
      },
      {
        kind: "list",
        items: [
          "Règle : l'ordre visuel doit correspondre à l'ordre du DOM.",
          "Usage légitime : ajustements purement décoratifs, ou réorganisation responsive où le DOM est déjà dans l'ordre logique.",
          "Si le réordonnancement change le sens, réordonnez le HTML plutôt que d'utiliser `order`.",
          "Même prudence pour `row-reverse` / `column-reverse`.",
        ],
      },
    ],
  },
  {
    id: "align-self",
    title: "align-self : l'exception individuelle",
    level: 3,
    intro:
      "Surcharger l'alignement transversal pour un seul élément.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Un élément différent des autres",
        code: `.barre {\n  display: flex;\n  align-items: center;\n}\n\n.barre .badge {\n  align-self: flex-start; /* ce badge seul s'aligne en haut */\n}\n\n.barre .etire {\n  align-self: stretch; /* celui-ci s'étire malgré align-items */\n}`,
      },
      {
        kind: "text",
        text: "`align-self: auto` (défaut) hérite de `align-items` du parent. Toutes les valeurs de `align-items` sont disponibles, plus `auto`. C'est l'outil des exceptions : un avatar qui dépasse, un bouton qui s'étire.",
      },
    ],
  },
  {
    id: "align-content",
    title: "align-content : les lignes multiples",
    level: 3,
    intro:
      "Aligner les rangées entre elles quand `flex-wrap` crée plusieurs lignes.",
    blocks: [
      {
        kind: "text",
        text: "`align-items` aligne les éléments *dans* chaque ligne ; `align-content` aligne les lignes *entre elles* sur l'axe transversal — mais uniquement s'il y a de l'espace libre et plusieurs lignes (`flex-wrap: wrap`). Avec une seule ligne, `align-content` ne fait rien : c'est la confusion la plus fréquente.",
      },
      {
        kind: "code",
        language: "css",
        title: "Lignes réparties verticalement",
        code: `.grille-souple {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: space-between; /* les rangées se répartissent */\n  height: 400px; /* il faut de l'espace libre pour voir l'effet */\n}`,
      },
    ],
  },
  {
    id: "flex-flow",
    title: "flex-flow : le raccourci direction + wrap",
    level: 3,
    intro:
      "Deux propriétés en une ligne.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Exemples",
        code: `.exemples {\n  flex-flow: row wrap;        /* le plus courant */\n  /* flex-flow: column nowrap; */\n  /* flex-flow: row-reverse wrap; */\n}`,
      },
      {
        kind: "text",
        text: "`flex-flow: <flex-direction> <flex-wrap>`. Pratique pour déclarer d'un coup une rangée qui s'enroule. Les deux valeurs sont optionnelles et dans n'importe quel ordre.",
      },
    ],
  },
  {
    id: "tailles-min-zero",
    title: "Le piège min-width: auto",
    level: 3,
    intro:
      "Pourquoi un texte fait déborder son conteneur flex — et la correction.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, un flex item a `min-width: auto` (en `row`) : il refuse de rétrécir sous la taille de son contenu. Un long mot sans espace ou un élément large empêche donc le rétrécissement et fait déborder le conteneur. La correction : `min-width: 0` (ou `min-height: 0` en colonne) sur l'item flexible, souvent combiné à `overflow: hidden` et `text-overflow: ellipsis`.",
      },
      {
        kind: "code",
        language: "css",
        title: "La correction standard",
        code: `.ligne {\n  display: flex;\n  gap: 0.5rem;\n}\n\n.ligne .icone {\n  flex-shrink: 0;\n}\n\n.ligne .texte {\n  min-width: 0;              /* autorise le rétrécissement */\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;   /* \"…\" quand ça dépasse */\n}`,
      },
    ],
  },
  {
    id: "sticky-footer",
    title: "Le sticky footer",
    level: 3,
    intro:
      "Le pied de page collé en bas, même avec peu de contenu — le classique Flexbox.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Footer toujours en bas",
        code: `body {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh; /* au moins la hauteur de l'écran */\n}\n\nmain {\n  flex: 1; /* le contenu pousse le footer vers le bas */\n}\n/* header, main, footer : le footer reste en bas, sans position: fixed */`,
      },
      {
        kind: "text",
        text: "Avant Flexbox, ce problème demandait des hacks de marges négatives. Avec `body` en colonne et `main` en `flex: 1`, c'est trois déclarations. `min-height` (pas `height`) permet à la page de grandir si le contenu dépasse l'écran.",
      },
    ],
  },
  {
    id: "media-object",
    title: "Le pattern media object",
    level: 3,
    intro:
      "Image à gauche, texte à droite : le composant le plus copié du web.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Structure",
        code: `<article class="media">\n  <img class="media-image" src="avatar.jpg" alt="Portrait de l'autrice">\n  <div class="media-body">\n    <h3>Titre de l'article</h3>\n    <p>Résumé en quelques lignes…</p>\n  </div>\n</article>`,
      },
      {
        kind: "code",
        language: "css",
        title: "Layout",
        code: `.media {\n  display: flex;\n  align-items: flex-start; /* l'image ne s'étire pas */\n  gap: 1rem;\n}\n\n.media-image {\n  flex-shrink: 0; /* l'image garde sa taille */\n  width: 64px;\n  border-radius: 50%;\n}\n\n.media-body {\n  flex: 1;\n  min-width: 0; /* le texte peut rétrécir */\n}`,
      },
      {
        kind: "text",
        text: "Popularisé par Nicole Sullivan, ce pattern (commentaires, notifications, résultats de recherche) tient en cinq déclarations Flexbox. `align-items: flex-start` évite que l'image s'étire ; `flex-shrink: 0` la protège du rétrécissement.",
      },
    ],
  },
  {
    id: "navbar-responsive",
    title: "Navigation responsive",
    level: 3,
    intro:
      "D'une barre horizontale à un menu replié, avec Flexbox.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Basculer en colonne sur mobile",
        code: `.navbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n@media (max-width: 700px) {\n  .navbar {\n    flex-direction: column;\n    align-items: stretch; /* les liens prennent toute la largeur */\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "Le plus simple : changer `flex-direction` au breakpoint — les mêmes éléments se réorganisent.",
          "Pour un menu hamburger, on masque la liste (`display: none`) et on l'affiche en colonne absolue à l'ouverture.",
          "Accessibilité : le bouton hamburger doit avoir `aria-expanded`, et le menu rester navigable au clavier.",
        ],
      },
    ],
  },
  {
    id: "card-layout",
    title: "Cartes : anatomie complète",
    level: 3,
    intro:
      "Le composant carte décortiqué : image, contenu, actions alignées.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Carte robuste",
        code: `.carte {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #e5e5e5;\n  border-radius: 0.75rem;\n  overflow: hidden;\n}\n\n.carte img {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}\n\n.carte .contenu {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem;\n  flex: 1;\n}\n\n.carte .actions {\n  display: flex;\n  justify-content: space-between;\n  margin-top: auto; /* toujours en bas */\n  padding-top: 1rem;\n}`,
      },
      {
        kind: "text",
        text: "Deux niveaux de flex imbriqués : la carte en colonne, ses actions en rangée. `margin-top: auto` garantit l'alignement des boutons quelle que soit la longueur du texte — le détail qui fait la différence visuelle dans une rangée de cartes.",
      },
    ],
  },
  {
    id: "form-layout",
    title: "Formulaires en Flexbox",
    level: 3,
    intro:
      "Champs alignés, labels et erreurs bien placés.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Champ label + input",
        code: `/* Ligne de formulaire : label fixe, champ extensible */\n.champ {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.champ label {\n  flex: 0 0 120px; /* labels alignés */\n  text-align: right;\n}\n\n.champ input {\n  flex: 1;\n  min-width: 0;\n}\n\n/* Groupe de champs côte à côte */\n.groupe {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.groupe > * {\n  flex: 1 1 200px;\n}`,
      },
      {
        kind: "list",
        items: [
          "Labels à largeur fixe + champs flexibles : des formulaires alignés sans tableau.",
          "En mobile, basculez `.champ` en `column` avec `align-items: stretch` : label au-dessus du champ.",
        ],
      },
    ],
  },
  {
    id: "centrage-cas",
    title: "Centrage : les cas particuliers",
    level: 3,
    intro:
      "Quand le centrage simple ne suffit pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "Centrer un seul élément parmi d'autres : `margin: auto` sur cet élément uniquement.",
          "Centrer un groupe mais garder un élément au bord : le groupe en `margin: auto` des deux côtés absorbe l'espace symétriquement.",
          "Centrer verticalement un contenu de hauteur inconnue dans une carte : `align-items: center` sur la carte en colonne… non : en colonne, le centrage vertical devient `justify-content: center` (l'axe principal est vertical).",
          "Centrer du texte multiligne avec une icône : `align-items: center` aligne les boîtes, `text-align: center` le texte — les deux sont indépendants.",
        ],
      },
    ],
  },
  {
    id: "flex-vs-grid",
    title: "Flexbox ou Grid : décider vite",
    level: 3,
    intro:
      "Le guide de décision en situation réelle.",
    blocks: [
      {
        kind: "table",
        headers: ["Question", "Réponse"],
        rows: [
          ["Les éléments forment-ils une seule rangée/colonne ?", "Flexbox"],
          ["Faut-il aligner des colonnes entre plusieurs rangées ?", "Grid"],
          ["Le nombre d'éléments est-il inconnu, en flux ?", "Flexbox + `flex-wrap`"],
          ["Le layout est-il une grille régulière ?", "Grid + `auto-fit`"],
          ["Faut-il chevaucher des éléments ?", "Grid"],
          ["C'est un composant (navbar, carte, formulaire) ?", "Flexbox (souvent imbriqué dans du Grid)"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, les deux s'imbriquent : une page en Grid, des composants en Flexbox. Apprendre à passer de l'un à l'autre selon l'échelle du problème est la vraie compétence.",
      },
    ],
  },
  {
    id: "header-actions",
    title: "Pattern : en-tête avec actions",
    level: 3,
    intro:
      "Titre à gauche, boutons à droite — et ses variantes.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "En-tête de section",
        code: `.en-tete {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.en-tete h2 {\n  margin: 0;\n}\n\n.en-tete .actions {\n  display: flex;\n  gap: 0.5rem;\n  margin-left: auto;\n}`,
      },
      {
        kind: "text",
        text: "Variantes : titre centré avec actions des deux côtés (deux groupes en `margin: auto` opposés), ou actions sous le titre en mobile (`flex-wrap: wrap`). Ce pattern apparaît dans presque chaque interface : maîtrisez-le par cœur.",
      },
    ],
  },
  {
    id: "sidebar-layout",
    title: "Layout avec sidebar",
    level: 3,
    intro:
      "Sidebar fixe + contenu flexible, avec collapse.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Sidebar repliable",
        code: `.app {\n  display: flex;\n  min-height: 100vh;\n}\n\n.sidebar {\n  flex: 0 0 260px;\n  transition: margin 0.3s ease;\n}\n\n.app.replie .sidebar {\n  margin-left: -260px; /* la sidebar sort de l'écran */\n}\n\n.contenu {\n  flex: 1;\n  min-width: 0; /* indispensable contre les débordements */\n  padding: 2rem;\n}`,
      },
      {
        kind: "text",
        text: "`min-width: 0` sur le contenu est critique : sans lui, un tableau ou un long mot dans le contenu empêche la sidebar de garder ses 260 px. C'est le bug n°1 des layouts d'administration.",
      },
    ],
  },
  {
    id: "erreurs-subtiles-flex",
    title: "Erreurs subtiles de niveau avancé",
    level: 3,
    intro:
      "Les pièges qui restent après des mois de pratique.",
    blocks: [
      {
        kind: "list",
        items: [
          "`flex: 1` vs `flex: auto` : bases `0%` vs `auto` — des colonnes inégales « sans raison » viennent souvent de là.",
          "`align-content` sans effet : il faut plusieurs lignes wrappées ET de l'espace libre.",
          "`gap` + `flex-wrap` : l'espace en fin de ligne n'est pas « perdu », il est distribué selon `justify-content`.",
          "Élément `position: absolute` enfant d'un flex : il sort du flux flex et se place par rapport au conteneur positionné.",
          "`min-height` sur le conteneur + `align-items: stretch` : les items s'étirent à la hauteur minimale, pas au contenu.",
          "Pourcentages de `flex-basis` : relatifs à la taille du conteneur sur l'axe principal.",
        ],
      },
    ],
  },
  {
    id: "debugging-flex",
    title: "Déboguer un layout flex",
    level: 3,
    intro:
      "Méthode systématique quand ça ne s'aligne pas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier les axes",
            detail:
              "Quelle est la `flex-direction` ? Donc quel axe pour `justify-content`, quel axe pour `align-items` ? 50 % des bugs meurent ici.",
          },
          {
            title: "Activer l'overlay flex",
            detail:
              "Le badge « flex » des DevTools montre les axes, les tailles de base et les items. Vérifiez qui grandit/rétrécit.",
          },
          {
            title: "Chercher le débordement",
            detail:
              "Contenu incompressible ? `min-width: auto` ? Testez `min-width: 0` + `overflow: hidden` sur l'item flexible.",
          },
          {
            title: "Vérifier les marges auto",
            detail:
              "Une `margin: auto` oubliée absorbe l'espace et « casse » le `justify-content` — l'inspecteur la montre.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-navbar-complexe",
    title: "Projet : navigation complète",
    level: 3,
    intro:
      "Le projet de synthèse : navbar responsive accessible.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Version desktop",
            detail:
              "Logo à gauche, liens centrés, actions à droite : trois groupes avec marges auto. `align-items: center`, hauteur fixe.",
          },
          {
            title: "Version mobile",
            detail:
              "Bouton hamburger (`aria-expanded`), menu en colonne qui se déplie. Animation de hauteur ou d'opacité.",
          },
          {
            title: "Accessibilité",
            detail:
              "Ordre DOM = ordre visuel, focus visible, menu fermable au clavier (Échap), contraste des liens.",
          },
          {
            title: "Polish",
            detail:
              "État actif du lien courant (`aria-current=\"page\"`), transitions douces, test à 320 px et au zoom 200 %.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-galerie-flex",
    title: "Projet : galerie flexible",
    level: 3,
    intro:
      "Des tuiles qui s'enroulent proprement à toutes les largeurs.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Base",
            detail:
              "`flex-wrap: wrap`, `gap`, tuiles en `flex: 1 1 220px` : 4 colonnes sur desktop, 1 sur mobile, sans media query.",
          },
          {
            title: "Dernière rangée",
            detail:
              "Gérez l'alignement de la rangée incomplète : `justify-content: flex-start` (défaut) ou astuce avec un élément fantôme pour simuler `space-between`.",
          },
          {
            title: "Contenu",
            detail:
              "Chaque tuile en colonne : image (`aspect-ratio`), titre, prix/actions en bas via `margin-top: auto`.",
          },
          {
            title: "Test",
            detail:
              "Redimensionnez en continu : aucune largeur ne doit produire de chevauchement ni de trou bizarre.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-flex",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par les sources officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "MDN — Flexbox", value: "developer.mozilla.org/fr/docs/Web/CSS/CSS_flexible_box_layout : le guide complet, du concept de base aux cas avancés." },
          { label: "W3C — CSS Flexbox", value: "w3.org/TR/css-flexbox-1 : la spécification du module." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : Flexbox Froggy (flexboxfroggy.com/#fr), 24 niveaux ludiques pour les alignements.",
          "Référence visuelle : le guide « A Complete Guide to Flexbox » de CSS-Tricks, excellent aide-mémoire.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite-flex",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Flexbox maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Passer au 2D : `css-grid` pour les layouts de page et les grilles régulières.",
          "Systématiser le responsive : `responsive` (breakpoints, container queries).",
          "Animer les interfaces : `css-animations` (transitions, micro-interactions).",
          "Rendre accessible : `accessibility` (ordre visuel, navigation clavier).",
          "Revenir à la roadmap : valider Flexbox et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

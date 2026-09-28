import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de CSS Grid : le layout bidimensionnel, des
 * premières grilles au subgrid, en passant par les grilles responsives
 * sans media queries. Tous les textes supportent le code inline entre
 * backticks.
 */
export const LEARNING_CSS_GRID: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que CSS Grid apporte par rapport à Flexbox et aux anciennes techniques de layout.",
    blocks: [
      {
        kind: "text",
        text: "CSS Grid est le système de mise en page bidimensionnel du CSS : on définit des lignes et des colonnes, et on place les éléments dans cette grille. Là où Flexbox excelle sur un axe (une rangée ou une colonne), Grid maîtrise les deux dimensions à la fois — dashboards, mises en page magazine, galeries complexes — en quelques lignes déclaratives.",
      },
      {
        kind: "text",
        text: "Grid et Flexbox ne sont pas concurrents : ils sont complémentaires. La règle pratique : Flexbox pour les composants (barre de navigation, groupe de boutons, carte), Grid pour les layouts de page et les grilles de composants. On les imbrique librement : une grille dont les cellules contiennent des flexbox.",
      },
      {
        kind: "text",
        text: "Ce qui rend Grid puissant : les pistes flexibles (`fr`), les zones nommées qui rendent le layout lisible, le placement explicite sur les lignes, et les fonctions (`repeat()`, `minmax()`) qui produisent des grilles responsives sans media queries.",
      },
    ],
  },
  {
    id: "grille-en-30s",
    title: "Une grille en 30 secondes",
    level: 1,
    intro:
      "Le modèle mental : conteneur, pistes, lignes, cellules.",
    blocks: [
      {
        kind: "diagram",
        title: "Anatomie d'une grille 3×2",
        lines: [
          "┌──────────┬──────────┬──────────┐",
          "│ cellule  │ cellule  │ cellule  │  ← 3 colonnes (pistes verticales)",
          "├──────────┼──────────┼──────────┤",
          "│ cellule  │ cellule  │ cellule  │  ← 2 rangées (pistes horizontales)",
          "└──────────┴──────────┴──────────┘",
          "  │        │        │        │",
          "  lignes de grille : 4 lignes verticales, 3 horizontales",
          "",
          "display: grid        → le conteneur devient une grille",
          "grid-template-columns → définit les colonnes",
          "gap                  → l'espace entre les cellules",
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "La première grille",
        code: `.grille {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr; /* 3 colonnes égales */\n  gap: 1rem;\n}`,
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "prerequis-grid",
    title: "Prérequis",
    level: 2,
    intro:
      "Les bases CSS nécessaires avant d'attaquer les grilles.",
    blocks: [
      {
        kind: "fields",
        title: "CSS — ce qu'il faut maîtriser",
        fields: [
          {
            label: "Le modèle de boîte",
            value:
              "Contenu, padding, bordure, marge : les pistes de la grille dimensionnent les boîtes, il faut savoir ce qu'elles contiennent.",
          },
          {
            label: "Les unités",
            value:
              "`px`, `%`, `rem`, `vw` — et bientôt `fr`, l'unité star de Grid. Savoir quand chacune s'applique.",
          },
          {
            label: "Sélecteurs",
            value:
              "Cibler les enfants de la grille (`:nth-child`, classes) pour les placer individuellement.",
          },
          {
            label: "Flexbox (recommandé)",
            value:
              "Comprendre les axes et l'alignement en une dimension rend l'apprentissage de Grid deux fois plus rapide — et savoir quand choisir l'un ou l'autre.",
          },
        ],
      },
    ],
  },
  {
    id: "premiere-grille",
    title: "Première grille complète",
    level: 2,
    intro:
      "Déclarer des colonnes, des rangées et des gouttières : le trio de base.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Grille 3 colonnes × 2 rangées",
        code: `.grille {\n  display: grid;\n  grid-template-columns: 200px 1fr 1fr;\n  grid-template-rows: auto auto;\n  gap: 1rem;               /* gouttières horizontales ET verticales */\n  /* row-gap: 1rem; column-gap: 2rem; pour des valeurs distinctes */\n}`,
      },
      {
        kind: "list",
        items: [
          "`grid-template-columns` / `grid-template-rows` : la liste des pistes, dans l'ordre.",
          "`gap` : l'espace entre les pistes — sans marges parasites sur les enfants.",
          "Les enfants se placent automatiquement, de gauche à droite et de haut en bas (sens de lecture).",
          "Pas besoin de toucher au HTML : la grille se déclare entièrement en CSS.",
        ],
      },
    ],
  },
  {
    id: "unite-fr",
    title: "L'unité fr : l'espace flexible",
    level: 2,
    intro:
      "L'unité qui fait la magie de Grid : partager l'espace restant.",
    blocks: [
      {
        kind: "text",
        text: "`fr` (fraction) représente une part de l'espace libre du conteneur, après déduction des pistes fixes et des gaps. `1fr 1fr 1fr` = trois colonnes égales ; `200px 1fr 2fr` = une colonne fixe de 200 px, puis deux colonnes flexibles dont la seconde est deux fois plus large que la première.",
      },
      {
        kind: "code",
        language: "css",
        title: "Combinaisons courantes",
        code: `/* Sidebar fixe + contenu flexible */\n.layout { grid-template-columns: 240px 1fr; }\n\n/* 12 colonnes égales (système classique) */\n.grille-12 { grid-template-columns: repeat(12, 1fr); }\n\n/* Colonne flexible entre deux fixes */\n.trois { grid-template-columns: 1fr auto 1fr; } /* auto = taille du contenu */`,
      },
      {
        kind: "list",
        items: [
          "`fr` ne concerne que l'espace libre : les gaps sont déduits avant le partage.",
          "`auto` = la taille du contenu ; `min-content` / `max-content` = tailles intrinsèques (niveau 3).",
          "Mélanger fixes et `fr` : le pattern le plus courant des layouts réels.",
        ],
      },
    ],
  },
  {
    id: "placement-lignes",
    title: "Placer les éléments sur les lignes",
    level: 2,
    intro:
      "Sortir du placement automatique : dire exactement où va chaque élément.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Placement explicite",
        code: `.grille {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n}\n\n/* L'en-tête occupe les 4 colonnes (de la ligne 1 à la ligne 5) */\n.header { grid-column: 1 / 5; }\n\n/* La sidebar : colonne 1, rangées 2 à 4 */\n.sidebar { grid-column: 1 / 2; grid-row: 2 / 4; }\n\n/* Raccourci : span = \"s'étend sur N pistes\" */\n.large { grid-column: span 2; }`,
      },
      {
        kind: "text",
        text: "Les lignes sont numérotées à partir de 1 (on peut aussi compter depuis la fin avec des nombres négatifs : `-1` = la dernière ligne). `span 2` signifie « occupe deux pistes à partir de la position automatique » — plus lisible que des numéros absolus quand la position exacte n'a pas d'importance.",
      },
    ],
  },
  {
    id: "zones-nommees",
    title: "Les zones nommées",
    level: 2,
    intro:
      "Dessiner le layout en ASCII : la forme la plus lisible de Grid.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Layout holy grail en zones",
        code: `.page {\n  display: grid;\n  grid-template-columns: 200px 1fr 200px;\n  grid-template-areas:\n    "header header header"\n    "nav    main   aside"\n    "footer footer footer";\n  gap: 1rem;\n}\n\n.header { grid-area: header; }\n.nav    { grid-area: nav; }\n.main   { grid-area: main; }\n.aside  { grid-area: aside; }\n.footer { grid-area: footer; }`,
      },
      {
        kind: "list",
        items: [
          "Chaque chaîne entre guillemets = une rangée ; chaque nom = une cellule. La mise en page se lit comme un plan.",
          "Un nom répété sur plusieurs cellules fusionne la zone (le header ci-dessus).",
          "Le responsive devient trivial : redéfinissez `grid-template-areas` dans une media query (voir niveau 3).",
          "`.` = cellule vide : `\"header header .\"` laisse un trou volontaire.",
        ],
      },
    ],
  },
  {
    id: "repeat-minmax",
    title: "repeat() et minmax()",
    level: 2,
    intro:
      "Deux fonctions qui évitent les répétitions et les largeurs fragiles.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Les deux fonctions essentielles",
        code: `/* repeat : ne pas écrire 1fr douze fois */\n.grille { grid-template-columns: repeat(12, 1fr); }\n\n/* motifs répétés */\n.motif { grid-template-columns: repeat(3, 200px 1fr); }\n\n/* minmax : une piste entre un minimum et un maximum */\n.cartes { grid-template-columns: repeat(3, minmax(200px, 1fr)); }\n/* chaque colonne fait au moins 200px, et se partage l'espace restant */`,
      },
      {
        kind: "text",
        text: "`minmax(min, max)` garantit qu'une piste ne s'écrase jamais sous son minimum tout en restant flexible. C'est la brique des grilles responsives : combiné à `auto-fit` (section suivante), il produit des grilles qui s'adaptent sans aucune media query.",
      },
    ],
  },
  {
    id: "auto-fit-responsive",
    title: "Grilles responsives sans media queries",
    level: 2,
    intro:
      "La formule magique : `repeat(auto-fit, minmax(...))`.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Galerie auto-adaptative",
        code: `.galerie {\n  display: grid;\n  /* Autant de colonnes de 250px minimum que la largeur permet */\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n/* Large écran : 4 colonnes. Tablette : 2. Mobile : 1. Zéro media query. */`,
      },
      {
        kind: "list",
        items: [
          "`auto-fit` : le navigateur calcule combien de pistes de 250 px minimum tiennent, et les étire (`1fr`) pour remplir.",
          "Si l'espace est insuffisant pour le minimum, les éléments passent à la ligne suivante.",
          "`auto-fill` vs `auto-fit` : subtilité au niveau 3 — en pratique, `auto-fit` est presque toujours le bon choix.",
          "C'est le pattern n°1 des grilles de cartes, galeries et dashboards responsives.",
        ],
      },
    ],
  },
  {
    id: "alignement-grid",
    title: "Aligner dans la grille",
    level: 2,
    intro:
      "Six propriétés d'alignement, une logique unique.",
    blocks: [
      {
        kind: "table",
        headers: ["Propriété", "Cible", "Axe"],
        rows: [
          ["`justify-items`", "Chaque élément dans sa cellule", "Horizontal (inline)"],
          ["`align-items`", "Chaque élément dans sa cellule", "Vertical (block)"],
          ["`place-items`", "Raccourci des deux", "Les deux"],
          ["`justify-content`", "La grille entière dans le conteneur", "Horizontal"],
          ["`align-content`", "La grille entière dans le conteneur", "Vertical"],
          ["`place-content`", "Raccourci des deux", "Les deux"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Centrer un élément dans sa cellule",
        code: `.grille {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  place-items: center; /* chaque enfant est centré dans sa cellule */\n}\n\n/* Un seul élément différent des autres */\n.special { place-self: center; } /* justify-self + align-self */`,
      },
    ],
  },
  {
    id: "devtools-grid",
    title: "Inspecter avec les DevTools",
    level: 2,
    intro:
      "Le meilleur professeur de Grid : l'inspecteur de grille du navigateur.",
    blocks: [
      {
        kind: "list",
        items: [
          "Firefox et Chrome affichent un badge « grid » à côté des conteneurs dans l'inspecteur : cliquez dessus pour superposer les lignes, numéros et zones.",
          "L'overlay montre les numéros de lignes, les noms de zones et les gaps : le placement explicite devient visuel.",
          "Dans l'onglet Styles, les icônes d'édition permettent de tester `align-items`, `justify-content` en direct.",
          "Firefox va plus loin : affichage des pistes implicites et des zones nommées en surbrillance.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-grid",
    title: "Les erreurs les plus courantes",
    level: 2,
    intro:
      "Les pièges classiques des débuts avec Grid.",
    blocks: [
      {
        kind: "list",
        items: [
          "Oublier `display: grid` : les propriétés `grid-*` sont silencieusement ignorées.",
          "`grid-column: 1 / 3` sur une grille de 2 colonnes : l'élément déborde ou crée une piste implicite.",
          "Confondre lignes et pistes : `grid-column: 1 / 3` = de la ligne 1 à la ligne 3, soit 2 colonnes.",
          "`1fr` qui s'écrase à zéro : un contenu trop large ou un `min-width` manquant — voir `minmax()` et la section tailles minimales.",
          "Gaps avec des marges en plus : `gap` suffit, les marges créent des doubles espacements.",
          "Vouloir tout placer explicitement : laissez le placement automatique faire son travail quand l'ordre du DOM suffit.",
          "Zones nommées avec des noms incohérents entre les rangées : chaque rangée doit avoir le même nombre de cellules.",
        ],
      },
    ],
  },
  {
    id: "projet-dashboard-grid",
    title: "Projet : dashboard en grille",
    level: 2,
    intro:
      "Assembler zones nommées, placement et responsive dans un dashboard.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Dessiner le plan en zones",
            detail:
              "Sur papier : header pleine largeur, sidebar, zone de cartes de statistiques, zone de graphiques. Traduisez en `grid-template-areas`.",
          },
          {
            title: "Déclarer la grille desktop",
            detail:
              "`grid-template-columns: 240px repeat(11, 1fr)` (12 colonnes au total), zones nommées, `gap: 1.5rem`.",
          },
          {
            title: "Placer les cartes de stats",
            detail:
              "Conteneur interne en `repeat(auto-fit, minmax(200px, 1fr))` : les cartes s'adaptent toutes seules.",
          },
          {
            title: "Version mobile",
            detail:
              "Media query : une seule colonne, zones réordonnées (`\"header\" \"main\" \"aside\" \"footer\"`), sidebar qui devient une section.",
          },
          {
            title: "Vérifier",
            detail:
              "Overlay DevTools activé, test à 3 largeurs, aucun scroll horizontal, ordre de lecture logique.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "pistes-explicites-implicites",
    title: "Grille explicite vs implicite",
    level: 3,
    intro:
      "Ce qui se passe quand le contenu dépasse la grille déclarée.",
    blocks: [
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "En une phrase",
            value:
              "La grille explicite est celle que vous déclarez (`grid-template-*`) ; la grille implicite est créée automatiquement quand des éléments sont placés hors de la grille déclarée.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Le contenu est souvent dynamique (nombre de cartes inconnu) : plutôt que d'échouer, Grid crée les pistes manquantes à la volée, dimensionnées par `grid-auto-rows` / `grid-auto-columns`.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Listes de longueur inconnue, placement explicite qui dépasse volontairement, galeries auto-générées.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "Par défaut, les pistes implicites sont en `auto` (taille du contenu). Réglez-les explicitement : `grid-auto-rows: minmax(100px, auto)` donne une hauteur cohérente aux rangées créées automatiquement.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Des rangées implicites de hauteur zéro ou incohérente parce que `grid-auto-rows` n'a jamais été défini.",
          },
          {
            label: "Bonne pratique",
            value:
              "Définissez toujours `grid-auto-rows` (et `grid-auto-columns` si besoin) dès que le contenu est dynamique.",
          },
        ],
      },
    ],
  },
  {
    id: "grid-auto-flow",
    title: "grid-auto-flow : l'ordre de remplissage",
    level: 3,
    intro:
      "Contrôler comment les éléments se placent dans les trous.",
    blocks: [
      {
        kind: "table",
        headers: ["Valeur", "Comportement", "Usage"],
        rows: [
          ["`row` (défaut)", "Remplit ligne par ligne", "Le cas général"],
          ["`column`", "Remplit colonne par colonne", "Timelines verticales, colonnes de journal"],
          ["`dense`", "Rebouche les trous avec les éléments suivants", "Galeries (voir packing dense)"],
          ["`row dense` / `column dense`", "Combinaisons", "Remplissage optimisé dans un sens"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Remplissage en colonnes",
        code: `.timeline {\n  display: grid;\n  grid-template-rows: repeat(4, auto);\n  grid-auto-flow: column; /* remplit la 1re colonne, puis la 2e… */\n}`,
      },
    ],
  },
  {
    id: "dense-packing",
    title: "Le remplissage dense",
    level: 3,
    intro:
      "Reboucher les trous laissés par les éléments de tailles variées.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Galerie dense",
        code: `.galerie {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-auto-rows: 150px;\n  grid-auto-flow: dense; /* les petits éléments comblent les trous */\n  gap: 0.75rem;\n}\n\n/* Quelques éléments plus grands, placés où ils tombent */\n.galerie .paysage { grid-column: span 2; }\n.galerie .portrait { grid-row: span 2; }`,
      },
      {
        kind: "text",
        text: "Sans `dense`, un grand élément laisse un trou que les suivants ne comblent pas (ils avancent ligne par ligne). Avec `dense`, Grid revient en arrière pour caser les petits éléments dans les trous. Attention à l'accessibilité : l'ordre visuel peut alors différer de l'ordre du DOM — à réserver aux galeries où l'ordre n'est pas signifiant.",
      },
    ],
  },
  {
    id: "subgrid",
    title: "Subgrid : l'alignement parfait",
    level: 3,
    intro:
      "Une grille imbriquée qui hérite des pistes de son parent.",
    blocks: [
      {
        kind: "text",
        text: "Le problème : des cartes dans une grille parente ont chacune leur propre contenu (titre, texte, bouton) ; aligner les boutons de toutes les cartes sur la même ligne est impossible si chaque carte est une grille indépendante. La solution : `grid-template-columns: subgrid` sur la carte — elle adopte les pistes du parent, et ses enfants s'alignent sur la grille globale.",
      },
      {
        kind: "code",
        language: "css",
        title: "Cartes alignées via subgrid",
        code: `.grille {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto 1fr auto; /* titre / texte / bouton */\n  gap: 1rem;\n}\n\n.carte {\n  display: grid;\n  grid-template-rows: subgrid; /* hérite des 3 rangées du parent */\n  grid-row: span 3;            /* occupe les 3 rangées */\n}\n/* Les boutons de toutes les cartes sont sur la même ligne. */`,
      },
      {
        kind: "list",
        items: [
          "Support : tous les navigateurs modernes depuis 2023 — utilisable sans repli complexe.",
          "`subgrid` peut hériter des colonnes, des rangées, ou des deux.",
          "La carte doit déclarer `grid-row: span N` pour couvrir les pistes héritées.",
        ],
      },
    ],
  },
  {
    id: "minmax-detail",
    title: "minmax() en détail",
    level: 3,
    intro:
      "Les combinaisons qui font des pistes robustes.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Combinaisons utiles",
        code: `/* Colonne : 200px minimum, extensible */\n.minmax-simple { grid-template-columns: minmax(200px, 1fr) 2fr; }\n\n/* Jamais plus petit que le contenu, jamais plus grand que 400px */\n.securise { grid-template-columns: minmax(min-content, 400px) 1fr; }\n\n/* Piste qui s'efface si vide mais grandit si besoin */\n.souple { grid-template-columns: minmax(0, max-content) 1fr; }`,
      },
      {
        kind: "list",
        items: [
          "`minmax(0, 1fr)` : le `0` autorise la piste à rétrécir sous la taille de son contenu — indispensable contre les débordements (voir tailles minimales).",
          "Le minimum gagne toujours : si le contenu dépasse le maximum, la piste grandit (sauf contrainte externe).",
          "`minmax()` imbriqués ou avec `auto` : testez à plusieurs largeurs, les interactions sont subtiles.",
        ],
      },
    ],
  },
  {
    id: "auto-fill-vs-auto-fit",
    title: "auto-fill vs auto-fit",
    level: 3,
    intro:
      "La subtilité la plus demandée de Grid, expliquée une fois pour toutes.",
    blocks: [
      {
        kind: "table",
        headers: ["", "`auto-fill`", "`auto-fit`"],
        rows: [
          ["Pistes vides", "Conservées (colonnes fantômes vides)", "Réduites à zéro et l'espace est redistribué"],
          ["Effet visuel", "Les éléments gardent leur taille, trous à droite", "Les éléments s'étirent pour remplir"],
          ["Quand l'utiliser", "On veut des colonnes de taille fixe même incomplètes", "On veut remplir toute la largeur (le cas courant)"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Voir la différence",
        code: `/* 3 éléments dans un conteneur large : */\n/* auto-fill → 3 colonnes de 250px + vide à droite */\n/* auto-fit  → 3 colonnes étirées sur toute la largeur */\n.fill { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }\n.fit  { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }`,
      },
    ],
  },
  {
    id: "sizing-keywords",
    title: "Les mots-clés de dimensionnement",
    level: 3,
    intro:
      "`auto`, `min-content`, `max-content`, `fit-content` : le vocabulaire des tailles intrinsèques.",
    blocks: [
      {
        kind: "table",
        headers: ["Mot-clé", "Signification", "Exemple d'usage"],
        rows: [
          ["`auto`", "Taille « naturelle » selon le contexte", "Colonne qui s'adapte au contenu disponible"],
          ["`min-content`", "La plus petite taille sans débordement (le mot le plus long)", "Éviter qu'une colonne s'écrase sous son contenu"],
          ["`max-content`", "La taille du contenu non contraint (pas de retour à la ligne)", "Menu qui doit tenir sur une ligne"],
          ["`fit-content(X)`", "`max-content` plafonné à X", "`fit-content(300px)` : s'adapte jusqu'à 300 px"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Sidebar à la taille de son contenu",
        code: `.layout {\n  /* La sidebar fait la taille de son contenu, le reste est flexible */\n  grid-template-columns: fit-content(280px) 1fr;\n}`,
      },
    ],
  },
  {
    id: "chevauchement",
    title: "Chevauchements contrôlés",
    level: 3,
    intro:
      "Superposer des éléments dans la grille : layouts éditoriaux.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Image et légende superposées",
        code: `.edito {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n}\n\n.edito img {\n  grid-column: 1 / 9;\n  grid-row: 1;\n}\n.edito .legende {\n  grid-column: 7 / 13; /* chevauche l'image sur 2 colonnes */\n  grid-row: 1;\n  align-self: end;\n  z-index: 1; /* la légende passe devant */\n}`,
      },
      {
        kind: "list",
        items: [
          "Deux éléments sur les mêmes lignes/colonnes se superposent : l'ordre du DOM définit l'empilement (modifié par `z-index`).",
          "Technique des layouts magazine : image qui déborde, texte qui chevauche, citations en surimpression.",
          "Accessibilité : l'ordre de lecture (DOM) doit rester logique même si le visuel superpose.",
        ],
      },
    ],
  },
  {
    id: "ordre-visuel-accessibilite",
    title: "Ordre visuel et accessibilité",
    level: 3,
    intro:
      "Grid permet de réordonner visuellement : un pouvoir à manier avec prudence.",
    blocks: [
      {
        kind: "text",
        text: "Placer un élément sur des lignes différentes de sa position dans le DOM change l'ordre visuel sans changer l'ordre de tabulation ni l'ordre de lecture des lecteurs d'écran. Un écart modéré est acceptable (ex. sidebar après le contenu en DOM mais affichée à gauche) ; un réordonnancement complet crée une incohérence grave entre ce qu'on voit, ce qu'on tabule et ce qu'on entend.",
      },
      {
        kind: "list",
        items: [
          "Règle : l'ordre du DOM doit raconter la même histoire que l'ordre visuel.",
          "`order` existe aussi en Grid : même prudence qu'en Flexbox.",
          "Testez au clavier après tout réordonnancement : le focus doit suivre un parcours sensé.",
        ],
      },
    ],
  },
  {
    id: "grilles-imbriquees",
    title: "Grilles imbriquées",
    level: 3,
    intro:
      "Composer des layouts complexes par emboîtement — et savoir quand utiliser subgrid.",
    blocks: [
      {
        kind: "text",
        text: "Une cellule de grille peut elle-même être un conteneur grid : c'est l'emboîtement classique. Limite : la grille enfant est indépendante — ses pistes ne s'alignent pas avec celles du parent. Quand l'alignement doit traverser les niveaux (boutons de cartes alignés), préférez `subgrid` ; quand chaque zone est autonome (un dashboard de widgets), l'emboîtement simple suffit.",
      },
      {
        kind: "code",
        language: "css",
        title: "Emboîtement classique",
        code: `.page {\n  display: grid;\n  grid-template-areas: "header header" "main aside";\n}\n\n.main {\n  display: grid; /* grille indépendante dans la zone main */\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}`,
      },
    ],
  },
  {
    id: "alignement-detail-grid",
    title: "Alignement : les cas subtils",
    level: 3,
    intro:
      "Baseline, stretch et les interactions avec les tailles.",
    blocks: [
      {
        kind: "list",
        items: [
          "`align-items: baseline` : aligne les textes des cellules sur leur ligne de base — précieux pour des cartes aux titres de tailles variées.",
          "`stretch` (défaut) : l'élément remplit sa cellule — mais seulement s'il n'a pas de taille explicite qui s'y oppose.",
          "`justify-content: space-between` sur la grille entière : répartit les pistes quand le conteneur est plus grand que la grille.",
          "`place-self` sur un enfant surcharge l'alignement du conteneur pour cet élément seul.",
          "Attention : `margin: auto` sur un enfant de grille centre aussi (les marges auto absorbent l'espace libre) — une alternative parfois plus simple.",
        ],
      },
    ],
  },
  {
    id: "tailles-minimales",
    title: "Le piège des tailles minimales",
    level: 3,
    intro:
      "Pourquoi une colonne `1fr` refuse parfois de rétrécir — et comment corriger.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, un élément de grille a `min-width: auto` (et `min-height: auto`) : il refuse de rétrécir sous la taille de son contenu. Conséquence : une colonne `1fr` contenant un long mot ou une image large déborde au lieu de rétrécir, cassant le layout. La correction standard : `min-width: 0` (ou `min-height: 0`) sur l'enfant, ou `minmax(0, 1fr)` sur la piste.",
      },
      {
        kind: "code",
        language: "css",
        title: "La correction",
        code: `/* Piste qui peut vraiment rétrécir */\n.grille { grid-template-columns: minmax(0, 1fr) 300px; }\n\n/* Ou sur l'enfant qui déborde */\n.cellule {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}`,
      },
    ],
  },
  {
    id: "responsive-strategies",
    title: "Stratégies responsives",
    level: 3,
    intro:
      "Trois approches, du plus simple au plus puissant.",
    blocks: [
      {
        kind: "table",
        headers: ["Approche", "Principe", "Quand l'utiliser"],
        rows: [
          ["`auto-fit` + `minmax()`", "La grille s'adapte seule", "Galeries, cartes, dashboards — le choix par défaut"],
          ["Redéfinition des zones", "`grid-template-areas` différent par breakpoint", "Layouts éditoriaux qui se réorganisent"],
          ["Container queries", "La grille réagit à son conteneur, pas au viewport", "Composants réutilisés dans des contextes variés"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Zones redéfinies par breakpoint",
        code: `.page {\n  display: grid;\n  grid-template-areas:\n    "header"\n    "main"\n    "aside"\n    "footer";\n}\n\n@media (min-width: 900px) {\n  .page {\n    grid-template-columns: 1fr 300px;\n    grid-template-areas:\n      "header header"\n      "main   aside"\n      "footer footer";\n  }\n}`,
      },
    ],
  },
  {
    id: "container-queries",
    title: "Container queries",
    level: 3,
    intro:
      "Le responsive basé sur le conteneur, pas sur l'écran.",
    blocks: [
      {
        kind: "text",
        text: "Les media queries réagissent à la fenêtre ; les container queries réagissent à la taille du conteneur parent. Pour un composant grille réutilisé (une carte affichée en pleine page ou dans une sidebar), c'est la bonne granularité : le composant s'adapte à la place qu'on lui donne, où qu'il soit.",
      },
      {
        kind: "code",
        language: "css",
        title: "Grille qui s'adapte à son conteneur",
        code: `/* 1. Déclarer le conteneur */\n.wrapper {\n  container-type: inline-size;\n}\n\n/* 2. La grille réagit à la largeur du wrapper */\n.cartes { display: grid; gap: 1rem; }\n\n@container (min-width: 600px) {\n  .cartes { grid-template-columns: repeat(3, 1fr); }\n}`,
      },
      {
        kind: "list",
        items: [
          "Support : tous les navigateurs modernes — utilisable en production.",
          "`container-type: inline-size` : le conteneur observe sa propre largeur.",
          "Complémentaire de Grid, pas concurrent : la query décide, la grille dispose.",
        ],
      },
    ],
  },
  {
    id: "layout-12-colonnes",
    title: "Le système 12 colonnes",
    level: 3,
    intro:
      "Le classique des design systems, en Grid natif.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "12 colonnes, placements expressifs",
        code: `.grille-12 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 1.5rem;\n}\n\n/* Placement en \"colonnes de 12\" : lisible et standard */\n.contenu-principal { grid-column: 1 / 9; }   /* 8 colonnes */\n.sidebar           { grid-column: 9 / 13; }  /* 4 colonnes */\n.pleine-largeur    { grid-column: 1 / -1; }  /* toutes (-1 = dernière ligne) */\n\n@media (max-width: 800px) {\n  .contenu-principal, .sidebar { grid-column: 1 / -1; }\n}`,
      },
      {
        kind: "text",
        text: "Le 12 se divise par 2, 3, 4 et 6 : c'est pourquoi ce nombre domine les grilles depuis l'imprimerie. En Grid natif, plus besoin de framework : `repeat(12, 1fr)` + placements suffisent.",
      },
    ],
  },
  {
    id: "magazine-layout",
    title: "Layout magazine",
    level: 3,
    intro:
      "Chevauchements, asymétries et hiérarchie éditoriale.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Article avec image en débordement",
        code: `.article {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 1rem;\n}\n\n.article .titre {\n  grid-column: 2 / 12;\n  font-size: clamp(2rem, 5vw, 4rem);\n}\n.article .image {\n  grid-column: 1 / 9;\n  grid-row: 2;\n}\n.article .texte {\n  grid-column: 7 / 13; /* chevauche l'image */\n  grid-row: 2;\n  align-self: center;\n  background: white;\n  padding: 2rem;\n}\n.article .citation {\n  grid-column: 3 / 11;\n  font-size: 1.5rem;\n}`,
      },
      {
        kind: "text",
        text: "La grille 12 colonnes + les chevauchements contrôlés produisent des mises en page éditoriales riches sans positionnement absolu fragile : tout reste dans le flux, le responsive consiste à redéfinir les placements.",
      },
    ],
  },
  {
    id: "aspect-ratio-grid",
    title: "Ratios avec aspect-ratio",
    level: 3,
    intro:
      "Des cellules aux proportions constantes, sans hack padding.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Galerie aux ratios constants",
        code: `.galerie {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1rem;\n}\n\n.galerie img {\n  width: 100%;\n  height: 100%;\n  aspect-ratio: 4 / 3; /* ratio constant, quelle que soit la colonne */\n  object-fit: cover;   /* l'image remplit sans se déformer */\n}`,
      },
      {
        kind: "list",
        items: [
          "`aspect-ratio: 16 / 9`, `1 / 1`, `4 / 3` : la boîte garde ses proportions pendant que la grille redimensionne.",
          "Combiné à `object-fit: cover` pour les images : pas de déformation, recadrage automatique.",
          "Remplace l'ancien hack `padding-top: 56.25%` : plus lisible, plus robuste.",
        ],
      },
    ],
  },
  {
    id: "grid-vs-flexbox",
    title: "Grid ou Flexbox : décider",
    level: 3,
    intro:
      "Le guide de décision définitif, avec les cas mixtes.",
    blocks: [
      {
        kind: "table",
        headers: ["Situation", "Choix", "Pourquoi"],
        rows: [
          ["Barre de navigation, groupe de boutons", "Flexbox", "Une dimension, distribution simple"],
          ["Centrer un élément", "Flexbox (ou Grid)", "Les deux font `place-items: center` / `justify-content: center`"],
          ["Grille de cartes responsive", "Grid", "`auto-fit` + `minmax()`, imbattable"],
          ["Layout de page (header/sidebar/main)", "Grid", "Deux dimensions, zones nommées lisibles"],
          ["Liste d'éléments en ligne qui s'enroule", "Flexbox (`flex-wrap`)", "Flux unidimensionnel naturel"],
          ["Dashboard, magazine", "Grid", "Placement 2D, chevauchements"],
          ["Aligner des boutons de cartes", "Grid + subgrid", "Alignement à travers les niveaux"],
        ],
      },
      {
        kind: "text",
        text: "En cas de doute : une dimension = Flexbox, deux dimensions = Grid. Et n'hésitez pas à imbriquer : une page en Grid dont les cartes internes sont en Flexbox est l'architecture la plus courante du web moderne.",
      },
    ],
  },
  {
    id: "grid-vs-table",
    title: "Grid ne remplace pas les tableaux",
    level: 3,
    intro:
      "Mise en page vs données tabulaires : ne pas confondre.",
    blocks: [
      {
        kind: "text",
        text: "CSS Grid sert à la mise en page. Pour des données tabulaires (lignes et colonnes de données liées), l'élément `<table>` reste obligatoire : lui seul donne aux lecteurs d'écran la structure lignes/colonnes/en-têtes. Recréer un « tableau » en Grid avec des `div` est un échec d'accessibilité. Grid pour le layout, `<table>` pour les données.",
      },
    ],
  },
  {
    id: "fallbacks-supports",
    title: "Replis avec @supports",
    level: 3,
    intro:
      "Gérer les fonctionnalités récentes (subgrid) sans casser les anciens navigateurs.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Repli pour subgrid",
        code: `/* Base : fonctionne partout */\n.carte {\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n}\n\n/* Amélioration : là où subgrid est supporté */\n@supports (grid-template-rows: subgrid) {\n  .carte {\n    grid-template-rows: subgrid;\n    grid-row: span 3;\n  }\n}`,
      },
      {
        kind: "text",
        text: "Stratégie : une base fonctionnelle partout, des améliorations sous `@supports`. Grid lui-même est universellement supporté depuis 2017-2018 : le repli ne concerne que les ajouts récents (subgrid, container queries dans de vieux moteurs).",
      },
    ],
  },
  {
    id: "debugging-avance-grid",
    title: "Déboguer les grilles complexes",
    level: 3,
    intro:
      "Méthode systématique quand le layout ne fait pas ce qu'on veut.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Activer l'overlay de grille",
            detail:
              "Badge « grid » dans l'inspecteur : visualisez lignes, zones et gaps. 80 % des problèmes se voient immédiatement.",
          },
          {
            title: "Vérifier les pistes implicites",
            detail:
              "Des éléments mal placés créent des pistes implicites invisibles : l'overlay de Firefox les montre. Corrigez le placement ou définissez `grid-auto-rows`.",
          },
          {
            title: "Isoler le débordement",
            detail:
              "Un élément qui déborde ? Vérifiez `min-width: auto` (voir tailles minimales), les contenus incompressibles (longs mots, images), les `minmax()` sans minimum nul.",
          },
          {
            title: "Tester les largeurs extrêmes",
            detail:
              "320 px et très large : les grilles cassent aux extrêmes, rarement au milieu.",
          },
        ],
      },
    ],
  },
  {
    id: "performance-grid",
    title: "Performance des grilles",
    level: 3,
    intro:
      "Grid est rapide : voici quand même les points de vigilance.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le calcul de grille est optimisé par les navigateurs : des centaines de cellules ne posent pas de problème en soi.",
          "Point de vigilance : les pistes en `auto`/`max-content` forcent la mesure du contenu — avec des milliers d'éléments, préférez des tailles fixes ou `fr`.",
          "`subgrid` ajoute un niveau de calcul : négligeable en pratique, à noter sur des grilles géantes.",
          "Évitez de changer `grid-template-*` à chaque frame en JS (ex. au scroll) : c'est un recalcul de layout complet à chaque fois.",
        ],
      },
    ],
  },
  {
    id: "erreurs-subtiles-grid",
    title: "Erreurs subtiles de niveau avancé",
    level: 3,
    intro:
      "Les pièges qui persistent après des mois de pratique.",
    blocks: [
      {
        kind: "list",
        items: [
          "`1fr` traité comme `minmax(auto, 1fr)` : la piste refuse de rétrécir sous son contenu — utilisez `minmax(0, 1fr)` explicitement quand c'est voulu.",
          "`gap` en pourcentage : se calcule sur la largeur du conteneur, même pour `row-gap` — surprenant.",
          "Pourcentages dans `grid-template` : relatifs au conteneur, gaps non déduits — préférez `fr` pour partager l'espace restant.",
          "Éléments positionnés en absolu dans une cellule : ils se placent par rapport à la grille, pas à la cellule (sauf `position: relative` sur l'enfant).",
          "`dense` qui réordonne visuellement : vérifié pour les galeries, interdit pour les contenus ordonnés.",
          "Zones nommées : un nom mal orthographié dans `grid-area` place l'élément en automatique, silencieusement.",
        ],
      },
    ],
  },
  {
    id: "projet-layout-magazine-grid",
    title: "Projet : layout magazine complet",
    level: 3,
    intro:
      "Une page éditoriale riche : le projet de synthèse Grid.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Maquetter sur 12 colonnes",
            detail:
              "Titre à cheval, image en débordement, texte en chevauchement, citation pleine largeur, galerie dense en fin d'article.",
          },
          {
            title: "Construire la grille desktop",
            detail:
              "`repeat(12, 1fr)`, placements explicites, chevauchements avec `z-index`, `aspect-ratio` sur les visuels.",
          },
          {
            title: "Décliner en mobile",
            detail:
              "Une colonne, ordre logique préservé, chevauchements supprimés ou adoucis.",
          },
          {
            title: "Valider",
            detail:
              "Overlay DevTools, zoom 200 %, navigation clavier : l'ordre visuel et l'ordre du DOM racontent la même histoire.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-galerie-dense-grid",
    title: "Projet : galerie dense responsive",
    level: 3,
    intro:
      "Une galerie qui remplit chaque trou, sur tous les écrans.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Structure de base",
            detail:
              "`repeat(auto-fit, minmax(200px, 1fr))`, `grid-auto-rows` fixe, `grid-auto-flow: dense`.",
          },
          {
            title: "Varier les tailles",
            detail:
              "Quelques éléments en `span 2` (colonnes ou rangées) : le dense rebouche automatiquement.",
          },
          {
            title: "Ratios constants",
            detail:
              "`aspect-ratio` sur chaque tuile pour une grille régulière malgré les tailles variées.",
          },
          {
            title: "Chargement progressif",
            detail:
              "Skeletons aux mêmes ratios pendant le chargement, apparition en fondu à l'arrivée des images.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-grid",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par les sources officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "W3C — CSS Grid Layout", value: "w3.org/TR/css-grid-1 : la spécification complète du module." },
          { label: "MDN — CSS Grid Layout", value: "developer.mozilla.org/fr/docs/Web/CSS/CSS_grid_layout : guides progressifs et référence." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : Grid Garden (cssgridgarden.com/#fr), le jeu qui enseigne le placement en 28 niveaux.",
          "Référence visuelle : les guides de grille des DevTools Firefox, excellents pour expérimenter.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite-grid",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Grid maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Compléter avec `flexbox` : le duo couvre 100 % des besoins de layout.",
          "Systématiser le responsive : `responsive` (stratégies, container queries).",
          "Animer les layouts : `css-animations` (transitions de grille, apparitions).",
          "Rendre accessible : `accessibility` (ordre visuel vs ordre du DOM).",
          "Revenir à la roadmap : valider CSS Grid et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la Typographie : anatomie, hiérarchie, échelles
 * modulaires, lisibilité et webfonts. 3 niveaux (Aperçu / Pratique / Approfondi).
 */
export const LEARNING_TYPOGRAPHIE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Pourquoi la typographie est le fondement silencieux de toute interface.",
    blocks: [
      {
        kind: "text",
        text: "Le texte représente l'essentiel de ce qu'affiche une interface : menus, boutons, formulaires, contenus. La typographie — choix des polices, tailles, graisses, interlignages — détermine si tout cela est lisible, structuré et agréable. Une mauvaise typographie rend tout illisible ; une bonne passe inaperçue.",
      },
      {
        kind: "text",
        text: "Bonne nouvelle : la typographie d'interface repose sur quelques règles mesurables, pas sur le talent. Hiérarchie claire, échelle cohérente, longueur de ligne maîtrisée, contrastes suffisants : appliquez ces quatre principes et vous serez devant la majorité des interfaces.",
      },
      {
        kind: "list",
        items: [
          "La typographie structure l'information avant même la couleur ou les images.",
          "Quatre leviers : hiérarchie, échelle, espacement, contraste.",
          "Tout se mesure : tailles en px, ratios, longueurs de ligne en caractères.",
        ],
      },
    ],
  },
  {
    id: "anatomie-30-secondes",
    title: "L'anatomie en 30 secondes",
    level: 1,
    intro:
      "Le vocabulaire minimal pour parler de lettres sans se tromper.",
    blocks: [
      {
        kind: "diagram",
        title: "Anatomie d'une lettre",
        lines: [
          "        ┌─ hauteur d'ascendante (b, d, h)",
          "        │",
          "  ──────┼──────────────────",
          "        │   ╭──╮",
          "        │   │  │  ← chasse (largeur)",
          "  ──────┼───╯  ╰──────────  hauteur d'x (x, a, e)",
          "        │",
          "  ──────┼──────────────────  ligne de base",
          "        │      │",
          "        └──────┘  ← hauteur de descendante (p, g, y)",
          "",
          "  GRAISSE = épaisseur du trait (Regular 400, Bold 700)",
          "  INTERLIGNAGE = distance entre deux lignes de base",
        ],
      },
      {
        kind: "list",
        items: [
          "Hauteur d'x : la hauteur des lettres sans ascendante (x, a, e). Deux polices à 16 px peuvent paraître de tailles très différentes selon leur hauteur d'x.",
          "Graisse : l'épaisseur du trait, mesurée de 100 à 900. Regular = 400, Bold = 700.",
          "Interlignage (line-height) : l'espace vertical entre les lignes. Trop serré, le texte étouffe ; trop large, les lignes ne se suivent plus.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "mise-en-place",
    title: "Mise en place",
    level: 2,
    intro:
      "Les outils concrets pour travailler la typographie dès maintenant.",
    blocks: [
      {
        kind: "fields",
        title: "Le kit typographique",
        fields: [
          {
            label: "Google Fonts (fonts.google.com)",
            value:
              "Bibliothèque de polices gratuites et libres : parcourez, testez en direct, intégrez via un lien ou en local.",
          },
          {
            label: "Figma — styles de texte",
            value:
              "Créez des styles nommés (Titre/H1, Corps, Légende) : changer une taille met à jour tout le fichier.",
          },
          {
            label: "Type Scale (type-scale.com)",
            value:
              "Générateur visuel d'échelles modulaires : choisissez une base et un ratio, copiez les valeurs.",
          },
          {
            label: "Stark ou WebAIM Contrast Checker",
            value:
              "Vérification des ratios de contraste : indispensable avant de valider une couleur de texte.",
          },
        ],
      },
    ],
  },
  {
    id: "anatomie-bases",
    title: "Anatomie : les termes essentiels",
    level: 2,
    intro:
      "Le vocabulaire qui permet de décrire précisément un problème typographique.",
    blocks: [
      {
        kind: "fields",
        title: "Lexique de base",
        fields: [
          {
            label: "Empattement (serif)",
            value:
              "Les petites pattes aux extrémités des lettres (Georgia, Merriweather). Traditionnellement associées à la lecture longue sur papier.",
          },
          {
            label: "Sans empattement (sans-serif)",
            value:
              "Lettres aux traits nets (Inter, Roboto, Helvetica). Le standard des interfaces numériques.",
          },
          {
            label: "Chasse",
            value:
              "La largeur d'une lettre. Une chasse trop étroite tasse le texte, trop large le disperse.",
          },
          {
            label: "Approche (tracking)",
            value:
              "L'espacement uniforme entre toutes les lettres d'un bloc. S'utilise avec parcimonie, surtout en capitales.",
          },
          {
            label: "Crénage (kerning)",
            value:
              "L'ajustement de l'espace entre deux lettres spécifiques (ex. « AV »). Géré par la police, rarement à régler à la main en UI.",
          },
        ],
      },
    ],
  },
  {
    id: "hierarchie-pratique",
    title: "Construire une hiérarchie",
    level: 2,
    intro:
      "La hiérarchie typographique : faire comprendre la structure avant la lecture.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Listez les niveaux de texte",
            detail:
              "Inventoriez tous les rôles : titre de page, titre de section, corps, légende, bouton, erreur. Rarement plus de 6 niveaux.",
          },
          {
            title: "Attribuez taille + graisse à chacun",
            detail:
              "Chaque niveau se distingue par au moins deux attributs (ex. taille ET graisse). Un seul attribut ne suffit pas à créer une hiérarchie lisible.",
          },
          {
            title: "Testez en plissant les yeux",
            detail:
              "Floutez mentalement l'écran : la structure doit rester visible (gros titres, blocs de texte, éléments secondaires). Si tout se confond, la hiérarchie est trop timide.",
          },
          {
            title: "Vérifiez la cohérence",
            detail:
              "Un même niveau = mêmes attributs partout. Deux titres de même importance avec des tailles différentes cassent la hiérarchie.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : l'écart entre niveaux doit être franc. Une différence de 2 px entre deux titres est invisible ; visez des sauts nets (16 → 20 → 24 → 32).",
      },
    ],
  },
  {
    id: "echelle-modulaire",
    title: "Échelle modulaire",
    level: 2,
    intro:
      "Remplacer les tailles au hasard par un système : base × ratio.",
    blocks: [
      {
        kind: "text",
        text: "Une échelle modulaire génère toutes les tailles à partir d'une taille de base (souvent 16 px) multipliée par un ratio constant (1.25, 1.333…). Le résultat : des tailles harmonieuses au lieu de valeurs choisies à l'instinct sur chaque écran.",
      },
      {
        kind: "code",
        language: "css",
        title: "Échelle modulaire en CSS (base 16 px, ratio 1.25)",
        code: ":root {\n  --text-xs: 0.64rem;    /* 10.24px — micro-labels */\n  --text-sm: 0.8rem;     /* 12.8px  — légendes */\n  --text-base: 1rem;     /* 16px    — corps de texte */\n  --text-lg: 1.25rem;    /* 20px    — chapeaux, intertitres */\n  --text-xl: 1.563rem;   /* 25px    — titres de section */\n  --text-2xl: 1.953rem;  /* 31.25px — titres de page */\n  --text-3xl: 2.441rem;  /* 39px    — hero */\n}",
      },
      {
        kind: "list",
        items: [
          "Ratios courants : 1.125 (doux), 1.25 (standard UI), 1.333 (éditorial), 1.5 (contraste fort).",
          "Nommez les niveaux par rôle (`--text-heading`), pas par taille (`--text-24`) : les rôles survivent aux refontes.",
          "Arrondissez au besoin pour les petites tailles, mais gardez la progression géométrique pour les titres.",
        ],
      },
    ],
  },
  {
    id: "graisses",
    title: "Utiliser les graisses",
    level: 2,
    intro:
      "La graisse est un outil de hiérarchie, pas de décoration.",
    blocks: [
      {
        kind: "list",
        items: [
          "Limitez-vous à 2 ou 3 graisses par interface : Regular (400) pour le corps, Medium/SemiBold (500-600) pour l'emphase, Bold (700) pour les titres forts.",
          "N'utilisez jamais de graisse inférieure à 400 pour du texte courant : en dessous, la lisibilité s'effondre sur les écrans basse résolution.",
          "La graisse ne remplace pas la taille : un titre en 16 px bold reste un texte de 16 px. Combinez les deux pour une hiérarchie nette.",
          "Attention au faux gras : si la police ne propose pas de graisse bold, le navigateur l'imite en épaississant — le résultat est laid. Chargez les vraies graisses.",
        ],
      },
    ],
  },
  {
    id: "interlignage-ligne",
    title: "Interlignage et longueur de ligne",
    level: 2,
    intro:
      "Les deux paramètres qui font la lisibilité d'un paragraphe.",
    blocks: [
      {
        kind: "fields",
        title: "Valeurs de référence",
        fields: [
          {
            label: "Interlignage (line-height)",
            value:
              "1.5 à 1.7 pour le corps de texte ; 1.1 à 1.3 pour les titres. Plus la ligne est longue, plus l'interlignage doit être généreux.",
          },
          {
            label: "Longueur de ligne",
            value:
              "45 à 75 caractères par ligne pour le texte courant. En dessous, le rythme de lecture est haché ; au-dessus, l'œil perd le début de la ligne suivante.",
          },
          {
            label: "En CSS",
            value:
              "`line-height: 1.6` et `max-width: 65ch` : l'unité `ch` vaut la largeur du caractère « 0 », idéale pour contraindre une mesure.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Paragraphe lisible",
        code: ".prose {\n  font-size: 1rem;        /* 16px */\n  line-height: 1.6;        /* interlignage généreux */\n  max-width: 65ch;         /* 45-75 caractères par ligne */\n}\n.prose h2 {\n  font-size: 1.563rem;\n  line-height: 1.2;        /* titres : interlignage resserré */\n  margin-top: 2em;\n  margin-bottom: 0.5em;\n}",
      },
    ],
  },
  {
    id: "paires-polices",
    title: "Associer deux polices",
    level: 2,
    intro:
      "Le pairing : quand (et comment) utiliser deux familles.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Demandez-vous si c'est nécessaire",
            detail:
              "Une seule famille bien utilisée (plusieurs graisses) suffit dans 80 % des interfaces. N'ajoutez une seconde police que pour un contraste voulu.",
          },
          {
            title: "Contrastez avec intention",
            detail:
              "Les paires qui fonctionnent opposent deux caractères : serif éditorial + sans-serif neutre pour le corps, ou sans-serif géométrique pour les titres + sans-serif humaniste pour le texte.",
          },
          {
            title: "Vérifiez la compatibilité",
            detail:
              "Les deux polices doivent partager une hauteur d'x proche et un rendu cohérent aux mêmes tailles. Testez-les côte à côte à 16 px.",
          },
          {
            title: "Limitez à deux familles",
            detail:
              "Jamais plus de deux familles dans une interface. Chaque famille supplémentaire dilue l'identité et alourdit le chargement.",
          },
        ],
      },
    ],
  },
  {
    id: "systeme-vs-web",
    title: "Polices système vs webfonts",
    level: 2,
    intro:
      "Choisir entre les polices de l'appareil et les polices chargées : arbitrages réels.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Polices système", "Webfonts"],
        rows: [
          [
            "Rendu",
            "Optimales sur chaque OS (-apple-system, Segoe UI, Roboto)",
            "Identiques partout, contrôle total de l'identité",
          ],
          [
            "Performance",
            "Zéro chargement, affichage instantané",
            "Requête réseau, risque de texte invisible (FOIT)",
          ],
          [
            "Usage typique",
            "Apps natives, produits utilitaires",
            "Sites de marque, produits à forte identité",
          ],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Pile de polices système",
        code: "body {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\",\n    Roboto, \"Helvetica Neue\", Arial, sans-serif;\n}",
      },
    ],
  },
  {
    id: "charger-webfonts",
    title: "Charger des webfonts proprement",
    level: 2,
    intro:
      "Éviter le texte invisible et les sauts de mise en page au chargement.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Déclaration font-face correcte",
        code: "@font-face {\n  font-family: \"Inter\";\n  src: url(\"/fonts/inter-var.woff2\") format(\"woff2\");\n  font-weight: 100 900;      /* plage pour les polices variables */\n  font-display: swap;        /* affiche le texte avec un fallback, puis permute */\n}",
      },
      {
        kind: "list",
        items: [
          "`font-display: swap` : le texte s'affiche immédiatement avec une police de secours, puis bascule quand la webfont arrive. Sans ça, le texte reste invisible pendant le chargement (FOIT).",
          "Format woff2 uniquement pour le web : le plus léger, supporté par tous les navigateurs modernes.",
          "Préchargez la graisse principale : `<link rel=\"preload\" href=\"/fonts/inter-var.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>`.",
          "Limitez les graisses chargées : chaque graisse est un fichier. Regular + Medium + Bold suffisent — chaque fichier supplémentaire ralentit la page.",
        ],
      },
    ],
  },
  {
    id: "lisibilite-checklist",
    title: "Checklist lisibilité",
    level: 2,
    intro:
      "Les contrôles à passer sur chaque écran avant de valider.",
    blocks: [
      {
        kind: "list",
        items: [
          "Corps de texte à 16 px minimum (14 px toléré pour du texte secondaire dense, jamais en dessous).",
          "Contraste texte/fond à 4.5:1 minimum (WCAG AA), 3:1 pour les grands titres.",
          "Longueur de ligne entre 45 et 75 caractères pour les paragraphes.",
          "Interlignage d'au moins 1.5 pour le corps de texte.",
          "Pas de paragraphe justifié sur écran : l'alignement à gauche donne un rythme de lecture régulier.",
          "Pas de texte en image pour du contenu informatif : non sélectionnable, non indexé, non accessible.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les fautes de typographie les plus fréquentes dans les interfaces.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est un problème", "Correction"],
        rows: [
          [
            "Trop de tailles différentes",
            "Aucune hiérarchie perceptible",
            "Échelle modulaire, 5-6 niveaux nommés",
          ],
          [
            "Texte gris clair sur fond blanc",
            "Contraste insuffisant, illisible pour beaucoup",
            "Vérifier 4.5:1 minimum avec un outil",
          ],
          [
            "Interlignage à 1.0 sur du texte courant",
            "Les lignes se touchent, lecture pénible",
            "1.5 à 1.7 pour le corps",
          ],
          [
            "Capitales sur de longs textes",
            "30 % plus lent à lire, ton agressif",
            "Capitales réservées aux labels courts",
          ],
          [
            "Souligné pour autre chose que des liens",
            "L'utilisateur s'attend à pouvoir cliquer",
            "Souligné = lien, sans exception",
          ],
          [
            "Centré sur plusieurs lignes",
            "Début de ligne imprévisible, lecture hachée",
            "Centré pour les titres courts uniquement",
          ],
        ],
      },
    ],
  },
  {
    id: "exercice-15-min",
    title: "Exercice 15 minutes",
    level: 2,
    intro:
      "Un exercice concret pour ancrer les bases.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Prenez un écran existant",
            detail:
              "Capturez une page avec beaucoup de texte (article, tableau de bord, formulaire).",
          },
          {
            title: "Comptez les tailles",
            detail:
              "Listez toutes les tailles de texte utilisées. Au-delà de 6-7 tailles distinctes, il y a un problème.",
          },
          {
            title: "Appliquez une échelle",
            detail:
              "Remplacez par 5 niveaux d'une échelle modulaire (ratio 1.25). Attribuez un rôle à chaque niveau.",
          },
          {
            title: "Vérifiez",
            detail:
              "Contrastes, longueur de ligne, interlignage. Comparez avant/après : la différence est immédiate.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "classification-polices",
    title: "Classification des polices",
    level: 3,
    intro:
      "Savoir nommer les familles de caractères pour choisir en connaissance de cause.",
    blocks: [
      {
        kind: "fields",
        title: "Les grandes familles",
        fields: [
          {
            label: "Humanistes",
            value:
              "Proportions proches de l'écriture manuscrite (Verdana, Gill Sans) : chaleureuses, très lisibles en petit corps.",
          },
          {
            label: "Géométriques",
            value:
              "Construites sur des formes pures (Futura, Poppins) : modernes, mais parfois froides et moins lisibles en texte long.",
          },
          {
            label: "Grotesques / néo-grotesques",
            value:
              "Sans-serif neutres (Helvetica, Inter, Roboto) : le standard des interfaces, efficaces et discrets.",
          },
          {
            label: "Serifs de lecture",
            value:
              "Empattements pensés pour l'écran (Georgia, Merriweather, Source Serif) : excellents pour le contenu éditorial long.",
          },
          {
            label: "Monospace",
            value:
              "Chasse fixe (JetBrains Mono, IBM Plex Mono) : code, données tabulaires, tout ce qui s'aligne en colonnes.",
          },
        ],
      },
    ],
  },
  {
    id: "anatomie-avancee",
    title: "Anatomie avancée",
    level: 3,
    intro:
      "Le vocabulaire précis pour diagnostiquer finement.",
    blocks: [
      {
        kind: "table",
        headers: ["Terme", "Définition", "Impact pratique"],
        rows: [
          ["Pan­se", "La partie arrondie du « a », « e », « o »", "Des panses ouvertes améliorent la lisibilité en petit corps"],
          ["Fût", "Le trait vertical principal d'une lettre", "Son épaisseur définit la graisse perçue"],
          ["Œil", "Le contre-forme fermée du « e »", "Un œil petit rend le « e » illisible en petit corps"],
          ["Liaison", "Le trait qui relie dans les cursives", "—"],
          ["Apex", "La pointe haute du « A »", "Détail de finition, signe de qualité du dessin"],
          ["Goutte", "La terminaison arrondie (ex. du « a »)", "Donne le caractère humaniste d'une police"],
        ],
      },
      {
        kind: "text",
        text: "En pratique UI, deux critères dominent le choix : une hauteur d'x généreuse (lisibilité en petit corps) et des formes ouvertes (a, e, s bien différenciés). C'est ce qui distingue Inter ou Source Sans des polices décoratives.",
      },
    ],
  },
  {
    id: "ratios-echelles",
    title: "Les ratios d'échelle",
    level: 3,
    intro:
      "Choisir son ratio selon l'effet recherché.",
    blocks: [
      {
        kind: "table",
        headers: ["Ratio", "Valeur", "Caractère", "Usage typique"],
        rows: [
          ["Seconde majeure", "1.067", "Très doux", "Interfaces denses, peu de contraste voulu"],
          ["Tierce mineure", "1.2", "Doux", "Applications utilitaires"],
          ["Tierce majeure", "1.25", "Équilibré", "Standard des design systems"],
          ["Quarte", "1.333", "Affirmé", "Contenu éditorial"],
          ["Quinte", "1.5", "Fort", "Marketing, landing pages"],
          ["Nombre d'or", "1.618", "Dramatique", "Titres hero, rarement en UI dense"],
        ],
      },
      {
        kind: "text",
        text: "En interface produit, restez entre 1.2 et 1.333 : assez de contraste pour structurer, pas assez pour théâtraliser. Les ratios extrêmes appartiennent au marketing, pas aux applications.",
      },
    ],
  },
  {
    id: "type-fluide",
    title: "Typographie fluide",
    level: 3,
    intro:
      "Des tailles qui s'adaptent à l'écran sans breakpoints : `clamp()`.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Titre fluide entre mobile et desktop",
        code: "h1 {\n  /* min 1.75rem (28px), idéal 1rem + 4vw, max 3rem (48px) */\n  font-size: clamp(1.75rem, 1rem + 4vw, 3rem);\n  line-height: 1.1;\n}",
      },
      {
        kind: "list",
        items: [
          "`clamp(min, idéal, max)` : la taille suit la largeur d'écran entre deux bornes. Fini les sauts brusques aux breakpoints.",
          "Réservez le fluide aux titres : le corps de texte reste à taille fixe (16 px) pour une lisibilité constante.",
          "Vérifiez les extrêmes : 320 px et 1920 px de large. Le texte ne doit jamais devenir illisible ni disproportionné.",
        ],
      },
    ],
  },
  {
    id: "variable-fonts",
    title: "Polices variables",
    level: 3,
    intro:
      "Un seul fichier pour toutes les graisses : la technologie qui change la donne.",
    blocks: [
      {
        kind: "text",
        text: "Une police variable contient un continuum de graisses (et parfois de largeurs, d'italiques) dans un seul fichier. Au lieu de charger 3 fichiers (Regular, Medium, Bold), on en charge un seul — plus léger au total, avec un contrôle fin (ex. graisse 560).",
      },
      {
        kind: "code",
        language: "css",
        title: "Utiliser une police variable",
        code: "@font-face {\n  font-family: \"Inter\";\n  src: url(\"/fonts/inter-var.woff2\") format(\"woff2\");\n  font-weight: 100 900;\n  font-display: swap;\n}\n\n.emphase-fine {\n  font-weight: 560; /* n'importe quelle valeur entre 100 et 900 */\n}",
      },
      {
        kind: "list",
        items: [
          "Vérifiez que la police propose bien une version variable (Google Fonts l'indique).",
          "Anciens navigateurs : prévoyez un fallback avec des graisses statiques via `@supports`.",
        ],
      },
    ],
  },
  {
    id: "responsive-type",
    title: "Typographie responsive",
    level: 3,
    intro:
      "Adapter le système typographique à chaque taille d'écran, méthodiquement.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définissez l'échelle mobile d'abord",
            detail:
              "Sur petit écran : corps à 16 px (jamais moins, iOS zoome sous 16 px dans les champs), titres réduits d'un cran.",
          },
          {
            title: "Ajoutez un cran au-delà de 768 px",
            detail:
              "Les titres gagnent un niveau d'échelle, le corps reste à 16-18 px. La longueur de ligne augmente avec l'écran.",
          },
          {
            title: "Contenez la mesure sur grand écran",
            detail:
              "Même sur un écran 27 pouces, un paragraphe ne dépasse pas 75 caractères : `max-width: 65ch` reste la règle.",
          },
          {
            title: "Testez les cas réels",
            detail:
              "Titres longs, traductions (l'allemand est 30 % plus long que l'anglais), zoom navigateur à 200 %.",
          },
        ],
      },
    ],
  },
  {
    id: "texte-long",
    title: "Composer le texte long",
    level: 3,
    intro:
      "Articles, documentation, CGU : les règles du confort de lecture.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Bloc de texte long soigné",
        code: ".article {\n  max-width: 65ch;\n  line-height: 1.7;\n  hyphens: auto;              /* césures automatiques (lang=\"fr\") */\n  text-wrap: pretty;          /* évite les veuves et orphelines */\n}\n.article p + p {\n  margin-top: 1em;            /* espace entre paragraphes */\n  text-indent: 0;\n}",
      },
      {
        kind: "list",
        items: [
          "Alinéas espacés plutôt qu'alinéas indentés sur écran : plus lisibles, plus simples en responsive.",
          "Intertitres tous les 3-4 paragraphes : ils permettent le scan et reposent l'œil.",
          "Évitez les lignes veuves (un mot seul en fin de paragraphe) : `text-wrap: pretty` les gère automatiquement.",
          "Les césures (`hyphens: auto`) exigent l'attribut `lang` correct sur le HTML.",
        ],
      },
    ],
  },
  {
    id: "capitales",
    title: "Les capitales",
    level: 3,
    intro:
      "Puissantes en petite dose, pénibles en excès.",
    blocks: [
      {
        kind: "list",
        items: [
          "Réservez les capitales aux textes courts : labels, eyebrow titles, boutons. Jamais de phrases entières.",
          "Compensez par de l'approche : `letter-spacing: 0.08em` rend les capitales respirantes et élégantes.",
          "Réduisez la taille : des capitales à 12 px avec approche équivalent visuellement à du 14 px en bas de casse.",
          "En CSS, écrivez le texte en bas de casse dans le HTML et appliquez `text-transform: uppercase` : les lecteurs d'écran liront correctement.",
        ],
      },
    ],
  },
  {
    id: "chiffres-tabulaires",
    title: "Chiffres tabulaires",
    level: 3,
    intro:
      "Des chiffres qui s'alignent : indispensable pour les données.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Chiffres à chasse fixe",
        code: ".donnees {\n  font-variant-numeric: tabular-nums; /* chaque chiffre a la même largeur */\n}",
      },
      {
        kind: "list",
        items: [
          "Tableaux, prix, statistiques, minuteurs : sans chiffres tabulaires, les colonnes dansent à chaque changement de valeur.",
          "La plupart des polices professionnelles incluent des chiffres tabulaires via OpenType : il suffit de les activer.",
          "Testez avec « 111 » vs « 888 » : si les largeurs diffèrent, activez `tabular-nums`.",
        ],
      },
    ],
  },
  {
    id: "italique",
    title: "Italique et emphase",
    level: 3,
    intro:
      "L'italique a un usage précis : ne le gaspillez pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "L'italique sert à l'emphase légère et aux citations, pas aux longs passages : un paragraphe entier en italique est pénible à lire.",
          "Vérifiez que la police possède une vraie italique : sinon le navigateur penche artificiellement la romaine (oblique de synthèse), au rendu médiocre.",
          "Pour l'emphase dans l'UI, préférez la graisse (Medium) à l'italique : plus lisible, plus robuste.",
          "En français, l'italique marque aussi les mots étrangers et les titres d'œuvres : un usage, pas une décoration.",
        ],
      },
    ],
  },
  {
    id: "contraste-texte",
    title: "Contrastes et WCAG",
    level: 3,
    intro:
      "Les seuils mesurables : le contraste n'est pas une question de goût.",
    blocks: [
      {
        kind: "table",
        headers: ["Contexte", "WCAG AA", "WCAG AAA", "Comment vérifier"],
        rows: [
          ["Texte courant (< 24 px)", "4.5:1", "7:1", "WebAIM Contrast Checker, Stark"],
          ["Grand texte (≥ 24 px ou 19 px bold)", "3:1", "4.5:1", "Mêmes outils"],
          ["Texte sur image", "4.5:1", "7:1", "Tester la zone la plus claire de l'image"],
          ["Éléments graphiques (icônes, bordures)", "3:1", "—", "WCAG 2.1, critère 1.4.11"],
        ],
      },
      {
        kind: "list",
        items: [
          "Le gris « élégant » (`#999` sur blanc = 2.85:1) échoue systématiquement : visez `#595959` minimum sur fond blanc.",
          "Testez aussi vos états : placeholder, texte désactivé, survol — les contrastes s'y dégradent souvent.",
          "Le mode sombre inverse les rôles : un gris lisible sur blanc peut devenir illisible sur noir. Re-vérifiez chaque couleur.",
        ],
      },
    ],
  },
  {
    id: "dark-mode-texte",
    title: "Typographie en dark mode",
    level: 3,
    intro:
      "Le texte clair sur fond sombre obéit à des règles propres.",
    blocks: [
      {
        kind: "list",
        items: [
          "Évitez le blanc pur (`#FFF`) sur noir pur (`#000`) : le contraste maximal fatigue l'œil (effet de halo). Préférez un blanc cassé (`#E8E8E8`) sur un gris très sombre (`#121212`).",
          "Réduisez légèrement les graisses : le texte clair paraît plus épais que le même texte en sombre (irradiation).",
          "Désaturez les couleurs de texte : un bleu vif sur fond sombre vibre ; une version désaturée reste lisible sans agresser.",
          "Re-mesurez tous les contrastes : les ratios ne se transfèrent pas d'un thème à l'autre.",
        ],
      },
    ],
  },
  {
    id: "monospace-code",
    title: "Typographie du code et des données",
    level: 3,
    intro:
      "Extraits de code, logs, données : la monospace a ses règles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Police monospace dédiée (JetBrains Mono, IBM Plex Mono, SF Mono) : la monospace système par défaut (Courier) est datée et peu lisible.",
          "Taille légèrement réduite : à graisse égale, la monospace paraît plus grande ; 13-14 px suffisent souvent là où le corps est à 16 px.",
          "Interlignage généreux (1.6+) pour le code : les blocs denses deviennent vite illisibles.",
          "Coloration syntaxique sobre : 4 à 5 couleurs suffisent (cf. les thèmes VS Code). Chaque couleur doit avoir un sens.",
        ],
      },
    ],
  },
  {
    id: "microtypographie",
    title: "Microtypographie française",
    level: 3,
    intro:
      "Les détails qui distinguent un texte soigné : guillemets, tirets, espaces.",
    blocks: [
      {
        kind: "fields",
        title: "Règles françaises",
        fields: [
          {
            label: "Guillemets",
            value:
              "« … » (chevrons) avec espaces insécables, pas \"…\" (guillemets anglais). En HTML : `&laquo;&nbsp;…&nbsp;&raquo;`.",
          },
          {
            label: "Apostrophe",
            value:
              "’ (typographique, U+2019), pas ' (droit). « l'interface » → « l’interface ».",
          },
          {
            label: "Tirets",
            value:
              "Tiret demi-cadratin (–) pour les intervalles (10–12 px), cadratin (—) pour les incises. Le tiret simple (-) est réservé aux mots composés.",
          },
          {
            label: "Espaces insécables",
            value:
              "Avant « : ; ! ? » et entre un nombre et son unité (« 16 px »). En HTML : `&nbsp;`.",
          },
          {
            label: "Points de suspension",
            value:
              "… (un seul caractère U+2026), pas trois points « ... ».",
          },
        ],
      },
      {
        kind: "text",
        text: "Ces détails semblent anecdotiques, mais un texte qui les respecte signale instantanément le soin apporté — et leur absence se remarque dès qu'on y prête attention.",
      },
    ],
  },
  {
    id: "kerning-tracking",
    title: "Crénage et approche",
    level: 3,
    intro:
      "Quand (et quand ne pas) toucher à l'espacement des lettres.",
    blocks: [
      {
        kind: "list",
        items: [
          "En UI, ne touchez quasiment jamais au crénage : les polices professionnelles le gèrent en interne.",
          "L'approche (letter-spacing) se justifie dans deux cas : les capitales (`0.05em` à `0.1em`) et les très grands titres (légèrement négatif, `-0.02em`).",
          "Jamais d'approche positive sur du texte courant : elle casse le rythme de lecture.",
          "Si un titre « sonne » mal, le problème vient plus souvent du choix de la police ou de la taille que de l'espacement.",
        ],
      },
    ],
  },
  {
    id: "licences",
    title: "Licences de polices",
    level: 3,
    intro:
      "Le droit suit la typographie : ce qu'on peut utiliser, où et comment.",
    blocks: [
      {
        kind: "list",
        items: [
          "Google Fonts : licence SIL Open Font License — utilisation commerciale autorisée, modification autorisée, redistribution autorisée.",
          "Polices système : utilisables librement via la pile système, mais non redistribuables (ne pas embarquer Segoe UI dans une app).",
          "Polices commerciales (ex. via Adobe Fonts) : lisez la licence — nombre de vues de page, usages applicatifs et redistribution sont souvent limités.",
          "Créditez quand c'est demandé : certaines licences libres l'exigent dans les mentions.",
          "En clientèle : vérifiez qui paie la licence et pour quels usages. Une police « trouvée sur un site » n'est pas une police libre de droits.",
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance des webfonts",
    level: 3,
    intro:
      "Chaque police coûte des kilo-octets : les optimiser.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Chargement optimisé",
        code: "<!-- Préconnexion au CDN de polices -->\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<!-- Préchargement de la graisse principale -->\n<link rel=\"preload\" as=\"font\" type=\"font/woff2\" crossorigin\n      href=\"/fonts/inter-regular.woff2\">\n<!-- Chargement différé des graisses secondaires -->\n<link rel=\"stylesheet\" href=\"/fonts/inter-medium-bold.css\" media=\"print\"\n      onload=\"this.media='all'\">",
      },
      {
        kind: "list",
        items: [
          "Subsetting : ne chargez que les plages Unicode nécessaires (latin de base suffit souvent) — divise le poids par 2 à 4.",
          "Woff2 + compression Brotli : le standard actuel, 30 % plus léger que le woff.",
          "Hébergez en local plutôt que via CDN quand c'est possible : une requête de moins, pas de dépendance tierce.",
        ],
      },
    ],
  },
  {
    id: "internationalisation",
    title: "Typographie multilingue",
    level: 3,
    intro:
      "Une police qui ne couvre pas vos langues est une police inutilisable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Vérifiez la couverture des jeux de caractères : latin étendu (accents français : é, è, ç, œ), cyrillique, grec selon vos marchés.",
          "Noto (Google) couvre tous les systèmes d'écriture : la solution de repli universelle.",
          "Les polices arabes, chinoises ou japonaises ont leurs propres règles (pas d'italique, interlignage différent) : ne pas appliquer les règles latines aveuglément.",
          "Testez avec du vrai contenu traduit : le lorem ipsum ne révèle ni les accents manquants ni les débordements.",
        ],
      },
    ],
  },
  {
    id: "accessibilite-texte",
    title: "Accessibilité du texte",
    level: 3,
    intro:
      "Rendre le texte lisible par le plus grand nombre : les leviers concrets.",
    blocks: [
      {
        kind: "list",
        items: [
          "Taille minimale réelle : 16 px pour le corps. Les textes à 12 px excluent une partie des utilisateurs malvoyants.",
          "Contrastes AA minimum (4.5:1) : c'est un plancher légal dans beaucoup de contextes, pas un idéal.",
          "Ne transmettez jamais d'information par la seule graisse ou la seule couleur : combinez avec un libellé ou une icône.",
          "Interlignage et espacement ajustables : n'empêchez pas le zoom texte (évitez les hauteurs fixes en px sur les conteneurs de texte).",
          "Évitez les blocs de capitales et d'italique longs : ils ralentissent la lecture pour tout le monde, davantage pour les lecteurs en difficulté.",
        ],
      },
    ],
  },
  {
    id: "tester-lisibilite",
    title: "Tester la lisibilité",
    level: 3,
    intro:
      "Valider ses choix typographiques avec des utilisateurs réels.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Test de scan (5 secondes)",
            detail:
              "Montrez l'écran 5 secondes, masquez-le, demandez ce que la personne a retenu. La hiérarchie est validée si les titres clés sont cités.",
          },
          {
            title: "Lecture à voix haute",
            detail:
              "Faites lire un paragraphe : hésitations et relectures signalent des problèmes de mesure, d'interlignage ou de formulation.",
          },
          {
            title: "Test sur appareils réels",
            detail:
              "Petit téléphone, écran basse résolution, luminosité forte : la typographie se juge dans les pires conditions, pas sur un écran Retina calibré.",
          },
          {
            title: "Test avec zoom",
            detail:
              "Navigateur à 200 % : le texte doit rester lisible sans chevauchement ni coupure.",
          },
        ],
      },
    ],
  },
  {
    id: "audit-typographique",
    title: "Auditer la typographie d'un produit",
    level: 3,
    intro:
      "La méthode d'audit : de l'inventaire aux recommandations.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Inventaire",
            detail:
              "Capturez tous les styles de texte du produit (plugin Figma « Style Inventory » ou inspection manuelle). Listez familles, tailles, graisses, couleurs.",
          },
          {
            title: "Comptage",
            detail:
              "Combien de tailles distinctes ? Combien de graisses ? Au-delà de 8 tailles ou 4 graisses, le système est fragmenté.",
          },
          {
            title: "Mesures",
            detail:
              "Contrastes de chaque combinaison texte/fond, longueurs de ligne des paragraphes, interlignages. Notez chaque écart aux seuils.",
          },
          {
            title: "Recommandations",
            detail:
              "Proposez une échelle réduite avec table de correspondance (ancien style → nouveau style) pour la migration.",
          },
        ],
      },
    ],
  },
  {
    id: "tokens-typographiques",
    title: "Tokens typographiques",
    level: 3,
    intro:
      "Industrialiser : des tokens nommés par rôle, versionnés.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Tokens de typographie (design system)",
        code: ":root {\n  /* Famille */\n  --font-sans: \"Inter\", system-ui, sans-serif;\n  --font-mono: \"JetBrains Mono\", monospace;\n\n  /* Rôles — jamais de tailles nues dans les composants */\n  --text-display: 700 2.441rem/1.1 var(--font-sans);\n  --text-heading: 600 1.563rem/1.25 var(--font-sans);\n  --text-body: 400 1rem/1.6 var(--font-sans);\n  --text-caption: 400 0.8rem/1.5 var(--font-sans);\n  --text-code: 400 0.875rem/1.6 var(--font-mono);\n}",
      },
      {
        kind: "list",
        items: [
          "La notation raccourcie `font: graisse taille/interlignage famille` regroupe tout un style en un token.",
          "Nommez par rôle sémantique (`--text-heading`), jamais par valeur (`--text-24px`).",
          "Documentez l'usage de chaque token : où l'utiliser, où ne pas l'utiliser, avec un exemple.",
        ],
      },
    ],
  },
  {
    id: "titres-editoriaux",
    title: "Titres éditoriaux",
    level: 3,
    intro:
      "Quand la typographie devient expressive : les titres qui portent une identité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un titre éditorial peut casser les règles de l'UI (taille dramatique, serif expressive) — mais dans un périmètre délimité : hero, landing, article.",
          "Gardez le corps de texte neutre quand le titre est expressif : un seul élément expressif par écran.",
          "L'approche négative légère (`-0.02em`) sur les grands titres resserre élégamment les formes.",
          "Testez toujours la lisibilité réelle : l'expressivité ne doit jamais coûter la compréhension.",
        ],
      },
    ],
  },
  {
    id: "listes-tableaux-texte",
    title: "Listes, tableaux et citations",
    level: 3,
    intro:
      "Les éléments de texte structuré ont leurs propres règles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Listes à puces : puces alignées sur la première ligne, texte indenté uniformément, espacement entre items supérieur à l'interlignage.",
          "Tableaux : chiffres tabulaires, en-têtes en graisse medium (pas en capitales criardes), zébrage léger ou lignes fines pour suivre les lignes.",
          "Citations : retrait ou filet vertical, italique modérée, attribution en corps plus petit.",
          "Évitez les listes de plus de 7 items sans sous-structure : regroupez ou hiérarchisez.",
        ],
      },
    ],
  },
  {
    id: "polices-expression",
    title: "La police comme expression de marque",
    level: 3,
    intro:
      "Choisir une police qui dit quelque chose : méthode, pas intuition.",
    blocks: [
      {
        kind: "list",
        items: [
          "Listez 3 adjectifs de marque (ex. « rigoureux, chaleureux, audacieux »), puis évaluez 5 polices candidates contre ces adjectifs.",
          "Testez en situation : la police dans un vrai titre, un vrai bouton, un vrai paragraphe — pas en spécimen isolé.",
          "Vérifiez la famille complète : graisses, italiques, chiffres, accents. Une belle Regular avec une Bold ratée est inutilisable.",
          "Pensez long terme : une police très distinctive lasse vite et date le produit. La neutralité bien dessinée vieillit mieux.",
        ],
      },
    ],
  },
  {
    id: "echelles-produit",
    title: "Définir l'échelle d'un produit",
    level: 3,
    intro:
      "Passer de l'échelle théorique au système réel d'un produit : exercice complet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Auditez l'existant",
            detail:
              "Inventaire des styles actuels (voir la section audit). Identifiez les doublons et les incohérences.",
          },
          {
            title: "Choisissez base et ratio",
            detail:
              "Base 16 px, ratio 1.25 pour une app ; ratio 1.333 pour un produit éditorial. Générez 6-7 niveaux.",
          },
          {
            title: "Mappez les rôles",
            detail:
              "Assignez chaque niveau à un rôle (display, h1, h2, body, caption…). Un rôle = un niveau, sans exception.",
          },
          {
            title: "Documentez",
            detail:
              "Page de documentation avec spécimen de chaque rôle, règles d'usage et contre-exemples.",
          },
          {
            title: "Migrez progressivement",
            detail:
              "Table de correspondance ancien → nouveau. Migrez écran par écran, en commençant par les plus visités.",
          },
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets pour progresser",
    level: 3,
    intro:
      "Des exercices concrets, du plus court au plus ambitieux.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "15 minutes : audit express",
            detail:
              "Prenez une app que vous utilisez, comptez les tailles de texte et mesurez 3 contrastes. Notez les écarts.",
          },
          {
            title: "2 heures : échelle complète",
            detail:
              "Construisez une échelle modulaire (base 16, ratio 1.25) en CSS avec 6 rôles nommés, puis appliquez-la à une page existante.",
          },
          {
            title: "1 journée : refonte typographique",
            detail:
              "Choisissez un article mal composé, refaites sa typographie (hiérarchie, mesure, interlignage). Présentez avant/après.",
          },
          {
            title: "1 semaine : système typographique",
            detail:
              "Pour un produit fictif : échelle, tokens CSS, documentation d'usage, spécimens. Livrable : une page de documentation.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-avancees",
    title: "Erreurs avancées",
    level: 3,
    intro:
      "Les fautes subtiles qui persistent après les bases.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est un problème", "Correction"],
        rows: [
          [
            "Faux gras / faux italique",
            "Le navigateur déforme la police, rendu médiocre",
            "Charger les vraies graisses et italiques",
          ],
          [
            "Guillemets anglais en français",
            "Signe de texte non relu",
            "« … » avec espaces insécables",
          ],
          [
            "Apostrophes droites",
            "Coupure visuelle dans le texte",
            "’ typographique (U+2019)",
          ],
          [
            "Texte justifié sur écran",
            "Rivières de blanc, rythme irrégulier",
            "Alignement à gauche (fer à gauche)",
          ],
          [
            "Interlignage fixe en px",
            "Casse au zoom ou au changement de taille",
            "Valeurs unitless (1.6) ou en em",
          ],
          [
            "3+ familles de polices",
            "Cacophonie visuelle, chargement lourd",
            "Maximum 2 familles, rôles distincts",
          ],
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Les références pour approfondir la typographie web.",
    blocks: [
      {
        kind: "fields",
        title: "À consulter",
        fields: [
          {
            label: "Practical Typography — Matthew Butterick (practicaltypography.com)",
            value:
              "Le livre en ligne gratuit : les règles essentielles de la typographie, avec une section dédiée aux interfaces.",
          },
          {
            label: "Better Web Typography — Matej Latin (betterwebtype.com)",
            value:
              "Un livre complet sur la typographie web : échelle modulaire, rythme vertical, responsive, avec exemples de code.",
          },
          {
            label: "Google Fonts (fonts.google.com)",
            value:
              "La bibliothèque de référence : tester, comparer et intégrer des polices libres.",
          },
          {
            label: "Type Scale (type-scale.com)",
            value:
              "Générateur visuel d'échelles modulaires : le point de départ le plus rapide.",
          },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "La typographie irrigue tout le design d'interface.",
    blocks: [
      {
        kind: "list",
        items: [
          "Appliquer en UI (`ui-design`) : la hiérarchie typographique est le squelette de chaque écran.",
          "Étendre à la couleur (`couleur`) : hiérarchie par la couleur et contrastes WCAG.",
          "Systématiser (`design-system`) : transformer votre échelle en tokens documentés.",
          "Revenir à la roadmap : valider Typographie et passer à la compétence suivante.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la couleur en design d'interface : théorie
 * appliquée, contrastes WCAG mesurés, tokens CSS, palettes documentées
 * et erreurs classiques. 3 niveaux (Aperçu / Pratique / Approfondi) avec
 * divulgation progressive. Tous les textes supportent le code inline
 * entre backticks.
 */
export const LEARNING_COULEUR: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est la couleur en design d'interface : un langage qui signale, organise et identifie — pas une décoration.",
    blocks: [
      {
        kind: "text",
        text: "En design d'interface, la couleur est un langage : elle signale les actions (bouton primaire), organise la hiérarchie (ce qui est saturé attire l'œil en premier), porte les états (erreur, succès, alerte) et transmet l'identité du produit. Chaque usage doit être justifiable — par un rôle, un contraste mesuré, une règle documentée — jamais par le goût personnel du moment.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est fondamental : la couleur guide l'œil plus vite que le texte. Un bouton primaire reconnaissable d'un coup d'œil, des erreurs en rouge comprises sans lire, des états cohérents d'un écran à l'autre. Mal utilisée, elle exclut (contrastes insuffisants pour des millions d'utilisateurs) et embrouille (trop de couleurs = aucun signal).",
      },
      {
        kind: "text",
        text: "Les trois piliers à maîtriser : la théorie (teinte, saturation, luminosité et leurs relations), la mesure (ratios de contraste WCAG calculables, pas des impressions) et le système (tokens nommés, rôles définis, documentation d'usage). Cette Learning Page couvre les trois, dans cet ordre.",
      },
    ],
  },
  {
    id: "couleur-langage-pas-decoration",
    title: "La couleur est un langage, pas une décoration",
    level: 1,
    intro:
      "Le changement de posture central : chaque couleur doit avoir un rôle.",
    blocks: [
      {
        kind: "diagram",
        title: "Les rôles d'une palette d'interface",
        lines: [
          "Palette du produit",
          "     │",
          "     ├── Primaire : l'action principale (1 seule couleur forte)",
          "     ├── Neutres : fonds, textes, bordures (l'essentiel de l'interface)",
          "     ├── Sémantiques : succès, erreur, alerte, info (sens conventionnel)",
          "     └── Accent : touches d'identité, usage parcimonieux",
          "Règle : si une couleur n'a pas de rôle nommé, elle n'a pas sa place.",
        ],
      },
      {
        kind: "text",
        text: "Test simple : masquer les labels d'une maquette et demander à quelqu'un d'identifier le bouton principal, l'erreur et le lien. Si la couleur seule ne permet pas de répondre, le langage est défaillant — c'est un problème de système, pas d'esthétique.",
      },
      {
        kind: "text",
        text: "Corollaire : limiter drastiquement le nombre de couleurs. Une palette d'interface mature tient en une primaire, une gamme de neutres (5 à 9 nuances) et quatre sémantiques. Tout le reste est du bruit.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "roue-chromatique",
    title: "La roue chromatique : le vocabulaire de base",
    level: 2,
    intro:
      "Le modèle mental indispensable pour parler de couleur avec précision.",
    blocks: [
      {
        kind: "text",
        text: "La roue chromatique organise les teintes en cercle : primaires, secondaires, tertiaires. Elle sert à construire des harmonies — des combinaisons de teintes qui fonctionnent ensemble — au lieu de choisir des couleurs au hasard.",
      },
      {
        kind: "fields",
        title: "Les trois dimensions de toute couleur",
        fields: [
          {
            label: "Teinte (hue)",
            value:
              "La « couleur » au sens courant : rouge, bleu, vert. Position sur la roue, mesurée en degrés (0–360).",
          },
          {
            label: "Saturation",
            value:
              "L'intensité : une couleur saturée est vive, désaturée elle tend vers le gris. En interface, la saturation est le levier d'attention principal.",
          },
          {
            label: "Luminosité (lightness)",
            value:
              "La clarté : du noir au blanc en passant par la teinte pure. C'est elle qui détermine l'essentiel du contraste.",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique, on manipule presque toujours la saturation et la luminosité d'une même teinte (déclinaisons) plutôt que de multiplier les teintes. Une « palette bleue » bien construite, ce sont 8 nuances d'un même bleu, pas 8 bleus différents.",
      },
    ],
  },
  {
    id: "couleur-en-hsl",
    title: "Penser et écrire la couleur en HSL",
    level: 2,
    intro:
      "Le format qui rend les déclinaisons systématiques au lieu d'approximatives.",
    blocks: [
      {
        kind: "text",
        text: "Le hexadécimal (`#1A73E8`) est opaque : impossible de deviner sa teinte ou sa clarté. Le format HSL (teinte, saturation, luminosité) rend les relations visibles : deux couleurs partageant la même teinte et la même saturation, à des luminosités différentes, forment une déclinaison cohérente.",
      },
      {
        kind: "code",
        language: "css",
        title: "Une gamme construite en HSL : même teinte, luminosité variable",
        code: ":root {\n  --brand-900: hsl(217, 89%, 32%);\n  --brand-700: hsl(217, 89%, 42%);\n  --brand-500: hsl(217, 89%, 52%); /* primaire */\n  --brand-300: hsl(217, 89%, 68%);\n  --brand-100: hsl(217, 89%, 88%);\n}",
      },
      {
        kind: "text",
        text: "Méthode : fixer la teinte et la saturation de la marque, puis générer la gamme en faisant varier la luminosité par paliers réguliers. C'est exactement ainsi que sont construites les gammes des design systems matures — et cela se vérifie d'un coup d'œil dans le code.",
      },
    ],
  },
  {
    id: "harmonies",
    title: "Les harmonies : combiner les teintes",
    level: 2,
    intro:
      "Quatre schémas éprouvés pour associer plusieurs teintes sans cacophonie.",
    blocks: [
      {
        kind: "table",
        headers: ["Harmonie", "Principe", "Usage en interface"],
        rows: [
          ["Monochromatique", "Une seule teinte, saturation/luminosité variables", "Le choix le plus sûr : interfaces sobres, produits sérieux"],
          ["Analogue", "Teintes voisines sur la roue (ex. bleu + vert)", "Ambiances douces, dégradés naturels"],
          ["Complémentaire", "Teintes opposées (ex. bleu + orange)", "Contraste fort : à doser, idéal pour un accent sur une base neutre"],
          ["Triadique", "Trois teintes à 120° (ex. bleu + rouge + jaune)", "Riche mais risqué : une teinte domine, les autres en accents rares"],
        ],
      },
      {
        kind: "text",
        text: "En interface, la règle d'or reste : une seule teinte forte (la primaire) + des neutres. Les harmonies à plusieurs teintes servent surtout aux illustrations, au marketing et à la data-visualisation — rarement aux composants.",
      },
    ],
  },
  {
    id: "construire-palette",
    title: "Construire une palette, pas à pas",
    level: 2,
    intro:
      "La méthode complète, de la teinte de marque aux tokens nommés.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir la teinte primaire",
            detail:
              "Une seule teinte, en cohérence avec l'identité (le bleu inspire confiance, mais le choix doit d'abord être distinctif dans le secteur). Noter sa valeur HSL exacte : c'est l'ancre de tout le système.",
          },
          {
            title: "Générer la gamme primaire",
            detail:
              "7 à 9 nuances : même teinte et saturation, luminosité de ~95 % (presque blanc teinté) à ~20 % (presque noir teinté). La nuance médiane (~50 %) est la primaire d'usage courant.",
          },
          {
            title: "Construire les neutres",
            detail:
              "Gris légèrement teintés de la primaire (saturation 5–10 %) : ils paraissent plus « propres » que des gris purs. 7 à 9 nuances, du fond au texte principal.",
          },
          {
            title: "Définir les sémantiques",
            detail:
              "Succès (vert), erreur (rouge), alerte (orange/ambre), info (bleu) : teintes conventionnelles que les utilisateurs reconnaissent sans apprendre. 3 nuances chacune suffisent (fond clair, texte, bordure).",
          },
          {
            title: "Mesurer tous les contrastes",
            detail:
              "Chaque combinaison texte/fond prévue doit atteindre 4.5:1 (texte courant) ou 3:1 (grand texte, éléments graphiques). Écarter ou ajuster les nuances qui échouent — pas de « ça passe à l'œil ».",
          },
          {
            title: "Nommer en tokens",
            detail:
              "Nommer par rôle (`--color-text-primary`), pas par valeur (`--blue-500`) : quand la valeur change, le nom reste valide. Voir la section tokens.",
          },
        ],
      },
    ],
  },
  {
    id: "tokens-css",
    title: "Tokens CSS : la palette en code",
    level: 2,
    intro:
      "Des variables CSS réelles et vérifiables : c'est ainsi qu'une palette devient un système.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Tokens sémantiques (extrait réaliste)",
        code: ":root {\n  /* Texte */\n  --color-text-primary: hsl(220, 15%, 12%);\n  --color-text-secondary: hsl(220, 12%, 38%);\n  --color-text-on-brand: hsl(0, 0%, 100%);\n  /* Fonds */\n  --color-surface-base: hsl(0, 0%, 100%);\n  --color-surface-raised: hsl(220, 20%, 97%);\n  /* Actions */\n  --color-brand-default: hsl(217, 89%, 52%);\n  --color-brand-hover: hsl(217, 89%, 45%);\n  --color-brand-active: hsl(217, 89%, 38%);\n  /* Sémantiques */\n  --color-danger-text: hsl(4, 72%, 42%);\n  --color-danger-bg: hsl(4, 72%, 95%);\n  --color-success-text: hsl(140, 60%, 32%);\n  --color-success-bg: hsl(140, 60%, 94%);\n}",
      },
      {
        kind: "list",
        items: [
          "Deux niveaux : tokens primitifs (`--blue-500`, la valeur brute) puis tokens sémantiques (`--color-brand-default`, le rôle). Les composants n'utilisent que les sémantiques.",
          "Le nom décrit le rôle, jamais la valeur : `--color-text-secondary` reste valide si le gris change.",
          "Chaque token sémantique a son jumeau de thème sombre (voir section dark mode).",
          "Documenter l'usage : où s'applique `--color-surface-raised` ? Avec quel texte dessus ?",
        ],
      },
    ],
  },
  {
    id: "roles-semantiques",
    title: "Les rôles sémantiques en détail",
    level: 2,
    intro:
      "Quatre couleurs à sens conventionnel : les utiliser correctement est une question d'ergonomie.",
    blocks: [
      {
        kind: "fields",
        title: "Signification et règles d'usage",
        fields: [
          {
            label: "Succès (vert)",
            value:
              "Confirmation d'une action réussie : « Compte créé », « Paiement accepté ». Réservé aux feedbacks positifs — jamais pour un bouton d'action générique.",
          },
          {
            label: "Erreur / danger (rouge)",
            value:
              "Erreurs de validation, actions destructrices (supprimer). Toujours doublé d'une icône et d'un texte : la couleur seule est invisible pour les daltoniens.",
          },
          {
            label: "Alerte (orange / ambre)",
            value:
              "Avertissement non bloquant : « Stock faible », « Session expire bientôt ». Entre l'info et l'erreur en gravité.",
          },
          {
            label: "Info (bleu)",
            value:
              "Information neutre : conseils, nouveautés, aide contextuelle. Ne doit pas ressembler à la primaire d'action pour éviter la confusion.",
          },
        ],
      },
      {
        kind: "text",
        text: "Cohérence impérative : le même sens = la même couleur partout. Si le rouge signifie « erreur » sur un écran et « promotion » sur un autre, le langage est brisé.",
      },
    ],
  },
  {
    id: "seuils-contraste",
    title: "Les seuils de contraste à appliquer",
    level: 2,
    intro:
      "Les nombres exacts qui séparent une palette accessible d'une palette décorative.",
    blocks: [
      {
        kind: "table",
        headers: ["Cas", "Ratio minimum", "Niveau WCAG", "Exemple"],
        rows: [
          ["Texte courant", "4.5:1", "AA", "Paragraphes, labels, texte de bouton"],
          ["Grand texte (≥ 18 pt / 14 pt gras)", "3:1", "AA", "Titres, chiffres clés"],
          ["Éléments graphiques", "3:1", "AA", "Icônes, bordures de champs, focus"],
          ["Texte courant renforcé", "7:1", "AAA", "Objectif confort sur les longs textes"],
        ],
      },
      {
        kind: "text",
        text: "Méthode : pour chaque token de texte, mesurer contre chaque fond sur lequel il peut apparaître. Une matrice tokens × fonds documentée évite les combinaisons interdites — et c'est un livrable précieux pour les développeurs.",
      },
    ],
  },
  {
    id: "regle-60-30-10",
    title: "La règle 60-30-10",
    level: 2,
    intro:
      "Un repère de proportion simple pour doser la couleur sur un écran.",
    blocks: [
      {
        kind: "text",
        text: "60 % de couleur dominante (généralement un neutre clair : le fond), 30 % de couleur secondaire (neutre plus soutenu : cartes, sections), 10 % d'accent (la primaire saturée : CTA, liens, éléments clés). Ce n'est pas une loi physique mais un garde-fou : si la couleur vive couvre 40 % de l'écran, la hiérarchie est morte.",
      },
      {
        kind: "list",
        items: [
          "La couleur la plus saturée attire l'œil en premier : la réserver aux actions principales.",
          "Si tout est accentué, rien ne l'est : un écran avec cinq boutons primaires n'a pas de hiérarchie.",
          "Les neutres font 90 % du travail visuel : c'est leur qualité (teinte subtile, contrastes) qui fait le « premium ».",
        ],
      },
    ],
  },
  {
    id: "dark-mode-couleurs",
    title: "Concevoir les couleurs du mode sombre",
    level: 2,
    intro:
      "Un thème sombre n'est pas une inversion : c'est une seconde palette à construire.",
    blocks: [
      {
        kind: "list",
        items: [
          "Surfaces : en mode sombre, les surfaces élevées (cartes, modales) sont plus claires que le fond — l'inverse du mode clair.",
          "Désaturer les couleurs vives : un bleu primaire pur sur fond noir « vibre » ; baisser la saturation et monter légèrement la luminosité.",
          "Re-mesurer chaque contraste : un texte qui passe à 4.5:1 sur blanc échoue souvent sur noir, et inversement.",
          "Éviter le noir pur `#000000` : un gris très sombre (ex. `hsl(220, 15%, 8%)`) réduit la fatigue oculaire.",
          "Ombres : quasi invisibles sur fond sombre — les remplacer par des bordures subtiles ou des différences de luminosité.",
        ],
      },
      {
        kind: "text",
        text: "En tokens : chaque token sémantique a une valeur claire et une valeur sombre. Le basculement de thème ne change que les valeurs, jamais les noms — c'est tout l'intérêt du nommage par rôle.",
      },
    ],
  },
  {
    id: "outils-couleur",
    title: "Les outils concrets du travail de la couleur",
    level: 2,
    intro:
      "Mesurer, simuler, générer : la boîte à outils réelle.",
    blocks: [
      {
        kind: "fields",
        title: "Outils réels, usages réels",
        fields: [
          {
            label: "WebAIM Contrast Checker",
            value: "webaim.org — la référence pour vérifier un couple de couleurs et obtenir le ratio exact.",
          },
          {
            label: "Stark (plugin Figma)",
            value: "Mesure les contrastes dans la maquette et simule les daltonismes sans quitter Figma.",
          },
          {
            label: "Coolors",
            value: "coolors.co — générateur de palettes avec verrouillage de teintes et export.",
          },
          {
            label: "Adobe Color",
            value: "color.adobe.com — roue chromatique interactive et exploration d'harmonies, extraction depuis une image.",
          },
          {
            label: "Material Theme Builder",
            value: "Outil Material 3 qui génère une palette complète (clair + sombre) depuis une couleur source.",
          },
        ],
      },
    ],
  },
  {
    id: "mesurer-contraste-wcag",
    title: "Mesurer un contraste, pas à pas",
    level: 2,
    intro:
      "La procédure exacte, à appliquer à chaque nouvelle combinaison.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier le couple réel",
            detail:
              "Texte exact contre fond exact tels qu'affichés : attention aux textes sur image, aux dégradés et aux superpositions translucides, où le contraste varie.",
          },
          {
            title: "Saisir les deux couleurs",
            detail:
              "Dans le Contrast Checker (codes hex) ou Stark (sélection des calques). L'outil calcule le ratio de luminance.",
          },
          {
            title: "Comparer au seuil",
            detail:
              "4.5:1 pour le texte courant, 3:1 pour le grand texte et les graphiques. Noter le ratio obtenu, pas seulement « ça passe ».",
          },
          {
            title: "Tester tous les états",
            detail:
              "Survol, focus, désactivé, erreur : un bouton dont le texte s'éclaircit au survol peut passer sous le seuil.",
          },
          {
            title: "Tester les deux thèmes",
            detail:
              "Répéter sur le thème sombre : les échecs s'y cachent souvent.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "psychologie-teintes",
    title: "Associations culturelles des teintes",
    level: 3,
    intro:
      "Ce que les couleurs évoquent — avec la prudence nécessaire : ce sont des tendances culturelles, pas des lois.",
    blocks: [
      {
        kind: "fields",
        title: "Associations courantes en contexte occidental",
        fields: [
          {
            label: "Bleu",
            value:
              "Confiance, stabilité, technologie. Le choix par défaut des produits B2B et financiers — donc le moins distinctif.",
          },
          {
            label: "Vert",
            value: "Croissance, validation, écologie. Réservé en interface au sens « succès ».",
          },
          {
            label: "Rouge",
            value: "Urgence, erreur, danger — mais aussi énergie et promotion. En interface : à réserver aux signaux forts.",
          },
          {
            label: "Orange / ambre",
            value: "Chaleur, avertissement, accessibilité perçue. Moins alarmant que le rouge.",
          },
          {
            label: "Violet",
            value: "Créativité, premium, spiritualité. Distinctif mais clivant.",
          },
          {
            label: "Noir / neutres sombres",
            value: "Élégance, premium, autorité. Le fond des interfaces « haut de gamme ».",
          },
        ],
      },
      {
        kind: "text",
        text: "Mise en garde : ces associations varient selon les cultures (le blanc du deuil en Asie, par exemple) et ne remplacent jamais un test utilisateur. Elles servent à formuler des hypothèses, pas à les valider.",
      },
    ],
  },
  {
    id: "saturation-hierarchie",
    title: "La saturation comme levier de hiérarchie",
    level: 3,
    intro:
      "Le mécanisme visuel le plus puissant — et le plus galvaudé.",
    blocks: [
      {
        kind: "text",
        text: "L'œil est attiré en priorité par la zone la plus saturée et la plus contrastée. Conséquence directe : sur un écran, il ne devrait y avoir qu'un petit nombre d'éléments fortement saturés — idéalement un seul : l'action principale.",
      },
      {
        kind: "list",
        items: [
          "Bouton primaire saturé, boutons secondaires neutres : c'est la saturation qui crée la hiérarchie, pas la taille.",
          "Badges, tags, illustrations : les désaturer pour qu'ils ne concurrencent pas les actions.",
          "Un écran « premium » est souvent un écran peu saturé : la retenue chromatique signale la confiance.",
          "Test : passer l'écran en niveaux de gris. Si la hiérarchie s'effondre, elle reposait uniquement sur la teinte — la reconstruire avec luminosité et saturation.",
        ],
      },
    ],
  },
  {
    id: "generer-rampe",
    title: "Générer une rampe de couleurs propre",
    level: 3,
    intro:
      "La technique précise derrière les gammes 50–900 des design systems.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Fixer l'ancre",
            detail:
              "Choisir la nuance médiane (500) : c'est la couleur d'usage courant, celle des boutons et des liens. Noter son HSL exact.",
          },
          {
            title: "Définir les paliers de luminosité",
            detail:
              "9 paliers de ~95 % à ~15 % de luminosité. Garder la saturation constante au centre, la réduire légèrement aux extrêmes (les très clairs et très sombres saturés paraissent sales).",
          },
          {
            title: "Ajuster la teinte aux extrêmes",
            detail:
              "Subtilité pro : dériver légèrement la teinte vers le chaud dans les clairs et vers le froid dans les sombres (ou l'inverse selon la marque). Cela évite les rampes « plates ».",
          },
          {
            title: "Vérifier les paliers utiles",
            detail:
              "Identifier quelles nuances servent au texte (doivent contraster sur les fonds), lesquelles aux fonds (doivent contraster avec le texte). Mesurer ces couples précis.",
          },
          {
            title: "Nommer et documenter",
            detail:
              "Noms numériques (50–900) pour les primitifs, noms sémantiques pour l'usage. Documenter : quelle nuance pour quel rôle.",
          },
        ],
      },
    ],
  },
  {
    id: "nommer-tokens",
    title: "Nommer les tokens : la convention qui tient",
    level: 3,
    intro:
      "Un mauvais nommage tue un système en six mois : la méthode en trois niveaux.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois niveaux de nommage",
        lines: [
          "Niveau 1 — Primitif : --blue-500",
          "   La valeur brute. Change rarement, jamais renommé.",
          "     │",
          "Niveau 2 — Sémantique : --color-brand-default → --blue-500",
          "   Le rôle dans l'interface. C'est ce qu'utilisent les composants.",
          "     │",
          "Niveau 3 — Composant : --button-primary-bg → --color-brand-default",
          "   (optionnel) Surcharge spécifique à un composant.",
          "Règle : on ne remonte jamais d'un niveau — un composant",
          "n'utilise jamais directement un primitif.",
        ],
      },
      {
        kind: "list",
        items: [
          "Vocabulaire du rôle : `text`, `surface`, `border`, `brand`, `danger`, `success`, `warning`, `info`.",
          "Suffixes d'état : `-default`, `-hover`, `-active`, `-disabled`, `-subtle`, `-strong`.",
          "Jamais de nom de teinte dans un token sémantique : `--color-text-primary`, pas `--color-dark-gray`.",
          "Jamais de contexte trop précis : `--color-text-primary` plutôt que `--color-header-title` (le header changera).",
        ],
      },
    ],
  },
  {
    id: "etats-boutons-couleurs",
    title: "Les états d'un bouton en couleur",
    level: 3,
    intro:
      "Décliner la primaire sur tous les états : la spec couleur complète d'un composant.",
    blocks: [
      {
        kind: "fields",
        title: "Déclinaison type d'un bouton primaire",
        fields: [
          {
            label: "Repos",
            value: "`--color-brand-default` en fond, texte blanc vérifié à 4.5:1.",
          },
          {
            label: "Survol",
            value: "`--color-brand-hover` : assombri de ~7 % de luminosité. Le changement doit être perceptible aussi en niveaux de gris.",
          },
          {
            label: "Actif / pressé",
            value: "`--color-brand-active` : encore assombri, feedback immédiat de l'appui.",
          },
          {
            label: "Focus",
            value: "Contour de focus à 3:1 contre le fond adjacent — souvent une version claire de la primaire ou un anneau double.",
          },
          {
            label: "Désactivé",
            value: "Fond neutralisé + texte atténué ; le contraste peut descendre sous 4.5:1 mais le bouton doit rester identifiable comme bouton.",
          },
          {
            label: "Chargement",
            value: "Fond du repos + indicateur ; ne pas changer la couleur (le changement de couleur seul n'est pas un état lisible).",
          },
        ],
      },
    ],
  },
  {
    id: "couleur-et-marque",
    title: "Couleur et identité de marque",
    level: 3,
    intro:
      "Concilier la couleur de marque avec les contraintes d'interface.",
    blocks: [
      {
        kind: "text",
        text: "La couleur de marque n'est pas toujours utilisable telle quelle en interface : un jaune vif de logo est illisible en texte sur blanc. La solution n'est pas d'abandonner la marque mais de la décliner : la teinte reste, la luminosité s'adapte à l'usage.",
      },
      {
        kind: "list",
        items: [
          "Garder la teinte de marque exacte pour les éléments d'identité (logo, illustrations).",
          "Créer une version « interface » ajustée en luminosité/saturation pour les textes et les fonds (même teinte, contrastes validés).",
          "Documenter les deux : « marque » vs « interface » — l'équipe marketing et l'équipe produit parlent souvent de la même couleur sans parler de la même valeur.",
          "Si la marque impose une couleur inaccessible en texte, l'utiliser en aplats et en accents, jamais en texte courant.",
        ],
      },
    ],
  },
  {
    id: "data-viz-palettes",
    title: "Palettes pour la data-visualisation",
    level: 3,
    intro:
      "Les graphiques ont leurs propres règles de couleur : trois types de palettes.",
    blocks: [
      {
        kind: "fields",
        title: "Choisir selon le type de données",
        fields: [
          {
            label: "Catégorielle",
            value:
              "Une teinte distincte par catégorie (produits, régions). Limiter à 6–8 catégories ; au-delà, regrouper en « Autres ». Teintes bien séparées sur la roue.",
          },
          {
            label: "Séquentielle",
            value:
              "Une seule teinte, luminosité croissante : pour les données ordonnées (faible → fort). La progression doit être perceptible même en niveaux de gris.",
          },
          {
            label: "Divergente",
            value:
              "Deux teintes opposées autour d'un neutre central : pour les écarts à une référence (négatif / positif). Éviter le rouge-vert pur (daltonisme) : préférer bleu-orange.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règles communes : labels directs sur les séries plutôt que légende éloignée, ne jamais coder une valeur critique par la seule couleur, tester chaque palette au simulateur de daltonisme.",
      },
    ],
  },
  {
    id: "gradients",
    title: "Dégradés : les règles d'un usage propre",
    level: 3,
    intro:
      "Le dégradé est un outil puissant à manier avec des règles strictes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Dégradés entre teintes analogues ou entre deux nuances d'une même teinte : les dégradés complémentaires (bleu→orange) créent une zone grise sale au milieu.",
          "Jamais de texte courant sur dégradé : le contraste varie selon la zone, impossible à garantir.",
          "Usage légitime : fonds d'illustration, images de marque, boutons d'accent (avec texte vérifié sur la zone la plus claire).",
          "Tester le rendu en mode sombre : un dégradé conçu pour le clair peut devenir agressif sur fond noir.",
          "En tokens : nommer le dégradé comme un tout (`--gradient-brand`), pas ses stops séparément.",
        ],
      },
    ],
  },
  {
    id: "daltonisme-securite",
    title: "Sécuriser la palette contre les daltonismes",
    level: 3,
    intro:
      "La méthode systématique pour une palette lisible par tous.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier les paires à risque",
            detail:
              "Rouge/vert (succès/erreur), vert/bleu, rouge/brun : les confusions les plus fréquentes (deutéranopie, protanopie). Lister toutes les paires de la palette qui se distinguent principalement par la teinte.",
          },
          {
            title: "Simuler",
            detail:
              "Passer les écrans clés dans le simulateur de Stark pour les trois grands types. Capturer les écrans où une information disparaît.",
          },
          {
            title: "Doubler le codage",
            detail:
              "Pour chaque information perdue : ajouter icône, texte, motif ou différence de luminosité. La luminosité seule suffit souvent (un vert clair vs un rouge sombre restent distinguables).",
          },
          {
            title: "Éviter les couples interdits",
            detail:
              "Ne jamais opposer rouge et vert comme seul différenciateur (graphiques, statuts). Préférer des couples sûrs : bleu/orange, violet/jaune.",
          },
          {
            title: "Documenter la règle",
            detail:
              "Inscrire dans la doc de la palette : « aucune information par la seule couleur » avec les exemples de doublage adoptés.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-niveaux-de-gris",
    title: "Le test des niveaux de gris",
    level: 3,
    intro:
      "Le contrôle le plus rapide et le plus révélateur d'une maquette.",
    blocks: [
      {
        kind: "text",
        text: "Convertir l'écran en niveaux de gris (filtre du système ou capture + désaturation). Ce qui reste lisible repose sur la luminosité et la hiérarchie — c'est sain. Ce qui disparaît reposait uniquement sur la teinte — c'est à corriger.",
      },
      {
        kind: "list",
        items: [
          "La hiérarchie (titre > texte > secondaire) doit survivre : sinon, renforcer les différences de taille et de graisse.",
          "Les états (actif/inactif, erreur) doivent rester distinguables : sinon, ajouter icônes ou soulignements.",
          "Les zones cliquables doivent rester identifiables : sinon, la affordance reposait sur la couleur seule.",
          "À faire sur chaque écran clé, en 30 secondes, avant chaque revue de design.",
        ],
      },
    ],
  },
  {
    id: "erreur-palettes-1",
    title: "Erreurs de palette (1/2)",
    level: 3,
    intro:
      "Les défauts les plus fréquents dans les palettes — et leurs corrections.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq classiques",
        fields: [
          {
            label: "Trop de couleurs",
            value:
              "Pourquoi : chaque écran ajoute « sa » couleur. Correction : geler la palette (1 primaire + neutres + 4 sémantiques) et exiger une justification pour tout ajout.",
          },
          {
            label: "Gris purs vs gris teintés mélangés",
            value:
              "Pourquoi : gris neutres et gris bleutés cohabitent, l'interface paraît « sale ». Correction : choisir une fois (neutres légèrement teintés) et convertir toute la palette.",
          },
          {
            label: "Primaire inutilisable en texte",
            value:
              "Pourquoi : la couleur de marque ne contraste pas sur blanc. Correction : décliner une version « interface » (même teinte, luminosité ajustée, 4.5:1 vérifié).",
          },
          {
            label: "Sémantiques incohérentes",
            value:
              "Pourquoi : le rouge = erreur ici, promotion là. Correction : un sens = une couleur, documenté et audité sur tous les écrans.",
          },
          {
            label: "Contrastes « à l'œil »",
            value:
              "Pourquoi : « ça me paraît lisible ». Correction : mesurer systématiquement ; l'œil s'habitue, le ratio ne ment pas.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-palettes-2",
    title: "Erreurs de palette (2/2)",
    level: 3,
    intro:
      "Cinq défauts plus subtils, qui apparaissent avec l'échelle.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq défauts d'échelle",
        fields: [
          {
            label: "Tokens nommés par valeur",
            value:
              "Pourquoi : `--blue-500` utilisé directement dans les composants. Correction : couche sémantique (`--color-brand-default`) ; les composants n'utilisent jamais les primitifs.",
          },
          {
            label: "Mode sombre inversé naïvement",
            value:
              "Pourquoi : inversion automatique des couleurs. Correction : seconde palette construite et mesurée (surfaces plus claires, couleurs désaturées).",
          },
          {
            label: "Focus invisible sur certains fonds",
            value:
              "Pourquoi : anneau de focus testé sur blanc uniquement. Correction : tester le focus sur tous les fonds, prévoir un anneau double (clair + sombre) si besoin.",
          },
          {
            label: "Dégradés avec texte",
            value:
              "Pourquoi : titre blanc sur dégradé bleu→violet. Correction : texte sur fond uni, ou overlay assombri uniforme avec contraste mesuré sur la zone la plus claire.",
          },
          {
            label: "Couleurs de graphiques non testées",
            value:
              "Pourquoi : palette catégorielle choisie pour son esthétique. Correction : simulation daltonisme + labels directs sur chaque série.",
          },
        ],
      },
    ],
  },
  {
    id: "audit-couleur-produit",
    title: "Auditer la couleur d'un produit existant",
    level: 3,
    intro:
      "La méthode d'inventaire pour reprendre en main une palette devenue chaotique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Extraire l'inventaire",
            detail:
              "Lister toutes les couleurs utilisées (plugin Figma d'extraction ou inspection du CSS). Compter : au-delà de ~20 valeurs distinctes, il y a un problème.",
          },
          {
            title: "Regrouper par proximité",
            detail:
              "Fusionner les quasi-doublons (5 bleus proches → 1). Noter les usages de chaque couleur conservée.",
          },
          {
            title: "Mesurer les contrastes",
            detail:
              "Pour chaque couple texte/fond réel, mesurer le ratio. Lister les échecs par gravité (texte courant d'abord).",
          },
          {
            title: "Attribuer les rôles",
            detail:
              "Primaire, neutres, sémantiques : chaque couleur conservée reçoit un rôle nommé. Les orphelines sont supprimées ou remplacées.",
          },
          {
            title: "Construire les tokens",
            detail:
              "Créer la structure primitifs → sémantiques, avec les deux thèmes. Documenter les usages autorisés et interdits.",
          },
          {
            title: "Planifier la migration",
            detail:
              "Remplacement progressif, écran par écran ou composant par composant. Geler les ajouts pendant la migration.",
          },
        ],
      },
    ],
  },
  {
    id: "checklist-palette",
    title: "Checklist d'une palette terminée",
    level: 3,
    intro:
      "Les critères qui définissent une palette « prête pour la production ».",
    blocks: [
      {
        kind: "list",
        items: [
          "Nombre limité : 1 primaire (+ gamme), neutres teintés, 4 sémantiques — pas d'orpheline.",
          "Tous les couples texte/fond mesurés : 4.5:1 (texte) / 3:1 (graphiques), sur les deux thèmes.",
          "Tokens nommés par rôle, en deux niveaux (primitifs → sémantiques).",
          "Thème sombre construit et mesuré, pas inversé.",
          "Aucune information portée par la seule couleur (test niveaux de gris + simulation daltonisme).",
          "États de chaque couleur d'action déclinés (hover, active, focus, disabled).",
          "Documentation d'usage : rôles, interdits, exemples.",
          "Règle d'évolution : qui peut ajouter une couleur, avec quelle justification.",
        ],
      },
    ],
  },
  {
    id: "documentation-usage-couleur",
    title: "Documenter l'usage de la couleur",
    level: 3,
    intro:
      "Une palette sans documentation sera mal utilisée : que doit contenir la page couleur du design system.",
    blocks: [
      {
        kind: "list",
        items: [
          "La palette visuelle complète, avec noms de tokens et valeurs.",
          "Pour chaque couleur : son rôle, où l'utiliser, où ne pas l'utiliser (avec contre-exemples visuels).",
          "La matrice des contrastes : quels textes sur quels fonds (autorisés / interdits).",
          "Les règles sémantiques : sens de chaque couleur, interdiction de les détourner.",
          "Le mode sombre : captures des mêmes écrans sur les deux thèmes.",
          "Le processus d'ajout : qui propose, qui valide, quels critères (contraste, rôle, doublon).",
        ],
      },
    ],
  },
  {
    id: "exercice-palette-30-min",
    title: "Exercice : construire une palette en 30 minutes",
    level: 3,
    intro:
      "Un exercice chronométré qui couvre toute la méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir l'ancre (5 min)",
            detail:
              "Prendre une marque fictive (ex. app de sport) et choisir sa teinte primaire en HSL. Justifier en une phrase (secteur, différenciation).",
          },
          {
            title: "Générer les gammes (10 min)",
            detail:
              "Gamme primaire (7 nuances) + neutres teintés (7 nuances) en faisant varier la luminosité. Utiliser Coolors ou un générateur pour aller vite, puis ajuster.",
          },
          {
            title: "Ajouter les sémantiques (5 min)",
            detail:
              "Succès, erreur, alerte, info : 2 nuances chacune (fond clair + texte).",
          },
          {
            title: "Mesurer (10 min)",
            detail:
              "Vérifier les 6 couples principaux (texte primaire/secondaire sur fond, texte sur primaire, texte sémantique sur fond sémantique). Ajuster les nuances en échec.",
          },
        ],
      },
      {
        kind: "text",
        text: "Critère de réussite : palette documentée avec tokens nommés par rôle et matrice de contrastes — pas seulement une belle planche de couleurs.",
      },
    ],
  },
  {
    id: "projet-systeme-alertes",
    title: "Projet : un système d'alertes complet",
    level: 3,
    intro:
      "Mettre en pratique rôles sémantiques, contrastes et doublage d'information.",
    blocks: [
      {
        kind: "text",
        text: "Concevoir les quatre types d'alerte (succès, erreur, alerte, info) en trois formats : bannière, toast, message inline de formulaire. Chaque combinaison : couleurs, icône, texte, contrastes mesurés sur les deux thèmes, version simulée en deutéranopie.",
      },
      {
        kind: "list",
        items: [
          "Livrable 1 : les 12 composants dans Figma (4 types × 3 formats).",
          "Livrable 2 : tokens sémantiques correspondants + matrice de contrastes.",
          "Livrable 3 : captures en simulation de daltonisme prouvant la lisibilité.",
          "Critère de réussite : chaque alerte est comprise en niveaux de gris, sans lire le texte.",
        ],
      },
    ],
  },
  {
    id: "projet-dark-mode-palette",
    title: "Projet : décliner une palette en mode sombre",
    level: 3,
    intro:
      "Prendre une palette claire existante et construire son jumeau sombre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Auditer la palette claire",
            detail:
              "Lister les tokens et leurs usages. Identifier les couleurs qui ne fonctionneront pas sur fond sombre (saturées, trop claires).",
          },
          {
            title: "Construire les surfaces",
            detail:
              "Fond, surfaces élevées (plus claires que le fond), bordures subtiles. Tester la hiérarchie des profondeurs.",
          },
          {
            title: "Adapter les couleurs",
            detail:
              "Désaturer les vives, éclaircir les textes, re-mesurer chaque contraste. Créer les valeurs sombres des tokens (noms inchangés).",
          },
          {
            title: "Valider côte à côte",
            detail:
              "Mêmes écrans sur les deux thèmes : hiérarchie préservée, focus visibles, sémantiques reconnaissables. Simulation daltonisme sur les deux.",
          },
        ],
      },
    ],
  },
  {
    id: "couleurs-systeme-plateformes",
    title: "Couleurs système des plateformes",
    level: 3,
    intro:
      "iOS et Android fournissent leurs propres couleurs sémantiques : les connaître évite de réinventer.",
    blocks: [
      {
        kind: "text",
        text: "Les plateformes définissent des couleurs système (labels, fonds, séparateurs, teintes d'accent) qui s'adaptent automatiquement au thème clair/sombre et aux réglages d'accessibilité (contraste renforcé). Sur mobile natif, les utiliser pour les éléments standards garantit la cohérence avec le système.",
      },
      {
        kind: "list",
        items: [
          "iOS : `label`, `secondaryLabel`, `systemBackground`, `systemBlue`… — hiérarchie de labels intégrée.",
          "Android (Material 3) : `primary`, `onPrimary`, `surface`, `surfaceContainer`… — rôles normalisés.",
          "Règle : la couleur de marque s'applique aux accents et à l'identité, les couleurs système au chrome standard.",
          "En maquette, documenter quelles couleurs sont « système » (gérées par la plateforme) vs « marque ».",
        ],
      },
    ],
  },
  {
    id: "elevation-surfaces",
    title: "Élévation et surfaces en mode sombre",
    level: 3,
    intro:
      "Comment signaler la profondeur quand les ombres ne fonctionnent plus.",
    blocks: [
      {
        kind: "text",
        text: "En mode clair, l'élévation se lit par les ombres. En mode sombre, les ombres disparaissent : Material 3 utilise des surcouches (overlays) de la couleur primaire à opacité croissante selon l'élévation (+5 % au niveau 1, +8 % au niveau 2, etc.).",
      },
      {
        kind: "list",
        items: [
          "Définir une échelle de surfaces : base, surélevée 1, surélevée 2, modale — chacune plus claire que la précédente.",
          "Ne pas utiliser d'ombres portées fortes en sombre : elles sont invisibles et alourdissent.",
          "Alternative : bordures subtiles (`1px`, blanc à 8–12 % d'opacité) pour séparer les surfaces.",
          "Documenter la correspondance : quel token de surface pour carte, menu, modale, tooltip.",
        ],
      },
    ],
  },
  {
    id: "liens-couleur-accessibilite",
    title: "La couleur des liens : règles strictes",
    level: 3,
    intro:
      "Les liens sont le cas le plus réglementé : couleur, soulignement, distinction.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un lien dans un paragraphe doit se distinguer du texte courant par autre chose que la couleur : soulignement permanent ou au survol/focus a minima.",
          "Contraste du lien : 4.5:1 contre le fond, comme tout texte.",
          "Contraste lien vs texte environnant : 3:1 minimum si le soulignement n'est qu'au survol (critère 1.4.1).",
          "États : visité (teinte distincte, souvent violette), survol, focus — tous dessinés.",
          "Ne pas souligner du texte qui n'est pas un lien : le soulignement est un signal réservé.",
        ],
      },
    ],
  },
  {
    id: "bordures-separateurs",
    title: "Bordures et séparateurs",
    level: 3,
    intro:
      "Les couleurs les plus utilisées et les moins pensées de l'interface.",
    blocks: [
      {
        kind: "text",
        text: "Bordures de champs, séparateurs de listes, contours de cartes : ces couleurs structurent l'interface en silence. Deux erreurs dominent : trop contrastées (l'interface paraît « grillagée ») ou trop faibles (les champs deviennent invisibles).",
      },
      {
        kind: "list",
        items: [
          "Bordure de champ au repos : contraste 3:1 contre le fond (critère non-texte) — ni plus, ni moins.",
          "Séparateurs : une seule couleur de séparation pour tout le produit, très discrète.",
          "Cartes : préférer une bordure fine ou une ombre légère, pas les deux.",
          "En mode sombre, les bordures s'éclaircissent (blanc à faible opacité) au lieu de s'assombrir.",
        ],
      },
    ],
  },
  {
    id: "opacite-transparence",
    title: "Opacité et transparence : les pièges",
    level: 3,
    intro:
      "Le texte semi-transparent est une source classique d'échecs de contraste.",
    blocks: [
      {
        kind: "text",
        text: "Appliquer une opacité à un texte (ex. noir à 60 %) semble pratique pour les textes secondaires, mais le contraste résultant dépend du fond réel — y compris des images ou des surfaces derrière. Un texte à 60 % sur fond blanc peut passer ; sur une image, il échoue.",
      },
      {
        kind: "list",
        items: [
          "Préférer des couleurs pleines (tokens dédiés) aux opacités pour les textes : le contraste est alors garanti et mesurable.",
          "Si l'opacité est utilisée, mesurer le contraste sur le fond réel le plus défavorable, pas sur fond uni.",
          "Overlays sur image (texte blanc sur photo) : assombrir uniformément l'image (overlay noir à 40–60 %) puis mesurer sur la zone la plus claire.",
          "Documenter : « ce token ne s'utilise que sur fond uni » quand c'est le cas.",
        ],
      },
    ],
  },
  {
    id: "theming-multi-marques",
    title: "Thématisation multi-marques",
    level: 3,
    intro:
      "Quand un même produit doit changer de couleurs selon la marque : l'architecture des tokens.",
    blocks: [
      {
        kind: "text",
        text: "Produit en marque blanche, sous-marques, co-branding : la structure en tokens rend le multi-thème possible. Principe : les composants ne référencent que des tokens sémantiques ; chaque marque fournit ses propres valeurs pour les primitifs.",
      },
      {
        kind: "list",
        items: [
          "Séparer strictement : primitifs par marque, sémantiques partagés.",
          "Chaque thème doit passer les mêmes contrôles : contrastes mesurés, simulation daltonisme.",
          "Prévoir les cas limites : une marque à primaire claire (jaune) exige des textes sombres sur primaire — le token `--color-text-on-brand` change de valeur par thème.",
          "Documenter le « contrat » d'un thème : la liste des tokens qu'une marque doit fournir.",
        ],
      },
    ],
  },
  {
    id: "texte-sur-image",
    title: "Texte sur image : sécuriser le contraste",
    level: 3,
    intro:
      "Le cas le plus fragile : garantir la lisibilité sur un fond imprévisible.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Évaluer le risque",
            detail:
              "Image éditoriale changeante (photo d'utilisateur, bannière marketing) = risque maximal. Image décorative fixe = risque contrôlable.",
          },
          {
            title: "Appliquer un voile uniforme",
            detail:
              "Overlay noir ou couleur de marque à opacité suffisante sur toute la zone de texte. Le voile doit être uniforme : un dégradé partiel laisse des zones non couvertes.",
          },
          {
            title: "Mesurer sur le pire cas",
            detail:
              "Échantillonner la zone la plus claire sous le texte après voile, mesurer le contraste. Si l'image change, mesurer sur plusieurs exemples représentatifs.",
          },
          {
            title: "Prévoir le repli",
            detail:
              "Si le contraste ne peut être garanti (images utilisateur non contrôlées), placer le texte hors de l'image : sur un bandeau uni sous ou sur l'image.",
          },
        ],
      },
    ],
  },
  {
    id: "exercice-audit-couleur-15-min",
    title: "Exercice : audit couleur express en 15 minutes",
    level: 3,
    intro:
      "Un diagnostic rapide applicable à n'importe quel écran.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Compter les couleurs (3 min)",
            detail:
              "Lister les couleurs distinctes de l'écran. Plus de 8 teintes différentes = signal d'alerte.",
          },
          {
            title: "Test niveaux de gris (3 min)",
            detail:
              "Désaturer : la hiérarchie et les états survivent-ils ? Noter ce qui disparaît.",
          },
          {
            title: "Mesurer 3 contrastes (6 min)",
            detail:
              "Texte principal, texte secondaire, bouton primaire : mesurer avec WebAIM ou Stark. Noter les ratios.",
          },
          {
            title: "Conclure (3 min)",
            detail:
              "Rédiger le verdict en 3 phrases : nombre de couleurs, hiérarchie sans teinte, contrastes. Proposer une correction prioritaire.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-refonte-palette-produit",
    title: "Projet : refonte de la palette d'un produit",
    level: 3,
    intro:
      "Le projet complet : de l'audit d'une palette chaotique aux tokens documentés.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Auditer l'existant",
            detail:
              "Appliquer la méthode d'audit : inventaire, regroupement, mesures, rôles. Produire le rapport avant/après chiffré (nombre de couleurs, échecs de contraste).",
          },
          {
            title: "Construire la nouvelle palette",
            detail:
              "Primaire, neutres teintés, sémantiques, gammes en HSL. Mesurer chaque couple, construire le thème sombre.",
          },
          {
            title: "Tokeniser",
            detail:
              "Structure primitifs → sémantiques, nommée par rôle, avec les deux thèmes. Fichier de tokens (CSS ou JSON).",
          },
          {
            title: "Documenter et migrer",
            detail:
              "Page de documentation (rôles, interdits, matrice de contrastes) + plan de migration écran par écran.",
          },
        ],
      },
      {
        kind: "text",
        text: "Critère de réussite : un développeur peut implémenter la palette sans poser de question, et un nouvel écran ne peut pas introduire de couleur hors système sans enfreindre la documentation.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite",
    level: 3,
    intro:
      "Les compétences de la roadmap UX Designer qui prolongent la couleur.",
    blocks: [
      {
        kind: "fields",
        title: "Continuer dans la roadmap ux-designer",
        fields: [
          {
            label: "Design System (`design-system`)",
            value:
              "Transformer la palette en tokens versionnés, documentés et gouvernés à l'échelle de l'organisation.",
          },
          {
            label: "Accessibilité (`accessibilite-design`)",
            value:
              "Approfondir les critères WCAG : contrastes, daltonismes, tests au lecteur d'écran — la couleur n'est que le début.",
          },
          {
            label: "UI Design (`ui-design`)",
            value:
              "Appliquer la palette sur des écrans réels : grilles, espacements, états — la rigueur qui fait un produit.",
          },
          {
            label: "Figma (`figma`)",
            value:
              "Construire la palette en styles et variables Figma : l'outillage concret du système de couleur.",
          },
          {
            label: "Typographie (`typographie`)",
            value:
              "L'autre pilier de la hiérarchie visuelle : échelles, graisses, lisibilité — la couleur ne fait pas tout.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Les références et outils réels pour approfondir.",
    blocks: [
      {
        kind: "fields",
        title: "Références et outils réels",
        fields: [
          {
            label: "WebAIM Contrast Checker",
            value: "https://webaim.org/resources/contrastchecker/ — mesure des ratios de contraste.",
          },
          {
            label: "Material Design — Color",
            value: "https://m3.material.io/styles/color/overview — système de couleur Material 3 : rôles, thèmes, outils.",
          },
          {
            label: "Refactoring UI (livre)",
            value:
              "Adam Wathan & Steve Schoger — le chapitre couleur : hiérarchie, saturation, ombres colorées. Une référence pratique.",
          },
          {
            label: "Interaction of Color (livre)",
            value: "Josef Albers — la référence théorique sur la perception des couleurs en contexte.",
          },
          {
            label: "Coolors",
            value: "https://coolors.co/ — génération et exploration de palettes.",
          },
        ],
      },
    ],
  },
];

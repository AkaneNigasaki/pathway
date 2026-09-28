import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'accessibilité en design : des critères WCAG
 * mesurables aux audits d'écrans, en passant par la navigation clavier,
 * les lecteurs d'écran et les spécifications transmises aux développeurs.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_ACCESSIBILITE_DESIGN: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est l'accessibilité en design : concevoir des interfaces utilisables par tout le monde, dès la maquette.",
    blocks: [
      {
        kind: "text",
        text: "L'accessibilité en design garantit que les interfaces sont utilisables par tout le monde : personnes malvoyantes, daltoniennes, naviguant au clavier, utilisant un lecteur d'écran, ou sensibles au mouvement. Elle se joue à 80 % dans la maquette — contrastes, tailles de cibles, focus visibles, alternatives — bien avant la première ligne de code.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est critique : la plupart des barrières naissent dans le design, pas dans le développement. Un texte gris clair sur fond blanc, un bouton de 24 px, un focus invisible : ce sont des décisions de maquette. Les corriger à la maquette coûte dix fois moins cher qu'en production, et c'est une obligation légale dans de nombreux contextes (secteur public européen, RGAA en France, ADA aux États-Unis).",
      },
      {
        kind: "text",
        text: "La référence internationale : les WCAG (Web Content Accessibility Guidelines), version 2.2, organisées en trois niveaux de conformité — A (minimum), AA (standard visé par la plupart des organisations), AAA (renforcé). Chaque critère est testable : ce n'est jamais une question de goût, toujours une question de mesure.",
      },
    ],
  },
  {
    id: "accessibilite-des-la-maquette",
    title: "L'accessibilité se décide dans la maquette",
    level: 1,
    intro:
      "Le point le plus mal compris : l'accessibilité n'est pas une couche ajoutée après coup.",
    blocks: [
      {
        kind: "diagram",
        title: "Où naissent les problèmes d'accessibilité",
        lines: [
          "Maquette (design)",
          "     │",
          "     ├── Couleurs et contrastes choisis ici",
          "     ├── Tailles de cibles décidées ici",
          "     ├── États focus dessinés (ou non) ici",
          "     ├── Hiérarchie des titres structurée ici",
          "     ▼",
          "Développement (code)",
          "     │",
          "     └── Ne peut que respecter — ou trahir — la maquette",
          "     ▼",
          "Audit tardif = refonte coûteuse",
        ],
      },
      {
        kind: "text",
        text: "Un développeur ne peut pas inventer un contraste suffisant si la maquette impose du gris `#9AA0A6` sur blanc. Il ne peut pas deviner l'ordre de lecture d'un lecteur d'écran si la hiérarchie visuelle est chaotique. Le designer est donc le premier responsable de l'accessibilité — et le premier à pouvoir la garantir.",
      },
      {
        kind: "text",
        text: "La bonne nouvelle : les règles sont finies et mesurables. Ratios de contraste, tailles minimales, ordre de tabulation logique : une checklist suffit à couvrir l'essentiel, sans expertise médicale ni connaissance du code.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "configurer-son-environnement",
    title: "Configurer son environnement de travail",
    level: 2,
    intro:
      "Les outils concrets à installer et à garder ouverts pendant la conception : mesurer plutôt que deviner.",
    blocks: [
      {
        kind: "fields",
        title: "La boîte à outils du designer accessible",
        fields: [
          {
            label: "Stark (plugin Figma)",
            value:
              "Mesure les contrastes directement dans la maquette, simule les daltonismes, vérifie l'ordre de focus. Le réflexe à installer en premier.",
          },
          {
            label: "axe DevTools (extension navigateur)",
            value:
              "Lance un audit automatisé sur une page : détecte les contrastes insuffisants, les images sans alternative, les problèmes de structure. Gratuit, édité par Deque.",
          },
          {
            label: "WebAIM Contrast Checker",
            value:
              "Vérification manuelle d'un couple premier plan / arrière-plan, avec le ratio exact et le verdict AA/AAA. La référence quand on choisit une palette.",
          },
          {
            label: "Simulateur de daltonisme",
            value:
              "Stark intègre la simulation ; l'application Sim Daltonism (macOS/iOS) permet de tester n'importe quel écran en direct. Indispensable pour les codes couleur sémantiques.",
          },
          {
            label: "Lecteur d'écran du système",
            value:
              "VoiceOver (macOS/iOS, `Cmd+F5`) et NVDA (Windows, gratuit) : tester soi-même, même sommairement, révèle des problèmes qu'aucun outil automatisé ne voit.",
          },
        ],
      },
      {
        kind: "text",
        text: "Habitude de travail : garder Stark ouvert pendant la conception et mesurer chaque nouvelle combinaison de couleurs au moment où elle est créée, pas à la fin du projet. Un contraste vérifié à la création ne devient jamais une dette.",
      },
    ],
  },
  {
    id: "les-seuils-wcag-essentiels",
    title: "Les seuils WCAG essentiels à connaître",
    level: 2,
    intro:
      "Les quatre nombres qui couvrent 80 % des décisions d'accessibilité visuelle.",
    blocks: [
      {
        kind: "table",
        headers: ["Seuil", "Valeur", "S'applique à", "Niveau"],
        rows: [
          ["Contraste du texte", "4.5:1 minimum", "Texte courant (< 18 pt ou < 14 pt gras)", "AA"],
          ["Contraste du grand texte", "3:1 minimum", "Titres ≥ 18 pt (ou ≥ 14 pt gras)", "AA"],
          ["Contraste des non-textes", "3:1 minimum", "Icônes, bordures de champs, focus, graphiques", "AA"],
          ["Taille de cible tactile", "44 × 44 px minimum", "Boutons, liens, contrôles interactifs", "AA (2.2)"],
        ],
      },
      {
        kind: "text",
        text: "Ces seuils sont des minimums, pas des objectifs. Un texte à 4.6:1 passe le critère mais reste inconfortable sur mobile en plein soleil : viser 7:1 (AAA) pour le texte courant quand c'est possible coûte rarement quelque chose en design.",
      },
      {
        kind: "text",
        text: "Note sur les cibles : le critère WCAG 2.2 exige 24 × 24 px minimum (AA), mais les recommandations des plateformes (Apple, Google) fixent 44 × 44 pt/px. En pratique professionnelle, 44 × 44 est le standard à dessiner dans les maquettes.",
      },
    ],
  },
  {
    id: "mesurer-un-contraste",
    title: "Mesurer un contraste, pas à pas",
    level: 2,
    intro:
      "La méthode exacte pour vérifier une combinaison de couleurs en moins d'une minute.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier le couple à tester",
            detail:
              "Premier plan (texte, icône, bordure) contre arrière-plan exact tel qu'il apparaîtra : attention aux fonds en dégradé ou aux images, où le contraste varie selon la zone.",
          },
          {
            title: "Ouvrir le vérificateur",
            detail:
              "Dans Stark, sélectionner les deux calques ; sur WebAIM Contrast Checker, saisir les deux codes hexadécimaux. L'outil calcule le ratio de luminance relative.",
          },
          {
            title: "Lire le verdict",
            detail:
              "Comparer au seuil applicable : 4.5:1 pour le texte courant, 3:1 pour le grand texte et les éléments graphiques. L'outil indique directement le niveau AA/AAA atteint.",
          },
          {
            title: "Tester les états",
            detail:
              "Répéter pour chaque état du composant : survol, focus, désactivé, erreur. Un bouton dont le texte devient illisible au survol échoue au critère.",
          },
          {
            title: "Tester en situation réelle",
            detail:
              "Vérifier aussi sur les fonds concernés : mode sombre, image de fond, superposition. Un blanc sur photo claire peut passer sur maquette et échouer en production.",
          },
        ],
      },
      {
        kind: "text",
        text: "Piège classique : mesurer le contraste du texte mais oublier les éléments non textuels. La bordure d'un champ de formulaire, l'icône d'un bouton, l'indicateur de focus doivent atteindre 3:1 contre leur fond adjacent.",
      },
    ],
  },
  {
    id: "tailles-de-cibles-tactiles",
    title: "Tailles de cibles tactiles",
    level: 2,
    intro:
      "Dessiner des zones interactives que tous les doigts — et tous les pointeurs — peuvent atteindre.",
    blocks: [
      {
        kind: "text",
        text: "Règle : toute zone interactive fait au minimum 44 × 44 px dans la maquette. Cela concerne les boutons, les liens, les cases à cocher, les icônes cliquables, les onglets. En dessous, les personnes à motricité réduite, les seniors et simplement les utilisateurs pressés ratent leurs cibles.",
      },
      {
        kind: "list",
        items: [
          "La taille visuelle peut être plus petite que 44 px si la zone cliquable réelle atteint 44 × 44 (zone de confort invisible autour d'une icône de 24 px).",
          "Espacer les cibles adjacentes d'au moins 8 px pour éviter les activations accidentelles.",
          "Les exceptions légitimes sont rares : les contrôles dans un paragraphe de texte (liens inline) suivent le rythme du texte.",
          "Sur mobile, vérifier au doigt : si deux boutons proches sont difficiles à distinguer au toucher, l'espacement est insuffisant.",
        ],
      },
      {
        kind: "text",
        text: "À spécifier dans la maquette : dessiner explicitement la zone de confort (hit area) autour des petites icônes, pour que le développeur l'implémente au lieu de rendre l'icône elle-même cliquable.",
      },
    ],
  },
  {
    id: "navigation-au-clavier",
    title: "Penser la navigation au clavier",
    level: 2,
    intro:
      "Une part des utilisateurs ne touche jamais la souris : la maquette doit définir un parcours clavier complet.",
    blocks: [
      {
        kind: "text",
        text: "Principe : tout ce qui est cliquable à la souris doit être atteignable et activable au clavier (`Tab` pour naviguer, `Entrée`/`Espace` pour activer, `Échap` pour fermer). Si une fonctionnalité exige la souris — un glisser-déposer sans alternative, un menu au survol uniquement — elle est inaccessible par conception.",
      },
      {
        kind: "list",
        items: [
          "Ordre de tabulation logique : il suit l'ordre visuel de lecture (haut → bas, gauche → droite). Dessiner les écrans dans cet ordre dans Figma facilite la tâche du développeur.",
          "Pas de piège clavier : une fois le focus entré dans un composant (modale, lecteur vidéo), l'utilisateur doit pouvoir en sortir au clavier.",
          "Éviter les interactions au survol seul : tout menu ou tooltip déclenché au survol doit aussi s'ouvrir au focus clavier.",
          "Les raccourcis clavier personnalisés (lettre unique) doivent pouvoir être désactivés ou remappés : ils entrent en conflit avec les technologies d'assistance.",
        ],
      },
      {
        kind: "text",
        text: "Test express : débrancher la souris et parcourir l'écran uniquement au clavier. Si une action est impossible ou si l'on se perd, la maquette doit être corrigée — pas le code seul.",
      },
    ],
  },
  {
    id: "focus-visible",
    title: "Dessiner des états de focus visibles",
    level: 2,
    intro:
      "L'indicateur de focus est l'équivalent clavier du curseur de souris : il doit être dessiné, pas subi.",
    blocks: [
      {
        kind: "text",
        text: "Règle : chaque élément interactif possède un état focus dessiné dans la maquette, avec un contraste d'au moins 3:1 contre le fond adjacent. Le navigateur applique un contour par défaut, mais les designers le suppriment souvent (`outline: none`) sans le remplacer — c'est l'une des erreurs les plus fréquentes et les plus graves.",
      },
      {
        kind: "code",
        language: "css",
        title: "Un style de focus robuste (référence pour la spec)",
        code: ":focus-visible {\n  outline: 3px solid #1A73E8;\n  outline-offset: 2px;\n  border-radius: 4px;\n}",
      },
      {
        kind: "list",
        items: [
          "Ne jamais supprimer l'indicateur de focus sans le remplacer par un style au moins aussi visible.",
          "Le focus doit être visible sur tous les fonds : tester sur clair, sombre, image.",
          "`outline-offset` évite que le contour ne se confonde avec la bordure du composant.",
          "Dans la maquette Figma, créer une variante « focus » de chaque composant interactif, comme pour les états survol et désactivé.",
        ],
      },
    ],
  },
  {
    id: "formulaires-accessibles",
    title: "Concevoir des formulaires accessibles",
    level: 2,
    intro:
      "Les formulaires concentrent la plupart des échecs d'accessibilité : labels, erreurs, instructions.",
    blocks: [
      {
        kind: "list",
        items: [
          "Label visible et permanent au-dessus de chaque champ : jamais de placeholder utilisé comme seul label (il disparaît à la saisie et son contraste est souvent insuffisant).",
          "Instructions placées avant le champ, pas après : format de date attendu, contraintes de mot de passe.",
          "Champs obligatoires signalés par un texte (« obligatoire »), pas uniquement par un astérisque rouge — la couleur seule n'est pas une information.",
          "Messages d'erreur explicites et liés au champ : « L'adresse e-mail doit contenir un @ » plutôt que « Champ invalide ».",
          "L'erreur ne repose jamais sur la seule couleur rouge : icône + texte explicite.",
          "Regrouper les champs liés (adresse, paiement) avec des légendes de groupe visibles.",
        ],
      },
      {
        kind: "text",
        text: "À spécifier dans la maquette : dessiner l'état d'erreur complet de chaque champ (bordure, icône, message positionné sous le champ) et l'état de succès si le formulaire en affiche. Un développeur ne doit jamais avoir à inventer ces états.",
      },
    ],
  },
  {
    id: "textes-alternatifs-images",
    title: "Textes alternatifs : quoi écrire",
    level: 2,
    intro:
      "Rédiger les alternatives textuelles des images directement dans les specs de la maquette.",
    blocks: [
      {
        kind: "fields",
        title: "Décider du traitement de chaque image",
        fields: [
          {
            label: "Image informative",
            value:
              "Décrire la fonction ou le contenu utile : « Graphique : les ventes ont doublé entre janvier et juin ». Rédiger le texte dans la spec, près du composant.",
          },
          {
            label: "Image décorative",
            value:
              "Aucun texte alternatif : la marquer comme décorative dans la spec pour que le développeur l'ignore proprement. Une illustration d'ambiance n'a pas besoin de description.",
          },
          {
            label: "Image fonctionnelle",
            value:
              "Décrire l'action, pas l'image : une loupe cliquable = « Rechercher », pas « icône de loupe ». C'est le cas le plus mal traité en pratique.",
          },
          {
            label: "Image complexe (graphique, schéma)",
            value:
              "Alternative courte + description longue adjacente (tableau de données ou paragraphe). Prévoir l'espace dans la mise en page.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'écriture : concis, sans « image de… » redondant, sans répéter la légende visible. Le designer connaît l'intention de chaque image mieux que personne : c'est à lui de fournir ces textes, pas au développeur.",
      },
    ],
  },
  {
    id: "hierarchie-titres-lecteurs-ecran",
    title: "Hiérarchie des titres et lecteurs d'écran",
    level: 2,
    intro:
      "Les lecteurs d'écran naviguent par les titres : la structure de la maquette est leur sommaire.",
    blocks: [
      {
        kind: "text",
        text: "Les utilisateurs de lecteurs d'écran parcourent une page en sautant de titre en titre (`H` dans NVDA, rotor dans VoiceOver). Si la maquette utilise des titres pour leur taille visuelle plutôt que pour leur niveau logique — un `H3` parce qu'il « rend bien » — cette navigation devient incohérente.",
      },
      {
        kind: "list",
        items: [
          "Un seul titre de niveau 1 par écran : le sujet de la page.",
          "Niveaux imbriqués sans saut : pas de `H4` directement sous un `H2`.",
          "La hiérarchie visuelle doit refléter la hiérarchie logique : si un texte ressemble à un titre, c'en est un.",
          "Dans la maquette, annoter le niveau de titre de chaque texte (`H1`, `H2`…) comme on annote les styles.",
          "Les sections importantes (navigation, contenu principal, pied de page) doivent être identifiables comme régions.",
        ],
      },
    ],
  },
  {
    id: "tester-avec-voiceover",
    title: "Tester avec VoiceOver (macOS / iOS)",
    level: 2,
    intro:
      "Un premier test lecteur d'écran en dix minutes, sans formation complète.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Activer VoiceOver",
            detail:
              "`Cmd+F5` active ou désactive VoiceOver sur macOS. Sur iOS : Réglages → Accessibilité → VoiceOver. Garder l'écran allumé au début pour corréler ce qu'on entend et ce qu'on voit.",
          },
          {
            title: "Naviguer avec les gestes de base",
            detail:
              "Sur macOS : `Ctrl+Option+→` lit l'élément suivant, `Ctrl+Option+←` le précédent. Sur iOS : balayer vers la droite passe à l'élément suivant, double-tap active.",
          },
          {
            title: "Écouter les annonces",
            detail:
              "VoiceOver annonce le rôle de chaque élément (« bouton », « lien », « titre niveau 2 ») puis son nom. Un bouton annoncé comme « bouton » sans nom, ou une image annoncée par son nom de fichier, signale un problème.",
          },
          {
            title: "Tester le parcours critique",
            detail:
              "Effectuer la tâche principale (s'inscrire, acheter, envoyer) uniquement au lecteur d'écran. Noter chaque point de blocage ou d'incompréhension.",
          },
          {
            title: "Consigner les correctifs maquette",
            detail:
              "Traduire chaque problème en spec : nom accessible manquant, ordre de lecture incohérent, titre de niveau incorrect. La plupart se corrigent dans la maquette ou ses annotations.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-avec-nvda",
    title: "Tester avec NVDA (Windows)",
    level: 2,
    intro:
      "Le lecteur d'écran gratuit de référence sous Windows : le même protocole que VoiceOver.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Installer NVDA",
            detail:
              "Téléchargement gratuit sur nvaccess.org. L'installation prend quelques minutes ; une voix de synthèse est incluse.",
          },
          {
            title: "Apprendre les touches de base",
            detail:
              "`Flèche bas` lit l'élément suivant, `H` saute au titre suivant, `B` au bouton suivant, `F` au champ de formulaire suivant. `NVDA+T` (touche `Insert` + `T`) relit le titre de la page.",
          },
          {
            title: "Tester la navigation par titres",
            detail:
              "Appuyer sur `H` à répétition : la séquence des titres annoncés doit raconter la structure de la page. Tout titre manquant ou incohérent est un défaut de maquette.",
          },
          {
            title: "Tester les formulaires",
            detail:
              "Avec `F`, passer de champ en champ : chaque champ doit annoncer son label, son caractère obligatoire et ses instructions. Un champ annoncé comme « édition » sans nom est inutilisable.",
          },
          {
            title: "Comparer avec le test clavier",
            detail:
              "Coupler NVDA et la navigation au `Tab` : l'ordre annoncé doit correspondre à l'ordre visuel. Les divergences viennent généralement d'un ordre des calques incohérent dans la maquette.",
          },
        ],
      },
    ],
  },
  {
    id: "prefers-reduced-motion",
    title: "Respecter prefers-reduced-motion",
    level: 2,
    intro:
      "Une partie des utilisateurs désactive les animations au niveau système : le design doit prévoir l'alternative.",
    blocks: [
      {
        kind: "text",
        text: "Les animations non essentielles — parallax, entrées en cascade, transitions décoratives — peuvent provoquer nausées, vertiges ou crises chez les personnes souffrant de troubles vestibulaires. Le système d'exploitation expose la préférence `prefers-reduced-motion` : quand elle est active, les mouvements non essentiels doivent être réduits ou supprimés.",
      },
      {
        kind: "code",
        language: "css",
        title: "Le pattern standard côté développement (à spécifier)",
        code: "@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}",
      },
      {
        kind: "list",
        items: [
          "Dans la maquette, identifier les animations essentielles (indicateur de chargement, feedback d'action) et les décoratives.",
          "Spécifier l'état final statique de chaque animation décorative : c'est ce qui s'affiche en mode réduit.",
          "Ne jamais faire dépendre une information du seul mouvement : un élément qui n'apparaît qu'après une animation doit avoir un état visible par défaut.",
          "Tester : activer « Réduire les animations » dans l'OS et parcourir le produit.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "wcag-2-2-niveaux",
    title: "WCAG 2.2 : les niveaux A, AA, AAA",
    level: 3,
    intro:
      "Comprendre l'architecture des critères pour spécifier un niveau de conformité exigible.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Signification", "Usage typique"],
        rows: [
          ["A", "Minimum vital : sans ces critères, des utilisateurs sont totalement bloqués", "Rarement visé seul, socle obligatoire"],
          ["AA", "Standard : supprime les barrières les plus courantes pour le plus grand nombre", "Objectif contractuel et légal le plus fréquent"],
          ["AAA", "Renforcé : exigences strictes, parfois inapplicables à tout un site", "Visé critère par critère (ex. contraste 7:1 sur le texte courant)"],
        ],
      },
      {
        kind: "text",
        text: "WCAG 2.2 ajoute des critères par rapport à 2.1, notamment sur les cibles tactiles (24 × 24 px minimum en AA), l'aide cohérente et l'authentification accessible (pas de test cognitif comme résoudre un puzzle sans alternative). Spécifier « conforme WCAG 2.2 AA » dans un cahier des charges donne une cible mesurable et auditable.",
      },
      {
        kind: "text",
        text: "Point de vigilance : la conformité se mesure par page et par état, pas « en général ». Un site peut être AA sur sa page d'accueil et échouer sur son tunnel d'achat — l'audit doit couvrir les parcours critiques complets.",
      },
    ],
  },
  {
    id: "roles-aria-a-specifier",
    title: "Les rôles ARIA à spécifier en maquette",
    level: 3,
    intro:
      "Le designer n'écrit pas l'ARIA, mais il doit signaler quand un composant en a besoin.",
    blocks: [
      {
        kind: "text",
        text: "ARIA (Accessible Rich Internet Applications) permet d'exposer aux technologies d'assistance la nature des composants complexes. Règle d'or : ne pas utiliser ARIA quand un élément natif suffit — un vrai `<button>` est toujours meilleur qu'un `div` avec un rôle bouton. Le rôle du designer est d'identifier les composants non standard qui nécessiteront une attention particulière.",
      },
      {
        kind: "fields",
        title: "Composants à signaler dans les specs",
        fields: [
          {
            label: "Onglets, accordéons",
            value:
              "Préciser quel panneau est actif, que la navigation au clavier suit la logique d'onglets. Dessiner l'état actif/inactif de chaque onglet.",
          },
          {
            label: "Modales et panneaux",
            value:
              "Spécifier : le focus entre dans la modale à l'ouverture, reste piégé dedans, revient au déclencheur à la fermeture. Dessiner le fond assombri et la croix de fermeture accessible.",
          },
          {
            label: "Menus déroulants personnalisés",
            value:
              "Un `select` natif est préférable ; si le design impose un composant sur mesure, le signaler comme nécessitant une implémentation clavier complète.",
          },
          {
            label: "Carrousels",
            value:
              "Prévoir des contrôles précédent/suivant explicites, un bouton pause si défilement automatique, et l'annonce du changement de diapositive.",
          },
          {
            label: "Notifications toast",
            value:
              "Spécifier si le message doit être annoncé aux lecteurs d'écran (région live) : erreurs oui, confirmations discrètes selon le contexte.",
          },
        ],
      },
    ],
  },
  {
    id: "ordre-de-lecture",
    title: "Contrôler l'ordre de lecture",
    level: 3,
    intro:
      "L'ordre dans lequel un lecteur d'écran lit la page doit correspondre à l'ordre visuel.",
    blocks: [
      {
        kind: "text",
        text: "Les lecteurs d'écran et la navigation au clavier suivent l'ordre du code, pas l'ordre visuel. Quand la maquette place visuellement un élément à un endroit différent de sa position dans la hiérarchie des calques (panneau latéral, badge superposé, contenu en colonnes), l'ordre de lecture peut devenir incohérent.",
      },
      {
        kind: "list",
        items: [
          "Dans Figma, l'ordre des calques (de haut en bas dans le panneau) détermine généralement l'ordre du code : le garder cohérent avec l'ordre visuel.",
          "Attention aux positionnements absolus et aux superpositions : vérifier que l'élément superposé est lu au bon moment.",
          "Les contenus en multi-colonnes se lisent colonne par colonne, pas ligne par ligne : s'assurer que c'est l'ordre souhaité.",
          "Tester l'ordre avec NVDA ou VoiceOver dès la maquette interactive (prototype Figma testable au clavier).",
        ],
      },
    ],
  },
  {
    id: "etats-des-composants",
    title: "Dessiner tous les états, pas seulement le repos",
    level: 3,
    intro:
      "Un composant accessible est un composant dont chaque état a été pensé.",
    blocks: [
      {
        kind: "fields",
        title: "Les états à dessiner systématiquement",
        fields: [
          {
            label: "Repos (default)",
            value: "L'état de base, avec ses contrastes vérifiés.",
          },
          {
            label: "Survol (hover)",
            value: "Le changement visuel doit être perceptible sans couleur seule (soulignement, changement de forme) pour les daltoniens.",
          },
          {
            label: "Focus",
            value: "Indicateur visible à 3:1 minimum, dessiné explicitement (voir section dédiée).",
          },
          {
            label: "Actif / pressé",
            value: "Feedback immédiat de l'activation, utile aux utilisateurs à motricité réduite qui appuient longuement.",
          },
          {
            label: "Désactivé (disabled)",
            value: "Visuellement distinct, mais attention : un élément désactivé n'est pas focusable — prévoir un texte expliquant pourquoi l'action est indisponible.",
          },
          {
            label: "Erreur",
            value: "Bordure + icône + message texte, jamais la couleur seule.",
          },
          {
            label: "Chargement",
            value: "Indicateur non basé uniquement sur le mouvement (texte « Chargement… » pour les lecteurs d'écran et le mode réduit).",
          },
        ],
      },
      {
        kind: "text",
        text: "Un composant livré avec le seul état de repos force le développeur à improviser les autres — et l'improvisation est l'ennemie de l'accessibilité. La checklist des états fait partie de la définition de « terminé » d'un composant.",
      },
    ],
  },
  {
    id: "messages-erreur-formulaire",
    title: "Messages d'erreur : le détail qui change tout",
    level: 3,
    intro:
      "Approfondir la conception des erreurs de formulaire, premier point de friction accessible.",
    blocks: [
      {
        kind: "list",
        items: [
          "Placer le message d'erreur sous le champ concerné (ou au-dessus), jamais uniquement en haut du formulaire loin du champ.",
          "Formulation constructive : dire ce qui est attendu (« Le mot de passe doit contenir au moins 8 caractères ») plutôt que ce qui est faux (« Entrée invalide »).",
          "Résumé des erreurs en haut du formulaire avec des liens d'ancrage vers chaque champ en erreur : indispensable sur les longs formulaires.",
          "Ne pas effacer la saisie de l'utilisateur quand une erreur survient, sauf pour les mots de passe.",
          "Valider dès que possible (à la sortie du champ) plutôt qu'uniquement à l'envoi : réduit la charge cognitive.",
          "Les erreurs doivent être annoncées aux lecteurs d'écran : le spécifier dans la maquette.",
        ],
      },
      {
        kind: "text",
        text: "Test utilisateur simple : soumettre le formulaire vide et observer. Si l'on ne comprend pas immédiatement quoi corriger et où, la conception des erreurs est à revoir.",
      },
    ],
  },
  {
    id: "contrastes-non-texte",
    title: "Contrastes des éléments non textuels (3:1)",
    level: 3,
    intro:
      "Le critère le plus oublié : icônes, bordures et contrôles graphiques ont aussi un seuil.",
    blocks: [
      {
        kind: "text",
        text: "Le critère 1.4.11 (AA) exige un contraste de 3:1 pour les composants d'interface et les objets graphiques nécessaires à la compréhension : bordures des champs de saisie, icônes porteuses de sens, cases à cocher, curseurs, indicateurs de focus, parties essentielles des graphiques.",
      },
      {
        kind: "list",
        items: [
          "Bordure d'un champ : mesurer la bordure contre le fond adjacent, pas le texte contre le fond.",
          "Icône seule (sans texte) : l'icône doit atteindre 3:1, car elle porte toute l'information.",
          "Graphiques : chaque série de données nécessaire à la compréhension doit se distinguer des autres et du fond — ne pas compter uniquement sur la couleur (motifs, labels directs).",
          "États : vérifier aussi les états désactivés quand ils portent une information (un bouton désactivé grisé reste informatif).",
        ],
      },
    ],
  },
  {
    id: "daltonisme-conception",
    title: "Concevoir pour les daltonismes",
    level: 3,
    intro:
      "Environ 8 % des hommes ont une déficience de la vision des couleurs : ne jamais coder l'information par la seule couleur.",
    blocks: [
      {
        kind: "text",
        text: "Les formes les plus courantes (deutéranopie, protanopie) confondent les rouges et les verts — précisément les couleurs utilisées pour « erreur » et « succès ». La règle est simple et absolue : toute information portée par la couleur doit être doublée d'un autre canal.",
      },
      {
        kind: "fields",
        title: "Doubler chaque code couleur",
        fields: [
          {
            label: "Erreur / succès",
            value: "Couleur + icône (croix / coche) + texte explicite.",
          },
          {
            label: "Champs obligatoires",
            value: "Astérisque + mention textuelle « obligatoire », pas l'astérisque rouge seul.",
          },
          {
            label: "Graphiques",
            value: "Couleurs + motifs ou labels directs sur les séries.",
          },
          {
            label: "Disponibilité (vert/rouge)",
            value: "Couleur + texte (« Disponible » / « Complet ») ou icône distincte.",
          },
          {
            label: "Liens dans le texte",
            value: "Couleur + soulignement : un lien reconnu à sa seule couleur est invisible pour certains.",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode de vérification : passer chaque écran clé dans le simulateur de daltonisme de Stark (deutéranopie, protanopie, tritanopie). Si une information disparaît, le design est à corriger.",
      },
    ],
  },
  {
    id: "zoom-texte-200",
    title: "Résister au zoom texte 200 %",
    level: 3,
    intro:
      "Le critère 1.4.4 : le contenu doit rester utilisable quand le texte est agrandi à 200 %.",
    blocks: [
      {
        kind: "text",
        text: "Les utilisateurs malvoyants agrandissent le texte sans agrandir toute la mise en page. Si les maquettes utilisent des hauteurs fixes en pixels pour les boutons, les cartes ou les champs, le texte agrandi déborde ou est tronqué.",
      },
      {
        kind: "list",
        items: [
          "Privilégier les composants à hauteur flexible (auto-layout) plutôt que les hauteurs fixes.",
          "Ne jamais tronquer du texte porteur d'information avec des points de suspension sans alternative.",
          "Vérifier les écrans denses (tableaux, formulaires longs) : ce sont eux qui cassent en premier.",
          "Spécifier au développeur : pas de `height` fixe sur les conteneurs de texte, pas de texte coupé par `overflow: hidden`.",
        ],
      },
    ],
  },
  {
    id: "langage-simple",
    title: "Langage simple et lisibilité",
    level: 3,
    intro:
      "L'accessibilité cognitive : écrire pour être compris du premier coup.",
    blocks: [
      {
        kind: "text",
        text: "Une partie des utilisateurs — troubles cognitifs, faible littératie, non-natifs — dépend de la clarté du texte. Le design inclut la rédaction : microcopie des boutons, messages d'erreur, instructions.",
      },
      {
        kind: "list",
        items: [
          "Phrases courtes, vocabulaire courant : « Envoyer » plutôt que « Soumettre votre demande ».",
          "Un bouton décrit son action : « Créer mon compte » plutôt que « OK » ou « Valider ».",
          "Éviter le jargon interne et les sigles non expliqués.",
          "Instructions placées avant l'action, découpées en étapes quand la tâche est complexe.",
          "Cohérence terminologique : appeler la même chose du même nom sur tous les écrans.",
        ],
      },
    ],
  },
  {
    id: "captions-sous-titres",
    title: "Captions et alternatives aux médias",
    level: 3,
    intro:
      "Tout contenu audio ou vidéo conçu doit prévoir son alternative dès la maquette.",
    blocks: [
      {
        kind: "list",
        items: [
          "Vidéo avec dialogue : prévoir des sous-titres synchronisés (pas seulement la transcription).",
          "Vidéo porteuse d'information visuelle : prévoir l'audiodescription ou un résumé textuel.",
          "Audio seul (podcast, message vocal) : fournir la transcription.",
          "Animation décorative en boucle : s'assurer qu'elle peut être mise en pause et qu'elle respecte le mode réduit.",
          "Dans la maquette, dessiner les contrôles du lecteur : boutons sous-titres, pause, volume — tous accessibles au clavier.",
        ],
      },
    ],
  },
  {
    id: "modales-focus-trap",
    title: "Modales : spécifier le comportement focus",
    level: 3,
    intro:
      "Une modale mal spécifiée est un piège pour la navigation clavier et les lecteurs d'écran.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir le déclencheur",
            detail:
              "Identifier précisément quel élément ouvre la modale : c'est là que le focus reviendra à la fermeture.",
          },
          {
            title: "Entrée du focus",
            detail:
              "À l'ouverture, le focus se déplace sur le premier élément interactif de la modale (ou son titre). Le spécifier dans la maquette.",
          },
          {
            title: "Piège du focus",
            detail:
              "Tant que la modale est ouverte, `Tab` boucle à l'intérieur : impossible d'atteindre le contenu derrière. Le fond est inerte et assombri.",
          },
          {
            title: "Fermetures prévues",
            detail:
              "Croix de fermeture visible et accessible, touche `Échap`, clic sur le fond assombri. Dessiner les trois dans la maquette.",
          },
          {
            title: "Retour du focus",
            detail:
              "À la fermeture, le focus revient exactement sur l'élément déclencheur, pas en haut de page.",
          },
        ],
      },
    ],
  },
  {
    id: "liens-explicites",
    title: "Des liens explicites, jamais « cliquez ici »",
    level: 3,
    intro:
      "Les lecteurs d'écran listent les liens hors contexte : leur intitulé doit se suffire à lui-même.",
    blocks: [
      {
        kind: "text",
        text: "Avec NVDA ou VoiceOver, on peut afficher la liste de tous les liens d'une page. « Cliquez ici », « En savoir plus », « Lire la suite » répétés dix fois ne permettent pas de choisir. Règle : l'intitulé du lien décrit sa destination.",
      },
      {
        kind: "list",
        items: [
          "« Télécharger le rapport annuel (PDF, 2 Mo) » plutôt que « Cliquez ici ».",
          "Si le design impose un « En savoir plus » court, le compléter d'un texte accessible : « En savoir plus sur [sujet] ».",
          "Indiquer le format et le poids quand le lien ouvre un document.",
          "Distinguer visuellement les liens du texte courant : soulignement ou style dédié, pas la seule couleur.",
        ],
      },
    ],
  },
  {
    id: "skip-links",
    title: "Liens d'évitement (skip links)",
    level: 3,
    intro:
      "Permettre aux utilisateurs clavier de sauter la navigation répétitive.",
    blocks: [
      {
        kind: "text",
        text: "Sur chaque page, la navigation principale se répète : un utilisateur clavier devrait la traverser à chaque page sans lien d'évitement. Le pattern standard est un lien « Aller au contenu » invisible, qui apparaît au premier `Tab` et amène directement au contenu principal.",
      },
      {
        kind: "code",
        language: "css",
        title: "Le pattern skip link (référence pour la spec)",
        code: ".skip-link {\n  position: absolute;\n  left: -9999px;\n}\n.skip-link:focus {\n  left: 8px;\n  top: 8px;\n  z-index: 100;\n}",
      },
      {
        kind: "text",
        text: "À spécifier dans la maquette : prévoir l'emplacement d'apparition du lien (généralement en haut à gauche) et son style de focus. Sur les applications complexes, ajouter « Aller à la navigation » ou « Aller à la recherche ».",
      },
    ],
  },
  {
    id: "tableaux-accessibles",
    title: "Tableaux de données accessibles",
    level: 3,
    intro:
      "Un tableau n'est lisible par un lecteur d'écran que si sa structure est explicite.",
    blocks: [
      {
        kind: "list",
        items: [
          "Distinguer les tableaux de données (avec en-têtes) des tableaux de mise en page (à bannir : utiliser le CSS).",
          "Chaque tableau de données a un titre ou une légende décrivant son sujet.",
          "Les en-têtes de colonnes et de lignes sont identifiés comme tels, y compris après tri ou pagination.",
          "Ne pas utiliser la seule couleur pour signaler une valeur (négatif en rouge) : ajouter un signe ou un texte.",
          "Tableaux complexes (cellules fusionnées) : les éviter ou fournir un résumé ; ils sont très difficiles à parcourir au lecteur d'écran.",
          "Sur mobile, prévoir le comportement : défilement horizontal avec en-têtes fixes, ou transformation en cartes — à dessiner dans la maquette.",
        ],
      },
    ],
  },
  {
    id: "infographies-alternatives",
    title: "Infographies : prévoir l'alternative",
    level: 3,
    intro:
      "Une infographie est une image complexe : son alternative se conçoit avec elle.",
    blocks: [
      {
        kind: "text",
        text: "Règle : toute donnée présente dans l'infographie doit exister en texte quelque part. Deux approches : un tableau de données adjacent (idéal pour les graphiques) ou un paragraphe résumant les points clés (pour les schémas explicatifs).",
      },
      {
        kind: "list",
        items: [
          "Concevoir l'infographie et son tableau de données en même temps, pas après.",
          "Le texte alternatif court annonce le sujet : « Évolution du chiffre d'affaires 2020-2025, voir le tableau ci-dessous ».",
          "Ne pas noyer l'information : l'alternative longue reprend les données, pas la décoration.",
        ],
      },
    ],
  },
  {
    id: "dark-mode-accessibilite",
    title: "Accessibilité du mode sombre",
    level: 3,
    intro:
      "Un thème sombre n'est pas une inversion : chaque contraste doit être re-mesuré.",
    blocks: [
      {
        kind: "list",
        items: [
          "Re-mesurer tous les contrastes sur le thème sombre : un gris qui passe sur blanc échoue souvent sur noir, et inversement.",
          "Désaturer les couleurs vives sur fond sombre : un rouge pur sur noir vibre et fatigue.",
          "Les surfaces élevées (cartes, modales) sont plus claires que le fond en mode sombre, pas plus sombres.",
          "Le focus visible doit être re-testé sur les deux thèmes.",
          "Éviter le noir pur `#000000` avec du blanc pur : un gris très sombre réduit la fatigue sans casser les contrastes.",
        ],
      },
    ],
  },
  {
    id: "tooltips-accessibles",
    title: "Tooltips et contenus au survol",
    level: 3,
    intro:
      "Le critère 1.4.13 : les contenus qui apparaissent au survol doivent être contrôlables.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un tooltip déclenché au survol doit aussi s'afficher au focus clavier.",
          "Il doit pouvoir être masqué sans déplacer le pointeur (touche `Échap`).",
          "Il doit rester visible quand le pointeur le survole (pour pouvoir le lire ou copier son contenu).",
          "Ne jamais mettre d'information critique uniquement dans un tooltip : si c'est important, l'afficher en permanence.",
          "Dans la maquette, dessiner l'état tooltip de chaque élément concerné.",
        ],
      },
    ],
  },
  {
    id: "aria-live-regions",
    title: "Annoncer les changements dynamiques",
    level: 3,
    intro:
      "Spécifier quels messages le lecteur d'écran doit annoncer automatiquement.",
    blocks: [
      {
        kind: "text",
        text: "Quand le contenu change sans rechargement (validation, compteur, notification), les utilisateurs de lecteurs d'écran ne le perçoivent pas sauf si la zone est déclarée comme « région live ». Le designer décide, pour chaque message dynamique, s'il doit être annoncé.",
      },
      {
        kind: "fields",
        title: "Que spécifier par message",
        fields: [
          {
            label: "Erreurs de formulaire",
            value: "Annonce immédiate : l'utilisateur doit savoir sans chercher.",
          },
          {
            label: "Confirmation d'action",
            value: "Annonce polie (après l'action en cours) : « Brouillon enregistré ».",
          },
          {
            label: "Compteurs, minuteurs",
            value: "Ne pas annoncer chaque changement : prévoir un résumé à la demande.",
          },
          {
            label: "Chargement",
            value: "Annoncer le début et la fin, pas chaque étape intermédiaire.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-1",
    title: "Erreurs courantes (1/2)",
    level: 3,
    intro:
      "Les défauts que l'on retrouve dans presque tous les audits — avec leur correction.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq classiques et comment les corriger",
        fields: [
          {
            label: "Texte gris clair sur fond blanc",
            value:
              "Pourquoi : esthétique « légère » qui sacrifie la lisibilité. Correction : mesurer chaque gris de texte et ne garder que ceux ≥ 4.5:1 ; les gris clairs sont réservés aux grands titres ou aux éléments décoratifs.",
          },
          {
            label: "Placeholder comme seul label",
            value:
              "Pourquoi : il disparaît à la saisie et son contraste est faible. Correction : label visible permanent au-dessus du champ ; le placeholder ne donne qu'un exemple de format.",
          },
          {
            label: "Focus supprimé sans remplacement",
            value:
              "Pourquoi : `outline: none` global par « propreté » visuelle. Correction : dessiner un style de focus visible (contour 3 px, offset) et l'appliquer à tous les interactifs.",
          },
          {
            label: "Icônes seules sans zone de confort",
            value:
              "Pourquoi : icône de 24 px cliquable telle quelle. Correction : dessiner une hit area de 44 × 44 autour de chaque icône interactive.",
          },
          {
            label: "Erreur signalée par la seule couleur",
            value:
              "Pourquoi : champ bordé de rouge, sans texte. Correction : icône + message explicite sous le champ + résumé en haut du formulaire.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-2",
    title: "Erreurs courantes (2/2)",
    level: 3,
    intro:
      "Cinq autres défauts fréquents, plus structurels.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq défauts structurels et leur correction",
        fields: [
          {
            label: "Hiérarchie de titres décorative",
            value:
              "Pourquoi : niveaux choisis pour leur taille visuelle. Correction : annoter les vrais niveaux logiques (H1→H2→H3) et découpler style visuel et niveau sémantique via les styles de texte.",
          },
          {
            label: "Carrousel en lecture automatique",
            value:
              "Pourquoi : mouvement imposé, contenu qui défile pendant la lecture. Correction : pas de lecture auto, ou bouton pause visible + annonce des changements.",
          },
          {
            label: "Contraste mesuré sur un seul thème",
            value:
              "Pourquoi : palette validée en clair, jamais re-testée en sombre. Correction : matrice de contrastes sur les deux thèmes, mesurée systématiquement.",
          },
          {
            label: "Contenu au survol seul",
            value:
              "Pourquoi : menus et tooltips inaccessibles au clavier. Correction : ouverture au focus, fermeture à Échap, persistance au survol du contenu.",
          },
          {
            label: "Texte dans les images",
            value:
              "Pourquoi : bannière ou graphique avec texte intégré, illisible au zoom et invisible aux lecteurs d'écran. Correction : texte réel en HTML par-dessus un fond, image purement décorative.",
          },
        ],
      },
    ],
  },
  {
    id: "checklist-audit-ecran",
    title: "Checklist d'audit d'un écran",
    level: 3,
    intro:
      "La grille de relecture à appliquer à chaque écran avant de le déclarer terminé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Contrastes : chaque texte ≥ 4.5:1 (3:1 pour le grand texte), chaque élément graphique ≥ 3:1, mesurés avec Stark.",
          "Cibles : toutes les zones interactives ≥ 44 × 44 px, espacées d'au moins 8 px.",
          "Focus : état focus dessiné et visible sur chaque interactif.",
          "Clavier : parcours complet possible sans souris, ordre logique, pas de piège.",
          "Titres : un H1, niveaux imbriqués sans saut, reflétant la structure visuelle.",
          "Formulaires : labels visibles, erreurs explicites avec texte, champs obligatoires signalés en toutes lettres.",
          "Images : alternative rédigée ou marquée décorative ; images fonctionnelles décrites par leur action.",
          "Couleur : aucune information portée par la seule couleur (doublée par icône ou texte).",
          "Mouvement : animations décoratives identifiées, alternative statique prévue.",
          "Zoom : pas de hauteur fixe sur les conteneurs de texte, pas de troncature d'information.",
        ],
      },
    ],
  },
  {
    id: "methodologie-audit-complet",
    title: "Méthodologie d'audit complet",
    level: 3,
    intro:
      "Passer d'un écran à un produit entier : l'audit d'accessibilité en six étapes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cadrer le périmètre",
            detail:
              "Lister les parcours critiques (inscription, achat, tâche principale) et les écrans associés. Un audit exhaustif de centaines d'écrans est illusoire : les parcours critiques d'abord.",
          },
          {
            title: "Audit automatisé",
            detail:
              "Passer axe DevTools sur chaque écran du périmètre. Cela détecte ~30 % des problèmes (contrastes, structure, alternatives manquantes) et donne une base chiffrée.",
          },
          {
            title: "Revue manuelle au clavier",
            detail:
              "Parcourir chaque écran sans souris : ordre de tabulation, pièges, focus visibles, interactions au survol seul. Noter chaque écart.",
          },
          {
            title: "Test au lecteur d'écran",
            detail:
              "Avec NVDA ou VoiceOver, effectuer les parcours critiques : navigation par titres, formulaires, messages dynamiques. C'est là qu'apparaissent les problèmes d'ordre de lecture et de nommage.",
          },
          {
            title: "Test des situations particulières",
            detail:
              "Zoom 200 %, simulation de daltonisme, mode réduit des animations, navigation au doigt sur mobile.",
          },
          {
            title: "Restituer en plan d'action",
            detail:
              "Chaque problème : écran concerné, critère WCAG, gravité (bloquant / majeur / mineur), correction proposée côté maquette. Trier par gravité × fréquence.",
          },
        ],
      },
    ],
  },
  {
    id: "plan-de-remediation",
    title: "Prioriser un plan de remédiation",
    level: 3,
    intro:
      "Tous les défauts ne se valent pas : ordonner les corrections par impact.",
    blocks: [
      {
        kind: "table",
        headers: ["Priorité", "Exemples", "Logique"],
        rows: [
          ["P0 — bloquant", "Parcours d'achat impossible au clavier, formulaire sans labels", "Des utilisateurs sont totalement exclus : corriger avant toute nouvelle fonctionnalité"],
          ["P1 — majeur", "Contrastes insuffisants sur les CTA, focus invisibles", "Friction forte pour beaucoup : corriger dans le sprint en cours"],
          ["P2 — mineur", "Hiérarchie de titres imparfaite sur une page secondaire", "Gêne réelle mais contournable : planifier"],
          ["P3 — opportuniste", "Passer de 4.5:1 à 7:1 sur un texte déjà conforme", "Amélioration : traiter lors des refontes"],
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : corriger à la maquette d'abord, puis faire implémenter. Un plan de remédiation qui ne produit que des tickets de développement sans maquettes corrigées reproduit les mêmes erreurs.",
      },
    ],
  },
  {
    id: "documenter-specs-accessibilite",
    title: "Documenter les specs d'accessibilité",
    level: 3,
    intro:
      "Ce que la maquette doit transmettre au développeur pour que l'accessibilité survive à l'implémentation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Niveaux de titres annotés sur chaque texte (H1, H2…) dans la maquette.",
          "Textes alternatifs rédigés pour chaque image informative, images décoratives marquées comme telles.",
          "États focus, erreur, désactivé dessinés pour chaque composant.",
          "Comportement focus des modales et composants complexes décrit (entrée, piège, retour).",
          "Messages à annoncer aux lecteurs d'écran identifiés (erreurs, confirmations).",
          "Zones de confort (hit areas) dessinées autour des petites icônes interactives.",
          "Contrastes mesurés et notés pour les combinaisons non évidentes.",
          "Comportement en mode réduit des animations spécifié (état final statique).",
        ],
      },
      {
        kind: "text",
        text: "Format pratique : une page « Specs accessibilité » par écran complexe dans le fichier Figma, ou des annotations directement sur les composants. L'objectif est qu'un développeur n'ait jamais à deviner.",
      },
    ],
  },
  {
    id: "designer-avec-utilisateurs-concernes",
    title: "Tester avec des utilisateurs concernés",
    level: 3,
    intro:
      "Rien ne remplace l'observation réelle : organiser des tests avec des personnes en situation de handicap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Recruter des utilisateurs de lecteurs d'écran, de navigation clavier exclusive, de loupes d'écran : ce sont des experts de leur propre usage.",
          "Les faire tester sur leurs propres outils et configurations, pas sur une machine de test aseptisée.",
          "Protocole identique aux tests utilisateurs classiques : tâches réalistes, observation sans guider, questions ouvertes.",
          "Rémunérer comme tout participant à une étude : c'est un travail d'expertise.",
          "Croiser avec l'audit technique : les tests révèlent l'usage réel, l'audit révèle les écarts aux critères — les deux sont complémentaires.",
        ],
      },
      {
        kind: "text",
        text: "Fréquence réaliste : même deux ou trois sessions par trimestre transforment la culture d'une équipe. L'objectif n'est pas la perfection statistique mais l'exposition régulière à l'usage réel.",
      },
    ],
  },
  {
    id: "exercice-audit-30-min",
    title: "Exercice : auditer un écran en 30 minutes",
    level: 3,
    intro:
      "Un exercice concret et chronométré pour ancrer la méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un écran (5 min)",
            detail:
              "Prendre un écran réel : une page d'inscription d'un service connu, ou l'un de ses propres écrans. Capturer ou ouvrir la maquette.",
          },
          {
            title: "Mesurer les contrastes (10 min)",
            detail:
              "Avec Stark ou WebAIM, mesurer les 5 combinaisons principales (titres, texte courant, boutons, placeholders, icônes). Noter chaque échec avec son ratio.",
          },
          {
            title: "Passer la checklist (10 min)",
            detail:
              "Appliquer la checklist d'audit : cibles, focus, labels, hiérarchie de titres, informations portées par la seule couleur.",
          },
          {
            title: "Rédiger 3 correctifs (5 min)",
            detail:
              "Pour les 3 problèmes les plus graves, écrire le correctif côté maquette en une phrase chacun : quoi changer, où, pourquoi.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-composants-accessibles",
    title: "Projet : une bibliothèque de composants accessibles",
    level: 3,
    intro:
      "Construire cinq composants irréprochables, états et specs inclus.",
    blocks: [
      {
        kind: "text",
        text: "Objectif : bouton, champ de formulaire, case à cocher, onglet et modale — chacun avec tous ses états dessinés (repos, survol, focus, désactivé, erreur), ses contrastes mesurés, ses textes alternatifs et sa spec de comportement clavier/focus.",
      },
      {
        kind: "list",
        items: [
          "Livrable 1 : les 5 composants dans Figma, variantes d'états comprises.",
          "Livrable 2 : une page de specs par composant (titres, alternatives, focus, annonces).",
          "Livrable 3 : un rapport d'audit axe DevTools sur un écran assemblé avec ces composants.",
          "Critère de réussite : un tiers peut implémenter les composants sans poser de question d'accessibilité.",
        ],
      },
    ],
  },
  {
    id: "projet-refonte-accessible",
    title: "Projet : refonte accessible d'un parcours",
    level: 3,
    intro:
      "Prendre un parcours existant peu accessible et le reconstruire.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le parcours et auditer",
            detail:
              "Un tunnel d'inscription ou de commande réel. Appliquer la méthodologie d'audit complète et lister les problèmes par priorité.",
          },
          {
            title: "Re-maquetter",
            detail:
              "Reconcevoir les écrans en appliquant les règles : contrastes, cibles, focus, formulaires, hiérarchie. Chaque décision traçable vers un critère WCAG.",
          },
          {
            title: "Prototyper et tester",
            detail:
              "Prototype cliquable testé au clavier puis au lecteur d'écran (NVDA ou VoiceOver). Itérer sur les blocages observés.",
          },
          {
            title: "Restituer avant / après",
            detail:
              "Documenter chaque correction : problème, critère concerné, avant, après. C'est exactement le format attendu dans un portfolio.",
          },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite",
    level: 3,
    intro:
      "Les compétences de la roadmap UX Designer qui prolongent naturellement l'accessibilité.",
    blocks: [
      {
        kind: "fields",
        title: "Continuer dans la roadmap ux-designer",
        fields: [
          {
            label: "Design System (`design-system`)",
            value:
              "Industrialiser l'accessibilité : des composants accessibles par défaut, documentés et réutilisés par toutes les équipes.",
          },
          {
            label: "UX Research (`ux-research`)",
            value:
              "Tester avec des utilisateurs en situation de handicap : la recherche qui révèle ce qu'aucun audit automatisé ne voit.",
          },
          {
            label: "UI Design (`ui-design`)",
            value:
              "Approfondir la rigueur des composants : états exhaustifs, grilles, espacements — là où se jouent les détails accessibles.",
          },
          {
            label: "Motion Design (`motion-design`)",
            value:
              "Maîtriser le mouvement accessible : `prefers-reduced-motion`, animations essentielles vs décoratives.",
          },
          {
            label: "Portfolio (`portfolio`)",
            value:
              "Raconter un audit d'accessibilité en case study : problème, méthode, corrections, avant/après — un sujet qui distingue un portfolio.",
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
      "Les références officielles et les outils pour aller plus loin.",
    blocks: [
      {
        kind: "fields",
        title: "Références et outils réels",
        fields: [
          {
            label: "WCAG 2.2 — Quick Reference (W3C)",
            value: "https://www.w3.org/WAI/WCAG22/quickref/ — la liste filtrable de tous les critères, la référence officielle.",
          },
          {
            label: "WebAIM Contrast Checker",
            value: "https://webaim.org/resources/contrastchecker/ — vérification manuelle des ratios de contraste.",
          },
          {
            label: "axe DevTools (Deque)",
            value: "https://www.deque.com/axe/devtools/ — audit automatisé dans le navigateur.",
          },
          {
            label: "NVDA (NV Access)",
            value: "https://www.nvaccess.org/ — lecteur d'écran gratuit pour Windows.",
          },
          {
            label: "Stark",
            value: "https://www.getstark.co/ — plugin Figma : contrastes, daltonisme, focus.",
          },
        ],
      },
    ],
  },
];

import type { SkillGuide } from "../skill-guides";

/**
 * Guides pédagogiques — UX : parcours UX Designer.
 *
 * Ces entrées enrichissent les compétences de la roadmap `ux-designer`
 * (désignées par leur `id`) avec un contenu éditorial structuré :
 * définition, intérêt pédagogique, prérequis expliqués, concepts clés,
 * fonctionnement, exemple concret et projets progressifs.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - Ton : documentation technique premium, concret, sans marketing. Français.
 */
export const GUIDES_UX: Record<string, SkillGuide> = {
  // ------------------------------------------------------------------ design-thinking
  "design-thinking": {
    definition:
      "Le design thinking est une méthode de résolution de problèmes centrée sur l'humain : comprendre les utilisateurs (empathie), cadrer le vrai problème, générer des idées, prototyper et tester en itérations courtes.",
    whyLearn:
      "La plupart des échecs produit viennent de solutions brillantes apportées à de mauvais problèmes. Le design thinking impose de valider le problème avant la solution : il économise des mois de développement inutile et aligne toute l'équipe sur des besoins réels.",
    conceptDetails: [
      {
        name: "Empathie",
        definition:
          "Observer et écouter les utilisateurs dans leur contexte réel, sans projeter ses propres usages : la matière première de tout bon design.",
      },
      {
        name: "Problem framing",
        definition:
          "Reformuler le brief jusqu'au vrai problème (« comment pourrait-on… ») : un problème bien cadré contient déjà la moitié de sa solution.",
      },
      {
        name: "Idéation",
        definition:
          "Générer beaucoup d'idées rapidement, sans juger : la quantité précède la qualité, et les idées folles débloquent les bonnes.",
      },
      {
        name: "Itération",
        definition:
          "Boucler vite entre prototype et test : chaque cycle élimine des hypothèses fausses à moindre coût.",
      },
      {
        name: "Double diamant",
        definition:
          "Le modèle en deux diamants : diverger pour explorer le problème, converger pour le définir, diverger pour les solutions, converger pour livrer.",
      },
    ],
    howItWorksTitle: "Le double diamant",
    howItWorks: ["DÉCOUVRIR", "DÉFINIR", "DÉVELOPPER", "LIVRER", "TESTER", "ITÉRER"],
    example: {
      title: "Repenser une inscription qui fait fuir",
      steps: [
        "Observation : 70 % d'abandon au formulaire",
        "Problème cadré : trop de champs demandés trop tôt",
        "Atelier d'idéation en équipe",
        "Prototype allégé en deux étapes",
        "Conversion en hausse de 32 %",
      ],
    },
    projectsDetailed: [
      {
        title: "Challenge design thinking en équipe",
        flow: "Brief → Terrain → Idéation → Prototype → Test utilisateur",
      },
      {
        title: "Reformulation d'un brief flou",
        flow: "Brief initial → Questions → Vrai problème → Périmètre redéfini",
      },
    ],
  },

  // ------------------------------------------------------------------ typographie
  typographie: {
    definition:
      "La typographie est l'art de composer le texte : choix des polices, tailles, graisses, interlignages et hiérarchie pour rendre l'information lisible et structurée.",
    whyLearn:
      "Le texte représente l'essentiel des interfaces : une mauvaise typographie rend tout illisible, une bonne passe inaperçue. Maîtriser la hiérarchie typographique, c'est structurer l'information avant même d'ajouter la moindre couleur — et c'est visible sur chaque écran.",
    conceptDetails: [
      {
        name: "Hiérarchie",
        definition:
          "Signaler l'importance relative par la taille, la graisse et la couleur : l'œil doit comprendre la structure avant de lire un mot.",
      },
      {
        name: "Échelle typographique",
        definition:
          "Une suite de tailles cohérentes (ratio 1.25 ou 1.333) : un système au lieu de tailles choisies au hasard sur chaque écran.",
      },
      {
        name: "Lisibilité",
        definition:
          "Longueur de ligne (45–75 caractères), interlignage généreux, contrastes : les paramètres qui rendent un long texte lisible sans fatigue.",
      },
      {
        name: "Pairing",
        definition:
          "Associer deux polices complémentaires (titres + texte) : contraste de caractère sans cacophonie, jamais plus de deux familles.",
      },
      {
        name: "Webfonts",
        definition:
          "Charger des polices via Google Fonts ou en local : formats woff2, font-display: swap pour éviter le texte invisible au chargement.",
      },
    ],
    howItWorksTitle: "Construire une échelle",
    howItWorks: ["BASE 16px", "RATIO 1.25", "NIVEAUX", "GRAISSES", "INTERLIGNES", "TEST"],
    example: {
      title: "La typographie d'une page article",
      steps: [
        "Titre à 32 px en graisse forte",
        "Chapeau à 20 px pour le résumé",
        "Corps de texte à 16 px, interligne 1.6",
        "Intertitres à 20 px pour scanner",
        "Légendes discrètes à 13 px",
      ],
    },
    projectsDetailed: [
      {
        title: "Échelle typographique d'un produit",
        flow: "Audit de l'existant → Ratio choisi → Styles nommés → Documentation",
      },
      {
        title: "Refonte typographique",
        flow: "Avant / après → Mesures de lisibilité → Cohérence sur tous les écrans",
      },
    ],
  },

  // ------------------------------------------------------------------ couleur
  couleur: {
    definition:
      "La couleur en design d'interface est un langage : elle signale les actions, organise la hiérarchie et transmet l'identité — à condition de respecter les règles de contraste et de signification.",
    whyLearn:
      "La couleur guide l'œil plus vite que le texte : un bouton primaire reconnaissable, des erreurs en rouge, des états cohérents. Mal utilisée, elle exclut (contrastes insuffisants) et embrouille. La maîtriser, c'est designer avec intention plutôt que par goût personnel.",
    conceptDetails: [
      {
        name: "Théorie des couleurs",
        definition:
          "Teinte, saturation, luminosité et relations sur le cercle chromatique : le vocabulaire pour construire des palettes harmonieuses et justifiables.",
      },
      {
        name: "Contrastes WCAG",
        definition:
          "4.5:1 minimum pour le texte courant (AA) : un ratio mesurable, pas une impression — vérifiable avec des outils comme Stark.",
      },
      {
        name: "Palettes",
        definition:
          "Primaire, neutres, sémantiques (succès, erreur, alerte) : un nombre limité de couleurs aux rôles définis, pas un arc-en-ciel.",
      },
      {
        name: "Hiérarchie",
        definition:
          "La couleur la plus saturée attire l'œil en premier : la réserver aux actions principales, les neutres pour le reste.",
      },
      {
        name: "Dark mode",
        definition:
          "Un thème sombre n'est pas une inversion : surfaces élevées plus claires, couleurs désaturées, contrastes re-vérifiés un par un.",
      },
    ],
    howItWorksTitle: "Construire une palette",
    howItWorks: ["PRIMAIRE", "NEUTRES", "SÉMANTIQUES", "CONTRASTES", "DARK MODE", "TOKENS"],
    example: {
      title: "Un système d'alertes",
      steps: [
        "Rouge erreur vérifié à 4.5:1",
        "Orange pour les avertissements",
        "Vert pour les succès",
        "Bleu pour l'information",
        "Ensemble testé en simulation de daltonisme",
      ],
    },
    projectsDetailed: [
      {
        title: "Palette accessible documentée",
        flow: "Teintes → Mesure des contrastes → Rôles d'usage → Tokens nommés",
      },
      {
        title: "Audit couleur d'une application",
        flow: "Inventaire des couleurs → Mesures → Corrections → Règles d'usage",
      },
    ],
  },

  // ------------------------------------------------------------------ figma
  figma: {
    definition:
      "Figma est l'outil de design d'interface collaboratif de référence : dessin vectoriel, composants, prototypage et transmission aux développeurs, le tout dans le navigateur et en temps réel.",
    whyLearn:
      "Figma est le lieu où se prennent les décisions produit visuelles : maquettes, design systems, prototypes testables. Le maîtriser — auto-layout, variants, composants — c'est parler couramment avec designers comme avec développeurs.",
    prerequisiteNotes: {
      "design-thinking":
        "Savoir ce que l'on cherche à résoudre : Figma matérialise des idées, il ne remplace pas la réflexion en amont.",
    },
    conceptDetails: [
      {
        name: "Auto-layout",
        definition:
          "Des cadres qui s'ajustent automatiquement à leur contenu : le responsive du designer, indispensable pour des composants robustes.",
      },
      {
        name: "Composants & variants",
        definition:
          "Un composant maître et ses variants (tailles, états) : une modification se propage à toutes les instances du fichier.",
      },
      {
        name: "Styles",
        definition:
          "Couleurs, textes et effets nommés et réutilisables : changer un style met à jour tout le produit d'un coup.",
      },
      {
        name: "Prototypage",
        definition:
          "Relier les écrans par des interactions (clic, survol, transitions) pour produire une maquette cliquable testable.",
      },
      {
        name: "Dev Mode",
        definition:
          "Le mode qui expose specs, mesures et assets aux développeurs : le pont entre la maquette et le code.",
      },
    ],
    howItWorksTitle: "D'un cadre au composant",
    howItWorks: ["FRAME", "AUTO-LAYOUT", "STYLES", "VARIANT", "INSTANCE", "DEV MODE"],
    example: {
      title: "Un bouton réutilisable",
      steps: [
        "Cadre en auto-layout horizontal",
        "Variants : tailles et états",
        "Styles de couleur appliqués",
        "Instances posées dans les écrans",
        "Specs consultables en Dev Mode",
      ],
    },
    projectsDetailed: [
      {
        title: "Maquette responsive complète",
        flow: "Version mobile → Version desktop → Breakpoints → Prototype cliquable",
      },
      {
        title: "Bibliothèque de composants",
        flow: "Inventaire des besoins → Composants → Variants → Documentation",
      },
    ],
  },

  // ------------------------------------------------------------------ ui-design
  "ui-design": {
    definition:
      "L'UI design (User Interface) conçoit l'aspect visuel et interactif des écrans : grilles, espacements, composants, états — la couche visible et tactile de l'expérience utilisateur.",
    whyLearn:
      "L'UI est ce que l'utilisateur voit et touche : une interface claire inspire confiance, une interface approximative la détruit. La rigueur — grille 8pt, états exhaustifs, cohérence — transforme une collection d'écrans en produit.",
    prerequisiteNotes: {
      typographie:
        "La hiérarchie du texte structure chaque écran : l'UI s'appuie dessus avant tout le reste.",
      couleur:
        "Palettes et contrastes validés : la couleur porte les actions principales et les états.",
      figma:
        "L'outil de production : auto-layout et composants pour construire vite et juste.",
    },
    conceptDetails: [
      {
        name: "Grilles",
        definition:
          "Des colonnes et des marges qui alignent les éléments : l'ordre invisible qui rend une mise en page nette et scannable.",
      },
      {
        name: "Espacement (8pt)",
        definition:
          "Une unité de base de 8 px (et ses multiples) pour tous les espacements : la cohérence rythmique de l'interface.",
      },
      {
        name: "États (hover, focus...)",
        definition:
          "Chaque composant existe en plusieurs états (repos, survol, focus, désactivé, erreur) : les dessiner tous évite les surprises en développement.",
      },
      {
        name: "Iconographie",
        definition:
          "Des icônes au trait cohérent, à la taille optique uniforme : un langage visuel qui complète le texte sans le remplacer.",
      },
      {
        name: "Cohérence",
        definition:
          "Mêmes patterns, mêmes espacements, mêmes comportements d'un écran à l'autre : la cohérence réduit la charge mentale de l'utilisateur.",
      },
    ],
    howItWorksTitle: "Composer un écran",
    howItWorks: ["GRILLE", "HIÉRARCHIE", "COMPOSANTS", "ÉTATS", "ESPACEMENTS", "REVUE"],
    example: {
      title: "Une carte produit",
      steps: [
        "Grille 8pt pour les alignements",
        "Image au ratio 4:3",
        "Prix en hiérarchie visuelle forte",
        "États hover et focus dessinés",
        "Badge promotionnel discret",
      ],
    },
    projectsDetailed: [
      {
        title: "Refonte UI d'une application",
        flow: "Audit visuel → Système (grille, espacements) → Écrans → Vérification de cohérence",
      },
      {
        title: "Écrans edge cases",
        flow: "État vide → Erreur → Chargement → Contenu long → Texte traduit",
      },
    ],
  },

  // ------------------------------------------------------------------ ux-research
  "ux-research": {
    definition:
      "L'UX research étudie les utilisateurs réels — leurs besoins, comportements et frustrations — via entretiens, observations et données, pour fonder les décisions design sur des preuves plutôt que des opinions.",
    whyLearn:
      "Sans recherche, le design repose sur des opinions : celles du designer, du manager, du client. La recherche transforme les débats en décisions fondées, révèle les vrais problèmes et évite de construire ce que personne ne veut.",
    prerequisiteNotes: {
      "design-thinking":
        "L'empathie et le cadrage du problème : la recherche en est la mise en pratique rigoureuse.",
    },
    conceptDetails: [
      {
        name: "Entretiens utilisateurs",
        definition:
          "Des conversations semi-directives qui révèlent motivations et frustrations : écouter plus que parler, creuser avec des « pourquoi ».",
      },
      {
        name: "Personas & JTBD",
        definition:
          "Les personas incarnent des archétypes d'utilisateurs, les Jobs To Be Done décrivent ce qu'ils cherchent à accomplir : deux outils pour décider pour qui on designe.",
      },
      {
        name: "Surveys",
        definition:
          "Des questionnaires quantitatifs pour valider à grande échelle ce que le qualitatif a révélé : complément, jamais substitut.",
      },
      {
        name: "Analyse qualitative",
        definition:
          "Coder les verbatims, dégager des thèmes, synthétiser en insights actionnables : transformer des heures d'entretiens en décisions.",
      },
      {
        name: "Biais",
        definition:
          "Biais de confirmation, questions orientées, échantillon biaisé : les connaître, c'est éviter de prouver ce qu'on voulait déjà croire.",
      },
    ],
    howItWorksTitle: "Une étude, de bout en bout",
    howItWorks: ["QUESTION", "PROTOCOLE", "TERRAIN", "SYNTHÈSE", "INSIGHTS", "DÉCISIONS"],
    example: {
      title: "Pourquoi les paniers sont abandonnés",
      steps: [
        "Cinq entretiens avec des acheteurs",
        "Frais de livraison cachés identifiés",
        "Prototype au prix transparent",
        "Test A/B contre la version actuelle",
        "Abandon en baisse de 18 %",
      ],
    },
    projectsDetailed: [
      {
        title: "Étude utilisateurs complète",
        flow: "Objectifs → Guide d'entretien → Sessions → Codage → Insights",
      },
      {
        title: "Synthèse d'insights",
        flow: "Données brutes → Thèmes émergents → Recommandations priorisées",
      },
    ],
  },

  // ------------------------------------------------------------------ wireframing
  wireframing: {
    definition:
      "Le wireframing structure les écrans en noir et blanc avant tout travail visuel : architecture de l'information, hiérarchie et parcours — la charpente de l'expérience.",
    whyLearn:
      "Discuter structure avant esthétique évite les refontes coûteuses : un wireframe se jette, une maquette finalisée coûte cher à reprendre. C'est aussi le support idéal pour aligner produit, design et développement sur le « quoi » avant le « comment ».",
    prerequisiteNotes: {
      "ux-research":
        "Les parcours réels observés chez les utilisateurs : on structure ce que la recherche a révélé.",
      figma:
        "Construire vite : composants basse-fidélité et auto-layout pour itérer sans s'attacher.",
    },
    conceptDetails: [
      {
        name: "Architecture de l'information",
        definition:
          "Organiser et nommer le contenu pour qu'on le trouve : l'ossature du produit, invisible quand elle est bonne, douloureuse quand elle est mauvaise.",
      },
      {
        name: "User flows",
        definition:
          "Les chemins pas à pas vers un objectif (s'inscrire, acheter) : ils révèlent les étapes superflues et les culs-de-sac.",
      },
      {
        name: "Wireframes",
        definition:
          "Des écrans schématiques sans style : blocs, hiérarchie, interactions — assez pour discuter, trop bruts pour s'attacher.",
      },
      {
        name: "Card sorting",
        definition:
          "Faire classer des cartes de contenu par des utilisateurs : révèle leur modèle mental pour nommer et regrouper l'information.",
      },
      {
        name: "Navigation",
        definition:
          "Menus, fils d'Ariane, recherche : les moyens de se repérer et de se déplacer — testables dès le wireframe.",
      },
    ],
    howItWorksTitle: "D'un besoin à un parcours",
    howItWorks: ["BESOIN", "FLOW", "ÉCRANS", "WIREFRAME", "TEST", "ITÉRATION"],
    example: {
      title: "Un tunnel d'achat simplifié",
      steps: [
        "User flow en quatre étapes",
        "Wireframes basse-fidélité par étape",
        "Test papier avec trois utilisateurs",
        "Frictions identifiées à l'étape paiement",
        "Version à deux étapes validée",
      ],
    },
    projectsDetailed: [
      {
        title: "Arborescence d'un site complexe",
        flow: "Inventaire du contenu → Card sorting → Arborescence → Tests de findability",
      },
      {
        title: "User flows d'un parcours",
        flow: "Objectif utilisateur → Étapes → Points de décision → Cas limites",
      },
    ],
  },

  // ------------------------------------------------------------------ prototypage
  prototypage: {
    definition:
      "Le prototypage matérialise une idée à la fidélité juste nécessaire pour la tester : du croquis papier au prototype cliquable haute-fidélité, l'objectif est d'apprendre vite et à moindre coût.",
    whyLearn:
      "Un prototype testé vaut mieux que dix réunions : il confronte les hypothèses au réel avant d'écrire une ligne de code. Savoir choisir la bonne fidélité — ni trop détaillée trop tôt, ni trop vague pour être utile — accélère chaque itération.",
    prerequisiteNotes: {
      wireframing:
        "La structure validée en wireframes : le prototype lui donne vie et la rend testable.",
      "ui-design":
        "Les composants et leurs états : la matière visuelle pour monter en fidélité.",
    },
    conceptDetails: [
      {
        name: "Fidélité adaptée",
        definition:
          "Papier pour explorer, cliquable pour tester un parcours, haute-fidélité pour valider le visuel : la fidélité suit la question posée.",
      },
      {
        name: "Prototypes cliquables",
        definition:
          "Des écrans reliés par des interactions réalistes : suffisants pour observer un utilisateur accomplir une tâche.",
      },
      {
        name: "Tests utilisateurs",
        definition:
          "Cinq utilisateurs, des tâches concrètes, observer sans guider : la méthode la plus rentable pour détecter les problèmes.",
      },
      {
        name: "Itération",
        definition:
          "Chaque test produit des constats qui nourrissent la version suivante : documenter ce qui change et pourquoi.",
      },
      {
        name: "Handoff",
        definition:
          "Transmettre aux développeurs specs, assets et comportements : un prototype annoté vaut mieux qu'un document séparé.",
      },
    ],
    howItWorksTitle: "Le cycle du prototype",
    howItWorks: ["HYPOTHÈSE", "PROTOTYPE", "TEST", "OBSERVATION", "ITÉRATION", "DÉCISION"],
    example: {
      title: "Tester une nouvelle navigation",
      steps: [
        "Prototype cliquable en une journée",
        "Cinq utilisateurs, une tâche : trouver les tarifs",
        "Trois échecs sur cinq observés",
        "Navigation simplifiée en V2",
        "Tâche réussie par les cinq suivants",
      ],
    },
    projectsDetailed: [
      {
        title: "Prototype testé avec 5 utilisateurs",
        flow: "Scénario → Prototype → Sessions → Synthèse des constats",
      },
      {
        title: "Itérations documentées",
        flow: "V1 → Retours → V2 → Décisions tracées",
      },
    ],
  },

  // ------------------------------------------------------------------ design-system
  "design-system": {
    definition:
      "Un design system est le langage visuel et interactif partagé d'une organisation : tokens, composants documentés et règles d'usage qui garantissent cohérence et efficacité à l'échelle.",
    whyLearn:
      "Quand plusieurs équipes construisent le même produit, sans système commun chacune réinvente : incohérences, dette, lenteur. Un design system industrialise la qualité, rend l'accessibilité systématique et libère les designers pour les vrais problèmes.",
    prerequisiteNotes: {
      "ui-design":
        "La rigueur des composants bien construits : le système l'industrialise à l'échelle de l'organisation.",
      figma:
        "Variants, styles et tokens : l'outillage concret sur lequel le système est construit.",
    },
    conceptDetails: [
      {
        name: "Design tokens",
        definition:
          "Couleurs, espacements, typographies nommés et versionnés : une modification de token se propage à tout le produit.",
      },
      {
        name: "Documentation",
        definition:
          "Règles d'usage, exemples et contre-exemples : un composant sans documentation sera mal utilisé, aussi bon soit-il.",
      },
      {
        name: "Gouvernance",
        definition:
          "Qui décide, qui contribue, qui valide les évolutions : sans gouvernance claire, le système se fragmente dès la deuxième équipe.",
      },
      {
        name: "Contribution model",
        definition:
          "Le processus par lequel les équipes proposent des composants : critères d'acceptation, revue, intégration au système.",
      },
      {
        name: "Mesure d'adoption",
        definition:
          "Suivre l'usage réel des composants (couverture, dette restante) : un système non adopté est un système mort.",
      },
    ],
    howItWorksTitle: "Construire un système",
    howItWorks: ["AUDIT", "TOKENS", "COMPOSANTS", "DOC", "ADOPTION", "GOUVERNANCE"],
    example: {
      title: "Unifier trois produits",
      steps: [
        "Inventaire : 47 variations de boutons",
        "Tokens communs définis",
        "Composant bouton unique",
        "Migration progressive par produit",
        "Dette visuelle résorbée en un trimestre",
      ],
    },
    projectsDetailed: [
      {
        title: "Design system documenté",
        flow: "Fondations → Composants → Règles d'usage → Site de documentation",
      },
      {
        title: "Audit d'un design system existant",
        flow: "Usage réel mesuré → Écarts → Recommandations priorisées",
      },
    ],
  },

  // ------------------------------------------------------------------ accessibilite-design
  "accessibilite-design": {
    definition:
      "L'accessibilité en design garantit que les interfaces sont utilisables par tout le monde : contrastes, tailles de cibles, focus visibles, alternatives — dès la maquette, pas après le développement.",
    whyLearn:
      "La majorité des problèmes d'accessibilité naissent dans le design : couleurs illisibles, zones tactiles trop petites, focus invisibles. Les corriger à la maquette coûte dix fois moins cher qu'en production — et c'est une obligation légale dans de nombreux contextes.",
    prerequisiteNotes: {
      "ui-design":
        "Les composants dessinés : c'est là que se jouent contrastes, états et tailles de cibles.",
      "ux-research":
        "Tester avec des utilisateurs en situation de handicap : rien ne remplace l'observation réelle.",
    },
    conceptDetails: [
      {
        name: "WCAG 2.2",
        definition:
          "Les critères internationaux d'accessibilité (A, AA, AAA) : la référence pour évaluer et spécifier le niveau exigé.",
      },
      {
        name: "Contrastes",
        definition:
          "4.5:1 pour le texte, 3:1 pour les composants graphiques : mesurés avec des outils, sur chaque combinaison de couleurs.",
      },
      {
        name: "Focus & clavier",
        definition:
          "Un indicateur de focus visible et un ordre de tabulation logique : la base de la navigation sans souris, à dessiner explicitement.",
      },
      {
        name: "Motion",
        definition:
          "Réduire ou désactiver les animations non essentielles (prefers-reduced-motion) : le mouvement peut exclure autant qu'il guide.",
      },
      {
        name: "Tests avec utilisateurs",
        definition:
          "Faire tester par des personnes utilisant lecteurs d'écran, clavier ou loupes : révèle ce qu'aucun audit automatisé ne voit.",
      },
    ],
    howItWorksTitle: "Auditer un écran",
    howItWorks: ["CONTRASTES", "FOCUS", "CLAVIER", "LECTEUR", "MOTION", "CORRECTIFS"],
    example: {
      title: "Un formulaire accessible",
      steps: [
        "Labels visibles au-dessus de chaque champ",
        "Messages d'erreur explicites et liés",
        "Contrastes vérifiés à 4.5:1",
        "Focus visible sur tous les champs",
        "Parcours complet testé au clavier",
      ],
    },
    projectsDetailed: [
      {
        title: "Audit d'accessibilité",
        flow: "Écrans clés → Mesures → Priorités → Correctifs maquette",
      },
      {
        title: "Composants accessibles",
        flow: "États → Focus → Spécifications pour les développeurs",
      },
    ],
  },

  // ------------------------------------------------------------------ motion-design
  "motion-design": {
    definition:
      "Le motion design utilise le mouvement comme langage : transitions, micro-interactions et chorégraphies qui guident l'attention et expliquent les changements d'état d'une interface.",
    whyLearn:
      "Le mouvement rend les interfaces compréhensibles : d'où vient ce panneau, où est passé mon fichier, que se passe-t-il pendant le chargement. Bien dosé, il guide ; mal dosé, il agresse. C'est une compétence rare et recherchée.",
    prerequisiteNotes: {
      prototypage:
        "Les prototypes animés : le mouvement se teste auprès d'utilisateurs avant d'être spécifié.",
    },
    conceptDetails: [
      {
        name: "Principes d'animation",
        definition:
          "Les douze principes (anticipation, suivi, easing…) adaptés aux interfaces : le mouvement doit avoir une intention lisible.",
      },
      {
        name: "Easing",
        definition:
          "Les courbes d'accélération (ease-out pour apparaître, ease-in pour disparaître) : ce qui rend un mouvement naturel ou mécanique.",
      },
      {
        name: "Chorégraphie",
        definition:
          "Ordonner plusieurs mouvements (délais, cascades) pour raconter une transition : l'œil suit une hiérarchie, pas un chaos.",
      },
      {
        name: "Reduced motion",
        definition:
          "Respecter prefers-reduced-motion : proposer des transitions sobres quand l'utilisateur les a désactivées au niveau système.",
      },
      {
        name: "Prototypage animé",
        definition:
          "Maquetter le mouvement (Figma, Principle, code) pour le faire valider : une spec écrite ne transmet jamais le ressenti.",
      },
    ],
    howItWorksTitle: "Concevoir un mouvement",
    howItWorks: ["INTENTION", "DURÉE", "EASING", "CHORÉGRAPHIE", "REDUCED", "SPECS"],
    example: {
      title: "L'ouverture d'un panneau latéral",
      steps: [
        "200 ms en ease-out pour apparaître",
        "Le fond s'assombrit progressivement",
        "Le panneau glisse depuis le bord",
        "Le focus est déplacé dedans",
        "La fermeture joue l'inverse",
      ],
    },
    projectsDetailed: [
      {
        title: "Système de motion documenté",
        flow: "Durées → Courbes d'easing → Patterns → Tokens de motion",
      },
      {
        title: "Micro-interactions",
        flow: "Boutons → Feedbacks → Chargements → Transitions d'écrans",
      },
    ],
  },

  // ------------------------------------------------------------------ portfolio
  portfolio: {
    definition:
      "Un portfolio UX présente le travail d'un designer à travers des case studies : problème, processus, décisions et résultats — la preuve d'une méthode, pas seulement de jolies images.",
    whyLearn:
      "Les recruteurs embauchent une façon de penser, pas des captures d'écran. Un portfolio qui raconte le processus — recherche, itérations, échecs, métriques — distingue un candidat parmi des centaines de galeries interchangeables.",
    prerequisiteNotes: {
      "design-system":
        "Un projet de système démontre la rigueur à l'échelle : une excellente matière de case study.",
      prototypage:
        "Le processus itératif documenté : la matière première narrative des case studies.",
      "ux-research":
        "Les preuves : insights et données qui fondent les décisions racontées.",
    },
    conceptDetails: [
      {
        name: "Case studies",
        definition:
          "Le récit structuré d'un projet : contexte, problème, processus, décisions, résultats — trois suffisent s'ils sont solides.",
      },
      {
        name: "Storytelling",
        definition:
          "Raconter avec un arc narratif (tension, exploration, résolution) : on retient une histoire, pas une liste de livrables.",
      },
      {
        name: "Métriques",
        definition:
          "Des résultats chiffrés quand ils existent (conversion, temps de tâche) : la preuve que le design a servi le produit.",
      },
      {
        name: "Présentation",
        definition:
          "Savoir défendre son travail à l'oral en dix minutes : clarté, rythme, réponses aux objections — une compétence qui se prépare.",
      },
      {
        name: "Personal branding",
        definition:
          "Une identité cohérente (site, réseaux, écrits) qui rend mémorable : le portfolio est le centre, pas la totalité.",
      },
    ],
    howItWorksTitle: "Construire une case study",
    howItWorks: ["CONTEXTE", "PROBLÈME", "PROCESSUS", "DÉCISIONS", "RÉSULTATS", "APPRENTISSAGES"],
    example: {
      title: "Raconter une refonte",
      steps: [
        "Contexte posé en trois lignes",
        "Problème chiffré : -40 % de conversion",
        "Trois itérations clés montrées",
        "Résultat : +24 % de conversion",
        "Ce que le projet a appris",
      ],
    },
    projectsDetailed: [
      {
        title: "Portfolio avec 3 case studies",
        flow: "Sélection des projets → Récits structurés → Maquettes → Publication",
      },
      {
        title: "Présentation orale",
        flow: "10 minutes → Narration → Questions pièges → Feedbacks intégrés",
      },
    ],
  },
};

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du Wireframing & IA : architecture de l'information,
 * user flows, wireframes et annotations. 3 niveaux (Aperçu / Pratique / Approfondi).
 */
export const LEARNING_WIREFRAMING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est le wireframing : structurer avant de décorer.",
    blocks: [
      {
        kind: "text",
        text: "Le wireframing structure les écrans en noir et blanc avant tout travail visuel : où va le contenu, dans quel ordre, selon quel parcours. C'est la charpente de l'expérience : invisible quand elle est bonne, douloureuse quand elle est mauvaise.",
      },
      {
        kind: "text",
        text: "L'IA (architecture de l'information) est la discipline parente : organiser, nommer et relier le contenu pour qu'on le trouve. Wireframes, user flows et arborescences sont ses livrables. Discuter structure avant esthétique évite les refontes coûteuses : un wireframe se jette, une maquette finalisée coûte cher à reprendre.",
      },
      {
        kind: "list",
        items: [
          "Le wireframe répond à « quoi » et « où », pas à « à quoi ça ressemble ».",
          "Toujours en noir et blanc (ou gris) : la couleur déclenche des débats prématurés.",
          "Un wireframe est un outil de discussion, pas un livrable final.",
        ],
      },
    ],
  },
  {
    id: "wireframe-30s",
    title: "Un wireframe en 30 secondes",
    level: 1,
    intro:
      "À quoi ressemble un bon wireframe — et à quoi il ne ressemble pas.",
    blocks: [
      {
        kind: "diagram",
        title: "Anatomie d'un wireframe",
        lines: [
          "  ┌─────────────────────────────────┐",
          "  │ [Logo]      [Nav] [Nav] [Nav]   │  ← en-tête schématique",
          "  ├─────────────────────────────────┤",
          "  │                                 │",
          "  │  ┌───────────────────────────┐  │",
          "  │  │ Titre de la page          │  │  ← hiérarchie des titres",
          "  │  └───────────────────────────┘  │",
          "  │  ┌─────────┐  ┌─────────────┐   │",
          "  │  │ ┌─────┐ │  │ ─────────── │   │  ← blocs : image / texte",
          "  │  │ │ IMG │ │  │ ─────────── │   │     (lignes = texte)",
          "  │  │ └─────┘ │  │ [ Bouton ]  │   │",
          "  │  └─────────┘  └─────────────┘   │",
          "  │  ① ② ③                        │  ← annotations numérotées",
          "  └─────────────────────────────────┘",
          "",
          "  CE N'EST PAS : des couleurs, des vraies images,",
          "  des textes définitifs, du pixel-perfect.",
        ],
      },
      {
        kind: "text",
        text: "Le wireframe utilise des conventions : rectangles barrés pour les images, lignes grises pour le texte, boîtes pour les boutons. Ces codes disent « c'est un schéma » et empêchent de juger l'esthétique.",
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
      "Les outils pour wireframer vite, du papier au numérique.",
    blocks: [
      {
        kind: "fields",
        title: "Le kit wireframing",
        fields: [
          {
            label: "Papier et feutres",
            value:
              "Le plus rapide pour explorer : un écran par feuille, 2 minutes par croquis. Idéal en atelier d'équipe.",
          },
          {
            label: "Figma + kit low-fi",
            value:
              "Composants basse-fidélité (boîtes, lignes, boutons gris) réutilisables. Créez votre propre kit ou utilisez un UI kit wireframe de la communauté.",
          },
          {
            label: "Excalidraw (excalidraw.com)",
            value:
              "Dessin collaboratif au style « croquis » : parfait pour les user flows et les schémas d'arborescence en équipe.",
          },
          {
            label: "Balsamiq",
            value:
              "L'outil historique du wireframing low-fi : bibliothèque de composants schématiques, volontairement « brouillon » pour éviter les débats esthétiques.",
          },
        ],
      },
    ],
  },
  {
    id: "quand-wireframer",
    title: "Quand wireframer",
    level: 2,
    intro:
      "Le wireframe n'est pas systématique : les situations où il est rentable.",
    blocks: [
      {
        kind: "table",
        headers: ["Situation", "Wireframer ?", "Pourquoi"],
        rows: [
          ["Nouveau parcours complexe", "Oui", "Aligner l'équipe sur la structure avant le visuel"],
          ["Refonte d'une page", "Oui", "Comparer les structures avant/après objectivement"],
          ["Désaccord sur l'organisation", "Oui", "Trancher sur des schémas, pas sur des opinions"],
          ["Nouvel écran simple et standard", "Non", "Un formulaire de contact ne mérite pas 3 jours de wireframes"],
          ["Exploration très précoce", "Papier suffit", "Le numérique fige trop tôt"],
          ["Design system mature", "Partiellement", "Assembler des composants existants remplace le wireframe"],
        ],
      },
      {
        kind: "text",
        text: "Règle : wireframez quand la structure est incertaine ou débattue. Quand elle est évidente, passez directement à la maquette.",
      },
    ],
  },
  {
    id: "anatomie-wireframe",
    title: "Anatomie d'un wireframe",
    level: 2,
    intro:
      "Les éléments et conventions d'un wireframe lisible.",
    blocks: [
      {
        kind: "fields",
        title: "Les conventions",
        fields: [
          {
            label: "Blocs de contenu",
            value:
              "Rectangles gris : chaque bloc = un contenu (texte, image, vidéo). La taille du bloc reflète son importance.",
          },
          {
            label: "Texte simulé",
            value:
              "Lignes grises pour le corps, lignes plus épaisses pour les titres. Longueur des lignes ≈ longueur réelle du texte.",
          },
          {
            label: "Images",
            value:
              "Rectangles barrés d'une croix, avec légende (« image hero 16:9 »). Jamais de vraies images : elles déclenchent des débats esthétiques.",
          },
          {
            label: "Actions",
            value:
              "Boutons en boîtes avec libellé : le libellé, lui, doit être réel (« S'inscrire »), car il fait partie de la structure.",
          },
          {
            label: "Annotations",
            value:
              "Numéros sur le wireframe + légendes en marge : comportements, contenus dynamiques, règles d'affichage.",
          },
        ],
      },
    ],
  },
  {
    id: "user-flows-bases",
    title: "User flows : les bases",
    level: 2,
    intro:
      "Dessiner le chemin de l'utilisateur avant les écrans.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définissez l'objectif et l'acteur",
            detail:
              "« Un nouvel utilisateur veut réserver une salle » : un flow = un acteur + un objectif. Pas de flow « général ».",
          },
          {
            title: "Listez les étapes",
            detail:
              "Chaque action de l'utilisateur est une boîte : « recherche → choisit un créneau → s'identifie → paie → confirmation ».",
          },
          {
            title: "Ajoutez les décisions",
            detail:
              "Losanges pour les embranchements : « déjà inscrit ? », « paiement accepté ? ». Chaque branche mène quelque part.",
          },
          {
            title: "Repérez les frictions",
            detail:
              "Étapes superflues, culs-de-sac, retours en arrière : le flow les révèle avant qu'ils ne soient codés.",
          },
          {
            title: "Validez avec l'équipe",
            detail:
              "Le flow est le document d'alignement : produit, design et dev doivent le comprendre et le valider ensemble.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "Exemple : réservation de salle",
        lines: [
          "  [Accueil] → [Recherche] → [Résultats]",
          "                                │",
          "                    ┌─────────────┴──────────────┐",
          "                    ▼                          ▼",
          "              [Déjà inscrit ?]               [Inscription]",
          "               oui │      │ non                    │",
          "                   ▼      └────────────────────────┘",
          "              [Paiement] → [Confirmé ?] ─non→ [Erreur + réessai]",
          "                                │ oui",
          "                                ▼",
          "                          [Confirmation]",
        ],
      },
    ],
  },
  {
    id: "wireframe-papier",
    title: "Wireframer sur papier",
    level: 2,
    intro:
      "La méthode la plus rapide pour les premières explorations.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Crazy 8 (8 minutes)",
            detail:
              "Pliez une feuille en 8, dessinez 8 variantes d'un écran en 8 minutes (1 minute par case). La contrainte de temps libère la créativité.",
          },
          {
            title: "Sélectionnez",
            detail:
              "Entourez les 2-3 idées les plus prometteuses. Jetez sans regret : c'est du papier.",
          },
          {
            title: "Développez",
            detail:
              "Redessinez en grand les idées retenues, avec annotations. Un écran par feuille.",
          },
          {
            title: "Confrontez",
            detail:
              "Montrez à un collègue ou un utilisateur : « que feriez-vous ici ? ». 5 minutes suffisent à valider une direction.",
          },
        ],
      },
    ],
  },
  {
    id: "wireframe-numerique",
    title: "Wireframer en numérique",
    level: 2,
    intro:
      "Passer au propre : le wireframe partageable et itérable.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créez un kit low-fi",
            detail:
              "Composants gris réutilisables : boutons, champs, cartes, nav. Un kit évite de redessiner et garde la cohérence.",
          },
          {
            title: "Un frame par écran",
            detail:
              "Nommage clair (01-Accueil, 02-Recherche…). Tous les écrans du parcours, y compris vide/erreur/confirmation.",
          },
          {
            title: "Annotez",
            detail:
              "Numéros sur les zones + légendes : comportements, contenus dynamiques, règles. Un wireframe non annoté est à moitié fini.",
          },
          {
            title: "Reliez en flow",
            detail:
              "Flèches entre écrans ou mode prototype basique : le lecteur doit suivre le parcours sans explication orale.",
          },
          {
            title: "Partagez pour revue",
            detail:
              "Lien Figma + questions précises (« la structure de l'étape 2 vous paraît-elle claire ? »). Pas de « dites-moi ce que vous en pensez ».",
          },
        ],
      },
    ],
  },
  {
    id: "annotations-bases",
    title: "Annoter ses wireframes",
    level: 2,
    intro:
      "Les annotations transforment un schéma en spécification.",
    blocks: [
      {
        kind: "list",
        items: [
          "Numérotez les zones sur le wireframe (① ② ③), détaillez en marge : le schéma reste lisible, les détails sont accessibles.",
          "Annotez les comportements : « au clic, la liste se filtre sans recharger », « ce bloc n'apparaît que si l'utilisateur est connecté ».",
          "Annotez les contenus dynamiques : « les 3 derniers articles », « triés par date décroissante ».",
          "Annotez les règles : « ce bouton est désactivé tant que le formulaire est invalide ».",
          "N'annotez pas l'évident : « le logo renvoie à l'accueil » n'apprend rien à personne.",
        ],
      },
    ],
  },
  {
    id: "navigation-wireframe",
    title: "Wireframer la navigation",
    level: 2,
    intro:
      "Menus, filtres, recherche : structurer les déplacements.",
    blocks: [
      {
        kind: "list",
        items: [
          "Dessinez la navigation sur chaque wireframe, même schématiquement : c'est elle qui donne le contexte de l'écran.",
          "État actif : indiquez visuellement où l'on est (même en gris : soulignement, fond légèrement différent).",
          "Profondeur : ne wireframez pas que la page d'accueil — descendez 2-3 niveaux pour vérifier que la navigation tient.",
          "Mobile : prévoyez la navigation mobile dès le wireframe (menu hamburger, bottom bar) : ce n'est pas un détail à régler « après ».",
        ],
      },
    ],
  },
  {
    id: "formulaires-wireframe",
    title: "Wireframer les formulaires",
    level: 2,
    intro:
      "Structure d'un formulaire : l'ordre et le groupement priment.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un champ par ligne par défaut : la colonne unique est la structure la plus lisible et la plus robuste en responsive.",
          "Groupez par logique (identité, adresse, paiement) avec des titres de section : un long formulaire découpé paraît moins long.",
          "Placez les labels au-dessus des champs : vérifié comme le plus rapide à scanner.",
          "Prévoyez les messages d'erreur dès le wireframe : où s'affichent-ils ? Sous le champ concerné.",
          "Indiquez les champs optionnels vs obligatoires : c'est une décision de structure, pas de style.",
        ],
      },
    ],
  },
  {
    id: "responsive-wireframe",
    title: "Wireframer le responsive",
    level: 2,
    intro:
      "Penser les deux extrêmes dès le wireframe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Wireframez mobile ET desktop pour les écrans clés : les deux versions ont souvent des structures différentes, pas juste des tailles différentes.",
          "Définissez l'ordre d'empilement sur mobile : quel bloc passe en premier ? La réponse n'est pas toujours l'ordre du desktop.",
          "Identifiez ce qui disparaît ou se transforme : sidebar → menu, tableau → cartes, multi-colonnes → empilement.",
          "Notez les breakpoints : « sous 768 px, la sidebar devient un tiroir ». C'est une spec, pas un détail.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges classiques du wireframing.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est un problème", "Correction"],
        rows: [
          [
            "Détailler trop tôt",
            "On débat du visuel au lieu de la structure",
            "Rester schématique tant que la structure bouge",
          ],
          [
            "Vrais textes et images",
            "Discussions esthétiques prématurées",
            "Lignes grises et rectangles barrés",
          ],
          [
            "Un seul écran isolé",
            "Le parcours n'est pas vérifié",
            "Toujours wireframer le flow complet",
          ],
          [
            "Pas d'annotations",
            "Le wireframe est incompréhensible seul",
            "Numéroter et légender comportements et règles",
          ],
          [
            "Oublier les états",
            "Vide, erreur, chargement découverts en dev",
            "Wireframer les états dès le départ",
          ],
          [
            "Wireframer seul dans son coin",
            "L'équipe découvre la structure trop tard",
            "Revue avec produit et devs avant la maquette",
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
      "Un premier wireframe complet, rapidement.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisissez un parcours",
            detail:
              "Ex. : s'inscrire à une newsletter, réserver un créneau, signaler un problème.",
          },
          {
            title: "Dessinez le flow (5 min)",
            detail:
              "Boîtes et losanges sur papier : les étapes et les décisions.",
          },
          {
            title: "Wireframez 3 écrans (8 min)",
            detail:
              "Les écrans clés du flow, en gris, avec les boutons libellés pour de vrai.",
          },
          {
            title: "Annotez (2 min)",
            detail:
              "3 annotations : un comportement, un contenu dynamique, une règle.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "low-fi-vs-hi-fi",
    title: "Low-fi vs hi-fi",
    level: 3,
    intro:
      "Choisir le niveau de détail : le tableau de décision.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Low-fi", "Mid-fi", "Hi-fi"],
        rows: [
          ["Apparence", "Croquis, gris, approximatif", "Gris soigné, aligné", "Couleurs, vraies images, pixel-perfect"],
          ["Usage", "Explorer, discuter structure", "Tester des parcours, aligner l'équipe", "Valider le visuel, spécifier le dev"],
          ["Coût de modification", "Nul", "Faible", "Élevé"],
          ["Risque", "Personne ne le prend au sérieux", "—", "On le confond avec le produit fini"],
        ],
      },
      {
        kind: "text",
        text: "Montez en fidélité progressivement : low-fi tant que la structure bouge, mid-fi pour tester et aligner, hi-fi quand la structure est validée. Sauter des étapes coûte plus cher que les faire.",
      },
    ],
  },
  {
    id: "inventaire-contenu",
    title: "Inventaire de contenu",
    level: 3,
    intro:
      "Avant d'organiser : savoir ce qu'on a. La première étape de toute IA.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Listez tout",
            detail:
              "Chaque page, chaque écran, chaque document : titre, URL, type de contenu, responsable. Un tableur suffit.",
          },
          {
            title: "Qualifiez",
            detail:
              "Pour chaque élément : à garder, à mettre à jour, à supprimer, à fusionner. Soyez impitoyable : le contenu obsolète pollue l'arborescence.",
          },
          {
            title: "Repérez les doublons",
            detail:
              "Deux pages qui disent la même chose = une page à fusionner. Les doublons sont le premier symptôme d'une IA défaillante.",
          },
          {
            title: "Priorisez",
            detail:
              "Quels contenus sont critiques (tâches principales des utilisateurs) ? Ils structureront l'arborescence.",
          },
        ],
      },
    ],
  },
  {
    id: "taxonomies",
    title: "Taxonomies",
    level: 3,
    intro:
      "Classer le contenu : les structures d'organisation.",
    blocks: [
      {
        kind: "fields",
        title: "Les schémas d'organisation",
        fields: [
          {
            label: "Thématique",
            value:
              "Par sujet (« Tarifs », « Fonctionnalités ») : le plus courant, mais exige un vocabulaire partagé avec les utilisateurs.",
          },
          {
            label: "Par tâche",
            value:
              "Par action (« Réserver », « Suivre ma commande ») : efficace quand les utilisateurs viennent pour faire, pas pour lire.",
          },
          {
            label: "Par audience",
            value:
              "Par profil (« Particuliers », « Professionnels ») : utile si les besoins diffèrent vraiment, dangereux si les frontières sont floues.",
          },
          {
            label: "Chronologique / alphabétique",
            value:
              "Par date ou par ordre alphabétique : pertinent pour des archives ou des annuaires, jamais comme structure principale.",
          },
        ],
      },
      {
        kind: "text",
        text: "Évitez les schémas « par service » (l'organigramme de l'entreprise) : les utilisateurs ne connaissent pas votre organisation et s'en moquent.",
      },
    ],
  },
  {
    id: "card-sorting",
    title: "Card sorting approfondi",
    level: 3,
    intro:
      "La méthode reine pour concevoir une arborescence avec les utilisateurs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ouvert pour explorer (l'utilisateur crée les catégories), fermé pour valider (catégories imposées). Souvent : ouvert d'abord, fermé ensuite.",
          "30 à 50 cartes : en dessous, l'exercice est trivial ; au-dessus, il est épuisant.",
          "15 à 20 participants : les regroupements se stabilisent à partir de là.",
          "Analysez la matrice de similarité : les paires souvent regroupées vont ensemble ; les cartes « voyageuses » ont des libellés ambigus à retravailler.",
          "Le card sorting révèle les modèles mentaux, pas la vérité absolue : confrontez les résultats aux contraintes business avant de trancher.",
        ],
      },
    ],
  },
  {
    id: "tree-testing",
    title: "Tree testing",
    level: 3,
    intro:
      "Tester l'arborescence sans le visuel : la méthode complémentaire.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : on présente l'arborescence nue (texte seul) et on demande de trouver des contenus (« où renouvelleriez-vous votre abonnement ? »).",
          "Il isole la structure : si les utilisateurs échouent ici, le problème est l'arborescence, pas le design.",
          "Outils : Optimal Workshop, Maze. 30 à 50 participants pour des résultats quantifiés (taux de réussite, chemins empruntés).",
          "Analysez les chemins : les détours fréquents signalent des libellés trompeurs ou des catégories mal placées.",
          "Idéal après un card sorting : concevoir avec le tri, valider avec le tree test.",
        ],
      },
    ],
  },
  {
    id: "sitemap",
    title: "Sitemap (arborescence)",
    level: 3,
    intro:
      "La carte du territoire : représenter la structure complète.",
    blocks: [
      {
        kind: "diagram",
        title: "Exemple d'arborescence",
        lines: [
          "                    [Accueil]",
          "                        │",
          "        ┌───────────────┼───────────────┐",
          "        ▼               ▼               ▼",
          "   [Produit]        [Tarifs]        [Ressources]",
          "        │                               │",
          "   ┌────┴────┐                ┌─────────┴─────────┐",
          "   ▼         ▼                ▼                   ▼",
          "[Aperçu]  [Détails]        [Blog]            [Documentation]",
        ],
      },
      {
        kind: "list",
        items: [
          "Profondeur : visez 3 niveaux maximum. Au-delà, les utilisateurs se perdent et la maintenance devient infernale.",
          "Largeur : 5 à 7 rubriques par niveau. Au-delà, regroupez.",
          "Chaque page a un responsable et un objectif : une arborescence sans gouvernance se dégrade en 6 mois.",
        ],
      },
    ],
  },
  {
    id: "nommage-labels",
    title: "Nommage des rubriques",
    level: 3,
    intro:
      "Le vocabulaire de la navigation : concret plutôt que malin.",
    blocks: [
      {
        kind: "list",
        items: [
          "Préférez les mots des utilisateurs (issus de la recherche) au jargon interne : « Tarifs » plutôt que « Offres », « Aide » plutôt que « Centre de ressources ».",
          "Testez les libellés : un tree test ou 5 questions rapides (« que vous attendez-vous à trouver sous X ? ») valident un vocabulaire.",
          "Cohérence grammaticale : tous les items d'un même niveau suivent le même pattern (tous des noms, ou tous des verbes).",
          "Évitez les jeux de mots en navigation : l'humour nuit à la trouvabilité. Réservez la créativité au contenu.",
          "Longueur : 1 à 2 mots par rubrique. Au-delà, c'est une phrase, pas un label.",
        ],
      },
    ],
  },
  {
    id: "user-flows-avances",
    title: "User flows avancés",
    level: 3,
    intro:
      "Au-delà du chemin nominal : branches, erreurs, retours.",
    blocks: [
      {
        kind: "diagram",
        title: "Flow avec cas limites",
        lines: [
          "  [Panier] → [Livraison] → [Paiement] → [Confirmation]",
          "                 │              │",
          "                 │      ┌───────┴────────┐",
          "                 │      ▼                ▼",
          "                 │  [Adresse          [Paiement",
          "                 │   invalide]         refusé]",
          "                 │      │                │",
          "                 │      └────→ [Retour   │",
          "                 │             au panier]│",
          "                 │                       ▼",
          "                 └────────→ [Abandon → email de relance]",
          "",
          "  Chaque losange (décision) DOIT avoir toutes ses branches dessinées.",
        ],
      },
      {
        kind: "list",
        items: [
          "Dessinez les chemins d'erreur : c'est là que l'expérience se joue vraiment.",
          "Indiquez les points de sortie : où l'utilisateur peut-il abandonner, et que se passe-t-il ?",
          "Un flow par objectif : ne mélangez pas « acheter » et « suivre ma commande » dans le même schéma.",
        ],
      },
    ],
  },
  {
    id: "task-flows",
    title: "Task flows vs user flows",
    level: 3,
    intro:
      "Distinguer les deux granularités : quand utiliser chacun.",
    blocks: [
      {
        kind: "fields",
        title: "Comparaison",
        fields: [
          {
            label: "User flow",
            value:
              "Le parcours complet d'un acteur vers un objectif, à travers plusieurs écrans et systèmes. Granularité : l'expérience.",
          },
          {
            label: "Task flow",
            value:
              "La séquence détaillée d'une tâche précise, écran par écran, incluant les micro-décisions. Granularité : l'interaction.",
          },
          {
            label: "Quand utiliser quoi",
            value:
              "User flow pour cadrer et aligner (début de projet) ; task flow pour spécifier finement (avant le développement).",
          },
        ],
      },
    ],
  },
  {
    id: "wireflows",
    title: "Wireflows",
    level: 3,
    intro:
      "Fusionner flow et wireframes : le document qui montre tout.",
    blocks: [
      {
        kind: "text",
        text: "Le wireflow combine le user flow et les wireframes : chaque étape du flow est illustrée par son wireframe, reliés par des flèches. On voit à la fois le parcours et les écrans — le document de référence pour aligner produit, design et développement.",
      },
      {
        kind: "list",
        items: [
          "Idéal pour les parcours critiques (inscription, achat, onboarding) : un seul document au lieu de deux.",
          "Construisez-le dans Figma : wireframes + connecteurs + annotations, sur une page dédiée.",
          "Maintenez-le à jour pendant le projet : un wireflow obsolète est pire que pas de wireflow.",
        ],
      },
    ],
  },
  {
    id: "annotations-avancees",
    title: "Annotations avancées",
    level: 3,
    intro:
      "Le système d'annotation qui fait du wireframe une spec.",
    blocks: [
      {
        kind: "list",
        items: [
          "Code couleur des annotations : bleu = comportement, orange = contenu dynamique, rouge = règle métier, vert = note d'accessibilité.",
          "Référencez les user flows : « voir flow inscription, étape 3 » plutôt que de dupliquer l'information.",
          "Versionnez : chaque revue majeure = une version (V1, V2). Les annotations « résolu » s'archivent, pas se suppriment.",
          "Annotez aussi ce qui ne change pas : « reprend le header standard » évite les régressions.",
        ],
      },
    ],
  },
  {
    id: "specs-comportement",
    title: "Spécifier les comportements",
    level: 3,
    intro:
      "Décrire précisément ce qui se passe : le langage des specs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Format : « QUAND [déclencheur], ALORS [résultat] ». « Quand l'utilisateur clique sur Supprimer, alors une modale de confirmation s'affiche. »",
          "Précisez les conditions : « si le panier est vide, le bouton est désactivé avec le tooltip 'Ajoutez un article' ».",
          "Décrivez les transitions : « la liste se met à jour sans recharger, avec un skeleton de 500 ms ».",
          "Listez les cas limites : liste vide, texte très long, erreur réseau, session expirée — pour chaque écran interactif.",
        ],
      },
    ],
  },
  {
    id: "etats-wireframe",
    title: "Wireframer les états",
    level: 3,
    intro:
      "Vide, chargement, erreur : les états font partie de la structure.",
    blocks: [
      {
        kind: "list",
        items: [
          "Pour chaque écran avec du contenu dynamique : wireframez l'état vide (première utilisation), le chargement (skeleton) et l'erreur principale.",
          "L'état vide est un écran à part entière : titre, explication, action principale. Ne le laissez pas au hasard.",
          "Les erreurs : où s'affiche le message ? Que peut faire l'utilisateur ? (réessayer, contacter, revenir en arrière).",
          "Un produit qui n'a wireframé que le « chemin heureux » découvrira ses états en production — au pire moment.",
        ],
      },
    ],
  },
  {
    id: "formulaires-avances",
    title: "Formulaires : structure avancée",
    level: 3,
    intro:
      "Les patterns structurels des formulaires complexes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Multi-étapes : découpez au-delà de 6-8 champs, avec indicateur de progression et récapitulatif avant validation.",
          "Groupes logiques avec titres : identité, livraison, paiement. Un titre de groupe aide plus qu'on ne croit.",
          "Champs conditionnels : « si Oui, alors afficher… ». Wireframez les deux états du formulaire.",
          "Pré-remplissage et valeurs par défaut : indiquez-les dans les annotations (« pré-rempli avec l'adresse du compte »).",
          "Révision : un écran de récapitulatif avant soumission réduit les erreurs et rassure.",
        ],
      },
    ],
  },
  {
    id: "recherche-filtres",
    title: "Recherche et filtres : structure",
    level: 3,
    intro:
      "Structurer la trouvabilité : les patterns à wireframer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Barre de recherche : position (header, persistante ?), suggestions, historique. Wireframez les états : vide, en cours de frappe, résultats, zéro résultat.",
          "Facettes : quelles dimensions filtrent le contenu ? Avec compteurs (« Couleur (12) ») pour guider.",
          "Tri : les options de tri pertinentes (pertinence, date, prix). Pas plus de 5-6 options.",
          "Zéro résultat : un état à part entière — expliquer, proposer (élargir, réinitialiser), jamais une page vide.",
        ],
      },
    ],
  },
  {
    id: "tableaux-wireframe",
    title: "Tableaux : structure",
    level: 3,
    intro:
      "Wireframer un tableau, c'est choisir ses colonnes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Colonnes : uniquement celles qui servent une décision ou une action. Chaque colonne doit justifier sa place.",
          "Ordre : la colonne d'identification en premier, les actions en dernier (à droite).",
          "Hiérarchie : une colonne « principale » (nom, titre) plus visible que les métadonnées.",
          "États : tableau vide, une ligne, 1000 lignes (pagination ? scroll ?), ligne en erreur.",
          "Responsive : que devient le tableau sur mobile ? (cartes, scroll horizontal, colonnes masquées — à décider au wireframe).",
        ],
      },
    ],
  },
  {
    id: "dashboards",
    title: "Dashboards : structure",
    level: 3,
    intro:
      "Le dashboard est un exercice de hiérarchie : que montrer en premier.",
    blocks: [
      {
        kind: "list",
        items: [
          "Hiérarchie : KPIs clés en haut (3-5 max), détails en dessous. L'utilisateur doit comprendre l'essentiel en 5 secondes.",
          "Un dashboard = des réponses, pas des données : chaque widget répond à une question (« mes ventes augmentent-elles ? »).",
          "Personnalisation : si les besoins varient, prévoyez la configuration (widgets déplaçables, masquables) dès la structure.",
          "États : données en cours de chargement, pas de données, erreur de source — wireframez-les.",
        ],
      },
    ],
  },
  {
    id: "onboarding-flows",
    title: "Onboarding : structure",
    level: 3,
    intro:
      "Structurer les premiers pas : le flow d'activation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Identifiez l'action d'activation : le moment où l'utilisateur perçoit la valeur (« aha moment »). Tout le flow y mène.",
          "Minimisez les étapes avant l'activation : chaque écran supplémentaire fait perdre des utilisateurs.",
          "Wireframez les deux stratégies : tutoriel guidé vs découverte progressive dans un état vide bien conçu.",
          "Prévoyez la sortie : l'utilisateur doit pouvoir passer l'onboarding et le retrouver plus tard.",
        ],
      },
    ],
  },
  {
    id: "patterns-mobiles",
    title: "Patterns mobiles",
    level: 3,
    intro:
      "Les structures propres au mobile : à connaître par cœur.",
    blocks: [
      {
        kind: "fields",
        title: "Patterns courants",
        fields: [
          {
            label: "Bottom navigation",
            value:
              "3 à 5 destinations principales, toujours visibles. Le standard des apps.",
          },
          {
            label: "Bottom sheet",
            value:
              "Panneau qui remonte du bas : actions contextuelles, filtres, détails. Accessible au pouce.",
          },
          {
            label: "Tabs + scroll",
            value:
              "Onglets en haut pour des vues alternatives d'un même contexte.",
          },
          {
            label: "Pull to refresh",
            value:
              "Gestuelle standard pour actualiser : ne la réinventez pas.",
          },
          {
            label: "Stepper / wizard",
            value:
              "Parcours découpé en étapes plein écran, avec progression visible.",
          },
        ],
      },
    ],
  },
  {
    id: "strategie-responsive",
    title: "Stratégie responsive",
    level: 3,
    intro:
      "Au-delà des écrans : la méthode pour un responsive cohérent.",
    blocks: [
      {
        kind: "list",
        items: [
          "Définissez les breakpoints du produit (ex. 360 / 768 / 1024 / 1440) : les mêmes pour toute l'équipe.",
          "Règle de transformation par composant : « la grille 3 colonnes devient 1 colonne sous 768 px » — documentée, pas improvisée.",
          "Priorité au contenu : sur mobile, on choisit ce qui compte (pas tout, en plus petit).",
          "Testez aux largeurs intermédiaires : c'est entre les breakpoints que les mises en page cassent.",
        ],
      },
    ],
  },
  {
    id: "accessibilite-structure",
    title: "Accessibilité de la structure",
    level: 3,
    intro:
      "L'accessibilité commence au wireframe, pas au code.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ordre des titres logique (h1 unique, puis h2, h3…) : les lecteurs d'écran naviguent par titres.",
          "Ordre de tabulation = ordre visuel : si le wireframe place le bouton d'action loin du contenu, le clavier suivra.",
          "Alternatives aux interactions complexes : tout ce qui se fait au drag & drop doit avoir une alternative au clavier.",
          "Textes des liens et boutons explicites hors contexte : « En savoir plus » ne veut rien dire pour un lecteur d'écran.",
          "Annotez les exigences d'accessibilité sur le wireframe : rôles, labels, alternatives — sinon elles seront oubliées.",
        ],
      },
    ],
  },
  {
    id: "contenu-reel-vs-lorem",
    title: "Contenu réel vs lorem ipsum",
    level: 3,
    intro:
      "Le faux texte fausse le design : la règle du contenu réel.",
    blocks: [
      {
        kind: "list",
        items: [
          "Utilisez du contenu réel (ou réaliste) dès le wireframe : les longueurs, les cas limites et les libellés font partie de la structure.",
          "Le lorem ipsum masque les vrais problèmes : titres trop longs, textes vides, traductions qui débordent.",
          "À défaut de contenu final, rédigez des contenus probables : c'est aussi le travail du designer de proposer les textes.",
          "Exception : les zones de contenu utilisateur imprévisible (commentaires) — indiquez « contenu variable, 1 à 500 caractères ».",
        ],
      },
    ],
  },
  {
    id: "fidelite-progressive",
    title: "Fidélité progressive",
    level: 3,
    intro:
      "Monter en fidélité au bon rythme : la méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Papier : explorer",
            detail:
              "Variantes rapides, jeter sans regret. Valider les grandes directions.",
          },
          {
            title: "Low-fi numérique : structurer",
            detail:
              "Wireframes propres et annotés. Aligner l'équipe sur la structure.",
          },
          {
            title: "Mid-fi cliquable : tester",
            detail:
              "Parcours reliés, testables par des utilisateurs. Valider la compréhension.",
          },
          {
            title: "Hi-fi : finaliser",
            detail:
              "Visuel définitif, tous les états. Spécifier pour le développement.",
          },
          {
            title: "Ne jamais sauter d'étape",
            detail:
              "Chaque niveau répond à des questions différentes. Sauter le low-fi, c'est débattre du visuel avant la structure.",
          },
        ],
      },
    ],
  },
  {
    id: "bibliotheque-wireframe",
    title: "Bibliothèque de wireframes",
    level: 3,
    intro:
      "Capitaliser : votre kit low-fi personnel ou d'équipe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Composants de base : boutons, champs, cartes, nav, tableaux, modales — en version schématique.",
          "Patterns d'écrans : login, liste, détail, formulaire, dashboard, erreur 404 — les structures qui reviennent.",
          "Annotations types : bibliothèque de notes réutilisables (comportements courants).",
          "Un kit partagé divise par deux le temps de wireframing et garantit la cohérence entre designers.",
        ],
      },
    ],
  },
  {
    id: "collaborer-revues",
    title: "Revues de wireframes",
    level: 3,
    intro:
      "Faire relire efficacement : le rituel de revue.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cadrez la revue : « on valide la structure, pas le visuel ». Rappelez-le à chaque fois, sinon les débats dérivent.",
          "Questions précises à l'avance : « le découpage en 3 étapes vous paraît-il juste ? » plutôt que « qu'en pensez-vous ? ».",
          "Invitez produit et devs : la structure les concerne (faisabilité, règles métier).",
          "Timeboxez : 30 minutes par parcours. Au-delà, on chipote.",
          "Décisions tracées : notez ce qui est validé et ce qui reste ouvert, avec un responsable.",
        ],
      },
    ],
  },
  {
    id: "tester-wireframes",
    title: "Tester les wireframes",
    level: 3,
    intro:
      "Valider la structure avec des utilisateurs avant le visuel.",
    blocks: [
      {
        kind: "list",
        items: [
          "Test papier : montrez les wireframes, demandez « que feriez-vous pour… ? ». 3 utilisateurs suffisent à ce stade.",
          "Test de trouvabilité : « où chercheriez-vous X ? » sur l'arborescence ou la navigation wireframée.",
          "Test des libellés : faites reformuler les rubriques avec leurs mots — les écarts révèlent le jargon.",
          "Ne testez pas l'esthétique sur des wireframes : « c'est moche » n'est pas un retour utile à ce stade.",
        ],
      },
    ],
  },
  {
    id: "transition-prototype",
    title: "Du wireframe au prototype",
    level: 3,
    intro:
      "La transition : quand et comment passer au prototype testable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Passez au prototype quand la structure est validée (revue équipe + éventuellement test) : le prototype teste les parcours, pas la structure.",
          "Reliez les wireframes en parcours cliquable : c'est souvent le premier prototype, suffisant pour tester la compréhension.",
          "Ne polissez pas les wireframes avant de prototyper : le prototype mid-fi reprendra la structure telle quelle.",
          "Gardez les wireframes : ils documentent les décisions de structure pour l'équipe et les futurs arrivants.",
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets pour progresser",
    level: 3,
    intro:
      "Des exercices concrets pour ancrer chaque niveau.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "30 minutes : flow + 3 wireframes",
            detail:
              "Choisissez un parcours (ex. réserver, s'inscrire), dessinez le flow puis 3 wireframes papier annotés.",
          },
          {
            title: "3 heures : kit low-fi",
            detail:
              "Créez 10 composants schématiques réutilisables dans Figma. Base de votre bibliothèque.",
          },
          {
            title: "1 journée : arborescence",
            detail:
              "Inventaire de contenu d'un site réel, card sorting avec 5 proches (papier), arborescence proposée.",
          },
          {
            title: "1 semaine : wireflow complet",
            detail:
              "Parcours critique d'un produit : user flow, wireframes annotés, états, responsive. Livrable : wireflow partageable.",
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
      "Les pièges qui subsistent quand les bases sont maîtrisées.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est un problème", "Correction"],
        rows: [
          [
            "Wireframer le chemin heureux uniquement",
            "Les états réels sont découverts en production",
            "Vide, erreur, chargement dès le premier wireframe",
          ],
          [
            "Confondre wireframe et maquette",
            "On peaufine au lieu de structurer",
            "Figer la règle : pas de couleur avant validation structure",
          ],
          [
            "IA basée sur l'organigramme",
            "Les utilisateurs ne pensent pas en services",
            "Organiser par tâches et modèles mentaux (card sorting)",
          ],
          [
            "Annotations orphelines",
            "Personne ne les lit, elles se périment",
            "Annotations numérotées, versionnées, relues",
          ],
          [
            "Oublier le mobile",
            "La moitié des utilisateurs sur une structure pensée desktop",
            "Wireframer les deux extrêmes pour les écrans clés",
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
      "Les références pour approfondir l'architecture de l'information.",
    blocks: [
      {
        kind: "fields",
        title: "À consulter",
        fields: [
          {
            label: "Information Architecture — Rosenfeld, Morville & Arango (O'Reilly)",
            value:
              "Le livre de référence sur l'IA : organisation, nommage, recherche d'information. La 4e édition couvre le web moderne.",
          },
          {
            label: "NN/g — IA Study Guide (nngroup.com)",
            value:
              "Le guide d'étude du Nielsen Norman Group sur l'architecture de l'information : méthodes et bonnes pratiques.",
          },
          {
            label: "A Project Guide to UX Design — Russ Unger & Carolyn Chandler",
            value:
              "Le guide projet : wireframes, flows et documentation dans un processus réel.",
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
      "La structure validée, place au prototype, à l'UI et aux systèmes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Prototyper (`prototypage`) : transformer les wireframes en parcours testables.",
          "Détailler l'UI (`ui-design`) : grille, composants et états sur la structure validée.",
          "Systématiser (`design-system`) : transformer les patterns récurrents en composants documentés.",
          "Revenir à la roadmap : valider Wireframing et passer à la compétence suivante.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du motion design d'interface : les 12 principes
 * adaptés à l'UI, easing, durées, chorégraphie, prefers-reduced-motion
 * et micro-interactions. 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent
 * le code inline entre backticks.
 */
export const LEARNING_MOTION_DESIGN: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le motion design d'interface : le mouvement comme langage.",
    blocks: [
      {
        kind: "text",
        text: "Le motion design utilise le mouvement comme langage : transitions, micro-interactions et chorégraphies qui guident l'attention et expliquent les changements d'état d'une interface. D'où vient ce panneau ? Où est passé mon fichier ? Que se passe-t-il pendant le chargement ? Le mouvement répond à ces questions mieux que n'importe quel texte.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est une compétence recherchée : bien dosé, le mouvement rend les interfaces compréhensibles et mémorables ; mal dosé, il agresse, distrait et exclut. Peu de designers le maîtrisent vraiment — c'est un différenciateur fort, à condition de le traiter comme un langage (avec sa grammaire : durées, easings, chorégraphie) et pas comme une décoration.",
      },
      {
        kind: "text",
        text: "Les fondations à acquérir : les 12 principes d'animation (adaptés de Disney à l'UI), les courbes d'easing, les durées de référence (150–500 ms), la chorégraphie des transitions, et le respect de `prefers-reduced-motion`. Cette Learning Page les couvre dans cet ordre.",
      },
    ],
  },
  {
    id: "mouvement-intention",
    title: "Tout mouvement a une intention",
    level: 1,
    intro:
      "Le principe cardinal : si on ne peut pas nommer l'intention, on supprime le mouvement.",
    blocks: [
      {
        kind: "diagram",
        title: "Les 4 intentions légitimes du mouvement",
        lines: [
          "Mouvement d'interface",
          "     │",
          "     ├── ORIENTER : d'où vient cet élément, où va-t-il",
          "     │     (panneau qui glisse depuis le bord)",
          "     ├── EXPLIQUER : que s'est-il passé",
          "     │     (élément qui se déplace vers le panier)",
          "     ├── RASSURER : le système travaille / a compris",
          "     │     (spinner, confirmation animée)",
          "     └── ATTIRER : guider l'œil vers l'important",
          "           (badge qui pulse doucement — avec parcimonie)",
          "Aucune intention nommable → pas de mouvement.",
        ],
      },
      {
        kind: "text",
        text: "Test à appliquer à chaque animation proposée : « que comprend l'utilisateur grâce à ce mouvement, qu'il ne comprendrait pas sans ? » Si la réponse est « c'est joli », le mouvement est décoratif — et le décoratif est le premier à supprimer quand il gêne.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "douze-principes-vue-ensemble",
    title: "Les 12 principes : vue d'ensemble",
    level: 2,
    intro:
      "Les principes de Disney (1930s), adaptés aux interfaces : la grammaire du mouvement.",
    blocks: [
      {
        kind: "text",
        text: "Dans les années 1930, les animateurs Disney ont formalisé 12 principes qui rendent un mouvement crédible et lisible. Transposés aux interfaces, ils restent la référence : un mouvement d'UI qui les respecte paraît naturel ; un qui les ignore paraît mécanique ou agressif.",
      },
      {
        kind: "fields",
        title: "Les 12 principes en une phrase chacun",
        fields: [
          {
            label: "1. Squash & stretch → Échelle",
            value: "Un bouton qui s'écrase légèrement à l'appui donne du poids et du feedback tactile.",
          },
          {
            label: "2. Anticipation",
            value: "Un léger recul avant l'action (menu qui se prépare à s'ouvrir) rend le mouvement lisible.",
          },
          {
            label: "3. Staging",
            value: "Mettre en scène : un seul mouvement important à la fois, le reste s'efface.",
          },
          {
            label: "4. Straight ahead / Pose to pose → Keyframes",
            value: "Définir les états clés (début/fin) et interpoler : c'est exactement le modèle des transitions CSS.",
          },
          {
            label: "5. Follow through",
            value: "Les éléments secondaires suivent avec un léger retard : hiérarchie naturelle du mouvement.",
          },
          {
            label: "6. Slow in / slow out → Easing",
            value: "Accélération et décélération : aucun mouvement d'UI ne doit être linéaire.",
          },
          {
            label: "7. Arcs",
            value: "Les trajectoires courbes paraissent naturelles ; les lignes droites, mécaniques.",
          },
          {
            label: "8. Secondary action",
            value: "Un mouvement secondaire soutient le principal (ombre qui suit une carte déplacée).",
          },
          {
            label: "9. Timing",
            value: "La durée fait le sens : 150 ms = réactif, 500 ms = important, 1000 ms = trop long.",
          },
          {
            label: "10. Exaggeration → Sobriété",
            value: "En UI, on inverse : amplifier serait agressif — la retenue est la vertu.",
          },
          {
            label: "11. Solid drawing → Cohérence",
            value: "Le mouvement respecte l'identité visuelle : mêmes courbes, mêmes durées partout.",
          },
          {
            label: "12. Appeal",
            value: "Le charme : un mouvement bien réglé donne envie — la signature du produit.",
          },
        ],
      },
    ],
  },
  {
    id: "easing-essentiel",
    title: "Easing : les courbes qui font le naturel",
    level: 2,
    intro:
      "La différence entre un mouvement mécanique et un mouvement vivant tient à la courbe.",
    blocks: [
      {
        kind: "text",
        text: "L'easing (assouplissement) contrôle l'accélération : un mouvement linéaire (vitesse constante) paraît robotique car rien ne bouge ainsi dans le monde physique. Règles d'or : `ease-out` (décélération) pour les apparitions — l'élément arrive vite puis se pose ; `ease-in` (accélération) pour les disparitions — il part doucement puis accélère.",
      },
      {
        kind: "code",
        language: "css",
        title: "Les courbes de référence (Material Design)",
        code: "/* Apparition : rapide puis doux */\n--ease-out: cubic-bezier(0, 0, 0.2, 1);\n/* Disparition : doux puis rapide */\n--ease-in: cubic-bezier(0.4, 0, 1, 1);\n/* Les deux : standard */\n--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);",
      },
      {
        kind: "list",
        items: [
          "Jamais de `linear` sauf pour les indicateurs de progression continus (barre de chargement).",
          "Jamais de `ease-in` pour une apparition : l'élément semble « collé » au départ.",
          "Tester les courbes sur easings.net : visualiser avant de choisir.",
          "Personnaliser avec parcimonie : les courbes standard couvrent 95 % des besoins.",
        ],
      },
    ],
  },
  {
    id: "durees-reperes",
    title: "Les durées de référence",
    level: 2,
    intro:
      "Quatre durées couvrent presque tous les besoins d'interface.",
    blocks: [
      {
        kind: "fields",
        title: "L'échelle des durées",
        fields: [
          {
            label: "100–150 ms — Micro-feedback",
            value: "Réponse à l'appui (bouton, toggle) : doit être quasi instantanée pour paraître réactive.",
          },
          {
            label: "200–300 ms — Transitions standard",
            value: "Apparition de panneaux, menus, modales : la durée la plus utilisée.",
          },
          {
            label: "400–500 ms — Transitions importantes",
            value: "Changements d'écran, transformations complexes : assez long pour être suivi, assez court pour ne pas attendre.",
          },
          {
            label: "> 500 ms — Exceptionnel",
            value: "Réservé aux moments chorégraphiés (onboarding, célébrations). Au-delà d'une seconde, l'utilisateur attend — donc s'impatiente.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle : les petits éléments bougent vite, les grands plus lentement — mais jamais au-delà de 500 ms pour une interaction. La durée se choisit selon la distance parcourue et l'importance, pas au hasard.",
      },
    ],
  },
  {
    id: "apparaitre-disparaitre",
    title: "Apparaître et disparaître : les règles",
    level: 2,
    intro:
      "Les deux transitions les plus fréquentes, avec leurs bonnes pratiques.",
    blocks: [
      {
        kind: "list",
        items: [
          "Apparition : `ease-out`, 200–300 ms, légère translation (8–16 px) + fondu. L'élément « arrive » et se pose.",
          "Disparition : `ease-in`, 150–200 ms, plus rapide que l'apparition — on ne fait pas attendre la suite.",
          "Ne jamais faire apparaître un élément sans origine : d'où vient-il ? (bord, bouton déclencheur, fondu sur place).",
          "La disparition est l'inverse de l'apparition : même trajectoire, sens inverse — la cohérence aide la mémoire spatiale.",
          "Éviter les translations excessives (> 30 % de l'écran) : fatigant et théâtral.",
        ],
      },
    ],
  },
  {
    id: "choregraphie-stagger",
    title: "Chorégraphie : ordonner les mouvements",
    level: 2,
    intro:
      "Quand plusieurs éléments bougent, l'ordre raconte l'histoire.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier le héros",
            detail:
              "Un seul élément principal par transition : c'est lui qui bouge en premier et porte le sens (la carte qui s'ouvre, le panneau qui arrive).",
          },
          {
            title: "Ordonner par importance",
            detail:
              "Les éléments secondaires suivent dans l'ordre de lecture (haut → bas) : l'œil suit une hiérarchie, pas un chaos simultané.",
          },
          {
            title: "Appliquer le stagger",
            detail:
              "Décalage de 30–60 ms entre chaque élément (listes, grilles) : l'effet cascade guide l'œil sans ralentir l'ensemble.",
          },
          {
            title: "Limiter la durée totale",
            detail:
              "Même chorégraphiée, une transition ne dépasse pas ~500 ms au total. Le stagger ne doit pas transformer une liste en attente.",
          },
          {
            title: "Tester à vitesse réelle",
            detail:
              "Regarder la transition 5 fois de suite : si elle lasse au 3e visionnage, la simplifier. L'utilisateur la verra des centaines de fois.",
          },
        ],
      },
    ],
  },
  {
    id: "micro-interactions-anatomie",
    title: "Micro-interactions : l'anatomie",
    level: 2,
    intro:
      "Le plus petit niveau du motion : un déclencheur, une règle, un feedback.",
    blocks: [
      {
        kind: "diagram",
        title: "La structure d'une micro-interaction",
        lines: [
          "DÉCLENCHEUR → RÈGLE → FEEDBACK → BOUCLE",
          "     │           │         │           │",
          "  Clic sur    Si déjà   Cœur qui    État favori",
          "  le cœur     favori ?   se remplit   mémorisé",
          "                        + compteur",
          "Exemples : like, toggle, pull-to-refresh,",
          "copier-coller, ajout au panier.",
        ],
      },
      {
        kind: "text",
        text: "Pourquoi les micro-interactions comptent : ce sont les moments où l'utilisateur « sent » le produit — des centaines de fois par jour. Un toggle bien animé vaut plus qu'une page d'accueil animée.",
      },
    ],
  },
  {
    id: "prefers-reduced-motion-pratique",
    title: "Prefers-reduced-motion : la mise en pratique",
    level: 2,
    intro:
      "Concevoir l'alternative statique de chaque mouvement.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Le pattern standard",
        code: "@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}",
      },
      {
        kind: "list",
        items: [
          "Identifier les animations essentielles (feedback d'action, indicateur de chargement) : elles restent, simplifiées.",
          "Les animations décoratives (parallax, entrées en cascade) sont supprimées : l'état final s'affiche directement.",
          "Ne jamais faire dépendre une information du mouvement seul : l'état final doit être compréhensible sans animation.",
          "Dans la spec motion : pour chaque animation, décrire l'état final statique — c'est ce qui s'affiche en mode réduit.",
          "Tester : activer « Réduire les animations » dans l'OS et parcourir les parcours clés.",
        ],
      },
    ],
  },
  {
    id: "outils-motion",
    title: "Les outils du motion designer",
    level: 2,
    intro:
      "Du prototype rapide à la production : la chaîne d'outils réelle.",
    blocks: [
      {
        kind: "fields",
        title: "Outils réels et leur rôle",
        fields: [
          {
            label: "Figma (Smart Animate)",
            value:
              "Prototyper les transitions entre écrans et les micro-interactions simples : le plus rapide pour tester une idée.",
          },
          {
            label: "After Effects",
            value:
              "Les animations complexes et les exports Lottie : l'outil historique du motion, avec Bodymovin pour le web.",
          },
          {
            label: "Lottie",
            value:
              "lottiefiles.com — format d'animation vectorielle léger pour le web et le mobile : animations riches sans vidéo.",
          },
          {
            label: "Code (CSS / Web Animations)",
            value:
              "La production : transitions CSS, `cubic-bezier`, tokens de motion. La spec du designer devient du code.",
          },
          {
            label: "Principle / Protopie",
            value:
              "Prototypage haute fidélité des interactions complexes quand Figma ne suffit plus.",
          },
        ],
      },
    ],
  },
  {
    id: "specifier-mouvement",
    title: "Spécifier un mouvement pour la production",
    level: 2,
    intro:
      "Ce que la spec motion doit contenir pour être implémentée fidèlement.",
    blocks: [
      {
        kind: "fields",
        title: "Les paramètres d'une spec",
        fields: [
          {
            label: "Durée",
            value: "En millisecondes, issue de l'échelle (150/200/300/500).",
          },
          {
            label: "Courbe d'easing",
            value: "Valeurs `cubic-bezier` exactes ou nom du token (`--ease-out`).",
          },
          {
            label: "Délai",
            value: "Retard avant démarrage (stagger) : en ms, avec l'ordre des éléments.",
          },
          {
            label: "Propriétés animées",
            value: "Que bouge-t-on : `opacity`, `transform` (translate/scale) — jamais `width`/`height`/`top` (performance).",
          },
          {
            label: "États",
            value: "Début et fin précis, état en mode réduit.",
          },
        ],
      },
      {
        kind: "text",
        text: "Format : un prototype animé (Figma, vidéo) + le tableau des paramètres. La vidéo montre le ressenti, les paramètres permettent l'implémentation exacte.",
      },
    ],
  },
  {
    id: "tester-ressenti",
    title: "Tester le ressenti, pas seulement le visuel",
    level: 2,
    intro:
      "Le mouvement se juge en le vivant : les méthodes de test.",
    blocks: [
      {
        kind: "list",
        items: [
          "Test répété : regarder la transition 10 fois de suite — ce qui lasse doit être simplifié.",
          "Test à vitesse réduite : ralentir à 25 % révèle les à-coups et les easing mal réglés.",
          "Test utilisateur : « que s'est-il passé ? » après une transition — si l'utilisateur ne comprend pas le changement d'état, la chorégraphie échoue.",
          "Test sur appareil réel : un téléphone bas de gamme révèle les saccades qu'un MacBook masque.",
          "Test en mode réduit : vérifier l'état final statique et l'absence d'information perdue.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "principes-1-4-detail",
    title: "Principes 1–4 en détail",
    level: 3,
    intro:
      "Squash & stretch, anticipation, staging, keyframes : l'application UI précise.",
    blocks: [
      {
        kind: "fields",
        title: "Application concrète",
        fields: [
          {
            label: "Squash & stretch → échelle au toucher",
            value:
              "Un bouton réduit à 97 % pendant l'appui (`scale(0.97)`, 100 ms) : feedback tactile immédiat. Subtil — au-delà de 95 %, ça paraît mou.",
          },
          {
            label: "Anticipation",
            value:
              "Avant l'ouverture d'un menu : léger décalage de l'icône ou fondu du fond. Prépare l'œil, rend la transition lisible.",
          },
          {
            label: "Staging",
            value:
              "Pendant une transition importante, atténuer le reste (fond assombri derrière une modale) : un seul acteur sur scène.",
          },
          {
            label: "Pose to pose → états clés",
            value:
              "Définir rigoureusement l'état initial et final (positions, opacités) : l'interpolation suit. Des états flous donnent des transitions floues.",
          },
        ],
      },
    ],
  },
  {
    id: "principes-5-8-detail",
    title: "Principes 5–8 en détail",
    level: 3,
    intro:
      "Follow through, easing, arcs, secondary action : le naturel du mouvement.",
    blocks: [
      {
        kind: "fields",
        title: "Application concrète",
        fields: [
          {
            label: "Follow through",
            value:
              "Dans une liste qui apparaît, les éléments suivent le premier avec 40 ms de décalage : la cascade naturelle, sans chorégraphie forcée.",
          },
          {
            label: "Slow in / slow out",
            value:
              "Voir la section easing : aucun mouvement linéaire en UI. Le `cubic-bezier(0, 0, 0.2, 1)` est le défaut sain.",
          },
          {
            label: "Arcs",
            value:
              "Un élément qui « vole » vers le panier suit une courbe, pas une diagonale droite : trajectoire en deux temps (montée puis descente).",
          },
          {
            label: "Secondary action",
            value:
              "L'ombre d'une carte suit son déplacement avec un léger retard et un flou croissant : vend la profondeur sans effort.",
          },
        ],
      },
    ],
  },
  {
    id: "principes-9-12-detail",
    title: "Principes 9–12 en détail",
    level: 3,
    intro:
      "Timing, sobriété, cohérence, appeal : la maturité du système de motion.",
    blocks: [
      {
        kind: "fields",
        title: "Application concrète",
        fields: [
          {
            label: "Timing",
            value:
              "La durée fait le sens : un toast qui reste 4 s signale son importance ; une erreur qui clignote vite signale l'urgence. Choisir, pas subir.",
          },
          {
            label: "Exaggeration → sobriété",
            value:
              "En UI on inverse le principe Disney : au lieu d'amplifier, on retient. Un rebond (`bounce`) est presque toujours de trop en interface.",
          },
          {
            label: "Solid drawing → cohérence",
            value:
              "Mêmes durées, mêmes courbes, mêmes patterns dans tout le produit : le mouvement devient une langue, pas des dialects par écran.",
          },
          {
            label: "Appeal",
            value:
              "La touche finale : une micro-interaction signature (le like qui éclate doucement, le toggle parfait) que les utilisateurs remarquent et aiment.",
          },
        ],
      },
    ],
  },
  {
    id: "courbes-personnalisees",
    title: "Créer ses courbes d'easing",
    level: 3,
    intro:
      "Quand les courbes standard ne suffisent pas : les régler soi-même.",
    blocks: [
      {
        kind: "text",
        text: "Une courbe `cubic-bezier(x1, y1, x2, y2)` définit l'accélération : les deux points de contrôle sculptent la trajectoire. Outil : cubic-bezier.com pour visualiser et tester en direct.",
      },
      {
        kind: "code",
        language: "css",
        title: "Exemples de courbes personnalisées",
        code: "/* Expressive : départ très rapide, arrivée très douce */\n--ease-expressive: cubic-bezier(0.05, 0.7, 0.1, 1);\n/* Snappy : parfait pour les micro-feedbacks */\n--ease-snappy: cubic-bezier(0.2, 0.9, 0.25, 1.2);\n/* Attention : y > 1 crée un dépassement (overshoot) — à réserver aux cas voulus */",
      },
      {
        kind: "list",
        items: [
          "Règle : 2 à 3 courbes personnalisées maximum dans un système — au-delà, c'est de l'incohérence.",
          "Le dépassement (`y > 1`, effet élastique) : à utiliser avec extrême parcimonie, jamais sur des éléments critiques.",
          "Documenter chaque courbe : nom, valeurs, usage prévu, exemple animé.",
        ],
      },
    ],
  },
  {
    id: "tokens-motion",
    title: "Tokens de motion : systématiser",
    level: 3,
    intro:
      "Durées et easings en tokens : le mouvement devient un système.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Tokens de motion (extrait réaliste)",
        code: ":root {\n  --motion-duration-instant: 100ms;\n  --motion-duration-fast: 200ms;\n  --motion-duration-base: 300ms;\n  --motion-duration-slow: 500ms;\n  --motion-ease-out: cubic-bezier(0, 0, 0.2, 1);\n  --motion-ease-in: cubic-bezier(0.4, 0, 1, 1);\n  --motion-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);\n}",
      },
      {
        kind: "text",
        text: "Usage : `transition: opacity var(--motion-duration-fast) var(--motion-ease-out)`. Les développeurs composent avec les tokens au lieu d'inventer des durées — la cohérence du mouvement devient automatique.",
      },
    ],
  },
  {
    id: "transitions-ecrans",
    title: "Transitions entre écrans",
    level: 3,
    intro:
      "Le changement d'écran est la transition la plus visible : ses patterns.",
    blocks: [
      {
        kind: "fields",
        title: "Patterns de transition d'écran",
        fields: [
          {
            label: "Push / slide",
            value:
              "Le nouvel écran glisse depuis le bord (300 ms, ease-out) : signale une progression dans une hiérarchie (détail depuis une liste).",
          },
          {
            label: "Fade / dissolve",
            value:
              "Fondu croisé (200 ms) : pour les écrans de même niveau (onglets) — aucun sens directionnel impliqué.",
          },
          {
            label: "Shared element",
            value:
              "Un élément (image, carte) se transforme en l'écran suivant : la continuité la plus élégante, à réserver aux moments clés.",
          },
          {
            label: "Modal",
            value:
              "L'écran monte depuis le bas avec fond assombri : signale une tâche interruptive et temporaire.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle : la direction raconte la hiérarchie — avancer = depuis la droite (LTR), reculer = inverse. Inverser les sens désoriente.",
      },
    ],
  },
  {
    id: "gestes-tactiles",
    title: "Mouvement et gestes tactiles",
    level: 3,
    intro:
      "Sur mobile, le mouvement suit le doigt : les règles du geste.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le geste direct (drag, swipe) : l'élément suit le doigt en temps réel, sans easing — l'easing s'applique à la relâche (snap ou retour).",
          "Seuils : en dessous d'une distance/vélocité, l'élément revient (spring back) ; au-delà, il complète l'action.",
          "Pull-to-refresh : l'indicateur suit le doigt, puis l'animation de chargement prend le relais — la transition entre les deux doit être invisible.",
          "Ne jamais animer pendant un geste actif : le mouvement suit, il ne précède pas.",
          "Accessibilité : toute action au geste a une alternative au tap (bouton explicite).",
        ],
      },
    ],
  },
  {
    id: "chargement-skeletons",
    title: "Chargement : spinners, skeletons, progressifs",
    level: 3,
    intro:
      "Le mouvement qui rassure pendant l'attente : choisir le bon pattern.",
    blocks: [
      {
        kind: "fields",
        title: "Les patterns de chargement",
        fields: [
          {
            label: "Spinner",
            value:
              "Attente indéterminée courte (< 2 s) : rotation continue, discret. Au-delà, il faut mieux.",
          },
          {
            label: "Skeleton",
            value:
              "Formes grises qui miment la mise en page : l'utilisateur perçoit la structure avant le contenu. Shimmer subtil (pas de flash agressif).",
          },
          {
            label: "Progressif",
            value:
              "Afficher le contenu au fur et à mesure (images en lazy, texte d'abord) : la perception de vitesse compte plus que la vitesse réelle.",
          },
          {
            label: "Barre de progression",
            value:
              "Pour les attentes longues et mesurables (upload) : progression réelle, jamais de fausse barre qui recule.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règles communes : pas de mouvement purement décoratif pendant le chargement (il suggère une activité fictive), texte accessible (« Chargement… ») pour les lecteurs d'écran et le mode réduit.",
      },
    ],
  },
  {
    id: "feedbacks-etats",
    title: "Feedbacks d'état : succès, erreur, validation",
    level: 3,
    intro:
      "Les micro-animations qui confirment ou corrigent : les doser juste.",
    blocks: [
      {
        kind: "list",
        items: [
          "Succès : coche qui se dessine (300 ms) ou fondu vert — bref, positif, jamais triomphal pour une action banale.",
          "Erreur : secousse horizontale légère (`shake`, 300 ms) + message — attire l'œil sans agresser. Pas de secousse violente.",
          "Validation inline : l'icône apparaît en fondu à la sortie du champ — feedback immédiat, non bloquant.",
          "Copie : le bouton confirme (« Copié ! ») pendant 1,5 s puis revient — l'utilisateur sait sans douter.",
          "Règle : un feedback par action, pas d'empilement (son + vibration + animation = trop).",
        ],
      },
    ],
  },
  {
    id: "scroll-animations",
    title: "Animations au scroll : la sobriété",
    level: 3,
    intro:
      "Le scroll est le geste le plus fréquent : ses animations doivent être invisibles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Révélation au scroll : fondu + légère translation (16 px), une seule fois par élément — jamais de ré-animation à chaque passage.",
          "Parallax : effet de profondeur séduisant mais coûteux en performance et problématique en mode réduit — à réserver aux pages marketing, jamais aux interfaces produit.",
          "Sticky headers : transition de hauteur/ombre au scroll (200 ms) — signale le changement d'état sans distraire.",
          "Ne jamais détourner le scroll (scroll hijacking) : l'utilisateur contrôle le défilement, pas le designer.",
          "En mode réduit : tout le contenu est visible immédiatement, sans animation de révélation.",
        ],
      },
    ],
  },
  {
    id: "performance-60fps",
    title: "Performance : viser 60 images/seconde",
    level: 3,
    intro:
      "Une animation saccadée est pire que pas d'animation : les règles de performance.",
    blocks: [
      {
        kind: "text",
        text: "Règle d'or : n'animer que `opacity` et `transform` (translate, scale, rotate). Ces propriétés sont gérées par le GPU sans recalcul de mise en page. Animer `width`, `height`, `top`/`left` ou les ombres déclenche des recalculs coûteux — c'est la cause n° 1 des saccades.",
      },
      {
        kind: "list",
        items: [
          "`transform: translateX()` plutôt que `left` ; `transform: scale()` plutôt que `width/height`.",
          "Éviter d'animer `box-shadow` : pré-calculer deux états ou utiliser un pseudo-élément en fondu.",
          "Limiter les animations simultanées : 3–4 éléments animés, pas 30.",
          "Tester sur appareil bas de gamme : c'est là que les saccades apparaissent.",
          "`will-change` avec parcimonie : utile sur l'élément animé, nuisible partout.",
        ],
      },
    ],
  },
  {
    id: "spring-physics",
    title: "Physique des ressorts (springs)",
    level: 3,
    intro:
      "Au-delà des courbes : des mouvements qui « vivent ».",
    blocks: [
      {
        kind: "text",
        text: "Les ressorts simulent une physique : raideur (`stiffness`), amortissement (`damping`), masse. Résultat : des mouvements organiques avec un léger dépassement naturel — parfaits pour les gestes, les toggles, les éléments « physiques ».",
      },
      {
        kind: "fields",
        title: "Régler un ressort",
        fields: [
          {
            label: "Stiffness (raideur)",
            value: "Élevée = rapide et nerveux ; basse = lent et mou. Point de départ : ~170.",
          },
          {
            label: "Damping (amortissement)",
            value: "Élevé = pas de rebond ; bas = rebond marqué. Point de départ : ~26 pour un léger rebond.",
          },
          {
            label: "Usage",
            value:
              "Gestes, drag & snap, micro-interactions ludiques. Éviter pour les transitions d'écran (imprévisibles).",
          },
          {
            label: "Limite",
            value:
              "Le rebond peut désorienter : en UI, amortissement plutôt élevé. Tester en mode réduit (pas de rebond).",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-motion-1",
    title: "Erreurs de motion (1/2)",
    level: 3,
    intro:
      "Les fautes les plus fréquentes — et leurs corrections.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq classiques",
        fields: [
          {
            label: "Tout est animé",
            value:
              "Pourquoi : enthousiasme du débutant. Correction : appliquer le test de l'intention — supprimer tout ce qui n'oriente, n'explique, ne rassure ni n'attire (utilement).",
          },
          {
            label: "Mouvements linéaires",
            value:
              "Pourquoi : easing par défaut oublié. Correction : `ease-out` en apparition, `ease-in` en disparition — systématiquement.",
          },
          {
            label: "Durées au hasard",
            value:
              "Pourquoi : 1 s « pour qu'on voie bien ». Correction : échelle 150/200/300/500 ms, tokens de motion.",
          },
          {
            label: "Rebonds partout",
            value:
              "Pourquoi : l'effet « fun » des démos. Correction : aucun rebond sauf micro-interaction ludique assumée — la sobriété est la norme.",
          },
          {
            label: "Animations bloquantes",
            value:
              "Pourquoi : l'utilisateur attend la fin de l'animation pour agir. Correction : les contrôles restent utilisables pendant les transitions ; durée totale < 500 ms.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-motion-2",
    title: "Erreurs de motion (2/2)",
    level: 3,
    intro:
      "Cinq autres défauts, plus subtils.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq défauts subtils",
        fields: [
          {
            label: "Incohérence des sens",
            value:
              "Pourquoi : chaque écran invente sa transition. Correction : la direction raconte la hiérarchie — mêmes sens pour mêmes relations, partout.",
          },
          {
            label: "Mode réduit oublié",
            value:
              "Pourquoi : « on verra plus tard ». Correction : état final statique spécifié dès la conception de chaque animation.",
          },
          {
            label: "Animation des propriétés coûteuses",
            value:
              "Pourquoi : `width`/`height` animés directement. Correction : `transform` et `opacity` uniquement — 60 fps ou rien.",
          },
          {
            label: "Stagger interminable",
            value:
              "Pourquoi : 20 éléments × 100 ms = 2 s d'attente. Correction : stagger 30–60 ms, durée totale < 500 ms.",
          },
          {
            label: "Mouvement sans origine",
            value:
              "Pourquoi : l'élément apparaît « de nulle part ». Correction : toute apparition a une origine (bord, déclencheur, fondu sur place).",
          },
        ],
      },
    ],
  },
  {
    id: "audit-motion",
    title: "Auditer le motion d'un produit",
    level: 3,
    intro:
      "La méthode pour reprendre en main les animations d'un produit existant.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Inventorier",
            detail:
              "Lister toutes les animations du produit : écrans, micro-interactions, chargements. Noter durée, easing, déclencheur de chacune.",
          },
          {
            title: "Évaluer l'intention",
            detail:
              "Pour chaque animation : orienter, expliquer, rassurer, attirer ? Sans intention nommable → candidate à la suppression.",
          },
          {
            title: "Mesurer la cohérence",
            detail:
              "Combien de durées distinctes ? Combien de courbes ? L'objectif : 4 durées, 3 courbes — le reste est du bruit.",
          },
          {
            title: "Vérifier l'accessibilité",
            detail:
              "Mode réduit testé ? Informations dépendant du seul mouvement ? Animations auto-playées stoppables ?",
          },
          {
            title: "Systématiser",
            detail:
              "Tokens de motion, patterns documentés (transitions d'écran, micro-interactions), règles d'usage. Le motion rejoint le design system.",
          },
        ],
      },
    ],
  },
  {
    id: "exercice-micro-interaction-30-min",
    title: "Exercice : une micro-interaction en 30 minutes",
    level: 3,
    intro:
      "Concevoir et prototyper un toggle parfait.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir (5 min)",
            detail:
              "Toggle on/off : états initial/final dessinés, intention nommée (« confirmer le changement d'état »).",
          },
          {
            title: "Prototyper (15 min)",
            detail:
              "Dans Figma : deux variants, Smart Animate, 200 ms ease-out. Le pouce glisse, le fond change de couleur, léger scale à l'appui.",
          },
          {
            title: "Spécifier (10 min)",
            detail:
              "Durée, courbe, propriétés animées, état en mode réduit. Tester 10 fois de suite : lasse-t-il ?",
          },
        ],
      },
      {
        kind: "text",
        text: "Critère de réussite : la spec tient en 5 lignes et un développeur peut l'implémenter à l'identique.",
      },
    ],
  },
  {
    id: "projet-systeme-motion",
    title: "Projet : un système de motion documenté",
    level: 3,
    intro:
      "Le projet complet : tokens, patterns, documentation.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir les fondations",
            detail:
              "Échelle de durées (4), courbes (3), tokens CSS. Justifier chaque choix (intention, usage).",
          },
          {
            title: "Documenter les patterns",
            detail:
              "Transitions d'écran (4 patterns), micro-interactions (toggle, like, ajout panier), chargements : prototypes Figma + specs.",
          },
          {
            title: "Traiter l'accessibilité",
            detail:
              "État réduit de chaque pattern, règles (pas d'info par le seul mouvement, animations stoppables).",
          },
          {
            title: "Produire la documentation",
            detail:
              "Page « Motion » du design system : principes, tokens, patterns avec exemples animés, interdits.",
          },
        ],
      },
    ],
  },
  {
    id: "easing-par-cas",
    title: "Quelle courbe pour quel cas",
    level: 3,
    intro:
      "Le guide de choix rapide : associer chaque situation à sa courbe.",
    blocks: [
      {
        kind: "table",
        headers: ["Situation", "Courbe", "Pourquoi"],
        rows: [
          ["Apparition d'élément", "ease-out", "Arrive vite, se pose doucement : l'œil accroche puis se repose"],
          ["Disparition", "ease-in", "Part doucement, accélère : ne retient pas l'attention"],
          ["Ouverture de panneau", "ease-out 300 ms", "Le contenu suit le geste d'ouverture"],
          ["Fermeture", "ease-in 200 ms", "Plus rapide que l'ouverture : on libère l'utilisateur"],
          ["Micro-feedback (toggle)", "ease-out 150 ms", "Instantané mais pas brutal"],
          ["Scroll / drag", "Aucune (suit le doigt)", "L'easing s'applique à la relâche, pas pendant le geste"],
          ["Chargement indéterminé", "linear", "La seule exception : vitesse constante = activité continue"],
        ],
      },
    ],
  },
  {
    id: "timing-perception",
    title: "Timing et perception : la psychologie des durées",
    level: 3,
    intro:
      "Pourquoi 300 ms et pas 800 : ce que la perception impose.",
    blocks: [
      {
        kind: "text",
        text: "En dessous de ~100 ms, le changement paraît instantané (bon pour les feedbacks). Entre 200 et 500 ms, l'utilisateur perçoit le mouvement comme une transition (bon pour les changements d'état). Au-delà d'une seconde, il perçoit une attente — et l'attente génère de l'impatience, sauf si elle est « remplie » (progression visible).",
      },
      {
        kind: "list",
        items: [
          "Causalité : pour que l'utilisateur relie l'action à son effet, le feedback doit démarrer en moins de 100 ms.",
          "Continuité : une transition de 300 ms maintient le fil ; à 800 ms, l'utilisateur a déjà décroché.",
          "Répétition : une animation vue 100 fois par jour doit être 2× plus courte qu'une animation vue une fois.",
          "Contexte : sur mobile en déplacement, tout paraît plus long — réduire les durées de ~20 % par rapport au desktop.",
        ],
      },
    ],
  },
  {
    id: "modales-panneaux-motion",
    title: "Modales et panneaux : la chorégraphie complète",
    level: 3,
    intro:
      "L'ouverture d'une modale mobilise 4 mouvements coordonnés.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Le fond s'assombrit",
            detail: "Overlay : fondu à 200 ms ease-out. Signale le changement de contexte et le staging.",
          },
          {
            title: "Le panneau arrive",
            detail: "Translation depuis le bas (mobile) ou scale 95→100 % + fondu (desktop), 300 ms ease-out.",
          },
          {
            title: "Le focus suit",
            detail: "Le focus clavier se déplace dans la modale en même temps : le mouvement visuel et logique sont synchronisés.",
          },
          {
            title: "La fermeture inverse",
            detail: "200 ms ease-in, trajectoire inverse. Le focus revient au déclencheur.",
          },
        ],
      },
      {
        kind: "text",
        text: "En mode réduit : la modale apparaît instantanément, le fond s'assombrit sans fondu. L'état final est identique — seul le trajet disparaît.",
      },
    ],
  },
  {
    id: "empty-states-animes",
    title: "États vides et illustrations animées",
    level: 3,
    intro:
      "L'animation qui adoucit les moments creux — avec des limites strictes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Usage légitime : état vide, onboarding, succès — les moments où l'utilisateur attend ou découvre, pas où il travaille.",
          "Boucle douce : mouvement lent, ample, non directionnel (flottement) — jamais de clignotement ni de rotation rapide.",
          "Toujours stoppable : en mode réduit, l'illustration est statique. Une animation en boucle non stoppable est un défaut d'accessibilité.",
          "Ne pas animer pour masquer un problème : un état vide animé ne remplace pas un état vide utile (action claire proposée).",
          "Performance : Lottie léger ou CSS — jamais de vidéo lourde pour une illustration d'état vide.",
        ],
      },
    ],
  },
  {
    id: "onboarding-anime",
    title: "Onboarding animé : guider sans lasser",
    level: 3,
    intro:
      "Les premières secondes du produit : le mouvement comme guide.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une idée par écran : l'animation illustre un bénéfice, pas trois. 3 écrans maximum.",
          "Toujours skippable : bouton « Passer » visible dès le premier écran, sans animation d'entrée retardée.",
          "Ne pas bloquer : l'utilisateur doit pouvoir interagir pendant ou juste après — pas d'intro vidéo imposée.",
          "Cohérence : mêmes courbes et durées que le reste du produit — l'onboarding n'est pas un autre produit.",
          "Mesurer : un onboarding animé qui fait chuter la complétion est un échec esthétique — tester avec et sans.",
        ],
      },
    ],
  },
  {
    id: "celebrations",
    title: "Célébrations : quand fêter une action",
    level: 3,
    intro:
      "Confettis et animations de succès : un outil puissant à réserver aux vrais moments.",
    blocks: [
      {
        kind: "text",
        text: "Règle : on célèbre les accomplissements rares et significatifs (premier projet publié, objectif atteint), jamais les actions banales (un like, une sauvegarde). Une célébration pour tout = une célébration pour rien.",
      },
      {
        kind: "list",
        items: [
          "Bref (1–2 s), non bloquant, skippable au tap.",
          "Jamais de son sans consentement explicite.",
          "En mode réduit : message de félicitations statique, pas d'animation.",
          "Ne pas célébrer les actions à fréquence élevée : la lassitude transforme le plaisir en irritation.",
        ],
      },
    ],
  },
  {
    id: "motion-signature-marque",
    title: "Signature motion : le mouvement comme identité",
    level: 3,
    intro:
      "Quand le mouvement devient reconnaissable : construire une identité en mouvement.",
    blocks: [
      {
        kind: "text",
        text: "Comme la couleur ou la typographie, le mouvement peut signer un produit : une courbe d'easing propriétaire, une transition d'écran caractéristique, une micro-interaction emblématique. C'est le niveau le plus avancé — et le plus risqué si les fondations sont bancales.",
      },
      {
        kind: "list",
        items: [
          "Prérequis : système de motion cohérent existant — la signature en est l'expression, pas le point de départ.",
          "Un seul geste signature : la transition caractéristique OU la micro-interaction emblématique, pas les deux.",
          "Documenté comme le reste : tokens, specs, interdits — la signature aussi a des règles.",
          "Testée à l'usure : une signature vue 500 fois doit encore plaire.",
        ],
      },
    ],
  },
  {
    id: "accessibilite-vestibulaire",
    title: "Troubles vestibulaires : concevoir sans exclure",
    level: 3,
    intro:
      "Approfondir : pourquoi certains mouvements rendent malades — et comment l'éviter.",
    blocks: [
      {
        kind: "text",
        text: "Les troubles vestibulaires (oreille interne) rendent certaines personnes sensibles aux mouvements d'écran : parallax, zooms, rotations, défilements automatiques peuvent provoquer nausées, vertiges et migraines. Ce n'est pas une préférence esthétique — c'est un besoin d'accessibilité.",
      },
      {
        kind: "list",
        items: [
          "Mouvements à risque : parallax, zoom avant/arrière, rotation 3D, carrousels automatiques, fonds animés plein écran.",
          "Alternatives sûres : fondus (opacity), translations courtes — les changements d'état sans déplacement spatial fort.",
          "Ne pas attendre le réglage système : éviter les mouvements à risque par défaut, pas seulement en mode réduit.",
          "Boutons pause visibles sur tout contenu animé automatiquement.",
          "En cas de doute : la version statique est toujours acceptable — le mouvement est un bonus, pas un requis.",
        ],
      },
    ],
  },
  {
    id: "exercice-transition-ecran-30-min",
    title: "Exercice : une transition d'écran en 30 minutes",
    level: 3,
    intro:
      "Prototyper la transition liste → détail.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer les écrans (10 min)",
            detail:
              "Deux écrans Figma : liste et détail, avec un élément partagé (image de la carte). Calques nommés identiquement.",
          },
          {
            title: "Animer (10 min)",
            detail:
              "Smart Animate, 300 ms ease-out : l'image partagée se transforme, le reste en fondu avec stagger de 40 ms.",
          },
          {
            title: "Spécifier et tester (10 min)",
            detail:
              "Durée, courbe, stagger, état réduit. Tester 5 fois : la continuité est-elle lisible ? Simplifier si nécessaire.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-serie-micro-interactions",
    title: "Projet : une série de 5 micro-interactions",
    level: 3,
    intro:
      "Concevoir un langage de micro-interactions cohérent pour un produit fictif.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le produit et les 5 moments",
            detail:
              "Ex. app de notes : like, ajout, suppression (avec annulation), recherche, partage. Les moments où l'utilisateur « sent » le produit.",
          },
          {
            title: "Prototyper chacune",
            detail:
              "Figma + Smart Animate : états, durées (échelle), courbes (tokens), état réduit. Cohérence entre les 5.",
          },
          {
            title: "Documenter le langage",
            detail:
              "Pour chaque : intention, déclencheur, paramètres, état réduit. Plus les règles communes (durées, courbes, interdits).",
          },
        ],
      },
      {
        kind: "text",
        text: "Critère de réussite : les 5 micro-interactions sont reconnaissables comme « du même produit » sans voir les écrans — la signature du langage.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite",
    level: 3,
    intro:
      "Les compétences de la roadmap UX Designer qui prolongent le motion design.",
    blocks: [
      {
        kind: "fields",
        title: "Continuer dans la roadmap ux-designer",
        fields: [
          {
            label: "Prototypage (`prototypage`)",
            value:
              "Prototypes haute fidélité : le terrain d'essai naturel des chorégraphies et micro-interactions.",
          },
          {
            label: "Design System (`design-system`)",
            value:
              "Intégrer le motion au système : tokens de durées et d'easing versionnés comme le reste.",
          },
          {
            label: "Accessibilité (`accessibilite-design`)",
            value:
              "Approfondir le motion accessible : `prefers-reduced-motion`, troubles vestibulaires, tests.",
          },
          {
            label: "Figma (`figma`)",
            value:
              "Smart Animate et prototypage avancé : l'outillage pour maquetter le mouvement.",
          },
          {
            label: "Portfolio (`portfolio`)",
            value:
              "Montrer le mouvement : vidéos de prototypes et specs — un portfolio statique ne rend pas justice au motion.",
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
      "Les références réelles du motion design d'interface.",
    blocks: [
      {
        kind: "fields",
        title: "Livres et outils réels",
        fields: [
          {
            label: "The Illusion of Life (livre)",
            value: "Frank Thomas & Ollie Johnston — les 12 principes à la source, par deux animateurs Disney.",
          },
          {
            label: "Designing Interface Animation (livre)",
            value: "Val Head — les principes appliqués aux interfaces web, avec exemples concrets.",
          },
          {
            label: "Easings.net",
            value: "https://easings.net/ — visualiser et comparer les courbes d'easing, copier les valeurs.",
          },
          {
            label: "Material Design — Motion",
            value: "https://m3.material.io/styles/motion/overview — le système de motion de Material 3 : durées, courbes, patterns.",
          },
          {
            label: "LottieFiles",
            value: "https://lottiefiles.com/ — bibliothèque d'animations Lottie et outils d'export.",
          },
        ],
      },
    ],
  },
];

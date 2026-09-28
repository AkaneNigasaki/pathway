import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du design thinking : les 5 phases avec leurs
 * méthodes concrètes (interviews, HMW, crazy 8s…), la facilitation
 * d'ateliers et les pièges à éviter. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_DESIGN_THINKING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le design thinking : une méthode de résolution de problèmes centrée sur l'humain.",
    blocks: [
      {
        kind: "text",
        text: "Le design thinking est une méthode de résolution de problèmes centrée sur l'humain : comprendre les utilisateurs (empathie), cadrer le vrai problème, générer des idées, prototyper et tester — en itérations courtes. Ce n'est pas une méthode réservée aux designers : c'est un processus que toute équipe produit peut appliquer.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est critique : la plupart des échecs produit ne viennent pas de mauvaises solutions mais de solutions brillantes apportées à de mauvais problèmes. Le design thinking impose de valider le problème avant d'investir dans la solution : il économise des mois de développement inutile et aligne toute l'équipe sur des besoins réels, observés, pas supposés.",
      },
      {
        kind: "text",
        text: "Le principe central : diverger avant de converger. Explorer largement le problème avant de le définir, générer beaucoup d'idées avant d'en choisir une, tester vite avec des prototypes grossiers avant de construire. Chaque phase a ses méthodes concrètes — c'est l'objet de cette Learning Page.",
      },
    ],
  },
  {
    id: "double-diamant",
    title: "Le double diamant : la carte du processus",
    level: 1,
    intro:
      "Le modèle visuel qui structure tout le reste : deux divergences, deux convergences.",
    blocks: [
      {
        kind: "diagram",
        title: "Le double diamant",
        lines: [
          "    ◆ PROBLÈME              ◆ SOLUTION",
          "  ╱ ╲                      ╱ ╲",
          " ╱   ╲  DÉCOUVRIR    ╱   ╲  DÉVELOPPER",
          " ╲   ╱  (diverger)   ╲   ╱  (diverger)",
          "  ╲ ╱                ╲ ╱",
          "   ◆ DÉFINIR          ◆ LIVRER",
          "    (converger)         (converger)",
          "         │                  │",
          "         └───── TESTER ─────┘",
          "               (itérer)",
        ],
      },
      {
        kind: "text",
        text: "Premier diamant (le bon problème) : découvrir largement (observations, interviews), puis définir précisément (le problème cadré). Second diamant (la bonne solution) : développer largement (idéation, prototypes), puis livrer en convergeant (tests, itérations).",
      },
      {
        kind: "text",
        text: "L'erreur classique : sauter le premier diamant. Partir d'un brief (« refaire le formulaire ») et designer directement la solution, sans vérifier que le formulaire est le vrai problème. Le double diamant est d'abord un garde-fou contre cette précipitation.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "les-cinq-phases",
    title: "Les 5 phases en résumé",
    level: 2,
    intro:
      "La vue d'ensemble avant le détail : ce que chaque phase produit.",
    blocks: [
      {
        kind: "table",
        headers: ["Phase", "Question", "Livrable"],
        rows: [
          ["1. Empathie", "Que vivent les utilisateurs ?", "Observations, interviews, carte d'empathie"],
          ["2. Définition", "Quel est le vrai problème ?", "Problem statement, HMW, persona, parcours"],
          ["3. Idéation", "Quelles solutions possibles ?", "Idées triées, concepts à prototyper"],
          ["4. Prototype", "À quoi ça ressemblerait ?", "Prototype testable (basse ou haute fidélité)"],
          ["5. Test", "Est-ce que ça marche ?", "Retours utilisateurs, insights, itérations"],
        ],
      },
      {
        kind: "text",
        text: "Le processus n'est pas linéaire : un test peut renvoyer à la définition du problème, un prototype peut révéler un besoin mal compris. Les flèches retour sont normales — c'est le signe que le processus fonctionne, pas qu'il échoue.",
      },
    ],
  },
  {
    id: "phase-empathie",
    title: "Phase 1 — Empathie : aller au contact",
    level: 2,
    intro:
      "Observer et écouter les utilisateurs dans leur contexte réel, sans projeter ses propres usages.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir qui observer",
            detail:
              "5 à 8 personnes représentatives des usages visés, y compris les cas extrêmes (experts, débutants, utilisateurs en difficulté) : ce sont eux qui révèlent le plus.",
          },
          {
            title: "Observer en contexte",
            detail:
              "Regarder la personne utiliser le produit (ou contourner son absence) dans son environnement réel. Noter ce qu'elle fait, pas ce qu'elle dit faire — l'écart est la matière précieuse.",
          },
          {
            title: "Interviewer en semi-directif",
            detail:
              "Questions ouvertes sur le vécu (« Racontez-moi la dernière fois que… »), relances en « pourquoi ». Écouter plus que parler : 80 % d'écoute, 20 % de questions.",
          },
          {
            title: "Documenter à chaud",
            detail:
              "Notes, photos (avec accord), citations verbatim : la matière brute qui alimentera la synthèse. Ne pas interpréter pendant la collecte.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : ne jamais demander aux utilisateurs ce qu'ils veulent comme solution (« vous voudriez un bouton ici ? »). Ils décrivent leurs problèmes et leurs contournements ; la solution est le travail de l'équipe.",
      },
    ],
  },
  {
    id: "carte-empathie",
    title: "La carte d'empathie : synthétiser",
    level: 2,
    intro:
      "Transformer les observations en synthèse partageable par toute l'équipe.",
    blocks: [
      {
        kind: "diagram",
        title: "Les 4 quadrants de la carte d'empathie",
        lines: [
          "┌──────────────┬──────────────┐",
          "│ DIT          │ FAIT         │",
          "│ citations    │ comportements│",
          "│ verbatim     │ observés     │",
          "├──────────────┼──────────────┤",
          "│ PENSE        │ RESSENT      │",
          "│ préoccupations│ émotions     │",
          "│ non dites    │ frustrations │",
          "└──────────────┴──────────────┘",
          "     → Besoins & insights en bas",
        ],
      },
      {
        kind: "text",
        text: "Remplir collectivement après les interviews : chaque quadrant reçoit les notes correspondantes, puis l'équipe en extrait les besoins (« l'utilisateur a besoin de… ») et les insights (« nous avons découvert que… »). Une carte par profil d'utilisateur.",
      },
    ],
  },
  {
    id: "definir-hmw",
    title: "Phase 2 — Définir : cadrer avec les HMW",
    level: 2,
    intro:
      "Reformuler le problème en questions « Comment pourrait-on… » (How Might We).",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Formuler le problem statement",
            detail:
              "Template : « [Utilisateur] a besoin de [besoin] car [insight surprenant]. » Exemple : « Les nouveaux inscrits ont besoin de comprendre la valeur du produit en 2 minutes car 70 % abandonnent avant la fin de l'onboarding. »",
          },
          {
            title: "Générer les HMW",
            detail:
              "Transformer le problème en questions ouvertes : « Comment pourrait-on faire comprendre la valeur en moins de 2 minutes ? » Écrire 10 à 15 HMW, des plus évidents aux plus audacieux.",
          },
          {
            title: "Trier les HMW",
            detail:
              "Écarter les trop larges (« comment pourrait-on améliorer le produit ? ») et les trop étroites (qui contiennent déjà la solution). Garder celles qui ouvrent un espace de solutions sans le fermer.",
          },
          {
            title: "Choisir le périmètre",
            detail:
              "Sélectionner 2 à 3 HMW prioritaires pour l'idéation. Les autres sont archivées, pas jetées : elles resserviront.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pourquoi les HMW fonctionnent : « comment » suppose qu'une solution existe (optimisme), « pourrait » autorise l'exploration (pas d'engagement), « on » rend le problème collectif. La formulation elle-même met l'équipe en mouvement.",
      },
    ],
  },
  {
    id: "personas-parcours",
    title: "Personas et parcours utilisateurs",
    level: 2,
    intro:
      "Deux outils de définition : qui sont les utilisateurs, que vivent-ils.",
    blocks: [
      {
        kind: "fields",
        title: "Construire sur données, pas sur fiction",
        fields: [
          {
            label: "Persona",
            value:
              "Archétype fondé sur la recherche : objectifs, frustrations, contexte, citation verbatim. Jamais inventé — chaque trait renvoie à une observation.",
          },
          {
            label: "Parcours utilisateur",
            value:
              "Les étapes vécues pour accomplir un objectif, avec émotions et points de friction à chaque étape. Révèle où intervenir.",
          },
          {
            label: "Anti-patterns",
            value:
              "Persona sans données = stéréotype. Parcours sans émotions = processus. Les deux doivent surprendre au moins une fois, sinon ils n'apprennent rien.",
          },
        ],
      },
      {
        kind: "text",
        text: "Usage : afficher personas et parcours dans l'espace de travail pendant tout le projet. Chaque décision de design doit pouvoir se justifier face à eux : « pour qui, à quelle étape, quel problème ça résout ».",
      },
    ],
  },
  {
    id: "ideation-brainstorming",
    title: "Phase 3 — Idéation : le brainstorming qui marche",
    level: 2,
    intro:
      "Générer beaucoup d'idées rapidement, sans juger : les règles qui font la différence.",
    blocks: [
      {
        kind: "list",
        items: [
          "Formuler la question HMW au mur, visible par tous pendant toute la session.",
          "Règle 1 — différer le jugement : aucune critique pendant la génération, même non verbale.",
          "Règle 2 — viser la quantité : objectif chiffré (ex. 50 idées en 20 minutes). La qualité émerge du volume.",
          "Règle 3 — rebondir : « oui, et… » plutôt que « oui, mais… ». Construire sur les idées des autres.",
          "Règle 4 — encourager les idées folles : ce sont elles qui débloquent les bonnes par contraste.",
          "Règle 5 — une idée par post-it, écrite lisiblement, collée au mur : tout le monde voit tout.",
          "Règle 6 — rester dans le sujet : le facilitateur recentre sur la HMW quand ça dérive.",
        ],
      },
      {
        kind: "text",
        text: "Après la session : regrouper les idées similaires (affinity mapping), puis voter (dot voting : 3 gommettes par personne) pour sélectionner les concepts à prototyper. Le vote n'est pas une décision démocratique — c'est un filtre avant le test utilisateur, qui tranchera vraiment.",
      },
    ],
  },
  {
    id: "crazy-8s",
    title: "Crazy 8s : 8 idées en 8 minutes",
    level: 2,
    intro:
      "La méthode d'idéation la plus rentable : individuelle, rapide, visuelle.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer",
            detail:
              "Une feuille A4 pliée en 8 cases par personne, un feutre épais (pas de stylo fin : ça force à aller à l'essentiel), un timer visible.",
          },
          {
            title: "Lancer le chrono",
            detail:
              "8 minutes, 8 cases : une idée sketchée par case, même grossière. Le but n'est pas le beau dessin mais l'idée lisible en 3 secondes.",
          },
          {
            title: "Forcer la divergence",
            detail:
              "Si les 3 premières idées sont évidentes, les 5 suivantes doivent être différentes : inverser, exagérer, combiner, supprimer. C'est après l'évident que commence l'intéressant.",
          },
          {
            title: "Partager en 2 minutes chacun",
            detail:
              "Tour de table : chacun présente ses 8 idées rapidement, sans débat. Les autres notent ce qui les inspire.",
          },
          {
            title: "Voter et converger",
            detail:
              "Dot voting sur les idées les plus prometteuses (pas les plus belles). Les gagnantes sont sketchées en plus grand et passent au prototypage.",
          },
        ],
      },
    ],
  },
  {
    id: "prototype-papier",
    title: "Phase 4 — Prototype : commencer par le papier",
    level: 2,
    intro:
      "Un prototype n'a pas besoin d'être beau : il doit être testable.",
    blocks: [
      {
        kind: "text",
        text: "Principe : prototyper au niveau de fidélité minimum qui permet de tester l'hypothèse. Tester un parcours ? Des écrans papier suffisent. Tester une micro-interaction ? Il faut un prototype cliquable. La fidélité suit la question, pas l'ego.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir l'hypothèse à tester",
            detail:
              "Un prototype = une question : « les utilisateurs comprennent-ils cette navigation ? » Pas « est-ce que le produit plaît ».",
          },
          {
            title: "Construire vite",
            detail:
              "Papier + feutre pour les parcours, Figma cliquable pour les écrans, maquette physique pour les objets. Budget : quelques heures, pas quelques jours.",
          },
          {
            title: "Simuler l'interaction",
            detail:
              "Technique du « magicien d'Oz » : un humain simule le système (change les écrans papier quand l'utilisateur « clique »). Teste le concept sans le construire.",
          },
          {
            title: "Préparer le test",
            detail:
              "Scénario réaliste, tâches concrètes, pas de guidage. Le prototype doit se suffire à lui-même.",
          },
        ],
      },
    ],
  },
  {
    id: "test-utilisateur-proto",
    title: "Phase 5 — Test : confronter au réel",
    level: 2,
    intro:
      "Faire tester le prototype par 5 utilisateurs : le protocole minimal efficace.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Recruter 5 utilisateurs",
            detail:
              "5 tests révèlent la majorité des problèmes majeurs d'un prototype. Profils correspondant aux personas, pas des collègues.",
          },
          {
            title: "Écrire le script",
            detail:
              "Contexte (« imaginez que… »), 3 à 5 tâches réalistes, questions ouvertes de fin. Ne jamais expliquer le prototype avant : l'incompréhension est une donnée.",
          },
          {
            title: "Observer sans guider",
            detail:
              "Laisser l'utilisateur se débrouiller, noter les hésitations, les erreurs, les verbatim. Relancer par « que pensez-vous qu'il va se passer ? » plutôt que corriger.",
          },
          {
            title: "Débriefer à chaud",
            detail:
              "Après chaque session : l'équipe note les 3 observations marquantes. Les patterns émergent dès la 3e session.",
          },
          {
            title: "Décider",
            detail:
              "Par hypothèse testée : validée (on avance), invalidée (on pivote), à re-tester (on itère le prototype). Documenter la décision.",
          },
        ],
      },
    ],
  },
  {
    id: "faciliter-atelier",
    title: "Faciliter un atelier : le rôle clé",
    level: 2,
    intro:
      "Le facilitateur fait la différence entre un atelier productif et une réunion coûteuse.",
    blocks: [
      {
        kind: "list",
        items: [
          "Préparer : objectif écrit en une phrase, agenda timed minute par minute, matériel prêt (post-its, feutres, timer visible).",
          "Cadrer en 5 minutes : objectif, règles (téléphones rangés, une conversation à la fois, pas de hiérarchie dans la pièce), déroulé.",
          "Faire respecter le temps : timeboxer chaque activité, annoncer le temps restant. Un atelier qui déborde perd son énergie.",
          "Équilibrer les voix : solliciter les silencieux (« qu'en penses-tu ? »), canaliser les dominants (travail individuel avant collectif).",
          "Rester neutre : le facilitateur ne donne pas son avis sur le fond — il protège le processus.",
          "Conclure par des décisions : chaque atelier se termine par « qui fait quoi pour quand », écrit et partagé.",
        ],
      },
    ],
  },
  {
    id: "cinq-pourquoi",
    title: "Les 5 pourquoi : creuser les problèmes",
    level: 2,
    intro:
      "La technique la plus simple pour passer du symptôme à la cause.",
    blocks: [
      {
        kind: "text",
        text: "Exemple : « Les utilisateurs abandonnent le formulaire. » Pourquoi ? « Il est trop long. » Pourquoi ? « Il demande des infos non nécessaires à ce stade. » Pourquoi ? « Le marketing veut qualifier les leads. » Pourquoi ? «…» — en 5 itérations, on passe d'un problème d'UX à un problème d'organisation. La solution n'est plus « raccourcir le formulaire » mais « découpler qualification et inscription ».",
      },
      {
        kind: "list",
        items: [
          "À utiliser en interview (relance douce) et en synthèse d'équipe.",
          "S'arrêter quand on atteint une cause actionnable — parfois 3 pourquoi suffisent, parfois il en faut 7.",
          "Ne pas l'utiliser comme interrogatoire : ton curieux, pas accusateur.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "interviews-avancees",
    title: "Mener des interviews qui révèlent",
    level: 3,
    intro:
      "L'interview utilisateur est un savoir-faire : les techniques qui séparent le bon du médiocre.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques d'interview",
        fields: [
          {
            label: "Questions ouvertes",
            value:
              "« Racontez-moi… », « Décrivez… », « Comment… » — jamais de questions fermées qui orientent vers oui/non.",
          },
          {
            label: "Le silence",
            value:
              "Après une réponse, attendre 3 secondes : l'interviewé complète souvent avec l'information la plus intéressante.",
          },
          {
            label: "Creuser le comportement",
            value:
              "« La dernière fois que c'est arrivé, que s'est-il passé exactement ? » — les faits, pas les opinions générales.",
          },
          {
            label: "Éviter les questions hypothétiques",
            value:
              "« Utiliseriez-vous… ? » ne prédit rien (cf. The Mom Test). Préférer : « Que faites-vous aujourd'hui pour résoudre ce problème ? »",
          },
          {
            label: "Deux rôles",
            value:
              "Un intervieweur (écoute, relance) + un preneur de notes (verbatim, observations). Intervertir à mi-parcours.",
          },
        ],
      },
      {
        kind: "text",
        text: "Après 5 à 8 interviews, les patterns se répètent : c'est le signal de saturation, inutile d'en faire 30. La qualité de l'écoute compte plus que la quantité.",
      },
    ],
  },
  {
    id: "affinity-mapping",
    title: "Affinity mapping : synthétiser en équipe",
    level: 3,
    intro:
      "Transformer des dizaines d'observations en thèmes actionnables, collectivement.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Extraire les observations",
            detail:
              "Une observation = un post-it : fait observé ou verbatim, pas d'interprétation. 30 à 100 post-its après une phase terrain.",
          },
          {
            title: "Regrouper en silence",
            detail:
              "L'équipe déplace les post-its en silence pendant 15 minutes, par affinité. Le silence évite que les voix fortes imposent les catégories.",
          },
          {
            title: "Nommer les groupes",
            detail:
              "Chaque groupe reçoit un titre qui exprime le thème (« La peur de se tromper bloque l'envoi »), pas une catégorie abstraite (« Formulaires »).",
          },
          {
            title: "Extraire les insights",
            detail:
              "Pour chaque groupe : qu'apprend-on de surprenant ? Quel besoin émerge ? Ces insights alimentent les HMW.",
          },
        ],
      },
    ],
  },
  {
    id: "jobs-to-be-done",
    title: "Jobs To Be Done : un cadrage alternatif",
    level: 3,
    intro:
      "Compléter les personas par les « jobs » : ce que l'utilisateur cherche à accomplir.",
    blocks: [
      {
        kind: "text",
        text: "Format : « Quand [situation], je veux [motivation], pour [résultat attendu]. » Exemple : « Quand je reçois une facture, je veux la classer en 10 secondes, pour ne plus la chercher au moment de la compta. » Le job décrit le progrès recherché, indépendamment de toute solution.",
      },
      {
        kind: "list",
        items: [
          "Centré sur la situation et le résultat, pas sur le profil : deux personas différentes peuvent partager le même job.",
          "Révèle la vraie concurrence : pour « ne plus chercher mes factures », le concurrent est le dossier papier, pas une autre app.",
          "Excellent pour cadrer les HMW : « Comment pourrait-on classer une facture en 10 secondes ? »",
          "Limite : moins riche que le persona sur le contexte émotionnel — les deux se complètent.",
        ],
      },
    ],
  },
  {
    id: "scamper",
    title: "SCAMPER : forcer la créativité",
    level: 3,
    intro:
      "Sept opérateurs pour transformer une idée existante en idées nouvelles.",
    blocks: [
      {
        kind: "fields",
        title: "Les 7 opérateurs SCAMPER",
        fields: [
          {
            label: "Substituer",
            value: "Que peut-on remplacer ? (un champ texte par un choix visuel…)",
          },
          {
            label: "Combiner",
            value: "Que peut-on fusionner ? (recherche + filtres en un seul geste…)",
          },
          {
            label: "Adapter",
            value: "Qu'existe-t-il ailleurs qu'on pourrait emprunter ? (le swipe des apps de rencontre…)",
          },
          {
            label: "Modifier",
            value: "Que peut-on agrandir, réduire, exagérer ? (un onboarding en 1 écran…)",
          },
          {
            label: "Autres usages",
            value: "Pour qui d'autre, dans quel autre contexte ? (ce formulaire pour les seniors…)",
          },
          {
            label: "Éliminer",
            value: "Que peut-on supprimer ? (et si on supprimait le mot de passe…)",
          },
          {
            label: "Réorganiser",
            value: "Et si on inversait l'ordre ? (payer avant de configurer…)",
          },
        ],
      },
      {
        kind: "text",
        text: "Usage : prendre une solution existante (la vôtre ou un concurrent) et appliquer chaque opérateur pendant 5 minutes. Efficace quand le brainstorming tourne en rond.",
      },
    ],
  },
  {
    id: "worst-idea",
    title: "Worst idea : libérer par l'absurde",
    level: 3,
    intro:
      "Générer volontairement les pires idées possibles — puis les inverser.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Proposer les pires idées",
            detail:
              "Question : « Quelle serait la pire expérience d'inscription possible ? » Les réponses fusent car il n'y a aucun risque à être mauvais.",
          },
          {
            title: "Lister les propriétés",
            detail:
              "Extraire ce qui rend ces idées mauvaises : « demande 50 champs », « aucune explication », « impossible d'annuler ».",
          },
          {
            title: "Inverser",
            detail:
              "Retourner chaque propriété : « 3 champs maximum », « chaque étape expliquée », « annulation en 1 clic ». Des principes de design émergent.",
          },
          {
            title: "Exploiter",
            detail:
              "Ces principes inversés alimentent l'idéation sérieuse — et l'équipe s'est échauffée en riant.",
          },
        ],
      },
    ],
  },
  {
    id: "storyboarding",
    title: "Storyboarding : raconter l'expérience",
    level: 3,
    intro:
      "Dessiner l'expérience dans le temps, avant de dessiner les écrans.",
    blocks: [
      {
        kind: "text",
        text: "6 cases : contexte initial, déclencheur, découverte, usage, difficulté éventuelle, résolution. Le storyboard force à penser le avant/après de l'écran — ce que les maquettes oublient — et se teste très bien auprès d'utilisateurs (« que se passe-t-il ici selon vous ? »).",
      },
      {
        kind: "list",
        items: [
          "Niveau de dessin : bonhommes bâtons acceptés. La clarté narrative prime.",
          "Inclure les émotions : le storyboard montre le ressenti, pas seulement les actions.",
          "Excellent pour aligner une équipe sur une vision avant de maquetter.",
          "Variante : le storyboard « service » inclut les coulisses (ce que fait le système pendant que l'utilisateur attend).",
        ],
      },
    ],
  },
  {
    id: "fidelite-prototype",
    title: "Choisir la fidélité du prototype",
    level: 3,
    intro:
      "Basse, moyenne, haute fidélité : choisir selon la question à tester.",
    blocks: [
      {
        kind: "table",
        headers: ["Fidélité", "Forme", "Teste", "Coût"],
        rows: [
          ["Basse", "Papier, wireframes", "Structure, parcours, compréhension globale", "Heures"],
          ["Moyenne", "Maquette cliquable (Figma)", "Navigation, enchaînement des écrans, contenus", "Jours"],
          ["Haute", "Prototype animé / codé", "Micro-interactions, ressenti, détails visuels", "Semaines"],
        ],
      },
      {
        kind: "text",
        text: "Règle : toujours commencer un niveau en dessous de ce qu'on croit nécessaire. Un test papier qui échoue fait économiser une semaine de maquette haute fidélité. Monter en fidélité uniquement quand les questions de bas niveau sont résolues.",
      },
    ],
  },
  {
    id: "recrutement-testeurs",
    title: "Recruter les bons testeurs",
    level: 3,
    intro:
      "Un test avec les mauvaises personnes ne vaut rien : le recrutement est la moitié du travail.",
    blocks: [
      {
        kind: "list",
        items: [
          "Critères de recrutement écrits : 3 à 5 critères issus des personas (usage, contexte, niveau).",
          "Éviter les proches et les collègues : ils devinent l'intention et ménagent.",
          "Diversifier : débutants et experts, contextes variés — les cas extrêmes révèlent le plus.",
          "Prévoir 1 à 2 remplaçants : les no-shows sont la norme, pas l'exception.",
          "Rémunérer : bon d'achat ou équivalent. Le respect du temps des participants conditionne la qualité.",
          "Informer : durée, enregistrement (avec accord écrit), droit de retrait à tout moment.",
        ],
      },
    ],
  },
  {
    id: "script-test-utilisateur",
    title: "Écrire un script de test utilisateur",
    level: 3,
    intro:
      "Le template de script qui rend les sessions comparables.",
    blocks: [
      {
        kind: "fields",
        title: "Structure d'un script",
        fields: [
          {
            label: "Accueil (5 min)",
            value:
              "Présentation, cadre (« il n'y a pas de mauvaise réponse, c'est le prototype qu'on teste »), accord d'enregistrement.",
          },
          {
            label: "Contexte (5 min)",
            value:
              "Questions sur les habitudes actuelles : ancrent la session dans le réel et détendent.",
          },
          {
            label: "Tâches (25 min)",
            value:
              "3 à 5 scénarios réalistes (« Vous venez de recevoir… »), sans vocabulaire de l'interface. Ordre du plus ouvert au plus guidé.",
          },
          {
            label: "Débrief (10 min)",
            value:
              "Impressions générales, ce qui a surpris, ce qui manquerait. Questions ouvertes uniquement.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'écriture : le script ne contient jamais d'instructions de manipulation (« cliquez sur le bouton bleu »). Si la tâche nécessite ce niveau de guidage, c'est le prototype qui est défaillant — et c'est une donnée.",
      },
    ],
  },
  {
    id: "synthese-insights",
    title: "De l'observation à l'insight : la synthèse",
    level: 3,
    intro:
      "Transformer 5 sessions de test en décisions : la méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Noter à chaud",
            detail:
              "Après chaque session, l'équipe liste ses 3 observations marquantes sur post-its. La mémoire fraîche vaut mieux que les enregistrements.",
          },
          {
            title: "Regrouper",
            detail:
              "Affinity mapping des observations : les problèmes rencontrés par 3+ participants sont des patterns, pas des anecdotes.",
          },
          {
            title: "Formuler les insights",
            detail:
              "Template : « Nous avons observé [comportement], ce qui suggère [interprétation], donc nous devrions [piste]. » L'insight relie fait et action.",
          },
          {
            title: "Prioriser",
            detail:
              "Gravité (bloque la tâche ? contournement possible ?) × fréquence (combien d'utilisateurs ?). Les bloquants fréquents d'abord.",
          },
          {
            title: "Décider et tracer",
            detail:
              "Pour chaque insight : décision (corriger / explorer / écarter) + responsable + échéance. Un insight sans décision est un insight perdu.",
          },
        ],
      },
    ],
  },
  {
    id: "biais-a-eviter",
    title: "Les biais qui faussent la recherche",
    level: 3,
    intro:
      "Connaître les biais pour s'en protéger : les plus dangereux en design.",
    blocks: [
      {
        kind: "fields",
        title: "Quatre biais critiques",
        fields: [
          {
            label: "Biais de confirmation",
            value:
              "Ne retenir que ce qui confirme l'hypothèse. Parade : chercher activement les contre-exemples, faire analyser par quelqu'un de neutre.",
          },
          {
            label: "Biais de l'observateur",
            value:
              "Guider l'utilisateur vers la « bonne » réponse par les questions ou les réactions. Parade : script écrit, silence, neutralité.",
          },
          {
            label: "Faux consensus",
            value:
              "« Moi j'utiliserais comme ça, donc les utilisateurs aussi. » Parade : interdire les arguments fondés sur l'expérience personnelle en synthèse.",
          },
          {
            label: "Biais de désirabilité",
            value:
              "L'interviewé dit ce qui fait plaisir (« oui, j'utiliserais »). Parade : questions sur le comportement passé, jamais sur les intentions futures.",
          },
        ],
      },
    ],
  },
  {
    id: "pieges-design-thinking",
    title: "Les pièges du design thinking",
    level: 3,
    intro:
      "Les façons les plus courantes de rater un processus par ailleurs correct.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq pièges et leurs parades",
        fields: [
          {
            label: "Le théâtre de l'innovation",
            value:
              "Post-its colorés sans décision ni test : l'atelier comme animation. Parade : chaque atelier produit des décisions tracées et un test planifié.",
          },
          {
            label: "Sauter l'empathie",
            value:
              "« On connaît nos utilisateurs. » Parade : imposer au minimum 3 interviews avant tout cadrage — les surprises sont garanties.",
          },
          {
            label: "La solution du plus gradé",
            value:
              "Le HiPPO (highest paid person's opinion) tranche l'idéation. Parade : vote anonyme, travail individuel avant collectif, test utilisateur comme arbitre.",
          },
          {
            label: "Prototyper trop beau, trop tôt",
            value:
              "Haute fidélité immédiate : on s'attache au design au lieu de tester l'hypothèse. Parade : imposer la basse fidélité pour les premiers cycles.",
          },
          {
            label: "Tester pour valider",
            value:
              "Chercher la confirmation plutôt que la vérité. Parade : formuler l'hypothèse à invalider avant le test, célébrer les échecs instructifs.",
          },
        ],
      },
    ],
  },
  {
    id: "design-sprint",
    title: "Le Design Sprint : 5 jours pour trancher",
    level: 3,
    intro:
      "La méthode Google Ventures pour passer d'un problème à un prototype testé en une semaine.",
    blocks: [
      {
        kind: "diagram",
        title: "Les 5 jours du sprint",
        lines: [
          "Lun — COMPRENDRE : cartographier le problème, choisir la cible",
          "Mar — DIVERGER : crazy 8s, explorer les solutions",
          "Mer — DÉCIDER : voter, storyboarder la solution retenue",
          "Jeu — PROTOTYPER : construire un prototype réaliste mais factice",
          "Ven — TESTER : 5 utilisateurs, observations, décision",
        ],
      },
      {
        kind: "text",
        text: "Le sprint convient aux décisions à fort enjeu et forte incertitude (nouveau produit, refonte majeure). Conditions : une équipe dédiée à temps plein pendant la semaine, un décideur présent, un problème cadré. Référence : le livre « Sprint » de Jake Knapp.",
      },
    ],
  },
  {
    id: "ateliers-distanciel",
    title: "Animer des ateliers à distance",
    level: 3,
    intro:
      "Le design thinking ne s'arrête pas au distanciel : l'adapter.",
    blocks: [
      {
        kind: "list",
        items: [
          "Outil de tableau blanc partagé (Miro, Mural, FigJam) : préparer les cadres à l'avance (zones par activité).",
          "Sessions plus courtes : 90 minutes max par bloc, pauses fréquentes — la fatigue visio est réelle.",
          "Travail individuel d'abord, partage ensuite : compense l'absence d'énergie de la pièce.",
          "Caméras allumées pendant les échanges, éteintes pendant le travail individuel.",
          "Un co-facilitateur : l'un anime, l'autre gère le technique et le temps.",
          "Documenter en direct : le tableau blanc est le compte-rendu, pas un brouillon à retranscrire.",
        ],
      },
    ],
  },
  {
    id: "mesurer-succes",
    title: "Mesurer le succès d'une démarche",
    level: 3,
    intro:
      "Le design thinking se pilote aussi : quels indicateurs suivre.",
    blocks: [
      {
        kind: "fields",
        title: "Indicateurs par phase",
        fields: [
          {
            label: "Empathie / Définition",
            value: "Nombre d'interviews, insights documentés, HMW priorisés : la matière est-elle réelle ?",
          },
          {
            label: "Idéation / Prototype",
            value: "Idées générées, prototypes construits, temps prototype→test : va-t-on assez vite ?",
          },
          {
            label: "Test",
            value: "Hypothèses validées/invalidées, taux de réussite des tâches, problèmes bloquants résiduels.",
          },
          {
            label: "Produit",
            value: "Au final : le problème initial est-il résolu pour les utilisateurs ? (métrique métier liée au HMW).",
          },
        ],
      },
      {
        kind: "text",
        text: "L'indicateur le plus parlant reste le nombre de cycles prototype→test par mois : une équipe qui teste chaque semaine apprend plus vite qu'une équipe qui teste chaque trimestre, quel que soit son talent.",
      },
    ],
  },
  {
    id: "documenter-decisions",
    title: "Documenter les décisions de design",
    level: 3,
    intro:
      "Tracer pourquoi : la mémoire du projet vaut autant que ses écrans.",
    blocks: [
      {
        kind: "text",
        text: "Template de décision : contexte, options envisagées, décision prise, justification (données, test, insight), date, participants. Tenu dans un document vivant, il évite de re-débattre les mêmes sujets six mois plus tard et permet aux nouveaux arrivants de comprendre le « pourquoi » du produit.",
      },
      {
        kind: "list",
        items: [
          "Une décision = une entrée datée : le journal des décisions se lit chronologiquement.",
          "Lier les preuves : enregistrement de test, verbatim, métrique — pas seulement l'opinion du moment.",
          "Revisiter : certaines décisions ont une date de péremption (hypothèses à re-tester quand le contexte change).",
        ],
      },
    ],
  },
  {
    id: "exercice-hmw-30-min",
    title: "Exercice : du problème au HMW en 30 minutes",
    level: 3,
    intro:
      "S'entraîner au cadrage sur un problème réel.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un problème (5 min)",
            detail:
              "Un irritant réel de votre quotidien numérique (une app que vous utilisez). Le formuler en une phrase.",
          },
          {
            title: "Appliquer les 5 pourquoi (10 min)",
            detail:
              "Creuser jusqu'à la cause actionnable. Noter chaque niveau : le vrai problème est rarement le premier énoncé.",
          },
          {
            title: "Écrire le problem statement (5 min)",
            detail:
              "Template « [utilisateur] a besoin de [besoin] car [insight] ». Le faire relire : est-il spécifique ? Surprenant ?",
          },
          {
            title: "Générer 10 HMW (10 min)",
            detail:
              "10 questions « Comment pourrait-on… », des évidentes aux audacieuses. Trier : garder les 3 qui ouvrent le plus de pistes.",
          },
        ],
      },
    ],
  },
  {
    id: "exercice-crazy-8s-solo",
    title: "Exercice : crazy 8s en solo",
    level: 3,
    intro:
      "La méthode fonctionne aussi seul : le protocole adapté.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cadrer (5 min)",
            detail: "Écrire la HMW en haut d'une feuille A4 pliée en 8. Timer réglé sur 8 minutes.",
          },
          {
            title: "Sketcher (8 min)",
            detail:
              "8 idées, une par case, sans s'arrêter. Les 3 premières seront banales : c'est normal, continuer.",
          },
          {
            title: "Forcer (inclus)",
            detail:
              "Cases 6-8 : appliquer SCAMPER mentalement (inverser, exagérer, combiner) pour sortir de l'évident.",
          },
          {
            title: "Sélectionner (5 min)",
            detail:
              "Relire à froid : entourer les 2 idées les plus prometteuses et noter pourquoi en une phrase chacune.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-challenge-complet",
    title: "Projet : un cycle design thinking complet",
    level: 3,
    intro:
      "Mener les 5 phases de bout en bout sur un problème réel.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Empathie (semaine 1)",
            detail:
              "5 interviews + observations sur un problème réel (service local, association, app). Cartes d'empathie, affinity mapping.",
          },
          {
            title: "Définition (semaine 1)",
            detail:
              "Problem statement, 10 HMW, 2-3 priorisés. Personas et parcours si pertinent.",
          },
          {
            title: "Idéation (semaine 2)",
            detail:
              "Brainstorming + crazy 8s (+ SCAMPER si blocage). Vote, 2 concepts retenus.",
          },
          {
            title: "Prototype (semaine 2)",
            detail:
              "Prototype papier ou Figma cliquable du concept principal. Une hypothèse = un prototype.",
          },
          {
            title: "Test & restitution (semaine 3)",
            detail:
              "5 tests utilisateurs, synthèse, décisions. Restitution : problème, méthode, prototype, résultats, itérations — le format exact d'une case study.",
          },
        ],
      },
      {
        kind: "text",
        text: "Critère de réussite : au moins une hypothèse invalidée par les tests et un pivot documenté. Un projet où tout est « validé » du premier coup n'a probablement pas testé assez fort.",
      },
    ],
  },
  {
    id: "observation-contextuelle",
    title: "Observation contextuelle (shadowing)",
    level: 3,
    intro:
      "Suivre l'utilisateur dans son contexte réel : la méthode la plus révélatrice.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Négocier l'accès",
            detail:
              "Expliquer l'objectif (comprendre, pas juger), la durée (2 à 4 heures), la discrétion. Accord explicite, anonymisation garantie.",
          },
          {
            title: "Observer sans intervenir",
            detail:
              "Se faire oublier : noter les actions, les interruptions, les outils détournés, les frustrations visibles. Ne pas aider, ne pas suggérer.",
          },
          {
            title: "Noter les contournements",
            detail:
              "Post-its, bouts de papier, tableurs parallèles : chaque contournement signale un besoin non couvert par l'outil officiel.",
          },
          {
            title: "Débriefer à chaud",
            detail:
              "Juste après : « J'ai remarqué que vous faisiez X, pouvez-vous m'expliquer pourquoi ? » — l'explication immédiate vaut mieux que le souvenir.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ce que le shadowing révèle et que l'interview ne révèle pas : les interruptions réelles, les usages détournés, l'écart entre le processus officiel et le processus vécu.",
      },
    ],
  },
  {
    id: "tri-cartes",
    title: "Tri de cartes : structurer l'information",
    level: 3,
    intro:
      "Faire classer les contenus par les utilisateurs pour concevoir une navigation qui leur ressemble.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer les cartes",
            detail:
              "30 à 60 cartes, une par contenu/fonctionnalité, libellées comme les utilisateurs les nomment (pas le jargon interne).",
          },
          {
            title: "Tri ouvert",
            detail:
              "L'utilisateur regroupe librement et nomme ses groupes : révèle son modèle mental. 10 à 15 participants pour des patterns fiables.",
          },
          {
            title: "Analyser",
            detail:
              "Matrice de similarité : quelles cartes sont souvent ensemble ? Les groupes stables deviennent les rubriques.",
          },
          {
            title: "Valider par tri fermé",
            detail:
              "Proposer l'arborescence issue du tri ouvert à de nouveaux participants : arrivent-ils à classer sans hésiter ?",
          },
        ],
      },
    ],
  },
  {
    id: "assumptions-mapping",
    title: "Assumptions mapping : expliciter les hypothèses",
    level: 3,
    intro:
      "Lister ce que l'équipe croit savoir — pour tester ce qui est risqué.",
    blocks: [
      {
        kind: "text",
        text: "Tout projet repose sur des hypothèses non vérifiées (« les utilisateurs veulent… », « le problème principal est… »). Les rendre visibles permet de tester les plus risquées en premier au lieu de les découvrir en production.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Lister les hypothèses",
            detail:
              "En équipe : « que supposons-nous sur les utilisateurs, le problème, la solution ? » Une hypothèse par post-it, sans filtre.",
          },
          {
            title: "Évaluer risque et incertitude",
            detail:
              "Placer chaque hypothèse sur 2 axes : impact si elle est fausse × degré d'incertitude. Le quadrant haut/haut est la zone de danger.",
          },
          {
            title: "Planifier les tests",
            detail:
              "Chaque hypothèse à haut risque devient une question de recherche ou de prototype : qui la teste, comment, quand.",
          },
        ],
      },
    ],
  },
  {
    id: "magicien-oz",
    title: "Le magicien d'Oz : tester sans construire",
    level: 3,
    intro:
      "Simuler le système avec un humain : tester des concepts ambitieux à coût nul.",
    blocks: [
      {
        kind: "text",
        text: "Principe : l'utilisateur interagit avec une interface qui semble automatisée, mais un membre de l'équipe produit les réponses en coulisses. Idéal pour tester des fonctionnalités coûteuses (recommandations, IA, automatisations) avant de les développer.",
      },
      {
        kind: "list",
        items: [
          "Préparer les réponses types à l'avance pour réagir vite et rester crédible.",
          "Ne jamais révéler la supercherie pendant le test : observer la réaction au « système ».",
          "Débriefer honnêtement après : expliquer la méthode et remercier.",
          "Limite : ne teste pas la performance ni la fiabilité technique — uniquement la valeur perçue et la compréhension.",
        ],
      },
    ],
  },
  {
    id: "tests-guerrilla",
    title: "Tests guerrilla : tester vite et souvent",
    level: 3,
    intro:
      "Des tests légers dans un café valent mieux qu'aucun test.",
    blocks: [
      {
        kind: "list",
        items: [
          "Format : 15 minutes, 1 tâche, dans un lieu public avec l'accord de la personne — contrepartie (café offert).",
          "Objectif : détecter les incompréhensions grossières, pas valider finement.",
          "Idéal en début de projet ou entre deux cycles de tests formels.",
          "Limites assumées : échantillon non représentatif, contexte bruyant — à compléter par des tests cadrés.",
          "Règle : un test guerrilla par semaine entretient le contact avec le réel mieux qu'un gros test par trimestre.",
        ],
      },
    ],
  },
  {
    id: "priorisation-rice",
    title: "Prioriser : RICE et MoSCoW",
    level: 3,
    intro:
      "Après l'idéation, choisir quoi prototyper : deux grilles de priorisation.",
    blocks: [
      {
        kind: "fields",
        title: "Deux méthodes complémentaires",
        fields: [
          {
            label: "MoSCoW",
            value:
              "Must / Should / Could / Won't : classe les idées par nécessité. Simple et rapide en atelier, parfait pour cadrer un sprint.",
          },
          {
            label: "RICE",
            value:
              "Reach × Impact × Confidence / Effort : score chiffré pour comparer des idées. Force à expliciter la confiance (souvent basse — et c'est une donnée).",
          },
        ],
      },
      {
        kind: "text",
        text: "Dans un cycle design thinking, la priorisation sert à choisir les 1 à 2 concepts à prototyper — pas à planifier un roadmap produit. Trancher vite, tester, itérer : la priorisation parfaite n'existe pas, le test tranche.",
      },
    ],
  },
  {
    id: "erreurs-facilitation",
    title: "Erreurs de facilitation",
    level: 3,
    intro:
      "Les fautes qui tuent un atelier — vues en pratique.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq fautes classiques",
        fields: [
          {
            label: "Pas d'objectif écrit",
            value:
              "L'atelier dérive dès la première heure. Correction : une phrase d'objectif affichée en permanence, tout écart y est ramené.",
          },
          {
            label: "Le facilitateur donne son avis",
            value:
              "Il biaise le groupe et perd sa neutralité. Correction : s'il doit participer, il le fait comme participant — jamais les deux rôles à la fois.",
          },
          {
            label: "Tout en collectif",
            value:
              "Les voix fortes dominent, les autres suivent. Correction : alterner travail individuel silencieux et partage.",
          },
          {
            label: "Pas de timeboxing",
            value:
              "La première activité mange la moitié de la journée. Correction : timer visible, temps annoncé, respect strict.",
          },
          {
            label: "Finir sans décision",
            value:
              "« C'était intéressant » sans suite. Correction : les 20 dernières minutes sont réservées aux décisions (qui/quoi/quand), écrites et partagées.",
          },
        ],
      },
    ],
  },
  {
    id: "exercice-interview-30-min",
    title: "Exercice : mener une interview en 30 minutes",
    level: 3,
    intro:
      "Pratiquer l'interview semi-directive sur un sujet simple.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer (5 min)",
            detail:
              "Sujet : « la dernière fois que vous avez cuisiné quelque chose de nouveau ». 5 questions ouvertes écrites à l'avance.",
          },
          {
            title: "Interviewer (15 min)",
            detail:
              "Un proche comme cobaye : questions ouvertes, silences, relances en « pourquoi ». Noter les verbatim exacts.",
          },
          {
            title: "Analyser (10 min)",
            detail:
              "Extraire 3 observations, 1 besoin (« a besoin de… »), 1 insight surprenant. Formuler 2 HMW.",
          },
        ],
      },
      {
        kind: "text",
        text: "Critère de réussite : au moins un insight que vous n'auriez pas deviné sans l'interview. Si tout était prévisible, les questions étaient trop fermées.",
      },
    ],
  },
  {
    id: "projet-atelier-ideation",
    title: "Projet : animer un atelier d'idéation réel",
    level: 3,
    intro:
      "Organiser et faciliter un vrai atelier pour une vraie équipe.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cadrer avec le commanditaire",
            detail:
              "Problème réel d'une équipe (association, projet, entreprise) : objectif écrit, participants (5-8), durée (demi-journée), livrable attendu.",
          },
          {
            title: "Préparer",
            detail:
              "Agenda timed, matériel, salle ou tableau blanc distant préparé. Brief de cadrage (HMW) validé avec le commanditaire.",
          },
          {
            title: "Faciliter",
            detail:
              "Déroulé : cadrage, crazy 8s, partage, vote, storyboard du concept retenu. Rester neutre, timeboxer, équilibrer les voix.",
          },
          {
            title: "Restituer",
            detail:
              "Compte-rendu sous 48 h : idées générées, concept retenu, décisions (qui/quoi/quand), prochaines étapes (prototype, test).",
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
      "Les compétences de la roadmap UX Designer qui prolongent le design thinking.",
    blocks: [
      {
        kind: "fields",
        title: "Continuer dans la roadmap ux-designer",
        fields: [
          {
            label: "UX Research (`ux-research`)",
            value:
              "Approfondir la recherche : méthodes quantitatives et qualitatives, protocoles rigoureux, synthèse à l'échelle.",
          },
          {
            label: "Wireframing (`wireframing`)",
            value:
              "Prototyper vite et bas : le wireframe est le langage naturel de la phase prototype.",
          },
          {
            label: "Prototypage (`prototypage`)",
            value:
              "Monter en fidélité : prototypes interactifs et animés pour tester les détails.",
          },
          {
            label: "Figma (`figma`)",
            value:
              "L'outil pour prototyper : maquettes cliquables testables en quelques heures.",
          },
          {
            label: "Portfolio (`portfolio`)",
            value:
              "Raconter un cycle complet en case study : problème, méthode, tests, pivot — exactement ce que les recruteurs cherchent.",
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
      "Les références réelles du design thinking.",
    blocks: [
      {
        kind: "fields",
        title: "Livres, kits et références réels",
        fields: [
          {
            label: "Sprint (livre)",
            value: "Jake Knapp — la méthode du design sprint en 5 jours, avec exemples concrets.",
          },
          {
            label: "The Mom Test (livre)",
            value: "Rob Fitzpatrick — comment mener des interviews sans se faire mentir poliment.",
          },
          {
            label: "IDEO Design Kit",
            value: "https://www.designkit.org/ — méthodes et mindsets du human-centered design, en libre accès.",
          },
          {
            label: "NN/g Articles",
            value: "https://www.nngroup.com/articles/ — des centaines d'articles de recherche UX fondés sur des preuves.",
          },
        ],
      },
    ],
  },
];

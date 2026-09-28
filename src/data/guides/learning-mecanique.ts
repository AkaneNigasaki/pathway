import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la mécanique pour la robotique : cinématique,
 * dynamique, actionneurs, matériaux et fabrication. Les formules sont données
 * en texte avec des exemples chiffrés réels et vérifiables par le calcul.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_MECANIQUE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction : la structure qui bouge",
    level: 1,
    intro:
      "La mécanique conçoit le corps du robot : des pièces qui s'articulent avec précision, supportent les efforts et durent.",
    blocks: [
      {
        kind: "text",
        text: "Un robot est d'abord un objet physique qui bouge : des segments reliés par des articulations, mus par des moteurs, qui doivent atteindre des positions précises sans casser ni vibrer. La mécanique robotique couvre cette réalité : modéliser en CAO, calculer la cinématique (où va l'effecteur ?), choisir matériaux et actionneurs, fabriquer et assembler.",
      },
      {
        kind: "diagram",
        title: "La chaîne de conception mécanique",
        lines: [
          "CAHIER DES CHARGES (charge, course, précision, masse)",
          "     │",
          "     ▼",
          "CAO (modèle 3D paramétrique, assemblages)",
          "     │",
          "     ▼",
          "CINÉMATIQUE (angles ↔ position de l'effecteur)",
          "     │",
          "     ▼",
          "DIMENSIONNEMENT (efforts, couples, matériaux)",
          "     │",
          "     ▼",
          "FABRICATION (impression 3D, usinage) + ASSEMBLAGE",
          "     │",
          "     ▼",
          "TESTS (jeu, répétabilité, endurance)",
        ],
      },
      {
        kind: "text",
        text: "Le point clé : la précision d'un robot ne vient pas que du logiciel — le jeu dans les articulations, la flexibilité des segments et les tolérances d'assemblage fixent un plafond que même le meilleur contrôleur ne franchit pas. D'où l'importance de concevoir juste dès le départ.",
      },
    ],
  },
  {
    id: "familles-robots",
    title: "Les grandes architectures de robots",
    level: 1,
    intro:
      "Bras, mobiles, parallèles : chaque architecture a ses forces et ses calculs.",
    blocks: [
      {
        kind: "fields",
        title: "Les familles, en une phrase chacune",
        fields: [
          {
            label: "Bras articulés (sériels)",
            value:
              "Des segments en chaîne (épaule, coude, poignet) : grand espace de travail, calculs de cinématique inverse — le bras industriel typique à 6 axes.",
          },
          {
            label: "Robots cartésiens / portiques",
            value:
              "Trois translations perpendiculaires : cinématique triviale, très rigides et précis — imprimantes 3D, machines CNC.",
          },
          {
            label: "SCARA",
            value:
              "Deux rotations horizontales + une translation verticale : rapides et précis dans le plan — assemblage électronique.",
          },
          {
            label: "Robots parallèles",
            value:
              "Plusieurs chaînes fermées vers la même plateforme (delta) : très rapides et rigides, espace de travail réduit — pick-and-place.",
          },
          {
            label: "Robots mobiles",
            value:
              "Roues, chenilles ou jambes : la « mécanique » est le châssis + la transmission — la complexité migre vers la navigation.",
          },
        ],
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
      "La mécanique applique la physique avec des outils mathématiques précis.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir, et pourquoi",
        fields: [
          {
            label: "Physique : statique et dynamique",
            value:
              "Équilibre des forces, couples, frottements : dimensionner une structure qui supporte les efforts réels sans casser ni fléchir.",
          },
          {
            label: "Mathématiques : géométrie 3D",
            value:
              "Repères, rotations, matrices homogènes : placer précisément chaque articulation et calculer où va l'effecteur.",
          },
          {
            label: "Mathématiques : trigonométrie",
            value:
              "La cinématique des bras est de la trigonométrie systématisée : sans elle, pas de cinématique directe ni inverse.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. La mécanique est le point de rencontre de la physique (les efforts) et des maths (la géométrie) — les deux sont indispensables, aucun n'est optionnel.",
      },
    ],
  },
  {
    id: "outillage-cao",
    title: "Outillage : CAO et fabrication",
    level: 2,
    intro:
      "Le bureau d'étude du roboticien : modéliser en 3D, fabriquer vite.",
    blocks: [
      {
        kind: "fields",
        title: "Les outils",
        fields: [
          {
            label: "CAO paramétrique (ex. Fusion 360)",
            value:
              "Modéliser les pièces en 3D : esquisses cotées, extrusions, assemblages avec contraintes. Le paramétrique permet de modifier une cote et de voir tout se mettre à jour.",
          },
          {
            label: "Impression 3D (FDM)",
            value:
              "Fabriquer des pièces sur mesure en quelques heures : idéale pour prototyper. Limites : anisotropie (fragile entre les couches) et précision (~0,1–0,2 mm).",
          },
          {
            label: "Instruments de mesure",
            value:
              "Pied à coulisse (0,05 mm), équerre, comparateur : mesurer ce qu'on a fabriqué — la pièce réelle n'est jamais exactement le modèle CAO.",
          },
          {
            label: "Outillage d'atelier",
            value:
              "Perceuse, tarauds, visserie standard, inserts filetés pour plastique : assembler proprement et démontablement.",
          },
        ],
      },
      {
        kind: "text",
        text: "Principe : la CAO n'est pas du dessin — c'est un modèle qui porte les cotes, les tolérances et les contraintes d'assemblage. Un modèle CAO sans cotes fonctionnelles est une image, pas un plan.",
      },
    ],
  },
  {
    id: "concept-cao",
    title: "CAO : modéliser en paramétrique",
    level: 2,
    intro:
      "Esquisses, contraintes, assemblages : la méthode de modélisation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Esquisse contrainte : dessiner en 2D avec des cotes et des relations (parallèle, concentrique) — l'esquisse doit être entièrement contrainte (aucun degré de liberté bleu).",
          "Fonctions : extrusion, révolution, perçage, congé — construire le volume à partir de l'esquisse, dans un ordre logique (grosses formes d'abord, détails ensuite).",
          "Paramètres nommés : `longueur_bras = 150 mm` plutôt que des nombres magiques — changer une cote met à jour tout le modèle.",
          "Assemblage : contraindre les pièces entre elles (coïncidence, concentricité) comme dans la réalité — l'assemblage CAO révèle les interférences avant la fabrication.",
          "Mise en plan : les cotes fonctionnelles (celles qui garantissent l'assemblage) avec leurs tolérances — c'est le document de fabrication.",
        ],
      },
    ],
  },
  {
    id: "concept-cinematique",
    title: "Cinématique : directe et inverse",
    level: 2,
    intro:
      "Relier les angles des articulations à la position de l'effecteur — dans les deux sens.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux problèmes",
        fields: [
          {
            label: "Cinématique directe",
            value:
              "Angles articulaires → position de l'effecteur : toujours soluble, par composition des transformations (matrices homogènes chaînées). Sert à simuler et à vérifier.",
          },
          {
            label: "Cinématique inverse",
            value:
              "Position désirée → angles articulaires : le problème du contrôle — « quels angles pour mettre la pince ici ? ». Solutions multiples, parfois aucune (hors d'atteinte), parfois infinies (redondance).",
          },
          {
            label: "Espace de travail",
            value:
              "L'ensemble des positions atteignables : il se calcule (ou se simule) et conditionne le dimensionnement — un bras trop court pour sa tâche est un échec de conception.",
          },
        ],
      },
      {
        kind: "text",
        text: "Exemple concret : un bras 2D à deux segments de longueurs `L1`, `L2` avec des angles `θ1`, `θ2`. Position de l'effecteur : `x = L1·cos(θ1) + L2·cos(θ1+θ2)`, `y = L1·sin(θ1) + L2·sin(θ1+θ2)`. L'inverse se résout par la loi des cosinus — c'est de la trigonométrie, pas de la magie.",
      },
    ],
  },
  {
    id: "concept-impression-3d",
    title: "Impression 3D : fabriquer vite",
    level: 2,
    intro:
      "La machine-outil du prototypage : forces, orientations et limites.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "Anisotropie",
            value:
              "La pièce est solide dans le plan des couches, fragile entre les couches : orienter la pièce pour que les efforts principaux suivent les couches, jamais à travers.",
          },
          {
            label: "Orientation et supports",
            value:
              "Les surplombs > ~45° nécessitent des supports (à retirer ensuite) : orienter pour minimiser les surplombs et les surfaces d'appui visibles.",
          },
          {
            label: "Remplissage",
            value:
              "20–30 % suffisent pour la plupart des pièces ; augmenter les périmètres (coques) plutôt que le remplissage pour la rigidité.",
          },
          {
            label: "Précision réelle",
            value:
              "±0,1–0,2 mm en FDM : prévoir des jeux d'assemblage en conséquence — un alésage modélisé à 8,0 mm sort à ~7,8 mm et l'axe ne rentre pas.",
          },
          {
            label: "Inserts filetés",
            value:
              "Visser directement dans le plastique s'use vite : les inserts laiton (posés à chaud) donnent un filetage métal durable et démontable.",
          },
        ],
      },
    ],
  },
  {
    id: "concept-materiaux",
    title: "Matériaux : choisir selon l'usage",
    level: 2,
    intro:
      "PLA, PETG, aluminium : le bon matériau au bon endroit.",
    blocks: [
      {
        kind: "table",
        headers: ["Matériau", "Forces", "Faiblesses", "Usage robotique"],
        rows: [
          ["PLA", "Facile à imprimer, rigide", "Cassant, craint la chaleur (> 50 °C)", "Prototypes, pièces non sollicitées"],
          ["PETG", "Résistant, un peu souple", "Plus délicat à imprimer", "Pièces fonctionnelles, extérieur"],
          ["ABS/ASA", "Résistant, tient la chaleur", "Émissions, décollement", "Pièces chaudes (près des moteurs)"],
          ["Aluminium", "Rigide, usinable, léger", "Usinage requis, coût", "Châssis, supports moteurs"],
          ["Acier", "Très résistant", "Lourd", "Axes, visserie, pièces d'usure"],
        ],
      },
      {
        kind: "text",
        text: "Règle de choix : rigidité par unité de masse pour les bras (l'inertie tue la dynamique), résistance à l'usure pour les contacts, facilité de fabrication pour les prototypes. Et toujours : le matériau le plus simple qui fait le travail.",
      },
    ],
  },
  {
    id: "concept-tolerances",
    title: "Tolérances : le jeu qui fait marcher",
    level: 2,
    intro:
      "Aucune pièce n'est parfaite : spécifier l'écart acceptable.",
    blocks: [
      {
        kind: "text",
        text: "Une cote de 20 mm sortira à 19,9 ou 20,1 mm selon le procédé. La tolérance dit ce qui est acceptable : `20 ± 0,1 mm`. Pour un assemblage, on raisonne en ajustements : jeu (l'axe tourne librement), serré (l'axe est fretté), incertain (ça dépend des pièces réelles).",
      },
      {
        kind: "list",
        items: [
          "Règle pratique en impression 3D : prévoir 0,2–0,3 mm de jeu radial pour un emboîtement libre, 0,1 mm pour un léger serrage.",
          "Tolérancer uniquement les cotes fonctionnelles (celles qui garantissent l'assemblage ou le mouvement) : tout tolérancer coûte cher et ne sert à rien.",
          "Chaîne de cotes : les jeux s'additionnent sur un assemblage — 5 pièces à ±0,1 mm peuvent donner ±0,5 mm au bout : vérifier le cumul.",
          "Mesurer après fabrication : le pied à coulisse valide que les cotes critiques sont dans la tolérance avant l'assemblage.",
        ],
      },
    ],
  },
  {
    id: "premier-bras",
    title: "Premier projet : support de servo articulé",
    level: 2,
    intro:
      "Concevoir, imprimer et assembler une articulation : le cycle complet en miniature.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Modéliser le support",
            detail:
              "En CAO : un support qui tient le servo (trous de fixation aux bonnes cotes, mesurées au pied à coulisse sur le servo réel) + un bras de levier qui s'emmanche sur le palonnier.",
          },
          {
            title: "Prévoir les jeux",
            detail:
              "Emboîtements : +0,2 mm de jeu sur les diamètres ; fixation : inserts filetés ou écrous prisonniers plutôt que vis directes dans le plastique.",
          },
          {
            title: "Imprimer orienté",
            detail:
              "Orienter pour que les efforts (flexion du bras) suivent les couches ; 3–4 périmètres ; supports uniquement où nécessaire.",
          },
          {
            title: "Assembler et tester",
            detail:
              "Monter, vérifier l'absence de jeu parasite et de point dur sur toute la course, mesurer la course angulaire réelle. Noter les écarts pour la v2.",
          },
        ],
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Flux professionnel : du besoin à la pièce",
    level: 2,
    intro:
      "La méthode de bureau d'études : spécifier, modéliser, valider, fabriquer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cahier des charges",
            detail:
              "Charges, courses, vitesses, précision, masse, environnement, budget : chiffré et écrit. Tout dimensionnement part d'ici.",
          },
          {
            title: "Pré-dimensionnement",
            detail:
              "Calculs d'ordre de grandeur (couples, sections, jeux) avant la CAO : vérifier que le concept tient la route avec des formules simples.",
          },
          {
            title: "CAO détaillée",
            detail:
              "Modèle paramétrique complet, assemblage avec contraintes, vérification des interférences et des courses sur toute l'amplitude.",
          },
          {
            title: "Prototype et essais",
            detail:
              "Fabriquer (impression 3D), assembler, mesurer : jeu, répétabilité, tenue en charge. Confronter aux calculs.",
          },
          {
            title: "Itérer",
            detail:
              "Corriger le modèle à partir des mesures réelles : la v2 intègre les jeux réels, les renforts là où ça fléchit, les allègements là où c'est surdimensionné.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-mecanique",
    title: "Déboguer : jeu, vibrations, usure",
    level: 2,
    intro:
      "Diagnostiquer un mécanisme qui ne se comporte pas comme prévu.",
    blocks: [
      {
        kind: "fields",
        title: "Symptômes et causes",
        fields: [
          {
            label: "Jeu excessif",
            value:
              "L'effecteur « flotte » : usure des liaisons, vis desserrées, emboîtements trop lâches. Mesurer le jeu à l'effecteur et remonter la chaîne pour trouver la liaison fautive.",
          },
          {
            label: "Point dur",
            value:
              "Résistance à un endroit de la course : désalignement, pièce voilée, corps étranger. Démonter par sous-ensembles pour isoler.",
          },
          {
            label: "Vibrations",
            value:
              "Déséquilibre, résonance (vitesse critique), jeu qui s'amplifie : changer la vitesse pour voir si ça disparaît (résonance) ou persiste (déséquilibre).",
          },
          {
            label: "Usure rapide",
            value:
              "Frottement mal géré : lubrification absente, matériaux incompatibles, charges sous-estimées. L'usure normale est lente et régulière ; l'usure rapide signale une erreur de conception.",
          },
          {
            label: "Dérive de précision",
            value:
              "Ça marchait et ça ne marche plus : visserie qui se desserre (frein filet), température (dilatation), fatigue — mesurer avant de régler le logiciel.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-mecanique",
    title: "Tester : mesurer la mécanique",
    level: 2,
    intro:
      "Répétabilité, jeu, charge max : les trois mesures qui qualifient un mécanisme.",
    blocks: [
      {
        kind: "fields",
        title: "Les mesures",
        fields: [
          {
            label: "Répétabilité",
            value:
              "Aller-retour 10 fois vers la même consigne, mesurer la dispersion à l'effecteur (comparateur ou règle) : c'est la précision réelle du mécanisme, logiciel compris.",
          },
          {
            label: "Jeu",
            value:
              "Pousser l'effecteur à la main dans chaque direction et mesurer le débattement : le jeu total borne la précision atteignable.",
          },
          {
            label: "Charge max",
            value:
              "Charger progressivement jusqu'au glissement, à la flexion excessive ou au décrochage moteur : connaître la vraie limite, pas la théorique.",
          },
        ],
      },
      {
        kind: "text",
        text: "Mesurer avant d'optimiser : un mécanisme dont on ne connaît ni le jeu ni la répétabilité ne peut pas être amélioré rationnellement — on ne sait pas ce qu'on améliore.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les classiques de la conception mécanique débutante.",
    blocks: [
      {
        kind: "list",
        items: [
          "Oublier les jeux d'assemblage : modéliser un axe à 8,0 mm dans un alésage à 8,0 mm — ça ne rentre pas, ou ça coince.",
          "Imprimer dans le mauvais sens : efforts à travers les couches = pièce qui casse au premier effort sérieux.",
          "Sous-dimensionner les moteurs : calculer le couple à vide et oublier la charge, les frottements et les accélérations — le moteur décroche en charge.",
          "Visser dans le plastique sans insert : le filetage s'arrache au troisième démontage.",
          "Ignorer la masse : chaque gramme sur un bras augmente l'inertie et exige plus de couple — alléger est un dimensionnement.",
          "Pas de butées mécaniques : compter uniquement sur le logiciel pour limiter la course — le jour où le logiciel bug, la mécanique casse.",
          "Sur-contraindre un assemblage : trop de vis, trop de contraintes — l'assemblage se monte en force et se déforme.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "statique",
    title: "Statique : l'équilibre des forces",
    level: 3,
    intro:
      "Somme des forces nulle, somme des moments nulle : vérifier qu'une structure tient.",
    blocks: [
      {
        kind: "text",
        text: "À l'équilibre : `ΣF = 0` (les forces se compensent) et `ΣM = 0` (les moments se compensent). Exemple : un bras horizontal de 0,3 m tenant 2 kg à son extrémité exerce sur son articulation un moment `M = m·g·d = 2 × 9,81 × 0,3 ≈ 5,9 N·m` — le servo doit fournir au moins ce couple en statique, avant même de parler d'accélération.",
      },
      {
        kind: "list",
        items: [
          "Isoler le système (schéma du corps libre) : lister toutes les forces extérieures avant d'écrire la moindre équation.",
          "Le moment dépend du bras de levier : doubler la longueur du bras double le couple requis — d'où l'intérêt des bras courts et des masses proches de l'axe.",
          "Toujours dimensionner au pire cas (charge max, bras max, inclinaison défavorable), pas au cas nominal.",
        ],
      },
    ],
  },
  {
    id: "cinematique-directe-detail",
    title: "Cinématique directe : matrices homogènes",
    level: 3,
    intro:
      "Composer les transformations : la méthode systématique.",
    blocks: [
      {
        kind: "text",
        text: "Chaque articulation est une transformation (rotation + translation) représentée par une matrice homogène 4×4. La pose de l'effecteur est le produit des matrices de la base à l'effecteur : `T = T1·T2·…·Tn`. Cette composition gère tous les cas — prismatiques, rotoïdes, chaînes quelconques — sans trigonométrie ad hoc.",
      },
      {
        kind: "list",
        items: [
          "Convention de Denavit-Hartenberg : un paramétrage standard (4 paramètres par articulation) qui rend la modélisation systématique et partageable.",
          "En pratique : les bibliothèques (et URDF sous ROS) calculent ces produits — mais comprendre la composition permet de déboguer quand « l'effecteur n'est pas où il devrait ».",
          "Vérification : tester la cinématique directe sur des configurations simples (bras tendu, replié) où la réponse est évidente.",
        ],
      },
    ],
  },
  {
    id: "cinematique-inverse-detail",
    title: "Cinématique inverse : méthodes",
    level: 3,
    intro:
      "De la pose désirée aux angles : analytique, numérique, et leurs pièges.",
    blocks: [
      {
        kind: "fields",
        title: "Les approches",
        fields: [
          {
            label: "Analytique",
            value:
              "Formules fermées (loi des cosinus pour 2D, découplage pour 6 axes à poignet sphérique) : rapide, exacte, mais à dériver par robot — pas de méthode universelle.",
          },
          {
            label: "Numérique (Jacobienne)",
            value:
              "Itérer : `Δθ = J⁻¹·Δx` (ou pseudo-inverse) jusqu'à convergence. Universelle, mais itérative (coût CPU) et sensible aux singularités et au point de départ.",
          },
          {
            label: "Solutions multiples",
            value:
              "« Coude haut » vs « coude bas » : choisir la solution la plus proche de la configuration actuelle pour éviter les grands mouvements inutiles.",
          },
          {
            label: "Hors d'atteinte",
            value:
              "Aucune solution si la cible est hors de l'espace de travail : le détecter proprement (pas de convergence) plutôt que de diverger.",
          },
        ],
      },
    ],
  },
  {
    id: "jacobienne-singularites",
    title: "Jacobienne et singularités",
    level: 3,
    intro:
      "La matrice qui relie vitesses articulaires et vitesse de l'effecteur — et ses points faibles.",
    blocks: [
      {
        kind: "text",
        text: "La jacobienne `J` vérifie `v = J·q̇` (vitesse de l'effecteur en fonction des vitesses articulaires). En singularité, `J` perd son rang : certaines directions deviennent impossibles, et de petites vitesses désirées exigeraient des vitesses articulaires infinies — en pratique, le robot « bloque » ou part en vrille.",
      },
      {
        kind: "list",
        items: [
          "Singularités typiques : bras complètement tendu ou replié, alignement d'axes — les connaître pour les éviter dans les trajectoires.",
          "Indicateur : le déterminant (ou le nombre de conditionnement) de `J` — le surveiller en planification pour rester loin des singularités.",
          "Contournement : amortir l'inversion (damped least squares) près des singularités, ou planifier des trajectoires qui les évitent.",
        ],
      },
    ],
  },
  {
    id: "dynamique-lagrange",
    title: "Dynamique : l'équation du mouvement",
    level: 3,
    intro:
      "De la géométrie aux efforts : ce qu'il faut comme couple pour bouger.",
    blocks: [
      {
        kind: "text",
        text: "La dynamique relie couples articulaires et mouvement : `τ = M(q)·q̈ + C(q,q̇)·q̇ + G(q)` — inertie, Coriolis/centrifuge, gravité. C'est elle qui dit quel couple fournir pour une accélération donnée, et qui sert au feedforward (compenser la gravité) et à la simulation.",
      },
      {
        kind: "list",
        items: [
          "En pratique : les bibliothèques de dynamique (et Gazebo) calculent ces termes — l'ingénieur doit comprendre leur sens, pas les dériver à la main.",
          "Ordre de grandeur : pour un dimensionnement, `τ ≈ J·α` (inertie × accélération angulaire) + couple gravitaire suffit souvent.",
          "La gravité domine à basse vitesse, l'inertie à haute accélération : deux régimes, deux dimensionnements.",
        ],
      },
    ],
  },
  {
    id: "frottement",
    title: "Frottement : le modéliser",
    level: 3,
    intro:
      "Coulomb, visqueux, statique : le frottement n'est pas un détail.",
    blocks: [
      {
        kind: "text",
        text: "Modèle simple : `F = μ·N` (Coulomb, indépendant de la vitesse) + `F = b·v` (visqueux, proportionnel à la vitesse). Le frottement statique (décollage) dépasse le dynamique : d'où la zone morte au démarrage que l'intégrale du PID doit vaincre. Exemple : pousser 5 kg sur un sol à `μ = 0,3` demande `F = 0,3 × 5 × 9,81 ≈ 14,7 N` en continu.",
      },
      {
        kind: "list",
        items: [
          "Le frottement dissipe de l'énergie en chaleur et use : le réduire (roulements, lubrification) est un gain direct d'autonomie et de durée de vie.",
          "En simulation : ne jamais le négliger — un modèle sans frottement prédit des performances irréalistes.",
          "Stick-slip : l'alternance adhérence/glissement crée des vibrations à basse vitesse — le fléau des mouvements lents précis.",
        ],
      },
    ],
  },
  {
    id: "engrenages",
    title: "Engrenages : rapport et couple",
    level: 3,
    intro:
      "Échanger vitesse contre couple : le calcul du rapport.",
    blocks: [
      {
        kind: "text",
        text: "Rapport `i = N_sortie / N_entrée = ω_entrée / ω_sortie`. Le couple est multiplié (au rendement près) : `C_sortie = C_entrée × i × η`. Exemple réel : moteur 0,1 N·m à 6000 tr/min, réducteur 50:1 à `η = 0,7` → `C = 0,1 × 50 × 0,7 = 3,5 N·m` à 120 tr/min. On a échangé de la vitesse contre du couple.",
      },
      {
        kind: "fields",
        title: "Points de vigilance",
        fields: [
          {
            label: "Jeu (backlash)",
            value:
              "Le jeu entre dents crée un angle mort au changement de sens : catastrophique pour la précision — réducteurs à faible jeu (harmoniques, cycloïdaux) pour les axes précis.",
          },
          {
            label: "Rendement",
            value:
              "Chaque étage perd 2–10 % (plus pour les vis sans fin, parfois < 50 %) : sur plusieurs étages, le rendement s'effondre — le calculer, pas le supposer.",
          },
          {
            label: "Irréversibilité",
            value:
              "Certains réducteurs (vis sans fin à fort rapport) ne sont pas réversibles : le moteur entraîne la sortie, mais pas l'inverse — à savoir avant de compter sur la « poussabilité ».",
          },
        ],
      },
    ],
  },
  {
    id: "transmissions",
    title: "Courroies, chaînes, vis-écrou",
    level: 3,
    intro:
      "Transmettre loin, transformer rotation en translation : les alternatives aux engrenages.",
    blocks: [
      {
        kind: "fields",
        title: "Les transmissions",
        fields: [
          {
            label: "Courroies crantées",
            value:
              "Silencieuses, sans jeu (crantées), légères : idéales pour déporter un moteur loin de l'axe. Tension correcte indispensable — trop molle ça saute, trop tendue ça use les roulements.",
          },
          {
            label: "Chaînes",
            value:
              "Robustes, pour fortes puissances (robots mobiles lourds) : bruyantes, nécessitent lubrification et tension.",
          },
          {
            label: "Vis-écrou / vis à billes",
            value:
              "Rotation → translation précise : `déplacement = pas × tours`. La vis à billes a un excellent rendement (~90 %) et une grande précision — le standard des axes linéaires précis.",
          },
          {
            label: "Câbles (tendons)",
            value:
              "Légers, déportent l'actionnement (mains robotiques) : gestion du mou et de l'usure délicate.",
          },
        ],
      },
    ],
  },
  {
    id: "roulements",
    title: "Roulements et guidages",
    level: 3,
    intro:
      "Guider en rotation et en translation avec un minimum de frottement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Roulements à billes : le standard des liaisons pivot — choisir selon charges radiale/axiale et vitesse ; un roulement sous-dimensionné prend du jeu en quelques heures.",
          "Montage : un roulement se monte serré sur l'arbre ou dans le logement, jamais les deux (dilatation) — la bague tournante est montée serrée.",
          "Guidages linéaires (rails + patins) : pour les translations précises — rigides, mais exigent un parallélisme de montage soigné.",
          "Paliers lisses (bronze, PTFE) : simples et bon marché pour vitesses faibles et charges modérées — avec lubrification adaptée.",
          "Jeu radial : même un bon roulement a un jeu de quelques microns — le cumul sur plusieurs liaisons fait le jeu à l'effecteur.",
        ],
      },
    ],
  },
  {
    id: "choix-moteurs",
    title: "Choisir un moteur : la méthode",
    level: 3,
    intro:
      "Du besoin au moteur : couple, vitesse, inertie — dans cet ordre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Calculer le couple requis",
            detail:
              "Statique (gravité : `m·g·d`) + dynamique (`J·α`) + frottements, au pire cas. Exemple : bras de 0,4 m, 3 kg en bout, accélération 2 rad/s², inertie ~0,5 kg·m² → `C_grav ≈ 11,8 N·m`, `C_dyn ≈ 1 N·m` → ~13 N·m + marge.",
          },
          {
            title: "Définir la vitesse",
            detail:
              "Vitesse max de l'application (rad/s ou tr/min) : elle fixe, avec le couple, la puissance mécanique `P = C·ω`.",
          },
          {
            title: "Choisir le type",
            detail:
              "DC + réducteur (simple, couple), pas-à-pas (positionnement sans capteur, lent), brushless (performant, contrôle complexe), servo (intégré, simple) — selon précision, vitesse et budget.",
          },
          {
            title: "Vérifier l'inertie",
            detail:
              "L'inertie du rotor ramenée à la charge doit rester du même ordre que l'inertie de la charge — un trop gros réducteur rend le système mou et lent à répondre.",
          },
          {
            title: "Valider thermiquement",
            detail:
              "Le moteur tient-il son couple en continu sans surchauffer ? Le couple nominal (continu) n'est pas le couple max (crête, quelques secondes).",
          },
        ],
      },
    ],
  },
  {
    id: "servomoteurs",
    title: "Servomoteurs de modélisme",
    level: 3,
    intro:
      "Le moteur + réducteur + électronique en un boîtier : simple mais limité.",
    blocks: [
      {
        kind: "text",
        text: "Un servo de modélisme intègre moteur DC, réducteur, potentiomètre et électronique d'asservissement : on lui envoie une impulsion de 1 à 2 ms à 50 Hz, et il va à l'angle correspondant (typiquement 0–180°). Simple à utiliser, idéal pour pinces et petites articulations.",
      },
      {
        kind: "list",
        items: [
          "Limites : couple modeste, précision limitée par le potentiomètre, pas de retour de position vers le contrôleur (commande en boucle ouverte vue du système).",
          "Alimentation : les servos appellent des pointes de courant — les alimenter par un rail 5–6 V dédié, jamais par le régulateur du microcontrôleur.",
          "Couple réel < couple annoncé : les specs sont souvent optimistes — mesurer ou prévoir une marge.",
        ],
      },
    ],
  },
  {
    id: "moteurs-pas-a-pas",
    title: "Moteurs pas-à-pas",
    level: 3,
    intro:
      "Avancer par pas comptés : la position sans capteur — avec ses limites.",
    blocks: [
      {
        kind: "text",
        text: "Un pas-à-pas avance d'un angle fixe par impulsion (typiquement 1,8° → 200 pas/tour) ; le micro-pas subdivise (jusqu'à 16–256 micro-pas). En comptant les impulsions, on connaît la position sans capteur — tant que le moteur ne « perd pas de pas » sous une charge trop forte.",
      },
      {
        kind: "list",
        items: [
          "Avantage : positionnement simple en boucle ouverte, excellent couple à l'arrêt (maintien sans frein).",
          "Limite : perte de pas silencieuse en surcharge — pour du critique, ajouter un codeur (boucle fermée) ou surdimensionner.",
          "Vitesse limitée : le couple chute avec la vitesse — vérifier la courbe couple/vitesse, pas juste le couple de maintien.",
          "Chauffe : consomme son courant nominal même à l'arrêt — prévoir la dissipation et réduire le courant au repos si possible.",
        ],
      },
    ],
  },
  {
    id: "moteurs-dc-codeurs",
    title: "Moteurs DC + codeurs",
    level: 3,
    intro:
      "Vitesse et position en boucle fermée : la brique des robots mobiles.",
    blocks: [
      {
        kind: "text",
        text: "Un moteur DC avec codeur incrémental (ou absolu) donne la vitesse et la position : la base de l'odométrie des robots mobiles et des axes asservis. Le codeur se lit par interruption (ou compteur matériel) : à haute vitesse, le nombre d'impulsions par seconde impose un traitement rapide.",
      },
      {
        kind: "list",
        items: [
          "Résolution : impulsions/tour × rapport de réduction = précision — vérifier qu'elle suffit pour l'application (ex. 0,1 mm sur une roue de 10 cm).",
          "Codeur incrémental : donne un déplacement relatif — il faut une prise d'origine (homing) au démarrage ; l'absolu donne la position directement, même après coupure.",
          "Odométrie : intégrer les vitesses des roues pour estimer la pose — elle dérive (glissement) et doit être recalée par d'autres capteurs (voir perception/SLAM).",
        ],
      },
    ],
  },
  {
    id: "resistance-materiaux",
    title: "Résistance des matériaux : l'essentiel",
    level: 3,
    intro:
      "Contrainte, section, flexion : vérifier qu'une pièce tient.",
    blocks: [
      {
        kind: "text",
        text: "Contrainte normale : `σ = F / A` (force / section). Une pièce tient si `σ` reste sous la limite élastique du matériau divisée par un coefficient de sécurité (2–3 en robotique amateur, plus en pro). Exemple : tige de 10 mm² en traction sous 500 N → `σ = 50 MPa` — OK pour de l'acier (250 MPa), limite pour du PLA (~50 MPa).",
      },
      {
        kind: "list",
        items: [
          "Flexion : une poutre fléchit d'autant plus qu'elle est longue et fine — la flèche varie en `L³` : doubler la longueur multiplie la flexion par 8.",
          "Rigidité vs résistance : une pièce peut être assez résistante (ne casse pas) mais trop souple (fléchit et fausse la précision) — vérifier les deux.",
          "Concentration de contrainte : les angles vifs et les trous concentrent les efforts — congés et renforts aux endroits critiques.",
          "Fatigue : une pièce qui tient une fois peut casser après 10 000 cycles — pour les pièces très sollicitées, dimensionner en fatigue, pas en statique.",
        ],
      },
    ],
  },
  {
    id: "vibrations",
    title: "Vibrations et résonance",
    level: 3,
    intro:
      "Tout système a une fréquence propre : ne pas l'exciter.",
    blocks: [
      {
        kind: "text",
        text: "Une structure élastique + une masse = un oscillateur de fréquence propre `f ≈ (1/2π)·√(k/m)` (raideur/masse). Si une excitation (moteur, pas-à-pas, balourd) coïncide avec cette fréquence, l'amplitude explose : c'est la résonance.",
      },
      {
        kind: "list",
        items: [
          "Diagnostic : la vibration apparaît/disparaît à certaines vitesses → résonance ; présente à toutes vitesses → déséquilibre ou défaut.",
          "Remèdes : rigidifier (augmente f), ajouter de la masse (baisse f), amortir (élastomères, frotteurs), ou éviter la plage de vitesses critique.",
          "En conception : estimer la première fréquence propre et la placer loin des fréquences d'excitation (moteurs, pas).",
        ],
      },
    ],
  },
  {
    id: "equilibrage",
    title: "Équilibrage et centre de gravité",
    level: 3,
    intro:
      "Un robot stable ne bascule pas : placer les masses intelligemment.",
    blocks: [
      {
        kind: "list",
        items: [
          "Centre de gravité bas et centré : batteries et composants lourds en bas, au centre — chaque centimètre gagné en hauteur de CdG est de la stabilité perdue.",
          "Polygone de sustentation : pour un robot à roues/pattes, le CdG projeté au sol doit rester dans le polygone des appuis — avec une marge pour les accélérations.",
          "Équilibrage dynamique : les pièces tournantes (hélices, roues) déséquilibrées vibrent — équilibrer ou choisir des pièces équilibrées.",
          "Contrepoids : parfois plus simple d'ajouter une masse basse que de tout reconcevoir — mais c'est de la masse transportée, donc un coût énergétique.",
        ],
      },
    ],
  },
  {
    id: "prehenseurs",
    title: "Préhenseurs : tenir sans écraser",
    level: 3,
    intro:
      "La pince : force de serrage, forme des doigts, compliance.",
    blocks: [
      {
        kind: "text",
        text: "Tenir un objet exige `F_serrage > m·g·(sécurité) / (2·μ)` (deux doigts, frottement μ) : pour 0,5 kg, `μ = 0,4`, sécurité 2 → `F > 0,5×9,81×2/(2×0,4) ≈ 12 N` par doigt. Trop peu ça glisse, trop ça écrase — d'où l'intérêt des doigts compliants et des revêtements adhérents (qui augmentent μ).",
      },
      {
        kind: "list",
        items: [
          "Forme des doigts : épouser l'objet (doigts en V pour cylindres) vaut mieux que serrer plus fort.",
          "Compliance : des doigts souples s'adaptent aux formes irrégulières sans contrôle d'effort complexe.",
          "Ventouses : pour objets lisses et légers — simples et efficaces, mais exigent une surface compatible.",
          "Capteur d'effort : pour les objets fragiles, mesurer plutôt que deviner — le contrôle en effort (voir skill Contrôle) fait la différence.",
        ],
      },
    ],
  },
  {
    id: "guidages-lineaires-detail",
    title: "Transmissions de précision",
    level: 3,
    intro:
      "Vis à billes, réducteurs harmoniques : quand la précision l'exige.",
    blocks: [
      {
        kind: "fields",
        title: "Les solutions haute précision",
        fields: [
          {
            label: "Vis à billes",
            value:
              "Rendement ~90 %, jeu quasi nul (précharge), précision au centième : le standard des axes linéaires précis (CNC). Exige un guidage linéaire parallèle et une protection contre les copeaux/poussières.",
          },
          {
            label: "Réducteur harmonic (strain wave)",
            value:
              "Rapport élevé (50–160:1) en un étage, jeu quasi nul, compact : le choix des bras collaboratifs et humanoïdes. Coûteux, mais inégalé en compacité/précision.",
          },
          {
            label: "Réducteur cycloïdal",
            value:
              "Fort couple, jeu faible, robuste aux chocs : alternative pour les axes très chargés.",
          },
        ],
      },
    ],
  },
  {
    id: "cao-avancee",
    title: "CAO avancée : assemblages et simulation",
    level: 3,
    intro:
      "Au-delà de la pièce : contraindre, animer, simuler.",
    blocks: [
      {
        kind: "list",
        items: [
          "Assemblages contraints réalistes : chaque liaison CAO reflète la liaison réelle (pivot, glissière) — on peut alors animer le mécanisme et vérifier courses et interférences.",
          "Détection d'interférences : lancer la vérification sur tout l'assemblage dans toutes les positions — une collision détectée en CAO coûte zéro, en réel elle casse.",
          "Simulation par éléments finis (bases) : mailler une pièce, appliquer les efforts, lire contrainte et déformation — valider le dimensionnement avant de fabriquer.",
          "Mise en plan complète : chaque pièce a son plan avec cotes fonctionnelles tolérancées, états de surface si besoin — le plan est le contrat avec l'atelier.",
          "Gestion des versions : nommer et archiver les versions du modèle — retrouver « la version qui marchait » doit être immédiat.",
        ],
      },
    ],
  },
  {
    id: "usinage",
    title: "Usinage : quand l'impression 3D ne suffit plus",
    level: 3,
    intro:
      "Précision et matériaux nobles : les bases de l'usinage.",
    blocks: [
      {
        kind: "list",
        items: [
          "Quand usiner : pièces précises (±0,02 mm atteignable), aluminium/acier, séries — quand la FDM montre ses limites.",
          "Tolérances atteignables : le tournage/fraisage courant tient ±0,05 mm sans surcoût ; en dessous, le prix grimpe — ne tolérancer serré que le fonctionnel.",
          "Conception pour l'usinage : éviter les poches profondes étroites, prévoir les rayons d'outil (une fraise ne fait pas d'angle vif intérieur), brider correctement.",
          "Percer-tarauder : les opérations les plus courantes — percer au bon diamètre avant taraudage (tables standard), tarauder droit avec lubrifiant.",
          "Finition : l'état de surface compte pour les portées de roulements et les glissières — spécifier si fonctionnel.",
        ],
      },
    ],
  },
  {
    id: "assemblages",
    title: "Assemblages : visser, coller, emmancher",
    level: 3,
    intro:
      "Tenir ensemble : les techniques et leurs règles.",
    blocks: [
      {
        kind: "fields",
        title: "Les techniques",
        fields: [
          {
            label: "Visserie",
            value:
              "Le standard démontable : vis + écrou ou vis + trou taraudé ; rondelles pour répartir ; frein filet (moyen) contre le desserrage par vibrations — indispensable sur robot mobile.",
          },
          {
            label: "Inserts filetés",
            value:
              "Pour le plastique imprimé : insert laiton posé à chaud — filetage métal durable là où la vis directe s'arracherait.",
          },
          {
            label: "Collage",
            value:
              "Époxy pour les assemblages définitifs multi-matériaux : préparer les surfaces (dégraisser, poncer), respecter le temps de polymérisation.",
          },
          {
            label: "Emmanchements",
            value:
              "Axe serré dans alésage (fretté) : indémontable sans presse — pour les liaisons permanentes précises (pignons sur arbres).",
          },
        ],
      },
    ],
  },
  {
    id: "chaines-cinematiques",
    title: "Chaînes cinématiques : choisir l'architecture",
    level: 3,
    intro:
      "Sériel, parallèle, hybride : les compromis d'architecture.",
    blocks: [
      {
        kind: "table",
        headers: ["Architecture", "Forces", "Faiblesses"],
        rows: [
          ["Sérielle (bras 6 axes)", "Grand espace de travail, dexterité", "Erreurs cumulées, rigidité faible en bout"],
          ["Parallèle (delta)", "Rapidité, rigidité, précision", "Espace de travail réduit, calculs complexes"],
          ["Cartésienne", "Précision, rigidité, simplicité", "Encombrante, courses limitées par la structure"],
          ["Hybride", "Combine les avantages", "Complexité de conception et de contrôle"],
        ],
      },
      {
        kind: "text",
        text: "Le choix se fait sur la tâche : pick-and-place rapide → delta ; assemblage précis polyvalent → 6 axes ; usinage/impression → cartésien. L'architecture fige les compromis pour toute la vie du robot : c'est la décision de conception la plus structurante.",
      },
    ],
  },
  {
    id: "simulation-mecanique",
    title: "Simulation mécanique",
    level: 3,
    intro:
      "Valider virtuellement : éléments finis et dynamique multicorps.",
    blocks: [
      {
        kind: "list",
        items: [
          "Éléments finis (statique) : vérifier contrainte et déformation d'une pièce sous charge — maillage raffiné aux concentrations, conditions aux limites réalistes (encastrements).",
          "Dynamique multicorps : simuler le mécanisme complet (masses, inerties, liaisons) pour obtenir efforts, couples moteurs requis et comportement — avant de construire.",
          "Limites : la simulation vaut son modèle — conditions aux limites fausses = résultats faux avec des chiffres précis. Toujours confronter au réel.",
          "Usage pragmatique : valider les pièces critiques et le dimensionnement des actionneurs ; ne pas simuler ce qu'un calcul d'ordre de grandeur tranche.",
        ],
      },
    ],
  },
  {
    id: "maintenance-mecanique",
    title: "Maintenance mécanique",
    level: 3,
    intro:
      "Un mécanisme s'use : prévoir l'entretien dès la conception.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lubrification : graisser les liaisons selon le préconisé (type et fréquence) — la majorité des usures prématurées vient d'un défaut de lubrification.",
          "Points d'usure identifiés : courroies, paliers, vis à billes — les rendre accessibles et remplaçables sans démonter tout le robot.",
          "Serrage : contrôler périodiquement la visserie (vibrations = desserrage) — le frein filet retarde, ne supprime pas.",
          "Pièces d'usure en stock : courroies, roulements courants — une panne n'immobilise que si la pièce manque.",
        ],
      },
    ],
  },
  {
    id: "projets-mecanique",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets progressifs, du support au bras complet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Pince 2 doigts",
            detail:
              "CAO, impression 3D, servo : concevoir une pince qui saisit des objets de 20 à 60 mm. Mesurer la force de serrage et la répétabilité. Livrable : pièce fonctionnelle + mesures.",
          },
          {
            title: "Projet 2 — Bras 2 axes",
            detail:
              "Deux servos/moteurs, cinématique directe et inverse calculées, espace de travail tracé. Atteindre des points commandés avec < 5 mm d'erreur. Livrable : modèle CAO + calculs + démonstration.",
          },
          {
            title: "Projet 3 — Axe linéaire précis",
            detail:
              "Vis à billes ou courroie + guidage linéaire + moteur pas-à-pas : 200 mm de course, répétabilité < 0,1 mm mesurée au comparateur. Livrable : axe caractérisé avec son dossier de mesures.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-mecanique",
    title: "Ressources",
    level: 3,
    intro:
      "Aller plus loin, en commençant par les références établies.",
    blocks: [
      {
        kind: "fields",
        title: "Références à privilégier",
        fields: [
          {
            label: "Modern Robotics (Lynch & Park)",
            value:
              "Le livre de référence (Northwestern, gratuit en ligne) : cinématique, dynamique, planification — rigoureux et complet.",
          },
          {
            label: "Documentation des logiciels CAO",
            value:
              "Tutoriels officiels (ex. Autodesk Fusion) : modélisation paramétrique et assemblages — apprendre sur des cas guidés.",
          },
          {
            label: "Guides des fabricants",
            value:
              "Catalogues techniques (roulements, vis à billes, réducteurs) : abaques de dimensionnement et règles de montage — gratuits et directement applicables.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : chaque notion de cette page se valide par une pièce fabriquée et mesurée — la mécanique ne s'apprend pas sans copeaux (ou filament).",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "La mécanique maîtrisée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Asservir vos mécanismes : le contrôle (PID, espace d'état) donne la précision à vos axes.",
          "Électrifier : l'électronique (drivers, capteurs) anime la mécanique.",
          "Approfondir la physique : dynamique et énergétique pour des dimensionnements sûrs.",
          "Simuler sous ROS : décrire vos mécanismes en URDF et les animer dans Gazebo.",
          "Revenir à la roadmap : valider Mécanique et attaquer la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

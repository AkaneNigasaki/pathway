import type { LearningSection } from "../skill-guides";

/**
 * Learning Page d'Électronique : tension, courant, composants passifs et
 * actifs, lecture de schémas, signaux et alimentations. Aucune commande
 * terminal (pas de CLI sur ce sujet) et aucune référence de composant
 * précis : composants décrits par famille et par fonction.
 */
export const LEARNING_ELECTRONICS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est l'électronique et pourquoi le logiciel seul ne suffit pas.",
    blocks: [
      {
        kind: "text",
        text: "L'électronique est la compréhension du hardware : tension, courant, composants, lecture de schémas. Elle explique ce qui se passe physiquement dans la machine que le logiciel pilote.",
      },
      {
        kind: "text",
        text: "Pour la robotique et les systèmes embarqués, le logiciel seul ne suffit pas : il faut comprendre les capteurs, les alimentations et les signaux. L'électronique est le pont entre le code et le monde physique — entre l'idée et l'objet qui bouge, mesure, chauffe ou éclaire.",
      },
      {
        kind: "text",
        text: "Bonne nouvelle : les fondations tiennent en quelques lois et une poignée de composants. Le reste est de la pratique : câbler, mesurer, comprendre pourquoi ça ne marche pas, recommencer.",
      },
    ],
  },
  {
    id: "loi-d-ohm",
    title: "La loi d'Ohm",
    level: 1,
    intro: "La formule la plus importante de l'électronique.",
    blocks: [
      {
        kind: "diagram",
        title: "U = R × I",
        lines: [
          "        U (tension, en volts)",
          "        │",
          "  ──────┴──────",
          "  │  R × I    │",
          "  ────────────",
          "   R (résistance, en ohms)   I (courant, en ampères)",
          "",
          "  La tension aux bornes d'une résistance = sa résistance",
          "  multipliée par le courant qui la traverse.",
        ],
      },
      {
        kind: "fields",
        title: "Les trois grandeurs",
        fields: [
          {
            label: "Tension (U, volts)",
            value: "La « pression » électrique : la différence de potentiel qui pousse les charges à circuler. Une pile fournit une tension.",
          },
          {
            label: "Courant (I, ampères)",
            value: "Le débit de charges électriques qui circule dans le circuit. C'est lui qui fait le travail — et qui fait chauffer.",
          },
          {
            label: "Résistance (R, ohms)",
            value: "L'opposition au passage du courant. Elle limite le courant pour une tension donnée.",
          },
        ],
      },
      {
        kind: "text",
        text: "Exemple : une résistance de 220 Ω sous 5 V laisse passer `I = U / R = 5 / 220 ≈ 23 mA`. Ce calcul — dimensionner une résistance pour limiter un courant — est le geste le plus fréquent de l'électronicien débutant, par exemple pour protéger une LED.",
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
    intro: "Peu de théorie, un peu de matériel.",
    blocks: [
      {
        kind: "list",
        items: [
          "Mathématiques : les quatre opérations et la proportionnalité suffisent pour débuter ; les équations différentielles viendront avec les condensateurs et les bobines.",
          "Matériel minimal : une plaque d'essai (breadboard), des fils, des résistances, des LED, une alimentation 5 V et un multimètre.",
          "Aucun logiciel requis : l'électronique de base se pratique avec les mains. La simulation viendra en complément, pas en remplacement.",
          "État d'esprit : mesurer avant de supposer. Le multimètre est l'instrument n° 1, avant même le fer à souder.",
        ],
      },
    ],
  },
  {
    id: "tension-courant-resistance",
    title: "Tension, courant, résistance",
    level: 2,
    intro: "Les trois grandeurs en détail, avec leurs pièges.",
    blocks: [
      {
        kind: "diagram",
        title: "Analogie hydraulique (utile pour débuter, limitée ensuite)",
        lines: [
          "  Tension  ≈ pression de l'eau",
          "  Courant  ≈ débit d'eau",
          "  Résistance ≈ rétrécissement du tuyau",
          "",
          "  Plus de pression (tension) → plus de débit (courant).",
          "  Tuyau plus étroit (résistance) → moins de débit.",
          "",
          "  Limite de l'analogie : l'électricité ne « s'use » pas",
          "  comme l'eau, et les composants actifs n'ont pas",
          "  d'équivalent hydraulique simple.",
        ],
      },
      {
        kind: "table",
        headers: ["Grandeur", "Symbole", "Unité", "Se mesure"],
        rows: [
          ["Tension", "U (ou V)", "volt (V)", "En parallèle, aux bornes du composant"],
          ["Courant", "I", "ampère (A)", "En série, dans la branche du circuit"],
          ["Résistance", "R", "ohm (Ω)", "Hors tension, composant déconnecté"],
          ["Puissance", "P", "watt (W)", "Se calcule : `P = U × I`"],
        ],
      },
      {
        kind: "text",
        text: "Deux erreurs de mesure classiques : mesurer un courant comme une tension (en parallèle au lieu d'en série — court-circuit), et mesurer une résistance sous tension (résultat faux, risque pour l'appareil). Le multimètre a un mode par grandeur : choisir le bon avant de toucher le circuit.",
      },
    ],
  },
  {
    id: "resistances",
    title: "Les résistances",
    level: 2,
    intro: "Le composant le plus courant : limiter, diviser, protéger.",
    blocks: [
      {
        kind: "text",
        text: "Une résistance s'oppose au passage du courant et convertit l'énergie électrique en chaleur. Ses usages : limiter un courant (protéger une LED), diviser une tension (pont diviseur), fixer un potentiel (résistance de tirage).",
      },
      {
        kind: "fields",
        title: "Lire une résistance",
        fields: [
          {
            label: "Code couleur",
            value: "Des anneaux colorés indiquent la valeur et la tolérance. Chaque couleur vaut un chiffre ; l'ordre de lecture part de l'anneau le plus proche du bord.",
          },
          {
            label: "Valeur",
            value: "Exprimée en ohms, avec les multiples kΩ (1000 Ω) et MΩ (1 000 000 Ω). Les séries normalisées (E12, E24) définissent les valeurs disponibles dans le commerce.",
          },
          {
            label: "Puissance",
            value: "La puissance maximale dissipable sans surchauffe (`P = U × I`). Une résistance sous-dimensionnée chauffe, noircit, puis meurt.",
          },
          {
            label: "Tolérance",
            value: "L'écart possible entre la valeur nominale et la valeur réelle (souvent 5 % ou 1 %). Pour les mesures précises, on choisit 1 %.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "Le pont diviseur de tension",
        lines: [
          "       5 V",
          "        │",
          "       ┌┴┐",
          "       │ │ R1",
          "       └┬┘",
          "        │────────── sortie = 5 V × R2 / (R1 + R2)",
          "       ┌┴┐",
          "       │ │ R2",
          "       └┬┘",
          "        │",
          "       GND",
        ],
      },
      {
        kind: "text",
        text: "Le pont diviseur produit une tension intermédiaire à partir d'une tension plus élevée. Avec `R1 = R2`, la sortie vaut la moitié de l'entrée. Attention : il ne convient que pour des charges à très faible courant — sinon la charge perturbe le diviseur.",
      },
    ],
  },
  {
    id: "condensateurs",
    title: "Les condensateurs",
    level: 2,
    intro: "Stocker des charges, lisser, filtrer.",
    blocks: [
      {
        kind: "text",
        text: "Un condensateur stocke des charges électriques entre deux plaques séparées par un isolant. Il se charge et se décharge : il laisse passer les variations rapides et bloque le continu. Ses usages : lisser une alimentation, filtrer un signal, temporiser un circuit.",
      },
      {
        kind: "fields",
        title: "Caractéristiques",
        fields: [
          {
            label: "Capacité (farads)",
            value: "La quantité de charge stockable par volt. Les valeurs courantes vont du picofarad au millifarad ; les supercondensateurs montent bien plus haut.",
          },
          {
            label: "Tension maximale",
            value: "À ne jamais dépasser : un condensateur sur-tension peut exploser (surtout les électrolytiques). Prendre une marge confortable.",
          },
          {
            label: "Polarisé ou non",
            value: "Les condensateurs électrolytiques ont un sens (+ et -) : les brancher à l'envers les détruit. Les céramiques n'ont pas de sens.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or du câblage : un condensateur de découplage près de chaque circuit intégré, entre son alimentation et la masse. Il absorbe les appels de courant brusques et évite une grande famille de dysfonctionnements mystérieux.",
      },
    ],
  },
  {
    id: "diodes-intro",
    title: "Les diodes",
    level: 2,
    intro: "Le sens unique du courant — et la LED.",
    blocks: [
      {
        kind: "text",
        text: "Une diode laisse passer le courant dans un seul sens et le bloque dans l'autre. C'est le composant qui a introduit l'électronique « à sens unique » : redressement, protection contre les inversions de polarité, signalisation.",
      },
      {
        kind: "fields",
        title: "À savoir",
        fields: [
          {
            label: "Sens",
            value: "L'anode (+) vers le potentiel haut, la cathode (-) vers le bas. La cathode est marquée d'un anneau sur le boîtier.",
          },
          {
            label: "Chute de tension",
            value: "Une diode passante « mange » une petite tension (de l'ordre de 0,7 V pour le silicium). À prendre en compte dans les calculs.",
          },
          {
            label: "LED",
            value: "Une diode qui émet de la lumière quand le courant la traverse. Toujours avec une résistance en série pour limiter le courant — une LED branchée directement sur une alimentation grille en quelques secondes.",
          },
        ],
      },
    ],
  },
  {
    id: "transistors-intro",
    title: "Les transistors",
    level: 2,
    intro: "Interrupteur commandé et amplificateur : le composant du siècle.",
    blocks: [
      {
        kind: "text",
        text: "Un transistor est un interrupteur commandé électriquement : un petit signal sur une borne contrôle un courant bien plus important entre les deux autres. C'est à la fois l'interrupteur de toute l'électronique numérique et l'amplificateur de l'analogique.",
      },
      {
        kind: "table",
        headers: ["Famille", "Principe", "Usage typique"],
        rows: [
          ["Bipolaire (NPN/PNP)", "Un petit courant de base contrôle un grand courant collecteur", "Commutation, amplification basse fréquence"],
          ["MOSFET", "Une tension de grille contrôle le courant drain-source, sans courant de grille", "Commutation de puissance, alimentations, processeurs"],
        ],
      },
      {
        kind: "text",
        text: "Usage le plus fréquent pour débuter : commuter une charge (moteur, relais, ruban de LED) qu'un microcontrôleur ne peut pas alimenter directement. Le transistor fait l'interface entre la logique (quelques milliampères) et la puissance (ampères).",
      },
    ],
  },
  {
    id: "lire-un-schema",
    title: "Lire un schéma",
    level: 2,
    intro: "Le langage de l'électronique : symboles, nets, masses.",
    blocks: [
      {
        kind: "text",
        text: "Un schéma représente un circuit par des symboles reliés par des fils (nets). Le lire, c'est suivre le courant : de l'alimentation vers la masse, à travers les composants. Avant de câbler quoi que ce soit, on lit le schéma.",
      },
      {
        kind: "fields",
        title: "Les conventions",
        fields: [
          {
            label: "Symboles",
            value: "Chaque composant a un symbole normalisé : rectangle ou zigzag pour la résistance, deux plaques pour le condensateur, triangle pour la diode, etc. Les apprendre est un investissement unique.",
          },
          {
            label: "Alimentation et masse",
            value: "Les symboles d'alimentation (`VCC`, `5V`) et de masse (`GND`) : tous les points reliés au même symbole sont au même potentiel, même sans fil dessiné.",
          },
          {
            label: "Nets nommés",
            value: "Un nom sur un fil (ex. `SDA`, `TX`) indique une connexion logique : tous les fils portant ce nom sont reliés, pratique pour les bus.",
          },
          {
            label: "Sens de lecture",
            value: "En général : alimentation en haut, masse en bas, signal de gauche à droite. Repérer d'abord l'alimentation, puis suivre.",
          },
        ],
      },
    ],
  },
  {
    id: "breadboard",
    title: "La breadboard",
    level: 2,
    intro: "Prototyper sans souder.",
    blocks: [
      {
        kind: "diagram",
        title: "Comment les trous sont reliés (vue de dessus)",
        lines: [
          "  + ─┬─┬─┬─┬─┬─   rail d'alimentation (+)",
          "  - ─┴─┴─┴─┴─┴─   rail d'alimentation (-)",
          "",
          "  a b c d e     f g h i j",
          "  │ │ │ │ │     │ │ │ │ │",
          "  ├─┴─┴─┴─┴─────┤ ├─┴─┴─┴─┴─────┤",
          "  │  zone 1     │ │  zone 2     │",
          "  ├─┴─┴─┴─┴─────┤ ├─┴─┴─┴─┴─────┤  (chaque ligne de 5",
          "",
          "  Le fossé central sépare les deux zones : un composant",
          "  y enjambe le fossé (cas typique d'un circuit intégré).",
        ],
      },
      {
        kind: "list",
        items: [
          "Les rails latéraux distribuent l'alimentation sur toute la longueur ; les lignes de 5 trous relient les pattes d'un même nœud.",
          "Vérifier les continuités au multimètre en cas de doute : certaines breadboards ont des rails coupés au milieu.",
          "Limites : mauvais contacts avec l'âge, capacités parasites — impropre aux hautes fréquences et aux forts courants.",
          "C'est un outil de prototypage, pas de production : un montage qui doit durer se soude ou se tire sur circuit imprimé.",
        ],
      },
    ],
  },
  {
    id: "multimetre",
    title: "Le multimètre",
    level: 2,
    intro: "L'instrument n° 1 : mesurer avant de supposer.",
    blocks: [
      {
        kind: "table",
        headers: ["Mesure", "Branchement", "Réglage", "Piège classique"],
        rows: [
          ["Tension", "En parallèle, aux bornes", "V continu (V⎓)", "Mesurer en alternatif par erreur"],
          ["Courant", "En série, dans la branche", "A ou mA", "Oublier de déplacer le cordon sur la borne ampèremètre"],
          ["Résistance", "Composant hors tension, déconnecté", "Ω", "Mesurer sous tension : valeur fausse"],
          ["Continuité", "Hors tension", "Symbole sonore", "Ne pas vérifier que les cordons sont bons"],
        ],
      },
      {
        kind: "text",
        text: "Réflexes : vérifier la pile du multimètre (une pile faible fausse les mesures), commencer par le calibre le plus élevé en cas de doute, et ne jamais mesurer un courant sur le calibre tension avec les cordons en position ampèremètre — c'est le court-circuit assuré.",
      },
    ],
  },
  {
    id: "alimentation",
    title: "L'alimentation",
    level: 2,
    intro: "Fournir une tension stable et suffisante.",
    blocks: [
      {
        kind: "text",
        text: "Tout circuit a besoin d'une alimentation adaptée : la bonne tension, et un courant maximal suffisant. Une alimentation trop faible s'écroule (la tension chute quand le circuit appelle du courant) ; une tension trop élevée détruit.",
      },
      {
        kind: "fields",
        title: "Les options",
        fields: [
          {
            label: "Piles et batteries",
            value: "Simples, isolées, mais tension qui baisse à la décharge. Attention aux courts-circuits : une batterie peut débiter des courants destructeurs.",
          },
          {
            label: "Alimentation USB",
            value: "5 V pratiques pour les petits montages à microcontrôleur. Courant limité (souvent 500 mA à 2 A selon la source).",
          },
          {
            label: "Alimentation de laboratoire",
            value: "Tension et courant réglables, avec limitation de courant : l'outil idéal pour tester sans risque. La limitation de courant protège le montage des erreurs de câblage.",
          },
          {
            label: "Régulateurs",
            value: "Pour produire une tension stable (ex. 3,3 V) à partir d'une tension supérieure. Linéaires (simples, chauffent) ou à découpage (efficaces, plus complexes).",
          },
        ],
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité",
    level: 2,
    intro: "Les règles qui évitent les accidents — à respecter dès le premier montage.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le secteur (230 V) est dangereux : ne jamais bricoler directement sur le secteur sans formation. Travailler en basse tension (piles, USB, alimentation de labo).",
          "Les condensateurs, surtout gros et haute tension, restent chargés après coupure : les décharger avant de toucher.",
          "Les batteries lithium exigent du respect : pas de court-circuit, pas de perforation, chargeur adapté. Un court-circuit peut provoquer un incendie.",
          "Le fer à souder brûle : support adapté, jamais posé n'importe où, aération (les fumées de soudure sont irritantes).",
          "Couper l'alimentation avant de modifier un câblage. Vérifier deux fois avant de remettre sous tension.",
          "En cas de composant qui chauffe anormalement ou qui fume : couper immédiatement, chercher la cause avant de recommencer.",
        ],
      },
    ],
  },
  {
    id: "premier-montage",
    title: "Premier montage : allumer une LED",
    level: 2,
    intro: "Le « Hello World » de l'électronique, en 6 étapes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Rassembler le matériel",
            detail: "Une breadboard, une LED, une résistance de 220 Ω (ou 330 Ω), des fils, une alimentation 5 V (piles ou USB).",
          },
          {
            title: "Identifier les pattes de la LED",
            detail: "La patte longue est l'anode (+) ; la patte courte est la cathode (-), côté méplat du boîtier. Le courant doit entrer par l'anode.",
          },
          {
            title: "Câbler le circuit",
            detail: "5 V → résistance → anode de la LED → cathode de la LED → masse (GND). La résistance limite le courant à environ 15-20 mA (loi d'Ohm).",
          },
          {
            title: "Vérifier avant de brancher",
            detail: "Contrôler le câblage : pas de fils qui se touchent par accident, la résistance est bien en série avec la LED, pas en parallèle.",
          },
          {
            title: "Mettre sous tension",
            detail: "Brancher l'alimentation : la LED s'allume. Si rien ne se passe, couper et vérifier le sens de la LED et les connexions.",
          },
          {
            title: "Mesurer",
            detail: "Au multimètre : tension aux bornes de la LED (environ 2 V selon la couleur), tension aux bornes de la résistance, courant dans la branche. Comparer aux calculs.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro: "Les pièges que tous les débutants rencontrent.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["LED sans résistance", "LED qui grille instantanément", "Toujours une résistance en série, calculée par la loi d'Ohm"],
          ["Masse oubliée", "Circuit qui ne fait rien ou comportement erratique", "Tout circuit a besoin d'une référence commune : la masse"],
          ["Court-circuit d'alimentation", "Alimentation qui s'écroule, composant qui chauffe", "Couper, vérifier les rails au multimètre (continuité)"],
          ["Condensateur polarisé à l'envers", "Chauffe, gonfle, peut exploser", "Respecter le marquage + / -"],
          ["Mesure de courant en parallèle", "Étincelle, fusible du multimètre grillé", "Le courant se mesure en série, cordons sur la bonne borne"],
          ["Composant sous-dimensionné", "Surchauffe, dérive, panne", "Vérifier tension max, courant max, puissance dissipée"],
          ["Breadboard usée", "Contacts intermittents, pannes fantômes", "Tester les continuités, changer de zone ou de plaque"],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "kirchhoff",
    title: "Les lois de Kirchhoff",
    level: 3,
    intro: "Après Ohm, les deux lois qui permettent d'analyser n'importe quel circuit.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux lois",
        fields: [
          {
            label: "Loi des nœuds",
            value: "La somme des courants qui entrent dans un nœud égale la somme de ceux qui en sortent. Le courant ne se crée ni ne se perd : ce qui entre ressort.",
          },
          {
            label: "Loi des mailles",
            value: "La somme des tensions le long d'une boucle fermée est nulle. En parcourant une maille, les chutes de tension équilibrent exactement les sources.",
          },
        ],
      },
      {
        kind: "text",
        text: "Avec Ohm + Kirchhoff, on peut calculer courants et tensions dans n'importe quel circuit de résistances. C'est la base de l'analyse ; les outils de simulation (type SPICE) ne font qu'automatiser ces mêmes équations.",
      },
    ],
  },
  {
    id: "serie-parallele",
    title: "Série et parallèle",
    level: 3,
    intro: "Les deux façons d'associer des composants, et leurs équivalents.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Série", "Parallèle"],
        rows: [
          ["Branchement", "Les composants se suivent, un seul chemin pour le courant", "Les composants sont côte à côte, le courant se divise"],
          ["Tension", "Se divise entre les composants", "Identique aux bornes de chaque composant"],
          ["Courant", "Identique dans tous les composants", "Se divise entre les branches"],
          ["Résistances", "`R = R1 + R2`", "`1/R = 1/R1 + 1/R2`"],
          ["Condensateurs", "`1/C = 1/C1 + 1/C2` (inverse des résistances)", "`C = C1 + C2`"],
        ],
      },
      {
        kind: "text",
        text: "Savoir réduire un réseau série-parallèle en un composant équivalent est le réflexe d'analyse n° 1. Les montages réels mélangent les deux : on simplifie par étapes, de l'intérieur vers l'extérieur.",
      },
    ],
  },
  {
    id: "puissance-energie",
    title: "Puissance et énergie",
    level: 3,
    intro: "Ce qui chauffe, ce qui consomme, ce qui s'use.",
    blocks: [
      {
        kind: "text",
        text: "La puissance `P = U × I` mesure le débit d'énergie ; l'énergie (en joules ou en wattheures) mesure le total consommé. Un composant qui dissipe de la puissance chauffe : son dimensionnement thermique est aussi important que son dimensionnement électrique.",
      },
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          {
            label: "Dissipation",
            value: "Dans une résistance : `P = R × I² = U² / R`. Doubler le courant quadruple la chaleur dégagée.",
          },
          {
            label: "Rendement",
            value: "Le rapport entre puissance utile et puissance consommée. Un régulateur linéaire qui fait passer 12 V à 5 V dissipe la différence en chaleur : rendement médiocre à fort écart.",
          },
          {
            label: "Batteries",
            value: "La capacité (en Ah ou mAh) donne l'énergie stockée. L'autonomie = capacité / courant moyen consommé — en première approximation.",
          },
        ],
      },
    ],
  },
  {
    id: "condensateurs-rc",
    title: "Les circuits RC",
    level: 3,
    intro: "Résistance + condensateur : le temps entre en électronique.",
    blocks: [
      {
        kind: "text",
        text: "Un condensateur se charge à travers une résistance avec une constante de temps `tau = R × C`. C'est le premier circuit où le temps compte : temporisations, filtres, lissages.",
      },
      {
        kind: "diagram",
        title: "Charge d'un condensateur à travers R",
        lines: [
          "  U",
          "  │",
          "  │     ╭─────────── valeur finale",
          "  │   ╭─╯",
          "  │  ╭╯",
          "  │ ╭╯",
          "  │╭╯",
          "  └────────────────── t",
          "     ▲     ▲",
          "    tau   3×tau (≈95 %)",
          "",
          "  Après tau = R×C : 63 % de la charge.",
        ],
      },
      {
        kind: "list",
        items: [
          "Filtre passe-bas RC : laisse passer les signaux lents, atténue les rapides — la base du filtrage analogique.",
          "Lissage d'alimentation : un gros condensateur après un redresseur comble les creux entre les alternances.",
          "Temporisation : le temps de charge définit un délai — principe des minuteries analogiques simples.",
        ],
      },
    ],
  },
  {
    id: "inductances",
    title: "Les inductances (bobines)",
    level: 3,
    intro: "Le dual du condensateur : l'inertie du courant.",
    blocks: [
      {
        kind: "text",
        text: "Une inductance (bobine) s'oppose aux variations du courant : elle stocke de l'énergie dans un champ magnétique. Là où le condensateur lisse la tension, l'inductance lisse le courant.",
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [
          {
            label: "Comportement",
            value: "En continu établi : un simple fil (résistance faible). Aux variations rapides : une forte opposition. C'est l'inverse du condensateur.",
          },
          {
            label: "Applications",
            value: "Filtrage (avec condensateurs : filtres LC), alimentations à découpage, transformateurs, moteurs, relais.",
          },
          {
            label: "Danger",
            value: "Couper brutalement le courant dans une bobine génère une surtension (elle « refuse » l'arrêt). D'où la diode de roue libre en parallèle des charges inductives (relais, moteurs).",
          },
        ],
      },
    ],
  },
  {
    id: "diodes-detail",
    title: "Les diodes en détail",
    level: 3,
    intro: "Redressement, protection, régulation : les usages avancés.",
    blocks: [
      {
        kind: "table",
        headers: ["Usage", "Principe", "Exemple"],
        rows: [
          ["Redressement", "Ne laisser passer qu'une alternance du courant alternatif", "Convertir l'alternatif en continu (avec filtrage derrière)"],
          ["Pont de diodes", "Quatre diodes en pont : redressement double alternance", "Alimentations classiques"],
          ["Protection contre l'inversion", "Une diode en série bloque si l'alimentation est branchée à l'envers", "Protéger un montage des erreurs de branchement"],
          ["Roue libre", "Une diode en parallèle d'une charge inductive absorbe la surtension à la coupure", "Relais, moteurs, électro-aimants"],
          ["Régulation (Zener)", "Une diode Zener maintient une tension stable en inverse", "Références de tension simples, écrêtage"],
          ["Signalisation", "LED : la diode qui éclaire", "Voyants, affichage, optocoupleurs"],
        ],
      },
      {
        kind: "text",
        text: "La diode est aussi un composant non linéaire : sa caractéristique courant-tension est exponentielle, pas une droite. C'est cette non-linéarité qui permet le redressement — et qui complique les calculs précis.",
      },
    ],
  },
  {
    id: "transistor-bjt",
    title: "Le transistor bipolaire",
    level: 3,
    intro: "Commandé en courant : le classique de l'amplification.",
    blocks: [
      {
        kind: "text",
        text: "Dans un transistor bipolaire NPN, un petit courant de base contrôle un courant collecteur bien plus grand : le rapport s'appelle le gain en courant (bêta). En commutation, on le sature (interrupteur fermé) ou on le bloque (interrupteur ouvert). En amplification, on le polarise en zone linéaire.",
      },
      {
        kind: "list",
        items: [
          "Commutation : le mode le plus courant — tout ou rien, pour piloter relais, moteurs, LED de puissance.",
          "La base se commande toujours à travers une résistance : sans elle, le courant de base n'est pas limité.",
          "En amplification, le point de polarisation (le courant de repos) détermine la zone de fonctionnement : un mauvais choix = signal écrêté.",
          "Le bipolaire consomme un courant de base permanent : moins adapté que le MOSFET pour la commutation à faible consommation.",
        ],
      },
    ],
  },
  {
    id: "transistor-mosfet",
    title: "Le transistor MOSFET",
    level: 3,
    intro: "Commandé en tension : l'interrupteur de la puissance et du numérique.",
    blocks: [
      {
        kind: "text",
        text: "Le MOSFET se commande en tension sur sa grille, sans courant de grille en régime établi : il est idéal pour commuter de forts courants avec un microcontrôleur. C'est aussi le transistor de tous les circuits intégrés numériques — un processeur moderne en compte des milliards.",
      },
      {
        kind: "fields",
        title: "Points d'attention",
        fields: [
          {
            label: "Tension de seuil",
            value: "La grille doit dépasser un seuil pour conduire. Vérifier qu'un niveau logique (3,3 V ou 5 V) suffit à saturer le MOSFET choisi — sinon il chauffe en zone linéaire.",
          },
          {
            label: "Canal N / canal P",
            value: "Le canal N commute côté masse (le plus courant) ; le canal P commute côté alimentation. Ne pas les intervertir.",
          },
          {
            label: "Sensibilité statique",
            value: "La grille isolée est sensible aux décharges électrostatiques : précautions de manipulation sur les composants discrets sensibles.",
          },
          {
            label: "Résistance à l'état passant",
            value: "Le paramètre clé en commutation : plus elle est faible, moins le MOSFET chauffe à courant donné.",
          },
        ],
      },
    ],
  },
  {
    id: "ampli-op",
    title: "L'amplificateur opérationnel",
    level: 3,
    intro: "Le couteau suisse de l'analogique.",
    blocks: [
      {
        kind: "text",
        text: "L'amplificateur opérationnel (ampli-op) amplifie la différence de tension entre ses deux entrées avec un gain immense. Utilisé avec une contre-réaction (des résistances qui renvoient la sortie vers l'entrée), il réalise des fonctions précises : amplification, filtrage actif, comparaison, sommation.",
      },
      {
        kind: "list",
        items: [
          "Montage non-inverseur : amplifie sans inverser, haute impédance d'entrée — idéal pour les capteurs.",
          "Montage inverseur : amplifie en inversant, avec un gain fixé par le rapport de deux résistances.",
          "Suiveur : gain de 1, mais il isole (adapte l'impédance entre un capteur fragile et la suite du circuit).",
          "Comparateur : sans contre-réaction, la sortie bascule selon le signe de la différence d'entrée — base des détecteurs de seuil.",
          "Règle d'or : un ampli-op a besoin d'une alimentation adaptée (souvent symétrique pour les signaux alternatifs) et d'un découplage soigné.",
        ],
      },
    ],
  },
  {
    id: "portes-logiques",
    title: "Les portes logiques",
    level: 3,
    intro: "L'algèbre de Boole câblée : le fondement du numérique.",
    blocks: [
      {
        kind: "table",
        headers: ["Porte", "Symbole logique", "Sortie = 1 quand"],
        rows: [
          ["NON (NOT)", "¬A", "l'entrée vaut 0"],
          ["ET (AND)", "A · B", "les deux entrées valent 1"],
          ["OU (OR)", "A + B", "au moins une entrée vaut 1"],
          ["NON-ET (NAND)", "¬(A · B)", "sauf quand les deux valent 1"],
          ["NON-OU (NOR)", "¬(A + B)", "quand les deux valent 0"],
          ["OU exclusif (XOR)", "A ⊕ B", "les entrées sont différentes"],
        ],
      },
      {
        kind: "text",
        text: "Physiquement, ces portes sont des assemblages de transistors (en technologie CMOS aujourd'hui). Tout le numérique — du compteur au processeur — est construit en combinant ces briques. Comprendre les portes, c'est comprendre comment des 0 et des 1 deviennent des calculs.",
      },
    ],
  },
  {
    id: "logique-combinatoire",
    title: "La logique combinatoire",
    level: 3,
    intro: "Des portes aux fonctions : additionneurs, multiplexeurs, décodeurs.",
    blocks: [
      {
        kind: "text",
        text: "En logique combinatoire, la sortie ne dépend que des entrées présentes (pas d'histoire, pas de mémoire). En combinant des portes, on construit des fonctions : additionneur (qui additionne des bits), multiplexeur (qui sélectionne une entrée parmi plusieurs), décodeur (qui active une sortie selon un code).",
      },
      {
        kind: "list",
        items: [
          "Le demi-additionneur (XOR + ET) additionne deux bits : c'est la brique de toute l'arithmétique des processeurs.",
          "En cascadant des additionneurs 1 bit, on additionne des nombres de N bits.",
          "La simplification des équations logiques (tableaux de Karnaugh) réduit le nombre de portes : moins de portes = moins cher, plus rapide, moins gourmand.",
        ],
      },
    ],
  },
  {
    id: "logique-sequentielle",
    title: "La logique séquentielle",
    level: 3,
    intro: "Quand le circuit a une mémoire : bascules, registres, compteurs.",
    blocks: [
      {
        kind: "text",
        text: "En logique séquentielle, la sortie dépend des entrées et de l'état passé : le circuit mémorise. La brique de base est la bascule (flip-flop) : un bit de mémoire qui change sur un front d'horloge.",
      },
      {
        kind: "fields",
        title: "Les briques",
        fields: [
          {
            label: "Bascule D",
            value: "Recopie son entrée D vers sa sortie Q à chaque front d'horloge. C'est le bit de mémoire élémentaire.",
          },
          {
            label: "Registre",
            value: "Des bascules en parallèle : mémorise un mot de N bits.",
          },
          {
            label: "Compteur",
            value: "Des bascules en cascade : compte les fronts d'horloge. Base des temporisations numériques.",
          },
          {
            label: "Horloge",
            value: "Le signal qui cadence tout : à chaque front, le circuit avance d'un pas. La fréquence d'horloge limite la vitesse du système.",
          },
        ],
      },
      {
        kind: "text",
        text: "Registres + logique combinatoire + horloge = un processeur en miniature. La logique séquentielle est le pont entre les portes logiques et l'architecture des ordinateurs.",
      },
    ],
  },
  {
    id: "oscillateurs",
    title: "Les oscillateurs",
    level: 3,
    intro: "Produire un signal périodique : horloges et temporisations.",
    blocks: [
      {
        kind: "text",
        text: "Un oscillateur produit un signal périodique stable : c'est lui qui fournit l'horloge des circuits numériques et la porteuse des radios. Les oscillateurs à quartz offrent une excellente stabilité en fréquence pour un coût dérisoire — d'où leur présence dans (presque) tout circuit numérique.",
      },
      {
        kind: "list",
        items: [
          "Quartz : la référence de fréquence des microcontrôleurs, horloges temps réel, radios.",
          "Oscillateur RC ou à portes logiques : simple et bon marché, mais moins stable — suffisant pour clignoter une LED.",
          "La stabilité en fréquence se paie : plus l'application est exigeante (radio, mesure), plus l'oscillateur doit être stable.",
        ],
      },
    ],
  },
  {
    id: "pwm",
    title: "La PWM",
    level: 3,
    intro: "Moduler la puissance avec du tout-ou-rien.",
    blocks: [
      {
        kind: "diagram",
        title: "Rapport cyclique et puissance moyenne",
        lines: [
          "  25 % : ─┐ ┌──────  faible puissance moyenne",
          "         └─┘",
          "  50 % : ─┐  ┌─────  moitié de la puissance",
          "         └──┘",
          "  75 % : ─┐   ┌────  forte puissance moyenne",
          "         └───┘",
          "",
          "  La fréquence reste fixe ; seule la largeur",
          "  de l'impulsion (le rapport cyclique) varie.",
        ],
      },
      {
        kind: "text",
        text: "La PWM (modulation de largeur d'impulsion) fait varier la puissance moyenne en commutant rapidement entre tout et rien. Applications : varier la vitesse d'un moteur, la luminosité d'une LED, générer un son, et — avec un filtre — produire une tension analogique.",
      },
      {
        kind: "list",
        items: [
          "Fréquence : assez haute pour que la charge ne « voie » pas les à-coups (un moteur lisse mécaniquement, une LED doit dépasser la persistance rétinienne).",
          "Un transistor ou un pont en H fait l'interface entre le signal logique PWM et la charge de puissance.",
          "La PWM est la commande standard des actionneurs en robotique et en embarqué.",
        ],
      },
    ],
  },
  {
    id: "adc-dac",
    title: "ADC et DAC",
    level: 3,
    intro: "Convertir entre le monde analogique et le monde numérique.",
    blocks: [
      {
        kind: "table",
        headers: ["", "ADC (analogique → numérique)", "DAC (numérique → analogique)"],
        rows: [
          ["Rôle", "Numériser une tension pour le microcontrôleur", "Produire une tension à partir d'une valeur numérique"],
          ["Paramètre clé", "Résolution (bits) : 10 bits = 1024 niveaux", "Résolution et vitesse d'établissement"],
          ["Exemple", "Lire un capteur de température", "Générer un son, piloter finement un actionneur"],
          ["Piège", "Le bruit et la référence de tension limitent la précision réelle", "Souvent remplacé par une PWM filtrée pour les usages simples"],
        ],
      },
      {
        kind: "text",
        text: "La résolution théorique n'est pas la précision réelle : le bruit d'alimentation, la qualité de la référence de tension et le câblage dégradent la mesure. Un ADC 12 bits bruité peut être moins bon qu'un ADC 10 bits propre.",
      },
    ],
  },
  {
    id: "uart",
    title: "UART : la liaison série",
    level: 3,
    intro: "Deux fils pour dialoguer : TX, RX et une vitesse commune.",
    blocks: [
      {
        kind: "text",
        text: "L'UART est la liaison série asynchrone la plus simple : un fil pour émettre (TX), un pour recevoir (RX), croisés entre les deux appareils, plus une masse commune. Pas d'horloge partagée : les deux côtés doivent être réglés sur la même vitesse (baud rate).",
      },
      {
        kind: "list",
        items: [
          "Vitesses courantes : 9600, 115200 bauds. Les deux côtés doivent concorder, sinon les données sont illisibles.",
          "Niveaux logiques : attention, l'UART d'un microcontrôleur est en 3,3 V ou 5 V logiques — pas en RS-232 (±12 V) sans adaptateur.",
          "Usage n° 1 : la console de débogage d'un firmware — afficher des messages de diagnostic sur un terminal.",
          "Limites : point à point uniquement, pas d'adressage, sensible au bruit sur longue distance.",
        ],
      },
    ],
  },
  {
    id: "spi",
    title: "SPI : le bus rapide",
    level: 3,
    intro: "Quatre fils, une horloge, du débit.",
    blocks: [
      {
        kind: "text",
        text: "Le SPI relie un maître à un ou plusieurs esclaves avec quatre signaux : horloge (SCK), données maître→esclave (MOSI), données esclave→maître (MISO) et sélection d'esclave (CS). Le maître génère l'horloge et choisit l'esclave via son CS.",
      },
      {
        kind: "list",
        items: [
          "Avantages : rapide, simple à implémenter, full-duplex (échange simultané dans les deux sens).",
          "Inconvénients : un fil CS par esclave, pas de standard officiel strict (modes d'horloge à vérifier dans la datasheet).",
          "Usages : écrans, mémoires flash, convertisseurs rapides, capteurs à haut débit.",
          "Distances courtes uniquement : c'est un bus de carte, pas un bus de terrain.",
        ],
      },
    ],
  },
  {
    id: "i2c",
    title: "I2C : le bus à deux fils",
    level: 3,
    intro: "SDA, SCL et des adresses : beaucoup de capteurs sur deux fils.",
    blocks: [
      {
        kind: "text",
        text: "L'I2C ne demande que deux fils (données SDA, horloge SCL) pour relier de nombreux composants, chacun avec une adresse. Des résistances de tirage maintiennent les lignes au niveau haut quand personne ne parle.",
      },
      {
        kind: "list",
        items: [
          "Avantages : deux fils seulement, adressage intégré, très répandu pour les capteurs.",
          "Inconvénients : plus lent que SPI, les adresses peuvent entrer en conflit (deux capteurs avec la même adresse).",
          "Piège classique : oublier les résistances de tirage — le bus ne fonctionne pas sans elles (sauf si déjà présentes sur un module).",
          "Usages : capteurs de température, pression, IMU, écrans OLED, horloges temps réel.",
        ],
      },
    ],
  },
  {
    id: "capteurs-interface",
    title: "Interfacer un capteur",
    level: 3,
    intro: "Du phénomène physique à la donnée utilisable.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir selon la grandeur et la précision",
            detail: "Plage de mesure, précision requise, temps de réponse, interface disponible (analogique, I2C, SPI). Un capteur surdimensionné coûte cher ; un capteur sous-dimensionné fausse tout.",
          },
          {
            title: "Lire la datasheet",
            detail: "Tension d'alimentation, niveaux logiques, protocole, registres, formules de conversion. La datasheet est le contrat entre le fabricant et vous.",
          },
          {
            title: "Câbler proprement",
            detail: "Alimentation découplée, masse commune, fils courts pour les signaux analogiques. Un mauvais câblage bruite la mesure avant même la première ligne de code.",
          },
          {
            title: "Lire la valeur brute",
            detail: "D'abord afficher la valeur brute du capteur. Elle doit réagir de façon plausible au phénomène (chauffer le capteur de température, bouger l'IMU).",
          },
          {
            title: "Convertir et calibrer",
            detail: "Appliquer la formule de conversion, puis calibrer : comparer à une référence connue et corriger l'offset et le gain.",
          },
          {
            title: "Filtrer",
            detail: "Moyennage ou filtre passe-bas pour lisser le bruit, sans ralentir excessivement la réponse.",
          },
        ],
      },
    ],
  },
  {
    id: "moteurs",
    title: "Piloter un moteur",
    level: 3,
    intro: "Du signal logique à la puissance mécanique.",
    blocks: [
      {
        kind: "table",
        headers: ["Moteur", "Pilotage", "Particularité"],
        rows: [
          ["Courant continu", "Pont en H + PWM (sens + vitesse)", "Simple, couple élevé au démarrage"],
          ["Pas à pas", "Séquence de pas sur les bobines", "Position précise sans capteur, couple qui chute à haute vitesse"],
          ["Servomoteur (modélisme)", "Signal PWM de position", "Position asservie intégrée, couple limité"],
          ["Brushless", "Contrôleur dédié (ESC)", "Efficace, rapide — drones, ventilateurs"],
        ],
      },
      {
        kind: "list",
        items: [
          "Un microcontrôleur ne pilote jamais un moteur directement : pont en H ou driver entre les deux.",
          "La diode de roue libre (ou le driver qui l'intègre) protège contre les surtensions à la commutation.",
          "L'alimentation du moteur doit suivre les appels de courant (démarrage) : une alimentation trop faible fait s'écrouler la tension.",
          "Pour la précision, ajouter un codeur et fermer la boucle (voir Asservissement).",
        ],
      },
    ],
  },
  {
    id: "regulation-tension",
    title: "Régulation de tension",
    level: 3,
    intro: "Produire une tension stable à partir d'une source variable.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Régulateur linéaire", "Convertisseur à découpage"],
        rows: [
          ["Principe", "Dissipe l'excédent en chaleur", "Découpe à haute fréquence puis filtre"],
          ["Rendement", "Médiocre si l'écart de tension est grand", "Élevé (souvent > 85 %)"],
          ["Bruit", "Très faible : idéal pour l'analogique sensible", "Bruit de découpage à filtrer"],
          ["Complexité", "Un composant + deux condensateurs", "Inductance, diode, contrôleur : plus de composants"],
          ["Usage", "Petits courants, alimentations propres", "Batteries, forts courants, écarts importants"],
        ],
      },
      {
        kind: "text",
        text: "En pratique : un convertisseur à découpage pour l'efficacité (batterie → 5 V), suivi d'un régulateur linéaire pour les parties sensibles (capteurs analogiques, radio). Le meilleur des deux mondes.",
      },
    ],
  },
  {
    id: "decouplage",
    title: "Le découplage",
    level: 3,
    intro: "Le condensateur qui évite 80 % des pannes mystérieuses.",
    blocks: [
      {
        kind: "text",
        text: "Quand un circuit intégré commute, il appelle brutalement du courant. L'alimentation, avec son inductance de câblage, ne suit pas instantanément : la tension locale chute, le circuit dysfonctionne de façon intermittente. Le condensateur de découplage, placé au plus près des broches d'alimentation, fournit ce courant instantané.",
      },
      {
        kind: "list",
        items: [
          "Un condensateur céramique de faible valeur au plus près de chaque circuit intégré, entre alimentation et masse.",
          "Un condensateur de plus forte valeur à l'entrée de la carte pour les appels de courant globaux.",
          "Pistes courtes : l'efficacité du découplage dépend de la proximité. Un condensateur à 5 cm vaut moitié moins qu'à 5 mm.",
          "Symptômes d'un mauvais découplage : resets intempestifs, mesures bruitées, comportements non reproductibles.",
        ],
      },
    ],
  },
  {
    id: "bruit-emi",
    title: "Bruit et perturbations électromagnétiques",
    level: 3,
    intro: "Quand les circuits se parlent sans y être invités.",
    blocks: [
      {
        kind: "text",
        text: "Tout courant qui varie rayonne ; tout conducteur capte. Les perturbations électromagnétiques (EMI) sont les signaux parasites qu'un circuit impose à ses voisins : une alimentation à découpage qui bruite une mesure analogique, un moteur qui perturbe une radio.",
      },
      {
        kind: "list",
        items: [
          "Séparer les masses : une masse « puissance » (courants forts, bruités) et une masse « signal » (mesures sensibles), réunies en un seul point.",
          "Fils torsadés ou blindés pour les signaux sensibles sur distance.",
          "Filtrer les alimentations des parties sensibles (perle de ferrite + condensateurs).",
          "Penser le routage dès le schéma : un bon câblage vaut mieux qu'un blindage ajouté après coup.",
        ],
      },
    ],
  },
  {
    id: "pcb-intro",
    title: "Les circuits imprimés (PCB)",
    level: 3,
    intro: "Du prototype volant au produit durable.",
    blocks: [
      {
        kind: "text",
        text: "Le circuit imprimé remplace les fils volants par des pistes de cuivre gravées sur un support isolant. C'est le passage du prototype au produit : fiabilité, reproductibilité, compacité.",
      },
      {
        kind: "fields",
        title: "Les bases de la conception",
        fields: [
          {
            label: "Schéma puis routage",
            value: "On dessine d'abord le schéma (logique), puis on place les composants et on route les pistes (physique). Les deux sont des métiers.",
          },
          {
            label: "Largeur des pistes",
            value: "Dimensionnée selon le courant : les pistes d'alimentation et de puissance sont larges, les signaux peuvent être fins.",
          },
          {
            label: "Plan de masse",
            value: "Une couche (presque) entièrement en cuivre reliée à la masse : référence stable, blindage, retour des courants. La base d'un bon PCB.",
          },
          {
            label: "Fabrication",
            value: "Les fichiers Gerber décrivent les couches pour le fabricant. La fabrication à l'unité est aujourd'hui accessible aux amateurs.",
          },
        ],
      },
    ],
  },
  {
    id: "oscilloscope",
    title: "L'oscilloscope",
    level: 3,
    intro: "Voir les signaux : l'instrument qui révèle la réalité.",
    blocks: [
      {
        kind: "text",
        text: "Le multimètre donne une valeur moyenne ou efficace ; l'oscilloscope montre la forme du signal en fonction du temps. C'est l'instrument qui révèle les oscillations, les rebonds, le bruit, les problèmes de timing — tout ce que le multimètre cache.",
      },
      {
        kind: "list",
        items: [
          "Réglages de base : échelle verticale (volts/division), base de temps (secondes/division), déclenchement (trigger) pour stabiliser l'affichage.",
          "La sonde atténue et charge le circuit : utiliser la compensation et le calibre adaptés aux signaux mesurés.",
          "La masse de la sonde est reliée à la terre de l'appareil : attention aux courts-circuits quand on mesure des circuits non isolés.",
          "Un analyseur logique complète l'oscilloscope pour les signaux numériques (décodage UART, SPI, I2C).",
        ],
      },
    ],
  },
  {
    id: "datasheets",
    title: "Lire une datasheet",
    level: 3,
    intro: "Le contrat entre le fabricant et l'utilisateur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vue d'ensemble et brochage",
            detail: "Première page : ce que fait le composant, ses caractéristiques clés. Puis le brochage : quelle patte fait quoi. Vérifier qu'on a la bonne variante du composant.",
          },
          {
            title: "Valeurs limites absolues",
            detail: "Les maximums à ne jamais dépasser (tension, courant, température). Ce ne sont pas des conditions de fonctionnement : rester en deçà avec une marge.",
          },
          {
            title: "Conditions de fonctionnement",
            detail: "Les plages recommandées : c'est là que le composant tient ses performances annoncées.",
          },
          {
            title: "Caractéristiques électriques",
            detail: "Les valeurs typiques, min et max : seuils, consommations, temps de réponse. Concevoir avec les valeurs extrêmes, pas les typiques.",
          },
          {
            title: "Schémas d'application",
            detail: "Les montages recommandés par le fabricant : une base fiable pour son propre schéma, avec les valeurs de composants suggérées.",
          },
          {
            title: "Courbes et chronogrammes",
            detail: "Les graphes de comportement (en fonction de la température, de la tension) et les diagrammes temporels pour les composants numériques.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-un-circuit",
    title: "Tester un circuit",
    level: 3,
    intro: "Une méthode de validation, du premier branchement au produit.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Inspection visuelle",
            detail: "Avant toute mise sous tension : vérifier le câblage patte par patte contre le schéma, chercher les courts-circuits, les composants à l'envers, les soudures douteuses.",
          },
          {
            title: "Mise sous tension progressive",
            detail: "Alimentation de laboratoire avec limitation de courant basse : si le courant s'envole, couper et chercher le court-circuit avant qu'il ne fume.",
          },
          {
            title: "Vérifier les alimentations",
            detail: "Mesurer chaque tension d'alimentation au multimètre, au plus près des composants. Un circuit mal alimenté ne peut pas fonctionner.",
          },
          {
            title: "Tester par blocs",
            detail: "Valider chaque sous-ensemble séparément (alimentation, puis logique, puis puissance) avant de tout interconnecter.",
          },
          {
            title: "Stimuler et observer",
            detail: "Appliquer des signaux connus en entrée, observer les sorties à l'oscilloscope. Comparer au comportement attendu du schéma.",
          },
          {
            title: "Tester aux limites",
            detail: "Tension min et max, température, charge maximale : un circuit qui ne marche qu'au nominal n'est pas validé.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Déboguer un circuit",
    level: 3,
    intro: "Quand ça ne marche pas : une méthode au lieu du hasard.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Décrire le symptôme précisément",
            detail: "« Rien ne s'allume » n'est pas un symptôme ; « la tension en sortie du régulateur est de 0,8 V au lieu de 5 V » en est un. Mesurer d'abord.",
          },
          {
            title: "Vérifier l'alimentation",
            detail: "Dans une large majorité des cas, le problème est là : tension absente, effondrée, ou masse manquante. Toujours commencer par là.",
          },
          {
            title: "Diviser le circuit",
            detail: "Isoler des blocs et les tester séparément. Débrancher la charge : si l'alimentation remonte, le problème est dans la charge.",
          },
          {
            title: "Comparer au schéma",
            detail: "Revérifier le câblage réel contre le schéma, composant par composant. L'erreur est presque toujours une différence entre les deux.",
          },
          {
            title: "Suspecter les composants",
            detail: "En dernier recours : un composant mort (souvent suite à une surtension ou une inversion). Le remplacer et comprendre ce qui l'a tué.",
          },
        ],
      },
    ],
  },
  {
    id: "choisir-composants",
    title: "Choisir ses composants",
    level: 3,
    intro: "Dimensionner sans surdimensionner.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "Question à se poser", "Marge conseillée"],
        rows: [
          ["Tension maximale", "Quelle est la pire tension que verra le composant ?", "Rester nettement en dessous du maximum absolu"],
          ["Courant maximal", "Quel est le pire courant, y compris au démarrage ?", "Prévoir les appels de courant transitoires"],
          ["Puissance dissipée", "Combien de chaleur le composant dégagera-t-il ?", "Vérifier la thermique, pas seulement l'électrique"],
          ["Tolérance / précision", "Quelle précision l'application exige-t-elle ?", "1 % quand la mesure compte, 5 % pour le courant"],
          ["Disponibilité", "Le composant est-il courant et remplaçable ?", "Préférer les valeurs normalisées et les composants répandus"],
        ],
      },
      {
        kind: "text",
        text: "Principe : dimensionner pour le pire cas, pas pour le cas nominal. Le démarrage, les courts-circuits accidentels, la chaleur de l'été font partie du pire cas.",
      },
    ],
  },
  {
    id: "projets",
    title: "Projets",
    level: 3,
    intro: "Progresser par la pratique, du simple au système.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Allumer une LED (niveau 2)",
            detail: "Le premier montage : loi d'Ohm appliquée, mesures au multimètre.",
          },
          {
            title: "Alimentation régulée",
            detail: "Transformer une tension brute en 5 V stable : redressement, filtrage, régulation. Mesurer l'ondulation résiduelle à l'oscilloscope.",
          },
          {
            title: "Variateur de vitesse pour moteur",
            detail: "PWM + transistor ou pont en H + potentiomètre de consigne : le premier système complet, de la commande à la puissance.",
          },
          {
            title: "Station de mesure",
            detail: "Capteur de température + afficheur + microcontrôleur : câblage, alimentation, bus de communication, calibration.",
          },
          {
            title: "Carte sur PCB",
            detail: "Reprendre un montage qui marche sur breadboard et le router sur circuit imprimé : schéma propre, routage, fabrication, soudure, validation.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant par les références établies.",
    blocks: [
      {
        kind: "fields",
        title: "Références",
        fields: [
          {
            label: "All About Circuits",
            value: "Un site de référence avec des cours progressifs, du continu aux systèmes numériques, et un forum actif.",
          },
          {
            label: "Wikipedia — Électronique",
            value: "Vue d'ensemble encyclopédique avec des liens vers chaque sous-domaine pour creuser.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Datasheets : la documentation des fabricants est la source la plus fiable pour chaque composant.",
          "Simulation : un simulateur de type SPICE pour valider un schéma avant de câbler.",
          "Pratique : démonter des appareils hors d'usage pour voir comment les vrais produits sont conçus.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'électronique acquise, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Programmer le hardware : `embedded` (le firmware qui pilote les circuits), `cpp` (le langage du firmware).",
          "Exploiter les capteurs : `sensors` (choisir, calibrer, filtrer les mesures).",
          "Contrôler : `control-systems` (boucles de régulation : la théorie qui rend les systèmes fiables).",
          "Construire des robots : `robotics` et `ros` (la synthèse : mécanique, électronique, logiciel).",
          "Revenir à la roadmap : valider Électronique et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

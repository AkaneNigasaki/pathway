import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du contrôle (théorie du contrôle / asservissement) :
 * du PID à la commande avancée, avec l'accent sur les concepts, les formules
 * et les méthodes de réglage réellement utilisables.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_CONTROLE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction : asservir, c'est corriger en continu",
    level: 1,
    intro:
      "Le contrôle automatique transforme une consigne en mouvement précis en mesurant l'écart et en corrigeant sans arrêt.",
    blocks: [
      {
        kind: "text",
        text: "Asservir un système, c'est fermer une boucle : on mesure ce que fait réellement le système (la mesure), on le compare à ce qu'on veut (la consigne), et on calcule une correction (la commande) à partir de l'écart entre les deux (l'erreur). Cette boucle tourne en permanence — des dizaines ou centaines de fois par seconde — et c'est elle qui donne au robot sa précision.",
      },
      {
        kind: "diagram",
        title: "La boucle d'asservissement",
        lines: [
          "CONSIGNE (ce qu'on veut : position, vitesse…)",
          "     │",
          "     ▼",
          "COMPARATEUR ──► ERREUR = consigne − mesure",
          "     │",
          "     ▼",
          "CORRECTEUR (PID, LQR, MPC… : calcule la commande)",
          "     │",
          "     ▼",
          "ACTIONNEUR + SYSTÈME (moteur, bras, drone…)",
          "     │",
          "     ▼",
          "CAPTEUR ──► MESURE (ce que fait vraiment le système)",
          "     │",
          "     └── retour au comparateur : la boucle est fermée",
        ],
      },
      {
        kind: "text",
        text: "Sans cette boucle, on parle de commande en boucle ouverte : on envoie une consigne et on espère. Dès qu'une perturbation survient (frottement, vent, charge imprévue), l'erreur persiste. La boucle fermée détecte l'écart et le corrige : c'est la différence entre « ça bouge à peu près » et « ça bouge juste ».",
      },
    ],
  },
  {
    id: "ou-s-applique",
    title: "Où le contrôle s'applique",
    level: 1,
    intro:
      "Du four de cuisine au drone : les mêmes mathématiques gouvernent tous les systèmes asservis.",
    blocks: [
      {
        kind: "fields",
        title: "Les grandes familles d'asservissement",
        fields: [
          {
            label: "Régulation",
            value:
              "Maintenir une grandeur constante malgré les perturbations : température d'un four, vitesse d'un moteur, altitude d'un drone en stationnaire.",
          },
          {
            label: "Asservissement de position",
            value:
              "Suivre une consigne qui change : l'angle d'un bras robotique, la trajectoire d'un robot mobile, l'orientation d'une caméra.",
          },
          {
            label: "Contrôle de procédés",
            value:
              "Industrie : débits, pressions, niveaux de cuves. Des boucles lentes mais critiques, souvent des centaines par usine.",
          },
          {
            label: "Contrôle embarqué rapide",
            value:
              "Drones, fusées, disques durs : des boucles à plusieurs kilohertz où chaque milliseconde compte et où l'instabilité détruit le système.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point commun : partout, on retrouve la même structure consigne → erreur → correction → mesure. Apprendre le contrôle sur un exemple simple (un moteur, un système simulé) enseigne des réflexes directement transférables aux systèmes complexes.",
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
      "Le contrôle repose sur des mathématiques et de la mécanique : voici exactement ce qu'il faut maîtriser avant.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir, et pourquoi",
        fields: [
          {
            label: "Mathématiques : équations différentielles",
            value:
              "Un système dynamique s'écrit comme une équation différentielle (ex. `m·x'' = F`). Sans cela, impossible de modéliser ce qu'on veut contrôler.",
          },
          {
            label: "Mathématiques : algèbre linéaire",
            value:
              "Vecteurs, matrices, valeurs propres : le langage de l'espace d'état et de la stabilité. Les pôles d'un système sont des valeurs propres.",
          },
          {
            label: "Mathématiques : nombres complexes",
            value:
              "La transformée de Laplace et l'analyse fréquentielle vivent dans le plan complexe. Savoir manipuler `a + jb` est indispensable.",
          },
          {
            label: "Mécanique : dynamique du système",
            value:
              "Connaître les équations du mouvement du mécanisme à asservir (inertie, frottements) : on ne contrôle bien que ce qu'on comprend physiquement.",
          },
          {
            label: "Python : simulation numérique",
            value:
              "Prototyper et simuler des boucles avec NumPy avant de toucher au matériel : 90 % du réglage se fait en simulation.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap : les mathématiques et la mécanique sont les fondations, Python l'outil de simulation. Un contrôleur réglé sans modèle est un pari ; avec un modèle, c'est de l'ingénierie.",
      },
    ],
  },
  {
    id: "outillage-simulation",
    title: "Outillage : simuler avant de câbler",
    level: 2,
    intro:
      "Le banc d'essai du contrôleur, c'est la simulation : on y casse du virtuel plutôt que du matériel.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un environnement Python avec NumPy (calcul vectoriel) et Matplotlib (tracer les réponses temporelles) suffit pour 90 % de l'apprentissage.",
          "Principe de travail : écrire le modèle du système (équation différentielle), simuler la boucle fermée pas à pas, tracer consigne / mesure / commande.",
          "La simulation répond à trois questions avant tout essai réel : le système est-il stable ? la réponse est-elle assez rapide ? la commande demandée est-elle réaliste (pas de saturation) ?",
          "Règle d'or : un contrôleur qui oscille en simulation oscillera sur le réel — en pire, car le modèle est toujours optimiste.",
        ],
      },
      {
        kind: "diagram",
        title: "Le cycle de développement d'un contrôleur",
        lines: [
          "MODÈLE (équations du système)",
          "     │",
          "     ▼",
          "SIMULATION (boucle fermée, pas à pas)",
          "     │",
          "     ▼",
          "RÉGLAGE (gains, anti-windup, filtres)",
          "     │",
          "     ▼",
          "ESSAI RÉEL (progressif, sécurisé)",
          "     │",
          "     └── écart simu/réel → affiner le MODÈLE",
        ],
      },
    ],
  },
  {
    id: "concept-pid",
    title: "Le régulateur PID",
    level: 2,
    intro:
      "Le correcteur le plus utilisé au monde : trois termes, chacun avec un rôle précis.",
    blocks: [
      {
        kind: "text",
        text: "La loi de commande du PID s'écrit : `u(t) = Kp·e(t) + Ki·∫e(τ)dτ + Kd·de/dt`. La commande `u` est la somme de trois corrections calculées à partir de l'erreur `e` (consigne − mesure). Chaque terme corrige un défaut différent de la réponse.",
      },
      {
        kind: "fields",
        title: "Les trois termes, en détail",
        fields: [
          {
            label: "P — Proportionnel (`Kp·e`)",
            value:
              "Réagit à l'erreur présente : plus l'écart est grand, plus la correction est forte. Seul, il laisse toujours une erreur résiduelle (erreur statique) car à erreur nulle la commande est nulle — or il faut souvent une commande non nulle pour tenir la position.",
          },
          {
            label: "I — Intégral (`Ki·∫e`)",
            value:
              "Accumule l'erreur passée : tant qu'une petite erreur persiste, l'intégrale grandit et finit par l'éliminer. C'est lui qui supprime l'erreur statique. Danger : l'emballement intégral (windup) quand l'actionneur sature.",
          },
          {
            label: "D — Dérivé (`Kd·de/dt`)",
            value:
              "Anticipe à partir de la vitesse de l'erreur : il freine avant le dépassement et amortit les oscillations. Il amplifie le bruit de mesure — on le filtre ou on le calcule sur la mesure plutôt que sur l'erreur.",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique, on utilise souvent des variantes : P seul pour un premier test, PI pour la plupart des procédés (l'erreur statique est inacceptable), PID complet quand il faut de la rapidité sans dépassement. Le D est le premier terme qu'on désactive si la mesure est bruitée.",
      },
    ],
  },
  {
    id: "concept-espace-etat",
    title: "L'espace d'état",
    level: 2,
    intro:
      "Représenter tout le système par un vecteur d'état : la fondation du contrôle moderne.",
    blocks: [
      {
        kind: "text",
        text: "Un système dynamique se décrit par ses variables d'état — l'ensemble minimal d'informations qui résume son passé (positions et vitesses, par exemple). Sous forme matricielle : `dx/dt = A·x + B·u` (évolution) et `y = C·x + D·u` (mesure). Cette écriture unifie tous les systèmes linéaires, quel que soit leur ordre.",
      },
      {
        kind: "list",
        items: [
          "Avantage 1 : les outils d'analyse deviennent systématiques — la stabilité se lit sur les valeurs propres de `A` (parties réelles négatives = stable).",
          "Avantage 2 : on conçoit des correcteurs sur le modèle complet (placement de pôles, LQR) au lieu de régler trois gains à l'aveugle.",
          "Avantage 3 : les systèmes multivariables (plusieurs entrées/sorties couplées) se traitent naturellement, là où le PID monovariable montre ses limites.",
          "Condition : il faut un modèle. L'espace d'état ne remplace pas la modélisation, il l'exploite.",
        ],
      },
    ],
  },
  {
    id: "concept-mpc",
    title: "La commande prédictive (MPC)",
    level: 2,
    intro:
      "Optimiser la commande sur un horizon futur en respectant les contraintes : puissant, mais coûteux en calcul.",
    blocks: [
      {
        kind: "text",
        text: "Le MPC (Model Predictive Control) utilise le modèle du système pour prédire son évolution sur un horizon futur (quelques dizaines de pas), puis choisit la séquence de commandes qui minimise un coût (écart à la consigne + effort) tout en respectant les contraintes (butées, vitesses max, zones interdites). Seule la première commande est appliquée, puis on recommence au pas suivant : c'est l'horizon fuyant.",
      },
      {
        kind: "fields",
        title: "Forces et prix à payer",
        fields: [
          {
            label: "Gère les contraintes nativement",
            value:
              "Là où le PID sature et décroche, le MPC anticipe les butées et les évite : décisif pour les drones, les robots mobiles et les procédés contraints.",
          },
          {
            label: "Multivariable par construction",
            value:
              "Le modèle contient tous les couplages : pas besoin de découpler à la main comme avec plusieurs PID.",
          },
          {
            label: "Coût : le calcul temps réel",
            value:
              "Résoudre un problème d'optimisation à chaque pas exige un modèle simple et un solveur rapide. Sur microcontrôleur, c'est souvent hors de portée : on réserve le MPC aux systèmes avec du calcul embarqué.",
          },
          {
            label: "Dépend du modèle",
            value:
              "Un MPC avec un mauvais modèle prédit mal et commande mal. L'identification (voir section dédiée) est un prérequis, pas une option.",
          },
        ],
      },
    ],
  },
  {
    id: "concept-stabilite",
    title: "La stabilité",
    level: 2,
    intro:
      "La propriété non négociable : un système instable diverge, oscille ou casse.",
    blocks: [
      {
        kind: "text",
        text: "Un système est stable si, écarté de son équilibre, il y revient au lieu de diverger. En pratique : des gains trop agressifs, un retard trop grand ou un modèle trop optimiste rendent la boucle instable — le système oscille de façon croissante jusqu'à la butée, la saturation ou la casse mécanique.",
      },
      {
        kind: "list",
        items: [
          "En espace d'état : stable si toutes les valeurs propres de `A` ont une partie réelle strictement négative.",
          "En fréquentiel : on exige des marges — marge de gain (typiquement > 6 dB) et marge de phase (typiquement > 45°) — qui mesurent la distance à l'instabilité.",
          "Règle pratique : augmentez les gains progressivement et observez. Dès qu'une oscillation entretenue apparaît, vous avez trouvé la limite : reculez d'un facteur 2 environ.",
          "La stabilité se prouve sur le modèle et se vérifie sur le réel : les deux sont nécessaires, aucun ne suffit seul.",
        ],
      },
    ],
  },
  {
    id: "concept-identification",
    title: "L'identification",
    level: 2,
    intro:
      "Estimer les paramètres du modèle à partir de mesures réelles : sans bon modèle, pas de bon contrôleur.",
    blocks: [
      {
        kind: "text",
        text: "Identifier un système, c'est lui appliquer des entrées connues (échelons, sinusoïdes, séquences pseudo-aléatoires), mesurer ses réponses, puis ajuster les paramètres du modèle pour qu'il reproduise ces mesures. C'est le chaînon entre la théorie et le réel : le modèle de la fiche technique est un point de départ, le modèle identifié est la vérité du banc.",
      },
      {
        kind: "list",
        items: [
          "Méthode la plus simple : réponse indicielle — on applique un échelon et on mesure gain statique, temps de montée, dépassement. Elle donne un modèle du premier ou second ordre souvent suffisant pour régler un PID.",
          "Méthode systématique : moindres carrés — on ajuste les paramètres pour minimiser l'écart entre modèle et mesures sur tout un enregistrement.",
          "Piège classique : identifier en boucle fermée sans précaution biaise les résultats ; identifier avec un signal d'excitation trop pauvre donne un modèle qui ne prédit rien d'autre que l'essai.",
          "Toujours valider sur des données différentes de celles qui ont servi à l'identification : un modèle qui ne prédit que son essai d'apprentissage est inutile.",
        ],
      },
    ],
  },
  {
    id: "premier-asservissement",
    title: "Premier asservissement : PID simulé",
    level: 2,
    intro:
      "Écrire une boucle PID complète en Python et observer la réponse : le meilleur premier pas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un système simple",
            detail:
              "On simule un système du premier ordre (`dx/dt = (u − x) / τ` avec `τ = 1 s`) : il représente par exemple la vitesse d'un moteur. Simple, mais il contient l'essentiel — retard de réponse et saturation possible.",
          },
          {
            title: "Écrire la boucle",
            detail:
              "À chaque pas `dt` : calculer l'erreur `consigne − mesure`, accumuler l'intégrale, estimer la dérivée, sommer les trois termes pour obtenir la commande `u`, puis intégrer le modèle du système avec cette commande (méthode d'Euler).",
          },
          {
            title: "Observer et régler",
            detail:
              "Tracer consigne, mesure et commande. Commencez avec `Ki = Kd = 0` et augmentez `Kp` jusqu'à une réponse rapide mais oscillante, ajoutez `Kd` pour amortir, puis `Ki` pour éliminer l'erreur statique.",
          },
          {
            title: "Tester la robustesse",
            detail:
              "Changez `τ` ou ajoutez une perturbation constante : un bon réglage encaisse sans diverger. Si la commande sature en permanence, le système est sous-dimensionné — aucun réglage ne compensera.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "pid_simulation.py — boucle complète",
        code: "dt = 0.01            # pas de temps (s)\nKp, Ki, Kd = 2.0, 1.0, 0.5\ntau = 1.0            # constante de temps du systeme\n\nconsigne, x = 1.0, 0.0\nintegral, prev_err = 0.0, 0.0\n\nt = 0.0\nwhile t < 10.0:\n    err = consigne - x\n    integral += err * dt\n    deriv = (err - prev_err) / dt\n    u = Kp * err + Ki * integral + Kd * deriv  # commande PID\n    x += ((u - x) / tau) * dt                 # modele (Euler)\n    prev_err, t = err, t + dt\n\nprint(f\"Sortie finale : {x:.3f} (consigne : {consigne})\")",
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Flux professionnel : du modèle au robot",
    level: 2,
    intro:
      "La méthode qui sépare le réglage sérieux du tâtonnement : chaque étape a un livrable.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Modéliser",
            detail:
              "Écrire les équations du système (ou un modèle identifié). Livrable : un modèle qui reproduit la réponse mesurée à 10–20 % près.",
          },
          {
            title: "Simuler",
            detail:
              "Tester le correcteur en boucle fermée : stabilité, temps de réponse, commande max. Livrable : des courbes qui montrent un comportement sain avec des marges.",
          },
          {
            title: "Régler",
            detail:
              "Choisir la méthode (Ziegler-Nichols, placement de pôles, optimisation) et fixer les gains. Livrable : gains justifiés, pas devinés.",
          },
          {
            title: "Essai réel progressif",
            detail:
              "Démarrer avec des gains réduits et des butées logicielles, augmenter par paliers en surveillant. Livrable : essais tracés et comparés à la simulation.",
          },
          {
            title: "Valider",
            detail:
              "Scénarios nominaux + cas limites (charge max, perturbations, coupures). Livrable : le système tient ses specs dans tous les cas testés.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-asservissement",
    title: "Déboguer un asservissement",
    level: 2,
    intro:
      "Une méthode de diagnostic : chaque symptôme pointe vers une cause probable.",
    blocks: [
      {
        kind: "fields",
        title: "Symptômes et causes probables",
        fields: [
          {
            label: "Oscillations entretenues",
            value:
              "Gains trop élevés ou retard trop grand dans la boucle. Réduire `Kp` (et `Kd` si présent), vérifier la période d'échantillonnage et les retards de communication.",
          },
          {
            label: "Réponse très lente",
            value:
              "Gains trop faibles, ou saturation de l'actionneur qui limite la commande réelle. Vérifier d'abord que la commande demandée est physiquement atteignable.",
          },
          {
            label: "Erreur statique persistante",
            value:
              "Terme intégral absent ou trop faible, ou windup qui l'empêche d'agir. Vérifier aussi les frottements secs que l'intégrateur doit compenser.",
          },
          {
            label: "Dépassement important puis stabilisation",
            value:
              "Pas assez d'amortissement : augmenter `Kd` (ou réduire `Kp`). Si le dépassement est inacceptable (butée mécanique), ajouter une anticipation (feedforward).",
          },
          {
            label: "Comportement erratique, saccadé",
            value:
              "Bruit de mesure amplifié par le terme dérivé, ou quantification du capteur. Filtrer la mesure, calculer D sur la mesure (pas sur l'erreur), réduire `Kd`.",
          },
          {
            label: "Ça marchait en simulation, pas sur le réel",
            value:
              "Le modèle est optimiste : jeu, frottements, retards et saturations non modélisés. Identifier le système réel et recommencer le réglage dessus.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-performance",
    title: "Tester : mesurer la performance",
    level: 2,
    intro:
      "Un contrôleur se juge sur des critères chiffrés, pas sur une impression visuelle.",
    blocks: [
      {
        kind: "fields",
        title: "Les critères classiques (réponse à un échelon)",
        fields: [
          {
            label: "Temps de montée",
            value:
              "Temps pour passer de 10 % à 90 % de la consigne : mesure la rapidité. Se compare à l'exigence du cahier des charges, pas dans l'absolu.",
          },
          {
            label: "Dépassement",
            value:
              "Écart maximal au-delà de la consigne, en % : mesure l'amortissement. 0 % exigé près d'une butée mécanique ; 10–20 % tolérable ailleurs.",
          },
          {
            label: "Temps d'établissement",
            value:
              "Temps pour rester dans ±2 % (ou ±5 %) de la consigne : mesure la fin de la réponse, intégrale et oscillations comprises.",
          },
          {
            label: "Erreur statique",
            value:
              "Écart résiduel en régime permanent : doit être nul (ou dans la tolérance) pour un asservissement de position sérieux.",
          },
          {
            label: "Effort de commande",
            value:
              "Valeur max et énergie de la commande : un contrôleur qui sature en permanence use l'actionneur et n'a plus de marge pour les perturbations.",
          },
          {
            label: "Rejet de perturbation",
            value:
              "Écart maximal et temps de retour après une perturbation : le vrai test d'un asservissement, souvent plus révélateur que la réponse à l'échelon.",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode : appliquer un échelon de consigne, enregistrer mesure et commande, extraire ces six critères, comparer aux specs. Refaire après chaque changement de réglage : sans mesure, le « mieux » est une opinion.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges dans lesquels tombent presque tous les débutants — et comment les éviter.",
    blocks: [
      {
        kind: "list",
        items: [
          "Régler directement sur le matériel sans simulation : on casse ou on perd des heures là où dix minutes de simulation auraient montré l'instabilité.",
          "Copier des gains d'un autre système : les gains n'ont de sens que pour un système donné ; un PID réglé pour un petit moteur diverge sur un gros.",
          "Oublier l'anti-windup : dès que l'actionneur sature, l'intégrale s'emballe et la sortie met un temps fou à redescendre — toujours borner l'intégrale.",
          "Laisser le terme D sur une mesure bruitée sans filtre : la commande devient un bruit à haute fréquence qui chauffe le moteur et use la mécanique.",
          "Ignorer la période d'échantillonnage : un correcteur conçu en continu puis discrétisé avec un pas trop grand devient instable (règle : échantillonner au moins 10 à 20 fois la bande passante visée).",
          "Confondre rapidité et agressivité : des gains énormes donnent une réponse rapide sur le papier et des oscillations, de la saturation et de l'usure dans la réalité.",
          "Négliger le sens de la mesure : un capteur monté à l'envers (signe inversé) transforme la contre-réaction en réaction positive — divergence immédiate. Toujours vérifier le signe en boucle ouverte d'abord.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "fonction-de-transfert",
    title: "Fonction de transfert et transformée de Laplace",
    level: 3,
    intro:
      "Passer du temporel au fréquentiel : l'outil d'analyse des systèmes linéaires.",
    blocks: [
      {
        kind: "text",
        text: "La transformée de Laplace convertit une équation différentielle en équation algébrique : dériver devient multiplier par `p`. La fonction de transfert `H(p) = Y(p) / X(p)` (sortie sur entrée, conditions initiales nulles) résume alors tout le comportement linéaire du système.",
      },
      {
        kind: "fields",
        title: "Lecture d'une fonction de transfert",
        fields: [
          {
            label: "Pôles",
            value:
              "Racines du dénominateur : ils dictent la dynamique libre. Partie réelle négative = mode stable qui décroît ; imaginaire pur = oscillation entretenue ; partie réelle positive = divergence.",
          },
          {
            label: "Zéros",
            value:
              "Racines du numérateur : ils modifient la forme de la réponse sans changer la stabilité. Un zéro à partie réelle positive (système à non-minimum de phase) provoque une réponse initiale inverse — piège classique.",
          },
          {
            label: "Gain statique",
            value:
              "`H(0)` : le rapport sortie/entrée en régime permanent constant. Il dit si le système amplifie ou atténue, avant même de parler de dynamique.",
          },
          {
            label: "Ordre",
            value:
              "Degré du dénominateur : l'ordre 1 ne peut pas osciller, l'ordre 2 si, l'ordre élevé se comporte souvent comme un ordre 2 dominant plus des modes rapides négligeables.",
          },
        ],
      },
    ],
  },
  {
    id: "reponse-temporelle",
    title: "Réponse temporelle : premier et second ordre",
    level: 3,
    intro:
      "Deux modèles canoniques qui décrivent la majorité des systèmes rencontrés.",
    blocks: [
      {
        kind: "text",
        text: "Premier ordre : `H(p) = K / (1 + τ·p)`. Réponse à un échelon : montée exponentielle vers `K`, sans oscillation ni dépassement. `τ` est la constante de temps : à `t = τ` on atteint 63 % de la valeur finale, à `3τ` environ 95 %. Simple, robuste, jamais oscillant.",
      },
      {
        kind: "text",
        text: "Second ordre : `H(p) = K·ωn² / (p² + 2ζωn·p + ωn²)`. Deux paramètres gouvernent tout : `ωn` la pulsation propre (rapidité) et `ζ` l'amortissement. Si `ζ ≥ 1`, réponse sans oscillation ; si `ζ < 1`, oscillations amorties dont le dépassement ne dépend que de `ζ` (ex. `ζ = 0,7` → dépassement d'environ 5 %).",
      },
      {
        kind: "diagram",
        title: "Effet de l'amortissement ζ (second ordre, même ωn)",
        lines: [
          "ζ = 0,2  ── forte oscillation, grand dépassement",
          "ζ = 0,5  ── quelques oscillations, dépassement ~15 %",
          "ζ = 0,7  ── compromis standard : rapide, ~5 % de dépassement",
          "ζ = 1,0  ── critique : le plus rapide sans dépassement",
          "ζ = 2,0  ── très amorti : lent, aucun dépassement",
        ],
      },
    ],
  },
  {
    id: "diagramme-de-bode",
    title: "Diagramme de Bode : l'analyse fréquentielle",
    level: 3,
    intro:
      "Voir le système en fréquence : gain et phase révèlent la stabilité avant tout essai.",
    blocks: [
      {
        kind: "text",
        text: "Le diagramme de Bode trace le gain (en dB) et la phase (en degrés) de `H(jω)` en fonction de la pulsation `ω` (échelle logarithmique). Il montre comment le système traite chaque fréquence : ce qu'il amplifie, ce qu'il atténue, et le retard de phase qu'il introduit.",
      },
      {
        kind: "fields",
        title: "Marges de stabilité : la distance au danger",
        fields: [
          {
            label: "Marge de gain",
            value:
              "De combien on peut multiplier le gain avant que le système n'oscille (phase à −180°). Exigence usuelle : au moins 6 dB (facteur 2).",
          },
          {
            label: "Marge de phase",
            value:
              "De combien de phase on dispose quand le gain vaut 1 (0 dB). Exigence usuelle : au moins 45°. Elle est directement liée à l'amortissement de la boucle fermée.",
          },
          {
            label: "Pulsation de coupure",
            value:
              "Fréquence où le gain passe par 0 dB : elle fixe approximativement la rapidité de la boucle fermée. Plus elle est haute, plus le système est rapide — et sensible au bruit et aux retards.",
          },
        ],
      },
      {
        kind: "text",
        text: "Usage pratique : on trace Bode en boucle ouverte, on lit les marges, on ajuste le correcteur pour obtenir les marges visées. C'est la méthode de synthèse fréquentielle — moins intuitive que le temporel, mais elle quantifie la robustesse.",
      },
    ],
  },
  {
    id: "lieu-des-racines",
    title: "Le lieu des racines (lieu d'Evans)",
    level: 3,
    intro:
      "Suivre les pôles en boucle fermée quand le gain varie : voir l'instabilité arriver.",
    blocks: [
      {
        kind: "text",
        text: "Le lieu des racines trace dans le plan complexe la trajectoire des pôles de la boucle fermée lorsque le gain `K` varie de 0 à l'infini. Il part des pôles de la boucle ouverte et finit aux zéros (ou à l'infini). Dès qu'une branche franchit l'axe imaginaire vers la droite, le système devient instable : le lieu montre exactement pour quel gain.",
      },
      {
        kind: "list",
        items: [
          "Il explique visuellement pourquoi un gain trop élevé déstabilise : les branches migrent vers le demi-plan droit.",
          "Il guide le placement d'un correcteur : ajouter un zéro (avance de phase) attire les branches vers la gauche, donc vers la stabilité.",
          "Limite : purement linéaire et monovariable ; les non-linéarités (saturations) et les retards n'y apparaissent pas.",
        ],
      },
    ],
  },
  {
    id: "ziegler-nichols",
    title: "Réglage Ziegler-Nichols",
    level: 3,
    intro:
      "La méthode empirique historique : faire osciller le système pour le régler.",
    blocks: [
      {
        kind: "text",
        text: "Méthode en boucle fermée : on met `Ki = Kd = 0`, on augmente `Kp` jusqu'à obtenir des oscillations entretenues d'amplitude constante. On note le gain critique `Ku` et la période d'oscillation `Tu`. Les gains se déduisent alors de la table — un point de départ à affiner, pas une vérité finale.",
      },
      {
        kind: "table",
        headers: ["Correcteur", "Kp", "Ti (→ Ki = Kp/Ti)", "Td (→ Kd = Kp·Td)"],
        rows: [
          ["P", "0,5 · Ku", "—", "—"],
          ["PI", "0,45 · Ku", "0,83 · Tu", "—"],
          ["PID", "0,6 · Ku", "0,5 · Tu", "0,125 · Tu"],
        ],
      },
      {
        kind: "text",
        text: "Limites à connaître : faire osciller un système réel peut être dangereux ou impossible (butées, sécurité) ; la méthode donne un réglage agressif (dépassement ~25 %) qu'on adoucit ensuite ; elle suppose un système approximativement linéaire. En pratique, on s'en sert comme première approximation avant d'affiner sur les critères mesurés.",
      },
    ],
  },
  {
    id: "anti-windup",
    title: "Anti-windup : dompter l'intégrale",
    level: 3,
    intro:
      "Quand l'actionneur sature, l'intégrale s'emballe : trois techniques pour l'en empêcher.",
    blocks: [
      {
        kind: "text",
        text: "Le windup : la commande calculée dépasse ce que l'actionneur peut fournir (saturation), l'erreur persiste donc, l'intégrale continue de grandir, et quand la consigne s'inverse il faut « désaccumuler » tout ce surplus — d'où un dépassement énorme et une réponse paresseuse. Tout PID réel avec saturation a besoin d'un anti-windup.",
      },
      {
        kind: "fields",
        title: "Trois techniques classiques",
        fields: [
          {
            label: "Clamping (gel de l'intégrale)",
            value:
              "On bloque l'accumulation de l'intégrale quand la commande est saturée ET que l'erreur demanderait à saturer davantage. Simple, efficace, la plus utilisée.",
          },
          {
            label: "Back-calculation",
            value:
              "On réinjecte l'écart entre commande calculée et commande saturée pour « décharger » l'intégrale, avec un gain de suivi. Plus doux que le clamping, un paramètre de plus à régler.",
          },
          {
            label: "Saturation de l'intégrale",
            value:
              "On borne simplement la valeur de l'intégrale elle-même. Grossier mais robuste ; ne traite pas finement le cas où la saturation vient d'ailleurs.",
          },
        ],
      },
    ],
  },
  {
    id: "feedforward",
    title: "Feedforward : l'anticipation",
    level: 3,
    intro:
      "Corriger avant l'erreur plutôt qu'après : le complément du feedback.",
    blocks: [
      {
        kind: "text",
        text: "Le feedback corrige l'erreur après qu'elle est apparue ; le feedforward (action prédictive) injecte une commande calculée à partir de la consigne elle-même, sans attendre l'erreur. Exemple : pour suivre une trajectoire de vitesse connue, on envoie directement le couple estimé nécessaire (modèle inverse approximatif), et le PID ne corrige que le résidu.",
      },
      {
        kind: "list",
        items: [
          "Avantage : réponse bien plus rapide et précise en suivi de trajectoire, sans augmenter les gains du feedback (donc sans dégrader la stabilité).",
          "Condition : il faut connaître la consigne à l'avance (trajectoire planifiée) et disposer d'un modèle même approximatif.",
          "Il ne remplace jamais le feedback : sans boucle fermée, la moindre erreur de modèle ou perturbation dérive sans correction.",
          "En robotique, la combinaison feedforward (trajectoire) + PID (correction) est le standard des bras industriels.",
        ],
      },
    ],
  },
  {
    id: "cascade",
    title: "Contrôle en cascade",
    level: 3,
    intro:
      "Deux boucles imbriquées : une rapide à l'intérieur, une précise à l'extérieur.",
    blocks: [
      {
        kind: "diagram",
        title: "Cascade position / vitesse / courant",
        lines: [
          "Consigne position",
          "     │",
          "     ▼",
          "BOUCLE EXTERNE (position, lente) ──► consigne vitesse",
          "                                          │",
          "                                          ▼",
          "                              BOUCLE INTERNE (vitesse, rapide)",
          "                                          │",
          "                                          ▼",
          "                                    ACTIONNEUR",
          "                                          │",
          "                                          ▼",
          "                              MESURES (vitesse rapide, position)",
        ],
      },
      {
        kind: "text",
        text: "Principe : la boucle interne (ex. vitesse ou courant) est 5 à 10 fois plus rapide que l'externe (ex. position). Elle rejette les perturbations locales avant qu'elles n'atteignent la boucle externe, qui voit alors un système « idéalisé » et plus simple à régler. C'est l'architecture standard des variateurs industriels et des axes de robots.",
      },
    ],
  },
  {
    id: "placement-de-poles",
    title: "Placement de pôles",
    level: 3,
    intro:
      "Choisir directement la dynamique de la boucle fermée en imposant ses pôles.",
    blocks: [
      {
        kind: "text",
        text: "En espace d'état avec un retour d'état `u = −K·x`, les pôles de la boucle fermée sont les valeurs propres de `(A − B·K)`. Le placement de pôles consiste à calculer `K` pour imposer ces pôles où on les veut — donc à imposer directement rapidité et amortissement, plutôt que de tâtonner sur des gains.",
      },
      {
        kind: "list",
        items: [
          "On choisit les pôles désirés à partir des specs : partie réelle → temps de réponse, partie imaginaire → amortissement.",
          "Condition : le système doit être commandable (la paire `(A, B)` permet d'atteindre tous les états) — vérifiable par le rang de la matrice de commandabilité.",
          "Limite : le retour d'état suppose tous les états mesurés ; en pratique on les estime avec un observateur (voir section dédiée).",
          "Le placement pur peut demander des commandes irréalistes : le LQR (section suivante) ajoute un arbitrage optimal.",
        ],
      },
    ],
  },
  {
    id: "lqr",
    title: "LQR : la commande optimale quadratique",
    level: 3,
    intro:
      "Le meilleur compromis erreur/effort, calculé automatiquement à partir de deux matrices de pondération.",
    blocks: [
      {
        kind: "text",
        text: "Le LQR minimise le coût `J = ∫(x'·Q·x + u'·R·u)dt` : `Q` pénalise l'écart des états à la consigne, `R` pénalise l'effort de commande. La solution est un retour d'état `u = −K·x` où `K` se calcule en résolvant l'équation de Riccati — un calcul standard, pas un réglage manuel.",
      },
      {
        kind: "fields",
        title: "Régler un LQR : choisir Q et R",
        fields: [
          {
            label: "Q grand devant R",
            value:
              "On privilégie la précision : le contrôleur dépense de l'énergie pour coller à la consigne. Risque : saturation des actionneurs.",
          },
          {
            label: "R grand devant Q",
            value:
              "On privilégie la sobriété : commandes douces, réponse plus lente, moins d'usure. Le choix sûr pour commencer.",
          },
          {
            label: "Règle de Bryson",
            value:
              "Point de départ systématique : `Q_ii = 1 / (écart max toléré sur l'état i)²`, `R_jj = 1 / (commande max sur l'entrée j)²`. On affine ensuite.",
          },
        ],
      },
      {
        kind: "text",
        text: "Forces : optimal pour le critère choisi, multivariable naturel, calculé et non deviné. Limites : modèle linéaire requis, pas de gestion explicite des contraintes (c'est le domaine du MPC), et comme tout retour d'état il lui faut tous les états — d'où l'observateur.",
      },
    ],
  },
  {
    id: "observateurs",
    title: "Observateurs : estimer ce qu'on ne mesure pas",
    level: 3,
    intro:
      "Reconstruire tout l'état à partir de quelques capteurs : l'observateur de Luenberger et le filtre de Kalman.",
    blocks: [
      {
        kind: "text",
        text: "On mesure rarement tout l'état (ex. on mesure la position mais pas la vitesse). L'observateur simule le modèle en parallèle du système réel et corrige sa simulation avec l'écart entre mesure réelle et mesure prédite : `dx̂/dt = A·x̂ + B·u + L·(y − C·x̂)`. Bien réglé (`L` par placement de pôles ou Kalman), l'estimé `x̂` converge vers le vrai état.",
      },
      {
        kind: "fields",
        title: "Deux observateurs de référence",
        fields: [
          {
            label: "Luenberger",
            value:
              "Gain `L` constant choisi par placement de pôles (plus rapides que ceux du système). Simple, déterministe, suffisant quand le modèle est bon et le bruit faible.",
          },
          {
            label: "Filtre de Kalman",
            value:
              "Gain optimal qui minimise l'erreur d'estimation en présence de bruits (modèle et mesure) supposés gaussiens. La référence dès que les capteurs sont bruités — omniprésent en robotique (localisation, fusion).",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : l'observateur doit converger plus vite que la dynamique qu'il sert (pôles 2 à 5 fois plus rapides), sinon le contrôleur pilote sur des estimés en retard. Et le principe de séparation autorise à régler contrôleur et observateur indépendamment dans le cas linéaire.",
      },
    ],
  },
  {
    id: "lyapunov",
    title: "Stabilité de Lyapunov",
    level: 3,
    intro:
      "Prouver la stabilité sans résoudre les équations : la méthode énergétique.",
    blocks: [
      {
        kind: "text",
        text: "Idée : trouver une fonction `V(x)` positive (comme une énergie) qui décroît le long des trajectoires (`dV/dt < 0`). Si une telle fonction existe, l'équilibre est stable — sans avoir résolu l'équation différentielle. C'est l'outil central pour les systèmes non linéaires, où pôles et Bode ne s'appliquent plus.",
      },
      {
        kind: "list",
        items: [
          "Pour les systèmes linéaires, `V(x) = x'·P·x` avec `P` solution de l'équation de Lyapunov : la stabilité se teste par calcul matriciel.",
          "En non-linéaire, trouver `V` est un art : souvent une énergie mécanique (cinétique + potentielle) convient pour les systèmes physiques.",
          "Usage en synthèse : on conçoit parfois le contrôleur pour forcer `dV/dt < 0` (commande de Lyapunov) — la stabilité est alors garantie par construction.",
        ],
      },
    ],
  },
  {
    id: "non-linearites",
    title: "Non-linéarités : saturation, zone morte, hystérésis",
    level: 3,
    intro:
      "Le réel n'est pas linéaire : les quatre non-linéarités qui piègent les contrôleurs.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue des non-linéarités courantes",
        fields: [
          {
            label: "Saturation",
            value:
              "L'actionneur a un maximum : au-delà, la commande n'augmente plus. Provoque le windup de l'intégrale et limite la rapidité réelle. Toujours modélisée et protégée (anti-windup).",
          },
          {
            label: "Zone morte",
            value:
              "En dessous d'un seuil, rien ne bouge (frottement sec, jeu). Crée une erreur statique et des cycles limites : l'intégrale doit la compenser.",
          },
          {
            label: "Hystérésis",
            value:
              "La réponse dépend du sens d'arrivée (jeux d'engrenages, matériaux magnétiques). Rend la modélisation délicate et peut entretenir des oscillations.",
          },
          {
            label: "Jeu (backlash)",
            value:
              "Dans les transmissions, un angle mort au changement de sens : la commande tourne dans le vide avant de mordre. Source classique d'oscillations sur les axes.",
          },
        ],
      },
      {
        kind: "text",
        text: "Stratégie générale : modéliser la non-linéarité dominante si elle est prévisible (compensation par modèle inverse), protéger le correcteur contre ses effets (anti-windup, zones mortes logicielles), et valider en simulation non linéaire avant le réel.",
      },
    ],
  },
  {
    id: "discretisation",
    title: "Discrétisation : du continu au numérique",
    level: 3,
    intro:
      "Le correcteur tourne sur un processeur à pas fixe : convertir sans déstabiliser.",
    blocks: [
      {
        kind: "text",
        text: "Un correcteur conçu en continu `H(p)` doit être converti en algorithme à pas `Te` (période d'échantillonnage). Méthodes : Euler (`x[k+1] = x[k] + Te·f`), Tustin (bilinéaire, conserve mieux la stabilité), ou synthèse directement en discret (`H(z)`). Le choix de `Te` est critique.",
      },
      {
        kind: "fields",
        title: "Choisir la période d'échantillonnage",
        fields: [
          {
            label: "Théorème de Shannon",
            value:
              "Échantillonner à plus de 2 fois la plus haute fréquence utile (`fe > 2·fmax`) : le minimum vital pour ne pas perdre d'information (repliement spectral).",
          },
          {
            label: "Règle pratique du contrôle",
            value:
              "Viser 10 à 20 fois la bande passante de la boucle fermée : en dessous, la discrétisation dégrade les marges et peut déstabiliser.",
          },
          {
            label: "Trop rapide ?",
            value:
              "Un pas très petit augmente le bruit numérique de la dérivée et le coût CPU. Le bon `Te` est un compromis, pas un minimum.",
          },
          {
            label: "Retard de calcul",
            value:
              "Le temps entre mesure et application de la commande est un retard pur qui ronge la marge de phase : le minimiser (priorités temps réel) ou le modéliser.",
          },
        ],
      },
    ],
  },
  {
    id: "retard-pur",
    title: "Le retard pur : l'ennemi silencieux",
    level: 3,
    intro:
      "Un retard dans la boucle déphase sans atténuer : il déstabilise sans prévenir.",
    blocks: [
      {
        kind: "text",
        text: "Un retard pur `τ` (temps de calcul, communication réseau, capteur lent) multiplie la boucle ouverte par `e^(−τ·p)` : le gain est inchangé mais la phase perd `τ·ω` radians à la pulsation `ω`. À haute fréquence, cette perte de phase mange toute la marge — d'où des systèmes stables en théorie qui oscillent en pratique.",
      },
      {
        kind: "list",
        items: [
          "Diagnostic : si le système oscille alors que les marges calculées sont bonnes, suspectez un retard non modélisé (mesurez-le : temps aller-retour d'une consigne test).",
          "Remède structurel : réduire le retard (capteur plus rapide, calcul optimisé, communication directe) — toujours préférable à la compensation.",
          "Remède théorique : le prédicteur de Smith compense un retard connu en simulant le système sans retard dans le correcteur ; sensible aux erreurs de modèle.",
          "Règle : un retard supérieur à ~10 % du temps de réponse visé doit être pris en compte explicitement dans la synthèse.",
        ],
      },
    ],
  },
  {
    id: "robustesse",
    title: "Robustesse : contrôler malgré l'incertain",
    level: 3,
    intro:
      "Le modèle est toujours faux : concevoir un correcteur qui encaisse l'écart.",
    blocks: [
      {
        kind: "text",
        text: "Robuste signifie : stable et performant non pas pour le modèle nominal, mais pour toute une famille de systèmes réels (paramètres incertains, dynamiques négligées, usure). Les marges de gain et de phase sont la première mesure de robustesse : elles quantifient l'erreur de modèle tolérable avant l'instabilité.",
      },
      {
        kind: "list",
        items: [
          "Sources d'incertitude : paramètres qui varient (masse embarquée, température), modes haute fréquence négligés, retards sous-estimés, capteurs qui dérivent.",
          "Stratégie : viser des marges confortables plutôt qu'une performance nominale extrême ; tester en simulation avec le modèle « pire cas » (paramètres aux bornes).",
          "Le compromis performance/robustesse est central : un réglage ultra-agressif sur le modèle nominal est fragile ; un réglage conservateur encaisse le réel.",
          "Méthodes avancées (H∞, μ-synthèse) formalisent ce compromis, mais l'ingénierie courante s'en sort avec marges + tests pire-cas.",
        ],
      },
    ],
  },
  {
    id: "identification-pratique",
    title: "Identification en pratique",
    level: 3,
    intro:
      "Du signal d'excitation au modèle validé : la procédure complète.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir la structure du modèle",
            detail:
              "Premier ou second ordre avec retard pour un PID ; espace d'état d'ordre choisi pour du contrôle moderne. Commencer simple : un modèle trop riche s'ajuste au bruit.",
          },
          {
            title: "Exciter le système",
            detail:
              "Appliquer un signal riche en fréquences : échelons successifs, sinusoïdes balayées (chirp) ou séquence binaire pseudo-aléatoire. Un signal pauvre (un seul échelon lent) n'identifie que le régime qu'il a exploré.",
          },
          {
            title: "Enregistrer proprement",
            detail:
              "Échantillonner assez vite, éviter la saturation pendant l'essai (sinon on identifie la saturation, pas le système), noter les conditions (charge, température).",
          },
          {
            title: "Ajuster les paramètres",
            detail:
              "Moindres carrés (linéaire) ou optimisation non linéaire : minimiser l'écart entre réponse mesurée et réponse du modèle sur l'enregistrement.",
          },
          {
            title: "Valider sur d'autres données",
            detail:
              "Tester le modèle sur un enregistrement différent (autre amplitude, autre profil). S'il prédit bien, il est utilisable pour la synthèse ; sinon, revoir la structure ou l'excitation.",
          },
        ],
      },
    ],
  },
  {
    id: "adaptatif",
    title: "Contrôle adaptatif",
    level: 3,
    intro:
      "Quand le système change en cours de route : estimer et régler en ligne.",
    blocks: [
      {
        kind: "text",
        text: "Le contrôle adaptatif ajuste les paramètres du correcteur en temps réel à partir du comportement observé : un drone qui perd de la masse (largage), un bras dont les frottements changent avec la température. Deux architectures : l'adaptation directe (on ajuste les gains à partir de l'erreur) et l'indirecte (on identifie le modèle en ligne, puis on recalcule le correcteur).",
      },
      {
        kind: "list",
        items: [
          "Condition : une excitation suffisante en permanence — sans variation du signal, l'estimateur n'apprend rien (ou dérive).",
          "Risque : l'adaptation peut elle-même déstabiliser si elle est trop rapide ou mal bornée ; on borne toujours les paramètres adaptés.",
          "Alternative pragmatique : le gain scheduling (section suivante), plus simple et plus prévisible quand les variations sont connues à l'avance.",
        ],
      },
    ],
  },
  {
    id: "flou",
    title: "Contrôle flou",
    level: 3,
    intro:
      "Raisonner avec des règles linguistiques quand le modèle manque : principes et limites.",
    blocks: [
      {
        kind: "text",
        text: "Le contrôle flou remplace les équations par des règles du type « si l'erreur est grande positive et sa variation est petite, alors augmenter fortement la commande ». Les grandeurs sont classées en ensembles flous (petit, moyen, grand avec des degrés d'appartenance), les règles s'évaluent en parallèle, et la défuzzification produit une commande nette.",
      },
      {
        kind: "list",
        items: [
          "Intérêt : formaliser un savoir-faire d'opérateur quand aucun modèle fiable n'existe ; implémentation simple sur microcontrôleur (tables de règles).",
          "Limite : pas de garantie de stabilité systématique, réglage empirique des fonctions d'appartenance, passage à l'échelle difficile au-delà de 2–3 entrées.",
          "En robotique moderne, il a largement cédé la place aux approches à modèle (PID bien réglé, MPC) dès qu'un modèle même grossier existe.",
        ],
      },
    ],
  },
  {
    id: "gain-scheduling",
    title: "Gain scheduling : des gains qui suivent le régime",
    level: 3,
    intro:
      "Un système, plusieurs points de fonctionnement : interpoler les correcteurs.",
    blocks: [
      {
        kind: "text",
        text: "Beaucoup de systèmes changent de comportement selon le régime (un drone à basse vs haute vitesse, un bras selon sa charge). Le gain scheduling découpe l'enveloppe en points de fonctionnement, règle un correcteur linéaire pour chacun, puis interpole (ou commute) les gains en fonction d'une variable mesurée (vitesse, altitude, charge estimée).",
      },
      {
        kind: "list",
        items: [
          "C'est la méthode standard de l'aéronautique et de l'automobile : simple, prévisible, validable point par point.",
          "Condition : des transitions douces entre régimes — une commutation brutale peut exciter des transitoires.",
          "Ce n'est pas du contrôle non linéaire « vrai » : entre les points, on interpole du linéaire. Suffisant quand les variations sont lentes devant la dynamique.",
        ],
      },
    ],
  },
  {
    id: "multivariable",
    title: "Contrôle multivariable",
    level: 3,
    intro:
      "Plusieurs entrées, plusieurs sorties couplées : dépasser le « un PID par axe ».",
    blocks: [
      {
        kind: "text",
        text: "Dès que les axes sont couplés (un quadrirotor : roulis, tangage, lacet et poussée interagissent), des PID indépendants se battent entre eux. Les approches multivariables traitent le système complet : espace d'état (LQR, placement de pôles), MPC, ou découplage (on compense les interactions connues pour retrouver des boucles quasi indépendantes).",
      },
      {
        kind: "list",
        items: [
          "Diagnostic du couplage : la matrice RGA (Relative Gain Array) indique quelles paires entrée/sortie associer si on reste en monovariable.",
          "Le découplage par modèle inverse est puissant mais sensible aux erreurs de modèle : à réserver aux couplages bien connus.",
          "En pratique robotique : LQR/MPC dès que le calcul le permet ; PID découplés + feedforward quand les ressources sont limitées.",
        ],
      },
    ],
  },
  {
    id: "saturation-actionneurs",
    title: "Saturation des actionneurs",
    level: 3,
    intro:
      "Le monde réel a des limites : concevoir en les intégrant, pas en les subissant.",
    blocks: [
      {
        kind: "text",
        text: "Tout actionneur sature : couple max, vitesse max, course limitée. Une synthèse qui l'ignore produit des commandes irréalisables — le système réel sature, l'intégrale s'emballe, la performance s'effondre. Trois réponses : dimensionner l'actionneur pour la tâche (marge de 20–30 % sur le pire cas), intégrer la saturation dans la synthèse (MPC, anti-windup), et borner les consignes (limiteurs de vitesse/accélération sur les trajectoires).",
      },
      {
        kind: "diagram",
        title: "Ce qui se passe à la saturation",
        lines: [
          "Commande demandée ──► [ SATURATION ] ──► commande réelle (plafonnée)",
          "                                                    │",
          "                       l'écart s'accumule dans      │",
          "                       l'intégrale si pas           ▼",
          "                       d'anti-windup ──► WINDUP ──► dépassement",
        ],
      },
    ],
  },
  {
    id: "bruit-mesure",
    title: "Bruit de mesure et filtrage",
    level: 3,
    intro:
      "Aucun capteur n'est parfait : filtrer sans introduire un retard fatal.",
    blocks: [
      {
        kind: "text",
        text: "Le bruit de mesure (électronique, quantification, vibrations) est amplifié par le terme dérivé et excite les modes haute fréquence. Le filtrage (passe-bas du premier ordre, moyenne glissante) atténue le bruit mais introduit un retard de phase qui ronge la marge de stabilité : c'est le compromis central.",
      },
      {
        kind: "fields",
        title: "Stratégies pratiques",
        fields: [
          {
            label: "Filtrer juste ce qu'il faut",
            value:
              "Couper à 5–10 fois la bande passante de la boucle : en dessous on filtre le signal utile, au-dessus on laisse passer le bruit.",
          },
          {
            label: "D sur la mesure, pas sur l'erreur",
            value:
              "Calculer le terme dérivé sur la mesure filtrée évite les à-coups quand la consigne change brusquement (kick de consigne).",
          },
          {
            label: "Choisir le bon capteur",
            value:
              "Un capteur intrinsèquement peu bruité (codeur optique vs potentiomètre) vaut mieux que n'importe quel filtre logiciel.",
          },
          {
            label: "Observateur / Kalman",
            value:
              "Plutôt que dériver une mesure bruitée, estimer la vitesse avec un observateur qui fusionne modèle et mesure : c'est le rôle du filtre de Kalman.",
          },
        ],
      },
    ],
  },
  {
    id: "implementation-numerique",
    title: "Implémentation numérique sur cible contrainte",
    level: 3,
    intro:
      "Faire tourner la boucle sur microcontrôleur : virgule fixe, timing, déterminisme.",
    blocks: [
      {
        kind: "list",
        items: [
          "Virgule flottante ou fixe : le flottant (FPU) simplifie la vie ; en virgule fixe, il faut gérer les échelles et les débordements à la main — source classique de bugs subtils.",
          "Déterminisme temporel : la boucle doit tourner à période strictement constante (timer matériel + interruption prioritaire), sinon le `dt` varie et le correcteur discret se comporte mal.",
          "Coût CPU : un PID tient en quelques microsecondes ; un MPC ou un Kalman étendu peut exiger un processeur applicatif. Mesurer le temps d'exécution pire-cas, pas moyen.",
          "Éviter l'allocation dynamique dans la boucle temps réel : mémoire statique, pas de `malloc` à 1 kHz.",
          "Tester l'implémentation : comparer la sortie du code embarqué à la simulation de référence sur les mêmes entrées (test de non-régression).",
        ],
      },
    ],
  },
  {
    id: "vitesse-position-couple",
    title: "Modes de contrôle : position, vitesse, couple",
    level: 3,
    intro:
      "Trois façons de commander un axe, trois usages robotiques différents.",
    blocks: [
      {
        kind: "table",
        headers: ["Mode", "Consigne", "Usage typique", "Exigence capteur"],
        rows: [
          ["Position", "Angle/position cible", "Bras robotique, pointage précis", "Codeur position"],
          ["Vitesse", "Vitesse cible", "Roues de robot mobile, convoyeurs", "Codeur ou estimateur de vitesse"],
          ["Couple (effort)", "Effort cible", "Interaction avec l'humain, préhension délicate", "Capteur de couple ou estimation par courant"],
        ],
      },
      {
        kind: "text",
        text: "En robotique, on les combine en cascade : une boucle de couple rapide à l'intérieur (sécurité, douceur), une boucle de vitesse au milieu, une boucle de position à l'extérieur. Le mode couple est indispensable dès que le robot touche quelque chose — humain, objet fragile, environnement inconnu — car il rend le robot « compliant » au lieu de rigide.",
      },
    ],
  },
  {
    id: "asservissement-visuel",
    title: "Asservissement visuel (visual servoing)",
    level: 3,
    intro:
      "Fermer la boucle sur l'image : quand le capteur est une caméra.",
    blocks: [
      {
        kind: "text",
        text: "L'asservissement visuel utilise directement des mesures image (position d'un objet dans l'image, points caractéristiques) comme signal d'erreur : le robot bouge pour amener ces mesures vers leurs valeurs désirées. Deux approches : IBVS (image-based : on contrôle dans l'espace image, robuste aux erreurs de calibration) et PBVS (position-based : on estime la pose 3D puis on contrôle en cartésien, sensible à la calibration).",
      },
      {
        kind: "list",
        items: [
          "La matrice d'interaction (jacobienne image) relie vitesse de la caméra et vitesse des points dans l'image : c'est le modèle du système.",
          "Contrainte temps réel : la boucle tourne à la fréquence de la caméra (30–60 Hz typique) — le traitement d'image doit tenir ce budget.",
          "Lien avec la perception : détection et suivi d'objets fournissent les mesures ; le contrôle les exploite. Les deux skills se rejoignent ici.",
        ],
      },
    ],
  },
  {
    id: "impedance-admittance",
    title: "Contrôle en impédance et admittance",
    level: 3,
    intro:
      "Rendre le robot doux au contact : programmer son comportement mécanique.",
    blocks: [
      {
        kind: "text",
        text: "Au lieu d'imposer une position rigide, on impose une relation effort/position : le contrôle en impédance fait se comporter le robot comme un ressort-amortisseur virtuel (`F = K·(x_d − x) + D·(v_d − v)`), le contrôle en admittance fait l'inverse (mesure l'effort, adapte la position). On règle la « raideur » du robot selon la tâche : raide pour usiner, doux pour collaborer avec un humain.",
      },
      {
        kind: "list",
        items: [
          "Applications : assemblage (le robot « sent » l'emboîtement), cobotique (sécurité au contact humain), préhension d'objets fragiles.",
          "Exige une mesure d'effort (capteur de couple ou estimation) et une boucle rapide : l'impédance se joue en millisecondes.",
          "C'est le pont entre contrôle et interaction physique — indispensable dès que le robot quitte sa cage pour travailler près des humains.",
        ],
      },
    ],
  },
  {
    id: "validation",
    title: "Validation et essais",
    level: 3,
    intro:
      "Prouver que ça marche : scénarios, marges, traçabilité.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir les critères d'acceptation",
            detail:
              "Avant les essais : temps de réponse, dépassement max, erreur statique, rejet de perturbation — chiffrés, issus du cahier des charges.",
          },
          {
            title: "Tester le nominal",
            detail:
              "Scénarios d'usage courant, répétés : le système doit tenir ses specs à chaque fois, pas une fois sur deux (répétabilité).",
          },
          {
            title: "Tester les cas limites",
            detail:
              "Charge max, batterie faible, température extrême, perturbations maximales : c'est là que les marges se révèlent — ou pas.",
          },
          {
            title: "Tester les pannes",
            detail:
              "Perte capteur, saturation prolongée, coupure : vérifier les comportements de repli (arrêt sûr, mode dégradé), jamais le blocage.",
          },
          {
            title: "Tracer et archiver",
            detail:
              "Chaque essai est enregistré (consigne, mesure, commande) et archivé avec la version du réglage : sans trace, pas de preuve — et pas de diagnostic en cas de régression.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-controle",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets progressifs pour ancrer la théorie dans la pratique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — PID simulé complet",
            detail:
              "Simuler un système du second ordre (masse-ressort-amortisseur), régler un PID par Ziegler-Nichols puis affiner sur les critères (dépassement < 10 %, erreur statique nulle). Livrable : courbes + tableau de critères.",
          },
          {
            title: "Projet 2 — Asservissement de vitesse réel",
            detail:
              "Sur un moteur DC avec codeur : identifier le modèle (réponse indicielle), régler un PI avec anti-windup, mesurer le rejet de perturbation (freinage manuel). Livrable : comparaison simu/réel.",
          },
          {
            title: "Projet 3 — Contrôleur d'état simulé",
            detail:
              "Pendule inversé : modéliser en espace d'état, concevoir un LQR + observateur, simuler la stabilisation. Livrable : le système tient debout en simulation malgré des perturbations.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-controle",
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
            label: "Feedback Systems (Åström & Murray)",
            value:
              "Le livre de référence : rigoureux, progressif, avec des exemples. Disponible gratuitement en ligne sur le site des auteurs.",
          },
          {
            label: "Underactuated Robotics (MIT)",
            value:
              "Cours en ligne de Russ Tedrake : contrôle moderne appliqué à la robotique, du PID au MPC avec du code.",
          },
          {
            label: "Chaîne « Brian Douglas »",
            value:
              "Vidéos pédagogiques sur le contrôle classique et moderne : une excellente porte d'entrée visuelle avant les livres.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : simuler chaque concept de cette page en Python avant de le considérer comme acquis — le contrôle ne s'apprend pas qu'en lisant.",
          "Communauté : les forums de robotique et les dépôts open source de contrôleurs (ex. implémentations Python de PID/MPC) pour confronter sa compréhension.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Le contrôle maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Appliquer sur ROS 2 : porter un contrôleur simulé en nœud ROS et le tester sur un robot simulé (Gazebo) puis réel.",
          "Brancher la perception : asservissement visuel — fermer la boucle sur une caméra au lieu d'un codeur.",
          "Planifier avant de contrôler : générer des trajectoires optimales puis les faire suivre par vos contrôleurs.",
          "Approfondir les mathématiques : algèbre linéaire et optimisation pour le MPC et le contrôle robuste.",
          "Revenir à la roadmap : valider Contrôle et attaquer la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

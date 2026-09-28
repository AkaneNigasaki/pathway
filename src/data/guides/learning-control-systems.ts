import type { LearningSection } from "../skill-guides";

/**
 * Learning Page d'Asservissement (control systems) : boucles de régulation,
 * correcteurs PID, stabilité et modélisation. Théorie avec schémas et
 * simulations Python/numpy minimales et correctes. Aucune commande terminal :
 * ce sujet n'a pas de CLI.
 */
export const LEARNING_CONTROL_SYSTEMS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est l'asservissement et pourquoi c'est la théorie derrière toute machine fiable.",
    blocks: [
      {
        kind: "text",
        text: "L'asservissement (control systems) est la théorie du contrôle : faire en sorte qu'une machine atteigne précisément sa consigne malgré les perturbations. Un drone qui reste stable face au vent, un moteur qui tourne à vitesse constante sous charge variable, un four qui maintient sa température : tout repose sur l'asservissement.",
      },
      {
        kind: "text",
        text: "L'idée centrale tient en une phrase : mesurer la sortie, comparer à la consigne, corriger l'écart en continu. Cette boucle — mesure, erreur, correction — s'appelle la boucle fermée, et c'est le principe de tout le domaine.",
      },
      {
        kind: "text",
        text: "C'est la théorie qui transforme un prototype en machine fiable : sans elle, on bricole des réglages au hasard ; avec elle, on modélise, on prédit, on garantit la stabilité.",
      },
    ],
  },
  {
    id: "boucle-ouverte-boucle-fermee",
    title: "Boucle ouverte vs boucle fermée",
    level: 1,
    intro: "La distinction fondatrice : corriger à l'aveugle ou corriger en mesurant.",
    blocks: [
      {
        kind: "diagram",
        title: "Les deux architectures",
        lines: [
          "BOUCLE OUVERTE (sans mesure)",
          "Consigne ──► Commande fixe ──► Système ──► Sortie",
          "           (ex. minuteur d'arrosage : on arrose 10 min,",
          "            qu'il pleuve ou qu'il fasse sec)",
          "",
          "BOUCLE FERMÉE (avec mesure)",
          "                        ┌─────────────────────┐",
          "                        │                   ▼",
          "Consigne ──► Erreur ──► Correcteur ──► Système ──► Sortie",
          "    ▲          (consigne - mesure)                  │",
          "    └──────────────────────────────────────────────┘",
          "                        mesure (capteur)",
        ],
      },
      {
        kind: "table",
        headers: ["", "Boucle ouverte", "Boucle fermée"],
        rows: [
          ["Principe", "Commande prédéfinie, aucune vérification", "La sortie est mesurée et comparée à la consigne"],
          ["Perturbations", "Subies : le système dérive sans réagir", "Rejetées : le correcteur compense l'écart"],
          ["Précision", "Dépend de la qualité du modèle initial", "Élevée, même avec un modèle approximatif"],
          ["Risque", "Aucun risque d'instabilité", "Un mauvais réglage peut faire osciller ou diverger le système"],
          ["Exemple", "Machine à laver à programme fixe", "Thermostat, régulateur de vitesse, drone stabilisé"],
        ],
      },
      {
        kind: "text",
        text: "La boucle fermée est plus puissante mais exige un réglage rigoureux : c'est tout l'objet de cette page — comprendre le correcteur PID, la stabilité et la modélisation pour régler des boucles qui convergent au lieu d'osciller.",
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
    intro: "Ce qu'il faut maîtriser avant d'attaquer l'asservissement.",
    blocks: [
      {
        kind: "fields",
        title: "Prérequis",
        fields: [
          {
            label: "Mathématiques de base",
            value: "Dérivées, intégrales, équations différentielles du premier ordre : le PID manipule l'erreur, son intégrale et sa dérivée.",
          },
          {
            label: "Python + numpy",
            value: "Simuler une boucle avant de toucher au matériel : tableaux numpy, boucles, tracés. La simulation est l'atelier de l'automaticien.",
          },
          {
            label: "Électronique (utile)",
            value: "Capteurs, actionneurs, PWM : comprendre ce qui mesure et ce qui agit dans la boucle physique.",
          },
          {
            label: "Systèmes embarqués (utile)",
            value: "Le correcteur tourne sur un microcontrôleur : échantillonnage, temps réel, contraintes de calcul.",
          },
        ],
      },
    ],
  },
  {
    id: "vocabulaire-du-controle",
    title: "Le vocabulaire du contrôle",
    level: 2,
    intro: "Six mots qui structurent tout le domaine.",
    blocks: [
      {
        kind: "fields",
        title: "Vocabulaire",
        fields: [
          {
            label: "Consigne (setpoint)",
            value: "La valeur désirée : 60 °C, 1500 tr/min, 2 mètres d'altitude. C'est l'objectif de la boucle.",
          },
          {
            label: "Mesure",
            value: "La valeur réelle lue par le capteur. Elle est toujours bruitée et légèrement en retard.",
          },
          {
            label: "Erreur",
            value: "Consigne moins mesure. Le correcteur travaille uniquement sur cette erreur : la ramener à zéro.",
          },
          {
            label: "Commande",
            value: "Le signal envoyé à l'actionneur (puissance du chauffage, rapport cyclique PWM du moteur).",
          },
          {
            label: "Perturbation",
            value: "Tout ce qui éloigne le système de sa consigne : une porte qui s'ouvre, une charge qui change, du vent.",
          },
          {
            label: "Système (plant)",
            value: "Le processus à contrôler : moteur, four, drone. On le modélise pour prédire sa réponse.",
          },
        ],
      },
    ],
  },
  {
    id: "la-boucle-fermee",
    title: "La boucle fermée en détail",
    level: 2,
    intro: "Suivre le signal, étape par étape, dans une boucle de régulation.",
    blocks: [
      {
        kind: "diagram",
        title: "Circulation du signal dans une boucle fermée",
        lines: [
          "  Consigne r(t)",
          "      │",
          "      ▼",
          "  ┌───────┐     e(t)     ┌────────────┐    u(t)    ┌─────────┐   y(t)",
          "  │   ⊖   │─────────────►│ Correcteur │──────────►│ Système │─────────►",
          "  └───────┘              └────────────┘           └─────────┘    │",
          "      ▲                                                        │",
          "      │                    mesure ym(t)                        │",
          "      └─────────────────── Capteur ◄───────────────────────────┘",
          "                              │",
          "                       perturbation d(t)",
          "                       (s'ajoute au système)",
        ],
      },
      {
        kind: "text",
        text: "Lecture du schéma : la consigne `r(t)` est comparée à la mesure `ym(t)`, ce qui donne l'erreur `e(t)`. Le correcteur transforme cette erreur en commande `u(t)`. Le système répond en produisant la sortie `y(t)`, que le capteur mesure à nouveau. La perturbation `d(t)` s'ajoute en cours de route : la boucle existe précisément pour la rejeter.",
      },
      {
        kind: "text",
        text: "Point clé : le correcteur ne voit jamais la sortie réelle, seulement la mesure du capteur. Un capteur bruité, lent ou mal calibré limite toute la boucle — d'où l'importance du filtrage et du choix des capteurs.",
      },
    ],
  },
  {
    id: "correcteur-proportionnel",
    title: "Le correcteur proportionnel (P)",
    level: 2,
    intro: "Le correcteur le plus simple : commander proportionnellement à l'erreur.",
    blocks: [
      {
        kind: "text",
        text: "Le correcteur proportionnel applique une commande proportionnelle à l'erreur : `u = Kp × e`. Grande erreur → forte correction ; petite erreur → faible correction. C'est intuitif et c'est le point de départ de tout réglage.",
      },
      {
        kind: "code",
        language: "python",
        title: "Correcteur P sur un système du premier ordre simulé",
        code: `import numpy as np\n\n# Système du 1er ordre : tau * dy/dt + y = K * u\ntau, K = 2.0, 1.0   # constante de temps (s), gain statique\nKp = 1.5            # gain proportionnel\nconsigne = 1.0\n\ndt = 0.01\ny = 0.0\nsorties = []\nfor _ in range(1000):\n    erreur = consigne - y\n    u = Kp * erreur              # loi P : commande proportionnelle à l'erreur\n    y = y + dt / tau * (K * u - y)  # intégration d'Euler du système\n    sorties.append(y)\n\nprint(f"valeur finale : {sorties[-1]:.3f} (consigne : {consigne})")`,
      },
      {
        kind: "text",
        text: "Exécutez ce script et observez : avec un gain `Kp` faible, la réponse est lente ; avec un `Kp` élevé, elle est rapide mais peut osciller. Et notez la valeur finale : elle n'atteint jamais exactement la consigne. Cet écart résiduel s'appelle l'erreur statique — c'est la limite fondamentale du correcteur P pur, et la raison d'être du terme intégral.",
      },
    ],
  },
  {
    id: "correcteur-pid",
    title: "Le correcteur PID",
    level: 2,
    intro: "Proportionnel, Intégral, Dérivé : le correcteur le plus utilisé dans l'industrie.",
    blocks: [
      {
        kind: "text",
        text: "Le PID combine trois actions sur l'erreur : le terme proportionnel réagit à l'erreur présente, le terme intégral accumule l'erreur passée pour éliminer l'erreur statique, le terme dérivé anticipe l'erreur future en regardant sa vitesse de variation.",
      },
      {
        kind: "table",
        headers: ["Terme", "Formule", "Rôle", "Effet d'un gain trop élevé"],
        rows: [
          ["P (proportionnel)", "`Kp × e`", "Réagit à l'erreur actuelle, donne la rapidité", "Oscillations, puis instabilité"],
          ["I (intégral)", "`Ki × ∫e dt`", "Élimine l'erreur statique en accumulant l'erreur", "Réponse lente, dépassement, oscillations"],
          ["D (dérivé)", "`Kd × de/dt`", "Amortit en freinant les variations rapides", "Amplifie le bruit du capteur"],
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Boucle PID discrète (forme utilisable sur microcontrôleur)",
        code: `class PID:\n    def __init__(self, kp, ki, kd, dt):\n        self.kp, self.ki, self.kd = kp, ki, kd\n        self.dt = dt\n        self.integrale = 0.0\n        self.erreur_prec = 0.0\n\n    def update(self, consigne, mesure):\n        erreur = consigne - mesure\n        self.integrale += erreur * self.dt\n        derivee = (erreur - self.erreur_prec) / self.dt\n        self.erreur_prec = erreur\n        return self.kp * erreur + self.ki * self.integrale + self.kd * derivee\n\n# Exemple d'utilisation dans une boucle à période dt\npid = PID(kp=2.0, ki=0.5, kd=0.1, dt=0.01)\ncommande = pid.update(consigne=1.0, mesure=0.7)`,
      },
      {
        kind: "text",
        text: "Cette forme discrète est exactement celle qu'on implémente sur microcontrôleur : à chaque période d'échantillonnage `dt`, on lit la mesure, on calcule l'erreur et on met à jour la commande. Retenez sa structure — les sections avancées (anti-windup, dérivée filtrée) l'améliorent sans la remplacer.",
      },
    ],
  },
  {
    id: "simuler-avec-python",
    title: "Simuler avant de câbler",
    level: 2,
    intro: "La règle d'or : tester le correcteur sur un modèle avant le matériel.",
    blocks: [
      {
        kind: "text",
        text: "On ne règle jamais un PID directement sur le matériel : on modélise le système (même grossièrement), on simule la boucle en Python, on règle les gains en simulation, puis on transfère sur le hardware en restant prudent. La simulation permet d'essayer des gains absurdes sans rien casser.",
      },
      {
        kind: "code",
        language: "python",
        title: "Simulation complète : système du 1er ordre + PID",
        code: `import numpy as np\n\nclass PID:\n    def __init__(self, kp, ki, kd, dt):\n        self.kp, self.ki, self.kd, self.dt = kp, ki, kd, dt\n        self.i = 0.0\n        self.e_prev = 0.0\n    def update(self, r, y):\n        e = r - y\n        self.i += e * self.dt\n        d = (e - self.e_prev) / self.dt\n        self.e_prev = e\n        return self.kp * e + self.ki * self.i + self.kd * d\n\n# --- système : tau*dy/dt + y = K*u ---\ntau, K, dt = 2.0, 1.0, 0.01\npid = PID(kp=3.0, ki=1.0, kd=0.2, dt=dt)\n\ny, t = 0.0, 0.0\nys = []\nfor _ in range(1500):\n    r = 1.0 if t < 7.5 else 0.5   # échelon de consigne à t = 7,5 s\n    u = pid.update(r, y)\n    y = y + dt / tau * (K * u - y)\n    ys.append(y)\n    t += dt\n\nys = np.array(ys)\nprint(f"dépassement : {max(0.0, ys.max() - 1.0) * 100:.1f} %")\nprint(f"erreur finale : {abs(ys[-1] - 0.5):.4f}")`,
      },
      {
        kind: "list",
        items: [
          "Variez `kp`, `ki`, `kd` et observez : rapidité, dépassement, erreur finale, oscillations.",
          "Ajoutez un bruit de mesure (`y_mes = y + bruit`) et regardez le terme dérivé s'affoler : c'est pour ça qu'on le filtre.",
          "Ajoutez une saturation (`u = min(max(u, -2), 2)`) et regardez l'intégrale s'emballer : c'est le windup.",
          "Chaque phénomène observé ici en simulation se retrouvera sur le matériel réel.",
        ],
      },
    ],
  },
  {
    id: "reglage-manuel-des-gains",
    title: "Régler les gains à la main",
    level: 2,
    intro: "Une méthode empirique sûre pour un premier réglage.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Partir de zéro",
            detail: "Mettre `Ki = 0` et `Kd = 0`. Ne régler que le proportionnel d'abord : c'est lui qui donne l'énergie à la boucle.",
          },
          {
            title: "Augmenter Kp jusqu'aux oscillations",
            detail: "Augmenter `Kp` par petits pas. La réponse devient de plus en plus rapide, puis se met à osciller durablement. Noter ce gain critique et reculer nettement en dessous (typiquement moitié).",
          },
          {
            title: "Ajouter l'intégrale doucement",
            detail: "Augmenter `Ki` à partir de zéro jusqu'à éliminer l'erreur statique, sans créer de dépassement excessif. L'intégrale est puissante mais lente : la précipitation crée des oscillations.",
          },
          {
            title: "Ajouter la dérivée en dernier",
            detail: "Augmenter `Kd` par petites touches pour amortir le dépassement. Arrêter dès que le bruit de mesure se fait sentir sur la commande : une dérivée qui s'agite est pire que pas de dérivée.",
          },
          {
            title: "Valider sur des échelons",
            detail: "Tester des changements de consigne dans les deux sens et à différentes amplitudes. Un réglage n'est valable que s'il reste stable partout dans la plage d'utilisation.",
          },
        ],
      },
      {
        kind: "text",
        text: "Cette méthode manuelle suffit pour la majorité des systèmes simples (température, vitesse, position). Les méthodes formelles (Ziegler-Nichols, marges de stabilité) viennent ensuite pour les cas exigeants.",
      },
    ],
  },
  {
    id: "stabilite-en-pratique",
    title: "La stabilité en pratique",
    level: 2,
    intro: "Reconnaître une boucle stable, limite ou instable — à l'œil.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois comportements après un échelon de consigne",
        lines: [
          "STABLE (bien réglé)",
          "  ┌────────────── consigne",
          "  │     ╭───────╯",
          "  │   ╭─╯  petit dépassement puis convergence",
          "──╯───╯",
          "",
          "LIMITE (oscillations entretenues)",
          "  ┌────────────── consigne",
          "  │  ╭╮ ╭╮ ╭╮",
          "──╯──╯╰─╯╰─╯╰──  oscillations qui ne s'amortissent pas",
          "",
          "INSTABLE (divergence)",
          "  ┌────────────── consigne",
          "  │ ╭╮",
          "  │╭╯╰╮ ╭╮",
          "──╯╯  ╰─╯╰──╮  amplitude croissante : ARRÊT D'URGENCE",
        ],
      },
      {
        kind: "text",
        text: "Une boucle stable converge vers la consigne. Une boucle limite oscille indéfiniment — signe d'un gain trop élevé ou d'un retard excessif. Une boucle instable diverge : sur du matériel réel, c'est la casse mécanique ou la surchauffe. D'où la règle : toujours prévoir des butées, des saturations et un arrêt d'urgence avant de fermer une boucle sur du hardware.",
      },
    ],
  },
  {
    id: "filtrer-les-mesures",
    title: "Filtrer les mesures",
    level: 2,
    intro: "Un capteur bruité injecté dans une boucle rend le système instable.",
    blocks: [
      {
        kind: "text",
        text: "Tout capteur réel est bruité : la mesure oscille autour de la vraie valeur. Le terme dérivé du PID, qui calcule une vitesse de variation, amplifie ce bruit énormément — la commande devient saccadée, l'actionneur s'use, la boucle peut osciller.",
      },
      {
        kind: "code",
        language: "python",
        title: "Moyenne glissante : le filtre le plus simple",
        code: `def moyenne_glissante(nouvelle_mesure, historique, n=5):\n    historique.append(nouvelle_mesure)\n    if len(historique) > n:\n        historique.pop(0)\n    return sum(historique) / len(historique)\n\n# Dans la boucle de contrôle :\n# mesure_filtree = moyenne_glissante(mesure_brute, hist)\n# commande = pid.update(consigne, mesure_filtree)`,
      },
      {
        kind: "list",
        items: [
          "Filtrer la mesure avant le PID, jamais après : un filtre sur la commande masque le problème sans le résoudre.",
          "Tout filtre ajoute du retard, et le retard déstabilise : filtrer juste assez pour calmer le bruit, pas plus.",
          "Alternative courante : filtrer uniquement le terme dérivé (dérivée filtrée), en gardant P et I sur la mesure brute.",
          "Si le bruit reste ingérable, le problème est matériel : revoir le capteur, son câblage ou son alimentation.",
        ],
      },
    ],
  },
  {
    id: "saturations-et-limites",
    title: "Saturations et limites",
    level: 2,
    intro: "Le monde réel est borné : la commande aussi doit l'être.",
    blocks: [
      {
        kind: "text",
        text: "Un actionneur réel a des limites : un moteur ne dépasse pas sa vitesse maximale, un chauffage ne produit pas de froid. Quand la commande calculée dépasse ces limites, elle est saturée — et c'est là qu'apparaît le windup : l'intégrale continue d'accumuler l'erreur pendant la saturation, puis met un temps fou à se « désaturer », provoquant un énorme dépassement.",
      },
      {
        kind: "list",
        items: [
          "Toujours saturer la commande dans le code aux limites physiques de l'actionneur.",
          "Ne jamais laisser l'intégrale accumuler pendant une saturation : c'est l'anti-windup (détaillé au niveau 3).",
          "Version minimale : borner l'intégrale elle-même à une valeur maximale raisonnable.",
          "Prévoir des butées logicielles sur la consigne : interdire les consignes hors plage utile.",
        ],
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet : réguler un moteur simulé",
    level: 2,
    intro: "De zéro à une boucle PID qui tient sa consigne de vitesse.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Modéliser le moteur",
            detail: "Reprendre le modèle du premier ordre de la section « Simuler avant de câbler » : il représente correctement un moteur dont la vitesse suit la tension avec un temps de réponse.",
          },
          {
            title: "Fermer la boucle en P seul",
            detail: "Régler `Kp` à la main, observer l'erreur statique. Comprendre physiquement pourquoi elle existe : à l'équilibre, il faut une commande non nulle pour maintenir la vitesse, donc une erreur non nulle.",
          },
          {
            title: "Ajouter l'intégrale",
            detail: "Observer l'erreur statique disparaître. Puis saturer volontairement la commande et observer le windup : le dépassement qui suit.",
          },
          {
            title: "Ajouter la dérivée",
            detail: "Observer l'amortissement du dépassement. Puis ajouter du bruit de mesure et observer la dérivée s'agiter : comprendre pourquoi on la filtre.",
          },
          {
            title: "Tester la robustesse",
            detail: "Changer la consigne brutalement, ajouter une perturbation (une charge soudaine = un échelon sur la sortie). Une bonne boucle rejette la perturbation et revient à la consigne.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro: "Les pièges classiques des premières boucles.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["Gains copiés d'un autre système", "Oscillations ou réponse molle", "Chaque système a ses gains : toujours régler sur le système réel ou son modèle"],
          ["Dérivée sur mesure bruitée non filtrée", "Commande saccadée, actionneur qui vibre", "Filtrer la mesure ou la dérivée"],
          ["Pas d'anti-windup", "Énorme dépassement après une saturation", "Borne l'intégrale, geler l'intégration en saturation"],
          ["Période d'échantillonnage irrégulière", "Comportement erratique", "Boucle à période fixe (timer matériel ou RTOS)"],
          ["Capteur mal placé ou lent", "La boucle « court » après une mesure en retard", "Rapprocher le capteur du phénomène, choisir un capteur adapté"],
          ["Consigne en échelon brutal", "À-coups mécaniques, dépassements", "Rampe de consigne : monter progressivement vers la cible"],
          ["Tester sans butées ni arrêt d'urgence", "Casse matérielle en cas d'instabilité", "Saturations logicielles + arrêt d'urgence avant le premier essai"],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "modelisation",
    title: "Modéliser un système",
    level: 3,
    intro: "Décrire le système par des équations pour prédire avant de régler.",
    blocks: [
      {
        kind: "text",
        text: "Modéliser, c'est écrire l'équation qui relie la commande à la sortie. On n'a pas besoin d'un modèle parfait : un modèle simple qui capture l'essentiel (gain, temps de réponse, retard) suffit pour régler correctement.",
      },
      {
        kind: "fields",
        title: "Les trois modèles de base",
        fields: [
          {
            label: "Gain pur : `y = K × u`",
            value: "La sortie suit instantanément la commande. Rare en pratique, utile comme première approximation.",
          },
          {
            label: "Premier ordre : `tau × dy/dt + y = K × u`",
            value: "Le système le plus courant : moteur (vitesse), four (température), réservoir (niveau). Deux paramètres : le gain `K` et la constante de temps `tau`.",
          },
          {
            label: "Second ordre",
            value: "Systèmes avec inertie et rappel : masse-ressort, bras articulé. Peuvent osciller naturellement — le réglage doit amortir ces oscillations propres.",
          },
          {
            label: "Retard pur",
            value: "Un délai entre la commande et le début de la réponse (transport, communication). Le retard est l'ennemi n° 1 de la stabilité : il limite les gains utilisables.",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode : partir du premier ordre + retard. Si la simulation colle aux mesures réelles, le modèle suffit. Sinon, affiner — jamais l'inverse (un modèle compliqué non validé est pire qu'un modèle simple validé).",
      },
    ],
  },
  {
    id: "fonction-de-transfert",
    title: "La fonction de transfert",
    level: 3,
    intro: "L'outil mathématique central : décrire un système par une fraction.",
    blocks: [
      {
        kind: "text",
        text: "La transformée de Laplace convertit les équations différentielles en équations algébriques : dériver devient « multiplier par s ». La fonction de transfert `H(s) = Sortie(s) / Entrée(s)` décrit alors complètement un système linéaire.",
      },
      {
        kind: "fields",
        title: "Lecture d'une fonction de transfert",
        fields: [
          {
            label: "Exemple : `H(s) = K / (tau×s + 1)`",
            value: "C'est le premier ordre : gain statique `K`, constante de temps `tau`. À `s = 0` (régime permanent), `H = K`.",
          },
          {
            label: "Pôles",
            value: "Les valeurs de `s` qui annulent le dénominateur. Un pôle à partie réelle positive = système instable en boucle ouverte. La stabilité se lit dans les pôles.",
          },
          {
            label: "Zéros",
            value: "Les valeurs qui annulent le numérateur. Ils modifient la forme de la réponse sans toucher à la stabilité.",
          },
          {
            label: "Pourquoi c'est utile",
            value: "Composer des systèmes devient une multiplication de fractions ; analyser la stabilité devient un calcul de pôles. Tout l'arsenal fréquentiel (Bode, marges) en découle.",
          },
        ],
      },
    ],
  },
  {
    id: "systemes-premier-ordre",
    title: "Les systèmes du premier ordre",
    level: 3,
    intro: "Le modèle le plus utile : deux paramètres, une réponse sans oscillation.",
    blocks: [
      {
        kind: "text",
        text: "Un système du premier ordre répond à un échelon en montant exponentiellement vers sa valeur finale, sans jamais osciller. Deux paramètres le décrivent entièrement : le gain statique `K` (la valeur finale pour une commande unité) et la constante de temps `tau` (la rapidité).",
      },
      {
        kind: "list",
        items: [
          "Après `1 × tau`, la sortie a parcouru 63 % du chemin ; après `3 × tau`, 95 % ; après `5 × tau`, 99 %.",
          "Exemples : vitesse d'un moteur, température d'un four, niveau d'un réservoir, charge d'un condensateur.",
          "En boucle fermée avec un simple P, un premier ordre ne peut pas osciller — c'est le système idéal pour débuter.",
          "L'ajout d'un retard ou d'une dynamique de capteur peut cependant le rendre oscillant : d'où l'importance de modéliser aussi la mesure.",
        ],
      },
    ],
  },
  {
    id: "systemes-second-ordre",
    title: "Les systèmes du second ordre",
    level: 3,
    intro: "Inertie + rappel = oscillations naturelles à amortir.",
    blocks: [
      {
        kind: "text",
        text: "Un système du second ordre combine une inertie (masse, inductance) et un rappel (ressort, gravité) : il peut osciller par lui-même. Sa réponse dépend de deux paramètres : la pulsation propre (sa fréquence naturelle d'oscillation) et l'amortissement (à quelle vitesse les oscillations s'éteignent).",
      },
      {
        kind: "table",
        headers: ["Amortissement", "Réponse à un échelon", "Commentaire"],
        rows: [
          ["Faible", "Oscillations marquées avant convergence", "Système « nerveux » : le correcteur doit amortir"],
          ["Critique", "Convergence la plus rapide sans dépassement", "L'idéal théorique, difficile à tenir en pratique"],
          ["Fort", "Convergence lente, sans dépassement", "Système « mou » : le correcteur doit accélérer"],
        ],
      },
      {
        kind: "text",
        text: "Exemples : position d'un bras articulé, suspension d'un véhicule, asservissement de position d'un moteur avec charge inertielle. Le terme dérivé du PID existe largement pour amortir ces systèmes.",
      },
    ],
  },
  {
    id: "identification-parametres",
    title: "Identifier les paramètres d'un système",
    level: 3,
    intro: "Mesurer le système réel pour calibrer le modèle.",
    blocks: [
      {
        kind: "text",
        text: "L'identification consiste à appliquer une commande connue au système réel et à mesurer sa réponse, pour en déduire les paramètres du modèle (gain, constante de temps, retard).",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Appliquer un échelon",
            detail: "Passer la commande d'une valeur à une autre (en boucle ouverte, en sécurité) et enregistrer la réponse du capteur en fonction du temps.",
          },
          {
            title: "Lire le gain statique",
            detail: "Le rapport entre la variation finale de la sortie et la variation de la commande donne `K`.",
          },
          {
            title: "Lire la constante de temps",
            detail: "Le temps pour parcourir 63 % du chemin vers la valeur finale donne `tau` (pour un premier ordre).",
          },
          {
            title: "Lire le retard",
            detail: "Le délai entre le changement de commande et le début de la réponse donne le retard pur.",
          },
          {
            title: "Valider le modèle",
            detail: "Simuler le modèle identifié et comparer à une autre mesure réelle. Si les courbes se superposent, le modèle est bon.",
          },
        ],
      },
    ],
  },
  {
    id: "lieu-des-racines",
    title: "Le lieu des racines",
    level: 3,
    intro: "Visualiser comment les pôles bougent quand le gain augmente.",
    blocks: [
      {
        kind: "text",
        text: "Le lieu des racines (root locus) trace la trajectoire des pôles de la boucle fermée quand le gain du correcteur varie de zéro à l'infini. C'est un outil de conception : on choisit le gain pour placer les pôles où l'on veut la dynamique.",
      },
      {
        kind: "list",
        items: [
          "Tant que tous les pôles restent à partie réelle négative, la boucle est stable.",
          "Quand une branche traverse l'axe imaginaire, c'est le gain critique : au-delà, instabilité.",
          "Des pôles proches de l'axe imaginaire = oscillations peu amorties ; des pôles très à gauche = réponse rapide.",
          "En pratique, on l'utilise pour comprendre, puis on règle en simulation et sur le terrain.",
        ],
      },
    ],
  },
  {
    id: "diagramme-de-bode",
    title: "Le diagramme de Bode",
    level: 3,
    intro: "Analyser la boucle dans le domaine fréquentiel.",
    blocks: [
      {
        kind: "text",
        text: "Le diagramme de Bode trace le gain et la phase de la boucle ouverte en fonction de la fréquence. Il répond à la question : « pour une consigne qui oscille à telle fréquence, comment la boucle réagit-elle ? »",
      },
      {
        kind: "fields",
        title: "Lecture du diagramme",
        fields: [
          {
            label: "Gain",
            value: "Combien la boucle amplifie chaque fréquence. Au-delà de la fréquence de coupure, le gain chute : la boucle ne suit plus.",
          },
          {
            label: "Phase",
            value: "Le retard introduit à chaque fréquence. Quand le déphasage atteint 180° avec un gain supérieur à 1, la contre-réaction devient une réaction positive : oscillation.",
          },
          {
            label: "Fréquence de coupure",
            value: "La fréquence où le gain vaut 1 : elle fixe la rapidité de la boucle. Plus elle est haute, plus la boucle est rapide — et proche de l'instabilité.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le diagramme de Bode est l'outil standard de l'industrie pour régler des boucles exigeantes : il quantifie exactement la distance à l'instabilité via les marges.",
      },
    ],
  },
  {
    id: "marges-de-stabilite",
    title: "Les marges de stabilité",
    level: 3,
    intro: "Quantifier la distance à l'instabilité.",
    blocks: [
      {
        kind: "table",
        headers: ["Marge", "Définition", "Interprétation"],
        rows: [
          ["Marge de gain", "De combien on peut multiplier le gain avant l'instabilité", "Une marge faible = la boucle oscille dès qu'un paramètre dérive"],
          ["Marge de phase", "De combien de degrés de phase on dispose avant l'instabilité", "Une marge faible = réponse oscillante ; une marge confortable = réponse bien amortie"],
        ],
      },
      {
        kind: "text",
        text: "L'intérêt des marges : elles garantissent la robustesse. Un système réel dérive (température, usure, charge) : des marges confortables assurent que la boucle reste stable malgré ces variations. Régler sans marges, c'est régler pour le laboratoire, pas pour le terrain.",
      },
    ],
  },
  {
    id: "reglage-ziegler-nichols",
    title: "La méthode Ziegler-Nichols",
    level: 3,
    intro: "La méthode de réglage empirique la plus citée.",
    blocks: [
      {
        kind: "text",
        text: "Publiée en 1942 par Ziegler et Nichols, cette méthode donne des gains de départ à partir d'un essai : on augmente le gain proportionnel jusqu'aux oscillations entretenues (gain critique `Ku`, période `Tu`), puis on calcule `Kp`, `Ki`, `Kd` avec des formules tabulées.",
      },
      {
        kind: "list",
        items: [
          "Avantage : systématique, pas de modèle requis, un seul essai suffit.",
          "Inconvénient : elle vise une réponse assez oscillante (dépassement notable) — il faut souvent adoucir ensuite.",
          "Variante plus sûre : la méthode de la réponse indicielle, qui identifie gain, temps de réponse et retard sans pousser le système à l'oscillation.",
          "En pratique moderne : on s'en sert comme point de départ, puis on affine en simulation et sur le terrain.",
        ],
      },
    ],
  },
  {
    id: "correcteur-pi",
    title: "Le correcteur PI",
    level: 3,
    intro: "Quand la dérivée est inutile ou nuisible.",
    blocks: [
      {
        kind: "text",
        text: "Dans beaucoup d'applications industrielles (température, niveau, débit), on utilise un PI — sans terme dérivé. La dérivée n'apporte rien quand le système est déjà lent et que la mesure est bruitée : elle ne ferait qu'amplifier le bruit.",
      },
      {
        kind: "list",
        items: [
          "PI : le choix par défaut pour les procédés lents (thermique, chimie, hydraulique).",
          "PID complet : quand il faut de la rapidité et de l'amortissement (moteurs, drones, asservissements de position).",
          "P seul : quand une erreur statique est acceptable (rare) ou comme première étape de réglage.",
          "Moins de termes = moins de paramètres à régler et moins de sensibilité au bruit : la simplicité est une qualité.",
        ],
      },
    ],
  },
  {
    id: "derivee-filtree",
    title: "La dérivée filtrée",
    level: 3,
    intro: "Rendre le terme D utilisable en pratique.",
    blocks: [
      {
        kind: "text",
        text: "La dérivée pure amplifie le bruit haute fréquence sans limite. En pratique, on utilise toujours une dérivée filtrée : la dérivation est combinée à un filtre passe-bas qui atténue les hautes fréquences.",
      },
      {
        kind: "code",
        language: "python",
        title: "Dérivée filtrée (forme discrète complète)",
        code: `class DeriveeFiltree:\n    def __init__(self, kd, tau_f, dt):\n        self.kd = kd\n        self.dt = dt\n        self.alpha = tau_f / (tau_f + dt)  # tau_f : constante du filtre\n        self.d_filt = 0.0\n        self.e_prev = 0.0\n\n    def update(self, erreur):\n        d_brut = (erreur - self.e_prev) / self.dt\n        self.e_prev = erreur\n        # Passe-bas du 1er ordre sur la dérivée brute\n        self.d_filt = self.alpha * self.d_filt + (1 - self.alpha) * d_brut\n        return self.kd * self.d_filt`,
      },
      {
        kind: "text",
        text: "L'idée à retenir plutôt que le code : `D_filtré = D_brut filtré par un passe-bas`. La constante du filtre se choisit petite devant la dynamique utile (pour ne pas ralentir la boucle) mais assez grande pour calmer le bruit. C'est un compromis, comme tout en automatique.",
      },
    ],
  },
  {
    id: "anti-windup-detail",
    title: "L'anti-windup en détail",
    level: 3,
    intro: "Empêcher l'intégrale de s'emballer pendant les saturations.",
    blocks: [
      {
        kind: "text",
        text: "Le windup : quand la commande sature (l'actionneur est à fond), l'erreur ne peut pas se résorber, mais l'intégrale continue d'accumuler. Au moment où l'erreur change de signe, l'intégrale est énorme et met un temps fou à se vider — d'où un dépassement massif.",
      },
      {
        kind: "table",
        headers: ["Technique", "Principe", "Commentaire"],
        rows: [
          ["Gel de l'intégration (clamping)", "On n'intègre que si la commande n'est pas saturée, ou si l'erreur tend à désaturer", "Simple, efficace, la plus utilisée"],
          ["Borne sur l'intégrale", "On limite la valeur absolue de l'intégrale", "Facile mais moins fine : la borne doit être choisie avec soin"],
          ["Back-calculation", "On réinjecte l'écart entre commande saturée et non saturée pour vider l'intégrale", "Plus élégante, un paramètre de plus à régler"],
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Anti-windup par gel de l'intégration",
        code: `class PIDAntiWindup:\n    def __init__(self, kp, ki, kd, dt, u_min, u_max):\n        self.kp, self.ki, self.kd = kp, ki, kd\n        self.dt, self.u_min, self.u_max = dt, u_min, u_max\n        self.i = 0.0\n        self.e_prev = 0.0\n\n    def update(self, r, y):\n        e = r - y\n        u_p = self.kp * e\n        u_d = self.kd * (e - self.e_prev) / self.dt\n        self.e_prev = e\n        # N'intégrer que si ça ne sature pas (ou si ça désature)\n        u_sans_i = u_p + u_d + self.ki * (self.i + e * self.dt)\n        if self.u_min <= u_sans_i <= self.u_max:\n            self.i += e * self.dt\n        u = u_p + self.ki * self.i + u_d\n        return max(self.u_min, min(self.u_max, u))`,
      },
    ],
  },
  {
    id: "ponderation-de-consigne",
    title: "La pondération de consigne",
    level: 3,
    intro: "Éviter les à-coups quand la consigne change brutalement.",
    blocks: [
      {
        kind: "text",
        text: "Quand la consigne fait un saut brutal, l'erreur fait un saut brutal, et les termes P et D produisent un pic de commande violent — un « kick » qui secoue la mécanique. La pondération de consigne applique le P et le D non pas sur l'erreur, mais sur une consigne filtrée ou partielle.",
      },
      {
        kind: "list",
        items: [
          "Technique simple : ne pas appliquer la dérivée sur la consigne, seulement sur la mesure (la consigne en échelon a une dérivée infinie).",
          "Alternative : faire suivre à la consigne une rampe ou un filtre du premier ordre — la boucle poursuit une cible douce.",
          "C'est particulièrement important en robotique et en motorisation : les à-coups usent la mécanique.",
        ],
      },
    ],
  },
  {
    id: "controle-en-cascade",
    title: "Le contrôle en cascade",
    level: 3,
    intro: "Deux boucles imbriquées : une rapide à l'intérieur, une précise à l'extérieur.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure d'une cascade",
        lines: [
          "Consigne position",
          "      │",
          "      ▼",
          "┌─────────────┐  consigne vitesse  ┌─────────────┐",
          "│ Boucle      │───────────────────►│ Boucle      │──► Moteur",
          "│ externe     │   (rapide)         │ interne     │",
          "│ (position)  │◄───────────────────│ (vitesse)   │",
          "└─────────────┘  mesure vitesse    └─────────────┘",
          "      ▲",
          "      │ mesure position",
          "      └──────────────────",
        ],
      },
      {
        kind: "text",
        text: "La boucle interne (vitesse) est rapide et rejette les perturbations locales (frottements, variations de charge) ; la boucle externe (position) est plus lente et donne sa consigne à la boucle interne. Chaque boucle se règle séparément, de l'intérieur vers l'extérieur.",
      },
      {
        kind: "text",
        text: "Applications : asservissements de position (la quasi-totalité des axes motorisés industriels), contrôle de température avec boucle de puissance interne, drones (boucle d'attitude interne, boucle de position externe).",
      },
    ],
  },
  {
    id: "commande-par-anticipation",
    title: "La commande par anticipation (feedforward)",
    level: 3,
    intro: "Agir avant l'erreur plutôt qu'après.",
    blocks: [
      {
        kind: "text",
        text: "La boucle fermée réagit à l'erreur : elle corrige après que l'écart est apparu. Le feedforward fait l'inverse : si on connaît à l'avance l'effort nécessaire (une charge à soulever, une consigne qui change), on l'applique directement, sans attendre l'erreur.",
      },
      {
        kind: "list",
        items: [
          "Exemple : pour maintenir un bras à l'horizontale, on connaît le couple de gravité — on l'ajoute directement à la commande, la boucle ne corrige que le résidu.",
          "Le feedforward ne peut pas stabiliser seul : il s'ajoute toujours à une boucle fermée qui garantit la stabilité et rejette l'imprévu.",
          "C'est la combinaison gagnante en robotique : modèle (feedforward) + boucle (feedback) = précision et robustesse.",
        ],
      },
    ],
  },
  {
    id: "discretisation",
    title: "La discrétisation : le temps échantillonné",
    level: 3,
    intro: "Le correcteur numérique ne voit le monde que par échantillons.",
    blocks: [
      {
        kind: "text",
        text: "Sur microcontrôleur, la boucle tourne à période fixe `Te` (période d'échantillonnage) : lire le capteur, calculer, commander, attendre. Entre deux échantillons, le système évolue sans surveillance.",
      },
      {
        kind: "fields",
        title: "Choisir la période d'échantillonnage",
        fields: [
          {
            label: "Règle pratique",
            value: "Échantillonner 10 à 20 fois plus vite que la dynamique du système (sa bande passante). Un système qui répond en 1 s se contrôle à 10-20 ms.",
          },
          {
            label: "Trop lent",
            value: "Le retard d'échantillonnage déstabilise : la boucle voit un monde en retard et sur-corrige.",
          },
          {
            label: "Trop rapide",
            value: "Calculs inutiles, bruit amplifié par la dérivée discrète, charge CPU gaspillée.",
          },
          {
            label: "Régularité",
            value: "La période doit être constante (timer matériel, RTOS). Une période irrégulière fausse l'intégrale et la dérivée.",
          },
        ],
      },
    ],
  },
  {
    id: "non-linearites",
    title: "Les non-linéarités",
    level: 3,
    intro: "Le monde réel n'est pas linéaire : saturation, zone morte, hystérésis.",
    blocks: [
      {
        kind: "table",
        headers: ["Non-linéarité", "Description", "Effet sur la boucle"],
        rows: [
          ["Saturation", "L'actionneur a une valeur maximale", "Windup de l'intégrale si non traitée"],
          ["Zone morte", "Petites commandes sans effet (jeu mécanique, seuil)", "Erreur statique ou oscillations limites autour de zéro"],
          ["Hystérésis", "La réponse dépend du sens de variation", "Cycles limites possibles"],
          ["Frottement sec", "Force qui s'oppose au mouvement, discontinue à vitesse nulle", "Erreur de position, à-coups au démarrage"],
          ["Quantification", "Capteur ou commande à pas discrets", "Oscillations d'amplitude d'un pas autour de la consigne"],
        ],
      },
      {
        kind: "text",
        text: "La théorie linéaire (fonctions de transfert, Bode) suppose un système linéaire. En pratique, on linéarise autour du point de fonctionnement et on traite les non-linéarités comme des perturbations — ou on les compense explicitement (zone morte compensée, feedforward de frottement).",
      },
    ],
  },
  {
    id: "estimation-et-observateurs",
    title: "Estimation : mesurer l'inmesurable",
    level: 3,
    intro: "Quand la grandeur à contrôler n'est pas directement mesurable.",
    blocks: [
      {
        kind: "text",
        text: "On ne peut pas toujours mesurer ce qu'on veut contrôler : la vitesse se déduit de la position, l'état interne d'une batterie se déduit de sa tension et de son courant. Un observateur (ou estimateur) reconstruit ces grandeurs cachées à partir des mesures disponibles et d'un modèle.",
      },
      {
        kind: "list",
        items: [
          "Principe : simuler le modèle en parallèle du système réel, et corriger la simulation avec l'écart entre mesure réelle et mesure simulée.",
          "Si le modèle est bon et la correction bien réglée, l'état estimé converge vers l'état réel.",
          "Applications : estimation de vitesse sans capteur de vitesse, estimation d'état de charge d'une batterie, navigation inertielle.",
          "Le filtre de Kalman est l'observateur optimal quand le bruit est gaussien — voir la section suivante.",
        ],
      },
    ],
  },
  {
    id: "filtre-de-kalman",
    title: "Le filtre de Kalman",
    level: 3,
    intro: "L'estimateur optimal : fusionner modèle et mesures en tenant compte de leurs incertitudes.",
    blocks: [
      {
        kind: "text",
        text: "Le filtre de Kalman combine deux sources d'information : la prédiction du modèle (qui dérive avec le temps) et la mesure du capteur (qui est bruitée). À chaque pas, il pondère les deux selon leur fiabilité respective : on fait plus confiance à la source la moins incertaine.",
      },
      {
        kind: "fields",
        title: "Les deux étapes, en boucle",
        fields: [
          {
            label: "Prédiction",
            value: "Le modèle fait évoluer l'état estimé et son incertitude : l'incertitude grandit (on est moins sûr en prédisant qu'en mesurant).",
          },
          {
            label: "Mise à jour",
            value: "La mesure arrive : on corrige l'estimation proportionnellement à l'écart entre mesure et prédiction, d'autant plus que la mesure est fiable.",
          },
          {
            label: "Gain de Kalman",
            value: "Le coefficient de pondération, recalculé à chaque pas : il règle automatiquement la confiance entre modèle et mesure.",
          },
        ],
      },
      {
        kind: "text",
        text: "Usages typiques en contrôle : filtrer une mesure bruitée avant le PID, estimer la vitesse à partir d'un codeur de position, fusionner accéléromètre et gyroscope pour l'attitude d'un drone. C'est un outil puissant mais qui exige un modèle correct et des bruits bien caractérisés.",
      },
    ],
  },
  {
    id: "regulation-de-temperature",
    title: "Cas pratique : régulation de température",
    level: 3,
    intro: "Le système lent par excellence : four, imprimante 3D, serre.",
    blocks: [
      {
        kind: "text",
        text: "La température est un système lent (constante de temps de plusieurs minutes), sans oscillation naturelle, avec un actionneur souvent unidirectionnel (on chauffe mais on ne refroidit pas activement). Le PI suffit largement ; la dérivée est inutile.",
      },
      {
        kind: "list",
        items: [
          "Capteur : thermistance, sonde PT100 ou thermocouple selon la plage — placé là où la température compte, pas à côté du chauffage.",
          "Actionneur : résistance chauffante pilotée en tout-ou-rien à période fixe (PWM lent) ou en gradateur.",
          "Anti-windup indispensable : le chauffage sature souvent (à fond pendant la montée en température).",
          "Astuce : une consigne en rampe évite le dépassement sur les systèmes très lents.",
        ],
      },
    ],
  },
  {
    id: "regulation-de-position",
    title: "Cas pratique : asservissement de position",
    level: 3,
    intro: "Bras robotique, axe de machine : précision et amortissement.",
    blocks: [
      {
        kind: "text",
        text: "Un asservissement de position contrôle l'angle ou la position linéaire d'un axe motorisé. Le système est typiquement du second ordre (inertie de la charge) : le PID complet se justifie, souvent en cascade (boucle de vitesse interne, boucle de position externe).",
      },
      {
        kind: "list",
        items: [
          "Capteur : codeur incrémental ou absolu sur l'axe — la résolution du codeur fixe la précision atteignable.",
          "La gravité et les frottements se compensent en feedforward pour soulager la boucle.",
          "Les butées mécaniques et logicielles sont obligatoires : un axe qui s'emballe casse.",
          "La trajectoire (profil de vitesse trapézoïdal) donne de meilleurs résultats qu'un échelon de consigne brutal.",
        ],
      },
    ],
  },
  {
    id: "regulation-de-vitesse",
    title: "Cas pratique : régulation de vitesse",
    level: 3,
    intro: "Moteurs, ventilateurs, convoyeurs : tenir une vitesse sous charge variable.",
    blocks: [
      {
        kind: "text",
        text: "La vitesse d'un moteur suit un modèle du premier ordre : c'est le cas d'école du PID. La perturbation typique est la charge : quand elle augmente, la vitesse chute, la boucle compense en augmentant la commande.",
      },
      {
        kind: "list",
        items: [
          "Mesure de vitesse : codeur (précis, cher) ou force contre-électromotrice / capteur à effet Hall (simple, moins précis).",
          "Le PI suffit souvent ; le D aide si la charge varie brutalement.",
          "Attention au démarrage : un moteur à l'arrêt demande un courant élevé — limiter la commande au démarrage.",
          "En cascade, la boucle de vitesse devient la boucle interne d'un asservissement de position.",
        ],
      },
    ],
  },
  {
    id: "stabilisation-drone",
    title: "Cas pratique : stabilisation d'un drone",
    level: 3,
    intro: "Le système instable par nature : sans boucle, il ne vole pas.",
    blocks: [
      {
        kind: "text",
        text: "Un quadrirotor est instable en boucle ouverte : sans correction permanente, il bascule et s'écrase en une fraction de seconde. La stabilisation exige des boucles rapides (plusieurs centaines de Hz) sur l'attitude (roulis, tangage, lacet).",
      },
      {
        kind: "fields",
        title: "L'architecture typique",
        fields: [
          {
            label: "Boucle interne (attitude)",
            value: "IMU (accéléromètre + gyroscope fusionnés, souvent par filtre de Kalman) → PID rapide → vitesses moteurs. Tourne à haute fréquence.",
          },
          {
            label: "Boucle externe (position/altitude)",
            value: "GPS, baromètre, capteur optique → correcteur plus lent → consignes d'attitude pour la boucle interne. C'est une cascade.",
          },
          {
            label: "Contraintes",
            value: "Latence minimale (chaque milliseconde compte), code temps réel strict, redondance des capteurs critiques.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le drone illustre tous les concepts de cette page : cascade, estimation, filtrage, échantillonnage rapide, saturations (les moteurs ont une poussée maximale). C'est le projet final naturel d'un parcours asservissement + embarqué.",
      },
    ],
  },
  {
    id: "capteurs-pour-la-boucle",
    title: "Les capteurs d'une boucle",
    level: 3,
    intro: "La boucle ne vaut que sa mesure : choisir le bon capteur.",
    blocks: [
      {
        kind: "table",
        headers: ["Grandeur", "Capteurs courants", "Points d'attention"],
        rows: [
          ["Position / angle", "Codeur incrémental ou absolu, potentiomètre", "Résolution, jeu mécanique, bruit en dérivation"],
          ["Vitesse", "Codeur + dérivation, capteur Hall, tachymètre", "La dérivation amplifie le bruit : filtrer"],
          ["Température", "Thermistance, PT100, thermocouple", "Temps de réponse du capteur lui-même, placement"],
          ["Pression / force", "Jauges de contrainte, capteurs piézo", "Calibration, dérive thermique"],
          ["Attitude", "IMU (accéléro + gyro), magnétomètre", "Fusion nécessaire, dérive du gyroscope"],
          ["Distance", "Ultrasons, infrarouge, LiDAR", "Portée, bruit, sensibilité à l'environnement"],
        ],
      },
      {
        kind: "text",
        text: "Critères de choix : plage de mesure, précision, bande passante (le capteur doit être plus rapide que la boucle), bruit, coût. Un capteur lent ou bruité plafonne les performances quelle que soit la qualité du correcteur.",
      },
    ],
  },
  {
    id: "actionneurs",
    title: "Les actionneurs",
    level: 3,
    intro: "Ce qui transforme la commande en action physique.",
    blocks: [
      {
        kind: "table",
        headers: ["Actionneur", "Commande", "Usage typique"],
        rows: [
          ["Moteur à courant continu", "Tension ou PWM", "Vitesse, position (avec réducteur et codeur)"],
          ["Moteur pas à pas", "Séquence de pas", "Positionnement précis en boucle ouverte ou fermée"],
          ["Servomoteur", "Signal PWM de position", "Modélisme, petites articulations"],
          ["Résistance chauffante", "Tout-ou-rien ou PWM lent", "Régulation thermique"],
          ["Vanne / pompe", "Ouverture proportionnelle", "Débit, niveau, pression"],
          ["Vérin", "Pression / débit", "Efforts importants, industrie"],
        ],
      },
      {
        kind: "text",
        text: "Le PWM (modulation de largeur d'impulsion) est la commande universelle des actionneurs électriques : on fait varier le rapport cyclique d'un signal carré pour moduler la puissance moyenne. Simple, efficace, générable par n'importe quel microcontrôleur.",
      },
    ],
  },
  {
    id: "rejet-des-perturbations",
    title: "Le rejet des perturbations",
    level: 3,
    intro: "La vraie raison d'être de la boucle fermée.",
    blocks: [
      {
        kind: "text",
        text: "Suivre une consigne, une boucle ouverte bien calibrée sait le faire. Ce qu'elle ne sait pas faire, c'est rejeter les perturbations : la charge qui change, la porte qui s'ouvre, le vent qui se lève. La boucle fermée existe pour ça.",
      },
      {
        kind: "list",
        items: [
          "Le terme intégral est le champion du rejet des perturbations constantes : il accumule l'erreur jusqu'à compenser exactement la perturbation.",
          "La rapidité de la boucle fixe quelles perturbations sont rejetées : seules celles plus lentes que la boucle sont bien compensées.",
          "Si une perturbation est mesurable, on peut l'anticiper en feedforward au lieu de la subir.",
          "Tester le rejet des perturbations fait partie de la validation : appliquer un échelon de perturbation et mesurer l'écart maximal et le temps de retour.",
        ],
      },
    ],
  },
  {
    id: "indicateurs-de-performance",
    title: "Les indicateurs de performance",
    level: 3,
    intro: "Mesurer la qualité d'une boucle avec des critères objectifs.",
    blocks: [
      {
        kind: "table",
        headers: ["Indicateur", "Définition", "Ce qu'il révèle"],
        rows: [
          ["Temps de montée", "Temps pour passer de 10 % à 90 % de la consigne", "La rapidité de la boucle"],
          ["Dépassement", "Le maximum atteint au-delà de la consigne, en %", "L'amortissement : trop = oscillant"],
          ["Temps d'établissement", "Temps pour rester dans ±5 % (ou ±2 %) de la consigne", "La rapidité utile, dépassement inclus"],
          ["Erreur statique", "L'écart résiduel en régime permanent", "L'efficacité de l'action intégrale"],
          ["Écart sous perturbation", "L'écart maximal quand une perturbation survient", "La robustesse de la boucle"],
        ],
      },
      {
        kind: "text",
        text: "Ces indicateurs se mesurent sur la réponse à un échelon, en simulation comme sur le matériel. Ils permettent de comparer objectivement deux réglages — et de spécifier une boucle (« dépassement < 10 %, établissement < 2 s ») avant de la régler.",
      },
    ],
  },
  {
    id: "tester-une-boucle",
    title: "Tester une boucle",
    level: 3,
    intro: "Valider méthodiquement avant la mise en service.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Tester en simulation",
            detail: "Échelons de consigne dans les deux sens, échelons de perturbation, bruit de mesure, saturations : la simulation doit montrer une boucle stable avec des marges.",
          },
          {
            title: "Tester à vide et à faible énergie",
            detail: "Premiers essais avec des gains réduits et des consignes modestes. Vérifier le sens de la correction : une boucle qui corrige dans le mauvais sens diverge immédiatement.",
          },
          {
            title: "Tester les cas limites",
            detail: "Consignes extrêmes, perturbations maximales, capteur débranché (la boucle doit détecter la perte de mesure et se mettre en sécurité, pas diverger).",
          },
          {
            title: "Tester en endurance",
            detail: "Laisser tourner des heures : dérives thermiques, usure, variations d'alimentation. Une boucle qui tient 10 minutes mais dérive en 2 heures n'est pas validée.",
          },
          {
            title: "Documenter le réglage",
            detail: "Noter les gains, la période d'échantillonnage, les saturations, les conditions de test. Un réglage non documenté est un réglage perdu.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Déboguer une boucle qui oscille",
    level: 3,
    intro: "Une méthode pour diagnostiquer les oscillations.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Observer la fréquence d'oscillation",
            detail: "Enregistrer la mesure en fonction du temps. Une oscillation à haute fréquence évoque un gain trop élevé ou un bruit amplifié ; une oscillation lente évoque un retard ou une intégrale trop forte.",
          },
          {
            title: "Couper la boucle",
            detail: "Passer en boucle ouverte (commande manuelle fixe) : si l'oscillation persiste, elle vient du système ou du capteur, pas du correcteur.",
          },
          {
            title: "Isoler le terme fautif",
            detail: "Mettre `Kd = 0` : si ça se calme, la dérivée amplifiait du bruit. Réduire `Ki` : si ça se calme, l'intégrale était trop agressive. Réduire `Kp` : le test ultime.",
          },
          {
            title: "Chercher le retard",
            detail: "Mesurer le délai entre commande et réponse. Un retard inattendu (communication, filtrage excessif, capteur lent) est une cause classique d'oscillations « inexplicables ».",
          },
          {
            title: "Vérifier le capteur",
            detail: "Un capteur qui décroche, sature ou bruite par intermittence produit des oscillations que nul réglage ne corrigera. Toujours suspecter la mesure avant le correcteur.",
          },
        ],
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité des boucles",
    level: 3,
    intro: "Une boucle qui diverge sur du matériel réel est dangereuse.",
    blocks: [
      {
        kind: "list",
        items: [
          "Arrêt d'urgence : un moyen indépendant du correcteur pour couper l'énergie (bouton, relais, fusible).",
          "Surveillance : détecter la perte de mesure, les valeurs aberrantes, les dépassements de seuils — et basculer en mode sûr.",
          "Butées logicielles et matérielles : interdire les consignes et les positions hors plage utile.",
          "Mode dégradé : en cas de défaut capteur, figer la commande à une valeur sûre plutôt que de diverger.",
          "Ne jamais tester seul un système à énergie dangereuse (haute tension, pièces en mouvement rapide, pression).",
          "Documenter les limites : chaque boucle a une plage de validité, en dehors de laquelle son comportement n'est plus garanti.",
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets",
    level: 3,
    intro: "Du simulateur au système réel, par difficulté croissante.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Réguler un moteur simulé en PID",
            detail: "Le projet du niveau 2 : modèle du premier ordre, réglage manuel, tests de robustesse. La base de tout.",
          },
          {
            title: "Régulation de température réelle",
            detail: "Un petit four ou une plaque chauffante, un capteur de température, un microcontrôleur : PI + anti-windup, consigne en rampe.",
          },
          {
            title: "Asservissement de vitesse d'un moteur réel",
            detail: "Moteur + codeur + pont en H : identifier le modèle, régler en simulation, transférer, valider sous charge variable.",
          },
          {
            title: "Robot suiveur de ligne",
            detail: "Deux capteurs, deux moteurs : une boucle de position latérale. Simple en apparence, redoutable à bien régler à haute vitesse.",
          },
          {
            title: "Stabilisation d'un pendule inversé ou d'un drone",
            detail: "Le projet final : système instable, boucles rapides, estimation d'attitude. Tout ce que cette page enseigne, réuni.",
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
            label: "Control Tutorials (Université du Michigan)",
            value: "Des tutoriels progressifs avec exemples simulés : modélisation, PID, espace d'état. Une référence pédagogique reconnue.",
          },
          {
            label: "Wikipedia — Asservissement",
            value: "Vue d'ensemble encyclopédique avec les définitions formelles et les liens vers les notions avancées.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : simuler en Python/numpy avant tout — c'est l'atelier gratuit de l'automaticien.",
          "Livres : les manuels d'automatique des écoles d'ingénieurs pour la théorie (fonctions de transfert, stabilité, espace d'état).",
          "Matériel : un microcontrôleur, un moteur avec codeur et un capteur de température suffisent pour des années d'expérimentation.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'asservissement maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Implémenter sur cible réelle : `embedded` (le PID tourne sur microcontrôleur, en temps réel).",
          "Comprendre la chaîne de mesure : `electronics` (capteurs, conditionnement du signal) et `sensors` (choisir et calibrer les capteurs).",
          "Monter en complexité : `robotics` et `ros` (le contrôle est une brique du robot autonome).",
          "Automatiser l'analyse : `python` et `numpy` pour des simulations plus riches, `machine-learning` pour l'identification avancée.",
          "Revenir à la roadmap : valider Asservissement et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

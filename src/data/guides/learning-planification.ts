import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la planification de trajectoire en robotique :
 * A*, RRT, navigation, évitement d'obstacles. Les algorithmes sont expliqués
 * en texte avec du pseudo-code en blocs texte/diagramme — aucun code
 * inventé. Les formules sont données en texte avec des exemples vérifiables.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_PLANIFICATION: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction : décider où aller",
    level: 1,
    intro:
      "La planification transforme une carte, une position et un objectif en une trajectoire sûre que le robot peut suivre.",
    blocks: [
      {
        kind: "text",
        text: "Percevoir dit où l'on est et ce qui nous entoure ; contrôler fait bouger précisément. Entre les deux, il faut décider : par où passer pour aller d'ici à là sans collision, en respectant les capacités du robot. C'est la planification — l'autonomie décisionnelle.",
      },
      {
        kind: "diagram",
        title: "La place de la planification",
        lines: [
          "PERCEPTION ──► carte + position du robot",
          "                         │",
          "                         ▼",
          "              PLANIFICATION ──► trajectoire (suite de poses)",
          "                         │",
          "                         ▼",
          "              CONTRÔLE ──► suit la trajectoire précisément",
        ],
      },
      {
        kind: "text",
        text: "Deux échelles : la planification globale (le chemin complet sur la carte, calculé à basse fréquence) et la planification locale (l'évitement des obstacles immédiats, recalculé en continu). Les deux coopèrent : le global donne la direction, le local gère l'imprévu.",
      },
    ],
  },
  {
    id: "ou-s-applique",
    title: "Où la planification s'applique",
    level: 1,
    intro:
      "De l'entrepôt à l'orbite : partout où un mobile doit aller quelque part.",
    blocks: [
      {
        kind: "fields",
        title: "Les applications",
        fields: [
          {
            label: "Robots mobiles",
            value:
              "Entrepôts, livraison, agriculture : naviguer entre des points en évitant obstacles fixes et mobiles — le cas d'école.",
          },
          {
            label: "Bras manipulateurs",
            value:
              "Planifier les mouvements articulaires sans collision (avec l'environnement et avec soi-même) — la planification en espace articulaire.",
          },
          {
            label: "Drones",
            value:
              "Trajectoires 3D avec contraintes dynamiques fortes : l'espace est grand mais les obstacles arrivent vite.",
          },
          {
            label: "Planification de tâches",
            value:
              "Au-delà du chemin : ordonner les actions (prendre, déplacer, déposer) pour accomplir une mission complète.",
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
      "Planifier exige une carte, une position — et des maths pour chercher.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir, et pourquoi",
        fields: [
          {
            label: "Contrôle : suivre une trajectoire",
            value:
              "Un plan sans exécution reste théorique : le contrôleur doit suivre précisément la trajectoire calculée.",
          },
          {
            label: "Perception : carte et localisation",
            value:
              "Fournir la carte des obstacles et la position du robot — sans elles, on ne peut rien planifier.",
          },
          {
            label: "Algorithmique : graphes",
            value:
              "Parcours de graphes (BFS, Dijkstra) : A* et les planificateurs par échantillonnage en sont des variations.",
          },
          {
            label: "Python : prototyper",
            value:
              "Implémenter A* ou RRT sur une grille en quelques dizaines de lignes pour comprendre avant d'utiliser une stack complète.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. La planification est le skill le plus algorithmique de la robotique : elle se pratique d'abord sur papier et en simulation, loin du robot.",
      },
    ],
  },
  {
    id: "outillage-planification",
    title: "Outillage : simuler avant de rouler",
    level: 2,
    intro:
      "Le planificateur se teste en simulation : cartes, robots virtuels, visualisation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Environnement Python + NumPy + Matplotlib : prototyper A* sur une grille et RRT dans le plan — visualiser les chemins trouvés, c'est comprendre.",
          "Simulateur (Gazebo) : tester la navigation complète (planificateur + contrôleur + capteurs simulés) sans risquer le robot.",
          "Visualisation : afficher carte, trajectoire planifiée et trajectoire réelle superposées — l'écart entre les deux est la mesure de qualité.",
          "Règle : un planificateur qui échoue en simulation échouera sur le réel — la simulation est le premier filtre, pas une formalité.",
        ],
      },
    ],
  },
  {
    id: "concept-astar-rrt",
    title: "A* et RRT : les deux classiques",
    level: 2,
    intro:
      "Le plus court chemin sur grille, et l'exploration par échantillonnage : deux philosophies.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux algorithmes",
        fields: [
          {
            label: "A*",
            value:
              "Recherche du plus court chemin sur une grille/graphe : explore les cases par coût croissant `f = g + h` (coût parcouru + heuristique vers le but). Optimal si l'heuristique est admissible (ne surestime jamais).",
          },
          {
            label: "RRT",
            value:
              "Rapidly-exploring Random Tree : échantillonne des points aléatoires dans l'espace continu et fait croître un arbre vers eux — explore vite les grands espaces sans discrétiser.",
          },
          {
            label: "Quand choisir",
            value:
              "A* : environnements structurés discrétisables (intérieur, entrepôt), chemin optimal voulu. RRT : espaces continus de grande dimension (bras 6 axes), où la grille exploserait.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "A* en pseudo-code (texte)",
        lines: [
          "ouvrir ← {départ (f = h)} ; fermé ← {}",
          "tant que ouvrir non vide :",
          "  n ← nœud de plus petit f dans ouvrir",
          "  si n == but : reconstruire le chemin, terminé",
          "  déplacer n vers fermé",
          "  pour chaque voisin v de n (non fermé, non obstacle) :",
          "    g_candidat ← g(n) + coût(n → v)",
          "    si g_candidat < g(v) connu : mettre à jour g(v), parent(v) ← n",
          "      f(v) ← g(v) + h(v) ; ajouter v à ouvrir",
        ],
      },
    ],
  },
  {
    id: "concept-nav2",
    title: "Navigation : la stack Nav2",
    level: 2,
    intro:
      "Le standard ROS 2 pour les robots mobiles : planificateur global, contrôleur local, cartes de coûts.",
    blocks: [
      {
        kind: "fields",
        title: "Les composants",
        fields: [
          {
            label: "Planificateur global",
            value:
              "Calcule le chemin complet sur la carte statique (A*, Dijkstra…) : basse fréquence, vision long terme.",
          },
          {
            label: "Contrôleur local",
            value:
              "Suit le chemin en évitant les obstacles perçus en direct (fenêtre dynamique…) : haute fréquence, réactif.",
          },
          {
            label: "Cartes de coûts",
            value:
              "La carte + des marges de sécurité gonflées autour des obstacles (inflation) : le planificateur « voit » les dangers élargis.",
          },
          {
            label: "Comportements de reprise",
            value:
              "Rotation sur place, recul, dégagement : quand le robot est coincé, des comportements prédéfinis tentent de le sortir avant l'échec.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'architecture en deux couches (global + local) est le pattern dominant : le global ignore les petits obstacles mobiles, le local les gère — chacun à son échelle de temps et d'espace.",
      },
    ],
  },
  {
    id: "concept-evitement",
    title: "Évitement d'obstacles",
    level: 2,
    intro:
      "Réagir à l'imprévu : les obstacles que la carte ne connaît pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : le planificateur local évalue en continu des trajectoires candidates (arcs de cercle à différentes vitesses) et choisit la meilleure (progresse vers le but, loin des obstacles, vitesses admissibles).",
          "Fenêtre dynamique : ne considérer que les vitesses atteignables dans le prochain pas de temps (accélération limitée) — le robot ne « rêve » pas de mouvements impossibles.",
          "Replanification : si l'obstacle bloque le chemin global, le global recalcule — à une fréquence qui équilibre réactivité et stabilité (replanifier trop souvent = trajectoire saccadée).",
          "Limite : un obstacle rapide (humain qui court) peut toujours surprendre — marges de sécurité et vitesses adaptées restent indispensables.",
        ],
      },
    ],
  },
  {
    id: "concept-planification-taches",
    title: "Planification de tâches",
    level: 2,
    intro:
      "Au-delà du chemin : ordonner les actions pour accomplir une mission.",
    blocks: [
      {
        kind: "text",
        text: "Naviguer n'est qu'une action parmi d'autres : prendre un objet, le déplacer, le déposer, ouvrir une porte… La planification de tâches ordonne ces actions en séquence pour atteindre un but (« ranger la pièce »), en gérant préconditions et effets (« pour déposer, il faut tenir »).",
      },
      {
        kind: "list",
        items: [
          "Arbres de comportement (behavior trees) : la représentation standard en robotique — hiérarchique, réactive, lisible — utilisée par Nav2 pour orchestrer la navigation.",
          "Chaque action a des conditions de succès/échec : l'échec remonte et déclenche une alternative ou un repli — jamais un blocage silencieux.",
          "La planification de tâches s'appuie sur la planification de mouvements : chaque action « aller à » ou « saisir » déclenche un planificateur géométrique.",
        ],
      },
    ],
  },
  {
    id: "concept-incertitude",
    title: "L'incertitude",
    level: 2,
    intro:
      "La carte est imparfaite, la position incertaine : planifier robuste.",
    blocks: [
      {
        kind: "list",
        items: [
          "Sources : bruit des capteurs, carte incomplète ou périmée, localisation incertaine, obstacles mobiles imprévisibles.",
          "Marges : gonfler les obstacles (inflation), garder des distances de sécurité — la marge est le prix de l'incertitude.",
          "Replanification : un plan n'est jamais définitif — le recalculer quand le monde a changé plus qu'un seuil.",
          "Comportements prudents : ralentir quand l'incertitude grandit (brouillard capteur), s'arrêter plutôt que foncer dans l'inconnu.",
        ],
      },
    ],
  },
  {
    id: "premier-planificateur",
    title: "Premier planificateur : A* sur grille",
    level: 2,
    intro:
      "Implémenter A* en Python sur une petite carte : le meilleur exercice.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Représenter la carte",
            detail:
              "Une grille 2D (tableau NumPy) : 0 = libre, 1 = obstacle. Commencer petit (20×20) avec des obstacles dessinés à la main.",
          },
          {
            title: "Définir les coûts",
            detail:
              "Coût de déplacement 1 en ligne droite, ~1,4 en diagonale ; heuristique = distance euclidienne au but (admissible : elle ne surestime jamais).",
          },
          {
            title: "Implémenter la boucle",
            detail:
              "Suivre le pseudo-code de la section A* : file de priorité sur f, ensemble fermé, reconstruction par les parents. Une cinquantaine de lignes suffisent.",
          },
          {
            title: "Visualiser et expérimenter",
            detail:
              "Afficher la carte, le chemin, et les cases explorées : changer l'heuristique (nulle = Dijkstra, surestimée = rapide mais sous-optimal) et observer l'effet sur le nombre de cases explorées.",
          },
        ],
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Flux professionnel : de la carte à la mission",
    level: 2,
    intro:
      "La chaîne complète : cartographier, configurer, tester, déployer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cartographier",
            detail:
              "Construire la carte par SLAM (ou l'importer), la vérifier visuellement (murs droits, pas de doublons) — on ne navigue jamais sur une carte non validée.",
          },
          {
            title: "Configurer",
            detail:
              "Rayon du robot, marges d'inflation, vitesses max : paramétrer la stack pour CE robot, pas avec les valeurs par défaut.",
          },
          {
            title: "Tester en simulation",
            detail:
              "Scénarios nominaux + obstacles mobiles + cas limites : mesurer taux de succès, temps, longueur des chemins.",
          },
          {
            title: "Tester sur le réel, progressivement",
            detail:
              "D'abord en téléopéré sur le parcours, puis en autonome supervisé (doigt sur l'arrêt), puis en autonome — chaque étape valide la précédente.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-planification",
    title: "Déboguer : quand le robot ne va pas où il faut",
    level: 2,
    intro:
      "Symptômes de planification et leurs causes.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic",
        fields: [
          {
            label: "Le robot ne planifie rien (échec)",
            value:
              "But dans un obstacle ou hors carte, carte non chargée, ou inflation qui bouche les passages — vérifier le but et visualiser la carte de coûts.",
          },
          {
            label: "Le chemin est absurde (détour énorme)",
            value:
              "Coûts mal réglés (inflation excessive, zones pénalisées) ou heuristique dégénérée — inspecter la carte de coûts, pas juste le chemin.",
          },
          {
            label: "Le robot oscille / hésite",
            value:
              "Replanification trop fréquente ou contrôleur local en conflit avec le global — espacer les replans, vérifier les gains du suivi.",
          },
          {
            label: "Collision malgré le plan",
            value:
              "Carte périmée, obstacle non vu (angle mort capteur), ou suivi trop imprécis — remonter la chaîne : perception → plan → contrôle.",
          },
          {
            label: "Le robot reste bloqué",
            value:
              "Minimum local (cul-de-sac de coûts) : les comportements de reprise doivent se déclencher — s'ils ne le font pas, la config est fautive.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-planification",
    title: "Tester : mesurer la navigation",
    level: 2,
    intro:
      "Taux de succès, temps, longueur : chiffrer l'autonomie.",
    blocks: [
      {
        kind: "fields",
        title: "Les métriques",
        fields: [
          {
            label: "Taux de succès",
            value:
              "Part des missions accomplies sans intervention : la métrique n°1 — mesurée sur des dizaines d'essais, pas sur une démo.",
          },
          {
            label: "Temps de mission",
            value:
              "Comparé au temps nominal : un robot qui met 3× le temps optimal a un problème (hésitations, détours).",
          },
          {
            label: "Longueur du chemin",
            value:
              "Ratio chemin parcouru / chemin optimal : mesure l'efficacité du planificateur.",
          },
          {
            label: "Interventions",
            value:
              "Nombre de reprises en main par mission : l'autonomie se mesure en interventions évitées.",
          },
          {
            label: "Sécurité",
            value:
              "Distance minimale aux obstacles, zéro collision : non négociable — un seul contact peut invalider des mois de tests.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges de la planification.",
    blocks: [
      {
        kind: "list",
        items: [
          "Grille trop grossière : des passages réels disparaissent de la carte discrétisée — la résolution doit être petite devant le robot et les passages.",
          "Oublier la cinématique : planifier un chemin qu'un robot non holonome (qui ne va pas en crabe) ne peut pas suivre — le plan doit respecter les contraintes du robot.",
          "Inflation excessive : des marges trop grosses ferment les portes — régler l'inflation au plus juste (rayon robot + petite marge).",
          "Tester seulement à vide : sans obstacles mobiles ni perturbations, tout planificateur a l'air bon — les cas dynamiques révèlent la vérité.",
          "Confondre plan et exécution : un beau chemin suivi par un mauvais contrôleur donne un mauvais résultat — valider les deux.",
          "But inatteignable : envoyer le robot vers un point dans un mur sans gestion d'échec propre — toujours valider le but avant de planifier.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "espace-configurations",
    title: "Espace des configurations",
    level: 3,
    intro:
      "Planifier dans l'espace des configurations, pas dans l'espace du monde.",
    blocks: [
      {
        kind: "text",
        text: "L'espace des configurations (C-space) est l'espace des paramètres du robot : `(x, y, θ)` pour un mobile plan, les angles articulaires pour un bras. Un obstacle du monde devient un obstacle dans le C-space (l'ensemble des configurations en collision) — et planifier, c'est trouver un chemin dans le C-space libre.",
      },
      {
        kind: "list",
        items: [
          "Intérêt : un robot volumineux devient un point dans le C-space (en gonflant les obstacles du rayon du robot) — la collision se teste simplement.",
          "Dimension : 3 pour un mobile plan, 6+ pour un bras — d'où l'explosion combinatoire des grilles et l'intérêt du RRT en grande dimension.",
        ],
      },
    ],
  },
  {
    id: "graphes-recherche",
    title: "Recherche sur graphes : BFS et Dijkstra",
    level: 3,
    intro:
      "Les fondations : explorer par coût croissant.",
    blocks: [
      {
        kind: "text",
        text: "BFS explore par couches (optimal en nombre d'arcs, pas en coût). Dijkstra explore par coût cumulé `g` croissant : le premier chemin trouvé vers le but est optimal — mais il explore dans toutes les directions, y compris à l'opposé du but. A* ajoute l'heuristique `h` pour guider l'exploration vers le but.",
      },
      {
        kind: "diagram",
        title: "Comparaison (même carte, même but)",
        lines: [
          "Dijkstra : explore en cercles concentriques depuis le départ",
          "         → optimal, mais explore énormément",
          "A* (h admissible) : explore un fuseau vers le but",
          "         → optimal, bien moins de nœuds",
          "Glouton (f = h seul) : fonce vers le but",
          "         → rapide, pas optimal, peut se perdre",
        ],
      },
    ],
  },
  {
    id: "astar-detail",
    title: "A* en détail : l'heuristique",
    level: 3,
    intro:
      "L'heuristique fait A* : admissible, consistante, informée.",
    blocks: [
      {
        kind: "fields",
        title: "Les propriétés",
        fields: [
          {
            label: "Admissible",
            value:
              "`h(n)` ne surestime jamais le vrai coût restant : condition de l'optimalité. Distance euclidienne / Manhattan (sans diagonales) sont admissibles.",
          },
          {
            label: "Consistante",
            value:
              "`h(n) ≤ coût(n→v) + h(v)` (inégalité triangulaire) : garantit qu'on ne rouvre jamais un nœud fermé — plus fort qu'admissible.",
          },
          {
            label: "Informée",
            value:
              "Plus `h` est proche du vrai coût (sans le dépasser), moins A* explore : l'heuristique parfaite = exploration nulle. Le compromis central du réglage.",
          },
          {
            label: "Pondérée (Weighted A*)",
            value:
              "`f = g + w·h` avec `w > 1` : plus rapide, sous-optimal borné (coût ≤ w × optimal) — le compromis vitesse/optimalité en pratique.",
          },
        ],
      },
    ],
  },
  {
    id: "rrt-detail",
    title: "RRT en détail",
    level: 3,
    intro:
      "Explorer par échantillonnage : l'algorithme qui a ouvert la grande dimension.",
    blocks: [
      {
        kind: "diagram",
        title: "RRT en pseudo-code (texte)",
        lines: [
          "arbre ← {départ}",
          "répéter N fois (ou jusqu'au but atteint) :",
          "  q_alea ← échantillon aléatoire (biaisé vers le but ~5–10 %)",
          "  q_proche ← nœud de l'arbre le plus proche de q_alea",
          "  q_nouv ← avancer de q_proche vers q_alea d'un pas Δ",
          "  si le segment [q_proche, q_nouv] est sans collision :",
          "    ajouter q_nouv à l'arbre (parent = q_proche)",
          "retourner le chemin départ → but dans l'arbre",
        ],
      },
      {
        kind: "list",
        items: [
          "Biais vers le but : échantillonner le but lui-même avec petite probabilité accélère énormément la convergence.",
          "Pas Δ : trop grand = collisions manquées, trop petit = exploration lente — de l'ordre de la taille caractéristique des passages.",
          "Le RRT de base n'est pas optimal (chemin « en zigzag ») : on lisse après (raccourcis) ou on utilise RRT*.",
        ],
      },
    ],
  },
  {
    id: "rrt-star",
    title: "RRT* : l'optimalité asymptotique",
    level: 3,
    intro:
      "Recâbler l'arbre : converger vers l'optimal avec le temps.",
    blocks: [
      {
        kind: "text",
        text: "RRT* ajoute deux opérations à chaque insertion : choisir le meilleur parent parmi les voisins (celui qui minimise le coût depuis le départ) et recâbler les voisins si passer par le nouveau nœud réduit leur coût. Avec assez d'itérations, le chemin converge vers l'optimal — d'où « asymptotiquement optimal ».",
      },
      {
        kind: "list",
        items: [
          "Coût : le recâblage augmente le temps par itération — mais chaque itération améliore le chemin, ce qui permet l'anytime (rendre le meilleur chemin trouvé dans le temps imparti).",
          "En pratique : RRT* + lissage par raccourcis donne des chemins de qualité en temps raisonnable pour les bras manipulateurs.",
        ],
      },
    ],
  },
  {
    id: "prm",
    title: "PRM : les roadmaps probabilistes",
    level: 3,
    intro:
      "Échantillonner l'espace une fois, requêter souvent : pour les environnements stables.",
    blocks: [
      {
        kind: "text",
        text: "PRM (Probabilistic Roadmap) : en phase d'apprentissage (hors ligne), échantillonner des configurations libres et les relier à leurs voisins (si le segment est libre) — on obtient un graphe (roadmap) de l'espace libre. En phase de requête, connecter départ et but au graphe et chercher le plus court chemin (Dijkstra/A*).",
      },
      {
        kind: "list",
        items: [
          "Idéal quand l'environnement change peu (cellule robotique fixe) : la roadmap se construit une fois, les requêtes sont rapides.",
          "Limite : environnement dynamique = roadmap à reconstruire — préférer RRT (re)planifié en ligne.",
        ],
      },
    ],
  },
  {
    id: "champs-potentiels",
    title: "Champs de potentiels",
    level: 3,
    intro:
      "Attraction du but, répulsion des obstacles : simple, avec un piège.",
    blocks: [
      {
        kind: "text",
        text: "Le robot suit le gradient d'un potentiel : attractif vers le but (`U_att = ½·k·d²`), répulsif près des obstacles (`U_rep` qui explose quand la distance diminue). Simple, réactif, temps réel — mais les minima locaux (une cuvette de potentiel devant un obstacle en U) piègent le robot.",
      },
      {
        kind: "list",
        items: [
          "Usage moderne : comme contrôleur local réactif couplé à un planificateur global qui évite les minima — pas comme planificateur global seul.",
          "Réglage : l'équilibre attraction/répulsion détermine le comportement — trop de répulsion = le robot n'ose plus approcher, trop peu = il frôle.",
        ],
      },
    ],
  },
  {
    id: "fenetre-dynamique",
    title: "Fenêtre dynamique (DWA)",
    level: 3,
    intro:
      "Choisir la vitesse, pas juste la direction : le contrôleur local standard.",
    blocks: [
      {
        kind: "diagram",
        title: "DWA en pseudo-code (texte)",
        lines: [
          "fenêtre ← vitesses (v, ω) atteignables en Δt",
          "           (limitées par accélération max)",
          "pour chaque (v, ω) échantillonnée :",
          "  simuler la trajectoire sur l'horizon",
          "  écarter si collision prédite",
          "  score ← α·progrès_vers_but + β·distance_obstacles",
          "            + γ·vitesse",
          "choisir (v, ω) de meilleur score ; appliquer",
        ],
      },
      {
        kind: "text",
        text: "DWA échantillonne des commandes (pas des chemins) : il respecte nativement la dynamique du robot. Les poids α, β, γ règlent le caractère — prudent (β grand) ou pressé (γ grand). C'est le contrôleur local historique de la navigation ROS.",
      },
    ],
  },
  {
    id: "cartes-couts",
    title: "Cartes de coûts et inflation",
    level: 3,
    intro:
      "La carte vue par le planificateur : obstacles gonflés de marges.",
    blocks: [
      {
        kind: "list",
        items: [
          "Couches : carte statique + obstacles perçus + inflation (décroissance du coût avec la distance à l'obstacle) — le planificateur optimise sur la somme.",
          "Inflation : rayon = rayon du robot + marge — le chemin optimal « rase » les obstacles au plus juste sans les toucher.",
          "Coût vs binaire : un coût continu permet des compromis (un léger détour vaut mieux qu'un frôlement) là où le tout-ou-rien bloque.",
          "Piège : une inflation trop grande ferme les passages étroits — la régler à partir des dimensions réelles mesurées.",
        ],
      },
    ],
  },
  {
    id: "lissage-trajectoire",
    title: "Lissage de trajectoire",
    level: 3,
    intro:
      "Du chemin en zigzag à la trajectoire suivable : raccourcis et splines.",
    blocks: [
      {
        kind: "fields",
        title: "Les techniques",
        fields: [
          {
            label: "Raccourcis (shortcutting)",
            value:
              "Tirer des segments directs entre points du chemin et garder ceux sans collision, itérativement : simple et très efficace sur les chemins RRT.",
          },
          {
            label: "Splines",
            value:
              "Ajuster des courbes lisses (B-splines) sur les points : continuité en position, vitesse, accélération — ce que le contrôleur préfère.",
          },
          {
            label: "Contrainte",
            value:
              "Tout lissage doit re-vérifier la non-collision (et les contraintes cinématiques) : lisser n'est pas juste « arrondir ».",
          },
        ],
      },
    ],
  },
  {
    id: "contraintes-cinematiques",
    title: "Contraintes cinématiques",
    level: 3,
    intro:
      "Le robot ne va pas en crabe : planifier des chemins suivables.",
    blocks: [
      {
        kind: "text",
        text: "Un robot à roues (type voiture) ne se déplace pas latéralement : ses chemins sont des enchaînements d'arcs de cercle (courbure bornée par l'angle de braquage). Planifier sans cette contrainte produit des chemins infaisables — d'où les planificateurs cinématiques (courbes de Dubins/Reeds-Shepp : les plus courts chemins à courbure bornée).",
      },
      {
        kind: "list",
        items: [
          "Vérification : tout chemin planifié doit être simulé avec le modèle cinématique du robot avant exécution.",
          "Le contrôleur local (DWA) respecte nativement ces contraintes puisqu'il échantillonne des commandes — d'où son succès.",
        ],
      },
    ],
  },
  {
    id: "profils-vitesse",
    title: "Profils de vitesse : le trapèze",
    level: 3,
    intro:
      "Aller vite sans à-coups : accélération bornée.",
    blocks: [
      {
        kind: "text",
        text: "Le profil trapézoïdal : accélération constante jusqu'à `v_max`, palier, décélération constante. Pour une distance `d` avec accélération `a` : temps ≈ `d/v_max + v_max/a` (si le palier existe). Exemple : `d = 2 m`, `v_max = 1 m/s`, `a = 0,5 m/s²` → `t ≈ 2 + 2 = 4 s`. Sans profil (échelon de vitesse), les à-coups usent la mécanique et font glisser les roues.",
      },
      {
        kind: "list",
        items: [
          "Profils en S (jerk borné) : encore plus doux — standard industriel pour les bras.",
          "Le planificateur fournit le chemin, le générateur de trajectoire le temps : les deux couches sont distinctes.",
        ],
      },
    ],
  },
  {
    id: "mpc-navigation",
    title: "MPC pour la navigation",
    level: 3,
    intro:
      "Optimiser la trajectoire en ligne : quand le calcul le permet.",
    blocks: [
      {
        kind: "text",
        text: "Le MPC appliqué à la navigation optimise à chaque pas une trajectoire sur l'horizon : minimise l'écart au chemin de référence + l'effort, sous contraintes (vitesses max, obstacles comme contraintes). Plus puissant que DWA (anticipe, gère les contraintes explicitement), mais bien plus coûteux — réservé aux plateformes avec du calcul.",
      },
      {
        kind: "list",
        items: [
          "Lien avec le skill Contrôle : c'est le même MPC, appliqué au suivi de chemin — les deux skills se rejoignent ici.",
          "En pratique : DWA/MPC léger en local, MPC complet pour les drones et véhicules rapides.",
        ],
      },
    ],
  },
  {
    id: "replanification",
    title: "Replanification",
    level: 3,
    intro:
      "Le monde change : quand et comment recalculer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Déclencheurs : nouvel obstacle sur le chemin, écart trop grand au chemin prévu, timeout — pas de replanification « au cas où » en boucle.",
          "Fréquence : le global à ~1 Hz, le local à 10–20 Hz — deux échelles, deux rôles.",
          "Stabilité : replanifier trop souvent donne une trajectoire nerveuse — hystérésis (ne replanifier que si le gain est significatif) et lissage.",
          "Anytime : rendre toujours le meilleur plan disponible dans le temps imparti — un bon plan à temps vaut mieux que l'optimal trop tard.",
        ],
      },
    ],
  },
  {
    id: "multi-robots",
    title: "Planification multi-robots",
    level: 3,
    intro:
      "Plusieurs robots, un espace : coordination et priorités.",
    blocks: [
      {
        kind: "list",
        items: [
          "Planification priorisée : planifier par ordre de priorité, chaque robot traitant les précédents comme obstacles mobiles — simple, efficace, pas optimal globalement.",
          "Réservation d'espace-temps : les robots réservent les zones à des instants — évite les blocages mutuels (deadlocks) aux intersections.",
          "Communication : partager positions et intentions — sans communication, chaque robot devine et les interférences persistent.",
          "En pratique d'entrepôt : superviseur central qui attribue les missions + évitement local décentralisé — le compromis industriel standard.",
        ],
      },
    ],
  },
  {
    id: "behavior-trees",
    title: "Arbres de comportement",
    level: 3,
    intro:
      "Orchestrer la mission : la structure qui remplace les machines à états géantes.",
    blocks: [
      {
        kind: "fields",
        title: "Les nœuds",
        fields: [
          {
            label: "Séquence (→)",
            value:
              "Exécute les enfants dans l'ordre jusqu'au premier échec : « aller à A PUIS prendre PUIS aller à B ».",
          },
          {
            label: "Sélecteur (?)",
            value:
              "Essaie les enfants jusqu'au premier succès : les alternatives et les replis — « essayer plan A, sinon plan B ».",
          },
          {
            label: "Décorateurs",
            value:
              "Répéter, inverser, limiter dans le temps : modifient le comportement d'un enfant sans dupliquer de logique.",
          },
          {
            label: "Actions / conditions",
            value:
              "Les feuilles : les vraies actions du robot (naviguer, saisir) et les tests (batterie OK ?, objet détecté ?).",
          },
        ],
      },
      {
        kind: "text",
        text: "Avantage sur les machines à états : modularité et réactivité — on ajoute un comportement sans recâbler tous les états. C'est l'orchestrateur standard des missions robotiques modernes (Nav2 l'utilise pour la navigation).",
      },
    ],
  },
  {
    id: "incertitude-avancee",
    title: "Planifier sous incertitude",
    level: 3,
    intro:
      "Quand on ne sait pas exactement où l'on est : le belief planning.",
    blocks: [
      {
        kind: "text",
        text: "Au lieu de planifier pour une position, on planifie pour une distribution de positions possibles (belief). Le plan peut inclure des actions d'information (« passer près de ce repère pour se relocaliser ») : c'est la planification active — chercher l'information quand l'incertitude est trop grande pour agir.",
      },
      {
        kind: "list",
        items: [
          "POMDP : le formalisme général (états partiellement observables) — puissant, calculatoirement très lourd, réservé aux cas d'école et petits problèmes.",
          "En pratique : marges + replanification + comportements de relocalisation couvrent 95 % des besoins sans POMDP.",
        ],
      },
    ],
  },
  {
    id: "exploration",
    title: "Exploration : cartographier l'inconnu",
    level: 3,
    intro:
      "Aller voir là où on ne sait pas : les frontières.",
    blocks: [
      {
        kind: "text",
        text: "Exploration par frontières : détecter les frontières entre connu et inconnu sur la carte, aller à la plus « rentable » (gain d'information / coût de déplacement), répéter jusqu'à plus de frontières. C'est ainsi qu'un robot cartographie un bâtiment inconnu de façon autonome.",
      },
      {
        kind: "list",
        items: [
          "Critère : maximiser l'information par mètre parcouru — pas juste « aller au plus près ».",
          "Arrêt : quand le gain marginal devient nul ou le temps imparti écoulé — l'exploration complète est rarement nécessaire.",
        ],
      },
    ],
  },
  {
    id: "couverture",
    title: "Couverture : tout visiter",
    level: 3,
    intro:
      "Tondre, nettoyer, inspecter : passer partout.",
    blocks: [
      {
        kind: "list",
        items: [
          "Boustrophedon (va-et-vient) : des bandes parallèles qui couvrent la zone — le motif de la tondeuse et de l'aspirateur, optimal sur zone convexe.",
          "Décomposition cellulaire : découper la zone en cellules simples, couvrir chacune, enchaîner — gère les obstacles et les formes complexes.",
          "Recouvrement : les passages se chevauchent légèrement pour ne rien rater — le taux de recouvrement est un paramètre de qualité.",
        ],
      },
    ],
  },
  {
    id: "nav2-detail",
    title: "Nav2 en détail",
    level: 3,
    intro:
      "L'architecture de la stack de navigation ROS 2.",
    blocks: [
      {
        kind: "diagram",
        title: "Pipeline Nav2 simplifié",
        lines: [
          "Carte + position (localisation)",
          "     │",
          "     ▼",
          "Planificateur global ──► chemin",
          "     │",
          "     ▼",
          "Contrôleur local ──► commandes (v, ω)",
          "     │   (suit le chemin, évite les obstacles)",
          "     ▼",
          "Comportements de reprise (si bloqué)",
          "     │",
          "     ▼",
          "Orchestrateur (arbre de comportement)",
        ],
      },
      {
        kind: "list",
        items: [
          "Plugins : planificateurs et contrôleurs sont interchangeables (A*, Dijkstra, DWA, MPC…) — on choisit selon le robot.",
          "Serveurs d'action : chaque étape est une action ROS 2 (avec feedback et annulation) — la mission se supervise et s'interrompt proprement.",
          "Réglage : des dizaines de paramètres (vitesses, marges, fréquences) — la doc Nav2 et le réglage progressif sont incontournables.",
        ],
      },
    ],
  },
  {
    id: "verification-plans",
    title: "Vérifier un plan",
    level: 3,
    intro:
      "Avant d'exécuter : le plan est-il faisable et sûr ?",
    blocks: [
      {
        kind: "list",
        items: [
          "Collision : re-vérifier le chemin final contre la carte la plus fraîche (pas celle de la planification) — le monde a pu changer.",
          "Cinématique : simuler le suivi avec le modèle du robot — courbures, vitesses : tout doit être dans les limites.",
          "Marges : distance minimale aux obstacles sur tout le chemin — un plan qui rase est un plan fragile.",
          "Temps : durée estimée vs budget de mission et batterie restante — ne pas partir pour un plan qu'on ne peut pas finir.",
        ],
      },
    ],
  },
  {
    id: "benchmarks",
    title: "Évaluer : benchmarks",
    level: 3,
    intro:
      "Comparer rigoureusement : protocoles et métriques.",
    blocks: [
      {
        kind: "list",
        items: [
          "Scénarios standardisés : même cartes, mêmes départs/buts, mêmes obstacles — sinon la comparaison ne veut rien dire.",
          "Répétitions : les planificateurs échantillonnés (RRT) sont aléatoires — moyenner sur des dizaines d'essais, donner la variance.",
          "Métriques : taux de succès, temps de calcul, longueur du chemin, fluidité — un planificateur se juge sur les quatre, pas sur une.",
          "Ablation : tester avec et sans chaque composant (lissage, inflation…) pour savoir ce qui apporte quoi.",
        ],
      },
    ],
  },
  {
    id: "dubins-reeds-shepp",
    title: "Courbes de Dubins et Reeds-Shepp",
    level: 3,
    intro:
      "Les plus courts chemins à courbure bornée : pour les robots type voiture.",
    blocks: [
      {
        kind: "text",
        text: "Un robot type voiture (marche avant seule, courbure bornée) : le plus court chemin entre deux poses est une séquence d'au plus 3 arcs (cercle à gauche/droite) et segments droits — les courbes de Dubins (6 familles : LSL, RSR, LSR…). Avec marche arrière autorisée : Reeds-Shepp (48 familles). Ces courbes sont les briques des planificateurs cinématiques.",
      },
      {
        kind: "list",
        items: [
          "Usage : connecter deux configurations dans un planificateur (RRT cinématique) ou générer des manœuvres de parking.",
          "En pratique : des bibliothèques les implémentent — comprendre les familles suffit, pas besoin de les recoder.",
        ],
      },
    ],
  },
  {
    id: "planification-bras",
    title: "Planification pour bras manipulateur",
    level: 3,
    intro:
      "Planifier en espace articulaire : 6 dimensions, auto-collisions, singularités.",
    blocks: [
      {
        kind: "fields",
        title: "Les spécificités",
        fields: [
          {
            label: "Espace articulaire",
            value:
              "On planifie les angles des articulations (6D+), pas la position de la pince : RRT/RRT* règnent, les grilles sont impossibles.",
          },
          {
            label: "Auto-collision",
            value:
              "Le bras ne doit pas se heurter lui-même : vérifier les paires de segments à chaque configuration échantillonnée.",
          },
          {
            label: "Singularités",
            value:
              "Configurations où le bras perd un degré de liberté : à éviter dans le plan (mouvements incontrôlables à proximité).",
          },
          {
            label: "MoveIt",
            value:
              "Le framework ROS standard : planification, cinématique, évitement de collisions — l'équivalent de Nav2 pour les bras.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-planification",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets progressifs, de la grille au robot.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — A* et RRT comparés",
            detail:
              "Implémenter les deux en Python sur les mêmes cartes : mesurer temps de calcul, longueur, nœuds explorés. Visualiser. Livrable : comparatif chiffré avec graphiques.",
          },
          {
            title: "Projet 2 — Navigation simulée",
            detail:
              "En simulation (Gazebo ou 2D) : planificateur global + DWA + carte — naviguer entre des points avec des obstacles mobiles. Mesurer taux de succès et temps. Livrable : système qui navigue de façon répétable.",
          },
          {
            title: "Projet 3 — Mission complète",
            detail:
              "Arbre de comportement : explorer, aller à des points, revenir — avec reprise sur échec. Livrable : mission autonome documentée, 10 essais chiffrés.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-planification",
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
            label: "Planning Algorithms (LaValle)",
            value:
              "Le livre de référence (gratuit en ligne, planning.cs.uiuc.edu) : de la théorie des graphes aux planificateurs échantillonnés — complet et rigoureux.",
          },
          {
            label: "Documentation Nav2",
            value:
              "Le guide officiel (navigation.ros.org) : architecture, réglage, tutoriels — indispensable pour la pratique ROS 2.",
          },
          {
            label: "PythonRobotics",
            value:
              "Collection open source d'algorithmes de robotique en Python (dont A*, RRT, DWA) : lire et exécuter du code qui marche.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : implémenter chaque algorithme de cette page avant de le considérer comme compris — la planification s'apprend en codant.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "La planification maîtrisée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Intégrer : assembler perception + planification + contrôle en système complet — le sommet de la roadmap.",
          "Optimiser l'exécution : le contrôle (MPC, suivi de trajectoire) pour des suivis plus exigeants.",
          "Brancher sur ROS 2 : Nav2 en conditions réelles, réglage fin sur votre robot.",
          "Approfondir les maths : optimisation pour la planification de trajectoires optimales.",
          "Revenir à la roadmap : valider Planification et attaquer la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

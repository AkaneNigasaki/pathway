import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la physique pour la robotique : mécanique
 * classique appliquée (forces, frottement, énergie), capteurs et actionneurs,
 * énergétique. Les formules sont données en texte avec des exemples chiffrés
 * réels et vérifiables par le calcul.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_PHYSIQUE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction : les lois auxquelles obéit le robot",
    level: 1,
    intro:
      "La physique impose ce qui est possible : un moteur sous-dimensionné ne se compense pas par du code.",
    blocks: [
      {
        kind: "text",
        text: "Tout robot obéit aux mêmes lois : une force produit une accélération (`F = m·a`), un frottement s'oppose au mouvement, une batterie contient une énergie finie. La plupart des échecs robotiques — moteur qui décroche, structure qui casse, batterie qui meurt en dix minutes — sont des erreurs de physique, pas de code. Comprendre ces lois permet de dimensionner correctement avant de construire.",
      },
      {
        kind: "diagram",
        title: "Les cinq piliers de la physique robotique",
        lines: [
          "MÉCANIQUE DU SOLIDE ──► la structure tient-elle ?",
          "DYNAMIQUE ──► quelles forces pour quels mouvements ?",
          "CAPTEURS ──► comment le monde devient signal ?",
          "ACTIONNEURS ──► comment le signal redevient mouvement ?",
          "ÉNERGÉTIQUE ──► combien de temps avec quelle batterie ?",
        ],
      },
      {
        kind: "text",
        text: "Bonne nouvelle : la physique utile en robotique tient en un nombre restreint de principes, appliqués avec rigueur. Pas besoin de physique quantique — mais `F = m·a`, le frottement et l'énergie doivent devenir des réflexes.",
      },
    ],
  },
  {
    id: "ou-s-applique",
    title: "Où la physique décide",
    level: 1,
    intro:
      "Cinq décisions de conception que seule la physique tranche.",
    blocks: [
      {
        kind: "fields",
        title: "La physique en action",
        fields: [
          {
            label: "Choisir un moteur",
            value:
              "Couple = force × bras de levier : soulever 2 kg à 30 cm exige ~6 N·m — aucun algorithme ne réduit ce chiffre.",
          },
          {
            label: "Choisir une batterie",
            value:
              "Énergie = puissance × temps : 100 W pendant 1 h = 100 Wh — la masse de batterie en découle directement.",
          },
          {
            label: "Prévoir le freinage",
            value:
              "Énergie cinétique `½·m·v²` à dissiper : un robot lourd et rapide a besoin de vrais freins, pas d'espoir.",
          },
          {
            label: "Comprendre un capteur",
            value:
              "Ultrasons (temps de vol), IMU (inertie), effet Hall (magnétisme) : chaque capteur a un principe physique — et des limites qui en découlent.",
          },
          {
            label: "Éviter la casse",
            value:
              "Contrainte = force / section : une pièce trop fine casse — le calcul prend une minute, la casse une semaine.",
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
      "La physique est une fondation : peu de prérequis, mais des réflexes mathématiques.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir, et pourquoi",
        fields: [
          {
            label: "Mathématiques : algèbre et trigonométrie",
            value:
              "Résoudre `F = m·a` dans tous les sens, décomposer une force sur un plan incliné : les calculs sont simples mais incessants.",
          },
          {
            label: "Mathématiques : unités et puissances de 10",
            value:
              "Newton, joule, watt, et les préfixes (milli, kilo) : 90 % des erreurs de calcul sont des erreurs d'unités — vérifier les unités, toujours.",
          },
          {
            label: "Notions de dérivée (utile)",
            value:
              "Vitesse = dérivée de la position, accélération = dérivée de la vitesse : comprendre le lien rend la dynamique intuitive.",
          },
        ],
      },
      {
        kind: "text",
        text: "La physique est la première fondation de la roadmap robotique : elle se travaille en parallèle des mathématiques. Chaque calcul de cette page se vérifie avec ses unités — une formule dont les unités ne collent pas est fausse.",
      },
    ],
  },
  {
    id: "outillage-physique",
    title: "Outillage : mesurer le réel",
    level: 2,
    intro:
      "La physique se valide par la mesure : les instruments du roboticien.",
    blocks: [
      {
        kind: "fields",
        title: "Les instruments",
        fields: [
          {
            label: "Balance / dynamomètre",
            value:
              "Peser les masses, mesurer les forces de traction : tout calcul de couple commence par une masse mesurée, pas estimée au doigt.",
          },
          {
            label: "Multimètre",
            value:
              "Tension, courant, puissance électrique (`P = U·I`) : mesurer la consommation réelle au lieu de croire la fiche technique.",
          },
          {
            label: "Tachymètre / chronomètre",
            value:
              "Vitesses de rotation et temps : vérifier que le moteur tourne bien à la vitesse prévue sous charge.",
          },
          {
            label: "Mètre ruban / pied à coulisse",
            value:
              "Longueurs, bras de levier : un bras de levier faux de 20 % fausse le couple de 20 %.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe : tout nombre qui entre dans un calcul de dimensionnement est mesuré ou majoré avec prudence — jamais deviné. L'ingénierie commence quand les chiffres sont réels.",
      },
    ],
  },
  {
    id: "concept-mecanique-solide",
    title: "Mécanique du solide",
    level: 2,
    intro:
      "Le corps rigide : efforts, équilibre, et structures qui ne cassent pas.",
    blocks: [
      {
        kind: "text",
        text: "Un solide est en équilibre quand la somme des forces est nulle (`ΣF = 0`) et la somme des moments est nulle (`ΣM = 0`). C'est le test de toute structure : si ces équations ne sont pas satisfaites, quelque chose bouge — ou casse.",
      },
      {
        kind: "list",
        items: [
          "Efforts internes : une poutre en flexion subit traction d'un côté, compression de l'autre — d'où l'importance de la forme de la section (un tube est plus rigide qu'une tige pleine à masse égale).",
          "Contrainte : `σ = F / A` — comparer à la limite du matériau avec un coefficient de sécurité (2–3 en robotique).",
          "Déformation : même sans casser, une structure qui fléchit trop fausse la précision — vérifier la rigidité autant que la résistance.",
        ],
      },
    ],
  },
  {
    id: "concept-dynamique",
    title: "Dynamique : forces et mouvements",
    level: 2,
    intro:
      "`F = m·a` : la loi qui relie ce qu'on veut (mouvement) à ce qu'il faut (force).",
    blocks: [
      {
        kind: "text",
        text: "Deuxième loi de Newton : la somme des forces égale masse × accélération. En rotation : la somme des moments égale inertie × accélération angulaire (`ΣM = J·α`). Tout dimensionnement d'actionneur part de là : quelle accélération pour quelle masse (ou inertie) ?",
      },
      {
        kind: "fields",
        title: "Exemples chiffrés",
        fields: [
          {
            label: "Accélérer 5 kg à 2 m/s²",
            value:
              "`F = 5 × 2 = 10 N` — plus le frottement et la gravité si ça monte : la force motrice est la somme de tout ce qui s'oppose.",
          },
          {
            label: "Tenir 2 kg à 30 cm",
            value:
              "`M = 2 × 9,81 × 0,3 ≈ 5,9 N·m` en statique — avant même d'accélérer : le statique se calcule d'abord, le dynamique s'ajoute.",
          },
          {
            label: "Freiner 10 kg à 3 m/s",
            value:
              "Énergie `½ × 10 × 9 = 45 J` à dissiper : en 1 s c'est 45 W — le freinage est un problème d'énergie, pas juste de « stop ».",
          },
        ],
      },
    ],
  },
  {
    id: "concept-capteurs",
    title: "Capteurs : le principe physique",
    level: 2,
    intro:
      "Chaque capteur a un principe — et des limites qui en découlent.",
    blocks: [
      {
        kind: "fields",
        title: "Les principes courants",
        fields: [
          {
            label: "Ultrasons (temps de vol)",
            value:
              "Émet un « bip » et mesure le retour : `d = v·t / 2` (v ≈ 343 m/s dans l'air). Simple, mais cône large et échos parasites.",
          },
          {
            label: "Infrarouge (triangulation/réflexion)",
            value:
              "Mesure la lumière réfléchie : dépend de la couleur et de la surface — un objet noir est « invisible ».",
          },
          {
            label: "Effet Hall",
            value:
              "Un champ magnétique dévie les charges : détecte position/vitesse sans contact (codeurs magnétiques) — insensible à la poussière.",
          },
          {
            label: "IMU (accéléromètre + gyroscope)",
            value:
              "Mesure accélération et vitesse angulaire par inertie : vite, mais dérive — à fusionner (voir Perception).",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle : choisir un capteur, c'est choisir un principe physique adapté à l'environnement — il n'y a pas de « meilleur capteur », seulement des principes plus ou moins adaptés.",
      },
    ],
  },
  {
    id: "concept-actionneurs",
    title: "Actionneurs : couple, vitesse, rendement",
    level: 2,
    intro:
      "Convertir l'énergie en mouvement : les trois grandeurs qui caractérisent un moteur.",
    blocks: [
      {
        kind: "fields",
        title: "Lire une fiche moteur",
        fields: [
          {
            label: "Couple (N·m)",
            value:
              "L'effort de rotation : le couple nominal (continu) est la vraie spec — le couple max (crête) ne tient que quelques secondes.",
          },
          {
            label: "Vitesse (tr/min ou rad/s)",
            value:
              "À vide (max) et en charge : la vitesse chute avec le couple demandé — la courbe couple/vitesse dit la vérité.",
          },
          {
            label: "Rendement",
            value:
              "Puissance mécanique / puissance électrique : 70–90 % pour un bon moteur — le reste chauffe. Un moteur qui force chauffe : prévoir la dissipation.",
          },
          {
            label: "Puissance mécanique",
            value:
              "`P = C·ω` : le produit couple × vitesse — c'est elle qui dimensionne l'alimentation et la batterie.",
          },
        ],
      },
    ],
  },
  {
    id: "concept-energetique",
    title: "Énergétique : batteries et autonomie",
    level: 2,
    intro:
      "L'énergie est finie : la comptabilité qui évite les mauvaises surprises.",
    blocks: [
      {
        kind: "text",
        text: "Capacité d'une batterie : en ampères-heures (Ah) — `2 Ah` = 2 A pendant 1 h (théorique). Énergie : `E = U·C` — une batterie 11,1 V / 5 Ah contient ~55 Wh. Autonomie : `temps ≈ énergie / puissance moyenne`. Exemple réel : robot qui consomme 55 W en moyenne → ~1 h d'autonomie théorique, ~40 min en pratique (on ne vide jamais à 0 %).",
      },
      {
        kind: "list",
        items: [
          "Courant de crête : les moteurs appellent plusieurs fois leur courant nominal au démarrage — la batterie doit tenir les crêtes, pas juste la moyenne.",
          "Ne jamais décharger une batterie lithium à 0 % : la coupure basse (BMS ou superviseur) protège la batterie — et le robot d'un arrêt brutal.",
          "Le poids est de l'énergie : chaque kg transporté coûte du courant — alléger, c'est augmenter l'autonomie.",
        ],
      },
    ],
  },
  {
    id: "premier-dimensionnement",
    title: "Premier dimensionnement : choisir un moteur",
    level: 2,
    intro:
      "La procédure complète sur un cas concret : soulever une charge avec un bras.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir le cas",
            detail:
              "Bras de 0,3 m, charge de 2 kg en bout, on veut lever en 1 s environ. Mesurer : masse réelle sur balance, longueur au mètre.",
          },
          {
            title: "Calculer le couple statique",
            detail:
              "`M = m·g·d = 2 × 9,81 × 0,3 ≈ 5,9 N·m` — c'est le minimum pour tenir la charge à l'horizontale, la position la plus exigeante.",
          },
          {
            title: "Ajouter la dynamique",
            detail:
              "Accélération angulaire visée ~3 rad/s², inertie ~0,2 kg·m² → `M_dyn ≈ 0,6 N·m`. Total ~6,5 N·m — la dynamique ajoute ~10 % ici (plus si mouvements rapides).",
          },
          {
            title: "Appliquer la marge et choisir",
            detail:
              "Marge ×1,5 → ~10 N·m requis en continu. Choisir un motoréducteur de couple nominal ≥ 10 N·m à la vitesse voulue — jamais un « 6 N·m max ».",
          },
          {
            title: "Vérifier l'énergie",
            detail:
              "`P = C·ω` : à 1 rad/s, ~10 W mécaniques → ~13 W électriques (rendement) — intégrer au budget batterie.",
          },
        ],
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Flux professionnel : dimensionner avant de construire",
    level: 2,
    intro:
      "La discipline : chiffrer, choisir, vérifier — dans cet ordre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cahier des charges chiffré",
            detail:
              "Masses, distances, vitesses, temps, autonomie : tout en nombres avec unités. Un cahier des charges sans chiffres n'en est pas un.",
          },
          {
            title: "Calculs d'ordre de grandeur",
            detail:
              "Couples, puissances, énergies : vérifier la faisabilité en dix minutes de calcul — 90 % des impasses se voient ici.",
          },
          {
            title: "Choix des composants",
            detail:
              "Moteurs, batteries, matériaux : choisir sur les specs continues (pas les max), avec marges documentées.",
          },
          {
            title: "Validation par la mesure",
            detail:
              "Construire, puis mesurer : courant réel, vitesse réelle, autonomie réelle — confronter aux calculs et comprendre les écarts.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-physique",
    title: "Déboguer : quand la physique résiste",
    level: 2,
    intro:
      "Le robot ne fait pas ce qui est prévu : vérifier les hypothèses physiques.",
    blocks: [
      {
        kind: "fields",
        title: "Symptômes et causes physiques",
        fields: [
          {
            label: "Le moteur décroche en charge",
            value:
              "Couple insuffisant : recalculer le couple requis réel (charge + frottements + accélération) — le moteur est sous-dimensionné ou la charge sous-estimée.",
          },
          {
            label: "Ça chauffe anormalement",
            value:
              "Pertes (`I²·R`, frottements) : mesurer le courant réel — un courant bien au-dessus du nominal signale surcharge ou blocage partiel.",
          },
          {
            label: "L'autonomie est moitié moindre",
            value:
              "Consommation sous-estimée (crêtes ignorées) ou batterie vieillie : mesurer la consommation réelle sur un cycle complet.",
          },
          {
            label: "Ça vibre / ça résonne",
            value:
              "Excitation à la fréquence propre : changer la vitesse pour confirmer, puis rigidifier ou éviter la plage critique.",
          },
          {
            label: "La mesure capteur est fausse",
            value:
              "Principe physique inadapté (ultrasons sur surface absorbante, IR sur noir) : changer de principe, pas de code.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-physique",
    title: "Tester : mesurer pour valider",
    level: 2,
    intro:
      "Trois mesures qui valident un dimensionnement.",
    blocks: [
      {
        kind: "fields",
        title: "Les mesures",
        fields: [
          {
            label: "Couple / force réel",
            value:
              "Dynamomètre ou test de charge : le système tient-il la charge max prévue, avec la marge ?",
          },
          {
            label: "Consommation",
            value:
              "Courant moyen ET crête sur un cycle réel : le budget énergétique est-il tenu ?",
          },
          {
            label: "Température",
            value:
              "Moteurs, drivers, régulateurs après 30 min de fonctionnement : stable ou en dérive ? Un composant qui chauffe sans se stabiliser est sous-dimensionné.",
          },
        ],
      },
      {
        kind: "text",
        text: "Tester au pire cas, pas au cas nominal : charge max, pente max, batterie presque vide — c'est là que les marges se révèlent.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les confusions qui coûtent cher.",
    blocks: [
      {
        kind: "list",
        items: [
          "Confondre masse et poids : 2 kg, c'est 19,6 N de poids — le couple se calcule avec le poids (force), pas la masse.",
          "Confondre couple max et couple nominal : dimensionner sur le max (crête, quelques secondes), puis s'étonner que le moteur chauffe en continu.",
          "Oublier le rendement : la puissance électrique = mécanique / rendement — 10 W mécaniques à 70 % = 14 W à fournir.",
          "Ignorer les crêtes : dimensionner la batterie sur le courant moyen et la voir s'effondrer au démarrage des moteurs.",
          "Négliger le frottement : il s'ajoute toujours — un calcul « sans frottement » est un calcul optimiste.",
          "Unités incohérentes : mélanger mm et m, tr/min et rad/s — vérifier les unités de chaque résultat (un couple en N·m, pas en « quelque chose »).",
          "Croire la fiche technique sans mesurer : les specs sont des conditions idéales — mesurer sur le vrai système.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "cinematique-point",
    title: "Cinématique du point",
    level: 3,
    intro:
      "Position, vitesse, accélération : les trois niveaux de la description du mouvement.",
    blocks: [
      {
        kind: "text",
        text: "La vitesse est la dérivée de la position, l'accélération la dérivée de la vitesse. En rotation : vitesse angulaire `ω` (rad/s), et `v = ω·r` (vitesse linéaire à distance r). Conversions utiles : `1 tr/min = 2π/60 ≈ 0,105 rad/s`. Exemple : roue de 10 cm à 60 tr/min → `v = 6,28 × 0,05 ≈ 0,31 m/s`.",
      },
      {
        kind: "list",
        items: [
          "Toujours travailler en rad/s dans les calculs (`P = C·ω` exige des rad/s) — convertir les tr/min d'abord.",
          "Mouvement uniformément accéléré : `v = v0 + a·t`, `x = x0 + v0·t + ½·a·t²` — pour estimer temps et distances d'accélération.",
        ],
      },
    ],
  },
  {
    id: "lois-newton",
    title: "Les lois de Newton",
    level: 3,
    intro:
      "Inertie, `F = m·a`, action-réaction : le socle de la dynamique.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois lois, en robotique",
        fields: [
          {
            label: "Inertie",
            value:
              "Sans force, le mouvement continue : un robot lancé ne s'arrête pas tout seul (dans le vide) — le freinage exige une force.",
          },
          {
            label: "F = m·a",
            value:
              "La loi de dimensionnement : toute accélération désirée impose une force proportionnelle à la masse — alléger divise les efforts.",
          },
          {
            label: "Action-réaction",
            value:
              "Le moteur pousse la charge, la charge « repousse » le support : les fixations encaissent les mêmes efforts que l'action — les dimensionner aussi.",
          },
        ],
      },
    ],
  },
  {
    id: "poids-masse",
    title: "Masse, poids, inertie",
    level: 3,
    intro:
      "Trois concepts souvent confondus, trois rôles différents.",
    blocks: [
      {
        kind: "fields",
        title: "Distinguer",
        fields: [
          {
            label: "Masse (kg)",
            value:
              "La quantité de matière : elle résiste à l'accélération (`F = m·a`) — partout pareil, sur Terre comme sur Mars.",
          },
          {
            label: "Poids (N)",
            value:
              "`P = m·g` : la force de gravité — c'est lui qui charge les structures et exige du couple en statique.",
          },
          {
            label: "Inertie (kg·m²)",
            value:
              "La résistance à l'accélération angulaire (`M = J·α`) : dépend de la répartition de la masse — une masse loin de l'axe coûte cher (`J = m·r²`).",
          },
        ],
      },
      {
        kind: "text",
        text: "Conséquence pratique : rapprocher les masses des axes de rotation divise l'inertie par le carré de la distance — d'où les moteurs placés près de la base des bras, pas au bout.",
      },
    ],
  },
  {
    id: "frottement-detail",
    title: "Frottement statique et dynamique",
    level: 3,
    intro:
      "Le frottement s'oppose toujours au mouvement : le quantifier.",
    blocks: [
      {
        kind: "text",
        text: "Frottement de Coulomb : `F = μ·N` (μ coefficient, N force normale). Le statique (décollage, `μs`) dépasse le dynamique (`μd`) : il faut plus de force pour démarrer que pour continuer. Exemple : caisse de 20 kg sur sol `μs = 0,4` → `F = 0,4 × 20 × 9,81 ≈ 78 N` pour la décoller. Ordres de grandeur : acier/acier ~0,5–0,8 ; pneu/asphalte ~0,7 ; pneu/glace ~0,1.",
      },
      {
        kind: "list",
        items: [
          "Le frottement visqueux (`F = b·v`) s'ajoute à vitesse élevée (paliers, air) : il limite la vitesse max à force donnée.",
          "En robotique mobile : l'adhérence (`μ·N`) borne l'accélération sans glisser — `a_max = μ·g` (~7 m/s² sur asphalte, ~1 m/s² sur glace).",
          "Lubrifier divise μ par 5–10 : le moyen le plus rentable de gagner en efficacité mécanique.",
        ],
      },
    ],
  },
  {
    id: "plan-incline",
    title: "Plan incliné",
    level: 3,
    intro:
      "Décomposer le poids : la base des rampes et des pentes.",
    blocks: [
      {
        kind: "text",
        text: "Sur une pente d'angle α, le poids se décompose : `P·sin(α)` tire vers le bas de la pente, `P·cos(α)` plaque au sol. Exemple : robot de 10 kg sur 15° → force à vaincre `98,1 × sin(15°) ≈ 25 N`, adhérence disponible `μ·98,1·cos(15°)`. Monter exige ce surplus en continu — à intégrer au dimensionnement des moteurs et de la batterie.",
      },
    ],
  },
  {
    id: "travail-energie",
    title: "Travail et énergie",
    level: 3,
    intro:
      "L'énergie se conserve : la comptabilité qui ne ment jamais.",
    blocks: [
      {
        kind: "fields",
        title: "Les formes d'énergie",
        fields: [
          {
            label: "Cinétique",
            value:
              "`½·m·v²` (translation), `½·J·ω²` (rotation) : l'énergie du mouvement — à fournir pour accélérer, à dissiper pour freiner.",
          },
          {
            label: "Potentielle",
            value:
              "`m·g·h` : lever 5 kg de 1 m stocke ~49 J — récupérables à la descente (rarement récupérés en pratique).",
          },
          {
            label: "Travail",
            value:
              "`W = F·d` : une force sur une distance — le lien entre effort et énergie. Monter une pente à force constante, c'est convertir du travail en potentielle.",
          },
        ],
      },
      {
        kind: "text",
        text: "Usage : l'énergie donne des bornes rapides — vitesse max après une chute, distance de freinage, autonomie. Quand un calcul dynamique semble compliqué, le bilan énergétique donne souvent la réponse en deux lignes.",
      },
    ],
  },
  {
    id: "puissance",
    title: "Puissance : le débit d'énergie",
    level: 3,
    intro:
      "`P = F·v = C·ω` : la grandeur qui dimensionne moteurs et batteries.",
    blocks: [
      {
        kind: "text",
        text: "La puissance est l'énergie par unité de temps (watt = joule/seconde). Monter 10 kg à 0,5 m/s exige `P = 98,1 × 0,5 ≈ 49 W` mécaniques — en continu. Un moteur « 100 W » qui fait ça à 70 % de rendement consomme ~70 W électriques.",
      },
      {
        kind: "list",
        items: [
          "Puissance crête vs continue : le démarrage et les accélérations demandent des crêtes — dimensionner l'électronique de puissance sur les crêtes, la batterie sur l'énergie totale.",
          "Ordres de grandeur : servo modélisme ~5–15 W, moteur de robot mobile ~50–500 W, bras industriel ~kW.",
        ],
      },
    ],
  },
  {
    id: "couple-moment",
    title: "Couple et moment",
    level: 3,
    intro:
      "Le moment d'une force : `M = F·d`, avec `d` le bras de levier perpendiculaire.",
    blocks: [
      {
        kind: "text",
        text: "Un même effort produit un moment d'autant plus grand qu'il est loin de l'axe. C'est le levier : une petite force au bout d'un grand bras égale une grande force près de l'axe. En robotique, tout est bras de levier — longueurs de segments, rayons de roues, entraxes.",
      },
      {
        kind: "list",
        items: [
          "Roue motrice : le couple moteur `C` sur une roue de rayon `r` donne une force de traction `F = C / r` — petites roues = plus de force (à couple égal).",
          "Équilibre des moments : un bras articulé en équilibre vérifie `ΣM = 0` — chaque articulation supporte le moment des masses en aval.",
        ],
      },
    ],
  },
  {
    id: "inertie-detail",
    title: "Inertie de rotation",
    level: 3,
    intro:
      "`J = Σ m·r²` : la masse loin de l'axe coûte quadratiquement cher.",
    blocks: [
      {
        kind: "text",
        text: "Exemples : cylindre plein `J = ½·m·r²`, tige autour de son extrémité `J = ⅓·m·L²`. Une tige de 1 kg et 0,5 m tenue par le bout : `J ≈ 0,083 kg·m²` — l'accélérer à 5 rad/s² demande déjà 0,4 N·m avant même la charge.",
      },
      {
        kind: "list",
        items: [
          "Conception : masses près des axes, structures creuses et légères en bout de bras — l'inertie se combat au dessin, pas au moteur.",
          "Réducteur : l'inertie moteur vue de la charge est divisée par le carré du rapport — un fort rapport « efface » l'inertie du moteur (mais ajoute la sienne).",
        ],
      },
    ],
  },
  {
    id: "rendement",
    title: "Rendement : la chaîne des pertes",
    level: 3,
    intro:
      "Chaque conversion perd : multiplier les rendements.",
    blocks: [
      {
        kind: "text",
        text: "Le rendement global est le produit des rendements : batterie (0,95) × électronique (0,95) × moteur (0,8) × réducteur (0,7) ≈ 0,5. La moitié de l'énergie part en chaleur ! Exemple : 20 W mécaniques utiles exigent ~40 W électriques. D'où l'importance de chaque étage — et du refroidissement.",
      },
      {
        kind: "list",
        items: [
          "Le maillon faible domine : un réducteur à 50 % (vis sans fin) plombe toute la chaîne — le choisir en connaissance de cause.",
          "Mesurer le rendement réel : puissance mécanique (couple × vitesse mesurés) / puissance électrique (`U·I`) — rarement aussi bon qu'espéré.",
        ],
      },
    ],
  },
  {
    id: "moteurs-dc-physique",
    title: "Moteur DC : la physique",
    level: 3,
    intro:
      "Couple proportionnel au courant, vitesse à la tension : les deux équations.",
    blocks: [
      {
        kind: "text",
        text: "`C = k·I` (le couple est proportionnel au courant) et `E = k·ω` (la force contre-électromotrice est proportionnelle à la vitesse). À tension fixée, plus le moteur force, plus il consomme et plus il ralentit — la droite couple/vitesse. Le point de rendement max est vers 70–80 % de la vitesse à vide.",
      },
      {
        kind: "list",
        items: [
          "Démarrage : à l'arrêt, `E = 0`, le courant n'est limité que par la résistance (`I = U/R`) — d'où l'appel de courant au démarrage (5–10× le nominal).",
          "Blocage : moteur bloqué sous tension = courant max en continu = surchauffe rapide — protéger (limitation de courant, fusible, timeout logiciel).",
        ],
      },
    ],
  },
  {
    id: "thermique",
    title: "Thermique : la chaleur est une perte",
    level: 3,
    intro:
      "Toute perte devient chaleur : l'évacuer ou la réduire.",
    blocks: [
      {
        kind: "text",
        text: "Pertes Joule : `P = R·I²` — doubler le courant quadruple la chaleur. Un moteur qui consomme 5 A dans 0,5 Ω dissipe 12,5 W en chaleur pure. Température d'équilibre : quand la chaleur produite égale la chaleur évacuée (convection, radiateur).",
      },
      {
        kind: "list",
        items: [
          "Dimensionnement thermique : le couple continu admissible est souvent limité par la température, pas par le magnétisme — ventiler ou réduire le courant.",
          "Mesurer : un thermomètre infrarouge à 20 € révèle les points chauds (moteurs, drivers, régulateurs) en une minute.",
          "Batteries : la chaleur accélère le vieillissement — ne pas enfermer batterie et électronique de puissance sans ventilation.",
        ],
      },
    ],
  },
  {
    id: "batteries-detail",
    title: "Batteries : capacité, courant, chimie",
    level: 3,
    intro:
      "Lire une batterie : ce que disent vraiment les specs.",
    blocks: [
      {
        kind: "fields",
        title: "Les specs",
        fields: [
          {
            label: "Capacité (Ah)",
            value:
              "La charge totale : `5 Ah` = 5 A pendant 1 h (à faible courant — à fort courant, la capacité utile diminue).",
          },
          {
            label: "Taux de décharge (C)",
            value:
              "`20C` sur 5 Ah = 100 A max : le courant que la batterie peut fournir sans dommage — vérifier contre les crêtes des moteurs.",
          },
          {
            label: "Tension (S)",
            value:
              "`3S` = 3 éléments en série ≈ 11,1 V nominaux (12,6 V chargés) : la tension baisse avec la décharge — les régulateurs encaissent la plage.",
          },
          {
            label: "Énergie (Wh)",
            value:
              "`U × Ah` : la vraie mesure d'autonomie — comparer les batteries en Wh, pas en Ah (les tensions diffèrent).",
          },
        ],
      },
      {
        kind: "text",
        text: "Sécurité lithium : chargeur adapté à la chimie, jamais de perforation/écrasement, stockage à ~50 % pour la durée, fusible au plus près des bornes. Une batterie maltraitée est un risque d'incendie — pas une opinion, un fait chimique.",
      },
    ],
  },
  {
    id: "ultrasons-detail",
    title: "Télémétrie ultrasons",
    level: 3,
    intro:
      "`d = v·t/2` : simple, avec ses conditions.",
    blocks: [
      {
        kind: "text",
        text: "Vitesse du son ~343 m/s à 20 °C (varie avec la température : +0,6 m/s par °C — négligeable en robotique courante). Exemple : écho après 5,8 ms → `d = 343 × 0,0058 / 2 ≈ 1 m`. Portée typique 2 cm à 4 m selon le module.",
      },
      {
        kind: "list",
        items: [
          "Cône de détection (~30°) : le capteur voit large — un obstacle latéral est détecté comme frontal.",
          "Surfaces molles ou inclinées : absorbent ou dévient l'onde — mesures fausses ou absentes.",
          "Interférences : deux capteurs ultrasons proches se perturbent — les séquencer (déclencher l'un après l'autre).",
        ],
      },
    ],
  },
  {
    id: "imu-physique",
    title: "IMU : le principe physique",
    level: 3,
    intro:
      "Accéléromètre et gyroscope MEMS : ce qu'ils mesurent vraiment.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux capteurs",
        fields: [
          {
            label: "Accéléromètre",
            value:
              "Mesure l'accélération propre (accélération − gravité) via une micro-masse sur ressorts : au repos, il indique 1 g vers le haut — d'où la mesure d'inclinaison.",
          },
          {
            label: "Gyroscope",
            value:
              "Mesure la vitesse angulaire via l'effet Coriolis sur une masse vibrante : précis à court terme, biais qui dérive.",
          },
          {
            label: "Magnétomètre (boussole)",
            value:
              "Mesure le champ magnétique terrestre : donne un cap absolu, mais perturbé par tout métal ou moteur proche — à étalonner (hard/soft iron).",
          },
        ],
      },
    ],
  },
  {
    id: "resonance",
    title: "Résonance",
    level: 3,
    intro:
      "Fréquence propre et excitation : l'amplification dangereuse.",
    blocks: [
      {
        kind: "text",
        text: "Système masse-ressort : `f0 = (1/2π)·√(k/m)`. Exemple : masse 2 kg sur structure de raideur 8000 N/m → `f0 ≈ 10 Hz`. Si un moteur excite à 10 Hz (600 tr/min avec un balourd), l'amplitude est multipliée par le facteur de qualité (10–50× sans amortissement) — d'où des vibrations destructrices.",
      },
      {
        kind: "list",
        items: [
          "Éviter : placer f0 loin des fréquences d'excitation (×2 au-dessus ou en dessous), ou amortir.",
          "Amortissement : élastomères, frottement — divise l'amplification à la résonance.",
          "Test : balayage en vitesse en mesurant les vibrations — la résonance se voit comme un pic net.",
        ],
      },
    ],
  },
  {
    id: "stabilite-polygone",
    title: "Stabilité : polygone de sustentation",
    level: 3,
    intro:
      "Ne pas basculer : le centre de gravité dans le polygone d'appui.",
    blocks: [
      {
        kind: "text",
        text: "Un robot tient tant que la verticale de son centre de gravité tombe dans le polygone formé par ses points d'appui. En accélérant, le CdG « apparent » se déplace (inertie) : la marge de stabilité se calcule au pire cas (freinage brusque en descente, par exemple).",
      },
      {
        kind: "list",
        items: [
          "Abaisser le CdG et élargir la voie : les deux leviers de stabilité — d'où les batteries en bas et les robots larges.",
          "Dynamique : en virage, la force centrifuge (`m·v²/r`) penche le CdG apparent vers l'extérieur — limiter la vitesse en virage.",
          "Robots à pattes : la stabilité statique exige 3 appuis minimum — d'où la marche alternée ; la stabilité dynamique (course) est un autre problème.",
        ],
      },
    ],
  },
  {
    id: "trajectoires-projectile",
    title: "Trajectoires : le projectile",
    level: 3,
    intro:
      "Lancer un objet : portée, flèche, et angle optimal.",
    blocks: [
      {
        kind: "text",
        text: "Sans air : portée `R = v²·sin(2α)/g`, maximale à 45°. Exemple : lancer à 10 m/s à 45° → `R = 100/9,81 ≈ 10,2 m`. Avec l'air (frottement quadratique), la portée réelle est moindre et l'angle optimal plus bas — le calcul sans air donne une borne supérieure.",
      },
      {
        kind: "list",
        items: [
          "Usage robotique : dimensionner un lanceur, prévoir une zone de réception, ou inverser — intercepter une trajectoire.",
          "Chute libre : `h = ½·g·t²` — tomber de 1 m prend 0,45 s : tout objet lâché à 1 m touche le sol en moins d'une demi-seconde.",
        ],
      },
    ],
  },
  {
    id: "collisions",
    title: "Collisions : quantité de mouvement",
    level: 3,
    intro:
      "`p = m·v` se conserve : ce qui se passe à l'impact.",
    blocks: [
      {
        kind: "text",
        text: "À l'impact, c'est la variation de quantité de mouvement qui compte : `F·Δt = Δp`. Allonger Δt (zones déformables, butées souples) divise la force — le principe des pare-chocs. Exemple : 5 kg à 2 m/s arrêtés en 0,01 s (rigide) → 1000 N ; en 0,2 s (souple) → 50 N.",
      },
      {
        kind: "list",
        items: [
          "Conception : butées en élastomère aux fins de course, châssis qui absorbe — protéger la mécanique des inévitables collisions.",
          "Sécurité : limiter masse × vitesse (l'énergie et la quantité de mouvement) près des humains — la physique de la sécurité.",
        ],
      },
    ],
  },
  {
    id: "echelle-similitude",
    title: "Loi d'échelle : carré-cube",
    level: 3,
    intro:
      "Doubler la taille ne double pas tout : la loi qui piège les maquettes.",
    blocks: [
      {
        kind: "text",
        text: "À forme identique, si les dimensions sont multipliées par k : les surfaces par k², les volumes (et masses) par k³. Un robot 2× plus grand est 8× plus lourd mais ses sections (qui portent) ne sont que 4× plus grandes — il est relativement 2× moins solide. D'où : une maquette qui marche ne garantit pas le grand modèle.",
      },
      {
        kind: "list",
        items: [
          "Petits robots : avantagés en solidité relative et en dynamique (faible inertie) — les insectes robotiques sont « faciles » structurellement.",
          "Grands robots : la masse domine tout — actionneurs, énergie, structure : chaque kg compte triple.",
        ],
      },
    ],
  },
  {
    id: "unites-analyse",
    title: "Unités et analyse dimensionnelle",
    level: 3,
    intro:
      "L'arme anti-erreur : vérifier les unités de tout résultat.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque grandeur a une unité : force en N (kg·m/s²), énergie en J (N·m), puissance en W (J/s), couple en N·m.",
          "Test : `P = C·ω` → N·m × rad/s = (kg·m/s²)·m·(1/s) = kg·m²/s³ = W ✓. Si les unités ne donnent pas des watts, la formule est fausse ou mal appliquée.",
          "Pièges : tr/min vs rad/s (facteur 2π/60), mm vs m (facteur 1000 au cube pour les volumes), °C vs K (décalages).",
          "Réflexe : écrire les unités à chaque étape du calcul — l'erreur se voit avant de se propager.",
        ],
      },
    ],
  },
  {
    id: "machines-simples",
    title: "Machines simples : levier et poulie",
    level: 3,
    intro:
      "Multiplier la force : les mécanismes élémentaires.",
    blocks: [
      {
        kind: "text",
        text: "Levier : `F1·d1 = F2·d2` — une petite force loin du pivot équilibre une grande force près du pivot. Poulie : une poulie mobile divise la force par 2 (en doublant la course à tirer) ; un palan à n brins divise par n. Rien n'est gratuit : on échange force contre déplacement — l'énergie se conserve.",
      },
      {
        kind: "list",
        items: [
          "Usage robotique : démultiplier un petit actionneur (treuil, tendeur), ou comprendre les efforts dans une structure articulée.",
          "Rendement : chaque poulie ajoute du frottement — un palan à 6 brins théoriques donne ~4–5× en pratique.",
        ],
      },
    ],
  },
  {
    id: "electromagnetisme-moteurs",
    title: "Électromagnétisme : d'où vient le couple",
    level: 3,
    intro:
      "Force de Laplace : un courant dans un champ magnétique produit une force.",
    blocks: [
      {
        kind: "text",
        text: "Force de Laplace : `F = B·I·L` (champ × courant × longueur). Dans un moteur, des conducteurs parcourus par un courant baignent dans le champ des aimants : la force qui en résulte, à distance r de l'axe, donne le couple `C = n·B·I·L·r`. D'où les deux équations du moteur DC : plus d'aimant (B) ou plus de courant (I) = plus de couple.",
      },
      {
        kind: "list",
        items: [
          "Comprendre, pas calculer : on ne dimensionne pas un moteur avec Laplace — mais on comprend pourquoi le couple est proportionnel au courant, et pourquoi un moteur saturé magnétiquement ne donne plus rien.",
          "Applications : haut-parleurs, relais, électroaimants — le même principe partout.",
        ],
      },
    ],
  },
  {
    id: "resistance-roulement",
    title: "Résistance au roulement",
    level: 3,
    intro:
      "Rouler coûte de l'énergie : quantifier pour les robots mobiles.",
    blocks: [
      {
        kind: "text",
        text: "La résistance au roulement `F = Crr·N` (Crr coefficient, N poids) : ~0,01 sur asphalte dur, ~0,1–0,3 sur sable ou herbe. Exemple : robot de 20 kg sur herbe (`Crr ≈ 0,15`) → `F ≈ 29 N` en continu juste pour rouler — à 1 m/s, 29 W mécaniques permanents. Le terrain domine le budget énergétique d'un robot mobile.",
      },
      {
        kind: "list",
        items: [
          "Pneus : bien gonflés et larges sur sol mou (répartir la charge), étroits et durs sur sol dur.",
          "Pente + roulement : les deux s'additionnent — le pire cas d'un robot d'extérieur cumule pente max et sol meuble.",
        ],
      },
    ],
  },
  {
    id: "projets-physique",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets : mesurer, dimensionner, valider.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Caractériser un moteur",
            detail:
              "Banc simple : mesurer vitesse à vide, courant de démarrage, couple de décrochage (dynamomètre ou poulie + masses). Tracer la droite couple/vitesse. Livrable : fiche moteur mesurée.",
          },
          {
            title: "Projet 2 — Bilan énergétique d'un robot",
            detail:
              "Mesurer la consommation sur un cycle type, calculer l'autonomie théorique, la vérifier en décharge réelle. Livrable : budget énergétique avec mesures.",
          },
          {
            title: "Projet 3 — Dimensionner une structure",
            detail:
              "Bras ou châssis : calculer efforts, contraintes, flèche ; construire ; charger jusqu'à la limite élastique et comparer. Livrable : note de calcul + essai.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-physique",
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
            label: "Khan Academy — Physique",
            value:
              "Cours vidéo progressifs (khanacademy.org) : mécanique, énergie — parfait pour (re)construire les bases.",
          },
          {
            label: "MIT OpenCourseWare — Mécanique",
            value:
              "Cours complets du MIT en accès libre (ocw.mit.edu) : la rigueur universitaire, gratuite.",
          },
          {
            label: "Fiches techniques",
            value:
              "Datasheets moteurs et batteries : s'entraîner à lire les specs continues vs max — la compétence la plus rentable.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : chaque formule de cette page se vérifie par une mesure — la physique ne se croit pas, elle se mesure.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "La physique maîtrisée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Concevoir les structures : la mécanique applique ces lois en CAO et en fabrication.",
          "Câbler : l'électronique prolonge la physique vers les circuits et les bus.",
          "Approfondir les maths : équations différentielles et algèbre linéaire pour la dynamique avancée.",
          "Asservir : le contrôle utilise vos modèles physiques pour régler les boucles.",
          "Revenir à la roadmap : valider Physique et attaquer la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'électronique pour la robotique : des lois
 * fondamentales aux bus de communication, avec des calculs réels et des
 * schémas en texte. Aucun composant précis inventé : les exemples utilisent
 * des valeurs génériques vérifiables par le calcul.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_ELECTRONIQUE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction : le système nerveux du robot",
    level: 1,
    intro:
      "L'électronique relie le logiciel au monde physique : capteurs, contrôleurs, actionneurs parlent en tensions et courants.",
    blocks: [
      {
        kind: "text",
        text: "Tout robot possède une couche électronique : des capteurs convertissent le monde en signaux électriques, un microcontrôleur les lit et décide, des drivers convertissent ses ordres en puissance pour les moteurs. Comprendre cette couche, c'est pouvoir câbler, mesurer et déboguer le hardware au lieu de le subir.",
      },
      {
        kind: "diagram",
        title: "La chaîne électronique d'un robot",
        lines: [
          "MONDE PHYSIQUE (distance, lumière, température…)",
          "     │",
          "     ▼",
          "CAPTEURS ──► signaux électriques (tensions, courants)",
          "     │",
          "     ▼",
          "MICROCONTRÔLEUR (lit, calcule, décide)",
          "     │",
          "     ▼",
          "DRIVERS / ÉTAGE DE PUISSANCE (amplifient vers les moteurs)",
          "     │",
          "     ▼",
          "ACTIONNEURS (moteurs, servos) ──► MONDE PHYSIQUE",
        ],
      },
      {
        kind: "text",
        text: "Trois grandeurs gouvernent tout : la tension (la « pression » électrique, en volts), le courant (le débit de charges, en ampères) et la puissance (le produit des deux, en watts). Tout le reste — bus de communication, alimentations, drivers — n'est que l'organisation de ces grandeurs.",
      },
    ],
  },
  {
    id: "ou-s-applique",
    title: "Où l'électronique s'applique en robotique",
    level: 1,
    intro:
      "Du capteur à 2 € au contrôleur de drone : les mêmes briques à toutes les échelles.",
    blocks: [
      {
        kind: "fields",
        title: "Les rôles de l'électronique dans un robot",
        fields: [
          {
            label: "Acquisition",
            value:
              "Lire les capteurs : convertir des tensions en nombres (ADC), décoder des bus numériques (I2C, SPI, UART), échantillonner au bon rythme.",
          },
          {
            label: "Commande",
            value:
              "Piloter les actionneurs : générer du PWM pour la vitesse, commuter des ponts en H pour le sens, positionner des servos.",
          },
          {
            label: "Communication",
            value:
              "Faire dialoguer les cartes entre elles et avec l'ordinateur : bus série, radio, réseaux — le système nerveux distribué.",
          },
          {
            label: "Alimentation",
            value:
              "Distribuer l'énergie proprement : réguler les tensions, filtrer le bruit, protéger contre les inversions et les surintensités.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne nouvelle : on débute avec un microcontrôleur de prototypage et une poignée de composants sur breadboard. Les réflexes acquis (mesurer avant de supposer, vérifier l'alimentation d'abord) servent ensuite sur les systèmes les plus complexes.",
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
      "L'électronique repose sur la physique : tension, courant et puissance doivent être des réflexes.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir, et pourquoi",
        fields: [
          {
            label: "Physique : tension, courant, puissance",
            value:
              "Savoir ce que mesurent un volt, un ampère et un watt, et les relier (`P = U·I`) : c'est le vocabulaire de base de tout calcul de dimensionnement.",
          },
          {
            label: "Physique : loi d'Ohm",
            value:
              "`U = R·I` : la relation fondamentale des circuits. Elle sert à choisir une résistance, à prédire un courant, à vérifier une mesure.",
          },
          {
            label: "Mathématiques : algèbre de base",
            value:
              "Résoudre `U = R·I` dans les trois sens, manipuler les puissances de 10 (milli, micro, kilo) : les calculs électroniques sont simples mais incessants.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pas besoin d'en savoir plus pour commencer : le reste (bus, ADC, alimentations) s'apprend en montant des circuits. La physique donne les fondations, la pratique construit dessus.",
      },
    ],
  },
  {
    id: "banc-de-travail",
    title: "Le banc de travail : outillage minimal",
    level: 2,
    intro:
      "Cinq outils couvrent 95 % du débogage électronique : les connaître avant d'en avoir besoin.",
    blocks: [
      {
        kind: "fields",
        title: "L'outillage de base",
        fields: [
          {
            label: "Multimètre",
            value:
              "Mesure tension, courant, résistance et continuité. L'outil n°1 : devant tout problème, on mesure les tensions d'alimentation d'abord.",
          },
          {
            label: "Alimentation de laboratoire",
            value:
              "Fournit une tension réglable avec limitation de courant : elle protège le montage en coupant avant la destruction en cas de court-circuit.",
          },
          {
            label: "Breadboard + fils",
            value:
              "La plaque d'essai sans soudure : on y prototype les circuits en minutes. Limitée en fréquence et en courant, mais idéale pour apprendre.",
          },
          {
            label: "Oscilloscope",
            value:
              "Affiche les signaux en fonction du temps : voir un PWM, un bus série ou du bruit là où le multimètre ne donne qu'une moyenne.",
          },
          {
            label: "Fer à souder",
            value:
              "Pour les montages définitifs : souder proprement (chauffer la patte et le fil, pas la soudure) est un geste qui s'apprend vite.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'atelier : toujours alimenter un nouveau montage via une alimentation limitée en courant (ou avec un fusible). La majorité des composants grillés le sont dans les dix premières secondes, par court-circuit ou inversion de polarité.",
      },
    ],
  },
  {
    id: "concept-circuits",
    title: "Les circuits : loi d'Ohm et diviseur de tension",
    level: 2,
    intro:
      "Deux outils de calcul qui résolvent la moitié des problèmes de câblage.",
    blocks: [
      {
        kind: "text",
        text: "La loi d'Ohm `U = R·I` relie tension, résistance et courant. Exemple réel : une LED prévue pour 20 mA avec une chute de 2 V, alimentée en 5 V. La résistance série doit absorber `5 − 2 = 3 V` sous 20 mA : `R = 3 / 0,02 = 150 Ω`. Sans elle, le courant n'est limité par rien et la LED meurt en quelques secondes.",
      },
      {
        kind: "text",
        text: "Le diviseur de tension : deux résistances en série répartissent la tension proportionnellement à leurs valeurs. `Vout = Vin · R2 / (R1 + R2)`. Exemple réel : `Vin = 5 V`, `R1 = R2 = 10 kΩ` → `Vout = 2,5 V`. C'est ainsi qu'on ramène un signal 5 V vers une entrée 3,3 V, ou qu'on lit un capteur résistif.",
      },
      {
        kind: "diagram",
        title: "Diviseur de tension",
        lines: [
          "Vin (5 V) ──►── R1 (10 kΩ) ──►──┬──► Vout = 2,5 V",
          "                               │",
          "                          R2 (10 kΩ)",
          "                               │",
          "                              GND",
        ],
      },
    ],
  },
  {
    id: "concept-microcontroleurs",
    title: "Microcontrôleurs : Arduino / ESP32",
    level: 2,
    intro:
      "Le cerveau embarqué : lire des entrées, calculer, piloter des sorties — en boucle.",
    blocks: [
      {
        kind: "fields",
        title: "Ce que fait un microcontrôleur",
        fields: [
          {
            label: "GPIO",
            value:
              "Broches d'entrée/sortie numériques : lire un bouton, allumer une LED, générer un signal. Chaque broche a un courant max (quelques dizaines de mA) — jamais un moteur directement dessus.",
          },
          {
            label: "ADC",
            value:
              "Convertisseur analogique-numérique : transforme une tension (ex. 0–3,3 V) en nombre (ex. 0–4095 sur 12 bits). C'est ainsi qu'on lit un capteur analogique.",
          },
          {
            label: "PWM",
            value:
              "Modulation de largeur d'impulsion : un signal carré dont le rapport cyclique règle la puissance moyenne — vitesse d'un moteur, luminosité d'une LED.",
          },
          {
            label: "Périphériques série",
            value:
              "UART, I2C, SPI matériels : dialoguer avec capteurs, écrans et autres cartes sans bit-banging logiciel.",
          },
          {
            label: "ESP32 : le plus",
            value:
              "WiFi et Bluetooth intégrés : le choix naturel dès que le robot doit communiquer sans fil ou servir une interface web locale.",
          },
        ],
      },
      {
        kind: "text",
        text: "Programme type : une boucle qui lit les capteurs, calcule, met à jour les sorties — exactement la boucle sense-think-act, à quelques millisecondes près. C'est le microcontrôleur qui exécute le contrôle bas niveau pendant que l'ordinateur (ou Raspberry Pi) gère le haut niveau.",
      },
    ],
  },
  {
    id: "concept-bus",
    title: "Bus de communication : I2C, SPI, UART",
    level: 2,
    intro:
      "Trois façons de faire dialoguer les puces : savoir choisir selon le besoin.",
    blocks: [
      {
        kind: "table",
        headers: ["", "UART", "I2C", "SPI"],
        rows: [
          ["Fils", "2 (TX, RX) + masse", "2 (SDA, SCL) + masse", "4 (MOSI, MISO, SCK, CS) + masse"],
          ["Topologie", "Point à point", "Bus : jusqu'à ~127 adresses", "Bus : 1 CS par esclave"],
          ["Vitesse typique", "Jusqu'à ~1 Mbit/s", "100 kHz – 3,4 MHz", "Jusqu'à dizaines de MHz"],
          ["Usage robotique", "GPS, debug console, modules radio", "Capteurs lents (IMU, température, ToF)", "Capteurs rapides, écrans, ADC externes"],
          ["Piège classique", "Croiser TX/RX ; vitesses (baud) identiques des deux côtés", "Résistances de pull-up obligatoires ; adresses en conflit", "Un CS par esclave ; modes d'horloge (CPOL/CPHA)"],
        ],
      },
      {
        kind: "text",
        text: "Règle de choix : UART pour dialoguer simplement entre deux cartes, I2C pour brancher plusieurs capteurs lents sur deux fils, SPI quand le débit compte. Dans tous les cas, les masses doivent être communes — sans référence commune, aucun signal n'a de sens.",
      },
    ],
  },
  {
    id: "concept-alimentation",
    title: "Alimentation : réguler et distribuer",
    level: 2,
    intro:
      "Un robot mal alimenté est un robot qui se comporte bizarrement : chutes de tension, resets, bruit.",
    blocks: [
      {
        kind: "fields",
        title: "Les concepts clés",
        fields: [
          {
            label: "Rails de tension",
            value:
              "Un robot a souvent plusieurs tensions : batterie (ex. 7,4 V ou 11,1 V), 5 V pour les servos, 3,3 V pour la logique. Chaque rail est régulé séparément.",
          },
          {
            label: "Régulateurs",
            value:
              "Linéaires (simples, peu de bruit, chauffent : la différence de tension × le courant part en chaleur) ou à découpage (efficaces ~90 %, plus bruyants). Choisir selon courant et sensibilité au bruit.",
          },
          {
            label: "Découplage",
            value:
              "Un condensateur (typiquement 100 nF) au plus près de chaque circuit intégré : il fournit les pointes de courant locales et évite que le bruit d'un composant pollue les autres.",
          },
          {
            label: "Dimensionnement",
            value:
              "Additionner les courants max de chaque consommateur, ajouter une marge (20–30 %), vérifier que la batterie tient l'autonomie visée (`temps ≈ capacité / courant moyen`).",
          },
        ],
      },
      {
        kind: "text",
        text: "Symptôme typique d'une alimentation sous-dimensionnée : le robot « reboot » quand les moteurs démarrent — l'appel de courant fait chuter la tension et le microcontrôleur se réinitialise. La solution n'est jamais dans le code : c'est plus de capacité (batterie, condensateurs) ou des rails séparés.",
      },
    ],
  },
  {
    id: "concept-pcb",
    title: "PCB : du breadboard au circuit imprimé",
    level: 2,
    intro:
      "Quand le prototype marche : le graver dans un circuit imprimé propre et fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Pourquoi passer au PCB : un breadboard vibre, s'oxyde et se débranche — inacceptable sur un robot mobile. Le PCB fige le montage de façon robuste.",
          "Le flux : schéma (connexions logiques) → empreintes (boîtiers réels) → routage (pistes de cuivre) → vérification (règles de fabrication) → fabrication.",
          "Règles de base : pistes d'alimentation larges (le courant impose la largeur), plan de masse continu (retour des courants, blindage), condensateurs de découplage au plus près des puces.",
          "Vérifier trois fois avant de commander : chaque erreur sur le PCB coûte une semaine. Relire le schéma broche par broche contre les datasheets.",
        ],
      },
    ],
  },
  {
    id: "premier-montage",
    title: "Premier montage : lire un capteur",
    level: 2,
    intro:
      "Câbler un diviseur, le mesurer, le lire avec un microcontrôleur : la boucle complète.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Monter le diviseur sur breadboard",
            detail:
              "Deux résistances de 10 kΩ en série entre 5 V (ou 3,3 V) et la masse. Le point milieu est la sortie. Calcul attendu : `Vout = Vin / 2`.",
          },
          {
            title: "Mesurer au multimètre",
            detail:
              "Vérifier `Vin` puis `Vout` : on doit lire la moitié. Si ce n'est pas le cas, vérifier le câblage avant d'incriminer la théorie — 99 % des écarts viennent du montage.",
          },
          {
            title: "Brancher sur l'ADC du microcontrôleur",
            detail:
              "Relier `Vout` à une entrée analogique (masse commune obligatoire). Lire la valeur : avec un ADC 12 bits en 3,3 V, on attend environ 2048 pour 1,65 V.",
          },
          {
            title: "Remplacer une résistance par un capteur",
            detail:
              "Mettre une photorésistance à la place de R1 : la tension de sortie varie maintenant avec la lumière. On vient de construire un capteur de luminosité — le principe est identique pour température, flexion, force.",
          },
        ],
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Flux professionnel : du besoin au PCB",
    level: 2,
    intro:
      "La méthode qui évite les cartes qui ne marchent pas : chaque étape valide la précédente.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Spécifier",
            detail:
              "Lister les entrées/sorties, tensions, courants max, contraintes (taille, autonomie, coût). Sans spec écrite, on oublie un rail d'alimentation.",
          },
          {
            title: "Schématiser",
            detail:
              "Dessiner le schéma complet (à la main ou en CAO électronique) : chaque connexion explicite, chaque alimentation découplée, chaque broche vérifiée.",
          },
          {
            title: "Prototyper",
            detail:
              "Monter les sous-ensembles critiques sur breadboard : valider chaque fonction (lecture capteur, driver moteur) isolément avant d'intégrer.",
          },
          {
            title: "Router et fabriquer",
            detail:
              "Passer au PCB en respectant les règles (plans de masse, largeurs, découplage), faire relire le schéma par un pair, commander.",
          },
          {
            title: "Tester méthodiquement",
            detail:
              "À la réception : continuité et courts-circuits hors tension d'abord, puis alimentations seules, puis sous-ensembles un par un. Jamais tout d'un coup.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-electronique",
    title: "Déboguer : la méthode par moitié",
    level: 2,
    intro:
      "Un circuit qui ne marche pas se débogue comme un programme : par dichotomie, en mesurant.",
    blocks: [
      {
        kind: "fields",
        title: "La procédure, dans l'ordre",
        fields: [
          {
            label: "1. L'alimentation",
            value:
              "Mesurer chaque rail : la bonne tension, présente, stable. 50 % des pannes sont ici (court-circuit, régulateur grillé, polarité inversée).",
          },
          {
            label: "2. Couper en deux",
            value:
              "Isoler la moitié du circuit (débrancher l'aval) : si l'amont marche seul, la panne est en aval. Répéter jusqu'au composant fautif.",
          },
          {
            label: "3. La continuité",
            value:
              "Hors tension, vérifier au multimètre que chaque connexion existe et qu'aucun court-circuit ne s'est glissé (soudure qui touche, fil pincé).",
          },
          {
            label: "4. Les signaux",
            value:
              "À l'oscilloscope : le signal attendu est-il présent, à la bonne amplitude, à la bonne fréquence ? Comparer chaque nœud au schéma.",
          },
          {
            label: "5. Les hypothèses",
            value:
              "Ne changer qu'une chose à la fois et noter. Changer trois composants d'un coup apprend seulement que « ça remarche », pas pourquoi c'était en panne.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-montage",
    title: "Tester : vérifier un montage",
    level: 2,
    intro:
      "Une checklist de mise sous tension qui évite la fumée.",
    blocks: [
      {
        kind: "list",
        items: [
          "Inspection visuelle : soudures propres, aucun fil qui touche son voisin, polarités des composants polarisés (diodes, condensateurs électrolytiques) correctes.",
          "Test hors tension : continuité des alimentations vers la masse ? Un bip = court-circuit = ne pas brancher.",
          "Première mise sous tension via alimentation limitée en courant (ex. 100 mA) : si la limitation s'enclenche, couper et chercher le court-circuit.",
          "Mesurer chaque rail de tension avant de brancher les circuits sensibles : un régulateur mal câblé peut sortir la tension d'entrée.",
          "Brancher les sous-ensembles un par un en vérifiant le comportement de chacun : capteur lu correctement, moteur qui tourne dans le bon sens.",
          "Test d'endurance : laisser tourner 30 minutes en surveillant la température des régulateurs et drivers — un composant qui chauffe anormalement est sous-dimensionné.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Le bestiaire des pannes de débutant : toutes évitables, toutes déjà vécues par tout le monde.",
    blocks: [
      {
        kind: "list",
        items: [
          "Inversion de polarité : brancher l'alimentation à l'envers détruit la plupart des composants en quelques secondes — détrompeurs et diodes de protection existent pour ça.",
          "Masse commune oubliée : deux cartes sans masse reliée ne se « voient » pas ; les signaux flottent et le comportement est aléatoire.",
          "Moteur branché directement sur une GPIO : le courant détruit la broche (et parfois le microcontrôleur) — toujours passer par un driver.",
          "Pull-ups I2C oubliées : le bus ne monte jamais à l'état haut, aucune communication — les résistances de tirage sont obligatoires.",
          "Court-circuit sur breadboard : un fil mal placé relie l'alimentation à la masse ; l'alimentation limitée en courant sauve le montage.",
          "Oublier la résistance série d'une LED : sans limitation de courant, elle brille très fort, très brièvement.",
          "Alimenter un servo 5 V depuis le régulateur 3,3 V du microcontrôleur : sous-tension + surintensité = comportement erratique et resets.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "calculs-loi-ohm",
    title: "Calculs : loi d'Ohm et puissance",
    level: 3,
    intro:
      "Dimensionner sans deviner : les trois formules qui gouvernent les circuits.",
    blocks: [
      {
        kind: "text",
        text: "`U = R·I` (loi d'Ohm), `P = U·I` (puissance), et leurs combinaisons `P = R·I² = U²/R`. Exemple réel : un moteur consomme 2 A sous 12 V → `P = 24 W`. Le driver doit tenir au moins ce courant en continu (avec marge), et dissiper ses pertes (`Rds_on · I²` pour un MOSFET).",
      },
      {
        kind: "fields",
        title: "Exemples chiffrés types",
        fields: [
          {
            label: "Résistance LED",
            value:
              "Alim 5 V, LED 2 V / 20 mA : `R = (5 − 2) / 0,02 = 150 Ω`. Puissance dans la résistance : `P = 3 × 0,02 = 60 mW` — une 1/4 W suffit largement.",
          },
          {
            label: "Chute dans un fil",
            value:
              "Fil de 0,1 Ω parcouru par 5 A : `U = 0,5 V` perdus, `P = 2,5 W` dissipés en chaleur. D'où l'importance de fils assez gros pour les moteurs.",
          },
          {
            label: "Pont diviseur chargé",
            value:
              "Un diviseur 10 kΩ/10 kΩ attaquant une entrée de 10 kΩ ne donne plus 2,5 V mais ~1,7 V : la charge modifie le diviseur. Règle : l'impédance de charge doit être ≥ 10× celle du diviseur.",
          },
        ],
      },
    ],
  },
  {
    id: "thevenin",
    title: "Thévenin et Norton : simplifier les circuits",
    level: 3,
    intro:
      "Réduire n'importe quel réseau linéaire à une source + une résistance : l'outil d'analyse.",
    blocks: [
      {
        kind: "text",
        text: "Théorème de Thévenin : vu de deux bornes, tout réseau linéaire se comporte comme une source de tension `Vth` (tension à vide) en série avec une résistance `Rth`. Norton : l'équivalent en source de courant. Cela permet de calculer l'effet d'une charge sans résoudre tout le circuit — et formalise la notion d'impédance de sortie.",
      },
      {
        kind: "list",
        items: [
          "Application directe : calculer la tension réelle fournie à une charge à partir de la résistance interne de la source (ex. une batterie de 0,2 Ω interne chutant de 1 V sous 5 A).",
          "Adaptation d'impédance : le transfert de puissance maximal s'obtient quand la charge égale `Rth` — utile en radio, rarement en puissance (on y préfère le rendement).",
          "Limite : valable uniquement pour les réseaux linéaires ; les composants actifs saturés ou commutés sortent du cadre.",
        ],
      },
    ],
  },
  {
    id: "condensateurs",
    title: "Condensateurs : lisser, découpler, temporiser",
    level: 3,
    intro:
      "Le composant qui stocke la tension : trois usages à maîtriser.",
    blocks: [
      {
        kind: "text",
        text: "Un condensateur stocke de l'énergie (`E = ½·C·U²`) et s'oppose aux variations rapides de tension. Charge à travers une résistance : `τ = R·C` (constante de temps), 63 % en `τ`, ~99 % en `5τ`. Exemple : `R = 10 kΩ`, `C = 100 µF` → `τ = 1 s`.",
      },
      {
        kind: "fields",
        title: "Les trois usages",
        fields: [
          {
            label: "Découplage",
            value:
              "100 nF au plus près de chaque circuit intégré : réservoir local de courant pour les appels rapides, il empêche le bruit de se propager sur le rail d'alimentation.",
          },
          {
            label: "Réservoir (bulk)",
            value:
              "100–1000 µF à l'entrée d'un régulateur ou près d'un moteur : absorbe les appels de courant lents (démarrage moteur) que le découplage seul ne couvre pas.",
          },
          {
            label: "Filtrage / temporisation",
            value:
              "Avec une résistance, forme un filtre passe-bas (`fc = 1 / (2πRC)`) ou une temporisation. Base des filtres anti-repliement avant ADC.",
          },
        ],
      },
    ],
  },
  {
    id: "diodes",
    title: "Diodes : le sens unique",
    level: 3,
    intro:
      "Laisser passer le courant dans un seul sens : protection, redressement, signalisation.",
    blocks: [
      {
        kind: "fields",
        title: "Usages en robotique",
        fields: [
          {
            label: "Protection contre l'inversion",
            value:
              "Une diode en série avec l'alimentation bloque tout si on branche à l'envers (au prix d'une chute de ~0,7 V). Simple et efficace pour les petits courants.",
          },
          {
            label: "Roue libre",
            value:
              "En parallèle d'une bobine (moteur, relais), elle absorbe la surtension inductive à la coupure : sans elle, le pic détruit le transistor de commande.",
          },
          {
            label: "LED et signalisation",
            value:
              "Une diode électroluminescente avec sa résistance série : le moyen le plus simple de visualiser un état (alimentation OK, signal actif).",
          },
          {
            label: "Détection / mesure",
            value:
              "Photodiodes : convertir la lumière en courant — base des capteurs de ligne, fourches optiques et télémètres simples.",
          },
        ],
      },
      {
        kind: "text",
        text: "Caractéristique à retenir : une diode silicium passante chute ~0,7 V (0,2–0,3 V pour une Schottky, plus rapide et mieux adaptée à la roue libre). Toujours vérifier le courant max et la tension inverse max dans la datasheet.",
      },
    ],
  },
  {
    id: "transistors",
    title: "Transistors : commuter et amplifier",
    level: 3,
    intro:
      "Le composant qui permet à un microcontrôleur de piloter le monde réel.",
    blocks: [
      {
        kind: "text",
        text: "Un transistor est un interrupteur commandé : un petit signal sur la commande (base ou grille) contrôle un grand courant (collecteur-émetteur ou drain-source). En robotique, l'usage dominant est la commutation — allumer/éteindre une charge — plutôt que l'amplification analogique.",
      },
      {
        kind: "fields",
        title: "MOSFET vs bipolaire, en pratique",
        fields: [
          {
            label: "MOSFET canal N (low-side)",
            value:
              "Le standard pour commuter une charge vers la masse : commandé en tension (pas de courant de grille en statique), très faible `Rds_on` donc peu de pertes. Vérifier le seuil `Vgs_th` : un MOSFET « logique » commute fully à 3,3/5 V.",
          },
          {
            label: "Transistor bipolaire NPN",
            value:
              "Commandé en courant (il faut un courant de base ≈ Ic/10 en saturation), chute `Vce_sat` ~0,2–0,3 V. Simple et robuste pour les petits courants.",
          },
          {
            label: "Règle de dimensionnement",
            value:
              "Le transistor doit tenir la tension max ET le courant max de la charge, avec marge ; calculer ses pertes (`Rds_on·I²` ou `Vce_sat·I`) et prévoir le refroidissement si besoin.",
          },
        ],
      },
    ],
  },
  {
    id: "pont-en-h",
    title: "Pont en H : piloter un moteur dans les deux sens",
    level: 3,
    intro:
      "Quatre interrupteurs en H : le circuit qui donne sens et vitesse aux moteurs DC.",
    blocks: [
      {
        kind: "diagram",
        title: "Principe du pont en H",
        lines: [
          "        ┌───[Q1]───┬───[Q2]───┐",
          "        │          │          │",
          "       +V       MOTEUR       GND",
          "        │          │          │",
          "        └───[Q3]───┴───[Q4]───┘",
          "",
          "Q1+Q4 passants : courant → ──► moteur tourne en avant",
          "Q2+Q3 passants : courant ← ── moteur tourne en arrière",
          "JAMAIS Q1+Q3 (ou Q2+Q4) ensemble : court-circuit franc !",
        ],
      },
      {
        kind: "text",
        text: "La vitesse se règle par PWM sur les transistors du pont : le rapport cyclique fixe la tension moyenne donc la vitesse. En pratique, on utilise des drivers intégrés (pont en H + protections) plutôt que quatre transistors discrets — mais comprendre le schéma permet de diagnostiquer quand le driver se met en défaut (surintensité, surchauffe, sous-tension).",
      },
    ],
  },
  {
    id: "pwm-detail",
    title: "PWM en détail",
    level: 3,
    intro:
      "Régler la puissance moyenne avec un signal tout-ou-rien : rapport cyclique et fréquence.",
    blocks: [
      {
        kind: "text",
        text: "Le PWM commute entre 0 et `Vcc` à fréquence fixe ; le rapport cyclique (temps à l'état haut / période) fixe la valeur moyenne : 50 % → `Vcc/2` en moyenne. Pour un moteur, l'inductance lisse le courant : le moteur « voit » la moyenne.",
      },
      {
        kind: "fields",
        title: "Choisir la fréquence",
        fields: [
          {
            label: "Trop basse (< ~1 kHz pour un moteur)",
            value:
              "Le courant ondule fortement, le moteur siffle et chauffe : chaque impulsion est un à-coup.",
          },
          {
            label: "Zone usuelle (10–30 kHz)",
            value:
              "Au-dessus de l'audible, ondulation faible, commutations encore peu coûteuses : le compromis standard des drivers.",
          },
          {
            label: "Trop haute (> ~100 kHz)",
            value:
              "Les pertes de commutation explosent et le driver chauffe : inutile pour un moteur, réservé aux alimentations à découpage.",
          },
          {
            label: "Servos de modélisme",
            value:
              "Cas particulier : 50 Hz avec une impulsion de 1 à 2 ms dont la largeur code la position — ce n'est pas du PWM de puissance mais un signal de commande.",
          },
        ],
      },
    ],
  },
  {
    id: "adc-detail",
    title: "ADC : convertir le monde en nombres",
    level: 3,
    intro:
      "Résolution, référence, échantillonnage : lire une tension sans se tromper.",
    blocks: [
      {
        kind: "text",
        text: "Un ADC `n` bits découpe sa plage de référence en `2^n` pas. Exemple : 12 bits en 3,3 V → 4096 pas de `3,3 / 4096 ≈ 0,8 mV`. La résolution n'est pas la précision : le bruit et la non-linéarité du convertisseur limitent la précision réelle à moins que les bits affichés.",
      },
      {
        kind: "fields",
        title: "Les paramètres qui comptent",
        fields: [
          {
            label: "Tension de référence",
            value:
              "Elle définit le plein échelle : une référence bruitée ou qui varie avec l'alimentation fausse toutes les mesures. Référence interne ou externe selon l'exigence.",
          },
          {
            label: "Impédance de source",
            value:
              "L'ADC prélève un petit courant pendant la conversion : si la source est trop impédante (diviseur de 1 MΩ), la mesure s'effondre. Règle : source ≤ quelques kΩ, ou suiveur.",
          },
          {
            label: "Fréquence d'échantillonnage",
            value:
              "Shannon : échantillonner à plus de 2× la plus haute fréquence du signal, avec un filtre anti-repliement devant. Sinon, les hautes fréquences se replient en artefacts basse fréquence.",
          },
          {
            label: "Moyennage",
            value:
              "Moyenner N échantillons divise le bruit par √N : gratuit en logiciel, au prix d'un temps de réponse plus long.",
          },
        ],
      },
    ],
  },
  {
    id: "capteurs-resistifs",
    title: "Capteurs résistifs et diviseurs",
    level: 3,
    intro:
      "Photoresistances, thermistances, FSR : quand le capteur est une résistance variable.",
    blocks: [
      {
        kind: "text",
        text: "Beaucoup de capteurs simples sont des résistances variables : la photorésistance (lumière), la thermistance (température), le FSR (force). On les lit avec un diviseur : le capteur en série avec une résistance fixe, on mesure le point milieu. La résistance fixe se choisit proche de la résistance du capteur au milieu de sa plage utile, pour maximiser la sensibilité.",
      },
      {
        kind: "list",
        items: [
          "Non-linéarité : la tension du diviseur n'est pas proportionnelle à la grandeur mesurée — on linéarise par table de correspondance ou formule (ex. Steinhart-Hart pour les thermistances).",
          "Auto-échauffement : le courant du diviseur chauffe une thermistance et fausse la mesure — limiter le courant ou mesurer par impulsions.",
          "Étalonnage : mesurer au moins deux points connus (ex. glace fondante et eau bouillante pour la température) pour ancrer la courbe.",
        ],
      },
    ],
  },
  {
    id: "i2c-detail",
    title: "I2C en détail",
    level: 3,
    intro:
      "Le bus à deux fils : adressage, acquittements et pièges.",
    blocks: [
      {
        kind: "diagram",
        title: "Une transaction I2C (lecture)",
        lines: [
          "START ─► adresse (7 bits) + R/W ─► ACK (esclave)",
          "      ─► registre visé ─► ACK",
          "      ─► RESTART ─► adresse + lecture ─► ACK",
          "      ─► octet de donnée ─► ACK ─► … ─► NACK ─► STOP",
        ],
      },
      {
        kind: "fields",
        title: "Points critiques",
        fields: [
          {
            label: "Pull-ups",
            value:
              "SDA et SCL sont en collecteur ouvert : sans résistances de tirage vers Vcc (typiquement 2,2–10 kΩ selon vitesse et capacité du bus), rien ne fonctionne. Une seule paire par bus.",
          },
          {
            label: "Adresses 7 bits",
            value:
              "Chaque esclave a une adresse (souvent configurable par broches) : deux capteurs avec la même adresse = conflit. Vérifier avant d'acheter, ou utiliser un multiplexeur.",
          },
          {
            label: "Vitesses",
            value:
              "100 kHz (standard), 400 kHz (fast), jusqu'à 3,4 MHz (high-speed) : tous les esclaves doivent supporter la vitesse choisie, et la capacité du bus limite la longueur.",
          },
          {
            label: "Niveaux logiques",
            value:
              "Un bus 5 V et un esclave 3,3 V ne se mélangent pas sans adaptation de niveaux (transistor ou circuit dédié) : le 5 V détruit l'esclave 3,3 V.",
          },
        ],
      },
    ],
  },
  {
    id: "spi-detail",
    title: "SPI en détail",
    level: 3,
    intro:
      "Le bus rapide : horloge, chip select et quatre modes.",
    blocks: [
      {
        kind: "text",
        text: "SPI est full-duplex : à chaque coup d'horloge (SCK), le maître envoie un bit sur MOSI et reçoit un bit sur MISO simultanément. Le chip select (CS, actif bas) sélectionne l'esclave : un CS par esclave, d'où le câblage plus lourd qu'I2C.",
      },
      {
        kind: "fields",
        title: "Les quatre modes",
        fields: [
          {
            label: "CPOL / CPHA",
            value:
              "Polarité de l'horloge au repos (CPOL) et front d'échantillonnage (CPHA) : 4 combinaisons (modes 0–3). Maître et esclave doivent utiliser le même — première chose à vérifier dans les datasheets.",
          },
          {
            label: "Débit",
            value:
              "Limité par le maître et l'esclave le plus lent : diviser l'horloge en conséquence. Des dizaines de MHz sont courants sur courtes distances.",
          },
          {
            label: "Pas d'acquittement",
            value:
              "Contrairement à I2C, aucun ACK : si le câblage est mauvais, on lit du bruit sans erreur signalée. Vérifier avec des lectures de registres connus (chip ID).",
          },
        ],
      },
    ],
  },
  {
    id: "uart-detail",
    title: "UART en détail",
    level: 3,
    intro:
      "La liaison série asynchrone : simple, universelle, avec ses règles.",
    blocks: [
      {
        kind: "text",
        text: "UART transmet sans horloge partagée : émetteur et récepteur s'accordent sur un débit (baud). Chaque trame : 1 bit de start, 5–9 bits de données, parité optionnelle, 1–2 bits de stop. Exemple : à 115 200 baud, un octet (~10 bits) prend ~87 µs, soit ~11 500 octets/s utiles.",
      },
      {
        kind: "list",
        items: [
          "Croiser TX et RX : le TX de l'un va sur le RX de l'autre — l'erreur de câblage n°1.",
          "Même débit des deux côtés, à quelques % près : un désaccord produit des caractères corrompus (framing errors).",
          "Niveaux : l'UART « TTL » (0–3,3/5 V) des microcontrôleurs n'est pas du RS-232 (±12 V) — ne jamais les relier directement.",
          "Usage debug : la console série (`printf` redirigé) reste l'outil de diagnostic le plus rapide d'un firmware.",
        ],
      },
    ],
  },
  {
    id: "alim-lineaire-decoupage",
    title: "Alimentations : linéaire vs découpage",
    level: 3,
    intro:
      "Deux philosophies de régulation : choisir selon bruit, rendement et simplicité.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Régulateur linéaire (LDO)", "Convertisseur à découpage (buck/boost)"],
        rows: [
          ["Principe", "Dissipe l'excédent en chaleur", "Découpe à haute fréquence + filtre"],
          ["Rendement", "Vout/Vin (ex. 3,3/12 V → 27 %)", "~85–95 %"],
          ["Bruit", "Très faible", "Ondulation de découpage à filtrer"],
          ["Simplicité", "2 condensateurs suffisent", "Inductance + layout soigné requis"],
          ["Usage robotique", "Rails sensibles (capteurs, ADC, radio)", "Rails de puissance (moteurs, 5 V système)"],
        ],
      },
      {
        kind: "text",
        text: "Exemple réel : alimenter un rail 5 V / 2 A depuis 12 V. En linéaire : `(12 − 5) × 2 = 14 W` à dissiper — radiateur obligatoire, rendement 42 %. En découpage : ~1 W perdu, rendement ~90 %. D'où l'architecture typique : découpage pour les gros rails, LDO en cascade pour les rails sensibles au bruit.",
      },
    ],
  },
  {
    id: "masse-bruit",
    title: "Masse, bruit et découplage",
    level: 3,
    intro:
      "La masse n'est pas un potentiel magique : c'est le retour des courants, et elle a une impédance.",
    blocks: [
      {
        kind: "list",
        items: [
          "Boucles de masse : un courant de puissance qui traverse le même cuivre que la référence d'un capteur crée une tension parasite (`U = R·I`) — d'où des mesures qui « bougent » quand le moteur tourne.",
          "Remède : topologie en étoile (retours séparés vers un point unique) ou plan de masse continu sur PCB, avec les courants de puissance tenus à l'écart des zones sensibles.",
          "Découplage : 100 nF céramique au plus près de chaque circuit intégré + réservoir 10–100 µF par zone. Le petit condensateur traite les transitoires rapides, le gros les appels lents.",
          "Séparer les masses analogique et numérique au niveau du convertisseur (un seul point de jonction) quand la précision de mesure l'exige.",
          "Câblage : torsader les paires signal/retour, garder les boucles petites — une grande boucle est une antenne qui capte (et émet) du bruit.",
        ],
      },
    ],
  },
  {
    id: "lecture-datasheet",
    title: "Lire une datasheet",
    level: 3,
    intro:
      "Le document qui dit la vérité sur un composant : savoir y trouver l'essentiel.",
    blocks: [
      {
        kind: "fields",
        title: "Les sections à lire en priorité",
        fields: [
          {
            label: "Absolute Maximum Ratings",
            value:
              "Les limites à ne jamais dépasser (tension, courant, température) : les dépasser, même brièvement, peut détruire le composant. Ce ne sont PAS les conditions de fonctionnement.",
          },
          {
            label: "Recommended Operating Conditions",
            value:
              "La plage où le composant tient ses specs : c'est ici qu'on dimensionne (tensions d'alimentation, courants, températures).",
          },
          {
            label: "Electrical Characteristics",
            value:
              "Les valeurs typiques/min/max : seuils logiques, chutes de tension, courants de repos. Concevoir sur les valeurs pire-cas (min/max), pas typiques.",
          },
          {
            label: "Timing / chronogrammes",
            value:
              "Pour les bus et interfaces : setup/hold, fréquences max — indispensables pour écrire un driver correct.",
          },
          {
            label: "Application / typical circuit",
            value:
              "Le schéma recommandé par le fabricant (découplage, composants externes) : le recopier est le point de départ le plus sûr.",
          },
        ],
      },
    ],
  },
  {
    id: "dimensionnement-cablage",
    title: "Dimensionnement : fils, fusibles, connecteurs",
    level: 3,
    intro:
      "Le courant impose la section : des règles simples pour un câblage sûr.",
    blocks: [
      {
        kind: "list",
        items: [
          "Section des fils : un fil trop fin pour le courant chauffe (`P = R·I²`) et fait chuter la tension. Règle : dimensionner pour le courant max continu avec marge, et garder les fils de puissance courts.",
          "Fusible : placé au plus près de la batterie, calibré juste au-dessus du courant normal max — il protège le câblage contre l'incendie en cas de court-circuit, pas les composants (trop lent pour ça).",
          "Connecteurs : choisir selon courant et vibrations — un connecteur de signal ne tient pas 20 A, et sur un robot mobile tout doit être verrouillé ou vissé.",
          "Relief de tension : les fils ne doivent jamais tirer sur les soudures — colliers, passe-fils et boucles de mou sont de la fiabilité, pas de l'esthétique.",
          "Polarité : détrompeurs mécaniques ou codes couleur stricts (rouge +, noir −) — l'inversion reste la panne la plus bête et la plus destructrice.",
        ],
      },
    ],
  },
  {
    id: "isolation",
    title: "Isolation galvanique",
    level: 3,
    intro:
      "Séparer les mondes : quand la puissance ne doit pas toucher la logique.",
    blocks: [
      {
        kind: "text",
        text: "L'isolation galvanique (optocoupleurs, transformateurs, isolateurs numériques) transmet le signal sans continuité électrique : les masses restent séparées. Utile quand les tensions sont très différentes, quand le bruit de puissance est violent, ou pour la sécurité (secteur, haute tension).",
      },
      {
        kind: "list",
        items: [
          "Optocoupleur : une LED et un phototransistor dans un boîtier — simple, lent (sauf versions rapides), parfait pour isoler des signaux de commande.",
          "Règle : isoler la commande, pas la puissance — l'étage de puissance reste du côté « sale », le microcontrôleur du côté « propre ».",
          "Ne pas confondre avec l'adaptation de niveaux : un transistor d'adaptation 5 V/3,3 V ne fournit aucune isolation.",
        ],
      },
    ],
  },
  {
    id: "mesure-oscilloscope",
    title: "Mesurer à l'oscilloscope",
    level: 3,
    intro:
      "Voir les signaux réels : sondes, trigger et lecture.",
    blocks: [
      {
        kind: "fields",
        title: "Les réglages essentiels",
        fields: [
          {
            label: "Sonde ×10",
            value:
              "La position standard : elle divise par 10 mais présente 10 MΩ au circuit au lieu de 1 MΩ — elle perturbe 10× moins la mesure. Compenser la sonde (signal carré de calibration) avant toute mesure sérieuse.",
          },
          {
            label: "Trigger",
            value:
              "Stabilise l'affichage sur un événement (front montant à un seuil) : sans trigger, un signal périodique défile. Le trigger sur le signal qu'on veut voir, pas sur un autre.",
          },
          {
            label: "Masse de la sonde",
            value:
              "Le grip de masse est relié à la terre de l'oscilloscope : ne jamais le brancher sur un point qui n'est pas à la masse du circuit (court-circuit via la terre).",
          },
          {
            label: "Bande passante",
            value:
              "L'oscilloscope doit voir ~5× la fréquence du signal pour une forme correcte : un 100 MHz suffit pour la plupart des signaux de robotique (PWM, bus série).",
          },
        ],
      },
    ],
  },
  {
    id: "analyseur-logique",
    title: "Analyseur logique : débugger les bus",
    level: 3,
    intro:
      "Voir les 0 et les 1 : l'outil roi du debug I2C/SPI/UART.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un analyseur logique capture les signaux numériques et décode les protocoles : on voit les adresses I2C, les octets SPI, les trames UART décodées en clair.",
          "Usage typique : le capteur ne répond pas → on capture SDA/SCL → on voit si l'adresse est envoyée, si l'ACK arrive, où ça bloque. Dix secondes pour ce qu'une heure de relecture de code ne montre pas.",
          "Masse commune obligatoire avec le circuit mesuré, comme toujours.",
          "Limite : il ne voit que le numérique — pour l'intégrité du signal (niveaux, bruit), c'est l'oscilloscope.",
        ],
      },
    ],
  },
  {
    id: "pcb-routage",
    title: "Routage PCB : les règles",
    level: 3,
    intro:
      "Du schéma à la carte : les règles qui font un PCB fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Plan de masse : sur un PCB double face ou plus, garder une face (ou une couche) en plan de masse le plus continu possible — retour des courants, blindage, référence stable.",
          "Largeur des pistes : proportionnelle au courant (les outils de CAO calculent la largeur pour une élévation de température donnée) ; les pistes de signal peuvent rester fines.",
          "Découplage : 100 nF au plus près de chaque alimentation de circuit intégré, avec des vias courts vers le plan de masse.",
          "Signaux sensibles : garder les pistes analogiques courtes, loin des pistes de puissance et des horloges rapides ; ne jamais faire passer une piste sensible sous un convertisseur à découpage.",
          "Vias : éviter les vias sur les pistes de puissance (résistance), et ne pas découper le plan de masse avec des rangées de vias.",
          "Sérigraphie : nommer chaque connecteur et indiquer les polarités — le PCB se débugge et se câble par sa sérigraphie.",
        ],
      },
    ],
  },
  {
    id: "soudure",
    title: "Soudure : technique et contrôle",
    level: 3,
    intro:
      "Une bonne soudure est brillante et concave : le geste s'apprend en une heure.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Chauffer",
            detail:
              "Panne propre et étamée, température ~350 °C. Chauffer simultanément la patte du composant et la pastille du PCB pendant 2–3 secondes.",
          },
          {
            title: "Apporter la soudure",
            detail:
              "Toucher le fil de soudure à la jonction chaude (pas à la panne) : il doit fondre et couler autour de la patte par capillarité.",
          },
          {
            title: "Retirer et laisser",
            detail:
              "Retirer le fil puis la panne, ne pas bouger pendant 2 secondes. Une soudure qui a bougé en refroidissant est mate et fragile (soudure froide).",
          },
          {
            title: "Contrôler",
            detail:
              "Visuel : cône brillant, pas de boule, pas de pont avec le voisin. Électrique : continuité au multimètre sur les points critiques.",
          },
        ],
      },
    ],
  },
  {
    id: "cablage-robot",
    title: "Câblage d'un robot mobile",
    level: 3,
    intro:
      "Un robot vibre et bouge : le câblage est de la mécanique autant que de l'électrique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tout ce qui peut se débrancher se débranchera : verrouiller les connecteurs (verrous, vis, colle chaude en renfort sur les petits connecteurs).",
          "Séparer les faisceaux : puissance d'un côté, signaux de l'autre — les câbles moteurs rayonnent du bruit qui perturbe capteurs et bus.",
          "Boucles de mou : laisser du mou aux articulations et suspensions pour ne jamais tirer sur un connecteur en mouvement.",
          "Protéger : gaines, passe-fils aux traversées de tôle, colliers réguliers — un fil qui frotte finit par se couper.",
          "Documenter : étiqueter chaque faisceau et tenir un schéma de câblage à jour — le robot se dépanne par son schéma, pas de mémoire.",
        ],
      },
    ],
  },
  {
    id: "securite-electrique",
    title: "Sécurité électrique",
    level: 3,
    intro:
      "Les règles non négociables : batteries lithium et courants forts.",
    blocks: [
      {
        kind: "list",
        items: [
          "Batteries lithium : ne jamais percer, écraser ou court-circuiter — risque d'incendie violent. Charger avec un chargeur adapté, surveiller, stocker à charge partielle (~50–60 %) pour la durée.",
          "Court-circuit de batterie : une batterie peut débiter des centaines d'ampères — fusible au plus près des bornes, cosses isolées, jamais d'outil métallique qui traîne dessus.",
          "Une seule main sur un circuit sous tension quand on débute : l'autre dans la poche — cela évite qu'un courant traverse le torse en cas de contact.",
          "Débrancher avant de modifier le câblage : la quasi-totalité des composants grillés « pendant une modif » l'ont été sous tension.",
          "Bouton d'arrêt d'urgence sur tout robot mobile : il coupe la puissance des actionneurs (pas la logique), accessible et testé.",
        ],
      },
    ],
  },
  {
    id: "multiplexage",
    title: "Multiplexage et extension d'E/S",
    level: 3,
    intro:
      "Quand les broches manquent : partager et étendre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Multiplexeur analogique : lire N capteurs analogiques avec une seule entrée ADC en commutant — au prix d'un temps de conversion par voie.",
          "Expandeur GPIO en I2C : ajouter 8–16 E/S numériques via le bus — parfait pour des LED, boutons et relais lents.",
          "Charlieplexing : piloter N×(N−1) LED avec N broches en exploitant les états haute impédance — astucieux, mais câblage et code délicats.",
          "Registre à décalage : sortir 8+ bits en série (SPI) pour des afficheurs ou relais — simple et rapide pour des sorties lentes.",
          "Règle : étendre les E/S lentes par bus, garder les signaux rapides (PWM moteur, encodeurs) sur les périphériques matériels directs.",
        ],
      },
    ],
  },
  {
    id: "esd",
    title: "ESD et protections",
    level: 3,
    intro:
      "Les décharges électrostatiques tuent en silence : s'en prémunir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une décharge du doigt (quelques kV) détruit une entrée CMOS sensible sans laisser de trace visible — la panne apparaît des semaines plus tard.",
          "Prévention : bracelet antistatique relié à la terre, tapis de travail, stocker les cartes en sachets antistatiques.",
          "Protection des entrées exposées (connecteurs externes) : diodes TVS ou réseaux de protection qui écrêtent les surtensions vers les rails.",
          "Les entrées non utilisées d'un circuit logique ne flottent jamais : les tirer au potentiel voulu (pull-up/down), sinon elles oscillent et consomment.",
        ],
      },
    ],
  },
  {
    id: "projets-electronique",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets progressifs, du breadboard au PCB.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Station de mesure",
            detail:
              "Sur breadboard : lire température, luminosité et un bouton avec un microcontrôleur, afficher sur console série. Valider chaque mesure au multimètre. Livrable : code + mesures comparées.",
          },
          {
            title: "Projet 2 — Driver de moteur",
            detail:
              "Pont en H + PWM : contrôler vitesse et sens d'un moteur DC, mesurer le courant, ajouter une roue libre et un fusible. Livrable : montage testé sous charge avec mesures de courant.",
          },
          {
            title: "Projet 3 — Carte capteur sur PCB",
            detail:
              "Schéma + routage d'une carte regroupant microcontrôleur, capteur I2C et régulation : faire fabriquer, souder, tester méthodiquement. Livrable : carte fonctionnelle + dossier (schéma, tests).",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-electronique",
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
            label: "All About Circuits",
            value:
              "Cours en ligne complet et gratuit : des lois de base aux amplificateurs, avec exercices — la référence pour structurer son apprentissage.",
          },
          {
            label: "Documentation Arduino",
            value:
              "Tutoriels officiels (docs.arduino.cc) : prise en main des cartes, exemples de capteurs et de bus — concrets et vérifiés.",
          },
          {
            label: "Datasheets des fabricants",
            value:
              "La source de vérité pour chaque composant : notes d'application des fabricants (TI, ST, Microchip…) — gratuites et d'excellente qualité.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : chaque notion de cette page se valide par un montage mesuré — l'électronique ne s'apprend pas sans fer à souder.",
          "Réflexe : devant un composant inconnu, ouvrir sa datasheet avant de le câbler — cinq minutes de lecture évitent des heures de debug.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "L'électronique maîtrisée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Écrire le firmware : les systèmes embarqués transforment vos montages en produits (drivers, interruptions, temps réel).",
          "Concevoir la structure : la mécanique accueille votre électronique — CAO et intégration physique.",
          "Brancher sur ROS 2 : faire dialoguer vos cartes avec le middleware robotique via UART/USB.",
          "Approfondir la physique : capteurs et actionneurs — comprendre le principe physique derrière chaque composant.",
          "Revenir à la roadmap : valider Électronique et attaquer la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

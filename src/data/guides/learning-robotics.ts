import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la robotique : du microcontrôleur au robot.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : Arduino d'abord (tangible), Raspberry Pi ensuite (calcul),
 * ROS 2 et la simulation en fin de parcours. Matériel cité = références
 * réelles et établies ; aucune donnée inventée.
 */
export const LEARNING_ROBOTICS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction : qu'est-ce que la robotique ?",
    level: 1,
    intro:
      "La boucle sense-think-act : tout robot perçoit, décide, puis agit. Comprendre cette boucle, c'est comprendre la robotique.",
    blocks: [
      {
        kind: "text",
        text: "Un robot est une machine qui perçoit son environnement avec des capteurs, prend des décisions avec un programme, puis agit sur le monde avec des actionneurs (moteurs, servos). Cette boucle — percevoir, réfléchir, agir — s'appelle sense-think-act et elle structure toute la discipline, du jouet éducatif au bras industriel.",
      },
      {
        kind: "diagram",
        title: "La boucle sense-think-act",
        lines: [
          "ENVIRONNEMENT",
          "     │",
          "     ▼  perçoivent",
          "CAPTEURS (ultrasons, infrarouge, caméra, boutons…)",
          "     │  mesurent",
          "     ▼",
          "CONTRÔLEUR (Arduino, Raspberry Pi, PC)",
          "     │  décide (programme)",
          "     ▼",
          "ACTIONNEURS (moteurs, servos, LED…)",
          "     │  agissent",
          "     ▼",
          "ENVIRONNEMENT (modifié)",
          "     │",
          "     └── la boucle recommence, des dizaines de fois par seconde",
        ],
      },
      {
        kind: "fields",
        title: "La robotique en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "La robotique fait interagir un programme avec le monde physique : des capteurs lisent l'environnement, un contrôleur décide, des actionneurs agissent.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Automatiser des tâches répétitives, dangereuses ou impossibles pour un humain : chaînes de montage, exploration spatiale, chirurgie assistée, entrepôts logistiques.",
          },
          {
            label: "Quand s'y mettre",
            value:
              "Quand on veut que du code ait un effet physique : allumer, déplacer, mesurer, réagir. C'est aussi une excellente porte d'entrée vers l'électronique et les systèmes embarqués.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Pas de l'intelligence artificielle obligatoire : la plupart des robots suivent des règles simples et déterministes. L'IA n'est qu'une brique optionnelle, pas le point de départ.",
          },
        ],
      },
    ],
  },
  {
    id: "pourquoi-la-robotique",
    title: "Où la robotique s'applique",
    level: 1,
    intro:
      "De l'usine au salon : les mêmes briques (capteurs, contrôle, actionneurs) servent partout, à des échelles très différentes.",
    blocks: [
      {
        kind: "text",
        text: "La robotique couvre un spectre immense : bras articulés qui soudent des carrosseries, drones qui cartographient, aspirateurs autonomes, prothèses myoélectriques, rovers martiens. Mais le principe reste identique : mesurer, décider, agir. Commencer petit — une carte Arduino et une LED — enseigne exactement les mêmes réflexes que ceux utilisés sur les gros systèmes.",
      },
      {
        kind: "fields",
        title: "Les grandes familles de robots",
        fields: [
          {
            label: "Robots industriels",
            value:
              "Bras articulés répétant des gestes précis (soudure, assemblage). Programmés une fois, ils répètent sans se fatiguer.",
          },
          {
            label: "Robots mobiles",
            value:
              "Roues, chenilles ou jambes : aspirateurs, drones, rovers. Ils doivent percevoir et naviguer dans un environnement changeant.",
          },
          {
            label: "Robots de service",
            value:
              "Prothèses, exosquelettes, robots d'assistance : interaction directe avec des humains, donc sécurité et douceur prioritaires.",
          },
          {
            label: "Systèmes embarqués",
            value:
              "La frontière floue : thermostat connecté, station météo, serre automatisée. Souvent le premier terrain de jeu du débutant — et déjà de la vraie robotique.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : choisissez votre échelle de départ en fonction de votre objectif. Pour apprendre l'électronique et le contrôle, une carte Arduino suffit. Pour du calcul lourd (vision, ROS), il faudra un Raspberry Pi ou un PC. Les deux mondes se complètent plus qu'ils ne s'opposent.",
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
      "Ce qu'il faut (et ne faut pas) savoir avant de brancher la première LED.",
    blocks: [
      {
        kind: "fields",
        title: "Prérequis honnêtes",
        fields: [
          {
            label: "Programmation",
            value:
              "Des bases suffisent : variables, conditions, boucles, fonctions. Le C++ d'Arduino ressemble beaucoup à ce qu'on apprend en algorithmique ; Python couvre le reste.",
          },
          {
            label: "Électricité",
            value:
              "Tension, courant, résistance — la section « Électronique de base » les explique de zéro. Aucun diplôme requis, juste la prudence avec l'alimentation.",
          },
          {
            label: "Non requis",
            value:
              "Pas besoin de soudure pour débuter (les breadboards suffisent), pas besoin de mathématiques avancées, pas besoin d'imprimante 3D.",
          },
          {
            label: "Matériel minimal",
            value:
              "Une carte Arduino Uno, une breadboard, des fils de liaison, quelques LED et résistances : c'est le kit de démarrage classique.",
          },
        ],
      },
    ],
  },
  {
    id: "materiel-demarrage",
    title: "Le matériel de démarrage",
    level: 2,
    intro:
      "Les composants réels d'un kit de débutant, et le rôle de chacun dans la boucle sense-think-act.",
    blocks: [
      {
        kind: "text",
        text: "La carte de référence pour débuter est l'Arduino Uno : un microcontrôleur simple, robuste, avec une énorme documentation et une communauté immense. Autour d'elle, une poignée de composants bon marché suffit pour des mois d'expériences.",
      },
      {
        kind: "table",
        headers: ["Composant", "Rôle", "Dans la boucle"],
        rows: [
          ["Arduino Uno", "Microcontrôleur : exécute votre programme", "think"],
          ["Breadboard + fils", "Prototypage sans soudure", "—"],
          ["LED + résistances 220 Ω", "Premier actionneur : la lumière", "act"],
          ["Bouton poussoir", "Premier capteur : entrée utilisateur", "sense"],
          ["Potentiomètre", "Capteur analogique : position d'un axe", "sense"],
          ["Capteur HC-SR04", "Télémètre à ultrasons : mesure de distance", "sense"],
          ["Servomoteur SG90", "Actionneur : rotation contrôlée en angle", "act"],
          ["Driver L298N", "Pilote des moteurs à courant continu", "act"],
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : achetez un kit « starter » plutôt que des composants à l'unité — il contient exactement ces pièces avec des tutoriels assortis. Évitez les contrefaçons trop bon marché pour la carte elle-même : une carte instable fait perdre des heures sur des bugs fantômes.",
      },
    ],
  },
  {
    id: "installation-arduino-ide",
    title: "Installer l'environnement Arduino",
    level: 2,
    intro:
      "L'IDE Arduino 2.x : écrire, compiler, téléverser. Trois commandes d'installation réelles, une vérification du port série.",
    blocks: [
      {
        kind: "text",
        text: "L'IDE Arduino (version 2.x, téléchargeable sur arduino.cc) est l'éditeur officiel : il compile votre code et le téléverse vers la carte via USB. Il existe aussi `arduino-cli`, l'équivalent en ligne de commande, utile pour l'automatisation.",
      },
      {
        kind: "command",
        label: "Installer l'IDE sous Linux (Debian/Ubuntu)",
        command: "sudo apt update && sudo apt install arduino",
        why: "Installe l'IDE Arduino depuis les dépôts officiels de la distribution.",
        verify: "Lancez `arduino` : la fenêtre de l'IDE s'ouvre.",
      },
      {
        kind: "command",
        label: "Installer l'IDE sous macOS",
        command: "brew install --cask arduino",
        why: "Installe l'IDE Arduino via Homebrew, le gestionnaire de paquets macOS.",
        verify: "L'IDE Arduino apparaît dans le dossier Applications.",
      },
      {
        kind: "command",
        label: "Repérer le port série de la carte (Linux)",
        command: "ls /dev/ttyUSB* /dev/ttyACM*",
        why: "L'Arduino apparaît comme un port série USB ; cette commande liste les ports présents. Branchez la carte, relancez : le nouveau port est le sien.",
        verify: "Un chemin comme `/dev/ttyACM0` apparaît quand la carte est branchée.",
      },
      {
        kind: "command",
        label: "Autoriser l'accès au port série (Linux)",
        command: "sudo usermod -aG dialout $USER",
        why: "Sous Linux, l'utilisateur doit appartenir au groupe `dialout` pour ouvrir le port série, sinon le téléversement échoue avec « permission denied ».",
        verify: "Déconnectez-vous puis reconnectez-vous, puis `groups` doit afficher `dialout`.",
      },
      {
        kind: "fields",
        title: "IDE ou arduino-cli ?",
        fields: [
          {
            label: "IDE Arduino 2.x",
            value:
              "Interface graphique, moniteur série intégré, gestionnaire de cartes et de bibliothèques. Le choix naturel pour débuter.",
          },
          {
            label: "arduino-cli",
            value:
              "Le même moteur en ligne de commande (`arduino-cli compile`, `arduino-cli upload`). Pour l'intégration continue et les scripts.",
          },
          {
            label: "Concepts liés",
            value:
              "Port série, pilote USB (souvent CH340 sur les clones — nécessite parfois un pilote), gestionnaire de cartes pour d'autres modèles.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-programme-blink",
    title: "Premier programme : faire clignoter une LED",
    level: 2,
    intro:
      "Le « Hello, world » du matériel : `setup()` s'exécute une fois, `loop()` tourne en boucle. La LED intégrée suffit, aucun câblage.",
    blocks: [
      {
        kind: "text",
        text: "Tout programme Arduino — on dit un « sketch » — contient deux fonctions. `setup()` prépare le matériel une seule fois au démarrage ; `loop()` s'exécute ensuite en boucle, des milliers de fois par seconde. La carte possède une LED intégrée (`LED_BUILTIN`) : aucun composant à brancher pour ce premier test.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Blink — la LED intégrée clignote",
        code: "void setup() {\n  pinMode(LED_BUILTIN, OUTPUT); // la LED intégrée devient une sortie\n}\n\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH); // allume la LED (5 V)\n  delay(1000);                    // attend 1000 ms\n  digitalWrite(LED_BUILTIN, LOW);  // éteint la LED (0 V)\n  delay(1000);                    // attend 1000 ms\n}",
      },
      {
        kind: "fields",
        title: "Anatomie du sketch",
        fields: [
          {
            label: "En une phrase",
            value:
              "`pinMode` déclare le rôle d'une broche, `digitalWrite` impose un niveau haut ou bas, `delay` fait une pause.",
          },
          {
            label: "Pourquoi deux fonctions",
            value:
              "Le matériel doit être configuré une fois (sens des broches), puis le comportement se répète : cette séparation rend le cycle de vie explicite.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `pinMode(..., OUTPUT)` : la broche reste en entrée et la LED ne s'allume pas, ou très faiblement.",
          },
          {
            label: "Bonne pratique",
            value:
              "Téléversez ce sketch dès que vous recevez une carte : si la LED clignote, la chaîne complète (IDE, pilote USB, carte) fonctionne.",
          },
        ],
      },
    ],
  },
  {
    id: "broches-gpio",
    title: "Les broches GPIO : entrées et sorties numériques",
    level: 2,
    intro:
      "GPIO = General Purpose Input/Output : les broches qui relient le programme au monde extérieur, en tout-ou-rien.",
    blocks: [
      {
        kind: "text",
        text: "Les broches numériques de l'Arduino Uno lisent ou écrivent deux états : `HIGH` (5 V) ou `LOW` (0 V). En sortie, elles pilotent LED, relais, buzzers. En entrée, elles lisent boutons et capteurs tout-ou-rien. Chaque broche utilisée doit d'abord être déclarée avec `pinMode`.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Lire un bouton, allumer une LED",
        code: "const int BOUTON = 2;\nconst int LED = 13;\n\nvoid setup() {\n  pinMode(BOUTON, INPUT_PULLUP); // entrée avec résistance de rappel interne\n  pinMode(LED, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(BOUTON) == LOW) { // bouton pressé = broche à 0 V\n    digitalWrite(LED, HIGH);\n  } else {\n    digitalWrite(LED, LOW);\n  }\n}",
      },
      {
        kind: "fields",
        title: "Comprendre les entrées",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une entrée « flotte » si rien ne la tire vers un niveau : `INPUT_PULLUP` active une résistance interne qui la maintient à `HIGH` au repos.",
          },
          {
            label: "Pourquoi INPUT_PULLUP",
            value:
              "Sans résistance de rappel, la broche capte les parasites et lit des valeurs aléatoires. La résistance interne évite un composant externe.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Tester `digitalRead(BOUTON) == HIGH` pour « pressé » avec `INPUT_PULLUP` : c'est l'inverse, pressé = `LOW`.",
          },
          {
            label: "Limite à connaître",
            value:
              "Une broche fournit environ 20 mA : suffisant pour une LED, insuffisant pour un moteur — d'où les drivers.",
          },
        ],
      },
    ],
  },
  {
    id: "entrees-analogiques",
    title: "Lire le monde analogique : `analogRead`",
    level: 2,
    intro:
      "Tout n'est pas tout-ou-rien : le convertisseur analogique-numérique traduit une tension en nombre entre 0 et 1023.",
    blocks: [
      {
        kind: "text",
        text: "Les broches marquées A0 à A5 possèdent un convertisseur analogique-numérique (ADC) 10 bits : il convertit une tension de 0 à 5 V en un entier de 0 à 1023. C'est ainsi qu'on lit un potentiomètre, une photorésistance ou un capteur de température analogique.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Lire un potentiomètre sur A0",
        code: "void setup() {\n  Serial.begin(9600); // ouvre le port série pour afficher les valeurs\n}\n\nvoid loop() {\n  int valeur = analogRead(A0); // 0 (0 V) à 1023 (5 V)\n  Serial.println(valeur);      // affiche dans le moniteur série\n  delay(200);\n}",
      },
      {
        kind: "fields",
        title: "Comprendre l'ADC",
        fields: [
          {
            label: "En une phrase",
            value:
              "`analogRead` échantillonne une tension et la rend sous forme d'entier : 1023 pas pour 5 V, soit environ 4,9 mV par pas.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Capteurs à sortie variable : lumière, position, température, distance analogique. Pour du tout-ou-rien, préférez les broches numériques.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Laisser une entrée analogique non branchée et s'étonner des valeurs qui dérivent : une entrée flottante capte le bruit ambiant.",
          },
          {
            label: "Concepts liés",
            value:
              "Diviseur de tension (adapter une tension au 0-5 V), échantillonnage, bruit de mesure et moyennage.",
          },
        ],
      },
    ],
  },
  {
    id: "piloter-led-pwm",
    title: "Varier une sortie : la PWM",
    level: 2,
    intro:
      "Pas de vrai variateur sur un microcontrôleur : on hache le 5 V très vite, et la LED « voit » une luminosité moyenne.",
    blocks: [
      {
        kind: "text",
        text: "La modulation de largeur d'impulsion (PWM) commute une broche entre 0 et 5 V plusieurs centaines de fois par seconde. Le rapport cyclique — la proportion de temps à l'état haut — détermine la puissance moyenne : 25 % ≈ LED faible, 100 % = pleine puissance. `analogWrite` règle ce rapport de 0 à 255.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Faire respirer une LED (broche PWM ~)",
        code: "const int LED = 9; // broche marquée ~ : capable de PWM\n\nvoid setup() {\n  pinMode(LED, OUTPUT);\n}\n\nvoid loop() {\n  for (int i = 0; i <= 255; i++) {\n    analogWrite(LED, i); // 0 = éteint, 255 = plein\n    delay(10);\n  }\n  for (int i = 255; i >= 0; i--) {\n    analogWrite(LED, i);\n    delay(10);\n  }\n}",
      },
      {
        kind: "fields",
        title: "Comprendre la PWM",
        fields: [
          {
            label: "En une phrase",
            value:
              "La PWM simule une tension variable en jouant sur le temps passé à l'état haut, à fréquence fixe.",
          },
          {
            label: "Pourquoi c'est partout",
            value:
              "Vitesse des moteurs, luminosité des LED, position des servos, puissance de chauffe : un seul mécanisme pour tous les actionneurs.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Appeler `analogWrite` sur une broche sans le symbole `~` : pas de PWM matérielle, le comportement est imprévisible.",
          },
          {
            label: "Bonne pratique",
            value:
              "Sur l'Uno, les broches PWM sont 3, 5, 6, 9, 10, 11 (marquées `~`). Vérifiez toujours ce marquage.",
          },
        ],
      },
    ],
  },
  {
    id: "moniteur-serie",
    title: "Le moniteur série : vos yeux dans la carte",
    level: 2,
    intro:
      "La carte n'a pas d'écran : `Serial.print` envoie du texte vers l'ordinateur via USB. C'est l'outil de debug numéro un.",
    blocks: [
      {
        kind: "text",
        text: "Le port série USB sert à la fois à téléverser le programme et à dialoguer avec lui. `Serial.begin(9600)` ouvre la communication, `Serial.println` envoie une ligne que le moniteur série de l'IDE affiche. C'est ainsi qu'on inspecte les valeurs des capteurs en temps réel.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Afficher une mesure avec son unité",
        code: "void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int brut = analogRead(A0);\n  float tension = brut * 5.0 / 1023.0; // conversion en volts\n  Serial.print(\"Tension : \");\n  Serial.print(tension);\n  Serial.println(\" V\");\n  delay(500);\n}",
      },
      {
        kind: "fields",
        title: "Bien utiliser le moniteur série",
        fields: [
          {
            label: "Pourquoi c'est essentiel",
            value:
              "Sans affichage, un capteur qui renvoie des valeurs absurdes est indétectable. Le moniteur série transforme l'invisible en lisible.",
          },
          {
            label: "Vitesse (baud)",
            value:
              "Les deux extrémités doivent utiliser le même débit : `Serial.begin(9600)` côté carte, 9600 baud dans le moniteur. Sinon, caractères illisibles.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier que le moniteur série occupe le port : le téléversement échoue parfois s'il reste ouvert — fermez-le avant d'uploader.",
          },
          {
            label: "Bonne pratique",
            value:
              "Affichez toujours l'unité (`V`, `cm`, `%`) : un nombre seul ne veut rien dire quand on relit ses logs.",
          },
        ],
      },
    ],
  },
  {
    id: "servomoteur",
    title: "Premier actionneur précis : le servomoteur",
    level: 2,
    intro:
      "Le SG90 tourne sur commande à un angle précis : la brique des pinces, directions et volets.",
    blocks: [
      {
        kind: "text",
        text: "Un servomoteur comme le SG90 intègre moteur, réducteur et électronique de position : on lui ordonne un angle (0 à 180°) et il s'y place tout seul. La bibliothèque `Servo.h`, fournie avec l'IDE, cache le signal PWM spécial qu'il attend.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Balayer un servo de 0 à 180°",
        code: "#include <Servo.h>\n\nServo monServo;\n\nvoid setup() {\n  monServo.attach(9); // broche de commande du servo\n}\n\nvoid loop() {\n  for (int angle = 0; angle <= 180; angle++) {\n    monServo.write(angle); // ordonne l'angle\n    delay(15);             // laisse le temps de bouger\n  }\n  for (int angle = 180; angle >= 0; angle--) {\n    monServo.write(angle);\n    delay(15);\n  }\n}",
      },
      {
        kind: "fields",
        title: "Comprendre le servo",
        fields: [
          {
            label: "En une phrase",
            value:
              "On commande une position angulaire, pas une vitesse : l'électronique interne asservit le moteur pour atteindre l'angle demandé.",
          },
          {
            label: "Alimentation",
            value:
              "Un servo tire plus de courant qu'une broche ne peut fournir : alimentez-le en 5 V externe (ou via la broche 5V pour UN petit servo), jamais depuis une broche GPIO.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le servo tremble ou redémarre la carte : alimentation insuffisante. Ajoutez une alimentation 5 V dédiée avec masse commune.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Direction d'un robot roulant, pince, volet, tête orientable : partout où un angle précis suffit.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien du roboticien",
    level: 2,
    intro:
      "Écrire, compiler, téléverser, observer, ajuster : la boucle de développement matériel en 5 étapes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Câbler hors tension",
            detail:
              "Montez le circuit carte éteinte et débranchée. Vérifiez deux fois les polarités (LED, alimentation) avant de brancher l'USB.",
          },
          {
            title: "Écrire par petits incréments",
            detail:
              "Ajoutez UNE fonctionnalité à la fois (lire le capteur, puis agir). Testez chaque incrément avant d'ajouter le suivant.",
          },
          {
            title: "Compiler puis téléverser",
            detail:
              "La coche vérifie la compilation sans toucher à la carte ; la flèche compile et envoie. Lisez les erreurs du compilateur : elles sont précises.",
          },
          {
            title: "Observer via le moniteur série",
            detail:
              "Affichez les valeurs des capteurs et les états du programme. Un robot qui « ne fait rien » fait presque toujours quelque chose d'invisible.",
          },
          {
            title: "Ajuster et itérer",
            detail:
              "Seuils, temporisations, sens de rotation : la robotique est empirique. Notez les valeurs qui marchent directement dans le code en commentaire.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : gardez chaque version qui fonctionne (fichier `robot_v1.ino`, `robot_v2.ino`…). Quand une modification casse tout, revenir en arrière prend dix secondes au lieu d'une soirée.",
      },
    ],
  },
  {
    id: "securite-dabord",
    title: "Sécurité électrique : les règles non négociables",
    level: 2,
    intro:
      "Le 5 V ne pardonne pas toujours : court-circuit, surchauffe, inversion de polarité. Les réflexes qui protègent le matériel — et vous.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne dépassez jamais les tensions prévues : 5 V en logique sur l'Uno, jamais de 230 V secteur sur une breadboard.",
          "Coupez l'alimentation avant de modifier un câblage : la majorité des cartes grillées le sont pendant un recâblage sous tension.",
          "Ne court-circuitez jamais une alimentation (relier + et − directement) : échauffement immédiat, risque de brûlure et de composant détruit.",
          "Respectez les polarités : LED (patte longue = +), condensateurs électrolytiques, alimentation. L'inversion détruit.",
          "Les batteries LiPo exigent un chargeur adapté et ne se percent ni ne se chauffent : en cas de gonflement, éloignez et ne rechargez plus.",
          "Un composant qui chauffe anormalement = coupez tout et cherchez l'erreur de câblage avant de rebrancher.",
        ],
      },
      {
        kind: "text",
        text: "Pourquoi ces règles : un microcontrôleur ne possède quasiment aucune protection interne. Une erreur que tolérerait un appareil grand public (inversion de polarité, surtension) détruit la carte en une fraction de seconde. La prudence est moins chère que le remplacement.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "electronique-tension-courant",
    title: "Électronique de base : tension, courant, résistance",
    level: 3,
    intro:
      "Trois grandeurs, une loi : la loi d'Ohm suffit à dimensionner 90 % des circuits de débutant.",
    blocks: [
      {
        kind: "text",
        text: "La tension (volts, V) est la « pression » électrique, le courant (ampères, A) le débit de charges, la résistance (ohms, Ω) le frein. La loi d'Ohm les relie : U = R × I. Avec elle, on calcule par exemple la résistance à mettre en série avec une LED pour ne pas la griller.",
      },
      {
        kind: "diagram",
        title: "La loi d'Ohm en pratique : protéger une LED",
        lines: [
          "5 V (broche) ──[ R ? ]──[ LED ]── GND (0 V)",
          "",
          "La LED supporte ~20 mA et « consomme » ~2 V.",
          "Tension à absorber par R : 5 V − 2 V = 3 V",
          "R = U / I = 3 V / 0,020 A = 150 Ω",
          "→ on choisit la valeur standard supérieure : 220 Ω.",
        ],
      },
      {
        kind: "fields",
        title: "Les trois grandeurs",
        fields: [
          {
            label: "En une phrase",
            value:
              "La tension pousse, le courant circule, la résistance limite : dimensionner un circuit, c'est équilibrer les trois.",
          },
          {
            label: "Pourquoi c'est fondamental",
            value:
              "Chaque capteur et actionneur a des limites (tension max, courant max). Les respecter, c'est la différence entre un circuit qui dure et un composant fumant.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Brancher une LED directement entre 5 V et GND sans résistance : elle brille très fort… une fraction de seconde, puis meurt.",
          },
          {
            label: "Bonne pratique",
            value:
              "En cas de doute, surdimensionnez la résistance : une LED un peu moins brillante vaut mieux qu'une LED morte.",
          },
          {
            label: "Concepts liés",
            value:
              "Diviseur de tension, puissance (P = U × I), code couleur des résistances, multimètre.",
          },
        ],
      },
    ],
  },
  {
    id: "alimentation",
    title: "Alimenter un robot : ne pas tout brancher sur l'USB",
    level: 3,
    intro:
      "L'USB fournit 500 mA : une carte seule, oui ; des moteurs, non. Comprendre les budgets de courant.",
    blocks: [
      {
        kind: "text",
        text: "Un port USB fournit environ 500 mA : largement assez pour la carte et des capteurs, insuffisant dès qu'on ajoute moteurs ou servos. Ceux-ci exigent une alimentation externe (piles, batterie, adaptateur) avec une masse (GND) commune à la carte, sinon les signaux de commande n'ont aucune référence.",
      },
      {
        kind: "table",
        headers: ["Source", "Usage typique", "Limite à connaître"],
        rows: [
          ["USB (5 V, ~500 mA)", "Carte + capteurs + une LED", "Pas de moteurs"],
          ["Piles 4×AA (6 V)", "Petit robot mobile", "Se déchargent vite sous charge"],
          ["Batterie LiPo 2S (7,4 V)", "Robots mobiles exigeants", "Chargeur dédié obligatoire"],
          ["Adaptateur 9 V + jack", "Projets fixes sur bureau", "Le régulateur de la carte chauffe si trop de courant"],
          ["BEC / convertisseur DC-DC", "Alimenter servos en 5-6 V propres", "À dimensionner selon le courant total"],
        ],
      },
      {
        kind: "fields",
        title: "Les règles d'alimentation",
        fields: [
          {
            label: "En une phrase",
            value:
              "Séparez l'alimentation « logique » (carte, capteurs) de l'alimentation « puissance » (moteurs), en reliant leurs masses.",
          },
          {
            label: "Pourquoi",
            value:
              "Les moteurs créent des pics de courant qui font chuter la tension : la carte redémarre en boucle si elle partage la même source sans découplage.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Alimenter deux moteurs depuis la broche 5V de l'Arduino : surcharge, redémarrages aléatoires, voire régulateur grillé.",
          },
          {
            label: "Bonne pratique",
            value:
              "Masse commune toujours : le GND de l'alimentation moteur relié au GND de l'Arduino, sinon les ordres PWM sont ignorés.",
          },
        ],
      },
    ],
  },
  {
    id: "communication-uart",
    title: "Communiquer en série : UART",
    level: 3,
    intro:
      "TX parle, RX écoute : le protocole le plus simple pour relier deux cartes ou un module (Bluetooth, GPS).",
    blocks: [
      {
        kind: "text",
        text: "L'UART transmet les bits un par un sur deux fils : TX (émission) et RX (réception). Règle d'or du câblage : le TX de l'un va sur le RX de l'autre, et inversement — chacun parle dans l'oreille de l'autre. Les deux côtés doivent partager le même débit (baud) et la même masse.",
      },
      {
        kind: "diagram",
        title: "Câblage UART croisé",
        lines: [
          "Carte A              Carte B",
          "  TX ───────────────► RX",
          "  RX ◄─────────────── TX",
          " GND ──────────────── GND   (référence commune indispensable)",
        ],
      },
      {
        kind: "fields",
        title: "L'UART en pratique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Deux fils, un débit convenu : la liaison série la plus simple, idéale pour le debug et les modules lents.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Modules GPS, Bluetooth HC-05, liaison entre deux cartes, debug vers le PC. Débits modestes (9600 à 115200 baud).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Relier TX à TX et RX à RX : rien ne transite. Croisez toujours les fils.",
          },
          {
            label: "Erreur fréquente (2)",
            value:
              "Oublier le GND commun : les niveaux logiques n'ont plus de référence, la communication est aléatoire.",
          },
          {
            label: "Concepts liés",
            value:
              "Niveaux logiques 5 V vs 3,3 V (un module 3,3 V peut être endommagé par du 5 V en RX), SoftwareSerial pour un second port.",
          },
        ],
      },
    ],
  },
  {
    id: "communication-i2c",
    title: "Communiquer en bus : I2C",
    level: 3,
    intro:
      "Deux fils pour des dizaines de capteurs : SDA et SCL, chaque composant ayant sa propre adresse.",
    blocks: [
      {
        kind: "text",
        text: "L'I2C relie plusieurs composants sur seulement deux fils : SDA (données) et SCL (horloge). Chaque composant possède une adresse (souvent configurable par cavalier) ; le maître appelle les esclaves par leur adresse. Idéal pour écrans OLED, centrales inertielles (MPU6050), capteurs de température numériques.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Scanner les adresses I2C (diagnostic)",
        code: "#include <Wire.h>\n\nvoid setup() {\n  Serial.begin(9600);\n  Wire.begin();\n  Serial.println(\"Scan I2C...\");\n  for (byte addr = 1; addr < 127; addr++) {\n    Wire.beginTransmission(addr);\n    if (Wire.endTransmission() == 0) {\n      Serial.print(\"Composant trouvé à 0x\");\n      Serial.println(addr, HEX);\n    }\n  }\n}",
      },
      {
        kind: "fields",
        title: "L'I2C en pratique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un bus partagé à deux fils où chaque périphérique répond à sa propre adresse.",
          },
          {
            label: "Pourquoi c'est puissant",
            value:
              "Un écran + une centrale inertielle + un capteur de pression sur 2 broches seulement, contre 6+ en liaisons dédiées.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Deux composants avec la même adresse : conflit, aucun ne répond correctement. Vérifiez les cavaliers d'adresse.",
          },
          {
            label: "Bonne pratique",
            value:
              "Téléversez le scanner ci-dessus avant d'écrire le moindre code : si l'adresse n'apparaît pas, le problème est le câblage, pas le programme.",
          },
        ],
      },
    ],
  },
  {
    id: "communication-spi",
    title: "Communiquer vite : SPI",
    level: 3,
    intro:
      "Quatre fils, un débit élevé : le choix des écrans, cartes SD et capteurs rapides.",
    blocks: [
      {
        kind: "text",
        text: "Le SPI utilise quatre signaux : MOSI (maître→esclave), MISO (esclave→maître), SCK (horloge) et CS/SS (sélection du composant, un fil par esclave). Plus rapide que l'I2C, il sert aux écrans TFT, lecteurs de carte SD et capteurs à haut débit.",
      },
      {
        kind: "table",
        headers: ["Protocole", "Fils", "Vitesse", "Usage typique"],
        rows: [
          ["UART", "2 (TX, RX)", "Modeste", "Debug, GPS, Bluetooth"],
          ["I2C", "2 (SDA, SCL)", "Moyenne", "Beaucoup de capteurs lents"],
          ["SPI", "4 + 1 CS par esclave", "Élevée", "Écrans, carte SD, capteurs rapides"],
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : ne mélangez pas les protocoles sans raison. Un capteur I2C se branche en I2C ; la bibliothèque du fabricant (`#include <...>` + exemples fournis) fait 90 % du travail d'intégration.",
      },
    ],
  },
  {
    id: "interruptions",
    title: "Réagir instantanément : les interruptions",
    level: 3,
    intro:
      "Plutôt que de scruter une broche en boucle, demandez au processeur de vous prévenir : `attachInterrupt`.",
    blocks: [
      {
        kind: "text",
        text: "Une interruption suspend brièvement le programme principal pour exécuter une petite fonction (ISR) quand un événement matériel survient : front montant sur une broche, impulsion d'un encodeur. C'est indispensable pour compter des impulsions rapides qu'une boucle `loop()` raterait.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Compter des impulsions avec une interruption",
        code: "volatile unsigned long impulsions = 0; // volatile : modifiée hors du flux normal\n\nvoid compteur() {\n  impulsions++;\n}\n\nvoid setup() {\n  Serial.begin(9600);\n  attachInterrupt(digitalPinToInterrupt(2), compteur, RISING);\n}\n\nvoid loop() {\n  Serial.println(impulsions);\n  delay(1000);\n}",
      },
      {
        kind: "fields",
        title: "Les interruptions, mode d'emploi",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le matériel appelle votre fonction au moment exact de l'événement, sans attendre la fin de `loop()`.",
          },
          {
            label: "Règles d'or",
            value:
              "ISR courte (pas de `delay`, pas de `Serial.print`), variables partagées déclarées `volatile`.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Encodeurs de roues, boutons d'arrêt d'urgence, signaux rapides. Pour un simple bouton, `digitalRead` suffit.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mettre du code lent dans l'ISR : le programme principal se fige par intermittence, bugs très difficiles à diagnostiquer.",
          },
        ],
      },
    ],
  },
  {
    id: "timers-delays",
    title: "Le temps sans bloquer : `millis()`",
    level: 3,
    intro:
      "`delay()` fige tout : un robot aveugle pendant la pause. `millis()` permet d'agir à intervalles réguliers sans rien bloquer.",
    blocks: [
      {
        kind: "text",
        text: "`millis()` renvoie le nombre de millisecondes écoulées depuis le démarrage. En mémorisant le dernier instant d'action, on déclenche des tâches périodiques tout en laissant `loop()` tourner : le robot reste réactif en permanence.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Clignoter sans delay()",
        code: "const int LED = 13;\nunsigned long dernierChangement = 0;\nbool etat = false;\n\nvoid setup() {\n  pinMode(LED, OUTPUT);\n}\n\nvoid loop() {\n  if (millis() - dernierChangement >= 500) { // 500 ms écoulées ?\n    dernierChangement = millis();\n    etat = !etat;\n    digitalWrite(LED, etat);\n  }\n  // ici, le reste du programme continue de tourner librement\n}",
      },
      {
        kind: "fields",
        title: "Programmer sans bloquer",
        fields: [
          {
            label: "En une phrase",
            value:
              "Au lieu d'attendre, on vérifie l'horloge : chaque tâche périodique devient un « si le moment est venu, agir ».",
          },
          {
            label: "Pourquoi c'est crucial",
            value:
              "Un robot qui `delay(2000)` pendant 2 secondes ne lit plus ses capteurs : il fonce dans le mur en toute ignorance.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Comparer `millis() == cible` : on rate presque toujours l'instant exact. Utilisez `>=` avec une soustraction.",
          },
          {
            label: "Bonne pratique",
            value:
              "Bannissez `delay()` de tout programme qui lit des capteurs en continu ; réservez-le aux démos les plus simples.",
          },
        ],
      },
    ],
  },
  {
    id: "memoire-arduino",
    title: "La mémoire d'un microcontrôleur : petite et précieuse",
    level: 3,
    intro:
      "2 Ko de RAM sur un Uno : les chaînes de caractères et les tableaux l'épuisent vite. Les réflexes pour ne pas saturer.",
    blocks: [
      {
        kind: "text",
        text: "L'Arduino Uno dispose de 32 Ko de mémoire flash (le programme), 2 Ko de SRAM (les variables) et 1 Ko d'EEPROM (persistante). La SRAM est le goulot : chaque `String`, chaque tableau la consomme, et un dépassement provoque des plantages aléatoires très trompeurs.",
      },
      {
        kind: "list",
        items: [
          "Préférez les tableaux `char[]` aux objets `String` : la classe `String` fragmente la mémoire au fil des allocations.",
          "Placez les textes constants en flash avec la macro `F()` : `Serial.println(F(\"Bonjour\"))` n'occupe pas de SRAM.",
          "Surveillez le rapport de compilation : l'IDE affiche le pourcentage de SRAM utilisée — restez sous 75 % par sécurité.",
          "L'EEPROM (`EEPROM.put` / `EEPROM.get`) conserve des réglages entre deux démarrages (seuils calibrés, par exemple).",
          "Évitez la récursion et les gros tableaux locaux : la pile partage la SRAM avec le reste.",
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : un programme qui « marche puis plante au hasard » après ajout de fonctionnalités — suspectez toujours la SRAM en premier, avant le câblage.",
      },
    ],
  },
  {
    id: "moteur-dc-l298n",
    title: "Faire rouler : moteur DC et driver L298N",
    level: 3,
    intro:
      "Un moteur à courant continu ne se branche jamais directement : le pont en H du L298N gère sens et vitesse.",
    blocks: [
      {
        kind: "text",
        text: "Le L298N est un double pont en H : il permet d'inverser le sens du courant dans chaque moteur (marche avant/arrière) et d'en régler la vitesse par PWM, tout en isolant la carte des courants élevés. Il possède sa propre alimentation (jusqu'à 12 V typiquement pour les petits montages).",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Piloter un moteur : sens et vitesse",
        code: "const int ENA = 5;  // vitesse moteur A (PWM)\nconst int IN1 = 6;  // sens moteur A\nconst int IN2 = 7;\n\nvoid setup() {\n  pinMode(ENA, OUTPUT);\n  pinMode(IN1, OUTPUT);\n  pinMode(IN2, OUTPUT);\n}\n\nvoid avancer(int vitesse) { // vitesse : 0 à 255\n  digitalWrite(IN1, HIGH);\n  digitalWrite(IN2, LOW);\n  analogWrite(ENA, vitesse); // PWM = vitesse\n}\n\nvoid reculer(int vitesse) {\n  digitalWrite(IN1, LOW);\n  digitalWrite(IN2, HIGH);\n  analogWrite(ENA, vitesse);\n}\n\nvoid stop() {\n  analogWrite(ENA, 0);\n}",
      },
      {
        kind: "fields",
        title: "Comprendre le pont en H",
        fields: [
          {
            label: "En une phrase",
            value:
              "Quatre interrupteurs en H inversent le courant dans le moteur : le sens de rotation suit le sens du courant.",
          },
          {
            label: "Pourquoi un driver",
            value:
              "Un moteur DC tire 500 mA à plusieurs ampères au démarrage : 25 fois ce qu'une broche peut fournir. Le driver est l'intermédiaire de puissance.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier la masse commune entre le L298N et l'Arduino : les ordres IN1/IN2 sont ignorés, le moteur ne réagit pas.",
          },
          {
            label: "Bonne pratique",
            value:
              "Testez `avancer(150)` roues en l'air avant de poser le robot au sol : un sens inversé se corrige en permutant IN1/IN2, pas en réécrivant tout.",
          },
        ],
      },
    ],
  },
  {
    id: "moteur-pas-a-pas",
    title: "Précision angulaire : le moteur pas à pas",
    level: 3,
    intro:
      "Tourner d'un angle exact sans asservissement : le pas à pas avance par impulsions discrètes.",
    blocks: [
      {
        kind: "text",
        text: "Un moteur pas à pas (ex. 28BYJ-48, très répandu en pédagogie) tourne par petits pas fixes : en envoyant N impulsions, on tourne de N pas, sans capteur de position. C'est le principe des imprimantes 3D et des petits bras robotiques. Le revers : à couple élevé ou en survitesse, il peut « rater des pas » sans s'en apercevoir — pas d'asservissement intégré.",
      },
      {
        kind: "table",
        headers: ["Moteur", "Commande", "Précision", "Idéal pour"],
        rows: [
          ["DC + driver", "Vitesse + sens", "Faible (sans capteur)", "Roues de robot mobile"],
          ["Servo (SG90)", "Angle 0-180°", "Bonne (asservi)", "Direction, pince, volets"],
          ["Pas à pas", "Nombre de pas", "Bonne (en boucle ouverte)", "Positionnement répétable, petite CNC"],
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : driver ULN2003 (souvent fourni avec le 28BYJ-48), micro-pas, couple de maintien. Quand l'utiliser : quand vous comptez des positions, pas quand vous voulez de la vitesse.",
      },
    ],
  },
  {
    id: "capteur-ultrasons",
    title: "Mesurer une distance : le HC-SR04",
    level: 3,
    intro:
      "Le capteur d'évitement d'obstacles par excellence : il envoie un « ping » ultrasonore et chronomètre l'écho.",
    blocks: [
      {
        kind: "text",
        text: "Le HC-SR04 émet une salve d'ultrasons sur sa broche TRIG puis écoute l'écho sur ECHO : la durée de l'aller-retour, mesurée avec `pulseIn`, donne la distance (le son parcourt ~343 m/s, soit 58 µs par centimètre aller-retour). Portée utile : de quelques centimètres à plusieurs mètres.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Lire une distance en centimètres",
        code: "const int TRIG = 9;\nconst int ECHO = 10;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(TRIG, OUTPUT);\n  pinMode(ECHO, INPUT);\n}\n\nlong lireDistanceCm() {\n  digitalWrite(TRIG, LOW);\n  delayMicroseconds(2);\n  digitalWrite(TRIG, HIGH);   // salve de 10 µs\n  delayMicroseconds(10);\n  digitalWrite(TRIG, LOW);\n  long duree = pulseIn(ECHO, HIGH, 30000); // écho, timeout 30 ms\n  return duree / 58; // conversion µs -> cm\n}\n\nvoid loop() {\n  Serial.print(lireDistanceCm());\n  Serial.println(\" cm\");\n  delay(200);\n}",
      },
      {
        kind: "fields",
        title: "Le télémètre à ultrasons",
        fields: [
          {
            label: "En une phrase",
            value:
              "On chronomètre un écho ultrasonore : le temps de vol divisé par deux, multiplié par la vitesse du son, donne la distance.",
          },
          {
            label: "Limites physiques",
            value:
              "Les surfaces molles ou inclinées absorbent ou dévient l'onde : lectures instables sur rideaux, murs en biais. Le timeout de `pulseIn` évite le blocage sans écho.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`pulseIn` sans timeout (3e argument) : s'il n'y a pas d'écho, le programme se fige jusqu'à 1 seconde par défaut.",
          },
          {
            label: "Bonne pratique",
            value:
              "Moyennez 3 à 5 mesures et ignorez les valeurs aberrantes : un filtre médian simple stabilise énormément la navigation.",
          },
        ],
      },
    ],
  },
  {
    id: "encodeurs-odometrie",
    title: "Savoir où l'on va : encodeurs et odométrie",
    level: 3,
    intro:
      "Compter les tours de roue pour estimer la position : l'odométrie, base de toute navigation autonome.",
    blocks: [
      {
        kind: "text",
        text: "Un encodeur génère des impulsions à chaque fraction de tour de roue. En les comptant (via interruptions, section dédiée), on calcule distance parcourue et vitesse de chaque roue. En combinant les deux roues d'un robot différentiel, on estime sa position : c'est l'odométrie.",
      },
      {
        kind: "diagram",
        title: "De l'impulsion à la position",
        lines: [
          "Impulsions encodeur (interruption)",
          "     │  × circonférence roue / impulsions par tour",
          "     ▼",
          "Distance parcourue par chaque roue",
          "     │  différence roue gauche / roue droite",
          "     ▼",
          "Estimation : position (x, y) + orientation",
          "     │",
          "     └── dérive avec le temps : les erreurs s'accumulent,",
          "         d'où la nécessité de capteurs absolus (ou SLAM)",
        ],
      },
      {
        kind: "fields",
        title: "L'odométrie en pratique",
        fields: [
          {
            label: "En une phrase",
            value:
              "On intègre les rotations des roues pour estimer le déplacement — simple, mais l'erreur s'accumule.",
          },
          {
            label: "Pourquoi c'est central",
            value:
              "Sans odométrie, impossible de dire « avance de 50 cm » ou « tourne de 90° » : tout déplacement précis en dépend.",
          },
          {
            label: "Limite",
            value:
              "Patinage, roues de diamètres légèrement différents : l'estimation dérive. On la recale avec des capteurs absolus (ultrasons, caméra, lidar).",
          },
          {
            label: "Concepts liés",
            value:
              "Encodeurs incrémentaux vs absolus, interruptions, robot différentiel, SLAM.",
          },
        ],
      },
    ],
  },
  {
    id: "raspberry-pi",
    title: "Changer d'échelle : le Raspberry Pi",
    level: 3,
    intro:
      "Quand l'Arduino ne suffit plus : un vrai ordinateur Linux à 35-80 € pour la vision, le réseau et ROS.",
    blocks: [
      {
        kind: "text",
        text: "Le Raspberry Pi est un ordinateur complet sous Raspberry Pi OS (basé sur Debian) : processeur multicœur, Wi-Fi, ports USB et HDMI, plus des broches GPIO pilotables en Python. Il exécute ce qu'un microcontrôleur ne peut pas : traitement d'image, serveur web embarqué, nœuds ROS 2.",
      },
      {
        kind: "table",
        headers: ["Critère", "Arduino Uno", "Raspberry Pi"],
        rows: [
          ["Nature", "Microcontrôleur temps réel", "Ordinateur sous Linux"],
          ["Démarrage", "Instantané", "~30 secondes"],
          ["Temps réel strict", "Oui", "Non (OS multitâche)"],
          ["Consommation", "Très faible", "Plus élevée (alimentation 5 V / 3 A)"],
          ["Idéal pour", "Capteurs, moteurs, boucles rapides", "Vision, réseau, calcul, ROS"],
        ],
      },
      {
        kind: "fields",
        title: "Bien choisir sa plateforme",
        fields: [
          {
            label: "En une phrase",
            value:
              "Arduino = réflexes temps réel et basse consommation ; Raspberry Pi = puissance de calcul et écosystème Linux.",
          },
          {
            label: "L'architecture gagnante",
            value:
              "Les deux ensemble : l'Arduino gère moteurs et capteurs en temps réel, le Pi décide (vision, planification) et dialogue en série avec l'Arduino.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Alimenter le Pi avec un chargeur de téléphone faiblard : sous-tension, corruptions de carte SD, plantages mystérieux. Utilisez l'alimentation officielle.",
          },
          {
            label: "Ressource officielle",
            value:
              "La documentation complète est sur raspberrypi.com/documentation (installation de l'OS, GPIO, caméra).",
          },
        ],
      },
    ],
  },
  {
    id: "python-robotique",
    title: "Python pour la robotique : `gpiozero`",
    level: 3,
    intro:
      "Piloter les GPIO du Raspberry Pi en Python lisible : la bibliothèque `gpiozero` rend le matériel presque trivial.",
    blocks: [
      {
        kind: "text",
        text: "Sur Raspberry Pi, `gpiozero` (installée par défaut sur Raspberry Pi OS) offre une API Python expressive : `LED(17).on()`, `Button(2).when_pressed = ...`. On y retrouve les mêmes concepts qu'Arduino — entrées, sorties, PWM — avec la puissance de Python pour le reste (réseau, fichiers, calcul).",
      },
      {
        kind: "command",
        label: "Installer gpiozero (si absent)",
        command: "sudo apt install python3-gpiozero",
        why: "Installe la bibliothèque GPIO officielle du Raspberry Pi depuis les dépôts Debian.",
        verify: "python3 -c \"import gpiozero; print(gpiozero.__version__)\" affiche un numéro de version.",
      },
      {
        kind: "code",
        language: "python",
        title: "Clignotant + bouton en gpiozero",
        code: "from gpiozero import LED, Button\nfrom signal import pause\n\nled = LED(17)\nbouton = Button(2)\n\nbouton.when_pressed = led.on    # appui  -> allume\nbouton.when_released = led.off  # relâche -> éteint\n\npause()  # garde le programme en vie",
      },
      {
        kind: "fields",
        title: "Python côté matériel",
        fields: [
          {
            label: "En une phrase",
            value:
              "Les mêmes GPIO qu'Arduino, pilotés depuis un vrai OS avec toute la richesse de Python.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès que le projet dépasse le temps réel pur : logger des données, servir une page web de contrôle, traiter une image.",
          },
          {
            label: "Attention",
            value:
              "Les GPIO du Pi sont en 3,3 V et fragiles : jamais de 5 V en entrée, contrairement à l'Uno qui tolère le 5 V.",
          },
          {
            label: "Concepts liés",
            value:
              "`RPi.GPIO` (bas niveau), `pigpio` (PWM matérielle précise), communication série Pi ↔ Arduino.",
          },
        ],
      },
    ],
  },
  {
    id: "controle-pid",
    title: "Le contrôle PID : la théorie",
    level: 3,
    intro:
      "Atteindre une consigne sans osciller ni ramer : le PID est l'algorithme de contrôle le plus utilisé au monde.",
    blocks: [
      {
        kind: "text",
        text: "Un régulateur PID corrige en continu l'écart (l'erreur) entre la consigne et la mesure : le terme P réagit à l'erreur présente, le terme I accumule les erreurs passées (élimine l'écart résiduel), le terme D anticipe d'après la vitesse de variation (amortit les oscillations). Suiveur de ligne, régulation de vitesse, stabilisation de drone : le même algorithme partout.",
      },
      {
        kind: "diagram",
        title: "La boucle de régulation",
        lines: [
          "Consigne ──►(+)──► [P] ──╮",
          "              ▲    [I] ──┼──► Correction ──► Moteur ──► Mesure",
          "              │    [D] ──╯                       │",
          "              │                                  │",
          "              └──── Erreur = consigne − mesure ◄──┘",
        ],
      },
      {
        kind: "fields",
        title: "Comprendre chaque terme",
        fields: [
          {
            label: "En une phrase",
            value:
              "P pousse proportionnellement à l'erreur, I corrige l'écart persistant, D freine les variations brusques.",
          },
          {
            label: "P seul",
            value:
              "Réactif mais laisse une erreur résiduelle (jamais assez de force près de la cible) et oscille si trop fort.",
          },
          {
            label: "P + I",
            value:
              "L'intégrale élimine l'erreur résiduelle, mais accumulée elle provoque des dépassements (windup).",
          },
          {
            label: "P + I + D",
            value:
              "La dérivée amortit : elle freine quand on s'approche vite de la consigne. Le trio couvre vitesse, précision et stabilité.",
          },
          {
            label: "Concepts liés",
            value:
              "Asservissement, consigne, boucle fermée vs boucle ouverte, réglage empirique (méthode Ziegler-Nichols en industrie).",
          },
        ],
      },
    ],
  },
  {
    id: "pid-pratique",
    title: "PID en pratique : suiveur de ligne",
    level: 3,
    intro:
      "Du concept au robot : un suiveur de ligne est un PID où l'erreur est la position de la ligne sous les capteurs.",
    blocks: [
      {
        kind: "text",
        text: "Un suiveur de ligne lit la position de la piste avec des capteurs infrarouges : si la ligne est à gauche, l'erreur est négative ; le PID ajuste la vitesse des deux moteurs pour recentrer le robot. C'est un asservissement complet avec 20 lignes de code.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Squelette de PID pour suiveur de ligne",
        code: "// Erreur : position de la ligne (-100 = tout à gauche, +100 = tout à droite)\nfloat Kp = 1.2, Ki = 0.0, Kd = 0.8;\nfloat integrale = 0, erreurPrecedente = 0;\n\nint correctionPID(float erreur) {\n  integrale += erreur;\n  float derivee = erreur - erreurPrecedente;\n  erreurPrecedente = erreur;\n  return (int)(Kp * erreur + Ki * integrale + Kd * derivee);\n}\n\nvoid loop() {\n  float erreur = lirePositionLigne(); // vos capteurs IR ici\n  int c = correctionPID(erreur);\n  moteurGauche(150 + c);  // recentre en différenciant les vitesses\n  moteurDroit(150 - c);\n}",
      },
      {
        kind: "fields",
        title: "Régler un PID sans théorie",
        fields: [
          {
            label: "Méthode empirique",
            value:
              "Partez de Ki = 0, Kd = 0. Augmentez Kp jusqu'à oscillation, divisez par deux. Ajoutez Kd pour calmer, puis un peu de Ki si un écart persiste.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Activer l'intégrale d'emblée : le windup fait dépasser la cible en oscillant. Le Ki se règle en dernier, petit.",
          },
          {
            label: "Bonne pratique",
            value:
              "Affichez l'erreur sur le moniteur série pendant les essais : régler à l'aveugle, c'est deviner.",
          },
        ],
      },
    ],
  },
  {
    id: "cinematique",
    title: "Cinématique : où est la pince ? (notions)",
    level: 3,
    intro:
      "D'un bras articulé : la cinématique directe calcule la position depuis les angles, l'inverse fait le chemin contraire.",
    blocks: [
      {
        kind: "text",
        text: "La cinématique directe (FK) répond à « mes moteurs sont à ces angles, où est l'extrémité ? » par simple trigonométrie en chaîne. La cinématique inverse (IK) répond à la question utile : « je veux la pince ici, quels angles ? » — plus difficile, parfois sans solution ou avec plusieurs solutions.",
      },
      {
        kind: "diagram",
        title: "Bras à 2 segments (vue de côté)",
        lines: [
          "           (x, y) = ?",
          "              ● extrémité",
          "             ╱",
          "            ╱ L2",
          "           ╱",
          "          ● coude (angle θ2)",
          "         ╱",
          "        ╱ L1",
          "       ╱",
          "      ● base (angle θ1)",
          "FK : (θ1, θ2) → (x, y)  — calcul direct",
          "IK : (x, y) → (θ1, θ2)  — à résoudre",
        ],
      },
      {
        kind: "fields",
        title: "Vocabulaire de la cinématique",
        fields: [
          {
            label: "Degrés de liberté (DDL)",
            value:
              "Nombre d'articulations indépendantes : un bras à 6 DDL peut positionner et orienter librement sa pince dans l'espace.",
          },
          {
            label: "Espace articulaire / opérationnel",
            value:
              "Angles des moteurs d'un côté, position (x, y, z) de l'autre : la cinématique fait le pont entre les deux.",
          },
          {
            label: "Quand s'en soucier",
            value:
              "Bras robotique, jambes de robot : dès qu'on veut placer précisément un effecteur. Pour un robot roulant simple, inutile.",
          },
          {
            label: "Concepts liés",
            value:
              "Jacobienne, singularités (positions où le bras perd un degré de liberté), bibliothèques IK en ROS (MoveIt).",
          },
        ],
      },
    ],
  },
  {
    id: "ros2-notions",
    title: "ROS 2 : le système d'exploitation des robots (notions)",
    level: 3,
    intro:
      "Le standard de la robotique pro : des nœuds qui communiquent par topics. Comprendre l'architecture avant d'installer.",
    blocks: [
      {
        kind: "text",
        text: "ROS 2 (Robot Operating System) n'est pas un OS mais un intergiciel : il structure un robot en nœuds (programmes indépendants) qui échangent des messages via des topics (flux continus), des services (requête/réponse) et des actions (tâches longues). Un nœud lit le lidar, un autre planifie, un troisième commande les moteurs — chacun remplaçable séparément.",
      },
      {
        kind: "diagram",
        title: "Architecture typique d'un robot sous ROS 2",
        lines: [
          "[nœud lidar] ──/scan─────────► [nœud navigation] ──/cmd_vel──► [nœud moteurs]",
          "                                     ▲",
          "[nœud caméra] ──/image──┘            │ /odom",
          "                                     │",
          "                              [nœud odométrie]",
        ],
      },
      {
        kind: "fields",
        title: "Le vocabulaire ROS 2",
        fields: [
          {
            label: "En une phrase",
            value:
              "Des processus modulaires qui publient et souscrivent à des flux de messages nommés.",
          },
          {
            label: "Node (nœud)",
            value:
              "Un programme : driver de capteur, algorithme, contrôleur. Inspectez-les avec `ros2 node list`.",
          },
          {
            label: "Topic",
            value:
              "Un flux nommé (`/scan`, `/cmd_vel`) en publication/souscription. Listez-les avec `ros2 topic list`, espionnez avec `ros2 topic echo /scan`.",
          },
          {
            label: "Service / Action",
            value:
              "Service : appel ponctuel avec réponse. Action : tâche longue avec suivi (aller à un point, avec annulation possible).",
          },
          {
            label: "Quand l'adopter",
            value:
              "Projet multi-capteurs sur Raspberry Pi ou PC, simulation, travail en équipe : dès que l'Arduino seul ne suffit plus.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lister les topics d'un système ROS 2",
        command: "ros2 topic list",
        why: "Affiche tous les flux de messages actifs : la radiographie instantanée de ce que le robot « dit ».",
        verify: "Avec une démo lancée, des topics comme `/parameter_events` apparaissent.",
      },
      {
        kind: "command",
        label: "Espionner un topic",
        command: "ros2 topic echo /scan",
        why: "Affiche en direct les messages publiés sur `/scan` : idéal pour vérifier qu'un capteur publie bien.",
        verify: "Des blocs de données défilent à la fréquence du capteur.",
      },
    ],
  },
  {
    id: "ros2-premier-noeud",
    title: "ROS 2 : écrire son premier nœud",
    level: 3,
    intro:
      "Un publisher Python en 20 lignes avec `rclpy` : le « blink » de ROS 2.",
    blocks: [
      {
        kind: "text",
        text: "Côté Python, la bibliothèque `rclpy` crée des nœuds ROS 2. Le nœud ci-dessous publie un message texte sur le topic `/bonjour` deux fois par seconde — l'équivalent du clignotant, mais dans l'écosystème ROS.",
      },
      {
        kind: "code",
        language: "python",
        title: "Publisher minimal avec rclpy",
        code: "import rclpy\nfrom rclpy.node import Node\nfrom std_msgs.msg import String\n\nclass Bonjour(Node):\n    def __init__(self):\n        super().__init__('bonjour')\n        self.pub = self.create_publisher(String, 'bonjour', 10)\n        self.create_timer(0.5, self.publier)  # toutes les 0,5 s\n\n    def publier(self):\n        msg = String()\n        msg.data = 'ping'\n        self.pub.publish(msg)\n\nrclpy.init()\nnode = Bonjour()\nrclpy.spin(node)  # boucle d'événements ROS",
      },
      {
        kind: "fields",
        title: "Comprendre le nœud",
        fields: [
          {
            label: "En une phrase",
            value:
              "On déclare un nœud, un publisher et un timer : ROS s'occupe du transport des messages.",
          },
          {
            label: "`rclpy.spin`",
            value:
              "La boucle d'événements : elle traite timers et messages entrants. L'équivalent ROS du `loop()` Arduino.",
          },
          {
            label: "Bonne pratique",
            value:
              "Testez avec `ros2 topic echo /bonjour` dans un second terminal : publier d'un côté, observer de l'autre valide toute la chaîne.",
          },
          {
            label: "Ressource officielle",
            value:
              "Les tutoriels pas à pas sont sur docs.ros.org — la référence pour installer ROS 2 sur Ubuntu ou Raspberry Pi OS.",
          },
        ],
      },
    ],
  },
  {
    id: "simulation-gazebo",
    title: "Simuler avant de casser : Gazebo (notions)",
    level: 3,
    intro:
      "Tester la navigation sans risquer le robot : Gazebo simule physique, capteurs et monde 3D, piloté par ROS 2.",
    blocks: [
      {
        kind: "text",
        text: "Gazebo est le simulateur open source de référence en robotique : il simule la physique (collisions, gravité, frottements), les capteurs (lidar, caméra, IMU avec bruit réaliste) et publie tout cela sur des topics ROS 2. On développe l'algorithme de navigation dans le simulateur, puis on le transfère sur le vrai robot avec souvent peu de changements.",
      },
      {
        kind: "fields",
        title: "La simulation en pratique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un robot virtuel indiscernable (pour le logiciel) du robot réel : mêmes topics, mêmes messages.",
          },
          {
            label: "Pourquoi simuler",
            value:
              "Itérer en minutes au lieu d'heures, tester les cas dangereux (chute, collision) sans casse, travailler sans le matériel sous la main.",
          },
          {
            label: "Limite honnête",
            value:
              "Le fossé sim-to-real existe : frottements, bruit capteurs et latences diffèrent. La simulation dégrossit, le réel valide.",
          },
          {
            label: "Concepts liés",
            value:
              "URDF (description du robot), mondes et modèles Gazebo, `ros2 launch` pour démarrer une simulation complète.",
          },
        ],
      },
    ],
  },
  {
    id: "simulation-webots",
    title: "Simuler simplement : Webots (notions)",
    level: 3,
    intro:
      "L'alternative accessible : Webots, simulateur open source avec des robots prêts à l'emploi et une API simple.",
    blocks: [
      {
        kind: "text",
        text: "Webots (open source, maintenu par Cyberbotics) propose une bibliothèque de robots et d'environnements prêts à l'emploi : on programme un robot existant en Python ou C sans construire le modèle 3D soi-même. C'est une excellente porte d'entrée vers la simulation avant Gazebo, plus exigeant.",
      },
      {
        kind: "fields",
        title: "Webots en bref",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un simulateur clé en main : choisissez un robot, écrivez le contrôleur, lancez.",
          },
          {
            label: "Quand le choisir",
            value:
              "Découverte de la simulation, prototypage d'algorithmes (suivi, évitement), enseignement. Pour l'intégration ROS 2 poussée, Gazebo reste la référence.",
          },
          {
            label: "Bonne pratique",
            value:
              "Validez toujours un algorithme en simulation AVANT le robot réel : c'est plus rapide et infiniment moins coûteux en cas d'erreur.",
          },
        ],
      },
    ],
  },
  {
    id: "slam-notions",
    title: "Se repérer : SLAM (notions)",
    level: 3,
    intro:
      "Cartographier un lieu inconnu tout en s'y localisant : le SLAM, cerveau de la navigation autonome.",
    blocks: [
      {
        kind: "text",
        text: "Le SLAM (Simultaneous Localization And Mapping) construit une carte de l'environnement tout en estimant la position du robot dans cette carte, typiquement à partir d'un lidar ou d'une caméra couplés à l'odométrie. C'est ce qui permet à un aspirateur robot de « connaître » votre appartement.",
      },
      {
        kind: "diagram",
        title: "Le problème du SLAM",
        lines: [
          "Le robot se déplace, le lidar mesure des distances.",
          "     │",
          "     ├─► Sans carte : où suis-je ? (localisation)",
          "     │",
          "     └─► Sans position : à quoi ressemble le lieu ? (cartographie)",
          "     │",
          "     ▼",
          "Le SLAM résout les deux ensemble, en boucle :",
          "chaque mesure affine à la fois la carte et la position estimée.",
        ],
      },
      {
        kind: "fields",
        title: "Le SLAM en pratique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Dessiner la carte en même temps qu'on s'y déplace, en fusionnant lidar/caméra et odométrie.",
          },
          {
            label: "Quand s'y frotter",
            value:
              "Navigation autonome en intérieur : après avoir maîtrisé odométrie, ROS 2 et la simulation. Pas un sujet de débutant.",
          },
          {
            label: "Concepts liés",
            value:
              "Lidar, filtre particulaire, boucle de fermeture (loop closure), Nav2 (la pile de navigation ROS 2).",
          },
        ],
      },
    ],
  },
  {
    id: "vision-notions",
    title: "Voir : la vision par ordinateur (notions)",
    level: 3,
    intro:
      "D'une caméra à une décision : détection de lignes, de couleurs, d'objets — sur Raspberry Pi.",
    blocks: [
      {
        kind: "text",
        text: "Une caméra est un capteur comme un autre : une matrice de pixels qu'on traite par logiciel. Les usages progressifs : suivre une ligne colorée (simple seuillage), détecter un objet par sa couleur (espace HSV), puis reconnaître des formes avec OpenCV, la bibliothèque open source de référence en vision.",
      },
      {
        kind: "fields",
        title: "La vision en robotique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Transformer des pixels en mesures exploitables : position d'une ligne, d'une balle, d'un visage.",
          },
          {
            label: "Par où commencer",
            value:
              "Suivi de couleur avec une caméra Pi : quelques dizaines de lignes Python + OpenCV, effet spectaculaire immédiat.",
          },
          {
            label: "Limite",
            value:
              "La vision consomme beaucoup de calcul : c'est typiquement le travail du Raspberry Pi, pas de l'Arduino.",
          },
          {
            label: "Concepts liés",
            value:
              "OpenCV, espace colorimétrique HSV (plus robuste que RGB aux variations de lumière), flux ROS `sensor_msgs/Image`.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-materiel",
    title: "Débugger du matériel : la méthode",
    level: 3,
    intro:
      "« Ça ne marche pas » ne suffit pas : une procédure systématique pour isoler la panne entre code, câblage et composant.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Le programme compile-t-il ?",
            detail:
              "Lisez l'erreur du compilateur en entier : ligne, type d'erreur. 80 % des blocages sont des fautes de frappe ou des bibliothèques manquantes.",
          },
          {
            title: "La carte répond-elle ?",
            detail:
              "Le téléversement réussit-il ? Sinon : bon port série ? Bon modèle de carte sélectionné ? Groupe `dialout` sous Linux ? Câble USB données (pas charge seule) ?",
          },
          {
            title: "Le câblage est-il bon ?",
            detail:
              "Vérifiez hors tension : chaque fil va-t-il au bon endroit ? Masses communes ? Polarités ? Un schéma dessiné à la main aide énormément.",
          },
          {
            title: "Les valeurs sont-elles plausibles ?",
            detail:
              "Affichez tout sur le moniteur série : que lit le capteur ? Débranchez le capteur : la valeur change-t-elle ? Si non, le problème est en amont.",
          },
          {
            title: "Isolez le composant",
            detail:
              "Testez le composant suspect seul avec un sketch minimal (exemple fourni avec sa bibliothèque). S'il marche seul, le bug est dans l'interaction.",
          },
          {
            title: "Divisez pour régner",
            detail:
              "Commentez la moitié du code. Ça marche ? Le bug est dans l'autre moitié. Répétez jusqu'à la ligne fautive.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : ne changez qu'une chose à la fois entre deux tests. Changer le code ET le câblage simultanément rend impossible de savoir ce qui a réparé — ou cassé — quoi que ce soit.",
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes",
    level: 3,
    intro:
      "Les neuf pièges que tous les débutants rencontrent — et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "1. LED sans résistance",
            value:
              "Mauvais : LED branchée directement entre 5 V et GND. Mieux : résistance de 220 Ω en série, calculée avec la loi d'Ohm (section électronique de base).",
          },
          {
            label: "2. Moteurs sur la broche 5V",
            value:
              "Mauvais : alimenter un L298N ou des servos depuis le 5V de la carte. Mieux : alimentation externe dédiée, masses reliées.",
          },
          {
            label: "3. TX sur TX, RX sur RX",
            value:
              "Mauvais : relier les broches homonymes en UART. Mieux : croiser — TX de l'un vers RX de l'autre, plus GND commun.",
          },
          {
            label: "4. Entrée flottante",
            value:
              "Mauvais : bouton sur une entrée sans résistance de rappel, lectures aléatoires. Mieux : `pinMode(pin, INPUT_PULLUP)` et tester l'état LOW pressé.",
          },
          {
            label: "5. `delay()` partout",
            value:
              "Mauvais : `delay(2000)` dans un robot qui doit rester réactif. Mieux : structure à base de `millis()` non bloquante.",
          },
          {
            label: "6. 5 V dans un GPIO 3,3 V",
            value:
              "Mauvais : brancher un capteur 5 V sur une entrée du Raspberry Pi. Mieux : vérifier les niveaux logiques, utiliser un convertisseur de niveau si besoin.",
          },
          {
            label: "7. Pas de masse commune",
            value:
              "Mauvais : deux alimentations sans GND relié, signaux ignorés. Mieux : toujours relier les masses des sous-systèmes.",
          },
          {
            label: "8. `pulseIn` sans timeout",
            value:
              "Mauvais : `pulseIn(ECHO, HIGH)` se fige jusqu'à 1 s sans écho. Mieux : passer un timeout explicite en 3e argument.",
          },
          {
            label: "9. Câble USB « charge seule »",
            value:
              "Mauvais : des heures à chercher pourquoi le téléversement échoue. Mieux : tester avec un câble connu pour transférer des données.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-1-feu-tricolore",
    title: "Projet 1 — Feu tricolore intelligent",
    level: 3,
    intro:
      "Niveau débutant : trois LED, un bouton piéton, une machine à états sans `delay()`.",
    blocks: [
      {
        kind: "fields",
        title: "Fiche projet",
        fields: [
          {
            label: "Objectif",
            value:
              "Un feu tricolore qui cycle vert → orange → rouge, avec un bouton piéton qui force le passage au rouge après un délai de sécurité.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "GPIO en sortie, `INPUT_PULLUP`, structure non bloquante à `millis()`, machine à états (enum + switch).",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Penser en états plutôt qu'en séquence linéaire : le pattern qui structure tous les comportements robotiques.",
          },
          {
            label: "Difficulté",
            value: "Débutant — un week-end, breadboard uniquement.",
          },
          {
            label: "Projet suivant",
            value: "Projet 2 : ajouter des capteurs et du mouvement.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-2-suiveur-ligne",
    title: "Projet 2 — Robot suiveur de ligne",
    level: 3,
    intro:
      "Niveau intermédiaire : châssis à 2 roues, capteurs IR, driver L298N, asservissement PID.",
    blocks: [
      {
        kind: "fields",
        title: "Fiche projet",
        fields: [
          {
            label: "Objectif",
            value:
              "Un robot qui suit une piste noire sur fond blanc, négocie les virages sans sortir, à vitesse croissante.",
          },
          {
            label: "Matériel",
            value:
              "Châssis 2 roues motrices + roue libre, 3 à 5 capteurs IR de ligne, L298N, alimentation séparée moteurs/logique.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Lecture analogique/numérique, PWM, pont en H, PID (sections dédiées), alimentation séparée avec masse commune.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "L'asservissement en boucle fermée : mesurer, corriger, stabiliser — le cœur de tout contrôle robotique.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — comptez plusieurs itérations de réglage PID.",
          },
          {
            label: "Projet suivant",
            value: "Projet 3 : percevoir les obstacles au lieu d'une ligne.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-3-evitement-obstacles",
    title: "Projet 3 — Robot d'évitement d'obstacles",
    level: 3,
    intro:
      "Niveau intermédiaire-avancé : télémètre HC-SR04 sur servo, prise de décision, odométrie.",
    blocks: [
      {
        kind: "fields",
        title: "Fiche projet",
        fields: [
          {
            label: "Objectif",
            value:
              "Un robot qui explore une pièce : il avance, scanne à 180° avec le HC-SR04 sur servo quand un obstacle approche, et choisit la direction la plus dégagée.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "HC-SR04 + `pulseIn` avec timeout, servo de scanning, machine à états (avancer / scanner / tourner), filtrage des mesures.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "La perception active : orienter le capteur pour décider, au lieu de subir l'environnement. Premier pas vers la navigation.",
          },
          {
            label: "Extension possible",
            value:
              "Ajoutez des encodeurs et de l'odométrie pour cartographier grossièrement la pièce parcourue.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire-avancé — la robustesse vient des essais réels.",
          },
          {
            label: "Projet suivant",
            value: "Projet 4 : passer à ROS 2 et à la simulation.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-4-ros-simulation",
    title: "Projet 4 — Robot ROS 2 en simulation",
    level: 3,
    intro:
      "Niveau avancé : un robot différentiel sous ROS 2 dans Gazebo, sans acheter de lidar.",
    blocks: [
      {
        kind: "fields",
        title: "Fiche projet",
        fields: [
          {
            label: "Objectif",
            value:
              "Faire naviguer un robot simulé dans Gazebo : publier des vitesses sur `/cmd_vel`, lire le lidar sur `/scan`, implémenter l'évitement en Python avec `rclpy`.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Architecture ROS 2 (nodes/topics), `rclpy`, simulation Gazebo, reprise de l'algorithme d'évitement du projet 3.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le workflow professionnel : développer en simulation, valider sans risque, transférer sur le réel. Et la modularité ROS (un nœud = une responsabilité).",
          },
          {
            label: "Difficulté",
            value: "Avancé — prévoyez du temps pour l'installation de ROS 2 et Gazebo.",
          },
          {
            label: "Et après",
            value:
              "Nav2 pour la navigation autonome complète, ou transférez vos nœuds sur un Raspberry Pi monté sur le châssis du projet 3.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-officielles",
    title: "Ressources officielles",
    level: 3,
    intro:
      "Les documentations de référence : à consulter avant les tutoriels tiers.",
    blocks: [
      {
        kind: "list",
        items: [
          "`arduino.cc` — site officiel : téléchargement de l'IDE, guides de démarrage, références des cartes.",
          "`arduino.cc/reference/en` — la référence du langage Arduino : chaque fonction (`digitalWrite`, `analogRead`, `Servo`…) y est documentée avec exemples.",
          "`docs.ros.org` — documentation officielle de ROS 2 : installation, tutoriels débutant, concepts.",
          "`raspberrypi.com/documentation` — documentation officielle du Raspberry Pi : OS, GPIO, caméra, accessoires.",
          "`gazebosim.org` — documentation du simulateur Gazebo.",
          "`cyberbotics.com` — site officiel de Webots (open source), avec guide utilisateur et exemples.",
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : face à un composant, cherchez d'abord sa fiche technique (datasheet) chez le fabricant — tensions, courants, brochage. C'est la source la plus fiable, devant n'importe quel tutoriel.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Quatre directions après les bases : approfondir selon ce qui vous a plu.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes de progression",
        fields: [
          {
            label: "Systèmes embarqués",
            value:
              "ESP32 (Wi-Fi/Bluetooth natif), STM32, FreeRTOS : le temps réel et les objets connectés.",
          },
          {
            label: "ROS 2 à fond",
            value:
              "Nav2 (navigation), MoveIt (bras), ros2_control : la pile professionnelle complète.",
          },
          {
            label: "IA embarquée",
            value:
              "Vision avec OpenCV puis réseaux de neurones légers sur Raspberry Pi ou accélérateur (Coral, Jetson).",
          },
          {
            label: "Mécanique",
            value:
              "CAO et impression 3D pour fabriquer vos propres châssis et pinces : le robot devient vraiment le vôtre.",
          },
        ],
      },
      {
        kind: "text",
        text: "Dernier conseil : documentez vos projets (photos, schémas, code commenté). Un portfolio de robots qui marchent vaut tous les certificats — et vous y reviendrez vous-même quand un vieux montage refusera de redémarrer.",
      },
    ],
  },
];

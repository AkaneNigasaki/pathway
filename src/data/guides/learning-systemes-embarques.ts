import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des systèmes embarqués en robotique : architecture
 * processeur, langages C/C++, compilation croisée, temps réel, mémoire,
 * consommation, débogage. Aucun code source complet inventé : uniquement
 * des commandes standard expliquées (gcc, arm-none-eabi, openocd, minicom)
 * et des extraits minimaux d'API standard. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_SYSTEMES_EMBARQUES: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction : le cerveau du robot",
    level: 1,
    intro:
      "Le système embarqué est l'ordinateur qui vit dans le robot : il lit les capteurs, calcule et commande les actionneurs, en temps réel.",
    blocks: [
      {
        kind: "text",
        text: "Un robot a besoin d'un cerveau sur place : attendre un serveur distant pour éviter un obstacle serait trop lent et trop fragile. Le système embarqué — microcontrôleur ou ordinateur monocarte — exécute la boucle perception-décision-action à quelques centimètres des capteurs et des moteurs.",
      },
      {
        kind: "diagram",
        title: "Le rôle du système embarqué",
        lines: [
          "Capteurs ──► [SYSTÈME EMBARQUÉ] ──► Actionneurs",
          "              │      │      │",
          "              ▼      ▼      ▼",
          "           mesurer  décider  commander",
          "              (boucle à 100 Hz – 1 kHz, en temps réel)",
        ],
      },
      {
        kind: "text",
        text: "Deux familles : le microcontrôleur (temps réel strict, basse consommation, pas d'OS — pilote les moteurs et lit les capteurs) et l'ordinateur embarqué (Linux, ROS 2 — perception, planification). Un robot sérieux combine souvent les deux.",
      },
    ],
  },
  {
    id: "ou-s-applique",
    title: "Où les systèmes embarqués s'appliquent",
    level: 1,
    intro:
      "Partout où du calcul vit dans la machine : du jouet au satellite.",
    blocks: [
      {
        kind: "fields",
        title: "Les applications",
        fields: [
          {
            label: "Robotique mobile",
            value:
              "Carte de contrôle moteur (temps réel) + ordinateur de bord (navigation) : l'architecture à deux étages la plus courante.",
          },
          {
            label: "Drones",
            value:
              "Contrôleur de vol temps réel (stabilisation à 1 kHz) : la moindre latence se paie en crash — l'embarqué critique par excellence.",
          },
          {
            label: "Industrie",
            value:
              "Automates et contrôleurs embarqués : fiabilité 24/7, déterminisme, maintenance prédictive.",
          },
          {
            label: "Objets connectés",
            value:
              "Capteurs autonomes sur batterie pendant des années : l'embarqué basse consommation poussé à l'extrême.",
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
      "L'embarqué marie le logiciel et le matériel : les deux sont nécessaires.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir, et pourquoi",
        fields: [
          {
            label: "Électronique : lire un schéma",
            value:
              "Brancher un capteur sans griller la carte : niveaux logiques, alimentations, pull-ups — la base matérielle.",
          },
          {
            label: "Python : prototyper la logique",
            value:
              "Valider les algorithmes sur PC avant de les porter en C sur la cible — déboguer sur PC est 10× plus rapide.",
          },
          {
            label: "Linux : l'étage supérieur",
            value:
              "L'ordinateur de bord tourne sous Linux (souvent avec ROS 2) : la compétence système pour l'étage « intelligent ».",
          },
          {
            label: "Physique : capteurs et actionneurs",
            value:
              "Comprendre ce que mesurent les capteurs et ce que font les actionneurs : l'embarqué est l'interface entre les deux.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. L'embarqué est le skill le plus « full-stack » de la robotique : du transistor au protocole réseau.",
      },
    ],
  },
  {
    id: "outillage-embarque",
    title: "Outillage : la chaîne de développement",
    level: 2,
    intro:
      "Compiler pour une autre puce, flasher, déboguer : les outils du métier.",
    blocks: [
      {
        kind: "fields",
        title: "Les outils",
        fields: [
          {
            label: "Chaîne croisée",
            value:
              "Compiler sur PC pour un processeur ARM : le compilateur `arm-none-eabi-gcc` produit du binaire pour la cible — la compilation croisée.",
          },
          {
            label: "Programmateur / débogueur",
            value:
              "Flasher le binaire et déboguer pas à pas via l'interface de debug (SWD/JTAG) : voir les registres, poser des points d'arrêt.",
          },
          {
            label: "Analyseur logique",
            value:
              "Voir les signaux numériques réels (I2C, SPI, UART) : quand le protocole « ne marche pas », l'oscilloscope du numérique.",
          },
          {
            label: "Terminal série",
            value:
              "`minicom` ou équivalent : parler à la carte via UART — les `printf` de débogage de l'embarqué.",
          },
        ],
      },
      {
        kind: "text",
        text: "Environnement : un IDE ou éditeur + la chaîne croisée + le programmateur — le « hello world » embarqué est une LED qui clignote, pas un texte à l'écran.",
      },
    ],
  },
  {
    id: "concept-microcontroleur",
    title: "Microcontrôleur vs microprocesseur",
    level: 2,
    intro:
      "Choisir le bon cerveau : temps réel ou puissance de calcul.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux familles",
        fields: [
          {
            label: "Microcontrôleur",
            value:
              "CPU + mémoire + périphériques sur une seule puce, sans OS : déterministe, basse consommation, démarre en millisecondes — pilote moteurs et capteurs.",
          },
          {
            label: "Microprocesseur / SoC",
            value:
              "Puissance de calcul avec Linux : vision, ROS 2, réseau — mais démarrage en secondes et temps réel non garanti sans précautions.",
          },
          {
            label: "Architecture typique",
            value:
              "Les deux ensemble : le microcontrôleur gère le temps réel (moteurs, capteurs rapides), le SoC l'intelligence (navigation) — ils communiquent en UART/CAN.",
          },
        ],
      },
    ],
  },
  {
    id: "concept-c-cpp",
    title: "C et C++ : les langages",
    level: 2,
    intro:
      "Pourquoi l'embarqué parle C : contrôle total, zéro surcoût.",
    blocks: [
      {
        kind: "fields",
        title: "Les langages",
        fields: [
          {
            label: "C",
            value:
              "Le langage historique : accès direct au matériel (registres, pointeurs), compilation prévisible — la lingua franca des microcontrôleurs.",
          },
          {
            label: "C++ (subset)",
            value:
              "Classes et abstractions à coût nul si bien utilisées, sans exceptions ni RTTI sur cible contrainte — de plus en plus courant (Arduino, frameworks).",
          },
          {
            label: "MicroPython",
            value:
              "Python sur microcontrôleur : prototypage rapide, mais 10–100× plus lent et gourmand — pour apprendre et prototyper, pas pour le temps réel critique.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle : prototyper la logique en Python sur PC (rapide à déboguer), puis porter en C/C++ sur la cible — les deux langages se complètent.",
      },
    ],
  },
  {
    id: "concept-gpio",
    title: "GPIO, PWM et interruptions",
    level: 2,
    intro:
      "Parler au monde : les trois mécanismes de base.",
    blocks: [
      {
        kind: "fields",
        title: "Les mécanismes",
        fields: [
          {
            label: "GPIO",
            value:
              "Broches d'entrée/sortie tout-ou-rien : lire un bouton, allumer une LED, piloter un relais — l'alphabet de l'embarqué.",
          },
          {
            label: "PWM",
            value:
              "Modulation de largeur d'impulsion : faire varier une puissance moyenne (vitesse moteur, luminosité) avec un signal numérique — le « volume » de l'embarqué.",
          },
          {
            label: "Interruptions",
            value:
              "Le matériel prévient le logiciel (au lieu d'une attente active) : réagir aux événements sans gaspiller le CPU — la base du temps réel.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ces trois mécanismes couvrent 80 % des besoins d'interface : tout le reste (bus, timers avancés) s'appuie dessus.",
      },
    ],
  },
  {
    id: "concept-protocoles",
    title: "Protocoles : UART, I2C, SPI, CAN",
    level: 2,
    intro:
      "Faire dialoguer les puces : les quatre bus essentiels.",
    blocks: [
      {
        kind: "fields",
        title: "Les bus",
        fields: [
          {
            label: "UART",
            value:
              "Liaison série point à point, simple : debug, GPS, communication inter-cartes — le premier bus à maîtriser.",
          },
          {
            label: "I2C",
            value:
              "Bus à 2 fils, multi-esclaves adressés : IMU, capteurs de distance, écrans — simple mais pas très rapide.",
          },
          {
            label: "SPI",
            value:
              "Bus rapide maître-esclave : écrans, cartes SD, capteurs rapides — plus de fils, plus de débit.",
          },
          {
            label: "CAN",
            value:
              "Bus robuste multi-maîtres des véhicules et robots : tolérant au bruit, avec arbitrage — le bus des systèmes sérieux.",
          },
        ],
      },
      {
        kind: "text",
        text: "En robotique : I2C/SPI pour les capteurs proches, UART pour le debug et les modules, CAN entre les sous-systèmes du robot.",
      },
    ],
  },
  {
    id: "concept-temps-reel",
    title: "Temps réel",
    level: 2,
    intro:
      "Pas « rapide » : prévisible — la garantie qui fait la différence.",
    blocks: [
      {
        kind: "text",
        text: "Temps réel ne veut pas dire « vite » mais « à temps, toujours » : une boucle de contrôle à 1 kHz doit s'exécuter toutes les millisecondes, sans exception — un retard occasionnel vaut un crash (de drone). Le déterminisme (borne sur le pire temps) prime sur la vitesse moyenne.",
      },
      {
        kind: "list",
        items: [
          "Temps réel dur : rater une échéance = échec (contrôle de vol) — microcontrôleur ou RTOS obligatoire.",
          "Temps réel souple : un retard dégrade mais ne casse pas (streaming vidéo) — Linux avec priorités peut suffire.",
          "Ennemis du déterminisme : interruptions mal gérées, allocations dynamiques, caches imprévisibles — d'où les règles de codage temps réel.",
        ],
      },
    ],
  },
  {
    id: "concept-rtos",
    title: "RTOS : l'ordonnanceur",
    level: 2,
    intro:
      "Plusieurs tâches, des priorités : FreeRTOS et ses pairs.",
    blocks: [
      {
        kind: "fields",
        title: "Les concepts",
        fields: [
          {
            label: "Tâches et priorités",
            value:
              "Le RTOS exécute des tâches par priorité (préemptif) : la tâche critique (contrôle moteur) interrompt les autres — le temps réel organisé.",
          },
          {
            label: "Synchronisation",
            value:
              "Sémaphores, mutex, files : les tâches communiquent sans se marcher dessus — la source classique de bugs subtils.",
          },
          {
            label: "FreeRTOS",
            value:
              "Le RTOS open source dominant sur microcontrôleur : léger, prouvé, énorme communauté — le choix par défaut.",
          },
        ],
      },
      {
        kind: "text",
        text: "Alternative : la boucle super-loop (pas d'OS, tout en séquence) suffit pour les systèmes simples — le RTOS devient nécessaire quand les tâches ont des échéances différentes.",
      },
    ],
  },
  {
    id: "premier-firmware",
    title: "Premier firmware : LED puis UART",
    level: 2,
    intro:
      "Le « hello world » embarqué : clignoter, puis parler.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Faire clignoter une LED",
            detail:
              "Configurer une GPIO en sortie et la basculer en boucle (avec temporisation) : valide toute la chaîne — compilation croisée, flash, exécution.",
          },
          {
            title: "Ajouter l'UART",
            detail:
              "Envoyer du texte vers le PC (`minicom` côté PC) : le canal de débogage qui servira pour tout le reste du développement.",
          },
          {
            title: "Lire un capteur",
            detail:
              "Brancher un capteur I2C (ex. IMU) : lire ses registres, afficher les valeurs sur l'UART — la première vraie acquisition.",
          },
          {
            title: "Structurer en tâches",
            detail:
              "Passer sous FreeRTOS : une tâche acquisition, une tâche contrôle, une tâche communication — l'architecture d'un vrai firmware.",
          },
        ],
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Flux professionnel : du prototype au produit",
    level: 2,
    intro:
      "La rigueur embarquée : tests, versions, traçabilité.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Développer sur carte d'évaluation",
            detail:
              "Prototyper sur carte standard (Nucleo, ESP32…) avant tout PCB custom : valider le logiciel sur du matériel prouvé.",
          },
          {
            title: "Tester unitairement sur PC",
            detail:
              "Compiler la logique (hors drivers) pour le PC et la tester : les tests tournent 100× plus vite que sur cible.",
          },
          {
            title: "Valider sur cible",
            detail:
              "Tests d'intégration sur le vrai matériel : timing réel, bruit réel — la cible a toujours raison contre la simulation.",
          },
          {
            title: "Versionner et tracer",
            detail:
              "Chaque firmware a un numéro de version lisible à distance : on ne déploie jamais du binaire « mystère » sur un robot.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-embarque",
    title: "Déboguer : quand la carte ne répond plus",
    level: 2,
    intro:
      "Le débogage embarqué : méthode et outils.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic",
        fields: [
          {
            label: "Rien ne démarre",
            value:
              "Vérifier alimentation (tension réelle au multimètre), horloge, et que le binaire est bien flashé — 80 % des « pannes » sont là.",
          },
          {
            label: "Plantage aléatoire",
            value:
              "Suspecter la mémoire (débordement de pile, pointeur sauvage) et les interruptions (priorités, réentrance) — le débogueur pas à pas tranche.",
          },
          {
            label: "Le bus ne répond pas",
            value:
              "Analyseur logique sur les fils : voir si le maître parle vraiment (adresses, ACK) — sépare le problème logiciel du problème électrique.",
          },
          {
            label: "Ça marche puis ça dérive",
            value:
              "Fuite mémoire, compteur qui déborde, dérive d'horloge : les bugs temporels se traquent avec des logs horodatés.",
          },
          {
            label: "Le watchdog mord",
            value:
              "Le chien de garde redémarre la carte : une tâche ne le « nourrit » plus — signe de blocage, pas de solution à désactiver.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-embarque",
    title: "Tester : la fiabilité",
    level: 2,
    intro:
      "Un firmware se teste comme un pont se charge : jusqu'à la preuve.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux",
        fields: [
          {
            label: "Tests unitaires (sur PC)",
            value:
              "La logique pure compilée pour le PC : rapide, automatisable — attrape les bugs algorithmiques avant la cible.",
          },
          {
            label: "Tests d'intégration",
            value:
              "Sur la vraie carte avec le vrai matériel : timing, interruptions, drivers — là où les surprises vivent.",
          },
          {
            label: "Tests de robustesse",
            value:
              "Coupures d'alimentation, bruit, températures extrêmes : le firmware doit survivre au monde réel, pas au labo.",
          },
          {
            label: "Tests longue durée",
            value:
              "Tourner des jours : fuites mémoire et dérives n'apparaissent qu'avec le temps — le test d'endurance est non négociable.",
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
      "Les classiques du firmware.",
    blocks: [
      {
        kind: "list",
        items: [
          "Débordement de pile : allocation trop généreuse en RAM limitée — dimensionner la pile de chaque tâche et la surveiller.",
          "Interruption trop longue : traiter dans l'interruption au lieu de signaler une tâche — bloque tout le système.",
          "Variables partagées sans protection : une interruption modifie ce que la boucle principale lit — `volatile` et sections critiques.",
          "Délais bloquants : `delay()` dans une tâche temps réel — utiliser des temporisations non bloquantes.",
          "Ignorer les valeurs de retour : un driver qui échoue silencieusement — vérifier chaque appel critique.",
          "Pas de watchdog : un firmware sans chien de garde reste planté pour toujours au premier blocage.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-processeur",
    title: "Architecture : registres et mémoire",
    level: 3,
    intro:
      "Sous le C : ce que le processeur voit vraiment.",
    blocks: [
      {
        kind: "text",
        text: "Un microcontrôleur = CPU + Flash (programme) + RAM (données) + périphériques, tous reliés par des bus et adressés en mémoire : écrire à une adresse, c'est commander un périphérique (memory-mapped I/O). Les registres de contrôle configurent chaque périphérique bit par bit — la datasheet est le manuel de référence.",
      },
      {
        kind: "list",
        items: [
          "Lire une datasheet : savoir trouver l'adresse d'un registre et le sens de chaque bit — compétence n°1 de l'embarqué.",
          "Startup : au reset, le code d'initialisation configure horloges et mémoire avant `main()` — comprendre cette phase éclaire les bugs de démarrage.",
        ],
      },
    ],
  },
  {
    id: "compilation-croisee",
    title: "Compilation croisée",
    level: 3,
    intro:
      "Compiler ici pour exécuter là-bas : la toolchain.",
    blocks: [
      {
        kind: "fields",
        title: "Les étapes",
        fields: [
          {
            label: "Préprocesseur / compilation",
            value:
              "`arm-none-eabi-gcc` traduit le C en assembleur ARM : les options (`-O2`, `-mcpu=...`) ciblent le processeur exact.",
          },
          {
            label: "Édition de liens",
            value:
              "Le linker assemble objets + bibliothèques selon un script qui place chaque section (code en Flash, données en RAM) — le linker script décrit la mémoire de LA puce.",
          },
          {
            label: "Formats",
            value:
              "ELF (avec symboles, pour le débogueur), HEX/BIN (pour le flash) : le même binaire sous plusieurs habits.",
          },
        ],
      },
      {
        kind: "command",
        label: "Compiler un firmware minimal",
        command: "arm-none-eabi-gcc -mcpu=cortex-m4 -O2 -o firmware.elf main.c",
        why: "Compile `main.c` pour un Cortex-M4 avec optimisation `-O2`. En pratique, un Makefile ou un système de build orchestre compilation + édition de liens + génération du binaire à flasher.",
      },
    ],
  },
  {
    id: "memoire-embarquee",
    title: "Mémoire : Flash, RAM, pile et tas",
    level: 3,
    intro:
      "Quelques kilo-octets : chaque octet compte.",
    blocks: [
      {
        kind: "fields",
        title: "Les zones",
        fields: [
          {
            label: "Flash",
            value:
              "Programme + constantes : non volatile, limitée en cycles d'écriture — on n'y écrit pas en boucle.",
          },
          {
            label: "RAM",
            value:
              "Données vives : quelques Ko à quelques centaines de Ko — le bien le plus rare du système.",
          },
          {
            label: "Pile (stack)",
            value:
              "Variables locales et appels : par tâche sous RTOS — dimensionner chaque pile, détecter les débordements (canaris).",
          },
          {
            label: "Tas (heap)",
            value:
              "`malloc` : fragmenté et non déterministe — évité en temps réel dur, ou alloué une fois au démarrage.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : préférer le statique au dynamique, mesurer l'usage réel (le linker et le RTOS le rapportent), garder une marge — la panne de mémoire est silencieuse puis brutale.",
      },
    ],
  },
  {
    id: "interruptions-avance",
    title: "Interruptions : priorités et latence",
    level: 3,
    intro:
      "Le temps réel commence ici : qui interrompt qui, en combien de temps.",
    blocks: [
      {
        kind: "list",
        items: [
          "Priorités : numéroter les interruptions par criticité (contrôle moteur > UART) — une priorité inversée et le système rate ses échéances.",
          "Latence : temps entre l'événement et le traitement — la borner, la mesurer (GPIO basculée à l'entrée/sortie de l'ISR, oscilloscope).",
          "ISR courtes : l'interruption signale (sémaphore), la tâche traite — jamais de calcul lourd ni d'attente dans une ISR.",
          "Sections critiques : protéger les accès partagés le plus brièvement possible — chaque microseconde d'interruption masquée retarde le système.",
        ],
      },
    ],
  },
  {
    id: "dma",
    title: "DMA : le transfert sans CPU",
    level: 3,
    intro:
      "Décharger le processeur : l'accès direct à la mémoire.",
    blocks: [
      {
        kind: "text",
        text: "Le DMA transfère des blocs (capteur → RAM, RAM → périphérique) sans mobiliser le CPU : pendant qu'un échantillon se transfère, le processeur calcule sur le précédent (double buffering). Indispensable pour les flux rapides (audio, IMU haute fréquence, écrans).",
      },
      {
        kind: "list",
        items: [
          "Cohérence : le CPU et le DMA partagent la RAM — synchroniser (le CPU ne lit pas un buffer en cours de remplissage).",
          "En robotique : acquisition IMU à 1 kHz en DMA pendant que le contrôle tourne — le pattern haute performance standard.",
        ],
      },
    ],
  },
  {
    id: "consommation",
    title: "Consommation et modes basse puissance",
    level: 3,
    intro:
      "Chaque milliampère compte : dormir intelligemment.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers",
        fields: [
          {
            label: "Modes de sommeil",
            value:
              "Sleep, deep sleep : couper horloges et périphériques entre deux mesures — un capteur qui dort 99 % du temps consomme 100× moins.",
          },
          {
            label: "Réveil sur événement",
            value:
              "Dormir jusqu'à l'interruption (capteur, timer) plutôt que scruter en boucle — l'architecture basse consommation.",
          },
          {
            label: "Échelle de tension/fréquence",
            value:
              "Baisser horloge et tension quand la charge est faible : la consommation dynamique suit `P ∝ f·V²`.",
          },
        ],
      },
      {
        kind: "text",
        text: "Budget énergétique : lister chaque état (actif/sommeil), sa consommation et sa durée, sommer — le calcul qui dimensionne la batterie.",
      },
    ],
  },
  {
    id: "freertos-detail",
    title: "FreeRTOS en détail",
    level: 3,
    intro:
      "L'ordonnanceur le plus utilisé : tâches, files, temporisations.",
    blocks: [
      {
        kind: "fields",
        title: "Les mécanismes",
        fields: [
          {
            label: "Ordonnancement préemptif",
            value:
              "La tâche la plus prioritaire prête s'exécute, toujours — les priorités sont le contrat temps réel.",
          },
          {
            label: "Files (queues)",
            value:
              "Échange de données entre tâches (et depuis les ISR) : le canal sûr — jamais de variable globale partagée sans protection.",
          },
          {
            label: "Temporisations",
            value:
              "`vTaskDelay` : la tâche dort jusqu'à l'échéance — le CPU travaille pour les autres au lieu d'attendre.",
          },
          {
            label: "Inversion de priorité",
            value:
              "Une tâche basse priorité bloque une haute via un mutex : l'héritage de priorité le résout — le bug classique à connaître.",
          },
        ],
      },
    ],
  },
  {
    id: "drivers-peripheriques",
    title: "Écrire un driver",
    level: 3,
    intro:
      "Parler à une puce : l'anatomie d'un driver de capteur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire la datasheet",
            detail:
              "Adresse I2C/SPI, registres de configuration, format des données, séquences d'initialisation — tout y est.",
          },
          {
            title: "Initialiser",
            detail:
              "Configurer le bus puis la puce (plages, fréquences) : vérifier chaque écriture en relisant le registre (qui suis-je / ID).",
          },
          {
            title: "Lire et convertir",
            detail:
              "Lire les registres bruts, convertir en unités physiques (la datasheet donne les facteurs) — jamais de valeur brute dans l'application.",
          },
          {
            title: "Gérer les erreurs",
            detail:
              "Timeouts, NACK, valeurs aberrantes : un driver robuste signale l'échec au lieu de mentir — la fiabilité se joue ici.",
          },
        ],
      },
    ],
  },
  {
    id: "can-detail",
    title: "CAN en détail",
    level: 3,
    intro:
      "Le bus des robots et véhicules : robuste par conception.",
    blocks: [
      {
        kind: "list",
        items: [
          "Multi-maître avec arbitrage : en cas de collision, le message le plus prioritaire (identifiant le plus petit) gagne sans être corrompu — pas de temps perdu.",
          "Détection d'erreurs : CRC, acquittements, compteurs d'erreurs — un nœud défaillant se met hors bus tout seul (error confinement).",
          "Trames : identifiant + jusqu'à 8 octets (CAN classique) — on y met des états et des commandes, pas des flux vidéo.",
          "En robotique : relier carte de contrôle, capteurs et ordinateur de bord sur un bus unique, résistant au bruit des moteurs.",
        ],
      },
    ],
  },
  {
    id: "bootloader-ota",
    title: "Bootloader et mises à jour",
    level: 3,
    intro:
      "Mettre à jour sans démonter : le bootloader et l'OTA.",
    blocks: [
      {
        kind: "text",
        text: "Le bootloader est le premier code exécuté : il peut recevoir un nouveau firmware (UART, USB, radio) et l'écrire en Flash. Avec deux emplacements (A/B), la mise à jour est sûre : si la nouvelle version échoue, on redémarre sur l'ancienne — jamais de robot « briqué » par une MAJ.",
      },
      {
        kind: "list",
        items: [
          "Vérification : signature cryptographique du firmware avant de l'accepter — une MAJ non signée est une porte d'entrée.",
          "Rollback : conserver l'ancienne version jusqu'à preuve que la nouvelle tourne — le filet de sécurité.",
        ],
      },
    ],
  },
  {
    id: "securite-embarquee",
    title: "Sécurité embarquée",
    level: 3,
    intro:
      "Un robot connecté est une cible : les bases.",
    blocks: [
      {
        kind: "list",
        items: [
          "Boot sécurisé : ne démarrer que du firmware signé — la racine de confiance.",
          "Mises à jour signées : cf. bootloader — pas de code non authentifié.",
          "Interfaces : désactiver les ports de debug en production, pas de mot de passe par défaut sur les interfaces réseau.",
          "Surface minimale : chaque service exposé est un risque — n'activer que le nécessaire.",
        ],
      },
    ],
  },
  {
    id: "linux-embarque",
    title: "Linux embarqué",
    level: 3,
    intro:
      "Quand la cible fait tourner un OS : Yocto, Buildroot, temps réel.",
    blocks: [
      {
        kind: "fields",
        title: "Les approches",
        fields: [
          {
            label: "Distribution prête",
            value:
              "Raspberry Pi OS, Ubuntu : démarrer vite sur carte standard — parfait pour prototyper l'étage intelligent.",
          },
          {
            label: "Buildroot / Yocto",
            value:
              "Construire un Linux sur mesure (minimal, reproductible) : le standard industriel pour les produits.",
          },
          {
            label: "Temps réel sous Linux",
            value:
              "Patch PREEMPT_RT + priorités : du temps réel souple à dur selon le besoin — sans quitter l'écosystème Linux/ROS.",
          },
        ],
      },
      {
        kind: "text",
        text: "Lien avec les skills Linux et Intégration : l'ordinateur de bord est un système Linux comme un autre — avec des contraintes de démarrage, de robustesse et de temps réel en plus.",
      },
    ],
  },
  {
    id: "debogage-avance",
    title: "Débogage avancé : JTAG et traces",
    level: 3,
    intro:
      "Voir à l'intérieur : points d'arrêt matériels et traces d'exécution.",
    blocks: [
      {
        kind: "fields",
        title: "Les outils",
        fields: [
          {
            label: "Débogueur (OpenOCD/GDB)",
            value:
              "`openocd` pilote la sonde, GDB s'y connecte : pas à pas, registres, mémoire — le debug « vrai » quand les printf ne suffisent plus.",
          },
          {
            label: "Points d'arrêt matériels",
            value:
              "Arrêt sur accès mémoire (watchpoint) : attraper qui corrompt cette variable — l'arme contre les corruptions mystérieuses.",
          },
          {
            label: "Traces",
            value:
              "Enregistrer l'exécution (ou des événements horodatés) pour analyser après coup : indispensable pour les bugs temporels non reproductibles au pas à pas.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lancer OpenOCD",
        command: "openocd -f interface/stlink.cfg -f target/stm32f4x.cfg",
        why: "Démarre le serveur de debug pour une sonde ST-Link et une cible STM32F4x (fichiers de config à adapter à votre matériel). GDB s'y connecte ensuite pour déboguer le firmware.",
      },
    ],
  },
  {
    id: "fiabilite",
    title: "Fiabilité : watchdog et redondance",
    level: 3,
    intro:
      "Le robot doit survivre à ses propres bugs : les filets de sécurité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Watchdog : timer matériel qui redémarre la carte si le logiciel ne le « nourrit » pas — le dernier recours contre les blocages, indépendant du CPU.",
          "Window watchdog : exige d'être nourri dans une fenêtre (ni trop tôt, ni trop tard) — détecte aussi les boucles folles.",
          "Redondance : double capteur critique, double calculateur (vote) — pour les systèmes où l'échec n'est pas une option.",
          "États sûrs : à chaque détection d'anomalie, un état dégradé défini (arrêt moteurs, position de repli) — jamais de comportement indéfini.",
        ],
      },
    ],
  },
  {
    id: "certification",
    title: "Normes et certification",
    level: 3,
    intro:
      "Quand le robot travaille près des humains : le cadre normatif.",
    blocks: [
      {
        kind: "list",
        items: [
          "Sécurité fonctionnelle : identifier les dangers, classer les risques, démontrer que le système reste sûr — la démarche (normes type CEI 61508 / ISO 13849 en industrie).",
          "Traçabilité : exigences → code → tests — chaque exigence de sécurité est testée, chaque test est tracé.",
          "Documentation : le dossier de sécurité fait partie du produit — pas un supplément administratif.",
          "En pratique : même sans certification formelle, appliquer la démarche (analyse de risques, états sûrs, tests) rend tout robot plus sûr.",
        ],
      },
    ],
  },
  {
    id: "cemi",
    title: "CEM : la compatibilité électromagnétique",
    level: 3,
    intro:
      "Ne pas se brouiller soi-même : l'électronique du réel.",
    blocks: [
      {
        kind: "list",
        items: [
          "Émissions : les commutations rapides (moteurs, alimentations à découpage) rayonnent — filtrer et blinder à la source.",
          "Immunité : le système doit survivre aux perturbations (moteurs voisins, radio) — découplage, masses propres, blindage.",
          "Symptômes typiques : resets spontanés, capteurs qui délirent quand les moteurs tournent — 90 % du temps, un problème d'alimentation/masse.",
          "Lien avec l'Électronique : la CEM se joue dès le routage du PCB — pas après.",
        ],
      },
    ],
  },
  {
    id: "timers-avances",
    title: "Timers : la base de temps du système",
    level: 3,
    intro:
      "Tout est cadencé : PWM, mesures, échéances — les timers.",
    blocks: [
      {
        kind: "fields",
        title: "Les usages",
        fields: [
          {
            label: "Génération PWM",
            value:
              "Le timer compare un compteur à une consigne : le rapport cyclique règle vitesse moteur ou luminosité — sans charger le CPU.",
          },
          {
            label: "Capture d'entrée",
            value:
              "Horodater les fronts (codeur incrémental, ultrason) : mesurer périodes et fréquences avec la précision de l'horloge.",
          },
          {
            label: "Base de temps système",
            value:
              "Le tick du RTOS et les temporisations naissent d'un timer : la granularité temporelle de tout le firmware.",
          },
        ],
      },
      {
        kind: "text",
        text: "Comprendre prescaler / auto-reload / résolution : un timer 16 bits à 1 MHz mesure jusqu'à 65 ms à la microseconde — le calcul qui évite les débordements surprises.",
      },
    ],
  },
  {
    id: "adc-echantillonnage",
    title: "ADC : numériser le monde analogique",
    level: 3,
    intro:
      "Échantillonnage, résolution, repliement : mesurer juste.",
    blocks: [
      {
        kind: "fields",
        title: "Les paramètres",
        fields: [
          {
            label: "Résolution",
            value:
              "12 bits = 4096 niveaux : sur 3,3 V, ~0,8 mV par pas — la précision brute, avant le bruit.",
          },
          {
            label: "Fréquence d'échantillonnage",
            value:
              "Nyquist : échantillonner à plus de 2× la plus haute fréquence utile — en pratique 5 à 10× pour une mesure propre.",
          },
          {
            label: "Repliement (aliasing)",
            value:
              "Les fréquences trop hautes « se déguisent » en basses fréquences : filtrer en analogique avant de numériser (filtre anti-repliement).",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaîne complète : capteur → conditionnement (amplification, filtrage) → ADC → moyenne/filtrage numérique — la qualité de la mesure se joue autant en analogique qu'en numérique.",
      },
    ],
  },
  {
    id: "i2c-pieges",
    title: "I2C : les pièges du bus à 2 fils",
    level: 3,
    intro:
      "Simple sur le papier, capricieux sur le bus : pull-ups, adresses, blocages.",
    blocks: [
      {
        kind: "list",
        items: [
          "Pull-ups : le bus est à collecteur ouvert — sans résistances de tirage, rien ne monte à l'état haut. Valeur typique 4,7 kΩ, à réduire si le bus est long ou rapide.",
          "Adresses : conflits (deux puces à la même adresse) et adresses 7 vs 10 bits — scanner le bus (`i2cdetect` côté Linux) pour vérifier qui répond.",
          "Clock stretching : un esclave lent peut retenir l'horloge — le maître doit le supporter, sinon timeouts mystérieux.",
          "Bus bloqué : un esclave qui maintient SDA bas bloque tout — la récupération (envoyer des coups d'horloge) fait partie d'un driver robuste.",
        ],
      },
    ],
  },
  {
    id: "sans-fil-embarque",
    title: "Sans-fil embarqué : BLE, Wi-Fi, LoRa",
    level: 3,
    intro:
      "Communiquer sans fil : débit, portée, énergie — choisir.",
    blocks: [
      {
        kind: "fields",
        title: "Les technologies",
        fields: [
          {
            label: "BLE",
            value:
              "Bluetooth Low Energy : téléopération, configuration depuis un smartphone — faible consommation, portée de dizaines de mètres.",
          },
          {
            label: "Wi-Fi",
            value:
              "Débit élevé (vidéo, ROS 2) mais énergivore : pour les robots avec une grosse batterie et besoin de bande passante.",
          },
          {
            label: "LoRa",
            value:
              "Longue portée (km), très bas débit : télémétrie de robots d'extérieur — quelques octets, très loin.",
          },
        ],
      },
      {
        kind: "text",
        text: "Sécurité : chiffrer et authentifier — un robot pilotable par radio non protégée est une catastrophe en attente.",
      },
    ],
  },
  {
    id: "regles-codage",
    title: "Règles de codage : MISRA et compagnie",
    level: 3,
    intro:
      "Coder pour ne pas se tromper : les règles des systèmes critiques.",
    blocks: [
      {
        kind: "list",
        items: [
          "MISRA C : sous-ensemble du C qui bannit les constructions ambiguës ou dangereuses — le standard des industries critiques (auto, aéro).",
          "Principes : pas de comportement indéfini, pas de récursion, initialiser toujours, vérifier chaque retour, limiter la complexité des fonctions.",
          "Analyse statique : des outils vérifient automatiquement le respect des règles — le « correcteur » du firmware.",
          "Même sans certification : appliquer un sous-ensemble de ces règles rend tout firmware plus robuste.",
        ],
      },
    ],
  },
  {
    id: "choix-mcu",
    title: "Choisir son microcontrôleur",
    level: 3,
    intro:
      "La fiche de choix : périphériques, écosystème, disponibilité.",
    blocks: [
      {
        kind: "fields",
        title: "Les critères",
        fields: [
          {
            label: "Périphériques",
            value:
              "Assez de timers, UART, I2C/SPI, CAN, ADC pour TOUS les capteurs et actionneurs — avec de la marge pour la v2.",
          },
          {
            label: "Écosystème",
            value:
              "HAL du fabricant, exemples, communauté : un bon support vaut mieux qu'une fiche technique brillante.",
          },
          {
            label: "Debug",
            value:
              "SWD/JTAG accessible sur la carte : sans debug matériel, le développement est aveugle.",
          },
          {
            label: "Disponibilité",
            value:
              "Référence en stock chez plusieurs distributeurs, pas de fin de vie annoncée — la pénurie de 2021 a vacciné l'industrie.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-embarques",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets progressifs, du firmware au système.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Centrale inertielle",
            detail:
              "Driver IMU (I2C/SPI) + acquisition à 1 kHz (timer + DMA) + envoi UART : mesurer bruit, dérive, latence. Livrable : firmware documenté avec mesures.",
          },
          {
            title: "Projet 2 — Contrôleur moteur",
            detail:
              "PWM + codeur + boucle de vitesse (PI) sous FreeRTOS + communication CAN vers un superviseur : le contrôleur temps réel complet. Livrable : asservissement caractérisé (temps de réponse, erreur).",
          },
          {
            title: "Projet 3 — Nœud robotique",
            detail:
              "Microcontrôleur (temps réel) + ordinateur Linux (ROS 2) : le micro publie les capteurs et exécute les commandes, avec watchdog, bootloader et MAJ. Livrable : système complet testé en endurance.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-embarque",
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
            label: "Datasheets et manuels",
            value:
              "La documentation du fabricant de votre puce (reference manual) : la source de vérité — toujours la version exacte de votre silicium.",
          },
          {
            label: "Documentation FreeRTOS",
            value:
              "Le site officiel (freertos.org) : concepts, API, exemples — la référence de l'ordonnancement embarqué.",
          },
          {
            label: "Making Embedded Systems (E. White)",
            value:
              "Le livre d'ingénierie firmware : architecture, drivers, tests — la pratique professionnelle condensée.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : un projet réel par concept de cette page — l'embarqué ne s'apprend que les mains sur le matériel.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "L'embarqué maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Piloter du matériel réel : l'électronique (PCB, alimentations, CEM) pour des cartes robustes.",
          "Monter en abstraction : ROS 2 sur l'ordinateur de bord, puis l'intégration système complète.",
          "Connecter au contrôle : implémenter vos asservissements sur la cible temps réel.",
          "Revenir à la roadmap : valider Systèmes embarqués et attaquer la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

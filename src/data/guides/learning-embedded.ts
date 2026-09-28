import type { LearningSection } from "../skill-guides";

/**
 * Learning Page des Systèmes embarqués : microcontrôleurs, firmware,
 * temps réel, bus et débogage hardware. Commandes limitées aux commandes
 * standard et vérifiables (toolchain ARM, PlatformIO, port série).
 * Exemples C génériques et corrects (style Arduino / bare-metal simple).
 */
export const LEARNING_EMBEDDED: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce que sont les systèmes embarqués : le code qui fait bouger le monde physique.",
    blocks: [
      {
        kind: "text",
        text: "Les systèmes embarqués sont des ordinateurs dédiés intégrés à un objet : microcontrôleurs, firmware, contraintes de temps réel et d'énergie. C'est le code qui fait bouger le monde physique — objets connectés, automobile, médical, industrie.",
      },
      {
        kind: "text",
        text: "L'embarqué enseigne une rigueur que le développement applicatif ne demande jamais : mémoire comptée en kilo-octets, timing strict à la microseconde, consommation mesurée en microampères. Chaque octet et chaque cycle comptent.",
      },
      {
        kind: "text",
        text: "Prérequis recommandés : programmer en C/C++ (les langages du firmware, proches du matériel) et des bases d'électronique (lire un schéma, comprendre GPIO, bus et alimentations).",
      },
    ],
  },
  {
    id: "microcontroleur-vs-ordinateur",
    title: "Microcontrôleur vs ordinateur",
    level: 1,
    intro: "Comprendre ce qui distingue une puce embarquée d'un PC.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Microcontrôleur", "Ordinateur (PC/serveur)"],
        rows: [
          ["Rôle", "Une tâche dédiée, intégrée à un objet", "Usage général, multi-utilisateurs"],
          ["Mémoire", "Quelques Ko à quelques Mo, tout est compté", "Des Go, la mémoire est abondante"],
          ["Système d'exploitation", "Souvent aucun (bare metal) ou un RTOS léger", "Toujours un OS complet"],
          ["Consommation", "Microampères en veille : des années sur pile", "Des dizaines de watts en permanence"],
          ["Temps réel", "Réponse garantie dans un délai borné", "Meilleur effort, pas de garantie"],
          ["Périphériques", "GPIO, ADC, timers, UART/SPI/I2C intégrés", "USB, PCIe, réseau via contrôleurs externes"],
        ],
      },
      {
        kind: "text",
        text: "Familles courantes : les cartes de prototypage à base d'AVR ou d'ESP32 pour débuter, les STM32 pour l'industrie. Le principe reste le même partout : un CPU, de la mémoire flash et RAM, et des périphériques intégrés — le tout dans quelques millimètres.",
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
    intro: "Ce qu'il faut avant d'écrire son premier firmware.",
    blocks: [
      {
        kind: "fields",
        title: "Prérequis",
        fields: [
          {
            label: "C (indispensable)",
            value: "Le langage du firmware : pointeurs, manipulation de bits, mémoire statique. Le C++ est un plus pour les frameworks modernes.",
          },
          {
            label: "Électronique de base",
            value: "Lire un schéma, comprendre tension/courant, câbler sur breadboard, mesurer au multimètre. Le firmware pilote du hardware réel.",
          },
          {
            label: "Linux / terminal",
            value: "La toolchain s'installe et s'utilise en ligne de commande. Savoir naviguer, installer des paquets, gérer les permissions.",
          },
          {
            label: "Git",
            value: "Versionner le firmware comme tout logiciel : les bugs embarqués se déboguent aussi dans l'historique.",
          },
        ],
      },
    ],
  },
  {
    id: "installer-la-toolchain",
    title: "Installer la toolchain",
    level: 2,
    intro: "Le compilateur croisé : produire du code pour une autre architecture.",
    blocks: [
      {
        kind: "command",
        label: "Installer le compilateur croisé ARM",
        command: "sudo apt install gcc-arm-none-eabi",
        why: "Un compilateur croisé produit du code pour une autre architecture que celle de la machine hôte : ici, du code ARM pour microcontrôleur, depuis un PC x86. C'est l'outil de base du développement bare-metal ARM.",
        verify: "arm-none-eabi-gcc --version",
      },
      {
        kind: "command",
        label: "Installer OpenOCD (flash et debug)",
        command: "sudo apt install openocd",
        why: "OpenOCD pilote les sondes de débogage (ST-Link, J-Link et compatibles) : il flashe le firmware dans la puce et permet le débogage pas à pas via GDB.",
        verify: "openocd --version",
      },
      {
        kind: "text",
        text: "Alternative simple pour débuter : l'Arduino IDE ou PlatformIO, qui installent et configurent la toolchain automatiquement pour les cartes supportées. La toolchain manuelle donne plus de contrôle ; les environnements intégrés vont plus vite.",
      },
    ],
  },
  {
    id: "platformio",
    title: "PlatformIO : l'environnement unifié",
    level: 2,
    intro: "Compiler, flasher et monitorer depuis un seul outil.",
    blocks: [
      {
        kind: "command",
        label: "Créer un projet PlatformIO",
        command: "pio init --board esp32dev",
        why: "Initialise un projet pour une carte donnée : PlatformIO télécharge la plateforme, la toolchain et le framework adaptés. Le fichier `platformio.ini` centralise la configuration (`platform`, `board`, `framework`).",
        verify: "ls platformio.ini",
      },
      {
        kind: "command",
        label: "Compiler le firmware",
        command: "pio run",
        why: "Compile le projet : le code source devient un binaire flashable. Les erreurs de compilation s'affichent ici — les corriger avant toute tentative de flash.",
      },
      {
        kind: "command",
        label: "Flasher la carte",
        command: "pio run -t upload",
        why: "Envoie le firmware compilé dans la mémoire flash du microcontrôleur via le port USB/série. La carte redémarre sur le nouveau firmware.",
      },
      {
        kind: "command",
        label: "Ouvrir la console série",
        command: "pio device monitor -b 115200",
        why: "Affiche les messages envoyés par le firmware sur le port série (115200 bauds est la vitesse la plus courante). C'est le `printf` du monde embarqué : le premier outil de débogage.",
      },
    ],
  },
  {
    id: "acces-port-serie",
    title: "Accéder au port série",
    level: 2,
    intro: "Les permissions Linux pour parler à la carte.",
    blocks: [
      {
        kind: "command",
        label: "Lister les ports série disponibles",
        command: "ls /dev/ttyUSB*",
        why: "Les cartes de développement apparaissent comme des ports série USB (`/dev/ttyUSB0`, `/dev/ttyACM0`...). Cette commande vérifie que le système voit la carte branchée.",
      },
      {
        kind: "command",
        label: "Ajouter l'utilisateur au groupe dialout",
        command: "sudo usermod -aG dialout $USER",
        why: "Sous Linux, l'accès aux ports série est réservé au groupe `dialout`. Sans cette appartenance, le flash et le moniteur série échouent avec une erreur de permission. Il faut se reconnecter pour que le changement prenne effet.",
      },
      {
        kind: "command",
        label: "Ouvrir une console série simple",
        command: "screen /dev/ttyUSB0 115200",
        why: "Alternative légère au moniteur PlatformIO : `screen` ouvre le port à 115200 bauds. Quitter avec `Ctrl+A` puis `K`. Pratique quand PlatformIO n'est pas sous la main.",
      },
    ],
  },
  {
    id: "premier-firmware",
    title: "Premier firmware : la LED clignotante",
    level: 2,
    intro: "Le « Hello World » de l'embarqué, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir la carte et l'environnement",
            detail: "Une carte de développement courante (type Arduino ou ESP32) et PlatformIO ou l'Arduino IDE. Brancher la carte en USB et vérifier qu'elle apparaît (`ls /dev/ttyUSB*`).",
          },
          {
            title: "Écrire le firmware",
            detail: "Le programme ci-dessous : configurer la broche de la LED en sortie, puis l'allumer et l'éteindre en boucle avec une pause. Deux fonctions structurent tout firmware Arduino : `setup()` (une fois au démarrage) et `loop()` (répétée indéfiniment).",
          },
          {
            title: "Compiler",
            detail: "`pio run` : vérifier qu'il n'y a aucune erreur ni aucun avertissement. Un avertissement en embarqué est une erreur qui attend son heure.",
          },
          {
            title: "Flasher",
            detail: "`pio run -t upload` : le firmware est écrit en flash, la carte redémarre. La LED clignote : le premier firmware tourne.",
          },
          {
            title: "Observer et modifier",
            detail: "Changer la durée des pauses, recompiler, reflasher. Ce cycle — modifier, compiler, flasher, observer — est le quotidien du développeur embarqué.",
          },
        ],
      },
      {
        kind: "code",
        language: "cpp",
        title: "Blink : setup() et loop()",
        code: `#define LED_PIN 13\n\nvoid setup() {\n    pinMode(LED_PIN, OUTPUT);   // la broche pilote la LED : mode sortie\n}\n\nvoid loop() {\n    digitalWrite(LED_PIN, HIGH); // allume la LED\n    delay(500);                 // attend 500 ms\n    digitalWrite(LED_PIN, LOW);  // éteint la LED\n    delay(500);\n}`,
      },
    ],
  },
  {
    id: "console-serie-debug",
    title: "La console série",
    level: 2,
    intro: "Le printf de l'embarqué : afficher pour comprendre.",
    blocks: [
      {
        kind: "code",
        language: "cpp",
        title: "Journalisation sur le port série",
        code: `void setup() {\n    Serial.begin(115200);        // ouvre le port série à 115200 bauds\n    Serial.println("Demarrage"); // message de démarrage\n}\n\nvoid loop() {\n    int valeur = analogRead(A0); // lit l'entrée analogique A0\n    Serial.print("Capteur : ");\n    Serial.println(valeur);      // affiche la valeur + retour ligne\n    delay(1000);\n}`,
      },
      {
        kind: "list",
        items: [
          "La vitesse (`baud rate`) doit être identique côté firmware et côté moniteur, sinon les caractères sont illisibles.",
          "Afficher les valeurs des capteurs, les états du programme, les erreurs : c'est le débogage n° 1 avant le débogueur matériel.",
          "Attention : trop de messages ralentit la boucle. En production, réduire ou conditionner la verbosité.",
          "Les messages de démarrage (version du firmware, état des périphériques) aident énormément au diagnostic sur le terrain.",
        ],
      },
    ],
  },
  {
    id: "gpio",
    title: "Les GPIO",
    level: 2,
    intro: "General Purpose Input/Output : les pattes qui parlent au monde.",
    blocks: [
      {
        kind: "text",
        text: "Les GPIO sont les broches configurables du microcontrôleur : chacune peut être une entrée (lire un bouton, un capteur logique) ou une sortie (allumer une LED, commander un transistor). C'est l'interface la plus directe avec le monde physique.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Lire un bouton avec anti-rebond logiciel",
        code: `#define BTN_PIN 2\n#define LED_PIN 13\n\nvoid setup() {\n    pinMode(BTN_PIN, INPUT_PULLUP); // entrée avec résistance de tirage interne\n    pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n    // Avec INPUT_PULLUP : bouton relâché = HIGH, appuyé = LOW\n    if (digitalRead(BTN_PIN) == LOW) {\n        digitalWrite(LED_PIN, HIGH);\n    } else {\n        digitalWrite(LED_PIN, LOW);\n    }\n    delay(20); // anti-rebond minimal : ignore les rebonds mécaniques\n}`,
      },
      {
        kind: "list",
        items: [
          "Un bouton mécanique « rebondit » : plusieurs transitions rapides à chaque appui. Sans anti-rebond (délai ou filtrage), un appui compte pour plusieurs.",
          "`INPUT_PULLUP` utilise la résistance de tirage interne : le bouton se câble simplement entre la broche et la masse, sans composant externe.",
          "Ne jamais laisser une entrée en l'air (flottante) : elle capte du bruit et vaut aléatoirement 0 ou 1. Toujours un tirage vers le haut ou vers le bas.",
          "Vérifier la tension des GPIO (3,3 V ou 5 V selon la puce) : appliquer 5 V sur une entrée 3,3 V la détruit.",
        ],
      },
    ],
  },
  {
    id: "adc",
    title: "L'ADC : lire le monde analogique",
    level: 2,
    intro: "Convertir une tension en nombre : capteurs analogiques.",
    blocks: [
      {
        kind: "code",
        language: "cpp",
        title: "Lecture analogique et conversion en tension",
        code: `void setup() {\n    Serial.begin(115200);\n}\n\nvoid loop() {\n    int brut = analogRead(A0);          // 0..1023 sur un ADC 10 bits\n    float tension = brut * 5.0 / 1023.0; // conversion en volts (réf. 5 V)\n    Serial.println(tension);\n    delay(500);\n}`,
      },
      {
        kind: "list",
        items: [
          "La résolution (10 ou 12 bits) fixe le nombre de niveaux ; la tension de référence fixe ce qu'ils valent. Les deux déterminent la précision.",
          "Les mesures analogiques sont bruitées : moyenner plusieurs lectures pour stabiliser.",
          "Ne jamais dépasser la tension de référence sur une entrée analogique.",
          "Pour les capteurs lents (température), une lecture par seconde suffit ; pour les signaux rapides, il faut échantillonner plus vite et régulièrement.",
        ],
      },
    ],
  },
  {
    id: "pwm-embarque",
    title: "La PWM",
    level: 2,
    intro: "Varier une puissance avec un signal logique.",
    blocks: [
      {
        kind: "code",
        language: "cpp",
        title: "Varier la luminosité d'une LED en PWM",
        code: `#define LED_PIN 9  // broche compatible PWM\n\nvoid setup() {\n    pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n    // Montée progressive de la luminosité\n    for (int i = 0; i <= 255; i++) {\n        analogWrite(LED_PIN, i); // rapport cyclique 0..255\n        delay(10);\n    }\n    // Descente progressive\n    for (int i = 255; i >= 0; i--) {\n        analogWrite(LED_PIN, i);\n        delay(10);\n    }\n}`,
      },
      {
        kind: "text",
        text: "La PWM commute rapidement entre 0 et 1 ; le rapport cyclique fixe la puissance moyenne. Mêmes usages qu'en électronique : LED, moteurs (via un driver), sons. Seules certaines broches supportent la PWM matérielle — vérifier sur le schéma de la carte.",
      },
    ],
  },
  {
    id: "interruptions",
    title: "Les interruptions",
    level: 2,
    intro: "Réagir immédiatement, sans scruter en boucle.",
    blocks: [
      {
        kind: "text",
        text: "Une interruption suspend le programme principal pour exécuter une routine courte quand un événement survient : front sur une broche, fin de timer, donnée reçue. C'est le mécanisme du temps réel : réagir en microsecondes, pas « quand la boucle y arrive ».",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Compter des impulsions par interruption",
        code: `volatile unsigned long impulsions = 0; // volatile : modifiée hors du flux normal\n\nvoid onImpulsion() {\n    impulsions++; // routine courte : juste compter\n}\n\nvoid setup() {\n    Serial.begin(115200);\n    attachInterrupt(digitalPinToInterrupt(2), onImpulsion, RISING);\n}\n\nvoid loop() {\n    Serial.println(impulsions);\n    delay(1000);\n}`,
      },
      {
        kind: "list",
        items: [
          "Règle d'or : une routine d'interruption doit être courte. Pas de `delay()`, pas d'affichage série, pas de calculs lourds — juste signaler, le traitement se fait dans la boucle principale.",
          "`volatile` est obligatoire pour les variables partagées entre l'interruption et le programme : sans lui, le compilateur optimise à tort.",
          "Les interruptions peuvent s'imbriquer ou se perdre si elles sont trop fréquentes : dimensionner leur charge.",
        ],
      },
    ],
  },
  {
    id: "timers",
    title: "Les timers",
    level: 2,
    intro: "Le temps précis : la base des boucles périodiques.",
    blocks: [
      {
        kind: "text",
        text: "Les timers sont des compteurs matériels cadencés par l'horloge : ils mesurent le temps, génèrent des interruptions périodiques et produisent la PWM matérielle. Toute boucle de contrôle à période fixe (un PID, un échantillonnage) repose sur un timer.",
      },
      {
        kind: "list",
        items: [
          "Éviter `delay()` pour les tâches périodiques : il bloque tout le programme. Préférer une comparaison de temps écoulé ou un timer avec interruption.",
          "La PWM matérielle (via timer) ne charge pas le CPU, contrairement à une PWM logicielle.",
          "La précision du timer dépend de l'horloge : quartz externe (précis) ou oscillateur interne (économique, moins précis).",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro: "Les pièges classiques des premiers firmwares.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["Mauvaise vitesse série", "Caractères illisibles sur la console", "Même baud rate des deux côtés"],
          ["Entrée flottante", "Lecture aléatoire", "Résistance de tirage (interne ou externe)"],
          ["`delay()` partout", "Programme qui ne réagit plus", "Machine à états + temps écoulé, ou interruptions"],
          ["Variable partagée non `volatile`", "Valeur « figée » ou incohérente", "Déclarer `volatile` toute variable touchée par une interruption"],
          ["Débordement de `millis()`", "Bug après ~50 jours de fonctionnement", "Comparer des différences de temps, jamais des valeurs absolues"],
          ["Stack overflow", "Plantages aléatoires", "Éviter les gros tableaux locaux et la récursion ; surveiller la RAM"],
          ["Alimentation insuffisante", "Resets intempestifs, Wi-Fi qui décroche", "Alimentation capable de fournir les pics de courant"],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "bare-metal",
    title: "Le bare metal",
    level: 3,
    intro: "Programmer sans système d'exploitation : contrôle total, zéro abstraction.",
    blocks: [
      {
        kind: "text",
        text: "En bare metal, le firmware est le seul logiciel de la puce : pas d'OS, pas de pilote fourni — on configure directement les registres du microcontrôleur. C'est exigeant mais ça donne un contrôle total : chaque cycle d'horloge est maîtrisé, la consommation est minimale.",
      },
      {
        kind: "diagram",
        title: "Ce qui tourne en bare metal",
        lines: [
          "  ┌─────────────────────────────────┐",
          "  │  Votre firmware                 │",
          "  │  - vecteur d'interruptions      │",
          "  │  - initialisation (horloges,    │",
          "  │    GPIO, périphériques)         │",
          "  │  - boucle principale            │",
          "  │  - routines d'interruption      │",
          "  ├─────────────────────────────────┤",
          "  │  Matériel (registres)           │",
          "  └─────────────────────────────────┘",
          "  Aucune couche entre les deux.",
        ],
      },
      {
        kind: "list",
        items: [
          "Le point d'entrée n'est pas `main()` au sens classique : un code de démarrage (startup) initialise la mémoire puis appelle `main()`.",
          "Chaque périphérique se configure en écrivant dans ses registres, décrits dans le manuel de référence du fabricant (souvent 1000+ pages).",
          "Les frameworks (Arduino, ESP-IDF, HAL des fabricants) cachent cette complexité — mais la comprendre aide à déboguer quand ils se comportent bizarrement.",
        ],
      },
    ],
  },
  {
    id: "registres",
    title: "Les registres",
    level: 3,
    intro: "La télécommande du matériel : lire et écrire des bits.",
    blocks: [
      {
        kind: "text",
        text: "Un registre est une case mémoire qui contrôle le matériel : chaque bit a un sens (activer un périphérique, choisir un mode, lire un état). Programmer en bare metal, c'est manipuler ces bits avec des opérations logiques.",
      },
      {
        kind: "code",
        language: "c",
        title: "Manipulation de bits sur un registre (exemple générique)",
        code: `void configurer_registres(void) {\n    // Allumer le bit 5 d'un registre (sans toucher aux autres)\n    REGISTRE |= (1 << 5);\n\n    // Eteindre le bit 5\n    REGISTRE &= ~(1 << 5);\n\n    // Tester le bit 3\n    if (REGISTRE & (1 << 3)) {\n        // le bit 3 est a 1\n    }\n\n    // Ecrire une valeur sur les bits 0..3 (masque 0x0F)\n    REGISTRE = (REGISTRE & ~0x0F) | (valeur & 0x0F);\n}`,
      },
      {
        kind: "list",
        items: [
          "`|=` pour mettre des bits à 1, `&= ~` pour les mettre à 0, `&` pour les tester : ces trois idiomes couvrent 90 % du bare metal.",
          "Toujours lire-modifier-écrire avec un masque : écraser tout le registre effacerait la configuration des autres bits.",
          "Les noms exacts des registres viennent du manuel de référence du microcontrôleur cible — jamais de mémoire, toujours de la documentation.",
        ],
      },
    ],
  },
  {
    id: "memoire-flash-ram",
    title: "Flash et RAM",
    level: 3,
    intro: "Deux mémoires, deux rôles, des contraintes opposées.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Flash", "RAM"],
        rows: [
          ["Rôle", "Stocke le programme (et les constantes)", "Stocke les variables, la pile, le tas"],
          ["Persistance", "Non volatile : survit à la coupure", "Volatile : effacée à chaque redémarrage"],
          ["Taille typique", "De dizaines de Ko à quelques Mo", "De quelques Ko à quelques centaines de Ko"],
          ["Contrainte", "Nombre de cycles d'écriture limité", "Chaque octet compte : pas de gaspillage"],
          ["Piège", "Écrire en flash à chaque boucle l'use prématurément", "Stack overflow et fuites mémoire plantent sans prévenir"],
        ],
      },
      {
        kind: "list",
        items: [
          "Éviter l'allocation dynamique (`malloc`) sur les petites cibles : mémoire statique, tailles connues à la compilation.",
          "Les chaînes de caractères et les constantes vont en flash, pas en RAM.",
          "Surveiller l'usage mémoire à la compilation : la toolchain affiche les tailles utilisées.",
        ],
      },
    ],
  },
  {
    id: "horloges",
    title: "Les horloges",
    level: 3,
    intro: "Tout le timing du système part de l'horloge.",
    blocks: [
      {
        kind: "text",
        text: "Le microcontrôleur est cadencé par une horloge : oscillateur interne (économique, peu précis), quartz externe (précis) ou PLL (qui multiplie la fréquence). La fréquence d'horloge fixe la vitesse du CPU, des timers et des bus.",
      },
      {
        kind: "list",
        items: [
          "Plus de fréquence = plus de calculs = plus de consommation. Le compromis vitesse/énergie se règle ici.",
          "Les périphériques de communication exigent une horloge précise : un UART à 115200 bauds ne tolère pas une horloge qui dérive.",
          "Au démarrage, la puce tourne souvent sur une horloge interne lente : le firmware bascule ensuite vers la configuration voulue.",
          "En low power, on réduit ou on coupe les horloges des périphériques inutilisés.",
        ],
      },
    ],
  },
  {
    id: "vecteurs-interruption",
    title: "Vecteurs d'interruption et priorités",
    level: 3,
    intro: "Quand plusieurs événements se bousculent.",
    blocks: [
      {
        kind: "text",
        text: "Chaque source d'interruption (timer, GPIO, UART, ADC...) a sa routine, désignée par une table de vecteurs. Quand plusieurs interruptions arrivent en même temps, les priorités décident de l'ordre de traitement.",
      },
      {
        kind: "list",
        items: [
          "Donner la priorité la plus haute aux événements les plus critiques en temps (boucle de contrôle, sécurité).",
          "Une interruption de basse priorité peut être retardée par une plus prioritaire : en tenir compte dans les budgets temps.",
          "Partager des données entre interruptions de priorités différentes exige des sections critiques (désactivation brève des interruptions).",
          "Le temps total passé dans les interruptions doit rester une petite fraction du temps CPU, sinon le programme principal n'avance plus.",
        ],
      },
    ],
  },
  {
    id: "dma",
    title: "Le DMA",
    level: 3,
    intro: "Transférer des données sans réveiller le CPU.",
    blocks: [
      {
        kind: "text",
        text: "Le DMA (Direct Memory Access) déplace des blocs de données entre périphériques et mémoire sans intervention du CPU : pendant qu'un capteur remplit un tampon via DMA, le processeur fait autre chose — ou dort pour économiser l'énergie.",
      },
      {
        kind: "list",
        items: [
          "Usages : acquisition ADC en continu, réception UART/SPI à haut débit, rafraîchissement d'écrans.",
          "Le CPU n'est interrompu qu'à la fin du transfert (ou à mi-tampon, en double buffering).",
          "Attention à la cohérence : le DMA et le CPU partagent la mémoire — synchroniser l'accès aux tampons.",
        ],
      },
    ],
  },
  {
    id: "watchdog",
    title: "Le watchdog",
    level: 3,
    intro: "Le gardien qui redémarre le système en cas de blocage.",
    blocks: [
      {
        kind: "text",
        text: "Le watchdog est un timer indépendant qui redémarre le microcontrôleur s'il n'est pas « caressé » (réarmé) périodiquement par le firmware. Si le programme se bloque, le watchdog expire et provoque un reset : le système repart au lieu de rester planté.",
      },
      {
        kind: "list",
        items: [
          "Indispensable pour tout système qui doit tourner sans surveillance : le plantage n'est plus une option.",
          "Le réarmement doit prouver que le système est sain : le placer à un endroit qui ne s'exécute que si tout va bien, pas aveuglément dans la boucle.",
          "Choisir le timeout avec soin : trop court = resets intempestifs pendant les tâches longues ; trop long = le système reste bloqué trop longtemps.",
          "En développement, le watchdog peut gêner le débogage pas à pas : prévoir un moyen de le désactiver en debug.",
        ],
      },
    ],
  },
  {
    id: "low-power",
    title: "La basse consommation",
    level: 3,
    intro: "Des années sur une pile : les modes sleep et le duty cycling.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers",
        fields: [
          {
            label: "Modes sleep",
            value: "Le CPU dort (microampères), un timer ou une interruption le réveille périodiquement. Le système ne consomme que pendant ses brèves phases actives.",
          },
          {
            label: "Duty cycling",
            value: "Mesurer toutes les 10 minutes plutôt qu'en continu : le rapport temps actif / temps de sommeil fixe la consommation moyenne.",
          },
          {
            label: "Couper les périphériques",
            value: "Éteindre radio, capteurs et bus entre les mesures. Un capteur alimenté en permanence ruine les efforts du CPU.",
          },
          {
            label: "Baisser horloge et tension",
            value: "La consommation croît avec la fréquence et le carré de la tension : ralentir quand la charge est faible.",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode : mesurer le courant réel (multimètre ou analyseur de puissance), calculer la consommation moyenne sur un cycle complet, en déduire l'autonomie. Optimiser sans mesurer, c'est deviner.",
      },
    ],
  },
  {
    id: "uart-detail",
    title: "UART en profondeur",
    level: 3,
    intro: "Au-delà du printf : trames, erreurs, RS-485.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une trame UART : bit de start, 5 à 9 bits de données, parité optionnelle, bits de stop. Les deux côtés doivent partager exactement ces paramètres.",
          "Erreurs à gérer : framing (désynchronisation), overrun (donnée perdue car non lue à temps), parité.",
          "Pour les longues distances ou les environnements bruités : RS-485 (différentiel, multipoint) plutôt que l'UART logique.",
          "À haut débit ou en réception continue, utiliser le DMA ou des interruptions avec tampon circulaire — jamais de scrutation bloquante.",
        ],
      },
    ],
  },
  {
    id: "spi-detail",
    title: "SPI en profondeur",
    level: 3,
    intro: "Modes, vitesses et pièges du bus rapide.",
    blocks: [
      {
        kind: "list",
        items: [
          "Quatre modes (0-3) combinent polarité et phase d'horloge : le maître et l'esclave doivent utiliser le même mode — c'est le piège n° 1, à vérifier dans la datasheet.",
          "La vitesse se négocie : commencer lentement pour valider la communication, puis monter jusqu'à la limite du composant le plus lent.",
          "Un fil de sélection (CS) par esclave, actif à tour de rôle. Certains composants exigent que le CS bascule entre chaque transfert.",
          "Distances courtes et pistes soignées : à plusieurs MHz, la qualité du câblage compte.",
        ],
      },
    ],
  },
  {
    id: "i2c-detail",
    title: "I2C en profondeur",
    level: 3,
    intro: "Adressage, horloge étirée et débogage du bus à deux fils.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque esclave a une adresse 7 bits : vérifier les conflits quand on empile des modules (certains ont des cavaliers de sélection d'adresse).",
          "Les résistances de tirage dimensionnent la vitesse : trop fortes = fronts mous à haute vitesse ; trop faibles = consommation excessive.",
          "L'esclave peut « étirer » l'horloge (clock stretching) pour gagner du temps : le maître doit le supporter.",
          "Débogage : un analyseur logique qui décode l'I2C montre instantanément qui parle, à quelle adresse, et qui ne répond pas (NACK).",
          "Le bus peut se bloquer (un esclave coincé à l'état bas) : prévoir une procédure de récupération (séquences d'horloge forcées).",
        ],
      },
    ],
  },
  {
    id: "freertos-taches",
    title: "FreeRTOS : les tâches",
    level: 3,
    intro: "Le multitâche déterministe quand le bare metal ne suffit plus.",
    blocks: [
      {
        kind: "text",
        text: "FreeRTOS est un système temps réel léger : il ordonnance des tâches selon leurs priorités, avec des garanties temporelles. Quand le firmware dépasse « une boucle et quelques interruptions », un RTOS structure le tout.",
      },
      {
        kind: "code",
        language: "c",
        title: "Créer deux tâches FreeRTOS",
        code: `#include "FreeRTOS.h"\n#include "task.h"\n\nvoid tache_capteur(void *param) {\n    (void)param;\n    for (;;) {\n        lire_capteur();\n        vTaskDelay(pdMS_TO_TICKS(100)); // pause de 100 ms, sans bloquer les autres\n    }\n}\n\nvoid tache_controle(void *param) {\n    (void)param;\n    for (;;) {\n        mettre_a_jour_pid();\n        vTaskDelay(pdMS_TO_TICKS(10)); // boucle de contrôle à 100 Hz\n    }\n}\n\nvoid demarrer(void) {\n    xTaskCreate(tache_capteur, "capteur", 256, NULL, 1, NULL);\n    xTaskCreate(tache_controle, "controle", 256, NULL, 2, NULL); // plus prioritaire\n    vTaskStartScheduler(); // ne retourne jamais\n}`,
      },
      {
        kind: "list",
        items: [
          "Chaque tâche a sa pile : la dimensionner selon ses besoins (256 mots ci-dessus est un exemple, à ajuster).",
          "Les priorités sont fixes : la tâche la plus prioritaire prête s'exécute. La boucle de contrôle est plus prioritaire que l'affichage.",
          "`vTaskDelay` endort la tâche sans bloquer les autres — l'équivalent non bloquant de `delay()`.",
        ],
      },
    ],
  },
  {
    id: "freertos-communication",
    title: "FreeRTOS : files et sémaphores",
    level: 3,
    intro: "Faire communiquer les tâches sans corruption.",
    blocks: [
      {
        kind: "table",
        headers: ["Mécanisme", "Rôle", "Exemple"],
        rows: [
          ["File (queue)", "Transférer des données entre tâches, avec tampon", "La tâche capteur envoie les mesures à la tâche de contrôle"],
          ["Sémaphore binaire", "Signaler un événement", "Une interruption signale « donnée prête » à une tâche"],
          ["Mutex", "Protéger une ressource partagée", "Deux tâches qui écrivent sur le même bus série"],
          ["Notification directe", "Signal léger et rapide vers une tâche", "Réveil d'une tâche depuis une interruption"],
        ],
      },
      {
        kind: "text",
        text: "Règle : jamais de variable partagée sans protection entre tâches de priorités différentes. Les files copient les données (sûr mais coûteux) ; les mutex protègent l'accès (attention à l'inversion de priorité, que FreeRTOS gère par héritage de priorité).",
      },
    ],
  },
  {
    id: "bootloader",
    title: "Le bootloader",
    level: 3,
    intro: "Le programme avant le programme.",
    blocks: [
      {
        kind: "text",
        text: "Le bootloader est le premier code exécuté au démarrage : il initialise le minimum vital, puis charge ou lance le firmware applicatif. C'est lui qui permet de flasher via USB/série sans sonde de débogage.",
      },
      {
        kind: "list",
        items: [
          "Rôle typique : attendre quelques instants un nouveau firmware sur le port série, sinon lancer l'application existante.",
          "Un bootloader robuste vérifie l'intégrité du firmware (somme de contrôle) avant de le lancer.",
          "Prévoir un moyen de forcer le mode bootloader (bouton au démarrage) : sans lui, un firmware défectueux peut « bricker » la carte.",
          "Le bootloader occupe une zone protégée de la flash : l'application ne doit jamais l'écraser.",
        ],
      },
    ],
  },
  {
    id: "ota",
    title: "Les mises à jour OTA",
    level: 3,
    intro: "Mettre à jour le firmware sans toucher l'objet.",
    blocks: [
      {
        kind: "text",
        text: "L'OTA (Over-The-Air) met à jour le firmware via le réseau (Wi-Fi le plus souvent). Indispensable pour les objets déployés : corriger un bug sans récupérer chaque appareil.",
      },
      {
        kind: "list",
        items: [
          "Double partition (A/B) : le nouveau firmware s'écrit dans la partition inactive ; on ne bascule qu'après vérification d'intégrité. En cas d'échec, l'ancienne version redémarre.",
          "Sécurité : signer les firmwares et vérifier la signature avant installation — une mise à jour non authentifiée est une porte d'entrée.",
          "Prévoir le rollback : si le nouveau firmware ne démarre pas correctement, revenir automatiquement à l'ancien.",
          "Tester la coupure de courant pendant la mise à jour : c'est le scénario qui « bricke » les appareils mal conçus.",
        ],
      },
    ],
  },
  {
    id: "securite-embarque",
    title: "Sécurité des systèmes embarqués",
    level: 3,
    intro: "Un objet connecté est un ordinateur exposé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Désactiver les interfaces de debug (JTAG/SWD) en production ou les protéger : une sonde donne un accès total à la mémoire.",
          "Chiffrer les communications et authentifier les deux côtés ; ne jamais transmettre de secrets en clair.",
          "Stocker les clés dans des zones protégées, jamais en clair dans le code source versionné.",
          "Démarrage sécurisé (secure boot) : vérifier la signature du firmware à chaque démarrage.",
          "Mettre à jour : un objet non maintenu devient une vulnérabilité permanente. Prévoir l'OTA dès la conception.",
          "Principe du moindre privilège : chaque tâche et chaque interface n'accède qu'au strict nécessaire.",
        ],
      },
    ],
  },
  {
    id: "gestion-memoire-avancee",
    title: "Gestion mémoire avancée",
    level: 3,
    intro: "Quand chaque octet compte vraiment.",
    blocks: [
      {
        kind: "list",
        items: [
          "Placer les constantes en flash (pas en RAM) : sur les petites cibles, la RAM est la ressource la plus rare.",
          "Dimensionner les piles des tâches/threads avec une marge, puis mesurer le pic d'utilisation (les RTOS offrent des fonctions de mesure).",
          "Éviter la fragmentation : pas d'allocations/libérations répétées de tailles variables ; préférer des pools de blocs fixes.",
          "Les structures de données « bitfield » et les types de taille minimale (`uint8_t`, `int16_t`) réduisent l'empreinte.",
          "Lire le fichier `.map` généré par l'éditeur de liens : il montre exactement qui consomme la flash et la RAM.",
        ],
      },
    ],
  },
  {
    id: "linker-scripts",
    title: "Scripts d'édition de liens",
    level: 3,
    intro: "Dire au compilateur où placer chaque chose en mémoire.",
    blocks: [
      {
        kind: "text",
        text: "Le script de link (linker script) décrit la carte mémoire de la cible : où commence la flash, où est la RAM, où placer le vecteur d'interruptions, la pile, les sections du programme. En bare metal, il est spécifique à chaque microcontrôleur.",
      },
      {
        kind: "list",
        items: [
          "En pratique, on part du script fourni pour la cible (framework ou fabricant) et on l'adapte : rarement écrit de zéro.",
          "À personnaliser pour : réserver une zone au bootloader, placer des données en RAM spécifique, gérer une mémoire externe.",
          "Une erreur de linker script = firmware qui ne démarre pas ou plante mystérieusement : vérifier les adresses dans la datasheet.",
        ],
      },
    ],
  },
  {
    id: "debug-jtag",
    title: "Débogage JTAG/SWD",
    level: 3,
    intro: "Quand le printf ne suffit plus : le débogage matériel.",
    blocks: [
      {
        kind: "command",
        label: "Lancer OpenOCD avec une sonde ST-Link",
        command: "openocd -f interface/stlink.cfg -f target/stm32f4x.cfg",
        why: "Démarre le serveur de débogage : il pilote la sonde et expose la cible à GDB. Les fichiers de configuration dépendent de la sonde et du microcontrôleur — adapter à son matériel.",
      },
      {
        kind: "list",
        items: [
          "Ce que permet le debug matériel : points d'arrêt, pas à pas, inspection des registres et de la mémoire, arrêt sur faute (hard fault).",
          "Le `hard fault` (plantage processeur) devient diagnostiquable : la pile d'appel et les registres indiquent l'instruction fautive.",
          "En face d'un plantage aléatoire, le premier suspect est la pile (débordement) ou un pointeur invalide.",
          "Combiner les deux mondes : console série pour le flux, débogueur matériel pour les plantages.",
        ],
      },
    ],
  },
  {
    id: "instruments",
    title: "Oscilloscope et analyseur logique",
    level: 3,
    intro: "Voir les signaux réels, pas ceux qu'on imagine.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Oscilloscope", "Analyseur logique"],
        rows: [
          ["Montre", "La forme analogique des signaux (tension en fonction du temps)", "Les niveaux logiques de plusieurs signaux simultanés"],
          ["Usage", "Vérifier alimentations, PWM, bruit, intégrité des signaux", "Déboguer UART, SPI, I2C (avec décodage protocolaire)"],
          ["À vérifier", "Niveaux, temps de montée, rebonds, bruit", "Chronologie, adresses, données échangées"],
        ],
      },
      {
        kind: "text",
        text: "Un firmware qui « devrait marcher » mais ne marche pas a presque toujours un problème de signal : une horloge absente, un niveau logique marginal, un bus qui ne répond pas. Les instruments transforment les hypothèses en constats.",
      },
    ],
  },
  {
    id: "testing-firmware",
    title: "Tester un firmware",
    level: 3,
    intro: "Le test embarqué : unitaire sur PC, intégration sur cible.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Séparer la logique du hardware",
            detail: "Écrire le code métier (algorithmes, protocole, contrôle) indépendant des registres : il devient testable sur PC.",
          },
          {
            title: "Tests unitaires sur PC",
            detail: "Compiler la logique pour l'hôte et la tester avec un framework de test C/C++. Les bugs d'algorithme se trouvent bien plus vite sur PC que sur cible.",
          },
          {
            title: "Tests d'intégration sur cible",
            detail: "Valider les drivers (GPIO, bus, timers) sur le vrai matériel, avec les instruments pour observer.",
          },
          {
            title: "Tests de robustesse",
            detail: "Coupures d'alimentation, valeurs capteurs aberrantes, bus débranché : le firmware doit se mettre en sécurité, pas planter.",
          },
          {
            title: "Tests d'endurance",
            detail: "Laisser tourner des jours : fuites mémoire, débordements de compteurs, dérives. L'embarqué vit longtemps sans redémarrage.",
          },
        ],
      },
    ],
  },
  {
    id: "integration-continue",
    title: "Intégration continue pour firmware",
    level: 3,
    intro: "Compiler et tester à chaque commit, même pour du hardware.",
    blocks: [
      {
        kind: "list",
        items: [
          "Compiler pour toutes les cibles supportées à chaque commit : attrape les erreurs de portabilité immédiatement.",
          "Exécuter les tests unitaires (sur PC) dans la CI : rapide, fiable, sans matériel.",
          "Vérifier les tailles (flash/RAM) à chaque build : détecter le dépassement avant qu'il ne bloque.",
          "Analyse statique : les analyseurs détectent des bugs (dépassements, variables non initialisées) que les tests manquent.",
          "Pour les tests sur cible réelle, des bancs de test automatisés (hardware-in-the-loop) existent — un investissement qui se justifie en production.",
        ],
      },
    ],
  },
  {
    id: "capteurs-pratiques",
    title: "Capteurs en pratique",
    level: 3,
    intro: "Choisir, câbler, calibrer : le trio gagnant.",
    blocks: [
      {
        kind: "table",
        headers: ["Capteur", "Interface typique", "Point d'attention"],
        rows: [
          ["Température", "Analogique, I2C ou 1-Wire", "Temps de réponse, placement, calibration"],
          ["IMU (accéléro + gyro)", "I2C ou SPI", "Fusion des deux capteurs, dérive du gyroscope"],
          ["Distance (ultrasons)", "GPIO (trigger/echo)", "Cône de détection, surfaces molles"],
          ["Humidité / pression", "I2C", "Lenteur, hysteresis"],
          ["Courant", "Analogique (shunt + ampli)", "Isolation si haute tension"],
        ],
      },
      {
        kind: "text",
        text: "Chaîne complète : choisir selon la grandeur et la précision → lire la datasheet → câbler proprement → lire la valeur brute → convertir → calibrer contre une référence → filtrer. Sauter la calibration, c'est mesurer avec un instrument menteur.",
      },
    ],
  },
  {
    id: "projets",
    title: "Projets",
    level: 3,
    intro: "Du firmware simple à l'objet connecté complet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Station météo",
            detail: "Capteurs de température/humidité, affichage série, mesures périodiques avec mise en veille entre les mesures : le projet complet du niveau 2.",
          },
          {
            title: "Objet connecté",
            detail: "Ajouter le Wi-Fi : publier les mesures via MQTT vers un broker, les visualiser sur un tableau de bord. Premier système embarqué + réseau.",
          },
          {
            title: "Contrôle moteur asservi",
            detail: "Moteur + codeur + PID à période fixe (timer) : la rencontre de l'embarqué et de l'asservissement.",
          },
          {
            title: "Multitâche temps réel",
            detail: "Porter le projet sous FreeRTOS : tâches capteur, contrôle et communication qui coopèrent via files et sémaphores.",
          },
          {
            title: "Produit robuste",
            detail: "Watchdog, OTA avec double partition, boîtier, tests d'endurance : passer du prototype à l'objet qui tourne seul pendant des mois.",
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
            label: "Documentation ESP-IDF (Espressif)",
            value: "La documentation officielle du framework ESP32 : guides, références d'API, exemples. Un modèle de documentation embarquée.",
          },
          {
            label: "Wikipedia — Système embarqué",
            value: "Vue d'ensemble encyclopédique : définitions, historique, domaines d'application.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Manuels de référence des fabricants : la source de vérité pour chaque microcontrôleur (registres, horloges, périphériques).",
          "Datasheets des composants : tensions, timings, protocoles — toujours vérifiées avant de câbler.",
          "Communautés : forums des frameworks et des fabricants pour les problèmes concrets.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'embarqué maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir le hardware : `electronics` (concevoir les circuits que le firmware pilote), `sensors` (maîtriser la chaîne de mesure).",
          "Contrôler : `control-systems` (les boucles PID qui tournent sur le microcontrôleur).",
          "Construire des robots : `robotics` et `ros` (le firmware devient une brique du système robotique).",
          "Monter en abstraction : `cpp` (le langage, en profondeur), `linux` (quand la cible devient un système complet).",
          "Revenir à la roadmap : valider Systèmes embarqués et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des capteurs : du phénomène physique à la donnée fiable.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_SENSORS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est un capteur et pourquoi c'est le point de départ de tout système embarqué.",
    blocks: [
      {
        kind: "text",
        text: "Les capteurs sont les sens des machines : ils convertissent le monde physique (distance, température, mouvement, image) en signaux numériques exploitables par le logiciel. Sans eux, un robot est aveugle, un objet connecté est sourd, un système de contrôle n'a rien à contrôler.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est un savoir-faire à part entière : un capteur ne donne jamais « la vérité » — il donne une mesure bruitée, biaisée, échantillonnée, avec une latence. Aucun robot ni objet connecté ne fonctionne sans capteurs : les choisir, les calibrer et filtrer leur bruit est au cœur de tout projet embarqué ou robotique.",
      },
      {
        kind: "text",
        text: "La compétence se résume en trois verbes : choisir (le bon capteur pour la bonne grandeur), calibrer (corriger ses biais) et filtrer (extraire le signal du bruit). Le reste est de la mise en œuvre.",
      },
    ],
  },
  {
    id: "chaine-de-mesure",
    title: "La chaîne de mesure",
    level: 1,
    intro:
      "Du phénomène physique à la donnée : les sept maillons, dans l'ordre.",
    blocks: [
      {
        kind: "diagram",
        title: "Du monde réel au logiciel",
        lines: [
          "PHÉNOMÈNE physique (température, distance…)",
          "     │",
          "     ▼",
          "CAPTEUR (convertit en signal électrique)",
          "     │",
          "     ▼",
          "CONDITIONNEMENT (amplifie, filtre le signal analogique)",
          "     │",
          "     ▼",
          "ADC (convertit en nombre : résolution, échantillonnage)",
          "     │",
          "     ▼",
          "TRANSMISSION (I2C, SPI, UART vers le microcontrôleur)",
          "     │",
          "     ▼",
          "CALIBRATION (corrige offset et gain)",
          "     │",
          "     ▼",
          "FILTRAGE (réduit le bruit)",
          "     │",
          "     ▼",
          "DONNÉE exploitable par le logiciel",
        ],
      },
      {
        kind: "text",
        text: "Chaque maillon dégrade potentiellement la mesure : un mauvais conditionnement noie le signal, un ADC sous-dimensionné le quantifie grossièrement, une calibration absente le biaise durablement. Comprendre la chaîne, c'est savoir où chercher quand la donnée est mauvaise.",
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
      "Les bases pour brancher un capteur sans le griller ni se perdre.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Électronique (`electronics`)",
            value:
              "Tension, courant, résistance, alimentations 3,3 V vs 5 V : brancher un capteur commence par ne pas l'alimenter en 5 V quand il attend du 3,3 V.",
          },
          {
            label: "Programmation embarquée",
            value:
              "Lire une entrée, écrire une sortie, notions de boucle d'échantillonnage — sur Arduino, ESP32 ou équivalent.",
          },
          {
            label: "Unités et ordres de grandeur",
            value:
              "Savoir ce que représentent un degré, un mètre, un g : pour juger si une mesure est plausible ou aberrante.",
          },
          {
            label: "Lecture de documentation",
            value:
              "Les datasheets sont la source de vérité : plages, précisions, protocoles — tout y est, encore faut-il savoir les lire.",
          },
        ],
      },
    ],
  },
  {
    id: "familles-capteurs",
    title: "Les grandes familles de capteurs",
    level: 2,
    intro:
      "Le panorama : ce qui existe pour mesurer quoi.",
    blocks: [
      {
        kind: "table",
        headers: ["Grandeur", "Capteurs typiques", "Exemple d'usage"],
        rows: [
          ["Température", "Thermistance, sonde numérique (BME280)", "Station météo, thermostat"],
          ["Distance", "Ultrasons (HC-SR04), infrarouge, LiDAR, temps de vol", "Évitement d'obstacles, télémétrie"],
          ["Mouvement / orientation", "IMU (accéléromètre + gyroscope), magnétomètre", "Stabilisation de drone, boussole"],
          ["Pression / force", "Capteur barométrique, jauge de contrainte, FSR", "Altimètre, balance"],
          ["Image", "Caméra (OV2640…), caméra de profondeur", "Vision robotique, surveillance"],
          ["Environnement", "Humidité, qualité de l'air, luminosité", "Serre connectée, monitoring"],
        ],
      },
      {
        kind: "text",
        text: "Deux questions guident le choix : quelle grandeur faut-il vraiment mesurer (pas son proxy) ? Et avec quelle précision, sur quelle plage, à quelle fréquence ? Un capteur parfait pour la mauvaise grandeur est un capteur inutile.",
      },
    ],
  },
  {
    id: "choisir-un-capteur",
    title: "Choisir un capteur",
    level: 2,
    intro:
      "Les critères qui départagent deux capteurs en apparence équivalents.",
    blocks: [
      {
        kind: "fields",
        title: "Critères de choix",
        fields: [
          {
            label: "Plage de mesure",
            value:
              "Le capteur doit couvrir les valeurs réelles avec de la marge : un capteur 0–50 °C dans un four à 200 °C est détruit, pas imprécis.",
          },
          {
            label: "Précision et résolution",
            value:
              "Précision = écart à la vraie valeur ; résolution = plus petit incrément détectable. Un capteur précis à ±0,1 °C avec une résolution de 1 °C affiche des marches d'escalier.",
          },
          {
            label: "Fréquence d'échantillonnage",
            value:
              "Le capteur doit échantillonner au moins deux fois plus vite que le phénomène le plus rapide à observer (Nyquist) — avec de la marge en pratique.",
          },
          {
            label: "Interface",
            value:
              "I2C, SPI, UART ou analogique : compatible avec votre microcontrôleur, et avec des bibliothèques existantes pour gagner du temps.",
          },
          {
            label: "Alimentation",
            value:
              "Tension (3,3 V vs 5 V), consommation (critique sur batterie) : un capteur gourmand tue l'autonomie.",
          },
          {
            label: "Environnement",
            value:
              "Température, humidité, poussière, vibrations : un capteur de labo ne survit pas forcément au terrain (indices IP).",
          },
          {
            label: "Coût et disponibilité",
            value:
              "Prix unitaire × quantité, et disponibilité long terme : un capteur parfait mais introuvable dans six mois est un risque projet.",
          },
        ],
      },
    ],
  },
  {
    id: "lire-datasheet",
    title: "Lire une datasheet",
    level: 2,
    intro:
      "La compétence la plus rentable : trouver en cinq minutes ce qui compte.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Caractéristiques électriques",
            detail: "Tension d'alimentation, consommation, niveaux logiques : pour câbler sans détruire. Vérifiez la compatibilité 3,3 V / 5 V avec votre microcontrôleur.",
          },
          {
            title: "Plage et précision",
            detail: "Range, accuracy, resolution : les trois chiffres qui disent si le capteur convient à votre besoin. Notez les conditions de mesure (souvent à 25 °C).",
          },
          {
            title: "Interface et protocole",
            detail: "I2C (adresse), SPI (mode), UART (débit) : comment parler au capteur, et à quelle vitesse.",
          },
          {
            title: "Timing",
            detail: "Temps de conversion, temps de démarrage, fréquence max : pour dimensionner votre boucle d'acquisition.",
          },
          {
            title: "Brochage et schéma type",
            detail: "Le schéma d'application recommandé (condensateurs de découplage, pull-ups) : à reproduire, pas à réinventer.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe : téléchargez toujours la datasheet du fabricant, pas un résumé de blog. Les blogs se trompent sur les détails (adresse I2C, timing) ; la datasheet fait foi.",
      },
    ],
  },
  {
    id: "protocoles",
    title: "Les protocoles : I2C, SPI, UART",
    level: 2,
    intro:
      "Les trois bus qui transportent les mesures vers le microcontrôleur.",
    blocks: [
      {
        kind: "table",
        headers: ["", "I2C", "SPI", "UART"],
        rows: [
          ["Fils", "2 (SDA, SCL)", "4 (MOSI, MISO, SCK, CS par esclave)", "2 (TX, RX)"],
          ["Topologie", "Bus multi-esclaves adressés", "Un CS par esclave", "Point à point"],
          ["Vitesse", "Standard à rapide (100 kHz – 3,4 MHz)", "Très rapide (dizaines de MHz)", "Modérée (débit série)"],
          ["Usage typique", "Capteurs lents (température, pression)", "Capteurs rapides (IMU, écrans)", "GPS, debug, modules radio"],
          ["Piège classique", "Conflit d'adresses identiques", "Oublier le CS", "Croiser TX/RX, débits différents"],
        ],
      },
      {
        kind: "command",
        label: "Scanner le bus I2C (Linux)",
        command: "i2cdetect -y 1",
        why: "Affiche la carte des adresses I2C détectées sur le bus 1 (nécessite le paquet `i2c-tools`). Si votre capteur n'apparaît pas, le problème est matériel (câblage, alimentation, pull-ups) avant d'être logiciel.",
      },
    ],
  },
  {
    id: "premier-montage",
    title: "Premier montage : station de température",
    level: 2,
    intro:
      "Le projet canonique : lire un BME280 et afficher la température.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Câbler en I2C",
            detail: "BME280 : VCC → 3,3 V, GND → GND, SDA → SDA, SCL → SCL. Vérifiez la tension : la plupart des modules BME280 sont en 3,3 V.",
          },
          {
            title: "Vérifier la détection",
            detail: "`i2cdetect -y 1` (sur Raspberry Pi) : le capteur apparaît à son adresse (souvent 0x76 ou 0x77).",
          },
          {
            title: "Lire avec une bibliothèque",
            detail: "Utilisez la bibliothèque du constructeur ou de la communauté pour votre plateforme — elle gère la calibration interne du capteur.",
          },
          {
            title: "Afficher et valider",
            detail: "Affichez les valeurs et comparez avec une référence (thermomètre connu) : un écart constant = offset à calibrer.",
          },
          {
            title: "Stabiliser",
            detail: "Moyennez sur 10 lectures : le bruit instantané disparaît et la valeur devient exploitable.",
          },
        ],
      },
    ],
  },
  {
    id: "adc-bases",
    title: "ADC : les bases",
    level: 2,
    intro:
      "Le convertisseur analogique-numérique : transformer une tension en nombre.",
    blocks: [
      {
        kind: "text",
        text: "Un ADC échantillonne une tension continue et la convertit en entier : un ADC 10 bits sur 0–3,3 V donne 1024 paliers de ~3,2 mV. La résolution (nombre de bits) fixe la finesse, la fréquence d'échantillonnage fixe la rapidité.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Lecture analogique (Arduino)",
        code: "int brut = analogRead(A0);                 // 0..1023 (10 bits)\nfloat tension = brut * (3.3 / 1023.0);     // conversion en volts\nfloat temp = (tension - 0.5) * 100.0;      // selon la courbe du capteur",
      },
      {
        kind: "text",
        text: "Deux règles : la référence de tension de l'ADC doit être stable (une alimentation bruitée = des mesures bruitées), et le signal doit utiliser toute la plage de l'ADC (un signal 0–0,5 V sur un ADC 0–3,3 V gaspille 85 % de la résolution).",
      },
    ],
  },
  {
    id: "bruit-bases",
    title: "Le bruit : premières armes",
    level: 2,
    intro:
      "Pourquoi la mesure saute, et le premier remède.",
    blocks: [
      {
        kind: "text",
        text: "Aucune mesure n'est stable : le bruit électronique, les fluctuations d'alimentation et les perturbations de l'environnement font osciller les lectures autour de la vraie valeur. Le premier remède est la moyenne glissante : moyenner N lectures successives divise le bruit par √N.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Moyenne glissante simple",
        code: "const int N = 10;\nfloat moyenne = 0;\nfor (int i = 0; i < N; i++) {\n  moyenne += analogRead(A0);\n  delay(10);\n}\nmoyenne /= N;  // bruit divisé par ~3",
      },
      {
        kind: "text",
        text: "Compromis : moyenner ralentit la réponse (10 lectures × 10 ms = 100 ms de latence). Le choix de N équilibre stabilité et réactivité selon l'application — un thermostat tolère 1 s, un drone non.",
      },
    ],
  },
  {
    id: "calibration-base",
    title: "Calibration : les bases",
    level: 2,
    intro:
      "Corriger le biais : sans calibration, les mesures dérivent.",
    blocks: [
      {
        kind: "text",
        text: "Deux capteurs identiques ne donnent pas la même valeur : chacun a un offset (décalage constant) et un gain (facteur d'échelle) propres. La calibration compare le capteur à une référence connue et calcule la correction : `valeur_corrigée = (valeur_brute - offset) × gain`.",
      },
      {
        kind: "list",
        items: [
          "Calibration à un point : mesurer une référence (ex. glace fondante ≈ 0 °C), calculer l'offset — corrige le décalage, pas l'échelle.",
          "Calibration à deux points : deux références (ex. 0 °C et 100 °C) — corrige offset ET gain, la méthode standard.",
          "Stocker les coefficients en EEPROM/flash : la calibration survit aux redémarrages.",
          "Recalibrer périodiquement : les capteurs dérivent avec le temps, la température et le vieillissement.",
        ],
      },
    ],
  },
  {
    id: "outils-capteurs",
    title: "Outils et environnement",
    level: 2,
    intro:
      "Le bench minimal pour travailler avec des capteurs.",
    blocks: [
      {
        kind: "fields",
        title: "Équipement",
        fields: [
          {
            label: "Multimètre",
            value:
              "Vérifier alimentations, continuités, tensions de sortie : le premier diagnostic de tout problème matériel.",
          },
          {
            label: "Alimentation stable",
            value:
              "Un banc d'alimentation réglable : les capteurs alimentés par un USB bruité donnent des mesures bruitées.",
          },
          {
            label: "Analyseur logique / oscilloscope",
            value:
              "Voir réellement les signaux I2C/SPI : indispensable quand le protocole ne répond pas.",
          },
          {
            label: "Références de calibration",
            value:
              "Thermomètre étalon, mètre, masses connues : on ne calibre pas contre du vent.",
          },
          {
            label: "Moniteur série",
            value:
              "Afficher les valeurs brutes en temps réel : la boucle de debug la plus rapide.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-bases",
    title: "Debugging : les bases",
    level: 2,
    intro:
      "Le capteur ne répond pas : la check-list dans l'ordre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "L'alimentation",
            detail: "Mesurez la tension aux bornes du capteur au multimètre : bonne valeur, stable, bonne polarité. 80 % des « capteurs morts » sont mal alimentés.",
          },
          {
            title: "Le câblage",
            detail: "Continuité de chaque fil, SDA/SCL non inversés, TX vers RX (croisés) en UART. Un fil mal enfiché explique les pannes intermittentes.",
          },
          {
            title: "La détection",
            detail: "`i2cdetect` pour l'I2C : adresse absente = problème matériel. Adresse présente mais illisible = problème logiciel (registres, timing).",
          },
          {
            title: "Les valeurs brutes",
            detail: "Affichez les registres bruts avant toute conversion : des valeurs à 0, au max, ou figées orientent le diagnostic (court-circuit, saturation, capteur non démarré).",
          },
          {
            title: "La référence",
            detail: "Comparez avec un capteur ou instrument connu : un écart constant = calibration, un écart erratique = bruit ou alimentation.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Trois projets qui montent en exigence métrologique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Station météo connectée",
            detail: "BME280 sur ESP32, envoi MQTT vers un broker, dashboard : la chaîne complète capteur → cloud (voir le guide : exemple de référence).",
          },
          {
            title: "Robot suiveur de ligne",
            detail: "Capteurs infrarouges réflectifs, seuils calibrés, boucle de contrôle : la mesure au service de l'action en temps réel.",
          },
          {
            title: "Centrale inertielle filtrée",
            detail: "IMU 9 axes, filtre complémentaire ou Kalman, affichage de l'orientation : fusion de capteurs et temps réel.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "numerique-vs-analogique",
    title: "Capteurs numériques vs analogiques",
    level: 3,
    intro:
      "Deux philosophies de sortie, deux complexités différentes.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Analogique", "Numérique"],
        rows: [
          ["Sortie", "Tension continue proportionnelle", "Valeur déjà convertie (I2C/SPI)"],
          ["Calibration", "À faire soi-même (courbe du capteur)", "Souvent calibré en usine, coefficients embarqués"],
          ["Bruit", "Sensible (câbles longs = antennes)", "Robuste (numérique dès la source)"],
          ["Flexibilité", "Totale (on choisit l'ADC)", "Limitée aux réglages offerts"],
          ["Exemple", "Thermistance, photorésistance", "BME280, MPU6050"],
        ],
      },
      {
        kind: "text",
        text: "Tendance : les capteurs numériques dominent les nouveaux designs — la conversion au plus près du phénomène minimise le bruit. L'analogique reste pertinent pour les signaux rapides, les coûts minimaux, ou quand on veut contrôler toute la chaîne.",
      },
    ],
  },
  {
    id: "capteurs-temperature",
    title: "Capteurs de température",
    level: 3,
    intro:
      "Quatre technologies, quatre compromis.",
    blocks: [
      {
        kind: "table",
        headers: ["Technologie", "Principe", "Plage typique", "Usage"],
        rows: [
          ["Thermistance (CTN)", "Résistance variant avec T", "-50 à +150 °C", "Bon marché, précis sur plage étroite — nécessite une courbe de conversion"],
          ["Sonde Pt100/RTD", "Résistance platine linéaire", "-200 à +600 °C", "Référence industrielle, stable, plus chère"],
          ["Thermocouple", "Tension de jonction", "-200 à +1300 °C", "Très hautes températures, nécessite compensation de soudure froide"],
          ["Capteur numérique", "ADC + calibration intégrés", "-40 à +125 °C", "Simplicité (BME280, DS18B20) — le choix par défaut des projets"],
        ],
      },
      {
        kind: "text",
        text: "Pour un projet standard, le capteur numérique gagne : pas de courbe à linéariser, pas d'ADC externe, calibration d'usine. Les autres technologies se justifient par la plage (thermocouple), la précision long terme (RTD) ou le coût à grand volume (thermistance).",
      },
    ],
  },
  {
    id: "capteurs-distance",
    title: "Capteurs de distance",
    level: 3,
    intro:
      "Mesurer sans toucher : quatre principes physiques.",
    blocks: [
      {
        kind: "table",
        headers: ["Technologie", "Principe", "Portée typique", "Limites"],
        rows: [
          ["Ultrasons (HC-SR04)", "Temps de vol d'une impulsion sonore", "2 cm – 4 m", "Angle large, sensible aux surfaces molles et au bruit ambiant"],
          ["Infrarouge (triangulation)", "Angle du faisceau réfléchi", "10 – 80 cm", "Dépend de la couleur/réflectivité de la cible"],
          ["Temps de vol laser (ToF)", "Temps de vol de la lumière", "Jusqu'à quelques mètres", "Précis, mais sensible à la lumière ambiante forte"],
          ["LiDAR", "Balayage laser rotatif", "Jusqu'à des dizaines de mètres", "Cher, gourmand, mais cartographie 360°"],
        ],
      },
      {
        kind: "text",
        text: "Choix guidé par l'usage : détection d'obstacle simple → ultrasons ; suivi précis courte distance → ToF ; cartographie robotique → LiDAR. Et toujours valider sur les matériaux réels de l'environnement — un capteur parfait sur mur blanc peut échouer sur rideau noir.",
      },
    ],
  },
  {
    id: "imu",
    title: "IMU : accéléromètre, gyroscope, magnétomètre",
    level: 3,
    intro:
      "Les trois capteurs de la centrale inertielle, et ce que chacun mesure vraiment.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois axes de mesure",
        fields: [
          {
            label: "Accéléromètre",
            value:
              "Mesure l'accélération propre (mouvement + gravité). Au repos, il indique la direction du bas — d'où l'estimation d'inclinaison. Bruité en dynamique : il confond accélération et tilt.",
          },
          {
            label: "Gyroscope",
            value:
              "Mesure la vitesse angulaire (rad/s). Précis à court terme, mais l'intégration pour obtenir l'angle accumule la dérive — inutilisable seul sur la durée.",
          },
          {
            label: "Magnétomètre",
            value:
              "Mesure le champ magnétique : boussole (cap). Perturbé par les masses métalliques et les moteurs — à éloigner des sources.",
          },
        ],
      },
      {
        kind: "text",
        text: "Complémentarité : l'accéléromètre est stable en moyenne mais bruité en instantané, le gyroscope est précis en instantané mais dérive. La fusion (filtre complémentaire, Kalman — voir sections dédiées) combine le meilleur des deux : c'est elle qui produit une orientation fiable.",
      },
    ],
  },
  {
    id: "capteurs-environnementaux",
    title: "Capteurs environnementaux",
    level: 3,
    intro:
      "Température, humidité, pression, qualité de l'air : la station météo complète.",
    blocks: [
      {
        kind: "text",
        text: "Le BME280 (température + humidité + pression, I2C) est le standard des stations amateurs : un seul composant, une seule bibliothèque, trois grandeurs. La pression barométrique donne l'altitude relative (à recalibrer avec la météo) ; l'humidité se mesure en %HR avec une dérive lente à surveiller.",
      },
      {
        kind: "list",
        items: [
          "Qualité de l'air (CO2, COV) : les capteurs type SGP30/MH-Z19 nécessitent une période de chauffe et une calibration à l'air frais — lisez la datasheet sur ce point.",
          "Placement : un capteur de température à côté d'un régulateur chaud mesure le régulateur, pas l'air — isolez thermiquement.",
          "Protection : une membrane (type Gore) protège de l'eau tout en laissant passer l'air pour pression/humidité.",
          "Échantillonnez lentement : ces grandeurs varient en minutes — mesurer à 100 Hz n'apporte que du bruit.",
        ],
      },
    ],
  },
  {
    id: "cameras",
    title: "Caméras",
    level: 3,
    intro:
      "Le capteur le plus riche — et le plus exigeant.",
    blocks: [
      {
        kind: "text",
        text: "Une caméra fournit des millions de mesures par trame : c'est une richesse et un fardeau (bande passante, calcul). Les paramètres qui comptent : résolution (plus = plus de détails, plus de données), fréquence d'images, champ de vision, et sensibilité en basse lumière.",
      },
      {
        kind: "list",
        items: [
          "Calibration géométrique : sans intrinsèques (focale, distorsion), aucune mesure 3D n'est fiable.",
          "Exposition et balance des blancs en automatique : pratiques, mais elles changent l'image entre deux trames — figez-les pour la mesure.",
          "Caméras de profondeur (stéréo, ToF) : donnent directement la distance par pixel — la 3D sans calcul lourd.",
          "Bande passante : une caméra 1080p brute à 30 Hz dépasse vite les capacités d'un bus — compressez ou réduisez en amont.",
        ],
      },
    ],
  },
  {
    id: "capteurs-pression-force",
    title: "Capteurs de pression et de force",
    level: 3,
    intro:
      "Peser, toucher, détecter un appui.",
    blocks: [
      {
        kind: "fields",
        title: "Technologies",
        fields: [
          {
            label: "Jauge de contrainte + HX711",
            value:
              "La balance de précision : la jauge varie avec la déformation, l'amplificateur HX711 (24 bits) la numérise. Nécessite une calibration avec des masses connues.",
          },
          {
            label: "FSR (résistance sensible à la force)",
            value:
              "Simple et bon marché pour détecter un appui (bouton sensible), mais non linéaire et peu répétable — pas un instrument de mesure.",
          },
          {
            label: "Capteur barométrique",
            value:
              "La pression atmosphérique comme altimètre : ~12 Pa par mètre au niveau de la mer — utile en drone, à filtrer fortement.",
          },
          {
            label: "Capteur de pression différentielle",
            value:
              "Vitesse d'air (tube de Pitot), détection de colmatage de filtre : la pression comme proxy d'un phénomène.",
          },
        ],
      },
    ],
  },
  {
    id: "adc-detail",
    title: "ADC en détail : résolution et référence",
    level: 3,
    intro:
      "Dimensionner correctement la conversion : deux paramètres critiques.",
    blocks: [
      {
        kind: "text",
        text: "Résolution : un ADC n bits découpe la plage en 2^n paliers. 10 bits = 1024 paliers : sur 3,3 V, chaque palier vaut 3,2 mV — tout signal plus fin est invisible. 12 bits (4096 paliers) divisent le pas par 4. Mais la résolution effective est toujours inférieure à la résolution nominale à cause du bruit : un ADC 12 bits bruité peut n'offrir que 10 bits utiles.",
      },
      {
        kind: "text",
        text: "Référence de tension : l'ADC mesure relativement à une référence. Si la référence est l'alimentation (bruitée, qui chute sous charge), toutes les mesures bougent avec elle. Les ADC sérieux offrent une référence interne stable — utilisez-la, et découplez l'alimentation analogique.",
      },
    ],
  },
  {
    id: "nyquist",
    title: "Échantillonnage et Nyquist",
    level: 3,
    intro:
      "Le théorème qui dit à quelle vitesse échantillonner — et ce qui se passe sinon.",
    blocks: [
      {
        kind: "text",
        text: "Théorème de Nyquist-Shannon : pour capturer un signal de fréquence f, il faut échantillonner à plus de 2f. En dessous, le repliement spectral (aliasing) crée des fréquences fantômes : un signal à 60 Hz échantillonné à 100 Hz apparaît comme un signal à 40 Hz — une mesure fausse qui a l'air vraie.",
      },
      {
        kind: "list",
        items: [
          "En pratique : échantillonnez 5 à 10 fois plus vite que le phénomène utile — la marge absorbe les imperfections.",
          "Filtre anti-repliement : un filtre passe-bas analogique avant l'ADC élimine les hautes fréquences que l'échantillonnage ne peut pas représenter.",
          "Sur-échantillonner puis moyenner : échantillonner vite et moyenner donne à la fois le respect de Nyquist et la réduction du bruit.",
        ],
      },
    ],
  },
  {
    id: "bruit-types",
    title: "Types de bruit",
    level: 3,
    intro:
      "Nommer le bruit pour le combattre efficacement.",
    blocks: [
      {
        kind: "table",
        headers: ["Bruit", "Signature", "Remède"],
        rows: [
          ["Bruit blanc (thermique)", "Fluctuations aléatoires autour de la moyenne", "Moyennage, filtre passe-bas"],
          ["Bruit 50/60 Hz (secteur)", "Oscillation à la fréquence du réseau", "Échantillonner en multiple de la période secteur, ou filtrer coupe-bande"],
          ["Dérive lente", "La moyenne glisse avec le temps/température", "Recalibration périodique, compensation en température"],
          ["Spikes (impulsions)", "Pics isolés aberrants", "Filtre médian — la moyenne est vulnérable aux spikes"],
          ["Quantification", "Marches d'escalier (ADC)", "Plus de bits, ou sur-échantillonnage"],
          ["Diaphonie", "Un canal pollue l'autre", "Séparation des masses, blindage, séquencement des conversions"],
        ],
      },
    ],
  },
  {
    id: "filtrage",
    title: "Filtrage numérique",
    level: 3,
    intro:
      "Quatre filtres, quatre usages — du plus simple au plus puissant.",
    blocks: [
      {
        kind: "table",
        headers: ["Filtre", "Principe", "Usage"],
        rows: [
          ["Moyenne mobile", "Moyenne des N dernières valeurs", "Lissage simple — introduit un retard de N/2 échantillons"],
          ["Médian", "Valeur médiane des N dernières", "Élimine les spikes sans les étaler (la moyenne les étale)"],
          ["Complémentaire", "Combine passe-bas et passe-haut (ex. accéléromètre + gyro)", "Orientation IMU — simple et efficace"],
          ["Kalman", "Fusion optimale avec modèle du système", "La référence quand on a un modèle : GPS + IMU, suivi"],
          ["Exponentiel (EMA)", "`y = α·x + (1-α)·y` — un seul état à mémoriser", "Lissage temps réel économe en mémoire"],
        ],
      },
      {
        kind: "code",
        language: "cpp",
        title: "Moyenne exponentielle (une ligne)",
        code: "float y = 0, alpha = 0.2;\n// à chaque échantillon x :\ny = alpha * x + (1 - alpha) * y;",
      },
      {
        kind: "text",
        text: "Règle de choix : moyenne mobile ou EMA pour lisser, médian contre les spikes, complémentaire pour l'IMU, Kalman quand on fusionne des sources avec un modèle. Un filtre a toujours un coût (retard, calcul) : ne filtrez que ce qui en a besoin.",
      },
    ],
  },
  {
    id: "fusion-capteurs",
    title: "Fusion de capteurs",
    level: 3,
    intro:
      "Combiner plusieurs capteurs pour une estimation meilleure qu'aucun seul.",
    blocks: [
      {
        kind: "text",
        text: "Principe : chaque capteur a des forces complémentaires — le GPS est absolu mais lent et bruité, l'IMU est rapide mais dérive. La fusion (Kalman et variantes) pondère chaque source selon sa confiance instantanée : on obtient une estimation plus précise, plus rapide et plus robuste qu'avec un seul capteur.",
      },
      {
        kind: "list",
        items: [
          "Redondance : deux capteurs identiques détectent la panne de l'un (vote, écart anormal).",
          "Complémentarité : accéléromètre (basses fréquences) + gyroscope (hautes fréquences) via filtre complémentaire.",
          "Synchronisation : fusionner exige des timestamps cohérents — des mesures décalées produisent des estimations fantômes.",
          "Le filtre de Kalman exige un modèle du système : un mauvais modèle donne de mauvaises fusions — la simplicité (complémentaire) bat parfois la sophistication.",
        ],
      },
    ],
  },
  {
    id: "calibration-avancee",
    title: "Calibration avancée",
    level: 3,
    intro:
      "Au-delà de l'offset : multipoint, température, et traçabilité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Calibration multipoint : mesurer 5+ références sur toute la plage et interpoler (polynôme, table) — corrige les non-linéarités, pas seulement offset/gain.",
          "Compensation en température : la plupart des capteurs dérivent avec T — caractériser la dérive et la compenser en logiciel avec un capteur de température co-localisé.",
          "Traçabilité : calibrer contre des références elles-mêmes étalonnées, et documenter la chaîne — exigé dans l'industriel et le médical.",
          "Auto-calibration : certains systèmes se recalibrent en fonctionnement (zéro du gyroscope à l'arrêt) — pratique, mais à surveiller (un « zéro » pris en mouvement est faux).",
          "Stocker versionné : coefficients + date + conditions dans une mémoire non volatile, avec un identifiant de calibration.",
        ],
      },
    ],
  },
  {
    id: "derive-stabilite",
    title: "Dérive et stabilité long terme",
    level: 3,
    intro:
      "Ce qui change avec le temps : le vieillissement des capteurs.",
    blocks: [
      {
        kind: "text",
        text: "Les capteurs dérivent : offset qui glisse avec les cycles thermiques, sensibilité qui s'use, chimiques qui s'épuisent (capteurs de gaz). La datasheet donne parfois la dérive (ex. ±0,5 %/an) — intégrez-la au budget d'erreur du système.",
      },
      {
        kind: "text",
        text: "Parades : recalibration planifiée (maintenance), références embarquées (une résistance de précision pour auto-tester un ADC), architectures différentielles (mesurer un écart plutôt qu'une valeur absolue annule les dérives communes), et choix de technologies stables (RTD platine) quand la stabilité prime sur le coût.",
      },
    ],
  },
  {
    id: "alimentation-bruit",
    title: "Alimentation et bruit électrique",
    level: 3,
    intro:
      "La cause n°1 des mesures bruitées n'est pas le capteur : c'est son alimentation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Découplage : un condensateur céramique 100 nF au plus près de chaque circuit intégré — absorbe les transitoires haute fréquence.",
          "Séparer analogique et numérique : les pics de courant du microcontrôleur (Wi-Fi, moteurs) polluent la masse analogique — masses en étoile, pas en daisy-chain.",
          "Régulateurs linéaires (LDO) pour l'analogique : moins de bruit qu'un découpage, au prix du rendement.",
          "Câbles : paires torsadées pour les signaux analogiques longs, blindage en environnement bruité (moteurs, variateurs).",
          "Mesurez le bruit d'alimentation à l'oscilloscope : un rail à 200 mV de bruit explique des mesures instables mieux que n'importe quel filtre logiciel.",
        ],
      },
    ],
  },
  {
    id: "i2c-detail",
    title: "I2C en détail",
    level: 3,
    intro:
      "Maîtriser le bus le plus courant des capteurs.",
    blocks: [
      {
        kind: "text",
        text: "I2C : deux fils (SDA données, SCL horloge), chaque esclave a une adresse 7 bits, le maître génère l'horloge. Les lignes sont en collecteur ouvert : des résistances de pull-up (typiquement 4,7 kΩ) les maintiennent au niveau haut — sans elles, rien ne fonctionne.",
      },
      {
        kind: "list",
        items: [
          "Conflits d'adresses : deux capteurs identiques sur le même bus = conflit. Solutions : broche d'adressage (souvent 2 adresses possibles), multiplexeur I2C, ou bus séparés.",
          "Longueur de bus limitée (~1 m en pratique) et capacité : au-delà, passer en différentiel ou changer de bus.",
          "Clock stretching : un esclave lent peut retenir l'horloge — certains maîtres logiciels le gèrent mal.",
          "Vitesses : 100 kHz standard, 400 kHz fast, 1–3,4 MHz pour les rapides — tous les esclaves du bus doivent supporter la vitesse choisie.",
        ],
      },
    ],
  },
  {
    id: "spi-detail",
    title: "SPI en détail",
    level: 3,
    intro:
      "Le bus rapide : duplex intégral, un chip-select par esclave.",
    blocks: [
      {
        kind: "text",
        text: "SPI : le maître génère l'horloge (SCK), envoie sur MOSI et reçoit sur MISO simultanément (duplex intégral), et sélectionne chaque esclave par sa ligne CS dédiée. Pas d'adressage, pas d'arbitrage : simple et très rapide (dizaines de MHz).",
      },
      {
        kind: "list",
        items: [
          "Modes (0–3) : polarité et phase d'horloge — maître et esclave doivent parler le même mode (dans la datasheet).",
          "Un CS par esclave : 5 capteurs = 5 broches CS — le coût en broches limite le nombre d'esclaves.",
          "Pas de standard multi-maître ni d'acquittement : le maître doit savoir ce qu'il fait (délais, protocole du capteur).",
          "Idéal pour : IMU rapides, écrans, ADC externes, flux de données continus.",
        ],
      },
    ],
  },
  {
    id: "uart-1wire",
    title: "UART et 1-Wire",
    level: 3,
    intro:
      "Deux liaisons série pour des besoins spécifiques.",
    blocks: [
      {
        kind: "fields",
        title: "Comparaison",
        fields: [
          {
            label: "UART",
            value:
              "Liaison série asynchrone point à point (TX→RX croisés) : GPS, modules radio, debug console. Paramètres à accorder des deux côtés : débit (baud), bits, parité, stop bits. Simple, mais un seul interlocuteur par port.",
          },
          {
            label: "1-Wire",
            value:
              "Un seul fil pour données + alimentation parasite : le DS18B20 (température) en est l'emblème. Chaque composant a un ID unique 64 bits — on peut en chaîner des dizaines sur un fil. Lent, mais câblage minimal.",
          },
        ],
      },
    ],
  },
  {
    id: "polling-vs-interruptions",
    title: "Polling vs interruptions",
    level: 3,
    intro:
      "Deux façons de savoir qu'une mesure est prête.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Polling", "Interruptions"],
        rows: [
          ["Principe", "Interroger le capteur en boucle", "Le capteur signale (broche DRDY/INT) quand c'est prêt"],
          ["Latence", "Jusqu'à la période de polling", "Minimale"],
          ["CPU", "Gaspillé en attentes", "Libre entre les mesures"],
          ["Complexité", "Minimale", "ISR, concurrence, variables volatiles"],
          ["Usage", "Mesures lentes, prototypes", "Temps réel, basse consommation (réveil sur interruption)"],
        ],
      },
      {
        kind: "text",
        text: "En basse consommation, l'interruption est reine : le microcontrôleur dort en deep sleep et ne se réveille que sur mesure prête. En polling, gardez des périodes régulières (timer matériel) plutôt que des `delay()` — la régularité d'échantillonnage conditionne la qualité du filtrage.",
      },
    ],
  },
  {
    id: "mqtt-capteurs",
    title: "MQTT : publier les mesures",
    level: 3,
    intro:
      "Du capteur au cloud : le protocole standard de l'IoT.",
    blocks: [
      {
        kind: "text",
        text: "MQTT : un broker central reçoit les publications des capteurs sur des topics hiérarchiques (`maison/salon/temperature`) et les redistribue aux abonnés. Léger, découplé, avec trois niveaux de qualité de service (0 : au mieux, 1 : au moins une fois, 2 : exactement une fois).",
      },
      {
        kind: "command",
        label: "Publier une mesure (test)",
        command: "mosquitto_pub -h localhost -t \"maison/salon/temperature\" -m \"21.4\"",
        why: "Publie 21,4 °C sur le topic. `mosquitto_pub/sub` (paquet `mosquitto-clients`) permettent de tester le broker et les topics sans écrire de firmware.",
        verify: "mosquitto_sub -h localhost -t \"maison/#\"",
      },
      {
        kind: "text",
        text: "Conventions : topics hiérarchiques en minuscules, payloads JSON avec timestamp (`{\"t\":21.4,\"ts\":1727592000}`), retained pour la dernière valeur connue, et QoS 1 minimum pour les mesures qui comptent.",
      },
    ],
  },
  {
    id: "consommation-energie",
    title: "Consommation et autonomie",
    level: 3,
    intro:
      "Un capteur sur batterie : chaque microampère compte.",
    blocks: [
      {
        kind: "list",
        items: [
          "Budget énergétique : listez chaque composant (actif, sleep) × temps d'activité — la feuille de calcul qui prédit l'autonomie avant de souder.",
          "Duty cycling : mesure 1 s toutes les 10 min + deep sleep entre = des mois sur batterie. Le capteur ne doit être alimenté que pendant la mesure (MOSFET ou broche d'alimentation).",
          "Choisissez des capteurs avec mode sleep réel (quelques µA) — certains « dorment » à des centaines de µA.",
          "La radio (Wi-Fi) consomme 10 à 100 fois plus que le capteur : regroupez les envois, préférez les protocoles sobres.",
          "Mesurez la consommation réelle (µCurrent, shunt) : les datasheets donnent des typiques optimistes.",
        ],
      },
    ],
  },
  {
    id: "boitiers-ip",
    title: "Boîtiers et indices de protection",
    level: 3,
    intro:
      "Le capteur doit survivre à son environnement.",
    blocks: [
      {
        kind: "text",
        text: "L'indice IP (ex. IP65) : premier chiffre = poussière (6 = étanche aux poussières), second = eau (5 = jets, 7 = immersion temporaire). Un capteur IP65 survit à la pluie, pas à l'immersion.",
      },
      {
        kind: "list",
        items: [
          "Un boîtier étanche fausse les mesures environnementales : prévoyez une prise d'air (membrane) pour pression/humidité.",
          "Le soleil chauffe les boîtiers : un capteur de température en plein soleil mesure le boîtier — abri ventilé (type Stevenson) en extérieur.",
          "Vibrations : fixations anti-vibrations pour les IMU, connecteurs verrouillables en mobile.",
          "Corrosion : en milieu marin ou industriel, conformal coating sur l'électronique et connecteurs étanches.",
        ],
      },
    ],
  },
  {
    id: "validation-etalonnage",
    title: "Validation et étalonnage",
    level: 3,
    intro:
      "Prouver que la mesure est juste : méthode et traçabilité.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir la référence",
            detail: "Un instrument de classe supérieure (thermomètre étalon, calibre) : la référence doit être au moins 4 fois plus précise que la tolérance visée.",
          },
          {
            title: "Stabiliser les conditions",
            detail: "Température ambiante stable, capteur et référence au même point : comparer un capteur chaud à une référence froide ne valide rien.",
          },
          {
            title: "Balayer la plage",
            detail: "Mesurer en au moins 5 points répartis sur la plage d'utilisation, en montant et en descendant (hystérésis).",
          },
          {
            title: "Quantifier",
            detail: "Biais moyen, écart-type, erreur max : les trois chiffres qui caractérisent la qualité réelle, à consigner.",
          },
          {
            title: "Documenter",
            detail: "Procès-verbal : date, conditions, référence utilisée, résultats, coefficients appliqués. Sans ça, la validation n'existe pas.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand la check-list de base ne suffit pas.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "Analyseur logique",
            value:
              "Capturez la transaction I2C/SPI réelle : adresse, registres, ACK/NACK. Un NACK sur l'adresse = l'esclave ne répond pas ; un NACK sur la donnée = registre inexistant.",
          },
          {
            label: "Oscilloscope",
            value:
              "Vérifiez les niveaux (3,3 V réels ?), les temps de montée (pull-ups trop faibles = fronts mous), et le bruit d'alimentation.",
          },
          {
            label: "Registres bruts",
            value:
              "Lisez les registres d'état et d'ID du capteur : un ID inattendu = mauvais composant ou mauvaise adresse ; un flag d'erreur = diagnostic direct.",
          },
          {
            label: "Isolation",
            value:
              "Un seul capteur sur le bus, alimentation externe : éliminez les interactions (conflit d'adresse, alimentation partagée) avant d'accuser le capteur.",
          },
          {
            label: "Journal de mesures",
            value:
              "Enregistrez les valeurs brutes horodatées sur la durée : dérives, corrélations avec la température et pannes intermittentes s'y révèlent.",
          },
        ],
      },
    ],
  },
  {
    id: "horodatage-synchronisation",
    title: "Horodatage et synchronisation",
    level: 3,
    intro:
      "Une mesure sans date est une donnée orpheline : le temps comme première métadonnée.",
    blocks: [
      {
        kind: "text",
        text: "Chaque mesure doit être horodatée au plus près de l'acquisition : un timestamp pris après 200 ms de traitement réseau ne représente plus l'instant de la mesure. Sur les systèmes multi-capteurs, des horloges synchronisées (NTP, PTP, ou temps GPS) sont indispensables pour fusionner des sources.",
      },
      {
        kind: "list",
        items: [
          "Horodatez à la source quand c'est possible (le microcontrôleur qui échantillonne), pas à la réception.",
          "Monotonicité : utilisez une horloge monotone pour les intervalles (pas l'heure système, qui peut reculer).",
          "Enregistrez la fréquence réelle d'échantillonnage avec les données : un capteur annoncé à 100 Hz qui tourne à 87 Hz fausse tous les calculs temporels.",
          "Fusion multi-capteurs : interpolez sur les timestamps plutôt que d'aligner les indices — les fréquences diffèrent toujours.",
        ],
      },
    ],
  },
  {
    id: "redondance-securite",
    title: "Redondance et sécurité",
    level: 3,
    intro:
      "Quand une mesure erronée peut blesser : concevoir pour la panne.",
    blocks: [
      {
        kind: "text",
        text: "Un capteur qui pilote une action critique (freinage, dosage, coupure) ne doit jamais être un point unique de défaillance. La redondance (deux capteurs indépendants, technologies différentes si possible) permet le vote et la détection de panne : un écart anormal entre les deux signale un capteur défaillant, pas une mesure à moyenner.",
      },
      {
        kind: "list",
        items: [
          "Diversité : deux technologies différentes (ex. ultrasons + infrarouge) ne partagent pas les mêmes modes de panne.",
          "Plausibilité en continu : toute mesure hors plage physique = capteur suspect, pas donnée à utiliser.",
          "État sûr : définissez le comportement en cas de perte capteur (arrêt, repli, dernière valeur valide avec timeout) — avant l'incident, pas pendant.",
          "Surveillance : comptez les timeouts, les valeurs aberrantes, les dérives — un capteur qui se dégrade prévient avant de lâcher.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Le bestiaire des projets capteurs.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Alimenter en 5 V un capteur 3,3 V",
            value:
              "Problème : destruction immédiate ou dérive. Solution : lire la datasheet, vérifier au multimètre, utiliser un level shifter si mixte.",
          },
          {
            label: "Ne jamais calibrer",
            value:
              "Problème : biais constant pris pour une mesure. Solution : calibration à deux points contre référence, coefficients stockés.",
          },
          {
            label: "Confondre précision et résolution",
            value:
              "Problème : afficher 4 décimales d'un capteur précis à ±2 %. Solution : ne pas afficher plus de chiffres significatifs que la précision réelle.",
          },
          {
            label: "Échantillonner trop lentement (ou trop vite)",
            value:
              "Problème : aliasing, ou CPU saturé pour rien. Solution : Nyquist + marge, filtre anti-repliement.",
          },
          {
            label: "Moyenner sans réfléchir",
            value:
              "Problème : moyenne sur des spikes = valeur fausse mais « stable ». Solution : médian contre les spikes, moyenne contre le bruit blanc.",
          },
          {
            label: "Oublier la température",
            value:
              "Problème : le capteur dérive avec T et personne ne le sait. Solution : caractériser la dérive, compenser, ou choisir une technologie stable.",
          },
          {
            label: "Tester uniquement sur bureau",
            value:
              "Problème : le capteur parfait au labo échoue sous la pluie, au soleil ou en vibration. Solution : tests en conditions réelles dès que possible.",
          },
          {
            label: "Faire confiance à une seule mesure",
            value:
              "Problème : décider sur un échantillon bruité. Solution : redondance, filtrage, plausibilité (une température qui saute de 20 °C en 1 s est un bug).",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Des repères de contexte, pas des règles absolues.",
    blocks: [
      {
        kind: "list",
        items: [
          "Datasheet d'abord : la source de vérité, pas les tutoriels.",
          "Choisir selon le besoin réel : plage, précision, fréquence, environnement — pas selon la popularité.",
          "Calibrer contre référence, coefficients versionnés et stockés.",
          "Filtrer selon le bruit : médian pour les spikes, moyenne pour le blanc, Kalman pour la fusion.",
          "Valider la mesure : plausibilité, redondance, tests en conditions réelles.",
          "Soigner l'alimentation et le câblage : 80 % des problèmes « capteur » sont électriques.",
          "Échantillonner régulièrement (timer), pas avec des `delay()` approximatifs.",
          "Documenter : schéma, coefficients, procédure de validation — le projet doit survivre à son auteur.",
          "Prévoir la dérive : recalibration planifiée, architectures différentielles.",
          "Sécurité : un capteur qui pilote une action critique doit être surveillé (plausibilité, redondance, état sûr en cas de panne).",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par les sources primaires.",
    blocks: [
      {
        kind: "fields",
        title: "Sources (à privilégier)",
        fields: [
          {
            label: "Datasheets constructeurs",
            value:
              "Bosch (BME280, IMU), STMicroelectronics, Texas Instruments : les caractéristiques réelles, les schémas d'application, les notes de calibration.",
          },
          {
            label: "Notes d'application",
            value:
              "Les « application notes » des fabricants : calibration, filtrage, layout PCB — le savoir-faire condensé.",
          },
          {
            label: "Documentation des plateformes",
            value:
              "Arduino, ESP-IDF, Raspberry Pi : les bibliothèques et exemples de référence pour chaque bus.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : démonter la chaîne complète sur un projet réel — du capteur au dashboard — en mesurant chaque maillon.",
          "Communauté : les forums de chaque plateforme pour les problèmes d'intégration concrets (adresses, timings).",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Les capteurs maîtrisés, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "`electronique` : concevoir les circuits autour des capteurs — conditionnement, PCB.",
          "`systemes-embarques` : la programmation bas niveau — drivers, temps réel, basse consommation.",
          "`ros` : intégrer les capteurs dans un système robotique — topics, TF, fusion.",
          "`controle` : utiliser les mesures dans des boucles d'asservissement.",
          "`python` : traiter et visualiser les données — pandas, matplotlib, Jupyter.",
          "`networking` : transporter les mesures — MQTT, LoRa, architectures IoT.",
          "Revenir à la roadmap : valider les capteurs et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

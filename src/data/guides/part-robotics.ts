import type { SkillGuide } from "../skill-guides";

import { LEARNING_LINUX } from "./learning-linux";
import { LEARNING_CONTROLE } from "./learning-controle";
import { LEARNING_ELECTRONIQUE } from "./learning-electronique";
import { LEARNING_INTEGRATION } from "./learning-integration";
import { LEARNING_MATHS } from "./learning-maths";
import { LEARNING_MECANIQUE } from "./learning-mecanique";
import { LEARNING_PERCEPTION } from "./learning-perception";
import { LEARNING_PHYSIQUE } from "./learning-physique";
import { LEARNING_PLANIFICATION } from "./learning-planification";
import { LEARNING_PYTHON } from "./learning-python";
import { LEARNING_ROS } from "./learning-ros";
import { LEARNING_SYSTEMES_EMBARQUES } from "./learning-systemes-embarques";
/**
 * Guides pédagogiques — robotique.
 *
 * Ces entrées enrichissent les compétences de la roadmap Robotics
 * Engineer (désignées par leur `id`) avec un contenu éditorial structuré :
 * définition, intérêt pédagogique, prérequis expliqués, concepts clés,
 * fonctionnement, exemple concret et projets progressifs.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - Ton : documentation technique premium, concret, sans marketing. Français.
 */
export const GUIDES_ROBOTICS: Record<string, SkillGuide> = {
  // --------------------------------------------------------------------- maths
  maths: {
    learning: LEARNING_MATHS,
    definition:
      "Les mathématiques de la robotique décrivent le mouvement : l'algèbre linéaire positionne le robot dans l'espace, la géométrie 3D oriente ses articulations, les probabilités gèrent l'incertitude des capteurs.",
    whyLearn:
      "Un robot qui bouge est un système d'équations en mouvement : sans matrices de rotation ni cinématique, impossible de commander un bras ou de localiser un mobile. Ces maths sont le socle de tout le reste — contrôle, perception, planification.",
    conceptDetails: [
      {
        name: "Algèbre linéaire",
        definition:
          "Vecteurs et matrices : représenter positions, rotations et transformations dans l'espace, et les composer.",
      },
      {
        name: "Géométrie 3D",
        definition:
          "Repères, quaternions, matrices homogènes : décrire précisément l'orientation d'un solide articulé.",
      },
      {
        name: "Probabilités",
        definition:
          "Modéliser l'incertitude : un capteur est bruité, une mesure est une distribution — pas une certitude.",
      },
      {
        name: "Optimisation",
        definition:
          "Trouver la meilleure solution sous contraintes : trajectoire minimale, gains optimaux, calibration.",
      },
      {
        name: "Filtrage",
        definition:
          "Estimer l'état réel à partir de mesures bruitées : moyenne mobile, filtre de Kalman et ses variantes.",
      },
    ],
    howItWorksTitle: "Positionner un bras robotique",
    howItWorks: ["ARTICULATIONS", "MATRICES", "CINÉMATIQUE", "TRAJECTOIRE", "COMMANDE"],
    example: {
      title: "Cinématique d'un bras 2D",
      steps: ["Angles", "Matrices", "Position", "Cible", "Angles inverses"],
    },
    projectsDetailed: [
      {
        title: "Cinématique d'un bras 2D",
        flow: "Modèle → Directe → Inverse → Visualisation",
      },
      {
        title: "Simulation de trajectoire",
        flow: "Points → Interpolation → Vitesse → Vérification",
      },
    ],
  },

  // ------------------------------------------------------------------ physique
  physique: {
    learning: LEARNING_PHYSIQUE,
    definition:
      "La physique impose les lois auxquelles tout robot obéit : mécanique du solide pour les structures, dynamique pour les mouvements, et principes des capteurs et actionneurs qui relient le logiciel au monde réel.",
    whyLearn:
      "Un moteur sous-dimensionné, un capteur mal compris, une structure qui vibre : la plupart des échecs robotiques sont des erreurs de physique, pas de code. Comprendre forces, couples et inertie permet de dimensionner correctement avant de construire.",
    conceptDetails: [
      {
        name: "Mécanique du solide",
        definition:
          "L'étude des corps rigides : efforts, contraintes, équilibre — pour des structures qui ne cassent pas.",
      },
      {
        name: "Dynamique",
        definition:
          "Le lien entre forces et mouvements : inertie, frottements, équations du mouvement d'un mécanisme.",
      },
      {
        name: "Capteurs",
        definition:
          "Comment le monde devient signal : principes physiques (ultrasons, infrarouge, effet Hall) et leurs limites.",
      },
      {
        name: "Actionneurs",
        definition:
          "Comment le signal redevient mouvement : moteurs DC, pas-à-pas, servos — couple, vitesse, rendement.",
      },
      {
        name: "Énergétique",
        definition:
          "Batteries, consommation, autonomie : dimensionner l'énergie pour la mission réelle du robot.",
      },
    ],
    howItWorksTitle: "Dimensionner un actionneur",
    howItWorks: ["CHARGE", "COUPLE", "VITESSE", "MOTEUR", "VÉRIFICATION"],
    example: {
      title: "Choisir un moteur",
      steps: ["Masse", "Couple requis", "Vitesse", "Moteur", "Test"],
    },
    projectsDetailed: [
      {
        title: "Modèle dynamique simulé",
        flow: "Équations → Simulation → Comportement → Validation",
      },
      {
        title: "Caractérisation d'un moteur",
        flow: "Banc → Mesures → Courbe → Sélection",
      },
    ],
  },

  // ------------------------------------------------------------------- python
  python: {
    learning: LEARNING_PYTHON,
    definition:
      "Python est le langage quotidien de la robotique moderne : avec NumPy pour le calcul et l'écosystème ROS, il sert au prototypage rapide, au traitement des capteurs et à l'orchestration des systèmes.",
    whyLearn:
      "En robotique, on itère vite : tester un algorithme de perception ou un contrôleur ne doit pas prendre une journée de compilation. Python permet d'expérimenter rapidement, tandis que C++ prend le relais pour le temps réel critique.",
    conceptDetails: [
      {
        name: "NumPy",
        definition:
          "Le calcul vectoriel efficace : tableaux, algèbre linéaire et opérations sur matrices sans boucles lentes.",
      },
      {
        name: "POO",
        definition:
          "Structurer le code en classes : capteurs, contrôleurs et nœuds deviennent des objets réutilisables.",
      },
      {
        name: "Temps réel (notions)",
        definition:
          "Comprendre les limites de Python : GIL, latence, jitter — et savoir quand passer au C++ ou au temps réel dur.",
      },
      {
        name: "C++ (bases)",
        definition:
          "Les fondamentaux du langage des couches critiques : types, pointeurs, compilation — pour lire et porter le code ROS.",
      },
      {
        name: "Outils ROS",
        definition:
          "rclpy, rosbag, rviz : l'outillage Python de l'écosystème ROS pour développer, enregistrer et visualiser.",
      },
    ],
    howItWorksTitle: "Prototyper un contrôleur",
    howItWorks: ["CAPTEUR", "DONNÉES", "ALGORITHME", "COMMANDE", "ITÉRATION"],
    example: {
      title: "Suivi de ligne",
      steps: ["Caméra", "Image", "Position", "Correction", "Moteurs"],
    },
    projectsDetailed: [
      {
        title: "Contrôleur simulé",
        flow: "Modèle → Boucle → Réglage → Robustesse",
      },
      {
        title: "Interface capteur en Python",
        flow: "Driver → Acquisition → Filtrage → Visualisation",
      },
    ],
  },

  // -------------------------------------------------------------------- linux
  linux: {
    learning: LEARNING_LINUX,
    definition:
      "Les robots tournent sous Linux : c'est le système qui héberge ROS, gère le réseau entre les composants et s'exécute sur des cartes embarquées comme Raspberry Pi ou Jetson.",
    whyLearn:
      "Un robot est un système distribué : plusieurs processus qui communiquent, des services qui doivent redémarrer seuls, du réseau entre capteurs et calculateurs. Maîtriser Linux (systemd, réseau, cross-compilation) est ce qui sépare un prototype de bureau d'un robot qui tourne seul.",
    conceptDetails: [
      {
        name: "Terminal",
        definition:
          "L'interface de pilotage du système : naviguer, administrer et automatiser sans interface graphique.",
      },
      {
        name: "Réseau",
        definition:
          "Configurer IP, SSH et routage entre les calculateurs du robot : les nœuds ROS communiquent par le réseau.",
      },
      {
        name: "Systemd",
        definition:
          "Le gestionnaire de services : lancer les nœuds au démarrage, les redémarrer en cas de crash, journaliser.",
      },
      {
        name: "Cross-compilation",
        definition:
          "Compiler sur PC pour une cible embarquée (ARM) : toolchains et sysroots pour les cartes du robot.",
      },
      {
        name: "Raspberry Pi / Jetson",
        definition:
          "Les cartes de référence : Pi pour le prototypage, Jetson pour le calcul embarqué (vision, IA).",
      },
    ],
    howItWorksTitle: "Mettre un robot en service",
    howItWorks: ["IMAGE", "RÉSEAU", "SERVICES", "DÉMARRAGE", "SUPERVISION"],
    example: {
      title: "Robot sur Raspberry Pi",
      steps: ["OS", "ROS", "Service systemd", "Reboot", "Autonome"],
    },
    projectsDetailed: [
      {
        title: "Robot sur Raspberry Pi",
        flow: "Installation → Configuration → Services → Tests",
      },
      {
        title: "Image système reproductible",
        flow: "Script → Image → Déploiement → Documentation",
      },
    ],
  },

  // -------------------------------------------------------------- electronique
  electronique: {
    learning: LEARNING_ELECTRONIQUE,
    definition:
      "L'électronique est le système nerveux du robot : circuits, microcontrôleurs et bus de communication relient les capteurs et actionneurs au logiciel de contrôle.",
    whyLearn:
      "Aucun robot n'existe sans sa couche électronique : lire un capteur, driver un moteur, communiquer en I2C ou UART. Savoir câbler et déboguer un circuit avec un Arduino ou un ESP32 rend autonome sur le hardware — et évite de rester bloqué quand le logiciel ne suffit plus.",
    prerequisiteNotes: {
      physique:
        "Comprendre tension, courant et puissance pour dimensionner alimentations et composants sans les détruire.",
    },
    conceptDetails: [
      {
        name: "Circuits",
        definition:
          "Lire et concevoir des schémas : résistances, condensateurs, diviseurs — les briques de tout montage.",
      },
      {
        name: "Arduino / ESP32",
        definition:
          "Les microcontrôleurs de prototypage : GPIO, ADC, WiFi/Bluetooth pour l'ESP32 — le banc d'essai du roboticien.",
      },
      {
        name: "I2C / SPI / UART",
        definition:
          "Les bus série qui relient capteurs et contrôleurs : adresses, horloge, trames — le dialogue du hardware.",
      },
      {
        name: "Alimentation",
        definition:
          "Réguler et distribuer l'énergie : régulateurs, découplage, dimensionnement des batteries et des rails.",
      },
      {
        name: "PCB (bases)",
        definition:
          "Passer du breadboard au circuit imprimé : routage, plans de masse, règles de fabrication.",
      },
    ],
    howItWorksTitle: "Lire un capteur",
    howItWorks: ["CAPTEUR", "SIGNAL", "BUS", "MICROCONTRÔLEUR", "DONNÉE"],
    example: {
      title: "Capteur de distance",
      steps: ["Capteur", "I2C", "ESP32", "Lecture", "Affichage"],
    },
    projectsDetailed: [
      {
        title: "Carte capteur sur ESP32",
        flow: "Schéma → Câblage → Firmware → Calibration",
      },
      {
        title: "Driver de moteur",
        flow: "Pont en H → PWM → Sens → Vitesse",
      },
    ],
  },

  // ----------------------------------------------------------------- mecanique
  mecanique: {
    learning: LEARNING_MECANIQUE,
    definition:
      "La mécanique robotique conçoit la structure physique du robot : modélisation CAO, cinématique des articulations, choix des matériaux et fabrication (impression 3D, usinage).",
    whyLearn:
      "Un robot est d'abord un objet qui bouge dans le monde physique : jeu dans les articulations, flexibilité, tolérances d'assemblage déterminent sa précision réelle. Savoir concevoir en CAO et fabriquer permet de passer du plan au robot fonctionnel.",
    prerequisiteNotes: {
      physique:
        "Appliquer statique et dynamique pour que la structure supporte les efforts réels.",
      maths:
        "Utiliser la géométrie 3D et la cinématique pour placer précisément chaque articulation.",
    },
    conceptDetails: [
      {
        name: "CAO (Fusion 360)",
        definition:
          "Modéliser les pièces en 3D paramétrique : esquisses, extrusions, assemblages contraints.",
      },
      {
        name: "Cinématique",
        definition:
          "Relier angles articulaires et position de l'effecteur : directe pour simuler, inverse pour commander.",
      },
      {
        name: "Impression 3D",
        definition:
          "Fabriquer vite des pièces sur mesure : FDM, orientations, supports — et leurs limites mécaniques.",
      },
      {
        name: "Matériaux",
        definition:
          "Choisir PLA, PETG, aluminium ou carbone selon rigidité, masse et contraintes d'usage.",
      },
      {
        name: "Tolérances",
        definition:
          "Spécifier les jeux d'assemblage : une pièce parfaite sur l'écran peut ne pas s'emboîter dans la réalité.",
      },
    ],
    howItWorksTitle: "Concevoir un bras robotique",
    howItWorks: ["CAHIER DES CHARGES", "CAO", "CINÉMATIQUE", "FABRICATION", "ASSEMBLAGE"],
    example: {
      title: "Bras imprimé en 3D",
      steps: ["Modèle", "Impression", "Moteurs", "Assemblage", "Test"],
    },
    projectsDetailed: [
      {
        title: "Bras robotique imprimé en 3D",
        flow: "CAO → Impression → Motorisation → Calibration",
      },
      {
        title: "Assemblage CAO complet",
        flow: "Pièces → Contraintes → Mouvement → Plans",
      },
    ],
  },

  // --------------------------------------------------------- systemes-embarques
  "systemes-embarques": {
    learning: LEARNING_SYSTEMES_EMBARQUES,
    definition:
      "Les systèmes embarqués sont le logiciel au plus près du hardware : firmware de microcontrôleur, temps réel, interruptions, drivers. C'est le code qui fait tourner le moteur, avec des contraintes de mémoire et de timing strictes.",
    whyLearn:
      "Entre le capteur et ROS, il y a une couche qui doit répondre en microsecondes, sans système d'exploitation complet : c'est l'embarqué. Le maîtriser permet de construire des robots réactifs et fiables, et de déboguer les problèmes que le haut niveau ne voit pas.",
    prerequisiteNotes: {
      electronique:
        "Connaître les microcontrôleurs et bus pour écrire des drivers qui parlent au hardware.",
      python:
        "Prototyper la logique avant de la porter en C sur cible contrainte.",
    },
    conceptDetails: [
      {
        name: "Temps réel",
        definition:
          "Garantir une réponse dans un délai borné : temps réel dur (sécurité) vs mou (performance) — pas juste « aller vite ».",
      },
      {
        name: "RTOS",
        definition:
          "Un système d'exploitation temps réel (FreeRTOS) : tâches, priorités, ordonnancement déterministe sur microcontrôleur.",
      },
      {
        name: "Drivers",
        definition:
          "Le code qui pilote un périphérique : registres, protocoles, initialisation — l'interface entre HAL et hardware.",
      },
      {
        name: "Interruptions",
        definition:
          "Réagir aux événements matériels sans scruter en boucle : vecteurs d'interruption, priorités, sections critiques.",
      },
      {
        name: "Débogage hardware",
        definition:
          "Sonde JTAG/SWD, oscilloscope, analyseur logique : voir ce que le code fait vraiment sur le silicium.",
      },
    ],
    howItWorksTitle: "Le cycle d'un firmware",
    howItWorks: ["INTERRUPTION", "LECTURE", "TRAITEMENT", "COMMANDE", "BOUCLE"],
    example: {
      title: "Contrôle moteur",
      steps: ["Encodeur", "Interruption", "Vitesse", "PID", "PWM"],
    },
    projectsDetailed: [
      {
        title: "Firmware de contrôle moteur",
        flow: "Driver → Asservissement → Tests → Robustesse",
      },
      {
        title: "Système temps réel",
        flow: "FreeRTOS → Tâches → Priorités → Mesures",
      },
    ],
  },

  // ----------------------------------------------------------------------- ros
  ros: {
    learning: LEARNING_ROS,
    definition:
      "ROS 2 (Robot Operating System) est le framework standard de la robotique : il structure un robot en nœuds modulaires qui échangent des messages (topics), appellent des services et se décrivent en URDF.",
    whyLearn:
      "ROS 2 est le standard industriel et académique : savoir découper un système en nœuds, définir des interfaces et simuler dans Gazebo est attendu pour presque tout poste en robotique. C'est aussi ce qui rend un système robotique maintenable au lieu d'un monolithe fragile.",
    prerequisiteNotes: {
      python:
        "Écrire les nœuds ROS : la plupart des nœuds applicatifs sont en Python (rclpy).",
      linux:
        "Installer, configurer et faire communiquer les nœuds sur le réseau du robot.",
    },
    conceptDetails: [
      {
        name: "Nodes & topics",
        definition:
          "Les nœuds sont des processus indépendants ; les topics sont les canaux de messages asynchrones qui les relient (publish/subscribe).",
      },
      {
        name: "Services & actions",
        definition:
          "Les services pour les appels requête/réponse synchrones, les actions pour les tâches longues avec retour d'avancement et préemption.",
      },
      {
        name: "URDF",
        definition:
          "Le format XML qui décrit la géométrie, les articulations et l'inertie du robot : la carte d'identité mécanique.",
      },
      {
        name: "Launch files",
        definition:
          "Des fichiers qui démarrent tout le système d'un coup : nœuds, paramètres, remappages — le chef d'orchestre.",
      },
      {
        name: "Simulation Gazebo",
        definition:
          "Le simulateur physique : tester perception, contrôle et navigation sur un jumeau virtuel avant le robot réel.",
      },
    ],
    howItWorksTitle: "Le graphe d'un robot ROS 2",
    howItWorks: ["NODES", "TOPICS", "SERVICES", "TF", "APPLICATION"],
    example: {
      title: "Robot suiveur",
      steps: ["Caméra", "Topic image", "Nœud vision", "Topic cmd", "Nœuds moteurs"],
    },
    projectsDetailed: [
      {
        title: "Robot simulé complet",
        flow: "URDF → Gazebo → Nœuds → Téléopération",
      },
      {
        title: "Stack ROS 2 multi-nœuds",
        flow: "Architecture → Interfaces → Launch → Tests",
      },
    ],
  },

  // ------------------------------------------------------------------- controle
  controle: {
    learning: LEARNING_CONTROLE,
    definition:
      "Le contrôle (automatique) conçoit les lois qui transforment une consigne en mouvement précis : le régulateur PID corrige l'erreur en continu, les méthodes avancées (MPC, espace d'état) optimisent le comportement.",
    whyLearn:
      "Un robot sans contrôle est une mécanique inerte : c'est l'asservissement qui donne la précision, la stabilité et la répétabilité. Du drone au bras industriel, la théorie du contrôle est ce qui fait la différence entre « ça bouge » et « ça bouge juste ».",
    prerequisiteNotes: {
      maths:
        "Modéliser le système : équations d'état, transformées, stabilité.",
      mecanique:
        "Connaître la cinématique et la dynamique du mécanisme à asservir.",
    },
    conceptDetails: [
      {
        name: "PID",
        definition:
          "Le régulateur universel : proportionnel réagit à l'erreur, intégral élimine l'écart statique, dérivé amortit les oscillations.",
      },
      {
        name: "Espace d'état",
        definition:
          "Représenter le système par ses variables d'état et concevoir des correcteurs (placement de pôles, LQR) sur le modèle complet.",
      },
      {
        name: "MPC",
        definition:
          "La commande prédictive : optimiser la commande sur un horizon futur en respectant les contraintes — au prix du calcul.",
      },
      {
        name: "Stabilité",
        definition:
          "Garantir que le système ne diverge pas : marges, pôles, Lyapunov — la théorie qui évite les comportements dangereux.",
      },
      {
        name: "Identification",
        definition:
          "Estimer les paramètres du modèle à partir de mesures réelles : sans bon modèle, pas de bon contrôleur.",
      },
    ],
    howItWorksTitle: "Une boucle d'asservissement",
    howItWorks: ["CONSIGNE", "MESURE", "ERREUR", "CORRECTION", "ACTIONNEUR"],
    example: {
      title: "Régler un PID",
      steps: ["Système", "Oscillation", "Gains", "Réponse", "Stabilité"],
    },
    projectsDetailed: [
      {
        title: "PID réglé sur système réel",
        flow: "Modèle → Réglage → Essais → Validation",
      },
      {
        title: "Contrôleur MPC simulé",
        flow: "Modèle → Optimisation → Simulation → Contraintes",
      },
    ],
  },

  // ----------------------------------------------------------------- perception
  perception: {
    learning: LEARNING_PERCEPTION,
    definition:
      "La perception donne au robot une représentation du monde : vision par ordinateur pour voir, LiDAR pour mesurer, fusion de capteurs et filtres probabilistes pour se localiser.",
    whyLearn:
      "Un robot aveugle ne peut être qu'un automate : la perception est ce qui permet l'autonomie réelle — détecter un obstacle, reconnaître un objet, se localiser sur une carte. C'est le domaine où la robotique rencontre l'IA le plus directement.",
    prerequisiteNotes: {
      python:
        "Traiter images et nuages de points avec OpenCV et NumPy en temps réel.",
      maths:
        "Géométrie projective, probabilités et filtrage : le socle de la vision et de la localisation.",
    },
    conceptDetails: [
      {
        name: "OpenCV",
        definition:
          "La bibliothèque de vision de référence : acquisition, filtrage, détection de formes et calibration de caméras.",
      },
      {
        name: "Détection (YOLO)",
        definition:
          "Les réseaux de détection temps réel : localiser et classifier les objets dans l'image en une passe.",
      },
      {
        name: "LiDAR & SLAM",
        definition:
          "Le LiDAR mesure les distances par laser ; le SLAM construit une carte tout en s'y localisant simultanément.",
      },
      {
        name: "Filtre de Kalman",
        definition:
          "Fusionner prédiction du modèle et mesures bruitées pour estimer au mieux position et vitesse.",
      },
      {
        name: "Fusion capteurs",
        definition:
          "Combiner caméra, IMU, LiDAR, odométrie : chaque capteur compense les faiblesses des autres.",
      },
    ],
    howItWorksTitle: "Localiser un robot (SLAM)",
    howItWorks: ["CAPTEURS", "ODOMÉTRIE", "CARTE", "CORRECTION", "POSITION"],
    example: {
      title: "Suivi d'objet",
      steps: ["Caméra", "Détection", "Boîte", "Filtre", "Commande"],
    },
    projectsDetailed: [
      {
        title: "Suivi d'objet en temps réel",
        flow: "Caméra → YOLO → Tracking → Asservissement",
      },
      {
        title: "Cartographie SLAM",
        flow: "LiDAR → Gmapping → Carte → Navigation",
      },
    ],
  },

  // -------------------------------------------------------------- planification
  planification: {
    learning: LEARNING_PLANIFICATION,
    definition:
      "La planification décide où le robot doit aller : algorithmes de recherche de chemin (A*, RRT), navigation avec évitement d'obstacles, planification de tâches. C'est l'autonomie décisionnelle.",
    whyLearn:
      "Percevoir et bouger ne suffit pas : il faut décider. La planification transforme une carte et un objectif en trajectoire sûre et efficace — c'est elle qui permet à un robot mobile de traverser un entrepôt sans collision ni opérateur.",
    prerequisiteNotes: {
      controle:
        "Exécuter précisément les trajectoires calculées : un plan sans contrôle reste théorique.",
      perception:
        "Fournir la carte et la position du robot, sans lesquelles on ne peut rien planifier.",
    },
    conceptDetails: [
      {
        name: "A* & RRT",
        definition:
          "A* trouve le plus court chemin sur une grille, RRT explore les espaces continus par échantillonnage : les deux classiques de la planification.",
      },
      {
        name: "Navigation (Nav2)",
        definition:
          "La stack de navigation ROS 2 : planificateur global, contrôleur local, cartes de coûts — le standard des robots mobiles.",
      },
      {
        name: "Évitement d'obstacles",
        definition:
          "Réagir aux obstacles dynamiques en temps réel : fenêtres dynamiques, champs de potentiels, replanification.",
      },
      {
        name: "Planification de tâches",
        definition:
          "Au-delà du chemin : ordonnancer les actions du robot (prendre, déplacer, déposer) pour accomplir une mission.",
      },
      {
        name: "Incertitude",
        definition:
          "Planifier malgré le bruit : la carte est imparfaite, la localisation incertaine — le plan doit rester robuste.",
      },
    ],
    howItWorksTitle: "Planifier une trajectoire",
    howItWorks: ["CARTE", "OBJECTIF", "RECHERCHE", "TRAJECTOIRE", "SUIVI"],
    example: {
      title: "Navigation en entrepôt",
      steps: ["Carte", "Destination", "A*", "Obstacles", "Arrivée"],
    },
    projectsDetailed: [
      {
        title: "Navigation autonome simulée",
        flow: "Nav2 → Carte → Objectifs → Évitement",
      },
      {
        title: "Planificateur de trajectoire",
        flow: "RRT → Lissage → Contraintes → Exécution",
      },
    ],
  },

  // ---------------------------------------------------------------- integration
  integration: {
    learning: LEARNING_INTEGRATION,
    definition:
      "L'intégration système assemble hardware, logiciel et autonomie en un robot fiable : tests de bout en bout, sécurité, téléopération, maintenance. C'est le passage du prototype au produit.",
    whyLearn:
      "Un robot n'est pas une collection de démos : c'est un système qui doit fonctionner des heures, se diagnostiquer et se réparer. L'intégration — tests système, documentation, robustesse — est la compétence qui transforme des briques techniques en robot livrable.",
    prerequisiteNotes: {
      ros: "Assembler les nœuds en système cohérent : architecture, interfaces, lancement.",
      "systemes-embarques":
        "Fiabiliser la couche basse : le système complet dépend du firmware.",
      planification:
        "Intégrer la décision autonome dans la boucle complète du robot.",
    },
    conceptDetails: [
      {
        name: "Tests système",
        definition:
          "Valider le robot complet, pas les briques isolées : scénarios nominaux, cas limites, tests d'endurance.",
      },
      {
        name: "Sécurité",
        definition:
          "Boutons d'arrêt, zones de sécurité, comportements de repli : un robot qui bouge doit d'abord ne blesser personne.",
      },
      {
        name: "Téléopération",
        definition:
          "Piloter à distance pour les phases de test et de secours : joystick, interface web, latence maîtrisée.",
      },
      {
        name: "Maintenance",
        definition:
          "Penser la réparabilité : diagnostic embarqué, logs accessibles, pièces remplaçables sur le terrain.",
      },
      {
        name: "Documentation",
        definition:
          "Décrire architecture, procédures et limites : un robot sans documentation est un prototype, pas un produit.",
      },
    ],
    howItWorksTitle: "Fiabiliser un robot",
    howItWorks: ["ASSEMBLAGE", "TESTS", "DÉFAUTS", "CORRECTIONS", "VALIDATION"],
    example: {
      title: "Mise en service",
      steps: ["Robot", "Batterie", "Tests", "Téléop", "Autonome"],
    },
    projectsDetailed: [
      {
        title: "Robot mobile autonome complet",
        flow: "Châssis → Stack → Navigation → Endurance",
      },
      {
        title: "Démonstration filmée",
        flow: "Scénario → Répétitions → Captation → Documentation",
      },
    ],
  },
};

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de ROS 2 : du premier nœud au système robotique simulé.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_ROS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est ROS 2, pourquoi c'est le standard de la robotique et ce qu'il apporte concrètement.",
    blocks: [
      {
        kind: "text",
        text: "ROS 2 (Robot Operating System) est le framework standard de la robotique : il structure un robot en nœuds modulaires qui échangent des messages (topics), appellent des services et se décrivent en URDF. Ce n'est pas un système d'exploitation au sens classique, mais un middleware : une couche logicielle qui fait communiquer les composants d'un robot.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est le standard : avant ROS, chaque équipe robotique réinventait la communication entre capteurs, contrôleurs et planification — du code monolithique, fragile, impossible à réutiliser. ROS 2 fournit les briques communes (messages, découverte, enregistrement, visualisation) : on assemble des nœuds au lieu de tout recoder, et on réutilise des packages éprouvés (navigation, manipulation, simulation).",
      },
      {
        kind: "text",
        text: "ROS 2 est le standard industriel et académique : savoir découper un système en nœuds, définir des interfaces et simuler dans Gazebo est attendu pour presque tout poste en robotique. C'est aussi ce qui rend un système robotique maintenable au lieu d'un monolithe fragile.",
      },
    ],
  },
  {
    id: "ros2-middleware-pas-os",
    title: "ROS 2 : un middleware, pas un OS",
    level: 1,
    intro:
      "Le malentendu le plus fréquent, dissipé en un schéma.",
    blocks: [
      {
        kind: "diagram",
        title: "Où se situe ROS 2",
        lines: [
          "Matériel (moteurs, capteurs, caméras)",
          "     │",
          "     ▼",
          "OS (Linux / Ubuntu)",
          "     │",
          "     ▼",
          "ROS 2 (middleware : nœuds, topics, services, outils)",
          "     │",
          "     ▼",
          "Votre application robotique",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : ROS 2 tourne par-dessus Linux (généralement Ubuntu) et fournit la plomberie — découverte des nœuds sur le réseau, transport des messages, horodatage, enregistrement. Vos nœuds (souvent en Python avec `rclpy`, parfois en C++ avec `rclcpp`) s'appuient dessus pour se parler sans connaître leurs adresses.",
      },
      {
        kind: "list",
        items: [
          "ROS 1 vs ROS 2 : ROS 2 est la génération actuelle (temps réel, multi-plateforme, sans maître central) — c'est elle qu'il faut apprendre aujourd'hui.",
          "Les distributions ROS 2 ont des noms et des durées de support : choisissez une LTS (ex. Humble) pour un projet sérieux.",
          "ROS 2 ne fait pas la robotique à votre place : il organise le système pour que vous puissiez vous concentrer sur la perception, le contrôle et la planification.",
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
      "Ce qu'il faut déjà savoir pour que ROS 2 soit abordable.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Python (`python`)",
            value:
              "Écrire les nœuds ROS : la plupart des nœuds applicatifs sont en Python (`rclpy`). Classes, callbacks et programmation orientée objet sont indispensables.",
          },
          {
            label: "Linux (`linux`)",
            value:
              "Installer, configurer et faire communiquer les nœuds sur le réseau du robot. ROS 2 vit dans le terminal : variables d'environnement, permissions, réseau.",
          },
          {
            label: "Bases de robotique",
            value:
              "Repères, transformations, capteurs : comprendre ce que représente une position ou une vitesse pour donner un sens aux messages échangés.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer ROS 2 sur Ubuntu, en comprenant les variantes.",
    blocks: [
      {
        kind: "command",
        label: "Installer la variante Desktop",
        command: "sudo apt install ros-humble-desktop",
        why: "Installe ROS 2 Humble (LTS) avec les outils graphiques (RViz, rqt) et les packages de démonstration. Remplacez `humble` par votre distribution si différente. La variante `ros-base` (sans GUI) suffit pour un robot headless.",
        verify: "ls /opt/ros/humble",
      },
      {
        kind: "command",
        label: "Charger l'environnement ROS 2",
        command: "source /opt/ros/humble/setup.bash",
        why: "Définit les variables d'environnement (`ROS_DISTRO`, chemins des packages, complétion) : sans ce `source`, les commandes `ros2` ne trouvent rien. À ajouter au `~/.bashrc` pour le charger à chaque terminal.",
      },
      {
        kind: "text",
        text: "La documentation officielle (docs.ros.org) détaille l'installation complète : configuration des dépôts APT, clés, dépendances. Suivez-la pour votre version d'Ubuntu exacte — les incompatibilités de version sont la première cause d'échec d'installation.",
      },
    ],
  },
  {
    id: "environnement-workspace",
    title: "Environnement et workspace",
    level: 2,
    intro:
      "Organiser son code : le workspace `colcon`, là où vivent vos packages.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure d'un workspace",
        lines: [
          "ros2_ws/",
          "├── src/                  (vos packages : un dossier par package)",
          "│   └── mon_robot/",
          "│       ├── package.xml",
          "│       ├── setup.py",
          "│       └── mon_robot/",
          "├── build/                (généré par colcon)",
          "├── install/              (généré : à sourcer)",
          "└── log/",
        ],
      },
      {
        kind: "command",
        label: "Compiler le workspace",
        command: "colcon build",
        why: "Compile tous les packages de `src/` et génère `install/`. À exécuter depuis la racine du workspace après chaque modification.",
        verify: "ls install",
      },
      {
        kind: "command",
        label: "Charger le workspace",
        command: "source install/setup.bash",
        why: "Rend vos packages visibles par ROS 2 (exécutables, launch files, interfaces). À sourcer dans chaque terminal après le `source` de la distribution.",
      },
    ],
  },
  {
    id: "premier-noeud",
    title: "Premier nœud : talker et listener",
    level: 2,
    intro:
      "Le « Hello World » de ROS 2 : deux nœuds qui se parlent via un topic.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lancer l'émetteur",
            detail: "Dans un terminal sourcé : `ros2 run demo_nodes_cpp talker` — publie « Hello World » sur le topic `/chatter` dix fois par seconde.",
          },
          {
            title: "Lancer le récepteur",
            detail: "Dans un second terminal sourcé : `ros2 run demo_nodes_cpp listener` — s'abonne à `/chatter` et affiche chaque message reçu.",
          },
          {
            title: "Observer le graphe",
            detail: "`rqt_graph` (troisième terminal) montre les deux nœuds reliés par le topic : c'est la visualisation du système.",
          },
          {
            title: "Écrire votre propre nœud",
            detail: "Recréez ce talker en Python avec `rclpy` (voir la section code) : c'est le premier nœud que tout roboticien écrit.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Talker minimal en Python (rclpy)",
        code: "import rclpy\nfrom rclpy.node import Node\nfrom std_msgs.msg import String\n\nclass Talker(Node):\n    def __init__(self):\n        super().__init__(\"talker\")\n        self.pub = self.create_publisher(String, \"chatter\", 10)\n        self.create_timer(0.5, self.publier)\n        self.compteur = 0\n\n    def publier(self):\n        msg = String()\n        msg.data = f\"Bonjour {self.compteur}\"\n        self.pub.publish(msg)\n        self.compteur += 1\n\nrclpy.init()\nrclpy.spin(Talker())",
      },
    ],
  },
  {
    id: "cli-essentiel",
    title: "La CLI ros2 essentielle",
    level: 2,
    intro:
      "Les commandes pour inspecter un système vivant.",
    blocks: [
      {
        kind: "command",
        label: "Lister les nœuds actifs",
        command: "ros2 node list",
        why: "Affiche tous les nœuds en cours d'exécution. Si votre nœud n'y est pas, il n'a pas démarré ou pas été sourcé correctement.",
      },
      {
        kind: "command",
        label: "Lister les topics",
        command: "ros2 topic list",
        why: "Affiche les canaux de messages actifs. Combinez avec `ros2 topic info /chatter` pour voir le type de message et les publishers/subscribers.",
      },
      {
        kind: "command",
        label: "Écouter un topic",
        command: "ros2 topic echo /chatter",
        why: "Affiche les messages publiés en temps réel. Le réflexe n°1 pour vérifier qu'un capteur ou un nœud émet bien des données.",
      },
      {
        kind: "command",
        label: "Publier à la main",
        command: "ros2 topic pub --once /cmd_vel geometry_msgs/msg/Twist \"{linear: {x: 0.2}}\"",
        why: "Publie un message unique (ou en continu avec `--rate 10`) : idéal pour tester un nœud moteur sans écrire de code.",
      },
    ],
  },
  {
    id: "topics-en-pratique",
    title: "Topics en pratique",
    level: 2,
    intro:
      "Le publish/subscribe : le mode de communication dominant en ROS 2.",
    blocks: [
      {
        kind: "text",
        text: "Un topic est un canal nommé sur lequel des nœuds publient des messages typés (`sensor_msgs/msg/Image`, `geometry_msgs/msg/Twist`…) et auquel d'autres s'abonnent. Communication asynchrone et découplée : le publisher ne sait pas qui écoute, le subscriber ne sait pas qui publie.",
      },
      {
        kind: "list",
        items: [
          "Nommage : `/camera/image`, `/cmd_vel`, `/odom` — descriptif, hiérarchique, en minuscules.",
          "Un topic = un type de message : `ros2 topic info` le confirme, et un publisher au mauvais type est rejeté.",
          "Fréquence : `ros2 topic hz /chatter` mesure le débit réel — un capteur qui devrait publier à 30 Hz mais plafonne à 5 Hz a un problème.",
          "Bande passante : `ros2 topic bw /camera/image` — les images non compressées saturent vite un réseau Wi-Fi.",
        ],
      },
    ],
  },
  {
    id: "services-et-actions",
    title: "Services et actions",
    level: 2,
    intro:
      "Quand le publish/subscribe ne suffit pas : requête/réponse et tâches longues.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Topics", "Services", "Actions"],
        rows: [
          ["Modèle", "Publish/subscribe", "Requête/réponse", "But + feedback + résultat"],
          ["Exemple", "Flux caméra", "Réinitialiser l'odométrie", "Naviguer vers un point"],
          ["Blocage", "Non (asynchrone)", "Oui (le client attend)", "Non (feedback continu)"],
          ["CLI", "`ros2 topic echo`", "`ros2 service call`", "`ros2 action send_goal`"],
        ],
      },
      {
        kind: "command",
        label: "Appeler un service",
        command: "ros2 service list",
        why: "Liste les services disponibles. Puis `ros2 service call /reset_simulation std_srvs/srv/Empty` appelle un service sans argument — le test manuel le plus simple.",
      },
      {
        kind: "text",
        text: "Règle de choix : flux continu = topic, question ponctuelle = service, tâche longue avec suivi = action (ex. : la navigation envoie des buts avec retour d'avancement et possibilité d'annulation — impossible proprement avec un service bloquant).",
      },
    ],
  },
  {
    id: "launch-files",
    title: "Launch files : démarrer tout le système",
    level: 2,
    intro:
      "Un robot = des dizaines de nœuds : les lancer un par un n'est pas viable.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Launch file Python minimal",
        code: "from launch import LaunchDescription\nfrom launch_ros.actions import Node\n\ndef generate_launch_description():\n    return LaunchDescription([\n        Node(package=\"demo_nodes_cpp\", executable=\"talker\"),\n        Node(package=\"demo_nodes_cpp\", executable=\"listener\"),\n        Node(package=\"mon_robot\", executable=\"controle\",\n             parameters=[{\"vitesse_max\": 0.5}],\n             remappings=[(\"/cmd_vel\", \"/robot/cmd_vel\")]),\n    ])",
      },
      {
        kind: "command",
        label: "Lancer le système",
        command: "ros2 launch mon_robot robot.launch.py",
        why: "Démarre tous les nœuds décrits, avec leurs paramètres et remappages. Un seul fichier = tout le système, versionnable et reproductible.",
      },
      {
        kind: "text",
        text: "Les launch files Python permettent paramètres, remappages de topics, conditions et inclusions d'autres launch files : c'est le chef d'orchestre du système, et le premier fichier à lire pour comprendre un projet ROS 2.",
      },
    ],
  },
  {
    id: "urdf-premier",
    title: "URDF : décrire le robot",
    level: 2,
    intro:
      "La carte d'identité mécanique du robot, en XML.",
    blocks: [
      {
        kind: "text",
        text: "L'URDF (Unified Robot Description Format) décrit la géométrie (liens), les articulations (joints : fixes, rotoïdes, prismatiques), les masses et inerties. Gazebo s'en sert pour la simulation physique, RViz pour la visualisation, et les bibliothèques de cinématique pour les calculs.",
      },
      {
        kind: "code",
        language: "xml",
        title: "Extrait URDF : base + roue",
        code: "<robot name=\"mon_robot\">\n  <link name=\"base\">\n    <visual>\n      <geometry><box size=\"0.4 0.3 0.15\"/></geometry>\n    </visual>\n  </link>\n  <joint name=\"roue_g\" type=\"continuous\">\n    <parent link=\"base\"/>\n    <child link=\"roue_gauche\"/>\n    <origin xyz=\"0 0.18 0\"/>\n    <axis xyz=\"0 1 0\"/>\n  </joint>\n</robot>",
      },
      {
        kind: "text",
        text: "Un URDF se visualise avec `robot_state_publisher` + RViz avant toute simulation : une erreur de repère ou d'axe se voit immédiatement en 3D, alors qu'elle est invisible dans le XML.",
      },
    ],
  },
  {
    id: "gazebo-decouverte",
    title: "Découverte de Gazebo",
    level: 2,
    intro:
      "Le jumeau virtuel : tester sans casser de matériel.",
    blocks: [
      {
        kind: "text",
        text: "Gazebo simule la physique (gravité, collisions, frottements) et les capteurs (caméra, LiDAR, IMU) à partir de la description du robot. On y teste la navigation, le contrôle et la perception sur un jumeau virtuel avant de brancher le robot réel — où chaque bug coûte du matériel.",
      },
      {
        kind: "list",
        items: [
          "Le pont ROS 2 ↔ Gazebo expose les capteurs simulés comme des topics standards : le même code tourne en simu et sur le robot.",
          "Commencez par spawner un robot existant (TurtleBot3) avant de simuler le vôtre : la chaîne complète est déjà câblée.",
          "La simulation ne remplace pas les tests réels : frottements, bruit capteur et latences y sont idéalisés — prévoyez toujours une phase sur matériel.",
        ],
      },
    ],
  },
  {
    id: "debugging-bases",
    title: "Debugging : les bases",
    level: 2,
    intro:
      "Quand le robot ne fait pas ce qu'on lui demande.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Le nœud tourne-t-il ?",
            detail: "`ros2 node list` : absent = plantage au démarrage (lire les logs du terminal ou `ros2 launch` en avant-plan) ou environnement non sourcé.",
          },
          {
            title: "Les topics sont-ils alimentés ?",
            detail: "`ros2 topic echo /mon_topic` : silence = le publisher ne publie pas. `ros2 topic hz` : fréquence anormale = problème de performance ou de callback.",
          },
          {
            title: "Les noms correspondent-ils ?",
            detail: "`ros2 topic info` des deux côtés : un remappage manquant (`/cmd_vel` vs `/robot/cmd_vel`) est la cause n°1 des « ça ne bouge pas ».",
          },
          {
            title: "Voir le graphe",
            detail: "`rqt_graph` : un nœud isolé ou un topic sans subscriber révèle immédiatement l'erreur de câblage.",
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
      "Trois paliers pour construire un vrai système.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Téléopération",
            detail: "Pilotez un robot simulé au clavier : un nœud lit les touches, publie sur `/cmd_vel`, le robot bouge dans Gazebo. Premier système bouclé.",
          },
          {
            title: "Robot suiveur",
            detail: "Caméra simulée → topic image → nœud vision (détection d'une couleur) → topic `/cmd_vel` → le robot suit une cible. Chaîne perception-action complète.",
          },
          {
            title: "Stack multi-nœuds",
            detail: "Architecture complète avec launch file : description URDF, simulation, téléopération, enregistrement `ros2 bag`, visualisation RViz. Le mini-système robotique de référence.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-detail",
    title: "Architecture : nœuds, topics, services, actions",
    level: 3,
    intro:
      "Le modèle de calcul de ROS 2 en profondeur : quand utiliser quoi.",
    blocks: [
      {
        kind: "diagram",
        title: "Le graphe d'un robot ROS 2",
        lines: [
          "  [capteur_lidar]      [camera]",
          "        │  /scan           │  /image",
          "        ▼                 ▼",
          "  [perception] ──/obstacles──▶ [planification]",
          "                                      │  /plan",
          "                                      ▼",
          "                              [controle] ──/cmd_vel──▶ [moteurs]",
          "                                      ▲",
          "                                 /odom",
          "                              [localisation]",
        ],
      },
      {
        kind: "text",
        text: "Chaque nœud est un processus indépendant avec une responsabilité unique : un nœud qui plante ne fait pas tomber les autres (contrairement au monolithe). Les topics portent les flux continus, les services les requêtes ponctuelles, les actions les tâches longues, et TF (voir section dédiée) les repères géométriques.",
      },
    ],
  },
  {
    id: "messages-interfaces",
    title: "Messages et interfaces",
    level: 3,
    intro:
      "Le contrat entre nœuds : des types partagés, versionnés, générés.",
    blocks: [
      {
        kind: "text",
        text: "Les messages se définissent en `.msg` (ex. `string nom`, `float32 vitesse`), les services en `.srv` (requête `---` réponse), les actions en `.action` (but `---` feedback `---` résultat). À la compilation, `rosidl` génère les classes Python/C++ correspondantes : le même `.msg` sert aux deux langages.",
      },
      {
        kind: "list",
        items: [
          "Réutilisez les packages standards (`std_msgs`, `sensor_msgs`, `geometry_msgs`, `nav_msgs`) avant de créer vos propres messages : l'interopérabilité avec l'écosystème en dépend.",
          "Un message personnalisé couple tous ses utilisateurs : ne créez un `.msg` que quand aucun standard ne convient.",
          "Inspectez un type avec `ros2 interface show geometry_msgs/msg/Twist` — la documentation vivante des messages.",
        ],
      },
    ],
  },
  {
    id: "packages-colcon",
    title: "Packages et colcon",
    level: 3,
    intro:
      "L'unité de distribution de ROS 2 : structurer pour réutiliser.",
    blocks: [
      {
        kind: "text",
        text: "Un package = un dossier avec `package.xml` (nom, version, dépendances, mainteneur) et un système de build (`ament_python` pour Python, `ament_cmake` pour C++). `colcon build` compile l'ensemble du workspace en respectant l'ordre des dépendances.",
      },
      {
        kind: "list",
        items: [
          "Déclarez toutes les dépendances dans `package.xml` : un package qui compile « par chance » grâce à l'environnement cassera sur une autre machine.",
          "`colcon build --packages-select mon_package` ne recompile qu'un package — indispensable sur les gros workspaces.",
          "`rosdep install` installe les dépendances système déclarées : la commande qui rend un workspace cloné compilable.",
          "Un package, une responsabilité : `mon_robot_description` (URDF), `mon_robot_bringup` (launch), `mon_robot_control` (nœuds) — pas un fourre-tout.",
        ],
      },
    ],
  },
  {
    id: "parametres",
    title: "Paramètres",
    level: 3,
    intro:
      "Configurer les nœuds sans recompiler : vitesses, seuils, topics.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Déclarer et lire un paramètre",
        code: "class Controle(Node):\n    def __init__(self):\n        super().__init__(\"controle\")\n        self.declare_parameter(\"vitesse_max\", 0.5)\n        self.vitesse_max = self.get_parameter(\"vitesse_max\").value",
      },
      {
        kind: "command",
        label: "Inspecter et modifier à chaud",
        command: "ros2 param list",
        why: "Liste les paramètres de chaque nœud. `ros2 param get /controle vitesse_max` lit, `ros2 param set /controle vitesse_max 1.0` modifie sans redémarrer — idéal pour régler un PID ou un seuil en direct.",
      },
      {
        kind: "text",
        text: "Les paramètres se chargent aussi depuis des fichiers YAML dans les launch files : toute la configuration du robot versionnée en un endroit. Règle : ce qui varie entre simu et réel, ou d'un réglage à l'autre, est un paramètre — jamais une constante en dur.",
      },
    ],
  },
  {
    id: "tf2",
    title: "TF2 : les transformations",
    level: 3,
    intro:
      "Savoir où est chaque partie du robot, à chaque instant.",
    blocks: [
      {
        kind: "text",
        text: "TF2 maintient l'arbre des repères (`map` → `odom` → `base_link` → `camera_link`…) et leurs transformations dans le temps. Un nœud demande « où est l'obstacle vu par la caméra, exprimé dans le repère du robot ? » et TF2 calcule la chaîne — avec interpolation temporelle.",
      },
      {
        kind: "list",
        items: [
          "L'URDF définit les transformations statiques (publiées par `robot_state_publisher`) ; l'odométrie et la localisation publient les dynamiques.",
          "Erreurs classiques : deux nœuds publiant le même repère, boucle dans l'arbre, ou repères sans parent — `view_frames` génère un PDF de l'arbre pour diagnostiquer.",
          "Toujours horodater les transformations : une TF sans timestamp correct rend la fusion de capteurs incohérente.",
        ],
      },
    ],
  },
  {
    id: "urdf-detail",
    title: "URDF en détail",
    level: 3,
    intro:
      "Aller au-delà de la géométrie : inertie, collisions, transmissions.",
    blocks: [
      {
        kind: "text",
        text: "Un URDF complet distingue trois géométries par lien : `visual` (ce qu'on voit), `collision` (souvent simplifiée pour la physique — un cylindre au lieu d'un mesh complexe), et `inertial` (masse + matrice d'inertie, indispensables pour une simulation réaliste). Sans inertie correcte, Gazebo simule un robot au comportement fantaisiste.",
      },
      {
        kind: "list",
        items: [
          "Types de joints : `fixed`, `revolute` (avec limites), `continuous` (rotation infinie : roues), `prismatic` (translation).",
          "Vérifiez toujours l'URDF avec `check_urdf` avant de simuler : un XML invalide produit des erreurs cryptiques.",
          "Les meshes (STL/DAE) sont pour le visuel ; préférez les primitives (box, cylinder, sphere) pour la collision — la physique vous remerciera.",
        ],
      },
    ],
  },
  {
    id: "xacro",
    title: "Xacro : des URDF maintenables",
    level: 3,
    intro:
      "Macros et variables pour ne pas répéter chaque roue quatre fois.",
    blocks: [
      {
        kind: "code",
        language: "xml",
        title: "Macro de roue réutilisée",
        code: "<xacro:macro name=\"roue\" params=\"prefix x y\">\n  <link name=\"${prefix}_roue\">\n    <visual><geometry><cylinder radius=\"0.05\" length=\"0.04\"/></geometry></visual>\n  </link>\n  <joint name=\"${prefix}_joint\" type=\"continuous\">\n    <parent link=\"base\"/>\n    <child link=\"${prefix}_roue\"/>\n    <origin xyz=\"${x} ${y} 0\"/>\n    <axis xyz=\"0 1 0\"/>\n  </joint>\n</xacro:macro>\n<xacro:roue prefix=\"avant_g\" x=\"0.15\" y=\"0.18\"/>\n<xacro:roue prefix=\"avant_d\" x=\"0.15\" y=\"-0.18\"/>",
      },
      {
        kind: "text",
        text: "Xacro génère l'URDF final à partir de macros, variables et conditions : un robot à 4 roues se décrit une fois. Le launch file convertit le `.xacro` en URDF au démarrage — l'URDF reste le format d'échange, Xacro le format de travail.",
      },
    ],
  },
  {
    id: "launch-python-avance",
    title: "Launch files avancés",
    level: 3,
    intro:
      "Conditions, arguments, inclusions : un vrai système de démarrage.",
    blocks: [
      {
        kind: "text",
        text: "Au-delà de la liste de nœuds : `DeclareLaunchArgument` expose des options (`simu:=true`), `IfCondition`/`UnlessCondition` activent des nœuds selon le contexte, `IncludeLaunchDescription` compose des sous-systèmes (un launch `bringup` qui inclut perception + navigation + contrôle).",
      },
      {
        kind: "list",
        items: [
          "Un launch `bringup` par robot : c'est le point d'entrée documenté du système (« pour démarrer le robot : ce launch »).",
          "Les paramètres par défaut vivent dans des YAML versionnés, surchargeables par arguments — jamais en dur dans le launch.",
          "Testez les launch files en CI (`launch_testing`) : un topic renommé qui casse un remappage doit échouer avant le robot.",
        ],
      },
    ],
  },
  {
    id: "qos",
    title: "QoS : la qualité de service",
    level: 3,
    intro:
      "Régler la fiabilité, la durabilité et l'historique de chaque topic.",
    blocks: [
      {
        kind: "text",
        text: "Chaque publisher/subscriber déclare une QoS : fiabilité (`reliable` vs `best_effort`), durabilité (`volatile` vs `transient_local` — ce dernier rejoue les derniers messages aux abonnés tardifs), historique (combien de messages garder). Deux extrémités incompatibles ne se connectent pas — une source fréquente de « ça ne reçoit rien ».",
      },
      {
        kind: "list",
        items: [
          "Capteurs temps réel (images, LiDAR) : `best_effort` + petit historique — mieux vaut rater une trame que s'embouteiller.",
          "État et configuration (carte, paramètres) : `transient_local` + `reliable` — les abonnés tardifs reçoivent la dernière valeur.",
          "Commandes critiques : `reliable` — on ne veut pas perdre un ordre d'arrêt.",
          "`ros2 topic info -v` affiche les QoS des deux côtés : le premier diagnostic d'incompatibilité.",
        ],
      },
    ],
  },
  {
    id: "lifecycle",
    title: "Nœuds lifecycle",
    level: 3,
    intro:
      "Démarrer un système complexe dans l'ordre : des états explicites.",
    blocks: [
      {
        kind: "text",
        text: "Un nœud lifecycle traverse des états : `unconfigured` → `inactive` → `active` → `finalized`, avec des transitions (`configure`, `activate`, `deactivate`) déclenchées par un superviseur. Intérêt : démarrer la perception avant la planification, dans un ordre garanti — au lieu d'espérer que les nœuds soient prêts « à peu près » en même temps.",
      },
      {
        kind: "text",
        text: "La stack de navigation Nav2 utilise massivement les lifecycle nodes : c'est le pattern de référence pour les systèmes où l'ordre de démarrage compte. En contrepartie, plus de code et un superviseur à écrire — réservez-le aux systèmes qui en ont vraiment besoin.",
      },
    ],
  },
  {
    id: "composition",
    title: "Composition de nœuds",
    level: 3,
    intro:
      "Zéro-copie : quand les messages ne doivent pas traverser les processus.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, chaque nœud est un processus : les messages sont sérialisés entre eux. La composition charge plusieurs nœuds dans un même processus (conteneur de composants) : les messages transitent par pointeur, sans copie ni sérialisation. Pour un flux caméra 30 Hz haute résolution, c'est la différence entre « ça passe » et « ça sature le CPU ».",
      },
      {
        kind: "text",
        text: "Compromis : un composant qui plante fait tomber tout le conteneur — on perd l'isolation des processus. Utilisez la composition pour les chaînes gourmandes (perception), gardez des processus séparés pour les nœuds critiques ou instables.",
      },
    ],
  },
  {
    id: "dds",
    title: "DDS : le middleware sous ROS 2",
    level: 3,
    intro:
      "Ce qui transporte vraiment les messages : comprendre pour diagnostiquer.",
    blocks: [
      {
        kind: "text",
        text: "ROS 2 s'appuie sur DDS (Data Distribution Service) pour la découverte et le transport : pas de maître central, les nœuds se découvrent en multicast sur le réseau. C'est ce qui rend ROS 2 distribué par nature — et ce qui explique certains comportements réseau.",
      },
      {
        kind: "list",
        items: [
          "`ROS_DOMAIN_ID` isole les systèmes sur le même réseau : deux robots = deux domain IDs, sinon ils se voient et se parlent.",
          "Le multicast peut être bloqué (VPN, certains Wi-Fi) : la découverte échoue alors silencieusement — symptôme typique, des nœuds qui ne se voient pas.",
          "Plusieurs implémentations DDS existent (Fast DDS par défaut, Cyclone DDS) : interchangeables, avec des réglages fins pour le temps réel.",
        ],
      },
    ],
  },
  {
    id: "ros2-bag",
    title: "ros2 bag : enregistrer et rejouer",
    level: 3,
    intro:
      "Le magnétoscope du roboticien : rejouer une session capteur à volonté.",
    blocks: [
      {
        kind: "command",
        label: "Enregistrer une session",
        command: "ros2 bag record -o session1 /scan /odom /camera/image",
        why: "Enregistre les topics listés dans un dossier `session1`. On rejoue ensuite la session en boucle pendant le développement de la perception — sans ressortir le robot.",
        verify: "ros2 bag info session1",
      },
      {
        kind: "command",
        label: "Rejouer",
        command: "ros2 bag play session1 --loop",
        why: "Republie les messages enregistrés comme si les capteurs étaient en direct. `--loop` rejoue en boucle pour les sessions de debug prolongées.",
      },
      {
        kind: "text",
        text: "Workflow typique : une sortie terrain → enregistrement → des semaines de développement rejouant les mêmes données (reproductibilité garantie). Les bags sont aussi la matière première des datasets d'apprentissage.",
      },
    ],
  },
  {
    id: "rqt",
    title: "rqt : la boîte à outils graphique",
    level: 3,
    intro:
      "Au-delà de `rqt_graph` : les plugins qui accélèrent le debug.",
    blocks: [
      {
        kind: "fields",
        title: "Plugins utiles",
        fields: [
          {
            label: "`rqt_graph`",
            value:
              "Le graphe nœuds/topics : voir la structure du système et repérer les câblages manquants.",
          },
          {
            label: "`rqt_plot`",
            value:
              "Tracer un champ de message en temps réel (vitesse, position) : régler un contrôleur à l'œil.",
          },
          {
            label: "`rqt_reconfigure`",
            value:
              "Modifier les paramètres dynamiques avec des curseurs : régler un PID sans redémarrer.",
          },
          {
            label: "`rqt_bag`",
            value:
              "Visualiser et rejouer les bags avec une timeline.",
          },
          {
            label: "`rqt_console`",
            value:
              "Agréger les logs de tous les nœuds avec filtres par sévérité.",
          },
        ],
      },
    ],
  },
  {
    id: "rviz",
    title: "RViz : visualiser le robot",
    level: 3,
    intro:
      "Voir ce que le robot perçoit et décide, en 3D.",
    blocks: [
      {
        kind: "text",
        text: "RViz affiche le modèle URDF, les nuages de points LiDAR, les images caméra, les trajectoires planifiées, les repères TF — superposés dans la même scène 3D. C'est l'instrument de bord du développement : on y vérifie que la perception correspond au monde et que la planification produit des trajectoires sensées.",
      },
      {
        kind: "list",
        items: [
          "Les configurations RViz se sauvegardent (`.rviz`) : une config par usage (debug perception, debug navigation) versionnée avec le projet.",
          "RViz ne montre que ce qu'on lui demande : un robot « aveugle » dans RViz mais qui bouge signale souvent un topic mal orthographié dans la config d'affichage.",
          "Couplé à `ros2 bag play`, RViz permet de revoir une session complète en 3D.",
        ],
      },
    ],
  },
  {
    id: "gazebo-detail",
    title: "Gazebo en détail",
    level: 3,
    intro:
      "De la visualisation à la simulation physique crédible.",
    blocks: [
      {
        kind: "text",
        text: "Gazebo simule la dynamique (moteurs, frottements, gravité) et les capteurs (caméra avec bruit, LiDAR avec portée, IMU avec dérive) via des plugins qui publient sur les topics ROS 2 standards. Le même nœud de contrôle commande le robot simulé et le robot réel — seule la source des topics change.",
      },
      {
        kind: "list",
        items: [
          "Réglez les propriétés physiques (friction, masse) : des valeurs par défaut irréalistes donnent un robot qui glisse ou flotte.",
          "Ajoutez du bruit aux capteurs simulés : un LiDAR parfait en simu donne une navigation qui échoue sur le capteur réel bruité.",
          "Les mondes Gazebo se versionnent : un monde de test reproductible (couloir, porte, obstacles) est un banc d'essai.",
          "Limites : contacts complexes, déformations, et interactions fines restent approximatifs — la simu valide la logique, pas la mécanique.",
        ],
      },
    ],
  },
  {
    id: "nav2",
    title: "Nav2 : la navigation",
    level: 3,
    intro:
      "Le stack de navigation standard : de la carte au mouvement.",
    blocks: [
      {
        kind: "diagram",
        title: "Pipeline Nav2 simplifié",
        lines: [
          "/scan (LiDAR) ──▶ Cartographie / Localisation (AMCL)",
          "                        │  /map, /pose",
          "                        ▼",
          "But (/goal_pose) ──▶ Planificateur global (trajectoire)",
          "                        │",
          "                        ▼",
          "                   Contrôleur local (évite obstacles)",
          "                        │  /cmd_vel",
          "                        ▼",
          "                     Moteurs",
        ],
      },
      {
        kind: "text",
        text: "Nav2 assemble : localisation (où suis-je sur la carte ?), planification globale (quel chemin ?), contrôle local (comment suivre le chemin en évitant les obstacles dynamiques ?), et comportements de récupération (que faire si bloqué ?). C'est un système de lifecycle nodes paramétrable en YAML — puissant, mais avec une courbe d'apprentissage réelle : commencez par le tutoriel TurtleBot3 avant votre robot.",
      },
    ],
  },
  {
    id: "moveit",
    title: "MoveIt : la manipulation",
    level: 3,
    intro:
      "Le pendant de Nav2 pour les bras robotiques.",
    blocks: [
      {
        kind: "text",
        text: "MoveIt planifie les trajectoires d'un bras : cinématique inverse (quelle posture pour atteindre ce point ?), planification sans collision, exécution contrôlée. Il se configure depuis l'URDF via un assistant graphique qui génère le package de configuration.",
      },
      {
        kind: "text",
        text: "Comme Nav2, c'est un framework à apprivoiser : faites d'abord bouger un bras simulé (Panda, UR) dans les tutoriels avant d'attaquer votre matériel. La planification est probabiliste — prévoyez toujours des vérifications (but atteignable ? trajectoire valide ?) avant l'exécution sur le robot réel.",
      },
    ],
  },
  {
    id: "perception",
    title: "Perception : la chaîne image",
    level: 3,
    intro:
      "De l'image brute à l'information exploitable.",
    blocks: [
      {
        kind: "text",
        text: "Chaîne typique : `image_raw` → calibration (`camera_info`) → rectification → détection (couleur, ArUco, réseau de neurones) → position 3D via TF. Chaque étape est un nœud, chaque étape est testable séparément avec `ros2 bag` rejouant une session.",
      },
      {
        kind: "list",
        items: [
          "Calibrez la caméra (`camera_calibration`) : sans intrinsèques corrects, toute mesure 3D est fausse.",
          "Compressez le transport (`image_transport`) : une image brute 1080p à 30 Hz sature vite un lien Wi-Fi.",
          "Les marqueurs ArUco donnent une vérité terrain bon marché pour valider une chaîne de détection avant le deep learning.",
          "Synchronisez les capteurs (`message_filters`) : fusionner une image et un scan LiDAR décalés de 200 ms produit des fantômes.",
        ],
      },
    ],
  },
  {
    id: "reseau-multi-machines",
    title: "Réseau multi-machines",
    level: 3,
    intro:
      "Faire parler le robot et la station de développement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Même `ROS_DOMAIN_ID` des deux côtés, horloges synchronisées (chrony/NTP) : des timestamps incohérents cassent TF et la fusion de capteurs.",
          "Le multicast de découverte doit passer : sur certains réseaux (VPN, Wi-Fi d'entreprise), prévoyez une configuration DDS unicast.",
          "Séparez les flux : les topics gourmands (images) restent si possible en local au robot ; la station reçoit les topics légers (état, diagnostics).",
          "Sécurité : le trafic DDS n'est pas chiffré par défaut — SROS2 (voir section dédiée) sur un réseau non fiable.",
          "Testez la latence réelle (`ros2 topic hz` des deux côtés) : une téléopération sur 300 ms de latence est inutilisable.",
        ],
      },
    ],
  },
  {
    id: "securite-sros2",
    title: "Sécurité : SROS2",
    level: 3,
    intro:
      "Chiffrer et authentifier quand le robot quitte le labo.",
    blocks: [
      {
        kind: "text",
        text: "SROS2 apporte à ROS 2 : authentification des nœuds (qui peut rejoindre le graphe ?), contrôle d'accès (qui peut publier sur `/cmd_vel` ?), chiffrement du transport. Sans ça, quiconque sur le réseau peut publier des ordres de mouvement — acceptable en labo, inacceptable en production.",
      },
      {
        kind: "text",
        text: "Mise en place : génération de clés, politiques d'accès par nœud, activation via variables d'environnement. À intégrer dès que le robot est sur un réseau partagé — pas « plus tard ».",
      },
    ],
  },
  {
    id: "ros2-doctor",
    title: "Diagnostic : ros2 doctor",
    level: 3,
    intro:
      "Le check-up automatique du système.",
    blocks: [
      {
        kind: "command",
        label: "Examiner le système",
        command: "ros2 doctor",
        why: "Vérifie l'environnement : versions, variables, réseau, multicast, permissions. `ros2 doctor --report` génère un rapport complet à joindre quand on demande de l'aide.",
      },
      {
        kind: "text",
        text: "Utilisez-le en premier réflexe quand « ça marchait hier » : une variable d'environnement perdue, un domain ID changé ou un multicast bloqué apparaissent dans le rapport avant des heures de debug manuel.",
      },
    ],
  },
  {
    id: "testing-launch",
    title: "Tester : launch_testing",
    level: 3,
    intro:
      "Des tests qui démarrent de vrais nœuds.",
    blocks: [
      {
        kind: "text",
        text: "`launch_testing` lance des nœuds réels dans un test : on vérifie qu'un publisher émet, qu'un service répond, qu'un launch file démarre sans erreur. C'est le niveau d'intégration qui attrape les régressions de câblage (topic renommé, QoS incompatible) que les tests unitaires ne voient pas.",
      },
      {
        kind: "list",
        items: [
          "Testez les interfaces (messages, services) en unitaire, les interactions en `launch_testing`.",
          "Les tests doivent tourner en CI sur des runners avec ROS 2 installé — prévoyez une image Docker dédiée.",
          "Simulez les entrées avec `ros2 topic pub` scripté plutôt qu'avec du matériel : déterministe et rapide.",
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand les bases ne suffisent pas.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "Logs centralisés",
            value:
              "`ros2 launch` agrège les logs ; `rqt_console` les filtre par nœud et sévérité. Les logs avec timestamps permettent de corréler avec `ros2 bag`.",
          },
          {
            label: "Tracer un message",
            value:
              "Du publisher (`ros2 topic pub` manuel) au subscriber (`ros2 topic echo`) en passant par `rqt_graph` : isolez chaque maillon pour trouver celui qui casse la chaîne.",
          },
          {
            label: "QoS incompatibles",
            value:
              "`ros2 topic info -v` : si les QoS ne correspondent pas, il n'y a pas de connexion — et aucun message d'erreur explicite.",
          },
          {
            label: "DDS et réseau",
            value:
              "`ros2 multicast send/receive` teste la découverte multicast. Si ça échoue, le problème est réseau, pas ROS.",
          },
          {
            label: "Rejeu déterministe",
            value:
              "Un bug non reproductible en direct se capture en `ros2 bag` puis se rejoue en boucle jusqu'à l'isoler.",
          },
        ],
      },
    ],
  },
  {
    id: "temps-reel",
    title: "Temps réel et performance",
    level: 3,
    intro:
      "Quand la latence compte : les leviers ROS 2.",
    blocks: [
      {
        kind: "list",
        items: [
          "Callbacks et executors : un callback long bloque les autres — découpez, ou utilisez des callback groups mutuellement exclusifs.",
          "Composition (zéro-copie) pour les flux gourmands : images, nuages de points.",
          "QoS `best_effort` sur les capteurs temps réel : mieux vaut une trame perdue qu'un embouteillage.",
          "DDS temps réel (Cyclone DDS, réglages) et noyau Linux temps réel (PREEMPT_RT) pour les boucles de contrôle critiques.",
          "Mesurez : `ros2 topic hz` (débit), latence de bout en bout via timestamps des messages — pas d'intuition.",
        ],
      },
    ],
  },
  {
    id: "simu-vers-reel",
    title: "De la simulation au réel",
    level: 3,
    intro:
      "Le fossé sim-to-real : pourquoi un robot parfait en simu échoue dehors, et comment le réduire.",
    blocks: [
      {
        kind: "text",
        text: "La simulation idéalise : frottements constants, capteurs sans bruit, latences nulles, monde parfaitement connu. Le robot réel apporte le bruit capteur, les jeux mécaniques, les latences réseau et l'imprévu. Un système validé uniquement en simu est un système non validé.",
      },
      {
        kind: "list",
        items: [
          "Dégradez volontairement la simu : bruit sur les capteurs, latences injectées, paramètres physiques variés (domain randomization) — un contrôleur robuste à la simu bruitée survit mieux au réel.",
          "Validez par étapes : d'abord le robot tenu en l'air (moteurs seuls), puis au sol en zone dégagée, puis en environnement réel.",
          "Enregistrez tout en `ros2 bag` dès les premiers essais réels : chaque session terrain alimente le debug et les tests de non-régression.",
          "Gardez les mêmes topics et interfaces entre simu et réel : seul le backend change, le reste du système ne voit pas la différence.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Le bestiaire des débuts en ROS 2.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Oublier de sourcer",
            value:
              "Problème : `ros2` ne trouve ni les commandes ni vos packages. Solution : `source /opt/ros/<distro>/setup.bash` + `source install/setup.bash`, idéalement dans le `.bashrc`.",
          },
          {
            label: "Noms de topics incohérents",
            value:
              "Problème : le nœud publie sur `/cmd_vel`, le robot écoute `/robot/cmd_vel`. Solution : `rqt_graph` + remappages explicites dans le launch file.",
          },
          {
            label: "QoS incompatibles",
            value:
              "Problème : publisher `reliable`, subscriber `best_effort` — pas de connexion, pas d'erreur. Solution : `ros2 topic info -v` et QoS explicites des deux côtés.",
          },
          {
            label: "Dépendances non déclarées",
            value:
              "Problème : ça compile chez vous, pas sur une autre machine. Solution : tout déclarer dans `package.xml`, `rosdep install` en CI.",
          },
          {
            label: "Tester uniquement en simulation",
            value:
              "Problème : la simu idéalisée masque bruit, latence et frottements réels. Solution : phase matériel prévue dès le début, bags enregistrés sur le terrain.",
          },
          {
            label: "Un seul launch file géant",
            value:
              "Problème : 300 lignes imbriquées, incompréhensible. Solution : un launch par sous-système, inclus dans un `bringup` — comme des modules.",
          },
          {
            label: "Ignorer les warnings de dépréciation",
            value:
              "Problème : le code casse à la prochaine distribution. Solution : traiter les warnings à chaque montée de version, suivre le calendrier des distributions.",
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
          "Un nœud, une responsabilité : des nœuds petits, testables, remplaçables.",
          "Interfaces standard d'abord : `sensor_msgs`, `geometry_msgs` avant tout message maison.",
          "Paramètres, pas constantes : tout ce qui peut varier est un paramètre YAML versionné.",
          "Launch files modulaires : un `bringup` qui assemble des sous-systèmes.",
          "Nommage cohérent : topics en minuscules hiérarchiques, nœuds descriptifs.",
          "Simuler avant le matériel, mais valider sur le matériel : les deux, toujours.",
          "Enregistrer en bag : toute session terrain est un actif de debug et de dataset.",
          "Sécurité (SROS2) dès que le réseau n'est plus un labo fermé.",
          "Tester les interactions (`launch_testing`), pas seulement les fonctions.",
          "Documenter l'architecture : le graphe de nœuds se lit mal dans le code seul.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "Documentation ROS 2",
            value:
              "docs.ros.org : tutoriels par distribution (installation, nœuds, topics, launch, URDF), concepts et guides avancés. Le point de départ et la référence.",
          },
          {
            label: "Tutoriels Nav2 et MoveIt",
            value:
              "Les documentations officielles des deux stacks : les suivre sur robot simulé avant tout projet réel.",
          },
          {
            label: "ROS Answers / Robotics Stack Exchange",
            value:
              "Les questions/réponses de la communauté : la plupart des erreurs classiques y sont déjà documentées.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : le TurtleBot3 (simulé) est le banc d'essai standard — navigation, cartographie et suivi y sont déjà câblés.",
          "Événements : les conférences ROSCon publient leurs talks — une veille précieuse sur les usages industriels.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "ROS 2 maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "`python` : écrire des nœuds robustes en Python — et passer au C++ temps réel (rclcpp) quand les performances l’exigent.",
          "`controle` : la théorie du contrôle — PID, stabilité, asservissement des actionneurs.",
          "`perception` : choisir, calibrer et filtrer les capteurs qui alimentent vos topics.",
          "`computer-vision` : la perception avancée au-delà de la détection de couleur.",
          "`machine-learning` : apprendre des comportements au lieu de les programmer.",
          "`electronique` / `systemes-embarques` : descendre au niveau du microcontrôleur qui pilote les moteurs.",
          "Revenir à la roadmap : valider ROS et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

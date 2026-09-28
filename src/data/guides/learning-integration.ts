import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'intégration système en robotique : assembler
 * hardware, middleware et autonomie en un robot fiable. Architecture, tests
 * système, sécurité, déploiement. Les commandes ROS 2 citées sont des
 * commandes standard vérifiables (`ros2 topic list`, `ros2 bag record`…).
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_INTEGRATION: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction : du prototype au produit",
    level: 1,
    intro:
      "L'intégration assemble les briques (mécanique, électronique, logiciel, autonomie) en un système qui fonctionne des heures, pas des minutes.",
    blocks: [
      {
        kind: "text",
        text: "Un robot n'est pas une collection de démos : c'est un système où le capteur parle au middleware, le middleware au planificateur, le planificateur aux moteurs — et où tout doit continuer à marcher après 8 heures de fonctionnement, une batterie faible et un capteur qui décroche. L'intégration, c'est penser le système complet : interfaces, tests, sécurité, maintenance.",
      },
      {
        kind: "diagram",
        title: "Les couches d'un robot intégré",
        lines: [
          "MISSION (ce que le robot doit accomplir)",
          "     │",
          "     ▼",
          "AUTONOMIE (perception → planification → contrôle)",
          "     │",
          "     ▼",
          "MIDDLEWARE (ROS 2 : nœuds, topics, services)",
          "     │",
          "     ▼",
          "EMBARQUÉ (firmware temps réel, drivers)",
          "     │",
          "     ▼",
          "HARDWARE (mécanique, électronique, énergie)",
          "     │",
          "     └── chaque couche a des interfaces définies",
          "         et des tests qui la valident",
        ],
      },
      {
        kind: "text",
        text: "Le constat qui fonde la discipline : la plupart des échecs robotiques ne viennent pas d'une brique défaillante, mais des interfaces entre briques — un topic mal nommé, une horloge désynchronisée, une hypothèse implicite sur le format d'une donnée. L'intégrateur est celui qui traque ces hypothèses.",
      },
    ],
  },
  {
    id: "ce-que-couvre-l-integration",
    title: "Ce que couvre l'intégration",
    level: 1,
    intro:
      "Cinq chantiers qui transforment un assemblage de prototypes en robot livrable.",
    blocks: [
      {
        kind: "fields",
        title: "Les cinq chantiers",
        fields: [
          {
            label: "Architecture",
            value:
              "Découper le système en modules aux interfaces claires : qui publie quoi, qui appelle qui, dans quel ordre ça démarre.",
          },
          {
            label: "Tests système",
            value:
              "Valider le robot complet dans des scénarios réalistes, pas chaque brique isolée dans son coin.",
          },
          {
            label: "Sécurité",
            value:
              "Bouton d'arrêt, comportements de repli, zones de sécurité : un robot qui bouge doit d'abord ne blesser personne.",
          },
          {
            label: "Exploitation",
            value:
              "Démarrage automatique, journalisation, diagnostic, mises à jour : le robot doit vivre sans son développeur à côté.",
          },
          {
            label: "Documentation",
            value:
              "Décrire l'architecture, les procédures et les limites : un robot sans documentation est un prototype, pas un produit.",
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
      "On n'intègre bien que ce qu'on comprend : trois fondations techniques.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir, et pourquoi",
        fields: [
          {
            label: "ROS 2 : nœuds, topics, launch",
            value:
              "Assembler les nœuds en système cohérent : architecture des topics, fichiers de lancement, paramètres. Le middleware est le ciment de l'intégration.",
          },
          {
            label: "Systèmes embarqués : la couche basse",
            value:
              "Fiabiliser le firmware : le système complet dépend du temps réel — un driver qui bloque fait planter tout l'édifice.",
          },
          {
            label: "Planification : la décision",
            value:
              "Intégrer la décision autonome dans la boucle complète : le planificateur consomme la perception et commande le contrôle.",
          },
          {
            label: "Linux : le système hôte",
            value:
              "Services au démarrage, réseau, journaux système : le robot tourne sur Linux, et son OS fait partie du système à intégrer.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'intégration est la compétence de synthèse de la roadmap : elle se pratique en assemblant réellement les briques apprises avant. Chaque prérequis est cliquable dans la roadmap.",
      },
    ],
  },
  {
    id: "outillage-integration",
    title: "Outillage : observer le système vivant",
    level: 2,
    intro:
      "Intégrer, c'est voir ce qui circule : les outils d'inspection du middleware.",
    blocks: [
      {
        kind: "command",
        label: "Lister les topics actifs",
        command: "ros2 topic list",
        why: "Affiche tous les canaux de communication actifs du système ROS 2 : c'est la carte du système vivant. Un topic attendu qui n'apparaît pas = un nœud qui ne tourne pas ou qui publie sous un autre nom.",
        verify: "Comparer avec l'architecture prévue : chaque topic attendu doit exister.",
      },
      {
        kind: "command",
        label: "Lister les nœuds actifs",
        command: "ros2 node list",
        why: "Affiche les processus ROS 2 en cours d'exécution. Un nœud manquant explique un topic manquant : on remonte la chaîne du symptôme vers la cause.",
      },
      {
        kind: "command",
        label: "Enregistrer toutes les données",
        command: "ros2 bag record -a",
        why: "Enregistre tous les topics dans un fichier rejouable : la boîte noire du robot. Indispensable pour déboguer après coup un comportement observé en essai.",
        verify: "ros2 bag info <fichier> : vérifier les topics enregistrés et la durée.",
      },
      {
        kind: "text",
        text: "Ces trois commandes forment le triptyque de l'intégrateur : voir la structure (`node list`, `topic list`), capturer le comportement (`bag record`), rejouer et analyser ensuite. Tout diagnostic système commence par là.",
      },
    ],
  },
  {
    id: "concept-tests-systeme",
    title: "Les tests système",
    level: 2,
    intro:
      "Valider le robot complet, pas les briques isolées : scénarios nominaux et cas limites.",
    blocks: [
      {
        kind: "text",
        text: "Un test système fait travailler le robot entier sur un scénario réaliste : naviguer d'un point A à un point B en évitant des obstacles, répéter 10 fois, mesurer le taux de succès. Il ne teste pas « la perception » ou « le contrôle » séparément, mais leur coopération — là où naissent les vrais problèmes.",
      },
      {
        kind: "fields",
        title: "Trois niveaux de tests",
        fields: [
          {
            label: "Tests nominaux",
            value:
              "Le robot fait ce pour quoi il est conçu, dans des conditions normales : le taux de succès doit être proche de 100 % sur des dizaines de répétitions.",
          },
          {
            label: "Tests aux limites",
            value:
              "Batterie faible, obstacle inattendu, capteur occulté, sol glissant : le robot doit soit réussir, soit échouer proprement (arrêt sûr), jamais n'importe comment.",
          },
          {
            label: "Tests d'endurance",
            value:
              "Fonctionnement prolongé (heures) : fuites mémoire, dérives thermiques, usure — les pannes qui n'apparaissent qu'avec le temps.",
          },
        ],
      },
    ],
  },
  {
    id: "concept-securite",
    title: "La sécurité",
    level: 2,
    intro:
      "Un robot qui bouge doit d'abord ne blesser personne : les dispositifs non négociables.",
    blocks: [
      {
        kind: "fields",
        title: "Les dispositifs de sécurité",
        fields: [
          {
            label: "Arrêt d'urgence",
            value:
              "Un bouton (ou plusieurs) qui coupe la puissance des actionneurs immédiatement, par un chemin matériel indépendant du logiciel. Testé régulièrement, accessible en permanence.",
          },
          {
            label: "Comportements de repli",
            value:
              "Perte de communication, capteur critique en défaut, batterie critique : le robot s'arrête proprement ou rentre à sa base — un comportement défini à l'avance, pas une improvisation.",
          },
          {
            label: "Limitation d'énergie",
            value:
              "Vitesses et efforts bornés par conception (limiteurs logiciels + butées mécaniques) : un robot lent et faible est intrinsèquement moins dangereux.",
          },
          {
            label: "Zones de sécurité",
            value:
              "Pendant les essais : zone dégagée, barrières si nécessaire, personne dans la trajectoire. La procédure d'essai fait partie du système.",
          },
        ],
      },
      {
        kind: "text",
        text: "Principe cardinal : la sécurité ne dépend jamais uniquement du logiciel — le bouton d'arrêt coupe le circuit de puissance en hardware. Un système dont l'arrêt d'urgence passe par le programme qu'il est censé arrêter n'est pas sûr.",
      },
    ],
  },
  {
    id: "concept-teleoperation",
    title: "La téléopération",
    level: 2,
    intro:
      "Piloter à distance : l'outil de test, de secours et de démonstration.",
    blocks: [
      {
        kind: "text",
        text: "La téléopération permet de piloter le robot à distance (joystick, clavier, interface web) : elle sert aux premiers essais (avant l'autonomie), au secours (reprendre la main quand l'autonomie échoue) et aux démonstrations. C'est aussi un excellent outil de collecte de données : un opérateur qui pilote génère des trajectoires d'exemple.",
      },
      {
        kind: "list",
        items: [
          "Exigence n°1 : le watchdog — si les ordres cessent d'arriver (perte de lien), le robot s'arrête tout seul après un délai court (typiquement < 1 s).",
          "Exigence n°2 : la latence connue et bornée — un pilotage avec 2 s de retard est dangereux ; mesurer la latence réelle du lien.",
          "Toujours prévoir le basculement téléop ↔ autonome sans à-coup : les deux modes partagent la même chaîne de sécurité.",
        ],
      },
    ],
  },
  {
    id: "concept-maintenance",
    title: "La maintenance",
    level: 2,
    intro:
      "Penser la réparabilité dès la conception : un robot se dépanne sur le terrain.",
    blocks: [
      {
        kind: "fields",
        title: "Les piliers de la maintenabilité",
        fields: [
          {
            label: "Diagnostic embarqué",
            value:
              "Le robot surveille sa propre santé (tensions, températures, erreurs) et signale : un voyant ou un message vaut mieux qu'une panne mystérieuse.",
          },
          {
            label: "Journaux accessibles",
            value:
              "Logs persistants et horodatés, récupérables simplement : 90 % du diagnostic à distance se fait sur les logs.",
          },
          {
            label: "Pièces remplaçables",
            value:
              "Concevoir pour le démontage : connecteurs plutôt que soudures, modules interchangeables, visserie standard. Le temps de réparation se compte en minutes, pas en jours.",
          },
          {
            label: "Procédures écrites",
            value:
              "Checklist de mise en service, guide de dépannage par symptôme : la maintenance ne doit pas dépendre de la mémoire d'une personne.",
          },
        ],
      },
    ],
  },
  {
    id: "concept-documentation",
    title: "La documentation système",
    level: 2,
    intro:
      "Décrire l'architecture, les procédures et les limites : ce qui distingue un produit d'un prototype.",
    blocks: [
      {
        kind: "list",
        items: [
          "Architecture : schéma des modules et de leurs interfaces (qui publie quoi, qui dépend de quoi) — le plan du système, tenu à jour.",
          "Procédures : mise en service pas à pas, arrêt, recharge, transport — écrites pour quelqu'un qui découvre le robot.",
          "Limites d'emploi : charges max, pentes max, températures, autonomie réelle — ce que le robot ne doit pas faire, noir sur blanc.",
          "Journal des modifications : chaque version matérielle et logicielle tracée — on ne dépanne bien que ce dont on connaît l'historique.",
          "Règle : la documentation se met à jour en même temps que le système, pas « quand on aura le temps ».",
        ],
      },
    ],
  },
  {
    id: "premier-systeme",
    title: "Premier système : assembler trois nœuds",
    level: 2,
    intro:
      "Le plus petit système intégré : capteur → traitement → action, orchestré par un launch.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir les interfaces",
            detail:
              "Écrire sur papier : le nœud capteur publie sur `/scan` (ou `/image`), le nœud traitement souscrit et publie sur `/cmd_vel`, le nœud moteurs souscrit `/cmd_vel`. Types de messages et fréquences fixés à l'avance.",
          },
          {
            title: "Développer et tester chaque nœud isolément",
            detail:
              "Chaque nœud se teste seul avec des outils (`ros2 topic pub` pour simuler une entrée, `ros2 topic echo` pour vérifier une sortie) avant l'assemblage.",
          },
          {
            title: "Écrire le launch file",
            detail:
              "Un seul fichier qui démarre les trois nœuds avec leurs paramètres et remappages : le système se lance d'une commande, pas de trois terminaux.",
          },
          {
            title: "Tester l'assemblage",
            detail:
              "Lancer, vérifier avec `ros2 topic list` que tout communique, enregistrer un `ros2 bag` du premier essai complet. Le premier test d'intégration révèle toujours au moins une hypothèse fausse.",
          },
        ],
      },
      {
        kind: "command",
        label: "Vérifier qu'un topic publie",
        command: "ros2 topic echo /cmd_vel",
        why: "Affiche en direct les messages publiés sur le topic : on vérifie que le nœud traitement produit bien des commandes, à la bonne fréquence et avec des valeurs plausibles, avant de brancher les moteurs.",
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Flux professionnel : intégration continue",
    level: 2,
    intro:
      "Ne jamais assembler « à la fin » : intégrer petit, intégrer souvent.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Intégrer en continu",
            detail:
              "Chaque nouvelle brique est branchée au système dès qu'elle fait quelque chose — pas à la fin du projet. L'intégration est un flux, pas une phase.",
          },
          {
            title: "Automatiser les tests",
            detail:
              "Tests unitaires des nœux critiques + scénarios simulés rejoués automatiquement à chaque modification : la simulation (Gazebo) permet de tester sans le robot.",
          },
          {
            title: "Versionner ensemble",
            detail:
              "Le système complet a une version (matériel + logiciel) : on sait toujours quelle combinaison a été testée et déployée.",
          },
          {
            title: "Revue avant déploiement",
            detail:
              "Chaque changement significatif est relu et testé sur le robot avant d'être la nouvelle référence : pas de « ça marchait sur ma machine ».",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-systeme",
    title: "Déboguer : isoler la couche fautive",
    level: 2,
    intro:
      "Face à un système qui dysfonctionne : une méthode pour remonter à la cause.",
    blocks: [
      {
        kind: "fields",
        title: "La dichotomie par couches",
        fields: [
          {
            label: "Le middleware parle-t-il ?",
            value:
              "`ros2 topic list` / `ros2 node list` : si les topics attendus existent et publient, le problème est en aval (traitement, actionneurs) ; sinon, en amont (nœud planté, réseau).",
          },
          {
            label: "Les données sont-elles bonnes ?",
            value:
              "`ros2 topic echo` sur les topics clés : des valeurs aberrantes ou figées pointent vers le capteur ou son driver, pas vers l'algorithme.",
          },
          {
            label: "Le temps est-il cohérent ?",
            value:
              "Horodatages des messages : un décalage ou une fréquence divisée par deux révèle un problème de performance ou de synchronisation.",
          },
          {
            label: "Rejouer la scène",
            value:
              "Le `ros2 bag` de l'incident rejoué en boucle permet de tester des hypothèses sans refaire l'essai — le débogage système sans boîte noire est du tâtonnement.",
          },
          {
            label: "Changer une chose à la fois",
            value:
              "Comme en électronique : une hypothèse, un test, une conclusion notée. Les pannes système viennent souvent de deux causes combinées — la méthode les sépare.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-niveaux",
    title: "Tester : les niveaux de tests",
    level: 2,
    intro:
      "De la fonction au robot complet : chaque niveau attrape des bugs différents.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Ce qu'on teste", "Exemple"],
        rows: [
          ["Unitaire", "Une fonction, un nœud isolé", "Le calcul d'odométrie sur des entrées simulées"],
          ["Intégration", "Deux modules et leur interface", "Perception → planification : le plan suit la carte perçue"],
          ["Système", "Le robot complet en scénario", "Navigation A→B avec obstacles, 10 répétitions"],
          ["Endurance", "Le système dans la durée", "8 h de fonctionnement : dérives, fuites, usure"],
          ["Acceptation", "La mission du client", "Le robot fait le travail demandé, dans l'environnement réel"],
        ],
      },
      {
        kind: "text",
        text: "Règle : plus un bug est trouvé tard (niveau élevé), plus il coûte cher. D'où l'automatisation des niveaux bas et la simulation massive avant les essais réels.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges classiques de l'intégration — presque tous organisationnels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tout assembler à la fin : l'intégration repoussée concentre tous les problèmes d'interfaces au pire moment — intégrer en continu dès le début.",
          "Interfaces implicites : deux nœuds qui « se comprennent » sans contrat écrit (format, unités, fréquence) finiront par se mécomprendre.",
          "Pas de bouton d'arrêt : tester un robot mobile sans arrêt d'urgence fonctionnel, c'est jouer avec la casse — et pire.",
          "Configuration en dur dans le code : seuils, topics, IP codés en dur rendent le système intransportable — tout en paramètres/fichiers.",
          "Aucun log : sans enregistrement, chaque incident est une énigme sans indices — `ros2 bag record` systématique en essai.",
          "Tester seulement le cas nominal : le robot marche dans le labo et échoue partout ailleurs — les cas limites font partie des tests.",
          "Confondre démo et validation : une vidéo réussie n'est pas une preuve de fiabilité — la validation, c'est des dizaines de répétitions chiffrées.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-systeme",
    title: "Architecture système",
    level: 3,
    intro:
      "Découper le robot en modules : principes d'une bonne architecture.",
    blocks: [
      {
        kind: "diagram",
        title: "Découpage type d'un robot mobile autonome",
        lines: [
          "┌─ PERCEPTION ─────────────┐  ┌─ DÉCISION ───────────────┐",
          "│ caméra → détection       │  │ planificateur global     │",
          "│ lidar → cartographie     │  │ contrôleur local         │",
          "│ imu+odom → localisation  │  │ superviseur de mission   │",
          "└────────┬─────────────────┘  └────────┬─────────────────┘",
          "         │ topics                      │ topics",
          "         └──────────────┬──────────────┘",
          "                      ▼",
          "         ┌─ EXÉCUTION ─────────────────┐",
          "         │ drivers moteurs, firmware   │",
          "         └─────────────────────────────┘",
        ],
      },
      {
        kind: "list",
        items: [
          "Un module = une responsabilité : s'il fait deux choses, le couper en deux — les modules monoresponsables se testent et se remplacent.",
          "Interfaces explicites et versionnées : chaque topic/service a un type, une fréquence et une sémantique documentés.",
          "Dépendances acycliques : aucun cycle de dépendance entre modules — un cycle est un bug d'architecture qui bloque les tests isolés.",
          "Séparer le critique du confort : la sécurité (arrêt, watchdog) ne dépend jamais des modules « intelligents » susceptibles de planter.",
        ],
      },
    ],
  },
  {
    id: "interfaces-contrats",
    title: "Interfaces et contrats",
    level: 3,
    intro:
      "Le contrat d'interface : ce que chaque module promet aux autres.",
    blocks: [
      {
        kind: "fields",
        title: "Contenu d'un contrat d'interface",
        fields: [
          {
            label: "Type et unités",
            value:
              "Le type de message exact et les unités (mètres ou millimètres ? radians ou degrés ?). Les bugs d'unités sont légendaires — le contrat les tue dans l'œuf.",
          },
          {
            label: "Fréquence et latence",
            value:
              "À quel rythme le module publie, avec quelle latence max : le consommateur dimensionne ses timeouts et ses filtres en fonction.",
          },
          {
            label: "Repère et horodatage",
            value:
              "Dans quel repère sont exprimées les données, avec quelle horloge : indispensable pour fusionner des mesures (voir TF et temps).",
          },
          {
            label: "Comportement en défaut",
            value:
              "Que fait le module s'il n'a plus de données d'entrée (garde la dernière ? s'arrête ? publie un diagnostic ?) : le défaut est un cas nominal du contrat.",
          },
        ],
      },
    ],
  },
  {
    id: "ros2-middleware",
    title: "ROS 2 comme middleware",
    level: 3,
    intro:
      "Comprendre ce qui transporte les messages : DDS, découverte, QoS.",
    blocks: [
      {
        kind: "text",
        text: "ROS 2 s'appuie sur DDS (Data Distribution Service) pour le transport : les nœuds se découvrent automatiquement sur le réseau (pas de maître central comme ROS 1), et chaque communication peut préciser sa qualité de service (QoS) : fiabilité, durabilité, historique.",
      },
      {
        kind: "fields",
        title: "Les trois patterns de communication",
        fields: [
          {
            label: "Topics (publish/subscribe)",
            value:
              "Flux continus, asynchrones, un-vers-plusieurs : capteurs, commandes, états. Le pattern dominant — découplage total entre producteurs et consommateurs.",
          },
          {
            label: "Services (requête/réponse)",
            value:
              "Appels synchrones un-vers-un : changer un paramètre, demander une action ponctuelle. Bloquant — à réserver aux opérations non critiques en temps.",
          },
          {
            label: "Actions (tâches longues)",
            value:
              "Objectif + retours d'avancement + possibilité d'annuler : naviguer vers un point, exécuter une séquence. Le pattern des missions.",
          },
        ],
      },
    ],
  },
  {
    id: "qos-detail",
    title: "QoS : la qualité de service",
    level: 3,
    intro:
      "Fiabilité, durabilité, historique : régler le transport selon le besoin.",
    blocks: [
      {
        kind: "table",
        headers: ["Politique", "Options", "Usage robotique"],
        rows: [
          ["Fiabilité", "Reliable / Best effort", "Reliable pour les commandes critiques ; best effort pour les flux capteurs où la fraîcheur prime sur la perte"],
          ["Durabilité", "Volatile / Transient local", "Transient local pour les données lentes (carte, paramètres) que les nouveaux abonnés doivent recevoir"],
          ["Historique", "Keep last (N) / Keep all", "Keep last(1) pour les capteurs (seule la dernière valeur compte) ; keep all pour les logs"],
          ["Deadline / Lifespan", "Durées", "Détecter un capteur qui ne publie plus assez vite (deadline manquée = diagnostic)"],
        ],
      },
      {
        kind: "text",
        text: "Piège classique : un abonné et un publieur avec des QoS incompatibles ne se connectent jamais, sans message d'erreur explicite — devant un topic « vide », vérifier la compatibilité QoS avant tout.",
      },
    ],
  },
  {
    id: "launch-systeme",
    title: "Fichiers de lancement",
    level: 3,
    intro:
      "Démarrer tout le système d'une commande : organisation des launch files.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un launch file par sous-système (perception, navigation, drivers) + un launch maître qui les inclut : la structure reflète l'architecture.",
          "Paramètres dans des fichiers YAML séparés, jamais en dur : chaque robot / environnement a sa configuration.",
          "Remappages explicites : adapter les noms de topics sans toucher au code des nœuds.",
          "Ordre et dépendances : certains nœuds doivent démarrer après d'autres (ex. attendre la carte) — gérer les dépendances, pas prier.",
          "Le launch est du code : versionné, relu, testé — un launch cassé, c'est tout le système qui ne démarre pas.",
        ],
      },
    ],
  },
  {
    id: "parametres-configuration",
    title: "Paramètres et configuration",
    level: 3,
    intro:
      "Tout ce qui varie sans recompiler : la discipline des paramètres.",
    blocks: [
      {
        kind: "command",
        label: "Lister les paramètres d'un nœud",
        command: "ros2 param list",
        why: "Affiche les paramètres exposés par les nœuds actifs : c'est l'inventaire de ce qui est réglable sans recompiler. Un paramètre attendu qui n'apparaît pas = un nœud mal configuré ou une faute de frappe dans le YAML.",
      },
      {
        kind: "list",
        items: [
          "Principe : aucun seuil, topic, IP ou constante physique en dur dans le code — tout passe par des paramètres nommés et documentés.",
          "Fichiers YAML par environnement (labo, extérieur, robot A/B) : changer d'environnement = changer de fichier, pas de code.",
          "Valeurs par défaut sensées : un nœud doit démarrer avec un comportement sûr même sans fichier de paramètres.",
          "Tracer la configuration déployée : archiver le YAML avec chaque essai — « avec quels paramètres ça marchait ? » doit avoir une réponse.",
        ],
      },
    ],
  },
  {
    id: "gestion-du-temps",
    title: "Gestion du temps : horloges et synchronisation",
    level: 3,
    intro:
      "Fusionner des mesures exige un temps commun : l'horodatage rigoureux.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque message capteur porte un horodatage (header.stamp) : c'est lui qui permet de synchroniser caméra, LiDAR et IMU — pas l'heure d'arrivée.",
          "Temps simulé vs temps réel : en simulation, utiliser l'horloge simulée pour que les algorithmes voient un temps cohérent (paramètre `use_sim_time`).",
          "Synchronisation réseau : sur un robot multi-cartes, synchroniser les horloges (NTP/PTP) — des horloges qui dérivent rendent la fusion impossible.",
          "Latence : mesurer le délai entre l'événement physique et son traitement — une perception « précise » mais vieille de 500 ms fait rater les obstacles.",
        ],
      },
    ],
  },
  {
    id: "tf-transformations",
    title: "TF : l'arbre des repères",
    level: 3,
    intro:
      "Savoir où est chaque capteur par rapport au robot : les transformations.",
    blocks: [
      {
        kind: "text",
        text: "TF maintient l'arbre des repères du robot : `base_link` → roues, `base_link` → caméra, `map` → `odom` → `base_link`… Chaque mesure est exprimée dans un repère ; TF convertit entre repères à un instant donné. Sans TF cohérent, impossible de projeter un point LiDAR dans l'image caméra ou de naviguer.",
      },
      {
        kind: "list",
        items: [
          "Statique : les positions des capteurs sur le châssis (mesurées au mètre ruban, en mètres et radians) — une erreur ici biaise toute la perception.",
          "Dynamique : les articulations et la localisation publient leurs transformations en continu.",
          "Règle : un seul parent par repère, pas de cycle, et des noms stables — TF est une infrastructure, pas un détail.",
        ],
      },
    ],
  },
  {
    id: "diagnostic",
    title: "Diagnostic embarqué",
    level: 3,
    intro:
      "Le robot qui signale ses propres pannes : niveaux, agrégation, réaction.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux de diagnostic",
        fields: [
          {
            label: "OK",
            value:
              "Fonctionnement nominal : le module publie régulièrement son état, avec des métriques (fréquence réelle, température).",
          },
          {
            label: "WARN",
            value:
              "Dégradation non bloquante (batterie à 30 %, fréquence capteur limite) : signaler à l'opérateur, continuer la mission en surveillant.",
          },
          {
            label: "ERROR",
            value:
              "Panne bloquante (moteur en défaut, LiDAR muet) : déclencher le comportement de repli défini (arrêt, retour base).",
          },
          {
            label: "STALE",
            value:
              "Plus de nouvelles du module (timeout) : le traiter comme une panne — un module silencieux est un module suspect.",
          },
        ],
      },
      {
        kind: "text",
        text: "Agrégation : un nœud superviseur collecte les diagnostics et décide — afficher à l'opérateur, dégrader la mission, ou arrêter. Le diagnostic n'est pas du luxe : c'est ce qui transforme « le robot s'est arrêté sans raison » en « le robot s'est arrêté parce que… ».",
      },
    ],
  },
  {
    id: "journalisation",
    title: "Journalisation : rosbag et logs",
    level: 3,
    intro:
      "La boîte noire : enregistrer pour comprendre après coup.",
    blocks: [
      {
        kind: "command",
        label: "Rejouer un enregistrement",
        command: "ros2 bag play <fichier>",
        why: "Rejoue les topics enregistrés comme si le robot roulait : on peut re-tester un algorithme sur la scène exacte de l'incident, des dizaines de fois, sans refaire l'essai.",
      },
      {
        kind: "list",
        items: [
          "Enregistrer systématiquement pendant les essais : le coût disque est dérisoire face au coût d'un essai non rejouable.",
          "Choisir les topics : tout (`-a`) en phase de debug, une sélection en routine — les flux caméra/LiDAR pèsent lourd.",
          "Logs logiciels : niveaux (debug/info/warn/error), horodatés, avec le nom du nœud — un log sans contexte est inutilisable.",
          "Rétention : archiver les bags des incidents et des validations, purger le reste — sinon le disque se remplit au pire moment.",
        ],
      },
    ],
  },
  {
    id: "monitoring",
    title: "Supervision et métriques",
    level: 3,
    intro:
      "Voir le système vivant : fréquences, latences, ressources.",
    blocks: [
      {
        kind: "list",
        items: [
          "Fréquences réelles des topics : un topic attendu à 30 Hz qui tombe à 12 Hz signale un problème de performance avant la panne.",
          "Latences de bout en bout : temps entre la mesure capteur et la commande moteur — la métrique qui dit si le système « suit ».",
          "Ressources : CPU, mémoire, réseau par nœud — identifier le goulot (souvent un nœud gourmand qui affame les autres).",
          "Tableau de bord : centraliser ces métriques pendant les essais — surveiller en direct, alerter sur seuils.",
        ],
      },
    ],
  },
  {
    id: "securite-fonctionnelle",
    title: "Sécurité fonctionnelle",
    level: 3,
    intro:
      "Au-delà du bouton : penser les défaillances systématiquement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Analyse des modes de défaillance (AMDEC/FMEA) : pour chaque composant, lister comment il peut faillir et ce que le système fait alors — l'exercice qui révèle les angles morts.",
          "Chemins indépendants : la fonction d'arrêt ne partage ni capteur, ni calculateur, ni alimentation logique avec la fonction qu'elle surveille.",
          "États sûrs définis : pour chaque mode de panne, un état sûr existe (arrêt, repli, retour) et le système sait l'atteindre seul.",
          "La sécurité se teste : simuler chaque panne (débrancher le capteur, couper le réseau) et vérifier la réaction — un dispositif non testé est un vœu pieux.",
        ],
      },
    ],
  },
  {
    id: "modes-degrades",
    title: "Modes dégradés",
    level: 3,
    intro:
      "Quand tout ne marche plus : continuer en mode réduit plutôt que s'arrêter net.",
    blocks: [
      {
        kind: "fields",
        title: "Hiérarchie des modes",
        fields: [
          {
            label: "Nominal",
            value:
              "Tous les systèmes OK : pleine autonomie, pleine vitesse.",
          },
          {
            label: "Dégradé",
            value:
              "Un capteur en moins (ex. caméra HS, LiDAR seul) : vitesse réduite, trajectoires prudentes, mission simplifiée mais poursuivie.",
          },
          {
            label: "Repli",
            value:
              "Panne majeure : arrêt sur place sécurisé ou retour à la base en ligne droite lente — l'objectif n'est plus la mission mais la sécurité.",
          },
          {
            label: "Arrêt",
            value:
              "Bouton d'urgence ou défaut critique : coupure puissance, le robot est inerte et sûr.",
          },
        ],
      },
      {
        kind: "text",
        text: "Les transitions entre modes sont explicites et journalisées : on sait toujours dans quel mode est le robot et pourquoi il y est entré. Un robot qui « fait des choses bizarres » est souvent un robot coincé entre deux modes mal définis.",
      },
    ],
  },
  {
    id: "teleoperation-avancee",
    title: "Téléopération avancée",
    level: 3,
    intro:
      "Piloter à distance en sécurité : latence, watchdog, partage d'autorité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Watchdog : sans ordre frais depuis moins d'une seconde (valeur selon la dynamique), les moteurs s'arrêtent — la perte de lien ne doit jamais laisser le robot foncer.",
          "Évitement local actif même en téléop : le robot refuse les ordres qui mènent droit dans un mur — l'opérateur pilote, le robot protège.",
          "Retour d'état : l'opérateur voit ce que voit le robot (flux caméra, carte, diagnostics) — piloter à l'aveugle est la cause n°1 des accidents en téléop.",
          "Bascule bumpless : passer de téléop à autonome (et inversement) sans discontinuité de commande — les deux modes s'accordent sur l'état courant avant le transfert.",
        ],
      },
    ],
  },
  {
    id: "reseau-robot",
    title: "Réseau du robot",
    level: 3,
    intro:
      "Le système nerveux distribué : topologie, WiFi vs filaire, découverte.",
    blocks: [
      {
        kind: "list",
        items: [
          "Filaire quand c'est possible : à l'intérieur du robot, l'Ethernet filaire bat le WiFi en latence, fiabilité et déterminisme — le WiFi est pour l'opérateur, pas pour le temps réel interne.",
          "Découverte DDS : les nœuds se trouvent automatiquement sur le réseau — pratique, mais le trafic de découverte sur WiFi chargé peut perturber : segmenter si besoin.",
          "Bande passante : chiffrer les flux (caméra HD + LiDAR = centaines de Mbit/s) et dimensionner le réseau en conséquence — compresser ou réduire avant de saturer.",
          "Sécurité réseau : un robot sur un WiFi ouvert est pilotable par n'importe qui — chiffrement et authentification dès que le robot quitte le labo.",
        ],
      },
    ],
  },
  {
    id: "energie-systeme",
    title: "Énergie au niveau système",
    level: 3,
    intro:
      "Budget énergétique global : dimensionner pour la mission, pas pour la fiche technique.",
    blocks: [
      {
        kind: "text",
        text: "Budget : lister chaque consommateur avec son courant moyen ET crête (les moteurs au démarrage consomment plusieurs fois leur courant nominal), sommer, ajouter 20–30 % de marge, puis calculer l'autonomie : `temps = capacité utile / courant moyen`. La capacité utile n'est pas la nominale : on ne décharge jamais une batterie lithium à 0 %.",
      },
      {
        kind: "list",
        items: [
          "Séparer les rails : la logique (calcul, capteurs) ne doit jamais subir les chutes de tension des appels moteurs — rails ou batteries séparés.",
          "Surveiller : jauge de batterie, courant total, estimation d'autonomie restante affichée — et seuil de retour base automatique.",
          "Recharge : procédure et connectique dédiées, chargeur adapté à la chimie — la recharge fait partie du système, pas un accessoire.",
        ],
      },
    ],
  },
  {
    id: "demarrage-arret",
    title: "Séquences de démarrage et d'arrêt",
    level: 3,
    intro:
      "L'ordre compte : démarrer et arrêter proprement, automatiquement.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Démarrage ordonné",
            detail:
              "Alimentations → capteurs (temps de chauffe) → calculateurs → middleware → nœuds dans l'ordre de dépendance → vérification (topics présents, diagnostics OK) → mission. Chaque étape valide la précédente.",
          },
          {
            title: "Service système",
            detail:
              "Le tout orchestré par le système d'exploitation au boot (service systemd) : le robot démarre seul à la mise sous tension, sans écran ni clavier.",
          },
          {
            title: "Arrêt propre",
            detail:
              "Arrêt mission → arrêt nœuds (sauvegarde d'état) → coupure puissance actionneurs → extinction : un arrêt brutal corrompt les cartes SD et perd les logs.",
          },
          {
            title: "Bouton physique",
            detail:
              "Un interrupteur général accessible coupe la puissance ; l'arrêt d'urgence coupe en hardware. Les deux sont testés, pas juste installés.",
          },
        ],
      },
    ],
  },
  {
    id: "mises-a-jour",
    title: "Mises à jour et déploiement",
    level: 3,
    intro:
      "Mettre à jour un robot sans le « bricker » : partitions, rollback, tests.",
    blocks: [
      {
        kind: "list",
        items: [
          "Double partition (A/B) : la mise à jour s'installe sur la partition inactive ; en cas d'échec au boot, le système rebascule sur l'ancienne — le robot ne reste jamais inutilisable.",
          "Mise à jour atomique : tout ou rien — jamais un système à moitié mis à jour (moitié ancien firmware, moitié nouveau logiciel).",
          "Tester avant de déployer : la mise à jour passe les tests simulés puis un essai réel avant d'être poussée sur la flotte.",
          "Firmware et logiciel versionnés ensemble : une version système = une combinaison testée — jamais de mélange improvisé sur le terrain.",
        ],
      },
    ],
  },
  {
    id: "tests-hil",
    title: "Hardware-in-the-loop (HIL)",
    level: 3,
    intro:
      "Tester le logiciel contre du matériel simulé : le meilleur des deux mondes.",
    blocks: [
      {
        kind: "text",
        text: "Le HIL connecte le vrai calculateur (avec le vrai logiciel) à une simulation du reste (capteurs simulés, dynamique simulée) en temps réel. On teste le logiciel embarqué réel — avec ses bugs de timing et ses drivers — sans risquer le robot : pannes injectées, cas limites, endurance, le tout reproductible.",
      },
      {
        kind: "list",
        items: [
          "Ce qu'il attrape : bugs temps réel, dépassements de pile, drivers défaillants — tout ce que la simulation pure sur PC ne voit pas.",
          "Ce qu'il ne remplace pas : les essais réels — la simulation reste un modèle, et le modèle est toujours optimiste.",
          "En pratique : d'abord simulation pure (rapide, massive), puis HIL (réaliste, ciblé), puis robot réel (validation finale).",
        ],
      },
    ],
  },
  {
    id: "tests-endurance",
    title: "Tests d'endurance",
    level: 3,
    intro:
      "Les pannes qui n'apparaissent qu'avec le temps : les provoquer en test.",
    blocks: [
      {
        kind: "list",
        items: [
          "Fuites mémoire : surveiller la RAM sur des heures — une fuite lente tue le système au bout d'une journée, jamais en démo de 10 minutes.",
          "Dérives thermiques : composants qui chauffent, capteurs qui dérivent — tester à température stabilisée, pas à froid.",
          "Usure mécanique : jeux qui augmentent, courroies qui se détendent — mesurer les performances (répétabilité) en début et fin d'endurance.",
          "Batterie : cycles charge/décharge complets — l'autonomie réelle se mesure, la fiche technique s'oublie.",
          "Protocole : scénarios répétés automatiquement, métriques enregistrées, critères d'arrêt définis à l'avance (pas de « on arrête quand ça casse »).",
        ],
      },
    ],
  },
  {
    id: "gestion-defauts",
    title: "Gestion des défauts : FMEA",
    level: 3,
    intro:
      "Lister les pannes avant qu'elles n'arrivent : l'analyse systématique.",
    blocks: [
      {
        kind: "text",
        text: "La FMEA (analyse des modes de défaillance et de leurs effets) passe en revue chaque composant : comment peut-il faillir ? Avec quelle gravité ? Le système le détecte-t-il ? Que fait-il alors ? L'exercice, mené en équipe autour d'un tableau, révèle les pannes « évidentes après coup » avant qu'elles ne coûtent cher.",
      },
      {
        kind: "table",
        headers: ["Composant", "Mode de défaillance", "Effet", "Détection", "Réaction"],
        rows: [
          ["LiDAR", "Plus de données", "Navigation aveugle", "Timeout topic", "Arrêt + diagnostic ERROR"],
          ["Batterie", "Tension critique", "Coupure brutale", "Jauge < seuil", "Retour base puis arrêt propre"],
          ["Réseau WiFi", "Perte de lien", "Téléop impossible", "Watchdog", "Arrêt moteurs, attente"],
          ["Moteur", "Blocage", "Trajectoire faussée", "Courant anormal", "Arrêt + signalement"],
        ],
      },
    ],
  },
  {
    id: "redondance",
    title: "Redondance",
    level: 3,
    intro:
      "Quand la panne n'est pas une option : doubler le critique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Redondance matérielle : deux capteurs critiques (ex. deux moyens de mesurer la vitesse), deux calculateurs — avec une logique de vote ou de bascule.",
          "Redondance fonctionnelle : un moyen différent d'obtenir l'info (odométrie roues + odométrie visuelle) — moins cher que doubler le même capteur, et robuste aux pannes de mode commun.",
          "Coût : la redondance complexifie (qui décide ? que faire en cas de désaccord ?) — on ne redonde que ce dont la panne est inacceptable.",
          "Tester la redondance : provoquer la panne du primaire et vérifier la bascule — une redondance non testée est une illusion.",
        ],
      },
    ],
  },
  {
    id: "cablage-fiabilite",
    title: "Câblage et fiabilité mécanique",
    level: 3,
    intro:
      "Le système tient aussi par ses fils : robustesse du câblage.",
    blocks: [
      {
        kind: "list",
        items: [
          "Connecteurs verrouillés partout : sur un robot mobile, tout connecteur non verrouillé finira par se débrancher tout seul.",
          "Séparation puissance/signal : les câbles moteurs à l'écart des bus et capteurs — le bruit électromagnétique est une panne d'intégration typique.",
          "Relief de tension : aucun fil ne tire sur une soudure ou un connecteur — colliers, gaines, boucles de mou.",
          "Protection : fusible au plus près de la batterie, cosses isolées, arrêt d'urgence accessible — la sécurité électrique fait partie de l'intégration.",
        ],
      },
    ],
  },
  {
    id: "documentation-avancee",
    title: "Documentation d'exploitation",
    level: 3,
    intro:
      "Le robot sans son développeur : runbooks et traçabilité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Runbook : mise en service, arrêt, recharge, transport, pannes courantes — écrit pour un opérateur qui n'a pas conçu le robot.",
          "Dépannage par symptôme : « le robot ne démarre pas → vérifier 1, 2, 3 » — le diagnostic guidé bat l'improvisation.",
          "Traçabilité : chaque robot a un numéro, chaque version (hard + soft) est enregistrée — on sait exactement ce qui tourne où.",
          "Formation : faire manipuler le robot par quelqu'un d'autre avec uniquement la doc — ce qui coince révèle ce que la doc doit dire.",
        ],
      },
    ],
  },
  {
    id: "demonstration",
    title: "Préparer une démonstration",
    level: 3,
    intro:
      "La démo est un test système comme un autre : elle se prépare.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Figer une version",
            detail:
              "La démo tourne sur une version gelée et testée — jamais sur la dernière modification de la veille.",
          },
          {
            title: "Répéter dans les conditions réelles",
            detail:
              "Même lieu (ou équivalent), même éclairage, mêmes obstacles : réserver les surprises aux spectateurs, pas à l'équipe.",
          },
          {
            title: "Prévoir le plan B",
            detail:
              "Vidéo de secours, mode téléopéré prêt, scénario simplifié : une démo qui ne peut pas rater est une démo préparée pour rater proprement.",
          },
          {
            title: "Batteries et redémarrage",
            detail:
              "Batteries chargées + de rechange, procédure de redémarrage rapide connue par cœur — 90 % des ratés de démo sont énergétiques ou de démarrage.",
          },
        ],
      },
    ],
  },
  {
    id: "couts-delais",
    title: "Coûts et délais : piloter le projet",
    level: 3,
    intro:
      "L'intégration a un coût : le budgéter au lieu de le découvrir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Règle empirique : l'intégration et les tests représentent une part majeure du projet — les sous-estimer est l'erreur de planification la plus courante en robotique.",
          "Prototyper tôt le système complet (même grossier) : le premier assemblage révèle les vrais coûts — mécaniques, électroniques, logiciels.",
          "Marge sur les délais : chaque interface est un risque de retard — planifier des buffers, pas du « tout va bien se passer ».",
          "Acheter vs fabriquer : un châssis ou un LiDAR du commerce fait gagner des mois — réserver le sur-mesure à ce qui fait la différence.",
        ],
      },
    ],
  },
  {
    id: "ethique-robots",
    title: "Robots et humains : responsabilités",
    level: 3,
    intro:
      "Un robot autonome agit dans le monde : en assumer les implications.",
    blocks: [
      {
        kind: "list",
        items: [
          "Sécurité d'abord : aucun déploiement près d'humains sans analyse de risques et dispositifs testés — la technique ne dispense pas de la prudence.",
          "Transparence : le robot signale son état et ses intentions (voyants, sons, affichages) — un robot prévisible est un robot accepté.",
          "Données : caméras et LiDAR enregistrent l'environnement — informer, limiter la conservation, respecter la vie privée des lieux.",
          "Responsabilité : définir qui répond en cas d'incident (opérateur, concepteur, exploitant) avant l'incident, pas après.",
        ],
      },
    ],
  },
  {
    id: "projets-integration",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets qui sont des systèmes complets, pas des démos.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Robot suiveur intégré",
            detail:
              "Assembler capteur + traitement + moteurs en système ROS 2 avec launch file, diagnostics et rosbag systématique. Livrable : le robot suit une ligne/cible de façon répétable, avec la doc d'architecture.",
          },
          {
            title: "Projet 2 — Robot mobile avec sécurité",
            detail:
              "Ajouter : bouton d'arrêt d'urgence matériel, watchdog téléop, modes dégradés, séquences de démarrage/arrêt automatiques. Livrable : FMEA remplie + démonstration des comportements de repli.",
          },
          {
            title: "Projet 3 — Mission autonome complète",
            detail:
              "Perception + planification + contrôle sur robot mobile : naviguer entre des points en évitant des obstacles, avec supervision, logs et runbook d'exploitation. Livrable : 10 missions réussies chiffrées + documentation complète.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-integration",
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
            label: "Documentation ROS 2",
            value:
              "Le guide officiel (docs.ros.org) : concepts, QoS, launch, bonnes pratiques — la référence pour tout ce qui est middleware.",
          },
          {
            label: "Guides de sécurité des machines",
            value:
              "Les normes et guides de sécurité des systèmes mobiles et collaboratifs : lire au moins les principes (arrêt, zones, analyse de risques) avant tout essai près d'humains.",
          },
          {
            label: "Retours d'expérience",
            value:
              "Blogs d'équipes robotiques et compétitions (DARPA, RoboCup) : la littérature grise où se trouvent les vraies leçons d'intégration.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : l'intégration ne s'apprend qu'en intégrant — chaque projet de cette page doit finir en système qui tourne seul.",
          "Réflexe : devant une panne système, sortir le triptyque `node list` / `topic list` / `bag` avant toute hypothèse.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "L'intégration est le sommet de la roadmap : voici comment continuer à progresser.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir ROS 2 : écrire des nœuds robustes (lifecycle, composition) et maîtriser la simulation Gazebo.",
          "Durcir le contrôle : MPC et contrôle robuste pour des trajectoires plus exigeantes.",
          "Enrichir la perception : multi-capteurs et SLAM pour des environnements plus complexes.",
          "Industrialiser : déploiement, flotte de robots, supervision à distance — l'intégration à l'échelle.",
          "Revenir à la roadmap : valider Intégration système — le parcours est complet.",
        ],
      },
    ],
  },
];

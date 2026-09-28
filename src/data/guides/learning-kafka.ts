import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Kafka : la plateforme de streaming
 * d'événements distribuée. 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent
 * le code inline entre backticks. Les commandes reprennent la syntaxe
 * documentée dans le guide (image officielle apache/kafka, mode KRaft).
 */
export const LEARNING_KAFKA: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Kafka et le problème qu'il résout.",
    blocks: [
      {
        kind: "text",
        text: "Kafka est une plateforme de streaming d'événements distribuée : elle ingère des événements en continu, les stocke durablement et les redistribue aux applications qui en ont besoin. Là où une API répond à une question posée à un instant T, Kafka transporte ce qui se passe, au moment où ça se passe — clics, transactions, mesures de capteurs, logs.",
      },
      {
        kind: "text",
        text: "Le problème résolu : sans Kafka, chaque application qui produit des données doit connaître chaque application qui les consomme — un écheveau de connexions point à point fragile et rigide. Avec Kafka, les producteurs publient dans des flux nommés (topics) sans savoir qui lira, et les consommateurs lisent sans savoir qui a écrit. Producteurs et consommateurs sont découplés dans le temps comme dans l'espace.",
      },
      {
        kind: "list",
        items: [
          "Streaming : des événements en continu, pas des requêtes ponctuelles.",
          "Distribué : réparti sur plusieurs machines (brokers) pour le débit et la résilience.",
          "Durable : les événements sont stockés et rejouables, pas consommés puis oubliés.",
          "Découplé : producteurs et consommateurs ne se connaissent pas.",
        ],
      },
    ],
  },
  {
    id: "kafka-en-une-image",
    title: "Kafka en une image",
    level: 1,
    intro:
      "Le trajet d'un événement, de sa production à sa consommation.",
    blocks: [
      {
        kind: "diagram",
        title: "Le parcours d'un événement",
        lines: [
          "PRODUCTEUR                    CLUSTER KAFKA              CONSOMMATEURS",
          " (votre app)                  (brokers)                  (vos apps)",
          "     │",
          "     │  publie un événement",
          "     ▼",
          "                              ┌─────────────────┐",
          "                              │  TOPIC orders   │",
          "                              │  ┌───────────┐  │     ┌──────────────┐",
          "                              │  │Partition 0│──┼────►│ Consumer A   │",
          "                              │  └───────────┘  │     │ (groupe X)   │",
          "                              │  ┌───────────┐  │     └──────────────┘",
          "                              │  │Partition 1│──┼────►┌──────────────┐",
          "                              │  └───────────┘  │     │ Consumer B   │",
          "                              │  ┌───────────┐  │     │ (groupe X)   │",
          "                              │  │Partition 2│──┼─┐   └──────────────┘",
          "                              └─────────────────┘ │",
          "     L'événement est stocké      Chaque partition │  ┌──────────────┐",
          "     durablement, puis lu        est lue par UN   └─►│ Consumer C   │",
          "     par les consommateurs      seul membre du       │ (groupe Y)   │",
          "     qui suivent leur offset.   groupe à la fois.    │ rejoue tout  │",
          "                                                   └──────────────┘",
        ],
      },
      {
        kind: "text",
        text: "À retenir de ce schéma : le topic est le flux nommé, les partitions le découpent pour le parallélisme, et chaque groupe de consommateurs suit sa propre position de lecture (offset). Deux groupes lisent le même topic indépendamment — l'un en temps réel, l'autre en rejouant l'historique.",
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
      "Ce qu'il faut déjà connaître avant de lancer son premier cluster.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations nécessaires",
        fields: [
          {
            label: "Ligne de commande",
            value:
              "Kafka se pilote au terminal : les scripts `kafka-*.sh` sont l'outil principal pour créer, produire, consommer et inspecter.",
          },
          {
            label: "Réseau (bases)",
            value:
              "Hôte, port, listeners : un producteur doit joindre les brokers sur le bon port (9092 par défaut).",
          },
          {
            label: "JSON",
            value:
              "Le format le plus courant des événements : savoir le lire et le produire.",
          },
          {
            label: "Docker (bases)",
            value:
              "L'installation la plus simple passe par l'image officielle : lancer, lister et arrêter un conteneur.",
          },
          {
            label: "Concurrence (notions)",
            value:
              "Partitions, parallélisme, ordre : comprendre pourquoi découper un flux change les garanties.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-docker",
    title: "Lancer Kafka avec Docker",
    level: 2,
    intro:
      "Un broker local en une commande, avec l'image officielle en mode KRaft (sans ZooKeeper).",
    blocks: [
      {
        kind: "command",
        label: "Démarrer un broker Kafka",
        command: "docker run -p 9092:9092 -d apache/kafka:3.8",
        why: "Lance l'image officielle `apache/kafka` en mode KRaft : le broker écoute sur le port 9092 de la machine. Le mode KRaft (métadonnées gérées par Kafka lui-même) remplace l'ancien ZooKeeper externe.",
        verify: "docker ps",
      },
      {
        kind: "text",
        text: "Pour suivre les logs du broker : `docker logs -f <nom-du-conteneur>`. Pour arrêter : `docker stop <nom>`. C'est un broker unique de développement — un vrai cluster en compte plusieurs, avec réplication.",
      },
    ],
  },
  {
    id: "creer-topic",
    title: "Créer un topic",
    level: 2,
    intro:
      "Le premier objet Kafka : un flux nommé, découpé en partitions.",
    blocks: [
      {
        kind: "command",
        label: "Créer le topic events",
        command: "kafka-topics.sh --create --topic events --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1",
        why: "Crée un topic nommé `events` avec 3 partitions : les événements seront répartis sur 3 segments parallèles. `--replication-factor 1` signifie une seule copie (pas de réplica) — normal pour un broker unique local, à augmenter en production.",
        verify: "kafka-topics.sh --bootstrap-server localhost:9092 --list",
      },
      {
        kind: "command",
        label: "Inspecter le topic",
        command: "kafka-topics.sh --describe --topic events --bootstrap-server localhost:9092",
        why: "Affiche le détail : partitions, leader de chaque partition, réplicas, et leur état de synchronisation. La commande de diagnostic de base quand quelque chose ne tourne pas rond.",
      },
      {
        kind: "text",
        text: "Note : ces scripts `kafka-*.sh` sont fournis avec la distribution Kafka. En Docker, on les exécute via `docker exec` dans le conteneur, ou depuis une distribution téléchargée localement.",
      },
    ],
  },
  {
    id: "produire-messages",
    title: "Produire des messages",
    level: 2,
    intro:
      "Écrire dans le topic : le rôle du producteur.",
    blocks: [
      {
        kind: "command",
        label: "Publier des événements au clavier",
        command: "kafka-console-producer.sh --topic events --bootstrap-server localhost:9092",
        why: "Ouvre un producteur en ligne de commande : chaque ligne tapée devient un événement publié dans le topic `events`. L'outil le plus simple pour tester qu'un topic reçoit bien des données.",
        verify: "kafka-console-consumer.sh --topic events --from-beginning --bootstrap-server localhost:9092",
      },
      {
        kind: "text",
        text: "Dans une vraie application, le producteur est une bibliothèque cliente (Java, Python, Go…) qui envoie des événements structurés (JSON, Avro…). Le principe reste identique : choisir un topic, éventuellement une clé, et publier.",
      },
    ],
  },
  {
    id: "consommer-messages",
    title: "Consommer des messages",
    level: 2,
    intro:
      "Lire le topic : le rôle du consommateur.",
    blocks: [
      {
        kind: "command",
        label: "Lire depuis le début",
        command: "kafka-console-consumer.sh --topic events --from-beginning --bootstrap-server localhost:9092",
        why: "Démarre un consommateur qui lit le topic `events` depuis le premier événement stocké (`--from-beginning`). Sans cette option, il ne lirait que les nouveaux événements publiés après son démarrage.",
      },
      {
        kind: "text",
        text: "L'expérience fondatrice : publier trois lignes dans le producteur, les voir apparaître dans le consommateur, tuer le consommateur, publier deux lignes de plus, relancer le consommateur — il les reçoit, car les événements sont stockés. C'est toute la différence avec une file éphémère.",
      },
    ],
  },
  {
    id: "producteurs-bases",
    title: "Producteurs : clés et partitionnement",
    level: 2,
    intro:
      "Comment Kafka décide dans quelle partition va chaque événement.",
    blocks: [
      {
        kind: "diagram",
        title: "Le partitionnement par clé",
        lines: [
          "Événement SANS clé                    Événement AVEC clé",
          "  → répartition cyclique               → hash(clé) % nb_partitions",
          "    (round-robin)                         → même clé = même partition",
          "                                        → ordre garanti PAR CLÉ",
          "",
          "Exemple : clé = id client",
          "  tous les événements du client 42 → partition 1, dans l'ordre",
          "  tous les événements du client 17 → partition 0, dans l'ordre",
          "  (mais aucun ordre global entre les clients)",
        ],
      },
      {
        kind: "text",
        text: "La garantie d'ordre de Kafka est par partition, pas par topic. Choisir la clé, c'est choisir l'unité d'ordre : par client, par commande, par capteur. Sans clé, le débit est maximal mais l'ordre n'est garanti nulle part.",
      },
    ],
  },
  {
    id: "consumer-groups-bases",
    title: "Groupes de consommateurs",
    level: 2,
    intro:
      "Le mécanisme qui permet de paralléliser la lecture — et de la rejouer.",
    blocks: [
      {
        kind: "diagram",
        title: "Un topic, deux groupes, deux lectures indépendantes",
        lines: [
          "Topic orders (3 partitions)",
          "   ├── P0 ──► Groupe « billing » : consumer B1",
          "   ├── P1 ──► Groupe « billing » : consumer B2",
          "   ├── P2 ──► Groupe « billing » : consumer B1",
          "   │",
          "   ├── P0 ──► Groupe « analytics » : consumer A1",
          "   ├── P1 ──► Groupe « analytics » : consumer A1",
          "   └── P2 ──► Groupe « analytics » : consumer A1",
          "",
          "Règles :",
          " • Dans UN groupe : chaque partition est lue par UN seul consumer",
          "   → 3 partitions max = 3 consumers utiles par groupe",
          " • ENTRE groupes : chaque groupe lit TOUT le topic, à son rythme",
          "   → « billing » en temps réel, « analytics » en rejouant hier",
        ],
      },
      {
        kind: "text",
        text: "Le groupe est l'unité de parallélisme et de reprise : Kafka mémorise pour chaque groupe la position (offset) lue dans chaque partition. Un consumer qui plante est remplacé, ses partitions sont réassignées (rebalance), et la lecture reprend où elle s'était arrêtée.",
      },
    ],
  },
  {
    id: "offsets-bases",
    title: "Offsets : la position de lecture",
    level: 2,
    intro:
      "Le curseur qui rend le rejeu possible.",
    blocks: [
      {
        kind: "text",
        text: "Chaque événement d'une partition a un numéro séquentiel : son offset (0, 1, 2…). Le consumer lit les offsets dans l'ordre et valide (commit) sa progression. Tant que les événements sont dans la fenêtre de rétention, n'importe quel groupe peut revenir en arrière et relire — pour corriger un bug, recalculer un agrégat, ou alimenter un nouveau service avec l'historique complet.",
      },
      {
        kind: "list",
        items: [
          "L'offset est validé par le consumer, pas par Kafka : c'est lui qui décide quand un message est « traité ».",
          "Valider trop tôt (avant traitement) : risque de perte en cas de crash.",
          "Valider trop tard (ou jamais) : risque de doublons au redémarrage.",
          "Le compromis entre les deux s'appelle la sémantique de livraison (niveau 3).",
        ],
      },
    ],
  },
  {
    id: "docker-compose-kafka",
    title: "Docker Compose : décrire l'infrastructure",
    level: 2,
    intro:
      "Quand `docker run` ne suffit plus : déclarer le broker dans un fichier versionné.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "compose.yaml minimal (développement)",
        code: `services:\n  kafka:\n    image: apache/kafka:3.8\n    ports:\n      - "9092:9092"\n    # La configuration passe par des variables KAFKA_* :\n    # advertised.listeners, num.partitions, rétention...\n    # Voir kafka.apache.org/documentation pour la référence complète.`,
      },
      {
        kind: "text",
        text: "Le fichier Compose se versionne avec le projet : toute l'équipe démarre le même broker avec `docker compose up -d`. En production, on y ajoute les réplicas, la persistance des données (volumes), la sécurité (TLS, SASL) et le monitoring — niveau 3.",
      },
    ],
  },
  {
    id: "vocabulaire",
    title: "Vocabulaire essentiel",
    level: 2,
    intro:
      "Les dix mots qui reviennent dans toute discussion Kafka.",
    blocks: [
      {
        kind: "fields",
        title: "Glossaire",
        fields: [
          { label: "Broker", value: "Un serveur Kafka : stocke les partitions et sert producteurs et consommateurs." },
          { label: "Topic", value: "Un flux nommé d'événements : l'unité logique à laquelle on s'abonne." },
          { label: "Partition", value: "Un segment ordonné d'un topic : l'unité de parallélisme et d'ordre." },
          { label: "Offset", value: "Le numéro séquentiel d'un événement dans sa partition : le curseur de lecture." },
          { label: "Producer", value: "L'application qui publie des événements dans un topic." },
          { label: "Consumer", value: "L'application qui lit les événements d'un topic." },
          { label: "Consumer group", value: "Un ensemble de consumers qui se partagent les partitions d'un topic." },
          { label: "Leader / follower", value: "Pour chaque partition : le broker qui sert les lectures/écritures (leader) et ses copies (followers)." },
          { label: "KRaft", value: "Le mode actuel de gestion des métadonnées par Kafka lui-même, sans ZooKeeper." },
          { label: "Rétention", value: "La durée ou la taille pendant laquelle les événements sont conservés avant suppression." },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Trois projets pour passer des scripts console à un pipeline réel.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Pipeline de logs temps réel",
        fields: [
          { label: "Objectif", value: "Des producteurs qui émettent des logs, un topic, un consumer qui les écrit dans un fichier — visible en temps réel." },
          { label: "Compétences", value: "Topics, partitions, console producer/consumer, offsets." },
          { label: "Difficulté", value: "Faible — quelques jours" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Suivi de commandes événementiel",
        fields: [
          { label: "Objectif", value: "Topic `orders` partitionné par client, deux groupes : facturation (temps réel) et tableau de bord (agrégats)." },
          { label: "Compétences", value: "Clés de partitionnement, consumer groups, commits d'offsets, rejeu." },
          { label: "Difficulté", value: "Moyenne — une à deux semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Event sourcing minimal",
        fields: [
          { label: "Objectif", value: "L'état applicatif reconstruit en rejouant les événements : snapshots périodiques, rejeu après correction de bug." },
          { label: "Compétences", value: "Rétention longue, compaction de log, idempotence, schémas versionnés." },
          { label: "Difficulté", value: "Élevée — plusieurs semaines" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-brokers",
    title: "Architecture d'un cluster",
    level: 3,
    intro: "Ce qui se passe quand on passe d'un broker à un vrai cluster.",
    blocks: [
      {
        kind: "diagram",
        title: "Cluster à 3 brokers, topic à 6 partitions, réplication ×3",
        lines: [
          "Broker 1              Broker 2              Broker 3",
          "┌─────────┐           ┌─────────┐           ┌─────────┐",
          "│ P0 leader│          │ P0 replica│         │ P0 replica│",
          "│ P1 replica│         │ P1 leader │         │ P1 replica│",
          "│ P2 replica│         │ P2 replica│         │ P2 leader │",
          "│   ...   │           │   ...   │           │   ...   │",
          "└─────────┘           └─────────┘           └─────────┘",
          " • Chaque partition a UN leader (écritures/lectures) + des réplicas",
          " • Les leaders sont répartis : la charge est équilibrée",
          " • Si un broker tombe : un réplica est élu leader → pas de perte",
          "   (tant que le facteur de réplication > 1 et min.insync.replicas respecté)",
        ],
      },
      {
        kind: "text",
        text: "La réplication est ce qui rend Kafka résilient : chaque partition existe en plusieurs copies sur des brokers différents. Le producteur écrit sur le leader, qui réplique vers les followers avant d'accuser réception (selon le réglage `acks`).",
      },
    ],
  },
  {
    id: "kraft",
    title: "KRaft : Kafka sans ZooKeeper",
    level: 3,
    intro: "Le changement d'architecture majeur des versions récentes.",
    blocks: [
      {
        kind: "fields",
        title: "Avant / après",
        fields: [
          { label: "Avec ZooKeeper (historique)", value: "Un système externe gérait les métadonnées (qui est leader, quels brokers sont vivants) : deux systèmes à opérer, à sécuriser et à superviser." },
          { label: "Avec KRaft (actuel)", value: "Kafka gère ses propres métadonnées via un quorum de contrôleurs internes (protocole Raft) : un seul système, démarrage plus rapide, passage à l'échelle simplifié." },
          { label: "En pratique", value: "Les nouveaux déploiements utilisent KRaft. ZooKeeper n'est plus nécessaire et sa prise en charge a été retirée des versions récentes." },
        ],
      },
    ],
  },
  {
    id: "topics-conception",
    title: "Concevoir ses topics",
    level: 3,
    intro: "Le nommage et le découpage : des décisions qui durent.",
    blocks: [
      {
        kind: "fields",
        title: "Règles de conception",
        fields: [
          { label: "Nommage", value: "Explicite et stable : `orders.created`, `payments.authorized` — le nom décrit l'événement métier, pas l'émetteur technique. Un topic renommé, c'est tous les consommateurs à migrer." },
          { label: "Granularité", value: "Un topic par type d'événement métier, pas un topic fourre-tout : les consommateurs s'abonnent à ce qui les concerne, les schémas restent cohérents." },
          { label: "Nombre de partitions", value: "Au moins autant que le parallélisme visé (un consumer par partition et par groupe). Trop peu = goulot ; trop = rééquilibrages lents et surcharge. On peut augmenter après coup, jamais diminuer." },
          { label: "Facteur de réplication", value: "3 en production (survie à 2 pannes) ; 1 uniquement en développement local." },
        ],
      },
    ],
  },
  {
    id: "producteurs-detail",
    title: "Producteurs : les réglages qui comptent",
    level: 3,
    intro: "Fiabilité et débit se règlent côté producteur.",
    blocks: [
      {
        kind: "fields",
        title: "Les paramètres clés",
        fields: [
          { label: "`acks`", value: "`0` : on n'attend rien (pertes possibles) ; `1` : le leader a écrit (défaut raisonnable) ; `all` : tous les réplicas synchronisés ont écrit (durable, plus lent)." },
          { label: "Idempotence", value: "Le producteur numérote ses envois : en cas de réessai réseau, Kafka déduplique — le même événement n'est pas écrit deux fois." },
          { label: "Réessais", value: "Les erreurs transitoires (leader en élection) se résolvent en réessayant : configurer les retries avec backoff plutôt que d'échouer." },
          { label: "Batch", value: "Regrouper les événements (`batch.size`, `linger.ms`) : moins d'allers-retours réseau, débit multiplié — au prix d'une latence légèrement supérieure." },
          { label: "Compression", value: "Compresser les batches (lz4, snappy, zstd) : moins de réseau et de disque, un peu de CPU." },
        ],
      },
    ],
  },
  {
    id: "partitionnement-cles",
    title: "Clés de partitionnement en détail",
    level: 3,
    intro: "La clé détermine l'ordre, la répartition et les pièges.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, la clé est hachée pour choisir la partition : même clé, même partition, ordre préservé. Les pièges : une clé à faible cardinalité (ex. un booléen) concentre tout sur deux partitions — le reste est inactif ; une clé trop fine (un UUID par événement) disperse sans ordre utile. La bonne clé a une cardinalité élevée et un sens métier : identifiant client, commande, capteur.",
      },
      {
        kind: "list",
        items: [
          "Ordre garanti uniquement au sein d'une partition : concevoir les consommateurs en conséquence.",
          "Partitionneur personnalisé possible, mais le défaut (hash de la clé) suffit presque toujours.",
          "Augmenter le nombre de partitions casse l'ordre par clé existant : à planifier avant la production.",
        ],
      },
    ],
  },
  {
    id: "consommateurs-detail",
    title: "Consommateurs : la boucle de lecture",
    level: 3,
    intro: "Le pattern fondamental : poll, traiter, committer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Poll", detail: "Le consumer demande un lot d'événements (`poll`) : Kafka lui assigne ses partitions et lui envoie les prochains offsets." },
          { title: "Traiter", detail: "L'application traite chaque événement : écrire en base, appeler une API, agréger. C'est ici que le temps se passe." },
          { title: "Committer", detail: "Une fois le lot traité, le consumer valide sa position : au prochain redémarrage, la lecture reprend après." },
          { title: "Recommencer", detail: "Boucle infinie : un consumer est un processus longue durée, pas un script ponctuel." },
        ],
      },
      {
        kind: "text",
        text: "Le point délicat est l'articulation traiter/commit : committer avant de traiter = risque de perte ; traiter puis committer = risque de doublon en cas de crash entre les deux. Le choix définit la sémantique de livraison.",
      },
    ],
  },
  {
    id: "rebalance",
    title: "Rééquilibrage (rebalance)",
    level: 3,
    intro: "Ce qui se passe quand le groupe change : arrivée, départ, panne.",
    blocks: [
      {
        kind: "text",
        text: "Quand un consumer rejoint ou quitte le groupe, Kafka réassigne les partitions entre les membres : c'est le rebalance. Pendant cette phase, la consommation est suspendue — des rebalances fréquents (consumers instables, traitements trop longs) paralysent le groupe. Les protocoles récents (cooperative rebalancing) limitent l'interruption aux seules partitions qui changent de main.",
      },
      {
        kind: "list",
        items: [
          "Un traitement plus long que `max.poll.interval.ms` fait croire à une panne : le consumer est exclu, ses partitions réassignées, puis il revient — boucle de rebalances.",
          "Dimensionner le traitement par lot et la fréquence de poll en conséquence.",
          "Plus de consumers que de partitions dans un groupe : les surnuméraires restent inactifs.",
        ],
      },
    ],
  },
  {
    id: "semantiques-livraison",
    title: "Sémantiques de livraison",
    level: 3,
    intro: "Le triangle impossible : choisir ce qu'on garantit.",
    blocks: [
      {
        kind: "table",
        headers: ["Sémantique", "Garantie", "Coût", "Quand l'utiliser"],
        rows: [
          ["At-most-once", "Jamais de doublon, pertes possibles", "Le plus simple", "Métriques, logs où la perte est acceptable"],
          ["At-least-once", "Jamais de perte, doublons possibles", "Traitement idempotent requis", "Le défaut raisonnable : la plupart des pipelines"],
          ["Exactly-once", "Ni perte ni doublon, de bout en bout", "Transactions Kafka, complexe", "Pipelines critiques (comptabilité, facturation)"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, le couple gagnant est at-least-once + traitement idempotent : traiter deux fois le même événement donne le même résultat (clé unique en base, opération idempotente). C'est plus simple que l'exactly-once transactionnel et suffisant dans l'immense majorité des cas.",
      },
    ],
  },
  {
    id: "retention",
    title: "Rétention : combien de temps garder",
    level: 3,
    intro: "Kafka n'est pas une file éphémère : la rétention définit sa mémoire.",
    blocks: [
      {
        kind: "fields",
        title: "Les politiques",
        fields: [
          { label: "Basée sur le temps", value: "Supprimer les événements après N jours : le réglage classique (ex. 7 jours de transactions, 1 an d'audit)." },
          { label: "Basée sur la taille", value: "Limiter le topic à N Go : les plus vieux événements partent quand le quota est atteint." },
          { label: "Compaction de log", value: "Ne garder que la dernière valeur par clé : le topic devient une table d'état rejouable (profils utilisateurs, stocks)." },
        ],
      },
      {
        kind: "text",
        text: "La rétention se choisit par topic selon l'usage : courte pour les flux temps réel éphémères, longue pour l'audit et l'event sourcing, compactée pour l'état. C'est elle qui rend le rejeu possible — ou impossible.",
      },
    ],
  },
  {
    id: "log-compaction",
    title: "Compaction de log en détail",
    level: 3,
    intro: "Quand un topic devient une base de données rejouable.",
    blocks: [
      {
        kind: "text",
        text: "Avec la compaction, Kafka ne garde que le dernier événement par clé : publier `user-42 → {ville: Paris}` puis `user-42 → {ville: Lyon}` ne conserve que Lyon. Un nouveau consumer qui lit le topic compacté depuis le début reconstruit l'état actuel complet — c'est le fondement du pattern « topic comme table » et de l'event sourcing avec snapshots implicites.",
      },
      {
        kind: "list",
        items: [
          "Nécessite une clé sur chaque événement : sans clé, rien à compacter.",
          "Les suppressions se représentent par un événement à valeur nulle (tombstone).",
          "Idéal pour : profils, configurations, catalogues, stocks — tout état à clé.",
          "Inadapté pour : l'historique immuable (audit, transactions) — là, la rétention temporelle gagne.",
        ],
      },
    ],
  },
  {
    id: "schema-registry",
    title: "Schema Registry : versionner les événements",
    level: 3,
    intro: "Faire évoluer le format sans casser les consommateurs.",
    blocks: [
      {
        kind: "text",
        text: "Quand un producteur ajoute un champ à ses événements, les vieux consommateurs doivent continuer à fonctionner. Le Schema Registry centralise les schémas (Avro, Protobuf, JSON Schema) et contrôle leur compatibilité : un nouveau schéma incompatible est rejeté avant de casser quoi que ce soit.",
      },
      {
        kind: "fields",
        title: "Les règles de compatibilité",
        fields: [
          { label: "Backward", value: "Le nouveau schéma lit les anciennes données : on peut déployer les consommateurs d'abord. Ajouter un champ optionnel." },
          { label: "Forward", value: "L'ancien schéma lit les nouvelles données : on peut déployer les producteurs d'abord." },
          { label: "Full", value: "Les deux sens : la liberté totale de déploiement." },
          { label: "Règle d'or", value: "Ajouter des champs optionnels, jamais renommer ni changer le type d'un champ existant sans version majeure." },
        ],
      },
    ],
  },
  {
    id: "kafka-connect",
    title: "Kafka Connect",
    level: 3,
    intro: "Brancher le monde extérieur sans écrire de code.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux directions",
        fields: [
          { label: "Source connectors", value: "De l'extérieur vers Kafka : capturer les changements d'une base (CDC), lire des fichiers, interroger une API — et publier des événements." },
          { label: "Sink connectors", value: "De Kafka vers l'extérieur : écrire dans un data warehouse, un stockage objet, une autre base, envoyer des alertes." },
          { label: "Workers", value: "Les connecteurs tournent dans des workers Kafka Connect (distribués, tolérants aux pannes) : configuration par API REST, pas de code à déployer." },
        ],
      },
      {
        kind: "text",
        text: "Connect transforme Kafka en hub d'intégration : au lieu d'écrire un producteur sur mesure pour chaque source, on configure un connecteur. Le code métier se concentre sur les consumers qui apportent de la valeur.",
      },
    ],
  },
  {
    id: "kafka-streams",
    title: "Traitement : Kafka Streams et ksqlDB",
    level: 3,
    intro: "Quand le traitement vit dans Kafka lui-même.",
    blocks: [
      {
        kind: "fields",
        title: "Les options",
        fields: [
          { label: "Kafka Streams", value: "Une bibliothèque (JVM) pour écrire des applications de stream processing : filtrer, agréger par fenêtre, joindre des topics — avec état local et exactly-once." },
          { label: "ksqlDB", value: "Du SQL sur les streams : déclarer des transformations et des agrégations continues sans écrire d'application." },
          { label: "Consumers classiques", value: "Souvent suffisants : lire, traiter, écrire ailleurs. Ne complexifier que si le besoin (fenêtres, jointures de streams) le justifie." },
        ],
      },
    ],
  },
  {
    id: "securite-kafka",
    title: "Sécuriser Kafka",
    level: 3,
    intro: "Un cluster ouvert à tous est une catastrophe : les trois couches.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois couches",
        fields: [
          { label: "Chiffrement (TLS)", value: "Chiffrer les communications clients-brokers et inter-brokers : sans TLS, les événements voyagent en clair sur le réseau." },
          { label: "Authentification (SASL)", value: "Vérifier l'identité des clients : SASL/PLAIN (simple, avec TLS), SCRAM (challenge-réponse), Kerberos ou OAuth selon l'écosystème." },
          { label: "Autorisation (ACLs)", value: "Limiter par principal : tel service peut écrire sur `orders.*` mais pas lire `payments.*`, tel consumer group peut lire tel topic. Le moindre privilège, par topic." },
        ],
      },
    ],
  },
  {
    id: "monitoring-kafka",
    title: "Superviser Kafka",
    level: 3,
    intro: "Les indicateurs qui disent si le cluster va bien.",
    blocks: [
      {
        kind: "fields",
        title: "Les métriques vitales",
        fields: [
          { label: "Consumer lag", value: "Le retard d'un groupe par rapport à la fin du topic : LA métrique métier. Un lag qui grandit = les consumers ne suivent plus." },
          { label: "Under-replicated partitions", value: "Des partitions dont les réplicas sont à la traîne : signe de broker en difficulté ou de réseau saturé. Zéro est la normale." },
          { label: "Requêtes producteur/consumer", value: "Débit, latence, erreurs : la santé du trafic." },
          { label: "Espace disque", value: "Les logs grandissent avec la rétention : prévoir et alerter avant saturation." },
          { label: "Élections de leader", value: "Des élections fréquentes signalent des brokers instables." },
        ],
      },
    ],
  },
  {
    id: "pannes-courantes",
    title: "Pannes courantes et remèdes",
    level: 3,
    intro: "Ce qui casse en production, et par où commencer.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          { label: "Consumer lag qui explose", value: "Cause : traitement trop lent ou consumers trop peu nombreux. Remède : scaler les consumers (jusqu'au nombre de partitions), optimiser le traitement, vérifier les rebalances." },
          { label: "Rebalances en boucle", value: "Cause : traitements plus longs que le timeout de session. Remède : augmenter `max.poll.interval.ms`, réduire la taille des lots, traiter plus vite." },
          { label: "Broker à court de disque", value: "Cause : rétention trop longue pour le volume. Remède : réduire la rétention, ajouter du disque, archiver vers un stockage objet." },
          { label: "Partitions sous-répliquées", value: "Cause : broker lent ou tombé. Remède : investiguer le broker (disque, réseau, GC), remplacer si nécessaire." },
          { label: "Producteur qui perd des messages", value: "Cause : `acks=0` ou pas de retries sur erreurs transitoires. Remède : `acks=all` + idempotence + retries pour les flux critiques." },
        ],
      },
    ],
  },
  {
    id: "debugging-kafka",
    title: "Déboguer Kafka",
    level: 3,
    intro: "La méthode quand les événements n'arrivent pas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Le topic existe-t-il ?", detail: "`kafka-topics.sh --list` puis `--describe` : partitions, leaders, réplicas. Un topic auto-créé peut avoir de mauvais réglages." },
          { title: "Le producteur écrit-il ?", detail: "Tester avec le console producer : si ça marche au clavier, le problème est dans le code du producteur (configuration, sérialisation, `acks`)." },
          { title: "Le consumer lit-il ?", detail: "Console consumer avec `--from-beginning` : si les événements sont là, le problème est dans le groupe (offsets déjà validés, mauvaise assignation)." },
          { title: "Où en sont les offsets ?", detail: "Décrire le consumer group : lag par partition. Un lag à zéro avec des événements attendus = le consumer ne lit pas le bon topic." },
          { title: "Le réseau et la sécurité", detail: "`advertised.listeners` mal configuré est la cause n°1 des « ça marche en local, pas depuis le conteneur » : le client doit joindre l'adresse annoncée, pas seulement le port mappé." },
        ],
      },
    ],
  },
  {
    id: "testing-kafka",
    title: "Tester avec Kafka",
    level: 3,
    intro: "Des tests déterministes malgré l'asynchrone.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tester la logique métier sans Kafka : extraire le traitement pur (fonction événement → résultat) et le tester en unitaire.",
          "Tests d'intégration sur topics dédiés : un topic par test (nom unique), production d'événements connus, attente du traitement avec timeout.",
          "Isolation : consumer groups uniques par test pour ne pas interférer ; nettoyer les topics après.",
          "Tester les cas limites : doublon (idempotence), événement malformé (dead letter), redémarrage (reprise sur offset).",
          "Ne pas tester Kafka lui-même : tester que votre code produit et consomme correctement.",
        ],
      },
    ],
  },
  {
    id: "cas-usage",
    title: "Cas d'usage typiques",
    level: 3,
    intro: "Où Kafka excelle vraiment — et où il est surdimensionné.",
    blocks: [
      {
        kind: "fields",
        title: "Les grands cas",
        fields: [
          { label: "Event sourcing", value: "Les événements sont la source de vérité, l'état se reconstruit par rejeu : audit complet, voyage dans le temps." },
          { label: "CDC (Change Data Capture)", value: "Capturer les changements d'une base et les diffuser : synchroniser cache, recherche, data warehouse en temps réel." },
          { label: "Microservices événementiels", value: "Les services communiquent par événements plutôt que par appels synchrones : découplage et résilience." },
          { label: "Pipelines de données", value: "Ingestion IoT, logs, tracking : du producteur au stockage analytique en streaming." },
          { label: "CQRS", value: "Séparer écritures (commandes) et lectures (projections reconstruites depuis les événements)." },
        ],
      },
      {
        kind: "text",
        text: "Et quand ne pas l'utiliser : communication simple entre deux services (une API suffit), données peu volumineuses et peu fréquentes, équipe sans expérience d'exploitation — Kafka est une infrastructure à opérer, pas une bibliothèque.",
      },
    ],
  },
  {
    id: "kafka-vs-alternatives",
    title: "Kafka vs les alternatives",
    level: 3,
    intro: "Positionner Kafka parmi les systèmes de messagerie.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Kafka", "RabbitMQ (broker classique)", "Redis Streams / Pub-Sub"],
        rows: [
          ["Modèle", "Log distribué, rejouable", "Files d'attente, routage flexible", "Structures en mémoire, léger"],
          ["Rétention", "Longue (jours à années)", "Courte (le message est consommé puis supprimé)", "Courte à moyenne"],
          ["Débit", "Très élevé", "Modéré à élevé", "Élevé, en mémoire"],
          ["Cas typique", "Streaming, event sourcing", "Tâches de fond, RPC, routage complexe", "Cache, temps réel léger"],
        ],
      },
      {
        kind: "text",
        text: "La différence fondamentale : Kafka stocke et rejoue, les brokers classiques distribuent et oublient. On choisit Kafka quand l'historique et le rejeu ont de la valeur ; sinon, un système plus simple suffit.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les fautes classiques des premiers clusters.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Une seule partition « pour commencer »",
            value:
              "Problem : aucun parallélisme, un seul consumer utile. Better : dimensionner selon le débit visé dès la création (augmenter après est possible, jamais diminuer).",
          },
          {
            label: "Pas de clé, ordre supposé",
            value:
              "Problem : les événements d'un même client sont dispersés, l'ordre n'est garanti nulle part. Better : clé métier = unité d'ordre.",
          },
          {
            label: "Commit avant traitement",
            value:
              "Problem : crash entre les deux = événement perdu silencieusement. Better : traiter puis committer (at-least-once + idempotence).",
          },
          {
            label: "Rétention par défaut jamais ajustée",
            value:
              "Problem : disque plein ou historique perdu trop tôt. Better : rétention pensée par topic selon l'usage.",
          },
          {
            label: "Schémas non versionnés",
            value:
              "Problem : un champ ajouté casse les vieux consumers. Better : Schema Registry + règles de compatibilité.",
          },
          {
            label: "Plus de consumers que de partitions",
            value:
              "Problem : des consumers inactifs qui consomment des ressources. Better : aligner les deux, ou augmenter les partitions.",
          },
          {
            label: "Secrets et topics en clair sur le réseau",
            value:
              "Problem : cluster sans TLS/SASL exposé. Better : les trois couches de sécurité dès que ça dépasse le laptop.",
          },
          {
            label: "Ignorer le consumer lag",
            value:
              "Problem : on découvre le retard quand les utilisateurs s'en plaignent. Better : alerter sur le lag, pas seulement sur les erreurs.",
          },
          {
            label: "Réplication ×1 en production",
            value:
              "Problem : un broker qui tombe = données perdues. Better : facteur 3, `min.insync.replicas=2`, `acks=all` pour le critique.",
          },
          {
            label: "Traitements longs dans le poll",
            value:
              "Problem : rebalances en boucle, groupe paralysé. Better : lots petits, traitements rapides ou externalisés, timeouts ajustés.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Les réflexes d'un pipeline Kafka sain.",
    blocks: [
      {
        kind: "list",
        items: [
          "Nommer les topics pour le métier, pas pour la technique — ils vivent longtemps.",
          "Toujours une clé métier : c'est elle qui donne l'ordre et la répartition.",
          "At-least-once + idempotence par défaut ; exactly-once seulement si prouvé nécessaire.",
          "Schémas versionnés et compatibilité vérifiée avant chaque évolution.",
          "Rétention pensée par topic, pas subie par défaut.",
          "Sécuriser les trois couches (TLS, SASL, ACLs) dès que ça quitte le poste local.",
          "Superviser le consumer lag en premier, le reste ensuite.",
          "Tester la reprise : tuer un broker, un consumer — vérifier que ça repart.",
          "Documenter les topics : qui produit, qui consomme, quel schéma, quelle rétention.",
          "Ne pas mettre Kafka là où une simple API suffit.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "Documentation Kafka", value: "https://kafka.apache.org/documentation/ — la référence : concepts, configuration, opérations, API clientes." },
          { label: "Quickstart officiel", value: "Le guide de démarrage de la documentation : premier topic en quelques minutes." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les scripts `kafka-*.sh` et une interface visuelle (Kafka UI / Kafdrop en conteneur) pour voir les topics et offsets.",
          "Pages liées de cette plateforme : Docker, Data Engineering, RabbitMQ si détaillées dans votre parcours.",
        ],
      },
    ],
  },
  {
    id: "formats-serialisation",
    title: "Formats de sérialisation",
    level: 3,
    intro: "Comment les événements sont encodés : lisibilité contre efficacité.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois formats courants",
        fields: [
          { label: "JSON", value: "Lisible, universel, sans schéma : parfait pour débuter et déboguer. Coût : verbeux, typage faible, pas de compatibilité contrôlée." },
          { label: "Avro", value: "Binaire, compact, avec schéma : le standard historique de l'écosystème Kafka, excellent avec le Schema Registry." },
          { label: "Protobuf", value: "Binaire, très efficace, schémas évolutifs : le choix des systèmes polyglottes à fort volume." },
        ],
      },
      {
        kind: "text",
        text: "La trajectoire typique : JSON pour prototyper, puis Avro ou Protobuf avec Schema Registry quand les contrats se stabilisent et que les équipes se multiplient. Changer de format après coup, c'est migrer tous les producteurs et consommateurs — décider tôt.",
      },
    ],
  },
  {
    id: "transactions-kafka",
    title: "Transactions Kafka (exactly-once)",
    level: 3,
    intro: "Comment Kafka tient sa promesse d'exactly-once de bout en bout.",
    blocks: [
      {
        kind: "text",
        text: "Le producteur transactionnel écrit ses événements et la validation de ses offsets dans une même transaction : soit tout est visible (événements + offsets), soit rien. Les consumers configurés en `read_committed` ne voient que les transactions validées. C'est puissant mais coûteux en latence et en complexité — réservé aux pipelines où le doublon est inacceptable et l'idempotence impossible.",
      },
    ],
  },
  {
    id: "dead-letter",
    title: "Dead letter queues",
    level: 3,
    intro: "Que faire des événements qui refusent d'être traités.",
    blocks: [
      {
        kind: "text",
        text: "Un événement malformé ou qui fait systématiquement échouer le traitement ne doit pas bloquer la partition indéfiniment. Après N tentatives, on le route vers un topic d'erreurs (dead letter queue) avec le contexte (erreur, offset d'origine, horodatage) : le flux principal continue, et une équipe traite les erreurs séparément — correction, rejeu, ou suppression consciente.",
      },
      {
        kind: "list",
        items: [
          "Compteur de tentatives borné : jamais de boucle infinie sur le même événement.",
          "Contexte préservé : sans l'événement d'origine et l'erreur, la dead letter est inexploitable.",
          "Alerte : une dead letter qui se remplit est un incident en cours, pas une archive.",
          "Rejeu possible : après correction du bug, rejouer les événements vers le topic principal.",
        ],
      },
    ],
  },
  {
    id: "quotas",
    title: "Quotas et protection du cluster",
    level: 3,
    intro: "Empêcher un client gourmand d'affamer les autres.",
    blocks: [
      {
        kind: "text",
        text: "Kafka permet de limiter le débit par client (producteur ou consumer) : un service défectueux qui publie en boucle ou un consumer qui scanne l'historique entier ne doivent pas saturer le cluster. Les quotas s'appliquent par utilisateur ou par client-id, sur la bande passante réseau et le taux de requêtes — une protection simple contre les voisins bruyants.",
      },
    ],
  },
  {
    id: "multi-datacenter",
    title: "Multi-datacenter",
    level: 3,
    intro: "Quand un seul cluster ne suffit plus géographiquement.",
    blocks: [
      {
        kind: "text",
        text: "Répliquer des topics entre clusters (plusieurs régions ou sites) se fait avec des outils de réplication inter-clusters (type MirrorMaker 2) : un cluster source, un cluster cible, une réplication asynchrone des événements. Les questions deviennent alors : quel cluster fait foi en cas de divergence, quel RPO on accepte entre sites, et comment les consumers basculent. C'est de l'architecture distribuée avancée — à n'aborder qu'avec un cluster mono-site déjà maîtrisé.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Kafka maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Industrialiser les pipelines : `data-engineering` — ingestion, entrepôts, orchestration.",
          "Conteneuriser proprement : `docker` — Compose, volumes, réseaux.",
          "Orchestrer : `kubernetes` — déployer Kafka et ses consumers à l'échelle.",
          "Comparer les brokers : `rabbitmq` — files classiques vs log distribué.",
          "Écrire les clients : `python` — producteurs et consumers applicatifs.",
        ],
      },
    ],
  },
];

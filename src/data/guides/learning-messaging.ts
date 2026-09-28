import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des files de messages : de zéro à un usage
 * professionnel de RabbitMQ et Kafka. 3 niveaux d'information (Aperçu /
 * Pratique / Approfondi) avec divulgation progressive. Tous les textes
 * supportent le code inline entre backticks. Commandes toujours
 * expliquées : label, commande, pourquoi, vérification.
 */
export const LEARNING_MESSAGING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que sont les files de messages, pourquoi elles existent et quel problème elles résolvent.",
    blocks: [
      {
        kind: "text",
        text: "Une file de messages est un intermédiaire entre des programmes : un producteur y dépose des messages, des consommateurs les récupèrent et les traitent à leur rythme. L'émetteur n'attend pas la réponse et ne sait pas qui traitera le message. Les deux outils de référence sont RabbitMQ (routage flexible de tâches) et Kafka (journal d'événements à haut débit).",
      },
      {
        kind: "text",
        text: "Pourquoi elles existent : dans une API synchrone classique, chaque requête attend que tout le travail soit terminé — envoi d'email, génération de PDF, appel à un service tiers. Quand le trafic augmente ou qu'un service ralentit, les requêtes s'accumulent et les timeouts explosent. La file casse ce lien : l'API répond vite (« demande reçue »), et des workers traitent le travail en arrière-plan, au rythme qu'ils supportent.",
      },
      {
        kind: "diagram",
        title: "Sans file vs avec file",
        lines: [
          "Sans file (synchrone) :",
          "  Client → API → [envoi email 3s] → [PDF 5s] → Réponse (8s)",
          "  Un service lent = une API lente.",
          "",
          "Avec file (asynchrone) :",
          "  Client → API → file → Réponse immédiate (50ms)",
          "                       ↓",
          "                 Workers → email, PDF, à leur rythme",
        ],
      },
    ],
  },
  {
    id: "synchrone-vs-asynchrone",
    title: "Synchrone vs asynchrone",
    level: 1,
    intro:
      "Le changement de modèle mental le plus important : passer de « j'appelle et j'attends » à « je publie et j'oublie ».",
    blocks: [
      {
        kind: "table",
        headers: ["", "Appel synchrone (HTTP)", "Message asynchrone (file)"],
        rows: [
          ["Couplage", "L'appelant connaît le destinataire", "Producteur et consommateur s'ignorent"],
          ["Temps de réponse", "Lié à la durée du traitement", "Immédiat : le message est déposé"],
          ["Panne du destinataire", "L'appel échoue", "Les messages s'accumulent, repris ensuite"],
          ["Pic de charge", "Timeouts en cascade", "La file absorbe le pic, les workers suivent"],
          ["Garantie", "Réponse ou erreur immédiate", "Traitement différé, accusé de réception"],
        ],
      },
      {
        kind: "text",
        text: "L'asynchrone n'est pas gratuit : il ajoute un composant à opérer (le broker), rend le débogage plus indirect (plus de pile d'appels simple) et exige de penser les échecs (retry, doublons). On l'adopte quand les bénéfices — découplage, résilience, absorption des pics — dépassent ces coûts. Tout ne doit pas passer par une file.",
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
      "Ce qu'il faut maîtriser avant de toucher à un broker, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Bases indispensables",
        fields: [
          {
            label: "API REST",
            value:
              "Comprendre le modèle requête/réponse synchrone : c'est en voyant ses limites (timeouts, pics, traitements longs) que l'asynchrone prend sens.",
          },
          {
            label: "Python",
            value:
              "Écrire producteurs et consommateurs : fonctions, gestion d'erreurs, boucles. Les exemples de cette page sont en Python.",
          },
          {
            label: "Docker",
            value:
              "Lancer un broker en local d'une commande, sans installer de serveur sur sa machine. Les deux installations ci-dessous passent par Docker.",
          },
          {
            label: "JSON",
            value:
              "Le format d'échange quasi universel des messages : savoir sérialiser et désérialiser proprement.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-rabbitmq",
    title: "Installer RabbitMQ",
    level: 2,
    intro:
      "Lancer RabbitMQ en local avec Docker, avec son interface d'administration.",
    blocks: [
      {
        kind: "command",
        label: "Démarrer RabbitMQ avec l'interface de gestion",
        command:
          "docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management",
        why: "Lance le broker RabbitMQ officiel : le port 5672 reçoit les messages (protocole AMQP), le port 15672 expose l'interface web d'administration. Le tag `3-management` inclut le plugin de gestion — l'image `rabbitmq:3` seule ne l'a pas.",
        verify: "docker ps --filter name=rabbitmq",
      },
      {
        kind: "text",
        text: "Ouvrez ensuite `http://localhost:15672` dans un navigateur : identifiants par défaut `guest` / `guest` (valables uniquement depuis localhost, par sécurité). Vous y verrez les queues, les échanges et le trafic en temps réel — l'outil le plus pédagogique pour comprendre ce qui se passe.",
      },
    ],
  },
  {
    id: "installation-kafka",
    title: "Installer Kafka",
    level: 2,
    intro:
      "Lancer Kafka en local avec l'image Docker officielle, en mode KRaft (sans ZooKeeper).",
    blocks: [
      {
        kind: "command",
        label: "Démarrer Kafka avec l'image officielle",
        command: "docker run -d --name kafka -p 9092:9092 apache/kafka:latest",
        why: "Lance un broker Kafka officiel en mode KRaft : plus besoin de ZooKeeper, le broker gère lui-même ses métadonnées. Le port 9092 est le port client standard. La configuration par défaut suffit pour apprendre : un seul nœud, écoute sur localhost.",
        verify: "docker logs kafka --tail 20",
      },
      {
        kind: "text",
        text: "Dans les logs, cherchez une ligne indiquant que le broker a démarré (par exemple `[KafkaServer] started`). Le premier démarrage prend quelques dizaines de secondes : Kafka initialise son journal interne avant d'accepter les connexions.",
      },
    ],
  },
  {
    id: "premier-message-rabbitmq",
    title: "Premier message avec RabbitMQ",
    level: 2,
    intro:
      "Publier puis consommer un message avec la bibliothèque Python `pika`, en comprenant chaque étape.",
    blocks: [
      {
        kind: "command",
        label: "Installer le client Python pour RabbitMQ",
        command: "pip install pika",
        why: "`pika` est le client AMQP de référence pour Python. Il parle le protocole AMQP 0-9-1 au broker : déclarer des queues, publier, consommer avec accusés de réception.",
        verify: "python3 -c \"import pika; print(pika.__version__)\"",
      },
      {
        kind: "code",
        language: "python",
        title: "producer.py — publier un message",
        code: `import pika

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

# La queue est déclarée par le producteur : idempotent,
# elle n'est créée que si elle n'existe pas.
channel.queue_declare(queue="emails", durable=True)

channel.basic_publish(
    exchange="",
    routing_key="emails",
    body="bienvenue@example.com",
    properties=pika.BasicProperties(delivery_mode=2),  # message persistant
)
print("Message publié")
connection.close()`,
      },
      {
        kind: "code",
        language: "python",
        title: "consumer.py — consommer et accuser réception",
        code: `import pika

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()
channel.queue_declare(queue="emails", durable=True)

def on_message(ch, method, properties, body):
    print("Reçu :", body.decode())
    # ... traitement réel ici (envoi de l'email) ...
    ch.basic_ack(delivery_tag=method.delivery_tag)  # accusé de réception

channel.basic_consume(queue="emails", on_message_callback=on_message)
print("En attente de messages...")
channel.start_consuming()`,
      },
      {
        kind: "text",
        text: "Lancez le consommateur d'abord, puis le producteur : le message apparaît côté consommateur, et disparaît de la queue après l'`ack`. Tuez le consommateur avant l'`ack` (Ctrl+C pendant le traitement) et relancez-le : le message est redélivré. C'est la garantie fondamentale — aucun message perdu sur panne du worker.",
      },
    ],
  },
  {
    id: "premier-topic-kafka",
    title: "Premier topic avec Kafka",
    level: 2,
    intro:
      "Créer un topic puis y publier et lire des événements avec les outils en ligne de commande fournis par Kafka.",
    blocks: [
      {
        kind: "command",
        label: "Créer un topic",
        command:
          "docker exec kafka /opt/kafka/bin/kafka-topics.sh --create --topic inscriptions --bootstrap-server localhost:9092",
        why: "Crée le topic `inscriptions` : le journal nommé où les événements seront écrits. Les scripts CLI de Kafka sont dans `/opt/kafka/bin` dans l'image officielle (`kafka-topics.sh`, `kafka-console-producer.sh`, `kafka-console-consumer.sh`). `--bootstrap-server` indique le broker à contacter.",
        verify:
          "docker exec kafka /opt/kafka/bin/kafka-topics.sh --list --bootstrap-server localhost:9092",
      },
      {
        kind: "command",
        label: "Publier des événements (producteur console)",
        command:
          "docker exec -it kafka /opt/kafka/bin/kafka-console-producer.sh --topic inscriptions --bootstrap-server localhost:9092",
        why: "Ouvre un producteur interactif : chaque ligne tapée devient un événement publié dans le topic. Le `-it` garde le terminal interactif pour saisir les messages au clavier.",
      },
      {
        kind: "command",
        label: "Lire les événements (consommateur console)",
        command:
          "docker exec -it kafka /opt/kafka/bin/kafka-console-consumer.sh --topic inscriptions --from-beginning --bootstrap-server localhost:9092",
        why: "Ouvre un consommateur qui affiche les événements. `--from-beginning` relit tout l'historique du topic — la différence majeure avec une queue RabbitMQ : les messages ne sont pas supprimés après lecture, ils restent rejouables.",
      },
    ],
  },
  {
    id: "interface-management",
    title: "Explorer l'interface de gestion",
    level: 2,
    intro:
      "RabbitMQ expose une interface web et une API HTTP : les utiliser pour observer les files en temps réel.",
    blocks: [
      {
        kind: "command",
        label: "Interroger l'API de gestion RabbitMQ",
        command: "curl -s -u guest:guest http://localhost:15672/api/overview | head -c 400",
        why: "L'API HTTP du plugin management expose l'état du broker en JSON : versions, totaux de messages, taux de publication. C'est la même source que l'interface web — utile pour scripter des vérifications ou brancher du monitoring.",
        verify: "curl -s -u guest:guest http://localhost:15672/api/queues | head -c 300",
      },
      {
        kind: "list",
        items: [
          "Onglet Queues : voir les messages prêts (`Ready`) et en cours (`Unacked`) — un `Unacked` qui grandit signale des workers bloqués.",
          "Onglet Exchanges : visualiser comment les messages sont routés vers les queues.",
          "Onglet Connections/Channels : vérifier que vos producteurs et consommateurs sont bien connectés.",
          "Graphiques de taux : confirmer visuellement que publier puis consommer fait monter puis descendre la courbe.",
        ],
      },
    ],
  },
  {
    id: "queues-vs-topics",
    title: "Queues vs topics",
    level: 2,
    intro:
      "Les deux modèles mentaux à ne jamais confondre : la queue distribue du travail, le topic diffuse des faits.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Queue (RabbitMQ)", "Topic (Kafka)"],
        rows: [
          ["Question posée", "« Qui traite cette tâche ? »", "« Que s'est-il passé ? »"],
          ["Après lecture", "Le message est supprimé (après ack)", "L'événement reste, rejouable"],
          ["Plusieurs consommateurs", "Ils se partagent les messages", "Chacun lit tout, indépendamment"],
          ["Cas typique", "Envoi d'emails, génération de PDF, tâches", "Historique d'événements, analytics, réplication"],
          ["Ordre", "Ordre d'arrivée (par queue)", "Ordre garanti par partition"],
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : si chaque message doit être traité exactement une fois par un worker parmi plusieurs (une tâche à faire), c'est une queue. Si plusieurs systèmes indépendants doivent réagir au même fait (une commande passée intéresse la facturation, le stock et les emails), c'est un topic.",
      },
    ],
  },
  {
    id: "configuration-connexion",
    title: "Configurer la connexion",
    level: 2,
    intro:
      "Les paramètres de connexion à connaître pour brancher une application à un broker, en local comme en production.",
    blocks: [
      {
        kind: "fields",
        title: "RabbitMQ — paramètres de connexion",
        fields: [
          {
            label: "Hôte et port",
            value: "`localhost:5672` en local. En production : l'adresse du cluster, jamais exposée publiquement sans TLS.",
          },
          {
            label: "Virtual host",
            value: "`/` par défaut. Un vhost isole des environnements (dev, staging) dans le même broker, avec des droits séparés.",
          },
          {
            label: "Identifiants",
            value: "`guest`/`guest` en local uniquement. En production : un utilisateur dédié par application, stocké en variable d'environnement.",
          },
          {
            label: "Heartbeat",
            value: "Ping régulier qui détecte les connexions mortes (défaut 60s). À réduire derrière certains pare-feux qui coupent les connexions inactives.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Kafka — paramètres de connexion",
        fields: [
          {
            label: "Bootstrap servers",
            value: "`localhost:9092` en local : la liste initiale des brokers. Le client découvre ensuite tout le cluster tout seul.",
          },
          {
            label: "Client id / Group id",
            value: "Identifient l'application et le groupe de consommateurs : deux consommateurs du même groupe se partagent les partitions.",
          },
          {
            label: "Acks (producteur)",
            value: "`0`, `1` ou `all` : aucun accusé, leader seul, ou toutes les répliques. Le réglage central du compromis vitesse/durabilité.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "Comment on travaille avec des files au quotidien : environnements, conventions, réflexes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un broker par environnement : jamais le même RabbitMQ/Kafka pour le dev et la production. En local : Docker Compose avec la stack complète (API + broker + base).",
          "Nommage explicite : `emails.transactionnels`, `commandes.creees` — le nom du topic ou de la queue doit dire ce qu'il contient, pas qui le consomme.",
          "Messages en JSON avec un schéma stable : champs `event_id`, `event_type`, `occurred_at` systématiques pour tracer et dédupliquer.",
          "Ne jamais mettre de secrets dans les messages : un journal Kafka conserve l'historique, un mot de passe y resterait des mois.",
          "Versionner les contrats de messages comme une API : ajouter des champs optionnels, ne jamais renommer un champ existant sans migration.",
        ],
      },
    ],
  },
  {
    id: "outils-cli",
    title: "Outils en ligne de commande",
    level: 2,
    intro:
      "Les commandes d'administration à connaître pour inspecter et opérer un broker sans interface graphique.",
    blocks: [
      {
        kind: "fields",
        title: "Kafka — scripts dans /opt/kafka/bin",
        fields: [
          {
            label: "kafka-topics.sh",
            value: "Créer, lister, décrire, modifier les topics (`--create`, `--list`, `--describe`, `--alter`).",
          },
          {
            label: "kafka-console-producer.sh",
            value: "Publier des messages depuis le terminal : tests rapides et démonstrations.",
          },
          {
            label: "kafka-console-consumer.sh",
            value: "Lire un topic depuis le terminal, avec `--from-beginning` pour rejouer l'historique.",
          },
          {
            label: "kafka-consumer-groups.sh",
            value: "Inspecter les groupes de consommateurs : `--describe` affiche le lag par partition, l'indicateur de santé numéro un.",
          },
        ],
      },
      {
        kind: "fields",
        title: "RabbitMQ — via docker exec",
        fields: [
          {
            label: "rabbitmqctl",
            value: "`docker exec rabbitmq rabbitmqctl status` : état du nœud. `list_queues` : contenu des files en une ligne.",
          },
          {
            label: "rabbitmqadmin",
            value: "CLI du plugin management : déclarer queues et échanges en script, sans passer par le code.",
          },
          {
            label: "API HTTP",
            value: "`/api/queues`, `/api/exchanges` : tout ce que fait l'UI est scriptable en JSON.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-local",
    title: "Déboguer en local",
    level: 2,
    intro:
      "Les vérifications dans l'ordre quand un message n'arrive pas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Le broker tourne-t-il ?",
            detail:
              "`docker ps` : les conteneurs `rabbitmq` et `kafka` sont-ils `Up` ? Un conteneur redémarré en boucle indique un problème de mémoire ou de volume corrompu — lisez `docker logs`.",
          },
          {
            title: "Le producteur se connecte-t-il ?",
            detail:
              "Regardez les connexions dans l'interface RabbitMQ (port 15672) ou les logs du producteur. `Connection refused` sur 5672/9092 = mauvais port ou broker arrêté.",
          },
          {
            title: "Le message part-il vraiment ?",
            detail:
              "Vérifiez le taux de publication (graphiques management, ou compteur côté producteur). Une queue déclarée avec un nom légèrement différent (`emails` vs `email`) est la cause la plus fréquente.",
          },
          {
            title: "Le consommateur reçoit-il ?",
            detail:
              "Messages `Unacked` qui stagnent = le consommateur les reçoit mais ne les acquitte pas (exception avant l'ack, ack oublié). Messages `Ready` qui stagnent = aucun consommateur connecté à cette queue.",
          },
          {
            title: "Kafka : le lag augmente-t-il ?",
            detail:
              "`kafka-consumer-groups.sh --describe` : un `LAG` qui grandit signifie que le consommateur ne suit plus le rythme — trop lent, bloqué, ou parti en erreur.",
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
      "Quatre projets de difficulté croissante pour passer de la théorie à la pratique professionnelle.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Worker d'envoi d'emails",
        fields: [
          { label: "Ce qu'on construit", value: "Une API qui publie `user.created`, un worker qui envoie l'email de bienvenue" },
          { label: "Ce qu'on apprend", value: "Déclarer une queue, publier, consommer, acquitter" },
          { label: "Difficulté", value: "Faible — une journée" },
          { label: "Projet suivant", value: "Retry et dead-letter queue" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Retry et dead-letter queue",
        fields: [
          { label: "Ce qu'on construit", value: "Le worker précédent + réessais exponentiels et file d'échecs analysable" },
          { label: "Ce qu'on apprend", value: "Politiques de retry, DLQ, idempotence du traitement" },
          { label: "Difficulté", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Pipeline événementiel Kafka" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Pipeline événementiel Kafka",
        fields: [
          { label: "Ce qu'on construit", value: "Événements métier → topics → plusieurs consommateurs indépendants (analytics, notifications, audit)" },
          { label: "Ce qu'on apprend", value: "Modélisation en événements, consumer groups, rejouabilité" },
          { label: "Difficulté", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "Supervision du lag et alertes" },
        ],
      },
      {
        kind: "fields",
        title: "Expert — Supervision et durcissement",
        fields: [
          { label: "Ce qu'on construit", value: "Dashboard de lag, alertes sur DLQ, runbook d'incident, tests de chaos (broker tué en plein pic)" },
          { label: "Ce qu'on apprend", value: "Opérer un broker comme un système de production" },
          { label: "Difficulté", value: "Élevée — deux semaines" },
          { label: "Projet suivant", value: "Architecture événementielle complète (voir System Design)" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "queues-et-topics-modeles",
    title: "Queues et topics : les modèles",
    level: 3,
    intro:
      "Approfondir les deux modèles de distribution : à qui va chaque message, et pourquoi.",
    blocks: [
      {
        kind: "text",
        text: "En modèle queue (work queue), chaque message est traité par un seul consommateur : dix workers se partagent la charge. C'est de la distribution de travail. En modèle publish/subscribe sur topic, chaque abonné reçoit chaque message : c'est de la diffusion d'information. RabbitMQ fait les deux (queues + échanges fanout), Kafka est nativement publish/subscribe avec des groupes de consommateurs qui recréent le partage de charge.",
      },
      {
        kind: "text",
        text: "Le piège classique : utiliser un topic Kafka comme une simple queue de tâches. Ça fonctionne, mais on paie le coût opérationnel d'un journal distribué pour un besoin qu'une queue RabbitMQ remplit plus simplement. À l'inverse, émuler de la diffusion multi-abonnés avec des queues oblige à dupliquer les messages à la main — le topic est fait pour ça.",
      },
    ],
  },
  {
    id: "echanges-rabbitmq",
    title: "Les échanges RabbitMQ",
    level: 3,
    intro:
      "Le cœur du routage RabbitMQ : les producteurs publient vers des échanges, jamais directement vers les queues.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre types d'échanges",
        fields: [
          {
            label: "Direct",
            value: "Route vers les queues dont la clé de liaison égale exactement la clé de routage. Le plus simple : une clé, une destination.",
          },
          {
            label: "Fanout",
            value: "Diffuse à toutes les queues liées, sans regarder la clé. Le publish/subscribe pur : un événement, N abonnés.",
          },
          {
            label: "Topic",
            value: "Routage par motif avec jokers (`*.` = un mot, `#` = zéro ou plus). Ex. `commandes.*` reçoit `commandes.creee` mais pas `commandes.europe.creee`.",
          },
          {
            label: "Headers",
            value: "Route sur les en-têtes du message plutôt que sur la clé. Plus flexible, plus verbeux — rarement le premier choix.",
          },
        ],
      },
      {
        kind: "text",
        text: "Schéma mental : producteur → échange → (liaisons + règles) → queues → consommateurs. Le producteur ne connaît que l'échange et la clé de routage ; qui consomme quoi est décidé par les liaisons. C'est cette indirection qui rend le routage flexible sans toucher au code producteur.",
      },
    ],
  },
  {
    id: "routage-bindings",
    title: "Routage et liaisons",
    level: 3,
    intro:
      "Comment les liaisons (bindings) connectent échanges et queues, avec des exemples concrets.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Routage par topic : notifications par région",
        code: `channel.exchange_declare(exchange="notifications", exchange_type="topic")

# Queue France : reçoit commandes.*.fr
channel.queue_declare(queue="notif-fr")
channel.queue_bind(queue="notif-fr", exchange="notifications",
                   routing_key="*.fr")

# Queue alertes : reçoit tout ce qui est critique
channel.queue_declare(queue="alertes")
channel.queue_bind(queue="alertes", exchange="notifications",
                   routing_key="#.critique")

# Un seul publish, routé vers 0, 1 ou N queues selon les motifs
channel.basic_publish(exchange="notifications",
                      routing_key="commandes.fr",
                      body="...")`,
      },
      {
        kind: "text",
        text: "Ajouter un nouvel abonné ne change rien au producteur : on crée une queue et une liaison. C'est la propriété qui rend les architectures événementielles extensibles — le producteur d'événements métier n'a pas à connaître la liste des systèmes intéressés.",
      },
    ],
  },
  {
    id: "acknowledgements",
    title: "Accusés de réception",
    level: 3,
    intro:
      "L'ack est le contrat de fiabilité : sans lui, un message est considéré comme non traité.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, RabbitMQ considère un message comme « en cours » dès qu'il est délivré. Si le worker plante avant d'envoyer `basic_ack`, le message est remis dans la queue et redélivré à un autre worker. L'ack doit donc arriver après le traitement réel, pas avant — acquitter puis traiter, c'est risquer de perdre le message en cas de crash entre les deux.",
      },
      {
        kind: "list",
        items: [
          "Ack après traitement : garantie « au moins une fois » — le message peut être redélivré, jamais perdu.",
          "Pas d'ack (auto-ack) : le message est supprimé dès l'envoi. Plus rapide, mais une panne du worker = message perdu. Réservé aux données non critiques.",
          "Nack avec requeue : le worker refuse explicitement le message, qui retourne en queue (avec risque de boucle — voir les poison messages).",
          "Timeout d'ack : un message `Unacked` trop longtemps est une alerte — worker bloqué ou mort sans fermer sa connexion.",
        ],
      },
    ],
  },
  {
    id: "prefetch-qos",
    title: "Prefetch et équité",
    level: 3,
    intro:
      "Éviter qu'un worker lent accumule les messages pendant que les autres restent inactifs.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, RabbitMQ distribue les messages à tour de rôle sans tenir compte de la vitesse des workers : un worker lent peut recevoir dix messages pendant qu'un worker rapide n'en a qu'un. `basic_qos(prefetch_count=1)` change la règle : un worker ne reçoit un nouveau message que quand il a acquitté le précédent. La charge se répartit alors selon la vitesse réelle de chacun.",
      },
      {
        kind: "code",
        language: "python",
        title: "Distribution équitable",
        code: `channel.basic_qos(prefetch_count=1)  # un message à la fois par worker
channel.basic_consume(queue="taches", on_message_callback=traiter)`,
      },
      {
        kind: "text",
        text: "Le prefetch est aussi un levier de backpressure : une valeur basse protège un worker fragile d'être submergé. En pratique, on commence à 1 et on ajuste en mesurant — une valeur trop haute sur des traitements longs crée des files d'attente invisibles côté workers.",
      },
    ],
  },
  {
    id: "durabilite-rabbitmq",
    title: "Durabilité des messages",
    level: 3,
    intro:
      "Que se passe-t-il si le broker redémarre ? Trois niveaux à combiner.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois interrupteurs de la durabilité",
        fields: [
          {
            label: "Échanges et queues durables",
            value: "`durable=True` à la déclaration : la structure survit au redémarrage. Sans ça, queue et messages disparaissent.",
          },
          {
            label: "Messages persistants",
            value: "`delivery_mode=2` à la publication : le message est écrit sur disque. Sans ça, il ne vit qu'en mémoire.",
          },
          {
            label: "Accusés de réception",
            value: "L'ack confirme le traitement. Durabilité sans ack = messages persistés mais jamais marqués comme traités.",
          },
        ],
      },
      {
        kind: "text",
        text: "Il faut les trois pour une vraie garantie : une queue durable avec des messages non persistants perd son contenu au redémarrage ; des messages persistants sans ack sont retraités en boucle. Et même ainsi, il reste une micro-fenêtre entre l'écriture mémoire et l'écriture disque — la durabilité absolue n'existe pas, seulement des niveaux de risque acceptés.",
      },
    ],
  },
  {
    id: "partitions-kafka",
    title: "Partitions Kafka",
    level: 3,
    intro:
      "L'unité de parallélisme de Kafka : comprendre les partitions, c'est comprendre le passage à l'échelle.",
    blocks: [
      {
        kind: "text",
        text: "Un topic est découpé en partitions : des journaux indépendants, chacun ordonné. Le producteur choisit la partition (par clé de routage, ou à tour de rôle). Chaque partition peut être lue par un seul consommateur d'un groupe — donc le nombre de partitions fixe le parallélisme maximal : 6 partitions = 6 consommateurs actifs au maximum dans un groupe.",
      },
      {
        kind: "diagram",
        title: "Topic à 3 partitions, 2 consommateurs",
        lines: [
          "Topic « commandes » (3 partitions)",
          "  Partition 0 ──→ Consommateur A",
          "  Partition 1 ──→ Consommateur A",
          "  Partition 2 ──→ Consommateur B",
          "",
          "Un 3e consommateur prendrait une partition à A.",
          "Un 4e consommateur resterait inactif : pas de partition libre.",
        ],
      },
      {
        kind: "text",
        text: "Dimensionner les partitions est une décision structurante : trop peu = parallélisme bridé, trop = surcharge de gestion (chaque partition a un coût en fichiers et en coordination). On sur-provisionne légèrement en anticipant la croissance, car augmenter le nombre de partitions après coup casse l'ordre relatif des clés existantes.",
      },
    ],
  },
  {
    id: "offsets-consumer-groups",
    title: "Offsets et groupes de consommateurs",
    level: 3,
    intro:
      "Comment Kafka sait ce que chaque consommateur a déjà lu : l'offset, la position dans le journal.",
    blocks: [
      {
        kind: "text",
        text: "Chaque message d'une partition a un numéro séquentiel : l'offset. Le consommateur le fait progresser au fur et à mesure et le « commit » périodiquement — c'est un marque-page persistant. En cas de redémarrage, il reprend où il s'était arrêté, pas au début. Le commit peut être automatique (simple, risque de doublons) ou manuel après traitement (plus sûr, plus de code).",
      },
      {
        kind: "text",
        text: "Le groupe de consommateurs (`group.id`) est l'unité de partage : les partitions d'un topic sont réparties entre les membres du groupe. Deux groupes différents lisent chacun l'intégralité du topic indépendamment — c'est ainsi qu'un même événement alimente à la fois l'analytics, les notifications et l'audit sans duplication des messages.",
      },
    ],
  },
  {
    id: "retention-kafka",
    title: "Rétention des événements",
    level: 3,
    intro:
      "Kafka conserve l'historique : combien de temps, et pourquoi c'est une fonctionnalité, pas un bug.",
    blocks: [
      {
        kind: "text",
        text: "Contrairement à une queue, Kafka ne supprime pas les messages après lecture : il les conserve selon une politique de rétention (durée, taille, ou les deux). Pendant cette fenêtre, n'importe quel consommateur peut relire l'historique — pour reconstruire un état, rejouer après un bug, ou brancher un nouveau système sur des mois de données passées.",
      },
      {
        kind: "list",
        items: [
          "Rétention temporelle : garder N jours d'événements (ex. 7 jours pour rejouer la semaine en cas d'incident).",
          "Rétention par taille : limiter l'espace disque, les vieux segments sont purgés en premier.",
          "Rejouabilité : un nouveau consumer group avec `--from-beginning` reconstruit son état depuis l'historique.",
          "Coût : le stockage est bon marché, mais chaque octet retenu doit être répliqué — dimensionner les disques en conséquence.",
        ],
      },
    ],
  },
  {
    id: "replication-kafka",
    title: "Réplication Kafka",
    level: 3,
    intro:
      "La haute disponibilité : chaque partition existe en plusieurs copies sur des brokers différents.",
    blocks: [
      {
        kind: "text",
        text: "Chaque partition a un leader (qui reçoit les écritures et lectures) et des répliques suiveuses sur d'autres brokers. Si le leader tombe, une réplique est élue. Le facteur de réplication (souvent 3 en production) détermine combien de pannes simultanées le cluster tolère. Côté producteur, `acks=all` n'accuse réception que quand toutes les répliques synchronisées ont écrit : le réglage le plus sûr, au prix d'une latence légèrement supérieure.",
      },
      {
        kind: "text",
        text: "Le concept clé est l'ISR (In-Sync Replicas) : l'ensemble des répliques à jour. Un producteur avec `acks=all` attend l'ISR, pas forcément toutes les répliques configurées — un bon compromis entre durabilité et disponibilité quand une réplique est temporairement à la traîne.",
      },
    ],
  },
  {
    id: "compaction-log",
    title: "Compaction du journal",
    level: 3,
    intro:
      "Une politique de rétention alternative : ne garder que la dernière valeur par clé.",
    blocks: [
      {
        kind: "text",
        text: "Sur un topic « compacté », Kafka ne conserve que le dernier événement par clé : l'historique complet des changements est élagué, seul l'état final subsiste. C'est le mécanisme idéal pour les topics qui représentent un état — prix des produits, profils utilisateurs, configuration — plutôt qu'un flux d'événements purs.",
      },
      {
        kind: "text",
        text: "Cas d'usage typique : reconstruire une table de référence au démarrage d'un service en lisant le topic compacté depuis le début, sans base de données externe. La compaction s'exécute en arrière-plan : pendant un temps, plusieurs valeurs par clé coexistent — le consommateur doit donc toujours traiter les événements dans l'ordre et écraser l'état précédent.",
      },
    ],
  },
  {
    id: "idempotence",
    title: "Idempotence des consommateurs",
    level: 3,
    intro:
      "Les redélivrances arrivent : un consommateur robuste supporte les doublons sans effet de bord.",
    blocks: [
      {
        kind: "text",
        text: "Un consommateur est idempotent si traiter deux fois le même message produit le même résultat qu'une fois. C'est indispensable car les garanties « au moins une fois » (redélivrance après crash avant ack, offset committé trop tôt) produisent des doublons en production — pas en théorie, en pratique, régulièrement.",
      },
      {
        kind: "list",
        items: [
          "Clé d'idempotence : chaque message porte un `event_id` unique ; le consommateur mémorise les ids déjà traités (base, Redis) et ignore les doublons.",
          "Opérations naturellement idempotentes : `SET statut = 'payé'` plutôt que `compteur += 1` quand c'est possible.",
          "Contrainte d'unicité en base : laisser la base rejeter le doublon (clé unique sur `event_id`) plutôt que de le détecter en code.",
          "Fenêtre de déduplication : conserver les ids traités assez longtemps pour couvrir la fenêtre de redélivrance, pas éternellement.",
        ],
      },
    ],
  },
  {
    id: "retry-dlq",
    title: "Retry et dead-letter queues",
    level: 3,
    intro:
      "Les échecs sont normaux : les réessayer intelligemment, puis les isoler pour analyse.",
    blocks: [
      {
        kind: "text",
        text: "Quand un traitement échoue (service tiers en panne, bug transitoire), on réessaie avec un délai croissant — backoff exponentiel : 1s, 2s, 4s, 8s… Le délai croissant évite de marteler un service déjà en difficulté. Après N tentatives, le message part en dead-letter queue (DLQ) : une file d'échecs à inspecter, corriger et rejouer manuellement.",
      },
      {
        kind: "diagram",
        title: "Cycle de vie d'un message en échec",
        lines: [
          "Queue principale",
          "     │ échec",
          "     ▼",
          "Retry (délai 1s → 2s → 4s → 8s)",
          "     │ échec × N",
          "     ▼",
          "Dead-letter queue (analyse humaine)",
          "     │ correction du bug",
          "     ▼",
          "Rejeu manuel vers la queue principale",
        ],
      },
      {
        kind: "text",
        text: "Règles d'or : toujours limiter le nombre de tentatives (un retry infini = une boucle qui consomme des ressources), toujours alerter sur la DLQ (une DLQ qui grandit silencieusement = des données perdues de fait), et enregistrer la cause de l'échec avec le message (stack trace, compteur de tentatives) pour le diagnostic.",
      },
    ],
  },
  {
    id: "semantiques-livraison",
    title: "Sémantiques de livraison",
    level: 3,
    intro:
      "Les trois garanties possibles, leurs coûts, et laquelle choisir.",
    blocks: [
      {
        kind: "table",
        headers: ["Sémantique", "Garantie", "Coût", "Quand l'utiliser"],
        rows: [
          ["Au plus une fois", "Jamais de doublon, mais pertes possibles", "Le plus rapide", "Métriques, logs : la perte d'un point est acceptable"],
          ["Au moins une fois", "Jamais de perte, doublons possibles", "Redélivrances à gérer", "Le défaut sain : emails, notifications, avec idempotence"],
          ["Exactement une fois", "Ni perte ni doublon", "Complexe : transactions, déduplication", "Paiements, comptabilité — quand le doublon coûte cher"],
        ],
      },
      {
        kind: "text",
        text: "« Exactement une fois » n'existe pas vraiment au sens littéral sur un réseau faillible : c'est « au moins une fois » + idempotence + déduplication, ce qui donne un effet exactement-une-fois observable. Kafka propose des producteurs idempotents et des transactions pour s'en approcher ; RabbitMQ s'appuie sur les acks et la déduplication côté consommateur.",
      },
    ],
  },
  {
    id: "ordonnancement",
    title: "Ordre des messages",
    level: 3,
    intro:
      "Quand l'ordre compte — et comment le garantir sans sacrifier le parallélisme.",
    blocks: [
      {
        kind: "text",
        text: "Kafka garantit l'ordre à l'intérieur d'une partition, jamais entre partitions. Pour ordonner les événements d'une entité (toutes les actions d'une commande), on route par clé : même clé = même partition = ordre préservé. Le prix : toutes les clés d'une partition sont traitées séquentiellement par un seul consommateur — une clé « chaude » (un client qui génère 90 % du trafic) crée un goulot.",
      },
      {
        kind: "text",
        text: "RabbitMQ garantit l'ordre d'arrivée dans une queue tant qu'un seul consommateur la lit et que les messages ne sont pas réinsérés (requeue, retry) — ces cas réordonnent. Si l'ordre global est critique et le parallélisme nécessaire, la bonne réponse est souvent : partitionner par entité et accepter l'ordre par entité plutôt que global.",
      },
    ],
  },
  {
    id: "event-driven",
    title: "Architectures événementielles",
    level: 3,
    intro:
      "Le modèle d'architecture que les files rendent possible : des services qui réagissent à des événements.",
    blocks: [
      {
        kind: "text",
        text: "En architecture événementielle, les services ne s'appellent pas directement : ils publient des faits (`CommandeCreee`, `PaiementEchoue`) et réagissent aux faits des autres. Le couplage devient temporel et logique, pas réseau : on peut ajouter un service d'analytics sans modifier le service de commandes, et un service en panne n'empêche pas les autres de publier.",
      },
      {
        kind: "list",
        items: [
          "Chorégraphie : chaque service réagit aux événements, sans chef d'orchestre. Simple, mais le flux global devient implicite — documentez-le.",
          "Orchestration : un service pilote le flux (saga). Plus explicite, mais réintroduit un point central.",
          "Événements métier vs commandes : un événement dit ce qui s'est passé (immuable), une commande demande une action (peut échouer). Ne pas les confondre.",
          "Le piège : l'« enfer des événements » — des dizaines de topics sans documentation ni propriétaire. Chaque événement a un schéma versionné et un responsable.",
        ],
      },
    ],
  },
  {
    id: "evolution-schemas",
    title: "Évolution des schémas",
    level: 3,
    intro:
      "Les messages vivent longtemps : faire évoluer leur structure sans casser les consommateurs.",
    blocks: [
      {
        kind: "text",
        text: "Un événement publié aujourd'hui sera peut-être relu dans six mois par un consommateur écrit demain. Les règles d'évolution sûre : ajouter des champs optionnels (jamais obligatoires), ne jamais renommer ni changer le type d'un champ existant, ignorer les champs inconnus côté consommateur. Pour les écosystèmes exigeants, un registre de schémas (schema registry) valide la compatibilité à la publication.",
      },
      {
        kind: "text",
        text: "En pratique avec JSON : chaque consommateur ne lit que les champs dont il a besoin et ignore le reste — c'est la compatibilité ascendante par construction. Le jour où un changement incompatible est inévitable, on publie sur un nouveau topic (ou une nouvelle version d'événement `CommandeCreeeV2`) et on migre les consommateurs progressivement.",
      },
    ],
  },
  {
    id: "backpressure",
    title: "Backpressure",
    level: 3,
    intro:
      "Quand les producteurs vont plus vite que les consommateurs : gérer la pression au lieu de la subir.",
    blocks: [
      {
        kind: "text",
        text: "La backpressure est la capacité du système à ralentir les producteurs quand les consommateurs ne suivent plus. Sans elle, la file grandit jusqu'à saturer le disque ou la mémoire, puis tout s'effondre. Les leviers : le prefetch côté RabbitMQ (limiter ce qu'un worker prend), le lag comme signal d'alerte, et côté producteur, des limites de débit ou des files d'attente bornées qui refusent proprement quand elles sont pleines.",
      },
      {
        kind: "list",
        items: [
          "Signal : le lag (Kafka) ou les messages `Ready` (RabbitMQ) qui grandissent = les consommateurs sont dépassés.",
          "Réponse court terme : scaler les consommateurs horizontalement (si le parallélisme le permet).",
          "Réponse structurelle : optimiser le traitement, ou accepter de dégrader (échantillonner, différer le non-critique).",
          "Garde-fou : politiques de débordement (overflow) et TTL sur les messages périssables — mieux vaut jeter une notification obsolète que bloquer la file.",
        ],
      },
    ],
  },
  {
    id: "poison-messages",
    title: "Poison messages",
    level: 3,
    intro:
      "Le message qui fait planter chaque worker qui le touche : le détecter et l'isoler.",
    blocks: [
      {
        kind: "text",
        text: "Un poison message est un message valide pour le broker mais fatal pour le consommateur : payload malformé, cas non géré, bug systématique. Sans protection, le cycle est infernal — le worker plante, le message est redélivré, le worker (ou le suivant) replante. Avec plusieurs workers, c'est toute la flotte qui tombe en cascade.",
      },
      {
        kind: "text",
        text: "La défense est le compteur de tentatives : après N échecs, le message part en DLQ au lieu d'être réessayé. En complément : valider le schéma du message avant tout traitement (un message invalide va directement en DLQ sans retry), et logger le contenu fautif pour reproduire le bug en local.",
      },
    ],
  },
  {
    id: "monitoring-lag",
    title: "Superviser le lag",
    level: 3,
    intro:
      "Le lag est l'indicateur de santé numéro un d'un système de messaging : le mesurer et alerter dessus.",
    blocks: [
      {
        kind: "command",
        label: "Mesurer le lag d'un groupe de consommateurs Kafka",
        command:
          "docker exec kafka /opt/kafka/bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group notifications",
        why: "Affiche, par partition, l'offset courant, l'offset final (LOG-END-OFFSET) et le LAG — le nombre de messages non encore traités. Un lag stable et bas = santé ; un lag qui croît = consommateurs dépassés ou bloqués.",
        verify:
          "docker exec kafka /opt/kafka/bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list",
      },
      {
        kind: "list",
        items: [
          "Alertes : lag au-delà d'un seuil pendant N minutes, taux de croissance du lag, taille de la DLQ.",
          "RabbitMQ : messages `Ready` + `Unacked` par queue, taux de publication vs consommation, consommateurs connectés.",
          "Kafka : lag par consumer group, under-replicated partitions (répliques à la traîne), espace disque des brokers.",
          "Métriques métier : âge du message le plus ancien — un lag de 1000 messages récents n'a pas la même gravité qu'un lag de 1000 messages vieux de 3 heures.",
        ],
      },
    ],
  },
  {
    id: "securite-brokers",
    title: "Sécuriser les brokers",
    level: 3,
    intro:
      "Un broker est une infrastructure critique : les bases de la sécurisation en production.",
    blocks: [
      {
        kind: "list",
        items: [
          "Authentification : supprimer les comptes par défaut (`guest`/`guest`), un utilisateur dédié par application avec des droits minimaux (lecture/écriture limitées à ses topics/queues).",
          "Chiffrement : TLS sur les connexions clients et inter-brokers — les messages transitent en clair sinon.",
          "SASL : mécanismes d'authentification forte côté Kafka (SCRAM, OAuth) au-delà du simple login/mot de passe.",
          "Réseau : les brokers ne sont jamais exposés sur Internet ; accès via réseau privé ou VPN, pare-feu limitant aux applications autorisées.",
          "Secrets : identifiants et certificats en variables d'environnement ou gestionnaire de secrets, jamais dans le code ni dans les messages.",
        ],
      },
    ],
  },
  {
    id: "kafka-vs-rabbitmq",
    title: "Kafka vs RabbitMQ : choisir",
    level: 3,
    intro:
      "Le comparatif honnête pour choisir en connaissance de cause — il n'y a pas de gagnant universel.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "RabbitMQ", "Kafka"],
        rows: [
          ["Modèle", "Broker intelligent, routage flexible", "Journal distribué, consommateurs intelligents"],
          ["Débit", "Dizaines de milliers de msg/s", "Millions de msg/s"],
          ["Latence typique", "Très faible (microsecondes-ms)", "Faible (ms, optimisé pour le débit)"],
          ["Rétention", "Messages supprimés après ack", "Historique conservé et rejouable"],
          ["Cas fort", "Tâches, routage complexe, RPC", "Event streaming, analytics, réplication de données"],
          ["Opération", "Plus simple à opérer", "Cluster distribué plus exigeant"],
        ],
      },
      {
        kind: "text",
        text: "Règle de décision : besoin de distribuer des tâches avec un routage fin et une faible latence → RabbitMQ. Besoin d'un historique d'événements rejouable, de haut débit, de plusieurs consommateurs indépendants → Kafka. Beaucoup d'architectures utilisent les deux, chacun pour ce qu'il fait le mieux — ce n'est pas un choix exclusif.",
      },
    ],
  },
  {
    id: "cas-usage-typiques",
    title: "Cas d'usage typiques",
    level: 3,
    intro:
      "Où les files apportent le plus de valeur, avec l'outil adapté à chaque cas.",
    blocks: [
      {
        kind: "table",
        headers: ["Cas d'usage", "Outil adapté", "Pourquoi"],
        rows: [
          ["Envoi d'emails/SMS", "RabbitMQ", "Tâches unitaires, retry simple, faible latence"],
          ["Traitement de commandes", "RabbitMQ", "Routage par type d'événement, workers spécialisés"],
          ["Historique d'événements métier", "Kafka", "Rejouabilité, plusieurs consommateurs indépendants"],
          ["Ingestion de logs/métriques", "Kafka", "Haut débit, buffering avant stockage"],
          ["Notifications temps réel", "RabbitMQ (fanout)", "Diffusion immédiate à N abonnés"],
          ["Synchronisation entre services", "Kafka", "Journal source de vérité, réplication d'état"],
        ],
      },
    ],
  },
  {
    id: "tests-messaging",
    title: "Tester les systèmes de messaging",
    level: 3,
    intro:
      "Tester producteurs et consommateurs sans broker réel, puis avec.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tests unitaires : la logique de traitement du message est une fonction pure — testez-la sans broker, avec des payloads en dur.",
          "Mocks du client : vérifier que le producteur publie sur le bon échange/topic avec le bon routage, sans broker.",
          "Tests d'intégration : un broker en conteneur éphémère (Testcontainers) pour valider le cycle publier → consommer → ack de bout en bout.",
          "Tests de résilience : tuer le worker mid-traitement et vérifier la redélivrance ; publier des poison messages et vérifier la DLQ.",
          "Ne pas tester le broker lui-même : RabbitMQ et Kafka sont déjà testés. Testez votre usage : routage, sérialisation, idempotence, retry.",
        ],
      },
    ],
  },
  {
    id: "dimensionnement",
    title: "Dimensionner un déploiement",
    level: 3,
    intro:
      "Les ordres de grandeur pour passer du local à la production sans se tromper d'échelle.",
    blocks: [
      {
        kind: "list",
        items: [
          "Estimer le débit : messages/seconde en pointe, taille moyenne des messages → volume réseau et disque par jour.",
          "RabbitMQ : la mémoire est la ressource critique — des queues qui grandissent consomment la RAM du broker. Surveiller et mettre des limites (max-length).",
          "Kafka : le disque est la ressource critique — débit × taille × rétention = espace nécessaire, multiplié par le facteur de réplication.",
          "Partitions : partir du parallélisme visé (nombre de consommateurs), pas du débit seul — ajouter des partitions après coup a un coût.",
          "Toujours tester en charge avant la production : un benchmark simple (producteur/consommateur à plein régime) révèle les limites réelles.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques des files de messages, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Ack avant traitement",
            value:
              "Problem : message perdu si le worker plante après l'ack. Why : copié d'un exemple simplifié. Better : acquitter après le traitement réel.",
          },
          {
            label: "Tout mettre en file",
            value:
              "Problem : latence et complexité ajoutées pour des opérations instantanées. Why : dogme « tout asynchrone ». Better : la file sert les traitements lents ou découplés, pas les lectures simples.",
          },
          {
            label: "Pas de DLQ",
            value:
              "Problem : les messages en échec tournent en boucle ou disparaissent. Why : le retry seul semble suffire. Better : toujours une file d'échecs avec alertes.",
          },
          {
            label: "Messages sans identifiant",
            value:
              "Problem : impossible de dédupliquer, de tracer, de rejouer proprement. Why : payload minimaliste. Better : `event_id` unique et `occurred_at` systématiques.",
          },
          {
            label: "Secrets dans les messages",
            value:
              "Problem : mots de passe persistés dans les journaux Kafka pendant des mois. Why : facilité. Better : passer des références, jamais les secrets.",
          },
          {
            label: "Ignorer le lag",
            value:
              "Problem : on découvre le retard quand les utilisateurs se plaignent. Why : pas de monitoring. Better : alerter sur le lag avant qu'il soit visible.",
          },
          {
            label: "Ordre supposé global",
            value:
              "Problem : bug subtil quand deux partitions traitent « dans le désordre ». Why : on croit l'ordre garanti partout. Better : ordre par partition/clé uniquement, conçu explicitement.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes qui distinguent un usage amateur d'un système de production fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un schéma par type de message, versionné et documenté — le contrat est aussi important qu'une API REST.",
          "Idempotence par défaut : concevez chaque consommateur en supposant les doublons, pas en espérant leur absence.",
          "Observabilité dès le jour un : corrélez les logs producteur/consommateur par `event_id`, mesurez le lag.",
          "Runbook d'incident : que faire quand la DLQ grandit, quand le lag explose, quand un broker tombe.",
          "Environnements isolés : dev, staging et prod ont leurs brokers séparés — jamais de messages de test en production.",
          "Nettoyage : TTL sur les messages périssables, rétention calibrée, DLQ vidée et analysée régulièrement.",
        ],
      },
    ],
  },
  {
    id: "glossaire",
    title: "Glossaire",
    level: 3,
    intro:
      "Le vocabulaire du messaging, en une page.",
    blocks: [
      {
        kind: "fields",
        title: "Termes essentiels",
        fields: [
          { label: "Broker", value: "Le serveur qui reçoit, stocke et distribue les messages (RabbitMQ, Kafka)." },
          { label: "Producteur", value: "L'application qui publie des messages." },
          { label: "Consommateur", value: "L'application qui lit et traite les messages." },
          { label: "Queue", value: "File d'attente : chaque message est traité par un seul consommateur." },
          { label: "Topic", value: "Journal nommé : chaque abonné lit l'intégralité des événements." },
          { label: "Échange", value: "Point d'entrée RabbitMQ qui route les messages vers les queues selon des règles." },
          { label: "Partition", value: "Fragment ordonné d'un topic Kafka, unité de parallélisme." },
          { label: "Offset", value: "Position d'un message dans une partition ; le marque-page du consommateur." },
          { label: "Ack", value: "Accusé de réception : confirme le traitement d'un message." },
          { label: "DLQ", value: "Dead-letter queue : file des messages en échec après tous les retries." },
          { label: "Lag", value: "Retard d'un consommateur : messages publiés mais non encore traités." },
          { label: "Idempotence", value: "Propriété d'un traitement insensible aux doublons." },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "RabbitMQ — documentation",
            value: "rabbitmq.com/docs : guides, tutoriels par langage, référence des échanges et des politiques.",
          },
          {
            label: "RabbitMQ — tutoriels",
            value: "rabbitmq.com/tutorials : le parcours officiel pas à pas, avec les exemples `pika` en Python.",
          },
          {
            label: "Kafka — documentation",
            value: "kafka.apache.org/documentation : concepts, configuration, opérations du cluster.",
          },
          {
            label: "Kafka — quickstart",
            value: "Le guide officiel de démarrage : installation, premier topic, producteur et consommateur.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Guides : la documentation des clients utilisés (`pika`, clients Kafka) pour les détails d'API.",
          "Pratique : les projets progressifs de cette page, puis l'observation d'un système réel en charge.",
          "Approfondissement : la compétence System Design pour placer les files dans une architecture complète.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les files maîtrisées, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Superviser : `observability` — instrumenter producteurs et consommateurs, alerter sur le lag et la DLQ.",
          "Concevoir : `system-design` — placer les files dans des architectures événementielles complètes, arbitrer sync vs async.",
          "Déployer : `docker` — conteneuriser brokers et workers, composer la stack complète en local.",
          "Fiabiliser : `testing-api` — tester les flux de bout en bout, des routes HTTP jusqu'aux workers.",
          "Revenir à la roadmap : valider `messaging` et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

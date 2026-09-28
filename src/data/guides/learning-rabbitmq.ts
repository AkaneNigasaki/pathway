import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de RabbitMQ : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Cohérent avec le guide existant (queues, exchanges, routing, ACK,
 * persistance, clustering) et son setup (Docker, console d'admin,
 * rabbitmqctl, amqplib/pika).
 */
export const LEARNING_RABBITMQ: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est RabbitMQ, quel problème il résout et où il se place dans une architecture.",
    blocks: [
      {
        kind: "text",
        text: "RabbitMQ est un broker de messages : un serveur intermédiaire qui reçoit des messages d'applications productrices, les stocke dans des files d'attente (queues), et les distribue à des applications consommatrices. Les deux côtés ne se connaissent pas et ne sont jamais en contact direct.",
      },
      {
        kind: "text",
        text: "Le problème résolu : sans broker, deux services communiquent en appel direct (HTTP) — si le destinataire est lent ou en panne, l'expéditeur attend ou perd la requête. Avec RabbitMQ, l'expéditeur publie et continue son travail ; le message attend dans la file ; le destinataire le traite à son rythme, même après un redémarrage. C'est le découplage temporel : absorber les pics de charge et survivre aux pannes.",
      },
      {
        kind: "text",
        text: "Positionnement : RabbitMQ implémente le protocole AMQP et excelle dans le messaging classique (files, routage, acquittements). Il est plus simple à opérer que Kafka pour les files de travail traditionnelles ; Kafka vise le streaming de logs à très haut débit. Les deux coexistent dans beaucoup d'architectures, pour des usages différents.",
      },
    ],
  },
  {
    id: "rabbitmq-carte-mentale",
    title: "La carte mentale de RabbitMQ",
    level: 1,
    intro:
      "Cinq concepts, un seul flux : de la publication à l'acquittement.",
    blocks: [
      {
        kind: "diagram",
        title: "De la publication à l'acquittement",
        lines: [
          "PRODUCTEUR",
          "  (publie un message)",
          "     │",
          "     ▼",
          "EXCHANGE",
          "  (route selon le type : direct, topic, fanout)",
          "     │  clé de routage + binding",
          "     ▼",
          "QUEUE",
          "  (stocke les messages en attente)",
          "     │",
          "     ▼",
          "CONSOMMATEUR",
          "  (traite le message)",
          "     │",
          "     ▼",
          "ACK",
          "  (acquittement : le message est supprimé de la file)",
        ],
      },
      {
        kind: "text",
        text: "Point clé : le producteur ne connaît jamais les files — il publie vers un exchange avec une clé de routage. L'exchange décide quelles files reçoivent le message. Le consommateur acquitte (ACK) après traitement : sans ACK, le message est renvoyé. C'est ce contrat qui garantit qu'aucun message traité n'est perdu.",
      },
      {
        kind: "list",
        items: [
          "Exchange = le routeur ; queue = le stockage ; binding = la règle qui les relie.",
          "Publier est instantané pour le producteur : la file absorbe la charge.",
          "L'ACK est la frontière entre « reçu » et « traité » : c'est là que se joue la fiabilité.",
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
      "Ce qu'il faut maîtriser avant RabbitMQ, et pourquoi chaque prérequis compte.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations requises",
        fields: [
          {
            label: "Un langage backend (Python ou Node.js)",
            value:
              "Publier et consommer depuis le code : `pika` (Python) ou `amqplib` (Node.js). Il faut être à l'aise avec les callbacks ou `async`/`await` selon le client.",
          },
          {
            label: "Docker",
            value:
              "La voie d'installation recommandée par le guide : lancer le broker en conteneur avec la console d'administration.",
          },
          {
            label: "Réseau de base",
            value:
              "Ports (5672 pour AMQP, 15672 pour la console), localhost vs accès distant : la sécurité de RabbitMQ commence par qui peut s'y connecter.",
          },
          {
            label: "JSON",
            value:
              "Le format d'échange standard des messages : sérialiser un objet en JSON avant publication, le désérialiser à la consommation.",
          },
          {
            label: "Notions d'architecture",
            value:
              "Comprendre pourquoi on découple des services (résilience, charge) : sinon RabbitMQ ressemble à une complication gratuite.",
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
      "Lancer RabbitMQ avec Docker et sa console d'administration, en comprenant chaque commande.",
    blocks: [
      {
        kind: "command",
        label: "Lancer RabbitMQ avec la console d'admin",
        command: "docker run --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:4-management",
        why: "Démarre le broker en arrière-plan (`-d`) : le port 5672 expose le protocole AMQP (producteurs/consommateurs), le port 15672 expose la console web d'administration. L'image `rabbitmq:4-management` inclut le plugin de management.",
        verify: "docker exec rabbitmq rabbitmq-diagnostics ping",
      },
      {
        kind: "command",
        label: "Lister les files et leur état",
        command: "docker exec rabbitmq rabbitmqctl list_queues name messages consumers",
        why: "Affiche chaque file avec son nombre de messages en attente et de consommateurs connectés : la commande de surveillance de base. Une file qui grossit sans consommateur signale un worker en panne.",
        verify: "docker exec rabbitmq rabbitmqctl status",
      },
      {
        kind: "text",
        text: "Ouvrez ensuite http://localhost:15672 : la console web (identifiants par défaut `guest`/`guest`, limités à localhost par sécurité). Tout ce qui suit — déclarer exchanges et files, publier un message de test — peut d'abord se faire à la souris dans cette console avant d'être codé.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet : envoi d'emails asynchrone",
    level: 2,
    intro:
      "Le cas d'usage canonique : découpler l'inscription utilisateur de l'envoi d'email.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lancer le broker",
            detail:
              "Exécuter la commande Docker de la section Installation. Vérifier que la console répond sur http://localhost:15672.",
          },
          {
            title: "Déclarer la file dans la console",
            detail:
              "Onglet Queues → Add a new queue : nom `emails`, durable si l'on veut qu'elle survive au redémarrage. Observer qu'elle apparaît vide dans la liste.",
          },
          {
            title: "Écrire le producteur",
            detail:
              "Avec `pika` (Python) : se connecter, déclarer la file, publier un message JSON `{\"to\": \"...\", \"subject\": \"Bienvenue\"}`. Le script se termine immédiatement : l'email n'est pas encore envoyé, juste mis en file.",
          },
          {
            title: "Écrire le consommateur",
            detail:
              "Avec `pika` : s'abonner à la file, traiter chaque message (simuler l'envoi), puis acquitter (`basic_ack`). Sans ACK, le message reviendrait dans la file.",
          },
          {
            title: "Tester la résilience",
            detail:
              "Publier 5 messages, tuer le consommateur avant la fin, le relancer : les messages non acquittés sont redistribués et traités. C'est la garantie fondamentale du système.",
          },
          {
            title: "Observer dans la console",
            detail:
              "Voir les messages entrer et sortir, le graphe de débit, les consommateurs connectés. La console est l'outil de débogage numéro un.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Producteur et consommateur avec pika",
        code: "import json\nimport pika\n\nparams = pika.ConnectionParameters(\"localhost\")\n\n# --- Producteur ---\nconn = pika.BlockingConnection(params)\nch = conn.channel()\nch.queue_declare(queue=\"emails\", durable=True)\nch.basic_publish(\n    exchange=\"\",\n    routing_key=\"emails\",\n    body=json.dumps({\"to\": \"lea@exemple.fr\", \"subject\": \"Bienvenue\"}),\n    properties=pika.BasicProperties(delivery_mode=2),  # persistant\n)\nconn.close()\n\n# --- Consommateur ---\nconn = pika.BlockingConnection(params)\nch = conn.channel()\n\ndef traiter(ch, method, props, body):\n    msg = json.loads(body)\n    print(\"Envoi email à\", msg[\"to\"])  # ici : le vrai envoi\n    ch.basic_ack(delivery_tag=method.delivery_tag)  # ACK : traité\n\nch.basic_consume(queue=\"emails\", on_message_callback=traiter)\nch.start_consuming()",
      },
    ],
  },
  {
    id: "concepts-cles",
    title: "Concepts clés",
    level: 2,
    intro:
      "Le vocabulaire minimal pour lire la console et comprendre ce qui se passe.",
    blocks: [
      {
        kind: "fields",
        title: "À connaître par cœur",
        fields: [
          {
            label: "Queue (file)",
            value:
              "Stocke les messages en attente : FIFO, durable si configurée ainsi, consommée par un ou plusieurs workers.",
          },
          {
            label: "Exchange",
            value:
              "Le routeur : reçoit les messages publiés et les distribue aux files selon son type (direct, topic, fanout, headers).",
          },
          {
            label: "Binding",
            value:
              "Le lien entre un exchange et une queue, avec une clé : c'est lui qui définit les règles de routage.",
          },
          {
            label: "Routing key",
            value:
              "La clé attachée à chaque message publié : l'exchange la compare aux bindings pour router.",
          },
          {
            label: "ACK",
            value:
              "L'acquittement : le consommateur confirme le traitement. Sans ACK, le message est renvoyé à un autre consommateur.",
          },
          {
            label: "Vhost",
            value:
              "Hôte virtuel : un espace de noms isolé (exchanges, queues, utilisateurs). Sépare les environnements sur un même broker.",
          },
        ],
      },
    ],
  },
  {
    id: "exchanges-bases",
    title: "Les exchanges en pratique",
    level: 2,
    intro:
      "Quatre types de routage, quatre usages : choisir le bon dès le début.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Règle de routage", "Usage typique"],
        rows: [
          ["Direct", "La clé du message doit égaler exactement la clé du binding", "Une file par type de tâche (`emails`, `pdf`)"],
          ["Topic", "La clé peut contenir des jokers (`*` = un mot, `#` = plusieurs)", "Événements hiérarchiques (`orders.created`, `orders.*`)"],
          ["Fanout", "Ignore la clé : diffuse à toutes les files liées", "Notifications multi-canaux (email + SMS + push)"],
          ["Headers", "Route sur les en-têtes du message plutôt que la clé", "Routage sur métadonnées complexes (rare)"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, `direct` et `topic` couvrent la quasi-totalité des besoins. `fanout` sert aux diffusions, `headers` reste marginal. L'exchange par défaut (nom vide `\"\"`) est un direct implicite : publier avec `routing_key=\"emails\"` route vers la file `emails` — c'est ce qu'utilise l'exemple pika ci-dessus.",
      },
    ],
  },
  {
    id: "console-admin",
    title: "Console d'administration",
    level: 2,
    intro:
      "La console web : déclarer, inspecter, tester sans écrire une ligne de code.",
    blocks: [
      {
        kind: "list",
        items: [
          "Onglet Queues : voir les messages en attente (`Ready`), en cours (`Unacked`), publier un message de test, purger une file.",
          "Onglet Exchanges : déclarer un exchange, voir ses bindings, publier directement vers lui pour tester le routage.",
          "Onglet Connections / Channels : qui est connecté, depuis où, avec quel débit — le premier endroit où chercher un producteur silencieux.",
          "Onglet Admin : gérer utilisateurs, vhosts et permissions sans `rabbitmqctl`.",
          "Réflexe : devant un comportement bizarre, regarder la console avant le code — l'état réel des files ne ment pas.",
        ],
      },
      {
        kind: "command",
        label: "Créer un utilisateur dédié à l'application",
        command: "docker exec rabbitmq rabbitmqctl add_user app secret",
        why: "Crée un utilisateur `app` distinct du compte `guest` par défaut. En production, chaque application a son propre utilisateur avec des permissions limitées à son vhost — jamais `guest`, qui est restreint à localhost par défaut.",
        verify: "docker exec rabbitmq rabbitmqctl list_users",
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Outillage quotidien : peu d'outils, mais les bons.",
    blocks: [
      {
        kind: "fields",
        title: "Boîte à outils",
        fields: [
          {
            label: "Docker",
            value: "Le broker tourne en conteneur : `docker start rabbitmq` / `docker stop rabbitmq`. Un volume pour `/var/lib/rabbitmq` rend les files persistantes entre redémarrages du conteneur.",
          },
          {
            label: "Console web (15672)",
            value: "Inspection, tests manuels, gestion : l'interface principale au quotidien, bien plus lisible que la CLI pour l'état des files.",
          },
          {
            label: "rabbitmqctl / rabbitmq-diagnostics",
            value: "Administration en CLI : utilisateurs, permissions, diagnostic (`rabbitmq-diagnostics ping`, `list_queues`).",
          },
          {
            label: "VS Code + terminal",
            value: "Le guide le confirme : le terminal et la console web suffisent. Postman ou `curl` pour tester l'API HTTP de management si besoin.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Comment travaillent les professionnels",
    level: 2,
    intro:
      "Le flux typique : du développement local à la file surveillée en production.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie d'un flux de messages",
        lines: [
          "Broker local (Docker) — développer",
          "     ↓",
          "Déclarer exchanges/queues/bindings (code, pas à la main)",
          "     ↓",
          "Producteur + consommateur en local, console ouverte",
          "     ↓",
          "Tests : panne du worker, redémarrage du broker",
          "     ↓",
          "Déploiement : broker managé ou cluster",
          "     ↓",
          "Monitoring : profondeur des files, taux d'ACK, alertes",
          "     ↓",
          "Runbook : que faire quand une file grossit",
        ],
      },
      {
        kind: "text",
        text: "La règle d'or : la topologie (exchanges, files, bindings) est déclarée par le code au démarrage, jamais créée à la main en production. Ainsi, un nouvel environnement se reconstruit à l'identique — et la console ne sert qu'à inspecter, pas à configurer.",
      },
    ],
  },
  {
    id: "debugging-base",
    title: "Déboguer : les premiers réflexes",
    level: 2,
    intro:
      "« Mon message n'arrive pas » : la méthode systématique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le producteur est-il connecté ? Onglet Connections de la console, ou `rabbitmqctl list_connections`.",
          "Le message atteint-il l'exchange ? Le graphe de débit de l'exchange dans la console montre les entrées.",
          "Le routage est-il correct ? Vérifier les bindings de l'exchange et la routing key publiée — une faute de frappe ici = message silencieusement ignoré.",
          "La file grossit-elle ? `list_queues name messages` : si oui, le problème est côté consommateur (pas connecté, bloqué, qui n'ACK pas).",
          "Le consommateur ACK-t-il ? Les messages `Unacked` qui stagnent signalent un worker planté après réception.",
          "Activer le traçage : le plugin `rabbitmq_tracing` loggue les messages qui traversent le broker (à n'utiliser qu'en debug, c'est verbeux).",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-debut",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges que tous les débutants rencontrent — et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Oublier l'ACK",
            value:
              "Le consommateur traite mais n'acquitte pas : les messages restent `Unacked`, la file semble bloquée, et au redémarrage tout est retraité. Toujours `basic_ack` après traitement réussi.",
          },
          {
            label: "ACK avant traitement",
            value:
              "L'inverse : acquitter dès réception. Si le worker plante ensuite, le message est perdu. ACK après le traitement, jamais avant.",
          },
          {
            label: "File non durable + messages non persistants",
            value:
              "Par défaut, tout est en mémoire : un redémarrage du broker vide les files. Durabilité = file durable + `delivery_mode=2` sur les messages.",
          },
          {
            label: "Faute de frappe dans la routing key",
            value:
              "Le message est publié, l'exchange ne trouve aucun binding : il est silencieusement jeté. Vérifier les bindings dans la console.",
          },
          {
            label: "Un seul consommateur précharge tout",
            value:
              "Sans limite, le premier worker connecté reçoit tous les messages pendant que les autres restent inactifs. Régler `basic_qos(prefetch_count=1)` pour une répartition équitable.",
          },
          {
            label: "guest en production",
            value:
              "Le compte `guest`/`guest` ne doit jamais servir en production : créer des utilisateurs dédiés par application et par vhost.",
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
      "Trois projets de difficulté croissante, alignés sur ceux du guide de la compétence.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Workers asynchrones",
        fields: [
          { label: "À construire", value: "Producteur → exchange direct → file → worker → ACK, avec messages persistants" },
          { label: "Objectif", value: "Maîtriser le cycle complet et tester la reprise après panne du worker" },
          { label: "Durée", value: "Quelques jours" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Notifications découplées",
        fields: [
          { label: "À construire", value: "Un exchange topic (`notifications.email`, `notifications.sms`) avec une file par canal et des workers dédiés" },
          { label: "Objectif", value: "Routage par topic, retry avec dead letter exchange, monitoring via la console" },
          { label: "Durée", value: "Une à deux semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Topologie complète supervisée",
        fields: [
          { label: "À construire", value: "Vhosts, utilisateurs dédiés, files quorum, alertes sur profondeur des files, runbook de panne" },
          { label: "Objectif", value: "Opérer RabbitMQ comme en production : sécurité, haute disponibilité, observabilité" },
          { label: "Durée", value: "Deux à trois semaines" },
        ],
      },
    ],
  },
  {
    id: "ressources-essentielles",
    title: "Ressources essentielles",
    level: 2,
    intro:
      "Par où continuer, en commençant par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "rabbitmq.com/docs",
            value: "La référence : tutoriels par langage, concepts, configuration, clustering. Les tutoriels « Hello World » existent en Python, Node.js, Java…",
          },
          {
            label: "rabbitmq.com/tutorials",
            value: "Six tutoriels progressifs (work queues, publish/subscribe, routing, topics, RPC) : le parcours pratique officiel.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
          "Clients : documentations de `pika` (Python) et `amqplib` (Node.js) pour les détails d'API.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "amqp-protocole",
    title: "Le protocole AMQP",
    level: 3,
    intro:
      "Comprendre ce qui circule sur le port 5672 : le modèle AMQP 0-9-1.",
    blocks: [
      {
        kind: "text",
        text: "AMQP est un protocole binaire standardisé : les clients ouvrent une connexion TCP, puis multiplexent des canaux (channels) légers dessus. Sur un canal, ils déclarent des exchanges et des files, publient des messages, consomment. Le message comporte un corps (payload, opaque pour le broker) et des propriétés (content-type, delivery-mode, headers, correlation-id…).",
      },
      {
        kind: "diagram",
        title: "Hiérarchie AMQP",
        lines: [
          "Connexion TCP (lourde : handshake, authentification)",
          " ├── Canal 1 (léger : publish/consume)",
          " ├── Canal 2",
          " └── Canal N",
          "",
          "Règle : une connexion par application,",
          "un canal par thread / flux logique.",
        ],
      },
      {
        kind: "list",
        items: [
          "Les canaux partagent la connexion : ouvrir une connexion par message est un gaspillage coûteux.",
          "Un canal en erreur se ferme sans tuer la connexion : isoler les flux risqués sur des canaux dédiés.",
          "Les clients (`pika`, `amqplib`) masquent ces détails, mais les comprendre explique les erreurs de type « channel closed ».",
        ],
      },
    ],
  },
  {
    id: "queues-details",
    title: "Files : les options de déclaration",
    level: 3,
    intro:
      "Durable, exclusive, auto-delete : trois options qui changent tout.",
    blocks: [
      {
        kind: "fields",
        title: "Options de `queue_declare`",
        fields: [
          {
            label: "durable",
            value:
              "La file survit au redémarrage du broker (sa définition est persistée). Indispensable en production ; les messages doivent en plus être publiés persistants (`delivery_mode=2`).",
          },
          {
            label: "exclusive",
            value:
              "La file n'est utilisable que par la connexion qui l'a créée, et est supprimée à sa fermeture. Usage : files de réponse temporaires (pattern RPC).",
          },
          {
            label: "auto_delete",
            value:
              "La file est supprimée quand son dernier consommateur se déconnecte. Usage : files éphémères de travail, jamais pour des données à conserver.",
          },
          {
            label: "arguments (x-*)",
            value:
              "Extensions : `x-dead-letter-exchange`, `x-message-ttl`, `x-max-length`, `x-max-priority` — la file devient programmable.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle de redéclaration : déclarer une file existante avec des options différentes provoque une erreur (`PRECONDITION_FAILED`). Les producteurs et consommateurs déclarent généralement la même topologie au démarrage — c'est idempotent tant que les options correspondent, ce qui rend le déploiement reproductible.",
      },
    ],
  },
  {
    id: "routing-avance",
    title: "Routage avancé",
    level: 3,
    intro:
      "Topic patterns, alternate exchange : router finement sans complexifier.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Bindings topic avec jokers",
        code: "import pika\n\nch = pika.BlockingConnection(pika.ConnectionParameters(\"localhost\")).channel()\nch.exchange_declare(exchange=\"events\", exchange_type=\"topic\")\n\n# Le worker \"commandes\" reçoit tout le sous-arbre orders.*\nch.queue_declare(queue=\"worker-commandes\")\nch.queue_bind(queue=\"worker-commandes\", exchange=\"events\",\n               routing_key=\"orders.#\")\n\n# Le worker \"alertes\" reçoit les échecs de paiement uniquement\nch.queue_declare(queue=\"alertes\")\nch.queue_bind(queue=\"alertes\", exchange=\"events\",\n               routing_key=\"payments.failed\")",
      },
      {
        kind: "text",
        text: "En topic, la clé est découpée en mots séparés par des points : `*` remplace exactement un mot, `#` remplace zéro ou plusieurs mots. `orders.#` capte `orders.created` comme `orders.eu.created`. L'alternate exchange (`alternate-exchange` en argument) récupère les messages non routés au lieu de les jeter : un filet de sécurité précieux en production.",
      },
      {
        kind: "list",
        items: [
          "Concevoir les clés hiérarchiques dès le début (`domaine.action`) : on ne peut pas renommer facilement ensuite.",
          "Un binding = une règle : multiplier les bindings plutôt que complexifier les clés.",
          "Tester le routage en publiant depuis la console web avant de coder le producteur.",
        ],
      },
    ],
  },
  {
    id: "acquittements-details",
    title: "Acquittements en détail",
    level: 3,
    intro:
      "ACK, NACK, requeue : le contrat de fiabilité, dans ses nuances.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois réponses possibles",
        fields: [
          {
            label: "ACK (`basic_ack`)",
            value:
              "Message traité avec succès : il est supprimé de la file. À envoyer après le traitement, jamais avant.",
          },
          {
            label: "NACK avec requeue (`basic_nack(requeue=True)`)",
            value:
              "Échec temporaire (service externe en panne) : le message retourne en tête de file pour être retraité. Attention aux boucles infinies si l'échec est permanent.",
          },
          {
            label: "NACK sans requeue / reject",
            value:
              "Échec définitif (message invalide) : le message est jeté — ou routé vers la dead letter exchange si configurée (recommandé).",
          },
        ],
      },
      {
        kind: "text",
        text: "Mode auto-ack (`auto_ack=True`) : le broker considère le message traité dès l'envoi. Simple, mais un worker qui plante perd le message en cours — à réserver aux traitements idempotents et non critiques. En manuel, un worker déconnecté sans ACK voit ses messages `Unacked` redistribués automatiquement : c'est la reprise sur panne gratuite.",
      },
      {
        kind: "code",
        language: "python",
        title: "Consommateur robuste",
        code: "def traiter(ch, method, props, body):\n    try:\n        executer_travail(body)          # peut lever une exception\n        ch.basic_ack(delivery_tag=method.delivery_tag)\n    except ErreurTemporaire:\n        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)\n    except Exception:\n        # Échec définitif -> dead letter (pas de requeue infinie)\n        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)",
      },
    ],
  },
  {
    id: "persistance-details",
    title: "Persistance : ne rien perdre",
    level: 3,
    intro:
      "Ce qu'il faut activer — aux trois niveaux — pour survivre à un redémarrage.",
    blocks: [
      {
        kind: "text",
        text: "La durabilité a trois couches indépendantes, toutes nécessaires : la file déclarée `durable`, le message publié persistant (`delivery_mode=2`), et l'exchange durable (les exchanges sont durables par défaut à la déclaration). S'il en manque une, le redémarrage du broker perd des données — silencieusement.",
      },
      {
        kind: "table",
        headers: ["Couche", "À faire", "Si oublié"],
        rows: [
          ["Exchange", "Déclarer durable (défaut)", "Recréé vide au redémarrage"],
          ["Queue", "`queue_declare(durable=True)`", "La file disparaît au redémarrage"],
          ["Message", "`delivery_mode=2` à la publication", "Les messages en file sont perdus"],
        ],
      },
      {
        kind: "list",
        items: [
          "La persistance coûte de la latence (écriture disque) : c'est le prix de la garantie.",
          "Même durable, un message confirmé n'est garanti qu'une fois écrit : les publisher confirms (section suivante) ferment la boucle.",
          "Les files quorum (voir Haute disponibilité) gèrent la persistance différemment : réplication plutôt que simple écriture disque.",
        ],
      },
    ],
  },
  {
    id: "publisher-confirms",
    title: "Publisher confirms",
    level: 3,
    intro:
      "La garantie côté producteur : savoir que le broker a bien pris en charge le message.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, `basic_publish` est « fire and forget » : le message peut être perdu entre le producteur et le broker (réseau, broker saturé) sans que personne ne le sache. Les publisher confirms activent un accusé de réception asynchrone du broker : chaque message publié reçoit un `ack` (pris en charge) ou un `nack` (refusé). C'est le chaînon manquant de la garantie de bout en bout.",
      },
      {
        kind: "code",
        language: "python",
        title: "Confirms avec pika",
        code: "ch.confirm_delivery()  # active les confirms sur ce canal\ntry:\n    ch.basic_publish(exchange=\"\", routing_key=\"emails\", body=body,\n                     properties=pika.BasicProperties(delivery_mode=2))\n    print(\"broker a confirmé\")\nexcept pika.exceptions.UnroutableError:\n    print(\"message non routé : aucun binding\")\nexcept pika.exceptions.NackError:\n    print(\"broker a refusé : à retenter\")",
      },
      {
        kind: "list",
        items: [
          "Confirms asynchrones par batch en pratique : attendre chaque message individuellement divise le débit.",
          "Alternative historique : les transactions AMQP (`tx_select`) — beaucoup plus lentes, à éviter.",
          "Le trio complet de la fiabilité : confirms côté producteur + file durable + ACK côté consommateur.",
        ],
      },
    ],
  },
  {
    id: "qos-prefetch",
    title: "QoS et prefetch : la répartition équitable",
    level: 3,
    intro:
      "Éviter qu'un worker rapide ne monopolise les messages pendant que les autres attendent.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, RabbitMQ distribue en round-robin sans tenir compte de la charge : un worker qui traite en 10 secondes reçoit autant de messages qu'un worker qui traite en 100 ms, et accumule des `Unacked`. `basic_qos(prefetch_count=N)` limite le nombre de messages non acquittés par consommateur : le broker n'envoie un nouveau message que quand un ACK libère de la place.",
      },
      {
        kind: "code",
        language: "python",
        title: "Fair dispatch",
        code: "ch.basic_qos(prefetch_count=1)  # un message à la fois par worker\nch.basic_consume(queue=\"taches\", on_message_callback=traiter)",
      },
      {
        kind: "list",
        items: [
          "`prefetch_count=1` : répartition strictement équitable, débit maximal par message. Valeur sûre pour des tâches longues.",
          "Augmenter (5-20) pour des tâches très courtes : réduit les allers-retours réseau.",
          "Le prefetch se règle par canal : un canal = un consommateur logique dans la plupart des clients.",
        ],
      },
    ],
  },
  {
    id: "dead-letter-exchanges",
    title: "Dead letter exchanges",
    level: 3,
    intro:
      "Que deviennent les messages en échec ? Les parquer au lieu de les perdre.",
    blocks: [
      {
        kind: "text",
        text: "Un message devient « dead letter » quand il est rejeté sans requeue, quand son TTL expire, ou quand la file dépasse sa longueur max. Sans configuration, il est jeté. Avec `x-dead-letter-exchange` sur la file, il est re-routé vers un exchange dédié, puis vers une file d'analyse : on peut l'inspecter, le corriger, le rejouer.",
      },
      {
        kind: "code",
        language: "python",
        title: "File avec dead letter",
        code: "ch.exchange_declare(exchange=\"dlx\", exchange_type=\"direct\")\nch.queue_declare(queue=\"taches-echecs\")\nch.queue_bind(queue=\"taches-echecs\", exchange=\"dlx\", routing_key=\"taches\")\n\nch.queue_declare(\n    queue=\"taches\",\n    durable=True,\n    arguments={\n        \"x-dead-letter-exchange\": \"dlx\",\n        \"x-dead-letter-routing-key\": \"taches\",\n    },\n)",
      },
      {
        kind: "list",
        items: [
          "Le message dead-letter conserve ses en-têtes d'origine plus `x-death` (compteur et raison) : de quoi diagnostiquer.",
          "Pattern retry : DLX + TTL sur la file d'attente = réessai différé (voir Patterns de retry).",
          "Surveiller la file dead-letter en production : sa croissance signale un problème systémique, pas des incidents isolés.",
        ],
      },
    ],
  },
  {
    id: "ttl",
    title: "TTL : la durée de vie des messages",
    level: 3,
    intro:
      "Faire expirer les messages périmés au lieu de traiter du passé.",
    blocks: [
      {
        kind: "fields",
        title: "Deux niveaux de TTL",
        fields: [
          {
            label: "TTL par message (`expiration`)",
            value:
              "Propriété à la publication : `expiration=\"60000\"` (ms). Le message expire 60 s après publication s'il n'est pas consommé.",
          },
          {
            label: "TTL par file (`x-message-ttl`)",
            value:
              "Argument de la file : tous ses messages expirent après la durée. Plus simple à opérer qu'un TTL par message.",
          },
          {
            label: "À l'expiration",
            value:
              "Le message est jeté — ou devient dead letter si la file a un DLX. C'est ainsi qu'on construit des retries différés.",
          },
        ],
      },
      {
        kind: "text",
        text: "Usage typique : une notification « votre commande est prête » n'a plus de sens après 24 h — mieux vaut l'expirer que l'envoyer en retard. Le TTL n'est pas un minuteur précis à la milliseconde : un message expiré en tête de file peut retarder l'expiration des suivants (comportement documenté des files classiques).",
      },
    ],
  },
  {
    id: "priorites",
    title: "Priorités",
    level: 3,
    intro:
      "Traiter d'abord l'urgent : les files à priorité, avec leurs limites.",
    blocks: [
      {
        kind: "text",
        text: "Une file déclarée avec `x-max-priority: 10` accepte des messages avec une priorité de 0 à 10 (`priority` dans les propriétés) : les plus prioritaires sont consommés d'abord. C'est une priorité souple, pas un ordonnancement temps réel strict.",
      },
      {
        kind: "list",
        items: [
          "Coût : les files à priorité consomment plus de mémoire et de CPU — ne pas les activer « au cas où ».",
          "La priorité ne préempte pas : un message en cours de traitement ne sera pas interrompu.",
          "Alternative souvent meilleure : deux files (urgent / normal) et deux workers — plus simple à raisonner et à monitorer.",
        ],
      },
    ],
  },
  {
    id: "quorum-queues",
    title: "Quorum queues",
    level: 3,
    intro:
      "Les files répliquées : le standard moderne pour la haute disponibilité.",
    blocks: [
      {
        kind: "text",
        text: "Les quorum queues répliquent chaque file sur plusieurs nœuds via le consensus Raft : un message confirmé est présent sur une majorité de nœuds, donc la file survit à la perte d'un nœud sans perdre de données. Elles remplacent les anciennes « mirrored queues » classiques, dépréciées : toute nouvelle file critique devrait être une quorum queue.",
      },
      {
        kind: "code",
        language: "python",
        title: "Déclarer une quorum queue",
        code: "ch.queue_declare(\n    queue=\"commandes\",\n    durable=True,\n    arguments={\"x-queue-type\": \"quorum\"},\n)",
      },
      {
        kind: "list",
        items: [
          "Les quorum queues sont toujours durables : la non-durabilité n'existe pas pour elles.",
          "Elles ne supportent pas les priorités ni certaines options exotiques : vérifier la compatibilité avant migration.",
          "Leur débit est inférieur aux files classiques : c'est le prix du consensus — dimensionner en conséquence.",
        ],
      },
    ],
  },
  {
    id: "clustering",
    title: "Clustering",
    level: 3,
    intro:
      "Plusieurs nœuds, une seule vue logique : comment fonctionne un cluster RabbitMQ.",
    blocks: [
      {
        kind: "text",
        text: "Un cluster relie plusieurs nœuds Erlang qui partagent métadonnées (exchanges, files, utilisateurs) : un client connecté à n'importe quel nœud voit la même topologie. Les files classiques vivent sur un seul nœud (leur « home ») ; seules les quorum queues sont réellement répliquées. Le clustering répartit donc la charge, mais la haute disponibilité des données vient des quorum queues.",
      },
      {
        kind: "command",
        label: "Assembler un cluster",
        command: "docker exec rabbitmq2 rabbitmqctl stop_app && docker exec rabbitmq2 rabbitmqctl join_cluster rabbit@rabbitmq1 && docker exec rabbitmq2 rabbitmqctl start_app",
        why: "Arrête l'application sur le second nœud, le fait rejoindre le cluster du premier, puis redémarre. Les nœuds doivent partager le même cookie Erlang et se résoudre par nom d'hôte.",
        verify: "docker exec rabbitmq1 rabbitmqctl cluster_status",
      },
      {
        kind: "list",
        items: [
          "Un cluster s'étend sur un réseau local fiable : la latence inter-nœuds dégrade directement les quorum queues.",
          "Les nœuds doivent avoir des horloges synchronisées et le même cookie Erlang.",
          "Pour des sites distants, préférer la fédération ou Shovel (section suivante) au cluster étendu.",
        ],
      },
    ],
  },
  {
    id: "haute-disponibilite",
    title: "Haute disponibilité en pratique",
    level: 3,
    intro:
      "Assembler les pièces : ce qu'une installation résiliente exige vraiment.",
    blocks: [
      {
        kind: "fields",
        title: "Les couches de la résilience",
        fields: [
          {
            label: "Cluster de 3 nœuds",
            value: "Nombre impair pour le quorum Raft : 3 nœuds tolèrent la perte d'un nœud. Répartis sur 3 zones de disponibilité si possible.",
          },
          {
            label: "Quorum queues pour le critique",
            value: "Files répliquées pour les flux à ne pas perdre ; files classiques pour le non-critique à haut débit.",
          },
          {
            label: "Clients résilients",
            value: "Reconnexion automatique avec backoff, topologie redéclarée à chaque connexion, plusieurs hôtes dans la configuration.",
          },
          {
            label: "Load balancer ou DNS",
            value: "Devant les nœuds pour le port 5672 : les clients basculent automatiquement en cas de nœud tombé.",
          },
          {
            label: "Sauvegardes",
            value: "Définitions (exchanges, files, utilisateurs) exportées régulièrement : `rabbitmqctl export_definitions`. Les messages en transit ne se sauvegardent pas — d'où l'importance des confirms.",
          },
        ],
      },
    ],
  },
  {
    id: "vhosts-securite",
    title: "Vhosts et sécurité",
    level: 3,
    intro:
      "Isoler, authentifier, chiffrer : RabbitMQ exposé sans protection est une porte ouverte.",
    blocks: [
      {
        kind: "command",
        label: "Créer un vhost isolé pour une application",
        command: "docker exec rabbitmq rabbitmqctl add_vhost prod && docker exec rabbitmq rabbitmqctl set_permissions -p prod app \".*\" \".*\" \".*\"",
        why: "Crée l'espace de noms `prod` puis donne à l'utilisateur `app` les droits de configuration, écriture et lecture dessus (les trois motifs `.*`). Chaque environnement (dev, prod) et chaque application a son vhost : une erreur de routage ne peut pas polluer un autre périmètre.",
        verify: "docker exec rabbitmq rabbitmqctl list_vhosts",
      },
      {
        kind: "list",
        items: [
          "TLS sur 5671 (AMQP) et 15671 (management) en production : les identifiants transitent sinon en clair.",
          "Désactiver ou renommer `guest` hors localhost : c'est la première chose qu'un attaquant essaie.",
          "Principe du moindre privilège : un producteur n'a besoin que d'écrire, un worker que de lire sa file.",
          "Le fichier `rabbitmq.conf` centralise la config (`listeners.tcp.local`, `loopback_users`) : le versionner.",
        ],
      },
    ],
  },
  {
    id: "management-api",
    title: "L'API HTTP de management",
    level: 3,
    intro:
      "Piloter RabbitMQ par HTTP : automatiser ce que la console fait à la souris.",
    blocks: [
      {
        kind: "command",
        label: "Lister les files via l'API",
        command: "curl -s -u app:secret http://localhost:15672/api/queues | python -m json.tool | head -30",
        why: "Interroge l'API REST du plugin management : même données que la console, en JSON exploitable par scripts. C'est la base du monitoring custom et des vérifications en CI.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" -u app:secret http://localhost:15672/api/overview",
      },
      {
        kind: "list",
        items: [
          "`GET /api/queues` : état des files ; `GET /api/exchanges` : topologie ; `POST /api/exchanges/%2F/mon-exchange/publish` : publier un message de test.",
          "`rabbitmqadmin` (CLI fournie par le plugin) enveloppe cette API pour les scripts shell.",
          "Ne pas exposer le port 15672 sur Internet : l'API a les mêmes droits que la console.",
        ],
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    level: 3,
    intro:
      "Surveiller ce qui compte : profondeur des files, pas seulement « le broker tourne ».",
    blocks: [
      {
        kind: "fields",
        title: "Métriques à alerter",
        fields: [
          {
            label: "Profondeur des files (`messages_ready`)",
            value:
              "Le signal principal : une file qui grossit = consommateurs trop lents ou en panne. Alerter sur un seuil, pas sur zéro.",
          },
          {
            label: "Messages non acquittés (`messages_unacknowledged`)",
            value:
              "Des Unacked qui stagnent = workers bloqués ou morts sans fermer proprement.",
          },
          {
            label: "Taux de publication vs consommation",
            value:
              "Si publish > deliver durablement, la file grossit inexorablement : il faut plus de workers ou moins de charge.",
          },
          {
            label: "Connexions et canaux",
            value:
              "Une explosion du nombre de connexions signale une fuite côté client (connexion par message).",
          },
          {
            label: "Espace disque et mémoire du nœud",
            value:
              "RabbitMQ bloque les producteurs quand le disque ou la mémoire sature (alarmes internes) : surveiller avant le blocage.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le plugin `rabbitmq_prometheus` expose ces métriques au format Prometheus sur un port dédié : c'est la voie standard vers Grafana et l'alerting. En complément, `rabbitmq-diagnostics` (ping, status, alarms) reste l'outil de diagnostic manuel.",
      },
    ],
  },
  {
    id: "patterns-work-queues",
    title: "Pattern : work queues",
    level: 3,
    intro:
      "Distribuer des tâches longues entre workers : le pattern de base, bien réglé.",
    blocks: [
      {
        kind: "diagram",
        title: "Work queue avec fair dispatch",
        lines: [
          "Producteur ──▶ exchange direct ──▶ queue \"taches\" (durable)",
          "                                            │",
          "                    ┌───────────────────────┼───────────────────────┐",
          "                    ▼                       ▼                       ▼",
          "                Worker 1                Worker 2                Worker 3",
          "           (prefetch=1, ACK)       (prefetch=1, ACK)       (prefetch=1, ACK)",
        ],
      },
      {
        kind: "list",
        items: [
          "Messages persistants + file durable + ACK manuel + `prefetch_count=1` : la configuration de référence.",
          "Idempotence : un message retraité après crash ne doit pas créer de doublon métier (clé d'idempotence en base).",
          "Ordre non garanti avec plusieurs workers : si l'ordre compte, un seul consommateur (ou partitionnement par clé).",
        ],
      },
    ],
  },
  {
    id: "patterns-pub-sub",
    title: "Pattern : publish/subscribe",
    level: 3,
    intro:
      "Diffuser un événement à plusieurs consommateurs indépendants.",
    blocks: [
      {
        kind: "diagram",
        title: "Fanout vers des files dédiées",
        lines: [
          "Producteur ──▶ exchange fanout \"notifications\"",
          "                       │",
          "        ┌──────────────┼──────────────┐",
          "        ▼              ▼              ▼",
          "   queue \"email\"  queue \"sms\"  queue \"push\"",
          "        │              │              │",
          "        ▼              ▼              ▼",
          "   Worker email   Worker SMS    Worker push",
        ],
      },
      {
        kind: "text",
        text: "Chaque consommateur a sa file : un worker SMS lent ne retarde pas les emails, et l'ajout d'un canal (push) ne touche pas aux existants. Avec un exchange `topic`, on affine : `notifications.#` pour tout, `notifications.email` pour un seul canal — le même exchange sert les deux usages.",
      },
    ],
  },
  {
    id: "patterns-rpc",
    title: "Pattern : RPC",
    level: 3,
    intro:
      "Demande/réponse sur des files : quand on a besoin d'une réponse, mais découplée.",
    blocks: [
      {
        kind: "text",
        text: "Le client publie sur une file de requêtes avec deux propriétés : `reply_to` (nom d'une file de réponse exclusive qu'il a créée) et `correlation_id` (identifiant unique). Le serveur traite et publie la réponse vers `reply_to` en recopiant le `correlation_id`. Le client corrèle la réponse à sa demande.",
      },
      {
        kind: "list",
        items: [
          "À réserver aux cas où la réponse est vraiment nécessaire : sinon, rester en fire-and-forget.",
          "Timeout côté client obligatoire : un serveur en panne ne doit pas bloquer indéfiniment.",
          "Le tutoriel officiel RabbitMQ « RPC » (disponible en Python et Node.js) fournit l'implémentation de référence.",
        ],
      },
    ],
  },
  {
    id: "patterns-retry",
    title: "Pattern : retry avec backoff",
    level: 3,
    intro:
      "Réessayer intelligemment : délai croissant, sans boucle infinie.",
    blocks: [
      {
        kind: "diagram",
        title: "Retry différé via DLX + TTL",
        lines: [
          "queue \"taches\" ──(échec, nack sans requeue)──▶ DLX",
          "                                                    │",
          "                                                    ▼",
          "                                          queue \"retry\" (TTL 60s)",
          "                                                    │ (expiration)",
          "                                                    ▼",
          "                                          DLX de \"retry\" ──▶ queue \"taches\"",
          "                                          (le message est retraité après 60 s)",
        ],
      },
      {
        kind: "text",
        text: "Le message en échec part vers une file de retry avec un TTL : à expiration, il devient dead letter vers la file d'origine. En chaînant plusieurs files de retry (60 s, 5 min, 30 min), on obtient un backoff exponentiel. Après N tentatives (compteur dans les en-têtes `x-death`), direction la file d'échecs définitifs pour analyse humaine.",
      },
    ],
  },
  {
    id: "performance-tuning",
    title: "Performance : les leviers réels",
    level: 3,
    intro:
      "Débit et latence : ce qui compte vraiment, mesuré dans l'ordre.",
    blocks: [
      {
        kind: "fields",
        title: "Leviers par impact",
        fields: [
          {
            label: "Réutiliser connexions et canaux",
            value:
              "Le gain numéro un : une connexion persistante par application, des canaux réutilisés. Ouvrir une connexion par message ajoute un handshake TCP/TLS et AMQP à chaque envoi : le coût est massif.",
          },
          {
            label: "Confirms asynchrones par batch",
            value:
              "Confirmer par lots plutôt que message par message : la garantie sans le coût du round-trip synchrone.",
          },
          {
            label: "Messages petits",
            value:
              "RabbitMQ est fait pour des messages de quelques Ko. Les gros payloads (fichiers) vont dans un stockage objet, avec une référence dans le message.",
          },
          {
            label: "Prefetch adapté",
            value:
              "Ni 1 (trop prudent pour des tâches de 1 ms) ni illimité : calibrer selon la durée de traitement.",
          },
          {
            label: "Files classiques vs quorum",
            value:
              "Les quorum queues sont plus lentes (consensus) : réserver la réplication aux flux critiques, garder les files classiques pour le haut débit non critique.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pas de chiffre magique : le débit dépend de la taille des messages, de la topologie et du matériel. Le seul chiffre qui compte est le vôtre, mesuré avec un test de charge représentatif.",
      },
    ],
  },
  {
    id: "federation-shovel",
    title: "Fédération et Shovel",
    level: 3,
    intro:
      "Relier des brokers distants : quand un cluster ne suffit plus.",
    blocks: [
      {
        kind: "text",
        text: "Deux plugins pour deux besoins : la fédération (federation) réplique des exchanges/files entre brokers de sites distants de façon paresseuse (les messages ne traversent le WAN que s'il y a un consommateur de l'autre côté) ; Shovel déplace des messages d'une file vers une autre, éventuellement sur un broker distant, de façon configurable et fiable. Les deux évitent d'étendre un cluster sur un réseau à forte latence.",
      },
      {
        kind: "list",
        items: [
          "Cas typique : usines ou régions avec un broker local chacune, consolidées vers un broker central via Shovel.",
          "La fédération est plus dynamique (découverte automatique), Shovel plus explicite (une tâche = un flux).",
          "Les deux se configurent depuis la console (onglet Admin) ou l'API : pas de code applicatif à changer.",
        ],
      },
    ],
  },
  {
    id: "comparaison-kafka",
    title: "RabbitMQ vs Kafka : comparaison factuelle",
    level: 3,
    intro:
      "Deux outils, deux philosophies : choisir selon le besoin, sans dogme.",
    blocks: [
      {
        kind: "table",
        headers: ["", "RabbitMQ", "Kafka"],
        rows: [
          ["Modèle", "Broker avec files : le message est supprimé après ACK", "Log distribué : les messages persistent, les consommateurs gèrent leur offset"],
          ["Routage", "Riche (direct, topic, fanout, headers) via exchanges", "Simple : topics et partitions, pas de routage complexe"],
          ["Garanties", "ACK par message, confirms, quorum queues", "Acks configurables, réplication par partition, exactly-once avec transactions"],
          ["Débit typique", "Dizaines de milliers de msg/s par nœud", "Centaines de milliers à millions de msg/s"],
          ["Cas fort", "Files de travail, RPC, routage complexe, faible latence", "Streaming, event sourcing, rejouabilité de l'historique"],
          ["Opérabilité", "Un binaire, console intégrée, clustering simple", "ZooKeeper/KRaft, plus de pièces mobiles"],
        ],
      },
      {
        kind: "text",
        text: "Ni supériorité ni infériorité : RabbitMQ excelle quand chaque message a un destinataire et un traitement (tâches, notifications, RPC) ; Kafka quand l'événement est un fait durable à rejouer (logs, event sourcing, analytics temps réel). Beaucoup d'architectures utilisent les deux.",
      },
    ],
  },
  {
    id: "transactions-vs-confirms",
    title: "Transactions vs confirms",
    level: 3,
    intro:
      "Deux mécanismes de garantie côté producteur, un seul à utiliser.",
    blocks: [
      {
        kind: "text",
        text: "AMQP propose des transactions (`tx_select`, `tx_commit`) : publier plusieurs messages de façon atomique. Le coût est élevé (synchronisation à chaque commit) et le débit s'effondre. Les publisher confirms offrent une garantie suffisante (le broker a pris en charge le message) avec un surcoût faible, surtout en mode asynchrone par batch.",
      },
      {
        kind: "list",
        items: [
          "Besoin d'atomicité entre plusieurs files ? Repenser le design (un message, un consommateur qui ventile) plutôt que d'utiliser les transactions.",
          "Les confirms ne garantissent pas le traitement, seulement la prise en charge : la garantie de bout en bout exige aussi l'ACK consommateur.",
          "En pratique : confirms partout, transactions presque jamais.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes qui séparent un prototype d'un messaging fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Déclarer la topologie dans le code au démarrage (idempotent) : jamais de configuration manuelle en production.",
          "Nommer explicitement : `orders.created.v1`, pas `queue1` — les noms sont de la documentation.",
          "Messages petits et auto-suffisants : JSON avec un `event_id` et un `timestamp`, jamais de gros binaires.",
          "Idempotence des consommateurs : un message peut être redélivré (requeue, crash) — le traitement doit le supporter.",
          "Versionner les formats de message : un champ `version` permet de faire évoluer sans casser les vieux consommateurs.",
          "DLX sur toute file critique : aucun message ne doit disparaître sans laisser de trace.",
          "Monitorer la profondeur des files avec alertes : c'est le thermomètre de la santé du système.",
          "Tester les pannes : tuer un worker, redémarrer le broker, couper le réseau — en recette, pas en production.",
        ],
      },
    ],
  },
  {
    id: "checklist-production",
    title: "Checklist de mise en production",
    level: 3,
    intro:
      "Avant d'ouvrir le trafic : les vérifications qui évitent les incidents.",
    blocks: [
      {
        kind: "fields",
        title: "À valider",
        fields: [
          {
            label: "Durabilité",
            value: "Exchanges durables, files durables, messages persistants, confirms activés.",
          },
          {
            label: "Sécurité",
            value: "TLS, utilisateurs dédiés par application, vhosts isolés, `guest` désactivé hors localhost.",
          },
          {
            label: "Haute disponibilité",
            value: "Cluster de 3 nœuds, quorum queues pour le critique, clients avec reconnexion et multi-hôtes.",
          },
          {
            label: "Observabilité",
            value: "Métriques Prometheus, alertes sur profondeur des files et Unacked, logs centralisés.",
          },
          {
            label: "Capacité",
            value: "Test de charge au pic prévu + marge ; politique de débordement (max-length) définie.",
          },
          {
            label: "Runbook",
            value: "Procédures écrites : file qui grossit, nœud tombé, messages en dead letter, redémarrage.",
          },
          {
            label: "Sauvegarde",
            value: "Définitions exportées régulièrement ; restauration testée.",
          },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "RabbitMQ maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "`kafka` : le streaming à haut débit et les logs distribués, pour les usages que RabbitMQ ne couvre pas.",
          "`docker` : conteneurisation avancée (volumes, réseaux, compose) pour opérer le broker proprement.",
          "`kubernetes` : orchestration, StatefulSets et opérateurs RabbitMQ pour la production.",
          "`linux` : administration système — là où tourne réellement le broker.",
          "Architecture : patterns d'intégration (event-driven, saga, CQRS) qui donnent du sens au messaging.",
          "Revenir à la roadmap : valider RabbitMQ et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "ressources-avancees",
    title: "Ressources avancées",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "rabbitmq.com/docs",
            value: "Référence complète : clustering, quorum queues, TLS, plugins, production checklist.",
          },
          {
            label: "rabbitmq.com/tutorials",
            value: "Les six tutoriels (work queues, routing, topics, RPC) : à refaire dans votre langage principal.",
          },
          {
            label: "rabbitmq.com/blog",
            value: "Annonces et guides approfondis de l'équipe RabbitMQ (ex. migrations vers les quorum queues).",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
          "Clients : documentations de `pika` et `amqplib` pour les subtilités d'API (confirms, QoS, reconnexion).",
          "Opérations : la « Production Checklist » officielle avant toute mise en production sérieuse.",
        ],
      },
    ],
  },
];

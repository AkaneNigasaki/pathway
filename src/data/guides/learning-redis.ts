import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Redis : du premier SET au déploiement en production.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_REDIS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Redis, à quoi il sert et pourquoi il est partout dans les architectures modernes.",
    blocks: [
      {
        kind: "text",
        text: "Redis est un stockage clé-valeur en mémoire, ultra-rapide : il sert de cache, de gestionnaire de sessions, de file de messages et de compteur temps réel pour les applications à forte charge. Les données vivent en RAM, ce qui donne des temps de réponse de l'ordre de la milliseconde.",
      },
      {
        kind: "text",
        text: "Pourquoi Redis existe : les bases de données relationnelles sont optimisées pour la durabilité et les requêtes complexes, pas pour répondre des dizaines de milliers de fois par seconde à la même question. Redis prend en charge ce trafic répétitif : un cache bien placé divise la charge de la base de données principale et rend l'application visiblement plus rapide.",
      },
      {
        kind: "text",
        text: "Simple à prendre en main, Redis enseigne les compromis fondamentaux de l'infrastructure : vitesse contre durabilité, mémoire contre coût, simplicité contre haute disponibilité. C'est le compagnon performance de toute application qui doit passer à l'échelle.",
      },
    ],
  },
  {
    id: "redis-serveur-de-structures",
    title: "Redis n'est pas une simple base clé-valeur",
    level: 1,
    intro:
      "Le point qui distingue Redis : les valeurs ne sont pas des blobs opaques, mais des structures de données manipulables côté serveur.",
    blocks: [
      {
        kind: "diagram",
        title: "Ce que Redis stocke",
        lines: [
          "Clé ──▶ Valeur (structure de données)",
          "",
          "  Strings    → texte, nombres, compteurs (INCR)",
          "  Hashes     → objets à champs (profils utilisateur)",
          "  Lists      → files FIFO/LIFO (tâches à traiter)",
          "  Sets       → ensembles uniques (tags, abonnés)",
          "  Sorted Sets→ classements (scores, leaderboards)",
          "  Streams    → journaux d'événements (event sourcing)",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : au lieu de lire un blob, le modifier en application puis le réécrire, vous demandez à Redis d'incrémenter un compteur, d'ajouter un élément à un ensemble ou de dépiler une file — en une seule opération atomique, sans aller-retour applicatif. C'est cette atomicité côté serveur qui rend Redis puissant pour les compteurs, les files et les verrous.",
      },
      {
        kind: "list",
        items: [
          "Chaque commande Redis est atomique : pas de lecture-modification-écriture concurrente qui se marche dessus.",
          "Les données sont en mémoire : rapide, mais la RAM est limitée et coûteuse — d'où les politiques d'éviction.",
          "La persistance est optionnelle (RDB, AOF) : Redis peut perdre des données, par design, si on ne la configure pas.",
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
      "Ce qu'il faut déjà connaître pour que Redis ait du sens, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Bases de données (`databases`)",
            value:
              "Comprendre le rôle d'une base de données et quand le cache devient nécessaire. Redis ne remplace pas une base relationnelle : il la soulage.",
          },
          {
            label: "Terminal et ligne de commande",
            value:
              "Lancer des conteneurs, éditer un fichier de configuration, lire des logs. La majorité de l'administration Redis se fait en CLI.",
          },
          {
            label: "Notions réseau",
            value:
              "Ports, `localhost`, pare-feu de base. Redis écoute sur le port 6379 : il faut comprendre ce que signifie l'exposer — ou pas.",
          },
          {
            label: "Un langage pour le client",
            value:
              "Python, Node.js ou autre : les exemples utilisent `redis-cli`, mais l'usage réel passe par une bibliothèque cliente.",
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
      "Démarrer un serveur Redis en local, en comprenant ce que fait chaque commande.",
    blocks: [
      {
        kind: "command",
        label: "Lancer Redis via Docker",
        command: "docker run --name redis -p 6379:6379 -d redis:7",
        why: "Démarre un conteneur Redis 7 détaché (`-d`), avec le port 6379 publié sur la machine hôte. C'est la méthode la plus reproductible pour le développement : pas d'installation système, suppression en une commande.",
        verify: "redis-cli ping",
      },
      {
        kind: "command",
        label: "Installer nativement (Debian/Ubuntu)",
        command: "sudo apt install redis-server",
        why: "Installe le serveur Redis comme service système. Pratique pour un environnement Linux dédié, mais lie la version aux dépôts de la distribution — souvent en retard sur les versions officielles.",
        verify: "redis-cli ping",
      },
      {
        kind: "text",
        text: "`redis-cli ping` doit répondre `PONG` : c'est le test de santé le plus simple. Si la commande échoue, le serveur ne tourne pas ou n'écoute pas sur `localhost:6379`.",
      },
    ],
  },
  {
    id: "configuration-essentielle",
    title: "Configuration essentielle",
    level: 2,
    intro:
      "Les trois réglages à connaître avant d'exposer Redis à quoi que ce soit de sérieux.",
    blocks: [
      {
        kind: "fields",
        title: "Fichier `redis.conf` — l'essentiel",
        fields: [
          {
            label: "`bind 127.0.0.1`",
            value:
              "Restreint l'écoute aux interfaces locales. Un Redis exposé sur Internet sans mot de passe est une faille classique et grave.",
          },
          {
            label: "`requirepass <mot-de-passe>`",
            value:
              "Définit un mot de passe exigé à la connexion (`redis-cli -a <mot-de-passe>` ou commande `AUTH`). Indispensable dès que Redis est accessible sur le réseau.",
          },
          {
            label: "`appendonly yes`",
            value:
              "Active la persistance AOF : chaque écriture est journalisée. Sans persistance, un redémarrage vide toutes les données.",
          },
          {
            label: "`maxmemory 256mb` + `maxmemory-policy allkeys-lru`",
            value:
              "Plafonne la RAM utilisée et définit quoi évincer quand elle est pleine (ici : les clés les moins récemment utilisées). Sans limite, Redis peut consommer toute la mémoire du serveur.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : ne jamais exposer un Redis sans mot de passe sur un réseau non fiable. Des robots scannent en permanence le port 6379 à la recherche d'instances ouvertes.",
      },
    ],
  },
  {
    id: "premiers-pas-cli",
    title: "Premiers pas en CLI",
    level: 2,
    intro:
      "Le cycle fondamental — écrire, lire, expirer — en cinq minutes dans `redis-cli`.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Ouvrir la CLI",
            detail: "Lancez `redis-cli` dans un terminal. L'invite `127.0.0.1:6379>` confirme la connexion au serveur local.",
          },
          {
            title: "Écrire une clé",
            detail: "`SET visiteur:1 \"Akane\"` — crée la clé `visiteur:1` avec la valeur `Akane`. Redis répond `OK`.",
          },
          {
            title: "Lire la clé",
            detail: "`GET visiteur:1` — renvoie `\"Akane\"`. `GET` sur une clé inexistante renvoie `(nil)`, pas une erreur.",
          },
          {
            title: "Ajouter une expiration",
            detail: "`EXPIRE visiteur:1 60` — la clé disparaîtra dans 60 secondes. `TTL visiteur:1` affiche le temps restant.",
          },
          {
            title: "Compter atomiquement",
            detail: "`INCR compteur:visites` — crée le compteur à 1 s'il n'existe pas, sinon l'incrémente. Atomique : sûr même avec des centaines de clients concurrents.",
          },
          {
            title: "Nettoyer (développement uniquement)",
            detail: "`FLUSHDB` vide la base courante. À ne jamais exécuter en production — il n'y a pas de confirmation.",
          },
        ],
      },
    ],
  },
  {
    id: "types-de-donnees",
    title: "Les types de données essentiels",
    level: 2,
    intro:
      "Cinq structures couvrent la majorité des usages. Chacune a ses commandes et son cas d'usage naturel.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Commandes clés", "Usage typique"],
        rows: [
          ["Strings", "`SET`, `GET`, `INCR`, `EXPIRE`", "Cache de pages, compteurs, sessions simples"],
          ["Hashes", "`HSET`, `HGET`, `HGETALL`", "Objets à champs : profils, configurations"],
          ["Lists", "`LPUSH`, `RPUSH`, `LPOP`, `BRPOP`", "Files de tâches, historiques récents"],
          ["Sets", "`SADD`, `SMEMBERS`, `SISMEMBER`", "Tags uniques, abonnés, ensembles"],
          ["Sorted Sets", "`ZADD`, `ZRANGE`, `ZREVRANGE`", "Classements par score, files à priorité"],
        ],
      },
      {
        kind: "code",
        language: "bash",
        title: "Tour d'horizon en redis-cli",
        code: "SET produit:42 \"Casque audio\"\nHSET user:7 nom \"Akane\" role \"admin\"\nLPUSH taches \"envoyer-email\" \"generer-pdf\"\nSADD tags:article:12 \"redis\" \"cache\" \"backend\"\nZADD leaderboard 1500 \"joueur1\" 2300 \"joueur2\"",
      },
    ],
  },
  {
    id: "ttl-et-expiration",
    title: "TTL et expiration",
    level: 2,
    intro:
      "L'expiration automatique est ce qui fait de Redis un cache plutôt qu'un simple stockage.",
    blocks: [
      {
        kind: "text",
        text: "Chaque clé peut avoir une durée de vie : `EXPIRE` (en secondes), `PEXPIRE` (en millisecondes), ou directement `SET key value EX 3600`. Quand le TTL atteint zéro, Redis supprime la clé automatiquement. `TTL` renvoie le temps restant, `-1` si la clé n'a pas d'expiration, `-2` si elle n'existe pas.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est central : un cache sans expiration finit par servir des données périmées ou par saturer la mémoire. Le TTL est le mécanisme le plus simple de fraîcheur des données — choisissez-le selon le coût d'une donnée périmée : quelques secondes pour un prix affiché, plusieurs heures pour une page statique.",
      },
      {
        kind: "list",
        items: [
          "`PERSIST key` retire l'expiration d'une clé.",
          "L'expiration est approximative : Redis supprime les clés expirées de façon paresseuse et périodique.",
          "Sur une réplique, l'expiration est propagée par le primaire — ne pas s'appuyer sur une précision à la milliseconde.",
        ],
      },
    ],
  },
  {
    id: "cas-usage-cache",
    title: "Cas d'usage : le cache",
    level: 2,
    intro:
      "Le premier usage de Redis, et le plus rentable : éviter de recalculer ce qui change peu.",
    blocks: [
      {
        kind: "diagram",
        title: "Lecture avec cache (cache-aside)",
        lines: [
          "Application",
          "    │ 1. GET cache:produit:42",
          "    ▼",
          "  Redis ── HIT ──▶ réponse immédiate",
          "    │",
          "    └── MISS ──▶ 2. requête base de données",
          "                       │",
          "                       ▼ 3. SET cache:produit:42 EX 300",
          "                     Redis",
        ],
      },
      {
        kind: "text",
        text: "Le pattern cache-aside : l'application regarde d'abord dans Redis ; en cas d'absence, elle interroge la base, stocke le résultat avec un TTL, puis le sert. Simplicité maximale, et la base ne voit que le trafic réellement nouveau.",
      },
      {
        kind: "list",
        items: [
          "Mettez en cache les lectures coûteuses et répétées : pages rendues, résultats de requêtes lentes, réponses d'API externes.",
          "Ne mettez jamais en cache ce que vous ne savez pas invalider : un cache périmé servi comme frais est un bug silencieux.",
          "Commencez par un TTL court (quelques minutes) : facile à ajuster ensuite selon les mesures.",
        ],
      },
    ],
  },
  {
    id: "cas-usage-sessions-compteurs",
    title: "Cas d'usage : sessions et compteurs",
    level: 2,
    intro:
      "Deux usages où l'expiration native et l'atomicité de Redis brillent.",
    blocks: [
      {
        kind: "text",
        text: "Sessions : stockez la session sous une clé `session:<token>` avec un TTL (par exemple 30 minutes, renouvelé à chaque activité). Quand l'utilisateur se déconnecte ou que le TTL expire, la session disparaît seule — pas de tâche de nettoyage à écrire. Plusieurs serveurs d'application peuvent partager ces sessions via le même Redis.",
      },
      {
        kind: "text",
        text: "Compteurs : `INCR`/`INCRBY` pour les vues de page, les likes, les quotas d'API. L'opération est atomique côté serveur : même avec des milliers de requêtes concurrentes, aucun incrément n'est perdu — ce qu'une lecture-modification-écriture en application ne garantit pas.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Session et compteur en redis-cli",
        code: "SET session:abc123 \"{\\\"user\\\":7}\" EX 1800\nINCR stats:page:accueil\nINCRBY api:quota:client42 1\nEXPIRE api:quota:client42 3600",
      },
    ],
  },
  {
    id: "outils-et-environnement",
    title: "Outils et environnement",
    level: 2,
    intro:
      "Explorer et administrer Redis sans passer uniquement par le terminal.",
    blocks: [
      {
        kind: "fields",
        title: "Outillage",
        fields: [
          {
            label: "`redis-cli`",
            value:
              "Le client en ligne de commande livré avec Redis : requêtes ad hoc, scripts, vérifications rapides. Indispensable.",
          },
          {
            label: "RedisInsight",
            value:
              "L'interface graphique officielle : explorer les clés, visualiser les structures, exécuter des commandes, analyser la mémoire.",
          },
          {
            label: "Redis for VS Code",
            value:
              "L'extension officielle pour VS Code : explorer les clés et exécuter des commandes sans quitter l'éditeur.",
          },
          {
            label: "Bibliothèques clientes",
            value:
              "`redis-py` (Python), `ioredis` / `node-redis` (Node.js), `go-redis` (Go), `Jedis`/`Lettuce` (Java) : l'usage réel en application passe par elles.",
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
      "Les réflexes quotidiens quand on travaille avec Redis en développement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Inspecter l'état : `INFO` (sections `server`, `memory`, `stats`), `DBSIZE` pour le nombre de clés.",
          "Chercher des clés en dev : `KEYS prefix:*` — pratique mais bloquant : interdit en production, où on utilise `SCAN`.",
          "Observer le trafic en direct : `redis-cli MONITOR` affiche chaque commande reçue — idéal pour comprendre ce que fait réellement l'application.",
          "Vider en développement : `FLUSHDB` (base courante) ; jamais en production.",
          "Tester la latence : `redis-cli --latency` donne une mesure simple des temps de réponse.",
          "Versionner la configuration : `redis.conf` dans Git, comme tout fichier d'infrastructure.",
        ],
      },
    ],
  },
  {
    id: "debugging-premiers-reflexes",
    title: "Debugging : premiers réflexes",
    level: 2,
    intro:
      "Quand Redis ne répond pas comme attendu, vérifier dans cet ordre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Le serveur tourne-t-il ?",
            detail: "`redis-cli ping` doit répondre `PONG`. Sinon : conteneur arrêté, service down, ou mauvaise adresse/port.",
          },
          {
            title: "La clé existe-t-elle vraiment ?",
            detail: "`EXISTS ma:cle` puis `TYPE ma:cle` : une erreur `WRONGTYPE` signifie qu'on applique une commande de liste à un string, par exemple.",
          },
          {
            title: "A-t-elle expiré ?",
            detail: "`TTL ma:cle` : `-2` = la clé n'existe pas (ou plus). Un TTL plus court que prévu explique les disparitions mystérieuses.",
          },
          {
            title: "Que reçoit le serveur ?",
            detail: "`redis-cli MONITOR` pendant la reproduction du bug : on voit exactement les commandes envoyées par l'application.",
          },
          {
            title: "La mémoire est-elle pleine ?",
            detail: "`INFO memory` : si `used_memory` touche `maxmemory`, les écritures échouent ou les clés sont évincées selon la politique configurée.",
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
      "Trois projets pour ancrer la pratique, du plus simple au plus complet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cache de page",
            detail: "Prenez une page lente de votre application (ou un script qui simule un calcul coûteux) et mettez son résultat en cache avec un TTL de 60 secondes. Mesurez le temps de réponse avant/après.",
          },
          {
            title: "Compteur de visites temps réel",
            detail: "Un endpoint qui incrémente `INCR stats:visites:<page>` à chaque appel et renvoie le total. Ajoutez une expiration glissante pour des statistiques par heure.",
          },
          {
            title: "Mini file de tâches",
            detail: "Un producteur `LPUSH taches ...`, un worker `BRPOP taches 0` qui traite les éléments un par un. Puis ajoutez un leaderboard `ZADD`/`ZREVRANGE` par-dessus.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "strings-en-detail",
    title: "Strings en détail",
    level: 3,
    intro:
      "Le type le plus simple, et le plus utilisé : texte, nombres, et opérations atomiques.",
    blocks: [
      {
        kind: "text",
        text: "Un string Redis stocke du texte ou des nombres (jusqu'à 512 Mo, mais gardez les valeurs petites). Au-delà de `SET`/`GET` : `APPEND` concatène, `STRLEN` donne la longueur, `GETRANGE` extrait une sous-chaîne, `MSET`/`MGET` écrivent et lisent plusieurs clés en un aller-retour.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Opérations sur les strings",
        code: "MSET user:1:name \"Akane\" user:1:role \"admin\"\nMGET user:1:name user:1:role\nSET stock:article42 100\nDECRBY stock:article42 3\nSETNX verrou:job \"1\"",
      },
      {
        kind: "text",
        text: "`SETNX` (ou `SET ... NX`) n'écrit que si la clé n'existe pas : la brique de base des verrous distribués. `DECRBY` décrémente atomiquement — utile pour gérer un stock sans race condition.",
      },
    ],
  },
  {
    id: "hashes",
    title: "Hashes : les objets à champs",
    level: 3,
    intro:
      "Stocker un objet structuré sans sérialiser tout le document à chaque lecture.",
    blocks: [
      {
        kind: "text",
        text: "Un hash associe une clé à un ensemble de paires champ/valeur : `HSET user:7 nom \"Akane\" email \"a@ex.com\"`. On peut lire un seul champ (`HGET`), tous (`HGETALL`), ou incrémenter un champ numérique (`HINCRBY user:7 visites 1`).",
      },
      {
        kind: "text",
        text: "Pourquoi préférer un hash à un string JSON : on modifie un champ sans réécrire tout l'objet, et on ne transfère que les champs lus. En contrepartie, pas de TTL par champ (le TTL s'applique à tout le hash) et pas d'imbrication.",
      },
    ],
  },
  {
    id: "lists",
    title: "Lists : files et piles",
    level: 3,
    intro:
      "Des listes ordonnées qui servent de files d'attente, de piles et d'historiques.",
    blocks: [
      {
        kind: "text",
        text: "`LPUSH`/`RPUSH` ajoutent à gauche/droite, `LPOP`/`RPOP` retirent. `BRPOP key 0` bloque jusqu'à ce qu'un élément soit disponible : c'est le mécanisme d'une file de tâches simple — le worker attend sans consommer de CPU.",
      },
      {
        kind: "code",
        language: "bash",
        title: "File de tâches minimale",
        code: "# Producteur\nLPUSH emails:queue \"{\\\"to\\\":\\\"a@ex.com\\\"}\"\n# Worker (bloque en attendant du travail)\nBRPOP emails:queue 0\n# Historique des 10 dernières actions\nLPUSH user:7:actions \"login\"\nLTRIM user:7:actions 0 9",
      },
      {
        kind: "text",
        text: "`LTRIM` garde une liste à taille bornée : parfait pour les historiques récents. Pour des files à plus fort volume ou avec accusés de réception, les Streams sont l'étape suivante.",
      },
    ],
  },
  {
    id: "sets",
    title: "Sets : ensembles uniques",
    level: 3,
    intro:
      "Des collections sans doublons, avec les opérations ensemblistes calculées côté serveur.",
    blocks: [
      {
        kind: "text",
        text: "`SADD tags \"redis\" \"cache\"` ajoute sans doublon, `SISMEMBER` teste l'appartenance en temps constant, `SMEMBERS` liste tout. Les opérations `SINTER` (intersection), `SUNION` (union) et `SDIFF` (différence) combinent plusieurs sets côté serveur.",
      },
      {
        kind: "text",
        text: "Usages typiques : tags d'articles, abonnés uniques, adresses IP vues aujourd'hui. « Utilisateurs ayant à la fois le tag A et le tag B » devient un simple `SINTER` — pas de boucle applicative.",
      },
    ],
  },
  {
    id: "sorted-sets",
    title: "Sorted Sets : classements et priorités",
    level: 3,
    intro:
      "Chaque membre a un score : Redis maintient l'ordre pour vous.",
    blocks: [
      {
        kind: "text",
        text: "`ZADD leaderboard 1500 \"joueur1\"` associe un score à un membre. `ZRANGE` liste par score croissant, `ZREVRANGE` décroissant, `ZRANK`/`ZREVRANK` donnent le rang d'un membre, `ZINCRBY` ajuste un score atomiquement.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Leaderboard",
        code: "ZADD game:scores 1500 \"akane\" 2300 \"diavolana\"\nZINCRBY game:scores 100 \"akane\"\nZREVRANGE game:scores 0 2 WITHSCORES\nZREVRANK game:scores \"akane\"",
      },
      {
        kind: "text",
        text: "Au-delà des jeux : files à priorité (le score = la priorité), événements planifiés (le score = le timestamp, on traite tout ce qui est dû avec `ZRANGEBYSCORE`), fenêtres glissantes pour le rate limiting.",
      },
    ],
  },
  {
    id: "streams",
    title: "Streams : journaux d'événements",
    level: 3,
    intro:
      "Le type le plus récent : un log append-only avec groupes de consommateurs.",
    blocks: [
      {
        kind: "text",
        text: "Un stream est une séquence d'entrées horodatées : `XADD events * user 7 action login` ajoute une entrée (l'ID `*` est généré par Redis). `XREAD` lit les nouvelles entrées, `XRANGE` parcourt l'historique.",
      },
      {
        kind: "text",
        text: "La vraie puissance vient des groupes de consommateurs : `XREADGROUP` distribue les messages entre plusieurs workers, avec suivi des messages non acquittés (`XPENDING`) et réclamation (`XCLAIM`) en cas de panne d'un worker. C'est le socle pour de l'event sourcing ou des pipelines de traitement fiables — là où une simple liste perdrait des messages si un worker meurt en cours de traitement.",
      },
    ],
  },
  {
    id: "structures-specialisees",
    title: "Structures spécialisées",
    level: 3,
    intro:
      "Trois types probabilistes ou géospatiaux pour des problèmes précis, avec une mémoire minuscule.",
    blocks: [
      {
        kind: "table",
        headers: ["Structure", "Commandes", "Usage"],
        rows: [
          ["HyperLogLog", "`PFADD`, `PFCOUNT`", "Compter des éléments uniques (visiteurs) avec ~12 Ko quelle que soit la cardinalité, au prix d'une petite erreur d'approximation"],
          ["Bitmaps", "`SETBIT`, `GETBIT`, `BITCOUNT`", "Présence/absence par jour ou par utilisateur : rétention, cohortes, feature flags"],
          ["Geo", "`GEOADD`, `GEOSEARCH`", "Coordonnées géographiques : trouver les points d'intérêt proches d'une position"],
        ],
      },
      {
        kind: "code",
        language: "bash",
        title: "Exemples",
        code: "PFADD visiteurs:2026-09-29 \"user1\" \"user2\" \"user1\"\nPFCOUNT visiteurs:2026-09-29\nSETBIT actif:2026-09-29 7 1\nGEOADD villes 2.35 48.85 \"paris\" 18.07 -1.29 \"nairobi\"",
      },
      {
        kind: "text",
        text: "Point commun : ces structures échangent un peu de précision ou de généralité contre une efficacité mémoire spectaculaire. Ne les utilisez que quand le problème correspond exactement — un HyperLogLog ne peut pas lister les éléments comptés.",
      },
    ],
  },
  {
    id: "transactions",
    title: "Transactions : MULTI/EXEC",
    level: 3,
    intro:
      "Exécuter plusieurs commandes comme un tout, sans entrelacement.",
    blocks: [
      {
        kind: "text",
        text: "`MULTI` démarre la transaction, les commandes sont mises en file, `EXEC` les exécute toutes d'un coup — aucune autre commande client ne s'intercale. `DISCARD` annule. Attention : ce n'est pas une transaction au sens SQL — si une commande échoue à l'exécution, les autres sont quand même appliquées, il n'y a pas de rollback.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Transaction et exécution conditionnelle",
        code: "MULTI\nINCR compteur\nSET statut \"ok\"\nEXEC\n# Exécution conditionnelle (optimistic locking)\nWATCH solde:akane\n# ... lecture, calcul ...\nMULTI\nDECRBY solde:akane 50\nEXEC",
      },
      {
        kind: "text",
        text: "`WATCH` rend `EXEC` conditionnel : si une clé surveillée a changé entre-temps, la transaction est abandonnée (EXEC renvoie `nil`). C'est le verrouillage optimiste — à réessayer en boucle côté application en cas d'échec.",
      },
    ],
  },
  {
    id: "pipelines",
    title: "Pipelines",
    level: 3,
    intro:
      "Réduire les allers-retours réseau : le gain de performance le plus simple.",
    blocks: [
      {
        kind: "text",
        text: "Chaque commande Redis coûte un aller-retour réseau. Le pipelining envoie N commandes d'un coup et lit N réponses : pour 1000 écritures, on passe de 1000 allers-retours à un seul. Le gain est massif sur les imports et les traitements par lots.",
      },
      {
        kind: "text",
        text: "Différence avec les transactions : le pipeline n'est pas atomique (les commandes d'autres clients peuvent s'intercaler) — il ne sert qu'à la performance. Toutes les bibliothèques clientes proposent une API de pipeline : en Python, `pipe = r.pipeline(); pipe.set(...); pipe.execute()`.",
      },
    ],
  },
  {
    id: "scripts-lua",
    title: "Scripts Lua",
    level: 3,
    intro:
      "Quand ni les transactions ni les pipelines ne suffisent : exécuter du code côté serveur.",
    blocks: [
      {
        kind: "text",
        text: "`EVAL \"return redis.call('GET', KEYS[1])\" 1 ma:cle` exécute un script Lua directement dans Redis, de façon atomique. Cas d'usage : une logique lire-vérifier-écrire trop complexe pour `WATCH`, mais qui doit rester sans race condition.",
      },
      {
        kind: "text",
        text: "Règles de prudence : les scripts doivent être déterministes et rapides — un script lent bloque tout le serveur (Redis est mono-thread pour les commandes). Préférez toujours une commande native quand elle existe ; réservez Lua aux cas réellement atomiques et complexes, et gardez les scripts courts.",
      },
    ],
  },
  {
    id: "pub-sub",
    title: "Publish/Subscribe",
    level: 3,
    intro:
      "La messagerie temps réel intégrée : simple, mais avec des limites à connaître.",
    blocks: [
      {
        kind: "text",
        text: "`SUBSCRIBE alertes` écoute un canal, `PUBLISH alertes \"panne\"` diffuse à tous les abonnés connectés. `PSUBSCRIBE logs:*` s'abonne à un motif. C'est idéal pour les notifications temps réel : invalidation de cache entre instances, diffusion d'événements aux websockets.",
      },
      {
        kind: "text",
        text: "Limite fondamentale : le pub/sub Redis est fire-and-forget — un abonné déconnecté au moment de la publication ne recevra jamais le message. Pour une messagerie fiable avec persistance et rejeu, utilisez les Streams, pas le pub/sub.",
      },
    ],
  },
  {
    id: "persistance-rdb-aof",
    title: "Persistance : RDB vs AOF",
    level: 3,
    intro:
      "Deux mécanismes pour survivre à un redémarrage, avec des compromis différents.",
    blocks: [
      {
        kind: "table",
        headers: ["", "RDB (snapshot)", "AOF (journal)"],
        rows: [
          ["Principe", "Sauvegarde binaire complète à intervalles (`save 60 1000` = si 1000 écritures en 60 s)", "Journalise chaque écriture, rejoué au redémarrage"],
          ["Perte de données", "Toutes les écritures depuis le dernier snapshot", "Configurable : chaque seconde (`appendfsync everysec`) par défaut, voire chaque écriture"],
          ["Taille / démarrage", "Fichier compact, redémarrage rapide", "Fichier plus volumineux, redémarrage plus lent"],
          ["Usage", "Sauvegardes, réplication initiale", "Durabilité en production"],
        ],
      },
      {
        kind: "text",
        text: "En production, on active généralement les deux : l'AOF pour la durabilité, le RDB pour des sauvegardes compactes et des redémarrages rapides. `BGSAVE` et `BGREWRITEAOF` déclenchent ces opérations en arrière-plan sans bloquer le serveur.",
      },
    ],
  },
  {
    id: "replication",
    title: "Réplication",
    level: 3,
    intro:
      "Un primaire, des répliques : distribuer les lectures et préparer la bascule.",
    blocks: [
      {
        kind: "text",
        text: "Une réplique suit un primaire avec `REPLICAOF <hôte> <port>` : elle reçoit toutes les écritures de façon asynchrone. Les lectures peuvent être réparties sur les répliques pour soulager le primaire. En cas de panne du primaire, une réplique peut être promue — manuellement, ou automatiquement avec Sentinel.",
      },
      {
        kind: "text",
        text: "Point de vigilance : la réplication est asynchrone par défaut. Une écriture confirmée par le primaire peut être perdue si le primaire meurt avant de la propager. `WAIT` permet d'attendre la réplication sur un nombre de répliques quand la durabilité l'exige — au prix de la latence.",
      },
    ],
  },
  {
    id: "haute-disponibilite",
    title: "Haute disponibilité : Sentinel et Cluster",
    level: 3,
    intro:
      "Deux architectures pour deux problèmes différents : la bascule automatique et le partitionnement.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Sentinel", "Cluster"],
        rows: [
          ["Problème résolu", "Bascule automatique si le primaire tombe", "Dépasser la RAM d'une seule machine"],
          ["Données", "Chaque nœud a toutes les données (réplication complète)", "Données partitionnées en 16384 slots répartis sur les nœuds"],
          ["Écritures", "Un seul primaire", "Écritures réparties sur les primaires de chaque shard"],
          ["Complexité client", "Le client doit suivre le primaire courant", "Le client doit supporter le protocole cluster (redirections)"],
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : commencez par une instance simple avec persistance et sauvegardes. Ajoutez Sentinel quand une bascule manuelle devient inacceptable. N'adoptez le Cluster que quand la volumétrie l'exige — il impose des contraintes (pas de transactions multi-clés sur des slots différents, par exemple).",
      },
    ],
  },
  {
    id: "politiques-eviction",
    title: "Politiques d'éviction",
    level: 3,
    intro:
      "Quand la mémoire est pleine : que sacrifier, et selon quelle règle.",
    blocks: [
      {
        kind: "text",
        text: "Quand `used_memory` atteint `maxmemory`, Redis doit choisir : rejeter les écritures (`noeviction`, le défaut — les écritures échouent) ou évincer des clés selon une politique. Le choix dépend de l'usage : un cache pur utilise `allkeys-lru` (évincer les clés les moins récemment utilisées) ou `allkeys-lfu` ; un usage mixte cache + données persistantes utilise `volatile-lru` (seulement les clés avec TTL).",
      },
      {
        kind: "list",
        items: [
          "`allkeys-lru` / `allkeys-lfu` : éviction parmi toutes les clés — pour un cache pur.",
          "`volatile-lru` / `volatile-lfu` / `volatile-ttl` : éviction seulement parmi les clés avec expiration — protège les données sans TTL.",
          "`noeviction` : les écritures échouent quand la mémoire est pleine — pour quand aucune perte n'est acceptable.",
          "Surveillez `INFO stats` (`evicted_keys`) : une éviction massive et constante signale un `maxmemory` trop bas ou des TTL trop longs.",
        ],
      },
    ],
  },
  {
    id: "memoire",
    title: "Comprendre la mémoire",
    level: 3,
    intro:
      "Redis est rapide parce qu'il est en RAM : il faut savoir où part cette RAM.",
    blocks: [
      {
        kind: "text",
        text: "`INFO memory` détaille l'usage : `used_memory_human`, le pic (`used_memory_peak_human`), et le ratio de fragmentation (`mem_fragmentation_ratio` — au-dessus de 1.5, la mémoire est fragmentée). `MEMORY USAGE ma:cle` donne le coût d'une clé, `OBJECT ENCODING ma:cle` révèle l'encodage interne.",
      },
      {
        kind: "text",
        text: "Leviers concrets : les petits hashes avec peu de champs utilisent un encodage compact (`ziplist`/`listpack`) — préférez beaucoup de petits hashes à peu de gros. Les clés courtes coûtent moins cher. Et surtout : chaque clé a un surcoût fixe (~100 octets) — un million de petites clés pèse plus lourd qu'on ne l'imagine.",
      },
    ],
  },
  {
    id: "acl-securite",
    title: "Sécurité : ACL et durcissement",
    level: 3,
    intro:
      "Au-delà du mot de passe : limiter ce que chaque client peut faire.",
    blocks: [
      {
        kind: "text",
        text: "Les ACL (Redis 6+) créent des utilisateurs aux droits fins : `ACL SETUSER app on >motdepasse +@all -@dangerous ~cache:*` donne à `app` toutes les commandes sauf les dangereuses (`FLUSHDB`, `CONFIG`…), uniquement sur les clés `cache:*`. Chaque service applicatif devrait avoir son propre utilisateur avec le minimum de droits.",
      },
      {
        kind: "list",
        items: [
          "Ne jamais exposer Redis sur Internet sans `requirepass` ou ACL : les scans du port 6379 sont permanents.",
          "`bind` sur les interfaces strictement nécessaires ; idéalement, Redis n'écoute que sur le réseau privé.",
          "Désactiver ou renommer les commandes dangereuses (`FLUSHALL`, `CONFIG`, `DEBUG`) via `rename-command` si les ACL ne suffisent pas.",
          "Chiffrer les communications sensibles avec TLS (`tls-port`) quand Redis traverse un réseau non fiable.",
          "Protéger le fichier `redis.conf` et les dumps RDB/AOF comme des secrets : ils contiennent les données.",
        ],
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    level: 3,
    intro:
      "Les indicateurs qui disent si Redis va bien — avant que les utilisateurs s'en plaignent.",
    blocks: [
      {
        kind: "fields",
        title: "Métriques à surveiller",
        fields: [
          {
            label: "Hit rate (`keyspace_hits` / `keyspace_misses`)",
            value:
              "La part de lectures servies par le cache. Un hit rate qui chute signifie des clés manquantes, des TTL trop courts ou un cache trop petit.",
          },
          {
            label: "Mémoire (`used_memory`, `mem_fragmentation_ratio`)",
            value:
              "Proche de `maxmemory` = évictions ou erreurs d'écriture imminentes. Fragmentation élevée = mémoire gaspillée.",
          },
          {
            label: "Commandes lentes (`SLOWLOG GET`)",
            value:
              "Les commandes dépassant `slowlog-log-slower-than` (10 ms par défaut). `KEYS *` en production y apparaît immédiatement.",
          },
          {
            label: "Clients et rejets (`connected_clients`, `rejected_connections`)",
            value:
              "Des connexions rejetées signalent `maxclients` atteint — souvent des fuites de connexions côté application.",
          },
          {
            label: "Réplication (`master_link_status`, `master_last_io_seconds_ago`)",
            value:
              "Sur les répliques : un lien rompu ou un retard qui grandit annonce une bascule ou une perte de données.",
          },
        ],
      },
    ],
  },
  {
    id: "pattern-cache-aside",
    title: "Pattern : cache-aside en profondeur",
    level: 3,
    intro:
      "Le pattern de cache le plus courant, avec ses variantes et ses pièges.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Cache-aside avec redis-py",
        code: "import redis, json\n\nr = redis.Redis(host=\"localhost\", port=6379, decode_responses=True)\n\ndef get_produit(pid: int):\n    key = f\"produit:{pid}\"\n    cached = r.get(key)\n    if cached:\n        return json.loads(cached)  # HIT : pas de requête base\n    produit = db.query_produit(pid)  # MISS : la base travaille\n    r.set(key, json.dumps(produit), ex=300)\n    return produit",
      },
      {
        kind: "text",
        text: "Variantes : le read-through délègue le remplissage au cache lui-même ; le write-through écrit en base ET en cache simultanément (données toujours fraîches, écritures plus lentes) ; le write-behind écrit d'abord en cache puis en base de façon asynchrone (rapide, mais risque de perte). Le cache-aside reste le défaut raisonnable : simple, et la base reste la source de vérité.",
      },
    ],
  },
  {
    id: "invalidation-cache",
    title: "Invalidation du cache",
    level: 3,
    intro:
      "Le problème difficile du cache : quand les données changent, comment l'oublier proprement.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Principe", "Quand l'utiliser"],
        rows: [
          ["TTL court", "Laisser expirer naturellement", "Données peu critiques, mises à jour fréquentes"],
          ["Invalidation explicite", "`DEL cache:produit:42` à chaque écriture en base", "Données critiques qui doivent être fraîches"],
          ["Versioning de clé", "`produit:42:v3` — on change de clé au lieu d'invalider", "Évite les suppressions en cascade, mais laisse des clés orphelines"],
          ["Pub/sub d'invalidation", "Publier sur un canal, chaque instance purge son cache", "Caches locaux multiples à synchroniser"],
        ],
      },
      {
        kind: "text",
        text: "Piège classique : invalider `produit:42` mais oublier `liste:produits` qui contient les mêmes données. Listez tous les endroits où une donnée est mise en cache avant de choisir la stratégie — un cache partiellement invalidé est pire qu'aucun cache.",
      },
    ],
  },
  {
    id: "rate-limiting",
    title: "Pattern : rate limiting",
    level: 3,
    intro:
      "Limiter les abus d'API avec un compteur et une fenêtre glissante.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Fenêtre fixe (simple)",
        code: "# Chaque requête :\nINCR ratelimit:client42\nEXPIRE ratelimit:client42 60\n# Si le compteur dépasse 100 → répondre 429",
      },
      {
        kind: "text",
        text: "La fenêtre fixe est simple mais autorise des rafales à cheval sur deux fenêtres. La variante robuste utilise un sorted set : `ZADD` avec le timestamp comme score, `ZREMRANGEBYSCORE` pour purger le passé, `ZCARD` pour compter la fenêtre glissante. Précis, au prix de quelques commandes de plus.",
      },
    ],
  },
  {
    id: "verrous-distribues",
    title: "Pattern : verrous distribués",
    level: 3,
    intro:
      "S'assurer qu'une tâche ne s'exécute qu'une fois, même avec plusieurs workers.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Acquisition et libération sûre",
        code: "# Acquérir : pose le verrou seulement s'il n'existe pas, avec expiration\nSET verrou:rapport \"worker1\" NX PX 30000\n# Libérer : UNIQUEMENT si on est le détenteur (script Lua)\n# if redis.call(\"GET\", KEYS[1]) == ARGV[1] then\n#   return redis.call(\"DEL\", KEYS[1])\n# end",
      },
      {
        kind: "text",
        text: "Trois règles non négociables : toujours un TTL (un worker qui meurt ne doit pas bloquer le verrou pour toujours), toujours un identifiant unique de détenteur (on ne libère que son propre verrou), et la libération doit être atomique (script Lua, pas GET puis DEL séparés). Pour des besoins critiques, des bibliothèques comme Redlock implémentent l'algorithme complet — ne réinventez pas le vôtre sans raison.",
      },
    ],
  },
  {
    id: "classements-leaderboards",
    title: "Pattern : classements et files à priorité",
    level: 3,
    intro:
      "Ce que les sorted sets font mieux que n'importe quelle requête SQL.",
    blocks: [
      {
        kind: "text",
        text: "Leaderboard : `ZADD` à chaque score, `ZREVRANGE ... WITHSCORES` pour le top N, `ZREVRANK` pour la position d'un joueur — le tout en temps logarithmique, sans tri applicatif. File à priorité : le score est la priorité, `ZPOPMIN` dépile l'élément le plus prioritaire.",
      },
      {
        kind: "text",
        text: "Planificateur de tâches différées : le score est le timestamp d'exécution, un worker récupère périodiquement `ZRANGEBYSCORE taches 0 <maintenant>` puis supprime les tâches traitées. Simple, robuste, sans cron distribué.",
      },
    ],
  },
  {
    id: "files-de-taches",
    title: "Pattern : files de tâches",
    level: 3,
    intro:
      "De la liste bloquante au stream fiable : choisir selon les garanties requises.",
    blocks: [
      {
        kind: "table",
        headers: ["", "List + BRPOP", "Stream + groupes"],
        rows: [
          ["Garantie", "Au mieux une fois : si le worker meurt après le POP, le message est perdu", "Au moins une fois : les messages non acquittés sont visibles et réclamables"],
          ["Multi-workers", "Distribution basique, pas de suivi", "Distribution avec suivi par consommateur"],
          ["Historique", "Non : dépilé = disparu", "Oui : le journal reste consultable"],
          ["Complexité", "Minimale", "Plus élevée (groupes, acquittements)"],
        ],
      },
      {
        kind: "text",
        text: "Commencez par les listes pour les tâches idempotentes et non critiques (envoi d'emails avec retry applicatif). Passez aux streams quand la perte d'un message est inacceptable ou quand il faut suivre précisément qui traite quoi.",
      },
    ],
  },
  {
    id: "testing",
    title: "Tester avec Redis",
    level: 3,
    intro:
      "Des tests déterministes sans dépendre d'un serveur partagé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Règle de base : les tests n'écrivent jamais dans le Redis de développement — un `FLUSHDB` oublié dans un test est un incident.",
          "Lancez un Redis dédié aux tests (conteneur éphémère sur un port distinct, base `SELECT 15` réservée aux tests), vidé avant chaque suite.",
          "Préfixez les clés de test (`test:`) et nettoyez avec `DEL` ciblé plutôt que `FLUSHDB`, pour ne pas impacter d'autres suites en parallèle.",
          "Testez les TTL avec des durées courtes et des attentes explicites — pas avec des `sleep` arbitraires fragiles.",
          "Pour les tests unitaires purs, des doubles comme `fakeredis` (bibliothèque Python réelle) émulent Redis en mémoire sans serveur.",
          "Mesurez la charge avec `redis-benchmark -q` pour valider qu'un pattern tient le volume attendu avant la production.",
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand les premiers réflexes ne suffisent pas : voir ce que Redis fait vraiment.",
    blocks: [
      {
        kind: "fields",
        title: "Boîte à outils",
        fields: [
          {
            label: "`MONITOR`",
            value:
              "Affiche chaque commande reçue en temps réel. Puissant pour comprendre le comportement d'une application, mais coûteux : à n'utiliser que ponctuellement, jamais en continu en production.",
          },
          {
            label: "`SLOWLOG GET 10`",
            value:
              "Les 10 commandes les plus lentes récentes. Un `KEYS`, un `HGETALL` sur un énorme hash ou un script Lua trop long s'y repèrent immédiatement.",
          },
          {
            label: "`CLIENT LIST`",
            value:
              "Liste les connexions : âge, dernière commande, état. Permet de repérer les clients bloqués (ex. en `BRPOP`) ou les fuites de connexions.",
          },
          {
            label: "`--latency-history` / `--stat`",
            value:
              "`redis-cli --latency-history` suit la latence dans le temps ; `--stat` donne un tableau de bord temps réel (commandes/s, mémoire, clients).",
          },
          {
            label: "`DEBUG OBJECT` / `MEMORY DOCTOR`",
            value:
              "Diagnostic mémoire : encodage, fragmentation, recommandations. `MEMORY DOCTOR` produit un rapport lisible des problèmes détectés.",
          },
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    level: 3,
    intro:
      "Redis est rapide par défaut ; voici ce qui le ralentit vraiment.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le facteur dominant est le nombre d'allers-retours réseau : utilisez les pipelines et `MGET`/`MSET` pour les opérations en masse.",
          "Évitez les commandes bloquantes ou en O(N) sur de grosses clés : `KEYS *`, `HGETALL` sur un hash géant, `SMEMBERS` sur un set immense — préférez `SCAN`, `HSCAN`, `SSCAN` (itératifs, non bloquants).",
          "Gardez les valeurs petites : une valeur de plusieurs mégaoctets bloque le thread unique pendant son transfert.",
          "Les scripts Lua et les transactions longues bloquent tout le serveur : courts et déterministes, toujours.",
          "La persistance AOF `appendfsync always` divise le débit : `everysec` est le compromis standard.",
          "Mesurez avant d'optimiser : `redis-benchmark` et `--latency-history` donnent des chiffres, les intuitions donnent des erreurs.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "`KEYS *` en production",
            value:
              "Problème : la commande bloque le serveur le temps de parcourir toutes les clés. Solution : `SCAN` itératif, qui ne bloque pas.",
          },
          {
            label: "Oublier le TTL",
            value:
              "Problème : des clés de cache sans expiration s'accumulent jusqu'à saturer la mémoire. Solution : toujours un TTL sur les données de cache, dès l'écriture.",
          },
          {
            label: "`WRONGTYPE`",
            value:
              "Problème : appliquer une commande de liste à un string, par exemple. Cause : deux parties du code utilisent la même clé avec des types différents. Solution : convention de nommage stricte (`cache:`, `session:`, `queue:`).",
          },
          {
            label: "Utiliser Redis comme base principale sans persistance",
            value:
              "Problème : un redémarrage efface tout. Solution : si les données doivent survivre, activez AOF (+ RDB) et testez la restauration.",
          },
          {
            label: "Stocker des sessions sans renouveler le TTL",
            value:
              "Problème : les utilisateurs actifs sont déconnectés quand le TTL initial expire. Solution : réécrire la clé (ou `EXPIRE`) à chaque requête.",
          },
          {
            label: "Verrou sans TTL",
            value:
              "Problème : un worker qui plante laisse un verrou éternel, tout le système se fige. Solution : toujours `PX` à l'acquisition, toujours.",
          },
          {
            label: "Sérialisation incohérente",
            value:
              "Problème : écrire du JSON d'un côté, lire du brut de l'autre. Solution : `decode_responses=True` (ou équivalent) et un format unique, documenté.",
          },
          {
            label: "Ignorer l'éviction",
            value:
              "Problème : `noeviction` par défaut fait échouer les écritures quand la mémoire est pleine. Solution : choisir une politique adaptée à l'usage dès la configuration.",
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
          "Nommage : préfixez les clés par domaine (`cache:`, `session:`, `queue:`, `lock:`) — c'est votre seul schéma.",
          "TTL par défaut : toute donnée de cache naît avec une expiration ; l'absence de TTL doit être un choix explicite.",
          "Sécurité : mot de passe ou ACL, `bind` restreint, jamais d'exposition directe sur Internet.",
          "Persistance : AOF activé en production si les données comptent ; sauvegardes RDB régulières et restauration testée.",
          "Mémoire : `maxmemory` toujours défini, politique d'éviction choisie consciemment.",
          "Clients : une bibliothèque maintenue, connexions en pool, timeouts configurés.",
          "Monitoring : hit rate, mémoire, slowlog et réplication surveillés en continu.",
          "Documentation : les patterns utilisés (clés, TTL, invalidation) documentés à côté du code qui les utilise.",
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
            label: "Documentation Redis",
            value:
              "redis.io/docs/latest : guide, référence de chaque commande avec exemples, et sections persistance, réplication, cluster.",
          },
          {
            label: "Référence des commandes",
            value:
              "La page des commandes (redis.io/docs/latest/commands/) : la syntaxe exacte, la complexité temporelle et les notes de version de chaque commande.",
          },
          {
            label: "RedisInsight",
            value:
              "L'outil graphique officiel pour explorer et comprendre visuellement ce que contient votre instance.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les patterns de cette page (cache, files, verrous) réimplémentés sur votre propre projet, avec mesures avant/après.",
          "Communauté : le forum et le Discord Redis pour les questions d'architecture ; les issues GitHub pour les bugs avérés.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Redis maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "`sql` : la base de données durable que Redis soulage — comprendre le duo cache + source de vérité.",
          "`messaging` : la messagerie durable et distribuée, quand les streams Redis ne suffisent plus.",
          "`docker` : conteneuriser Redis proprement — volumes pour la persistance, réseaux, healthchecks.",
          "`javascript` ou `python` : intégrer Redis dans une vraie application (pools, reconnexions, erreurs).",
          "`deployment` : mettre Redis en production — persistance, supervision, cache HTTP en frontal.",
          "Revenir à la roadmap : valider Redis et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

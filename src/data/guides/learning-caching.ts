import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Caching : stratégies, Redis, invalidation,
 * cache HTTP et pièges de la fraîcheur des données.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_CACHING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que le cache apporte : vitesse et charge réduite, au prix de la fraîcheur.",
    blocks: [
      {
        kind: "text",
        text: "Un cache stocke le résultat d'un calcul coûteux (requête SQL, appel API, rendu) pour le resservir instantanément. Chaque cache répond à la même question : combien de temps cette donnée reste-t-elle valable ? C'est le TTL (time to live) — le paramètre central de tout le caching.",
      },
      {
        kind: "diagram",
        title: "Le principe en une image",
        lines: [
          "CLIENT ──► CACHE ──► SOURCE (base, API)",
          "  │         │",
          "  │   HIT : réponse immédiate",
          "  │         │",
          "  │   MISS : le cache interroge la source,",
          "  │         stocke la réponse, puis la sert.",
        ],
      },
      {
        kind: "text",
        text: "Deux métriques jugent un cache : le taux de hit (part des requêtes servies sans la source) et la fraîcheur (les données servies sont-elles à jour ?). Tout le reste — stratégies, invalidation, dimensionnement — sert à arbitrer entre ces deux objectifs.",
      },
    ],
  },
  {
    id: "ou-mettre-un-cache",
    title: "Où mettre un cache",
    level: 1,
    intro:
      "Le cache existe à chaque couche : navigateur, CDN, application, base.",
    blocks: [
      {
        kind: "table",
        headers: ["Couche", "Ce qu'on y met", "Exemple"],
        rows: [
          ["Navigateur", "Assets, réponses HTTP", "Cache-Control, ETag"],
          ["CDN", "Pages et assets au plus près de l'utilisateur", "Cloudflare, Fastly"],
          ["Application", "Résultats de requêtes, sessions", "Redis, mémoire"],
          ["Base de données", "Plans de requêtes, pages", "Cache interne du SGBD"],
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : cachez au plus près du consommateur et invalidez au plus près de la source. Cette Learning Page se concentre sur le cache applicatif (Redis) et le cache HTTP — les deux leviers les plus rentables pour un développeur backend.",
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
      "Les bases nécessaires avant de mettre en cache.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut maîtriser avant",
        fields: [
          {
            label: "API REST : requêtes et réponses",
            value:
              "Comprendre le cycle requête → traitement → réponse : le cache s'insère entre le traitement et la réponse.",
          },
          {
            label: "Bases de données : requêtes",
            value:
              "Savoir quelle requête est coûteuse : on ne met en cache que ce qui coûte (mesurez d'abord).",
          },
          {
            label: "Python : décorateurs et contextes",
            value:
              "Les caches applicatifs s'écrivent souvent comme des décorateurs autour des fonctions coûteuses.",
          },
          {
            label: "Terminal",
            value:
              "Lancer Redis en local, interroger avec `redis-cli`, observer les clés et leur TTL.",
          },
        ],
      },
    ],
  },
  {
    id: "installer-redis",
    title: "Installer Redis",
    level: 2,
    intro:
      "Redis : le magasin clé-valeur en mémoire, standard du cache applicatif.",
    blocks: [
      {
        kind: "command",
        label: "Lancer Redis avec Docker",
        command: "docker run -d --name redis-cache -p 6379:6379 redis:7",
        why: "Redis tourne en mémoire : lecture/écriture en microsecondes. Le conteneur officiel suffit pour le développement — aucune configuration nécessaire pour débuter.",
        verify: "docker exec redis-cache redis-cli ping",
      },
      {
        kind: "command",
        label: "Installer le client Python",
        command: "pip install redis",
        why: "Le client officiel `redis-py` : commandes Redis exposées comme des méthodes Python, support des pipelines et du mode async.",
        verify: "pip show redis",
      },
    ],
  },
  {
    id: "premiers-pas-redis-cli",
    title: "Premiers pas avec redis-cli",
    level: 2,
    intro:
      "Les cinq commandes qui couvrent 80 % des usages de cache.",
    blocks: [
      {
        kind: "command",
        label: "Stocker avec expiration",
        command: "docker exec -it redis-cache redis-cli SET article:42 '{\"title\":\"Bonjour\"}' EX 300",
        why: "`SET` + `EX 300` : la clé expire après 300 secondes. L'expiration est le mécanisme de fraîcheur le plus simple — toute donnée en cache doit en avoir une.",
        verify: "docker exec redis-cache redis-cli TTL article:42",
      },
      {
        kind: "command",
        label: "Lire et vérifier l'existence",
        command: "docker exec redis-cache redis-cli GET article:42",
        why: "`GET` retourne la valeur ou rien (`nil`) si absente ou expirée : c'est ce `nil` qui déclenche le rechargement depuis la source (cache miss).",
      },
    ],
  },
  {
    id: "cache-aside",
    title: "Cache-aside : la stratégie de base",
    level: 2,
    intro:
      "L'application gère le cache explicitement : lire, sinon charger et stocker.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Cache-aside avec redis-py",
        code: "import json, redis\n\nr = redis.Redis(decode_responses=True)\n\ndef get_article(article_id: int):\n    key = f\"article:{article_id}\"\n    cached = r.get(key)\n    if cached:  # HIT\n        return json.loads(cached)\n    article = db.fetch_article(article_id)  # MISS : la source\n    r.set(key, json.dumps(article), ex=300)\n    return article",
      },
      {
        kind: "text",
        text: "Cache-aside (lazy loading) : le cache ne se remplit qu'à la demande. Simple, ne stocke que ce qui est demandé — mais le premier appel après expiration paie le coût complet (miss). C'est la stratégie par défaut à maîtriser avant les autres.",
      },
    ],
  },
  {
    id: "ttl-choisir",
    title: "Choisir un TTL",
    level: 2,
    intro:
      "La durée de vie : l'arbitrage entre fraîcheur et performance.",
    blocks: [
      {
        kind: "table",
        headers: ["Donnée", "TTL typique", "Raison"],
        rows: [
          ["Page d'accueil / catalogue", "5–15 min", "Change peu, très consultée"],
          ["Profil utilisateur", "1–5 min", "Modifiable par l'utilisateur"],
          ["Session", "30 min – 8 h", "Sécurité vs confort"],
          ["Résultat de recherche", "1–5 min", "Doit refléter les nouveautés"],
          ["Configuration", "1 h+", "Quasi-statique"],
        ],
      },
      {
        kind: "text",
        text: "Il n'y a pas de TTL universel : partez d'une valeur, mesurez le taux de hit et les plaintes de fraîcheur, ajustez. Un TTL trop long sert des données périmées ; trop court, le cache ne sert à rien.",
      },
    ],
  },
  {
    id: "invalidation-simple",
    title: "Invalidation simple",
    level: 2,
    intro:
      "Supprimer du cache ce qui a changé : la contrepartie du TTL.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Invalider à l'écriture",
        code: "def update_article(article_id: int, data: dict):\n    db.update_article(article_id, data)\n    r.delete(f\"article:{article_id}\")  # le prochain GET rechargera\n    r.delete(\"articles:list:page:*\")    # les listes aussi (voir SCAN)",
      },
      {
        kind: "text",
        text: "Deux philosophies : expiration passive (TTL — simple, fraîcheur bornée) et invalidation active (DELETE à l'écriture — frais, mais il faut penser à tous les endroits). En pratique : TTL partout, invalidation active sur les données critiques (profil, panier, permissions).",
      },
    ],
  },
  {
    id: "cache-http-pratique",
    title: "Cache HTTP en pratique",
    level: 2,
    intro:
      "Les en-têtes qui font travailler le navigateur et les proxys.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Cache-Control avec FastAPI",
        code: "from fastapi import Response\n\n@app.get(\"/articles\")\ndef list_articles(response: Response):\n    response.headers[\"Cache-Control\"] = \"public, max-age=60\"\n    return db.list_articles()\n\n@app.get(\"/me\")\ndef me(response: Response, user=Depends(get_current_user)):\n    response.headers[\"Cache-Control\"] = \"private, no-store\"\n    return user",
      },
      {
        kind: "text",
        text: "`public, max-age=60` : navigateurs et proxys peuvent garder la réponse 60 s. `private, no-store` : données personnelles — aucun cache intermédiaire. Le cache HTTP est gratuit en performance : il ne coûte qu'un en-tête bien choisi.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et outillage",
    level: 2,
    intro:
      "Observer le cache : ce qui est dedans, ce qui expire, ce qui manque.",
    blocks: [
      {
        kind: "fields",
        title: "Configuration recommandée",
        fields: [
          {
            label: "redis-cli",
            value:
              "`KEYS`, `TTL`, `MONITOR` : voir les clés, leur durée restante, et les commandes en temps réel pendant le développement.",
          },
          {
            label: "Métriques applicatives",
            value:
              "Comptez hits et misses (un compteur suffit) : sans mesure, impossible de savoir si le cache sert à quelque chose.",
          },
          {
            label: "DevTools navigateur",
            value:
              "Onglet Réseau : la colonne « Size » indique `(disk cache)` ou `(memory cache)` — vérifiez que vos en-têtes fonctionnent.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-pro",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "Les habitudes d'un caching sain dès le premier jour.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Mesurer avant de cacher",
            detail:
              "Identifiez les requêtes lentes (logs, APM) : on ne met en cache que ce qui coûte. Cacher du rapide ajoute de la complexité pour rien.",
          },
          {
            title: "Toujours un TTL",
            detail:
              "Aucune clé sans expiration : une clé sans TTL est une fuite mémoire qui servira un jour des données fossiles.",
          },
          {
            title: "Nommer les clés",
            detail:
              "Convention `domaine:id:variante` (`article:42`, `articles:list:page:2`) : lisible dans redis-cli, supprimable par motif.",
          },
          {
            title: "Prévoir l'absence",
            detail:
              "Le cache peut disparaître (redémarrage, éviction) : l'application doit fonctionner sans lui, juste plus lentement.",
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
      "Trois projets pour pratiquer chaque facette du cache.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Débutant — Cache d'API",
            value:
              "Ajoutez le cache-aside à une API existante : mesurez la latence avant/après sur la route la plus lente.",
          },
          {
            label: "Intermédiaire — Invalidation complète",
            value:
              "API de blog avec cache des articles et des listes : invalidez précisément à chaque écriture, testez la fraîcheur.",
          },
          {
            label: "Avancé — Sessions + rate limiting",
            value:
              "Sessions Redis avec TTL glissant, rate limiting par token, protection anti-stampede sur la route chaude.",
          },
        ],
      },
    ],
  },
  {
    id: "mesurer-efficacite",
    title: "Mesurer l'efficacité",
    level: 2,
    intro:
      "Hit rate et latence : les deux chiffres qui disent si le cache vaut le coup.",
    blocks: [
      {
        kind: "command",
        label: "Voir les statistiques Redis",
        command: "docker exec redis-cache redis-cli INFO stats | grep -E 'keyspace_hits|keyspace_misses'",
        why: "Redis compte les hits et les misses : `hits / (hits + misses)` = le taux de hit. En dessous de 80 %, le cache est mal dimensionné (TTL trop court, clés trop fragmentées).",
      },
      {
        kind: "command",
        label: "Comparer la latence avec curl",
        command: "curl -o /dev/null -s -w 'Total: %{time_total}s\\n' http://127.0.0.1:8000/articles",
        why: "Mesurez la même route avec cache froid puis chaud : le gain doit être d'un ordre de grandeur (ex. 200 ms → 5 ms) pour justifier la complexité.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "strategies-cache",
    title: "Les stratégies de cache",
    level: 3,
    intro: "Cache-aside, read-through, write-through, write-behind : qui remplit, qui écrit.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Lecture", "Écriture", "Usage"],
        rows: [
          ["Cache-aside", "L'app charge si miss", "L'app invalide", "Défaut — simple, flexible"],
          ["Read-through", "Le cache charge lui-même", "—", "Bibliothèques de cache"],
          ["Write-through", "—", "Cache + source ensemble", "Cohérence forte, écriture lente"],
          ["Write-behind", "—", "Cache d'abord, source après", "Écritures rapides, risque de perte"],
        ],
      },
      {
        kind: "text",
        text: "Cache-aside domine en pratique car l'application garde le contrôle. Write-through/write-behind exigent un cache qui sait écrire dans la source — plus complexe, réservé aux besoins de cohérence ou de débit spécifiques.",
      },
    ],
  },
  {
    id: "structures-redis",
    title: "Structures de données Redis",
    level: 3,
    intro: "Redis n'est pas qu'un clé-valeur : choisir la bonne structure.",
    blocks: [
      {
        kind: "table",
        headers: ["Structure", "Commandes", "Usage cache"],
        rows: [
          ["String", "SET/GET", "Pages, JSON, tokens — 90 % des cas"],
          ["Hash", "HSET/HGET", "Objets à champs (profil, session)"],
          ["List", "LPUSH/LRANGE", "Files, timelines"],
          ["Set", "SADD/SMEMBERS", "Tags, ensembles uniques"],
          ["Sorted Set", "ZADD/ZRANGE", "Classements, files à priorité"],
        ],
      },
      {
        kind: "command",
        label: "Stocker un objet en Hash",
        command: "docker exec redis-cache redis-cli HSET session:abc123 user_id 42 role reader",
        why: "Le Hash stocke les champs séparément : on lit/modifie un champ sans réécrire tout l'objet — idéal pour les sessions.",
        verify: "docker exec redis-cache redis-cli HGETALL session:abc123",
      },
    ],
  },
  {
    id: "expiration-avancee",
    title: "Expiration avancée",
    level: 3,
    intro: "TTL fixe, glissant, probabiliste : affiner la fraîcheur.",
    blocks: [
      {
        kind: "fields",
        title: "Politiques d'expiration",
        fields: [
          {
            label: "TTL fixe",
            value:
              "La clé expire après N secondes quoi qu'il arrive. Simple, prévisible — le défaut.",
          },
          {
            label: "TTL glissant",
            value:
              "Chaque accès repousse l'expiration (`EXPIRE` à chaque hit) : les données chaudes restent, les froides partent. Typique des sessions.",
          },
          {
            label: "Expiration probabiliste",
            value:
              "Recharger en arrière-plan avant l'expiration avec une probabilité croissante : lisse les pics de miss (voir stampede).",
          },
          {
            label: "Jamais sans TTL",
            value:
              "Répétons-le : toute clé a une expiration. Les clés éternelles sont des fuites mémoire.",
          },
        ],
      },
    ],
  },
  {
    id: "invalidation-strategies",
    title: "Stratégies d'invalidation",
    level: 3,
    intro: "Le problème difficile : supprimer exactement ce qui est périmé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Invalidation par clé : `DEL article:42` — précis, mais il faut connaître toutes les clés dérivées.",
          "Invalidation par motif : `SCAN` + `DEL` sur `articles:list:*` — pratique, coûteux sur de gros volumes (jamais `KEYS` en prod).",
          "Versioning : `articles:v3:list` — changer de version invalide tout d'un coup, sans suppression.",
          "Tags : associer des tags aux clés (`article:42` taggé `articles`) et invalider par tag — le plus expressif, demande une couche applicative.",
        ],
      },
      {
        kind: "text",
        text: "Phil Karlton : « Il n'y a que deux problèmes difficiles en informatique : l'invalidation du cache et nommer les choses. » En pratique : TTL généreux + invalidation active sur les écritures critiques + versioning pour les changements massifs.",
      },
    ],
  },
  {
    id: "stampede",
    title: "Cache stampede (thundering herd)",
    level: 3,
    intro: "Quand mille requêtes rechargent la même donnée expirée en même temps.",
    blocks: [
      {
        kind: "text",
        text: "Scénario : la clé `homepage` expire ; 1000 requêtes simultanées font toutes un miss et lancent 1000 requêtes SQL identiques — la base s'effondre. C'est le thundering herd, classique sur les pages chaudes.",
      },
      {
        kind: "list",
        items: [
          "Verrou de rechargement : le premier miss pose un lock (`SET NX EX`), les autres attendent ou servent l'ancienne valeur.",
          "Rechargement probabiliste : recharger avant expiration avec une probabilité qui augmente — étale la charge.",
          "Stale-while-revalidate : servir l'ancienne valeur pendant le rechargement (voir cache HTTP).",
          "Jitter sur les TTL : `TTL ± 10 %` aléatoire pour éviter l'expiration synchronisée de milliers de clés.",
        ],
      },
    ],
  },
  {
    id: "penetration",
    title: "Pénétration du cache et bloom filters",
    level: 3,
    intro: "Les requêtes pour ce qui n'existe pas : protéger la source.",
    blocks: [
      {
        kind: "text",
        text: "Demander `/articles/999999` en boucle : chaque miss interroge la base pour rien. Défense simple : mettre en cache les réponses négatives (`article:999999 = null`, TTL court). Défense avancée : un filtre de Bloom en mémoire dit « certainement absent » sans toucher la base.",
      },
      {
        kind: "list",
        items: [
          "Cache négatif : stockez le `null` avec un TTL court (60 s) — les absents coûtent un lookup Redis, pas une requête SQL.",
          "Filtre de Bloom : structure probabiliste — « absent » est certain, « présent » est probable. Idéal en pré-filtre.",
          "Validation d'abord : un id non numérique est rejeté avant même le cache (422).",
        ],
      },
    ],
  },
  {
    id: "memoization",
    title: "Mémoïsation applicative",
    level: 3,
    intro: "Le cache le plus simple : mémoriser le résultat d'une fonction pure.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "functools.lru_cache",
        code: "from functools import lru_cache\n\n@lru_cache(maxsize=1024)\ndef render_markdown(source: str) -> str:\n    ...  # coûteux, résultat identique pour la même entrée\n\n# Pour du TTL en plus : cachetools.TTLCache\nfrom cachetools import TTLCache, cached\ncache = TTLCache(maxsize=1024, ttl=300)\n\n@cached(cache)\ndef expensive_computation(key: str):\n    ...",
      },
      {
        kind: "text",
        text: "La mémoïsation convient aux fonctions pures coûteuses, en mémoire du processus. Limites : non partagée entre workers, perdue au redémarrage — pour du partagé et persistant, c'est Redis.",
      },
    ],
  },
  {
    id: "cache-requetes-sql",
    title: "Cache des requêtes SQL",
    level: 3,
    intro: "Cacher au niveau de la requête : clés dérivées du SQL et de ses paramètres.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Clé dérivée de la requête",
        code: "import hashlib, json\n\ndef cached_query(sql: str, params: dict, ttl: int = 300):\n    key = \"sql:\" + hashlib.sha256(\n        (sql + json.dumps(params, sort_keys=True)).encode()\n    ).hexdigest()\n    hit = r.get(key)\n    if hit:\n        return json.loads(hit)\n    rows = db.execute(sql, params).fetchall()\n    r.set(key, json.dumps(rows), ex=ttl)\n    return rows",
      },
      {
        kind: "text",
        text: "Le hash du SQL + paramètres garantit l'unicité de la clé. Attention : toute modification des tables concernées doit invalider — d'où l'intérêt des tags ou du versioning par domaine plutôt que par requête brute.",
      },
    ],
  },
  {
    id: "n-plus-1-cache",
    title: "N+1 : le cache ne suffit pas",
    level: 3,
    intro: "Cacher une requête N+1, c'est cacher un problème : corrigez d'abord.",
    blocks: [
      {
        kind: "text",
        text: "Le cache masque le N+1 mais ne le résout pas : au premier miss, les 51 requêtes repartent. Ordre correct : 1) corriger le N+1 (chargement eager), 2) puis mettre en cache le résultat groupé. Un cache posé sur une requête pathologique finit toujours par trahir au pire moment (expiration synchronisée).",
      },
    ],
  },
  {
    id: "cdn",
    title: "CDN : le cache au bord",
    level: 3,
    intro: "Servir depuis le point le plus proche de l'utilisateur.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le CDN met en cache vos réponses dans des dizaines de points de présence : l'utilisateur est servi en millisecondes.",
          "Il respecte vos en-têtes `Cache-Control` : `s-maxage` règle spécifiquement le cache partagé (CDN), distinct du `max-age` navigateur.",
          "Purge : invalidez par URL ou par tag lors des déploiements (jamais de TTL infini sans purge).",
          "Contenu dynamique : ne mettez au CDN que le cacheable (assets, pages publiques) — le personnalisé reste à l'origine.",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Distinguer navigateur et CDN",
        code: "response.headers[\"Cache-Control\"] = (\n    \"public, max-age=60, s-maxage=600\"\n)\n# Navigateur : 60 s. CDN : 10 min. L'origine respire.",
      },
    ],
  },
  {
    id: "etag",
    title: "ETag et validation",
    level: 3,
    intro: "Ne pas re-télécharger ce qui n'a pas changé : la validation conditionnelle.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le serveur envoie `ETag: \"abc123\"` (hash du contenu) ; le client renvoie `If-None-Match: \"abc123\"`.",
          "Si inchangé : `304 Not Modified`, sans corps — économie de bande passante.",
          "`Last-Modified` / `If-Modified-Since` : la variante par date, moins précise.",
          "ETag faible (`W/`) : équivalence sémantique sans identité d'octets — suffit pour la plupart des API.",
        ],
      },
    ],
  },
  {
    id: "stale-while-revalidate",
    title: "stale-while-revalidate",
    level: 3,
    intro: "Servir du légèrement périmé pendant le rechargement : la fraîcheur sans l'attente.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "En-tête SWR",
        code: "response.headers[\"Cache-Control\"] = (\n    \"public, max-age=60, stale-while-revalidate=300\"\n)\n# 0-60 s : servi du cache. 60-360 s : servi du cache PENDANT\n# que le CDN recharge en arrière-plan. Au-delà : attente du frais.",
      },
      {
        kind: "text",
        text: "SWR est l'antidote applicatif au stampede : jamais d'attente visible, fraîcheur bornée (ici 6 min max). Idéal pour les contenus « chauds » où un léger décalage est acceptable (accueil, catalogue, classements).",
      },
    ],
  },
  {
    id: "sessions-redis",
    title: "Sessions dans Redis",
    level: 3,
    intro: "Le cas d'usage canonique : sessions partagées, expirées, rapides.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Session avec TTL glissant",
        code: "import secrets\n\ndef create_session(user_id: int) -> str:\n    sid = secrets.token_hex(32)\n    r.hset(f\"session:{sid}\", mapping={\"user_id\": user_id})\n    r.expire(f\"session:{sid}\", 1800)  # 30 min\n    return sid\n\ndef get_session(sid: str):\n    data = r.hgetall(f\"session:{sid}\")\n    if data:\n        r.expire(f\"session:{sid}\", 1800)  # TTL glissant : activité = prolongation\n    return data or None",
      },
      {
        kind: "text",
        text: "Redis est parfait pour les sessions : accès en microsecondes, expiration native, partagé entre toutes les instances de l'application. À la déconnexion : `DEL session:<sid>` — révocation immédiate.",
      },
    ],
  },
  {
    id: "rate-limiting-redis",
    title: "Rate limiting avec Redis",
    level: 3,
    intro: "Compteurs à fenêtre glissante : le rate limiting précis.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Fenêtre fixe avec compteur",
        code: "def is_rate_limited(key: str, limit: int, window: int) -> bool:\n    pipe = r.pipeline()\n    pipe.incr(key)\n    pipe.expire(key, window)\n    count, _ = pipe.execute()\n    return count > limit\n\n# 100 requêtes / 60 s par token\nif is_rate_limited(f\"rl:{token}\", 100, 60):\n    raise HTTPException(429, \"Trop de requêtes\")",
      },
      {
        kind: "text",
        text: "Le pipeline rend l'incrément + l'expiration atomiques. La fenêtre fixe a un défaut (pic à cheval sur deux fenêtres) ; la fenêtre glissante (sorted set de timestamps) est plus précise mais plus coûteuse — la fixe suffit dans la plupart des cas.",
      },
    ],
  },
  {
    id: "files-attente",
    title: "Redis au-delà du cache",
    level: 3,
    intro: "Files, pub/sub, verrous : les autres visages de Redis.",
    blocks: [
      {
        kind: "list",
        items: [
          "Files d'attente : `LPUSH`/`BRPOP` — le producteur dépose, les workers consomment (base des tâches asynchrones simples).",
          "Pub/Sub : `PUBLISH`/`SUBSCRIBE` — diffusion d'événements (invalidation cross-instances : « la clé X a changé »).",
          "Verrous distribués : `SET key val NX EX 30` — un seul worker recharge le cache (anti-stampede).",
          "Attention : Redis est en mémoire — ce n'est pas une base de données durable par défaut (persistance RDB/AOF à configurer si besoin).",
        ],
      },
    ],
  },
  {
    id: "coherence",
    title: "Cohérence des données",
    level: 3,
    intro: "Le cache ment par omission : choisir son niveau de vérité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cohérence éventuelle (TTL) : le cache peut être en retard — acceptable pour catalogue, articles, classements.",
          "Cohérence forte (write-through + invalidation) : nécessaire pour soldes, permissions, prix — ou ne pas cacher du tout.",
          "Données critiques (paiement, stock) : préférez la lecture directe ou des TTL très courts.",
          "Documentez le délai : « les prix sont rafraîchis toutes les 5 minutes » — un contrat explicite vaut mieux qu'une fraîcheur supposée.",
        ],
      },
    ],
  },
  {
    id: "dimensionnement",
    title: "Dimensionnement et éviction",
    level: 3,
    intro: "Quand la mémoire est pleine : quelle clé sacrifier ?",
    blocks: [
      {
        kind: "command",
        label: "Voir la politique d'éviction",
        command: "docker exec redis-cache redis-cli CONFIG GET maxmemory-policy",
        why: "Quand Redis atteint `maxmemory`, la politique décide : `allkeys-lru` (évince les moins récemment utilisées) est le bon défaut pour un cache.",
      },
      {
        kind: "list",
        items: [
          "`allkeys-lru` : évince les clés les moins récemment utilisées — le standard pour un cache.",
          "`volatile-ttl` : n'évince que les clés avec TTL, les plus proches d'expirer d'abord.",
          "`noeviction` : refuse les écritures quand plein — jamais pour un cache (l'app doit toujours pouvoir écrire).",
          "Dimensionnez : `maxmemory` à 70–80 % de la RAM disponible, gardez de la marge pour les pics.",
        ],
      },
    ],
  },
  {
    id: "persistence-redis",
    title: "Persistance Redis : faut-il ?",
    level: 3,
    intro: "Un cache peut-il se permettre de tout perdre au redémarrage ?",
    blocks: [
      {
        kind: "list",
        items: [
          "Par défaut, un cache n'a pas besoin de persistance : au redémarrage, il se remplit (avec un pic de misses — prévoyez un warm-up).",
          "RDB (snapshot) : sauvegarde périodique — redémarrage rapide, perte des dernières écritures.",
          "AOF (journal) : chaque écriture journalisée — plus sûr, plus lent.",
          "Sessions et rate limiting : la perte au redémarrage déconnecte les utilisateurs — persistance ou sessions réémises proprement.",
        ],
      },
    ],
  },
  {
    id: "warm-up",
    title: "Warm-up du cache",
    level: 3,
    intro: "Pré-remplir après un déploiement : éviter le pic de misses.",
    blocks: [
      {
        kind: "list",
        items: [
          "Au déploiement, le cache est vide : les premières requêtes paient toutes le coût source simultanément.",
          "Warm-up : script qui pré-charge les clés chaudes (top articles, page d'accueil) juste après le déploiement.",
          "Déploiement progressif : garder l'ancien cache pendant la bascule (clés versionnées) plutôt que de repartir de zéro.",
          "Alternative : ne jamais vider — déployez sans redémarrer Redis (conteneur séparé, persistance).",
        ],
      },
    ],
  },
  {
    id: "cache-distribue",
    title: "Cache distribué",
    level: 3,
    intro: "Plusieurs instances Redis : sharding et haute disponibilité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Redis Cluster : sharding automatique par hash de clé — scale horizontal, mais complexité opérationnelle.",
          "Réplication : un primaire + réplicas en lecture — haute disponibilité, lectures réparties.",
          "La plupart des applications n'en ont pas besoin : un Redis bien dimensionné encaisse des dizaines de milliers d'op/s.",
          "Règle : commencez simple (une instance), mesurez, ne distribuez que sur des chiffres.",
        ],
      },
    ],
  },
  {
    id: "securite-redis",
    title: "Sécuriser Redis",
    level: 3,
    intro: "Redis sans mot de passe sur internet : la faille classique.",
    blocks: [
      {
        kind: "command",
        label: "Exiger un mot de passe",
        command: "docker run -d --name redis-cache -p 6379:6379 redis:7 --requirepass 'mot-de-passe-fort'",
        why: "Par défaut Redis n'a pas d'authentification : ne l'exposez jamais sans mot de passe, idéalement jamais sur internet (réseau privé uniquement).",
        verify: "docker exec redis-cache redis-cli -a 'mot-de-passe-fort' ping",
      },
      {
        kind: "list",
        items: [
          "Ne jamais exposer le port 6379 sur internet : réseau privé ou tunnel.",
          "TLS pour les échanges inter-régions / cloud.",
          "Ne stockez jamais de secrets long-terme uniquement dans Redis : c'est un cache, pas un coffre.",
        ],
      },
    ],
  },
  {
    id: "observabilite-cache",
    title: "Observabilité du cache",
    level: 3,
    intro: "Ce qu'on ne mesure pas ne s'optimise pas : les métriques du cache.",
    blocks: [
      {
        kind: "command",
        label: "Mémoire et clés",
        command: "docker exec redis-cache redis-cli INFO memory | grep -E 'used_memory_human|maxmemory_human'; docker exec redis-cache redis-cli DBSIZE",
        why: "`used_memory_human` vs `maxmemory` : la marge avant éviction. `DBSIZE` : le nombre de clés — une croissance anormale signale des clés sans TTL.",
      },
      {
        kind: "list",
        items: [
          "Taux de hit par domaine de clés : un hit rate global masque un domaine qui ne hitte jamais.",
          "Latence des commandes (`INFO stats`, `SLOWLOG`) : Redis est rapide, mais un `KEYS *` en prod ne l'est pas.",
          "Alertes : mémoire > 85 %, hit rate en chute, évictions en hausse.",
        ],
      },
    ],
  },
  {
    id: "anti-patterns",
    title: "Anti-patterns",
    level: 3,
    intro: "Les façons classiques de se tirer une balle dans le pied avec un cache.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cacher sans mesurer : le cache ajoute de la complexité — sans gain mesuré, c'est du coût pur.",
          "Clés sans TTL : la fuite mémoire qui sert des fossiles.",
          "`KEYS *` en production : bloque Redis — utilisez `SCAN`.",
          "Cacher l'authentification : jamais de réponse `200` avec données personnelles dans un cache partagé.",
          "Invalidation oubliée : « les utilisateurs voient l'ancien prix » — le bug le plus coûteux du caching.",
          "Cache devant une base lente sans corriger la requête : le cache masque, la dette reste.",
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging du cache",
    level: 3,
    intro: "« Je vois d'anciennes données » : la méthode de diagnostic.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier la clé",
            detail:
              "Dans redis-cli : la clé existe-t-elle ? Son TTL ? Sa valeur ? 80 % des mystères se résolvent ici.",
          },
          {
            title: "Tracer l'écriture",
            detail:
              "`MONITOR` pendant une requête : voyez les GET/SET/DEL réels — la clé écrite est-elle celle qui est lue ?",
          },
          {
            title: "Vérifier l'invalidation",
            detail:
              "Après une écriture, la clé a-t-elle été supprimée ? Sinon, l'invalidation est incomplète (listes oubliées, motif faux).",
          },
          {
            title: "Isoler les couches",
            detail:
              "Données périmées : navigateur ? CDN ? Redis ? Désactivez couche par couche pour identifier la coupable.",
          },
          {
            title: "Forcer le frais",
            detail:
              "En dernier recours : `DEL` la clé et rechargez — si le frais s'affiche, le problème était le cache, pas la source.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques du caching.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Pas de TTL",
            value:
              "Problem : clés éternelles qui grossissent et servent du périmé. Why : oubli du `EX`. Better : TTL obligatoire sur chaque écriture.",
          },
          {
            label: "Cache stampede",
            value:
              "Problem : expiration synchronisée → la base s'effondre. Why : même TTL partout, page chaude. Better : jitter, lock de rechargement, SWR.",
          },
          {
            label: "Invalidation partielle",
            value:
              "Problem : l'article est frais mais la liste affiche l'ancien titre. Why : `DEL article:42` sans les listes. Better : invalider tous les dérivés (motifs, tags, versioning).",
          },
          {
            label: "Données personnelles en cache partagé",
            value:
              "Problem : un utilisateur voit les données d'un autre. Why : `Cache-Control: public` sur une route authentifiée. Better : `private, no-store` sur le personnel.",
          },
          {
            label: "Sérialisation fragile",
            value:
              "Problem : `json.dumps` d'objets datetime qui échoue. Why : types non JSON. Better : sérialiseur explicite (schémas Pydantic → dict).",
          },
          {
            label: "Clés non déterministes",
            value:
              "Problem : hit rate de 0 % malgré le cache. Why : paramètres dans le désordre, objets non triés dans la clé. Better : canonisation (`sort_keys=True`).",
          },
          {
            label: "Redis exposé",
            value:
              "Problem : instance sans mot de passe sur internet. Why : configuration par défaut. Better : réseau privé + `--requirepass`.",
          },
          {
            label: "Cacher l'erreur",
            value:
              "Problem : une réponse 500 mise en cache et resservie. Why : mise en cache aveugle. Better : ne cacher que les succès (2xx), jamais les erreurs.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Des repères de contexte, pas des règles absolues.",
    blocks: [
      {
        kind: "list",
        items: [
          "Mesurez d'abord : ne cachez que ce qui est lent et fréquent.",
          "Toujours un TTL : aucune clé éternelle.",
          "Nommez les clés : `domaine:id:variante`, lisibles et supprimables par motif.",
          "Invalidez à l'écriture : chaque mutation connaît ses clés.",
          "Cache HTTP d'abord : un en-tête bien choisi vaut un Redis.",
          "Ne cachez jamais les erreurs ni les données personnelles en partagé.",
          "Prévoyez l'absence : l'app fonctionne sans cache, plus lentement.",
          "Surveillez : hit rate, mémoire, évictions — en alerte, pas en espérance.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : un blog personnel vit très bien avec du cache HTTP + quelques TTL ; une plateforme à fort trafic exige l'arsenal complet (invalidation par tags, anti-stampede, CDN). La sophistication suit la charge mesurée.",
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
            label: "Redis",
            value:
              "redis.io/docs : commandes, structures de données, persistance, cluster — la référence complète.",
          },
          {
            label: "MDN — Cache HTTP",
            value:
              "developer.mozilla.org : Cache-Control, ETag, validation — les mécanismes du web.",
          },
          {
            label: "CDN et caching",
            value:
              "La documentation de votre CDN (purge, `s-maxage`, stale-while-revalidate) : chaque fournisseur a ses spécificités.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : instrumentez le hit rate de votre API et visez 80 %+ sur les routes chaudes.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le caching maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Accélérer l'API : concevoir des routes cacheables — voir la compétence `api-rest`.",
          "Stocker les sessions : Redis pour l'authentification — voir la compétence `auth`.",
          "Diagnostiquer la lenteur : requêtes SQL et N+1 — voir la compétence `sql`.",
          "Déployer Redis : conteneurs et persistance — voir la compétence `docker`.",
          "Revenir à la roadmap : valider Caching et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

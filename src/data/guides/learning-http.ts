import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de HTTP : du premier curl aux subtilités du
 * protocole (cache, CORS, authentification, versions).
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_HTTP: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est HTTP et pourquoi tout le web parle ce protocole.",
    blocks: [
      {
        kind: "text",
        text: "HTTP (HyperText Transfer Protocol) est le protocole qui permet à un client (navigateur, application mobile, script) et un serveur de dialoguer sur le web. Chaque échange suit le même schéma : le client envoie une requête (méthode + URL + en-têtes + corps éventuel), le serveur répond (code de statut + en-têtes + contenu).",
      },
      {
        kind: "text",
        text: "Pourquoi HTTP existe : sans protocole commun, chaque application inventerait son langage réseau. HTTP fournit la grammaire partagée — simple, textuelle, sans état — sur laquelle tout le web est bâti : pages, APIs, webhooks, streaming. Le comprendre, c'est comprendre la couche sous chaque interaction web.",
      },
      {
        kind: "text",
        text: "Propriété fondamentale : HTTP est sans état (stateless). Chaque requête est indépendante ; le serveur ne « se souvient » de rien entre deux requêtes. La continuité (sessions, paniers) est reconstruite par-dessus, via cookies ou tokens — voir le niveau 3.",
      },
    ],
  },
  {
    id: "requete-reponse",
    title: "Requête et réponse",
    level: 1,
    intro:
      "Le cycle de base : ce qui part, ce qui revient.",
    blocks: [
      {
        kind: "diagram",
        title: "Un échange HTTP",
        lines: [
          "[Client]",
          "   │",
          "   │  GET /articles/42 HTTP/1.1",
          "   │  Host: exemple.com",
          "   │─────────────────────────▶",
          "   │",
          "   │  ◀─────────────────────────",
          "   │  HTTP/1.1 200 OK",
          "   │  Content-Type: text/html",
          "   │  (corps : la page)",
          "   ▼",
          "[Serveur]",
        ],
      },
      {
        kind: "text",
        text: "La requête dit : « avec la méthode GET, donne-moi la ressource /articles/42 ». La réponse dit : « 200 (succès), voici du HTML ». Méthode, URL, en-têtes d'un côté ; statut, en-têtes, corps de l'autre — tout le reste de cette page détaille ce vocabulaire.",
      },
      {
        kind: "list",
        items: [
          "La méthode (verbe) exprime l'intention : lire, créer, modifier, supprimer.",
          "L'URL désigne la ressource visée.",
          "Le code de statut raconte le résultat : succès, redirection, erreur client ou serveur.",
          "Les en-têtes transportent les métadonnées : format, langue, authentification, cache.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "premier-appel",
    title: "Premier appel avec curl",
    level: 2,
    intro:
      "Voir un échange HTTP réel depuis le terminal.",
    blocks: [
      {
        kind: "command",
        label: "Requête GET avec en-têtes de réponse",
        command: "curl -i https://example.com",
        why: "Envoie une requête GET vers example.com (domaine de démonstration réservé à cet usage) et affiche les en-têtes de réponse (`-i`) suivis du corps. C'est l'échange HTTP le plus simple observable : statut, en-têtes, contenu.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" https://example.com",
      },
      {
        kind: "code",
        language: "bash",
        title: "Ce que retourne curl -i",
        code: `HTTP/2 200\ncontent-type: text/html; charset=UTF-8\ncontent-length: 1256\n\n<!doctype html>\n<html>...`,
      },
      {
        kind: "text",
        text: "Lecture : `HTTP/2 200` (protocole et statut de succès), puis les en-têtes (`content-type`, `content-length`), une ligne vide, puis le corps. `curl` est l'outil d'exploration HTTP de référence : il parle HTTP pur, sans l'habillage d'un navigateur.",
      },
    ],
  },
  {
    id: "methodes",
    title: "Les méthodes",
    level: 2,
    intro:
      "GET, POST, PUT, PATCH, DELETE : le verbe indique l'intention.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Intention", "Exemple"],
        rows: [
          ["GET", "Lire une ressource", "Afficher un article"],
          ["POST", "Créer une ressource (ou déclencher une action)", "Publier un commentaire"],
          ["PUT", "Remplacer une ressource entière", "Mettre à jour un profil complet"],
          ["PATCH", "Modifier partiellement une ressource", "Changer juste l'email"],
          ["DELETE", "Supprimer une ressource", "Supprimer un commentaire"],
          ["HEAD", "Comme GET, sans le corps", "Vérifier l'existence / les en-têtes"],
          ["OPTIONS", "Connaître les méthodes autorisées", "Pré-requêtes CORS"],
        ],
      },
      {
        kind: "text",
        text: "Choisir la bonne méthode n'est pas cosmétique : caches, navigateurs et frameworks s'appuient sur leur sémantique (un GET ne doit jamais modifier de données — voir les méthodes sûres au niveau 3). Une API qui fait tout en POST est fonctionnelle mais perd les bénéfices du protocole.",
      },
    ],
  },
  {
    id: "codes-de-statut",
    title: "Les codes de statut",
    level: 2,
    intro:
      "Le premier chiffre raconte la famille du résultat.",
    blocks: [
      {
        kind: "table",
        headers: ["Famille", "Sens", "Exemples"],
        rows: [
          ["2xx", "Succès", "`200 OK`, `201 Created`, `204 No Content`"],
          ["3xx", "Redirection", "`301 Moved Permanently`, `304 Not Modified`"],
          ["4xx", "Erreur du client", "`400 Bad Request`, `401 Unauthorized`, `404 Not Found`"],
          ["5xx", "Erreur du serveur", "`500 Internal Server Error`, `503 Service Unavailable`"],
        ],
      },
      {
        kind: "text",
        text: "Réflexe de débogage : face à un appel qui échoue, lire le statut avant tout. 4xx = la requête est en cause (à corriger côté client) ; 5xx = le serveur est en cause (à signaler côté serveur). Le détail des codes les plus courants est au niveau 3.",
      },
    ],
  },
  {
    id: "en-tetes",
    title: "Les en-têtes",
    level: 2,
    intro:
      "Les métadonnées de l'échange : format, langue, authentification.",
    blocks: [
      {
        kind: "table",
        headers: ["En-tête", "Rôle", "Exemple"],
        rows: [
          ["`Content-Type`", "Format du corps", "`application/json`"],
          ["`Authorization`", "Identité de l'appelant", "`Bearer <token>`"],
          ["`Accept`", "Formats acceptés par le client", "`application/json`"],
          ["`User-Agent`", "Identification du client", "Navigateur, curl, app mobile"],
          ["`Cache-Control`", "Règles de mise en cache", "`no-cache`, `max-age=3600`"],
          ["`Location`", "Cible d'une redirection", "URL de la nouvelle adresse"],
        ],
      },
      {
        kind: "text",
        text: "Les en-têtes sont des paires `Nom: valeur`, insensibles à la casse. Ils se divisent en en-têtes de requête (ce que le client annonce), de réponse (ce que le serveur déclare) et de représentation (qui décrivent le corps). La liste complète des essentiels est au niveau 3.",
      },
    ],
  },
  {
    id: "query-params",
    title: "Paramètres d'URL",
    level: 2,
    intro:
      "Passer des options dans l'URL : filtres, pagination, recherche.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Anatomie d'une URL avec paramètres",
        code: `https://api.exemple.com/articles?categorie=tech&page=2&tri=date\n#                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^\n#                                     query string : paires clé=valeur\n#                                     séparées par &, après le ?`,
      },
      {
        kind: "list",
        items: [
          "Usage : filtres, tri, pagination, recherche — tout ce qui affine une lecture (GET).",
          "Encodage : les caractères spéciaux sont pourcent-encodés (`%20` pour l'espace) — `curl --data-urlencode` le fait.",
          "Jamais de secrets en query params : les URLs sont journalisées (serveurs, proxies, historique).",
          "Limite de longueur : les URLs très longues sont mal supportées — les gros paramètres vont dans le corps.",
        ],
      },
    ],
  },
  {
    id: "corps-de-requete",
    title: "Corps de requête",
    level: 2,
    intro:
      "Envoyer des données : le corps des requêtes POST, PUT, PATCH.",
    blocks: [
      {
        kind: "command",
        label: "Envoyer des données de formulaire",
        command: "curl -X POST -d \"nom=Akane&age=25\" https://example.com",
        why: "Envoie une requête POST avec un corps encodé comme un formulaire (`application/x-www-form-urlencoded`, le défaut de `-d`). `-X` force la méthode ; sans lui, `-d` implique déjà POST.",
      },
      {
        kind: "text",
        text: "Le corps transporte les données à créer ou modifier. Son format est déclaré par `Content-Type` : formulaire encodé, JSON, multipart (fichiers)… Le serveur lit le `Content-Type` pour savoir comment parser — un corps JSON sans le bon `Content-Type` est une erreur classique.",
      },
    ],
  },
  {
    id: "json-avec-curl",
    title: "Envoyer du JSON avec curl",
    level: 2,
    intro:
      "Le cas le plus courant avec les APIs modernes.",
    blocks: [
      {
        kind: "command",
        label: "POST JSON",
        command: "curl -X POST -H \"Content-Type: application/json\" -d '{\"nom\":\"Akane\"}' https://example.com",
        why: "Déclare le format (`-H` ajoute l'en-tête `Content-Type: application/json`) puis envoie le document JSON (`-d`). Les quotes simples autour du JSON protègent les doubles quotes du shell.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" -X POST -H \"Content-Type: application/json\" -d '{}' https://example.com",
      },
      {
        kind: "text",
        text: "Le trio `-X` (méthode), `-H` (en-tête), `-d` (corps) couvre 90 % des appels d'API au terminal. Pour les payloads complexes, préférer `-d @fichier.json` (lit le corps depuis un fichier) aux JSON inline illisibles.",
      },
    ],
  },
  {
    id: "authentification",
    title: "S'authentifier",
    level: 2,
    intro:
      "Prouver son identité : l'en-tête Authorization.",
    blocks: [
      {
        kind: "command",
        label: "Appel avec token Bearer",
        command: "curl -H \"Authorization: Bearer VOTRE_TOKEN\" https://api.exemple.com/moi",
        why: "Transmet un token dans l'en-tête `Authorization` avec le schéma `Bearer` : le serveur vérifie le token et identifie l'appelant. Remplacez `VOTRE_TOKEN` par un vrai token et `api.exemple.com` par la vraie API — c'est le schéma d'authentification le plus répandu.",
      },
      {
        kind: "list",
        items: [
          "Toujours en HTTPS : un token en clair sur HTTP est interceptable.",
          "Ne jamais mettre de token dans l'URL : les URLs sont journalisées.",
          "En cas de `401 Unauthorized` : token absent, expiré ou invalide — le renouveler.",
          "En cas de `403 Forbidden` : authentifié mais non autorisé — ce n'est pas un problème de token.",
        ],
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    level: 2,
    intro:
      "Maintenir une session malgré le protocole sans état.",
    blocks: [
      {
        kind: "command",
        label: "Conserver les cookies entre appels",
        command: "curl -c cookies.txt -b cookies.txt https://example.com",
        why: "`-c` enregistre les cookies posés par le serveur dans `cookies.txt`, `-b` les renvoie aux requêtes suivantes. On reproduit ainsi une session (connexion, panier) depuis le terminal.",
      },
      {
        kind: "text",
        text: "Mécanisme : le serveur répond `Set-Cookie: session=abc123`, le client renvoie `Cookie: session=abc123` à chaque requête suivante. C'est ainsi que le serveur « reconnaît » le client malgré le protocole sans état. Les attributs de sécurité (`HttpOnly`, `Secure`, `SameSite`) sont détaillés au niveau 3.",
      },
    ],
  },
  {
    id: "https",
    title: "HTTPS",
    level: 2,
    intro:
      "La version chiffrée : non négociable aujourd'hui.",
    blocks: [
      {
        kind: "text",
        text: "HTTPS = HTTP chiffré via TLS. Il garantit trois choses : la confidentialité (personne ne lit les échanges sur le réseau), l'intégrité (personne ne les modifie en transit) et l'authenticité du serveur (le certificat prouve qu'on parle au bon serveur).",
      },
      {
        kind: "list",
        items: [
          "Tout ce qui transporte des identifiants, tokens ou données personnelles exige HTTPS.",
          "Les navigateurs signalent le HTTP comme « non sécurisé » ; de nombreuses APIs refusent le HTTP pur.",
          "Le certificat est vérifié automatiquement : `curl` échoue sur un certificat invalide (ne pas contourner avec `-k` sauf en test local).",
          "Le détail du handshake TLS et de HSTS est au niveau 3.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "anatomie-requete",
    title: "Anatomie d'une requête",
    level: 3,
    intro:
      "Chaque ligne d'une requête brute, expliquée.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Requête brute",
        code: `POST /api/users HTTP/1.1\nHost: api.exemple.com\nContent-Type: application/json\nAuthorization: Bearer abc123\nContent-Length: 27\n\n{"nom":"Akane","age":25}`,
      },
      {
        kind: "fields",
        title: "Les parties",
        fields: [
          {
            label: "Ligne de requête",
            value:
              "`MÉTHODE chemin version` : `POST /api/users HTTP/1.1`. Le chemin seul suffit — l'hôte est dans l'en-tête `Host`.",
          },
          {
            label: "En-têtes",
            value:
              "Un par ligne, `Nom: valeur`, terminés par une ligne vide. L'ordre n'a pas d'importance.",
          },
          {
            label: "Ligne vide",
            value:
              "Le séparateur obligatoire entre en-têtes et corps. Son absence est une erreur de protocole.",
          },
          {
            label: "Corps",
            value:
              "Optionnel, décrit par `Content-Type` et `Content-Length`. GET n'en a généralement pas.",
          },
        ],
      },
    ],
  },
  {
    id: "anatomie-reponse",
    title: "Anatomie d'une réponse",
    level: 3,
    intro:
      "Le miroir : statut, en-têtes, corps.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Réponse brute",
        code: `HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: /api/users/42\nContent-Length: 35\n\n{"id":42,"nom":"Akane","age":25}`,
      },
      {
        kind: "fields",
        title: "Les parties",
        fields: [
          {
            label: "Ligne de statut",
            value:
              "`version code raison` : `HTTP/1.1 201 Created`. Le code est normatif, la raison (`Created`) est indicative.",
          },
          {
            label: "`Location`",
            value:
              "Sur une création (201), indique l'URL de la ressource créée : le client sait où la retrouver.",
          },
          {
            label: "Corps",
            value:
              "La représentation de la ressource, au format annoncé par `Content-Type`.",
          },
        ],
      },
    ],
  },
  {
    id: "methodes-detail",
    title: "Méthodes : sûres et idempotentes",
    level: 3,
    intro:
      "Deux propriétés qui structurent tout le protocole.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Sûre ?", "Idempotente ?", "Conséquence"],
        rows: [
          ["GET", "Oui", "Oui", "Peut être mise en cache, pré-chargée, rejouée sans risque"],
          ["HEAD", "Oui", "Oui", "Comme GET sans corps"],
          ["POST", "Non", "Non", "Rejouer peut dupliquer : prudence sur les retries"],
          ["PUT", "Non", "Oui", "Rejouer est sans effet : retries sûrs"],
          ["PATCH", "Non", "Selon l'opération", "Dépend de la sémantique du patch"],
          ["DELETE", "Non", "Oui", "Supprimer deux fois = supprimé une fois"],
        ],
      },
      {
        kind: "text",
        text: "Sûre = ne modifie pas la ressource. Idempotente = répétée N fois, même effet qu'une fois. Ces propriétés guident le cache (seules les méthodes sûres sont cachées), les retries (seules les idempotentes se rejouent sans risque) et la conception d'API (l'idempotence se conçoit, voir api-integration).",
      },
    ],
  },
  {
    id: "codes-detail",
    title: "Codes de statut en détail",
    level: 3,
    intro:
      "Les codes à connaître par cœur, et ce qu'ils impliquent.",
    blocks: [
      {
        kind: "table",
        headers: ["Code", "Sens", "Action typique"],
        rows: [
          ["200 OK", "Succès, avec corps", "Traiter la réponse"],
          ["201 Created", "Ressource créée", "Lire `Location` pour son URL"],
          ["204 No Content", "Succès sans corps", "Rien à parser"],
          ["301 / 308", "Redirection permanente", "Mettre à jour l'URL stockée"],
          ["302 / 307", "Redirection temporaire", "Suivre sans changer le stocké"],
          ["304 Not Modified", "Cache encore valide", "Utiliser la copie locale"],
          ["400 Bad Request", "Requête mal formée", "Corriger la requête"],
          ["401 Unauthorized", "Authentification requise/invalide", "Fournir ou renouveler le token"],
          ["403 Forbidden", "Non autorisé", "Ce n'est pas un problème d'identité"],
          ["404 Not Found", "Ressource inexistante", "Vérifier l'URL / l'id"],
          ["409 Conflict", "Conflit d'état", "Résoudre puis réessayer"],
          ["422 Unprocessable", "Données invalides (sémantique)", "Corriger le payload (voir les erreurs de validation)"],
          ["429 Too Many Requests", "Quota dépassé", "Ralentir, respecter `Retry-After`"],
          ["500 Internal Error", "Bug serveur", "Signaler, réessayer plus tard"],
          ["502 Bad Gateway", "Intermédiaire en échec", "Problème d'infra amont"],
          ["503 Unavailable", "Serveur surchargé/maintenance", "Réessayer avec backoff"],
        ],
      },
    ],
  },
  {
    id: "en-tetes-essentiels",
    title: "En-têtes essentiels",
    level: 3,
    intro:
      "Le vocabulaire courant des en-têtes, par famille.",
    blocks: [
      {
        kind: "table",
        headers: ["En-tête", "Direction", "Rôle"],
        rows: [
          ["`Host`", "Requête", "Le domaine visé (routage des hébergements mutualisés)"],
          ["`Content-Type`", "Les deux", "Format du corps (`application/json`…)"],
          ["`Content-Length`", "Les deux", "Taille du corps en octets"],
          ["`Authorization`", "Requête", "Identité (`Bearer`, `Basic`…)"],
          ["`Accept`", "Requête", "Formats acceptés en réponse"],
          ["`Accept-Language`", "Requête", "Langues préférées"],
          ["`User-Agent`", "Requête", "Identification du client"],
          ["`Cache-Control`", "Les deux", "Directives de cache"],
          ["`ETag` / `If-None-Match`", "Réponse / Requête", "Validation de cache"],
          ["`Set-Cookie` / `Cookie`", "Réponse / Requête", "Gestion de session"],
          ["`Location`", "Réponse", "Cible de redirection ou de création"],
          ["`Retry-After`", "Réponse", "Délai avant de réessayer (429/503)"],
          ["`WWW-Authenticate`", "Réponse", "Schéma d'auth requis (avec 401)"],
        ],
      },
    ],
  },
  {
    id: "content-negotiation",
    title: "Négociation de contenu",
    level: 3,
    intro:
      "Client et serveur s'accordent sur le format : le dialogue `Accept`.",
    blocks: [
      {
        kind: "text",
        text: "Le client annonce ce qu'il accepte (`Accept: application/json`), le serveur répond dans un format compatible (`Content-Type: application/json`) ou `406 Not Acceptable` s'il ne peut pas. Même mécanisme pour la langue (`Accept-Language`) et l'encodage (`Accept-Encoding: gzip`).",
      },
      {
        kind: "code",
        language: "bash",
        title: "Demander du JSON explicitement",
        code: `curl -H "Accept: application/json" https://api.exemple.com/users/42`,
      },
      {
        kind: "text",
        text: "En pratique, la plupart des APIs ignorent la négociation fine et servent toujours du JSON — mais le mécanisme existe et les bonnes APIs le respectent. Côté serveur, honorer `Accept` fait partie du contrat REST.",
      },
    ],
  },
  {
    id: "cache",
    title: "Cache HTTP",
    level: 3,
    intro:
      "Éviter de redemander : les deux mécanismes de cache.",
    blocks: [
      {
        kind: "fields",
        title: "Fraîcheur et validation",
        fields: [
          {
            label: "Fraîcheur (`Cache-Control`)",
            value:
              "`max-age=3600` : la réponse est réutilisable pendant une heure sans contacter le serveur. `no-cache` : revalider à chaque fois. `no-store` : ne jamais stocker (données sensibles).",
          },
          {
            label: "Validation (`ETag`)",
            value:
              "Le serveur joint un identifiant de version (`ETag: \"abc\"`). Le client renvoie `If-None-Match: \"abc\"` : si inchangé, le serveur répond `304 Not Modified` sans corps — économie de bande passante.",
          },
          {
            label: "Heuristique",
            value:
              "Sans directives explicites, les caches peuvent appliquer des règles par défaut basées sur `Last-Modified` : imprévisible, à éviter pour les APIs.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le cache HTTP concerne les méthodes sûres (GET, HEAD). Pour les APIs, la règle d'or : `Cache-Control` explicite sur chaque réponse, `ETag` sur les ressources coûteuses. Un `GET` qui retourne des données périmées est presque toujours un problème de directives, pas de « bug du navigateur ».",
      },
    ],
  },
  {
    id: "redirections",
    title: "Redirections",
    level: 3,
    intro:
      "Suivre les 3xx : ce qui se passe quand une ressource a déménagé.",
    blocks: [
      {
        kind: "command",
        label: "Suivre les redirections",
        command: "curl -L -o /dev/null -w \"%{url_effective}\" https://example.com",
        why: "`-L` demande à curl de suivre les redirections automatiquement (jusqu'à 50 par défaut) ; `%{url_effective}` affiche l'URL finale. Sans `-L`, curl s'arrête à la première 3xx et affiche les en-têtes de redirection.",
      },
      {
        kind: "table",
        headers: ["Code", "Sémantique"],
        rows: [
          ["301 / 308", "Permanente : mettre à jour les liens et bookmarks (308 préserve la méthode)"],
          ["302 / 307", "Temporaire : continuer d'utiliser l'URL d'origine (307 préserve la méthode)"],
          ["303", "Voir ailleurs : le client refait un GET sur `Location` (classique après POST)"],
        ],
      },
    ],
  },
  {
    id: "cookies-detail",
    title: "Cookies en détail",
    level: 3,
    intro:
      "Les attributs qui font un cookie sûr — ou dangereux.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Un Set-Cookie complet",
        code: `Set-Cookie: session=abc123; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
      },
      {
        kind: "table",
        headers: ["Attribut", "Effet"],
        rows: [
          ["`HttpOnly`", "Inaccessible à JavaScript : protège du vol via XSS"],
          ["`Secure`", "Envoyé uniquement en HTTPS"],
          ["`SameSite=Lax/Strict`", "Limite l'envoi cross-site : protège du CSRF"],
          ["`Path` / `Domain`", "Portée du cookie : quelles URLs le reçoivent"],
          ["`Max-Age` / `Expires`", "Durée de vie ; sans eux, cookie de session (supprimé à la fermeture)"],
        ],
      },
      {
        kind: "text",
        text: "Un cookie de session sans `HttpOnly` ni `Secure` ni `SameSite` est une vulnérabilité en attente. Côté développement, l'onglet Application des devtools montre les cookies posés avec leurs attributs — la première chose à vérifier quand une session ne « tient » pas.",
      },
    ],
  },
  {
    id: "cors",
    title: "CORS",
    level: 3,
    intro:
      "Pourquoi le navigateur bloque des requêtes que curl autorise.",
    blocks: [
      {
        kind: "text",
        text: "CORS (Cross-Origin Resource Sharing) est un mécanisme du navigateur : par défaut, une page ne peut appeler que son origine (même protocole + domaine + port). Pour autoriser d'autres origines, le serveur envoie des en-têtes `Access-Control-Allow-Origin` (et associés).",
      },
      {
        kind: "diagram",
        title: "Requête simple vs preflight",
        lines: [
          "[Requête simple (GET, POST formulaire)]",
          "   navigateur → serveur → réponse",
          "   le navigateur vérifie Allow-Origin",
          "   │",
          "[Requête complexe (PUT, JSON, Authorization)]",
          "   navigateur → OPTIONS (preflight) → serveur",
          "   serveur → Allow-Methods, Allow-Headers",
          "   navigateur → vraie requête → réponse",
        ],
      },
      {
        kind: "text",
        text: "Point crucial : CORS est une protection du navigateur, pas du serveur — `curl` n'est jamais bloqué. Une erreur CORS se corrige donc côté serveur (en-têtes), jamais côté client en « désactivant la sécurité ». `Access-Control-Allow-Origin: *` convient aux API publiques ; les API avec credentials exigent une origine explicite.",
      },
    ],
  },
  {
    id: "auth-detail",
    title: "Schémas d'authentification",
    level: 3,
    intro:
      "Bearer, Basic, clés d'API : les schémas courants et leurs usages.",
    blocks: [
      {
        kind: "table",
        headers: ["Schéma", "Format", "Usage"],
        rows: [
          ["Bearer", "`Authorization: Bearer <token>`", "Tokens OAuth2/JWT : le standard des APIs"],
          ["Basic", "`Authorization: Basic <base64(user:pass)>`", "Simple mais faible : uniquement en HTTPS, de moins en moins utilisé"],
          ["Clé d'API", "En-tête dédié ou paramètre", "APIs simples : `X-API-Key: …`"],
          ["Digest", "Challenge/réponse", "Rare aujourd'hui, remplace Basic sans TLS dans des cas legacy"],
        ],
      },
      {
        kind: "text",
        text: "Basic n'est qu'un encodage base64 — pas un chiffrement : sans HTTPS, les identifiants sont lisibles. Les tokens Bearer ont une durée de vie limitée et se renouvellent (refresh tokens, voir api-integration). Quel que soit le schéma : HTTPS obligatoire, tokens hors des URLs, rotation en cas de fuite.",
      },
    ],
  },
  {
    id: "https-tls",
    title: "HTTPS et TLS en détail",
    level: 3,
    intro:
      "Ce qui se passe avant la première requête HTTP.",
    blocks: [
      {
        kind: "diagram",
        title: "Le handshake TLS (simplifié)",
        lines: [
          "[Client] ── ClientHello (versions, ciphers) ──▶ [Serveur]",
          "[Client] ◀── ServerHello + certificat ── [Serveur]",
          "[Client] ── vérifie le certificat ──▶ (autorité, domaine, dates)",
          "[Client] ◀── clés de session négociées ──▶ [Serveur]",
          "[HTTP chiffré dans le tunnel TLS]",
        ],
      },
      {
        kind: "list",
        items: [
          "Le certificat prouve l'identité du serveur : émis par une autorité reconnue, pour le bon domaine, non expiré.",
          "HSTS (`Strict-Transport-Security`) : le serveur ordonne au navigateur de ne plus jamais le contacter en HTTP.",
          "Let's Encrypt fournit des certificats gratuits et automatisés : plus aucune excuse pour du HTTP en production.",
          "Le contenu est chiffré, mais les métadonnées (domaine via SNI, tailles, timing) restent observables.",
        ],
      },
    ],
  },
  {
    id: "http-versions",
    title: "HTTP/2 et HTTP/3",
    level: 3,
    intro:
      "Les évolutions du protocole : même sémantique, transport amélioré.",
    blocks: [
      {
        kind: "table",
        headers: ["", "HTTP/1.1", "HTTP/2", "HTTP/3"],
        rows: [
          ["Transport", "TCP, une requête à la fois par connexion", "TCP, multiplexage", "QUIC (UDP), multiplexage sans blocage"],
          ["En-têtes", "Texte, répétés", "Binaires, compressés (HPACK)", "Compressés (QPACK)"],
          ["Problème résolu", "—", "Le head-of-line blocking applicatif", "Le head-of-line blocking TCP"],
          ["Sémantique", "Méthodes, statuts, en-têtes", "Identique", "Identique"],
        ],
      },
      {
        kind: "text",
        text: "L'essentiel : la sémantique (méthodes, statuts, en-têtes) est inchangée — tout ce qui est appris sur HTTP/1.1 reste valable. Les nouvelles versions optimisent le transport : multiplexage (plusieurs requêtes simultanées sur une connexion), compression des en-têtes, latence réduite. `curl --http2` / `--http3` permet d'observer la version négociée.",
      },
    ],
  },
  {
    id: "compression",
    title: "Compression",
    level: 3,
    intro:
      "Des corps plus légers : la négociation `Accept-Encoding`.",
    blocks: [
      {
        kind: "text",
        text: "Le client annonce `Accept-Encoding: gzip, br`, le serveur compresse et indique `Content-Encoding: gzip`. Les clients HTTP (navigateurs, curl avec `--compressed`) décompressent de façon transparente.",
      },
      {
        kind: "command",
        label: "Demander une réponse compressée",
        command: "curl --compressed -s -o /dev/null -w \"%{size_download}\" https://example.com",
        why: "`--compressed` annonce les encodages supportés et décompresse automatiquement ; `%{size_download}` affiche la taille réellement transférée. Comparer avec et sans l'option mesure le gain.",
      },
      {
        kind: "text",
        text: "Les formats déjà compressés (images, vidéos, archives) ne gagnent rien à la compression HTTP — elle concerne le texte (HTML, CSS, JS, JSON). Brotli (`br`) compresse mieux que gzip pour le texte ; zstd émerge comme alternative.",
      },
    ],
  },
  {
    id: "keep-alive",
    title: "Connexions persistantes",
    level: 3,
    intro:
      "Réutiliser la connexion : l'optimisation invisible.",
    blocks: [
      {
        kind: "text",
        text: "Établir une connexion (surtout TLS) coûte cher : le keep-alive la réutilise pour plusieurs requêtes. En HTTP/1.1 c'est le défaut (`Connection: keep-alive` implicite) ; en HTTP/2 et 3, le multiplexage va plus loin en entrelançant les requêtes.",
      },
      {
        kind: "list",
        items: [
          "Les clients HTTP sérieux (bibliothèques, navigateurs) gèrent un pool de connexions : ne pas recréer un client par requête.",
          "Côté serveur, les timeouts de keep-alive équilibrent réutilisation et consommation de ressources.",
          "En debugging, savoir que plusieurs requêtes partagent une connexion explique certains comportements (cookies, auth).",
        ],
      },
    ],
  },
  {
    id: "timeouts",
    title: "Timeouts",
    level: 3,
    intro:
      "Ne jamais attendre indéfiniment : les garde-fous temporels.",
    blocks: [
      {
        kind: "command",
        label: "Limiter le temps d'une requête",
        command: "curl --connect-timeout 5 --max-time 30 https://example.com",
        why: "`--connect-timeout` limite l'établissement de la connexion, `--max-time` la durée totale. Sans timeouts, un serveur silencieux bloque le client indéfiniment — en cascade, c'est un incident.",
      },
      {
        kind: "text",
        text: "Trois timeouts à distinguer : connexion (le serveur est-il joignable ?), réponse (le serveur répond-il ?), total (l'opération entière). Les bibliothèques HTTP les exposent séparément ; les valeurs dépendent du contexte (API interne : secondes ; traitement long : minutes, avec un design asynchrone).",
      },
    ],
  },
  {
    id: "debugging",
    title: "Déboguer le trafic HTTP",
    level: 3,
    intro:
      "Voir les échanges réels : les trois niveaux d'inspection.",
    blocks: [
      {
        kind: "command",
        label: "Mode verbeux de curl",
        command: "curl -v https://example.com",
        why: "Affiche la requête envoyée (lignes `>`) et la réponse reçue (lignes `<`), y compris le handshake TLS. Le premier outil quand une requête ne fait pas ce qu'on attend : on voit exactement ce qui part sur le réseau.",
      },
      {
        kind: "list",
        items: [
          "Onglet Réseau des devtools : requêtes de la page, en-têtes, corps, timing — avec les requêtes filtrées par type.",
          "`curl -v` : la vérité du terminal, sans interprétation du navigateur.",
          "Proxy d'inspection (mitmproxy, Charles) : voir le trafic d'applications qu'on ne contrôle pas, en installant un certificat local.",
          "Méthode : reproduire au plus simple (curl), comparer attendu vs réel octet par octet.",
        ],
      },
    ],
  },
  {
    id: "anatomie-url",
    title: "Anatomie d'une URL",
    level: 3,
    intro:
      "Chaque partie d'une URL a un nom et un rôle.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Décomposition",
        code: `https://user:pass@api.exemple.com:8443/v1/users?page=2#section\n^^^^^   ^^^^^^^^^   ^^^^^^^^^^^^^^^ ^^^^ ^^^^^^^^^ ^^^^^^^^^ ^^^\nschéma  infos auth      hôte          port  chemin    query   fragment`,
      },
      {
        kind: "fields",
        title: "Les parties",
        fields: [
          {
            label: "Schéma",
            value:
              "`https` : le protocole. Détermine le transport (et le port par défaut : 443).",
          },
          {
            label: "Hôte",
            value:
              "Le serveur visé. Peut être un nom de domaine ou une IP.",
          },
          {
            label: "Port",
            value:
              "Optionnel : 443 en HTTPS, 80 en HTTP par défaut. Les APIs exposent souvent des ports dédiés.",
          },
          {
            label: "Chemin",
            value:
              "La ressource : `/v1/users`. Vide = racine `/`.",
          },
          {
            label: "Query",
            value:
              "Les paramètres après `?` : filtres, pagination (section dédiée au niveau 2).",
          },
          {
            label: "Fragment",
            value:
              "Après `#` : jamais envoyé au serveur — utilisé côté client (ancre de page).",
          },
        ],
      },
    ],
  },
  {
    id: "requetes-conditionnelles",
    title: "Requêtes conditionnelles",
    level: 3,
    intro:
      "Ne télécharger que si ça a changé : l'autre face du cache.",
    blocks: [
      {
        kind: "text",
        text: "Au-delà de l'ETag : `If-Modified-Since` envoie la date de la version locale ; le serveur répond `304` si rien n'a changé depuis. Les deux mécanismes coexistent — l'ETag (identifiant opaque) est plus précis que la date (granularité à la seconde).",
      },
      {
        kind: "code",
        language: "bash",
        title: "Revalidation manuelle",
        code: `curl -H 'If-None-Match: "abc123"' -i https://api.exemple.com/doc/1\n# 304 Not Modified : la version locale est à jour, corps vide.\n# 200 OK : nouvelle version, le corps suit.`,
      },
    ],
  },
  {
    id: "range-requests",
    title: "Requêtes partielles",
    level: 3,
    intro:
      "Télécharger par morceaux : le statut 206.",
    blocks: [
      {
        kind: "text",
        text: "L'en-tête `Range: bytes=0-1023` demande les 1024 premiers octets ; le serveur répond `206 Partial Content` avec `Content-Range`. Usage : reprise de téléchargement interrompu, streaming vidéo (le lecteur demande des segments), prévisualisation de gros fichiers.",
      },
      {
        kind: "command",
        label: "Télécharger les premiers octets",
        command: "curl -r 0-99 -s -o /dev/null -w \"%{http_code}\" https://example.com",
        why: "`-r` définit la plage d'octets demandée. Un serveur qui supporte les ranges répond `206` ; sinon `200` avec le fichier entier — le code indique la capacité.",
      },
    ],
  },
  {
    id: "cookies-vs-tokens",
    title: "Cookies vs tokens",
    level: 3,
    intro:
      "Deux stratégies de session : choisir en connaissance de cause.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Cookies (session serveur)", "Tokens (Bearer/JWT)"],
        rows: [
          ["Stockage", "Navigateur, envoi automatique", "Client (mémoire, stockage), envoi manuel"],
          ["État serveur", "Session stockée côté serveur", "Souvent sans état (token auto-porteur)"],
          ["CSRF", "Vulnérable (requête forgée envoie le cookie)", "Non concerné (pas d'envoi automatique)"],
          ["XSS", "Protégé par `HttpOnly`", "Exposé si stocké en JS accessible"],
          ["Cross-domain", "Compliqué (SameSite, CORS)", "Naturel (en-tête explicite)"],
          ["Usage typique", "Applications web classiques", "APIs, mobiles, SPAs"],
        ],
      },
      {
        kind: "text",
        text: "Pas de vainqueur universel : les cookies excellent pour le web traditionnel (protection XSS via HttpOnly), les tokens pour les APIs consommées par des clients variés. L'hybride courant : cookie `HttpOnly` contenant le token, avec protection CSRF.",
      },
    ],
  },
  {
    id: "rate-limit-headers",
    title: "En-têtes de rate limiting",
    level: 3,
    intro:
      "Lire les quotas avant de les heurter.",
    blocks: [
      {
        kind: "text",
        text: "Les APIs bien conçues annoncent leurs quotas dans les réponses : `X-RateLimit-Limit` (quota total), `X-RateLimit-Remaining` (restant), `X-RateLimit-Reset` (réinitialisation, timestamp). En cas de dépassement : `429` avec `Retry-After` (secondes à attendre).",
      },
      {
        kind: "code",
        language: "bash",
        title: "Lire les quotas d'une réponse",
        code: `curl -s -D - -o /dev/null https://api.github.com/users/octocat | grep -i ratelimit\n# -D - : affiche les en-têtes sur stdout.`,
      },
      {
        kind: "text",
        text: "Un client robuste lit ces en-têtes et ralentit avant le 429 plutôt que de le subir. Le standard en cours (RFC de draft `RateLimit-*`) harmonise les noms, mais les variantes `X-RateLimit-*` restent dominantes.",
      },
    ],
  },
  {
    id: "versioning-api",
    title: "Versionner une API",
    level: 3,
    intro:
      "Faire évoluer sans casser : les stratégies de versionnage.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Exemple", "Avantages / limites"],
        rows: [
          ["Dans l'URL", "`/v1/users`, `/v2/users`", "Explicite, cachable ; URLs multiples"],
          ["En-tête", "`Accept: application/vnd.api.v2+json`", "URL stable ; moins visible, plus complexe"],
          ["Paramètre", "`?version=2`", "Simple ; pollue la query, mal cachée"],
        ],
      },
      {
        kind: "text",
        text: "Le versionnage dans l'URL est le plus répandu pour les API publiques : lisible, testable dans un navigateur, compatible avec le cache. Règle d'or : ne jamais casser une version publiée — on ajoute une version, on déprécie l'ancienne avec un préavis.",
      },
    ],
  },
  {
    id: "proxy",
    title: "Proxies",
    level: 3,
    intro:
      "Les intermédiaires : forward, reverse, et ce qu'ils changent.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Forward proxy", "Reverse proxy"],
        rows: [
          ["Position", "Côté client", "Côté serveur"],
          ["Rôle", "Le client passe par lui pour sortir", "Les clients passent par lui pour atteindre le serveur"],
          ["Usages", "Filtrage, anonymisation, cache d'entreprise", "Répartition de charge, TLS, cache, WAF"],
          ["En-têtes", "—", "`X-Forwarded-For`, `X-Forwarded-Proto` (IP et protocole d'origine)"],
        ],
      },
      {
        kind: "text",
        text: "Derrière un reverse proxy, l'application voit l'IP du proxy, pas du client : `X-Forwarded-For` transmet l'originale — à ne faire confiance qu'aux proxies connus. Les CDN (Cloudflare, etc.) sont des reverse proxies géants avec cache mondial.",
      },
    ],
  },
  {
    id: "websockets",
    title: "WebSockets",
    level: 3,
    intro:
      "Au-delà de la requête-réponse : le canal bidirectionnel.",
    blocks: [
      {
        kind: "text",
        text: "WebSocket établit une connexion persistante bidirectionnelle : il démarre par une requête HTTP avec `Upgrade: websocket`, puis le canal devient un échange de messages dans les deux sens. Usage : chat temps réel, notifications push, jeux, collaboration.",
      },
      {
        kind: "list",
        items: [
          "HTTP reste pour le requête-réponse ; WebSocket pour le temps réel bidirectionnel.",
          "Alternative plus simple pour du serveur-vers-client seul : les Server-Sent Events (SSE).",
          "Coût : connexions persistantes = ressources serveur — à dimensionner.",
        ],
      },
    ],
  },
  {
    id: "sse",
    title: "Server-Sent Events",
    level: 3,
    intro:
      "Le serveur qui parle en premier : le flux unidirectionnel simple.",
    blocks: [
      {
        kind: "text",
        text: "Les SSE sont une réponse HTTP qui ne se termine jamais : le serveur envoie des événements texte (`data: …`) au fil de l'eau, le client les reçoit via `EventSource` en JavaScript. Bien plus simple que WebSocket quand seul le sens serveur → client est nécessaire.",
      },
      {
        kind: "code",
        language: "bash",
        title: "À quoi ressemble le flux",
        code: `Content-Type: text/event-stream\n\ndata: {"progression": 25}\n\ndata: {"progression": 50}\n\n# Chaque événement = lignes data: séparées par une ligne vide.`,
      },
      {
        kind: "text",
        text: "Cas typiques : barres de progression, notifications, flux d'activité. Limites : texte uniquement, pas de bidirectionnel, nombre de connexions simultanées limité par navigateur (d'où HTTP/2 qui aide).",
      },
    ],
  },
  {
    id: "clients-http",
    title: "Clients HTTP en code",
    level: 3,
    intro:
      "De curl au code : `fetch` et les bibliothèques.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "fetch : le client natif",
        code: `const reponse = await fetch("https://api.exemple.com/users", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ nom: "Akane" }),\n});\n\nif (!reponse.ok) {\n  throw new Error("HTTP " + reponse.status);\n}\nconst data = await reponse.json();`,
      },
      {
        kind: "list",
        items: [
          "`fetch` est natif aux navigateurs et à Node.js moderne : pas de dépendance pour les besoins simples.",
          "Piège connu : `fetch` ne rejette que sur erreur réseau — un 404 ne lève pas d'exception, d'où le test `reponse.ok`.",
          "Bibliothèques (axios, ky, got) : timeouts simples, retries, intercepteurs — le confort pour les clients complexes.",
          "Règle : centraliser la configuration (base URL, headers d'auth, gestion d'erreurs) dans un client partagé, pas dans chaque appel.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques, côté client HTTP.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Remède"],
        rows: [
          ["`401` alors que le token semble bon", "Token expiré ou mal formé (`Bearer` oublié)", "Renouveler, vérifier le format exact"],
          ["`403` après authentification réussie", "Droits insuffisants (pas un problème d'identité)", "Vérifier les permissions / scopes"],
          ["`404` sur une URL qui existe", "Méthode fausse ou paramètre mal placé", "Vérifier méthode + URL exacte"],
          ["`415 Unsupported Media Type`", "`Content-Type` absent ou incorrect", "Déclarer le format du corps"],
          ["Erreur CORS dans le navigateur", "En-têtes CORS manquants côté serveur", "Corriger côté serveur, pas côté client"],
          ["Cookie de session perdu", "Attributs `SameSite`/`Secure` ou domaine", "Inspecter le `Set-Cookie` dans les devtools"],
          ["Réponse vide / timeout", "Serveur silencieux, pas de timeout configuré", "Ajouter des timeouts, vérifier côté serveur"],
          ["`curl: (60) SSL`", "Certificat invalide ou autorité inconnue", "Corriger le certificat (pas `-k` en production)"],
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets progressifs pour ancrer les réflexes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Inspecteur de site",
            detail:
              "Script qui, pour une liste d'URLs, affiche statut, temps de réponse, redirections suivies et en-têtes de cache (`curl -s -o /dev/null -w` avec les variables de format). Objectif : lire le protocole en conditions réelles.",
          },
          {
            title: "Projet 2 — Client d'API complet",
            detail:
              "En Node.js ou Python, écrire un client pour une API publique : authentification, pagination, gestion des 429 avec attente `Retry-After`, retries des 5xx. Objectif : le client robuste.",
          },
          {
            title: "Projet 3 — Mini-serveur HTTP",
            detail:
              "Avec le module `http` de Node.js, servir des routes GET/POST en JSON avec les bons statuts (200, 201, 404), puis tester chaque route avec `curl -v`. Objectif : comprendre le protocole depuis l'autre côté.",
          },
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
            label: "MDN — HTTP",
            value:
              "developer.mozilla.org : la référence pratique — méthodes, statuts, en-têtes, CORS, cache, avec exemples.",
          },
          {
            label: "RFC 9110-9114",
            value:
              "Les spécifications officielles (sémantique, cache, HTTP/2, HTTP/3) : la source ultime, dense mais définitive.",
          },
          {
            label: "curl docs",
            value:
              "curl.se/docs : le manuel de l'outil et ses centaines d'options documentées.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : l'onglet Réseau des devtools reste le meilleur terrain d'observation quotidien.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "HTTP maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le format : `json` — ce que transportent la plupart des corps HTTP.",
          "L'usage : `api-integration` — authentification, pagination, retry, webhooks.",
          "La conception : `api-rest` — dessiner des APIs qui exploitent bien le protocole.",
          "La sécurité : `web-security` — TLS, cookies sûrs, CORS, injections.",
          "Revenir à la roadmap : valider HTTP et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

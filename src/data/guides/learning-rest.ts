import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de REST : des ressources aux APIs de production.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_REST: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est REST, pourquoi c'est le standard des APIs web et ce que ça change concrètement.",
    blocks: [
      {
        kind: "text",
        text: "REST est un style d'architecture pour concevoir des APIs web : les données sont exposées comme des ressources adressées par des URLs, manipulées avec les verbes HTTP, dans des échanges sans état. Quand votre frontend affiche la liste des utilisateurs, il fait probablement `GET /users` — c'est REST.",
      },
      {
        kind: "text",
        text: "Pourquoi REST domine : avant lui, chaque API inventait ses propres conventions — il fallait lire une documentation épaisse pour chaque intégration. REST impose une grammaire partagée (ressources, verbes, statuts) : un développeur qui connaît cette grammaire devine le comportement d'une API qu'il n'a jamais vue.",
      },
      {
        kind: "text",
        text: "REST est le contrat standard entre un frontend et un backend, et entre services. Savoir modéliser des ressources, choisir les bons verbes et statuts, gérer la pagination et l'authentification permet de construire des APIs prévisibles que d'autres développeurs utilisent sans friction.",
      },
    ],
  },
  {
    id: "rest-style-pas-protocole",
    title: "REST est un style, pas un protocole",
    level: 1,
    intro:
      "La distinction qui évite bien des confusions : REST ne définit aucun format sur le fil.",
    blocks: [
      {
        kind: "diagram",
        title: "Où se situe REST",
        lines: [
          "HTTP (protocole : transporte les requêtes)",
          "     │",
          "     ▼",
          "REST (style : comment organiser ressources et verbes)",
          "     │",
          "     ▼",
          "JSON (format : comment les données sont écrites)",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : HTTP transporte, REST organise, JSON représente. On peut faire du REST sans JSON (XML, par exemple), et on peut échanger du JSON sans faire du REST (un simple `POST /rpc` fourre-tout). Une API « REST » qui expose `POST /getUsers` n'est pas REST : elle utilise HTTP comme un tunnel, pas comme un langage.",
      },
      {
        kind: "list",
        items: [
          "REST = des conventions d'organisation au-dessus de HTTP, pas une technologie à installer.",
          "Il n'y a pas de certification REST : une API est plus ou moins REST selon qu'elle respecte les contraintes du style.",
          "La plupart des APIs « REST » du monde réel sont pragmatiques : elles suivent l'esprit sans l'orthodoxie totale.",
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
      "REST est une grammaire au-dessus de HTTP : il faut connaître la langue de base.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "HTTP (`http`)",
            value:
              "Maîtriser méthodes, codes de statut et en-têtes : REST les utilise comme grammaire. Sans HTTP, REST n'a aucun sens.",
          },
          {
            label: "JSON (`json`)",
            value:
              "Savoir lire et produire du JSON : c'est le format de presque toutes les réponses REST.",
          },
          {
            label: "URLs et requêtes",
            value:
              "Comprendre la structure d'une URL (chemin, paramètres de requête) : c'est là que vivent les ressources.",
          },
          {
            label: "Un langage backend (au choix)",
            value:
              "Node.js, Python, PHP… : pour construire une API, pas seulement la consommer. Les exemples utilisent `curl`, agnostique du langage.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-et-urls",
    title: "Ressources et URLs",
    level: 2,
    intro:
      "Le cœur de REST : penser en ressources nommées, pas en actions.",
    blocks: [
      {
        kind: "text",
        text: "Une ressource est une chose adressable : un utilisateur, un article, une commande. Son URL est son nom : `/users/42`, `/articles/2024/mon-article`. Les URLs utilisent des noms pluriels (`/users`, pas `/user`) et décrivent des choses, pas des actions (`/users`, pas `/getUsers`).",
      },
      {
        kind: "code",
        language: "bash",
        title: "Des URLs qui racontent une histoire",
        code: "GET    /articles              # la collection\nGET    /articles/42           # un élément\nGET    /articles/42/comments  # une sous-collection\nGET    /users/7/articles      # les articles d'un utilisateur",
      },
      {
        kind: "text",
        text: "Les relations s'expriment par imbrication : `/articles/42/comments` = les commentaires de l'article 42. On limite l'imbrication à deux niveaux — au-delà, les URLs deviennent illisibles et rigides.",
      },
    ],
  },
  {
    id: "verbes-http",
    title: "Les verbes HTTP",
    level: 2,
    intro:
      "Cinq verbes, chacun avec une sémantique précise qui rend l'API prévisible.",
    blocks: [
      {
        kind: "table",
        headers: ["Verbe", "Rôle", "Exemple"],
        rows: [
          ["`GET`", "Lire une ressource ou une collection", "`GET /users/42`"],
          ["`POST`", "Créer dans une collection, ou déclencher une action", "`POST /users`"],
          ["`PUT`", "Remplacer entièrement une ressource", "`PUT /users/42`"],
          ["`PATCH`", "Modifier partiellement une ressource", "`PATCH /users/42`"],
          ["`DELETE`", "Supprimer une ressource", "`DELETE /users/42`"],
        ],
      },
      {
        kind: "text",
        text: "La règle d'or : le verbe dit l'intention, l'URL dit la cible. `DELETE /users/42` supprime l'utilisateur 42 — pas besoin d'un `POST /deleteUser`. Une API où chaque verbe est utilisé pour son vrai sens se devine sans documentation.",
      },
    ],
  },
  {
    id: "codes-de-statut",
    title: "Les codes de statut",
    level: 2,
    intro:
      "Le statut HTTP raconte le résultat avant même de lire le corps de la réponse.",
    blocks: [
      {
        kind: "table",
        headers: ["Statut", "Signification", "Quand le renvoyer"],
        rows: [
          ["`200`", "OK", "Lecture ou mise à jour réussie"],
          ["`201`", "Created", "Création réussie — avec la ressource créée et son URL"],
          ["`204`", "No Content", "Suppression réussie, rien à renvoyer"],
          ["`400`", "Bad Request", "Requête mal formée"],
          ["`401`", "Unauthorized", "Authentification manquante ou invalide"],
          ["`403`", "Forbidden", "Authentifié, mais pas autorisé"],
          ["`404`", "Not Found", "Ressource inexistante"],
          ["`422`", "Unprocessable Entity", "Données bien formées mais invalides (validation)"],
          ["`429`", "Too Many Requests", "Quota dépassé"],
          ["`500`", "Internal Server Error", "Bug côté serveur — jamais de détail interne au client"],
        ],
      },
      {
        kind: "text",
        text: "`401` vs `403` : 401 = « qui êtes-vous ? » (authentifiez-vous), 403 = « je sais qui vous êtes, et non » (pas les droits). `404` vs `422` : 404 = la ressource n'existe pas, 422 = elle existe mais vos données sont invalides. Ces distinctions rendent les erreurs actionnables par le client.",
      },
    ],
  },
  {
    id: "curl-premieres-requetes",
    title: "Premières requêtes avec curl",
    level: 2,
    intro:
      "Parler à une API REST depuis le terminal, en comprenant chaque option.",
    blocks: [
      {
        kind: "command",
        label: "Lire une ressource",
        command: "curl http://localhost:3000/users/42",
        why: "Un simple GET : `curl` affiche le corps de la réponse (en JSON normalement). C'est la requête la plus fréquente — lecture d'une ressource par son URL.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:3000/users/42",
      },
      {
        kind: "command",
        label: "Créer une ressource",
        command: "curl -X POST http://localhost:3000/users -H \"Content-Type: application/json\" -d '{\"nom\":\"Akane\"}'",
        why: "`-X POST` choisit le verbe, `-H` déclare le format envoyé (JSON), `-d` fournit le corps. Le serveur doit répondre `201` avec la ressource créée.",
      },
      {
        kind: "command",
        label: "Voir les en-têtes de réponse",
        command: "curl -i http://localhost:3000/users/42",
        why: "`-i` affiche les en-têtes puis le corps : on y vérifie le statut réel, le `Content-Type`, les en-têtes de pagination ou de rate limiting. Indispensable pour debugger.",
      },
      {
        kind: "text",
        text: "L'option de vérification utilise `-w \"%{http_code}\"` : elle n'affiche que le code de statut. Utile pour tester rapidement une API sans lire tout le JSON.",
      },
    ],
  },
  {
    id: "reponses-json",
    title: "Structurer les réponses JSON",
    level: 2,
    intro:
      "Des réponses prévisibles : enveloppes, collections, erreurs.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Conventions de réponse",
        code: "// Ressource unique\n{ \"id\": 42, \"nom\": \"Akane\", \"role\": \"admin\" }\n\n// Collection paginée\n{\n  \"data\": [ { \"id\": 42, \"nom\": \"Akane\" } ],\n  \"page\": 2,\n  \"par_page\": 20,\n  \"total\": 137\n}\n\n// Erreur\n{ \"erreur\": \"validation\", \"details\": { \"email\": \"format invalide\" } }",
      },
      {
        kind: "text",
        text: "Conventions qui évitent les surprises : les collections sont enveloppées (pour ajouter la pagination sans casser le format), les dates sont en ISO 8601 (`2026-09-29T10:30:00Z`), les erreurs ont une structure stable avec un code machine lisible en plus du message humain.",
      },
    ],
  },
  {
    id: "parametres-requete",
    title: "Paramètres de requête",
    level: 2,
    intro:
      "Filtrer, trier et paginer via l'URL.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Query params en action",
        code: "GET /articles?statut=publie&auteur=7\nGET /articles?tri=date&ordre=desc\nGET /articles?page=2&par_page=20\nGET /articles?recherche=redis&champs=titre,resume",
      },
      {
        kind: "text",
        text: "Les paramètres de requête (`?clé=valeur`) servent à tout ce qui n'identifie pas une ressource mais modifie la vue : filtres, tri, pagination, recherche, sélection de champs. Ils ne font jamais partie du chemin de la ressource elle-même.",
      },
    ],
  },
  {
    id: "authentification-simple",
    title: "Authentification : les bases",
    level: 2,
    intro:
      "Prouver son identité : les deux mécanismes les plus courants.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Clé d'API et token Bearer",
        code: "# Clé d'API (services server-to-server)\ncurl http://localhost:3000/data -H \"X-API-Key: cle_secrete_123\"\n\n# Token Bearer (utilisateurs, JWT ou opaque)\ncurl http://localhost:3000/profil -H \"Authorization: Bearer eyJhbG...\"",
      },
      {
        kind: "text",
        text: "La clé d'API identifie un projet ou une intégration — simple, mais à protéger comme un mot de passe et à pouvoir révoquer. Le token Bearer (souvent un JWT) identifie un utilisateur après login : il voyage dans l'en-tête `Authorization` et expire après une durée limitée. Dans les deux cas : uniquement sur HTTPS, jamais dans l'URL (les URLs finissent dans les logs).",
      },
    ],
  },
  {
    id: "pagination-bases",
    title: "Pagination : les bases",
    level: 2,
    intro:
      "Ne jamais renvoyer des millions d'objets d'un coup.",
    blocks: [
      {
        kind: "text",
        text: "Une collection sans pagination est une bombe à retardement : elle fonctionne avec 100 éléments et s'effondre avec 100 000. La pagination par offset (`?page=2&par_page=20`) est la plus simple à comprendre et à implémenter — suffisante pour la plupart des interfaces d'administration et des listes.",
      },
      {
        kind: "list",
        items: [
          "Toujours une limite par défaut (ex. 20) et un maximum (ex. 100) : le client ne doit pas pouvoir demander l'infini.",
          "Renvoyer le total et la page courante pour que le client construise sa navigation.",
          "Limite de l'offset : sur de gros volumes, `page=10000` reste coûteux pour la base — les curseurs sont l'étape suivante (niveau 3).",
        ],
      },
    ],
  },
  {
    id: "outils",
    title: "Outils : Postman et alternatives",
    level: 2,
    intro:
      "Explorer une API sans écrire de code.",
    blocks: [
      {
        kind: "fields",
        title: "Outillage",
        fields: [
          {
            label: "`curl`",
            value:
              "Le client universel en ligne de commande : requêtes ad hoc, scripts, tests rapides. Toujours disponible.",
          },
          {
            label: "Postman",
            value:
              "L'outil graphique de référence : collections de requêtes, environnements (dev/prod), tests automatisés, documentation générée.",
          },
          {
            label: "HTTPie",
            value:
              "Une alternative moderne à `curl` en ligne de commande, avec une syntaxe plus lisible et un affichage coloré du JSON.",
          },
          {
            label: "Extensions navigateur",
            value:
              "Pour les GET rapides pendant le développement — limitées dès qu'il faut des en-têtes d'authentification.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging : premiers réflexes",
    level: 2,
    intro:
      "Quand l'API ne répond pas comme prévu, vérifier dans cet ordre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire le statut",
            detail: "`curl -i` : un 404 pointe vers l'URL, un 401/403 vers l'authentification, un 422 vers les données envoyées, un 500 vers le serveur.",
          },
          {
            title: "Vérifier la méthode",
            detail: "Un `405 Method Not Allowed` ou un comportement inattendu vient souvent d'un mauvais verbe (`GET` au lieu de `POST`).",
          },
          {
            title: "Contrôler les en-têtes",
            detail: "`Content-Type: application/json` oublié à l'envoi = le serveur ne parse pas le corps. Token `Authorization` mal formé = 401.",
          },
          {
            title: "Valider le JSON",
            detail: "Une virgule en trop ou un guillemet mal fermé dans `-d` produit un 400. Passez le corps dans un validateur JSON en cas de doute.",
          },
          {
            title: "Lire les logs serveur",
            detail: "Pour un 500 : les logs de l'application donnent la vraie erreur. Ne jamais exposer la stack trace au client.",
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
      "Trois projets pour passer de consommateur à concepteur d'API.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Consommer une API publique",
            detail: "Avec `curl` ou Postman : lister des ressources, paginer, filtrer. Observez les conventions (nommage, statuts, pagination) — c'est une revue de design gratuite.",
          },
          {
            title: "Concevoir une API de blog",
            detail: "Ressources : articles, commentaires, utilisateurs. Définissez les routes, verbes et statuts sur papier avant d'écrire la moindre ligne de code.",
          },
          {
            title: "Implémenter et documenter",
            detail: "Implémentez l'API dans votre langage (Node.js/Express, Python/FastAPI…), avec validation des entrées, pagination et une documentation OpenAPI.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "contraintes-rest",
    title: "Les six contraintes de REST",
    level: 3,
    intro:
      "Ce que « REST » exige vraiment — et ce que le monde réel en retient.",
    blocks: [
      {
        kind: "fields",
        title: "Les contraintes",
        fields: [
          {
            label: "Client-serveur",
            value:
              "Séparation des responsabilités : le client gère l'interface, le serveur les données. Chacun évolue indépendamment.",
          },
          {
            label: "Sans état (stateless)",
            value:
              "Chaque requête contient tout son contexte : le serveur ne mémorise rien entre deux appels. C'est ce qui permet de répartir la charge sur N serveurs.",
          },
          {
            label: "Cacheable",
            value:
              "Les réponses déclarent si elles sont cachables (`Cache-Control`) : clients et intermédiaires peuvent resservir sans recontacter le serveur.",
          },
          {
            label: "Interface uniforme",
            value:
              "Ressources identifiées par URL, manipulées par les verbes, messages auto-descriptifs. La contrainte qui fait la prévisibilité.",
          },
          {
            label: "Système en couches",
            value:
              "Le client ne sait pas s'il parle au serveur final ou à un intermédiaire (proxy, CDN, passerelle) : l'architecture peut s'étoffer sans changer le contrat.",
          },
          {
            label: "Code à la demande (optionnel)",
            value:
              "Le serveur peut envoyer du code exécutable (historiquement : applets). La seule contrainte optionnelle — presque jamais utilisée.",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique, « sans état » et « interface uniforme » sont les deux contraintes qui comptent : une session stockée côté serveur casse le sans-état (d'où les tokens), et des URLs-verbes (`/getUsers`) cassent l'interface uniforme. HATEOAS, la partie la plus exigeante de l'interface uniforme, est presque toujours abandonnée — voir la section dédiée.",
      },
    ],
  },
  {
    id: "modelisation-ressources",
    title: "Modéliser des ressources",
    level: 3,
    intro:
      "L'exercice de design le plus important : découper le domaine en ressources.",
    blocks: [
      {
        kind: "text",
        text: "Méthode : listez les noms du domaine (utilisateur, article, commentaire, commande, paiement), pas les verbes. Chaque nom devient une collection (`/commandes`), chaque instance une ressource (`/commandes/128`). Les verbes du métier deviennent soit des verbes HTTP (`POST /commandes` = passer commande), soit des sous-ressources (`POST /commandes/128/annulation`).",
      },
      {
        kind: "list",
        items: [
          "Un nom = une ressource. Si vous hésitez entre deux découpages, préférez le plus fin : il est plus facile d'agréger que de découper après coup.",
          "Les actions qui ne sont ni création ni modification (recherche, calcul, export) restent des `GET`/`POST` sur des ressources dédiées (`POST /recherches`, `GET /rapports/ventes`).",
          "Évitez les ressources « fourre-tout » (`/api/action`) : chaque exception au modèle érode la prévisibilité de toute l'API.",
        ],
      },
    ],
  },
  {
    id: "nommage-urls",
    title: "Nommage des URLs",
    level: 3,
    intro:
      "Des conventions qui rendent les URLs lisibles et stables.",
    blocks: [
      {
        kind: "list",
        items: [
          "Noms pluriels pour les collections : `/users`, `/articles` — pas de mélange singulier/pluriel.",
          "Minuscules et tirets : `/articles/mes-articles` — pas de camelCase ni d'underscores dans les chemins.",
          "Pas de verbe dans l'URL : le verbe HTTP porte l'action (`DELETE /users/42`, pas `/users/42/delete`).",
          "Pas d'extension de format : `/users/42`, pas `/users/42.json` — le format se négocie via l'en-tête `Accept`.",
          "IDs opaques en chemin : `/users/42` ou un UUID — jamais d'information sensible (email, nom) dans l'URL.",
          "Imbrication limitée à deux niveaux : `/articles/42/comments` oui, `/a/1/b/2/c/3` non.",
          "Stabilité : une URL publiée est un contrat — on la versionne ou on la redirige, on ne la renomme pas silencieusement.",
        ],
      },
    ],
  },
  {
    id: "verbes-idempotence",
    title: "Verbes et idempotence",
    level: 3,
    intro:
      "La propriété qui rend les retries sûrs : rejouer une requête sans effet de bord supplémentaire.",
    blocks: [
      {
        kind: "table",
        headers: ["Verbe", "Idempotent", "Sûr (sans effet)", "Conséquence pratique"],
        rows: [
          ["`GET`", "Oui", "Oui", "Peut être rejoué, mis en cache, pré-chargé sans risque"],
          ["`PUT`", "Oui", "Non", "Rejouer écrase avec la même valeur : sans danger"],
          ["`DELETE`", "Oui", "Non", "Supprimer deux fois = même état final"],
          ["`PATCH`", "Ça dépend", "Non", "Idempotent seulement si l'opération l'est (ex. `statut=lu`, pas `compteur+1`)"],
          ["`POST`", "Non", "Non", "Rejouer crée un doublon — d'où les clés d'idempotence"],
        ],
      },
      {
        kind: "text",
        text: "En pratique réseau, les requêtes se perdent : un client qui n'a pas reçu la réponse ne sait pas si l'action a eu lieu. Avec des verbes idempotents, il rejoue sans crainte. Pour `POST`, la parade standard est la clé d'idempotence : le client envoie `Idempotency-Key: <uuid>`, le serveur ignore les doublons de clé.",
      },
    ],
  },
  {
    id: "statuts-en-detail",
    title: "Codes de statut en détail",
    level: 3,
    intro:
      "Aller au-delà des dix statuts courants : la grammaire complète.",
    blocks: [
      {
        kind: "table",
        headers: ["Famille", "Sens", "Exemples utiles"],
        rows: [
          ["`2xx`", "Succès", "`200` lecture, `201` création (+ en-tête `Location`), `202` accepté (traitement asynchrone), `204` succès sans contenu"],
          ["`3xx`", "Redirection", "`301`/`308` permanentes (changement d'URL versionnée), `304` non modifié (cache)"],
          ["`4xx`", "Erreur client", "`400` mal formé, `401` non authentifié, `403` interdit, `404` introuvable, `409` conflit, `422` invalide, `429` quota"],
          ["`5xx`", "Erreur serveur", "`500` bug, `502`/`503`/`504` passerelle indisponible — jamais de détail interne"],
        ],
      },
      {
        kind: "text",
        text: "Deux statuts sous-utilisés : `202 Accepted` pour les traitements asynchrones (le client interrogera ensuite le statut de la tâche) et `409 Conflict` quand l'état actuel interdit l'opération (ex. supprimer une ressource encore référencée). Et un anti-pattern : renvoyer `200` avec `{ \"success\": false }` — le statut doit porter le résultat, pas le corps.",
      },
    ],
  },
  {
    id: "en-tetes-utiles",
    title: "En-têtes HTTP utiles",
    level: 3,
    intro:
      "Le vocabulaire des en-têtes que toute API REST devrait parler.",
    blocks: [
      {
        kind: "table",
        headers: ["En-tête", "Direction", "Rôle"],
        rows: [
          ["`Content-Type`", "Les deux", "Format du corps (`application/json`)"],
          ["`Accept`", "Requête", "Format souhaité en réponse (négociation de contenu)"],
          ["`Authorization`", "Requête", "Identifiants (`Bearer <token>`)"],
          ["`Location`", "Réponse", "URL de la ressource créée (avec `201`)"],
          ["`ETag` / `If-None-Match`", "Les deux", "Cache conditionnel : `304` si inchangé"],
          ["`Cache-Control`", "Réponse", "Directives de cache (`max-age=60`)"],
          ["`Retry-After`", "Réponse", "Délai avant de réessayer (avec `429` ou `503`)"],
          ["`X-Request-Id`", "Les deux", "Identifiant de corrélation pour tracer une requête dans les logs"],
        ],
      },
    ],
  },
  {
    id: "negociation-contenu",
    title: "Négociation de contenu",
    level: 3,
    intro:
      "Même ressource, plusieurs représentations.",
    blocks: [
      {
        kind: "text",
        text: "Le client demande un format via `Accept: application/json`, le serveur répond avec ce format (ou `406 Not Acceptable` s'il ne le supporte pas). La même ressource `/rapport/ventes` peut ainsi se décliner en JSON pour l'application et en CSV pour l'export — sans changer d'URL.",
      },
      {
        kind: "text",
        text: "En pratique, la plupart des APIs ne négocient que le JSON et ignorent le reste — c'est acceptable tant que le `Content-Type` de réponse est toujours explicite. La négociation devient intéressante pour les APIs publiques multi-clients.",
      },
    ],
  },
  {
    id: "pagination-avancee",
    title: "Pagination avancée : offset vs curseurs",
    level: 3,
    intro:
      "Quand l'offset ne suffit plus : paginer sur de gros volumes changeants.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Offset (`?page=3`)", "Curseur (`?curseur=eyJ...`)"],
        rows: [
          ["Principe", "Sauter N éléments", "Reprendre après un marqueur opaque"],
          ["Coût base de données", "Croît avec la page (`OFFSET 100000` scanne)", "Constant (index sur le curseur)"],
          ["Données changeantes", "Doublons ou trous si des éléments sont insérés/supprimés pendant la navigation", "Stable : chaque élément vu une fois"],
          ["Navigation", "Accès direct à la page N", "Séquentielle uniquement (pas de « page 12 »)"],
          ["Usage", "Back-office, petits volumes", "Feeds, APIs publiques à fort volume"],
        ],
      },
      {
        kind: "text",
        text: "Le curseur est typiquement l'ID ou le timestamp du dernier élément vu, encodé de façon opaque pour ne pas exposer l'implémentation. Règle simple : offset pour l'humain qui navigue (back-office), curseur pour la machine qui consomme (synchronisations, feeds).",
      },
    ],
  },
  {
    id: "filtrage-tri-recherche",
    title: "Filtrage, tri et recherche",
    level: 3,
    intro:
      "Des conventions pour interroger les collections sans inventer un langage.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Conventions courantes",
        code: "GET /articles?statut=publie&statut=brouillon   # filtre multi-valeurs\nGET /articles?tri=-date,titre                 # tri (- = décroissant)\nGET /articles?date_apres=2026-01-01           # filtre par plage\nGET /articles?recherche=mot+cle               # recherche plein texte",
      },
      {
        kind: "text",
        text: "Restez simple et documenté : quelques opérateurs bien choisis valent mieux qu'un langage de requête complet à maintenir. Validez les champs de tri/filtrage côté serveur (liste blanche) — un `tri` injecté dans une requête SQL est une faille classique.",
      },
    ],
  },
  {
    id: "versioning",
    title: "Versionner une API",
    level: 3,
    intro:
      "Faire évoluer le contrat sans casser les clients existants.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Exemple", "Avantages / limites"],
        rows: [
          ["Dans l'URL", "`/v1/users`, `/v2/users`", "Explicite, facile à router et à tester — la plus répandue"],
          ["En-tête", "`Accept: application/vnd.api.v2+json`", "URLs propres, mais invisible et plus complexe à debugger"],
          ["Paramètre", "`/users?version=2`", "Simple, mais pollue les URLs et les caches"],
        ],
      },
      {
        kind: "text",
        text: "Règles de gouvernance : ne versionnez que les changements cassants (suppression/renommage de champ, changement de sémantique) — les ajouts de champs ou d'endpoints restent compatibles. Annoncez la dépréciation (`Deprecation`, `Sunset`) avec un délai raisonnable, et ne maintenez jamais plus de deux versions majeures en parallèle.",
      },
    ],
  },
  {
    id: "authentification-avancee",
    title: "Authentification avancée",
    level: 3,
    intro:
      "Comparer les mécanismes pour choisir en connaissance de cause.",
    blocks: [
      {
        kind: "table",
        headers: ["Mécanisme", "Principe", "Usage typique"],
        rows: [
          ["Clé d'API", "Secret partagé dans un en-tête", "Intégrations server-to-server simples"],
          ["HTTP Basic", "`Authorization: Basic base64(user:pass)`", "Prototypes, à éviter en production (envoie le mot de passe à chaque requête)"],
          ["Bearer / JWT", "Token signé, souvent à durée de vie courte", "Sessions utilisateur sans état côté serveur"],
          ["OAuth 2.0", "Délégation d'autorisation via un serveur dédié", "« Se connecter avec… », APIs publiques tierces"],
          ["mTLS", "Certificats client TLS", "Échanges inter-services à haute sécurité"],
        ],
      },
      {
        kind: "text",
        text: "JWT : le token contient les claims (identité, rôles, expiration) signés par le serveur — vérifiable sans aller en base, mais non révocable avant expiration (d'où des durées de vie courtes + refresh tokens). OAuth 2.0 : ne réimplémentez jamais vous-même le flux — utilisez une bibliothèque éprouvée.",
      },
    ],
  },
  {
    id: "hateoas",
    title: "HATEOAS : le chaînon manquant",
    level: 3,
    intro:
      "La partie de REST que presque personne n'implémente — et pourquoi c'est (presque) OK.",
    blocks: [
      {
        kind: "text",
        text: "HATEOAS (Hypermedia As The Engine Of Application State) : chaque réponse inclut les liens vers les actions possibles ensuite. Au lieu de deviner `/users/42/commandes`, le client suit le lien `commandes` fourni dans la réponse de `/users/42`. L'API devient navigable comme le web.",
      },
      {
        kind: "code",
        language: "json",
        title: "Réponse avec liens",
        code: "{\n  \"id\": 42,\n  \"nom\": \"Akane\",\n  \"_links\": {\n    \"self\": \"/users/42\",\n    \"commandes\": \"/users/42/commandes\",\n    \"avatar\": \"/users/42/avatar\"\n  }\n}",
      },
      {
        kind: "text",
        text: "Pourquoi c'est rare : le coût (payloads plus lourds, clients plus complexes) dépasse le bénéfice pour la plupart des APIs internes, où frontend et backend évoluent ensemble. En pratique, une documentation OpenAPI à jour remplit le même rôle avec moins de friction. HATEOAS garde du sens pour les APIs publiques très stables, conçues pour durer des années sans casser leurs clients.",
      },
    ],
  },
  {
    id: "rate-limiting-api",
    title: "Rate limiting côté API",
    level: 3,
    intro:
      "Protéger l'API des abus et du simple excès d'enthousiasme.",
    blocks: [
      {
        kind: "text",
        text: "Un quota par client (ex. 1000 requêtes/heure) protège des bugs (boucle infinie côté client) comme des abus. Implémentation classique : compteur en Redis avec fenêtre glissante, clé = identifiant du client. Quand le quota est dépassé : `429 Too Many Requests` avec `Retry-After` indiquant l'attente en secondes.",
      },
      {
        kind: "code",
        language: "bash",
        title: "En-têtes de quota (convention)",
        code: "HTTP/1.1 200 OK\nX-RateLimit-Limit: 1000\nX-RateLimit-Remaining: 973\nX-RateLimit-Reset: 1727592000\n\nHTTP/1.1 429 Too Many Requests\nRetry-After: 3600",
      },
      {
        kind: "text",
        text: "Exposez toujours l'état du quota dans les réponses : un client qui voit son compteur diminuer peut ralentir avant d'être bloqué. Différenciez les quotas par endpoint si nécessaire (la recherche coûte plus cher que la lecture d'un profil).",
      },
    ],
  },
  {
    id: "cache-http",
    title: "Cache HTTP",
    level: 3,
    intro:
      "Le cache le moins cher : celui que vous n'avez pas à écrire.",
    blocks: [
      {
        kind: "text",
        text: "Avant d'ajouter Redis, exploitez le cache HTTP natif : `Cache-Control: max-age=60` autorise clients et CDN à resservir la réponse sans vous contacter. Pour les ressources qui changent rarement mais de façon imprévisible, les validateurs (`ETag` + `If-None-Match`) permettent au client de vérifier en une requête légère — `304 Not Modified` si rien n'a changé.",
      },
      {
        kind: "list",
        items: [
          "Ressources publiques et stables : `Cache-Control: public, max-age=3600` — le CDN fait le travail.",
          "Données par utilisateur : `private` — cachable par le navigateur, pas par les intermédiaires.",
          "Jamais de cache sur les réponses d'erreur 5xx ou les requêtes authentifiées sensibles sans `private`.",
          "Le cache HTTP ne remplace pas le cache applicatif : il ne connaît que les GET.",
        ],
      },
    ],
  },
  {
    id: "documentation-openapi",
    title: "Documenter avec OpenAPI",
    level: 3,
    intro:
      "Le standard de documentation des APIs REST : lisible par l'humain et la machine.",
    blocks: [
      {
        kind: "text",
        text: "OpenAPI (ex-Swagger) décrit une API en YAML/JSON : endpoints, paramètres, schémas de réponse, authentification, exemples. De cette description découlent une documentation interactive (Swagger UI), des clients générés, et des tests de contrat.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Extrait de spécification OpenAPI",
        code: "paths:\n  /users/{id}:\n    get:\n      summary: Lire un utilisateur\n      parameters:\n        - name: id\n          in: path\n          required: true\n          schema: { type: integer }\n      responses:\n        '200':\n          description: L'utilisateur\n        '404':\n          description: Introuvable",
      },
      {
        kind: "text",
        text: "Deux approches : écrire la spec d'abord (design-first — recommandée pour les APIs publiques ou multi-équipes) ou la générer depuis le code (plus rapide, risque de dérive). Dans les deux cas, la documentation doit être testée comme du code : un exemple faux est pire que pas d'exemple.",
      },
    ],
  },
  {
    id: "erreurs-format",
    title: "Format d'erreur : RFC 7807",
    level: 3,
    intro:
      "Standardiser les erreurs pour qu'elles soient traitables par programme.",
    blocks: [
      {
        kind: "text",
        text: "La RFC 7807 (« Problem Details ») définit un format d'erreur standard : `type` (URI identifiant le problème), `title` (résumé humain), `status` (le code HTTP), `detail` (explication spécifique), `instance` (l'occurrence). Servi avec `Content-Type: application/problem+json`.",
      },
      {
        kind: "code",
        language: "json",
        title: "Erreur au format problem details",
        code: "{\n  \"type\": \"urn:problem:quota-depasse\",\n  \"title\": \"Quota d'appels dépassé\",\n  \"status\": 429,\n  \"detail\": \"Limite de 1000 requêtes par heure atteinte.\",\n  \"instance\": \"/users/42\"\n}",
      },
      {
        kind: "text",
        text: "L'intérêt : les clients peuvent traiter les erreurs par `type` (une URI stable et documentée) au lieu de parser des messages humains qui changent. Même sans adopter la RFC à la lettre, retenez le principe : des erreurs structurées, stables et documentées.",
      },
    ],
  },
  {
    id: "idempotence-conception",
    title: "Concevoir l'idempotence",
    level: 3,
    intro:
      "Rendre les opérations non idempotentes rejouables sans danger.",
    blocks: [
      {
        kind: "text",
        text: "Le scénario : un `POST /paiements` dont la réponse se perd — le client réessaie, et le client est débité deux fois. La parade : la clé d'idempotence. Le client génère un UUID par intention (`Idempotency-Key`), le serveur mémorise le résultat associé à cette clé pendant 24 h et rejoue la réponse mémorisée en cas de doublon — sans réexécuter l'action.",
      },
      {
        kind: "list",
        items: [
          "La clé identifie l'intention, pas la requête : deux intentions différentes = deux clés.",
          "Stockez la clé avant d'exécuter l'action, avec son résultat après — la fenêtre entre les deux doit être gérée (état « en cours »).",
          "Appliquez-la aux opérations à effet de bord non rejouable : paiements, envois, créations critiques.",
        ],
      },
    ],
  },
  {
    id: "webhooks-complement",
    title: "Webhooks : le complément temps réel",
    level: 3,
    intro:
      "REST est requête-réponse : les webhooks couvrent le sens inverse.",
    blocks: [
      {
        kind: "text",
        text: "Une API REST ne peut pas prévenir le client qu'un événement s'est produit — le client doit interroger (polling). Les webhooks inversent le sens : le serveur appelle une URL du client (`POST /evenements`) quand quelque chose se produit. Le duo standard : REST pour agir, webhooks pour être notifié.",
      },
      {
        kind: "text",
        text: "Voir la compétence `webhooks` pour le détail (signatures, retries, idempotence). Retenez ici : concevez vos événements avec la même rigueur que vos ressources — versionnés, documentés, avec des payloads stables.",
      },
    ],
  },
  {
    id: "securite-api",
    title: "Sécurité d'une API REST",
    level: 3,
    intro:
      "Les vulnérabilités spécifiques aux APIs, au-delà de l'authentification.",
    blocks: [
      {
        kind: "fields",
        title: "Points de vigilance",
        fields: [
          {
            label: "BOLA / IDOR",
            value:
              "Broken Object Level Authorization : `GET /users/43` alors qu'on est l'utilisateur 42. Chaque accès à un objet doit vérifier que l'appelant y a droit — la vulnérabilité API n°1.",
          },
          {
            label: "Exposition excessive",
            value:
              "Renvoyer l'objet base de données complet (hash de mot de passe, champs internes). Sélectionnez explicitement les champs exposés.",
          },
          {
            label: "Injection via tri/filtres",
            value:
              "Un paramètre `tri` concaténé dans du SQL. Liste blanche des champs autorisés, requêtes paramétrées.",
          },
          {
            label: "HTTPS partout",
            value:
              "Sans TLS, tokens et données transitent en clair. HSTS pour forcer le HTTPS, jamais d'API en HTTP pur.",
          },
          {
            label: "CORS",
            value:
              "Configurez précisément les origines autorisées : `Access-Control-Allow-Origin: *` avec des credentials est une faille.",
          },
          {
            label: "Rate limiting",
            value:
              "Sans quota, l'API est à la merci du premier script maladroit — ou malveillant (énumération d'IDs).",
          },
        ],
      },
    ],
  },
  {
    id: "performance-api",
    title: "Performance d'une API",
    level: 3,
    intro:
      "Les leviers qui comptent vraiment sur une API REST.",
    blocks: [
      {
        kind: "list",
        items: [
          "Problème N+1 : une collection de 50 éléments qui déclenche 50 requêtes base — résolu par jointures ou chargements groupés.",
          "Pagination stricte : limite par défaut et maximum, curseurs sur les gros volumes.",
          "Sélection de champs (`?champs=titre,resume`) : ne pas renvoyer 2 Ko par élément quand le client n'en affiche que deux lignes.",
          "Compression (`gzip`/`br`) : le JSON se compresse très bien, à activer systématiquement.",
          "Cache HTTP + cache applicatif : d'abord les en-têtes (`ETag`, `Cache-Control`), puis Redis pour les lectures coûteuses.",
          "Éviter les réponses géantes : au-delà de quelques centaines d'éléments, paginer n'est pas une option.",
          "Mesurer par endpoint (p50/p95/p99) : la moyenne cache les endpoints pathologiques.",
        ],
      },
    ],
  },
  {
    id: "ressources-imbriquees",
    title: "Ressources imbriquées et actions",
    level: 3,
    intro:
      "Gérer les cas qui ne rentrent pas dans le CRUD pur.",
    blocks: [
      {
        kind: "text",
        text: "Imbrication : `/articles/42/comments` pour les sous-collections strictement dépendantes du parent. Quand la sous-ressource a une vie propre, préférez une collection racine avec filtre (`/comments?article=42`).",
      },
      {
        kind: "code",
        language: "bash",
        title: "Actions métier modélisées en ressources",
        code: "POST /commandes/128/annulation      # sous-ressource d'action\nPOST /articles/42/publication      # changement d'état\nPOST /transferts                    # avec {de, vers, montant} dans le corps\nGET  /rapports/ventes?mois=2026-09 # ressource calculée",
      },
      {
        kind: "text",
        text: "Le principe : même les actions deviennent des ressources (une annulation, une publication, un transfert). On garde les verbes HTTP pour la mécanique et on exprime le métier dans les noms — l'API reste navigable et les actions restent traçables comme des ressources.",
      },
    ],
  },
  {
    id: "testing-api",
    title: "Tester une API",
    level: 3,
    intro:
      "Trois niveaux de tests, du plus rapide au plus réaliste.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Ce qu'on teste", "Outils"],
        rows: [
          ["Tests unitaires", "La logique métier isolée (validation, calculs)", "Le framework de test du langage"],
          ["Tests d'intégration", "Les endpoints contre une vraie base de test : statuts, payloads, erreurs", "Supertest, httpx, REST Assured selon le langage"],
          ["Tests de contrat", "La conformité à la spec OpenAPI : chaque endpoint respecte le contrat publié", "Dredd, Schemathesis, ou les tests Postman/Newman en CI"],
        ],
      },
      {
        kind: "text",
        text: "Cas à ne jamais oublier : authentification manquante (401), accès interdit (403), validation invalide (422), idempotence des `PUT`, pagination aux bornes, et comportement sous charge (le test de charge n'est pas optionnel avant un lancement).",
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand le statut ne suffit pas : tracer une requête de bout en bout.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "ID de corrélation",
            value:
              "Un `X-Request-Id` généré à l'entrée (ou propagé depuis le client) et loggé à chaque étape : on reconstitue le parcours complet d'une requête dans des logs distribués.",
          },
          {
            label: "Logs structurés",
            value:
              "Chaque requête loggée en JSON : méthode, chemin, statut, durée, user-id. Filtrables et agrégeables — pas de `console.log` dispersés.",
          },
          {
            label: "Rejeu minimal",
            value:
              "Reproduire avec `curl` la requête exacte (en-têtes inclus) : si ça échoue en `curl`, le problème est côté serveur ; sinon, côté client.",
          },
          {
            label: "Proxy d'inspection",
            value:
              "Un proxy local (type mitmproxy) entre le client et l'API montre le trafic réel, utile quand le client (mobile, SDK) masque les détails.",
          },
          {
            label: "Environnements",
            value:
              "Reproduire d'abord en local/dev avec les mêmes données : debugger en production est un aveu d'échec de l'outillage.",
          },
        ],
      },
    ],
  },
  {
    id: "graphql-vs-rest",
    title: "GraphQL vs REST",
    level: 3,
    intro:
      "Comparaison factuelle, sans guerre de religion.",
    blocks: [
      {
        kind: "table",
        headers: ["", "REST", "GraphQL"],
        rows: [
          ["Requêtes", "Un endpoint = une forme de réponse fixe", "Le client choisit les champs dans sa requête"],
          ["Sur/sous-fetching", "Fréquent (réponses fixes trop grosses ou trop petites)", "Éliminé par construction"],
          ["Cache HTTP", "Natif (URLs)", "Difficile (un seul endpoint POST)"],
          ["Courbe d'apprentissage", "Faible : HTTP suffit", "Plus forte : schéma, résolveurs"],
          ["Cas idéal", "APIs CRUD, intégrations simples, cache CDN", "Clients variés (mobile/web), agrégation de sources"],
        ],
      },
      {
        kind: "text",
        text: "Ce n'est pas un choix moral : beaucoup d'équipes exposent du REST pour les opérations simples et du GraphQL pour les écrans complexes qui agrègent plusieurs sources. Connaître REST rend l'apprentissage de GraphQL plus facile, pas l'inverse.",
      },
    ],
  },
  {
    id: "contrats-et-mocks",
    title: "Contrats et mocks",
    level: 3,
    intro:
      "Découpler frontend et backend pendant le développement.",
    blocks: [
      {
        kind: "text",
        text: "Le contrat (spec OpenAPI) permet aux deux équipes d'avancer en parallèle : le frontend développe contre un mock qui respecte le contrat, le backend implémente le contrat. Les mocks se génèrent depuis la spec (Stoplight Prism, par exemple) ou se codent à la main pour les prototypes.",
      },
      {
        kind: "text",
        text: "Le risque : la dérive entre le mock et l'implémentation réelle. Parade : des tests de contrat en CI qui valident l'API réelle contre la spec — le contrat est alors une source de vérité vérifiée, pas un document décoratif.",
      },
    ],
  },
  {
    id: "api-gateway",
    title: "API Gateway et BFF",
    level: 3,
    intro:
      "Le point d'entrée unique : authentification, routage et agrégation avant vos services.",
    blocks: [
      {
        kind: "text",
        text: "Une API gateway centralise les préoccupations transversales : authentification, rate limiting, routage vers les microservices, transformation de réponses. Le client ne parle qu'à la gateway — vos services restent simples et protégés derrière.",
      },
      {
        kind: "fields",
        title: "Concepts",
        fields: [
          {
            label: "Gateway",
            value:
              "Point d'entrée unique : TLS, auth, quotas, logs, routage. Indispensable dès qu'on expose plusieurs services.",
          },
          {
            label: "BFF (Backend for Frontend)",
            value:
              "Une API par client (web, mobile) qui agrège les appels aux services : le mobile reçoit exactement ce dont il a besoin, en un appel au lieu de dix.",
          },
          {
            label: "Agrégation",
            value:
              "La gateway/BFF appelle plusieurs services et compose la réponse — attention à la latence en cascade et aux pannes partielles.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "La gateway ne contient pas de logique métier : dès qu'elle en a, c'est un monolithe déguisé.",
          "Timeouts et circuit breakers à chaque appel aval : une gateway qui attend indéfiniment propage les pannes.",
          "Observez la gateway en premier quand « l'API est lente » : c'est là que se voient les latences par service.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les fautes de design les plus fréquentes dans les APIs REST.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Verbes dans les URLs",
            value:
              "Problème : `POST /getUsers`, `/deleteUser/42`. Solution : le verbe HTTP porte l'action, l'URL nomme la ressource.",
          },
          {
            label: "Toujours 200",
            value:
              "Problème : `200` avec `{success: false}` — les clients doivent parser le corps pour savoir si ça a marché. Solution : le statut HTTP porte le résultat.",
          },
          {
            label: "Pas de pagination",
            value:
              "Problème : `GET /users` renvoie tout — ça marche jusqu'au jour où ça ne marche plus. Solution : pagination dès le premier jour.",
          },
          {
            label: "Données sensibles dans l'URL",
            value:
              "Problème : tokens ou emails en query param — ils finissent dans les logs. Solution : en-têtes ou corps, jamais l'URL.",
          },
          {
            label: "Versionnage après coup",
            value:
              "Problème : changer un champ existant casse tous les clients. Solution : `/v1` dès le départ, changements cassants = nouvelle version.",
          },
          {
            label: "Erreurs en texte libre",
            value:
              "Problème : chaque endpoint invente son format d'erreur. Solution : un format unique et documenté (idéalement RFC 7807).",
          },
          {
            label: "Documentation périmée",
            value:
              "Problème : la doc décrit l'API d'il y a six mois. Solution : OpenAPI généré ou validé en CI.",
          },
          {
            label: "Ignorer l'idempotence",
            value:
              "Problème : un retry réseau crée des doublons (double paiement). Solution : verbes idempotents ou clés d'idempotence sur les POST critiques.",
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
          "Ressources nommées, verbes HTTP pour les actions : la grammaire avant tout.",
          "Statuts précis : `201` + `Location` à la création, `422` pour la validation, jamais de `200` fourre-tout.",
          "Sans état : pas de session serveur — tokens à durée de vie limitée.",
          "Pagination, filtres et tri dès le premier endpoint de collection.",
          "Erreurs structurées, stables et documentées.",
          "Versionner (`/v1`) avant d'en avoir besoin.",
          "Documenter en OpenAPI, validé en CI.",
          "Sécurité : HTTPS, BOLA vérifié sur chaque objet, rate limiting, CORS précis.",
          "Idempotence : clés d'idempotence sur les opérations critiques.",
          "Observer : logs structurés, ID de corrélation, métriques par endpoint.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par les références.",
    blocks: [
      {
        kind: "fields",
        title: "Références (à privilégier)",
        fields: [
          {
            label: "MDN — HTTP",
            value:
              "developer.mozilla.org : la référence des méthodes, statuts et en-têtes HTTP — la grammaire sur laquelle REST repose.",
          },
          {
            label: "Spécification OpenAPI",
            value:
              "spec.openapis.org : le standard de documentation des APIs REST, avec guides et exemples.",
          },
          {
            label: "RFC 7807 — Problem Details",
            value:
              "Le format standard d'erreur pour les APIs HTTP, avec des exemples concrets.",
          },
          {
            label: "RESTful API Design (Microsoft, Google)",
            value:
              "Les guides de design d'API publiés par les grandes plateformes : des conventions éprouvées à grande échelle.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : auditer une API publique réelle (conventions, statuts, pagination) puis concevoir la vôtre avec la même rigueur.",
          "Communauté : les retours d'expérience sur les migrations v1 → v2 sont la meilleure école de versionnage.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "REST maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "`networking` : approfondir le protocole lui-même — versions, connexions, TLS.",
          "`auth` et `web-security` : sécuriser les APIs au-delà des bases — authentification, OWASP, en-têtes de protection.",
          "`testing-api` : industrialiser les tests d'API — collections, environnements, CI.",
          "`javascript` ou `python` : implémenter une API complète (FastAPI, Express) avec validation et OpenAPI.",
          "Revenir à la roadmap : valider REST et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'API REST : concevoir, construire et sécuriser
 * des API HTTP avec Python et FastAPI.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_API_REST: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est une API REST : des ressources, des verbes HTTP, et des réponses prévisibles.",
    blocks: [
      {
        kind: "text",
        text: "Une API REST expose des ressources (articles, utilisateurs, commandes) via HTTP : chaque ressource a une URL, chaque action un verbe (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`). Le client ne connaît que ce contrat — il ne sait rien de la base de données ni du langage serveur.",
      },
      {
        kind: "diagram",
        title: "Le contrat REST en une image",
        lines: [
          "CLIENT                    SERVEUR",
          "  │  GET /articles/42        │",
          "  │ ──────────────────────► │  lire la ressource 42",
          "  │                          │",
          "  │  200 OK + JSON           │",
          "  │ ◄────────────────────── │  représentation",
          "  │                          │",
          "  │  POST /articles {…}      │",
          "  │ ──────────────────────► │  créer",
          "  │                          │",
          "  │  201 Created + Location  │",
          "  │ ◄────────────────────── │",
        ],
      },
      {
        kind: "text",
        text: "REST est un style d'architecture, pas un protocole : ce qui fait sa force, c'est la prévisibilité. Un développeur qui connaît une API REST sait utiliser la suivante : mêmes verbes, mêmes codes de statut, mêmes conventions d'URL.",
      },
    ],
  },
  {
    id: "a-quoi-ca-sert",
    title: "À quoi ça sert",
    level: 1,
    intro:
      "Pourquoi les API REST sont partout : découpler le frontend du backend.",
    blocks: [
      {
        kind: "list",
        items: [
          "Découplage : le frontend (React, mobile) et le backend évoluent indépendamment, tant que le contrat tient.",
          "Multi-clients : la même API sert le site web, l'app mobile et les partenaires — une seule logique métier.",
          "Interopérabilité : HTTP + JSON sont universels ; n'importe quel langage peut consommer ou produire une API REST.",
          "Montée en charge : l'API sans état (stateless) se réplique horizontalement derrière un équilibreur de charge.",
        ],
      },
      {
        kind: "text",
        text: "Dans cette Learning Page, on construit des API avec Python et FastAPI : moderne, typé, avec documentation OpenAPI générée automatiquement. Les principes (ressources, verbes, statuts) sont valables dans tous les langages.",
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
      "Les bases nécessaires avant de construire une API.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut maîtriser avant",
        fields: [
          {
            label: "Python : fonctions et types",
            value:
              "Définir des fonctions, annoter les paramètres (`def get(id: int)`), comprendre les classes — FastAPI s'appuie sur les annotations.",
          },
          {
            label: "HTTP : requêtes et réponses",
            value:
              "Verbes, codes de statut, en-têtes, corps JSON. Savoir lire une requête dans les DevTools du navigateur.",
          },
          {
            label: "JSON",
            value:
              "Le format d'échange : objets, tableaux, types. Sérialiser et désérialiser sans surprise.",
          },
          {
            label: "Terminal et pip",
            value:
              "Créer un environnement virtuel, installer des paquets, lancer un serveur local.",
          },
        ],
      },
    ],
  },
  {
    id: "installer-fastapi",
    title: "Installer FastAPI",
    level: 2,
    intro:
      "FastAPI : le framework Python moderne pour les API, avec validation et documentation automatiques.",
    blocks: [
      {
        kind: "command",
        label: "Créer l'environnement et installer FastAPI",
        command: "python -m venv .venv && source .venv/bin/activate && pip install fastapi \"uvicorn[standard]\"",
        why: "FastAPI exploite les annotations de types Python pour valider les requêtes et générer la documentation OpenAPI automatiquement. Uvicorn est le serveur ASGI qui l'exécute — le standard pour les API Python asynchrones.",
        verify: "pip show fastapi uvicorn",
      },
      {
        kind: "code",
        language: "python",
        title: "Première API en cinq lignes",
        code: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/ping\")\ndef ping():\n    return {\"status\": \"ok\"}",
      },
      {
        kind: "command",
        label: "Lancer le serveur de développement",
        command: "uvicorn main:app --reload",
        why: "`main:app` désigne l'objet `app` dans `main.py` ; `--reload` redémarre à chaque modification. Le serveur écoute sur `http://127.0.0.1:8000`.",
        verify: "curl http://127.0.0.1:8000/ping",
      },
    ],
  },
  {
    id: "premiere-route",
    title: "Première route CRUD",
    level: 2,
    intro:
      "Les cinq opérations de base sur une ressource : le squelette de toute API.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "CRUD articles en mémoire",
        code: "from fastapi import FastAPI, HTTPException\n\napp = FastAPI()\ndb: dict[int, dict] = {}\n\n@app.get(\"/articles\")\ndef list_articles():\n    return list(db.values())\n\n@app.post(\"/articles\", status_code=201)\ndef create_article(article: dict):\n    new_id = max(db, default=0) + 1\n    db[new_id] = {\"id\": new_id, **article}\n    return db[new_id]\n\n@app.get(\"/articles/{article_id}\")\ndef get_article(article_id: int):\n    if article_id not in db:\n        raise HTTPException(status_code=404, detail=\"Article introuvable\")\n    return db[article_id]\n\n@app.delete(\"/articles/{article_id}\", status_code=204)\ndef delete_article(article_id: int):\n    db.pop(article_id, None)\n    return None",
      },
      {
        kind: "text",
        text: "Notez les conventions : `GET` collection au pluriel, `POST` pour créer (statut `201`), `GET /{id}` pour lire, `404` quand la ressource n'existe pas, `DELETE` avec `204` (pas de contenu). Le stockage en mémoire est volontaire : il isole l'apprentissage du contrat HTTP avant d'ajouter la base de données.",
      },
    ],
  },
  {
    id: "tester-avec-curl",
    title: "Tester avec curl",
    level: 2,
    intro:
      "curl : l'outil universel pour parler à une API depuis le terminal.",
    blocks: [
      {
        kind: "command",
        label: "Créer un article",
        command: "curl -X POST http://127.0.0.1:8000/articles -H 'Content-Type: application/json' -d '{\"title\": \"Bonjour\"}'",
        why: "`-X POST` choisit le verbe, `-H` déclare le JSON, `-d` envoie le corps. curl est disponible partout et ne cache rien : ce que vous tapez est exactement ce qui part sur le réseau.",
        verify: "curl http://127.0.0.1:8000/articles",
      },
      {
        kind: "command",
        label: "Voir les en-têtes de réponse",
        command: "curl -i http://127.0.0.1:8000/articles/1",
        why: "`-i` affiche les en-têtes + le corps : on vérifie le statut (`201`, `404`…), le `Content-Type`, et le JSON retourné. Indispensable pour debugger une API.",
      },
    ],
  },
  {
    id: "documentation-auto",
    title: "Documentation automatique",
    level: 2,
    intro:
      "Swagger UI et ReDoc : la documentation qui ne se périme jamais.",
    blocks: [
      {
        kind: "text",
        text: "FastAPI génère automatiquement une documentation interactive depuis votre code : ouvrez `http://127.0.0.1:8000/docs` (Swagger UI) pour tester chaque route depuis le navigateur, et `/redoc` pour la version lisible. Chaque annotation de type devient une documentation de paramètre.",
      },
      {
        kind: "list",
        items: [
          "Zéro effort : la doc reflète toujours le code, car elle en est dérivée.",
          "Test manuel : Swagger UI permet d'essayer les routes sans écrire de client.",
          "Contrat partageable : le schéma OpenAPI sous-jacent (`/openapi.json`) sert aux clients générés et aux tests de contrat.",
        ],
      },
    ],
  },
  {
    id: "validation-pydantic",
    title: "Validation avec Pydantic",
    level: 2,
    intro:
      "Ne jamais faire confiance aux entrées : des schémas qui valident à la frontière.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Schémas Pydantic",
        code: "from pydantic import BaseModel, Field\n\nclass ArticleIn(BaseModel):\n    title: str = Field(min_length=3, max_length=200)\n    body: str\n    published: bool = False\n\nclass ArticleOut(ArticleIn):\n    id: int\n\n@app.post(\"/articles\", response_model=ArticleOut, status_code=201)\ndef create_article(article: ArticleIn):\n    ...  # article.title est garanti valide ici",
      },
      {
        kind: "text",
        text: "Pydantic valide et convertit : un `id` passé en chaîne `\"42\"` devient l'entier `42`, un titre trop court est rejeté avec une erreur `422` détaillée. Séparez les schémas d'entrée (`In`) et de sortie (`Out`) : l'API n'expose jamais plus que nécessaire (jamais le hash du mot de passe, par exemple).",
      },
    ],
  },
  {
    id: "codes-statut",
    title: "Codes de statut essentiels",
    level: 2,
    intro:
      "Le vocabulaire des réponses : dire le bon statut, c'est documenter l'API.",
    blocks: [
      {
        kind: "table",
        headers: ["Code", "Sens", "Usage"],
        rows: [
          ["200", "OK", "Lecture réussie, mise à jour réussie"],
          ["201", "Created", "Création réussie (avec `Location` si pertinent)"],
          ["204", "No Content", "Succès sans corps (DELETE)"],
          ["400", "Bad Request", "Requête mal formée"],
          ["401", "Unauthorized", "Authentification manquante ou invalide"],
          ["403", "Forbidden", "Authentifié, mais pas autorisé"],
          ["404", "Not Found", "Ressource inexistante"],
          ["422", "Unprocessable Entity", "Données invalides (validation)"],
          ["500", "Internal Server Error", "Bug serveur — jamais de détail en prod"],
        ],
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et outillage",
    level: 2,
    intro:
      "Un bon éditeur + les bons outils de test d'API.",
    blocks: [
      {
        kind: "fields",
        title: "Configuration recommandée",
        fields: [
          {
            label: "VS Code + Pylance",
            value:
              "Autocomplétion et vérification de types sur les annotations : les erreurs de schéma se voient avant l'exécution.",
          },
          {
            label: "Swagger UI (/docs)",
            value:
              "Le premier client de test : il est généré, toujours à jour, et ne nécessite aucune installation.",
          },
          {
            label: "HTTPie (optionnel)",
            value:
              "Alternative moderne à curl (`http POST :8000/articles title=Bonjour`) : plus lisible pour les tests manuels fréquents.",
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
      "Les habitudes d'une API propre dès le premier jour.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Concevoir le contrat d'abord",
            detail:
              "Listez les ressources, leurs URL, les verbes et les statuts avant d'écrire du code. Un tableau suffit — il devient la spécification.",
          },
          {
            title: "Valider à la frontière",
            detail:
              "Schémas Pydantic stricts en entrée, schémas de sortie explicites. Rien d'invalid ne traverse.",
          },
          {
            title: "Nommer en prévisible",
            detail:
              "Pluriels pour les collections, kebab-case, verbes HTTP pour les actions — jamais de verbes dans les URL (`POST /articles`, pas `POST /createArticle`).",
          },
          {
            title: "Tester chaque route",
            detail:
              "Un test par route : cas nominal + cas d'erreur (404, 422, 401). Le client de test FastAPI rend cela trivial.",
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
      "Trois projets pour pratiquer, du CRUD simple à l'API complète.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Débutant — API de notes",
            value:
              "CRUD complet sur des notes (titre, contenu) : routes, validation Pydantic, tests avec le client de test.",
          },
          {
            label: "Intermédiaire — API de blog",
            value:
              "Articles + commentaires imbriqués, pagination, filtres par requête, authentification par token, documentation soignée.",
          },
          {
            label: "Avancé — API e-commerce",
            value:
              "Produits, panier, commandes : relations, transactions, idempotence, rate limiting, tests de charge.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-son-api",
    title: "Tester son API",
    level: 2,
    intro:
      "Le client de test FastAPI : des tests HTTP sans serveur.",
    blocks: [
      {
        kind: "command",
        label: "Installer pytest et httpx",
        command: "pip install pytest httpx",
        why: "Le `TestClient` de FastAPI (basé sur httpx) appelle l'application en mémoire : pas de serveur à lancer, des tests rapides et déterministes.",
        verify: "pip show pytest httpx",
      },
      {
        kind: "code",
        language: "python",
        title: "Test d'une route",
        code: "from fastapi.testclient import TestClient\nfrom main import app\n\nclient = TestClient(app)\n\ndef test_create_article():\n    res = client.post(\"/articles\", json={\"title\": \"Test\"})\n    assert res.status_code == 201\n    assert res.json()[\"title\"] == \"Test\"\n\ndef test_get_missing():\n    res = client.get(\"/articles/999\")\n    assert res.status_code == 404",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "principes-rest",
    title: "Les principes REST en profondeur",
    level: 3,
    intro: "REST est un style avec des contraintes précises : les connaître évite les API « REST-ish » incohérentes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Client-serveur : séparation des responsabilités — l'UI et le stockage évoluent indépendamment.",
          "Sans état (stateless) : chaque requête contient tout le contexte (token, paramètres) ; le serveur ne garde pas de session en mémoire.",
          "Interface uniforme : ressources identifiées par URL, manipulées par des représentations, messages auto-descriptifs.",
          "Cacheable : les réponses déclarent leur cacheabilité (`Cache-Control`) — le client et les intermédiaires peuvent cacher.",
          "Système en couches : le client ignore s'il parle au serveur final ou à un proxy / équilibreur.",
        ],
      },
      {
        kind: "text",
        text: "En pratique, peu d'API respectent 100 % des contraintes (notamment HATEOAS). L'important est de respecter l'esprit : ressources nommées, verbes HTTP sémantiques, sans état, réponses cacheables.",
      },
    ],
  },
  {
    id: "ressources-urls",
    title: "Concevoir ressources et URLs",
    level: 3,
    intro: "L'URL est l'interface : des conventions qui rendent l'API devinable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Noms au pluriel : `/articles`, `/users` — la collection, pas l'instance.",
          "Hiérarchie pour l'appartenance : `/articles/42/comments` — le commentaire vit dans l'article.",
          "Kebab-case : `/order-items`, jamais de camelCase ni de snake_case dans les URL.",
          "Pas de verbes : `POST /articles` crée, `POST /articles/42/publish` est l'exception (action sans ressource évidente).",
          "Filtres en query params : `/articles?status=published&author=12` — l'URL reste la même ressource, filtrée.",
          "Versionnement : `/v1/articles` quand le contrat change de façon incompatible (voir section dédiée).",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Routes imbriquées avec FastAPI",
        code: "@app.get(\"/articles/{article_id}/comments\")\ndef list_comments(article_id: int):\n    ...\n\n@app.post(\"/articles/{article_id}/comments\", status_code=201)\ndef create_comment(article_id: int, comment: CommentIn):\n    ...",
      },
    ],
  },
  {
    id: "verbes-http",
    title: "Verbes HTTP : sémantique précise",
    level: 3,
    intro: "Chaque verbe a un contrat : idempotence, sécurité, cacheabilité.",
    blocks: [
      {
        kind: "table",
        headers: ["Verbe", "Sûr", "Idempotent", "Usage"],
        rows: [
          ["GET", "Oui", "Oui", "Lire une ressource ou une collection"],
          ["POST", "Non", "Non", "Créer (ou action non standard)"],
          ["PUT", "Non", "Oui", "Remplacer entièrement une ressource"],
          ["PATCH", "Non", "Non*", "Modifier partiellement"],
          ["DELETE", "Non", "Oui", "Supprimer"],
        ],
      },
      {
        kind: "text",
        text: "`Sûr` = ne modifie rien (cacheable, rejouable). `Idempotent` = rejouer N fois = rejouer une fois. `*` PATCH peut être idempotent selon l'implémentation. Ces propriétés ne sont pas théoriques : les retries automatiques et les proxys s'appuient dessus.",
      },
    ],
  },
  {
    id: "put-vs-patch",
    title: "PUT vs PATCH",
    level: 3,
    intro: "Remplacement total contre modification partielle : deux contrats différents.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "PUT (remplacement) et PATCH (partiel)",
        code: "class ArticleUpdate(BaseModel):\n    title: str | None = None\n    body: str | None = None\n    published: bool | None = None\n\n@app.put(\"/articles/{article_id}\")\ndef replace_article(article_id: int, article: ArticleIn):\n    # Le client envoie la ressource COMPLÈTE ; les champs absents\n    # sont réinitialisés. Idempotent.\n    ...\n\n@app.patch(\"/articles/{article_id}\")\ndef update_article(article_id: int, patch: ArticleUpdate):\n    # Seuls les champs fournis sont modifiés.\n    stored = db[article_id]\n    updates = patch.model_dump(exclude_unset=True)\n    db[article_id] = {**stored, **updates}\n    return db[article_id]",
      },
      {
        kind: "text",
        text: "`exclude_unset=True` est le secret du PATCH avec Pydantic : seuls les champs envoyés sont appliqués. En pratique, PATCH couvre 90 % des besoins de mise à jour ; réservez PUT aux remplacements explicites.",
      },
    ],
  },
  {
    id: "statuts-avances",
    title: "Codes de statut avancés",
    level: 3,
    intro: "Au-delà des classiques : les statuts qui affinent le contrat.",
    blocks: [
      {
        kind: "table",
        headers: ["Code", "Usage"],
        rows: [
          ["202", "Accepted : traitement asynchrone lancé (file, webhook à venir)"],
          ["206", "Partial Content : pagination par plages (rare, voir Range)"],
          ["301/308", "Redirection permanente (308 préserve le verbe)"],
          ["304", "Not Modified : le cache client est encore valide (ETag)"],
          ["400", "Requête mal formée (JSON invalide, paramètre manquant)"],
          ["409", "Conflict : la requête est valide mais impossible (doublon unique)"],
          ["410", "Gone : ressource supprimée définitivement (vs 404 temporaire)"],
          ["415", "Unsupported Media Type : Content-Type non géré"],
          ["422", "Entité invalide : bien formée mais sémantiquement incorrecte"],
          ["429", "Too Many Requests : rate limiting (avec Retry-After)"],
          ["503", "Service Unavailable : surcharge ou maintenance (avec Retry-After)"],
        ],
      },
    ],
  },
  {
    id: "gestion-erreurs",
    title: "Gestion d'erreurs cohérente",
    level: 3,
    intro: "Des erreurs prévisibles : même format partout, jamais de stack trace en production.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Format d'erreur uniforme",
        code: "from fastapi import FastAPI, Request\nfrom fastapi.responses import JSONResponse\n\nclass ApiError(Exception):\n    def __init__(self, code: str, message: str, status: int = 400):\n        self.code, self.message, self.status = code, message, status\n\n@app.exception_handler(ApiError)\ndef handle_api_error(request: Request, exc: ApiError):\n    return JSONResponse(\n        status_code=exc.status,\n        content={\"error\": {\"code\": exc.code, \"message\": exc.message}},\n    )\n\n# Usage : raise ApiError(\"article_not_found\", \"Article introuvable\", 404)",
      },
      {
        kind: "list",
        items: [
          "Un seul format : `{ error: { code, message } }` — `code` stable pour le client, `message` pour l'humain.",
          "Jamais de détail interne en production : pas de stack trace, pas de requête SQL dans la réponse.",
          "Loggez l'erreur complète côté serveur avec un identifiant de corrélation, retournez l'identifiant au client.",
        ],
      },
    ],
  },
  {
    id: "pagination",
    title: "Pagination",
    level: 3,
    intro: "Ne jamais retourner « tout » : paginer dès le premier jour.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Pagination par offset avec métadonnées",
        code: "from fastapi import Query\n\n@app.get(\"/articles\")\ndef list_articles(\n    page: int = Query(1, ge=1),\n    per_page: int = Query(20, ge=1, le=100),\n):\n    start = (page - 1) * per_page\n    items = all_articles[start:start + per_page]\n    return {\n        \"data\": items,\n        \"meta\": {\n            \"page\": page,\n            \"per_page\": per_page,\n            \"total\": len(all_articles),\n        },\n    }",
      },
      {
        kind: "text",
        text: "Limitez `per_page` (ici 100) pour éviter les requêtes qui vident la base. L'offset suffit pour les petits volumes ; pour les gros (ou les données qui bougent), préférez la pagination par curseur (voir la Learning Page State Management, section pagination).",
      },
    ],
  },
  {
    id: "filtrage-tri",
    title: "Filtrage, tri et recherche",
    level: 3,
    intro: "Des query params expressifs pour interroger les collections.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Filtres et tri déclaratifs",
        code: "from typing import Literal\n\n@app.get(\"/articles\")\ndef list_articles(\n    status: Literal[\"draft\", \"published\"] | None = None,\n    author_id: int | None = None,\n    sort: Literal[\"created\", \"-created\", \"title\"] = \"-created\",\n    q: str | None = Query(None, min_length=2),\n):\n    # status, author_id : filtres ; sort : tri (- = décroissant)\n    # q : recherche plein texte\n    ...",
      },
      {
        kind: "text",
        text: "Conventions : `sort=-created` pour le décroissant, `q` pour la recherche libre, un paramètre par filtre. Validez les valeurs (`Literal`) : un `sort` inconnu doit être rejeté (`422`), pas ignoré silencieusement.",
      },
    ],
  },
  {
    id: "relations",
    title: "Relations entre ressources",
    level: 3,
    intro: "Exposer les liens sans exposer la base : imbrication, expansion, liens.",
    blocks: [
      {
        kind: "list",
        items: [
          "Imbrication : `/articles/42/comments` pour les relations fortes (le commentaire n'existe pas sans l'article).",
          "Expansion : `GET /articles/42?expand=author` inclut l'auteur dans la réponse — le client choisit, une seule requête.",
          "Liens : la réponse inclut les URL liées (`author_url`) plutôt que les objets complets — léger par défaut.",
          "Évitez le N+1 : si vous imbriquez, chargez en une requête côté base (jointure / `selectinload`), pas une requête par parent.",
        ],
      },
    ],
  },
  {
    id: "versionnement",
    title: "Versionnement d'API",
    level: 3,
    intro: "Le contrat évolue : versionner pour ne jamais casser les clients existants.",
    blocks: [
      {
        kind: "list",
        items: [
          "Dans l'URL (`/v1/`, `/v2/`) : le plus simple et le plus visible — recommandé pour débuter.",
          "Changements compatibles (ajout de champ, nouveau endpoint) : pas de nouvelle version.",
          "Changements incompatibles (champ supprimé, sémantique modifiée) : nouvelle version, ancienne maintenue avec une date de fin annoncée.",
          "Ne versionnez pas à chaque déploiement : une version vit des mois, voire des années.",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Deux versions cohabitent",
        code: "from fastapi import APIRouter\n\nv1 = APIRouter(prefix=\"/v1\")\nv2 = APIRouter(prefix=\"/v2\")\n\n@v1.get(\"/articles\")\ndef list_v1(): ...  # ancien format\n\n@v2.get(\"/articles\")\ndef list_v2(): ...  # nouveau format\n\napp.include_router(v1)\napp.include_router(v2)",
      },
    ],
  },
  {
    id: "authentification-api",
    title: "Authentification de l'API",
    level: 3,
    intro: "Protéger les routes : qui êtes-vous ? (Le « comment » détaillé est dans la Learning Page Auth.)",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Bearer token avec FastAPI",
        code: "from fastapi import Depends, HTTPException\nfrom fastapi.security import HTTPBearer\n\nbearer = HTTPBearer(auto_error=False)\n\ndef get_current_user(credentials=Depends(bearer)):\n    if not credentials:\n        raise HTTPException(401, \"Token manquant\")\n    user = verify_token(credentials.credentials)  # JWT, opaque…\n    if not user:\n        raise HTTPException(401, \"Token invalide\")\n    return user\n\n@app.get(\"/me\")\ndef me(user=Depends(get_current_user)):\n    return user",
      },
      {
        kind: "text",
        text: "Le pattern `Depends` injecte l'utilisateur courant dans chaque route protégée. `401` = non authentifié, `403` = authentifié mais non autorisé — ne les confondez pas. Les stratégies (session, JWT, OAuth2) et leurs compromis sont détaillés dans la Learning Page Auth.",
      },
    ],
  },
  {
    id: "autorisation",
    title: "Autorisation : qui peut quoi",
    level: 3,
    intro: "Au-delà de l'identité : vérifier les droits sur chaque action.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Vérifier la propriété de la ressource",
        code: "@app.delete(\"/articles/{article_id}\", status_code=204)\ndef delete_article(article_id: int, user=Depends(get_current_user)):\n    article = get_article_or_404(article_id)\n    if article.author_id != user.id and user.role != \"admin\":\n        raise HTTPException(403, \"Action non autorisée\")\n    delete(article)",
      },
      {
        kind: "list",
        items: [
          "Vérifiez les droits côté serveur à chaque requête : jamais de confiance dans le client.",
          "Modèle simple : propriétaire ou admin. Modèle avancé : RBAC (rôles et permissions).",
          "Attention aux IDOR : `GET /users/123` doit vérifier que l'appelant a le droit de voir l'utilisateur 123.",
        ],
      },
    ],
  },
  {
    id: "rate-limiting",
    title: "Rate limiting",
    level: 3,
    intro: "Protéger l'API des abus : quotas par client, réponses 429.",
    blocks: [
      {
        kind: "text",
        text: "Le rate limiting limite le nombre de requêtes par client et par période (ex. 100 requêtes/minute par token). Au-delà : `429 Too Many Requests` avec un en-tête `Retry-After`. C'est une protection contre les abus et les bugs clients (boucle infinie), pas une punition.",
      },
      {
        kind: "list",
        items: [
          "Algorithme simple : fenêtre fixe ou glissante par clé (IP, token) en Redis.",
          "En-têtes informatifs : `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.",
          "Quotas différenciés : plus généreux en lecture qu'en écriture, plus strict sur l'authentification (anti brute-force).",
        ],
      },
    ],
  },
  {
    id: "idempotence",
    title: "Idempotence des écritures",
    level: 3,
    intro: "Le réseau échoue : permettre au client de réessayer sans créer de doublons.",
    blocks: [
      {
        kind: "text",
        text: "Un client dont la requête timeout ne sait pas si elle a abouti. S'il réessaie un `POST`, il risque de créer deux commandes. La solution : une clé d'idempotence (`Idempotency-Key: <uuid>`) que le serveur mémorise avec la réponse — le retry retourne la réponse d'origine au lieu de réexécuter.",
      },
      {
        kind: "list",
        items: [
          "Obligatoire sur les opérations sensibles : paiement, création de commande, envoi.",
          "Stockez clé → réponse avec TTL (24 h typiquement).",
          "PUT et DELETE sont idempotents par construction : le problème concerne surtout POST.",
        ],
      },
    ],
  },
  {
    id: "taches-async",
    title: "Tâches asynchrones",
    level: 3,
    intro: "Ne pas bloquer la requête : répondre vite, traiter en arrière-plan.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "BackgroundTasks pour le léger, file pour le lourd",
        code: "from fastapi import BackgroundTasks\n\n@app.post(\"/articles\", status_code=201)\ndef create_article(article: ArticleIn, bg: BackgroundTasks):\n    saved = save(article)\n    bg.add_task(send_notification, saved.id)  # après la réponse\n    return saved\n\n# Pour le lourd (vidéo, exports, emails en masse) :\n# répondez 202 + file dédiée (Celery, ARQ, Dramatiq).",
      },
      {
        kind: "text",
        text: "`BackgroundTasks` convient aux travaux rapides post-réponse (notification, indexation légère). Pour tout ce qui dure (transcodage, batch), une vraie file de tâches avec workers séparés : la requête répond `202 Accepted` avec un identifiant de suivi.",
      },
    ],
  },
  {
    id: "upload-fichiers",
    title: "Upload de fichiers",
    level: 3,
    intro: "Recevoir des fichiers : multipart, limites, stockage.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Upload avec FastAPI",
        code: "from fastapi import File, UploadFile\n\n@app.post(\"/avatars\", status_code=201)\nasync def upload_avatar(file: UploadFile = File(...)):\n    if file.content_type not in (\"image/jpeg\", \"image/png\"):\n        raise HTTPException(415, \"Format non supporté\")\n    content = await file.read()\n    if len(content) > 5 * 1024 * 1024:\n        raise HTTPException(413, \"Fichier trop volumineux\")\n    ...  # stocker (disque, S3…), jamais en base\n    return {\"url\": \"/files/avatars/abc123.jpg\"}",
      },
      {
        kind: "list",
        items: [
          "Validez le type réel (magic bytes), pas seulement l'extension ni le `Content-Type` déclaré.",
          "Limitez la taille (`413 Payload Too Large`) : côté API et côté serveur (nginx `client_max_body_size`).",
          "Stockez les fichiers hors base : disque, S3 ou équivalent — la base garde l'URL.",
          "Servez via CDN : l'API retourne l'URL, le fichier ne transite plus par elle.",
        ],
      },
    ],
  },
  {
    id: "cache-http",
    title: "Cache HTTP",
    level: 3,
    intro: "Laisser les intermédiaires travailler : ETag et Cache-Control.",
    blocks: [
      {
        kind: "list",
        items: [
          "`Cache-Control: max-age=60` : la réponse est réutilisable 60 s par le client et les proxys.",
          "`ETag` : hash de la ressource ; le client renvoie `If-None-Match`, le serveur répond `304` si inchangée — pas de corps transféré.",
          "Données publiques et stables (catalogue) : cachez agressivement. Données personnelles : `Cache-Control: private, no-store`.",
          "Le cache HTTP est la première optimisation de charge : il ne coûte qu'un en-tête.",
        ],
      },
    ],
  },
  {
    id: "cors",
    title: "CORS",
    level: 3,
    intro: "Autoriser le frontend à appeler l'API : comprendre la politique same-origin.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Configurer CORS avec FastAPI",
        code: "from fastapi.middleware.cors import CORSMiddleware\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=[\"https://mon-frontend.com\"],  # jamais \"*\" avec credentials\n    allow_credentials=True,\n    allow_methods=[\"GET\", \"POST\", \"PUT\", \"PATCH\", \"DELETE\"],\n    allow_headers=[\"*\"],\n)",
      },
      {
        kind: "text",
        text: "CORS est une protection du navigateur, pas de l'API : curl et les serveurs s'en moquent. En développement, autorisez `http://localhost:3000` ; en production, listez explicitement les origines — `allow_origins=[\"*\"]` avec credentials est une faille.",
      },
    ],
  },
  {
    id: "securite-essentiels",
    title: "Sécurité : les essentiels",
    level: 3,
    intro: "Le minimum vital avant d'exposer une API : la checklist OWASP appliquée.",
    blocks: [
      {
        kind: "list",
        items: [
          "HTTPS partout en production : aucun token ni mot de passe ne transite en clair.",
          "Validation stricte des entrées (Pydantic) : type, taille, format — l'injection commence par une entrée non validée.",
          "Requêtes paramétrées : jamais de SQL construit par concaténation (ORM ou paramètres liés).",
          "En-têtes de sécurité : `X-Content-Type-Options: nosniff`, limitez les informations d'erreur.",
          "Secrets hors du code : variables d'environnement, jamais dans le dépôt.",
          "Dépendances à jour : `pip audit` (ou Dependabot) pour les vulnérabilités connues.",
        ],
      },
    ],
  },
  {
    id: "base-de-donnees",
    title: "Connecter une base de données",
    level: 3,
    intro: "Passer du stockage en mémoire à PostgreSQL avec SQLAlchemy.",
    blocks: [
      {
        kind: "command",
        label: "Installer SQLAlchemy et le driver",
        command: "pip install sqlalchemy psycopg2-binary",
        why: "SQLAlchemy est l'ORM standard de l'écosystème Python : modèles déclaratifs, requêtes paramétrées par construction, migrations via Alembic.",
        verify: "pip show sqlalchemy",
      },
      {
        kind: "code",
        language: "python",
        title: "Modèle et session",
        code: "from sqlalchemy import String, create_engine\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session\n\nclass Base(DeclarativeBase): pass\n\nclass Article(Base):\n    __tablename__ = \"articles\"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    title: Mapped[str] = mapped_column(String(200))\n\nengine = create_engine(\"postgresql+psycopg2://user:pass@localhost/db\")\nBase.metadata.create_all(engine)  # dev uniquement ; Alembic en prod",
      },
      {
        kind: "text",
        text: "Séparez les modèles ORM des schémas Pydantic : l'ORM reflète la base, Pydantic reflète le contrat. En production, les migrations (Alembic) remplacent `create_all` — jamais de modification manuelle du schéma.",
      },
    ],
  },
  {
    id: "n-plus-1",
    title: "Le problème N+1",
    level: 3,
    intro: "Le piège de performance n°1 des API : une requête par enfant.",
    blocks: [
      {
        kind: "text",
        text: "Lister 50 articles puis charger les commentaires de chacun = 1 + 50 requêtes. Le temps de réponse explose avec la taille de la page. La solution : chargement groupé (jointure ou `selectinload`), en une ou deux requêtes quelle que soit la taille.",
      },
      {
        kind: "code",
        language: "python",
        title: "Chargement eager avec SQLAlchemy",
        code: "from sqlalchemy.orm import selectinload\nfrom sqlalchemy import select\n\n# ❌ N+1 : une requête de commentaires PAR article\narticles = session.scalars(select(Article)).all()\n\n# ✅ 2 requêtes au total, quel que soit le nombre d'articles\narticles = session.scalars(\n    select(Article).options(selectinload(Article.comments))\n).all()",
      },
    ],
  },
  {
    id: "tests-avances",
    title: "Tests avancés",
    level: 3,
    intro: "Au-delà du cas nominal : erreurs, auth, contrats.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tester l'auth et les erreurs",
        code: "def test_protected_without_token():\n    res = client.get(\"/me\")\n    assert res.status_code in (401, 403)\n\ndef test_create_invalid():\n    res = client.post(\"/articles\", json={\"title\": \"x\"})  # trop court\n    assert res.status_code == 422\n\ndef test_error_format():\n    res = client.get(\"/articles/999\")\n    body = res.json()\n    assert \"error\" in body and \"code\" in body[\"error\"]",
      },
      {
        kind: "list",
        items: [
          "Chaque route : nominal + 404/422/401 selon le cas.",
          "Base de test isolée : SQLite en mémoire ou base dédiée, rollback par test.",
          "Tests de contrat : le schéma OpenAPI généré peut être validé contre les réponses réelles.",
        ],
      },
    ],
  },
  {
    id: "openapi-avance",
    title: "OpenAPI avancé",
    level: 3,
    intro: "Exploiter le schéma : clients générés, exemples, métadonnées.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Enrichir la documentation",
        code: "@app.post(\n    \"/articles\",\n    response_model=ArticleOut,\n    status_code=201,\n    summary=\"Créer un article\",\n    description=\"Crée un article en brouillon. Le titre doit faire 3 à 200 caractères.\",\n    responses={409: {\"description\": \"Un article avec ce slug existe déjà\"}},\n)\ndef create_article(article: ArticleIn):\n    ...",
      },
      {
        kind: "list",
        items: [
          "`summary`, `description`, `responses` : la doc devient un vrai guide d'utilisation.",
          "Le schéma `/openapi.json` génère des clients typés (openapi-generator, orval) — le frontend ne réécrit plus les appels.",
          "Exemples de requêtes/réponses (`examples=`) : la doc montre des cas réels, pas des schémas abstraits.",
        ],
      },
    ],
  },
  {
    id: "webhooks",
    title: "Webhooks : notifier au lieu d'être interrogé",
    level: 3,
    intro: "Inverser le sens : c'est l'API qui appelle le client quand quelque chose se passe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : le client enregistre une URL ; l'API y `POST` un événement (`article.published`) avec une signature HMAC.",
          "Le client vérifie la signature avec le secret partagé : sans elle, n'importe qui peut forger des événements.",
          "Livraison robuste : retries avec backoff exponentiel, file d'attente, endpoint de rejeu manuel.",
          "Alternative : Server-Sent Events (SSE) pour le temps réel simple dans le navigateur, sans la complexité des WebSockets.",
        ],
      },
    ],
  },
  {
    id: "observabilite",
    title: "Observabilité",
    level: 3,
    intro: "Savoir ce que fait l'API en production : logs, métriques, traces.",
    blocks: [
      {
        kind: "list",
        items: [
          "Logs structurés (JSON) : un identifiant de requête (`X-Request-ID`) propagé partout pour corréler.",
          "Métriques : latence par route (p50/p95/p99), taux d'erreur, requêtes/seconde — exposées pour Prometheus.",
          "Santé : `GET /health` (liveness) et `GET /ready` (readiness : base joignable ?) pour l'orchestrateur.",
          "Alertes sur les signaux : taux de 5xx, latence p99, file des tâches — pas sur chaque erreur isolée.",
        ],
      },
    ],
  },
  {
    id: "deploiement",
    title: "Déploiement",
    level: 3,
    intro: "De `uvicorn --reload` à la production : ce qui change.",
    blocks: [
      {
        kind: "command",
        label: "Lancer en production (workers multiples)",
        command: "uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4",
        why: "En production : pas de `--reload`, plusieurs workers pour utiliser les cœurs CPU, derrière un reverse proxy (nginx, Caddy) qui gère TLS et les fichiers statiques.",
        verify: "curl http://127.0.0.1:8000/health",
      },
      {
        kind: "list",
        items: [
          "Variables d'environnement pour les secrets et la config (jamais de valeur codée en dur).",
          "Migrations appliquées au déploiement (Alembic), jamais `create_all`.",
          "Conteneur Docker : image légère, utilisateur non-root, healthcheck.",
        ],
      },
      {
        kind: "code",
        language: "dockerfile",
        title: "Dockerfile minimal",
        code: "FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nUSER nobody\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]",
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging d'API",
    level: 3,
    intro: "Méthode pour diagnostiquer une API qui répond mal.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Reproduire avec curl",
            detail:
              "Isolez le problème du client : si curl reproduit, le bug est côté API. Gardez la commande exacte pour le rapport.",
          },
          {
            title: "Lire le statut et le corps",
            detail:
              "4xx = problème de requête (ou d'auth) ; 5xx = bug serveur. Le corps d'erreur (format uniforme) indique le `code`.",
          },
          {
            title: "Consulter les logs",
            detail:
              "Avec l'identifiant de requête, retrouvez la trace complète : validation, SQL exécuté, exception.",
          },
          {
            title: "Vérifier la validation",
            detail:
              "Une `422` inattendue = le schéma Pydantic rejette quelque chose : comparez le corps envoyé au schéma.",
          },
          {
            title: "Mesurer la requête SQL",
            detail:
              "Lenteur sur une liste = souvent un N+1 : activez l'écho SQL en développement et comptez les requêtes.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques des API REST.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Verbes dans les URL",
            value:
              "Problem : `POST /createArticle`. Why : habitude RPC. Better : la ressource + le verbe HTTP (`POST /articles`).",
          },
          {
            label: "GET qui modifie",
            value:
              "Problem : `GET /articles/1/like` qui incrémente. Why : simplicité apparente. Better : `POST` — les GET sont mis en cache et pré-chargés par les navigateurs.",
          },
          {
            label: "Statut 200 pour tout",
            value:
              "Problem : erreurs renvoyées en `200` avec `{ success: false }`. Why : peur des statuts. Better : le statut HTTP porte le résultat, le corps porte le détail.",
          },
          {
            label: "Pas de pagination",
            value:
              "Problem : `GET /articles` retourne 50 000 lignes. Why : « on verra plus tard ». Better : pagination dès la première version.",
          },
          {
            label: "N+1 silencieux",
            value:
              "Problem : liste lente qui empire avec le volume. Why : ORM paresseux par défaut. Better : chargement eager (`selectinload`), comptage des requêtes en dev.",
          },
          {
            label: "Secrets dans le code",
            value:
              "Problem : clé API codée en dur, committée. Why : rapidité. Better : variables d'environnement + rotation en cas de fuite.",
          },
          {
            label: "CORS en * en production",
            value:
              "Problem : `allow_origins=[\"*\"]` avec credentials. Why : copié du tutoriel de dev. Better : origines explicites.",
          },
          {
            label: "Détail d'erreur en prod",
            value:
              "Problem : stack trace ou SQL dans la réponse `500`. Why : debug oublié. Better : message générique + identifiant de corrélation, détail dans les logs.",
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
          "Contrat d'abord : ressources, URL, verbes, statuts — écrits avant le code.",
          "Validation à la frontière : schémas stricts en entrée, schémas de sortie explicites.",
          "Statuts honnêtes : le code HTTP dit le résultat, le corps donne le détail.",
          "Sans état : chaque requête est autonome (token, paramètres).",
          "Pagination systématique sur les collections.",
          "Erreurs uniformes : un format, des codes stables, jamais de détail interne.",
          "Tests par route : nominal + erreurs, base isolée.",
          "Documentation vivante : OpenAPI généré, enrichi (`summary`, exemples).",
        ],
      },
      {
        kind: "text",
        text: "Contexte : une API interne à un seul client peut se permettre moins de cérémonie (pas de versionnement immédiat). Une API publique ou multi-clients exige le contrat complet dès le départ — le coût d'un changement incompatible y est bien plus élevé.",
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
            label: "FastAPI",
            value:
              "fastapi.tiangolo.com : tutoriel, guides avancés (dépendances, sécurité, déploiement) — la référence.",
          },
          {
            label: "Spécification OpenAPI",
            value:
              "spec.openapis.org : le standard derrière la documentation générée et les clients typés.",
          },
          {
            label: "MDN — HTTP",
            value:
              "developer.mozilla.org : méthodes, statuts, en-têtes, CORS — la référence du protocole.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "OWASP API Security Top 10 : les risques spécifiques aux API, à lire avant toute mise en production.",
          "Pratique : construisez l'API de blog du projet intermédiaire en appliquant chaque section de cette page.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'API REST maîtrisée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Sécuriser l'authentification : JWT, OAuth2, hachage des mots de passe — voir la compétence `auth`.",
          "Persister avec SQL : modélisation, migrations, transactions — voir la compétence `sql`.",
          "Tester l'API : tests d'intégration, contrats — voir la compétence `testing-api`.",
          "Conteneuriser : Docker pour le déploiement reproductible — voir la compétence `docker`.",
          "Revenir à la roadmap : valider API REST et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

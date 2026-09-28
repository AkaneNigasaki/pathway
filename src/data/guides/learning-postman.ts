import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Postman : de zéro à un usage professionnel
 * du test et de la documentation d'API. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive. Tous les
 * textes supportent le code inline entre backticks. Postman étant avant
 * tout une application graphique, cette page privilégie les blocs
 * text/list/fields/table/steps ; les rares commandes terminal (Newman,
 * Postman CLI) sont réelles et vérifiées.
 */
export const LEARNING_POSTMAN: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Postman et pourquoi c'est l'outil standard pour travailler avec des API.",
    blocks: [
      {
        kind: "text",
        text: "Postman est une plateforme pour concevoir, tester et documenter des API. Son usage le plus courant : envoyer des requêtes HTTP à une API, inspecter les réponses, et organiser ces requêtes en collections partageables. C'est l'équivalent d'un navigateur pour les API : là où le navigateur affiche des pages, Postman montre les requêtes et réponses brutes.",
      },
      {
        kind: "text",
        text: "Pourquoi Postman plutôt que `curl` : `curl` suffit pour une requête ponctuelle, mais dès qu'on travaille sérieusement avec une API, on a besoin d'historique, de variables d'environnement (dev/staging/prod), de tests automatisés sur les réponses, et de documentation générée. Postman réunit tout cela dans une interface unique, utilisable sans écrire une ligne de script.",
      },
      {
        kind: "text",
        text: "Au-delà de l'usage interactif, Postman s'intègre aux pipelines CI via Newman et le Postman CLI : les collections deviennent des suites de tests automatisés qui valident l'API à chaque déploiement.",
      },
    ],
  },
  {
    id: "postman-dans-le-cycle-api",
    title: "Postman dans le cycle de vie d'une API",
    level: 1,
    intro:
      "Postman n'est pas qu'un testeur : il accompagne l'API de sa conception à sa surveillance.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de vie d'une API avec Postman",
        lines: [
          "Concevoir (schéma OpenAPI, contrat)",
          "     │",
          "     ▼",
          "Développer (requêtes, variables, scripts)",
          "     │",
          "     ▼",
          "Tester (tests, runner, CI avec Newman)",
          "     │",
          "     ▼",
          "Documenter (documentation générée depuis la collection)",
          "     │",
          "     ▼",
          "Surveiller (monitors : exécution planifiée + alertes)",
        ],
      },
      {
        kind: "text",
        text: "Cette page suit ce cycle : d'abord envoyer des requêtes, puis les organiser, les tester, les automatiser, et enfin documenter et surveiller l'API.",
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
      "Ce qu'il faut connaître avant de tester des API avec Postman.",
    blocks: [
      {
        kind: "fields",
        title: "Connaissances requises",
        fields: [
          {
            label: "HTTP",
            value:
              "Méthodes (GET, POST, PUT, PATCH, DELETE), codes de statut (200, 404, 500), headers : la compétence `http` de la roadmap couvre ces fondamentaux.",
          },
          {
            label: "REST et JSON",
            value:
              "Comprendre les ressources, les verbes HTTP et le format JSON des corps de requête et de réponse (`rest`, `fetch-api`).",
          },
          {
            label: "JavaScript (bases)",
            value:
              "Uniquement pour les scripts de test et de pré-requête : variables, fonctions, un peu de manipulation d'objets JSON.",
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
      "Installer l'application Postman et créer un espace de travail.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Télécharger l'application",
            detail:
              "Depuis postman.com/downloads : versions Windows, macOS et Linux. L'application de bureau est recommandée (toutes les fonctionnalités, dont l'interception et les mocks locaux).",
          },
          {
            title: "Créer un compte",
            detail:
              "Un compte gratuit permet de synchroniser collections et environnements entre machines, et de collaborer via les workspaces.",
          },
          {
            title: "Créer un workspace",
            detail:
              "Un workspace regroupe les collections, environnements et mocks d'un projet ou d'une équipe. On en crée un par projet pour ne pas mélanger.",
          },
        ],
      },
    ],
  },
  {
    id: "premiere-requete",
    title: "Votre première requête en 5 minutes",
    level: 2,
    intro:
      "Envoyer une requête GET et lire la réponse, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer une requête",
            detail:
              "Bouton « + » ou « New → HTTP Request » : un nouvel onglet de requête s'ouvre.",
          },
          {
            title: "Choisir la méthode et l'URL",
            detail:
              "Méthode `GET`, URL `https://api.github.com/users/octocat` (une API publique sans authentification, idéale pour débuter).",
          },
          {
            title: "Envoyer",
            detail:
              "Bouton « Send » : la réponse s'affiche en dessous avec son statut (200 OK), son temps et sa taille.",
          },
          {
            title: "Lire la réponse",
            detail:
              "Onglet « Body » : le JSON retourné, formaté et coloré. Onglet « Headers » : les en-têtes de réponse.",
          },
          {
            title: "Sauvegarder",
            detail:
              "Bouton « Save » : nommer la requête et la ranger dans une collection. Une requête non sauvegardée est perdue à la fermeture de l'onglet.",
          },
        ],
      },
    ],
  },
  {
    id: "anatomie-requete",
    title: "Anatomie d'une requête",
    level: 2,
    intro:
      "Les quatre parties d'une requête dans Postman.",
    blocks: [
      {
        kind: "fields",
        title: "Composer une requête",
        fields: [
          {
            label: "Méthode + URL",
            value:
              "GET pour lire, POST pour créer, PUT/PATCH pour modifier, DELETE pour supprimer. Les paramètres d'URL (`?page=2&limit=10`) se saisissent dans l'onglet « Params » : Postman les encode et les ajoute à l'URL.",
          },
          {
            label: "Headers",
            value:
              "Onglet « Headers » : paires clé/valeur comme `Content-Type: application/json` ou `Authorization: Bearer <token>`. Postman ajoute automatiquement certains headers (ex. `Content-Type` selon le body choisi).",
          },
          {
            label: "Body",
            value:
              "Onglet « Body » : `none`, `form-data` (fichiers, champs), `x-www-form-urlencoded`, `raw` (JSON, texte, XML), `binary`. Pour une API REST moderne : `raw` + JSON.",
          },
          {
            label: "Authorization",
            value:
              "Onglet « Authorization » : le type d'authentification (Bearer, Basic, OAuth 2.0…). Configuré une fois au niveau de la collection, il s'applique à toutes ses requêtes par héritage.",
          },
        ],
      },
    ],
  },
  {
    id: "lire-reponse",
    title: "Lire une réponse",
    level: 2,
    intro:
      "Interpréter ce que l'API retourne : statut, corps, temps.",
    blocks: [
      {
        kind: "fields",
        title: "Les indicateurs d'une réponse",
        fields: [
          {
            label: "Code de statut",
            value:
              "2xx = succès, 4xx = erreur du client (400 requête invalide, 401 non authentifié, 404 introuvable), 5xx = erreur du serveur. Le premier diagnostic, toujours.",
          },
          {
            label: "Body",
            value:
              "Le contenu : JSON le plus souvent. Postman le formate, le colore et permet de le replier/déplier et d'y chercher (`Cmd/Ctrl+F`).",
          },
          {
            label: "Temps et taille",
            value:
              "Affichés à côté du statut : un temps anormalement long ou une taille inattendue sont des signaux (endpoint lent, réponse trop verbeuse).",
          },
          {
            label: "Tests (onglet)",
            value:
              "Le résultat des scripts de test de la requête : chaque assertion passée ou échouée y est listée.",
          },
        ],
      },
    ],
  },
  {
    id: "collections",
    title: "Collections : organiser ses requêtes",
    level: 2,
    intro:
      "Une collection est un dossier de requêtes partageable : l'unité de base du travail sérieux.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer une collection",
            detail:
              "« New → Collection » : la nommer d'après l'API (ex. « API Boutique »).",
          },
          {
            title: "Ajouter des dossiers",
            detail:
              "Organiser par ressource : dossiers « Authentification », « Produits », « Commandes ». Une collection plate de 50 requêtes est inutilisable.",
          },
          {
            title: "Y sauvegarder les requêtes",
            detail:
              "Chaque requête sauvegardée va dans le bon dossier, avec un nom d'action (« Créer un produit », pas « POST /products »).",
          },
          {
            title: "Configurer l'authentification au niveau collection",
            detail:
              "Onglet « Authorization » de la collection : le type choisi s'applique par héritage à toutes les requettes — on ne le répète pas 50 fois.",
          },
        ],
      },
      {
        kind: "text",
        text: "Une collection bien tenue est déjà une documentation : un nouveau développeur l'ouvre, voit les endpoints par domaine, et peut exécuter chaque requête avec les bons paramètres.",
      },
    ],
  },
  {
    id: "environnements-variables",
    title: "Environnements et variables",
    level: 2,
    intro:
      "Ne jamais écrire d'URL ou de token en dur : utiliser des variables.",
    blocks: [
      {
        kind: "text",
        text: "Un environnement est un jeu de variables : `baseUrl`, `token`, etc. On crée un environnement par cible (`dev`, `staging`, `prod`) avec les valeurs correspondantes. Dans les requêtes, on écrit `{{baseUrl}}/produits` : Postman substitue la valeur de l'environnement actif.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un environnement",
            detail:
              "Icône d'environnement (en haut à droite) → « New » : nommer « dev », ajouter `baseUrl = http://localhost:3000`.",
          },
          {
            title: "Dupliquer pour les autres cibles",
            detail:
              "Dupliquer en « prod » avec `baseUrl = https://api.maboutique.com`. Mêmes noms de variables, valeurs différentes.",
          },
          {
            title: "Utiliser dans les requêtes",
            detail:
              "Écrire `{{baseUrl}}` dans les URL. Basculer d'environnement en un clic : toutes les requêtes pointent vers la nouvelle cible.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle de sécurité : les valeurs sensibles (tokens, clés) utilisent le type « secret » : elles sont masquées dans l'interface et ne sont pas exportées en clair.",
      },
    ],
  },
  {
    id: "tests-simples",
    title: "Premiers tests automatisés",
    level: 2,
    intro:
      "L'onglet « Tests » : vérifier automatiquement chaque réponse.",
    blocks: [
      {
        kind: "text",
        text: "Chaque requête peut embarquer un script de test (JavaScript) exécuté après réception de la réponse. Postman propose des snippets prêts à l'emploi (« Status code is 200 », « Response body: JSON value check ») : un clic les insère, on adapte les valeurs.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Test typique d'une requête",
        code: `pm.test("Le statut est 200", function () {\n  pm.response.to.have.status(200);\n});\n\npm.test("La réponse contient un tableau de produits", function () {\n  const json = pm.response.json();\n  pm.expect(json.produits).to.be.an("array");\n  pm.expect(json.produits.length).to.be.above(0);\n});`,
      },
      {
        kind: "text",
        text: "`pm.test` définit un test nommé, `pm.response` expose la réponse, `pm.expect` est l'assertion (style Chai). Les résultats s'affichent dans l'onglet « Test Results » après chaque envoi.",
      },
    ],
  },
  {
    id: "collection-runner",
    title: "Collection Runner : tout exécuter d'un coup",
    level: 2,
    intro:
      "Lancer toute une collection en séquence et voir les résultats agrégés.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Ouvrir le Runner",
            detail:
              "Bouton « Runner » (en bas de l'application) : choisir la collection et l'environnement.",
          },
          {
            title: "Configurer l'exécution",
            detail:
              "Nombre d'itérations, délai entre requêtes si l'API est limitée en débit (rate limiting).",
          },
          {
            title: "Lancer",
            detail:
              "« Run » : chaque requête s'exécute en séquence avec ses tests. Le résumé montre les requêtes échouées et les assertions en échec.",
          },
          {
            title: "Analyser les échecs",
            detail:
              "Cliquer sur une requête en échec pour voir sa réponse réelle vs les assertions attendues.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le Runner transforme une collection en suite de tests de non-régression : après chaque modification de l'API, on relance et on vérifie que rien n'a cassé.",
      },
    ],
  },
  {
    id: "erreurs-debutants",
    title: "Erreurs classiques des débutants",
    level: 2,
    intro:
      "Les pièges les plus fréquents quand on débute avec Postman.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["URL en dur partout", "50 requêtes à modifier pour changer d'environnement", "Variables `{{baseUrl}}` + environnements"],
          ["Oublier de sauvegarder", "Requêtes perdues à la fermeture", "Sauvegarder chaque requête dans une collection"],
          ["Tester à la main uniquement", "Aucune vérification automatique", "Écrire des tests dans l'onglet « Tests » dès le début"],
          ["Token copié-collé", "Token expiré = tout refaire", "Script qui extrait le token et le stocke en variable (voir chaînage)"],
          ["Mauvais Content-Type", "L'API rejette le body", "Vérifier que `raw` + JSON définit bien `Content-Type: application/json`"],
          ["Ignorer le code de statut", "On lit le body d'une 500", "Toujours regarder le statut en premier, tester `pm.response.to.have.status(...)`"],
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "La boucle de travail typique d'un développeur d'API avec Postman.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de développement d'endpoint",
        lines: [
          "Écrire/choisir la requête dans la collection",
          "     │",
          "     ▼",
          "L'exécuter contre l'environnement dev",
          "     │",
          "     ▼",
          "Ajuster (params, body, headers) jusqu'au bon résultat",
          "     │",
          "     ▼",
          "Ajouter les tests (statut, structure, valeurs)",
          "     │",
          "     ▼",
          "Relancer via le Runner : la collection reste verte",
        ],
      },
    ],
  },
  {
    id: "partage-workspaces",
    title: "Partage et workspaces",
    level: 2,
    intro:
      "Travailler à plusieurs sur les mêmes collections sans se marcher dessus.",
    blocks: [
      {
        kind: "list",
        items: [
          "Workspaces d'équipe : collections partagées, visibles par tous les membres avec des rôles (lecture, écriture).",
          "Ne jamais partager de secrets : les variables de type « secret » et le Vault personnel ne sont pas synchronisés en clair.",
          "Commenter les requêtes complexes : la description Markdown de chaque requête explique son intention.",
          "Versionner les changements importants : l'historique des collections permet de revenir en arrière.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "variables-scopes",
    title: "Portées des variables",
    level: 3,
    intro:
      "Cinq niveaux de variables, du plus global au plus éphémère.",
    blocks: [
      {
        kind: "table",
        headers: ["Portée", "Visibilité", "Usage typique"],
        rows: [
          ["Global", "Tous les workspaces", "Valeurs vraiment universelles (rare)"],
          ["Collection", "La collection", "Configuration propre à l'API (version, préfixe)"],
          ["Environnement", "L'environnement actif", "`baseUrl`, identifiants par cible (dev/staging/prod)"],
          ["Local", "L'exécution en cours", "Valeurs temporaires des scripts (token extrait)"],
          ["Data", "L'itération du Runner", "Ligne courante d'un fichier CSV/JSON d'itération"],
        ],
      },
      {
        kind: "text",
        text: "En cas de même nom à plusieurs niveaux, la plus spécifique gagne (data > local > environnement > collection > global). Règle pratique : environnement pour les cibles, collection pour la config de l'API, local pour ce que les scripts calculent.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Manipuler les variables en script",
        code: `// Lire\nconst base = pm.variables.get("baseUrl");\n\n// Écrire (portée choisie explicitement)\npm.environment.set("token", "abc123");\npm.collectionVariables.set("apiVersion", "v2");\n\n// Supprimer\npm.environment.unset("token");`,
      },
    ],
  },
  {
    id: "pre-request-scripts",
    title: "Scripts de pré-requête",
    level: 3,
    intro:
      "Préparer la requête avant envoi : signatures, timestamps, tokens.",
    blocks: [
      {
        kind: "text",
        text: "L'onglet « Pre-request » exécute du JavaScript avant l'envoi : calculer une signature HMAC, générer un timestamp, ou récupérer un token via `pm.sendRequest` (un appel HTTP depuis le script lui-même).",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Obtenir un token avant la requête",
        code: `pm.sendRequest({\n  url: pm.variables.get("baseUrl") + "/auth/token",\n  method: "POST",\n  header: { "Content-Type": "application/json" },\n  body: {\n    mode: "raw",\n    raw: JSON.stringify({ user: "bot", password: pm.variables.get("botPassword") })\n  }\n}, function (err, res) {\n  pm.variables.set("token", res.json().accessToken);\n});`,
      },
      {
        kind: "text",
        text: "Les scripts peuvent aussi être définis au niveau collection ou dossier : ils s'exécutent alors avant chaque requête enfant — l'endroit idéal pour l'authentification commune.",
      },
    ],
  },
  {
    id: "test-scripts-avances",
    title: "Scripts de test avancés",
    level: 3,
    intro:
      "Aller au-delà du statut 200 : structure, types, temps de réponse.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Assertions poussées",
        code: `pm.test("Structure de la réponse", function () {\n  const json = pm.response.json();\n  pm.expect(json).to.have.property("produits");\n  pm.expect(json.produits[0]).to.have.all.keys("id", "nom", "prix");\n});\n\npm.test("Temps de réponse acceptable", function () {\n  pm.expect(pm.response.responseTime).to.be.below(500);\n});\n\npm.test("Le header de pagination est présent", function () {\n  pm.response.to.have.header("X-Total-Count");\n});`,
      },
      {
        kind: "list",
        items: [
          "Valider la structure (clés présentes, types) plutôt que des valeurs exactes : les tests survivent aux changements de données.",
          "Tester les cas d'erreur : 404 sur un id inexistant, 400 sur un body invalide, 401 sans token.",
          "Les assertions sont en style Chai (`to.be.an`, `to.have.property`) : toute la grammaire Chai est disponible.",
        ],
      },
    ],
  },
  {
    id: "chaining-requetes",
    title: "Chaînage : passer des données entre requêtes",
    level: 3,
    intro:
      "Le pattern qui rend les collections vraiment automatiques : extraire, stocker, réutiliser.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Extraire l'id créé pour la requête suivante",
        code: `// Dans les Tests de « Créer un produit »\nconst json = pm.response.json();\npm.variables.set("produitId", json.id);\n\n// Dans l'URL de « Obtenir un produit » :\n// {{baseUrl}}/produits/{{produitId}}`,
      },
      {
        kind: "text",
        text: "Séquence type d'un scénario : authentification (extrait le token) → création (extrait l'id) → lecture (utilise l'id) → suppression (nettoie). La collection devient un scénario de bout en bout rejouable, sans intervention manuelle entre les étapes.",
      },
    ],
  },
  {
    id: "dynamic-variables",
    title: "Variables dynamiques",
    level: 3,
    intro:
      "Des valeurs aléatoires générées à chaque envoi, sans script.",
    blocks: [
      {
        kind: "fields",
        title: "Les plus utiles",
        fields: [
          { label: "`{{$guid}}`", value: "Un UUID unique : parfait pour les identifiants ou les clés d'idempotence." },
          { label: "`{{$timestamp}}`", value: "Le timestamp Unix actuel : pour les champs de date ou les signatures." },
          { label: "`{{$randomInt}}`", value: "Un entier aléatoire." },
          { label: "`{{$randomFirstName}}`, `{{$randomEmail}}`…", value: "Des données réalistes pour remplir des formulaires de test sans réfléchir." },
        ],
      },
      {
        kind: "text",
        text: "Usage typique : créer un utilisateur avec `{{$randomEmail}}` comme email — chaque exécution crée un utilisateur différent, pas de conflit d'unicité entre deux runs.",
      },
    ],
  },
  {
    id: "data-files",
    title: "Fichiers de données : itérations pilotées",
    level: 3,
    intro:
      "Exécuter la même collection avec des jeux de données différents.",
    blocks: [
      {
        kind: "text",
        text: "Le Runner accepte un fichier CSV ou JSON : chaque ligne/objet devient une itération, et ses colonnes/clés sont accessibles comme variables `data`. On teste ainsi 100 cas (valides et invalides) avec une seule collection.",
      },
      {
        kind: "code",
        language: "json",
        title: "data.json — jeux de test",
        code: `[\n  { "email": "valide@example.com", "attendu": 201 },\n  { "email": "sans-arobase", "attendu": 400 },\n  { "email": "", "attendu": 400 }\n]`,
      },
      {
        kind: "code",
        language: "javascript",
        title: "Test utilisant la ligne courante",
        code: `pm.test("Le statut correspond à l'attendu", function () {\n  pm.response.to.have.status(parseInt(pm.iterationData.get("attendu")));\n});`,
      },
      {
        kind: "text",
        text: "`pm.iterationData` expose la ligne courante. C'est la façon la plus économique de multiplier les cas de test : les données vivent dans un fichier versionnable, la logique dans la collection.",
      },
    ],
  },
  {
    id: "authorization",
    title: "Authentification : les types supportés",
    level: 3,
    intro:
      "L'onglet Authorization couvre les schémas d'authentification courants.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Principe", "Quand l'utiliser"],
        rows: [
          ["No Auth", "Aucune", "API publiques, développement local"],
          ["API Key", "Clé dans un header ou paramètre", "API simples à clé (header `X-API-Key` typique)"],
          ["Bearer Token", "Header `Authorization: Bearer <token>`", "JWT et tokens OAuth 2.0 — le plus courant"],
          ["Basic Auth", "`Authorization: Basic base64(user:pass)`", "API internes simples, toujours en HTTPS"],
          ["OAuth 2.0", "Flux d'obtention de token intégré", "API tierces (Google, GitHub…) — voir section dédiée"],
          ["AWS Signature", "Signature des requêtes (SigV4)", "API AWS directes"],
        ],
      },
      {
        kind: "text",
        text: "L'héritage est la clé : on configure l'authentification au niveau de la collection (ou du dossier), et chaque requête utilise « Inherit auth from parent ». Un changement de token ou de méthode se fait en un seul endroit.",
      },
    ],
  },
  {
    id: "oauth2-flows",
    title: "OAuth 2.0 en détail",
    level: 3,
    intro:
      "Obtenir et rafraîchir des tokens sans quitter Postman.",
    blocks: [
      {
        kind: "text",
        text: "En choisissant le type OAuth 2.0, Postman propose de configurer le flux : URLs d'autorisation et de token, client ID/secret, scopes. Le bouton « Get New Access Token » ouvre le navigateur, effectue le flux, et stocke le token — utilisable immédiatement par les requêtes.",
      },
      {
        kind: "fields",
        title: "Les grant types",
        fields: [
          {
            label: "Authorization Code",
            value: "Le flux standard pour les applications avec backend : redirection navigateur, échange du code contre un token. Le plus courant et le plus sûr.",
          },
          {
            label: "Client Credentials",
            value: "De machine à machine (pas d'utilisateur) : le client s'authentifie directement. Typique des intégrations backend.",
          },
          {
            label: "Password Credentials",
            value: "Échange direct login/mot de passe contre un token. Simple mais à réserver aux clients de confiance.",
          },
          {
            label: "Implicit",
            value: "Flux historique pour les apps purement front-end, aujourd'hui déconseillé au profit du code + PKCE.",
          },
        ],
      },
    ],
  },
  {
    id: "mock-servers",
    title: "Mock servers : simuler l'API",
    level: 3,
    intro:
      "Développer le front-end avant que le back-end existe.",
    blocks: [
      {
        kind: "text",
        text: "Un mock server Postman expose une URL qui répond selon des exemples sauvegardés dans la collection. Le front-end se développe contre cette URL ; quand le vrai back-end arrive, on change juste `baseUrl`.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Créer des exemples",
            detail: "Pour chaque requête, « Save as example » : définir la réponse attendue (statut, body). Plusieurs exemples par requête permettent de simuler succès et erreurs.",
          },
          {
            title: "Créer le mock",
            detail: "Depuis la collection : « Mock collection ». Postman génère une URL publique (ou privée avec clé API).",
          },
          {
            title: "Utiliser",
            detail: "Pointer le front-end vers l'URL du mock. Les headers `x-mock-response-code` permettent de forcer un exemple précis.",
          },
        ],
      },
    ],
  },
  {
    id: "monitors",
    title: "Monitors : surveiller en continu",
    level: 3,
    intro:
      "Exécuter une collection sur un planning et être alerté en cas d'échec.",
    blocks: [
      {
        kind: "text",
        text: "Un monitor lance une collection à intervalle régulier (toutes les heures, chaque jour…) depuis le cloud Postman, contre l'environnement choisi. En cas d'échec de tests, il envoie une alerte (email, intégrations). C'est de la surveillance synthétique : on vérifie en permanence que l'API en production répond correctement.",
      },
      {
        kind: "list",
        items: [
          "Choisir une collection de « smoke tests » : les endpoints critiques uniquement, pas toute la suite.",
          "Les monitors consomment des ressources du forfait : les dimensionner en conséquence.",
          "Croiser avec les tests CI : le monitor surveille la production, Newman valide avant déploiement.",
        ],
      },
    ],
  },
  {
    id: "documentation-api",
    title: "Documentation générée",
    level: 3,
    intro:
      "Transformer une collection en documentation publique ou privée.",
    blocks: [
      {
        kind: "text",
        text: "Postman génère une documentation web depuis la collection : chaque requête avec ses paramètres, exemples de réponses et descriptions. Elle se publie en un clic (URL publique) ou reste privée au workspace.",
      },
      {
        kind: "list",
        items: [
          "La qualité de la doc = la qualité des descriptions : documenter chaque requête, paramètre et exemple au fur et à mesure.",
          "Les exemples de réponses (« Save as example ») deviennent les exemples de la documentation.",
          "Une collection bien documentée remplace avantageusement un wiki qui se périme : la doc vit avec les requêtes testées.",
        ],
      },
    ],
  },
  {
    id: "versioning-git",
    title: "Versionner avec Git",
    level: 3,
    intro:
      "Les collections sont du code : elles se versionnent.",
    blocks: [
      {
        kind: "text",
        text: "Postman peut connecter une collection à un dépôt Git : les requêtes, tests et environnements deviennent des fichiers versionnés (pull, push, branches, pull requests). On applique aux API les mêmes pratiques qu'au code : revue des changements, historique, retours en arrière.",
      },
      {
        kind: "list",
        items: [
          "Brancher par fonctionnalité : une branche pour les nouveaux endpoints, mergée après revue.",
          "Ne jamais versionner de secrets : utiliser des variables d'environnement et le Vault.",
          "Les conflits se résolvent comme pour du code, requête par requête.",
        ],
      },
    ],
  },
  {
    id: "openapi-import-export",
    title: "OpenAPI : import et export",
    level: 3,
    intro:
      "Faire le pont entre les collections Postman et le standard OpenAPI.",
    blocks: [
      {
        kind: "text",
        text: "Postman importe les spécifications OpenAPI (YAML/JSON) en collections : les endpoints, paramètres et schémas deviennent des requêtes exploitables immédiatement. Inversement, une collection peut être convertie en définition OpenAPI pour alimenter d'autres outils (générateurs de clients, passerelles d'API).",
      },
      {
        kind: "list",
        items: [
          "Importer le contrat OpenAPI du back-end : la collection de test est générée, il reste à ajouter les tests et les exemples.",
          "Valider la conformité : comparer les réponses réelles au schéma OpenAPI pour détecter les dérives (contract testing, voir section dédiée).",
          "Le format OpenAPI est l'échange standard : il rend l'API exploitable hors de Postman.",
        ],
      },
    ],
  },
  {
    id: "contract-testing",
    title: "Contract testing",
    level: 3,
    intro:
      "Vérifier que l'API respecte son contrat, automatiquement.",
    blocks: [
      {
        kind: "text",
        text: "Le contract testing vérifie que les réponses réelles sont conformes au schéma publié (OpenAPI) : bons types, champs requis présents, pas de champ supprimé sans préavis. Dans Postman, cela se traduit par des tests qui valident la structure des réponses contre le schéma.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Valider contre un schéma",
        code: `const schema = {\n  type: "object",\n  required: ["id", "nom", "prix"],\n  properties: {\n    id: { type: "integer" },\n    nom: { type: "string" },\n    prix: { type: "number" }\n  }\n};\n\npm.test("La réponse respecte le contrat", function () {\n  const json = pm.response.json();\n  pm.expect(json).to.have.property("id");\n  pm.expect(json.prix).to.be.a("number");\n});`,
      },
      {
        kind: "text",
        text: "Exécutés en CI à chaque déploiement, ces tests détectent les changements cassants avant les consommateurs : un champ renommé ou supprimé fait échouer le pipeline, pas l'application cliente en production.",
      },
    ],
  },
  {
    id: "graphql",
    title: "GraphQL dans Postman",
    level: 3,
    intro:
      "Postman n'est pas limité au REST : requêtes GraphQL natives.",
    blocks: [
      {
        kind: "text",
        text: "En créant une requête de type GraphQL, Postman propose un éditeur avec autocomplétion basée sur le schéma (récupéré par introspection), gestion des variables, et affichage structuré de la réponse. Les tests et variables fonctionnent comme pour le REST.",
      },
      {
        kind: "code",
        language: "graphql",
        title: "Exemple de requête",
        code: `query ProduitsEnPromo($limite: Int) {\n  produits(enPromo: true, limite: $limite) {\n    id\n    nom\n    prix\n  }\n}`,
      },
    ],
  },
  {
    id: "websockets",
    title: "WebSocket et temps réel",
    level: 3,
    intro:
      "Tester les connexions persistantes, pas seulement le requête-réponse.",
    blocks: [
      {
        kind: "text",
        text: "Postman permet d'ouvrir des connexions WebSocket : on se connecte, on envoie des messages, on observe les messages reçus en temps réel dans l'interface. Indispensable pour tester les notifications push, les chats, les flux de données live.",
      },
      {
        kind: "list",
        items: [
          "Vérifier la négociation initiale (headers, sous-protocoles, authentification).",
          "Tester la reconnexion : que se passe-t-il quand la connexion tombe ?",
          "Le support gRPC existe aussi pour les API à base de Protocol Buffers.",
        ],
      },
    ],
  },
  {
    id: "newman-cli",
    title: "Newman : les collections en ligne de commande",
    level: 3,
    intro:
      "Exécuter les collections sans interface graphique : la brique CI historique.",
    blocks: [
      {
        kind: "command",
        label: "Installer Newman",
        command: "npm install -g newman",
        why: "Newman est le runner officiel en ligne de commande : il exécute une collection exportée en JSON avec ses tests, et rapporte les résultats. Léger et scriptable, c'est la façon classique d'intégrer Postman à une CI.",
        verify: "newman --version",
      },
      {
        kind: "command",
        label: "Exécuter une collection",
        command: "newman run ma-collection.json -e environnement.json",
        why: "Lance toutes les requêtes avec leurs tests contre l'environnement donné. Le code de sortie est non nul si un test échoue : la CI peut bloquer le déploiement sur cette base.",
      },
      {
        kind: "command",
        label: "Itérer sur un fichier de données",
        command: "newman run ma-collection.json -e environnement.json -d donnees.csv",
        why: "Combine le runner avec les fichiers de données : chaque ligne du CSV devient une itération. Les rapports (`--reporters cli,html`) documentent chaque exécution.",
      },
    ],
  },
  {
    id: "postman-cli",
    title: "Postman CLI : le runner moderne",
    level: 3,
    intro:
      "Le successeur officiel de Newman, connecté au cloud Postman.",
    blocks: [
      {
        kind: "command",
        label: "Installer le Postman CLI",
        command: "npm install -g postman-cli",
        why: "Le CLI officiel actuel : il exécute les collections (locales ou du cloud), envoie des requêtes ad hoc et valide des spécifications OpenAPI. Là où Newman travaille sur des fichiers exportés, le CLI dialogue avec le compte Postman.",
        verify: "postman --version",
      },
      {
        kind: "command",
        label: "S'authentifier",
        command: "postman login",
        why: "Lie le CLI au compte Postman (interactif, ou `--with-api-key` en CI avec une clé d'API). Nécessaire pour accéder aux collections du cloud.",
        verify: "postman whoami",
      },
      {
        kind: "command",
        label: "Exécuter une collection",
        command: "postman collection run ma-collection.json --environment env.json",
        why: "Équivalent moderne de `newman run` : exécute la collection avec l'environnement donné. `--env-var \"baseUrl=https://staging\"` surcharge une variable à la volée, pratique en CI.",
      },
      {
        kind: "text",
        text: "Newman ou Postman CLI ? Newman est mature et purement local (fichiers JSON) ; le Postman CLI est le choix forward-looking, intégré au cloud et activement développé. Pour un nouveau projet, préférer le Postman CLI.",
      },
    ],
  },
  {
    id: "ci-integration",
    title: "Intégration CI complète",
    level: 3,
    intro:
      "Le pipeline type : tester l'API à chaque commit.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Extrait de workflow GitHub Actions",
        code: `steps:\n  - uses: actions/checkout@v4\n  - uses: actions/setup-node@v4\n    with:\n      node-version: 20\n  - run: npm install -g postman-cli\n  - run: postman login --with-api-key \${{ secrets.POSTMAN_API_KEY }}\n  - run: >\n      postman collection run $COLLECTION_ID\n      --env-var "baseUrl=http://localhost:3000"\n      --reporters cli,junit`,
      },
      {
        kind: "text",
        text: "Schéma : démarrer l'API en local (ou contre un environnement de test), exécuter la collection via le CLI, bloquer le merge si un test échoue. La clé d'API Postman vit dans les secrets du CI, jamais dans le dépôt.",
      },
    ],
  },
  {
    id: "console-debogage",
    title: "Console Postman : déboguer les scripts",
    level: 3,
    intro:
      "Voir ce que font vraiment les scripts de pré-requête et de test.",
    blocks: [
      {
        kind: "text",
        text: "La console Postman (menu View → Show Postman Console) affiche les logs des scripts (`console.log`), les requêtes réellement envoyées (URL finale après substitution des variables, headers effectifs) et les erreurs de script. Quand une variable ne se substitue pas ou qu'un test échoue mystérieusement, la console montre la réalité.",
      },
      {
        kind: "list",
        items: [
          "`console.log()` dans les scripts : inspecter les valeurs intermédiaires.",
          "Vérifier l'URL et les headers réellement envoyés après substitution des `{{variables}}`.",
          "Les erreurs de syntaxe des scripts y sont signalées avec la ligne fautive.",
        ],
      },
    ],
  },
  {
    id: "proxy-capture",
    title: "Capture via proxy",
    level: 3,
    intro:
      "Enregistrer le trafic réel d'une application pour générer des requêtes.",
    blocks: [
      {
        kind: "text",
        text: "Postman peut agir comme proxy : en configurant l'application (ou le navigateur) pour passer par lui, chaque requête HTTP est capturée et convertible en requête Postman dans une collection. Utile pour documenter une API existante en observant le trafic réel, ou pour reproduire un bug observé en production.",
      },
      {
        kind: "list",
        items: [
          "Filtrer par hôte pour ne capturer que le trafic pertinent.",
          "Attention aux données sensibles capturées : nettoyer avant de partager la collection.",
          "Alternative : l'intercepteur navigateur pour capturer depuis Chrome/Firefox.",
        ],
      },
    ],
  },
  {
    id: "vault-secrets",
    title: "Vault : gérer les secrets",
    level: 3,
    intro:
      "Stocker les secrets localement, jamais dans les collections.",
    blocks: [
      {
        kind: "text",
        text: "Le Postman Vault stocke les valeurs sensibles (tokens, mots de passe, clés API) chiffrées localement, hors synchronisation cloud. Dans les requêtes, on référence le secret par son nom ; sa valeur n'apparaît ni dans l'interface, ni dans les exports, ni dans les logs.",
      },
      {
        kind: "list",
        items: [
          "Tout secret utilisé dans une collection partagée doit venir du Vault, pas d'une variable d'environnement synchronisée.",
          "En CI, les secrets viennent des secrets du pipeline (GitHub Secrets…), injectés via `--env-var`.",
          "Auditer régulièrement : un token de test qui traîne dans une collection exportée est un incident de sécurité.",
        ],
      },
    ],
  },
  {
    id: "performance-testing",
    title: "Tests de performance",
    level: 3,
    intro:
      "Mesurer le comportement de l'API sous charge, depuis Postman.",
    blocks: [
      {
        kind: "text",
        text: "Postman propose des tests de performance : on définit un profil de charge (utilisateurs virtuels, durée, montée en charge) sur une collection, et Postman mesure temps de réponse, débit et taux d'erreur. Suffisant pour un premier dimensionnement ou pour détecter une régression de performance.",
      },
      {
        kind: "list",
        items: [
          "Commencer petit : valider le scénario à charge faible avant de monter.",
          "Tester contre un environnement dédié, jamais la production.",
          "Pour des scénarios très poussés (milliers d'utilisateurs, protocoles exotiques), des outils spécialisés complètent Postman.",
        ],
      },
    ],
  },
  {
    id: "api-postman",
    title: "L'API Postman : automatiser Postman lui-même",
    level: 3,
    intro:
      "Gérer collections, environnements et monitors par programme.",
    blocks: [
      {
        kind: "text",
        text: "L'API Postman (api.getpostman.com, authentifiée par clé) permet de créer, mettre à jour et exécuter les ressources Postman depuis des scripts : synchroniser une collection depuis un pipeline, créer un monitor par programme, extraire les résultats d'exécution.",
      },
      {
        kind: "list",
        items: [
          "Cas d'usage : générer des collections depuis le code, intégrer les résultats de monitors à un dashboard interne.",
          "La clé d'API a les droits du compte : la traiter comme un secret, avec une rotation régulière.",
          "Pour l'exécution en CI, le Postman CLI reste plus simple que l'API brute.",
        ],
      },
    ],
  },
  {
    id: "organiser-collections",
    title: "Organiser les grandes collections",
    level: 3,
    intro:
      "Ce qui sépare une collection utilisable d'un dépotoir de requêtes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Dossiers par domaine métier, pas par méthode HTTP : « Commandes » plutôt que « POST ».",
          "Nommage d'action : « Créer une commande », « Lister les produits en promo ».",
          "Ordre logique : authentification d'abord, puis CRUD par ressource, puis scénarios.",
          "Descriptions Markdown sur la collection, les dossiers et les requêtes non triviales.",
          "Exemples de réponses sauvegardés pour chaque cas (succès, erreurs) : ils servent aux mocks et à la doc.",
          "Variables plutôt que valeurs en dur, partout.",
          "Revue régulière : supprimer les requêtes obsolètes, comme on supprime le code mort.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-pro",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Ce qui distingue un usage artisanal d'un usage professionnel de Postman.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une collection par API, organisée par domaine, avec descriptions.",
          "Environnements par cible (dev/staging/prod), jamais d'URL en dur.",
          "Tests sur chaque requête : statut, structure, cas d'erreur.",
          "Secrets dans le Vault ou les secrets CI, jamais dans les collections.",
          "Collections versionnées (Git) et relues comme du code.",
          "CI : exécution automatique à chaque déploiement, merge bloqué sur échec.",
          "Monitors sur la production pour les parcours critiques.",
          "Documentation générée depuis la collection, à jour par construction.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes et solutions",
    level: 3,
    intro:
      "Les problèmes que l'on rencontre vraiment avec Postman.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Solution"],
        rows: [
          ["`Could not get response`", "Serveur injoignable ou SSL invalide", "Vérifier que l'API tourne, l'URL, et désactiver la vérification SSL uniquement en local si besoin"],
          ["Variable non substituée (`{{x}}` envoyé tel quel)", "Variable inexistante dans l'environnement actif", "Vérifier le nom, l'environnement sélectionné, et la console pour voir l'URL réelle"],
          ["401 sur toutes les requêtes", "Token expiré ou mal hérité", "Régénérer le token, vérifier l'héritage d'authentification de la collection"],
          ["Tests qui passent seuls mais échouent en Runner", "Ordre d'exécution ou variables écrasées", "Vérifier le chaînage (extraction → variable) et l'isolation des itérations"],
          ["Collection vide après import", "Mauvais format ou version", "Vérifier le format (collection v2.1), réexporter depuis la source"],
          ["Newman/CLI : `401` en CI mais pas en local", "Secret manquant ou mal injecté", "Vérifier les secrets du pipeline et les `--env-var`"],
        ],
      },
    ],
  },
  {
    id: "projet-collection-tests",
    title: "Projet : collection de tests complète",
    level: 3,
    intro:
      "Le projet canonique : une API testée de bout en bout.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir l'API",
            detail: "Une API existante (projet personnel) ou une API publique avec écriture.",
          },
          {
            title: "Structurer la collection",
            detail: "Dossiers par domaine, authentification héritée, environnements dev/prod.",
          },
          {
            title: "Écrire les tests",
            detail: "Statut, structure et cas d'erreur pour chaque endpoint. Chaînage : token et ids extraits automatiquement.",
          },
          {
            title: "Ajouter les jeux de données",
            detail: "Fichier JSON d'itérations pour les cas limites (emails invalides, champs manquants).",
          },
          {
            title: "Automatiser",
            detail: "Postman CLI en CI : la collection s'exécute à chaque déploiement, avec rapport.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-documenter-api",
    title: "Projet : documenter une API publique",
    level: 3,
    intro:
      "Produire une documentation qu'un développeur externe peut vraiment utiliser.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Couvrir tous les endpoints",
            detail: "Chaque endpoint public a sa requête, avec paramètres documentés et exemples de réponses (succès + erreurs).",
          },
          {
            title: "Rédiger les descriptions",
            detail: "Intention de chaque endpoint, format des paramètres, codes d'erreur possibles — en Markdown.",
          },
          {
            title: "Ajouter un guide de démarrage",
            detail: "Description de la collection : authentification, environnements, ordre d'appel typique.",
          },
          {
            title: "Publier",
            detail: "Documentation générée et publiée ; la tester avec un collègue qui ne connaît pas l'API.",
          },
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
            label: "Learning Center",
            value: "learning.postman.com : la documentation complète — requêtes, tests, mocks, CI.",
          },
          {
            label: "API Network",
            value: "postman.com/explore : des API publiques documentées pour s'exercer.",
          },
          {
            label: "Référence des scripts",
            value: "La documentation de l'objet `pm` : toutes les méthodes de test et de pré-requête.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les projets de cette page — collection de tests, puis documentation.",
          "Complément : les compétences `http`, `rest` et `fetch-api` pour les fondamentaux.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Postman maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir les fondamentaux avec `http` et `rest` : comprendre ce que Postman abstrait.",
          "Construire des API avec `nodejs` : tester ses propres endpoints avec ses propres collections.",
          "Automatiser avec `cicd` : qualité gates, tests d'API à chaque déploiement.",
          "Élargir aux tests E2E avec `playwright` : de l'API au navigateur.",
          "Revenir à la roadmap : valider Postman et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

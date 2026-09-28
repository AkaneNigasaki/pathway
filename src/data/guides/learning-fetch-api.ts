import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la Fetch API : requêtes HTTP en JavaScript,
 * lecture des réponses, envoi de données, erreurs, annulation, auth et
 * patterns (retry, pagination, cache). Tous les textes supportent le code
 * inline entre backticks.
 */
export const LEARNING_FETCH_API: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que fait `fetch()` et sa place dans le web moderne.",
    blocks: [
      {
        kind: "text",
        text: "La Fetch API est l'interface native du navigateur (et de Node.js 18+) pour effectuer des requêtes HTTP en JavaScript : récupérer des données d'une API, envoyer un formulaire, télécharger un fichier. Elle remplace l'ancienne `XMLHttpRequest`, avec une API basée sur les promesses, plus lisible et composable.",
      },
      {
        kind: "text",
        text: "`fetch(url)` retourne une promesse qui se résout en un objet `Response`. On lit ensuite le corps avec `.json()`, `.text()` ou `.blob()` — eux-mêmes asynchrones. Ce « double await » surprend au début : il vient du fait que les en-têtes arrivent avant le corps complet.",
      },
      {
        kind: "text",
        text: "Point crucial : `fetch` ne rejette que sur erreur réseau (pas de connexion, DNS, CORS bloqué). Une réponse 404 ou 500 résout normalement la promesse : c'est à vous de tester `response.ok` ou `response.status`. C'est l'erreur n°1 des débutants.",
      },
    ],
  },
  {
    id: "requete-30s",
    title: "Une requête en 30 secondes",
    level: 1,
    intro:
      "Le pattern de base à connaître par cœur.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "GET minimal avec async/await",
        code: `async function chargerUtilisateurs() {\n  const reponse = await fetch("https://jsonplaceholder.typicode.com/users");\n  if (!reponse.ok) {\n    throw new Error("Erreur HTTP : " + reponse.status);\n  }\n  const utilisateurs = await reponse.json(); // parse le corps JSON\n  console.log(utilisateurs);\n}\n\nchargerUtilisateurs();`,
      },
      {
        kind: "text",
        text: "API d'exemple : `jsonplaceholder.typicode.com`, une fausse API REST gratuite, sans clé, faite pour s'entraîner (`/users`, `/posts`, `/comments`). Tout ce parcours l'utilise pour les exemples.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "prerequis-fetch",
    title: "Prérequis",
    level: 2,
    intro:
      "Les fondations avant les requêtes réseau.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations requises",
        fields: [
          {
            label: "JavaScript asynchrone",
            value:
              "Promesses et `async/await` : la compétence `async-js`. `fetch` est inutilisable sans les comprendre.",
          },
          {
            label: "JSON",
            value:
              "Le format d'échange standard : objets, tableaux, `JSON.parse` / `JSON.stringify`.",
          },
          {
            label: "Bases HTTP",
            value:
              "Méthodes (GET, POST…), codes de statut (200, 404, 500), en-têtes : la compétence `http` ou la section dédiée ci-dessous.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-get",
    title: "Premier GET détaillé",
    level: 2,
    intro:
      "Chaque étape d'une requête expliquée.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Appeler fetch",
            detail:
              "`fetch(url)` envoie une requête GET et retourne immédiatement une promesse.",
          },
          {
            title: "Attendre les en-têtes",
            detail:
              "`await` : la promesse se résout quand les en-têtes de réponse arrivent. Le corps n'est pas encore lu.",
          },
          {
            title: "Vérifier le statut",
            detail:
              "`reponse.ok` (statut 200-299) ou `reponse.status` : `fetch` ne rejette PAS sur 404/500.",
          },
          {
            title: "Lire le corps",
            detail:
              "`await reponse.json()` : lit le flux et parse le JSON. Autre promesse, autre `await`.",
          },
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Version .then() équivalente",
        code: `fetch("https://jsonplaceholder.typicode.com/posts/1")\n  .then((reponse) => {\n    if (!reponse.ok) throw new Error("HTTP " + reponse.status);\n    return reponse.json();\n  })\n  .then((article) => console.log(article.title))\n  .catch((erreur) => console.error("Échec :", erreur.message));`,
      },
    ],
  },
  {
    id: "lire-reponse",
    title: "Lire une réponse",
    level: 2,
    intro:
      "Les quatre façons de lire le corps, et les métadonnées.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Retourne", "Usage"],
        rows: [
          ["`reponse.json()`", "Objet JS parsé", "APIs REST (le cas courant)"],
          ["`reponse.text()`", "Chaîne brute", "HTML, CSV, texte simple"],
          ["`reponse.blob()`", "Blob binaire", "Images, PDF, fichiers à télécharger"],
          ["`reponse.arrayBuffer()`", "Buffer binaire", "Traitement bas niveau (audio, wasm)"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Métadonnées utiles",
        code: `const r = await fetch("https://jsonplaceholder.typicode.com/posts/1");\n\nr.ok;                 // true si statut 200–299\nr.status;             // 200\nr.statusText;         // "OK"\nr.headers.get("content-type"); // "application/json; charset=utf-8"\nr.url;                // URL finale (après redirections)\nr.redirected;         // true si redirection suivie`,
      },
      {
        kind: "text",
        text: "Le corps ne se lit qu'une fois : après `await r.json()`, un second appel échoue. Besoin de le lire deux fois ? Clonez : `const copie = r.clone()`.",
      },
    ],
  },
  {
    id: "envoyer-donnees",
    title: "Envoyer des données (POST)",
    level: 2,
    intro:
      "Créer une ressource avec un corps JSON.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "POST JSON",
        code: `const reponse = await fetch("https://jsonplaceholder.typicode.com/posts", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json", // on envoie du JSON\n  },\n  body: JSON.stringify({\n    title: "Mon article",\n    body: "Contenu…",\n    userId: 1,\n  }),\n});\n\nconst cree = await reponse.json();\nconsole.log(cree.id); // la fausse API répond 201 avec un id`,
      },
      {
        kind: "list",
        items: [
          "`method`, `headers`, `body` : les trois options de base pour envoyer.",
          "`JSON.stringify` obligatoire : `fetch` n'encode pas les objets tout seul.",
          "`Content-Type: application/json` : dit au serveur comment parser le corps.",
          "Note : JSONPlaceholder simule l'écriture (répond 201) sans vraiment persister — parfait pour s'entraîner.",
        ],
      },
    ],
  },
  {
    id: "erreurs-http",
    title: "Gérer les erreurs HTTP",
    level: 2,
    intro:
      "Le point que tout le monde rate au début.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Gestion complète",
        code: `async function charger(url) {\n  let reponse;\n  try {\n    reponse = await fetch(url);\n  } catch (erreur) {\n    // Erreur RÉSEAU : pas de connexion, DNS, CORS bloqué\n    throw new Error("Réseau indisponible");\n  }\n\n  if (!reponse.ok) {\n    // Erreur HTTP : 404, 500… (fetch a RÉSOLU, pas rejeté)\n    if (reponse.status === 404) throw new Error("Ressource introuvable");\n    throw new Error("Erreur serveur : " + reponse.status);\n  }\n\n  return reponse.json();\n}`,
      },
      {
        kind: "text",
        text: "Deux familles d'erreurs, deux traitements : le `catch` pour le réseau, le test `!reponse.ok` pour le HTTP. Une fonction utilitaire `charger()` comme ci-dessus, réutilisée partout, évite les oublis.",
      },
    ],
  },
  {
    id: "api-rest-bases",
    title: "Bases de REST",
    level: 2,
    intro:
      "Le vocabulaire des APIs : ressources, méthodes, statuts.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Action", "Exemple"],
        rows: [
          ["GET", "Lire", "`GET /posts` (liste), `GET /posts/1` (un)"],
          ["POST", "Créer", "`POST /posts` + corps JSON"],
          ["PUT", "Remplacer entièrement", "`PUT /posts/1` + ressource complète"],
          ["PATCH", "Modifier partiellement", "`PATCH /posts/1` + champs changés"],
          ["DELETE", "Supprimer", "`DELETE /posts/1`"],
        ],
      },
      {
        kind: "table",
        headers: ["Statut", "Signification"],
        rows: [
          ["200 OK", "Succès (GET, PATCH…)"],
          ["201 Created", "Ressource créée (POST)"],
          ["204 No Content", "Succès sans corps (DELETE)"],
          ["400 Bad Request", "Requête invalide (validation)"],
          ["401 Unauthorized", "Authentification requise"],
          ["403 Forbidden", "Authentifié mais non autorisé"],
          ["404 Not Found", "Ressource inexistante"],
          ["500…", "Erreur côté serveur"],
        ],
      },
    ],
  },
  {
    id: "query-params",
    title: "Paramètres d'URL",
    level: 2,
    intro:
      "Filtrer, trier, paginer via la query string.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Construire une URL proprement",
        code: `// ❌ Concaténation manuelle : oublie l'encodage\nconst url = "/api/posts?search=" + terme;\n\n// ✅ URLSearchParams : encode automatiquement\nconst params = new URLSearchParams({\n  search: terme,       // "café crème" → "caf%C3%A9+cr%C3%A8me"\n  tri: "date",\n  page: "2",\n});\nconst reponse = await fetch("/api/posts?" + params);\n\n// Avec une URL de base :\nconst url2 = new URL("https://jsonplaceholder.typicode.com/comments");\nurl2.searchParams.set("postId", "1");\n// → https://jsonplaceholder.typicode.com/comments?postId=1`,
      },
      {
        kind: "text",
        text: "`URLSearchParams` gère l'encodage (`encodeURIComponent` manuel = source de bugs). Conventions courantes : `?page=2&limite=20`, `?tri=-date`, `?q=terme`.",
      },
    ],
  },
  {
    id: "headers-auth",
    title: "En-têtes et authentification",
    level: 2,
    intro:
      "S'identifier auprès d'une API.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Token Bearer",
        code: `const reponse = await fetch("/api/profil", {\n  headers: {\n    // Le standard pour les tokens (JWT, OAuth2)\n    Authorization: "Bearer " + token,\n    "Content-Type": "application/json",\n  },\n});`,
      },
      {
        kind: "table",
        headers: ["Schéma", "Format", "Usage"],
        rows: [
          ["Bearer", "`Authorization: Bearer <token>`", "JWT, OAuth2 — le plus courant"],
          ["Basic", "`Authorization: Basic <base64>`", "Identifiants simples (à éviter sans HTTPS)"],
          ["Clé d'API", "`X-API-Key: <clé>` (ou en query)", "APIs publiques/tiers"],
        ],
      },
      {
        kind: "text",
        text: "Ne jamais mettre de secret dans le code frontend visible : les clés d'API exposées sont volées. En production, l'authentification passe par un backend ou des tokens à courte durée de vie.",
      },
    ],
  },
  {
    id: "annuler-requete",
    title: "Annuler une requête",
    level: 2,
    intro:
      "`AbortController` : le bouton stop des requêtes.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Annulation",
        code: `const controleur = new AbortController();\n\n// Lancer\nfetch("/api/recherche?q=" + terme, { signal: controleur.signal })\n  .then((r) => r.json())\n  .then(afficher)\n  .catch((e) => {\n    if (e.name === "AbortError") return; // annulation volontaire : normal\n    console.error(e);\n  });\n\n// Annuler (ex. nouvelle frappe avant la fin de la précédente)\ncontroleur.abort();`,
      },
      {
        kind: "text",
        text: "Cas d'usage : recherche en direct (annuler la requête précédente à chaque frappe), navigation (annuler les requêtes d'une page quittée), timeouts (voir niveau 3).",
      },
    ],
  },
  {
    id: "devtools-network-intro",
    title: "L'onglet Network des DevTools",
    level: 2,
    intro:
      "Voir réellement ce que `fetch` envoie et reçoit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Onglet Network : chaque requête `fetch` apparaît avec méthode, statut, durée, taille.",
          "Cliquez sur une requête : onglets Headers (en-têtes), Payload (corps envoyé), Response (corps reçu), Timing.",
          "Filtres : « Fetch/XHR » pour ne voir que les appels JS, champ de recherche pour retrouver une URL.",
          "« Copy as fetch » : clic droit → copie la requête en code `fetch()` prêt à coller — parfait pour reproduire un bug.",
          "Case « Disable cache » et throttling réseau pour tester les cas lents.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-fetch",
    title: "Les erreurs les plus courantes",
    level: 2,
    intro:
      "Les pièges classiques des débuts avec `fetch`.",
    blocks: [
      {
        kind: "list",
        items: [
          "Oublier que `fetch` ne rejette pas sur 404/500 : toujours tester `reponse.ok`.",
          "Oublier le second `await` : `reponse.json()` retourne une promesse, pas les données.",
          "Envoyer un objet sans `JSON.stringify` : le corps devient `[object Object]`.",
          "Oublier `Content-Type: application/json` en POST : le serveur ne parse pas le corps.",
          "Lire le corps deux fois sans `clone()` : le flux est consommé.",
          "`await` hors d'une fonction `async` (ou hors module) : erreur de syntaxe.",
        ],
      },
    ],
  },
  {
    id: "projet-meteo",
    title: "Projet : app météo",
    level: 2,
    intro:
      "Une vraie API publique, de la saisie à l'affichage.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir l'API",
            detail:
              "Open-Meteo (`api.open-meteo.com`) : gratuite, sans clé. Exemple : `/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m`.",
          },
          {
            title: "Interface",
            detail:
              "Champ de ville (ou coordonnées), bouton, zone de résultat, état de chargement, zone d'erreur.",
          },
          {
            title: "Logique",
            detail:
              "`fetch` + `reponse.ok` + `await reponse.json()` ; afficher température et conditions ; gérer proprement les trois états (chargement / succès / erreur).",
          },
          {
            title: "Améliorations",
            detail:
              "Debounce sur la saisie, `AbortController` pour annuler, mise en cache de la dernière recherche.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "reponse-detail",
    title: "L'objet Response en détail",
    level: 3,
    intro:
      "Tout ce qu'une réponse transporte, au-delà du corps.",
    blocks: [
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "En-têtes",
            value:
              "`reponse.headers` (objet `Headers`) : `get()`, `has()`. Insensibles à la casse. Attention : en CORS, seuls les en-têtes exposés via `Access-Control-Expose-Headers` sont lisibles.",
          },
          {
            label: "Redirections",
            value:
              "`fetch` suit les redirections par défaut (`redirect: \"follow\"`, max ~20). `r.redirected` et `r.url` révèlent l'URL finale. `redirect: \"manual\"` pour les gérer soi-même.",
          },
          {
            label: "Corps en streaming",
            value:
              "`reponse.body` est un `ReadableStream` : pour les gros fichiers ou le SSE, lisez par morceaux au lieu de tout charger en mémoire.",
          },
          {
            label: "Clonage",
            value:
              "`r.clone()` : deux lectures indépendantes (ex. logger le texte brut ET parser le JSON).",
          },
        ],
      },
    ],
  },
  {
    id: "post-put-patch-delete",
    title: "PUT, PATCH, DELETE en pratique",
    level: 3,
    intro:
      "Au-delà du POST : le CRUD complet.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Les quatre écritures",
        code: `const base = "https://jsonplaceholder.typicode.com/posts";\n\n// PUT : remplacement complet (envoyer la ressource entière)\nawait fetch(base + "/1", {\n  method: "PUT",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ id: 1, title: "Nouveau titre", body: "…", userId: 1 }),\n});\n\n// PATCH : modification partielle (seuls les champs changés)\nawait fetch(base + "/1", {\n  method: "PATCH",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ title: "Titre corrigé" }),\n});\n\n// DELETE : suppression (souvent 200 ou 204, corps vide)\nconst suppr = await fetch(base + "/1", { method: "DELETE" });\nconsole.log(suppr.ok); // true`,
      },
      {
        kind: "text",
        text: "Sémantique : PUT = idempotent (répéter = même résultat), PATCH = partiel, DELETE = suppression. En pratique, beaucoup d'APIs n'implémentent que GET/POST : lisez toujours leur documentation.",
      },
    ],
  },
  {
    id: "json-detail",
    title: "JSON : les subtilités",
    level: 3,
    intro:
      "Ce que `JSON.parse` ne vous dit pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "`response.json()` rejette si le corps n'est pas du JSON valide : attrapez l'erreur (une page d'erreur HTML à la place du JSON arrive plus souvent qu'on croit).",
          "Dates : JSON n'a pas de type date — les APIs envoient des chaînes ISO (`\"2026-09-29T…\"`) à convertir en `Date`.",
          "Grands nombres : au-delà de `Number.MAX_SAFE_INTEGER`, la précision se perd — certaines APIs envoient les ids en chaînes.",
          "`JSON.stringify` ignore `undefined`, les fonctions et les symboles ; échoue sur les références circulaires.",
          "En-tête `Accept: application/json` : dit au serveur le format souhaité (négociation de contenu).",
        ],
      },
    ],
  },
  {
    id: "formdata-upload",
    title: "FormData et upload de fichiers",
    level: 3,
    intro:
      "Envoyer des formulaires et des fichiers.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Upload de fichier",
        code: `const input = document.querySelector("#avatar");\nconst fichier = input.files[0];\n\nconst form = new FormData();\nform.append("avatar", fichier);       // le fichier\nform.append("legende", "Ma photo");   // un champ texte\n\nconst reponse = await fetch("/api/upload", {\n  method: "POST",\n  body: form,\n  // ⚠️ Ne PAS définir Content-Type manuellement :\n  // le navigateur génère le boundary multipart tout seul.\n});`,
      },
      {
        kind: "list",
        items: [
          "`new FormData(formulaire)` : sérialise un `<form>` entier, fichiers inclus.",
          "Le `Content-Type` auto-généré (`multipart/form-data; boundary=…`) : le définir à la main casse l'upload — erreur classique.",
          "Progression d'upload : `fetch` ne l'expose pas ; pour une barre de progression, `XMLHttpRequest` reste nécessaire.",
        ],
      },
    ],
  },
  {
    id: "cors-detail",
    title: "CORS expliqué",
    level: 3,
    intro:
      "Pourquoi le navigateur bloque certaines requêtes — et comment s'en sortir.",
    blocks: [
      {
        kind: "text",
        text: "La Same-Origin Policy : une page ne peut lire les réponses que de sa propre origine (protocole + domaine + port), sauf si le serveur l'autorise via des en-têtes CORS (`Access-Control-Allow-Origin`). Sans eux : l'erreur « blocked by CORS policy » et une réponse illisible.",
      },
      {
        kind: "table",
        headers: ["Situation", "Ce qui se passe"],
        rows: [
          ["Requête simple (GET/POST standard)", "Envoyée directement ; le navigateur vérifie l'en-tête CORS à la réponse"],
          ["Requête avec en-tête custom ou PUT/DELETE", "Preflight : le navigateur envoie d'abord OPTIONS pour demander la permission"],
          ["Serveur sans en-tête CORS", "La requête part, mais le JS ne peut pas lire la réponse"],
        ],
      },
      {
        kind: "list",
        items: [
          "CORS se configure CÔTÉ SERVEUR : en frontend pur, on ne le « contourne » pas légitimement.",
          "En développement : proxy du bundler (Vite : `server.proxy`) pour rediriger `/api` vers le backend.",
          "Extensions « disable CORS » : uniquement pour tester, jamais une solution.",
          "`mode: \"no-cors\"` : la réponse devient opaque (illisible) — utile pour du fire-and-forget (analytics), pas pour lire des données.",
        ],
      },
    ],
  },
  {
    id: "auth-jwt",
    title: "Authentification par JWT",
    level: 3,
    intro:
      "Le flow token standard des SPAs.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Login",
            detail:
              "`POST /auth/login` avec identifiants → le serveur répond un access token (court, ~15 min) et un refresh token (long, ~jours).",
          },
          {
            title: "Requêtes authentifiées",
            detail:
              "Chaque `fetch` inclut `Authorization: Bearer <access_token>`.",
          },
          {
            title: "Stockage",
            detail:
              "En mémoire (variable JS) = le plus sûr contre le XSS persistant ; `localStorage` = pratique mais lisible par tout script injecté. Les cookies `HttpOnly` + `SameSite` sont l'option la plus robuste (le JS ne les voit pas).",
          },
          {
            title: "Expiration",
            detail:
              "À 401, utiliser le refresh token pour obtenir un nouvel access token, puis rejouer la requête (section suivante).",
          },
        ],
      },
      {
        kind: "text",
        text: "Un JWT se décrypte (base64) : n'y mettez jamais de secret, seulement des claims non sensibles (id utilisateur, rôles, expiration). La signature garantit l'intégrité, pas la confidentialité.",
      },
    ],
  },
  {
    id: "tokens-refresh",
    title: "Refresh automatique des tokens",
    level: 3,
    intro:
      "Rejouer les requêtes après renouvellement, sans doublons.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Wrapper fetch avec refresh",
        code: `let refreshEnCours = null;\n\nasync function api(url, options = {}) {\n  const avecAuth = () => ({\n    ...options,\n    headers: { ...options.headers, Authorization: "Bearer " + accessToken },\n  });\n\n  let reponse = await fetch(url, avecAuth());\n\n  if (reponse.status === 401) {\n    // Un seul refresh même si plusieurs requêtes échouent ensemble\n    refreshEnCours ??= renouvellerToken();\n    await refreshEnCours;\n    refreshEnCours = null;\n    reponse = await fetch(url, avecAuth()); // rejoue avec le nouveau token\n  }\n\n  if (!reponse.ok) throw new Error("HTTP " + reponse.status);\n  return reponse.json();\n}`,
      },
      {
        kind: "text",
        text: "Le point délicat : plusieurs requêtes en 401 simultanées ne doivent déclencher qu'un seul refresh (d'où la promesse partagée). Si le refresh échoue : déconnexion et redirection vers le login.",
      },
    ],
  },
  {
    id: "retry-logic",
    title: "Retry avec backoff",
    level: 3,
    intro:
      "Réessayer intelligemment les échecs transitoires.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Retry exponentiel",
        code: `async function fetchAvecRetry(url, options = {}, essais = 3) {\n  for (let i = 0; i < essais; i++) {\n    try {\n      const reponse = await fetch(url, options);\n      // On réessaie les 5xx et 429, pas les 4xx (faute du client)\n      if (reponse.ok || (reponse.status < 500 && reponse.status !== 429)) {\n        return reponse;\n      }\n    } catch (e) {\n      if (i === essais - 1) throw e; // dernier essai : on abandonne\n    }\n    // Backoff exponentiel : 1s, 2s, 4s… (+ jitter en production)\n    await new Promise((r) => setTimeout(r, 1000 * 2 ** i));\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "Réessayez : erreurs réseau, 5xx, 429 (rate limit — respectez `Retry-After` si présent).",
          "Ne réessayez jamais : 4xx (sauf 429), et les requêtes non idempotentes (POST de paiement !) sans clé d'idempotence.",
          "Backoff exponentiel + jitter : évite de submerger un serveur qui se relève.",
        ],
      },
    ],
  },
  {
    id: "timeout-fetch",
    title: "Timeouts",
    level: 3,
    intro:
      "`fetch` n'a pas de timeout natif : l'ajouter soi-même.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Timeout avec AbortController",
        code: `async function fetchAvecTimeout(url, ms = 8000, options = {}) {\n  const controleur = new AbortController();\n  const minuteur = setTimeout(() => controleur.abort(), ms);\n\n  try {\n    return await fetch(url, { ...options, signal: controleur.signal });\n  } catch (e) {\n    if (e.name === "AbortError") throw new Error("Délai dépassé (" + ms + " ms)");\n    throw e;\n  } finally {\n    clearTimeout(minuteur); // toujours nettoyer\n  }\n}\n\n// Moderne : AbortSignal.timeout (navigateurs récents + Node 18+)\n// const reponse = await fetch(url, { signal: AbortSignal.timeout(8000) });`,
      },
      {
        kind: "text",
        text: "Sans timeout, une requête pendante bloque l'UI indéfiniment. 8-10 s est un défaut raisonnable ; ajustez selon l'API. `AbortSignal.timeout()` est la forme moderne quand le support le permet.",
      },
    ],
  },
  {
    id: "debounce-search",
    title: "Recherche avec debounce + annulation",
    level: 3,
    intro:
      "Le pattern complet de la recherche en direct.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Pattern combiné",
        code: `let controleur = null;\n\nconst rechercher = debounce(async (terme) => {\n  controleur?.abort(); // annule la requête précédente\n  controleur = new AbortController();\n\n  try {\n    const reponse = await fetch("/api/search?q=" + encodeURIComponent(terme), {\n      signal: controleur.signal,\n    });\n    afficher(await reponse.json());\n  } catch (e) {\n    if (e.name !== "AbortError") afficherErreur(e);\n  }\n}, 300);\n\nchamp.addEventListener("input", (e) => rechercher(e.target.value));`,
      },
      {
        kind: "text",
        text: "Trois mécanismes combinés : debounce (300 ms d'inactivité), annulation de la requête précédente, `encodeURIComponent` sur le terme. Sans l'annulation, une réponse lente peut écraser une réponse récente (race condition d'affichage).",
      },
    ],
  },
  {
    id: "pagination",
    title: "Pagination côté client",
    level: 3,
    intro:
      "Naviguer dans les résultats paginés.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Pagination par page",
        code: `async function chargerPage(page, limite = 10) {\n  const params = new URLSearchParams({ _page: page, _limit: limite });\n  const reponse = await fetch("https://jsonplaceholder.typicode.com/posts?" + params);\n  // JSONPlaceholder expose le total dans X-Total-Count\n  const total = Number(reponse.headers.get("x-total-count"));\n  return { items: await reponse.json(), total, pages: Math.ceil(total / limite) };\n}`,
      },
      {
        kind: "list",
        items: [
          "Conventions : `?page=2&limit=20` ou curseur (`?cursor=…`) pour les gros volumes.",
          "Le total vient d'un en-tête (`X-Total-Count`) ou du corps (`{ data, total }`) — lisez la doc de l'API.",
          "UX : boutons Précédent/Suivant + numéros, état de chargement par page, scroll vers le haut au changement.",
        ],
      },
    ],
  },
  {
    id: "infinite-scroll",
    title: "Infinite scroll",
    level: 3,
    intro:
      "Charger au fil du défilement.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Avec IntersectionObserver",
        code: `let page = 1;\nlet chargement = false;\nconst sentinelle = document.querySelector("#sentinelle");\n\nnew IntersectionObserver(async ([entree]) => {\n  if (!entree.isIntersecting || chargement) return;\n  chargement = true;\n  const { items } = await chargerPage(page++);\n  ajouterItems(items);\n  chargement = false;\n  if (items.length === 0) observer.disconnect(); // fin des résultats\n}).observe(sentinelle);`,
      },
      {
        kind: "list",
        items: [
          "Une sentinelle invisible en bas de liste déclenche le chargement — pas d'écouteur `scroll` coûteux.",
          "Garde-fou `chargement` : évite les requêtes en double quand l'observer se déclenche vite.",
          "Accessibilité : proposez aussi une vraie pagination ou un bouton « Charger plus » — l'infinite scroll pur complique la navigation clavier.",
        ],
      },
    ],
  },
  {
    id: "cache-strategies",
    title: "Stratégies de cache",
    level: 3,
    intro:
      "Éviter les requêtes inutiles : du plus simple au plus fin.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Principe", "Usage"],
        rows: [
          ["Mémoire (Map)", "Stocker les réponses en JS pendant la session", "Données stables, navigation entre pages"],
          ["`cache: \"force-cache\"`", "Utiliser le cache HTTP du navigateur", "Ressources statiques"],
          ["Stale-while-revalidate", "Afficher le cache, revalider en arrière-plan", "Le meilleur compromis UX/fraîcheur"],
          ["Service Worker", "Intercepter et servir depuis un cache persistant", "Offline-first, PWA"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Stale-while-revalidate maison",
        code: `const cache = new Map();\n\nasync function getAvecCache(url) {\n  if (cache.has(url)) {\n    // 1. Réponse immédiate depuis le cache…\n    const ancienne = cache.get(url);\n    // 2. …pendant qu'on revalide en arrière-plan\n    fetch(url).then(async (r) => cache.set(url, await r.json()));\n    return ancienne;\n  }\n  const donnees = await (await fetch(url)).json();\n  cache.set(url, donnees);\n  return donnees;\n}`,
      },
    ],
  },
  {
    id: "etag-cache",
    title: "Cache HTTP : ETag et 304",
    level: 3,
    intro:
      "Laisser le protocole faire le travail.",
    blocks: [
      {
        kind: "text",
        text: "Le serveur peut joindre un `ETag` (empreinte de la ressource) à sa réponse. À la requête suivante, le client envoie `If-None-Match: <etag>` : si rien n'a changé, le serveur répond `304 Not Modified` sans corps — économie de bande passante. `fetch` gère le cache HTTP du navigateur automatiquement pour les GET ; pour un contrôle fin, gérez les en-têtes vous-même.",
      },
      {
        kind: "list",
        items: [
          "`Cache-Control: max-age=60` : le serveur dit combien de temps la réponse est fraîche.",
          "Pour les données d'API dynamiques, le cache applicatif (section précédente) est souvent plus pertinent que le cache HTTP.",
        ],
      },
    ],
  },
  {
    id: "optimistic-ui",
    title: "UI optimiste",
    level: 3,
    intro:
      "Afficher le résultat avant la réponse du serveur.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Like optimiste avec rollback",
        code: `async function liker(postId) {\n  // 1. Mise à jour immédiate de l'UI\n  const bouton = document.querySelector("#like-" + postId);\n  bouton.classList.add("aime");\n  bouton.disabled = true;\n\n  try {\n    // 2. Requête réelle\n    await fetch("/api/posts/" + postId + "/like", { method: "POST" });\n  } catch (e) {\n    // 3. Échec : on annule l'optimisme\n    bouton.classList.remove("aime");\n    notifier("Échec, réessayez.");\n  } finally {\n    bouton.disabled = false;\n  }\n}`,
      },
      {
        kind: "text",
        text: "L'UI optimiste rend l'app instantanée (likes, todos, votes). Conditions : opération réversible, rollback soigné en cas d'échec, et jamais pour les actions critiques non idempotentes (paiement).",
      },
    ],
  },
  {
    id: "error-handling-patterns",
    title: "Patterns de gestion d'erreur",
    level: 3,
    intro:
      "Une stratégie d'erreur cohérente dans toute l'app.",
    blocks: [
      {
        kind: "list",
        items: [
          "Classe d'erreur dédiée : `class HttpError extends Error { constructor(status, body) }` — le `status` voyage avec l'erreur.",
          "Wrapper unique (`api()`) : timeout, auth, refresh, retry et mapping d'erreurs au même endroit — les composants ne voient que des erreurs métier.",
          "Erreurs de validation (400/422) : le serveur retourne `{ erreurs: { champ: message } }` → affichez-les champ par champ.",
          "Erreurs fatales (500) : message générique + id de corrélation pour le support, jamais de stack trace à l'utilisateur.",
          "Hors-ligne : `navigator.onLine` + événements `online`/`offline` pour un bandeau « connexion perdue ».",
        ],
      },
    ],
  },
  {
    id: "loading-states",
    title: "États de chargement",
    level: 3,
    intro:
      "Les trois états de toute donnée distante.",
    blocks: [
      {
        kind: "table",
        headers: ["État", "Affichage", "Note"],
        rows: [
          ["Chargement", "Spinner ou skeleton", "Skeletons > spinners : la mise en page ne saute pas"],
          ["Succès", "Les données", "—"],
          ["Erreur", "Message + bouton Réessayer", "Toujours une action de sortie"],
          ["Vide", "« Aucun résultat » + suggestion", "Un état à part entière, pas une erreur"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Machine à états minimale",
        code: `async function chargerEtAfficher() {\n  setEtat("chargement");\n  try {\n    const donnees = await api("/api/posts");\n    donnees.length ? setEtat("succes", donnees) : setEtat("vide");\n  } catch (e) {\n    setEtat("erreur", e);\n  }\n}\n// setEtat() met à jour le DOM selon l'état : une seule fonction,\n// pas de HTML manipulé à moitié dans chaque branche.`,
      },
    ],
  },
  {
    id: "sse-intro",
    title: "Temps réel : SSE et WebSocket (aperçu)",
    level: 3,
    intro:
      "Quand le polling ne suffit plus.",
    blocks: [
      {
        kind: "table",
        headers: ["Technique", "Sens", "Usage"],
        rows: [
          ["Polling", "Client → serveur, répété", "Simple, suffisant si données peu fréquentes"],
          ["SSE (`EventSource`)", "Serveur → client, flux HTTP", "Notifications, scores en direct, logs"],
          ["WebSocket", "Bidirectionnel persistant", "Chat, jeux, collaboration temps réel"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "SSE : le plus simple du temps réel",
        code: `// Le serveur envoie "data: {...}\\n\\n" en continu\nconst source = new EventSource("/api/notifications/stream");\n\nsource.addEventListener("message", (e) => {\n  const notif = JSON.parse(e.data);\n  afficherNotification(notif);\n});\n\nsource.onerror = () => {\n  // EventSource reconnecte automatiquement ;\n  // ici : basculer en mode dégradé si besoin\n};\n\n// Fermer quand on n'en a plus besoin : source.close();`,
      },
      {
        kind: "text",
        text: "Règle : commencez par du polling ou du SWR ; passez au SSE pour les flux serveur→client ; au WebSocket pour le bidirectionnel. Chaque niveau ajoute de la complexité opérationnelle.",
      },
    ],
  },
  {
    id: "testing-fetch",
    title: "Tester le code qui fetch",
    level: 3,
    intro:
      "Des tests sans vrai réseau.",
    blocks: [
      {
        kind: "list",
        items: [
          "Mock de `fetch` : remplacez `globalThis.fetch` par une fonction qui retourne des `Response` construites (`new Response(JSON.stringify(data), { status: 200 })`).",
          "Ne testez pas `fetch` lui-même (c'est le navigateur), testez VOTRE logique : parsing, gestion d'erreur, états.",
          "Scénarios à couvrir : succès, 404, 500, erreur réseau (mock qui rejette), timeout.",
          "Outils : les frameworks de test (Vitest, Jest) + `msw` (Mock Service Worker) pour intercepter au niveau réseau sans toucher au code.",
        ],
      },
    ],
  },
  {
    id: "debugging-fetch",
    title: "Déboguer les requêtes",
    level: 3,
    intro:
      "Méthode quand l'API ne répond pas comme prévu.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Regarder le Network",
            detail:
              "Statut, Payload, Response : la requête part-elle ? Avec le bon corps ? Que répond le serveur exactement ?",
          },
          {
            title: "Reproduire hors du code",
            detail:
              "« Copy as fetch » ou `curl` : le problème vient-il de votre code ou de l'API ?",
          },
          {
            title: "Vérifier le CORS",
            detail:
              "Erreur « blocked by CORS policy » = configuration serveur, pas bug JS. Le preflight OPTIONS échoue-t-il ?",
          },
          {
            title: "Isoler le parsing",
            detail:
              "`await reponse.text()` pour voir le corps brut quand `json()` échoue : souvent une page d'erreur HTML.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-subtiles-fetch",
    title: "Erreurs subtiles de niveau avancé",
    level: 3,
    intro:
      "Les pièges qui persistent après des mois de pratique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Race conditions : deux requêtes concurrentes, la plus lente écrase la plus récente — annulez (`AbortController`) ou ignorez les réponses obsolètes.",
          "Credentials : les cookies ne partent pas par défaut en cross-origin — `fetch(url, { credentials: \"include\" })` + `Access-Control-Allow-Credentials` côté serveur.",
          "En-têtes CORS non exposés : `reponse.headers.get(\"X-Total-Count\")` retourne `null` sans `Access-Control-Expose-Headers`.",
          "Retry sur POST non idempotent : peut créer des doublons — clé d'idempotence ou pas de retry.",
          "Fuite de `setTimeout` dans le wrapper timeout : toujours `clearTimeout` dans un `finally`.",
          "JSON géant parsé d'un coup : bloque le thread principal — streaming ou pagination.",
        ],
      },
    ],
  },
  {
    id: "projet-crud-complet",
    title: "Projet : CRUD complet",
    level: 3,
    intro:
      "Le projet de synthèse : une app qui fait tout.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "API",
            detail:
              "JSONPlaceholder (`/posts`) : GET liste, GET un, POST créer, PATCH modifier, DELETE supprimer.",
          },
          {
            title: "Client HTTP",
            detail:
              "Wrapper `api()` : base URL, `reponse.ok`, erreurs typées, timeout. Un seul endroit pour toute la logique réseau.",
          },
          {
            title: "Interface",
            detail:
              "Liste + formulaire de création/édition + suppression avec confirmation. Les 4 états (chargement/succès/erreur/vide) partout.",
          },
          {
            title: "Polish",
            detail:
              "UI optimiste sur la suppression, retry sur les 5xx, pagination de la liste.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-dashboard-temps-reel",
    title: "Projet : dashboard temps réel",
    level: 3,
    intro:
      "Polling intelligent + SSE sur un tableau de bord.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Données",
            detail:
              "Deux sources : une API REST pour l'état initial, un flux (SSE ou polling) pour les mises à jour.",
          },
          {
            title: "Stratégie",
            detail:
              "Stale-while-revalidate à l'ouverture, puis mises à jour incrémentales — pas de re-fetch complet.",
          },
          {
            title: "Robustesse",
            detail:
              "Reconnexion automatique, backoff, indicateur « données à jour / en attente », pause quand l'onglet est caché (`visibilitychange`).",
          },
          {
            title: "Bilan",
            detail:
              "Vous avez couvert le cycle de vie complet des données distantes : c'est 80 % du frontend moderne.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-fetch",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par les sources officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "MDN — Fetch API", value: "developer.mozilla.org/fr/docs/Web/API/Fetch_API : le guide complet, d'Utilisation de Fetch aux interfaces Request/Response." },
          { label: "MDN — HTTP", value: "developer.mozilla.org/fr/docs/Web/HTTP : méthodes, statuts, en-têtes, CORS." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : JSONPlaceholder (jsonplaceholder.typicode.com) — fausse API REST gratuite pour s'entraîner au CRUD.",
          "Test d'APIs : httpbin.org — renvoie ce que vous lui envoyez, idéal pour inspecter requêtes et en-têtes.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite-fetch",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Fetch maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Backend : `nodejs` + `rest` pour construire vos propres APIs.",
          "Asynchrone avancé : `async-js` (patterns de concurrence, files).",
          "Frameworks : `react` (SWR / TanStack Query pour la data).",
          "Sécurité : `accessibility` et les bonnes pratiques d'authentification.",
          "Revenir à la roadmap : valider Fetch API et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "rate-limit-429",
    title: "Rate limiting : gérer le 429",
    level: 3,
    intro:
      "Quand l'API vous dit de ralentir.",
    blocks: [
      {
        kind: "text",
        text: "Les APIs limitent le nombre de requêtes (ex. 60/minute). Quand la limite est dépassée, elles répondent `429 Too Many Requests`, souvent avec un en-tête `Retry-After` (secondes à attendre). Un client bien élevé lit cet en-tête et attend avant de réessayer, au lieu de marteler le serveur.",
      },
      {
        kind: "code",
        language: "js",
        title: "Respecter Retry-After",
        code: `async function fetchPoli(url, options) {
  const reponse = await fetch(url, options);
  if (reponse.status === 429) {
    const attente = Number(reponse.headers.get("Retry-After") ?? 60);
    await new Promise((r) => setTimeout(r, attente * 1000));
    return fetch(url, options); // un seul réessai poli
  }
  return reponse;
}`,
      },
      {
        kind: "list",
        items: [
          "Prévention : regroupez les requêtes, mettez en cache, utilisez le debounce — moins d'appels = moins de 429.",
          "En-têtes informatifs : `X-RateLimit-Remaining` et `X-RateLimit-Reset` indiquent votre quota.",
          "Un 429 répété signale un problème d'architecture (polling trop agressif), pas juste de la malchance.",
        ],
      },
    ],
  },
];

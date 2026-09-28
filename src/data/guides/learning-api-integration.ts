import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'intégration d'APIs : du premier appel fetch
 * aux architectures résilientes (OAuth, retry, idempotence, webhooks).
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 *
 * Note : les exemples utilisent l'API publique GitHub (sans clé) pour le
 * réel, et https://api.exemple.com comme placeholder explicite ailleurs.
 */
export const LEARNING_API_INTEGRATION: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est l'intégration d'APIs et pourquoi aucune application moderne ne vit seule.",
    blocks: [
      {
        kind: "text",
        text: "L'intégration d'APIs est l'art de faire dialoguer des systèmes entre eux : s'authentifier auprès d'un service, récupérer des données paginées, respecter les quotas, gérer les erreurs réseau, garantir qu'une opération répétée ne crée pas de doublon. C'est le ciment technique des applications modernes et de l'automation.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est une compétence à part : appeler une API une fois dans un tutoriel prend cinq minutes ; l'intégrer en production prend des semaines. Entre les deux : l'authentification qui expire, la pagination des gros volumes, les quotas qui bloquent en pleine nuit, les erreurs transitoires à réessayer intelligemment, les webhooks à sécuriser, le monitoring qui alerte quand un connecteur casse.",
      },
      {
        kind: "text",
        text: "Où on le rencontre : paiement (Stripe et assimilés), envoi d'emails, synchronisation CRM, authentification sociale, stockage cloud, et toute architecture où des services se parlent — c'est-à-dire presque toutes.",
      },
    ],
  },
  {
    id: "integration-robuste",
    title: "Intégrer n'est pas appeler",
    level: 1,
    intro:
      "La différence entre une démo qui marche et une intégration qui tient.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle d'une intégration robuste",
        lines: [
          "[AUTHENTIFICATION]",
          "        │",
          "        ▼",
          "[REQUÊTE]",
          "        │",
          "        ▼",
          "[PAGINATION] ──▶ tous les résultats, pas juste la première page",
          "        │",
          "        ▼",
          "[RETRY] ──▶ les échecs transitoires se réessaient seuls",
          "        │",
          "        ▼",
          "[TRANSFORMATION] ──▶ adapter les données à son modèle",
          "        │",
          "        ▼",
          "[SYNCHRONISATION] ──▶ idempotente : rejouable sans doublon",
        ],
      },
      {
        kind: "text",
        text: "Chaque étape est un point de défaillance potentiel : un token qui expire, une page oubliée, un retry qui duplique un paiement, une transformation qui perd un champ. L'intégration robuste, c'est traiter chaque étape comme un cas nominal — pas comme un détail.",
      },
      {
        kind: "list",
        items: [
          "Un appel qui marche une fois n'est pas une intégration : la production apporte latence, quotas et pannes.",
          "Les concepts clés (OAuth, pagination, rate limits, retry, idempotence, monitoring) sont détaillés dans cette page.",
          "Prérequis : HTTP (méthodes, statuts, en-têtes) et JSON — le vocabulaire des APIs.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "lire-une-doc-api",
    title: "Lire une documentation d'API",
    level: 2,
    intro:
      "Avant le premier appel : savoir extraire l'essentiel d'une doc.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'on cherche dans une doc",
        fields: [
          {
            label: "Base URL",
            value:
              "Le préfixe de tous les appels (ex. `https://api.github.com`). Le point de départ obligatoire.",
          },
          {
            label: "Authentification",
            value:
              "Comment s'identifier : clé d'API, OAuth, token — et où la mettre (en-tête, paramètre).",
          },
          {
            label: "Endpoints",
            value:
              "Les chemins disponibles, leurs méthodes, leurs paramètres et leurs corps attendus.",
          },
          {
            label: "Réponses",
            value:
              "Formats de succès et d'erreur : statuts, structure des payloads, exemples.",
          },
          {
            label: "Limites",
            value:
              "Quotas, pagination, politique de retry : les règles du jeu en production.",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode : repérer l'endpoint le plus simple (souvent un GET de profil ou de statut), le tester avec `curl`, puis seulement écrire du code. Une doc avec un « Try it » interactif accélère cette première exploration.",
      },
    ],
  },
  {
    id: "cle-api-et-env",
    title: "Clé d'API et variables d'environnement",
    level: 2,
    intro:
      "Stocker les secrets proprement dès le premier appel authentifié.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "La clé dans l'environnement, jamais dans le code",
        code: `# Dans le shell courant (ou .env chargé par l'application) :\nexport CLE_API="votre-cle-ici"\n\n# Le code lit l'environnement :\n# const cle = process.env.CLE_API;`,
      },
      {
        kind: "list",
        items: [
          "Jamais de clé en dur dans le code : elle finirait dans Git, donc potentiellement en public.",
          "Fichier `.env` en local (ignoré par Git), variables d'environnement en production.",
          "Une clé compromise se révoque et se régénère côté fournisseur — pas de « suppression du commit » comme solution.",
          "Principe du moindre privilège : une clé avec les seuls scopes nécessaires.",
        ],
      },
    ],
  },
  {
    id: "premier-appel-fetch",
    title: "Premier appel avec fetch",
    level: 2,
    intro:
      "Appeler une API réelle depuis JavaScript.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "GET sur l'API publique GitHub",
        code: `const reponse = await fetch("https://api.github.com/users/octocat");\nconst profil = await reponse.json();\n\nconsole.log(profil.login); // octocat\nconsole.log(profil.public_repos); // nombre de dépôts publics`,
      },
      {
        kind: "text",
        text: "Cet endpoint est public : aucune clé requise, idéal pour apprendre. `fetch` envoie la requête, `reponse.json()` parse le corps. En conditions réelles, on ajoute l'en-tête d'authentification et la gestion d'erreurs — les sections suivantes.",
      },
    ],
  },
  {
    id: "gerer-reponse",
    title: "Gérer la réponse",
    level: 2,
    intro:
      "Vérifier le statut avant de parser : le réflexe de base.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Le motif de lecture sûre",
        code: `const reponse = await fetch(url, {\n  headers: { Authorization: "Bearer " + process.env.CLE_API },\n});\n\nif (!reponse.ok) {\n  throw new Error("Échec HTTP " + reponse.status);\n}\n\nconst data = await reponse.json();`,
      },
      {
        kind: "text",
        text: "`fetch` ne lève d'exception que sur erreur réseau : un 404 ou un 500 se lit dans `reponse.ok` / `reponse.status`. Parser le corps sans vérifier le statut, c'est parser une page d'erreur comme si c'était des données — le bug classique du débutant.",
      },
    ],
  },
  {
    id: "gerer-erreurs-http",
    title: "Gérer les erreurs HTTP",
    level: 2,
    intro:
      "Chaque famille de statut appelle une réaction différente.",
    blocks: [
      {
        kind: "table",
        headers: ["Statut", "Signification pour l'intégration", "Réaction"],
        rows: [
          ["2xx", "Succès", "Traiter les données"],
          ["400 / 422", "Requête invalide", "Corriger le code — réessayer ne servira à rien"],
          ["401", "Non authentifié", "Renouveler le token / vérifier la clé"],
          ["403", "Non autorisé", "Vérifier les scopes et permissions"],
          ["404", "Ressource absente", "Vérifier l'identifiant ; parfois normal (à gérer)"],
          ["429", "Quota dépassé", "Attendre (`Retry-After`), ralentir"],
          ["5xx", "Erreur serveur", "Réessayer avec backoff (section niveau 3)"],
        ],
      },
      {
        kind: "text",
        text: "La règle d'or : on ne réessaie que ce qui peut réussir au second essai (429, 5xx, erreurs réseau). Réessayer un 400 ou un 401 sans rien changer, c'est spammer l'API pour rien — et consommer son quota.",
      },
    ],
  },
  {
    id: "pagination",
    title: "Pagination",
    level: 2,
    intro:
      "Récupérer tous les résultats, pas seulement la première page.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Boucle de pagination simple",
        code: `let page = 1;\nconst tous = [];\n\nwhile (true) {\n  const r = await fetch(base + "?page=" + page + "&per_page=100");\n  if (!r.ok) throw new Error("HTTP " + r.status);\n  const items = await r.json();\n  tous.push(...items);\n  if (items.length < 100) break; // dernière page\n  page++;\n}`,
      },
      {
        kind: "text",
        text: "Les APIs paginent pour ne jamais renvoyer des millions d'objets d'un coup : il faut boucler jusqu'à la dernière page (page incomplète, ou lien `next` dans les en-têtes). Oublier la pagination, c'est traiter 100 éléments en croyant en traiter 10 000 — un bug silencieux et fréquent.",
      },
    ],
  },
  {
    id: "rate-limits",
    title: "Rate limits",
    level: 2,
    intro:
      "Respecter les quotas : lire les en-têtes, ralentir avant d'être bloqué.",
    blocks: [
      {
        kind: "command",
        label: "Observer les quotas d'une API",
        command: "curl -s -D - -o /dev/null https://api.github.com/users/octocat | grep -i ratelimit",
        why: "Affiche les en-têtes de réponse (`-D -`) et filtre ceux du quota : limite, restant, réinitialisation. Avant d'écrire une boucle intensive, on vérifie ce que l'API autorise.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" https://api.github.com/users/octocat",
      },
      {
        kind: "list",
        items: [
          "En-têtes typiques : `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.",
          "Sur `429` : lire `Retry-After`, attendre, puis reprendre — jamais de retry immédiat en boucle.",
          "Espacer les appels en pagination (petite pause) plutôt que de foncer vers le quota.",
        ],
      },
    ],
  },
  {
    id: "timeouts",
    title: "Timeouts",
    level: 2,
    intro:
      "Ne jamais attendre indéfiniment une API.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "AbortController : le timeout de fetch",
        code: `const controleur = new AbortController();\nconst delai = setTimeout(() => controleur.abort(), 10000);\n\ntry {\n  const reponse = await fetch(url, { signal: controleur.signal });\n  // ... traiter\n} catch (e) {\n  if (e.name === "AbortError") console.error("Timeout après 10s");\n  else throw e;\n} finally {\n  clearTimeout(delai);\n}`,
      },
      {
        kind: "text",
        text: "`fetch` n'a pas de timeout natif : sans `AbortController`, une API silencieuse bloque indéfiniment — et en cascade, tout le système. Dix secondes est un défaut raisonnable pour la plupart des appels ; les traitements longs méritent un design asynchrone (webhook de fin) plutôt qu'un timeout allongé.",
      },
    ],
  },
  {
    id: "retries-simples",
    title: "Retries simples",
    level: 2,
    intro:
      "Réessayer les échecs transitoires, avec un délai.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Retry avec attente fixe",
        code: `async function fetchAvecRetry(url, essais = 3) {\n  for (let i = 1; i <= essais; i++) {\n    const r = await fetch(url);\n    if (r.ok) return r;\n    if (r.status < 500 && r.status !== 429) throw new Error("HTTP " + r.status);\n    if (i < essais) await new Promise((res) => setTimeout(res, 1000 * i));\n  }\n  throw new Error("Échec après " + essais + " essais");\n}`,
      },
      {
        kind: "text",
        text: "On ne réessaie que le transitoire (5xx, 429, erreurs réseau) — jamais les 4xx définitifs. Le délai croissant évite de pilonner un serveur déjà en difficulté. Pour la version robuste (backoff exponentiel + jitter), voir le niveau 3.",
      },
    ],
  },
  {
    id: "webhooks-intro",
    title: "Webhooks : l'autre sens",
    level: 2,
    intro:
      "Recevoir des événements au lieu de les demander : le push contre le pull.",
    blocks: [
      {
        kind: "diagram",
        title: "Polling vs webhook",
        lines: [
          "[Polling : je demande régulièrement]",
          "   moi ──▶ \"du nouveau ?\" ──▶ API",
          "   moi ◀── \"non\" ── API  (× 1000)",
          "   │",
          "[Webhook : on me prévient]",
          "   moi ──▶ \"préviens-moi à cette URL\" ──▶ API",
          "   ... plus tard ...",
          "   moi ◀── \"événement : paiement reçu\" ── API",
        ],
      },
      {
        kind: "text",
        text: "Un webhook est une URL de votre application que le fournisseur appelle quand un événement survient (paiement reçu, nouveau message). Plus efficace que le polling (zéro appel inutile) et temps réel — au prix d'exposer un endpoint public à sécuriser (signatures, voir niveau 3).",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "oauth2",
    title: "OAuth 2.0",
    level: 3,
    intro:
      "Le standard d'autorisation : accéder à une API au nom d'un utilisateur sans voir son mot de passe.",
    blocks: [
      {
        kind: "diagram",
        title: "Authorization Code Flow (le plus courant)",
        lines: [
          "[Votre app] ──▶ redirige l'utilisateur ──▶ [Fournisseur]",
          "[Utilisateur] ── se connecte, autorise ──▶ [Fournisseur]",
          "[Fournisseur] ── code d'autorisation ──▶ [Votre app]",
          "[Votre app] ── code + secret ──▶ [Fournisseur]",
          "[Fournisseur] ── access token (+ refresh) ──▶ [Votre app]",
          "[Votre app] ── appels API avec le token ──▶ [API]",
        ],
      },
      {
        kind: "fields",
        title: "Les flux principaux",
        fields: [
          {
            label: "Authorization Code",
            value:
              "Pour les applications avec backend : l'utilisateur autorise, l'app échange un code contre des tokens côté serveur. Le plus sûr.",
          },
          {
            label: "Client Credentials",
            value:
              "De serveur à serveur, sans utilisateur : l'app s'authentifie avec son id et son secret. Pour les intégrations machine-to-machine.",
          },
          {
            label: "PKCE",
            value:
              "Extension du code flow pour les apps sans secret stockable (mobiles, SPAs) : prouve que le demandeur est bien l'initiateur.",
          },
        ],
      },
      {
        kind: "text",
        text: "À retenir : l'access token a une durée de vie courte (minutes/heures), le refresh token permet d'en obtenir un nouveau sans ré-authentifier l'utilisateur. Stocker les tokens chiffrés, jamais en clair, jamais côté client exposé.",
      },
    ],
  },
  {
    id: "tokens",
    title: "Gestion des tokens",
    level: 3,
    intro:
      "Le cycle de vie complet : obtention, usage, renouvellement.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Renouvellement proactif",
        code: `async function appelSecurise(url) {\n  if (tokenExpireDansMoinsDe(60)) {\n    await renouvelerToken(); // refresh avant l'appel, pas après le 401\n  }\n  const r = await fetch(url, { headers: { Authorization: "Bearer " + accessToken } });\n  if (r.status === 401) {\n    await renouvelerToken(); // le token a expiré entre-temps : une tentative\n    return fetch(url, { headers: { Authorization: "Bearer " + accessToken } });\n  }\n  return r;\n}`,
      },
      {
        kind: "text",
        text: "Deux stratégies complémentaires : renouveler avant expiration (proactif, évite l'échec) et réessayer une fois sur 401 (réactif, couvre les expirations imprévues). Un seul retry sur 401 : au-delà, c'est un vrai problème d'authentification, pas un timing.",
      },
    ],
  },
  {
    id: "pagination-avancee",
    title: "Pagination avancée : curseurs",
    level: 3,
    intro:
      "Offset vs curseur : deux philosophies, une gagnante pour les gros volumes.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Offset (`?page=3`) ", "Curseur (`?after=xyz`)"],
        rows: [
          ["Principe", "Sauter N éléments", "Reprendre après un marqueur opaque"],
          ["Données qui bougent", "Doublons ou trous si des éléments s'ajoutent", "Stable : le curseur suit la position réelle"],
          ["Accès aléatoire", "Oui (page 42 directement)", "Non (parcours séquentiel)"],
          ["Performance serveur", "Se dégrade sur les grandes pages", "Constante"],
          ["Usage", "Interfaces humaines paginées", "Synchronisations, exports, gros volumes"],
        ],
      },
      {
        kind: "text",
        text: "Pour une synchronisation fiable, le curseur est supérieur : pas de doublon ni d'oubli quand les données bougent pendant le parcours. Le curseur est opaque (ne pas le construire soi-même) et se conserve entre exécutions pour reprendre où on s'était arrêté — la base d'une sync incrémentale.",
      },
    ],
  },
  {
    id: "retry-backoff",
    title: "Backoff exponentiel et jitter",
    level: 3,
    intro:
      "La stratégie de retry qui ne transforme pas une panne en tempête.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Backoff exponentiel avec jitter",
        code: `async function attendre(ms) {\n  return new Promise((r) => setTimeout(r, ms));\n}\n\nasync function retry(url, maxEssais = 5) {\n  for (let essai = 0; essai < maxEssais; essai++) {\n    try {\n      const r = await fetch(url);\n      if (r.ok) return r;\n      if (r.status < 500 && r.status !== 429) throw new Error("HTTP " + r.status);\n    } catch (e) {\n      if (essai === maxEssais - 1) throw e;\n    }\n    const delai = Math.min(1000 * 2 ** essai, 30000);\n    const jitter = Math.random() * 1000;\n    await attendre(delai + jitter);\n  }\n}`,
      },
      {
        kind: "text",
        text: "Exponentiel : 1s, 2s, 4s, 8s… — on laisse au serveur le temps de récupérer, avec un plafond. Jitter : un aléa évite que mille clients ne réessaient à la même seconde (le « thundering herd »). Et toujours un nombre maximal d'essais : un retry infini est une fuite.",
      },
    ],
  },
  {
    id: "idempotence",
    title: "Idempotence",
    level: 3,
    intro:
      "Répéter sans dupliquer : la propriété qui rend les retries sûrs.",
    blocks: [
      {
        kind: "text",
        text: "Une opération est idempotente si l'exécuter N fois a le même effet qu'une fois. Sans elle, un retry après un timeout ambigu (la requête a-t-elle abouti ?) peut créer un doublon — dramatique pour un paiement. Les APIs sérieuses offrent des clés d'idempotence : un identifiant unique que le client génère et envoie avec la requête.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Clé d'idempotence (convention répandue)",
        code: `import { randomUUID } from "crypto";\n\nconst r = await fetch("https://api.exemple.com/paiements", {\n  // URL illustrative : remplacez par la vraie API.\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n    "Idempotency-Key": randomUUID(), // conservée pour les retries\n  },\n  body: JSON.stringify({ montant: 1999, devise: "EUR" }),\n});`,
      },
      {
        kind: "text",
        text: "Le serveur mémorise la clé : si la même clé revient, il renvoie le résultat d'origine au lieu de ré-exécuter. La clé doit être conservée côté client pour toute la durée des retries — la régénérer à chaque essai annule la protection.",
      },
    ],
  },
  {
    id: "circuit-breaker",
    title: "Circuit breaker",
    level: 3,
    intro:
      "Cesser d'appeler un service en panne : le disjoncteur.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois états",
        lines: [
          "[FERMÉ] ── les appels passent ──▶ trop d'échecs ──▶ [OUVERT]",
          "[OUVERT] ── les appels échouent immédiatement ──▶ après un délai ──▶ [MI-OUVERT]",
          "[MI-OUVERT] ── un appel test ──▶ succès ──▶ [FERMÉ]",
          "                              ──▶ échec ──▶ [OUVERT]",
        ],
      },
      {
        kind: "text",
        text: "Quand une API est en panne, continuer à l'appeler aggrave tout : latence pour vos utilisateurs, charge pour le service en convalescence. Le disjoncteur coupe les appels après N échecs (échec immédiat, réponse dégradée ou cache), puis teste périodiquement la reprise. Les bibliothèques de résilience l'implémentent ; l'idée compte plus que l'outil.",
      },
    ],
  },
  {
    id: "webhooks-securite",
    title: "Sécuriser les webhooks",
    level: 3,
    intro:
      "Un endpoint public qui déclenche des actions : à verrouiller.",
    blocks: [
      {
        kind: "text",
        text: "N'importe qui peut appeler votre URL de webhook : sans vérification, un attaquant déclenche vos traitements avec de fausses données. Le standard : le fournisseur signe chaque payload avec un secret partagé (HMAC), vous recalculez la signature et comparez.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Vérification HMAC (principe)",
        code: `import { createHmac, timingSafeEqual } from "crypto";\n\nfunction signatureValide(payloadBrut, signatureRecue, secret) {\n  const attendue = createHmac("sha256", secret).update(payloadBrut).digest("hex");\n  return timingSafeEqual(Buffer.from(attendue), Buffer.from(signatureRecue));\n  // Comparaison en temps constant : anti timing-attack.\n  // payloadBrut = le corps AVANT parsing JSON.\n}`,
      },
      {
        kind: "list",
        items: [
          "Vérifier la signature avant toute autre chose — y compris avant de parser.",
          "Répondre 200 vite, traiter en arrière-plan : le fournisseur timeoute et renvoie sinon.",
          "Idempotence aussi ici : un webhook peut être livré plusieurs fois — dédupliquer par id d'événement.",
          "Enregistrer les IPs du fournisseur si elles sont fixes et documentées, en défense secondaire.",
        ],
      },
    ],
  },
  {
    id: "validation-payloads",
    title: "Valider les payloads",
    level: 3,
    intro:
      "Ne jamais faire confiance aux données entrantes — ni sortantes.",
    blocks: [
      {
        kind: "text",
        text: "Valider en entrée (ce que l'API renvoie peut changer ; ce que vos webhooks reçoivent peut être hostile) avec un schéma (JSON Schema, ou une bibliothèque de validation du langage). Valider en sortie aussi : un payload malformé envoyé à une API de paiement est un incident.",
      },
      {
        kind: "list",
        items: [
          "Échouer vite avec un message clair : quel champ, quelle règle violée.",
          "Versionner les schémas avec le code qui les consomme.",
          "Se méfier des champs « en plus » : les ignorer ou les refuser selon la criticité (`additionalProperties`).",
          "Tester avec des payloads réels enregistrés (fixtures), pas seulement des exemples de doc.",
        ],
      },
    ],
  },
  {
    id: "transformation-donnees",
    title: "Transformation des données",
    level: 3,
    intro:
      "Adapter le modèle externe à son modèle interne : l'anti-corruption.",
    blocks: [
      {
        kind: "text",
        text: "Les données d'une API tierce ne doivent jamais circuler telles quelles dans votre application : noms de champs, formats de dates, unités, valeurs manquantes — tout peut changer sans préavis. Une couche de transformation (mapping explicite) isole votre domaine des caprices externes.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Mapper vers son modèle",
        code: `function versClientInterne(externe) {\n  return {\n    id: externe.id,\n    nomComplet: externe.first_name + " " + externe.last_name,\n    email: externe.email?.toLowerCase(),\n    inscritLe: new Date(externe.created_at),\n    // Seuls les champs utilisés sont mappés : le reste est ignoré.\n  };\n}`,
      },
      {
        kind: "text",
        text: "Bénéfices : un seul endroit à modifier quand l'API change, des types internes stables, des tests unitaires sur la transformation. C'est le patron « anti-corruption layer » appliqué aux intégrations.",
      },
    ],
  },
  {
    id: "cache-integration",
    title: "Cacher les réponses",
    level: 3,
    intro:
      "Ne pas redemander ce qui change peu : le cache côté client.",
    blocks: [
      {
        kind: "list",
        items: [
          "Données de référence (listes de pays, catalogues) : cache en mémoire avec TTL de quelques heures.",
          "Respecter les en-têtes de cache de l'API (`Cache-Control`, `ETag`) quand ils existent.",
          "Clé de cache = URL + paramètres + version : un cache sans clé précise sert des données périmées.",
          "Invalidation : TTL court par défaut ; invalidation explicite sur les événements (webhook) pour le critique.",
          "Ne jamais cacher les données utilisateur sensibles sans chiffrement ni contrôle d'accès.",
        ],
      },
    ],
  },
  {
    id: "versioning-integration",
    title: "Gérer les versions d'API",
    level: 3,
    intro:
      "Les APIs évoluent : survivre aux migrations.",
    blocks: [
      {
        kind: "list",
        items: [
          "Épingler la version utilisée (dans l'URL ou l'en-tête selon le fournisseur) : ne jamais consommer « latest » en production.",
          "S'abonner aux annonces de dépréciation : calendriers de fin de vie, guides de migration.",
          "Tester la nouvelle version en parallèle avant de basculer (shadow traffic ou environnement dédié).",
          "Abstraire l'appel dans une fonction/classe : la migration touche un seul endroit.",
          "Prévoir le rollback : garder l'ancien code jusqu'à validation complète du nouveau.",
        ],
      },
    ],
  },
  {
    id: "sdk-vs-http",
    title: "SDK ou HTTP brut",
    level: 3,
    intro:
      "Utiliser le kit officiel ou parler HTTP directement : les arbitrages.",
    blocks: [
      {
        kind: "table",
        headers: ["", "SDK officiel", "HTTP brut (fetch)"],
        rows: [
          ["Productivité", "Élevée : modèles typés, helpers", "Faible : tout à écrire"],
          ["Authentification", "Gérée (refresh auto)", "À implémenter"],
          ["Pagination/retry", "Souvent inclus", "À implémenter"],
          ["Contrôle", "Limité aux choix du SDK", "Total"],
          ["Dépendances", "Une de plus à maintenir", "Aucune"],
          ["Cas limite", "Bloqué si le SDK ne couvre pas", "Toujours possible"],
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : SDK officiel maintenu pour les intégrations structurantes (paiement, CRM), HTTP brut pour les besoins ponctuels ou quand le SDK est abandonné. Dans les deux cas, isoler derrière une interface maison pour pouvoir changer.",
      },
    ],
  },
  {
    id: "logging-monitoring",
    title: "Logging et monitoring",
    level: 3,
    intro:
      "Voir les intégrations : latence, erreurs, alertes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Logger chaque appel externe : endpoint, statut, durée, identifiant de corrélation — jamais les secrets ni les payloads sensibles.",
          "Métriques : taux d'erreur par API, latence (p50/p95), consommation de quota — le tableau de bord de santé des intégrations.",
          "Alertes : seuil d'erreurs, quota proche de la limite, latence anormale — avant que les utilisateurs ne signalent.",
          "Tracing distribué : un id de corrélation propagé de l'appel initial à l'API tierce pour suivre une requête de bout en bout.",
          "Runbook : pour chaque intégration critique, la procédure écrite de ce qu'on fait quand elle casse.",
        ],
      },
    ],
  },
  {
    id: "gestion-secrets",
    title: "Gestion des secrets",
    level: 3,
    intro:
      "Clés, tokens, certificats : le coffre-fort des intégrations.",
    blocks: [
      {
        kind: "list",
        items: [
          "Coffre de secrets en production (gestionnaire du cloud ou Vault) : jamais de secret dans le code, les images ou les variables en clair des dashboards.",
          "Rotation régulière : des secrets à durée de vie limitée réduisent l'impact d'une fuite.",
          "Séparation par environnement : des clés différentes pour dev, staging, production.",
          "Audit d'accès : qui a lu quel secret, quand — la traçabilité fait partie de la sécurité.",
          "En cas de fuite suspectée : révoquer d'abord, investiguer ensuite.",
        ],
      },
    ],
  },
  {
    id: "tests-integrations",
    title: "Tester les intégrations",
    level: 3,
    intro:
      "Tester sans dépendre du service réel : la pyramide des tests d'intégration.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Principe", "Outils typiques"],
        rows: [
          ["Unitaires", "Mocker le client HTTP : tester la logique (retry, mapping)", "Mocks du client, fixtures JSON"],
          ["Contrat", "Vérifier que les payloads respectent le schéma", "Schémas versionnés, tests de contrat"],
          ["Bac à sable", "Appels réels contre l'environnement de test du fournisseur", "Sandbox / clés de test"],
          ["Bout en bout", "Parcours complet, rarement, sur staging", "Environnement dédié"],
        ],
      },
      {
        kind: "text",
        text: "Ne jamais tester contre la production : les clés de test et sandboxes existent pour ça. Les fixtures (réponses enregistrées) rendent les tests unitaires rapides et déterministes — à régénérer quand l'API évolue.",
      },
    ],
  },
  {
    id: "graphql-vs-rest",
    title: "GraphQL face à REST",
    level: 3,
    intro:
      "Deux philosophies d'API : choisir selon le besoin.",
    blocks: [
      {
        kind: "table",
        headers: ["", "REST", "GraphQL"],
        rows: [
          ["Modèle", "Ressources via endpoints fixes", "Schéma unique, requêtes flexibles"],
          ["Sur/sous-fetching", "Fréquent (endpoints rigides)", "Le client choisit les champs exacts"],
          ["Cache HTTP", "Naturel (GET cachables)", "Difficile (souvent un seul POST)"],
          ["Découverte", "Documentation externe", "Schéma introspectable, typé"],
          ["Courbe d'apprentissage", "Faible", "Plus élevée (schéma, résolveurs)"],
        ],
      },
      {
        kind: "text",
        text: "REST reste le défaut raisonnable pour les APIs publiques et les intégrations simples. GraphQL brille quand le client a des besoins de données complexes et changeants (applications riches). Hybride courant : REST pour l'exposition, GraphQL en façade d'agrégation.",
      },
    ],
  },
  {
    id: "rest-consumer-design",
    title: "Lire un design REST",
    level: 3,
    intro:
      "Reconnaître une bonne API REST quand on la consomme.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ressources nommées par des noms pluriels : `/users`, `/users/123/orders` — pas de verbes dans l'URL.",
          "Méthodes sémantiques : GET lit, POST crée, PUT/PATCH modifient, DELETE supprime.",
          "Statuts cohérents : `201` avec `Location` à la création, `204` pour une suppression sans corps.",
          "Erreurs structurées : un format d'erreur documenté (code, message, détails) plutôt qu'un texte libre.",
          "HATEOAS (liens dans les réponses) : un plus pour la découvrabilité, rarement décisif en pratique.",
        ],
      },
      {
        kind: "text",
        text: "Même en consommateur, ces conventions aident : une API qui les suit se devine sans documentation exhaustive. Et quand vous concevrez vos propres endpoints (compétence `api-rest`), vous saurez quoi viser.",
      },
    ],
  },
  {
    id: "outils-exploration",
    title: "Outils d'exploration",
    level: 3,
    intro:
      "Explorer une API avant de coder : la panoplie.",
    blocks: [
      {
        kind: "table",
        headers: ["Outil", "Force", "Usage typique"],
        rows: [
          ["curl", "Universel, scriptable, partout", "Tests rapides, scripts, CI"],
          ["HTTPie", "Syntaxe lisible, JSON naturel", "Exploration en terminal"],
          ["Postman / Insomnia", "Collections, environnements, tests", "Exploration visuelle, partage d'équipe"],
          ["Docs interactives", "Zéro installation", "Première découverte"],
        ],
      },
      {
        kind: "text",
        text: "Workflow conseillé : explorer à la main (client visuel ou docs interactives), figer les appels qui marchent en collection partageable, puis coder. Une collection Postman/Insomnia versionnée vaut mieux qu'une doc Word pour onboarder un développeur.",
      },
    ],
  },
  {
    id: "async-job-pattern",
    title: "Traitements longs : le motif asynchrone",
    level: 3,
    intro:
      "Quand l'opération dure plus qu'une requête : 202 et polling de statut.",
    blocks: [
      {
        kind: "diagram",
        title: "Le motif 202 Accepted",
        lines: [
          "[Client] ── POST /exports ──▶ [API]",
          "[API] ── 202 Accepted + /jobs/42 ──▶ [Client]",
          "[Client] ── GET /jobs/42 ──▶ \"en cours\" ... \"terminé\"",
          "[Client] ── GET /jobs/42/resultat ──▶ [Fichier]",
          "(ou : l'API appelle un webhook à la fin)",
        ],
      },
      {
        kind: "text",
        text: "Les APIs sérieuses ne bloquent jamais une requête HTTP pendant des minutes : elles acceptent le travail (`202`), renvoient un identifiant de tâche, et le client interroge le statut (ou reçoit un webhook à la fin). Côté client : polling espacé avec backoff, jamais de boucle serrée.",
      },
    ],
  },
  {
    id: "long-polling",
    title: "Long polling",
    level: 3,
    intro:
      "Le compromis entre polling et temps réel.",
    blocks: [
      {
        kind: "text",
        text: "En long polling, le client demande « du nouveau ? » et le serveur retient la requête ouverte jusqu'à avoir quelque chose à répondre (ou un timeout). Résultat : quasi temps réel sans la complexité des WebSockets, au prix de connexions maintenues ouvertes.",
      },
      {
        kind: "list",
        items: [
          "Usage : notifications, chats simples, là où SSE/WebSocket sont indisponibles.",
          "Toujours avec un timeout côté serveur pour éviter les connexions fantômes.",
          "Ordre de préférence moderne : WebSocket/SSE > long polling > polling simple.",
        ],
      },
    ],
  },
  {
    id: "uploads-fichiers",
    title: "Uploads de fichiers",
    level: 3,
    intro:
      "Envoyer des fichiers : multipart et URLs pré-signées.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Upload multipart avec curl",
        code: `curl -X POST https://api.exemple.com/fichiers \\\n  -H "Authorization: Bearer $CLE_API" \\\n  -F "fichier=@/chemin/rapport.pdf" \\\n  -F "description=Rapport mensuel"\n# -F : construit un corps multipart/form-data.`,
      },
      {
        kind: "text",
        text: "Deux stratégies : l'upload direct via `multipart/form-data` (simple, adapté aux petits fichiers) et l'URL pré-signée (l'API délivre une URL temporaire vers le stockage objet, le client uploade directement — indispensable pour les gros fichiers, sans saturer vos serveurs). Toujours valider type, taille et contenu côté réception.",
      },
    ],
  },
  {
    id: "api-gateway",
    title: "API gateways",
    level: 3,
    intro:
      "Le point d'entrée unique : ce que fait une passerelle.",
    blocks: [
      {
        kind: "list",
        items: [
          "Rôle : un point d'entrée unique devant N services — routage, authentification centralisée, rate limiting, logging.",
          "Pour le consommateur : une base URL unique, une authentification unique, des quotas cohérents.",
          "Exemples : les passerelles des clouds (AWS API Gateway et équivalents), Kong, Traefik.",
          "À comprendre en intégrateur : les en-têtes ajoutés par la passerelle, ses quotas propres (distincts de ceux de l'API), ses formats d'erreur.",
        ],
      },
    ],
  },
  {
    id: "openapi",
    title: "OpenAPI et contrats",
    level: 3,
    intro:
      "Le contrat machine-lisible : documenter pour générer.",
    blocks: [
      {
        kind: "text",
        text: "OpenAPI (ex-Swagger) décrit une API REST dans un fichier standard : endpoints, paramètres, schémas, authentification. Intérêt pour l'intégrateur : générer des clients typés, valider les payloads automatiquement, explorer via une UI interactive.",
      },
      {
        kind: "list",
        items: [
          "Chercher le fichier `openapi.json`/`swagger.json` d'une API : c'est la doc la plus fiable.",
          "Génération de client : un SDK sur mesure et à jour, sans attendre le SDK officiel.",
          "Contract-first : quand vous concevez une API, écrire le contrat avant le code aligne consommateurs et producteurs.",
        ],
      },
    ],
  },
  {
    id: "mock-servers",
    title: "Serveurs mock",
    level: 3,
    intro:
      "Développer contre une API qui n'existe pas encore.",
    blocks: [
      {
        kind: "text",
        text: "Un serveur mock rejoue des réponses prédéfinies (souvent générées depuis un contrat OpenAPI) : le frontend et les intégrations avancent pendant que l'API réelle se construit. Indispensable aussi pour les tests déterministes et les démos hors-ligne.",
      },
      {
        kind: "list",
        items: [
          "Le mock doit suivre le contrat : dès qu'il diverge, il ment — régénérer depuis OpenAPI.",
          "Utiliser les sandboxes des fournisseurs quand elles existent : plus fidèles qu'un mock maison.",
          "Ne jamais laisser un mock en production par accident : URLs et clés séparées par environnement.",
        ],
      },
    ],
  },
  {
    id: "correlation-ids",
    title: "IDs de corrélation",
    level: 3,
    intro:
      "Suivre une requête à travers les systèmes : le fil d'Ariane.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Propager un ID de corrélation",
        code: `import { randomUUID } from "crypto";\n\nconst correlationId = randomUUID();\nconst r = await fetch(url, {\n  headers: {\n    Authorization: "Bearer " + cle,\n    "X-Correlation-Id": correlationId,\n  },\n});\nconsole.log("appel", correlationId, "->", r.status);`,
      },
      {
        kind: "text",
        text: "Un identifiant unique généré à l'origine et propagé dans chaque appel (en-tête `X-Correlation-Id` ou `X-Request-Id`) permet de retracer une transaction de bout en bout dans les logs de tous les systèmes. En debugging d'intégration, c'est la différence entre « ça a échoué quelque part » et « voici exactement où ».",
      },
    ],
  },
  {
    id: "debugging-integration",
    title: "Débugger une intégration",
    level: 3,
    intro:
      "Méthode systématique quand l'API ne répond pas comme prévu.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Reproduire avec curl",
            detail:
              "Rejouer l'appel fautif en curl avec `-v` (verbeux) : on élimine le code applicatif et on voit la requête brute, les en-têtes envoyés et reçus, le corps exact.",
          },
          {
            title: "Lire la réponse d'erreur",
            detail:
              "Les APIs renvoient des détails (code d'erreur, champ fautif) : les lire avant de supposer. Un 400 contient presque toujours la cause.",
          },
          {
            title: "Vérifier l'authentification",
            detail:
              "Token expiré ? Scope manquant ? Clé du bon environnement ? La majorité des 401/403 viennent d'ici.",
          },
          {
            title: "Comparer avec la doc",
            detail:
              "Version d'API épinglée ? Endpoint déprécié ? La doc à jour prime sur le code qui « marchait avant ».",
          },
          {
            title: "Tracer avec l'ID de corrélation",
            detail:
              "Suivre l'appel dans les logs des deux côtés pour localiser la rupture : réseau, passerelle, application, fournisseur.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques de l'intégration.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Remède"],
        rows: [
          ["Doublons en production", "Retry sans idempotence", "Clés d'idempotence, déduplication"],
          ["Données tronquées", "Pagination non implémentée", "Boucler jusqu'à la dernière page"],
          ["Blocage nocturne", "Quota épuisé par une boucle", "Lire les en-têtes de quota, espacer les appels"],
          ["401 intermittents", "Token expiré non renouvelé", "Refresh proactif + retry unique sur 401"],
          ["Webhooks non reçus", "Endpoint non public ou trop lent", "Exposer publiquement, répondre 200 vite"],
          ["Fausses données traitées", "Webhook non vérifié", "Vérification HMAC systématique"],
          ["Incident en cascade", "Pas de timeout ni circuit breaker", "Timeouts partout, disjoncteur"],
          ["Clé révoquée en prod", "Secret en dur / partagé", "Coffre de secrets, rotation"],
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
            title: "Projet 1 — Client API robuste",
            detail:
              "Écrire un client Node.js pour une API publique : pagination complète, respect des rate limits (lecture des en-têtes), retry avec backoff sur les 5xx, timeouts via AbortController. Objectif : le client qui ne casse pas.",
          },
          {
            title: "Projet 2 — Connecteur avec webhooks",
            detail:
              "Mini-application Express qui expose un endpoint webhook : vérification HMAC de la signature, réponse 200 immédiate, traitement en file, déduplication par id d'événement, journalisation structurée. Objectif : la réception sécurisée.",
          },
          {
            title: "Projet 3 — Supervision d'intégrations",
            detail:
              "Service qui interroge périodiquement plusieurs APIs (statut, latence, quota restant), expose un tableau de bord et alerte (webhook ou email) en cas d'anomalie, avec runbook pour chaque intégration. Objectif : l'observabilité.",
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
            label: "Docs des fournisseurs",
            value:
              "La documentation de chaque API intégrée (Stripe, GitHub…) : c'est elle qui fait foi pour l'authentification, les quotas et les webhooks.",
          },
          {
            label: "MDN — fetch",
            value:
              "developer.mozilla.org : la référence de fetch, AbortController et des en-têtes HTTP.",
          },
          {
            label: "OAuth 2.0",
            value:
              "oauth.net : les flux expliqués par la communauté du standard, sans jargon vendeur.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : l'API publique GitHub (api.github.com) reste le meilleur terrain d'entraînement sans clé.",
          "Complément : les compétences `http` (protocole), `api-rest` (conception) et `webhooks` (réception d'événements).",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Intégration d'APIs maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Concevoir côté serveur : `api-rest` pour dessiner des APIs que d'autres intégreront avec plaisir.",
          "Recevoir des événements : `webhooks`, l'autre moitié du dialogue.",
          "Sécuriser : `authentication` pour les stratégies d'identité au-delà des clés simples.",
          "Tester : `testing-api` pour valider les contrats d'API.",
          "Revenir à la roadmap : valider l'intégration d'APIs et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

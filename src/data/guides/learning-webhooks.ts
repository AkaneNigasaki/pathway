import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des webhooks : recevoir, vérifier et traiter les
 * événements poussés par les services externes.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_WEBHOOKS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est un webhook et pourquoi c'est le système nerveux des intégrations.",
    blocks: [
      {
        kind: "text",
        text: "Un webhook est un mécanisme où un service appelle automatiquement une URL que vous lui avez fournie dès qu'un événement se produit. Au lieu d'interroger l'API en boucle, c'est elle qui vous prévient : paiement reçu, push sur un dépôt, nouveau ticket.",
      },
      {
        kind: "text",
        text: "Pourquoi les webhooks existent : l'alternative est le polling — interroger l'API toutes les minutes « y a-t-il du nouveau ? ». C'est lent (on apprend l'événement en retard), coûteux (des milliers de requêtes vides) et fragile. Le webhook inverse le sens : le service vous envoie une requête HTTP POST au moment exact de l'événement. Temps réel, zéro gaspillage.",
      },
      {
        kind: "text",
        text: "Ce que vous construisez : une URL publique (l'endpoint) capable de recevoir ces POST, de vérifier qu'ils viennent bien du service attendu (signature), de les traiter sans doublon (idempotence) et de répondre vite (200 OK).",
      },
    ],
  },
  {
    id: "webhooks-vs-polling",
    title: "Webhooks vs polling",
    level: 1,
    intro: "Les deux stratégies pour suivre des événements distants.",
    blocks: [
      {
        kind: "diagram",
        title: "Polling vs webhooks",
        lines: [
          "POLLING (vous interrogez)",
          "  vous ──GET /events──► service",
          "  vous ◄── rien de neuf ── service",
          "  vous ──GET /events──► service",
          "  vous ◄── rien de neuf ── service   (répété en boucle…)",
          "",
          "WEBHOOK (le service vous prévient)",
          "  événement !",
          "  service ──POST /webhooks──► vous",
          "  service ◄── 200 OK ── vous   (une seule requête, au bon moment)",
        ],
      },
      {
        kind: "list",
        items: [
          "Polling : simple, mais lent et gourmand — adapté quand le service ne propose pas de webhooks.",
          "Webhooks : temps réel et efficace — mais exigent une URL publique, une vérification de signature et une gestion des retries.",
          "En pratique : webhooks dès que le service les propose (Stripe, GitHub, Shopify…), polling en repli.",
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
    intro: "Un webhook n'est qu'une requête HTTP POST entrante : il faut savoir la recevoir.",
    blocks: [
      {
        kind: "fields",
        title: "Bases nécessaires",
        fields: [
          {
            label: "HTTP",
            value:
              "Méthodes (POST), codes de statut (200, 400, 500), en-têtes : un webhook est une requête HTTP comme les autres, mais c'est vous le serveur.",
          },
          {
            label: "JSON",
            value:
              "Le payload des événements est (presque) toujours du JSON : savoir le parser et le valider.",
          },
          {
            label: "Un backend (Node.js…)",
            value:
              "Créer un endpoint, lire un corps de requête, répondre avec un statut. Les exemples utilisent Node.js sans dépendance.",
          },
          {
            label: "APIs REST (notions)",
            value:
              "Comprendre les événements et les ressources aide à concevoir l'endpoint qui recevra les notifications.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-endpoint",
    title: "Premier endpoint",
    level: 2,
    intro: "Recevoir un webhook avec Node.js pur, sans dépendance.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "server.js — endpoint /webhooks",
        code: `import { createServer } from "node:http";\n\nconst server = createServer((req, res) => {\n  if (req.method !== "POST" || req.url !== "/webhooks") {\n    res.writeHead(404).end();\n    return;\n  }\n\n  let body = "";\n  req.on("data", (chunk) => (body += chunk));\n  req.on("end", () => {\n    const event = JSON.parse(body);\n    console.log("Événement reçu :", event.type);\n\n    // TODO: vérifier la signature, traiter l'événement\n\n    res.writeHead(200, { "Content-Type": "application/json" });\n    res.end(JSON.stringify({ received: true }));\n  });\n});\n\nserver.listen(3000, () => console.log("Écoute sur :3000/webhooks"));`,
      },
      {
        kind: "text",
        text: "Anatomie : on filtre méthode + chemin, on accumule le corps (les requêtes arrivent par morceaux), on parse le JSON, on répond `200`. Ce squelette suffit pour comprendre ; en production on ajoutera la vérification de signature (section dédiée) et le traitement asynchrone.",
      },
    ],
  },
  {
    id: "tester-local",
    title: "Tester en local avec curl",
    level: 2,
    intro: "Simuler l'appel d'un service avec une requête POST.",
    blocks: [
      {
        kind: "command",
        label: "Envoyer un faux événement",
        command: "curl -i -X POST http://localhost:3000/webhooks -H \"Content-Type: application/json\" -d '{\"type\":\"ping\",\"id\":\"evt_test_1\"}'",
        why: "Simule ce qu'envoie un service : un POST avec un JSON. Le `-i` affiche le statut de réponse — on vérifie que l'endpoint répond `200`. C'est le premier test de tout endpoint webhook, avant même de configurer le vrai service.",
      },
      {
        kind: "text",
        text: "Travaillez ainsi : d'abord l'endpoint répond 200 à curl, ensuite seulement on branche le vrai service. Déboguer les deux couches en même temps (votre code + la config du service) est une source classique de confusion.",
      },
    ],
  },
  {
    id: "structure-evenement",
    title: "Structure d'un événement",
    level: 2,
    intro: "À quoi ressemble le JSON qu'envoie un service.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Payload typique",
        code: `{\n  "id": "evt_9f3a2b1c",\n  "type": "payment.succeeded",\n  "created": 1727654321,\n  "data": {\n    "object": {\n      "id": "pay_123",\n      "amount": 4900,\n      "currency": "eur"\n    }\n  }\n}`,
      },
      {
        kind: "fields",
        title: "Champs quasi universels",
        fields: [
          {
            label: "`id`",
            value:
              "Identifiant unique de l'événement : la clé de la déduplication (voir idempotence).",
          },
          {
            label: "`type`",
            value:
              "Le nom de l'événement, souvent `ressource.action` (`payment.succeeded`, `push`, `ticket.created`). Votre routeur aiguille dessus.",
          },
          {
            label: "`created` / timestamp",
            value:
              "Horodatage d'émission : sert à rejeter les événements trop anciens (protection anti-rejeu).",
          },
          {
            label: "`data`",
            value:
              "La charge utile : l'objet concerné avec ses détails. Sa structure dépend du service — lisez sa documentation.",
          },
        ],
      },
    ],
  },
  {
    id: "repondre-vite",
    title: "Répondre vite, traiter après",
    level: 2,
    intro: "La règle d'or : acquitter en millisecondes, traiter en arrière-plan.",
    blocks: [
      {
        kind: "text",
        text: "Les services attendent une réponse rapide (souvent quelques secondes) : passé ce délai, ils considèrent l'envoi comme échoué et renvoient l'événement — créant des doublons et du bruit. Or le traitement (écrire en base, envoyer un email) peut être lent.",
      },
      {
        kind: "diagram",
        title: "Le bon découpage",
        lines: [
          "POST /webhooks",
          "     │",
          "     ├── 1. Vérifier la signature (rapide)",
          "     ├── 2. Enregistrer l'événement (file / base)",
          "     ├── 3. Répondre 200 OK  ◄── en millisecondes",
          "     │",
          "     └── 4. Worker : traitement long (asynchrone)",
          "              (email, base, API tierce…)",
        ],
      },
      {
        kind: "text",
        text: "En pratique : l'endpoint valide et met en file, un worker traite. Même sans infrastructure de file dédiée, séparer « acquittement » et « traitement » (ne pas `await` le traitement avant de répondre) change tout.",
      },
    ],
  },
  {
    id: "retries",
    title: "Retries : les renvois",
    level: 2,
    intro: "Si vous ne répondez pas 2xx, le service renverra l'événement.",
    blocks: [
      {
        kind: "text",
        text: "Les services réessaient les envois échoués (timeout, 5xx, pas de réponse) avec un backoff exponentiel : quelques secondes, puis minutes, puis heures, pendant parfois plusieurs jours. C'est une garantie de livraison, pas un bug — votre endpoint doit la supporter.",
      },
      {
        kind: "table",
        headers: ["Votre réponse", "Interprétation du service", "Conduite"],
        rows: [
          ["`2xx`", "Reçu et traité", "Répondez 200 dès que l'événement est enregistré"],
          ["`4xx`", "Requête invalide : inutile de réessayer", "Réservé aux payloads vraiment malformés ou signatures invalides"],
          ["`5xx` / timeout", "Échec temporaire : je réessaierai", "Laissez le retry faire son travail ; rendez le traitement idempotent"],
        ],
      },
      {
        kind: "text",
        text: "Conséquence : le même événement peut arriver deux fois (retry légitime, ou retry + premier traitement lent). D'où la section suivante — l'idempotence n'est pas optionnelle.",
      },
    ],
  },
  {
    id: "idempotence",
    title: "Idempotence",
    level: 2,
    intro: "Traiter deux fois le même événement doit équivaloir à une fois.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Déduplication par id d'événement",
        code: `const seen = new Set(); // en prod : table en base avec contrainte unique\n\nasync function handleEvent(event) {\n  if (seen.has(event.id)) {\n    console.log("Doublon ignoré :", event.id);\n    return; // déjà traité : on acquitte sans refaire le travail\n  }\n  await processPayment(event.data.object);\n  seen.add(event.id);\n}`,
      },
      {
        kind: "text",
        text: "La clé : l'`id` unique de l'événement. Avant tout traitement, vérifiez s'il a déjà été vu ; en production, une table avec contrainte d'unicité sur l'id fait ce travail de façon fiable (l'insertion échoue proprement en cas de doublon concurrent). Sans idempotence, un retry débite deux fois le client.",
      },
    ],
  },
  {
    id: "signatures-hmac",
    title: "Signatures HMAC",
    level: 2,
    intro: "Prouver que la requête vient bien du service : la signature cryptographique.",
    blocks: [
      {
        kind: "text",
        text: "Votre endpoint est une URL publique : n'importe qui peut y poster. La signature prouve l'origine : le service calcule un HMAC du corps avec un secret partagé et l'envoie dans un en-tête. Vous recalculez de votre côté : si ça correspond, la requête est authentique et intacte.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Vérification HMAC-SHA256 (node:crypto)",
        code: `import { createHmac, timingSafeEqual } from "node:crypto";\n\nfunction verifySignature(rawBody, receivedSig, secret) {\n  // receivedSig : ex. "sha256=abc123..."\n  const expected = "sha256=" +\n    createHmac("sha256", secret).update(rawBody).digest("hex");\n\n  const a = Buffer.from(receivedSig);\n  const b = Buffer.from(expected);\n  // Comparaison en temps constant : anti timing-attack\n  return a.length === b.length && timingSafeEqual(a, b);\n}`,
      },
      {
        kind: "text",
        text: "Points critiques : vérifiez sur le corps BRUT (avant `JSON.parse` — le moindre espace change le HMAC) ; comparez avec `timingSafeEqual` (une comparaison `===` fuit de l'information par son temps d'exécution). Secret jamais dans le code : variable d'environnement.",
      },
    ],
  },
  {
    id: "exemple-github",
    title: "Exemple : webhooks GitHub",
    level: 2,
    intro: "Le cas d'école : être notifié d'un push.",
    blocks: [
      {
        kind: "text",
        text: "GitHub envoie `X-Hub-Signature-256: sha256=<hmac>` calculé avec le secret configuré dans les réglages du dépôt. L'événement est identifié par `X-GitHub-Event` (`push`, `pull_request`…).",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Vérification GitHub",
        code: `import { createHmac, timingSafeEqual } from "node:crypto";\n\nfunction verifyGitHub(rawBody, signature256, secret) {\n  const expected = "sha256=" +\n    createHmac("sha256", secret).update(rawBody).digest("hex");\n  return timingSafeEqual(Buffer.from(signature256), Buffer.from(expected));\n}\n\n// Dans le handler :\n// const sig = req.headers["x-hub-signature-256"];\n// const event = req.headers["x-github-event"]; // "push", ...\n// if (!verifyGitHub(rawBody, sig, process.env.GITHUB_SECRET)) -> 401`,
      },
    ],
  },
  {
    id: "exemple-stripe",
    title: "Exemple : webhooks Stripe",
    level: 2,
    intro: "Le cas critique : les paiements. Ici, l'erreur coûte de l'argent.",
    blocks: [
      {
        kind: "text",
        text: "Stripe signe avec l'en-tête `Stripe-Signature` (`t=<timestamp>,v1=<signature>`) et fournit un helper officiel : `stripe.webhooks.constructEvent(corpsBrut, signature, secret)`. Il vérifie la signature ET la fraîcheur du timestamp — utilisez-le plutôt qu'une vérification maison.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Vérification avec le SDK Stripe",
        code: `import Stripe from "stripe";\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY);\n\n// rawBody : corps BRUT (avec Express : express.raw({ type: "application/json" }))\ntry {\n  const event = stripe.webhooks.constructEvent(\n    rawBody,\n    req.headers["stripe-signature"],\n    process.env.STRIPE_WEBHOOK_SECRET\n  );\n  if (event.type === "payment_intent.succeeded") {\n    await markOrderAsPaid(event.data.object.id); // idempotent !\n  }\n  res.sendStatus(200);\n} catch (err) {\n  res.sendStatus(400); // signature invalide : pas de retry utile\n}`,
      },
      {
        kind: "text",
        text: "Piège classique avec Express : le middleware `express.json()` parse le corps et détruit le brut nécessaire à la vérification. Montez `express.raw({ type: \"application/json\" })` sur la route webhook AVANT le parseur JSON global.",
      },
    ],
  },
  {
    id: "securiser-endpoint",
    title: "Sécuriser l'endpoint",
    level: 2,
    intro: "Un endpoint public est une surface d'attaque : la checklist.",
    blocks: [
      {
        kind: "list",
        items: [
          "Vérifier la signature sur CHAQUE requête, sans exception — avant tout traitement.",
          "HTTPS uniquement : un secret ou une signature en clair sur HTTP ne protège rien.",
          "Rejeter les timestamps trop anciens (anti-rejeu) : quelques minutes de tolérance suffisent.",
          "Limiter le débit (rate limiting) : un endpoint public sans limite est une cible de flood.",
          "Ne jamais logger le secret ni le corps complet en production (données sensibles).",
          "Rotation des secrets : pouvoir changer le secret sans downtime (supporter l'ancien + le nouveau pendant la transition).",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro: "Les fautes que tout le monde fait au premier webhook.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["Vérifier le HMAC sur le corps parsé", "Signature toujours invalide", "Vérifier sur le corps BRUT, avant `JSON.parse`"],
          ["Traiter avant de répondre", "Timeouts, retries en cascade, doublons", "Enregistrer → répondre 200 → traiter en arrière-plan"],
          ["Pas d'idempotence", "Client débité deux fois après un retry", "Dédupliquer sur l'`id` d'événement"],
          ["`express.json()` global", "Stripe/GitHub rejettent la signature", "`express.raw()` sur la route webhook"],
          ["Endpoint en HTTP", "Interception possible", "HTTPS obligatoire"],
          ["Ignorer les retries", "Événements perdus en cas de panne", "Accepter les doublons + idempotence plutôt que de les craindre"],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "cycle-de-vie",
    title: "Cycle de vie d'un événement",
    level: 3,
    intro: "De l'émission à l'archive : toutes les étapes, y compris les échecs.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie",
        lines: [
          "Événement chez le fournisseur",
          "     │",
          "     ▼",
          "Tentative d'envoi ──► 2xx ? ──oui──► traité ✓",
          "     │ non",
          "     ▼",
          "Retry (backoff exponentiel)",
          "     │",
          "     ├── succès tardif ──► traité ✓",
          "     └── échecs répétés ──► file d'échecs (dead letter)",
          "                              │",
          "                              └── alerte + rejeu manuel",
        ],
      },
      {
        kind: "text",
        text: "Après N échecs (selon le fournisseur : heures à jours de retries), l'événement part en file d'échecs : il ne faut pas le perdre silencieusement. Prévoyez une alerte et un rejeu manuel depuis votre journal d'événements — que vous conservez (voir journalisation).",
      },
    ],
  },
  {
    id: "nommage-evenements",
    title: "Nommage des événements",
    level: 3,
    intro: "Concevoir (ou comprendre) une taxonomie d'événements lisible.",
    blocks: [
      {
        kind: "table",
        headers: ["Convention", "Exemple", "Note"],
        rows: [
          ["`ressource.action`", "`payment.succeeded`, `user.created`", "La plus répandue (Stripe, etc.) : claire et routable"],
          ["`domaine.ressource.action`", "`billing.invoice.paid`", "Utile quand le fournisseur a beaucoup de domaines"],
          ["Verbe au passé", "`created`, `updated`, `deleted`", "L'événement décrit ce qui S'EST passé, pas une commande"],
          ["Versionnés", "`payment.succeeded` v2", "Le type seul ne suffit pas quand le payload évolue (voir versionnement)"],
        ],
      },
      {
        kind: "text",
        text: "Côté réception, routez sur le `type` avec un registre explicite (objet `handlers[type]`) plutôt qu'une cascade de `if` : l'ajout d'un nouvel événement devient une ligne, et les types inconnus sont loggés au lieu d'être silencieusement ignorés.",
      },
    ],
  },
  {
    id: "payload-versionne",
    title: "Payloads versionnés",
    level: 3,
    intro: "Le fournisseur fera évoluer ses payloads : y survivre.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Lire avec tolérance",
        code: `function handlePaymentSucceeded(data) {\n  // Ne lisez que les champs dont vous avez besoin,\n  // avec des valeurs par défaut : les champs ajoutés\n  // par le fournisseur ne doivent pas vous casser.\n  const amount = data.amount ?? 0;\n  const currency = (data.currency ?? "eur").toLowerCase();\n  return { amount, currency };\n}`,
      },
      {
        kind: "text",
        text: "Bonnes pratiques : épinglez la version d'API du fournisseur quand il le permet (Stripe le fait par webhook) ; ne cassez jamais sur un champ inconnu ; traitez l'absence d'un champ optionnel comme normale. À l'inverse, si VOUS émettez des webhooks, versionnez dès le jour 1.",
      },
    ],
  },
  {
    id: "ordre-livraison",
    title: "Pas de garantie d'ordre",
    level: 3,
    intro: "Les événements peuvent arriver dans le désordre : concevoir en conséquence.",
    blocks: [
      {
        kind: "text",
        text: "Rien ne garantit l'ordre de livraison : `payment.updated` peut arriver avant `payment.created` (retry, redispatch). Si votre traitement suppose l'ordre, il se corrompra un jour.",
      },
      {
        kind: "list",
        items: [
          "Rendez les handlers indépendants de l'ordre : chaque événement porte son état complet, pas un delta.",
          "Utilisez le timestamp `created` pour ignorer les événements périmés (un `updated` plus vieux que l'état connu ne doit pas écraser le nouveau).",
          "Pour les séquences critiques, sérialisez par clé (file par `customer_id`) plutôt que de supposer l'ordre global.",
        ],
      },
    ],
  },
  {
    id: "dedup-avancee",
    title: "Déduplication robuste",
    level: 3,
    intro: "Au-delà du `Set` en mémoire : la dédup qui survit au redémarrage.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Table des événements traités",
        code: `-- Contrainte d'unicité : la base fait le travail\nCREATE TABLE webhook_events (\n  event_id TEXT PRIMARY KEY,\n  type TEXT NOT NULL,\n  received_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);`,
      },
      {
        kind: "text",
        text: "Pattern : `INSERT` de l'`event_id` en premier ; si la contrainte d'unicité rejette, c'est un doublon — on acquitte sans traiter. Atomique, concurrent-safe, persistant au redémarrage. Nettoyez périodiquement les vieux événements (TTL de quelques mois) pour ne pas faire grossir la table indéfiniment.",
      },
    ],
  },
  {
    id: "codes-http",
    title: "Sémantique des codes de réponse",
    level: 3,
    intro: "Chaque code raconte au fournisseur une histoire différente.",
    blocks: [
      {
        kind: "table",
        headers: ["Code", "Sens pour le fournisseur", "Quand l'utiliser"],
        rows: [
          ["`200` / `201` / `204`", "Succès : ne plus renvoyer", "Événement enregistré (même si le traitement est différé)"],
          ["`400`", "Payload invalide : inutile de réessayer", "JSON malformé, signature invalide, type inconnu et non récupérable"],
          ["`401`", "Non authentifié", "Signature manquante ou invalide"],
          ["`429`", "Ralentissez", "Surcharge temporaire : le fournisseur espa cera ses envois"],
          ["`500`", "Échec temporaire : réessayez", "Panne interne — le retry est souhaité"],
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : répondre 500 à une signature invalide — le fournisseur va réessayer pendant des jours quelque chose qui ne marchera jamais. 4xx = définitif, 5xx = réessayez.",
      },
    ],
  },
  {
    id: "timeouts",
    title: "Timeouts",
    level: 3,
    intro: "Le temps que le fournisseur vous accorde est compté.",
    blocks: [
      {
        kind: "text",
        text: "La plupart des fournisseurs abandonnent après quelques secondes sans réponse (souvent 5 à 30 s selon le service) et replanifient un retry. Votre endpoint doit donc répondre en millisecondes dans le cas nominal.",
      },
      {
        kind: "list",
        items: [
          "Ne faites aucun appel réseau synchrone dans le handler (base locale rapide OK, API tierce NON).",
          "Si le traitement exige un appel lent, mettez en file et répondez immédiatement.",
          "Surveillez le p99 du temps de réponse de l'endpoint : la moyenne cache les pics qui déclenchent les retries.",
        ],
      },
    ],
  },
  {
    id: "file-traitement",
    title: "File de traitement",
    level: 3,
    intro: "L'architecture propre : endpoint fin, workers épais.",
    blocks: [
      {
        kind: "diagram",
        title: "Endpoint → file → workers",
        lines: [
          "POST /webhooks (léger)",
          "  │ vérifie signature, déduplique, enfile",
          "  ▼",
          "FILE (Redis, SQS, table DB…)",
          "  │",
          "  ├── Worker 1 ─► traitement métier",
          "  ├── Worker 2 ─► traitement métier",
          "  └── File d'échecs ─► retries + alertes",
        ],
      },
      {
        kind: "text",
        text: "Avantages : l'endpoint reste rapide quoi qu'il arrive ; les workers se dimensionnent indépendamment ; les échecs sont rejouables depuis la file. Même simple (une table `jobs` en base + un worker), ce découplage est le saut qualitatif entre le prototype et la production.",
      },
    ],
  },
  {
    id: "standard-webhooks",
    title: "Standard Webhooks",
    level: 3,
    intro: "Un standard ouvert pour ne plus réinventer la signature à chaque fois.",
    blocks: [
      {
        kind: "text",
        text: "Standard Webhooks (standardwebhooks.com) est une spécification ouverte qui uniformise l'envoi et la vérification : mêmes en-têtes, même format de signature, quel que soit le fournisseur qui l'adopte. Si vous ÉMETTEZ des webhooks, l'adopter rend la vie de vos consommateurs bien plus simple.",
      },
      {
        kind: "fields",
        title: "Les en-têtes standard",
        fields: [
          {
            label: "`webhook-id`",
            value: "Identifiant unique de la tentative d'envoi : la clé de déduplication.",
          },
          {
            label: "`webhook-timestamp`",
            value: "Horodatage d'émission (secondes epoch) : la base de la protection anti-rejeu.",
          },
          {
            label: "`webhook-signature`",
            value:
              "`v1,<base64>` : HMAC-SHA256 de `<id>.<timestamp>.<corps>` avec le secret. Le préfixe `v1` permet de faire évoluer l'algorithme.",
          },
        ],
      },
    ],
  },
  {
    id: "verifier-standard",
    title: "Vérifier une signature Standard",
    level: 3,
    intro: "La vérification complète : signature + fraîcheur.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Vérification Standard Webhooks",
        code: `import { createHmac, timingSafeEqual } from "node:crypto";\n\nfunction verifyStandard({ id, timestamp, signature, rawBody, secret }) {\n  // 1. Fraîcheur : rejette les vieux messages (anti-rejeu)\n  const age = Date.now() / 1000 - Number(timestamp);\n  if (age < 0 || age > 300) return false; // tolérance : 5 minutes\n\n  // 2. Signature : HMAC de "id.timestamp.corps"\n  const payload = id + "." + timestamp + "." + rawBody;\n  const expected = createHmac("sha256", secret)\n    .update(payload)\n    .digest("base64");\n\n  const received = signature.replace(/^v1,/, "");\n  return timingSafeEqual(Buffer.from(received), Buffer.from(expected));\n}`,
      },
      {
        kind: "text",
        text: "Les deux vérifications sont indissociables : la signature prouve l'origine, le timestamp prouve la fraîcheur. Une signature valide mais vieille de trois jours est un rejeu — d'où le contrôle en premier.",
      },
    ],
  },
  {
    id: "rotation-secrets",
    title: "Rotation des secrets",
    level: 3,
    intro: "Changer le secret sans casser la livraison : la procédure.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Générer le nouveau secret",
            detail:
              "Créez un second secret côté fournisseur (la plupart permettent plusieurs secrets actifs) sans supprimer l'ancien.",
          },
          {
            title: "Accepter les deux",
            detail:
              "Votre vérification essaie le nouveau secret puis l'ancien : pendant la transition, les deux signatures passent.",
          },
          {
            title: "Basculer le fournisseur",
            detail:
              "Désactivez l'ancien secret côté fournisseur. Ne gardez que le nouveau.",
          },
          {
            title: "Nettoyer",
            detail:
              "Retirez l'ancien secret de votre configuration. Vérifiez qu'aucun envoi n'échoue (logs, file d'échecs).",
          },
        ],
      },
    ],
  },
  {
    id: "replay-protection",
    title: "Protection anti-rejeu",
    level: 3,
    intro: "Une requête valide interceptée ne doit pas être rejouable indéfiniment.",
    blocks: [
      {
        kind: "text",
        text: "Même avec HTTPS, un attaquant peut capturer une requête légitime (logs, proxy compromis) et la rejouer : « paiement de 50 € » renvoyé dix fois. La parade combine le timestamp (fenêtre de quelques minutes) et l'idempotence (l'`id` déjà vu est ignoré). Hors fenêtre : rejeté. Dans la fenêtre : dédupliqué.",
      },
      {
        kind: "list",
        items: [
          "Fenêtre courte (5 min) : assez pour absorber l'horloge et la latence, trop court pour un rejeu utile.",
          "Tolérance d'horloge : acceptez un léger futur (désynchronisation des horloges).",
          "Nonce / id unique : la déduplication couvre le rejeu dans la fenêtre.",
        ],
      },
    ],
  },
  {
    id: "https-obligatoire",
    title: "HTTPS obligatoire",
    level: 3,
    intro: "Pourquoi le HTTP est exclu, sans appel.",
    blocks: [
      {
        kind: "text",
        text: "Un webhook transporte des secrets (signatures) et des données métier : en HTTP clair, tout est lisible et modifiable par un intermédiaire — la signature elle-même ne sert plus à rien si l'attaquant peut la lire et la rejouer. Les fournisseurs sérieux refusent d'ailleurs les URLs non-HTTPS.",
      },
      {
        kind: "list",
        items: [
          "Endpoint public : HTTPS avec certificat valide, pas d'auto-signé.",
          "En développement local, utilisez un tunnel HTTPS vers votre machine (le fournisseur exige une URL publique de toute façon).",
          "Vérifiez la chaîne complète : un proxy qui termine TLS en HTTP interne doit être dans votre périmètre de confiance.",
        ],
      },
    ],
  },
  {
    id: "journalisation",
    title: "Journalisation",
    level: 3,
    intro: "Tout événement reçu doit laisser une trace : le journal est votre filet.",
    blocks: [
      {
        kind: "list",
        items: [
          "Loggez chaque réception : `id`, `type`, timestamp, statut de vérification, décision (traité / doublon / rejeté).",
          "Conservez les payloads (ou un hash) : indispensables pour rejouer après un bug de traitement.",
          "Ne loggez jamais les secrets ni les données sensibles (cartes, tokens) — masquez avant d'écrire.",
          "Corrélez : un `id` d'événement qui traverse endpoint → file → worker doit être retrouvable d'un bout à l'autre.",
        ],
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring et alertes",
    level: 3,
    intro: "Ce qui doit vous réveiller la nuit — et ce qui ne le doit pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "Taux d'échec des vérifications de signature : un pic = secret désynchronisé ou attaque.",
          "Taille de la file d'échecs : un événement bloqué trop longtemps = perte métier.",
          "p99 du temps de réponse de l'endpoint : la dérive annonce les futurs retries.",
          "Volume d'événements par type : une chute brutale signale un problème côté fournisseur (ou votre URL mal configurée).",
          "Alertes actionnables uniquement : une alerte qui ne déclenche aucune action finit ignorée.",
        ],
      },
    ],
  },
  {
    id: "tests-automatises",
    title: "Tests automatisés",
    level: 3,
    intro: "Tester un endpoint webhook sans le fournisseur : signer soi-même.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Test : signature valide puis invalide",
        code: `import { test } from "node:test";\nimport assert from "node:assert";\nimport { createHmac } from "node:crypto";\n\nconst SECRET = "test-secret";\n\nfunction sign(rawBody) {\n  return "sha256=" + createHmac("sha256", SECRET).update(rawBody).digest("hex");\n}\n\ntest("accepte un événement signé", async () => {\n  const body = JSON.stringify({ id: "evt_1", type: "ping" });\n  const res = await fetch("http://localhost:3000/webhooks", {\n    method: "POST",\n    headers: { "Content-Type": "application/json", "X-Signature": sign(body) },\n    body,\n  });\n  assert.equal(res.status, 200);\n});\n\ntest("rejette une signature invalide", async () => {\n  const body = JSON.stringify({ id: "evt_2", type: "ping" });\n  const res = await fetch("http://localhost:3000/webhooks", {\n    method: "POST",\n    headers: { "Content-Type": "application/json", "X-Signature": "sha256=faux" },\n    body,\n  });\n  assert.equal(res.status, 401);\n});`,
      },
      {
        kind: "text",
        text: "Le test rejoue le rôle du fournisseur : il signe avec le secret de test. Trois cas minimaux : signature valide → 200, signature invalide → 401, doublon (même `id` deux fois) → traité une seule fois. `node:test` suffit, aucune dépendance.",
      },
    ],
  },
  {
    id: "dev-local",
    title: "Développement local",
    level: 3,
    intro: "Le fournisseur ne peut pas appeler `localhost` : les solutions.",
    blocks: [
      {
        kind: "text",
        text: "Un webhook exige une URL publique : en développement, votre `localhost:3000` est injoignable. Les solutions : un tunnel HTTPS (un service qui expose votre port local via une URL publique temporaire), ou le mode « rejeu » de certains fournisseurs (dashboard qui renvoie un événement passé vers une nouvelle URL).",
      },
      {
        kind: "list",
        items: [
          "Tunnel : rapide pour itérer, URL changeante — reconfigurez le webhook du fournisseur à chaque session.",
          "Rejeu depuis le dashboard : rejouez un vrai événement passé vers votre tunnel, sans déclencher l'action réelle.",
          "Ne redirigez jamais un webhook de production vers votre machine : isolez les environnements (secret de test ≠ secret de prod).",
        ],
      },
    ],
  },
  {
    id: "en-tetes-signatures",
    title: "En-têtes de signature par fournisseur",
    level: 3,
    intro: "Chaque service a sa convention : tableau de correspondance.",
    blocks: [
      {
        kind: "table",
        headers: ["Fournisseur", "En-tête", "Format"],
        rows: [
          ["GitHub", "`X-Hub-Signature-256`", "`sha256=<hmac hex du corps>`"],
          ["Stripe", "`Stripe-Signature`", "`t=<timestamp>,v1=<hmac hex>` (+ helper SDK)"],
          ["Standard Webhooks", "`webhook-signature`", "`v1,<hmac base64 de id.timestamp.corps>`"],
          ["Générique", "Convention maison", "Documentez-la : en-tête, algorithme, corps signé"],
        ],
      },
      {
        kind: "text",
        text: "Si vous ÉMETTEZ des webhooks : adoptez Standard Webhooks plutôt qu'un format maison — vos consommateurs vous remercieront, et les bibliothèques de vérification existent déjà.",
      },
    ],
  },
  {
    id: "mise-en-production",
    title: "Mise en production",
    level: 3,
    intro: "La checklist avant d'ouvrir l'endpoint au monde.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier la signature en conditions réelles",
            detail:
              "Branchez le fournisseur en mode test, envoyez un vrai événement : la vérification doit passer avec le corps brut réel (pas seulement avec curl).",
          },
          {
            title: "Confirmer l'idempotence",
            detail:
              "Renvoyez deux fois le même événement (rejeu du dashboard) : le traitement métier ne doit s'exécuter qu'une fois.",
          },
          {
            title: "Mesurer le temps de réponse",
            detail:
              "p99 sous la seconde en nominal : au-delà, les retries vont pleuvoir dès la première charge.",
          },
          {
            title: "Armer le monitoring",
            detail:
              "Alertes sur échecs de signature, file d'échecs, temps de réponse — testez qu'elles partent vraiment.",
          },
          {
            title: "Documenter le runbook",
            detail:
              "Où rejouer un événement ? Comment tourner le secret ? Qui est alerté ? Écrivez-le avant d'en avoir besoin.",
          },
        ],
      },
    ],
  },
  {
    id: "depannage",
    title: "Dépannage",
    level: 3,
    intro: "Le diagnostic express quand les événements n'arrivent pas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier côté fournisseur",
            detail:
              "Le dashboard du service montre les tentatives d'envoi avec le code de réponse reçu : 404 (mauvaise URL), 401 (signature), timeout (trop lent ou injoignable). Commencez toujours là.",
          },
          {
            title: "Rejouer vers curl",
            detail:
              "Copiez un payload réel du dashboard et envoyez-le en curl vers votre endpoint : si ça passe en local mais pas depuis le fournisseur, c'est le réseau / TLS / l'URL.",
          },
          {
            title: "Comparer les corps",
            detail:
              "Signature invalide ? Loggez (en dev) le corps brut reçu vs celui attendu : un proxy qui réécrit le JSON ou un parseur prématuré est le coupable habituel.",
          },
          {
            title: "Vérifier l'horloge",
            detail:
              "Rejets « timestamp trop vieux » systématiques ? Les horloges serveur/fournisseur divergent — synchronisez (NTP).",
          },
        ],
      },
    ],
  },
  {
    id: "anti-patterns",
    title: "Anti-patterns",
    level: 3,
    intro: "Ce qu'il ne faut jamais faire avec des webhooks.",
    blocks: [
      {
        kind: "list",
        items: [
          "Faire confiance à l'URL : un endpoint « secret » non documenté n'est pas une sécurité — vérifiez la signature.",
          "Traiter sans idempotence : le premier retry fera des dégâts.",
          "Logger les secrets ou les payloads sensibles en clair.",
          "Répondre 200 avant d'avoir enregistré l'événement : un crash entre les deux = événement perdu sans retry.",
          "Utiliser le même secret en test et en production.",
          "Ignorer les types d'événements inconnus silencieusement : loggez-les, le fournisseur a peut-être ajouté quelque chose d'important.",
        ],
      },
    ],
  },
  {
    id: "webhooks-vs-websockets",
    title: "Webhooks vs WebSockets",
    level: 3,
    intro: "Deux « temps réel » pour deux besoins différents.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Webhooks", "WebSockets"],
        rows: [
          ["Direction", "Serveur → serveur (le service vous appelle)", "Bidirectionnel, souvent serveur → navigateur"],
          ["Connexion", "Sans état : une requête par événement", "Connexion persistante"],
          ["Usage typique", "Notifications inter-services (paiements, CI, CRM)", "Chat, dashboards live, jeux, collaboration"],
          ["Contrainte", "URL publique + signature", "Connexion à maintenir, montée en charge"],
        ],
      },
      {
        kind: "text",
        text: "Règle : webhooks pour les événements métier entre services, WebSockets pour l'interactivité temps réel avec l'utilisateur. Ce sont des outils complémentaires, pas concurrents.",
      },
    ],
  },
  {
    id: "webhooks-vs-queues",
    title: "Webhooks vs files de messages",
    level: 3,
    intro: "Quand le webhook ne suffit plus : les files (Kafka, RabbitMQ…).",
    blocks: [
      {
        kind: "table",
        headers: ["", "Webhooks", "File de messages"],
        rows: [
          ["Couplage", "Le fournisseur connaît votre URL", "Producteurs et consommateurs découplés"],
          ["Garanties", "Au mieux une fois (avec vos retries/idempotence)", "Garanties configurables (ordre, persistance, rejeu)"],
          ["Usage", "Intégrations inter-organisations", "Interne : microservices d'une même plateforme"],
          ["Opérabilité", "Simple (HTTP)", "Infrastructure à opérer"],
        ],
      },
      {
        kind: "text",
        text: "On ne choisit pas : on reçoit des webhooks des fournisseurs externes, et on les redispatch en interne via une file. Le webhook est la porte d'entrée, la file est le système nerveux interne.",
      },
    ],
  },
  {
    id: "cas-usages",
    title: "Cas d'usage typiques",
    level: 3,
    intro: "Où les webhooks brillent : exemples concrets.",
    blocks: [
      {
        kind: "table",
        headers: ["Cas", "Événement", "Traitement"],
        rows: [
          ["Paiements (Stripe)", "`payment_intent.succeeded`", "Marquer la commande payée, envoyer la facture"],
          ["CI (GitHub)", "`push`", "Déclencher un build / déploiement"],
          ["E-commerce (Shopify)", "`orders/created`", "Synchroniser le stock, notifier la logistique"],
          ["Support (CRM)", "`ticket.created`", "Router vers l'équipe, SLA"],
          ["Automation (n8n)", "Webhook trigger", "Démarrer un workflow no-code/low-code"],
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets pour pratiquer",
    level: 3,
    intro: "Trois projets progressifs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Endpoint générique : un serveur Node qui reçoit, vérifie (HMAC) et journalise tout événement, avec tests automatisés (signature valide/invalide/doublon).",
          "Intégration GitHub : recevez les `push` d'un dépôt de test, vérifiez la signature, déclenchez une action (notification, build local).",
          "Relais Stripe simulé : émettez des webhooks au format Standard Webhooks depuis un script, consommez-les avec vérification complète + file de traitement + rejeu des échecs.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Les références officielles, en priorité.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle",
        fields: [
          {
            label: "standardwebhooks.com",
            value:
              "La spécification Standard Webhooks : en-têtes, vérification, bonnes pratiques d'émission. La référence si vous émettez des webhooks.",
          },
          {
            label: "Documentation webhooks Stripe",
            value:
              "Le guide webhooks de Stripe : signature, `constructEvent`, retries, bonnes pratiques — exemplaire sur le sujet.",
          },
          {
            label: "Documentation webhooks GitHub",
            value:
              "Le guide GitHub : configuration, `X-Hub-Signature-256`, types d'événements, redelivery.",
          },
          {
            label: "MDN — HTTP",
            value:
              "La référence des méthodes, statuts et en-têtes : le socle sur lequel tout repose.",
          },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite",
    level: 3,
    intro: "Les webhooks sont une porte vers l'intégration de systèmes.",
    blocks: [
      {
        kind: "fields",
        title: "Continuer dans la roadmap",
        fields: [
          {
            label: "api-integration",
            value:
              "Concevoir des APIs que d'autres consomment : l'autre moitié de l'intégration.",
          },
          {
            label: "rest",
            value:
              "Les conventions REST : ressources, statuts, versionnement — le vocabulaire des APIs.",
          },
          {
            label: "n8n",
            value:
              "L'automatisation low-code : déclencher des workflows sur webhooks sans coder l'orchestration.",
          },
          {
            label: "zapier",
            value:
              "Le pendant no-code : recevoir des webhooks via « Webhooks by Zapier » dans des Zaps.",
          },
          {
            label: "nodejs",
            value:
              "Approfondir le backend : le socle sur lequel tournent vos endpoints.",
          },
        ],
      },
    ],
  },
];

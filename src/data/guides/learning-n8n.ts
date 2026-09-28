import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de n8n : l'automatisation de workflows open source,
 * du premier workflow au déploiement auto-hébergé.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_N8N: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est n8n, pourquoi il existe et ce qui le distingue des autres outils d'automatisation.",
    blocks: [
      {
        kind: "text",
        text: "n8n est une plateforme d'automatisation de workflows : on connecte des applications, des APIs et des services dans des workflows visuels composés de nœuds, avec la possibilité d'écrire du code quand le visuel ne suffit plus. Déclencher, transformer, agir : c'est le cycle de base.",
      },
      {
        kind: "text",
        text: "Pourquoi n8n existe : les outils d'automatisation cloud enferment les données et la logique dans une plateforme tierce, avec une facturation à l'exécution. n8n est open source et auto-hébergeable : les workflows tournent sur votre infrastructure, vos identifiants restent chez vous, et le code (JavaScript) est possible à chaque étape quand les blocs visuels atteignent leurs limites.",
      },
      {
        kind: "text",
        text: "Ce que n8n n'est pas : un outil réservé aux non-développeurs. Le visuel accélère l'assemblage, mais les workflows sérieux exigent de comprendre HTTP, les APIs, le JSON et les webhooks — les mêmes fondamentaux que l'intégration classique. n8n ne supprime pas la complexité, il la rend manipulable.",
      },
    ],
  },
  {
    id: "panorama-n8n",
    title: "n8n en une image",
    level: 1,
    intro:
      "L'anatomie d'un workflow : du déclencheur à l'action.",
    blocks: [
      {
        kind: "diagram",
        title: "Le flux d'un workflow",
        lines: [
          "DÉCLENCHEUR (trigger)",
          "  Webhook │ Planifié │ Manuel │ Événement d'app",
          "     │",
          "     ▼",
          "NŒUDS (nodes) enchaînés",
          "  HTTP Request → Code (JS) → IF → …",
          "     │  (les données circulent en JSON)",
          "     ▼",
          "ACTIONS",
          "  Envoyer un email │ Écrire en base │ Appeler une API",
          "     │",
          "     ▼",
          "EXÉCUTION (loggée, rejouable, avec historique)",
          "     │",
          "Credentials chiffrés à part (jamais dans les nœuds)",
        ],
      },
      {
        kind: "list",
        items: [
          "Workflow = un graphe de nœuds qui s'exécute de bout en bout.",
          "Trigger = ce qui démarre (webhook, planification, manuel).",
          "Les données transitent en JSON d'un nœud à l'autre.",
          "Chaque exécution est enregistrée : on peut la rejouer et l'inspecter.",
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
      "n8n assemble des briques : il faut comprendre les briques.",
    blocks: [
      {
        kind: "fields",
        title: "Fondamentaux",
        fields: [
          {
            label: "HTTP",
            value:
              "Méthodes (GET, POST…), codes de statut, headers : chaque nœud HTTP Request est une requête HTTP explicite.",
          },
          {
            label: "APIs REST",
            value:
              "Authentification (clé, Bearer, OAuth), pagination, formats de réponse : n8n orchestre des APIs, il faut savoir les lire.",
          },
          {
            label: "JSON",
            value:
              "Le format de toutes les données circulant entre nœuds : objets, tableaux, accès aux champs. Les expressions n8n manipulent du JSON.",
          },
          {
            label: "Webhooks",
            value:
              "Le principe : une URL qui déclenche un traitement à la réception d'un événement. La moitié des workflows n8n commencent par un webhook.",
          },
          {
            label: "JavaScript (bases)",
            value:
              "Variables, objets, tableaux, fonctions : pour le nœud Code et les expressions avancées. Pas besoin d'être développeur, mais il faut lire du JS.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. Sans HTTP et JSON, n8n ressemble à de la magie ; avec, c'est de l'ingénierie visuelle.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Lancer n8n en local : Docker pour la voie propre, npx pour l'essai immédiat.",
    blocks: [
      {
        kind: "command",
        label: "Lancer n8n avec Docker",
        command: "docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n",
        why: "Démarre n8n depuis l'image officielle `n8nio/n8n` sur le port 5678. Le volume `n8n_data` monté sur `/home/node/.n8n` persiste workflows, identifiants et historique : sans lui, tout disparaît à l'arrêt du conteneur. Le `--rm` nettoie le conteneur, pas les données (elles sont dans le volume).",
        verify: "curl -s http://localhost:5678/healthz",
      },
      {
        kind: "command",
        label: "Essai rapide avec npx",
        command: "npx n8n",
        why: "Télécharge et lance n8n sans Docker, en une commande : idéal pour un premier contact. Les données sont stockées dans `~/.n8n` par défaut. Pour un usage durable, préférer Docker (isolation, reproductibilité).",
        verify: "curl -s http://localhost:5678/healthz",
      },
      {
        kind: "text",
        text: "Après le lancement, l'éditeur est sur `http://localhost:5678`. La première visite propose de créer un compte propriétaire : c'est le compte admin de l'instance.",
      },
    ],
  },
  {
    id: "premier-workflow",
    title: "Premier workflow",
    level: 2,
    intro:
      "De zéro à un workflow fonctionnel : webhook → traitement → réponse.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un workflow",
            detail:
              "Dans l'éditeur, 'Create Workflow' : un canvas vide s'ouvre. Chaque workflow a un nom — nommez-le explicitement dès le début (`formulaire-contact-v1`, pas `My workflow`).",
          },
          {
            title: "Ajouter un déclencheur Webhook",
            detail:
              "Ajouter un nœud 'Webhook', méthode POST, chemin `contact`. n8n affiche l'URL d'écoute : en test, une URL temporaire ; en production (workflow actif), l'URL `/webhook/contact`.",
          },
          {
            title: "Ajouter un nœud Code",
            detail:
              "Enchaîner un nœud 'Code' (JavaScript) qui lit `items[0].json` (le corps reçu) et construit un message de confirmation. C'est le premier contact avec les expressions et le JSON circulant.",
          },
          {
            title: "Répondre avec 'Respond to Webhook'",
            detail:
              "Ajouter le nœud 'Respond to Webhook' pour renvoyer une réponse à l'appelant. Sans lui, le webhook ne répond qu'à la fin avec les données brutes.",
          },
          {
            title: "Tester puis activer",
            detail:
              "Cliquer 'Test workflow', envoyer une requête (`curl -X POST … -d '{\"nom\":\"Aina\"}'`), vérifier l'exécution. Puis 'Active' : le workflow passe en production sur l'URL définitive.",
          },
        ],
      },
      {
        kind: "code",
        language: "bash",
        title: "Tester le webhook",
        code: "curl -X POST http://localhost:5678/webhook-test/contact \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"nom\": \"Aina\", \"email\": \"aina@example.com\"}'",
      },
    ],
  },
  {
    id: "concepts-cles",
    title: "Concepts clés",
    level: 2,
    intro:
      "Le vocabulaire n8n : six notions qui structurent tout.",
    blocks: [
      {
        kind: "fields",
        title: "Vocabulaire",
        fields: [
          {
            label: "Workflows",
            value:
              "Un graphe de nœuds sauvegardé et versionnable : l'unité de travail. Actif (en production) ou inactif (brouillon).",
          },
          {
            label: "Nodes",
            value:
              "Les briques : triggers (déclencheurs), actions (API, base, email), logique (IF, boucles, fusion), Code (JavaScript libre).",
          },
          {
            label: "Triggers",
            value:
              "Ce qui démarre : Webhook (événement externe), Schedule (planifié, en cron-like), Manual (clic), ou déclencheurs d'applications.",
          },
          {
            label: "Credentials",
            value:
              "Les identifiants (clés API, OAuth) stockés chiffrés à part, référencés par les nœuds — jamais en dur dans les workflows.",
          },
          {
            label: "Expressions",
            value:
              "La syntaxe `{{ … }}` pour injecter des données dynamiques (JavaScript) dans les paramètres des nœuds.",
          },
          {
            label: "Executions",
            value:
              "L'historique de chaque passage : entrées, sorties, erreurs, durées. Rejouable et inspectable — la base du debug.",
          },
        ],
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Où vivent les workflows : local, éditeur, persistance.",
    blocks: [
      {
        kind: "diagram",
        title: "L'instance n8n locale",
        lines: [
          "Navigateur → Éditeur n8n (http://localhost:5678)",
          "                    │",
          "        ┌───────────┼───────────┐",
          "        ▼           ▼           ▼",
          "   Workflows   Credentials   Executions",
          "   (JSON)      (chiffrés)    (historique)",
          "        │           │           │",
          "        └───────────┼───────────┘",
          "                  ▼",
          "   Stockage : /home/node/.n8n (volume Docker)",
          "   Base : SQLite (défaut) → PostgreSQL (production)",
        ],
      },
      {
        kind: "text",
        text: "En local, SQLite suffit : zéro configuration. En production, basculer sur PostgreSQL (variable d'environnement) pour la fiabilité et la concurrence. Les workflows sont exportables en JSON : versionnables dans Git comme du code.",
      },
    ],
  },
  {
    id: "expressions",
    title: "Expressions : la syntaxe {{ }}",
    level: 2,
    intro:
      "Le pont entre le visuel et le dynamique : injecter des données dans les paramètres.",
    blocks: [
      {
        kind: "text",
        text: "Une expression `{{ … }}` contient du JavaScript évalué à l'exécution. Elle accède aux données des nœuds précédents : `$json` (les données courantes), `$node[\"Nom\"].json` (un nœud précis), `$now`, `$env`, etc.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemples d'expressions",
        code: "// Champ du nœud courant\n{{ $json.email }}\n\n// Champ d'un nœud nommé\n{{ $node[\"Webhook\"].json.nom }}\n\n// Transformation inline\n{{ $json.nom.toUpperCase() }}\n\n// Condition\n{{ $json.montant > 1000 ? \"gros\" : \"standard\" }}\n\n// Date du jour formatée\n{{ $now.toFormat(\"yyyy-MM-dd\") }}",
      },
      {
        kind: "list",
        items: [
          "L'éditeur propose l'autocomplétion et un aperçu de la valeur : l'utiliser plutôt que deviner les chemins.",
          "Si l'expression devient complexe (plusieurs lignes, logique métier), basculer sur un nœud Code : plus lisible, testable.",
          "Attention aux champs manquants : `$json.email` sur un item sans email vaut `undefined` — gérer les cas avec `||` ou des valeurs par défaut.",
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "Construire, tester, déployer un workflow : la routine.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Brouillon inactif",
            detail:
              "Construire le workflow inactif : les URLs `/webhook-test/` permettent de tester sans impacter la production.",
          },
          {
            title: "Tester nœud par nœud",
            detail:
              "Exécuter avec 'Test workflow' ou 'Execute step' : inspecter les sorties JSON de chaque nœud dans le panneau. Les données d'exemple restent disponibles pour les nœuds suivants.",
          },
          {
            title: "Figer les données de test",
            detail:
              "Épingler (pin) des données sur un nœud pour rejouer la suite sans redéclencher le début : indispensable quand le trigger est un événement réel.",
          },
          {
            title: "Gérer les erreurs",
            detail:
              "Configurer le comportement en erreur (arrêter, continuer, workflow d'erreur) avant d'activer — pas après le premier incident.",
          },
          {
            title: "Activer et surveiller",
            detail:
              "Passer en 'Active' : les URLs passent en `/webhook/`. Surveiller les premières exécutions réelles dans l'historique.",
          },
        ],
      },
    ],
  },
  {
    id: "credentials",
    title: "Credentials : gérer les secrets",
    level: 2,
    intro:
      "Les identifiants ne vivent jamais dans les nœuds.",
    blocks: [
      {
        kind: "fields",
        title: "Principes",
        fields: [
          {
            label: "Stockage chiffré",
            value:
              "Les credentials sont chiffrés dans la base n8n et référencés par nom dans les nœuds. Un export de workflow ne contient jamais les secrets.",
          },
          {
            label: "Un credential par usage",
            value:
              "Créer des credentials nommés explicitement (`stripe-prod`, `gmail-notifications`) plutôt qu'un fourre-tout : en cas de rotation, on sait quoi changer.",
          },
          {
            label: "Tester la connexion",
            value:
              "Chaque type de credential propose un test : l'utiliser à la création pour valider clé et permissions avant de construire.",
          },
          {
            label: "Environnements séparés",
            value:
              "Des credentials distincts pour test et production quand les services le permettent (clés test vs live).",
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
      "Quatre projets pour monter en puissance.",
    blocks: [
      {
        kind: "fields",
        title: "Dans l'ordre",
        fields: [
          {
            label: "1. Formulaire → notification",
            value:
              "Webhook qui reçoit un formulaire, formate un message et envoie un email. Objectif : le cycle trigger → traitement → action.",
          },
          {
            label: "2. Notification Discord via webhook",
            value:
              "À chaque événement (ex. nouveau commit, nouvelle commande), poster un message formaté sur Discord. Objectif : les webhooks sortants et le formatage.",
          },
          {
            label: "3. Synchronisation API → base",
            value:
              "Récupérer des données d'une API paginée (HTTP Request + boucle), les écrire dans une base. Objectif : pagination, volumes, idempotence.",
          },
          {
            label: "4. Workflow avec IA",
            value:
              "Enrichir des données via une API d'IA (résumé, classification) puis router selon le résultat. Objectif : intégrer un service externe avec gestion d'erreurs.",
          },
        ],
      },
    ],
  },
  {
    id: "cloud-vs-auto-heberge",
    title: "Cloud ou auto-hébergé ?",
    level: 2,
    intro:
      "Deux modes d'exploitation, un même éditeur.",
    blocks: [
      {
        kind: "table",
        headers: ["", "n8n Cloud", "Auto-hébergé"],
        rows: [
          ["Mise en route", "Compte en ligne, immédiat", "Docker ou serveur à gérer"],
          ["Données", "Chez n8n", "Chez vous (souveraineté, conformité)"],
          ["Coût", "Abonnement", "Coût du serveur + maintenance"],
          ["Personnalisation", "Limitée", "Totale (variables d'env, base, scaling)"],
          ["Mises à jour", "Automatiques", "À planifier"],
        ],
      },
      {
        kind: "text",
        text: "Pour apprendre et prototyper : l'auto-hébergé local est gratuit et complet. Pour la production : le cloud si l'équipe ne veut pas d'infra, l'auto-hébergé si les données ou la conformité l'exigent — en assumant sauvegardes et mises à jour.",
      },
    ],
  },
  {
    id: "limites-n8n",
    title: "Limites de n8n",
    level: 2,
    intro:
      "Ce que n8n fait mal : le savoir avant de s'enfermer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Logique très complexe : un workflow de 50 nœuds avec des branches partout devient illisible — à ce stade, c'est du code applicatif déguisé.",
          "Très gros volumes : n8n n'est pas un ETL big data ; pour des millions de lignes, des outils dédiés sont plus adaptés.",
          "Temps réel strict : les workflows sont événementiels, pas du streaming à faible latence garantie.",
          "Versionning : les workflows sont du JSON exportable, mais le diff/merge reste moins naturel que du code.",
          "Règle : n8n excelle à orchestrer des services ; dès que la logique métier domine l'orchestration, écrire un service.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "nodes-essentiels",
    title: "Les nœuds essentiels",
    level: 3,
    intro:
      "La boîte à outils : les nœuds qui couvrent l'essentiel des workflows.",
    blocks: [
      {
        kind: "fields",
        title: "Par famille",
        fields: [
          {
            label: "Déclencheurs",
            value:
              "Webhook (événement externe), Schedule Trigger (planifié, syntaxe cron), Manual Trigger (tests), déclencheurs d'applications (nouveau message, nouvelle ligne…).",
          },
          {
            label: "HTTP Request",
            value:
              "Le couteau suisse : appeler n'importe quelle API REST (méthode, URL, headers, body, auth). C'est le nœud à maîtriser en premier.",
          },
          {
            label: "Code",
            value:
              "JavaScript libre sur les items : transformer, filtrer, calculer. La sortie doit être un tableau d'objets `{ json: … }`.",
          },
          {
            label: "IF / Switch",
            value:
              "Branchements conditionnels : router le flux selon les données (IF binaire, Switch multi-cas).",
          },
          {
            label: "Merge",
            value:
              "Recombiner des branches (append, merge par clé…) : synchroniser des flux parallèles.",
          },
          {
            label: "Set / Edit Fields",
            value:
              "Façonner les données : renommer, ajouter, supprimer des champs. Le nœud de 'mise en forme' entre deux étapes.",
          },
          {
            label: "Loop",
            value:
              "Itérer sur des items en lots (batching) : traiter de gros volumes sans tout charger en mémoire.",
          },
        ],
      },
    ],
  },
  {
    id: "http-request-avance",
    title: "HTTP Request en détail",
    level: 3,
    intro:
      "Le nœud le plus utilisé : l'exploiter à fond.",
    blocks: [
      {
        kind: "fields",
        title: "Points clés",
        fields: [
          {
            label: "Authentification",
            value:
              "Via credentials : Generic (header, query, basic), OAuth2, ou spécifique au service. Toujours via credentials, jamais de clé en dur dans l'URL.",
          },
          {
            label: "Pagination",
            value:
              "La plupart des APIs paginent : boucler sur les pages (curseur ou numéro) jusqu'à épuisement. Le nœud HTTP seul ne pagine pas — c'est le workflow qui boucle.",
          },
          {
            label: "Query parameters",
            value:
              "Passer filtres et options en paramètres plutôt que concaténer des URLs à la main : plus lisible, encodage géré.",
          },
          {
            label: "Gestion des erreurs HTTP",
            value:
              "Distinguer 4xx (requête invalide : corriger) de 5xx/429 (réessayer avec délai). Le retry aveugle sur une 400 ne sert à rien.",
          },
        ],
      },
    ],
  },
  {
    id: "code-node",
    title: "Le nœud Code",
    level: 3,
    intro:
      "Quand le visuel ne suffit plus : du JavaScript au milieu du workflow.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Transformer des items",
        code: "// Entrée : items avec { json: { nom, prix_ht } }\n// Sortie : tableau d'objets { json: ... }\nconst results = []\nfor (const item of items) {\n  const { nom, prix_ht } = item.json\n  results.push({\n    json: {\n      nom: nom.trim(),\n      prix_ttc: Math.round(prix_ht * 1.2 * 100) / 100,\n      categorie: prix_ht > 100 ? \"premium\" : \"standard\"\n    }\n  })\n}\nreturn results",
      },
      {
        kind: "list",
        items: [
          "Contrat : on reçoit `items` (tableau de `{ json }`), on retourne un tableau de `{ json }`.",
          "Idéal pour : transformations, calculs, filtrage complexe, formatage.",
          "À éviter : appels réseau lourds ou logique métier tentaculaire — le nœud Code reste un maillon, pas une application.",
        ],
      },
    ],
  },
  {
    id: "gestion-erreurs",
    title: "Gestion des erreurs",
    level: 3,
    intro:
      "Un workflow de production gère ses échecs : les mécanismes natifs.",
    blocks: [
      {
        kind: "fields",
        title: "Les mécanismes",
        fields: [
          {
            label: "Retry du nœud",
            value:
              "Réessais automatiques avec délai sur les erreurs transitoires (5xx, timeouts, 429). À réserver aux erreurs réellement transitoires.",
          },
          {
            label: "Continuer en erreur",
            value:
              "Option 'Continue On Fail' : le workflow poursuit avec les items en succès et marque les échecs. Utile en batch (99 succès, 1 échec à traiter à part).",
          },
          {
            label: "Error Workflow",
            value:
              "Un workflow dédié déclenché à chaque erreur : notifier (email, chat), logger l'exécution fautive, voire tenter une récupération.",
          },
          {
            label: "IF de garde",
            value:
              "Vérifier les préconditions (champ présent, format valide) avec un nœud IF avant l'action risquée : l'erreur évitée vaut mieux que l'erreur gérée.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle : chaque workflow actif a un comportement d'erreur défini et testé (provoquer une erreur volontairement en test). Un workflow qui échoue silencieusement est pire qu'un workflow qui n'existe pas.",
      },
    ],
  },
  {
    id: "sous-workflows",
    title: "Sous-workflows",
    level: 3,
    intro:
      "Découper les gros workflows : réutiliser au lieu de dupliquer.",
    blocks: [
      {
        kind: "text",
        text: "Le nœud 'Execute Workflow' appelle un autre workflow comme une fonction : il lui passe des données et récupère son résultat. Usage : factoriser une séquence réutilisée (ex. 'envoyer une notification formatée', 'enrichir un contact').",
      },
      {
        kind: "list",
        items: [
          "Un sous-workflow = une responsabilité : nommé explicitement, documenté dans sa description.",
          "Éviter les appels en cascade trop profonds : 2 niveaux suffisent dans la plupart des cas.",
          "Tester le sous-workflow isolément avec des données épinglées avant de l'appeler.",
        ],
      },
    ],
  },
  {
    id: "webhooks-avance",
    title: "Webhooks en détail",
    level: 3,
    intro:
      "Le déclencheur le plus puissant : bien l'utiliser.",
    blocks: [
      {
        kind: "fields",
        title: "Points clés",
        fields: [
          {
            label: "URLs test vs production",
            value:
              "`/webhook-test/…` (workflow inactif, écoute temporaire pendant le test) vs `/webhook/…` (workflow actif). Ne jamais donner l'URL de test à un service externe.",
          },
          {
            label: "Sécurité",
            value:
              "Une URL webhook est un secret : chemins non devinables, et validation de signature quand le service émetteur en fournit une (HMAC). Un webhook public sans vérification est une porte ouverte.",
          },
          {
            label: "Réponse",
            value:
              "Le nœud 'Respond to Webhook' contrôle la réponse (statut, body). Pour les traitements longs : répondre 200 vite, traiter en asynchrone — sinon l'émetteur timeout.",
          },
          {
            label: "Idempotence",
            value:
              "Les webhooks peuvent être renvoyés (retry de l'émetteur) : concevoir le traitement pour supporter les doublons (clé d'unicité, vérification d'existence).",
          },
        ],
      },
    ],
  },
  {
    id: "planification",
    title: "Planification (Schedule Trigger)",
    level: 3,
    intro:
      "Les workflows récurrents : l'équivalent visuel du cron.",
    blocks: [
      {
        kind: "text",
        text: "Le Schedule Trigger lance un workflow à intervalle (toutes les heures) ou en cron (expression complète pour les cas fins). Cas typiques : synchronisation nocturne, rapports quotidiens, nettoyage hebdomadaire.",
      },
      {
        kind: "list",
        items: [
          "Préférer les heures creuses pour les jobs lourds (API tierces moins sollicitées, moins de concurrence).",
          "Rendre les jobs idempotents : un job qui tourne deux fois (redémarrage, chevauchement) ne doit pas dupliquer.",
          "Logger le résultat de chaque exécution planifiée : un job silencieux qui échoue silencieusement est un classique.",
          "Éviter les chevauchements : si un job peut durer plus que son intervalle, le concevoir pour (verrou, ou intervalle plus large).",
        ],
      },
    ],
  },
  {
    id: "api-n8n",
    title: "L'API n8n",
    level: 3,
    intro:
      "Piloter n8n par programme : activer, déclencher, superviser.",
    blocks: [
      {
        kind: "text",
        text: "n8n expose une API REST (`/api/v1`) : lister les workflows, les activer/désactiver, déclencher des exécutions, consulter l'historique. Authentification par clé API générée dans les réglages.",
      },
      {
        kind: "list",
        items: [
          "Cas d'usage : activer/désactiver des workflows depuis un déploiement, superviser les exécutions depuis un monitoring externe.",
          "La clé API est un secret à part entière : mêmes règles que les credentials.",
          "Pour déclencher un workflow depuis l'extérieur, le webhook reste la voie la plus simple ; l'API sert à administrer.",
        ],
      },
    ],
  },
  {
    id: "variables-environnement",
    title: "Configuration par variables d'environnement",
    level: 3,
    intro:
      "Régler l'instance sans toucher au code : les variables utiles.",
    blocks: [
      {
        kind: "fields",
        title: "Variables courantes",
        fields: [
          {
            label: "`N8N_PORT`",
            value:
              "Le port d'écoute (défaut 5678). À changer en cas de conflit ou derrière un reverse proxy.",
          },
          {
            label: "`WEBHOOK_URL`",
            value:
              "L'URL publique de l'instance : n8n s'en sert pour générer les URLs de webhook affichées. Indispensable derrière un proxy ou un tunnel.",
          },
          {
            label: "Base de données",
            value:
              "Par défaut SQLite ; pour PostgreSQL en production, les variables `DB_TYPE`, `DB_POSTGRESDB_*` configurent la connexion.",
          },
          {
            label: "Données sensibles",
            value:
              "Les valeurs secrètes des workflows peuvent venir de variables d'environnement plutôt que d'être saisies : même secret, rotation centralisée.",
          },
        ],
      },
      {
        kind: "code",
        language: "bash",
        title: "Lancer avec une configuration",
        code: "docker run -d --name n8n \\\n  -p 5678:5678 \\\n  -e N8N_PORT=5678 \\\n  -e WEBHOOK_URL=https://n8n.example.com/ \\\n  -v n8n_data:/home/node/.n8n \\\n  n8nio/n8n",
      },
    ],
  },
  {
    id: "base-de-donnees",
    title: "Base de données : SQLite vs PostgreSQL",
    level: 3,
    intro:
      "Le stockage interne de n8n : choisir selon l'usage.",
    blocks: [
      {
        kind: "table",
        headers: ["", "SQLite (défaut)", "PostgreSQL"],
        rows: [
          ["Installation", "Aucune", "Serveur à provisionner"],
          ["Concurrence", "Limitée", "Bonne (multi-workers, queue mode)"],
          ["Usage", "Développement, petites instances", "Production, équipes"],
          ["Sauvegarde", "Copie du fichier", "Outils natifs (`pg_dump`)"],
        ],
      },
      {
        kind: "text",
        text: "Migrer plus tard est possible mais demande une opération dédiée : si la production est l'objectif, partir directement sur PostgreSQL évite la migration.",
      },
    ],
  },
  {
    id: "scaling",
    title: "Passer à l'échelle",
    level: 3,
    intro:
      "Quand une instance ne suffit plus : le mode file d'attente.",
    blocks: [
      {
        kind: "text",
        text: "n8n propose un mode 'queue' : les exécutions sont placées dans une file (Redis) et traitées par des workers séparés, pendant que l'instance principale sert l'éditeur et l'API. Cela découple l'interface de l'exécution et permet d'ajouter des workers selon la charge.",
      },
      {
        kind: "list",
        items: [
          "Réservé aux charges réelles : la plupart des usages tiennent sur une instance unique bien dimensionnée.",
          "Le mode queue suppose PostgreSQL + Redis : trois composants à opérer au lieu d'un.",
          "Avant de scaler : vérifier que le goulot n'est pas une API tierce (rate limit) — scaler n8n ne lève pas les quotas externes.",
        ],
      },
    ],
  },
  {
    id: "sauvegardes",
    title: "Sauvegardes et versionning",
    level: 3,
    intro:
      "Les workflows sont du capital : les protéger comme du code.",
    blocks: [
      {
        kind: "command",
        label: "Exporter tous les workflows",
        command: "docker exec n8n n8n export:workflow --all --output=/home/node/.n8n/backups/",
        why: "Exporte chaque workflow en JSON dans le dossier de sauvegarde. Le JSON contient la logique complète (hors secrets) : c'est la matière à versionner dans Git et à restaurer en cas de perte.",
        verify: "docker exec n8n ls /home/node/.n8n/backups/ | head",
      },
      {
        kind: "command",
        label: "Importer des workflows",
        command: "docker exec n8n n8n import:workflow --input=/home/node/.n8n/backups/",
        why: "Réimporte les workflows exportés : restauration après incident ou migration vers une nouvelle instance. Les credentials sont à recréer à part (ils ne sont jamais exportés).",
      },
      {
        kind: "list",
        items: [
          "Automatiser l'export (cron + Git) : un export manuel sera oublié.",
          "Sauvegarder aussi le volume complet (base SQLite ou dump PostgreSQL) : les executions et credentials y vivent.",
          "Documenter la procédure de restauration avant d'en avoir besoin.",
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging",
    level: 3,
    intro:
      "Les exécutions sont la vérité : savoir les lire.",
    blocks: [
      {
        kind: "fields",
        title: "Méthodes",
        fields: [
          {
            label: "Historique d'exécutions",
            value:
              "Chaque exécution conserve entrées/sorties de chaque nœud : cliquer sur le nœud en erreur montre exactement ce qu'il a reçu. C'est le point de départ de tout diagnostic.",
          },
          {
            label: "Données épinglées",
            value:
              "Épingler (pin) la sortie d'un nœud pour rejouer la suite sans redéclencher le début : debugger la fin d'un workflow sans spammer l'API du début.",
          },
          {
            label: "Exécution pas à pas",
            value:
              "'Execute step' sur un nœud isolé avec les données en entrée : valider une expression ou un mapping sans lancer tout le workflow.",
          },
          {
            label: "Logs du conteneur",
            value:
              "`docker logs n8n` pour les erreurs système (démarrage, base, mémoire) que l'éditeur ne montre pas.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pannes typiques : expression référençant un champ inexistant (`undefined` qui se propage), credential expiré (401 soudain sur un workflow qui marchait), API tierce en rate limit (429), webhook test utilisé en production (URL temporaire expirée).",
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité",
    level: 3,
    intro:
      "Une instance n8n auto-hébergée expose des secrets et des déclencheurs : les verrous.",
    blocks: [
      {
        kind: "fields",
        title: "Les couches",
        fields: [
          {
            label: "Accès à l'éditeur",
            value:
              "Comptes individuels, mots de passe solides ; l'éditeur donne accès à tous les credentials — c'est la clé du royaume.",
          },
          {
            label: "HTTPS",
            value:
              "Derrière un reverse proxy TLS en production : les credentials et les données transitent sinon en clair.",
          },
          {
            label: "Webhooks",
            value:
              "Chemins non devinables, validation de signature quand disponible. Un webhook sans contrôle est exécutable par n'importe qui.",
          },
          {
            label: "Réseau",
            value:
              "L'instance n'écoute que ce qui est nécessaire ; firewall restrictif. Les workers et Redis ne sont pas exposés.",
          },
          {
            label: "Mises à jour",
            value:
              "Suivre les releases : les correctifs de sécurité s'appliquent en mettant à jour l'image, après test des workflows critiques.",
          },
        ],
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    level: 3,
    intro:
      "Savoir que les workflows tournent — et être prévenu quand ce n'est plus le cas.",
    blocks: [
      {
        kind: "list",
        items: [
          "Error Workflow global : un workflow d'erreur qui notifie (email, chat) avec le nom du workflow fautif et le lien vers l'exécution.",
          "Surveillance des exécutions planifiées : un job qui ne se lance plus (instance arrêtée) n'apparaît dans aucun log d'erreur — un heartbeat externe (vérification périodique) le détecte.",
          "Métriques système : CPU/mémoire/disque du conteneur, taille de la base (les executions s'accumulent — purger l'historique ancien).",
          "Tableau de bord : lister les workflows actifs avec leur dernière exécution et son statut — la vue d'ensemble qui manque nativement.",
        ],
      },
    ],
  },
  {
    id: "testing-workflows",
    title: "Tester les workflows",
    level: 3,
    intro:
      "Fiabiliser avant de mettre en production.",
    blocks: [
      {
        kind: "fields",
        title: "Pratiques",
        fields: [
          {
            label: "Données de test représentatives",
            value:
              "Tester avec des cas limites réels : champ manquant, tableau vide, accents, volumes. Le cas nominal seul ne prouve rien.",
          },
          {
            label: "Erreurs provoquées",
            value:
              "Simuler chaque panne prévue (API en 500, timeout, 429) et vérifier le comportement : retry, branche d'erreur, notification.",
          },
          {
            label: "Environnement de test",
            value:
              "Une instance ou des credentials de test séparés pour ne pas polluer la production (emails envoyés, lignes créées).",
          },
          {
            label: "Revue avant activation",
            value:
              "Relire le workflow comme du code : nommage, gestion d'erreurs, secrets, idempotence. À deux, c'est mieux.",
          },
        ],
      },
    ],
  },
  {
    id: "mises-a-jour",
    title: "Mises à jour",
    level: 3,
    intro:
      "Mettre à jour sans casser la production.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Sauvegarder",
            detail:
              "Exporter les workflows en JSON et sauvegarder le volume/la base. Une mise à jour sans sauvegarde est un pari.",
          },
          {
            title: "Lire les notes de version",
            detail:
              "Vérifier les changements cassants (breaking changes) : renommages de nœuds, comportements modifiés. n8n documente les migrations.",
          },
          {
            title: "Tester à blanc",
            detail:
              "Monter la nouvelle version sur une copie (données restaurées) et rejouer les workflows critiques avant de toucher la production.",
          },
          {
            title: "Déployer et vérifier",
            detail:
              "Mettre à jour l'image, redémarrer, vérifier les workflows actifs et leurs dernières exécutions. Garder l'ancienne image sous la main pour revenir en arrière.",
          },
        ],
      },
    ],
  },
  {
    id: "integrations-ia",
    title: "Intégrations IA",
    level: 3,
    intro:
      "Brancher des modèles d'IA dans les workflows : le cas d'usage montant.",
    blocks: [
      {
        kind: "text",
        text: "n8n propose des nœuds et intégrations pour les APIs d'IA (modèles de langage, embeddings) : résumer un texte, classifier un ticket, extraire des entités — puis router le workflow selon le résultat.",
      },
      {
        kind: "list",
        items: [
          "Concevoir avec l'incertitude : une sortie d'IA n'est pas déterministe — valider le format (JSON forcé, schéma) avant de l'exploiter.",
          "Coûts : chaque appel est facturé côté fournisseur — limiter les volumes en test, monitorer en production.",
          "Données : ce qu'on envoie à une API tierce la quitte — vérifier la conformité (données personnelles, confidentialité).",
          "Toujours un filet : branche d'erreur et valeur par défaut quand l'IA échoue ou répond hors format.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-prod",
    title: "Workflows de production",
    level: 3,
    intro:
      "Ce qui sépare un prototype d'un workflow fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Nommage explicite : workflows, nœuds et credentials nommés clairement ; description remplie sur chaque workflow.",
          "Idempotence : un workflow relancé (retry, doublon de webhook) ne doit pas créer de doublons.",
          "Gestion d'erreurs définie : retry, error workflow, notifications — testés, pas supposés.",
          "Secrets hors des workflows : credentials et variables d'environnement uniquement.",
          "Petits workflows : découper en sous-workflows plutôt qu'un monolithe de 40 nœuds.",
          "Documentation : à quoi sert ce workflow, qui le déclenche, que faire quand il échoue.",
          "Sauvegardes automatisées et versionnées dans Git.",
          "Monitoring : error workflow global + heartbeat sur les planifiés.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques des automatiseurs n8n.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "URL webhook-test en production",
            value:
              "Problem : le workflow cesse de recevoir les événements. Why : l'URL `/webhook-test/` n'écoute que pendant le test manuel. Better : activer le workflow et utiliser l'URL `/webhook/`.",
          },
          {
            label: "Secrets en dur",
            value:
              "Problem : clé API collée dans un paramètre, visible dans l'export. Why : aller vite. Better : credentials dédiés, dès le début.",
          },
          {
            label: "Pas de gestion d'erreur",
            value:
              "Problem : le premier 500 d'une API tierce fait échouer le workflow silencieusement. Why : 'ça marchait en test'. Better : retry + error workflow avant l'activation.",
          },
          {
            label: "Pagination oubliée",
            value:
              "Problem : seuls les 100 premiers éléments sont traités. Why : l'API pagine, le workflow ne boucle pas. Better : boucle de pagination explicite jusqu'à épuisement.",
          },
          {
            label: "Doublons non gérés",
            value:
              "Problem : le même événement crée deux tickets. Why : retry de l'émetteur ou relance manuelle. Better : clé d'unicité / vérification d'existence (idempotence).",
          },
          {
            label: "Workflow monolithe",
            value:
              "Problem : 40 nœuds imbriqués, impossible à débugger. Why : tout mettre au même endroit. Better : sous-workflows par responsabilité.",
          },
          {
            label: "Données perdues à l'arrêt",
            value:
              "Problem : conteneur recréé, workflows envolés. Why : pas de volume persistant. Better : volume sur `/home/node/.n8n` dès le premier lancement.",
          },
          {
            label: "Pas de sauvegarde",
            value:
              "Problem : incident = tout reconstruire à la main. Why : 'c'est dans n8n'. Better : exports JSON automatisés + Git.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets avancés",
    level: 3,
    intro:
      "Trois projets niveau production.",
    blocks: [
      {
        kind: "fields",
        title: "À réaliser",
        fields: [
          {
            label: "Pipeline de qualification de leads",
            value:
              "Formulaire → enrichissement (API) → scoring (Code) → routage (IF) → CRM + notification. Avec gestion d'erreurs complète et idempotence.",
          },
          {
            label: "Synchronisation bidirectionnelle",
            value:
              "Deux SaaS synchronisés dans les deux sens : détection de conflits, journalisation, error workflow. Le projet qui apprend la rigueur.",
          },
          {
            label: "Instance durcie",
            value:
              "PostgreSQL + HTTPS + sauvegardes automatisées + monitoring + mises à jour documentées : n8n en vraie production auto-hébergée.",
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
          { label: "Documentation n8n", value: "docs.n8n.io : la référence — concepts, nœuds, API, déploiement." },
          { label: "Concepts", value: "docs.n8n.io/workflows : workflows, nœuds, expressions, executions expliqués en profondeur." },
          { label: "Intégrations", value: "Le catalogue des nœuds : paramètres et authentification de chaque intégration." },
        ],
      },
      {
        kind: "list",
        items: [
          "Templates : la bibliothèque de workflows prêts à l'emploi — à lire pour apprendre les patterns, pas à copier aveuglément.",
          "APIs : la documentation des services connectés (toujours la source de vérité sur les endpoints et quotas).",
          "Communauté : le forum n8n pour les cas limites et les retours d'usage avancés.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "n8n maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir l'intégration : intégration d'APIs (OAuth, pagination, retry, idempotence) pour des connecteurs robustes.",
          "Maîtriser les déclencheurs : webhooks en profondeur — signatures, sécurité, bonnes pratiques.",
          "Automatiser le code : GitHub Actions pour les pipelines CI/CD, en complément des workflows métier.",
          "Comparer les approches : Make et Zapier pour situer n8n dans le paysage de l'automatisation.",
          "Tester les APIs : Postman pour prototyper les appels avant de les câbler dans n8n.",
          "Revenir à la roadmap : valider n8n et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "variables-workflow",
    title: "Variables et données persistantes",
    level: 3,
    intro:
      "Partager des valeurs entre nœuds et entre exécutions.",
    blocks: [
      {
        kind: "fields",
        title: "Les mécanismes",
        fields: [
          {
            label: "Variables globales",
            value:
              "Définies dans les réglages n8n : clés API, URLs de base, préfixes — modifiables sans toucher aux workflows. Accessibles via `$vars`.",
          },
          {
            label: "Workflow static data",
            value:
              "Un objet persistant entre les exécutions d'un même workflow (`$getWorkflowStaticData`) : mémoriser le dernier ID traité, un compteur, un état.",
          },
          {
            label: "Variables d'environnement",
            value:
              "La configuration du déploiement (base de données, chiffrement, timezone) : dans le `.env` ou l'environnement du conteneur, jamais en dur dans les workflows.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Static data : traiter uniquement le nouveau",
        code: "// Nœud Code — ne garder que les éléments plus récents\nconst staticData = $getWorkflowStaticData(\"global\");\nconst dernierVu = staticData.dernierId || 0;\nconst nouveaux = $input.all().filter((i) => i.json.id > dernierVu);\nif (nouveaux.length > 0) {\n  staticData.dernierId = Math.max(...nouveaux.map((i) => i.json.id));\n}\nreturn nouveaux;",
      },
    ],
  },
  {
    id: "code-node-avance",
    title: "Le nœud Code en profondeur",
    level: 3,
    intro:
      "JavaScript comme super-pouvoir : transformations complexes.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Patterns utiles",
        code: "// Aplatir un tableau imbriqué en éléments\nconst items = [];\nfor (const commande of $input.all()) {\n  for (const ligne of commande.json.lignes) {\n    items.push({ json: { ...ligne, commandeId: commande.json.id } });\n  }\n}\nreturn items;\n\n// Agréger : total par client\nconst totaux = {};\nfor (const item of $input.all()) {\n  const c = item.json.client;\n  totaux[c] = (totaux[c] || 0) + item.json.montant;\n}\nreturn [{ json: totaux }];",
      },
      {
        kind: "list",
        items: [
          "Retourner un tableau d'objets `{ json: … }` : chaque objet devient un élément en sortie.",
          "`$input.all()` pour tout lire, `$json` pour l'élément courant en mode 'Run Once for Each Item'.",
          "Les appels HTTP externes se font avec `$http.request()` (ou le nœud HTTP dédié).",
          "Le nœud Code ne remplace pas un vrai script versionné : pour la logique métier critique, préférer une API appelée par n8n.",
        ],
      },
    ],
  },
  {
    id: "webhooks-avances",
    title: "Webhooks avancés",
    level: 3,
    intro:
      "Répondre, sécuriser, traiter : au-delà du déclencheur simple.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "Répondre immédiatement",
            value:
              "Le mode 'Respond: Immediately' renvoie 200 dès réception : pour les émetteurs qui exigent une réponse rapide, le traitement continue en arrière-plan.",
          },
          {
            label: "Vérifier la signature",
            value:
              "Les services sérieux signent leurs webhooks (HMAC) : vérifier la signature dans un nœud Code avant tout traitement — sinon n'importe qui peut déclencher le workflow.",
          },
          {
            label: "Idempotence",
            value:
              "Un webhook peut arriver deux fois : dédupliquer sur un identifiant unique (static data ou base) avant d'agir.",
          },
          {
            label: "URLs de test vs production",
            value:
              "Chaque webhook a deux URLs : test (écoute manuelle) et production (workflow actif). Ne jamais donner l'URL de test à un service réel.",
          },
        ],
      },
    ],
  },
  {
    id: "queue-mode",
    title: "Mode file d'attente (scaling)",
    level: 3,
    intro:
      "Passer à l'échelle : workers et Redis.",
    blocks: [
      {
        kind: "diagram",
        title: "Architecture scalable",
        lines: [
          "Déclencheurs",
          "     │",
          "     ▼",
          "Instance PRINCIPALE (interface + orchestration)",
          "     │",
          "     ▼",
          "REDIS (file d'attente des exécutions)",
          "     │",
          "     ├─► WORKER 1",
          "     ├─► WORKER 2",
          "     └─► WORKER 3",
          "",
          "Les workers exécutent, la principale coordonne.",
          "On ajoute des workers quand la charge augmente.",
        ],
      },
      {
        kind: "list",
        items: [
          "Le mode queue se configure via variables d'environnement (`EXECUTIONS_MODE=queue`) avec Redis.",
          "Utile quand les exécutions sont nombreuses ou longues : le mode simple suffit pour démarrer.",
          "En Docker : un service pour la principale, N services workers, un Redis — via docker-compose.",
        ],
      },
    ],
  },
  {
    id: "api-n8n-avance",
    title: "Piloter n8n par son API",
    level: 3,
    intro:
      "L'API publique n8n : automatiser l'automatiseur.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Lister les workflows via l'API",
        code: "curl -s -H \"X-N8N-API-KEY: $CLE_API\" \\\n  http://localhost:5678/api/v1/workflows | jq '.data[].name'",
      },
      {
        kind: "list",
        items: [
          "La clé API se génère dans les réglages n8n (profil → API).",
          "Cas d'usage : activer/désactiver des workflows par script, déclencher des exécutions depuis une CI, auditer les workflows.",
          "L'API gère workflows, exécutions, identifiants : tout ce que fait l'interface, scriptable.",
        ],
      },
    ],
  },
];

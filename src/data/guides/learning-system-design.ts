import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du System Design : de zéro à la conception de
 * systèmes à grande échelle. 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent le
 * code inline entre backticks. Sujet conceptuel : très peu de blocs
 * commande, c'est normal — la matière est le raisonnement, pas l'outil.
 */
export const LEARNING_SYSTEM_DESIGN: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le system design, ce qu'il n'est pas, et pourquoi il devient indispensable à partir d'une certaine échelle.",
    blocks: [
      {
        kind: "text",
        text: "Le system design est l'art de concevoir des systèmes logiciels à grande échelle : choisir les composants (API, bases, caches, files), définir leurs interactions, et arbitrer les compromis — cohérence, disponibilité, latence, coût — avant d'écrire la moindre ligne de code. Ce n'est pas du codage : c'est de la décision structurée.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est une compétence à part : un système à 100 utilisateurs et un système à 10 millions d'utilisateurs ne diffèrent pas que par la taille des serveurs. Les pannes partielles, la latence réseau, les pics de trafic et la cohérence des données créent des problèmes qualitativement nouveaux. Le system design donne la méthode pour y répondre : estimer les volumes, identifier les goulots, choisir les composants, documenter les arbitrages.",
      },
      {
        kind: "diagram",
        title: "La démarche en six temps",
        lines: [
          "BESOINS (fonctionnel : que doit faire le système ?)",
          "   │",
          "   ▼",
          "VOLUMES (combien d'utilisateurs, de données, de requêtes ?)",
          "   │",
          "   ▼",
          "COMPOSANTS (API, base, cache, file : quoi pour quoi ?)",
          "   │",
          "   ▼",
          "FLUX (comment les données circulent entre composants ?)",
          "   │",
          "   ▼",
          "TRADE-OFFS (que sacrifie-t-on, et pourquoi ?)",
          "   │",
          "   ▼",
          "ADR (décisions écrites, avec leur contexte)",
        ],
      },
    ],
  },
  {
    id: "concevoir-avant-construire",
    title: "Concevoir avant de construire",
    level: 1,
    intro:
      "Le changement de posture : passer de « quel framework ? » à « quel problème, à quelle échelle ? ».",
    blocks: [
      {
        kind: "text",
        text: "L'erreur la plus coûteuse en architecture est de choisir les technologies avant de comprendre le problème : microservices parce que « c'est moderne », NoSQL parce que « ça scale ». Le system design inverse l'ordre : d'abord les besoins fonctionnels et les volumes estimés, ensuite les composants qui y répondent, enfin les technologies qui les implémentent. Un bon design avec des technologies ordinaires bat un mauvais design avec les meilleures.",
      },
      {
        kind: "list",
        items: [
          "Le design répond à « quoi » et « pourquoi », le code répond à « comment ».",
          "Tout choix d'architecture est un compromis : il n'existe pas de système à la fois parfaitement cohérent, disponible et bon marché.",
          "La simplicité est une qualité architecturale : chaque composant ajouté est un composant à opérer, surveiller et dépanner.",
          "Un design se dessine et se discute : schéma, volumes chiffrés, décisions écrites — pas seulement du code.",
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
      "Ce qu'il faut avoir pratiqué avant de concevoir des systèmes, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Bases indispensables",
        fields: [
          {
            label: "API REST",
            value:
              "Les APIs sont les interfaces du système : leur design conditionne le découpage en services et les contrats entre équipes.",
          },
          {
            label: "SQL",
            value:
              "Le stockage est souvent le premier goulot : modélisation, index, transactions — sans ça, impossible de raisonner sur la donnée à l'échelle.",
          },
          {
            label: "Authentification",
            value:
              "La sécurité traverse tout le système : identité, secrets, moindre privilège — elle se conçoit, ne se rajoute pas.",
          },
          {
            label: "Caching",
            value:
              "Le cache est un composant d'architecture à part entière : stratégies, invalidation, cohérence — pas une rustine.",
          },
        ],
      },
    ],
  },
  {
    id: "methode-cinq-etapes",
    title: "La méthode en cinq étapes",
    level: 2,
    intro:
      "Le cadre de travail pour tout exercice de design : le suivre dans l'ordre évite 90 % des oublis.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Clarifier les besoins fonctionnels",
            detail:
              "Que doit faire le système, précisément ? Lister les fonctionnalités, les acteurs, et surtout ce qui est hors périmètre. Un design sans périmètre n'en finit jamais.",
          },
          {
            title: "Estimer les volumes",
            detail:
              "Utilisateurs, requêtes/seconde, données stockées, croissance. Des ordres de grandeur suffisent — voir la section suivante. Sans chiffres, tout design est décoratif.",
          },
          {
            title: "Dessiner les composants",
            detail:
              "Clients, API, base de données, cache, file de messages, stockage de fichiers : des boîtes et des flèches, avec le rôle de chacun en une phrase.",
          },
          {
            title: "Détailler les flux critiques",
            detail:
              "Prendre 2-3 parcours clés (inscription, lecture, écriture) et suivre les données de bout en bout : où sont les lectures ? les écritures ? les points de contention ?",
          },
          {
            title: "Documenter les trade-offs",
            detail:
              "Chaque choix structurant devient une ADR : contexte, options envisagées, décision, conséquences. C'est la mémoire du système.",
          },
        ],
      },
    ],
  },
  {
    id: "estimation-volumes",
    title: "Estimer les volumes",
    level: 2,
    intro:
      "Les calculs d'ordre de grandeur (« back-of-the-envelope ») qui dimensionnent tout le reste.",
    blocks: [
      {
        kind: "command",
        label: "Calculer des ordres de grandeur",
        command: "python3 -c \"req_jour=100_000_000; print('req/s moyennes :', req_jour/86400); print('req/s en pointe (x3) :', round(req_jour/86400*3)); print('stockage/jour (1 Ko/req) :', round(req_jour*1024/1e9, 1), 'Go')\"",
        why: "Le calcul d'ordre de grandeur se fait à la main ou en une ligne : requêtes/seconde moyennes (diviser par 86400), pointe (multiplier par 2-3), stockage (volume × taille unitaire). Ces trois nombres conditionnent le choix des composants.",
        verify: "python3 -c \"print(10**6, 'utilisateurs =', 10**6/86400, 'inscriptions/s si 1M en un an')\"",
      },
      {
        kind: "text",
        text: "Les puissances de 10 à connaître par cœur : 1 Ko, 1 Mo, 1 Go ; mille requêtes/jour ≈ rien, un million/jour ≈ 12 req/s, un milliard/jour ≈ 12 000 req/s. Et les latences : mémoire ≈ nanosecondes, disque SSD ≈ microsecondes, réseau local ≈ millisecondes, Internet ≈ dizaines de millisecondes. Un design qui ignore ces échelles choisit les mauvais composants.",
      },
    ],
  },
  {
    id: "etude-cas-raccourcisseur",
    title: "Étude de cas : raccourcisseur d'URL",
    level: 2,
    intro:
      "Appliquer la méthode complète sur le cas d'école du system design.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Besoins",
            detail:
              "Fonctionnel : créer une URL courte depuis une longue, rediriger vers la longue. Hors périmètre : analytics détaillées, URLs personnalisées (v1).",
          },
          {
            title: "Volumes",
            detail:
              "100 millions d'URLs créées par mois (≈ 40/s), 10× plus de lectures (≈ 400/s en pointe). Stockage : 100M × 500 octets ≈ 50 Go/mois — modeste.",
          },
          {
            title: "Composants",
            detail:
              "API fine (création + redirection), base clé-valeur (clé courte → URL longue), cache des URLs populaires devant la base.",
          },
          {
            title: "Génération des clés",
            detail:
              "Compteur + encodage base62 (collisions impossibles, mais point central), ou hash avec vérification de collision (distribué, mais collisions à gérer). Trade-off documenté.",
          },
          {
            title: "Points durs",
            detail:
              "La redirection est ultra-fréquente et en lecture : le cache absorbe 90 %+ du trafic. L'écriture est rare : la base n'est jamais le goulot.",
          },
        ],
      },
    ],
  },
  {
    id: "composants-fondamentaux",
    title: "Les composants fondamentaux",
    level: 2,
    intro:
      "Le vocabulaire des boîtes du schéma : ce que fait chaque composant, et quand l'ajouter.",
    blocks: [
      {
        kind: "table",
        headers: ["Composant", "Rôle", "Quand l'ajouter"],
        rows: [
          ["Load balancer", "Répartit le trafic sur N instances", "Dès qu'on a 2+ instances d'API"],
          ["API / Application", "Logique métier, exposée en HTTP", "Toujours — le cœur du système"],
          ["Base relationnelle", "Données structurées, transactions", "Toujours au début — le défaut sain"],
          ["Cache (Redis)", "Données chaudes en mémoire", "Quand la base devient le goulot en lecture"],
          ["File de messages", "Traitements asynchrones", "Quand des tâches peuvent être différées"],
          ["CDN", "Contenu statique au plus près des utilisateurs", "Audience géographiquement dispersée"],
          ["Object storage", "Fichiers, images, sauvegardes", "Dès qu'on stocke des fichiers"],
          ["API Gateway", "Point d'entrée unique : auth, routage, quotas", "Plusieurs services exposés"],
        ],
      },
    ],
  },
  {
    id: "load-balancing",
    title: "Load balancing",
    level: 2,
    intro:
      "La première réponse à la montée en charge : répartir avant de complexifier.",
    blocks: [
      {
        kind: "fields",
        title: "Stratégies de répartition",
        fields: [
          {
            label: "Round-robin",
            value: "À tour de rôle, simplement. Suffit quand les instances sont identiques et les requêtes homogènes.",
          },
          {
            label: "Least connections",
            value: "Vers l'instance la moins chargée. Mieux quand les requêtes ont des durées variables.",
          },
          {
            label: "Hash IP / sticky",
            value: "Un client toujours vers la même instance. Utile avec sessions locales — mais rend le scaling moins fluide.",
          },
          {
            label: "Health checks",
            value: "Le load balancer retire les instances en panne : la haute disponibilité commence ici, pas dans le code.",
          },
        ],
      },
      {
        kind: "text",
        text: "Principe : scaler horizontalement l'API (N instances identiques, sans état) derrière un load balancer est presque toujours la première étape — avant le sharding, avant les microservices. Une API sans état se réplique à volonté ; une API avec état local (sessions en mémoire, fichiers locaux) résiste au scaling.",
      },
    ],
  },
  {
    id: "choix-base-donnees",
    title: "Choisir sa base de données",
    level: 2,
    intro:
      "SQL ou NoSQL : une décision guidée par les accès, pas par la mode.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Relationnel (PostgreSQL…)", "NoSQL (documents, clé-valeur…)"],
        rows: [
          ["Modèle", "Tables, schéma fixe, jointures", "Documents, schéma flexible"],
          ["Point fort", "Cohérence, transactions, requêtes complexes", "Écritures massives, schéma évolutif, distribution"],
          ["Point faible", "Scaling horizontal plus délicat", "Pas de jointures, cohérence souvent éventuelle"],
          ["Choisir quand", "Données relationnelles, besoin de transactions", "Volume d'écritures extrême, modèle simple"],
        ],
      },
      {
        kind: "text",
        text: "Le défaut sain reste le relationnel : la plupart des systèmes n'atteignent jamais les volumes qui justifient NoSQL, et les transactions ACID évitent des bugs subtils. On migre vers NoSQL sur un besoin mesuré (un cas d'usage précis, pas « au cas où »), souvent en complément — polyglot persistence — plutôt qu'en remplacement.",
      },
    ],
  },
  {
    id: "cache-architecture",
    title: "Le cache en architecture",
    level: 2,
    intro:
      "Placer le cache au bon endroit, avec la bonne stratégie d'invalidation.",
    blocks: [
      {
        kind: "fields",
        title: "Stratégies de cache",
        fields: [
          {
            label: "Cache-aside (lazy)",
            value: "L'application lit le cache, et en cas d'absence lit la base puis remplit le cache. Le plus courant, simple, mais premier accès lent.",
          },
          {
            label: "Write-through",
            value: "Écriture simultanée en cache et en base. Données toujours fraîches, écritures plus lentes.",
          },
          {
            label: "TTL",
            value: "Expiration temporelle : simple et robuste — la donnée peut être périmée jusqu'au TTL, compromis assumé.",
          },
          {
            label: "Invalidation explicite",
            value: "Supprimer la clé à l'écriture. Plus frais, mais chaque oubli crée une incohérence durable.",
          },
        ],
      },
      {
        kind: "text",
        text: "Les deux lois du cache : il ne rend rapide que ce qui est relu souvent (mesurer le taux de hit avant d'optimiser), et l'invalidation est le problème difficile — en cas de doute, un TTL court vaut mieux qu'une invalidation manquée. Un cache n'est jamais une source de vérité : le système doit fonctionner (lentement) sans lui.",
      },
    ],
  },
  {
    id: "outils-diagrammes",
    title: "Dessiner une architecture",
    level: 2,
    intro:
      "Les conventions qui rendent un schéma d'architecture lisible par d'autres.",
    blocks: [
      {
        kind: "list",
        items: [
          "Des boîtes nommées par leur rôle (« API Commandes »), pas par leur technologie (« Node.js ») — le quoi avant le comment.",
          "Des flèches étiquetées par le sens et la nature du flux (« lit », « publie événement », « HTTP », « SQL »).",
          "Un sens de lecture : clients à gauche/en haut, données à droite/en bas — la même convention partout.",
          "Les volumes sur le schéma : « 400 req/s », « 50 Go/mois » — un schéma sans chiffres est un dessin, pas un design.",
          "Plusieurs vues : vue d'ensemble (une page), puis zoom sur les flux critiques — jamais tout sur un seul schéma illisible.",
          "Outils : un tableau blanc ou Excalidraw suffisent — la clarté du raisonnement compte, pas la beauté du diagramme.",
        ],
      },
    ],
  },
  {
    id: "workflow-design",
    title: "Workflow : du besoin à l'ADR",
    level: 2,
    intro:
      "Comment se déroule concrètement un exercice de design, seul ou en équipe.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cadrer (15 min)",
            detail:
              "Questions fonctionnelles et hors-périmètre. Écrire les réponses : elles deviennent l'en-tête du document de design.",
          },
          {
            title: "Chiffrer (15 min)",
            detail:
              "Volumes, croissance, contraintes (latence max, budget). Ces chiffres arbitreront tous les choix suivants.",
          },
          {
            title: "Esquisser (30 min)",
            detail:
              "Premier schéma : le plus simple qui répond au besoin (souvent : client → API → base). Ne pas optimiser prématurément.",
          },
          {
            title: "Durcir (30 min)",
            detail:
              "Identifier les goulots du schéma simple (base en lecture ? pics ?) et ajouter les composants nécessaires : cache, file, réplication.",
          },
          {
            title: "Arbitrer (20 min)",
            detail:
              "Chaque ajout est un trade-off : l'écrire (coût, bénéfice, alternative rejetée). C'est la matière des ADR.",
          },
          {
            title: "Relire (10 min)",
            detail:
              "Le design répond-il aux besoins avec les volumes estimés ? Un pair le comprend-il sans explication orale ?",
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
      "Quatre projets de difficulté croissante pour passer de la théorie à la pratique.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Design d'un blog à 10k lecteurs",
        fields: [
          { label: "Ce qu'on produit", value: "Schéma, volumes estimés, choix justifiés (base, cache ?)" },
          { label: "Ce qu'on apprend", value: "La méthode en cinq étapes sur un cas simple" },
          { label: "Difficulté", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "Raccourcisseur d'URL chiffré" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Raccourcisseur chiffré",
        fields: [
          { label: "Ce qu'on produit", value: "Design complet avec estimation, génération de clés, cache, ADR" },
          { label: "Ce qu'on apprend", value: "Arbitrer (compteur vs hash), dimensionner le cache" },
          { label: "Difficulté", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Fil d'actualité type réseau social" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Fil d'actualité",
        fields: [
          { label: "Ce qu'on produit", value: "Fan-out, choix push vs pull, sharding, cohérence éventuelle assumée" },
          { label: "Ce qu'on apprend", value: "Les trade-offs réels : latence vs fraîcheur, coût vs cohérence" },
          { label: "Difficulté", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "Revue d'architecture d'un système existant" },
        ],
      },
      {
        kind: "fields",
        title: "Expert — Revue d'architecture",
        fields: [
          { label: "Ce qu'on produit", value: "Audit d'un système réel : points faibles, propositions, feuille de route" },
          { label: "Ce qu'on apprend", value: "Lire une architecture existante et prioriser les chantiers" },
          { label: "Difficulté", value: "Élevée — deux semaines" },
          { label: "Projet suivant", value: "Contribuer aux ADR d'un projet open source" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "scalabilite",
    title: "Scalabilité verticale vs horizontale",
    level: 3,
    intro:
      "Les deux directions du passage à l'échelle, leurs limites et leurs coûts.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Verticale (scale up)", "Horizontale (scale out)"],
        rows: [
          ["Principe", "Une machine plus puissante", "Plus de machines"],
          ["Limite", "Le plus gros serveur existant", "Théoriquement illimitée"],
          ["Complexité", "Aucune (même architecture)", "Distribution, coordination, état partagé"],
          ["Coût", "Croît plus vite que la puissance", "Linéaire, avec du matériel banal"],
          ["Disponibilité", "La machine reste un point unique de panne", "La panne d'un nœud est absorbée"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, on combine : scale up d'abord (simple, efficace jusqu'à un point), puis scale out quand la machine ne suffit plus ou que la disponibilité l'exige. Le prérequis du scale out est l'absence d'état local — d'où l'importance des APIs stateless et du stockage externalisé (base, cache, object storage).",
      },
    ],
  },
  {
    id: "cap-theorem",
    title: "Le théorème CAP",
    level: 3,
    intro:
      "Le compromis fondateur des systèmes distribués : en cas de partition réseau, choisir entre cohérence et disponibilité.",
    blocks: [
      {
        kind: "text",
        text: "CAP dit : face à une partition réseau (P — inévitable en distribué), un système ne peut garantir à la fois la cohérence (C : tout le monde voit la même donnée) et la disponibilité (A : le système répond toujours). Il faut choisir. En pratique, le choix se fait par cas d'usage : un paiement exige la cohérence (mieux vaut refuser que débiter deux fois), un fil d'actualité préfère la disponibilité (mieux vaut un fil légèrement périmé qu'une erreur).",
      },
      {
        kind: "list",
        items: [
          "CP : cohérence d'abord — en cas de partition, une partie du système refuse de répondre (ex. base avec quorum strict).",
          "AP : disponibilité d'abord — le système répond toujours, les divergences se réconcilient après (ex. DNS, panier e-commerce).",
          "Le « P » n'est pas optionnel : sur un réseau réel, les partitions arrivent — le design doit dire ce qui se passe quand.",
          "Au-delà de CAP : PACELC — même sans partition, il y a un arbitrage latence/cohérence (réponse locale rapide vs attente du quorum).",
        ],
      },
    ],
  },
  {
    id: "coherence-modeles",
    title: "Modèles de cohérence",
    level: 3,
    intro:
      "Entre « tout le monde voit tout tout de suite » et « ça finira par converger » : le spectre des garanties.",
    blocks: [
      {
        kind: "fields",
        title: "Du plus fort au plus faible",
        fields: [
          {
            label: "Forte",
            value: "Après une écriture, toutes les lectures voient la nouvelle valeur. Coûteuse (quorum, verrous) — réservée aux données critiques.",
          },
          {
            label: "Éventuelle",
            value: "Les répliques convergent avec le temps, sans garantie de délai. Suffit quand une donnée légèrement périmée est acceptable.",
          },
          {
            label: "Lecture de ses écritures",
            value: "Un utilisateur voit toujours ses propres modifications. Le minimum pour une UX non déroutante.",
          },
          {
            label: "Cohérence causale",
            value: "Les écritures liées causalement sont vues dans l'ordre. Un bon compromis pour les systèmes collaboratifs.",
          },
        ],
      },
      {
        kind: "text",
        text: "Choisir un modèle de cohérence, c'est répondre à : « que se passe-t-il si deux utilisateurs modifient la même donnée en même temps, sur deux répliques différentes ? » La réponse détermine les mécanismes : verrous distribués, vecteurs de versions, last-write-wins, ou réconciliation manuelle.",
      },
    ],
  },
  {
    id: "replication",
    title: "Réplication des données",
    level: 3,
    intro:
      "Copier les données pour la disponibilité et la proximité : les topologies et leurs arbitrages.",
    blocks: [
      {
        kind: "fields",
        title: "Topologies de réplication",
        fields: [
          {
            label: "Leader-follower",
            value: "Les écritures vont au leader, les répliques suivent. Simple, mais le leader est un goulot d'écriture et un point de bascule.",
          },
          {
            label: "Multi-leader",
            value: "Écritures sur plusieurs nœuds (par région). Moins de latence, mais conflits d'écriture à résoudre.",
          },
          {
            label: "Leaderless (quorum)",
            value: "Écriture et lecture par quorum (ex. 2 nœuds sur 3). Pas de leader, disponibilité maximale, latence du quorum.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le paramètre central est le lag de réplication : le délai entre l'écriture sur le leader et sa visibilité sur les répliques. Lire sur une réplique en retard après avoir écrit sur le leader produit des anomalies visibles (« mon article a disparu ») — d'où la garantie « lecture de ses écritures » comme filet.",
      },
    ],
  },
  {
    id: "sharding",
    title: "Sharding",
    level: 3,
    intro:
      "Diviser les données entre serveurs quand un seul ne suffit plus : stratégies et pièges.",
    blocks: [
      {
        kind: "text",
        text: "Le sharding découpe une table en fragments (shards) répartis sur plusieurs serveurs, selon une clé : par hash de l'id utilisateur (répartition uniforme), par plage (ids 1-1M, 1M-2M — simple mais hotspots), ou par géographie (données européennes en Europe). Chaque stratégie a son biais : le hash équilibre mais rend les requêtes multi-shards coûteuses, la géographie respecte la loi mais complique les requêtes globales.",
      },
      {
        kind: "list",
        items: [
          "Le shard key est la décision la plus structurante : presque toutes les requêtes doivent pouvoir cibler un shard.",
          "Re-sharding : ajouter des shards après coup redistribue les données — opération lourde, à anticiper.",
          "Hotspot : une clé qui concentre le trafic (un utilisateur star) sature son shard — prévoir l'exception.",
          "Alternative : avant de sharder, vérifier qu'on a épuisé la réplication en lecture et le cache — le sharding est le dernier recours, pas le premier.",
        ],
      },
    ],
  },
  {
    id: "consensus",
    title: "Consensus distribué",
    level: 3,
    intro:
      "Comment des machines qui peuvent tomber se mettent d'accord : le problème le plus difficile du distribué.",
    blocks: [
      {
        kind: "text",
        text: "Le consensus permet à un groupe de nœuds de s'accorder sur une valeur malgré les pannes (élection d'un leader, validation d'une écriture). Les algorithmes de référence sont Paxos (fondateur, réputé difficile) et Raft (conçu pour être compréhensible, utilisé par etcd, Consul). En pratique, on n'implémente jamais ces algorithmes : on utilise des systèmes qui les embarquent (etcd pour la configuration, Kafka avec KRaft pour les métadonnées).",
      },
      {
        kind: "text",
        text: "Ce qu'il faut en retenir pour le design : toute élection de leader prend du temps (indisponibilité temporaire en écriture), et le quorum (majorité des nœuds) est le mécanisme qui évite les décisions contradictoires — d'où l'usage de nombres impairs de nœuds (3, 5) dans les clusters.",
      },
    ],
  },
  {
    id: "cdn",
    title: "CDN",
    level: 3,
    intro:
      "Rapprocher le contenu des utilisateurs : le réseau de diffusion, premier levier de latence mondiale.",
    blocks: [
      {
        kind: "text",
        text: "Un CDN (Content Delivery Network) réplique les contenus statiques (images, vidéos, JS, CSS) sur des serveurs répartis dans le monde : l'utilisateur télécharge depuis le point le plus proche, pas depuis votre serveur d'origine. Le gain est double : latence divisée et charge retirée de votre infrastructure.",
      },
      {
        kind: "list",
        items: [
          "Cache par URL : chaque ressource a une durée de cache — versionner les fichiers (`app.v2.js`) plutôt qu'invalider.",
          "Contenu dynamique : les CDN modernes cachent aussi des réponses d'API (avec clés de cache fines) — à manier avec précaution.",
          "TLS et origine : le CDN termine le TLS au plus près, l'origine reste protégée et non exposée directement.",
          "Coût : facturé au volume transféré — les gros fichiers (vidéo) se chiffrent, d'où l'importance des formats adaptés.",
        ],
      },
    ],
  },
  {
    id: "dns",
    title: "DNS en architecture",
    level: 3,
    intro:
      "Le DNS n'est pas qu'un annuaire : c'est un composant de disponibilité et de routage.",
    blocks: [
      {
        kind: "list",
        items: [
          "Résolution : le premier appel de toute requête — un DNS lent ou en panne rend tout indisponible, d'où les TTL et la redondance des résolveurs.",
          "Routage géographique : le DNS peut renvoyer des IPs différentes selon la région (GeoDNS) — routage grossier mais efficace.",
          "Bascule : en cas de panne d'une région, changer l'enregistrement DNS redirige le trafic — avec un délai lié au TTL (d'où des TTL courts sur les enregistrements critiques).",
          "Limites : le DNS ne connaît pas la charge réelle ni la santé fine — il complète le load balancing, ne le remplace pas.",
        ],
      },
    ],
  },
  {
    id: "api-gateway",
    title: "API Gateway",
    level: 3,
    intro:
      "Le point d'entrée unique : ce qu'il doit faire, et ce qu'il ne doit pas faire.",
    blocks: [
      {
        kind: "fields",
        title: "Responsabilités légitimes",
        fields: [
          {
            label: "Routage",
            value: "Diriger chaque requête vers le bon service selon le chemin ou l'en-tête — la table de routage centrale.",
          },
          {
            label: "Authentification",
            value: "Vérifier les tokens une fois, propager l'identité aux services — évite de dupliquer la logique d'auth.",
          },
          {
            label: "Quotas",
            value: "Rate limiting par client/clé API : protège les services des abus et répartit équitablement la capacité.",
          },
          {
            label: "Transformation",
            value: "Agrégation légère, versioning d'API — avec modération : une gateway qui contient de la logique métier devient un monolithe déguisé.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'anti-pattern : la « gateway intelligente » qui orchestre des appels entre services et porte la logique métier — c'est un point central de panne et de complexité. La gateway route, protège et observe ; elle n'orchestre pas.",
      },
    ],
  },
  {
    id: "rate-limiting",
    title: "Rate limiting",
    level: 3,
    intro:
      "Protéger le système des abus et des pics : les algorithmes et leur mise en œuvre.",
    blocks: [
      {
        kind: "fields",
        title: "Algorithmes courants",
        fields: [
          {
            label: "Token bucket",
            value: "Un seau de jetons qui se remplit à rythme constant ; chaque requête consomme un jeton. Tolère les rafales (le seau plein) tout en limitant le débit moyen.",
          },
          {
            label: "Fenêtre fixe",
            value: "N requêtes par minute calendaire. Simple, mais autorise 2N requêtes à cheval sur deux fenêtres.",
          },
          {
            label: "Fenêtre glissante",
            value: "N requêtes sur les 60 dernières secondes à tout instant. Plus juste, un peu plus coûteux à calculer.",
          },
        ],
      },
      {
        kind: "text",
        text: "En distribué, le compteur doit être partagé (Redis est le choix classique) sinon chaque instance applique sa propre limite. Renvoyer `429 Too Many Requests` avec l'en-tête `Retry-After` : le client sait qu'il doit ralentir, pas qu'il y a un bug.",
      },
    ],
  },
  {
    id: "resilience-patterns",
    title: "Patterns de résilience",
    level: 3,
    intro:
      "Concevoir pour la panne : les mécanismes qui empêchent une défaillance locale de devenir un effondrement global.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois patterns essentiels",
        fields: [
          {
            label: "Circuit breaker",
            value: "Après N échecs vers un service, on cesse de l'appeler pendant un temps (circuit ouvert) et on répond en dégradé. Évite l'attente en cascade et laisse le service fautif récupérer.",
          },
          {
            label: "Retry avec backoff",
            value: "Réessayer les échecs transitoires avec délai croissant + jitter (aléa). Sans jitter, tous les clients réessaient en même temps et recréent le pic.",
          },
          {
            label: "Bulkhead",
            value: "Cloisonner les ressources (pools de threads/connexions par dépendance) : la lenteur d'un service ne doit pas affamer les autres.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le principe sous-jacent : les pannes sont normales en distribué, et un système résilient les absorbe au lieu de les propager. Chaque appel réseau du design doit répondre à : timeout ? retry ? dégradation si le service est indisponible ? Un schéma sans ces réponses est un vœu pieux.",
      },
    ],
  },
  {
    id: "service-discovery",
    title: "Service discovery",
    level: 3,
    intro:
      "Comment les services se trouvent quand leurs adresses changent en permanence.",
    blocks: [
      {
        kind: "text",
        text: "En environnement dynamique (conteneurs, autoscaling), les IPs des instances changent sans arrêt : coder des adresses en dur est impossible. La découverte de service maintient un registre à jour (qui propose quoi, où, en quelle santé) que les clients interrogent — directement (client-side) ou via un intermédiaire (load balancer, service mesh).",
      },
      {
        kind: "text",
        text: "En pratique, l'orchestrateur (Kubernetes et ses Services, par exemple) fournit ce mécanisme nativement : un nom DNS stable résout vers les instances saines du moment. Le design doit juste utiliser ces noms stables et ne jamais supposer une topologie fixe.",
      },
    ],
  },
  {
    id: "sync-vs-async",
    title: "Sync vs async : arbitrer",
    level: 3,
    intro:
      "Le choix architectural le plus structurant après le découpage : quand appeler, quand publier.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "Appel synchrone", "Événement asynchrone"],
        rows: [
          ["Latence perçue", "Immédiate si le service répond vite", "Réponse immédiate, traitement différé"],
          ["Couplage", "L'appelant dépend de la disponibilité", "Découplé temporellement"],
          ["Cohérence", "Plus simple à raisonner", "Éventuelle — à concevoir"],
          ["Débogage", "Pile d'appels lisible", "Corrélation par identifiants nécessaire"],
          ["Cas typique", "Lecture, validation, réponse attendue", "Notifications, analytics, traitements longs"],
        ],
      },
      {
        kind: "text",
        text: "La règle : synchrone quand l'utilisateur attend le résultat (lire son profil, valider son paiement), asynchrone quand le travail peut suivre (envoyer l'email, mettre à jour les stats). Les systèmes réels mélangent : une requête synchrone qui publie des événements pour le traitement différé.",
      },
    ],
  },
  {
    id: "microservices-monolithe",
    title: "Microservices vs monolithe",
    level: 3,
    intro:
      "Le débat le plus dogmatique de l'architecture, traité sans dogme.",
    blocks: [
      {
        kind: "text",
        text: "Un monolithe modulaire bien conçu — code organisé en modules aux frontières claires, déployé en un bloc — bat souvent des microservices prématurés. Les microservices apportent : déploiements indépendants, scaling par service, choix technologiques par service. Ils coûtent : distribution (réseau, pannes partielles), observabilité distribuée, coordination des déploiements, transactions entre services.",
      },
      {
        kind: "list",
        items: [
          "Découper pour des raisons d'équipe (plusieurs équipes qui se marchent dessus) ou de charge (un module qui scale différemment) — pas par principe.",
          "Commencer monolithe modulaire : les frontières de modules deviennent les frontières de services le jour où le besoin est réel.",
          "Le distribué est un coût : chaque appel réseau est une panne possible, chaque service un déploiement à coordonner.",
          "Transactions : sans base partagée, la cohérence entre services passe par les sagas — une complexité à ne pas sous-estimer.",
        ],
      },
    ],
  },
  {
    id: "decoupage-services",
    title: "Découper en services",
    level: 3,
    intro:
      "Quand le découpage est justifié : comment tracer les frontières.",
    blocks: [
      {
        kind: "list",
        items: [
          "Par domaine métier (bounded contexts) : Commandes, Paiements, Catalogue — les frontières suivent le langage métier, pas la technique.",
          "Un service = une responsabilité, ses données, son équipe : s'il faut deux équipes pour modifier un service, la frontière est mal placée.",
          "Données privées : chaque service possède sa base ; aucun accès direct à la base d'un autre — sinon c'est un monolithe distribué.",
          "Communication par contrats versionnés (API, événements) : le contrat est la vraie frontière, pas le déploiement.",
          "Taille : assez gros pour être utile seul, assez petit pour être compris par une équipe — entre les deux, c'est du jugement.",
        ],
      },
    ],
  },
  {
    id: "saga",
    title: "Sagas : transactions distribuées",
    level: 3,
    intro:
      "Garantir la cohérence d'une opération qui traverse plusieurs services sans transaction globale.",
    blocks: [
      {
        kind: "text",
        text: "Une saga découpe une transaction distribuée en étapes locales, chacune avec une action compensatoire : réserver le vol, puis l'hôtel ; si l'hôtel échoue, annuler la réservation du vol. Deux styles : chorégraphie (chaque service publie son résultat, le suivant réagit — simple, flux implicite) et orchestration (un coordinateur pilote les étapes — explicite, point central).",
      },
      {
        kind: "text",
        text: "L'état intermédiaire est visible : entre « vol réservé » et « hôtel confirmé », le système est dans un état partiel — l'UX et les lectures doivent le supporter. Les sagas ne remplacent pas les transactions ACID quand la cohérence forte est exigée ; elles gèrent l'inévitable quand l'opération est intrinsèquement distribuée.",
      },
    ],
  },
  {
    id: "stockage-fichiers",
    title: "Stockage des fichiers",
    level: 3,
    intro:
      "Images, vidéos, documents : pourquoi ils ne vivent pas dans la base de données.",
    blocks: [
      {
        kind: "text",
        text: "Les fichiers vont dans un object storage (S3 et compatibles) : la base ne stocke que l'URL et les métadonnées. Raisons : taille (une base gonflée de blobs devient inopérable en sauvegarde), accès (URLs signées pour un accès direct et temporaire sans passer par l'API), et CDN (les fichiers statiques sont le cas d'usage roi du CDN).",
      },
      {
        kind: "list",
        items: [
          "Upload direct : le client uploade vers le storage via URL signée — l'API ne fait pas transiter les octets.",
          "Métadonnées en base : nom, taille, type, propriétaire — pour requêter sans lister le storage.",
          "Cycle de vie : règles d'expiration automatique (fichiers temporaires, anciennes sauvegardes).",
          "Traitement asynchrone : thumbnails, transcodage via file de messages après l'upload.",
        ],
      },
    ],
  },
  {
    id: "recherche-donnees",
    title: "Recherche et indexation",
    level: 3,
    intro:
      "Quand la recherche plein texte dépasse ce que la base relationnelle fait bien.",
    blocks: [
      {
        kind: "text",
        text: "Un `LIKE '%mot%'` sur des millions de lignes est une impasse : la recherche plein texte (tolérance aux fautes, pertinence, facettes) relève d'un moteur d'indexation dédié. L'architecture classique : la base reste la source de vérité, un pipeline (souvent via événements) alimente l'index de recherche, qui ne sert que la lecture.",
      },
      {
        kind: "text",
        text: "Le décalage base → index est une cohérence éventuelle assumée : un article publié apparaît dans la recherche quelques secondes plus tard. Le design doit le dire explicitement plutôt que de le découvrir en production.",
      },
    ],
  },
  {
    id: "securite-architecture",
    title: "Sécurité de l'architecture",
    level: 3,
    intro:
      "La sécurité se conçoit au niveau du système, pas au niveau du code seul.",
    blocks: [
      {
        kind: "list",
        items: [
          "Défense en profondeur : plusieurs couches (réseau, gateway, service, données) — la compromission d'une couche ne donne pas tout.",
          "Moindre privilège : chaque service n'accède qu'aux ressources strictement nécessaires, avec des identifiants distincts.",
          "Secrets : jamais dans le code ni les images — gestionnaire de secrets, rotation régulière, audit des accès.",
          "Réseau : segmentation (les bases ne sont joignables que par les services autorisés), TLS partout, même en interne.",
          "Surface d'attaque : chaque composant exposé est une cible — n'exposer que le nécessaire via la gateway.",
          "Journalisation d'audit : qui a accédé à quoi — indispensable pour l'investigation post-incident.",
        ],
      },
    ],
  },
  {
    id: "disponibilite",
    title: "Concevoir la disponibilité",
    level: 3,
    intro:
      "Du « ça tourne » au « ça survit aux pannes » : les leviers, par ordre de rentabilité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Redondance : aucun point unique de panne — 2+ instances de chaque composant critique, sur des zones différentes.",
          "Health checks : chaque composant sait dire s'il va bien ; le routage exclut les instances malades automatiquement.",
          "Dégradation gracieuse : si les recommandations tombent, afficher du contenu générique plutôt qu'une erreur — le système partiellement utile bat le système en panne.",
          "Bascule testée : un plan de reprise jamais exercé est une fiction — les game days valident que la bascule fonctionne vraiment.",
          "Sauvegardes : la disponibilité inclut la récupération — des backups testés en restauration, pas juste en écriture.",
        ],
      },
    ],
  },
  {
    id: "couts-architecture",
    title: "Coûts d'architecture",
    level: 3,
    intro:
      "Chaque composant a un prix : intégrer le coût dans les trade-offs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Calcul : transfert réseau, stockage, calcul — chiffrer l'ordre de grandeur mensuel du design, pas au centime.",
          "Le multi-région double (au moins) la facture : ne le justifier que par une exigence réelle de latence ou de survie.",
          "La donnée coûte en mouvement : répliquer des téraoctets entre régions se paie à chaque octet transféré.",
          "Rétention et logs : l'observabilité d'un gros système est un poste — calibrer rétentions et échantillonnage.",
          "Le coût de l'opération : un composant « gratuit » qu'il faut opérer (cluster auto-hébergé) coûte en temps d'équipe.",
        ],
      },
    ],
  },
  {
    id: "adr",
    title: "Architecture Decision Records",
    level: 3,
    intro:
      "La mémoire écrite des arbitrages : le livrable le plus sous-estimé du design.",
    blocks: [
      {
        kind: "fields",
        title: "Anatomie d'une ADR (exemple : choix de la base pour les commandes)",
        fields: [
          {
            label: "Contexte",
            value:
              "Le service Commandes doit garantir qu'une commande n'est jamais facturée deux fois, avec 400 écritures/s en pointe.",
          },
          {
            label: "Options envisagées",
            value:
              "PostgreSQL : transactions ACID, équipe déjà compétente. Base documentaire : écritures plus rapides, mais cohérence éventuelle inadaptée aux paiements.",
          },
          {
            label: "Décision",
            value:
              "PostgreSQL avec réplication leader-follower pour les lectures.",
          },
          {
            label: "Conséquences",
            value:
              "+ Cohérence forte sur les écritures critiques. + Compétence existante. − Scaling d'écriture limité : réévaluer si > 2000 écritures/s. − Monitoring du lag de réplication nécessaire.",
          },
        ],
      },
      {
        kind: "text",
        text: "Une ADR tient en une page et répond à : quel était le contexte, quelles options, pourquoi ce choix, à quel prix. Relire les ADR six mois plus tard évite de rouvrir les mêmes débats — et explique aux nouveaux pourquoi le système est ainsi.",
      },
    ],
  },
  {
    id: "revue-architecture",
    title: "Revues d'architecture",
    level: 3,
    intro:
      "Faire relire un design avant de construire : le rituel qui évite les erreurs chères.",
    blocks: [
      {
        kind: "list",
        items: [
          "Quand : avant tout chantier structurant (nouveau service, migration de données, changement de topologie).",
          "Qui : des pairs qui n'ont pas conçu le système — le regard neuf voit les angles morts.",
          "Support : schéma + volumes + ADR en une page — pas de présentation de 40 slides.",
          "Questions types : où est le point unique de panne ? Que se passe-t-il si ce composant tombe ? Les volumes tiennent-ils dans 2 ans ? Où sont les secrets ?",
          "Issue : décisions écrites (ADR), pas un consensus oral oublié la semaine suivante.",
        ],
      },
    ],
  },
  {
    id: "etude-cas-fil-actualite",
    title: "Étude de cas : fil d'actualité",
    level: 3,
    intro:
      "Le cas avancé : concevoir un fil type réseau social, avec ses vrais trade-offs.",
    blocks: [
      {
        kind: "text",
        text: "Besoins : publier des posts, afficher à chaque utilisateur un fil des comptes suivis, à grande échelle. Volumes : des millions d'utilisateurs, des lectures 100× supérieures aux écritures. Le choix central est le fan-out : push (à la publication, écrire le post dans le fil de chaque abonné — lecture ultra-rapide, écriture coûteuse pour les stars) ou pull (à la lecture, agréger les posts des suivis — écriture simple, lecture coûteuse).",
      },
      {
        kind: "text",
        text: "L'arbitrage réel des grands systèmes : hybride — push pour les utilisateurs normaux, pull pour les comptes à millions d'abonnés (dont le push coûterait trop cher). La fraîcheur du fil est une cohérence éventuelle assumée et documentée. Le stockage : posts en base, fils matérialisés en cache/clé-valeur, avec TTL.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques du system design, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Choisir la techno avant le problème",
            value:
              "Problem : microservices et NoSQL « parce que ça scale », pour 1000 utilisateurs. Why : mode et CV. Better : besoins → volumes → composants → technos.",
          },
          {
            label: "Optimisation prématurée",
            value:
              "Problem : sharding et multi-région dès le jour un. Why : anticiper un succès hypothétique. Better : le design simple qui tient les volumes à 2 ans, avec des portes de sortie.",
          },
          {
            label: "Ignorer les pannes",
            value:
              "Problem : schéma où tout fonctionne toujours. Why : on dessine le chemin nominal. Better : pour chaque flèche, que se passe-t-il si la cible tombe ?",
          },
          {
            label: "Le monolithe distribué",
            value:
              "Problem : des « microservices » qui partagent une base et se déploient ensemble. Why : découpage sans frontières de données. Better : données privées par service, contrats versionnés.",
          },
          {
            label: "Cohérence supposée",
            value:
              "Problem : croire que deux répliques voient la même chose au même moment. Why : raisonner comme en local. Better : choisir explicitement un modèle de cohérence par cas.",
          },
          {
            label: "Pas de chiffres",
            value:
              "Problem : un design qui « devrait tenir ». Why : estimation sautée. Better : trois nombres (req/s, stockage, croissance) avant tout schéma.",
          },
          {
            label: "Oublier le coût",
            value:
              "Problem : architecture élégante, facture impossible. Why : le coût n'est pas un critère du design. Better : chiffrer l'ordre de grandeur mensuel.",
          },
          {
            label: "Pas d'ADR",
            value:
              "Problem : six mois plus tard, personne ne sait pourquoi. Why : décisions orales. Better : une page par décision structurante.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes des bons architectes : moins de génie, plus de méthode.",
    blocks: [
      {
        kind: "list",
        items: [
          "Commencer simple : le design minimal qui répond aux besoins mesurés, avec des portes de sortie documentées.",
          "Chiffrer avant de dessiner : trois nombres (trafic, données, croissance) cadrent tous les choix.",
          "Écrire les trade-offs : une décision non documentée sera redébattue — une ADR clôt le débat.",
          "Concevoir pour la panne : chaque composant tombe un jour, le design dit ce qui se passe ce jour-là.",
          "Relire par des pairs : un design non challengé accumule les angles morts.",
          "Rester pragmatique : la meilleure architecture est celle que l'équipe sait opérer.",
        ],
      },
    ],
  },
  {
    id: "glossaire",
    title: "Glossaire",
    level: 3,
    intro:
      "Le vocabulaire du system design, en une page.",
    blocks: [
      {
        kind: "fields",
        title: "Termes essentiels",
        fields: [
          { label: "Scalabilité", value: "Capacité à absorber la croissance (trafic, données) sans refonte." },
          { label: "Disponibilité", value: "Proportion du temps où le système répond — souvent en « nombre de 9 » (99,9 %)." },
          { label: "Latence", value: "Temps de réponse d'une opération ; p99 = le temps subi par les 1 % les plus lents." },
          { label: "Débit", value: "Opérations par seconde que le système traite." },
          { label: "Goulot", value: "Le composant qui limite le système entier — celui à traiter en premier." },
          { label: "Sharding", value: "Découpage des données en fragments répartis sur plusieurs serveurs." },
          { label: "Réplication", value: "Copie des données sur plusieurs nœuds pour disponibilité et proximité." },
          { label: "CAP", value: "Théorème : en cas de partition, choisir entre cohérence et disponibilité." },
          { label: "Cohérence éventuelle", value: "Les répliques convergent avec le temps, sans garantie immédiate." },
          { label: "Idempotence", value: "Une opération répétée a le même effet qu'une seule exécution." },
          { label: "Backpressure", value: "Mécanisme qui ralentit les producteurs quand les consommateurs saturent." },
          { label: "ADR", value: "Architecture Decision Record : une décision structurante écrite avec son contexte." },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par les références établies.",
    blocks: [
      {
        kind: "fields",
        title: "Références (à privilégier)",
        fields: [
          {
            label: "System Design Primer",
            value: "github.com/donnemartin/system-design-primer : le guide open source de référence — concepts, études de cas, exercices.",
          },
          {
            label: "High Scalability",
            value: "highscalability.com : architectures réelles décortiquées (comment tel système tient la charge).",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : refaire les études de cas de cette page (raccourcisseur, fil d'actualité) sans regarder la solution.",
          "Approfondissement : les compétences `messaging`, `caching`, `observability` pour détailler chaque composant.",
          "Lecture : « Designing Data-Intensive Applications » (Kleppmann) — la référence sur les systèmes de données.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le system design maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Détailler : `messaging` — les architectures événementielles en pratique (RabbitMQ, Kafka).",
          "Accélérer : `caching` — stratégies de cache et optimisation des lectures.",
          "Superviser : `observability` — SLO, dashboards et runbooks pour les systèmes conçus.",
          "Construire : `api-rest` puis `docker` — passer du schéma au système déployé.",
          "Revenir à la roadmap : valider `system-design` et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

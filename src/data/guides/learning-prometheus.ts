import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Prometheus : de zéro à une supervision
 * professionnelle (métriques, PromQL, alerting). 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive. Tous les
 * textes supportent le code inline entre backticks. Commandes toujours
 * expliquées : label, commande, pourquoi, vérification.
 */
export const LEARNING_PROMETHEUS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Prometheus et pourquoi c'est devenu le standard de la supervision.",
    blocks: [
      {
        kind: "text",
        text: "Prometheus est un système open source de collecte de métriques et d'alerting. Il récupère périodiquement des métriques exposées par vos applications et votre infrastructure (requêtes par seconde, usage CPU, taux d'erreur…), les stocke dans une base de séries temporelles, et permet de les interroger avec son langage PromQL et de déclencher des alertes.",
      },
      {
        kind: "text",
        text: "Pourquoi Prometheus est devenu le standard : son modèle est simple et robuste (chaque service expose ses métriques en HTTP, Prometheus vient les chercher), son langage de requête est puissant, et son écosystème est immense (exporters pour tout, Grafana pour les dashboards, Alertmanager pour les alertes). C'est le socle de l'observabilité dans l'écosystème cloud-native.",
      },
      {
        kind: "text",
        text: "En pratique : on instrumente son application (compteurs, durées), on configure Prometheus pour la « scraper », on écrit des alertes (« le taux d'erreur dépasse 1 % »), et on visualise dans Grafana.",
      },
    ],
  },
  {
    id: "pull-vs-push",
    title: "Le modèle pull : Prometheus vient chercher",
    level: 1,
    intro:
      "La différence fondamentale avec les systèmes de monitoring classiques.",
    blocks: [
      {
        kind: "diagram",
        title: "Pull (Prometheus) vs Push (classique)",
        lines: [
          "Modèle PULL (Prometheus) :",
          "  Prometheus ──GET /metrics──► App (expose ses métriques)",
          "  Prometheus ──GET /metrics──► Node exporter (machine)",
          "  Avantage : la cible n'a rien à configurer, Prometheus",
          "  découvre et interroge. Une cible en panne = métrique",
          "  `up == 0` : la panne est elle-même une donnée.",
          "",
          "Modèle PUSH (classique) :",
          "  App ──envoie──► Collecteur central",
          "  Inconvénient : chaque app doit connaître le collecteur,",
          "  et une app silencieuse est indétectable.",
        ],
      },
      {
        kind: "text",
        text: "Conséquence : pour être supervisée, une application expose simplement un endpoint HTTP `/metrics` au format texte. Pas d'agent à installer, pas de configuration côté application — juste des métriques à exposer, via une bibliothèque cliente du langage utilisé.",
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
      "Ce qu'il faut connaître avant de superviser avec Prometheus.",
    blocks: [
      {
        kind: "fields",
        title: "Connaissances requises",
        fields: [
          {
            label: "HTTP",
            value:
              "Prometheus scrape des endpoints HTTP : comprendre les requêtes, les statuts et les ports.",
          },
          {
            label: "Terminal et YAML",
            value:
              "La configuration (`prometheus.yml`) est en YAML ; l'installation et la vérification se font en ligne de commande.",
          },
          {
            label: "Notions d'infrastructure",
            value:
              "Savoir ce qu'est un service, un conteneur, un cluster : on supervise des systèmes que l'on comprend (`docker`, `linux`, `kubernetes`).",
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
      "Démarrer Prometheus : binaire officiel ou conteneur Docker.",
    blocks: [
      {
        kind: "command",
        label: "Lancer via Docker",
        command: "docker run -p 9090:9090 -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus",
        why: "L'image officielle `prom/prometheus` démarre un serveur avec votre fichier de configuration monté en volume. Le port 9090 expose l'interface web et l'API. C'est la façon la plus rapide d'avoir un Prometheus fonctionnel en développement.",
        verify: "curl http://localhost:9090/-/healthy",
      },
      {
        kind: "command",
        label: "Lancer le binaire directement",
        command: "prometheus --config.file=prometheus.yml",
        why: "Le binaire officiel (téléchargé depuis la page des releases du projet) se lance avec le fichier de configuration en argument. Même comportement que le conteneur, sans Docker — adapté aux serveurs bare metal.",
        verify: "curl http://localhost:9090/-/healthy",
      },
      {
        kind: "text",
        text: "Dans les deux cas, l'interface web est sur http://localhost:9090 : la console d'expression pour tester des requêtes, la page `/targets` pour voir les cibles scrapées, et la page des alertes.",
      },
    ],
  },
  {
    id: "premier-scrape",
    title: "Votre premier scrape en 10 minutes",
    level: 2,
    intro:
      "Configurer Prometheus pour collecter ses propres métriques, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire la configuration",
            detail:
              "Créer `prometheus.yml` avec un job `prometheus` qui scrape `localhost:9090` : Prometheus s'auto-supervise, c'est l'exemple canonique.",
          },
          {
            title: "Démarrer",
            detail:
              "`docker run` ou le binaire avec `--config.file=prometheus.yml`.",
          },
          {
            title: "Vérifier les targets",
            detail:
              "Ouvrir http://localhost:9090/targets : le job doit apparaître à l'état UP. DOWN = problème de connectivité ou de configuration.",
          },
          {
            title: "Interroger",
            detail:
              "Dans la console (http://localhost:9090), taper `up` : la métrique vaut 1 pour chaque cible joignable.",
          },
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "prometheus.yml minimal",
        code: `global:\n  scrape_interval: 15s\n\nscrape_configs:\n  - job_name: "prometheus"\n    static_configs:\n      - targets: ["localhost:9090"]`,
      },
    ],
  },
  {
    id: "promql-bases",
    title: "PromQL : les bases",
    level: 2,
    intro:
      "Le langage de requête : sélectionner des séries temporelles.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Premières requêtes",
        code: `# Toutes les séries de la métrique up\nup\n\n# Filtrer par labels\nup{job="prometheus"}\nhttp_requests_total{method="GET", status="200"}\n\n# Plage de temps : les 5 dernières minutes\nhttp_requests_total[5m]`,
      },
      {
        kind: "fields",
        title: "Les briques de PromQL",
        fields: [
          {
            label: "Nom de métrique",
            value: "`up`, `http_requests_total` : sélectionne toutes les séries portant ce nom.",
          },
          {
            label: "Sélecteurs de labels",
            value: "`{job=\"api\"}` : filtre les séries. `=` égalité, `!=` différence, `=~` regex, `!~` négation de regex.",
          },
          {
            label: "Sélecteur de plage",
            value: "`[5m]` après un sélecteur : les valeurs des 5 dernières minutes, pour les fonctions de plage (`rate`, `increase`).",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque métrique est en réalité un ensemble de séries temporelles distinguées par leurs labels : `http_requests_total{method=\"GET\"}` et `http_requests_total{method=\"POST\"}` sont deux séries. Les labels sont la dimension d'analyse — d'où l'importance de bien les choisir (voir la section sur la cardinalité).",
      },
    ],
  },
  {
    id: "types-de-metriques",
    title: "Les 4 types de métriques",
    level: 2,
    intro:
      "Choisir le bon type : c'est ce qui rend les requêtes possibles et correctes.",
    blocks: [
      {
        kind: "fields",
        title: "Les types, avec exemples",
        fields: [
          {
            label: "Counter (compteur)",
            value:
              "Ne fait qu'augmenter (remis à zéro au redémarrage) : requêtes servies, erreurs, tâches terminées. On ne lit jamais sa valeur brute : on calcule son taux avec `rate()`.",
          },
          {
            label: "Gauge (jauge)",
            value:
              "Monte et descend : température, connexions actives, taille d'une file. Se lit directement (`node_memory_free_bytes`).",
          },
          {
            label: "Histogram",
            value:
              "Distribution des observations en buckets : durées de requête, tailles de réponse. Permet de calculer des quantiles (`histogram_quantile(0.95, ...)`) côté serveur.",
          },
          {
            label: "Summary",
            value:
              "Quantiles calculés côté client (l'application). Moins flexible que l'histogram (quantiles figés, pas d'agrégation entre instances) : l'histogram est généralement préféré.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle : ce qui compte des événements → counter ; ce qui mesure un état → gauge ; ce qui mesure des durées/tailles avec besoin de percentiles → histogram.",
      },
    ],
  },
  {
    id: "config-scrape",
    title: "Anatomie de `prometheus.yml`",
    level: 2,
    intro:
      "Le fichier de configuration : ce que chaque section contrôle.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Configuration commentée",
        code: `global:\n  scrape_interval: 15s   # fréquence de collecte\n  scrape_timeout: 10s    # timeout par scrape (<= interval)\n\nscrape_configs:\n  - job_name: "api"\n    scrape_interval: 10s          # surcharge locale possible\n    static_configs:\n      - targets: ["api1:8080", "api2:8080"]\n        labels:\n          env: "prod"             # labels ajoutés à chaque série\n\n  - job_name: "node"\n    static_configs:\n      - targets: ["localhost:9100"]`,
      },
      {
        kind: "fields",
        title: "Les sections",
        fields: [
          {
            label: "`global`",
            value: "Valeurs par défaut : intervalle de scrape, timeout, labels externes (identifiant du site, du cluster).",
          },
          {
            label: "`scrape_configs`",
            value: "La liste des jobs : chacun définit quelles cibles scraper, à quelle fréquence, avec quels labels.",
          },
          {
            label: "`job_name`",
            value: "Le nom logique du groupe de cibles : devient le label `job` sur toutes les séries — la dimension de regroupement principale.",
          },
          {
            label: "`static_configs`",
            value: "Liste explicite de cibles. Pour les environnements dynamiques, les service discoveries remplacent cette liste (voir section dédiée).",
          },
        ],
      },
    ],
  },
  {
    id: "requetes-simples",
    title: "Requêtes utiles au quotidien",
    level: 2,
    intro:
      "Les requêtes que l'on tape vraiment : disponibilité, taux, saturation.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Le kit de survie PromQL",
        code: `# Cibles joignables\nup == 1\n\n# Requêtes par seconde (taux sur 5 min)\nrate(http_requests_total[5m])\n\n# Taux d'erreur\nsum by (job) (rate(http_requests_total{status=~"5.."}[5m]))\n/\nsum by (job) (rate(http_requests_total[5m]))\n\n# Mémoire libre d'une machine\nnode_memory_MemFree_bytes\n\n# p95 des durées de requête\n histogram_quantile(0.95,\n  sum by (le) (rate(http_request_duration_seconds_bucket[5m])))`,
      },
      {
        kind: "text",
        text: "Ces quatre patterns (disponibilité, débit, erreurs, latence) sont les « quatre signaux d'or » de la supervision : ils répondent à « ça marche ? », « ça sert ? », « ça échoue ? », « c'est lent ? ».",
      },
    ],
  },
  {
    id: "alertes-bases",
    title: "Premières alertes",
    level: 2,
    intro:
      "Définir une règle d'alerte : quand Prometheus doit prévenir.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "rules.yml — deux alertes essentielles",
        code: `groups:\n  - name: exemple\n    rules:\n      - alert: InstanceDown\n        expr: up == 0\n        for: 5m\n        labels:\n          severity: critical\n        annotations:\n          summary: "Instance {{ $labels.instance }} injoignable"\n\n      - alert: TauxErreurEleve\n        expr: |\n          sum by (job) (rate(http_requests_total{status=~"5.."}[5m]))\n          / sum by (job) (rate(http_requests_total[5m])) > 0.05\n        for: 10m\n        labels:\n          severity: warning\n        annotations:\n          summary: "Taux d'erreur > 5% sur {{ $labels.job }}"`,
      },
      {
        kind: "text",
        text: "`expr` est la condition (PromQL), `for` exige qu'elle dure avant de déclencher (évite les alertes sur un pic d'une seconde), `labels` classe l'alerte (sévérité), `annotations` la décrivent (résumé, runbook). Les règles vivent dans des fichiers référencés par `rule_files` dans `prometheus.yml`.",
      },
    ],
  },
  {
    id: "promtool-check",
    title: "`promtool` : valider avant de déployer",
    level: 3,
    intro:
      "L'utilitaire officiel : ne jamais recharger une config non vérifiée.",
    blocks: [
      {
        kind: "command",
        label: "Valider la configuration",
        command: "promtool check config prometheus.yml",
        why: "Vérifie la syntaxe et la cohérence du fichier de configuration avant de le déployer. Une config invalide empêche Prometheus de démarrer : cette commande évite la panne bête.",
      },
      {
        kind: "command",
        label: "Valider les règles",
        command: "promtool check rules rules.yml",
        why: "Vérifie la syntaxe des règles d'alerte et d'enregistrement, y compris la validité des expressions PromQL. À lancer systématiquement après toute modification.",
      },
      {
        kind: "command",
        label: "Tester une requête depuis le terminal",
        command: "promtool query instant http://localhost:9090 'up'",
        why: "Exécute une requête PromQL instantanée sans passer par l'interface web : pratique pour scripter des vérifications ou déboguer depuis un serveur sans navigateur.",
      },
      {
        kind: "text",
        text: "`promtool` est fourni avec Prometheus (même archive que le binaire). Les autres sous-commandes utiles : `query range` (plage temporelle), `query series` (découverte de séries), `test rules` (tests unitaires de règles).",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "La boucle de travail typique avec Prometheus.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de supervision",
        lines: [
          "Instrumenter (exposer des métriques dans l'app)",
          "     │",
          "     ▼",
          "Configurer (job dans prometheus.yml, promtool check)",
          "     │",
          "     ▼",
          "Explorer (console : écrire et affiner la requête)",
          "     │",
          "     ▼",
          "Alerter (règle + promtool check rules, rechargement)",
          "     │",
          "     ▼",
          "Visualiser (dashboard Grafana sur les mêmes requêtes)",
        ],
      },
    ],
  },
  {
    id: "erreurs-debutants",
    title: "Erreurs classiques des débutants",
    level: 2,
    intro:
      "Les pièges les plus fréquents quand on débute avec Prometheus.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["Lire un counter brut", "Graphique en escalier qui ne veut rien dire", "Toujours `rate()` ou `increase()` sur les counters"],
          ["Oublier `for` dans les alertes", "Alertes qui s'activent sur un pic d'une seconde", "Ajouter `for: 5m` (ou plus) à chaque alerte"],
          ["Labels à cardinalité infinie", "Prometheus ralentit, disque plein", "Jamais d'user ID, d'UUID ou de timestamp en label"],
          ["Recharger sans vérifier", "Prometheus ne redémarre plus", "`promtool check config` avant chaque déploiement"],
          ["Scraper en `localhost` dans Docker", "Target DOWN", "Utiliser le nom du service/hôte réel, pas localhost du conteneur"],
          ["Alerter sur des symptômes vagues", "Bruit d'alertes, fatigue", "Alerter sur des signaux actionnables avec un runbook"],
        ],
      },
    ],
  },
  {
    id: "editeurs-outils",
    title: "Écosystème et outils",
    level: 2,
    intro:
      "Prometheus ne vit pas seul : les outils qui l'entourent.",
    blocks: [
      {
        kind: "fields",
        title: "L'écosystème",
        fields: [
          {
            label: "Interface web Prometheus",
            value: "Console d'expression, page `/targets`, page des alertes : suffisante pour explorer et déboguer.",
          },
          {
            label: "Grafana",
            value: "Les dashboards : les mêmes requêtes PromQL, visualisées en graphiques partageables. La compétence `grafana` de la roadmap couvre cet outil.",
          },
          {
            label: "Alertmanager",
            value: "Reçoit les alertes de Prometheus : déduplication, regroupement, routage vers email/Slack/PagerDuty. Voir la section dédiée.",
          },
          {
            label: "Exporters",
            value: "Des programmes qui exposent les métriques d'un système tiers (machines avec node_exporter, bases de données, etc.).",
          },
          {
            label: "`promtool`",
            value: "Validation des configs et règles, requêtes en CLI, tests unitaires de règles.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-interne",
    title: "Architecture : scrape, TSDB, moteur",
    level: 3,
    intro:
      "Comment les données circulent dans Prometheus.",
    blocks: [
      {
        kind: "diagram",
        title: "Le pipeline de données",
        lines: [
          "Cibles (apps, exporters)",
          "   │  GET /metrics périodique (pull)",
          "   ▼",
          "Scrape (récupération + parsing du format d'exposition)",
          "   │",
          "   ▼",
          "TSDB (base de séries temporelles : stockage par blocs)",
          "   │",
          "   ├──► Moteur PromQL (requêtes instantanées et de plage)",
          "   ├──► Évaluation des règles (recording + alerting)",
          "   └──► API HTTP (/api/v1/query...) et interface web",
          "",
          "Alertes ──► Alertmanager (routage, notifications)",
        ],
      },
      {
        kind: "text",
        text: "Points clés : le scrape est périodique (pas du temps réel à la milliseconde) ; la TSDB est locale au serveur (la haute disponibilité et le long terme passent par la fédération ou le remote storage) ; l'évaluation des règles produit de nouvelles séries (recording) ou des alertes.",
      },
    ],
  },
  {
    id: "exposition-format",
    title: "Le format d'exposition",
    level: 3,
    intro:
      "Ce que Prometheus lit sur `/metrics` : un format texte simple.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Exemple de /metrics",
        code: `# HELP http_requests_total Nombre total de requêtes HTTP.\n# TYPE http_requests_total counter\nhttp_requests_total{method="GET",status="200"} 10234\nhttp_requests_total{method="POST",status="201"} 512\n\n# HELP temperature_celsius Température actuelle.\n# TYPE temperature_celsius gauge\ntemperature_celsius{capteur="salle-1"} 21.5`,
      },
      {
        kind: "text",
        text: "Chaque métrique : des lignes de commentaire (`HELP` = description, `TYPE` = type), puis une ligne par série avec ses labels et sa valeur. Les bibliothèques clientes (officielles pour les langages courants) génèrent ce format automatiquement : on déclare des compteurs et des jauges dans le code, la bibliothèque expose `/metrics`.",
      },
      {
        kind: "command",
        label: "Vérifier le format d'un endpoint",
        command: "curl -s http://localhost:9100/metrics | promtool check metrics",
        why: "Valide que l'exposition respecte le format : nommage, types, labels. Utile quand on instrumente une application maison et que les métriques n'apparaissent pas comme prévu.",
      },
    ],
  },
  {
    id: "counter-detail",
    title: "Counter en détail",
    level: 3,
    intro:
      "Le type le plus utilisé — et le plus mal lu.",
    blocks: [
      {
        kind: "text",
        text: "Un counter ne fait qu'augmenter ; il est remis à zéro au redémarrage du processus. Sa valeur brute n'a aucun sens (10234 requêtes depuis un démarrage arbitraire) : ce qui compte, c'est sa vitesse de variation. D'où `rate()` (par seconde, lissé) et `increase()` (variation absolue sur la période).",
      },
      {
        kind: "code",
        language: "text",
        title: "Lire un counter correctement",
        code: `# Requêtes par seconde sur 5 minutes\nrate(http_requests_total[5m])\n\n# Nombre de requêtes dans la dernière heure\nincrease(http_requests_total[1h])\n\n# Taux d'erreur 5xx\nsum(rate(http_requests_total{status=~"5.."}[5m]))\n/\nsum(rate(http_requests_total[5m]))`,
      },
      {
        kind: "text",
        text: "`rate()` gère automatiquement les remises à zéro (redémarrages) : il ne produit pas de pic négatif aberrant. La fenêtre (`[5m]`) lisse : trop courte = bruité, trop longue = les pics sont masqués. 5 minutes est un bon défaut.",
      },
    ],
  },
  {
    id: "gauge-detail",
    title: "Gauge en détail",
    level: 3,
    intro:
      "Le type des états instantanés.",
    blocks: [
      {
        kind: "text",
        text: "Une gauge monte et descend : usage mémoire, connexions actives, température, taille d'une file d'attente. Elle se lit directement — pas besoin de `rate()`. Les fonctions utiles : `avg_over_time`, `max_over_time`, `min_over_time` pour lisser ou borner sur une période.",
      },
      {
        kind: "code",
        language: "text",
        title: "Requêtes sur gauges",
        code: `# Mémoire utilisée (sur une machine)\nnode_memory_MemTotal_bytes - node_memory_MemFree_bytes\n\n# Pourcentage d'utilisation disque\n100 * (1 - node_filesystem_avail_bytes / node_filesystem_size_bytes)\n\n# Pic de connexions sur 1h\nmax_over_time(connexions_actives[1h])`,
      },
      {
        kind: "text",
        text: "Piège : une gauge qui ne bouge plus n'est pas forcément saine — une file d'attente bloquée à une valeur constante est un symptôme. Alerter aussi sur l'absence de changement quand c'est pertinent (`changes()`).",
      },
    ],
  },
  {
    id: "histogram-detail",
    title: "Histogram en détail",
    level: 3,
    intro:
      "Mesurer des distributions : le type des latences.",
    blocks: [
      {
        kind: "text",
        text: "Un histogram compte les observations dans des buckets (tranches) : `_bucket{le=\"0.1\"}` = nombre de requêtes sous 0.1 s, `_sum` = somme des valeurs, `_count` = nombre total. Les buckets sont cumulatifs : chaque bucket contient aussi les observations des buckets inférieurs.",
      },
      {
        kind: "code",
        language: "text",
        title: "Quantiles depuis un histogram",
        code: `# p95 des durées de requête sur 5 min\n histogram_quantile(0.95,\n  sum by (le) (rate(http_request_duration_seconds_bucket[5m])))\n\n# Durée moyenne\nsum(rate(http_request_duration_seconds_sum[5m]))\n/\nsum(rate(http_request_duration_seconds_count[5m]))`,
      },
      {
        kind: "list",
        items: [
          "Choisir les buckets selon l'ordre de grandeur attendu (0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10 : les défauts couvrent bien les latences web).",
          "Les quantiles sont calculés côté Prometheus : on peut agréger entre instances (`sum by (le)`), contrairement aux summaries.",
          "La moyenne seule est trompeuse : toujours accompagner d'un p95/p99 pour voir la queue de distribution.",
        ],
      },
    ],
  },
  {
    id: "summary-detail",
    title: "Summary : le cas particulier",
    level: 3,
    intro:
      "Quand l'utiliser — et pourquoi l'histogram est généralement préféré.",
    blocks: [
      {
        kind: "text",
        text: "Un summary calcule les quantiles côté client (dans l'application) pour des quantiles configurés à l'avance (ex. 0.5, 0.9, 0.99). Simple à lire (`http_latency{quantile=\"0.99\"}`), mais rigide : impossible de calculer un autre quantile après coup, et impossible d'agréger correctement entre plusieurs instances (la moyenne de p99 n'est pas le p99 global).",
      },
      {
        kind: "text",
        text: "Recommandation : préférer l'histogram dans les nouveaux instrumentations. Le summary reste pertinent quand le client ne peut pas exposer de buckets (contrainte de la bibliothèque) ou pour un usage mono-instance simple.",
      },
    ],
  },
  {
    id: "promql-selecteurs",
    title: "PromQL : sélecteurs avancés",
    level: 3,
    intro:
      "Maîtriser la sélection : matchers, regex, plages, offsets.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Sélecteurs",
        code: `# Égalité / inégalité\nhttp_requests_total{job="api", status!="200"}\n\n# Regex : toutes les 5xx\nhttp_requests_total{status=~"5.."}\n\n# Négation de regex : tout sauf les health checks\nhttp_requests_total{path!~"/health.*"}\n\n# Plage : valeurs des 30 dernières minutes\nhttp_requests_total[30m]\n\n# Offset : la valeur d'il y a 1 semaine (comparaisons)\nhttp_requests_total offset 1w`,
      },
      {
        kind: "text",
        text: "L'`offset` est précieux pour les comparaisons temporelles : `rate(http_requests_total[5m]) / rate(http_requests_total[5m] offset 1w)` montre l'évolution du trafic à semaine constante. Les regex sur les labels sont puissantes mais coûteuses : les réserver aux explorations, pas aux alertes critiques.",
      },
    ],
  },
  {
    id: "promql-operateurs",
    title: "PromQL : opérateurs",
    level: 3,
    intro:
      "Combiner les séries : arithmétique, comparaison, logique.",
    blocks: [
      {
        kind: "fields",
        title: "Les opérateurs",
        fields: [
          {
            label: "Arithmétiques (`+ - * / % ^`)",
            value:
              "S'appliquent élément par élément entre séries aux labels identiques : `node_memory_MemTotal_bytes - node_memory_MemFree_bytes`.",
          },
          {
            label: "Comparaison (`== != > < >= <=`)",
            value:
              "Filtrent par défaut (ne gardent que les séries vraies). Avec `bool`, retournent 0/1 au lieu de filtrer : `up == bool 0` pour compter les cibles en panne.",
          },
          {
            label: "`and`, `or`, `unless`",
            value:
              "Opérations ensemblistes sur les séries : `up == 0 and on (instance) up{job=\"api\"}`.",
          },
          {
            label: "Modificateurs `on` / `ignoring`",
            value:
              "Contrôlent quels labels doivent correspondre pour apparier les séries : indispensable quand les deux côtés n'ont pas exactement les mêmes labels.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le piège classique : diviser deux `sum by` avec des dimensions différentes produit un appariement vide. Toujours vérifier que les labels d'agrégation correspondent des deux côtés de l'opérateur.",
      },
    ],
  },
  {
    id: "rate-vs-irate",
    title: "`rate()` vs `irate()`",
    level: 3,
    intro:
      "Deux façons de mesurer la vitesse, deux usages.",
    blocks: [
      {
        kind: "table",
        headers: ["", "`rate()`", "`irate()`"],
        rows: [
          ["Calcul", "Moyenne sur toute la fenêtre", "Pente entre les 2 derniers points"],
          ["Comportement", "Lisse, stable", "Réactif, bruité"],
          ["Usage", "Alertes, dashboards, SLO", "Débogage ponctuel, pics instantanés"],
          ["Exemple", "`rate(http_requests_total[5m])`", "`irate(http_requests_total[5m])`"],
        ],
      },
      {
        kind: "text",
        text: "Règle : `rate()` pour tout ce qui est durable (alertes, graphiques, enregistrements), `irate()` uniquement pour observer un pic en direct pendant un débogage. Une alerte basée sur `irate()` se déclenche et s'éteint au moindre soubresaut.",
      },
    ],
  },
  {
    id: "agregation",
    title: "Agrégation : `sum by`, `topk`…",
    level: 3,
    intro:
      "Réduire des centaines de séries en chiffres exploitables.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Agrégations courantes",
        code: `# Trafic total par job\nsum by (job) (rate(http_requests_total[5m]))\n\n# Sans une dimension : tout sauf instance\nsum without (instance) (rate(http_requests_total[5m]))\n\n# Top 5 des endpoints les plus lents (p95)\ntopk(5,\n  histogram_quantile(0.95,\n    sum by (le, path) (rate(http_request_duration_seconds_bucket[5m]))))\n\n# Nombre d'instances par job\ncount by (job) (up)`,
      },
      {
        kind: "text",
        text: "`by` conserve les labels listés, `without` retire ceux listés : deux façons d'exprimer la même agrégation. `topk`/`bottomk` sont précieux pour identifier les pires cas (endpoints lents, instances chargées) sans noyer le dashboard.",
      },
    ],
  },
  {
    id: "fonctions-cles",
    title: "Fonctions PromQL clés",
    level: 3,
    intro:
      "Le vocabulaire des requêtes avancées.",
    blocks: [
      {
        kind: "table",
        headers: ["Fonction", "Rôle", "Exemple"],
        rows: [
          ["`rate` / `irate`", "Vitesse d'un counter", "`rate(errors_total[5m])`"],
          ["`increase` / `delta`", "Variation absolue sur la période", "`increase(errors_total[1h])`"],
          ["`avg_over_time`, `max_over_time`…", "Agrégation temporelle d'une gauge", "`max_over_time(cpu[1h])`"],
          ["`histogram_quantile`", "Quantile depuis un histogram", "`histogram_quantile(0.99, ...)`"],
          ["`changes` / `resets`", "Nombre de changements / remises à zéro", "`changes(deploys[1h])`"],
          ["`predict_linear`", "Extrapolation linéaire", "`predict_linear(disk_free[1h], 86400) < 0` (disque plein dans 24h)"],
          ["`absent`", "Vaut 1 si aucune série", "`absent(up{job=\"api\"})` (job sans cible)"],
          ["`time()`", "Timestamp actuel", "Pour calculer des âges : `time() - process_start_time_seconds`"],
        ],
      },
    ],
  },
  {
    id: "recording-rules",
    title: "Recording rules : pré-calculer",
    level: 3,
    intro:
      "Quand une requête est trop coûteuse pour être calculée à chaque affichage.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Règle d'enregistrement",
        code: `groups:\n  - name: latences\n    interval: 1m\n    rules:\n      - record: job:http_request_duration_p95:5m\n        expr: |\n          histogram_quantile(0.95,\n            sum by (le, job) (rate(http_request_duration_seconds_bucket[5m])))`,
      },
      {
        kind: "text",
        text: "La règle évalue l'expression périodiquement et stocke le résultat comme une nouvelle métrique (`job:http_request_duration_p95:5m`). Les dashboards et alertes utilisent cette série pré-calculée : affichage instantané, charge réduite. Convention de nommage `niveau:metrique:fenêtre` pour s'y retrouver.",
      },
      {
        kind: "list",
        items: [
          "À utiliser pour les requêtes coûteuses affichées souvent (dashboards principaux, alertes fréquentes).",
          "Ne pas pré-calculer ce qui est rarement consulté : chaque règle consomme du stockage.",
          "L'`interval` peut être allongé pour les métriques lentes à changer.",
        ],
      },
    ],
  },
  {
    id: "alerting-rules-detail",
    title: "Règles d'alerte en détail",
    level: 3,
    intro:
      "Écrire des alertes qui préviennent au bon moment, ni trop tôt ni trop tard.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Anatomie complète d'une alerte",
        code: `- alert: DisqueBientotPlein\n  expr: |\n    100 * (1 - node_filesystem_avail_bytes{fstype!~"tmpfs"}\n      / node_filesystem_size_bytes) > 85\n  for: 30m\n  labels:\n    severity: warning\n  annotations:\n    summary: "Disque à {{ $value | printf \"%.1f\" }}% sur {{ $labels.instance }}"\n    description: "Le disque {{ $labels.mountpoint }} dépasse 85% depuis 30 min."\n    runbook: "https://wiki.interne/runbooks/disque-plein"`,
      },
      {
        kind: "fields",
        title: "Chaque champ",
        fields: [
          {
            label: "`expr`",
            value:
              "La condition PromQL. Doit être robuste au bruit : préférer des taux lissés aux valeurs instantanées.",
          },
          {
            label: "`for`",
            value:
              "Durée minimale avant déclenchement. Courte (5m) pour les pannes franches, longue (30m+) pour les seuils progressifs.",
          },
          {
            label: "`labels.severity`",
            value:
              "La gravité pilote le routage : `critical` → astreinte immédiate, `warning` → ticket, `info` → dashboard.",
          },
          {
            label: "`annotations`",
            value:
              "Le contexte pour l'humain réveillé à 3h : résumé, description, lien vers le runbook. Une alerte sans runbook est une alerte à moitié finie.",
          },
        ],
      },
    ],
  },
  {
    id: "alertmanager",
    title: "Alertmanager : router les alertes",
    level: 3,
    intro:
      "Prometheus détecte, Alertmanager décide qui prévenir et comment.",
    blocks: [
      {
        kind: "text",
        text: "Prometheus envoie les alertes actives à Alertmanager, qui les déduplique (une seule notification pour 50 instances en panne), les regroupe (un seul message par service), les route (selon sévérité et labels) et les notifie (email, Slack, PagerDuty, webhook). Sans Alertmanager, chaque alerte est un événement brut sans gestion.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "alertmanager.yml — routage de base",
        code: `route:\n  group_by: ["alertname", "job"]\n  group_wait: 30s       # attendre les alertes liées avant de notifier\n  group_interval: 5m    # intervalle entre notifications du même groupe\n  repeat_interval: 4h   # répéter si toujours actif\n  receiver: "equipe-defaut"\n  routes:\n    - match:\n        severity: critical\n      receiver: "astreinte"\n\nreceivers:\n  - name: "equipe-defaut"\n  - name: "astreinte"`,
      },
    ],
  },
  {
    id: "inhibition-silences",
    title: "Inhibition et silences",
    level: 3,
    intro:
      "Réduire le bruit : ne pas alerter deux fois pour la même cause.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux mécanismes",
        fields: [
          {
            label: "Inhibition",
            value:
              "Si « DatacenterDown » est active, inutile d'alerter sur chaque instance du datacenter : l'inhibition supprime automatiquement les alertes filles quand l'alerte parente est active. Se configure dans Alertmanager avec des matchers.",
          },
          {
            label: "Silences",
            value:
              "Muet temporaire et explicite : pendant une maintenance planifiée, on crée un silence (via l'interface Alertmanager) sur les alertes concernées, avec une durée et un commentaire. Pas de modification de config, traçabilité complète.",
          },
        ],
      },
      {
        kind: "text",
        text: "Objectif : chaque notification doit mériter l'attention. Une équipe qui reçoit 50 alertes par jour n'en lit plus aucune — c'est la « fatigue d'alerte », et c'est un problème de configuration, pas de vigilance.",
      },
    ],
  },
  {
    id: "service-discovery",
    title: "Service discovery",
    level: 3,
    intro:
      "Ne plus lister les cibles à la main : les découvrir automatiquement.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Découverte par fichier et Kubernetes",
        code: `scrape_configs:\n  - job_name: "services"\n    file_sd_configs:\n      - files: ["cibles/*.json"]   # rechargé automatiquement\n        refresh_interval: 30s\n\n  - job_name: "kubernetes-pods"\n    kubernetes_sd_configs:\n      - role: pod                  # découvre les pods du cluster\n    relabel_configs:\n      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]\n        action: keep\n        regex: "true"`,
      },
      {
        kind: "fields",
        title: "Les mécanismes courants",
        fields: [
          {
            label: "`static_configs`",
            value: "Liste manuelle : pour les infrastructures fixes et petites.",
          },
          {
            label: "`file_sd_configs`",
            value: "Fichiers JSON/YAML générés par un autre outil (CMDB, Terraform) : le pont entre l'inventaire et Prometheus.",
          },
          {
            label: "`kubernetes_sd_configs`",
            value: "Découverte native des pods/services/endpoints du cluster : les cibles suivent les déploiements automatiquement.",
          },
          {
            label: "Autres",
            value: "Consul, EC2, Azure, GCE… : chaque plateforme cloud a sa découverte dédiée.",
          },
        ],
      },
    ],
  },
  {
    id: "relabeling",
    title: "Relabeling : réécrire les labels",
    level: 3,
    intro:
      "Le couteau suisse de la configuration : transformer les labels avant ingestion.",
    blocks: [
      {
        kind: "text",
        text: "Le relabeling s'applique à chaque cible découverte, avant le scrape : on peut renommer des labels, en créer depuis les métadonnées de découverte (`__meta_*`), ou filtrer des cibles (`keep`/`drop`). C'est ce qui permet d'exploiter les annotations Kubernetes comme labels Prometheus.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Exemples de relabeling",
        code: `relabel_configs:\n  # Ne scraper que les pods annotés\n  - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]\n    regex: "true"\n    action: keep\n\n  # Extraire le port de l'annotation vers __address__\n  - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]\n    regex: "([^:]+)(?::\\d+)?;(\\d+)"\n    replacement: "$1:$2"\n    target_label: __address__`,
      },
      {
        kind: "text",
        text: "Les labels `__meta_*` sont temporaires (métadonnées de découverte) et ne sont pas stockés ; seuls les labels finaux le sont. Le relabeling est aussi l'endroit où l'on supprime les labels à haute cardinalité avant ingestion.",
      },
    ],
  },
  {
    id: "exporters",
    title: "Exporters : superviser sans instrumenter",
    level: 3,
    intro:
      "Quand on ne peut pas modifier le système : un exporter l'habille.",
    blocks: [
      {
        kind: "fields",
        title: "Les exporters de référence",
        fields: [
          {
            label: "node_exporter",
            value:
              "L'exporter officiel des machines Linux : CPU, mémoire, disque, réseau, système de fichiers. À déployer sur chaque machine supervisée (`:9100/metrics`).",
          },
          {
            label: "Exporters de bases de données",
            value:
              "Il existe des exporters communautaires pour PostgreSQL, MySQL, Redis, etc. : ils interrogent la base et exposent ses métriques internes.",
          },
          {
            label: "blackbox_exporter",
            value:
              "Sonde l'extérieur : ping, HTTP, TLS, DNS vers des endpoints. Pour la surveillance « boîte noire » (le service répond-il ?) en complément de l'instrumentation interne.",
          },
          {
            label: "Instrumentation directe",
            value:
              "Pour son propre code, préférer les bibliothèques clientes officielles : plus précis et moins coûteux qu'un exporter générique.",
          },
        ],
      },
    ],
  },
  {
    id: "pushgateway",
    title: "Pushgateway : l'exception au pull",
    level: 3,
    intro:
      "Pour les jobs courts que Prometheus ne peut pas scraper à temps.",
    blocks: [
      {
        kind: "text",
        text: "Un job batch qui dure 30 secondes ne sera probablement jamais scrapé (Prometheus passe toutes les 15 s, peut-être à côté). Solution : le job pousse ses métriques vers la Pushgateway, que Prometheus scrape ensuite comme une cible normale. Cas typique : jobs cron, pipelines CI, traitements batch.",
      },
      {
        kind: "list",
        items: [
          "À réserver aux jobs éphémères : pour les services longue durée, l'exposition directe reste la norme.",
          "La Pushgateway conserve la dernière valeur poussée : une métrique obsolète ressemble à une métrique actuelle — d'où l'importance du timestamp et du nettoyage.",
          "Ne jamais l'utiliser pour contourner un problème de découverte : c'est un pis-aller ciblé, pas une architecture.",
        ],
      },
    ],
  },
  {
    id: "remote-write",
    title: "Remote write : le stockage long terme",
    level: 3,
    intro:
      "Prometheus garde des semaines de données ; au-delà, on externalise.",
    blocks: [
      {
        kind: "text",
        text: "La TSDB locale de Prometheus est dimensionnée pour des semaines de rétention, pas des années. Le remote write envoie les échantillons en continu vers un stockage distant longue durée (des projets open source comme Thanos, Cortex ou Mimir remplissent ce rôle). Prometheus reste la couche de collecte et d'alerte temps réel ; le stockage distant sert à l'analyse historique.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Activer le remote write",
        code: `remote_write:\n  - url: "http://stockage-long-terme:19291/api/v1/push"\n    queue_config:\n      max_samples_per_send: 1000`,
      },
    ],
  },
  {
    id: "retention-stockage",
    title: "Rétention et stockage",
    level: 3,
    intro:
      "Combien de temps garder les données, et à quel coût.",
    blocks: [
      {
        kind: "text",
        text: "Deux réglages pilotent la rétention : la durée (`--storage.tsdb.retention.time`) et la taille maximale (`--storage.tsdb.retention.size`) — la première limite atteinte gagne. La TSDB stocke par blocs de 2 heures, compressés : l'ordre de grandeur est de quelques octets par échantillon.",
      },
      {
        kind: "list",
        items: [
          "Dimensionner selon l'usage : 15 jours suffisent souvent pour l'opérationnel ; l'historique long va au remote storage.",
          "La rétention courte ne dispense pas de surveiller le disque : une explosion de cardinalité remplit n'importe quel quota.",
          "Les snapshots (`POST /api/v1/admin/tsdb/snapshot`) permettent des sauvegardes à froid de la TSDB.",
          "Surveiller Prometheus lui-même (méta-monitoring) : un second Prometheus léger ou les métriques internes suffisent.",
        ],
      },
    ],
  },
  {
    id: "haute-cardinalite",
    title: "Haute cardinalité : l'ennemi n°1",
    level: 3,
    intro:
      "Le problème de performance le plus courant — et comment l'éviter.",
    blocks: [
      {
        kind: "text",
        text: "Chaque combinaison unique de labels crée une série temporelle en mémoire et sur disque. Un label `user_id` avec 100 000 valeurs × 10 endpoints × 5 statuts = 5 millions de séries : Prometheus s'effondre. C'est l'explosion de cardinalité.",
      },
      {
        kind: "list",
        items: [
          "Jamais de valeurs non bornées en labels : user ID, UUID, email, timestamp, chemin d'URL avec id.",
          "Pour les chemins d'URL, normaliser côté instrumentation (`/users/:id` plutôt que `/users/12345`).",
          "Diagnostiquer via l'endpoint `/api/v1/status/tsdb` : identifier les métriques les plus gourmandes en séries.",
          "En dernier recours, supprimer les labels fautifs au scrape via le relabeling (`action: labeldrop`).",
        ],
      },
      {
        kind: "command",
        label: "Analyser la cardinalité",
        command: `promtool query instant http://localhost:9090 'count by (__name__)({__name__=~".+"})'`,
        why: "Compte le nombre de séries par métrique : les plus grosses consommatrices apparaissent en tête. Le point de départ de toute chasse à la cardinalité.",
      },
    ],
  },
  {
    id: "federation",
    title: "Fédération : agréger plusieurs Prometheus",
    level: 3,
    intro:
      "Une vue globale quand chaque site a son Prometheus.",
    blocks: [
      {
        kind: "text",
        text: "La fédération permet à un Prometheus « global » de scraper les endpoints `/federate` de Prometheus « locaux » en ne sélectionnant que les séries agrégées nécessaires. Chaque site garde son autonomie (collecte et alertes locales même si le lien est coupé) ; le global offre la vue d'ensemble.",
      },
      {
        kind: "list",
        items: [
          "Ne fédérer que des séries agrégées (via recording rules côté local) : fédérer du brut, c'est dupliquer le stockage.",
          "Alternative moderne : le remote write vers un stockage central mutualisé.",
          "La fédération ne remplace pas la haute disponibilité locale : chaque Prometheus reste un point unique pour son périmètre.",
        ],
      },
    ],
  },
  {
    id: "securite",
    title: "Sécuriser Prometheus",
    level: 3,
    intro:
      "Par défaut, Prometheus est ouvert : c'est à l'opérateur de le fermer.",
    blocks: [
      {
        kind: "list",
        items: [
          "L'interface web et l'API n'ont aucune authentification par défaut : ne jamais exposer le port 9090 sur Internet sans protection.",
          "TLS et authentification basique se configurent via le fichier `web-config` (`--web.config.file`) : certificats et utilisateurs locaux.",
          "En pratique, on place souvent Prometheus derrière un reverse proxy (Nginx, ingress Kubernetes) qui gère TLS et SSO.",
          "Limiter aussi l'accès réseau aux exporters : `/metrics` expose la topologie de l'infrastructure.",
          "Les endpoints d'administration (`/api/v1/admin/`) sont désactivés par défaut : ne les activer (`--enable-feature=admin-api`) que si nécessaire.",
        ],
      },
    ],
  },
  {
    id: "debugging-cibles",
    title: "Déboguer les cibles",
    level: 3,
    intro:
      "Quand une target est DOWN : la méthode systématique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire l'erreur sur /targets",
            detail:
              "La page affiche la dernière erreur de scrape : timeout, connection refused, 404, erreur de parsing. Le message oriente tout le diagnostic.",
          },
          {
            title: "Tester l'endpoint à la main",
            detail:
              "`curl http://cible:port/metrics` depuis le serveur Prometheus : si ça échoue ici, c'est un problème réseau ou applicatif, pas de configuration.",
          },
          {
            title: "Vérifier le format",
            detail:
              "`curl -s ... | promtool check metrics` : un format invalide fait échouer le scrape en silence apparent.",
          },
          {
            title: "Vérifier la découverte",
            detail:
              "En service discovery, la cible apparaît-elle dans `/service-discovery` ? Sinon, le problème est en amont (relabeling `keep`/`drop` trop strict, annotation manquante).",
          },
          {
            title: "Vérifier la métrique up",
            detail:
              "`up{job=\"...\"} == 0` liste les cibles en panne : à transformer en alerte `InstanceDown` permanente.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lister les cibles via l'API",
        command: "curl -s http://localhost:9090/api/v1/targets | head -c 600",
        why: "L'API expose l'état des cibles en JSON : scriptable pour des vérifications automatiques ou des dashboards d'inventaire.",
      },
    ],
  },
  {
    id: "bonnes-pratiques-pro",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Ce qui distingue une supervision utile d'un bruit de fond.",
    blocks: [
      {
        kind: "list",
        items: [
          "Instrumenter les quatre signaux d'or : latence, trafic, erreurs, saturation.",
          "Nommer les métriques selon les conventions (`<domaine>_<unité>_<suffixe>`, suffixes `_total`, `_seconds`, `_bytes`).",
          "Labels bornés et stables : jamais d'identifiants uniques.",
          "Alerter sur des symptômes actionnables, avec `for`, sévérité et runbook.",
          "Chaque alerte doit correspondre à une action : sinon, c'est un dashboard, pas une alerte.",
          "Valider configs et règles avec `promtool` avant chaque déploiement.",
          "Recording rules pour les requêtes coûteuses des dashboards principaux.",
          "Méta-monitorer Prometheus : disque, ingestion, cibles DOWN.",
          "Documenter les dashboards : une courbe sans contexte est un bruit.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes et solutions",
    level: 3,
    intro:
      "Les problèmes que l'on rencontre vraiment avec Prometheus.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Solution"],
        rows: [
          ["Target DOWN", "Réseau, port fermé, mauvais hostname (localhost dans Docker)", "Tester avec curl depuis le serveur Prometheus"],
          ["`rate()` retourne des valeurs absurdes", "Counter lu sans rate, ou fenêtre trop courte", "Utiliser `rate(m[5m])`, vérifier le type de la métrique"],
          ["Aucune donnée sur une période", "Rétention dépassée ou scrape en échec silencieux", "Vérifier `up` et la rétention configurée"],
          ["Prometheus lent / OOM", "Explosion de cardinalité", "Analyser avec `promtool tsdb analyze`, supprimer les labels fautifs"],
          ["Alerte qui ne se déclenche jamais", "`for` trop long ou expression fausse", "Tester l'expression dans la console, vérifier les labels"],
          ["Doublons après redémarrage", "Deux Prometheus scrapent les mêmes cibles", "External labels distincts, ou un seul writer"],
          ["Config refusée au démarrage", "YAML invalide ou option inconnue", "`promtool check config` avant de déployer"],
        ],
      },
    ],
  },
  {
    id: "projet-superviser-app",
    title: "Projet : superviser une application",
    level: 3,
    intro:
      "Le projet canonique : de l'instrumentation aux alertes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Instrumenter",
            detail:
              "Ajouter à une application : counter de requêtes, histogram de latences, gauge de connexions — avec des labels bornés (méthode, statut, endpoint normalisé).",
          },
          {
            title: "Scraper",
            detail:
              "Job Prometheus dédié, `promtool check config`, vérification sur `/targets`.",
          },
          {
            title: "Explorer",
            detail:
              "Écrire les requêtes des quatre signaux d'or dans la console, les valider visuellement.",
          },
          {
            title: "Alerter",
            detail:
              "Règles : instance down, taux d'erreur, latence p95, saturation disque — avec `for`, sévérités et annotations.",
          },
          {
            title: "Router",
            detail:
              "Alertmanager : regroupement par service, route critique vers l'astreinte, silences documentés pour les maintenances.",
          },
          {
            title: "Visualiser",
            detail:
              "Dashboard Grafana sur les mêmes requêtes : la supervision devient partageable.",
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
            label: "Documentation Prometheus",
            value: "prometheus.io/docs : vue d'ensemble, configuration, PromQL, alerting — la référence complète.",
          },
          {
            label: "PromQL pas à pas",
            value: "prometheus.io/docs/prometheus/latest/querying/basics : le tutoriel officiel du langage de requête.",
          },
          {
            label: "Référence promtool",
            value: "La documentation de l'utilitaire en ligne de commande pour la validation et le diagnostic.",
          },
          {
            label: "Dépôt GitHub",
            value: "prometheus/prometheus : code, issues et release notes.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : le projet de cette page — instrumenter, scraper, alerter, visualiser.",
          "Complément : la compétence `grafana` pour les dashboards, `kubernetes` pour la découverte de services.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Prometheus maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Visualiser avec `grafana` : transformer les requêtes en dashboards partagés.",
          "Découvrir la source des cibles avec `kubernetes` : service discovery native du cluster.",
          "Industrialiser avec `cicd` : déployer configs et règles via Git (GitOps).",
          "Conteneuriser avec `docker` : Prometheus et exporters en stack reproductible.",
          "Revenir à la roadmap : valider Prometheus et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

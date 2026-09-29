import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du monitoring et de l'observabilité : savoir ce qui
 * se passe en production avant les utilisateurs — métriques (Prometheus),
 * visualisation (Grafana), logs, traces (OpenTelemetry), SLO et alerting.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_MONITORING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est l'observabilité, pourquoi « ça marche sur ma machine » ne suffit pas, et ce que mesurent les équipes qui pilotent vraiment leur production.",
    blocks: [
      {
        kind: "text",
        text: "Le monitoring et l'observabilité consistent à savoir ce qui se passe en production avant que les utilisateurs ne s'en plaignent. L'observabilité repose sur trois piliers : les métriques (des nombres dans le temps : latence, taux d'erreurs, CPU), les logs (les événements : ce qui s'est passé, ligne par ligne) et les traces (le chemin d'une requête à travers les services). Les outils standards : Prometheus collecte les métriques, Grafana les visualise, OpenTelemetry unifie l'instrumentation.",
      },
      {
        kind: "text",
        text: "Pourquoi ça existe : sans observabilité, on pilote à l'aveugle — les incidents se découvrent par les tickets utilisateurs, les causes restent mystérieuses, et chaque panne devient une enquête. Avec une observabilité bien conçue, une alerte se déclenche sur un symptôme mesuré, le dashboard montre où ça coince, les traces désignent le service fautif et les logs racontent l'histoire. Le temps de détection passe d'heures à minutes.",
      },
      {
        kind: "text",
        text: "Collecter métriques, logs et traces pour comprendre l'état d'un système et réagir vite quand il dérive.",
      },
      {
        kind: "text",
        text: "Détecter les problèmes avant les utilisateurs, diagnostiquer vite, et prouver que « ça marche » avec des chiffres plutôt qu'une impression.",
      },
      {
        kind: "fields",
        title: "L'observabilité : l'essentiel",
        fields: [          {
            label: "Quand s'en préoccuper",
            value:
              "Dès le premier service en production : même une seule application gagne à exposer sa santé et ses métriques de base.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un dashboard décoratif plein de jauges, ni une accumulation d'alertes que personne ne lit : c'est un système d'aide à la décision en incident.",
          },
        ],
      },
    ],
  },
  {
    id: "trois-piliers",
    title: "Les trois piliers : métriques, logs, traces",
    level: 1,
    intro:
      "Trois types de signaux complémentaires : chacun répond à une question différente.",
    blocks: [
      {
        kind: "diagram",
        title: "Quel signal pour quelle question",
        lines: [
          "MÉTRIQUES (Prometheus)",
          "  « Y a-t-il un problème ? »",
          "  → nombres dans le temps : latence p95, taux d'erreurs, CPU",
          "  → bon marché, agrégeables, parfaites pour alerter",
          "     │",
          "     ▼",
          "TRACES (OpenTelemetry)",
          "  « Où est le problème ? »",
          "  → le chemin d'une requête : frontend → api → base (340 ms)",
          "  → désigne le service et l'étape lents",
          "     │",
          "     ▼",
          "LOGS",
          "  « Pourquoi ce problème ? »",
          "  → les événements détaillés : stack traces, requêtes fautives",
          "  → racontent l'histoire une fois le coupable localisé",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : les métriques donnent l'alerte, les traces localisent, les logs expliquent. Un système qui n'a que des logs se noie dans le volume ; un système qui n'a que des métriques sait qu'il a mal sans savoir où ; les trois ensemble forment une chaîne de diagnostic complète.",
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
      "Ce qu'il faut connaître avant de monter sa première stack d'observabilité.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations",
        fields: [
          {
            label: "Linux (bases)",
            value:
              "Lire les logs système, comprendre CPU/mémoire/disque : les signaux de base viennent de la machine.",
          },
          {
            label: "HTTP (bases)",
            value:
              "Codes de statut, latence, endpoints : la plupart des métriques applicatives parlent HTTP.",
          },
          {
            label: "Conteneurs ou services",
            value:
              "Savoir ce qu'on surveille : un service qui tourne, avec un port exposé et des logs accessibles.",
          },
          {
            label: "YAML",
            value:
              "Les configurations Prometheus et Alertmanager se déclarent en YAML.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation : Prometheus + node_exporter",
    level: 2,
    intro:
      "Monter un Prometheus qui surveille une machine, en quelques commandes.",
    blocks: [
      {
        kind: "command",
        label: "Lancer Prometheus avec Docker",
        command: "docker run -d -p 9090:9090 --name prometheus prom/prometheus",
        why: "Démarre Prometheus (image officielle `prom/prometheus`) avec sa configuration par défaut, interface web sur le port 9090. En local, c'est le moyen le plus rapide d'avoir un serveur de métriques fonctionnel sans rien compiler.",
        verify: "curl -s localhost:9090/-/healthy",
      },
      {
        kind: "command",
        label: "Lancer l'exporter système",
        command: "docker run -d -p 9100:9100 --name node-exporter prom/node-exporter",
        why: "`node_exporter` (image officielle `prom/node-exporter`) expose les métriques de la machine hôte (CPU, mémoire, disque, réseau) au format Prometheus sur le port 9100. C'est l'exporter de référence : il transforme le système en source de métriques.",
        verify: "curl -s localhost:9100/metrics | head -20",
      },
      {
        kind: "text",
        text: "Le modèle Prometheus : il ne reçoit pas les métriques, il vient les CHERCHER (scrape) à intervalles réguliers sur des endpoints HTTP `/metrics`. Chaque cible exposée devient une source. C'est ce modèle pull qui rend l'architecture simple : ajouter une cible = ajouter une ligne de configuration.",
      },
    ],
  },
  {
    id: "premier-scrape",
    title: "Premier scrape : configurer Prometheus",
    level: 2,
    intro:
      "Dire à Prometheus quoi surveiller : le fichier `prometheus.yml`.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "prometheus.yml",
        code: "global:\n  scrape_interval: 15s\n\nscrape_configs:\n  - job_name: \"prometheus\"\n    static_configs:\n      - targets: [\"localhost:9090\"]\n\n  - job_name: \"node\"\n    static_configs:\n      - targets: [\"localhost:9100\"]",
      },
      {
        kind: "command",
        label: "Vérifier la configuration",
        command: "promtool check config prometheus.yml",
        why: "`promtool` (livré avec Prometheus) valide la syntaxe du fichier de configuration sans démarrer le serveur : il détecte les erreurs d'indentation et les clés inconnues. À lancer avant chaque redémarrage — une config invalide empêche Prometheus de démarrer.",
        verify: "promtool --version",
      },
      {
        kind: "text",
        text: "Lecture : toutes les 15 secondes (`scrape_interval`), Prometheus interroge les cibles. Chaque `job_name` regroupe des cibles de même nature (ici le serveur lui-même et la machine). Dans l'interface (port 9090, onglet Status → Targets), chaque cible doit passer à l'état UP : c'est la preuve que le scrape fonctionne.",
      },
    ],
  },
  {
    id: "promql-bases",
    title: "PromQL : les premières requêtes",
    level: 2,
    intro:
      "Interroger les métriques : le langage PromQL en quatre requêtes essentielles.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Quatre requêtes à connaître",
        code: "# Les cibles sont-elles joignables ?\nup\n\n# Lesquelles sont en panne ?\nup == 0\n\n# Requêtes HTTP par seconde (taux sur 5 minutes)\nrate(http_requests_total[5m])\n\n# Par service\nsum(rate(http_requests_total[5m])) by (job)",
      },
      {
        kind: "fields",
        title: "Décryptage",
        fields: [
          {
            label: "`up`",
            value:
              "Métrique automatique de Prometheus : 1 si le dernier scrape a réussi, 0 sinon. La requête la plus simple et la plus utile.",
          },
          {
            label: "`rate(...[5m])`",
            value:
              "Calcule le taux par seconde d'un compteur sur les 5 dernières minutes. Les compteurs ne font qu'augmenter : `rate` les transforme en débit.",
          },
          {
            label: "`sum(...) by (job)`",
            value:
              "Agrège par label : le débit total par service. Les labels (job, instance,…) sont les dimensions d'analyse.",
          },
          {
            label: "`[5m]` (fenêtre)",
            value:
              "La plage de temps regardée en arrière. Plus elle est large, plus la courbe est lisse — mais moins réactive.",
          },
        ],
      },
      {
        kind: "text",
        text: "Testez ces requêtes dans l'interface Prometheus (onglet Graph) : c'est le bac à sable PromQL. Une requête qui ne retourne rien signale souvent un nom de métrique ou de label incorrect — vérifiez dans l'explorateur de métriques.",
      },
    ],
  },
  {
    id: "grafana-dashboards",
    title: "Grafana : visualiser",
    level: 2,
    intro:
      "Transformer les requêtes PromQL en dashboards lisibles par toute l'équipe.",
    blocks: [
      {
        kind: "command",
        label: "Lancer Grafana",
        command: "docker run -d -p 3000:3000 --name grafana grafana/grafana-oss",
        why: "Démarre Grafana (édition open source) sur le port 3000. Identifiants initiaux `admin`/`admin` (à changer immédiatement). Grafana ne collecte rien : il interroge Prometheus et affiche les résultats — séparation claire entre stockage (Prometheus) et visualisation.",
        verify: "curl -s -o /dev/null -w '%{http_code}' localhost:3000/login",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Ajouter Prometheus comme source de données",
            detail:
              "Configuration → Data sources → Add → Prometheus, URL `http://prometheus:9090` (ou `http://localhost:9090` si tout tourne en local). « Save & test » doit afficher un succès.",
          },
          {
            title: "Créer un dashboard",
            detail:
              "Dashboards → New → Add visualization : choisissez la source Prometheus, écrivez une requête PromQL (ex. `up`), choisissez le type de panneau (Time series).",
          },
          {
            title: "Assembler les vues essentielles",
            detail:
              "Un dashboard « santé » minimal : disponibilité des cibles (`up`), taux de requêtes, taux d'erreurs, latence p95, CPU/mémoire. Cinq panneaux bien choisis valent mieux que trente jauges décoratives.",
          },
          {
            title: "Partager",
            detail:
              "Les dashboards se versionnent (JSON exportable) : stockez-les dans Git à côté du code. Un dashboard non versionné est perdu à la première réinstallation.",
          },
        ],
      },
    ],
  },
  {
    id: "health-checks",
    title: "Health checks : la base de la surveillance",
    level: 2,
    intro:
      "Avant les métriques sophistiquées : chaque service doit dire s'il va bien.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Endpoint /health (FastAPI)",
        code: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/health\")\ndef health():\n    return {\"status\": \"ok\"}",
      },
      {
        kind: "text",
        text: "Un health check est un endpoint HTTP léger qui répond 200 si le service fonctionne. Les orchestrateurs (Kubernetes : `livenessProbe`, `readinessProbe`) et les load balancers s'en servent pour retirer automatiquement les instances malades du trafic. Distinguez le check « le processus répond » (léger, fréquent) du check « les dépendances vont bien » (base de données joignable — plus coûteux, moins fréquent).",
      },
      {
        kind: "list",
        items: [
          "Un health check doit être rapide (< 100 ms) et sans effet de bord.",
          "Ne mettez jamais de logique métier dans un health check : il doit rester fiable même quand tout le reste casse.",
          "Le monitoring externe (sonde qui appelle `/health` depuis l'extérieur) vérifie ce que voit vraiment l'utilisateur.",
        ],
      },
    ],
  },
  {
    id: "logs-bases",
    title: "Logs : centraliser et structurer",
    level: 2,
    intro:
      "Des fichiers éparpillés à une recherche unique : les bases de la centralisation.",
    blocks: [
      {
        kind: "text",
        text: "En production, les logs de chaque service doivent converger vers un endroit unique et requêtable : chercher une erreur ne doit pas demander de se connecter à dix machines. Deux familles d'outils : la stack ELK (Elasticsearch, Logstash, Kibana — puissante, gourmande) et Loki (de Grafana — légère, indexe les labels comme Prometheus, affiche les logs dans les mêmes dashboards).",
      },
      {
        kind: "code",
        language: "json",
        title: "Log structuré (JSON)",
        code: "{\"timestamp\": \"2026-09-29T08:12:03Z\", \"level\": \"error\", \"service\": \"api\", \"trace_id\": \"a1b2c3\", \"message\": \"Paiement refusé\", \"user_id\": 4521}",
      },
      {
        kind: "text",
        text: "Les logs structurés (JSON, champs nommés) se filtrent et s'agrègent ; les logs en texte libre se lisent à l'œil. En production : JSON systématique. Le `trace_id` relie le log à la trace distribuée (voir niveau 3) : d'un log, on remonte à toute la requête.",
      },
    ],
  },
  {
    id: "alerting-bases",
    title: "Alerting : les bases",
    level: 2,
    intro:
      "Être prévenu quand ça casse — sans être réveillé pour rien.",
    blocks: [
      {
        kind: "text",
        text: "Le principe : Prometheus évalue en continu des règles d'alerte (des requêtes PromQL + un seuil + une durée). Quand une règle est vraie assez longtemps, l'alerte part vers Alertmanager, qui la regroupe, la déduplique et la route (email, Slack, PagerDuty) vers la bonne personne. La durée (`for: 5m`) évite les alertes sur les pics d'une seconde.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Règle d'alerte : instance injoignable",
        code: "groups:\n  - name: disponibilite\n    rules:\n      - alert: InstanceDown\n        expr: up == 0\n        for: 5m\n        labels:\n          severity: critical\n        annotations:\n          summary: \"Instance {{ $labels.instance }} injoignable\"",
      },
      {
        kind: "list",
        items: [
          "Chaque alerte doit être actionnable : si personne ne sait quoi faire en la recevant, c'est du bruit — écrivez un runbook.",
          "Alertez sur les symptômes (le service est lent pour les utilisateurs), pas sur les causes (le CPU est à 90 % — peut-être normal).",
          "Testez vos alertes : déclenchez-les volontairement pour vérifier qu'elles arrivent et que le runbook fonctionne.",
        ],
      },
    ],
  },
  {
    id: "sli-slo-bases",
    title: "SLI, SLO : définir « ça marche »",
    level: 2,
    intro:
      "Passer du monitoring subi aux objectifs contractuels : ce que signifient SLI et SLO.",
    blocks: [
      {
        kind: "fields",
        title: "Le vocabulaire SRE",
        fields: [
          {
            label: "SLI (indicateur)",
            value:
              "Ce qu'on mesure : ex. « proportion de requêtes servies en moins de 300 ms ». Un SLI est une requête PromQL sur des données réelles.",
          },
          {
            label: "SLO (objectif)",
            value:
              "La cible contractuelle sur le SLI : ex. « 99,9 % des requêtes < 300 ms sur 30 jours ». C'est l'engagement.",
          },
          {
            label: "Budget d'erreur",
            value:
              "La marge tolérée : 100 % − SLO. Avec 99,9 %, le budget est de 0,1 % d'échecs — soit ~43 minutes/mois. Le budget se consomme : quand il est épuisé, on freine les releases et on fiabilise.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'idée puissante : l'alerting se base sur la consommation du budget d'erreur, pas sur des seuils arbitraires. Au lieu d'alerter « CPU > 80 % », on alerte « le budget d'erreur sera épuisé dans 2 jours au rythme actuel ». L'alerte parle le langage du service rendu, pas de la machine.",
      },
    ],
  },
  {
    id: "deboguer-monitoring",
    title: "Déboguer sa stack de monitoring",
    level: 2,
    intro:
      "Le monitoring lui-même tombe en panne : les diagnostics de base.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier les targets",
            detail:
              "Dans Prometheus (Status → Targets) : une cible DOWN explique des graphes vides. Causes fréquentes : exporter arrêté, pare-feu, mauvaise adresse dans la config.",
          },
          {
            title: "Valider la configuration",
            detail:
              "`promtool check config prometheus.yml` après chaque modification. Une erreur YAML = Prometheus qui ne redémarre pas.",
          },
          {
            title: "Tester la requête à la main",
            detail:
              "`curl localhost:9100/metrics` : l'exporter répond-il ? La métrique existe-t-elle avec ce nom exact ? 90 % des « requêtes qui ne retournent rien » viennent d'un nom incorrect.",
          },
          {
            title: "Vérifier l'heure",
            detail:
              "Des horloges désynchronisées entre Prometheus et les cibles produisent des trous bizarres : NTP partout.",
          },
          {
            title: "Surveiller le surveillant",
            detail:
              "Prometheus s'auto-surveille (`up{job=\"prometheus\"}`, espace disque du stockage) : un monitoring sans auto-supervision est aveugle à sa propre panne.",
          },
        ],
      },
    ],
  },
  {
    id: "flux-sre",
    title: "Le flux SRE : de l'alerte au post-mortem",
    level: 3,
    intro:
      "Comment une équipe mature vit avec son observabilité : le cycle complet.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de l'incident",
        lines: [
          "Métriques → seuil SLO dépassé",
          "     ↓",
          "Alerte (actionnable, avec runbook)",
          "     ↓",
          "Triage : gravité, périmètre (dashboard)",
          "     ↓",
          "Diagnostic : traces → service fautif → logs → cause",
          "     ↓",
          "Mitigation : rollback, bascule, scale (remettre en service)",
          "     ↓",
          "Résolution : correction de la cause racine",
          "     ↓",
          "Post-mortem sans blâme : qu'est-ce qui a manqué ?",
          "     ↓",
          "Amélioration : nouvelle alerte, runbook, test, SLO ajusté",
        ],
      },
      {
        kind: "text",
        text: "Deux principes SRE : on atténue d'abord (remettre le service en route), on comprend ensuite (la cause racine attendra) ; et chaque incident améliore le système (le post-mortem produit des actions concrètes, suivies). Un incident sans post-mortem est un incident qui se répétera.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "promql-avance",
    title: "PromQL avancé",
    level: 3,
    intro:
      "Au-delà des bases : sélecteurs, fonctions et les pièges classiques.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Requêtes de production",
        code: "# Taux d'erreurs (5xx) par service\nsum(rate(http_requests_total{status=~\"5..\"}[5m])) by (job)\n/\nsum(rate(http_requests_total[5m])) by (job)\n\n# Latence p95\n histogram_quantile(0.95,\n  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)\n)\n\n# Mémoire disponible (%)\nnode_memory_MemAvailable_bytes / node_memory_MemTotal_bytes\n\n# CPU hors idle (%)\n100 - avg(rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) by (instance) * 100",
      },
      {
        kind: "fields",
        title: "À comprendre",
        fields: [
          {
            label: "Sélecteurs `{...}`",
            value:
              "Filtrent les séries : `{status=~\"5..\"}` = codes 5xx (regex avec `=~`), `{mode=\"idle\"}` = égalité stricte.",
          },
          {
            label: "`histogram_quantile`",
            value:
              "Calcule un percentile depuis un histogramme Prometheus. La latence moyenne ment (les pics sont invisibles) : p95/p99 disent la vérité.",
          },
          {
            label: "Compteur vs gauge",
            value:
              "Un compteur ne fait qu'augmenter (`rate` dessus) ; une gauge monte et descend (CPU, mémoire : usage direct). Les confondre donne des courbes absurdes.",
          },
          {
            label: "Le piège du `rate` sur les compteurs qui reset",
            value:
              "Prometheus gère les remises à zéro (redémarrage) : `rate` reste correct. En revanche, `increase` sur une courte fenêtre après un reset peut surprendre — préférez des fenêtres ≥ 2× l'intervalle de scrape.",
          },
        ],
      },
    ],
  },
  {
    id: "instrumentation",
    title: "Instrumenter son application",
    level: 3,
    intro:
      "Exposer les bonnes métriques : les quatre types et quand les utiliser.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre types de métriques",
        fields: [
          {
            label: "Counter (compteur)",
            value:
              "Ne fait qu'augmenter : requêtes totales, erreurs totales, paiements traités. Usage : débits et taux via `rate()`.",
          },
          {
            label: "Gauge (jauge)",
            value:
              "Monte et descend : connexions actives, mémoire utilisée, taille d'une file. Usage : valeur instantanée.",
          },
          {
            label: "Histogram",
            value:
              "Distribution des observations en buckets : latences, tailles de requêtes. Usage : percentiles (p50/p95/p99) via `histogram_quantile`.",
          },
          {
            label: "Summary",
            value:
              "Comme l'histogramme mais avec quantiles pré-calculés côté client. Usage : déconseillé en général (non agrégeable entre instances) — préférez l'histogramme.",
          },
        ],
      },
      {
        kind: "text",
        text: "Les bibliothèques clientes existent pour tous les langages (`prometheus_client` en Python, `prom-client` en Node). Exposez `/metrics`, Prometheus scrape. Règle : instrumentez ce que vous alertez — une métrique sans alerte ni dashboard est du bruit coûteux.",
      },
    ],
  },
  {
    id: "cardinalite",
    title: "Cardinalité : le piège des labels",
    level: 3,
    intro:
      "Le coût caché de Prometheus : chaque combinaison de labels multiplie les séries.",
    blocks: [
      {
        kind: "text",
        text: "Une métrique avec les labels `method` (4 valeurs) × `status` (5) × `endpoint` (20) = 400 séries temporelles. Ajoutez `user_id` (1 million de valeurs) et c'est l'explosion : des centaines de millions de séries, Prometheus s'effondre. C'est la cardinalité.",
      },
      {
        kind: "list",
        items: [
          "Labels à faible cardinalité uniquement : méthode, statut, service, version — jamais d'identifiant utilisateur, d'IP ou de timestamp.",
          "Les labels à forte cardinalité vont dans les LOGS (cherchables), pas dans les métriques (agrégées).",
          "Surveillez `prometheus_tsdb_head_series` : le nombre de séries actives est l'indicateur de santé n°1 du serveur.",
          "En cas d'explosion : identifiez la métrique fautive (top 10 par cardinalité via l'API), corrigez l'instrumentation.",
        ],
      },
    ],
  },
  {
    id: "recording-rules",
    title: "Recording rules : pré-calculer",
    level: 3,
    intro:
      "Les requêtes coûteuses exécutées en continu : les enregistrer pour des dashboards rapides.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Règle d'enregistrement",
        code: "groups:\n  - name: latence\n    interval: 1m\n    rules:\n      - record: job:latence_p95_5m\n        expr: |\n          histogram_quantile(0.95,\n            sum(rate(http_request_duration_seconds_bucket[5m])) by (job, le)\n          )",
      },
      {
        kind: "text",
        text: "Prometheus évalue cette expression toutes les minutes et stocke le résultat comme une nouvelle métrique `job:latence_p95_5m`. Les dashboards et alertes l'utilisent directement : instantané au lieu de coûteux. Usage : toute requête lente utilisée dans plusieurs dashboards ou alertes.",
      },
    ],
  },
  {
    id: "alertmanager-config",
    title: "Alertmanager : router sans spammer",
    level: 3,
    intro:
      "Regrouper, dédupliquer, router : la configuration qui rend l'astreinte vivable.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "alertmanager.yml",
        code: "route:\n  receiver: \"equipe-defaut\"\n  group_by: [\"alertname\", \"service\"]\n  group_wait: 30s\n  group_interval: 5m\n  repeat_interval: 4h\n  routes:\n    - match:\n        severity: critical\n      receiver: \"astreinte\"\n\nreceivers:\n  - name: \"equipe-defaut\"\n  - name: \"astreinte\"",
      },
      {
        kind: "fields",
        title: "Les réglages qui comptent",
        fields: [
          {
            label: "`group_by`",
            value:
              "Regroupe les alertes similaires en UNE notification (10 instances down = 1 message, pas 10).",
          },
          {
            label: "`group_wait` / `group_interval`",
            value:
              "Attend 30 s pour grouper les alertes qui arrivent ensemble, puis 5 min entre deux notifications du même groupe.",
          },
          {
            label: "`repeat_interval`",
            value:
              "Ne répète une alerte non résolue que toutes les 4 h : assez pour ne pas oublier, pas assez pour harceler.",
          },
          {
            label: "`routes`",
            value:
              "Les critiques vont à l'astreinte (téléphone), le reste à l'équipe (chat/email). Le routage par sévérité est non négociable.",
          },
        ],
      },
    ],
  },
  {
    id: "slo-avance",
    title: "SLO avancés : budget d'erreur en pratique",
    level: 3,
    intro:
      "Du SLO affiché au pilotage réel : alertes sur consommation du budget.",
    blocks: [
      {
        kind: "text",
        text: "Exemple chiffré : SLO 99,9 % sur 30 jours = budget de 43 minutes d'indisponibilité par mois. L'alerte intelligente ne dit pas « le service est down » mais « au rythme actuel, le budget sera épuisé dans 2 jours » (alerte prédictive, sévérité warning) puis « 10 % du budget consommé en 1 heure » (alerte critique : ça brûle vite). Google SRE formalise ces seuils : alerte rapide sur consommation brutale, alerte lente sur dérive progressive.",
      },
      {
        kind: "list",
        items: [
          "Budget épuisé = gel des releases non critiques : la règle est écrite à l'avance, pas négociée pendant l'incident.",
          "Un SLO à 100 % est un mensonge : il interdit toute release. 99,9 % ou 99,95 % sont des objectifs sains.",
          "Commencez avec 2-3 SLO par service critique (disponibilité, latence), pas vingt.",
          "Les SLO se renégocient avec les données : un SLO jamais violé est peut-être trop laxiste, un SLO toujours violé est irréaliste.",
        ],
      },
    ],
  },
  {
    id: "open-telemetry",
    title: "OpenTelemetry : l'instrumentation unifiée",
    level: 3,
    intro:
      "Un seul standard pour métriques, logs et traces : fini le vendor lock-in de l'instrumentation.",
    blocks: [
      {
        kind: "text",
        text: "OpenTelemetry (OTel) est le standard open source (CNCF) pour instrumenter les applications : une seule bibliothèque par langage génère métriques, logs et traces dans un format unique. Le Collector (un agent à déployer) reçoit ces signaux et les route vers les backends (Prometheus, Loki, Tempo, Jaeger…) : changer de backend ne demande plus de réinstrumenter le code.",
      },
      {
        kind: "diagram",
        title: "L'architecture OpenTelemetry",
        lines: [
          "Application (SDK OTel : Python, JS, Go, Java…)",
          "  │ métriques + logs + traces (format OTLP)",
          "  ▼",
          "Collector (agent / gateway)",
          "  │ reçoit, filtre, enrichit, route",
          "  ├──→ Prometheus (métriques)",
          "  ├──→ Loki (logs)",
          "  └──→ Tempo / Jaeger (traces)",
        ],
      },
      {
        kind: "list",
        items: [
          "Instrumentez avec OTel même si vos backends sont Prometheus/Grafana : l'instrumentation survit aux changements d'outils.",
          "L'auto-instrumentation (agents Java, Python) couvre les frameworks courants sans modifier le code.",
          "La propagation du contexte (trace_id) relie automatiquement logs, métriques et traces d'une même requête.",
        ],
      },
    ],
  },
  {
    id: "traces-distribuees",
    title: "Traces distribuées",
    level: 3,
    intro:
      "Suivre une requête à travers dix services : spans, contexte et échantillonnage.",
    blocks: [
      {
        kind: "text",
        text: "Une trace = l'arbre des opérations (spans) d'une requête : le frontend appelle l'API (120 ms), qui interroge la base (95 ms) et le cache (5 ms). Chaque span a un nom, une durée, des attributs. La trace répond à « où partent les 340 ms ? » en une image — là où les métriques agrégées ne montrent qu'une moyenne.",
      },
      {
        kind: "fields",
        title: "Concepts clés",
        fields: [
          {
            label: "Span",
            value:
              "Une opération nommée et horodatée. Les spans s'imbriquent : le span parent (requête HTTP) contient les spans enfants (requête SQL).",
          },
          {
            label: "Propagation du contexte",
            value:
              "Le `trace_id` voyage dans les headers HTTP entre services : c'est lui qui relie les spans en une seule trace.",
          },
          {
            label: "Échantillonnage",
            value:
              "Tracer 100 % des requêtes coûte cher : on échantillonne (ex. 10 %, ou 100 % des erreurs). Les erreurs sont toujours tracées.",
          },
          {
            label: "Tempo / Jaeger",
            value:
              "Les backends de traces : Tempo (Grafana, objet simple) ou Jaeger (CNCF, historique). Les deux se requêtent par trace_id depuis Grafana.",
          },
        ],
      },
    ],
  },
  {
    id: "logs-avances",
    title: "Logs avancés : Loki",
    level: 3,
    intro:
      "Loki : les logs pensés comme des métriques — légers, requêtables, intégrés à Grafana.",
    blocks: [
      {
        kind: "text",
        text: "Loki (Grafana) indexe uniquement les labels (service, niveau, environnement), pas le contenu des logs : c'est 10× moins gourmand qu'Elasticsearch, au prix d'une recherche plein-texte moins puissante. Pour la plupart des équipes, c'est le bon compromis — et les logs s'affichent dans les mêmes dashboards que les métriques.",
      },
      {
        kind: "code",
        language: "text",
        title: "LogQL : requêter les logs",
        code: "# Tous les logs d'erreur du service api\n{service=\"api\", level=\"error\"}\n\n# Compter les erreurs par minute\ncount_over_time({service=\"api\", level=\"error\"}[1m])\n\n# Filtrer sur le contenu\n{service=\"api\"} |= \"paiement\"",
      },
      {
        kind: "list",
        items: [
          "Corrélez : depuis un pic sur un graphe, basculez aux logs de la même période en un clic (Grafana le fait nativement).",
          "Ne loguez jamais de données personnelles ou de secrets : les logs sont lus par beaucoup de monde et conservés longtemps.",
          "Définissez une politique de rétention (ex. 30 jours) : les logs vieux sont rarement utiles et toujours coûteux.",
        ],
      },
    ],
  },
  {
    id: "dashboards-efficaces",
    title: "Dashboards efficaces",
    level: 3,
    intro:
      "Un dashboard sert en incident : les principes qui le rendent utile sous pression.",
    blocks: [
      {
        kind: "list",
        items: [
          "La règle des 5 secondes : en 5 secondes, on doit voir si ça va bien ou mal (voyants, SLO en tête).",
          "Structure RED par service : Rate (débit), Errors (taux d'erreurs), Duration (latence) — les trois panneaux qui diagnostiquent 80 % des incidents.",
          "USE pour l'infrastructure : Utilization, Saturation, Errors — par ressource (CPU, mémoire, disque).",
          "Un dashboard par niveau : vue d'ensemble (santé), vue service (diagnostic), vue détaillée (forensique). Pas un dashboard fourre-tout.",
          "Variables de template (service, environnement) : un seul dashboard paramétrable plutôt que dix copies.",
          "Versionnez les dashboards en JSON dans Git : recréables, relisables en PR.",
        ],
      },
    ],
  },
  {
    id: "alertes-actionnables",
    title: "Des alertes actionnables, pas du spam",
    level: 3,
    intro:
      "La différence entre une astreinte vivable et un enfer : chaque alerte mérite de réveiller quelqu'un.",
    blocks: [
      {
        kind: "fields",
        title: "Le test de l'alerte",
        fields: [
          {
            label: "Actionnable ?",
            value:
              "Quelqu'un sait quoi faire en la recevant (runbook lié). Sinon : ticket ou dashboard, pas alerte.",
          },
          {
            label: "Sur symptôme ?",
            value:
              "« Les utilisateurs voient des erreurs » plutôt que « le disque est à 85 % ». Alerter sur l'impact, pas sur la métrique.",
          },
          {
            label: "Avec contexte ?",
            value:
              "L'annotation dit quel service, quel dashboard ouvrir, quel runbook suivre. Une alerte nue fait perdre 10 minutes.",
          },
          {
            label: "Dédupliquée ?",
            value:
              "Une panne = une notification groupée, pas 50 alertes en cascade. Alertmanager groupe par service.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le runbook est indissociable de l'alerte : diagnostic en 5 étapes, commandes exactes, critères d'escalade. Sans runbook, chaque alerte est une enquête qui recommence à zéro — et l'astreinte devient un supplice.",
      },
    ],
  },
  {
    id: "on-call",
    title: "On-call : l'astreinte organisée",
    level: 3,
    intro:
      "L'humain derrière l'alerte : rotations, escalade et culture.",
    blocks: [
      {
        kind: "list",
        items: [
          "Rotations : l'astreinte tourne (hebdomadaire typique), jamais une seule personne — avec compensation reconnue.",
          "Escalade : si l'astreint ne répond pas en N minutes, l'alerte monte au niveau suivant. Automatique, pas « j'appelle quelqu'un ».",
          "Fenêtres de maintenance : les interventions planifiées ne doivent pas déclencher d'alertes (silences planifiés).",
          "Post-mortems sans blâme : chaque incident produit des actions d'amélioration suivies, jamais des coupables.",
          "Charge d'alerte mesurée : plus de quelques alertes par semaine = les seuils sont mauvais, pas l'équipe.",
          "Les développeurs sont d'astreinte pour leur propre code : « vous l'avez construit, vous le surveillez » — c'est ce qui rend les alertes actionnables.",
        ],
      },
    ],
  },
  {
    id: "blackbox-monitoring",
    title: "Blackbox : surveiller comme un utilisateur",
    level: 3,
    intro:
      "Vos métriques internes peuvent être vertes pendant que le site est down : la sonde externe dit la vérité.",
    blocks: [
      {
        kind: "text",
        text: "Le blackbox monitoring interroge vos services depuis l'extérieur, comme un utilisateur : HTTP 200 sur la page d'accueil ? Le certificat TLS expire quand ? Le DNS résout-il ? Le `blackbox_exporter` de Prometheus fait exactement cela (sondes HTTP, TCP, DNS, ICMP), avec des alertes sur ce que voit vraiment l'utilisateur — indépendamment de votre infrastructure.",
      },
      {
        kind: "list",
        items: [
          "Surveillez l'expiration des certificats TLS : l'alerte la plus rentable qui soit (panne classique, évitable).",
          "Des sondes depuis plusieurs régions détectent les problèmes réseau localisés.",
          "Le monitoring externe ne remplace pas l'interne : les deux se complètent (symptôme vu de dehors, cause vue de dedans).",
        ],
      },
    ],
  },
  {
    id: "kubernetes-monitoring",
    title: "Monitorer Kubernetes",
    level: 3,
    intro:
      "La stack complète sur un cluster : kube-prometheus-stack en une commande.",
    blocks: [
      {
        kind: "command",
        label: "Installer la stack d'observabilité",
        command: "helm repo add prometheus-community https://prometheus-community.github.io/helm-charts",
        why: "Ajoute le dépôt Helm communautaire qui contient `kube-prometheus-stack` : Prometheus, Alertmanager, Grafana, node_exporter et les règles d'alerte Kubernetes préconfigurées. C'est la voie standard pour une observabilité complète sur cluster.",
        verify: "helm repo update",
      },
      {
        kind: "command",
        label: "Déployer la stack",
        command: "helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack",
        why: "Déploie l'ensemble : Prometheus configuré pour découvrir automatiquement les Pods et services (service discovery Kubernetes), des dashboards Grafana prêts (utilisation par namespace, santé des nœuds) et des alertes de base (pods en crashloop, disque plein). Le point de départ, pas le point d'arrivée : ajoutez ensuite vos SLI métier.",
        verify: "kubectl get pods",
      },
      {
        kind: "list",
        items: [
          "La service discovery remplace la config statique : Prometheus découvre les cibles via l'API Kubernetes (annotations sur les Pods).",
          "Les métriques kube-state-metrics exposent l'état des objets (deployments, pods) : indispensables aux alertes « le déploiement n'avance pas ».",
          "Pensez au stockage long terme (Thanos, Mimir) quand la rétention locale ne suffit plus.",
        ],
      },
    ],
  },
  {
    id: "retention-stockage",
    title: "Rétention et stockage long terme",
    level: 3,
    intro:
      "Prometheus garde 15 jours par défaut : pour l'historique long, il faut une stratégie.",
    blocks: [
      {
        kind: "text",
        text: "Le stockage local de Prometheus est dimensionné pour le court terme (alerting, dashboards temps réel) : 15 jours par défaut, configurable. Pour l'analyse long terme (tendances trimestrielles, capacité), on ajoute un stockage distant : Thanos ou Mimir reçoivent les blocs de Prometheus et offrent une rétention de mois/années avec une requête unifiée.",
      },
      {
        kind: "list",
        items: [
          "Downsampling : les données anciennes sont agrégées (précision réduite) — on garde la tendance, pas chaque point.",
          "Recording rules + stockage long terme : les SLI mensuels se calculent sur des métriques pré-agrégées.",
          "Dimensionnez le disque : ~1-2 octets par échantillon ; surveillez `prometheus_tsdb_storage_blocks_bytes`.",
        ],
      },
    ],
  },
  {
    id: "securite-monitoring",
    title: "Sécuriser le monitoring",
    level: 3,
    intro:
      "Les dashboards montrent tout : qui y a accès, et ce qu'ils exposent.",
    blocks: [
      {
        kind: "list",
        items: [
          "Authentification sur Grafana et Prometheus : jamais d'instance exposée sans mot de passe sur internet.",
          "Les métriques peuvent fuiter des infos sensibles (noms de clients en labels, chemins) : auditez ce que vous exposez.",
          "RBAC Grafana : les équipes voient leurs dashboards, pas forcément ceux des autres.",
          "Les endpoints `/metrics` ne doivent pas être publics : réseau interne ou authentification.",
          "Journalisez qui modifie les alertes et dashboards : ce sont des configurations critiques.",
        ],
      },
    ],
  },
  {
    id: "couts-observabilite",
    title: "Coûts de l'observabilité",
    level: 3,
    intro:
      "L'observabilité managée se paie au volume : comprendre la facture.",
    blocks: [
      {
        kind: "text",
        text: "En auto-hébergé, le coût est l'infrastructure (disque, CPU du Prometheus). En managé (Grafana Cloud, Datadog…), on paie au volume : séries de métriques, Go de logs ingérés, spans de traces. Les leviers : limiter la cardinalité, échantillonner les traces, filtrer les logs verbeux avant envoi, retenir moins longtemps.",
      },
      {
        kind: "list",
        items: [
          "La facture d'observabilité qui explose vient presque toujours des logs : filtrez en amont (niveaux, services verbeux).",
          "Instrumentez avec intention : chaque métrique doit servir un dashboard, une alerte ou un SLO.",
          "Comparez le coût du managé au coût d'exploitation de l'auto-hébergé (astreinte incluse) : les deux se chiffrent.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques de l'observabilité, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Le dashboard cimetière",
            value:
              "Problem : 40 dashboards que personne n'ouvre, dont la moitié cassés. Why : on crée sans supprimer. Better : un dashboard = un usage (incident, revue hebdo) ; archivez le reste.",
          },
          {
            label: "L'alerte qui pleure au loup",
            value:
              "Problem : des alertes qui se déclenchent pour rien, ignorées quand c'est grave. Why : seuils arbitraires sans runbook. Better : alertes sur symptômes + runbook + test régulier.",
          },
          {
            label: "Alerter sur les causes",
            value:
              "Problem : « CPU > 80 % » réveille alors que tout va bien. Why : on surveille la machine, pas le service. Better : alertes sur SLI/SLO (impact utilisateur).",
          },
          {
            label: "La latence moyenne",
            value:
              "Problem : « latence moyenne 50 ms » pendant que 5 % des utilisateurs attendent 5 s. Why : la moyenne cache les extrêmes. Better : p95/p99 via histogrammes.",
          },
          {
            label: "Explosion de cardinalité",
            value:
              "Problem : Prometheus s'effondre après l'ajout d'un label user_id. Why : cardinalité non anticipée. Better : labels à faible cardinalité uniquement ; IDs dans les logs.",
          },
          {
            label: "Logs en texte libre",
            value:
              "Problem : impossible de filtrer ou d'agréger les logs en incident. Why : `console.log` avec des phrases. Better : logs JSON structurés avec champs nommés.",
          },
          {
            label: "Pas de monitoring du monitoring",
            value:
              "Problem : Prometheus down depuis 3 jours, personne ne l'a vu. Why : le surveillant n'est pas surveillé. Better : auto-supervision + sonde externe (blackbox).",
          },
          {
            label: "Tracer 100 % en production",
            value:
              "Problem : facture de traces explosive, performances dégradées. Why : échantillonnage non configuré. Better : échantillonner (10 %), toujours 100 % des erreurs.",
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
      "Les règles qui distinguent une observabilité utile d'un empilement d'outils.",
    blocks: [
      {
        kind: "list",
        items: [
          "Commencez par les symptômes : disponibilité, erreurs, latence — avant l'infrastructure.",
          "Chaque alerte a un runbook, chaque runbook est testé.",
          "Métriques, logs, traces corrélés par le même trace_id : un seul fil pour l'enquête.",
          "Dashboards versionnés, alertes versionnées : l'observabilité est du code.",
          "SLO écrits et suivis : « ça marche » doit se chiffrer.",
          "Post-mortem sans blâme après chaque incident significatif, avec actions suivies.",
          "Revue régulière : dashboards inutilisés supprimés, alertes bruyantes corrigées, SLO ajustés.",
          "L'équipe qui construit est d'astreinte : la responsabilité suit le code.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 3,
    intro:
      "Quatre projets de difficulté croissante pour passer de la théorie à la pratique professionnelle.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Surveiller une machine",
        fields: [
          { label: "Compétences requises", value: "Linux, Docker" },
          { label: "Ce que vous construisez", value: "Prometheus + node_exporter + Grafana, dashboard CPU/mémoire/disque, alerte « machine down »" },
          { label: "Ce que vous apprenez", value: "Le modèle pull, PromQL de base, le cycle métrique → dashboard → alerte" },
          { label: "Difficulté attendue", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "Instrumenter une application" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Instrumenter une application",
        fields: [
          { label: "Compétences requises", value: "Un langage backend, PromQL" },
          { label: "Ce que vous construisez", value: "Endpoint /metrics avec compteurs et histogrammes, dashboard RED, alertes sur taux d'erreurs" },
          { label: "Ce que vous apprenez", value: "L'instrumentation, les percentiles, les alertes actionnables" },
          { label: "Difficulté attendue", value: "Moyenne — une semaine" },
          { label: "Projet suivant", value: "Logs et traces" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Les trois piliers corrélés",
        fields: [
          { label: "Compétences requises", value: "OpenTelemetry, Loki" },
          { label: "Ce que vous construisez", value: "Instrumentation OTel complète, logs Loki corrélés par trace_id, Tempo pour les traces, dashboards unifiés" },
          { label: "Ce que vous apprenez", value: "La corrélation métriques/logs/traces, l'échantillonnage" },
          { label: "Difficulté attendue", value: "Élevée — deux semaines" },
          { label: "Projet suivant", value: "SLO et on-call" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Programme SRE",
        fields: [
          { label: "Compétences requises", value: "Tout le programme : SLO, Alertmanager, Kubernetes" },
          { label: "Ce que vous construisez", value: "SLO avec budgets d'erreur, alertes multi-fenêtres, runbooks, rotation d'astreinte, post-mortems, stack sur Kubernetes" },
          { label: "Ce que vous apprenez", value: "L'observabilité comme discipline d'équipe, pas comme outillage" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "Chaos engineering (tester la résilience)" },
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
          { label: "Documentation Prometheus", value: "Concepts, PromQL, configuration, alerting — la référence complète." },
          { label: "Documentation Grafana", value: "Dashboards, variables, alerting unifié, corrélations." },
          { label: "Documentation OpenTelemetry", value: "Instrumentation par langage, Collector, sémantiques." },
          { label: "Livre SRE de Google", value: "Disponible en ligne : SLO, budgets d'erreur, on-call — la doctrine de référence." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : instrumenter vos propres projets — les métriques réelles enseignent mieux que les exemples.",
          "Référence : les dashboards communautaires Grafana comme point de départ (à adapter, pas à subir).",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Monitoring maîtrisé, voici les prolongements naturels dans la roadmap DevOps.",
    blocks: [
      {
        kind: "list",
        items: [
          "Déployer ce qu'on surveille : `kubernetes` — l'orchestrateur et sa service discovery.",
          "Fiabiliser la livraison : `ci-cd` — les métriques DORA du pipeline lui-même.",
          "Automatiser les remédiations : `scripting` — des runbooks manuels aux runbooks exécutables.",
          "Sécuriser la détection : `devsecops` — du monitoring technique à la détection d'intrusion.",
          "Revenir à la roadmap : valider Monitoring et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "profiling-continu",
    title: "Profiling continu",
    level: 3,
    intro:
      "Le quatrième pilier : savoir OÙ le CPU et la mémoire partent, en production.",
    blocks: [
      {
        kind: "text",
        text: "Le profiling continu (Pyroscope, Parca — Grafana) échantillonne en permanence les stacks d'exécution : on voit quelles fonctions consomment le CPU, en production, sur du vrai trafic. Là où les métriques disent « le CPU est à 90 % », le profiling dit « c'est cette fonction de sérialisation ».",
      },
      {
        kind: "list",
        items: [
          "Coût faible (échantillonnage ~1 %) : activable en permanence, pas seulement en debug.",
          "Corrélé aux déploiements : un pic de CPU qui apparaît avec la v2.3 désigne le coupable.",
          "Complète les traces : la trace dit quelle requête est lente, le profil dit quelle ligne de code.",
        ],
      },
    ],
  },
  {
    id: "rum",
    title: "RUM : la mesure côté utilisateur",
    level: 3,
    intro:
      "Vos sondes disent que ça va vite, vos utilisateurs que c'est lent : le RUM tranche.",
    blocks: [
      {
        kind: "text",
        text: "Le Real User Monitoring mesure la performance réelle côté navigateur/appareil : temps de chargement, Core Web Vitals, erreurs JS — segmentés par pays, appareil, navigateur. Les métriques serveur ne voient pas le réseau de l'utilisateur ni son téléphone : le RUM comble cet angle mort.",
      },
      {
        kind: "list",
        items: [
          "Synthétique (sondes) + RUM (réel) : les sondes détectent les pannes, le RUM mesure l'expérience.",
          "Les percentiles par segment (p75 mobile Afrique) révèlent ce que la moyenne mondiale cache.",
          "Échantillonnez et anonymisez : le RUM collecte des données d'usage — respectez la vie privée.",
        ],
      },
    ],
  },
  {
    id: "capacity-planning",
    title: "Planification de capacité",
    level: 3,
    intro:
      "Anticiper la croissance : quand faudra-t-il plus de ressources ?",
    blocks: [
      {
        kind: "text",
        text: "La planification de capacité utilise l'historique des métriques pour projeter : à ce rythme de croissance, le disque sera plein dans 4 mois, le pool de connexions saturera au prochain pic. C'est l'observabilité tournée vers l'avenir.",
      },
      {
        kind: "code",
        language: "text",
        title: "Projection avec predict_linear",
        code: "# Quand le disque sera-t-il plein ? (projection sur 7 jours)\npredict_linear(node_filesystem_avail_bytes[7d], 7*24*3600) < 0",
      },
      {
        kind: "list",
        items: [
          "`predict_linear` extrapole la tendance : parfait pour les alertes « disque plein dans N jours » au lieu de « disque à 90 % ».",
          "Distinguez croissance tendancielle et pics saisonniers : l'historique long évite les sur-provisionnements.",
          "La capacité se planifie aussi en coûts : le provisionnement suit la projection, pas la peur.",
        ],
      },
    ],
  },
  {
    id: "exemplars",
    title: "Exemplars : relier métriques et traces",
    level: 3,
    intro:
      "Du pic sur le graphe à la trace exacte : les exemplars.",
    blocks: [
      {
        kind: "text",
        text: "Les exemplars attachent des trace_id à des points de métriques : sur un pic de latence p99, un clic ouvre la trace de LA requête lente. Prometheus et OpenTelemetry supportent ce lien — c'est la couture entre le pilier métriques et le pilier traces, sans changer d'outil.",
      },
      {
        kind: "list",
        items: [
          "Activez les exemplars sur les histogrammes de latence : c'est là qu'ils sont le plus utiles.",
          "Grafana affiche le lien trace directement sur le graphe : l'enquête part du symptôme.",
          "Coût négligeable : quelques labels supplémentaires sur les buckets d'histogramme.",
        ],
      },
    ],
  },
  {
    id: "slo-burn-rate",
    title: "Alertes burn rate multi-fenêtres",
    level: 3,
    intro:
      "L'alerting SLO de précision : détecter vite sans bruit.",
    blocks: [
      {
        kind: "text",
        text: "La méthode Google SRE : deux alertes par SLO. Une alerte RAPIDE (fenêtre courte, ex. 1h) sur consommation brutale du budget — sévérité critique, ça brûle. Une alerte LENTE (fenêtre longue, ex. 6h) sur dérive progressive — sévérité warning, ça s'érode. La combinaison détecte vite les incidents réels et ignore les micro-pics.",
      },
      {
        kind: "code",
        language: "text",
        title: "Principe (expr simplifiée)",
        code: "# Taux d'erreur sur 1h vs budget : alerte si le budget\n# est consommé 14x plus vite que prévu\nsum(rate(http_requests_total{status=~\"5..\"}[1h]))\n/\nsum(rate(http_requests_total[1h]))\n> 14 * (1 - 0.999)",
      },
      {
        kind: "list",
        items: [
          "Le facteur multiplicatif (14x, 6x…) vient des tables SRE : il équilibre vitesse de détection et faux positifs.",
          "Réinitialisez après incident : le budget consommé ne doit pas réalimenter les alertes.",
          "C'est l'aboutissement du SLO : l'alerte parle budget d'erreur, pas seuils arbitraires.",
        ],
      },
    ],
  },
];

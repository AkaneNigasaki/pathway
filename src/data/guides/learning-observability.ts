import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'observabilité : de zéro à un usage
 * professionnel des logs, métriques et traces. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive. Tous les
 * textes supportent le code inline entre backticks. Commandes toujours
 * expliquées : label, commande, pourquoi, vérification.
 */
export const LEARNING_OBSERVABILITY: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est l'observabilité, pourquoi elle existe et ce qu'elle change par rapport au débogage local.",
    blocks: [
      {
        kind: "text",
        text: "L'observabilité regroupe les pratiques qui permettent de comprendre un système en production : logs structurés, métriques et traces distribuées. En local, on débogue avec un breakpoint ; en production, on ne peut pas arrêter le système pour l'inspecter — il faut des instruments qui racontent en continu ce qui s'y passe.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est indispensable : un bug en production ne se reproduit pas toujours en local, et les utilisateurs signalent les problèmes après coup. Sans observabilité, diagnostiquer c'est deviner. Avec, c'est suivre une piste : une alerte pointe un symptôme, un dashboard localise le service, les traces isolent la requête lente, les logs expliquent la cause.",
      },
      {
        kind: "diagram",
        title: "D'un incident à sa cause",
        lines: [
          "ALERTE (latence p99 anormale)",
          "   │",
          "   ▼",
          "DASHBOARD (quel service ? quel endpoint ?)",
          "   │",
          "   ▼",
          "TRACES (quelle requête lente, où passe le temps ?)",
          "   │",
          "   ▼",
          "LOGS (quelle erreur exacte, quel contexte ?)",
          "   │",
          "   ▼",
          "CAUSE → CORRECTIF",
        ],
      },
    ],
  },
  {
    id: "trois-piliers",
    title: "Les trois piliers",
    level: 1,
    intro:
      "Logs, métriques, traces : trois instruments complémentaires, pas interchangeables.",
    blocks: [
      {
        kind: "table",
        headers: ["Pilier", "Question posée", "Exemple"],
        rows: [
          ["Logs", "« Que s'est-il passé, exactement ? »", "Erreur 500 sur /paiement : stack trace + user_id"],
          ["Métriques", "« Combien, à quelle vitesse, depuis quand ? »", "Taux d'erreur passé de 0,1 % à 4 % à 14h02"],
          ["Traces", "« Où le temps est-il passé ? »", "La requête a passé 800ms dans une requête SQL sans index"],
        ],
      },
      {
        kind: "text",
        text: "Chaque pilier a son rôle : les métriques détectent (quelque chose change), les dashboards localisent (où), les traces isolent (quelle requête, quelle étape), les logs expliquent (pourquoi). Un système observable combine les trois, corrélés entre eux — par exemple via un identifiant de trace présent dans les logs et les spans.",
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
      "Ce qu'il faut maîtriser avant d'instrumenter un système, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Bases indispensables",
        fields: [
          {
            label: "API REST",
            value:
              "Instrumenter des handlers : savoir ce qu'est un endpoint, un code de statut, une latence — c'est ce qu'on mesure.",
          },
          {
            label: "Docker",
            value:
              "Prometheus et Grafana se lancent en conteneurs en local. Les logs des conteneurs sont la matière première de l'agrégation.",
          },
          {
            label: "Python",
            value:
              "Écrire l'instrumentation : logs structurés, compteurs de métriques, spans de tracing dans le code applicatif.",
          },
          {
            label: "HTTP et JSON",
            value:
              "Les métriques et l'API de Grafana transitent en HTTP ; les logs structurés sont du JSON — deux formats à lire couramment.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-prometheus",
    title: "Installer Prometheus",
    level: 2,
    intro:
      "Lancer Prometheus en local avec Docker : la base de métriques la plus répandue.",
    blocks: [
      {
        kind: "command",
        label: "Démarrer Prometheus",
        command: "docker run -d --name prometheus -p 9090:9090 prom/prometheus",
        why: "Lance le serveur Prometheus officiel : il collecte (scrape) les métriques exposées en HTTP par les applications et les stocke en séries temporelles. Le port 9090 expose l'interface web avec l'explorateur de requêtes. La configuration par défaut suffit pour découvrir l'outil.",
        verify: "curl -s http://localhost:9090/-/healthy",
      },
      {
        kind: "text",
        text: "Ouvrez `http://localhost:9090` : l'interface propose un champ de requête (PromQL) et un onglet Status → Targets qui liste les cibles surveillées. Pour l'instant, Prometheus ne surveille que lui-même — c'est normal, on y branchera une application juste après.",
      },
    ],
  },
  {
    id: "installation-grafana",
    title: "Installer Grafana",
    level: 2,
    intro:
      "Lancer Grafana en local : la visualisation des métriques et des logs.",
    blocks: [
      {
        kind: "command",
        label: "Démarrer Grafana",
        command: "docker run -d --name grafana -p 3000:3000 grafana/grafana",
        why: "Lance Grafana, l'outil de dashboards le plus répandu : il se connecte à Prometheus (et à d'autres sources) pour afficher les métriques en graphiques. Le port 3000 est le port web standard de Grafana.",
        verify: "curl -s http://localhost:3000/api/health",
      },
      {
        kind: "text",
        text: "Connectez-vous sur `http://localhost:3000` avec `admin` / `admin` (mot de passe à changer à la première connexion). Ajoutez ensuite une data source Prometheus pointant sur `http://localhost:9090` — si Grafana tourne dans Docker et Prometheus aussi, utilisez l'adresse du conteneur ou `host.docker.internal` selon votre réseau.",
      },
    ],
  },
  {
    id: "logs-structures",
    title: "Premiers logs structurés",
    level: 2,
    intro:
      "Passer du `print` aux logs structurés en JSON : la base de tout diagnostic.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "app.py — logs JSON avec la stdlib",
        code: `import json
import logging
import sys

handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(logging.Formatter("%(message)s"))
logger = logging.getLogger("api")
logger.addHandler(handler)
logger.setLevel(logging.INFO)

def log_event(level, event, **fields):
    record = {"level": level, "event": event, "service": "api", **fields}
    logger.log(getattr(logging, level), json.dumps(record))

# Usage : chaque log est une ligne JSON requêtable
log_event("INFO", "request_completed",
          method="GET", path="/articles", status=200, duration_ms=42)
log_event("ERROR", "payment_failed",
          user_id="u_123", amount=1999, error="card_declined")`,
      },
      {
        kind: "text",
        text: "Pourquoi le JSON : une ligne de texte libre (`Échec paiement user 123`) se lit bien mais ne se requête pas. En JSON avec des champs normalisés (`level`, `service`, `user_id`), on filtre (`level=ERROR`), on compte (erreurs par heure) et on corrèle (tous les logs d'un `user_id` ou d'un `trace_id`). C'est la différence entre lire des logs et les interroger.",
      },
    ],
  },
  {
    id: "premieres-metriques",
    title: "Premières métriques",
    level: 2,
    intro:
      "Exposer des métriques depuis une application Python avec le client officiel Prometheus.",
    blocks: [
      {
        kind: "command",
        label: "Installer le client Prometheus pour Python",
        command: "pip install prometheus_client",
        why: "`prometheus_client` est la bibliothèque officielle : elle fournit les compteurs, jauges et histogrammes, et expose l'endpoint HTTP `/metrics` que Prometheus vient scraper.",
        verify: "python3 -c \"import prometheus_client; print(prometheus_client.__version__)\"",
      },
      {
        kind: "code",
        language: "python",
        title: "metrics_demo.py — compteur, jauge, histogramme",
        code: `from prometheus_client import Counter, Gauge, Histogram, start_http_server
import random
import time

# Compteur : ne fait qu'augmenter (requêtes, erreurs)
REQUESTS = Counter("http_requests_total", "Requêtes reçues", ["method", "status"])
# Jauge : monte et descend (connexions actives, taille de file)
IN_FLIGHT = Gauge("http_requests_in_flight", "Requêtes en cours")
# Histogramme : distribution des durées (latence)
LATENCY = Histogram("http_request_duration_seconds", "Durée des requêtes")

start_http_server(8000)  # expose /metrics sur le port 8000

while True:
    IN_FLIGHT.inc()
    start = time.time()
    time.sleep(random.uniform(0.01, 0.2))  # simulation de traitement
    LATENCY.observe(time.time() - start)
    REQUESTS.labels(method="GET", status="200").inc()
    IN_FLIGHT.dec()`,
      },
      {
        kind: "text",
        text: "Ouvrez `http://localhost:8000/metrics` : vous voyez les séries en format texte Prometheus. Ajoutez cette cible à Prometheus (fichier de config ou découverte), et les courbes apparaissent dans Grafana. Les trois types couvrent 90 % des besoins : compter des événements, mesurer un état, distribuer des durées.",
      },
    ],
  },
  {
    id: "premier-dashboard",
    title: "Premier dashboard",
    level: 2,
    intro:
      "Construire un dashboard utile : les bons graphiques, dans le bon ordre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Connecter la source",
            detail:
              "Dans Grafana : Configuration → Data sources → Add → Prometheus, URL `http://localhost:9090`, Save & Test doit répondre « Data source is working ».",
          },
          {
            title: "Créer le dashboard",
            detail:
              "Dashboards → New → Add visualization, choisir la source Prometheus. Chaque panneau = une requête PromQL + un type de graphique.",
          },
          {
            title: "Panneau trafic",
            detail:
              "Requête `sum(rate(http_requests_total[5m]))` en graphique temporel : le débit de requêtes par seconde, la courbe de vie du service.",
          },
          {
            title: "Panneau erreurs",
            detail:
              "Requête `sum(rate(http_requests_total{status=~\"5..\"}[5m]))` : le taux d'erreurs 5xx. À côté du trafic, on voit si les erreurs suivent la charge.",
          },
          {
            title: "Panneau latence",
            detail:
              "Requête `histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))` : la latence p99 — le temps que subissent les 1 % les plus lents.",
          },
          {
            title: "Ordonner et titrer",
            detail:
              "En haut : la santé (trafic, erreurs, latence) — la méthode RED. En dessous : le détail par endpoint. Un dashboard se lit en 5 secondes ou il est raté.",
          },
        ],
      },
    ],
  },
  {
    id: "premiers-spans",
    title: "Premiers spans de tracing",
    level: 2,
    intro:
      "Comprendre le tracing distribué en créant des spans manuellement, sans infrastructure.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "tracing_demo.py — spans avec OpenTelemetry",
        code: `from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import ConsoleSpanExporter, SimpleSpanProcessor
import time

provider = TracerProvider()
provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter()))
trace.set_tracer_provider(provider)
tracer = trace.get_tracer("demo")

with tracer.start_as_current_span("traiter_commande") as span:
    span.set_attribute("commande_id", "c_42")
    with tracer.start_as_current_span("verifier_stock"):
        time.sleep(0.05)  # appel au service stock
    with tracer.start_as_current_span("calculer_total"):
        time.sleep(0.02)  # calcul local`,
      },
      {
        kind: "text",
        text: "Chaque `with` crée un span : une opération nommée, horodatée, imbriquée dans son parent. L'export console affiche l'arbre — en production, ces spans partent vers un collecteur (Jaeger, Tempo) qui reconstitue la trace complète d'une requête à travers les services. Le concept à retenir : une trace = l'histoire d'une requête, un span = un chapitre.",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "Les réflexes d'une équipe qui prend l'observabilité au sérieux.",
    blocks: [
      {
        kind: "list",
        items: [
          "Instrumenter en écrivant la feature, pas après : chaque nouvel endpoint naît avec ses logs, ses métriques et ses spans.",
          "Corréler par `trace_id` : le même identifiant dans les logs, les spans et les métriques permet de passer de l'un à l'autre en un clic.",
          "Dashboards versionnés : les dashboards vivent dans Git (JSON Grafana), relus en revue comme le code.",
          "Alertes sur les symptômes utilisateurs (taux d'erreur, latence), pas sur les causes internes (CPU à 80 %) — on alerte sur ce que subit l'utilisateur.",
          "Post-mortem sans blame : chaque incident améliore l'instrumentation — le dashboard qui manquait est créé avant de clore l'incident.",
        ],
      },
    ],
  },
  {
    id: "outils-ecosysteme",
    title: "L'écosystème des outils",
    level: 2,
    intro:
      "Qui fait quoi : se repérer parmi les noms, sans se noyer.",
    blocks: [
      {
        kind: "fields",
        title: "Les rôles et leurs représentants",
        fields: [
          {
            label: "Collecte de métriques",
            value: "Prometheus (pull : il vient chercher les métriques). Standard du cloud-native, langage de requête PromQL.",
          },
          {
            label: "Visualisation",
            value: "Grafana (dashboards). Se branche sur Prometheus, logs, traces — le tableau de bord unique.",
          },
          {
            label: "Instrumentation",
            value: "OpenTelemetry : le standard vendor-neutral pour générer logs, métriques et traces depuis le code.",
          },
          {
            label: "Stockage des traces",
            value: "Jaeger, Tempo : conservent et affichent les traces distribuées reconstituées.",
          },
          {
            label: "Agrégation de logs",
            value: "Loki, Elasticsearch : centralisent les logs de tous les services pour les requêter.",
          },
          {
            label: "Alerting",
            value: "Alertmanager (écosystème Prometheus) : route les alertes vers email, Slack, PagerDuty selon des règles.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pas besoin de tout déployer pour commencer : Prometheus + Grafana + logs JSON couvrent l'essentiel. OpenTelemetry devient pertinent dès que plusieurs services communiquent. Le reste s'ajoute quand le besoin est réel, pas avant.",
      },
    ],
  },
  {
    id: "debugging-observabilite",
    title: "Déboguer avec l'observabilité",
    level: 2,
    intro:
      "La méthode pas à pas quand une alerte se déclenche.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire l'alerte",
            detail:
              "Que dit-elle exactement ? Quel seuil, depuis quand, sur quel service ? Une alerte bien écrite contient déjà le lien vers le dashboard concerné.",
          },
          {
            title: "Ouvrir le dashboard",
            detail:
              "Regarder RED : le taux d'erreur et la latence ont-ils bougé en même temps que le trafic ? Un pic d'erreur sans pic de trafic = bug déployé ; avec pic de trafic = surcharge.",
          },
          {
            title: "Isoler le périmètre",
            detail:
              "Un seul endpoint ? Un seul service ? Une seule région ? Filtrer par labels jusqu'à ce que le problème soit circonscrit.",
          },
          {
            title: "Prendre une trace lente",
            detail:
              "Ouvrir une trace représentative : quel span consomme le temps ? Base de données, appel externe, sérialisation ?",
          },
          {
            title: "Lire les logs corrélés",
            detail:
              "Avec le `trace_id` ou la fenêtre temporelle, lire les logs d'erreur : la stack trace et le contexte donnent la cause.",
          },
          {
            title: "Corriger et vérifier",
            detail:
              "Après le correctif, vérifier sur le dashboard que les courbes reviennent à la normale — l'observabilité sert aussi à valider le fix.",
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
      "Quatre projets de difficulté croissante pour passer de la théorie à la pratique professionnelle.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — API instrumentée",
        fields: [
          { label: "Ce qu'on construit", value: "Une API avec logs JSON, métriques Prometheus et dashboard Grafana" },
          { label: "Ce qu'on apprend", value: "Les trois types de métriques, un dashboard RED lisible" },
          { label: "Difficulté", value: "Faible — une journée" },
          { label: "Projet suivant", value: "Alertes pertinentes" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Alertes pertinentes",
        fields: [
          { label: "Ce qu'on construit", value: "Règles d'alerte sur taux d'erreur et latence p99, routage vers un canal" },
          { label: "Ce qu'on apprend", value: "Seuils, fenêtres, éviter le bruit — une alerte qui ne sert pas est désactivée" },
          { label: "Difficulté", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Tracing sur 3 services" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Tracing distribué",
        fields: [
          { label: "Ce qu'on construit", value: "Trois services avec propagation de contexte OpenTelemetry de bout en bout" },
          { label: "Ce qu'on apprend", value: "Spans, propagation W3C, corrélation logs-traces" },
          { label: "Difficulté", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "SLO et gestion d'incident" },
        ],
      },
      {
        kind: "fields",
        title: "Expert — SLO et runbook",
        fields: [
          { label: "Ce qu'on construit", value: "SLO définis, budget d'erreur suivi, runbook d'incident testé en exercice" },
          { label: "Ce qu'on apprend", value: "Piloter la fiabilité comme un produit, pas comme une contrainte" },
          { label: "Difficulté", value: "Élevée — deux semaines" },
          { label: "Projet suivant", value: "Chaos engineering (voir System Design)" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "niveaux-logs",
    title: "Niveaux de logs",
    level: 3,
    intro:
      "Choisir le bon niveau : un log au mauvais niveau est un log inutile ou un log manqué.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux et leur usage",
        fields: [
          {
            label: "DEBUG",
            value: "Détail d'exécution pour le développeur. Désactivé en production par défaut — trop verbeux, jamais alerté.",
          },
          {
            label: "INFO",
            value: "Événements normaux significatifs : démarrage, requête traitée, tâche terminée. La pulsation du système.",
          },
          {
            label: "WARNING",
            value: "Anormal mais géré : retry, valeur par défaut utilisée, dégradation. À surveiller en tendance, pas à alerter un par un.",
          },
          {
            label: "ERROR",
            value: "Échec d'une opération : requête en erreur, exception rattrapée. Chaque ERROR doit être explicable et actionnable.",
          },
          {
            label: "CRITICAL",
            value: "Le service ne peut plus fonctionner : base injoignable au démarrage, état incohérent. Alerte immédiate.",
          },
        ],
      },
      {
        kind: "text",
        text: "Deux règles : un log ERROR sans contexte (qui, quoi, quelles données) ne sert à rien — et un WARNING qui n'est jamais regardé devrait être un INFO. Le niveau exprime l'urgence de l'action humaine attendue, pas la gravité ressentie par le développeur.",
      },
    ],
  },
  {
    id: "correlation-logs",
    title: "Corrélation des logs",
    level: 3,
    intro:
      "Relier les logs entre eux : sans corrélation, des milliers de lignes restent du bruit.",
    blocks: [
      {
        kind: "text",
        text: "Dans un système à plusieurs services, une requête génère des dizaines de lignes de logs éparpillées. La corrélation consiste à propager des identifiants : `trace_id` (unique par requête, traversant tous les services), `user_id`, `request_id`. Filtrer sur un `trace_id`, c'est reconstituer l'histoire complète d'une requête en une requête.",
      },
      {
        kind: "code",
        language: "python",
        title: "Propager un request_id dans les logs",
        code: `import contextvars
import json
import logging

request_id = contextvars.ContextVar("request_id", default="-")

class CorrelationFilter(logging.Filter):
    def filter(self, record):
        record.request_id = request_id.get()
        return True

logger = logging.getLogger("api")
logger.addFilter(CorrelationFilter())
# Format JSON incluant %(request_id)s dans chaque ligne

# Dans le middleware HTTP :
# request_id.set(générer_un_uuid())
# Chaque log de la requête porte alors le même request_id.`,
      },
    ],
  },
  {
    id: "types-metriques",
    title: "Types de métriques",
    level: 3,
    intro:
      "Compteur, jauge, histogramme : choisir le bon type, car chacun ne sait faire qu'une chose.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre types Prometheus",
        fields: [
          {
            label: "Counter",
            value: "Ne fait qu'augmenter (avec reset au redémarrage). Pour : requêtes, erreurs, tâches traitées. Jamais pour une valeur qui descend.",
          },
          {
            label: "Gauge",
            value: "Monte et descend. Pour : connexions actives, taille de file, température, pourcentage de disque.",
          },
          {
            label: "Histogram",
            value: "Compte les observations par tranche (buckets). Pour : latences, tailles de réponses. Permet les quantiles (p50, p99).",
          },
          {
            label: "Summary",
            value: "Quantiles calculés côté client. Similaire à l'histogramme mais non agrégeable entre instances — préférer l'histogramme.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'erreur classique : mesurer une latence avec une jauge (on ne garde que la dernière valeur, les pics disparaissent) ou un taux d'erreur avec un compteur brut (sans `rate()`, un compteur ne dit rien). Le type contraint ce qu'on pourra calculer ensuite — le choisir, c'est déjà concevoir le dashboard.",
      },
    ],
  },
  {
    id: "promql-bases",
    title: "Bases de PromQL",
    level: 3,
    intro:
      "Le langage de requête de Prometheus : les quelques fonctions qui couvrent l'essentiel.",
    blocks: [
      {
        kind: "fields",
        title: "Fonctions indispensables",
        fields: [
          {
            label: "rate()",
            value: "`rate(http_requests_total[5m])` : requêtes par seconde sur 5 minutes. Transforme un compteur en débit — la fonction la plus utilisée.",
          },
          {
            label: "sum by()",
            value: "`sum by (status) (rate(http_requests_total[5m]))` : agrège par label. Sans `by`, on mélange tout.",
          },
          {
            label: "histogram_quantile()",
            value: "`histogram_quantile(0.99, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))` : la latence p99.",
          },
          {
            label: "increase()",
            value: "`increase(http_errors_total[1h])` : combien d'erreurs sur la dernière heure, en valeur absolue.",
          },
        ],
      },
      {
        kind: "text",
        text: "Deux pièges : `rate()` sur une fenêtre trop courte donne des courbes bruitées, trop longue des courbes lissées qui masquent les incidents — 5 minutes est un bon défaut. Et les labels à forte cardinalité (un label `user_id` avec un million de valeurs) explosent la base : les labels décrivent des dimensions stables (endpoint, statut, région), jamais des identifiants uniques.",
      },
    ],
  },
  {
    id: "red-use",
    title: "Méthodes RED et USE",
    level: 3,
    intro:
      "Deux grilles de lecture pour savoir quelles métriques collecter : RED pour les services, USE pour les ressources.",
    blocks: [
      {
        kind: "fields",
        title: "RED — pour chaque service",
        fields: [
          { label: "Rate", value: "Le débit : requêtes par seconde. Le service reçoit-il du trafic ?" },
          { label: "Errors", value: "Le taux d'erreurs : proportion de requêtes en échec. Le service fait-il son travail ?" },
          { label: "Duration", value: "La latence : p50, p95, p99. Le service est-il assez rapide ?" },
        ],
      },
      {
        kind: "fields",
        title: "USE — pour chaque ressource",
        fields: [
          { label: "Utilization", value: "Quel pourcentage de la ressource est utilisé ? (CPU à 70 %)" },
          { label: "Saturation", value: "Y a-t-il une file d'attente ? (requêtes en attente de threads)" },
          { label: "Errors", value: "La ressource échoue-t-elle ? (erreurs disque, timeouts réseau)" },
        ],
      },
      {
        kind: "text",
        text: "RED répond « les utilisateurs sont-ils impactés ? », USE répond « pourquoi la machine souffre-t-elle ? ». En incident, on commence par RED (le symptôme), on descend vers USE (la cause matérielle). Un dashboard par service suit RED ; un dashboard d'infrastructure suit USE.",
      },
    ],
  },
  {
    id: "alerting",
    title: "Alerting",
    level: 3,
    intro:
      "Des alertes utiles : ni silencieuses quand ça casse, ni bruyantes quand tout va bien.",
    blocks: [
      {
        kind: "text",
        text: "Une bonne alerte a quatre propriétés : elle signale un symptôme utilisateur (pas une cause interne), elle est actionnable (on sait quoi faire en la recevant), elle a un seuil calibré (ni trop sensible ni aveugle), et elle contient le contexte (lien dashboard, runbook). Tout le reste est du bruit — et le bruit tue l'alerting : après dix fausses alertes, on ignore la onzième, qui était la vraie.",
      },
      {
        kind: "list",
        items: [
          "Alerter sur le taux d'erreur et la latence p99 (symptômes), pas sur le CPU (cause possible parmi d'autres).",
          "Fenêtres et durées : une alerte qui se déclenche après 5 minutes au-dessus du seuil évite les pics d'une seconde.",
          "Sévérités : page (humain réveillé) uniquement si l'utilisateur est impacté maintenant ; ticket sinon.",
          "Routage : la bonne équipe, avec le bon runbook — une alerte sans responsable assigné n'est pas traitée.",
          "Revue régulière : chaque alerte qui n'a servi à rien est recalibrée ou supprimée.",
        ],
      },
    ],
  },
  {
    id: "spans-contexte",
    title: "Spans et propagation du contexte",
    level: 3,
    intro:
      "Comment une trace traverse les services : la propagation, le mécanisme central du tracing distribué.",
    blocks: [
      {
        kind: "text",
        text: "Quand le service A appelle le service B en HTTP, il injecte le contexte de trace dans les en-têtes (standard W3C Trace Context : `traceparent`). B l'extrait et crée ses spans comme enfants : la trace reste un arbre unique malgré les sauts réseau. Sans propagation, chaque service produit des traces orphelines — on voit des morceaux, jamais l'histoire.",
      },
      {
        kind: "diagram",
        title: "Propagation du contexte",
        lines: [
          "Service A                          Service B",
          "  span « traiter »                   span « requêter base »",
          "       │  trace_id=abc, span_id=1         │",
          "       │  ── traceparent ──────────────►  │",
          "       │        (en-tête HTTP)            │  enfant de span_id=1",
          "       │                                 │",
          "  └──── Trace abc : traiter ─┬─ requêter base",
          "                             └─ (autres spans…)",
        ],
      },
      {
        kind: "text",
        text: "En pratique avec OpenTelemetry, l'instrumentation des frameworks HTTP fait la propagation automatiquement — à condition d'utiliser les bibliothèques instrumentées des deux côtés. Le cas qui casse tout : les appels via des clients HTTP artisanaux ou des files de messages sans propagation manuelle du contexte.",
      },
    ],
  },
  {
    id: "echantillonnage",
    title: "Échantillonnage des traces",
    level: 3,
    intro:
      "On ne peut pas tout stocker : choisir quelles traces garder sans perdre l'information utile.",
    blocks: [
      {
        kind: "text",
        text: "À fort trafic, stocker 100 % des traces coûte trop cher en stockage et en performance. L'échantillonnage décide à l'entrée : head-based (décision au début, ex. 1 % des requêtes) ou tail-based (décision à la fin, en gardant les traces intéressantes — erreurs, lenteurs). Le tail-based est supérieur mais exige de bufferiser les spans avant décision.",
      },
      {
        kind: "list",
        items: [
          "Toujours garder 100 % des erreurs : une erreur échantillonnée à 1 % est une erreur invisible.",
          "Échantillonner les succès agressivement : 1 % suffit pour les analyses de performance.",
          "Échantillonnage adaptatif : baisser le taux quand le trafic monte, pour un volume de stockage constant.",
          "Les métriques restent exhaustives : l'échantillonnage ne concerne que les traces, jamais les compteurs.",
        ],
      },
    ],
  },
  {
    id: "sli-slo",
    title: "SLI, SLO et budget d'erreur",
    level: 3,
    intro:
      "Formaliser « assez fiable » : des objectifs mesurables au lieu d'impressions.",
    blocks: [
      {
        kind: "fields",
        title: "Le vocabulaire de la fiabilité",
        fields: [
          {
            label: "SLI",
            value: "Service Level Indicator : la mesure (ex. proportion de requêtes < 200ms sur 30 jours). Ce qu'on mesure vraiment.",
          },
          {
            label: "SLO",
            value: "Service Level Objective : la cible (ex. 99,9 % des requêtes < 200ms). Le contrat interne.",
          },
          {
            label: "SLA",
            value: "Service Level Agreement : le contrat client, avec pénalités. Toujours moins exigeant que le SLO interne.",
          },
          {
            label: "Budget d'erreur",
            value: "La marge : 99,9 % de SLO = 0,1 % d'erreurs autorisées (43 min/mois). Tant qu'il reste du budget, on peut déployer vite ; épuisé, on stabilise.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le budget d'erreur transforme un débat d'opinion (« on ne peut plus déployer, c'est trop risqué ») en arbitrage chiffré. Il se consomme avec les incidents et les déploiements risqués, et se reconstitue avec le temps. L'alerting sur le taux de consommation du budget (burn rate) prévient avant l'épuisement.",
      },
    ],
  },
  {
    id: "dashboards-design",
    title: "Concevoir des dashboards",
    level: 3,
    intro:
      "Un dashboard est une interface : il se conçoit pour une question, pas comme un inventaire de graphiques.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un dashboard = une question : « le service va-t-il bien ? », « où est le goulot ? ». Pas de dashboard fourre-tout.",
          "Hiérarchie : en haut les indicateurs de santé (RED), en dessous le détail par endpoint, en bas l'infrastructure (USE).",
          "Cohérence temporelle : tous les panneaux sur la même fenêtre, sinon on compare l'incomparable.",
          "Seuils visuels : lignes de SLO sur les graphiques — on voit d'un coup d'œil si on est dans le contrat.",
          "Moins de panneaux, plus de sens : 6 graphiques qui répondent valent mieux que 30 qui décorent.",
          "Variables : un sélecteur d'environnement/région rend un dashboard réutilisable au lieu d'en dupliquer dix.",
        ],
      },
    ],
  },
  {
    id: "cardinalite",
    title: "Cardinalité des labels",
    level: 3,
    intro:
      "Le piège de performance numéro un de Prometheus : trop de séries temporelles.",
    blocks: [
      {
        kind: "text",
        text: "Chaque combinaison de labels crée une série temporelle en mémoire. Un label `path` avec 50 routes × un label `status` avec 5 valeurs = 250 séries : raisonnable. Ajouter `user_id` avec 100 000 valeurs = 25 millions de séries : Prometheus s'effondre. La règle : les labels décrivent des dimensions à cardinalité bornée et stable (méthode, statut, endpoint normalisé, région).",
      },
      {
        kind: "text",
        text: "Normaliser les endpoints : `/articles/123` et `/articles/456` doivent alimenter le label `/articles/:id`, sinon chaque article crée ses séries. C'est l'instrumentation (le code qui nomme la route) qui doit fournir le patron, pas l'URL brute.",
      },
    ],
  },
  {
    id: "logs-agregation",
    title: "Agréger les logs",
    level: 3,
    intro:
      "Centraliser les logs de tous les services : l'architecture et les pièges.",
    blocks: [
      {
        kind: "text",
        text: "En production, les logs vivent sur des dizaines de conteneurs éphémères : il faut les collecter (agent sur chaque nœud), les transporter (buffer pour absorber les pics), les indexer (recherche plein texte et par champs) et les requêter (interface unique). Sans agrégation, un incident sur 20 services = 20 connexions SSH et des logs déjà supprimés avec les conteneurs.",
      },
      {
        kind: "list",
        items: [
          "Ne jamais logger de secrets : mots de passe, tokens, clés API — un log agrégé est lu par beaucoup de monde et conservé longtemps.",
          "Données personnelles : anonymiser ou pseudonymiser — les logs sont des données à caractère personnel dès qu'ils contiennent des identifiants.",
          "Rétention calibrée : 30 jours de logs détaillés puis agrégation, pas des années de texte brut qui coûtent une fortune.",
          "Logs d'audit séparés : qui a fait quoi (connexions, modifications sensibles) — immuables, conservés plus longtemps, accès restreint.",
        ],
      },
    ],
  },
  {
    id: "couts-observabilite",
    title: "Maîtriser les coûts",
    level: 3,
    intro:
      "L'observabilité a un coût : le piloter au lieu de le découvrir sur la facture.",
    blocks: [
      {
        kind: "list",
        items: [
          "Les trois postes : stockage (métriques, logs, traces), ingestion (volume écrit), requêtes (dashboards consultés).",
          "Rétentions différenciées : métriques haute résolution 15 jours puis downsampling, logs 30 jours, traces échantillonnées.",
          "Filtrer à la source : ne pas ingérer les logs DEBUG ni les health checks — le moins cher est ce qu'on ne collecte pas.",
          "Downsampling : agréger les vieilles métriques (1 point/minute au lieu de 1/seconde) — le détail vieux d'un mois sert rarement.",
          "Alerter sur le coût : suivre le volume ingéré par service comme une métrique — un service qui logge 10× plus que les autres a un problème.",
        ],
      },
    ],
  },
  {
    id: "incidents-runbook",
    title: "Gérer un incident",
    level: 3,
    intro:
      "L'observabilité ne sert que si l'organisation sait s'en servir sous pression.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Détecter",
            detail:
              "L'alerte se déclenche sur un symptôme (taux d'erreur, latence). Elle désigne un responsable et pointe le dashboard.",
          },
          {
            title: "Qualifier",
            detail:
              "Impact utilisateur ? Périmètre (un endpoint, un service, une région) ? Sévérité selon la grille définie à froid.",
          },
          {
            title: "Mitiger",
            detail:
              "D'abord réduire l'impact : rollback, bascule, désactivation de la feature. Comprendre la cause vient après — l'utilisateur ne peut pas attendre.",
          },
          {
            title: "Diagnostiquer",
            detail:
              "Dashboard → traces → logs : la méthode de cette page, avec le runbook du service comme guide.",
          },
          {
            title: "Résoudre et vérifier",
            detail:
              "Correctif déployé, courbes revenues à la normale sur le dashboard, alerte résolue.",
          },
          {
            title: "Post-mortem",
            detail:
              "Sans blame : timeline factuelle, cause racine, actions (dont améliorer l'instrumentation qui a manqué). Partagé à l'équipe.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-observabilite",
    title: "Tester l'observabilité",
    level: 3,
    intro:
      "L'instrumentation aussi se teste : une alerte qui ne se déclenche jamais est un bug silencieux.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tester les règles d'alerte : injecter une erreur et vérifier que l'alerte part (et que le runbook est à jour).",
          "Vérifier les dashboards après chaque changement d'instrumentation : un label renommé casse les requêtes.",
          "Chaos contrôlé : tuer un conteneur en staging et chronométrer la détection — le MTTD (temps moyen de détection) est une métrique.",
          "Revue des alertes : chaque incident relit les alertes — celles qui n'ont pas aidé sont recalibrées.",
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
            label: "Logger en texte libre",
            value:
              "Problem : des logs illisibles par machine, impossibles à filtrer. Why : habitude du `print`. Better : JSON structuré avec champs normalisés.",
          },
          {
            label: "Alerter sur le CPU",
            value:
              "Problem : des pages à 3h du matin pour un CPU à 90 % sans impact utilisateur. Why : confondre cause et symptôme. Better : alerter sur taux d'erreur et latence.",
          },
          {
            label: "Trop d'alertes",
            value:
              "Problem : fatigue d'alerte, les vraies sont ignorées. Why : chaque équipe ajoute les siennes sans revue. Better : chaque alerte est actionnable, avec responsable et runbook.",
          },
          {
            label: "Labels à haute cardinalité",
            value:
              "Problem : Prometheus saturé en mémoire. Why : un label `user_id` ou une URL non normalisée. Better : dimensions bornées uniquement.",
          },
          {
            label: "Secrets dans les logs",
            value:
              "Problem : tokens et mots de passe persistés et lisibles par toute l'équipe. Why : loggé « pour débugger ». Better : ne jamais logger de secret, filtrer à la source.",
          },
          {
            label: "Dashboards sans question",
            value:
              "Problem : 40 panneaux que personne ne regarde. Why : ajoutés au fil de l'eau. Better : un dashboard = une question, relu et élagué.",
          },
          {
            label: "Tracing sans propagation",
            value:
              "Problem : des traces orphelines par service, jamais d'arbre complet. Why : clients HTTP non instrumentés. Better : vérifier la propagation de bout en bout.",
          },
          {
            label: "Instrumenter après coup",
            value:
              "Problem : l'incident arrive avant les instruments. Why : « on verra plus tard ». Better : l'instrumentation fait partie de la définition de fini.",
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
      "Les habitudes d'une équipe qui diagnostique en minutes, pas en heures.",
    blocks: [
      {
        kind: "list",
        items: [
          "Corréler les trois piliers par `trace_id` : passer du dashboard à la trace au log en un clic.",
          "Des SLO écrits et suivis : la fiabilité devient un objectif mesurable, pas un vœu.",
          "Des runbooks à jour : chaque alerte pointe une procédure testée, pas une page blanche.",
          "Des post-mortems systématiques : chaque incident améliore l'instrumentation.",
          "Des coûts suivis : le volume de données observées est une métrique comme les autres.",
          "La simplicité d'abord : Prometheus + Grafana + logs JSON avant tout empilement sophistiqué.",
        ],
      },
    ],
  },
  {
    id: "glossaire",
    title: "Glossaire",
    level: 3,
    intro:
      "Le vocabulaire de l'observabilité, en une page.",
    blocks: [
      {
        kind: "fields",
        title: "Termes essentiels",
        fields: [
          { label: "Log structuré", value: "Ligne de log en JSON avec champs normalisés, requêtable." },
          { label: "Métrique", value: "Valeur numérique agrégée dans le temps (compteur, jauge, histogramme)." },
          { label: "Trace", value: "Histoire complète d'une requête à travers les services." },
          { label: "Span", value: "Une opération nommée dans une trace, avec durée et attributs." },
          { label: "SLO", value: "Objectif de fiabilité chiffré (ex. 99,9 % < 200ms)." },
          { label: "SLI", value: "La mesure réelle derrière le SLO." },
          { label: "Budget d'erreur", value: "La marge d'échec autorisée par le SLO." },
          { label: "RED", value: "Rate, Errors, Duration : les trois métriques de santé d'un service." },
          { label: "USE", value: "Utilization, Saturation, Errors : les trois métriques d'une ressource." },
          { label: "Lag", value: "Retard entre production et consommation d'un signal." },
          { label: "Cardinalité", value: "Nombre de combinaisons de labels — le coût caché des métriques." },
          { label: "Runbook", value: "Procédure écrite pour diagnostiquer et traiter un incident connu." },
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
            label: "OpenTelemetry — documentation",
            value: "opentelemetry.io/docs : concepts, instrumentation par langage, collecteur.",
          },
          {
            label: "Prometheus — documentation",
            value: "prometheus.io/docs : concepts, PromQL, alerting, bonnes pratiques d'instrumentation.",
          },
          {
            label: "Grafana — documentation",
            value: "grafana.com/docs : dashboards, data sources, alerting.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les projets progressifs de cette page sur une application réelle.",
          "Approfondissement : la compétence System Design pour intégrer l'observabilité à l'architecture.",
          "Méthode : la littérature SRE (Google) pour les SLO et la gestion des incidents à grande échelle.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'observabilité maîtrisée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Concevoir : `system-design` — intégrer l'observabilité dès la conception (SLO, instrumentation, runbooks).",
          "Découpler : `messaging` — superviser les files : lag des consommateurs, taille des DLQ.",
          "Déployer : `docker` — collecter et agréger les logs des conteneurs vers une plateforme centrale.",
          "Fiabiliser : `testing-api` — tester les alertes et valider l'instrumentation en intégration.",
          "Revenir à la roadmap : valider `observability` et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "instrumentation-bonnes-pratiques",
    title: "Bien instrumenter son code",
    level: 3,
    intro:
      "L'instrumentation est un acte de conception : quoi mesurer, nommer et logger.",
    blocks: [
      {
        kind: "list",
        items: [
          "Instrumenter les frontières : chaque entrée HTTP, chaque appel externe, chaque requête lente — c'est là que le temps se perd.",
          "Nommage stable : `http_requests_total`, pas `reqCount` — snake_case, unité en suffixe (`_seconds`, `_bytes`, `_total`), préfixe par domaine.",
          "Attributs utiles sur les spans : `user_id`, `order_id`, paramètres de la requête — ce qu'on voudra filtrer pendant l'incident.",
          "Ne pas logger les payloads entiers : quelques champs clés suffisent — le reste coûte cher et fuit des données.",
          "L'instrumentation a un coût CPU : mesurer l'overhead en charge — au-delà de 5 %, on échantillonne ou on allège.",
        ],
      },
    ],
  },
  {
    id: "choisir-pilier",
    title: "Quel pilier pour quel besoin",
    level: 3,
    intro:
      "Face à un problème, choisir le bon instrument au lieu de tout regarder.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Premier réflexe", "Pourquoi"],
        rows: [
          ["Latence en hausse", "Traces : une requête lente", "Localise l'étape coûteuse"],
          ["Erreurs en hausse", "Logs filtrés sur la fenêtre", "Donne la cause exacte"],
          ["Comportement bizarre", "Métriques sur longue période", "Révèle le changement et son début"],
          ["Incident en cours", "Dashboard RED du service", "Périmètre en 30 secondes"],
          ["Post-mortem", "Les trois corrélés", "Timeline complète et factuelle"],
        ],
      },
    ],
  },
  {
    id: "opentelemetry-collector",
    title: "Le collecteur OpenTelemetry",
    level: 3,
    intro:
      "Découpler l'instrumentation du stockage : le rôle du collecteur.",
    blocks: [
      {
        kind: "text",
        text: "Plutôt que d'envoyer chaque signal directement vers sa destination, les applications envoient tout au collecteur OpenTelemetry : un agent qui reçoit, transforme (échantillonne, filtre, enrichit) et exporte vers les backends (Prometheus, Jaeger, Loki). L'application ne connaît qu'un seul endpoint — changer de backend de stockage ne touche plus le code.",
      },
      {
        kind: "list",
        items: [
          "Échantillonnage centralisé : la politique se change en config, pas en redéploiement.",
          "Enrichissement : ajouter l'environnement, la région, la version à tous les signaux.",
          "Buffering : absorber les pics sans perdre de données quand le backend ralentit.",
          "Déploiement : en agent sur chaque nœud ou en gateway centralisée selon l'échelle.",
        ],
      },
    ],
  },
  {
    id: "health-checks",
    title: "Health checks",
    level: 3,
    intro:
      "Les endpoints qui disent si le service va bien : la base de la supervision.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Deux niveaux de health check",
        code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/health/live")
def liveness():
    # Le processus tourne-t-il ? (redémarrer sinon)
    return {"status": "ok"}

@app.get("/health/ready")
def readiness():
    # Le service peut-il servir ? (retirer du trafic sinon)
    db_ok = verifier_connexion_db()
    return {"status": "ok" if db_ok else "degraded"}`,
      },
      {
        kind: "text",
        text: "Liveness (« suis-je vivant ? ») déclenche un redémarrage ; readiness (« puis-je servir ? ») retire du load balancing. Les confondre fait redémarrer un service qui aurait juste dû attendre sa base. Les checks doivent être rapides et sans effet de bord — un health check lent rend tout le système lent.",
      },
    ],
  },
  {
    id: "profiling-continu",
    title: "Profiling continu",
    level: 3,
    intro:
      "Savoir où le CPU passe en production : le quatrième pilier émergent.",
    blocks: [
      {
        kind: "text",
        text: "Le profiling continu échantillonne les piles d'appels en production (quelques fois par seconde) et agrège : on voit quelles fonctions consomment le CPU, la mémoire, où les threads attendent. Contrairement au profiler de dev, il tourne en permanence avec un overhead faible — il révèle les lenteurs qui n'existent qu'en charge réelle.",
      },
      {
        kind: "text",
        text: "Cas typique : la latence p99 augmente sans cause visible dans les traces — le profiling montre une fonction de sérialisation qui consomme 40 % du CPU sur les gros payloads. Sans lui, on aurait scalé les machines au lieu de corriger le code.",
      },
    ],
  },
  {
    id: "tracing-messaging",
    title: "Tracer à travers les files",
    level: 3,
    intro:
      "La propagation ne s'arrête pas au HTTP : suivre une requête dans les workers asynchrones.",
    blocks: [
      {
        kind: "text",
        text: "Quand une API publie un message traité plus tard par un worker, la trace HTTP s'interrompt — sauf si le producteur injecte le contexte dans les en-têtes du message et que le consommateur l'en extrait pour continuer la trace. Sans ça, l'incident « l'email n'est jamais parti » est intraçable : on voit la publication, on voit le worker, jamais le lien.",
      },
      {
        kind: "list",
        items: [
          "Inclure `trace_id` dans les champs standard du message (avec `event_id` et `occurred_at`).",
          "Le worker crée ses spans comme enfants du contexte propagé : une seule trace, du clic au traitement.",
          "Alerter sur les messages sans contexte : ils signalent un producteur non instrumenté.",
        ],
      },
    ],
  },
  {
    id: "metriques-metier",
    title: "Métriques métier",
    level: 3,
    intro:
      "Au-delà de la technique : mesurer ce que fait le produit.",
    blocks: [
      {
        kind: "text",
        text: "Les métriques techniques disent si le système fonctionne ; les métriques métier disent s'il sert à quelque chose : inscriptions par heure, paniers abandonnés, paiements réussis. Elles utilisent la même infrastructure (compteurs Prometheus, dashboards Grafana) mais répondent aux questions du produit — et détectent des incidents invisibles techniquement (le paiement « fonctionne » mais plus personne n'achète).",
      },
      {
        kind: "list",
        items: [
          "Compter les événements métier comme des événements techniques : `inscriptions_total`, `paiements_total{statut}`.",
          "Alerter sur les ruptures de tendance métier : zéro inscription en une heure un mardi est un incident.",
          "Corréler métier et technique : une chute des paiements + une hausse des erreurs 500 = cause trouvée.",
        ],
      },
    ],
  },
  {
    id: "journal-audit",
    title: "Journal d'audit",
    level: 3,
    intro:
      "Qui a fait quoi : les logs que la loi et la sécurité exigent.",
    blocks: [
      {
        kind: "text",
        text: "Le journal d'audit enregistre les actions sensibles : connexions, changements de droits, accès aux données personnelles, modifications de configuration. Contrairement aux logs techniques, il est immuable (écriture seule), conservé longtemps, et son accès est restreint — c'est une preuve, pas un outil de debug.",
      },
      {
        kind: "list",
        items: [
          "Chaque entrée : qui, quoi, quand, depuis où — horodatage fiable (NTP synchronisé).",
          "Séparer du logging applicatif : un flux dédié, non désactivable par configuration.",
          "Conservation : la durée légale du secteur (souvent 1 an minimum) — à valider juridiquement.",
          "En incident de sécurité, c'est la première source : sans audit, impossible de dire ce que l'attaquant a touché.",
        ],
      },
    ],
  },
  {
    id: "alerting-avance",
    title: "Alerting avancé : burn rate",
    level: 3,
    intro:
      "Alerter sur la vitesse à laquelle le budget d'erreur se consume, pas sur des seuils bruts.",
    blocks: [
      {
        kind: "text",
        text: "Plutôt que « taux d'erreur > 1 % », on alerte sur : « au rythme actuel, le budget d'erreur du mois sera épuisé en 2 jours ». C'est l'alerte burn rate : elle combine la gravité (vitesse de consommation) et l'urgence (temps restant). Deux fenêtres typiques : alerte rapide (1h de consommation rapide = page) et alerte lente (6h de consommation modérée = ticket).",
      },
      {
        kind: "text",
        text: "L'avantage : moins de seuils arbitraires, des alertes proportionnées à l'impact réel sur le SLO. Le prérequis : des SLO définis et un budget d'erreur suivi — sans eux, le burn rate n'a pas de sens.",
      },
    ],
  },
  {
    id: "runbook-ecrire",
    title: "Écrire un runbook",
    level: 3,
    intro:
      "La procédure qui transforme une alerte en action : anatomie d'un bon runbook.",
    blocks: [
      {
        kind: "fields",
        title: "Structure d'un runbook",
        fields: [
          {
            label: "Symptôme",
            value: "Ce que l'alerte dit, et ce que l'utilisateur subit — pour qualifier en 1 minute.",
          },
          {
            label: "Diagnostic",
            value: "Les 3-5 vérifications dans l'ordre : dashboard X, requête Y, log Z — avec les liens directs.",
          },
          {
            label: "Mitigation",
            value: "Comment réduire l'impact vite : rollback, feature flag, bascule — commandes incluses.",
          },
          {
            label: "Escalade",
            value: "Qui appeler si ça dépasse : équipe, astreinte, avec les seuils de décision.",
          },
          {
            label: "Post-incident",
            value: "Ce qu'on mettra à jour après : le runbook est vivant, chaque incident l'améliore.",
          },
        ],
      },
    ],
  },
  {
    id: "maturite-observabilite",
    title: "Maturité de l'observabilité",
    level: 3,
    intro:
      "Situer son équipe : les quatre niveaux, du bricolage au pilotage.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "État", "Prochaine étape"],
        rows: [
          ["1. Aveugle", "SSH + print en prod", "Logs structurés centralisés"],
          ["2. Réactif", "Dashboards, alertes basiques", "SLO + alertes sur symptômes"],
          ["3. Proactif", "SLO suivis, runbooks, post-mortems", "Tracing distribué, burn rate"],
          ["4. Piloté", "Budget d'erreur, chaos testé", "Optimiser coûts et signaux"],
        ],
      },
      {
        kind: "text",
        text: "La progression n'est pas qu'outillage : chaque niveau ajoute de la discipline (runbooks, post-mortems, SLO). Sauter des niveaux (déployer du tracing sans dashboards de base) donne des outils que personne n'utilise.",
      },
    ],
  },
];


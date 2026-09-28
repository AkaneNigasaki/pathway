import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Grafana : de la première connexion aux dashboards
 * versionnés et à l'alerting professionnel. 3 niveaux (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent le
 * code inline entre backticks.
 */
export const LEARNING_GRAFANA: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre le rôle de Grafana dans une stack d'observabilité.",
    blocks: [
      {
        kind: "text",
        text: "Grafana est la plateforme de visualisation de l'observabilité : elle transforme métriques, logs et traces en dashboards lisibles, avec un système d'alerting intégré. C'est l'interface que toute l'équipe consulte pour savoir si les systèmes vont bien.",
      },
      {
        kind: "text",
        text: "Grafana ne collecte ni ne stocke les données elle-même : elle interroge des sources externes (Prometheus, Loki, bases SQL, Elasticsearch…) et affiche les résultats. Cette séparation est fondamentale — un problème de données se règle côté source, un problème d'affichage côté Grafana.",
      },
      {
        kind: "diagram",
        title: "Grafana en une image",
        lines: [
          "Sources de données (Prometheus, Loki, SQL…)",
          "              │  requêtes",
          "              ▼",
          "Grafana",
          " ├── Datasource  → connexion vers une source",
          " ├── Panel       → une visualisation + sa requête",
          " ├── Dashboard   → assemblage de panels",
          " ├── Variable    → paramètre dynamique",
          " └── Alerte      → règle + notification",
          "              │",
          "              ▼",
          "Équipe informée (dashboards partagés, alertes ciblées)",
        ],
      },
    ],
  },
  {
    id: "grafana-ne-stocke-rien",
    title: "Grafana ne stocke rien",
    level: 1,
    intro:
      "Le modèle mental qui évite 90 % des confusions de débutant.",
    blocks: [
      {
        kind: "list",
        items: [
          "Grafana = une application web qui exécute des requêtes contre des bases externes et dessine les résultats. Si Prometheus est vide, le dashboard est vide — ce n'est pas un bug Grafana.",
          "La seule chose que Grafana stocke : sa propre configuration (dashboards, datasources, utilisateurs, règles d'alerte) dans sa base interne (SQLite par défaut, Postgres/MySQL en production).",
          "Conséquence pratique : sauvegarder Grafana = sauvegarder ses dashboards (JSON) et sa configuration, pas les données métier.",
          "Quand un panel affiche « No data » : vérifier d'abord la requête directement dans la source (ex. l'interface de Prometheus), avant de toucher au dashboard.",
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
      "Ce qu'il faut avoir sous la main pour que Grafana ait quelque chose à afficher.",
    blocks: [
      {
        kind: "fields",
        title: "Socle nécessaire",
        fields: [
          {
            label: "Une source de métriques",
            value:
              "Prometheus est le compagnon standard : sans source de données, Grafana n'affiche rien. Savoir ce qu'est une métrique (compteur, gauge, histogramme) et à quoi ressemble PromQL en surface suffit pour débuter.",
          },
          {
            label: "Docker (pour l'installation)",
            value:
              "La méthode la plus rapide pour un Grafana local : un conteneur, un port, et c'est en ligne. Aucune installation système requise.",
          },
          {
            label: "Notions HTTP/JSON",
            value:
              "Comprendre qu'un dashboard est un document JSON et qu'une datasource est une URL avec des paramètres — utile dès qu'on versionne ou dépanne.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation avec Docker",
    level: 2,
    intro:
      "Lancer Grafana en local en une commande.",
    blocks: [
      {
        kind: "command",
        label: "Démarrer Grafana",
        command: "docker run -d --name grafana -p 3000:3000 grafana/grafana",
        why: "Lance l'image officielle en arrière-plan et expose l'interface web sur le port 3000. Le volume de données est éphémère dans cette commande — parfait pour découvrir, à persister avec un volume nommé pour un usage durable.",
        verify: "docker logs grafana",
      },
      {
        kind: "text",
        text: "Ouvrir ensuite `http://localhost:3000` : identifiants par défaut `admin` / `admin` (Grafana demande de changer le mot de passe à la première connexion). En production, on passera par le paquet système ou l'opérateur, avec une base Postgres externe et un stockage persistant.",
      },
    ],
  },
  {
    id: "premiere-connexion",
    title: "Première connexion et tour d'horizon",
    level: 2,
    intro:
      "Repères dans l'interface : où se trouve quoi.",
    blocks: [
      {
        kind: "fields",
        title: "Les zones clés",
        fields: [
          {
            label: "Dashboards",
            value:
              "La liste des tableaux de bord, organisés en dossiers. C'est l'écran d'accueil de l'usage quotidien.",
          },
          {
            label: "Explore",
            value:
              "Le mode d'interrogation ad hoc : on y teste des requêtes contre une datasource sans créer de dashboard. Le terrain de jeu pour apprendre PromQL.",
          },
          {
            label: "Alerting",
            value:
              "Les règles d'alerte, les points de contact (où notifier) et les politiques de notification.",
          },
          {
            label: "Connections / Data sources",
            value:
              "La configuration des sources de données — le premier écran à visiter sur une nouvelle instance.",
          },
          {
            label: "Administration",
            value:
              "Utilisateurs, équipes, organisations, et réglages du serveur.",
          },
        ],
      },
    ],
  },
  {
    id: "ajouter-datasource-prometheus",
    title: "Ajouter Prometheus comme datasource",
    level: 2,
    intro:
      "Connecter Grafana à une source : l'étape qui donne vie aux dashboards.",
    blocks: [
      {
        kind: "command",
        label: "Démarrer un Prometheus local (si besoin)",
        command: "docker run -d --name prometheus -p 9090:9090 prom/prometheus",
        why: "Fournit une source de métriques de test avec quelques cibles par défaut. En pratique, Grafana pointe vers le Prometheus de l'infrastructure — l'URL est le seul paramètre vraiment important.",
        verify: "curl -s http://localhost:9090/-/healthy",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Ouvrir Connections > Data sources > Add data source",
            detail:
              "Choisir Prometheus dans la liste des types supportés.",
          },
          {
            title: "Renseigner l'URL",
            detail:
              "`http://localhost:9090` en local, ou l'adresse du Prometheus de l'infrastructure. Le mode d'accès `Server` (défaut) fait exécuter les requêtes par le backend Grafana — à préférer au mode `Browser`.",
          },
          {
            title: "Save & test",
            detail:
              "Grafana vérifie la connectivité. Un échec ici = problème réseau ou URL, pas un problème de dashboard.",
          },
        ],
      },
    ],
  },
  {
    id: "explorer-requetes",
    title: "Premières requêtes dans Explore",
    level: 2,
    intro:
      "Tester PromQL sans rien construire : le bac à sable.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier que Prometheus répond (sanity check)",
        command: "curl -s http://localhost:9090/api/v1/query?query=up",
        why: "Interroge directement l'API Prometheus avec la requête `up` (1 si la cible est joignable). Si cela fonctionne mais pas Grafana, le problème est dans la configuration de la datasource.",
      },
      {
        kind: "text",
        text: "Dans Explore, choisir la datasource Prometheus et taper `up` : chaque cible scrapée apparaît avec sa valeur. Essayer ensuite `node_cpu_seconds_total` ou `prometheus_build_info` pour voir des métriques réelles. Explore affiche le graphique, la table et la requête brute — c'est ici qu'on itère sur PromQL avant de figer une requête dans un panel.",
      },
    ],
  },
  {
    id: "premier-panel",
    title: "Créer son premier panel",
    level: 2,
    intro:
      "D'une requête à une visualisation : l'unité de base du dashboard.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un dashboard vide",
            detail:
              "Dashboards > New > New dashboard, puis « Add visualization ».",
          },
          {
            title: "Choisir la datasource et écrire la requête",
            detail:
              "Sélectionner Prometheus, taper `up` en mode Code. Le graphique se dessine en direct.",
          },
          {
            title: "Choisir le type de visualisation",
            detail:
              "Time series pour une courbe temporelle, Stat pour une valeur unique, Table pour des données tabulaires. Le bon type dépend de la question posée, pas de l'esthétique.",
          },
          {
            title: "Nommer et sauvegarder",
            detail:
              "Un titre qui dit ce que montre le panel (« Cibles Prometheus joignables »), puis Save dashboard. Un panel sans titre explicite est un panel que personne ne comprendra dans 3 mois.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-dashboard",
    title: "Assembler un dashboard utile",
    level: 2,
    intro:
      "Plusieurs panels, une histoire cohérente.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un bon dashboard répond à une question précise (« mon API va-t-elle bien ? »), pas à toutes les questions possibles. 4 à 8 panels bien choisis valent mieux que 30.",
          "Ordre de lecture : en haut les indicateurs critiques (disponibilité, erreurs, latence), en dessous le détail (par instance, par endpoint).",
          "Ajouter des descriptions aux panels (onglet Description) : ce que montre la courbe, et le seuil à partir duquel s'inquiéter.",
          "Utiliser les lignes (rows) pour regrouper par thème : « Trafic », « Erreurs », « Saturation ».",
          "Chaque dashboard a un propriétaire : quelqu'un qui le maintient quand les requêtes deviennent obsolètes.",
        ],
      },
    ],
  },
  {
    id: "variables",
    title: "Variables de dashboard",
    level: 2,
    intro:
      "Un seul dashboard pour tous les environnements et toutes les instances.",
    blocks: [
      {
        kind: "text",
        text: "Les variables sont des paramètres dynamiques : au lieu de dupliquer un dashboard par environnement, on crée une variable `env` (valeurs : prod, staging, dev) et on l'utilise dans les requêtes via `$env`. Le sélecteur en haut du dashboard change le périmètre d'un clic.",
      },
      {
        kind: "code",
        language: "text",
        title: "Requête avec variable",
        code: "up{environment=\"$env\"}",
      },
      {
        kind: "list",
        items: [
          "Création : Dashboard settings > Variables > New. Type Query : la liste des valeurs vient elle-même d'une requête (ex. `label_values(up, environment)`).",
          "Usage : `$env` dans les requêtes, `${env}` quand le nom touche d'autres caractères.",
          "Variables courantes : environnement, cluster, instance, intervalle de temps personnalisé.",
          "Une variable `All` (multi-valeurs) permet de tout sélectionner d'un coup — à activer explicitement dans les options.",
        ],
      },
    ],
  },
  {
    id: "premieres-alertes",
    title: "Premières alertes",
    level: 2,
    intro:
      "Être notifié quand ça casse : règle d'alerte minimale.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer une règle depuis un panel",
            detail:
              "Dans un panel, onglet Alert > New alert rule : la requête du panel devient la condition surveillée.",
          },
          {
            title: "Définir la condition",
            detail:
              "Ex. : alerter quand `avg() OF up` est en dessous de 1 pendant 5 minutes. Le `pending period` (for) évite les alertes sur un micro-glitch.",
          },
          {
            title: "Choisir le point de contact",
            detail:
              "Alerting > Contact points : où envoyer (email, Slack, webhook). Tester le point de contact avec le bouton Test avant de compter dessus.",
          },
          {
            title: "Nommer et documenter",
            detail:
              "Un résumé (« API indisponible ») + une description avec le runbook (« vérifier le déploiement, puis… »). Une alerte sans runbook est une notification d'angoisse.",
          },
        ],
      },
    ],
  },
  {
    id: "sauvegarder-versionner",
    title: "Sauvegarder et versionner",
    level: 2,
    intro:
      "Ne pas perdre son travail : exporter les dashboards.",
    blocks: [
      {
        kind: "command",
        label: "Exporter un dashboard via l'API HTTP",
        command: "curl -s -u admin:admin http://localhost:3000/api/dashboards/uid/mon-dashboard",
        why: "L'API HTTP de Grafana retourne le JSON complet d'un dashboard via son UID (visible dans son URL). On peut ainsi exporter, versionner en Git, puis réimporter les dashboards par script — la base d'une gestion as code.",
        verify: "curl -s -u admin:admin http://localhost:3000/api/dashboards/uid/mon-dashboard | head -c 200",
      },
      {
        kind: "list",
        items: [
          "Méthode simple : copier le JSON Model depuis l'interface et le commiter dans le dépôt du projet.",
          "Méthode pro : le provisioning (voir niveau 3) charge dashboards et datasources depuis des fichiers versionnés au démarrage.",
          "L'historique des versions intégré à Grafana permet de restaurer une version précédente d'un dashboard — utile, mais ce n'est pas un substitut à Git.",
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "Grafana au jour le jour, côté utilisateur et côté mainteneur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Consulter",
            detail:
              "Ouvrir les dashboards de son périmètre, vérifier les alertes en cours (Alerting > Alert rules).",
          },
          {
            title: "Investiguer",
            detail:
              "Un pic anormal ? Explore pour creuser ad hoc : zoomer sur la période, comparer avec la veille (même requête, plage décalée).",
          },
          {
            title: "Ajuster",
            detail:
              "Requête à corriger, seuil d'alerte à affiner : modifier, tester dans Explore, sauvegarder.",
          },
          {
            title: "Versionner",
            detail:
              "Exporter le JSON des dashboards modifiés et commiter — jamais de changement « juste dans l'interface » sur un dashboard partagé.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "promql-bases",
    title: "PromQL : les bases",
    level: 3,
    intro: "Le langage de requête de Prometheus — ce que Grafana exécute sous le capot.",
    blocks: [
      {
        kind: "fields",
        title: "Les requêtes essentielles",
        fields: [
          {
            label: "`up`",
            value:
              "Vaut 1 si Prometheus arrive à scraper la cible, 0 sinon. La requête de disponibilité la plus simple.",
          },
          {
            label: "`http_requests_total`",
            value:
              "Un compteur : ne fait qu'augmenter. On ne le lit jamais brut — on calcule son taux avec `rate()`.",
          },
          {
            label: "`node_memory_MemAvailable_bytes`",
            value:
              "Une gauge : une valeur instantanée qui monte et descend. Se lit directement.",
          },
          {
            label: "Sélecteurs `{...}`",
            value:
              "`up{job=\"api\", environment=\"prod\"}` : filtrer par labels. Les labels sont la dimension d'analyse principale.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : une requête PromQL répond à une question. « Combien de requêtes par seconde ? », « quelle est la latence p95 ? », « quel pourcentage de CPU est utilisé ? ». Si la question n'est pas claire, la requête ne le sera pas non plus.",
      },
    ],
  },
  {
    id: "promql-rate",
    title: "PromQL : `rate()` et les compteurs",
    level: 3,
    intro: "Lire correctement les compteurs — la source d'erreur n°1.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Taux d'erreurs 5xx par seconde",
        code: "sum(rate(http_requests_total{status=~\"5..\"}[5m]))",
      },
      {
        kind: "text",
        text: "`rate()` calcule la variation par seconde d'un compteur sur une fenêtre (ici 5 minutes). Sans `rate()`, un compteur brut ne dit rien d'utile — sa valeur absolue dépend du moment où le processus a démarré. La fenêtre `[5m]` lisse les à-coups : trop courte = bruitée, trop longue = inerte.",
      },
      {
        kind: "list",
        items: [
          "`increase()` : la variation totale sur la fenêtre (utile pour « combien d'erreurs cette nuit »).",
          "Toujours agréger (`sum`, `avg`) après `rate()` quand on veut le total d'un parc, sinon on obtient une courbe par instance.",
          "Piège : `rate()` sur une fenêtre plus courte que l'intervalle de scrape donne des résultats erratiques.",
        ],
      },
    ],
  },
  {
    id: "promql-agregations",
    title: "PromQL : agrégations et histogrammes",
    level: 3,
    intro: "Résumer un parc et mesurer la latence correctement.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Latence p95 et usage CPU moyen",
        code: "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))\n\n100 - (avg(rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)",
      },
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          {
            label: "`by (...)`",
            value:
              "Conserve des dimensions dans l'agrégation : `sum by (service)` donne une courbe par service au lieu d'un total unique.",
          },
          {
            label: "`histogram_quantile`",
            value:
              "Calcule un percentile depuis un histogramme Prometheus. La latence moyenne ment (quelques requêtes lentes la tirent) : le p95/p99 décrit l'expérience réelle.",
          },
          {
            label: "`avg`, `max`, `sum`",
            value:
              "`avg` pour une tendance centrale, `max` pour le pire cas (utile aux alertes), `sum` pour les totaux. Choisir selon la question.",
          },
        ],
      },
    ],
  },
  {
    id: "panels-timeseries",
    title: "Panels Time series",
    level: 3,
    intro: "Le panel le plus utilisé : bien le régler.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une requête = une courbe par série. Nommer les séries via la légende (`{{instance}}`, `{{service}}`) : une légende « Value » ne dit rien.",
          "Échelle : laisser l'auto par défaut sauf besoin (pourcentages 0-100, latences en ms). Une échelle tronquée exagère visuellement les variations.",
          "Seuils visuels : afficher une ligne au seuil d'alerte pour voir la marge restante d'un coup d'œil.",
          "Intervalles : `$__interval` adapte automatiquement la granularité au zoom — à utiliser dans `rate()` via `$__rate_interval` pour des requêtes robustes au changement de plage.",
          "Tooltip « All » : comparer les séries au survol quand on cherche laquelle dévie.",
        ],
      },
    ],
  },
  {
    id: "panels-stat-table",
    title: "Panels Stat, Gauge et Table",
    level: 3,
    intro: "Quand la courbe n'est pas la bonne réponse.",
    blocks: [
      {
        kind: "fields",
        title: "Choisir selon la question",
        fields: [
          {
            label: "Stat",
            value:
              "Une valeur unique, grande et lisible : « erreurs 5xx (5 min) : 12 ». Idéal pour les KPI en haut de dashboard. Ajouter un sparkline pour le contexte temporel.",
          },
          {
            label: "Gauge",
            value:
              "Une valeur dans une plage : usage disque, saturation. Les seuils colorent la jauge (vert → orange → rouge) — à calibrer sur des seuils documentés, pas au hasard.",
          },
          {
            label: "Table",
            value:
              "Des données tabulaires : top des endpoints les plus lents, certificats par expiration. Le transform « Organize fields » renomme et réordonne les colonnes.",
          },
          {
            label: "Pie / Bar",
            value:
              "Des répartitions : requêtes par code de statut, usage par namespace. À réserver aux comparaisons de parts, jamais aux séries temporelles.",
          },
        ],
      },
    ],
  },
  {
    id: "transformations",
    title: "Transformations",
    level: 3,
    intro: "Remodeler les données sans toucher à la requête.",
    blocks: [
      {
        kind: "list",
        items: [
          "Les transformations s'appliquent après la requête : renommer des champs, filtrer, joindre deux requêtes, calculer.",
          "Cas typiques : « Merge » pour combiner deux requêtes en une table, « Filter by name » pour ne garder que les colonnes utiles, « Add field from calculation » pour un ratio (erreurs / total).",
          "Avantage : on garde des requêtes simples côté source et on fait la présentation côté Grafana.",
          "Limite : les transformations ne remplacent pas une mauvaise requête — si les données de base sont fausses, le résultat reste faux.",
        ],
      },
    ],
  },
  {
    id: "annotations",
    title: "Annotations",
    level: 3,
    intro: "Superposer les événements aux courbes : déploiements, incidents.",
    blocks: [
      {
        kind: "text",
        text: "Les annotations affichent des marqueurs verticaux sur les dashboards (ex. « déploiement v2.4.1 à 14:32 »). Quand une courbe décroche juste après un marqueur de déploiement, la corrélation est immédiate — c'est l'un des outils de diagnostic les plus rentables.",
      },
      {
        kind: "list",
        items: [
          "Sources : annotations manuelles, ou requêtes vers une source (ex. Loki, ou une table d'événements).",
          "Automatiser : le pipeline de déploiement peut poster une annotation via l'API Grafana à chaque mise en production.",
          "Tags : filtrer les annotations par tags pour ne voir que les déploiements, ou que les incidents.",
        ],
      },
    ],
  },
  {
    id: "alertes-regles",
    title: "Règles d'alerte unifiées",
    level: 3,
    intro: "Anatomie d'une règle : requête, condition, durée.",
    blocks: [
      {
        kind: "fields",
        title: "Les composants",
        fields: [
          {
            label: "Requête",
            value:
              "Ce qui est surveillé — souvent la même que le panel correspondant. Évaluée à intervalle régulier (ex. toutes les minutes).",
          },
          {
            label: "Condition",
            value:
              "L'expression sur le résultat : « IS ABOVE 0.05 » (taux d'erreur > 5 %), « HAS NO VALUE » (métrique disparue — souvent plus grave qu'un seuil).",
          },
          {
            label: "`for` / pending period",
            value:
              "Durée pendant laquelle la condition doit rester vraie avant de déclencher. Filtre les pics transitoires. 5 minutes est un bon défaut ; 0 = alerte immédiate (bruyant).",
          },
          {
            label: "Labels et annotations",
            value:
              "Les labels routent l'alerte (équipe, sévérité) ; les annotations portent le résumé et le lien runbook affichés dans la notification.",
          },
          {
            label: "État",
            value:
              "Normal → Pending (condition vraie, `for` en cours) → Firing → (résolution) → Normal. Comprendre ce cycle évite les « l'alerte ne part pas ».",
          },
        ],
      },
    ],
  },
  {
    id: "alertes-points-de-contact",
    title: "Points de contact",
    level: 3,
    intro: "Où vont les notifications, et comment les tester.",
    blocks: [
      {
        kind: "list",
        items: [
          "Types : email, Slack, PagerDuty/Opsgenie, webhook générique, Telegram… Le webhook permet d'intégrer n'importe quel système interne.",
          "Tester chaque point de contact avec le bouton Test dès sa création — un contact non testé est un contact cassé.",
          "Message template : personnaliser le texte avec les labels/annotations de l'alerte (service, runbook). Un message générique ralentit la réponse.",
          "Séparer les canaux par criticité : un canal bruyant pour les warnings, un canal sobre (paging) pour le critique. Tout mettre au même endroit garantit que plus rien n'est lu.",
        ],
      },
    ],
  },
  {
    id: "alertes-politiques",
    title: "Politiques de notification et routage",
    level: 3,
    intro: "Router la bonne alerte à la bonne équipe, sans bruit.",
    blocks: [
      {
        kind: "text",
        text: "La politique de notification par défaut reçoit toutes les alertes ; des sous-politiques routent par labels (ex. `team=backend` → canal backend). Le routage se fait par correspondance de labels — d'où l'importance de labeliser les règles d'alerte proprement.",
      },
      {
        kind: "list",
        items: [
          "Groupement : regrouper les alertes similaires (par `alertname` ou service) pour recevoir UN message au lieu de cinquante lors d'une panne franche.",
          "Répétition (repeat interval) : ne pas renvoyer la même alerte toutes les 5 minutes — 4h pour le warning, 30 min pour le critique, par exemple.",
          "Silences : couper temporairement des alertes connues pendant une maintenance planifiée, avec une date d'expiration — jamais de silence permanent.",
          "Inhibition : une alerte « cluster down » peut inhiber les « service down » individuelles (même cause racine).",
        ],
      },
    ],
  },
  {
    id: "provisioning-datasources",
    title: "Provisioning : datasources",
    level: 3,
    intro: "Déclarer les datasources en fichiers versionnés.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "provisioning/datasources/prometheus.yaml",
        code: "apiVersion: 1\ndatasources:\n  - name: Prometheus\n    type: prometheus\n    access: proxy\n    url: http://prometheus:9090\n    isDefault: true\n    editable: false",
      },
      {
        kind: "text",
        text: "Placé dans `provisioning/datasources/`, ce fichier crée la datasource au démarrage de Grafana. `editable: false` empêche les modifications via l'interface — la source de vérité est le fichier, versionné en Git. Toute modification passe par une pull request, pas par un clic.",
      },
    ],
  },
  {
    id: "provisioning-dashboards",
    title: "Provisioning : dashboards",
    level: 3,
    intro: "Charger les dashboards depuis Git au démarrage.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "provisioning/dashboards/dashboards.yaml",
        code: "apiVersion: 1\nproviders:\n  - name: equipe-plateforme\n    folder: Plateforme\n    type: file\n    options:\n      path: /etc/grafana/provisioning/dashboards",
      },
      {
        kind: "list",
        items: [
          "Chaque fichier JSON du dossier devient un dashboard, rangé dans le dossier indiqué. Modifier le JSON + redémarrer (ou attendre le rechargement) = dashboard à jour.",
          "En production, ces fichiers sont montés depuis un dépôt Git (sidecar, init container, ou outil GitOps).",
          "Les dashboards provisionnés ne sont pas modifiables dans l'interface par défaut — c'est voulu : toute modification passe par Git.",
          "Combiner avec les variables : un même JSON de dashboard sert tous les environnements.",
        ],
      },
    ],
  },
  {
    id: "loki-logs",
    title: "Loki : les logs dans Grafana",
    level: 3,
    intro: "Corréler métriques et logs sans changer d'outil.",
    blocks: [
      {
        kind: "text",
        text: "Loki est l'agrégateur de logs de l'écosystème Grafana, interrogé avec LogQL. Ajouté comme datasource, il permet dans Explore de passer d'un pic sur une courbe à « afficher les logs de ce service sur cette période » en un clic — la corrélation métriques/logs qui fait gagner des heures en incident.",
      },
      {
        kind: "code",
        language: "text",
        title: "Exemples LogQL",
        code: "{service=\"api\", environment=\"prod\"} |= \"error\"\n\nsum by (level) (count_over_time({service=\"api\"}[5m]))",
      },
      {
        kind: "list",
        items: [
          "`{...}` sélectionne les flux par labels (comme Prometheus), `|=` filtre les lignes contenant un texte, `| json` parse les logs structurés.",
          "Le lien « logs for panel » (dérived fields / correlations) saute du dashboard métriques aux logs correspondants.",
        ],
      },
    ],
  },
  {
    id: "tempo-traces",
    title: "Tempo : les traces",
    level: 3,
    intro: "Le troisième pilier : suivre une requête de bout en bout.",
    blocks: [
      {
        kind: "text",
        text: "Tempo stocke les traces distribuées (spans). Avec la corrélation trace-métriques-logs (via les IDs de trace propagés, ex. dans les logs Loki), on passe d'une latence anormale sur un dashboard à la trace exacte puis aux logs du span fautif — les trois piliers reliés dans une seule interface.",
      },
      {
        kind: "list",
        items: [
          "Prérequis : l'application doit émettre des traces (OpenTelemetry) — Grafana ne les invente pas.",
          "Usage typique : dashboard RED (Rate, Errors, Duration) → clic sur un pic → traces exemplaires → span lent → logs corrélés.",
          "En pratique, on commence par métriques + logs ; les traces viennent quand la latence inter-services devient le problème principal.",
        ],
      },
    ],
  },
  {
    id: "rbac-organisations",
    title: "Organisations, équipes et permissions",
    level: 3,
    intro: "Structurer l'accès quand Grafana devient multi-équipes.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux",
        fields: [
          {
            label: "Organisation",
            value:
              "Isolation forte : datasources, dashboards et utilisateurs séparés. À réserver aux cas où les équipes ne doivent vraiment pas se voir (rare en interne).",
          },
          {
            label: "Équipe (Team)",
            value:
              "Groupe d'utilisateurs au sein d'une organisation. Le niveau usuel pour attribuer des droits.",
          },
          {
            label: "Dossiers et permissions",
            value:
              "Attribuer View/Edit/Admin par dossier de dashboards à des équipes. Chaque équipe gère ses dashboards sans toucher à ceux des autres.",
          },
          {
            label: "Rôles",
            value:
              "Viewer (consulte), Editor (crée/modifie), Admin (administre). Donner Editor largement, Admin avec parcimonie.",
          },
        ],
      },
    ],
  },
  {
    id: "snapshots-partage",
    title: "Snapshots et partage",
    level: 3,
    intro: "Partager un état de dashboard sans donner accès à Grafana.",
    blocks: [
      {
        kind: "list",
        items: [
          "Snapshot : fige les données d'un dashboard à un instant T dans un lien partageable — utile pour un rapport d'incident ou pour montrer un problème à quelqu'un sans accès.",
          "Attention : un snapshot contient les données visibles — vérifier qu'aucune donnée sensible n'y figure avant de le diffuser.",
          "Alternative : l'export PDF/CSV d'un panel pour les rapports réguliers.",
          "Les liens de dashboard avec plage de temps absolue (`from`/`to`) permettent de partager « ce qui s'est passé hier entre 14h et 15h ».",
        ],
      },
    ],
  },
  {
    id: "haute-disponibilite",
    title: "Grafana en production",
    level: 3,
    intro: "Ce qui change entre le conteneur de test et l'instance que toute l'entreprise utilise.",
    blocks: [
      {
        kind: "list",
        items: [
          "Base de données externe (Postgres/MySQL) au lieu de SQLite : indispensable dès qu'on a plusieurs replicas ou qu'on veut des sauvegardes sérieuses.",
          "Plusieurs replicas derrière un reverse proxy pour la disponibilité ; les sessions sont en base, donc sans état local.",
          "Authentification : SSO (OAuth générique, LDAP) plutôt que des comptes locaux — avec mapping des équipes.",
          "Sauvegardes : la base Grafana + les fichiers de provisioning (déjà en Git). Tester la restauration.",
          "Superviser Grafana lui-même : métriques internes (`/metrics`), alerte si l'instance ne répond plus — l'outil d'alerting ne doit pas être un point aveugle.",
        ],
      },
    ],
  },
  {
    id: "erreur-datasource-injoignable",
    title: "Erreur : datasource injoignable",
    level: 3,
    intro: "Tous les panels en erreur d'un coup.",
    blocks: [
      {
        kind: "list",
        items: [
          "Symptôme : « Data source error » ou timeouts sur tous les panels utilisant la datasource.",
          "Diagnostic : Connections > Data sources > Save & test — le message d'erreur dit si c'est réseau (connexion refusée), authentification (401/403) ou autre.",
          "Cause fréquente : URL interne vs externe — avec `access: proxy`, c'est le serveur Grafana qui doit joindre la source, pas votre navigateur. `http://localhost:9090` ne marche que si Prometheus est sur la même machine que Grafana.",
          "Vérifier aussi les pare-feu et, en Kubernetes, les NetworkPolicies entre namespaces.",
        ],
      },
    ],
  },
  {
    id: "erreur-no-data",
    title: "Erreur : « No data »",
    level: 3,
    intro: "La datasource répond, mais la requête ne retourne rien.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cause 1 : faute dans les labels (`environment=\"prod\"` alors que le label s'appelle `env`). Vérifier les labels réels dans Explore avec une requête large.",
          "Cause 2 : plage de temps sans données (métrique qui n'existe que depuis ce matin, plage sur 7 jours).",
          "Cause 3 : `rate()` sur une fenêtre trop courte par rapport à l'intervalle de scrape.",
          "Méthode : tester la requête pas à pas dans Explore en retirant les filtres un par un jusqu'à obtenir des données, puis resserrer.",
        ],
      },
    ],
  },
  {
    id: "erreur-requete-lente",
    title: "Erreur : requêtes lentes ou timeouts",
    level: 3,
    intro: "Le dashboard met 30 secondes à s'afficher.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cause 1 : trop de séries — une requête sans agrégation sur un parc de 500 instances retourne 500 courbes. Agréger (`sum by (...)`) ou filtrer.",
          "Cause 2 : plage trop large avec un pas trop fin. Utiliser `$__rate_interval` et laisser Grafana adapter.",
          "Cause 3 : la source elle-même est lente (Prometheus sous-dimensionné) — le problème n'est pas Grafana.",
          "Limiter le nombre de panels par dashboard : chaque panel = une ou plusieurs requêtes exécutées au chargement.",
        ],
      },
    ],
  },
  {
    id: "erreur-alertes-bruyantes",
    title: "Erreur : alertes bruyantes",
    level: 3,
    intro: "Quand l'équipe ne lit plus les alertes, l'alerting est mort.",
    blocks: [
      {
        kind: "list",
        items: [
          "Symptôme : des dizaines de notifications par jour, toutes ignorées — dont, un jour, une vraie.",
          "Corrections : augmenter les `for`, relever les seuils vers des niveaux actionnables, grouper les notifications, supprimer les alertes « informatives » (un dashboard suffit).",
          "Règle : chaque alerte doit être actionnable (quelqu'un sait quoi faire) et nouvelle (pas déjà couverte). Sinon, c'est un panel, pas une alerte.",
          "Revoir périodiquement : une alerte qui n'a jamais déclenché en 6 mois est soit inutile, soit mal réglée.",
        ],
      },
    ],
  },
  {
    id: "erreur-timezone",
    title: "Erreur : décalages horaires",
    level: 3,
    intro: "Les courbes ne correspondent pas aux logs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Grafana affiche par défaut l'heure du navigateur ; le serveur et les sources peuvent être en UTC. Un « pic à 14h » peut être 12h UTC.",
          "Régler explicitement : préférences utilisateur ou dashboard en UTC pour les équipes distribuées — l'important est que tout le monde lise la même heure.",
          "Les annotations de déploiement utilisent l'heure serveur : vérifier la cohérence quand on corrèle.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Ce qui distingue un Grafana utile d'un cimetière de dashboards.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un dashboard = une question, un propriétaire, des panels nommés et décrits.",
          "Variables pour factoriser les environnements — jamais de dashboards dupliqués par env.",
          "Toute requête complexe est d'abord validée dans Explore.",
          "Dashboards et datasources en provisioning, versionnés en Git.",
          "Alertes actionnables avec runbook, seuils justifiés, `for` adapté.",
          "Points de contact testés ; canaux séparés par criticité.",
          "Légendes explicites (`{{service}}`, pas « Value ») ; unités correctes sur les axes.",
          "Nettoyage régulier : dashboards obsolètes archivés ou supprimés.",
          "Grafana lui-même supervisé et sauvegardé.",
          "Documentation : où sont les dashboards par équipe, qui maintenir, comment ajouter une datasource.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 3,
    intro:
      "Quatre projets pour passer de consommateur à référent observabilité.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Dashboard de sa machine",
        fields: [
          {
            label: "Objectif",
            value:
              "Grafana + Prometheus + node_exporter en local : dashboard CPU, mémoire, disque, réseau de votre machine.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Datasources, panels Time series, PromQL de base (`rate`, `avg`), sauvegarde.",
          },
          {
            label: "Réussi quand",
            value:
              "Le dashboard affiche l'état réel de la machine et se rafraîchit ; vous savez expliquer chaque requête.",
          },
          {
            label: "Difficulté",
            value: "Débutant — quelques heures.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Dashboard applicatif avec variables",
        fields: [
          {
            label: "Objectif",
            value:
              "Superviser une petite application (ex. API Node/Python instrumentée) : trafic, erreurs, latence p95, avec variable d'environnement.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Histogrammes, `histogram_quantile`, variables, panels Stat/Table, annotations de déploiement.",
          },
          {
            label: "Réussi quand",
            value:
              "Un déploiement est visible comme annotation ; un pic de latence est attribuable à une version.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — une journée.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Alerting complet",
        fields: [
          {
            label: "Objectif",
            value:
              "Règles d'alerte sur disponibilité/erreurs/latence/saturation, routage par équipe, points de contact testés, runbooks.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Règles unifiées, `for`, politiques de notification, silences, tests de bout en bout.",
          },
          {
            label: "Réussi quand",
            value:
              "Provoquer une panne (stopper l'app) déclenche la bonne alerte au bon canal en moins de 10 minutes, avec un runbook actionnable.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux jours.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Observabilité as code",
        fields: [
          {
            label: "Objectif",
            value:
              "Tout en Git : provisioning des datasources et dashboards, règles d'alerte versionnées, déploiement reproductible de l'instance.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Provisioning, JSON Model, Loki/Tempo en option, CI qui valide les dashboards.",
          },
          {
            label: "Réussi quand",
            value:
              "Détruire et recréer l'instance restaure dashboards, datasources et alertes à l'identique depuis Git.",
          },
          {
            label: "Difficulté",
            value: "Avancé — une semaine.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources officielles",
    level: 3,
    intro:
      "Les références à privilégier.",
    blocks: [
      {
        kind: "list",
        items: [
          "`https://grafana.com/docs/` — LA référence : installation, datasources, panels, alerting, provisioning.",
          "`https://grafana.com/docs/grafana/latest/dashboards/` — tout sur la construction de dashboards.",
          "`https://grafana.com/docs/grafana/latest/alerting/` — la documentation complète de l'alerting unifié.",
          "`https://play.grafana.org/` — instance publique de démonstration avec des dashboards réels à explorer.",
          "`https://prometheus.io/docs/querying/basics/` — les bases de PromQL, indispensables pour écrire de bonnes requêtes.",
        ],
      },
      {
        kind: "text",
        text: "Réflexe : devant un panel qui n'affiche rien, la documentation de la datasource (Prometheus, Loki) répond plus souvent que celle de Grafana — le problème est généralement dans la requête, pas dans l'affichage.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Grafana maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "`prometheus` : comprendre en profondeur la source de métriques — scrape, recording rules, federation.",
          "`siem` : passer de l'observabilité technique à la détection de sécurité.",
          "`kubernetes` : superviser des clusters — les dashboards k8s ont leurs propres métriques et pièges.",
          "`python` ou `go` : instrumenter vos applications (métriques custom, traces OpenTelemetry).",
          "`incident-response` : transformer les alertes en réponse organisée quand ça casse vraiment.",
        ],
      },
    ],
  },
];

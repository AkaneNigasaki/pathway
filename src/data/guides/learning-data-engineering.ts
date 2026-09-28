import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du Data Engineering : ingérer, transformer,
 * orchestrer et livrer des données fiables à l'échelle.
 */
export const LEARNING_DATA_ENGINEERING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est le data engineering : rendre les données utilisables à l'échelle.",
    blocks: [
      {
        kind: "text",
        text: "Le data engineering est la discipline qui rend les données utilisables à l'échelle : ingérer des sources hétérogènes (bases, APIs, fichiers, événements), les transformer, les orchestrer en pipelines fiables et les livrer aux analystes et aux modèles.",
      },
      {
        kind: "text",
        text: "Sans data engineering, pas de data science : la majeure partie d'un projet data consiste à disposer de données propres, fraîches et fiables. C'est le métier data le plus demandé, à l'interface entre le software engineering et l'analytics.",
      },
      {
        kind: "text",
        text: "La promesse : que le dashboard du lundi matin affiche des chiffres justes, que le modèle de recommandation s'entraîne sur des données d'hier — pas d'il y a trois semaines — et que tout cela survive à une panne sans intervention humaine à 3h du matin.",
      },
    ],
  },
  {
    id: "de-source-au-dashboard",
    title: "De la source au dashboard",
    level: 1,
    intro:
      "Le parcours d'une donnée, en 30 secondes.",
    blocks: [
      {
        kind: "diagram",
        title: "Le chemin d'une donnée",
        lines: [
          "SOURCES",
          "  (base prod, API, fichiers, événements)",
          "     │",
          "     ▼",
          "INGESTION ──► STOCKAGE BRUT",
          "     │            (data lake : on garde tout, tel quel)",
          "     ▼",
          "TRANSFORMATION ──► ENTREPÔT",
          "  (nettoyer,        (warehouse : tables propres,",
          "   modéliser)         modélisées pour l'analyse)",
          "     │",
          "     ▼",
          "ORCHESTRATION",
          "  (planifier, surveiller, réessayer)",
          "     │",
          "     ▼",
          "CONSOMMATION",
          "  (dashboards BI, modèles ML, exports)",
        ],
      },
      {
        kind: "list",
        items: [
          "Ingestion : copier les données des sources vers votre infrastructure, sans les perdre ni les corrompre.",
          "Stockage brut : garder les données telles quelles — on ne sait jamais ce qui servira demain.",
          "Transformation : nettoyer et modéliser pour les usages analytiques.",
          "Orchestration : faire tourner tout cela chaque jour, dans l'ordre, avec des alertes en cas de problème.",
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
      "Les fondations techniques avant de construire des pipelines.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "Python",
            value:
              "Scripts, fonctions, gestion des fichiers, requêtes HTTP : l'ingestion et les transformations s'écrivent en Python.",
          },
          {
            label: "SQL",
            value:
              "Requêtes complexes (`JOIN`, `GROUP BY`, CTE, fonctions de fenêtrage) : la transformation des données se fait largement en SQL.",
          },
          {
            label: "Ligne de commande",
            value:
              "Naviguer, manipuler des fichiers, lancer des scripts : l'environnement naturel des pipelines.",
          },
          {
            label: "Git",
            value:
              "Versionner les pipelines et les transformations : un pipeline non versionné est un pipeline indéboguable.",
          },
          {
            label: "Notions de bases de données",
            value:
              "Tables, index, transactions : comprendre où les données vivent et comment on les interroge vite.",
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
      "L'atelier du data engineer : Python, Docker, DuckDB.",
    blocks: [
      {
        kind: "command",
        label: "Installer Python et les librairies de base",
        command: "pip install pandas pyarrow sqlalchemy duckdb",
        why: "`pandas` pour manipuler les données, `pyarrow` pour le format Parquet (le standard du stockage analytique), `sqlalchemy` pour parler aux bases de données, `duckdb` comme moteur SQL analytique local. Ce sont les briques de base, toutes open source.",
        verify: "python -c \"import duckdb; print(duckdb.__version__)\"",
      },
      {
        kind: "command",
        label: "Créer l'environnement du projet",
        command: "python -m venv .venv && source .venv/bin/activate",
        why: "Isole les dépendances du projet. Les pipelines tournent pendant des mois : des versions figées (`pip freeze > requirements.txt`) garantissent qu'ils tournent à l'identique.",
        verify: "pip freeze > requirements.txt",
      },
      {
        kind: "text",
        text: "Docker Desktop est indispensable pour la suite : Airflow, Spark ou Kafka ne s'installent pas « à la main » en local — on les lance en conteneurs. Vérifier avec `docker --version` après installation.",
      },
    ],
  },
  {
    id: "premier-pipeline",
    title: "Premier pipeline",
    level: 2,
    intro:
      "Extraire un CSV, le transformer, le charger en Parquet : le plus petit pipeline qui ait du sens.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "pipeline.py : extract → transform → load",
        code: `import pandas as pd\n\n# EXTRACT : lire la source brute\ndf = pd.read_csv("commandes_brutes.csv\")\n\n# TRANSFORM : nettoyer et typer\nclean = (\n    df.drop_duplicates()\n      .dropna(subset=["montant\"])\n      .assign(date=lambda d: pd.to_datetime(d["date\"]))\n)\n\n# LOAD : écrire en Parquet (colonnaire, compressé)\nclean.to_parquet("warehouse/commandes.parquet\", index=False)\nprint(f"{len(clean)} lignes chargées\")`,
      },
      {
        kind: "command",
        label: "Exécuter le pipeline",
        command: "python pipeline.py",
        why: "Un pipeline est d'abord un script rejouable : même entrée, même sortie. Avant l'orchestration, les DAG et le streaming, il y a ce script — et 80 % des pipelines réels lui ressemblent.",
        verify: "ls -lh warehouse/commandes.parquet",
      },
      {
        kind: "text",
        text: "Le Parquet plutôt que le CSV en sortie : format colonnaire compressé, typé, lisible par tous les moteurs analytiques (DuckDB, Spark, pandas). Le CSV reste un format d'échange, pas de stockage.",
      },
    ],
  },
  {
    id: "docker-bases",
    title: "Docker : les bases utiles",
    level: 2,
    intro:
      "Lancer des services (bases, orchestrateurs) sans les installer.",
    blocks: [
      {
        kind: "command",
        label: "Lancer PostgreSQL en local",
        command: "docker run -d --name postgres-de -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres",
        why: "Démarre un vrai PostgreSQL dans un conteneur : `-d` en arrière-plan, `-e` définit le mot de passe, `-p` expose le port 5432. Idéal pour tester chargements et requêtes sans installer ni configurer un serveur.",
        verify: "docker ps",
      },
      {
        kind: "list",
        items: [
          "`docker ps` : conteneurs en cours ; `docker logs postgres-de` : leurs journaux ; `docker stop` / `docker start` : les arrêter/relancer.",
          "Les données d'un conteneur sont éphémères par défaut : pour les garder, monter un volume (`-v pgdata:/var/lib/postgresql/data`).",
          "En data engineering, Docker sert à reproduire en local les services de production : base, orchestrateur, broker de messages.",
        ],
      },
    ],
  },
  {
    id: "explorer-duckdb",
    title: "Explorer avec DuckDB",
    level: 2,
    intro:
      "Interroger des fichiers Parquet en SQL, sans serveur.",
    blocks: [
      {
        kind: "command",
        label: "Ouvrir DuckDB sur un fichier",
        command: "duckdb data.duckdb",
        why: "Lance le shell DuckDB : un moteur SQL analytique embarqué (comme SQLite, mais optimisé pour l'analytique). Il lit directement les Parquet et CSV sans les « charger » quelque part.",
        verify: "SELECT version();",
      },
      {
        kind: "code",
        language: "sql",
        title: "Requêter un Parquet directement",
        code: `SELECT date_trunc('month', date) AS mois,\n       COUNT(*) AS nb,\n       SUM(montant) AS ca\nFROM read_parquet('warehouse/commandes.parquet')\nGROUP BY 1\nORDER BY 1;`,
      },
      {
        kind: "text",
        text: "DuckDB est l'outil d'exploration idéal : SQL complet, rapide sur des millions de lignes, zéro infrastructure. Il sert aussi de cible dbt en développement local.",
      },
    ],
  },
  {
    id: "sql-rappel",
    title: "SQL : l'essentiel du pipeline",
    level: 2,
    intro:
      "Les constructions SQL qui font les transformations.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "CTE : découper une transformation en étapes",
        code: `WITH nettoye AS (\n    SELECT DISTINCT client_id, montant, date::date AS jour\n    FROM commandes_brutes\n    WHERE montant > 0\n),\npar_mois AS (\n    SELECT date_trunc('month', jour) AS mois,\n           SUM(montant) AS ca\n    FROM nettoye\n    GROUP BY 1\n)\nSELECT mois, ca,\n       ca - LAG(ca) OVER (ORDER BY mois) AS evolution\nFROM par_mois\nORDER BY mois;`,
      },
      {
        kind: "list",
        items: [
          "CTE (`WITH`) : nommer chaque étape de la transformation — lisible, déboguable étape par étape.",
          "Fonctions de fenêtrage (`LAG`, `ROW_NUMBER`, `RANK`) : comparer, dédupliquer, classer sans auto-jointures.",
          "`GROUP BY` + agrégats : le cœur des transformations analytiques.",
          "En dbt, chaque modèle est exactement cela : un `SELECT` versionné et testé.",
        ],
      },
    ],
  },
  {
    id: "stockage-formats",
    title: "Formats de stockage",
    level: 2,
    intro:
      "CSV, Parquet, JSON : choisir selon l'usage, pas par habitude.",
    blocks: [
      {
        kind: "table",
        headers: ["", "CSV", "Parquet", "JSON"],
        rows: [
          ["Structure", "Lignes de texte, pas de types", "Colonnaire, typé, compressé", "Documents imbriqués"],
          ["Lecture partielle", "Non : tout lire", "Oui : colonnes et lignes filtrées", "Non"],
          ["Usage", "Échange simple, exports", "Stockage analytique (standard)", "APIs, données semi-structurées"],
          ["Poids", "Lourd", "Léger (compression)", "Lourd et verbeux"],
        ],
      },
      {
        kind: "text",
        text: "Règle : le CSV pour échanger avec l'extérieur, le Parquet pour stocker et analyser, le JSON pour les APIs et les données imbriquées. Stocker des CSV « parce que c'est simple » coûte cher en temps de lecture et en espace dès que les volumes grandissent.",
      },
    ],
  },
  {
    id: "orchestration-concept",
    title: "Orchestration : le concept",
    level: 2,
    intro:
      "Pourquoi un script ne suffit pas : dépendances, reprises, alertes.",
    blocks: [
      {
        kind: "diagram",
        title: "Un DAG : les tâches et leurs dépendances",
        lines: [
          "  extraire_api ──┐",
          "               ├─► transformer ──► charger ──► contrôler ──► notifier",
          "  extraire_bdd ──┘",
          "Les deux extractions tournent en parallèle,",
          "la transformation attend les deux,",
          "le contrôle bloque la notification si les données sont mauvaises.",
        ],
      },
      {
        kind: "list",
        items: [
          "Un orchestrateur (Airflow) exécute ce graphe chaque jour : dans l'ordre, avec des reprises automatiques en cas d'échec.",
          "Ce qu'un cron ne fait pas : dépendances entre tâches, reprise là où ça a échoué, historique des exécutions, alertes.",
          "En local : Airflow via Docker Compose, avec le fichier officiel publié sur airflow.apache.org — puis `docker compose up`.",
        ],
      },
    ],
  },
  {
    id: "variables-environnement",
    title: "Secrets et configuration",
    level: 2,
    intro:
      "Les mots de passe ne vont ni dans le code ni dans Git.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Lire la configuration depuis l'environnement",
        code: `import os\n\nDB_HOST = os.environ["DB_HOST\"]          # échoue vite si absent\nDB_PASSWORD = os.environ["DB_PASSWORD\"]\n\n# En local : fichier .env (jamais commité)\n# DB_HOST=localhost\n# DB_PASSWORD=secret`,
      },
      {
        kind: "list",
        items: [
          "Un fichier `.env` en local, des variables d'environnement en production — le code ne change pas entre les deux.",
          "`.env` dans le `.gitignore` dès le premier commit : un secret commité est un secret compromis.",
          "En production : gestionnaires de secrets (variables chiffrées du CI, coffres) — jamais de mot de passe en clair.",
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le flux de travail quotidien",
    level: 2,
    intro:
      "Les habitudes qui gardent un pipeline sain.",
    blocks: [
      {
        kind: "list",
        items: [
          "Valider en sortie : après chaque exécution, compter les lignes, vérifier les valeurs nulles, comparer aux jours précédents — un pipeline silencieux qui écrit des zéros est pire qu'un pipeline qui plante.",
          "Idempotence : relancer le pipeline ne doit pas dupliquer les données — écrire par partition (un jour = un fichier/une partition écrasée).",
          "Logs structurés : chaque exécution loggue ce qu'elle a fait (lignes lues/écrites, durée) — c'est le premier outil de débogage.",
          "Versionner : le code du pipeline, les requêtes dbt et la configuration d'orchestration vivent dans Git.",
        ],
      },
    ],
  },
  {
    id: "premiers-projets",
    title: "Premiers projets",
    level: 2,
    intro:
      "Des pipelines complets, de la source à la consommation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Pipeline météo quotidien : API météo → Parquet partitionné par jour → agrégats hebdo → petit dashboard. Le cycle ELT complet en miniature.",
          "Warehouse e-commerce : charger 3 CSV (commandes, clients, produits) dans PostgreSQL, modéliser en schéma en étoile, exposer des vues prêtes pour BI.",
          "Ingestion d'API paginée : récupérer toutes les pages d'une API publique, gérer les erreurs et les reprises, stocker le brut en JSON puis le normaliser.",
          "Contrôles qualité : ajouter à un pipeline existant des assertions (volumes, fraîcheur, unicité des clés) qui font échouer proprement en cas d'anomalie.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "etl-vs-elt",
    title: "ETL vs ELT",
    level: 3,
    intro:
      "Transformer avant ou après le chargement : deux architectures.",
    blocks: [
      {
        kind: "table",
        headers: ["", "ETL (Extract-Transform-Load)", "ELT (Extract-Load-Transform)"],
        rows: [
          ["Ordre", "Transformer puis charger", "Charger brut puis transformer"],
          ["Où transforme-t-on", "Dans un moteur dédié", "Dans l'entrepôt (SQL)"],
          ["Données brutes conservées", "Non (seul le transformé est chargé)", "Oui (le lac garde tout)"],
          ["Idéal pour", "Sources contraintes, legacy", "Cloud warehouses puissants"],
        ],
      },
      {
        kind: "text",
        text: "L'ELT domine aujourd'hui : les entrepôts cloud sont assez puissants pour transformer en SQL après chargement, et garder le brut permet de re-transformer sans ré-extraire. L'ETL reste pertinent quand la source ne doit pas recevoir de données brutes (contraintes réglementaires) ou quand les volumes réseau sont limités.",
      },
    ],
  },
  {
    id: "modelisation-dimensionnelle",
    title: "Modélisation dimensionnelle",
    level: 3,
    intro:
      "Le schéma en étoile : la modélisation standard de l'analytique.",
    blocks: [
      {
        kind: "diagram",
        title: "Schéma en étoile : une table de faits, des dimensions",
        lines: [
          "              dim_temps",
          "                  │",
          "dim_client ──► FAITS_VENTES ◄── dim_produit",
          "                  │",
          "              dim_magasin",
          "FAITS : ce qui s'est passé (montant, quantité) + clés étrangères",
          "DIMENSIONS : qui / quoi / quand / où (attributs descriptifs)",
        ],
      },
      {
        kind: "fields",
        title: "Faits vs dimensions",
        fields: [
          {
            label: "Table de faits",
            value:
              "Les événements mesurables : une ligne par vente, avec des mesures (montant, quantité) et des clés vers les dimensions. Longue et étroite, elle grossit vite.",
          },
          {
            label: "Tables de dimensions",
            value:
              "Le contexte : clients, produits, temps, magasins. Descriptives, lentement changeantes, réutilisées par tous les faits.",
          },
          {
            label: "Pourquoi c'est efficace",
            value:
              "Les requêtes BI sont des `JOIN` faits→dimensions + `GROUP BY` : simples, rapides, comprises par tous les outils.",
          },
          {
            label: "Flocon vs étoile",
            value:
              "Normaliser les dimensions (flocon) économise un peu d'espace mais complique les requêtes. En analytique, on dénormalise : l'étoile gagne presque toujours.",
          },
        ],
      },
    ],
  },
  {
    id: "dbt",
    title: "dbt : transformer en SQL versionné",
    level: 3,
    intro:
      "Le standard de la transformation : des modèles SQL testés et documentés.",
    blocks: [
      {
        kind: "text",
        text: "dbt (data build tool) transforme des `SELECT` en pipeline : chaque modèle est un fichier SQL versionné, dbt gère les dépendances, exécute dans l'ordre, teste et documente. La transformation devient du software engineering.",
      },
      {
        kind: "command",
        label: "Installer dbt avec l'adaptateur DuckDB",
        command: "pip install dbt-core dbt-duckdb",
        why: "Installe dbt et l'adaptateur DuckDB : de quoi développer et tester des modèles en local sans warehouse cloud. En production, on remplace l'adaptateur (BigQuery, Snowflake, Postgres) sans changer les modèles.",
        verify: "dbt --version",
      },
      {
        kind: "code",
        language: "sql",
        title: "models/ventes_mensuelles.sql — un modèle dbt",
        code: `-- Un modèle = un SELECT. dbt crée la table/vue.\n{{ config(materialized='table') }}\n\nSELECT date_trunc('month', jour) AS mois,\n       SUM(montant) AS ca\nFROM {{ ref('commandes_nettoyees') }}   -- dépendance : dbt ordonne\nGROUP BY 1`,
      },
      {
        kind: "list",
        items: [
          "`{{ ref(...) }}` déclare les dépendances : dbt construit le DAG et exécute dans l'ordre.",
          "Tests intégrés : unicité, non-nullité, valeurs acceptées — déclarés en YAML, exécutés à chaque run.",
          "Documentation générée : chaque modèle et colonne documentés, lignage visible.",
        ],
      },
    ],
  },
  {
    id: "tests-donnees",
    title: "Tester les données",
    level: 3,
    intro:
      "Les données aussi se testent : contrats, contrôles, seuils.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Tests dbt en YAML (schema.yml)",
        code: `models:\n  - name: commandes_nettoyees\n    columns:\n      - name: commande_id\n        tests: [unique, not_null]\n      - name: montant\n        tests: [not_null]\n      - name: statut\n        tests: [accepted_values: {values: ['payee', 'remboursee']}]`,
      },
      {
        kind: "fields",
        title: "Les familles de tests",
        fields: [
          {
            label: "Unicité / non-nullité",
            value:
              "Les clés sont uniques, les colonnes critiques sont remplies. Le minimum vital, sur chaque modèle.",
          },
          {
            label: "Valeurs acceptées",
            value:
              "Les enums restent dans leur domaine : un nouveau statut inattendu fait échouer le test au lieu de polluer les dashboards.",
          },
          {
            label: "Fraîcheur",
            value:
              "Les données ont moins de X heures : un pipeline qui tourne mais ne reçoit plus rien est détecté.",
          },
          {
            label: "Volumes",
            value:
              "Le nombre de lignes reste dans une fourchette : une chute de 90 % signale une source cassée, pas une bonne journée.",
          },
          {
            label: "Relations",
            value:
              "Les clés étrangères existent dans la table référencée : pas de commandes orphelines.",
          },
        ],
      },
    ],
  },
  {
    id: "airflow-dag",
    title: "Airflow : les DAG",
    level: 3,
    intro:
      "L'orchestrateur standard : définir des workflows en Python.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Un DAG minimal",
        code: `from airflow import DAG\nfrom airflow.operators.bash import BashOperator\nfrom datetime import datetime\n\nwith DAG(dag_id="pipeline_quotidien\",\n         start_date=datetime(2026, 1, 1),\n         schedule="@daily\",\n         catchup=False) as dag:\n\n    extraire = BashOperator(task_id="extraire\",\n                            bash_command="python extraire.py\")\n    transformer = BashOperator(task_id="transformer\",\n                               bash_command="dbt run\")\n    controler = BashOperator(task_id="controler\",\n                             bash_command="dbt test\")\n\n    extraire >> transformer >> controler   # dépendances`,
      },
      {
        kind: "fields",
        title: "Concepts Airflow",
        fields: [
          {
            label: "DAG",
            value:
              "Directed Acyclic Graph : les tâches et leurs dépendances, sans cycle. Le plan d'exécution.",
          },
          {
            label: "Task",
            value:
              "Une unité de travail (script, requête, appel). Échoue ou réussit indépendamment — avec reprises configurables.",
          },
          {
            label: "Schedule",
            value:
              "La cadence (`@daily`, cron). `catchup=False` évite de rattraper tout l'historique au premier déploiement.",
          },
          {
            label: "XCom",
            value:
              "Échange de petites valeurs entre tâches. Pour les données, on passe par le stockage — jamais par XCom.",
          },
          {
            label: "Sensor",
            value:
              "Attend un événement (un fichier arrivé, une table à jour) au lieu de tourner à heure fixe.",
          },
        ],
      },
    ],
  },
  {
    id: "reprises-erreurs",
    title: "Reprises et gestion d'erreurs",
    level: 3,
    intro:
      "Un pipeline qui plante à 3h doit se réparer seul — ou réveiller la bonne personne.",
    blocks: [
      {
        kind: "list",
        items: [
          "Retries avec backoff : réessayer 2-3 fois en espaçant (les pannes réseau et les sources lentes sont transitoires) — pas 50 fois en boucle.",
          "Idempotence d'abord : une tâche réessayée ne doit pas dupliquer — écrire par partition écrasée, ou avec des clés stables.",
          "Alertes ciblées : notifier sur les échecs définitifs, pas sur chaque retry — sinon l'équipe ignore les alertes (fatigue d'alerte).",
          "SLA : définir le délai acceptable (« les données de J-1 avant 8h ») et alerter quand il est dépassé, même si le pipeline « tourne ».",
          "Dead letter : les enregistrements en erreur vont dans une zone de quarantaine, pas à la poubelle — on les analyse et on les rejoue.",
        ],
      },
      {
        kind: "text",
        text: "Le pire pipeline n'est pas celui qui plante — il se voit. C'est celui qui réussit en écrivant des données fausses. D'où l'ordre : contrôles qualité d'abord, alertes ensuite.",
      },
    ],
  },
  {
    id: "streaming-kafka",
    title: "Streaming avec Kafka",
    level: 3,
    intro:
      "Quand le batch ne suffit plus : traiter les événements en continu.",
    blocks: [
      {
        kind: "command",
        label: "Lancer Kafka en local (KRaft, sans ZooKeeper)",
        command: "docker run -p 9092:9092 -d apache/kafka:3.8",
        why: "Démarre un broker Kafka en mode KRaft dans un conteneur, avec l'image officielle. De quoi créer des topics et tester producteurs/consommateurs en local.",
        verify: "docker logs kafka 2>&1 | tail -5",
      },
      {
        kind: "fields",
        title: "Les concepts Kafka",
        fields: [
          {
            label: "Topic",
            value:
              "Un flux nommé d'événements (`commandes`, `clics`) : l'unité logique. Les producteurs y écrivent, les consommateurs y lisent.",
          },
          {
            label: "Partition",
            value:
              "Le découpage d'un topic en segments parallèles : ce qui permet le débit. L'ordre n'est garanti qu'au sein d'une partition.",
          },
          {
            label: "Consumer group",
            value:
              "Des consommateurs qui se partagent les partitions : parallélisme + reprise là où le groupe s'était arrêté (offsets).",
          },
          {
            label: "Rétention",
            value:
              "Les événements restent stockés (jours, semaines) : on peut rejouer l'historique — impossible avec une simple file.",
          },
        ],
      },
    ],
  },
  {
    id: "batch-vs-streaming",
    title: "Batch vs streaming",
    level: 3,
    intro:
      "Choisir selon le besoin de fraîcheur — pas par mode.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Batch", "Streaming"],
        rows: [
          ["Latence", "Minutes à heures", "Secondes"],
          ["Complexité", "Simple : un script planifié", "Élevée : état, ordre, reprises"],
          ["Coût", "Faible", "Infrastructure permanente"],
          ["Rejouabilité", "Naturelle (relancer sur la période)", "À concevoir (rétention, offsets)"],
          ["Idéal pour", "Reporting, dashboards quotidiens", "Fraude, alertes, personnalisation temps réel"],
        ],
      },
      {
        kind: "text",
        text: "Règle : commencer en batch. Passer au streaming quand la valeur de la fraîcheur dépasse son coût — fraude bancaire, monitoring, trading. Un dashboard « temps réel » que personne ne regarde en temps réel est du batch déguisé, en plus cher.",
      },
    ],
  },
  {
    id: "spark",
    title: "Spark : le traitement distribué",
    level: 3,
    intro:
      "Quand une machine ne suffit plus : distribuer le calcul.",
    blocks: [
      {
        kind: "text",
        text: "Apache Spark distribue les traitements sur un cluster : les données sont découpées en partitions, chaque nœud traite sa part, les résultats sont assemblés. Le modèle : DataFrames distribués, transformations paresseuses, exécution optimisée.",
      },
      {
        kind: "list",
        items: [
          "Transformations paresseuses : `filter`, `groupBy` construisent un plan — rien ne s'exécute avant une action (`count`, `write`).",
          "L'optimiseur (Catalyst) réécrit le plan : l'ordre d'écriture compte moins qu'en pandas.",
          "Shuffle : redistribuer les données entre nœuds (jointures, `groupBy`) — l'opération coûteuse à surveiller.",
          "En pratique : PySpark reprend l'API des DataFrames — les réflexes pandas/SQL se transfèrent.",
          "Ne pas distribuer trop tôt : un nœud puissant avec DuckDB ou Polars traite des centaines de Go — Spark se justifie au-delà.",
        ],
      },
    ],
  },
  {
    id: "lake-warehouse-lakehouse",
    title: "Lake, warehouse, lakehouse",
    level: 3,
    intro:
      "Trois architectures de stockage : comprendre les différences.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Data lake", "Data warehouse", "Lakehouse"],
        rows: [
          ["Contenu", "Données brutes, tous formats", "Données modélisées, SQL", "Les deux sur un stockage unique"],
          ["Coût stockage", "Bas (objet)", "Plus élevé", "Bas (objet)"],
          ["Performance SQL", "Moyenne", "Élevée (optimisé)", "Élevée (index, cache)"],
          ["Gouvernance", "Faible par défaut", "Forte", "Forte (transactions, versions)"],
          ["Exemples", "S3 + fichiers", "BigQuery, Snowflake", "Delta Lake, Iceberg"],
        ],
      },
      {
        kind: "text",
        text: "Le lakehouse (Delta Lake, Apache Iceberg) apporte au stockage objet les propriétés des warehouses : transactions ACID, time travel, schéma évolutif. C'est l'architecture qui monte pour les nouvelles plateformes.",
      },
    ],
  },
  {
    id: "partitionnement",
    title: "Partitionnement",
    level: 3,
    intro:
      "Découper les données pour ne lire que l'utile : la clé des performances.",
    blocks: [
      {
        kind: "text",
        text: "Partitionner = ranger les fichiers par valeur d'une colonne (souvent la date) : `ventes/annee=2026/mois=09/jour=28.parquet`. Une requête sur septembre ne lit que les fichiers de septembre — le partition pruning élimine le reste avant lecture.",
      },
      {
        kind: "list",
        items: [
          "Partitionner par la colonne la plus filtrée (date, pays) — jamais par une colonne à forte cardinalité (user_id : des millions de petits fichiers tuent les performances).",
          "Taille de fichier cible : ~100 Mo à 1 Go — ni trop de petits fichiers, ni des monstres.",
          "Écriture par partition = idempotence naturelle : réécrire le jour J n'affecte que la partition du jour J.",
          "En streaming : partitionner par heure d'arrivée, puis compacter — les petits fichiers s'accumulent vite.",
        ],
      },
    ],
  },
  {
    id: "idempotence",
    title: "Idempotence",
    level: 3,
    intro:
      "La propriété qui rend les reprises sûres : rejouer sans dupliquer.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Écriture idempotente par partition",
        code: `import pandas as pd\n\ndef charger_jour(date_jour: str):\n    df = extraire(date_jour)\n    clean = transformer(df)\n    # Écraser la partition du jour : rejouer 10 fois = même résultat\n    clean.to_parquet(f"warehouse/jour={date_jour}/data.parquet\")\n\n# À éviter : append sans contrôle → chaque reprise duplique`,
      },
      {
        kind: "list",
        items: [
          "Techniques : écriture par partition écrasée, clés stables + `MERGE`/`upsert`, suppression-then-insert par fenêtre.",
          "Tester l'idempotence : exécuter deux fois de suite et comparer — les résultats doivent être identiques.",
          "Sans idempotence, pas de retry automatique fiable : chaque reprise manuelle devient une opération risquée.",
        ],
      },
    ],
  },
  {
    id: "backfill",
    title: "Backfill : rejouer l'historique",
    level: 3,
    intro:
      "Corriger le passé : réexécuter le pipeline sur d'anciennes périodes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cas typiques : bug de transformation découvert après coup, nouvelle métrique à calculer sur l'historique, changement de modélisation.",
          "Condition : garder les données brutes (le lac) — sans elles, pas de backfill possible, seulement des excuses.",
          "Méthode : exécuter le pipeline par partition historique, dans l'ordre chronologique si les calculs dépendent du passé (cumulés).",
          "Garde-fous : backfiller sur un environnement isolé d'abord, comparer avant/après sur un échantillon, annoncer aux consommateurs (les dashboards vont changer).",
          "Coût : un backfill d'un an peut coûter cher en calcul — estimer avant de lancer, paralléliser par partition.",
        ],
      },
    ],
  },
  {
    id: "schema-evolution",
    title: "Évolution des schémas",
    level: 3,
    intro:
      "Les sources changent : colonnes ajoutées, types modifiés, champs renommés.",
    blocks: [
      {
        kind: "fields",
        title: "Les cas et leurs réponses",
        fields: [
          {
            label: "Colonne ajoutée",
            value:
              "Le cas facile : l'ignorer ou l'intégrer. Avec Parquet, les anciens fichiers n'ont simplement pas la colonne (null logique).",
          },
          {
            label: "Colonne renommée",
            value:
              "Le cas traître : pour le pipeline, c'est une suppression + un ajout — les dashboards cassent. Maintenir une table de correspondance (mapping) explicite.",
          },
          {
            label: "Type modifié",
            value:
              "Texte → nombre, par exemple : caster explicitement à l'ingestion, avec une règle pour les valeurs inconvertissables (quarantaine, pas crash).",
          },
          {
            label: "Champ supprimé",
            value:
              "Si un modèle en dépend, le pipeline doit échouer vite (test de schéma) plutôt que produire des nulls silencieux.",
          },
        ],
      },
      {
        kind: "text",
        text: "Contrat de schéma à l'ingestion : valider les colonnes attendues avant de charger. C'est le test le moins cher et celui qui évite le plus de dégâts.",
      },
    ],
  },
  {
    id: "cdc",
    title: "CDC : capturer les changements",
    level: 3,
    intro:
      "Répliquer une base en continu : la Change Data Capture.",
    blocks: [
      {
        kind: "text",
        text: "La CDC lit le journal des transactions de la base source (WAL de Postgres, binlog de MySQL) et émet chaque insertion, mise à jour et suppression comme un événement. Résultat : une réplique quasi temps réel, sans requêter la base de production.",
      },
      {
        kind: "list",
        items: [
          "Avantage sur l'extraction par `updated_at` : capture les suppressions, pas de lignes manquées, latence de quelques secondes.",
          "Outils : Debezium (open source, standard) connecté à Kafka — chaque table devient un topic.",
          "Cas d'usage : alimenter le warehouse en continu, synchroniser des microservices, déclencher des traitements à chaque changement.",
          "Coût : infrastructure (Kafka + connecteurs) et monitoring — à réserver aux sources qui en valent la peine.",
        ],
      },
    ],
  },
  {
    id: "ingestion-api",
    title: "Ingestion depuis des APIs",
    level: 3,
    intro:
      "Les APIs sont des sources capricieuses : pagination, quotas, erreurs.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Extraction robuste avec pagination",
        code: `import requests, time\n\ndef extraire_tout(url, params=None):\n    resultats, page = [], 1\n    while True:\n        r = requests.get(url, params={**(params or {}), "page\": page},\n                         timeout=30)\n        if r.status_code == 429:          # quota dépassé : attendre\n            attente = int(r.headers.get("Retry-After\", 60))\n            time.sleep(attente)\n            continue\n        r.raise_for_status()\n        lot = r.json()["data\"]\n        if not lot:\n            break\n        resultats.extend(lot)\n        page += 1\n    return resultats`,
      },
      {
        kind: "list",
        items: [
          "Toujours gérer le 429 (trop de requêtes) : respecter `Retry-After`, avec backoff exponentiel.",
          "Stocker la réponse brute avant de normaliser : si le parsing évolue, on rejoue sans ré-appeler l'API.",
          "Reprise : mémoriser la dernière page/timestamp traité — une extraction de 10 000 pages ne doit pas repartir de zéro.",
          "`timeout` systématique : un appel bloqué fige tout le pipeline.",
        ],
      },
    ],
  },
  {
    id: "observabilite",
    title: "Observabilité des pipelines",
    level: 3,
    intro:
      "Voir ce qui se passe : logs, métriques, lignage.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois piliers",
        fields: [
          {
            label: "Logs",
            value:
              "Chaque exécution raconte son histoire : lignes lues/écrites, durée par étape, erreurs. Structurés (JSON) pour être requêtables, pas juste lisibles.",
          },
          {
            label: "Métriques",
            value:
              "Volumes, durées, taux d'erreur par pipeline — avec des seuils d'alerte. Une durée qui double progressivement signale un problème avant la panne.",
          },
          {
            label: "Lignage",
            value:
              "Quelle table vient de quelle source via quelles transformations : quand un chiffre est suspect, on remonte la chaîne. dbt le génère automatiquement.",
          },
        ],
      },
      {
        kind: "text",
        text: "Question test : « d'où vient ce chiffre du dashboard ? » Si la réponse prend plus de 5 minutes, l'observabilité est insuffisante. Le lignage et les logs d'exécution sont la réponse.",
      },
    ],
  },
  {
    id: "ci-cd-data",
    title: "CI/CD pour les pipelines",
    level: 3,
    intro:
      "Tester avant de déployer : l'intégration continue appliquée à la data.",
    blocks: [
      {
        kind: "list",
        items: [
          "À chaque commit : exécuter les modèles dbt sur un échantillon, lancer les tests de données, vérifier que le DAG se parse.",
          "Environnements : développement (échantillon), staging (copie réduite), production — jamais de test direct en prod.",
          "Déploiement : versionné, réversible — pouvoir revenir à la version précédente du pipeline en cas de régression.",
          "Tests de non-régression : comparer les sorties avant/après sur les mêmes entrées — un refactoring ne doit pas changer les chiffres.",
        ],
      },
    ],
  },
  {
    id: "securite-donnees",
    title: "Sécurité et confidentialité",
    level: 3,
    intro:
      "Les pipelines manipulent des données sensibles : les protéger par conception.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chiffrement : en transit (TLS) et au repos (chiffrement du stockage) — la base, non négociable.",
          "Minimisation : ne pas ingérer ce dont on n'a pas besoin — moins de données sensibles stockées, moins de risque.",
          "Masquage : les environnements de développement utilisent des données anonymisées, jamais la production copiée telle quelle.",
          "Accès : principe du moindre privilège — le pipeline lit ce qu'il doit, écrit où il doit, rien de plus.",
          "Traçabilité : qui a accédé à quoi — les audits réglementaires l'exigent, et c'est sain même sans obligation.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les fautes qui reviennent dans tous les pipelines.",
    blocks: [
      {
        kind: "list",
        items: [
          "Duplicats après reprise : pipeline non idempotent relancé après un échec partiel — les chiffres doublent silencieusement.",
          "Fuseaux horaires : mélanger UTC et heures locales dans les partitions — des jours à 23h ou 25h, des fenêtres qui se chevauchent.",
          "NULL vs 0 vs vide : trois choses différentes — les agréger pareil fausse les moyennes et les taux.",
          "Schéma implicite : supposer les colonnes au lieu de les valider — la source ajoute une colonne, le pipeline casse (ou pire : continue faux).",
          "Tout charger en mémoire : `pd.read_csv` sur 50 Go — lire par chunks ou passer à un moteur hors-mémoire.",
          "Pas de contrôle qualité : le pipeline « réussit » mais écrit des zéros — détecté trois semaines plus tard par le métier.",
          "Secrets en dur : mot de passe dans le script, commité, poussé — irréversible une fois public.",
          "Backfill sans prévenir : les dashboards historiques changent du jour au lendemain, la confiance s'effondre.",
        ],
      },
    ],
  },
  {
    id: "debugging-pipelines",
    title: "Déboguer un pipeline",
    level: 3,
    intro:
      "Quand les chiffres sont faux : remonter la chaîne méthodiquement.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Qualifier le symptôme",
            detail:
              "Zéro ligne ? Trop de lignes ? Valeurs aberrantes ? Depuis quand ? Un symptôme précis divise par deux le temps de recherche.",
          },
          {
            title: "Vérifier la source",
            detail:
              "Les données d'entrée sont-elles normales (volume, fraîcheur) ? 80 % des pannes viennent de la source, pas du pipeline.",
          },
          {
            title: "Isoler l'étape",
            detail:
              "Exécuter chaque étape séparément sur un échantillon : entrée/sortie comparées — l'étape fautive est celle dont la sortie dévie.",
          },
          {
            title: "Lire les logs",
            detail:
              "Lignes traitées, durées, avertissements : le pipeline raconte souvent sa panne, encore faut-il lire.",
          },
          {
            title: "Rejouer en local",
            detail:
              "Reproduire avec les mêmes entrées sur un échantillon : itérer vite sans toucher à la production.",
          },
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance des pipelines",
    level: 3,
    intro:
      "Quand le pipeline ne finit plus avant 8h : où optimiser.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lire moins : partition pruning, sélection de colonnes, filtres poussés à la source — le plus rapide est de ne pas lire.",
          "Formats colonnaires : Parquet plutôt que CSV/JSON — 10× moins de données lues pour les mêmes requêtes.",
          "Éviter les shuffles : en Spark, les jointures et `groupBy` redistribuent les données — partitionner intelligemment en amont.",
          "Paralléliser par partition : les jours sont indépendants — les traiter en parallèle, pas en séquence.",
          "Éviter les `SELECT *` : chaque colonne lue coûte — surtout sur du colonnaire où on paie par colonne.",
          "Mesurer d'abord : profiler l'étape lente (logs de durée par étape) avant d'optimiser — l'intuition se trompe souvent.",
        ],
      },
    ],
  },
  {
    id: "couts",
    title: "Maîtriser les coûts",
    level: 3,
    intro:
      "Le cloud facture chaque requête : le data engineering a un prix.",
    blocks: [
      {
        kind: "list",
        items: [
          "Les warehouses serverless facturent les données scannées : partitionner et filtrer tôt, c'est de l'argent.",
          "Cycle de vie du stockage : données chaudes (accès fréquent), tièdes, froides (archives) — le stockage objet permet des classes à coût décroissant.",
          "Éteindre ce qui ne sert pas : clusters de dev la nuit, environnements temporaires après les tests.",
          "Alertes budgétaires : un seuil par projet, une alerte qui part avant la facture — pas après.",
          "Le backfill d'un an et le `SELECT *` sur 10 To sont les deux classiques de la facture surprise.",
        ],
      },
    ],
  },
  {
    id: "data-contracts",
    title: "Data contracts",
    level: 3,
    intro:
      "Formaliser l'accord entre producteurs et consommateurs de données.",
    blocks: [
      {
        kind: "text",
        text: "Un data contract est un accord explicite : la source s'engage sur un schéma, des volumes, une fraîcheur ; le consommateur s'engage sur un usage. Quand la source change, le contrat versionné permet de coordonner au lieu de subir.",
      },
      {
        kind: "list",
        items: [
          "Contenu typique : schéma (colonnes, types), fréquence de mise à jour, SLA de fraîcheur, propriétaire à contacter.",
          "Le contrat se teste : valider chaque livraison contre le contrat — un changement non annoncé fait échouer proprement.",
          "Sans contrat, chaque changement de source est une surprise ; avec, c'est une migration planifiée.",
        ],
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets avancés",
    level: 3,
    intro:
      "Des projets qui ressemblent à une vraie plateforme data.",
    blocks: [
      {
        kind: "list",
        items: [
          "Plateforme ELT complète : ingestion d'API → lac brut → modèles dbt → tests → orchestration Airflow → dashboard — le projet portfolio du data engineer.",
          "CDC temps réel : Debezium + Kafka pour répliquer une base Postgres vers le warehouse en continu, avec monitoring du lag.",
          "Pipeline de qualité : framework de contrôles générique (volumes, fraîcheur, schéma) applicable à n'importe quelle table, avec alertes.",
          "Lakehouse : Delta Lake ou Iceberg sur stockage objet — time travel, upserts, évolution de schéma.",
          "Streaming de logs : Kafka → agrégations en fenêtre → sink vers le warehouse — compter en continu, servir en batch.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Les documentations officielles et les références du métier.",
    blocks: [
      {
        kind: "list",
        items: [
          "Documentation Apache Airflow (airflow.apache.org) : concepts, opérateurs, bonnes pratiques de déploiement.",
          "Documentation dbt (docs.getdbt.com) : modèles, tests, materializations — le guide de référence.",
          "Documentation Apache Kafka (kafka.apache.org) : topics, consumer groups, configuration.",
          "Documentation Apache Spark (spark.apache.org) : programmation, tuning, SQL.",
          "Documentation DuckDB (duckdb.org) : le guide SQL analytique local.",
          "« Fundamentals of Data Engineering » (Joe Reis, Matt Housley, O'Reilly) : le livre qui structure le métier de bout en bout.",
        ],
      },
      {
        kind: "text",
        text: "Les documentations officielles sont liées depuis les pages via le bouton « Documentation officielle » ; les livres sont cités par leur nom exact.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le data engineering maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes de progression",
        fields: [
          {
            label: "`analytics`",
            value:
              "Comprendre les consommateurs de vos pipelines : ce qu'un analyste attend des tables — nommage, documentation, fraîcheur.",
          },
          {
            label: "`data-science`",
            value:
              "Alimenter des modèles : feature stores, jeux d'entraînement versionnés — le pipeline devient le socle du ML.",
          },
          {
            label: "`sql`",
            value:
              "Approfondir : optimisation de requêtes, plans d'exécution, indexation — la performance des transformations.",
          },
          {
            label: "`kafka`",
            value:
              "Aller plus loin dans le streaming : exactly-once, stream processing, schémas avec registre.",
          },
          {
            label: "`devops`",
            value:
              "Industrialiser : Terraform pour l'infrastructure data, CI/CD, monitoring — le data engineer rencontre le platform.",
          },
          {
            label: "Prochain pas concret",
            value:
              "Construire la plateforme ELT complète en projet portfolio : c'est ce que les recruteurs veulent voir — pas un notebook, un système.",
          },
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des bases de données : stocker, modéliser et
 * interroger la donnée de façon fiable. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 * Les exemples SQL restent en syntaxe standard, sans particularisme
 * d'un SGBD, sauf mention explicite.
 */
export const LEARNING_DATABASES: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est une base de données et pourquoi toute application finit par en avoir besoin.",
    blocks: [
      {
        kind: "text",
        text: "Une base de données stocke l'information de façon durable, organisée et interrogeable. Sans elle, une application oublie tout à chaque redémarrage : les comptes, les commandes, les messages. Fichiers, tableurs et variables en mémoire s'effondrent dès que les données deviennent nombreuses, partagées ou critiques — la base de données apporte la persistance, la structure et les garanties.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est un choix d'architecture : le type de base (relationnel, document, clé-valeur…), la modélisation (quelles tables, quelles relations) et les garanties (transactions, sauvegardes) déterminent la fiabilité de tout le système. On ne « rajoute » pas une base à la fin : on conçoit autour d'elle.",
      },
      {
        kind: "list",
        items: [
          "Persistance : les données survivent au redémarrage de l'application.",
          "Interrogation : retrouver précisément ce qu'on cherche parmi des millions d'enregistrements.",
          "Intégrité : empêcher les données incohérentes (commande sans client, stock négatif).",
          "Concurrence : plusieurs utilisateurs qui écrivent en même temps sans se marcher dessus.",
        ],
      },
    ],
  },
  {
    id: "familles-de-bases",
    title: "Les familles de bases de données",
    level: 1,
    intro:
      "Le paysage en une image : chaque famille a son modèle de données et ses usages.",
    blocks: [
      {
        kind: "diagram",
        title: "Les quatre grandes familles",
        lines: [
          "Bases de données",
          "     │",
          "     ├── RELATIONNEL (SQL)",
          "     │     Tables, lignes, colonnes, jointures",
          "     │     Exemples : PostgreSQL, MySQL, SQLite",
          "     │     → Données structurées, intégrité forte",
          "     │",
          "     ├── DOCUMENT (NoSQL)",
          "     │     Documents JSON indépendants, schéma flexible",
          "     │     Exemple : MongoDB",
          "     │     → Contenus, catalogues, prototypage rapide",
          "     │",
          "     ├── CLÉ-VALEUR",
          "     │     Dictionnaire géant en mémoire, accès ultra-rapide",
          "     │     Exemple : Redis",
          "     │     → Cache, sessions, files d'attente",
          "     │",
          "     └── COLONNE / GRAPHE",
          "           Stockage en colonnes (analytique) ou nœuds+relations (réseaux)",
          "           → Data warehouses, réseaux sociaux, recommandations",
        ],
      },
      {
        kind: "text",
        text: "Le relationnel (SQL) reste le choix par défaut : schéma rigoureux, requêtes puissantes, décennies d'éprouvé. Les autres familles répondent à des besoins spécifiques — cache à haute vitesse, documents hétérogènes, volumes analytiques — pas à une mode. Une application utilise souvent plusieurs familles ensemble.",
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
      "Le bagage minimal avant de manipuler une base de données.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations nécessaires",
        fields: [
          {
            label: "Fichiers et formats",
            value:
              "CSV, JSON : d'où viennent les données et sous quelle forme. Une base organise ce que les fichiers laissent en vrac.",
          },
          {
            label: "Logique de base",
            value:
              "Conditions (ET, OU, NON), tri, ensembles : le `WHERE` d'une requête n'est que de la logique appliquée.",
          },
          {
            label: "Ligne de commande",
            value:
              "Le client SQL (`psql`, `mysql`, `sqlite3`) se pilote au terminal : l'outil principal du débutant comme du DBA.",
          },
          {
            label: "Notions réseau",
            value:
              "Hôte, port, identifiants : se connecter à une base distante suppose ces bases.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-docker",
    title: "Installer PostgreSQL avec Docker",
    level: 2,
    intro:
      "Une base locale en une commande, sans installer de serveur sur la machine.",
    blocks: [
      {
        kind: "command",
        label: "Démarrer un serveur PostgreSQL",
        command: "docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres:16",
        why: "Lance un serveur PostgreSQL 16 dans un conteneur nommé `pg` : le mot de passe `postgres`/`secret` est défini par variable d'environnement, et le port 5432 du conteneur est exposé sur la machine. En développement local uniquement — jamais ce mot de passe en production.",
        verify: "docker ps",
      },
      {
        kind: "command",
        label: "Se connecter et vérifier",
        command: "docker exec -it pg psql -U postgres -c \"SELECT version();\"",
        why: "`docker exec` exécute une commande dans le conteneur : ici `psql`, le client PostgreSQL, avec une requête qui affiche la version du serveur. Si elle s'affiche, le serveur répond.",
        verify: "docker exec -it pg psql -U postgres -c \"SELECT 1;\"",
      },
      {
        kind: "text",
        text: "Pour arrêter : `docker stop pg`. Pour repartir avec les mêmes données : `docker start pg`. Les données vivent dans le conteneur tant qu'on ne le supprime pas — pour les rendre vraiment persistantes, on ajoutera un volume (niveau 3).",
      },
    ],
  },
  {
    id: "premieres-requetes",
    title: "Premières requêtes SQL",
    level: 2,
    intro:
      "Créer une table, y insérer des données, les relire : le cycle fondamental.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Créer, insérer, lire",
        code: `-- Créer une table : nom + colonnes + types\nCREATE TABLE clients (\n  id INTEGER PRIMARY KEY,\n  nom TEXT NOT NULL,\n  email TEXT UNIQUE,\n  inscrit_le DATE DEFAULT CURRENT_DATE\n);\n\n-- Insérer des lignes\nINSERT INTO clients (id, nom, email) VALUES\n  (1, 'Ada', 'ada@example.com'),\n  (2, 'Grace', 'grace@example.com');\n\n-- Relire : tout, puis filtré et trié\nSELECT * FROM clients;\nSELECT nom, email FROM clients WHERE id = 1;\nSELECT nom FROM clients ORDER BY nom;`,
      },
      {
        kind: "fields",
        title: "Lire le code",
        fields: [
          { label: "`PRIMARY KEY`", value: "Identifiant unique de chaque ligne : jamais deux lignes avec le même `id`." },
          { label: "`NOT NULL` / `UNIQUE`", value: "Contraintes d'intégrité : le nom est obligatoire, l'email ne peut pas être en double." },
          { label: "`DEFAULT CURRENT_DATE`", value: "Valeur automatique si non précisée : la date d'inscription se remplit seule." },
          { label: "`SELECT … WHERE … ORDER BY`", value: "Le trio de lecture : choisir les colonnes, filtrer les lignes, trier le résultat." },
        ],
      },
    ],
  },
  {
    id: "cles-et-relations",
    title: "Clés et relations",
    level: 2,
    intro:
      "Relier les tables entre elles : le cœur du modèle relationnel.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Clients et commandes liés",
        code: `CREATE TABLE commandes (\n  id INTEGER PRIMARY KEY,\n  client_id INTEGER NOT NULL REFERENCES clients(id),\n  montant NUMERIC(10, 2) NOT NULL,\n  statut TEXT DEFAULT 'en_attente'\n);\n\nINSERT INTO commandes (id, client_id, montant) VALUES\n  (101, 1, 49.90),\n  (102, 1, 19.90),\n  (103, 2, 99.00);`,
      },
      {
        kind: "text",
        text: "`client_id REFERENCES clients(id)` est une clé étrangère : chaque commande pointe vers un client qui existe réellement. La base refuse une commande pour un client inexistant, et refuse (par défaut) de supprimer un client qui a des commandes. L'intégrité est garantie par la base, pas par la bonne volonté du code.",
      },
    ],
  },
  {
    id: "jointures-bases",
    title: "Les jointures : lire à travers les tables",
    level: 2,
    intro:
      "La requête la plus utile du SQL : combiner les tables liées.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Commandes avec le nom du client",
        code: `SELECT c.nom, cmd.montant, cmd.statut\nFROM commandes AS cmd\nJOIN clients AS c ON cmd.client_id = c.id\nWHERE cmd.statut = 'en_attente';`,
      },
      {
        kind: "diagram",
        title: "Ce que fait le JOIN",
        lines: [
          "commandes                    clients",
          "┌────┬───────────┬────────┐  ┌────┬───────┐",
          "│ id │ client_id │ montant│  │ id │  nom  │",
          "├────┼───────────┼────────┤  ├────┼───────┤",
          "│101 │     1     │  49.90 │──│ 1  │  Ada  │",
          "│102 │     1     │  19.90 │──│    │       │",
          "│103 │     2     │  99.00 │──│ 2  │ Grace │",
          "└────┴───────────┴────────┘  └────┴───────┘",
          "         │ ON cmd.client_id = c.id │",
          "         └──────────┬──────────────┘",
          "                  ▼",
          "   une seule table virtuelle combinée",
        ],
      },
    ],
  },
  {
    id: "normalisation-bases",
    title: "Normalisation : les trois premières formes",
    level: 2,
    intro:
      "Éviter les duplications et les anomalies : les règles de bonne modélisation.",
    blocks: [
      {
        kind: "fields",
        title: "1NF, 2NF, 3NF en bref",
        fields: [
          { label: "1NF — atomicité", value: "Chaque case contient une valeur unique et indivisible : pas de liste « pomme, poire » dans une colonne, pas de colonnes `tel1`, `tel2`, `tel3`." },
          { label: "2NF — dépendance totale", value: "Chaque colonne non-clé dépend de toute la clé, pas d'une partie : avec une clé composée (commande, produit), le nom du produit ne doit pas être répété dans la table des lignes." },
          { label: "3NF — pas de transitivité", value: "Aucune colonne ne dépend d'une autre colonne non-clé : la ville ne doit pas dépendre du code postal stocké dans la même table — elle va dans une table `villes`." },
        ],
      },
      {
        kind: "text",
        text: "L'idée en une phrase : chaque fait est stocké une seule fois, au bon endroit. Les violations créent des anomalies : mettre à jour un nom à un endroit et l'oublier ailleurs, ne pas pouvoir ajouter une ville sans client, perdre une information en supprimant une ligne.",
      },
    ],
  },
  {
    id: "transactions",
    title: "Transactions : tout ou rien",
    level: 2,
    intro:
      "Le mécanisme qui rend les écritures fiables même en cas de panne.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Un virement sans risque",
        code: `-- Les deux écritures réussissent ensemble, ou aucune n'est appliquée.\nBEGIN;\nUPDATE comptes SET solde = solde - 100 WHERE id = 1;\nUPDATE comptes SET solde = solde + 100 WHERE id = 2;\nCOMMIT;\n\n-- En cas de problème au milieu : tout est annulé.\n-- BEGIN; ...; ROLLBACK;`,
      },
      {
        kind: "fields",
        title: "ACID : les quatre garanties",
        fields: [
          { label: "Atomicité", value: "Tout réussit ou rien n'est appliqué : pas de virement à moitié effectué." },
          { label: "Cohérence", value: "La base passe d'un état valide à un autre : les contraintes restent vraies." },
          { label: "Isolation", value: "Les transactions concurrentes ne se voient pas à moitié : chacune travaille comme si elle était seule." },
          { label: "Durabilité", value: "Une fois `COMMIT` confirmé, c'est écrit durablement — même si le serveur plante une seconde après." },
        ],
      },
    ],
  },
  {
    id: "index-bases",
    title: "Les index : accélérer la lecture",
    level: 2,
    intro:
      "Pourquoi une recherche est instantanée sur des millions de lignes.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Créer un index",
        code: `-- Sans index : la base scanne toute la table pour ce WHERE.\nSELECT * FROM clients WHERE email = 'ada@example.com';\n\n-- Avec index : recherche quasi instantanée.\nCREATE INDEX idx_clients_email ON clients (email);`,
      },
      {
        kind: "text",
        text: "Un index est une structure auxiliaire (souvent un arbre) qui localise les lignes sans tout lire. Le prix : chaque `INSERT`, `UPDATE` et `DELETE` doit aussi maintenir les index, et ils occupent de l'espace. On indexe les colonnes cherchées souvent (`WHERE`, `JOIN`, `ORDER BY`), pas toutes les colonnes.",
      },
    ],
  },
  {
    id: "sql-vs-nosql",
    title: "SQL ou NoSQL : choisir",
    level: 2,
    intro:
      "Pas de guerre de religion : un tableau de décision.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "Relationnel (SQL)", "Document / clé-valeur (NoSQL)"],
        rows: [
          ["Schéma", "Rigide, défini à l'avance", "Flexible, évolue document par document"],
          ["Intégrité", "Contraintes et transactions fortes", "Variable selon le système"],
          ["Requêtes", "SQL : jointures, agrégations puissantes", "Souvent limitées à des accès par clé ou requêtes simples"],
          ["Montée en charge", "Verticale d'abord (plus grosse machine)", "Horizontale naturelle (plus de machines)"],
          ["Cas typiques", "Comptabilité, e-commerce, tout ce qui compte", "Cache, sessions, contenus hétérogènes, logs"],
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : commencer en relationnel sauf raison précise d'en sortir. La flexibilité du NoSQL se paie en intégrité et en requêtes — un coût qui se révèle quand l'application grandit.",
      },
    ],
  },
  {
    id: "sauvegardes-bases",
    title: "Sauvegardes : le minimum vital",
    level: 2,
    intro:
      "Une base sans sauvegarde testée est une base qu'on n'a pas encore perdue.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois pratiques non négociables",
        fields: [
          { label: "Sauvegarder régulièrement", value: "Dump complet périodique (quotidien au minimum pour des données vivantes) + journal des transactions pour rejouer jusqu'au moment de la panne." },
          { label: "Stocker ailleurs", value: "La sauvegarde sur le même disque que la base ne protège de rien : copie distante, autre machine, autre fournisseur." },
          { label: "Tester la restauration", value: "Une sauvegarde jamais restaurée est une hypothèse. Restaurer sur une machine de test, vérifier que l'application redémarre — régulièrement." },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Trois projets pour passer des requêtes isolées à une base bien tenue.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Base e-commerce modélisée",
        fields: [
          { label: "Objectif", value: "Schéma complet : clients, produits, commandes, lignes de commande, avec clés et contraintes." },
          { label: "Compétences", value: "Modélisation, clés primaires/étrangères, `JOIN`, contraintes d'intégrité." },
          { label: "Difficulté", value: "Faible — quelques jours" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Requêtes analytiques",
        fields: [
          { label: "Objectif", value: "Tableau de bord : chiffre d'affaires par mois, top produits, panier moyen — en SQL pur." },
          { label: "Compétences", value: "Agrégations, `GROUP BY`/`HAVING`, sous-requêtes, vues." },
          { label: "Difficulté", value: "Moyenne — une à deux semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Base durcie et sauvegardée",
        fields: [
          { label: "Objectif", value: "La base du projet précédent avec index optimisés, transactions, rôles et sauvegardes automatisées testées." },
          { label: "Compétences", value: "Indexation, plans d'exécution, droits, dump/restauration, monitoring." },
          { label: "Difficulté", value: "Élevée — plusieurs semaines" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "types-de-donnees",
    title: "Types de données",
    level: 3,
    intro: "Choisir le bon type : précision, espace et intentions.",
    blocks: [
      {
        kind: "fields",
        title: "Les types courants (SQL standard)",
        fields: [
          { label: "`INTEGER` / `BIGINT`", value: "Nombres entiers : identifiants, compteurs. `BIGINT` quand ça peut dépasser 2 milliards." },
          { label: "`NUMERIC(p, s)` / `DECIMAL`", value: "Nombres exacts : monnaie, comptabilité. Jamais de flottant pour l'argent." },
          { label: "`REAL` / `DOUBLE PRECISION`", value: "Flottants approximatifs : mesures scientifiques, pas la monnaie." },
          { label: "`TEXT` / `VARCHAR(n)`", value: "Chaînes : `TEXT` sans limite arbitraire, `VARCHAR(n)` quand la limite a un sens métier." },
          { label: "`BOOLEAN`", value: "Vrai/faux : préférable à un entier 0/1 ou une chaîne « oui »/« non »." },
          { label: "`DATE`, `TIME`, `TIMESTAMP`", value: "Temps : `TIMESTAMP WITH TIME ZONE` pour tout ce qui traverse des fuseaux horaires." },
          { label: "`JSON` / `JSONB`", value: "Document semi-structuré dans une colonne : utile pour les attributs variables, sans renoncer au relationnel." },
          { label: "Binaires (`BYTEA`, `BLOB`)", value: "Fichiers bruts : à réserver aux petits objets — les gros fichiers vivent mieux dans un stockage objet." },
        ],
      },
      {
        kind: "text",
        text: "Le type est une documentation exécutable : `NUMERIC(10,2)` dit « c'est de la monnaie », `NOT NULL` dit « toujours renseigné ». Bien typer, c'est faire vérifier par la base ce que le code oublierait.",
      },
    ],
  },
  {
    id: "contraintes-detail",
    title: "Contraintes d'intégrité en détail",
    level: 3,
    intro: "Le contrat que la base fait respecter, quoi que fasse le code.",
    blocks: [
      {
        kind: "fields",
        title: "Référence",
        fields: [
          { label: "`NOT NULL`", value: "La colonne doit toujours avoir une valeur. À mettre partout où l'absence n'a pas de sens." },
          { label: "`UNIQUE`", value: "Pas de doublons : emails, références, numéros de série." },
          { label: "`PRIMARY KEY`", value: "`UNIQUE` + `NOT NULL` + identité de la ligne. Une par table, de préférence stable et sans signification métier." },
          { label: "`FOREIGN KEY`", value: "La valeur doit exister dans la table référencée : le lien clients/commandes." },
          { label: "`CHECK`", value: "Une condition arbitraire : `CHECK (montant >= 0)`, `CHECK (statut IN ('a','b'))`." },
          { label: "`DEFAULT`", value: "Valeur automatique : dates de création, statuts initiaux, compteurs à zéro." },
          { label: "`ON DELETE`", value: "Que faire des lignes liées quand le parent disparaît : `CASCADE` (supprimer), `SET NULL` (orphelin), `RESTRICT` (refuser — le plus sûr par défaut)." },
        ],
      },
    ],
  },
  {
    id: "ddl-dml-dcl",
    title: "DDL, DML, DCL : les trois langages du SQL",
    level: 3,
    intro: "SQL n'est pas qu'un langage de requêtes : trois sous-langages cohabitent.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois familles d'ordres",
        fields: [
          { label: "DDL (définition)", value: "`CREATE`, `ALTER`, `DROP` : définit et fait évoluer la structure (tables, index, vues). Versionné via les migrations." },
          { label: "DML (manipulation)", value: "`SELECT`, `INSERT`, `UPDATE`, `DELETE` : lit et modifie les données. Le quotidien de l'application." },
          { label: "DCL (contrôle)", value: "`GRANT`, `REVOKE` : qui a le droit de faire quoi. L'application utilise un rôle limité, jamais le super-utilisateur." },
        ],
      },
    ],
  },
  {
    id: "select-avance",
    title: "SELECT avancé",
    level: 3,
    intro: "Filtrer, trier, paginer : la lecture précise.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Filtrage, tri et pagination",
        code: `SELECT id, nom, montant\nFROM commandes\nWHERE statut = 'payee'\n  AND montant >= 20\n  AND client_id IN (1, 2, 3)\nORDER BY montant DESC\nLIMIT 10 OFFSET 20;\n\n-- Compter sans tout charger\nSELECT COUNT(*) FROM commandes WHERE statut = 'payee';\n\n-- Valeurs distinctes\nSELECT DISTINCT statut FROM commandes;`,
      },
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          { label: "`WHERE`", value: "Conditions combinables (`AND`, `OR`, `NOT`, `IN`, `BETWEEN`, `LIKE`) : filtrer côté base, jamais côté application." },
          { label: "`ORDER BY`", value: "Tri explicite : sans lui, l'ordre des lignes n'est jamais garanti." },
          { label: "`LIMIT` / `OFFSET`", value: "Pagination simple : `LIMIT 10 OFFSET 20` = page 3. Sur de gros volumes, préférer la pagination par curseur (niveau : `WHERE id > ?`)." },
          { label: "`COUNT`, `DISTINCT`", value: "Agréger sans rapatrier les lignes : la base compte, l'application reçoit un nombre." },
        ],
      },
    ],
  },
  {
    id: "agregations",
    title: "Agrégations et GROUP BY",
    level: 3,
    intro: "Des millions de lignes vers quelques chiffres : le SQL analytique.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Chiffre d'affaires par statut",
        code: `SELECT statut,\n       COUNT(*) AS nb_commandes,\n       SUM(montant) AS total,\n       AVG(montant) AS panier_moyen,\n       MIN(montant) AS min_montant,\n       MAX(montant) AS max_montant\nFROM commandes\nGROUP BY statut\nHAVING COUNT(*) > 5\nORDER BY total DESC;`,
      },
      {
        kind: "text",
        text: "`GROUP BY` découpe les lignes en groupes, les fonctions d'agrégation (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) résument chaque groupe, et `HAVING` filtre sur le résultat des groupes — là où `WHERE` filtre les lignes avant regroupement. Confondre les deux est l'erreur classique.",
      },
    ],
  },
  {
    id: "sous-requetes",
    title: "Sous-requêtes",
    level: 3,
    intro: "Composer des requêtes : utiliser un résultat comme ingrédient d'un autre.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Clients ayant commandé plus que la moyenne",
        code: `SELECT c.nom\nFROM clients AS c\nWHERE c.id IN (\n  SELECT cmd.client_id\n  FROM commandes AS cmd\n  GROUP BY cmd.client_id\n  HAVING SUM(cmd.montant) > (\n    SELECT AVG(total_client)\n    FROM (\n      SELECT SUM(montant) AS total_client\n      FROM commandes\n      GROUP BY client_id\n    ) AS totaux\n  )\n);`,
      },
      {
        kind: "text",
        text: "Une sous-requête s'emploie dans `WHERE` (`IN`, `EXISTS`), dans `FROM` (table temporaire nommée) ou dans `SELECT` (colonne calculée). Lisible pour les cas simples ; au-delà de deux niveaux d'imbrication, une vue ou une CTE (`WITH … AS`) clarifie — la CTE nomme chaque étape intermédiaire.",
      },
    ],
  },
  {
    id: "vues",
    title: "Vues",
    level: 3,
    intro: "Nommer une requête complexe pour la réutiliser comme une table.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Créer et utiliser une vue",
        code: `CREATE VIEW commandes_detail AS\nSELECT c.nom AS client, cmd.montant, cmd.statut\nFROM commandes AS cmd\nJOIN clients AS c ON cmd.client_id = c.id;\n\n-- Ensuite : comme une table ordinaire.\nSELECT * FROM commandes_detail WHERE statut = 'payee';`,
      },
      {
        kind: "text",
        text: "La vue ne stocke rien : elle rejoue sa requête à chaque usage. Elle simplifie les accès récurrents et peut servir de couche de sécurité (exposer certaines colonnes seulement). Les vues matérialisées, elles, stockent le résultat et se rafraîchissent périodiquement — utiles pour les tableaux de bord lourds.",
      },
    ],
  },
  {
    id: "jointures-detail",
    title: "Les quatre jointures",
    level: 3,
    intro: "Chaque type de jointure répond à une question différente.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "INNER, LEFT, RIGHT, FULL",
        code: `-- INNER : uniquement les correspondances des deux côtés.\nSELECT c.nom, cmd.montant\nFROM clients AS c\nINNER JOIN commandes AS cmd ON cmd.client_id = c.id;\n\n-- LEFT : tous les clients, même sans commande (montant NULL).\nSELECT c.nom, cmd.montant\nFROM clients AS c\nLEFT JOIN commandes AS cmd ON cmd.client_id = c.id;\n\n-- Clients SANS commande : LEFT + filtre sur NULL.\nSELECT c.nom\nFROM clients AS c\nLEFT JOIN commandes AS cmd ON cmd.client_id = c.id\nWHERE cmd.id IS NULL;`,
      },
      {
        kind: "diagram",
        title: "Choisir sa jointure",
        lines: [
          "Question : « les commandes et leurs clients »",
          "  → INNER JOIN (les orphelins n'intéressent personne)",
          "",
          "Question : « tous les clients, avec leurs commandes si elles existent »",
          "  → LEFT JOIN (NULL là où il n'y a rien)",
          "",
          "Question : « les clients qui n'ont jamais commandé »",
          "  → LEFT JOIN + WHERE commande.id IS NULL",
          "",
          "Question : « tout, des deux côtés, apparié quand possible »",
          "  → FULL OUTER JOIN (rare, souvent signe d'un modèle à revoir)",
        ],
      },
    ],
  },
  {
    id: "normalisation-detail",
    title: "Normalisation : l'exemple qui fait comprendre",
    level: 3,
    intro: "Voir concrètement ce qu'une mauvaise modélisation coûte.",
    blocks: [
      {
        kind: "diagram",
        title: "Avant : tout dans une table",
        lines: [
          "commandes_denorm",
          "┌────┬────────┬──────────────┬──────────┬────────────┐",
          "│ id │ client │ ville_client │ produit  │ prix       │",
          "├────┼────────┼──────────────┼──────────┼────────────┤",
          "│ 1  │  Ada   │  Antananarivo│  Clavier │   49.90    │",
          "│ 2  │  Ada   │  Antananarivo│  Souris  │   19.90    │",
          "│ 3  │  Grace │  Toamasina   │  Clavier │   49.90    │",
          "└────┴────────┴──────────────┴──────────┴────────────┘",
          "Problèmes :",
          " • « Ada » et sa ville répétés → mise à jour en 2 endroits",
          " • prix du clavier répété → incohérence possible",
          " • impossible d'ajouter un produit sans commande",
        ],
      },
      {
        kind: "diagram",
        title: "Après : chaque fait à sa place (3NF)",
        lines: [
          "clients (id, nom, ville)      produits (id, nom, prix)",
          "commandes (id, client_id → clients, date)",
          "lignes_commande (commande_id → commandes, produit_id → produits, qte)",
          "",
          " • Un nom modifié une fois, partout à jour",
          " • Un prix modifié une fois, partout à jour",
          " • Produit ajoutable sans commande, client sans commande",
          " • Prix : jointures à l'écriture des requêtes (le coût assumé)",
        ],
      },
    ],
  },
  {
    id: "denormalisation",
    title: "Dénormalisation : quand tricher (consciemment)",
    level: 3,
    intro: "La normalisation a un coût en lecture : savoir quand l'assumer.",
    blocks: [
      {
        kind: "text",
        text: "Chaque jointure a un coût. Sur des lectures massives (tableau de bord, fil d'actualité), on duplique parfois volontairement une donnée (le nom du client dans la commande, un compteur de likes) pour éviter la jointure. C'est de la dénormalisation : une optimisation, pas une paresse de modélisation.",
      },
      {
        kind: "list",
        items: [
          "D'abord normaliser, mesurer, puis dénormaliser ce qui est prouvé lent.",
          "Documenter chaque duplication : quelle est la source de vérité, comment la copie est synchronisée.",
          "Préférer les mécanismes automatiques (vues matérialisées, triggers) aux synchronisations manuelles dans le code.",
          "Jamais de dénormalisation sur des données critiques (montants, droits) sans garde-fous transactionnels.",
        ],
      },
    ],
  },
  {
    id: "cles-strategies",
    title: "Clés primaires : naturelles ou substituts",
    level: 3,
    intro: "Le choix d'identifiant le plus structurant d'un schéma.",
    blocks: [
      {
        kind: "fields",
        title: "Comparatif",
        fields: [
          { label: "Clé naturelle", value: "Un identifiant métier existant (SIRET, ISBN, email). Avantage : parlant. Risques : il peut changer (l'email change), il peut ne pas être unique en pratique, il fuit de l'information." },
          { label: "Clé de substitution", value: "Un entier auto-incrémenté ou un UUID généré, sans signification. Avantage : stable, compact (entier), opaque. C'est le choix par défaut." },
          { label: "UUID", value: "Identifiant universel unique, générable sans coordination (utile en distribué). Coût : 128 bits, moins lisible, index un peu moins efficaces que les entiers séquentiels." },
        ],
      },
      {
        kind: "text",
        text: "La règle : une clé primaire ne change jamais et ne signifie rien. Dès qu'un identifiant a un sens métier, il finira par changer — et changer une clé primaire, c'est réécrire toutes les références.",
      },
    ],
  },
  {
    id: "niveaux-isolation",
    title: "Niveaux d'isolation des transactions",
    level: 3,
    intro: "Le curseur entre performance et garanties face aux accès concurrents.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux (SQL standard)",
        fields: [
          { label: "`READ COMMITTED`", value: "Le défaut de la plupart des systèmes : une transaction ne voit que les données validées. Anomalie possible : non-repeatable read (relire la même ligne et obtenir une valeur différente)." },
          { label: "`REPEATABLE READ`", value: "Les lectures sont stables pendant la transaction. Anomalie possible : lectures fantômes (de nouvelles lignes apparaissent entre deux requêtes)." },
          { label: "`SERIALIZABLE`", value: "Le plus strict : tout se passe comme si les transactions s'exécutaient l'une après l'autre. Aucune anomalie, mais plus de conflits et d'attente." },
        ],
      },
      {
        kind: "text",
        text: "En pratique : rester au niveau par défaut sauf besoin prouvé, et gérer les conflits (relire, réessayer) plutôt que de verrouiller le monde. Les anomalies d'isolation ne sont un problème que pour les écritures concurrentes critiques — la plupart des lectures s'en moquent.",
      },
    ],
  },
  {
    id: "verrous",
    title: "Verrous et interblocages",
    level: 3,
    intro: "Ce qui se passe quand deux transactions veulent la même ligne.",
    blocks: [
      {
        kind: "text",
        text: "Pour garantir l'isolation, la base pose des verrous : une transaction qui modifie une ligne la verrouille jusqu'au `COMMIT`. Si deux transactions se verrouillent mutuellement (A attend B qui attend A), c'est un interblocage (deadlock) : la base en sacrifie une (erreur) pour débloquer l'autre.",
      },
      {
        kind: "list",
        items: [
          "Transactions courtes : moins de temps verrouillé, moins de conflits.",
          "Ordre constant : toujours verrouiller les tables/lignes dans le même ordre partout.",
          "Ne jamais faire d'appels lents (HTTP, saisie utilisateur) à l'intérieur d'une transaction.",
          "En cas de deadlock, l'application doit réessayer la transaction sacrifiée — c'est un cas nominal, pas un bug.",
        ],
      },
    ],
  },
  {
    id: "index-fonctionnement",
    title: "Comment fonctionne un index",
    level: 3,
    intro: "L'intuition physique : pourquoi c'est rapide, et quand ça ne sert à rien.",
    blocks: [
      {
        kind: "diagram",
        title: "Index en arbre (B-tree) vs scan complet",
        lines: [
          "Sans index : SCAN SÉQUENTIEL",
          "  lire ligne 1, ligne 2, ... ligne 1 000 000 → O(n)",
          "",
          "Avec index (arbre équilibré) :",
          "              [50]",
          "             /    \\",
          "         [25]      [75]",
          "         /  \\      /  \\",
          "     [10] [30] [60] [90]  → feuilles = pointeurs vers les lignes",
          "  chercher 30 : 3 sauts au lieu de 1 000 000 de lectures → O(log n)",
        ],
      },
      {
        kind: "text",
        text: "L'index ne sert que si la requête est sélective : chercher 3 lignes sur un million (excellent), lire 900 000 lignes sur un million (le scan complet est plus rapide, l'index est ignoré). D'où la règle : indexer les colonnes des `WHERE`/`JOIN` sélectifs, pas les booléens à deux valeurs.",
      },
    ],
  },
  {
    id: "index-avances",
    title: "Index composés et pièges",
    level: 3,
    intro: "Au-delà de l'index simple : l'ordre des colonnes compte.",
    blocks: [
      {
        kind: "fields",
        title: "À savoir",
        fields: [
          { label: "Index composé", value: "`CREATE INDEX … ON commandes (client_id, statut)` : sert les requêtes qui filtrent sur `client_id` seul, ou sur les deux — mais pas sur `statut` seul. La colonne la plus sélective et la plus filtrée d'abord." },
          { label: "Cardinalité", value: "Un index sur une colonne à 2 valeurs (booléen) est presque inutile : la base lira de toute façon une moitié de la table." },
          { label: "Coût d'écriture", value: "Chaque index ralentit `INSERT`/`UPDATE`/`DELETE` : 5 index bien choisis valent mieux que 20 index « au cas où »." },
          { label: "Index et tri", value: "Un index sur la colonne triée évite le tri : `ORDER BY date` est gratuit si `date` est indexée dans le bon sens." },
        ],
      },
    ],
  },
  {
    id: "requetes-lentes",
    title: "Diagnostiquer une requête lente",
    level: 3,
    intro: "La méthode, dans l'ordre : mesurer avant d'optimiser.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Reproduire et mesurer", detail: "Exécuter la requête isolément, chronométrer. Une requête « lente » sans mesure est une rumeur." },
          { title: "Lire le plan d'exécution", detail: "`EXPLAIN` (ou `EXPLAIN ANALYZE`) : la base explique comment elle s'y prend — scans, jointures, tri. Chercher le scan séquentiel sur une grande table." },
          { title: "Vérifier les index", detail: "Les colonnes des `WHERE` et `JOIN` sont-elles indexées ? L'index est-il utilisé ou ignoré (mauvaise sélectivité) ?" },
          { title: "Réécrire", detail: "Éviter `SELECT *`, les fonctions sur colonnes indexées (`WHERE YEAR(date) = …` tue l'index), les sous-requêtes corrélées." },
          { title: "Re-mesurer", detail: "Comparer avant/après sur des données réalistes : un gain sur 100 lignes ne prouve rien." },
        ],
      },
    ],
  },
  {
    id: "migrations",
    title: "Migrations : versionner le schéma",
    level: 3,
    intro: "Le schéma évolue comme le code : en versions numérotées et réversibles.",
    blocks: [
      {
        kind: "text",
        text: "Une migration est un script versionné qui fait passer le schéma de la version N à N+1 (`ALTER TABLE … ADD COLUMN …`), avec son inverse pour revenir en arrière. Elles s'appliquent dans l'ordre, une seule fois, sur chaque environnement — jamais de modification manuelle « vite fait » en production.",
      },
      {
        kind: "list",
        items: [
          "Chaque changement de schéma = une migration relue comme du code.",
          "Migrations idempotentes et testées sur une copie de la production.",
          "Jamais de `DROP COLUMN` brutal : d'abord ignorer la colonne dans le code, la supprimer plus tard.",
          "Sauvegarder avant toute migration en production — toujours.",
        ],
      },
    ],
  },
  {
    id: "pools-connexions",
    title: "Pools de connexions",
    level: 3,
    intro: "Pourquoi l'application ne doit pas ouvrir une connexion par requête.",
    blocks: [
      {
        kind: "text",
        text: "Ouvrir une connexion coûte cher (authentification, négociation TLS, allocation mémoire). Un pool maintient N connexions ouvertes et les prête aux requêtes : l'application demande, utilise, rend. Sans pool, des centaines de requêtes simultanées épuisent le serveur ; avec un pool trop grand, c'est la base qui s'épuise. Le dimensionnement (quelques dizaines) se règle en observant.",
      },
    ],
  },
  {
    id: "injection-sql",
    title: "Injection SQL : l'attaque et la parade",
    level: 3,
    intro: "La faille la plus connue du web, et la plus facile à éviter.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Concaténer, c'est vulnérable",
        code: `-- DANGEREUX : l'entrée utilisateur est collée dans la requête.\n-- Entrée : ' OR '1'='1\nSELECT * FROM clients WHERE email = '' OR '1'='1';\n-- → toutes les lignes sont retournées : l'attaquant est « connecté ».`,
      },
      {
        kind: "code",
        language: "javascript",
        title: "Requêtes paramétrées : la parade",
        code: `// La valeur ne fait plus partie du SQL : elle est envoyée séparément.\nconst email = req.body.email; // entrée utilisateur, non fiable\nconst result = await db.query(\n  "SELECT * FROM clients WHERE email = $1",\n  [email]\n);`,
      },
      {
        kind: "text",
        text: "La règle est absolue : jamais de concaténation d'entrée utilisateur dans du SQL. Les requêtes paramétrées (placeholders `?`, `$1` selon le driver) séparent le code des données — la base ne peut plus confondre les deux. Les ORM qui paramètrent par défaut protègent ; leurs échappatoires SQL brutes, non.",
      },
    ],
  },
  {
    id: "orm-vs-sql",
    title: "ORM ou SQL brut",
    level: 3,
    intro: "Deux façons d'accéder à la base, avec des compromis honnêtes.",
    blocks: [
      {
        kind: "table",
        headers: ["", "ORM", "SQL brut / query builder"],
        rows: [
          ["Productivité", "Élevée : modèles, migrations, CRUD automatiques", "Plus verbeux, tout est explicite"],
          ["Sécurité", "Paramétrage par défaut", "À la charge du développeur (paramétrer !)"],
          ["Requêtes complexes", "Souvent awkward (N+1, jointures tordues)", "Naturel : le SQL est fait pour ça"],
          ["Performance fine", "Difficile à contrôler", "Contrôle total"],
          ["Apprentissage", "Cache le SQL — dangereux sans bases", "Exige de connaître SQL"],
        ],
      },
      {
        kind: "text",
        text: "Le piège classique de l'ORM est le N+1 : charger 100 commandes puis, pour chacune, son client en une requête — 101 requêtes au lieu d'une jointure. Quel que soit l'outil, il faut savoir lire le SQL généré et comprendre les requêtes qu'on écrit.",
      },
    ],
  },
  {
    id: "replication",
    title: "Réplication",
    level: 3,
    intro: "Copier la base : pour la disponibilité et la lecture.",
    blocks: [
      {
        kind: "text",
        text: "La réplication maintient des copies (réplicas) d'une base primaire : en cas de panne, un réplica prend le relais (disponibilité) ; les lectures lourdes (reporting) sont dirigées vers les réplicas (répartition de charge). Le prix : un décalage (lag) entre l'écriture et sa propagation — une lecture immédiate après écriture peut ne pas voir la donnée sur un réplica.",
      },
      {
        kind: "list",
        items: [
          "Primaire/réplicas : les écritures vont au primaire, les lectures peuvent aller aux réplicas.",
          "Lag de réplication : à mesurer et à surveiller — il grandit sous charge.",
          "Bascule (failover) : promener le rôle de primaire doit être testé, pas découvert en panique.",
          "La réplication n'est pas une sauvegarde : une suppression accidentelle est répliquée aussi.",
        ],
      },
    ],
  },
  {
    id: "theoreme-cap",
    title: "Le théorème CAP",
    level: 3,
    intro: "L'arbitrage fondamental des systèmes distribués.",
    blocks: [
      {
        kind: "text",
        text: "En cas de partition réseau (P), un système distribué doit choisir entre la cohérence (C : tout le monde voit la même donnée) et la disponibilité (A : le système répond toujours). On ne peut pas avoir les trois parfaitement. En pratique : les bases relationnelles choisissent C, beaucoup de systèmes NoSQL choisissent A — et chaque choix se ressent dans le comportement de l'application.",
      },
    ],
  },
  {
    id: "sauvegardes-detail",
    title: "Stratégie de sauvegarde complète",
    level: 3,
    intro: "Au-delà du dump : penser en objectifs de reprise.",
    blocks: [
      {
        kind: "fields",
        title: "Les concepts",
        fields: [
          { label: "RPO", value: "Recovery Point Objective : combien de données on accepte de perdre (1 heure ? 1 jour ?). Détermine la fréquence des sauvegardes." },
          { label: "RTO", value: "Recovery Time Objective : en combien de temps on doit être de nouveau en ligne. Détermine la méthode (restauration dump vs bascule sur réplica)." },
          { label: "Dump + journal", value: "Sauvegarde complète périodique + journal des transactions en continu : on restaure le dump puis on rejoue jusqu'à l'instant voulu (PITR)." },
          { label: "Règle 3-2-1", value: "3 copies, 2 supports différents, 1 hors site. Simple, éprouvée." },
          { label: "Chiffrement", value: "Les sauvegardes contiennent les mêmes données sensibles que la base : chiffrées au repos, accès restreint." },
        ],
      },
    ],
  },
  {
    id: "monitoring-bdd",
    title: "Superviser une base de données",
    level: 3,
    intro: "Ce qu'on surveille quand la base est en production.",
    blocks: [
      {
        kind: "fields",
        title: "Les indicateurs",
        fields: [
          { label: "Requêtes lentes", value: "Journal des requêtes dépassant un seuil : la liste des optimisations à faire, mise à jour en continu." },
          { label: "Connexions", value: "Nombre de connexions vs maximum : une fuite de connexions fait tomber le serveur." },
          { label: "Espace disque", value: "Une base pleine s'arrête brutalement : alertes bien avant saturation, avec marge pour les journaux." },
          { label: "Lag de réplication", value: "Le retard des réplicas : s'il grandit, les lectures deviennent incohérentes." },
          { label: "Cache hit ratio", value: "La part des lectures servies depuis la mémoire : une chute signale un problème de dimensionnement ou de requêtes." },
        ],
      },
    ],
  },
  {
    id: "debugging-bdd",
    title: "Déboguer côté base",
    level: 3,
    intro: "Quand l'application accuse la base (ou l'inverse).",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Isoler", detail: "Exécuter la requête fautive directement dans le client SQL : si elle échoue là aussi, le problème est la requête ou les données, pas l'application." },
          { title: "Lire l'erreur exacte", detail: "Violation de contrainte ? Laquelle, sur quelle table ? Erreur de connexion ? Réseau, identifiants, pool épuisé ?" },
          { title: "Vérifier les données", detail: "`SELECT` ciblé sur les lignes concernées : NULL inattendu, doublon, encodage, fuseau horaire." },
          { title: "Vérifier la concurrence", detail: "Deadlocks, verrous longs : qui bloque qui ? Les transactions sont-elles courtes ?" },
          { title: "Regarder les logs", detail: "Journal du serveur : erreurs, requêtes lentes, redémarrages — l'historique des symptômes." },
        ],
      },
    ],
  },
  {
    id: "testing-bdd",
    title: "Tester avec une base de données",
    level: 3,
    intro: "Des tests fiables malgré l'état partagé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Base dédiée aux tests : jamais la base de développement, encore moins la production.",
          "Isolation par transaction : chaque test s'exécute dans une transaction annulée (rollback) à la fin — la base revient à son état initial.",
          "Jeux de données (seeds) : un état initial connu et minimal, versionné avec les tests.",
          "Tester les contraintes : insérer un doublon doit échouer, supprimer un parent protégé doit échouer.",
          "Tester les migrations : appliquer toute la chaîne sur une base vide doit produire le schéma attendu.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les fautes qui reviennent dans presque tous les projets.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "SELECT * partout",
            value:
              "Problem : colonnes inutiles transférées, code cassé par l'ajout d'une colonne. Better : nommer explicitement les colonnes nécessaires.",
          },
          {
            label: "Pas de WHERE sur UPDATE/DELETE",
            value:
              "Problem : toute la table modifiée ou vidée. Better : toujours écrire le WHERE d'abord, vérifier avec un SELECT, utiliser des transactions.",
          },
          {
            label: "N+1",
            value:
              "Problem : 101 requêtes au lieu d'une jointure. Better : joindre ou charger en masse, profiler les requêtes générées par l'ORM.",
          },
          {
            label: "Mot de passe applicatif = super-utilisateur",
            value:
              "Problem : une injection donne tous les droits. Better : rôle applicatif limité (DML sur ses tables, rien d'autre).",
          },
          {
            label: "Aucun index",
            value:
              "Problem : tout est lent dès que la table grandit. Better : indexer les colonnes des WHERE/JOIN sélectifs, mesurer.",
          },
          {
            label: "Trop d'index",
            value:
              "Problem : écritures ralenties, espace gaspillé. Better : supprimer les index inutilisés (les statistiques d'usage le disent).",
          },
          {
            label: "Dates sans fuseau horaire",
            value:
              "Problem : « 14h » à Antananarivo vs Paris, changements d'heure. Better : stocker en UTC (timestamptz), convertir à l'affichage.",
          },
          {
            label: "Flottant pour la monnaie",
            value:
              "Problem : 0.1 + 0.2 ≠ 0.3 en binaire. Better : NUMERIC/DECIMAL exact.",
          },
          {
            label: "Pas de sauvegarde testée",
            value:
              "Problem : le jour de la panne, la sauvegarde est vide ou illisible. Better : restaurations d'essai régulières.",
          },
          {
            label: "Schéma modifié à la main en prod",
            value:
              "Problem : environnements divergents, impossible de reproduire. Better : migrations versionnées, appliquées partout pareil.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Les réflexes d'une base bien tenue.",
    blocks: [
      {
        kind: "list",
        items: [
          "Modéliser avant de coder : le schéma se dessine et se discute.",
          "Contraintes dans la base, pas seulement dans le code : la base est le dernier rempart.",
          "Nommer explicitement : tables au pluriel ou singulier — choisir et s'y tenir ; colonnes explicites.",
          "Paramétrer toutes les requêtes : aucune concaténation d'entrée utilisateur.",
          "Rôle applicatif limité : jamais le super-utilisateur pour l'application.",
          "Transactions courtes : pas d'appels réseau ni d'attente utilisateur dedans.",
          "Sauvegarder, externaliser, tester la restauration.",
          "Surveiller : requêtes lentes, connexions, disque, réplication.",
          "Documenter le schéma : à quoi sert chaque table, chaque colonne non évidente.",
          "Évoluer par migrations versionnées et relues.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "PostgreSQL", value: "https://www.postgresql.org/docs/ — la documentation de référence : tutoriel, langage SQL, administration." },
          { label: "SQL standard", value: "Les concepts (jointures, transactions, isolation) sont standard : ce qui est appris sur PostgreSQL se transpose." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : le client `psql` et ses méta-commandes (`\\dt`, `\\d table`, `\\x`) pour explorer.",
          "Pages liées de cette plateforme : SQL, PostgreSQL / MySQL si détaillées dans votre parcours, Data Engineering.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les bases de données maîtrisées, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir le langage : `sql` — requêtes avancées, fenêtrage, optimisation.",
          "Aller plus loin en PostgreSQL : `postgresql` — administration, réplication, tuning.",
          "Comparer avec MySQL : `mysql` — différences d'écosystème et de dialecte.",
          "Brancher une application : `nodejs` — drivers, pools, migrations dans le code.",
          "Passer à l'échelle données : `data-engineering` — pipelines, entrepôts, streaming.",
        ],
      },
    ],
  },
];

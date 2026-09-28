import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de PostgreSQL : de zéro à une administration
 * professionnelle de bases relationnelles. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive. Tous les
 * textes supportent le code inline entre backticks. Commandes toujours
 * expliquées : label, commande, pourquoi, vérification.
 */
export const LEARNING_POSTGRESQL: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est PostgreSQL, ce qui le distingue et pourquoi c'est le choix par défaut de tant d'applications.",
    blocks: [
      {
        kind: "text",
        text: "PostgreSQL (souvent abrégé « Postgres ») est un système de gestion de base de données relationnelle open source. Il stocke les données dans des tables liées entre elles, garantit leur intégrité via les transactions ACID, et s'interroge en SQL. C'est l'un des SGBD les plus anciens encore activement développés — et l'un des plus avancés.",
      },
      {
        kind: "text",
        text: "Pourquoi PostgreSQL plutôt qu'un autre : il combine la fiabilité d'un relationnel strict (contraintes, clés étrangères, transactions) avec des fonctionnalités modernes — types JSON natifs (`jsonb`), recherche plein texte intégrée, index avancés, réplication, extensibilité. On peut commencer avec du SQL classique et grandir vers des usages très exigeants sans changer de base.",
      },
      {
        kind: "text",
        text: "En pratique : la plupart des applications web (boutiques, SaaS, APIs) utilisent PostgreSQL comme base principale. Cette page couvre le SQL appliqué à Postgres, ses spécificités, et son exploitation en production.",
      },
    ],
  },
  {
    id: "relationnel-vs-nosql",
    title: "Relationnel vs NoSQL : où se situe PostgreSQL",
    level: 1,
    intro:
      "PostgreSQL n'est pas « contre » les bases NoSQL : il couvre une partie du spectre avec ses propres outils.",
    blocks: [
      {
        kind: "diagram",
        title: "Le spectre des bases de données",
        lines: [
          "Relationnel strict          Hybride              Document / clé-valeur",
          "      │                        │                          │",
          "  PostgreSQL ── jsonb ──► couvre aussi ──► MongoDB, Redis",
          "  (tables, SQL, ACID)    le semi-structuré",
          "",
          "Règle : données structurées et relations → relationnel.",
          "Données semi-structurées dans une app relationnelle → jsonb.",
        ],
      },
      {
        kind: "text",
        text: "Le type `jsonb` permet de stocker des documents JSON avec indexation et requêtes efficaces, dans une base qui reste transactionnelle. Beaucoup de projets qui auraient choisi MongoDB « pour le JSON » peuvent rester sur PostgreSQL et garder les garanties du relationnel (contraintes, jointures, transactions) pour le reste.",
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
      "Ce qu'il faut connaître avant d'apprendre PostgreSQL efficacement.",
    blocks: [
      {
        kind: "fields",
        title: "Connaissances requises",
        fields: [
          {
            label: "Bases du SQL",
            value:
              "SELECT, INSERT, UPDATE, DELETE, WHERE : la compétence `sql` de la roadmap couvre le langage lui-même. Ici, on se concentre sur Postgres.",
          },
          {
            label: "Terminal",
            value:
              "L'outil principal (`psql`) est en ligne de commande. Savoir naviguer dans un terminal Linux est nécessaire.",
          },
          {
            label: "Notions de modèle de données",
            value:
              "Tables, colonnes, clés : comprendre qu'une base relationnelle organise l'information en tables reliées.",
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
      "Installer PostgreSQL : paquet système ou conteneur Docker.",
    blocks: [
      {
        kind: "command",
        label: "Installer via le gestionnaire de paquets (Debian/Ubuntu)",
        command: "sudo apt install postgresql",
        why: "Installe le serveur et le client, crée l'utilisateur système `postgres` et démarre le service. La méthode standard sur serveur Linux : le service démarre automatiquement au boot.",
        verify: "psql --version",
      },
      {
        kind: "command",
        label: "Lancer via Docker (développement)",
        command: "docker run --name pg -e POSTGRES_PASSWORD=secret -d -p 5432:5432 postgres:16",
        why: "Démarre un PostgreSQL 16 isolé sans toucher au système : parfait pour développer ou tester. Le mot de passe du super-utilisateur est défini par variable d'environnement, le port 5432 est exposé en local.",
        verify: "docker ps",
      },
      {
        kind: "text",
        text: "Après l'installation système, `sudo -u postgres psql` ouvre une session en tant que super-utilisateur (l'authentification locale `peer` fait confiance à l'utilisateur système). Avec Docker, on se connecte avec `psql -h localhost -U postgres`.",
      },
    ],
  },
  {
    id: "premiere-base",
    title: "Votre première base en 10 minutes",
    level: 2,
    intro:
      "Créer une base, une table, y insérer des données et les relire.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer la base",
            detail: "`createdb boutique` crée une base vide nommée `boutique`.",
          },
          {
            title: "S'y connecter",
            detail: "`psql boutique` ouvre le client interactif sur cette base.",
          },
          {
            title: "Créer une table",
            detail: "`CREATE TABLE produits (...)` avec un identifiant, un nom, un prix et un stock.",
          },
          {
            title: "Insérer des lignes",
            detail: "`INSERT INTO produits ...` : ajouter deux ou trois produits.",
          },
          {
            title: "Relire",
            detail: "`SELECT * FROM produits;` : vérifier que les données sont là. Ne pas oublier le point-virgule : `psql` attend la fin de l'instruction.",
          },
        ],
      },
      {
        kind: "code",
        language: "sql",
        title: "Séquence complète",
        code: `CREATE TABLE produits (\n  id SERIAL PRIMARY KEY,\n  nom TEXT NOT NULL,\n  prix NUMERIC(10,2) NOT NULL,\n  stock INTEGER NOT NULL DEFAULT 0\n);\n\nINSERT INTO produits (nom, prix, stock) VALUES\n  ('Clavier', 49.90, 12),\n  ('Souris', 24.90, 30);\n\nSELECT * FROM produits;`,
      },
    ],
  },
  {
    id: "psql-essentiel",
    title: "`psql` : les commandes essentielles",
    level: 2,
    intro:
      "Le client interactif : les méta-commandes (préfixées par `\\`) à connaître par cœur.",
    blocks: [
      {
        kind: "command",
        label: "Se connecter à une base",
        command: "psql -U ada -d boutique -h localhost",
        why: "Ouvre une session interactive : `-U` l'utilisateur, `-d` la base, `-h` l'hôte. Sans `-h`, psql utilise le socket Unix local. Le mot de passe est demandé interactivement (ou via la variable `PGPASSWORD`).",
      },
      {
        kind: "fields",
        title: "Méta-commandes du quotidien",
        fields: [
          { label: "`\\l`", value: "Lister les bases de données du serveur." },
          { label: "`\\dt`", value: "Lister les tables du schéma courant." },
          { label: "`\\d produits`", value: "Décrire la table `produits` : colonnes, types, contraintes, index." },
          { label: "`\\x`", value: "Basculer l'affichage étendu (une colonne par ligne) : indispensable pour les tables larges." },
          { label: "`\\timing`", value: "Afficher le temps d'exécution de chaque requête : la base du tuning." },
          { label: "`\\q`", value: "Quitter psql." },
        ],
      },
      {
        kind: "text",
        text: "Astuce : `psql` conserve un historique (fichier `~/.psql_history`) et supporte l'édition multi-ligne. Pour exécuter un fichier SQL : `psql boutique -f script.sql`.",
      },
    ],
  },
  {
    id: "types-de-donnees",
    title: "Types de données",
    level: 2,
    intro:
      "Choisir le bon type : c'est le premier niveau d'intégrité des données.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Usage", "Exemple"],
        rows: [
          ["`SERIAL` / `BIGSERIAL`", "Identifiant auto-incrémenté", "`id SERIAL PRIMARY KEY`"],
          ["`TEXT` / `VARCHAR(n)`", "Chaînes de caractères", "`nom TEXT`, `code VARCHAR(10)`"],
          ["`INTEGER` / `BIGINT`", "Entiers", "`stock INTEGER`"],
          ["`NUMERIC(p,s)`", "Décimaux exacts (monnaie)", "`prix NUMERIC(10,2)`"],
          ["`BOOLEAN`", "Vrai/faux", "`actif BOOLEAN DEFAULT true`"],
          ["`TIMESTAMPTZ`", "Date+heure avec fuseau", "`cree_le TIMESTAMPTZ DEFAULT now()`"],
          ["`UUID`", "Identifiants universels", "`id UUID PRIMARY KEY DEFAULT gen_random_uuid()`"],
          ["`JSONB`", "Documents JSON indexables", "`meta JSONB`"],
        ],
      },
      {
        kind: "text",
        text: "Règles pratiques : `NUMERIC` pour la monnaie (jamais de flottant pour de l'argent — les approximations binaires créent des erreurs d'arrondi), `TIMESTAMPTZ` pour les dates (le fuseau évite les ambiguïtés), `TEXT` plutôt que `VARCHAR(n)` sauf contrainte métier réelle sur la longueur.",
      },
    ],
  },
  {
    id: "create-table-contraintes",
    title: "`CREATE TABLE` et les contraintes",
    level: 2,
    intro:
      "Définir un schéma qui refuse les données invalides par construction.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Table avec contraintes",
        code: `CREATE TABLE clients (\n  id SERIAL PRIMARY KEY,\n  email TEXT NOT NULL UNIQUE,\n  nom TEXT NOT NULL,\n  age INTEGER CHECK (age >= 0),\n  cree_le TIMESTAMPTZ NOT NULL DEFAULT now()\n);`,
      },
      {
        kind: "fields",
        title: "Les contraintes essentielles",
        fields: [
          {
            label: "`PRIMARY KEY`",
            value: "Identifiant unique de la ligne, jamais nul. Crée automatiquement un index : les recherches par id sont instantanées.",
          },
          {
            label: "`NOT NULL`",
            value: "La colonne doit toujours avoir une valeur. À mettre par défaut, sauf raison explicite d'autoriser l'absence.",
          },
          {
            label: "`UNIQUE`",
            value: "Pas de doublons (emails, codes). Crée aussi un index.",
          },
          {
            label: "`CHECK`",
            value: "Règle métier exprimée en SQL : `CHECK (prix > 0)`. La base refuse toute ligne qui la viole.",
          },
          {
            label: "`DEFAULT`",
            value: "Valeur automatique si non fournie : `DEFAULT now()`, `DEFAULT 0`.",
          },
        ],
      },
      {
        kind: "text",
        text: "Philosophie : plus la base refuse de mauvaises données, moins l'application a de cas tordus à gérer. Les contraintes sont de la logique métier exécutée au plus près des données, par tous les clients sans exception.",
      },
    ],
  },
  {
    id: "crud",
    title: "CRUD : les quatre opérations",
    level: 2,
    intro:
      "Créer, lire, modifier, supprimer : la grammaire de base du SQL.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Les quatre opérations",
        code: `-- Créer\nINSERT INTO produits (nom, prix, stock)\nVALUES ('Écran', 199.90, 5)\nRETURNING id;\n\n-- Lire\nSELECT nom, prix FROM produits WHERE stock > 0;\n\n-- Modifier\nUPDATE produits SET stock = stock - 1 WHERE id = 1;\n\n-- Supprimer\nDELETE FROM produits WHERE stock = 0;`,
      },
      {
        kind: "text",
        text: "`RETURNING` est une spécificité précieuse de PostgreSQL : l'instruction retourne les valeurs des lignes affectées (ici l'id généré), ce qui évite une requête supplémentaire. Et la règle d'or : un `UPDATE` ou `DELETE` sans `WHERE` affecte toute la table — toujours vérifier la clause avant d'exécuter.",
      },
    ],
  },
  {
    id: "filtrer-trier",
    title: "Filtrer, trier, paginer",
    level: 2,
    intro:
      "Les clauses qui transforment un `SELECT` en requête utile.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Requête complète typique",
        code: `SELECT nom, prix\nFROM produits\nWHERE prix BETWEEN 20 AND 100\n  AND stock > 0\nORDER BY prix DESC\nLIMIT 10 OFFSET 20;`,
      },
      {
        kind: "fields",
        title: "Chaque clause",
        fields: [
          {
            label: "`WHERE`",
            value: "Filtre les lignes : comparaisons, `BETWEEN`, `IN (...)`, `LIKE` pour le texte (`LIKE 'Clav%'`), `IS NULL` pour l'absence de valeur.",
          },
          {
            label: "`ORDER BY`",
            value: "Trie : `ASC` (défaut) ou `DESC`. Sans `ORDER BY`, l'ordre des lignes n'est jamais garanti — même s'il semble stable.",
          },
          {
            label: "`LIMIT` / `OFFSET`",
            value: "Pagination : `LIMIT 10 OFFSET 20` = page 3 de 10 éléments. Simple mais coûteux sur de grands offsets (voir les curseurs en section avancée).",
          },
        ],
      },
    ],
  },
  {
    id: "sauvegardes-simples",
    title: "Sauvegardes simples",
    level: 2,
    intro:
      "La première chose à mettre en place sur toute base qui compte : pouvoir la restaurer.",
    blocks: [
      {
        kind: "command",
        label: "Sauvegarder une base (format texte)",
        command: "pg_dump boutique > boutique.sql",
        why: "Exporte toute la base (schéma + données) en SQL lisible. Simple, versionnable pour les petites bases, restaurable avec `psql`. Le minimum vital avant toute opération risquée.",
        verify: "head -20 boutique.sql",
      },
      {
        kind: "command",
        label: "Sauvegarder en format compressé",
        command: "pg_dump -Fc boutique > boutique.dump",
        why: "Le format custom (`-Fc`) est compressé et permet la restauration sélective (une seule table) et parallèle. Le format recommandé dès que la base dépasse quelques mégaoctets.",
        verify: "ls -lh boutique.dump",
      },
      {
        kind: "text",
        text: "Règle professionnelle : une sauvegarde non testée n'est pas une sauvegarde. Restaurer régulièrement sur une base de test (`createdb test_restore && pg_restore -d test_restore boutique.dump`) pour vérifier que la procédure fonctionne quand on en aura besoin.",
      },
    ],
  },
  {
    id: "erreurs-debutants",
    title: "Erreurs classiques des débutants",
    level: 2,
    intro:
      "Les pièges les plus fréquents quand on découvre PostgreSQL.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["Oublier le `;`", "psql attend, affiche `->`", "Terminer l'instruction par `;`"],
          ["`UPDATE`/`DELETE` sans `WHERE`", "Toute la table modifiée", "Toujours écrire le `WHERE` d'abord, ou utiliser une transaction"],
          ["`relation does not exist`", "Table introuvable", "Vérifier le nom, la casse (minuscules non quotées) et le schéma"],
          ["`password authentication failed`", "Connexion refusée", "Vérifier utilisateur, mot de passe et `pg_hba.conf`"],
          ["Guillemets simples vs doubles", "`column \"nom\" does not exist`", "Simples pour les valeurs (`'Ada'`), doubles pour les identifiants (`\"MaTable\"`)"],
          ["`NULL` et `=`", "`WHERE x = NULL` ne retourne rien", "Utiliser `IS NULL` / `IS NOT NULL` : NULL n'est égal à rien, pas même à NULL"],
        ],
      },
    ],
  },
  {
    id: "editeurs-outils",
    title: "Éditeurs et outils",
    level: 2,
    intro:
      "`psql` suffit pour beaucoup de choses, mais l'écosystème offre des alternatives.",
    blocks: [
      {
        kind: "fields",
        title: "Outils du quotidien",
        fields: [
          {
            label: "`psql`",
            value: "Le client officiel en ligne de commande : toujours disponible, scriptable, complet. L'outil de référence pour l'administration.",
          },
          {
            label: "pgAdmin",
            value: "L'interface graphique officielle : exploration visuelle du schéma, éditeur de requêtes, monitoring. Pratique pour découvrir une base inconnue.",
          },
          {
            label: "DBeaver",
            value: "Client universel multi-bases (PostgreSQL, MySQL…) : une seule interface pour toutes les bases d'un projet.",
          },
          {
            label: "Extensions VS Code",
            value: "Des extensions permettent d'exécuter du SQL depuis l'éditeur contre une base locale — pratique pendant le développement.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "La boucle de travail typique d'un développeur avec PostgreSQL.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de développement",
        lines: [
          "Modifier le schéma (migration ou psql)",
          "     │",
          "     ▼",
          "Tester la requête (psql, \\timing pour mesurer)",
          "     │",
          "     ▼",
          "Vérifier avec EXPLAIN (la requête utilise-t-elle les index ?)",
          "     │",
          "     ▼",
          "Sauvegarder avant les opérations risquées (pg_dump)",
          "     │",
          "     ▼",
          "Versionner les migrations (jamais de ALTER manuel en prod)",
        ],
      },
      {
        kind: "list",
        items: [
          "On expérimente en local ou sur une base de développement, jamais en production.",
          "Chaque changement de schéma passe par une migration versionnée.",
          "On mesure (`\\timing`, `EXPLAIN`) avant d'optimiser.",
          "On sauvegarde avant toute opération destructive.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-interne",
    title: "Architecture : processus, mémoire, WAL",
    level: 3,
    intro:
      "Comment PostgreSQL traite réellement une requête : les trois piliers.",
    blocks: [
      {
        kind: "diagram",
        title: "Chemin d'une requête",
        lines: [
          "Client (psql, application)",
          "   │  connexion = 1 processus serveur dédié",
          "   ▼",
          "Postmaster → Backend process",
          "   │",
          "   ├── Shared buffers (cache en mémoire)",
          "   ├── WAL (journal : toute modification y est écrite d'abord)",
          "   ▼",
          "Fichiers de données sur disque",
        ],
      },
      {
        kind: "text",
        text: "Points clés : chaque connexion est un processus système dédié (d'où l'importance du pooling quand il y a beaucoup de clients) ; toute modification est d'abord écrite dans le WAL (Write-Ahead Log) avant d'être appliquée — c'est ce qui garantit la durabilité même en cas de crash ; les shared buffers mettent en cache les pages les plus utilisées.",
      },
      {
        kind: "text",
        text: "Conséquence : PostgreSQL ne perd pas de transactions validées, même si le serveur s'éteint brutalement. Au redémarrage, il rejoue le WAL pour retrouver un état cohérent. Cette robustesse est une des raisons de sa réputation.",
      },
    ],
  },
  {
    id: "schemas",
    title: "Schémas : organiser une base",
    level: 3,
    intro:
      "Au-delà de la table unique : structurer une base avec des schémas.",
    blocks: [
      {
        kind: "text",
        text: "Un schéma est un espace de noms dans une base : `ventes.commandes`, `rh.employes`. Le schéma par défaut s'appelle `public`. Les schémas permettent de séparer les domaines fonctionnels, de gérer les droits par domaine, et d'éviter les collisions de noms.",
      },
      {
        kind: "code",
        language: "sql",
        title: "Travailler avec les schémas",
        code: `CREATE SCHEMA ventes;\nCREATE TABLE ventes.commandes (id SERIAL PRIMARY KEY);\n\n-- Définir les schémas cherchés par défaut\nSET search_path TO ventes, public;\nSELECT * FROM commandes; -- résout ventes.commandes`,
      },
      {
        kind: "text",
        text: "Le `search_path` détermine où PostgreSQL cherche les tables non qualifiées. En pratique : qualifier explicitement dans le code applicatif (`ventes.commandes`) évite les ambiguïtés, et réserver `public` aux objets vraiment transverses.",
      },
    ],
  },
  {
    id: "cles-primaires-etrangeres",
    title: "Clés primaires et étrangères",
    level: 3,
    intro:
      "Les relations entre tables : le cœur du modèle relationnel.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Relier commandes et clients",
        code: `CREATE TABLE clients (\n  id SERIAL PRIMARY KEY,\n  email TEXT NOT NULL UNIQUE\n);\n\nCREATE TABLE commandes (\n  id SERIAL PRIMARY KEY,\n  client_id INTEGER NOT NULL REFERENCES clients(id),\n  total NUMERIC(10,2) NOT NULL\n);`,
      },
      {
        kind: "fields",
        title: "Comportements en cascade",
        fields: [
          {
            label: "`ON DELETE CASCADE`",
            value: "Supprimer le client supprime ses commandes. Pratique mais dangereux : à réserver aux relations de composition forte.",
          },
          {
            label: "`ON DELETE RESTRICT` (défaut)",
            value: "Refuse la suppression du client tant qu'il a des commandes. Le comportement le plus sûr par défaut.",
          },
          {
            label: "`ON DELETE SET NULL`",
            value: "La commande survit avec `client_id` à NULL. Nécessite que la colonne accepte NULL.",
          },
        ],
      },
      {
        kind: "text",
        text: "Les clés étrangères créent automatiquement un index sur la table référençante ? Non — piège classique : PostgreSQL n'indexe pas automatiquement les colonnes de clé étrangère. Sans index sur `commandes.client_id`, les suppressions dans `clients` et les jointures sont lentes. Toujours créer l'index explicitement.",
      },
    ],
  },
  {
    id: "index-btree",
    title: "Index B-tree : le fondamental",
    level: 3,
    intro:
      "L'index par défaut : comprendre quand il sert et quand il ne sert à rien.",
    blocks: [
      {
        kind: "text",
        text: "Un index B-tree est une structure triée qui permet de trouver des lignes sans scanner toute la table : recherche par égalité, plages (`BETWEEN`, `<`, `>`), tri (`ORDER BY`). C'est le type d'index créé par défaut (`CREATE INDEX`) et celui des clés primaires et contraintes `UNIQUE`.",
      },
      {
        kind: "code",
        language: "sql",
        title: "Créer et vérifier un index",
        code: `-- Index sur une colonne de filtre fréquente\nCREATE INDEX idx_produits_prix ON produits(prix);\n\n-- Index composite : l'ordre des colonnes compte\nCREATE INDEX idx_commandes_client_date\n  ON commandes(client_id, cree_le);`,
      },
      {
        kind: "list",
        items: [
          "Un index accélère les lectures mais ralentit les écritures (chaque INSERT/UPDATE le met à jour) : on n'indexe pas « au cas où ».",
          "Index composite : la colonne la plus sélective et la plus filtrée d'abord ; l'index sert aussi pour les requêtes qui n'utilisent que le préfixe.",
          "Un index sur une colonne peu sélective (booléen avec 99 % de `true`) est souvent inutile.",
          "`EXPLAIN` montre si l'index est utilisé : on ne suppose jamais, on vérifie.",
        ],
      },
    ],
  },
  {
    id: "index-avances",
    title: "Index avancés : partiels, GIN, expression",
    level: 3,
    intro:
      "Quand le B-tree simple ne suffit pas.",
    blocks: [
      {
        kind: "fields",
        title: "Les index spécialisés",
        fields: [
          {
            label: "Index partiel",
            value: "`CREATE INDEX ... ON commandes(client_id) WHERE statut = 'en_cours'` : n'indexe que les lignes actives. Plus petit, plus rapide, moins coûteux à maintenir.",
          },
          {
            label: "Index GIN",
            value: "Pour le `jsonb`, les tableaux et la recherche plein texte : `CREATE INDEX ... ON docs USING GIN (contenu)`. Indexe chaque clé/élément du document.",
          },
          {
            label: "Index d'expression",
            value: "`CREATE INDEX ... ON clients (lower(email))` : indexe le résultat d'une expression. La requête doit utiliser exactement la même expression pour en bénéficier.",
          },
          {
            label: "Index couvrant (`INCLUDE`)",
            value: "`... ON produits(prix) INCLUDE (nom)` : la requête peut être satisfaite par l'index seul, sans accéder à la table (index-only scan).",
          },
        ],
      },
    ],
  },
  {
    id: "jsonb",
    title: "`jsonb` : le document dans le relationnel",
    level: 3,
    intro:
      "Stocker et interroger du JSON avec indexation, sans quitter PostgreSQL.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "JSONB en pratique",
        code: `CREATE TABLE evenements (\n  id SERIAL PRIMARY KEY,\n  donnees JSONB NOT NULL\n);\n\nINSERT INTO evenements (donnees)\nVALUES ('{"type": "clic", "page": "/accueil", "duree": 12}');\n\n-- Extraire un champ (opérateur ->>)\nSELECT donnees->>'page' AS page\nFROM evenements\nWHERE donnees->>'type' = 'clic';\n\n-- Index GIN pour des requêtes rapides sur le contenu\nCREATE INDEX idx_evenements_donnees ON evenements USING GIN (donnees);`,
      },
      {
        kind: "text",
        text: "Opérateurs clés : `->` retourne du JSONB, `->>` retourne du texte ; `@>` teste la containment (`WHERE donnees @> '{\"type\": \"clic\"}'`). Le `jsonb` est binaire et dédupliqué : préféré au type `json` (texte brut) dans presque tous les cas.",
      },
      {
        kind: "text",
        text: "Quand l'utiliser : attributs variables, métadonnées, logs structurés. Quand l'éviter : données relationnelles déguisées — si on filtre et joint régulièrement sur un champ JSON, c'est probablement une vraie colonne qui manque.",
      },
    ],
  },
  {
    id: "full-text-search",
    title: "Recherche plein texte intégrée",
    level: 3,
    intro:
      "Un moteur de recherche textuelle sans service externe, pour beaucoup de cas d'usage.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Recherche plein texte",
        code: `-- Colonne de recherche pré-calculée\nALTER TABLE articles ADD COLUMN recherche TSVECTOR;\nUPDATE articles\nSET recherche = to_tsvector('french', titre || ' ' || contenu);\n\n-- Index GIN dédié\nCREATE INDEX idx_articles_recherche ON articles USING GIN (recherche);\n\n-- Requête : mots, classement par pertinence\nSELECT titre, ts_rank(recherche, requete) AS score\nFROM articles, to_tsquery('french', 'postgres & index') AS requete\nWHERE recherche @@ requete\nORDER BY score DESC;`,
      },
      {
        kind: "text",
        text: "`to_tsvector` transforme le texte en lexèmes (racinisation, suppression des mots vides, selon la langue) ; `to_tsquery` parse la requête (`&` = ET, `|` = OU, `!` = NON, `:*` = préfixe). Le `ts_rank` classe par pertinence. Pour des catalogues de taille moyenne, c'est largement suffisant — un moteur dédié ne se justifie qu'à très grande échelle ou pour des besoins avancés (facettes, typo tolerance).",
      },
    ],
  },
  {
    id: "transactions-acid",
    title: "Transactions et ACID",
    level: 3,
    intro:
      "Le contrat de fiabilité : tout ou rien.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Transaction explicite",
        code: `BEGIN;\n\nUPDATE comptes SET solde = solde - 100 WHERE id = 1;\nUPDATE comptes SET solde = solde + 100 WHERE id = 2;\n\n-- Vérifier avant de valider\nSELECT * FROM comptes WHERE id IN (1, 2);\n\nCOMMIT; -- ou ROLLBACK; pour tout annuler`,
      },
      {
        kind: "fields",
        title: "ACID, concrètement",
        fields: [
          {
            label: "Atomicité",
            value: "Tout ou rien : si la seconde UPDATE échoue, la première est annulée. Pas d'état intermédiaire visible.",
          },
          {
            label: "Cohérence",
            value: "Les contraintes sont vérifiées à la validation : une transaction qui les violerait est rejetée.",
          },
          {
            label: "Isolation",
            value: "Les transactions concurrentes ne se voient pas mutuellement avant validation (selon le niveau d'isolation).",
          },
          {
            label: "Durabilité",
            value: "Une fois `COMMIT` retourné, les données survivent au crash (grâce au WAL).",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique applicative : toute opération multi-étapes qui doit rester cohérente (virement, création de commande + décrément de stock) s'exécute dans une transaction explicite. Sans `BEGIN`, chaque instruction est sa propre transaction (autocommit).",
      },
    ],
  },
  {
    id: "niveaux-isolation",
    title: "Niveaux d'isolation",
    level: 3,
    intro:
      "Que voit une transaction des modifications concurrentes ?",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Garantie", "Usage"],
        rows: [
          ["`READ COMMITTED` (défaut)", "Ne voit que les données validées ; chaque requête voit les derniers commits", "La plupart des applications"],
          ["`REPEATABLE READ`", "Vision figée au début de la transaction : lectures répétables", "Rapports cohérents, calculs multi-requêtes"],
          ["`SERIALIZABLE`", "Comme si les transactions s'exécutaient l'une après l'autre", "Cas critiques (comptabilité), au prix de possibles erreurs de sérialisation à réessayer"],
        ],
      },
      {
        kind: "code",
        language: "sql",
        title: "Choisir le niveau",
        code: `-- Pour une transaction\nBEGIN ISOLATION LEVEL REPEATABLE READ;\n-- ... requêtes ...\nCOMMIT;\n\n-- Défaut par session\nSET default_transaction_isolation = 'repeatable read';`,
      },
      {
        kind: "text",
        text: "Le défaut (`READ COMMITTED`) convient à l'écrasante majorité des cas. On ne monte en niveau que face à un problème d'isolation avéré — et `SERIALIZABLE` impose de gérer les erreurs de sérialisation en réessayant la transaction dans le code applicatif.",
      },
    ],
  },
  {
    id: "verrous-deadlocks",
    title: "Verrous et deadlocks",
    level: 3,
    intro:
      "Comment PostgreSQL gère les accès concurrents — et ce qui peut se bloquer.",
    blocks: [
      {
        kind: "text",
        text: "Toute écriture prend des verrous sur les lignes modifiées. Deux transactions qui modifient les mêmes lignes dans un ordre différent peuvent se bloquer mutuellement : c'est un deadlock. PostgreSQL le détecte automatiquement et annule l'une des deux avec une erreur explicite.",
      },
      {
        kind: "list",
        items: [
          "Prévention : toujours verrouiller/modifier les lignes dans le même ordre (ex. trier les ids avant une boucle d'updates).",
          "Transactions courtes : plus une transaction reste ouverte, plus elle retient de verrous.",
          "En cas d'erreur `deadlock detected`, la bonne réponse applicative est de réessayer la transaction.",
          "`SELECT ... FOR UPDATE` verrouille explicitement les lignes lues pour les modifier ensuite — à utiliser quand on lit avant d'écrire en concurrence.",
        ],
      },
    ],
  },
  {
    id: "explain-analyze",
    title: "`EXPLAIN ANALYZE` : lire un plan d'exécution",
    level: 3,
    intro:
      "L'outil central du tuning : voir ce que fait vraiment une requête.",
    blocks: [
      {
        kind: "command",
        label: "Analyser une requête",
        command: "psql",
        why: "Dans psql, préfixer la requête : `EXPLAIN ANALYZE SELECT ...`. `EXPLAIN` seul montre le plan prévu ; `ANALYZE` exécute réellement et montre les temps et nombres de lignes mesurés.",
      },
      {
        kind: "code",
        language: "sql",
        title: "Lecture d'un plan",
        code: `EXPLAIN ANALYZE\nSELECT * FROM produits WHERE prix > 100;\n\n-- Sortie typique (à lire de bas en haut) :\n-- Seq Scan on produits  (cost=0.00..35.50 rows=12 width=72)\n--   Filter: (prix > 100)\n--   Rows Removed by Filter: 988\n-- Execution Time: 0.045 ms`,
      },
      {
        kind: "fields",
        title: "Vocabulaire des plans",
        fields: [
          {
            label: "`Seq Scan`",
            value: "Balayage complet de la table. Normal sur une petite table ; suspect sur une grande table filtrée (index manquant ?).",
          },
          {
            label: "`Index Scan` / `Index Only Scan`",
            value: "Utilisation d'un index. `Index Only` = tout est lu dans l'index, sans toucher la table : l'idéal.",
          },
          {
            label: "`Nested Loop` / `Hash Join` / `Merge Join`",
            value: "Stratégies de jointure. Le planificateur choisit selon les tailles ; un `Nested Loop` sur de gros volumes est souvent le signe d'un index manquant.",
          },
          {
            label: "`cost` / `rows` / `actual`",
            value: "`cost` est une estimation en unités arbitraires ; `actual` (avec ANALYZE) est la réalité mesurée. Un gros écart estimation/réalité signale des statistiques obsolètes (`ANALYZE`).",
          },
        ],
      },
    ],
  },
  {
    id: "cte",
    title: "CTE : les requêtes `WITH`",
    level: 3,
    intro:
      "Structurer les requêtes complexes en étapes nommées et lisibles.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Requête décomposée en CTE",
        code: `WITH paniers_valides AS (\n  SELECT * FROM commandes WHERE statut = 'payee'\n),\npar_client AS (\n  SELECT client_id, SUM(total) AS depense\n  FROM paniers_valides\n  GROUP BY client_id\n)\nSELECT c.email, p.depense\nFROM clients c\nJOIN par_client p ON p.client_id = c.id\nWHERE p.depense > 500\nORDER BY p.depense DESC;`,
      },
      {
        kind: "text",
        text: "Chaque CTE est une étape nommée, réutilisable dans la requête principale. La lisibilité explose par rapport aux sous-requêtes imbriquées. Les CTE récursives (`WITH RECURSIVE`) traitent les structures hiérarchiques : arborescences de catégories, organigrammes, chemins dans un graphe.",
      },
    ],
  },
  {
    id: "window-functions",
    title: "Fonctions de fenêtrage",
    level: 3,
    intro:
      "Calculer sur des groupes de lignes sans les agréger : classements, cumuls, comparaisons.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Classement et cumul",
        code: `-- Rang des produits par prix, par catégorie\nSELECT nom, categorie, prix,\n  RANK() OVER (PARTITION BY categorie ORDER BY prix DESC) AS rang\nFROM produits;\n\n-- Chiffre d'affaires cumulé par mois\nSELECT mois, montant,\n  SUM(montant) OVER (ORDER BY mois) AS cumul\nFROM ventes_mensuelles;`,
      },
      {
        kind: "text",
        text: "La clause `OVER` définit la « fenêtre » : `PARTITION BY` découpe en groupes, `ORDER BY` ordonne dans chaque groupe. Contrairement à `GROUP BY`, chaque ligne est conservée — on ajoute une colonne calculée au lieu de réduire. `LAG()`/`LEAD()` accèdent aux lignes voisines (comparer au mois précédent, par exemple).",
      },
    ],
  },
  {
    id: "vues",
    title: "Vues : des requêtes comme des tables",
    level: 3,
    intro:
      "Encapsuler une requête complexe derrière un nom simple.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Créer et utiliser une vue",
        code: `CREATE VIEW top_clients AS\nSELECT c.email, SUM(o.total) AS depense\nFROM clients c\nJOIN commandes o ON o.client_id = c.id\nWHERE o.statut = 'payee'\nGROUP BY c.email;\n\nSELECT * FROM top_clients WHERE depense > 1000;`,
      },
      {
        kind: "text",
        text: "Une vue est une requête stockée : à chaque `SELECT` sur la vue, la requête est réexécutée sur les données à jour. Usage : simplifier l'accès applicatif, masquer la complexité, offrir une couche de compatibilité quand le schéma évolue. Les vues matérialisées (`CREATE MATERIALIZED VIEW`) stockent le résultat et se rafraîchissent explicitement (`REFRESH`) — utiles pour des agrégats coûteux sur des données qui changent peu.",
      },
    ],
  },
  {
    id: "fonctions-plpgsql",
    title: "Fonctions `plpgsql`",
    level: 3,
    intro:
      "Encapsuler de la logique dans la base avec le langage procédural intégré.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Fonction de calcul",
        code: `CREATE OR REPLACE FUNCTION total_panier(p_client INTEGER)\nRETURNS NUMERIC AS $$\nDECLARE\n  total NUMERIC;\nBEGIN\n  SELECT COALESCE(SUM(total), 0) INTO total\n  FROM commandes\n  WHERE client_id = p_client AND statut = 'payee';\n  RETURN total;\nEND;\n$$ LANGUAGE plpgsql;\n\nSELECT total_panier(42);`,
      },
      {
        kind: "text",
        text: "Les fonctions rapprochent la logique des données : un calcul utilisé par plusieurs applications n'est écrit qu'une fois. Limite : la logique métier complexe reste mieux dans le code applicatif (testabilité, versionnement, débogage). Réserver les fonctions aux calculs proches des données et aux triggers.",
      },
    ],
  },
  {
    id: "triggers",
    title: "Triggers : réagir aux modifications",
    level: 3,
    intro:
      "Exécuter automatiquement du code quand les données changent.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Trigger d'audit",
        code: `CREATE TABLE audit_prix (\n  produit_id INTEGER,\n  ancien_prix NUMERIC(10,2),\n  nouveau_prix NUMERIC(10,2),\n  modifie_le TIMESTAMPTZ DEFAULT now()\n);\n\nCREATE OR REPLACE FUNCTION journaliser_prix()\nRETURNS TRIGGER AS $$\nBEGIN\n  INSERT INTO audit_prix (produit_id, ancien_prix, nouveau_prix)\n  VALUES (OLD.id, OLD.prix, NEW.prix);\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER trg_prix\nAFTER UPDATE OF prix ON produits\nFOR EACH ROW\nWHEN (OLD.prix IS DISTINCT FROM NEW.prix)\nEXECUTE FUNCTION journaliser_prix();`,
      },
      {
        kind: "text",
        text: "Cas d'usage légitimes : audit (qui a changé quoi), maintien de colonnes dérivées, contraintes complexes impossibles en `CHECK`. À manier avec retenue : la logique cachée dans les triggers surprend les développeurs et complique le débogage — chaque trigger doit être documenté.",
      },
    ],
  },
  {
    id: "sequences-et-serial",
    title: "Séquences, `SERIAL` et identité",
    level: 3,
    intro:
      "Comment PostgreSQL génère les identifiants auto-incrémentés.",
    blocks: [
      {
        kind: "text",
        text: "`SERIAL` est un raccourci : il crée une séquence et l'associe en défaut à la colonne. La forme moderne recommandée est `GENERATED ALWAYS AS IDENTITY`, qui respecte le standard SQL et empêche l'insertion manuelle accidentelle d'un id.",
      },
      {
        kind: "code",
        language: "sql",
        title: "Identité moderne",
        code: `CREATE TABLE produits (\n  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  nom TEXT NOT NULL\n);\n\n-- Alternative : UUID sans séquence\nCREATE TABLE sessions (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid()\n);`,
      },
      {
        kind: "text",
        text: "Séquences vs UUID : les séquences donnent des ids courts, ordonnés et lisibles (parfaits pour la plupart des tables) ; les UUID permettent de générer l'id côté application avant insertion (utile en distribué) au prix d'index plus volumineux. `gen_random_uuid()` nécessite l'extension `pgcrypto`.",
      },
    ],
  },
  {
    id: "normalisation",
    title: "Normalisation : structurer sans redondance",
    level: 3,
    intro:
      "Les principes qui évitent les anomalies de mise à jour.",
    blocks: [
      {
        kind: "list",
        items: [
          "1NF : chaque colonne contient des valeurs atomiques (pas de listes dans une cellule).",
          "2NF : chaque colonne non-clé dépend de toute la clé (pas d'une partie).",
          "3NF : pas de dépendance transitive (une colonne ne dépend pas d'une autre colonne non-clé).",
          "En pratique : viser la 3NF par défaut — chaque fait est stocké une seule fois, à un seul endroit.",
          "Dénormalisation consciente : on duplique parfois volontairement (compteurs, caches) pour la performance, en documentant ce qui doit rester synchronisé.",
        ],
      },
      {
        kind: "text",
        text: "Exemple d'anomalie : stocker le nom du client dans chaque commande. Si le client change de nom, il faut mettre à jour toutes ses commandes — ou accepter l'incohérence. Avec une table `clients` et une clé étrangère, le nom n'existe qu'à un endroit.",
      },
    ],
  },
  {
    id: "migrations",
    title: "Migrations : versionner le schéma",
    level: 3,
    intro:
      "Le schéma évolue comme le code : par changements versionnés et réversibles.",
    blocks: [
      {
        kind: "text",
        text: "Principe : jamais de `ALTER TABLE` manuel en production. Chaque changement de schéma est un fichier de migration versionné (ex. `004_ajout_colonne_statut.sql`) appliqué dans l'ordre par l'outil de migration du framework (ou un outil dédié).",
      },
      {
        kind: "list",
        items: [
          "Chaque migration fait une seule chose et sait s'annuler (down migration).",
          "Les migrations sont testées sur une copie de production avant déploiement.",
          "Sur les grosses tables, certains `ALTER` verrouillent la table : les exécuter en heures creuses ou utiliser des stratégies sans verrou.",
          "Ne jamais modifier une migration déjà appliquée en production : créer une nouvelle migration corrective.",
        ],
      },
    ],
  },
  {
    id: "vacuum-analyze",
    title: "`VACUUM` et `ANALYZE` : l'entretien",
    level: 3,
    intro:
      "Pourquoi PostgreSQL a besoin d'un entretien régulier — et comment il s'en charge seul.",
    blocks: [
      {
        kind: "text",
        text: "PostgreSQL utilise le MVCC : un `UPDATE` ne modifie pas la ligne en place, il crée une nouvelle version et marque l'ancienne comme morte. `VACUUM` nettoie ces versions mortes et récupère l'espace ; `ANALYZE` met à jour les statistiques utilisées par le planificateur. L'autovacuum fait les deux automatiquement en arrière-plan.",
      },
      {
        kind: "list",
        items: [
          "En fonctionnement normal, l'autovacuum suffit : ne pas le désactiver.",
          "Après un import massif ou une suppression massive, un `VACUUM ANALYZE` manuel remet les compteurs à jour immédiatement.",
          "Des statistiques obsolètes = de mauvais plans d'exécution : si une requête devient lente sans raison, `ANALYZE` est le premier réflexe.",
          "Surveiller le « bloat » (espace gaspillé) fait partie de l'administration courante.",
        ],
      },
    ],
  },
  {
    id: "replication",
    title: "Réplication : la haute disponibilité",
    level: 3,
    intro:
      "Un primaire qui écrit, des réplicas qui suivent : le schéma standard.",
    blocks: [
      {
        kind: "diagram",
        title: "Réplication en streaming",
        lines: [
          "Primaire (écritures + lectures)",
          "   │  WAL streamé en continu",
          "   ├──► Réplica 1 (lectures seules)",
          "   └──► Réplica 2 (lectures seules)",
          "",
          "En cas de panne : promotion d'un réplica en primaire",
          "(basculement manuel ou automatique avec un outil dédié).",
        ],
      },
      {
        kind: "text",
        text: "La réplication physique en streaming copie le WAL vers les réplicas en quasi temps réel. Usages : répartir les lectures (reporting, analytics), basculer en cas de panne, sauvegarder depuis un réplica sans charger le primaire. La réplication logique (par tables, avec transformations possibles) sert aux migrations et à l'alimentation d'autres systèmes.",
      },
    ],
  },
  {
    id: "sauvegardes-avancees",
    title: "Sauvegardes avancées et PITR",
    level: 3,
    intro:
      "Au-delà du `pg_dump` : restaurer à un instant précis.",
    blocks: [
      {
        kind: "text",
        text: "La stratégie complète combine une sauvegarde de base (copie physique du cluster) et l'archivage continu du WAL. En cas de sinistre, on restaure la sauvegarde puis on rejoue le WAL jusqu'à l'instant souhaité : c'est le PITR (Point-In-Time Recovery) — on peut revenir à « juste avant la suppression accidentelle de 14h32 ».",
      },
      {
        kind: "list",
        items: [
          "`pg_dump` : simple, logique, parfait jusqu'à quelques Go et pour les restaurations sélectives.",
          "Sauvegarde physique + WAL : pour les grosses bases et le PITR, avec un outil qui orchestre (ex. pgBackRest, Barman — des outils dédiés existent).",
          "Tester la restauration régulièrement : une sauvegarde non testée n'existe pas.",
          "Définir un RPO (perte de données acceptable) et un RTO (temps de restauration acceptable) : ils dictent la stratégie.",
        ],
      },
    ],
  },
  {
    id: "securite-roles",
    title: "Sécurité : rôles et `pg_hba.conf`",
    level: 3,
    intro:
      "Qui peut se connecter, et que peut-il faire : les deux couches.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Rôles et privilèges",
        code: `-- Rôle applicatif sans super-pouvoirs\nCREATE ROLE app_boutique LOGIN PASSWORD 'mot-de-passe-fort';\n\n-- Droits minimaux sur un schéma\nGRANT CONNECT ON DATABASE boutique TO app_boutique;\nGRANT USAGE ON SCHEMA public TO app_boutique;\nGRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public\n  TO app_boutique;`,
      },
      {
        kind: "text",
        text: "Principe du moindre privilège : l'application se connecte avec un rôle qui ne peut faire que ce dont elle a besoin — jamais avec le super-utilisateur `postgres`. La seconde couche est `pg_hba.conf` : qui peut se connecter depuis où, avec quelle méthode d'authentification (mot de passe, certificat, `peer` local).",
      },
      {
        kind: "list",
        items: [
          "Un rôle par application, jamais de compte partagé entre apps.",
          "Mots de passe forts, stockés hors du code (variables d'environnement, gestionnaire de secrets).",
          "Chiffrer les connexions (SSL) dès que le réseau n'est pas de confiance.",
          "Auditer périodiquement les rôles et leurs droits : les privilèges s'accumulent avec le temps.",
        ],
      },
    ],
  },
  {
    id: "connection-pooling",
    title: "Connection pooling",
    level: 3,
    intro:
      "Pourquoi on ne laisse pas 500 applications ouvrir 500 connexions directes.",
    blocks: [
      {
        kind: "text",
        text: "Rappel d'architecture : chaque connexion PostgreSQL = un processus serveur. Des centaines de connexions simultanées épuisent la mémoire et le CPU en changements de contexte. Un pooler (comme PgBouncer, l'outil de référence) maintient un petit nombre de connexions réelles vers Postgres et multiplexe les clients applicatifs dessus.",
      },
      {
        kind: "list",
        items: [
          "Modes : session pooling (une connexion serveur par client, le plus simple), transaction pooling (la connexion est rendue à chaque COMMIT — le plus économe, mais incompatible avec certaines fonctionnalités de session).",
          "Le pooling côté application (dans le driver) complète le pooling côté serveur : les deux niveaux coexistent.",
          "Symptôme typique d'un manque de pooling : `too many clients already` ou un serveur qui sature en processus idle.",
          "Dimensionner : quelques dizaines de connexions serveur suffisent souvent pour des centaines de clients applicatifs.",
        ],
      },
    ],
  },
  {
    id: "performance-requetes",
    title: "Performance des requêtes",
    level: 3,
    intro:
      "La méthode pour rendre une requête lente rapide, dans l'ordre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Mesurer",
            detail: "`\\timing` dans psql pour quantifier, `EXPLAIN ANALYZE` pour comprendre. On n'optimise jamais sans mesure.",
          },
          {
            title: "Vérifier les index",
            detail: "Le plan montre-t-il un `Seq Scan` sur une grande table filtrée ? Créer l'index manquant résout la majorité des lenteurs.",
          },
          {
            title: "Vérifier les statistiques",
            detail: "Un écart important entre `rows` estimé et `actual` signale des statistiques obsolètes : `ANALYZE la_table`.",
          },
          {
            title: "Réécrire la requête",
            detail: "Éviter les fonctions sur les colonnes indexées dans le WHERE, préférer les jointures aux sous-requêtes corrélées, paginer par curseur plutôt que par OFFSET sur les gros volumes.",
          },
          {
            title: "Dénormaliser en dernier recours",
            detail: "Si la requête reste trop lente malgré des index corrects : colonne dérivée maintenue par trigger, vue matérialisée, ou cache applicatif.",
          },
        ],
      },
    ],
  },
  {
    id: "upsert-on-conflict",
    title: "`ON CONFLICT` : l'upsert",
    level: 3,
    intro:
      "Insérer ou mettre à jour en une seule instruction atomique.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Upsert : insérer, sinon mettre à jour",
        code: `INSERT INTO produits (id, nom, prix, stock)\nVALUES (1, 'Clavier', 49.90, 12)\nON CONFLICT (id) DO UPDATE SET\n  prix = EXCLUDED.prix,\n  stock = EXCLUDED.stock;`,
      },
      {
        kind: "text",
        text: "`ON CONFLICT` gère la violation de contrainte d'unicité sans erreur : `DO NOTHING` ignore silencieusement les doublons (idéal pour les imports idempotents), `DO UPDATE` met à jour avec les valeurs proposées (référencées via la table spéciale `EXCLUDED`).",
      },
      {
        kind: "list",
        items: [
          "Atomique : pas de course entre le SELECT de vérification et l'INSERT — le pattern « tester puis insérer » en deux requêtes est buggé en concurrence.",
          "Idempotent : relancer un import ne crée pas de doublons.",
          "`DO UPDATE` peut filtrer avec `WHERE` (ne mettre à jour que si le nouveau prix est inférieur, par exemple).",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-pro",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Ce qui distingue une base saine d'une base qui devient un fardeau.",
    blocks: [
      {
        kind: "list",
        items: [
          "Contraintes dans la base, pas seulement dans l'application : l'intégrité ne dépend pas du client.",
          "Migrations versionnées pour tout changement de schéma, jamais de modification manuelle en production.",
          "Sauvegardes automatiques et restaurations testées régulièrement.",
          "Monitoring : espace disque, connexions, requêtes lentes (`log_min_duration_statement`), réplication.",
          "Principe du moindre privilège pour les rôles applicatifs.",
          "Transactions courtes et explicites pour les opérations multi-étapes.",
          "Index justifiés par des requêtes réelles (vérifiées avec EXPLAIN), pas par intuition.",
          "`TIMESTAMPTZ` partout pour les dates, `NUMERIC` pour la monnaie.",
          "Documentation du schéma : commentaires sur les tables et colonnes (`COMMENT ON`).",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes et solutions",
    level: 3,
    intro:
      "Les messages d'erreur PostgreSQL que l'on rencontre vraiment.",
    blocks: [
      {
        kind: "table",
        headers: ["Message / symptôme", "Cause probable", "Solution"],
        rows: [
          ["`duplicate key value violates unique constraint`", "Insertion d'un doublon sur une colonne unique", "Vérifier l'existence avant, ou utiliser `ON CONFLICT DO NOTHING/UPDATE`"],
          ["`foreign key violation`", "Référence vers une ligne inexistante", "Créer d'abord le parent, ou vérifier l'id"],
          ["`null value violates not-null constraint`", "Valeur manquante sur une colonne obligatoire", "Fournir la valeur ou définir un `DEFAULT`"],
          ["`deadlock detected`", "Deux transactions se bloquent mutuellement", "Réessayer la transaction ; ordonner les accès de façon cohérente"],
          ["`too many clients already`", "Trop de connexions simultanées", "Mettre en place un pooler (PgBouncer), réduire les connexions applicatives"],
          ["`remaining connection slots are reserved`", "Connexions réservées au super-utilisateur épuisées", "Même cause : le pooling est la réponse structurelle"],
          ["Requête lente sans raison apparente", "Statistiques obsolètes ou index manquant", "`ANALYZE`, puis `EXPLAIN ANALYZE` pour vérifier"],
        ],
      },
    ],
  },
  {
    id: "projet-schema-ecommerce",
    title: "Projet : schéma e-commerce optimisé",
    level: 3,
    intro:
      "Le projet canonique : concevoir un schéma complet et prouver ses performances.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Modéliser",
            detail: "Clients, produits, catégories, commandes, lignes de commande, paiements : tables, clés primaires, clés étrangères, contraintes métier (prix positif, email unique, stock non négatif).",
          },
          {
            title: "Indexer",
            detail: "Index sur les clés étrangères, index composite sur (client_id, date) pour l'historique, index partiel sur les commandes en cours, GIN sur les attributs JSONB des produits.",
          },
          {
            title: "Peupler",
            detail: "Générer un volume réaliste (fonction `generate_series` pour créer des centaines de milliers de lignes de test).",
          },
          {
            title: "Mesurer",
            detail: "`EXPLAIN ANALYZE` sur les requêtes critiques (panier, historique client, top ventes) : vérifier l'usage des index et les temps.",
          },
          {
            title: "Sauvegarder et migrer",
            detail: "Écrire les migrations versionnées du schéma, mettre en place `pg_dump` automatisé et tester une restauration.",
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
            label: "Documentation PostgreSQL",
            value: "postgresql.org/docs : la référence exhaustive, remarquablement bien écrite — du tutoriel aux internals.",
          },
          {
            label: "Tutoriel officiel",
            value: "Le tutoriel pas à pas pour prendre en main SQL sur Postgres.",
          },
          {
            label: "Wiki PostgreSQL",
            value: "wiki.postgresql.org : recettes d'administration, tuning, haute disponibilité par la communauté.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : le projet e-commerce de cette page, avec mesures EXPLAIN à l'appui.",
          "Complément : la compétence `sql` pour le langage, `mysql` et `mongodb` pour comparer les modèles.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "PostgreSQL maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Comparer les modèles avec `mysql` (le relationnel historique du web) et `mongodb` (le document).",
          "Mettre en cache avec `redis` : ce qui est lu souvent et change peu ne devrait pas frapper la base.",
          "Connecter depuis le code avec `nodejs` : drivers, pooling applicatif, migrations.",
          "Conteneuriser avec `docker` : PostgreSQL en développement et en CI.",
          "Revenir à la roadmap : valider PostgreSQL et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

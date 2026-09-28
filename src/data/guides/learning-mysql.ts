import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de MySQL : le relationnel historique du web,
 * du premier SELECT à la production.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_MYSQL: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est MySQL, pourquoi il domine l'historique du web et ce qu'il faut en attendre.",
    blocks: [
      {
        kind: "text",
        text: "MySQL est un système de gestion de base de données relationnelle (SGBDR) : les données sont stockées dans des tables liées entre elles, interrogées en SQL. Simple, rapide et robuste, il propulse une immense partie du web historique — WordPress et des millions de sites tournent dessus.",
      },
      {
        kind: "text",
        text: "Pourquoi MySQL existe encore au centre : il fait bien le travail relationnel standard — CRUD, transactions, intégrité — avec une administration accessible et un écosystème immense (hébergeurs, outils, documentation). Quand le besoin est 'une base relationnelle fiable sans surprise', MySQL est le choix par défaut de générations de développeurs.",
      },
      {
        kind: "text",
        text: "MySQL vs PostgreSQL, en bref : MySQL privilégie la simplicité et la vitesse sur les cas courants ; PostgreSQL offre un SQL plus riche et des fonctionnalités avancées. Les deux sont d'excellentes bases relationnelles — le choix dépend du projet, pas d'une supériorité absolue. Connaître MySQL, c'est aussi comprendre ses différences avec PostgreSQL.",
      },
    ],
  },
  {
    id: "panorama-mysql",
    title: "MySQL en une image",
    level: 1,
    intro:
      "Le trajet d'une requête, de l'application à la ligne retournée.",
    blocks: [
      {
        kind: "diagram",
        title: "De la requête au résultat",
        lines: [
          "Application (client MySQL, port 3306)",
          "     │  SQL",
          "     ▼",
          "CONNEXION (authentification, session)",
          "     │",
          "     ▼",
          "PARSE (analyse syntaxique de la requête)",
          "     │",
          "     ▼",
          "OPTIMISEUR (choisit le plan : quels index ?)",
          "     │",
          "     ▼",
          "MOTEUR InnoDB (transactions, verrous, lecture)",
          "     │",
          "     ▼",
          "RÉSULTAT (lignes retournées au client)",
        ],
      },
      {
        kind: "list",
        items: [
          "Port 3306, protocole client/serveur : l'application ne touche jamais les fichiers directement.",
          "L'optimiseur choisit comment exécuter : un bon index change tout.",
          "InnoDB, le moteur par défaut : transactions ACID, verrous ligne, clés étrangères.",
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
      "Les fondations avant MySQL.",
    blocks: [
      {
        kind: "fields",
        title: "Bases nécessaires",
        fields: [
          {
            label: "SQL (bases)",
            value:
              "SELECT, WHERE, INSERT, UPDATE, DELETE : MySQL est d'abord un serveur SQL. Sans ces bases, on administre une boîte noire.",
          },
          {
            label: "Bases de données (concept)",
            value:
              "Tables, clés primaires, relations : le vocabulaire relationnel. MySQL l'implémente strictement.",
          },
          {
            label: "Terminal",
            value:
              "Le client `mysql` vit en ligne de commande : s'y connecter, exécuter des scripts, rediriger des dumps.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pas besoin de connaître un autre SGBD : MySQL s'apprend très bien en premier. En revanche, chaque notion SQL apprise ici se transfère à PostgreSQL et aux autres — l'investissement est portable.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Lancer MySQL 8 en local : Docker pour la rapidité, paquet natif pour le durable.",
    blocks: [
      {
        kind: "command",
        label: "Lancer MySQL avec Docker",
        command: "docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8",
        why: "Démarre MySQL 8 dans un conteneur en exposant le port 3306. La variable `MYSQL_ROOT_PASSWORD` définit le mot de passe root à l'initialisation — obligatoire, sinon le conteneur refuse de démarrer. Le mot de passe `root` ne convient qu'au développement local.",
        verify: "docker ps --filter name=mysql",
      },
      {
        kind: "command",
        label: "Installer nativement (Debian/Ubuntu)",
        command: "sudo apt install mysql-server",
        why: "Installe le serveur via le gestionnaire de paquets : service système, données persistantes dans `/var/lib/mysql`, configuration dans `/etc/mysql`. La voie pour une machine durable (serveur de dev, VPS).",
        verify: "mysql --version",
      },
      {
        kind: "command",
        label: "Sécuriser l'installation",
        command: "sudo mysql_secure_installation",
        why: "Script interactif qui durcit l'installation : définit le mot de passe root, supprime les utilisateurs anonymes et la base de test, restreint l'accès root local. À exécuter sur toute installation native avant usage.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet",
    level: 2,
    intro:
      "Créer une base, une table, y écrire et lire : le cycle complet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Se connecter",
            detail:
              "`mysql -u root -p` demande le mot de passe et ouvre le client. Le `-p` sans valeur force la saisie interactive — ne jamais passer le mot de passe en clair dans la commande (il resterait dans l'historique).",
          },
          {
            title: "Créer base et utilisateur dédié",
            detail:
              "`CREATE DATABASE boutique CHARACTER SET utf8mb4;` puis créer un utilisateur applicatif avec des droits limités à cette base. Travailler en root au quotidien est une mauvaise habitude.",
          },
          {
            title: "Créer une table",
            detail:
              "Définir les colonnes avec leurs types (`INT`, `VARCHAR(255)`, `DECIMAL(10,2)`), une clé primaire auto-incrémentée, et le charset `utf8mb4` pour gérer tous les caractères (emojis inclus).",
          },
          {
            title: "Insérer et lire",
            detail:
              "`INSERT INTO produits (…) VALUES (…)` puis `SELECT * FROM produits WHERE prix > 50`. Vérifier immédiatement ce qu'on a écrit : la boucle courte évite les surprises.",
          },
          {
            title: "Mettre à jour et supprimer prudemment",
            detail:
              "`UPDATE` et `DELETE` toujours avec un `WHERE` — sans lui, c'est toute la table. En cas de doute, un `SELECT` avec le même `WHERE` d'abord.",
          },
        ],
      },
      {
        kind: "code",
        language: "sql",
        title: "Base boutique — création et requêtes",
        code: "CREATE DATABASE boutique CHARACTER SET utf8mb4;\nUSE boutique;\n\nCREATE TABLE produits (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nom VARCHAR(255) NOT NULL,\n  prix DECIMAL(10,2) NOT NULL,\n  stock INT DEFAULT 0,\n  cree_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nINSERT INTO produits (nom, prix, stock) VALUES\n  ('Clavier', 79.00, 12),\n  ('Souris', 29.00, 30);\n\nSELECT nom, prix FROM produits WHERE stock > 0 ORDER BY prix DESC;",
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Les pièces d'un poste MySQL.",
    blocks: [
      {
        kind: "diagram",
        title: "La chaîne locale",
        lines: [
          "Terminal",
          "   ├─► Serveur : Docker (`mysql:8`) ou paquet natif",
          "   ├─► Client : `mysql -u app -p` (requêtes, scripts)",
          "   └─► GUI : MySQL Workbench / DBeaver / TablePlus",
          "           (explorer, éditer, visualiser les plans)",
          "   Éditeur : VS Code + extension MySQL",
          "           (requêtes dans des fichiers .sql versionnés)",
        ],
      },
      {
        kind: "text",
        text: "Le client en ligne de commande reste l'outil de référence : scripts, dumps, automatisation. La GUI sert à explorer et à comprendre (plans d'exécution visuels, schémas). Les fichiers `.sql` versionnés dans Git sont la bonne façon de partager requêtes et migrations.",
      },
    ],
  },
  {
    id: "outils",
    title: "Outils : clients et GUI",
    level: 2,
    intro:
      "Les outils reconnus, avec leur rôle.",
    blocks: [
      {
        kind: "fields",
        title: "Les outils",
        fields: [
          {
            label: "Client `mysql`",
            value:
              "Le client officiel en ligne de commande : requêtes interactives, exécution de scripts, dumps. Incontournable.",
          },
          {
            label: "MySQL Workbench",
            value:
              "La GUI officielle : modélisation visuelle, administration, plans d'exécution. Gratuite.",
          },
          {
            label: "DBeaver",
            value:
              "Client universel gratuit et multi-bases : pratique quand on jongle entre MySQL, PostgreSQL, SQLite.",
          },
          {
            label: "TablePlus",
            value:
              "Client natif léger et rapide (licence) : apprécié pour l'usage quotidien.",
          },
          {
            label: "Extension VS Code « MySQL »",
            value:
              "Explorer les bases et exécuter des requêtes depuis l'éditeur, résultats intégrés.",
          },
        ],
      },
    ],
  },
  {
    id: "utilisateurs-droits",
    title: "Utilisateurs et droits",
    level: 2,
    intro:
      "Ne jamais faire tourner une application en root : le principe du moindre privilège.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Créer un utilisateur applicatif",
        code: "CREATE USER 'app'@'%' IDENTIFIED BY 'mot-de-passe-solide';\nGRANT SELECT, INSERT, UPDATE, DELETE ON boutique.* TO 'app'@'%';\nFLUSH PRIVILEGES;",
      },
      {
        kind: "list",
        items: [
          "`'app'@'%'` : l'utilisateur `app` depuis n'importe quel hôte ; restreindre à `'app'@'localhost'` ou à l'IP du serveur applicatif quand c'est possible.",
          "Droits limités aux opérations nécessaires : pas de `GRANT ALL` par paresse — une application compromise avec `ALL` peut tout détruire.",
          "Un utilisateur par application/base : en cas d'incident, on révoque sans toucher aux autres.",
        ],
      },
    ],
  },
  {
    id: "configuration-essentielle",
    title: "Configuration essentielle",
    level: 2,
    intro:
      "Le fichier `my.cnf` : les réglages qui comptent vraiment.",
    blocks: [
      {
        kind: "fields",
        title: "Options clés",
        fields: [
          {
            label: "`bind-address`",
            value:
              "L'interface d'écoute. `127.0.0.1` = local uniquement ; `0.0.0.0` = toutes les interfaces (à combiner avec firewall et utilisateurs restreints).",
          },
          {
            label: "`max_connections`",
            value:
              "Le nombre max de connexions simultanées (151 par défaut). À dimensionner selon l'application ; au-delà, les clients sont refusés.",
          },
          {
            label: "`innodb_buffer_pool_size`",
            value:
              "La mémoire dédiée au cache InnoDB : le réglage performance n°1. Sur un serveur dédié, 50-70 % de la RAM est un point de départ courant.",
          },
          {
            label: "`character-set-server=utf8mb4`",
            value:
              "Le jeu de caractères par défaut : `utf8mb4` gère tous les caractères Unicode. L'ancien `utf8` de MySQL est un sous-ensemble incomplet — source classique de caractères corrompus.",
          },
        ],
      },
      {
        kind: "text",
        text: "Après modification : redémarrer le service et vérifier avec `SHOW VARIABLES LIKE 'innodb_buffer_pool_size';`. Ne jamais copier une configuration 'optimisée' trouvée en ligne sans comprendre chaque option.",
      },
    ],
  },
  {
    id: "commandes-quotidiennes",
    title: "Commandes du quotidien",
    level: 2,
    intro:
      "Sauvegarde, restauration, inspection : les commandes qui reviennent.",
    blocks: [
      {
        kind: "command",
        label: "Sauvegarder une base",
        command: "mysqldump -u root -p boutique > backup.sql",
        why: "Exporte la base `boutique` en SQL texte (structure + données). Le fichier est lisible, versionnable pour les petites bases, et restaurable sur n'importe quel MySQL. La méthode standard pour les petites et moyennes bases.",
        verify: "ls -lh backup.sql",
      },
      {
        kind: "command",
        label: "Restaurer une sauvegarde",
        command: "mysql -u root -p boutique < backup.sql",
        why: "Réinjecte le dump dans la base. Tester la restauration sur une base de test avant le jour où on en aura vraiment besoin.",
      },
      {
        kind: "command",
        label: "Lister bases et tables",
        command: "mysql -u root -p -e \"SHOW DATABASES;\"",
        why: "L'option `-e` exécute une commande sans ouvrir le client interactif : idéale pour les scripts et les vérifications rapides.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "La routine d'un développeur avec MySQL.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier que le serveur tourne",
            detail:
              "Conteneur démarré ou service actif, puis une connexion test. Cinq secondes qui évitent des erreurs incompréhensibles plus tard.",
          },
          {
            title: "Travailler avec l'utilisateur applicatif",
            detail:
              "Se connecter en `app`, pas en root : on travaille avec les mêmes droits que l'application, donc on voit les mêmes erreurs de permission.",
          },
          {
            title: "Écrire les requêtes en fichiers",
            detail:
              "Les requêtes non triviales vivent dans des `.sql` versionnés, pas dans l'historique du client. Rejouables, relisibles, partageables.",
          },
          {
            title: "EXPLAIN avant de mettre en production",
            detail:
              "Toute nouvelle requête sur une table volumineuse passe par `EXPLAIN` : vérifier qu'elle utilise un index.",
          },
          {
            title: "Sauvegarder avant les opérations risquées",
            detail:
              "`mysqldump` avant migration ou suppression massive. Réflexe non négociable.",
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
      "Quatre projets de difficulté croissante.",
    blocks: [
      {
        kind: "fields",
        title: "Dans l'ordre",
        fields: [
          {
            label: "1. Base boutique complète",
            value:
              "Tables produits, clients, commandes avec clés étrangères ; 10 requêtes (jointures, agrégats). Objectif : le SQL réflexe.",
          },
          {
            label: "2. Blog avec utilisateurs",
            value:
              "Inscription/connexion (mots de passe hashés côté appli), articles, commentaires. Objectif : brancher MySQL à une vraie application.",
          },
          {
            label: "3. Optimisation d'une base lente",
            value:
              "Importer un jeu volumineux, activer le slow query log, ajouter les index manquants, mesurer le gain. Objectif : la performance par la mesure.",
          },
          {
            label: "4. Réplication primaire/réplica",
            value:
              "Deux instances, GTID, bascule des lectures. Objectif : la haute disponibilité.",
          },
        ],
      },
    ],
  },
  {
    id: "mysql-vs-postgresql",
    title: "MySQL vs PostgreSQL : choisir",
    level: 2,
    intro:
      "Comparatif factuel pour choisir en connaissance de cause.",
    blocks: [
      {
        kind: "table",
        headers: ["", "MySQL", "PostgreSQL"],
        rows: [
          ["Philosophie", "Simplicité et vitesse sur les cas courants", "Richesse fonctionnelle et rigueur SQL"],
          ["Cas typiques", "Applications web classiques, WordPress, LAMP", "Analytique, SIG, besoins SQL avancés"],
          ["Types avancés", "Basiques (+ JSON depuis la 5.7)", "Très riches (tableaux, JSONB, géospatial natif)"],
          ["Réplication", "Primaire/réplica mature et simple", "Également mature, plus d'options"],
          ["Écosystème", "Immense (hébergeurs, outils)", "Immense également"],
        ],
      },
      {
        kind: "text",
        text: "En pratique : pour une application web standard, les deux conviennent et le choix importe moins que la maîtrise. MySQL reste incontournable pour maintenir l'existant (des millions de déploiements) et pour les stacks LAMP/WordPress.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "innodb",
    title: "InnoDB en profondeur",
    level: 3,
    intro:
      "Le moteur par défaut : ce qu'il garantit et comment il le fait.",
    blocks: [
      {
        kind: "text",
        text: "InnoDB est le moteur de stockage par défaut depuis MySQL 5.5 : il apporte les transactions ACID, le verrouillage au niveau ligne (plutôt que table) et les clés étrangères. L'ancien MyISAM (sans transactions, verrous de table) n'a plus de raison d'être utilisé.",
      },
      {
        kind: "fields",
        title: "Mécanismes clés",
        fields: [
          {
            label: "Buffer pool",
            value:
              "Le cache mémoire des données et index : dimensionné via `innodb_buffer_pool_size`, c'est le réglage qui a le plus d'impact. Un taux de hit élevé = peu d'accès disque.",
          },
          {
            label: "Redo log",
            value:
              "Journal des modifications : garantit la durabilité (le D d'ACID). En cas de crash, les transactions validées sont rejouées.",
          },
          {
            label: "Verrous ligne",
            value:
              "Deux transactions peuvent modifier des lignes différentes de la même table simultanément. Les verrous de table (MyISAM) bloquaient tout.",
          },
          {
            label: "Clés étrangères",
            value:
              "Garantissent l'intégrité référentielle au niveau de la base (pas de commande vers un client inexistant), avec actions `ON DELETE CASCADE/RESTRICT`.",
          },
        ],
      },
    ],
  },
  {
    id: "transactions-acid",
    title: "Transactions ACID",
    level: 3,
    intro:
      "Le tout-ou-rien : quand plusieurs écritures doivent réussir ensemble.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Virement : débit + crédit atomiques",
        code: "START TRANSACTION;\n\nUPDATE comptes SET solde = solde - 100 WHERE id = 'A';\nUPDATE comptes SET solde = solde + 100 WHERE id = 'B';\n\nCOMMIT;\n-- En cas d'erreur avant COMMIT : ROLLBACK; annule tout",
      },
      {
        kind: "fields",
        title: "ACID décodé",
        fields: [
          { label: "Atomicité", value: "Tout ou rien : si le crédit échoue, le débit est annulé." },
          { label: "Cohérence", value: "La base passe d'un état valide à un autre (contraintes respectées)." },
          { label: "Isolation", value: "Les transactions concurrentes ne se voient pas à moitié (niveaux réglables)." },
          { label: "Durabilité", value: "Une fois `COMMIT`, c'est écrit — même en cas de crash (redo log)." },
        ],
      },
    ],
  },
  {
    id: "niveaux-isolation",
    title: "Niveaux d'isolation",
    level: 3,
    intro:
      "Le compromis entre cohérence des lectures et concurrence.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Garantie", "Coût"],
        rows: [
          ["READ UNCOMMITTED", "Lit même les modifications non validées (dirty reads)", "Le plus concurrent, le moins sûr — rarement utilisé"],
          ["READ COMMITTED", "Ne lit que du validé ; une relecture peut changer", "Bon compromis courant"],
          ["REPEATABLE READ", "Les relectures dans la transaction sont stables (défaut MySQL)", "Plus de verrous, risque de deadlocks accru"],
          ["SERIALIZABLE", "Isolation totale, comme si tout était séquentiel", "Le plus lent, cas critiques uniquement"],
        ],
      },
      {
        kind: "text",
        text: "Le défaut MySQL (`REPEATABLE READ`) convient à la plupart des applications. On ne change de niveau qu'avec une raison mesurée — et en comprenant les anomalies qu'on accepte (lectures sales, non-répétables, fantômes).",
      },
    ],
  },
  {
    id: "index-strategie",
    title: "Stratégie d'indexation",
    level: 3,
    intro:
      "Les index B-tree : où les mettre, dans quel ordre, à quel prix.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Créer et inspecter des index",
        code: "-- Index simple sur une colonne filtrée\nCREATE INDEX idx_produits_categorie ON produits(categorie);\n\n-- Index composé : égalités d'abord, puis tri\nCREATE INDEX idx_commandes_statut_date ON commandes(statut, date_commande DESC);\n\n-- Index unique : contrainte + performance\nCREATE UNIQUE INDEX idx_users_email ON users(email);\n\n-- Voir les index d'une table\nSHOW INDEX FROM produits;",
      },
      {
        kind: "fields",
        title: "Règles",
        fields: [
          {
            label: "Indexer filtres, jointures, tris",
            value:
              "Les colonnes dans `WHERE`, `JOIN … ON` et `ORDER BY` sont les candidates. Vérifier avec `EXPLAIN`.",
          },
          {
            label: "Ordre du composé",
            value:
              "Colonnes d'égalité d'abord, puis la colonne de tri ou de plage. Un mauvais ordre = un index à moitié utile.",
          },
          {
            label: "Chaque index coûte aux écritures",
            value:
              "`INSERT`/`UPDATE`/`DELETE` maintiennent chaque index : sur une table très écrite, chaque index superflu ralentit.",
          },
          {
            label: "Clé primaire = index cluster",
            value:
              "Chez InnoDB, la clé primaire organise physiquement les données : une PK auto-incrémentée évite la fragmentation.",
          },
        ],
      },
    ],
  },
  {
    id: "explain-analyse",
    title: "Analyser avec EXPLAIN",
    level: 3,
    intro:
      "Lire le plan d'exécution : la compétence performance n°1.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Plan d'une requête",
        code: "EXPLAIN SELECT nom, prix FROM produits\nWHERE categorie = 'audio'\nORDER BY prix DESC;",
      },
      {
        kind: "fields",
        title: "Les colonnes clés",
        fields: [
          {
            label: "type",
            value:
              "`ALL` = scan complet de la table (le signal d'alarme) ; `ref`/`range` = accès par index ; `const` = accès direct par clé primaire. Viser autre chose que `ALL` sur les grosses tables.",
          },
          {
            label: "key",
            value:
              "L'index réellement utilisé (`NULL` = aucun). Comparer avec `possible_keys` : si un index existe mais n'est pas choisi, comprendre pourquoi.",
          },
          {
            label: "rows",
            value:
              "Le nombre de lignes que MySQL estime devoir examiner : un `rows` énorme pour peu de résultats = requête à optimiser.",
          },
          {
            label: "Extra",
            value:
              "`Using filesort` (tri coûteux), `Using temporary` (table temporaire) : des indices de requêtes à revoir.",
          },
        ],
      },
    ],
  },
  {
    id: "slow-query-log",
    title: "Slow query log",
    level: 3,
    intro:
      "Trouver les requêtes lentes en production : les mesurer d'abord.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Activer le log des requêtes lentes",
        code: "-- Dans my.cnf ou en dynamique :\nSET GLOBAL slow_query_log = 'ON';\nSET GLOBAL long_query_time = 1;  -- requêtes > 1 seconde\n\n-- Voir les requêtes les plus coûteuses (agrégées)\n-- avec l'outil mysqldumpslow :",
      },
      {
        kind: "command",
        label: "Analyser le slow log",
        command: "mysqldumpslow -s t /var/log/mysql/slow.log | head -30",
        why: "Agrège le slow query log par motif de requête et trie par temps total (`-s t`) : on voit immédiatement quelles requêtes coûtent le plus cher en cumulé, plutôt que de se noyer dans des milliers de lignes.",
      },
      {
        kind: "text",
        text: "La méthode : mesurer (slow log) → prioriser (temps total, pas temps unitaire) → EXPLAIN → indexer ou réécrire → mesurer à nouveau. Optimiser sans mesurer, c'est deviner.",
      },
    ],
  },
  {
    id: "jointures-avancees",
    title: "Jointures et requêtes avancées",
    level: 3,
    intro:
      "Le cœur du SQL relationnel : combiner les tables proprement.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Jointures et agrégats",
        code: "-- Chiffre d'affaires par client (INNER JOIN + GROUP BY)\nSELECT c.nom, SUM(cmd.total) AS ca\nFROM clients c\nINNER JOIN commandes cmd ON cmd.client_id = c.id\nWHERE cmd.statut = 'payée'\nGROUP BY c.id, c.nom\nHAVING ca > 1000\nORDER BY ca DESC;\n\n-- Clients sans commande (LEFT JOIN + IS NULL)\nSELECT c.nom\nFROM clients c\nLEFT JOIN commandes cmd ON cmd.client_id = c.id\nWHERE cmd.id IS NULL;",
      },
      {
        kind: "list",
        items: [
          "`INNER JOIN` : lignes présentes des deux côtés. `LEFT JOIN` : tout de la table de gauche, même sans correspondance.",
          "`WHERE` filtre avant l'agrégation, `HAVING` filtre après : les confondre est une erreur classique.",
          "Toujours qualifier les colonnes (`c.nom`) dès qu'il y a plusieurs tables : la lisibilité et la robustesse.",
        ],
      },
    ],
  },
  {
    id: "cte-fenetres",
    title: "CTE et fonctions de fenêtrage (MySQL 8)",
    level: 3,
    intro:
      "Le SQL moderne : requêtes lisibles et calculs sur fenêtres.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "CTE + ROW_NUMBER + classement",
        code: "-- CTE : nommer une sous-requête pour la lisibilité\nWITH ca_mensuel AS (\n  SELECT DATE_FORMAT(date_commande, '%Y-%m') AS mois,\n         SUM(total) AS ca\n  FROM commandes\n  WHERE statut = 'payée'\n  GROUP BY mois\n)\nSELECT mois, ca,\n       SUM(ca) OVER (ORDER BY mois) AS ca_cumule\nFROM ca_mensuel;\n\n-- Top 3 produits par catégorie\nSELECT categorie, nom, prix,\n       ROW_NUMBER() OVER (PARTITION BY categorie ORDER BY prix DESC) AS rang\nFROM produits;",
      },
      {
        kind: "text",
        text: "Disponibles depuis MySQL 8.0 : les CTE (`WITH`) structurent les requêtes complexes, les fonctions de fenêtrage (`OVER`, `PARTITION BY`) calculent des rangs et cumuls sans sous-requêtes tordues. Si votre MySQL est en 5.7, c'est une raison de migrer.",
      },
    ],
  },
  {
    id: "json-mysql",
    title: "Le type JSON",
    level: 3,
    intro:
      "Du semi-structuré dans du relationnel : quand et comment.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Colonne JSON et requêtes",
        code: "CREATE TABLE produits (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nom VARCHAR(255),\n  specs JSON,\n  CHECK (JSON_VALID(specs))\n);\n\n-- Extraire une valeur\nSELECT nom, specs->>'$.layout' AS layout\nFROM produits\nWHERE specs->>'$.connexion' = 'USB-C';\n\n-- Index sur une valeur JSON (colonne générée)\nALTER TABLE produits\n  ADD COLUMN layout VARCHAR(20)\n  GENERATED ALWAYS AS (specs->>'$.layout') STORED,\n  ADD INDEX idx_layout (layout);",
      },
      {
        kind: "text",
        text: "Le JSON convient aux attributs variables et secondaires. Règle : ce qui est filtré, trié ou joint régulièrement mérite une vraie colonne (indexable directement) ; le JSON accueille le reste. L'indexation passe par des colonnes générées — sans elles, les requêtes JSON scannent.",
      },
    ],
  },
  {
    id: "utf8mb4",
    title: "Jeux de caractères : utf8mb4",
    level: 3,
    intro:
      "Le piège classique : l'ancien `utf8` de MySQL n'est pas de l'UTF-8.",
    blocks: [
      {
        kind: "text",
        text: "Historiquement, `utf8` en MySQL n'encodait que 3 octets : les caractères sur 4 octets (emojis, certains sinogrammes) étaient rejetés ou corrompus. `utf8mb4` est le vrai UTF-8 complet.",
      },
      {
        kind: "code",
        language: "sql",
        title: "Vérifier et corriger",
        code: "-- Vérifier le charset d'une base et d'une table\nSELECT DEFAULT_CHARACTER_SET_NAME FROM information_schema.SCHEMATA\nWHERE SCHEMA_NAME = 'boutique';\n\n-- Convertir une table existante\nALTER TABLE produits CONVERT TO CHARACTER SET utf8mb4\n  COLLATE utf8mb4_unicode_ci;",
      },
      {
        kind: "list",
        items: [
          "Créer bases et tables en `utf8mb4` dès le départ : la conversion après coup sur de grosses tables est coûteuse.",
          "Aligner toute la chaîne : client, connexion (`SET NAMES utf8mb4`), tables — un maillon en latin1 corrompt le reste.",
          "La collation `utf8mb4_unicode_ci` pour des tris/comparaisons corrects en multilingue.",
        ],
      },
    ],
  },
  {
    id: "vues",
    title: "Vues",
    level: 3,
    intro:
      "Des requêtes nommées et réutilisables : simplifier l'accès sans dupliquer.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Créer une vue",
        code: "CREATE VIEW v_commandes_payees AS\nSELECT c.id, c.date_commande, cl.nom AS client, c.total\nFROM commandes c\nJOIN clients cl ON cl.id = c.client_id\nWHERE c.statut = 'payée';\n\nSELECT * FROM v_commandes_payees WHERE total > 100;",
      },
      {
        kind: "text",
        text: "Une vue est une requête stockée, interrogée comme une table. Usage : simplifier les requêtes récurrentes, exposer un sous-ensemble (colonnes/lignes) à un utilisateur. Limite : une vue n'est pas une optimisation — une vue lente cache une requête lente.",
      },
    ],
  },
  {
    id: "replication",
    title: "Réplication primaire / réplica",
    level: 3,
    intro:
      "Scale-out des lectures et bascule en cas de panne.",
    blocks: [
      {
        kind: "diagram",
        title: "Réplication asynchrone",
        lines: [
          "Application ──► PRIMAIRE (écritures)",
          "  (lectures)        │  binary log",
          "       │            ▼",
          "       └─────► RÉPLICA (lectures)",
          "               (rejoue le binary log, en retard de quelques ms)",
        ],
      },
      {
        kind: "fields",
        title: "Concepts clés",
        fields: [
          {
            label: "GTID",
            value:
              "Identifiants globaux de transaction : chaque transaction a un id unique, ce qui rend la bascule et la reconfiguration fiables (plus de positions de fichiers à jongler). À activer.",
          },
          {
            label: "Réplication asynchrone",
            value:
              "Le primaire ne bloque pas en attendant les réplicas : performant, mais en cas de crash du primaire, les dernières transactions peuvent ne pas être répliquées.",
          },
          {
            label: "Répartition lectures/écritures",
            value:
              "Écritures vers le primaire, lectures vers les réplicas : le pattern standard. L'application (ou un proxy) route en conséquence.",
          },
          {
            label: "Bascule",
            value:
              "Promouvoir un réplica en primaire : opération à tester avant d'en avoir besoin. L'automatisation (orchestrateur) existe mais ajoute de la complexité.",
          },
        ],
      },
    ],
  },
  {
    id: "sauvegardes-strategie",
    title: "Stratégie de sauvegarde",
    level: 3,
    intro:
      "Du dump logique aux sauvegardes physiques : dimensionner selon la taille.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Principe", "Usage"],
        rows: [
          ["`mysqldump`", "Export SQL logique", "Petites/moyennes bases, migrations, développement"],
          ["Sauvegarde physique", "Copie des fichiers InnoDB (outils dédiés)", "Grosses bases : plus rapide, restauration complète"],
          ["Binary log", "Journal de toutes les modifications", "Restauration point-in-time combinée à une sauvegarde complète"],
          ["Snapshots disque", "Copie du volume", "Bases sur VM/cloud : simple et rapide"],
        ],
      },
      {
        kind: "list",
        items: [
          "Automatiser : cron ou équivalent, avec rotation et envoi hors machine.",
          "Tester la restauration : le seul test qui compte, sur un environnement isolé.",
          "Combiner sauvegarde complète régulière + binary log pour une restauration à un instant précis.",
          "Définir RPO/RTO : ils dictent la fréquence et la méthode.",
        ],
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité",
    level: 3,
    intro:
      "Les verrous d'un serveur MySQL en production.",
    blocks: [
      {
        kind: "fields",
        title: "Les couches",
        fields: [
          {
            label: "Comptes",
            value:
              "Moindre privilège : un utilisateur par application, droits limités à sa base. Pas d'accès root distant. Mots de passe solides, rotation.",
          },
          {
            label: "Réseau",
            value:
              "`bind-address` restreint, firewall : seuls les serveurs applicatifs joignent le port 3306. Jamais exposé directement sur internet.",
          },
          {
            label: "TLS",
            value:
              "Chiffrer les connexions (`REQUIRE SSL` par utilisateur) quand le trafic quitte un réseau de confiance.",
          },
          {
            label: "Durcissement",
            value:
              "`mysql_secure_installation` au départ, mises à jour de sécurité suivies, pas de fichiers de dump qui traînent avec des données de prod.",
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
      "Les signaux vitaux d'un serveur MySQL.",
    blocks: [
      {
        kind: "fields",
        title: "À surveiller",
        fields: [
          {
            label: "Requêtes lentes",
            value:
              "Le slow query log : la source n°1 des optimisations. Alerter sur l'apparition de nouvelles requêtes lentes.",
          },
          {
            label: "Connexions",
            value:
              "`Threads_connected` vs `max_connections` : proche de la limite = dimensionnement ou pool à revoir.",
          },
          {
            label: "Buffer pool",
            value:
              "Taux de hit du buffer pool InnoDB : bas = trop peu de RAM allouée ou working set trop grand.",
          },
          {
            label: "Espace disque",
            value:
              "Données + binary logs + slow log : la saturation disque arrête tout, brutalement.",
          },
          {
            label: "Réplication",
            value:
              "Retard du réplica (`Seconds_Behind_Master`) et état du thread SQL : un réplica décroché silently = pas de backup lecture.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging",
    level: 3,
    intro:
      "Les pannes typiques et leur diagnostic.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue de pannes",
        fields: [
          {
            label: "\"Too many connections\"",
            value:
              "Vérifier : pic de trafic ou fuite (connexions non fermées côté appli) ? Augmenter `max_connections` sans corriger la fuite ne fait que repousser.",
          },
          {
            label: "Requête soudainement lente",
            value:
              "Vérifier : `EXPLAIN` — les statistiques sont-elles à jour (`ANALYZE TABLE`) ? Un index a-t-il été supprimé ? Le volume a-t-il franchi un seuil ?",
          },
          {
            label: "Deadlock",
            value:
              "Vérifier : `SHOW ENGINE INNODB STATUS` donne le dernier deadlock. Cause typique : deux transactions qui verrouillent les mêmes lignes dans un ordre différent. Corriger : ordonner les accès, raccourcir les transactions.",
          },
          {
            label: "Réplica en retard",
            value:
              "Vérifier : charge du réplica, requêtes lourdes bloquant le thread SQL, réseau. Un réplica qui ne suit plus n'est plus une sécurité.",
          },
          {
            label: "Caractères corrompus",
            value:
              "Vérifier : charset de la table, de la connexion, du client. Le classique latin1/utf8 mélangé se corrige en alignant toute la chaîne sur utf8mb4.",
          },
        ],
      },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    level: 3,
    intro:
      "Tester avec une vraie base : l'approche qui marche.",
    blocks: [
      {
        kind: "fields",
        title: "Stratégies",
        fields: [
          {
            label: "Base de test dédiée",
            value:
              "Tests d'intégration contre un vrai MySQL (conteneur éphémère) : migrations, requêtes, transactions testées pour de vrai. Reset entre les tests (transactions rollbackées ou re-seed).",
          },
          {
            label: "Migrations versionnées",
            value:
              "Chaque changement de schéma est un script versionné (outil de migration), appliqué dans l'ordre en test comme en prod. Jamais de `ALTER TABLE` manuel en production.",
          },
          {
            label: "Jeux de données représentatifs",
            value:
              "Tester les requêtes sur des volumes réalistes : une requête rapide sur 100 lignes peut être catastrophique sur 10 millions.",
          },
        ],
      },
    ],
  },
  {
    id: "migration-postgresql",
    title: "Migration vers PostgreSQL",
    level: 3,
    intro:
      "Quand le projet l'exige : la méthode sans big bang.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Auditer les différences",
            detail:
              "Recenser ce qui diverge : types (ENUM, JSON), fonctions, auto-incréments vs séquences, guillemets et sensibilités. Chaque différence est un point de conversion.",
          },
          {
            title: "Convertir le schéma",
            detail:
              "Traduire tables, index et contraintes. Tester la conversion sur une copie, pas sur la production.",
          },
          {
            title: "Migrer les données",
            detail:
              "Export/import par lots, avec contrôles de volumétrie et d'intégrité (comptes de lignes, checksums sur échantillons).",
          },
          {
            title: "Adapter l'application",
            detail:
              "Requêtes spécifiques MySQL à réécrire, tests d'intégration au vert sur PostgreSQL.",
          },
          {
            title: "Basculer progressivement",
            detail:
              "Double écriture ou fenêtre de maintenance selon le volume, validation, puis extinction de l'ancien. Prévoir un plan de retour.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques des utilisateurs MySQL.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "UPDATE/DELETE sans WHERE",
            value:
              "Problem : toute la table modifiée ou vidée. Why : oubli ou WHERE mal écrit. Better : SELECT avec le même WHERE d'abord ; transactions pour les opérations en masse.",
          },
          {
            label: "Mot de passe en clair dans la commande",
            value:
              "Problem : `mysql -psecret` reste dans l'historique shell. Why : praticité. Better : `-p` seul (saisie interactive) ou fichier d'options protégé.",
          },
          {
            label: "Tout en root",
            value:
              "Problem : l'application a tous les droits, une injection SQL devient catastrophique. Why : simplicité initiale. Better : utilisateur dédié, droits minimaux.",
          },
          {
            label: "Aucun index sur les clés étrangères",
            value:
              "Problem : jointures et suppressions en cascade lentes. Why : MySQL n'indexe pas automatiquement les FK (contrairement à la PK). Better : indexer chaque colonne de jointure.",
          },
          {
            label: "utf8 au lieu d'utf8mb4",
            value:
              "Problem : emojis et caractères 4 octets rejetés/corrompus. Why : le nom `utf8` est trompeur. Better : utf8mb4 partout, dès la création.",
          },
          {
            label: "SELECT * en production",
            value:
              "Problem : colonnes inutiles transférées, requêtes fragiles aux changements de schéma. Why : paresse. Better : lister explicitement les colonnes nécessaires.",
          },
          {
            label: "Ignorer EXPLAIN",
            value:
              "Problem : requêtes qui s'effondrent avec le volume. Why : 'ça marche en dev'. Better : EXPLAIN systématique sur les nouvelles requêtes touchant des tables volumineuses.",
          },
          {
            label: "Sauvegarde jamais testée",
            value:
              "Problem : dump inutilisable le jour J. Why : on sauvegarde, on ne restaure pas. Better : restauration testée périodiquement.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Des repères de contexte, pas des règles absolues.",
    blocks: [
      {
        kind: "list",
        items: [
          "Moindre privilège : un utilisateur par application, droits limités à sa base.",
          "utf8mb4 dès la création : bases, tables, connexions.",
          "InnoDB partout : pas de MyISAM sur un projet moderne.",
          "Clés étrangères indexées : chaque colonne de jointure a son index.",
          "EXPLAIN avant production : toute requête nouvelle sur table volumineuse.",
          "Transactions pour les écritures liées : le tout-ou-rien, pas des requêtes isolées.",
          "Migrations versionnées : jamais d'ALTER manuel en production.",
          "Sauvegardes automatisées et restaurations testées.",
          "Monitoring : slow log, connexions, disque, réplication.",
          "Ne jamais mettre de secrets dans les commandes : `-p` interactif ou fichiers protégés.",
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
            label: "Base WordPress optimisée",
            value:
              "Audit d'une base WordPress réelle : slow log, index manquants, cache objet. Mesurer le gain avant/après sur des requêtes réelles.",
          },
          {
            label: "Schéma e-commerce complet",
            value:
              "Catalogue, clients, commandes, stocks avec transactions, contraintes d'intégrité et CTE pour le reporting : le relationnel exploité à fond.",
          },
          {
            label: "Haute disponibilité",
            value:
              "Primaire + réplica avec GTID, sauvegardes automatisées, restauration testée, bascule documentée : la production miniature.",
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
          { label: "Documentation MySQL", value: "dev.mysql.com/doc : la référence — manuel, SQL, administration, réplication." },
          { label: "Guide de démarrage", value: "dev.mysql.com/doc/mysql-getting-started : le tutoriel officiel pas à pas." },
          { label: "Référence des types", value: "La page des types de données : choisir le bon type évite des bugs subtils." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : le slow query log et EXPLAIN sur une base réelle — la meilleure école d'optimisation.",
          "Comparaison : la documentation PostgreSQL pour comprendre les différences entre les deux SGBD.",
          "Communauté : Stack Overflow et les forums MySQL pour les cas limites d'administration.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "MySQL maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir le SQL : SQL avancé puis PostgreSQL pour comparer et choisir en connaissance de cause.",
          "Ajouter le cache : Redis pour soulager la base sur les lectures fréquentes.",
          "Industrialiser la donnée : data engineering pour des pipelines d'ingestion robustes.",
          "Revenir à la roadmap : valider MySQL et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "procedures-fonctions",
    title: "Procédures et fonctions stockées",
    level: 3,
    intro:
      "Du code SQL côté serveur : quand la logique appartient à la base.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Procédure stockée",
        code: "DELIMITER //\nCREATE PROCEDURE transferer(\n  IN p_de INT, IN p_vers INT, IN p_montant DECIMAL(10,2)\n)\nBEGIN\n  START TRANSACTION;\n  UPDATE comptes SET solde = solde - p_montant WHERE id = p_de;\n  UPDATE comptes SET solde = solde + p_montant WHERE id = p_vers;\n  COMMIT;\nEND //\nDELIMITER ;\n\nCALL transferer(1, 2, 100.00);",
      },
      {
        kind: "list",
        items: [
          "Procédure : exécute des actions (`CALL`) ; fonction : retourne une valeur, utilisable dans une requête.",
          "Bon usage : logique transactionnelle critique partagée par plusieurs applications.",
          "À doser : trop de logique en base rend le code difficile à versionner et à tester.",
        ],
      },
    ],
  },
  {
    id: "triggers",
    title: "Triggers",
    level: 3,
    intro:
      "Des actions automatiques sur INSERT, UPDATE, DELETE.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Trigger d'audit",
        code: "CREATE TRIGGER avant_maj_produit\nBEFORE UPDATE ON produits\nFOR EACH ROW\nBEGIN\n  INSERT INTO audit_produits(produit_id, ancien_prix, nouveau_prix, date_modif)\n  VALUES (OLD.id, OLD.prix, NEW.prix, NOW());\nEND;",
      },
      {
        kind: "list",
        items: [
          "`OLD` et `NEW` : les valeurs avant/après la modification.",
          "Usage typique : audit, historisation, maintien de compteurs dénormalisés.",
          "Danger : logique invisible qui surprend — documenter chaque trigger et éviter les cascades.",
        ],
      },
    ],
  },
  {
    id: "partitions",
    title: "Partitionnement",
    level: 3,
    intro:
      "Découper une grosse table en morceaux gérables.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Partition par année",
        code: "CREATE TABLE mesures (\n  id INT AUTO_INCREMENT,\n  capteur_id INT,\n  valeur DECIMAL(8,2),\n  date_mesure DATE,\n  PRIMARY KEY (id, date_mesure)\n)\nPARTITION BY RANGE (YEAR(date_mesure)) (\n  PARTITION p2024 VALUES LESS THAN (2025),\n  PARTITION p2025 VALUES LESS THAN (2026),\n  PARTITION pmax VALUES LESS THAN MAXVALUE\n);",
      },
      {
        kind: "text",
        text: "Le partitionnement accélère les requêtes filtrées sur la clé de partition (MySQL ne lit que les partitions concernées : partition pruning) et simplifie la purge des vieilles données (`ALTER TABLE … DROP PARTITION`).",
      },
    ],
  },
  {
    id: "haute-disponibilite",
    title: "Haute disponibilité",
    level: 3,
    intro:
      "Réplication et bascule : survivre à la panne d'un serveur.",
    blocks: [
      {
        kind: "diagram",
        title: "Réplication primaire / réplica",
        lines: [
          "APPLICATION",
          "   ├─ écritures ─► PRIMAIRE",
          "   └─ lectures ──► REPLICA (optionnel)",
          "",
          "PRIMAIRE ── binlog ──► REPLICA",
          "",
          "Le réplica rejoue le journal binaire du primaire.",
          "En cas de panne : promouvoir le réplica en primaire",
          "(manuel ou via un orchestrateur).",
        ],
      },
      {
        kind: "list",
        items: [
          "La réplication MySQL est asynchrone par défaut : un léger retard est possible sur le réplica.",
          "Group Replication (MySQL 8) offre une réplication multi-primaire avec consensus.",
          "Sauvegardes : `mysqldump` pour les petites bases, Percona XtraBackup pour les grosses sans verrou.",
        ],
      },
    ],
  },
];

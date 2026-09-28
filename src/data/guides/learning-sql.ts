import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de SQL et des bases de données relationnelles :
 * de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : SQL standard d'abord, différences PostgreSQL / MySQL / SQLite
 * signalées explicitement, aucun SGBD présenté comme supérieur.
 */
export const LEARNING_SQL: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est une base de données relationnelle et pourquoi SQL est resté le langage des données depuis 50 ans.",
    blocks: [
      {
        kind: "text",
        text: "Une base de données relationnelle stocke les données dans des tables : des grilles où chaque ligne est un enregistrement (un client, une commande) et chaque colonne un attribut (nom, email, prix). Les tables sont reliées entre elles par des clés : par exemple, la table `commandes` contient une colonne `client_id` qui pointe vers la ligne correspondante de la table `clients`. C'est cette organisation en relations qui donne son nom au modèle.",
      },
      {
        kind: "text",
        text: "SQL (Structured Query Language) est le langage standard pour dialoguer avec ces bases : interroger (`SELECT`), ajouter (`INSERT`), modifier (`UPDATE`), supprimer (`DELETE`) et définir la structure (`CREATE TABLE`). Il est déclaratif : vous décrivez le résultat voulu (« les clients de Paris triés par nom »), pas comment l'obtenir — le moteur optimise l'exécution. Créé dans les années 1970 chez IBM, normalisé par l'ISO, SQL reste le langage de données le plus utilisé au monde : presque chaque application sérieuse (site web, banque, logistique, application mobile) repose dessus.",
      },
      {
        kind: "fields",
        title: "SQL en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "SQL est le langage déclaratif universel pour stocker, interroger et protéger des données structurées.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Avant les SGBD relationnels, les données vivaient dans des fichiers plats : doublons, incohérences, aucun contrôle d'accès, requêtes écrites à la main. Le modèle relationnel apporte structure, intégrité (impossible d'avoir une commande sans client) et un langage unique d'interrogation.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Données structurées avec relations : utilisateurs, commandes, inventaires, comptabilité, réservations. Pour des documents sans schéma fixe ou des données massivement distribuées, d'autres modèles (document, clé-valeur) peuvent convenir — mais la base relationnelle reste le choix par défaut.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "SQL n'est pas un langage de programmation généraliste (pas de boucles natives portables) et une base de données n'est pas un simple fichier : c'est un serveur qui gère accès concurrents, transactions, sauvegardes et sécurité.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : tables, lignes, requêtes",
    level: 1,
    intro:
      "La seule image à garder en tête : votre application parle SQL à un serveur qui garde les tables cohérentes.",
    blocks: [
      {
        kind: "diagram",
        title: "Le circuit d'une requête, en une image",
        lines: [
          "Application (votre code)",
          "     │  envoie du SQL : « SELECT nom FROM clients WHERE ville = 'Paris' »",
          "     ▼",
          "SGBD — Système de Gestion de Base de Données",
          "     │  (PostgreSQL, MySQL, SQLite…)",
          "     ├── 1. Analyse la requête (syntaxe, droits d'accès)",
          "     ├── 2. L'optimiseur choisit le plan le plus rapide (index ? parcours ?)",
          "     ├── 3. Exécute en respectant les transactions et verrous",
          "     │",
          "     ▼",
          "Tables sur disque (données + index)",
          "     │",
          "     ▼",
          "Résultat : un tableau de lignes renvoyé à l'application",
        ],
      },
      {
        kind: "text",
        text: "Trois acteurs à ne jamais confondre : le langage (SQL, quasi identique partout), le serveur (PostgreSQL, MySQL… qui exécute le SQL et stocke les données) et le client (l'outil en ligne de commande `psql` ou `mysql`, ou votre application, qui envoie le SQL au serveur). SQLite est le cas particulier : pas de serveur, la base est un simple fichier manipulé par une bibliothèque.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Table",
            value:
              "Une collection de lignes de même forme : `clients(id, nom, email, ville)`. Pensez feuille de calcul, en rigoureux.",
          },
          {
            label: "Ligne (row)",
            value:
              "Un enregistrement : `(1, 'Aina', 'aina@exemple.mg', 'Antananarivo')`. Chaque ligne d'une table a les mêmes colonnes.",
          },
          {
            label: "Colonne",
            value:
              "Un attribut typé : `email` est du texte, `prix` un nombre. Le type est déclaré à la création et enforced par le SGBD.",
          },
          {
            label: "Clé",
            value:
              "Une colonne (ou groupe) qui identifie : la clé primaire identifie chaque ligne de façon unique, la clé étrangère pointe vers la clé primaire d'une autre table.",
          },
          {
            label: "Requête",
            value:
              "Une phrase SQL qui lit ou modifie les données. Le résultat d'un `SELECT` est lui-même une table temporaire de lignes.",
          },
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
      "Ce qu'il faut savoir avant de toucher à une base de données — et ce qui peut attendre.",
    blocks: [
      {
        kind: "text",
        text: "Bonne nouvelle : SQL ne demande aucun langage de programmation. Les vrais prérequis sont ailleurs : être à l'aise avec un terminal (naviguer, lancer une commande), comprendre l'idée de types (texte vs nombre vs date) et accepter la rigueur du modèle — une base refuse les données incohérentes, c'est sa qualité première. Si vous venez du développement web, vous brancherez SQL à votre langage ensuite (Python, JavaScript, PHP…) ; mais le SQL lui-même s'apprend seul, directement dans le client en ligne de commande.",
      },
      {
        kind: "list",
        items: [
          "Terminal : ouvrir un shell, exécuter une commande, lire un message d'erreur.",
          "Notion de types : distinguer une chaîne `'Paris'`, un nombre `42` et une date `'2026-09-28'`.",
          "Rigueur : une colonne déclarée `NOT NULL` refusera une valeur manquante — c'est voulu.",
          "Peut attendre : l'administration serveur, la réplication, l'optimisation fine des requêtes.",
        ],
      },
    ],
  },
  {
    id: "installation-postgresql",
    title: "Installer PostgreSQL",
    level: 2,
    intro:
      "PostgreSQL est un SGBD open source complet, client-serveur : il tourne comme un service et on s'y connecte en réseau (même en local).",
    blocks: [
      {
        kind: "fields",
        title: "PostgreSQL en bref",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le SGBD relationnel open source le plus complet : SQL standard strict, types avancés, extensible.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Projet applicatif sérieux, besoin d'intégrité forte, types avancés (JSON, tableaux, géospatial via PostGIS), apprentissage approfondi du SQL.",
          },
          {
            label: "Port par défaut",
            value: "`5432`. Le client `psql` et le serveur communiquent via ce port en local.",
          },
        ],
      },
      {
        kind: "command",
        label: "Installer sur Debian / Ubuntu",
        command: "sudo apt update && sudo apt install postgresql postgresql-contrib",
        why: "Installe le serveur PostgreSQL et les utilitaires (`psql`, `pg_dump`). Le service démarre automatiquement après l'installation.",
        verify: "psql --version",
      },
      {
        kind: "command",
        label: "Installer sur Fedora / RHEL",
        command: "sudo dnf install postgresql-server postgresql-contrib",
        why: "Sur les distributions Red Hat, le paquet serveur s'appelle `postgresql-server` ; il faut ensuite initialiser et démarrer le service.",
        verify: "psql --version",
      },
      {
        kind: "command",
        label: "Installer sur macOS (Homebrew)",
        command: "brew install postgresql",
        why: "Homebrew compile et installe PostgreSQL avec `psql` inclus. Pensez ensuite à démarrer le service.",
        verify: "psql --version",
      },
      {
        kind: "command",
        label: "Démarrer le service (Linux)",
        command: "sudo systemctl start postgresql",
        why: "Le serveur doit tourner pour accepter les connexions. `enable` (au lieu de `start`) l'active au démarrage de la machine.",
        verify: "sudo systemctl status postgresql",
      },
      {
        kind: "text",
        text: "Sur Windows, téléchargez l'installateur officiel depuis la page de téléchargement de postgresql.org (section Windows, maintenue par EDB) : l'assistant installe le serveur, `psql` et l'outil graphique pgAdmin. Retenez le mot de passe du super-utilisateur `postgres` demandé pendant l'installation.",
      },
      {
        kind: "command",
        label: "Se connecter en super-utilisateur (Linux)",
        command: "sudo -u postgres psql",
        why: "L'installation crée un rôle système `postgres`. Cette commande ouvre `psql` avec ce rôle pour créer votre premier utilisateur et votre première base.",
        verify: "Le prompt affiche postgres=#",
      },
    ],
  },
  {
    id: "installation-mysql",
    title: "Installer MySQL",
    level: 2,
    intro:
      "MySQL est un SGBD open source client-serveur très répandu dans l'écosystème web (WordPress, PHP, hébergements mutualisés).",
    blocks: [
      {
        kind: "fields",
        title: "MySQL en bref",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le SGBD open source historique du web : simple à déployer, très présent chez les hébergeurs.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Application web classique, CMS (WordPress, Drupal), hébergement mutualisé imposant MySQL/MariaDB, besoin de réplication simple.",
          },
          {
            label: "Port par défaut",
            value: "`3306`. Le client `mysql` s'y connecte en local ou à distance.",
          },
        ],
      },
      {
        kind: "command",
        label: "Installer sur Debian / Ubuntu",
        command: "sudo apt update && sudo apt install mysql-server",
        why: "Installe le serveur MySQL et le client en ligne de commande `mysql`. Le service démarre automatiquement.",
        verify: "mysql --version",
      },
      {
        kind: "command",
        label: "Installer sur Fedora / RHEL",
        command: "sudo dnf install mysql-server",
        why: "Sur Red Hat, le paquet s'appelle `mysql-server` ; démarrez ensuite le service avec `systemctl`.",
        verify: "mysql --version",
      },
      {
        kind: "command",
        label: "Installer sur macOS (Homebrew)",
        command: "brew install mysql",
        why: "Installe le serveur et le client `mysql`. Démarrez le service avec `brew services start mysql`.",
        verify: "mysql --version",
      },
      {
        kind: "command",
        label: "Sécuriser l'installation",
        command: "sudo mysql_secure_installation",
        why: "Script interactif qui définit le mot de passe root, supprime les utilisateurs anonymes et la base de test. À lancer une fois après l'installation.",
      },
      {
        kind: "text",
        text: "Sur Windows, utilisez MySQL Installer depuis dev.mysql.com/downloads/installer : il installe le serveur, le client et MySQL Workbench (interface graphique). Note : MariaDB est un fork communautaire de MySQL, quasi compatible — les commandes ci-dessous fonctionnent à l'identique sur les deux.",
      },
      {
        kind: "command",
        label: "Se connecter au serveur",
        command: "mysql -u root -p",
        why: "`-u root` choisit l'utilisateur, `-p` demande le mot de passe de façon interactive (ne jamais l'écrire en clair dans la commande, il resterait dans l'historique du shell).",
        verify: "Le prompt affiche mysql>",
      },
    ],
  },
  {
    id: "installation-sqlite",
    title: "Installer SQLite",
    level: 2,
    intro:
      "SQLite n'est pas un serveur : c'est une bibliothèque qui stocke toute la base dans un simple fichier. Zéro configuration.",
    blocks: [
      {
        kind: "fields",
        title: "SQLite en bref",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une base SQL complète dans un seul fichier, sans serveur ni installation : la base la plus déployée au monde (téléphones, navigateurs, applications).",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Apprendre SQL, prototyper, application locale ou embarquée, tests automatisés, petits sites à faible trafic. Pas de gestion d'utilisateurs ni d'accès réseau concurrents massifs.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Pas un serveur : pas de port, pas d'utilisateurs, pas de `GRANT`. Si un autre processus écrit pendant que vous lisez, c'est le verrou du fichier qui arbitre.",
          },
        ],
      },
      {
        kind: "text",
        text: "Sur macOS et la plupart des Linux, `sqlite3` est déjà installé. Sinon, un paquet suffit — et sur Windows, il suffit de télécharger l'archive « sqlite-tools » depuis sqlite.org/download.html et de dézipper l'exécutable.",
      },
      {
        kind: "command",
        label: "Installer l'outil en ligne de commande (Debian / Ubuntu)",
        command: "sudo apt install sqlite3",
        why: "Installe uniquement le shell `sqlite3` : la bibliothèque elle-même est déjà présente sur quasiment tous les systèmes.",
        verify: "sqlite3 --version",
      },
      {
        kind: "command",
        label: "Créer (ou ouvrir) une base",
        command: "sqlite3 ma-premiere-base.db",
        why: "Si le fichier n'existe pas, SQLite le crée à la première écriture. Vous entrez dans le shell interactif, prêt à créer des tables.",
        verify: "Le prompt affiche sqlite>",
      },
    ],
  },
  {
    id: "clients-ligne-commande",
    title: "Les clients : psql, mysql, sqlite3",
    level: 2,
    intro:
      "Chaque SGBD fournit un client en ligne de commande. C'est l'outil d'apprentissage n° 1 : direct, sans interface à deviner.",
    blocks: [
      {
        kind: "text",
        text: "Un client SQL fait deux choses : il envoie vos requêtes au serveur (ou au fichier, pour SQLite) et affiche les résultats en tableau texte. Les trois clients partagent la même logique — taper du SQL terminé par `;` — mais chacun a ses méta-commandes propres (qui commencent par `\\` ou `.` et ne sont pas du SQL).",
      },
      {
        kind: "table",
        headers: ["Action", "psql (PostgreSQL)", "mysql (MySQL)", "sqlite3 (SQLite)"],
        rows: [
          ["Lister les bases", "`\\l`", "`SHOW DATABASES;`", "`.databases`"],
          ["Choisir une base", "`\\c ma_base`", "`USE ma_base;`", "(ouvrir le bon fichier)"],
          ["Lister les tables", "`\\dt`", "`SHOW TABLES;`", "`.tables`"],
          ["Décrire une table", "`\\d clients`", "`DESCRIBE clients;`", "`.schema clients`"],
          ["Quitter", "`\\q`", "`exit`", "`.quit`"],
        ],
      },
      {
        kind: "command",
        label: "Lister les bases (PostgreSQL)",
        command: "psql -U postgres -c \"\\l\"",
        why: "`-c` exécute une seule commande puis quitte : pratique pour un contrôle rapide sans entrer dans le shell interactif. `\\l` est une méta-commande psql, pas du SQL.",
        verify: "La liste inclut les bases postgres, template0, template1",
      },
      {
        kind: "command",
        label: "Lister les bases (MySQL)",
        command: "mysql -u root -p -e \"SHOW DATABASES;\"",
        why: "`-e` joue le même rôle que `-c` de psql : exécuter puis quitter. Ici la commande est du vrai SQL, car le client mysql n'a pas de méta-commande équivalente.",
      },
      {
        kind: "command",
        label: "Ouvrir le shell SQLite avec en-têtes de colonnes",
        command: "sqlite3 -header -column ma-premiere-base.db",
        why: "Par défaut sqlite3 affiche les résultats sans en-têtes ni alignement. Ces deux options rendent la sortie lisible comme un vrai tableau.",
        verify: "Le prompt sqlite> s'affiche",
      },
      {
        kind: "text",
        text: "Bonne pratique : apprenez d'abord le client en ligne de commande, même si vous utiliserez ensuite un outil graphique. Quand quelque chose casse en production, c'est `psql` ou `mysql` que vous aurez sous la main, pas une interface.",
      },
    ],
  },
  {
    id: "premier-schema",
    title: "Premier schéma : créer une base et des tables",
    level: 2,
    intro:
      "Le rituel de démarrage : créer une base de test, deux tables reliées, y insérer des lignes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer une base de test",
            detail:
              "Dans psql : `CREATE DATABASE boutique;` puis `\\c boutique`. Dans mysql : `CREATE DATABASE boutique;` puis `USE boutique;`. Dans sqlite3 : vous êtes déjà « dans » le fichier ouvert.",
          },
          {
            title: "Créer la table clients",
            detail:
              "`CREATE TABLE clients (id SERIAL PRIMARY KEY, nom TEXT NOT NULL, email TEXT UNIQUE NOT NULL, ville TEXT);` — sur MySQL remplacez `SERIAL` par `INT AUTO_INCREMENT`, sur SQLite par `INTEGER PRIMARY KEY AUTOINCREMENT`.",
          },
          {
            title: "Créer la table commandes, reliée aux clients",
            detail:
              "`CREATE TABLE commandes (id SERIAL PRIMARY KEY, client_id INTEGER NOT NULL REFERENCES clients(id), montant NUMERIC(10,2) NOT NULL, cree_le DATE DEFAULT CURRENT_DATE);` — `REFERENCES` crée la clé étrangère.",
          },
          {
            title: "Insérer des clients",
            detail:
              "`INSERT INTO clients (nom, email, ville) VALUES ('Aina', 'aina@exemple.mg', 'Antananarivo'), ('Lova', 'lova@exemple.mg', 'Toamasina');` — deux lignes d'un coup.",
          },
          {
            title: "Insérer des commandes",
            detail:
              "`INSERT INTO commandes (client_id, montant) VALUES (1, 25000.00), (1, 12000.00), (2, 8000.00);` — les `client_id` 1 et 2 doivent exister, sinon la clé étrangère refuse.",
          },
          {
            title: "Vérifier",
            detail:
              "`SELECT * FROM clients;` puis `SELECT * FROM commandes;` — vous devez voir vos lignes. En cas d'erreur de clé étrangère, relisez l'étape 4 : l'ordre d'insertion compte.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ce mini-schéma contient déjà 80 % des idées du relationnel : des tables typées, une clé primaire qui identifie, une clé étrangère qui relie, des contraintes (`NOT NULL`, `UNIQUE`) qui protègent. Tout le reste de cette page n'est qu'un approfondissement de ces six étapes.",
      },
    ],
  },
  {
    id: "premier-select",
    title: "Premier SELECT : lire les données",
    level: 2,
    intro:
      "SELECT est la requête que vous écrirez le plus : filtrer, trier, limiter.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Les quatre clauses essentielles",
        code: "SELECT nom, email, ville\nFROM clients\nWHERE ville = 'Antananarivo'\nORDER BY nom ASC\nLIMIT 10;",
      },
      {
        kind: "fields",
        title: "Anatomie d'un SELECT",
        fields: [
          {
            label: "SELECT …",
            value:
              "Les colonnes à afficher. `*` signifie « toutes », pratique en exploration, à éviter en production (voir la section performance).",
          },
          {
            label: "FROM …",
            value: "La table interrogée. Toute requête lit au moins une table (ou une vue).",
          },
          {
            label: "WHERE …",
            value:
              "Le filtre : seules les lignes vérifiant la condition sont renvoyées. Sans `WHERE`, toute la table est lue.",
          },
          {
            label: "ORDER BY …",
            value:
              "Le tri : `ASC` croissant (défaut), `DESC` décroissant. Sans `ORDER BY`, l'ordre des lignes n'est PAS garanti.",
          },
          {
            label: "LIMIT …",
            value:
              "Le nombre maximum de lignes. Indispensable en exploration pour ne pas inonder le terminal sur une grosse table.",
          },
        ],
      },
      {
        kind: "code",
        language: "sql",
        title: "Filtres courants du WHERE",
        code: "-- Comparaisons et logique\nSELECT * FROM commandes WHERE montant > 10000 AND cree_le >= '2026-01-01';\n\n-- Recherche de texte (sensible à la casse en standard)\nSELECT * FROM clients WHERE nom LIKE 'A%';\n\n-- Appartenance à une liste\nSELECT * FROM clients WHERE ville IN ('Antananarivo', 'Toamasina');\n\n-- Valeur manquante : toujours IS NULL, jamais = NULL\nSELECT * FROM clients WHERE ville IS NULL;",
      },
      {
        kind: "text",
        text: "Deux pièges classiques dès le premier jour : `= NULL` ne fonctionne jamais — une comparaison avec `NULL` vaut `NULL`, pas vrai, donc la ligne est exclue ; il faut `IS NULL`. Et sans `ORDER BY`, deux exécutions de la même requête peuvent renvoyer les lignes dans un ordre différent : ne supposez jamais un ordre implicite.",
      },
    ],
  },
  {
    id: "outils-editeurs",
    title: "Outils : clients graphiques et éditeurs",
    level: 2,
    intro:
      "Le terminal suffit pour apprendre, mais au quotidien un bon client graphique change la vie.",
    blocks: [
      {
        kind: "fields",
        title: "Les outils, par profil",
        fields: [
          {
            label: "DBeaver",
            value:
              "Client universel open source (PostgreSQL, MySQL, SQLite et des dizaines d'autres). Éditeur SQL avec autocomplétion, visualisation du schéma, export CSV. Le choix par défaut quand on ne sait pas quoi prendre.",
          },
          {
            label: "pgAdmin",
            value:
              "L'outil officiel de PostgreSQL : administration du serveur, tableau de bord, éditeur de requêtes. Livré avec l'installateur Windows.",
          },
          {
            label: "MySQL Workbench",
            value:
              "L'outil officiel de MySQL : modélisation visuelle du schéma (diagrammes entité-relation), administration, éditeur SQL.",
          },
          {
            label: "DataGrip",
            value:
              "Client SQL payant de JetBrains : refactoring SQL, navigation dans le schéma, inspections. Pour qui vit déjà dans l'écosystème JetBrains.",
          },
          {
            label: "Extensions VS Code",
            value:
              "« SQLTools » (multi-SGBD, gratuit) ou les extensions officielles par base : exécuter des requêtes et parcourir les tables sans quitter l'éditeur.",
          },
          {
            label: "DB Browser for SQLite",
            value:
              "Petit outil gratuit dédié à SQLite : ouvrir un fichier `.db`, parcourir et éditer visuellement. Parfait avec SQLite.",
          },
        ],
      },
      {
        kind: "text",
        text: "Aucun de ces outils n'est universellement meilleur : DBeaver couvre tout gratuitement, les outils officiels (pgAdmin, Workbench) vont plus loin dans l'administration de leur SGBD, DataGrip brille si vous payez déjà JetBrains. Critère de choix honnête : les bases que vous utilisez vraiment, et si vous administrez des serveurs ou écrivez juste des requêtes.",
      },
    ],
  },
  {
    id: "scripts-sql-fichiers",
    title: "Écrire des scripts .sql",
    level: 2,
    intro:
      "En vrai projet, le SQL ne se tape pas à la main : il vit dans des fichiers versionnés.",
    blocks: [
      {
        kind: "text",
        text: "Dès que vous dépassez l'exploration, écrivez vos requêtes dans des fichiers `.sql` : ils sont relisibles, versionnés avec Git, rejouables et partageables. Chaque SGBD sait exécuter un fichier d'un coup.",
      },
      {
        kind: "command",
        label: "Exécuter un script (PostgreSQL)",
        command: "psql -U postgres -d boutique -f schema.sql",
        why: "`-f` lit le fichier et exécute chaque ordre SQL dans l'ordre. C'est ainsi qu'on applique un schéma sur un nouveau serveur.",
        verify: "psql -U postgres -d boutique -c \"\\dt\"",
      },
      {
        kind: "command",
        label: "Exécuter un script (MySQL)",
        command: "mysql -u root -p boutique < schema.sql",
        why: "La redirection `<` envoie le contenu du fichier dans le client `mysql`. Le nom de la base après les options sélectionne le contexte.",
      },
      {
        kind: "command",
        label: "Exécuter un script (SQLite)",
        command: "sqlite3 boutique.db < schema.sql",
        why: "Même principe : le fichier est lu et exécuté contre le fichier de base indiqué en argument.",
        verify: "sqlite3 boutique.db \".tables\"",
      },
      {
        kind: "text",
        text: "Convention : un fichier par intention — `schema.sql` pour la structure, `seed.sql` pour les données de test, puis un fichier par migration (`001_ajout_colonne.sql`). En équipe, ces fichiers sont appliqués par un outil de migration (Flyway, Alembic, Prisma Migrate…) plutôt qu'à la main.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien avec une base",
    level: 2,
    intro:
      "À quoi ressemble une journée normale quand on travaille avec SQL.",
    blocks: [
      {
        kind: "diagram",
        title: "La boucle de travail typique",
        lines: [
          "1. Explorer   → SELECT … LIMIT 20 sur les tables, \\d / DESCRIBE pour le schéma",
          "2. Écrire     → requête dans un fichier .sql, testée dans le client",
          "3. Vérifier   → EXPLAIN pour les requêtes lentes, relecture du WHERE",
          "4. Versionner → git add requete.sql (migrations numérotées en équipe)",
          "5. Appliquer  → psql -f / migration tool sur la base de dev, puis staging, puis prod",
          "6. Sauvegarder→ pg_dump / mysqldump régulier, test de restauration",
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : ne touchez jamais à la production depuis un client interactif sans filet. Les `UPDATE` et `DELETE` se testent d'abord en `SELECT` (même `WHERE`), de préférence dans une transaction avec `ROLLBACK` pour vérifier avant de valider — voir la section transactions.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "types-de-donnees",
    title: "Les types de données",
    level: 3,
    intro:
      "Chaque colonne a un type, et le SGBD le fait respecter : choisir le bon type, c'est choisir la justesse des données.",
    blocks: [
      {
        kind: "table",
        headers: ["Usage", "PostgreSQL", "MySQL", "SQLite"],
        rows: [
          ["Entier", "`INTEGER` / `BIGINT`", "`INT` / `BIGINT`", "`INTEGER`"],
          ["Texte court", "`VARCHAR(n)`", "`VARCHAR(n)`", "`TEXT`"],
          ["Texte long", "`TEXT`", "`TEXT`", "`TEXT`"],
          ["Vrai / faux", "`BOOLEAN`", "`TINYINT(1)` (booléen émulé)", "`INTEGER` (0/1)"],
          ["Décimal exact (prix)", "`NUMERIC(10,2)`", "`DECIMAL(10,2)`", "`NUMERIC`"],
          ["Date / moment", "`DATE`, `TIMESTAMPTZ`", "`DATE`, `DATETIME`, `TIMESTAMP`", "`TEXT` ou `INTEGER`"],
          ["Auto-incrément", "`SERIAL` / `GENERATED … AS IDENTITY`", "`INT AUTO_INCREMENT`", "`INTEGER PRIMARY KEY AUTOINCREMENT`"],
        ],
      },
      {
        kind: "fields",
        title: "Règles de choix",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le type déclare ce que la colonne peut contenir ; le SGBD rejette le reste, ce qui élimine toute une classe de bugs.",
          },
          {
            label: "Prix et monnaie",
            value:
              "Toujours un type décimal exact (`NUMERIC`/`DECIMAL`), jamais un flottant : `0.1 + 0.2` ne vaut pas exactement `0.3` en flottant, et en comptabilité c'est inacceptable.",
          },
          {
            label: "TEXT vs VARCHAR(n)",
            value:
              "Sur PostgreSQL et SQLite, `TEXT` sans limite est le choix simple ; la limite `VARCHAR(255)` n'est utile que si la longueur fait partie de la règle métier (ex. code postal). Sur MySQL, `VARCHAR` exige une longueur.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Stocker des dates en texte libre (`'28/09/2026'`) : les tris deviennent alphabétiques, les calculs impossibles. Utilisez le type date du SGBD.",
          },
          {
            label: "Bonne pratique",
            value:
              "Le type le plus précis possible : `DATE` pour un jour, `BOOLEAN` pour un drapeau, `NUMERIC` pour l'argent. La base devient une documentation exécutable.",
          },
        ],
      },
    ],
  },
  {
    id: "contraintes-colonnes",
    title: "Les contraintes : NOT NULL, UNIQUE, CHECK, DEFAULT",
    level: 3,
    intro:
      "Les contraintes sont des règles que la base fait respecter à chaque écriture : la qualité des données par construction.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Quatre contraintes sur une table produits",
        code: "CREATE TABLE produits (\n  id SERIAL PRIMARY KEY,\n  nom TEXT NOT NULL,\n  reference TEXT UNIQUE NOT NULL,\n  prix NUMERIC(10,2) NOT NULL CHECK (prix >= 0),\n  stock INTEGER NOT NULL DEFAULT 0\n);",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "NOT NULL",
            value:
              "La colonne doit toujours avoir une valeur. Sans elle, `NULL` (l'absence de valeur) est autorisé — source de surprises dans les calculs et les jointures.",
          },
          {
            label: "UNIQUE",
            value:
              "Deux lignes ne peuvent pas partager la même valeur (emails, références). La base crée un index pour le vérifier efficacement.",
          },
          {
            label: "CHECK",
            value:
              "Une condition SQL que chaque ligne doit satisfaire (`prix >= 0`, `quantite BETWEEN 1 AND 100`). La règle métier vit dans la base, pas seulement dans le code.",
          },
          {
            label: "DEFAULT",
            value:
              "Valeur utilisée quand l'`INSERT` ne précise pas la colonne (`stock` vaut `0` si omis). Évite les `NULL` involontaires.",
          },
          {
            label: "Pourquoi",
            value:
              "Une contrainte rejette la donnée invalide au plus près du stockage : aucun bug applicatif, aucun script oublié ne peut corrompre la base. C'est la dernière ligne de défense, et la plus fiable.",
          },
          {
            label: "Bonne pratique",
            value:
              "Mettez les règles d'intégrité dans la base (contraintes), les règles de présentation dans l'application. Une base bien contrainte survit à cinq réécritures d'application.",
          },
        ],
      },
    ],
  },
  {
    id: "cle-primaire",
    title: "La clé primaire",
    level: 3,
    intro:
      "Chaque table a besoin d'un identifiant unique et stable : c'est la clé primaire.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "La clé primaire est la colonne (ou le groupe de colonnes) qui identifie chaque ligne de façon unique : jamais `NULL`, jamais deux fois la même valeur.",
          },
          {
            label: "Pourquoi",
            value:
              "Sans identifiant unique, impossible de désigner une ligne précisément (`UPDATE`/`DELETE` ciblés), et les clés étrangères n'ont rien vers quoi pointer. C'est le socle de tout le modèle relationnel.",
          },
          {
            label: "Clé artificielle vs naturelle",
            value:
              "Une clé artificielle (`id` auto-incrémenté) ne change jamais et ne porte aucun sens métier : c'est le choix par défaut. Une clé naturelle (email, numéro de sécu) peut changer ou poser des problèmes de confidentialité — à réserver aux cas où le métier l'exige vraiment.",
          },
          {
            label: "Comment (les trois SGBD)",
            value:
              "PostgreSQL : `id SERIAL PRIMARY KEY` (ou `GENERATED ALWAYS AS IDENTITY`). MySQL : `id INT AUTO_INCREMENT PRIMARY KEY`. SQLite : `id INTEGER PRIMARY KEY AUTOINCREMENT`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier la clé primaire sur une table de liaison ou un import : doublons silencieux, suppressions impossibles à cibler, performances en chute.",
          },
          {
            label: "Concepts liés",
            value: "Clés étrangères, index (une clé primaire crée automatiquement un index unique), UUID comme alternative.",
          },
        ],
      },
    ],
  },
  {
    id: "cle-etrangere",
    title: "Les clés étrangères",
    level: 3,
    intro:
      "La clé étrangère relie les tables et interdit les données orphelines : pas de commande sans client.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Déclarer une clé étrangère",
        code: "CREATE TABLE commandes (\n  id SERIAL PRIMARY KEY,\n  client_id INTEGER NOT NULL REFERENCES clients(id),\n  montant NUMERIC(10,2) NOT NULL\n);\n\n-- Variante explicite avec comportement à la suppression\nCREATE TABLE adresses (\n  id SERIAL PRIMARY KEY,\n  client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,\n  libelle TEXT NOT NULL\n);",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une clé étrangère garantit que chaque valeur de `commandes.client_id` correspond à une ligne existante de `clients(id)`.",
          },
          {
            label: "Pourquoi",
            value:
              "Sans elle, rien n'empêche d'insérer une commande pour le client 999 qui n'existe pas — puis les rapports affichent des lignes fantômes. La base refuse l'incohérence au lieu de la découvrir six mois plus tard.",
          },
          {
            label: "ON DELETE CASCADE",
            value:
              "Supprimer un client supprime automatiquement ses adresses. À manier avec précaution : puissant, mais une suppression accidentelle se propage. L'alternative sûre par défaut est `ON DELETE RESTRICT` (refuse la suppression tant que des lignes pointent vers elle).",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Toujours, pour chaque relation entre tables. Une base sans clés étrangères n'est qu'un ensemble de fichiers CSV coûteux.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Sur MySQL, utiliser le moteur MyISAM (qui ignore silencieusement les clés étrangères) au lieu d'InnoDB : les `REFERENCES` sont acceptées mais jamais appliquées. Vérifiez le moteur de vos tables.",
          },
          {
            label: "Bonne pratique",
            value:
              "Nommez la colonne comme la cible (`client_id` → `clients.id`) : le schéma se lit sans documentation.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "L'intégrité référentielle en une image",
        lines: [
          "clients                    commandes",
          "┌────┬──────┐              ┌────┬───────────┬─────────┐",
          "│ id │ nom  │              │ id │ client_id │ montant │",
          "├────┼──────┤              ├────┼───────────┼─────────┤",
          "│  1 │ Aina │◄─────────────│ 10 │     1     │ 25000   │",
          "│  2 │ Lova │◄──────┐      │ 11 │     1     │ 12000   │",
          "└────┴──────┘       └──────│ 12 │     2     │  8000   │",
          "                         └────┴───────────┴─────────┘",
          "INSERT avec client_id = 99 → REFUSÉ (aucun client 99)",
          "DELETE du client 1 → REFUSÉ tant que ses commandes existent",
        ],
      },
    ],
  },
  {
    id: "normalisation",
    title: "La normalisation : organiser sans doublons",
    level: 3,
    intro:
      "La normalisation est l'art de découper les tables pour ne jamais stocker deux fois la même information.",
    blocks: [
      {
        kind: "text",
        text: "Le problème : si le nom et l'adresse du client sont recopiés dans chaque ligne de `commandes`, une correction d'adresse exige de mettre à jour dix lignes — et l'oubli d'une seule crée une incohérence. La solution : une table `clients`, une table `commandes`, reliées par clé étrangère. Chaque fait est stocké une fois, à un seul endroit.",
      },
      {
        kind: "fields",
        title: "Les trois premières formes normales, en une phrase chacune",
        fields: [
          {
            label: "1NF",
            value:
              "Chaque case contient une valeur atomique : pas de liste « pain, lait, œufs » dans une seule colonne, une ligne par élément.",
          },
          {
            label: "2NF",
            value:
              "Chaque colonne dépend de toute la clé : dans une table `lignes_commande(commande_id, produit_id, …)`, le nom du produit dépend de `produit_id` seul → il va dans `produits`.",
          },
          {
            label: "3NF",
            value:
              "Aucune dépendance transitive : si `ville` détermine `code_postal` et que `code_postal` dépend du client, la ville ne doit pas être stockée avec le client mais déduite.",
          },
          {
            label: "Quand s'arrêter",
            value:
              "La 3NF est la cible usuelle. Au-delà (BCNF, 4NF…), les gains sont rares pour les applications courantes — à connaître de nom, pas à appliquer systématiquement.",
          },
          {
            label: "Quand dénormaliser",
            value:
              "En lecture intensive (reporting, tableaux de bord), dupliquer volontairement une colonne évite des jointures coûteuses. C'est un choix conscient, documenté, pas un oubli de conception.",
          },
        ],
      },
    ],
  },
  {
    id: "select-fondamentaux",
    title: "SELECT : DISTINCT, alias et expressions",
    level: 3,
    intro:
      "Au-delà des bases : dédupliquer, renommer et calculer dans la requête elle-même.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "DISTINCT, alias, expressions",
        code: "-- Villes distinctes des clients (sans doublons)\nSELECT DISTINCT ville FROM clients;\n\n-- Alias de colonnes et de tables : lisibilité\nSELECT c.nom AS client, c.ville AS ville_client\nFROM clients AS c;\n\n-- Calculer dans la requête\nSELECT nom, prix, prix * 1.2 AS prix_ttc\nFROM produits;\n\n-- Concaténer (opérateur standard || ; CONCAT() sur MySQL)\nSELECT nom || ' (' || ville || ')' AS etiquette\nFROM clients;",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "DISTINCT",
            value:
              "Élimine les doublons du résultat. Attention : `SELECT DISTINCT a, b` déduplique les paires, pas chaque colonne séparément.",
          },
          {
            label: "Alias (AS)",
            value:
              "Renomme une colonne ou une table pour la requête. Indispensable en auto-jointure et pour les colonnes calculées ; le `AS` est optionnel mais explicite.",
          },
          {
            label: "Expressions",
            value:
              "Le `SELECT` peut calculer : arithmétique, concaténation, fonctions. Mieux vaut un calcul dans la requête que dix lignes de code applicatif pour la même chose.",
          },
          {
            label: "Différence MySQL",
            value:
              "MySQL n'implémente pas l'opérateur `||` (il signifie OU logique) : utilisez `CONCAT(a, b)`. PostgreSQL et SQLite supportent les deux.",
          },
          {
            label: "Bonne pratique",
            value:
              "Nommez explicitement les colonnes calculées avec `AS` : un résultat avec une colonne `?column?` est un bug d'interface en attente.",
          },
        ],
      },
    ],
  },
  {
    id: "where-operateurs",
    title: "WHERE : tous les opérateurs",
    level: 3,
    intro:
      "Le filtre est le cœur de la requête : maîtriser ses opérateurs, c'est maîtriser l'interrogation.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "L'arsenal du WHERE",
        code: "-- Comparaisons\nSELECT * FROM produits WHERE prix >= 100 AND prix < 500;\n\n-- Motifs de texte : % = n'importe quoi, _ = un caractère\nSELECT * FROM clients WHERE email LIKE '%@exemple.mg';\n\n-- Insensible à la casse (PostgreSQL uniquement)\nSELECT * FROM clients WHERE nom ILIKE 'aina';\n\n-- Intervalles et listes\nSELECT * FROM commandes WHERE cree_le BETWEEN '2026-01-01' AND '2026-12-31';\nSELECT * FROM clients WHERE ville IN ('Antananarivo', 'Toamasina', 'Mahajanga');\n\n-- Tester l'absence de valeur\nSELECT * FROM clients WHERE telephone IS NULL;\n\n-- Négations\nSELECT * FROM produits WHERE NOT (prix < 10);\nSELECT * FROM clients WHERE ville NOT IN ('Antananarivo');",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "LIKE",
            value:
              "`%` remplace n'importe quelle suite de caractères, `_` un seul caractère. `LIKE 'A%'` : commence par A. sensible à la casse en standard.",
          },
          {
            label: "ILIKE",
            value:
              "Variante PostgreSQL insensible à la casse. Sur MySQL, `LIKE` est déjà insensible à la casse avec les collations usuelles ; sur SQLite, `LIKE` est insensible à la casse pour l'ASCII.",
          },
          {
            label: "BETWEEN",
            value:
              "Inclut les bornes : `BETWEEN 1 AND 10` vaut `>= 1 AND <= 10`. Avec les dates, méfiance : `BETWEEN '2026-01-01' AND '2026-01-31'` exclut le 31 janvier à 15h si la colonne contient l'heure.",
          },
          {
            label: "IS NULL",
            value:
              "`NULL` n'est ni égal ni différent de quoi que ce soit : `= NULL` est toujours faux. On teste avec `IS NULL` / `IS NOT NULL`, point.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`WHERE NOT ville IN (…)` avec un `NULL` dans la liste : le `NOT IN` contenant un `NULL` ne renvoie… rien du tout. Préférez `NOT EXISTS` ou filtrez les `NULL`.",
          },
        ],
      },
    ],
  },
  {
    id: "tri-pagination",
    title: "Tri et pagination : ORDER BY, LIMIT, OFFSET",
    level: 3,
    intro:
      "Trier de façon déterministe et paginer sans piéger les performances.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Tri multi-critères et pagination",
        code: "-- Tri : ville croissante, puis montant décroissant\nSELECT * FROM clients c\nJOIN commandes o ON o.client_id = c.id\nORDER BY c.ville ASC, o.montant DESC;\n\n-- Page 3 avec 20 éléments par page\nSELECT * FROM produits\nORDER BY id\nLIMIT 20 OFFSET 40;",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Tri déterministe",
            value:
              "Si deux lignes ont la même valeur triée, leur ordre relatif est arbitraire. Ajoutez toujours la clé primaire en dernier critère (`ORDER BY cree_le DESC, id DESC`) pour un ordre stable entre deux pages.",
          },
          {
            label: "OFFSET",
            value:
              "`OFFSET 40` saute 40 lignes : simple, mais le serveur lit quand même ces 40 lignes. Sur des millions de lignes, la page 10 000 devient lente.",
          },
          {
            label: "Alternative : pagination par clé",
            value:
              "`WHERE id > 1000 ORDER BY id LIMIT 20` : on repart du dernier id vu, sans `OFFSET`. Bien plus rapide sur les gros volumes ; exige un tri sur une colonne unique et ordonnée.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Paginer sans `ORDER BY` : les lignes « sautent » d'une page à l'autre entre deux requêtes. Le `LIMIT`/`OFFSET` sans tri est un bug, pas une fonctionnalité.",
          },
          {
            label: "Syntaxe MySQL",
            value:
              "MySQL accepte aussi `LIMIT 40, 20` (offset d'abord, puis le nombre) — source classique de confusion ; préférez la forme `LIMIT … OFFSET …`, portable.",
          },
        ],
      },
    ],
  },
  {
    id: "agregation",
    title: "Les fonctions d'agrégation",
    level: 3,
    intro:
      "Compter, sommer, moyenner : réduire des milliers de lignes en quelques chiffres.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Les cinq agrégats essentiels",
        code: "SELECT\n  COUNT(*)        AS nb_commandes,\n  COUNT(telephone)  AS nb_avec_telephone,\n  SUM(montant)      AS chiffre_affaires,\n  AVG(montant)      AS panier_moyen,\n  MIN(montant)      AS plus_petite,\n  MAX(montant)      AS plus_grande\nFROM commandes;",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une fonction d'agrégation prend un ensemble de lignes et renvoie une seule valeur.",
          },
          {
            label: "COUNT(*) vs COUNT(colonne)",
            value:
              "`COUNT(*)` compte les lignes, y compris celles où des colonnes sont `NULL`. `COUNT(telephone)` ne compte que les lignes où `telephone` n'est pas `NULL`. Confondre les deux fausse les statistiques.",
          },
          {
            label: "NULL et les agrégats",
            value:
              "`SUM`, `AVG`, `MIN`, `MAX` ignorent les `NULL`. `AVG` d'une colonne à moitié vide moyenne donc sur les valeurs renseignées — ce qui est généralement ce qu'on veut, à condition de le savoir.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Tableaux de bord, rapports, statistiques : chaque fois qu'on veut « combien / combien en moyenne / quel total » plutôt que le détail des lignes.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mélanger colonne simple et agrégat sans `GROUP BY` : `SELECT ville, COUNT(*) FROM clients` est invalide — quelle ville afficher pour le total ? Voir la section suivante.",
          },
        ],
      },
    ],
  },
  {
    id: "group-by-having",
    title: "GROUP BY et HAVING",
    level: 3,
    intro:
      "Agréger par groupe (par ville, par mois) puis filtrer sur le résultat de l'agrégation.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Chiffre d'affaires par ville, villes à plus de 50 000",
        code: "SELECT c.ville, COUNT(*) AS nb_commandes, SUM(o.montant) AS total\nFROM clients c\nJOIN commandes o ON o.client_id = c.id\nGROUP BY c.ville\nHAVING SUM(o.montant) > 50000\nORDER BY total DESC;",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "GROUP BY",
            value:
              "Découpe les lignes en groupes (ici par ville) et applique les agrégats à chaque groupe. Toute colonne du `SELECT` non agrégée doit figurer dans le `GROUP BY` (PostgreSQL l'exige strictement).",
          },
          {
            label: "HAVING",
            value:
              "Le `WHERE` des groupes : il filtre après l'agrégation. `WHERE montant > 50000` filtrerait les commandes individuelles avant de sommer — sens totalement différent.",
          },
          {
            label: "Ordre logique d'exécution",
            value:
              "`FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY`. Le SQL s'écrit dans un ordre, s'exécute dans un autre : c'est pourquoi `WHERE` ne peut pas utiliser un alias défini dans le `SELECT`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Filtrer un agrégat avec `WHERE` : `WHERE SUM(montant) > 50000` est une erreur de syntaxe. Agrégat → `HAVING`, ligne individuelle → `WHERE`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Sur PostgreSQL, vous pouvez grouper par la clé primaire et sélectionner d'autres colonnes de la même table — le moteur sait qu'elles sont fonctionnellement dépendantes.",
          },
        ],
      },
    ],
  },
  {
    id: "jointure-inner",
    title: "INNER JOIN : l'intersection",
    level: 3,
    intro:
      "La jointure interne ne garde que les lignes qui correspondent des deux côtés.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Commandes avec le nom du client",
        code: "SELECT c.nom, o.montant, o.cree_le\nFROM commandes o\nINNER JOIN clients c ON o.client_id = c.id;",
      },
      {
        kind: "diagram",
        title: "INNER JOIN en une image",
        lines: [
          "clients (A)          commandes (B)",
          "┌───────────┐        ┌───────────────┐",
          "│ Aina (1)  │◄───────│ cmd 10 → cl.1  │",
          "│ Lova (2)  │◄──┐    │ cmd 11 → cl.1  │",
          "│ Nirina (3)│   └───►│ cmd 12 → cl.2  │",
          "└───────────┘        └───────────────┘",
          "INNER JOIN : 3 lignes (10, 11, 12)",
          "Nirina (3) n'a aucune commande → EXCLUE du résultat",
          "Une commande vers un client inexistant → impossible (clé étrangère)",
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`INNER JOIN` associe chaque ligne de gauche à la ligne correspondante de droite via la condition `ON`, et ne garde que les paires qui matchent.",
          },
          {
            label: "Pourquoi",
            value:
              "Les données sont éclatées en tables (normalisation) : la jointure les réassemble à la lecture. C'est l'opération la plus courante du SQL.",
          },
          {
            label: "Le mot INNER est optionnel",
            value:
              "`JOIN` seul signifie `INNER JOIN`. L'écrire en entier au début aide à distinguer des autres types de jointures.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier le `ON` : sans condition, chaque ligne de gauche se combine avec chaque ligne de droite (produit cartésien). 1 000 clients × 10 000 commandes = 10 millions de lignes.",
          },
        ],
      },
    ],
  },
  {
    id: "jointure-left-right",
    title: "LEFT JOIN et RIGHT JOIN : garder un côté",
    level: 3,
    intro:
      "Quand on veut toutes les lignes d'une table, même celles sans correspondance.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Tous les clients, avec ou sans commandes",
        code: "-- Tous les clients ; NULL quand il n'y a pas de commande\nSELECT c.nom, o.montant\nFROM clients c\nLEFT JOIN commandes o ON o.client_id = c.id;\n\n-- Les clients SANS commande (le cas d'usage roi du LEFT JOIN)\nSELECT c.nom\nFROM clients c\nLEFT JOIN commandes o ON o.client_id = c.id\nWHERE o.id IS NULL;",
      },
      {
        kind: "diagram",
        title: "LEFT JOIN en une image",
        lines: [
          "FROM clients c LEFT JOIN commandes o",
          "",
          "┌────────┬─────────┐",
          "│ nom    │ montant │",
          "├────────┼─────────┤",
          "│ Aina   │ 25000   │",
          "│ Aina   │ 12000   │",
          "│ Lova   │  8000   │",
          "│ Nirina │ NULL    │  ← gardée grâce au LEFT",
          "└────────┴─────────┘",
          "Toutes les lignes de GAUCHE (clients) sont conservées ;",
          "les colonnes de droite valent NULL quand rien ne matche.",
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "LEFT JOIN",
            value:
              "Garde toutes les lignes de la table de gauche (`FROM`), complète avec `NULL` à droite quand il n'y a pas de correspondance. Le type de jointure le plus utile après l'inner.",
          },
          {
            label: "RIGHT JOIN",
            value:
              "L'exact miroir : garde toutes les lignes de droite. Rarement utilisé — on préfère inverser l'ordre des tables et garder un `LEFT JOIN`, plus lisible.",
          },
          {
            label: "Trouver les orphelins",
            value:
              "`LEFT JOIN … WHERE droite.id IS NULL` : le motif standard pour « les clients sans commande », « les produits jamais vendus ».",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mettre un filtre sur la table de droite dans le `WHERE` après un `LEFT JOIN` (`WHERE o.montant > 100`) : les lignes à `NULL` sont éliminées et le `LEFT JOIN` se comporte comme un `INNER`. Filtrez dans le `ON` si vous voulez garder les `NULL`.",
          },
        ],
      },
    ],
  },
  {
    id: "jointures-pieges",
    title: "Jointures : les pièges classiques",
    level: 3,
    intro:
      "Trois erreurs qui produisent des résultats faux sans lever d'erreur — les plus dangereuses.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Le produit cartésien accidentel",
            value:
              "Un `JOIN` sans `ON` (ou avec une condition toujours vraie) multiplie les lignes. Symptôme : un `COUNT` explosé après l'ajout d'une jointure. Réflexe : vérifier le nombre de lignes avant/après chaque jointure ajoutée.",
          },
          {
            label: "La jointure qui duplique",
            value:
              "Joindre une table où la clé n'est pas unique du côté joint (ex. joindre `commandes` sur `ville` au lieu de `client_id`) : chaque ligne se duplique autant de fois qu'il y a de correspondances, et les `SUM` sont faussés. Ne joignez que sur des clés.",
          },
          {
            label: "Les NULL dans les jointures",
            value:
              "`NULL = NULL` n'est jamais vrai : deux lignes avec une clé `NULL` ne se joindront jamais. Si la colonne de jointure peut être `NULL`, ces lignes disparaissent silencieusement du résultat.",
          },
          {
            label: "Bonne pratique",
            value:
              "Après toute requête avec jointures et agrégats, contrôlez les totaux sur un petit jeu de données connu : si le `SUM` ne colle pas, une jointure duplique.",
          },
        ],
      },
    ],
  },
  {
    id: "sous-requetes",
    title: "Les sous-requêtes",
    level: 3,
    intro:
      "Une requête dans une requête : filtrer ou calculer à partir d'un résultat intermédiaire.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Trois positions possibles",
        code: "-- Dans le WHERE : clients ayant passé au moins une commande > 20000\nSELECT nom FROM clients\nWHERE id IN (SELECT client_id FROM commandes WHERE montant > 20000);\n\n-- Dans le FROM : agréger puis joindre (sous-requête = table temporaire)\nSELECT c.nom, stats.total\nFROM clients c\nJOIN (SELECT client_id, SUM(montant) AS total\n      FROM commandes GROUP BY client_id) AS stats\n  ON stats.client_id = c.id;\n\n-- Dans le SELECT : une valeur calculée par ligne (corrélée)\nSELECT nom,\n  (SELECT COUNT(*) FROM commandes o WHERE o.client_id = c.id) AS nb_commandes\nFROM clients c;",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une sous-requête est un `SELECT` entre parenthèses utilisé comme valeur, comme liste ou comme table par la requête englobante.",
          },
          {
            label: "Sous-requête corrélée",
            value:
              "Quand la sous-requête référence la requête externe (`o.client_id = c.id`), elle s'exécute une fois par ligne : lisible, mais potentiellement lent sur de gros volumes.",
          },
          {
            label: "EXISTS vs IN",
            value:
              "`WHERE EXISTS (SELECT 1 FROM …)` s'arrête dès qu'une ligne matche et gère proprement les `NULL` ; `IN` avec un `NULL` dans la liste a le piège vu plus haut. En cas de doute, `EXISTS`.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Filtres « les X qui ont des Y », calculs intermédiaires réutilisés une fois. Pour les requêtes imbriquées complexes, les CTE sont plus lisibles (section suivante).",
          },
        ],
      },
    ],
  },
  {
    id: "cte",
    title: "Les CTE (WITH) : des requêtes lisibles",
    level: 3,
    intro:
      "Nommer les étapes intermédiaires pour écrire des requêtes complexes qui restent lisibles.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "WITH : découper en étapes nommées",
        code: "WITH\n  gros_clients AS (\n    SELECT client_id, SUM(montant) AS total\n    FROM commandes\n    GROUP BY client_id\n    HAVING SUM(montant) > 20000\n  ),\n  avec_ville AS (\n    SELECT g.total, c.nom, c.ville\n    FROM gros_clients g\n    JOIN clients c ON c.id = g.client_id\n  )\nSELECT ville, COUNT(*) AS nb_gros_clients, AVG(total) AS panier_moyen\nFROM avec_ville\nGROUP BY ville;",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une CTE (`WITH nom AS (SELECT …)`) définit une table temporaire nommée, utilisable ensuite comme une vraie table dans la requête.",
          },
          {
            label: "Pourquoi",
            value:
              "Une requête à trois niveaux d'imbrication devient illisible ; découpée en CTE nommées (`gros_clients`, `avec_ville`), elle se lit comme une recette, étape par étape. Chaque CTE se teste indépendamment.",
          },
          {
            label: "CTE récursive",
            value:
              "Avec `WITH RECURSIVE`, une CTE peut se référencer elle-même : le moyen standard de parcourir des hiérarchies (organigramme, catégories imbriquées). Supportée par PostgreSQL, MySQL 8+, SQLite.",
          },
          {
            label: "Performance",
            value:
              "Sur PostgreSQL, une CTE est une barrière d'optimisation (le planificateur l'exécute telle quelle) : pour les très grosses tables, une sous-requête dans le `FROM` laisse parfois plus de liberté à l'optimiseur. Mesurez avec `EXPLAIN`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Dès qu'une requête dépasse deux niveaux d'imbrication ou qu'une sous-requête est réutilisée deux fois, passez en CTE.",
          },
        ],
      },
    ],
  },
  {
    id: "insert-avance",
    title: "INSERT avancé : RETURNING et conflits",
    level: 3,
    intro:
      "Insérer malin : récupérer l'id créé et gérer les doublons sans deux requêtes.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Insertion multiple, RETURNING, gestion des conflits",
        code: "-- Insérer plusieurs lignes et récupérer les ids créés (PostgreSQL, SQLite)\nINSERT INTO clients (nom, email, ville)\nVALUES ('Vola', 'vola@exemple.mg', 'Antsirabe'),\n       ('Tovo', 'tovo@exemple.mg', 'Fianarantsoa')\nRETURNING id, nom;\n\n-- Ignorer silencieusement si l'email existe déjà (PostgreSQL, SQLite)\nINSERT INTO clients (nom, email, ville)\nVALUES ('Aina', 'aina@exemple.mg', 'Antananarivo')\nON CONFLICT (email) DO NOTHING;\n\n-- Équivalent MySQL : ignorer ou mettre à jour\nINSERT IGNORE INTO clients (nom, email, ville)\nVALUES ('Aina', 'aina@exemple.mg', 'Antananarivo');",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "RETURNING",
            value:
              "Renvoie les lignes insérées (souvent l'`id` auto-généré) sans une seconde requête `SELECT`. Supporté par PostgreSQL et SQLite ; sur MySQL, utilisez `LAST_INSERT_ID()` après l'insertion.",
          },
          {
            label: "ON CONFLICT",
            value:
              "Gère la violation d'unicité : `DO NOTHING` ignore, `DO UPDATE SET …` met à jour la ligne existante (upsert). Indispensable pour les imports idempotents rejoués plusieurs fois.",
          },
          {
            label: "Pourquoi",
            value:
              "Le motif « vérifier si ça existe, puis insérer » en deux requêtes crée une course : deux processus peuvent insérer le même email entre le test et l'insertion. La contrainte `UNIQUE` + `ON CONFLICT` rend l'opération atomique.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`ON CONFLICT` sans préciser la cible (`(email)`) quand plusieurs contraintes uniques existent : la base ne sait pas quel conflit gérer et lève une erreur.",
          },
        ],
      },
    ],
  },
  {
    id: "update-delete-securise",
    title: "UPDATE et DELETE sans catastrophe",
    level: 3,
    intro:
      "Modifier et supprimer : les deux requêtes les plus dangereuses, et le rituel qui les rend sûres.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Le rituel : SELECT d'abord, transaction ensuite",
        code: "-- 1. Écrire le WHERE en SELECT : quelles lignes seront touchées ?\nSELECT * FROM produits WHERE stock = 0 AND prix < 100;\n\n-- 2. Le même WHERE en UPDATE, dans une transaction\nBEGIN;\nUPDATE produits SET prix = prix * 1.1 WHERE stock = 0 AND prix < 100;\n-- 3. Vérifier le nombre de lignes affectées, puis...\nROLLBACK;  -- ...annuler pour vérifier, ou COMMIT; pour valider",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Le danger",
            value:
              "Un `UPDATE` ou `DELETE` sans `WHERE` touche toute la table : `DELETE FROM clients;` vide la table en une phrase. Aucune corbeille, aucune confirmation.",
          },
          {
            label: "Le rituel",
            value:
              "Toujours : 1) écrire le filtre en `SELECT` pour voir les lignes concernées, 2) exécuter la modification dans une transaction (`BEGIN`), 3) contrôler le compteur de lignes affectées, 4) `COMMIT` ou `ROLLBACK`. Sur un doute, `ROLLBACK`.",
          },
          {
            label: "Pourquoi la transaction aide",
            value:
              "Tant que vous n'avez pas fait `COMMIT`, `ROLLBACK` annule tout : c'est un « aperçu avant validation » intégré au SGBD.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le `WHERE` sur la mauvaise colonne (`WHERE id = 10` au lieu de `WHERE commande_id = 10`) : la requête réussit, le compteur de lignes semble normal, mais ce sont les mauvaises lignes. D'où l'étape `SELECT` préalable.",
          },
          {
            label: "Bonne pratique",
            value:
              "En production : jamais d'écriture manuelle sans sauvegarde récente, jamais sans le rituel. Les suppressions définitives sont souvent remplacées par une colonne `supprime_le` (suppression logique).",
          },
        ],
      },
    ],
  },
  {
    id: "alter-table-migrations",
    title: "Faire évoluer le schéma : ALTER TABLE et migrations",
    level: 3,
    intro:
      "Un schéma n'est jamais figé : ajouter une colonne, renommer, sans perdre les données.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Les ALTER les plus courants",
        code: "-- Ajouter une colonne (avec défaut pour les lignes existantes)\nALTER TABLE clients ADD COLUMN telephone TEXT;\n\n-- Renommer une colonne\nALTER TABLE clients RENAME COLUMN telephone TO tel_mobile;\n\n-- Changer le type (PostgreSQL : avec conversion explicite si besoin)\nALTER TABLE produits ALTER COLUMN prix TYPE NUMERIC(12,2);\n\n-- Ajouter une contrainte après coup\nALTER TABLE commandes ADD CONSTRAINT montant_positif CHECK (montant > 0);\n\n-- Supprimer une colonne (irréversible : la donnée est perdue)\nALTER TABLE clients DROP COLUMN tel_mobile;",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`ALTER TABLE` modifie la structure d'une table existante sans toucher aux lignes — sauf `DROP COLUMN`, qui détruit la donnée.",
          },
          {
            label: "Les migrations",
            value:
              "En équipe, chaque changement de schéma est un fichier versionné et numéroté (`003_ajout_telephone.sql`), appliqué dans l'ordre par un outil (Flyway, Alembic, Prisma Migrate, Django migrations…). On ne modifie jamais la prod « à la main » sans passer par ce circuit.",
          },
          {
            label: "Ajouter NOT NULL sur une table pleine",
            value:
              "En deux temps : 1) `ADD COLUMN …` nullable + `UPDATE` pour remplir, 2) `ALTER COLUMN … SET NOT NULL`. En une seule fois, les lignes existantes violeraient la contrainte.",
          },
          {
            label: "SQLite et ALTER",
            value:
              "SQLite ne supporte historiquement qu'un sous-ensemble d'`ALTER TABLE` (ajout/renommage de colonne, renommage de table). Les restructurations lourdes passent par : créer la nouvelle table, copier, supprimer l'ancienne, renommer.",
          },
          {
            label: "Bonne pratique",
            value:
              "Chaque migration doit être rejouable et réversible dans la mesure du possible ; testez-la sur une copie de la base avant la production.",
          },
        ],
      },
    ],
  },
  {
    id: "index",
    title: "Les index : quand et pourquoi",
    level: 3,
    intro:
      "Un index accélère les recherches comme l'index d'un livre : sans lui, le SGBD lit tout.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Créer et inspecter un index",
        code: "-- Accélérer les recherches par email\nCREATE INDEX idx_clients_email ON clients(email);\n\n-- Index composite : l'ordre des colonnes compte\nCREATE INDEX idx_commandes_client_date ON commandes(client_id, cree_le);\n\n-- Voir les index d'une table (PostgreSQL)\n-- psql : \\d clients",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un index est une structure triée à part qui permet de trouver des lignes sans balayer toute la table — au prix d'un coût à chaque écriture.",
          },
          {
            label: "Pourquoi",
            value:
              "Sans index, `WHERE email = '…'` sur un million de clients lit un million de lignes (parcours séquentiel). Avec l'index, le SGBD saute directement aux bonnes lignes : de plusieurs secondes à quelques millisecondes.",
          },
          {
            label: "Quand en créer",
            value:
              "Sur les colonnes de `WHERE`, `JOIN` (`client_id` !) et `ORDER BY` fréquents. Les clés primaires et contraintes `UNIQUE` créent déjà un index automatiquement : ne les dupliquez pas.",
          },
          {
            label: "Le coût",
            value:
              "Chaque `INSERT`/`UPDATE`/`DELETE` doit maintenir les index : trop d'index ralentissent les écritures et gonflent la base. Indexer, c'est arbitrer entre vitesse de lecture et vitesse d'écriture.",
          },
          {
            label: "Index composite",
            value:
              "`(client_id, cree_le)` sert les requêtes filtrant sur `client_id` seul, ou sur les deux — mais pas celles filtrant uniquement sur `cree_le`. L'ordre des colonnes suit l'ordre des filtres les plus fréquents.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Indexer chaque colonne « au cas où » : les écritures s'effondrent et certains index ne servent jamais. Mesurez d'abord avec `EXPLAIN` (section suivante).",
          },
        ],
      },
    ],
  },
  {
    id: "explain-analyse",
    title: "EXPLAIN : comprendre ce que fait vraiment une requête",
    level: 3,
    intro:
      "EXPLAIN montre le plan d'exécution choisi par l'optimiseur : l'outil n° 1 du diagnostic de lenteur.",
    blocks: [
      {
        kind: "command",
        label: "Afficher le plan d'une requête (PostgreSQL)",
        command: "psql -U postgres -d boutique -c \"EXPLAIN ANALYZE SELECT * FROM clients WHERE email = 'aina@exemple.mg';\"",
        why: "`EXPLAIN` affiche le plan prévu, `ANALYZE` exécute réellement la requête et donne les temps mesurés. C'est la différence entre la théorie et la pratique.",
        verify: "La sortie contient « Index Scan » si l'index est utilisé, « Seq Scan » sinon",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Lire le plan",
            value:
              "Cherchez `Seq Scan on clients` (balayage complet : normal sur une petite table, suspect sur une grosse) vs `Index Scan using idx_clients_email` (utilisation de l'index). `cost=` est une estimation, `actual time=` la mesure réelle avec `ANALYZE`.",
          },
          {
            label: "Équivalents",
            value:
              "MySQL : `EXPLAIN ANALYZE SELECT …` (MySQL 8.0.18+) ou `EXPLAIN` simple. SQLite : `EXPLAIN QUERY PLAN SELECT …`.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès qu'une requête dépasse quelques centaines de millisecondes, ou avant de créer un index « au hasard » : `EXPLAIN` dit si l'index servira.",
          },
          {
            label: "Bonne pratique",
            value:
              "Testez sur des volumes représentatifs : un plan parfait sur 100 lignes de test peut être catastrophique sur 10 millions de lignes de production.",
          },
        ],
      },
    ],
  },
  {
    id: "transactions-acid",
    title: "Les transactions : ACID",
    level: 3,
    intro:
      "Regrouper plusieurs écritures en une opération tout-ou-rien : le cœur de la fiabilité des bases.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Un virement : deux écritures, une transaction",
        code: "BEGIN;\n\nUPDATE comptes SET solde = solde - 50000 WHERE id = 1;\nUPDATE comptes SET solde = solde + 50000 WHERE id = 2;\n\nCOMMIT;  -- les deux écritures sont validées ensemble\n-- En cas de problème avant COMMIT : ROLLBACK; annule tout",
      },
      {
        kind: "fields",
        title: "ACID, en une phrase par lettre",
        fields: [
          {
            label: "Atomicité",
            value:
              "Tout ou rien : si le second `UPDATE` échoue, le premier est annulé. Jamais d'argent débité sans être crédité.",
          },
          {
            label: "Cohérence",
            value:
              "La base passe d'un état valide à un autre : les contraintes sont vérifiées à la fin de la transaction.",
          },
          {
            label: "Isolation",
            value:
              "Les transactions concurrentes ne se voient pas mutuellement à moitié : chacune travaille comme si elle était seule (voir niveaux d'isolation).",
          },
          {
            label: "Durabilité",
            value:
              "Une fois `COMMIT` renvoyé, la donnée survit même à un crash serveur : elle est écrite durablement avant l'accusé de réception.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès qu'une opération métier = plusieurs écritures liées (commande + lignes + stock, virement débit + crédit). Une seule écriture isolée est déjà atomique par nature.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `COMMIT` dans un client interactif : la transaction reste ouverte, verrouille des lignes, et les autres sessions semblent « bloquées ». Symptôme typique d'un `psql` laissé en plan.",
          },
        ],
      },
    ],
  },
  {
    id: "niveaux-isolation",
    title: "Niveaux d'isolation : la concurrence sous contrôle",
    level: 3,
    intro:
      "Que voit une transaction des modifications des autres ? Quatre niveaux, un compromis justesse/performance.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Garantie", "Défaut sur"],
        rows: [
          ["`READ UNCOMMITTED`", "Lit même les données non validées (lectures sales possibles)", "— (rarement utilisé tel quel)"],
          ["`READ COMMITTED`", "Ne lit que les données validées ; une relecture peut voir du nouveau", "PostgreSQL"],
          ["`REPEATABLE READ`", "Les relectures dans la transaction voient les mêmes données", "MySQL / InnoDB"],
          ["`SERIALIZABLE`", "Comme si les transactions s'exécutaient une par une ; le plus sûr, le plus strict", "— (sur demande)"],
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le niveau d'isolation règle ce qu'une transaction peut observer des autres : plus il est élevé, plus la justesse est garantie, plus les conflits (et les attentes) augmentent.",
          },
          {
            label: "Le cas concret",
            value:
              "Deux admins décrémentent le même stock simultanément. En `READ COMMITTED`, le second écrase le premier sans le voir (mise à jour perdue) sauf si la requête est atomique (`SET stock = stock - 1`) ou verrouillée (`SELECT … FOR UPDATE`).",
          },
          {
            label: "Quand s'en soucier",
            value:
              "Compteurs, stocks, soldes, réservations : toute donnée modifiée par plusieurs sessions à la fois. Pour du simple CRUD mono-utilisateur, le défaut suffit.",
          },
          {
            label: "Bonne pratique",
            value:
              "Gardez les transactions courtes : ouvrir, écrire, valider. Une transaction ouverte longtemps retient des verrous et fait attendre les autres.",
          },
        ],
      },
      {
        kind: "code",
        language: "sql",
        title: "Verrouiller une ligne avant de la modifier",
        code: "BEGIN;\n-- Verrouille la ligne du produit jusqu'au COMMIT : les autres attendent\nSELECT stock FROM produits WHERE id = 5 FOR UPDATE;\nUPDATE produits SET stock = stock - 1 WHERE id = 5;\nCOMMIT;",
      },
    ],
  },
  {
    id: "vues",
    title: "Les vues : des requêtes déguisées en tables",
    level: 3,
    intro:
      "Enregistrer une requête complexe sous un nom et l'interroger comme une table.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Créer et utiliser une vue",
        code: "CREATE VIEW chiffre_par_ville AS\nSELECT c.ville, COUNT(*) AS nb_commandes, SUM(o.montant) AS total\nFROM clients c\nJOIN commandes o ON o.client_id = c.id\nGROUP BY c.ville;\n\n-- Puis, simplement :\nSELECT * FROM chiffre_par_ville WHERE total > 50000;\n\n-- Supprimer la vue (les tables sont intactes)\nDROP VIEW chiffre_par_ville;",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une vue est une requête `SELECT` sauvegardée : à chaque interrogation, le SGBD réexécute la requête sous-jacente sur les données à jour.",
          },
          {
            label: "Pourquoi",
            value:
              "Factoriser les requêtes complexes réutilisées (reporting), offrir une interface stable aux applications pendant que le schéma évolue, restreindre les colonnes visibles pour certains utilisateurs (sécurité).",
          },
          {
            label: "Vues matérialisées",
            value:
              "PostgreSQL propose les vues matérialisées : le résultat est stocké et rafraîchi sur demande (`REFRESH MATERIALIZED VIEW`) — rapide en lecture, données potentiellement datées. MySQL et SQLite ne les ont pas en natif.",
          },
          {
            label: "Limites",
            value:
              "Une vue ne se met pas à jour toute seule plus vite qu'une requête : c'est du confort, pas de la performance. Et on ne peut pas toujours y faire `INSERT`/`UPDATE` (vues simples seulement, sous conditions).",
          },
        ],
      },
    ],
  },
  {
    id: "sauvegardes",
    title: "Les sauvegardes : pg_dump, mysqldump et le reste",
    level: 3,
    intro:
      "Une base sans sauvegarde testée est une base déjà perdue : les outils et le rituel.",
    blocks: [
      {
        kind: "command",
        label: "Sauvegarder (PostgreSQL)",
        command: "pg_dump -U postgres boutique > boutique-2026-09-28.sql",
        why: "`pg_dump` exporte le schéma et les données en ordres SQL rejouables. Le fichier obtenu se restaure avec `psql`. Datez vos fichiers pour retrouver la bonne version.",
        verify: "ls -lh boutique-2026-09-28.sql",
      },
      {
        kind: "command",
        label: "Restaurer (PostgreSQL)",
        command: "psql -U postgres -d boutique_restauree < boutique-2026-09-28.sql",
        why: "Rejoue le fichier SQL dans une base (idéalement neuve pour un test). Une sauvegarde jamais restaurée est une hypothèse, pas une sauvegarde.",
      },
      {
        kind: "command",
        label: "Sauvegarder (MySQL)",
        command: "mysqldump -u root -p boutique > boutique-2026-09-28.sql",
        why: "L'équivalent MySQL de `pg_dump` : export SQL complet. La restauration se fait avec `mysql -u root -p boutique < fichier.sql`.",
      },
      {
        kind: "command",
        label: "Sauvegarder (SQLite)",
        command: "sqlite3 boutique.db \".backup 'boutique-sauvegarde.db'\"",
        why: "La commande `.backup` copie la base proprement même pendant son utilisation — préférable à une simple copie du fichier, qui pourrait être prise en pleine écriture.",
        verify: "ls -lh boutique-sauvegarde.db",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Le rituel",
            value:
              "Sauvegarde automatique et régulière (quotidienne au minimum en production), copie hors du serveur (un disque qui meurt emporte la base ET sa sauvegarde locale), et surtout : test de restauration périodique sur une machine à part.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Découvrir le jour du crash que les sauvegardes tournaient à vide depuis six mois (disque plein, mot de passe expiré). Surveillez la taille et la date du dernier fichier.",
          },
          {
            label: "Bonne pratique",
            value:
              "Documentez la procédure de restauration en une page : en incident, personne n'a le temps de la réinventer.",
          },
        ],
      },
    ],
  },
  {
    id: "injection-sql",
    title: "Injection SQL : la faille n° 1 et sa parade",
    level: 3,
    intro:
      "Comprendre le mécanisme de l'injection pour ne jamais l'introduire — uniquement sous l'angle défensif.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "L'injection SQL survient quand une entrée utilisateur est concaténée dans une requête : l'attaquant ne « casse » pas la base, il lui fait exécuter du SQL qu'elle croit légitime.",
          },
          {
            label: "Le mécanisme",
            value:
              "Requête construite par concaténation : `SELECT * FROM users WHERE nom = '` + saisie + `'` . Si la saisie contient un guillemet suivi de SQL, la structure de la requête change : la saisie devient du code. C'est une confusion entre données et instructions.",
          },
          {
            label: "La parade : requêtes paramétrées",
            value:
              "Ne jamais concaténer : passer les valeurs comme paramètres séparés. Le SGBD reçoit la structure et les données séparément, et les données ne sont plus jamais interprétées comme du code.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Toujours, sans exception, dès qu'une valeur vient de l'extérieur (formulaire, URL, fichier, API). Même les valeurs « internes » passent en paramètres : c'est une habitude, pas une option.",
          },
          {
            label: "Ce qui ne protège pas",
            value:
              "Échapper les guillemets « à la main », filtrer quelques mots-clés, ou masquer les erreurs : contournables. Seule la paramétrisation est une protection structurelle.",
          },
        ],
      },
      {
        kind: "code",
        language: "sql",
        title: "Paramètres selon le SGBD (côté SQL pur)",
        code: "-- PostgreSQL : paramètres numérotés $1, $2 (le pilote les remplit)\nSELECT * FROM clients WHERE email = $1 AND ville = $2;\n\n-- MySQL / SQLite : point d'interrogation\nSELECT * FROM clients WHERE email = ? AND ville = ?;",
      },
      {
        kind: "text",
        text: "En pratique, c'est votre pilote ou votre ORM qui gère les paramètres (ex. `cursor.execute(\"SELECT … WHERE email = %s\", (email,))` en Python avec psycopg, `db.query(\"… WHERE email = ?\", [email])` en Node). Retenez la règle : la requête est une chaîne fixe, les valeurs voyagent à part. Défense en profondeur : compte applicatif aux droits minimaux (voir droits-utilisateurs) + sauvegardes.",
      },
    ],
  },
  {
    id: "droits-utilisateurs",
    title: "Utilisateurs et droits : le moindre privilège",
    level: 3,
    intro:
      "L'application ne doit pas se connecter en super-utilisateur : créer des rôles aux droits limités.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Créer un rôle applicatif restreint (PostgreSQL)",
        code: "-- 1. Créer le rôle avec mot de passe\nCREATE USER app_boutique WITH PASSWORD 'mot-de-passe-solide';\n\n-- 2. Lui donner lecture/écriture sur les tables existantes...\nGRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_boutique;\n\n-- 3. ...et sur les tables futures\nALTER DEFAULT PRIVILEGES IN SCHEMA public\n  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_boutique;\n\n-- Révoquer si besoin\nREVOKE DELETE ON commandes FROM app_boutique;",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Chaque usage a son compte avec le minimum de droits nécessaires : l'application lit/écrit les données, elle ne crée pas de tables ni d'utilisateurs.",
          },
          {
            label: "Pourquoi",
            value:
              "Si l'application est compromise (injection SQL, faille), l'attaquant n'obtient que les droits du compte : sans `DROP` ni `GRANT`, les dégâts sont contenus. C'est la seconde barrière après les requêtes paramétrées.",
          },
          {
            label: "Équivalent MySQL",
            value:
              "`CREATE USER 'app'@'localhost' IDENTIFIED BY '…';` puis `GRANT SELECT, INSERT, UPDATE, DELETE ON boutique.* TO 'app'@'localhost';`. Sur MySQL, les droits se gèrent par base (`boutique.*`).",
          },
          {
            label: "SQLite",
            value:
              "Pas d'utilisateurs : la sécurité est celle du fichier (droits Unix). Ne mettez jamais un fichier `.db` dans un répertoire servi par le web.",
          },
          {
            label: "Bonne pratique",
            value:
              "Trois comptes types : `app` (lecture/écriture métier), `readonly` (reporting, sans écriture), `admin` (humain, pour les migrations). Jamais le super-utilisateur dans le code.",
          },
        ],
      },
    ],
  },
  {
    id: "orm",
    title: "Les ORM : notion et bon usage",
    level: 3,
    intro:
      "Un ORM traduit vos objets en SQL : confortable, mais pas une excuse pour ignorer le SQL.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un ORM (Object-Relational Mapping : Django ORM, SQLAlchemy, Prisma, Eloquent…) génère le SQL à partir de classes et d'appels de méthodes, au lieu d'écrire les requêtes à la main.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Éviter le SQL répétitif du CRUD, bénéficier des migrations intégrées, manipuler des objets plutôt que des chaînes. En équipe, il uniformise l'accès aux données.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Application classique avec beaucoup de CRUD : l'ORM fait gagner du temps. Requêtes analytiques complexes, reporting, perfs fines : le SQL brut reprend l'avantage.",
          },
          {
            label: "Le piège N+1",
            value:
              "Le classique : une requête pour les clients, puis une requête par client pour ses commandes (101 requêtes au lieu de 2). Les ORM proposent le chargement anticipé (eager loading) — encore faut-il savoir que le problème existe, ce qui suppose de lire le SQL généré.",
          },
          {
            label: "Bonne pratique",
            value:
              "Apprenez le SQL d'abord, l'ORM ensuite : vous comprendrez ce qu'il génère, vous diagnostiquerez ses lenteurs avec `EXPLAIN`, et vous saurez quand écrire du SQL brut. L'ORM est un outil, pas un substitut.",
          },
          {
            label: "Concepts liés",
            value: "Migrations (souvent intégrées à l'ORM), requêtes paramétrées (les ORM les utilisent en interne).",
          },
        ],
      },
    ],
  },
  {
    id: "comparatif-sgbd",
    title: "PostgreSQL vs MySQL vs SQLite : comparatif factuel",
    level: 3,
    intro:
      "Les trois côte à côte, sans verdict : chacun a son terrain.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "PostgreSQL", "MySQL", "SQLite"],
        rows: [
          ["Modèle", "Client-serveur", "Client-serveur", "Fichier embarqué (sans serveur)"],
          ["Licence", "Open source (licence PostgreSQL, permissive)", "Open source (GPL ; édition commerciale Oracle)", "Domaine public"],
          ["Conformité SQL", "Très stricte, proche du standard", "Bonne ; quelques divergences historiques", "Bonne pour le cœur du langage"],
          ["Types avancés", "Oui : JSONB, tableaux, géospatial (PostGIS), types personnalisés", "JSON, géospatial de base", "Typage dynamique souple"],
          ["Concurrence en écriture", "MVCC : lecteurs et écrivains ne se bloquent pas", "InnoDB : verrous ligne, bonne concurrence", "Verrou global en écriture (un écrivain à la fois)"],
          ["Réplication / haute dispo", "Réplication native, riche écosystème", "Réplication simple et éprouvée", "Non pertinent (fichier local)"],
          ["Outil de sauvegarde", "`pg_dump`", "`mysqldump`", "`.backup` / copie du fichier"],
          ["Cas typique", "Application exigeante, données critiques, requêtes complexes", "Web classique, CMS, hébergement mutualisé", "Apprentissage, prototype, mobile, embarqué, tests"],
        ],
      },
      {
        kind: "text",
        text: "Comment choisir honnêtement : apprenez sur celui que votre projet utilise (ou SQLite pour débuter sans friction) ; choisissez PostgreSQL pour l'exigence fonctionnelle, MySQL quand l'écosystème l'impose, SQLite quand il n'y a pas de serveur à administrer. Le SQL appris sur l'un se transfère à 90 % sur les autres — les différences (fonctions de dates, `ILIKE`, `RETURNING`…) se signalent au fil de l'eau.",
      },
    ],
  },
  {
    id: "json-sql",
    title: "Stocker du JSON dans une base relationnelle",
    level: 3,
    intro:
      "Le relationnel pur ne couvre pas tout : les trois SGBD savent stocker et interroger du JSON.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Colonne JSON et extraction (PostgreSQL)",
        code: "CREATE TABLE evenements (\n  id SERIAL PRIMARY KEY,\n  donnees JSONB NOT NULL\n);\n\nINSERT INTO evenements (donnees)\nVALUES ('{\"type\": \"clic\", \"page\": \"/tarifs\"}');\n\n-- Extraire un champ (->> renvoie du texte)\nSELECT donnees->>'type' AS type_evenement\nFROM evenements\nWHERE donnees->>'page' = '/tarifs';\n\n-- Index sur un champ JSON\nCREATE INDEX idx_event_type ON evenements((donnees->>'type'));",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Les colonnes JSON (`JSONB` sur PostgreSQL, `JSON` sur MySQL, `TEXT` + fonctions `json_*` sur SQLite) stockent des données semi-structurées interrogeables en SQL.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Données à schéma variable ou évolutif (événements, préférences, métadonnées) : le JSON évite une table par variante. Les champs stables et relationnels restent des colonnes classiques.",
          },
          {
            label: "Les limites",
            value:
              "Pas de contraintes fines à l'intérieur du JSON (un `CHECK` reste possible mais grossier), jointures maladroites, lisibilité moindre. Si vous interrogez toujours les mêmes champs, ce sont des colonnes.",
          },
          {
            label: "Bonne pratique",
            value:
              "JSON pour le variable, colonnes pour le stable et le relationnel. Sur PostgreSQL, préférez `JSONB` (binaire, indexable) à `JSON` (texte brut).",
          },
        ],
      },
    ],
  },
  {
    id: "dates-fuseaux",
    title: "Dates et fuseaux horaires : le piège classique",
    level: 3,
    intro:
      "Stocker des moments sans ambiguïté : UTC dans la base, fuseau à l'affichage.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une date-heure sans fuseau est ambiguë (minuit à Antananarivo ? à Paris ?) : stockez en UTC avec un type qui connaît le fuseau, convertissez à l'affichage.",
          },
          {
            label: "PostgreSQL",
            value:
              "`TIMESTAMPTZ` (timestamp with time zone) stocke en UTC et convertit selon le fuseau de la session. `TIMESTAMP` (sans fuseau) stocke tel quel : à éviter pour des moments réels, utile pour des rendez-vous « heure locale » récurrents.",
          },
          {
            label: "MySQL",
            value:
              "`TIMESTAMP` convertit en UTC au stockage et reconvertit à la lecture (plage limitée : 1970–2038). `DATETIME` stocke tel quel sans conversion. Pour l'historique long, `DATETIME` + discipline UTC applicative.",
          },
          {
            label: "SQLite",
            value:
              "Pas de type date natif : stockez en `TEXT` ISO 8601 (`'2026-09-28T20:00:00Z'`) ou en `INTEGER` (timestamp Unix). Les fonctions `date()`, `datetime()`, `strftime()` manipulent ces formats.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Comparer un `TIMESTAMP` local à `NOW()` après un changement d'heure d'été, ou mélanger fuseaux dans une même colonne : les rapports « perdent » ou « dupliquent » une heure deux fois par an.",
          },
          {
            label: "Bonne pratique",
            value:
              "Règle simple : UTC dans la base, conversion en heure locale uniquement dans l'interface. Et `DATE` (sans heure) pour les anniversaires et échéances calendaires.",
          },
        ],
      },
    ],
  },
  {
    id: "performance-requetes",
    title: "Performance : les réflexes qui comptent",
    level: 3,
    intro:
      "80 % des lenteurs SQL viennent de cinq causes : les connaître, c'est les éviter.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "SELECT * en production",
            value:
              "Ramène toutes les colonnes, y compris les gros textes, sur toutes les lignes : bande passante et mémoire gaspillées, et le plan ne peut pas utiliser un index couvrant. Listez les colonnes utiles.",
          },
          {
            label: "Filtrer après avoir tout lu",
            value:
              "Récupérer 100 000 lignes pour en garder 10 côté application : le filtre (`WHERE`) doit être dans la requête, avec un index qui le supporte.",
          },
          {
            label: "Le N+1 (via ORM)",
            value:
              "1 requête pour la liste + N requêtes pour le détail de chaque élément. Solution : jointure ou chargement anticipé (eager loading) de l'ORM.",
          },
          {
            label: "JOIN sans index",
            value:
              "Joindre sur une colonne non indexée force le SGBD à comparer chaque ligne à chaque ligne. Les clés étrangères devraient presque toujours être indexées (automatique sur PostgreSQL, à vérifier sur MySQL).",
          },
          {
            label: "Fonction sur colonne indexée",
            value:
              "`WHERE YEAR(cree_le) = 2026` empêche l'usage de l'index sur `cree_le` : préférez `WHERE cree_le >= '2026-01-01' AND cree_le < '2027-01-01'`.",
          },
          {
            label: "La méthode",
            value:
              "Mesurez (`EXPLAIN ANALYZE`), corrigez une cause à la fois, remesurez. N'optimisez jamais « au feeling » : l'optimiseur vous surprendra dans les deux sens.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-1",
    title: "Erreurs courantes (1/2) : lecture et filtres",
    level: 3,
    intro:
      "Les cinq erreurs de lecture que tout le monde commet — et leur correction.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq classiques de l'interrogation",
        fields: [
          {
            label: "1. `= NULL` au lieu de `IS NULL`",
            value:
              "Mauvais : `WHERE telephone = NULL` — ne renvoie jamais rien, sans erreur. Mieux : `WHERE telephone IS NULL`. Le `NULL` n'est égal à rien, pas même à lui-même.",
          },
          {
            label: "2. Supposer un ordre sans `ORDER BY`",
            value:
              "Mauvais : paginer avec `LIMIT/OFFSET` sans tri et s'étonner des doublons entre pages. Mieux : toujours `ORDER BY` (clé primaire en dernier critère) dès qu'on pagine ou qu'on affiche.",
          },
          {
            label: "3. `WHERE` sur un agrégat",
            value:
              "Mauvais : `WHERE SUM(montant) > 50000` — erreur de syntaxe. Mieux : `HAVING SUM(montant) > 50000`. Ligne individuelle → `WHERE`, groupe → `HAVING`.",
          },
          {
            label: "4. `NOT IN` avec un `NULL` dans la liste",
            value:
              "Mauvais : `WHERE ville NOT IN ('Paris', NULL)` — ne renvoie rien. Mieux : exclure les `NULL` de la liste ou utiliser `NOT EXISTS`.",
          },
          {
            label: "5. `BETWEEN` sur des dates avec heures",
            value:
              "Mauvais : `WHERE cree_le BETWEEN '2026-01-01' AND '2026-01-31'` — rate le 31 janvier après minuit. Mieux : `WHERE cree_le >= '2026-01-01' AND cree_le < '2026-02-01'`.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-2",
    title: "Erreurs courantes (2/2) : écritures et schéma",
    level: 3,
    intro:
      "Cinq erreurs d'écriture et de conception — celles qui coûtent des données.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq classiques de l'écriture",
        fields: [
          {
            label: "6. `UPDATE`/`DELETE` sans `WHERE`",
            value:
              "Mauvais : `DELETE FROM clients;` exécuté « pour tester ». Mieux : le rituel — `SELECT` avec le même `WHERE` d'abord, puis transaction + `ROLLBACK` de vérification avant `COMMIT`.",
          },
          {
            label: "7. Oublier la clé étrangère",
            value:
              "Mauvais : deux tables reliées « par convention » sans `REFERENCES` — les orphelins s'accumulent. Mieux : déclarer chaque relation ; la base refuse l'incohérence à votre place.",
          },
          {
            label: "8. Stocker les prix en flottant",
            value:
              "Mauvais : colonne `REAL` pour des montants — `0.1 + 0.2 ≠ 0.3` et les centimes dérivent. Mieux : `NUMERIC(10,2)` / `DECIMAL(10,2)`, exact par construction.",
          },
          {
            label: "9. Concaténer des entrées utilisateur dans le SQL",
            value:
              "Mauvais : `\"SELECT … WHERE nom = '\" + saisie + \"'\"` — porte ouverte à l'injection SQL. Mieux : requêtes paramétrées, toujours (voir la section sécurité).",
          },
          {
            label: "10. Aucune sauvegarde testée",
            value:
              "Mauvais : `pg_dump` configuré mais jamais restauré — le jour J, l'archive est vide ou corrompue. Mieux : restauration d'essai régulière sur une machine à part, procédure écrite.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes progressifs",
    level: 3,
    intro:
      "Quatre projets qui montent en puissance : du schéma jouet à la base administrée.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Gestion de bibliothèque (débutant)",
        fields: [
          {
            label: "Objectif",
            value:
              "Modéliser livres, adhérents et emprunts avec clés primaires, étrangères et contraintes.",
          },
          {
            label: "Compétences",
            value: "`CREATE TABLE`, types, `NOT NULL`/`UNIQUE`/`CHECK`, `INSERT`, `SELECT`/`WHERE`/`ORDER BY`.",
          },
          {
            label: "Livrable",
            value:
              "Un fichier `schema.sql` + `seed.sql` qui crée une bibliothèque cohérente, et 10 requêtes d'exploration (livres disponibles, adhérents en retard…).",
          },
          {
            label: "Projet suivant",
            value: "Le projet 2, pour passer aux jointures et aux agrégats.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Tableau de bord boutique (intermédiaire)",
        fields: [
          {
            label: "Objectif",
            value:
              "Répondre à de vraies questions métier sur clients/commandes/produits : chiffre d'affaires par ville et par mois, top produits, clients inactifs.",
          },
          {
            label: "Compétences",
            value:
              "`JOIN` (inner/left), `GROUP BY`/`HAVING`, sous-requêtes, CTE, vues pour les indicateurs réutilisés.",
          },
          {
            label: "Livrable",
            value:
              "Une dizaine de requêtes analytiques + 3 vues (`chiffre_par_ville`, `top_produits`, `clients_inactifs`), avec un jeu de données d'au moins 1 000 lignes généré en script.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 3, pour brancher la base à une vraie application.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — API avec base branchée (intermédiaire+)",
        fields: [
          {
            label: "Objectif",
            value:
              "Une petite API (Python/FastAPI, Node/Express…) qui lit et écrit en PostgreSQL via des requêtes paramétrées, avec migrations versionnées.",
          },
          {
            label: "Compétences",
            value:
              "Pilote SQL (`psycopg`, `mysql2`, `better-sqlite3`…), requêtes paramétrées, transactions (`BEGIN`/`COMMIT`), outil de migration, compte applicatif aux droits limités.",
          },
          {
            label: "Livrable",
            value:
              "CRUD complet sur deux entités reliées, migrations numérotées rejouables, aucune concaténation de SQL, script de seed pour la démo.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 4, pour passer côté administration.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Base administrée comme en production (avancé)",
        fields: [
          {
            label: "Objectif",
            value:
              "Installer PostgreSQL ou MySQL « pour de vrai » : utilisateurs, sauvegardes automatiques, restauration testée, requêtes lentes diagnostiquées.",
          },
          {
            label: "Compétences",
            value:
              "Rôles et `GRANT`, `pg_dump`/`mysqldump` planifiés, restauration sur une seconde machine, `EXPLAIN ANALYZE`, indexation raisonnée.",
          },
          {
            label: "Livrable",
            value:
              "Procédure de sauvegarde/restauration en une page et testée, 3 comptes aux droits différenciés, rapport `EXPLAIN` avant/après index sur une requête lente identifiée.",
          },
          {
            label: "Difficulté",
            value:
              "Avancé : c'est le travail d'un administrateur junior, excellent sur un CV.",
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
      "Les documentations de référence — complètes, à jour, gratuites.",
    blocks: [
      {
        kind: "list",
        items: [
          "PostgreSQL : https://www.postgresql.org/docs/ — la documentation la plus pédagogique des trois, avec un tutoriel intégré.",
          "MySQL : https://dev.mysql.com/doc/ — référence complète, guides par version.",
          "SQLite : https://www.sqlite.org/docs.html — documentation concise, idéale pour vérifier un comportement précis.",
          "SQLZoo (sqlzoo.net) — exercices interactifs par étapes, du SELECT aux jointures.",
          "Mode SQL Tutorial (mode.com/sql-tutorial) — tutoriel avec vraies données d'exemple.",
        ],
      },
      {
        kind: "text",
        text: "Conseil d'usage : la documentation officielle répond au « comment ça marche exactement » (comportement d'un type, syntaxe d'une commande), les tutoriels interactifs au « comment on pratique ». Alternez les deux : lisez un concept, exécutez-le dans `psql` dans la foulée.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "SQL ouvre plusieurs portes : voici les chemins naturels selon votre objectif.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Vers le développement backend",
            value:
              "Branchez SQL à votre langage : Python (`psycopg`, SQLAlchemy), JavaScript (`pg`, Prisma), PHP (PDO). Puis un ORM et les migrations.",
          },
          {
            label: "Vers la data",
            value:
              "Approfondissez les requêtes analytiques : fonctions de fenêtrage (`ROW_NUMBER`, `RANK`, `LAG`…), CTE récursives, puis un outil de traitement (pandas, dbt).",
          },
          {
            label: "Vers l'administration",
            value:
              "Réplication, sauvegardes à chaud, supervision, tuning (`EXPLAIN` avancé, configuration mémoire), sécurité réseau (TLS, pare-feu).",
          },
          {
            label: "Vers la modélisation",
            value:
              "Conception de schémas complexes, formes normales avancées, entrepôts de données (modélisation en étoile), bases NoSQL pour comparer les modèles.",
          },
          {
            label: "Le réflexe durable",
            value:
              "Quelle que soit la direction : continuez d'écrire du SQL à la main chaque semaine. L'aisance en SQL est une compétence qui ne se démode pas — les ORM changent, le langage reste.",
          },
        ],
      },
    ],
  },
];

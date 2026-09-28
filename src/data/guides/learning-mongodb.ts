import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de MongoDB : la base documentaire, du premier
 * document au cluster en production.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_MONGODB: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est MongoDB, pourquoi il existe et sa place parmi les bases de données.",
    blocks: [
      {
        kind: "text",
        text: "MongoDB est une base de données orientée documents : elle stocke des enregistrements au format BSON (un JSON binaire) dans des collections, sans schéma rigide imposé. Chaque document peut avoir sa propre structure, avec des objets imbriqués et des tableaux.",
      },
      {
        kind: "text",
        text: "Pourquoi MongoDB existe : le modèle relationnel (tables, lignes, jointures) impose de découper les données et de figer un schéma à l'avance. Quand le modèle de données évolue vite ou est naturellement hiérarchique — catalogue produit, profil utilisateur, contenu éditorial — ce découpage coûte cher en migrations et en jointures. Le documentaire stocke l'agrégat tel quel : un produit avec ses variantes et ses avis tient dans un seul document, lu en une seule opération.",
      },
      {
        kind: "text",
        text: "Ce que MongoDB n'est pas : un remplacement universel du relationnel. Quand l'intégrité référentielle stricte et les transactions complexes multi-entités dominent (comptabilité, par exemple), le relationnel reste supérieur. MongoDB est un outil de plus dans la boîte, pas un dogme.",
      },
    ],
  },
  {
    id: "panorama-mongodb",
    title: "MongoDB en une image",
    level: 1,
    intro:
      "L'anatomie d'une base MongoDB, du document au cluster.",
    blocks: [
      {
        kind: "diagram",
        title: "De l'application aux données",
        lines: [
          "Application (driver : Node.js, Python, Java…)",
          "     │  requêtes (MQL, proche de JavaScript)",
          "     ▼",
          "mongod (serveur, port 27017)",
          "     │",
          "     ├── Base de données",
          "     │     └── Collection",
          "     │           └── Documents BSON (JSON imbriqué)",
          "     │",
          "     ├── Index (B-tree : accélérer find, sort)",
          "     │",
          "     └── Replica set (primaire + secondaires : haute dispo)",
          "                 └── Sharding (répartir sur plusieurs machines)",
        ],
      },
      {
        kind: "list",
        items: [
          "Document = l'unité de stockage : un objet JSON-like, schéma flexible.",
          "Collection = un ensemble de documents, l'équivalent souple d'une table.",
          "MQL = le langage de requête, exprimé en objets JavaScript.",
          "Scaling : réplication pour la disponibilité, sharding pour le volume.",
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
      "Ce qu'il faut savoir avant d'attaquer MongoDB — et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Bases nécessaires",
        fields: [
          {
            label: "Bases de données (concept)",
            value:
              "Comprendre ce qu'est une base : persistance, requêtes, index. MongoDB change le modèle de données, pas le fait qu'il faille modéliser.",
          },
          {
            label: "JSON",
            value:
              "Objets, tableaux, imbrication : les documents MongoDB sont du JSON. Si le JSON est fragile, tout le reste le sera.",
          },
          {
            label: "JavaScript (bases)",
            value:
              "Le shell `mongosh` et le MQL utilisent une syntaxe JavaScript. Savoir lire un objet littéral suffit pour commencer.",
          },
          {
            label: "Terminal",
            value:
              "Lancer des conteneurs Docker, se connecter au shell : l'essentiel de l'apprentissage se fait en ligne de commande.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pas besoin de SQL : MongoDB a son propre langage. En revanche, avoir vu le relationnel aide à comprendre ce que le documentaire change — et ce qu'il ne change pas (les index, par exemple, existent des deux côtés).",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Lancer MongoDB en local avec Docker : la voie la plus rapide et la plus propre.",
    blocks: [
      {
        kind: "command",
        label: "Lancer un serveur MongoDB avec Docker",
        command: "docker run --name mongo -p 27017:27017 -d mongo:7",
        why: "Démarre un conteneur nommé `mongo` avec l'image officielle `mongo:7`, en exposant le port 27017 (le port par défaut de MongoDB). Le `-d` le lance en arrière-plan. Aucune installation système, suppression en une commande.",
        verify: "docker ps --filter name=mongo",
      },
      {
        kind: "command",
        label: "Installer le shell mongosh",
        command: "Télécharger mongosh depuis mongodb.com/try/download/shell",
        why: "Je ne donne pas de commande d'installation ici car elle dépend de l'OS et du gestionnaire de paquets — la page officielle liste les paquets par plateforme. `mongosh` est le shell moderne (il remplace l'ancien `mongo`) : c'est l'outil pour explorer et administrer.",
        verify: "mongosh --version",
      },
      {
        kind: "command",
        label: "Se connecter au serveur local",
        command: "mongosh \"mongodb://localhost:27017\"",
        why: "Ouvre le shell sur le serveur local via une URI de connexion MongoDB. Le format `mongodb://hôte:port` est le même que celui utilisé dans le code applicatif — ce qu'on apprend dans le shell se transpose directement.",
        verify: "show dbs",
      },
    ],
  },
  {
    id: "installation-alternatives",
    title: "Docker, natif ou cloud",
    level: 2,
    intro:
      "Trois façons d'avoir un MongoDB, avec leurs usages.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Docker", "Natif", "Atlas (cloud)"],
        rows: [
          ["Installation", "`docker run mongo:7` : une commande", "Paquet `mongodb-org` depuis le dépôt officiel", "Aucune : cluster créé dans le navigateur"],
          ["Usage typique", "Développement local, tests", "Serveur auto-hébergé permanent", "Production sans administration"],
          ["Données", "Éphémères sauf volume monté", "Persistantes sur disque", "Persistantes, sauvegardées"],
          ["Coût", "Gratuit", "Gratuit (+ la machine)", "Offre gratuite limitée, puis facturé"],
        ],
      },
      {
        kind: "text",
        text: "Pour apprendre : Docker suffit. Pour un projet réel sans équipe infra : Atlas évite d'administrer réplication et sauvegardes. Pour l'auto-hébergement : le paquet `mongodb-org` depuis le dépôt officiel (jamais une version obsolète du dépôt de la distribution).",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet",
    level: 2,
    intro:
      "Créer une base, insérer des documents, les retrouver : le cycle complet dans `mongosh`.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir (ou créer) une base",
            detail:
              "Dans `mongosh`, tapez `use boutique`. Si la base n'existe pas, MongoDB la crée implicitement à la première écriture — il n'y a pas de `CREATE DATABASE`.",
          },
          {
            title: "Insérer un document",
            detail:
              "`db.produits.insertOne({ nom: \"Clavier\", prix: 79, tags: [\"périphérique\", \"bureautique\"] })` : la collection `produits` est elle aussi créée implicitement. Notez le document imbriqué naturellement, sans schéma préalable.",
          },
          {
            title: "Lire les documents",
            detail:
              "`db.produits.find()` retourne tout ; `db.produits.find({ prix: { $gte: 50 } })` filtre. Le filtre est un document : `{ champ: condition }`, avec des opérateurs comme `$gte`, `$in`, `$regex`.",
          },
          {
            title: "Mettre à jour",
            detail:
              "`db.produits.updateOne({ nom: \"Clavier\" }, { $set: { prix: 69 } })` : le filtre cible, `$set` modifie. Sans opérateur comme `$set`, l'update remplacerait tout le document — l'erreur classique du débutant.",
          },
          {
            title: "Supprimer",
            detail:
              "`db.produits.deleteOne({ nom: \"Clavier\" })`. Comme toujours : filtre précis d'abord, suppression ensuite. En cas de doute, `find()` avec le même filtre pour vérifier ce qui sera touché.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Session mongosh — CRUD complet",
        code: "use boutique\n\ndb.produits.insertOne({\n  nom: \"Clavier\",\n  prix: 79,\n  enStock: true,\n  specs: { layout: \"AZERTY\", connexion: \"USB-C\" },\n  tags: [\"périphérique\", \"bureautique\"]\n})\n\ndb.produits.find({ prix: { $gte: 50 } })\n\ndb.produits.updateOne(\n  { nom: \"Clavier\" },\n  { $set: { prix: 69 } }\n)\n\ndb.produits.deleteOne({ nom: \"Clavier\" })",
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Les pièces d'un poste de travail MongoDB.",
    blocks: [
      {
        kind: "diagram",
        title: "La chaîne locale",
        lines: [
          "Terminal",
          "   ├─► Docker : le serveur `mongo:7` (port 27017)",
          "   ├─► mongosh : le shell (explorer, administrer)",
          "   └─► Application : driver natif ou ODM (Mongoose…)",
          "           │",
          "           ▼",
          "GUI : MongoDB Compass (explorer visuellement)",
          "           │",
          "           ▼",
          "Éditeur : VS Code + extension MongoDB for VS Code",
          "                   (playgrounds : requêtes dans des fichiers .mongodb)",
        ],
      },
      {
        kind: "text",
        text: "Le trio minimal : Docker pour le serveur, `mongosh` pour apprendre le langage, Compass pour visualiser. L'extension VS Code devient utile quand les requêtes s'allongent : les playgrounds permettent de les écrire, les exécuter et les versionner comme du code.",
      },
    ],
  },
  {
    id: "outils",
    title: "Outils : shell, GUI, drivers",
    level: 2,
    intro:
      "Chaque outil a son rôle : les connaître évite de tout faire dans le mauvais.",
    blocks: [
      {
        kind: "fields",
        title: "Les outils",
        fields: [
          {
            label: "mongosh",
            value:
              "Le shell officiel : requêtes, administration, scripts. C'est là qu'on apprend le MQL — tout le reste en découle.",
          },
          {
            label: "MongoDB Compass",
            value:
              "La GUI officielle : explorer les collections, visualiser le schéma, construire des pipelines d'agrégation visuellement, analyser les performances des requêtes.",
          },
          {
            label: "MongoDB for VS Code",
            value:
              "Extension officielle : connexion, exploration et playgrounds (fichiers de requêtes exécutables) directement dans l'éditeur.",
          },
          {
            label: "Drivers natifs",
            value:
              "Bibliothèques officielles par langage (Node.js, Python/PyMongo, Java…) : l'API que le code applicatif utilise, proche du MQL du shell.",
          },
          {
            label: "Mongoose (Node.js)",
            value:
              "ODM : schémas, validation et middleware par-dessus le driver. Confortable, mais ajoute une couche — à choisir en connaissance de cause.",
          },
          {
            label: "Atlas",
            value:
              "La plateforme managée officielle : cluster, sauvegardes et monitoring sans administrer de serveurs.",
          },
        ],
      },
    ],
  },
  {
    id: "modelisation-documents",
    title: "Modéliser en documents",
    level: 2,
    intro:
      "La question centrale de MongoDB : imbriquer ou référencer ?",
    blocks: [
      {
        kind: "text",
        text: "En relationnel, on normalise : on découpe en tables et on joint. En documentaire, on modélise par agrégat : ce qui est lu ensemble est stocké ensemble. Un produit avec ses variantes et ses avis tient dans un document — une seule lecture, pas de jointure.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Document produit : agrégat imbriqué",
        code: "{\n  _id: ObjectId(\"...\"),\n  nom: \"Clavier mécanique\",\n  prix: 79,\n  variantes: [\n    { layout: \"AZERTY\", stock: 12 },\n    { layout: \"QWERTY\", stock: 4 }\n  ],\n  avis: [\n    { auteur: \"Aina\", note: 5, texte: \"Excellent.\" }\n  ]\n}",
      },
      {
        kind: "list",
        items: [
          "Imbriquer quand : les données sont lues ensemble, ont un cycle de vie commun, et restent de taille raisonnable.",
          "Référencer (stocker un `_id` vers une autre collection) quand : la donnée est partagée par beaucoup de documents, ou volumineuse et évolutive indépendamment.",
          "Règle pratique : modéliser d'après les requêtes de l'application, pas d'après une théorie abstraite. Lister les requêtes d'abord, dessiner les documents ensuite.",
        ],
      },
    ],
  },
  {
    id: "configuration-essentielle",
    title: "Configuration essentielle",
    level: 2,
    intro:
      "Les réglages à connaître sur un serveur réel : réseau et authentification.",
    blocks: [
      {
        kind: "fields",
        title: "mongod.conf — l'essentiel",
        fields: [
          {
            label: "`net.bindIp`",
            value:
              "Les interfaces d'écoute. Par défaut `localhost` : le serveur n'est joignable que depuis la machine. L'ouvrir à `0.0.0.0` sans authentification expose la base à tout le réseau — la faute la plus exploitée.",
          },
          {
            label: "`storage.dbPath`",
            value:
              "Le dossier des données (`/var/lib/mongodb` en paquet natif). À monter en volume persistant sous Docker, sinon les données meurent avec le conteneur.",
          },
          {
            label: "`security.authorization`",
            value:
              "À `enabled` en production : exige une authentification. Créer d'abord un admin (`db.createUser` avec le rôle `root` dans la base `admin`), puis activer.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Créer un administrateur (base admin)",
        code: "use admin\ndb.createUser({\n  user: \"admin\",\n  pwd: \"mot-de-passe-solide\",\n  roles: [\"root\"]\n})",
      },
    ],
  },
  {
    id: "commandes-shell",
    title: "Commandes du quotidien",
    level: 2,
    intro:
      "Les commandes terminal qui reviennent sans arrêt.",
    blocks: [
      {
        kind: "command",
        label: "Sauvegarder une base",
        command: "mongodump --out=./dump",
        why: "Exporte toutes les bases dans le dossier `./dump` (format BSON). La sauvegarde la plus simple pour le développement et les petites bases — à automatiser en production.",
        verify: "ls ./dump",
      },
      {
        kind: "command",
        label: "Restaurer une sauvegarde",
        command: "mongorestore ./dump",
        why: "Réimporte un dump produit par `mongodump`. Tester la restauration régulièrement : une sauvegarde jamais restaurée est une supposition, pas une sauvegarde.",
        verify: "mongosh --eval \"db.adminCommand('ping')\"",
      },
      {
        kind: "command",
        label: "Voir les bases et collections",
        command: "mongosh --eval \"show dbs\" \"mongodb://localhost:27017\"",
        why: "`--eval` exécute une commande mongosh sans ouvrir le shell interactif : pratique dans les scripts. Ici, lister les bases pour vérifier que le serveur répond et contient ce qu'on attend.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "La routine d'un développeur qui travaille avec MongoDB.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Démarrer l'environnement",
            detail:
              "Lancer le conteneur (`docker start mongo`) ou vérifier Atlas. Vérifier la connexion avec un `show dbs` rapide avant de coder.",
          },
          {
            title: "Prototyper dans mongosh ou un playground",
            detail:
              "Écrire et tester les requêtes dans le shell ou un playground VS Code : c'est plus rapide que de passer par l'application pour chaque essai.",
          },
          {
            title: "Transférer dans le code",
            detail:
              "Le MQL du shell et l'API du driver sont quasi identiques : la requête validée dans `mongosh` se transpose telle quelle dans le driver.",
          },
          {
            title: "Indexer ce qui est filtré",
            detail:
              "Dès qu'une requête filtre ou trie sur un champ en production, vérifier qu'un index existe (`db.collection.getIndexes()`).",
          },
          {
            title: "Sauvegarder avant les opérations risquées",
            detail:
              "`mongodump` avant toute migration ou suppression massive. Le coût est de quelques secondes, l'assurance est totale.",
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
      "Quatre projets pour passer du shell à l'usage réel.",
    blocks: [
      {
        kind: "fields",
        title: "Dans l'ordre",
        fields: [
          {
            label: "1. Catalogue en shell",
            value:
              "Créer une base `boutique`, insérer 20 produits variés, écrire 10 requêtes (filtres, tris, projections). Objectif : le MQL réflexe.",
          },
          {
            label: "2. API REST avec driver natif",
            value:
              "CRUD complet Node.js + driver officiel sur une collection, avec validation des entrées. Objectif : brancher MongoDB à une vraie application.",
          },
          {
            label: "3. Dashboard avec agrégations",
            value:
              "Pipeline d'agrégation : chiffre d'affaires par catégorie et par mois, top produits. Objectif : l'analytique sans quitter la base.",
          },
          {
            label: "4. Replica set local",
            value:
              "Trois nœuds en Docker, bascule du primaire, écritures pendant la bascule. Objectif : comprendre la haute disponibilité.",
          },
        ],
      },
    ],
  },
  {
    id: "atlas-vs-auto-heberge",
    title: "Atlas ou auto-hébergé ?",
    level: 2,
    intro:
      "Choisir en fonction du contexte, pas de la mode.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Atlas", "Auto-hébergé"],
        rows: [
          ["Mise en route", "Minutes, dans le navigateur", "Installation, configuration, durcissement"],
          ["Sauvegardes", "Automatiques, point-in-time", "À mettre en place (`mongodump`, snapshots)"],
          ["Monitoring", "Intégré", "À construire (logs, métriques)"],
          ["Contrôle", "Limité aux options exposées", "Total (version, config, réseau)"],
          ["Coût", "Gratuit pour débuter, puis facturé à l'usage", "Coût de la machine + temps d'administration"],
        ],
      },
      {
        kind: "text",
        text: "Pour apprendre et prototyper, l'offre gratuite d'Atlas ou Docker suffisent. Pour la production : Atlas si l'équipe n'a pas d'expertise base de données, auto-hébergé si le contrôle et la souveraineté priment — en assumant l'administration (sauvegardes testées, monitoring, mises à jour).",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "documents-bson",
    title: "Documents et BSON",
    level: 3,
    intro:
      "Ce qui se cache sous le JSON : types, limites, _id.",
    blocks: [
      {
        kind: "text",
        text: "MongoDB stocke du BSON, pas du texte JSON : un format binaire qui ajoute des types (dates, ObjectId, Decimal128, binaire) et reste parcourable efficacement. Le shell affiche du JSON étendu, mais le disque contient du BSON.",
      },
      {
        kind: "fields",
        title: "À savoir",
        fields: [
          {
            label: "ObjectId",
            value:
              "L'identifiant par défaut (`_id`) : 12 octets, globalement unique, triable par date de création approximative. On peut utiliser ses propres clés (string, nombre) si le domaine l'exige.",
          },
          {
            label: "Limite de 16 Mo",
            value:
              "Un document ne peut pas dépasser 16 Mo. En pratique, si on s'en approche, la modélisation est mauvaise : découper (référencer, ou GridFS pour les fichiers).",
          },
          {
            label: "Types de dates",
            value:
              "Stocker des dates en type Date BSON, jamais en string : sinon les tris et les plages (`$gte`/`$lte`) deviennent faux ou coûteux.",
          },
          {
            label: "Decimal128",
            value:
              "Pour la monnaie et les calculs exacts : les flottants binaires introduisent des erreurs d'arrondi. Le type Decimal128 existe pour ça.",
          },
        ],
      },
    ],
  },
  {
    id: "operateurs-mql",
    title: "Opérateurs MQL essentiels",
    level: 3,
    intro:
      "Le vocabulaire des requêtes : les opérateurs qui couvrent 90 % des besoins.",
    blocks: [
      {
        kind: "table",
        headers: ["Opérateur", "Rôle", "Exemple"],
        rows: [
          ["`$eq`, `$ne`", "Égalité / différence", "`{ statut: { $ne: \"archivé\" } }`"],
          ["`$gt`, `$gte`, `$lt`, `$lte`", "Comparaisons", "`{ prix: { $gte: 10, $lte: 100 } }`"],
          ["`$in`, `$nin`", "Appartenance à une liste", "`{ tag: { $in: [\"promo\", \"nouveau\"] } }`"],
          ["`$and`, `$or`, `$nor`", "Combinaisons logiques", "`{ $or: [{ stock: 0 }, { prix: { $lt: 5 } }] }`"],
          ["`$exists`", "Présence d'un champ", "`{ email: { $exists: true } }`"],
          ["`$regex`", "Recherche textuelle simple", "`{ nom: { $regex: \"^clav\", $options: \"i\" } }`"],
          ["`$elemMatch`", "Condition sur un élément de tableau", "`{ variantes: { $elemMatch: { stock: { $gt: 0 } } } }`"],
          ["`$set`, `$inc`, `$push`, `$pull`", "Mises à jour", "`{ $inc: { stock: -1 } }`, `{ $push: { tags: \"top\" } }`"],
        ],
      },
      {
        kind: "text",
        text: "Note sur `$regex` : pratique pour la recherche simple, mais sans index adapté il scanne toute la collection. Pour de la vraie recherche plein texte, l'index texte (`$text`) ou Atlas Search sont les outils dédiés.",
      },
    ],
  },
  {
    id: "agregations",
    title: "Pipelines d'agrégation",
    level: 3,
    intro:
      "L'analytique dans la base : filtrer, grouper, projeter, joindre.",
    blocks: [
      {
        kind: "text",
        text: "Un pipeline est une suite d'étapes : chaque étape transforme le flux de documents et le passe à la suivante. Les étapes clés : `$match` (filtrer), `$group` (agréger), `$project` (façonner), `$sort`, `$limit`, `$lookup` (joindre une autre collection).",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Chiffre d'affaires par catégorie",
        code: "db.commandes.aggregate([\n  { $match: { statut: \"payée\" } },\n  { $unwind: \"$lignes\" },\n  {\n    $group: {\n      _id: \"$lignes.categorie\",\n      total: { $sum: { $multiply: [\"$lignes.prix\", \"$lignes.quantite\"] } },\n      nbCommandes: { $sum: 1 }\n    }\n  },\n  { $sort: { total: -1 } },\n  { $limit: 10 }\n])",
      },
      {
        kind: "list",
        items: [
          "Placer `$match` le plus tôt possible : moins de documents à traiter dans la suite du pipeline.",
          "`$lookup` permet des jointures, mais un besoin massif de `$lookup` signale souvent une modélisation à revoir (imbriquer plutôt que joindre).",
          "Compass a un constructeur visuel d'agrégations : idéal pour prototyper, puis exporter le pipeline en code.",
        ],
      },
    ],
  },
  {
    id: "index-strategie",
    title: "Stratégie d'indexation",
    level: 3,
    intro:
      "Les index accélèrent les lectures et coûtent aux écritures : les placer avec méthode.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Créer et inspecter des index",
        code: "// Index simple sur un champ filtré\n db.users.createIndex({ email: 1 })\n\n// Index composé : ordre = ordre des filtres puis du tri\n db.commandes.createIndex({ statut: 1, date: -1 })\n\n// Index unique : contrainte + performance\n db.users.createIndex({ email: 1 }, { unique: true })\n\n// Lister les index d'une collection\n db.users.getIndexes()",
      },
      {
        kind: "fields",
        title: "Règles",
        fields: [
          {
            label: "Indexer les filtres et les tris",
            value:
              "Tout champ apparaissant dans un `find` fréquent ou un `sort` est un candidat. Vérifier avec `explain()` que l'index est utilisé.",
          },
          {
            label: "Ordre du composé",
            value:
              "Égalités d'abord, puis plage, puis tri (règle ESR : Equality, Sort, Range). Un mauvais ordre rend l'index partiellement inutile.",
          },
          {
            label: "Chaque index coûte",
            value:
              "Chaque écriture met à jour tous les index : 10 index sur une collection très écrite ralentissent tout. Indexer avec intention, pas par défaut.",
          },
          {
            label: "TTL",
            value:
              "Index avec `expireAfterSeconds` : MongoDB supprime automatiquement les documents expirés (sessions, logs, caches).",
          },
        ],
      },
    ],
  },
  {
    id: "explain",
    title: "Analyser avec explain()",
    level: 3,
    intro:
      "Savoir si une requête utilise un index ou scanne toute la collection.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Lire un plan d'exécution",
        code: "db.produits\n  .find({ categorie: \"audio\" })\n  .sort({ prix: -1 })\n  .explain(\"executionStats\")",
      },
      {
        kind: "fields",
        title: "Les indicateurs clés",
        fields: [
          {
            label: "COLLSCAN vs IXSCAN",
            value:
              "`COLLSCAN` = la collection entière est parcourue : le signal d'un index manquant (acceptable sur une petite collection, dramatique sur une grosse). `IXSCAN` = un index est utilisé.",
          },
          {
            label: "nReturned vs totalDocsExamined",
            value:
              "Si 10 documents sont retournés mais 100 000 examinés, la requête est inefficace : l'index ne couvre pas bien le filtre.",
          },
          {
            label: "executionTimeMillis",
            value:
              "Le temps réel mesuré. Comparer avant/après ajout d'index sur des volumes représentatifs, pas sur 50 documents de test.",
          },
        ],
      },
    ],
  },
  {
    id: "schema-validation",
    title: "Validation de schéma",
    level: 3,
    intro:
      "Flexible ne veut pas dire anarchique : imposer des garde-fous sans figer.",
    blocks: [
      {
        kind: "text",
        text: "La validation de schéma (`$jsonSchema`) définit des règles par collection : champs requis, types, plages. Elle s'applique à l'écriture, avec deux sévérités : `strict` (rejette) ou `moderate` (n'applique qu'aux documents valides ou nouveaux — utile pour une migration progressive).",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Valider la collection produits",
        code: "db.runCommand({\n  collMod: \"produits\",\n  validator: {\n    $jsonSchema: {\n      bsonType: \"object\",\n      required: [\"nom\", \"prix\"],\n      properties: {\n        nom: { bsonType: \"string\" },\n        prix: { bsonType: \"number\", minimum: 0 }\n      }\n    }\n  },\n  validationLevel: \"moderate\"\n})",
      },
      {
        kind: "text",
        text: "La bonne pratique : schéma flexible en développement, validation ajoutée quand le modèle se stabilise. C'est le meilleur des deux mondes — à condition de ne pas l'oublier.",
      },
    ],
  },
  {
    id: "replication",
    title: "Réplication : les replica sets",
    level: 3,
    intro:
      "La haute disponibilité : un primaire, des secondaires, une bascule automatique.",
    blocks: [
      {
        kind: "diagram",
        title: "Replica set à 3 nœuds",
        lines: [
          "Application ──► PRIMAIRE (écritures + lectures)",
          "                   │  oplog (journal des opérations)",
          "        ┌──────────┴──────────┐",
          "        ▼                     ▼",
          "   SECONDAIRE            SECONDAIRE",
          "   (réplique)            (réplique)",
          "        │",
          "        └──► Élection automatique si le primaire tombe",
          "             (un nouveau primaire est élu en secondes)",
        ],
      },
      {
        kind: "fields",
        title: "Concepts clés",
        fields: [
          {
            label: "Écritures",
            value:
              "Toujours vers le primaire. Le `writeConcern` définit combien de nœuds doivent confirmer (`majority` en production).",
          },
          {
            label: "Lectures",
            value:
              "Par défaut sur le primaire (données à jour). Les lectures secondaires (`readPreference`) soulagent mais peuvent retourner des données légèrement en retard.",
          },
          {
            label: "Arbiter",
            value:
              "Un nœud sans données qui vote aux élections : permet un nombre impair de votants avec 2 nœuds de données.",
          },
        ],
      },
    ],
  },
  {
    id: "sharding",
    title: "Sharding : le scaling horizontal",
    level: 3,
    intro:
      "Quand une machine ne suffit plus : répartir les données.",
    blocks: [
      {
        kind: "text",
        text: "Le sharding découpe une collection en morceaux (chunks) répartis sur plusieurs shards, selon une clé de shard. Les requêtes incluant la clé sont routées vers le bon shard ; les autres interrogent tout le cluster.",
      },
      {
        kind: "list",
        items: [
          "Le choix de la clé de shard est la décision la plus importante : elle doit répartir uniformément (éviter les hotspots) et correspondre aux requêtes fréquentes.",
          "Le sharding ajoute une complexité opérationnelle réelle : à n'envisager que quand la réplication verticale (plus grosse machine) ne suffit plus.",
          "La plupart des applications n'en auront jamais besoin : un replica set bien dimensionné couvre des volumes considérables.",
        ],
      },
    ],
  },
  {
    id: "transactions",
    title: "Transactions multi-documents",
    level: 3,
    intro:
      "L'atomicité quand une opération touche plusieurs documents.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Transaction : débit + crédit",
        code: "const session = db.getMongo().startSession()\nsession.startTransaction()\ntry {\n  const comptes = session.getDatabase(\"banque\").comptes\n  comptes.updateOne({ _id: \"A\" }, { $inc: { solde: -100 } }, { session })\n  comptes.updateOne({ _id: \"B\" }, { $inc: { solde: 100 } }, { session })\n  session.commitTransaction()\n} catch (e) {\n  session.abortTransaction()\n  throw e\n} finally {\n  session.endSession()\n}",
      },
      {
        kind: "text",
        text: "Disponibles depuis la 4.0 (replica sets) : tout réussit ou rien n'est appliqué. À utiliser quand l'intégrité l'exige — mais si chaque écriture devient une transaction multi-documents, c'est souvent le signe qu'il fallait imbriquer ces données dans un seul document.",
      },
    ],
  },
  {
    id: "sauvegardes-strategie",
    title: "Stratégie de sauvegarde",
    level: 3,
    intro:
      "Sauvegarder ne suffit pas : il faut pouvoir restaurer, vite.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Principe", "Usage"],
        rows: [
          ["`mongodump` / `mongorestore`", "Export/import logique en BSON", "Petites/moyennes bases, migrations, développement"],
          ["Snapshots disque", "Copie du volume de données", "Grosses bases : rapide, cohérent si journalisé"],
          ["Atlas backups", "Sauvegardes managées + point-in-time", "Production sans équipe dédiée"],
          ["Replica secondaire dédié", "Sauvegarde depuis un secondaire", "Éviter d'impacter le primaire en production"],
        ],
      },
      {
        kind: "list",
        items: [
          "Automatiser : une sauvegarde manuelle sera oubliée un jour ou l'autre.",
          "Tester la restauration périodiquement, sur un environnement isolé : c'est le seul test qui compte.",
          "Définir RPO (données perdues acceptables) et RTO (temps de restauration acceptable) : ils dimensionnent la stratégie.",
        ],
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité",
    level: 3,
    intro:
      "Les bases MongoDB exposées sans mot de passe sur internet sont un classique des incidents : les verrous à mettre.",
    blocks: [
      {
        kind: "fields",
        title: "Les couches",
        fields: [
          {
            label: "Réseau",
            value:
              "`bindIp` restreint aux interfaces nécessaires, firewall qui ne laisse passer que les clients légitimes. Jamais de MongoDB directement exposé sur internet.",
          },
          {
            label: "Authentification",
            value:
              "`security.authorization: enabled` + utilisateurs par rôle (lecture seule pour l'appli si elle ne fait que lire, jamais `root` pour l'application).",
          },
          {
            label: "TLS",
            value:
              "Chiffrer les connexions (`net.tls.mode`) dès que le trafic quitte une machine de confiance : les identifiants transitent sinon en clair.",
          },
          {
            label: "Principe du moindre privilège",
            value:
              "Un rôle par usage : l'application n'a que les droits sur ses collections, l'admin a `root`, les outils de lecture ont `read` seul.",
          },
        ],
      },
    ],
  },
  {
    id: "driver-node",
    title: "Driver Node.js",
    level: 3,
    intro:
      "Brancher MongoDB à une application Node.js avec le driver officiel.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Connexion et requête (driver natif)",
        code: "import { MongoClient } from \"mongodb\"\n\nconst client = new MongoClient(process.env.MONGODB_URI)\nawait client.connect()\nconst db = client.db(\"boutique\")\n\nconst chers = await db.collection(\"produits\")\n  .find({ prix: { $gte: 50 } })\n  .sort({ prix: -1 })\n  .limit(10)\n  .toArray()\n\nawait client.close()",
      },
      {
        kind: "list",
        items: [
          "Créer UN client et le réutiliser : il gère un pool de connexions. Un client par requête épuise rapidement les connexions.",
          "L'URI de connexion dans une variable d'environnement, jamais en dur dans le code.",
          "Le MQL est identique à celui du shell : `find`, `aggregate`, `createIndex` — la courbe d'apprentissage du shell paie directement ici.",
        ],
      },
    ],
  },
  {
    id: "mongoose-vs-driver",
    title: "Mongoose ou driver natif ?",
    level: 3,
    intro:
      "Un choix structurant pour un projet Node.js : comparatif factuel.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Driver natif", "Mongoose (ODM)"],
        rows: [
          ["Abstraction", "Aucune : le MQL direct", "Schémas, modèles, middleware, validation"],
          ["Courbe", "Il faut connaître le MQL", "Plus guidé au début"],
          ["Flexibilité", "Totale (agrégations, tout l'arsenal)", "Bonne, mais via l'API de l'ODM"],
          ["Coût", "Aucune dépendance", "Une couche à comprendre et déboguer"],
          ["Idéal pour", "Équipes à l'aise avec MongoDB, perfs fines", "CRUD rapides, validation côté modèle"],
        ],
      },
      {
        kind: "text",
        text: "Ni l'un ni l'autre n'est 'meilleur' dans l'absolu : le driver natif colle au plus près de la base, Mongoose accélère le développement standardisé. Le piège est de choisir Mongoose pour 'ne pas apprendre MongoDB' — l'ODM fuit dès que les requêtes deviennent sérieuses.",
      },
    ],
  },
  {
    id: "change-streams",
    title: "Change streams",
    level: 3,
    intro:
      "Réagir aux changements en temps réel : la base qui notifie l'application.",
    blocks: [
      {
        kind: "text",
        text: "Les change streams exposent un flux des modifications (insert, update, delete, replace) d'une collection, d'une base ou du cluster. Cas d'usage : invalider un cache, déclencher une synchronisation, alimenter un système temps réel — sans polling.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Écouter les insertions",
        code: "const changeStream = db.collection(\"produits\").watch()\nfor await (const change of changeStream) {\n  console.log(change.operationType, change.fullDocument)\n}",
      },
      {
        kind: "text",
        text: "Nécessite un replica set (même à un seul nœud en développement). Pour des volumes importants, préférer un pipeline d'événements dédié plutôt que de multiplier les change streams.",
      },
    ],
  },
  {
    id: "recherche-texte",
    title: "Recherche plein texte",
    level: 3,
    intro:
      "De l'index texte intégré à la recherche avancée.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Index texte et requête $text",
        code: "db.produits.createIndex({ nom: \"text\", description: \"text\" })\n\ndb.produits.find(\n  { $text: { $search: \"clavier mécanique\" } },\n  { score: { $meta: \"textScore\" } }\n).sort({ score: { $meta: \"textScore\" } })",
      },
      {
        kind: "list",
        items: [
          "L'index texte intégré couvre la recherche simple (tokenisation, insensibilité à la casse, score de pertinence).",
          "Limites : pas de fautes de frappe, pas de facettes avancées, une seule langue bien gérée par index.",
          "Pour aller plus loin : Atlas Search (recherche managée avec facettes, autocomplete, synonymes) ou un moteur dédié.",
        ],
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    level: 3,
    intro:
      "Savoir que la base va bien — et pourquoi elle irait mal.",
    blocks: [
      {
        kind: "fields",
        title: "Les signaux",
        fields: [
          {
            label: "Opérations lentes",
            value:
              "Le profiler (`db.setProfilingLevel(1, { slowms: 100 })`) loggue les opérations dépassant un seuil : la première source pour trouver les requêtes à indexer.",
          },
          {
            label: "Connexions",
            value:
              "Surveiller le nombre de connexions vs la limite : une fuite (clients non fermés) finit par refuser du monde.",
          },
          {
            label: "Espace disque",
            value:
              "Les données, les index et l'oplog grandissent : alertes avant saturation, jamais après.",
          },
          {
            label: "Santé du replica set",
            value:
              "Retard de réplication (lag) des secondaires, élections fréquentes : signes d'un nœud en difficulté.",
          },
        ],
      },
      {
        kind: "text",
        text: "Atlas fournit tout cela clé en main. En auto-hébergé, les métriques sont exposées via `db.serverStatus()` et les logs — à brancher sur votre stack de monitoring (Prometheus, etc.).",
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging",
    level: 3,
    intro:
      "Les pannes typiques et comment les isoler.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue de pannes",
        fields: [
          {
            label: "Requête lente en production",
            value:
              "Vérifier : `explain()` — COLLSCAN ? Données 100x plus volumineuses qu'en dev ? Index manquant ou mal ordonné ? Le profiler confirme.",
          },
          {
            label: "Connexion refusée",
            value:
              "Vérifier : serveur démarré ? `bindIp` autorise-t-il cette interface ? Firewall ? Identifiants et base d'authentification (`authSource`) corrects ?",
          },
          {
            label: "Écritures qui échouent après bascule",
            value:
              "Vérifier : l'application écrit-elle toujours sur l'ancien primaire ? Le driver gère la bascule si l'URI liste plusieurs nœuds (replica set), pas avec une URI à un seul hôte.",
          },
          {
            label: "Disque plein",
            value:
              "Vérifier : croissance des données vs prévisions, oplog surdimensionné, logs non rotatés. Prévenir avec des alertes, pas constater.",
          },
          {
            label: "Résultats incohérents entre lectures",
            value:
              "Vérifier : lectures sur secondaires avec `readPreference` inadapté (données en retard), ou écritures sans `writeConcern: majority` perdues lors d'une bascule.",
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
      "Tester du code qui parle à MongoDB : les trois approches.",
    blocks: [
      {
        kind: "fields",
        title: "Stratégies",
        fields: [
          {
            label: "Base de test dédiée",
            value:
              "Des tests d'intégration contre un vrai MongoDB (conteneur Docker éphémère) : le seul moyen de tester réellement requêtes et agrégations. Nettoyer entre les tests.",
          },
          {
            label: "Mocks (avec prudence)",
            value:
              "Des doublures en mémoire pour les tests unitaires de logique métier. Ne jamais s'en servir pour valider des requêtes : un mock ne connaît pas le MQL.",
          },
          {
            label: "Jeux de données figés",
            value:
              "Un dataset de test versionné (avec DVC, par exemple) : les mêmes tests sur les mêmes données, en local comme en CI.",
          },
        ],
      },
    ],
  },
  {
    id: "migration-relationnel",
    title: "Migrer depuis le relationnel",
    level: 3,
    intro:
      "Passer d'un schéma SQL à des documents : la méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lister les requêtes",
            detail:
              "Recenser les requêtes réelles de l'application (pas le schéma théorique) : ce sont elles qui dictent la forme des documents.",
          },
          {
            title: "Identifier les agrégats",
            detail:
              "Regrouper par ce qui est lu ensemble : une commande avec ses lignes devient un document, pas N tables jointes.",
          },
          {
            title: "Décider imbriquer vs référencer",
            detail:
              "Pour chaque relation : cycle de vie commun et lecture conjointe → imbriquer ; partagé/volumineux/indépendant → référencer.",
          },
          {
            title: "Migrer par étapes",
            detail:
              "Double écriture temporaire (ancien + nouveau), validation des écarts, bascule des lectures, puis extinction de l'ancien. Jamais de big bang sur des données critiques.",
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
      "Les pièges classiques des utilisateurs MongoDB.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Update sans opérateur",
            value:
              "Problem : `updateOne(filtre, { prix: 69 })` remplace tout le document au lieu de modifier le prix. Why : oubli de `$set`. Better : toujours un opérateur (`$set`, `$inc`…) sauf remplacement volontaire.",
          },
          {
            label: "Aucun index en production",
            value:
              "Problem : tout fonctionne en dev, tout s'effondre avec 1M de documents. Why : les COLLSCAN sont invisibles sur petits volumes. Better : `explain()` systématique avant mise en production.",
          },
          {
            label: "Joindre au lieu d'imbriquer",
            value:
              "Problem : des `$lookup` partout, des performances de base relationnelle sans ses optimisations. Why : modélisation relationnelle plaquée sur du documentaire. Better : modéliser par agrégats, imbriquer ce qui est lu ensemble.",
          },
          {
            label: "Documents qui gonflent sans limite",
            value:
              "Problem : un tableau imbriqué qui grandit indéfiniment (tous les avis, tout l'historique) approche les 16 Mo. Why : imbrication sans borne. Better : borner (`$slice`, capped) ou référencer au-delà d'un seuil.",
          },
          {
            label: "Dates en string",
            value:
              "Problem : tris et plages de dates faux ou lents. Why : stockage en texte. Better : type Date BSON dès le départ.",
          },
          {
            label: "Base exposée sans auth",
            value:
              "Problem : `bindIp: 0.0.0.0` sans authentification = base publique. Why : configuration par défaut recopiée. Better : auth activée, bindIp restreint, firewall.",
          },
          {
            label: "Un client par requête",
            value:
              "Problem : épuisement des connexions serveur. Why : `new MongoClient()` à chaque appel. Better : un client unique réutilisé (pool intégré).",
          },
          {
            label: "Sauvegarde jamais testée",
            value:
              "Problem : le jour où il faut restaurer, le dump est corrompu ou incomplet. Why : on sauvegarde, on ne restaure jamais. Better : restauration testée périodiquement sur environnement isolé.",
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
          "Modéliser par les requêtes : lister les accès réels avant de dessiner les documents.",
          "Indexer avec intention : chaque index se justifie par une requête, et se paie à l'écriture.",
          "Valider le schéma quand il se stabilise : flexible au début, garde-fous ensuite.",
          "Dates en Date, monnaie en Decimal128 : les types corrects dès le départ.",
          "Un seul client driver réutilisé : jamais de connexion par requête.",
          "Auth + TLS + moindre privilège : la sécurité n'est pas optionnelle en production.",
          "Sauvegardes automatisées ET restaurations testées.",
          "Monitorer : requêtes lentes, connexions, disque, santé du replica set.",
          "Tester contre un vrai MongoDB en intégration, pas contre des mocks pour les requêtes.",
          "Documenter les choix de modélisation : dans six mois, personne ne se souviendra pourquoi tel champ est imbriqué.",
        ],
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets avancés",
    level: 3,
    intro:
      "Trois projets pour un niveau production.",
    blocks: [
      {
        kind: "fields",
        title: "À réaliser",
        fields: [
          {
            label: "API multi-tenant avec validation",
            value:
              "API Node.js + validation `$jsonSchema` + index composés + pagination : une base applicative complète et propre.",
          },
          {
            label: "Pipeline analytique temps réel",
            value:
              "Change streams → agrégations → dashboard : des événements bruts aux indicateurs, sans batch nocturne.",
          },
          {
            label: "Cluster durci",
            value:
              "Replica set avec auth + TLS, sauvegardes automatisées et restauration testée, monitoring des requêtes lentes : la production miniature.",
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
          { label: "Documentation MongoDB", value: "mongodb.com/docs : la référence complète — MQL, agrégation, réplication, sharding, sécurité." },
          { label: "MongoDB University", value: "learn.mongodb.com : cours gratuits et progressifs, avec labs pratiques." },
          { label: "Référence des opérateurs", value: "La page des opérateurs MQL : le dictionnaire à garder ouvert pendant l'apprentissage." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : le dataset d'exemple `sample_mflix` (Atlas) pour s'exercer sur des données réalistes.",
          "Guides : la documentation des drivers du langage utilisé (Node.js, Python) pour l'intégration applicative.",
          "Communauté : les forums MongoDB et Stack Overflow pour les cas limites de modélisation.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "MongoDB maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Élargir aux bases relationnelles : SQL puis PostgreSQL pour comparer les modèles et choisir en connaissance de cause.",
          "Ajouter le cache : Redis pour soulager la base sur les lectures chaudes.",
          "Industrialiser la donnée : data engineering pour des pipelines d'ingestion solides.",
          "Revenir à la roadmap : valider MongoDB et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "replica-sets-avance",
    title: "Réplication : replica sets",
    level: 3,
    intro:
      "La haute disponibilité MongoDB : un primaire, des secondaires.",
    blocks: [
      {
        kind: "diagram",
        title: "Replica set",
        lines: [
          "        ┌─ SECONDARY (lecture possible)",
          "        │",
          "CLIENT ─┼─ PRIMARY (écritures)",
          "        │",
          "        └─ SECONDARY (lecture possible)",
          "",
          "Le PRIMARY reçoit les écritures et les réplique",
          "sur les SECONDARY via l'oplog.",
          "Si le PRIMARY tombe : élection automatique d'un",
          "nouveau PRIMARY parmi les secondaires.",
        ],
      },
      {
        kind: "list",
        items: [
          "Minimum 3 nœuds pour une élection fiable (majorité).",
          "En cas de panne du primaire, bascule automatique en quelques secondes — l'application se reconnecte.",
          "Les lectures secondaires sont possibles mais peuvent être légèrement en retard (eventual consistency).",
          "`rs.status()` dans `mongosh` pour inspecter l'état du set.",
        ],
      },
    ],
  },
  {
    id: "sharding-avance",
    title: "Sharding : répartir sur plusieurs serveurs",
    level: 3,
    intro:
      "Quand un serveur ne suffit plus : la distribution horizontale.",
    blocks: [
      {
        kind: "fields",
        title: "Concepts",
        fields: [
          {
            label: "Shard",
            value:
              "Un fragment des données : chaque shard (lui-même un replica set) détient une partie de la collection.",
          },
          {
            label: "Shard key",
            value:
              "La clé de répartition : le champ qui décide sur quel shard va chaque document. Le choix le plus critique du sharding — une mauvaise clé crée des shards déséquilibrés.",
          },
          {
            label: "mongos",
            value:
              "Le routeur : l'application se connecte à `mongos`, qui redirige chaque requête vers le bon shard. Transparent pour le code.",
          },
          {
            label: "Config servers",
            value:
              "Les métadonnées du cluster : quel document est sur quel shard. Eux aussi en replica set.",
          },
        ],
      },
      {
        kind: "text",
        text: "À ne pas précipiter : le sharding ajoute une complexité opérationnelle réelle. La plupart des applications n'en ont jamais besoin — un replica set bien dimensionné suffit longtemps.",
      },
    ],
  },
  {
    id: "aggregation-avance",
    title: "Agrégation avancée",
    level: 3,
    intro:
      "Aller au-delà des bases : les opérateurs qui changent tout.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Lookup, unwind, group : le trio puissant",
        code: "db.commandes.aggregate([\n  // Jointure avec les clients\n  { $lookup: {\n    from: \"clients\",\n    localField: \"clientId\",\n    foreignField: \"_id\",\n    as: \"client\"\n  }},\n  { $unwind: \"$client\" },\n  // Total par client, trié\n  { $group: {\n    _id: \"$client.nom\",\n    total: { $sum: \"$montant\" },\n    nb: { $sum: 1 }\n  }},\n  { $sort: { total: -1 } },\n  { $limit: 10 }\n])",
      },
      {
        kind: "list",
        items: [
          "`$lookup` : la jointure MongoDB — à utiliser avec modération (signe possible d'un schéma trop relationnel).",
          "`$unwind` : éclate un tableau en documents — attention au volume généré.",
          "`$facet` : plusieurs agrégations en une passe (ex. résultats + total pour la pagination).",
          "Les pipelines lourds se testent avec `explain` et se déplacent vers des vues matérialisées si besoin.",
        ],
      },
    ],
  },
  {
    id: "schema-design-patterns",
    title: "Patterns de modélisation",
    level: 3,
    intro:
      "Les schémas éprouvés : au-delà d'embed vs reference.",
    blocks: [
      {
        kind: "fields",
        title: "Patterns courants",
        fields: [
          {
            label: "Bucket",
            value:
              "Regrouper des mesures temporelles par paquets (ex. une journée de capteurs par document) : divise le nombre de documents et accélère les requêtes temporelles.",
          },
          {
            label: "Computed",
            value:
              "Pré-calculer les agrégats (total, moyenne) dans le document au lieu de les recalculer à chaque lecture : écriture un peu plus chère, lecture instantanée.",
          },
          {
            label: "Subset",
            value:
              "Ne dupliquer qu'une partie des données liées (ex. les 5 derniers commentaires) : le compromis entre embed complet et reference.",
          },
          {
            label: "Polymorphic",
            value:
              "Stocker des variantes dans une même collection avec un champ discriminant : quand les entités partagent l'essentiel de leur structure.",
          },
        ],
      },
    ],
  },
];

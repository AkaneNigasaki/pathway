import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Node.js : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Pédagogie centrale : l'event loop, la distinction runtime/langage/npm,
 * et les modules ESM vs CommonJS.
 */
export const LEARNING_NODEJS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Node.js, ce qu'il n'est pas, et pourquoi il a changé la façon d'écrire du JavaScript.",
    blocks: [
      {
        kind: "text",
        text: "Node.js est un environnement d'exécution (runtime) qui permet d'exécuter du JavaScript en dehors du navigateur : sur un serveur, dans un terminal, sur un objet connecté. Il est construit sur le moteur V8 de Chrome (celui qui exécute le JavaScript dans le navigateur) et ajoute ce que le navigateur ne fournit pas : accès aux fichiers, au réseau, aux processus du système.",
      },
      {
        kind: "text",
        text: "Conséquence directe : avec le seul JavaScript, vous pouvez écrire une API web, un outil en ligne de commande, un script d'automatisation ou un serveur temps réel. C'est cette unification du langage entre le client et le serveur qui a fait le succès de Node.js, créé par Ryan Dahl en 2009 et aujourd'hui maintenu par la fondation OpenJS.",
      },
      {
        kind: "fields",
        title: "Node.js en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Node.js exécute du JavaScript côté serveur grâce au moteur V8 et à une boucle d'événements qui gère des milliers de connexions avec un seul fil d'exécution.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Avant Node.js, le JavaScript ne vivait que dans le navigateur : pour un backend, il fallait un autre langage (PHP, Java, Python…). Node.js a permis d'utiliser le même langage des deux côtés et d'exploiter le modèle asynchrone de JavaScript pour des serveurs très concurrents.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "API REST, applications temps réel (chat, tableaux de bord), outils en ligne de commande, scripts d'automatisation, serveurs de fichiers, prototypage rapide. Moins adapté aux calculs lourds et parallèles (traitement d'image, calcul scientifique) : un seul fil JavaScript s'y sature vite.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un langage (c'est du JavaScript), ni un framework (il n'impose aucune structure d'application), ni un serveur web clé en main comme Apache : c'est une boîte à outils bas niveau pour construire des programmes réseau.",
          },
        ],
      },
    ],
  },
  {
    id: "runtime-vs-langage-vs-npm",
    title: "Runtime, langage et npm : la distinction",
    level: 1,
    intro:
      "Trois mots que l'on confond souvent. Les distinguer évite la moitié des incompréhensions.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois couches",
        lines: [
          "┌─────────────────────────────────────────────┐",
          "│  Votre programme                            │",
          "│  (serveur HTTP, CLI, script…)               │",
          "├─────────────────────────────────────────────┤",
          "│  JavaScript — le LANGAGE                    │",
          "│  (syntaxe, types, async/await…)             │",
          "├─────────────────────────────────────────────┤",
          "│  Node.js — le RUNTIME                       │",
          "│  V8 (exécute le JS) + libuv (I/O async)     │",
          "│  + modules natifs : fs, http, path, os…     │",
          "├─────────────────────────────────────────────┤",
          "│  npm — le GESTIONNAIRE DE PAQUETS           │",
          "│  (télécharge et installe des bibliothèques │",
          "│   tierces : Express, dotenv, vitest…)       │",
          "└─────────────────────────────────────────────┘",
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Le langage : JavaScript",
            value:
              "La syntaxe et la sémantique : variables, fonctions, objets, promesses. C'est le prérequis : Node.js n'ajoute aucun mot-clé au langage, il ajoute des API (objets et fonctions) disponibles dans l'environnement.",
          },
          {
            label: "Le runtime : Node.js",
            value:
              "Le programme `node` qui lit votre fichier `.js` et l'exécute. Il fournit le moteur V8, la boucle d'événements (event loop) pour l'asynchrone, et des modules intégrés (`fs` pour les fichiers, `http` pour le réseau, `path`, `os`, `crypto`…). Dans le navigateur, l'équivalent est fourni par le navigateur lui-même (`document`, `fetch`, `localStorage`).",
          },
          {
            label: "npm : le gestionnaire de paquets",
            value:
              "L'outil livré avec Node.js qui installe des bibliothèques tierces depuis le registre npm (des millions de paquets). `npm install express` télécharge Express dans le dossier `node_modules` de votre projet. npm n'est pas Node.js : c'est un programme séparé qui l'accompagne.",
          },
          {
            label: "npx : l'exécuteur",
            value:
              "`npx` exécute un paquet sans l'installer durablement : `npx tsc --version` télécharge TypeScript temporairement, l'exécute, puis le jette. Pratique pour essayer un outil ou lancer un utilitaire ponctuel.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Dire « j'ai appris Node » en ayant appris Express : vous avez appris une bibliothèque, pas le runtime. Les deux comptent, mais les débogages difficiles (fuite mémoire, event loop bloquée, erreurs ESM) exigent de comprendre le runtime lui-même.",
          },
          {
            label: "Bonne pratique",
            value:
              "Quand quelque chose casse, demandez-vous à quelle couche appartient le problème : syntaxe JavaScript ? API Node.js (`fs`, `http`) ? paquet tiers (version, configuration) ? Le diagnostic devient méthodique au lieu d'être du tâtonnement.",
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
    intro: "Ce qu'il faut maîtriser avant de se lancer — et ce qui peut attendre.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Indispensable : JavaScript",
            value:
              "Variables, fonctions, objets, tableaux, et surtout l'asynchrone : callbacks, promesses, `async`/`await`. Node.js est presque entièrement asynchrone : sans ces bases, chaque exemple semblera magique.",
          },
          {
            label: "Utile : le terminal",
            value:
              "Naviguer dans les dossiers (`cd`, `ls`), lancer des commandes, comprendre les variables d'environnement. Rien d'avancé : la pratique quotidienne suffit.",
          },
          {
            label: "Utile : HTTP",
            value:
              "Les notions de requête/réponse, méthodes GET/POST, codes de statut (200, 404, 500). Indispensable dès que vous écrirez une API, inutile pour un premier script.",
          },
          {
            label: "Peut attendre",
            value:
              "TypeScript, Docker, les bases de données, le déploiement : ce sont des couches que l'on ajoute quand le besoin apparaît, pas des prérequis.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro: "Installer Node.js proprement et comprendre les versions LTS.",
    blocks: [
      {
        kind: "text",
        text: "La méthode la plus simple : télécharger l'installateur depuis la page officielle (nodejs.org, section téléchargement). Mais pour un usage professionnel, préférez un gestionnaire de versions comme `nvm` (section suivante) : il permet d'installer plusieurs versions de Node.js côte à côte et d'en changer en une commande.",
      },
      {
        kind: "fields",
        title: "Comprendre les versions",
        fields: [
          {
            label: "Version LTS",
            value:
              "LTS signifie « Long Term Support » : une version maintenue et corrigée pendant 30 mois, recommandée pour la production et pour apprendre. Les versions impaires (21, 23…) sont des versions de développement, de courte durée de vie : à éviter sauf besoin précis.",
          },
          {
            label: "Version Current",
            value:
              "La toute dernière version, avec les nouveautés du moment mais un support court. Intéressante pour tester, risquée pour un projet qui doit durer.",
          },
          {
            label: "Quelle version choisir",
            value:
              "La LTS la plus récente. Elle est stable, documentée, et c'est celle que les tutoriels, les hébergeurs et les employeurs utilisent. Vérifiez ensuite avec `node --version`.",
          },
        ],
      },
      {
        kind: "command",
        label: "Vérifier l'installation",
        command: "node --version && npm --version",
        why: "Confirme que le runtime `node` et le gestionnaire `npm` sont installés et affiche leurs versions. Si la commande est introuvable, l'installation n'a pas abouti ou le terminal doit être redémarré.",
        verify: "Les deux commandes affichent un numéro de version (par exemple `v22.x.x` pour node).",
      },
    ],
  },
  {
    id: "nvm",
    title: "Gérer les versions avec nvm",
    level: 2,
    intro:
      "Pourquoi les professionnels n'installent presque jamais Node.js « directement ».",
    blocks: [
      {
        kind: "text",
        text: "`nvm` (Node Version Manager) installe et fait cohabiter plusieurs versions de Node.js sur la même machine. En pratique : le projet A exige Node 20, le projet B tourne sur Node 22, et vous voulez tester la nouveauté du mois — `nvm` permet de passer de l'une à l'autre sans réinstaller quoi que ce soit.",
      },
      {
        kind: "command",
        label: "Installer la dernière LTS",
        command: "nvm install --lts",
        why: "Télécharge et installe la version LTS la plus récente, sans toucher aux autres versions déjà présentes. C'est la commande d'installation recommandée quand on débute.",
      },
      {
        kind: "command",
        label: "Utiliser une version",
        command: "nvm use --lts",
        why: "Bascule le terminal courant sur la version LTS installée. Utile quand plusieurs versions cohabitent : chaque projet peut ainsi utiliser « sa » version.",
      },
      {
        kind: "command",
        label: "Lister les versions installées",
        command: "nvm ls",
        why: "Affiche les versions de Node.js installées localement et indique laquelle est active. Le premier réflexe quand « ça marchait hier » : vérifier qu'on est sur la bonne version.",
        verify: "La version marquée comme active correspond à celle affichée par `node --version`.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`nvm` est un sélecteur de version : il installe plusieurs Node.js et active celui que le projet demande.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Les projets n'évoluent pas au même rythme : figer chaque projet sur « sa » version évite les régressions quand une nouvelle version de Node.js sort.",
          },
          {
            label: "Note Windows",
            value:
              "`nvm` (nvm-sh) est conçu pour macOS et Linux. Sur Windows, l'équivalent usuel est `nvm-windows`, un projet distinct avec des commandes proches.",
          },
          {
            label: "Alternative",
            value:
              "D'autres gestionnaires existent (`fnm`, `volta`…), avec la même philosophie. Le concept — une version par projet — compte plus que l'outil choisi.",
          },
        ],
      },
    ],
  },
  {
    id: "node-cli",
    title: "Le binaire `node` : REPL, fichiers, options",
    level: 2,
    intro: "Les trois façons d'utiliser la commande `node` au quotidien.",
    blocks: [
      {
        kind: "command",
        label: "Ouvrir le REPL",
        command: "node",
        why: "Sans argument, `node` ouvre un interpréteur interactif (REPL : Read, Eval, Print, Loop) : vous tapez du JavaScript, il l'exécute aussitôt. Idéal pour tester une expression, une fonction ou une API en quelques secondes. Quittez avec `.exit` ou Ctrl+D.",
      },
      {
        kind: "command",
        label: "Exécuter un fichier",
        command: "node app.js",
        why: "La commande la plus courante : exécute le fichier `app.js` de bout en bout, puis se termine. C'est ainsi que tournent les scripts, les outils CLI et les serveurs (qui, eux, ne se terminent pas car ils restent à l'écoute).",
      },
      {
        kind: "command",
        label: "Relancer automatiquement à chaque modification",
        command: "node --watch app.js",
        why: "Le mode `watch` intégré redémarre le programme dès qu'un fichier change. Parfait en développement : plus besoin de stopper/relancer à la main. Ajouté dans Node 18, il remplace dans la plupart des cas l'outil tiers `nodemon` pour un usage simple.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Options utiles à connaître",
            value:
              "`--version` (afficher la version), `--help` (aide), `-e \"code\"` (exécuter un extrait directement, ex. `node -e \"console.log(2+2)\"`), `--inspect` (débogage, voir la section dédiée), `--test` (lancer les tests natifs).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Lancer `node` dans le mauvais dossier puis s'étonner que `app.js` soit introuvable : la commande cherche le fichier dans le dossier courant du terminal, pas dans le dossier du projet ouvert dans l'éditeur.",
          },
        ],
      },
    ],
  },
  {
    id: "npm",
    title: "npm : installer et lancer des paquets",
    level: 2,
    intro: "Le gestionnaire de paquets livré avec Node.js, en cinq commandes.",
    blocks: [
      {
        kind: "command",
        label: "Initialiser un projet",
        command: "npm init -y",
        why: "Crée le fichier `package.json` qui décrit le projet (nom, version, dépendances, scripts). L'option `-y` accepte les valeurs par défaut pour aller vite ; on peut les ajuster ensuite.",
        verify: "Un fichier `package.json` apparaît dans le dossier courant.",
      },
      {
        kind: "command",
        label: "Installer une dépendance",
        command: "npm install express",
        why: "Télécharge le paquet `express` depuis le registre npm dans le dossier `node_modules`, et l'ajoute aux `dependencies` du `package.json`. Le projet peut ensuite l'importer avec `import express from \"express\"`.",
        verify: "`node_modules/express` existe et `package.json` contient `\"express\"` dans `dependencies`.",
      },
      {
        kind: "command",
        label: "Installer un outil de développement",
        command: "npm install --save-dev vitest",
        why: "L'option `--save-dev` enregistre le paquet dans `devDependencies` : nécessaire pour développer et tester, mais inutile en production (tests, linters, outils de build). Cela permet d'installer uniquement le nécessaire sur le serveur avec `npm install --omit=dev`.",
      },
      {
        kind: "command",
        label: "Lancer un script du projet",
        command: "npm run dev",
        why: "Exécute le script nommé `dev` défini dans la section `scripts` du `package.json` (par exemple `\"dev\": \"node --watch app.js\"`). Les scripts centralisent les commandes du projet : tout le monde lance la même chose, sans mémoriser d'options.",
      },
      {
        kind: "command",
        label: "Exécuter un paquet sans l'installer",
        command: "npx create-react-app mon-app",
        why: "`npx` télécharge le paquet, l'exécute une fois, puis le jette : aucun résidu dans le projet. C'est le mécanisme derrière tous les générateurs de projet (`create-*`). À ne pas confondre avec `npm install -g`, qui installe durablement sur la machine.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "`package-lock.json`",
            value:
              "Généré automatiquement à chaque installation, il fige les versions exactes installées (y compris les dépendances des dépendances). Le committer dans Git garantit que toute l'équipe — et le serveur — installe exactement les mêmes versions.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne commitez jamais `node_modules` (il se régénère avec `npm install`), mais commitez toujours `package.json` ET `package-lock.json`.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-script",
    title: "Premier script : tutoriel pas à pas",
    level: 2,
    intro: "De zéro à un script qui fonctionne, en six étapes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le dossier du projet",
            detail:
              "Créez un dossier `mon-premier-node` et ouvrez un terminal dedans. Un projet Node.js = un dossier avec un `package.json` (même minimal).",
          },
          {
            title: "Initialiser le projet",
            detail:
              "Lancez `npm init -y` : le fichier `package.json` est créé. Ajoutez-y `\"type\": \"module\"` pour utiliser la syntaxe moderne `import`/`export` (voir la section ESM vs CommonJS).",
          },
          {
            title: "Écrire le script",
            detail:
              "Créez `bonjour.js` avec : `console.log(\"Bonjour depuis Node.js !\");` puis `console.log(\"Version :\", process.version);` — `process` est un objet global fourni par Node.js (pas par le langage).",
          },
          {
            title: "Exécuter",
            detail:
              "Lancez `node bonjour.js`. Le texte s'affiche, le programme se termine. Vous venez d'exécuter du JavaScript hors navigateur.",
          },
          {
            title: "Ajouter un script npm",
            detail:
              "Dans `package.json`, ajoutez `\"scripts\": { \"start\": \"node bonjour.js\" }`. Désormais `npm start` lance le programme : la commande est documentée dans le projet lui-même.",
          },
          {
            title: "Expérimenter dans le REPL",
            detail:
              "Lancez `node` seul, tapez `process.platform` puis `process.cwd()` : vous explorez l'API du runtime en direct. C'est la façon la plus rapide d'apprendre ce que Node.js met à disposition.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-serveur-http",
    title: "Premier serveur HTTP avec la stdlib",
    level: 2,
    intro: "Un serveur web fonctionnel en dix lignes, sans aucune dépendance.",
    blocks: [
      {
        kind: "text",
        text: "Le module intégré `node:http` suffit à créer un vrai serveur web. L'exemple ci-dessous répond « Bonjour » à chaque requête : c'est le même mécanisme, en miniature, que celui des frameworks comme Express.",
      },
      {
        kind: "code",
        language: "js",
        title: "serveur.js — sans dépendance",
        code: "import http from \"node:http\";\n\nconst serveur = http.createServer((requete, reponse) => {\n  reponse.writeHead(200, { \"Content-Type\": \"text/plain; charset=utf-8\" });\n  reponse.end(\"Bonjour depuis Node.js !\\n\");\n});\n\nserveur.listen(3000, () => {\n  console.log(\"Serveur à l'écoute sur http://localhost:3000\");\n});",
      },
      {
        kind: "command",
        label: "Lancer le serveur",
        command: "node --watch serveur.js",
        why: "Démarre le serveur et le relance à chaque modification du fichier. Le programme ne se termine pas : il reste à l'écoute des connexions entrantes sur le port 3000.",
        verify: "Ouvrez http://localhost:3000 dans le navigateur : la page affiche « Bonjour depuis Node.js ! ».",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "`createServer` crée un serveur ; la fonction passée en argument est appelée à chaque requête reçue, avec l'objet `requete` (ce que le client demande) et `reponse` (ce qu'on lui renvoie). `listen(3000)` ouvre le port 3000 et attend.",
          },
          {
            label: "Pourquoi c'est important",
            value:
              "Comprendre ce code, c'est comprendre ce que les frameworks automatisent : le routage (quelle fonction pour quelle URL), l'analyse du corps des requêtes, la gestion des erreurs. Quand Express fera tout cela pour vous, vous saurez ce qu'il fait réellement.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `reponse.end(...)` : sans lui, la réponse n'est jamais terminée et le navigateur « charge » indéfiniment. Chaque requête doit toujours se terminer par une réponse.",
          },
        ],
      },
    ],
  },
  {
    id: "variables-environnement",
    title: "Variables d'environnement et `.env`",
    level: 2,
    intro: "Configurer un programme sans écrire de secrets dans le code.",
    blocks: [
      {
        kind: "text",
        text: "Un programme a besoin de paramètres qui changent selon l'environnement : le port d'écoute, l'URL de la base de données, les clés d'API. Les écrire en dur dans le code est une faute professionnelle (le code est partagé sur Git ; les secrets ne doivent jamais y figurer). La solution : les variables d'environnement, lues via `process.env`.",
      },
      {
        kind: "code",
        language: "js",
        title: "Lire la configuration depuis l'environnement",
        code: "const PORT = process.env.PORT || 3000;\nconst CLE_API = process.env.CLE_API;\n\nif (!CLE_API) {\n  console.error(\"Erreur : la variable CLE_API n'est pas définie.\");\n  process.exit(1);\n}\n\nconsole.log(\"Démarrage sur le port \" + PORT);",
      },
      {
        kind: "command",
        label: "Définir une variable pour une exécution",
        command: "PORT=8080 node serveur.js",
        why: "Définit `PORT` uniquement pour cette exécution : le programme lira `process.env.PORT` et écoutera sur le port 8080. Sous Windows (cmd), la syntaxe équivalente est `set PORT=8080 && node serveur.js`.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Le fichier `.env`",
            value:
              "En développement, on regroupe ces variables dans un fichier `.env` à la racine (`PORT=3000`, une par ligne). Node.js sait le charger nativement depuis la version 20.6 avec l'option `--env-file=.env` ; avant cela, le paquet `dotenv` (très répandu) faisait ce travail.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ajoutez `.env` au `.gitignore` : il contient des secrets et ne doit jamais être commité. Fournissez à la place un `.env.example` avec les noms des variables mais des valeurs factices, pour documenter ce que le projet attend.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`process.env.PORT` est toujours une chaîne de caractères : `process.env.PORT + 1` donne `\"30001\"`, pas `3001`. Convertissez avec `Number(...)` quand vous faites des calculs.",
          },
        ],
      },
    ],
  },
  {
    id: "editeurs-outils",
    title: "Éditeurs et outils",
    level: 2,
    intro: "S'équiper pour développer confortablement avec Node.js.",
    blocks: [
      {
        kind: "fields",
        title: "Éditeurs, par profil",
        fields: [
          {
            label: "VS Code",
            value:
              "Le choix le plus courant : débogage Node.js intégré (point d'arrêt, inspection des variables sans quitter l'éditeur), terminal intégré, énorme catalogue d'extensions. Le débogueur se configure en un fichier `launch.json` généré semi-automatiquement.",
          },
          {
            label: "WebStorm",
            value:
              "IDE payant de JetBrains : analyse JavaScript très poussée, débogage et tests intégrés dès l'installation, sans configuration. Apprécié dans les équipes qui préfèrent un outil clé en main.",
          },
          {
            label: "Neovim / Zed / Sublime Text",
            value:
              "Éditeurs légers et rapides, configurables via le protocole LSP pour l'autocomplétion et les diagnostics. Demande plus de réglages initiaux, mais convient aux habitués du clavier.",
          },
          {
            label: "Ce qui compte vraiment",
            value:
              "Moins l'éditeur que trois capacités : lancer le programme depuis l'éditeur, poser des points d'arrêt, et voir les erreurs de typage/syntaxe au fil de la frappe. Tout éditeur moderne configuré avec le LSP JavaScript/TypeScript les offre.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Outils du quotidien",
        fields: [
          {
            label: "Le terminal",
            value:
              "C'est là que vivent `node`, `npm` et `npx` : un développeur Node.js y passe une partie significative de sa journée. Un terminal avec onglets et un historique de commandes confortable change la vie.",
          },
          {
            label: "Un client HTTP",
            value:
              "Pour tester une API : `curl` en ligne de commande, ou une application comme Postman ou Insomnia pour les requêtes complexes. Vérifier une route à la main avant d'écrire son test automatisé est une habitude saine.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow professionnel",
    level: 2,
    intro: "À quoi ressemble une journée de développement Node.js.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de développement typique",
        lines: [
          "1. npm install          → récupérer les dépendances",
          "2. npm run dev          → lance node --watch : redémarrage auto",
          "3. Éditer le code      → le serveur recharge tout seul",
          "4. Tester à la main    → curl / navigateur / client HTTP",
          "5. npm test            → lancer la suite de tests",
          "6. npm run lint        → vérifier le style et les erreurs",
          "7. git commit          → versionner le travail",
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Les scripts npm comme documentation",
            value:
              "Un `package.json` bien tenu contient `dev`, `start`, `test`, `lint` : un nouveau développeur clone le dépôt, lit ces quatre scripts, et sait travailler. C'est la convention la plus rentable d'un projet Node.js.",
          },
          {
            label: "Bonne pratique",
            value:
              "Le script `start` doit lancer l'application en mode production (`node app.js`), `dev` en mode développement (`node --watch app.js`). Cette distinction évite de déployer par accident un serveur en mode debug.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "modules-esm-commonjs",
    title: "Modules : ESM vs CommonJS",
    level: 3,
    intro:
      "Le sujet qui cause le plus d'erreurs cryptiques aux débutants : deux systèmes de modules cohabitent.",
    blocks: [
      {
        kind: "text",
        text: "JavaScript a longtemps manqué de système de modules officiel : Node.js a inventé le sien, CommonJS (`require` / `module.exports`). Puis le langage a standardisé les modules ECMAScript, ESM (`import` / `export`). Node.js supporte les deux depuis la version 12, et il faut savoir lequel votre fichier utilise — car les mélanger produit des erreurs comme `ERR_REQUIRE_ESM` ou `Cannot use import statement outside a module`.",
      },
      {
        kind: "table",
        headers: ["", "CommonJS (historique)", "ESM (moderne)"],
        rows: [
          ["Syntaxe", "`const x = require(\"x\")`", "`import x from \"x\"`"],
          ["Export", "`module.exports = …`", "`export …`"],
          ["Chargement", "Synchrone, dynamique", "Asynchrone, statique (analysé avant exécution)"],
          ["Fichiers", "`.cjs` ou défaut sans `\"type\"`", "`.mjs` ou `\"type\": \"module\"` dans package.json"],
          ["Usage", "Ancien code, nombreux paquets", "Nouveaux projets, navigateurs, standard du langage"],
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "CommonJS est le système historique de Node.js, ESM est le standard du langage : les projets récents utilisent ESM.",
          },
          {
            label: "Pourquoi deux systèmes",
            value:
              "Node.js est né en 2009, six ans avant la standardisation des modules JavaScript (2015). Il a fallu inventer une solution en attendant — CommonJS — puis supporter les deux pour ne pas casser des millions de projets existants.",
          },
          {
            label: "Que choisir aujourd'hui",
            value:
              "ESM pour tout nouveau projet : c'est le standard, il fonctionne aussi dans le navigateur, et l'écosystème migre dans ce sens. CommonJS reste à connaître car une grande partie du code existant et de nombreux paquets l'utilisent encore.",
          },
          {
            label: "Comment Node.js décide",
            value:
              "Par l'extension et le `package.json` le plus proche : `.mjs` = toujours ESM, `.cjs` = toujours CommonJS, `.js` = ESM si le `package.json` contient `\"type\": \"module\"`, sinon CommonJS.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`SyntaxError: Cannot use import statement outside a module` : le fichier est traité en CommonJS (pas de `\"type\": \"module\"`) mais utilise `import`. Solution : ajouter `\"type\": \"module\"` au `package.json`.",
          },
          {
            label: "Concepts liés",
            value: "Sections `require-vs-import`, `package-json`, `node-modules-resolution`.",
          },
        ],
      },
    ],
  },
  {
    id: "require-vs-import",
    title: "`require` vs `import` en pratique",
    level: 3,
    intro: "Ce qui change concrètement entre les deux syntaxes.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "CommonJS — maths.cjs",
        code: "function addition(a, b) {\n  return a + b;\n}\n\nmodule.exports = { addition };\n\n// Utilisation :\n// const { addition } = require(\"./maths.cjs\");",
      },
      {
        kind: "code",
        language: "js",
        title: "ESM — maths.js (avec \"type\": \"module\")",
        code: "export function addition(a, b) {\n  return a + b;\n}\n\n// Utilisation :\n// import { addition } from \"./maths.js\";",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Différence clé : le caractère statique",
            value:
              "Les `import` ESM doivent être en haut du fichier et sont analysés avant l'exécution : les outils (bundlers, linters, TypeScript) peuvent vérifier et optimiser les dépendances. `require` peut être appelé n'importe où, même sous condition — plus souple, mais moins analysable.",
          },
          {
            label: "L'import dynamique",
            value:
              "ESM permet quand même le chargement conditionnel avec `await import(\"./module.js\")`, qui retourne une promesse. C'est la façon moderne de charger un module seulement quand on en a besoin (ex. charger un pilote de base de données selon la configuration).",
          },
          {
            label: "Interopérabilité",
            value:
              "Depuis ESM, on peut importer du CommonJS (`import pkg from \"paquet-cjs\"`) : Node.js convertit `module.exports` en export par défaut. L'inverse (`require` d'un module ESM) est interdit — d'où l'erreur `ERR_REQUIRE_ESM` quand un vieux code exige un paquet devenu ESM.",
          },
          {
            label: "Bonne pratique",
            value:
              "Dans un projet ESM, toujours inclure l'extension dans les imports relatifs (`\"./maths.js\"`, pas `\"./maths\"`) : Node.js ESM n'ajoute pas l'extension automatiquement, contrairement à CommonJS.",
          },
        ],
      },
    ],
  },
  {
    id: "package-json",
    title: "Anatomie du `package.json`",
    level: 3,
    intro: "Le fichier qui décrit et pilote tout projet Node.js.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json annoté",
        code: "{\n  \"name\": \"mon-api\",\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"main\": \"src/index.js\",\n  \"scripts\": {\n    \"dev\": \"node --watch src/index.js\",\n    \"start\": \"node src/index.js\",\n    \"test\": \"node --test\"\n  },\n  \"dependencies\": {\n    \"express\": \"^4.19.0\"\n  },\n  \"devDependencies\": {\n    \"vitest\": \"^2.0.0\"\n  },\n  \"engines\": {\n    \"node\": \">=20\"\n  }\n}",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "`name` / `version`",
            value:
              "L'identité du projet. `version` suit le versionnement sémantique (majeur.mineur.correctif) : indispensable si le projet est lui-même publié comme paquet.",
          },
          {
            label: "`type`",
            value:
              "`\"module\"` active ESM pour tous les `.js` du projet. Absent, les `.js` sont traités en CommonJS. C'est l'interrupteur vu dans la section ESM vs CommonJS.",
          },
          {
            label: "`main` / `exports`",
            value:
              "`main` indique le point d'entrée quand le projet est importé comme paquet. `exports` (plus moderne et précis) définit exactement quels fichiers sont importables par les consommateurs du paquet.",
          },
          {
            label: "`scripts`",
            value:
              "Les commandes du projet, lançables via `npm run <nom>` (`npm start` et `npm test` ont un raccourci sans `run`). C'est la documentation exécutable du workflow.",
          },
          {
            label: "`dependencies` vs `devDependencies`",
            value:
              "Ce qui doit tourner en production contre ce qui ne sert qu'au développement. Le `^` devant la version autorise les mises à jour mineures et correctives automatiques, pas les majeures (qui peuvent casser).",
          },
          {
            label: "`engines`",
            value:
              "Déclare la version minimale de Node.js requise (`\">=20\"`). Un garde-fou : `npm install` avertit si l'environnement ne convient pas. À renseigner dès qu'on utilise une API récente.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Modifier `dependencies` à la main sans lancer `npm install` : le `package.json` dit une chose, `node_modules` en contient une autre. Toujours installer via la commande, jamais en éditant le fichier.",
          },
        ],
      },
    ],
  },
  {
    id: "node-modules-resolution",
    title: "Comment Node.js résout les modules",
    level: 3,
    intro: "Ce qui se passe vraiment quand vous écrivez `import express from \"express\"`.",
    blocks: [
      {
        kind: "text",
        text: "Quand Node.js rencontre un import, il suit un algorithme de résolution : les chemins relatifs (`./`, `../`) sont cherchés tels quels ; les imports « nus » (`express`, `node:http`) sont cherchés d'abord parmi les modules natifs (`node:`), puis dans `node_modules`, en remontant les dossiers parents jusqu'à la racine.",
      },
      {
        kind: "diagram",
        title: "Résolution de `import express from \"express\"` depuis /projet/src/app.js",
        lines: [
          "1. Est-ce un module natif ? → non (pas de préfixe node:)",
          "2. /projet/src/node_modules/express ? → non",
          "3. /projet/node_modules/express ? → OUI",
          "4. Lit /projet/node_modules/express/package.json",
          "5. Suit \"exports\" (ou \"main\") → charge le fichier d'entrée",
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Pourquoi c'est utile à comprendre",
            value:
              "Trois classes de bugs deviennent limpides : le module introuvable (`Cannot find module` = pas installé ou mauvaise remontée), la double version d'un paquet (deux `node_modules` imbriqués chargent deux copies, et `instanceof` échoue entre elles), et les imports natifs à préfixer (`node:fs` plutôt que `fs`, plus explicite).",
          },
          {
            label: "Le dossier `node_modules`",
            value:
              "Il peut contenir des dizaines de milliers de fichiers (chaque paquet amène ses propres dépendances). C'est normal — et c'est pourquoi on ne le committe jamais et on le régénère avec `npm install`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Préfixez les modules natifs avec `node:` (`import fs from \"node:fs/promises\"`) : on distingue d'un coup d'œil ce qui vient du runtime de ce qui vient d'un paquet tiers.",
          },
        ],
      },
    ],
  },
  {
    id: "event-loop-vue-ensemble",
    title: "L'event loop : le modèle mental",
    level: 3,
    intro: "Le concept le plus important de Node.js : comment un seul fil gère des milliers de connexions.",
    blocks: [
      {
        kind: "text",
        text: "Le JavaScript ne s'exécute que sur un seul fil (thread) : une seule instruction à la fois. Le tour de force de Node.js est de ne jamais attendre : quand le programme demande une lecture de fichier ou une requête réseau, Node.js délègue l'attente au système d'exploitation (via la bibliothèque libuv) et continue d'exécuter du code. Quand l'opération se termine, sa fonction de rappel (callback) est placée dans une file d'attente, et la boucle d'événements (event loop) l'exécute dès que le fil est libre.",
      },
      {
        kind: "diagram",
        title: "Le cycle de vie d'une opération asynchrone",
        lines: [
          "Votre code",
          "   │  fs.readFile(\"data.txt\", rappel)",
          "   ▼",
          "Délégation à l'OS ──→ le fil continue aussitôt",
          "   │                    (autres requêtes, autres callbacks)",
          "   │  … le disque travaille en arrière-plan …",
          "   ▼",
          "Opération terminée → le rappel entre dans la file",
          "   ▼",
          "Event loop : fil libre ? → exécute le rappel",
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Node.js ne fait jamais attendre son unique fil : il délègue les opérations lentes et exécute leurs callbacks quand elles se terminent.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Le modèle classique (un fil par connexion, comme en Java ou PHP traditionnel) consomme beaucoup de mémoire à grande échelle. Le modèle événementiel traite des dizaines de milliers de connexions simultanées avec des ressources modestes — idéal pour les API et le temps réel.",
          },
          {
            label: "Quand ce modèle brille",
            value:
              "Beaucoup d'opérations d'entrée/sortie qui attendent : requêtes HTTP, lectures de fichiers, requêtes base de données. Le fil passe son temps à orchestrer, pas à attendre.",
          },
          {
            label: "Quand il souffre",
            value:
              "Les calculs lourds (chiffrement massif, traitement d'image, grosses boucles) : ils occupent le fil unique et bloquent tout le reste, y compris les autres requêtes. Voir la section sur les pièges.",
          },
          {
            label: "Concepts liés",
            value: "Sections `event-loop-phases`, `microtaches-vs-macrotaches`, `event-loop-pieges`.",
          },
        ],
      },
    ],
  },
  {
    id: "event-loop-phases",
    title: "Les phases de l'event loop",
    level: 3,
    intro: "Ce que la boucle fait exactement à chaque tour.",
    blocks: [
      {
        kind: "text",
        text: "L'event loop n'est pas une file unique : c'est une boucle qui traverse plusieurs phases, chacune avec sa propre file de callbacks. Un tour complet exécute les callbacks prêts de chaque phase, dans l'ordre, puis recommence.",
      },
      {
        kind: "diagram",
        title: "Un tour d'event loop (simplifié)",
        lines: [
          "┌─ timers ──────────── setTimeout / setInterval échus",
          "│",
          "├─ pending callbacks ─ opérations système reportées",
          "│",
          "├─ poll ────────────── nouvelles I/O (réseau, fichiers)",
          "│                      attend ici si rien d'autre à faire",
          "│",
          "├─ check ───────────── setImmediate(...)",
          "│",
          "└─ close callbacks ─── ex. socket.on(\"close\", …)",
          "    ↺ puis nouveau tour",
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Phase timers",
            value:
              "`setTimeout` et `setInterval` : leurs callbacks s'exécutent quand le délai est écoulé ET que la boucle atteint cette phase. Un `setTimeout(..., 0)` ne s'exécute donc pas « immédiatement » : il attend au minimum un tour de boucle.",
          },
          {
            label: "Phase poll",
            value:
              "Le cœur du réacteur : c'est ici qu'arrivent les nouvelles opérations d'entrée/sortie terminées (données reçues sur un socket, fichier lu). Si aucune autre phase n'a de travail, la boucle attend ici — c'est pourquoi un serveur « ne fait rien » sans consommer de CPU.",
          },
          {
            label: "Phase check",
            value:
              "Réservée à `setImmediate(...)` : son callback s'exécute juste après la phase poll du tour en cours. Utile pour reporter un traitement « juste après les I/O ».",
          },
          {
            label: "Ce qu'il faut en retenir",
            value:
              "L'ordre d'exécution des callbacks n'est pas l'ordre d'écriture du code, mais l'ordre des phases. Quand deux timers semblent s'exécuter « dans le désordre », c'est presque toujours l'explication.",
          },
        ],
      },
    ],
  },
  {
    id: "microtaches-vs-macrotaches",
    title: "Microtâches vs macrotâches",
    level: 3,
    intro: "`process.nextTick`, promesses, `setImmediate` : qui s'exécute quand ?",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Ordre d'exécution réel",
        code: "console.log(\"1. code synchrone\");\n\nsetTimeout(() => console.log(\"5. setTimeout (phase timers)\"), 0);\nsetImmediate(() => console.log(\"4. setImmediate (phase check)\"));\n\nPromise.resolve().then(() => console.log(\"3. promesse (microtâche)\"));\nprocess.nextTick(() => console.log(\"2. nextTick (avant les microtâches)\"));",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Après chaque phase, la boucle vide d'abord les microtâches (promesses, `nextTick`), puis passe à la phase suivante.",
          },
          {
            label: "`process.nextTick`",
            value:
              "S'exécute avant tout le reste, dès que le code synchrone en cours se termine — même avant les promesses. Réservé à des cas internes précis (reporter une erreur, laisser un constructeur finir) : en abuser affame la boucle, car les `nextTick` s'exécutent avant que la boucle ne puisse traiter les I/O.",
          },
          {
            label: "Promesses (`.then`, `await`)",
            value:
              "Leurs continuations sont des microtâches : elles s'exécutent entre les phases, avant le prochain `setTimeout` ou `setImmediate`. C'est pourquoi `await` « semble » immédiat : il ne fait qu'un détour par la file des microtâches.",
          },
          {
            label: "`setImmediate` vs `setTimeout(..., 0)`",
            value:
              "Dans le code principal, l'ordre entre les deux est indéterminé (dépend du temps d'amorçage). Dans un callback d'I/O, `setImmediate` gagne toujours : il est exécuté à la phase `check`, juste après la phase `poll` qui a déclenché le callback.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Enchaîner les `process.nextTick` récursifs (un `nextTick` qui en planifie un autre) : la boucle ne passe jamais à la phase suivante, les I/O et les timers sont bloqués — le serveur semble « gelé ».",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférez `setImmediate` à `process.nextTick` pour reporter du travail : il laisse la boucle respirer entre deux exécutions.",
          },
        ],
      },
    ],
  },
  {
    id: "event-loop-pieges",
    title: "Pièges : bloquer l'event loop",
    level: 3,
    intro: "La faute la plus grave en Node.js : monopoliser le fil unique.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Le piège : un calcul synchrone long dans un serveur",
        code: "import http from \"node:http\";\n\nhttp.createServer((req, res) => {\n  // DANGER : 5 secondes de calcul sur le fil unique\n  const fin = Date.now() + 5000;\n  while (Date.now() < fin) { /* calcul intensif */ }\n  res.end(\"Terminé\");\n}).listen(3000);\n// Pendant ces 5 secondes : AUCUNE autre requête n'est traitée.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Tout code synchrone long bloque le fil unique : pendant son exécution, aucune requête, aucun timer, aucun callback ne peut s'exécuter.",
          },
          {
            label: "Symptômes typiques",
            value:
              "Latence qui explose sous charge, timeouts inexpliqués, `setInterval` qui « saute » des ticks. Le serveur semble lent alors que le CPU n'est même pas saturé — ou au contraire un cœur CPU est à 100 % pendant que les autres dorment.",
          },
          {
            label: "Coupables courants",
            value:
              "`JSON.parse` sur un énorme document, les expressions régulières pathologiques, le tri de très gros tableaux en mémoire, les opérations `fs.*Sync` dans le code d'un serveur.",
          },
          {
            label: "Solutions",
            value:
              "Découper le travail en morceaux asynchrones (`setImmediate` entre les tranches), déléguer aux `worker_threads` (vrais fils parallèles pour le CPU), ou externaliser vers un service dédié. Le module `worker_threads` fait partie de la stdlib.",
          },
          {
            label: "Comment détecter",
            value:
              "Mesurer la latence de l'event loop : l'outil `blocked-at` ou le module natif `perf_hooks.monitorEventLoopDelay()` révèlent les blocages en production. Un retard moyen qui grandit = un fil qui sature.",
          },
          {
            label: "Bonne pratique",
            value:
              "Règle simple : dans un serveur, aucun callback ne devrait monopoliser le fil plus de quelques millisecondes. Tout le reste est asynchrone ou délégué.",
          },
        ],
      },
    ],
  },
  {
    id: "serveur-http-stdlib",
    title: "Serveur HTTP : au-delà de l'exemple",
    level: 3,
    intro: "Comprendre finement `requete` et `reponse` avant de passer aux frameworks.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Lire la requête, écrire la réponse",
        code: "import http from \"node:http\";\n\nconst serveur = http.createServer((req, res) => {\n  console.log(req.method, req.url); // \"GET\" \"/bonjour?nom=Aina\"\n\n  const url = new URL(req.url, \"http://\" + req.headers.host);\n  const nom = url.searchParams.get(\"nom\") || \"inconnu\";\n\n  res.writeHead(200, { \"Content-Type\": \"application/json\" });\n  res.end(JSON.stringify({ message: \"Bonjour \" + nom }));\n});\n\nserveur.listen(3000);",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "`req` : la requête",
            value:
              "`req.method` (GET, POST…), `req.url` (chemin + query string), `req.headers` (en-têtes). Le corps (body) n'est PAS lu automatiquement : il arrive par morceaux (chunks) via les événements `\"data\"` — c'est un stream, voir la section dédiée.",
          },
          {
            label: "`res` : la réponse",
            value:
              "`res.writeHead(code, enTêtes)` définit le statut et les en-têtes, `res.write()` envoie des morceaux, `res.end()` termine. Oublier `end()` = client qui attend indéfiniment.",
          },
          {
            label: "Les limites du manuel",
            value:
              "Avec la stdlib seule, vous devez écrire vous-même : le routage (quelle fonction pour `/utilisateurs/42`), l'analyse du JSON reçu, la gestion des erreurs par route. C'est pédagogique, puis fastidieux — c'est exactement le vide que comble Express.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours définir explicitement le `Content-Type` de la réponse : sans lui, le client doit deviner le format, source de bugs subtils (JSON affiché comme texte, accents mal décodés).",
          },
        ],
      },
    ],
  },
  {
    id: "express-introduction",
    title: "Express : le framework minimaliste",
    level: 3,
    intro: "Le framework Node.js le plus répandu : ce qu'il apporte, et son installation.",
    blocks: [
      {
        kind: "text",
        text: "Express est une surcouche fine au-dessus de `node:http` : il ajoute le routage (associer une URL à une fonction), les middlewares (traitements en chaîne) et des utilitaires de réponse. Il ne fait « que » cela, délibérément : pas d'ORM, pas d'authentification intégrée, pas de structure imposée. Cette modestie explique sa longévité — et pourquoi l'écosystème propose des alternatives pour les besoins plus structurés.",
      },
      {
        kind: "command",
        label: "Installer Express",
        command: "npm install express",
        why: "Ajoute Express aux dépendances du projet. C'est un paquet tiers (pas un module natif) : il faut donc l'installer dans chaque projet qui l'utilise.",
        verify: "`node_modules/express` existe et `package.json` liste `express` dans `dependencies`.",
      },
      {
        kind: "code",
        language: "js",
        title: "Le même serveur, avec Express",
        code: "import express from \"express\";\n\nconst app = express();\n\napp.get(\"/bonjour\", (req, res) => {\n  const nom = req.query.nom || \"inconnu\";\n  res.json({ message: \"Bonjour \" + nom });\n});\n\napp.listen(3000, () => {\n  console.log(\"API à l'écoute sur http://localhost:3000\");\n});",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Express transforme le serveur HTTP brut en routeur : « pour cette méthode et cette URL, exécute cette fonction ».",
          },
          {
            label: "Ce qu'Express fait pour vous",
            value:
              "Le routage (`app.get`, `app.post`…), l'analyse des paramètres (`req.query`, `req.params`), l'envoi simplifié (`res.json`, `res.send`, `res.status`), et la chaîne de middlewares. Le reste — base de données, validation, authentification — vient d'autres paquets.",
          },
          {
            label: "Exemple réel",
            value:
              "La majorité des API REST en Node.js exposées sur le web utilisent Express ou un de ses concurrents directs : c'est le standard de fait pour « exposer des données en HTTP avec Node.js ».",
          },
          {
            label: "Concepts liés",
            value: "Sections `express-routes`, `express-middlewares`, `frameworks-alternatifs`.",
          },
        ],
      },
    ],
  },
  {
    id: "express-routes",
    title: "Express : routes, paramètres, corps",
    level: 3,
    intro: "Déclarer des routes qui lisent l'URL et le corps des requêtes.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Routes typiques d'une API",
        code: "import express from \"express\";\nconst app = express();\n\napp.use(express.json()); // lit le corps JSON des requêtes\n\napp.get(\"/utilisateurs\", (req, res) => {\n  res.json([{ id: 1, nom: \"Aina\" }]);\n});\n\napp.get(\"/utilisateurs/:id\", (req, res) => {\n  res.json({ id: req.params.id }); // paramètre d'URL\n});\n\napp.post(\"/utilisateurs\", (req, res) => {\n  const { nom } = req.body; // corps JSON analysé\n  res.status(201).json({ id: 2, nom });\n});\n\napp.listen(3000);",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Paramètres d'URL (`:id`)",
            value:
              "`/utilisateurs/:id` capture la portion variable de l'URL, accessible via `req.params.id`. Sert à désigner une ressource précise (`/utilisateurs/42`).",
          },
          {
            label: "Query string (`?nom=…`)",
            value:
              "Accessible via `req.query` : sert aux filtres, au tri, à la pagination (`/utilisateurs?role=admin`). Jamais pour des secrets — l'URL est journalisée partout.",
          },
          {
            label: "Corps de requête (`req.body`)",
            value:
              "Les données envoyées en POST/PUT. Express ne les lit pas par défaut : il faut le middleware `express.json()` (inclus dans Express) qui analyse le JSON reçu. Sans lui, `req.body` est `undefined` — une erreur ultra-classique.",
          },
          {
            label: "Codes de statut",
            value:
              "`200` succès, `201` ressource créée, `400` requête invalide, `404` introuvable, `500` erreur serveur. Les définir explicitement avec `res.status(...)` rend l'API prévisible pour ses consommateurs.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `app.use(express.json())` puis s'étonner que `req.body` soit vide : le middleware d'analyse du corps n'est pas optionnel, il doit être déclaré avant les routes.",
          },
        ],
      },
    ],
  },
  {
    id: "express-middlewares",
    title: "Express : les middlewares",
    level: 3,
    intro: "Le concept central d'Express : une chaîne de traitements traversée par chaque requête.",
    blocks: [
      {
        kind: "text",
        text: "Un middleware est une fonction qui reçoit la requête, la réponse, et une fonction `next()` : elle peut agir (journaliser, vérifier une authentification, analyser le corps), puis soit passer la main au middleware suivant avec `next()`, soit répondre directement et interrompre la chaîne.",
      },
      {
        kind: "code",
        language: "js",
        title: "Chaîne de middlewares",
        code: "import express from \"express\";\nconst app = express();\n\n// 1. Journalise chaque requête, puis passe la main\napp.use((req, res, next) => {\n  console.log(new Date().toISOString(), req.method, req.url);\n  next();\n});\n\n// 2. Protège les routes suivantes\napp.use(\"/admin\", (req, res, next) => {\n  if (req.headers[\"x-cle\"] !== process.env.CLE_ADMIN) {\n    return res.status(403).json({ erreur: \"Accès refusé\" });\n  }\n  next();\n});\n\napp.get(\"/admin/stats\", (req, res) => {\n  res.json({ visites: 1234 });\n});",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un middleware est un maillon d'une chaîne : chacun peut inspecter ou modifier la requête, puis décider de continuer ou de répondre.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Factoriser les traitements transverses : au lieu de répéter la vérification d'authentification dans chaque route, on l'écrit une fois comme middleware appliqué aux routes concernées.",
          },
          {
            label: "L'ordre compte",
            value:
              "Les middlewares s'exécutent dans l'ordre de déclaration : le journaliseur avant les routes, l'analyseur JSON avant les routes qui lisent `req.body`, le gestionnaire d'erreurs après toutes les routes. Un middleware placé après une route ne la verra jamais.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier d'appeler `next()` sans répondre : la requête reste suspendue jusqu'au timeout. Chaque middleware doit soit appeler `next()`, soit envoyer une réponse — sans exception.",
          },
          {
            label: "Middleware d'erreur",
            value:
              "Une fonction à quatre paramètres `(err, req, res, next)` placée en fin de chaîne reçoit toutes les erreurs : c'est l'endroit unique où journaliser et renvoyer une réponse 500 propre au lieu de laisser le serveur planter.",
          },
        ],
      },
    ],
  },
  {
    id: "frameworks-alternatifs",
    title: "Alternatives à Express : Fastify, NestJS, Koa",
    level: 3,
    intro: "Le paysage des frameworks, décrit factuellement et sans classement.",
    blocks: [
      {
        kind: "table",
        headers: ["Framework", "Philosophie", "Profil adapté"],
        rows: [
          ["Express", "Minimaliste, non structurant, immense écosystème de middlewares", "API simples, prototypes, équipes qui veulent une liberté totale"],
          ["Fastify", "API proche d'Express, accent sur la performance et la validation par schémas", "API à fort trafic, équipes qui veulent rester proches d'Express en plus rapide"],
          ["NestJS", "Structuré et « opinionated », inspiré d'Angular : modules, injection de dépendances, TypeScript natif", "Grosses applications, équipes nombreuses, architectures d'entreprise"],
          ["Koa", "Créé par l'équipe d'Express, encore plus minimal : tout passe par des middlewares async", "Bases sur mesure, pédagogie des middlewares"],
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Pourquoi plusieurs frameworks",
            value:
              "Parce qu'Express ne tranche pas : petite API ou grosse application d'entreprise, les besoins de structure diffèrent. Les alternatives ne sont pas « meilleures » dans l'absolu, elles font des compromis différents (liberté contre cadre, simplicité contre outillage).",
          },
          {
            label: "Ce qu'ils partagent",
            value:
              "Tous reposent sur `node:http`, tous utilisent routes et middlewares, tous lisent `req` et écrivent `res`. Apprendre Express transfère à 80 % vers les autres : les concepts sont les mêmes, seule l'API change.",
          },
          {
            label: "Bonne pratique",
            value:
              "Choisir selon le projet et l'équipe, pas selon la mode : une petite API interne n'a pas besoin de l'architecture complète de NestJS, et une application critique à dix développeurs souffrira du « tout est permis » d'Express sans conventions d'équipe fortes.",
          },
        ],
      },
    ],
  },
  {
    id: "fichiers-lecture-ecriture",
    title: "Lire et écrire des fichiers",
    level: 3,
    intro: "Le module `fs` : l'API la plus utilisée après `http`.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "fs/promises — la forme moderne",
        code: "import fs from \"node:fs/promises\";\n\n// Lire tout un fichier (petits et moyens fichiers)\nconst contenu = await fs.readFile(\"notes.txt\", \"utf-8\");\nconsole.log(contenu);\n\n// Écrire (crée ou remplace le fichier)\nawait fs.writeFile(\"sortie.txt\", \"Bonjour\\n\", \"utf-8\");\n\n// Ajouter à la fin sans écraser\nawait fs.appendFile(\"journal.log\", \"nouvelle ligne\\n\");\n\n// Lister un dossier\nconst fichiers = await fs.readdir(\".\");",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`node:fs/promises` expose les opérations fichiers en promesses : `await fs.readFile(...)` sans bloquer le fil.",
          },
          {
            label: "Trois formes de `fs`",
            value:
              "Callbacks (`fs.readFile(f, cb)` — historique), promesses (`fs/promises` — moderne, à privilégier), synchrones (`fs.readFileSync` — bloque le fil, réservé au démarrage ou aux scripts).",
          },
          {
            label: "Quand utiliser la forme synchrone",
            value:
              "Au démarrage du programme (lire la configuration avant d'écouter) ou dans un script CLI ponctuel : le blocage n'affecte personne. Jamais dans le traitement d'une requête d'un serveur.",
          },
          {
            label: "Le module `path`",
            value:
              "Construisez les chemins avec `path.join(dossier, fichier)` plutôt qu'en concaténant des chaînes : il gère les séparateurs `/` vs `\\` selon l'OS. `path.resolve` produit un chemin absolu, `__dirname` n'existe pas en ESM (utiliser `import.meta.dirname`, disponible depuis Node 20.11).",
          },
          {
            label: "Erreur fréquente",
            value:
              "`ENOENT: no such file or directory` : le chemin est relatif au dossier d'où `node` a été lancé (`process.cwd()`), pas au dossier du script. Utilisez des chemins absolus construits depuis le script lui-même.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours préciser l'encodage (`\"utf-8\"`) en lecture/écriture de texte : sans lui, `readFile` retourne un `Buffer` brut, source de bugs d'affichage.",
          },
        ],
      },
    ],
  },
  {
    id: "streams",
    title: "Les streams : traiter sans tout charger",
    level: 3,
    intro: "La notion qui distingue un script d'un système : traiter les données au fil de l'eau.",
    blocks: [
      {
        kind: "text",
        text: "`readFile` charge tout le fichier en mémoire : parfait pour un fichier de quelques mégaoctets, catastrophique pour un fichier de 10 Go ou un flux vidéo. Les streams traitent les données par morceaux (chunks) : on lit un morceau, on le transforme, on l'écrit — avec une mémoire constante, quelle que soit la taille totale.",
      },
      {
        kind: "code",
        language: "js",
        title: "Copier un gros fichier par stream",
        code: "import fs from \"node:fs\";\nimport { pipeline } from \"node:stream/promises\";\n\n// pipeline : source → …transformations… → destination,\n// avec gestion d'erreur et fermeture propres\nawait pipeline(\n  fs.createReadStream(\"gros-fichier.iso\"),\n  fs.createWriteStream(\"copie.iso\")\n);\nconsole.log(\"Copie terminée\");",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un stream est un flux de morceaux : on traite chaque chunk dès qu'il arrive au lieu d'attendre l'ensemble.",
          },
          {
            label: "Les quatre types",
            value:
              "Readable (on lit : fichier, requête HTTP entrante), Writable (on écrit : fichier, réponse HTTP), Duplex (les deux : socket réseau), Transform (modifie au passage : compression, chiffrement).",
          },
          {
            label: "Pourquoi c'est central dans Node.js",
            value:
              "Les requêtes et réponses HTTP SONT des streams : `req` est un Readable (le corps arrive par chunks), `res` est un Writable. Comprendre les streams, c'est comprendre comment Node.js transfère des gigaoctets sans broncher.",
          },
          {
            label: "Exemple réel",
            value:
              "Servir une vidéo : plutôt que charger 2 Go en mémoire, on « pipe » le fichier vers la réponse — le client commence à lire pendant que le serveur lit encore le disque. Même principe pour la compression gzip à la volée.",
          },
          {
            label: "Bonne pratique",
            value:
              "Utilisez `pipeline` (de `node:stream/promises`) plutôt que `.pipe()` manuel : il propage les erreurs, ferme proprement les flux et retourne une promesse compatible `await`.",
          },
        ],
      },
    ],
  },
  {
    id: "buffers",
    title: "Les `Buffer` : le binaire en JavaScript",
    level: 3,
    intro: "JavaScript ne connaît que le texte : Node.js ajoute le binaire.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Manipuler des octets",
        code: "// Créer un Buffer depuis du texte (encodage utf-8 par défaut)\nconst buf = Buffer.from(\"Bonjour\", \"utf-8\");\nconsole.log(buf.length); // 7 : nombre d'OCTETS, pas de caractères\n\n// Lire une image en binaire, puis l'encoder en base64\nimport fs from \"node:fs/promises\";\nconst image = await fs.readFile(\"logo.png\"); // Buffer, pas de texte !\nconst base64 = image.toString(\"base64\");",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un `Buffer` est un tableau d'octets : la représentation en mémoire des données binaires (images, fichiers, paquets réseau).",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Le JavaScript du navigateur manipule du texte ; un serveur manipule des fichiers, des images, du chiffrement — du binaire. `Buffer` comble ce manque, avec une API sûre (pas d'accès mémoire arbitraire).",
          },
          {
            label: "Piège classique",
            value:
              "`\"café\".length` vaut 4 caractères mais `Buffer.from(\"café\").length` vaut 5 octets (le `é` en prend 2 en UTF-8). Couper un Buffer au milieu d'un caractère multi-octets produit du texte corrompu : utilisez les méthodes d'encodage plutôt que le découpage manuel.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne convertissez en chaîne que pour afficher ou comparer du texte ; gardez le `Buffer` pour transporter, stocker ou chiffrer. Chaque conversion a un coût.",
          },
        ],
      },
    ],
  },
  {
    id: "promesses-et-async-rappel",
    title: "Async/await côté Node.js",
    level: 3,
    intro: "Le style moderne d'écrire l'asynchrone : indispensable au quotidien.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Enchaîner des opérations asynchrones",
        code: "import fs from \"node:fs/promises\";\n\nasync function main() {\n  const noms = await fs.readdir(\"./donnees\");\n  const contenus = await Promise.all(\n    noms.map((n) => fs.readFile(\"./donnees/\" + n, \"utf-8\"))\n  );\n  console.log(contenus.length + \" fichiers lus\");\n}\n\nmain().catch((erreur) => {\n  console.error(\"Échec :\", erreur.message);\n  process.exit(1);\n});",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`async`/`await` écrit l'asynchrone comme du code séquentiel : `await` suspend la fonction (pas le fil) jusqu'au résultat.",
          },
          {
            label: "`Promise.all`",
            value:
              "Lance plusieurs opérations EN PARALLÈLE et attend toutes les fins : lire 100 fichiers prend le temps du plus lent, pas la somme. L'outil de base pour la concurrence en Node.js.",
          },
          {
            label: "Le `.catch` final",
            value:
              "Une fonction `async` retourne toujours une promesse : si elle rejette sans `.catch`, Node.js émet `unhandledRejection` et (depuis Node 15) termine le processus. Le point d'entrée d'un programme doit toujours gérer ce cas.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`await` dans une boucle `for` pour des opérations indépendantes : les lectures se font l'une après l'autre au lieu d'en parallèle. Regrouper avec `Promise.all` quand l'ordre n'importe pas.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-async",
    title: "Gérer les erreurs asynchrones",
    level: 3,
    intro: "En Node.js, une erreur non gérée peut arrêter tout le serveur : la gestion d'erreurs est une discipline.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Attraper les erreurs au bon niveau",
        code: "// 1. Local : try/catch autour de l'opération risquée\nasync function lireConfig() {\n  try {\n    return await fs.readFile(\"config.json\", \"utf-8\");\n  } catch (erreur) {\n    if (erreur.code === \"ENOENT\") return \"{}\"; // fichier absent : défaut\n    throw erreur; // le reste remonte\n  }\n}\n\n// 2. Global : filet de sécurité du processus\nprocess.on(\"unhandledRejection\", (erreur) => {\n  console.error(\"Promesse rejetée non gérée :\", erreur);\n  process.exit(1); // redémarrage par le process manager\n});",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`try`/`catch` pour les erreurs attendues localement, un gestionnaire global comme filet de sécurité — jamais l'un sans l'autre.",
          },
          {
            label: "`erreur.code`",
            value:
              "Les erreurs Node.js portent un code machine (`ENOENT` fichier introuvable, `EADDRINUSE` port occupé, `ECONNREFUSED` connexion refusée) : testez le code plutôt que le message (traduit, variable) pour réagir proprement.",
          },
          {
            label: "Pourquoi `process.exit(1)` en dernier recours",
            value:
              "Après une erreur inattendue, l'état du programme est inconnu (connexions à moitié ouvertes, données à moitié écrites). Le plus sûr est de terminer proprement et de laisser le process manager (PM2, systemd, Docker) redémarrer un processus sain.",
          },
          {
            label: "Dans Express",
            value:
              "Une route `async` qui lève une erreur sans `try`/`catch` ne sera pas attrapée par Express 4 : utilisez un wrapper qui transmet l'erreur à `next(erreur)`, ou passez à Express 5 qui gère nativement les routes async.",
          },
          {
            label: "Bonne pratique",
            value:
              "Journalisez toujours l'erreur complète (avec sa stack trace) côté serveur, mais ne renvoyez jamais la stack au client : elle révèle votre architecture à un attaquant.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-operationnelles-vs-bugs",
    title: "Erreurs opérationnelles vs bugs",
    level: 3,
    intro: "Deux familles d'erreurs, deux stratégies opposées.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Erreurs opérationnelles",
            value:
              "Prévisibles et inévitables : fichier absent, base de données injoignable, API tierce en timeout, entrée utilisateur invalide. Stratégie : les anticiper, les gérer gracieusement (réessayer, valeur par défaut, message d'erreur clair), et continuer.",
          },
          {
            label: "Bugs (erreurs de programmation)",
            value:
              "Imprévus et anormaux : `undefined` déréférencé, assertion qui échoue, état incohérent. Stratégie : ne PAS essayer de continuer (l'état est corrompu), journaliser, terminer le processus, laisser le superviseur redémarrer.",
          },
          {
            label: "Pourquoi la distinction compte",
            value:
              "Tenter de « réparer » un bug en continuant masque le problème et corrompt les données ; à l'inverse, faire planter le serveur pour un fichier absent est disproportionné. Chaque `catch` devrait savoir dans quelle famille il se trouve.",
          },
          {
            label: "Exemple réel",
            value:
              "Un service de paiement : carte refusée = erreur opérationnelle (répondre 402 avec un message clair) ; solde devenu négatif par une erreur de calcul = bug (journaliser, alerter, arrêter avant de corrompre d'autres comptes).",
          },
          {
            label: "Bonne pratique",
            value:
              "Créez des classes d'erreur métier (`ErreurValidation`, `ErreurPaiement`) avec un code et un statut HTTP : le gestionnaire d'erreurs central sait alors quoi renvoyer au client sans examiner chaque cas.",
          },
        ],
      },
    ],
  },
  {
    id: "process",
    title: "Le module `process` : arguments, sortie, signaux",
    level: 3,
    intro: "Piloter le programme lui-même : ce qu'on lui passe, comment il se termine.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Arguments en ligne de commande",
        code: "// node outil.js --fichier notes.txt --limite 10\nconst args = process.argv.slice(2);\nconsole.log(args); // [\"--fichier\", \"notes.txt\", \"--limite\", \"10\"]\n\n// Pour un vrai CLI, un parseur (ex. le paquet \"commander\")\n// transforme cela en options nommées et génère l'aide.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "`process.argv`",
            value:
              "Les arguments passés au programme (`node outil.js a b` → `argv` contient `a`, `b` après les deux premiers éléments qui désignent `node` et le script). La base de tout outil en ligne de commande.",
          },
          {
            label: "`process.exit(code)`",
            value:
              "Termine le programme : `0` = succès, `1` (ou autre non-zéro) = échec. Les scripts CI et les shells testent ce code : un script qui échoue silencieusement avec le code 0 est un bug.",
          },
          {
            label: "Les signaux (`SIGTERM`, `SIGINT`)",
            value:
              "La façon « polie » d'arrêter un programme (Ctrl+C envoie `SIGINT`, Docker et les hébergeurs envoient `SIGTERM`). Un serveur sérieux les écoute pour fermer ses connexions proprement avant de quitter, plutôt que de couper brutalement.",
          },
          {
            label: "`process.env`, `process.cwd()`, `process.version`",
            value:
              "L'environnement, le dossier de lancement, la version de Node.js : les trois informations d'identité du processus, utiles pour le diagnostic (« sur quelle version ça tourne ? depuis quel dossier ? »).",
          },
          {
            label: "Bonne pratique",
            value:
              "Pour un CLI destiné à d'autres, utilisez un parseur d'arguments (`commander`, `yargs`…) : gestion de `--help`, validation des options et messages d'erreur soignés, sans réinventer la roue.",
          },
        ],
      },
    ],
  },
  {
    id: "variables-environnement-avance",
    title: "Configuration : dotenv, validation, secrets",
    level: 3,
    intro: "Passer du `.env` de développement à une configuration robuste.",
    blocks: [
      {
        kind: "command",
        label: "Installer dotenv (si Node < 20.6)",
        command: "npm install dotenv",
        why: "Le paquet historique qui charge un fichier `.env` dans `process.env`. Depuis Node 20.6, l'option native `--env-file=.env` remplit le même rôle sans dépendance : préférez-la sur les versions récentes.",
      },
      {
        kind: "code",
        language: "js",
        title: "Charger et valider la configuration au démarrage",
        code: "// --env-file=.env (Node 20.6+) ou dotenv.config()\n\nfunction configRequise(nom) {\n  const valeur = process.env[nom];\n  if (!valeur) {\n    console.error(\"Configuration manquante : \" + nom);\n    process.exit(1);\n  }\n  return valeur;\n}\n\nconst config = {\n  port: Number(process.env.PORT) || 3000,\n  cleApi: configRequise(\"CLE_API\"),\n  urlBase: configRequise(\"URL_BASE_DE_DONNEES\"),\n};\n\nexport default config;",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Validez toute la configuration au démarrage : un programme qui échoue vite avec un message clair vaut mieux qu'un programme qui plante à 3h du matin sur une variable oubliée.",
          },
          {
            label: "Le pattern « config »",
            value:
              "Centraliser la lecture et la validation dans un module `config.js` importé partout : un seul endroit à auditer, des valeurs déjà converties (`Number`), et l'échec rapide si quelque chose manque.",
          },
          {
            label: "Secrets en production",
            value:
              "Sur un serveur, les secrets ne viennent pas d'un `.env` (fichier en clair sur disque) mais du système : variables de l'hébergeur, gestionnaire de secrets (Vault, AWS Secrets Manager…). Le `.env` reste un outil de développement.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Commiter le `.env` « juste cette fois » pour dépanner : le secret est alors dans l'historique Git pour toujours, même si on le supprime après. Il faut le révoquer et le régénérer.",
          },
        ],
      },
    ],
  },
  {
    id: "tests",
    title: "Tester : le runner natif `node --test`",
    level: 3,
    intro: "Écrire ses premiers tests sans installer quoi que ce soit.",
    blocks: [
      {
        kind: "text",
        text: "Node.js intègre un exécuteur de tests depuis la version 18 : le module `node:test` pour déclarer les tests et `node:assert` pour vérifier. Pour la plupart des projets, il suffit — les frameworks (Vitest, Jest) n'apportent un plus que pour des besoins avancés (mocking poussé, couverture, interface watch).",
      },
      {
        kind: "code",
        language: "js",
        title: "addition.test.js",
        code: "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { addition } from \"./maths.js\";\n\ntest(\"additionne deux nombres\", () => {\n  assert.equal(addition(2, 3), 5);\n});\n\ntest(\"additionne les négatifs\", () => {\n  assert.equal(addition(-2, -3), -5);\n});",
      },
      {
        kind: "command",
        label: "Lancer les tests",
        command: "node --test",
        why: "Exécute tous les fichiers `*.test.js` du projet avec le runner natif et affiche le résumé (réussis/échoués). Zéro configuration, zéro dépendance.",
        verify: "Le résumé affiche `# pass 2` et `# fail 0`.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`test()` déclare un cas, `assert` vérifie le résultat, `node --test` exécute : le cycle de test minimal tient en trois lignes.",
          },
          {
            label: "Que tester en priorité",
            value:
              "La logique métier (calculs, validation, transformations) et les routes d'API (statut + corps de réponse). Tester que le framework fonctionne est inutile ; tester VOTRE code est essentiel.",
          },
          {
            label: "Tester une API Express",
            value:
              "Démarrez l'application sur un port éphémère dans le test, envoyez de vraies requêtes HTTP avec `fetch` (global depuis Node 18), vérifiez les réponses, fermez le serveur. Pas de mock du framework : on teste le comportement réel.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un test = un comportement vérifié, avec un nom qui décrit l'attente (« refuse un email invalide »). Quand un test échoue, son nom doit suffire à comprendre ce qui a cassé.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Déboguer : `node --inspect` et les DevTools",
    level: 3,
    intro: "Aller au-delà du `console.log` quand le bug résiste.",
    blocks: [
      {
        kind: "command",
        label: "Lancer en mode debug",
        command: "node --inspect app.js",
        why: "Démarre le programme en exposant un port de débogage : on peut alors connecter les Chrome DevTools (via `chrome://inspect`) et utiliser points d'arrêt, pas à pas et inspection des variables — le même outillage que pour le JavaScript du navigateur.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`--inspect` transforme votre programme Node.js en page « débogable » dans Chrome : breakpoints et inspection comme dans le navigateur.",
          },
          {
            label: "Le mot-clé `debugger`",
            value:
              "Placé dans le code, il agit comme un point d'arrêt programmatique quand le débogueur est attaché (et est ignoré sinon). Pratique pour arrêter exactement à l'endroit suspect sans cliquer dans l'interface.",
          },
          {
            label: "Lire une stack trace",
            value:
              "De haut en bas : l'erreur, puis la pile des appels avec fichier et numéro de ligne. Le haut indique OÙ ça a cassé, le bas indique le chemin qui y a mené — c'est en bas que se trouve souvent la vraie cause (mauvais argument passé trois appels plus tôt).",
          },
          {
            label: "VS Code",
            value:
              "Le débogage est intégré : un fichier `launch.json` (généré via « Run and Debug ») permet de lancer avec F5, points d'arrêt dans l'éditeur, variables au survol. Le plus confortable au quotidien.",
          },
          {
            label: "Bonne pratique",
            value:
              "Reproduire le bug avec un test minimal AVANT de déboguer : on sait alors exactement quand il est corrigé, et le test reste comme garde-fou contre la régression.",
          },
        ],
      },
    ],
  },
  {
    id: "lint-format",
    title: "Qualité : ESLint et Prettier",
    level: 3,
    intro: "Automatiser la chasse aux erreurs et aux débats de style.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "ESLint : le détecteur d'erreurs",
            value:
              "Analyse statique du code : variables inutilisées, `await` oublié, comparaisons douteuses, failles courantes. Il attrape avant l'exécution des bugs que les tests ne couvrent pas. Se configure via un fichier `eslint.config.js` ; les règles recommandées (`js.configs.recommended`) sont un bon point de départ.",
          },
          {
            label: "Prettier : le formateur",
            value:
              "Reformate le code automatiquement (indentation, guillemets, points-virgules) : fini les débats de style en revue de code. Il ne détecte pas d'erreurs, il uniformise la présentation — complémentaire d'ESLint, pas concurrent.",
          },
          {
            label: "Pourquoi automatiser",
            value:
              "Un linter dans la CI refuse le code douteux avant la fusion ; un formateur exécuté à la sauvegarde supprime toute friction. La qualité devient un réflexe d'outillage, pas un effort de volonté.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ajoutez `\"lint\": \"eslint .\"` aux scripts npm et exécutez-le dans la CI : chaque pull request est vérifiée automatiquement, sans intervention humaine.",
          },
        ],
      },
    ],
  },
  {
    id: "securite-dependances",
    title: "Sécurité : les dépendances",
    level: 3,
    intro: "Le maillon faible de la plupart des projets Node.js : les paquets tiers.",
    blocks: [
      {
        kind: "command",
        label: "Auditer les dépendances",
        command: "npm audit",
        why: "Compare les paquets installés à la base de vulnérabilités connues et signale les failles (avec leur gravité). `npm audit fix` tente de corriger automatiquement en montant les versions concernées.",
        verify: "Le rapport indique `found 0 vulnerabilities` ou liste les vulnérabilités restantes avec leurs correctifs.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Chaque dépendance est du code que vous n'avez pas écrit mais que vous exécutez : l'audit régulier est non négociable.",
          },
          {
            label: "Le risque réel",
            value:
              "Des attaques ont déjà ciblé des paquets populaires (compte de mainteneur compromis, typosquatting : `expresss` au lieu d'`express`). Un paquet malveillant s'exécute avec tous les droits du programme : lecture de fichiers, exfiltration de secrets.",
          },
          {
            label: "Défenses",
            value:
              "`npm audit` en CI pour bloquer les failles critiques, `package-lock.json` commité pour figer les versions, un nombre minimal de dépendances (chaque paquet est une surface d'attaque), et la méfiance envers les paquets obscurs ou abandonnés.",
          },
          {
            label: "Bonne pratique",
            value:
              "Avant d'ajouter une dépendance : vérifier sa popularité, sa date de dernière mise à jour et son mainteneur. Pour trois lignes de code utilitaire, mieux vaut les écrire que d'ajouter un paquet.",
          },
        ],
      },
    ],
  },
  {
    id: "securite-bonnes-pratiques",
    title: "Sécurité : les réflexes côté serveur",
    level: 3,
    intro: "Les fautes classiques d'une API Node.js — et leurs parades.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Ne jamais faire confiance aux entrées",
            value:
              "Tout ce qui vient du client (corps, query, en-têtes) est suspect : valider le type, la forme et la taille avant usage. Une validation manquée = injection, crash ou fuite de données.",
          },
          {
            label: "Secrets hors du code",
            value:
              "Clés d'API, mots de passe, tokens : uniquement via variables d'environnement ou gestionnaire de secrets, jamais en dur, jamais dans Git. Voir la section configuration.",
          },
          {
            label: "`eval` et compagnie : interdits",
            value:
              "`eval()`, `new Function()` avec des données utilisateur, ou l'exécution de commandes shell construites par concaténation : c'est offrir l'exécution de code arbitraire. Il existe toujours une alternative sûre (JSON.parse, requêtes paramétrées, `execFile` avec arguments séparés).",
          },
          {
            label: "En-têtes HTTP de sécurité",
            value:
              "Le paquet `helmet` (un middleware Express) définit des en-têtes qui durcissent le navigateur face au XSS et au clickjacking. Une ligne de configuration pour un gain réel.",
          },
          {
            label: "Limitation de débit (rate limiting)",
            value:
              "Limiter le nombre de requêtes par IP et par minute sur les routes sensibles (connexion, inscription) : la parade de base contre le bruteforce et les abus.",
          },
          {
            label: "Tenir Node.js à jour",
            value:
              "Les failles du runtime lui-même sont corrigées dans les versions LTS : rester sur une version en fin de vie, c'est rester vulnérable. Suivre les LTS et mettre à jour est une mesure de sécurité, pas du confort.",
          },
        ],
      },
    ],
  },
  {
    id: "deploiement-bases",
    title: "Déploiement : les bases",
    level: 3,
    intro: "Faire tourner le programme sur un serveur, durablement.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Déployer = exécuter `node` sur une machine qui ne s'éteint pas, avec la bonne configuration, et le relancer quand il tombe.",
          },
          {
            label: "`NODE_ENV=production`",
            value:
              "La convention universelle : cette variable signale le mode production. Express et de nombreux paquets adaptent leur comportement (moins de logs verbeux, caches activés, messages d'erreur sobres). Toujours la définir sur le serveur.",
          },
          {
            label: "La configuration vient de l'environnement",
            value:
              "Port, URL de base de données, clés : fournis par l'hébergeur via variables d'environnement, jamais par un `.env` commité. Chaque plateforme (VPS, PaaS, conteneur) a son mécanisme — le code, lui, ne change pas.",
          },
          {
            label: "Un processus qui se relance seul",
            value:
              "Un serveur qui plante à 3h du matin doit redémarrer sans humain : c'est le rôle du process manager (section suivante), de systemd sur un VPS, ou de la plateforme d'hébergement (qui recrée le conteneur).",
          },
          {
            label: "Derrière un reverse proxy",
            value:
              "En production, Node.js écoute rarement directement Internet : un Nginx ou le routeur de la plateforme reçoit le trafic (TLS, compression, fichiers statiques) et le transmet au port local de l'application. C'est aussi lui qui répartit la charge entre plusieurs instances.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Déployer avec les `devDependencies` ou en mode développement : dépendances de test sur le serveur, rechargement à chaud actif, messages d'erreur verbeux exposés. Le build et l'installation de production (`npm install --omit=dev`) sont des étapes distinctes.",
          },
        ],
      },
    ],
  },
  {
    id: "process-managers",
    title: "Process managers : PM2",
    level: 3,
    intro: "Garder le serveur en vie : redémarrage auto, logs, multi-instances.",
    blocks: [
      {
        kind: "command",
        label: "Installer PM2 globalement",
        command: "npm install -g pm2",
        why: "PM2 est un programme indépendant des projets : on l'installe une fois par serveur (`-g` = global). Il surveille ensuite les applications qu'on lui confie.",
      },
      {
        kind: "command",
        label: "Lancer une application supervisée",
        command: "pm2 start app.js --name mon-api",
        why: "Démarre `app.js` sous surveillance avec un nom lisible : en cas de crash, PM2 relance automatiquement le processus. `pm2 list`, `pm2 logs mon-api` et `pm2 stop mon-api` pilotent ensuite l'application.",
        verify: "`pm2 list` affiche `mon-api` avec le statut `online`.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "PM2 est un gardien : il lance votre application, la relance si elle tombe, et centralise ses logs.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "`node app.js` dans un terminal meurt avec le terminal (ou au premier crash). Un serveur a besoin d'un superviseur qui survive à la session et aux erreurs — c'est exactement ce vide que comble un process manager.",
          },
          {
            label: "Le mode cluster",
            value:
              "`pm2 start app.js -i max` lance une instance par cœur CPU et répartit les requêtes : on exploite toute la machine malgré le fil unique de chaque instance. Le mode de production typique sur un VPS.",
          },
          {
            label: "Alternatives factuelles",
            value:
              "systemd (le superviseur natif de Linux, sans dépendance), Docker avec une politique de redémarrage, ou le redémarrage automatique de la plateforme d'hébergement (PaaS). Le besoin — supervision + redémarrage — est universel ; l'outil dépend de l'infrastructure.",
          },
        ],
      },
    ],
  },
  {
    id: "ci-cd",
    title: "CI/CD : tester à chaque commit",
    level: 3,
    intro: "Automatiser les vérifications pour ne plus jamais déployer du code cassé.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/ci.yml — pipeline GitHub Actions",
        code: "name: CI\non: [push, pull_request]\njobs:\n  verifier:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \"lts/*\"\n          cache: \"npm\"\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n      - run: npm audit --audit-level=high",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "La CI rejoue à chaque commit ce que vous faites à la main : installer, linter, tester, auditer — et bloque la fusion si quelque chose échoue.",
          },
          {
            label: "`npm ci` vs `npm install`",
            value:
              "En CI, on utilise `npm ci` : installation rapide et déterministe à partir du `package-lock.json` (il échoue si le lock est désynchronisé, ce qui est exactement ce qu'on veut détecter).",
          },
          {
            label: "Ce que le pipeline vérifie",
            value:
              "Le lint (style et erreurs statiques), les tests (comportement), l'audit (failles connues des dépendances). Trois filets complémentaires : un bug doit passer les trois pour atteindre la production.",
          },
          {
            label: "Le CD (déploiement continu)",
            value:
              "L'étape suivante : si la CI est verte sur la branche principale, déployer automatiquement (ou sur validation manuelle). Le déploiement devient un non-événement au lieu d'une cérémonie stressante.",
          },
          {
            label: "Bonne pratique",
            value:
              "Versionner le workflow dans le dépôt (dossier `.github/workflows`) : la pipeline fait partie du projet, elle est relue et versionnée comme le code.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les habitudes qui distinguent un script d'un service fiable.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Structurer par responsabilité",
            value:
              "Séparez routes, logique métier et accès aux données dans des modules distincts : une route Express ne devrait contenir ni SQL ni calcul complexe, seulement l'orchestration (lire la requête, appeler le service, répondre).",
          },
          {
            label: "Ne jamais bloquer l'event loop",
            value:
              "Le rappel de la section dédiée : pas de calcul synchrone long, pas de `*Sync` dans les requêtes, des streams pour les gros volumes.",
          },
          {
            label: "Échouer vite au démarrage",
            value:
              "Validez toute la configuration avant d'écouter sur le port : un service qui démarre à moitié est pire qu'un service qui refuse de démarrer.",
          },
          {
            label: "Journaliser en structuré",
            value:
              "Des logs en JSON (via `pino`, le logger le plus répandu dans l'écosystème) plutôt qu'en texte libre : filtrables et agrégeables par les outils d'observabilité. Chaque log d'erreur inclut le contexte (route, identifiant de requête).",
          },
          {
            label: "Versionner et documenter l'API",
            value:
              "Un `README` qui explique `npm install`, `npm run dev`, les variables requises ; et pour une API publique, une documentation des routes (OpenAPI/Swagger). Une API sans documentation est une API inutilisable.",
          },
          {
            label: "Tester le comportement, pas l'implémentation",
            value:
              "Des tests qui vérifient les réponses HTTP et les résultats métier survivent aux refactorings ; des tests qui vérifient les appels internes cassent à chaque modification.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-reponse-jamais-terminee",
    title: "Erreur : la réponse jamais terminée",
    level: 3,
    intro: "Le navigateur « charge » indéfiniment : le classique des débuts.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Problème",
            value:
              "La requête reste en attente jusqu'au timeout : le client ne reçoit jamais de réponse.",
          },
          {
            label: "Pourquoi",
            value:
              "Chaque requête HTTP doit se terminer par `res.end()`, `res.send()` ou `res.json()`. Si le code oublie cet appel (branche `if` sans `else`, `return` précoce, `next()` oublié dans un middleware), la connexion reste ouverte.",
          },
          {
            label: "Mauvais",
            value:
              "`if (ok) { res.json(donnees); }` — et si `ok` est faux, rien ne se passe : silence radio.",
          },
          {
            label: "Mieux",
            value:
              "Toujours un `else` (ou un retour anticipé) qui répond : `if (!ok) return res.status(404).json({ erreur: \"Introuvable\" });` puis le cas nominal. Chaque chemin de code d'une route se termine par une réponse.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-trycatch-callback",
    title: "Erreur : `try`/`catch` autour d'un callback",
    level: 3,
    intro: "Pourquoi le `try`/`catch` ne protège pas le code asynchrone à callbacks.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Problème",
            value:
              "L'erreur levée dans un callback n'est pas attrapée par le `try`/`catch` qui l'entoure : le programme plante malgré la protection apparente.",
          },
          {
            label: "Pourquoi",
            value:
              "Le callback s'exécute plus tard, sur un autre tour d'event loop, après que le `try` a terminé. Le `try`/`catch` ne protège que le code synchrone de son bloc. Avec les promesses et `await`, en revanche, le `try`/`catch` fonctionne — d'où l'intérêt de `fs/promises` plutôt que des callbacks.",
          },
          {
            label: "Mauvais",
            value:
              "`try { fs.readFile(\"f.txt\", (e, d) => { throw new Error(\"x\"); }); } catch (e) { /* jamais atteint */ }`",
          },
          {
            label: "Mieux",
            value:
              "`try { const d = await fs.readFile(\"f.txt\", \"utf-8\"); } catch (e) { /* attrapé ici */ }` avec `node:fs/promises`.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-unhandled-rejection",
    title: "Erreur : promesse rejetée non gérée",
    level: 3,
    intro: "`UnhandledPromiseRejection` : le serveur s'arrête sans prévenir.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Problème",
            value:
              "Le processus Node.js se termine brutalement avec `UnhandledPromiseRejectionWarning` (erreur fatale depuis Node 15).",
          },
          {
            label: "Pourquoi",
            value:
              "Une promesse a rejeté (erreur réseau, fichier absent, bug) sans `.catch()` ni `try`/`catch` autour du `await`. Node.js considère qu'une erreur non gérée laisse le programme dans un état inconnu : il préfère s'arrêter.",
          },
          {
            label: "Mauvais",
            value:
              "`app.get(\"/x\", async (req, res) => { const d = await charger(); res.json(d); });` — si `charger()` rejette, rien ne l'attrape (Express 4).",
          },
          {
            label: "Mieux",
            value:
              "Envelopper les routes async (wrapper qui appelle `next(erreur)`), ou utiliser Express 5 qui transmet nativement les rejets au middleware d'erreur. Et toujours un gestionnaire `process.on(\"unhandledRejection\")` en filet de sécurité.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-bloquer-boucle",
    title: "Erreur : bloquer l'event loop sans s'en rendre compte",
    level: 3,
    intro: "Le serveur devient lent « sans raison » : le fil unique est occupé.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Problème",
            value:
              "Latence qui explose, timeouts en cascade, alors que le code « semble » correct.",
          },
          {
            label: "Pourquoi",
            value:
              "Un traitement synchrone glissé dans une route : `JSON.parse` d'un corps de 50 Mo, tri d'un énorme tableau, `readFileSync` « juste pour cette fois ». Pendant son exécution, aucune autre requête n'avance.",
          },
          {
            label: "Mauvais",
            value:
              "`const donnees = fs.readFileSync(\"export.csv\");` dans une route appelée à chaque requête.",
          },
          {
            label: "Mieux",
            value:
              "Version asynchrone (`await fs.readFile`), stream pour les gros volumes, ou `worker_threads` pour le calcul pur. Mesurer avec `perf_hooks.monitorEventLoopDelay()` en cas de doute.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-require-esm",
    title: "Erreur : `ERR_REQUIRE_ESM`",
    level: 3,
    intro: "Le choc des deux systèmes de modules.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Problème",
            value:
              "`Error [ERR_REQUIRE_ESM]: require() of ES Module not supported` : le programme refuse de démarrer.",
          },
          {
            label: "Pourquoi",
            value:
              "Un fichier CommonJS fait `require(\"un-paquet\")`, mais ce paquet est distribué uniquement en ESM. `require` ne sait pas charger les modules ESM — c'est une limitation technique, pas un bug de votre code.",
          },
          {
            label: "Mauvais",
            value:
              "Forcer avec des astuces de transpilation ou épingler une vieille version du paquet « pour que ça marche ».",
          },
          {
            label: "Mieux",
            value:
              "Migrer le projet vers ESM (`\"type\": \"module\"`, `import`), ou utiliser l'import dynamique `await import(\"un-paquet\")` depuis le code CommonJS. À terme, ESM est la direction de l'écosystème.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-env-undefined",
    title: "Erreur : variable d'environnement `undefined`",
    level: 3,
    intro: "Le programme démarre puis échoue loin du vrai problème.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Problème",
            value:
              "`TypeError: Cannot read properties of undefined` sur `process.env.CLE_API.trim()` — ou pire, une URL de base de données `undefined` qui produit une erreur de connexion cryptique.",
          },
          {
            label: "Pourquoi",
            value:
              "La variable n'est pas définie (`.env` non chargé, faute de frappe dans le nom, variable oubliée sur le serveur). `process.env.X` vaut alors `undefined`, et l'erreur éclate bien plus tard, loin de sa cause.",
          },
          {
            label: "Mauvais",
            value:
              "Utiliser `process.env.X` directement à quinze endroits du code, en découvrant les oublis un par un en production.",
          },
          {
            label: "Mieux",
            value:
              "Le module `config.js` qui valide tout au démarrage (voir section configuration) : le programme refuse de démarrer en nommant exactement la variable manquante.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-port-occupe",
    title: "Erreur : `EADDRINUSE`, port déjà occupé",
    level: 3,
    intro: "Le serveur refuse de démarrer : « address already in use ».",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Problème",
            value:
              "`Error: listen EADDRINUSE: address already in use :::3000` au lancement.",
          },
          {
            label: "Pourquoi",
            value:
              "Un autre processus écoute déjà sur ce port : souvent une ancienne instance du même serveur oubliée en arrière-plan (terminal fermé sans arrêter, `--watch` relancé deux fois).",
          },
          {
            label: "Mauvais",
            value:
              "Changer de port à chaque lancement (3000, 3001, 3002…) et perdre le fil des instances fantômes.",
          },
          {
            label: "Mieux",
            value:
              "Identifier le coupable (`lsof -i :3000` sur macOS/Linux, puis `kill <pid>`), ou rendre le port configurable via `process.env.PORT`. En développement, un seul serveur à la fois par projet.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-npm-install-manuel",
    title: "Erreur : dépendances désynchronisées",
    level: 3,
    intro: "« Ça marche chez moi » : le `node_modules` ne correspond plus au `package.json`.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Problème",
            value:
              "`Cannot find module 'x'` alors que `x` est dans le `package.json`, ou des comportements différents entre deux machines.",
          },
          {
            label: "Pourquoi",
            value:
              "Le `package.json` a été modifié (fusion de branche, édition manuelle) sans relancer `npm install` ; ou le `package-lock.json` n'est pas commité, et chacun installe des versions différentes.",
          },
          {
            label: "Mauvais",
            value:
              "Installer les paquets manquants un par un à la main jusqu'à ce que « ça passe ».",
          },
          {
            label: "Mieux",
            value:
              "`rm -rf node_modules package-lock.json && npm install` pour repartir d'une base saine en cas de doute ; committer systématiquement `package.json` ET `package-lock.json`.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-sync-dans-requete",
    title: "Erreur : `*Sync` dans le chemin d'une requête",
    level: 3,
    intro: "La forme synchrone de `fs`, pratique en script, toxique en serveur.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Problème",
            value:
              "Sous charge, le serveur traite les requêtes l'une après l'autre au lieu d'en parallèle : le débit s'effondre.",
          },
          {
            label: "Pourquoi",
            value:
              "`fs.readFileSync`, `execSync` et leurs cousins bloquent le fil unique pendant toute l'opération. Dans un script CLI c'est anodin ; dans une route appelée 100 fois par seconde, c'est un goulot d'étranglement.",
          },
          {
            label: "Mauvais",
            value:
              "`app.get(\"/rapport\", (req, res) => { const pdf = genererPdfSync(donnees); res.send(pdf); });`",
          },
          {
            label: "Mieux",
            value:
              "Toujours la version asynchrone dans un serveur (`await`, callbacks ou streams). Réserver les formes `*Sync` au démarrage du programme et aux scripts ponctuels.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes et progressifs",
    level: 3,
    intro: "Quatre projets qui montent en puissance : chacun réutilise les acquis du précédent.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — CLI d'organisation de fichiers",
        fields: [
          {
            label: "L'idée",
            value:
              "Un outil en ligne de commande `ranger.js` qui trie les fichiers d'un dossier par extension (`node ranger.js ~/Téléchargements`).",
          },
          {
            label: "Compétences mobilisées",
            value:
              "`process.argv`, `node:fs/promises` (`readdir`, `rename`, `mkdir`), `node:path`, codes de sortie.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "La base du runtime : lire les arguments, manipuler le système de fichiers, gérer les erreurs (`ENOENT`), écrire un programme qui se termine proprement.",
          },
          {
            label: "Difficulté",
            value: "Débutant — un week-end.",
          },
          {
            label: "Projet suivant",
            value: "Ajoutez une option `--dry-run` qui affiche ce qui serait fait sans rien déplacer : premier pas vers les CLI soignés.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — API REST avec Express",
        fields: [
          {
            label: "L'idée",
            value:
              "Une API de gestion de tâches (`GET /taches`, `POST /taches`, `PUT /taches/:id`, `DELETE /taches/:id`), données en mémoire dans un premier temps.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Express (routes, paramètres, `express.json()`), middlewares (journalisation, gestion d'erreurs), codes de statut HTTP, variables d'environnement.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le cœur du développement backend : modéliser des ressources, valider les entrées, structurer une application (routes / services), tester avec un client HTTP.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — une à deux semaines.",
          },
          {
            label: "Projet suivant",
            value: "Écrivez des tests avec `node --test` qui démarrent l'API et vérifient chaque route : la base de la confiance en production.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — API persistée avec SQLite",
        fields: [
          {
            label: "L'idée",
            value:
              "La même API, mais les tâches survivent au redémarrage : stockage dans une base SQLite (fichier local, zéro serveur à administrer).",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Le paquet `better-sqlite3` (pilote SQLite synchrone, adapté aux charges modérées), requêtes préparées, séparation routes / accès données, migrations simples.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "La persistance : schéma de base, requêtes paramétrées (contre les injections SQL), gestion des erreurs de base de données comme erreurs opérationnelles.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire-avancé — deux à trois semaines.",
          },
          {
            label: "Projet suivant",
            value: "Ajoutez la pagination (`?page=2&limite=20`) et le filtrage : les deux fonctionnalités que toute API réelle finit par exiger.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Service complet déployé",
        fields: [
          {
            label: "L'idée",
            value:
              "L'API des projets précédents, durcie et mise en production : authentification par token, tests automatisés, logs structurés, pipeline CI, déploiement sur un VPS avec PM2.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Middleware d'authentification, `helmet`, rate limiting, `node --test`, ESLint, GitHub Actions, `NODE_ENV=production`, PM2 en mode cluster, reverse proxy.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le cycle de vie professionnel complet : ce qui sépare un prototype d'un service que des utilisateurs réels peuvent utiliser — sécurité, observabilité, automatisation, supervision.",
          },
          {
            label: "Difficulté",
            value: "Avancé — un mois, en itérant.",
          },
          {
            label: "Projet suivant",
            value:
              "Le temps réel avec les WebSockets (notifications push), ou la réécriture en TypeScript pour les bases plus grandes.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Les sources officielles d'abord : la documentation de Node.js est excellente.",
    blocks: [
      {
        kind: "list",
        items: [
          "Documentation officielle — https://nodejs.org/docs/latest/api/ : la référence complète de tous les modules natifs (`fs`, `http`, `stream`, `process`…), avec exemples.",
          "Téléchargements et versions — https://nodejs.org/en/download/ : installateurs officiels et explication des versions LTS.",
          "Guides officiels — https://nodejs.org/docs/latest/api/ : la section « Guides » de la doc couvre l'event loop, les modules et le débogage.",
          "Express — https://expressjs.com/ : guide et référence API du framework.",
          "nvm — https://github.com/nvm-sh/nvm : installation et commandes du gestionnaire de versions.",
          "Registre npm — https://www.npmjs.com/ : recherche de paquets, documentation, historique des versions.",
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Comment utiliser la doc",
            value:
              "La référence API de Node.js indique pour chaque fonction depuis quelle version elle existe (« Added in: v18.0.0 ») : vérifiez toujours la compatibilité avec la version que vous utilisez avant d'adopter une API.",
          },
          {
            label: "Bonne pratique",
            value:
              "Face à une erreur, cherchez d'abord son code (`EADDRINUSE`, `ERR_REQUIRE_ESM`) dans la documentation officielle : la cause et souvent la solution y sont décrites.",
          },
        ],
      },
    ],
  },
  {
    id: "etape-suivante",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Node.js maîtrisé dans ses fondamentaux : les directions naturelles.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Approfondir le backend",
            value:
              "Bases de données (PostgreSQL, MongoDB), authentification complète (sessions, OAuth), architecture (NestJS pour les grosses applications), files de messages pour les traitements différés.",
          },
          {
            label: "TypeScript",
            value:
              "Le passage quasi obligé en équipe : le typage statique détecte une classe entière d'erreurs avant l'exécution. Node.js exécute désormais TypeScript expérimentalement, et l'écosystème (NestJS, tRPC) en fait grand usage.",
          },
          {
            label: "Temps réel",
            value:
              "WebSockets (`ws`) ou Server-Sent Events pour le push : chat, notifications, tableaux de bord live. C'est là que l'event loop de Node.js exprime tout son potentiel.",
          },
          {
            label: "DevOps",
            value:
              "Docker (conteneuriser l'application), CI/CD avancée, observabilité (métriques, traces) : les compétences qui transforment un développeur en responsable d'un service en production.",
          },
          {
            label: "JavaScript avancé",
            value:
              "Si certains passages (closures, prototypes, `this`, générateurs) sont restés flous, consolidez le langage : tout le reste repose dessus.",
          },
        ],
      },
    ],
  },
];

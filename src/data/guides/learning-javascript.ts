import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de JavaScript : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_JAVASCRIPT: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est JavaScript, où il s'exécute et pourquoi il est partout.",
    blocks: [
      {
        kind: "text",
        text: "JavaScript est le langage de programmation du web : c'est lui qui rend les pages interactives (menus, formulaires validés en direct, contenu qui se met à jour sans recharger). Créé en 1995 pour animer les pages web, il est aujourd'hui utilisé bien au-delà du navigateur : serveurs, applications mobiles, outils en ligne de commande, objets connectés.",
      },
      {
        kind: "text",
        text: "Pourquoi JavaScript existe : une page web n'est au départ qu'un document statique (HTML pour la structure, CSS pour la présentation). Il fallait un langage capable de réagir aux actions de l'utilisateur — clics, saisie, défilement — et de modifier la page en conséquence, directement dans le navigateur, sans repasser par le serveur à chaque fois. JavaScript remplit ce rôle, et son écosystème a ensuite grandi jusqu'à couvrir le développement complet d'applications.",
      },
      {
        kind: "fields",
        title: "Où JavaScript s'exécute",
        fields: [
          {
            label: "Navigateur",
            value:
              "Son environnement d'origine. Chaque navigateur embarque un moteur JavaScript (V8 dans Chrome et Edge, SpiderMonkey dans Firefox, JavaScriptCore dans Safari). C'est ici que JavaScript manipule la page via le DOM et réagit aux événements.",
          },
          {
            label: "Node.js",
            value:
              "Un runtime qui exécute JavaScript hors navigateur, côté serveur ou en ligne de commande. Il réutilise le moteur V8 et ajoute l'accès au système : fichiers, réseau, processus. C'est l'outil standard pour développer des API, des scripts et des outils avec JavaScript.",
          },
          {
            label: "Deno",
            value:
              "Un runtime plus récent, créé par la même personne que Node.js, qui exécute nativement TypeScript, applique des permissions de sécurité explicites et intègre les outils (formateur, linter, testeur) sans dépendances externes.",
          },
          {
            label: "Bun",
            value:
              "Un runtime récent axé sur la vitesse (démarrage, exécution, installation de paquets). Compatible avec une grande partie de l'écosystème Node.js, il intègre aussi bundler, testeur et gestionnaire de paquets.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point clé : JavaScript est un langage à typage dynamique — une variable peut contenir n'importe quel type de valeur, et une erreur de type n'apparaît qu'à l'exécution. C'est flexible et rapide à écrire, mais sur les gros projets cela rend certaines erreurs plus difficiles à détecter tôt. C'est exactement le problème que TypeScript cherche à résoudre en ajoutant un typage statique au-dessus de JavaScript.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : événements et boucle d'événements",
    level: 1,
    intro:
      "L'idée centrale à comprendre avant tout le reste, en une phrase et un schéma.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : JavaScript n'exécute qu'une seule chose à la fois, mais il sait attendre — quand une opération prend du temps (réponse réseau, clic futur, timer), il la met de côté et continue, puis reprend le travail quand l'événement arrive.",
      },
      {
        kind: "diagram",
        title: "La boucle d'événements, version simplifiée",
        lines: [
          "Votre code s'exécute ligne par ligne (un seul fil)",
          "     │",
          "     ├── Opération immédiate → exécutée tout de suite",
          "     │",
          "     └── Opération qui attend (timer, réseau, clic)",
          "               │",
          "               ▼",
          "          Mise de côté : le programme continue sans bloquer",
          "               │",
          "               ▼",
          "          L'événement arrive → la fonction associée s'exécute",
          "               │",
          "               ▼",
          "          La boucle recommence",
        ],
      },
      {
        kind: "text",
        text: "Ce modèle s'appelle la boucle d'événements (event loop). Il explique pourquoi une page web reste réactive pendant qu'elle charge des données, et pourquoi l'asynchrone (`callbacks`, `promises`, `async`/`await`) est au cœur du langage. La section « Boucle d'événements en détail » (niveau Approfondi) démonte le mécanisme pièce par pièce.",
      },
      {
        kind: "list",
        items: [
          "JavaScript = un langage, plusieurs runtimes (navigateur, Node.js, Deno, Bun).",
          "Typage dynamique : flexible à écrire, erreurs visibles à l'exécution.",
          "Le programme réagit à des événements plutôt que de tout faire d'un coup.",
          "Tout le reste — syntaxe, fonctions, objets, asynchrone — découle de ces idées.",
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
      "Ce qu'il faut connaître avant d'apprendre JavaScript, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Bases HTML et CSS",
        fields: [
          {
            label: "Structure HTML",
            value:
              "Savoir ce qu'est une balise, un attribut, et comment une page est organisée (`<html>`, `<head>`, `<body>`). JavaScript manipule ces éléments via le DOM : sans comprendre la structure, on ne sait pas ce qu'on manipule.",
          },
          {
            label: "Sélecteurs CSS",
            value:
              "Savoir cibler un élément par balise, classe ou identifiant. Les méthodes comme `document.querySelector('.ma-classe')` utilisent exactement la même syntaxe que les sélecteurs CSS.",
          },
          {
            label: "Inclusion d'un script",
            value:
              "Savoir ajouter `<script src=\"app.js\"></script>` à une page. C'est le pont entre votre fichier JavaScript et le navigateur.",
          },
          {
            label: "Notions de programmation",
            value:
              "Variables, conditions (`if`), boucles : si vous avez déjà manipulé ces idées dans n'importe quel langage, JavaScript sera beaucoup plus accessible. Sinon, les premières sections du niveau Approfondi les expliquent depuis zéro.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pas besoin de maîtriser CSS en profondeur (mises en page complexes, animations) pour commencer JavaScript : les bases suffisent. Le reste viendra en pratiquant.",
      },
    ],
  },
  {
    id: "installation-node",
    title: "Installer Node.js",
    level: 2,
    intro:
      "Installer le runtime qui permet d'exécuter JavaScript hors du navigateur.",
    blocks: [
      {
        kind: "text",
        text: "Pourquoi un runtime est nécessaire : le navigateur exécute JavaScript, mais uniquement à l'intérieur d'une page web. Pour lancer un script depuis un terminal, développer un serveur ou utiliser les outils modernes (bundlers, linters, frameworks), il faut un programme capable d'exécuter du JavaScript en dehors du navigateur. C'est le rôle de Node.js : il embarque le moteur V8 de Chrome et y ajoute l'accès au système de fichiers, au réseau et aux processus.",
      },
      {
        kind: "text",
        text: "Deux façons d'installer : télécharger l'installateur LTS depuis le site officiel nodejs.org (le plus simple pour débuter), ou utiliser un gestionnaire de versions comme `nvm` (recommandé dès que vous jonglez entre plusieurs projets — voir la section suivante). Choisissez toujours une version LTS (Long Term Support) : ce sont les versions stables, maintenues sur la durée, adaptées à l'apprentissage comme à la production.",
      },
      {
        kind: "command",
        label: "Vérifier que Node.js est installé et accessible",
        command: "node --version",
        why: "Confirme que le runtime est bien installé et que la commande `node` est accessible depuis le terminal. Affiche la version active.",
        verify:
          "Le terminal affiche un numéro de version, par exemple `v22.x.x`. Si la commande est introuvable, l'installation n'est pas terminée ou le terminal doit être redémarré.",
      },
      {
        kind: "command",
        label: "Vérifier le gestionnaire de paquets fourni avec Node.js",
        command: "npm --version",
        why: "`npm` est installé automatiquement avec Node.js. Il servira à initialiser des projets et à installer des bibliothèques.",
        verify:
          "Le terminal affiche un numéro de version. `npm` est prêt à être utilisé.",
      },
    ],
  },
  {
    id: "versions-node-nvm",
    title: "Gérer les versions de Node avec nvm",
    level: 2,
    intro:
      "Installer et basculer entre plusieurs versions de Node.js sans conflit.",
    blocks: [
      {
        kind: "text",
        text: "Pourquoi un gestionnaire de versions : différents projets peuvent exiger différentes versions de Node.js. Installer une seule version « en dur » sur le système oblige à désinstaller/réinstaller à chaque changement. `nvm` (Node Version Manager, pour macOS et Linux ; `nvm-windows` existe pour Windows avec des commandes proches) installe chaque version dans votre dossier personnel et permet de basculer instantanément, sans droits administrateur et sans toucher à l'installation système.",
      },
      {
        kind: "command",
        label: "Installer la dernière version LTS",
        command: "nvm install --lts",
        why: "Télécharge et installe la version LTS la plus récente dans votre espace utilisateur, sans affecter le reste du système.",
        verify:
          "Le terminal affiche le téléchargement puis `Now using node v... (npm v...)`.",
      },
      {
        kind: "command",
        label: "Utiliser la LTS dans le terminal courant",
        command: "nvm use --lts",
        why: "Active la version LTS pour la session de terminal en cours. Utile après avoir installé une autre version pour un projet spécifique.",
      },
      {
        kind: "command",
        label: "Lister les versions installées",
        command: "nvm ls",
        why: "Affiche toutes les versions de Node.js installées via `nvm` et indique laquelle est active. Permet de vérifier avant de basculer.",
        verify:
          "La liste s'affiche avec une flèche (`->`) devant la version active.",
      },
      {
        kind: "text",
        text: "Bon réflexe : un fichier `.nvmrc` contenant simplement un numéro de version à la racine d'un projet permet à toute l'équipe d'utiliser la même version avec `nvm use` (sans argument, `nvm` lit le fichier).",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet : votre premier script Node.js",
    level: 2,
    intro:
      "Créer un projet de zéro, écrire du JavaScript et l'exécuter, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un dossier pour le projet",
            detail:
              "Commande : `mkdir mon-projet && cd mon-projet`. Pourquoi : chaque projet vit dans son propre dossier, avec ses fichiers et ses dépendances. Vérification : `pwd` affiche le chemin du nouveau dossier.",
          },
          {
            title: "Initialiser un projet npm",
            detail:
              "Commande : `npm init -y`. Pourquoi : crée un fichier `package.json` qui décrit le projet (nom, version, scripts, dépendances). L'option `-y` accepte les valeurs par défaut pour aller vite. Vérification : `ls` affiche `package.json`.",
          },
          {
            title: "Créer le fichier JavaScript",
            detail:
              "Créez `index.js` dans le dossier avec ce contenu : `console.log(\"Bonjour depuis Node.js !\");`. Pourquoi : `console.log` affiche un message dans le terminal — c'est l'outil de vérification le plus simple quand on débute.",
          },
          {
            title: "Exécuter le script",
            detail:
              "Commande : `node index.js`. Pourquoi : `node` suivi d'un nom de fichier exécute le script avec le runtime Node.js. Vérification : le terminal affiche `Bonjour depuis Node.js !`.",
          },
          {
            title: "Modifier et relancer automatiquement",
            detail:
              "Commande : `node --watch index.js`. Pourquoi : relance le script à chaque sauvegarde du fichier, sans retaper la commande. Idéal pour expérimenter. Vérification : modifiez le message, sauvegardez, le nouveau message s'affiche. Arrêt avec `Ctrl+C`.",
          },
          {
            title: "Ajouter un script npm",
            detail:
              "Dans `package.json`, ajoutez `\"scripts\": { \"start\": \"node index.js\" }`, puis lancez `npm run start`. Pourquoi : les scripts npm standardisent les commandes du projet — toute l'équipe lance le projet de la même façon, et la documentation du projet tient en quelques lignes.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "index.js — le script final de ce tutoriel",
        code: `// Affiche un message dans le terminal\nconsole.log("Bonjour depuis Node.js !");\n\n// Affiche aussi la version du runtime utilisé\nconsole.log("Version de Node :", process.version);`,
      },
    ],
  },
  {
    id: "cli-node",
    title: "Les commandes essentielles (Node et npm)",
    level: 2,
    intro:
      "Les commandes que vous utiliserez quotidiennement, avec leur rôle et quand les utiliser.",
    blocks: [
      {
        kind: "fields",
        title: "Commandes Node.js",
        fields: [
          {
            label: "Command — `node`",
            value:
              "Purpose : exécute un fichier JavaScript avec Node.js. Example : `node index.js`. When : pour lancer un script, un serveur ou un outil en ligne de commande.",
          },
          {
            label: "Command — `node --version`",
            value:
              "Purpose : affiche la version de Node.js active. Example : `node --version`. When : pour vérifier l'installation ou diagnostiquer un problème de version.",
          },
          {
            label: "Command — `node -e`",
            value:
              "Purpose : exécute directement du code passé en argument, sans fichier. Example : `node -e \"console.log(2 + 2)\"`. When : pour tester rapidement une expression ou un comportement.",
          },
          {
            label: "Command — `node --watch`",
            value:
              "Purpose : relance le script à chaque modification de fichier. Example : `node --watch index.js`. When : pendant le développement et l'expérimentation.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Commandes npm",
        fields: [
          {
            label: "Command — `npm init -y`",
            value:
              "Purpose : crée un `package.json` avec les valeurs par défaut. Example : `npm init -y`. When : une seule fois, à la création d'un projet.",
          },
          {
            label: "Command — `npm install`",
            value:
              "Purpose : installe les dépendances listées dans `package.json`. Example : `npm install`. When : après avoir cloné un projet, ou après avoir ajouté une dépendance au fichier.",
          },
          {
            label: "Command — `npm install <paquet>`",
            value:
              "Purpose : ajoute une bibliothèque au projet. Example : `npm install lodash`. When : quand vous avez besoin d'une fonctionnalité fournie par un paquet externe.",
          },
          {
            label: "Command — `npm run <script>`",
            value:
              "Purpose : exécute un script défini dans `package.json`. Example : `npm run start`. When : pour lancer, tester ou construire le projet de façon standardisée.",
          },
          {
            label: "Command — `npx <paquet>`",
            value:
              "Purpose : exécute un paquet sans l'installer durablement. Example : `npx prettier --write .`. When : pour utiliser un outil ponctuellement (générateur, formateur, outil en une fois).",
          },
        ],
      },
    ],
  },
  {
    id: "scripts-npm",
    title: "Les scripts npm : automatiser le quotidien",
    level: 2,
    intro:
      "Transformer les commandes répétitives en raccourcis standardisés.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : les scripts npm sont des alias nommés, définis dans `package.json`, qui encapsulent les commandes du projet. Pourquoi ça existe : sans eux, chaque développeur doit connaître et retaper les bonnes commandes (`node --watch index.js`, `node --test`, etc.), ce qui crée des erreurs et des différences entre les environnements. Avec eux, `npm run dev`, `npm test` et `npm start` fonctionnent pareil pour tout le monde, et la CI utilise exactement les mêmes commandes.",
      },
      {
        kind: "code",
        language: "json",
        title: "package.json — des scripts typiques",
        code: `{
  "name": "mon-projet",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "node --test"
  }
}`,
      },
      {
        kind: "list",
        items: [
          "`npm start` est un raccourci spécial : il équivaut à `npm run start`.",
          "`npm test` aussi : il lance le script `test` s'il existe.",
          "Nommez les scripts par intention (`dev`, `test`, `build`, `lint`) plutôt que par commande : le nom doit dire ce que ça fait, pas comment.",
        ],
      },
    ],
  },
  {
    id: "package-managers",
    title: "Les gestionnaires de paquets",
    level: 2,
    intro:
      "npm, pnpm, Yarn, Bun : ce qu'ils font, leurs différences factuelles, et comment choisir.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un gestionnaire de paquets installe, met à jour et organise les bibliothèques externes dont votre projet dépend. Pourquoi ça existe : plutôt que de copier-coller du code trouvé sur internet, vous déclarez vos dépendances dans `package.json` et l'outil les télécharge depuis un registre (principalement npmjs.com), gère les versions et les dépendances transitives. Sans lui, maintenir les versions compatibles entre développeurs serait ingérable.",
      },
      {
        kind: "table",
        headers: ["Outil", "Particularité", "Quand l'envisager"],
        rows: [
          [
            "npm",
            "Fourni avec Node.js, le plus répandu, registre par défaut",
            "Par défaut : zéro installation supplémentaire, compatibilité maximale",
          ],
          [
            "pnpm",
            "Stocke les paquets une seule fois sur disque et les lie par liens symboliques",
            "Monorepos ou disque limité ; empêche d'importer une dépendance non déclarée",
          ],
          [
            "Yarn",
            "A introduit les lockfiles et les workspaces, écosystème mature",
            "Projets qui utilisent déjà Yarn, ou ses fonctionnalités de workspaces avancées",
          ],
          [
            "Bun",
            "Gestionnaire intégré au runtime Bun, installation très rapide",
            "Quand le projet utilise déjà Bun comme runtime",
          ],
        ],
      },
      {
        kind: "text",
        text: "Différences factuelles à connaître : `pnpm` utilise des liens symboliques vers un magasin partagé, ce qui évite de dupliquer les paquets entre projets et empêche d'importer une dépendance non déclarée. `yarn` a introduit les lockfiles et les workspaces. `bun` est le plus rapide mais impose le runtime Bun. Aucun n'est universellement supérieur : le choix dépend du projet, de l'équipe et des contraintes (CI, monorepo, compatibilité).",
      },
      {
        kind: "text",
        text: "Point commun essentiel : quel que soit l'outil, le lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lock`) doit être versionné avec Git. C'est lui qui garantit que tous les développeurs installent exactement les mêmes versions.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Choisir un éditeur pour JavaScript",
    level: 2,
    intro:
      "Les éditeurs courants, leurs profils, sans classement absolu.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : pour JavaScript, le minimum professionnel est un éditeur avec coloration syntaxique, autocomplétion et un terminal intégré. Pourquoi : l'autocomplétion et les indications d'erreur en direct évitent une grande partie des erreurs bêtes (fautes de frappe dans les noms de fonctions, parenthèses oubliées) et accélèrent l'apprentissage en montrant les méthodes disponibles.",
      },
      {
        kind: "fields",
        title: "Éditeurs courants",
        fields: [
          {
            label: "VS Code",
            value:
              "Gratuit, le plus répandu pour JavaScript. Excellent support natif (debugger Node.js intégré, terminal intégré), immense catalogue d'extensions. Bon choix par défaut.",
          },
          {
            label: "WebStorm",
            value:
              "IDE payant de JetBrains, très complet dès l'installation (refactoring avancé, intégrations frameworks). Profil : développeurs qui préfèrent un outil tout-en-un plutôt qu'assembler des extensions.",
          },
          {
            label: "Zed",
            value:
              "Éditeur récent, très rapide, collaboration intégrée. Profil : développeurs qui veulent la légèreté et la vitesse avec un support JavaScript/TypeScript solide.",
          },
          {
            label: "Neovim / Vim",
            value:
              "Éditeurs au clavier, extrêmement personnalisables via configuration. Profil : développeurs déjà à l'aise avec les raccourcis modaux, qui veulent un environnement sur mesure.",
          },
          {
            label: "Sublime Text",
            value:
              "Léger et rapide, licence payante avec évaluation illimitée. Profil : édition rapide de fichiers, machines modestes.",
          },
        ],
      },
      {
        kind: "text",
        text: "Quel que soit l'éditeur, deux réglages changent tout pour JavaScript : activer le formatage automatique à la sauvegarde (avec Prettier, voir la section dédiée) et installer l'extension ESLint pour voir les problèmes pendant que vous écrivez.",
      },
    ],
  },
  {
    id: "devtools-navigateur",
    title: "Les DevTools du navigateur",
    level: 2,
    intro:
      "L'atelier de tout développeur JavaScript côté navigateur : inspecter, tester, déboguer.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : les DevTools (F12 ou Ctrl+Maj+I / Cmd+Option+I) sont les outils de développement intégrés au navigateur. Pourquoi c'est essentiel : c'est le seul endroit où vous voyez votre JavaScript s'exécuter dans son environnement réel — avec la page, le réseau et le stockage. Savoir les utiliser, c'est diviser par dix le temps passé à chercher pourquoi « ça ne marche pas ».",
      },
      {
        kind: "fields",
        title: "Les panneaux à connaître",
        fields: [
          {
            label: "Console",
            value:
              "Affiche les `console.log`, les erreurs et les avertissements. On peut aussi y exécuter du JavaScript directement sur la page ouverte : idéal pour tester une expression en une seconde.",
          },
          {
            label: "Éléments",
            value:
              "Affiche le DOM de la page en direct. Permet de voir exactement ce que votre JavaScript a modifié, et de tester des changements HTML/CSS sans toucher aux fichiers.",
          },
          {
            label: "Sources",
            value:
              "Affiche vos fichiers JavaScript avec des points d'arrêt (breakpoints) : l'exécution s'arrête sur une ligne et vous inspectez les variables. Le vrai débogage commence ici (voir la section Debugging).",
          },
          {
            label: "Réseau",
            value:
              "Liste toutes les requêtes (pages, scripts, appels `fetch`). Indispensable quand une API ne répond pas : on voit l'URL appelée, les paramètres envoyés et la réponse reçue.",
          },
        ],
      },
      {
        kind: "text",
        text: "Premier réflexe à prendre : dès qu'une page se comporte bizarrement, ouvrir la Console. La plupart des erreurs JavaScript s'y affichent avec le fichier, la ligne et un message — c'est le point de départ de tout diagnostic.",
      },
    ],
  },
  {
    id: "comprendre-les-erreurs",
    title: "Lire un message d'erreur",
    level: 2,
    intro:
      "Les messages d'erreur sont des instructions de dépannage, pas des sanctions.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un message d'erreur JavaScript indique le type du problème, l'endroit où il s'est produit et souvent la ligne exacte. Pourquoi c'est une compétence en soi : les débutants ignorent les messages d'erreur et cherchent au hasard ; les développeurs efficaces les lisent en premier, car 80 % du diagnostic est déjà écrit.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Anatomie d'une erreur typique",
        code: `// Code fautif\nconst utilisateur = null;\nconsole.log(utilisateur.nom);\n\n// Message affiché :\n// TypeError: Cannot read properties of null (reading 'nom')\n//     at Object.<anonymous> (/projet/index.js:2:29)`,
      },
      {
        kind: "fields",
        title: "Comment lire ce message",
        fields: [
          {
            label: "Le type (`TypeError`)",
            value:
              "Indique la famille du problème : ici, une opération invalide sur un type de valeur. Les familles courantes sont `TypeError`, `ReferenceError` (variable inexistante), `SyntaxError` (code invalide) et `RangeError`.",
          },
          {
            label: "La description",
            value:
              "`Cannot read properties of null (reading 'nom')` : on a tenté de lire la propriété `nom` sur `null`. La cause est presque toujours en amont : pourquoi `utilisateur` vaut-il `null` ici ?",
          },
          {
            label: "La pile (`at ... index.js:2:29`)",
            value:
              "Le fichier, la ligne (2) et la colonne (29) où l'erreur s'est produite. On se place sur cette ligne, puis on remonte : d'où vient la valeur fautive ?",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : lire le message en entier avant de chercher une solution, et chercher la cause (la valeur `null`) plutôt que de masquer le symptôme. La section « Erreurs fréquentes » du niveau Approfondi catalogue les dix erreurs que vous croiserez le plus souvent.",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Le workflow professionnel",
    level: 2,
    intro:
      "Comment le code va de votre clavier jusqu'aux utilisateurs, en pratique.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de développement standard",
        lines: [
          "Branche Git dédiée (`git checkout -b feature/panier`)",
          "     │",
          "     ▼",
          "Installer / mettre à jour les dépendances (`npm install`)",
          "     │",
          "     ▼",
          "Écrire le code (éditeur + formatage auto + ESLint en direct)",
          "     │",
          "     ▼",
          "Vérifier : relire, tester manuellement, lancer les tests (`npm test`)",
          "     │",
          "     ▼",
          "Commiter (`git commit`) puis pousser la branche (`git push`)",
          "     │",
          "     ▼",
          "Pull request → la CI rejoue tests et lint automatiquement",
          "     │",
          "     ▼",
          "Revue par un pair → corrections éventuelles → fusion",
          "     │",
          "     ▼",
          "Déploiement (automatique ou manuel selon le projet)",
        ],
      },
      {
        kind: "text",
        text: "Pourquoi ce workflow existe : il rend le travail d'équipe prévisible et réversible. Chaque changement est isolé dans une branche (on peut l'abandonner sans risque), vérifié automatiquement par la CI avant d'être relu par un humain, et chaque étape laisse une trace dans Git. Même en solo, adopter ce cycle (branche → vérification → commit → push) évite la plupart des catastrophes : on ne casse jamais directement une version qui fonctionne.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : SYNTAXE, TYPES, FONCTIONS
  // ------------------------------------------------------------------
  {
    id: "syntaxe-et-variables",
    title: "Syntaxe et variables (`let`, `const`, `var`)",
    level: 3,
    intro:
      "Déclarer des variables correctement : la base sur laquelle tout repose.",
    blocks: [
      {
        kind: "text",
        text: "`let` et `const` déclarent des variables ; `const` interdit la réaffectation, `let` l'autorise ; `var` est la forme historique, à éviter dans le code moderne.",
      },
      {
        kind: "text",
        text: "Un programme manipule des données : il faut des noms pour les désigner et des règles pour savoir où ces noms sont visibles (la portée). `const` par défaut exprime une intention — « cette variable ne changera pas de valeur » — ce qui rend le code plus prévisible et les erreurs de réaffectation accidentelle impossibles.",
      },
      {
        kind: "text",
        text: "`const` par défaut, `let` quand la valeur doit vraiment changer (compteur de boucle, accumulateur). `var` : jamais dans le nouveau code — sa portée de fonction et son hoisting surprenant sont une source historique de bugs.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "`const` fige la liaison, pas le contenu : un objet déclaré avec `const` peut toujours voir ses propriétés modifiées. La portée de `let`/`const` est le bloc (`{ ... }`) qui les contient.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Réaffecter un `const` lève `TypeError: Assignment to constant variable`. Autre piège : croire qu'un objet `const` est immuable — seule la réaffectation est interdite, pas la mutation.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commencer chaque déclaration par `const` et ne passer à `let` que si le compilateur — ou la logique — l'exige. Cela réduit la surface des valeurs qui changent, donc des bugs.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple\nconst PI = 3.14159;\nlet compteur = 0;\ncompteur = compteur + 1; // OK : let autorise la réaffectation\n// PI = 3; // ERREUR : réaffectation d'un const\n\n// Exemple réel : const n'empêche pas la mutation d'un objet\nconst panier = { articles: [] };\npanier.articles.push("livre"); // OK : on modifie le contenu, pas la liaison\nconsole.log(panier.articles.length); // 1`,
      },
    ],
  },
  {
    id: "types-primitifs",
    title: "Les types primitifs",
    level: 3,
    intro:
      "Les sept briques de base dont toutes les valeurs JavaScript sont faites.",
    blocks: [
      {
        kind: "text",
        text: "JavaScript possède sept types primitifs : `string`, `number`, `bigint`, `boolean`, `undefined`, `null` et `symbol` — tout le reste (objets, tableaux, fonctions) est construit au-dessus.",
      },
      {
        kind: "text",
        text: "Distinguer les sortes de valeurs permet au langage de définir des opérations sensées : additionner des nombres, concaténer des chaînes, tester des booléens. Chaque type a ses règles, et les connaître évite les surprises de conversion implicite.",
      },
      {
        kind: "text",
        text: "En permanence : chaque valeur manipulée appartient à l'un de ces types. Le choix conscient du type (par exemple `null` pour « pas de valeur » plutôt qu'une chaîne vide) rend le code plus clair.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Les primitifs sont immuables et copiés par valeur : affecter `a = b` copie la valeur, les deux variables deviennent indépendantes. `typeof` révèle le type d'une valeur — avec le piège historique `typeof null === \"object\"`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Confondre `undefined` (variable déclarée mais sans valeur, ou propriété absente) et `null` (absence volontaire de valeur). Et le classique : `typeof null` vaut `\"object\"`, un bug du langage jamais corrigé pour compatibilité.",
          },
          {
            label: "Bonne pratique",
            value:
              "Utiliser `null` pour représenter explicitement l'absence de valeur, et réserver `undefined` au « pas encore défini » naturel du langage. Vérifier les types aux frontières (entrées utilisateur, réponses d'API).",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Les sept primitifs en action",
        code: `const nom = "Akane";        // string\nconst age = 25;              // number (entiers ET décimaux : pas de int/float)\nconst grand = 10n;            // bigint : entiers arbitrairement grands (suffixe n)\nconst actif = true;           // boolean\nlet adresse;                 // undefined : déclaré, sans valeur\nconst reponse = null;         // null : absence volontaire de valeur\nconst cle = Symbol("id");     // symbol : identifiant unique\n\nconsole.log(typeof nom);      // "string"\nconsole.log(typeof grand);    // "bigint"\nconsole.log(typeof reponse);  // "object" (piège historique !)`,
      },
    ],
  },
  {
    id: "egalite-et-coercition",
    title: "Égalité stricte : `===` contre `==`",
    level: 3,
    intro:
      "La source de bugs la plus célèbre du langage, et la règle simple qui l'évite.",
    blocks: [
      {
        kind: "text",
        text: "`===` compare valeur ET type sans conversion ; `==` convertit les types avant de comparer, selon des règles complexes et surprenantes.",
      },
      {
        kind: "text",
        text: "`==` date des débuts du langage, quand la souplesse primait sur la rigueur (comparer un champ de formulaire, toujours une chaîne, à un nombre). `===` a été ajouté pour offrir une comparaison prévisible. L'histoire a tranché : la souplesse de `==` crée plus de bugs qu'elle n'en évite.",
      },
      {
        kind: "text",
        text: "`===` (et `!==`) systématiquement. La seule exception admise par beaucoup d'équipes : `x == null`, qui teste à la fois `null` et `undefined` en une expression — mais même là, être explicite est souvent préférable.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Avec `==`, JavaScript applique la « coercition » : `\"5\" == 5` vaut `true` (la chaîne est convertie en nombre), `0 == false` vaut `true`, `\"\" == false` vaut `true`. Les règles complètes tiennent en plusieurs pages de spécification — raison de plus pour ne pas les utiliser.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Comparer une entrée utilisateur (toujours une chaîne) à un nombre avec `==` et obtenir un `true` inattendu, ou l'inverse : `false == \"0\"` vaut `true`, ce qui surprend même les développeurs expérimentés.",
          },
          {
            label: "Bonne pratique",
            value:
              "Convertir explicitement AVANT de comparer : `Number(saisie) === 5` plutôt que `saisie == 5`. Le code dit ce qu'il fait, et le lecteur n'a pas à connaître les tables de coercition.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple : la différence en trois lignes\nconsole.log(5 === "5");  // false : types différents, pas de conversion\nconsole.log(5 == "5");   // true  : la chaîne est convertie en nombre\nconsole.log(0 == false); // true  : surprise classique\n\n// Exemple réel : valider une saisie de formulaire (toujours une chaîne)\nfunction estMajeur(saisie) {\n  const age = Number(saisie);      // conversion EXPLICITE\n  return Number.isFinite(age) && age >= 18;\n}\nconsole.log(estMajeur("20")); // true\nconsole.log(estMajeur("abc")); // false (Number("abc") vaut NaN)`,
      },
    ],
  },
  {
    id: "conversions-de-types",
    title: "Conversions de types explicites",
    level: 3,
    intro:
      "Convertir volontairement, plutôt que de laisser le langage deviner.",
    blocks: [
      {
        kind: "text",
        text: "Les fonctions `Number()`, `String()`, `Boolean()` et les méthodes comme `parseInt()` convertissent explicitement une valeur vers un autre type.",
      },
      {
        kind: "text",
        text: "Les données venues de l'extérieur (formulaires, URL, API, fichiers) arrivent souvent sous forme de chaînes. Il faut les transformer en nombres, booléens ou dates avant de calculer. La conversion explicite rend cette étape visible et contrôlable.",
      },
      {
        kind: "text",
        text: "À chaque frontière : lecture d'un champ de formulaire, paramètre d'URL, réponse d'API, argument de ligne de commande. Convertir tôt, valider aussitôt.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "`Number(\"42\")` vaut `42`, `Number(\"abc\")` vaut `NaN` (Not a Number — une valeur spéciale de type `number` !). `parseInt(\"42px\")` vaut `42` (il s'arrête au premier caractère invalide) tandis que `Number(\"42px\")` vaut `NaN` (tout ou rien). `String(42)` vaut `\"42\"`, `Boolean(0)` vaut `false`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier que `NaN !== NaN` : pour tester si une valeur est `NaN`, il faut `Number.isNaN(valeur)`. Autre piège : `parseInt` sans base sur des chaînes comme `\"08\"` — toujours préciser la base : `parseInt(chaine, 10)`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Après chaque conversion depuis l'extérieur, valider le résultat (`Number.isFinite`, `Number.isNaN`) avant de l'utiliser. Une conversion non validée propage `NaN` silencieusement dans tous les calculs suivants.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple\nconsole.log(Number("42"));      // 42\nconsole.log(Number("42px"));    // NaN : tout ou rien\nconsole.log(parseInt("42px", 10)); // 42 : s'arrête au premier caractère invalide\nconsole.log(Number.isNaN(Number("abc"))); // true : la bonne façon de tester NaN\n\n// Exemple réel : lire un paramètre numérique d'URL\nfunction lirePage(parametre) {\n  const page = Number(parametre);\n  if (!Number.isInteger(page) || page < 1) {\n    return 1; // valeur par défaut sûre\n  }\n  return page;\n}`,
      },
    ],
  },
  {
    id: "operateurs",
    title: "Opérateurs essentiels",
    level: 3,
    intro:
      "Les opérateurs du quotidien et leurs subtilités.",
    blocks: [
      {
        kind: "fields",
        title: "À connaître absolument",
        fields: [
          {
            label: "Arithmétiques et affectation",
            value:
              "`+ - * / %` (modulo), `**` (puissance). Les formes combinées `+=`, `-=`, `*=`, `/=` modifient la variable en place. Attention : `+` concatène si un opérande est une chaîne.",
          },
          {
            label: "Logiques : `&&`, `||`, `!`",
            value:
              "Ils ne retournent pas forcément des booléens : `&&` et `||` retournent l'un de leurs opérandes (évaluation en court-circuit). `a && b` vaut `a` si `a` est falsy, sinon `b`. C'est très utilisé pour les valeurs par défaut et les gardes.",
          },
          {
            label: "`??` (nullish coalescing)",
            value:
              "`a ?? b` vaut `b` uniquement si `a` est `null` ou `undefined` — contrairement à `||` qui réagit aussi à `0`, `\"\"` et `false`. À préférer pour les valeurs par défaut quand `0` ou `\"\"` sont des valeurs légitimes.",
          },
          {
            label: "`?.` (optional chaining)",
            value:
              "`utilisateur?.adresse?.ville` s'arrête proprement et vaut `undefined` si un maillon est `null`/`undefined`, au lieu de lever une erreur. Indispensable pour naviguer dans des données d'API incertaines.",
          },
          {
            label: "Comparaison",
            value:
              "`===` / `!==` (stricts, à utiliser), `>`, `<`, `>=`, `<=`. Éviter `==` / `!=` (voir la section Égalité stricte).",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple réel : combiner les opérateurs modernes",
        code: `function afficherProfil(reponseApi) {\n  // ?. évite l'erreur si reponseApi ou utilisateur est absent\n  // ?? fournit des valeurs par défaut sans écraser 0 ou ""\n  const nom = reponseApi?.utilisateur?.nom ?? "Invité";\n  const essais = reponseApi?.utilisateur?.essaisRestants ?? 3;\n  return nom + " — essais restants : " + essais;\n}`,
      },
    ],
  },
  {
    id: "fonctions-declaration-expression",
    title: "Fonctions : déclarations et expressions",
    level: 3,
    intro:
      "La brique fondamentale du langage : tout tourne autour des fonctions.",
    blocks: [
      {
        kind: "text",
        text: "Une fonction est un bloc de code réutilisable qui prend des paramètres en entrée et peut retourner une valeur ; on la définit par déclaration (`function nom() {}`) ou par expression (`const nom = function() {}`).",
      },
      {
        kind: "text",
        text: "Sans fonctions, chaque action répétée devrait être recopiée : le code deviendrait immense et toute correction devrait être appliquée à chaque copie. Les fonctions permettent de nommer une action, de la réutiliser et de la tester isolément.",
      },
      {
        kind: "text",
        text: "Dès qu'une action est répétée, ou dès qu'un bloc de code mérite un nom qui explique son intention. En JavaScript, les fonctions servent aussi de callbacks (passées en argument), de méthodes d'objet et de briques des modules.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Les déclarations de fonction sont « hissées » (hoisted) : utilisables avant leur ligne de définition. Les expressions affectées à `const` ne le sont pas. Une fonction sans `return` explicite retourne `undefined`. Les paramètres non fournis valent `undefined`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `return` et s'étonner de recevoir `undefined`. Ou appeler une fonction définie par expression avant sa ligne de définition (`ReferenceError` : elle n'est pas hissée comme les déclarations).",
          },
          {
            label: "Bonne pratique",
            value:
              "Une fonction = une responsabilité, un nom verbal qui dit ce qu'elle fait (`calculerTotal`, pas `traitement`). Préférer les fonctions pures (même entrées → même sortie, pas d'effet de bord) quand c'est possible : elles sont prévisibles et testables.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Déclaration : hissée, utilisable avant sa définition dans le code\nfunction carre(n) {\n  return n * n;\n}\n\n// Expression : la fonction est une valeur comme une autre\nconst double = function (n) {\n  return n * 2;\n};\n\n// Exemple réel : une fonction pure, nommée par son intention\nfunction calculerTotal(prix, quantite, tauxTva) {\n  const horsTaxe = prix * quantite;\n  return horsTaxe * (1 + tauxTva);\n}\nconsole.log(calculerTotal(10, 3, 0.2)); // 36`,
      },
    ],
  },
  {
    id: "parametres-avances",
    title: "Paramètres : défauts, rest et déstructuration",
    level: 3,
    intro:
      "Des fonctions flexibles sans complexité artificielle.",
    blocks: [
      {
        kind: "text",
        text: "Les paramètres par défaut donnent une valeur de repli, `...rest` regroupe les arguments excédentaires en tableau, et la déstructuration extrait directement les propriétés d'un objet passé en argument.",
      },
      {
        kind: "text",
        text: "Les fonctions réelles ont souvent des options : sans ces mécanismes, il fallait tester manuellement chaque argument manquant (`if (x === undefined) x = ...`), ce qui noyait l'intention sous du code défensif répétitif.",
      },
      {
        kind: "text",
        text: "Valeurs par défaut pour les options courantes ; `...rest` pour les fonctions à nombre variable d'arguments ; déstructuration quand une fonction prend un « objet d'options » avec plusieurs champs.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Le défaut s'applique quand l'argument vaut `undefined` (absent ou explicitement `undefined`). `...rest` doit être le dernier paramètre et produit toujours un tableau. La déstructuration peut elle-même avoir des défauts : `function f({a = 1} = {})`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier le `= {}` de secours : `function f({a})` appelée sans argument lève `TypeError` car on déstructure `undefined`. Toujours prévoir l'objet vide par défaut.",
          },
          {
            label: "Bonne pratique",
            value:
              "Au-delà de 2-3 paramètres, passer un objet d'options déstructuré plutôt qu'une longue liste positionnelle : l'appel devient lisible (`creer({nom, age})`) et l'ordre n'importe plus.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple : les trois mécanismes\nfunction saluer(nom = "invité") {\n  return "Bonjour " + nom;\n}\nfunction somme(...nombres) {\n  return nombres.reduce((total, n) => total + n, 0);\n}\nconsole.log(saluer());      // "Bonjour invité"\nconsole.log(somme(1, 2, 3)); // 6\n\n// Exemple réel : objet d'options avec défauts\nfunction connecter({ hote = "localhost", port = 3000, ssl = false } = {}) {\n  const protocole = ssl ? "https" : "http";\n  return protocole + "://" + hote + ":" + port;\n}\nconsole.log(connecter({ port: 8080 })); // "http://localhost:8080"`,
      },
    ],
  },
  {
    id: "fonctions-flechees",
    title: "Les fonctions fléchées (`=>`)",
    level: 3,
    intro:
      "La syntaxe courte omniprésente — et sa vraie différence avec `function`.",
    blocks: [
      {
        kind: "text",
        text: "Les fonctions fléchées sont une syntaxe concise pour écrire des fonctions, avec une différence fondamentale : elles ne créent pas leur propre `this`, elles héritent de celui du contexte englobant.",
      },
      {
        kind: "text",
        text: "Les callbacks courts (`tableau.map(x => x * 2)`) devenaient illisibles avec la syntaxe `function`. La fléchée réduit le bruit. Et le `this` hérité résout le casse-tête historique du `this` perdu dans les callbacks (voir la section `this`).",
      },
      {
        kind: "text",
        text: "Callbacks courts, fonctions de transformation (`map`, `filter`), fonctions qui n'ont pas besoin de leur propre `this`. Éviter comme méthodes d'objet quand on a besoin du `this` dynamique de l'objet.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "`x => x * 2` : un seul paramètre, parenthèses optionnelles ; corps sur une ligne = retour implicite. Corps en bloc `{ ... }` = `return` explicite requis. Pas de `this` propre, pas d'`arguments` propre, inutilisables comme constructeurs (`new`).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Retourner un objet littéral sans parenthèses : `() => { nom: \"x\" }` est interprété comme un bloc de code, pas un objet — il faut `() => ({ nom: \"x\" })`. Autre piège : utiliser une fléchée comme méthode d'objet en espérant que `this` désigne l'objet.",
          },
          {
            label: "Bonne pratique",
            value:
              "Réserver les fléchées aux fonctions courtes sans `this` propre. Pour une méthode d'objet ou un constructeur, utiliser la syntaxe adaptée (`function` ou méthode de classe).",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple : la concision\nconst double = x => x * 2;               // retour implicite\nconst versObjet = id => ({ id: id });    // parenthèses obligatoires autour de l'objet\n\n// Exemple réel : chaînage lisible sur un tableau\nconst utilisateurs = [\n  { nom: "Akane", actif: true, age: 25 },\n  { nom: "Sara", actif: false, age: 30 },\n];\nconst nomsActifs = utilisateurs\n  .filter(u => u.actif)\n  .map(u => u.nom);\nconsole.log(nomsActifs); // ["Akane"]`,
      },
    ],
  },
  {
    id: "closures",
    title: "Les closures (fermetures)",
    level: 3,
    intro:
      "Le concept le plus puissant — et le plus mal expliqué — du langage.",
    blocks: [
      {
        kind: "text",
        text: "Une closure, c'est une fonction qui « se souvient » des variables de l'endroit où elle a été créée, même après que cet endroit a fini de s'exécuter.",
      },
      {
        kind: "text",
        text: "Pour créer des fonctions avec une mémoire privée : un compteur qui retient sa valeur entre deux appels, un gestionnaire d'événement qui connaît son contexte, une fonction préconfigurée. Sans closures, il faudrait des variables globales — visibles et modifiables par tout le monde.",
      },
      {
        kind: "text",
        text: "Fabriques de fonctions, callbacks qui ont besoin d'un contexte, encapsulation de données privées, gestionnaires d'événements, programmation fonctionnelle (`map`, `filter` avec paramètres).",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Quand une fonction est créée, elle capture une référence vers la portée englobante — pas une copie des valeurs. Si la variable change après, la closure voit la nouvelle valeur. La variable capturée reste en vie tant que la closure existe (le ramasse-miettes ne la libère pas).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le piège historique : créer des fonctions dans une boucle `for` avec `var` — toutes les closures partagent la MÊME variable `i`, qui vaut la valeur finale au moment où elles s'exécutent. Avec `let`, chaque itération a sa propre variable : le problème disparaît.",
          },
          {
            label: "Bonne pratique",
            value:
              "Utiliser les closures pour encapsuler un état privé plutôt que des variables globales. Attention à ne pas capturer accidentellement de gros objets dans des closures à longue durée de vie (fuites mémoire).",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple : un compteur à mémoire privée",
        code: `function creerCompteur() {\n  let total = 0; // variable \"privée\" : inaccessible de l'extérieur\n  return function () {\n    total = total + 1; // la closure se souvient de total\n    return total;\n  };\n}\nconst compteur = creerCompteur();\nconsole.log(compteur()); // 1\nconsole.log(compteur()); // 2 : la mémoire persiste entre les appels`,
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple réel et piège classique",
        code: `// Exemple réel : fabriquer des gestionnaires préconfigurés\nfunction creerMessage(prefixe) {\n  return function (nom) {\n    console.log(prefixe + " " + nom);\n  };\n}\nconst direBonjour = creerMessage("Bonjour");\ndireBonjour("Akane"); // "Bonjour Akane"\n\n// Piège classique : var partagé dans une boucle\nfor (var i = 0; i < 3; i++) {\n  setTimeout(function () { console.log("var:", i); }, 10);\n}\n// Affiche "var: 3" trois fois : les 3 closures partagent le même i\nfor (let j = 0; j < 3; j++) {\n  setTimeout(function () { console.log("let:", j); }, 10);\n}\n// Affiche "let: 0", "let: 1", "let: 2" : chaque itération a son j`,
      },
    ],
  },
  {
    id: "portee-hoisting",
    title: "Portée et hoisting",
    level: 3,
    intro:
      "Où une variable est visible, et la subtilité du « hissage ».",
    blocks: [
      {
        kind: "text",
        text: "La portée (scope) définit où une variable est accessible ; le hoisting (« hissage ») remonte les déclarations en haut de leur portée avant l'exécution — avec des comportements très différents selon `var`, `let`/`const` et `function`.",
      },
      {
        kind: "text",
        text: "Limiter la visibilité des variables évite les collisions de noms et rend le code modulaire : une variable de boucle ne devrait pas polluer tout le fichier. Le hoisting est un héritage historique qui permettait d'appeler des fonctions avant leur définition.",
      },
      {
        kind: "text",
        text: "En pratique : déclarer les variables au plus près de leur usage, dans le bloc le plus petit possible. Comprendre le hoisting sert surtout à diagnostiquer des erreurs étranges dans du code ancien.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "`let`/`const` : portée de bloc, utilisables uniquement APRÈS leur déclaration — avant, c'est la « zone morte temporelle » (TDZ) qui lève `ReferenceError`. `var` : portée de fonction, hissée et initialisée à `undefined` — utilisable avant (avec `undefined`). Déclarations `function` : entièrement hissées, appelables avant leur ligne.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`ReferenceError: Cannot access 'x' before initialization` — on a utilisé un `let` avant sa déclaration, souvent après un réordonnancement de code. Avec `var`, le même code aurait silencieusement valu `undefined` : un bug au lieu d'une erreur claire.",
          },
          {
            label: "Bonne pratique",
            value:
              "Déclarer en haut du bloc quand c'est naturel, ne jamais compter sur le hoisting volontairement, et préférer l'erreur claire du `let` (TDZ) au silence trompeur du `var`.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Les trois comportements côte à côte",
        code: `console.log(typeof declaree); // "function" : entièrement hissée\nfunction declaree() {}\n\n// console.log(v); // ReferenceError : TDZ du let\nlet v = 1;\n\nconsole.log(w); // undefined : var hissé mais pas initialisé\nvar w = 2;`,
      },
    ],
  },
  {
    id: "this-les-4-cas",
    title: "`this` : les 4 cas, sans mysticisme",
    level: 3,
    intro:
      "`this` n'est pas magique : sa valeur dépend uniquement de la façon dont la fonction est appelée.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : `this` vaut ce qui se trouve « devant le point » au moment de l'appel — et il y a exactement quatre situations à connaître. Pourquoi c'est déroutant : dans la plupart des langages, `this` désigne toujours l'objet courant ; en JavaScript, c'est le MODE D'APPEL qui décide, pas l'endroit où la fonction est définie.",
      },
      {
        kind: "fields",
        title: "Les 4 cas",
        fields: [
          {
            label: "1. Appel simple : `this` = contexte global (ou `undefined`)",
            value:
              "`direBonjour()` appelée « toute seule » : en mode strict, `this` vaut `undefined` ; hors mode strict, l'objet global. C'est le cas qui surprend : une méthode détachée de son objet retombe ici.",
          },
          {
            label: "2. Appel méthode : `this` = l'objet devant le point",
            value:
              "`utilisateur.direBonjour()` : `this` vaut `utilisateur`. C'est le cas intuitif et le plus courant. Attention : `const f = utilisateur.direBonjour; f()` retombe dans le cas 1 !",
          },
          {
            label: "3. Constructeur : `this` = le nouvel objet",
            value:
              "Avec `new Utilisateur()`, `this` désigne l'objet en cours de création. Les classes modernes utilisent ce mécanisme sous le capot.",
          },
          {
            label: "4. Appel explicite : `call`, `apply`, `bind`",
            value:
              "`f.call(obj)` force `this` à valoir `obj` pour cet appel. `bind` crée une nouvelle fonction avec `this` fixé définitivement — utile pour passer une méthode en callback sans perdre son objet.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple : les 4 cas",
        code: `"use strict";\nconst utilisateur = {\n  nom: "Akane",\n  direBonjour() { return "Bonjour, " + this.nom; },\n};\nconsole.log(utilisateur.direBonjour()); // cas 2 : "Bonjour, Akane"\n\nconst detachee = utilisateur.direBonjour;\n// detachee(); // cas 1 : ERREUR, this est undefined\n\nconst liee = utilisateur.direBonjour.bind(utilisateur); // cas 4\nconsole.log(liee()); // "Bonjour, Akane" : this fixé, même détachée`,
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple réel : le piège du callback et sa solution",
        code: `const compteur = {\n  total: 0,\n  demarrer() {\n    // Fonction fléchée : pas de this propre, elle hérite celui de demarrer()\n    setInterval(() => {\n      this.total = this.total + 1;\n      console.log(this.total);\n    }, 1000);\n  },\n};\n// Avec function() classique, this serait perdu (cas 1) :\n// la fléchée est ici la solution idiomatique.`,
      },
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Passer `objet.methode` en callback (à `setTimeout`, `addEventListener`, `map`) puis s'étonner que `this` soit `undefined` : la méthode a été détachée de son objet.",
          },
          {
            label: "Bonne pratique",
            value:
              "Dans les callbacks, utiliser une fonction fléchée (qui hérite du `this` englobant) ou `bind`. Dans les classes, les méthodes sont le cas standard — le problème ne se pose que quand on détache la méthode.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : OBJETS, PROTOTYPES, ASYNCHRONE
  // ------------------------------------------------------------------
  {
    id: "objets",
    title: "Les objets : littéraux et manipulation",
    level: 3,
    intro:
      "La structure de données centrale du langage.",
    blocks: [
      {
        kind: "text",
        text: "Un objet est une collection de paires clé/valeur — la façon standard de représenter une entité (utilisateur, produit, configuration) avec ses données et ses comportements.",
      },
      {
        kind: "text",
        text: "Les programmes manipulent des entités complexes, pas des valeurs isolées : un utilisateur a un nom, un âge, une adresse. L'objet regroupe ces informations sous un seul nom, au lieu de jongler avec des dizaines de variables séparées.",
      },
      {
        kind: "text",
        text: "Pour toute donnée structurée : réponses d'API, configuration, état d'application. Les objets sont aussi la base des classes, des modules et du DOM.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Les clés sont des chaînes (ou symboles). Accès par point (`obj.nom`) ou crochets (`obj[\"nom\"]`, indispensable quand la clé est dynamique). Les objets sont copiés par référence : deux variables peuvent désigner le même objet. La déstructuration (`const { nom } = obj`) extrait des propriétés en une ligne ; le spread (`{ ...obj }`) fait une copie superficielle.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Copier un objet par affectation (`const b = a`) puis modifier `b` en croyant que `a` est intact : les deux variables partagent le même objet. Pour une vraie copie indépendante (superficielle), utiliser `{ ...a }` ou `structuredClone(a)` pour une copie profonde.",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférer la création d'objets plutôt que la mutation : `{ ...utilisateur, age: 26 }` crée un nouvel objet au lieu de modifier l'existant — c'est la base des mises à jour d'état prévisibles (React, Redux).",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple\nconst utilisateur = { nom: "Akane", age: 25 };\nconsole.log(utilisateur.nom);      // accès par point\nconst champ = "age";\nconsole.log(utilisateur[champ]);   // accès dynamique par crochets\nconst { nom } = utilisateur;       // déstructuration\n\n// Exemple réel : mise à jour immuable d'un objet\nfunction anniversaire(u) {\n  return { ...u, age: u.age + 1 }; // nouvel objet, l'original est intact\n}\nconst nouvelUtilisateur = anniversaire(utilisateur);\nconsole.log(utilisateur.age);       // 25 : inchangé\nconsole.log(nouvelUtilisateur.age); // 26`,
      },
    ],
  },
  {
    id: "tableaux-methodes",
    title: "Les tableaux et leurs méthodes",
    level: 3,
    intro:
      "`map`, `filter`, `reduce` : le trio qui remplace la plupart des boucles.",
    blocks: [
      {
        kind: "text",
        text: "Les méthodes de tableau (`map`, `filter`, `find`, `reduce`, `forEach`...) transforment des listes entières en décrivant CE qu'on veut obtenir plutôt que COMMENT boucler.",
      },
      {
        kind: "text",
        text: "Les boucles `for` manuelles mélangent trois choses : l'itération, la condition et l'action. Séparer ces préoccupations rend le code lisible en une lecture : `utilisateurs.filter(u => u.actif).map(u => u.nom)` se lit comme une phrase.",
      },
      {
        kind: "text",
        text: "`map` pour transformer chaque élément, `filter` pour sélectionner, `find` pour chercher le premier, `reduce` pour agréger en une valeur, `some`/`every` pour tester, `forEach` pour les effets de bord (affichage, logs).",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Ces méthodes ne modifient pas le tableau d'origine (sauf `sort`, `splice`, `push`...) : elles retournent un nouveau tableau. Elles prennent une fonction callback appelée pour chaque élément, avec `(élément, index, tableau)` en arguments.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser `map` pour ses effets de bord en ignorant le tableau retourné — c'est le rôle de `forEach`. Ou oublier `return` dans une fléchée à bloc : `.map(u => { u.nom })` produit un tableau de `undefined`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Chaîner les méthodes pour exprimer un pipeline de transformation (`filter` → `map` → `sort`). Pour les très gros tableaux où la performance compte, une boucle `for` classique reste parfois plus rapide — à mesurer, pas à supposer.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple\nconst notes = [8, 12, 5, 16, 9];\nconst moyenne = notes.reduce((total, n) => total + n, 0) / notes.length;\nconst mentions = notes.filter(n => n >= 10).map(n => n + "/20");\nconsole.log(moyenne);  // 10\nconsole.log(mentions); // ["12/20", "16/20"]\n\n// Exemple réel : agréger des lignes de commande en chiffre d'affaires\nconst lignes = [\n  { produit: "livre", prix: 15, quantite: 2 },\n  { produit: "stylo", prix: 3, quantite: 5 },\n];\nconst ca = lignes.reduce((total, l) => total + l.prix * l.quantite, 0);\nconsole.log(ca); // 45`,
      },
    ],
  },
  {
    id: "prototypes",
    title: "Les prototypes : l'héritage de JavaScript",
    level: 3,
    intro:
      "Comment les objets partagent des comportements sans classes.",
    blocks: [
      {
        kind: "text",
        text: "Chaque objet possède un lien caché vers un autre objet — son prototype — et quand on accède à une propriété absente, JavaScript la cherche automatiquement dans le prototype, puis dans le prototype du prototype.",
      },
      {
        kind: "text",
        text: "Pour partager des méthodes entre des milliers d'objets sans les dupliquer : tous les tableaux partagent les mêmes `map`, `filter` via le prototype de `Array`. C'est le mécanisme d'héritage originel du langage, antérieur aux classes.",
      },
      {
        kind: "text",
        text: "Rarement à la main dans le code moderne (les classes couvrent le besoin), mais il faut comprendre le mécanisme pour lire les erreurs (« `x.map is not a function` » = l'objet n'hérite pas de `Array`), debugger, et comprendre le langage en profondeur.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "`obj.methode()` : si `methode` n'est pas sur `obj`, le moteur remonte la chaîne de prototypes jusqu'à la trouver ou arriver à `null`. `Object.create(proto)` crée un objet avec un prototype choisi. Les classes ne sont qu'une syntaxe par-dessus ce système.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Modifier `Object.prototype` ou le prototype d'un objet intégré (`Array.prototype`) : cela affecte TOUS les objets du programme, y compris les bibliothèques tierces — une pratique à proscrire absolument.",
          },
          {
            label: "Bonne pratique",
            value:
              "Utiliser les classes pour l'héritage dans le code applicatif ; garder la manipulation directe de prototypes pour la compréhension et le débogage.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "La chaîne de prototypes",
        lines: [
          "monTableau (votre objet)",
          "     │  cherche .map → absent ici",
          "     ▼",
          "Array.prototype (les méthodes partagées : map, filter...)",
          "     │  trouvé ! .map s'exécute",
          "     ▼",
          "Object.prototype (toString, hasOwnProperty...)",
          "     │",
          "     ▼",
          "null (fin de la chaîne)",
        ],
      },
    ],
  },
  {
    id: "classes",
    title: "Les classes",
    level: 3,
    intro:
      "La syntaxe moderne pour créer des objets sur un même moule.",
    blocks: [
      {
        kind: "text",
        text: "Une classe est un moule qui définit les propriétés et méthodes partagées par tous les objets créés avec `new` ; l'héritage (`extends`) permet à une classe de réutiliser et spécialiser une autre classe.",
      },
      {
        kind: "text",
        text: "Créer des dizaines d'objets similaires à la main (copier les mêmes fonctions sur chacun) est répétitif et source d'incohérences. La classe centralise la définition ; chaque instance reçoit ses propres données mais partage les méthodes via le prototype.",
      },
      {
        kind: "text",
        text: "Pour modéliser des entités avec comportement : composants d'interface, erreurs personnalisées, services, modèles de données. Inutile pour de simples conteneurs de données (un objet littéral suffit).",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "`constructor()` initialise les données propres à chaque instance (`this.nom = ...`). Les méthodes définies dans la classe vivent sur le prototype, partagées. `extends` + `super()` appellent le constructeur parent. Les champs `#prive` (avec `#`) sont vraiment inaccessibles de l'extérieur.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `super()` dans le constructeur d'une classe enfant avant d'utiliser `this` : `ReferenceError`. Ou oublier `new` : appeler `Utilisateur()` sans `new` ne crée pas d'objet (et en mode strict, `this` est `undefined`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférer la composition à l'héritage profond : une hiérarchie de plus de 2-3 niveaux devient difficile à suivre. Utiliser les champs privés `#` pour l'encapsulation réelle plutôt que la convention `_prive`.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple\nclass Compte {\n  #solde = 0; // champ vraiment privé\n  constructor(titulaire) {\n    this.titulaire = titulaire;\n  }\n  deposer(montant) {\n    this.#solde += montant;\n  }\n  get solde() {\n    return this.#solde;\n  }\n}\nconst c = new Compte("Akane");\nc.deposer(100);\nconsole.log(c.solde); // 100\n\n// Exemple réel : erreur personnalisée avec héritage\nclass ErreurValidation extends Error {\n  constructor(champ, message) {\n    super(message);       // super() OBLIGATOIRE avant this\n    this.champ = champ;\n    this.name = "ErreurValidation";\n  }\n}`,
      },
    ],
  },
  {
    id: "callbacks",
    title: "Les callbacks",
    level: 3,
    intro:
      "Passer une fonction à une autre fonction : le premier pas vers l'asynchrone.",
    blocks: [
      {
        kind: "text",
        text: "Un callback est une fonction passée en argument à une autre fonction, qui l'appellera plus tard — quand une opération se termine, quand un événement survient.",
      },
      {
        kind: "text",
        text: "Certaines opérations prennent du temps (lire un fichier, attendre un clic). Plutôt que de bloquer le programme, on dit « préviens-moi quand c'est prêt » en donnant la fonction à exécuter à ce moment-là. C'est le mécanisme asynchrone originel de JavaScript.",
      },
      {
        kind: "text",
        text: "Gestionnaires d'événements (`addEventListener`), timers (`setTimeout`), méthodes de tableau (`map`, `filter`). Pour les opérations asynchrones complexes, les promesses et `async`/`await` sont aujourd'hui préférables.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "La fonction appelante stocke le callback et l'invoque quand l'événement se produit, souvent avec des arguments (l'erreur puis le résultat, par convention Node.js : `callback(erreur, resultat)`). Le code après l'appel continue immédiatement — le callback s'exécute plus tard.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le « callback hell » : imbriquer les callbacks sur 5 niveaux d'indentation quand des opérations dépendent les unes des autres. Le code devient illisible et la gestion d'erreur un cauchemar — c'est ce qui a motivé les promesses.",
          },
          {
            label: "Bonne pratique",
            value:
              "Garder les callbacks courts et plats ; dès qu'il y a enchaînement d'opérations asynchrones, passer aux promesses ou à `async`/`await`. Toujours gérer l'erreur dans les callbacks d'opérations qui peuvent échouer.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et callback hell",
        code: `// Exemple simple : le callback s'exécute PLUS TARD\nconsole.log("début");\nsetTimeout(function () {\n  console.log("3 secondes plus tard");\n}, 3000);\nconsole.log("fin"); // s'affiche AVANT le message du timer\n\n// Le problème historique : l'imbrication\n// lireFichier("a.txt", function (err, a) {\n//   lireFichier("b.txt", function (err, b) {\n//     lireFichier("c.txt", function (err, c) {\n//       // ... pyramide infernale\n//     });\n//   });\n// });`,
      },
    ],
  },
  {
    id: "promises",
    title: "Les promesses",
    level: 3,
    intro:
      "Représenter une valeur future : la fondation de l'asynchrone moderne.",
    blocks: [
      {
        kind: "text",
        text: "Une promesse (`Promise`) est un objet qui représente une valeur qui n'existe pas encore : elle est en attente (pending), puis devient tenue (fulfilled, avec la valeur) ou rompue (rejected, avec l'erreur).",
      },
      {
        kind: "text",
        text: "Pour sortir du callback hell : au lieu d'imbriquer les fonctions, on enchaîne des `.then()` à plat, et les erreurs se propagent en un seul `.catch()` final. La promesse transforme le temps en valeur manipulable : on peut la retourner, la stocker, la combiner.",
      },
      {
        kind: "text",
        text: "Toute opération asynchrone : requêtes réseau (`fetch` retourne une promesse), lecture de fichiers, timers. C'est le format standard que `async`/`await` consomme.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "`.then(f)` enregistre `f` pour le succès et retourne une NOUVELLE promesse — d'où l'enchaînement. `.catch(f)` intercepte toute erreur survenue dans la chaîne. `Promise.all([...])` attend plusieurs promesses en parallèle ; `Promise.allSettled` ne s'arrête pas à la première erreur.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier de RETOURNER la promesse dans un `.then` : la chaîne reçoit `undefined` au lieu du résultat suivant. Ou oublier le `.catch` : l'erreur devient un rejet non géré, silencieux ou bruyant selon l'environnement.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours terminer une chaîne par un `.catch` (ou laisser `async`/`await` + `try`/`catch` s'en charger). Pour des opérations indépendantes, les lancer ensemble avec `Promise.all` plutôt que les attendre l'une après l'autre.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple : enchaînement à plat au lieu d'imbrication\nlireFichier("a.txt")\n  .then(contenu => lireFichier("b.txt"))\n  .then(contenu => console.log("les deux fichiers sont lus"))\n  .catch(erreur => console.error("échec :", erreur.message));\n\n// Exemple réel : créer une promesse (ex. envelopper un timer)\nfunction attendre(ms) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve("prêt"), ms);\n  });\n}\n// Parallélisme : les deux timers tournent ENSEMBLE\nPromise.all([attendre(1000), attendre(2000)])\n  .then(() => console.log("les deux sont prêts (après ~2s, pas 3s)"));`,
      },
    ],
  },
  {
    id: "async-await",
    title: "`async` / `await`",
    level: 3,
    intro:
      "Écrire du code asynchrone qui se lit comme du code synchrone.",
    blocks: [
      {
        kind: "text",
        text: "`async`/`await` est une syntaxe par-dessus les promesses : on écrit les opérations asynchrones les unes après les autres, comme si elles étaient instantanées, avec `try`/`catch` pour les erreurs.",
      },
      {
        kind: "text",
        text: "Les chaînes `.then()` restent verbeuses et inversent la lecture (le résultat est « à l'intérieur »). `await` remet le code à plat : la valeur est directement dans une variable, les erreurs se gèrent avec les `try`/`catch` habituels.",
      },
      {
        kind: "text",
        text: "Par défaut pour tout code asynchrone moderne : c'est la forme la plus lisible. Garder les promesses nues pour la création de promesses, le parallélisme (`Promise.all`) et les combinateurs.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Une fonction `async` retourne TOUJOURS une promesse (même si on retourne une valeur simple). `await` met la fonction en pause jusqu'à la résolution de la promesse, sans bloquer le reste du programme. `await` n'est utilisable que dans une fonction `async` (ou au top-level des modules).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `await` : on manipule alors une promesse au lieu de sa valeur (`[object Promise]` dans l'affichage). Ou enchaîner des `await` indépendants : `await a(); await b();` prend la somme des durées, `Promise.all([a(), b()])` prend le maximum.",
          },
          {
            label: "Bonne pratique",
            value:
              "Entourer les `await` de `try`/`catch` quand l'échec est gérable ; laisser l'erreur remonter quand l'appelant est mieux placé pour décider. Ne jamais mélanger `await` et `.then()` sans raison dans la même fonction.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple : la même logique, à plat\nasync function charger() {\n  try {\n    const a = await lireFichier("a.txt");\n    const b = await lireFichier("b.txt");\n    return a + b;\n  } catch (erreur) {\n    console.error("échec :", erreur.message);\n  }\n}\n\n// Exemple réel : parallélisme quand les opérations sont indépendantes\nasync function chargerProfil(id) {\n  const [profil, articles] = await Promise.all([\n    fetch("/api/profil/" + id).then(r => r.json()),\n    fetch("/api/articles?auteur=" + id).then(r => r.json()),\n  ]);\n  return { profil, articles };\n}`,
      },
    ],
  },
  {
    id: "boucle-evenements",
    title: "La boucle d'événements en détail",
    level: 3,
    intro:
      "Démonter le mécanisme qui rend JavaScript non-bloquant.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la boucle d'événements est un ordonnanceur qui exécute les tâches prêtes les unes après les autres, en donnant la priorité aux microtâches (promesses) sur les macrotâches (timers, événements). Pourquoi c'est crucial : c'est ce mécanisme qui explique l'ordre d'exécution réel du code asynchrone — et la plupart des surprises (« pourquoi mon `then` s'exécute avant mon `setTimeout(0)` ? ») viennent de l'ignorer.",
      },
      {
        kind: "diagram",
        title: "Les pièces du mécanisme",
        lines: [
          "Pile d'appels (call stack) : CE QUI S'EXÉCUTE MAINTENANT",
          "     │  une seule chose à la fois, en mode LIFO",
          "     ▼",
          "File des microtâches : promesses résolues (.then, await)",
          "     │  vidée EN ENTIER avant de passer à la suite — prioritaire",
          "     ▼",
          "File des macrotâches : setTimeout, setInterval, événements, I/O",
          "     │  une tâche par tour de boucle",
          "     │",
          "     └─► la boucle recommence : pile → microtâches → 1 macrotâche → ...",
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "L'ordre d'exécution expliqué",
        code: `console.log("1. synchrone");\nsetTimeout(() => console.log("2. macrotâche (timer)"), 0);\nPromise.resolve().then(() => console.log("3. microtâche (promesse)"));\nconsole.log("4. synchrone");\n// Ordre réel : 1, 4, 3, 2\n// - le synchrone d'abord (pile d'appels)\n// - puis les microtâches (promesses) : 3 avant 2\n// - enfin UNE macrotâche par tour : le timer, même avec 0 ms`,
      },
      {
        kind: "fields",
        title: "Implications pratiques",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Bloquer la boucle avec un calcul synchrone très long : pendant ce temps, AUCUN événement, AUCUN timer, AUCUNE promesse ne s'exécute — la page se fige. Les calculs lourds doivent être découpés ou délégués (Web Workers).",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne jamais faire de boucle synchrone « d'attente » (`while (Date.now() < ...)`) : c'est le blocage garanti. Utiliser `setTimeout`, les promesses ou `async`/`await` pour attendre sans bloquer.",
          },
          {
            label: "À retenir",
            value:
              "JavaScript est mono-thread pour VOTRE code : deux de vos fonctions ne s'exécutent jamais vraiment en même temps. Les opérations d'entrée/sortie (réseau, fichiers), elles, sont gérées en arrière-plan par le runtime.",
          },
        ],
      },
    ],
  },
  {
    id: "modules",
    title: "Les modules : ESM contre CommonJS",
    level: 3,
    intro:
      "Organiser le code en fichiers qui s'importent les uns les autres.",
    blocks: [
      {
        kind: "text",
        text: "Un module est un fichier JavaScript qui expose (`export`) une partie de son contenu et peut utiliser (`import`) le contenu d'autres fichiers ; il existe deux systèmes : ESM (`import`/`export`, le standard) et CommonJS (`require`/`module.exports`, l'historique de Node.js).",
      },
      {
        kind: "text",
        text: "Un programme entier dans un seul fichier devient ingérable : les modules découpent le code en unités cohérentes (un module = une responsabilité), rendent les dépendances explicites et permettent de réutiliser du code entre projets.",
      },
      {
        kind: "text",
        text: "Toujours : chaque fichier est un module. ESM est le standard moderne (navigateurs, et Node.js avec `\"type\": \"module\"` dans `package.json`). CommonJS reste très présent dans l'écosystème Node.js historique.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "En ESM, `import` est statique et hissé : les dépendances sont connues avant l'exécution, ce qui permet l'optimisation (tree-shaking). En CommonJS, `require()` est un appel de fonction ordinaire, exécuté à la demande. Les deux systèmes peuvent cohabiter mais avec des frictions (un fichier `.mjs` est toujours ESM, `.cjs` toujours CommonJS).",
          },
          {
            label: "Erreur fréquente",
            value:
              "`SyntaxError: Cannot use import statement outside a module` : on utilise `import` dans un fichier traité comme CommonJS. Solution : ajouter `\"type\": \"module\"` dans `package.json` (ou renommer en `.mjs`). L'inverse (`require` dans un module ESM) échoue aussi.",
          },
          {
            label: "Bonne pratique",
            value:
              "Choisir ESM pour tout nouveau projet. Exporter nommé (`export function ...`) plutôt que par défaut quand plusieurs choses sortent d'un module : les imports nommés sont explicites et mieux supportés par les outils.",
          },
        ],
      },
      {
        kind: "table",
        headers: ["Aspect", "ESM (`import`/`export`)", "CommonJS (`require`)"],
        rows: [
          ["Syntaxe", "`import { f } from \"./a.js\"`", "`const { f } = require(\"./a\")`"],
          ["Chargement", "Statique, analysé avant exécution", "Dynamique, à l'exécution"],
          ["Navigateur", "Natif (`<script type=\"module\">`)", "Non supporté sans bundler"],
          ["Node.js", "Standard moderne (`\"type\": \"module\"`)", "Historique, encore très répandu"],
          ["Extension", "L'extension `.js` est obligatoire dans l'import", "Extension optionnelle"],
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple : le même module dans les deux systèmes",
        code: `// ---- ESM (moderne) ----\n// mathematiques.js\nexport function carre(n) { return n * n; }\nexport const PI = 3.14159;\n// index.js\nimport { carre, PI } from "./mathematiques.js";\n\n// ---- CommonJS (historique Node.js) ----\n// mathematiques.cjs\nfunction carre(n) { return n * n; }\nmodule.exports = { carre, PI: 3.14159 };\n// index.cjs\nconst { carre } = require("./mathematiques.cjs");`,
      },
    ],
  },
  {
    id: "gestion-erreurs",
    title: "La gestion d'erreurs",
    level: 3,
    intro:
      "Anticiper l'échec : `try`/`catch`, erreurs personnalisées et erreurs async.",
    blocks: [
      {
        kind: "text",
        text: "`try`/`catch` intercepte les erreurs d'un bloc de code pour les traiter au lieu de faire planter le programme ; `throw` signale une erreur ; `finally` exécute un nettoyage dans tous les cas.",
      },
      {
        kind: "text",
        text: "Les programmes réels échouent : réseau coupé, fichier absent, données invalides. Sans mécanisme dédié, chaque appel devrait tester un code de retour — verbeux et facile d'oublier. Les exceptions séparent le chemin normal du chemin d'erreur.",
      },
      {
        kind: "text",
        text: "`try`/`catch` autour des opérations qui peuvent échouer pour des raisons externes (réseau, fichiers, parsing de données externes). `throw` pour signaler une condition anormale que l'appelant doit connaître.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Une erreur levée remonte la pile d'appels jusqu'au premier `catch` capable de la traiter ; sans `catch`, le programme s'arrête. En asynchrone, `try`/`catch` autour d'un `await` capture les rejets de promesse. `finally` s'exécute toujours (succès, erreur, `return` anticipé).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Envelopper TOUT le programme dans un `try`/`catch` géant qui masque les bugs de programmation (fautes de frappe, `null` inattendu) au lieu de ne protéger que les opérations externes risquées. Ou, en async, oublier que `.then()` sans `.catch` laisse un rejet non géré.",
          },
          {
            label: "Bonne pratique",
            value:
              "Attraper les erreurs là où on peut y RÉPONDRE (réessayer, valeur par défaut, message utilisateur) ; laisser remonter celles qu'on ne sait pas traiter. Logger l'erreur complète (avec sa pile) avant de la transformer en message utilisateur.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple : protéger une opération risquée\nfunction parseJSON(texte) {\n  try {\n    return { ok: true, valeur: JSON.parse(texte) };\n  } catch (erreur) {\n    return { ok: false, message: erreur.message };\n  } finally {\n    // nettoyage éventuel : fermer un fichier, arrêter un spinner...\n  }\n}\n\n// Exemple réel : erreur async avec réessai\nasync function chargerAvecReessai(url, essais = 3) {\n  for (let i = 1; i <= essais; i++) {\n    try {\n      const reponse = await fetch(url);\n      if (!reponse.ok) throw new Error("HTTP " + reponse.status);\n      return await reponse.json();\n    } catch (erreur) {\n      if (i === essais) throw erreur; // on abandonne après N essais\n      await new Promise(r => setTimeout(r, 1000 * i)); // attente croissante\n    }\n  }\n}`,
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : DOM, WEB, OUTILLAGE
  // ------------------------------------------------------------------
  {
    id: "dom",
    title: "Le DOM : manipuler la page",
    level: 3,
    intro:
      "Le pont entre JavaScript et la page web affichée.",
    blocks: [
      {
        kind: "text",
        text: "Le DOM (Document Object Model) est la représentation objet de la page HTML : JavaScript le lit et le modifie pour changer ce que l'utilisateur voit, sans recharger la page.",
      },
      {
        kind: "text",
        text: "HTML est statique : sans DOM, JavaScript ne pourrait pas réagir aux actions (ajouter un élément à une liste, afficher un message d'erreur, mettre à jour un compteur). Le DOM est l'API qui rend les pages interactives.",
      },
      {
        kind: "text",
        text: "Dès qu'on veut changer la page après son chargement : afficher des données, réagir aux formulaires, animer, construire des interfaces. (Les frameworks comme React manipulent le DOM à votre place, mais sur les mêmes primitives.)",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "`document.querySelector(\".ma-classe\")` sélectionne un élément avec la syntaxe CSS. On modifie son contenu (`textContent`), ses attributs, ses classes (`classList`) ou sa structure (`createElement` + `appendChild`). Chaque modification met à jour l'affichage immédiatement.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser `innerHTML` avec des données non fiabilisées (voir la section Sécurité : c'est la porte d'entrée des attaques XSS). Ou sélectionner un élément avant qu'il existe (script dans `<head>` sans attendre le chargement — placer le script en fin de `<body>` ou écouter `DOMContentLoaded`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférer `textContent` à `innerHTML` pour afficher du texte. Regrouper les modifications du DOM plutôt que de toucher la page dans une boucle (chaque modification peut déclencher un recalcul de mise en page, coûteux).",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple : réagir à un clic\nconst bouton = document.querySelector("#mon-bouton");\nconst compteur = document.querySelector("#compteur");\nlet clics = 0;\nbouton.addEventListener("click", () => {\n  clics = clics + 1;\n  compteur.textContent = clics + " clics"; // textContent : sûr pour du texte\n});\n\n// Exemple réel : construire une liste depuis des données\nfunction afficherUtilisateurs(utilisateurs) {\n  const liste = document.querySelector("#liste");\n  liste.innerHTML = ""; // on repart d'une liste vide\n  for (const u of utilisateurs) {\n    const li = document.createElement("li");\n    li.textContent = u.nom; // textContent : pas d'injection possible\n    liste.appendChild(li);\n  }\n}`,
      },
    ],
  },
  {
    id: "evenements",
    title: "Les événements et leur propagation",
    level: 3,
    intro:
      "Clics, saisie, chargement : comment le navigateur prévient votre code.",
    blocks: [
      {
        kind: "text",
        text: "Un événement signale que quelque chose s'est produit (clic, touche, chargement) ; `addEventListener` attache une fonction qui s'exécutera à chaque occurrence, et l'événement se propage du parent vers la cible puis remonte (capture → cible → bubbling).",
      },
      {
        kind: "text",
        text: "Le programme ne peut pas « attendre » un clic en bloquant tout : les événements inversent le contrôle — c'est le navigateur qui appelle votre code quand quelque chose arrive. C'est le cœur de la programmation interactive.",
      },
      {
        kind: "text",
        text: "Toute interaction : clics, soumission de formulaire, saisie au clavier, chargement de page, redimensionnement. C'est aussi le mécanisme des frameworks sous le capot.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "L'événement traverse le DOM en trois phases : descente (capture) depuis `document` jusqu'à l'élément cliqué, phase cible, puis remontée (bubbling) vers `document`. Un écouteur sur un parent reçoit donc les événements de ses enfants — c'est la délégation d'événements, qui évite d'attacher des centaines d'écouteurs.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Attacher un écouteur à chaque élément d'une longue liste (coûteux, et les éléments ajoutés après n'en ont pas) au lieu d'un seul écouteur délégué sur le parent. Ou oublier `event.preventDefault()` sur un formulaire, qui recharge la page par défaut.",
          },
          {
            label: "Bonne pratique",
            value:
              "Déléguer : un seul `addEventListener` sur le conteneur, et `event.target` pour savoir quel enfant a été cliqué. Retirer les écouteurs (`removeEventListener`) quand l'élément est détruit pour éviter les fuites mémoire.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple : délégation d'événements",
        code: `// UN seul écouteur pour toute la liste, y compris les futurs éléments\nconst liste = document.querySelector("#taches");\nliste.addEventListener("click", (event) => {\n  const bouton = event.target.closest("button.supprimer");\n  if (!bouton) return; // clic ailleurs dans la liste : on ignore\n  bouton.closest("li").remove(); // on supprime la tâche cliquée\n});\n\n// Formulaire : empêcher le rechargement par défaut\nconst form = document.querySelector("#recherche");\nform.addEventListener("submit", (event) => {\n  event.preventDefault(); // SANS ça, la page recharge et tout est perdu\n  const query = new FormData(form).get("q");\n  console.log("recherche :", query);\n});`,
      },
    ],
  },
  {
    id: "fetch",
    title: "`fetch` : dialoguer avec des APIs",
    level: 3,
    intro:
      "Envoyer des requêtes HTTP et exploiter les réponses.",
    blocks: [
      {
        kind: "text",
        text: "`fetch(url)` envoie une requête HTTP et retourne une promesse de réponse : c'est la façon standard de charger des données depuis une API sans recharger la page.",
      },
      {
        kind: "text",
        text: "Les applications modernes affichent des données qui vivent sur des serveurs (profils, articles, météo). `fetch` permet de les récupérer en arrière-plan et de mettre à jour juste la partie concernée de la page — c'est le fondement des applications web dynamiques.",
      },
      {
        kind: "text",
        text: "Tout échange avec un serveur : charger des données (GET), envoyer un formulaire ou créer une ressource (POST), mettre à jour (PUT/PATCH), supprimer (DELETE).",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "`fetch` retourne une promesse qui se résout avec un objet `Response` dès que les EN-TÊTES arrivent — le corps se lit ensuite avec `.json()`, `.text()`, etc. (eux-mêmes asynchrones). Point crucial : `fetch` ne rejette qu'en cas d'échec réseau ; une erreur HTTP (404, 500) donne une réponse « ok » = `false` qu'il faut tester soi-même avec `response.ok`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier de tester `response.ok` : un 404 passe silencieusement et `.json()` échoue bizarrement (ou parse une page d'erreur HTML). Autre classique : oublier le deuxième `await` sur `response.json()`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours vérifier `response.ok` et lever une erreur explicite sinon ; centraliser la logique `fetch` dans des fonctions dédiées (une par ressource) plutôt que d'éparpiller les appels ; gérer les trois états côté interface : chargement, succès, erreur.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple (GET) et exemple réel (POST)",
        code: `// Exemple simple : charger des données\nasync function chargerUtilisateurs() {\n  const reponse = await fetch("https://api.exemple.com/utilisateurs");\n  if (!reponse.ok) {\n    throw new Error("HTTP " + reponse.status);\n  }\n  return await reponse.json(); // deuxième await : lecture du corps\n}\n\n// Exemple réel : envoyer des données (POST JSON)\nasync function creerUtilisateur(nom, email) {\n  const reponse = await fetch("https://api.exemple.com/utilisateurs", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ nom, email }),\n  });\n  if (!reponse.ok) throw new Error("HTTP " + reponse.status);\n  return await reponse.json();\n}`,
      },
    ],
  },
  {
    id: "json",
    title: "JSON : le format d'échange universel",
    level: 3,
    intro:
      "Lire et écrire le format dans lequel presque toutes les APIs parlent.",
    blocks: [
      {
        kind: "text",
        text: "JSON (JavaScript Object Notation) est un format texte pour représenter des données structurées ; `JSON.parse` convertit du texte JSON en valeurs JavaScript, `JSON.stringify` fait l'inverse.",
      },
      {
        kind: "text",
        text: "Les programmes doivent échanger des données par texte (réseau, fichiers, stockage local). JSON est lisible par les humains, léger, et supporté par quasiment tous les langages — c'est devenu la lingua franca des APIs.",
      },
      {
        kind: "text",
        text: "À chaque échange avec une API, pour stocker des objets dans `localStorage` (qui ne stocke que des chaînes), pour les fichiers de configuration (`package.json` est du JSON).",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "JSON ressemble aux objets JavaScript mais en plus strict : clés TOUJOURS entre guillemets doubles, pas de fonctions, pas de commentaires, pas de virgule finale. `JSON.parse` lève une exception si le texte est invalide — à protéger avec `try`/`catch` quand la source n'est pas fiable.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Appeler `JSON.parse` sur une valeur déjà parsée (ou sur `undefined`) : `SyntaxError`. Ou oublier `JSON.stringify` avant `localStorage.setItem` : l'objet est stocké comme `\"[object Object]\"`, irrécupérable.",
          },
          {
            label: "Bonne pratique",
            value:
              "Valider la forme des données après `JSON.parse` quand elles viennent de l'extérieur (champs attendus présents ? types corrects ?). Les types TypeScript ou un validateur léger évitent les surprises en aval.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple : l'aller-retour\nconst texte = '{"nom":"Akane","age":25}';\nconst objet = JSON.parse(texte);      // texte -> objet\nconsole.log(objet.nom);               // "Akane"\nconst retour = JSON.stringify(objet); // objet -> texte\n\n// Exemple réel : persister un état dans localStorage\nfunction sauvegarderPanier(panier) {\n  localStorage.setItem("panier", JSON.stringify(panier));\n}\nfunction chargerPanier() {\n  try {\n    return JSON.parse(localStorage.getItem("panier")) ?? [];\n  } catch {\n    return []; // données corrompues : on repart de zéro\n  }\n}`,
      },
    ],
  },
  {
    id: "dates",
    title: "Les dates : `Date` et ses pièges",
    level: 3,
    intro:
      "Manipuler le temps sans se tromper de mois.",
    blocks: [
      {
        kind: "text",
        text: "`Date` représente un instant précis (un nombre de millisecondes depuis le 1er janvier 1970) et offre des méthodes pour le lire, le modifier et le formater.",
      },
      {
        kind: "text",
        text: "Horodatage d'événements, calculs de durées, affichage de dates localisées. Pour des besoins complexes (fuseaux, calendriers), une bibliothèque dédiée est souvent plus sûre que `Date` seul.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Pourquoi c'est délicat",
            value:
              "`Date` accumule les bizarreries historiques : mois indexés de 0 à 11 (janvier = 0), années sur deux chiffres interprétées bizarrement, fuseaux horaires implicites. C'est l'une des API les plus piégeuses du langage.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "`new Date()` = maintenant ; `new Date(\"2026-09-28\")` = date précise (format ISO, le plus fiable). `getTime()` donne le timestamp en ms — la forme la plus sûre pour comparer et calculer. `Intl.DateTimeFormat` formate proprement selon la langue de l'utilisateur.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`new Date(2026, 9, 28)` = 28 OCTOBRE (mois 9 = octobre !). Ou parser `\"28/09/2026\"` (format français) : non standard, comportement variable selon le navigateur — toujours préférer le format ISO `\"2026-09-28\"`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Stocker et échanger les dates en ISO (`toISOString()`) ou en timestamp ; ne formater pour l'humain qu'au dernier moment avec `Intl.DateTimeFormat`. Ne jamais faire de calculs sur des chaînes de dates.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple : les pièges en direct\nconst d = new Date(2026, 9, 28);\nconsole.log(d.getMonth()); // 9 = octobre ! (janvier = 0)\nconst iso = new Date("2026-09-28"); // format ISO : fiable partout\n\n// Exemple réel : afficher une date en français\nfunction formaterDate(isoString) {\n  const date = new Date(isoString);\n  return new Intl.DateTimeFormat("fr-FR", {\n    weekday: "long", day: "numeric", month: "long", year: "numeric",\n  }).format(date);\n}\nconsole.log(formaterDate("2026-09-28")); // "lundi 28 septembre 2026"`,
      },
    ],
  },
  {
    id: "regex",
    title: "Les expressions régulières : les bases",
    level: 3,
    intro:
      "Décrire des motifs de texte pour les chercher et les valider.",
    blocks: [
      {
        kind: "text",
        text: "Une expression régulière (regex) est un mini-langage qui décrit un motif de caractères : on s'en sert pour tester si un texte correspond, en extraire des morceaux ou le découper.",
      },
      {
        kind: "text",
        text: "Valider un email, extraire tous les nombres d'un texte, vérifier un format de téléphone : avec des comparaisons de chaînes classiques, il faudrait des dizaines de lignes. Une regex exprime le motif en une ligne.",
      },
      {
        kind: "text",
        text: "Validation de formats (email, code postal, mot de passe), recherche et extraction dans du texte, nettoyage de données. À éviter quand un simple `includes`, `startsWith` ou `split` suffit — la lisibilité d'abord.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Entre slashes : `/motif/`. `\\d` = un chiffre, `\\w` = lettre/chiffre/underscore, `.` = n'importe quel caractère, `+` = une ou plusieurs fois, `*` = zéro ou plusieurs, `?` = optionnel, `^`/`$` = début/fin de chaîne, `[abc]` = un caractère parmi, `(...)` = groupe à capturer. `.test(texte)` répond vrai/faux, `.match()` extrait.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `^` et `$` dans une validation : `/\\d+/` valide `\"abc123\"` (il trouve des chiffres QUELQUE PART) — pour valider tout le texte, ancrer : `/^\\d+$/`. Autre piège : le `.` non échappé qui accepte n'importe quel caractère.",
          },
          {
            label: "Bonne pratique",
            value:
              "Tester ses regex sur des cas limites (chaîne vide, caractères spéciaux) avant de les déployer. Pour les emails, une regex simple qui attrape les erreurs grossières vaut mieux qu'une regex « parfaite » illisible de 200 caractères.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple simple et exemple réel",
        code: `// Exemple simple : tester et extraire\nconst code = "CMD-2026-042";\nconsole.log(/^CMD-\\d{4}-\\d{3}$/.test(code)); // true : format exact\nconst texte = "Contact : sara@exemple.com ou 034 12 345 67";\nconsole.log(texte.match(/[\\w.]+@[\\w.]+/)); // extrait l'email\n\n// Exemple réel : valider un formulaire côté client (premier filtre)\nfunction emailValide(email) {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\n}\n// Rappel : la validation client aide l'utilisateur,\n// mais la vraie validation se fait TOUJOURS côté serveur.`,
      },
    ],
  },
  {
    id: "eslint",
    title: "ESLint : le linter",
    level: 3,
    intro:
      "Détecter les problèmes pendant que vous écrivez.",
    blocks: [
      {
        kind: "text",
        text: "ESLint analyse votre code sans l'exécuter et signale les erreurs probables, les mauvaises pratiques et les incohérences de style, selon des règles configurables.",
      },
      {
        kind: "text",
        text: "Beaucoup de bugs sont visibles statiquement : variable déclarée mais jamais utilisée, `==` au lieu de `===`, variable utilisée avant déclaration. Un humain les rate en relecture ; un linter les trouve instantanément, à chaque frappe.",
      },
      {
        kind: "text",
        text: "Dès le premier projet sérieux : intégré à l'éditeur (soulignés en direct) et à la CI (le code qui viole les règles ne fusionne pas). C'est le filet de sécurité entre « ça marche sur ma machine » et « c'est du code propre ».",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Rôle / Install / Config / Exemple",
            value:
              "Rôle : analyse statique et règles de qualité. Install : `npm install -D eslint` puis `npx eslint --init` pour générer la configuration. Config : fichier `eslint.config.js` (format « flat config » moderne) où l'on choisit les règles. Exemple : la règle `eqeqeq` interdit `==`, `no-unused-vars` signale les variables mortes.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Empiler des règles contradictoires avec Prettier (les deux veulent formater) : la solution standard est de laisser Prettier gérer le formatage et ESLint la logique, via la configuration adaptée.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commencer avec la configuration recommandée (`eslint:recommended` ou un preset d'équipe), n'ajouter des règles qu'avec une raison, et ne jamais désactiver une règle globalement pour masquer un problème local — corriger le code d'abord.",
          },
        ],
      },
    ],
  },
  {
    id: "prettier",
    title: "Prettier : le formateur",
    level: 3,
    intro:
      "Un style de code uniforme, sans y penser.",
    blocks: [
      {
        kind: "text",
        text: "Prettier reformate automatiquement votre code (indentation, guillemets, points-virgules, retours à la ligne) selon des règles fixes : fini les débats de style en revue.",
      },
      {
        kind: "text",
        text: "Le style (où mettre les accolades, quelle largeur de ligne) n'a aucune valeur fonctionnelle mais coûte un temps fou en discussions et en relectures. Un formateur tranche une fois pour toutes : le style devient un non-sujet.",
      },
      {
        kind: "text",
        text: "Sur tous les projets : formatage à la sauvegarde dans l'éditeur + vérification en CI (`prettier --check`). Alternative crédible : Biome, qui combine formateur et linter rapide dans un seul outil.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Rôle / Install / Config / Exemple",
            value:
              "Rôle : formatage automatique du code. Install : `npm install -D prettier`. Config : fichier `.prettierrc` (ex. `{ \"semi\": true, \"singleQuote\": false }`) — peu d'options par design. Exemple : `npx prettier --write .` reformate tout le projet d'un coup.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Laisser Prettier et ESLint se battre sur le formatage (double formatage, modifications en boucle) : configurer ESLint pour ne plus gérer le style quand Prettier est en place.",
          },
          {
            label: "Bonne pratique",
            value:
              "Choisir les options une fois au début du projet, puis ne plus y toucher. Le formateur doit être invisible au quotidien : sauvegarde → code propre, sans action consciente.",
          },
        ],
      },
    ],
  },
  {
    id: "vite",
    title: "Vite : le serveur de dev et le build",
    level: 3,
    intro:
      "Développer avec rechargement instantané, construire pour la production.",
    blocks: [
      {
        kind: "text",
        text: "Vite est un outil qui sert votre projet en développement avec un rechargement quasi instantané, et qui produit les fichiers optimisés (minifiés, découpés) pour la production.",
      },
      {
        kind: "text",
        text: "Le JavaScript moderne s'écrit en modules, mais servir des centaines de fichiers tels quels au navigateur est lent, et le code doit être optimisé avant mise en ligne. Historiquement, les bundlers recompilaient TOUT à chaque sauvegarde (de plus en plus lent). Vite exploite les modules natifs du navigateur en dev : il ne transforme que le fichier modifié.",
      },
      {
        kind: "text",
        text: "Dès qu'un projet dépasse le « script seul » : applications avec plusieurs modules, frameworks (React, Vue...), besoin d'un build optimisé. Pour un simple script d'apprentissage, `node` suffit.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Rôle / Install / Config / Exemple",
            value:
              "Rôle : dev server + bundler de production. Install : `npm create vite@latest` (générateur interactif). Config : `vite.config.js` à la racine (plugins, alias, proxy API). Exemple : `npm run dev` lance le serveur local, `npm run build` produit le dossier `dist/` prêt à déployer.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Confondre les deux modes : en dev, Vite sert les fichiers à la volée (pas de `dist/`) ; en production, il faut `npm run build` PUIS servir `dist/`. Déployer le code source sans build = performances dégradées.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne jamais commiter `dist/` (généré) ni `node_modules/` ; la CI reconstruit avec `npm ci && npm run build`. Mettre les secrets d'API côté serveur, jamais dans le code bundlé pour le navigateur.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : QUALITÉ, PROJETS, SUITE
  // ------------------------------------------------------------------
  {
    id: "debugging",
    title: "Debugging : DevTools, `debugger` et source maps",
    level: 3,
    intro:
      "Trouver la cause réelle d'un bug au lieu de deviner.",
    blocks: [
      {
        kind: "text",
        text: "Déboguer, c'est exécuter le programme pas à pas en inspectant l'état réel (variables, pile d'appels) au moment où ça se passe mal, plutôt que d'ajouter des `console.log` au hasard.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Pourquoi les `console.log` ne suffisent pas",
            value:
              "Les logs montrent des valeurs à des endroits choisis à l'aveugle : on devine où regarder, on relance, on devine à nouveau. Un point d'arrêt stoppe l'exécution exactement sur la ligne suspecte et révèle TOUT l'état — variables locales, pile d'appels, portée. C'est plus rapide dès que le bug n'est pas trivial.",
          },
          {
            label: "Les outils",
            value:
              "Navigateur : panneau Sources des DevTools — cliquer sur un numéro de ligne pose un point d'arrêt, puis on avance pas à pas (step over/into). L'instruction `debugger;` dans le code fait la même chose programmatiquement. Node.js : `node --inspect` expose le même débogueur, utilisable depuis les DevTools du navigateur (`chrome://inspect`).",
          },
          {
            label: "Les source maps",
            value:
              "Quand le code est transformé (bundlé, minifié, transpilé), le navigateur exécute un fichier illisible. La source map est un fichier de correspondance qui permet aux DevTools d'afficher le code SOURCE d'origine pendant le débogage. En pratique : les outils modernes les génèrent automatiquement en dev.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Déboguer le code transformé au lieu du source (lignes qui ne correspondent à rien) : vérifier que les source maps sont activées. Ou laisser des `debugger;` et des `console.log` de débogage dans le code commité.",
          },
          {
            label: "Bonne pratique",
            value:
              "Formuler une hypothèse AVANT d'ouvrir le débogueur (« je pense que `utilisateur` est `null` ici »), puis la vérifier en un point d'arrêt. Un bug compris est un bug à moitié corrigé — et une régression évitée.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-vitest",
    title: "Les tests : premier test avec Vitest",
    level: 3,
    intro:
      "Prouver que le code fait ce qu'on croit, automatiquement.",
    blocks: [
      {
        kind: "text",
        text: "Un test automatisé exécute une fonction avec des entrées connues et vérifie que la sortie est celle attendue ; le lanceur (Vitest, Jest...) exécute tous les tests et signale les échecs.",
      },
      {
        kind: "text",
        text: "Tester à la main après chaque modification est lent et on oublie des cas. Les tests rejouent en quelques secondes des dizaines de vérifications — y compris les cas limites — et détectent immédiatement quand un changement casse quelque chose qui marchait.",
      },
      {
        kind: "text",
        text: "Dès que la logique devient non triviale : fonctions de calcul, validation, transformation de données. Vitest est le choix naturel avec Vite (rapide, même écosystème) ; Jest est l'alternative historique très répandue.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Rôle / Install / Config / Exemple",
            value:
              "Rôle : exécuter les tests et rapporter les résultats. Install : `npm install -D vitest`. Config : souvent zéro pour démarrer ; script `\"test\": \"vitest run\"` dans `package.json`. Exemple : voir le code ci-dessous.",
          },
          {
            label: "Quand écrire le test",
            value:
              "Idéalement en même temps que la fonction (voire avant : le « TDD »). Au minimum : un test pour le cas nominal et un pour chaque cas limite qui a déjà causé un bug — c'est le test de non-régression.",
          },
          {
            label: "Bonne pratique",
            value:
              "Tester les comportements, pas l'implémentation : un test qui casse à chaque refactoring est un fardeau. Un bon test est court, a un nom qui dit ce qu'il vérifie, et ne dépend pas d'un autre test.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Premier test : la fonction et son test",
        code: `// calculer.js — la fonction à tester\n// (export ESM : le fichier de test pourra l'importer)\nexport function prixTTC(prixHT, tauxTva) {\n  if (prixHT < 0) throw new Error("prix négatif");\n  return prixHT * (1 + tauxTva);\n}\n\n// calculer.test.js — le test\nimport { describe, it, expect } from "vitest";\nimport { prixTTC } from "./calculer.js";\n\ndescribe("prixTTC", () => {\n  it("calcule le prix TTC", () => {\n    expect(prixTTC(100, 0.2)).toBe(120);\n  });\n  it("rejette un prix négatif", () => {\n    expect(() => prixTTC(-5, 0.2)).toThrow("prix négatif");\n  });\n});\n// Lancement : npx vitest run`,
      },
    ],
  },
  {
    id: "git-et-ci",
    title: "Git et CI : les bases pour JavaScript",
    level: 3,
    intro:
      "Versionner son code et le vérifier automatiquement.",
    blocks: [
      {
        kind: "text",
        text: "Git enregistre l'historique des modifications du projet ; la CI (intégration continue) rejoue automatiquement les vérifications (lint, tests, build) à chaque push.",
      },
      {
        kind: "text",
        text: "Sans historique, une modification qui casse tout est irrécupérable et personne ne sait qui a changé quoi. Sans CI, les vérifications dépendent de la bonne volonté de chacun — et sont oubliées sous la pression. Les deux ensemble rendent le projet robuste et l'historique lisible.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Commandes Git du quotidien",
            value:
              "`git status` (état des fichiers), `git add` (préparer), `git commit -m \"message\"` (enregistrer), `git push` (publier), `git pull` (récupérer), `git checkout -b nom` (nouvelle branche). Messages de commit : courts, à l'impératif, qui disent POURQUOI.",
          },
          {
            label: "Ce qu'on ne committe jamais",
            value:
              "`node_modules/` (réinstallable via `npm install`), les fichiers générés (`dist/`), les secrets (clés d'API, mots de passe — via variables d'environnement et fichier `.env` ignoré par Git). Le fichier `.gitignore` liste tout cela.",
          },
          {
            label: "La CI en pratique",
            value:
              "Sur GitHub, un workflow GitHub Actions se déclenche à chaque pull request : il installe les dépendances (`npm ci` — installation reproductible depuis le lockfile), lance le lint, les tests et le build. Si une étape échoue, la fusion est bloquée.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commiter souvent, en petites unités logiques, sur des branches dédiées. La branche principale doit toujours être dans un état qui fonctionne — c'est la CI qui le garantit.",
          },
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "Exemple : workflow CI minimal (GitHub Actions)",
        code: `# .github/workflows/ci.yml\nname: CI\non: [push, pull_request]\njobs:\n  verifier:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: lts/*\n          cache: npm\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n      - run: npm run build`,
      },
    ],
  },
  {
    id: "performance",
    title: "Performance : ce qui coûte cher",
    level: 3,
    intro:
      "Savoir où le temps part vraiment avant d'optimiser.",
    blocks: [
      {
        kind: "text",
        text: "La performance, c'est identifier ce qui est lent (mesurer d'abord) puis réduire le travail inutile : moins de calculs, moins d'allers-retours réseau, moins de manipulations du DOM.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Pourquoi mesurer d'abord",
            value:
              "L'intuition est un mauvais profiler : les développeurs optimisent souvent ce qui est déjà rapide et ratent le vrai goulot. Les DevTools (panneau Performance) montrent précisément où partent les millisecondes.",
          },
          {
            label: "Ce qui coûte cher côté navigateur",
            value:
              "Les manipulations répétées du DOM en boucle (chaque insertion peut déclencher un recalcul de mise en page) ; les écouteurs sur des événements fréquents (`scroll`, `resize`) sans limitation (debounce/throttle) ; les images non optimisées ; les bibliothèques lourdes chargées pour trois fonctions.",
          },
          {
            label: "Ce qui coûte cher côté logique",
            value:
              "Les algorithmes en O(n²) sur de gros tableaux (boucle dans une boucle) ; les calculs refaits à chaque rendu alors que les entrées n'ont pas changé (la mémoïsation — stocker le résultat — règle ce cas) ; les requêtes réseau en cascade qui pourraient être parallèles (`Promise.all`).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Micro-optimiser la syntaxe (`++i` contre `i++`, `for` contre `forEach`) : le moteur optimise déjà cela, le gain est nul et la lisibilité en pâtit. Les vrais gains sont architecturaux : moins de travail, pas un travail plus « astucieux ».",
          },
          {
            label: "Bonne pratique",
            value:
              "Écrire d'abord un code clair, mesurer avec de vraies données, optimiser le point chaud, puis vérifier le gain. Et fixer un budget (ex. page interactive en moins de 3 secondes sur mobile) plutôt qu'optimiser dans le vide.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Exemple réel : limiter les événements fréquents (debounce)",
        code: `// SANS debounce : la recherche se lance à CHAQUE touche pressée\n// AVEC debounce : on attend que l'utilisateur ait fini de taper\nfunction debounce(fonction, delai) {\n  let minuteur;\n  return function (...args) {\n    clearTimeout(minuteur);\n    minuteur = setTimeout(() => fonction(...args), delai);\n  };\n}\nconst champ = document.querySelector("#recherche");\nchamp.addEventListener("input", debounce((event) => {\n  lancerRecherche(event.target.value); // 1 seul appel après 300 ms de pause\n}, 300));`,
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité : comprendre sans attaquer",
    level: 3,
    intro:
      "Les deux failles que tout développeur JavaScript doit connaître.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la sécurité côté JavaScript consiste surtout à ne jamais faire confiance aux données extérieures — tout ce qui vient de l'utilisateur, de l'URL ou d'une API peut contenir du code malveillant. Cette section explique les mécanismes pour s'en protéger ; elle ne décrit aucune technique d'attaque.",
      },
      {
        kind: "fields",
        title: "Les risques à connaître",
        fields: [
          {
            label: "XSS (cross-site scripting)",
            value:
              "Le mécanisme : si votre page affiche du texte fourni par un utilisateur via `innerHTML`, et que ce texte contient une balise `<script>`, le navigateur l'exécute — avec les droits de votre site (vol de session possible). La protection : utiliser `textContent` pour le texte, et ne jamais injecter de données brutes dans du HTML. Les frameworks modernes échappent par défaut.",
          },
          {
            label: "Injection via `eval` et assimilés",
            value:
              "Le mécanisme : `eval(chaine)` exécute la chaîne comme du code JavaScript — si la chaîne contient des données utilisateur, c'est une exécution de code arbitraire. La protection : ne jamais utiliser `eval`, ni `new Function` avec des données dynamiques, ni `setTimeout` avec une chaîne. Il existe toujours une alternative sûre.",
          },
          {
            label: "Données sensibles côté client",
            value:
              "Le mécanisme : tout ce qui est envoyé au navigateur est visible par l'utilisateur (DevTools, onglet Sources). La protection : ne jamais mettre de secret (clé d'API privée, mot de passe) dans le JavaScript du navigateur ; les vérifications de droits se font côté serveur, jamais uniquement côté client.",
          },
          {
            label: "Dépendances",
            value:
              "Le mécanisme : un paquet npm compromis ou vulnérable s'exécute avec les mêmes droits que votre code. La protection : `npm audit` signale les vulnérabilités connues ; mettre à jour régulièrement ; limiter le nombre de dépendances à ce qui est vraiment nécessaire.",
          },
        ],
      },
      {
        kind: "command",
        label: "Auditer les vulnérabilités connues des dépendances",
        command: "npm audit",
        why: "Compare les versions installées à la base de vulnérabilités connues et signale les paquets à mettre à jour, avec le niveau de gravité.",
        verify:
          "Le rapport liste les vulnérabilités trouvées (ou `found 0 vulnerabilities`). `npm audit fix` tente de corriger automatiquement les cas simples.",
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Les habitudes qui distinguent un code qui marche d'un code qui dure.",
    blocks: [
      {
        kind: "fields",
        title: "Le condensé",
        fields: [
          {
            label: "Nommer avec intention",
            value:
              "Un nom doit dire ce que la chose EST ou FAIT : `utilisateursActifs` plutôt que `data`, `calculerTotal()` plutôt que `traitement()`. On lit le code dix fois plus qu'on ne l'écrit : chaque nom économise une relecture.",
          },
          {
            label: "Fonctions courtes, une responsabilité",
            value:
              "Si une fonction fait trois choses, elle en cache deux. Découper en petites fonctions nommées rend le code testable et les bugs localisables.",
          },
          {
            label: "Ne pas se répéter (DRY)",
            value:
              "Un comportement dupliqué en trois endroits devra être corrigé trois fois — et on en oubliera un. Factoriser dès la deuxième duplication, pas la première (éviter l'abstraction prématurée).",
          },
          {
            label: "Échouer de façon visible",
            value:
              "Préférer une erreur claire et tôt (`throw new Error(\"... explicite\")`) à un comportement silencieux et bizarre plus tard. Valider les entrées aux frontières du système.",
          },
          {
            label: "Commenter le pourquoi, pas le quoi",
            value:
              "`// on attend 300ms car l'API limite à 3 appels/seconde` est utile ; `// incrémente i` ne l'est pas — le code dit déjà quoi. Si le « quoi » a besoin d'un commentaire, c'est souvent le code qu'il faut clarifier.",
          },
          {
            label: "Garder les fonctions pures quand c'est possible",
            value:
              "Mêmes entrées → même sortie, aucun effet de bord : ces fonctions sont triviales à tester et à raisonner. Isoler les effets de bord (réseau, DOM, fichiers) aux frontières du programme.",
          },
          {
            label: "Versionner et décrire",
            value:
              "Un `README` qui explique comment lancer le projet, des commits petits et explicites, un `.gitignore` correct : c'est aussi du professionnalisme, et c'est ce que les autres développeurs jugeront en premier.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Les 10 erreurs les plus fréquentes",
    level: 3,
    intro:
      "Celles que vous croiserez à coup sûr — reconnues en un coup d'œil après cette section.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "`Cannot read properties of undefined (reading 'x')`",
            value:
              "Problem : on accède à une propriété sur `undefined` ou `null`. Why : la valeur vient d'une source incertaine (API, paramètre optionnel) et on l'utilise sans vérifier. Bad : `utilisateur.adresse.ville` directement. Better : `utilisateur?.adresse?.ville ?? \"inconnue\"` (optional chaining + valeur par défaut).",
          },
          {
            label: "`X is not a function`",
            value:
              "Problem : on appelle quelque chose qui n'est pas une fonction. Why : faute de frappe dans le nom, méthode inexistante sur ce type (`\"abc\".map()`), ou import raté (`undefined` importé). Bad : deviner et relancer. Better : vérifier le type réel avec `console.log(typeof x)` et relire l'import/la documentation de la méthode.",
          },
          {
            label: "`Cannot use import statement outside a module`",
            value:
              "Problem : `import` utilisé dans un fichier traité comme CommonJS. Why : Node.js traite `.js` en CommonJS par défaut sans `\"type\": \"module\"`. Bad : tout réécrire en `require`. Better : ajouter `\"type\": \"module\"` dans `package.json` (ou utiliser l'extension `.mjs`).",
          },
          {
            label: "Oublier `await`",
            value:
              "Problem : on manipule une promesse au lieu de sa valeur (`[object Promise]` affiché, `.propriete` = `undefined`). Why : `async` retourne toujours une promesse, `await` est facile d'oublier dans une chaîne. Bad : ajouter des `.then()` autour. Better : `const donnees = await fetch(...).then(r => r.json())` — vérifier chaque appel async.",
          },
          {
            label: "`undefined` retourné par une fonction",
            value:
              "Problem : la fonction retourne `undefined` au lieu du résultat. Why : `return` oublié (fréquent avec les fléchées à bloc `{ }`). Bad : `const double = n => { n * 2 };`. Better : `const double = n => n * 2;` ou ajouter le `return` explicite dans le bloc.",
          },
          {
            label: "Comparaison avec `==`",
            value:
              "Problem : une condition est vraie (ou fausse) contre toute attente. Why : la coercition implicite de `==` (`0 == false`, `\"\" == false`). Bad : `if (saisie == 18)`. Better : convertir explicitement puis `===` : `if (Number(saisie) === 18)`.",
          },
          {
            label: "Mutation d'objet partagé",
            value:
              "Problem : modifier un objet change aussi un « autre » objet. Why : l'affectation d'objets copie la référence, pas le contenu. Bad : `const copie = original; copie.x = 1;`. Better : `{ ...original, x: 1 }` (copie superficielle) ou `structuredClone(original)` (profonde).",
          },
          {
            label: "`this` perdu dans un callback",
            value:
              "Problem : `this` vaut `undefined` dans une méthode passée en callback. Why : la méthode est détachée de son objet au moment de l'appel. Bad : `setTimeout(obj.methode, 100)`. Better : `setTimeout(() => obj.methode(), 100)` ou `obj.methode.bind(obj)`.",
          },
          {
            label: "Boucle `for` + `var` + callback",
            value:
              "Problem : toutes les itérations voient la dernière valeur de l'index. Why : `var` est partagé (une seule variable), les callbacks s'exécutent après la boucle. Bad : `for (var i...) setTimeout(() => console.log(i))`. Better : utiliser `let`, qui crée une variable par itération.",
          },
          {
            label: "Rejet de promesse non géré",
            value:
              "Problem : `UnhandledPromiseRejection` — une erreur async n'est interceptée nulle part. Why : chaîne `.then()` sans `.catch()`, ou `await` hors `try`/`catch` quand l'échec est possible. Bad : ignorer l'avertissement. Better : toujours terminer par `.catch()` ou entourer de `try`/`catch`.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "4 projets réalistes et progressifs",
    level: 3,
    intro:
      "Pas de Todo App : des projets qui ressemblent à du vrai travail.",
    blocks: [
      {
        kind: "fields",
        title: "Progression",
        fields: [
          {
            label: "Projet 1 — Jeu du navigateur : « Devine le nombre » enrichi",
            value:
              "Objectif : DOM, événements et état sans framework. Compétences requises : HTML/CSS de base, fonctions, événements. Ce que l'on construit : un jeu complet avec essais limités, historique des propositions, meilleur score persisté en `localStorage`, et retour visuel (trop grand / trop petit). Concepts utilisés : sélection DOM, écouteurs, état en mémoire, `localStorage`, `setTimeout` pour les animations. Difficulté : débutant — tout tient dans un fichier, mais le jeu doit être fini et poli. Projet suivant : le client API.",
          },
          {
            label: "Projet 2 — Client API avec cache : explorateur de données",
            value:
              "Objectif : `fetch`, async/await et gestion des trois états (chargement / succès / erreur). Compétences requises : promesses, modules, JSON. Ce que l'on construit : une page qui interroge une API publique (ex. une API de données ouvertes), affiche les résultats avec recherche, et met en cache les réponses en mémoire pour éviter les appels redondants. Concepts utilisés : `fetch`, `async`/`await`, `Promise.all`, debounce sur la recherche, gestion d'erreurs réseau, cache simple avec `Map`. Difficulté : intermédiaire — la gestion des états et du cache demande de la rigueur. Projet suivant : la CLI Node.",
          },
          {
            label: "Projet 3 — CLI Node : analyseur de fichiers",
            value:
              "Objectif : Node.js hors navigateur — fichiers, arguments, sortie terminal. Compétences requises : modules, fonctions, gestion d'erreurs. Ce que l'on construit : un outil en ligne de commande qui analyse un dossier (compte les fichiers par extension, taille totale, fichiers les plus gros) et affiche un rapport formaté, avec options (`--json` pour sortir du JSON, `--seuil` pour filtrer). Concepts utilisés : `process.argv`, module `fs/promises`, `path`, async/await en séquence et en parallèle, codes de sortie. Difficulté : intermédiaire — la robustesse (dossier inexistant, permissions) fait la différence. Projet suivant : le mini-bundler.",
          },
          {
            label: "Projet 4 — Mini-bundler pédagogique",
            value:
              "Objectif : comprendre ce que font Vite et les bundlers, en en écrivant un minuscule. Compétences requises : modules ESM, expressions régulières (bases), graphe de dépendances. Ce que l'on construit : un script qui part d'un fichier d'entrée, suit les `import` relatifs par analyse du texte, et produit UN seul fichier avec les modules concaténés dans le bon ordre. Concepts utilisés : lecture de fichiers, résolution de chemins, tri topologique simplifié, génération de code. Difficulté : avancé — c'est un projet de compréhension profonde, pas de production (pour la production, on utilise Vite). Projet suivant : TypeScript, pour typer tout cela.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Les références fiables, classées par priorité.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle et références",
        fields: [
          {
            label: "MDN Web Docs — JavaScript",
            value:
              "La référence : précise, à jour, avec exemples et compatibilité navigateurs pour chaque fonctionnalité. Le premier réflexe quand on veut le détail exact d'une méthode ou d'une syntaxe.",
          },
          {
            label: "javascript.info",
            value:
              "Le tutoriel le plus pédagogique du langage, du niveau débutant aux sujets avancés (prototypes, promesses, événements), avec des exercices. Idéal pour apprendre dans l'ordre.",
          },
          {
            label: "Documentation Node.js",
            value:
              "La référence officielle du runtime : API des modules (`fs`, `path`, `http`...), guides et changelogs. Indispensable dès qu'on sort du navigateur.",
          },
          {
            label: "Documentation npm",
            value:
              "Tout sur `package.json`, les scripts, les lockfiles et la publication de paquets.",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode conseillée : apprendre dans l'ordre avec javascript.info, vérifier le détail exact sur MDN, et consulter la doc Node.js dès qu'on touche au runtime. Éviter les tutoriels non datés : JavaScript évolue chaque année (nouvelles syntaxes), un article de 2015 enseigne souvent des pratiques dépassées.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "JavaScript maîtrisé : les trois directions naturelles.",
    blocks: [
      {
        kind: "fields",
        title: "Prochaines étapes",
        fields: [
          {
            label: "TypeScript",
            value:
              "La suite logique : le même langage, plus un système de types statiques qui détecte les erreurs avant l'exécution. Vos connaissances JavaScript sont directement réutilisables — TypeScript ajoute une couche de sécurité par-dessus. La Learning Page TypeScript de Pathway couvre le sujet en profondeur.",
          },
          {
            label: "Un framework : React, Vue ou Angular",
            value:
              "Pour construire des interfaces complexes : les frameworks structurent le DOM, l'état et les événements à grande échelle. React est le plus demandé, Vue est réputé pour sa courbe d'apprentissage douce, Angular pour les grandes applications d'entreprise. Tous reposent sur les fondamentaux JavaScript de cette page.",
          },
          {
            label: "Node.js en profondeur",
            value:
              "Pour le backend : APIs REST, bases de données, authentification, temps réel. Le JavaScript asynchrone appris ici (promesses, `async`/`await`, boucle d'événements) est exactement ce qui fait la force de Node.js côté serveur.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le signe que vous êtes prêt : vous lisez une erreur JavaScript et savez où chercher avant de chercher sur internet ; vous choisissez `map`/`filter`/`reduce` sans hésiter ; et l'asynchrone ne vous fait plus peur — il vous semble naturel.",
      },
    ],
  },
];

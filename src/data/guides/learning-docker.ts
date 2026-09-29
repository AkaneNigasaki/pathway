import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Docker : de zéro à un usage professionnel de la
 * conteneurisation. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code inline
 * entre backticks. Commandes toujours expliquées : label, commande,
 * pourquoi, vérification.
 */
export const LEARNING_DOCKER: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Docker, ce qu'il résout, et pourquoi la conteneurisation est devenue un standard de l'industrie.",
    blocks: [
      {
        kind: "text",
        text: "Docker est une plateforme open source qui permet d'empaqueter une application et tout son environnement (code, bibliothèques, dépendances système, configuration) dans une unité standardisée appelée conteneur. Un conteneur s'exécute de façon isolée et identique sur n'importe quelle machine où Docker est installé : votre poste, un serveur, le cloud.",
      },
      {
        kind: "text",
        text: "Le problème que Docker résout s'appelle le « ça marche sur ma machine » : une application qui fonctionne en développement mais échoue en production parce que les environnements diffèrent (version de Python, de Node, bibliothèque système manquante, variable d'environnement oubliée). En figeant l'environnement dans une image, Docker supprime toute une classe de bugs liés aux différences entre machines.",
      },
      {
        kind: "text",
        text: "Docker emballe une application avec son environnement dans un conteneur portable qui tourne partout à l'identique.",
      },
      {
        kind: "text",
        text: "Les environnements de développement, de test et de production divergeaient sans cesse, causant des bugs impossibles à reproduire. Les machines virtuelles résolvaient cela mais au prix d'un coût énorme en ressources. Docker offre l'isolation avec la légèreté d'un processus.",
      },
      {
        kind: "text",
        text: "Dès qu'une application doit tourner ailleurs que sur votre machine : déploiement, CI/CD, partage avec une équipe, microservices, environnements de test reproductibles. Pour un simple script local, c'est inutile.",
      },
      {
        kind: "fields",
        title: "Docker : l'essentiel",
        fields: [
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni une machine virtuelle, ni un langage, ni un orchestrateur de production à lui seul (c'est le rôle de Kubernetes). Docker construit et exécute des conteneurs ; l'orchestration à grande échelle est un sujet séparé.",
          },
        ],
      },
      {
        kind: "text",
        text: "Trois mots à ne jamais confondre : une image est un modèle figé et en lecture seule (comme un moule), un conteneur est une instance vivante créée à partir d'une image (comme le gâteau sorti du moule), et un registre est un entrepôt où l'on stocke et partage les images (comme une bibliothèque).",
      },
    ],
  },
  {
    id: "conteneur-vs-machine-virtuelle",
    title: "Conteneur vs machine virtuelle",
    level: 1,
    intro:
      "La différence fondamentale qui explique pourquoi les conteneurs ont conquis l'industrie : même isolation, fraction du coût.",
    blocks: [
      {
        kind: "diagram",
        title: "Machine virtuelle : chaque VM embarque un OS complet",
        lines: [
          "┌─────────────┐ ┌─────────────┐",
          "│  App + libs │ │  App + libs │",
          "├─────────────┤ ├─────────────┤",
          "│ OS invité   │ │ OS invité   │  ← un système complet par VM",
          "├─────────────┴───────────────┤",
          "│ Hyperviseur                 │",
          "├─────────────────────────────┤",
          "│ OS hôte + matériel          │",
          "└─────────────────────────────┘",
          "Démarrage : dizaines de secondes à minutes. Poids : plusieurs Go.",
        ],
      },
      {
        kind: "diagram",
        title: "Conteneur : les conteneurs partagent le noyau de l'hôte",
        lines: [
          "┌──────────┐ ┌──────────┐ ┌──────────┐",
          "│   App    │ │   App    │ │   App    │",
          "├──────────┴────────────┴────────────┤",
          "│ Moteur de conteneurs (Docker)     │",
          "├───────────────────────────────────┤",
          "│ OS hôte (noyau partagé) + matériel│",
          "└───────────────────────────────────┘",
          "Démarrage : moins d'une seconde. Poids : quelques Mo à centaines de Mo.",
        ],
      },
      {
        kind: "table",
        headers: ["Critère", "Machine virtuelle", "Conteneur Docker"],
        rows: [
          ["Isolation", "Forte : noyau séparé", "Bonne : espaces de noms du noyau"],
          ["Démarrage", "Secondes à minutes", "Millisecondes à secondes"],
          ["Poids typique", "Plusieurs Go", "Quelques Mo à centaines de Mo"],
          ["Densité", "Dizaines par machine", "Centaines par machine"],
          ["Cas d'usage", "OS différents, isolation maximale", "Applications, microservices, CI/CD"],
        ],
      },
      {
        kind: "text",
        text: "Une VM virtualise le matériel et fait tourner un OS complet ; un conteneur virtualise l'OS et partage le noyau de l'hôte.",
      },
      {
        kind: "fields",
        title: "Comprendre la différence",
        fields: [          {
            label: "Pourquoi ça compte",
            value:
              "Partager le noyau supprime la duplication : pas de second OS à démarrer, à patcher, à stocker. C'est ce qui rend les conteneurs rapides, légers et adaptés au déploiement massif.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Croire qu'un conteneur est « une petite VM » et y installer un système d'init, SSH ou plusieurs services : un conteneur doit rester minimal et faire tourner un seul processus principal.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un conteneur = un processus principal. Si votre application a besoin d'une base de données, lancez deux conteneurs reliés par un réseau, pas un conteneur qui fait tout.",
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
      "Ce qu'il faut savoir et avoir avant de conteneuriser votre première application.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un terminal et des bases de ligne de commande : naviguer dans les dossiers, lancer des commandes.",
          "Notions de réseau : ce qu'est un port (ex. `localhost:8080`) et une adresse IP.",
          "Savoir ce qu'est une variable d'environnement (ex. `PORT`, `DATABASE_URL`).",
          "Aucun langage obligatoire : les exemples utilisent des images prêtes à l'emploi (`nginx`, `hello-world`).",
          "Un compte Docker Hub (gratuit) seulement si vous voulez publier vos images plus tard — pas nécessaire pour débuter.",
        ],
      },
      {
        kind: "text",
        text: "Bonne nouvelle : vous n'avez pas besoin de connaître l'administration système Linux en profondeur pour commencer. Docker abstrait la complexité ; les concepts système (espaces de noms, cgroups) sont expliqués dans la partie Approfondi, quand vous en aurez besoin.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation : Docker Desktop ou moteur Linux",
    level: 2,
    intro:
      "Deux façons d'installer Docker selon votre système — les deux sont officielles, le choix dépend de votre OS.",
    blocks: [
      {
        kind: "table",
        headers: ["Situation", "Solution recommandée", "Particularité"],
        rows: [
          ["Windows ou macOS", "Docker Desktop", "Application graphique qui inclut le moteur, le CLI et Compose ; utilise une VM Linux légère en arrière-plan"],
          ["Linux (Ubuntu, Debian…)", "Docker Engine", "Installation native via le gestionnaire de paquets ; le plus performant, sans surcouche"],
          ["Linux (option simple)", "Docker Desktop pour Linux", "Même interface que sur Mac/Windows, mais le moteur natif reste plus courant sur serveur"],
        ],
      },
      {
        kind: "text",
        text: "Point factuel important : les conteneurs Linux ont besoin d'un noyau Linux. Sur macOS et Windows, Docker Desktop fait tourner une petite machine virtuelle Linux transparente pour fournir ce noyau — c'est invisible à l'usage, mais cela explique une légère différence de performance par rapport à Linux natif.",
      },
      {
        kind: "command",
        label: "Vérifier que Docker est installé et fonctionnel",
        command: "docker --version",
        why: "Affiche la version du client Docker. Si la commande est inconnue, l'installation n'est pas terminée ou le terminal doit être rouvert.",
        verify: "Vous devez voir quelque chose comme `Docker version 27.x.x`.",
      },
      {
        kind: "command",
        label: "Vérifier la connexion au moteur Docker",
        command: "docker version",
        why: "Contrairement à `docker --version`, cette commande interroge aussi le serveur (le démon). Elle prouve que le moteur tourne et répond, pas seulement que le CLI est installé.",
        verify: "Deux blocs `Client` et `Server` s'affichent. Si le bloc `Server` manque, le démon n'est pas démarré (voir la section d'erreur dédiée).",
      },
      {
        kind: "fields",
        title: "Repères d'installation",
        fields: [
          {
            label: "Documentation officielle",
            value:
              "La seule source fiable pour les instructions par OS : `docs.docker.com` (guides « Install Docker Engine » et « Docker Desktop »). Les commandes d'installation changent avec les versions, fiez-vous à la doc du jour.",
          },
          {
            label: "Sur Linux : le groupe docker",
            value:
              "Après installation sur Linux, votre utilisateur doit appartenir au groupe `docker` pour lancer des conteneurs sans `sudo` (voir la section d'erreur « permission refusée »).",
          },
          {
            label: "Docker Desktop : ressources",
            value:
              "Dans les réglages de Docker Desktop, vous pouvez limiter la mémoire et les CPU alloués à la VM Linux — utile sur une machine peu dotée.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-conteneur",
    title: "Votre premier conteneur en 5 minutes",
    level: 2,
    intro:
      "Le rituel d'initiation : télécharger une image et lancer un serveur web dans un conteneur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lancer le conteneur de test",
            detail:
              "La commande `docker run hello-world` télécharge l'image `hello-world` depuis Docker Hub puis l'exécute. Le conteneur affiche un message de bienvenue et s'arrête : tout fonctionne.",
          },
          {
            title: "Lancer un vrai serveur web",
            detail:
              "La commande `docker run -d -p 8080:80 --name mon-site nginx` télécharge l'image du serveur `nginx`, le lance en arrière-plan (`-d`), redirige le port 8080 de votre machine vers le port 80 du conteneur (`-p`), et le nomme `mon-site`.",
          },
          {
            title: "Vérifier dans le navigateur",
            detail:
              "Ouvrez `http://localhost:8080` : vous voyez la page d'accueil de nginx. Ce serveur ne tourne pas « sur votre machine » au sens classique — il tourne isolé dans le conteneur.",
          },
          {
            title: "Observer le conteneur actif",
            detail:
              "La commande `docker ps` liste les conteneurs en cours d'exécution : vous y voyez `mon-site`, son image `nginx`, et le mappage de ports `0.0.0.0:8080->80/tcp`.",
          },
          {
            title: "Arrêter et nettoyer",
            detail:
              "Les commandes `docker stop mon-site` puis `docker rm mon-site` arrêtent le conteneur et le suppriment. L'image `nginx` reste en cache local, prête pour le prochain lancement.",
          },
        ],
      },
      {
        kind: "command",
        label: "Le test canonique : hello-world",
        command: "docker run hello-world",
        why: "`run` fait deux choses : télécharger l'image si elle n'existe pas localement (`pull` implicite), puis créer et démarrer un conteneur. `hello-world` est l'image officielle minimale conçue pour valider l'installation.",
        verify: "Un message « Hello from Docker! » s'affiche, suivi d'explications. S'il apparaît, votre installation est complète.",
      },
    ],
  },
  {
    id: "docker-run-decortique",
    title: "`docker run` décortiqué",
    level: 2,
    intro:
      "La commande la plus importante de Docker, option par option : c'est elle que vous taperez tous les jours.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Anatomie d'un docker run typique",
        code: "docker run -d -p 8080:80 --name mon-site -e MODE=prod nginx",
      },
      {
        kind: "fields",
        title: "Chaque morceau expliqué",
        fields: [
          {
            label: "`docker run`",
            value:
              "Crée un conteneur à partir d'une image et le démarre. C'est la combinaison de `docker create` (créer) + `docker start` (démarrer).",
          },
          {
            label: "`-d` (detach)",
            value:
              "Lance le conteneur en arrière-plan et rend la main au terminal. Sans `-d`, les logs du conteneur occupent votre terminal jusqu'à `Ctrl+C`.",
          },
          {
            label: "`-p 8080:80` (publish)",
            value:
              "Publie un port : le port `8080` de votre machine redirige vers le port `80` du conteneur. Format toujours `hôte:conteneur`. Sans `-p`, le serveur reste inaccessible depuis l'extérieur.",
          },
          {
            label: "`--name mon-site`",
            value:
              "Donne un nom explicite au conteneur. Sans nom, Docker génère un nom aléatoire amusant mais imprononçable (`stoic_bhabha`). Un nom fixe simplifie `stop`, `logs`, `exec`.",
          },
          {
            label: "`-e MODE=prod` (env)",
            value:
              "Définit une variable d'environnement dans le conteneur. C'est le mécanisme standard pour configurer une application sans modifier son image (mots de passe, URLs, modes).",
          },
          {
            label: "`nginx`",
            value:
              "Le nom de l'image. Sans préfixe de registre, Docker cherche sur Docker Hub. On peut préciser une version : `nginx:1.27` au lieu de `nginx` (qui signifie `nginx:latest`).",
          },
        ],
      },
      {
        kind: "command",
        label: "Lancer un conteneur qui se supprime tout seul à l'arrêt",
        command: "docker run --rm -it ubuntu bash",
        why: "`--rm` supprime automatiquement le conteneur quand il s'arrête : idéal pour les tests ponctuels sans accumuler des conteneurs fantômes. `-it` donne un terminal interactif (`i` = garder l'entrée ouverte, `t` = pseudo-terminal).",
        verify: "`docker ps -a` ne montre plus le conteneur après avoir tapé `exit` dans le shell.",
      },
      {
        kind: "fields",
        title: "Pièges classiques de docker run",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Oublier `-p` puis chercher pourquoi `localhost:8080` ne répond pas : le serveur tourne, mais son port n'est pas publié vers l'hôte.",
          },
          {
            label: "Bonne pratique",
            value:
              "Nommez toujours vos conteneurs importants avec `--name` et fixez la version de l'image (`postgres:16` plutôt que `postgres`) pour des déploiements reproductibles.",
          },
        ],
      },
    ],
  },
  {
    id: "lister-conteneurs",
    title: "Lister les conteneurs : `docker ps`",
    level: 2,
    intro:
      "Voir ce qui tourne, ce qui s'est arrêté, et comprendre le tableau d'information principal de Docker.",
    blocks: [
      {
        kind: "command",
        label: "Voir les conteneurs en cours d'exécution",
        command: "docker ps",
        why: "Affiche les conteneurs actifs avec leur ID (tronqué), l'image d'origine, la commande lancée, l'âge, le statut, les ports publiés et le nom. C'est le tableau de bord de base.",
        verify: "Chaque conteneur lancé avec `-d` apparaît avec `STATUS: Up ...`.",
      },
      {
        kind: "command",
        label: "Voir aussi les conteneurs arrêtés",
        command: "docker ps -a",
        why: "Par défaut `docker ps` cache les conteneurs arrêtés. L'option `-a` (all) les montre avec `STATUS: Exited`. Indispensable pour retrouver un conteneur stoppé ou comprendre pourquoi un nom est « déjà utilisé ».",
      },
      {
        kind: "fields",
        title: "Lire le tableau docker ps",
        fields: [
          {
            label: "CONTAINER ID",
            value:
              "Identifiant unique (12 premiers caractères affichés). Les commandes acceptent ce préfixe à la place du nom.",
          },
          {
            label: "STATUS",
            value:
              "`Up 2 hours` = tourne depuis 2 h. `Exited (0)` = s'est arrêté proprement. `Exited (137)` = tué de force (souvent manque de mémoire).",
          },
          {
            label: "PORTS",
            value:
              "`0.0.0.0:8080->80/tcp` signifie : port 8080 de l'hôte redirigé vers le port 80 du conteneur, en TCP.",
          },
          {
            label: "Pourquoi un conteneur « disparaît »",
            value:
              "Un conteneur existe tant que son processus principal tourne. `docker run ubuntu` sans commande s'arrête aussitôt : le processus se termine, le conteneur passe à `Exited`. Ce n'est pas un bug, c'est le modèle d'exécution.",
          },
        ],
      },
    ],
  },
  {
    id: "lister-images",
    title: "Lister les images : `docker images`",
    level: 2,
    intro:
      "Vos images locales sont un stock précieux : savoir les lister, comprendre les tags et mesurer leur poids.",
    blocks: [
      {
        kind: "command",
        label: "Lister les images téléchargées",
        command: "docker images",
        why: "Affiche le dépôt (repository), le tag (version), l'identifiant, la date de création et la taille de chaque image locale. Permet de voir ce qui occupe de l'espace disque.",
      },
      {
        kind: "text",
        text: "Une image est un empilement de couches en lecture seule ; chaque instruction d'un Dockerfile ajoute une couche.",
      },
      {
        kind: "fields",
        title: "Comprendre les images",
        fields: [          {
            label: "Le tag",
            value:
              "`nginx:1.27` = l'image `nginx`, version `1.27`. Sans tag, Docker utilise implicitement `latest`, qui est une étiquette mouvante : elle pointe vers « la plus récente au moment du pull », jamais une garantie de version.",
          },
          {
            label: "Pourquoi figer les tags",
            value:
              "Avec `latest`, deux `pull` à des semaines d'intervalle peuvent donner deux versions différentes — source classique du « ça marchait hier ». En production, épinglez toujours une version explicite.",
          },
          {
            label: "La taille",
            value:
              "La colonne `SIZE` montre le poids total. Une image `node` complète pèse ~1 Go, sa variante `alpine` ~170 Mo : le choix de l'image de base a un impact direct (voir la section sur les images légères).",
          },
        ],
      },
      {
        kind: "command",
        label: "Supprimer une image devenue inutile",
        command: "docker rmi nginx:1.27",
        why: "`rmi` (remove image) libère de l'espace disque. Impossible si un conteneur (même arrêté) utilise encore l'image : supprimez d'abord le conteneur.",
      },
    ],
  },
  {
    id: "cycle-de-vie",
    title: "Cycle de vie : stop, start, restart, rm",
    level: 2,
    intro:
      "Un conteneur n'est pas éternel : voici comment le mettre en pause, le relancer et le supprimer proprement.",
    blocks: [
      {
        kind: "command",
        label: "Arrêter proprement un conteneur",
        command: "docker stop mon-site",
        why: "Envoie d'abord `SIGTERM` (demande polie d'arrêt : le processus peut se nettoyer), puis `SIGKILL` après 10 secondes s'il résiste. Préférez toujours `stop` à un kill brutal.",
        verify: "`docker ps` ne l'affiche plus ; `docker ps -a` le montre en `Exited`.",
      },
      {
        kind: "command",
        label: "Redémarrer un conteneur arrêté",
        command: "docker start mon-site",
        why: "Relance un conteneur existant avec la même configuration (ports, volumes, variables). Contrairement à `run`, `start` ne crée rien : il réveille ce qui existe déjà.",
      },
      {
        kind: "command",
        label: "Supprimer un conteneur arrêté",
        command: "docker rm mon-site",
        why: "Supprime définitivement le conteneur et son système de fichiers éphémère. Attention : les données non stockées dans un volume sont perdues — c'est voulu, un conteneur doit être jetable.",
      },
      {
        kind: "command",
        label: "Forcer l'arrêt et la suppression en une fois",
        command: "docker rm -f mon-site",
        why: "`-f` (force) arrête le conteneur s'il tourne puis le supprime. Pratique en développement pour repartir de zéro, à éviter en production où l'on préfère un arrêt gracieux.",
      },
      {
        kind: "text",
        text: "`run` = créer + démarrer ; `start`/`stop`/`restart` = piloter l'existant ; `rm` = détruire. Créer est coûteux, piloter est instantané.",
      },
      {
        kind: "fields",
        title: "Le modèle mental du cycle de vie",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Relancer `docker run` à chaque test au lieu de `docker restart` : on accumule des dizaines de conteneurs arrêtés qui occupent du disque et créent des conflits de noms.",
          },
          {
            label: "Bonne pratique",
            value:
              "En développement, utilisez `--rm` pour les conteneurs jetables et nettoyez régulièrement avec `docker ps -a` pour repérer les conteneurs oubliés.",
          },
        ],
      },
    ],
  },
  {
    id: "voir-les-logs",
    title: "Voir les logs : `docker logs`",
    level: 2,
    intro:
      "Quand un conteneur tourne en arrière-plan, ses logs sont votre seule fenêtre sur ce qu'il fait.",
    blocks: [
      {
        kind: "command",
        label: "Afficher les logs d'un conteneur",
        command: "docker logs mon-site",
        why: "Affiche tout ce que le processus principal du conteneur a écrit sur sa sortie standard et sa sortie d'erreur depuis son démarrage. C'est le premier réflexe de debugging.",
      },
      {
        kind: "command",
        label: "Suivre les logs en temps réel",
        command: "docker logs -f mon-site",
        why: "`-f` (follow) fonctionne comme `tail -f` : les nouvelles lignes s'affichent au fur et à mesure. Indispensable pour observer un démarrage ou une erreur en direct. `Ctrl+C` pour quitter (le conteneur continue de tourner).",
      },
      {
        kind: "command",
        label: "Limiter aux dernières lignes avec horodatage",
        command: "docker logs --tail 50 -t mon-site",
        why: "`--tail 50` n'affiche que les 50 dernières lignes (évite de noyer le terminal quand les logs sont volumineux) et `-t` ajoute l'horodatage de chaque ligne, précieux pour corréler avec un incident.",
      },
      {
        kind: "text",
        text: "Docker capture la sortie standard du processus principal : si votre application logue sur la console, `docker logs` la montre.",
      },
      {
        kind: "fields",
        title: "Comprendre les logs Docker",
        fields: [          {
            label: "Pourquoi c'est conçu ainsi",
            value:
              "Écrire les logs sur la console (plutôt que dans des fichiers internes) rend le conteneur observable de l'extérieur sans y entrer. C'est un principe des applications « twelve-factor ».",
          },
          {
            label: "Erreur fréquente",
            value:
              "Des logs vides alors que l'application tourne : elle écrit probablement dans un fichier interne au conteneur au lieu de la console. Configurez-la pour loguer sur `stdout`.",
          },
        ],
      },
    ],
  },
  {
    id: "entrer-dans-conteneur",
    title: "Entrer dans un conteneur : `docker exec`",
    level: 2,
    intro:
      "Ouvrir un shell à l'intérieur d'un conteneur en cours d'exécution pour inspecter, déboguer, comprendre.",
    blocks: [
      {
        kind: "command",
        label: "Ouvrir un shell interactif dans le conteneur",
        command: "docker exec -it mon-site sh",
        why: "`exec` exécute une commande dans un conteneur déjà en cours d'exécution, sans le redémarrer. `-it` donne un terminal interactif. `sh` est le shell présent dans presque toutes les images (les images Debian ont aussi `bash`).",
        verify: "Votre prompt change : `ls`, `cat`, `env` s'exécutent maintenant dans le conteneur, pas sur votre machine.",
      },
      {
        kind: "text",
        text: "`docker run` crée un NOUVEAU conteneur ; `docker exec` entre dans un conteneur EXISTANT qui tourne déjà.",
      },
      {
        kind: "text",
        text: "Debugging ponctuel, vérification de fichiers, test de connectivité réseau depuis le conteneur. Pas pour modifier l'application : tout changement dans le conteneur est éphémère.",
      },
      {
        kind: "fields",
        title: "exec vs run : ne pas confondre",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Utiliser `docker run -it mon-image sh` pour « inspecter » puis s'étonner que les fichiers créés par l'application n'y sont pas : vous avez créé un second conteneur vierge, pas ouvert le premier.",
          },
          {
            label: "Bonne pratique",
            value:
              "Sortez avec `exit` ou `Ctrl+D`. Et souvenez-vous : ce que vous modifiez dans le conteneur disparaît à sa suppression — corrigez l'image, pas le conteneur.",
          },
        ],
      },
      {
        kind: "command",
        label: "Exécuter une seule commande sans shell interactif",
        command: "docker exec mon-site ls /usr/share/nginx/html",
        why: "Sans `-it`, `exec` lance une commande unique et affiche son résultat. Parfait pour une vérification rapide dans un script, sans ouvrir de session interactive.",
      },
    ],
  },
  {
    id: "editeurs-et-outils",
    title: "Éditeurs et outils du quotidien",
    level: 2,
    intro:
      "L'écosystème autour de Docker : ce qui rend l'écriture de Dockerfiles et de fichiers Compose confortable.",
    blocks: [
      {
        kind: "fields",
        title: "Outils, par profil",
        fields: [
          {
            label: "VS Code + extension Docker",
            value:
              "L'extension officielle « Docker » (Microsoft) apporte la coloration des Dockerfiles, l'autocomplétion des instructions, le lint de base et la gestion visuelle des conteneurs/images depuis la barre latérale. Le choix le plus courant, gratuit.",
          },
          {
            label: "Docker Desktop (dashboard)",
            value:
              "L'interface graphique incluse dans Docker Desktop liste conteneurs, images et volumes, affiche les logs et permet stop/start au clic. Pratique pour visualiser, mais le CLI reste plus rapide au quotidien.",
          },
          {
            label: "Hadolint",
            value:
              "Un linter de Dockerfile en ligne de commande qui signale les mauvaises pratiques (`apt-get` sans nettoyage, `latest` non épinglé…). À intégrer dans la CI pour des images propres.",
          },
          {
            label: "Dive",
            value:
              "Outil en terminal qui explore les couches d'une image et montre ce que chaque couche ajoute au poids total. Idéal pour comprendre pourquoi une image pèse 1 Go et l'optimiser.",
          },
          {
            label: "Aucun outil « obligatoire »",
            value:
              "Un éditeur de texte et le terminal suffisent. Les outils ci-dessus sont des conforts, pas des prérequis — choisissez selon votre profil, sans hiérarchie imposée.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien avec Docker",
    level: 2,
    intro:
      "À quoi ressemble une journée de travail avec Docker, de l'écriture du code au conteneur qui tourne.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de développement typique",
        lines: [
          "1. J'écris mon code (sur ma machine, avec mon éditeur)",
          "           │",
          "2. J'écris / j'ajuste le Dockerfile",
          "           │",
          "3. Je construis :  docker build -t mon-app:dev .",
          "           │",
          "4. Je lance :      docker run -d -p 3000:3000 mon-app:dev",
          "           │",
          "5. Je teste dans le navigateur / avec curl",
          "           │",
          "6. Problème ? → docker logs -f / docker exec -it … sh",
          "           │",
          "7. Je corrige le code → retour à l'étape 3",
          "           │",
          "8. Ça marche → je partage l'image (push) ou je déploie",
        ],
      },
      {
        kind: "text",
        text: "Remarquez l'étape 1 : on code sur sa machine hôte, pas dans le conteneur. Le conteneur sert à exécuter et à valider dans un environnement fidèle à la production, pas à remplacer votre éditeur. En développement, on accélère la boucle avec des volumes qui synchronisent le code local dans le conteneur (voir les bind mounts) pour éviter de reconstruire à chaque modification.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-docker",
    title: "Architecture : client, démon, registres",
    level: 3,
    intro:
      "Ce qui se passe vraiment quand vous tapez `docker run` : trois acteurs et une API entre eux.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois acteurs de Docker",
        lines: [
          "┌──────────────┐   API REST    ┌──────────────────┐",
          "│  Client      │ ◄──────────► │  Démon (dockerd)  │",
          "│  (docker CLI)│  (socket)     │  - construit      │",
          "└──────────────┘               │  - exécute        │",
          "       │                       │  - gère réseaux   │",
          "       │                       └────────┬─────────┘",
          "       │                                │ pull / push",
          "       ▼                                ▼",
          "  Vos commandes                  ┌──────────────┐",
          "                                 │  Registre    │",
          "                                 │ (Docker Hub) │",
          "                                 └──────────────┘",
        ],
      },
      {
        kind: "text",
        text: "Le CLI envoie des ordres, le démon les exécute, le registre stocke les images : le CLI ne touche jamais directement aux conteneurs.",
      },
      {
        kind: "fields",
        title: "Chaque acteur, précisément",
        fields: [          {
            label: "Le démon (dockerd)",
            value:
              "Le processus qui fait le vrai travail : construire les images, créer et superviser les conteneurs, gérer réseaux et volumes. Il tourne en arrière-plan en permanence, même sans terminal ouvert.",
          },
          {
            label: "Pourquoi une architecture client-serveur",
            value:
              "Elle permet de piloter un démon distant : votre CLI local peut gérer Docker sur un serveur via le réseau. C'est aussi pourquoi « le démon ne répond pas » est une panne distincte de « la commande est inconnue ».",
          },
          {
            label: "Le registre",
            value:
              "Un service de stockage d'images. Docker Hub est le registre public par défaut, mais une entreprise peut héberger son registre privé. `pull` télécharge, `push` publie.",
          },
          {
            label: "Concepts liés",
            value:
              "`containerd` (le runtime de bas niveau que le démon utilise en interne), `runc` (celui qui crée vraiment les processus isolés), l'API REST sur socket Unix `/var/run/docker.sock`.",
          },
        ],
      },
    ],
  },
  {
    id: "image-vs-conteneur",
    title: "Image vs conteneur : le modèle des couches",
    level: 3,
    intro:
      "Pourquoi dix conteneurs `nginx` ne pèsent pas dix fois le poids de l'image : le partage des couches.",
    blocks: [
      {
        kind: "diagram",
        title: "Une image = des couches en lecture seule + une couche inscriptible",
        lines: [
          "┌─────────────────────────────────┐",
          "│ Couche conteneur (inscriptible)   │ ← vos modifications live",
          "├─────────────────────────────────┤",
          "│ Couche 3 : votre application      │",
          "├─────────────────────────────────┤",
          "│ Couche 2 : dépendances installées │",
          "├─────────────────────────────────┤",
          "│ Couche 1 : OS de base (alpine)    │",
          "└─────────────────────────────────┘",
          "  Les couches 1-3 sont PARTAGÉES entre tous les conteneurs issus",
          "  de la même image. Seule la fine couche du dessus est propre à",
          "  chaque conteneur — et elle disparaît avec lui.",
        ],
      },
      {
        kind: "text",
        text: "L'image est immuable et partagée ; chaque conteneur ajoute une fine couche éphémère par-dessus pour ses propres écritures.",
      },
      {
        kind: "fields",
        title: "Comprendre le modèle",
        fields: [          {
            label: "Pourquoi c'est ingénieux",
            value:
              "Télécharger dix images basées sur le même OS ne télécharge les couches communes qu'une fois. Démarrer un conteneur est instantané : aucune copie de l'image, juste une couche vide par-dessus.",
          },
          {
            label: "Conséquence pratique",
            value:
              "Écrire des données dans la couche du conteneur (sans volume) est lent et éphémère : les données meurent avec le conteneur. D'où l'importance des volumes pour tout ce qui doit persister.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Stocker une base de données sans volume en pensant que « c'est dans le conteneur donc c'est sauvegardé » : à la suppression du conteneur, les données sont perdues définitivement.",
          },
        ],
      },
    ],
  },
  {
    id: "dockerfile-anatomie",
    title: "Le Dockerfile : anatomie",
    level: 3,
    intro:
      "Le Dockerfile est la recette qui décrit comment construire une image, instruction par instruction.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Un Dockerfile complet et commenté",
        code: "# Image de base : le point de départ (OS + runtime)\nFROM node:20-alpine\n\n# Dossier de travail dans le conteneur\nWORKDIR /app\n\n# D'abord les fichiers de dépendances seuls (optimise le cache)\nCOPY package.json package-lock.json ./\nRUN npm ci --only=production\n\n# Puis le code source\nCOPY . .\n\n# Documentation : le port sur lequel l'app écoute\nEXPOSE 3000\n\n# Commande lancée au démarrage du conteneur\nCMD [\"node\", \"server.js\"]",
      },
      {
        kind: "text",
        text: "Chaque instruction du Dockerfile crée une couche d'image ; l'ordre des instructions détermine l'efficacité du cache de build.",
      },
      {
        kind: "fields",
        title: "Lecture ligne par ligne",
        fields: [          {
            label: "`FROM`",
            value:
              "Toujours en premier : choisit l'image de base. `node:20-alpine` = Node.js 20 sur un Linux Alpine minimal. Tout le reste s'empile par-dessus.",
          },
          {
            label: "Pourquoi `COPY` en deux temps",
            value:
              "Les dépendances changent rarement, le code change souvent. En copiant `package.json` avant le code, la couche `npm ci` est réutilisée depuis le cache tant que les dépendances ne bougent pas — le build passe de minutes à secondes.",
          },
          {
            label: "`EXPOSE`",
            value:
              "Pure documentation : indique le port d'écoute prévu. Il ne publie rien à lui seul — c'est `-p` au `docker run` qui ouvre réellement l'accès.",
          },
          {
            label: "Forme JSON de `CMD`",
            value:
              "`CMD [\"node\", \"server.js\"]` (forme exec) lance le processus directement, sans shell intermédiaire. La forme shell `CMD node server.js` enveloppe dans `/bin/sh -c`, ce qui casse la transmission des signaux d'arrêt.",
          },
        ],
      },
    ],
  },
  {
    id: "instruction-from",
    title: "Instruction `FROM` : choisir sa base",
    level: 3,
    intro:
      "Tout part de `FROM` : bien choisir son image de base conditionne la taille, la sécurité et la maintenabilité.",
    blocks: [
      {
        kind: "text",
        text: "`FROM` définit l'OS et le runtime de départ ; préférez une image officielle, épinglée en version, et minimale.",
      },
      {
        kind: "fields",
        title: "Bien choisir sa base",
        fields: [          {
            label: "Images officielles",
            value:
              "Les images marquées « Official Image » sur Docker Hub (`node`, `python`, `nginx`, `postgres`) sont maintenues et auditées. En cas de doute, partez de celles-là plutôt que d'une image d'un inconnu.",
          },
          {
            label: "Épingler la version",
            value:
              "`FROM node:20-alpine` plutôt que `FROM node:latest` : `latest` évolue sans prévenir et casse la reproductibilité. Épinglez au minimum la version majeure du runtime.",
          },
          {
            label: "Variantes minimales",
            value:
              "`alpine` (quelques Mo, basé sur musl), `slim` (Debian allégé) : moins de paquets = moins de surface d'attaque et des `pull` plus rapides. Vérifiez juste la compatibilité (certaines compilations natives exigent glibc).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Partir de `FROM ubuntu` puis installer le runtime à la main avec `apt-get` : vous réinventez une image officielle en moins bien maintenue et bien plus lourde.",
          },
        ],
      },
    ],
  },
  {
    id: "instruction-run",
    title: "Instruction `RUN` : exécuter au build",
    level: 3,
    intro:
      "`RUN` exécute des commandes pendant la construction de l'image — c'est là qu'on installe les dépendances.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "RUN : regrouper et nettoyer dans la même couche",
        code: "RUN apt-get update && apt-get install -y --no-install-recommends \\\n    curl ca-certificates \\\n    && rm -rf /var/lib/apt/lists/*",
      },
      {
        kind: "text",
        text: "Chaque `RUN` crée une couche : regroupez les commandes liées avec `&&` et nettoyez dans la même instruction, sinon les fichiers « supprimés » restent dans les couches précédentes.",
      },
      {
        kind: "fields",
        title: "Maîtriser RUN",
        fields: [          {
            label: "Pourquoi le nettoyage compte",
            value:
              "Les couches sont additives : un `RUN rm` dans une couche ultérieure masque le fichier sans le supprimer des couches précédentes — l'image garde le poids. Seul un nettoyage dans la même couche que la création allège vraiment.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`RUN apt-get update` dans une couche puis `RUN apt-get install` dans la suivante : le cache peut réutiliser un `update` périmé et installer des paquets obsolètes, ou échouer. Toujours `update` + `install` dans le même `RUN`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférez `--no-install-recommends` avec `apt-get` pour éviter les paquets superflus, et fixez les versions des paquets critiques quand la reproductibilité l'exige.",
          },
        ],
      },
    ],
  },
  {
    id: "copy-vs-add",
    title: "`COPY` vs `ADD` : copier des fichiers",
    level: 3,
    intro:
      "Deux instructions pour amener des fichiers dans l'image — une seule à utiliser par défaut.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "COPY : simple et prévisible",
        code: "# Copie package.json et package-lock.json dans /app/\nCOPY package.json package-lock.json ./\n\n# Copie tout le contexte (filtré par .dockerignore)\nCOPY . .",
      },
      {
        kind: "text",
        text: "`COPY` copie des fichiers locaux, simplement ; `ADD` fait pareil mais avec des pouvoirs magiques (décompression auto, URLs distantes) qui créent des surprises.",
      },
      {
        kind: "fields",
        title: "Trancher entre COPY et ADD",
        fields: [          {
            label: "Pourquoi préférer COPY",
            value:
              "La documentation officielle recommande `COPY` par défaut : son comportement est transparent. `ADD` décompresse silencieusement les archives et télécharge des URLs sans vérification — deux sources de builds non reproductibles.",
          },
          {
            label: "Quand ADD se justifie",
            value:
              "Quasiment un seul cas : décompresser automatiquement une archive locale dans l'image. Pour télécharger un fichier distant, préférez `RUN curl` qui rend l'opération explicite et vérifiable.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`ADD https://example.com/outil.tar.gz /opt/` puis s'étonner que le build échoue quand l'URL change : le Dockerfile dépend désormais d'une ressource externe non versionnée.",
          },
        ],
      },
    ],
  },
  {
    id: "cmd-vs-entrypoint",
    title: "`CMD` vs `ENTRYPOINT` : que lance le conteneur",
    level: 3,
    intro:
      "Les deux instructions définissent le processus de démarrage — leur interaction est subtile mais essentielle.",
    blocks: [
      {
        kind: "text",
        text: "`ENTRYPOINT` définit le programme fixe du conteneur, `CMD` ses arguments par défaut : les arguments de `docker run` remplacent `CMD`, pas `ENTRYPOINT`.",
      },
      {
        kind: "fields",
        title: "Comprendre le duo",
        fields: [          {
            label: "Le cas simple (90 % des usages)",
            value:
              "Un seul `CMD [\"node\", \"server.js\"]` suffit. Le conteneur lance cette commande au démarrage, et `docker run mon-image autre-commande` permet de la remplacer pour du debug.",
          },
          {
            label: "Quand ajouter ENTRYPOINT",
            value:
              "Quand l'image est un « exécutable » : `ENTRYPOINT [\"pytest\"]` + `CMD [\"-v\"]` permet `docker run mon-image tests/unit` → exécute `pytest tests/unit`. Pratique pour des images-outils.",
          },
          {
            label: "Pourquoi la forme exec",
            value:
              "La forme JSON `[\"node\", \"server.js\"]` lance le processus en PID 1 directement. La forme shell l'enveloppe dans `/bin/sh` : le signal `SIGTERM` de `docker stop` n'atteint plus votre application, qui met 10 secondes à être tuée de force.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Définir à la fois `ENTRYPOINT` et `CMD` en forme shell puis ne pas comprendre pourquoi les arguments passés à `docker run` sont ignorés ou concaténés bizarrement.",
          },
        ],
      },
    ],
  },
  {
    id: "expose-env-workdir",
    title: "`EXPOSE`, `ENV`, `WORKDIR` : le trio de configuration",
    level: 3,
    intro:
      "Trois instructions simples qui rendent une image propre, configurable et prévisible.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Le trio en situation",
        code: "WORKDIR /app\nENV NODE_ENV=production PORT=3000\nEXPOSE 3000",
      },
      {
        kind: "fields",
        title: "Chaque instruction",
        fields: [
          {
            label: "`WORKDIR /app`",
            value:
              "Définit le dossier de travail : les `COPY`, `RUN` et `CMD` suivants s'y exécutent. Crée le dossier s'il n'existe pas. Bien plus propre que des chemins absolus partout ou que `RUN cd …` (qui ne persiste pas d'une couche à l'autre).",
          },
          {
            label: "`ENV`",
            value:
              "Définit des variables d'environnement persistantes dans l'image et ses conteneurs. Idéal pour les valeurs par défaut (`NODE_ENV=production`). Ne jamais y mettre de secrets : ils resteraient lisibles dans l'historique de l'image.",
          },
          {
            label: "`EXPOSE`",
            value:
              "Déclare le port d'écoute à titre documentaire et pour l'outillage (Docker Desktop l'affiche, `docker run -P` s'en sert). Ne publie aucun port à lui seul : la publication reste le rôle de `-p`.",
          },
          {
            label: "Surcharge au runtime",
            value:
              "Toute variable `ENV` peut être écrasée au lancement : `docker run -e PORT=4000 mon-image`. C'est le mécanisme standard pour adapter la même image à plusieurs environnements.",
          },
        ],
      },
    ],
  },
  {
    id: "dockerignore",
    title: "Le `.dockerignore` : ne pas embarquer n'importe quoi",
    level: 3,
    intro:
      "Le garde-fou qui évite d'envoyer vos secrets et vos gigaoctets inutiles dans le build.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Un .dockerignore typique",
        code: "node_modules\n.git\n.env\n*.log\ndist\ncoverage\n.DS_Store",
      },
      {
        kind: "text",
        text: "Le `.dockerignore` exclut des fichiers du contexte de build : sans lui, `COPY . .` embarque tout, y compris ce qui ne devrait jamais quitter votre machine.",
      },
      {
        kind: "fields",
        title: "Pourquoi c'est indispensable",
        fields: [          {
            label: "Trois raisons",
            value:
              "Sécurité : un `.env` copié par accident expose vos secrets dans l'image. Poids : `node_modules` local ou `.git` gonflent le contexte pour rien. Cache : un fichier qui change à chaque build (logs) invalide inutilement le cache des couches.",
          },
          {
            label: "Le contexte de build",
            value:
              "Quand vous lancez `docker build .`, TOUT le dossier est envoyé au démon avant même la première instruction. Un contexte de 2 Go rend chaque build lent, même si le Dockerfile n'utilise qu'une poignée de fichiers.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Copier `node_modules` de sa machine (compilé pour macOS) dans une image Linux : l'application plante avec des erreurs de binaires incompatibles. Le `.dockerignore` + réinstallation dans l'image évite cela.",
          },
        ],
      },
    ],
  },
  {
    id: "docker-build",
    title: "`docker build` : construire une image",
    level: 3,
    intro:
      "Transformer un Dockerfile en image taguée, prête à être lancée et partagée.",
    blocks: [
      {
        kind: "command",
        label: "Construire une image depuis le dossier courant",
        command: "docker build -t mon-app:1.0 .",
        why: "`-t` (tag) nomme l'image `mon-app` en version `1.0` — sans tag explicite, vos builds successifs s'écrasent sous `latest` sans traçabilité. Le `.` final est le contexte : le dossier envoyé au démon.",
        verify: "`docker images` affiche désormais `mon-app` avec le tag `1.0`.",
      },
      {
        kind: "text",
        text: "Le build exécute chaque instruction du Dockerfile dans l'ordre, met en cache chaque couche, et produit une image immuable identifiée par son tag.",
      },
      {
        kind: "fields",
        title: "Comprendre le build",
        fields: [          {
            label: "Le tag, c'est la version",
            value:
              "Adoptez une convention : `1.0`, `1.0.3`, ou le hash de commit Git. `docker build -t mon-app:latest .` seul est un anti-pattern en équipe : impossible de savoir ce que contient « latest ».",
          },
          {
            label: "BuildKit",
            value:
              "Le moteur de build moderne (activé par défaut depuis Docker 23) : builds parallélisés, meilleur cache, secrets de build sécurisés. Si un vieux tutoriel parle de `DOCKER_BUILDKIT=1`, c'est aujourd'hui le comportement standard.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Lancer `docker build` depuis le mauvais dossier : le `.` définit le contexte ET l'emplacement du Dockerfile par défaut. Un Dockerfile introuvable ou un contexte vide = erreur immédiate.",
          },
        ],
      },
    ],
  },
  {
    id: "cache-des-couches",
    title: "Le cache des couches : des builds en secondes",
    level: 3,
    intro:
      "Le mécanisme qui rend les builds rapides — et les pièges qui le rendent traître.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Lire un build : CACHED vs exécuté",
        code: "docker build -t mon-app:1.0 .\n# [+] Building...\n# [2/5] WORKDIR /app\n# [3/5] COPY package.json package-lock.json ./\n# [4/5] RUN npm ci --only=production\n# [5/5] COPY . .",
      },
      {
        kind: "text",
        text: "Docker réutilise une couche si l'instruction et ses fichiers d'entrée sont inchangés ; dès qu'une couche change, toutes les suivantes sont reconstruites.",
      },
      {
        kind: "fields",
        title: "Maîtriser le cache",
        fields: [          {
            label: "Pourquoi l'ordre compte",
            value:
              "Mettez en premier ce qui change rarement (installation des dépendances), en dernier ce qui change souvent (le code). L'inverse invalide le cache à chaque build et transforme 10 secondes en 5 minutes.",
          },
          {
            label: "Invalider volontairement",
            value:
              "`docker build --no-cache -t mon-app:1.0 .` force une reconstruction totale. Utile quand on soupçonne un cache périmé (rare) ou pour un build de release propre.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`COPY . .` en première instruction : chaque modification d'un fichier, même un README, invalide tout le cache y compris la réinstallation des dépendances. D'où le `COPY` en deux temps vu plus haut.",
          },
          {
            label: "Bonne pratique",
            value:
              "En CI, activez le cache distant (`--cache-from`) pour réutiliser les couches des builds précédents entre les exécutions du pipeline.",
          },
        ],
      },
    ],
  },
  {
    id: "multi-stage-builds",
    title: "Les builds multi-étapes : des images maigres",
    level: 3,
    intro:
      "La technique professionnelle pour des images de production petites et sans outils de compilation.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Build multi-étapes : compiler puis ne garder que le résultat",
        code: "# Étape 1 : construction (image complète avec toolchain)\nFROM node:20 AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Étape 2 : exécution (image minimale, sans les outils de build)\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=build /app/dist ./dist\nCOPY package*.json ./\nRUN npm ci --only=production\nCMD [\"node\", \"dist/server.js\"]",
      },
      {
        kind: "text",
        text: "Plusieurs `FROM` dans un même Dockerfile : chaque étape est un environnement temporaire, et seule la dernière devient l'image finale — on n'y copie que l'essentiel via `COPY --from=`.",
      },
      {
        kind: "text",
        text: "Langages compilés (Go, Rust, Java), frontend avec étape de build (Vite, Next), toute image de production. Pour un script Python simple, c'est superflu.",
      },
      {
        kind: "fields",
        title: "Comprendre le multi-étapes",
        fields: [          {
            label: "Pourquoi c'est puissant",
            value:
              "L'étape de build peut contenir compilateurs, SDK et dépendances de dev (lourds) ; l'image finale ne contient que le runtime et les artefacts compilés. Résultat typique : de 1 Go à 150 Mo.",
          },
          {
            label: "Nommage des étapes",
            value:
              "`AS build` nomme l'étape pour y faire référence. Sans nom, on utilise l'index (`--from=0`), moins lisible. Nommez toujours vos étapes.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier que chaque étape repart de zéro : un fichier créé dans l'étape `build` n'existe pas dans l'étape finale sans `COPY --from=build` explicite.",
          },
        ],
      },
    ],
  },
  {
    id: "volumes-nommes",
    title: "Les volumes nommés : persister les données",
    level: 3,
    intro:
      "Le mécanisme officiel pour que les données survivent à la mort des conteneurs.",
    blocks: [
      {
        kind: "command",
        label: "Créer et utiliser un volume nommé",
        command: "docker run -d --name ma-bdd -v donnees:/var/lib/postgresql/data postgres:16",
        why: "`-v donnees:/var/lib/postgresql/data` monte le volume nommé `donnees` sur le dossier où Postgres stocke ses fichiers. Docker crée le volume s'il n'existe pas. Les données vivent désormais hors du conteneur.",
        verify: "`docker volume ls` affiche `donnees`. Supprimez puis recréez le conteneur avec le même volume : les données sont toujours là.",
      },
      {
        kind: "text",
        text: "Un volume nommé est un espace de stockage géré par Docker, indépendant du cycle de vie des conteneurs.",
      },
      {
        kind: "text",
        text: "Bases de données, files d'attente, tout état qui doit survivre aux redéploiements. C'est LE choix par défaut pour la persistance en production.",
      },
      {
        kind: "fields",
        title: "Comprendre les volumes",
        fields: [          {
            label: "Où sont les données",
            value:
              "Docker les stocke dans son espace interne (`/var/lib/docker/volumes` sur Linux). Vous n'avez pas à connaître le chemin : Docker gère tout, y compris les permissions.",
          },
          {
            label: "Cycle de vie",
            value:
              "`docker rm` ne supprime PAS les volumes : ils survivent. Pour tout nettoyer, `docker volume prune` (destructif : ne le lancez qu'en connaissance de cause).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Perdre des données en supprimant un volume par erreur avec `prune` : les volumes anonymes (créés sans nom) sont particulièrement faciles à confondre. Nommez toujours vos volumes importants.",
          },
        ],
      },
    ],
  },
  {
    id: "bind-mounts",
    title: "Les bind mounts : synchroniser avec l'hôte",
    level: 3,
    intro:
      "Monter un dossier de votre machine dans le conteneur : l'outil roi du développement local.",
    blocks: [
      {
        kind: "command",
        label: "Monter le dossier courant dans le conteneur",
        command: "docker run -d -p 3000:3000 -v $(pwd):/app --name mon-dev mon-app:dev",
        why: "`-v $(pwd):/app` monte le dossier courant de l'hôte sur `/app` du conteneur : chaque sauvegarde dans votre éditeur est immédiatement visible dans le conteneur, sans rebuild. `$(pwd)` donne le chemin absolu requis.",
        verify: "Modifiez un fichier localement, rechargez l'application : le changement est pris en compte (si l'app supporte le rechargement à chaud).",
      },
      {
        kind: "text",
        text: "Un bind mount relie un chemin précis de l'hôte à un chemin du conteneur, en lecture-écriture et en temps réel.",
      },
      {
        kind: "text",
        text: "Développement local : édition du code sur l'hôte, exécution dans le conteneur. Jamais en production : cela casse la portabilité (l'image dépend d'un dossier local).",
      },
      {
        kind: "fields",
        title: "Comprendre les bind mounts",
        fields: [          {
            label: "Lecture seule",
            value:
              "Ajoutez `:ro` pour un montage en lecture seule (`-v $(pwd)/config:/app/config:ro`) : le conteneur ne peut pas modifier vos fichiers, protection utile contre les bugs.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Problèmes de permissions : les fichiers créés dans le conteneur appartiennent à `root` sur l'hôte. Sur Linux, alignez les UID ou travaillez avec un utilisateur non-root dans l'image.",
          },
        ],
      },
    ],
  },
  {
    id: "volumes-vs-bind-mounts",
    title: "Volumes vs bind mounts : que choisir",
    level: 3,
    intro:
      "Les deux montent des données dans un conteneur, pour des besoins opposés.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "Volume nommé", "Bind mount"],
        rows: [
          ["Géré par", "Docker", "Vous (chemin explicite)"],
          ["Portabilité", "Totale : suit l'image partout", "Lié à la machine hôte"],
          ["Cas d'usage", "Bases de données, persistance prod", "Code source en développement"],
          ["Performance", "Optimale (pilote Docker)", "Variable selon l'OS (plus lent sur Mac/Windows)"],
          ["Sauvegarde", "`docker volume` + backup du dossier Docker", "Vos outils habituels (c'est un dossier normal)"],
        ],
      },
      {
        kind: "text",
        text: "Règle simple : en développement, bind mount pour le code (édition instantanée) ; partout ailleurs, volumes nommés pour les données. Un `docker-compose.yml` bien conçu utilise souvent les deux simultanément : le code en bind mount, la base en volume.",
      },
    ],
  },
  {
    id: "reseaux-docker",
    title: "Les réseaux : faire dialoguer les conteneurs",
    level: 3,
    intro:
      "Par défaut les conteneurs sont isolés réseau ; les réseaux Docker créent des ponts contrôlés entre eux.",
    blocks: [
      {
        kind: "diagram",
        title: "Un réseau bridge utilisateur : les conteneurs se trouvent par leur nom",
        lines: [
          "         ┌───────────── mon-reseau ─────────────┐",
          "         │                                      │",
          "    ┌────┴─────┐                          ┌─────┴──────┐",
          "    │  mon-app │ ── appelle ────────────► │   ma-bdd   │",
          "    │  (web)   │   http://ma-bdd:5432     │ (postgres) │",
          "    └────┬─────┘                          └─────┬──────┘",
          "         │                                      │",
          "         └───────────── mon-reseau ─────────────┘",
          "  Sur un réseau personnalisé, chaque conteneur résout les autres",
          "  par leur NOM : pas d'IP à gérer, pas de configuration manuelle.",
        ],
      },
      {
        kind: "text",
        text: "Un réseau Docker est un segment isolé où les conteneurs communiquent entre eux par leur nom, sans exposer leurs ports sur l'hôte.",
      },
      {
        kind: "fields",
        title: "Comprendre les réseaux Docker",
        fields: [          {
            label: "Pourquoi un réseau personnalisé",
            value:
              "Le réseau `bridge` par défaut ne fournit pas la résolution DNS par nom. Créez toujours votre réseau (`docker network create`) : vos services se trouvent via `http://nom-du-service:port`, simplement et sans IP en dur.",
          },
          {
            label: "Ports internes vs publiés",
            value:
              "Deux conteneurs sur le même réseau communiquent via les ports INTERNES (5432 pour Postgres) sans aucun `-p`. `-p` ne sert qu'à exposer vers l'extérieur (votre navigateur, le monde).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Depuis l'application, appeler `localhost:5432` pour joindre la base : `localhost` dans le conteneur désigne le conteneur lui-même, pas l'hôte ni les autres conteneurs. Utilisez le nom du service.",
          },
        ],
      },
    ],
  },
  {
    id: "creer-reseau",
    title: "Créer et utiliser un réseau",
    level: 3,
    intro:
      "Les trois commandes réseau qui couvrent 95 % des besoins.",
    blocks: [
      {
        kind: "command",
        label: "Créer un réseau dédié",
        command: "docker network create mon-reseau",
        why: "Crée un réseau bridge isolé avec DNS intégré. Tous les conteneurs branchés dessus se résolvent par leur nom. Un réseau par projet évite les interférences.",
      },
      {
        kind: "command",
        label: "Lancer deux conteneurs sur le même réseau",
        command: "docker run -d --name ma-bdd --network mon-reseau postgres:16",
        why: "`--network mon-reseau` branche le conteneur au réseau. Lancez ensuite l'application avec le même `--network` : elle joindra la base via le nom d'hôte `ma-bdd`, sans publier le port 5432.",
        verify: "`docker exec -it mon-app ping ma-bdd` répond : la résolution par nom fonctionne.",
      },
      {
        kind: "command",
        label: "Lister les réseaux existants",
        command: "docker network ls",
        why: "Affiche les réseaux avec leur pilote. Vous y verrez `bridge` (défaut), `host` et `none` (réseaux système, à ne pas supprimer) plus vos réseaux personnalisés.",
      },
    ],
  },
  {
    id: "compose-introduction",
    title: "Docker Compose : l'orchestration locale",
    level: 3,
    intro:
      "Quand un `docker run` ne suffit plus : décrire toute une stack multi-services dans un seul fichier.",
    blocks: [
      {
        kind: "text",
        text: "Docker Compose est l'outil officiel pour définir et piloter des applications multi-conteneurs. Au lieu d'enchaîner de longues commandes `docker run` (réseau à créer, volumes à monter, variables à passer), vous décrivez l'ensemble dans un fichier `compose.yaml` : une commande (`docker compose up`) démarre tout, dans le bon ordre, sur un réseau dédié créé automatiquement.",
      },
      {
        kind: "text",
        text: "Compose transforme une série de `docker run` en un fichier déclaratif versionnable : la stack entière devient reproductible en une commande.",
      },
      {
        kind: "text",
        text: "Une application réelle = app + base + cache + reverse proxy. Retenir et retaper 4 commandes `docker run` avec leurs options est fragile ; un fichier les rend explicites, partageables et relançables à l'identique.",
      },
      {
        kind: "text",
        text: "Développement local multi-services, environnements de test, petites productions mono-machine. Pour du multi-machines ou de l'auto-scaling, c'est Kubernetes qui prend le relais.",
      },
      {
        kind: "fields",
        title: "Comprendre Compose",
        fields: [
          {
            label: "`docker compose` vs `docker-compose`",
            value:
              "La commande moderne est `docker compose` (espace, plugin intégré au CLI). `docker-compose` (tiret) est l'ancienne version Python, obsolète : si un tutoriel l'utilise, il est daté.",
          },
        ],
      },
    ],
  },
  {
    id: "fichier-compose",
    title: "Le fichier Compose : anatomie",
    level: 3,
    intro:
      "Lire et écrire un `compose.yaml` : services, images, ports, volumes, variables.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "compose.yaml : une stack web + base de données",
        code: "services:\n  web:\n    build: .\n    ports:\n      - \"8080:3000\"\n    environment:\n      DATABASE_URL: postgres://app:example@db:5432/appdb\n    depends_on:\n      - db\n  db:\n    image: postgres:16\n    volumes:\n      - donnees:/var/lib/postgresql/data\n    environment:\n      POSTGRES_USER: app\n      POSTGRES_PASSWORD: example\n      POSTGRES_DB: appdb\nvolumes:\n  donnees:",
      },
      {
        kind: "fields",
        title: "Lecture ligne par ligne",
        fields: [
          {
            label: "`services:`",
            value:
              "Chaque service = un conteneur. Ici `web` (construit depuis le Dockerfile local via `build: .`) et `db` (image existante). Compose crée automatiquement un réseau où `web` joint `db` par son nom.",
          },
          {
            label: "`ports: - \"8080:3000\"`",
            value:
              "Équivalent du `-p 8080:3000` de `docker run`. Les guillemets autour de `\"8080:3000\"` sont une bonne habitude YAML (évite les interprétations surprises).",
          },
          {
            label: "`depends_on`",
            value:
              "Démarre `db` avant `web`. Attention, subtilité célèbre : cela garantit l'ordre de démarrage, PAS que la base est prête à accepter des connexions — voir la section d'erreur dédiée.",
          },
          {
            label: "`volumes:` (bas du fichier)",
            value:
              "Déclare les volumes nommés utilisés par les services. `donnees` persiste les fichiers Postgres entre les `down`/`up`.",
          },
          {
            label: "Variables d'environnement",
            value:
              "La clé `environment` injecte les variables. Pour les secrets réels, ne les écrivez jamais en clair dans le fichier versionné : utilisez un fichier `.env` local (non commité) ou des secrets gérés.",
          },
        ],
      },
    ],
  },
  {
    id: "compose-up-down",
    title: "`compose up` / `down` : piloter la stack",
    level: 3,
    intro:
      "Les quatre commandes Compose qui remplacent une douzaine de `docker run`.",
    blocks: [
      {
        kind: "command",
        label: "Démarrer toute la stack en arrière-plan",
        command: "docker compose up -d",
        why: "Lit `compose.yaml`, crée le réseau, les volumes, construit les images si nécessaire (`build:`), puis démarre les services dans l'ordre des dépendances. `-d` rend la main au terminal.",
        verify: "`docker compose ps` montre les services à l'état `running`.",
      },
      {
        kind: "command",
        label: "Voir l'état des services",
        command: "docker compose ps",
        why: "L'équivalent de `docker ps` limité à votre projet Compose : nom des services, état, ports publiés. Le réflexe pour vérifier que tout est levé.",
      },
      {
        kind: "command",
        label: "Voir les logs de toute la stack",
        command: "docker compose logs -f",
        why: "Agrège les logs de tous les services avec un préfixe par service. `-f` suit en temps réel. Pour un seul service : `docker compose logs -f db`.",
      },
      {
        kind: "command",
        label: "Tout arrêter et nettoyer",
        command: "docker compose down",
        why: "Arrête les conteneurs, les supprime, ainsi que le réseau créé. Les volumes nommés sont CONSERVÉS par défaut (vos données survivent) ; ajoutez `-v` pour tout raser, volumes inclus — destructif.",
      },
      {
        kind: "text",
        text: "`up` = construire + créer + démarrer ; `down` = arrêter + supprimer (réseau et conteneurs, pas les volumes).",
      },
      {
        kind: "fields",
        title: "Le cycle de vie Compose",
        fields: [          {
            label: "Reconstruire après modification",
            value:
              "`docker compose up -d --build` force la reconstruction des images avant de redémarrer. Sans `--build`, Compose réutilise l'image existante même si le Dockerfile a changé.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Modifier le code, relancer `docker compose up -d`, et ne rien voir changer : l'image n'a pas été reconstruite. Pensez `--build`, ou utilisez un bind mount en développement.",
          },
        ],
      },
    ],
  },
  {
    id: "registres",
    title: "Les registres : Docker Hub et au-delà",
    level: 3,
    intro:
      "Où vivent les images : comprendre les registres publics et privés.",
    blocks: [
      {
        kind: "text",
        text: "Un registre est un serveur qui stocke et distribue les images ; `docker pull` télécharge depuis un registre, `docker push` y publie.",
      },
      {
        kind: "fields",
        title: "Comprendre les registres",
        fields: [          {
            label: "Docker Hub",
            value:
              "Le registre public par défaut (`docker.io`). Héberge les images officielles et des millions d'images communautaires. Compte gratuit avec dépôts publics illimités ; les pulls anonymes sont soumis à des quotas.",
          },
          {
            label: "Alternatives courantes",
            value:
              "GHCR (`ghcr.io`, lié à GitHub, pratique pour les projets open source), les registres des clouds (ECR d'AWS, Artifact Registry de GCP, ACR d'Azure), ou un registre auto-hébergé pour un usage interne.",
          },
          {
            label: "Nom d'image qualifié",
            value:
              "`ghcr.io/mon-org/mon-app:1.0` = registre + organisation + image + tag. Sans préfixe de registre, Docker suppose Docker Hub. Pour `push` vers un registre privé, le nom doit inclure son adresse.",
          },
          {
            label: "Pourquoi ne pas tout mettre sur Hub",
            value:
              "Le code propriétaire et les images contenant des secrets n'ont rien à faire sur un registre public. Règle : public pour l'open source, privé pour le reste.",
          },
        ],
      },
    ],
  },
  {
    id: "publier-image",
    title: "Publier une image : tag, login, push",
    level: 3,
    intro:
      "Partager votre image pour qu'une autre machine (ou votre serveur) puisse la récupérer.",
    blocks: [
      {
        kind: "command",
        label: "S'authentifier au registre",
        command: "docker login",
        why: "Demande votre identifiant et mot de passe (ou token d'accès, recommandé) et stocke les identifiants localement. Requis avant tout `push` vers vos dépôts privés, et pour dépasser les quotas anonymes de Docker Hub.",
      },
      {
        kind: "command",
        label: "Taguer l'image pour le registre cible",
        command: "docker tag mon-app:1.0 monpseudo/mon-app:1.0",
        why: "`tag` crée un alias : la même image devient référençable sous le nom attendu par le registre (`monpseudo/mon-app`). Sans ce nommage, `push` ne sait pas où envoyer l'image.",
      },
      {
        kind: "command",
        label: "Publier l'image",
        command: "docker push monpseudo/mon-app:1.0",
        why: "Envoie les couches manquantes vers le registre (seules les couches absentes sont transférées, grâce au partage des couches). L'image devient récupérable depuis n'importe quelle machine avec `docker pull`.",
        verify: "Le dépôt apparaît sur hub.docker.com avec le tag `1.0`.",
      },
      {
        kind: "command",
        label: "Récupérer une image sur une autre machine",
        command: "docker pull monpseudo/mon-app:1.0",
        why: "Télécharge l'image depuis le registre. `docker run` le fait implicitement si l'image est absente, mais un `pull` explicite permet de forcer la mise à jour vers la dernière version d'un tag.",
      },
    ],
  },
  {
    id: "images-officielles-et-tags",
    title: "Images officielles et stratégie de tags",
    level: 3,
    intro:
      "Choisir des images de confiance et des tags qui ne vous trahiront pas dans six mois.",
    blocks: [
      {
        kind: "text",
        text: "Préférez les images officielles épinglées à une version explicite ; `latest` est un alias mouvant, pas une version.",
      },
      {
        kind: "fields",
        title: "Choisir ses images comme un pro",
        fields: [          {
            label: "Images officielles",
            value:
              "Badge « Official Image » sur Docker Hub : maintenues par Docker en partenariat avec les éditeurs, scannées pour les vulnérabilités, documentées. Le point de départ par défaut pour `node`, `python`, `postgres`, `redis`, `nginx`…",
          },
          {
            label: "Épingler intelligemment",
            value:
              "`postgres:16` = dernière 16.x (correctifs inclus, pas de changement majeur surprise). `postgres:16.4` = version exacte (reproductibilité maximale). `postgres:latest` = roulette russe à chaque pull.",
          },
          {
            label: "Vérifier avant d'utiliser",
            value:
              "Sur la page Docker Hub d'une image : date de dernière mise à jour, nombre de pulls, lien vers le Dockerfile source. Une image non mise à jour depuis deux ans est un signal d'alarme.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser une image trouvée au hasard (`quelquun/mon-outil`) parce qu'elle « marche » : contenu non audité, potentiellement malveillant ou abandonné. Vérifiez toujours la source.",
          },
        ],
      },
    ],
  },
  {
    id: "images-legeres",
    title: "Des images légères : alpine et slim",
    level: 3,
    intro:
      "Diviser par cinq le poids de vos images en choisissant la bonne variante de base.",
    blocks: [
      {
        kind: "table",
        headers: ["Variante", "Base", "Ordre de grandeur", "À savoir"],
        rows: [
          ["`node:20`", "Debian complet", "~1 Go", "Tous les outils inclus, pratique mais lourd"],
          ["`node:20-slim`", "Debian allégé", "~200 Mo", "Le compromis le plus courant"],
          ["`node:20-alpine`", "Alpine Linux (musl)", "~170 Mo", "Minimaliste ; vérifier la compatibilité des binaires natifs"],
        ],
      },
      {
        kind: "text",
        text: "Chaque mégaoctet d'image se paie en temps de `pull`, d'espace disque et de surface d'attaque : le minimalisme est une qualité.",
      },
      {
        kind: "fields",
        title: "Comprendre l'enjeu du poids",
        fields: [          {
            label: "Pourquoi alpine est si léger",
            value:
              "Alpine Linux utilise `musl` au lieu de `glibc` et n'embarque que l'essentiel : l'image de base fait ~5 Mo. La contrepartie : certains paquets compilés pour `glibc` (quelques modules natifs Node/Python) peuvent dysfonctionner — à tester.",
          },
          {
            label: "La règle pratique",
            value:
              "Commencez par `slim` (compatible, raisonnablement léger). Passez à `alpine` quand vous maîtrisez et que le gain compte (CI rapide, déploiements fréquents, flotte importante).",
          },
          {
            label: "Bonne pratique",
            value:
              "Combinez variante légère + build multi-étapes + `.dockerignore` : c'est le trio qui transforme une image de 1,2 Go en 150 Mo.",
          },
        ],
      },
    ],
  },
  {
    id: "securite-non-root",
    title: "Sécurité : ne pas tourner en root",
    level: 3,
    intro:
      "Par défaut un processus dans un conteneur tourne en root : c'est le premier durcissement à appliquer.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Créer un utilisateur dédié et l'utiliser",
        code: "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production && \\\n    addgroup -S appgroup && adduser -S appuser -G appgroup\nCOPY --chown=appuser:appgroup . .\nUSER appuser\nCMD [\"node\", \"server.js\"]",
      },
      {
        kind: "text",
        text: "Sans instruction `USER`, le processus du conteneur est root : en cas de faille (évasion de conteneur), l'attaquant hérite de privilèges maximaux.",
      },
      {
        kind: "fields",
        title: "Comprendre le risque",
        fields: [          {
            label: "Pourquoi c'est le défaut",
            value:
              "Historique et simplicité : root évite les problèmes de permissions pendant le build. Mais en production, le principe du moindre privilège s'applique aussi aux conteneurs.",
          },
          {
            label: "`COPY --chown`",
            value:
              "Donne la propriété des fichiers copiés au nouvel utilisateur, sinon `appuser` ne pourrait pas lire le code. Alternative : `RUN chown` après coup (crée une couche supplémentaire, moins élégant).",
          },
          {
            label: "Images qui le font déjà",
            value:
              "Beaucoup d'images officielles fournissent un utilisateur non-root (`node`, `postgres`…) : vérifiez la documentation de l'image avant de réinventer.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Ajouter `USER appuser` AVANT les `RUN` d'installation : l'utilisateur non privilégié ne peut plus installer de paquets et le build échoue. L'ordre compte : installer en root, basculer en non-root à la fin.",
          },
        ],
      },
    ],
  },
  {
    id: "secrets",
    title: "Les secrets : jamais dans l'image",
    level: 3,
    intro:
      "Mots de passe, clés API, certificats : la règle d'or et les mécanismes prévus pour.",
    blocks: [
      {
        kind: "text",
        text: "Un secret écrit dans un Dockerfile ou un `ENV` reste lisible à vie dans l'historique de l'image : injectez-le au runtime, jamais au build.",
      },
      {
        kind: "fields",
        title: "Gérer les secrets proprement",
        fields: [          {
            label: "Pourquoi c'est irréversible",
            value:
              "Même supprimé dans une couche ultérieure, le secret persiste dans les couches précédentes. Et une image poussée sur un registre est potentiellement copiée partout : on ne « rappelle » pas une image publiée.",
          },
          {
            label: "Au runtime : variables d'environnement",
            value:
              "`docker run -e API_KEY=...` ou la clé `environment` de Compose (avec un fichier `.env` local non versionné). Simple et suffisant pour la plupart des cas.",
          },
          {
            label: "Au build : secrets BuildKit",
            value:
              "Si le build a besoin d'un token (accès à un registre privé npm), utilisez le montage de secret BuildKit (`RUN --mount=type=secret`) : le secret est disponible pendant l'instruction sans être persisté dans la couche.",
          },
          {
            label: "En production",
            value:
              "Gestionnaires de secrets dédiés (Vault, AWS Secrets Manager, variables chiffrées de la plateforme). Le principe reste identique : le secret arrive au conteneur au démarrage, jamais gravé dans l'image.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Commiter un `compose.yaml` contenant `POSTGRES_PASSWORD: supersecret` : le secret finit dans l'historique Git, visible pour toujours. Externalisez dans `.env` (ignoré par Git) dès le premier jour.",
          },
        ],
      },
    ],
  },
  {
    id: "healthcheck",
    title: "Les healthchecks : savoir si ça va vraiment",
    level: 3,
    intro:
      "Un conteneur « démarré » n'est pas un conteneur « prêt » : les healthchecks comblent ce fossé.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Déclarer un healthcheck dans le Dockerfile",
        code: "HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\\n  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1",
      },
      {
        kind: "text",
        text: "Un healthcheck est une commande testée périodiquement par Docker : son succès ou échec fait passer le conteneur à l'état `healthy` ou `unhealthy`.",
      },
      {
        kind: "fields",
        title: "Comprendre les healthchecks",
        fields: [          {
            label: "Pourquoi c'est nécessaire",
            value:
              "Une application peut mettre 20 secondes à charger ses données avant de répondre. Sans healthcheck, Docker la croit « up » dès le lancement du processus — et un orchestrateur peut y envoyer du trafic trop tôt.",
          },
          {
            label: "Les paramètres",
            value:
              "`--interval` : fréquence du test ; `--timeout` : délai max par test ; `--retries` : échecs consécutifs avant `unhealthy` ; `--start-period` : grâce accordée au démarrage (utile pour les démarrages lents).",
          },
          {
            label: "Lien avec depends_on",
            value:
              "Dans Compose, `depends_on` avec `condition: service_healthy` attend réellement que la dépendance soit prête — la solution au problème classique « l'app démarre avant la base ».",
          },
          {
            label: "Voir l'état",
            value:
              "`docker ps` affiche `(healthy)` ou `(unhealthy)` dans la colonne STATUS, et `docker inspect` détaille l'historique des derniers checks.",
          },
        ],
      },
    ],
  },
  {
    id: "limiter-ressources",
    title: "Limiter les ressources : mémoire et CPU",
    level: 3,
    intro:
      "Empêcher un conteneur fou d'affamer ses voisins : les garde-fous mémoire et CPU.",
    blocks: [
      {
        kind: "command",
        label: "Plafonner la mémoire d'un conteneur",
        command: "docker run -d --memory=512m --name app-limitee mon-app:1.0",
        why: "`--memory=512m` fixe un plafond : si le processus dépasse 512 Mo, le noyau le tue (OOM kill) au lieu de laisser la machine entière manquer de RAM. Indispensable sur un hôte partagé.",
        verify: "`docker stats` affiche la limite dans la colonne `MEM USAGE / LIMIT`.",
      },
      {
        kind: "command",
        label: "Observer la consommation en direct",
        command: "docker stats",
        why: "Affiche en temps réel CPU, mémoire, réseau et I/O disque de chaque conteneur. Le premier outil pour diagnostiquer « quel conteneur mange mes ressources ».",
      },
      {
        kind: "text",
        text: "Sans limite, un conteneur peut consommer toute la RAM de l'hôte : fixez toujours un plafond mémoire en production.",
      },
      {
        kind: "fields",
        title: "Comprendre les limites",
        fields: [          {
            label: "`--memory` vs `--cpus`",
            value:
              "La mémoire est une limite dure (dépassement = mort du processus). Le CPU est une part relative (`--cpus=1.5`) : le conteneur est ralenti, pas tué. Les deux se combinent.",
          },
          {
            label: "Le code 137",
            value:
              "Un conteneur en `Exited (137)` a presque toujours été tué par manque de mémoire (128 + signal 9 = SIGKILL). Avant d'augmenter la limite, cherchez la fuite mémoire.",
          },
          {
            label: "Bonne pratique",
            value:
              "Dimensionnez d'après `docker stats` en charge réelle, avec une marge. En Compose, les mêmes limites se déclarent sous `deploy.resources.limits`.",
          },
        ],
      },
    ],
  },
  {
    id: "debugger-docker",
    title: "Déboguer comme un pro",
    level: 3,
    intro:
      "La méthode systématique quand un conteneur refuse de coopérer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Le conteneur tourne-t-il ?",
            detail:
              "`docker ps -a` : cherchez son STATUS. `Exited` avec un code non nul = le processus a planté au démarrage. `Up` mais inaccessible = problème réseau ou applicatif.",
          },
          {
            title: "Que disent les logs ?",
            detail:
              "`docker logs --tail 100 <nom>` : 90 % des diagnostics s'arrêtent ici — stack trace, port déjà utilisé, variable manquante, connexion refusée à la base.",
          },
          {
            title: "La configuration est-elle bonne ?",
            detail:
              "`docker inspect <nom>` : JSON complet de la configuration réelle (ports, volumes, variables, réseau). Vérifiez que ce que vous croyez avoir lancé est ce qui tourne.",
          },
          {
            title: "Entrer pour investiguer",
            detail:
              "`docker exec -it <nom> sh` : vérifier les fichiers, tester la connectivité (`wget`, `ping`), lire les variables avec `env`. Si l'image est `distroless` (sans shell), déboguez depuis un conteneur voisin sur le même réseau.",
          },
          {
            title: "Le problème vient-il de l'image ?",
            detail:
              "Reconstruisez avec `--no-cache` pour écarter un cache périmé, ou lancez l'image de base seule pour isoler : si `nginx` pur fonctionne mais pas votre image, le problème est dans vos couches.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or du debugging Docker : isolez les couches du problème dans l'ordre — conteneur (tourne-t-il ?), configuration (`inspect`), application (logs), réseau (connectivité), image (rebuild). Sauter directement à « je reconstruis tout » fait perdre le diagnostic.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // ERREURS FRÉQUENTES
  // ------------------------------------------------------------------
  {
    id: "erreur-daemon-injoignable",
    title: "Erreur : impossible de joindre le démon",
    level: 3,
    intro:
      "Le message le plus célèbre de Docker — et le plus simple à résoudre quand on sait ce qu'il signifie.",
    blocks: [
      {
        kind: "fields",
        title: "« Cannot connect to the Docker daemon »",
        fields: [
          {
            label: "Le problème",
            value:
              "Le CLI fonctionne mais le démon (`dockerd`) ne répond pas : `docker ps` échoue avec `Cannot connect to the Docker daemon at unix:///var/run/docker.sock`.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Sur Desktop : l'application n'est pas lancée. Sur Linux : le service n'est pas démarré (ou l'utilisateur n'a pas les droits sur le socket — voir l'erreur « permission refusée »).",
          },
          {
            label: "La solution",
            value:
              "Desktop : lancez Docker Desktop et attendez l'icône « running ». Linux : `sudo systemctl start docker` (et `sudo systemctl enable docker` pour le démarrage automatique).",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne confondez pas « commande inconnue » (CLI mal installé) et « démon injoignable » (moteur éteint) : le diagnostic et le remède sont différents.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-port-deja-alloue",
    title: "Erreur : port déjà alloué",
    level: 3,
    intro:
      "Deux conteneurs veulent le même port de l'hôte : un seul gagne.",
    blocks: [
      {
        kind: "fields",
        title: "« Bind for 0.0.0.0:8080 failed: port is already allocated »",
        fields: [
          {
            label: "Le problème",
            value:
              "Le port hôte demandé (`-p 8080:80`) est déjà occupé — par un autre conteneur, ou par un service de votre machine (un serveur local, une autre app).",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Un port hôte ne peut être attribué qu'une fois. Classique : un ancien conteneur tourne encore (`docker ps` pour vérifier) ou on relance une stack sans avoir `down` la précédente.",
          },
          {
            label: "La solution",
            value:
              "Option 1 : libérer le port — arrêter le conteneur fautif (`docker stop <nom>`). Option 2 : choisir un autre port hôte (`-p 8081:80`) : le port conteneur, lui, ne change pas.",
          },
          {
            label: "Bonne pratique",
            value:
              "En développement, documentez les ports utilisés par projet (README ou Compose) pour éviter les collisions entre stacks.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-image-introuvable",
    title: "Erreur : image introuvable ou accès refusé",
    level: 3,
    intro:
      "Le `pull` échoue : faute de frappe, dépôt privé, ou image qui n'existe pas.",
    blocks: [
      {
        kind: "fields",
        title: "« pull access denied » / « not found »",
        fields: [
          {
            label: "Le problème",
            value:
              "`docker pull` ou `docker run` échoue : `Error response from daemon: pull access denied for mon-image, repository does not exist or may require 'docker login'`.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Trois causes : faute de frappe dans le nom (`ngnix` au lieu de `nginx`), tag inexistant (`node:99`), ou dépôt privé sans authentification (`docker login` manquant ou expiré).",
          },
          {
            label: "La solution",
            value:
              "Vérifiez l'orthographe exacte sur Docker Hub (noms et tags sont sensibles à la casse), vérifiez que le tag existe, et lancez `docker login` pour les dépôts privés.",
          },
          {
            label: "Subtilité",
            value:
              "Docker renvoie volontairement le même message pour « n'existe pas » et « privé sans droits » : ne pas révéler l'existence d'un dépôt privé est une mesure de sécurité, pas un bug.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-disque-plein",
    title: "Erreur : disque plein",
    level: 3,
    intro:
      "Docker accumule images, conteneurs et volumes : un jour, le disque dit stop.",
    blocks: [
      {
        kind: "command",
        label: "Diagnostiquer l'espace consommé par Docker",
        command: "docker system df",
        why: "Détaille l'espace occupé par images, conteneurs et volumes, avec la part « reclaimable » (récupérable). C'est le point de départ avant tout nettoyage : on ne supprime jamais à l'aveugle.",
      },
      {
        kind: "fields",
        title: "« no space left on device »",
        fields: [
          {
            label: "Le problème",
            value:
              "Les builds échouent ou les conteneurs ne démarrent plus : le disque (ou la partition de Docker) est saturé par des images, couches et volumes accumulés.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Chaque `docker build` conserve ses couches, chaque `run` sans `--rm` laisse un conteneur arrêté, les volumes anonymes s'empilent. En CI intensive, des dizaines de Go par semaine.",
          },
          {
            label: "La solution douce",
            value:
              "`docker image prune` (images non utilisées), `docker container prune` (conteneurs arrêtés). Ciblées et sûres : elles ne touchent pas à ce qui est utilisé.",
          },
          {
            label: "La solution radicale",
            value:
              "`docker system prune -a --volumes` : TOUT ce qui n'est pas utilisé par un conteneur actif disparaît, volumes compris. Efficace et destructif — vérifiez `docker ps` avant.",
          },
          {
            label: "Bonne pratique",
            value:
              "Surveillez avec `docker system df` mensuellement en dev, et automatisez le nettoyage en CI (les runners éphémères se remplissent vite).",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-permission-refusee",
    title: "Erreur : permission refusée (Linux)",
    level: 3,
    intro:
      "Le classique des installations Linux : le socket Docker appartient à root.",
    blocks: [
      {
        kind: "fields",
        title: "« permission denied while trying to connect to the Docker daemon socket »",
        fields: [
          {
            label: "Le problème",
            value:
              "Chaque commande échoue avec une erreur de permission sur `/var/run/docker.sock`, alors que le démon tourne (les commandes avec `sudo` fonctionnent).",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Le socket Docker appartient à `root:docker`. Votre utilisateur n'est pas dans le groupe `docker`, donc le démon refuse la connexion. C'est une protection volontaire.",
          },
          {
            label: "La solution",
            value:
              "`sudo usermod -aG docker $USER` puis FERMER et rouvrir la session (déconnexion/reconnexion) pour que le nouveau groupe soit pris en compte. Vérifiez avec `groups` : `docker` doit y figurer.",
          },
          {
            label: "Avertissement sécurité",
            value:
              "Le groupe `docker` équivaut à un accès root (un conteneur peut monter `/` de l'hôte). N'y ajoutez que des utilisateurs de confiance — jamais un compte de service exposé.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-nom-deja-utilise",
    title: "Erreur : nom de conteneur déjà utilisé",
    level: 3,
    intro:
      "Docker refuse de créer un conteneur dont le nom existe déjà — même arrêté.",
    blocks: [
      {
        kind: "fields",
        title: "« Conflict. The container name is already in use »",
        fields: [
          {
            label: "Le problème",
            value:
              "`docker run --name ma-bdd ...` échoue alors qu'aucun conteneur de ce nom ne semble tourner.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Un conteneur ARRÊTÉ garde son nom : `docker ps` (sans `-a`) ne le montre pas, mais il occupe toujours le nom. Classique après un `docker stop` sans `docker rm`.",
          },
          {
            label: "La solution",
            value:
              "`docker ps -a | grep ma-bdd` pour le retrouver, puis `docker rm ma-bdd` pour libérer le nom — ou `docker start ma-bdd` si c'est lui que vous vouliez relancer.",
          },
          {
            label: "Bonne pratique",
            value:
              "En développement, `--rm` évite le problème à la source pour les conteneurs jetables. Pour les services persistants, préférez `start`/`restart` à un nouveau `run`.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-cache-invalide",
    title: "Erreur : le cache me joue des tours",
    level: 3,
    intro:
      "Quand le build réutilise une couche périmée et que « ça marchait avant ».",
    blocks: [
      {
        kind: "fields",
        title: "Builds incohérents et couches fantômes",
        fields: [
          {
            label: "Le problème",
            value:
              "Le build réussit mais l'application se comporte comme l'ancienne version, ou un `apt-get install` échoue alors que le Dockerfile n'a pas changé.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Docker invalide le cache en comparant les fichiers d'entrée : un `RUN curl https://…` sans fichier d'entrée est toujours considéré « inchangé » et réutilise l'ancienne couche, même si la ressource distante a évolué. De même, un `apt-get update` en cache peut dater.",
          },
          {
            label: "La solution",
            value:
              "`docker build --no-cache` pour une reconstruction propre quand le doute existe. À long terme : rendez les builds déterministes (versions épinglées, pas de téléchargements non versionnés dans les `RUN`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Réservez `--no-cache` au diagnostic et aux builds de release ; au quotidien, un Dockerfile bien ordonné rend le cache fiable et rapide.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-compose-dependances",
    title: "Erreur : Compose démarre trop vite",
    level: 3,
    intro:
      "L'application crash au démarrage car la base n'est pas encore prête — le piège `depends_on` le plus célèbre.",
    blocks: [
      {
        kind: "fields",
        title: "« Connection refused » au démarrage de la stack",
        fields: [
          {
            label: "Le problème",
            value:
              "`docker compose up` : le service `web` démarre, tente de se connecter à `db`, échoue avec `connection refused`, et crash — alors que `depends_on: [db]` est bien déclaré.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "`depends_on` garantit l'ORDRE de démarrage, pas la DISPONIBILITÉ : le conteneur Postgres existe mais le serveur n'écoute pas encore. L'application, elle, n'attend pas et abandonne.",
          },
          {
            label: "La solution robuste",
            value:
              "Combinez un `healthcheck` sur `db` avec `depends_on: { db: { condition: service_healthy } }` : Compose attend que la base réponde vraiment avant de lancer `web`.",
          },
          {
            label: "La solution applicative",
            value:
              "Rendez l'application résiliente : réessais de connexion avec délai (retry + backoff) au démarrage. C'est de toute façon indispensable en production (la base peut redémarrer à tout moment).",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne comptez jamais sur l'ordre de démarrage seul : en distribué, « prêt » et « démarré » sont deux états différents. Les deux solutions ci-dessus se cumulent, elles ne s'excluent pas.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-exec-conteneur-arrete",
    title: "Erreur : `exec` sur un conteneur arrêté",
    level: 3,
    intro:
      "On ne peut pas entrer dans un conteneur qui ne tourne plus.",
    blocks: [
      {
        kind: "fields",
        title: "« container is not running »",
        fields: [
          {
            label: "Le problème",
            value:
              "`docker exec -it mon-app sh` échoue : `Error response from daemon: container … is not running`.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "`exec` injecte un processus dans un conteneur VIVANT. Si le conteneur s'est arrêté (crash au démarrage, tâche terminée), il n'y a plus d'environnement d'exécution où entrer.",
          },
          {
            label: "La solution",
            value:
              "D'abord comprendre pourquoi il s'est arrêté : `docker ps -a` (code de sortie) puis `docker logs mon-app`. Ensuite `docker start mon-app`, et seulement alors `docker exec`.",
          },
          {
            label: "Alternative",
            value:
              "Pour inspecter le système de fichiers d'un conteneur arrêté sans le démarrer : `docker commit` vers une image temporaire puis `docker run -it … sh`, ou `docker cp` pour extraire des fichiers.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // PROJETS, RESSOURCES, SUITE
  // ------------------------------------------------------------------
  {
    id: "projets-progressifs",
    title: "4 projets réalistes et progressifs",
    level: 3,
    intro:
      "De votre premier Dockerfile à une stack complète : quatre projets qui montent en puissance.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Conteneuriser une application existante",
        fields: [
          {
            label: "Objectif",
            value:
              "Prendre une petite application (ex. un serveur Node, Python ou un site statique) et la faire tourner dans un conteneur via un Dockerfile écrit par vous.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "`FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD`, `docker build`, `docker run -p`, `.dockerignore`.",
          },
          {
            label: "Réussi quand",
            value:
              "L'application répond sur `localhost`, l'image fait moins de 300 Mo, et un collègue peut la lancer avec deux commandes.",
          },
          {
            label: "Difficulté",
            value: "Débutant — 1 à 2 heures.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Stack multi-services avec Compose",
        fields: [
          {
            label: "Objectif",
            value:
              "Application + base de données + cache Redis pilotés par un `compose.yaml` : `docker compose up -d` monte tout l'environnement de développement.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Fichier Compose, réseaux automatiques, volumes nommés, variables d'environnement, `depends_on` + healthcheck, `docker compose logs`.",
          },
          {
            label: "Réussi quand",
            value:
              "Un nouveau développeur clone le dépôt, lance UNE commande, et dispose d'un environnement complet avec données persistées entre les redémarrages.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — une demi-journée.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Image de production optimisée",
        fields: [
          {
            label: "Objectif",
            value:
              "Reprendre l'image du projet 1 et la durcir : build multi-étapes, utilisateur non-root, aucun secret, tags épinglés, healthcheck.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Multi-stage builds, `USER`, `COPY --chown`, cache des couches, Hadolint, `dive` pour analyser le poids, scan de vulnérabilités (`docker scout`).",
          },
          {
            label: "Réussi quand",
            value:
              "Image finale < 200 Mo, aucun processus root (`docker exec … whoami`), build reproductible (`--no-cache` donne la même image), aucun secret dans l'historique.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — une journée.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Pipeline : build, test, publication",
        fields: [
          {
            label: "Objectif",
            value:
              "Automatiser avec GitHub Actions (ou GitLab CI) : à chaque push, construire l'image, lancer les tests DANS un conteneur, puis publier l'image taguée sur un registre.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "CI/CD, cache de build distant, tests en conteneur, `docker login` avec token CI, tags sémantiques (`1.4.2`, `latest` uniquement sur `main`), Compose pour les tests d'intégration.",
          },
          {
            label: "Réussi quand",
            value:
              "Chaque commit produit une image testée et versionnée, déployable telle quelle ; un tag Git déclenche la publication de release.",
          },
          {
            label: "Difficulté",
            value: "Avancé — 2 à 3 jours.",
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
      "La documentation de référence et les terrains d'entraînement reconnus.",
    blocks: [
      {
        kind: "list",
        items: [
          "`https://docs.docker.com/` — LA référence : guides d'installation, manuel du Dockerfile, documentation Compose. Commencez toujours ici.",
          "`https://docs.docker.com/get-started/` — tutoriel officiel pas à pas, le meilleur point d'entrée après cette page.",
          "`https://hub.docker.com/` — Docker Hub : explorer les images officielles, lire leur documentation (chaque image officielle a sa page détaillée).",
          "`https://docs.docker.com/compose/` — documentation complète de Compose et de la spécification du fichier `compose.yaml`.",
          "`https://labs.play-with-docker.com/` — Play with Docker : un terminal Docker gratuit dans le navigateur, idéal pour s'entraîner sans rien installer.",
        ],
      },
      {
        kind: "text",
        text: "Un conseil durable : Docker évolue vite (la syntaxe Compose `version:` est par exemple devenue obsolète). Quand un tutoriel tiers contredit `docs.docker.com`, c'est la documentation officielle qui a raison.",
      },
    ],
  },
  {
    id: "etape-suivante",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Docker maîtrisé, voici les prolongements naturels selon votre direction.",
    blocks: [
      {
        kind: "fields",
        title: "Prolongements",
        fields: [
          {
            label: "Vers la production : Kubernetes",
            value:
              "Compose s'arrête à une machine ; Kubernetes orchestre des conteneurs sur des clusters entiers (scaling, haute disponibilité, déploiements). C'est la suite logique côté infrastructure.",
          },
          {
            label: "Vers l'automatisation : CI/CD",
            value:
              "GitHub Actions, GitLab CI : construire, tester et publier vos images à chaque commit. Le projet 4 ci-dessus est la porte d'entrée.",
          },
          {
            label: "Vers la sécurité : durcissement",
            value:
              "Scan de vulnérabilités (`docker scout`), images `distroless`, politiques de sécurité, gestion des secrets en production (Vault, gestionnaires cloud).",
          },
          {
            label: "Vers le système : Linux",
            value:
              "Comprendre les espaces de noms (namespaces) et les groupes de contrôle (cgroups) du noyau Linux : c'est sur eux que repose toute la magie des conteneurs.",
          },
        ],
      },
    ],
  },
];

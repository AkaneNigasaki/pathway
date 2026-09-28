import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Python : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_PYTHON: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Python, pourquoi il est si lisible et dans quels domaines il domine.",
    blocks: [
      {
        kind: "text",
        text: "Python est un langage de programmation interprété, à typage dynamique, célèbre pour sa lisibilité : le code Python ressemble à du pseudo-code que l'on peut exécuter. Créé avec l'idée que le code est lu bien plus souvent qu'il n'est écrit, il privilégie une syntaxe claire et explicite plutôt que la concision cryptique.",
      },
      {
        kind: "text",
        text: "La philosophie du langage est résumée dans le « Zen of Python » (tapez `import this` dans un interpréteur Python pour le lire) : « Beautiful is better than ugly », « Explicit is better than implicit », « Readability counts ». Ce n'est pas de la décoration : cette philosophie guide les décisions du langage et de sa communauté, et explique pourquoi le code Python de projets différents se ressemble souvent.",
      },
      {
        kind: "fields",
        title: "Les grands domaines de Python",
        fields: [
          {
            label: "Web",
            value:
              "Frameworks comme Django et FastAPI pour construire des sites et des API. Python excelle côté serveur quand la logique métier et la rapidité de développement priment sur la performance brute.",
          },
          {
            label: "Data & IA",
            value:
              "Le langage dominant de la science des données et du machine learning : manipulation de données, statistiques, entraînement de modèles. Les bibliothèques lourdes en calcul sont écrites en C/C++ sous le capot, Python servant d'interface lisible.",
          },
          {
            label: "Scripting & automatisation",
            value:
              "Renommer des milliers de fichiers, traiter des logs, appeler des API, automatiser des tâches système : Python remplace avantageusement les scripts shell dès que la logique dépasse quelques lignes.",
          },
          {
            label: "DevOps & outillage",
            value:
              "Beaucoup d'outils d'infrastructure (Ansible, par exemple) sont écrits en Python. C'est aussi un langage de « glue » idéal pour relier des systèmes entre eux.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : Python est le langage du « faire vite et lisible » — pas le plus rapide à l'exécution, mais souvent le plus rapide pour passer d'une idée à un programme qui fonctionne et que d'autres humains peuvent maintenir.",
      },
    ],
  },
  {
    id: "flux-execution",
    title: "Comment Python s'exécute",
    level: 1,
    intro:
      "Python n'est pas compilé comme C++ ni exécuté directement comme du JavaScript : il passe par une machine virtuelle.",
    blocks: [
      {
        kind: "diagram",
        title: "Du code source à l'exécution",
        lines: [
          "hello.py  (code source lisible)",
          "     │",
          "     ▼",
          "Compilation automatique en bytecode",
          "     │",
          "hello.pyc  (bytecode, dans __pycache__/)",
          "     │",
          "     ▼",
          "PVM — Python Virtual Machine",
          "     │",
          "     ▼",
          "Exécution (la PVM interprète le bytecode)",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : quand vous lancez `python hello.py`, l'interpréteur compile d'abord votre code en bytecode (une représentation intermédiaire compacte), puis la machine virtuelle Python (PVM) exécute ce bytecode. Vous ne voyez jamais cette étape — elle est automatique — mais elle explique deux choses : pourquoi un dossier `__pycache__/` apparaît (le bytecode est mis en cache pour accélérer les lancements suivants) et pourquoi Python est plus lent que les langages compilés (chaque instruction passe par la PVM).",
      },
      {
        kind: "text",
        text: "L'implémentation de référence s'appelle CPython (écrite en C) : c'est celle que vous installez depuis python.org. Il en existe d'autres (PyPy avec compilation à la volée, par exemple), mais CPython est la norme — sauf besoin spécifique, c'est elle qu'on utilise.",
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
      "Bonne nouvelle : Python est l'un des rares langages que l'on peut apprendre sans connaître aucun autre langage avant.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Logique de base",
            value:
              "Comprendre ce qu'est une condition (« si ... alors ... sinon ») et une répétition (« répéter 10 fois »). C'est le seul vrai prérequis intellectuel — le reste s'apprend en pratiquant.",
          },
          {
            label: "Aucun langage requis",
            value:
              "Contrairement à TypeScript (qui exige JavaScript), Python part de zéro. Si vous connaissez déjà un langage, vous irez plus vite sur les concepts, mais ce n'est pas nécessaire.",
          },
          {
            label: "Ligne de commande (utile, pas obligatoire)",
            value:
              "Savoir ouvrir un terminal et lancer une commande aide pour l'installation et l'exécution des scripts. Si ce n'est pas le cas, retenez simplement : un terminal est une fenêtre où l'on tape des commandes texte.",
          },
          {
            label: "Anglais technique de base",
            value:
              "Les messages d'erreur, la documentation et les noms de fonctions sont en anglais. Pas besoin d'être bilingue : reconnaître les mots-clés suffit au début.",
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
      "Installer Python proprement selon votre système, et vérifier que tout fonctionne.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier si Python est déjà installé",
        command: "python --version",
        why: "Affiche la version de l'interpréteur Python accessible via la commande `python`. Si la commande n'existe pas ou affiche une erreur, Python n'est pas installé (ou pas dans le PATH). C'est toujours la première chose à vérifier.",
        verify: "Vous devez voir quelque chose comme `Python 3.x.y` (le x et le y varient selon votre installation).",
      },
      {
        kind: "command",
        label: "Alternative : la commande python3",
        command: "python3 --version",
        why: "Sur macOS et Linux, la commande `python` pointe parfois vers un Python 2 obsolète (ou n'existe pas), tandis que `python3` désigne explicitement Python 3. Si `python --version` échoue ou affiche `Python 2.x`, utilisez `python3` partout à la place de `python`. Sur Windows avec une installation récente, `python` suffit généralement.",
      },
      {
        kind: "text",
        text: "Comment installer : le plus simple est de télécharger l'installeur depuis le site officiel python.org (section Downloads) — sur Windows, cochez bien « Add python.exe to PATH » pendant l'installation, sinon les commandes `python` et `pip` ne seront pas reconnues dans le terminal. Sur macOS et Linux, vous pouvez aussi passer par le gestionnaire de paquets du système, mais vérifiez ensuite la version obtenue.",
      },
      {
        kind: "command",
        label: "Vérifier que pip est disponible",
        command: "python -m pip --version",
        why: "`pip` est le gestionnaire de paquets de Python (il installe les bibliothèques tierces). `python -m pip` l'exécute via l'interpréteur Python lui-même, ce qui garantit que vous utilisez le `pip` associé à ce Python précis — plus fiable que la commande `pip` seule, qui peut pointer vers un autre Python.",
        verify: "Vous devez voir `pip` suivi d'un numéro de version.",
      },
    ],
  },
  {
    id: "python-vs-python3",
    title: "Pourquoi `python` et `python3` ?",
    level: 2,
    intro:
      "La source de confusion la plus fréquente chez les débutants, expliquée une fois pour toutes.",
    blocks: [
      {
        kind: "text",
        text: "Il a existé deux Python incompatibles : Python 2 (ancien) et Python 3 (actuel, sorti en 2008). Pendant la longue transition, les systèmes ont gardé `python` pour Python 2 et créé `python3` pour Python 3. Aujourd'hui, Python 2 est abandonné depuis 2020 : quand on dit « Python », on parle toujours de Python 3.",
      },
      {
        kind: "list",
        items: [
          "Sur Windows (installation python.org récente) : `python` = Python 3. Utilisez `python`.",
          "Sur macOS / Linux : essayez `python3` en premier. Si `python` fonctionne et affiche Python 3.x, les deux sont équivalents sur votre machine.",
          "Dans les documentations, `python` et `python3` désignent la même chose : adaptez à ce qui fonctionne chez vous.",
          "Ne cherchez pas à installer Python 2 : il est obsolète, non maintenu, et source de failles de sécurité.",
        ],
      },
      {
        kind: "text",
        text: "Concernant les versions : visez simplement « un Python 3.x récent ». Évitez les tutoriels qui exigent une version précise sauf besoin particulier — le langage évolue, mais les bases présentées ici sont stables depuis des années.",
      },
    ],
  },
  {
    id: "environnements-virtuels",
    title: "Environnements virtuels (venv)",
    level: 2,
    intro:
      "Le réflexe professionnel n° 1 en Python : un environnement isolé par projet. Non négociable.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un environnement virtuel est un dossier qui contient sa propre copie de Python et de ses paquets, isolée du reste du système.",
      },
      {
        kind: "text",
        text: "Pourquoi ça existe : imaginez deux projets — l'un a besoin de la bibliothèque `requests` en version 2.28, l'autre en version 2.31. Sans isolation, impossible d'avoir les deux versions sur la même machine. Pire : installer des paquets « en global » peut casser des outils système qui dépendent de Python. L'environnement virtuel résout cela : chaque projet a ses dépendances, sans interférence.",
      },
      {
        kind: "command",
        label: "Créer un environnement virtuel",
        command: "python -m venv .venv",
        why: "Le module standard `venv` (livré avec Python, rien à installer) crée un dossier `.venv` contenant un Python isolé et son propre `pip`. La convention est de le nommer `.venv` et de ne jamais le versionner avec Git (il est recréable à volonté).",
        verify: "Un dossier `.venv/` apparaît dans votre projet.",
      },
      {
        kind: "command",
        label: "Activer l'environnement (macOS / Linux)",
        command: "source .venv/bin/activate",
        why: "L'activation modifie temporairement votre terminal : les commandes `python` et `pip` pointent désormais vers l'environnement isolé au lieu du Python système. Votre invite de commande affiche généralement `(.venv)` pour le signaler.",
        verify: "L'invite du terminal affiche `(.venv)` au début de la ligne.",
      },
      {
        kind: "command",
        label: "Activer l'environnement (Windows)",
        command: ".venv\\Scripts\\activate",
        why: "Même principe que sur macOS/Linux, mais le script d'activation se trouve dans `Scripts\\` au lieu de `bin/`. Tapez cette commande dans PowerShell ou l'invite de commandes depuis le dossier du projet.",
        verify: "L'invite du terminal affiche `(.venv)` au début de la ligne.",
      },
      {
        kind: "command",
        label: "Quitter l'environnement",
        command: "deactivate",
        why: "Restaure le terminal à son état normal : `python` et `pip` pointent de nouveau vers l'installation système. À utiliser quand vous avez fini de travailler sur le projet.",
      },
      {
        kind: "list",
        items: [
          "Bonne pratique : créez un `.venv` par projet, dès le premier jour.",
          "Ajoutez `.venv/` à votre `.gitignore` : l'environnement se recrée avec `python -m venv .venv` suivi de `pip install -r requirements.txt`.",
          "Erreur fréquente : installer des paquets sans avoir activé l'environnement — ils partent dans le Python système et le projet ne sera pas reproductible.",
        ],
      },
    ],
  },
  {
    id: "pip",
    title: "pip et les dépendances",
    level: 2,
    intro:
      "Installer des bibliothèques tierces et figer les versions pour que le projet soit reproductible.",
    blocks: [
      {
        kind: "command",
        label: "Installer un paquet",
        command: "pip install requests",
        why: "`pip install` télécharge le paquet depuis PyPI (le dépôt officiel de paquets Python) et l'installe dans l'environnement actif. `requests` est pris ici comme exemple : c'est la bibliothèque la plus utilisée pour faire des requêtes HTTP. À exécuter toujours avec l'environnement virtuel activé.",
        verify: "`pip show requests` affiche les informations du paquet installé.",
      },
      {
        kind: "command",
        label: "Figer les dépendances",
        command: "pip freeze > requirements.txt",
        why: "`pip freeze` liste tous les paquets installés avec leurs versions exactes ; `>` écrit cette liste dans `requirements.txt`. Ce fichier est la « recette » du projet : n'importe qui peut recréer un environnement identique à partir de lui. Il doit être versionné avec Git.",
      },
      {
        kind: "command",
        label: "Réinstaller les dépendances d'un projet",
        command: "pip install -r requirements.txt",
        why: "Installe exactement les paquets et versions listés dans `requirements.txt`. C'est la commande que lance un collègue (ou un serveur) qui récupère votre projet : en une ligne, son environnement devient identique au vôtre.",
      },
      {
        kind: "text",
        text: "Le trio professionnel : environnement virtuel activé → `pip install` pour travailler → `pip freeze > requirements.txt` avant chaque commit qui change les dépendances. Si quelqu'un clone votre projet, il refait `python -m venv .venv`, active, puis `pip install -r requirements.txt`.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet",
    level: 2,
    intro:
      "Créer un projet Python de zéro : environnement, premier script, exécution.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le dossier du projet",
            detail:
              "`mkdir python-demo` crée le dossier, puis déplacez-vous dedans. Un projet Python n'a besoin d'aucune structure imposée au départ : un dossier suffit.",
          },
          {
            title: "Créer et activer l'environnement virtuel",
            detail:
              "`python -m venv .venv` crée l'environnement isolé, puis activez-le (`source .venv/bin/activate` sur macOS/Linux, `.venv\\Scripts\\activate` sur Windows). Vérifiez que `(.venv)` apparaît dans l'invite.",
          },
          {
            title: "Créer le fichier `.gitignore`",
            detail:
              "Créez un fichier `.gitignore` contenant au moins `.venv/` et `__pycache__/`. Ainsi, l'environnement virtuel et le bytecode compilé ne seront jamais versionnés par accident.",
          },
          {
            title: "Écrire le premier script",
            detail:
              "Créez `hello.py` avec ce contenu : `name = input(\"Votre nom ? \")` puis `print(f\"Bonjour, {name} !\")`. La fonction `input()` lit ce que tape l'utilisateur, et le `f\"...\"` (f-string) insère la valeur de `name` dans le texte.",
          },
          {
            title: "Exécuter le script",
            detail:
              "`python hello.py` lance l'interpréteur sur votre fichier : il compile en bytecode puis exécute. Le programme vous demande votre nom, puis affiche le message. Retenez le schéma : on écrit du `.py`, on lance avec `python`.",
          },
          {
            title: "Figer l'environnement (même sans dépendance externe)",
            detail:
              "Prenez l'habitude : dès que vous installez un paquet avec `pip install`, mettez à jour `requirements.txt` via `pip freeze > requirements.txt`. Un projet sans `requirements.txt` n'est pas partageable.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "Arborescence du projet après ce tutoriel",
        lines: [
          "python-demo/",
          "├── .venv/              (environnement isolé — jamais versionné)",
          "├── .gitignore          (contient .venv/ et __pycache__/)",
          "├── hello.py            (votre code)",
          "└── requirements.txt    (dépendances versionnées avec Git)",
        ],
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et IDE",
    level: 2,
    intro:
      "Les trois environnements les plus utilisés pour Python, présentés factuellement : aucun n'est universellement le meilleur.",
    blocks: [
      {
        kind: "fields",
        title: "VS Code",
        fields: [
          {
            label: "En une phrase",
            value:
              "Éditeur léger et gratuit avec l'extension officielle « Python » (Microsoft) qui apporte exécution, debugging, tests et environnements virtuels.",
          },
          {
            label: "Points forts",
            value:
              "Démarrage rapide, énorme écosystème d'extensions, excellent pour le web et les scripts, terminal intégré.",
          },
          {
            label: "Idéal quand",
            value:
              "Vous débutez, vous touchez à plusieurs langages, ou vous voulez un outil gratuit et polyvalent.",
          },
          {
            label: "À savoir",
            value:
              "Pensez à sélectionner le bon interpréteur (celui du `.venv`) via la palette de commandes : « Python: Select Interpreter ».",
          },
        ],
      },
      {
        kind: "fields",
        title: "PyCharm",
        fields: [
          {
            label: "En une phrase",
            value:
              "IDE dédié à Python (JetBrains), avec une édition Community gratuite et une édition Professional payante.",
          },
          {
            label: "Points forts",
            value:
              "Compréhension profonde du code Python, refactoring puissant, debugging visuel avancé, gestion des environnements virtuels intégrée.",
          },
          {
            label: "Idéal quand",
            value:
              "Vous travaillez sur de gros projets Python uniquement et voulez un maximum d'assistance sans configurer d'extensions.",
          },
          {
            label: "À savoir",
            value:
              "Plus lourd à lancer que VS Code ; la version Professional (payante) ajoute le support Django, Flask et des outils de data science.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Neovim / éditeurs terminaux",
        fields: [
          {
            label: "En une phrase",
            value:
              "Éditeurs pilotés au clavier, configurables, appréciés pour travailler directement sur des serveurs ou avec un workflow 100 % clavier.",
          },
          {
            label: "Points forts",
            value:
              "Rapidité, fonctionnement en SSH sur des machines distantes, personnalisation totale via le serveur de langage Python.",
          },
          {
            label: "Idéal quand",
            value:
              "Vous êtes à l'aise au terminal ou administrez des serveurs où seul un éditeur console est disponible.",
          },
          {
            label: "À savoir",
            value:
              "Courbe d'apprentissage réelle : à réserver quand le besoin (serveur distant, workflow clavier) justifie l'investissement.",
          },
        ],
      },
      {
        kind: "text",
        text: "Quel que soit l'éditeur, les concepts à comprendre sont les mêmes : sélection de l'interpréteur (le Python du `.venv`), exécution du script, points d'arrêt pour le debugging, et lancement des tests. Un bon éditeur ne remplace pas ces fondamentaux — il les rend plus confortables.",
      },
    ],
  },
  {
    id: "configuration-editeur",
    title: "Configurer son éditeur (les concepts)",
    level: 2,
    intro:
      "Avant de copier des réglages, comprendre ce qu'un éditeur doit savoir pour bien travailler avec Python.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Sélection de l'interpréteur",
            value:
              "L'éditeur doit savoir quel Python utiliser : celui du `.venv` du projet, pas le Python système. C'est le réglage le plus important — sans lui, l'autocomplétion propose les mauvais paquets et l'exécution utilise les mauvaises dépendances.",
          },
          {
            label: "Serveur de langage (LSP)",
            value:
              "Un programme en arrière-plan qui analyse votre code et fournit autocomplétion, navigation vers les définitions et diagnostics d'erreurs. Pour Python, les plus courants sont Pylance (VS Code) et Pyright. Vous n'avez pas à le configurer à la main : l'extension Python s'en charge.",
          },
          {
            label: "Formatage automatique",
            value:
              "Un outil qui réindente et normalise votre code à la sauvegarde (Ruff fait aussi ce travail, voir la section Qualité). L'objectif : ne plus débattre du style, le laisser à la machine.",
          },
          {
            label: "Diagnostics en direct",
            value:
              "Les erreurs (import inexistant, variable non définie) soulignées pendant la frappe. Elles viennent du serveur de langage et du linter, pas de la magie de l'éditeur.",
          },
        ],
      },
      {
        kind: "text",
        text: "Retenez l'ordre : d'abord comprendre ces quatre concepts, ensuite seulement chercher les réglages correspondants dans votre éditeur. Les noms de menus changent, les concepts restent.",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "À quoi ressemble une journée de développement Python en équipe.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de développement",
        lines: [
          "Activer le .venv",
          "     │",
          "     ▼",
          "Écrire le code (+ tests)",
          "     │",
          "     ▼",
          "Linter & formater (ruff)",
          "     │",
          "     ▼",
          "Lancer les tests (pytest)",
          "     │",
          "     ▼",
          "Commit → Pull Request",
          "     │",
          "     ▼",
          "CI : tests + lint automatiques",
          "     │",
          "     ▼",
          "Revue → Fusion → Déploiement",
        ],
      },
      {
        kind: "text",
        text: "Les habitudes qui distinguent un usage amateur d'un usage professionnel : toujours travailler dans le `.venv`, écrire un test pour chaque comportement important, formater le code avant de committer, et laisser la CI (intégration continue) vérifier automatiquement que tout passe. Ces pratiques sont détaillées dans les sections Testing, Qualité et CI du niveau Approfondi.",
      },
    ],
  },
  {
    id: "premiers-pas-syntaxe",
    title: "Premiers pas avec la syntaxe",
    level: 2,
    intro:
      "Le minimum vital pour lire et écrire du Python dès aujourd'hui.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les bases en un écran",
        code: "# Un commentaire commence par #\nname = \"Akane\"          # une variable : pas de déclaration de type\nage = 25               # un entier\nprice = 19.99          # un flottant\n\nprint(\"Bonjour\")       # afficher du texte\nprint(f\"{name} a {age} ans\")  # f-string : insère des variables\n\nuser_input = input(\"Votre nom ? \")  # lire une entrée clavier\nif age >= 18:\n    print(\"Majeur\")     # l'indentation (4 espaces) remplace les accolades\nelse:\n    print(\"Mineur\")",
      },
      {
        kind: "text",
        text: "Trois choses à remarquer : pas de point-virgule en fin de ligne, pas d'accolades — c'est l'indentation qui délimite les blocs — et les variables n'ont pas de type déclaré. Si l'indentation est incohérente, Python refuse d'exécuter : ce n'est pas du style, c'est de la syntaxe.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  {
    id: "syntaxe-base",
    title: "Syntaxe : l'indentation fait loi",
    level: 3,
    intro:
      "La règle syntaxique la plus distinctive de Python : les blocs sont délimités par l'indentation, pas par des accolades.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "En Python, c'est le décalage horizontal du code (l'indentation) qui indique quelles instructions appartiennent à un bloc.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Pour forcer un code visuellement structuré : puisqu'il faut de toute façon indenter pour que le code soit lisible, Python en a fait une règle du langage plutôt qu'une simple convention. Résultat : le code Python de tout le monde a la même structure visuelle.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "Après une ligne se terminant par `:` (if, for, def, class...), le bloc suivant doit être indenté — par convention 4 espaces — d'un niveau supplémentaire. Revenir au niveau précédent termine le bloc.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Indentation correcte vs erreur",
        code: "if temperature > 30:\n    print(\"Il fait chaud\")  # 4 espaces : dans le bloc if\n    print(\"Buvez de l'eau\")   # toujours dans le bloc\nprint(\"Fin\")  # retour au niveau 0 : hors du bloc\n\n# Erreur fréquente : indentation incohérente\n# if x > 0:\n# print(\"oups\")   # IndentationError : expected an indented block\n#     print(\"oups\")  # indentation différente dans le même bloc : erreur aussi",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Mélanger tabulations et espaces, ou indenter différemment deux lignes du même bloc. Configurez votre éditeur pour insérer des espaces quand vous appuyez sur Tab.",
          },
          {
            label: "Bonne pratique",
            value:
              "4 espaces par niveau, jamais de tabulations. Un formateur automatique (Ruff) s'en charge pour vous.",
          },
        ],
      },
    ],
  },
  {
    id: "typage-dynamique-fort",
    title: "Typage dynamique mais fort",
    level: 3,
    intro:
      "Deux adjectifs qui semblent contradictoires et qui définissent le système de types de Python.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Python ne vérifie pas les types à l'avance (dynamique), mais refuse les opérations incohérentes entre types (fort).",
          },
          {
            label: "Dynamique : qu'est-ce que ça change",
            value:
              "Une variable n'a pas de type déclaré : elle peut contenir un entier, puis une chaîne. Le type est attaché à la valeur, pas à la variable, et n'est connu qu'à l'exécution. Avantage : code concis, prototypage rapide. Coût : une erreur de type n'apparaît qu'au moment où le code fautif s'exécute — d'où l'importance des tests.",
          },
          {
            label: "Fort : qu'est-ce que ça change",
            value:
              "Contrairement à JavaScript, Python ne convertit pas silencieusement les types pour « arranger » une opération : `\"5\" + 3` lève une `TypeError` au lieu de produire `\"53\"`. Le langage préfère échouer bruyamment plutôt que de deviner.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Dynamique et fort en action",
        code: "x = 10          # x contient un entier\nx = \"hello\"     # maintenant une chaîne : autorisé (dynamique)\n\n# Mais le typage reste fort : pas de conversion magique\n# \"5\" + 3       # TypeError: can only concatenate str (not \"int\") to str\ntotal = int(\"5\") + 3   # conversion explicite : 8\n\n# Vérifier un type quand c'est nécessaire\nprint(type(x))        # <class 'str'>\nprint(isinstance(x, str))  # True",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Additionner une chaîne lue avec `input()` (toujours une chaîne !) à un nombre sans conversion : `age = input(\"Âge ? \")` puis `age + 1` lève une `TypeError`. Convertissez : `int(age) + 1`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Convertissez explicitement aux frontières (entrées utilisateur, fichiers, API) plutôt que de laisser Python découvrir l'incohérence en plein calcul.",
          },
        ],
      },
    ],
  },
  {
    id: "nombres-et-chaines",
    title: "Nombres et chaînes",
    level: 3,
    intro:
      "Les types de tous les jours : entiers sans limite, flottants, et des chaînes très bien outillées.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Entiers (int)",
            value:
              "Précision arbitraire : `2 ** 100` calcule exactement 1267650600228229401496703205376 sans débordement. Pas de distinction int/long comme dans d'autres langages.",
          },
          {
            label: "Flottants (float)",
            value:
              "Nombres à virgule en double précision. Attention classique : `0.1 + 0.2` vaut `0.30000000000000004` — c'est inhérent à la représentation binaire des décimaux, pas un bug de Python. Pour de la monnaie, utilisez le module `decimal`.",
          },
          {
            label: "Chaînes (str)",
            value:
              "Immuables et Unicode par défaut. Les f-strings (`f\"{x}\"`) sont la façon moderne d'interpoler. Méthodes utiles : `.strip()`, `.split()`, `.join()`, `.lower()`, `.replace()`, `.startswith()`.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Manipulations courantes",
        code: "big = 2 ** 200\nprint(len(str(big)))  # 61 chiffres, calcul exact\n\nname = \"  Akane  \"\nclean = name.strip().lower()   # \"akane\" : on enchaîne les méthodes\nprint(f\"Bonjour {clean} !\")\n\nwords = \"pomme,banane,cerise\".split(\",\")  # ['pomme', 'banane', 'cerise']\nprint(\" - \".join(words))  # \"pomme - banane - cerise\"\n\n# Slicing : extraire des morceaux\ntext = \"Python\"\nprint(text[0])    # 'P'\nprint(text[1:4])  # 'yth' (de l'index 1 inclus à 4 exclu)\nprint(text[::-1]) # 'nohtyP' (inversée)",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Oublier que les chaînes sont immuables : `text.upper()` ne modifie pas `text`, elle renvoie une nouvelle chaîne. Il faut réaffecter : `text = text.upper()`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférez les f-strings à la concaténation avec `+` et à `%` : plus lisibles, plus rapides, moins d'erreurs de type.",
          },
        ],
      },
    ],
  },
  {
    id: "booleens-et-conditions",
    title: "Booléens et conditions",
    level: 3,
    intro:
      "`True`/`False`, les comparaisons, et la notion de valeurs « fausses » qui simplifie le code.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Conditions idiomatiques",
        code: "score = 85\nif score >= 90:\n    mention = \"Excellent\"\nelif score >= 70:   # elif = else if\n    mention = \"Bien\"\nelse:\n    mention = \"À retravailler\"\n\n# Les valeurs \"falsy\" : False, 0, \"\", [], {}, None\nitems = []\nif not items:          # idiomatique : teste la vacuité, pas == []\n    print(\"Liste vide\")\n\nname = \"Akane\"\nif name:                # chaîne non vide = truthy\n    print(f\"Bonjour {name}\")",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Pourquoi les valeurs falsy existent",
            value:
              "Éviter des comparaisons verbeuses : `if not items` remplace `if len(items) == 0`. Le code se lit comme une phrase.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Écrire `if x == True:` au lieu de `if x:`. Pire : `if x is True` échoue pour des valeurs truthy non booléennes comme `1`. Testez directement la valeur.",
          },
          {
            label: "Bonne pratique",
            value:
              "Utilisez `is None` / `is not None` pour tester `None` (l'absence de valeur) : `==` peut être surchargé par des objets, `is` teste l'identité et est non ambigu.",
          },
        ],
      },
    ],
  },
  {
    id: "boucles",
    title: "Boucles for et while",
    level: 3,
    intro:
      "En Python, on boucle sur des séquences, pas sur des compteurs — une différence de philosophie.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Boucler à la Python",
        code: "# for : parcourir une séquence (pas un compteur manuel)\nfor name in [\"Akane\", \"Dada\", \"Telma\"]:\n    print(f\"Bonjour {name}\")\n\nfor i in range(5):       # 0, 1, 2, 3, 4\n    print(i)\n\nfor index, name in enumerate([\"a\", \"b\"]):\n    print(index, name)    # 0 a / 1 b\n\n# while : répéter tant qu'une condition est vraie\nattempts = 0\nwhile attempts < 3:\n    attempts += 1\n\n# break / continue\nfor n in range(10):\n    if n == 3:\n        continue  # saute le 3\n    if n == 7:\n        break     # arrête la boucle\n    print(n)",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Pourquoi `for` plutôt que des compteurs",
            value:
              "Dans beaucoup de langages on écrit `for (i = 0; i < n; i++)`. En Python, `for x in sequence` exprime directement l'intention (« pour chaque élément ») et élimine toute une classe d'erreurs d'index.",
          },
          {
            label: "Quand utiliser while",
            value:
              "Quand on ne sait pas à l'avance combien d'itérations seront nécessaires : attendre une entrée valide, lire un flux jusqu'à épuisement, réessayer une opération.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Modifier une liste pendant qu'on la parcourt (`for x in items: items.remove(x)`) : des éléments sont sautés silencieusement. Itérez sur une copie (`for x in items[:]`) ou construisez une nouvelle liste.",
          },
          {
            label: "Bonne pratique",
            value:
              "`enumerate()` quand l'index est nécessaire, `zip()` pour parcourir deux séquences en parallèle — jamais de compteur manuel avec `i += 1` dans un `for`.",
          },
        ],
      },
    ],
  },
  {
    id: "listes",
    title: "Listes",
    level: 3,
    intro:
      "La structure de données la plus utilisée : une séquence ordonnée et modifiable.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une liste est une collection ordonnée d'éléments, modifiable, qui peut mélanger les types (même si on évite en pratique).",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Quand l'ordre compte et que le contenu change : liste de tâches, résultats d'une recherche, lignes d'un fichier. C'est le choix par défaut pour « plusieurs choses ».",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "Création avec `[]`, ajout avec `.append()`, accès par index (`items[0]`), suppression avec `.remove()` ou `del`. Les listes sont mutables : les modifier ne crée pas une nouvelle liste.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Opérations courantes sur les listes",
        code: "tasks = [\"écrire\", \"tester\"]\ntasks.append(\"déployer\")      # ajoute à la fin\ntasks.insert(0, \"planifier\")  # insère à une position\nprint(tasks[0])                 # premier élément\nprint(tasks[-1])               # dernier élément (index négatifs)\nprint(len(tasks))               # nombre d'éléments\n\n# Trier sans modifier l'original : sorted() ; sur place : .sort()\nscores = [85, 42, 97]\nprint(sorted(scores))  # [42, 85, 97], scores inchangé\n\n# Présence et parcours\nif \"tester\" in tasks:\n    print(\"trouvé\")",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Exemple réel",
            value:
              "Stocker les lignes d'un fichier de log filtrées, accumuler les résultats d'appels API paginés, maintenir une file de tâches à traiter.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Copier par référence : `b = a` ne copie pas la liste, `b` pointe vers la même. Modifier `b` modifie `a`. Pour une vraie copie : `b = a.copy()` ou `b = list(a)`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Une liste = un type d'éléments. Si vous mélangez entiers et chaînes, c'est souvent le signe qu'il faut une autre structure (un dictionnaire, une classe).",
          },
        ],
      },
    ],
  },
  {
    id: "tuples",
    title: "Tuples",
    level: 3,
    intro:
      "Comme les listes, mais immuables : une fois créés, on ne les modifie plus.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un tuple est une séquence ordonnée et immuable — la version « en lecture seule » de la liste.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Pour des données qui ne doivent pas changer : coordonnées `(x, y)`, une ligne de configuration, plusieurs valeurs renvoyées par une fonction. L'immuabilité est une garantie, pas une contrainte.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "L'immuabilité rend le code plus sûr (personne ne modifie le tuple par accident) et permet d'utiliser les tuples comme clés de dictionnaire — impossible avec une liste.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Tuples en pratique",
        code: "point = (3, 4)          # un tuple de coordonnées\nx, y = point          # déballage (unpacking) : x=3, y=4\n\n# Renvoyer plusieurs valeurs d'une fonction\ndef min_max(numbers):\n    return min(numbers), max(numbers)  # renvoie un tuple\n\nsmallest, largest = min_max([4, 1, 9, 2])\nprint(smallest, largest)  # 1 9\n\n# point[0] = 5  # TypeError : les tuples sont immuables",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Créer un tuple à un élément : `(5)` est juste l'entier 5 entre parenthèses. Il faut la virgule : `(5,)`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Nommez ce que le tuple représente via le déballage (`x, y = point`) plutôt que d'accéder par index (`point[0]`) : le code s'explique tout seul.",
          },
        ],
      },
    ],
  },
  {
    id: "dictionnaires",
    title: "Dictionnaires",
    level: 3,
    intro:
      "Associer des clés à des valeurs : la structure reine pour les données nommées.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un dictionnaire associe des clés uniques à des valeurs, avec un accès quasi instantané par clé.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès que les données ont des noms : un utilisateur (`{\"nom\": ..., \"age\": ...}`), une configuration, une réponse JSON d'API, un compteur par catégorie.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "Table de hachage sous le capot : `d[\"cle\"]` retrouve la valeur sans parcourir. Les clés doivent être immuables (chaînes, nombres, tuples).",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Dictionnaires en pratique",
        code: "user = {\"name\": \"Akane\", \"age\": 25, \"roles\": [\"dev\", \"admin\"]}\nprint(user[\"name\"])              # accès direct\nuser[\"email\"] = \"a@example.com\"  # ajout / modification\n\n# Accès sûr : .get() renvoie None (ou une valeur par défaut)\n# au lieu de lever KeyError si la clé manque\nprint(user.get(\"phone\"))            # None\nprint(user.get(\"phone\", \"inconnu\"))  # \"inconnu\"\n\n# Parcours\nfor key, value in user.items():\n    print(f\"{key} -> {value}\")\n\n# Compter des occurrences : le cas d'usage typique\ncounts = {}\nfor word in [\"a\", \"b\", \"a\", \"c\", \"a\"]:\n    counts[word] = counts.get(word, 0) + 1\nprint(counts)  # {'a': 3, 'b': 1, 'c': 1}",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Exemple réel",
            value:
              "Parser une réponse JSON d'API (`response.json()` renvoie un dictionnaire), charger une configuration, indexer des objets par identifiant pour un accès rapide.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Accéder à une clé absente avec `d[\"cle\"]` lève `KeyError` et plante le programme. Aux frontières (données externes), utilisez `.get()` avec une valeur par défaut.",
          },
          {
            label: "Bonne pratique",
            value:
              "Quand un dictionnaire représente toujours la même « forme » (mêmes clés), envisagez une classe ou un `dataclass` : l'accès par attribut (`user.name`) est plus lisible et mieux vérifiable que par clé.",
          },
        ],
      },
    ],
  },
  {
    id: "sets",
    title: "Ensembles (sets)",
    level: 3,
    intro:
      "Des collections sans doublons, optimisées pour les tests d'appartenance et les opérations ensemblistes.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un set est une collection non ordonnée d'éléments uniques, avec des opérations mathématiques (union, intersection, différence).",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Supprimer les doublons, tester rapidement « est-ce que X fait partie du groupe », comparer deux collections (qu'est-ce qui est nouveau / a disparu).",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Sets en pratique",
        code: "tags = {\"python\", \"web\", \"python\", \"api\"}\nprint(tags)  # {'python', 'web', 'api'} : doublon éliminé\n\n# Test d'appartenance ultra-rapide (même sur des millions d'éléments)\nallowed = {\"admin\", \"editor\"}\nprint(\"admin\" in allowed)  # True\n\n# Opérations ensemblistes\nseen_today = {\"a\", \"b\", \"c\"}\nseen_yesterday = {\"b\", \"c\", \"d\"}\nprint(seen_today - seen_yesterday)  # {'a'} : nouveautés\nprint(seen_today & seen_yesterday)  # {'b', 'c'} : communs",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Créer un set vide avec `{}` : cela crée un dictionnaire vide ! Un set vide s'écrit `set()`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Pour tester l'appartenance dans une grande collection, un set est incomparablement plus rapide qu'une liste (`in` sur une liste parcourt tout, sur un set c'est quasi instantané).",
          },
        ],
      },
    ],
  },
  {
    id: "comprehensions",
    title: "Comprehensions",
    level: 3,
    intro:
      "Construire listes, dictionnaires et sets en une ligne lisible — l'idiome Python par excellence.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une comprehension construit une collection en une expression : `[transformation for élément in séquence if condition]`.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Remplacer les boucles de 4 lignes qui ne font que remplir une liste par une ligne qui dit exactement ce qu'elle construit. Plus lisible une fois l'idiome acquis, et souvent plus rapide.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Comprehensions en pratique",
        code: "# Liste des carrés\nsquares = [n ** 2 for n in range(10)]\n\n# Avec filtre : carrés des nombres pairs uniquement\neven_squares = [n ** 2 for n in range(10) if n % 2 == 0]\n\n# Dictionnaire : nom -> longueur\nnames = [\"Akane\", \"Dada\"]\nlengths = {name: len(name) for name in names}\n\n# Set : premières lettres uniques\ninitials = {name[0] for name in names}\n\n# Équivalent en boucle classique (plus verbeux)\nresult = []\nfor n in range(10):\n    if n % 2 == 0:\n        result.append(n ** 2)",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Quand l'utiliser",
            value:
              "Transformation simple + filtre optionnel sur une séquence. Si la logique dépasse une condition et une transformation, revenez à une boucle explicite.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Empiler plusieurs `for` et `if` dans une seule comprehension : elle devient illisible. La règle : si vous devez la relire deux fois pour la comprendre, utilisez une boucle.",
          },
          {
            label: "Bonne pratique",
            value:
              "Une comprehension = une transformation + un filtre maximum. Au-delà, boucle classique ou fonction dédiée.",
          },
        ],
      },
    ],
  },
  {
    id: "fonctions",
    title: "Fonctions",
    level: 3,
    intro:
      "Découper le code en unités nommées, testables et réutilisables.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une fonction est un bloc de code nommé qui prend des entrées (paramètres), fait un travail, et renvoie un résultat.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Nommer une opération (`calculate_total(...)`) évite de dupliquer sa logique à chaque usage et crée un point unique à tester et à corriger.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Fonctions bien écrites",
        code: "def greet(name, greeting=\"Bonjour\"):\n    \"\"\"Renvoie un message de salutation personnalisé.\"\"\"\n    return f\"{greeting}, {name} !\"\n\nprint(greet(\"Akane\"))              # \"Bonjour, Akane !\"\nprint(greet(\"Akane\", \"Salut\"))     # \"Salut, Akane !\"\n\n# Une fonction sans return renvoie None\ndef log(message):\n    print(f\"[LOG] {message}\")\n\nresult = log(\"démarrage\")  # result vaut None",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Quand l'utiliser",
            value:
              "Dès qu'un bloc de code a un nom sensé, est utilisé deux fois, ou mérite d'être testé isolément. La docstring (chaîne sous `def`) documente l'intention.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `return` : la fonction calcule mais renvoie `None`, et l'appelant reçoit `None` sans erreur explicite. Si une fonction « ne renvoie rien d'utile », c'est un bug silencieux.",
          },
          {
            label: "Bonne pratique",
            value:
              "Une fonction = une responsabilité. Si sa description contient « et », découpez-la en deux.",
          },
        ],
      },
    ],
  },
  {
    id: "arguments-avances",
    title: "Arguments avancés : *args, **kwargs",
    level: 3,
    intro:
      "Écrire des fonctions qui acceptent un nombre variable d'arguments.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`*args` capture les arguments positionnels excédentaires dans un tuple, `**kwargs` capture les arguments nommés excédentaires dans un dictionnaire.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Fonctions utilitaires génériques (`print` en est l'exemple canonique), décorateurs, ou fonctions qui transmettent des arguments à une autre fonction sans les connaître.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "*args et **kwargs en pratique",
        code: "def report(title, *args, **kwargs):\n    print(f\"== {title} ==\")\n    for value in args:          # args est un tuple\n        print(f\" - {value}\")\n    for key, value in kwargs.items():  # kwargs est un dict\n        print(f\" - {key}: {value}\")\n\nreport(\"Ventes\", 120, 340, region=\"Nord\", annee=2026)\n\n# Le piège classique : valeur par défaut MUTABLE\ndef append_bad(item, items=[]):  # DANGER : la même liste est réutilisée\n    items.append(item)\n    return items\n\ndef append_ok(item, items=None):  # CORRECT : None comme sentinelle\n    if items is None:\n        items = []\n    items.append(item)\n    return items",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Utiliser une liste ou un dictionnaire comme valeur par défaut (`def f(x=[])`) : l'objet est créé une seule fois à la définition et partagé entre tous les appels. Utilisez `None` comme valeur par défaut et créez l'objet dans le corps.",
          },
          {
            label: "Bonne pratique",
            value:
              "N'utilisez `*args`/`**kwargs` que quand c'est justifié : une signature explicite (`def f(a, b, c)`) est toujours plus lisible qu'une signature qui accepte tout.",
          },
        ],
      },
    ],
  },
  {
    id: "decorateurs",
    title: "Décorateurs",
    level: 3,
    intro:
      "Le mécanisme qui permet d'enrichir une fonction sans modifier son code — expliqué simplement.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un décorateur est une fonction qui prend une fonction en entrée et renvoie une version « augmentée » de cette fonction.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Certains comportements sont transverses : mesurer le temps d'exécution, vérifier une authentification, mettre en cache. Sans décorateurs, on dupliquerait ce code dans chaque fonction. Avec, on l'écrit une fois et on l'applique avec une ligne `@decorateur`.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Un décorateur de mesure du temps",
        code: "import time\nfrom functools import wraps\n\ndef timed(func):\n    @wraps(func)  # préserve le nom et la doc de la fonction d'origine\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)  # appelle la vraie fonction\n        elapsed = time.perf_counter() - start\n        print(f\"{func.__name__} : {elapsed:.3f}s\")\n        return result\n    return wrapper\n\n@timed\ndef slow_computation(n):\n    return sum(range(n))\n\nslow_computation(10_000_000)  # affiche aussi le temps d'exécution",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Exemple réel",
            value:
              "Dans Flask/FastAPI, `@app.get(\"/users\")` est un décorateur qui enregistre la fonction comme gestionnaire de route. Dans les tests, les décorateurs paramètrent des cas de test.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `@wraps(func)` : la fonction décorée perd son nom et sa docstring, ce qui casse le debugging et la documentation automatique.",
          },
          {
            label: "Bonne pratique",
            value:
              "Utilisez les décorateurs existants (frameworks, `functools.lru_cache` pour le cache) avant d'en écrire : un décorateur maison mal conçu obscurcit le code.",
          },
        ],
      },
    ],
  },
  {
    id: "poo-classes",
    title: "POO : classes et objets",
    level: 3,
    intro:
      "Regrouper données et comportements : quand un dictionnaire ne suffit plus.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une classe est un modèle qui définit des données (attributs) et des comportements (méthodes) ; un objet est une instance concrète de ce modèle.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Quand des données ont un comportement associé et des règles de validité : un `CompteBancaire` avec `deposer()`/`retirer()`, un `Utilisateur` avec `est_admin()`. Si ce n'est que des données sans logique, un dictionnaire ou un `dataclass` suffit.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Une classe bien conçue",
        code: "class BankAccount:\n    \"\"\"Un compte bancaire simple avec solde protégé.\"\"\"\n\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance  # self = l'objet en cours de création\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Le montant doit être positif\")\n        self.balance += amount\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            raise ValueError(\"Fonds insuffisants\")\n        self.balance -= amount\n        return amount\n\naccount = BankAccount(\"Akane\", 100)\naccount.deposit(50)\nprint(account.balance)  # 150",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Exemple réel",
            value:
              "La classe ci-dessus garantit qu'on ne peut pas retirer plus que le solde : la règle métier vit avec les données, pas éparpillée dans le code. C'est tout l'intérêt de la POO.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `self` comme premier paramètre des méthodes : Python le passe automatiquement, mais il doit être déclaré. `def deposit(amount)` sans `self` lève une `TypeError` à l'appel.",
          },
          {
            label: "Bonne pratique",
            value:
              "Validez dans les méthodes (comme ci-dessus avec `ValueError`) : un objet doit toujours être dans un état valide. Pour de simples conteneurs de données, préférez `@dataclass`.",
          },
        ],
      },
    ],
  },
  {
    id: "poo-heritage",
    title: "POO : héritage",
    level: 3,
    intro:
      "Réutiliser et spécialiser des classes existantes.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "L'héritage permet à une classe de reprendre les attributs et méthodes d'une classe parente, en les spécialisant.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Quand il existe une vraie relation « est un » : un `Admin` est un `Utilisateur` avec des droits en plus. Si la relation est « a un » (une `Voiture` a un `Moteur`), utilisez la composition (un attribut) plutôt que l'héritage.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Héritage et super()",
        code: "class User:\n    def __init__(self, name):\n        self.name = name\n\n    def describe(self):\n        return f\"Utilisateur: {self.name}\"\n\nclass Admin(User):  # Admin hérite de User\n    def __init__(self, name, level):\n        super().__init__(name)  # appelle le __init__ du parent\n        self.level = level\n\n    def describe(self):  # surcharge : version spécialisée\n        return f\"Admin {self.name} (niveau {self.level})\"\n\nadmin = Admin(\"Akane\", 2)\nprint(admin.describe())",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Créer des hiérarchies profondes (A hérite de B qui hérite de C...) : chaque niveau ajoute du couplage et rend le code difficile à suivre. En Python, on préfère la composition et les hiérarchies peu profondes.",
          },
          {
            label: "Bonne pratique",
            value:
              "Héritage pour « est un », composition pour « a un ». En cas de doute, la composition (un objet qui contient un autre objet) est presque toujours le choix le plus souple.",
          },
        ],
      },
    ],
  },
  {
    id: "dunder",
    title: "Méthodes spéciales (dunder)",
    level: 3,
    intro:
      "Les méthodes entourées de doubles underscores qui donnent à vos objets des super-pouvoirs.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Les méthodes « dunder » (double underscore, ex. `__str__`) permettent à vos objets de réagir aux opérations natives de Python : `print()`, `len()`, `==`.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Pour que vos classes se comportent comme les types natifs : `len(mon_panier)` devrait fonctionner aussi naturellement que `len(ma_liste)`, au lieu d'appeler `mon_panier.get_length()`.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Les dunder essentiels",
        code: "class ShoppingCart:\n    def __init__(self):\n        self.items = []\n\n    def __len__(self):\n        return len(self.items)  # rend len(cart) possible\n\n    def __str__(self):\n        return f\"Panier ({len(self)} articles)\"  # pour print() / l'utilisateur\n\n    def __repr__(self):\n        return f\"ShoppingCart(items={self.items!r})\"  # pour le développeur\n\n    def __eq__(self, other):\n        return isinstance(other, ShoppingCart) and self.items == other.items\n\ncart = ShoppingCart()\nprint(len(cart))  # 0\nprint(cart)        # \"Panier (0 articles)\"",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Lesquels connaître",
            value:
              "`__init__` (construction), `__str__` (affichage utilisateur), `__repr__` (représentation développeur, indispensable pour debugger), `__len__`, `__eq__` (comparaison). Les autres (`__add__`, `__iter__`...) s'apprennent au besoin.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Définir `__eq__` sans `__hash__` : l'objet devient non hachable et inutilisable dans un set ou comme clé de dictionnaire. Si vous surchargez l'égalité, pensez au hachage.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours définir `__repr__` : c'est ce que vous verrez dans les logs et le debugger quand quelque chose tourne mal.",
          },
        ],
      },
    ],
  },
  {
    id: "modules",
    title: "Modules et imports",
    level: 3,
    intro:
      "Organiser le code en fichiers et réutiliser le travail des autres.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un module est simplement un fichier `.py` ; `import` permet d'utiliser son contenu depuis un autre fichier.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Un programme réel fait des milliers de lignes : les modules découpent le code en fichiers cohérents (`database.py`, `api.py`...) et donnent accès à l'immense bibliothèque standard et aux paquets tiers.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Les formes d'import",
        code: "# utils.py\ndef format_price(amount):\n    return f\"{amount:.2f} €\"\n\n# main.py\nimport utils                    # usage : utils.format_price(19.9)\nfrom utils import format_price  # usage direct : format_price(19.9)\nimport json                     # module de la bibliothèque standard\n\n# Le bloc main : exécuté seulement si le fichier est lancé directement\nif __name__ == \"__main__\":\n    print(format_price(19.9))",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Le bloc `if __name__ == \"__main__\"`",
            value:
              "Quand un fichier est importé, son code s'exécute. Ce test permet de distinguer « je suis le programme principal » (le bloc s'exécute) de « je suis importé comme bibliothèque » (le bloc est ignoré). Indispensable pour les scripts réutilisables.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`from module import *` : importe tout sans préfixe, ce qui masque l'origine des noms et peut écraser vos propres fonctions. Importez explicitement ce dont vous avez besoin.",
          },
          {
            label: "Bonne pratique",
            value:
              "Imports en haut du fichier, groupés : bibliothèque standard, puis tiers, puis locaux. Un linter comme Ruff vérifie et trie cela automatiquement.",
          },
        ],
      },
    ],
  },
  {
    id: "paquets",
    title: "Paquets : structurer un projet",
    level: 3,
    intro:
      "Passer d'un script isolé à un projet organisé en paquet.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure d'un paquet Python",
        lines: [
          "mon_projet/",
          "├── pyproject.toml       (métadonnées du projet, dépendances)",
          "├── requirements.txt    (versions figées)",
          "├── README.md           (description du projet)",
          "└── mon_paquet/          (le paquet : un dossier = un paquet)",
          "    ├── __init__.py      (marque le dossier comme paquet)",
          "    ├── core.py          (logique principale)",
          "    └── utils.py         (fonctions utilitaires)",
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un paquet est un dossier contenant des modules, qui s'importe comme une unité : `from mon_paquet.core import ma_fonction`.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès que le projet dépasse 2-3 fichiers ou que le code doit être réutilisé ailleurs. En dessous, des modules isolés suffisent.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Les imports relatifs qui cassent selon le dossier d'exécution (`ModuleNotFoundError`). Règle simple : lancez toujours depuis la racine du projet, et préférez les imports absolus (`from mon_paquet.core import ...`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Un paquet = un domaine cohérent. Si vous ne pouvez pas décrire le paquet en une phrase, découpez-le.",
          },
        ],
      },
    ],
  },
  {
    id: "gestion-erreurs",
    title: "Gestion des erreurs",
    level: 3,
    intro:
      "Anticiper ce qui peut mal tourner, sans masquer les vrais problèmes.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`try/except` permet d'intercepter une erreur prévisible et d'y réagir proprement au lieu de planter.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Certaines erreurs sont normales : un fichier absent, une entrée utilisateur invalide, un réseau coupé. Les gérer, c'est la différence entre un programme qui affiche « Fichier introuvable, vérifiez le chemin » et un qui vomit 20 lignes de traceback.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "try/except bien utilisé",
        code: "def read_config(path):\n    try:\n        with open(path) as f:\n            return f.read()\n    except FileNotFoundError:\n        print(f\"Configuration introuvable : {path}\")\n        return None\n    except PermissionError:\n        print(f\"Droits insuffisants pour lire : {path}\")\n        return None\n\n# Lever ses propres erreurs quand les données sont invalides\ndef set_age(value):\n    if value < 0:\n        raise ValueError(\"L'âge ne peut pas être négatif\")\n    return value",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Exemple réel",
            value:
              "Lire un fichier de configuration optionnel, valider une entrée d'API, réessayer une requête réseau qui a échoué.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`except Exception:` (ou pire, `except:` tout court) qui attrape tout, y compris les bugs de programmation : le programme continue avec des données corrompues au lieu de signaler le problème. Attrapez toujours l'exception la plus précise possible.",
          },
          {
            label: "Bonne pratique",
            value:
              "Attrapez précis (`FileNotFoundError`, pas `Exception`), et ne mettez dans le `try` que le code qui peut réellement lever cette erreur — pas 50 lignes « au cas où ».",
          },
        ],
      },
    ],
  },
  {
    id: "fichiers",
    title: "Lire et écrire des fichiers",
    level: 3,
    intro:
      "Manipuler des fichiers texte proprement : le mot-clé `with` et `pathlib`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Fichiers : les bons réflexes",
        code: "# with : le fichier est TOUJOURS fermé, même en cas d'erreur\nwith open(\"notes.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Première ligne\\n\")\n\nwith open(\"notes.txt\", encoding=\"utf-8\") as f:\n    content = f.read()        # tout le contenu d'un coup\n\nwith open(\"data.csv\", encoding=\"utf-8\") as f:\n    for line in f:            # ligne par ligne (économe en mémoire)\n        print(line.strip())\n\n# pathlib : manipuler les chemins de façon moderne et portable\nfrom pathlib import Path\n\nconfig = Path(\"config\") / \"settings.json\"  # / fonctionne sur tous les OS\nprint(config.exists())   # True / False\nprint(config.name)       # \"settings.json\"\nprint(config.suffix)     # \".json\"",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Pourquoi `with`",
            value:
              "Oublier de fermer un fichier peut corrompre les écritures (données en tampon non écrites) ou épuiser les descripteurs. `with` garantit la fermeture même si une exception survient au milieu.",
          },
          {
            label: "Pourquoi `pathlib` plutôt que `os.path`",
            value:
              "`Path(\"a\") / \"b\"` fonctionne sur Windows, macOS et Linux, là où la concaténation manuelle de chaînes avec `/` ou `\\\\` casse sur certains OS. C'est l'approche recommandée par la documentation officielle.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `encoding=\"utf-8\"` : sur Windows, l'encodage par défaut n'est pas UTF-8 et les accents deviennent des caractères corrompus. Précisez toujours l'encodage.",
          },
          {
            label: "Bonne pratique",
            value:
              "Pour les gros fichiers, itérez ligne par ligne (`for line in f`) plutôt que `f.read()` : la mémoire reste stable quelle que soit la taille du fichier.",
          },
        ],
      },
    ],
  },
  {
    id: "iterateurs-generateurs",
    title: "Itérateurs et générateurs",
    level: 3,
    intro:
      "Produire des valeurs à la demande avec `yield` : la clé pour traiter des données immenses.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un générateur est une fonction qui « pause » à chaque `yield` et reprend où elle s'était arrêtée, produisant les valeurs une par une au lieu de tout construire en mémoire.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Traiter un fichier de 10 Go ou un flux infini est impossible si tout doit tenir en mémoire. Les générateurs ne gardent qu'une valeur à la fois : la mémoire reste constante.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Pipelines de traitement de données, lecture de gros fichiers, séquences potentiellement infinies, ou quand le consommateur peut s'arrêter tôt (inutile de tout calculer).",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Générateur vs liste",
        code: "def read_large_log(path):\n    \"\"\"Générateur : une ligne à la fois, mémoire constante.\"\"\"\n    with open(path, encoding=\"utf-8\") as f:\n        for line in f:\n            if \"ERROR\" in line:\n                yield line.strip()\n\n# Utilisation : on ne charge jamais tout le fichier\nfor error_line in read_large_log(\"app.log\"):\n    print(error_line)\n\n# Comparaison mémoire\nimport sys\nas_list = [n ** 2 for n in range(1_000_000)]\nas_gen = (n ** 2 for n in range(1_000_000))  # expression génératrice\nprint(sys.getsizeof(as_list))  # ~8 Mo\nprint(sys.getsizeof(as_gen))   # ~200 octets",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Itérer deux fois sur un générateur : après le premier parcours, il est épuisé et le second ne produit rien, sans erreur. Si besoin de plusieurs parcours, reconstruisez-le ou convertissez en liste.",
          },
          {
            label: "Bonne pratique",
            value:
              "Enchaînez les générateurs en pipeline (lire → filtrer → transformer) : chaque étape reste petite, testable, et la mémoire ne bouge pas.",
          },
        ],
      },
    ],
  },
  {
    id: "asyncio",
    title: "Programmation asynchrone (asyncio)",
    level: 3,
    intro:
      "`async`/`await` : gérer des milliers d'attentes simultanées sans threads.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`asyncio` permet à un seul thread de jongler entre des tâches qui attendent (réseau, disque), en reprenant chacune dès que sa réponse arrive.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Un serveur web passe 99 % de son temps à attendre : la base de données, une API externe, le disque. Avec du code synchrone, chaque attente bloque tout. Avec `async`, pendant qu'une requête attend la base, le programme traite les autres.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Tâches limitées par les entrées/sorties (I/O-bound) : serveurs web, scrapers qui appellent des centaines d'URL, clients d'API. Contre-indiqué pour le calcul pur (CPU-bound) : là, c'est `multiprocessing` qu'il faut (voir la section Performance).",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "async/await en pratique",
        code: "import asyncio\n\nasync def fetch(url):\n    print(f\"Début {url}\")\n    await asyncio.sleep(1)  # simule une attente réseau : on rend la main\n    print(f\"Fin {url}\")\n    return f\"données de {url}\"\n\nasync def main():\n    # Les 3 tâches s'exécutent « en même temps\" : ~1s au total, pas 3s\n    results = await asyncio.gather(\n        fetch(\"site-a\"),\n        fetch(\"site-b\"),\n        fetch(\"site-c\"),\n    )\n    return results\n\nasyncio.run(main())",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "asyncio vs threads",
            value:
              "`asyncio` : un seul thread, pas de problèmes de synchronisation, idéal pour des milliers de connexions I/O. Threads : vrais parallélisme d'exécution mais limités par le GIL pour le calcul, et plus complexes (verrous, conditions de course). Pour du I/O massif, `asyncio` est le choix moderne.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Appeler une fonction bloquante (ex. `time.sleep(10)` ou une requête synchrone) dans du code `async` : elle bloque toute la boucle d'événements et annule le bénéfice. En async, tout ce qui attend doit être `await` d'une coroutine.",
          },
          {
            label: "Bonne pratique",
            value:
              "N'introduisez `asyncio` que quand le besoin est réel (serveur, I/O massives). Pour un script qui fait 3 appels API, du code synchrone simple est préférable.",
          },
        ],
      },
    ],
  },
  {
    id: "stdlib-essentielle",
    title: "La bibliothèque standard : « batteries included »",
    level: 3,
    intro:
      "Python est livré avec une bibliothèque standard immense : avant d'installer un paquet, vérifiez qu'elle ne fait pas déjà le travail.",
    blocks: [
      {
        kind: "fields",
        title: "Les modules à connaître en premier",
        fields: [
          {
            label: "`os` / `sys`",
            value:
              "Interaction avec le système : variables d'environnement (`os.environ`), arguments de ligne de commande (`sys.argv`), sortie du programme (`sys.exit`).",
          },
          {
            label: "`json`",
            value:
              "Lire et écrire du JSON : `json.load()` / `json.dump()`. Indispensable pour les API et les fichiers de configuration.",
          },
          {
            label: "`datetime`",
            value:
              "Dates et heures : `datetime.now()`, calculs de durées avec `timedelta`, formatage. Voir la section dédiée pour les pièges des fuseaux horaires.",
          },
          {
            label: "`re`",
            value:
              "Expressions régulières pour la recherche/remplacement de motifs dans du texte. Puissant, mais à utiliser avec modération (voir Erreur fréquente).",
          },
          {
            label: "`collections`",
            value:
              "Structures spécialisées : `Counter` (compter des occurrences), `defaultdict` (dictionnaire avec valeur par défaut), `deque` (file efficace aux deux bouts).",
          },
          {
            label: "`itertools`",
            value:
              "Outils d'itération avancés : chaîner des séquences, générer des combinaisons, créer des itérateurs infinis contrôlés.",
          },
          {
            label: "`argparse`",
            value:
              "Créer des interfaces en ligne de commande propres (`mon_script.py --input fichier.csv --verbose`) avec aide automatique.",
          },
          {
            label: "`logging`",
            value:
              "Journalisation sérieuse : niveaux (DEBUG/INFO/WARNING/ERROR), sortie vers fichier. À préférer à `print()` dès qu'un programme dépasse le stade de prototype.",
          },
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Pourquoi « batteries included » compte",
            value:
              "Moins de dépendances externes = installation plus simple, moins de risques de sécurité, et un comportement garanti sur toute installation Python. La bibliothèque standard est aussi la mieux documentée (docs.python.org).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Réinventer ce qui existe : écrire son propre parseur d'arguments au lieu d'`argparse`, ou son propre système de logs au lieu de `logging`. Cherchez d'abord dans la bibliothèque standard.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ordre de préférence : bibliothèque standard → paquet tiers éprouvé → code maison. Chaque dépendance externe est un coût de maintenance.",
          },
        ],
      },
    ],
  },
  {
    id: "json-csv",
    title: "JSON et CSV : les formats de données courants",
    level: 3,
    intro:
      "Échanger des données avec le monde extérieur, avec la bibliothèque standard.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "JSON et CSV en pratique",
        code: "import json\nimport csv\n\n# JSON : le format des API\ndata = {\"name\": \"Akane\", \"scores\": [85, 92]}\nwith open(\"data.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(data, f, ensure_ascii=False, indent=2)\n\nwith open(\"data.json\", encoding=\"utf-8\") as f:\n    loaded = json.load(f)  # redevient un dict Python\n\n# CSV : le format des tableurs (module csv, jamais à la main)\nwith open(\"users.csv\", \"w\", newline=\"\", encoding=\"utf-8\") as f:\n    writer = csv.DictWriter(f, fieldnames=[\"name\", \"age\"])\n    writer.writeheader()\n    writer.writerow({\"name\": \"Akane\", \"age\": 25})\n\nwith open(\"users.csv\", newline=\"\", encoding=\"utf-8\") as f:\n    for row in csv.DictReader(f):  # chaque ligne = un dict\n        print(row[\"name\"], row[\"age\"])",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Pourquoi le module `csv` plutôt que `split(\",\")`",
            value:
              "Les champs CSV peuvent contenir des virgules entre guillemets (`\"Doe, John\"`) et des sauts de ligne : un simple `split` les casse. Le module `csv` gère tous ces cas conformes au standard.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `newline=\"\"` à l'ouverture en écriture CSV sur Windows : des lignes vides parasites apparaissent. C'est documenté, mais tout le monde l'oublie une fois.",
          },
          {
            label: "Bonne pratique",
            value:
              "`DictReader`/`DictWriter` plutôt que les versions par position : accéder à `row[\"name\"]` plutôt qu'à `row[2]` rend le code insensible à l'ordre des colonnes.",
          },
        ],
      },
    ],
  },
  {
    id: "datetime",
    title: "Dates et heures sans pièges",
    level: 3,
    intro:
      "Le module `datetime` et les deux pièges qui font perdre des heures aux débutants.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "datetime : l'essentiel",
        code: "from datetime import datetime, timedelta, timezone\n\nnow = datetime.now(timezone.utc)  # date+heure actuelles, fuseau UTC\nprint(now.isoformat())  # \"2026-09-28T19:45:00+00:00\"\n\ntomorrow = now + timedelta(days=1)  # arithmétique des durées\nprint((tomorrow - now).days)  # 1\n\n# Parser une date depuis une chaîne\nparsed = datetime.strptime(\"2026-09-28\", \"%Y-%m-%d\")\nprint(parsed.strftime(\"%d/%m/%Y\"))  # \"28/09/2026\"",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Piège n° 1 : les dates « naïves »",
            value:
              "`datetime.now()` sans fuseau renvoie une date « naïve » (sans timezone). Comparer ou soustraire des dates naïves et conscientes lève une erreur, et les calculs à travers les changements d'heure sont faux. Règle : travaillez toujours en UTC en interne (`timezone.utc`), ne convertissez en fuseau local qu'à l'affichage.",
          },
          {
            label: "Piège n° 2 : le formatage manuel",
            value:
              "Construire des dates en concaténant des chaînes (`f\"{y}-{m}-{d}\"`) produit des formats incohérents. Utilisez `isoformat()` pour stocker/échanger et `strftime()` pour afficher.",
          },
          {
            label: "Bonne pratique",
            value:
              "Stockez en UTC et en ISO 8601, affichez en local. Pour des besoins complexes (règles de récurrence, calendriers), la bibliothèque standard suffit rarement : c'est un des cas légitimes pour un paquet tiers.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-pytest",
    title: "Tests avec pytest",
    level: 3,
    intro:
      "Écrire des tests qui prouvent que le code fait ce qu'il prétend.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "pytest est le framework de test le plus utilisé en Python : on écrit des fonctions `test_*` avec des `assert`, il les découvre et les exécute.",
          },
          {
            label: "Pourquoi tester",
            value:
              "Le typage dynamique ne détecte les erreurs qu'à l'exécution : les tests sont le filet de sécurité qui les capture avant vos utilisateurs. Un test est aussi une documentation exécutable (« voici ce que cette fonction est censée faire »).",
          },
        ],
      },
      {
        kind: "command",
        label: "Installer pytest",
        command: "pip install pytest",
        why: "Installe le framework de test dans l'environnement virtuel actif. C'est une dépendance de développement : elle sert à vérifier le code, pas à l'exécuter en production.",
        verify: "pytest --version",
      },
      {
        kind: "code",
        language: "python",
        title: "Premier test (test_pricing.py)",
        code: "# pricing.py\ndef discounted(price, percent):\n    if not 0 <= percent <= 100:\n        raise ValueError(\"Le pourcentage doit être entre 0 et 100\")\n    return price * (1 - percent / 100)\n\n# test_pricing.py\nimport pytest\nfrom pricing import discounted\n\ndef test_discount_basic():\n    assert discounted(100, 20) == 80\n\ndef test_discount_zero():\n    assert discounted(100, 0) == 100\n\ndef test_discount_invalid():\n    with pytest.raises(ValueError):  # vérifie que l'erreur est levée\n        discounted(100, 150)",
      },
      {
        kind: "command",
        label: "Lancer les tests",
        command: "pytest",
        why: "pytest découvre automatiquement les fichiers `test_*.py`, exécute les fonctions `test_*` et affiche un résumé (verts/rouges). Lancé sans argument, il teste tout le dossier courant.",
        verify: "`3 passed` s'affiche si les trois tests ci-dessus réussissent.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Quand l'utiliser",
            value:
              "Dès qu'une fonction contient une règle métier (calcul, validation, transformation). Pas besoin de tester `print(\"hello\")`, mais tout calcul d'argent, toute validation et toute logique conditionnelle mérite un test.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Ne tester que le cas nominal : le bug se cache dans les cas limites (0, valeurs négatives, chaînes vides, `None`). Écrivez au moins un test par branche importante.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un test = un comportement. Nommez le test par ce qu'il vérifie (`test_discount_invalid`), pas par la fonction (`test_discounted_3`).",
          },
        ],
      },
    ],
  },
  {
    id: "qualite-ruff",
    title: "Qualité du code avec Ruff",
    level: 3,
    intro:
      "Lint et formatage automatiques : le style sans les débats.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Ruff est un outil unique qui vérifie les erreurs courantes (lint) et reformate le code (format), écrit en Rust donc quasi instantané.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Les débats de style (espaces, guillemets, longueur de ligne) font perdre du temps en revue de code. Un formateur automatique tranche une fois pour toutes ; le linter, lui, détecte les vrais problèmes : imports inutilisés, variables non définies, complexité excessive.",
          },
        ],
      },
      {
        kind: "command",
        label: "Installer Ruff",
        command: "pip install ruff",
        why: "Installe le linter/formateur dans l'environnement de développement. Comme pytest, c'est un outil de développement, pas une dépendance du programme final.",
        verify: "ruff --version",
      },
      {
        kind: "command",
        label: "Vérifier le code",
        command: "ruff check .",
        why: "Analyse tous les fichiers Python du dossier et signale les problèmes : imports non utilisés, variables redéfinies, code mort, et des centaines d'autres règles configurables.",
        verify: "Ruff liste les problèmes trouvés avec le fichier et la ligne, ou affiche `All checks passed!`.",
      },
      {
        kind: "command",
        label: "Formater le code",
        command: "ruff format .",
        why: "Réécrit le code pour respecter un style cohérent (indentation, espacement, longueur de ligne). À lancer avant chaque commit — ou mieux, configuré pour s'exécuter automatiquement à la sauvegarde dans l'éditeur.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Ruff vs les anciens outils",
            value:
              "Historiquement, on combinait flake8 (lint) + black (format) + isort (tri des imports). Ruff remplace les trois en un seul outil beaucoup plus rapide. Les anciens outils restent valides, mais Ruff est aujourd'hui le choix le plus simple pour démarrer.",
          },
          {
            label: "Bonne pratique",
            value:
              "Intégrez `ruff check` et `pytest` dans votre CI : aucun code non vérifié ne doit pouvoir être fusionné.",
          },
        ],
      },
    ],
  },
  {
    id: "typage-mypy",
    title: "Typage progressif avec mypy (optionnel)",
    level: 3,
    intro:
      "Ajouter des annotations de types là où elles apportent vraiment quelque chose.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Python permet d'annoter les types (`def f(x: int) -> str`), et mypy vérifie statiquement que ces annotations sont cohérentes — sans changer l'exécution.",
          },
          {
            label: "Pourquoi c'est optionnel",
            value:
              "Contrairement à TypeScript, le typage n'est pas au cœur de l'écosystème Python : beaucoup de projets professionnels s'en passent. Il devient rentable sur les grosses bases de code, les bibliothèques publiques et les zones critiques.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Signatures de fonctions publiques, structures de données échangées entre modules, code manipulé par plusieurs développeurs. Inutile de tout typer : commencez par les frontières.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Annotations et vérification",
        code: "def discounted(price: float, percent: float) -> float:\n    if not 0 <= percent <= 100:\n        raise ValueError(\"Le pourcentage doit être entre 0 et 100\")\n    return price * (1 - percent / 100)\n\n# mypy détecte l'incohérence AVANT l'exécution :\n# discounted(\"100\", 20)  # error: Argument 1 has incompatible type \"str\"",
      },
      {
        kind: "command",
        label: "Vérifier les types",
        command: "mypy pricing.py",
        why: "mypy lit les annotations et signale les incohérences de types sans exécuter le code. Les annotations seules ne font rien à l'exécution — c'est mypy (ou le serveur de langage de l'éditeur) qui les exploite.",
        verify: "mypy affiche les erreurs trouvées, ou `Success: no issues found`.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Croire que les annotations protègent à l'exécution : `def f(x: int)` acceptera quand même une chaîne à l'exécution si personne ne vérifie. Les annotations sont des promesses, mypy est le vérificateur.",
          },
          {
            label: "Bonne pratique",
            value:
              "Typez progressivement : d'abord les nouvelles fonctions critiques, puis étendez. Un typage partiel mais correct vaut mieux qu'un typage total approximatif.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging : pdb et l'IDE",
    level: 3,
    intro:
      "Aller au-delà du `print()` : inspecter un programme en pause.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Le debugging honnête",
            value:
              "Ajouter des `print()` pour comprendre ce qui se passe est une technique légitime et rapide pour les problèmes simples. Le debugger devient indispensable quand le bug dépend de l'état (valeurs des variables à un moment précis) ou quand le `print()` ne suffit plus.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lancer avec le debugger intégré",
        command: "python -m pdb script.py",
        why: "`pdb` est le debugger livré avec Python : le programme démarre en pause et vous pouvez avancer pas à pas. Aucune installation requise, disponible partout y compris sur un serveur distant.",
        verify: "L'invite `(Pdb)` apparaît : tapez `n` (ligne suivante), `c` (continuer), `p variable` (afficher une valeur), `q` (quitter).",
      },
      {
        kind: "code",
        language: "python",
        title: "Point d'arrêt dans le code",
        code: "def calculate_total(items):\n    total = 0\n    for item in items:\n        breakpoint()  # pause ici : inspectez item et total\n        total += item[\"price\"] * item[\"quantity\"]\n    return total",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "`breakpoint()`",
            value:
              "Placé dans le code, il met le programme en pause à cet endroit et ouvre `pdb`. Plus précis que de debugger tout le programme depuis le début. Pensez à le retirer avant de committer.",
          },
          {
            label: "Debugger de l'IDE",
            value:
              "VS Code et PyCharm offrent le même principe en visuel : clic dans la marge pour poser un point d'arrêt, puis inspection des variables, pile d'appels et exécution pas à pas. Choisissez l'un ou l'autre selon votre confort — les concepts (point d'arrêt, pas à pas, inspection) sont identiques.",
          },
          {
            label: "Bonne pratique",
            value:
              "Lisez le traceback de bas en haut : la dernière ligne indique l'erreur réelle, les lignes au-dessus montrent le chemin qui y a mené. 80 % des bugs se résolvent en lisant attentivement ce message.",
          },
        ],
      },
    ],
  },
  {
    id: "packaging",
    title: "Packaging : pyproject.toml",
    level: 3,
    intro:
      "Rendre un projet installable et partageable proprement.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "`pyproject.toml` est le fichier qui décrit votre projet : son nom, sa version, ses dépendances et comment le construire.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "`requirements.txt` fige un environnement, mais ne dit pas « quel est ce projet » ni « de quoi il dépend pour fonctionner ». `pyproject.toml` est le standard moderne qui répond à ces questions et permet d'installer le projet lui-même avec `pip`.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès que le code doit être installé ailleurs (une bibliothèque réutilisée, un outil déployé sur un serveur, un paquet publié). Pour un script personnel unique, `requirements.txt` suffit.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Un pyproject.toml minimal",
        code: "[project]\nname = \"mon-outil\"\nversion = \"0.1.0\"\ndescription = \"Petit utilitaire de traitement de fichiers\"\nrequires-python = \">=3.10\"\ndependencies = [\n    \"requests\",\n]\n\n[project.optional-dependencies]\ndev = [\"pytest\", \"ruff\"]  # dépendances de développement uniquement",
      },
      {
        kind: "command",
        label: "Installer le projet en mode développement",
        command: "pip install -e .",
        why: "Installe votre projet dans l'environnement en mode « éditable » (`-e`) : les modifications du code sont prises en compte immédiatement, sans réinstallation. Les dépendances listées dans `pyproject.toml` sont installées automatiquement.",
        verify: "`pip show mon-outil` affiche les métadonnées du projet.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Mélanger `setup.py` (l'ancien système) et `pyproject.toml` en suivant des tutoriels datés. Aujourd'hui : `pyproject.toml` uniquement pour un nouveau projet.",
          },
          {
            label: "Bonne pratique",
            value:
              "Séparez dépendances d'exécution (`dependencies`) et de développement (`optional-dependencies` / `dev`) : un serveur de production n'a pas besoin de pytest.",
          },
        ],
      },
    ],
  },
  {
    id: "performance-gil",
    title: "Performance et le GIL, honnêtement",
    level: 3,
    intro:
      "Ce que le GIL change vraiment — et quand vous pouvez l'ignorer.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le GIL (Global Interpreter Lock) est un verrou de CPython qui empêche deux threads d'exécuter du bytecode Python en même temps.",
          },
          {
            label: "Conséquence concrète",
            value:
              "Ajouter des threads n'accélère pas un calcul Python pur : 8 threads de calcul se partagent un seul cœur effectif. En revanche, pour des tâches qui attendent (réseau, disque), les threads restent utiles : pendant qu'un thread attend, le GIL est libéré et un autre avance.",
          },
        ],
      },
      {
        kind: "table",
        headers: ["Situation", "Le GIL vous concerne ?", "Solution"],
        rows: [
          ["Script, API web classique, automatisation", "Non : un seul thread suffit", "Écrivez du code simple et lisible"],
          ["Milliers de requêtes réseau simultanées", "Non : c'est de l'attente, pas du calcul", "`asyncio` ou threads"],
          ["Calcul lourd en Python pur (boucles)", "Oui : les threads n'aideront pas", "`multiprocessing` (un processus par cœur)"],
          ["Calcul numérique / data science", "Partiellement", "Les bibliothèques comme NumPy calculent en C, hors GIL"],
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Quand ça compte vraiment",
            value:
              "Bien moins souvent qu'on ne le croit : la plupart des programmes Python sont limités par les entrées/sorties ou par des bibliothèques C optimisées, pas par le GIL. Optimisez d'abord l'algorithme (un bon algorithme en Python bat un mauvais algorithme parallélisé).",
          },
          {
            label: "Bonne pratique",
            value:
              "Mesurez avant d'optimiser (`time.perf_counter()`, le module `cProfile`). Le goulot d'étranglement est rarement là où on l'imagine.",
          },
        ],
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité : les règles non négociables",
    level: 3,
    intro:
      "Les erreurs de sécurité les plus classiques en Python — et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Jamais `eval()` sur des entrées externes",
            value:
              "`eval()` exécute du code Python arbitraire : `eval(user_input)` permet à un utilisateur malveillant d'exécuter n'importe quoi sur votre machine. Pour parser des données, utilisez `json.loads()`, `ast.literal_eval()` (valeurs littérales uniquement) ou une validation explicite.",
          },
          {
            label: "Secrets hors du code",
            value:
              "Clés d'API, mots de passe, tokens : jamais en dur dans le code, jamais dans Git. Utilisez des variables d'environnement (`os.environ.get(\"API_KEY\")`) et un fichier `.env` local non versionné (chargé par exemple avec le paquet `python-dotenv`).",
          },
          {
            label: "Dépendances épinglées et auditées",
            value:
              "`pip install` télécharge du code exécuté avec vos privilèges. Épinglez les versions (`requirements.txt`), n'installez que des paquets connus, et méfiez-vous des noms proches de paquets populaires (typosquatting).",
          },
          {
            label: "Ne faites pas confiance aux entrées",
            value:
              "Validez tout ce qui vient de l'extérieur (formulaires, API, fichiers) : types, plages, formats. Les injections (SQL, commandes shell via `os.system`) naissent d'entrées non validées concaténées dans des commandes.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Secrets : ce qu'il faut faire",
        code: "import os\n\n# BIEN : le secret vient de l'environnement\napi_key = os.environ.get(\"API_KEY\")\nif not api_key:\n    raise RuntimeError(\"Variable API_KEY manquante\")\n\n# MAL : secret en dur dans le code (visible dans Git !)\n# api_key = \"sk-1234567890abcdef\"",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Si un secret a fuité dans Git, le supprimer du fichier ne suffit pas (l'historique le conserve) : révoquez-le et régénérez-en un nouveau.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes et progressifs",
    level: 3,
    intro:
      "Quatre projets qui ressemblent à du vrai travail, du plus accessible au plus complet.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — CLI d'organisation de fichiers (débutant)",
        fields: [
          {
            label: "Ce que l'on construit",
            value:
              "Un outil en ligne de commande qui range un dossier « Téléchargements » en pagaille : il déplace chaque fichier dans un sous-dossier selon son extension (`images/`, `documents/`, `archives/`...), avec une option `--dry-run` qui affiche ce qui serait fait sans rien déplacer.",
          },
          {
            label: "Compétences nécessaires",
            value:
              "`pathlib`, `argparse`, boucles et conditions. Aucune dépendance externe.",
          },
          {
            label: "Ce que l'on apprend",
            value:
              "Manipuler le système de fichiers sans risque, concevoir une interface CLI propre, et le réflexe `--dry-run` indispensable pour tout outil qui modifie des données.",
          },
          {
            label: "Difficulté",
            value:
              "Accessible dès les premières semaines : la logique est simple, le défi est la robustesse (fichiers sans extension, noms en double).",
          },
          {
            label: "Projet suivant",
            value:
              "Le scraper (projet 3) : on y retrouve la même rigueur sur les effets de bord.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — API REST avec FastAPI (intermédiaire)",
        fields: [
          {
            label: "Ce que l'on construit",
            value:
              "Une API de gestion de tâches (créer, lister, modifier, supprimer) avec validation des données, documentation interactive auto-générée et tests. FastAPI est un framework web moderne qui exploite les annotations de types de Python.",
          },
          {
            label: "Compétences nécessaires",
            value:
              "Fonctions, décorateurs, annotations de types, gestion d'erreurs, pytest, environnements virtuels.",
          },
          {
            label: "Ce que l'on apprend",
            value:
              "Le modèle requête/réponse HTTP, la validation des entrées (ce qui entre dans l'API est toujours suspect), et l'organisation d'un projet web : routes, modèles, logique métier séparés.",
          },
          {
            label: "Difficulté",
            value:
              "Intermédiaire : il faut comprendre plusieurs concepts en même temps (web + typage + tests), mais chaque brique est simple isolément.",
          },
          {
            label: "Projet suivant",
            value:
              "Le pipeline de données (projet 4) : on y consommera une API comme celle-ci.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Scraper respectueux avec cache (intermédiaire)",
        fields: [
          {
            label: "Ce que l'on construit",
            value:
              "Un programme qui collecte des données publiques sur plusieurs pages web (par exemple les prix d'une catégorie de produits), avec cache sur disque (ne re-télécharge pas ce qui a déjà été récupéré), délais entre requêtes et respect du fichier `robots.txt`.",
          },
          {
            label: "Compétences nécessaires",
            value:
              "Paquet `requests`, fichiers, gestion d'erreurs, générateurs, arguments en ligne de commande.",
          },
          {
            label: "Ce que l'on apprend",
            value:
              "Travailler avec le réseau réel (timeouts, erreurs, retries), la persistance locale, et surtout l'éthique du scraping : un scraper agressif équivaut à une attaque par déni de service pour le site visé.",
          },
          {
            label: "Difficulté",
            value:
              "Intermédiaire : la logique est simple, la difficulté est dans les cas réels (pages qui changent, requêtes qui échouent).",
          },
          {
            label: "Projet suivant",
            value:
              "Le pipeline de données (projet 4), qui transformera des données comme celles-ci.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Pipeline de données testé (avancé)",
        fields: [
          {
            label: "Ce que l'on construit",
            value:
              "Un pipeline complet : extraction de données (fichier CSV ou API), nettoyage et transformation (valeurs manquantes, formats incohérents), chargement dans un fichier de sortie structuré — le tout couvert par des tests pytest et vérifié par Ruff, avec un `README` qui explique comment l'exécuter.",
          },
          {
            label: "Compétences nécessaires",
            value:
              "Modules et paquets, générateurs, `csv`/`json`, pytest, Ruff, environnements virtuels, Git.",
          },
          {
            label: "Ce que l'on apprend",
            value:
              "Le workflow professionnel complet : découper en étapes testables, traiter les données sales du monde réel, et livrer un projet qu'un tiers peut exécuter et vérifier sans vous appeler.",
          },
          {
            label: "Difficulté",
            value:
              "Avancé : c'est la synthèse de presque toutes les sections précédentes. C'est aussi le projet le plus proche d'un vrai livrable professionnel.",
          },
          {
            label: "Projet suivant",
            value:
              "Conteneuriser le pipeline avec Docker, ou l'exposer via l'API du projet 2.",
          },
        ],
      },
      {
        kind: "text",
        text: "Note : ces projets évitent volontairement les exercices artificiels. Chacun produit quelque chose d'utilisable et enseigne au moins un réflexe professionnel (dry-run, validation, respect du réseau, tests) en plus de la technique.",
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Où approfondir, par ordre de fiabilité.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Documentation officielle (docs.python.org)",
            value:
              "La référence absolue : le tutoriel officiel pour débuter, puis la « Library Reference » pour chaque module et le « Language Reference » pour la sémantique précise. Quand deux sources se contredisent, c'est elle qui a raison.",
          },
          {
            label: "Tutoriel officiel",
            value:
              "Le tutoriel de docs.python.org couvre le langage de façon progressive et rigoureuse. C'est le meilleur « second livre » après cette page.",
          },
          {
            label: "PyPI (pypi.org)",
            value:
              "Le dépôt officiel des paquets tiers : page de chaque bibliothèque avec sa documentation et son historique de versions. Vérifiez la date de dernière mise à jour avant d'adopter un paquet.",
          },
          {
            label: "Communautés",
            value:
              "Pour les questions concrètes : Stack Overflow (réponses validées par la communauté) et le forum officiel discuss.python.org. Apprenez à lire les réponses en vérifiant la date et la version concernée.",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode de recherche efficace : commencez toujours par la documentation officielle du module concerné (`docs.python.org/3/library/...`), elle contient des exemples testés. Les tutoriels de blog sont utiles pour les cas d'usage, mais vérifiez leur date : un article de 2015 peut recommander des pratiques abandonnées depuis.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Trois directions possibles selon votre objectif — Python est un point de départ, pas une fin.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Développement web",
            value:
              "Approfondissez avec FastAPI (API modernes) ou Django (applications web complètes avec base de données, authentification et administration intégrées). Les deux sont des choix professionnels établis, pas des modes passagères.",
          },
          {
            label: "Data & IA",
            value:
              "La suite naturelle pour l'analyse de données et le machine learning : manipulation de données tabulaires, visualisation, statistiques, puis entraînement de modèles. Python y est le standard de fait.",
          },
          {
            label: "Élargir vers un langage statique",
            value:
              "Après le typage dynamique, découvrir un langage à typage statique (TypeScript, Rust, Go...) éclaire ce que chaque approche apporte. Vous écrirez ensuite du Python avec une meilleure intuition de ce que les types peuvent garantir.",
          },
        ],
      },
      {
        kind: "text",
        text: "Quelle que soit la direction : construisez des projets réels, lisez du code d'autrui (les bibliothèques open source sont d'excellents professeurs), et gardez l'habitude des tests et des environnements virtuels — elle vous suivra dans tous les langages.",
      },
    ],
  },
];

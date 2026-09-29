import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Go : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Angles Go : la toolchain `go`, les modules, gofmt/go vet, structs et
 * méthodes, interfaces implicites, goroutines et channels, erreurs
 * explicites, tests intégrés, cross-compilation.
 */
export const LEARNING_GO: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Go, pourquoi il existe, et quand le choisir.",
    blocks: [
      {
        kind: "text",
        text: "Go (souvent appelé Golang) est un langage de programmation open source créé chez Google et annoncé en 2009. Il a été conçu pour construire des logiciels simples, fiables et efficaces : serveurs réseau, outils en ligne de commande, infrastructure cloud. Sa philosophie tient en peu de mots : un petit langage, une compilation rapide, un binaire unique à déployer, et la concurrence intégrée au langage.",
      },
      {
        kind: "text",
        text: "Point essentiel : Go fait des choix assumés pour rester simple. Pas d'héritage, pas d'exceptions, pas de génériques pendant ses dix premières années, un formatage imposé par l'outil officiel. Cette simplicité n'est pas un manque : c'est ce qui rend les programmes Go lisibles par toute une équipe et rapides à compiler, même sur de très grosses bases de code.",
      },
      {
        kind: "text",
        text: "Go est un langage compilé à typage statique qui produit un binaire unique et rend la programmation concurrente aussi simple qu'écrire `go maFonction()`.",
      },
      {
        kind: "text",
        text: "Chez Google, les grosses bases de code C++ devenaient lentes à compiler et difficiles à maintenir. Go est né pour combiner la performance d'un langage compilé avec la productivité d'écriture d'un langage moderne — et une gestion native de la concurrence.",
      },
      {
        kind: "text",
        text: "Serveurs HTTP et API, microservices, outils CLI, automatisation DevOps, systèmes réseau, programmes où le déploiement doit être trivial (un seul fichier binaire).",
      },
      {
        kind: "fields",
        title: "Go : l'essentiel",
        fields: [
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un langage de script (il se compile), ni un framework web, ni un langage à machine virtuelle : le programme compilé s'exécute directement sur le système, sans runtime à installer.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : du code source au binaire",
    level: 1,
    intro:
      "La trajectoire d'un programme Go, en une image.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie d'un programme Go",
        lines: [
          "code source (.go)",
          "      │",
          "      ▼",
          "compilateur go (rapide, un seul outil)",
          "      │",
          "      ▼",
          "binaire unique — souvent statique",
          "      │",
          "      ▼",
          "exécution directe (./monapp)",
          "",
          "Pas d'interpréteur, pas de machine virtuelle,",
          "pas de dépendances à installer sur le serveur.",
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Compilation ahead-of-time",
            value:
              "Le compilateur `go` transforme le source en code machine avant l'exécution. Résultat : un démarrage instantané et des performances proches du C pour les tâches courantes.",
          },
          {
            label: "Typage statique simple",
            value:
              "Les types sont vérifiés à la compilation, mais la syntaxe reste légère (`:=` infère le type). Moins de catégories de types qu'en Java ou C++ : le langage tient dans une petite spécification.",
          },
          {
            label: "Concurrence intégrée",
            value:
              "Les goroutines et les channels font partie du langage, pas d'une bibliothèque. Écrire du code concurrent est une opération syntaxique, pas un projet d'architecture.",
          },
          {
            label: "Bibliothèque standard riche",
            value:
              "Serveur HTTP, JSON, chiffrement, tests, parsing de flags : la stdlib couvre l'essentiel sans dépendance externe. C'est une raison majeure de la longévité des projets Go.",
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
    intro: "Ce qu'il faut (et ne faut pas) savoir avant de commencer.",
    blocks: [
      {
        kind: "text",
        text: "Aucun prérequis technique obligatoire : Go s'apprend très bien comme premier langage compilé. Si vous venez de Python ou JavaScript, les deux vraies nouveautés seront le typage statique (déclarer les types, même avec inférence) et la compilation explicite (le programme ne s'exécute qu'après `go build` ou via `go run`).",
      },
      {
        kind: "list",
        items: [
          "Savoir utiliser un terminal (naviguer dans les dossiers, lancer une commande).",
          "Notions de programmation : variables, fonctions, boucles, conditions.",
          "Utile mais non requis : avoir déjà manipulé du JSON ou écrit un petit serveur.",
          "Inutile au début : la programmation concurrente — elle arrive au niveau 3, avec pédagogie.",
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro: "Installer la toolchain officielle, puis vérifier.",
    blocks: [
      {
        kind: "text",
        text: "La méthode la plus fiable est le téléchargement officiel sur go.dev/dl (binaires pour Windows, macOS, Linux). Les gestionnaires de paquets du système proposent aussi Go, mais la version officielle garantit d'avoir la dernière stable avec la toolchain complète (`go`, `gofmt`, `go vet`).",
      },
      {
        kind: "command",
        label: "Vérifier l'installation",
        command: "go version",
        why: "Affiche la version installée et confirme que la commande `go` est dans le PATH.",
        verify: "Le terminal affiche la version de Go installée.",
      },
      {
        kind: "text",
        text: "Bon à savoir : depuis Go 1.21, la toolchain peut se mettre à jour elle-même. Si un projet déclare une version plus récente dans son `go.mod` (ligne `toolchain`), la commande `go` télécharge automatiquement la bonne toolchain à la première utilisation. Vous n'avez donc pas à jongler manuellement entre versions dans la plupart des cas.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet en 6 étapes",
    level: 2,
    intro: "Créer un module, écrire un programme, le compiler.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un dossier",
            detail:
              "Créez un dossier pour le projet (`mkdir bonjour && cd bonjour`). En Go moderne, le code peut vivre n'importe où : pas besoin d'un espace de travail spécial.",
          },
          {
            title: "Initialiser le module",
            detail:
              "Lancez `go mod init exemple.com/bonjour`. Cela crée le fichier `go.mod` qui déclare le nom du module et la version de Go — c'est la carte d'identité du projet.",
          },
          {
            title: "Écrire main.go",
            detail:
              "Créez `main.go` avec le programme ci-dessous : un package `main` et une fonction `main` forment le point d'entrée d'un exécutable.",
          },
          {
            title: "Exécuter sans compiler",
            detail:
              "Lancez `go run .` : Go compile en mémoire et exécute aussitôt. Idéal pendant le développement, aucun fichier produit.",
          },
          {
            title: "Compiler un binaire",
            detail:
              "Lancez `go build -o bonjour .` : vous obtenez un fichier exécutable `bonjour`, autonome.",
          },
          {
            title: "Lancer le binaire",
            detail:
              "Exécutez `./bonjour` (ou `bonjour.exe` sous Windows). C'est ce fichier unique que vous copierez sur un serveur : rien d'autre à installer.",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "main.go — le plus petit programme",
        code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Bonjour, Go !\")\n}",
      },
      {
        kind: "text",
        text: "Trois choses à remarquer : `package main` + `func main()` définissent un exécutable (un package ordinaire n'a pas de `main`). `import \"fmt\"` charge le paquet de formatage de la bibliothèque standard. Et le formatage avec tabulations n'est pas un choix : c'est `gofmt` qui l'impose.",
      },
    ],
  },
  {
    id: "toolchain-go",
    title: "La toolchain `go` : un seul outil pour tout",
    level: 2,
    intro: "Les sous-commandes à connaître, et quand les utiliser.",
    blocks: [
      {
        kind: "fields",
        title: "Les sous-commandes essentielles",
        fields: [
          {
            label: "`go mod init <nom>`",
            value:
              "Initialise un module : crée `go.mod`. À faire une fois par projet, au début.",
          },
          {
            label: "`go run .`",
            value:
              "Compile et exécute le programme aussitôt, sans produire de binaire. Pour le développement quotidien.",
          },
          {
            label: "`go build -o <nom> .`",
            value:
              "Compile vers un fichier exécutable. Pour produire l'artefact à déployer.",
          },
          {
            label: "`go test ./...`",
            value:
              "Exécute tous les tests du module. Le framework de test est intégré au langage.",
          },
          {
            label: "`go vet ./...`",
            value:
              "Analyse statique : détecte les constructions suspectes (erreurs de format, copies de verrous…). À lancer avant chaque commit.",
          },
          {
            label: "`gofmt -l .`",
            value:
              "Liste les fichiers mal formatés. Le formatage Go n'est pas négociable : il est imposé par l'outil.",
          },
          {
            label: "`go mod tidy`",
            value:
              "Nettoie `go.mod` / `go.sum` : ajoute les dépendances manquantes, retire les inutilisées.",
          },
          {
            label: "`go get <module>@<version>`",
            value:
              "Ajoute ou met à jour une dépendance dans `go.mod`.",
          },
          {
            label: "`go install <outil>@<version>`",
            value:
              "Installe un programme Go (ex. un outil) depuis un module distant.",
          },
          {
            label: "`go doc <paquet>`",
            value:
              "Affiche la documentation d'un paquet directement dans le terminal.",
          },
        ],
      },
      {
        kind: "text",
        text: "Notez le motif `./...` : il signifie « ce package et tous ses sous-packages ». C'est la façon idiomatique d'appliquer une commande à tout le module (`go test ./...`, `go vet ./...`).",
      },
    ],
  },
  {
    id: "go-mod-init",
    title: "Commande : `go mod init`",
    level: 2,
    blocks: [
      {
        kind: "command",
        label: "Initialiser un module",
        command: "go mod init exemple.com/monprojet",
        why: "Crée le fichier `go.mod` qui nomme le module et enregistre la version de Go. Sans lui, `go build` et `go test` ne savent pas résoudre les imports du projet.",
        verify: "Un fichier `go.mod` apparaît dans le dossier, contenant les lignes `module` et `go`.",
      },
      {
        kind: "text",
        text: "Le nom du module est généralement le chemin du dépôt (ex. `github.com/utilisateur/projet`) : c'est ce chemin que les autres projets utiliseront pour importer votre code. Pour un exercice local, un nom simple comme `exemple.com/bonjour` suffit.",
      },
    ],
  },
  {
    id: "go-run",
    title: "Commande : `go run`",
    level: 2,
    blocks: [
      {
        kind: "command",
        label: "Compiler et exécuter aussitôt",
        command: "go run .",
        why: "Compile le package du dossier courant en mémoire et l'exécute immédiatement, sans écrire de binaire sur le disque. C'est la boucle de développement la plus courte.",
        verify: "Le programme s'exécute et affiche sa sortie ; aucun fichier exécutable n'est créé.",
      },
      {
        kind: "text",
        text: "Variante utile : `go run main.go` compile un fichier précis. Mais dès que le projet a plusieurs fichiers, préférez `go run .` (le package entier) pour éviter les erreurs de symboles manquants.",
      },
    ],
  },
  {
    id: "go-build",
    title: "Commande : `go build`",
    level: 2,
    blocks: [
      {
        kind: "command",
        label: "Produire un binaire",
        command: "go build -o monapp .",
        why: "Compile le package courant en un fichier exécutable autonome nommé `monapp`. C'est cet unique fichier que vous déploierez : pas de runtime à installer sur la machine cible.",
        verify: "Un fichier `monapp` (ou `monapp.exe` sous Windows) apparaît ; il s'exécute avec `./monapp`.",
      },
      {
        kind: "text",
        text: "Le binaire est le plus souvent statique : les dépendances sont liées à la compilation. Conséquence pratique : l'image Docker d'un service Go peut se résumer à `FROM scratch` + le binaire, soit quelques mégaoctets.",
      },
    ],
  },
  {
    id: "go-fmt",
    title: "Commande : `gofmt`",
    level: 2,
    blocks: [
      {
        kind: "command",
        label: "Vérifier le formatage",
        command: "gofmt -l .",
        why: "Liste les fichiers dont le formatage diffère du standard. En Go, le style (tabulations, placement des accolades) n'est pas une préférence d'équipe : il est défini par l'outil, ce qui élimine les débats de style.",
        verify: "Aucune sortie = tous les fichiers sont bien formatés. Chaque fichier listé doit être reformaté.",
      },
      {
        kind: "command",
        label: "Reformater un fichier",
        command: "gofmt -w main.go",
        why: "Réécrit le fichier avec le formatage canonique. La plupart des éditeurs le font automatiquement à la sauvegarde via `gopls`.",
      },
    ],
  },
  {
    id: "go-vet",
    title: "Commande : `go vet`",
    level: 2,
    blocks: [
      {
        kind: "command",
        label: "Analyser le code",
        command: "go vet ./...",
        why: "Détecte les constructions suspectes que le compilateur accepte : verbes de formatage incorrects dans `Printf`, copie de verrous (`Mutex`), code inatteignable, etc. C'est un filet de sécurité gratuit.",
        verify: "Aucune sortie = rien de suspect détecté dans tout le module.",
      },
      {
        kind: "text",
        text: "Bonne pratique : lancez `go vet ./...` avant chaque commit, ou laissez votre CI le faire. Un code qui passe `go vet` n'est pas garanti correct, mais un code qui échoue mérite toujours qu'on s'y arrête.",
      },
    ],
  },
  {
    id: "go-test-pratique",
    title: "Commande : `go test`",
    level: 2,
    blocks: [
      {
        kind: "command",
        label: "Lancer les tests du module",
        command: "go test ./...",
        why: "Compile et exécute tous les fichiers `*_test.go` du module. Le framework de test fait partie de la toolchain : aucune bibliothèque à installer pour commencer à tester.",
        verify: "Chaque package affiche `ok` (succès) ou `FAIL` (échec) avec le détail.",
      },
      {
        kind: "text",
        text: "Convention : les tests vivent à côté du code, dans des fichiers `xxx_test.go`, avec des fonctions `TestNom(t *testing.T)`. L'écriture des tests elle-même est couverte en profondeur au niveau 3 (section « Tests tabulaires »).",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs",
    level: 2,
    intro: "Ce que chaque environnement apporte, sans classement.",
    blocks: [
      {
        kind: "fields",
        title: "Panorama factuel",
        fields: [
          {
            label: "VS Code + extension Go",
            value:
              "L'extension officielle (maintenue par l'équipe Go) apporte complétion, diagnostics, formatage à la sauvegarde et debugging via Delve. Le choix le plus courant, gratuit.",
          },
          {
            label: "GoLand (JetBrains)",
            value:
              "IDE dédié avec refactoring avancé, navigation et intégration des tests. Propriétaire, avec licence payante (versions gratuites pour étudiants et open source).",
          },
          {
            label: "Neovim / Vim",
            value:
              "Via le serveur `gopls` : complétion, diagnostics et formatage équivalents, dans un éditeur terminal léger. Demande plus de configuration initiale.",
          },
          {
            label: "Autres",
            value:
              "Emacs, Zed, Sublime Text et d'autres éditeurs proposent une prise en charge Go via `gopls`. Le point commun : c'est `gopls` qui fait l'essentiel du travail, pas l'éditeur.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le vrai choix n'est pas l'éditeur mais le serveur de langage : tant que `gopls` est actif, vous avez les diagnostics et la navigation partout. Vérifiez simplement que votre éditeur formate à la sauvegarde (`gofmt`) et lance `go vet` — le reste est confort personnel.",
      },
    ],
  },
  {
    id: "gopls",
    title: "Comprendre `gopls` avant de le configurer",
    level: 2,
    intro: "Le serveur de langage officiel : ce qu'il fait pour vous.",
    blocks: [
      {
        kind: "text",
        text: "`gopls` (prononcé « go please ») est le serveur de langage officiel de Go. Il analyse votre code en continu et fournit aux éditeurs : diagnostics d'erreurs en temps réel, complétion intelligente, navigation vers les définitions, renommage sûr, et actions comme l'organisation des imports.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Diagnostics",
            value:
              "Les erreurs de compilation apparaissent dans l'éditeur avant même de lancer `go build`. C'est le retour le plus précieux au quotidien.",
          },
          {
            label: "Navigation",
            value:
              "Aller à la définition, trouver les usages, voir la documentation au survol — indispensable dès que le projet dépasse quelques fichiers.",
          },
          {
            label: "Refactoring",
            value:
              "Renommage d'un symbole dans tout le module, extraction de variable, correction automatique des imports.",
          },
          {
            label: "Formatage",
            value:
              "La plupart des configurations délèguent le formatage à la sauvegarde à `gopls`/`gofmt` : le code est toujours canonique sans y penser.",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique, vous n'installez presque jamais `gopls` à la main : l'extension Go de VS Code (ou votre plugin Vim/Neovim) le télécharge et le met à jour pour vous. Si la complétion ne fonctionne pas, vérifiez d'abord que le dossier ouvert est bien la racine du module (là où se trouve `go.mod`).",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Le workflow professionnel",
    level: 2,
    intro: "La boucle de travail typique d'un développeur Go.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle quotidienne",
        lines: [
          "éditer le code (éditeur + gopls)",
          "      │",
          "      ▼",
          "sauvegarde → formatage auto (gofmt)",
          "      │",
          "      ▼",
          "go vet ./...  →  go test ./...",
          "      │               │",
          "      └──────┬────────┘",
          "           tout vert ?",
          "          ╱        ╲",
          "        non        oui",
          "        │           │",
          "        ▼           ▼",
          "     corriger   go build -o app .",
          "                       │",
          "                       ▼",
          "              déployer le binaire unique",
        ],
      },
      {
        kind: "text",
        text: "Notez l'absence d'étape « installer les dépendances » dans la boucle : `go build` et `go test` téléchargent automatiquement les modules manquants (vérifiés via `go.sum`). Et l'absence d'étape « débat de style » : `gofmt` a déjà tranché.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "gopath-vs-modules",
    title: "GOPATH vs modules : l'historique à connaître",
    level: 3,
    intro: "Pourquoi les vieux tutoriels parlent d'un dossier spécial.",
    blocks: [
      {
        kind: "text",
        text: "Avant les modules, tout le code Go devait vivre dans un espace de travail unique pointé par la variable `GOPATH` (souvent `~/go`), avec une arborescence imposée (`src/`, `pkg/`, `bin/`). Les dépendances se géraient à la main ou avec des outils tiers. C'était rigide et source de confusion pour les débutants.",
      },
      {
        kind: "text",
        text: "Les modules, introduits expérimentalement en Go 1.11 puis devenus le mode par défaut en Go 1.16, ont tout changé : chaque projet est autonome avec son `go.mod`, placé n'importe où sur le disque, avec des versions de dépendances explicites et vérifiées (`go.sum`). Aujourd'hui, `GOPATH` ne sert plus qu'au cache des modules téléchargés et aux binaires installés via `go install`.",
      },
      {
        kind: "table",
        headers: ["Aspect", "GOPATH (historique)", "Modules (actuel)"],
        rows: [
          ["Emplacement du code", "Forcé dans `$GOPATH/src`", "N'importe où"],
          ["Dépendances", "Manuelles ou outils tiers", "`go.mod` + `go.sum`, versions explicites"],
          ["Reproductibilité", "Fragile", "Forte : versions verrouillées et vérifiées"],
          ["Plusieurs versions d'une lib", "Impossible", "Possible (versions différentes par module)"],
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : `go mod tidy`, `go.sum`, `go get`. Erreur fréquente : suivre un tutoriel d'avant 2020 qui demande de placer le code dans `~/go/src` — ignorez cette étape, initialisez un module.",
      },
    ],
  },
  {
    id: "go-mod-tidy",
    title: "Commande : `go mod tidy`",
    level: 3,
    blocks: [
      {
        kind: "command",
        label: "Nettoyer les dépendances",
        command: "go mod tidy",
        why: "Analyse les imports réels du code, ajoute à `go.mod` les dépendances manquantes et retire celles qui ne servent plus. C'est le ménage de printemps du module.",
        verify: "`go.mod` ne contient plus que les dépendances utilisées ; `go build ./...` passe toujours.",
      },
      {
        kind: "text",
        text: "Quand l'utiliser : après avoir ajouté ou supprimé des imports, avant un commit important, ou quand `go build` se plaint d'une dépendance manquante. En CI, on vérifie souvent que `go mod tidy` ne produit aucun diff (`git diff --exit-code` après `go mod tidy`) pour garantir un `go.mod` propre.",
      },
    ],
  },
  {
    id: "ajouter-dependances",
    title: "Ajouter une dépendance et installer un outil",
    level: 3,
    intro: "`go get` pour les bibliothèques, `go install` pour les programmes.",
    blocks: [
      {
        kind: "command",
        label: "Ajouter une bibliothèque",
        command: "go get golang.org/x/sync@latest",
        why: "Ajoute le module `golang.org/x/sync` (primitives de synchronisation complémentaires, maintenu par l'équipe Go) à `go.mod` avec la dernière version. Le suffixe `@<version>` permet d'épingler une version précise.",
        verify: "`go.mod` contient une ligne `require golang.org/x/sync` ; `go.sum` enregistre les empreintes.",
      },
      {
        kind: "command",
        label: "Installer un outil Go",
        command: "go install golang.org/x/tools/cmd/goimports@latest",
        why: "Compile et installe l'exécutable `goimports` (variante de `gofmt` qui gère aussi les imports) dans `$GOPATH/bin`. `go install` sert aux programmes, jamais aux bibliothèques.",
        verify: "La commande `goimports` (ou `ls $(go env GOPATH)/bin`) est disponible dans le terminal.",
      },
      {
        kind: "text",
        text: "Règle simple : `go get` modifie `go.mod` (dépendance du projet), `go install` produit un binaire (outil pour vous). Ne lancez jamais `go get` en espérant installer un exécutable : depuis les modules, ce n'est plus son rôle.",
      },
    ],
  },
  {
    id: "variables-et-types",
    title: "Variables et typage statique simple",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "Go est statiquement typé : chaque variable a un type vérifié à la compilation, mais `:=` permet de le laisser inférer dans la plupart des cas.",
      },
      {
        kind: "text",
        text: "Attraper les erreurs de type à la compilation plutôt qu'en production, tout en gardant une syntaxe légère proche d'un langage dynamique pour le code courant.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Toujours : il n'y a pas de mode « dynamique ». Les conversions entre types sont toujours explicites (`int(x)`), jamais implicites.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Écrire `x := 1` puis `x = \"texte\"` : le type est fixé à la déclaration, la réaffectation avec un autre type ne compile pas.",
          },
          {
            label: "Bonne pratique",
            value:
              "Utilisez `:=` dans les fonctions (concis) et `var` avec type explicite au niveau package ou quand le type doit être évident (ex. `var compteur uint64`).",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Déclarations courantes",
        code: "var nom string = \"Aina\"   // déclaration explicite\nage := 30                // inférence : int\nvar actif bool           // valeur zéro : false\nconst pi = 3.14159       // constante\n\n// Les « valeurs zéro » : 0, \"\", false, nil selon le type.\n// Une variable déclarée mais inutilisée = erreur de compilation.",
      },
    ],
  },
  {
    id: "constantes-iota",
    title: "Constantes et `iota`",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "Les constantes se déclarent avec `const` et peuvent être typées ou non. `iota` est un compteur automatique dans les blocs de constantes : il vaut 0 pour la première, 1 pour la seconde, etc. C'est l'idiome standard pour définir des énumérations.",
      },
      {
        kind: "code",
        language: "go",
        title: "Énumération avec iota",
        code: "type Jour int\n\nconst (\n\tLundi Jour = iota // 0\n\tMardi             // 1\n\tMercredi          // 2\n)",
      },
      {
        kind: "text",
        text: "Concepts liés : typage statique, valeurs zéro. Bonne pratique : préférez des constantes nommées aux « nombres magiques » dispersés dans le code.",
      },
    ],
  },
  {
    id: "slices",
    title: "Les slices : le tableau dynamique de Go",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "Un slice est une vue sur un tableau sous-jacent : pointeur + longueur + capacité. C'est la structure de séquence à utiliser par défaut.",
      },
      {
        kind: "text",
        text: "Les tableaux Go ont une taille fixe (partie du type) et sont donc rigides. Le slice apporte la taille dynamique tout en restant efficace (pas de liste chaînée).",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Collections ordonnées de taille variable : listes d'utilisateurs, lignes d'un fichier, résultats d'une requête.",
          },
          {
            label: "Comment",
            value:
              "`s := []int{1, 2, 3}`, `s = append(s, 4)`, `len(s)` / `cap(s)`, sous-slices `s[1:3]`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Écrire `append(s, 4)` sans réassigner : `append` peut réallouer, il faut toujours faire `s = append(s, 4)`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Pré-allouez avec `make([]int, 0, 100)` quand la taille finale est connue : cela évite les réallocations successives.",
          },
          {
            label: "Concepts liés",
            value:
              "Tableaux (taille fixe), maps, `copy`, boucles `for ... range`.",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Manipulations de slices",
        code: "nombres := []int{1, 2, 3}\nnombres = append(nombres, 4, 5) // réassigner, toujours !\n\n// Itération idiomatique\nfor i, n := range nombres {\n\tfmt.Printf(\"[%d] = %d\\n\", i, n)\n}\n\n// Pré-allocation quand on connaît la taille\nnoms := make([]string, 0, 100)",
      },
    ],
  },
  {
    id: "maps",
    title: "Les maps : dictionnaires clé-valeur",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "Une `map` associe des clés à des valeurs avec accès en temps quasi constant : `map[string]int`.",
      },
      {
        kind: "text",
        text: "Rechercher par clé (utilisateur par email, compteur par mot) sans parcourir toute une liste.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Index, caches, comptages, configurations : dès qu'une clé identifie une valeur.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Écrire dans une map `nil` : `var m map[string]int; m[\"a\"] = 1` provoque un panic. Initialisez avec `make` ou un littéral.",
          },
          {
            label: "Bonne pratique",
            value:
              "Testez l'existence avec la double affectation : `v, ok := m[\"clé\"]` — `ok` vaut `false` si la clé est absente.",
          },
          {
            label: "Concepts liés",
            value:
              "Slices, structs, concurrence (une map n'est pas sûre en accès concurrent : protégez-la ou utilisez des channels).",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Usage idiomatique d'une map",
        code: "scores := map[string]int{\"Aina\": 10}\nscores[\"Bema\"] = 7\n\n// Lecture avec test d'existence\nif s, ok := scores[\"Aina\"]; ok {\n\tfmt.Println(\"Score :\", s)\n}\n\n// Compteur de mots\ncompteur := make(map[string]int)\nfor _, mot := range []string{\"go\", \"go\", \"test\"} {\n\tcompteur[mot]++\n}",
      },
    ],
  },
  {
    id: "structs",
    title: "Les structs : regrouper des données",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "Une `struct` regroupe des champs nommés de types éventuellement différents : l'équivalent simple d'une classe sans héritage.",
      },
      {
        kind: "text",
        text: "Modéliser le domaine (un `Utilisateur` a un nom, un email, un âge) avec un type nommé, vérifié par le compilateur.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Dès qu'une fonction manipule plusieurs valeurs liées : regroupez-les plutôt que de passer 5 paramètres.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier que les champs non initialisés valent leur « valeur zéro » (`\"\"`, `0`, `nil`) — ce n'est pas une erreur, mais il faut le savoir.",
          },
          {
            label: "Bonne pratique",
            value:
              "Initialisez avec des noms de champs (`Utilisateur{Nom: \"Aina\"}`) : le code survit aux réordonnancements et reste lisible.",
          },
          {
            label: "Concepts liés",
            value:
              "Méthodes, interfaces, tags struct (JSON), visibilité des champs (majuscule = exporté).",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Définir et utiliser une struct",
        code: "type Utilisateur struct {\n\tNom  string\n\tAge  int\n\tActif bool\n}\n\nu := Utilisateur{Nom: \"Aina\", Age: 30, Actif: true}\nfmt.Println(u.Nom) // \"Aina\"\n\n// Struct anonyme pour un usage ponctuel\npoint := struct{ X, Y int }{X: 1, Y: 2}",
      },
    ],
  },
  {
    id: "methodes",
    title: "Les méthodes : fonctions attachées à un type",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "Une méthode est une fonction avec un receveur : `func (u Utilisateur) Bonjour()`. Pas de classes, juste des types et leurs comportements.",
      },
      {
        kind: "text",
        text: "Attacher le comportement aux données rend le code découvrable (`u.Bonjour()` plutôt que `Bonjour(u)`) sans la complexité de l'héritage.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Receveur valeur vs pointeur",
            value:
              "`func (u Utilisateur)` reçoit une copie (lecture seule) ; `func (u *Utilisateur)` reçoit un pointeur (peut modifier). Règle : pointeur dès que la méthode modifie l'objet ou que la struct est grosse.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mélanger receveurs valeur et pointeur sur le même type : choisissez l'un et restez cohérent (le pointeur est le choix par défaut le plus sûr).",
          },
          {
            label: "Bonne pratique",
            value:
              "Nommez le receveur avec 1-2 lettres du type (`u` pour `Utilisateur`, pas `this` ni `self`) : c'est la convention universelle en Go.",
          },
          {
            label: "Concepts liés",
            value:
              "Structs, interfaces (les méthodes sont ce que les interfaces exigent), pointeurs.",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Méthodes valeur et pointeur",
        code: "func (u Utilisateur) Bonjour() string {\n\treturn \"Bonjour, \" + u.Nom\n}\n\nfunc (u *Utilisateur) Anniversaire() {\n\tu.Age++ // modifie l'original : receveur pointeur\n}\n\nu := &Utilisateur{Nom: \"Aina\"}\nfmt.Println(u.Bonjour())\nu.Anniversaire()",
      },
    ],
  },
  {
    id: "interfaces",
    title: "Les interfaces : contrats implicites",
    level: 3,
    intro: "Le concept le plus élégant de Go : pas de `implements`, jamais.",
    blocks: [
      {
        kind: "text",
        text: "Une interface déclare un ensemble de méthodes ; tout type qui les possède satisfait l'interface automatiquement, sans déclaration explicite.",
      },
      {
        kind: "text",
        text: "Découpler le code : une fonction qui accepte une interface accepte n'importe quelle implémentation, présente ou future. C'est le polymorphisme sans hiérarchie de classes.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Pour les dépendances d'une fonction (stockage, horloge, notificateur) : dépendez d'une petite interface, pas d'un type concret. Cela rend le code testable (mocks triviaux).",
          },
          {
            label: "Exemple simple",
            value:
              "`fmt.Stringer` exige `String() string` : n'importe quel type avec cette méthode s'affiche proprement avec `fmt.Println`.",
          },
          {
            label: "Exemple réel",
            value:
              "`http.Handler` (une seule méthode `ServeHTTP`) : le serveur HTTP accepte n'importe quel type qui l'implémente — votre routeur, un middleware, un mock de test.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Définir des interfaces énormes « au cas où ». Une interface de 10 méthodes est presque impossible à implémenter/mocker.",
          },
          {
            label: "Bonne pratique",
            value:
              "Petites interfaces (1-3 méthodes), définies côté consommateur : « acceptez des interfaces, retournez des structs ».",
          },
          {
            label: "Concepts liés",
            value:
              "Méthodes, `any` (l'interface vide, depuis Go 1.18), assertions de type, tests.",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Interface implicite en action",
        code: "// Contrat : savoir se décrire\ntype Descripteur interface {\n\tDescription() string\n}\n\ntype Produit struct{ Nom string; Prix float64 }\n\n// Produit satisfait Descripteur AUTOMATIQUEMENT :\n// aucune déclaration « implements » n'existe en Go.\nfunc (p Produit) Description() string {\n\treturn fmt.Sprintf(\"%s : %.2f €\", p.Nom, p.Prix)\n}\n\nfunc Afficher(d Descripteur) {\n\tfmt.Println(d.Description()) // accepte tout Descripteur\n}",
      },
    ],
  },
  {
    id: "generiques",
    title: "Les génériques (depuis Go 1.18)",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "Go 1.18 a ajouté les paramètres de type : on peut écrire une fonction ou un type qui marche pour plusieurs types, avec contraintes. Le langage a résisté dix ans aux génériques pour ne pas sacrifier la simplicité : ils sont volontairement sobres.",
      },
      {
        kind: "code",
        language: "go",
        title: "Fonction générique minimale",
        code: "// T est un paramètre de type contraint par « comparable »\n// (types supportant == et !=).\nfunc IndexDe[T comparable](s []T, v T) int {\n\tfor i, x := range s {\n\t\tif x == v {\n\t\t\treturn i\n\t\t}\n\t}\n\treturn -1\n}\n\n// Utilisation : le type est inféré\npos := IndexDe([]string{\"a\", \"b\"}, \"b\") // 1",
      },
      {
        kind: "text",
        text: "Bonne pratique : n'utilisez les génériques que quand le même code se répète vraiment pour plusieurs types (conteneurs, algorithmes). Pour un ou deux types, du code concret dupliqué reste souvent plus lisible — la communauté Go valorise la clarté sur l'abstraction.",
      },
    ],
  },
  {
    id: "erreurs-explicites",
    title: "La gestion d'erreurs explicite",
    level: 3,
    intro: "Pas d'exceptions en Go : les erreurs sont des valeurs.",
    blocks: [
      {
        kind: "text",
        text: "Les fonctions qui peuvent échouer retournent une valeur `error` ; l'appelant la teste explicitement avec `if err != nil`.",
      },
      {
        kind: "text",
        text: "Rendre l'échec visible dans le code : on voit exactement où une erreur peut survenir, au lieu de la découvrir via une exception lancée trois appels plus bas.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Toujours : I/O, réseau, parsing, conversions. Une fonction qui retourne `(T, error)` annonce son échec potentiel dans sa signature.",
          },
          {
            label: "Exemple simple",
            value:
              "`f, err := os.Open(\"fichier.txt\"); if err != nil { ... }` — le motif que vous écrirez des centaines de fois.",
          },
          {
            label: "Exemple réel",
            value:
              "Enrichir le contexte avec `fmt.Errorf(\"lecture config : %w\", err)` : le verbe `%w` enveloppe l'erreur d'origine, récupérable ensuite via `errors.Is` / `errors.As`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Ignorer l'erreur avec `_` (`f, _ := os.Open(...)`) : le programme continue avec une valeur invalide et échoue plus loin, mystérieusement.",
          },
          {
            label: "Bonne pratique",
            value:
              "Gérez chaque erreur là où vous avez le contexte pour décider (réessayer ? abandonner ? valeur par défaut ?). Ne « remontez » que ce que l'appelant peut traiter.",
          },
          {
            label: "Concepts liés",
            value:
              "`errors.New`, `errors.Is`/`errors.As`, `defer`, `panic` (réservé aux cas vraiment irrécupérables).",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Motif canonique",
        code: "func LireConfig(chemin string) (Config, error) {\n\tdonnees, err := os.ReadFile(chemin)\n\tif err != nil {\n\t\treturn Config{}, fmt.Errorf(\"lecture config %q : %w\", chemin, err)\n\t}\n\tvar c Config\n\tif err := json.Unmarshal(donnees, &c); err != nil {\n\t\treturn Config{}, fmt.Errorf(\"config invalide : %w\", err)\n\t}\n\treturn c, nil\n}",
      },
    ],
  },
  {
    id: "defer",
    title: "`defer` : le nettoyage garanti",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "`defer f()` programme l'appel de `f` à la fin de la fonction courante, quoi qu'il arrive (même en cas d'erreur ou de panic).",
      },
      {
        kind: "text",
        text: "Garantir la libération des ressources (fichiers, connexions, verrous) sans dupliquer le code de nettoyage devant chaque `return`.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Juste après l'acquisition d'une ressource : `f, err := os.Open(...); defer f.Close()`. Le nettoyage est écrit à côté de l'acquisition, pas 50 lignes plus bas.",
          },
          {
            label: "Comment",
            value:
              "Les appels différés s'exécutent en LIFO (dernier programmé = premier exécuté), dans l'ordre inverse de leur déclaration.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`defer` dans une boucle : les appels s'accumulent jusqu'à la fin de la FONCTION, pas de l'itération — risque de fuite de descripteurs. Extrayez le corps dans une fonction.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un `defer` par ressource, placé immédiatement après sa création réussie. C'est l'idiome le plus reconnaissable du code Go.",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "defer en pratique",
        code: "func Traiter(chemin string) error {\n\tf, err := os.Open(chemin)\n\tif err != nil {\n\t\treturn err\n\t}\n\tdefer f.Close() // exécuté à la sortie, même en cas d'erreur plus bas\n\n\tmu.Lock()\n\tdefer mu.Unlock() // LIFO : déverrouillé AVANT la fermeture du fichier\n\n\t// ... traitement, plusieurs return possibles ...\n\treturn nil\n}",
      },
    ],
  },
  {
    id: "panic-recover",
    title: "`panic` et `recover` : l'exceptionnel, vraiment",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "`panic` arrête brutalement la goroutine courante en déroulant la pile ; `recover` (utilisable uniquement dans une fonction différée) permet d'intercepter un panic. Mais attention au réflexe : en Go, ce mécanisme n'est PAS le système de gestion d'erreurs — les erreurs se retournent comme valeurs (section précédente).",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Quand paniquer",
            value:
              "Erreurs de programmation irrécupérables : invariant violé, configuration invalide au démarrage. En pratique, la stdlib panique rarement ; votre code applicatif ne devrait presque jamais le faire.",
          },
          {
            label: "Quand recover",
            value:
              "Aux frontières : un serveur HTTP qui isole le panic d'un handler pour ne pas faire tomber tout le serveur, ou une bibliothèque qui protège ses appelants.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser `panic`/`recover` comme des try/catch pour le contrôle de flux normal : cela casse le contrat « les erreurs sont des valeurs » et surprend tous les lecteurs.",
          },
          {
            label: "Bonne pratique",
            value:
              "Si vous hésitez entre retourner une erreur et paniquer : retournez l'erreur. `panic` est pour le « ça n'aurait jamais dû arriver ».",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Le seul recover légitime courant",
        code: "// Middleware : un handler qui panique ne tue pas le serveur.\nfunc isolePanic(suivant http.Handler) http.Handler {\n\treturn http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tdefer func() {\n\t\t\tif p := recover(); p != nil {\n\t\t\t\tlog.Printf(\"panic isolé : %v\", p)\n\t\t\thttp.Error(w, \"erreur interne\", http.StatusInternalServerError)\n\t\t\t}\n\t\t}()\n\t\tsuivant.ServeHTTP(w, r)\n\t})\n}",
      },
    ],
  },
  {
    id: "goroutines",
    title: "Les goroutines : la concurrence en un mot-clé",
    level: 3,
    intro: "Le cœur du modèle concurrent de Go.",
    blocks: [
      {
        kind: "text",
        text: "Préfixer un appel de `go` le lance dans une goroutine : une tâche légère gérée par le runtime Go, pas par le système d'exploitation.",
      },
      {
        kind: "text",
        text: "Faire plusieurs choses à la fois (servir 10 000 connexions, télécharger en parallèle) sans le coût des threads OS : une goroutine démarre avec quelques kilo-octets de pile et elles sont multiplexées sur les vrais threads.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Tâches indépendantes et parallélisables : requêtes réseau concurrentes, traitement d'éléments en parallèle, serveurs (chaque connexion = une goroutine).",
          },
          {
            label: "Comment",
            value:
              "`go traiter(item)` — l'appelant continue aussitôt sans attendre la fin. La communication et la synchronisation se font via channels, `sync.WaitGroup` ou `context`.",
          },
          {
            label: "Exemple simple",
            value:
              "Lancer deux téléchargements en parallèle puis attendre les deux résultats, au lieu de les enchaîner.",
          },
          {
            label: "Exemple réel",
            value:
              "Un serveur HTTP Go lance une goroutine par connexion entrante : c'est pour cela qu'un serveur stdlib tient des milliers de connexions simultanées sans configuration.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Lancer des goroutines sans mécanisme d'attente ni d'annulation : le programme principal se termine (et tue tout) ou les goroutines fuient indéfiniment.",
          },
          {
            label: "Bonne pratique",
            value:
              "Chaque goroutine lancée doit avoir un destin clair : qui attend sa fin (`WaitGroup`), comment on l'arrête (`context`), où vont ses erreurs (channel dédié).",
          },
          {
            label: "Concepts liés",
            value:
              "Channels, `select`, `sync.WaitGroup`, `context`, détecteur de races (`-race`).",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Goroutines + WaitGroup",
        code: "func main() {\n\tvar wg sync.WaitGroup\n\turls := []string{\"https://go.dev\", \"https://pkg.go.dev\"}\n\n\tfor _, u := range urls {\n\t\twg.Add(1)\n\t\tgo func(url string) {\n\t\t\tdefer wg.Done()\n\t\tresp, err := http.Get(url)\n\t\t\tif err != nil {\n\t\t\t\tlog.Println(url, \"erreur :\", err)\n\t\t\t\treturn\n\t\t\t}\n\t\t\tresp.Body.Close()\n\t\t\tfmt.Println(url, resp.Status)\n\t\t}(u)\n\t}\n\twg.Wait() // attend la fin de toutes les goroutines\n\tfmt.Println(\"terminé\")\n}",
      },
    ],
  },
  {
    id: "channels",
    title: "Les channels : communiquer entre goroutines",
    level: 3,
    intro: "La devise de Go : partagez la mémoire en communiquant.",
    blocks: [
      {
        kind: "text",
        text: "Un channel est un tuyau typé par lequel des goroutines s'envoient des valeurs : `ch := make(chan int)`, envoi `ch <- v`, réception `v := <-ch`.",
      },
      {
        kind: "text",
        text: "Échanger des données sans mémoire partagée ni verrous : l'envoi et la réception synchronisent les goroutines, ce qui élimine des familles entières de bugs de concurrence.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Pipeline de traitement (étapes reliées par channels), distribution de tâches à des workers, signalement de fin ou d'erreur d'une goroutine.",
          },
          {
            label: "Non-bufferisé vs bufferisé",
            value:
              "`make(chan int)` : l'envoi bloque jusqu'à ce qu'un récepteur soit prêt (rendez-vous). `make(chan int, 10)` : l'envoi bloque seulement si le tampon est plein — découple producteur et consommateur.",
          },
          {
            label: "Exemple réel",
            value:
              "Un pool de workers : un channel distribue les tâches, chaque worker lit, traite, envoie le résultat sur un channel de résultats.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Envoyer sur un channel que personne ne lit (ou fermer un channel deux fois) : blocage définitif (deadlock) ou panic. Le producteur ferme, jamais le consommateur — et une seule fois.",
          },
          {
            label: "Bonne pratique",
            value:
              "Documentez qui ferme le channel (toujours l'émetteur) et préférez `for v := range ch` pour consommer jusqu'à fermeture.",
          },
          {
            label: "Concepts liés",
            value:
              "Goroutines, `select`, `sync.WaitGroup`, devise « share memory by communicating ».",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Pipeline avec channels",
        code: "// Étape 1 : produire des nombres\nnombres := make(chan int)\ngo func() {\n\tdefer close(nombres) // l'émetteur ferme, une seule fois\n\tfor i := 1; i <= 5; i++ {\n\t\tnombres <- i\n\t}\n}()\n\n// Étape 2 : consommer jusqu'à fermeture\nfor n := range nombres {\n\tfmt.Println(\"reçu :\", n*2)\n}",
      },
    ],
  },
  {
    id: "select",
    title: "`select` : attendre plusieurs channels",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "`select` attend qu'UNE opération parmi plusieurs channels soit prête, comme un `switch` pour la concurrence.",
      },
      {
        kind: "text",
        text: "Une goroutine a souvent plusieurs choses à surveiller : nouveaux messages, signal d'annulation, timeout. `select` les gère dans un seul point d'attente.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Boucle d'un worker (tâches + arrêt), timeout sur une opération (`time.After`), multiplexage de plusieurs sources.",
          },
          {
            label: "Exemple réel",
            value:
              "Annulation : `select { case msg := <-taches: ...; case <-ctx.Done(): return }` — le worker s'arrête proprement quand le contexte est annulé.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier la branche d'annulation : la goroutine attend éternellement sur son channel et fuit (goroutine leak).",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours prévoir une sortie (`ctx.Done()` ou channel `stop`) dans un `select` en boucle. Un `default` rend le `select` non bloquant (à utiliser avec parcimonie).",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "select avec timeout et annulation",
        code: "select {\ncase res := <-resultats:\n\tfmt.Println(\"résultat :\", res)\ncase <-time.After(2 * time.Second):\n\tfmt.Println(\"timeout : abandon\")\ncase <-ctx.Done():\n\tfmt.Println(\"annulé :\", ctx.Err())\n}",
      },
    ],
  },
  {
    id: "synchronisation",
    title: "Synchronisation : `sync.Mutex` et `sync.WaitGroup`",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "Quand des goroutines partagent vraiment une donnée (un compteur, un cache), deux primitives de la stdlib suffisent dans 90 % des cas : `sync.Mutex` pour l'exclusion mutuelle, `sync.WaitGroup` pour attendre un groupe de goroutines.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Mutex",
            value:
              "`mu.Lock()` / `defer mu.Unlock()` : une seule goroutine à la fois dans la section critique. Simple et explicite.",
          },
          {
            label: "WaitGroup",
            value:
              "`wg.Add(1)` avant chaque goroutine, `defer wg.Done()` dedans, `wg.Wait()` pour attendre tout le monde.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Copier un `Mutex` ou un `WaitGroup` par valeur (ex. en argument sans pointeur) : la copie a son propre état, la synchronisation ne marche plus. `go vet` le détecte — une raison de plus de le lancer.",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférez les channels quand c'est le FLUX de données qui structure le programme, le Mutex quand c'est l'ÉTAT partagé. Les deux cohabitent très bien.",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Compteur protégé par Mutex",
        code: "type Compteur struct {\n\tmu sync.Mutex\n\tn  int\n}\n\nfunc (c *Compteur) Incr() {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.n++\n}\n\nfunc (c *Compteur) Valeur() int {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\treturn c.n\n}",
      },
    ],
  },
  {
    id: "packages-visibilite",
    title: "Packages et visibilité : la majuscule fait foi",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "Un identifiant commençant par une majuscule est exporté (visible depuis d'autres packages) ; en minuscule, il reste privé au package.",
      },
      {
        kind: "text",
        text: "Pas de mot-clé `public`/`private` : la casse suffit, ce qui rend l'API d'un package lisible d'un coup d'œil.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Toujours : chaque fonction, type, champ ou constante que vous nommez choisit sa visibilité par sa première lettre.",
          },
          {
            label: "Exemple",
            value:
              "Dans `net/http`, `http.Get` est utilisable partout ; un champ `client.timeout` en minuscule ne serait visible que dans son package.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Champ de struct en minuscule + `encoding/json` : le champ est ignoré silencieusement à la sérialisation car non exporté. Pour le JSON, les champs doivent être en majuscule (avec un tag `json:\"nom\"` pour le nom externe).",
          },
          {
            label: "Bonne pratique",
            value:
              "N'exportez que ce qui fait partie du contrat : commencez tout en minuscule, n'exportez que sur besoin réel. Moins d'API = moins de maintenance.",
          },
          {
            label: "Concepts liés",
            value:
              "Modules, `go doc`, commentaires de documentation (tout identifiant exporté devrait avoir un commentaire commençant par son nom).",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Visibilité par la casse",
        code: "package boutique\n\n// Exporté : utilisable depuis un autre package.\ntype Produit struct {\n\tNom string  // exporté\n\tprix float64 // privé au package boutique\n}\n\n// Exportée.\nfunc NouveauProduit(nom string) Produit { return Produit{Nom: nom} }\n\n// Privée : détail d'implémentation.\nfunc calculerTVA(prix float64) float64 { return prix * 0.2 }",
      },
    ],
  },
  {
    id: "pointeurs",
    title: "Les pointeurs : l'essentiel sans l'arithmétique",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "`&x` prend l'adresse de `x`, `*p` accède à la valeur pointée. Pas d'arithmétique de pointeurs : leur usage est circonscrit et sûr.",
      },
      {
        kind: "text",
        text: "Éviter de copier de grosses structs à chaque appel, et permettre à une fonction de modifier la variable de l'appelant.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Receveurs de méthodes qui modifient l'objet, paramètres de structs volumineuses, valeurs optionnelles modifiables (`*Config` pouvant être `nil`).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Déréférencer un pointeur `nil` : panic immédiat. Testez `if p != nil` quand le pointeur peut être absent.",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférez les valeurs aux pointeurs par défaut ; n'introduisez un pointeur que pour la mutation ou la performance mesurée. Le ramasse-miettes (GC) gère la mémoire : pas de `free` manuel.",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Pointeurs en pratique",
        code: "func doubler(n *int) {\n\t*n = *n * 2 // modifie la variable d'origine\n}\n\nx := 21\ndoubler(&x)\nfmt.Println(x) // 42\n\n// Comparaison : sans pointeur, la copie est modifiée, pas l'original.",
      },
    ],
  },
  {
    id: "table-driven-tests",
    title: "Tests tabulaires : l'idiome Go",
    level: 3,
    intro: "La façon standard d'écrire des tests lisibles et exhaustifs.",
    blocks: [
      {
        kind: "text",
        text: "Un test tabulaire définit une liste de cas (entrée → sortie attendue) et les exécute en boucle avec `t.Run`, un sous-test nommé par cas.",
      },
      {
        kind: "text",
        text: "Ajouter un cas = ajouter une ligne au tableau, pas une nouvelle fonction. Les échecs indiquent exactement quel cas a cassé.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Fonctions pures, parsing, validation : tout ce qui se résume à « pour cette entrée, j'attends cette sortie ».",
          },
          {
            label: "Bonne pratique",
            value:
              "Nommez chaque cas (`nom` dans la struct), couvrez les cas limites (vide, zéro, `nil`), et utilisez `t.Errorf` (continue les autres cas) plutôt que `t.Fatalf` sauf erreur bloquante.",
          },
          {
            label: "Concepts liés",
            value:
              "`go test`, couverture (`go test -cover`), benchmarks, `testify` (bibliothèque tierce d'assertions, optionnelle).",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "addition_test.go — test tabulaire",
        code: "func Addition(a, b int) int { return a + b }\n\nfunc TestAddition(t *testing.T) {\n\tcas := []struct {\n\t\tnom      string\n\t\ta, b     int\n\t\tattendu  int\n\t}{\n\t\t{\"positifs\", 2, 3, 5},\n\t\t{\"négatif\", -1, 1, 0},\n\t\t{\"zéros\", 0, 0, 0},\n\t}\n\tfor _, c := range cas {\n\t\tt.Run(c.nom, func(t *testing.T) {\n\t\t\tif res := Addition(c.a, c.b); res != c.attendu {\n\t\t\t\tt.Errorf(\"Addition(%d, %d) = %d, attendu %d\", c.a, c.b, res, c.attendu)\n\t\t\t}\n\t\t})\n\t}\n}",
      },
    ],
  },
  {
    id: "benchmarks",
    title: "Benchmarks intégrés",
    level: 3,
    blocks: [
      {
        kind: "command",
        label: "Mesurer les performances",
        command: "go test -bench=. -benchmem ./...",
        why: "Exécute les fonctions `BenchmarkXxx` en ajustant le nombre d'itérations, et affiche le temps par opération. `-benchmem` ajoute les allocations mémoire par opération.",
        verify: "Sortie du type `BenchmarkAddition-8  10000000  112 ns/op  0 B/op  0 allocs/op` (les chiffres varient selon la machine).",
      },
      {
        kind: "code",
        language: "go",
        title: "Écrire un benchmark",
        code: "func BenchmarkAddition(b *testing.B) {\n\tfor i := 0; i < b.N; i++ {\n\t\tAddition(2, 3)\n\t}\n}\n// b.N est ajusté automatiquement jusqu'à une mesure stable.",
      },
      {
        kind: "text",
        text: "Bonne pratique : mesurez avant d'optimiser, et méfiez-vous des micro-benchmarks trompeurs (le compilateur peut éliminer du code mort). Pour la concurrence, `-race` et les profiles (`-cpuprofile`) complètent le tableau.",
      },
    ],
  },
  {
    id: "cross-compilation",
    title: "Cross-compilation : compiler pour une autre plateforme",
    level: 3,
    blocks: [
      {
        kind: "command",
        label: "Compiler pour Linux depuis n'importe où",
        command: "GOOS=linux GOARCH=amd64 go build -o monapp .",
        why: "Les variables `GOOS` (système cible) et `GOARCH` (architecture) font compiler pour une autre plateforme sans machine dédiée. Le binaire produit s'exécute sur la cible.",
        verify: "`file monapp` (ou sa taille/date) indique un binaire Linux 64 bits, exécutable sur un serveur Linux.",
      },
      {
        kind: "table",
        headers: ["Cible", "GOOS", "GOARCH", "Usage typique"],
        rows: [
          ["Linux 64 bits", "linux", "amd64", "Serveurs, conteneurs"],
          ["Linux ARM", "linux", "arm64", "Raspberry Pi, serveurs ARM"],
          ["macOS ARM", "darwin", "arm64", "Mac Apple Silicon"],
          ["Windows 64 bits", "windows", "amd64", "Postes Windows"],
        ],
      },
      {
        kind: "text",
        text: "Limite honnête : le code utilisant `cgo` (appel à du C) complique la cross-compilation car il faut une toolchain C pour la cible. La stdlib et le pur Go se cross-compilent sans friction — une raison de plus de préférer les dépendances pures Go quand c'est possible.",
      },
    ],
  },
  {
    id: "debugging-delve",
    title: "Debugging : Delve et les notions",
    level: 3,
    intro: "Déboguer sans `fmt.Println` partout.",
    blocks: [
      {
        kind: "text",
        text: "Delve (`dlv`) est le débogueur standard de Go : points d'arrêt, pas à pas, inspection des variables et des goroutines. Avant d'y recourir, deux réflexes couvrent 80 % des bugs : lire le message d'erreur (Go a des erreurs explicites) et ajouter un log ciblé avec le paquet `log` ou `log/slog` (logs structurés de la stdlib).",
      },
      {
        kind: "command",
        label: "Installer Delve",
        command: "go install github.com/go-delve/delve/cmd/dlv@latest",
        why: "Installe le débogueur officiel de l'écosystème Go. C'est un programme comme un autre, distribué comme module.",
        verify: "`dlv version` affiche la version installée.",
      },
      {
        kind: "fields",
        title: "Session Delve minimale",
        fields: [
          {
            label: "`dlv debug`",
            value:
              "Compile et lance le programme sous le débogueur.",
          },
          {
            label: "`break main.go:12`",
            value:
              "Pose un point d'arrêt à la ligne 12.",
          },
          {
            label: "`continue`, `next`, `step`",
            value:
              "Reprendre, avancer d'une ligne (sans entrer), entrer dans l'appel.",
          },
          {
            label: "`print maVariable`",
            value:
              "Inspecte une variable au point d'arrêt.",
          },
          {
            label: "`goroutines`",
            value:
              "Liste les goroutines actives — précieux pour les bugs de concurrence.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : `go run -race` (détecteur de races, souvent plus utile qu'un débogueur pour la concurrence), logs structurés (`log/slog`), tests tabulaires pour reproduire un bug avant de le corriger.",
      },
    ],
  },
  {
    id: "stdlib-essentielle",
    title: "La bibliothèque standard essentielle",
    level: 3,
    intro: "Les paquets à connaître — la doc de référence est sur pkg.go.dev.",
    blocks: [
      {
        kind: "table",
        headers: ["Paquet", "Rôle", "Exemple d'usage"],
        rows: [
          ["net/http", "Client et serveur HTTP", "API, serveurs web sans framework"],
          ["encoding/json", "Sérialisation JSON", "API REST, fichiers de config"],
          ["os", "Système : fichiers, env, args", "`os.ReadFile`, `os.Getenv`, `os.Args`"],
          ["io", "Abstractions de flux", "Lecture/écriture générique (`io.Reader`)"],
          ["context", "Annulation et deadlines", "Propager l'annulation dans les appels"],
          ["time", "Temps, durées, timers", "Timeouts, `time.Sleep`, `time.After`"],
          ["sync", "Primitives de concurrence", "`Mutex`, `WaitGroup`, `Once`"],
          ["errors", "Création d'erreurs", "`errors.New`, `errors.Is`/`As`"],
          ["fmt", "Formatage et affichage", "`Printf`, `Sprintf`, `Errorf`"],
          ["log` / `log/slog`", "Journalisation", "Logs simples / logs structurés"],
          ["strings", "Manipulation de chaînes", "`Contains`, `Split`, `Builder`"],
          ["slices` / `maps`", "Utilitaires génériques", "Tri, recherche, `slices.Sort`"],
          ["flag", "Arguments CLI", "Parsing des flags `--port=8080`"],
          ["embed", "Inclure des fichiers", "Embarquer HTML/config dans le binaire"],
          ["database/sql", "Interface SQL générique", "Accès BDD via un driver"],
          ["testing", "Tests et benchmarks", "`TestXxx`, `BenchmarkXxx`, `t.Run`"],
        ],
      },
      {
        kind: "text",
        text: "Philosophie : avant d'ajouter une dépendance externe, vérifiez si la stdlib couvre le besoin. Les projets Go ont typiquement très peu de dépendances — c'est un choix de maintenabilité, pas une mode.",
      },
    ],
  },
  {
    id: "context-annulation",
    title: "`context` : annulation et deadlines",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "Un `context.Context` transporte un signal d'annulation (et une deadline) à travers les appels : quand il est annulé, tout le travail en aval doit s'arrêter.",
      },
      {
        kind: "text",
        text: "Éviter le travail inutile : si le client HTTP a raccroché ou si le timeout est dépassé, inutile de continuer à interroger la base de données.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value:
              "Fonctions d'I/O, requêtes réseau, traitements longs : le `ctx` est conventionalement le PREMIER paramètre (`func Faire(ctx context.Context, ...)`).",
          },
          {
            label: "Exemple réel",
            value:
              "Un handler HTTP reçoit `r.Context()` : si l'utilisateur annule sa requête, la requête SQL lancée avec ce contexte est interrompue côté driver.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Stocker des données métier dans le contexte au lieu de les passer en paramètres : le contexte transporte des signaux et des valeurs de requête (request-scoped), pas votre modèle.",
          },
          {
            label: "Bonne pratique",
            value:
              "Créez avec `context.WithTimeout` / `WithCancel`, appelez TOUJOURS la fonction `cancel` retournée (via `defer`), et surveillez `ctx.Done()` dans les boucles longues.",
          },
        ],
      },
      {
        kind: "code",
        language: "go",
        title: "Timeout sur un traitement",
        code: "func Traiter(ctx context.Context) error {\n\t// Annule automatiquement après 3 secondes.\n\tctx, cancel := context.WithTimeout(ctx, 3*time.Second)\n\tdefer cancel() // libère les ressources, toujours\n\n\tselect {\n\tcase <-travailTermine:\n\t\treturn nil\n\tcase <-ctx.Done():\n\t\treturn ctx.Err() // context.DeadlineExceeded ou Canceled\n\t}\n}",
      },
    ],
  },
  {
    id: "json-tags",
    title: "JSON : structs et tags",
    level: 3,
    blocks: [
      {
        kind: "text",
        text: "Le paquet `encoding/json` convertit structs ↔ JSON. Les tags struct (`` `json:\"nom\"` ``) contrôlent les noms des champs ; seuls les champs exportés (majuscule) sont sérialisés.",
      },
      {
        kind: "code",
        language: "go",
        title: "Sérialisation idiomatique",
        code: "type Utilisateur struct {\n\tNom  string `json:\"nom\"`\n\tAge  int    `json:\"age,omitempty\"` // omis si zéro\n\tmdp  string // privé : jamais sérialisé\n}\n\nu := Utilisateur{Nom: \"Aina\", Age: 30}\ndonnees, err := json.Marshal(u) // → {\"nom\":\"Aina\",\"age\":30}\nif err != nil {\n\treturn err\n}\n\nvar lu Utilisateur\nif err := json.Unmarshal(donnees, &lu); err != nil {\n\treturn err\n}",
      },
      {
        kind: "text",
        text: "Erreurs fréquentes : oublier qu'un champ privé est ignoré silencieusement ; ne pas tester l'erreur de `Unmarshal` sur des données externes (une API peut changer de format). Concepts liés : visibilité (majuscules), gestion d'erreurs, serveur HTTP stdlib.",
      },
    ],
  },
  {
    id: "serveur-http-stdlib",
    title: "Serveur HTTP avec la seule stdlib",
    level: 3,
    intro: "Pas besoin de framework pour une API simple.",
    blocks: [
      {
        kind: "code",
        language: "go",
        title: "API JSON en ~30 lignes",
        code: "package main\n\nimport (\n\t\"encoding/json\"\n\t\"log\"\n\t\"net/http\"\n)\n\nfunc sante(w http.ResponseWriter, r *http.Request) {\n\tw.Header().Set(\"Content-Type\", \"application/json\")\n\tjson.NewEncoder(w).Encode(map[string]string{\"statut\": \"ok\"})\n}\n\nfunc main() {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"GET /sante\", sante) // routage avec méthode (Go 1.22+)\n\n\tlog.Println(\"écoute sur :8080\")\n\tif err := http.ListenAndServe(\":8080\", mux); err != nil {\n\t\tlog.Fatal(err)\n\t}\n}",
      },
      {
        kind: "command",
        label: "Lancer et tester",
        command: "go run .",
        why: "Démarre le serveur sur le port 8080. Testez ensuite avec `curl http://localhost:8080/sante` dans un autre terminal.",
        verify: "`curl` répond `{\"statut\":\"ok\"}`.",
      },
      {
        kind: "text",
        text: "Depuis Go 1.22, le routeur stdlib gère les motifs avec méthode (`\"GET /sante\"`) et paramètres (`\"GET /users/{id}\"`). Pour beaucoup d'API, cela suffit — les frameworks n'apportent un vrai plus que pour le middleware complexe, la validation ou le volume de routes.",
      },
    ],
  },
  {
    id: "data-races",
    title: "Détecter les races avec `-race`",
    level: 3,
    blocks: [
      {
        kind: "command",
        label: "Exécuter avec le détecteur de races",
        command: "go test -race ./...",
        why: "Instrumente le binaire pour détecter les accès concurrents non synchronisés à la même mémoire (data races) pendant les tests. Un data race est un bug réel même s'il ne plante pas aujourd'hui.",
        verify: "Soit `ok` partout, soit un rapport `WARNING: DATA RACE` avec les deux piles d'accès fautives.",
      },
      {
        kind: "text",
        text: "Bonne pratique : activez `-race` en CI systématiquement. Le surcoût (mémoire, CPU) le rend inadapté à la production, mais en test c'est le filet le plus rentable contre les bugs de concurrence — avec les tests tabulaires qui exercent le code concurrent.",
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les idiomes qui font le « bon Go ».",
    blocks: [
      {
        kind: "fields",
        title: "Le manifeste du code idiomatique",
        fields: [
          {
            label: "Gérez chaque erreur",
            value:
              "Pas d'erreur ignorée silencieusement (`_ =`). Si elle est vraiment sans importance, commentez pourquoi.",
          },
          {
            label: "Acceptez des interfaces, retournez des structs",
            value:
              "Les paramètres en interfaces petites rendent le code testable ; les retours concrets restent simples à utiliser.",
          },
          {
            label: "Noms courts et clairs",
            value:
              "Variables courtes dans les petites portées (`i`, `u`, `err`), noms explicites dans les API publiques. Pas de `getX`/`setX` : préférez `u.Nom()` et `u.SetNom()`.",
          },
          {
            label: "Zéro `gofmt` à discuter",
            value:
              "Le formatage est automatique : ne le retouchez jamais à la main, ne le débattez jamais en revue.",
          },
          {
            label: "Commentaires = documentation",
            value:
              "Tout identifiant exporté a un commentaire commençant par son nom (`// Addition retourne...`). `go doc` et pkg.go.dev les affichent.",
          },
          {
            label: "Évitez l'état global mutable",
            value:
              "Injectez les dépendances (structs, interfaces) plutôt que des variables globales : testabilité et concurrence préservées.",
          },
          {
            label: "Petits packages, responsabilités claires",
            value:
              "Un package = un sujet. Évitez le package fourre-tout `util` : nommez par domaine (`facturation`, `notification`).",
          },
          {
            label: "Lisez « Effective Go »",
            value:
              "Le document officiel (go.dev/doc/effective_go) est la référence des idiomes : 30 minutes de lecture qui évitent des mois de mauvais réflexes.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques des développeurs Go, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Ignorer une erreur avec `_`",
            value:
              "Problem : `f, _ := os.Open(...)` masque l'échec ; le programme continue avec une valeur invalide. Why : paresse ou « ça ne peut pas échouer ». Bad example : ouvrir un fichier de config sans tester l'erreur, puis panic plus loin sur `nil`. Better : toujours `if err != nil`, au minimum avec un log.",
          },
          {
            label: "`append` sans réassigner",
            value:
              "Problem : `append(s, x)` seul ne modifie pas forcément `s` (réallocation possible). Why : on croit à une modification en place. Bad example : construire une liste dans une boucle sans `s = append(s, x)` — la liste reste vide. Better : toujours réassigner le résultat de `append`.",
          },
          {
            label: "Écrire dans une map `nil`",
            value:
              "Problem : `var m map[string]int; m[\"a\"] = 1` → panic « assignment to entry in nil map ». Why : une map déclarée sans initialisation est `nil` (la lecture marche, pas l'écriture). Better : `m := make(map[string]int)` ou un littéral.",
          },
          {
            label: "Goroutine qui fuit",
            value:
              "Problem : une goroutine bloquée à jamais sur un channel (pas de lecteur, pas d'annulation) — fuite mémoire/lente. Why : aucun mécanisme d'arrêt prévu. Better : toujours une sortie (`ctx.Done()`, channel fermé par l'émetteur) et `go vet`/`-race` en CI.",
          },
          {
            label: "Variable de boucle capturée (avant Go 1.22)",
            value:
              "Problem : `for _, u := range urls { go func() { use(u) }() }` — avant Go 1.22, la variable était partagée entre itérations : toutes les goroutines voyaient la dernière valeur. Why : sémantique historique. Better : depuis Go 1.22 chaque itération a sa propre variable ; avant, on passait `u` en paramètre (comme dans l'exemple de la section goroutines).",
          },
          {
            label: "Comparer les erreurs avec `==`",
            value:
              "Problem : `if err == io.EOF` rate les erreurs enveloppées avec `%w`. Why : habitude d'autres langages. Bad example : un `fmt.Errorf(\"...: %w\", io.EOF)` n'est plus `== io.EOF`. Better : `errors.Is(err, io.EOF)` et `errors.As` pour les types.",
          },
          {
            label: "Oublier `resp.Body.Close()`",
            value:
              "Problem : chaque réponse HTTP non fermée fuit une connexion — le client finit par ne plus pouvoir se connecter. Why : on pense au corps, pas à la connexion sous-jacente. Better : `defer resp.Body.Close()` immédiatement après avoir vérifié `err`.",
          },
          {
            label: "Shadowing avec `:=`",
            value:
              "Problem : `x := 1; if ok { x := 2 }; ` — le second `x` est une NOUVELLE variable limitée au bloc, l'original reste à 1. Why : `:=` crée dès qu'une variable à gauche est nouvelle. Better : utilisez `=` pour réassigner quand la variable existe déjà ; `go vet` signale certains cas.",
          },
          {
            label: "Copier un verrou par valeur",
            value:
              "Problem : passer un `sync.Mutex` ou `sync.WaitGroup` en argument par valeur copie son état interne — la synchronisation est silencieusement cassée. Why : on ne voit pas le danger dans la signature. Better : toujours par pointeur (`*sync.Mutex`) ; `go vet` détecte les copies suspectes.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes et progressifs",
    level: 3,
    intro: "Quatre paliers, chacun réutilisant les acquis du précédent.",
    blocks: [
      {
        kind: "fields",
        title: "Les 4 projets",
        fields: [
          {
            label: "1. CLI utilitaire (niveau : facile)",
            value:
              "Compétences : `flag`, `os`, `io`, gestion d'erreurs. Réalisez un outil en ligne de commande : compteur de mots/lignes d'un fichier, ou renommeur par lots avec mode dry-run. Apprentissages : arguments, codes de sortie, erreurs explicites. Projet suivant : le serveur HTTP.",
          },
          {
            label: "2. Serveur HTTP avec la stdlib (niveau : intermédiaire)",
            value:
              "Compétences : `net/http`, `encoding/json`, routage stdlib. Réalisez un petit serveur : API de notes (CRUD en mémoire puis persistée en JSON sur disque), logging des requêtes, gestion propre des erreurs (codes HTTP adaptés). Apprentissages : handlers, mux, sérialisation. Projet suivant : l'API REST testée.",
          },
          {
            label: "3. API REST complète et testée (niveau : intermédiaire+)",
            value:
              "Compétences : tests tabulaires, `context` avec timeout, `go vet`, `-race`. Reprenez le serveur : ajoutez une vraie persistance (fichier ou SQLite via `database/sql`), des tests tabulaires sur chaque handler, un middleware de logging/récupération de panic, et un arrêt gracieux (`http.Server` + `signal.NotifyContext`). Apprentissages : qualité pro, testabilité. Projet suivant : le service complet.",
          },
          {
            label: "4. Service complet déployable (niveau : avancé)",
            value:
              "Compétences : configuration par environnement, goroutines/workers, cross-compilation, CI. Réalisez un service qui consomme une file ou une API en continu avec des workers (channels + `WaitGroup`), configuration via variables d'environnement, `Dockerfile` multi-stage (build Go → image `scratch` + binaire), pipeline CI (`gofmt`, `go vet`, `go test -race`), binaire cross-compilé pour le serveur cible. Apprentissages : le cycle complet dev → prod d'un service Go.",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode : pour chaque projet, écrivez d'abord le test tabulaire du comportement attendu, puis l'implémentation minimale, puis lancez `gofmt -l . && go vet ./... && go test -race ./...`. Cette discipline « format → vet → test » est exactement le workflow professionnel de la section niveau 2.",
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Où approfondir, par ordre de fiabilité.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "go.dev — documentation officielle",
            value:
              "La référence absolue : guide d'installation, documentation du langage, et surtout « Effective Go » (les idiomes) et le « Tour of Go » (apprentissage interactif dans le navigateur). Quand deux sources se contredisent, c'est elle qui a raison.",
          },
          {
            label: "A Tour of Go (go.dev/tour)",
            value:
              "Le tutoriel interactif officiel : chaque concept s'essaie directement dans le navigateur, sans rien installer. Le meilleur « second pas » après cette page.",
          },
          {
            label: "Effective Go (go.dev/doc/effective_go)",
            value:
              "Le document qui enseigne à écrire du Go idiomatique : formatage, noms, interfaces, concurrence. Lecture courte, impact durable.",
          },
          {
            label: "pkg.go.dev",
            value:
              "La documentation de chaque paquet, stdlib et tiers : signatures, exemples, versions. Le réflexe avant d'utiliser un paquet inconnu.",
          },
          {
            label: "Le blog Go (go.dev/blog)",
            value:
              "Annonces de versions et articles de fond de l'équipe Go (ex. les raisons des choix de conception). Utile pour comprendre le « pourquoi » du langage.",
          },
          {
            label: "Communautés",
            value:
              "Pour les questions concrètes : Stack Overflow (réponses validées) et le forum officiel. Vérifiez toujours la date et la version de Go concernée : le langage évolue (génériques en 1.18, routage en 1.22).",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode de recherche efficace : commencez toujours par pkg.go.dev pour un paquet (`pkg.go.dev/net/http`), la page contient des exemples testés. Méfiez-vous des tutoriels qui placent encore le code dans `GOPATH/src` : ils datent d'avant les modules.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Prolonger après Go selon votre direction.",
    blocks: [
      {
        kind: "fields",
        fields: [
          {
            label: "Backend et API",
            value:
              "Approfondissez `database/sql` + un driver (PostgreSQL/MySQL), l'authentification (JWT, sessions), et les middlewares. La stdlib suffit longtemps ; n'adoptez un routeur tiers que sur un besoin mesuré.",
          },
          {
            label: "Systèmes et performance",
            value:
              "Profiling (`pprof`), optimisation mémoire, `cgo` pour interfacer du C quand c'est justifié, et lecture du code source de la stdlib — une excellente école.",
          },
          {
            label: "DevOps et cloud",
            value:
              "Docker multi-stage, Kubernetes (dont le code est en Go), CI/CD : l'écosystème naturel des binaires uniques. Écrire vos outils d'ops en Go boucle la boucle.",
          },
          {
            label: "Autre langage",
            value:
              "Rust pour la programmation système avec garanties mémoire à la compilation, ou Python pour le scripting et la data : Go vous a donné le réflexe du typage statique et de la simplicité explicite.",
          },
        ],
      },
    ],
  },
];

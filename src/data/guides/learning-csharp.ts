import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de C# : de zéro à un usage professionnel avec .NET.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : le SDK et la CLI `dotnet` d'abord, le modèle d'exécution
 * (CLR/JIT) avant la syntaxe, puis le système de types, LINQ, l'async,
 * Entity Framework Core et l'outillage professionnel.
 */
export const LEARNING_CSHARP: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est C#, ce que .NET apporte, et où ce langage s'utilise dans le monde professionnel.",
    blocks: [
      {
        kind: "text",
        text: "C# (prononcé « C sharp ») est un langage de programmation moderne, orienté objet et à typage statique, créé par Microsoft et aujourd'hui open source. Il est le langage principal de la plateforme .NET, qui permet de construire des applications console, des API web, des applications desktop, des jeux (avec Unity) et des applications mobiles.",
      },
      {
        kind: "text",
        text: "Point essentiel : C# et .NET sont deux choses différentes. C# est le langage (la syntaxe que vous écrivez) ; .NET est la plateforme d'exécution (le SDK pour compiler, les bibliothèques, le runtime qui exécute le code). On peut écrire du C# uniquement avec .NET — et .NET accepte aussi d'autres langages comme F# ou Visual Basic.",
      },
      {
        kind: "fields",
        title: "C# en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "C# est un langage statiquement typé, lisible et productif, qui tourne sur le runtime .NET multiplateforme (Windows, macOS, Linux).",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Offrir la productivité d'un langage moderne (inférence de types, LINQ, async/await) avec la robustesse du typage statique et les performances d'un runtime optimisé — sans la verbosité historique de Java ni la complexité manuelle du C++.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "API et backends web (ASP.NET Core), applications d'entreprise, outils en ligne de commande, jeux avec Unity, applications desktop Windows, services cloud sur Azure.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un langage de script (le code est compilé), ni réservé à Windows (depuis .NET Core, il est pleinement multiplateforme), ni un simple « Java de Microsoft » : LINQ, les propriétés et le pattern matching lui sont propres.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Standardisé (ECMA-334) et open source : le compilateur Roslyn et le runtime .NET sont développés publiquement sur GitHub.",
          "Une version majeure par an, livrée avec .NET (en novembre) : le langage évolue vite, mais chaque version reste compatible avec la précédente.",
          "Écosystème unifié : un seul SDK (`dotnet`) pour compiler, tester, packager et publier sur toutes les plateformes.",
        ],
      },
    ],
  },
  {
    id: "modele-execution",
    title: "Le modèle d'exécution : compilation puis JIT",
    level: 1,
    intro:
      "La seule idée à retenir avant la syntaxe : votre code C# est compilé deux fois — une fois par vous, une fois par le runtime.",
    blocks: [
      {
        kind: "diagram",
        title: "Du fichier .cs à l'exécution",
        lines: [
          "Code source (fichiers .cs)",
          "     │",
          "     ▼",
          "Compilateur Roslyn (inclus dans le SDK)",
          "     │  produit du langage intermédiaire (IL)",
          "     ▼",
          "Assemblage (.dll) — indépendant de la plateforme",
          "     │",
          "     ▼  au lancement de l'application",
          "CLR — Common Language Runtime",
          "     │  compilation JIT (Just-In-Time) vers le code machine",
          "     ▼",
          "Code natif exécuté par le processeur",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : quand vous lancez `dotnet build`, le compilateur vérifie vos types et produit un assemblage en langage intermédiaire (IL). Quand vous lancez l'application, le CLR compile ce IL en code machine optimisé pour votre processeur, juste à temps. C'est ce qui permet au même `.dll` de tourner sur Windows, macOS et Linux : seule la dernière étape dépend de la machine.",
      },
      {
        kind: "fields",
        title: "Vocabulaire du runtime",
        fields: [
          {
            label: "SDK vs runtime",
            value:
              "Le SDK contient tout pour développer (compilateur, CLI `dotnet`, bibliothèques). Le runtime seul suffit pour exécuter une application déjà compilée — c'est ce qu'on installe sur un serveur.",
          },
          {
            label: "CLR",
            value:
              "Common Language Runtime : le moteur qui exécute le IL, gère la mémoire (ramasse-miettes) et compile en JIT. C'est le cœur de .NET.",
          },
          {
            label: "JIT",
            value:
              "Just-In-Time : compilation du IL vers le code natif au moment de l'exécution, avec optimisations adaptées à la machine réelle.",
          },
          {
            label: "Native AOT",
            value:
              "Option de publication (depuis .NET 7) qui compile directement en binaire natif : démarrage plus rapide, sans JIT. Utile pour les CLI et les fonctions serverless, avec quelques contraintes.",
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
      "C# est accessible aux débutants, mais quelques bases rendent l'apprentissage beaucoup plus fluide.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il vaut mieux connaître",
        fields: [
          {
            label: "Logique de programmation",
            value:
              "Variables, conditions, boucles, fonctions — dans n'importe quel langage. Si vous venez de Python ou JavaScript, la syntaxe C# vous semblera familière.",
          },
          {
            label: "Ligne de commande",
            value:
              "Savoir ouvrir un terminal et naviguer entre dossiers : la CLI `dotnet` est l'outil central du développeur C#.",
          },
          {
            label: "Notions d'orienté objet",
            value:
              "Classes, objets, héritage : utiles mais pas obligatoires au jour un — ce guide les introduit progressivement.",
          },
          {
            label: "Non requis",
            value:
              "Aucune connaissance de Windows ou de l'écosystème Microsoft. .NET est multiplateforme et open source.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-sdk",
    title: "Installation : le SDK .NET",
    level: 2,
    intro:
      "Une seule installation suffit : le SDK .NET contient le compilateur, la CLI et les bibliothèques.",
    blocks: [
      {
        kind: "text",
        text: "Téléchargez le SDK .NET depuis le site officiel (dotnet.microsoft.com) ou via votre gestionnaire de paquets (`winget`, `brew`, `apt` selon votre système). Prenez la version LTS (support long terme) sauf besoin spécifique : c'est la version recommandée pour apprendre et pour la production.",
      },
      {
        kind: "command",
        label: "Vérifier l'installation du SDK",
        command: "dotnet --version",
        why: "Affiche la version du SDK installé (par exemple `9.0.100`). Si la commande est introuvable, le SDK n'est pas installé ou pas dans le PATH.",
        verify: "Le terminal affiche un numéro de version sans erreur.",
      },
      {
        kind: "command",
        label: "Lister les SDK et runtimes installés",
        command: "dotnet --list-sdks",
        why: "Affiche tous les SDK installés côte à côte. Plusieurs versions peuvent coexister : chaque projet choisit la sienne via son fichier projet.",
      },
      {
        kind: "fields",
        title: "SDK, runtime, targeting pack : qui fait quoi",
        fields: [
          {
            label: "SDK",
            value:
              "Kit de développement : compilateur Roslyn, CLI `dotnet`, modèles de projet, bibliothèques. À installer sur votre machine de développement.",
          },
          {
            label: "Runtime",
            value:
              "Moteur d'exécution seul (CLR + bibliothèques) : suffit pour faire tourner une application compilée, par exemple sur un serveur ou dans un conteneur.",
          },
          {
            label: "LTS vs STS",
            value:
              "LTS (Long Term Support, 3 ans) : la version stable recommandée. STS (Standard Term Support, 18 mois) : les nouveautés. Pour apprendre, prenez la LTS.",
          },
        ],
      },
    ],
  },
  {
    id: "choisir-editeur",
    title: "Choisir son éditeur",
    level: 2,
    intro:
      "Trois environnements dominent le développement C# : chacun a un profil type, aucun n'est le « meilleur » dans l'absolu.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois options, par profil",
        fields: [
          {
            label: "Visual Studio (Windows, macOS)",
            value:
              "L'IDE complet de Microsoft, gratuit en édition Community (pour les particuliers, l'open source et les petites équipes). Le plus intégré : débogueur, designer, profilage. Profil : développement .NET à plein temps sur Windows, projets d'entreprise.",
          },
          {
            label: "VS Code + extension C#",
            value:
              "Éditeur léger et gratuit, multiplateforme. L'extension « C# » (Microsoft) apporte IntelliSense, débogage et gestion de projets. Profil : polyvalence (plusieurs langages), machines modestes, préférence pour un éditeur configurable.",
          },
          {
            label: "JetBrains Rider",
            value:
              "IDE multiplateforme (Windows, macOS, Linux) réputé pour sa navigation et ses refactorings. Payant avec période d'essai. Profil : développeurs habitués aux IDE JetBrains, travail multiplateforme exigeant.",
          },
        ],
      },
      {
        kind: "text",
        text: "Quel que soit l'éditeur, le travail réel passe par la CLI `dotnet` (création, compilation, tests) : l'éditeur est une surcouche de confort. Apprenez les commandes `dotnet` même si votre IDE propose des boutons équivalents — c'est ce qui fonctionne partout, y compris en CI et sur serveur.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet : une application console",
    level: 2,
    intro:
      "Créez et lancez votre premier programme C# en cinq étapes, entièrement en ligne de commande.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le projet",
            detail:
              "La commande `dotnet new console -n MaPremiereApp` génère un dossier contenant un projet console minimal : un fichier `Program.cs` et un fichier projet `MaPremiereApp.csproj`.",
          },
          {
            title: "Entrer dans le dossier",
            detail:
              "Déplacez-vous dans `MaPremiereApp` : c'est là que les commandes `dotnet` suivantes s'exécuteront.",
          },
          {
            title: "Lire le code généré",
            detail:
              "Ouvrez `Program.cs` : il contient `Console.WriteLine(\"Hello, World!\");`. Depuis C# 9, les instructions de premier niveau remplacent le cérémonial `class Program { static void Main() }`.",
          },
          {
            title: "Compiler",
            detail:
              "`dotnet build` compile le projet et signale les erreurs. En cas de succès, l'assemblage est produit dans `bin/`.",
          },
          {
            title: "Exécuter",
            detail:
              "`dotnet run` compile si nécessaire puis lance le programme. Vous devez voir `Hello, World!` s'afficher.",
          },
        ],
      },
      {
        kind: "command",
        label: "Créer un projet console",
        command: "dotnet new console -n MaPremiereApp",
        why: "Génère un projet d'application console minimal à partir du modèle `console`. L'option `-n` donne le nom du projet et du dossier.",
        verify: "Un dossier `MaPremiereApp` contenant `Program.cs` et `MaPremiereApp.csproj` est créé.",
      },
      {
        kind: "command",
        label: "Compiler puis exécuter",
        command: "dotnet run",
        why: "Compile le projet du dossier courant (équivalent à `dotnet build` suivi de l'exécution) et lance le programme. À exécuter depuis le dossier du projet.",
        verify: "`Hello, World!` s'affiche dans le terminal.",
      },
    ],
  },
  {
    id: "cli-dotnet",
    title: "La CLI dotnet : les commandes du quotidien",
    level: 2,
    intro:
      "`dotnet` est le couteau suisse du développeur C# : mémorisez ces sept commandes et vous êtes autonome.",
    blocks: [
      {
        kind: "fields",
        title: "Les commandes essentielles",
        fields: [
          {
            label: "`dotnet new <modèle>`",
            value:
              "Crée un projet ou un fichier à partir d'un modèle : `console`, `classlib` (bibliothèque), `xunit` (projet de tests), `webapi` (API web), `mvc`, `blazor`, `worker`… Exemple : `dotnet new webapi -n MonApi`.",
          },
          {
            label: "`dotnet build`",
            value:
              "Compile le projet et ses dépendances. Signale les erreurs de compilation avec le fichier et la ligne. Options utiles : `-c Release` pour la configuration de production.",
          },
          {
            label: "`dotnet run`",
            value:
              "Compile (si besoin) et exécute l'application. Pour passer des arguments à votre programme : `dotnet run -- mon-arg`.",
          },
          {
            label: "`dotnet watch run`",
            value:
              "Relance automatiquement l'application à chaque modification de fichier, avec hot reload. La commande de la boucle de développement.",
          },
          {
            label: "`dotnet test`",
            value:
              "Compile la solution et exécute tous les projets de tests. La base de la vérification avant chaque commit.",
          },
          {
            label: "`dotnet add package <nom>`",
            value:
              "Ajoute une dépendance NuGet au projet (équivalent de `npm install`). Exemple : `dotnet add package Serilog`.",
          },
          {
            label: "`dotnet publish -c Release`",
            value:
              "Produit les fichiers prêts pour le déploiement (dans `bin/Release/.../publish`), optimisés et sans les outils de développement.",
          },
        ],
      },
      {
        kind: "command",
        label: "Développement avec rechargement automatique",
        command: "dotnet watch run",
        why: "Surveille les fichiers sources et redémarre l'application à chaque sauvegarde : c'est la boucle de feedback la plus rapide pour développer.",
        verify: "Modifiez un `Console.WriteLine` : le terminal affiche le nouveau texte sans relance manuelle.",
      },
    ],
  },
  {
    id: "anatomie-projet",
    title: "Anatomie d'un projet : Program.cs et .csproj",
    level: 2,
    intro:
      "Un projet C# minimal, c'est deux fichiers : le code et sa description.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Program.cs — instructions de premier niveau",
        code: "// Pas de classe ni de méthode Main explicites :\n// les instructions de premier niveau sont le point d'entrée.\nConsole.WriteLine(\"Bonjour depuis C# !\");\n\nvar nom = Console.ReadLine();\nConsole.WriteLine($\"Enchanté, {nom} !\");",
      },
      {
        kind: "code",
        language: "xml",
        title: "MaPremiereApp.csproj — le fichier projet",
        code: "<Project Sdk=\"Microsoft.NET.Sdk\">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net9.0</TargetFramework>\n    <Nullable>enable</Nullable>\n    <ImplicitUsings>enable</ImplicitUsings>\n  </PropertyGroup>\n\n</Project>",
      },
      {
        kind: "fields",
        title: "Lire le .csproj",
        fields: [
          {
            label: "`Sdk=\"Microsoft.NET.Sdk\"`",
            value:
              "Le type de projet : SDK standard pour console/bibliothèque. `Microsoft.NET.Sdk.Web` pour les applications web.",
          },
          {
            label: "`TargetFramework`",
            value:
              "La version de .NET ciblée (`net9.0`, `net8.0`…). Le SDK correspondant doit être installé pour compiler.",
          },
          {
            label: "`Nullable`",
            value:
              "Active les types référence nullables : le compilateur vous avertit des déréférencements potentiellement nuls. À toujours laisser activé.",
          },
          {
            label: "`ImplicitUsings`",
            value:
              "Ajoute automatiquement les `using` les plus courants (`System`, `System.Linq`…) : moins de cérémonial en début de fichier.",
          },
        ],
      },
    ],
  },
  {
    id: "nuget",
    title: "NuGet : le gestionnaire de paquets",
    level: 2,
    intro:
      "NuGet est le registre officiel des bibliothèques .NET : ajouter une dépendance prend une commande.",
    blocks: [
      {
        kind: "text",
        text: "Plutôt que de copier du code, on déclare des dépendances vers des paquets publiés sur nuget.org : logging, accès HTTP, mapping, tests… Le fichier `.csproj` enregistre chaque paquet avec sa version, et `dotnet restore` (exécuté automatiquement par `build` et `run`) les télécharge.",
      },
      {
        kind: "command",
        label: "Ajouter un paquet NuGet",
        command: "dotnet add package Serilog",
        why: "Ajoute la dernière version stable du paquet `Serilog` (bibliothèque de logging très répandue) aux dépendances du projet et la télécharge.",
        verify: "Une ligne `<PackageReference Include=\"Serilog\" Version=\"...\" />` apparaît dans le `.csproj`.",
      },
      {
        kind: "command",
        label: "Restaurer les dépendances",
        command: "dotnet restore",
        why: "Télécharge tous les paquets déclarés dans le projet. Utile après un `git clone` ou si le dossier des paquets a été supprimé.",
      },
      {
        kind: "list",
        items: [
          "Les paquets sont versionnés : `dotnet add package Serilog --version 3.1.1` fige une version précise.",
          "`dotnet list package` affiche les dépendances du projet et signale les mises à jour disponibles.",
          "Publier un paquet (`dotnet pack` puis `dotnet nuget push`) suit le même outillage : tout passe par la CLI.",
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "À quoi ressemble une journée de développement C# type, de l'édition au commit.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de développement",
        lines: [
          "1. Éditer le code (.cs)",
          "        │",
          "2. dotnet watch run   → feedback immédiat",
          "        │",
          "3. dotnet test        → les tests restent verts",
          "        │",
          "4. dotnet build -c Release → zéro avertissement",
          "        │",
          "5. git commit         → la CI prend le relais",
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : ne laissez jamais un avertissement du compilateur (`warning`) s'installer. Les projets sérieux activent `TreatWarningsAsErrors` : chaque avertissement devient une erreur de compilation, ce qui force un code propre en continu.",
      },
    ],
  },
  {
    id: "comprendre-erreurs",
    title: "Comprendre les erreurs : compilateur vs exceptions",
    level: 2,
    intro:
      "En C#, les erreurs se répartissent en deux familles : celles qui empêchent la compilation et celles qui surviennent à l'exécution.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux familles d'erreurs",
        fields: [
          {
            label: "Erreurs de compilation (CSxxxx)",
            value:
              "Le compilateur refuse de produire l'assemblage : `error CS1002: ; expected`. Chaque erreur a un code (CS1002, CS0165…) documenté sur learn.microsoft.com. Le message indique le fichier et la ligne : lisez-le en entier avant de chercher ailleurs.",
          },
          {
            label: "Exceptions (runtime)",
            value:
              "Le programme compile mais échoue à l'exécution : `System.NullReferenceException`. La trace (stack trace) liste les appels de méthodes jusqu'au point d'échec — lisez-la de haut en bas, la première ligne de votre code est la coupable.",
          },
          {
            label: "Avertissements (warnings)",
            value:
              "Le code compile mais le compilateur signale un risque (`warning CS8618: ...`). Ne les ignorez pas : un warning d'aujourd'hui est l'exception de demain.",
          },
        ],
      },
      {
        kind: "code",
        language: "csharp",
        title: "Lire une exception",
        code: "string? nom = null;\n// System.NullReferenceException: Object reference not set to an instance of an object.\nConsole.WriteLine(nom.Length); // <-- la ligne fautive : nom est null",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "syntaxe-bases",
    title: "Syntaxe de base : variables et types",
    level: 3,
    intro:
      "La déclaration explicite des types : la fondation de tout le reste.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Déclarations courantes",
        code: "int age = 30;                 // entier 32 bits\ndouble prix = 19.99;          // nombre à virgule flottante\ndecimal montant = 19.99m;     // décimal précis (monnaie) : suffixe m\nbool actif = true;            // booléen\nchar initiale = 'A';          // caractère unique : guillemets simples\nstring nom = \"Akane\";           // chaîne : guillemets doubles\nDateTime aujourdhui = DateTime.Today;",
      },
      {
        kind: "fields",
        title: "En une phrase, par concept",
        fields: [
          {
            label: "Typage statique",
            value:
              "Chaque variable a un type connu à la compilation : `int age = \"texte\"` ne compile pas. Le compilateur attrape les erreurs de type avant l'exécution.",
          },
          {
            label: "Pourquoi",
            value:
              "Détecter les incohérences au plus tôt, documenter les intentions dans le code, et permettre à l'IDE une complétion fiable.",
          },
          {
            label: "Quand s'en soucier",
            value:
              "Tout le temps : le système de types est le filet de sécurité principal du développeur C#. Apprenez à lire ses messages.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser `double` pour de l'argent : les flottants accumulent des erreurs d'arrondi. Pour la monnaie, `decimal` est le type correct.",
          },
        ],
      },
    ],
  },
  {
    id: "typage-statique-var",
    title: "Inférence avec `var` : typé, mais concis",
    level: 3,
    intro:
      "`var` ne rend pas C# dynamique : le type est déduit à la compilation et reste fixe.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "var en pratique",
        code: "var age = 30;            // int : déduit, pas dynamique\nvar nom = \"Akane\";       // string\n// age = \"texte\";        // ERREUR de compilation : age est un int\n\nvar clients = new List<string>(); // le type de droite rend var lisible",
      },
      {
        kind: "fields",
        title: "Règles d'usage",
        fields: [
          {
            label: "En une phrase",
            value:
              "`var` demande au compilateur de déduire le type depuis l'expression d'initialisation : le typage statique est préservé.",
          },
          {
            label: "Bonne pratique",
            value:
              "Utilisez `var` quand le type est évident depuis la droite (`new`, appel de méthode typée). Préférez le type explicite quand l'inférence masque l'intention (`var x = GetData();` : quel type ?).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Croire que `var` autorise à changer de type ensuite. Non : une fois déduit, le type est verrouillé comme une déclaration explicite.",
          },
          {
            label: "Concepts liés",
            value:
              "Typage statique, types anonymes (`new { Nom = \"x\" }` — utilisables uniquement via `var`), inférence des lambdas.",
          },
        ],
      },
    ],
  },
  {
    id: "valeur-vs-reference",
    title: "Types valeur vs types référence",
    level: 3,
    intro:
      "La distinction la plus importante du système de types : elle explique les copies, les `null` et bien des bugs.",
    blocks: [
      {
        kind: "diagram",
        title: "Deux façons de stocker une donnée",
        lines: [
          "TYPE VALEUR (struct, int, bool, DateTime)",
          "  variable ──► [ 30 ]        la donnée est DANS la variable",
          "  copie    ──► [ 30 ]        chaque copie est indépendante",
          "",
          "TYPE RÉFÉRENCE (class, string, List<T>)",
          "  variable ──► [adresse] ──► { objet sur le tas }",
          "  copie    ──► [adresse] ──► { même objet partagé }",
        ],
      },
      {
        kind: "code",
        language: "csharp",
        title: "La différence en code",
        code: "// Types valeur : la copie est indépendante\nint a = 10;\nint b = a;\nb = 20;\n// a vaut toujours 10\n\n// Types référence : la copie partage l'objet\nvar liste1 = new List<int> { 1, 2 };\nvar liste2 = liste1;\nliste2.Add(3);\n// liste1 contient aussi 3 : c'est le MÊME objet",
      },
      {
        kind: "fields",
        title: "Repères",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un type valeur contient directement sa donnée (copie = duplication) ; un type référence contient l'adresse d'un objet partagé (copie = alias).",
          },
          {
            label: "Pourquoi ça compte",
            value:
              "Passer un objet à une méthode ne le duplique pas : la méthode peut le modifier. C'est la source n°1 des effets de bord surprenants.",
          },
          {
            label: "Qui est quoi",
            value:
              "Valeur : `struct`, `int`, `double`, `decimal`, `bool`, `char`, `DateTime`, `enum`. Référence : `class`, `string`, `object`, tableaux, `List<T>`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Modifier une liste « copiée » par affectation et s'étonner que l'originale change. Pour une vraie copie : `new List<int>(liste1)` ou `liste1.ToList()`.",
          },
        ],
      },
    ],
  },
  {
    id: "nullable-reference-types",
    title: "Types référence nullables",
    level: 3,
    intro:
      "Le compilateur vous aide à éliminer la `NullReferenceException`, l'exception la plus célèbre de .NET.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "string vs string?",
        code: "// Avec <Nullable>enable</Nullable> dans le .csproj :\nstring nom = null!;      // warning : null assigné à un non-nullable\nstring? surnom = null;   // OK : le ? autorise explicitement null\n\nConsole.WriteLine(surnom.Length); // warning CS8602 : déréférencement possiblement nul\nConsole.WriteLine(surnom?.Length); // OK : ?. propage le null en sécurité",
      },
      {
        kind: "fields",
        title: "Comprendre le mécanisme",
        fields: [
          {
            label: "En une phrase",
            value:
              "Par défaut, un type référence n'est plus censé être `null` : le `?` marque explicitement les cas où `null` est légitime, et le compilateur vérifie chaque déréférencement.",
          },
          {
            label: "Pourquoi",
            value:
              "Faire du `null` un cas visible et vérifié plutôt qu'une surprise à l'exécution. C'est une analyse statique, sans coût au runtime.",
          },
          {
            label: "Opérateurs associés",
            value:
              "`?.` (accès conditionnel), `??` (coalescence : `nom ?? \"inconnu\"`), `??=` (assignation si null), `!` (suppression d'avertissement — à utiliser avec parcimonie).",
          },
          {
            label: "Bonne pratique",
            value:
              "Laissez `<Nullable>enable</Nullable>` activé dans tous vos projets et traitez chaque warning de nullabilité : c'est un contrat de qualité.",
          },
        ],
      },
    ],
  },
  {
    id: "chaines-interpolation",
    title: "Chaînes : interpolation et bonnes habitudes",
    level: 3,
    intro:
      "L'interpolation `$\"...\"` est la façon moderne et lisible de composer du texte.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Composer des chaînes",
        code: "var nom = \"Akane\";\nvar score = 1250;\n\n// Interpolation : lisible et sûre\nvar message = $\"Joueur {nom}, score : {score:N0} points\";\n// → \"Joueur Akane, score : 1 250 points\"\n\n// Chaîne multiligne\nvar sql = \"\"\"\n    SELECT * FROM Joueurs\n    WHERE Score > 1000\n    \"\"\";",
      },
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le préfixe `$` active l'interpolation : les expressions entre accolades sont évaluées et formatées dans la chaîne.",
          },
          {
            label: "Immuabilité",
            value:
              "Les `string` sont immuables : `texte.ToUpper()` renvoie une NOUVELLE chaîne, l'originale est inchangée. Oublier d'assigner le résultat est une erreur classique.",
          },
          {
            label: "Concaténation en boucle",
            value:
              "Dans une boucle, préférez `StringBuilder` à `+=` : chaque concaténation alloue une nouvelle chaîne.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Écrire `{nom}` sans le `$` devant la chaîne : les accolades restent littérales et aucune interpolation n'a lieu — sans erreur de compilation.",
          },
        ],
      },
    ],
  },
  {
    id: "operateurs-controle",
    title: "Opérateurs et structures de contrôle",
    level: 3,
    intro:
      "Les briques du flux d'exécution : conditions, boucles et le `switch` moderne.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Contrôle de flux idiomatique",
        code: "// Expression switch : retourne une valeur\nvar statut = score switch\n{\n    >= 1000 => \"Expert\",\n    >= 500 => \"Confirmé\",\n    _ => \"Débutant\",  // _ = cas par défaut\n};\n\n// Boucles\nfor (int i = 0; i < 3; i++) { /* ... */ }\nforeach (var joueur in joueurs) { /* ... */ }\nwhile (!fini) { /* ... */ }",
      },
      {
        kind: "list",
        items: [
          "`==` compare les valeurs pour les types valeur et les chaînes (l'opérateur est surchargé pour `string`) ; pour les objets, il compare les références sauf surcharge.",
          "Division entière : `5 / 2` vaut `2`, pas `2.5` — les deux opérandes sont des `int`. Écrivez `5 / 2.0` pour un résultat décimal.",
          "`&&` et `||` sont en court-circuit : la partie droite n'est évaluée que si nécessaire — pratique pour `if (x != null && x.Valide)`.",
          "`foreach` interdit de modifier la collection pendant l'itération (`InvalidOperationException`) : itérez sur `collection.ToList()` si vous devez modifier.",
        ],
      },
    ],
  },
  {
    id: "methodes-parametres",
    title: "Méthodes et paramètres",
    level: 3,
    intro:
      "Les paramètres `ref`/`out`, optionnels et nommés : la flexibilité des signatures C#.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Signatures expressives",
        code: "// Paramètres optionnels et nommés\nvoid Inscrire(string nom, int age = 18, bool premium = false) { /* ... */ }\nInscrire(\"Akane\", premium: true); // nom + valeurs par défaut, argument nommé\n\n// out : la méthode RENVOIE une valeur via le paramètre\nbool TryParseAge(string texte, out int age) { /* ... */ }\nif (int.TryParse(\"30\", out var valeur)) { /* valeur utilisable ici */ }\n\n// ref : la méthode peut MODIFIER la variable d'appel\nvoid Doubler(ref int x) { x *= 2; }",
      },
      {
        kind: "fields",
        title: "Quand utiliser quoi",
        fields: [
          {
            label: "Paramètres optionnels",
            value:
              "Quand la plupart des appelants utilisent la même valeur : évite la multiplication des surcharges.",
          },
          {
            label: "`out`",
            value:
              "Le motif `TryXxx` (`int.TryParse`, `dict.TryGetValue`) : renvoie `true`/`false` et la valeur via `out`, sans exception en cas d'échec.",
          },
          {
            label: "`ref`",
            value:
              "Rare : quand une méthode doit modifier une variable de l'appelant (souvent un type valeur). Préférez renvoyer une valeur dans le cas général.",
          },
          {
            label: "Expression-bodied",
            value:
              "Les méthodes courtes s'écrivent `int Double(int x) => x * 2;` : concis et idiomatique pour les one-liners.",
          },
        ],
      },
    ],
  },
  {
    id: "proprietes",
    title: "Propriétés et auto-propriétés",
    level: 3,
    intro:
      "En C#, on n'expose jamais un champ public : on expose une propriété.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Propriétés",
        code: "public class Joueur\n{\n    // Auto-propriété : le champ privé est généré\n    public string Pseudo { get; set; } = \"Anonyme\";\n\n    // init : assignable uniquement à la création\n    public Guid Id { get; init; } = Guid.NewGuid();\n\n    // Lecture seule calculée\n    public bool EstExpert => Score >= 1000;\n    public int Score { get; set; }\n}",
      },
      {
        kind: "fields",
        title: "Comprendre les propriétés",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une propriété est une paire d'accesseurs `get`/`set` qui s'utilise comme un champ mais encapsule la logique d'accès.",
          },
          {
            label: "Pourquoi pas un champ public",
            value:
              "La propriété permet d'ajouter plus tard validation, notification ou calcul sans casser les appelants : le champ public fige l'implémentation.",
          },
          {
            label: "`init`",
            value:
              "Depuis C# 9 : assignable uniquement lors de l'initialisation de l'objet — idéal pour les objets quasi immuables avec `new Joueur { Pseudo = \"x\" }`.",
          },
          {
            label: "`required`",
            value:
              "Depuis C# 11 : `public required string Pseudo { get; set; }` force l'appelant à fournir la valeur à la création — le compilateur vérifie.",
          },
        ],
      },
    ],
  },
  {
    id: "classes-objets",
    title: "Classes et objets",
    level: 3,
    intro:
      "Le cœur de la programmation orientée objet en C#.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Classe et instanciation",
        code: "public class CompteBancaire\n{\n    public string Titulaire { get; init; }\n    public decimal Solde { get; private set; }\n\n    public CompteBancaire(string titulaire, decimal soldeInitial)\n    {\n        Titulaire = titulaire;\n        Solde = soldeInitial;\n    }\n\n    public void Crediter(decimal montant)\n    {\n        if (montant <= 0) throw new ArgumentException(\"Montant positif requis\", nameof(montant));\n        Solde += montant;\n    }\n}\n\nvar compte = new CompteBancaire(\"Akane\", 100m);\ncompte.Crediter(50m);",
      },
      {
        kind: "fields",
        title: "Concepts clés",
        fields: [
          {
            label: "Encapsulation",
            value:
              "`Solde` a un `set` privé : seule la classe peut le modifier, via des méthodes qui valident. L'état reste cohérent.",
          },
          {
            label: "`nameof`",
            value:
              "`nameof(montant)` produit la chaîne `\"montant\"` vérifiée par le compilateur : si vous renommez le paramètre, le code suit.",
          },
          {
            label: "Types référence",
            value:
              "Une classe est un type référence : `var c2 = compte;` partage le même objet. Voir la section « Types valeur vs types référence ».",
          },
          {
            label: "Concepts liés",
            value:
              "Constructeurs, modificateurs d'accès, héritage, interfaces, records.",
          },
        ],
      },
    ],
  },
  {
    id: "constructeurs",
    title: "Constructeurs",
    level: 3,
    intro:
      "Garantir qu'un objet naît dans un état valide.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Constructeurs",
        code: "public class Rectangle\n{\n    public double Largeur { get; }\n    public double Hauteur { get; }\n\n    // Constructeur principal\n    public Rectangle(double largeur, double hauteur)\n    {\n        if (largeur <= 0 || hauteur <= 0)\n            throw new ArgumentException(\"Dimensions positives requises\");\n        Largeur = largeur;\n        Hauteur = hauteur;\n    }\n\n    // Constructeur secondaire qui délègue avec : this(...)\n    public Rectangle(double cote) : this(cote, cote) { }\n}",
      },
      {
        kind: "list",
        items: [
          "Sans constructeur déclaré, C# fournit un constructeur sans paramètres implicite — qui disparaît dès que vous en déclarez un.",
          "Validez les arguments dans le constructeur : un objet ne devrait jamais exister dans un état invalide.",
          "Les constructeurs primaires (`class Rectangle(double largeur, double hauteur)`) déclarent les paramètres directement sur la classe : concis pour les types simples.",
        ],
      },
    ],
  },
  {
    id: "heritage-interfaces",
    title: "Héritage et interfaces",
    level: 3,
    intro:
      "Deux mécanismes de réutilisation : l'héritage partage du code, l'interface définit un contrat.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Interface et implémentation",
        code: "public interface IRepository<T>\n{\n    T? GetById(int id);\n    void Save(T entity);\n}\n\npublic class JoueurRepository : IRepository<Joueur>\n{\n    public Joueur? GetById(int id) { /* ... */ return null; }\n    public void Save(Joueur entity) { /* ... */ }\n}",
      },
      {
        kind: "table",
        headers: ["", "Héritage (`class B : A`)", "Interface (`class C : I`)"],
        rows: [
          ["Relation", "« est un » (un `Cercle` est une `Forme`)", "« sait faire » (un service sait `Sauvegarder`)"],
          ["Réutilisation", "Hérite du code de la classe de base", "Aucun code hérité : contrat seul"],
          ["Nombre", "Une seule classe de base", "Autant d'interfaces que voulu"],
          ["Quand", "Hiérarchie naturelle et stable", "Capacités transverses, tests, injection de dépendances"],
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : préférez les interfaces (et la composition) à l'héritage profond. Une hiérarchie de plus de deux niveaux devient vite rigide : on hérite pour partager un comportement éprouvé, on implémente une interface pour déclarer une capacité.",
      },
    ],
  },
  {
    id: "modificateurs-acces",
    title: "Modificateurs d'accès",
    level: 3,
    intro:
      "Qui peut voir quoi : le contrôle de la visibilité, brique de l'encapsulation.",
    blocks: [
      {
        kind: "table",
        headers: ["Modificateur", "Visible depuis"],
        rows: [
          ["`public`", "Partout"],
          ["`private`", "Uniquement la classe (ou le membre) déclarante — défaut pour les membres"],
          ["`protected`", "La classe et ses classes dérivées"],
          ["`internal`", "Le même assemblage (projet) — défaut pour les types de premier niveau"],
          ["`protected internal` / `private protected`", "Combinaisons pour les cas avancés"],
        ],
      },
      {
        kind: "text",
        text: "Principe du moindre privilège : commencez toujours par le plus restrictif (`private`) et n'élargissez que si un besoin réel l'exige. Une API publique restreinte est plus facile à maintenir qu'une API trop ouverte qu'il faudra supporter indéfiniment.",
      },
    ],
  },
  {
    id: "records",
    title: "Records : des données immuables et comparables",
    level: 3,
    intro:
      "Le type idéal pour transporter des données : égalité par valeur, syntaxe minimale.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Records",
        code: "// Record positionnel : propriétés init-only générées\npublic record Joueur(string Pseudo, int Score);\n\nvar j1 = new Joueur(\"Akane\", 1250);\nvar j2 = new Joueur(\"Akane\", 1250);\nConsole.WriteLine(j1 == j2); // True : égalité par VALEUR, pas par référence\n\n// Copie non destructive avec une propriété modifiée\nvar j3 = j1 with { Score = 1300 };",
      },
      {
        kind: "fields",
        title: "Quand utiliser un record",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un `record` est une classe (ou struct) dont l'égalité compare les valeurs des propriétés, pensée pour les données immuables.",
          },
          {
            label: "Quand",
            value:
              "DTO d'API, résultats de requêtes, messages, clés de cache : tout objet dont l'identité EST ses données.",
          },
          {
            label: "`with`",
            value:
              "Crée une copie en modifiant certaines propriétés : l'original reste inchangé — la base de la programmation sans effet de bord.",
          },
          {
            label: "Classe vs record",
            value:
              "Classe : identité par référence, comportement riche. Record : identité par valeur, données. Le mauvais choix se paie en bugs d'égalité.",
          },
        ],
      },
    ],
  },
  {
    id: "pattern-matching",
    title: "Pattern matching : `is` et `switch`",
    level: 3,
    intro:
      "Tester la forme des données plutôt qu'enchaîner les `if`/`else` et les casts.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Filtrage par motif",
        code: "object donnee = GetDonnee();\n\n// is + déclaration : test ET cast en une fois\nif (donnee is string texte && texte.Length > 3)\n{\n    Console.WriteLine($\"Texte long : {texte}\");\n}\n\n// Switch sur le type avec gardes\nvar description = donnee switch\n{\n    int n when n < 0 => \"entier négatif\",\n    int => \"entier positif\",\n    string s => $\"chaîne de {s.Length} caractères\",\n    null => \"rien\",\n    _ => \"autre chose\",\n};",
      },
      {
        kind: "fields",
        title: "Pourquoi c'est puissant",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le pattern matching combine test de type, extraction de valeur et conditions dans une syntaxe déclarative.",
          },
          {
            label: "Exhaustivité",
            value:
              "Le compilateur avertit si un `switch` sur une énumération ou une hiérarchie oublie un cas : les oublis deviennent des erreurs de compilation.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le cast classique `(string)donnee` lève `InvalidCastException` si le type est mauvais. `is` teste sans risque : préférez-le systématiquement.",
          },
          {
            label: "Concepts liés",
            value:
              "Expressions `switch`, propriétés de motifs (`{ Score: > 1000 }`), hiérarchies de records.",
          },
        ],
      },
    ],
  },
  {
    id: "generiques",
    title: "Génériques : `List<T>`, `Dictionary<K,V>`",
    level: 3,
    intro:
      "Écrire du code typé qui fonctionne avec n'importe quel type : la base des collections .NET.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Génériques",
        code: "// Une méthode qui fonctionne pour tout type\nT Premier<T>(List<T> liste) => liste[0];\n\nvar premierNom = Premier(new List<string> { \"a\", \"b\" }); // string\nvar premierScore = Premier(new List<int> { 1, 2 });         // int\n\n// Contrainte : T doit être un type référence avec constructeur sans paramètres\npublic T Creer<T>() where T : class, new() => new T();",
      },
      {
        kind: "fields",
        title: "L'essentiel",
        fields: [
          {
            label: "En une phrase",
            value:
              "Les génériques paramètrent classes et méthodes par un type `T`, résolu à la compilation : sécurité des types sans duplication de code.",
          },
          {
            label: "Pourquoi",
            value:
              "Avant les génériques, les collections stockaient des `object` : chaque lecture exigeait un cast, source d'erreurs au runtime. `List<string>` ne contient QUE des chaînes, vérifié à la compilation.",
          },
          {
            label: "Contraintes (`where`)",
            value:
              "`where T : class` (référence), `where T : struct` (valeur), `where T : new()` (constructible), `where T : IComparable<T>` (comparable).",
          },
          {
            label: "Exemple réel",
            value:
              "Toutes les collections .NET (`List<T>`, `Dictionary<TKey,TValue>`, `HashSet<T>`), `Task<T>`, `Nullable<T>` (`int?`) sont génériques.",
          },
        ],
      },
    ],
  },
  {
    id: "collections",
    title: "Collections : List, Dictionary, tableaux",
    level: 3,
    intro:
      "Les trois conteneurs à connaître, et quand choisir chacun.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Les trois conteneurs",
        code: "// Tableau : taille fixe, accès par index\nint[] notes = { 12, 15, 9 };\n\n// List<T> : taille dynamique, le choix par défaut\nvar pseudos = new List<string> { \"Akane\", \"Rex\" };\npseudos.Add(\"Mia\");\n\n// Dictionary<K,V> : recherche par clé en temps quasi constant\nvar scores = new Dictionary<string, int>\n{\n    [\"Akane\"] = 1250,\n    [\"Rex\"] = 980,\n};\nif (scores.TryGetValue(\"Akane\", out var s)) { /* ... */ }",
      },
      {
        kind: "table",
        headers: ["Collection", "Quand l'utiliser", "Point d'attention"],
        rows: [
          ["Tableau `T[]`", "Taille connue et fixe, performance maximale", "Redimensionner coûte une recopie : préférez `List<T>` si la taille varie"],
          ["`List<T>`", "Choix par défaut pour une séquence modifiable", "L'insertion au début est coûteuse (décalage)"],
          ["`Dictionary<K,V>`", "Recherche par clé (identifiant, pseudo…)", "`TryGetValue` plutôt que l'indexeur pour éviter `KeyNotFoundException`"],
          ["`HashSet<T>`", "Unicité garantie, tests d'appartenance rapides", "Pas d'ordre, pas d'accès par index"],
        ],
      },
    ],
  },
  {
    id: "linq",
    title: "LINQ : interroger les collections",
    level: 3,
    intro:
      "La fonctionnalité signature de C# : des requêtes typées et lisibles sur n'importe quelle collection.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "LINQ en syntaxe méthode (la plus courante)",
        code: "var joueurs = new List<Joueur>\n{\n    new(\"Akane\", 1250), new(\"Rex\", 980), new(\"Mia\", 1420),\n};\n\nvar experts = joueurs\n    .Where(j => j.Score >= 1000)   // filtrer\n    .OrderByDescending(j => j.Score) // trier\n    .Select(j => j.Pseudo)           // projeter\n    .ToList();                       // matérialiser\n// → [ \"Mia\", \"Akane\" ]",
      },
      {
        kind: "fields",
        title: "Comprendre LINQ",
        fields: [
          {
            label: "En une phrase",
            value:
              "LINQ exprime filtrer/trier/projeter/regrouper comme des opérations enchaînées sur des séquences, avec des lambdas (`j => ...`).",
          },
          {
            label: "Pourquoi",
            value:
              "Remplacer des boucles `foreach` verbeuses et propices aux erreurs par des intentions déclaratives, vérifiées par le compilateur.",
          },
          {
            label: "Exécution différée",
            value:
              "Sans `ToList()` final, la requête ne s'exécute qu'à l'itération : elle voit les modifications ultérieures de la source. Matérialisez quand le résultat doit être figé.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Chaîner `Where(...).Count()` au lieu de `Count(predicat)` : fonctionne, mais la forme directe est plus lisible et parfois mieux optimisée.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Opérateurs à connaître : `Where`, `Select`, `OrderBy`/`ThenBy`, `First`/`FirstOrDefault`, `Any`, `All`, `Count`, `Sum`, `GroupBy`, `Distinct`, `Take`/`Skip`.",
          "`First()` lève une exception si la séquence est vide ; `FirstOrDefault()` renvoie `null` (ou la valeur par défaut) : choisissez selon que l'absence est un bug ou un cas normal.",
          "La syntaxe requête (`from j in joueurs where j.Score > 1000 select j`) est équivalente : la syntaxe méthode domine dans le code professionnel.",
          "LINQ fonctionne aussi sur les bases de données via Entity Framework Core : la même requête devient du SQL.",
        ],
      },
    ],
  },
  {
    id: "async-await",
    title: "`async`/`await` : l'asynchrone lisible",
    level: 3,
    intro:
      "Faire attendre le programme sans bloquer le thread : indispensable pour le réseau, les fichiers et les bases de données.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Async/await",
        code: "async Task<string> TelechargerAsync(string url)\n{\n    using var http = new HttpClient();\n    // await : pause la méthode SANS bloquer le thread,\n    // reprise quand le téléchargement termine\n    return await http.GetStringAsync(url);\n}\n\n// Appel : await dans une méthode async\nstring contenu = await TelechargerAsync(\"https://example.com\");",
      },
      {
        kind: "fields",
        title: "Le modèle mental",
        fields: [
          {
            label: "En une phrase",
            value:
              "`async` marque une méthode qui peut se mettre en pause ; `await` attend la fin d'une opération en libérant le thread entre-temps.",
          },
          {
            label: "Pourquoi",
            value:
              "Un serveur web traite des milliers de requêtes : bloquer un thread par requête en attente de la base de données gaspillerait les ressources. L'async libère le thread pendant l'attente.",
          },
          {
            label: "`Task` vs `void`",
            value:
              "`async Task` : la méthode peut être attendue et ses exceptions sont capturées. `async void` : à proscrire sauf pour les gestionnaires d'événements — les exceptions s'y perdent.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `await` : l'opération démarre mais la méthode continue sans attendre le résultat (warning CS4014). Le `Task` non attendu masque aussi les exceptions.",
          },
        ],
      },
    ],
  },
  {
    id: "exceptions",
    title: "Exceptions : signaler et gérer les échecs",
    level: 3,
    intro:
      "En .NET, les erreurs exceptionnelles se signalent par des exceptions, pas par des codes de retour.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Try/catch/finally",
        code: "try\n{\n    var contenu = File.ReadAllText(\"config.json\");\n}\ncatch (FileNotFoundException ex)\n{\n    Console.WriteLine($\"Fichier manquant : {ex.FileName}\");\n}\ncatch (IOException ex)\n{\n    Console.WriteLine($\"Erreur de lecture : {ex.Message}\");\n}\nfinally\n{\n    // Toujours exécuté : libération des ressources\n}",
      },
      {
        kind: "fields",
        title: "Règles d'usage",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une exception interrompt le flux normal et remonte la pile d'appels jusqu'à un `catch` capable de la traiter.",
          },
          {
            label: "Quand lever",
            value:
              "Pour les situations exceptionnelles (fichier manquant, réseau coupé). Pour les cas prévisibles, préférez `TryParse`, les retours nullables ou les types résultat.",
          },
          {
            label: "Bonne pratique",
            value:
              "Capturez le type le PLUS précis possible, ne capturez jamais `Exception` pour la masquer, et ne laissez jamais un `catch` vide : une erreur silencieuse est pire qu'un crash.",
          },
          {
            label: "Lever correctement",
            value:
              "Dans un `catch`, utilisez `throw;` (seul) pour relancer en conservant la pile d'appels d'origine — pas `throw ex;` qui l'efface.",
          },
        ],
      },
    ],
  },
  {
    id: "delegates-events",
    title: "Délégués et événements",
    level: 3,
    intro:
      "Passer des méthodes comme des valeurs : la base des callbacks et des événements .NET.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Func, Action et event",
        code: "// Func<T, TResult> : méthode qui prend un T et renvoie un TResult\nFunc<int, int> doubler = x => x * 2;\n\n// Action : méthode sans valeur de retour\nAction<string> logger = msg => Console.WriteLine($\"[LOG] {msg}\");\n\n// Événement : notification aux abonnés\npublic class Compteur\n{\n    public event Action<int>? ValeurChangee;\n    public void Incrementer()\n    {\n        ValeurChangee?.Invoke(1); // notifie les abonnés, sans risque si aucun\n    }\n}",
      },
      {
        kind: "fields",
        title: "Repères",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un délégué est un type qui représente une méthode : on le stocke, on le passe en paramètre, on l'invoque.",
          },
          {
            label: "Pourquoi",
            value:
              "C'est le mécanisme derrière LINQ (`Where(j => ...)` prend un `Func<Joueur, bool>`), les callbacks et tout le modèle d'événements des UI.",
          },
          {
            label: "`event`",
            value:
              "Un délégué exposé comme événement ne peut être déclenché que par sa classe : les abonnés s'ajoutent avec `+=`, se retirent avec `-=` — sans pouvoir le déclencher eux-mêmes.",
          },
          {
            label: "Concepts liés",
            value:
              "Lambdas, LINQ, `EventHandler`, async callbacks.",
          },
        ],
      },
    ],
  },
  {
    id: "enums",
    title: "Énumérations",
    level: 3,
    intro:
      "Remplacer les constantes magiques par des noms typés et vérifiés.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Enums",
        code: "public enum NiveauDifficulte\n{\n    Facile,   // 0\n    Moyen,    // 1\n    Difficile // 2\n}\n\nvoid Jouer(NiveauDifficulte niveau)\n{\n    var texte = niveau switch\n    {\n        NiveauDifficulte.Facile => \"détente\",\n        NiveauDifficulte.Moyen => \"équilibré\",\n        NiveauDifficulte.Difficile => \"extrême\",\n        _ => throw new ArgumentOutOfRangeException(nameof(niveau)),\n    };\n}",
      },
      {
        kind: "text",
        text: "Bonne pratique : préférez toujours une énumération à un `int` ou un `string` magique pour représenter un ensemble fini de valeurs. Le compilateur vérifie les `switch` exhaustifs et l'IDE propose les valeurs possibles — la documentation est dans le type lui-même.",
      },
    ],
  },
  {
    id: "namespaces-usings",
    title: "Namespaces et `using`",
    level: 3,
    intro:
      "Organiser le code en espaces de noms et importer ce dont on a besoin.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Namespaces",
        code: "// Déclaration à portée de fichier (C# 10+) : pas d'accolades\nnamespace MaApp.Services;\n\npublic class ServiceJoueur { /* ... */ }",
      },
      {
        kind: "code",
        language: "csharp",
        title: "Usings",
        code: "using System;\nusing System.Collections.Generic;\nusing MaApp.Services; // importer son propre namespace\n\n// Alias en cas de conflit de noms\nusing JoueurDto = MaApp.Api.Joueur;",
      },
      {
        kind: "list",
        items: [
          "Convention : le namespace suit la structure des dossiers (`MaApp/Services/` → `MaApp.Services`) — les IDE le génèrent automatiquement.",
          "`ImplicitUsings` (activé par défaut dans les nouveaux projets) importe `System`, `System.Linq`, etc. sans les écrire.",
          "Les `global using` (dans un fichier `Usings.cs`) s'appliquent à tout le projet : pratique pour les namespaces utilisés partout.",
          "Un `using` autour d'un objet jetable (`using var f = File.Open(...)`) garantit sa libération : ne confondez pas avec la directive d'import.",
        ],
      },
    ],
  },
  {
    id: "fichiers-io",
    title: "Fichiers et entrées/sorties",
    level: 3,
    intro:
      "Lire et écrire des fichiers : la classe `File` couvre 90 % des besoins.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Opérations fichiers",
        code: "// Lecture / écriture simple (synchrone)\nstring contenu = File.ReadAllText(\"notes.txt\");\nFile.WriteAllText(\"sortie.txt\", contenu);\nstring[] lignes = File.ReadAllLines(\"data.csv\");\n\n// Version asynchrone : à préférer dans les apps serveur\nstring asyncContenu = await File.ReadAllTextAsync(\"notes.txt\");\n\n// Chemins portables\nstring chemin = Path.Combine(\"dossier\", \"fichier.txt\");",
      },
      {
        kind: "fields",
        title: "Bonnes pratiques",
        fields: [
          {
            label: "`using` et ressources",
            value:
              "Les flux (`FileStream`, `StreamReader`) doivent être libérés : `using var flux = File.OpenRead(...)` appelle `Dispose()` automatiquement en fin de portée.",
          },
          {
            label: "Encodage",
            value:
              "Précisez l'encodage pour les fichiers non UTF-8 : `File.ReadAllText(chemin, Encoding.Latin1)`. L'UTF-8 est le défaut.",
          },
          {
            label: "Chemins",
            value:
              "`Path.Combine` construit des chemins valides sur tous les OS — ne concaténez jamais avec `/` ou `\\\\` en dur.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier que les opérations IO peuvent lever (`FileNotFoundException`, `UnauthorizedAccessException`) : entourez de `try/catch` quand l'échec est plausible.",
          },
        ],
      },
    ],
  },
  {
    id: "json",
    title: "JSON avec System.Text.Json",
    level: 3,
    intro:
      "Sérialiser et désérialiser : la bibliothèque intégrée suffit dans la plupart des cas.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Sérialisation",
        code: "using System.Text.Json;\n\nvar joueur = new Joueur(\"Akane\", 1250);\n\n// Objet → JSON\nstring json = JsonSerializer.Serialize(joueur);\n// → {\"Pseudo\":\"Akane\",\"Score\":1250}\n\n// JSON → objet\nvar restaure = JsonSerializer.Deserialize<Joueur>(json);",
      },
      {
        kind: "list",
        items: [
          "`System.Text.Json` est intégrée au runtime : performante et sans dépendance. `Newtonsoft.Json` (NuGet) reste utilisée pour les cas avancés et le code historique.",
          "Par défaut, la casse des propriétés est préservée : utilisez `JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }` pour les API web.",
          "Les records se sérialisent naturellement : `JsonSerializer.Serialize(new Joueur(\"x\", 1))` fonctionne sans configuration.",
          "Ne désérialisez jamais du JSON non fiable vers des types sensibles sans validation : c'est une surface d'attaque comme une autre.",
        ],
      },
    ],
  },
  {
    id: "ef-core-notions",
    title: "Entity Framework Core : notions",
    level: 3,
    intro:
      "L'ORM officiel de .NET : manipuler une base de données avec des objets C#.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "DbContext minimal",
        code: "public class AppDbContext : DbContext\n{\n    public DbSet<Joueur> Joueurs => Set<Joueur>();\n\n    protected override void OnConfiguring(DbContextOptionsBuilder options)\n        => options.UseSqlite(\"Data Source=app.db\");\n}\n\n// Requête LINQ → traduite en SQL\nusing var db = new AppDbContext();\nvar experts = await db.Joueurs\n    .Where(j => j.Score >= 1000)\n    .ToListAsync();",
      },
      {
        kind: "fields",
        title: "Les notions clés",
        fields: [
          {
            label: "En une phrase",
            value:
              "EF Core mappe vos classes vers des tables : vous écrivez du LINQ, il génère le SQL.",
          },
          {
            label: "`DbContext` / `DbSet<T>`",
            value:
              "Le contexte représente la base ; chaque `DbSet` représente une table. Le suivi des modifications (`ChangeTracker`) détecte ce qui a changé pour générer les `UPDATE`.",
          },
          {
            label: "Migrations",
            value:
              "Les migrations versionnent le schéma : `dotnet ef migrations add AjoutScore` crée la migration, `dotnet ef database update` l'applique. Le schéma évolue avec le code, en revue comme le reste.",
          },
          {
            label: "Quand s'en passer",
            value:
              "Pour des requêtes SQL complexes ou des performances critiques, Dapper (micro-ORM) ou du SQL direct restent légitimes. L'ORM n'est pas obligatoire.",
          },
        ],
      },
      {
        kind: "command",
        label: "Installer l'outil EF Core",
        command: "dotnet tool install --global dotnet-ef",
        why: "Installe la CLI `dotnet ef` qui crée et applique les migrations. Installation unique par machine.",
        verify: "`dotnet ef --version` affiche un numéro de version.",
      },
    ],
  },
  {
    id: "tests-xunit",
    title: "Tests avec xUnit",
    level: 3,
    intro:
      "xUnit est le framework de test le plus répandu dans l'écosystème .NET moderne.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Premier test",
        code: "public class CalculatriceTests\n{\n    [Fact] // un cas unique\n    public void Addition_RetourneLaSomme()\n    {\n        var resultat = 2 + 3;\n        Assert.Equal(5, resultat);\n    }\n\n    [Theory] // même test, plusieurs données\n    [InlineData(2, 3, 5)]\n    [InlineData(-1, 1, 0)]\n    public void Addition_CasMultiples(int a, int b, int attendu)\n    {\n        Assert.Equal(attendu, a + b);\n    }\n}",
      },
      {
        kind: "command",
        label: "Créer un projet de tests",
        command: "dotnet new xunit -n MaApp.Tests",
        why: "Génère un projet de tests xUnit prêt à l'emploi, avec les paquets `xunit` et `Microsoft.NET.Test.Sdk` déjà référencés.",
      },
      {
        kind: "command",
        label: "Exécuter les tests",
        command: "dotnet test",
        why: "Compile la solution et lance tous les tests (`[Fact]` et `[Theory]`), avec un résumé passed/failed. À lancer avant chaque commit.",
        verify: "Le résumé affiche `Passed!` avec le nombre de tests réussis.",
      },
      {
        kind: "list",
        items: [
          "`[Fact]` : un fait toujours vrai (un cas). `[Theory]` + `[InlineData]` : la même logique vérifiée sur plusieurs jeux de données.",
          "`Assert.Equal(attendu, réel)` : l'ordre compte — attendu d'abord. Les messages d'échec sont alors lisibles.",
          "NUnit (`[Test]`) et MSTest (`[TestMethod]`) sont des alternatives établies ; xUnit domine les nouveaux projets et la documentation Microsoft.",
          "Un test doit être déterministe et isolé : pas de dépendance à l'ordre d'exécution, pas d'accès réseau non simulé.",
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging : points d'arrêt et inspection",
    level: 3,
    intro:
      "Le débogueur .NET est l'un des meilleurs du marché : apprenez à l'utiliser au lieu de multiplier les `Console.WriteLine`.",
    blocks: [
      {
        kind: "list",
        items: [
          "Point d'arrêt (F9) : pause l'exécution sur une ligne. Points d'arrêt conditionnels : pause uniquement quand une expression est vraie — indispensable dans les boucles.",
          "Pas à pas : F10 (step over, sans entrer dans les méthodes), F11 (step into, entrer dans la méthode appelée).",
          "Fenêtres Espion/Watch : évaluez n'importe quelle expression dans le contexte courant ; survolez une variable pour voir sa valeur.",
          "Pile d'appels : remontez les appels pour comprendre comment on est arrivé là — la lecture la plus rentable face à un bug.",
          "`DebuggerDisplay` : l'attribut `[DebuggerDisplay(\"Pseudo={Pseudo}\")]` sur une classe rend son inspection lisible au lieu d'afficher le nom du type.",
          "En CLI : `dotnet run` puis attachez le débogueur de VS Code (configuration `launch.json` générée par l'extension C#), ou utilisez `Debugger.Launch()` / `Debugger.Break()` dans le code.",
        ],
      },
      {
        kind: "text",
        text: "Méthode : reproduisez le bug de façon minimale, posez un point d'arrêt juste avant le comportement suspect, et inspectez l'état réel plutôt que de supposer. La plupart des bugs C# se résolvent en constatant qu'une variable ne contient pas ce qu'on croyait — un `null` inattendu, une liste partagée, une valeur non assignée.",
      },
    ],
  },
  {
    id: "configuration-di",
    title: "Configuration et injection de dépendances",
    level: 3,
    intro:
      "Deux piliers des applications ASP.NET Core : la configuration externalisée et les services injectés.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "appsettings.json",
        code: "{\n  \"ConnectionStrings\": {\n    \"Default\": \"Data Source=app.db\"\n  },\n  \"Jeu\": {\n    \"ScoreMax\": 9999\n  }\n}",
      },
      {
        kind: "code",
        language: "csharp",
        title: "Injection de dépendances",
        code: "var builder = WebApplication.CreateBuilder(args);\n\n// Enregistrer un service : une instance par requête HTTP\nbuilder.Services.AddScoped<IServiceJoueur, ServiceJoueur>();\n\nvar app = builder.Build();\n\n// Le framework fournit le service automatiquement\napp.MapGet(\"/joueurs\", (IServiceJoueur service) => service.Lister());\napp.Run();",
      },
      {
        kind: "fields",
        title: "Durées de vie des services",
        fields: [
          {
            label: "`AddTransient`",
            value: "Une nouvelle instance à chaque demande : services légers et sans état.",
          },
          {
            label: "`AddScoped`",
            value: "Une instance par requête (ou portée) : le choix par défaut pour la logique métier et les `DbContext`.",
          },
          {
            label: "`AddSingleton`",
            value: "Une seule instance pour toute l'application : configuration, caches. Attention : un singleton ne doit pas dépendre d'un scoped.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Injecter un service `scoped` (ex. `DbContext`) dans un `singleton` : le contexte est capturé et réutilisé entre requêtes — fuites de données et exceptions garanties.",
          },
        ],
      },
    ],
  },
  {
    id: "logging",
    title: "Logging structuré",
    level: 3,
    intro:
      "Des logs exploitables : niveaux, templates et corrélation plutôt que du texte libre.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "ILogger intégré",
        code: "public class ServiceJoueur(IServiceLog log) // injection par constructeur\n{\n    public void Bannir(string pseudo)\n    {\n        // Template structuré : les propriétés sont indexables\n        log.Information(\"Joueur {Pseudo} banni par {Moderateur}\", pseudo, \"admin\");\n    }\n}",
      },
      {
        kind: "list",
        items: [
          "Niveaux : `Trace` < `Debug` < `Information` < `Warning` < `Error` < `Critical`. En production, on loggue à partir de `Information` ou `Warning`.",
          "Templates (`{Pseudo}`) plutôt que l'interpolation (`$\"...{pseudo}\"`) : les propriétés restent structurées et requêtables dans les outils de log.",
          "Serilog (NuGet) est le complément standard pour écrire vers fichiers, Elasticsearch ou Seq avec une configuration riche.",
          "Ne logguez jamais de secrets (mots de passe, tokens, chaînes de connexion) : les logs sont lus par des humains et stockés longtemps.",
        ],
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité : les réflexes",
    level: 3,
    intro:
      "Les vulnérabilités classiques et leurs parades côté .NET.",
    blocks: [
      {
        kind: "fields",
        title: "Menaces et parades",
        fields: [
          {
            label: "Injection SQL",
            value:
              "Ne concaténez JAMAIS une entrée utilisateur dans du SQL. EF Core paramètre automatiquement ; en SQL brut, utilisez des paramètres (`@pseudo`), jamais l'interpolation.",
          },
          {
            label: "Secrets",
            value:
              "Aucun mot de passe ni clé d'API dans le code ou le git. En développement : `dotnet user-secrets` ; en production : variables d'environnement ou coffre (Azure Key Vault…).",
          },
          {
            label: "Validation des entrées",
            value:
              "Validez tout ce qui vient de l'extérieur (FluentValidation ou DataAnnotations `[Required]`, `[Range]`) : la validation côté client ne protège de rien.",
          },
          {
            label: "Dépendances",
            value:
              "`dotnet list package --vulnerable` signale les paquets NuGet avec des CVE connues. Mettez à jour régulièrement.",
          },
          {
            label: "XSS / CSRF (web)",
            value:
              "ASP.NET Core encode les sorties Razor par défaut ; activez les tokens antiforgery sur les formulaires (`[ValidateAntiForgeryToken]`).",
          },
        ],
      },
      {
        kind: "command",
        label: "Gérer les secrets de développement",
        command: "dotnet user-secrets init",
        why: "Active le coffre de secrets utilisateur pour le projet : les secrets sont stockés hors du dépôt git, dans le profil utilisateur.",
        verify: "Un `<UserSecretsId>` est ajouté au `.csproj`.",
      },
    ],
  },
  {
    id: "performance-notions",
    title: "Performance : notions",
    level: 3,
    intro:
      "Mesurer d'abord, optimiser ensuite : les leviers spécifiques à .NET.",
    blocks: [
      {
        kind: "list",
        items: [
          "Mesurez avec BenchmarkDotNet (NuGet) : c'est la référence pour micro-benchmarker du code .NET avec des résultats statistiquement fiables.",
          "`Span<T>` et `stackalloc` : manipuler de la mémoire contiguë sans allocation — pour le code chaud (parsing, buffers), pas pour le code courant.",
          "Évitez les allocations dans les boucles chaudes : `string.Split` alloue un tableau ; préférez les énumérations (`EnumerateLines`) quand le volume compte.",
          "L'async n'accélère pas le CPU : il libère les threads pendant les attentes IO. Un calcul purement CPU ne gagne rien à être `async`.",
          "Le ramasse-miettes (GC) est générationnel et très optimisé : dans 95 % des cas, écrire du code simple et laisser le GC travailler bat les micro-optimisations manuelles.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les conventions qui distinguent un code C# professionnel.",
    blocks: [
      {
        kind: "list",
        items: [
          "Conventions de nommage : `PascalCase` pour classes, méthodes, propriétés et namespaces ; `camelCase` pour variables locales et paramètres ; préfixez les interfaces par `I` (`IRepository`).",
          "Un fichier par type, nommé comme le type (`Joueur.cs` contient `class Joueur`) : la navigation dans le projet reste prévisible.",
          "Traitez les warnings comme des erreurs (`<TreatWarningsAsErrors>true</TreatWarningsAsErrors>`) et gardez `<Nullable>enable</Nullable>`.",
          "Préférez l'immutabilité : `record`, propriétés `init`, `readonly struct` quand c'est possible — moins d'état mutable, moins de bugs.",
          "Méthodes courtes avec une seule responsabilité ; noms explicites plutôt que commentaires qui expliquent un nom obscur.",
          "Formatage automatique : `dotnet format` applique les conventions de style à tout le projet — plus de débats de style en revue.",
          "XML docs (`/// <summary>`) sur les API publiques : elles alimentent IntelliSense pour tous les consommateurs.",
        ],
      },
      {
        kind: "command",
        label: "Formater tout le projet",
        command: "dotnet format",
        why: "Applique les règles de style et de formatage .NET à l'ensemble du projet : indentation, espaces, ordre des usings. Idéal avant une revue.",
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes",
    level: 3,
    intro:
      "Les neuf pièges que tous les développeurs C# rencontrent — et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "1. NullReferenceException",
        fields: [
          { label: "Problème", value: "Déréférencer un objet `null` : `nom.Length` alors que `nom` est `null`." },
          { label: "Pourquoi", value: "`null` signifie « aucun objet » : il n'y a rien sur quoi appeler `.Length`." },
          { label: "Mieux", value: "Activez les nullable reference types et utilisez `?.` / `??` pour les cas où `null` est légitime." },
        ],
      },
      {
        kind: "fields",
        title: "2. Oublier `await`",
        fields: [
          { label: "Problème", value: "Appeler une méthode `async` sans `await` : l'opération part en tâche de fond, le résultat n'est jamais attendu." },
          { label: "Pourquoi", value: "Sans `await`, la méthode rend la main immédiatement avec un `Task` non observé — et ses exceptions sont perdues." },
          { label: "Mieux", value: "Tenez compte du warning CS4014 : si l'appel doit être séquentiel, `await`-ez-le ; sinon, stockez le `Task` explicitement." },
        ],
      },
      {
        kind: "fields",
        title: "3. `async void`",
        fields: [
          { label: "Problème", value: "`async void MaMethode()` : les exceptions levées dedans ne peuvent être capturées par l'appelant et font crasher le processus." },
          { label: "Pourquoi", value: "`void` ne renvoie pas de `Task` : il n'y a aucun objet sur lequel observer l'échec." },
          { label: "Mieux", value: "`async Task` partout ; `async void` uniquement pour les gestionnaires d'événements UI, où c'est imposé par la signature." },
        ],
      },
      {
        kind: "fields",
        title: "4. Division entière",
        fields: [
          { label: "Problème", value: "`5 / 2` vaut `2` : la partie décimale est tronquée silencieusement." },
          { label: "Pourquoi", value: "Quand les deux opérandes sont entiers, C# effectue une division entière — c'est défini par le langage, pas un bug." },
          { label: "Mieux", value: "Écrivez `5 / 2.0` ou castez un opérande : `(double)total / nombre`." },
        ],
      },
      {
        kind: "fields",
        title: "5. `string` immuable ignorée",
        fields: [
          { label: "Problème", value: "`texte.ToUpper();` seul, sans assigner le résultat : `texte` est inchangé." },
          { label: "Pourquoi", value: "Les méthodes de `string` renvoient une NOUVELLE chaîne ; l'originale n'est jamais modifiée." },
          { label: "Mieux", value: "`texte = texte.ToUpper();` — assignez toujours le résultat." },
        ],
      },
      {
        kind: "fields",
        title: "6. Modifier une collection pendant `foreach`",
        fields: [
          { label: "Problème", value: "`InvalidOperationException: Collection was modified` quand on ajoute/retire pendant l'itération." },
          { label: "Pourquoi", value: "L'énumérateur détecte la modification et se protège : l'itération deviendrait incohérente." },
          { label: "Mieux", value: "Itérez sur une copie (`foreach (var x in liste.ToList())`) ou collectez les modifications pour les appliquer après la boucle." },
        ],
      },
      {
        kind: "fields",
        title: "7. `double` pour la monnaie",
        fields: [
          { label: "Problème", value: "`0.1 + 0.2` en `double` ne vaut pas exactement `0.3` : les centimes dérivent." },
          { label: "Pourquoi", value: "Les flottants binaires ne représentent pas exactement les décimaux : l'erreur s'accumule." },
          { label: "Mieux", value: "`decimal` (suffixe `m`) pour tout ce qui touche à l'argent." },
        ],
      },
      {
        kind: "fields",
        title: "8. Variable locale non assignée",
        fields: [
          { label: "Problème", value: "`error CS0165: Use of unassigned local variable 'x'`." },
          { label: "Pourquoi", value: "Contrairement aux champs (initialisés par défaut), les variables locales DOIVENT être assignées avant usage — le compilateur l'exige." },
          { label: "Mieux", value: "Initialisez à la déclaration : `int total = 0;`. C'est une protection, pas une contrainte." },
        ],
      },
      {
        kind: "fields",
        title: "9. `catch` vide ou trop large",
        fields: [
          { label: "Problème", value: "`catch { }` qui avale silencieusement l'erreur : le programme continue dans un état incohérent." },
          { label: "Pourquoi", value: "Une exception masquée ne disparaît pas : elle réapparaît plus tard, loin de sa cause, beaucoup plus difficile à diagnostiquer." },
          { label: "Mieux", value: "Capturez le type précis, logguez, et ne capturez que ce que vous savez traiter. En cas de doute, laissez remonter." },
        ],
      },
    ],
  },
  {
    id: "ci-cd",
    title: "CI/CD : compiler et tester automatiquement",
    level: 3,
    intro:
      "Chaque push mérite une vérification automatique : compilation, tests, format.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/dotnet.yml — pipeline minimal",
        code: "name: .NET\non: [push, pull_request]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-dotnet@v4\n        with:\n          dotnet-version: \"9.0.x\"\n      - run: dotnet build --configuration Release\n      - run: dotnet test --no-build",
      },
      {
        kind: "list",
        items: [
          "`actions/setup-dotnet` installe le SDK demandé : la CI compile avec exactement la version ciblée par le projet.",
          "`dotnet build` en `Release` avec `TreatWarningsAsErrors` : aucun warning ne passe en production.",
          "`dotnet test --no-build` réutilise la compilation précédente : plus rapide et cohérent.",
          "Publiez ensuite avec `dotnet publish` vers un registre de conteneurs ou Azure : l'artefact est un dossier autonome.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes et progressifs",
    level: 3,
    intro:
      "Quatre projets qui montent en difficulté : chacun réutilise les acquis du précédent.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Gestionnaire de tâches en console (débutant)",
        fields: [
          { label: "Compétences", value: "CLI `dotnet`, classes, propriétés, collections, fichiers, JSON." },
          { label: "À construire", value: "Une CLI `taches` : `taches ajouter \"Relire le rapport\"`, `taches lister`, `taches terminer 2`. Stockage dans un fichier JSON via `System.Text.Json`." },
          { label: "Apprentissages", value: "Structurer un programme en classes, parser des arguments, persister des données." },
          { label: "Projet suivant", value: "Le projet 2 reprend la logique métier dans une API." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — API REST ASP.NET Core (intermédiaire)",
        fields: [
          { label: "Compétences", value: "`dotnet new webapi`, Minimal APIs, injection de dépendances, codes HTTP, `async`/`await`." },
          { label: "À construire", value: "Une API de gestion de joueurs : `GET /joueurs`, `POST /joueurs`, `PUT /joueurs/{id}`, `DELETE /joueurs/{id}` avec records DTO, validation et codes 200/201/404 corrects." },
          { label: "Apprentissages", value: "Le cycle requête → service → réponse, la DI en pratique, les conventions REST." },
          { label: "Projet suivant", value: "Le projet 3 ajoute la persistance réelle." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — API avec base de données (intermédiaire+)",
        fields: [
          { label: "Compétences", value: "Entity Framework Core, migrations, LINQ vers SQL, `dotnet ef`." },
          { label: "À construire", value: "Reprendre l'API du projet 2 avec SQLite puis SQL Server : `DbContext`, migrations (`dotnet ef migrations add`), requêtes LINQ paginées (`Skip`/`Take`), tests xUnit sur la couche service." },
          { label: "Apprentissages", value: "Modélisation, migrations versionnées, requêtes efficaces, tests d'une vraie couche d'accès." },
          { label: "Projet suivant", value: "Le projet 4 industrialise le tout." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Application complète déployée (avancé)",
        fields: [
          { label: "Compétences", value: "Authentification JWT, logging Serilog, Docker, CI/CD GitHub Actions, configuration multi-environnements." },
          { label: "À construire", value: "Une API de tournois e-sport : inscription/connexion (JWT), rôles, rate limiting, logs structurés, conteneur Docker multi-stage, pipeline CI (build + tests) et déploiement." },
          { label: "Apprentissages", value: "La sécurité applicative, l'observabilité, le packaging et l'automatisation : le quotidien d'un développeur backend .NET." },
          { label: "Difficulté", value: "Avancé — chaque brique a été vue séparément dans ce guide." },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources officielles",
    level: 3,
    intro:
      "La documentation Microsoft est la référence : complète, à jour et gratuite.",
    blocks: [
      {
        kind: "list",
        items: [
          "Documentation C# : https://learn.microsoft.com/dotnet/csharp/ — le guide de langage officiel, avec le tour d'horizon interactif.",
          "Documentation .NET : https://learn.microsoft.com/dotnet/ — SDK, CLI `dotnet`, déploiement.",
          "ASP.NET Core : https://learn.microsoft.com/aspnet/core/ — web, API, sécurité.",
          "Entity Framework Core : https://learn.microsoft.com/ef/core/ — ORM, migrations, requêtes.",
          "Référence des erreurs du compilateur : chaque code `CSxxxx` est documenté sur learn.microsoft.com avec exemple et correction.",
          ".NET sur GitHub : https://github.com/dotnet — le code source du runtime, du compilateur Roslyn et des bibliothèques.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "C# maîtrisé dans ses fondamentaux : les directions naturelles.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes de progression",
        fields: [
          {
            label: "ASP.NET Core en profondeur",
            value: "Middleware, authentification/authorisation, SignalR (temps réel), gRPC : le backend .NET professionnel.",
          },
          {
            label: ".NET MAUI / Blazor",
            value: "Applications mobiles et desktop (MAUI) ou web interactif en C# côté client (Blazor) : le même langage partout.",
          },
          {
            label: "Unity",
            value: "Le moteur de jeu le plus répandu utilise C# comme langage de script : une porte vers le jeu vidéo.",
          },
          {
            label: "Architecture",
            value: "Clean Architecture, CQRS avec MediatR, event sourcing : structurer les grosses applications .NET.",
          },
          {
            label: "Cloud",
            value: "Conteneurs, Azure, observabilité (OpenTelemetry) : déployer et superviser des applications .NET en production.",
          },
        ],
      },
    ],
  },
];

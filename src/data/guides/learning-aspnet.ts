import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'ASP.NET Core : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : Minimal APIs d'abord pour comprendre le pipeline, puis les
 * contrôleurs MVC, l'injection de dépendances, Entity Framework Core et
 * l'authentification. Comparaisons factuelles, sans outil déclaré meilleur.
 */
export const LEARNING_ASPNET: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est ASP.NET Core, ce qu'il n'est pas, et pourquoi il est au cœur de l'écosystème .NET côté serveur.",
    blocks: [
      {
        kind: "text",
        text: "ASP.NET Core est le framework web open source de Microsoft pour construire des applications côté serveur avec C# (ou F#). Il permet de créer des API HTTP, des applications web, des services temps réel et des microservices, et il fonctionne sur Windows, Linux et macOS.",
      },
      {
        kind: "text",
        text: "Point essentiel : ASP.NET Core est la réécriture moderne et multiplateforme de l'ancien ASP.NET (lié à Windows et au .NET Framework). Le « Core » signale cette rupture : un framework modulaire, léger, où vous n'embarquez que ce dont vous avez besoin, servi par le serveur web intégré Kestrel.",
      },
      {
        kind: "text",
        text: "ASP.NET Core reçoit des requêtes HTTP, les fait passer dans un pipeline de middlewares, puis les confie à votre code (un endpoint ou un contrôleur) qui produit une réponse.",
      },
      {
        kind: "text",
        text: "L'ancien ASP.NET était lié à Windows et à IIS, lourd et difficile à tester. ASP.NET Core répond au besoin d'un framework web .NET rapide, multiplateforme, modulaire et adapté au cloud et aux conteneurs.",
      },
      {
        kind: "text",
        text: "API REST, backends d'applications web et mobiles, applications métier, microservices, applications temps réel. Pour un site vitrine statique, un générateur de site statique suffit.",
      },
      {
        kind: "fields",
        title: "ASP.NET Core : l'essentiel",
        fields: [
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un langage (c'est C# qui porte la logique), ni un serveur web à lui seul (Kestrel joue ce rôle, souvent derrière un reverse proxy), ni un ORM (c'est Entity Framework Core, une brique séparée).",
          },
        ],
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : requête → pipeline → réponse",
    level: 1,
    intro:
      "La seule idée à retenir avant tout le reste : chaque requête traverse une chaîne de middlewares avant d'atteindre votre code.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle d'une requête, en une image",
        lines: [
          "Requête HTTP (navigateur, mobile, autre service)",
          "     │",
          "     ▼",
          "Kestrel (serveur web intégré, écoute le port)",
          "     │",
          "     ▼",
          "Pipeline de middlewares (chaque maillon peut agir, puis passer au suivant)",
          "  ┌─ gestion des exceptions",
          "  ├─ redirection HTTPS",
          "  ├─ authentification (qui êtes-vous ?)",
          "  ├─ autorisation (avez-vous le droit ?)",
          "     │",
          "     ▼",
          "Routing : quelle route correspond à l'URL ?",
          "     │",
          "     ▼",
          "Votre code : Minimal API ou contrôleur",
          "     │  (lit les paramètres, appelle les services, interroge la base)",
          "     ▼",
          "Réponse HTTP (JSON, fichier, page…) qui remonte le pipeline",
        ],
      },
      {
        kind: "text",
        text: "Un middleware, en une phrase : un maillon de la chaîne qui voit la requête passer, peut la modifier, décider de répondre immédiatement (court-circuiter) ou la transmettre au maillon suivant. L'authentification, la journalisation et la gestion des erreurs sont tous des middlewares : comprendre le pipeline, c'est comprendre ASP.NET Core.",
      },
      {
        kind: "list",
        items: [
          "Tout est requête → réponse : même les pages web et le temps réel passent par ce pipeline.",
          "L'ordre compte : un middleware ne voit que ce qui a déjà traversé les précédents.",
          "Votre code métier vit au bout du pipeline : endpoints ou contrôleurs, alimentés par l'injection de dépendances.",
          "Kestrel est le serveur intégré : en production, on le place souvent derrière un reverse proxy (Nginx, IIS, un ingress Kubernetes).",
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
      "ASP.NET Core est du C# organisé autour de HTTP : sans bases en C# et en requêtes HTTP, chaque concept semblera magique.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir avant de commencer",
        fields: [
          {
            label: "C# moderne — indispensable",
            value:
              "Classes, interfaces, propriétés, génériques, `async`/`await`, LINQ de base. L'injection de dépendances et les contrôleurs reposent entièrement sur ces notions.",
          },
          {
            label: "HTTP — les fondamentaux",
            value:
              "Verbes (`GET`, `POST`, `PUT`, `DELETE`), codes de statut (200, 201, 400, 404, 500), en-têtes, corps JSON. Une API REST n'est qu'une conversation HTTP structurée.",
          },
          {
            label: "JSON — le format d'échange",
            value:
              "Lire et écrire du JSON sans hésiter : c'est le format dans lequel votre API parlera avec le monde extérieur.",
          },
          {
            label: "Terminal — les bases",
            value:
              "Naviguer dans les dossiers, lancer des commandes : l'outil `dotnet` en ligne de commande est le compagnon quotidien du développeur .NET.",
          },
          {
            label: "Utile mais pas requis",
            value:
              "SQL de base (pour Entity Framework Core), notions de conteneurs (pour le déploiement), un framework frontend (pour consommer votre API).",
          },
        ],
      },
    ],
  },
  {
    id: "installer-sdk",
    title: "Installer le SDK .NET",
    level: 2,
    intro:
      "Le SDK contient tout : le runtime, le compilateur C#, l'outil `dotnet` et les modèles de projet. Une seule installation suffit.",
    blocks: [
      {
        kind: "text",
        text: "Distinguez deux choses : le SDK (pour développer : compilateur, outils, modèles) et le runtime (pour exécuter : nécessaire uniquement sur les serveurs de production). Sur votre machine de développement, installez le SDK. Choisissez une version LTS (support long terme, 3 ans) sauf besoin spécifique ; les versions STS ont un support court (18 mois). La page des versions sur `dotnet.microsoft.com` indique la version recommandée du moment.",
      },
      {
        kind: "command",
        label: "Installer le SDK sur Windows (via winget)",
        command: "winget install Microsoft.DotNet.SDK.8",
        why: "`winget` est le gestionnaire de paquets de Windows. Le paquet `Microsoft.DotNet.SDK.8` est le SDK .NET publié par Microsoft. Sur macOS et Linux, utilisez le gestionnaire de votre système ou l'installateur téléchargé depuis `dotnet.microsoft.com`.",
        verify:
          "La commande suivante affiche un numéro de version : le SDK est prêt.",
      },
      {
        kind: "command",
        label: "Vérifier l'installation",
        command: "dotnet --version",
        why: "Affiche la version du SDK actif. Si plusieurs SDK sont installés, `dotnet` utilise le plus récent compatible avec le dossier courant (un fichier `global.json` peut figer la version par projet).",
        verify:
          "Un numéro comme `8.0.100` s'affiche, sans message d'erreur.",
      },
      {
        kind: "command",
        label: "Lister les SDK et runtimes installés",
        command: "dotnet --list-sdks",
        why: "Montre tous les SDK présents sur la machine. Utile quand un projet refuse de compiler : il demande peut-être une version que vous n'avez pas.",
        verify:
          "La liste contient au moins la version que vous venez d'installer.",
      },
    ],
  },
  {
    id: "creer-projet",
    title: "Créer un projet API",
    level: 2,
    intro:
      "L'outil `dotnet` génère un projet API fonctionnel en une commande : explorons ce qu'il contient.",
    blocks: [
      {
        kind: "command",
        label: "Voir tous les modèles de projet disponibles",
        command: "dotnet new list",
        why: "Affiche les modèles installés : `webapi` (API), `mvc` (application web avec vues), `webapp` (Razor Pages), `blazor`, `grpc`, `xunit` (tests)… Connaître cette liste évite de partir d'un projet vide à la main.",
      },
      {
        kind: "command",
        label: "Créer une API dans un nouveau dossier",
        command: "dotnet new webapi -n BoutiqueApi",
        why: "`webapi` est le modèle d'API REST. `-n BoutiqueApi` nomme le projet (et le dossier). Le modèle génère un `Program.cs` minimal, un contrôleur d'exemple et la configuration de base : vous partez d'une API qui compile et s'exécute.",
        verify:
          "Un dossier `BoutiqueApi/` est créé avec `BoutiqueApi.csproj`, `Program.cs` et `appsettings.json`.",
      },
      {
        kind: "diagram",
        title: "Anatomie du projet généré",
        lines: [
          "BoutiqueApi/",
          "├── BoutiqueApi.csproj        ← le projet : SDK, version de .NET, paquets NuGet",
          "├── Program.cs                ← point d'entrée : construit l'app, déclare les services et le pipeline",
          "├── appsettings.json         ← configuration (connexions, options…)",
          "├── appsettings.Development.json ← surcharges pour le développement local",
          "├── Properties/launchSettings.json ← profils de lancement (ports, variables d'environnement)",
          "└── Controllers/              ← vos contrôleurs d'API",
          "    └── WeatherForecastController.cs  ← contrôleur d'exemple (à remplacer)",
        ],
      },
      {
        kind: "text",
        text: "Le fichier `.csproj` mérite un regard : c'est un simple fichier XML qui déclare le SDK (`Microsoft.NET.Sdk.Web`), la version cible (`net8.0` par exemple) et les paquets NuGet. Ajouter une dépendance, c'est ajouter une ligne — ou utiliser `dotnet add package`, jamais en éditant à l'aveugle.",
      },
    ],
  },
  {
    id: "lancer-projet",
    title: "Lancer le projet",
    level: 2,
    intro:
      "Deux commandes à connaître par cœur : `dotnet run` pour lancer, `dotnet watch` pour développer.",
    blocks: [
      {
        kind: "command",
        label: "Compiler et lancer l'API",
        command: "dotnet run",
        why: "Compile le projet puis démarre Kestrel, le serveur web intégré. À exécuter depuis le dossier du projet. Le terminal affiche les URL d'écoute (HTTP et HTTPS) : ouvrez-les pour voir l'API répondre.",
        verify:
          "Le terminal affiche `Now listening on: https://localhost:7xxx` (le port exact est dans `Properties/launchSettings.json`).",
      },
      {
        kind: "command",
        label: "Lancer en mode surveillance (rechargement automatique)",
        command: "dotnet watch",
        why: "`dotnet watch` surveille vos fichiers : à chaque sauvegarde, il recompile et redémarre l'application. C'est la commande de développement par défaut — vous ne relancerez presque jamais `dotnet run` à la main pendant que vous codez.",
        verify:
          "Modifiez un texte retourné par un endpoint, sauvegardez : la réponse change sans relancer la commande.",
      },
      {
        kind: "text",
        text: "En mode développement, le modèle `webapi` expose une page de documentation interactive de l'API (Swagger UI / OpenAPI) à la racine ou sur `/swagger` selon la version du SDK. C'est le moyen le plus rapide de voir vos endpoints et de les tester : chaque route y est listée avec ses paramètres.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et IDE",
    level: 2,
    intro:
      "Plusieurs environnements prennent en charge C# et ASP.NET Core : choisissez selon votre plateforme et vos habitudes.",
    blocks: [
      {
        kind: "fields",
        title: "Les options, sans classement",
        fields: [
          {
            label: "Visual Studio (Windows)",
            value:
              "L'IDE historique de Microsoft : débogueur très complet, concepteur, profilage intégré. L'édition Community est gratuite pour un usage individuel et les petites équipes. Le choix naturel si vous développez sur Windows.",
          },
          {
            label: "VS Code + extension C#",
            value:
              "L'éditeur léger de Microsoft avec l'extension officielle « C# » (`ms-dotnettools.csharp`) : coloration, complétion, refactoring, débogage. Fonctionne sur Windows, macOS et Linux. Idéal si vous vivez déjà dans VS Code.",
          },
          {
            label: "JetBrains Rider",
            value:
              "IDE multiplateforme réputé pour son analyse de code et ses refactorings. Licence payante avec période d'essai. Apprécié par les équipes qui veulent un IDE complet hors de l'écosystème Microsoft.",
          },
          {
            label: "Zed",
            value:
              "Éditeur rapide et minimaliste, avec une extension C# disponible. Pour les développeurs qui privilégient la vitesse et la simplicité et se contentent d'un support langage essentiel.",
          },
        ],
      },
      {
        kind: "text",
        text: "Quel que soit l'éditeur, deux fonctions changent tout au quotidien : le débogueur pas à pas (points d'arrêt dans un contrôleur pendant qu'une requête arrive) et la navigation « aller à la définition » dans le framework lui-même. Prenez dix minutes pour apprendre les raccourcis des deux dans votre éditeur.",
      },
    ],
  },
  {
    id: "premier-endpoint",
    title: "Premier endpoint (Minimal API)",
    level: 2,
    intro:
      "Écrire votre premier endpoint avec les Minimal APIs : la façon la plus directe de voir le pipeline en action.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Ouvrir `Program.cs`",
            detail:
              "C'est le point d'entrée : tout s'y configure. Le modèle `webapi` y déclare déjà des services ; vous allez ajouter vos propres routes.",
          },
          {
            title: "Repérer `var app = builder.Build();`",
            detail:
              "Cette ligne construit l'application à partir de sa configuration. Tout ce qui suit (`app.MapGet`, `app.Use…`, `app.Run`) décrit le pipeline et les routes.",
          },
          {
            title: "Ajouter une route",
            detail:
              "`app.MapGet(\"/bonjour\", () => \"Bonjour le monde !\");` déclare : quand une requête `GET` arrive sur `/bonjour`, exécute cette fonction et renvoie son résultat. Le framework sérialise automatiquement la valeur en réponse HTTP.",
          },
          {
            title: "Vérifier que `app.Run();` est la dernière ligne",
            detail:
              "`Run()` démarre le serveur et bloque : rien d'écrit après ne s'exécutera au démarrage. Les routes doivent être déclarées avant.",
          },
          {
            title: "Lancer avec `dotnet watch` et ouvrir `/bonjour`",
            detail:
              "Le navigateur affiche « Bonjour le monde ! ». Vous venez de traverser tout le pipeline : Kestrel → middlewares → routing → votre fonction.",
          },
        ],
      },
      {
        kind: "code",
        language: "csharp",
        title: "Program.cs — l'application minimale complète",
        code: "var builder = WebApplication.CreateBuilder(args);\n\n// Les services (injection de dépendances, etc.) se déclarent ici.\n\nvar app = builder.Build();\n\n// Les routes se déclarent ici, avant Run().\napp.MapGet(\"/\", () => \"API en ligne\");\napp.MapGet(\"/bonjour\", () => \"Bonjour le monde !\");\napp.MapGet(\"/bonjour/{prenom}\", (string prenom) => $\"Bonjour {prenom} !\");\n\napp.Run(); // Démarre le serveur. Toujours en dernier.",
      },
      {
        kind: "text",
        text: "Observez la troisième route : `{prenom}` dans le modèle d'URL devient un paramètre de la fonction. C'est le routing à l'état pur — le framework extrait la valeur de l'URL et la convertit au bon type. Si la conversion échoue, vous obtenez une erreur 400 automatique.",
      },
    ],
  },
  {
    id: "tester-son-api",
    title: "Tester son API",
    level: 2,
    intro:
      "Une API se teste avec des requêtes HTTP, pas dans le navigateur seul : trois outils pour le faire efficacement.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois façons de tester",
        fields: [
          {
            label: "La documentation interactive (Swagger UI / OpenAPI)",
            value:
              "Générée automatiquement en développement : liste des routes, paramètres, bouton « Try it out » pour exécuter de vraies requêtes. Parfaite pour explorer et pour montrer l'API à quelqu'un.",
          },
          {
            label: "Les fichiers `.http`",
            value:
              "Des fichiers texte où chaque requête HTTP est écrite en clair (`GET https://localhost:7xxx/bonjour`), exécutables directement depuis VS Code ou Visual Studio. Versionnables avec le code : c'est la façon professionnelle de garder des exemples de requêtes.",
          },
          {
            label: "`curl` dans le terminal",
            value:
              "L'outil universel, disponible partout. Idéal pour un test rapide ou un script. `curl` ne ment jamais : il montre exactement ce que le serveur renvoie, en-têtes compris.",
          },
        ],
      },
      {
        kind: "command",
        label: "Tester un endpoint GET avec curl",
        command: "curl https://localhost:7000/bonjour/Akane",
        why: "`curl` envoie une requête HTTP et affiche la réponse brute. Remplacez le port par celui affiché au lancement (`dotnet run` l'indique). L'option `-k` peut être nécessaire en local si le certificat de développement n'est pas approuvé.",
        verify:
          "Le terminal affiche la réponse de votre endpoint (par exemple `\"Bonjour Akane !\"`).",
      },
      {
        kind: "command",
        label: "Tester un endpoint POST avec un corps JSON",
        command: "curl -X POST https://localhost:7000/api/produits -H \"Content-Type: application/json\" -d \"{\\\"nom\\\": \\\"Clavier\\\", \\\"prix\\\": 79}\"",
        why: "`-X POST` choisit le verbe, `-H` déclare que le corps est du JSON, `-d` l'envoie. C'est exactement ce que fera un frontend ou une application mobile pour créer une ressource.",
        verify:
          "Le serveur répond `201 Created` (ou `200 OK`) avec la ressource créée en JSON.",
      },
    ],
  },
  {
    id: "cli-dotnet",
    title: "L'outil `dotnet` en détail",
    level: 2,
    intro:
      "Le couteau suisse du développeur .NET : création, compilation, exécution, tests, paquets — tout passe par lui.",
    blocks: [
      {
        kind: "fields",
        title: "Les commandes du quotidien",
        fields: [
          {
            label: "`dotnet new <modèle>`",
            value:
              "Crée un projet (`webapi`, `mvc`, `blazor`, `xunit`…). Combinez avec `-n Nom` et `-o Dossier`. Votre point de départ pour chaque nouveau projet.",
          },
          {
            label: "`dotnet run` / `dotnet watch`",
            value:
              "Compile et lance (`run`), ou relance automatiquement à chaque sauvegarde (`watch`). `watch` est la commande de développement ; `run` suffit pour un lancement ponctuel.",
          },
          {
            label: "`dotnet build`",
            value:
              "Compile sans lancer. Utile pour vérifier rapidement que tout compile, par exemple avant un commit.",
          },
          {
            label: "`dotnet test`",
            value:
              "Exécute les tests du projet de tests. La commande que votre intégration continue lancera à chaque push.",
          },
          {
            label: "`dotnet publish -c Release -o ./publish`",
            value:
              "Compile en mode optimisé et copie tout le nécessaire (DLL, runtime, fichiers statiques) dans `./publish`. C'est ce dossier qui sera déployé sur le serveur.",
          },
          {
            label: "`dotnet add package <Nom>`",
            value:
              "Ajoute un paquet NuGet au projet (met à jour le `.csproj`). Le pendant de `npm install` dans l'écosystème .NET.",
          },
          {
            label: "`dotnet --info`",
            value:
              "Diagnostic complet : SDK installés, runtimes, système d'exploitation. La première chose à fournir quand « ça ne compile que chez moi ».",
          },
        ],
      },
    ],
  },
  {
    id: "nuget",
    title: "NuGet : les paquets .NET",
    level: 2,
    intro:
      "NuGet est le registre officiel des bibliothèques .NET : Entity Framework Core, les connecteurs de bases de données et des milliers d'autres s'y trouvent.",
    blocks: [
      {
        kind: "text",
        text: "Quand votre projet a besoin d'une bibliothèque (accéder à PostgreSQL, générer des JWT, valider des données), vous ne copiez pas du code : vous ajoutez un paquet NuGet. Le registre public est `nuget.org` ; les entreprises peuvent aussi héberger un registre privé pour leurs bibliothèques internes.",
      },
      {
        kind: "command",
        label: "Ajouter le connecteur SQLite pour Entity Framework Core",
        command: "dotnet add package Microsoft.EntityFrameworkCore.Sqlite",
        why: "Télécharge le paquet depuis `nuget.org` et l'ajoute au `.csproj` avec sa version. `Microsoft.EntityFrameworkCore.Sqlite` est le fournisseur officiel pour SQLite — parfait pour développer en local sans installer de serveur de base de données.",
        verify:
          "`dotnet list package` affiche le paquet avec son numéro de version.",
      },
      {
        kind: "text",
        text: "Bonne pratique : ne mettez jamais à jour tous les paquets en aveugle avant une mise en production. Les versions majeures peuvent contenir des changements incompatibles — lisez les notes de version, mettez à jour un paquet à la fois, et laissez vos tests valider.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "À quoi ressemble une journée de développement ASP.NET Core, de l'idée au commit.",
    blocks: [
      {
        kind: "diagram",
        title: "La boucle de développement",
        lines: [
          "1. `dotnet watch` tourne dans un terminal",
          "        │",
          "        ▼",
          "2. J'écris / modifie un endpoint dans l'éditeur",
          "        │  (sauvegarde → recompilation automatique)",
          "        ▼",
          "3. Je teste : fichier .http, Swagger UI ou curl",
          "        │",
          "        ├── ça marche → je passe à la fonctionnalité suivante",
          "        │",
          "        └── ça casse → je lis l'exception (page d'erreur détaillée en dev)",
          "                 │",
          "                 ▼",
          "         4. Point d'arrêt dans l'éditeur, pas à pas, je corrige",
          "                 │",
          "                 ▼",
          "         5. `dotnet test` : les tests existants passent toujours ?",
          "                 │",
          "                 ▼",
          "         6. Commit : le code + les tests + éventuellement une migration EF",
        ],
      },
      {
        kind: "list",
        items: [
          "Un terminal avec `dotnet watch`, un éditeur, un outil de requêtes : c'est tout l'atelier.",
          "Testez chaque endpoint à la main avant d'écrire le suivant : une API se valide requête par requête.",
          "Les migrations de base de données font partie du commit, comme le code.",
          "Avant de pousser : `dotnet build` sans avertissement nouveau, `dotnet test` au vert.",
        ],
      },
    ],
  },
  {
    id: "comprendre-les-erreurs",
    title: "Comprendre les erreurs",
    level: 2,
    intro:
      "En développement, ASP.NET Core affiche des pages d'erreur détaillées : apprenez à les lire, elles disent tout.",
    blocks: [
      {
        kind: "text",
        text: "Quand une exception survient en mode développement, le middleware de page d'exception affiche : le type de l'exception, son message, le fichier et la ligne exacts, et la pile d'appels (stack trace). En production, cette page est remplacée par un message générique — les détails sont journalisés côté serveur, jamais exposés.",
      },
      {
        kind: "fields",
        title: "Anatomie d'une erreur typique",
        fields: [
          {
            label: "Le type d'exception",
            value:
              "Par exemple `NullReferenceException` (objet null déréférencé) ou `InvalidOperationException` (usage invalide, comme un service mal enregistré). Le type oriente le diagnostic : il dit *ce qui* a échoué.",
          },
          {
            label: "Le message",
            value:
              "Souvent très explicite en .NET : « Cannot consume scoped service from singleton » vous dit exactement la règle violée. Lisez-le en entier avant de chercher ailleurs.",
          },
          {
            label: "La pile d'appels",
            value:
              "La liste des méthodes traversées, de la plus récente à la plus ancienne. La première ligne de *votre* code dans la pile est presque toujours l'endroit à corriger.",
          },
          {
            label: "Le code de statut HTTP",
            value:
              "Exception non gérée → `500`. Route inexistante → `404`. Paramètre invalide → `400`. Le statut dit au client *quelle catégorie* de problème est survenue.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe professionnel : reproduisez l'erreur avec la requête la plus simple possible (fichier `.http` ou `curl`), lisez la première ligne de votre code dans la pile d'appels, corrigez, puis ajoutez un test qui aurait attrapé le bug.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "minimal-apis-vs-mvc",
    title: "Minimal APIs vs contrôleurs MVC",
    level: 3,
    intro:
      "Deux styles pour écrire des API dans le même framework : comprendre leurs différences pour choisir en connaissance de cause.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "Minimal APIs", "Contrôleurs (MVC)"],
        rows: [
          [
            "Style",
            "Fonctions associées directement aux routes dans `Program.cs`",
            "Classes qui regroupent les actions d'une ressource",
          ],
          [
            "Cérémonie",
            "Minimale : une ligne par route",
            "Plus verbeuse : classe, attributs, méthodes",
          ],
          [
            "Idéal pour",
            "Microservices, prototypes, petites API, webhooks",
            "API structurées, grandes équipes, logique métier riche",
          ],
          [
            "Filtres et conventions",
            "Filtres d'endpoints, à déclarer route par route",
            "Filtres d'action, conventions et attributs réutilisables",
          ],
          [
            "Validation du modèle",
            "Manuelle (à coder explicitement)",
            "Automatique via `[ApiController]`",
          ],
          [
            "Organisation à grande échelle",
            "`Program.cs` peut devenir fouillis sans discipline (groupes de routes, extensions)",
            "Structure naturelle par contrôleur",
          ],
        ],
      },
      {
        kind: "text",
        text: "Les deux styles s'exécutent sur le même pipeline et offrent les mêmes capacités ; ils diffèrent par l'organisation du code, pas par la puissance.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Quand choisir les Minimal APIs",
            value:
              "Petite API, microservice, prototype à livrer vite, équipe réduite. Exemple : un webhook qui reçoit un événement et l'enregistre — dix lignes suffisent.",
          },
          {
            label: "Quand choisir les contrôleurs",
            value:
              "API avec des dizaines de ressources, équipe nombreuse, besoin de filtres et de conventions partagés. Exemple : le backend d'une application métier avec 40 entités.",
          },
          {
            label: "Peut-on mélanger ?",
            value:
              "Oui : la même application peut exposer des Minimal APIs et des contrôleurs. On commence souvent en Minimal API et on migre vers des contrôleurs quand la surface grandit.",
          },
        ],
      },
    ],
  },
  {
    id: "routing",
    title: "Le routing",
    level: 3,
    intro:
      "Le routing associe une URL à votre code : modèles de route, paramètres et contraintes.",
    blocks: [
      {
        kind: "text",
        text: "Le routing compare l'URL entrante aux modèles déclarés (`/produits/{id}`) et extrait les valeurs des segments entre accolades pour les passer à votre code.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Comment ça fonctionne",
            value:
              "Chaque `MapGet`/`MapPost` (ou attribut `[HttpGet]`) enregistre un modèle. À la réception d'une requête, le routeur trouve le premier modèle compatible, convertit les segments au type des paramètres, et exécute le code associé.",
          },
          {
            label: "Les contraintes de route",
            value:
              "`{id:int}` n'accepte que les entiers, `{nom:minlength(3)}` exige 3 caractères minimum. Une URL non conforme ne correspond pas à la route : vous obtenez `404`, pas une erreur de conversion.",
          },
          {
            label: "Exemple simple",
            value:
              "`app.MapGet(\"/produits/{id:int}\", (int id) => …)` : `/produits/42` appelle la fonction avec `id = 42` ; `/produits/abc` ne correspond pas.",
          },
          {
            label: "Exemple réel",
            value:
              "`/api/commandes/{commandeId}/lignes/{ligneId}` : deux paramètres extraits de l'URL pour atteindre une sous-ressource — le motif standard des API REST hiérarchiques.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Deux routes ambiguës (`/fichiers/nouveau` et `/fichiers/{nom}`) : `/fichiers/nouveau` peut être capturé par `{nom}`. Ordre et contraintes explicites lèvent l'ambiguïté.",
          },
          {
            label: "Bonne pratique",
            value:
              "Des URL stables et prévisibles : noms de ressources au pluriel, hiérarchie logique, pas de verbes dans les chemins (le verbe HTTP porte déjà l'action).",
          },
          {
            label: "Concepts liés",
            value:
              "Model binding (d'où viennent les paramètres), contrôleurs et attributs `[HttpGet]`, groupes de routes `MapGroup`.",
          },
        ],
      },
    ],
  },
  {
    id: "controleurs",
    title: "Les contrôleurs",
    level: 3,
    intro:
      "Le style MVC : des classes qui regroupent les actions d'une ressource, avec attributs de routage.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Controllers/ProduitsController.cs — CRUD complet",
        code: "[ApiController]\n[Route(\"api/[controller]\")] // → api/produits ([controller] = nom sans « Controller »)\npublic class ProduitsController : ControllerBase\n{\n    private readonly BoutiqueContext _db;\n\n    // Le DbContext est injecté par le constructeur (injection de dépendances).\n    public ProduitsController(BoutiqueContext db) => _db = db;\n\n    [HttpGet] // GET api/produits\n    public async Task<ActionResult<IEnumerable<Produit>>> Tous()\n        => Ok(await _db.Produits.ToListAsync());\n\n    [HttpGet(\"{id:int}\")] // GET api/produits/42\n    public async Task<ActionResult<Produit>> Un(int id)\n    {\n        var produit = await _db.Produits.FindAsync(id);\n        return produit is null ? NotFound() : Ok(produit);\n    }\n\n    [HttpPost] // POST api/produits + JSON\n    public async Task<ActionResult<Produit>> Creer(Produit produit)\n    {\n        _db.Produits.Add(produit);\n        await _db.SaveChangesAsync();\n        // 201 + en-tête Location vers la nouvelle ressource : la convention REST.\n        return CreatedAtAction(nameof(Un), new { id = produit.Id }, produit);\n    }\n\n    [HttpDelete(\"{id:int}\")] // DELETE api/produits/42\n    public async Task<IActionResult> Supprimer(int id)\n    {\n        var produit = await _db.Produits.FindAsync(id);\n        if (produit is null) return NotFound();\n        _db.Produits.Remove(produit);\n        await _db.SaveChangesAsync();\n        return NoContent(); // 204 : succès sans corps de réponse.\n    }\n}",
      },
      {
        kind: "fields",
        title: "Ce que `[ApiController]` active automatiquement",
        fields: [
          {
            label: "Validation automatique",
            value:
              "Si le modèle est invalide (annotation `[Required]` non respectée…), le framework répond `400` avec le détail des erreurs, sans que vous écriviez une ligne.",
          },
          {
            label: "Inférence des sources",
            value:
              "Un paramètre complexe vient du corps JSON, un `int id` correspond au `{id}` de la route : pas besoin d'attributs dans les cas standards.",
          },
          {
            label: "Réponses d'erreur standard",
            value:
              "Les erreurs sont renvoyées au format `ProblemDetails` (RFC 7807), un standard que les clients savent interpréter.",
          },
        ],
      },
      {
        kind: "text",
        text: "N'oubliez pas d'enregistrer les contrôleurs : `builder.Services.AddControllers();` dans les services, puis `app.MapControllers();` dans le pipeline. Sans ces deux lignes, vos contrôleurs existent mais aucune route ne les atteint — une cause classique de `404` mystérieux.",
      },
    ],
  },
  {
    id: "model-binding",
    title: "Model binding et validation",
    level: 3,
    intro:
      "Le framework convertit automatiquement les données de la requête en objets C# : d'où vient chaque valeur, et comment la valider.",
    blocks: [
      {
        kind: "text",
        text: "Le model binding cherche chaque paramètre d'action dans la route, la query string, les en-têtes puis le corps, et le convertit au type C# attendu.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Les sources explicites",
            value:
              "`[FromRoute]` (segment d'URL), `[FromQuery]` (`?page=2`), `[FromBody]` (JSON du corps), `[FromHeader]`, `[FromForm]` (formulaire). À préciser quand l'inférence automatique ne suffit pas.",
          },
          {
            label: "Exemple simple",
            value:
              "`[HttpGet(\"recherche\")] public IActionResult Chercher([FromQuery] string q)` : `GET /recherche?q=clavier` remplit `q` avec « clavier ».",
          },
          {
            label: "La validation par annotations",
            value:
              "`[Required]`, `[StringLength(100)]`, `[Range(0, 10000)]`, `[EmailAddress]` sur les propriétés du modèle : avec `[ApiController]`, un modèle invalide produit un `400` détaillé automatiquement.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier que le corps JSON ne peut être lu qu'une fois : un seul paramètre `[FromBody]` par action. Deux paramètres complexes → le second arrive null.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne jamais exposer vos entités de base de données directement : créez des DTO (objets de transfert) dédiés à l'API. Ils protègent contre le sur-postage (un client qui enverrait `IsAdmin: true`).",
          },
          {
            label: "Concepts liés",
            value:
              "Contrôleurs, ProblemDetails, sérialisation JSON (`System.Text.Json`).",
          },
        ],
      },
      {
        kind: "code",
        language: "csharp",
        title: "DTO avec validation par annotations",
        code: "public class CreerProduitDto\n{\n    [Required(ErrorMessage = \"Le nom est obligatoire.\")]\n    [StringLength(100, MinimumLength = 2)]\n    public string Nom { get; set; } = \"\";\n\n    [Range(0, 1_000_000, ErrorMessage = \"Le prix doit être positif.\")]\n    public decimal Prix { get; set; }\n}\n\n// Dans l'action : si le JSON ne respecte pas ces règles,\n// [ApiController] répond 400 avant même d'entrer dans la méthode.",
      },
    ],
  },
  {
    id: "injection-dependances",
    title: "L'injection de dépendances (native)",
    level: 3,
    intro:
      "ASP.NET Core intègre un conteneur d'injection de dépendances : déclarez vos services, le framework les fournit.",
    blocks: [
      {
        kind: "text",
        text: "L'idée en une phrase : au lieu que chaque classe crée ses dépendances (`new ServiceMail()`), elle les déclare dans son constructeur et le framework les lui fournit. Résultat : code découplé, facilement testable (on injecte des doublures dans les tests), et un seul endroit où la construction des objets est configurée.",
      },
      {
        kind: "code",
        language: "csharp",
        title: "Program.cs — enregistrer et consommer un service",
        code: "// Enregistrement : « quand on demande IStockService, construis StockService ».\nbuilder.Services.AddScoped<IStockService, StockService>();\n\n// Consommation : le framework injecte automatiquement dans le constructeur.\npublic class ProduitsController : ControllerBase\n{\n    private readonly IStockService _stock;\n    public ProduitsController(IStockService stock) => _stock = stock;\n}",
      },
      {
        kind: "table",
        headers: ["Durée de vie", "Comportement", "Quand l'utiliser"],
        rows: [
          [
            "Singleton",
            "Une seule instance pour toute l'application",
            "Services sans état, caches, configuration",
          ],
          [
            "Scoped",
            "Une instance par requête HTTP",
            "DbContext, services liés à la requête courante",
          ],
          [
            "Transient",
            "Une nouvelle instance à chaque injection",
            "Services légers et sans état",
          ],
        ],
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Problem : injecter un service Scoped (comme un `DbContext`) dans un Singleton → exception « Cannot consume scoped service from singleton ». Why : le Singleton vit plus longtemps que la requête, il retiendrait un DbContext périmé. Better : injecter une fabrique (`IServiceScopeFactory`) ou revoir la durée de vie.",
          },
          {
            label: "Bonne pratique",
            value:
              "Programmez contre des interfaces (`IStockService`), pas des classes concrètes : c'est ce qui rend les tests possibles et les implémentations interchangeables.",
          },
          {
            label: "Concepts liés",
            value:
              "Pattern Options (`IOptions<T>`), `BackgroundService`, tests avec doublures.",
          },
        ],
      },
    ],
  },
  {
    id: "options-pattern",
    title: "La configuration typée (pattern Options)",
    level: 3,
    intro:
      "Lire `appsettings.json` avec des classes C# typées plutôt qu'avec des chaînes magiques.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Lire une section de configuration en objet typé",
        code: "// appsettings.json :\n// { \"Expedition\": { \"DelaiJours\": 3, \"Transporteur\": \"ColisPlus\" } }\n\npublic class ReglagesExpedition\n{\n    public int DelaiJours { get; set; }\n    public string Transporteur { get; set; } = \"\";\n}\n\n// Enregistrement (Program.cs) :\nbuilder.Services.Configure<ReglagesExpedition>(\n    builder.Configuration.GetSection(\"Expedition\"));\n\n// Consommation : IOptions<T> est injecté comme n'importe quel service.\npublic class ExpeditionService\n{\n    private readonly ReglagesExpedition _reglages;\n    public ExpeditionService(IOptions<ReglagesExpedition> options)\n        => _reglages = options.Value;\n}",
      },
      {
        kind: "text",
        text: "Avantage décisif : si une clé est renommée ou mal typée dans le JSON, l'erreur apparaît à un endroit central et prévisible, pas dispersée en dix `GetValue<string>(\"Expedition:Transporteur\")` fragiles. Pour une validation au démarrage (valeurs obligatoires, plages), `ValidateDataAnnotations()` ou `ValidateOnStart()` transforment une erreur de configuration en échec rapide et explicite plutôt qu'en bug à 3 heures du matin.",
      },
    ],
  },
  {
    id: "middlewares",
    title: "Les middlewares et le pipeline",
    level: 3,
    intro:
      "Écrire vos propres maillons : journalisation, mesure de durée, enrichissement des requêtes.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Program.cs — un middleware qui mesure la durée des requêtes",
        code: "app.Use(async (context, next) =>\n{\n    var debut = DateTime.UtcNow; // avant : la requête arrive\n    await next(context);          // passe au maillon suivant\n    var duree = DateTime.UtcNow - debut; // après : la réponse repart\n    Console.WriteLine($\"{context.Request.Path} → {duree.TotalMilliseconds:F0} ms\");\n});",
      },
      {
        kind: "text",
        text: "Un middleware est une fonction qui reçoit le contexte HTTP et un délégué `next` : elle agit avant, appelle `next` pour continuer, puis agit après.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Pourquoi c'est puissant",
            value:
              "Tout ce qui est transversal (logs, erreurs, sécurité, CORS) s'écrit une fois comme middleware au lieu d'être dupliqué dans chaque endpoint.",
          },
          {
            label: "L'ordre, illustré",
            value:
              "Si le middleware d'authentification est placé *après* les endpoints, il ne verra jamais les requêtes : l'ordre d'enregistrement dans `Program.cs` est l'ordre d'exécution.",
          },
          {
            label: "L'ordre recommandé",
            value:
              "Exceptions → HSTS → redirection HTTPS → fichiers statiques → routing → CORS → authentification → autorisation → endpoints. Cet ordre est documenté par Microsoft ; le suivre évite des failles subtiles.",
          },
          {
            label: "Court-circuiter",
            value:
              "Ne pas appeler `next` et répondre directement : c'est ainsi qu'un middleware de cache ou de limitation de débit (rate limiting) évite du travail inutile.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`app.UseAuthorization()` sans `app.UseAuthentication()` avant : l'autorisation s'évalue sur une identité vide, tout est refusé (ou pire, mal évalué).",
          },
          {
            label: "Concepts liés",
            value:
              "Gestion des erreurs, CORS, authentification, `WebApplication` et `RequestDelegate`.",
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
      "Jamais de stack trace exposée : des erreurs prévisibles, journalisées, au format standard.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Program.cs — erreurs détaillées en dev, sûres en prod",
        code: "if (app.Environment.IsDevelopment())\n{\n    app.UseDeveloperExceptionPage(); // page détaillée, réservée au développeur\n}\nelse\n{\n    app.UseExceptionHandler(\"/erreur\"); // en prod : réponse générique + log serveur\n}\n\n// L'endpoint /erreur renvoie un ProblemDetails standard :\napp.Map(\"/erreur\", () => Results.Problem(\n    title: \"Une erreur inattendue est survenue.\",\n    statusCode: 500));",
      },
      {
        kind: "text",
        text: "Une exception non gérée est interceptée par le middleware d'exceptions, journalisée côté serveur, et transformée en réponse HTTP sûre pour le client.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "ProblemDetails, le standard",
            value:
              "Format JSON normalisé (RFC 7807) : `title`, `status`, `detail`, `instance`. Les clients savent le parser ; préférez-le aux messages d'erreur artisanaux.",
          },
          {
            label: "Exemple réel",
            value:
              "Produit introuvable → `404` avec `ProblemDetails` (« Produit 42 introuvable »). Données invalides → `400` avec la liste des champs fautifs. Panne interne → `500` générique, détail dans les logs uniquement.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Laisser `UseDeveloperExceptionPage()` actif en production : la pile d'appels et les chemins de fichiers deviennent visibles publiquement — une fuite d'information.",
          },
          {
            label: "Bonne pratique",
            value:
              "Distinguez erreurs métier (404, 400, 409 : le client peut réagir) et erreurs techniques (500 : à journaliser avec un identifiant de corrélation pour retrouver la trace).",
          },
          {
            label: "Concepts liés",
            value:
              "Logging, middlewares, `[ApiController]` et validation automatique.",
          },
        ],
      },
    ],
  },
  {
    id: "configuration-appsettings",
    title: "Configuration et `appsettings.json`",
    level: 3,
    intro:
      "Séparer le code de sa configuration : un même binaire, des réglages par environnement.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "appsettings.json — la structure typique",
        code: "{\n  \"Logging\": {\n    \"LogLevel\": { \"Default\": \"Information\", \"Microsoft.AspNetCore\": \"Warning\" }\n  },\n  \"AllowedHosts\": \"*\",\n  \"ConnectionStrings\": {\n    \"Boutique\": \"Data Source=boutique.db\"\n  },\n  \"Expedition\": { \"DelaiJours\": 3 }\n}",
      },
      {
        kind: "text",
        text: "La configuration est une superposition de sources : `appsettings.json`, puis `appsettings.{Environnement}.json`, puis variables d'environnement, puis secrets — chaque couche surcharge la précédente.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Pourquoi cette superposition",
            value:
              "Le même code tourne en local, en test et en production avec des réglages différents (base locale vs base managée). Sans ce système, il faudrait recompiler pour changer d'environnement.",
          },
          {
            label: "Exemple réel",
            value:
              "`builder.Configuration.GetConnectionString(\"Boutique\")` lit la chaîne du fichier en local, et la variable d'environnement `ConnectionStrings__Boutique` en production (le `__` sépare les niveaux).",
          },
          {
            label: "Les secrets en développement",
            value:
              "Jamais de mot de passe dans `appsettings.json` versionné : l'outil `user-secrets` stocke les secrets hors du dépôt, uniquement sur votre machine.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Commiter une clé API ou un mot de passe dans `appsettings.json` : une fois poussé sur un dépôt, un secret est considéré comme compromis, même si on le retire après.",
          },
          {
            label: "Bonne pratique",
            value:
              "`appsettings.json` versionné = valeurs non sensibles et valeurs par défaut ; secrets = `user-secrets` en dev, variables d'environnement ou coffre de secrets en production.",
          },
          {
            label: "Concepts liés",
            value:
              "Pattern Options (`IOptions<T>`), variables d'environnement, `dotnet user-secrets`.",
          },
        ],
      },
      {
        kind: "command",
        label: "Stocker un secret local hors du dépôt",
        command: "dotnet user-secrets set \"Jwt:Cle\" \"une-cle-secrete-locale\"",
        why: "Initialise (`dotnet user-secrets init`, une fois par projet) puis enregistre un secret dans un fichier hors du dépôt, lié à votre machine. En code, `builder.Configuration[\"Jwt:Cle\"]` le lit comme s'il venait d'`appsettings.json`.",
        verify:
          "`dotnet user-secrets list` affiche la clé (pas sa valeur complète) : le secret est stocké.",
      },
    ],
  },
  {
    id: "logging",
    title: "Le logging",
    level: 3,
    intro:
      "Observer l'application en production : ce qui est journalisé, à quel niveau, et où ça part.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Journaliser depuis un contrôleur",
        code: "public class ProduitsController : ControllerBase\n{\n    private readonly ILogger<ProduitsController> _logger;\n    public ProduitsController(ILogger<ProduitsController> log) => _logger = log;\n\n    [HttpGet(\"{id:int}\")]\n    public async Task<ActionResult<Produit>> Un(int id)\n    {\n        _logger.LogInformation(\"Lecture du produit {ProduitId}\", id);\n        var produit = await _db.Produits.FindAsync(id);\n        if (produit is null)\n        {\n            _logger.LogWarning(\"Produit {ProduitId} introuvable\", id);\n            return NotFound();\n        }\n        return Ok(produit);\n    }\n}",
      },
      {
        kind: "text",
        text: "`ILogger<T>` écrit des événements horodatés et structurés (placeholders `{ProduitId}` interrogeables) vers la console, des fichiers ou un service centralisé.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Les niveaux, du plus verbeux au plus grave",
            value:
              "`Trace` → `Debug` → `Information` → `Warning` → `Error` → `Critical`. On règle le seuil par environnement : `Information` en prod, `Debug` en local.",
          },
          {
            label: "Pourquoi les placeholders",
            value:
              "`LogInformation(\"Produit {ProduitId}\", id)` garde `id` comme champ structuré : on peut filtrer « tous les logs du produit 42 ». La concaténation de chaînes perd cette structure.",
          },
          {
            label: "Où vont les logs",
            value:
              "Par défaut : la console (capturée par Docker, le cloud, le reverse proxy). Pour aller plus loin, des bibliothèques comme Serilog ajoutent fichiers, JSON structuré et envoi vers des plateformes d'observabilité.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Journaliser des données personnelles ou des secrets (mots de passe, tokens) : les logs sont lus par beaucoup de monde et conservés longtemps. Ne jamais y mettre de secret.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un log doit répondre à « que s'est-il passé, pour qui, avec quel résultat » : `Commande 1234 payée (montant 89 €, client 567)`. Assez pour diagnostiquer sans rouvrir le code.",
          },
          {
            label: "Concepts liés",
            value:
              "Gestion des erreurs, configuration (`Logging:LogLevel`), observabilité.",
          },
        ],
      },
    ],
  },
  {
    id: "ef-core-intro",
    title: "Entity Framework Core : l'ORM",
    level: 3,
    intro:
      "Parler aux bases de données en C# plutôt qu'en SQL brut : le rôle d'EF Core et son vocabulaire.",
    blocks: [
      {
        kind: "text",
        text: "Entity Framework Core est l'ORM officiel de .NET : il traduit vos classes C# en tables et vos requêtes LINQ en SQL, et suit les modifications pour les enregistrer.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Le vocabulaire",
            value:
              "`DbContext` = la session de travail avec la base (requêtes + suivi des changements). `DbSet<Produit>` = la table des produits vue depuis C#. Entité = une classe persistée. Migration = un script versionné qui fait évoluer le schéma.",
          },
          {
            label: "Pourquoi un ORM",
            value:
              "Écrire le SQL à la main pour chaque opération est répétitif et source d'erreurs ; l'ORM gère le mapping, les paramètres (anti-injection) et le suivi des modifications. Le SQL reste accessible pour les requêtes complexes.",
          },
          {
            label: "Exemple simple",
            value:
              "`await db.Produits.Where(p => p.Prix < 100).ToListAsync()` : le `Where` C# devient un `WHERE` SQL exécuté côté base, pas un filtrage en mémoire.",
          },
          {
            label: "Exemple réel",
            value:
              "Créer un produit : `_db.Produits.Add(p); await _db.SaveChangesAsync();` — l'ORM génère l'`INSERT`, récupère l'identifiant auto-incrémenté et le remet dans `p.Id`.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni la base de données elle-même (il lui faut un fournisseur : SQLite, SQL Server, PostgreSQL…), ni un substitut à la compréhension du SQL : un mauvais LINQ génère un mauvais SQL.",
          },
          {
            label: "Concepts liés",
            value:
              "Migrations, LINQ, suivi des changements (`AsNoTracking`), DTO.",
          },
        ],
      },
      {
        kind: "code",
        language: "csharp",
        title: "Le DbContext : la porte d'entrée vers la base",
        code: "public class BoutiqueContext : DbContext\n{\n    // Chaque DbSet correspond à une table.\n    public DbSet<Produit> Produits => Set<Produit>();\n    public DbSet<Commande> Commandes => Set<Commande>();\n\n    public BoutiqueContext(DbContextOptions<BoutiqueContext> options)\n        : base(options) { }\n}\n\npublic class Produit\n{\n    public int Id { get; set; }          // clé primaire par convention\n    public string Nom { get; set; } = \"\";\n    public decimal Prix { get; set; }\n}\n\n// Enregistrement (Program.cs) :\nbuilder.Services.AddDbContext<BoutiqueContext>(options =>\n    options.UseSqlite(builder.Configuration.GetConnectionString(\"Boutique\")));",
      },
    ],
  },
  {
    id: "ef-core-migrations",
    title: "EF Core : les migrations",
    level: 3,
    intro:
      "Faire évoluer le schéma de la base de données de façon versionnée, comme le code.",
    blocks: [
      {
        kind: "text",
        text: "Le problème que résolvent les migrations : votre modèle C# évolue (nouvelle propriété, nouvelle table), mais la base existante contient déjà des données. Plutôt que de recréer la base à la main, EF Core compare le modèle au dernier état connu et génère un script de migration — versionné, relu, appliqué dans chaque environnement.",
      },
      {
        kind: "command",
        label: "Installer l'outil EF Core en ligne de commande",
        command: "dotnet tool install --global dotnet-ef",
        why: "`dotnet-ef` est l'outil officiel qui crée et applique les migrations. L'installation `--global` le rend disponible dans tous vos projets (une seule fois par machine).",
        verify:
          "`dotnet ef --version` affiche un numéro de version.",
      },
      {
        kind: "command",
        label: "Créer une migration après avoir modifié le modèle",
        command: "dotnet ef migrations add AjoutPrixProduit",
        why: "Génère une classe de migration (méthodes `Up`/`Down`) décrivant la différence entre le modèle actuel et la base. Le nom doit décrire le changement : il apparaîtra dans l'historique du projet.",
        verify:
          "Un dossier `Migrations/` apparaît avec la nouvelle migration et un instantané du modèle.",
      },
      {
        kind: "command",
        label: "Appliquer les migrations à la base",
        command: "dotnet ef database update",
        why: "Exécute les migrations en attente sur la base de données cible (celle de la chaîne de connexion). En production, on l'exécute au déploiement — jamais à la main sans filet.",
        verify:
          "La table `__EFMigrationsHistory` de la base liste les migrations appliquées.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Modifier le modèle puis oublier `database update` : l'application démarre mais échoue sur les nouvelles colonnes (« no such column »). Le modèle et la base doivent évoluer ensemble.",
          },
          {
            label: "Bonne pratique",
            value:
              "Relisez chaque migration générée avant de l'appliquer : l'outil peut parfois détruire et recréer une table (perte de données) là où un simple `ALTER` suffisait.",
          },
          {
            label: "En production",
            value:
              "Appliquez les migrations au déploiement via un script CI/CD ou `dotnet ef database update` ciblé — et sauvegardez toujours la base avant une migration structurelle.",
          },
          {
            label: "Concepts liés",
            value:
              "DbContext, fournisseurs (`UseSqlite`, `UseSqlServer`, `UseNpgsql`), scripts idempotents.",
          },
        ],
      },
    ],
  },
  {
    id: "ef-core-requetes",
    title: "EF Core : requêtes et suivi",
    level: 3,
    intro:
      "Écrire des requêtes efficaces : LINQ côté base, suivi des changements, et le piège du N+1.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Requêtes LINQ : ce qui s'exécute où",
        code: "// Filtre + tri exécutés CÔTÉ BASE (un seul aller-retour SQL) :\nvar page = await db.Produits\n    .Where(p => p.Prix < 100)\n    .OrderBy(p => p.Nom)\n    .Skip(20).Take(10)\n    .AsNoTracking() // lecture seule : pas de suivi, moins de mémoire\n    .ToListAsync();\n\n// Chargement d'une entité SUIVIE pour la modifier :\nvar produit = await db.Produits.FindAsync(id);\nproduit.Prix = 99; // le contexte a détecté le changement\nawait db.SaveChangesAsync(); // génère l'UPDATE",
      },
      {
        kind: "text",
        text: "LINQ construit la requête en mémoire, mais rien ne part vers la base tant que vous n'appelez pas `ToListAsync()`, `FirstAsync()` ou `SaveChangesAsync()` (exécution différée).",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Le suivi des changements",
            value:
              "Par défaut, EF Core « suit » les entités chargées pour détecter les modifications au `SaveChanges`. En lecture seule (listes, rapports), `AsNoTracking()` désactive ce suivi : moins de mémoire, plus rapide.",
          },
          {
            label: "Le piège N+1",
            value:
              "Charger 100 commandes puis accéder à `commande.Client` une par une = 101 requêtes. Better : `.Include(c => c.Client)` charge tout en une seule requête (jointure).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Appeler `.ToList()` (synchrone) dans une action `async` : bloque le thread pendant l'accès base. Toujours les variantes `Async` (`ToListAsync`, `SaveChangesAsync`) avec `await`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne retournez jamais `IQueryable` depuis un service vers un contrôleur : la requête s'exécuterait hors du scope du DbContext. Matérialisez (`ToListAsync`) avant de sortir.",
          },
          {
            label: "Concepts liés",
            value:
              "DbContext Scoped, DTO, pagination (`Skip`/`Take`).",
          },
        ],
      },
    ],
  },
  {
    id: "authentification-bases",
    title: "Authentification : les bases",
    level: 3,
    intro:
      "Qui êtes-vous ? Les mécanismes pour identifier l'appelant d'une API.",
    blocks: [
      {
        kind: "text",
        text: "L'authentification vérifie l'identité de l'appelant (via un token, un cookie, une clé) et construit un « principal » (utilisateur + revendications) que le reste du pipeline peut consulter.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Les mécanismes courants",
            value:
              "JWT (jeton signé, standard pour les API consommées par mobile/SPA), cookies (applications web classiques avec pages), clés d'API (intégrations machine-à-machine simples).",
          },
          {
            label: "Le JWT en bref",
            value:
              "Un jeton en trois parties (en-tête, contenu, signature) : le serveur le signe avec une clé secrète, le client le renvoie dans l'en-tête `Authorization: Bearer <jeton>`. Le serveur vérifie la signature sans stocker de session.",
          },
          {
            label: "Exemple réel",
            value:
              "Connexion : `POST /login` vérifie le mot de passe et renvoie un JWT. Appels suivants : le client joint le JWT ; l'API sait qui appelle sans interroger la base à chaque fois.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Stocker des données sensibles dans le contenu du JWT : il est signé mais pas chiffré, son contenu est lisible par quiconque le possède. Identifiant et rôles uniquement.",
          },
          {
            label: "Bonne pratique",
            value:
              "Clé de signature robuste stockée en secret (jamais dans le code), durée de vie courte pour les jetons d'accès, HTTPS obligatoire : un JWT intercepté = usurpation d'identité.",
          },
          {
            label: "Concepts liés",
            value:
              "Autorisation (`[Authorize]`), ASP.NET Core Identity, refresh tokens.",
          },
        ],
      },
    ],
  },
  {
    id: "autorisation",
    title: "Autorisation : `[Authorize]`",
    level: 3,
    intro:
      "Une fois l'identité connue : qui a le droit de faire quoi.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Protéger des endpoints (contrôleur)",
        code: "[ApiController]\n[Route(\"api/[controller]\")]\n[Authorize] // tout le contrôleur exige un utilisateur authentifié\npublic class CommandesController : ControllerBase\n{\n    [HttpGet]\n    public IActionResult MesCommandes()\n    {\n        // L'identité de l'appelant :\n        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);\n        // … retourne les commandes de cet utilisateur\n        return Ok(/* … */);\n    }\n\n    [AllowAnonymous] // exception : cette action reste publique\n    [HttpGet(\"publiques\")]\n    public IActionResult Catalogue() => Ok(/* … */);\n\n    [Authorize(Roles = \"Admin\")] // seuls les admins\n    [HttpDelete(\"{id:int}\")]\n    public IActionResult Supprimer(int id) => NoContent();\n}",
      },
      {
        kind: "text",
        text: "L'autorisation évalue des règles (authentifié ? rôle requis ? condition métier ?) sur l'identité construite par l'authentification, et répond `401` (non authentifié) ou `403` (interdit).",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Rôles vs policies",
            value:
              "Les rôles (`Admin`, `Vendeur`) sont simples et suffisent souvent. Les policies (`RequireClaim`, exigences personnalisées) expriment des règles métier fines : « l'auteur de la commande ou un admin ».",
          },
          {
            label: "Exemple réel",
            value:
              "`GET /api/commandes` : l'utilisateur ne voit que ses commandes (filtre par `NameIdentifier`). `DELETE /api/produits/5` : réservé au rôle `Admin`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Protéger les routes mais oublier de vérifier la propriété des données : l'utilisateur 12 appelle `GET /commandes/99` et voit la commande de l'utilisateur 7. L'autorisation doit aussi filtrer les données, pas seulement les routes.",
          },
          {
            label: "Bonne pratique",
            value:
              "Par défaut tout est protégé (`[Authorize]` au niveau du contrôleur), on ouvre explicitement (`[AllowAnonymous]`) : l'oubli se traduit par un refus, pas par une fuite.",
          },
          {
            label: "Concepts liés",
            value:
              "Authentification JWT, ASP.NET Core Identity, ordre des middlewares.",
          },
        ],
      },
    ],
  },
  {
    id: "aspnet-identity",
    title: "ASP.NET Core Identity",
    level: 3,
    intro:
      "Le système complet de gestion des utilisateurs, quand le JWT seul ne suffit plus.",
    blocks: [
      {
        kind: "text",
        text: "ASP.NET Core Identity est la brique officielle pour gérer des comptes utilisateurs : inscription, hachage des mots de passe, confirmation d'e-mail, réinitialisation, double authentification, rôles. Il s'appuie sur Entity Framework Core pour stocker utilisateurs et rôles.",
      },
      {
        kind: "text",
        text: "Identity fournit les tables (`AspNetUsers`, `AspNetRoles`…), les API (`UserManager`, `SignInManager`) et les pages par défaut pour tout le cycle de vie d'un compte.",
      },
      {
        kind: "text",
        text: "Application avec inscription/connexion d'utilisateurs, gestion des rôles, récupération de mot de passe : tout ce qui est fastidieux et risqué à réinventer.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Quand s'en passer",
            value:
              "API pure consommée par un frontend qui délègue l'authentification (fournisseur externe, JWT émis par un autre service) : un simple bearer JWT suffit.",
          },
          {
            label: "Sécurité intégrée",
            value:
              "Mots de passe hachés avec un algorithme adaptatif, protection contre l'énumération des comptes, verrouillage après échecs répétés : des détails faciles à rater quand on code soi-même.",
          },
          {
            label: "Concepts liés",
            value:
              "Entity Framework Core (stockage), authentification par cookies ou tokens, autorisation.",
          },
        ],
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité : les fondamentaux",
    level: 3,
    intro:
      "Les mécanismes défensifs à connaître : HTTPS, CORS, validation — la sécurité comme habitude, pas comme rustine.",
    blocks: [
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "HTTPS partout",
            value:
              "`app.UseHttpsRedirection()` redirige le HTTP vers le HTTPS. En développement, `dotnet dev-certs https --trust` approuve le certificat local. Sans HTTPS, tokens et mots de passe circulent en clair.",
          },
          {
            label: "CORS : qui peut appeler l'API",
            value:
              "Par défaut, un navigateur bloque les appels d'un site vers une API d'un autre domaine. CORS déclare explicitement quels frontends sont autorisés — une liste blanche, pas `AllowAnyOrigin` en production.",
          },
          {
            label: "Validation des entrées",
            value:
              "Toute donnée venant du client est suspecte : annotations de validation, tailles maximales, types stricts. EF Core paramètre ses requêtes (pas d'injection SQL via LINQ), mais le SQL brut exige des paramètres explicites.",
          },
          {
            label: "En-têtes de sécurité",
            value:
              "`app.UseHsts()` (forcer le HTTPS côté navigateur), et des en-têtes comme `X-Content-Type-Options: nosniff` : des gains gratuits contre des attaques classiques.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`AllowAnyOrigin()` + `AllowCredentials()` en production : n'importe quel site peut alors appeler l'API avec les cookies de l'utilisateur. En dev ça dépanne, en prod c'est une faille.",
          },
          {
            label: "Bonne pratique",
            value:
              "Pensez « qu'est-ce qui arrive si ce champ contient quelque chose de malveillant ? » pour chaque entrée : taille, type, plage, encodage. La sécurité est une habitude de validation, pas un module qu'on ajoute à la fin.",
          },
          {
            label: "Concepts liés",
            value:
              "Authentification/autorisation, gestion des erreurs, OWASP (référentiel des risques web).",
          },
        ],
      },
      {
        kind: "code",
        language: "csharp",
        title: "Program.cs — CORS restreint au frontend connu",
        code: "builder.Services.AddCors(options =>\n{\n    options.AddPolicy(\"Front\", policy =>\n        policy.WithOrigins(\"https://app.example.com\") // liste blanche explicite\n              .AllowAnyHeader()\n              .AllowAnyMethod());\n});\n\nvar app = builder.Build();\napp.UseCors(\"Front\"); // placé AVANT les endpoints, APRÈS le routing",
      },
    ],
  },
  {
    id: "tests",
    title: "Les tests",
    level: 3,
    intro:
      "Tester une API ASP.NET Core : tests unitaires des services, tests d'intégration des endpoints.",
    blocks: [
      {
        kind: "command",
        label: "Créer un projet de tests xUnit",
        command: "dotnet new xunit -n BoutiqueApi.Tests",
        why: "xUnit est le framework de tests utilisé par les modèles .NET. Le projet généré contient un exemple de test et référence le framework d'assertions.",
        verify:
          "Le dossier `BoutiqueApi.Tests/` contient un fichier de test d'exemple.",
      },
      {
        kind: "command",
        label: "Lier les tests au projet API et les exécuter",
        command: "dotnet test",
        why: "Compile la solution puis exécute tous les tests, en affichant le résumé (réussis/échoués). C'est la commande que l'intégration continue lancera à chaque push.",
        verify:
          "Le résumé affiche `Passed!` avec le nombre de tests exécutés.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Tests unitaires",
            value:
              "Testent une classe isolée (un service métier) en injectant des doublures à la place de ses dépendances — rendus possibles par l'injection par interfaces. Rapides, nombreux.",
          },
          {
            label: "Tests d'intégration",
            value:
              "`WebApplicationFactory` (paquet `Microsoft.AspNetCore.Mvc.Testing`) démarre votre vraie application en mémoire : on envoie de vraies requêtes HTTP et on vérifie les vraies réponses, base de données de test comprise.",
          },
          {
            label: "Exemple simple (unitaire)",
            value:
              "`Assert.Equal(90, service.Remise(100, 10));` : on vérifie qu'une règle de calcul se comporte comme prévu, sans base ni réseau.",
          },
          {
            label: "Exemple réel (intégration)",
            value:
              "`POST /api/produits` avec un JSON invalide → on assert un `400` ; puis avec un JSON valide → `201` et le produit est en base. Le contrat de l'API est verrouillé.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Tester contre la base de développement partagée : les tests se polluent mutuellement et deviennent flaky. Better : base SQLite en mémoire ou base dédiée recréée par test.",
          },
          {
            label: "Bonne pratique",
            value:
              "La pyramide : beaucoup de tests unitaires rapides, quelques tests d'intégration sur les parcours critiques (auth, paiement, création de commande), pas de tests qui dépendent de l'ordre d'exécution.",
          },
          {
            label: "Concepts liés",
            value:
              "Injection de dépendances (testabilité), `dotnet test`, CI/CD.",
          },
        ],
      },
      {
        kind: "code",
        language: "csharp",
        title: "Test d'intégration : l'API de bout en bout",
        code: "// Avec WebApplicationFactory<Program> (Microsoft.AspNetCore.Mvc.Testing) :\n[Fact]\npublic async Task CreerProduit_Retourne201()\n{\n    var client = _factory.CreateClient(); // client HTTP vers l'app en mémoire\n    var reponse = await client.PostAsJsonAsync(\"/api/produits\",\n        new { nom = \"Clavier\", prix = 79 });\n    Assert.Equal(HttpStatusCode.Created, reponse.StatusCode);\n}",
      },
    ],
  },
  {
    id: "deploiement",
    title: "Déploiement : les notions",
    level: 3,
    intro:
      "De `dotnet publish` au conteneur : ce qu'il faut comprendre pour mettre une API en ligne.",
    blocks: [
      {
        kind: "command",
        label: "Publier l'application pour la production",
        command: "dotnet publish -c Release -o ./publish",
        why: "`-c Release` compile en mode optimisé ; `-o ./publish` rassemble dans un dossier tout ce qu'il faut pour tourner : vos DLL, les dépendances, la configuration. Ce dossier est l'artefact à déployer.",
        verify:
          "`./publish` contient `BoutiqueApi.dll` : le serveur lancera `dotnet BoutiqueApi.dll`.",
      },
      {
        kind: "text",
        text: "Déployer, c'est copier l'artefact publié sur un serveur (ou dans un conteneur) qui possède le runtime .NET, avec la bonne configuration d'environnement.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Les environnements",
            value:
              "`ASPNETCORE_ENVIRONMENT=Production` active `appsettings.Production.json` et désactive la page d'exception détaillée. Trois environnements minimum : Development, Staging, Production.",
          },
          {
            label: "Le conteneur Docker",
            value:
              "Image multi-stage : une étape `sdk` qui publie, une étape `aspnet` (runtime seul, images officielles `mcr.microsoft.com/dotnet/`) qui exécute. Résultat : une image légère et reproductible, identique en local et en prod.",
          },
          {
            label: "Kestrel et le reverse proxy",
            value:
              "Kestrel sert directement l'application ; en production on le place souvent derrière Nginx, IIS ou un ingress : terminaison TLS, équilibrage de charge, servir les fichiers statiques.",
          },
          {
            label: "Les migrations en production",
            value:
              "La base de production évolue via les migrations EF Core appliquées au déploiement — toujours après sauvegarde, jamais en éditant le schéma à la main.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Déployer en `Development` « pour voir les erreurs » : page d'exception détaillée exposée + `user-secrets` absents + logs verbeux. L'environnement se règle une fois, dans le pipeline.",
          },
          {
            label: "Bonne pratique",
            value:
              "Pipeline automatisé : build → tests → publish → migrations → déploiement. Si une étape échoue, rien ne part en production. Le déploiement manuel est l'ennemi de la fiabilité.",
          },
          {
            label: "Concepts liés",
            value:
              "Configuration et secrets, logging, conteneurs, CI/CD.",
          },
        ],
      },
    ],
  },
  {
    id: "minimal-apis-avance",
    title: "Minimal APIs : aller plus loin",
    level: 3,
    intro:
      "Groupes de routes, résultats typés et filtres : structurer les Minimal APIs quand l'API grandit.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Program.cs — groupe de routes avec résultats typés",
        code: "var produits = app.MapGroup(\"/api/produits\"); // préfixe commun\n\nproduits.MapGet(\"/\", async (BoutiqueContext db) =>\n    TypedResults.Ok(await db.Produits.AsNoTracking().ToListAsync()));\n\nproduits.MapGet(\"/{id:int}\", async (int id, BoutiqueContext db) =>\n    await db.Produits.FindAsync(id) is Produit p\n        ? Results<Ok<Produit>, NotFound>.Ok(p)   // 200 typé\n        : Results<Ok<Produit>, NotFound>.NotFound()); // 404 typé\n\nproduits.MapPost(\"/\", async (CreerProduitDto dto, BoutiqueContext db) =>\n{\n    var produit = new Produit { Nom = dto.Nom, Prix = dto.Prix };\n    db.Produits.Add(produit);\n    await db.SaveChangesAsync();\n    return TypedResults.Created($\"/api/produits/{produit.Id}\", produit);\n}).AddEndpointFilter(async (context, next) =>\n{\n    // Filtre : s'exécute autour de l'endpoint (validation, logging…).\n    return await next(context);\n});",
      },
      {
        kind: "text",
        text: "`MapGroup` factorise préfixes et conventions, `TypedResults` déclare les réponses possibles (utile pour la documentation OpenAPI), les filtres ajoutent un comportement transversal.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "L'injection dans les endpoints",
            value:
              "Un paramètre typé `BoutiqueContext db` ou `ILogger` est résolu automatiquement par l'injection de dépendances : pas de constructeur à écrire en Minimal API.",
          },
          {
            label: "Quand ça ne suffit plus",
            value:
              "Quand `Program.cs` dépasse quelques centaines de lignes malgré les groupes : c'est le signal pour migrer vers des contrôleurs, ou découper en méthodes d'extension (`MapProduitsEndpoints(app)`).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier la validation en Minimal API : contrairement à `[ApiController]`, rien ne valide le DTO automatiquement. Le filtre d'endpoint est l'endroit idéal pour centraliser cette validation.",
          },
          {
            label: "Concepts liés",
            value:
              "Routing, injection de dépendances, OpenAPI/Swagger, contrôleurs.",
          },
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance : les leviers",
    level: 3,
    intro:
      "Le `async` partout, le cache là où ça compte : les réflexes de performance d'une API .NET.",
    blocks: [
      {
        kind: "text",
        text: "ASP.NET Core est conçu pour l'asynchrone : `async`/`await` libère les threads pendant les attentes (base, réseau), et le cache évite de recalculer ce qui change peu.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "`async` tout le long",
            value:
              "Une action `async` qui `await` une requête base ne bloque aucun thread en attendant : le serveur traite d'autres requêtes entre-temps. `.Result` ou `.Wait()` cassent ce modèle (risque d'interblocage).",
          },
          {
            label: "Le cache en mémoire",
            value:
              "`IMemoryCache` stocke un résultat coûteux (catalogue, configuration) avec une durée de vie : `GetOrCreateAsync` ne recalcule que si la clé a expiré.",
          },
          {
            label: "Le cache de réponse HTTP",
            value:
              "`[ResponseCache(Duration = 60)]` sur une action : le client et les proxys peuvent réutiliser la réponse 60 secondes sans rappeler le serveur.",
          },
          {
            label: "Exemple réel",
            value:
              "Page d'accueil d'une boutique : le catalogue change peu → cache mémoire 5 minutes. Résultat : des centaines de requêtes/seconde servies sans toucher la base.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Optimiser sans mesurer : ajouter du cache partout « au cas où ». Better : mesurer d'abord (logs de durée, outils de profilage), le point chaud est rarement celui qu'on imagine.",
          },
          {
            label: "Bonne pratique",
            value:
              "D'abord la justesse (requêtes SQL propres, `AsNoTracking`, pagination), ensuite le cache sur les lectures chaudes, enfin le profilage sur les points restants.",
          },
          {
            label: "Concepts liés",
            value:
              "Middlewares (mesure de durée), EF Core et requêtes, `BackgroundService`.",
          },
        ],
      },
      {
        kind: "code",
        language: "csharp",
        title: "Cache mémoire pour une donnée coûteuse",
        code: "public class CatalogueService(IMemoryCache cache, BoutiqueContext db)\n{\n    public async Task<List<Produit>> CatalogueAsync()\n        => await cache.GetOrCreateAsync(\"catalogue\", async entree =>\n        {\n            entree.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);\n            return await db.Produits.AsNoTracking().ToListAsync();\n        }) ?? new();\n}",
      },
    ],
  },
  {
    id: "services-arriere-plan",
    title: "Les services d'arrière-plan",
    level: 3,
    intro:
      "Exécuter du travail en tâche de fond : nettoyages périodiques, files d'attente, sans bloquer les requêtes.",
    blocks: [
      {
        kind: "code",
        language: "csharp",
        title: "Un service qui tourne en boucle tant que l'app vit",
        code: "public class NettoyageService : BackgroundService\n{\n    protected override async Task ExecuteAsync(CancellationToken stoppingToken)\n    {\n        // Tourne jusqu'à l'arrêt de l'application.\n        while (!stoppingToken.IsCancellationRequested)\n        {\n            await PurgerLesPaniersAbandonnesAsync(stoppingToken);\n            // Attente annulable : l'arrêt reste propre.\n            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);\n        }\n    }\n}\n\n// Enregistrement (Program.cs) — un Singleton géré par l'hôte :\nbuilder.Services.AddHostedService<NettoyageService>();",
      },
      {
        kind: "text",
        text: "`BackgroundService` (via `IHostedService`) exécute une boucle de travail en parallèle du serveur web, démarrée et arrêtée proprement avec l'application.",
      },
      {
        kind: "text",
        text: "Tâches périodiques (purge, rapports), consommation d'une file de messages, pré-chargement de cache. Pour du « fire and forget » depuis une requête, préférez une vraie file d'attente.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Le piège du scope",
            value:
              "Le service est un Singleton : il ne peut pas injecter directement un `DbContext` (Scoped). Better : injecter `IServiceScopeFactory` et créer un scope à chaque itération.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Une exception non catchée dans `ExecuteAsync` arrête silencieusement la boucle : le service ne tourne plus, sans alerte. Toujours un `try/catch` avec log autour du travail périodique.",
          },
          {
            label: "Concepts liés",
            value:
              "Injection de dépendances (durées de vie), logging, files de messages.",
          },
        ],
      },
    ],
  },
  {
    id: "blazor",
    title: "Blazor : le frontend en C#",
    level: 3,
    intro:
      "Écrire l'interface web en C# plutôt qu'en JavaScript : ce que Blazor propose, et quand c'est pertinent.",
    blocks: [
      {
        kind: "text",
        text: "Blazor est le framework frontend d'ASP.NET Core : des composants UI écrits en C# (syntaxe Razor), exécutés soit sur le serveur, soit dans le navigateur via WebAssembly.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Les modèles d'hébergement",
            value:
              "Blazor Server : l'UI tourne sur le serveur, les interactions transitent par SignalR — démarrage instantané, mais une connexion permanente. Blazor WebAssembly : l'app tourne dans le navigateur — fonctionne hors-ligne, mais téléchargement initial plus lourd.",
          },
          {
            label: "Quand c'est pertinent",
            value:
              "Équipe 100 % .NET sans expertise JavaScript, applications métier internes, prototypes rapides : un seul langage et un seul outillage du backend au frontend.",
          },
          {
            label: "Quand préférer une API + frontend JS",
            value:
              "Application grand public exigeante en SEO et temps de chargement, équipe avec des développeurs frontend dédiés, besoin d'un écosystème JS spécifique : une API ASP.NET Core + React/Vue/Angular reste le découpage classique.",
          },
          {
            label: "Exemple simple",
            value:
              "`dotnet new blazor` génère une application avec compteur interactif : le clic appelle du C#, pas du JavaScript.",
          },
          {
            label: "Concepts liés",
            value:
              "Razor Pages, SignalR, Minimal APIs (Blazor consomme souvent une API).",
          },
        ],
      },
    ],
  },
  {
    id: "razor-pages",
    title: "Razor Pages : les pages côté serveur",
    level: 3,
    intro:
      "Le modèle simple pour des pages web rendues par le serveur, sans la cérémonie du MVC complet.",
    blocks: [
      {
        kind: "text",
        text: "Razor Pages (`dotnet new webapp`) est le modèle recommandé par Microsoft pour les applications web classiques rendues côté serveur : chaque page est un fichier `.cshtml` (markup + code C#) avec sa classe associée. Moins de cérémonie que le trio Controllers/Views du MVC historique, mais le même moteur de rendu.",
      },
      {
        kind: "text",
        text: "Une page = une URL : le fichier `Pages/Contact.cshtml` répond sur `/Contact`, avec son code dans `Contact.cshtml.cs` (le « page model »).",
      },
      {
        kind: "text",
        text: "Sites à contenu avec formulaires (intranet, back-office, sites vitrines dynamiques), SEO naturel grâce au rendu serveur, équipe qui préfère le C# au JavaScript.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [          {
            label: "Par rapport à une API + SPA",
            value:
              "Rendu serveur : HTML complet dès la première réponse (bon pour le SEO et les connexions lentes), mais chaque interaction recharge ou nécessite du JavaScript complémentaire. L'API + SPA inverse le compromis.",
          },
          {
            label: "Concepts liés",
            value:
              "Blazor (alternative composants), MVC historique, formulaires et validation.",
          },
        ],
      },
    ],
  },
  {
    id: "signalr-grpc",
    title: "Temps réel et gRPC : les notions",
    level: 3,
    intro:
      "Au-delà du REST : quand l'API doit pousser des données ou parler à d'autres services efficacement.",
    blocks: [
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "SignalR, en une phrase",
            value:
              "Bibliothèque temps réel intégrée : le serveur pousse des messages aux clients connectés (WebSockets en priorité), sans que le client ait à interroger en boucle.",
          },
          {
            label: "Quand utiliser SignalR",
            value:
              "Notifications instantanées, tableaux de bord live, chat, jeux multijoueurs : tout ce où « le serveur doit prévenir » plutôt que « le client doit demander ».",
          },
          {
            label: "gRPC, en une phrase",
            value:
              "Framework d'appels distants basé sur HTTP/2 et Protocol Buffers : des contrats typés et un format binaire compact, idéal pour la communication entre microservices.",
          },
          {
            label: "Quand utiliser gRPC",
            value:
              "Microservices internes qui s'appellent beaucoup, streaming bidirectionnel, contrats stricts générés en C# des deux côtés (`dotnet new grpc`). Pour une API publique consommée par des navigateurs, REST + JSON reste plus universel.",
          },
          {
            label: "Concepts liés",
            value:
              "Minimal APIs (cohabitent dans la même app), WebSockets, microservices.",
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
          "`async`/`await` tout le long : jamais de `.Result` ni de `.Wait()` dans du code de requête.",
          "DTO en entrée et en sortie : ne jamais exposer les entités EF Core directement.",
          "Programmez contre des interfaces : l'injection de dépendances rend les tests possibles.",
          "Un `DbContext` par requête (Scoped) : jamais partagé entre threads ni stocké en Singleton.",
          "Validez tout ce qui vient du client : annotations, tailles, types — la confiance n'est pas une stratégie.",
          "Secrets hors du code : `user-secrets` en dev, variables d'environnement ou coffre en production.",
          "Erreurs standardisées (`ProblemDetails`) : un client doit pouvoir réagir sans lire votre code.",
          "Logs structurés avec placeholders : « que s'est-il passé, pour qui, avec quel résultat ».",
          "Migrations versionnées et relues : le schéma de base évolue comme le code, jamais à la main en prod.",
          "Mesurez avant d'optimiser : logs de durée et profilage d'abord, cache ensuite.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques des développeurs ASP.NET Core, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "L'ordre des middlewares",
            value:
              "Problem : `401`/`404` inattendus alors que tout semble configuré. Why : le pipeline s'exécute dans l'ordre d'enregistrement — un middleware placé après les endpoints ne voit jamais les requêtes. Bad example : `app.UseAuthentication()` après `app.MapControllers()`. Better : respecter l'ordre documenté (authentification → autorisation → endpoints).",
          },
          {
            label: "Scoped dans Singleton",
            value:
              "Problem : exception « Cannot consume scoped service from singleton » au démarrage. Why : un Singleton vit plus longtemps qu'une requête et retiendrait un `DbContext` périmé. Bad example : injecter `BoutiqueContext` dans un service Singleton. Better : injecter `IServiceScopeFactory` et créer un scope, ou passer le service en Scoped.",
          },
          {
            label: "`.Result` / `.Wait()`",
            value:
              "Problem : l'application se fige sous charge. Why : bloquer sur une tâche async dans un contexte de requête provoque des interblocages. Bad example : `var p = db.Produits.ToListAsync().Result;`. Better : `await` tout le long — « async all the way ».",
          },
          {
            label: "Oublier `MapControllers`",
            value:
              "Problem : tous les endpoints contrôleurs répondent `404`. Why : les contrôleurs existent mais aucune route ne les atteint sans `app.MapControllers()` (et `AddControllers()` dans les services). Better : vérifier ces deux lignes quand tout est en `404`.",
          },
          {
            label: "Pas de validation en Minimal API",
            value:
              "Problem : des données invalides atteignent la base. Why : contrairement à `[ApiController]`, les Minimal APIs ne valident rien automatiquement. Bad example : `MapPost` qui insère le DTO tel quel. Better : valider explicitement (filtre d'endpoint ou validation manuelle).",
          },
          {
            label: "Secret commité",
            value:
              "Problem : clé API ou mot de passe poussé dans `appsettings.json`. Why : l'historique Git n'oublie jamais — le secret est compromis même après suppression. Better : `dotnet user-secrets` en dev, variables d'environnement en prod, et régénérer tout secret exposé.",
          },
          {
            label: "CORS mal placé ou trop ouvert",
            value:
              "Problem : le frontend est bloqué par le navigateur, ou `AllowAnyOrigin` en production. Why : `UseCors` doit être avant les endpoints, et une liste blanche vaut mieux qu'une ouverture totale. Better : `WithOrigins(\"https://app.example.com\")` explicite, placé après le routing.",
          },
          {
            label: "Requêtes EF sans `AsNoTracking`",
            value:
              "Problem : listes lentes et mémoire qui gonfle. Why : EF Core suit chaque entité chargée par défaut, inutile en lecture seule. Bad example : `.ToListAsync()` sur 10 000 lignes pour un export. Better : `.AsNoTracking()` pour tout ce qui n'est pas modifié.",
          },
          {
            label: "Migration oubliée",
            value:
              "Problem : « no such column » après ajout d'une propriété. Why : le modèle C# et la base ont divergé — `migrations add` sans `database update`. Better : les deux commandes à chaque changement de modèle, et relire la migration générée.",
          },
          {
            label: "Exposer les entités EF",
            value:
              "Problem : sérialisation circulaire (`Produit` → `Commandes` → `Produit`…) ou champs internes exposés. Why : l'entité de persistance n'est pas un contrat d'API. Bad example : retourner `db.Produits` directement. Better : projeter vers des DTO (`Select(p => new ProduitDto { … })`).",
          },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes",
    level: 3,
    intro:
      "Quatre projets progressifs : chacun réutilise les acquis du précédent et produit quelque chose de démontrable.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre paliers",
        fields: [
          {
            label: "1. Carnet d'adresses (Minimal API en mémoire)",
            value:
              "Compétences : `MapGet`/`MapPost`/`MapPut`/`MapDelete`, routing avec `{id:int}`, `dotnet watch`, tests avec `curl` et fichiers `.http`. Apprentissage : le pipeline, le cycle requête-réponse, les codes de statut. Difficulté : débutant. Projet suivant : persister les données.",
          },
          {
            label: "2. API Boutique avec EF Core",
            value:
              "Compétences : `DbContext`, migrations (`dotnet ef`), SQLite puis SQL Server, contrôleurs, DTO + validation, `ProblemDetails`, Swagger. Apprentissage : modélisation, persistance, contrats d'API propres. Difficulté : intermédiaire. Projet suivant : sécuriser l'API.",
          },
          {
            label: "3. API avec authentification JWT et rôles",
            value:
              "Compétences : émission de JWT au login, `[Authorize]`/`[AllowAnonymous]`, rôles Admin/Vendeur, `user-secrets`, CORS pour un frontend. Apprentissage : auth vs autorisation, filtrage des données par utilisateur, gestion des secrets. Difficulté : intermédiaire-avancé. Projet suivant : industrialiser.",
          },
          {
            label: "4. Plateforme complète déployée",
            value:
              "Compétences : tests xUnit + `WebApplicationFactory`, `BackgroundService` (relances de paniers), cache, `dotnet publish`, Dockerfile multi-stage, CI qui build/teste/déploie, migrations au déploiement. Apprentissage : le cycle de vie professionnel complet, du commit à la production. Difficulté : avancé.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "La documentation officielle d'abord, puis les références communautaires éprouvées.",
    blocks: [
      {
        kind: "list",
        items: [
          "`learn.microsoft.com/aspnet/core` — la documentation officielle : tutoriels, référence, guides d'architecture. Le point de départ et la référence finale.",
          "`dotnet.microsoft.com` — téléchargements du SDK, notes de version, cycle de vie des versions (LTS vs STS).",
          "`github.com/dotnet/aspnetcore` — le code source du framework : pour comprendre comment un middleware fonctionne vraiment.",
          "« ASP.NET Core in Action » (Andrew Lock, Manning) — le livre de référence, des fondamentaux au déploiement.",
          "Les tutoriels officiels « Create a web API » sur learn.microsoft.com — le parcours guidé main dans la main.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "ASP.NET Core maîtrisé dans ses bases : les directions naturelles pour progresser.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir C# : LINQ avancé, `async` et les streams (`IAsyncEnumerable`), les records et le pattern matching.",
          "Bases de données : SQL au-delà de l'ORM, indexation, transactions, puis PostgreSQL ou SQL Server en production.",
          "Architecture : découper en couches (API → application → domaine → infra), médiation, microservices et communication inter-services.",
          "Frontend : consommer votre API depuis React, Vue ou Angular — ou explorer Blazor pour rester en C#.",
          "Cloud et DevOps : conteneuriser, automatiser le pipeline (build → tests → migrations → déploiement), superviser avec des logs centralisés.",
          "Temps réel et intégration : SignalR pour le live, files de messages pour le découplage, gRPC entre services internes.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Flutter : le framework UI multiplateforme
 * de Google (langage Dart). 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent
 * le code inline entre backticks. Les exemples Dart/Flutter utilisent
 * l'API standard du SDK ; les commandes reprennent celles documentées
 * dans le guide du parcours.
 */
export const LEARNING_FLUTTER: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Flutter et pourquoi il dessine lui-même ses pixels.",
    blocks: [
      {
        kind: "text",
        text: "Flutter est le framework UI de Google, écrit en langage Dart : une seule base de code produit des applications mobiles (iOS, Android), web et desktop. Sa particularité : il ne s'appuie pas sur les composants natifs du système — son moteur de rendu dessine lui-même chaque pixel, ce qui garantit un visuel identique partout et des performances élevées.",
      },
      {
        kind: "text",
        text: "Le pari : là où d'autres approches embarquent un navigateur (lourd) ou pilotent des composants natifs (visuel variable), Flutter contrôle toute la pile d'affichage. Le prix : des applications un peu plus volumineuses, et un langage (Dart) à apprendre — typé, compilé en natif, avec hot reload pendant le développement.",
      },
      {
        kind: "list",
        items: [
          "Multiplateforme : iOS, Android, web, desktop depuis un seul code.",
          "Moteur de rendu maison : le même visuel sur tous les appareils.",
          "Dart : langage typé, compilation native, hot reload.",
          "Écosystème pub.dev : des milliers de packages (caméra, cartes, Firebase…).",
        ],
      },
    ],
  },
  {
    id: "tout-est-widget",
    title: "Tout est widget",
    level: 1,
    intro:
      "L'idée centrale : l'interface entière est une arborescence de widgets.",
    blocks: [
      {
        kind: "diagram",
        title: "Une app = un arbre de widgets",
        lines: [
          "MaterialApp (l'application)",
          "└── Scaffold (la structure d'écran : barre, corps, bouton flottant)",
          "    ├── AppBar (le titre en haut)",
          "    └── Center (centre son enfant)",
          "        └── Column (empile verticalement)",
          "            ├── Text (\"Bonjour\")",
          "            ├── Image (le logo)",
          "            └── ElevatedButton (le bouton)",
          "",
          "Quand l'état change → Flutter reconstruit les widgets concernés",
          "→ le moteur redessine uniquement ce qui a changé.",
        ],
      },
      {
        kind: "text",
        text: "Un widget est une description immuable d'une partie de l'interface : pas d'objet « bouton » qu'on mute, mais un nouvel arbre à chaque changement d'état. Cette simplicité conceptuelle — décrire, pas manipuler — est ce qui rend le hot reload si naturel.",
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
      "Le bagage avant de construire sa première app.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations nécessaires",
        fields: [
          {
            label: "Programmation orientée objet",
            value:
              "Classes, héritage, constructeurs : Dart est un langage à objets, Flutter est une hiérarchie de classes.",
          },
          {
            label: "Un langage typé",
            value:
              "Variables typées, nullabilité : si on vient de Java, C# ou TypeScript strict, Dart est familier.",
          },
          {
            label: "Asynchrone (bases)",
            value:
              "`async`/`await`, futures : les appels réseau et les lectures de fichiers sont asynchrones en Dart aussi.",
          },
          {
            label: "Bases du mobile",
            value:
              "Écrans, navigation par piles, cycle de vie d'app : les concepts, pas encore la plateforme.",
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
      "Installer le SDK et vérifier que tout est en place.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier le SDK Flutter",
        command: "flutter --version",
        why: "Affiche la version du SDK installé (téléchargé depuis docs.flutter.dev et ajouté au PATH). C'est le point de départ : si cette commande échoue, rien d'autre ne fonctionnera.",
        verify: "dart --version",
      },
      {
        kind: "command",
        label: "Diagnostiquer l'environnement",
        command: "flutter doctor",
        why: "`flutter doctor` vérifie toute la chaîne : SDK Android, émulateur, Xcode (sur macOS), éditeur. Il liste ce qui manque avec les actions correctives — le lancer avant de chercher un problème ailleurs.",
        verify: "flutter doctor --android-licenses",
      },
      {
        kind: "text",
        text: "Ensuite : Android Studio (SDK Android + émulateur) sur toutes les plateformes, Xcode en plus sur macOS pour iOS. L'éditeur recommandé est VS Code avec l'extension « Flutter » ou Android Studio avec son plugin officiel.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet",
    level: 2,
    intro:
      "Créer l'app compteur et la lancer : le rituel d'initiation.",
    blocks: [
      {
        kind: "command",
        label: "Créer le projet",
        command: "flutter create mon_app",
        why: "Génère un projet complet : code Dart (`lib/main.dart`), configuration Android/iOS/web, `pubspec.yaml` et l'app compteur d'exemple. C'est le squelette de travail de toutes les apps.",
        verify: "ls mon_app/pubspec.yaml",
      },
      {
        kind: "command",
        label: "Lancer l'application",
        command: "flutter run",
        why: "Compile et installe l'app sur l'appareil connecté ou l'émulateur (proposé si plusieurs). Rester dans ce terminal : `r` fait un hot reload, `R` un hot restart, `q` quitte.",
      },
      {
        kind: "text",
        text: "Le compteur n'est pas un gadget : il montre le cycle complet — `StatefulWidget`, `setState`, reconstruction — en 60 lignes. Le comprendre, c'est comprendre Flutter.",
      },
    ],
  },
  {
    id: "hot-reload",
    title: "Hot reload",
    level: 2,
    intro:
      "La fonctionnalité qui change le rythme de développement.",
    blocks: [
      {
        kind: "diagram",
        title: "Hot reload vs hot restart vs rebuild",
        lines: [
          "HOT RELOAD (r)       — injecte le code modifié, GARDE l'état",
          "                     → changer une couleur sans perdre l'écran",
          "HOT RESTART (R)      — recharge tout, RÉINITIALISE l'état",
          "                     → repartir de l'écran d'accueil",
          "FULL RESTART         — recompile et réinstalle (rare)",
          "                     → après changement natif (plugin, config)",
        ],
      },
      {
        kind: "text",
        text: "En pratique : on code avec l'app ouverte à côté, `r` après chaque modification, et on ne relance que quand l'état lui-même doit être réinitialisé. Le feedback est quasi instantané — c'est ce qui rend l'expérimentation UI si rapide.",
      },
    ],
  },
  {
    id: "widgets-de-base",
    title: "Widgets de base",
    level: 2,
    intro:
      "Le vocabulaire visuel minimal : texte, boutons, images, icônes.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Les briques visuelles",
        code: `import 'package:flutter/material.dart';\n\nclass HomePage extends StatelessWidget {\n  const HomePage({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: const Text('Ma première app')),\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: [\n            const Icon(Icons.star, size: 48, color: Colors.amber),\n            const Text('Bonjour Flutter', style: TextStyle(fontSize: 24)),\n            const SizedBox(height: 16), // espacement\n            ElevatedButton(\n              onPressed: () {},\n              child: const Text('Appuyer'),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}`,
      },
      {
        kind: "fields",
        title: "Lire le code",
        fields: [
          { label: "`StatelessWidget`", value: "Un widget sans état interne : il se contente de décrire l'UI à partir de ses paramètres." },
          { label: "`build`", value: "La méthode qui retourne l'arbre de widgets. Elle doit être pure : même entrée, même arbre." },
          { label: "`const`", value: "Les widgets constants ne sont pas reconstruits inutilement : un réflexe de performance gratuit." },
          { label: "`SizedBox(height: 16)`", value: "L'espaceur standard : une boîte vide de dimensions fixées." },
        ],
      },
    ],
  },
  {
    id: "layouts",
    title: "Layouts : Row, Column, Stack",
    level: 2,
    intro:
      "Positionner les widgets : les trois conteneurs fondamentaux.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Les trois layouts",
        code: `// VERTICAL : empile de haut en bas.\nColumn(\n  mainAxisAlignment: MainAxisAlignment.center, // axe principal (vertical)\n  crossAxisAlignment: CrossAxisAlignment.start, // axe transverse\n  children: [Text('A'), Text('B')],\n)\n\n// HORIZONTAL : aligne de gauche à droite.\nRow(\n  mainAxisAlignment: MainAxisAlignment.spaceBetween,\n  children: [Icon(Icons.home), Icon(Icons.search)],\n)\n\n// SUPERPOSITION : empile en profondeur (z).\nStack(\n  children: [\n    Image.asset('assets/fond.png'),\n    Positioned(bottom: 16, right: 16, child: Text('Légende')),\n  ],\n)`,
      },
      {
        kind: "text",
        text: "`mainAxisAlignment` gère l'axe principal (vertical pour Column, horizontal pour Row), `crossAxisAlignment` l'autre. `Expanded` dans une Row/Column fait prendre à l'enfant tout l'espace restant — le mécanisme des layouts flexibles.",
      },
    ],
  },
  {
    id: "etat-setstate",
    title: "État local avec setState",
    level: 2,
    intro:
      "Le premier mécanisme d'état : simple, local, suffisant pour commencer.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Le compteur canonique",
        code: `class CounterPage extends StatefulWidget {\n  const CounterPage({super.key});\n  @override\n  State<CounterPage> createState() => _CounterPageState();\n}\n\nclass _CounterPageState extends State<CounterPage> {\n  int _count = 0; // l'état : une simple variable\n\n  void _increment() {\n    setState(() {\n      _count++; // on modifie l'état DANS setState...\n    }); // ...et Flutter reconstruit ce widget\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      body: Center(child: Text('$_count', style: TextStyle(fontSize: 48))),\n      floatingActionButton: FloatingActionButton(\n        onPressed: _increment,\n        child: const Icon(Icons.add),\n      ),\n    );\n  }\n}`,
      },
      {
        kind: "text",
        text: "Le contrat : `setState` signale que l'état a changé, Flutter rappelle `build`, l'arbre est reconstruit avec la nouvelle valeur. L'état vit dans l'objet `State`, pas dans le widget — le widget lui-même reste immuable.",
      },
    ],
  },
  {
    id: "navigation-bases",
    title: "Navigation : les bases",
    level: 2,
    intro:
      "Passer d'un écran à l'autre avec la pile du Navigator.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Aller et revenir",
        code: `// Aller vers un nouvel écran (empilé par-dessus).\nNavigator.push(\n  context,\n  MaterialPageRoute(builder: (context) => const DetailsPage()),\n);\n\n// Revenir (dépile l'écran courant).\nNavigator.pop(context);\n\n// Revenir en passant un résultat.\nNavigator.pop(context, 'résultat');\n// ... récupéré côté appelant avec await sur le push.`,
      },
      {
        kind: "text",
        text: "Le Navigator gère une pile de routes : `push` empile, `pop` dépile. `MaterialPageRoute` fournit la transition standard de la plateforme. Pour les apps à nombreux écrans, on nomme les routes — niveau 3.",
      },
    ],
  },
  {
    id: "dependances",
    title: "Dépendances avec pub",
    level: 2,
    intro:
      "Ajouter des packages depuis pub.dev : le registre officiel.",
    blocks: [
      {
        kind: "command",
        label: "Ajouter le package http",
        command: "flutter pub add http",
        why: "Ajoute la dépendance `http` (client HTTP) au `pubspec.yaml` et l'installe. `flutter pub get` (implicite ici) résout l'arbre des dépendances.",
        verify: "flutter pub get",
      },
      {
        kind: "code",
        language: "yaml",
        title: "pubspec.yaml : le manifeste",
        code: `name: mon_app\nversion: 1.0.0+1\n\nenvironment:\n  sdk: ^3.0.0\n\ndependencies:\n  flutter:\n    sdk: flutter\n  http: ^1.2.0 # ajouté par flutter pub add http\n\nflutter:\n  uses-material-design: true\n  assets:\n    - assets/images/`,
      },
      {
        kind: "text",
        text: "Le `pubspec.yaml` déclare le nom, la version, les dépendances et les assets (images, polices). Le `pubspec.lock` fige les versions exactes — commité, comme tout lockfile.",
      },
    ],
  },
  {
    id: "analyser",
    title: "Analyser son code",
    level: 2,
    intro:
      "L'analyseur Dart : un linter intégré, gratuit, à écouter.",
    blocks: [
      {
        kind: "command",
        label: "Analyser le projet",
        command: "flutter analyze",
        why: "Vérifie le typage, détecte le code mort, les imports inutilisés et les mauvaises pratiques : le filet de sécurité avant chaque commit. Zéro avertissement est l'objectif.",
        verify: "flutter analyze",
      },
      {
        kind: "text",
        text: "Les règles se configurent dans `analysis_options.yaml` (le preset `flutter_lints` est le point de départ recommandé). Un projet qui analyse proprement est un projet où les revues parlent d'architecture, pas de typos.",
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Trois apps pour passer du compteur au produit.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — App météo",
        fields: [
          { label: "Objectif", value: "Recherche de ville, appel API météo, affichage des prévisions." },
          { label: "Compétences", value: "Widgets, layouts, `http`, JSON, `FutureBuilder`, navigation." },
          { label: "Difficulté", value: "Faible — une semaine" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — App de notes",
        fields: [
          { label: "Objectif", value: "CRUD local de notes avec persistance, recherche, thèmes." },
          { label: "Compétences", value: "État partagé, persistance locale, formulaires, navigation nommée." },
          { label: "Difficulté", value: "Moyenne — deux à trois semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — App avec backend",
        fields: [
          { label: "Objectif", value: "Authentification, données distantes, notifications, builds release Android/iOS." },
          { label: "Compétences", value: "Auth, état global, permissions, builds signés, tests." },
          { label: "Difficulté", value: "Élevée — un à deux mois" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "dart-bases",
    title: "Dart : les bases",
    level: 3,
    intro: "Le langage en 5 minutes pour qui vient d'un langage typé.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Variables, fonctions, classes",
        code: `// Variables : typées, 'final' = assignée une fois, 'const' = compile-time.\nint count = 0;\nfinal name = 'Ada'; // type inféré : String\nconst maxItems = 100;\n\n// Fonctions : paramètres nommés entre accolades.\nString greet({required String name, String punctuation = '!'}) {\n  return 'Bonjour $name$punctuation';\n}\n\n// Classes : constructeurs concis.\nclass User {\n  final String name;\n  final int age;\n  const User({required this.name, required this.age});\n}`,
      },
      {
        kind: "text",
        text: "Dart ressemble à un mélange de Java et de JavaScript moderne, en plus concis : inférence de types, paramètres nommés, constructeurs `const`. Si on lit du TypeScript, on lit du Dart.",
      },
    ],
  },
  {
    id: "dart-null-safety",
    title: "Dart : null safety",
    level: 3,
    intro: "Le système qui élimine une classe entière de bugs : les null surprises.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Nullable vs non-nullable",
        code: `String name = 'Ada';\n// name = null; // ERREUR : String ne peut pas être null\n\nString? nickname; // le '?' autorise null\n// print(nickname.length); // ERREUR : peut être null\n\nprint(nickname?.length); // OK : null si nickname est null\nprint(nickname ?? 'Anonyme'); // OK : valeur par défaut\n\n// Le '!' affirme la non-nullité : à n'utiliser que si certain.\n// print(nickname!.length); // crash si nickname est null`,
      },
      {
        kind: "text",
        text: "La règle : non-nullable par défaut, `?` quand l'absence a un sens, `?.` et `??` pour naviguer prudemment, `!` avec parcimonie. Le compilateur prouve l'absence de null — les crashes `Null check operator used on a null value` viennent toujours d'un `!` abusif.",
      },
    ],
  },
  {
    id: "dart-async",
    title: "Dart : async et streams",
    level: 3,
    intro: "L'asynchrone en Dart : futures pour l'unique, streams pour le continu.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Future et Stream",
        code: `// FUTURE : une valeur qui arrivera (appel réseau, lecture fichier).\nFuture<String> fetchTitle() async {\n  await Future.delayed(Duration(seconds: 1)); // simule l'attente\n  return 'Bonjour';\n}\n\nvoid main() async {\n  final title = await fetchTitle(); // suspend jusqu'au résultat\n  print(title);\n}\n\n// STREAM : une séquence de valeurs dans le temps (capteur, websocket).\nStream<int> ticks() async* {\n  for (var i = 0; i < 3; i++) {\n    await Future.delayed(Duration(seconds: 1));\n    yield i; // émet une valeur à chaque tour\n  }\n}`,
      },
      {
        kind: "text",
        text: "`async`/`await` comme ailleurs ; `async*` + `yield` pour produire un stream. Côté UI, `FutureBuilder` affiche un future (chargement → donnée → erreur) et `StreamBuilder` fait de même pour un stream — les deux évitent de gérer l'état de chargement à la main.",
      },
    ],
  },
  {
    id: "dart-collections",
    title: "Dart : collections",
    level: 3,
    intro: "List, Set, Map : les conteneurs du quotidien.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Manipulations courantes",
        code: `final scores = [12, 7, 21]; // List<int>\nscores.add(30);\nfinal doubled = scores.map((s) => s * 2).toList(); // [24, 14, 42, 60]\nfinal big = scores.where((s) => s > 10).toList(); // [12, 21, 30]\n\nfinal user = {'name': 'Ada', 'age': 36}; // Map<String, Object>\nprint(user['name']); // Ada\n\n// Spread et collection-if : construire des listes de widgets.\nfinal items = ['a', 'b'];\nfinal widgets = [Text('titre'), ...items.map((i) => Text(i))];`,
      },
    ],
  },
  {
    id: "widgets-arbre",
    title: "Widgets, éléments, rendu",
    level: 3,
    intro: "Ce qui se passe vraiment sous le `build` : les trois arbres.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois arbres",
        lines: [
          "WIDGET (immutable)        ÉLÉMENT (mutable)         RENDER OBJECT",
          "la description            l'instance vivante         le layout + paint",
          "  Text('Hi')      →→→       TextElement      →→→      RenderParagraph",
          "   (recréé à               (réutilisé,             (calcule taille,",
          "    chaque build)            garde l'état)            dessine)",
          "",
          "setState → nouveaux widgets → Flutter compare (diff)",
          "→ met à jour les éléments → ne redessine que ce qui change.",
        ],
      },
      {
        kind: "text",
        text: "Comprendre les trois arbres explique tout le reste : pourquoi les widgets sont immuables (ce ne sont que des descriptions), où vit l'état (dans les éléments/`State`), et pourquoi reconstruire souvent est peu coûteux (le diff est bon marché, seul le rendu compte).",
      },
    ],
  },
  {
    id: "stateless-vs-stateful",
    title: "Stateless vs Stateful",
    level: 3,
    intro: "Choisir le bon type de widget, à chaque fois.",
    blocks: [
      {
        kind: "table",
        headers: ["", "StatelessWidget", "StatefulWidget"],
        rows: [
          ["État interne", "Non", "Oui (objet State séparé)"],
          ["Quand l'utiliser", "Affichage pur à partir des paramètres", "Données qui changent : compteur, formulaire, animation"],
          ["Reconstruction", "Quand le parent reconstruit", "Via `setState` + parent"],
          ["Coût", "Minimal", "Léger — mais à réserver au nécessaire"],
        ],
      },
      {
        kind: "text",
        text: "La règle : Stateless par défaut ; Stateful quand le widget possède une donnée mutable. Et si plusieurs widgets partagent l'état, il monte au parent commun ou dans une solution de gestion d'état — pas dupliqué dans chacun.",
      },
    ],
  },
  {
    id: "cycle-de-vie",
    title: "Cycle de vie d'un StatefulWidget",
    level: 3,
    intro: "Les méthodes à connaître : init, build, dispose.",
    blocks: [
      {
        kind: "fields",
        title: "Les étapes",
        fields: [
          { label: "`createState()`", value: "Crée l'objet d'état, une fois. Le widget peut être reconstruit, l'état persiste." },
          { label: "`initState()`", value: "Initialisation unique : abonnements, contrôleurs, première valeur. Appeler `super.initState()` d'abord." },
          { label: "`didChangeDependencies()`", value: "Appelée quand une dépendance héritée change (thème, locale, provider) : réagir aux changements externes." },
          { label: "`build()`", value: "Construit l'arbre. Pure et rapide : pas d'appels réseau, pas d'effets de bord ici." },
          { label: "`didUpdateWidget()`", value: "Le parent a reconstruit avec de nouveaux paramètres : comparer l'ancien et le nouveau si besoin." },
          { label: "`dispose()`", value: "Nettoyage : fermer les contrôleurs, annuler les abonnements et timers. Oublié = fuites mémoire. Appeler `super.dispose()` à la fin." },
        ],
      },
    ],
  },
  {
    id: "gestion-etat-approches",
    title: "Gestion d'état : les approches",
    level: 3,
    intro: "Quand `setState` ne suffit plus : l'éventail des solutions.",
    blocks: [
      {
        kind: "fields",
        title: "Les approches (citées dans le guide du parcours)",
        fields: [
          { label: "`setState`", value: "État local d'un écran : simple, suffisant pour la plupart des écrans isolés." },
          { label: "`InheritedWidget`", value: "Le mécanisme de base : propager une donnée dans l'arbre sans la passer à chaque niveau. Verbeux à la main, c'est le fondement des suivants." },
          { label: "Provider", value: "Enveloppe pratique d'InheritedWidget : exposer un objet à un sous-arbre, reconstruire à l'écoute des changements." },
          { label: "Riverpod", value: "Évolution de Provider : providers compilés, testables, sans dépendance au contexte." },
          { label: "Bloc", value: "Événements → états via des streams : séparation stricte logique/UI, très testable, plus cérémonieux." },
        ],
      },
      {
        kind: "text",
        text: "Le choix dépend de la complexité réelle : écran isolé → `setState` ; quelques écrans partageant un utilisateur → Provider/Riverpod ; logique métier complexe et testée → Bloc. Changer de solution en cours de route est normal : l'état monte en complexité avec l'app.",
      },
    ],
  },
  {
    id: "navigation-avancee",
    title: "Navigation avancée",
    level: 3,
    intro: "Routes nommées, arguments, deep links : la navigation d'une vraie app.",
    blocks: [
      {
        kind: "fields",
        title: "Les mécanismes",
        fields: [
          { label: "Routes nommées", value: "`Navigator.pushNamed(context, '/details')` avec une table de routes dans `MaterialApp` : centralise la navigation au lieu de disperser les `MaterialPageRoute`." },
          { label: "Arguments", value: "Passer des données à l'écran destination via les arguments de route — typés et vérifiés, pas de variables globales." },
          { label: "Retour de résultat", value: "`await Navigator.push(...)` : l'écran appelé renvoie une valeur via `pop(context, valeur)` (ex. un élément sélectionné)." },
          { label: "Navigator 2.0", value: "Navigation déclarative : la pile de pages dérive de l'état applicatif. Puissant (deep links, web), plus complexe — pour les apps qui en ont besoin." },
          { label: "Deep links", value: "Ouvrir l'app sur le bon écran depuis une URL ou une notification : configuration plateforme + routage déclaratif." },
        ],
      },
    ],
  },
  {
    id: "formulaires",
    title: "Formulaires et validation",
    level: 3,
    intro: "Saisie, validation, soumission : le pattern complet.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Formulaire validé",
        code: `final _formKey = GlobalKey<FormState>();\nfinal _emailController = TextEditingController();\n\nForm(\n  key: _formKey,\n  child: Column(\n    children: [\n      TextFormField(\n        controller: _emailController,\n        decoration: InputDecoration(labelText: 'Email'),\n        validator: (value) {\n          if (value == null || !value.contains('@')) {\n            return 'Email invalide'; // message d'erreur affiché\n          }\n          return null; // null = valide\n        },\n      ),\n      ElevatedButton(\n        onPressed: () {\n          if (_formKey.currentState!.validate()) {\n            // tout est valide : soumettre\n            submit(_emailController.text);\n          }\n        },\n        child: Text('Envoyer'),\n      ),\n    ],\n  ),\n)\n// Ne pas oublier : _emailController.dispose() dans dispose().`,
      },
    ],
  },
  {
    id: "themes",
    title: "Thèmes",
    level: 3,
    intro: "Centraliser le style : `ThemeData` plutôt que des couleurs en dur.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Définir et utiliser un thème",
        code: `MaterialApp(\n  theme: ThemeData(\n    colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),\n    useMaterial3: true,\n    textTheme: TextTheme(\n      headlineLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),\n    ),\n  ),\n  darkTheme: ThemeData.dark(useMaterial3: true), // thème sombre\n  themeMode: ThemeMode.system, // suit le système\n  home: HomePage(),\n);\n\n// Dans un widget : jamais de couleur en dur.\n// final color = Theme.of(context).colorScheme.primary;`,
      },
      {
        kind: "text",
        text: "`ColorScheme.fromSeed` génère une palette cohérente depuis une couleur : le moyen le plus rapide d'un thème propre. Les widgets lisent le thème via `Theme.of(context)` — changer de thème, c'est changer le `ThemeData`, pas 200 widgets.",
      },
    ],
  },
  {
    id: "responsive",
    title: "Responsive et tailles d'écran",
    level: 3,
    intro: "Du téléphone au desktop : s'adapter sans dupliquer.",
    blocks: [
      {
        kind: "fields",
        title: "Les outils",
        fields: [
          { label: "`MediaQuery`", value: "Les dimensions de l'écran et les insets (encoche, clavier) : `MediaQuery.sizeOf(context)`, `MediaQuery.paddingOf(context)`." },
          { label: "`LayoutBuilder`", value: "Les contraintes du parent : construire un layout différent selon l'espace réellement disponible — plus précis que la taille d'écran." },
          { label: "`OrientationBuilder`", value: "Portrait vs paysage : réorganiser quand l'utilisateur pivote." },
          { label: "`Expanded` / `Flexible`", value: "Partager l'espace restant dans Row/Column : la base des layouts qui s'étirent." },
          { label: "Breakpoints", value: "Seuils explicites (ex. 600, 900, 1200) : une colonne sur mobile, deux sur tablette, trois sur desktop." },
        ],
      },
    ],
  },
  {
    id: "animations",
    title: "Animations",
    level: 3,
    intro: "Du simple au chorégraphié : l'éventail.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux",
        fields: [
          { label: "Implicites", value: "`AnimatedContainer`, `AnimatedOpacity`, `AnimatedPadding` : on change la valeur cible, Flutter anime la transition. 80 % des besoins." },
          { label: "`Hero`", value: "Transition d'un élément entre deux écrans (image qui « vole » vers le détail) : déclaratif, spectaculaire." },
          { label: "Explicites", value: "`AnimationController` + `Tween` : contrôle total (courbes, enchaînements, répétitions) pour les animations sur mesure." },
          { label: "Règle", value: "Animer le sens, pas la décoration : 200-300 ms, une courbe naturelle, et `dispose()` du contrôleur." },
        ],
      },
    ],
  },
  {
    id: "http-rest",
    title: "Appels HTTP et REST",
    level: 3,
    intro: "Parler à une API : le cycle complet.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "GET et décodage JSON",
        code: `import 'dart:convert';\nimport 'package:http/http.dart' as http;\n\nFuture<List<String>> fetchCities() async {\n  final uri = Uri.parse('https://api.example.com/cities');\n  final response = await http.get(uri);\n\n  if (response.statusCode == 200) {\n    final List data = jsonDecode(response.body) as List;\n    return data.map((e) => e['name'] as String).toList();\n  }\n  throw Exception('Erreur \${response.statusCode}');\n}`,
      },
      {
        kind: "text",
        text: "Toujours vérifier le statut avant de décoder ; toujours typer le résultat (`as List`, `as String`) — le JSON est non typé par nature. Les erreurs réseau deviennent des exceptions : les attraper là où l'UI peut les afficher.",
      },
    ],
  },
  {
    id: "modeles-json",
    title: "Modèles JSON typés",
    level: 3,
    intro: "Du JSON brut aux objets Dart : `fromJson`/`toJson`.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Le pattern manuel",
        code: `class City {\n  final String name;\n  final double temperature;\n\n  const City({required this.name, required this.temperature});\n\n  factory City.fromJson(Map<String, dynamic> json) {\n    return City(\n      name: json['name'] as String,\n      temperature: (json['temp'] as num).toDouble(),\n    );\n  }\n\n  Map<String, dynamic> toJson() => {'name': name, 'temp': temperature};\n}\n\n// Usage : jsonDecode(response.body) puis City.fromJson(...).\n// Pour les gros modèles : génération de code (json_serializable).`,
      },
      {
        kind: "text",
        text: "Le pattern manuel suffit pour quelques modèles ; au-delà, la génération de code évite les erreurs de frappe et les oublis de champs. Dans tous les cas : une classe par ressource, typée, avec ses conversions.",
      },
    ],
  },
  {
    id: "persistance-locale",
    title: "Persistance locale",
    level: 3,
    intro: "Stocker sur l'appareil : trois niveaux selon le besoin.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux",
        fields: [
          { label: "Clé-valeur", value: "Préférences, réglages, petits états : le package officiel de stockage clé-valeur de l'écosystème Flutter. Simple, synchrone en lecture après init." },
          { label: "Fichiers", value: "Documents, images en cache, exports : le dossier applicatif via le package officiel d'accès aux chemins, lecture/écriture avec `dart:io`." },
          { label: "Base locale", value: "Données structurées requêtables (notes, historique) : SQLite via le plugin de l'écosystème — requêtes SQL, transactions, comme côté serveur." },
        ],
      },
      {
        kind: "text",
        text: "Choisir selon la structure : une poignée de réglages → clé-valeur ; des objets à requêter → SQLite. Et chiffrer ce qui est sensible : le stockage local n'est pas un coffre-fort par défaut.",
      },
    ],
  },
  {
    id: "platform-channels",
    title: "Platform channels",
    level: 3,
    intro: "Quand Dart ne suffit pas : appeler le natif.",
    blocks: [
      {
        kind: "text",
        text: "Certaines capacités n'existent qu'en natif (capteur spécifique, API système pointue). Les platform channels font le pont : Dart envoie un message nommé avec des arguments, le code Kotlin/Swift l'exécute et répond. La plupart des besoins sont déjà couverts par des plugins pub.dev — on n'écrit un channel que pour le cas vraiment spécifique.",
      },
    ],
  },
  {
    id: "permissions",
    title: "Permissions",
    level: 3,
    intro: "Caméra, localisation, notifications : demander proprement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Déclarer dans les manifestes (AndroidManifest, Info.plist) : sans déclaration, la demande échoue silencieusement.",
          "Demander au moment du besoin, pas au lancement : l'utilisateur comprend le pourquoi.",
          "Expliquer avant de demander si le refus est probable : un écran de contexte avant le dialogue système.",
          "Gérer le refus définitif : guider vers les réglages plutôt que de redemander en boucle.",
        ],
      },
    ],
  },
  {
    id: "assets",
    title: "Assets : images et polices",
    level: 3,
    intro: "Embarquer images et polices dans l'app.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Déclarer puis utiliser",
        code: `flutter:\n  assets:\n    - assets/images/\n    - assets/icons/marker.png\n  fonts:\n    - family: Inter\n      fonts:\n        - asset: assets/fonts/Inter-Regular.ttf\n        - asset: assets/fonts/Inter-Bold.ttf\n          weight: 700`,
      },
      {
        kind: "code",
        language: "dart",
        title: "Utilisation",
        code: `Image.asset('assets/images/logo.png') // image embarquée\nText('Titre', style: TextStyle(fontFamily: 'Inter')) // police embarquée`,
      },
      {
        kind: "text",
        text: "Les assets se déclarent dans le `pubspec.yaml` : sans déclaration, ils ne sont pas embarqués. Prévoir les densités (`2.0x`, `3.0x`) pour les images bitmap — ou préférer le SVG vectoriel.",
      },
    ],
  },
  {
    id: "tests-unitaires",
    title: "Tests unitaires",
    level: 3,
    intro: "Tester la logique pure : rapide, déterministe.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Test d'une fonction",
        code: `import 'package:test/test.dart';\n\nString greet(String name) => 'Bonjour $name';\n\nvoid main() {\n  test('greet salue par le prénom', () {\n    expect(greet('Ada'), 'Bonjour Ada');\n  });\n\n  test('greet gère la chaîne vide', () {\n    expect(greet(''), 'Bonjour ');\n  });\n}`,
      },
      {
        kind: "command",
        label: "Lancer les tests",
        command: "flutter test",
        why: "Exécute tous les tests du dossier `test/` : unitaires et widgets. Rapide, sans émulateur — la commande de la boucle de développement et de la CI.",
      },
    ],
  },
  {
    id: "tests-widgets",
    title: "Tests de widgets",
    level: 3,
    intro: "Tester l'interface sans émulateur : `testWidgets`.",
    blocks: [
      {
        kind: "code",
        language: "dart",
        title: "Le compteur testé",
        code: `import 'package:flutter/material.dart';\nimport 'package:flutter_test/flutter_test.dart';\nimport 'package:mon_app/main.dart';\n\nvoid main() {\n  testWidgets('le compteur s’incrémente', (tester) async {\n    await tester.pumpWidget(const MyApp()); // construit l'app\n\n    expect(find.text('0'), findsOneWidget); // état initial\n\n    await tester.tap(find.byIcon(Icons.add)); // simule le tap\n    await tester.pump(); // reconstruit\n\n    expect(find.text('0'), findsNothing); // l'ancien a disparu\n    expect(find.text('1'), findsOneWidget); // le nouveau est là\n  });\n}`,
      },
      {
        kind: "text",
        text: "Le pattern : `pumpWidget` construit, `find` cherche (par texte, icône, clé), `tap`/`enterText` simulent, `pump` reconstruit. On teste le comportement visible, pas l'implémentation interne.",
      },
    ],
  },
  {
    id: "tests-integration",
    title: "Tests d'intégration",
    level: 3,
    intro: "L'app réelle sur appareil réel : les parcours critiques.",
    blocks: [
      {
        kind: "text",
        text: "Les tests d'intégration pilotent l'application compilée sur émulateur ou appareil : lancement, navigation, saisie, vérification. Réservés aux parcours critiques (onboarding, achat, login) — lents et coûteux, ils complètent les tests widgets sans les remplacer.",
      },
    ],
  },
  {
    id: "build-release",
    title: "Builds de release",
    level: 3,
    intro: "Produire les artefacts à distribuer.",
    blocks: [
      {
        kind: "command",
        label: "Construire l'APK Android",
        command: "flutter build apk --release",
        why: "Compile en natif avec les optimisations (tree-shaking, minification) : l'APK de `build/outputs/` est l'artefact à tester sur appareil avant publication.",
        verify: "ls build/app/outputs/flutter-apk/app-release.apk",
      },
      {
        kind: "command",
        label: "Construire pour le Play Store et le web",
        command: "flutter build appbundle --release",
        why: "L'App Bundle (`.aab`) est le format exigé par le Play Store : Google génère les APK optimisés par appareil. Pour le web : `flutter build web` produit le site statique dans `build/web/`.",
      },
      {
        kind: "text",
        text: "Android exige une signature (keystore) pour publier ; iOS exige Xcode, un compte développeur Apple et des profils de provisionnement. Préparer ces éléments avant le jour de la release — pas pendant.",
      },
    ],
  },
  {
    id: "tailles-perf",
    title: "Taille et performance",
    level: 3,
    intro: "Garder l'app légère et fluide.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers",
        fields: [
          { label: "Taille", value: "`--split-per-abi` : un APK par architecture processeur au lieu d'un gros universel. Auditer avec l'analyseur de taille : quelles dépendances pèsent ?" },
          { label: "Rebuilds", value: "`const` partout où c'est possible, widgets petits et ciblés : moins de sous-arbres reconstruits à chaque `setState`." },
          { label: "Listes longues", value: "`ListView.builder` : ne construit que les éléments visibles, pas les 10 000." },
          { label: "Images", value: "Dimensions adaptées, `cacheWidth`, formats efficaces : l'image trop lourde est la cause n°1 des saccades." },
          { label: "DevTools", value: "L'onglet performance montre les frames manquées et les rebuilds excessifs : mesurer avant d'optimiser." },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les classiques que tout développeur Flutter rencontre.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "setState() called after dispose()",
            value:
              "Problem : un callback asynchrone modifie l'état d'un écran déjà fermé. Better : vérifier `mounted` avant `setState`, annuler les abonnements dans `dispose()`.",
          },
          {
            label: "Overflow (bandes jaunes/noires)",
            value:
              "Problem : le contenu dépasse son conteneur. Better : `Expanded`/`Flexible`, `SingleChildScrollView`, ou repenser le layout — pas des tailles magiques.",
          },
          {
            label: "Mauvais context",
            value:
              "Problem : utiliser un `context` qui ne voit pas le `Scaffold`/`Navigator` (dialogue, snackbar). Better : `Builder` pour obtenir le bon contexte, ou le contexte du bon niveau.",
          },
          {
            label: "Rebuilds en cascade",
            value:
              "Problem : `setState` au sommet reconstruit tout l'arbre à chaque frappe. Better : état au plus bas, widgets `const`, découper.",
          },
          {
            label: "Logique dans build()",
            value:
              "Problem : appels réseau ou effets dans `build` → boucles et comportements erratiques. Better : `initState`, handlers, `FutureBuilder`.",
          },
          {
            label: "Clés oubliées dans les listes",
            value:
              "Problem : réordonner une liste mélange les états des éléments. Better : `Key` stables (ex. `ValueKey(id)`) sur les éléments stateful.",
          },
          {
            label: "Ignorer flutter analyze",
            value:
              "Problem : avertissements accumulés = bugs futurs. Better : zéro warning, règles strictes dans `analysis_options.yaml`.",
          },
          {
            label: "Assets non déclarés",
            value:
              "Problem : `Unable to load asset` à l'exécution. Better : déclarer dans `pubspec.yaml`, vérifier le chemin exact (sensible à la casse).",
          },
          {
            label: "Bloquer l'UI avec du calcul lourd",
            value:
              "Problem : saccades pendant un traitement. Better : `compute()` pour isoler dans un thread séparé.",
          },
          {
            label: "Tester uniquement sur émulateur",
            value:
              "Problem : performances et comportements réels différents. Better : tester régulièrement sur appareil physique.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Déboguer avec DevTools",
    level: 3,
    intro: "L'arsenal : au-delà du `print`.",
    blocks: [
      {
        kind: "fields",
        title: "Les outils",
        fields: [
          { label: "Flutter DevTools", value: "Inspecteur de widgets (l'arbre, les propriétés), timeline des performances, vue mémoire et réseau : se lance depuis VS Code ou `flutter pub global`." },
          { label: "`debugPrint`", value: "Le `print` qui ne tronque pas et respecte la console : pour les logs de développement." },
          { label: "Points d'arrêt", value: "Breakpoints dans VS Code / Android Studio : inspecter l'état au moment précis, pas après coup." },
          { label: "Widget inspector", value: "Le mode « select widget » : toucher un élément à l'écran pour voir son widget et ses contraintes." },
          { label: "Bannières de debug", value: "Les bandes jaunes/noires (overflow) et la bannière DEBUG : des diagnostics visuels, pas des décorations." },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Les réflexes d'une app Flutter saine.",
    blocks: [
      {
        kind: "list",
        items: [
          "`flutter analyze` propre : zéro avertissement, toujours.",
          "Widgets petits, `const` partout où c'est possible.",
          "État au plus bas niveau qui le partage ; `setState` pour le local.",
          "`build()` pure : pas d'effets de bord, pas d'appels réseau.",
          "Thème centralisé (`ThemeData`), jamais de couleurs en dur.",
          "Chaînes externalisées si l'app vise plusieurs langues.",
          "Tests widgets pour les écrans critiques, unitaires pour la logique.",
          "Assets déclarés, images dimensionnées, listes avec `builder`.",
          "`dispose()` systématique : contrôleurs, abonnements, timers.",
          "Tester sur appareil physique avant chaque release.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "Flutter", value: "https://docs.flutter.dev/ — guides, codelabs, référence des widgets, cookbook." },
          { label: "Dart", value: "Le language tour de la documentation Dart : le langage en profondeur, avec la null safety." },
          { label: "pub.dev", value: "Le registre officiel des packages : scores de qualité, documentation, exemples." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : le cookbook officiel (recettes : navigation, formulaires, animations) puis les projets de cette page.",
          "Pages liées de cette plateforme : HTTP/API, Tests, Architecture frontend (les principes se transposent).",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Flutter maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Brancher des API : `http` et `api-integration` — REST, JSON, erreurs réseau.",
          "Tester sérieusement : `testing` — stratégie complète au-delà des widgets.",
          "Automatiser : `github-actions` — tests et builds à chaque push.",
          "Comparer le cross-platform : `react-native` — l'autre grande approche.",
          "Construire le backend : `nodejs` — l'API derrière l'app.",
        ],
      },
    ],
  },
];

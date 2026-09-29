import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Java : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Angles spécifiques : JDK et distributions, javac/java/jshell, JVM et
 * bytecode, Maven vs Gradle (comparaison factuelle), POO complète,
 * collections, streams, lambdas, JUnit, packaging et CI/CD.
 */
export const LEARNING_JAVA: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Java, ce qu'il n'est pas, et pourquoi il fait tourner une immense partie du monde logiciel.",
    blocks: [
      {
        kind: "text",
        text: "Java est un langage de programmation orienté objet, créé chez Sun Microsystems (aujourd'hui Oracle) et publié en 1995. Son principe fondateur tient en un slogan : « write once, run anywhere » — écrire une fois, exécuter partout. Le code Java n'est pas compilé vers le processeur d'une machine précise, mais vers un format intermédiaire, le bytecode, exécuté par la machine virtuelle Java (JVM) disponible sur chaque plateforme.",
      },
      {
        kind: "text",
        text: "Concrètement, Java fait tourner des applications d'entreprise, des systèmes bancaires, des serveurs web, des applications Android (historiquement), des outils de big data (Hadoop, Kafka, Elasticsearch sont écrits en Java ou en langages JVM) et des jeux comme Minecraft. C'est un langage « batterie incluse » avec une immense bibliothèque standard, un typage statique fort et une gestion automatique de la mémoire.",
      },
      {
        kind: "text",
        text: "Java est un langage compilé vers un bytecode portable, exécuté par la JVM, avec typage statique et ramasse-miettes.",
      },
      {
        kind: "text",
        text: "Dans les années 90, écrire un programme par plateforme coûtait cher et les pointeurs manuels du C causaient des crashs. Java a apporté la portabilité (une compilation, toutes les plateformes) et la sécurité mémoire (pas d'arithmétique de pointeurs, ramasse-miettes intégré).",
      },
      {
        kind: "text",
        text: "Applications backend et d'entreprise, API, systèmes distribués, Android (via Kotlin/Java), outils de données. Moins adapté aux scripts rapides ou aux pages web interactives côté navigateur.",
      },
      {
        kind: "fields",
        title: "Java : l'essentiel",
        fields: [
          {
            label: "Ce que ce n'est pas",
            value: "Ni JavaScript (aucun lien malgré le nom), ni un langage interprété pur, ni réservé aux débutants ou aux experts : sa verbosité assumée vise la lisibilité en équipe.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : source → bytecode → JVM",
    level: 1,
    intro:
      "La seule idée à retenir avant tout le reste : en Java, on ne compile pas pour une machine, on compile pour une machine virtuelle.",
    blocks: [
      {
        kind: "diagram",
        title: "Le voyage d'un programme Java",
        lines: [
          "Bonjour.java  (code source, lisible par l'humain)",
          "     │  javac",
          "     ▼",
          "Bonjour.class  (bytecode : instructions pour la JVM, pas pour un CPU)",
          "     │  java",
          "     ▼",
          "JVM : charge la classe, vérifie le bytecode,",
          "      compile à chaud les portions critiques (JIT),",
          "      gère la mémoire (ramasse-miettes)",
          "     │",
          "     ▼",
          "Exécution identique sur Windows, macOS, Linux",
        ],
      },
      {
        kind: "text",
        text: "Ce détour par la JVM explique presque tout le reste : la portabilité (le même `.class` tourne partout où une JVM existe), la sécurité (le bytecode est vérifié avant exécution), et les performances (le compilateur JIT transforme à chaud le bytecode fréquemment exécuté en code natif optimisé — un programme Java long à démarrer peut devenir très rapide en régime établi).",
      },
      {
        kind: "list",
        items: [
          "`javac` traduit le source en bytecode ; `java` lance la JVM qui l'exécute.",
          "La JVM gère la mémoire à votre place : l'oubli de libération mémoire, cause n°1 des bugs en C, n'existe quasiment pas en Java.",
          "Le typage statique fait vérifier une grande partie des erreurs par le compilateur, avant même l'exécution.",
          "Java évolue vite depuis 2017 (une version tous les 6 mois) tout en restant compatible : du code Java 8 compile et tourne sur une JVM récente.",
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
      "Java s'apprend sans connaître d'autre langage, mais quelques bases de programmation accélèrent tout.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut (et ne faut pas) savoir",
        fields: [
          {
            label: "Bases de programmation",
            value: "Variables, conditions (`if`), boucles, fonctions. Si vous venez de Python ou JavaScript, la logique est la même — seule la syntaxe change et devient plus explicite.",
          },
          {
            label: "Ligne de commande",
            value: "Savoir ouvrir un terminal, se déplacer (`cd`) et lancer une commande. `javac` et `java` sont des outils en ligne de commande : c'est leur habitat naturel.",
          },
          {
            label: "Inutile au début",
            value: "La programmation orientée objet : classes, héritage, interfaces. C'est le cœur de Java et cette page l'enseigne de zéro — n'apprenez pas la POO ailleurs avant, vous risqueriez d'importer de mauvais réflexes.",
          },
          {
            label: "Anglais technique",
            value: "Les messages du compilateur, la documentation et les noms de méthodes sont en anglais. Pas besoin d'être bilingue : le vocabulaire se limite à quelques dizaines de mots.",
          },
        ],
      },
    ],
  },
  {
    id: "installer-jdk",
    title: "Installer le JDK",
    level: 2,
    intro:
      "Pour développer en Java, il faut un JDK (Java Development Kit) : compilateur, machine virtuelle et outils. Le point de départ de tout.",
    blocks: [
      {
        kind: "text",
        text: "Le JDK contient tout : `javac` (compilateur), `java` (lanceur de la JVM), `jshell` (console interactive) et les outils de packaging. Il est construit à partir du projet open source OpenJDK ; plusieurs éditeurs proposent leurs distributions testées. Elles exécutent toutes le même langage — le choix relève du contexte (politique d'entreprise, support, plateforme), pas d'une supériorité technique.",
      },
      {
        kind: "table",
        headers: ["Distribution", "Proposée par", "Particularité"],
        rows: [
          ["Oracle JDK", "Oracle", "Builds issus d'OpenJDK ; licence d'utilisation à vérifier sur le site d'Oracle, elle a changé plusieurs fois."],
          ["Eclipse Temurin", "Eclipse Adoptium", "Builds OpenJDK communautaires, testés avec la suite AQAvit ; téléchargement direct sans compte."],
          ["Amazon Corretto", "AWS", "Builds OpenJDK avec engagement de support long terme annoncé par Amazon."],
          ["Autres", "Microsoft, Azul, Red Hat…", "D'autres builds OpenJDK existent (Microsoft Build of OpenJDK, Azul Zulu…) : même langage, mêmes outils."],
        ],
      },
      {
        kind: "command",
        label: "Vérifier que Java est installé (affiche la version du runtime)",
        command: "java --version",
        why: "C'est le test universel : si cette commande répond, une JVM est présente et utilisable. Elle affiche la version (visez une LTS récente : 17, 21 ou 25) et la distribution.",
        verify: "Le terminal affiche quelque chose comme `openjdk 21.0.x` suivi du nom de la distribution.",
      },
      {
        kind: "command",
        label: "Vérifier le compilateur (doit répondre aussi, sinon seul le runtime est installé)",
        command: "javac --version",
        why: "`java` seul ne suffit pas pour développer : il faut `javac` pour compiler. Si `javac` est introuvable alors que `java` répond, vous n'avez qu'un runtime — installez le JDK complet.",
        verify: "Le terminal affiche `javac` suivi du même numéro de version que `java`.",
      },
      {
        kind: "text",
        text: "Note d'environnement : certains outils (Maven, Gradle, serveurs d'applications) lisent la variable `JAVA_HOME`, qui doit pointer vers le dossier d'installation du JDK (pas vers le dossier `bin`). Si un outil se plaint de ne pas trouver Java alors que `java --version` fonctionne, c'est presque toujours `JAVA_HOME` qui manque ou pointe mal.",
      },
    ],
  },
  {
    id: "editeurs-ide",
    title: "Éditeurs et IDE",
    level: 2,
    intro:
      "Java se pratique très bien avec un simple éditeur et le terminal, mais un IDE change la vie dès que le projet grandit.",
    blocks: [
      {
        kind: "text",
        text: "Un IDE (environnement de développement intégré) comprend Java en profondeur : complétion intelligente, refactoring automatisé (renommer une classe dans tout le projet), débogueur visuel et exécution des tests en un clic. Au début, écrire quelques fichiers à la main avec `javac` reste le meilleur moyen de comprendre la compilation ; dès que vous touchez aux projets multi-fichiers, passez à un IDE.",
      },
      {
        kind: "fields",
        title: "Les options courantes, sans classement",
        fields: [
          {
            label: "IntelliJ IDEA",
            value: "L'IDE Java le plus répandu en entreprise. Édition Community gratuite (Java, Kotlin) et Ultimate payante (frameworks web, bases de données). Excellent refactoring et inspections de code.",
          },
          {
            label: "Eclipse",
            value: "IDE historique, gratuit et open source, très présent dans les grandes organisations et l'enseignement. Écosystème de plugins immense.",
          },
          {
            label: "NetBeans",
            value: "IDE gratuit (Apache), plus léger, souvent apprécié pour débuter : configuration minimale pour compiler et exécuter.",
          },
          {
            label: "VS Code + Extension Pack for Java",
            value: "Pour ceux qui vivent déjà dans VS Code : le pack d'extensions Java (Microsoft) apporte compilation, débogage et Maven/Gradle. Plus manuel qu'un vrai IDE Java.",
          },
        ],
      },
      {
        kind: "text",
        text: "Aucun de ces outils n'est « le meilleur » dans l'absolu : en stage ou en entreprise, on utilise celui de l'équipe. L'important est de savoir faire sans : comprendre `javac` et le classpath vous rend autonome dans n'importe quel environnement.",
      },
    ],
  },
  {
    id: "premier-programme",
    title: "Premier programme",
    level: 2,
    intro:
      "Le rituel d'initiation : écrire, compiler, exécuter. Cinq minutes pour voir toute la chaîne en action.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le fichier",
            detail: "Créez un fichier nommé exactement `Bonjour.java` (la casse compte, et le nom doit correspondre à la classe publique qu'il contient).",
          },
          {
            title: "Écrire le code",
            detail: "Copiez le programme ci-dessous : une classe `Bonjour` avec une méthode `main`, le point d'entrée de tout programme Java.",
          },
          {
            title: "Compiler",
            detail: "Dans le terminal, dans le dossier du fichier : `javac Bonjour.java`. Succès = silence + apparition de `Bonjour.class`.",
          },
          {
            title: "Exécuter",
            detail: "Lancez `java Bonjour` (sans `.class`, sans `.java`). La JVM charge la classe et appelle `main`.",
          },
          {
            title: "Modifier et recommencer",
            detail: "Changez le texte, recompilez, réexécutez. Ce cycle édition → compilation → exécution est le rythme de base du développement Java.",
          },
        ],
      },
      {
        kind: "code",
        language: "java",
        title: "Bonjour.java — votre premier programme",
        code: "public class Bonjour {\n    public static void main(String[] args) {\n        System.out.println(\"Bonjour, Java !\");\n    }\n}",
      },
      {
        kind: "fields",
        title: "Décortiquer la méthode `main`",
        fields: [
          {
            label: "`public`",
            value: "La JVM doit pouvoir appeler cette méthode depuis l'extérieur de la classe.",
          },
          {
            label: "`static`",
            value: "Appelable sans créer d'objet : au démarrage, aucun objet n'existe encore.",
          },
          {
            label: "`void`",
            value: "Elle ne retourne rien (le code de sortie se gère autrement).",
          },
          {
            label: "`String[] args`",
            value: "Les arguments passés sur la ligne de commande après le nom de la classe.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur classique à ce stade : `class Bonjour is public, should be declared in a file named Bonjour.java`. Retenez la règle : une classe `public` vit dans un fichier portant exactement son nom. C'est une contrainte, mais elle rend les gros projets prévisibles : on sait toujours où chercher une classe.",
      },
    ],
  },
  {
    id: "javac-java-jshell",
    title: "Les trois outils : `javac`, `java`, `jshell`",
    level: 2,
    intro:
      "Trois commandes, trois rôles : compiler, exécuter, expérimenter. Les connaître, c'est comprendre Java.",
    blocks: [
      {
        kind: "command",
        label: "Compiler un fichier source en bytecode",
        command: "javac Bonjour.java",
        why: "`javac` lit le source, vérifie les types et produit `Bonjour.class` (bytecode). Sans erreur, il ne dit rien — le silence est le succès. Les erreurs de compilation s'affichent avec fichier, ligne et explication : corrigez-les avant toute exécution, la JVM ne tourne jamais un programme qui ne compile pas.",
        verify: "Le fichier `Bonjour.class` apparaît à côté du source.",
      },
      {
        kind: "command",
        label: "Exécuter une classe compilée avec la JVM",
        command: "java Bonjour",
        why: "`java` démarre la JVM, charge `Bonjour.class` et appelle sa méthode `main`. Notez qu'on donne le nom de la classe, pas du fichier : la JVM cherche la classe dans le classpath (par défaut, le dossier courant).",
        verify: "`Bonjour, Java !` s'affiche dans le terminal.",
      },
      {
        kind: "command",
        label: "Ouvrir la console interactive Java (expérimenter sans fichier)",
        command: "jshell",
        why: "`jshell` (disponible depuis Java 9) est un REPL : vous tapez des expressions Java, il les évalue immédiatement. Idéal pour tester une méthode, une boucle ou une API sans créer de projet. Commandes utiles à l'intérieur : `/vars` (variables définies), `/list` (historique), `/exit` (quitter).",
        verify: "L'invite `jshell>` apparaît ; `1 + 2` suivi d'Entrée répond `$1 ==> 3`.",
      },
      {
        kind: "text",
        text: "Le classpath, en une phrase : c'est la liste des endroits où `java` et `javac` cherchent les classes. Avec `-cp` (ou `-classpath`), on l'étend : `javac -cp lib/monoutils.jar MonApp.java` compile en utilisant une bibliothèque externe, `java -cp .:lib/monoutils.jar MonApp` l'exécute. Sur Windows, le séparateur est `;` au lieu de `:`. Quatre-vingt-dix pour cent des `ClassNotFoundException` viennent d'un classpath incomplet.",
      },
    ],
  },
  {
    id: "structure-projet",
    title: "Structure d'un projet et packages",
    level: 2,
    intro:
      "Dès qu'on dépasse un fichier, Java impose de l'ordre : les packages organisent les classes comme des dossiers.",
    blocks: [
      {
        kind: "diagram",
        title: "Un projet Java minimal mais propre",
        lines: [
          "mon-projet/",
          "├── src/",
          "│   └── com/",
          "│       └── exemple/",
          "│           └── app/",
          "│               ├── Main.java        (package com.exemple.app;)",
          "│               └── Calculatrice.java",
          "└── README.md",
          "",
          "Compilation :  javac -d out $(find src -name \"*.java\")",
          "Exécution   :  java -cp out com.exemple.app.Main",
        ],
      },
      {
        kind: "text",
        text: "Un `package` est un espace de noms : la déclaration `package com.exemple.app;` en haut du fichier range la classe dans ce package, et le fichier doit se trouver dans le dossier correspondant (`com/exemple/app/`). La convention est d'utiliser son nom de domaine inversé (`com.exemple`) pour garantir l'unicité mondiale — deux bibliothèques ne se marcheront jamais dessus.",
      },
      {
        kind: "list",
        items: [
          "Les packages évitent les collisions de noms : deux classes `Client` peuvent coexister dans `com.banque` et `com.boutique`.",
          "`import java.util.List;` rend la classe `List` utilisable sans son nom complet ; sans import, il faut écrire `java.util.List` en entier.",
          "Le package par défaut (aucune déclaration) est toléré pour les essais, mais interdit en pratique : impossible à importer depuis un autre package.",
          "L'option `-d out` de `javac` recrée l'arborescence des packages dans le dossier `out` : sources et classes compilées restent séparées.",
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "À quoi ressemble une journée de développement Java, du premier café au dernier commit.",
    blocks: [
      {
        kind: "diagram",
        title: "La boucle de développement",
        lines: [
          "1. ÉDITER ......... modifier le code (IDE : compilation instantanée)",
          "2. COMPILER ...... javac ou build auto de l'IDE (erreurs = corriger)",
          "3. EXÉCUTER ..... java / bouton Run / tests unitaires",
          "4. EXPÉRIMENTER .. jshell pour tester une idée en 10 secondes",
          "5. DÉBOGUER ..... breakpoints dans l'IDE, pas System.out.println",
          "6. TESTER ....... lancer les tests avant de committer",
          "        ▲                                         │",
          "        └───────── ça ne marche pas ? ────────────┘",
        ],
      },
      {
        kind: "list",
        items: [
          "Compilez souvent : le compilateur Java est un allié qui attrape les erreurs de type avant l'exécution — l'ignorer, c'est perdre son principal filet de sécurité.",
          "Gardez `jshell` ouvert à côté : vérifier le comportement de `String.split` ou d'une expression régulière y prend dix secondes, contre un cycle complet de compilation sinon.",
          "Exécutez les tests avant chaque commit, pas « à la fin du projet » : un test qui passe aujourd'hui et casse demain signale exactement ce qui a changé.",
          "Lisez les messages d'erreur en entier : `javac` indique le fichier, la ligne, et souvent la correction (`';' expected`, `cannot find symbol`).",
        ],
      },
    ],
  },
  {
    id: "comprendre-les-erreurs",
    title: "Comprendre les erreurs : compilation vs exécution",
    level: 2,
    intro:
      "En Java, il y a deux familles d'erreurs aux philosophies opposées : celles qui empêchent de compiler, et celles qui font planter à l'exécution.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux familles",
        fields: [
          {
            label: "Erreurs de compilation",
            value: "Détectées par `javac` : type incompatible, variable inconnue, point-virgule oublié. Le programme ne démarre même pas. Ce sont les erreurs « gentilles » : précises, localisées, sans dégât.",
          },
          {
            label: "Exceptions à l'exécution",
            value: "Le programme compile mais un problème survient en tournant : `NullPointerException`, division par zéro, fichier introuvable. Java affiche une stack trace qu'il faut savoir lire.",
          },
        ],
      },
      {
        kind: "code",
        language: "java",
        title: "Lire une stack trace (exemple réel)",
        code: "Exception in thread \"main\" java.lang.NullPointerException:\n        Cannot invoke \"String.length()\" because \"nom\" is null\n        at com.exemple.app.Main.afficher(Main.java:12)\n        at com.exemple.app.Main.main(Main.java:7)",
      },
      {
        kind: "list",
        items: [
          "Ligne 1 : le type d'exception et son message — ici, on a appelé `.length()` sur une variable `nom` qui vaut `null`. Les JVM récentes expliquent la cause en clair (« helpful NullPointerExceptions »).",
          "Les lignes `at ...` listent les appels, du plus récent au plus ancien : l'erreur s'est produite ligne 12 de `Main.java`, appelée depuis la ligne 7.",
          "Cherchez la première ligne qui mentionne VOTRE code (`com.exemple.app`) : c'est là qu'il faut corriger. Les lignes du JDK en dessous sont le contexte, pas le problème.",
          "Réflexe n°1 : reproduire avec le cas le plus simple. Réflexe n°2 : lire le message en entier avant de chercher sur internet.",
        ],
      },
    ],
  },
  {
    id: "versions-java",
    title: "Les versions de Java : LTS et rythme de sortie",
    level: 2,
    intro:
      "Java sort une version tous les 6 mois. Inutile de toutes les connaître : seules les LTS comptent vraiment.",
    blocks: [
      {
        kind: "text",
        text: "Depuis Java 9, une nouvelle version sort chaque semestre (mars, septembre). Pour éviter la course permanente, certaines versions sont désignées LTS (Long-Term Support) : elles reçoivent des mises à jour pendant des années et servent de cibles stables pour les entreprises.",
      },
      {
        kind: "table",
        headers: ["Version", "Sortie", "Statut", "À retenir"],
        rows: [
          ["8", "2014", "LTS (historique)", "Lambdas, streams, nouvelle API de dates : la version qui a modernisé Java. Encore croisée dans du code ancien."],
          ["11", "2018", "LTS", "`var`, `jshell`, HTTP Client : première LTS du nouveau rythme."],
          ["17", "2021", "LTS", "Classes scellées, pattern matching (preview), records finalisés."],
          ["21", "2023", "LTS", "Virtual threads, pattern matching pour `switch` : un excellent choix par défaut aujourd'hui."],
          ["25", "2025", "LTS", "La LTS la plus récente au moment de la rédaction."],
        ],
      },
      {
        kind: "text",
        text: "En pratique : développez sur une LTS récente (21 ou 25), et vérifiez toujours la version cible d'un projet existant avant d'utiliser une nouveauté du langage — un `record` ne compilera pas si le projet vise Java 8. La version se déclare dans le build (`maven.compiler.release` ou `sourceCompatibility`), pas dans le code.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "variables-types-primitifs",
    title: "Variables et types primitifs",
    level: 3,
    intro:
      "Java est à typage statique : chaque variable déclare son type, vérifié à la compilation.",
    blocks: [
      {
        kind: "text",
        text: "Une variable Java a un type déclaré une fois pour toutes ; le compilateur refuse toute affectation incompatible.",
      },
      {
        kind: "text",
        text: "Le typage statique déplace une classe entière de bugs du runtime vers la compilation : `String nom = 42;` ne compile pas, point final.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value: "Toujours : c'est le régime par défaut du langage, pas une option.",
          },
          {
            label: "Comment",
            value: "`int age = 30;` déclare puis initialise. Depuis Java 10, `var age = 30;` laisse le compilateur déduire le type — pratique, mais réservé aux variables locales.",
          },
        ],
      },
      {
        kind: "table",
        headers: ["Type", "Taille", "Exemple", "Valeur par défaut (champ)"],
        rows: [
          ["`byte`", "8 bits", "`(byte) 100`", "`0`"],
          ["`short`", "16 bits", "`(short) 1000`", "`0`"],
          ["`int`", "32 bits", "`42`", "`0`"],
          ["`long`", "64 bits", "`42L`", "`0L`"],
          ["`float`", "32 bits", "`3.14f`", "`0.0f`"],
          ["`double`", "64 bits", "`3.14`", "`0.0`"],
          ["`char`", "16 bits (UTF-16)", "`'a'`", "`'\\u0000'`"],
          ["`boolean`", "non précisé", "`true`", "`false`"],
        ],
      },
      {
        kind: "code",
        language: "java",
        title: "Pièges classiques des primitifs",
        code: "int a = 5 / 2;        // vaut 2, pas 2.5 : division ENTIÈRE\ndouble b = 5.0 / 2;   // vaut 2.5 : un opérande décimal suffit\nlong big = 3_000_000_000L; // le L est obligatoire au-delà de int\nvar nom = \"Ada\";      // déduit : String (Java 10+)\n// var x;             // interdit : var exige une initialisation",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value: "La division entière : `5 / 2` vaut `2`. Pour un résultat décimal, écrivez `5.0 / 2` ou castez : `(double) 5 / 2`.",
          },
          {
            label: "Bonne pratique",
            value: "Préférez `int` et `double` par défaut ; n'utilisez `long`/`float` que pour un besoin réel (grands nombres, mémoire contrainte). Nommez les variables en `camelCase`.",
          },
          {
            label: "Concepts liés",
            value: "Les types enveloppes (`Integer`, `Double`…) : versions objets des primitifs, nécessaires dans les collections et les génériques.",
          },
        ],
      },
    ],
  },
  {
    id: "operateurs-controle-flux",
    title: "Opérateurs et contrôle du flux",
    level: 3,
    intro:
      "Les briques de la logique : comparer, brancher, répéter.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "Conditions, switch moderne et boucles",
        code: "int note = 15;\nif (note >= 10) {\n    System.out.println(\"Admis\");\n} else {\n    System.out.println(\"Recalé\");\n}\n\n// switch expression (Java 14+) : retourne une valeur\nString mention = switch (note / 5) {\n    case 4, 3 -> \"Bien\";\n    case 2 -> \"Passable\";\n    default -> \"Insuffisant\";\n};\n\nfor (int i = 0; i < 3; i++) { /* 0, 1, 2 */ }\nwhile (note < 20) { note++; }\nfor (String nom : noms) { /* for-each : lire une collection */ }",
      },
      {
        kind: "text",
        text: "`if`/`switch` choisissent, `for`/`while` répètent : la logique de tout programme tient dans ces quatre mots-clés.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Pourquoi le switch moderne",
            value: "L'ancien `switch` exigeait des `break` sous peine de « tomber » dans le cas suivant — source classique de bugs. La forme fléchée (`->`) des switch expressions supprime ce piège et retourne directement une valeur.",
          },
          {
            label: "Erreur fréquente",
            value: "La boucle « off-by-one » : `i <= tableau.length` dépasse d'un cran (les index vont de `0` à `length - 1`). Écrivez `i < tableau.length`, ou mieux, utilisez le for-each.",
          },
          {
            label: "Bonne pratique",
            value: "Préférez le for-each pour parcourir, et les switch expressions aux longues chaînes de `if`/`else` quand on choisit une valeur selon un cas.",
          },
        ],
      },
    ],
  },
  {
    id: "chaines-de-caracteres",
    title: "Chaînes de caractères : `String`",
    level: 3,
    intro:
      "`String` est la classe la plus utilisée de Java — et la plus piégeuse pour les débutants.",
    blocks: [
      {
        kind: "text",
        text: "`String` est une séquence de caractères immuable : chaque « modification » crée en réalité une nouvelle chaîne.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Pourquoi l'immuabilité",
            value: "Une chaîne partagée ne peut pas être corrompue par surprise : sûreté dans les threads, clés de `HashMap` fiables, sécurité. Le prix : concaténer en boucle avec `+` crée des objets intermédiaires — d'où `StringBuilder` pour construire.",
          },
          {
            label: "Quand",
            value: "Partout : messages, noms, identifiants, SQL, JSON. C'est le type le plus manipulé après `int`.",
          },
          {
            label: "Comment",
            value: "`\"Ada\"`, méthodes `length()`, `substring()`, `equals()`, `split()`, `trim()`, `toLowerCase()`… Depuis Java 15, les text blocks `\"\"\"…\"\"\"` écrivent les chaînes multilignes proprement.",
          },
        ],
      },
      {
        kind: "code",
        language: "java",
        title: "`==` vs `equals`, et les text blocks",
        code: "String a = \"bonjour\";\nString b = \"bonjour\";\nString c = new String(\"bonjour\");\n\na == b;          // true  (même objet du pool de chaînes — ne pas s'y fier)\na == c;          // false (objets différents, contenu identique !)\na.equals(c);     // true  : TOUJOURS comparer le contenu avec equals()\n\n// Text block (Java 15+) : HTML, SQL, JSON lisibles\nString html = \"\"\"\n                <p>Bonjour</p>\n                \"\"\";",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value: "Comparer des chaînes avec `==` : ça compare les références (les adresses), pas le contenu. Deux chaînes identiques peuvent être `!=` en `==`. Règle absolue : `equals()` pour le contenu.",
          },
          {
            label: "Bonne pratique",
            value: "Concaténation en boucle → `StringBuilder`. Comparaison → `equals()`. Chaîne multiligne → text block. Chaîne vide → `isEmpty()` ou `isBlank()` (Java 11+, ignore les espaces).",
          },
          {
            label: "Concepts liés",
            value: "`StringBuilder` (mutable, non thread-safe) et `StringBuffer` (thread-safe, historique) ; expressions régulières via `Pattern`/`Matcher`.",
          },
        ],
      },
    ],
  },
  {
    id: "tableaux",
    title: "Tableaux",
    level: 3,
    intro:
      "La structure de données la plus simple : une séquence de taille fixe.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "Déclarer, remplir, parcourir",
        code: "int[] notes = {12, 15, 9};          // taille fixée à 3\nString[] noms = new String[10];     // 10 cases, initialisées à null\n\nnotes[0] = 14;                      // accès par index (0-based)\nint n = notes.length;               // 3 — attribut, pas méthode !\n\nfor (int note : notes) { /* for-each */ }\njava.util.Arrays.sort(notes);       // utilitaires : sort, toString…\nSystem.out.println(java.util.Arrays.toString(notes)); // [9, 12, 14]",
      },
      {
        kind: "text",
        text: "Un tableau est un conteneur de taille fixée à la création, d'accès direct par index.",
      },
      {
        kind: "text",
        text: "Taille connue et stable : jours de la semaine, arguments `main`, tampons. Dès que la taille varie, passez à `ArrayList` (voir Collections).",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Erreur fréquente",
            value: "`ArrayIndexOutOfBoundsException` : `notes[3]` sur un tableau de 3 cases. L'index max est toujours `length - 1`.",
          },
          {
            label: "Bonne pratique",
            value: "Ne réinventez pas la roue : `java.util.Arrays` fournit tri, recherche binaire, comparaison et affichage.",
          },
        ],
      },
    ],
  },
  {
    id: "poo-classes-objets",
    title: "POO : classes et objets",
    level: 3,
    intro:
      "Le cœur de Java : modéliser le monde en objets qui portent leurs données et leurs comportements.",
    blocks: [
      {
        kind: "text",
        text: "Une classe est un moule (définition), un objet est une instance de ce moule (une réalisation concrète en mémoire).",
      },
      {
        kind: "text",
        text: "Regrouper données et traitements qui vont ensemble rend le code découpable, testable et réutilisable : un `CompteBancaire` sait créditer, débiter et connaît son solde — personne d'autre n'y touche directement.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value: "Dès qu'une donnée a un comportement associé : compte, utilisateur, commande, capteur. Les classes structurent tout programme Java au-delà du script.",
          },
          {
            label: "Comment",
            value: "Champs (état), constructeur (initialisation), méthodes (comportements). `new` crée l'objet ; `this` désigne l'objet courant.",
          },
        ],
      },
      {
        kind: "code",
        language: "java",
        title: "CompteBancaire.java — une classe complète",
        code: "public class CompteBancaire {\n    private double solde;               // état interne, caché\n\n    public CompteBancaire(double soldeInitial) {  // constructeur\n        this.solde = soldeInitial;        // this = l'objet créé\n    }\n\n    public void crediter(double montant) {\n        solde += montant;\n    }\n\n    public boolean debiter(double montant) {\n        if (montant > solde) return false;\n        solde -= montant;\n        return true;\n    }\n\n    public double getSolde() {\n        return solde;\n    }\n}",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Exemple réel",
            value: "`CompteBancaire c = new CompteBancaire(100); c.debiter(30);` : l'objet garde son invariant (jamais de solde négatif via `debiter`), la logique métier vit avec les données.",
          },
          {
            label: "Erreur fréquente",
            value: "`NullPointerException` : déclarer `CompteBancaire c;` sans `new`, puis appeler `c.getSolde()`. Déclarer ne crée rien — seul `new` fabrique l'objet.",
          },
          {
            label: "Bonne pratique",
            value: "Un constructeur doit laisser l'objet dans un état valide ; refusez les valeurs absurdes tôt (`if (soldeInitial < 0) throw new IllegalArgumentException(...)`).",
          },
          {
            label: "Concepts liés",
            value: "Encapsulation (section suivante), `static` (membres de classe), surcharge de méthodes.",
          },
        ],
      },
    ],
  },
  {
    id: "poo-encapsulation",
    title: "POO : encapsulation et visibilité",
    level: 3,
    intro:
      "Cacher l'intérieur, exposer l'essentiel : le principe qui rend les gros programmes maintenables.",
    blocks: [
      {
        kind: "table",
        headers: ["Modificateur", "Visible depuis", "Usage typique"],
        rows: [
          ["`private`", "La classe elle-même", "Champs internes : l'état que personne ne doit tripoter."],
          ["(défaut, « package »)", "Le package", "Classes utilitaires internes à un module."],
          ["`protected`", "Package + sous-classes", "Membres destinés à être étendus par héritage."],
          ["`public`", "Partout", "L'API de la classe : ce à quoi les autres ont le droit de se fier."],
        ],
      },
      {
        kind: "code",
        language: "java",
        title: "Getters/setters : l'accès contrôlé",
        code: "public class Utilisateur {\n    private String email;   // privé : lecture/écriture contrôlées\n\n    public String getEmail() {\n        return email;\n    }\n\n    public void setEmail(String email) {\n        if (email == null || !email.contains(\"@\")) {\n            throw new IllegalArgumentException(\"Email invalide\");\n        }\n        this.email = email;\n    }\n}",
      },
      {
        kind: "text",
        text: "L'encapsulation consiste à rendre les champs `private` et à n'exposer que des méthodes : l'objet contrôle ses propres règles.",
      },
      {
        kind: "text",
        text: "Si `solde` est public, n'importe quel code peut le mettre à `-1000`. Privé + méthodes, l'objet garantit ses invariants — et vous pouvez changer l'implémentation interne sans casser les utilisateurs de la classe.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Bonne pratique",
            value: "Champs `private` par défaut ; n'ouvrez (`public`) que ce qui est nécessaire. Un setter qui valide vaut mieux qu'un champ public.",
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
      "Factoriser le commun, spécialiser le particulier : `extends` crée une relation « est-un ».",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "`extends`, `super` et `@Override`",
        code: "public class Animal {\n    protected String nom;\n    public Animal(String nom) { this.nom = nom; }\n    public void parler() { System.out.println(\"…\"); }\n}\n\npublic class Chien extends Animal {   // Chien EST UN Animal\n    public Chien(String nom) {\n        super(nom);                   // appelle le constructeur parent\n    }\n    @Override\n    public void parler() {            // redéfinition\n        System.out.println(nom + \" aboie : Ouaf !\");\n    }\n}",
      },
      {
        kind: "text",
        text: "L'héritage permet à une classe de réutiliser (et spécialiser) les champs et méthodes d'une classe parente.",
      },
      {
        kind: "text",
        text: "Éviter la duplication : le comportement commun vit dans `Animal`, chaque espèce ne définit que sa différence.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value: "Relation « est-un » véritable et stable : `Chien` est un `Animal`. Si la relation est « a-un » (`Voiture` a un `Moteur`), préférez la composition (un champ) à l'héritage.",
          },
          {
            label: "Erreur fréquente",
            value: "L'héritage abusé : des hiérarchies profondes (`A extends B extends C extends D`) deviennent rigides — changer le parent casse tous les enfants. Préférez composition + interfaces quand le lien n'est pas un vrai « est-un ».",
          },
          {
            label: "Bonne pratique",
            value: "Toujours annoter les redéfinitions avec `@Override` : le compilateur vérifie alors que vous redéfinissez bien une méthode existante (faute de frappe détectée au lieu d'une méthode fantôme).",
          },
        ],
      },
    ],
  },
  {
    id: "poo-polymorphisme",
    title: "POO : polymorphisme",
    level: 3,
    intro:
      "La magie de l'héritage : manipuler des objets par leur type général, exécuter leur comportement spécifique.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "Un seul type, plusieurs comportements",
        code: "Animal a1 = new Chien(\"Rex\");\nAnimal a2 = new Chat(\"Mimi\");\na1.parler();  // « Rex aboie : Ouaf ! »\na2.parler();  // « Mimi miaule : Miaou ! »\n\n// La méthode appelée est choisie à l'EXÉCUTION selon l'objet réel\nList<Animal> animaux = List.of(a1, a2);\nfor (Animal a : animaux) {\n    a.parler();   // chaque animal parle à sa façon\n}",
      },
      {
        kind: "text",
        text: "Le polymorphisme : une variable de type parent peut référencer n'importe quel enfant, et c'est la version la plus spécifique de la méthode qui s'exécute.",
      },
      {
        kind: "text",
        text: "Écrire du code générique : une méthode `faireParler(List<Animal>)` fonctionne pour tous les animaux présents et futurs, sans modification quand on ajoute `Perroquet`.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Comment ça fonctionne",
            value: "Liaison dynamique : la JVM regarde le type réel de l'objet à l'exécution, pas le type déclaré de la variable. (Seules les méthodes `static`, `private` et `final` échappent à cette règle.)",
          },
          {
            label: "Bonne pratique",
            value: "Testez le type avec `instanceof` et son pattern matching (Java 16+) : `if (a instanceof Chien c) { c.aboyer(); }` — plus de cast manuel.",
          },
          {
            label: "Concepts liés",
            value: "Interfaces (contrats sans implémentation), classes abstraites, surcharge vs redéfinition.",
          },
        ],
      },
    ],
  },
  {
    id: "poo-interfaces",
    title: "POO : interfaces",
    level: 3,
    intro:
      "Définir un contrat sans imposer d'ancêtre : le mécanisme le plus utilisé de Java moderne.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "Un contrat, plusieurs implémentations",
        code: "public interface MoyenPaiement {\n    void payer(double montant);          // contrat : pas de code\n    default String devise() { return \"EUR\"; }  // méthode par défaut (Java 8+)\n}\n\npublic class CarteBancaire implements MoyenPaiement {\n    @Override\n    public void payer(double montant) { /* débit carte */ }\n}\n\npublic class Paypal implements MoyenPaiement {\n    @Override\n    public void payer(double montant) { /* appel API */ }\n}",
      },
      {
        kind: "text",
        text: "Une interface déclare des comportements (`payer`) sans les implémenter ; chaque classe choisit comment les réaliser.",
      },
      {
        kind: "text",
        text: "Découpler : le code client manipule `MoyenPaiement`, pas `CarteBancaire`. Ajouter `Virement` ne change rien au code existant — c'est le fondement des API et des frameworks Java.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value: "Pour exprimer une capacité (« peut payer », « est comparable », « est sérialisable ») plutôt qu'une nature. Une classe peut implémenter plusieurs interfaces, mais n'hériter que d'une classe.",
          },
          {
            label: "Comment",
            value: "`interface` + `implements`. Les méthodes `default` (Java 8+) permettent d'enrichir une interface sans casser les implémentations existantes.",
          },
          {
            label: "Erreur fréquente",
            value: "Confondre avec l'héritage : on n'`extends` pas une interface (sauf interface qui étend une interface). Et une interface ne porte pas d'état — pas de champs d'instance.",
          },
          {
            label: "Concepts liés",
            value: "Interfaces fonctionnelles (lambdas), `Comparable`/`Comparator`, injection de dépendances.",
          },
        ],
      },
    ],
  },
  {
    id: "classes-abstraites",
    title: "Classes abstraites vs interfaces",
    level: 3,
    intro:
      "Deux façons de dire « à compléter » : savoir choisir est un marqueur de maturité en Java.",
    blocks: [
      {
        kind: "table",
        headers: ["Aspect", "Classe abstraite", "Interface"],
        rows: [
          ["État", "Peut avoir des champs et un constructeur", "Pas d'état (que des constantes)"],
          ["Héritage", "Une seule classe parente possible", "Implémentations multiples possibles"],
          ["Méthodes", "Abstraites et concrètes mélangées", "Abstraites + `default`/`static` (Java 8+)"],
          ["Idée", "« Ce que tu es » (nature partagée)", "« Ce que tu sais faire » (capacité)"],
        ],
      },
      {
        kind: "code",
        language: "java",
        title: "Classe abstraite : squelette partagé",
        code: "public abstract class Forme {\n    public abstract double aire();       // à définir par chaque forme\n    public void afficher() {            // comportement commun fourni\n        System.out.println(\"Aire = \" + aire());\n    }\n}\npublic class Cercle extends Forme {\n    private double rayon;\n    public Cercle(double rayon) { this.rayon = rayon; }\n    @Override public double aire() { return Math.PI * rayon * rayon; }\n}",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Quand utiliser une classe abstraite",
            value: "Quand les sous-classes partagent vraiment du code et un état (`Forme` et sa méthode `afficher`), et qu'elles forment une famille (« est-un »).",
          },
          {
            label: "Quand utiliser une interface",
            value: "Quand des classes sans lien peuvent partager une capacité (`Comparable`, `MoyenPaiement`), ou quand plusieurs contrats doivent coexister.",
          },
          {
            label: "Bonne pratique",
            value: "En cas de doute, commencez par une interface : elle n'impose rien et se combine librement. Passez à la classe abstraite quand du code commun émerge vraiment.",
          },
        ],
      },
    ],
  },
  {
    id: "static-final",
    title: "`static` et `final`",
    level: 3,
    intro:
      "Deux mots-clés qui changent le sens d'une déclaration : appartenance à la classe, et interdiction de changer.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "Membres de classe vs membres d'instance",
        code: "public class Config {\n    public static final String APP_NOM = \"MaSuperApp\"; // constante\n    public static int compteur = 0;                    // partagé\n\n    public static double tva(double ht) {              // utilitaire\n        return ht * 1.20;\n    }\n}\n\nConfig.APP_NOM;      // accès sans new : membre de la CLASSE\nConfig.tva(100);     // 120.0",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "`static`",
            value: "Le membre appartient à la classe, pas aux objets : une seule copie partagée. Méthodes utilitaires (`Math.max`), constantes, compteurs globaux.",
          },
          {
            label: "`final`",
            value: "Selon le contexte : variable non réassignable, méthode non redéfinissable, classe non héritable (`String` est `final`).",
          },
          {
            label: "Constantes",
            value: "`public static final` + `UPPER_SNAKE_CASE` : la convention des constantes (`Math.PI`).",
          },
          {
            label: "Erreur fréquente",
            value: "« non-static method cannot be referenced from a static context » : depuis `main` (qui est `static`), on ne peut pas appeler directement une méthode d'instance — il faut d'abord créer l'objet avec `new`.",
          },
          {
            label: "Bonne pratique",
            value: "`final` sur les champs qui ne changent pas après le constructeur : l'immutabilité commence là.",
          },
        ],
      },
    ],
  },
  {
    id: "generiques",
    title: "Génériques : `List<String>`, `Box<T>`",
    level: 3,
    intro:
      "Écrire du code qui marche pour n'importe quel type, sans perdre la sécurité du typage.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "Avant (dangereux) / après (sûr)",
        code: "// Sans génériques : tout est Object, casts partout\nList noms = new ArrayList();\nnoms.add(\"Ada\");\nString s = (String) noms.get(0);  // cast manuel, risque à l'exécution\n\n// Avec génériques : le compilateur vérifie\nList<String> prenoms = new ArrayList<>();\nprenoms.add(\"Ada\");\n// prenoms.add(42);   // REFUSÉ à la compilation\nString p = prenoms.get(0);        // pas de cast",
      },
      {
        kind: "text",
        text: "Les génériques paramètrent classes et méthodes par un type (`<T>`) : un seul code, typé pour chaque usage.",
      },
      {
        kind: "text",
        text: "Détecter les erreurs de type à la compilation plutôt qu'au runtime : mettre un `Integer` dans une `List<String>` devient impossible, pas juste « à éviter ».",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Comment ça fonctionne",
            value: "Par effacement (type erasure) : le compilateur vérifie les types puis les efface — à l'exécution, `List<String>` et `List<Integer>` sont la même classe. Conséquence : pas de `new T[]`, pas de `instanceof T`.",
          },
          {
            label: "Wildcards",
            value: "`List<? extends Animal>` : « une liste d'un certain sous-type d'Animal » — lecture seule sûre. `<? super Chien>` : écriture sûre. À découvrir quand le besoin se présente.",
          },
          {
            label: "Erreur fréquente",
            value: "Les raw types (`List` sans `<>`) : le compilateur émet un avertissement et toute la sécurité disparaît. Toujours paramétrer.",
          },
          {
            label: "Concepts liés",
            value: "Collections, `Optional<T>`, interfaces fonctionnelles (`Function<T,R>`).",
          },
        ],
      },
    ],
  },
  {
    id: "collections-list",
    title: "Collections : `List`",
    level: 3,
    intro:
      "La collection n°1 : une séquence ordonnée qui grandit toute seule.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "`ArrayList` au quotidien",
        code: "import java.util.ArrayList;\nimport java.util.List;\n\nList<String> todos = new ArrayList<>();\ntodos.add(\"Apprendre Java\");\ntodos.add(\"Écrire des tests\");\nString premier = todos.get(0);      // accès par index : O(1)\ntodos.remove(\"Écrire des tests\");\nfor (String t : todos) { /* parcours */ }",
      },
      {
        kind: "table",
        headers: ["", "`ArrayList`", "`LinkedList`"],
        rows: [
          ["Structure", "Tableau redimensionnable", "Chaîne de maillons"],
          ["`get(i)`", "O(1) — accès direct", "O(n) — parcours depuis un bout"],
          ["Insertion/suppression au milieu", "O(n) — décalage", "O(1) — si on a déjà le maillon"],
          ["En pratique", "Le choix par défaut, de loin", "Rare : files (`Queue`) ou insertions massives"],
        ],
      },
      {
        kind: "text",
        text: "Ordre significatif, accès par index, ajouts en fin : la grande majorité des cas. Pour une file d'attente, regardez `Queue`/`Deque`.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Bonne pratique",
            value: "Déclarez le type d'interface (`List<String> todos`), instanciez l'implémentation (`new ArrayList<>()`) : changer d'implémentation plus tard ne touche qu'une ligne.",
          },
          {
            label: "Concepts liés",
            value: "`Set`, `Map`, streams pour traiter les listes sans boucles explicites.",
          },
        ],
      },
    ],
  },
  {
    id: "collections-set-map",
    title: "Collections : `Set` et `Map`",
    level: 3,
    intro:
      "Deux structures pour deux besoins : l'unicité, et l'association clé → valeur.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "`HashSet` et `HashMap` en action",
        code: "import java.util.*;\n\nSet<String> tags = new HashSet<>();\ntags.add(\"java\"); tags.add(\"java\");   // doublon ignoré\ntags.size();                          // 1\n\nMap<String, Integer> stock = new HashMap<>();\nstock.put(\"clavier\", 12);\nstock.put(\"souris\", 30);\nint qte = stock.get(\"clavier\");       // 12\nstock.getOrDefault(\"écran\", 0);       // 0, sans exception",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "`Set` — en une phrase",
            value: "Une collection sans doublons : `add` d'un élément déjà présent ne fait rien (selon `equals`).",
          },
          {
            label: "`Map` — en une phrase",
            value: "Un dictionnaire clé → valeur : retrouver une valeur par sa clé en temps quasi constant.",
          },
          {
            label: "Quand utiliser quoi",
            value: "`List` : ordre et doublons OK. `Set` : unicité (tags, visiteurs uniques). `Map` : recherche par clé (utilisateurs par email, stock par produit, cache).",
          },
          {
            label: "Comment ça fonctionne",
            value: "`HashSet`/`HashMap` reposent sur le hash (`hashCode`) : accès moyen en O(1). D'où la règle d'or : si vous redéfinissez `equals`, redéfinissez `hashCode` de façon cohérente — sinon vos objets « disparaissent » des maps.",
          },
          {
            label: "Erreur fréquente",
            value: "Utiliser un objet mutable comme clé de `HashMap` puis le modifier : son hash change, la clé devient introuvable. Clés immuables (`String`, records) uniquement.",
          },
        ],
      },
    ],
  },
  {
    id: "streams",
    title: "Streams : traiter les collections sans boucles",
    level: 3,
    intro:
      "Décrire CE qu'on veut obtenir d'une collection, pas COMMENT l'itérer.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "Un pipeline stream typique",
        code: "import java.util.List;\n\nList<String> noms = List.of(\"ada\", \"grace\", \"alan\", \"katherine\");\n\nList<String> resultat = noms.stream()\n    .filter(n -> n.length() > 3)      // intermédiaire : garde\n    .map(String::toUpperCase)         // intermédiaire : transforme\n    .sorted()                         // intermédiaire : trie\n    .toList();                        // terminal : produit le résultat\n// [ALAN, GRACE, KATHERINE]",
      },
      {
        kind: "text",
        text: "Un stream est un pipeline d'opérations sur une séquence d'éléments : on enchaîne des transformations, une opération terminale déclenche le calcul.",
      },
      {
        kind: "text",
        text: "Lisibilité : `filter`/`map`/`sorted` disent l'intention, là où une boucle imbriquée dit la mécanique. Moins de variables temporaires, moins d'erreurs d'index.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Comment ça fonctionne",
            value: "Opérations intermédiaires paresseuses (rien ne s'exécute avant l'opération terminale) + opérations terminales (`toList`, `forEach`, `reduce`, `count`). Le stream ne modifie JAMAIS la source.",
          },
          {
            label: "Erreur fréquente",
            value: "Réutiliser un stream après son opération terminale : `IllegalStateException` — un stream se consomme une seule fois. Recréez-le avec `.stream()`.",
          },
          {
            label: "Bonne pratique",
            value: "`parallelStream()` n'est pas de la magie gratuite : réservé aux gros volumes CPU-bound sans état partagé ; pour le reste, le stream séquentiel est plus prévisible.",
          },
          {
            label: "Concepts liés",
            value: "Lambdas (section suivante), `Optional`, collecteurs (`Collectors.groupingBy`).",
          },
        ],
      },
    ],
  },
  {
    id: "lambdas",
    title: "Lambdas et interfaces fonctionnelles",
    level: 3,
    intro:
      "Passer du comportement en paramètre : la fonction comme valeur (depuis Java 8).",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "La syntaxe lambda, du verbeux au concis",
        code: "import java.util.*;\n\nList<String> noms = new ArrayList<>(List.of(\"ada\", \"grace\", \"alan\"));\n\n// Trier par longueur : une lambda remplace une classe anonyme\nnoms.sort((a, b) -> a.length() - b.length());\n\n// Référence de méthode : encore plus concis quand on appelle une méthode existante\nnoms.forEach(System.out::println);   // équivaut à n -> System.out.println(n)\nnoms.replaceAll(String::toUpperCase);",
      },
      {
        kind: "text",
        text: "Une lambda `(a, b) -> a.length() - b.length()` est une fonction anonyme concise, utilisable partout où une interface à une seule méthode est attendue.",
      },
      {
        kind: "text",
        text: "Avant Java 8, passer un comparateur exigeait une classe anonyme de 6 lignes. Les lambdas ont rendu les streams, les callbacks et les tests expressifs.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Interface fonctionnelle",
            value: "Une interface avec UNE seule méthode abstraite (`Comparator`, `Runnable`, `Predicate`, `Function`…) : c'est la « prise » dans laquelle la lambda se branche.",
          },
          {
            label: "Erreur fréquente",
            value: "« Variable used in lambda should be effectively final » : une lambda ne peut capturer qu'une variable locale non réassignée. Copiez-la dans une variable `final` si besoin.",
          },
          {
            label: "Bonne pratique",
            value: "Courte et lisible : si la lambda dépasse 3-4 lignes, extrayez une vraie méthode et utilisez une référence de méthode.",
          },
        ],
      },
    ],
  },
  {
    id: "optionals",
    title: "`Optional` : dire explicitement « peut-être absent »",
    level: 3,
    intro:
      "La réponse élégante de Java au `null` qui traîne : rendre l'absence visible dans le type.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "Chercher sans `null`",
        code: "import java.util.Optional;\n\npublic Optional<Utilisateur> trouverParEmail(String email) {\n    // ... recherche en base\n    return Optional.ofNullable(resultat); // présent ou vide, jamais null\n}\n\ntrouverParEmail(\"ada@exemple.com\")\n    .map(Utilisateur::getNom)          // transforme si présent\n    .ifPresent(nom -> System.out.println(\"Trouvé : \" + nom));\n\nString nom = trouverParEmail(\"x@y.z\").map(Utilisateur::getNom).orElse(\"Inconnu\");",
      },
      {
        kind: "text",
        text: "`Optional<T>` est un conteneur qui contient zéro ou une valeur : le type annonce que l'absence est un cas normal.",
      },
      {
        kind: "text",
        text: "Un `null` silencieux est ambigu : oubli ou absence légitime ? `Optional` force l'appelant à traiter les deux cas — les `NullPointerException` « surprise » diminuent mécaniquement.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value: "En valeur de retour des méthodes de recherche. JAMAIS en paramètre, en champ, ni dans les collections : `Optional` n'est pas fait pour ça.",
          },
          {
            label: "Erreur fréquente",
            value: "`.get()` sans vérification : ça re-crée exactement le `NullPointerException` qu'on voulait éviter (`NoSuchElementException`). Utilisez `orElse`, `orElseThrow`, `ifPresent`, `map`.",
          },
          {
            label: "Bonne pratique",
            value: "Ne retournez jamais `null` à la place d'un `Optional` vide, et ne faites pas `Optional.of(valeurQuiPeutEtreNulle)` — c'est `ofNullable`.",
          },
        ],
      },
    ],
  },
  {
    id: "exceptions-checked-unchecked",
    title: "Exceptions : checked vs unchecked",
    level: 3,
    intro:
      "La gestion d'erreurs explicite de Java : certaines exceptions DOIVENT être traitées, par contrat.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Checked", "Unchecked"],
        rows: [
          ["Hérite de", "`Exception` (hors `RuntimeException`)", "`RuntimeException` et `Error`"],
          ["Exemples", "`IOException`, `SQLException`", "`NullPointerException`, `IllegalArgumentException`"],
          ["Obligation", "Le compilateur EXIGE `try/catch` ou `throws`", "Aucune : peut traverser le code"],
          ["Philosophie", "« Ça peut arriver, prévois-le » (fichier absent, réseau coupé)", "« C'est un bug, corrige-le » (null, index invalide)"],
        ],
      },
      {
        kind: "code",
        language: "java",
        title: "`try`/`catch` et le try-with-resources",
        code: "import java.nio.file.*;\n\n// try-with-resources (Java 7+) : fermeture AUTOMATIQUE, même en cas d'exception\ntry (var lecteur = Files.newBufferedReader(Path.of(\"data.txt\"))) {\n    return lecteur.readLine();\n} catch (NoSuchFileException e) {\n    System.err.println(\"Fichier introuvable : \" + e.getFile());\n    return null;\n} catch (java.io.IOException e) {\n    throw new IllegalStateException(\"Lecture impossible\", e); // on emballe\n}",
      },
      {
        kind: "text",
        text: "Les exceptions checked signalent des aléas prévisibles que l'appelant doit traiter ; les unchecked signalent des bugs de programmation.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Pourquoi cette distinction",
            value: "Obliger à traiter les aléas I/O et réseau évite les programmes qui « oublient » que le monde réel échoue. Les bugs, eux, ne se « traitent » pas : ils se corrigent.",
          },
          {
            label: "Erreur fréquente",
            value: "Le `catch` vide qui avale l'exception : le programme continue avec des données invalides et le vrai problème devient introuvable. Au minimum, logguez.",
          },
          {
            label: "Bonne pratique",
            value: "Try-with-resources pour tout ce qui se ferme (fichiers, connexions, scanners). Ne jamais utiliser les exceptions pour le contrôle de flux normal. Préservez la cause d'origine quand vous ré-emballez (`new X(message, e)`).",
          },
          {
            label: "Concepts liés",
            value: "`throws` dans la signature, hiérarchie `Throwable`, `finally` (rarement nécessaire depuis le try-with-resources).",
          },
        ],
      },
    ],
  },
  {
    id: "records",
    title: "Records : des classes de données en une ligne",
    level: 3,
    intro:
      "Fini les classes « conteneurs » de 40 lignes pour transporter trois valeurs (depuis Java 16).",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "Un record remplace une classe de données complète",
        code: "public record Point(int x, int y) {}\n\n// Généré automatiquement :\n// - constructeur Point(int x, int y)\n// - accesseurs x(), y()\n// - equals(), hashCode(), toString() cohérents\n\nPoint p = new Point(3, 4);\np.x();            // 3\np.equals(new Point(3, 4));  // true",
      },
      {
        kind: "text",
        text: "Un record est une classe immuable qui modélise des données simples : le compilateur génère constructeur, accesseurs et `equals`/`hashCode`/`toString`.",
      },
      {
        kind: "text",
        text: "Les DTO (objets de transfert), résultats de requêtes et clés composites représentaient des centaines de lignes de boilerplate ennuyeux et propice aux oublis (`hashCode` oublié = bug de `HashMap`).",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quand",
            value: "Transporter des données : réponses d'API, lignes de CSV, coordonnées, paires clé-valeur. PAS quand l'objet a un comportement riche ou un état mutable.",
          },
          {
            label: "Erreur fréquente",
            value: "Vouloir des setters : un record est immuable par design. Besoin de mutation → classe classique.",
          },
          {
            label: "Bonne pratique",
            value: "Validation dans le constructeur compact : `public Point { if (x < 0) throw new IllegalArgumentException(...); }`.",
          },
        ],
      },
    ],
  },
  {
    id: "enums",
    title: "Énumérations : `enum`",
    level: 3,
    intro:
      "Un ensemble fini de valeurs nommées, avec la sécurité du typage en prime.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "Bien plus que des constantes",
        code: "public enum Jour {\n    LUNDI(false), MARDI(false), MERCREDI(false),\n    JEUDI(false), VENDREDI(false), SAMEDI(true), DIMANCHE(true);\n\n    private final boolean weekend;\n    Jour(boolean weekend) { this.weekend = weekend; }\n    public boolean estWeekend() { return weekend; }\n}\n\nJour j = Jour.SAMEDI;\nj.estWeekend();  // true",
      },
      {
        kind: "text",
        text: "Un `enum` définit un type dont les seules valeurs possibles sont listées : le compilateur refuse tout le reste.",
      },
      {
        kind: "text",
        text: "Remplace les constantes `int` magiques (`static final int LUNDI = 1`) où rien n'empêchait de passer `42`. Avec un enum, `switch` exhaustif + typage = erreurs impossibles.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Bonne pratique",
            value: "Les enums Java sont des classes : champs, constructeur privé, méthodes — utilisez-les pour attacher du comportement aux valeurs au lieu de `switch` dispersés.",
          },
        ],
      },
    ],
  },
  {
    id: "fichiers-nio",
    title: "Fichiers avec `java.nio.file`",
    level: 3,
    intro:
      "Lire et écrire des fichiers avec l'API moderne : `Path`, `Files`, et rien d'autre.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "L'essentiel de la gestion de fichiers",
        code: "import java.nio.file.*;\nimport java.nio.charset.StandardCharsets;\nimport java.util.List;\n\nPath chemin = Path.of(\"notes.txt\");\n\n// Écrire (crée ou écrase)\nFiles.writeString(chemin, \"Bonjour\\n\", StandardCharsets.UTF_8);\n\n// Lire\nString contenu = Files.readString(chemin, StandardCharsets.UTF_8);\nList<String> lignes = Files.readAllLines(chemin, StandardCharsets.UTF_8);\n\n// Lister un dossier\ntry (var flux = Files.list(Path.of(\".\"))) {\n    flux.forEach(System.out::println);\n}",
      },
      {
        kind: "text",
        text: "`java.nio.file` (Java 7+) est l'API moderne : `Path` désigne un chemin, `Files` fournit les opérations.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Pourquoi pas l'ancien `java.io.File`",
            value: "L'ancienne API signale les erreurs en retournant `false` ou `null` (silencieux !) ; `Files` lève des exceptions précises (`NoSuchFileException`, `AccessDeniedException`).",
          },
          {
            label: "Erreur fréquente",
            value: "Oublier le charset : sans `StandardCharsets.UTF_8` explicite, c'est l'encodage par défaut de la plateforme qui s'applique — un fichier écrit sur Windows peut devenir illisible sur Linux. Toujours préciser.",
          },
          {
            label: "Bonne pratique",
            value: "Chemins relatifs = relatifs au dossier de lancement (piège classique en IDE). Gros fichiers → `Files.lines()` en stream plutôt que `readAllLines` en mémoire.",
          },
        ],
      },
    ],
  },
  {
    id: "dates-java-time",
    title: "Dates et heures : `java.time`",
    level: 3,
    intro:
      "L'API de dates moderne : immuable, claire, et sans les pièges historiques.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "`LocalDate`, `Instant`, `DateTimeFormatter`",
        code: "import java.time.*;\nimport java.time.format.DateTimeFormatter;\n\nLocalDate aujourdhui = LocalDate.now();          // 2026-09-28\nLocalDate noel = LocalDate.of(2026, 12, 25);\nPeriod jusquaNoel = Period.between(aujourdhui, noel);\n\nInstant moment = Instant.now();                 // timestamp UTC\nZonedDateTime paris = ZonedDateTime.now(ZoneId.of(\"Europe/Paris\"));\n\nString texte = noel.format(DateTimeFormatter.ofPattern(\"dd/MM/yyyy\"));",
      },
      {
        kind: "text",
        text: "`java.time` (Java 8+) modélise les dates comme des objets immuables distincts selon le besoin : date seule, date+heure, instant UTC.",
      },
      {
        kind: "text",
        text: "L'ancienne API (`java.util.Date`, `Calendar`) était mutable, confuse (mois indexés de 0 !) et non thread-safe. `java.time` corrige tout : janvier = `1`, objets immuables.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Quelle classe quand",
            value: "`LocalDate` : anniversaire. `LocalDateTime` : rendez-vous local. `ZonedDateTime` : événement mondial avec fuseau. `Instant` : horodatage machine, logs, mesures.",
          },
          {
            label: "Erreur fréquente",
            value: "Mélanger ancien et nouveau : croiser du vieux code `Date` avec `java.time` sans conversion explicite (`date.toInstant()`). Dans le code neuf, n'utilisez que `java.time`.",
          },
        ],
      },
    ],
  },
  {
    id: "threads-bases",
    title: "Threads : les bases de la concurrence",
    level: 3,
    intro:
      "Exécuter du code en parallèle : puissant, mais l'état partagé est un champ de mines.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "Un thread, puis la bonne façon (`ExecutorService`)",
        code: "// Version manuelle : à connaître, à éviter en production\nThread t = new Thread(() -> System.out.println(\"Bonjour du thread\"));\nt.start();\n\n// Version pro : un pool géré qui réutilise les threads\nimport java.util.concurrent.*;\ntry (ExecutorService pool = Executors.newFixedThreadPool(4)) {\n    pool.submit(() -> traiter(fichier1));\n    pool.submit(() -> traiter(fichier2));\n} // fermeture = attente de la fin des tâches",
      },
      {
        kind: "text",
        text: "Un thread exécute du code en parallèle du programme principal ; un `ExecutorService` gère un pool de threads réutilisables.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Pourquoi un pool",
            value: "Créer un thread coûte cher : le pool recycle N threads au lieu d'en créer un par tâche. Et le try-with-resources attend proprement la fin.",
          },
          {
            label: "Le vrai danger",
            value: "Deux threads qui modifient la même variable sans coordination = résultats imprévisibles (race conditions). Règles : préférez l'immutabilité, les collections concurrentes (`ConcurrentHashMap`) et, si besoin, `synchronized` — avec parcimonie.",
          },
          {
            label: "Notion : virtual threads (Java 21)",
            value: "Des threads ultra-légers gérés par la JVM : on peut en créer des millions pour du code bloquant (I/O) sans pool complexe. `Thread.ofVirtual().start(...)`.",
          },
          {
            label: "Bonne pratique",
            value: "Ne créez jamais de `Thread` brut en production : `ExecutorService` (ou virtual threads) + tâches sans état partagé mutable.",
          },
        ],
      },
    ],
  },
  {
    id: "jvm-bytecode-jit",
    title: "JVM, bytecode et JIT : ce qui se passe vraiment",
    level: 3,
    intro:
      "Comprendre la machine sous le code : chargement, vérification, compilation à chaud, ramasse-miettes.",
    blocks: [
      {
        kind: "diagram",
        title: "De `java MaClasse` au code natif",
        lines: [
          "java com.exemple.app.Main",
          "     │",
          "     ▼",
          "Class Loader — charge les .class nécessaires (paresseusement)",
          "     │",
          "     ▼",
          "Vérificateur de bytecode — contrôle la validité (pas de",
          "     │                     contournement du typage possible)",
          "     ▼",
          "Interpréteur — exécute le bytecode (démarrage rapide)",
          "     │   + en parallèle :",
          "     ▼",
          "Compilateur JIT — recompile en code natif les méthodes",
          "     │              « chaudes » (souvent exécutées), optimisé",
          "     ▼",
          "GC (ramasse-miettes) — libère les objets inaccessibles (G1 par défaut)",
        ],
      },
      {
        kind: "text",
        text: "La JVM interprète d'abord, puis le JIT compile à chaud les portions critiques en code natif : lent au démarrage, très rapide en régime établi.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Pourquoi c'est important",
            value: "Ça explique les comportements : un benchmark Java doit « chauffer » la JVM avant de mesurer ; la mémoire se règle (`-Xmx`) ; et « write once, run anywhere » tient parce que le bytecode ne dépend d'aucun CPU.",
          },
          {
            label: "Le ramasse-miettes",
            value: "G1 (par défaut depuis Java 9) convient à la plupart des cas ; ZGC et Shenandoah visent les pauses ultra-courtes. En pratique : ne réglez le GC que si les mesures montrent un problème.",
          },
          {
            label: "Erreur fréquente",
            value: "`ClassNotFoundException` / `NoClassDefFoundError` : la JVM ne trouve pas une classe — dans 90 % des cas, un classpath (`-cp`) incomplet ou un `.jar` oublié, pas un bug de code.",
          },
          {
            label: "Concepts liés",
            value: "`-Xmx`/`-Xms` (taille du tas), `jconsole`/`jvisualvm` (observation), `OutOfMemoryError` (fuite ou tas trop petit).",
          },
        ],
      },
    ],
  },
  {
    id: "maven-vs-gradle",
    title: "Maven vs Gradle : les deux outils de build",
    level: 3,
    intro:
      "Au-delà de quelques fichiers, on ne compile plus à la main : un outil de build gère dépendances, compilation, tests et packaging.",
    blocks: [
      {
        kind: "text",
        text: "Maven et Gradle font le même métier : décrire le projet (dépendances, version de Java), compiler, tester, packager — de façon reproductible sur toutes les machines et en CI. Tous deux téléchargent leurs dépendances depuis Maven Central. Le choix se fait selon le contexte d'équipe, pas sur un critère absolu.",
      },
      {
        kind: "table",
        headers: ["Aspect", "Maven", "Gradle"],
        rows: [
          ["Fichier de build", "`pom.xml`", "`build.gradle` ou `build.gradle.kts`"],
          ["Langage de configuration", "XML déclaratif", "DSL Groovy ou Kotlin"],
          ["Philosophie", "Convention over configuration : cycle de vie fixe (`validate` → `compile` → `test` → `package`)", "Modèle de tâches programmable et composable"],
          ["Build incrémental", "Recompile par phase, simplement", "Daemon + cache de build : évite de refaire ce qui n'a pas changé"],
          ["Wrapper", "`mvnw` (Maven Wrapper, à ajouter)", "`gradlew` (Gradle Wrapper, intégré) — garantit la même version partout"],
          ["Courbe d'apprentissage", "Verbeux mais prévisible : on trouve vite où tout se passe", "Concis mais il faut comprendre le modèle de tâches"],
        ],
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Comment choisir, factuellement",
            value: "Équipe/projet existant : on prend celui en place. Nouveau projet : Maven pour la standardisation maximale (tout le monde sait lire un `pom.xml`), Gradle quand le build devient complexe ou que la vitesse de build incrémental compte (gros projets, Android).",
          },
          {
            label: "Point commun essentiel",
            value: "Les deux lisent les mêmes dépôts (Maven Central) et produisent les mêmes artefacts (`.jar`). Apprendre l'un rend l'autre facile : les concepts (dépendances, scopes, cycle de vie) sont partagés.",
          },
        ],
      },
    ],
  },
  {
    id: "build-maven",
    title: "Compiler et tester avec Maven",
    level: 3,
    intro:
      "Le cycle de vie Maven en quatre commandes : c'est 95 % de l'usage quotidien.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier l'installation de Maven",
        command: "mvn -v",
        why: "Affiche la version de Maven ET la version de Java qu'il utilise — un diagnostic précieux quand le build se comporte bizarrement (mauvaise `JAVA_HOME`, par exemple).",
        verify: "Le terminal affiche `Apache Maven 3.x` suivi de la version Java.",
      },
      {
        kind: "command",
        label: "Compiler les sources du projet",
        command: "mvn compile",
        why: "Compile `src/main/java` vers `target/classes` selon la phase `compile` du cycle de vie. Échoue avec les erreurs de `javac` si le code est invalide.",
        verify: "Le dossier `target/classes` contient les `.class` générés.",
      },
      {
        kind: "command",
        label: "Lancer les tests",
        command: "mvn test",
        why: "Compile puis exécute les tests de `src/test/java` (JUnit par défaut via le plugin Surefire) et affiche le résumé : `Tests run: 12, Failures: 0`.",
        verify: "Résumé des tests affiché, `BUILD SUCCESS` en fin de sortie.",
      },
      {
        kind: "command",
        label: "Packager l'application en `.jar`",
        command: "mvn package",
        why: "Exécute tout le cycle jusqu'à `package` : compile, teste, puis crée `target/mon-projet-1.0.jar`. Si un test échoue, le packaging s'arrête — le `.jar` ne contient que du code testé.",
        verify: "Le fichier `.jar` apparaît dans `target/`.",
      },
      {
        kind: "code",
        language: "xml",
        title: "pom.xml minimal (le descripteur du projet)",
        code: "<project>\n    <modelVersion>4.0.0</modelVersion>\n    <groupId>com.exemple</groupId>\n    <artifactId>ma-super-app</artifactId>\n    <version>1.0</version>\n    <properties>\n        <maven.compiler.release>21</maven.compiler.release>\n    </properties>\n</project>",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Coordonnées Maven",
            value: "`groupId:artifactId:version` identifie tout artefact mondialement — c'est aussi le format pour déclarer une dépendance (section suivante).",
          },
          {
            label: "`maven.compiler.release`",
            value: "La version de Java ciblée : le compilateur refuse les API et syntaxes plus récentes. Toujours la déclarer explicitement.",
          },
          {
            label: "Bonne pratique",
            value: "Ne commitez jamais `target/` (ajoutez-le au `.gitignore`) : c'est du généré, reconstructible à volonté avec `mvn package`.",
          },
        ],
      },
    ],
  },
  {
    id: "dependances",
    title: "Gérer les dépendances",
    level: 3,
    intro:
      "Ne réécrivez pas ce qui existe : déclarez des bibliothèques, Maven les télécharge.",
    blocks: [
      {
        kind: "code",
        language: "xml",
        title: "Ajouter JUnit comme dépendance de test",
        code: "<dependencies>\n    <dependency>\n        <groupId>org.junit.jupiter</groupId>\n        <artifactId>junit-jupiter</artifactId>\n        <version>5.11.0</version> <!-- ou la 5.x en cours : voir junit.org -->\n        <scope>test</scope>\n    </dependency>\n</dependencies>",
      },
      {
        kind: "text",
        text: "Une dépendance = des coordonnées `groupId:artifactId:version` + un scope ; Maven la télécharge depuis Maven Central et la met sur le classpath.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Les scopes",
            value: "`compile` (défaut : nécessaire partout), `test` (tests uniquement, non embarqué), `provided` (fourni par l'environnement, ex. API servlet), `runtime` (utile à l'exécution seulement).",
          },
          {
            label: "Dépendances transitives",
            value: "Maven résout aussi les dépendances DE vos dépendances, automatiquement. En cas de conflit de versions, la plus proche de votre projet gagne (« nearest wins »).",
          },
          {
            label: "Erreur fréquente",
            value: "Le conflit de versions silencieux : deux bibliothèques exigent deux versions d'une troisième, une seule est retenue, et une `NoSuchMethodError` apparaît à l'exécution. Diagnostic : `mvn dependency:tree`.",
          },
          {
            label: "Bonne pratique",
            value: "Épinglez les versions (jamais de `LATEST` en production) et préférez les versions stables aux snapshots (`-SNAPSHOT` = en développement).",
          },
        ],
      },
    ],
  },
  {
    id: "tests-junit",
    title: "Tester avec JUnit 5",
    level: 3,
    intro:
      "En Java, tester n'est pas une option : JUnit est le standard et Maven l'exécute tout seul.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "CalculatriceTest.java — un test complet",
        code: "import org.junit.jupiter.api.Test;\nimport org.junit.jupiter.api.BeforeEach;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass CalculatriceTest {\n\n    private Calculatrice calc;\n\n    @BeforeEach\n    void setUp() {\n        calc = new Calculatrice();  // exécuté avant CHAQUE test\n    }\n\n    @Test\n    void additionneDeuxNombres() {\n        assertEquals(5, calc.additionner(2, 3));\n    }\n\n    @Test\n    void divisionParZeroEchoueProprement() {\n        assertThrows(ArithmeticException.class,\n            () -> calc.diviser(1, 0));\n    }\n}",
      },
      {
        kind: "text",
        text: "JUnit 5 (Jupiter) : des méthodes annotées `@Test` qui vérifient le comportement via des assertions ; Maven les lance avec `mvn test`.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Les annotations essentielles",
            value: "`@Test` (un cas), `@BeforeEach` (préparation avant chaque test), `@AfterEach` (nettoyage), `@ParameterizedTest` (même test, plusieurs jeux de données).",
          },
          {
            label: "Les assertions essentielles",
            value: "`assertEquals` (attendu vs réel), `assertTrue`/`assertFalse`, `assertThrows` (l'exception attendue se produit), `assertNull`/`assertNotNull`.",
          },
          {
            label: "Bonne pratique",
            value: "Un test = un comportement, nommé explicitement (`divisionParZeroEchoueProprement`). Les tests vivent dans `src/test/java`, dans le même package que la classe testée. Visez les cas limites (zéro, vide, `null`) autant que le cas nominal.",
          },
          {
            label: "Concepts liés",
            value: "Mockito (simuler les dépendances), AssertJ (assertions fluides), couverture avec JaCoCo.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Déboguer comme un pro",
    level: 3,
    intro:
      "Le débogueur de l'IDE vaut mille `System.out.println` : apprenez-le tôt.",
    blocks: [
      {
        kind: "fields",
        title: "Les armes du débogueur",
        fields: [
          {
            label: "Breakpoint",
            value: "Un point d'arrêt : l'exécution se fige quand elle l'atteint. Conditionnel possible (« pause seulement si `i == 42` ») pour les boucles.",
          },
          {
            label: "Pas à pas",
            value: "Step over (ligne suivante, sans entrer dans les appels), step into (entrer dans la méthode appelée), step out (en sortir).",
          },
          {
            label: "Inspection",
            value: "Survolez une variable pour voir sa valeur ; la vue « Variables » montre tout l'état local ; « Evaluate » exécute une expression à la volée.",
          },
          {
            label: "Pile d'appels",
            value: "La vue « Frames » montre la chaîne d'appels menant au point d'arrêt : cliquez pour remonter et voir les variables de chaque niveau.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Méthode : reproduisez avec le cas minimal, formulez une hypothèse (« `liste` est vide ici »), vérifiez-la au breakpoint — ne changez pas le code au hasard.",
          "Un breakpoint sur exception (« exception breakpoint ») fige le programme à l'endroit exact où l'exception est levée, même sans stack trace claire.",
          "En production sans IDE : logs structurés + `jstack <pid>` (état des threads d'une JVM en cours) pour diagnostiquer à distance.",
          "`System.out.println` reste utile pour un contrôle rapide, mais ne le laissez jamais comme « débogage permanent » : c'est le rôle des logs.",
        ],
      },
    ],
  },
  {
    id: "packaging-jar",
    title: "Packager : le `.jar`",
    level: 3,
    intro:
      "Livrer son application : un `.jar` est une archive ZIP de classes + un manifeste.",
    blocks: [
      {
        kind: "command",
        label: "Créer un `.jar` exécutable avec Maven",
        command: "mvn package",
        why: "Le plugin `jar` de Maven assemble `target/classes` en `target/mon-projet-1.0.jar`. Par défaut, ce jar ne contient que VOS classes : pour un exécutable autonome incluant les dépendances (« fat/uber jar »), on ajoute le plugin Shade (`maven-shade-plugin`).",
        verify: "Le fichier `.jar` est créé dans `target/`.",
      },
      {
        kind: "command",
        label: "Exécuter un `.jar`",
        command: "java -jar target/mon-projet-1.0.jar",
        why: "La JVM lit le manifeste (`META-INF/MANIFEST.MF`) pour trouver la classe principale (`Main-Class`), puis démarre. Sans `Main-Class` dans le manifeste : « no main manifest attribute ».",
        verify: "L'application démarre comme avec `java MaClasse`.",
      },
      {
        kind: "command",
        label: "Inspecter le contenu d'un `.jar`",
        command: "jar tf target/mon-projet-1.0.jar",
        why: "`jar tf` liste les entrées de l'archive : vérifiez que vos classes et le manifeste y figurent. Utile pour diagnostiquer un jar incomplet.",
        verify: "La liste des `.class` et ressources s'affiche.",
      },
      {
        kind: "fields",
        fields: [
          {
            label: "Erreur fréquente",
            value: "« no main manifest attribute » : le jar a été construit sans déclarer la classe principale. Avec Maven, configurez le `maven-jar-plugin` (propriété `mainClass`) ou utilisez le plugin Shade.",
          },
          {
            label: "Bonne pratique",
            value: "Un livrable = un artefact versionné (`ma-super-app-1.0.jar`), construit par la CI, jamais à la main sur une machine de dev.",
          },
        ],
      },
    ],
  },
  {
    id: "ci-cd",
    title: "CI/CD : compiler et tester à chaque push",
    level: 3,
    intro:
      "L'intégration continue : chaque commit déclenche build + tests sur une machine propre.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/ci.yml — CI Java avec GitHub Actions",
        code: "name: CI\non: [push, pull_request]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-java@v4\n        with:\n          distribution: 'temurin'\n          java-version: '21'\n      - run: mvn -B package\n",
      },
      {
        kind: "text",
        text: "La CI rejoue `mvn package` sur un environnement neuf à chaque push : si ça casse, on le sait en minutes, pas en fin de projet.",
      },
      {
        kind: "text",
        text: "« Ça marchait sur ma machine » : la CI élimine les dépendances à l'environnement local (JDK oublié, fichier non commité). C'est aussi le garde-fou qui empêche de merger du code qui ne compile pas.",
      },
      {
        kind: "fields",
        fields: [          {
            label: "Les briques",
            value: "`actions/setup-java` installe le JDK (distribution et version choisies) ; `mvn -B package` lance le build en mode non interactif. Ajoutez ensuite analyse statique et déploiement.",
          },
          {
            label: "Bonne pratique",
            value: "La CI doit rester rapide (< 10 min) : cachez les dépendances Maven, ne lancez les tests lourds que sur la branche principale.",
          },
        ],
      },
    ],
  },
  {
    id: "modules-jpms",
    title: "Modules JPMS : notions",
    level: 3,
    intro:
      "Depuis Java 9, la plateforme elle-même est modulaire : survol du système de modules.",
    blocks: [
      {
        kind: "code",
        language: "java",
        title: "module-info.java — déclarer un module",
        code: "module com.exemple.app {\n    requires com.exemple.bibliotheque;  // dépendance explicite\n    exports com.exemple.app.api;        // packages visibles aux autres\n    // com.exemple.app.impl reste INVISIBLE de l'extérieur\n}",
      },
      {
        kind: "text",
        text: "JPMS découpe une application en modules qui déclarent ce qu'ils utilisent (`requires`) et ce qu'ils exposent (`exports`) : encapsulation à l'échelle de l'architecture.",
      },
      {
        kind: "text",
        text: "Le JDK lui-même devenait monolithique ; les modules permettent des runtimes sur mesure (`jlink` : une JVM minimale embarquant uniquement les modules nécessaires — utile pour les conteneurs).",
      },
      {
        kind: "fields",
        fields: [          {
            label: "En pratique",
            value: "La plupart des applications classiques s'en passent : Maven/Gradle gèrent déjà les dépendances au niveau artefact. À connaître pour comprendre `jlink`, les erreurs `module not found`, et l'architecture des gros systèmes.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes qui distinguent un code Java qui vieillit bien.",
    blocks: [
      {
        kind: "list",
        items: [
          "Conventions de nommage : classes en `PascalCase`, méthodes/variables en `camelCase`, constantes en `UPPER_SNAKE_CASE`, packages en minuscules.",
          "Immuabilité par défaut : champs `final`, records et collections non modifiables (`List.of`, `Map.of`) quand l'état ne doit pas changer.",
          "`equals` et `hashCode` toujours ensemble, cohérents ; `@Override` systématique sur les redéfinitions.",
          "Préférez les interfaces comme types déclarés (`List`, `Map`) et les classes comme implémentations.",
          "Ne retournez jamais `null` pour une collection : retournez une collection vide (`List.of()`).",
          "Remplacez les `System.out.println` de debug par un vrai logger (SLF4J + Logback) dès que le projet dépasse l'exercice.",
          "Documentez l'API publique avec la Javadoc (`/** … */`) : l'IDE l'affiche au survol.",
          "Une méthode = une responsabilité, courte ; un `if` imbriqué sur 4 niveaux est un appel à extraire une méthode.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Le bestiaire des exceptions et erreurs que tout développeur Java rencontre — et comment les apprivoiser.",
    blocks: [
      {
        kind: "fields",
        title: "Les 10 classiques",
        fields: [
          {
            label: "`NullPointerException`",
            value: "Pourquoi : appel de méthode ou accès champ sur une référence `null`. Mieux : initialiser à la création, valider les paramètres (`Objects.requireNonNull`), `Optional` en retour de recherche.",
          },
          {
            label: "`==` au lieu de `equals()`",
            value: "Pourquoi : `==` compare les références, pas le contenu — deux `String` identiques peuvent être `!=`. Mieux : toujours `equals()` pour les objets (et `Objects.equals(a, b)` si `null` possible).",
          },
          {
            label: "`ArrayIndexOutOfBoundsException`",
            value: "Pourquoi : index hors limites (`tableau[tableau.length]`). Mieux : boucle en `i < length`, ou for-each qui élimine le problème.",
          },
          {
            label: "`ClassCastException`",
            value: "Pourquoi : cast vers un type que l'objet n'a pas. Mieux : `instanceof` (avec pattern matching) avant de caster ; les génériques bien utilisés rendent les casts inutiles.",
          },
          {
            label: "`NumberFormatException`",
            value: "Pourquoi : `Integer.parseInt(\"abc\")` — l'entrée utilisateur n'est jamais fiable. Mieux : valider/essayer avec `try/catch` autour du parsing, message d'erreur clair.",
          },
          {
            label: "`ConcurrentModificationException`",
            value: "Pourquoi : modifier une collection pendant qu'on l'itère avec un for-each. Mieux : `removeIf`, itérer sur une copie, ou utiliser l'`Iterator` et sa méthode `remove()`.",
          },
          {
            label: "`StackOverflowError`",
            value: "Pourquoi : récursion sans cas de base (ou trop profonde). Mieux : toujours écrire le cas d'arrêt en premier ; pour de grandes profondeurs, préférez l'itération.",
          },
          {
            label: "`ClassNotFoundException` / `NoClassDefFoundError`",
            value: "Pourquoi : classe absente du classpath à l'exécution. Mieux : vérifier `-cp`, le `.jar` manquant, ou le conflit de versions (`mvn dependency:tree`).",
          },
          {
            label: "« non-static method cannot be referenced from a static context »",
            value: "Pourquoi : appeler une méthode d'instance depuis `main` sans objet. Mieux : créer l'objet (`new MaClasse().maMethode()`) ou rendre la méthode `static` si elle n'utilise aucun état d'instance.",
          },
          {
            label: "`ArithmeticException: / by zero`",
            value: "Pourquoi : division entière par zéro (en `double`, ça donne `Infinity`, pas d'exception — autre piège). Mieux : valider le diviseur avant de diviser.",
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
      "Quatre projets qui montent en puissance : chacun réutilise le précédent et introduit une vraie dimension professionnelle.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Jeu « Devine le nombre » (console)",
        fields: [
          {
            label: "Objectif",
            value: "Valider les fondamentaux : un programme complet, compilé et exécuté en ligne de commande.",
          },
          {
            label: "Prérequis",
            value: "Sections jusqu'aux tableaux.",
          },
          {
            label: "Ce que l'on construit",
            value: "Le programme tire un nombre aléatoire (`java.util.Random`), le joueur propose, indices « trop grand / trop petit », compteur d'essais, rejouer ou quitter.",
          },
          {
            label: "Concepts utilisés",
            value: "`Scanner` pour l'entrée clavier, boucles, conditions, méthodes, constantes.",
          },
          {
            label: "Difficulté",
            value: "Découverte : quelques heures.",
          },
          {
            label: "Ensuite",
            value: "Persister les meilleurs scores dans un fichier.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Carnet d'adresses (collections + fichiers)",
        fields: [
          {
            label: "Objectif",
            value: "Manipuler des objets, des collections et la persistance fichier.",
          },
          {
            label: "Prérequis",
            value: "POO, collections, `java.nio.file`.",
          },
          {
            label: "Ce que l'on construit",
            value: "Ajouter/lister/rechercher/supprimer des contacts (records `Contact`), sauvegarde en CSV via `Files`, recherche par nom avec streams, tests JUnit des opérations.",
          },
          {
            label: "Concepts utilisés",
            value: "Records, `List`/`Map`, streams, `Optional`, exceptions checked, tests unitaires.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire : un week-end.",
          },
          {
            label: "Ensuite",
            value: "Passer le projet sous Maven pour structurer et tester proprement.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — API REST (framework web)",
        fields: [
          {
            label: "Objectif",
            value: "Exposer des données en HTTP comme en entreprise, avec un framework.",
          },
          {
            label: "Prérequis",
            value: "Maven, tests, notions HTTP.",
          },
          {
            label: "Ce que l'on construit",
            value: "Une API de gestion de tâches (CRUD) avec un framework au choix — Spring Boot, Quarkus, Micronaut ou Javalin — persistance en fichier ou base embarquée, tests des endpoints, `jar` exécutable.",
          },
          {
            label: "Concepts utilisés",
            value: "Dépendances Maven, annotations du framework, sérialisation JSON (Jackson), codes HTTP, tests d'intégration.",
          },
          {
            label: "Difficulté",
            value: "Avancé : une à deux semaines.",
          },
          {
            label: "Ensuite",
            value: "Ajouter authentification et CI GitHub Actions.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Application complète (build, tests, CI)",
        fields: [
          {
            label: "Objectif",
            value: "Livrer comme une équipe pro : code, tests, packaging, intégration continue.",
          },
          {
            label: "Prérequis",
            value: "Tout le reste de cette page.",
          },
          {
            label: "Ce que l'on construit",
            value: "Reprendre le projet 3 (ou un gestionnaire de bibliothèque) : build Maven ou Gradle reproductible, suite de tests (unitaires + intégration), logs propres, CI qui compile/teste à chaque push, `.jar` versionné, README d'installation.",
          },
          {
            label: "Concepts utilisés",
            value: "Cycle de vie Maven/Gradle, JUnit + Mockito, logging, CI/CD, packaging, documentation.",
          },
          {
            label: "Difficulté",
            value: "Style production : le niveau attendu en entretien et en équipe.",
          },
          {
            label: "Ensuite",
            value: "Conteneuriser avec Docker, ou explorer Spring Boot en profondeur.",
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
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "docs.oracle.com/javase",
            value: "La documentation de référence : API (Javadoc de toutes les classes), guides du langage, tutoriels officiels.",
          },
          {
            label: "dev.java",
            value: "Le site des développeurs Java (Oracle) : tutoriels, articles et nouveautés de chaque version.",
          },
          {
            label: "docs.oracle.com/javase/specs",
            value: "Les spécifications : Java Language Specification et JVM Specification — la source ultime en cas de doute sur le comportement exact.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les quatre projets progressifs de cette page, dans l'ordre, en tapant tout le code à la main.",
          "Outillage : documentations de Maven, Gradle et JUnit pour la mise en pratique du build et des tests.",
          "Communauté : le projet OpenJDK (discussions, évolutions du langage) pour comprendre où va Java.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Java maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Backend : Spring Boot — le framework dominant pour les API et applications d'entreprise en Java.",
          "Mobile : Android (Kotlin, le langage recommandé par Google, tourne sur la JVM et s'apprend vite depuis Java).",
          "Langages JVM : Kotlin (concurrent officiel de Java, plus concis) ou Scala, pour élargir sans quitter l'écosystème.",
          "Données : Kafka, Elasticsearch, Hadoop — comprendre les outils big data écrits en Java.",
          "Cloud/conteneurs : packager vos `.jar` avec Docker, déployer sur n'importe quel cloud.",
          "Revenir à la roadmap : valider Java et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

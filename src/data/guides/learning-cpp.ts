import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de C/C++ : les langages système, de zéro à un usage
 * professionnel. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code inline
 * entre backticks. Approche : C d'abord comme fondation, C++ comme surcouche
 * moderne ; la mémoire et la compilation sont expliquées avant le code.
 */
export const LEARNING_CPP: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que sont C et C++, pourquoi ils existent encore partout, et ce qui les distingue.",
    blocks: [
      {
        kind: "text",
        text: "C et C++ sont des langages compilés dits « système » : le code source est traduit en code machine natif avant l'exécution, sans machine virtuelle ni interpréteur au lancement. Résultat : des programmes rapides, prévisibles, qui tournent sur du matériel minuscule (microcontrôleur) comme sur des supercalculateurs. On les trouve dans les systèmes d'exploitation (Linux, Windows), les moteurs de jeux, les navigateurs, les bases de données et l'embarqué.",
      },
      {
        kind: "text",
        text: "Point essentiel : le programmeur gère la mémoire explicitement. Pas de ramasse-miettes : c'est vous qui décidez quand la mémoire est allouée et libérée. C'est la source de la performance… et de la plupart des bugs (fuites, segfaults). Apprendre C/C++, c'est apprendre à raisonner sur la mémoire.",
      },
      {
        kind: "text",
        text: "C et C++ sont des langages compilés bas niveau qui donnent un contrôle total sur le matériel et la mémoire, au prix d'une responsabilité totale.",
      },
      {
        kind: "text",
        text: "Dans les années 1970, il fallait écrire un système d'exploitation (Unix) dans un langage plus expressif que l'assembleur mais sans sacrifier la performance. C est né de ce besoin ; C++ a ajouté ensuite l'abstraction (classes, génériques) sans coût à l'exécution.",
      },
      {
        kind: "text",
        text: "Systèmes d'exploitation, embarqué, jeux vidéo, audio temps réel, bases de données, calcul haute performance, pilotes. Pour une API web classique ou un script, d'autres langages sont plus productifs.",
      },
      {
        kind: "fields",
        title: "C/C++ : l'essentiel",
        fields: [
          {
            label: "C ou C++ ?",
            value:
              "C est minimal et stable : idéal pour l'embarqué et comprendre la machine. C++ ajoute classes, génériques (`templates`), exceptions et la STL. Aujourd'hui on apprend le plus souvent le C++ moderne en gardant les bases du C.",
          },
        ],
      },
    ],
  },
  {
    id: "compilation-en-une-phrase",
    title: "La compilation en une phrase",
    level: 1,
    intro:
      "Le modèle mental central : votre texte devient un programme exécutable en plusieurs étapes.",
    blocks: [
      {
        kind: "diagram",
        title: "Du source à l'exécutable",
        lines: [
          "main.cpp ──▶ prétraitement ──▶ compilation ──▶ assemblage ──▶ édition de liens ──▶ ./a.out",
          "  (votre      (#include,        (C++ vers        (vers code      (assemble les        (programme",
          "   code)       #define)          assembleur)      machine)        morceaux)           exécutable)",
        ],
      },
      {
        kind: "text",
        text: "Contrairement à Python ou JavaScript, rien ne s'exécute « directement » : le compilateur (`g++`, `clang++`) traduit tout le programme en code machine avant le premier lancement. Une erreur de type ou de syntaxe bloque la compilation — le programme ne démarre même pas. C'est contraignant, mais cela élimine toute une classe d'erreurs avant l'exécution.",
      },
      {
        kind: "fields",
        title: "Vocabulaire minimal",
        fields: [
          {
            label: "Compilateur",
            value:
              "Le programme qui traduit le source en exécutable : `g++` (GCC), `clang++` (LLVM), `cl` (MSVC sur Windows).",
          },
          {
            label: "Exécutable",
            value:
              "Le fichier binaire produit (ex. `a.out`, `monprog.exe`) : il se lance directement, sans le compilateur.",
          },
          {
            label: "Erreur de compilation",
            value:
              "Le compilateur refuse de produire l'exécutable. À lire attentivement : elle indique fichier, ligne et cause.",
          },
          {
            label: "Segfault",
            value:
              "« Segmentation fault » : le programme compilé plante à l'exécution en accédant à une mémoire interdite. Le bug classique du débutant C/C++.",
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
    intro: "Ce qu'il faut savoir avant de commencer — et ce qui peut attendre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Savoir utiliser un terminal : naviguer (`cd`, `ls`), lancer une commande.",
          "Logique de programmation de base (variables, conditions, boucles) — dans n'importe quel langage.",
          "Aucune connaissance préalable de la mémoire ou des pointeurs requise : c'est le cœur de ce guide.",
          "Peut attendre : les `templates` avancés, la métaprogrammation, l'assembleur.",
        ],
      },
      {
        kind: "text",
        text: "Si vous venez de Python ou JavaScript, le choc principal sera la compilation et la gestion manuelle de la mémoire. C'est normal : prévoyez d'aller lentement sur les sections « pile vs tas » et « pointeurs ».",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer une chaîne de compilation : le compilateur, et rien d'autre pour commencer.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier si un compilateur est déjà installé",
        command: "g++ --version",
        why: "Affiche la version de GCC si présent. Sur macOS avec les outils Xcode, `g++` est en réalité un alias vers `clang++` — c'est normal.",
        verify: "Une ligne comme `g++ (GCC) 13.2.0` ou `Apple clang++` s'affiche.",
      },
      {
        kind: "command",
        label: "Installer GCC sur Ubuntu / Debian",
        command: "sudo apt update && sudo apt install build-essential",
        why: "Le paquet `build-essential` installe `gcc`, `g++`, `make` et les en-têtes C standard : tout le nécessaire pour compiler.",
        verify: "Relancez `g++ --version` : un numéro de version s'affiche.",
      },
      {
        kind: "command",
        label: "Installer les outils sur macOS",
        command: "xcode-select --install",
        why: "Installe les « Command Line Tools » d'Apple : `clang`/`clang++`, `make`, les SDK système. Aucun Xcode complet requis.",
        verify: "`clang++ --version` affiche la version d'Apple Clang.",
      },
      {
        kind: "text",
        text: "Sur Windows, deux options courantes : installer **Visual Studio** (édition Community gratuite, avec la charge de travail « Développement Desktop en C++ ») ou **MinGW-w64** via MSYS2 pour obtenir `g++` dans un terminal. Les deux sont des choix valides ; Visual Studio est le plus guidé pour débuter sur Windows.",
      },
      {
        kind: "command",
        label: "Vérifier CMake (utile plus tard)",
        command: "cmake --version",
        why: "CMake deviendra vite indispensable pour les projets à plusieurs fichiers. Inutile pour le premier `hello world`, bon à installer tôt.",
        verify: "Un numéro comme `cmake version 3.28.x` s'affiche.",
      },
    ],
  },
  {
    id: "premier-programme",
    title: "Premier programme",
    level: 2,
    intro: "Écrire, compiler et exécuter un programme C++ en 5 étapes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le fichier source",
            detail:
              "Créez `bonjour.cpp` dans votre éditeur avec le contenu ci-dessous. L'extension `.cpp` indique du C++ (`.c` pour du C pur).",
          },
          {
            title: "Compiler",
            detail:
              "Dans le terminal, placez-vous dans le dossier et lancez `g++ bonjour.cpp -o bonjour`. Le compilateur produit l'exécutable `bonjour` (ou `bonjour.exe` sur Windows).",
          },
          {
            title: "Exécuter",
            detail:
              "Lancez `./bonjour` (Linux/macOS) ou `bonjour.exe` (Windows). Le texte s'affiche : votre code machine tourne.",
          },
          {
            title: "Provoquer une erreur volontairement",
            detail:
              "Supprimez le point-virgule après une instruction et recompilez. Lisez le message du compilateur : fichier, ligne, cause. C'est un réflexe à entraîner.",
          },
          {
            title: "Corriger et recompiler",
            detail:
              "Remettez le point-virgule, recompilez : le cycle édition → compilation → exécution est votre quotidien en C/C++.",
          },
        ],
      },
      {
        kind: "code",
        language: "cpp",
        title: "bonjour.cpp",
        code: "#include <iostream>\n\nint main() {\n    std::cout << \"Bonjour, C++ !\\n\";\n    return 0;\n}",
      },
      {
        kind: "fields",
        title: "Lire ce programme ligne par ligne",
        fields: [
          {
            label: "`#include <iostream>`",
            value:
              "Demande au préprocesseur d'inclure la bibliothèque d'entrées/sorties standard, qui fournit `std::cout`.",
          },
          {
            label: "`int main()`",
            value:
              "Le point d'entrée : l'exécution commence toujours ici. `int` signifie que la fonction retourne un entier (le code de sortie).",
          },
          {
            label: "`std::cout << ...`",
            value:
              "Envoie du texte vers la sortie standard. `<<` est l'opérateur d'insertion ; `std::` est l'espace de noms standard.",
          },
          {
            label: "`return 0;`",
            value:
              "Code de sortie 0 = succès. Toute autre valeur signale une erreur au système.",
          },
        ],
      },
    ],
  },
  {
    id: "compiler-avec-gpp",
    title: "Compiler avec `g++` : les options essentielles",
    level: 2,
    intro:
      "Quatre options à connaître par cœur : elles changent tout au quotidien.",
    blocks: [
      {
        kind: "fields",
        title: "Les 4 options indispensables",
        fields: [
          {
            label: "`-o nom`",
            value:
              "Nomme l'exécutable produit. Sans `-o`, le résultat s'appelle `a.out` (nom historique, peu pratique). Exemple : `g++ main.cpp -o monprog`.",
          },
          {
            label: "`-Wall -Wextra`",
            value:
              "Active les avertissements du compilateur (« warnings »). Un warning n'empêche pas la compilation, mais signale un code suspect : traitez chaque warning comme une erreur en devenir.",
          },
          {
            label: "`-std=c++17` (ou `c++20`)",
            value:
              "Choisit la version du standard C++ à utiliser. Sans elle, le compilateur utilise sa valeur par défaut, qui varie selon la version de GCC. Fixez-la explicitement.",
          },
          {
            label: "`-g`",
            value:
              "Inclut les informations de débogage dans l'exécutable (noms de variables, numéros de ligne). Indispensable pour déboguer avec `gdb`, sans effet sur le comportement du programme.",
          },
        ],
      },
      {
        kind: "command",
        label: "La commande de compilation « de tous les jours »",
        command: "g++ -std=c++17 -Wall -Wextra -g main.cpp -o monprog",
        why: "Compile en C++17, avec tous les avertissements utiles et les symboles de debug. C'est la base saine pour développer ; on ajoutera `-O2` (optimisation) pour les versions finales.",
        verify: "Aucune sortie = succès. `./monprog` exécute le programme.",
      },
      {
        kind: "command",
        label: "Compiler en C pur avec gcc",
        command: "gcc -std=c11 -Wall -Wextra -g main.c -o monprog",
        why: "`gcc` compile le C, `g++` le C++. Pour un fichier `.c`, utilisez `gcc` avec `-std=c11` (ou `c17`). Mélanger les deux compilateurs au hasard produit des erreurs d'édition de liens.",
        verify: "Même principe : silence = succès, puis `./monprog`.",
      },
      {
        kind: "fields",
        title: "Options utiles à connaître ensuite",
        fields: [
          {
            label: "`-O2`",
            value:
              "Active l'optimisation du code généré (plus rapide, mais compilation plus lente et debug plus difficile). Réservé aux builds de production, pas au développement.",
          },
          {
            label: "`-fsanitize=address`",
            value:
              "Active l'AddressSanitizer : détecte à l'exécution les débordements de tampon et les accès après libération. Voir la section dédiée.",
          },
          {
            label: "`-I dossier`",
            value:
              "Ajoute un dossier à la recherche des `#include`. Utile quand vos en-têtes sont dans `include/`.",
          },
          {
            label: "`-c`",
            value:
              "Compile sans lier : produit un fichier objet (`.o`). Base de la compilation séparée des gros projets.",
          },
        ],
      },
    ],
  },
  {
    id: "comprendre-les-erreurs-compilation",
    title: "Comprendre les erreurs de compilation",
    level: 2,
    intro:
      "En C++, le compilateur parle beaucoup. Apprendre à le lire, c'est apprendre deux fois plus vite.",
    blocks: [
      {
        kind: "text",
        text: "Un message d'erreur GCC/Clang suit toujours le même format : `fichier:ligne:colonne: gravité: message`. La gravité est `error` (bloquant) ou `warning` (avertissement). Lisez toujours la **première** erreur en premier : les suivantes sont souvent des conséquences en cascade.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Exemple : point-virgule oublié",
        code: "bonjour.cpp:5:5: error: expected ';' before '}' token\n    5 |     }\n      |     ^",
      },
      {
        kind: "fields",
        title: "Les 4 erreurs que vous verrez en premier",
        fields: [
          {
            label: "`expected ';' before ...`",
            value:
              "Point-virgule manquant à la fin de l'instruction précédente. Le compilateur pointe souvent la ligne *suivante* : regardez juste au-dessus.",
          },
          {
            label: "`'x' was not declared in this scope`",
            value:
              "Variable inconnue : faute de frappe, variable déclarée après usage, ou `#include` manquant.",
          },
          {
            label: "`undefined reference to ...`",
            value:
              "Erreur d'*édition de liens*, pas de compilation : le code compile mais une fonction n'a pas de définition (fichier oublié à la compilation, ou `main` absent).",
          },
          {
            label: "`no matching function for call to ...`",
            value:
              "Appel de fonction avec des arguments d'un type inattendu. Le compilateur liste les candidats : comparez les signatures.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : compilez souvent, par petits incréments. Dix lignes compilées sans erreur valent mieux que deux cents lignes écrites d'un coup suivies de cinquante erreurs en cascade.",
      },
    ],
  },
  {
    id: "organisation-fichiers",
    title: "Organiser ses fichiers : `.cpp` et `.h`",
    level: 2,
    intro:
      "La convention fondatrice du C/C++ : séparer les déclarations (headers) des définitions (sources).",
    blocks: [
      {
        kind: "text",
        text: "Un fichier d'en-tête (`.h` ou `.hpp`) **déclare** ce qui existe (signatures de fonctions, classes) ; un fichier source (`.cpp`) **définit** comment ça marche (le code). Les autres fichiers incluent le header avec `#include` pour utiliser vos fonctions. Cette séparation permet de compiler chaque `.cpp` indépendamment.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "maths.h — les déclarations",
        code: "#ifndef MATHS_H\n#define MATHS_H\n\n// Déclare : « il existe une fonction carreau »\nint carreau(int x);\n\n#endif",
      },
      {
        kind: "code",
        language: "cpp",
        title: "maths.cpp — la définition",
        code: "#include \"maths.h\"\n\n// Définit : voici comment elle fonctionne\nint carreau(int x) {\n    return x * x;\n}",
      },
      {
        kind: "code",
        language: "cpp",
        title: "main.cpp — l'utilisation",
        code: "#include <iostream>\n#include \"maths.h\"  // guillemets = mon header, <> = bibliothèque système\n\nint main() {\n    std::cout << carreau(7) << \"\\n\";  // affiche 49\n    return 0;\n}",
      },
      {
        kind: "command",
        label: "Compiler un projet à deux fichiers",
        command: "g++ -std=c++17 -Wall -Wextra -g main.cpp maths.cpp -o monprog",
        why: "Tous les `.cpp` doivent être passés au compilateur : chacun est compilé, puis l'éditeur de liens les assemble. Oublier `maths.cpp` donne `undefined reference to carreau`.",
        verify: "`./monprog` affiche `49`.",
      },
      {
        kind: "fields",
        title: "Les gardes d'inclusion, en bref",
        fields: [
          {
            label: "Le problème",
            value:
              "Si un header est inclus deux fois (directement et via un autre header), ses déclarations sont dupliquées : erreur de compilation.",
          },
          {
            label: "La solution classique",
            value:
              "`#ifndef MATHS_H / #define MATHS_H ... #endif` : au second passage, le symbole existe déjà et le contenu est ignoré.",
          },
          {
            label: "L'alternative moderne",
            value:
              "`#pragma once` en première ligne du header : supporté par tous les compilateurs courants, plus lisible. Les deux approches sont valides.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro: "À quoi ressemble une session de travail typique en C++.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de développement",
        lines: [
          "  éditer (.cpp/.h)",
          "        │",
          "        ▼",
          "  compiler : g++ -std=c++17 -Wall -Wextra -g *.cpp -o prog",
          "        │",
          "   ┌────┴────┐",
          "   ▼         ▼",
          " erreur    ./prog",
          "   │         │",
          "   │    ┌────┴────┐",
          "   │    ▼         ▼",
          "   │   OK      crash / bug",
          "   │             │",
          "   └─────◀──────┘",
          "   relire      gdb / sanitizer",
          "   l'erreur    puis corriger",
        ],
      },
      {
        kind: "list",
        items: [
          "Éditez dans votre éditeur, gardez un terminal ouvert à côté.",
          "Recompilez après chaque petit changement, avec `-Wall -Wextra`.",
          "Zéro warning : un programme qui compile avec des warnings est un programme qui cache des bugs.",
          "Au premier comportement bizarre, lancez avec l'AddressSanitizer avant de déboguer à l'aveugle.",
          "Versionnez avec Git dès le premier fichier : `git init` n'est jamais trop tôt.",
        ],
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et IDE",
    level: 2,
    intro: "Plusieurs environnements sérieux, selon votre profil.",
    blocks: [
      {
        kind: "fields",
        title: "Panorama factuel",
        fields: [
          {
            label: "Visual Studio (Windows)",
            value:
              "IDE complet de Microsoft : compilateur MSVC intégré, débogueur visuel puissant, CMake supporté. Le plus guidé pour débuter sur Windows.",
          },
          {
            label: "VS Code",
            value:
              "Éditeur léger + extension C/C++ de Microsoft (ou clangd) : complétion, navigation, debug via `gdb`/`lldb`. Léger et multiplateforme, demande un peu de configuration.",
          },
          {
            label: "CLion (JetBrains)",
            value:
              "IDE C++ avec compréhension fine de CMake, refactoring et analyse statique intégrés. Version payante, gratuite pour les étudiants et l'open source.",
          },
          {
            label: "Neovim / Vim",
            value:
              "Éditeur terminal + serveur de langage `clangd` : rapide, entièrement au clavier. Courbe d'apprentissage raide, très prisé des développeurs système.",
          },
          {
            label: "Qt Creator",
            value:
              "IDE orienté C++/Qt, léger, avec un bon débogueur intégré. Pertinent si vous visez les interfaces graphiques Qt.",
          },
        ],
      },
      {
        kind: "text",
        text: "Quel que soit l'éditeur, deux composants font 90 % du confort : un **serveur de langage** (`clangd`) pour la complétion et la navigation, et un **débogueur** (`gdb` sur Linux, `lldb` sur macOS, débogueur VS sur Windows) pour inspecter le programme en cours d'exécution.",
      },
    ],
  },
  {
    id: "cmake-minimal",
    title: "CMake : le minimum vital",
    level: 2,
    intro:
      "Dès que le projet dépasse 2-3 fichiers, on confie la compilation à CMake.",
    blocks: [
      {
        kind: "text",
        text: "CMake n'est pas un compilateur : c'est un **générateur de système de compilation**. Vous décrivez le projet dans un `CMakeLists.txt` (« voici mes sources, voici mon standard C++ »), et CMake produit les commandes de compilation adaptées à la plateforme (`make`, Visual Studio, Ninja…).",
      },
      {
        kind: "code",
        language: "cmake",
        title: "CMakeLists.txt minimal",
        code: "cmake_minimum_required(VERSION 3.16)\nproject(monprog)\n\nset(CMAKE_CXX_STANDARD 17)\n\nadd_executable(monprog main.cpp maths.cpp)",
      },
      {
        kind: "fields",
        title: "Lire ce fichier ligne par ligne",
        fields: [
          {
            label: "`cmake_minimum_required`",
            value: "Version minimale de CMake acceptée. `3.16` est un plancher raisonnable et répandu.",
          },
          {
            label: "`project(monprog)`",
            value: "Nomme le projet. Donne aussi des variables utiles comme le nom et la version.",
          },
          {
            label: "`set(CMAKE_CXX_STANDARD 17)`",
            value: "Fixe le standard C++ pour toutes les cibles : l'équivalent propre de `-std=c++17`.",
          },
          {
            label: "`add_executable(...)`",
            value: "Déclare l'exécutable à construire et la liste des sources. C'est la ligne que vous modifierez le plus souvent.",
          },
        ],
      },
      {
        kind: "command",
        label: "Configurer puis compiler avec CMake",
        command: "cmake -S . -B build && cmake --build build",
        why: "`-S . -B build` configure le projet (dossier source `.`, dossier de build `build/`, hors de l'arbre source : bonne pratique). `cmake --build build` lance la compilation proprement dite.",
        verify: "L'exécutable apparaît dans `build/monprog` (ou `build/Debug/` sur Windows).",
      },
    ],
  },
  {
    id: "deboguer-premiers-pas",
    title: "Déboguer : premiers pas avec `gdb`",
    level: 2,
    intro: "Le débogueur n'est pas un luxe : en C++, c'est l'outil n° 1.",
    blocks: [
      {
        kind: "text",
        text: "`gdb` (GNU Debugger) permet d'exécuter le programme pas à pas, de mettre des points d'arrêt et d'inspecter variables et mémoire. Condition impérative : compiler avec `-g`.",
      },
      {
        kind: "command",
        label: "Lancer un programme sous gdb",
        command: "gdb ./monprog",
        why: "Ouvre le débogueur sur votre exécutable (compilé avec `-g`). Vous obtenez l'invite `(gdb)` pour piloter l'exécution.",
        verify: "L'invite `(gdb)` s'affiche.",
      },
      {
        kind: "fields",
        title: "Les 6 commandes gdb à connaître",
        fields: [
          {
            label: "`break main` (ou `b 12`)",
            value: "Pose un point d'arrêt : sur une fonction, ou à la ligne 12 du fichier courant.",
          },
          {
            label: "`run` (ou `r`)",
            value: "Démarre le programme. Il s'arrête au premier point d'arrêt rencontré.",
          },
          {
            label: "`next` (ou `n`)",
            value: "Exécute la ligne courante en entier (sans entrer dans les fonctions appelées).",
          },
          {
            label: "`step` (ou `s`)",
            value: "Entre dans la fonction appelée par la ligne courante.",
          },
          {
            label: "`print x` (ou `p x`)",
            value: "Affiche la valeur de la variable `x` au point courant.",
          },
          {
            label: "`backtrace` (ou `bt`)",
            value: "Affiche la pile d'appels : quelle fonction a appelé quoi. Inestimable après un crash.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe après un segfault : relancez sous `gdb`, tapez `run`, puis `backtrace` au crash. Vous saurez exactement quelle ligne a planté — c'est 80 % du diagnostic.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "c-vs-cpp-histoire",
    title: "C vs C++ : l'histoire factuelle",
    level: 3,
    intro: "Deux langages, une filiation, des philosophies différentes.",
    blocks: [
      {
        kind: "table",
        headers: ["Repère", "C", "C++"],
        rows: [
          ["Naissance", "Début des années 1970, Dennis Ritchie aux Bell Labs, pour réécrire Unix", "1979 : « C with Classes » de Bjarne Stroustrup ; renommé C++ en 1983, premier livre en 1985"],
          ["Philosophie", "Minimalisme : petit langage, proche de la machine", "Abstraction sans surcoût : classes, génériques, avec la performance du C"],
          ["Programmation objet", "Non (structs + fonctions uniquement)", "Oui (classes, héritage, polymorphisme)"],
          ["Génériques", "Non (`void*` et macros, non typés)", "Oui (`templates`, typés et vérifiés à la compilation)"],
          ["Gestion mémoire", "Manuelle (`malloc`/`free`)", "Manuelle aussi, mais outillée (constructeurs/destructeurs, RAII, smart pointers)"],
          ["Standards marquants", "C89/C90, C99, C11, C17", "C++98, C++11 (révolution moderne), C++14/17/20/23"],
        ],
      },
      {
        kind: "text",
        text: "Le C++ est *presque* un sur-ensemble du C : la quasi-totalité du C valide compile en C++, mais les deux langages ont divergé (ex. les règles de conversion implicite diffèrent). En pratique : on écrit rarement du « C pur » dans un projet C++, sauf pour parler au matériel ou à des API système.",
      },
      {
        kind: "fields",
        title: "Quel standard viser ?",
        fields: [
          {
            label: "C++17 aujourd'hui",
            value:
              "Le socle moderne le plus universellement supporté (compilateurs, bibliothèques, employeurs). Si vous débutez, visez C++17.",
          },
          {
            label: "C++20",
            value:
              "Apporte concepts, ranges, coroutines, modules. Support compilateur désormais mature, adoption en cours.",
          },
          {
            label: "« Modern C++ »",
            value:
              "Désigne le style post-C++11 : `auto`, smart pointers, `constexpr`, STL plutôt que tableaux bruts et `new`/`delete` manuels.",
          },
        ],
      },
    ],
  },
  {
    id: "pipeline-compilation",
    title: "Le pipeline de compilation en détail",
    level: 3,
    intro: "Comprendre les 4 étapes pour diagnostiquer n'importe quelle erreur.",
    blocks: [
      {
        kind: "diagram",
        title: "Les 4 étapes (g++ les enchaîne automatiquement)",
        lines: [
          "1. PRÉTRAITEMENT   (cpp)   : #include → copie les headers, #define → substitue",
          "                                   ex. g++ -E main.cpp",
          "2. COMPILATION     (cc1plus): C++ → assembleur (.s)",
          "                                   ex. g++ -S main.cpp",
          "3. ASSEMBLAGE      (as)    : assembleur → code machine (.o, « objet »)",
          "                                   ex. g++ -c main.cpp",
          "4. ÉDITION DE LIENS (ld)   : .o + bibliothèques → exécutable",
          "                                   ex. g++ main.o maths.o -o prog",
        ],
      },
      {
        kind: "fields",
        title: "À quelle étape correspond quelle erreur ?",
        fields: [
          {
            label: "Erreur de préprocesseur",
            value: "`#include` introuvable, macro mal formée. Message : `fatal error: xxx.h: No such file or directory`.",
          },
          {
            label: "Erreur de compilation",
            value: "Syntaxe ou types invalides : `error: ...`. Le programme ne produit aucun `.o`.",
          },
          {
            label: "Erreur d'édition de liens",
            value: "`undefined reference to ...` : tout compile, mais une définition manque à l'assemblage final.",
          },
          {
            label: "Pourquoi c'est utile",
            value:
              "Savoir distinguer ces trois familles divise par deux le temps de diagnostic : on ne cherche pas une faute de frappe quand c'est l'éditeur de liens qui parle.",
          },
        ],
      },
    ],
  },
  {
    id: "preprocesseur",
    title: "Le préprocesseur : `#include` et `#define`",
    level: 3,
    intro: "Un traitement de texte avant la compilation — puissant et piégeux.",
    blocks: [
      {
        kind: "text",
        text: "Le préprocesseur s'exécute avant le compilateur : il manipule du **texte**, pas du C++. `#include` copie-colle le contenu d'un fichier, `#define` fait des substitutions textuelles. C'est simple, brutal, et source de bugs subtils si on en abuse.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Macros : la substitution textuelle",
        code: "#define CARRE(x) ((x) * (x))  // parenthèses indispensables !\n\nint a = CARRE(3 + 1);  // devient ((3 + 1) * (3 + 1)) = 16\n// Sans parenthèses : (3 + 1 * 3 + 1) = 7 — bug silencieux",
      },
      {
        kind: "fields",
        title: "Bonnes pratiques modernes",
        fields: [
          {
            label: "Constantes : préférez `constexpr`",
            value:
              "`constexpr int TAILLE = 100;` est typée, visible au débogueur et respecte les portées. `#define TAILLE 100` n'est qu'un remplacement de texte.",
          },
          {
            label: "Gardes d'inclusion",
            value:
              "`#ifndef`/`#define`/`#endif` ou `#pragma once` dans chaque header : jamais d'inclusion multiple.",
          },
          {
            label: "`#include` : ordre et style",
            value:
              "D'abord le header correspondant au `.cpp`, puis les headers du projet (`\"...\"`), puis le système (`<...>`).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Du code dans un header sans garde, inclus deux fois → `redefinition` à la compilation.",
          },
        ],
      },
    ],
  },
  {
    id: "types-fondamentaux",
    title: "Types fondamentaux et tailles",
    level: 3,
    intro: "En C++, la taille d'un `int` dépend de la plateforme. Il faut le savoir.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Contenu", "Taille typique (64 bits)"],
        rows: [
          ["`bool`", "vrai/faux", "1 octet"],
          ["`char`", "caractère / petit entier", "1 octet"],
          ["`int`", "entier signé", "4 octets"],
          ["`long`", "entier signé long", "8 octets (Linux/macOS), 4 (Windows)"],
          ["`long long`", "entier très long", "8 octets"],
          ["`float`", "flottant simple précision", "4 octets"],
          ["`double`", "flottant double précision", "8 octets"],
          ["`std::string`", "chaîne (classe, pas un type brut)", "24 octets d'objet + contenu sur le tas"],
        ],
      },
      {
        kind: "code",
        language: "cpp",
        title: "Vérifier les tailles sur votre machine",
        code: "#include <iostream>\n\nint main() {\n    std::cout << sizeof(int) << '\\n';        // ex. 4\n    std::cout << sizeof(long) << '\\n';       // 8 ou 4 selon l'OS\n    std::cout << sizeof(double) << '\\n';     // 8\n    return 0;\n}",
      },
      {
        kind: "fields",
        title: "Points d'attention",
        fields: [
          {
            label: "`auto`",
            value:
              "`auto x = 42;` : le compilateur déduit le type (`int`). Pratique, mais ne l'utilisez que quand le type est évident à la lecture.",
          },
          {
            label: "Signé vs non signé",
            value:
              "`unsigned int` ne peut pas être négatif (0 à ~4 milliards). Mélanger signé et non signé dans une comparaison produit des warnings — et des bugs.",
          },
          {
            label: "Tailles fixes",
            value:
              "`#include <cstdint>` fournit `int32_t`, `uint64_t`… : tailles garanties, indispensables pour les formats binaires et le réseau.",
          },
          {
            label: "Débordement d'entier signé",
            value:
              "Dépasser la capacité d'un `int` signé est un *comportement indéfini* (undefined behavior), pas un simple « retour à zéro ». Voir la section dédiée.",
          },
        ],
      },
    ],
  },
  {
    id: "pile-vs-tas",
    title: "Pile vs tas : où vit la mémoire",
    level: 3,
    intro: "Le concept central du C/C++ : deux zones mémoire, deux durées de vie.",
    blocks: [
      {
        kind: "diagram",
        title: "Les deux zones",
        lines: [
          "PILE (stack)                        TAS (heap)",
          "─────────────────                   ─────────────────",
          "• gérée automatiquement             • gérée par vous (ou les smart pointers)",
          "• variables locales                 • new / malloc",
          "• libérée à la sortie               • survit à la fonction...",
          "  de la fonction                    • ...jusqu'à delete / free",
          "• rapide, taille limitée            • grande, plus lente",
          "  (quelques Mo)                     • oublier delete = FUITE",
        ],
      },
      {
        kind: "code",
        language: "cpp",
        title: "Pile vs tas en code",
        code: "void exemple() {\n    int a = 42;            // PILE : libéré automatiquement à la fin\n    int* p = new int(42);  // TAS  : vit après la fonction...\n    delete p;              // ... sauf si on le libère ici : OBLIGATOIRE\n}  // ici, 'a' disparaît ; sans 'delete', le '42' du tas FUIT",
      },
      {
        kind: "fields",
        title: "Règles de survie",
        fields: [
          {
            label: "Par défaut : la pile",
            value:
              "Déclarez des variables locales simples. C'est automatique, rapide, sans fuite possible.",
          },
          {
            label: "Le tas : seulement si nécessaire",
            value:
              "Grandes données, durée de vie dépassant la fonction, polymorphisme. Et de préférence via smart pointers, pas `new` brut.",
          },
          {
            label: "Erreur classique",
            value:
              "Retourner l'adresse d'une variable locale (`return &a;`) : la pile est libérée, le pointeur pointe vers du vide — *dangling pointer*.",
          },
          {
            label: "Bonne pratique moderne",
            value:
              "En C++ moderne, `new`/`delete` explicites sont rares : `std::vector`, `std::string` et les smart pointers gèrent le tas pour vous.",
          },
        ],
      },
    ],
  },
  {
    id: "pointeurs",
    title: "Les pointeurs",
    level: 3,
    intro: "Une adresse mémoire dans une variable. Le concept le plus redouté — et le plus logique.",
    blocks: [
      {
        kind: "text",
        text: "Un pointeur est une variable qui contient **l'adresse** d'une autre variable, pas sa valeur. Deux opérateurs : `&` (adresse de) et `*` (déréférencement : « la valeur à cette adresse »).",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Anatomie d'un pointeur",
        code: "int x = 42;\nint* p = &x;   // p contient l'adresse de x\n\n*p = 100;      // déréférencement : modifie x via p\n// x vaut maintenant 100\n\nint* q = nullptr;  // pointeur nul : « ne pointe vers rien » (C++11+)",
      },
      {
        kind: "fields",
        title: "Le kit de survie des pointeurs",
        fields: [
          {
            label: "Initialisez toujours",
            value:
              "`int* p = nullptr;` plutôt que `int* p;` : un pointeur non initialisé pointe vers une adresse aléatoire — segfault garanti tôt ou tard.",
          },
          {
            label: "Vérifiez avant de déréférencer",
            value:
              "`if (p != nullptr)` avant `*p` quand le pointeur peut être nul (retour de fonction, paramètre optionnel).",
          },
          {
            label: "`nullptr`, pas `NULL` ni `0`",
            value:
              "`nullptr` est typé et non ambigu. `NULL` est un héritage du C à éviter en C++ moderne.",
          },
          {
            label: "Arithmétique des pointeurs",
            value:
              "`p + 1` avance d'un *élément*, pas d'un octet (le compilateur multiplie par `sizeof`). Réservé aux tableaux et aux buffers — zone à risque.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Déréférencer un pointeur après `delete` (*use-after-free*) : le programme peut sembler marcher… jusqu'au crash en production.",
          },
        ],
      },
    ],
  },
  {
    id: "references",
    title: "Les références : l'alternative sûre",
    level: 3,
    intro: "Un alias vers une variable existante — le pointeur sans les dangers.",
    blocks: [
      {
        kind: "code",
        language: "cpp",
        title: "Référence vs pointeur",
        code: "int x = 42;\nint& r = x;   // r EST x (alias, pas une copie)\nr = 100;        // x vaut 100\n// r ne peut jamais être « nulle » ni réassignée : elle est liée à vie à x",
      },
      {
        kind: "table",
        headers: ["Critère", "Pointeur (`int*`)", "Référence (`int&`)"],
        rows: [
          ["Peut être nul", "Oui (`nullptr`)", "Non, toujours liée"],
          ["Réassignable", "Oui", "Non"],
          ["Syntaxe d'usage", "`*p` pour la valeur", "Directe (`r`), comme la variable"],
          ["Usage typique", "Tableaux, allocation dynamique, optionnel", "Paramètres de fonction, retours"],
        ],
      },
      {
        kind: "code",
        language: "cpp",
        title: "Le cas d'usage roi : éviter les copies",
        code: "// Mal : copie tout le vecteur à chaque appel (lent si grand)\nvoid affiche(std::vector<int> v);\n\n// Bien : référence constante — pas de copie, pas de modification possible\nvoid affiche(const std::vector<int>& v);",
      },
      {
        kind: "text",
        text: "Règle pratique : préférez les références aux pointeurs partout où c'est possible. Les pointeurs restent nécessaires pour la réassignation, la valeur « absente » (`nullptr`) et l'allocation dynamique.",
      },
    ],
  },
  {
    id: "classes-poo",
    title: "Classes et POO",
    level: 3,
    intro: "Regrouper données et comportements : la brique du C++.",
    blocks: [
      {
        kind: "code",
        language: "cpp",
        title: "Une classe complète mais minimale",
        code: "class Compte {\npublic:\n    Compte(double soldeInitial) : solde(soldeInitial) {}  // constructeur\n    ~Compte() {}                                          // destructeur\n\n    void deposer(double montant) { solde += montant; }\n    double getSolde() const { return solde; }  // const : ne modifie pas l'objet\n\nprivate:\n    double solde;  // inaccessible de l'extérieur : encapsulation\n};\n\nint main() {\n    Compte c(100.0);   // le constructeur initialise\n    c.deposer(50.0);   // OK\n    // c.solde = 0;    // ERREUR : privé\n}  // ici le destructeur est appelé automatiquement",
      },
      {
        kind: "fields",
        title: "Les 4 piliers à retenir",
        fields: [
          {
            label: "Constructeur",
            value:
              "Initialise l'objet à sa création. La liste d'initialisation (`: solde(...)`) est préférable à l'affectation dans le corps.",
          },
          {
            label: "Destructeur",
            value:
              "Nettoie à la destruction (libère la mémoire du tas, ferme les fichiers). C'est le fondement du RAII : la ressource est liée à la durée de vie de l'objet.",
          },
          {
            label: "`const` membre",
            value:
              "`getSolde() const` promet de ne pas modifier l'objet : permet d'appeler la méthode sur des objets constants, et documente l'intention.",
          },
          {
            label: "`struct` vs `class`",
            value:
              "Différence unique : membres publics par défaut dans `struct`, privés dans `class`. Par convention, `struct` = données simples, `class` = encapsulation.",
          },
        ],
      },
    ],
  },
  {
    id: "heritage-polymorphisme",
    title: "Héritage et polymorphisme",
    level: 3,
    intro: "Le polymorphisme dynamique : un seul appel, plusieurs comportements.",
    blocks: [
      {
        kind: "code",
        language: "cpp",
        title: "Fonctions virtuelles et override",
        code: "class Forme {\npublic:\n    virtual ~Forme() = default;\n    virtual double aire() const = 0;  // = 0 : purement virtuelle (classe abstraite)\n};\n\nclass Cercle : public Forme {\npublic:\n    Cercle(double r) : rayon(r) {}\n    double aire() const override { return 3.14159 * rayon * rayon; }\nprivate:\n    double rayon;\n};\n\nvoid afficher(const Forme& f) { /* ... */ f.aire(); }  // appelle la bonne version !",
      },
      {
        kind: "fields",
        title: "Règles d'or",
        fields: [
          {
            label: "`virtual` + `override`",
            value:
              "`virtual` dans la classe de base active la liaison dynamique ; `override` dans la dérivée fait vérifier par le compilateur que la signature correspond. Oublier `override` et se tromper de signature = la fonction de base est appelée silencieusement.",
          },
          {
            label: "Destructeur virtuel",
            value:
              "Si une classe a des fonctions virtuelles, son destructeur doit être `virtual`. Sinon, détruire via un pointeur de base ne libère pas la partie dérivée : fuite.",
          },
          {
            label: "Préférez la composition",
            value:
              "« Un `Cercle` EST une `Forme` » → héritage. « Une `Voiture` A un `Moteur` » → composition (membre). L'héritage abusif rigidifie le design.",
          },
          {
            label: "Coût",
            value:
              "L'appel virtuel passe par une table (vtable) : une indirection, négligeable sauf dans des boucles ultra-serrées.",
          },
        ],
      },
    ],
  },
  {
    id: "stl-vue-ensemble",
    title: "La STL : vue d'ensemble",
    level: 3,
    intro: "La bibliothèque standard : ne réinventez pas la roue.",
    blocks: [
      {
        kind: "text",
        text: "La STL (Standard Template Library, intégrée au C++ standard) fournit conteneurs, algorithmes et utilitaires testés et optimisés. Règle n° 1 du C++ moderne : **utilisez la STL avant d'écrire votre propre structure de données**.",
      },
      {
        kind: "table",
        headers: ["Besoin", "Conteneur", "À savoir"],
        rows: [
          ["Tableau dynamique", "`std::vector<T>`", "Le choix par défaut dans 90 % des cas. Accès `v[i]`, ajout `push_back`."],
          ["Chaîne de caractères", "`std::string`", "Concaténation avec `+`, taille avec `.size()`. Oubliez `char*` manuel."],
          ["Dictionnaire trié", "`std::map<K,V>`", "Clés triées, recherche en O(log n)."],
          ["Dictionnaire rapide", "`std::unordered_map<K,V>`", "Table de hachage, O(1) moyen, clés non triées."],
          ["File (FIFO)", "`std::queue<T>`", "Pour les traitements en ordre d'arrivée."],
          ["Pile (LIFO)", "`std::stack<T>`", "Pour les annulations, les parcours."],
          ["Ensemble unique", "`std::set<T>` / `unordered_set`", "Élimine les doublons, test d'appartenance rapide."],
        ],
      },
      {
        kind: "code",
        language: "cpp",
        title: "STL en action",
        code: "#include <vector>\n#include <string>\n#include <algorithm>\n#include <iostream>\n\nint main() {\n    std::vector<std::string> noms = {\"ada\", \"grace\", \"katherine\"};\n    noms.push_back(\"margaret\");\n\n    std::sort(noms.begin(), noms.end());  // algorithme standard\n\n    for (const auto& n : noms) {           // boucle range-for : idiomatique\n        std::cout << n << '\\n';\n    }\n}",
      },
    ],
  },
  {
    id: "stl-algorithmes",
    title: "Algorithmes STL : penser en transformations",
    level: 3,
    intro: "`<algorithm>` : 100+ opérations prêtes, testées, optimisées.",
    blocks: [
      {
        kind: "fields",
        title: "Les 5 algorithmes à connaître",
        fields: [
          {
            label: "`std::sort(debut, fin)`",
            value: "Trie en place. Accepte un comparateur personnalisé (lambda) en 3e argument.",
          },
          {
            label: "`std::find(debut, fin, valeur)`",
            value: "Retourne un itérateur vers la valeur, ou `fin` si absente. Toujours comparer le résultat à `fin`.",
          },
          {
            label: "`std::transform`",
            value: "Applique une fonction à chaque élément : l'équivalent de `map` dans les langages fonctionnels.",
          },
          {
            label: "`std::count_if`",
            value: "Compte les éléments vérifiant un prédicat. Plus lisible qu'une boucle manuelle.",
          },
          {
            label: "`std::accumulate` (`<numeric>`)",
            value: "Réduit à une valeur (somme par défaut) : l'équivalent de `reduce`.",
          },
        ],
      },
      {
        kind: "code",
        language: "cpp",
        title: "Boucle manuelle vs algorithme",
        code: "// Manuel : verbeux, risque d'erreur d'indice\nint total = 0;\nfor (size_t i = 0; i < notes.size(); ++i) total += notes[i];\n\n// Idiomatique : intention claire, pas d'indice\n#include <numeric>\nint total2 = std::accumulate(notes.begin(), notes.end(), 0);",
      },
      {
        kind: "text",
        text: "Bonne pratique : un algorithme nommé (`sort`, `find`, `transform`) exprime l'intention mieux qu'une boucle `for` manuelle — et le compilateur l'optimise souvent mieux.",
      },
    ],
  },
  {
    id: "gestion-erreurs",
    title: "Gestion d'erreurs : codes vs exceptions",
    level: 3,
    intro: "Deux philosophies coexistent en C/C++. Il faut connaître les deux.",
    blocks: [
      {
        kind: "table",
        headers: ["Approche", "Principe", "Quand"],
        rows: [
          ["Codes de retour (style C)", "La fonction retourne un code (`0` = OK, `-1` = erreur) ou `nullptr`", "API C, embarqué, code critique en performance, là où les exceptions sont désactivées"],
          ["Exceptions (C++)", "`throw` une erreur, `catch` là où on peut la traiter", "Erreurs vraiment exceptionnelles dans du code applicatif C++"],
          ["`std::optional` / `std::expected` (C++17/23)", "Retourne « valeur ou rien » / « valeur ou erreur » sans exception", "Moderne : explicite, sans coût des exceptions"],
        ],
      },
      {
        kind: "code",
        language: "cpp",
        title: "Exceptions : le minimum",
        code: "#include <stdexcept>\n#include <iostream>\n\ndouble diviser(double a, double b) {\n    if (b == 0.0) throw std::invalid_argument(\"division par zéro\");\n    return a / b;\n}\n\nint main() {\n    try {\n        std::cout << diviser(10, 0) << '\\n';\n    } catch (const std::invalid_argument& e) {\n        std::cerr << \"Erreur : \" << e.what() << '\\n';\n    }\n}",
      },
      {
        kind: "fields",
        title: "Règles de bon sens",
        fields: [
          {
            label: "Exceptions = exceptionnel",
            value:
              "Fichier introuvable, réseau coupé : oui. « L'utilisateur a entré un mauvais nombre » : préférez un code de retour ou `std::optional`.",
          },
          {
            label: "Attrapez par référence const",
            value:
              "`catch (const std::exception& e)` : évite la copie et le *slicing* (perte du type dérivé).",
          },
          {
            label: "RAII > try/catch manuel",
            value:
              "Si vos ressources sont gérées par des objets (destructeurs, smart pointers), le nettoyage est automatique même quand une exception traverse : c'est tout l'intérêt du RAII.",
          },
          {
            label: "En C pur",
            value:
              "Pas d'exceptions : codes de retour systématiques, et **vérifiez-les**. Ignorer un code de retour est la source n° 1 des bugs silencieux en C.",
          },
        ],
      },
    ],
  },
  {
    id: "smart-pointers",
    title: "Smart pointers : la mémoire sans les fuites",
    level: 3,
    intro: "Le C++ moderne gère le tas avec des objets, pas avec `delete` manuel.",
    blocks: [
      {
        kind: "text",
        text: "Un *smart pointer* est un objet qui **possède** un pointeur brut et appelle `delete` automatiquement à sa destruction (RAII). Vous n'écrivez presque plus `delete` : la propriété est explicite dans le type.",
      },
      {
        kind: "table",
        headers: ["Type", "Sémantique", "Usage"],
        rows: [
          ["`std::unique_ptr<T>`", "Propriété exclusive, non copiable (déplaçable)", "Le choix par défaut : une ressource, un propriétaire"],
          ["`std::shared_ptr<T>`", "Propriété partagée, compteur de références", "Quand plusieurs objets doivent partager la durée de vie (avec parcimonie : coût du compteur)"],
          ["`std::weak_ptr<T>`", "Observation sans propriété", "Casse les cycles de `shared_ptr` (A possède B qui possède A = fuite sinon)"],
        ],
      },
      {
        kind: "code",
        language: "cpp",
        title: "unique_ptr : le réflexe moderne",
        code: "#include <memory>\n\nvoid traiter() {\n    auto p = std::make_unique<int>(42);  // alloue sur le tas\n    // ... utiliser *p ...\n}  // ici p est détruit → delete automatique. Aucune fuite possible,\n   // même si une exception est levée entre-temps.",
      },
      {
        kind: "fields",
        title: "Règles pratiques",
        fields: [
          {
            label: "`make_unique` / `make_shared`",
            value:
              "Préférez les fabriques à `new` direct : une seule allocation, pas de `new` nu qui traîne.",
          },
          {
            label: "Ne mélangez pas",
            value:
              "Un objet géré par un smart pointer ne doit jamais être aussi `delete` manuellement : double libération = crash.",
          },
          {
            label: "`shared_ptr` avec modération",
            value:
              "Le compteur de références a un coût et masque le design de propriété. `unique_ptr` d'abord, `shared_ptr` si le partage est réel.",
          },
        ],
      },
    ],
  },
  {
    id: "raii",
    title: "RAII : l'idiome central du C++",
    level: 3,
    intro: "« Resource Acquisition Is Initialization » : la ressource vit avec l'objet.",
    blocks: [
      {
        kind: "text",
        text: "Le RAII lie la durée de vie d'une **ressource** (mémoire, fichier, mutex, socket) à celle d'un **objet** : le constructeur acquiert, le destructeur libère. Comme les objets locaux sont détruits automatiquement à la sortie du bloc — même en cas d'exception — la libération est garantie.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "RAII manuel : verrouiller un mutex",
        code: "#include <mutex>\n\nstd::mutex m;\n\nvoid sectionCritique() {\n    std::lock_guard<std::mutex> verrou(m);  // verrouille ici\n    // ... section critique ...\n}  // déverrouille AUTOMATIQUEMENT, même si on sort par exception",
      },
      {
        kind: "text",
        text: "Plus jamais de « penser à libérer » : la structure du code garantit le nettoyage.",
      },
      {
        kind: "fields",
        title: "Pourquoi c'est fondamental",
        fields: [          {
            label: "Partout dans la STL",
            value:
              "`std::vector`, `std::string`, `std::fstream`, `lock_guard`, smart pointers : tous des RAII.",
          },
          {
            label: "Exception-safe par construction",
            value:
              "Un `return` anticipé ou une exception ne saute jamais le destructeur des objets locaux.",
          },
          {
            label: "En C pur",
            value:
              "Pas de destructeurs : discipline manuelle (`goto cleanup` est un idiome C réel et respectable), ou adoptez le C++.",
          },
        ],
      },
    ],
  },
  {
    id: "const-correctness",
    title: "`const` : la const-correctness",
    level: 3,
    intro: "Dire ce qui ne change pas : le compilateur vérifie pour vous.",
    blocks: [
      {
        kind: "code",
        language: "cpp",
        title: "Les trois const utiles",
        code: "const int MAX = 100;                    // 1. constante : ne changera jamais\n\nint lire(const std::vector<int>& v) {   // 2. paramètre : pas de copie, pas de modification\n    return v[0];\n}\n\nclass C {\n    int get() const { return x; }         // 3. méthode : ne modifie pas l'objet\n    int x;\n};",
      },
      {
        kind: "fields",
        title: "Pourquoi s'embêter ?",
        fields: [
          {
            label: "Documentation vérifiée",
            value:
              "`const` dit au lecteur « ceci ne sera pas modifié » — et le compilateur le garantit, contrairement à un commentaire.",
          },
          {
            label: "Plus d'optimisations",
            value:
              "Le compilateur peut supposer la stabilité d'une valeur `const` et mieux optimiser.",
          },
          {
            label: "Attrape des bugs tôt",
            value:
              "Modifier par accident un paramètre `const` = erreur de compilation immédiate, pas bug subtil.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `const` sur un getter empêche de l'appeler sur un objet `const` : mettez `const` par défaut, retirez-le si besoin.",
          },
        ],
      },
    ],
  },
  {
    id: "move-semantics",
    title: "Move semantics : `std::move` (notions)",
    level: 3,
    intro: "Voler les ressources au lieu de les copier : l'optimisation du C++11.",
    blocks: [
      {
        kind: "text",
        text: "Copier un `vector` de 1 million d'éléments coûte cher. Mais si la source est temporaire (un retour de fonction), pourquoi copier ? Le *move* **transfère** le pointeur interne : O(1) au lieu de O(n). `std::vector`, `std::string` et les smart pointers le font automatiquement.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Copie vs déplacement",
        code: "#include <vector>\n#include <utility>\n\nstd::vector<int> a(1'000'000, 7);\nstd::vector<int> b = a;             // COPIE : 1M d'entiers dupliqués (lent)\nstd::vector<int> c = std::move(a);  // DÉPLACE : vole le buffer de a (instantané)\n// a est maintenant dans un état « vidé » valide mais indéterminé : ne plus l'utiliser",
      },
      {
        kind: "fields",
        title: "À retenir sans s'y noyer",
        fields: [
          {
            label: "En pratique",
            value:
              "La STL déplace déjà automatiquement les temporaires. Vous n'écrirez du code de move manuel que pour vos propres classes gérant des ressources.",
          },
          {
            label: "`std::move` ne déplace rien",
            value:
              "C'est un simple transtypage (« traite ceci comme déplaçable »). Le déplacement réel est fait par le constructeur/assignation de déplacement.",
          },
          {
            label: "Après un move",
            value:
              "L'objet source reste valide mais son contenu est indéterminé : seul usage sûr, lui réassigner ou le détruire.",
          },
        ],
      },
    ],
  },
  {
    id: "templates",
    title: "Templates : la généricité",
    level: 3,
    intro: "Écrire une fois, pour tous les types — vérifié à la compilation.",
    blocks: [
      {
        kind: "code",
        language: "cpp",
        title: "Une fonction pour tous les types",
        code: "template <typename T>\nT maximum(T a, T b) {\n    return (a > b) ? a : b;\n}\n\nint m1 = maximum(3, 7);            // T = int, déduit automatiquement\nstd::string m2 = maximum<std::string>(\"a\", \"b\");  // explicite si besoin",
      },
      {
        kind: "text",
        text: "Le compilateur **génère** une version de la fonction par type utilisé : c'est du code sur mesure, sans surcoût à l'exécution (contrairement au polymorphisme dynamique). Toute la STL (`vector<T>`, `map<K,V>`, `sort`) repose dessus.",
      },
      {
        kind: "fields",
        title: "Points d'attention",
        fields: [
          {
            label: "Erreurs verbeuses",
            value:
              "Une erreur dans du code templaté produit des pages de messages. Lisez la *première* ligne et la *dernière* : le reste est du bruit d'instanciation.",
          },
          {
            label: "Headers uniquement",
            value:
              "Les templates vivent dans les headers (le compilateur doit voir la définition pour instancier). C'est normal, pas une erreur d'organisation.",
          },
          {
            label: "C++20 : les concepts",
            value:
              "`template <std::integral T>` contraint T aux types entiers : erreurs claires au lieu de pages de template. À découvrir après les bases.",
          },
        ],
      },
    ],
  },
  {
    id: "lambda",
    title: "Lambdas : fonctions anonymes",
    level: 3,
    intro: "Du code à la volée, là où on en a besoin.",
    blocks: [
      {
        kind: "code",
        language: "cpp",
        title: "Anatomie d'une lambda",
        code: "#include <vector>\n#include <algorithm>\n\nstd::vector<int> v = {3, 1, 4, 1, 5};\nint seuil = 2;\n\n//        captures  params  corps\n//           │       │       │\nint n = std::count_if(v.begin(), v.end(),\n    [&](int x) { return x > seuil; });  // [&] : capture par référence\n// n = 3",
      },
      {
        kind: "fields",
        title: "Captures : le point délicat",
        fields: [
          {
            label: "`[&]` : capture par référence",
            value:
              "La lambda voit les variables locales. Dangereux si la lambda survit à la fonction (dangling reference) : à réserver aux usages immédiats (`sort`, `count_if`).",
          },
          {
            label: "`[=]` : capture par copie",
            value:
              "La lambda copie les variables : sûre à stocker, mais la copie peut coûter cher.",
          },
          {
            label: "Capture explicite",
            value:
              "`[seuil]` ou `[&seuil]` : le plus lisible et le plus sûr. Préférez l'explicite au tout-`[&]`/`[=]`.",
          },
          {
            label: "Usage roi",
            value:
              "Comparateurs de tri, prédicats STL, callbacks : partout où une petite fonction n'a de sens qu'à un endroit.",
          },
        ],
      },
    ],
  },
  {
    id: "undefined-behavior",
    title: "Undefined Behavior : le contrat avec le compilateur",
    level: 3,
    intro: "La notion la plus importante — et la plus contre-intuitive — du C/C++.",
    blocks: [
      {
        kind: "text",
        text: "Le standard C++ liste des situations où **tout peut arriver** : crash, résultat faux, ou… programme qui semble marcher. C'est l'*undefined behavior* (UB). Le compilateur est autorisé à supposer que l'UB n'arrive jamais, et optimise en conséquence : un UB peut donc produire un comportement *différent* en `-O2` qu'en `-O0`.",
      },
      {
        kind: "table",
        headers: ["UB classique", "Ce qui se passe vraiment", "Conséquence"],
        rows: [
          ["Déréférencer `nullptr`", "Accès à l'adresse 0, interdite", "Segfault (le cas « gentil » : ça plante visiblement)"],
          ["Dépassement d'entier signé", "Le compilateur suppose que ça n'arrive pas", "Boucle `for` optimisée en boucle infinie, par exemple"],
          ["Use-after-free", "La mémoire peut être réutilisée entre-temps", "Données corrompues silencieusement"],
          ["Débordement de tampon", "Écriture hors du tableau", "Corruption de variables voisines, faille de sécurité"],
          ["Variable non initialisée", "Valeur résiduelle quelconque", "Comportement non reproductible"],
          ["Data race (threads)", "Deux threads écrivent sans synchronisation", "Résultat aléatoire"],
        ],
      },
      {
        kind: "text",
        text: "Moralité : en C++, « ça marche sur ma machine » ne prouve rien. Les sanitizers (`-fsanitize=address,undefined`) existent précisément pour transformer ces UB silencieux en erreurs visibles et localisées.",
      },
    ],
  },
  {
    id: "sanitizers",
    title: "Sanitizers : détecter l'invisible",
    level: 3,
    intro: "Des instruments de bord qui transforment les bugs mémoire en erreurs claires.",
    blocks: [
      {
        kind: "command",
        label: "Compiler avec l'AddressSanitizer",
        command: "g++ -std=c++17 -g -fsanitize=address -o prog main.cpp",
        why: "Instrumente le binaire : chaque accès mémoire hors limites ou après libération provoque un rapport précis (fichier, ligne, pile d'appels) au lieu d'un comportement silencieux.",
        verify: "Lancez `./prog` : en cas de bug mémoire, un rapport `ERROR: AddressSanitizer` détaillé s'affiche.",
      },
      {
        kind: "command",
        label: "Ajouter l'UndefinedBehaviorSanitizer",
        command: "g++ -std=c++17 -g -fsanitize=address,undefined -o prog main.cpp",
        why: "Ajoute la détection des UB : dépassement d'entier signé, décalage invalide, `nullptr` déréférencé… Combinez les deux pendant le développement.",
        verify: "Un UB déclenche `runtime error: ...` avec la localisation exacte.",
      },
      {
        kind: "fields",
        title: "Bon usage",
        fields: [
          {
            label: "Développement uniquement",
            value:
              "Les sanitizers ralentissent le programme (×2 environ) : on les active en debug/test, jamais en production.",
          },
          {
            label: "Avant gdb",
            value:
              "Face à un crash bizarre, recompilez avec `-fsanitize=address` *avant* de déboguer : le rapport pointe souvent directement la ligne fautive.",
          },
          {
            label: "Avec les tests",
            value:
              "Lancez votre suite de tests compilée avec les sanitizers : chaque test devient aussi un test mémoire.",
          },
        ],
      },
    ],
  },
  {
    id: "gdb-approfondi",
    title: "GDB : aller plus loin",
    level: 3,
    intro: "Au-delà des bases : inspecter la mémoire et automatiser.",
    blocks: [
      {
        kind: "fields",
        title: "Commandes de niveau 2",
        fields: [
          {
            label: "`watch x`",
            value: "Point d'arrêt *dès que* `x` change : idéal pour traquer « qui modifie ma variable ? ».",
          },
          {
            label: "`print *p@10`",
            value: "Affiche 10 éléments à partir du pointeur `p` : inspecte un tableau brut.",
          },
          {
            label: "`x/4xw adresse`",
            value: "Examine la mémoire brute : 4 mots hexadécimaux à l'adresse donnée.",
          },
          {
            label: "`finish`",
            value: "Termine la fonction courante et s'arrête à son retour.",
          },
          {
            label: "`condition 2 x > 5`",
            value: "Le breakpoint n° 2 ne s'arrête que si `x > 5` : indispensable dans les boucles.",
          },
          {
            label: "`bt full`",
            value: "`backtrace` avec les variables locales de chaque frame.",
          },
        ],
      },
      {
        kind: "command",
        label: "Déboguer un core dump après crash",
        command: "gdb ./prog core",
        why: "Si le système produit un fichier `core` au crash, `gdb` l'ouvre *post-mortem* : `bt` montre la pile exacte du crash sans avoir à reproduire le bug.",
        verify: "`bt` affiche la pile d'appels au moment du plantage.",
      },
      {
        kind: "text",
        text: "Sur macOS, `lldb` remplace `gdb` (commandes proches : `b`, `r`, `n`, `s`, `p`, `bt`). Dans un IDE, le débogueur visuel appelle ces mêmes moteurs en coulisses.",
      },
    ],
  },
  {
    id: "valgrind",
    title: "Valgrind : le détecteur de fuites",
    level: 3,
    intro: "Vérifier qu'aucune mémoire ne fuit, sans instrumenter le code.",
    blocks: [
      {
        kind: "command",
        label: "Analyser les fuites mémoire",
        command: "valgrind --leak-check=full ./prog",
        why: "Valgrind exécute le programme dans une machine virtuelle d'analyse et liste chaque bloc alloué jamais libéré, avec la ligne d'allocation. Complémentaire de l'AddressSanitizer.",
        verify: "Le résumé final indique `definitely lost: 0 bytes` si tout est propre.",
      },
      {
        kind: "fields",
        title: "Lire un rapport Valgrind",
        fields: [
          {
            label: "`definitely lost`",
            value: "Fuite certaine : aucun pointeur ne référence plus le bloc. À corriger en priorité.",
          },
          {
            label: "`still reachable`",
            value: "Mémoire encore référençable à la fin (souvent des singletons/globaux) : généralement bénin.",
          },
          {
            label: "Limites",
            value:
              "Valgrind ralentit fortement (×20-50) et ne couvre pas macOS récent : là-bas, préférez `-fsanitize=address` et l'outil *Leaks* d'Xcode.",
          },
        ],
      },
    ],
  },
  {
    id: "cmake-approfondi",
    title: "CMake : structurer un vrai projet",
    level: 3,
    intro: "Au-delà du minimal : bibliothèques, options, builds propres.",
    blocks: [
      {
        kind: "code",
        language: "cmake",
        title: "CMakeLists.txt structuré",
        code: "cmake_minimum_required(VERSION 3.16)\nproject(moteur VERSION 1.0 LANGUAGES CXX)\n\nset(CMAKE_CXX_STANDARD 17)\nset(CMAKE_CXX_STANDARD_REQUIRED ON)\n\n# Une bibliothèque réutilisable...\nadd_library(moteur_lib STATIC moteur.cpp moteur.h)\n# ...et l'exécutable qui l'utilise\nadd_executable(moteur_app main.cpp)\ntarget_link_libraries(moteur_app PRIVATE moteur_lib)",
      },
      {
        kind: "fields",
        title: "Concepts clés",
        fields: [
          {
            label: "`add_library`",
            value:
              "`STATIC` (`.a`) : intégrée à l'exécutable. `SHARED` (`.so`/`.dll`) : chargée à l'exécution. `INTERFACE` : header-only.",
          },
          {
            label: "`target_link_libraries`",
            value:
              "Déclare « `moteur_app` utilise `moteur_lib` ». `PRIVATE` = détail d'implémentation, `PUBLIC` = propagé aux utilisateurs de la cible.",
          },
          {
            label: "Build hors-source",
            value:
              "Toujours `cmake -S . -B build` : les fichiers générés restent dans `build/`, le source reste propre.",
          },
          {
            label: "Types de build",
            value:
              "`cmake -DCMAKE_BUILD_TYPE=Debug -S . -B build` (avec `-g`) vs `Release` (avec `-O2 -DNDEBUG`). À choisir explicitement.",
          },
        ],
      },
      {
        kind: "command",
        label: "Recompiler après modification",
        command: "cmake --build build",
        why: "Ne recompile que les fichiers modifiés et leurs dépendants (via les dépendances de headers suivies automatiquement). Sur un gros projet, c'est la différence entre 2 secondes et 20 minutes.",
        verify: "Seuls les fichiers touchés sont recompilés dans la sortie.",
      },
    ],
  },
  {
    id: "bibliotheques-liaison",
    title: "Bibliothèques statiques vs dynamiques",
    level: 3,
    intro: "Comprendre ce que l'éditeur de liens assemble vraiment.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Statique (`.a` / `.lib`)", "Dynamique (`.so` / `.dll` / `.dylib`)"],
        rows: [
          ["Moment de la liaison", "À la compilation : le code est copié dans l'exécutable", "À l'exécution : le chargeur lie au démarrage"],
          ["Taille / dépendances", "Exécutable plus gros, autonome", "Exécutable léger, dépend des `.so` présents"],
          ["Mise à jour", "Recompiler pour profiter d'un correctif de la lib", "Remplacer la lib suffit (si ABI compatible)"],
          ["Exemple", "`libmoteur.a`", "`libmoteur.so` (Linux), `moteur.dll` (Windows)"],
        ],
      },
      {
        kind: "command",
        label: "Voir les dépendances dynamiques d'un exécutable",
        command: "ldd ./monprog",
        why: "Liste les bibliothèques dynamiques requises au lancement. Si une `.so` manque sur la machine cible : `error while loading shared libraries`.",
        verify: "Chaque ligne montre une lib et son chemin résolu.",
      },
      {
        kind: "text",
        text: "Erreur classique : compiler avec une lib dynamique, puis lancer sur une machine où elle n'est pas installée. Solutions : lier statiquement, ou livrer les `.so` avec le programme (et régler `rpath`).",
      },
    ],
  },
  {
    id: "c-interop",
    title: "Interopérabilité C/C++ : `extern \"C\"`",
    level: 3,
    intro: "Parler aux bibliothèques C depuis le C++ — un besoin quotidien.",
    blocks: [
      {
        kind: "text",
        text: "Le C++ « décore » les noms de fonctions (*name mangling*) pour gérer la surcharge ; le C ne le fait pas. Pour appeler une fonction C depuis du C++ (ou exposer du C++ à du C), on désactive la décoration avec `extern \"C\"`.",
      },
      {
        kind: "code",
        language: "cpp",
        title: "Utiliser une API C depuis du C++",
        code: "// ma_lib.h — utilisable depuis C ET C++\n#ifdef __cplusplus\nextern \"C\" {\n#endif\n\nvoid ma_fonction_c(int x);\n\n#ifdef __cplusplus\n}\n#endif",
      },
      {
        kind: "fields",
        title: "Quand c'est indispensable",
        fields: [
          {
            label: "API système",
            value:
              "Les appels système (POSIX, Win32) sont des API C : vos programmes C++ les utilisent via `extern \"C\"` sans y penser (les headers système le font).",
          },
          {
            label: "FFI vers d'autres langages",
            value:
              "Python (`ctypes`), Rust, etc. appellent du code compilé via l'ABI C : exposez vos fonctions en `extern \"C\"`.",
          },
          {
            label: "Limite",
            value:
              "Pas de surcharge, pas d'exceptions à travers la frontière (en pratique) : l'interface C reste simple — fonctions et types POD.",
          },
        ],
      },
    ],
  },
  {
    id: "multithreading-notions",
    title: "Multithreading : notions",
    level: 3,
    intro: "Le C++11 a standardisé les threads. Puissant, mais chaque partage se paie.",
    blocks: [
      {
        kind: "code",
        language: "cpp",
        title: "Lancer un thread",
        code: "#include <thread>\n#include <iostream>\n\nvoid travail(int id) {\n    std::cout << \"thread \" << id << '\\n';\n}\n\nint main() {\n    std::thread t1(travail, 1);\n    std::thread t2(travail, 2);\n    t1.join();  // attendre la fin — OBLIGATOIRE (sinon std::terminate)\n    t2.join();\n}",
      },
      {
        kind: "fields",
        title: "Les 4 dangers à connaître",
        fields: [
          {
            label: "Data race",
            value:
              "Deux threads accèdent à la même variable dont au moins un écrit, sans synchronisation = UB. Le bug le plus traître du C++.",
          },
          {
            label: "`std::mutex` + `lock_guard`",
            value:
              "Le mutex protège une section critique ; `lock_guard` le verrouille en RAII (jamais d'oubli de déverrouillage).",
          },
          {
            label: "`std::atomic<T>`",
            value:
              "Pour un simple compteur partagé : opérations indivisibles sans mutex, moins coûteux.",
          },
          {
            label: "`join()` obligatoire",
            value:
              "Détruire un `std::thread` encore joignable appelle `std::terminate` : toujours `join()` (ou `detach()` en connaissance de cause).",
          },
        ],
      },
      {
        kind: "command",
        label: "Détecter les data races",
        command: "g++ -std=c++17 -g -fsanitize=thread -o prog main.cpp",
        why: "Le ThreadSanitizer détecte à l'exécution les accès concurrents non protégés, avec les deux piles d'appels en conflit.",
        verify: "`WARNING: ThreadSanitizer: data race` localise les deux accès fautifs.",
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques du C++ moderne",
    level: 3,
    intro: "Le condensé de ce que les codebases sérieuses appliquent.",
    blocks: [
      {
        kind: "list",
        items: [
          "Zéro warning avec `-Wall -Wextra` : traitez chaque avertissement comme un bug.",
          "Préférez la STL (`vector`, `string`) aux tableaux bruts et à `new`/`delete` manuels.",
          "Utilisez `const` partout où c'est possible, `nullptr` plutôt que `NULL`, `constexpr` plutôt que `#define`.",
          "Un `unique_ptr` par défaut ; `shared_ptr` seulement si le partage de propriété est réel.",
          "RAII pour toute ressource : pas d'acquisition/libération manuelle éparpillée.",
          "Initialisez toujours vos variables (`int x = 0;`, `{}`) : le non-initialisé est un UB.",
          "Testez avec les sanitizers (`address`, `undefined`) en continu, pas seulement quand ça plante.",
          "Suivez les **C++ Core Guidelines** (isocpp.github.io/CppCoreGuidelines) : la référence de bonnes pratiques maintenue par la communauté.",
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes et corrections",
    level: 3,
    intro: "Les 9 pièges que tout débutant rencontre — avec le correctif.",
    blocks: [
      {
        kind: "text",
        text: "L'adresse 0 est protégée par le système : toute écriture y est interdite.",
      },
      {
        kind: "fields",
        title: "1. Segfault : déréférencer un pointeur nul",
        fields: [          { label: "Problème", value: "`int* p = nullptr; *p = 5;` → crash immédiat." },
          { label: "Mauvais", value: "`*p = 5; // « p devrait être valide ici »`" },
          { label: "Mieux", value: "`if (p) *p = 5;` — ou mieux : utilisez une référence si le pointeur ne peut pas être nul." },
        ],
      },
      {
        kind: "text",
        text: "Le tas n'est jamais nettoyé automatiquement en C++.",
      },
      {
        kind: "fields",
        title: "2. Fuite mémoire : `new` sans `delete`",
        fields: [          { label: "Problème", value: "Chaque `new` sans `delete` correspondant perd de la mémoire jusqu'à épuiser la RAM sur un programme longue durée." },
          { label: "Mauvais", value: "`void f() { int* p = new int[1000]; /* ... */ } // p jamais libéré`" },
          { label: "Mieux", value: "`std::vector<int> v(1000);` ou `auto p = std::make_unique<int[]>(1000);` : libération automatique." },
        ],
      },
      {
        kind: "text",
        text: "`delete` ne met pas le pointeur à `nullptr` : il pointe toujours vers l'ancienne adresse.",
      },
      {
        kind: "fields",
        title: "3. Dangling pointer : utiliser après `delete`",
        fields: [          { label: "Problème", value: "`delete p; *p = 3;` : la mémoire a été rendue, son contenu est indéterminé." },
          { label: "Mauvais", value: "Réutiliser `p` après `delete p;` « parce que ça marchait en test »." },
          { label: "Mieux", value: "`p = nullptr;` juste après `delete`, ou (mieux) laissez un smart pointer gérer la durée de vie." },
        ],
      },
      {
        kind: "text",
        text: "Aucune vérification des bornes sur les tableaux bruts : corruption silencieuse.",
      },
      {
        kind: "fields",
        title: "4. Débordement de tableau",
        fields: [          { label: "Problème", value: "`int t[10]; t[10] = 5;` : écrit hors du tableau (indices 0-9)." },
          { label: "Mauvais", value: "Boucle `for (i = 0; i <= n; i++)` avec `<=` au lieu de `<`." },
          { label: "Mieux", value: "`std::vector` + `.at(i)` (vérifie les bornes, lance `std::out_of_range`) pendant le développement." },
        ],
      },
      {
        kind: "text",
        text: "La division de deux `int` est entière ; la conversion en `double` a lieu *après*.",
      },
      {
        kind: "fields",
        title: "5. Division entière surprise",
        fields: [          { label: "Problème", value: "`double m = 7 / 2;` vaut `3.0`, pas `3.5`." },
          { label: "Mauvais", value: "`double ratio = count / total; // 0.0 si count < total`" },
          { label: "Mieux", value: "`double ratio = static_cast<double>(count) / total;`" },
        ],
      },
      {
        kind: "text",
        text: "Les flottants sont des approximations : l'égalité exacte est fragile.",
      },
      {
        kind: "fields",
        title: "6. Comparer des flottants avec `==`",
        fields: [          { label: "Problème", value: "`0.1 + 0.2 == 0.3` est **faux** en binaire à virgule flottante." },
          { label: "Mauvais", value: "`if (resultat == 0.3)`" },
          { label: "Mieux", value: "`if (std::abs(resultat - 0.3) < 1e-9)` : comparez avec une tolérance (epsilon)." },
        ],
      },
      {
        kind: "text",
        text: "Les variables locales ne sont pas initialisées à zéro : lire avant d'écrire est un UB.",
      },
      {
        kind: "fields",
        title: "7. Variable non initialisée",
        fields: [          { label: "Problème", value: "`int x; std::cout << x;` affiche une valeur résiduelle quelconque." },
          { label: "Mauvais", value: "Compter sur « ça sera 0 par défaut »." },
          { label: "Mieux", value: "`int x = 0;` ou `int x{};` systématiquement. `-Wall` prévient dans les cas simples." },
        ],
      },
      {
        kind: "text",
        text: "Sans `virtual`, `delete` via le pointeur de base n'appelle pas le destructeur dérivé.",
      },
      {
        kind: "fields",
        title: "8. Oublier `virtual` au destructeur",
        fields: [          { label: "Problème", value: "`Forme* f = new Cercle(); delete f;` sans destructeur virtuel : seule la partie `Forme` est détruite." },
          { label: "Mauvais", value: "Classe avec fonctions virtuelles mais destructeur non virtuel." },
          { label: "Mieux", value: "`virtual ~Forme() = default;` dès qu'il y a une fonction virtuelle." },
        ],
      },
      {
        kind: "text",
        text: "La pile est libérée au retour : le pointeur retourné est pendant (dangling).",
      },
      {
        kind: "fields",
        title: "9. Retourner l'adresse d'un local",
        fields: [          { label: "Problème", value: "`int* f() { int x = 42; return &x; }` : `x` meurt à la fin de `f`." },
          { label: "Mauvais", value: "« Ça marche » en test car la pile n'a pas encore été réutilisée — crash plus tard." },
          { label: "Mieux", value: "Retournez par valeur (`int f()`), ou un `std::unique_ptr` / `std::string` si la donnée doit survivre." },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes et progressifs",
    level: 3,
    intro: "Quatre projets qui montent en difficulté — chacun mobilise les sections précédentes.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Analyseur de texte en CLI (débutant)",
        fields: [
          { label: "Objectif", value: "Un utilitaire `stats` qui lit un fichier texte et affiche : nombre de lignes, mots, caractères, mot le plus fréquent." },
          { label: "Compétences", value: "`std::ifstream`, `std::string`, `std::map`/`unordered_map`, arguments `argv`, compilation multi-fichiers." },
          { label: "Ce que vous apprendrez", value: "Lire des fichiers, structurer en `.h`/`.cpp`, gérer les erreurs d'ouverture." },
          { label: "Projet suivant", value: "Ajoutez des options en ligne de commande (`-l`, `-w`) parsées à la main." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Jeu de la Vie de Conway (intermédiaire)",
        fields: [
          { label: "Objectif", value: "Simuler l'automate cellulaire de Conway dans le terminal (affichage ASCII, générations successives)." },
          { label: "Compétences", value: "`std::vector` 2D, boucles, séparation moteur/affichage, CMake." },
          { label: "Ce que vous apprendrez", value: "Modéliser une grille, double buffering (deux grilles alternées), structurer un projet CMake." },
          { label: "Projet suivant", value: "Chargez la grille initiale depuis un fichier ; ajoutez un mode pas-à-pas au clavier." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Mini moteur de recherche de fichiers (intermédiaire+)",
        fields: [
          { label: "Objectif", value: "Un outil qui indexe les fichiers d'un dossier (nom, taille, mots-clés) puis répond à des requêtes en CLI." },
          { label: "Compétences", value: "`std::filesystem` (C++17), `unordered_map`, tri, mesure de performance, sanitizers." },
          { label: "Ce que vous apprendrez", value: "Parcourir l'arborescence, indexer, comparer `map` vs `unordered_map` en pratique, profiler simplement avec `chrono`." },
          { label: "Projet suivant", value: "Parallélisez l'indexation avec `std::thread` ; comparez les temps." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Allocateur mémoire pédagogique (avancé)",
        fields: [
          { label: "Objectif", value: "Implémenter un allocateur à zones (arena/bump allocator) avec tests, puis l'utiliser dans un petit programme." },
          { label: "Compétences", value: "Gestion manuelle du tas, alignement mémoire, `new`/`delete` surchargés, tests, Valgrind/ASan." },
          { label: "Ce que vous apprendrez", value: "Comment la mémoire est vraiment gérée sous le capot — le sujet qui distingue un utilisateur du C++ d'un connaisseur." },
          { label: "Projet suivant", value: "Comparez ses performances à l'allocateur système sur un benchmark simple." },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources officielles et de référence",
    level: 3,
    intro: "Les sources fiables, en priorité les références officielles.",
    blocks: [
      {
        kind: "list",
        items: [
          "**cppreference.com** — la référence du langage et de la bibliothèque standard : précise, à jour, avec exemples. Le premier réflexe face à un doute.",
          "**isocpp.org** — le site du comité C++ : actualités du standard, FAQ, pointeurs vers les ressources officielles.",
          "**C++ Core Guidelines** (isocpp.github.io/CppCoreGuidelines) — les bonnes pratiques maintenues par Bjarne Stroustrup et Herb Sutter.",
          "**learncpp.com** — tutoriel progressif et rigoureux, entièrement gratuit, couvrant le C++ moderne.",
          "**Compiler Explorer** (godbolt.org) — testez du code et voyez l'assembleur généré en direct, sans rien installer.",
          "**Documentation GCC** (gcc.gnu.org) et **Clang** (clang.llvm.org) — les options de compilation en détail.",
          "**CMake** (cmake.org) — la documentation officielle du système de build.",
        ],
      },
      {
        kind: "text",
        text: "Conseil de méthode : face à une fonction standard inconnue, cherchez `cppreference <nom>` — la page de référence répond en 30 secondes (signature, exemple, complexité).",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le C/C++ ouvre des portes que peu de langages ouvrent.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes selon votre objectif",
        fields: [
          {
            label: "Systèmes & performance",
            value: "Approfondissez l'assembleur x86/ARM (via Compiler Explorer), les systèmes d'exploitation, le réseau (sockets POSIX).",
          },
          {
            label: "Jeux vidéo",
            value: "Un moteur comme Godot (C++) ou Unreal Engine (C++) : le C++ y est la langue maternelle.",
          },
          {
            label: "Embarqué",
            value: "Microcontrôleurs (Arduino en C++, STM32 en C) : le C reste roi là où chaque octet compte.",
          },
          {
            label: "Sécurité",
            value: "Les bugs mémoire sont des failles : apprenez l'exploitation (buffer overflow) *en labo* pour écrire du code sûr.",
          },
          {
            label: "Langages modernes",
            value: "Rust reprend la promesse du C++ (performance sans GC) avec la sécurité mémoire vérifiée par le compilateur : une suite naturelle.",
          },
        ],
      },
      {
        kind: "text",
        text: "Et surtout : lisez du code C++ réel (un petit projet open source). Passer de « je connais la syntaxe » à « je lis une codebase » est la vraie étape suivante.",
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Rust : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Pédagogie centrale : l'ownership et le borrow checker, expliqués avant
 * d'être pratiqués — le compilateur comme partenaire, pas comme adversaire.
 */
export const LEARNING_RUST: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Rust, pourquoi il existe, et dans quels cas il est le bon choix.",
    blocks: [
      {
        kind: "text",
        text: "Rust est un langage de programmation système compilé, né chez Mozilla (première version stable 1.0 en 2015) et aujourd'hui développé en open source par la communauté. Sa promesse : la performance du C et du C++ (compilation native, aucun ramasse-miettes, aucune machine virtuelle) combinée à une sécurité mémoire garantie par le compilateur.",
      },
      {
        kind: "text",
        text: "L'idée centrale tient en une phrase : au lieu de détecter les bugs mémoire à l'exécution (comme un ramasse-miettes) ou de les laisser passer (comme en C/C++), Rust les rend impossibles à compiler. Le compilateur vérifie qui possède chaque donnée, qui peut la lire ou la modifier, et pendant combien de temps — avant même que le programme ne s'exécute.",
      },
      {
        kind: "fields",
        title: "Rust en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Rust est un langage compilé qui garantit la sécurité mémoire sans ramasse-miettes, grâce à un système de possession (ownership) vérifié à la compilation.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Les bugs mémoire (déréférencement nul, dépassements de tampon, courses aux données) sont la première source de vulnérabilités critiques dans les logiciels système. Rust les élimine par construction : si ça compile, ces catégories de bugs n'existent pas.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Systèmes d'exploitation, moteurs de jeu, navigateurs, outils en ligne de commande, serveurs réseau à haute performance, WebAssembly, embarqué, et partout où la fiabilité et la performance comptent simultanément.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un langage à ramasse-miettes (Go, Java), ni un langage de script (Python, JavaScript). La contrepartie de ses garanties : un compilateur exigeant qu'il faut apprendre à lire, pas à combattre.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : le compilateur comme partenaire",
    level: 1,
    intro:
      "La seule idée à retenir avant tout le reste : en Rust, le compilateur n'est pas un obstacle, c'est un relecteur infatigable.",
    blocks: [
      {
        kind: "diagram",
        title: "Le pipeline Rust, en une image",
        lines: [
          "Code source (.rs)",
          "     │",
          "     ▼",
          "rustc : vérifie l'ownership, les emprunts, les durées de vie",
          "     │  (ici que les erreurs sont attrapées — avant l'exécution)",
          "     ▼",
          "Backend LLVM : optimisation + génération de code machine",
          "     │",
          "     ▼",
          "Binaire natif autonome (pas de VM, pas de ramasse-miettes)",
        ],
      },
      {
        kind: "text",
        text: "Le choc culturel pour qui vient de Python ou JavaScript : en Rust, on passe plus de temps à satisfaire le compilateur qu'à déboguer à l'exécution. C'est un échange conscient : des erreurs de compilation parfois frustrantes contre l'absence de plantages mémoire en production. Avec l'expérience, on écrit directement du code qui compile — le fameux « si ça compile, ça marche ».",
      },
      {
        kind: "list",
        items: [
          "Chaque valeur a un propriétaire unique : quand le propriétaire disparaît, la valeur est libérée — automatiquement, sans ramasse-miettes.",
          "On peut prêter une valeur (emprunt) mais jamais la partager de façon dangereuse : soit plusieurs lecteurs, soit un seul modificateur.",
          "Pas de `null`, pas d'exceptions : l'absence de valeur (`Option`) et les erreurs (`Result`) sont des types ordinaires que le compilateur force à traiter.",
          "`cargo` est le couteau suisse : compilation, dépendances, tests, formatage et lints dans un seul outil.",
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
      "Rust ne demande aucun prérequis technique strict, mais quelques bases rendent la courbe d'apprentissage plus douce.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qui aide vraiment",
        fields: [
          {
            label: "Un terminal de base",
            value:
              "Savoir naviguer dans les dossiers (`cd`, `ls`) et lancer une commande. `cargo` fait le reste.",
          },
          {
            label: "Logique de programmation",
            value:
              "Variables, fonctions, boucles, conditions — dans n'importe quel langage. Rust réutilise ces notions avec une syntaxe proche du C.",
          },
          {
            label: "Notions de mémoire (optionnel)",
            value:
              "Pile vs tas, pointeurs : utile pour comprendre pourquoi l'ownership existe, mais pas obligatoire pour commencer.",
          },
          {
            label: "Le vrai prérequis",
            value:
              "Accepter de lire les messages du compilateur. Ils sont longs, précis, et contiennent presque toujours la solution.",
          },
        ],
      },
      {
        kind: "text",
        text: "Si vous venez de Python ou JavaScript, le choc n'est pas la syntaxe mais la rigueur : déclarer la mutabilité, gérer explicitement les erreurs, convaincre le compilateur de chaque emprunt. Si vous venez du C ou du C++, c'est l'inverse : la syntaxe est familière, mais le compilateur interdit des choses que vous faisiez « à vos risques et périls ».",
      },
    ],
  },
  {
    id: "installation-rustup",
    title: "Installation avec rustup",
    level: 2,
    intro:
      "`rustup` est l'installeur et le gestionnaire de versions officiel de Rust : c'est la méthode recommandée par le projet.",
    blocks: [
      {
        kind: "command",
        label: "Installer rustup (macOS / Linux)",
        command: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
        why: "Télécharge et exécute le script d'installation officiel depuis `sh.rustup.rs`. Il installe `rustup` lui-même, puis la chaîne d'outils stable : le compilateur `rustc`, le gestionnaire `cargo`, la bibliothèque standard et la documentation locale. Les options `--proto` et `--tlsv1.2` garantissent une connexion chiffrée au serveur.",
        verify: "Relancez votre terminal, puis `rustc --version` doit afficher quelque chose comme `rustc 1.x.y`.",
      },
      {
        kind: "text",
        text: "Sur Windows, téléchargez `rustup-init.exe` depuis le site `rustup.rs` et exécutez-le : l'assistant graphique fait la même chose. Préférez toujours `rustup` aux paquets `rust` des gestionnaires système (apt, Homebrew…) : ceux-ci sont souvent en retard de plusieurs versions, et `rustup` permet de jongler entre versions.",
      },
      {
        kind: "command",
        label: "Vérifier l'installation complète",
        command: "rustc --version && cargo --version",
        why: "`rustc` est le compilateur, `cargo` le gestionnaire de projet. Les deux doivent répondre : si `cargo` manque, l'installation est incomplète.",
        verify: "Deux lignes de version, par exemple `rustc 1.x.y` et `cargo 1.x.y` (les numéros varient selon votre installation).",
      },
      {
        kind: "fields",
        title: "Ce que rustup a installé",
        fields: [
          {
            label: "`rustc`",
            value: "Le compilateur : transforme le code source en binaire natif.",
          },
          {
            label: "`cargo`",
            value:
              "Le gestionnaire de projet : crée, compile, teste, formate et gère les dépendances.",
          },
          {
            label: "`rustup`",
            value:
              "Le gestionnaire de chaînes d'outils : installe et bascule entre versions stable, bêta et nightly.",
          },
          {
            label: "Docs locales",
            value:
              "Toute la documentation officielle en local, consultable hors ligne avec `rustup doc`.",
          },
        ],
      },
    ],
  },
  {
    id: "toolchains",
    title: "Les toolchains : stable, bêta, nightly",
    level: 2,
    intro:
      "Rust évolue vite (une version stable environ toutes les six semaines). `rustup` gère trois canaux : comprenez-les avant d'en changer.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois canaux, en une phrase chacun",
        fields: [
          {
            label: "stable",
            value:
              "Le canal par défaut : versions testées et garanties. C'est celui qu'il faut utiliser pour apprendre et pour la production.",
          },
          {
            label: "bêta",
            value:
              "La prochaine version stable en phase de test. Utile pour vérifier que votre code compilera avec la version à venir.",
          },
          {
            label: "nightly",
            value:
              "La version de développement du jour : donne accès aux fonctionnalités expérimentales, mais peut casser. Réservée aux usages avancés (certains outils et crates l'exigent).",
          },
        ],
      },
      {
        kind: "command",
        label: "Voir les toolchains installées",
        command: "rustup show",
        why: "Affiche les toolchains installées et indique laquelle est active par défaut (marquée `(default)`).",
      },
      {
        kind: "command",
        label: "Installer la nightly (si besoin)",
        command: "rustup toolchain install nightly",
        why: "Télécharge et installe la toolchain nightly à côté de la stable, sans toucher à votre installation par défaut. À n'utiliser que si une fonctionnalité expérimentale ou un outil l'exige.",
        verify: "`rustup toolchain list` doit maintenant afficher `stable` et `nightly`.",
      },
      {
        kind: "command",
        label: "Revenir à la stable par défaut",
        command: "rustup default stable",
        why: "Définit la toolchain stable comme version utilisée quand aucun projet n'impose autre chose. En cas de doute, c'est ici qu'il faut être.",
      },
      {
        kind: "command",
        label: "Mettre à jour Rust",
        command: "rustup update",
        why: "Met à jour toutes les toolchains installées vers leurs dernières versions. À lancer de temps en temps, comme n'importe quelle mise à jour.",
      },
      {
        kind: "text",
        text: "Pour figer la version d'un projet (utile en équipe ou en CI), créez un fichier `rust-toolchain.toml` à la racine avec `channel = \"stable\"` : `rustup` basculera automatiquement sur ce canal dans ce dossier. La quasi-totalité des développeurs reste sur `stable` en permanence.",
      },
    ],
  },
  {
    id: "premier-projet-cargo",
    title: "Premier projet avec Cargo",
    level: 2,
    intro:
      "En Rust, on ne crée jamais un fichier `.rs` isolé : on crée un projet Cargo. Suivez ces étapes dans votre terminal.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le projet",
            detail:
              "`cargo new bonjour_rust` crée un dossier `bonjour_rust` contenant `Cargo.toml` (la configuration du projet) et `src/main.rs` (le code source, avec un « Hello, world! » déjà écrit). Par défaut, c'est un projet binaire (un programme exécutable).",
          },
          {
            title: "Entrer dans le dossier",
            detail:
              "`cd bonjour_rust`. Toutes les commandes `cargo` suivantes se lancent depuis la racine du projet.",
          },
          {
            title: "Observer la structure",
            detail:
              "`Cargo.toml` décrit le projet (nom, version, édition) et `src/main.rs` contient le code. Retenez cette structure : vous la retrouverez dans tous les projets Rust.",
          },
          {
            title: "Compiler et exécuter",
            detail:
              "`cargo run` compile le projet puis exécute le binaire produit. Vous devez voir `Hello, world!` s'afficher.",
          },
          {
            title: "Modifier et relancer",
            detail:
              "Ouvrez `src/main.rs`, changez le texte du `println!`, relancez `cargo run`. `cargo` ne recompile que ce qui a changé : c'est rapide.",
          },
        ],
      },
      {
        kind: "command",
        label: "Créer un projet binaire",
        command: "cargo new bonjour_rust",
        why: "Génère l'arborescence minimale d'un projet exécutable : `Cargo.toml` + `src/main.rs` avec un exemple fonctionnel. C'est le point de départ standard.",
        verify: "`ls bonjour_rust` doit montrer `Cargo.toml` et le dossier `src`.",
      },
      {
        kind: "command",
        label: "Créer une bibliothèque (variante)",
        command: "cargo new ma_biblio --lib",
        why: "L'option `--lib` crée une bibliothèque réutilisable au lieu d'un exécutable : le fichier généré est `src/lib.rs` (sans fonction `main`). À utiliser quand vous écrivez du code destiné à être importé par d'autres projets.",
      },
    ],
  },
  {
    id: "cargo-build-run-check",
    title: "Compiler : build, run et check",
    level: 2,
    intro:
      "Trois commandes pour trois besoins : comprendre quand utiliser chacune, c'est comprendre la boucle de travail Rust.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier sans compiler (le plus rapide)",
        command: "cargo check",
        why: "Vérifie que le code compile — y compris toutes les règles d'ownership — sans produire de binaire. C'est beaucoup plus rapide que `cargo build` : utilisez-le en boucle pendant que vous écrivez du code.",
        verify: "Aucune erreur affichée, ou des erreurs de compilation à corriger (c'est son travail).",
      },
      {
        kind: "command",
        label: "Compiler le projet",
        command: "cargo build",
        why: "Compile réellement et produit le binaire dans `target/debug/`. Le mode `debug` par défaut privilégie la vitesse de compilation sur la performance du programme.",
      },
      {
        kind: "command",
        label: "Compiler et exécuter",
        command: "cargo run",
        why: "Combine `build` et l'exécution du binaire en une commande. En développement quotidien, c'est celle qu'on tape le plus.",
        verify: "La sortie de votre programme s'affiche dans le terminal.",
      },
      {
        kind: "command",
        label: "Compiler en mode optimisé",
        command: "cargo build --release",
        why: "Active les optimisations du compilateur (via LLVM) : compilation plus lente, mais binaire beaucoup plus rapide. Le binaire se trouve dans `target/release/`. Réservé à la version finale et aux mesures de performance.",
      },
      {
        kind: "fields",
        title: "Debug ou release ?",
        fields: [
          {
            label: "En développement",
            value:
              "`cargo build` / `cargo run` : compilation rapide, binaire non optimisé. Parfait pour itérer.",
          },
          {
            label: "En production / benchmarks",
            value:
              "`cargo build --release` : optimisations activées. Ne mesurez jamais les performances en mode debug.",
          },
          {
            label: "En écriture continue",
            value:
              "`cargo check` : la vérification la plus rapide, idéale après chaque modification.",
          },
        ],
      },
    ],
  },
  {
    id: "cargo-test-clippy-fmt",
    title: "Tester, linter, formater avec Cargo",
    level: 2,
    intro:
      "Rust intègre les outils qualité directement dans `cargo` : pas d'installation séparée, pas de configuration obligatoire.",
    blocks: [
      {
        kind: "command",
        label: "Lancer les tests",
        command: "cargo test",
        why: "Compile et exécute tous les tests du projet (fonctions annotées `#[test]`, tests d'intégration et exemples de documentation). Les tests font partie du langage, pas d'une bibliothèque externe.",
        verify: "Un résumé `test result: ok` avec le nombre de tests réussis.",
      },
      {
        kind: "command",
        label: "Analyser avec Clippy",
        command: "cargo clippy",
        why: "Clippy est le linter officiel : il signale les constructions maladroites, les erreurs courantes et les opportunités de simplification, souvent avec des explications pédagogiques. C'est un mentor automatisé.",
        verify: "Des avertissements éventuels avec suggestions, ou le silence (c'est bon signe).",
      },
      {
        kind: "command",
        label: "Formater le code",
        command: "cargo fmt",
        why: "Applique le formatage officiel à tout le projet. En Rust, le style n'est pas un débat : `cargo fmt` tranche, et tout l'écosystème suit le même style.",
      },
      {
        kind: "command",
        label: "Installer clippy et rustfmt si manquants",
        command: "rustup component add clippy rustfmt",
        why: "Sur certaines installations minimales, ces composants ne sont pas présents. Cette commande les ajoute à votre toolchain sans réinstaller Rust.",
      },
      {
        kind: "text",
        text: "Le trio gagnant avant chaque commit : `cargo fmt`, `cargo clippy`, `cargo test`. Dans cet ordre : on formate d'abord (pour que Clippy analyse du code propre), on linte, puis on teste.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et rust-analyzer",
    level: 2,
    intro:
      "Un seul composant compte vraiment : `rust-analyzer`, le serveur de langage officiel. Tous les bons éditeurs Rust l'utilisent.",
    blocks: [
      {
        kind: "fields",
        title: "Les éditeurs courants, sans classement",
        fields: [
          {
            label: "VS Code + rust-analyzer",
            value:
              "La combinaison la plus répandue : l'extension `rust-analyzer` apporte diagnostics, complétion, navigation et actions de refactoring.",
          },
          {
            label: "RustRover (JetBrains)",
            value:
              "L'IDE dédié de JetBrains, avec son propre moteur d'analyse en plus de rust-analyzer. Payant (gratuit pour les étudiants et l'open source).",
          },
          {
            label: "Neovim / Helix",
            value:
              "Éditeurs terminaux configurés pour parler à `rust-analyzer` via LSP. Pour qui vit déjà dans le terminal.",
          },
          {
            label: "Zed",
            value:
              "Éditeur récent et rapide, avec un support Rust intégré via rust-analyzer.",
          },
        ],
      },
      {
        kind: "text",
        text: "Quel que soit l'éditeur, vérifiez que `rust-analyzer` est actif : ouvrez un fichier `.rs` et constatez les erreurs soulignées en temps réel, avant même de lancer `cargo check`. Si votre éditeur affiche les types inférés en grisé à côté des variables (inlay hints), tout fonctionne.",
      },
    ],
  },
  {
    id: "configuration-editeur",
    title: "Comprendre rust-analyzer avant de le configurer",
    level: 2,
    intro:
      "Avant de copier des réglages, comprenez ce que fait chaque fonctionnalité : vous saurez ensuite lesquelles activer.",
    blocks: [
      {
        kind: "fields",
        title: "Les concepts, avant les réglages",
        fields: [
          {
            label: "Diagnostics en temps réel",
            value:
              "rust-analyzer exécute l'équivalent de `cargo check` en arrière-plan : les erreurs d'ownership apparaissent pendant la frappe, avec les mêmes messages que le compilateur.",
          },
          {
            label: "Inlay hints",
            value:
              "Les types inférés par le compilateur s'affichent en grisé (`let x = 5;` → `i32`). Idéal pour apprendre : vous voyez ce que Rust a déduit sans l'écrire.",
          },
          {
            label: "Runnables",
            value:
              "Des boutons « Run » / « Debug » apparaissent au-dessus de `fn main` et des tests : exécution en un clic, sans passer par le terminal.",
          },
          {
            label: "Navigation et refactoring",
            value:
              "Aller à la définition, trouver les usages, renommer un symbole dans tout le projet : le protocole LSP appliqué à Rust.",
          },
          {
            label: "Check via Clippy",
            value:
              "Option `rust-analyzer.check.command` : remplace le `cargo check` interne par `cargo clippy` pour voir les lints du linter directement dans l'éditeur.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concrètement, dans VS Code : installez l'extension `rust-analyzer` (pas l'ancienne extension `Rust`), ouvrez le dossier du projet (pas un fichier isolé), et laissez l'analyse se terminer — la première indexation d'un gros projet prend un peu de temps, c'est normal.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "La boucle de développement typique d'un projet Rust, une fois l'environnement en place.",
    blocks: [
      {
        kind: "diagram",
        title: "Une session de travail Rust",
        lines: [
          "Éditer le code (diagnostics rust-analyzer en direct)",
          "     │",
          "     ▼",
          "cargo check  →  corriger les erreurs du compilateur",
          "     │",
          "     ▼",
          "cargo test  →  les tests passent ?",
          "     │",
          "     ▼",
          "cargo clippy  →  appliquer les suggestions du linter",
          "     │",
          "     ▼",
          "cargo fmt  →  formater",
          "     │",
          "     ▼",
          "git commit",
        ],
      },
      {
        kind: "text",
        text: "Remarquez la place centrale du compilateur : en Rust, « ça compile » est déjà une étape de validation significative. Les erreurs que d'autres langages découvrent avec des tests ou en production, Rust les signale ici — c'est pour cela que la boucle `check → corriger` occupe une si grande place au début.",
      },
    ],
  },
  {
    id: "premiers-pas-syntaxe",
    title: "Premiers pas : anatomie d'un programme",
    level: 2,
    intro:
      "Le « Hello, world! » généré par `cargo new`, décortiqué ligne par ligne.",
    blocks: [
      {
        kind: "code",
        language: "rust",
        title: "src/main.rs — le point de départ",
        code: "fn main() {\n    // `fn main` : le point d'entrée de tout programme exécutable.\n    // Les accolades délimitent les blocs, comme en C.\n    println!(\"Bonjour, Rust !\");\n\n    let x = 5;          // `let` déclare une variable : IMMUABLE par défaut.\n    // x = 6;           // Erreur : on ne peut pas réassigner une variable immuable.\n\n    let mut y = 5;      // `mut` rend la variable mutable : réassignation autorisée.\n    y = 6;\n    println!(\"x = {x}, y = {y}\");  // Les `{}` insèrent les valeurs.\n}",
      },
      {
        kind: "fields",
        title: "Cinq choses à remarquer",
        fields: [
          {
            label: "`fn main()`",
            value:
              "Le point d'entrée : l'exécution commence toujours ici dans un binaire. Pas de classe englobante, pas de cérémonie.",
          },
          {
            label: "`println!` avec un `!`",
            value:
              "Le point d'exclamation indique une macro, pas une fonction. Les macros génèrent du code à la compilation — `println!` vérifie même le format à la compilation.",
          },
          {
            label: "`let` = immuable par défaut",
            value:
              "En Rust, une variable ne change pas sauf si vous l'autorisez explicitement. C'est un choix de sécurité : moins de mutations = moins de bugs.",
          },
          {
            label: "`let mut` = mutable",
            value:
              "Le mot-clé `mut` rend la variable réassignable. La mutabilité est toujours explicite et visible dans le code.",
          },
          {
            label: "Point-virgule",
            value:
              "Les instructions se terminent par `;`. Une expression sans `;` en fin de bloc devient la valeur retournée — notion clé pour la suite.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "ownership",
    title: "L'ownership : qui possède quoi",
    level: 3,
    intro:
      "Le concept central de Rust : chaque valeur a un propriétaire, et le compilateur suit ce propriétaire à la compilation.",
    blocks: [
      {
        kind: "fields",
        title: "L'ownership, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Chaque valeur en Rust a un unique propriétaire ; quand le propriétaire sort de son bloc, la valeur est libérée automatiquement.",
          },
          {
            label: "Pourquoi",
            value:
              "C'est le mécanisme qui remplace le ramasse-miettes : la libération mémoire est déterministe (elle a lieu à un point précis et connu) et sans coût à l'exécution, tout en évitant les doubles libérations et les fuites.",
          },
          {
            label: "Les trois règles (du Rust Book)",
            value:
              "1. Chaque valeur a un propriétaire. 2. Il n'y a qu'un seul propriétaire à la fois. 3. Quand le propriétaire sort de portée, la valeur est abandonnée (`drop`).",
          },
          {
            label: "Comment : le déplacement (move)",
            value:
              "Affecter une valeur à une autre variable ou la passer à une fonction TRANSFÈRE la propriété : l'ancienne variable ne peut plus être utilisée. Pas de copie implicite coûteuse.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Le déplacement en action",
        code: "fn main() {\n    let s1 = String::from(\"bonjour\");\n    let s2 = s1;              // DÉPLACEMENT : s1 n'est plus utilisable.\n    // println!(\"{s1}\");    // Erreur : `s1` a été déplacé vers `s2`.\n    println!(\"{s2}\");        // OK : s2 est le nouveau propriétaire.\n\n    let n1 = 5;               // Les entiers implémentent `Copy` :\n    let n2 = n1;              // copie simple, n1 reste utilisable.\n    println!(\"{n1} et {n2}\"); // OK.\n\n    let s3 = s2.clone();      // `clone()` : copie profonde EXPLICITE.\n    println!(\"{s2} et {s3}\"); // OK : les deux existent.\n} // Ici, s2 et s3 sont libérés automatiquement (`drop`), dans l'ordre inverse.",
      },
      {
        kind: "fields",
        title: "Trois façons de transférer ou dupliquer",
        fields: [
          {
            label: "Move (par défaut)",
            value:
              "Le transfert de propriété. Rapide (quelques pointeurs copiés), mais l'ancienne variable est invalidée. C'est le comportement des types complexes comme `String` ou `Vec`.",
          },
          {
            label: "Copy (opt-in)",
            value:
              "Les types simples (`i32`, `bool`, `char`, les tuples de `Copy`…) implémentent le trait `Copy` : l'affectation duplique la valeur bit à bit, l'ancienne variable reste valide.",
          },
          {
            label: "Clone (explicite)",
            value:
              "La méthode `.clone()` fait une copie profonde coûteuse (ex. dupliquer tout le contenu d'une `String`). Toujours explicite : en Rust, aucun coût caché.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : le `move` par défaut vous protège des copies accidentelles coûteuses. Quand le compilateur refuse d'utiliser une variable déplacée, demandez-vous qui devrait vraiment posséder cette valeur — la réponse clarifie souvent la conception du code.",
      },
    ],
  },
  {
    id: "emprunt-immutable",
    title: "L'emprunt immuable : prêter sans donner",
    level: 3,
    intro:
      "Transférer la propriété à chaque appel de fonction serait impraticable : l'emprunt permet d'utiliser une valeur sans en devenir propriétaire.",
    blocks: [
      {
        kind: "fields",
        title: "La référence `&T`, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une référence `&T` permet d'utiliser une valeur sans en prendre possession : on l'emprunte, le propriétaire la récupère ensuite intacte.",
          },
          {
            label: "Pourquoi",
            value:
              "Sans emprunt, chaque fonction qui lit une `String` devrait en devenir propriétaire puis la rendre — impraticable. L'emprunt rend le partage de lecture sûr et gratuit.",
          },
          {
            label: "Quand",
            value:
              "Passer des données en lecture seule aux fonctions : c'est le cas le plus fréquent en Rust (`&String`, `&Vec<T>`, `&str`).",
          },
          {
            label: "La règle",
            value:
              "On peut avoir AUTANT de références immuables que l'on veut simultanément : la lecture partagée est toujours sûre.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Emprunter au lieu de prendre",
        code: "fn longueur(texte: &String) -> usize {\n    // `texte` est une RÉFÉRENCE : la fonction l'utilise sans la posséder.\n    texte.len()\n} // La référence disparaît ici, mais la `String` n'est PAS libérée.\n\nfn main() {\n    let s = String::from(\"bonjour\");\n    let n = longueur(&s);   // On prête `s` : `&s` crée la référence.\n    println!(\"\\\"{s}\\\" fait {n} caractères\");  // `s` est toujours utilisable !\n}",
      },
      {
        kind: "fields",
        title: "Concepts liés",
        fields: [
          {
            label: "Déréférencement",
            value:
              "L'opérateur `*` permet de suivre une référence pour accéder à la valeur (`*ref`). En pratique, Rust le fait souvent pour vous (ex. `ref.len()` fonctionne).",
          },
          {
            label: "Référence vs pointeur",
            value:
              "Contrairement aux pointeurs C, une référence Rust est garantie valide par le compilateur : jamais de pointeur nul, jamais de pointeur pendouillant.",
          },
        ],
      },
    ],
  },
  {
    id: "emprunt-mutable",
    title: "L'emprunt mutable : un seul modificateur",
    level: 3,
    intro:
      "Lire à plusieurs est sûr ; modifier à plusieurs ne l'est pas. D'où la règle la plus célèbre de Rust.",
    blocks: [
      {
        kind: "fields",
        title: "La référence `&mut T`, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une référence mutable `&mut T` permet de modifier une valeur empruntée, mais il ne peut en exister qu'une seule à la fois.",
          },
          {
            label: "Pourquoi",
            value:
              "Les courses aux données (deux codes qui modifient la même mémoire simultanément) sont une source majeure de bugs critiques et quasi impossibles à reproduire. En interdisant le partage mutable, Rust les rend impossibles à compiler.",
          },
          {
            label: "La règle XOR",
            value:
              "À un instant donné : SOIT un nombre quelconque de références immuables (`&T`), SOIT exactement une référence mutable (`&mut T`). Jamais les deux mélangés.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `mut` des deux côtés : la variable ET la référence doivent être mutables (`let mut x` puis `&mut x`).",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Modifier via un emprunt mutable",
        code: "fn ajouter_point(texte: &mut String) {\n    texte.push('.');   // Modification autorisée via `&mut`.\n}\n\nfn main() {\n    let mut s = String::from(\"bonjour\");  // La variable ELLE-MÊME doit être `mut`.\n    ajouter_point(&mut s);                 // On prête en mode mutable.\n    println!(\"{s}\");                      // Affiche \"bonjour.\"\n\n    // let r1 = &mut s;\n    // let r2 = &mut s;   // Erreur : un seul emprunt mutable à la fois.\n}",
      },
      {
        kind: "text",
        text: "Bonne pratique : préférez toujours `&T` (immuable) par défaut et ne passez à `&mut T` que lorsque la modification est réellement nécessaire. La plupart des fonctions n'ont besoin que de lire leurs arguments.",
      },
    ],
  },
  {
    id: "slices",
    title: "Les slices : des vues sans copie",
    level: 3,
    intro:
      "Comment « découper » une chaîne ou un tableau sans le copier — et sans risquer de pointeur invalide.",
    blocks: [
      {
        kind: "fields",
        title: "Les slices, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un slice (`&str`, `&[T]`) est une vue en lecture seule sur une portion de données possédées ailleurs : pas de copie, pas de propriété.",
          },
          {
            label: "Pourquoi",
            value:
              "Retourner un indice (position du premier mot) plutôt que le mot lui-même crée un risque : si la chaîne est modifiée, l'indice devient faux. Le slice lie la vue aux données — le compilateur empêche toute modification tant que la vue existe.",
          },
          {
            label: "`&str` vs `String`",
            value:
              "`String` = chaîne possédée, modifiable, allouée sur le tas. `&str` = tranche de chaîne empruntée (souvent un littéral comme `\"bonjour\"`, qui est un `&'static str`). En paramètre de fonction, préférez `&str` : il accepte les deux.",
          },
          {
            label: "Quand",
            value:
              "Découper du texte, passer des portions de tableaux aux fonctions, travailler sur des données sans les copier.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "L'exemple classique : premier mot",
        code: "fn premier_mot(texte: &str) -> &str {\n    // Retourne une VUE sur le début de `texte`, sans rien copier.\n    match texte.find(' ') {\n        Some(i) => &texte[..i],  // Slice du début jusqu'à l'espace.\n        None => texte,            // Pas d'espace : toute la chaîne.\n    }\n}\n\nfn main() {\n    let phrase = String::from(\"bonjour le monde\");\n    let mot = premier_mot(&phrase);  // `mot` emprunte `phrase`...\n    // phrase.clear();               // Erreur ! On ne modifie pas pendant un emprunt.\n    println!(\"Premier mot : {mot}\");\n}",
      },
      {
        kind: "text",
        text: "C'est exactement le bug que les slices préviennent : en C, vider la chaîne après avoir noté l'indice du mot donnerait un résultat corrompu en silence. En Rust, le compilateur refuse — la ligne fautive est commentée ci-dessus, essayez de la décommenter pour voir le message.",
      },
    ],
  },
  {
    id: "lire-erreurs-compilateur",
    title: "Lire les erreurs du compilateur",
    level: 3,
    intro:
      "Les messages de `rustc` sont longs pour une bonne raison : ils contiennent le diagnostic ET souvent la correction. Apprenez à les lire.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Anatomie d'une erreur typique",
        code: "error[E0382]: borrow of moved value: `s`     <- code d'erreur + résumé\n --> src/main.rs:5:20                        <- fichier, ligne, colonne\n  |\n3 |     let s = String::from(\"hello\");\n  |         - move occurs because `s` has type `String`, which does not\n  |           implement the `Copy` trait      <- OÙ le problème est né\n4 |     prend(s);\n  |             - value moved here            <- CE QUI a causé le problème\n5 |     println!(\"{s}\");\n  |                    ^ value borrowed here after move   <- OÙ ça casse\n  |\nhelp: consider cloning the value if the performance cost is acceptable\n      |                                           <- SUGGESTION de correction\n5 |     println!(\"{}\", s.clone());",
      },
      {
        kind: "fields",
        title: "Méthode de lecture en 4 étapes",
        fields: [
          {
            label: "1. Le code d'erreur",
            value:
              "`E0382`, `E0499`… : chaque erreur a un code stable et documenté. Il pointe vers une page d'explication détaillée.",
          },
          {
            label: "2. Les pointeurs `^` et `-`",
            value:
              "Ils montrent exactement les lignes et colonnes concernées : où la valeur est née, où elle a été déplacée, où on tente de l'utiliser.",
          },
          {
            label: "3. La section `help`",
            value:
              "Le compilateur propose souvent la correction (`clone()`, ajouter `mut`, etc.). Elle n'est pas toujours idéale, mais c'est un excellent point de départ.",
          },
          {
            label: "4. `rustc --explain`",
            value:
              "La commande `rustc --explain E0382` affiche une explication complète avec exemples. C'est la documentation intégrée des erreurs.",
          },
        ],
      },
      {
        kind: "command",
        label: "Expliquer un code d'erreur",
        command: "rustc --explain E0382",
        why: "Affiche l'explication détaillée officielle de l'erreur E0382 (utilisation d'une valeur déplacée), avec des exemples de code fautif et corrigé. À utiliser dès qu'un message reste obscur.",
      },
      {
        kind: "text",
        text: "Réflexe à développer : ne lisez pas seulement la première ligne. Les erreurs Rust se lisent de haut en bas comme un récit — « voici la valeur, voici ce qui lui est arrivé, voici où ça coince, voici comment réparer ». Avec l'habitude, on repère la solution en quelques secondes.",
      },
    ],
  },
  {
    id: "erreurs-emprunt-1",
    title: "Erreurs du borrow checker (1/2)",
    level: 3,
    intro:
      "Les quatre erreurs d'emprunt que tout débutant rencontre : le problème, la cause, le code fautif et sa correction.",
    blocks: [
      {
        kind: "fields",
        title: "Erreur 1 — utilisation après déplacement (E0382)",
        fields: [
          {
            label: "Problème",
            value: "`borrow of moved value` : on utilise une variable après l'avoir donnée.",
          },
          {
            label: "Pourquoi",
            value:
              "La propriété a été transférée : l'ancienne variable n'existe plus logiquement. L'utiliser serait un use-after-free.",
          },
          {
            label: "Mauvais",
            value: "`let s2 = s1; println!(\"{s1}\");` — `s1` a été déplacé vers `s2`.",
          },
          {
            label: "Mieux",
            value:
              "Utiliser `s2` (le nouveau propriétaire), ou cloner explicitement : `let s2 = s1.clone();`, ou emprunter : `prendre(&s1);`.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 2 — double emprunt mutable (E0499)",
        fields: [
          {
            label: "Problème",
            value: "`cannot borrow as mutable more than once at a time` : deux `&mut` simultanés.",
          },
          {
            label: "Pourquoi",
            value:
              "Deux modificateurs simultanés = course aux données potentielle. La règle XOR l'interdit.",
          },
          {
            label: "Mauvais",
            value: "`let a = &mut x; let b = &mut x;` — deux emprunts mutables qui se chevauchent.",
          },
          {
            label: "Mieux",
            value:
              "Limiter la portée du premier emprunt avec un bloc `{ }`, ou restructurer pour n'avoir qu'un seul point de modification à la fois.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 3 — mutable + immuable mélangés (E0502)",
        fields: [
          {
            label: "Problème",
            value:
              "`cannot borrow as mutable because it is also borrowed as immutable` : on modifie pendant qu'on lit.",
          },
          {
            label: "Pourquoi",
            value:
              "Un lecteur (`&`) s'attend à ce que la donnée ne change pas sous ses yeux. Modifier pendant une lecture casse cette garantie.",
          },
          {
            label: "Mauvais",
            value:
              "`let r = &v; v.push(1); println!(\"{r}\");` — lecture empruntée puis modification.",
          },
          {
            label: "Mieux",
            value:
              "Terminer l'utilisation de `r` avant de modifier, ou cloner la donnée lue si les deux doivent coexister.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 4 — référence vers une variable locale (E0515)",
        fields: [
          {
            label: "Problème",
            value: "`cannot return reference to local variable` : retourner un emprunt sur une donnée qui va mourir.",
          },
          {
            label: "Pourquoi",
            value:
              "La variable locale est libérée à la fin de la fonction : la référence retournerait un pointeur pendouillant.",
          },
          {
            label: "Mauvais",
            value: "`fn f() -> &String { let s = String::from(\"x\"); &s }` — `s` meurt à la fin de `f`.",
          },
          {
            label: "Mieux",
            value:
              "Retourner la valeur possédée (`-> String`) au lieu d'une référence : le transfert de propriété résout le problème.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-emprunt-2",
    title: "Erreurs du borrow checker (2/2)",
    level: 3,
    intro:
      "Quatre autres erreurs classiques : types, durées de vie et mutabilité oubliée.",
    blocks: [
      {
        kind: "fields",
        title: "Erreur 5 — déplacer hors d'un emprunt (E0507)",
        fields: [
          {
            label: "Problème",
            value: "`cannot move out of borrowed content` : extraire une valeur possédée depuis derrière une référence.",
          },
          {
            label: "Pourquoi",
            value:
              "On ne peut pas voler la propriété d'une donnée qu'on a seulement empruntée : le propriétaire d'origine s'attend à la récupérer intacte.",
          },
          {
            label: "Mauvais",
            value: "`let v = vec![String::from(\"a\")]; let s = v[0];` — déplace hors du vecteur emprunté.",
          },
          {
            label: "Mieux",
            value:
              "Cloner (`v[0].clone()`), emprunter (`&v[0]`), ou utiliser `v.remove(0)` / `v.swap_remove(0)` qui rendent la propriété proprement.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 6 — `String` vs `&str` (E0308)",
        fields: [
          {
            label: "Problème",
            value: "`mismatched types: expected &str, found String` : confusion entre chaîne possédée et tranche.",
          },
          {
            label: "Pourquoi",
            value:
              "Ce sont deux types distincts : `String` (possédée, sur le tas) et `&str` (vue empruntée). Le compilateur ne convertit jamais implicitement.",
          },
          {
            label: "Mauvais",
            value: "`fn f(s: &str) { }` appelée avec `f(ma_string)` où `ma_string: String`.",
          },
          {
            label: "Mieux",
            value:
              "Emprunter explicitement : `f(&ma_string)` (déréférencement automatique `&String` → `&str`), ou `.as_str()`.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 7 — durée de vie manquante (E0106)",
        fields: [
          {
            label: "Problème",
            value: "`missing lifetime specifier` : une fonction retourne une référence sans préciser sa durée de validité.",
          },
          {
            label: "Pourquoi",
            value:
              "Le compilateur doit garantir que la référence retournée ne survit pas aux données. Avec deux paramètres références, il ne peut pas deviner laquelle survit.",
          },
          {
            label: "Mauvais",
            value: "`fn longest(x: &str, y: &str) -> &str` — quelle entrée la sortie emprunte-t-elle ?",
          },
          {
            label: "Mieux",
            value:
              "Annoter : `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str` — la sortie vit aussi longtemps que la plus courte des deux entrées.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 8 — `mut` oublié (E0596)",
        fields: [
          {
            label: "Problème",
            value: "`cannot borrow as mutable, as it is not declared as mutable` : emprunt mutable d'une variable immuable.",
          },
          {
            label: "Pourquoi",
            value:
              "La mutabilité se déclare à la source : une variable `let` (immuable) ne peut pas être empruntée en `&mut`, même via une référence.",
          },
          {
            label: "Mauvais",
            value: "`let x = 5; let r = &mut x;` — `x` n'est pas déclarée `mut`.",
          },
          {
            label: "Mieux",
            value:
              "`let mut x = 5; let r = &mut x;` — la mutabilité doit être explicite des deux côtés.",
          },
        ],
      },
      {
        kind: "text",
        text: "Notez le point commun : chaque erreur protège contre un bug réel (use-after-free, course aux données, pointeur pendouillant, corruption silencieuse). Quand le borrow checker vous arrête, demandez-vous quel bug il vient d'empêcher — c'est la meilleure façon d'apprendre.",
      },
    ],
  },
  {
    id: "types-scalaires",
    title: "Les types scalaires",
    level: 3,
    intro:
      "Rust est statique et fortement typé : chaque valeur a un type connu à la compilation, sans conversion implicite.",
    blocks: [
      {
        kind: "table",
        headers: ["Famille", "Types", "Détails"],
        rows: [
          [
            "Entiers signés",
            "`i8`, `i16`, `i32`, `i64`, `i128`, `isize`",
            "Le nombre = les bits. `isize` dépend de l'architecture (pointeur).",
          ],
          [
            "Entiers non signés",
            "`u8`, `u16`, `u32`, `u64`, `u128`, `usize`",
            "`u8` = un octet. `usize` pour les tailles et indices.",
          ],
          [
            "Flottants",
            "`f32`, `f64`",
            "Standard IEEE 754. `f64` par défaut (plus précis).",
          ],
          ["Booléen", "`bool`", "`true` / `false`. Un octet en mémoire."],
          [
            "Caractère",
            "`char`",
            "4 octets : une valeur scalaire Unicode (`'a'`, `'é'`, `'🦀'`). Pas un octet ASCII comme en C.",
          ],
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Inférence et annotations",
        code: "let x = 5;            // Inféré comme `i32` (entier par défaut).\nlet y: u64 = 5;       // Annotation explicite quand nécessaire.\nlet pi = 3.14;        // Inféré comme `f64` (flottant par défaut).\nlet actif = true;     // `bool`.\nlet crabe = '🦀';      // `char` : 4 octets, Unicode complet.\n\n// Pas de conversion implicite, même entre entiers :\n// let z = x + y;      // Erreur : `i32` + `u64` interdit.\nlet z = x as i64 + y as i64;  // Conversion EXPLICITE avec `as`.",
      },
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          {
            label: "Inférence",
            value:
              "Le compilateur déduit les types dans la plupart des cas (`let x = 5` → `i32`) : on annote quand c'est ambigu ou pour la lisibilité.",
          },
          {
            label: "Pas de conversion magique",
            value:
              "Additionner un `i32` et un `u64` est une erreur de compilation, pas un comportement subtil à l'exécution. La conversion est toujours explicite (`as`, `from`, `try_into`).",
          },
          {
            label: "Débordements",
            value:
              "En mode debug, un dépassement d'entier provoque un `panic` (erreur visible) ; en mode release, il s'enroule (comportement documenté). Pour un contrôle fin : `checked_add`, `saturating_add`, `wrapping_add`.",
          },
        ],
      },
    ],
  },
  {
    id: "tuples-et-tableaux",
    title: "Tuples et tableaux",
    level: 3,
    intro:
      "Deux façons de grouper des valeurs de taille fixe : hétérogènes (tuples) ou homogènes (tableaux).",
    blocks: [
      {
        kind: "code",
        language: "rust",
        title: "Tuples et tableaux en pratique",
        code: "// Tuple : types différents autorisés, taille fixe.\nlet point: (i32, i32, &str) = (3, 4, \"origine\");\nlet (x, y, nom) = point;      // Déstructuration.\nprintln!(\"{} : ({}, {})\", nom, x, y);\nprintln!(\"Accès par index : {}\", point.0);  // `.0`, `.1`...\n\n// Tableau : même type, taille fixe CONNUE À LA COMPILATION.\nlet notes: [i32; 5] = [12, 15, 9, 18, 14];\nlet zeros = [0; 100];          // 100 zéros : `[valeur; taille]`.\nprintln!(\"Première note : {}\", notes[0]);\n\n// Sécurité : l'accès hors limites est VÉRIFIÉ à l'exécution.\n// println!(\"{}\", notes[10]);  // Panic propre, jamais de lecture sauvage.",
      },
      {
        kind: "fields",
        title: "Tuple ou tableau ?",
        fields: [
          {
            label: "Tuple",
            value:
              "Groupe hétérogène de taille fixe : retourner plusieurs valeurs d'une fonction, coordonnées `(x, y)`. Accès par `.0`, `.1` ou déstructuration.",
          },
          {
            label: "Tableau `[T; N]`",
            value:
              "Éléments de même type, taille `N` fixée à la compilation, alloué sur la pile. Idéal pour les données de taille connue et petite.",
          },
          {
            label: "`Vec<T>` (à venir)",
            value:
              "Quand la taille varie à l'exécution, on utilise `Vec<T>` (voir la section Collections) : le tableau est pour le fixe.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier que la taille du tableau fait partie de son type : `[i32; 5]` et `[i32; 6]` sont deux types différents, incompatibles.",
          },
        ],
      },
    ],
  },
  {
    id: "structs",
    title: "Les structs : structurer des données",
    level: 3,
    intro:
      "L'équivalent des classes de données (sans héritage) : un struct regroupe des champs nommés sous un type.",
    blocks: [
      {
        kind: "fields",
        title: "Les structs, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un `struct` définit un type composé de champs nommés, avec des méthodes associées via des blocs `impl`.",
          },
          {
            label: "Pourquoi",
            value:
              "Regrouper des données qui vont ensemble sous un nom explicite, avec un comportement attaché — sans la complexité de l'héritage.",
          },
          {
            label: "Quand",
            value:
              "Modéliser une entité du domaine : utilisateur, configuration, point géométrique, résultat d'analyse.",
          },
          {
            label: "Bonne pratique",
            value:
              "Dérivez `#[derive(Debug)]` sur vos structs : `println!(\"{:?}\", obj)` affichera le contenu pour le débogage, gratuitement.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Struct, méthodes et constructeur idiomatique",
        code: "#[derive(Debug)]\nstruct Utilisateur {\n    nom: String,       // Chaque champ a un type ; le struct POSSÈDE ses données.\n    age: u32,\n    actif: bool,\n}\n\nimpl Utilisateur {\n    // Constructeur idiomatique : une fonction associée qui retourne `Self`.\n    fn nouveau(nom: String, age: u32) -> Self {\n        Self { nom, age, actif: true }\n    }\n\n    // Méthode : `&self` = emprunt immuable de l'instance.\n    fn presentation(&self) -> String {\n        format!(\"{} ({} ans)\", self.nom, self.age)\n    }\n\n    // Méthode mutable : `&mut self` pour modifier.\n    fn desactiver(&mut self) {\n        self.actif = false;\n    }\n}\n\nfn main() {\n    let mut u = Utilisateur::nouveau(String::from(\"Akane\"), 25);\n    println!(\"{:?}\", u);              // Grâce à `#[derive(Debug)]`.\n    println!(\"{}\", u.presentation());\n    u.desactiver();\n}",
      },
      {
        kind: "text",
        text: "Notez l'absence de `null` : un champ optionnel s'écrit `Option<String>`, pas « une String qui peut être nulle ». Et l'absence d'héritage : en Rust, on compose (un struct contient d'autres structs) plutôt qu'on hérite — les comportements partagés passent par les traits (voir plus loin).",
      },
    ],
  },
  {
    id: "enums",
    title: "Les enums : des types à variantes",
    level: 3,
    intro:
      "Bien plus que les enums du C : en Rust, chaque variante peut transporter des données différentes.",
    blocks: [
      {
        kind: "fields",
        title: "Les enums, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une `enum` définit un type qui peut être exactement l'une de ses variantes, chacune pouvant embarquer des données.",
          },
          {
            label: "Pourquoi",
            value:
              "Modéliser des états exclusifs (un message est SOIT du texte SOIT une image, jamais les deux) : le compilateur garantit qu'on traite tous les cas.",
          },
          {
            label: "Quand",
            value:
              "États d'une machine, types de messages, résultats d'opérations, erreurs métier — partout où « soit l'un, soit l'autre ».",
          },
          {
            label: "Erreur fréquente",
            value:
              "Penser « enum C » (simple liste de constantes) : en Rust, les variantes portent des données et s'exploitent avec `match`.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Des variantes qui transportent des données",
        code: "enum Message {\n    Quitter,                          // Variante sans donnée.\n    Texte(String),                    // Variante avec une String.\n    Image { largeur: u32, hauteur: u32 },  // Variante avec champs nommés.\n    Deplacer { x: i32, y: i32 },\n}\n\nfn traiter(msg: Message) {\n    // `match` OBLIGE à traiter chaque variante : l'oubli ne compile pas.\n    match msg {\n        Message::Quitter => println!(\"Au revoir\"),\n        Message::Texte(t) => println!(\"Texte : {t}\"),\n        Message::Image { largeur, hauteur } => {\n            println!(\"Image {largeur}x{hauteur}\")\n        }\n        Message::Deplacer { x, y } => println!(\"Vers ({x}, {y})\"),\n    }\n}",
      },
      {
        kind: "text",
        text: "`Option<T>` et `Result<T, E>` — les deux types les plus importants de Rust — sont des enums de la bibliothèque standard. Les comprendre, c'est comprendre comment Rust gère l'absence de valeur et les erreurs sans `null` ni exceptions.",
      },
    ],
  },
  {
    id: "pattern-matching",
    title: "Le pattern matching : `match` et `if let`",
    level: 3,
    intro:
      "L'outil qui exploite les enums : un `match` compare une valeur à des motifs et force l'exhaustivité.",
    blocks: [
      {
        kind: "code",
        language: "rust",
        title: "`match` exhaustif et `if let` concis",
        code: "enum Ticket { Standard, Vip(String), Gratuit }\n\nfn prix(t: Ticket) -> u32 {\n    match t {\n        Ticket::Standard => 20,\n        Ticket::Vip(code) => {\n            println!(\"Code VIP : {code}\");\n            100\n        }\n        Ticket::Gratuit => 0,\n        // Si on oublie une variante : ERREUR de compilation.\n        // `_ => ...` : motif attrape-tout quand on veut ignorer des cas.\n    }\n}\n\nfn main() {\n    let t = Ticket::Vip(String::from(\"GOLD\"));\n\n    // `if let` : quand un seul cas nous intéresse.\n    if let Ticket::Vip(code) = t {\n        println!(\"Bienvenue, détenteur du code {code}\");\n    }\n    // Note : `t` a été déplacé dans le `if let` (match sur la valeur).\n    // Pour l'emprunter : `if let Ticket::Vip(code) = &t`.\n}",
      },
      {
        kind: "fields",
        title: "Les motifs essentiels",
        fields: [
          {
            label: "`match`",
            value:
              "Compare une valeur à une série de motifs, exécute le premier qui correspond. Exhaustif : tous les cas doivent être couverts.",
          },
          {
            label: "`if let`",
            value:
              "Sucre syntaxique pour un `match` à un seul motif intéressant + attrape-tout implicite. Parfait pour `Option` et `Result`.",
          },
          {
            label: "`_` (underscore)",
            value:
              "Motif attrape-tout : ignore la valeur. En `match`, il rend l'exhaustivité explicite pour les cas non traités.",
          },
          {
            label: "Gardes `if`",
            value:
              "`Some(x) if x > 10 => ...` : un motif peut être affiné par une condition supplémentaire.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier qu'un `match` sur une valeur la déplace : utilisez `match &valeur` ou des motifs `ref`/`&` pour emprunter au lieu de prendre.",
          },
        ],
      },
    ],
  },
  {
    id: "option-pas-de-null",
    title: "`Option<T>` : l'absence de valeur sans `null`",
    level: 3,
    intro:
      "Rust n'a pas de `null` : l'absence éventuelle de valeur est un type ordinaire, `Option<T>`, que le compilateur force à traiter.",
    blocks: [
      {
        kind: "fields",
        title: "`Option`, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "`Option<T>` vaut soit `Some(valeur)`, soit `None` : c'est une enum qui rend l'absence de valeur explicite dans le type.",
          },
          {
            label: "Pourquoi",
            value:
              "Le déréférencement de `null` est l'erreur la plus coûteuse de l'histoire du logiciel (« l'erreur à un milliard de dollars »). En Rust, une valeur est présente ou son type dit qu'elle peut manquer — jamais les deux en silence.",
          },
          {
            label: "Quand",
            value:
              "Recherche dans une collection (trouvé / pas trouvé), configuration optionnelle, tout résultat « peut-être absent ».",
          },
          {
            label: "Comment l'exploiter",
            value:
              "`match`, `if let`, ou les combinateurs : `.unwrap_or(valeur)`, `.map(...)`, `.unwrap_or_default()`. `?` propage le `None` (voir `Result`).",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Traiter l'absence explicitement",
        code: "fn trouver_indice(notes: &[i32], cible: i32) -> Option<usize> {\n    notes.iter().position(|&n| n == cible)  // `Some(i)` ou `None`.\n}\n\nfn main() {\n    let notes = [12, 15, 9];\n\n    // 1. Avec `match` : les deux cas sont obligatoires.\n    match trouver_indice(&notes, 15) {\n        Some(i) => println!(\"Trouvé à l'indice {i}\"),\n        None => println!(\"Absent\"),\n    }\n\n    // 2. Avec `if let` : seul le cas intéressant.\n    if let Some(i) = trouver_indice(&notes, 99) {\n        println!(\"Trouvé à l'indice {i}\");\n    }\n\n    // 3. Avec un combinateur : valeur par défaut.\n    let i = trouver_indice(&notes, 99).unwrap_or(0);\n    println!(\"Indice (ou 0) : {i}\");\n}",
      },
      {
        kind: "text",
        text: "Bonne pratique : `.unwrap()` (qui panique sur `None`) est acceptable dans les exemples, les tests et les prototypes — jamais dans le code qui traite des données réelles. Préférez `unwrap_or`, `expect` (avec un message explicite) ou la propagation avec `?`.",
      },
    ],
  },
  {
    id: "result-gestion-erreurs",
    title: "`Result<T, E>` : les erreurs sans exceptions",
    level: 3,
    intro:
      "Rust n'a pas d'exceptions : les opérations qui peuvent échouer retournent `Result<T, E>`, et l'opérateur `?` propage l'erreur proprement.",
    blocks: [
      {
        kind: "fields",
        title: "`Result`, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "`Result<T, E>` vaut soit `Ok(valeur)` en cas de succès, soit `Err(erreur)` en cas d'échec : l'échec fait partie du type retourné.",
          },
          {
            label: "Pourquoi",
            value:
              "Les exceptions créent des chemins d'erreur invisibles : on ne sait pas quelles fonctions peuvent échouer sans lire leur code. Avec `Result`, l'échec est visible dans la signature et le compilateur force son traitement.",
          },
          {
            label: "L'opérateur `?`",
            value:
              "Placé après un `Result`, il retourne la valeur si `Ok`, ou retourne immédiatement l'erreur à l'appelant si `Err`. C'est la propagation d'erreur en un caractère.",
          },
          {
            label: "Exemple simple",
            value:
              "Ouvrir un fichier, lire du réseau, parser du JSON : toutes ces opérations retournent un `Result`.",
          },
          {
            label: "Exemple réel",
            value:
              "Un serveur qui lit un fichier de configuration au démarrage : si le fichier manque, l'erreur remonte proprement jusqu'au `main` qui affiche un message clair au lieu de planter.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Propager les erreurs avec `?`",
        code: "use std::fs;\n\n// `-> Result<..., std::io::Error>` : l'échec est dans la signature.\nfn lire_config(chemin: &str) -> Result<String, std::io::Error> {\n    let contenu = fs::read_to_string(chemin)?;  // `?` : si Err, on retourne l'erreur.\n    Ok(contenu)   // `Ok(...)` : on emballe le succès.\n}\n\nfn main() -> Result<(), std::io::Error> {\n    // `main` peut lui aussi retourner un `Result` : `?` y est autorisé.\n    let config = lire_config(\"config.txt\")?;\n    println!(\"Config : {config}\");\n    Ok(())  // `()` = le tuple vide, l'équivalent de « rien ».\n}",
      },
      {
        kind: "fields",
        title: "Concepts liés",
        fields: [
          {
            label: "`anyhow` / `thiserror`",
            value:
              "Deux crates quasi standard pour les erreurs : `anyhow` pour les applications (erreurs simples avec contexte), `thiserror` pour les bibliothèques (types d'erreur sur mesure).",
          },
          {
            label: "`unwrap` / `expect`",
            value:
              "Extraient la valeur ou paniquent. `expect(\"message\")` est préférable à `unwrap()` : le message explique l'invariant supposé.",
          },
        ],
      },
    ],
  },
  {
    id: "panic-vs-result",
    title: "`panic!` : quand planter est légitime",
    level: 3,
    intro:
      "Le `panic` arrête le programme avec un message : c'est l'outil des erreurs irrécupérables, pas de la gestion d'erreurs courante.",
    blocks: [
      {
        kind: "fields",
        title: "Le panic, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un `panic!` déroule la pile (`unwinding`), exécute les destructeurs, puis termine le programme avec un message d'erreur.",
          },
          {
            label: "Quand c'est légitime",
            value:
              "Bugs du programmeur (indice hors limites, invariant violé), prototypes, exemples de documentation, tests (`assert!` panique en cas d'échec — c'est voulu).",
          },
          {
            label: "Quand c'est une faute",
            value:
              "Données d'entrée invalides, fichier manquant, réseau coupé : ce sont des erreurs RÉCUPÉRABLES, à modéliser avec `Result`, jamais avec `panic`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Abuser de `.unwrap()` sur des `Result` issus d'opérations réelles (fichiers, réseau, parsing) : le premier fichier manquant fait planter le programme en production.",
          },
          {
            label: "Bonne pratique",
            value:
              "Si vous devez extraire une valeur en sachant qu'elle existe, utilisez `.expect(\"raison explicite\")` : le message documente l'invariant et aide au débogage.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Panics légitimes vs abus",
        code: "// LÉGITIME : invariant du programmeur, dans un test.\n#[test]\nfn test_addition() {\n    assert_eq!(2 + 2, 4);  // Échoue => panic => le test échoue. C'est voulu.\n}\n\n// LÉGITIME : exemple pédagogique, entrée contrôlée.\nlet n: u32 = \"42\".parse().expect(\"le littéral est un nombre valide\");\n\n// ABUSIF : entrée réelle de l'utilisateur.\n// let age: u32 = input.parse().unwrap();  // Un texte non numérique = plantage !\n// MIEUX : gérer le Result.\nmatch input.trim().parse::<u32>() {\n    Ok(age) => println!(\"Âge : {age}\"),\n    Err(_) => println!(\"Veuillez entrer un nombre.\"),\n}",
      },
    ],
  },
  {
    id: "generiques",
    title: "Les génériques",
    level: 3,
    intro:
      "Écrire du code qui fonctionne pour plusieurs types, sans duplication et sans coût à l'exécution.",
    blocks: [
      {
        kind: "fields",
        title: "Les génériques, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un type ou une fonction générique (`<T>`) est un modèle : le compilateur génère une version spécialisée pour chaque type concret utilisé.",
          },
          {
            label: "Pourquoi",
            value:
              "Éviter de dupliquer la même logique pour `i32`, `f64`, `String`… tout en gardant la vérification statique des types (contrairement aux `void*` du C).",
          },
          {
            label: "La monomorphisation",
            value:
              "À la compilation, Rust crée une copie du code générique par type concret : zéro coût à l'exécution (pas de dispatch dynamique), au prix d'un binaire un peu plus gros.",
          },
          {
            label: "Les bornes (`T: Trait`)",
            value:
              "On restreint `T` avec des traits : `T: PartialOrd` signifie « tout type comparable ». Le compilateur vérifie que les opérations utilisées existent pour `T`.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Fonction générique avec borne",
        code: "// `T: PartialOrd` : T doit être comparable avec `>`.\n// `Copy` : on peut copier les valeurs au lieu de les déplacer.\nfn plus_grand<T: PartialOrd + Copy>(a: T, b: T) -> T {\n    if a > b { a } else { b }\n}\n\nfn main() {\n    println!(\"{}\", plus_grand(3, 7));        // T = i32.\n    println!(\"{}\", plus_grand(3.5, 2.1));    // T = f64 : même fonction !\n    // println!(\"{}\", plus_grand(\"a\", \"b\")); // Erreur : &str n'est pas `Copy`.\n}",
      },
      {
        kind: "text",
        text: "Vous utilisez déjà des génériques sans le savoir : `Option<T>`, `Result<T, E>`, `Vec<T>` sont des types génériques de la bibliothèque standard. Les écrire vous-même devient naturel dès que vous factorisez du code.",
      },
    ],
  },
  {
    id: "traits",
    title: "Les traits : des comportements partagés",
    level: 3,
    intro:
      "L'équivalent des interfaces : un trait définit un comportement que des types peuvent implémenter.",
    blocks: [
      {
        kind: "fields",
        title: "Les traits, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un trait déclare un ensemble de méthodes ; tout type qui l'implémente garantit ce comportement.",
          },
          {
            label: "Pourquoi",
            value:
              "Partager du comportement entre types sans héritage : on compose des capacités (`Affichable + Clonable`) au lieu de construire des hiérarchies de classes.",
          },
          {
            label: "`derive`",
            value:
              "Pour les traits courants, le compilateur génère l'implémentation : `#[derive(Debug, Clone, PartialEq)]` sur un struct, et c'est réglé.",
          },
          {
            label: "Traits à connaître",
            value:
              "`Debug` (affichage de débogage `{ :? }`), `Clone` (copie explicite), `Display` (affichage utilisateur `{ }`), `Iterator` (itération), `From`/`Into` (conversions).",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Définir et implémenter un trait",
        code: "// Un trait : un contrat de comportement.\ntrait Resumable {\n    fn resume(&self) -> String;\n}\n\nstruct Article { titre: String }\nstruct Video { titre: String, duree: u32 }\n\nimpl Resumable for Article {\n    fn resume(&self) -> String {\n        format!(\"Article : {}\", self.titre)\n    }\n}\nimpl Resumable for Video {\n    fn resume(&self) -> String {\n        format!(\"Vidéo : {} ({} min)\", self.titre, self.duree)\n    }\n}\n\n// Fonction générique : accepte tout type implémentant `Resumable`.\nfn afficher_resume(item: &impl Resumable) {\n    println!(\"{}\", item.resume());\n}",
      },
      {
        kind: "fields",
        title: "Concepts liés",
        fields: [
          {
            label: "Méthodes par défaut",
            value:
              "Un trait peut fournir une implémentation par défaut que les types peuvent surcharger — pratique pour les comportements communs.",
          },
          {
            label: "Règle de l'orphelin",
            value:
              "On ne peut implémenter un trait que si le trait ou le type est défini dans notre crate : cela évite les conflits entre bibliothèques.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier d'importer le trait (`use std::fmt::Write;`) : les méthodes de trait ne sont utilisables que si le trait est dans la portée.",
          },
        ],
      },
    ],
  },
  {
    id: "lifetimes",
    title: "Les lifetimes : la durée de validité des emprunts",
    level: 3,
    intro:
      "Le concept réputé le plus difficile — en pratique, le compilateur les infère presque toujours. Comprenez l'idée avant la syntaxe.",
    blocks: [
      {
        kind: "fields",
        title: "Les lifetimes, en progressif",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une lifetime (`'a`) nomme la durée pendant laquelle une référence est valide : elle garantit qu'on n'utilise jamais une référence après la mort de sa donnée.",
          },
          {
            label: "Pourquoi",
            value:
              "C'est le mécanisme qui rend l'erreur E0515 (référence vers une variable locale) impossible : le compilateur suit les durées de vie et refuse les incohérences.",
          },
          {
            label: "L'élision : vous n'écrirez presque rien",
            value:
              "Dans la plupart des cas (une seule référence en entrée, méthodes sur `&self`), le compilateur déduit les lifetimes seul. On ne les écrit que quand il y a ambiguïté — typiquement plusieurs références en entrée et une référence en sortie.",
          },
          {
            label: "Quand les écrire",
            value:
              "Fonction avec 2+ paramètres références et un retour référence (ex. `longest` ci-dessous), structs qui stockent des références.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne commencez pas par annoter partout : écrivez sans lifetimes, et ajoutez-les uniquement quand le compilateur (E0106) les demande. La lecture d'erreur guide l'annotation.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Le cas classique : `longest`",
        code: "// `'a` : la sortie vit aussi longtemps que la PLUS COURTE des deux entrées.\n// Le compilateur refuse que le résultat survive à `x` ou à `y`.\nfn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}\n\nfn main() {\n    let s1 = String::from(\"court\");\n    let resultat;\n    {\n        let s2 = String::from(\"beaucoup plus long\");\n        resultat = longest(&s1, &s2);\n        println!(\"{resultat}\");   // OK : `s2` est encore vivant ici.\n    }\n    // println!(\"{resultat}\");   // Erreur : `s2` est mort, `resultat` ne peut pas survivre.\n}",
      },
      {
        kind: "text",
        text: "Rassurez-vous : la majorité du code Rust ne contient aucune annotation de lifetime. Ce sont les règles d'élision (3 règles simples appliquées par le compilateur) qui font le travail — les annotations n'apparaissent que dans les signatures ambiguës et les structs à références.",
      },
    ],
  },
  {
    id: "collections-std",
    title: "Les collections : `Vec`, `String`, `HashMap`",
    level: 3,
    intro:
      "Les trois collections de la bibliothèque standard qui couvrent 95 % des besoins quotidiens.",
    blocks: [
      {
        kind: "code",
        language: "rust",
        title: "Les trois collections en action",
        code: "// Vec<T> : tableau dynamique, taille variable, sur le tas.\nlet mut scores: Vec<i32> = Vec::new();\nscores.push(10);\nscores.push(20);\nlet v = vec![1, 2, 3];          // Macro `vec!` : création rapide.\n// let x = v[10];               // Panic si hors limites...\nlet x = v.get(10);             // ...`get` retourne `Option<&T>` : sûr.\n\n// String : chaîne possédée, modifiable (c'est un `Vec<u8>` spécialisé).\nlet mut s = String::from(\"bonjour\");\ns.push_str(\" le monde\");\n// Itération correcte sur du texte Unicode :\nfor c in \"héllo\".chars() { print!(\"{c} \"); }  // `chars()`, pas l'indexation !\n\n// HashMap : dictionnaire clé -> valeur.\nuse std::collections::HashMap;\nlet mut notes = HashMap::new();\nnotes.insert(String::from(\"Ada\"), 18);\n// `entry` : insérer seulement si absent (compteur idiomatique).\n*notes.entry(String::from(\"Ada\")).or_insert(0) += 1;",
      },
      {
        kind: "fields",
        title: "Choisir la bonne collection",
        fields: [
          {
            label: "`Vec<T>`",
            value:
              "Liste ordonnée de taille variable. Le choix par défaut pour « plusieurs éléments du même type ».",
          },
          {
            label: "`String` vs `&str`",
            value:
              "`String` quand on possède et modifie le texte ; `&str` quand on emprunte ou lit. En paramètre : `&str` accepte les deux.",
          },
          {
            label: "`HashMap<K, V>`",
            value:
              "Association clé → valeur avec recherche rapide. Clés : tout type hashable (`String`, entiers…).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Indexer une `String` (`s[0]`) : interdit, car un caractère UTF-8 fait 1 à 4 octets. On itère avec `.chars()` ou on slice sur des frontières valides.",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférez `.get(i)` (retourne `Option`) à `[i]` quand l'indice vient de données externes : l'échec devient traitable au lieu de paniquer.",
          },
        ],
      },
    ],
  },
  {
    id: "modules-et-crates",
    title: "Modules et crates : organiser le code",
    level: 3,
    intro:
      "Comment structurer un projet qui grandit : modules, visibilité et la distinction crate / module / package.",
    blocks: [
      {
        kind: "fields",
        title: "Le vocabulaire, sans confusion",
        fields: [
          {
            label: "Crate",
            value:
              "L'unité de compilation : un projet binaire (`src/main.rs`) ou une bibliothèque (`src/lib.rs`) est une crate.",
          },
          {
            label: "Module (`mod`)",
            value:
              "Un espace de noms à l'intérieur d'une crate : `mod reseau { ... }` regroupe du code lié. Les modules s'imbriquent en arbre.",
          },
          {
            label: "Package (Cargo)",
            value:
              "Ce que `cargo` gère : un `Cargo.toml` + une ou plusieurs crates. Un package contient au plus une bibliothèque mais plusieurs binaires.",
          },
          {
            label: "`pub`",
            value:
              "Tout est privé par défaut : `pub fn`, `pub struct`, `pub mod` rendent un élément utilisable depuis l'extérieur du module.",
          },
          {
            label: "Chemins",
            value:
              "`crate::utils::aider()` = chemin absolu depuis la racine ; `super::` = module parent ; `self::` = module courant. `use` importe un chemin dans la portée.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Modules dans un seul fichier (pour commencer)",
        code: "mod geometrie {\n    // `pub` : visible depuis l'extérieur du module.\n    pub struct Point { pub x: f64, pub y: f64 }\n\n    pub fn distance(a: &Point, b: &Point) -> f64 {\n        ((a.x - b.x).powi(2) + (a.y - b.y).powi(2)).sqrt()\n    }\n\n    fn helper() {}  // Privé : utilisable uniquement dans `geometrie`.\n}\n\n// Import du chemin pour un usage direct.\nuse crate::geometrie::{Point, distance};\n\nfn main() {\n    let a = Point { x: 0.0, y: 0.0 };\n    let b = Point { x: 3.0, y: 4.0 };\n    println!(\"Distance : {}\", distance(&a, &b));  // 5.0\n}",
      },
      {
        kind: "text",
        text: "Quand le projet grandit, chaque module migre vers son propre fichier : `mod geometrie;` dans `main.rs` charge `src/geometrie.rs` (ou `src/geometrie/mod.rs`). La règle : un module = un fichier, l'arborescence des fichiers reflète l'arbre des modules.",
      },
    ],
  },
  {
    id: "cargo-toml",
    title: "`Cargo.toml` : la carte d'identité du projet",
    level: 3,
    intro:
      "Le manifeste de tout projet Rust : métadonnées, édition et dépendances, dans un format TOML lisible.",
    blocks: [
      {
        kind: "code",
        language: "toml",
        title: "Anatomie d'un Cargo.toml",
        code: "[package]\nname = \"mon_outil\"        # Nom du projet (et de la crate).\nversion = \"0.1.0\"         # Version semver : MAJEUR.MINEUR.CORRECTIF.\nedition = \"2021\"          # Édition du langage (voir section dédiée).\n\n[dependencies]\n# Les dépendances externes se déclarent ici :\n# serde = \"1.0\"           # `\"1.0\"` = toute version compatible ^1.0.\n\n[dev-dependencies]\n# Dépendances réservées aux tests (non incluses dans le binaire final).",
      },
      {
        kind: "fields",
        title: "Les sections essentielles",
        fields: [
          {
            label: "`[package]`",
            value:
              "Nom, version (suivez le versionnage sémantique : cassez l'API = version majeure), édition du langage.",
          },
          {
            label: "`[dependencies]`",
            value:
              "Les crates externes, avec des exigences de version souples (`\"1.0\"` signifie `>=1.0, <2.0`). `cargo` résout et télécharge depuis `crates.io`.",
          },
          {
            label: "`Cargo.lock`",
            value:
              "Généré automatiquement : fige les versions EXACTES utilisées. À commiter pour les binaires (reproductibilité), optionnel pour les bibliothèques.",
          },
          {
            label: "`[dev-dependencies]`",
            value:
              "Dépendances de test uniquement : elles ne polluent pas le binaire final ni les utilisateurs de votre bibliothèque.",
          },
        ],
      },
    ],
  },
  {
    id: "dependances-crates-io",
    title: "Dépendances et crates.io",
    level: 3,
    intro:
      "`crates.io` est le registre officiel : des dizaines de milliers de bibliothèques réutilisables, intégrées à `cargo`.",
    blocks: [
      {
        kind: "command",
        label: "Ajouter une dépendance",
        command: "cargo add serde",
        why: "Ajoute la crate `serde` (sérialisation) aux `[dependencies]` du `Cargo.toml` avec une exigence de version compatible, puis télécharge et compile. Évite l'édition manuelle du fichier.",
        verify: "`grep serde Cargo.toml` doit afficher la ligne ajoutée.",
      },
      {
        kind: "text",
        text: "Quelques crates quasi standard à connaître — non pas comme « les meilleures », mais comme les réponses habituelles de l'écosystème à des besoins courants : `serde` pour la sérialisation (JSON, TOML…), `tokio` pour l'asynchrone (runtime très répandu), `clap` pour les arguments en ligne de commande, `reqwest` pour les clients HTTP, `anyhow`/`thiserror` pour les erreurs.",
      },
      {
        kind: "fields",
        title: "Évaluer une crate avant de l'adopter",
        fields: [
          {
            label: "Téléchargements et maintenance",
            value:
              "Sur `crates.io` : nombre de téléchargements récents, date de dernière version, dépôt actif. Une crate abandonnée est un risque.",
          },
          {
            label: "Documentation",
            value:
              "Chaque crate publiée est documentée sur `docs.rs` : lisez-la avant d'ajouter la dépendance. Une crate sans docs est un signal faible.",
          },
          {
            label: "Arbre de dépendances",
            value:
              "`cargo tree` affiche les dépendances transitives : une « petite » crate peut en tirer cinquante. Moins il y en a, mieux c'est.",
          },
          {
            label: "Audit de sécurité",
            value:
              "`cargo audit` (outil externe à installer) signale les vulnérabilités connues dans vos dépendances — à intégrer en CI.",
          },
        ],
      },
      {
        kind: "command",
        label: "Voir l'arbre des dépendances",
        command: "cargo tree",
        why: "Affiche toutes les dépendances directes et transitives du projet. Indispensable pour comprendre ce que vous embarquez réellement.",
      },
    ],
  },
  {
    id: "editions",
    title: "Les éditions : 2015, 2018, 2021",
    level: 3,
    intro:
      "Rust évolue sans casser le code existant grâce aux éditions : des ensembles de règles opt-in par projet.",
    blocks: [
      {
        kind: "fields",
        title: "Chaque édition, factuellement",
        fields: [
          {
            label: "Édition 2015",
            value:
              "L'édition d'origine (Rust 1.0). Code historique : chemins `use` avec `extern crate`, pas d'`async`/`await`.",
          },
          {
            label: "Édition 2018",
            value:
              "Chemins de modules uniformisés (`crate::`, `self::`, plus besoin d'`extern crate` dans la plupart des cas), `async`/`await` réservés comme mots-clés, durées de vie non lexicales (NLL — le borrow checker devient plus permissif).",
          },
          {
            label: "Édition 2021",
            value:
              "Les tableaux implémentent `IntoIterator` (`for x in [1, 2, 3]` fonctionne par valeur), captures disjointes dans les closures (emprunt champ par champ au lieu de toute la struct), cohérence de la macro `panic!`.",
          },
          {
            label: "Ce que les éditions ne sont PAS",
            value:
              "Ni des versions du langage qui cassent l'ancien code, ni des migrations obligatoires : l'édition se choisit par crate dans `Cargo.toml`, et du code 2015 compile toujours avec un compilateur récent.",
          },
        ],
      },
      {
        kind: "table",
        headers: ["Édition", "Changements marquants", "Statut"],
        rows: [
          ["2015", "Version initiale du langage stable", "Historique"],
          ["2018", "`async`/`await`, chemins uniformisés, NLL", "Toujours supportée"],
          ["2021", "`IntoIterator` pour tableaux, closures disjointes", "Défaut de `cargo new`"],
        ],
      },
      {
        kind: "text",
        text: "En pratique : laissez `edition = \"2021\"` (la valeur générée par `cargo new`), et sachez que les éditions expliquent pourquoi du vieux code Rust a parfois une syntaxe légèrement différente — ce n'est pas une autre langue, juste une édition antérieure.",
      },
    ],
  },
  {
    id: "tests-integres",
    title: "Les tests intégrés",
    level: 3,
    intro:
      "En Rust, les tests vivent à côté du code : pas de framework à installer, `cargo test` suffit.",
    blocks: [
      {
        kind: "code",
        language: "rust",
        title: "Tests unitaires et tests d'intégration",
        code: "fn addition(a: i32, b: i32) -> i32 { a + b }\n\n// Tests unitaires : dans le MÊME fichier, compilés uniquement en mode test.\n#[cfg(test)]\nmod tests {\n    use super::*;  // Importe le code du module parent.\n\n    #[test]\n    fn test_addition() {\n        assert_eq!(addition(2, 3), 5);\n    }\n\n    #[test]\n    fn test_addition_negative() {\n        assert_eq!(addition(-1, 1), 0);\n    }\n\n    #[test]\n    #[should_panic]\n    fn test_panique_attendue() {\n        panic!(\"ce test vérifie qu'un panic est bien détecté\");\n    }\n}\n// Tests d'intégration : fichiers dans `tests/`, ils utilisent la crate comme un utilisateur.\n// Tests de documentation : les exemples ``` dans les commentaires `///` sont EXÉCUTÉS par `cargo test`.",
      },
      {
        kind: "fields",
        title: "Les trois sortes de tests",
        fields: [
          {
            label: "Unitaires (`#[cfg(test)]`)",
            value:
              "Dans le même fichier que le code, avec accès aux éléments privés. Pour tester la logique interne.",
          },
          {
            label: "Intégration (`tests/`)",
            value:
              "Un dossier `tests/` à la racine : chaque fichier teste la crate publique comme un utilisateur externe.",
          },
          {
            label: "Documentation (doctests)",
            value:
              "Les exemples de code dans les commentaires `///` sont compilés et exécutés : la doc ne peut pas mentir sur les exemples.",
          },
          {
            label: "Assertions",
            value:
              "`assert!` (booléen), `assert_eq!` / `assert_ne!` (égalité, avec affichage des valeurs en cas d'échec).",
          },
          {
            label: "Bonne pratique",
            value:
              "Écrivez les tests en même temps que le code : en Rust, le coût d'entrée est nul (pas de framework à configurer), et les tests verrouillent les garanties du compilateur.",
          },
        ],
      },
    ],
  },
  {
    id: "documentation-cargo-doc",
    title: "Documenter avec `cargo doc`",
    level: 3,
    intro:
      "La documentation fait partie du workflow : commentaires `///`, exemples testés, et génération HTML en une commande.",
    blocks: [
      {
        kind: "code",
        language: "rust",
        title: "Commentaires de documentation",
        code: "/// Calcule la distance entre deux points.\n///\n/// # Exemple\n///\n/// ```\n/// let a = Point { x: 0.0, y: 0.0 };\n/// let b = Point { x: 3.0, y: 4.0 };\n/// assert_eq!(distance(&a, &b), 5.0);\n/// ```\n///\n/// # Panics\n///\n/// Ne panique jamais : les coordonnées sont toujours finies.\n///\n/// ---\n/// `///` = doc publique (générée). `//!` = doc du module/crate entier.\n/// `//` simple = commentaire interne, jamais publié.",
      },
      {
        kind: "command",
        label: "Générer et ouvrir la documentation",
        command: "cargo doc --open",
        why: "Génère la documentation HTML du projet (et de ses dépendances) dans `target/doc/`, puis l'ouvre dans le navigateur. Les exemples ``` sont inclus et testés par `cargo test`.",
        verify: "Le navigateur affiche la page de documentation de votre crate.",
      },
      {
        kind: "fields",
        title: "L'écosystème documentaire",
        fields: [
          {
            label: "`docs.rs`",
            value:
              "Toute crate publiée sur `crates.io` voit sa documentation générée et hébergée sur `docs.rs` : c'est la référence pour lire la doc des dépendances.",
          },
          {
            label: "Sections idiomatiques",
            value:
              "`# Exemple`, `# Panics`, `# Errors`, `# Safety` (pour l'`unsafe`) : des conventions suivies par toute la bibliothèque standard.",
          },
          {
            label: "Bonne pratique",
            value:
              "Documentez les invariants et les cas d'erreur, pas l'évident : « retourne `None` si la clé est absente » vaut mieux que « récupère la valeur ».",
          },
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Déboguer du Rust",
    level: 3,
    intro:
      "Le compilateur attrape beaucoup de bugs, mais pas la logique métier : voici la boîte à outils de débogage.",
    blocks: [
      {
        kind: "code",
        language: "rust",
        title: "`dbg!`, `eprintln!` et les assertions",
        code: "fn calculer(notes: &[i32]) -> f64 {\n    // `dbg!` : affiche la valeur ET la reprend (pratique en chaîne).\n    let total: i32 = dbg!(notes.iter().sum());\n    // Affiche : [src/main.rs:3] notes.iter().sum() = 45\n\n    // `eprintln!` : comme `println!` mais vers la sortie d'erreur (stderr).\n    eprintln!(\"DEBUG: {} notes traitées\", notes.len());\n\n    // `debug_assert!` : vérifié en debug, supprimé en release (zéro coût).\n    debug_assert!(!notes.is_empty(), \"calculer() exige au moins une note\");\n\n    total as f64 / notes.len() as f64\n}",
      },
      {
        kind: "command",
        label: "Afficher la pile d'appels lors d'un panic",
        command: "RUST_BACKTRACE=1 cargo run",
        why: "La variable d'environnement `RUST_BACKTRACE=1` demande au runtime d'afficher la trace complète des appels au moment du `panic` : on voit exactement quel appel a provoqué l'erreur. (`=full` donne encore plus de détails.)",
        verify: "En cas de panic, une section `stack backtrace:` liste les fonctions appelées.",
      },
      {
        kind: "fields",
        title: "Débogage pas à pas",
        fields: [
          {
            label: "`rust-gdb` / `rust-lldb`",
            value:
              "Des encapsuleurs fournis avec Rust autour de GDB et LLDB, avec un affichage adapté aux types Rust (enums, `String`, `Vec`…).",
          },
          {
            label: "Via l'éditeur",
            value:
              "VS Code (extension de débogage natif) ou RustRover : points d'arrêt, inspection des variables, pile d'appels — sans quitter l'éditeur.",
          },
          {
            label: "Stratégie",
            value:
              "`dbg!` pour les valeurs suspectes, `RUST_BACKTRACE=1` pour les panics, débogueur pas à pas pour la logique complexe. Dans cet ordre de coût croissant.",
          },
        ],
      },
    ],
  },
  {
    id: "clippy-et-rustfmt",
    title: "Clippy et rustfmt : qualité automatique",
    level: 3,
    intro:
      "Deux outils officiels qui relisent votre code : l'un pour le style (formatage), l'autre pour les maladresses (lints).",
    blocks: [
      {
        kind: "fields",
        title: "Deux rôles distincts",
        fields: [
          {
            label: "rustfmt (`cargo fmt`)",
            value:
              "Le formateur officiel : indentation, retours à la ligne, espaces. Il n'y a qu'un seul style Rust valide — celui de `rustfmt`. Zéro débat d'équipe.",
          },
          {
            label: "Clippy (`cargo clippy`)",
            value:
              "Le linter pédagogique : des centaines de vérifications (comparer une longueur à zéro au lieu d'utiliser `is_empty()`, emprunts inutiles, boucles simplifiables…) avec explications et corrections suggérées.",
          },
          {
            label: "En une phrase",
            value:
              "`rustfmt` s'occupe de la forme, Clippy s'occupe du fond : ensemble, ils maintiennent une base de code homogène et idiomatique.",
          },
          {
            label: "En CI",
            value:
              "Les projets sérieux vérifient en intégration continue : `cargo fmt --check` (le code est-il formaté ?) et `cargo clippy` (aucun lint non traité ?).",
          },
        ],
      },
      {
        kind: "command",
        label: "Clippy strict (zéro avertissement toléré)",
        command: "cargo clippy -- -D warnings",
        why: "Le `--` sépare les options de `cargo` de celles de Clippy ; `-D warnings` transforme tous les avertissements en erreurs. Utile avant une release ou en CI pour garantir un code sans lint.",
        verify: "Soit le silence (parfait), soit des erreurs à corriger une par une.",
      },
      {
        kind: "text",
        text: "Bonne pratique : ne désactivez un lint (`#[allow(...)]`) qu'avec un commentaire qui explique pourquoi — un `allow` sans justification est une dette. Et lisez les suggestions de Clippy même quand vous les connaissez : c'est une formation continue gratuite aux idiomes Rust.",
      },
    ],
  },
  {
    id: "unsafe",
    title: "`unsafe` : la sortie de secours (à connaître, pas à utiliser)",
    level: 3,
    intro:
      "Rust permet de contourner certaines garanties dans des blocs `unsafe` : comprenez quand c'est nécessaire et ce que ça implique.",
    blocks: [
      {
        kind: "fields",
        title: "`unsafe`, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un bloc `unsafe` autorise cinq opérations interdites ailleurs : le programmeur reprend alors à son compte la responsabilité de la sécurité mémoire.",
          },
          {
            label: "Quand c'est nécessaire",
            value:
              "Interopérabilité avec le C (FFI), structures de données bas niveau impossibles à exprimer avec l'ownership (certaines listes chaînées), accès matériel en embarqué.",
          },
          {
            label: "Les cinq super-pouvoirs",
            value:
              "Déréférencer un pointeur brut (`*const T` / `*mut T`), appeler une fonction `unsafe`, lire/modifier une variable statique mutable, implémenter un trait `unsafe`, accéder aux champs d'une `union`.",
          },
          {
            label: "Ce que `unsafe` ne fait PAS",
            value:
              "Il ne désactive PAS le borrow checker : les règles d'ownership s'appliquent toujours autour et à l'intérieur du bloc. Seules les cinq opérations listées sont déverrouillées.",
          },
          {
            label: "La discipline",
            value:
              "Encapsuler l'`unsafe` dans des abstractions sûres : `Vec`, `String` ou `HashMap` utilisent de l'`unsafe` en interne, mais leur API publique est 100 % sûre. C'est le modèle à suivre.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "À quoi ressemble l'`unsafe` (lecture seule)",
        code: "fn main() {\n    let x = 5;\n    let pointeur_brut = &x as *const i32;  // Pointeur brut : pas de garantie.\n\n    unsafe {\n        // Déréférencement autorisé UNIQUEMENT ici.\n        // Le programmeur garantit que le pointeur est valide.\n        println!(\"Valeur : {}\", *pointeur_brut);\n    }\n    // Hors du bloc `unsafe`, impossible : le compilateur refuse.\n}",
      },
      {
        kind: "text",
        text: "Règle d'or pour 99 % des développeurs : ne jamais écrire d'`unsafe` vous-même, mais savoir le lire — vous en croiserez dans les crates bas niveau. Si un jour vous en avez besoin (FFI typiquement), documentez chaque bloc avec `# Safety` : quelles conditions l'appelant doit garantir.",
      },
    ],
  },
  {
    id: "async-await",
    title: "L'asynchrone : notions essentielles",
    level: 3,
    intro:
      "Rust gère la concurrence I/O avec `async`/`await` sans runtime imposé : les concepts avant l'outillage.",
    blocks: [
      {
        kind: "fields",
        title: "L'async Rust, méthode pédagogique",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une fonction `async` ne s'exécute pas immédiatement : elle retourne un `Future`, une valeur paresseuse qui ne progresse que lorsqu'un exécuteur la pilote et qu'on l'attend avec `.await`.",
          },
          {
            label: "Pourquoi",
            value:
              "Gérer des milliers de connexions réseau simultanées sans payer un thread OS par connexion : pendant qu'une tâche attend le réseau, d'autres s'exécutent.",
          },
          {
            label: "Futures paresseuses",
            value:
              "Créer un `Future` ne fait RIEN : sans `.await` (ou un exécuteur), le code ne s'exécute jamais. C'est la source n°1 d'incompréhension des débutants.",
          },
          {
            label: "Le runtime",
            value:
              "La bibliothèque standard fournit la syntaxe, pas l'exécuteur : il faut un runtime comme `tokio` (le plus répandu dans l'écosystème) pour piloter les futures.",
          },
          {
            label: "Quand",
            value:
              "Serveurs réseau, clients HTTP concurrents, I/O massivement parallèles. Pour du calcul parallèle pur, les threads classiques suffisent souvent.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "La syntaxe async, sans runtime",
        code: "// `async fn` : retourne un Future, ne fait rien tant qu'on ne l'attend pas.\nasync fn telecharger(url: &str) -> Result<String, String> {\n    // ... travail asynchrone ...\n    Ok(format!(\"contenu de {url}\"))\n}\n\n// Dans un runtime (ex. tokio), on attend le résultat avec `.await` :\n// async fn main() {\n//     let contenu = telecharger(\"https://exemple.com\").await?;\n//     println!(\"{contenu}\");\n// }\n//\n// Note : `main` elle-même doit être async, ce qui exige un runtime\n// (`#[tokio::main]` avec la crate tokio) : la std ne fournit pas d'exécuteur.",
      },
      {
        kind: "text",
        text: "Conseil de progression : maîtrisez d'abord l'ownership, les threads (`std::thread`) et les canaux (`std::sync::mpsc`), puis abordez l'async. L'asynchrone ajoute ses propres règles (futures `Send`, pas de blocage dans les tâches) qui se comprennent mieux sur des bases solides.",
      },
    ],
  },
  {
    id: "ffi-c",
    title: "FFI : dialoguer avec le C",
    level: 3,
    intro:
      "Rust peut appeler du code C et être appelé depuis le C : la porte vers des décennies de bibliothèques existantes.",
    blocks: [
      {
        kind: "fields",
        title: "L'interopérabilité, en bref",
        fields: [
          {
            label: "En une phrase",
            value:
              "La FFI (Foreign Function Interface) permet d'appeler des fonctions C depuis Rust via des blocs `extern \"C\"`, et d'exposer des fonctions Rust au C.",
          },
          {
            label: "Pourquoi",
            value:
              "Réutiliser des bibliothèques C éprouvées (système, crypto, multimédia) sans les réécrire, ou intégrer Rust progressivement dans un projet C existant.",
          },
          {
            label: "La frontière est `unsafe`",
            value:
              "Le C ne respecte pas les règles de Rust : tout appel FFI se fait en `unsafe`, et c'est à vous de garantir la validité des pointeurs échangés.",
          },
          {
            label: "Quand",
            value:
              "Pilotes, bibliothèques système sans équivalent Rust, migration progressive d'une base C. Pour le reste, préférez les crates natives.",
          },
        ],
      },
      {
        kind: "code",
        language: "rust",
        title: "Déclarer une fonction C",
        code: "// Déclare une fonction C existante (ex. de la libc) : pas de corps,\n// juste la signature. L'appel sera `unsafe`.\nextern \"C\" {\n    fn abs(nombre: i32) -> i32;  // `abs` de la bibliothèque standard C.\n}\n\nfn main() {\n    unsafe {\n        println!(\"Valeur absolue : {}\", abs(-42));\n    }\n}\n// Pour des API C complexes, la crate `bindgen` génère ces déclarations\n// automatiquement depuis les headers `.h` (outil externe, à installer).",
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes et progressifs",
    level: 3,
    intro:
      "Quatre projets qui montent en puissance : chacun réutilise les acquis du précédent.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Utilitaire CLI : renommeur de fichiers",
        fields: [
          {
            label: "Compétences",
            value: "`cargo new`, `std::fs`, `std::env::args`, `Result`, `println!`/`eprintln!`.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "La structure d'un vrai programme : parsing d'arguments, parcours de dossier, gestion d'erreurs propres avec `?`, messages d'erreur utiles.",
          },
          {
            label: "Difficulté",
            value: "Débutant — faisable dès la fin du niveau 2.",
          },
          {
            label: "Projet suivant",
            value: "Le mini-grep ci-dessous (même famille, plus de logique).",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Mini-grep : recherche dans des fichiers",
        fields: [
          {
            label: "Compétences",
            value: "Le projet guidé du Rust Book : modules, tests unitaires et d'intégration, `Result`, variables d'environnement.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Organiser un projet en bibliothèque + binaire, écrire des tests qui verrouillent le comportement, séparer la logique de l'interface CLI.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — le premier projet « structuré comme un pro ».",
          },
          {
            label: "Projet suivant",
            value: "Le client API (découverte des dépendances externes).",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Client API JSON avec dépendances",
        fields: [
          {
            label: "Compétences",
            value: "`cargo add`, `serde` (désérialisation JSON), `reqwest` (HTTP), `tokio` (async), `clap` (arguments CLI).",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Travailler avec l'écosystème : choisir des crates, lire leur doc sur `docs.rs`, modéliser des réponses JSON en structs, gérer l'asynchrone de bout en bout.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire / avancé — le premier contact avec l'async réel.",
          },
          {
            label: "Projet suivant",
            value: "Le serveur TCP (mise en pratique réseau + ownership).",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Serveur TCP multithread",
        fields: [
          {
            label: "Compétences",
            value: "`std::net::TcpListener`, threads (`std::thread`), partage avec `Arc<Mutex<T>>`, gestion d'erreurs robuste.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "La concurrence sûre : le compilateur prouve l'absence de courses aux données entre threads. C'est la démonstration la plus impressionnante de l'ownership.",
          },
          {
            label: "Difficulté",
            value: "Avancé — synthèse de tout le parcours.",
          },
          {
            label: "Et après",
            value:
              "Réécrire ce serveur avec `tokio` en async, ou contribuer à une crate open source.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-officielles",
    title: "Ressources officielles",
    level: 3,
    intro:
      "La documentation Rust est réputée excellente : commencez toujours par les sources officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Par ordre de priorité",
        fields: [
          {
            label: "The Rust Book",
            value:
              "`doc.rust-lang.org/book/` — LE livre officiel, gratuit et en ligne. Le parcours structuré de référence, du « Hello, world! » aux projets complets.",
          },
          {
            label: "Documentation standard",
            value:
              "`doc.rust-lang.org/std/` — la référence de la bibliothèque standard, avec exemples pour chaque fonction.",
          },
          {
            label: "Rust by Example",
            value:
              "`doc.rust-lang.org/rust-by-example/` — les concepts illustrés par de petits programmes exécutables.",
          },
          {
            label: "Le Playground",
            value:
              "`play.rust-lang.org` — essayer du Rust dans le navigateur, sans rien installer. Idéal pour tester une idée.",
          },
          {
            label: "`docs.rs`",
            value:
              "La documentation de toutes les crates publiées : indispensable dès que vous utilisez des dépendances.",
          },
          {
            label: "Forum des utilisateurs",
            value:
              "`users.rust-lang.org` — la communauté d'entraide officielle, accueillante pour les débutants.",
          },
          {
            label: "Docs hors ligne",
            value:
              "`rustup doc` ouvre toute la documentation officielle en local, sans connexion.",
          },
        ],
      },
      {
        kind: "command",
        label: "Ouvrir la documentation locale",
        command: "rustup doc",
        why: "Ouvre la documentation officielle (Book, std, etc.) installée avec votre toolchain, dans le navigateur — consultable sans connexion internet.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Rust ouvre plusieurs voies : voici les directions naturelles après les fondamentaux.",
    blocks: [
      {
        kind: "fields",
        title: "Quatre directions",
        fields: [
          {
            label: "WebAssembly",
            value:
              "Compiler Rust vers le Web (`wasm-pack`, `wasm-bindgen`) : du code ultra-performant dans le navigateur, en interop avec JavaScript.",
          },
          {
            label: "Systèmes et embarqué",
            value:
              "Noyaux, pilotes, microcontrôleurs : là où Rust remplace le C, avec les mêmes garanties de sécurité mémoire.",
          },
          {
            label: "Async et réseau avancé",
            value:
              "Approfondir `tokio`, les streams, les runtimes : la voie des serveurs haute performance.",
          },
          {
            label: "Contribuer à l'écosystème",
            value:
              "Les crates open source accueillent les débutants (labels « good first issue ») : lire du code Rust réel est la meilleure école après les projets.",
          },
        ],
      },
      {
        kind: "text",
        text: "Et surtout : écrivez du Rust régulièrement. L'ownership est une compétence musculaire — chaque erreur du borrow checker comprise rend la suivante plus facile, jusqu'au jour où vous écrivez du code qui compile du premier coup.",
      },
    ],
  },
];

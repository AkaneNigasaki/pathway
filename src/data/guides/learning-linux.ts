import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Linux & ligne de commande : de zéro à un usage
 * professionnel sur serveurs et postes de développement.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : aucune distribution n'est présentée comme universellement
 * meilleure ; les commandes sont toujours expliquées (label + why + verify).
 */
export const LEARNING_LINUX: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Linux vraiment : un noyau, pas un système complet, autour duquel s'organisent des distributions.",
    blocks: [
      {
        kind: "text",
        text: "Linux est un noyau de système d'exploitation open source, créé en 1991 par Linus Torvalds. Le noyau est le programme qui dialogue directement avec le matériel : il gère le processeur, la mémoire, les périphériques et fait cohabiter les programmes. Tout ce que vous voyez autour — le bureau, les fenêtres, les outils — n'est pas « Linux » au sens strict : ce sont des logiciels qui tournent au-dessus du noyau.",
      },
      {
        kind: "text",
        text: "Une distribution Linux (ou « distro ») est un assemblage prêt à l'emploi : le noyau Linux + les outils GNU + un gestionnaire de paquets + un environnement (serveur sans interface ou bureau graphique). Quand on dit « j'utilise Ubuntu » ou « le serveur tourne sous Debian », on parle de la distribution, pas du noyau seul.",
      },
      {
        kind: "fields",
        title: "Linux en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Linux est un noyau open source autour duquel des distributions construisent des systèmes complets, du serveur au bureau.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Offrir un système de type Unix libre, stable et modifiable : les serveurs du web, les supercalculateurs et les systèmes embarqués en avaient besoin sans dépendre d'un éditeur propriétaire.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Serveurs web et applicatifs, développement (conteneurs, CI/CD), administration système, cybersécurité, systèmes embarqués. Pour un usage bureautique classique, n'importe quel OS fait l'affaire.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni une marque unique, ni un seul système : « Linux » recouvre des centaines de distributions différentes. Le noyau seul ne suffit pas à faire un système utilisable.",
          },
          {
            label: "Concepts liés",
            value:
              "Noyau vs espace utilisateur, distributions, open source, Unix, ligne de commande.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "Les couches d'un système Linux",
        lines: [
          "┌─────────────────────────────────────┐",
          "│  Applications (navigateur, serveur…) │  ← ce que vous lancez",
          "├─────────────────────────────────────┤",
          "│  Outils GNU + shell (bash, ls, grep) │  ← ligne de commande",
          "├─────────────────────────────────────┤",
          "│  Noyau Linux                        │  ← gère le matériel",
          "├─────────────────────────────────────┤",
          "│  Matériel (CPU, RAM, disque, réseau)│",
          "└─────────────────────────────────────┘",
        ],
      },
    ],
  },
  {
    id: "pourquoi-le-terminal",
    title: "Pourquoi la ligne de commande ?",
    level: 1,
    intro:
      "Le terminal n'est pas un archaïsme : c'est l'interface la plus précise et la plus automatisable d'un système Linux.",
    blocks: [
      {
        kind: "text",
        text: "Le terminal (ou console) est une fenêtre où vous dialoguez avec le système en tapant des commandes textuelles, interprétées par un programme appelé le shell (souvent `bash` ou `zsh`). Sur un serveur, il n'y a généralement pas d'interface graphique : le terminal est la seule interface disponible. C'est aussi pour cela que les développeurs l'utilisent au quotidien, même sur leur poste.",
      },
      {
        kind: "fields",
        title: "Le terminal en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le terminal permet de contrôler le système au clavier, commande par commande, avec une précision que le clic ne permet pas.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Les interfaces graphiques ne montrent qu'une fraction des possibilités et ne s'automatisent pas. Une commande se répète, se combine avec d'autres et s'exécute à distance sur des centaines de serveurs.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Administration de serveurs, déploiement, scripts, Git, Docker, traitement de fichiers en masse, diagnostic réseau. Pour renommer un fichier isolé, l'explorateur graphique reste parfait.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Croire qu'il faut tout faire au terminal pour être « un vrai ». Le bon outil dépend de la tâche : le terminal excelle dans la répétition et la précision, pas dans l'exploration visuelle.",
          },
          {
            label: "Bonne pratique",
            value:
              "Apprenez une commande à la fois, en comprenant ce qu'elle fait, plutôt que de copier des lignes entières trouvées en ligne sans les lire.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "Terminal, shell, noyau : qui fait quoi",
        lines: [
          "Vous tapez : ls -l",
          "     │",
          "     ▼",
          "Terminal (affiche le texte, envoie vos frappes)",
          "     │",
          "     ▼",
          "Shell — bash (comprend la commande, la découpe, l'exécute)",
          "     │",
          "     ▼",
          "Programme ls (lit le disque via le noyau)",
          "     │",
          "     ▼",
          "Noyau Linux (accède au matériel)",
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
      "Aucune connaissance technique préalable : un ordinateur et la volonté de taper au clavier suffisent pour commencer.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut (et ce qu'il ne faut pas)",
        fields: [
          {
            label: "Matériel",
            value:
              "N'importe quel ordinateur récent. Vous pouvez pratiquer sans rien installer : un serveur distant, une machine virtuelle, ou le sous-système Windows pour Linux (WSL) sous Windows.",
          },
          {
            label: "Savoir taper au clavier",
            value:
              "C'est littéralement le seul prérequis technique. La précision viendra avec la pratique ; le terminal pardonne peu les fautes de frappe, mais l'historique des commandes aide.",
          },
          {
            label: "Pas besoin de programmer",
            value:
              "La ligne de commande n'est pas de la programmation : ce sont des ordres simples, un par un. Les scripts viendront bien plus tard (niveau 3).",
          },
          {
            label: "Anglais de base utile",
            value:
              "Les commandes et leurs documentations sont en anglais (`list`, `change directory`, `manual`). Pas besoin d'être bilingue : une vingtaine de mots suffit au début.",
          },
        ],
      },
    ],
  },
  {
    id: "distributions-familles",
    title: "Les familles de distributions",
    level: 2,
    intro:
      "Trois grandes familles structurent l'écosystème : elles se distinguent par leur gestionnaire de paquets et leur philosophie de mise à jour.",
    blocks: [
      {
        kind: "text",
        text: "Choisir une distribution, c'est surtout choisir une famille : le gestionnaire de paquets (l'outil qui installe les logiciels) et le rythme des mises à jour en découlent. Les commandes de base (`ls`, `cd`, `grep`…) sont identiques partout : seule l'installation des logiciels change.",
      },
      {
        kind: "table",
        headers: ["Famille", "Exemples", "Paquets", "Gestionnaire", "Philosophie"],
        rows: [
          [
            "Debian",
            "Debian, Ubuntu, Linux Mint",
            ".deb",
            "`apt`",
            "Versions stables, mises à jour prudentes",
          ],
          [
            "Red Hat",
            "Fedora, RHEL, Rocky Linux, AlmaLinux",
            ".rpm",
            "`dnf` (anciennement `yum`)",
            "Fedora innove, RHEL privilégie la stabilité entreprise",
          ],
          [
            "Arch",
            "Arch Linux, Manjaro, EndeavourOS",
            "spécifiques",
            "`pacman`",
            "Rolling release : mises à jour continues, système toujours récent",
          ],
        ],
      },
      {
        kind: "fields",
        title: "Choisir sans se tromper",
        fields: [
          {
            label: "En une phrase",
            value:
              "Prenez la distribution que votre entourage ou votre hébergeur utilise : l'aide disponible compte plus que les différences techniques.",
          },
          {
            label: "Pourquoi ces trois familles",
            value:
              "Elles couvrent la quasi-totalité des serveurs et postes Linux. Apprendre `apt` vous servira sur Debian et Ubuntu ; `dnf` sur toute la famille Red Hat.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Passer des semaines à comparer les distributions au lieu d'en utiliser une. Les différences s'estompent avec l'expérience ; les bases sont transférables.",
          },
          {
            label: "Bonne pratique",
            value:
              "Pour débuter sur serveur : Debian ou Ubuntu LTS (support long terme, documentation abondante). Pour apprendre en profondeur : n'importe laquelle, l'important est de pratiquer.",
          },
          {
            label: "Note d'honnêteté",
            value:
              "Aucune distribution n'est universellement « la meilleure » : Debian privilégie la stabilité, Fedora la nouveauté, Arch le contrôle total. Ce sont des arbitrages, pas un classement.",
          },
        ],
      },
    ],
  },
  {
    id: "ouvrir-terminal",
    title: "Ouvrir un terminal et premiers réflexes",
    level: 2,
    intro:
      "Repérer le terminal sur votre système et comprendre l'invite de commande : qui vous êtes, où vous êtes.",
    blocks: [
      {
        kind: "fields",
        title: "Ouvrir un terminal selon le système",
        fields: [
          {
            label: "Ubuntu / Debian avec bureau",
            value:
              "Raccourci `Ctrl + Alt + T`, ou recherchez « Terminal » dans les applications.",
          },
          {
            label: "Fedora / autres bureaux GNOME",
            value:
              "Même raccourci `Ctrl + Alt + T` dans la plupart des cas, ou via le menu des applications.",
          },
          {
            label: "Windows (WSL)",
            value:
              "Installez une distribution depuis le Microsoft Store (ex. Ubuntu), puis lancez-la : vous obtenez un vrai terminal Linux.",
          },
          {
            label: "macOS",
            value:
              "L'application Terminal utilise `zsh` sur un noyau Unix (pas Linux) : 95 % des commandes de ce guide y fonctionnent, mais la gestion de paquets (`apt`/`dnf`) n'existe pas.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'invite (le « prompt ») ressemble souvent à `utilisateur@machine:~$`. Elle vous dit trois choses : votre nom d'utilisateur, le nom de la machine, et le dossier courant (`~` signifie votre dossier personnel). Le `$` final indique un utilisateur normal ; un `#` signifierait le super-utilisateur `root` — un signal d'alerte à connaître.",
      },
      {
        kind: "command",
        label: "Savoir qui vous êtes",
        command: "whoami",
        why: "Affiche votre nom d'utilisateur courant. Utile pour vérifier que vous n'êtes pas connecté en `root` par inadvertance avant d'exécuter des commandes sensibles.",
        verify: "Le nom affiché doit correspondre à votre utilisateur habituel, pas `root`.",
      },
      {
        kind: "command",
        label: "Savoir où vous êtes",
        command: "pwd",
        why: "`pwd` (print working directory) affiche le chemin complet du dossier courant. C'est le réflexe numéro un quand on est perdu : avant d'agir, on vérifie où l'on se trouve.",
        verify: "Un chemin comme `/home/marie` s'affiche.",
      },
    ],
  },
  {
    id: "navigation",
    title: "Naviguer : ls, cd, pwd",
    level: 2,
    intro:
      "Lister le contenu d'un dossier et s'y déplacer : les deux gestes qui structurent tout le reste.",
    blocks: [
      {
        kind: "command",
        label: "Lister le contenu du dossier",
        command: "ls",
        why: "`ls` (list) affiche les fichiers et dossiers du répertoire courant. C'est la commande la plus tapée au monde sous Unix : on regarde avant d'agir.",
        verify: "Les noms de fichiers et dossiers s'affichent, souvent colorés (bleu = dossier, vert = exécutable).",
      },
      {
        kind: "command",
        label: "Lister avec détails et fichiers cachés",
        command: "ls -la",
        why: "L'option `-l` affiche le format long (permissions, propriétaire, taille, date) et `-a` montre les fichiers cachés (ceux qui commencent par un point, comme `.bashrc`). Combinez les options en un seul `-la`.",
        verify: "Chaque ligne commence par des permissions comme `-rw-r--r--` et les fichiers en `.` apparaissent.",
      },
      {
        kind: "command",
        label: "Aller dans un dossier",
        command: "cd Documents",
        why: "`cd` (change directory) déplace votre position dans l'arborescence. Sans argument, `cd` seul vous ramène à votre dossier personnel : le raccourci le plus utile du shell.",
        verify: "Tapez `pwd` juste après : le chemin doit se terminer par `/Documents`.",
      },
      {
        kind: "command",
        label: "Remonter d'un niveau",
        command: "cd ..",
        why: "`..` désigne toujours le dossier parent, `.` le dossier courant. Ces deux noms spéciaux existent dans chaque dossier et sont la base de tous les chemins relatifs.",
        verify: "`pwd` affiche le dossier parent du précédent.",
      },
      {
        kind: "fields",
        title: "Navigation en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`pwd` dit où vous êtes, `ls` montre ce qu'il y a, `cd` vous y emmène.",
          },
          {
            label: "Pourquoi trois commandes",
            value:
              "Parce que le shell a une « position » : chaque commande s'exécute relativement au dossier courant. Savoir où l'on est évite de créer ou supprimer des fichiers au mauvais endroit.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Taper `cd documents` alors que le dossier s'appelle `Documents` : Linux distingue majuscules et minuscules, contrairement à Windows.",
          },
          {
            label: "Bonne pratique",
            value:
              "Utilisez la touche `Tab` pour l'autocomplétion : tapez `cd Doc` puis `Tab`, le shell complète `Documents`. Cela évite les fautes de frappe et révèle les noms exacts.",
          },
          {
            label: "Concepts liés",
            value:
              "Chemins absolus vs relatifs, arborescence du système de fichiers, fichiers cachés.",
          },
        ],
      },
    ],
  },
  {
    id: "creer-copier-deplacer",
    title: "Créer, copier, déplacer",
    level: 2,
    intro:
      "Manipuler fichiers et dossiers : créer une arborescence, dupliquer, réorganiser — l'équivalent du glisser-déposer, en précis.",
    blocks: [
      {
        kind: "command",
        label: "Créer un dossier",
        command: "mkdir projets",
        why: "`mkdir` (make directory) crée un dossier vide. Avec `-p`, il crée aussi les parents manquants : `mkdir -p a/b/c` ne se plaint pas si `a` existe déjà.",
        verify: "`ls` affiche désormais `projets`.",
      },
      {
        kind: "command",
        label: "Créer un fichier vide",
        command: "touch notes.txt",
        why: "`touch` crée un fichier vide s'il n'existe pas (sinon, il met à jour sa date). Pratique pour préparer une arborescence ou tester des commandes sur un fichier sans contenu.",
        verify: "`ls -l notes.txt` montre un fichier de taille 0.",
      },
      {
        kind: "command",
        label: "Copier un fichier",
        command: "cp notes.txt notes-sauvegarde.txt",
        why: "`cp` (copy) duplique : l'original reste en place. Pour copier un dossier entier, ajoutez `-r` (récursif) : `cp -r projets projets-copie`.",
        verify: "`ls` montre les deux fichiers avec la même taille.",
      },
      {
        kind: "command",
        label: "Déplacer ou renommer",
        command: "mv notes.txt archives/",
        why: "`mv` (move) déplace, et renomme quand la destination est un nouveau nom dans le même dossier : `mv ancien.txt nouveau.txt`. Pas de corbeille : le déplacement est immédiat.",
        verify: "`ls` ne montre plus `notes.txt` ici ; `ls archives/` le montre.",
      },
      {
        kind: "fields",
        title: "Copie et déplacement, points d'attention",
        fields: [
          {
            label: "En une phrase",
            value:
              "`mkdir` crée, `touch` initialise, `cp` duplique, `mv` déplace ou renomme.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`cp` sans `-r` sur un dossier échoue ou copie partiellement selon les systèmes. Réflexe : dossier → toujours `-r`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Avant `mv` ou `cp`, vérifiez la destination avec `ls`. Écraser un fichier existant ne demande aucune confirmation par défaut.",
          },
          {
            label: "Concepts liés",
            value:
              "Copie récursive, chemins relatifs, écrasement silencieux.",
          },
        ],
      },
    ],
  },
  {
    id: "supprimer-sans-corbeille",
    title: "Supprimer : rm sans corbeille",
    level: 2,
    intro:
      "La commande la plus dangereuse pour un débutant : `rm` supprime définitivement, sans corbeille ni confirmation.",
    blocks: [
      {
        kind: "command",
        label: "Supprimer un fichier",
        command: "rm notes-sauvegarde.txt",
        why: "`rm` (remove) efface définitivement. Contrairement à l'interface graphique, il n'y a pas de corbeille : ce qui est effacé ne se récupère pas par un simple « annuler ».",
        verify: "`ls` ne liste plus le fichier.",
      },
      {
        kind: "command",
        label: "Supprimer un dossier et son contenu",
        command: "rm -r vieux-projet/",
        why: "L'option `-r` (récursif) descend dans le dossier et supprime tout. C'est la même logique que `cp -r` : tout ce qui touche à une arborescence complète exige `-r`.",
        verify: "`ls` ne montre plus le dossier.",
      },
      {
        kind: "command",
        label: "Forcer sans demander",
        command: "rm -rf dossier-temporaire/",
        why: "`-f` (force) supprime les demandes de confirmation, utile dans les scripts. Combiné à `-r`, c'est l'arme la plus puissante du shell — à manier avec une prudence extrême.",
      },
      {
        kind: "fields",
        title: "rm en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`rm` efface sans corbeille : vérifiez toujours le chemin avant d'appuyer sur Entrée.",
          },
          {
            label: "Pourquoi c'est irréversible",
            value:
              "Le shell ne déplace rien vers une corbeille : il demande au système de libérer les blocs du fichier. La récupération exige des outils spécialisés et n'est jamais garantie.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Un espace mal placé : `rm -rf mon dossier/` (avec espace) efface `mon` puis `dossier/`. Avec des noms contenant des espaces, mettez des guillemets : `rm -rf \"mon dossier/\"`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Tapez d'abord `ls` avec le même motif pour voir ce qui sera supprimé, puis rappelez la commande avec `rm` (flèche haut + modification). Ne combinez jamais `-rf` avec des jokers (`*`) sans vérification.",
          },
          {
            label: "Concepts liés",
            value:
              "Jokers et expansion du shell, corbeille vs suppression, sauvegardes.",
          },
        ],
      },
    ],
  },
  {
    id: "lire-fichiers",
    title: "Lire le contenu des fichiers",
    level: 2,
    intro:
      "Afficher un fichier sans l'ouvrir dans un éditeur : rapide, sans risque de modification accidentelle.",
    blocks: [
      {
        kind: "command",
        label: "Afficher tout le contenu",
        command: "cat notes.txt",
        why: "`cat` (concatenate) affiche le fichier en entier dans le terminal. Idéal pour les petits fichiers de configuration ou pour vérifier rapidement un contenu.",
        verify: "Le texte du fichier défile dans le terminal.",
      },
      {
        kind: "command",
        label: "Lire page par page",
        command: "less journal.log",
        why: "`less` affiche les longs fichiers page par page : flèches pour naviguer, `/mot` pour chercher, `q` pour quitter. Il ne charge pas tout en mémoire, donc il ouvre même les fichiers géants.",
        verify: "Le début du fichier s'affiche ; `q` vous rend la main.",
      },
      {
        kind: "command",
        label: "Voir le début ou la fin",
        command: "tail -n 20 journal.log",
        why: "`head` montre les premières lignes, `tail` les dernières (`-n 20` = 20 lignes). `tail -f` suit un fichier en temps réel : indispensable pour surveiller les logs d'un serveur.",
        verify: "Les 20 dernières lignes s'affichent.",
      },
      {
        kind: "command",
        label: "Compter lignes, mots, octets",
        command: "wc rapport.txt",
        why: "`wc` (word count) affiche lignes, mots et octets. `wc -l` ne compte que les lignes : pratique pour mesurer un fichier de logs ou vérifier qu'un export est complet.",
        verify: "Trois nombres s'affichent : lignes, mots, octets.",
      },
    ],
  },
  {
    id: "permissions-lecture",
    title: "Lire les permissions (ls -l)",
    level: 2,
    intro:
      "Décrypter la première colonne de `ls -l` : qui peut lire, écrire, exécuter chaque fichier.",
    blocks: [
      {
        kind: "text",
        text: "Chaque fichier Linux porte des permissions : trois catégories d'utilisateurs (le propriétaire, son groupe, les autres) et trois droits (lecture `r`, écriture `w`, exécution `x`). La commande `ls -l` les affiche sous la forme `-rwxr-xr--` : le premier caractère indique le type (`-` fichier, `d` dossier, `l` lien), puis trois groupes de trois lettres.",
      },
      {
        kind: "diagram",
        title: "Décryptage de -rwxr-xr--",
        lines: [
          "-  rwx  r-x  r--",
          "│   │    │    │",
          "│   │    │    └── autres : lecture seule",
          "│   │    └─────── groupe : lecture + exécution",
          "│   └──────────── propriétaire : lecture + écriture + exécution",
          "└──────────────── type : - = fichier, d = dossier, l = lien",
        ],
      },
      {
        kind: "fields",
        title: "Les trois droits, en une phrase chacun",
        fields: [
          {
            label: "Lecture (r)",
            value:
              "Voir le contenu d'un fichier, ou lister le contenu d'un dossier.",
          },
          {
            label: "Écriture (w)",
            value:
              "Modifier ou supprimer un fichier ; créer ou supprimer des entrées dans un dossier.",
          },
          {
            label: "Exécution (x)",
            value:
              "Lancer un fichier comme programme, ou traverser un dossier pour atteindre son contenu.",
          },
          {
            label: "Pourquoi trois catégories",
            value:
              "Le propriétaire travaille librement, le groupe collabore avec des droits limités, les autres sont restreints : c'est la base de la sécurité multi-utilisateurs d'Unix depuis les années 1970.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Voir `rwx` sur un dossier et croire que c'est « ouvert à tout » : ces droits s'appliquent d'abord au propriétaire. Regardez aussi les colonnes propriétaire et groupe de `ls -l`.",
          },
          {
            label: "Concepts liés",
            value:
              "`chmod` et `chown` (niveau 3), bit d'exécution sur les scripts, sécurité multi-utilisateurs.",
          },
        ],
      },
    ],
  },
  {
    id: "redirection-pipes-bases",
    title: "Redirection et pipes : les bases",
    level: 2,
    intro:
      "Envoyer la sortie d'une commande dans un fichier, ou l'enchaîner à une autre commande : le cœur de la puissance du shell.",
    blocks: [
      {
        kind: "command",
        label: "Écrire la sortie dans un fichier",
        command: "ls > liste.txt",
        why: "Le chevron `>` redirige la sortie standard vers un fichier au lieu de l'écran. Le fichier est créé ou écrasé. C'est ainsi qu'on sauvegarde le résultat d'une commande.",
        verify: "`cat liste.txt` affiche ce que `ls` aurait affiché.",
      },
      {
        kind: "command",
        label: "Ajouter à la fin d'un fichier",
        command: "echo \"fin de journée\" >> journal.txt",
        why: "`>>` ajoute à la suite du fichier existant au lieu de l'écraser. La distinction `>` (écrase) / `>>` (ajoute) est l'une des plus importantes du shell.",
        verify: "`cat journal.txt` montre l'ancienne fin suivie de la nouvelle ligne.",
      },
      {
        kind: "command",
        label: "Enchaîner deux commandes",
        command: "ls | grep \".txt\"",
        why: "Le pipe `|` prend la sortie de la commande de gauche et l'envoie en entrée à celle de droite. Ici : lister, puis filtrer avec `grep` les lignes contenant `.txt`. Les pipes se chaînent à l'infini.",
        verify: "Seules les lignes contenant `.txt` s'affichent.",
      },
      {
        kind: "fields",
        title: "Redirection et pipes en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`>` écrit dans un fichier, `>>` ajoute, `|` connecte des commandes entre elles.",
          },
          {
            label: "Pourquoi c'est puissant",
            value:
              "Chaque outil Unix fait une chose simple ; les pipes les assemblent en traitements complexes sans écrire de programme. C'est la philosophie Unix : petits outils composables.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser `>` au lieu de `>>` sur un fichier précieux : le contenu est écrasé instantanément, sans confirmation. En cas de doute, `>>` d'abord.",
          },
          {
            label: "Bonne pratique",
            value:
              "Testez la partie gauche du pipe seule avant d'ajouter `> fichier` : on ne redirige que ce qu'on a vu à l'écran.",
          },
          {
            label: "Concepts liés",
            value:
              "Sortie standard et erreur standard (niveau 3), `grep` avancé, `tee`.",
          },
        ],
      },
    ],
  },
  {
    id: "rechercher-fichiers",
    title: "Retrouver un fichier : find",
    level: 2,
    intro:
      "Chercher par nom dans une arborescence, même quand on ne sait plus où l'on a rangé le fichier.",
    blocks: [
      {
        kind: "command",
        label: "Chercher par nom",
        command: "find . -name \"*.pdf\"",
        why: "`find` parcourt récursivement à partir du point de départ (`.` = dossier courant) et affiche les chemins dont le nom correspond au motif. Les guillemets empêchent le shell d'interpréter `*` lui-même.",
        verify: "La liste des fichiers `.pdf` trouvés s'affiche avec leurs chemins.",
      },
      {
        kind: "command",
        label: "Limiter aux dossiers ou aux fichiers",
        command: "find /etc -type d -name \"*ssh*\"",
        why: "`-type d` ne retient que les dossiers (`-type f` pour les fichiers). Combiné à `-name`, on cible précisément : ici, les dossiers liés à SSH sous `/etc`.",
        verify: "Des chemins comme `/etc/ssh` apparaissent.",
      },
      {
        kind: "fields",
        title: "find en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`find` explore une arborescence et filtre par nom, type, date ou taille.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Fichier égaré, nettoyage (« tous les `.tmp` de plus de 30 jours »), audit (« fichiers modifiés cette semaine »). Pour chercher dans le contenu des fichiers, c'est `grep -r` (niveau 3).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier les guillemets autour de `*.pdf` : le shell étend le motif avant que `find` ne le voie, et la recherche ne porte que sur le dossier courant.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commencez la recherche le plus bas possible dans l'arborescence (`~/Documents` plutôt que `/`) : c'est plus rapide et moins bruyant.",
          },
          {
            label: "Concepts liés",
            value:
              "`locate` et sa base indexée, `find -exec`, expressions régulières.",
          },
        ],
      },
    ],
  },
  {
    id: "aide-man",
    title: "Se documenter seul : man et --help",
    level: 2,
    intro:
      "Linux embarque sa propre documentation : chaque commande explique ses options, sans quitter le terminal.",
    blocks: [
      {
        kind: "command",
        label: "Lire le manuel d'une commande",
        command: "man ls",
        why: "`man` (manual) ouvre la page de documentation complète : description, options, exemples. Navigation comme `less` (flèches, `/` pour chercher, `q` pour quitter). C'est la référence officielle, toujours à jour.",
        verify: "Le manuel de `ls` s'affiche avec ses sections NAME, SYNOPSIS, DESCRIPTION.",
      },
      {
        kind: "command",
        label: "Aide rapide d'une commande",
        command: "cp --help",
        why: "La plupart des commandes acceptent `--help` (ou `-h`) pour un résumé des options, plus court qu'une page `man`. Premier réflexe quand on hésite sur une option.",
        verify: "La liste des options de `cp` s'affiche en quelques lignes.",
      },
      {
        kind: "fields",
        title: "Se documenter en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`--help` pour un rappel rapide, `man` pour la documentation complète.",
          },
          {
            label: "Pourquoi c'est fiable",
            value:
              "Ces aides sont écrites par les auteurs des outils et installées avec eux : elles correspondent toujours à la version que vous utilisez, contrairement à un article de blog de 2016.",
          },
          {
            label: "Bonne pratique",
            value:
              "Avant de copier une commande trouvée en ligne, vérifiez ses options avec `man` ou `--help`. Si la commande n'existe pas sur votre système, le shell vous le dira : `command not found`.",
          },
          {
            label: "Concepts liés",
            value:
              "Pages de manuel (sections 1 à 8), documentation info, `tldr` (aide communautaire concise).",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Votre premier workflow au terminal",
    level: 2,
    intro:
      "Enchaîner les gestes appris en une session réaliste : créer, organiser, vérifier, nettoyer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Regarder avant d'agir",
            detail:
              "Tapez `pwd` puis `ls ~/Téléchargements` (ou `~/Downloads`) : on observe le point de départ avant toute manipulation.",
          },
          {
            title: "Créer une structure d'accueil",
            detail:
              "`mkdir -p ~/Archives/{images,documents}` crée deux dossiers d'un coup grâce aux accolades du shell.",
          },
          {
            title: "Déplacer par type de fichier",
            detail:
              "`mv ~/Téléchargements/*.jpg ~/Archives/images/` déplace toutes les images. Vérifiez avec `ls` avant et après.",
          },
          {
            title: "Sauvegarder la liste",
            detail:
              "`ls ~/Archives/images/ > ~/Archives/inventaire.txt` conserve une trace écrite du rangement.",
          },
          {
            title: "Nettoyer prudemment",
            detail:
              "Listez les doublons éventuels avec `ls`, puis supprimez avec `rm` en citant chaque nom explicitement — jamais de joker sans vérification.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ce workflow contient toute la grammaire du terminal : observer (`pwd`, `ls`), préparer (`mkdir`), transformer (`mv`), tracer (`>`), nettoyer (`rm`). Chaque session future ne sera qu'une variation de ce schéma, avec des commandes plus spécialisées.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "noyau-espace-utilisateur",
    title: "Noyau vs espace utilisateur",
    level: 3,
    intro:
      "Comprendre la frontière la plus importante du système : ce qui tourne en mode privilégié et ce qui tourne comme un simple programme.",
    blocks: [
      {
        kind: "text",
        text: "Le noyau s'exécute en « mode noyau » : il a tous les droits sur le matériel. Vos programmes (navigateur, serveur web, shell) tournent en « mode utilisateur » avec des droits limités, et demandent des services au noyau via des appels système (ouvrir un fichier, envoyer un paquet réseau). Cette séparation protège le système : un programme qui plante ne fait pas planter la machine.",
      },
      {
        kind: "fields",
        title: "La frontière noyau/utilisateur, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le noyau arbitre l'accès au matériel ; les programmes lui demandent des services au lieu d'y toucher directement.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Sans arbitre, n'importe quel programme pourrait lire la mémoire d'un autre ou monopoliser le processeur. La séparation garantit stabilité et sécurité sur les systèmes multi-utilisateurs.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "Votre programme appelle par exemple `open()` : le processeur bascule en mode noyau, le noyau vérifie les permissions, accède au disque, puis rend la main. Des millions de ces allers-retours ont lieu chaque seconde.",
          },
          {
            label: "Exemple simple",
            value:
              "`cat fichier.txt` semble direct, mais `cat` demande au noyau d'ouvrir le fichier, de lire les blocs disque et de les afficher : trois services du noyau pour une commande.",
          },
          {
            label: "Bonne pratique",
            value:
              "Quand un programme échoue avec « Permission denied », c'est le noyau qui refuse : ne contournez pas avec `sudo` par réflexe, vérifiez d'abord les permissions du fichier.",
          },
          {
            label: "Concepts liés",
            value:
              "Appels système, `strace` (observer les appels), pilotes (drivers), espace noyau.",
          },
        ],
      },
      {
        kind: "command",
        label: "Voir la version du noyau",
        command: "uname -r",
        why: "`uname` (unix name) décrit le système ; `-r` affiche la version du noyau. Utile pour vérifier la compatibilité d'un pilote ou signaler un bug avec des informations précises.",
        verify: "Une version comme `6.8.0-52-generic` s'affiche.",
      },
    ],
  },
  {
    id: "arborescence-fhs",
    title: "L'arborescence du système (FHS)",
    level: 3,
    intro:
      "Chaque dossier de la racine a un rôle normalisé : savoir où chercher les configurations, les logs et les programmes.",
    blocks: [
      {
        kind: "text",
        text: "Sous Linux, tout part de la racine `/` et tout est un fichier — y compris les périphériques et les processus. La norme FHS (Filesystem Hierarchy Standard) fixe le rôle de chaque dossier : un administrateur retrouve ses repères sur n'importe quelle distribution.",
      },
      {
        kind: "table",
        headers: ["Dossier", "Contient", "Exemple d'usage"],
        rows: [
          ["`/home`", "Dossiers personnels des utilisateurs", "`/home/marie/Documents`"],
          ["`/etc`", "Fichiers de configuration du système", "`/etc/ssh/sshd_config`"],
          ["`/var`", "Données variables : logs, caches, mails", "`/var/log/syslog`"],
          ["`/usr`", "Programmes et bibliothèques partagés", "`/usr/bin/python3`"],
          ["`/bin`, `/sbin`", "Commandes essentielles (souvent liens vers `/usr`)", "`/bin/ls`"],
          ["`/tmp`", "Fichiers temporaires (effacés au redémarrage)", "Travail temporaire"],
          ["`/opt`", "Logiciels tiers optionnels", "Applications installées à la main"],
          ["`/root`", "Dossier personnel du super-utilisateur", "Rarement visité directement"],
          ["`/dev`", "Périphériques vus comme des fichiers", "`/dev/sda` (disque), `/dev/null`"],
          ["`/proc`, `/sys`", "Informations du noyau (virtuelles, en mémoire)", "`/proc/cpuinfo`"],
        ],
      },
      {
        kind: "command",
        label: "Voir les infos processeur via le système de fichiers",
        command: "cat /proc/cpuinfo | head -n 10",
        why: "`/proc` n'est pas un vrai dossier sur disque : le noyau y expose ses informations comme des fichiers texte. Lire `/proc/cpuinfo` montre que « tout est fichier » n'est pas un slogan.",
        verify: "Les caractéristiques du processeur s'affichent.",
      },
      {
        kind: "fields",
        title: "L'arborescence en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`/etc` configure, `/var` journalise, `/home` héberge les utilisateurs, `/usr` fournit les programmes.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Modifier un fichier sous `/usr` à la main : il appartient au gestionnaire de paquets et sera écrasé à la prochaine mise à jour. Les réglages vont dans `/etc`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Avant d'éditer un fichier de `/etc`, copiez-le en `.bak` : `sudo cp sshd_config sshd_config.bak`. Un retour en arrière coûte alors une commande.",
          },
          {
            label: "Concepts liés",
            value:
              "« Tout est fichier », points de montage, FHS.",
          },
        ],
      },
    ],
  },
  {
    id: "inodes-liens",
    title: "Inodes et liens : ce qu'est vraiment un fichier",
    level: 3,
    intro:
      "Un nom de fichier n'est qu'une étiquette : les données vivent dans l'inode, ce qui explique les liens physiques et symboliques.",
    blocks: [
      {
        kind: "text",
        text: "Sur un système de fichiers Linux (ext4, btrfs…), un fichier = un inode (numéro unique contenant métadonnées : taille, permissions, blocs disque) + une ou plusieurs entrées de dossier qui associent un nom à cet inode. Supprimer un nom avec `rm` ne libère l'espace que si c'était le dernier nom pointant vers l'inode.",
      },
      {
        kind: "fields",
        title: "Inodes et liens, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le nom pointe vers l'inode, l'inode pointe vers les données : plusieurs noms peuvent partager les mêmes données.",
          },
          {
            label: "Lien physique",
            value:
              "`ln original copie` crée un second nom vers le même inode : les deux noms sont équivalents, les données ne sont pas dupliquées. Ne fonctionne que sur le même système de fichiers.",
          },
          {
            label: "Lien symbolique",
            value:
              "`ln -s cible raccourci` crée un petit fichier spécial contenant le chemin de la cible : c'est un raccourci, qui peut pointer vers un dossier ou un autre disque, et qui « casse » si la cible est supprimée.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Liens symboliques partout : pointer `/usr/bin/python` vers `python3.11`, exposer une config, versionner des déploiements. Liens physiques : rares, surtout pour économiser l'espace sur des sauvegardes.",
          },
          {
            label: "Exemple réel",
            value:
              "`ls -l /bin/sh` montre souvent `sh -> dash` : un lien symbolique. Le système choisit ainsi l'implémentation du shell par défaut sans déplacer de fichiers.",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférez les liens symboliques : ils affichent clairement leur cible avec `ls -l` et se comprennent d'un coup d'œil, contrairement aux liens physiques invisibles.",
          },
        ],
      },
      {
        kind: "command",
        label: "Voir les inodes d'un dossier",
        command: "ls -li",
        why: "L'option `-i` affiche le numéro d'inode devant chaque nom. Créez un lien physique avec `ln` et constatez que les deux noms partagent le même numéro : la preuve visible du mécanisme.",
        verify: "Chaque ligne commence par un numéro d'inode.",
      },
    ],
  },
  {
    id: "shell-bash-zsh",
    title: "Shell : bash, zsh et sh",
    level: 3,
    intro:
      "Le shell est un langage autant qu'un interpréteur : comprendre les différences entre bash, zsh et sh évite les scripts qui ne marchent qu'à moitié.",
    blocks: [
      {
        kind: "text",
        text: "Le shell lit vos commandes, les découpe, étend les jokers et les variables, puis lance les programmes. `bash` (Bourne Again SHell) est le défaut historique sur la plupart des distributions ; `zsh` est le défaut de macOS et de Kali Linux, avec une complétion plus riche ; `sh` désigne le shell POSIX minimal — souvent un lien vers `bash` ou `dash` en mode compatible.",
      },
      {
        kind: "table",
        headers: ["Shell", "Points distinctifs", "Où on le rencontre"],
        rows: [
          ["`bash`", "Partout, énorme base de scripts existants", "Défaut de Debian, Ubuntu, Fedora, RHEL"],
          ["`zsh`", "Complétion avancée, thèmes (oh-my-zsh)", "Défaut de macOS et Kali Linux"],
          ["`sh` / `dash`", "Minimal, rapide, strictement POSIX", "Scripts système `/bin/sh`, boot"],
          ["`fish`", "Syntaxe moderne, suggestions automatiques", "Choix volontaire d'utilisateurs avancés"],
        ],
      },
      {
        kind: "fields",
        title: "Choisir son shell, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Restez sur le shell par défaut de votre système pour apprendre ; changez quand vous saurez pourquoi.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Écrire un script avec des fonctionnalités `bash` (tableaux, `[[ ]]`) mais un shebang `#!/bin/sh` : sur les systèmes où `sh` = `dash`, le script échoue mystérieusement.",
          },
          {
            label: "Bonne pratique",
            value:
              "Scripts portables → `#!/bin/sh` et syntaxe POSIX stricte. Scripts personnels exploitant bash → `#!/usr/bin/env bash` assumé et explicite.",
          },
          {
            label: "Note d'honnêteté",
            value:
              "Aucun shell n'est universellement meilleur : `zsh` brille en interactif, `dash` en vitesse d'exécution des scripts système. Le choix dépend de l'usage.",
          },
          {
            label: "Concepts liés",
            value:
              "Shebang, POSIX, variables d'environnement, scripts bash (sections dédiées).",
          },
        ],
      },
      {
        kind: "command",
        label: "Savoir quel shell vous utilisez",
        command: "echo $SHELL",
        why: "La variable `$SHELL` contient le chemin du shell de connexion. `$0` dans un terminal affiche le shell en cours d'exécution : deux informations complémentaires pour diagnostiquer.",
        verify: "Un chemin comme `/bin/bash` s'affiche.",
      },
    ],
  },
  {
    id: "variables-environnement",
    title: "Variables d'environnement",
    level: 3,
    intro:
      "Le shell transmet aux programmes un dictionnaire de variables : `PATH`, `HOME`, `EDITOR`… Les comprendre, c'est comprendre comment les programmes se trouvent entre eux.",
    blocks: [
      {
        kind: "command",
        label: "Lister toutes les variables",
        command: "env",
        why: "`env` affiche les variables d'environnement transmises aux processus. C'est la photographie du contexte dans lequel chaque commande s'exécute.",
        verify: "Des lignes `CLE=valeur` défilent (`PATH`, `HOME`, `USER`…).",
      },
      {
        kind: "command",
        label: "Afficher la valeur d'une variable",
        command: "echo $PATH",
        why: "`$NOM` est remplacé par la valeur de la variable avant l'exécution. `PATH` est la plus importante : la liste des dossiers où le shell cherche les programmes quand vous tapez une commande.",
        verify: "Une liste de dossiers séparés par `:` s'affiche (`/usr/bin:/bin:…`).",
      },
      {
        kind: "command",
        label: "Définir une variable pour la session",
        command: "export MON_OUTIL=\"/opt/mon-outil\"",
        why: "`export` rend la variable visible aux programmes lancés depuis ce shell (sans `export`, elle n'existe que pour le shell lui-même). Pour la rendre permanente, on l'écrit dans `~/.bashrc`.",
        verify: "`echo $MON_OUTIL` affiche `/opt/mon-outil` ; fermez le terminal et elle disparaît (non permanente).",
      },
      {
        kind: "fields",
        title: "Variables essentielles à connaître",
        fields: [
          {
            label: "`PATH`",
            value:
              "Dossiers fouillés pour trouver une commande. `command not found` signifie souvent : le programme n'est dans aucun dossier du `PATH`.",
          },
          {
            label: "`HOME`",
            value:
              "Votre dossier personnel. `cd` sans argument et `~` y mènent : deux écritures du même endroit.",
          },
          {
            label: "`EDITOR` / `VISUAL`",
            value:
              "L'éditeur que les outils (ex. `crontab -e`, `git commit`) ouvrent pour vous. À régler sur `nano` si `vim` vous intimide encore.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Écrire `export PATH = /x` avec des espaces autour du `=` : le shell y voit trois mots et échoue. En affectation, jamais d'espace autour du `=`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne modifiez jamais le `PATH` système dans `/etc` pour un besoin personnel : ajoutez vos dossiers dans `~/.bashrc` avec `export PATH=\"$HOME/bin:$PATH\"`.",
          },
          {
            label: "Concepts liés",
            value:
              "`~/.bashrc` vs `~/.profile`, portée exportée/non exportée, fichiers de démarrage du shell.",
          },
        ],
      },
    ],
  },
  {
    id: "flux-stdin-stdout-stderr",
    title: "Les trois flux : stdin, stdout, stderr",
    level: 3,
    intro:
      "Chaque programme dispose de trois canaux numérotés : comprendre leur séparation, c'est maîtriser redirection et diagnostic.",
    blocks: [
      {
        kind: "text",
        text: "Tout processus Unix naît avec trois descripteurs : `0` (stdin, l'entrée — par défaut votre clavier), `1` (stdout, la sortie normale — par défaut l'écran), `2` (stderr, les erreurs — par défaut l'écran aussi, mais sur un canal séparé). Séparer sortie et erreurs permet de traiter l'une sans être pollué par l'autre.",
      },
      {
        kind: "command",
        label: "Rediriger seulement les erreurs",
        command: "ls /inexistant 2> erreurs.log",
        why: "`2>` redirige le canal 2 (stderr) vers un fichier, laissant stdout intact. Ici l'écran reste vide et le message d'erreur est capturé dans le fichier : la démonstration la plus claire de la séparation des flux.",
        verify: "`cat erreurs.log` contient le message d'erreur.",
      },
      {
        kind: "command",
        label: "Fusionner erreurs et sortie",
        command: "make > build.log 2>&1",
        why: "`2>&1` redirige stderr vers la destination actuelle de stdout : tout (résultats + erreurs) finit dans `build.log`. Classique pour journaliser une compilation ou un déploiement sans rien perdre.",
        verify: "`cat build.log` contient à la fois les lignes normales et les erreurs éventuelles.",
      },
      {
        kind: "command",
        label: "Afficher ET sauvegarder avec tee",
        command: "pytest | tee resultats.txt",
        why: "`tee` lit stdin et écrit à la fois vers stdout (l'écran) et vers un fichier. On garde le confort du direct tout en archivant : idéal pour les lancements de tests ou d'installations.",
        verify: "Le résultat s'affiche à l'écran ET `cat resultats.txt` le montre.",
      },
      {
        kind: "fields",
        title: "Les trois flux en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`0` reçoit, `1` produit, `2` se plaint : redirigez chacun indépendamment.",
          },
          {
            label: "Pourquoi séparer erreurs et sortie",
            value:
              "Un script qui enchaîne `programme | traitement` ne doit recevoir que des données propres sur stdout : si les erreurs s'y mélangeaient, le traitement les avalerait comme des données.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`commande 2>&1 > fichier` : l'ordre compte ! Ici stderr est fusionné vers l'ancien stdout (l'écran), puis seul stdout va au fichier. Écrivez `> fichier 2>&1`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Dans vos scripts, envoyez vos propres messages d'erreur vers stderr : `echo \"échec\" >&2`. Vos scripts deviennent alors composables comme les outils Unix.",
          },
        ],
      },
    ],
  },
  {
    id: "permissions-avancees",
    title: "chmod : modifier les permissions",
    level: 3,
    intro:
      "Deux notations pour changer les droits : symbolique (lisible) et octale (compacte). Les deux se rencontrent partout.",
    blocks: [
      {
        kind: "command",
        label: "Rendre un script exécutable",
        command: "chmod +x deploy.sh",
        why: "La notation symbolique `+x` ajoute le droit d'exécution pour tout le monde. C'est le geste qui transforme un fichier texte en programme lançable avec `./deploy.sh`.",
        verify: "`ls -l deploy.sh` montre des `x` dans les permissions.",
      },
      {
        kind: "command",
        label: "Retirer l'écriture au groupe et aux autres",
        command: "chmod go-w rapport.txt",
        why: "`go-w` = groupes (`g`) + autres (`o`), retirer (`-`) l'écriture (`w`). La notation symbolique se lit comme une phrase : qui, opération, quoi.",
        verify: "`ls -l rapport.txt` montre `-rw-r--r--`.",
      },
      {
        kind: "command",
        label: "Permissions classiques d'un fichier web",
        command: "chmod 644 index.html",
        why: "La notation octale code chaque trio de droits en un chiffre (r=4, w=2, x=1) : `6`=rw-, `4`=r--. `644` = le propriétaire modifie, tout le monde lit : le réglage standard des fichiers servis par un serveur web.",
        verify: "`ls -l index.html` affiche `-rw-r--r--`.",
      },
      {
        kind: "command",
        label: "Permissions classiques d'un dossier web",
        command: "chmod 755 public/",
        why: "`755` = `rwxr-xr-x` : le propriétaire a tous les droits, les autres peuvent traverser le dossier et lire. Les dossiers ont besoin du `x` pour être traversés : un dossier en `644` serait illisible malgré le `r`.",
        verify: "`ls -ld public/` affiche `drwxr-xr-x`.",
      },
      {
        kind: "fields",
        title: "chmod en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Symbolique (`u+x`) pour raisonner, octal (`755`) pour appliquer vite les réglages courants.",
          },
          {
            label: "Mémo octal",
            value:
              "`7`=rwx, `6`=rw-, `5`=r-x, `4`=r--, `0`=aucun. Les combinaisons courantes : `755` dossiers/scripts publics, `644` fichiers publics, `600` secrets personnels (clés SSH).",
          },
          {
            label: "Erreur fréquente",
            value:
              "`chmod 777` « pour que ça marche » : cela donne tous les droits à tout le monde, y compris l'écriture. C'est le pansement qui crée une faille de sécurité ; préférez comprendre qui doit accéder à quoi.",
          },
          {
            label: "Bonne pratique",
            value:
              "Principe du moindre privilège : donnez le minimum nécessaire. Une clé privée SSH en `644` sera même refusée par `ssh` : `chmod 600 ~/.ssh/id_ed25519`.",
          },
          {
            label: "Concepts liés",
            value:
              "`chown`, bit setuid (notion), umask (permissions par défaut).",
          },
        ],
      },
    ],
  },
  {
    id: "chown-utilisateurs-groupes",
    title: "chown, utilisateurs et groupes",
    level: 3,
    intro:
      "Changer le propriétaire d'un fichier, créer des groupes de travail : l'administration multi-utilisateurs au quotidien.",
    blocks: [
      {
        kind: "command",
        label: "Changer le propriétaire d'un fichier",
        command: "sudo chown marie:compta rapport.pdf",
        why: "`chown` (change owner) transfère la propriété à `marie` et au groupe `compta`. Seul `root` (via `sudo`) peut donner un fichier à autrui : sinon n'importe qui se débarrasserait de ses fichiers en les « offrant ».",
        verify: "`ls -l rapport.pdf` affiche `marie compta` dans les colonnes propriétaire/groupe.",
      },
      {
        kind: "command",
        label: "Changer le groupe d'un projet partagé",
        command: "sudo chgrp dev projet/ -R",
        why: "`chgrp` ne change que le groupe, avec `-R` récursivement. Cas typique : un dossier partagé par une équipe, où chaque membre garde la propriété de ses fichiers mais le groupe commun permet la collaboration.",
        verify: "`ls -l projet/` montre le groupe `dev` sur tous les fichiers.",
      },
      {
        kind: "command",
        label: "Voir les groupes d'un utilisateur",
        command: "groups marie",
        why: "Affiche tous les groupes de `marie`. Pour donner à quelqu'un l'accès à un dossier partagé, on l'ajoute au groupe du dossier plutôt que de bricoler les permissions fichier par fichier.",
        verify: "La liste des groupes s'affiche (`marie`, `dev`, `compta`…).",
      },
      {
        kind: "fields",
        title: "Propriété et groupes en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Chaque fichier a un propriétaire et un groupe : `chown` change l'un ou l'autre, les groupes organisent la collaboration.",
          },
          {
            label: "Pourquoi deux niveaux",
            value:
              "Le propriétaire garde le contrôle fin de ses fichiers ; le groupe exprime une équipe ou un rôle (développeurs, comptables) sans multiplier les comptes.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`sudo chown -R` sur un dossier système (`/usr`, `/etc`) : le système ne s'en remet pas, les mises à jour et services cassent. Ne changez la propriété que sous `/home`, `/srv` ou `/opt`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Pour un dossier d'équipe : groupe dédié, `chmod 2770` (le `2` = bit setgid : les nouveaux fichiers héritent du groupe du dossier), membres ajoutés avec `usermod -aG equipe user`.",
          },
          {
            label: "Concepts liés",
            value:
              "`sudo` et `root`, bit setgid, `/etc/group`, `usermod`.",
          },
        ],
      },
    ],
  },
  {
    id: "sudo-root",
    title: "sudo et le super-utilisateur",
    level: 3,
    intro:
      "Agir avec les pleins pouvoirs sans être connecté en root : le mécanisme qui sécurise l'administration quotidienne.",
    blocks: [
      {
        kind: "text",
        text: "`root` est le super-utilisateur : aucun contrôle de permissions ne s'applique à lui. Travailler en permanence en `root` est dangereux — une faute de frappe a des conséquences illimitées. `sudo` (superuser do) exécute une seule commande avec les privilèges root après avoir demandé votre mot de passe : le principe du moindre privilège appliqué à vous-même.",
      },
      {
        kind: "command",
        label: "Exécuter une commande en administrateur",
        command: "sudo apt update",
        why: "Mettre à jour la liste des paquets touche au système : seul root le peut. `sudo` élève les privilèges pour cette commande uniquement, puis vous redevenez utilisateur normal.",
        verify: "Le système demande votre mot de passe (pas celui de root), puis exécute.",
      },
      {
        kind: "command",
        label: "Voir ses droits sudo",
        command: "sudo -l",
        why: "Affiche ce que votre utilisateur a le droit d'exécuter via `sudo`. Sur un serveur partagé, tout le monde n'a pas les mêmes droits : cette commande lève le doute.",
        verify: "La liste de vos autorisations s'affiche.",
      },
      {
        kind: "fields",
        title: "sudo en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`sudo` = emprunter les pouvoirs de root pour une commande, avec votre mot de passe et une trace dans les logs.",
          },
          {
            label: "Pourquoi pas root en permanence",
            value:
              "Chaque commande en root contourne toutes les protections. Avec `sudo`, seules les commandes préfixées sont privilégiées : la surface d'erreur est réduite au minimum.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`sudo` devant tout « au cas où » (ex. `sudo ls`) : inutile et mauvais réflexe. Si une commande échoue par manque de droits, demandez-vous d'abord si elle devrait vraiment toucher au système.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne donnez le `sudo` sans mot de passe (`NOPASSWD`) que dans des cas automatisés précis et audités. Et lisez toujours une commande trouvée en ligne avant de la préfixer par `sudo`.",
          },
          {
            label: "Concepts liés",
            value:
              "`/etc/sudoers` (via `visudo`), `su` vs `sudo`, journalisation des commandes sudo.",
          },
        ],
      },
    ],
  },
  {
    id: "wildcards-globbing",
    title: "Jokers et expansion (globbing)",
    level: 3,
    intro:
      "Le shell étend lui-même les motifs comme `*.txt` avant d'appeler la commande : comprendre qui voit quoi.",
    blocks: [
      {
        kind: "text",
        text: "Quand vous tapez `ls *.txt`, ce n'est pas `ls` qui comprend `*` : le shell remplace le motif par la liste des fichiers correspondants, puis appelle `ls` avec cette liste. C'est l'expansion (globbing). Conséquence : si aucun fichier ne correspond, le motif est passé tel quel à la commande, d'où des comportements surprenants.",
      },
      {
        kind: "table",
        headers: ["Motif", "Signification", "Exemple"],
        rows: [
          ["`*`", "N'importe quelle suite de caractères", "`*.jpg` : tous les JPEG"],
          ["`?`", "Un seul caractère quelconque", "`photo?.png` : photo1.png mais pas photo10.png"],
          ["`[abc]`", "Un caractère parmi la liste", "`fichier[123].txt`"],
          ["`[a-z]`", "Un caractère dans l'intervalle", "`[a-z]*.md`"],
          ["`{a,b}`", "Expansion d'accolades (liste explicite)", "`mkdir -p projet/{src,tests,docs}`"],
          ["`~`", "Dossier personnel", "`~/Documents`"],
        ],
      },
      {
        kind: "fields",
        title: "Le globbing en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le shell remplace les motifs par les noms réels avant l'exécution : la commande ne voit jamais le `*`.",
          },
          {
            label: "Pourquoi c'est le shell qui s'en charge",
            value:
              "Ainsi tous les programmes bénéficient des jokers sans les réimplémenter : `rm`, `cp`, `ls` reçoivent simplement des listes de fichiers.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`grep mot *.txt` dans un dossier sans `.txt` : le shell laisse `*.txt` tel quel et `grep` cherche un fichier littéralement nommé `*.txt`. Protégez les motifs destinés au programme avec des guillemets.",
          },
          {
            label: "Bonne pratique",
            value:
              "Testez un motif destructeur avec `ls` d'abord (`ls *.tmp`), puis remplacez `ls` par `rm`. Et souvenez-vous : les fichiers cachés (`.config`) ne sont pas capturés par `*`.",
          },
          {
            label: "Concepts liés",
            value:
              "Guillemets simples vs doubles, `find -name` (le programme filtre lui-même), expressions régulières.",
          },
        ],
      },
    ],
  },
  {
    id: "grep-avance",
    title: "grep : chercher dans le contenu",
    level: 3,
    intro:
      "Filtrer des lignes par motif dans des fichiers ou des flux : l'outil d'inspection le plus rentable du shell.",
    blocks: [
      {
        kind: "command",
        label: "Chercher un mot dans un fichier",
        command: "grep \"erreur\" journal.log",
        why: "`grep` affiche les lignes contenant le motif. Les guillemets protègent le motif des interprétations du shell (espaces, caractères spéciaux).",
        verify: "Seules les lignes contenant « erreur » s'affichent.",
      },
      {
        kind: "command",
        label: "Chercher récursivement avec numéros de ligne",
        command: "grep -rn \"TODO\" src/",
        why: "`-r` descend dans les sous-dossiers, `-n` préfixe chaque résultat par son numéro de ligne. La combinaison `-rn` est le réflexe standard pour fouiller un projet.",
        verify: "Des résultats comme `src/app.js:42: // TODO: …` apparaissent.",
      },
      {
        kind: "command",
        label: "Inverser et compter",
        command: "grep -vc \"^#\" config.ini",
        why: "`-v` inverse la sélection (lignes ne contenant PAS le motif), `-c` compte au lieu d'afficher. Ici : compter les lignes non-commentaires d'un fichier de config.",
        verify: "Un simple nombre s'affiche.",
      },
      {
        kind: "command",
        label: "Insensible à la casse, avec contexte",
        command: "grep -i -C 2 \"timeout\" app.log",
        why: "`-i` ignore la casse (Timeout, TIMEOUT…), `-C 2` affiche 2 lignes de contexte autour de chaque match. Pour comprendre une erreur, le contexte vaut souvent plus que la ligne elle-même.",
        verify: "Chaque occurrence apparaît entourée de ses voisines.",
      },
      {
        kind: "fields",
        title: "grep en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`grep` = filtre de lignes par motif, partout : fichiers, logs, sortie d'autres commandes via pipe.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Logs (« quelles erreurs ce matin ? »), code (« où est appelée cette fonction ? »), diagnostic (`dmesg | grep -i usb`). Pour des motifs complexes, passez aux expressions régulières avec `grep -E`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `-r` et s'étonner de ne rien trouver dans les sous-dossiers, ou chercher dans un dépôt Git sans exclure `.git` (préférez alors `grep -rn --exclude-dir=.git`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Combinez avec les pipes : `journalctl -u nginx | grep -i error | tail -n 20` — du général au particulier, en resserrant à chaque étape.",
          },
          {
            label: "Concepts liés",
            value:
              "Expressions régulières, `ripgrep` (`rg`, alternative moderne plus rapide), `awk` pour les colonnes.",
          },
        ],
      },
    ],
  },
  {
    id: "sed-awk-notions",
    title: "sed et awk : notions",
    level: 3,
    intro:
      "Deux vétérans du traitement de texte : `sed` pour substituer en flux, `awk` pour travailler en colonnes. À connaître en lecture.",
    blocks: [
      {
        kind: "text",
        text: "`sed` (stream editor) applique des transformations ligne par ligne sans ouvrir d'éditeur ; `awk` découpe chaque ligne en champs (`$1`, `$2`…) et permet calculs et filtres. On les rencontre surtout dans des scripts existants : savoir les lire suffit au début, les écrire viendra avec le besoin.",
      },
      {
        kind: "command",
        label: "Remplacer du texte dans un flux",
        command: "sed 's/localhost/127.0.0.1/g' config.txt",
        why: "`s/ancien/nouveau/g` substitue toutes (`g`) les occurrences sur chaque ligne. Sans redirection, le fichier n'est pas modifié : `sed` affiche le résultat, ce qui permet de vérifier avant d'agir.",
        verify: "Le texte modifié s'affiche à l'écran ; `cat config.txt` montre le fichier inchangé.",
      },
      {
        kind: "command",
        label: "Extraire une colonne de données",
        command: "ps aux | awk '{ print $2, $11 }'",
        why: "`awk` découpe chaque ligne sur les espaces : `$2` est le PID, `$11` la commande. Les accolades contiennent l'action en langage awk ; les guillemets simples protègent le `$` du shell.",
        verify: "Deux colonnes s'affichent : PID et nom du programme.",
      },
      {
        kind: "fields",
        title: "sed et awk en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`sed` transforme du texte en flux, `awk` raisonne en colonnes : deux lectures différentes des mêmes lignes.",
          },
          {
            label: "Quand les rencontrer",
            value:
              "Scripts d'administration, pipelines de logs, migrations de configuration en masse. Pour des transformations complexes et lisibles, un script Python est souvent préférable.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`sed -i` (modification sur place) sans sauvegarde : `sed -i.bak 's/a/b/g' fichier` crée d'abord `fichier.bak`. Sans `.bak`, une expression erronée corrompt le fichier sans retour.",
          },
          {
            label: "Bonne pratique",
            value:
              "Testez toujours sans `-i` d'abord, vérifiez visuellement, puis appliquez. Et commentez les expressions `sed`/`awk` non triviales dans vos scripts : vous ne les relirez pas dans six mois.",
          },
          {
            label: "Concepts liés",
            value:
              "Expressions régulières, `cut` (alternative simple pour les colonnes), `tr`.",
          },
        ],
      },
    ],
  },
  {
    id: "find-avance",
    title: "find avancé : temps, taille, exécution",
    level: 3,
    intro:
      "Dépasser la recherche par nom : filtrer par âge et taille, puis agir sur les résultats avec `-exec`.",
    blocks: [
      {
        kind: "command",
        label: "Fichiers modifiés récemment",
        command: "find /var/log -type f -mtime -7",
        why: "`-mtime -7` = modifiés il y a moins de 7 jours (`+7` = plus de 7 jours). Pour auditer « qu'est-ce qui a bougé cette semaine », c'est le filtre temporel de référence.",
        verify: "La liste des fichiers de logs récents s'affiche.",
      },
      {
        kind: "command",
        label: "Gros fichiers d'un projet",
        command: "find ~/projets -type f -size +100M",
        why: "`-size +100M` filtre les fichiers de plus de 100 mégaoctets. Le réflexe quand un disque se remplit : trouver les gros consommateurs avant de supprimer au hasard.",
        verify: "Les chemins des fichiers volumineux s'affichent.",
      },
      {
        kind: "command",
        label: "Agir sur chaque résultat",
        command: "find . -name \"*.tmp\" -exec rm {} \\;",
        why: "`-exec` lance la commande pour chaque fichier trouvé, `{}` étant remplacé par son chemin et `\\;` terminant la commande. Ici : supprimer tous les `.tmp`. Puissant — donc à tester d'abord sans la partie destructive.",
        verify: "Les `.tmp` ont disparu (`find . -name \"*.tmp\"` ne retourne plus rien).",
      },
      {
        kind: "fields",
        title: "find avancé en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`find` filtre par nom, type, âge, taille… puis exécute une action sur chaque match.",
          },
          {
            label: "Pourquoi `-exec` plutôt qu'un pipe",
            value:
              "Les noms de fichiers peuvent contenir espaces et retours à la ligne : `-exec` les transmet sans les découper, là où un pipe vers `xargs` exige des précautions (`-print0 | xargs -0`).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier d'échapper le point-virgule (`;` au lieu de `\\;`) : le shell l'interprète comme fin de commande et `find` échoue avec une erreur obscure.",
          },
          {
            label: "Bonne pratique",
            value:
              "Remplacez d'abord `-exec rm {} \\;` par `-print` pour voir ce qui serait touché. Pour les suppressions en masse, `-delete` (sans `-exec`) est plus simple et plus sûr.",
          },
          {
            label: "Concepts liés",
            value:
              "`xargs`, `-print0`, planification avec `cron` (nettoyage automatique).",
          },
        ],
      },
    ],
  },
  {
    id: "historique-terminal",
    title: "Historique et rappels de commandes",
    level: 3,
    intro:
      "Le shell mémorise vos commandes : les retrouver vite change le rythme de travail au quotidien.",
    blocks: [
      {
        kind: "command",
        label: "Rechercher dans l'historique",
        command: "Ctrl+R puis tapez \"ssh\"",
        why: "`Ctrl+R` lance la recherche incrémentale inversée : chaque lettre affine la commande correspondante la plus récente. `Entrée` l'exécute, `→` ou `Ctrl+J` permet de la modifier d'abord. Le gain de temps est immense.",
        verify: "Une ancienne commande contenant « ssh » s'affiche et devient éditable.",
      },
      {
        kind: "command",
        label: "Lister l'historique récent",
        command: "history | tail -n 20",
        why: "`history` affiche les commandes numérotées. On peut relancer la n° 42 avec `!42`. Stocké dans `~/.bash_history`, l'historique survit aux redémarrages.",
        verify: "Vos 20 dernières commandes numérotées s'affichent.",
      },
      {
        kind: "fields",
        title: "L'historique en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Flèche haut pour la dernière commande, `Ctrl+R` pour retrouver n'importe quelle ancienne commande.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Taper un mot de passe ou un secret directement dans une commande (`curl -u user:motdepasse`) : il reste en clair dans `~/.bash_history`. Utilisez des variables d'environnement ou des fichiers de configuration.",
          },
          {
            label: "Bonne pratique",
            value:
              "Préfixez d'une espace les commandes sensibles si `HISTCONTROL=ignorespace` est actif : elles ne sont pas enregistrées. Et nettoyez l'historique après un accident avec `history -d <numéro>`.",
          },
          {
            label: "Concepts liés",
            value:
              "Variables `HISTSIZE`/`HISTFILESIZE`, `~/.bash_history`, complétion `Tab`.",
          },
        ],
      },
    ],
  },
  {
    id: "gestion-paquets",
    title: "Installer des logiciels : apt, dnf, pacman",
    level: 3,
    intro:
      "Chaque famille a son gestionnaire de paquets : même logique (dépôts, dépendances), vocabulaire différent.",
    blocks: [
      {
        kind: "text",
        text: "Un gestionnaire de paquets installe des logiciels depuis des dépôts (serveurs de confiance), résout les dépendances automatiquement et applique les mises à jour de sécurité. C'est l'équivalent centralisé et vérifié des « app stores » — sans les applications douteuses téléchargées au hasard du web.",
      },
      {
        kind: "table",
        headers: ["Action", "Debian/Ubuntu (`apt`)", "Fedora/RHEL (`dnf`)", "Arch (`pacman`)"],
        rows: [
          ["Actualiser la liste des paquets", "`sudo apt update`", "— (intégré)", "`sudo pacman -Sy`"],
          ["Mettre à jour le système", "`sudo apt upgrade`", "`sudo dnf upgrade`", "`sudo pacman -Syu`"],
          ["Installer", "`sudo apt install nginx`", "`sudo dnf install nginx`", "`sudo pacman -S nginx`"],
          ["Désinstaller", "`sudo apt remove nginx`", "`sudo dnf remove nginx`", "`sudo pacman -R nginx`"],
          ["Chercher un paquet", "`apt search nginx`", "`dnf search nginx`", "`pacman -Ss nginx`"],
          ["Infos sur un paquet", "`apt show nginx`", "`dnf info nginx`", "`pacman -Si nginx`"],
        ],
      },
      {
        kind: "command",
        label: "Mettre à jour la liste puis le système (Debian/Ubuntu)",
        command: "sudo apt update && sudo apt upgrade",
        why: "`update` synchronise la liste des paquets disponibles, `upgrade` installe les nouvelles versions. Les deux étapes sont distinctes : mettre à jour sans `update` préalable n'installe rien de neuf.",
        verify: "Le système liste les paquets mis à jour ; un redémarrage peut être suggéré si le noyau a changé.",
      },
      {
        kind: "fields",
        title: "Les paquets en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le gestionnaire installe depuis des dépôts de confiance et gère dépendances et mises à jour.",
          },
          {
            label: "Pourquoi des dépôts plutôt que des téléchargements",
            value:
              "Les paquets des dépôts officiels sont signés et testés pour votre distribution : pas de malware déguisé, pas de DLL manquante, désinstallation propre.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mélanger les dépôts (ajouter des PPA Ubuntu sur Debian, ou des dépôts tiers incompatibles) : le système de dépendances se corrompt. Restez sur les dépôts officiels tant que vous débutez.",
          },
          {
            label: "Bonne pratique",
            value:
              "Mettez à jour régulièrement, surtout les serveurs exposés à internet. Et préférez le gestionnaire natif aux scripts d'installation `curl | bash` trouvés en ligne.",
          },
          {
            label: "Note d'honnêteté",
            value:
              "Formats universels (Flatpak, Snap, AppImage) existent pour installer des applis récentes sur n'importe quelle distro, mais le gestionnaire natif reste la voie la plus intégrée et la plus sûre.",
          },
          {
            label: "Concepts liés",
            value:
              "Dépôts et clés GPG, dépendances, `systemctl` pour gérer le service installé.",
          },
        ],
      },
    ],
  },
  {
    id: "processus-ps-kill",
    title: "Processus : ps, kill, top",
    level: 3,
    intro:
      "Voir ce qui tourne, comprendre l'état des programmes, arrêter proprement — ou fermement quand il le faut.",
    blocks: [
      {
        kind: "text",
        text: "Un processus est un programme en cours d'exécution, identifié par un PID (numéro unique). Le noyau les ordonnance sur le processeur ; vous les observez avec `ps`, les arrêtez avec `kill`, et surveillez les ressources avec `top`.",
      },
      {
        kind: "command",
        label: "Lister les processus",
        command: "ps aux",
        why: "`a` = tous les utilisateurs, `u` = format détaillé (utilisateur, CPU, mémoire), `x` = inclut les processus sans terminal. La vue d'ensemble standard pour répondre à « qu'est-ce qui tourne ? ».",
        verify: "Un tableau avec PID, %CPU, %MEM et COMMAND s'affiche.",
      },
      {
        kind: "command",
        label: "Trouver le PID d'un programme",
        command: "pgrep -a nginx",
        why: "`pgrep` cherche par nom et retourne les PID, `-a` affiche aussi la commande complète. Plus fiable que `ps aux | grep nginx`, qui capture aussi le `grep` lui-même.",
        verify: "Les lignes des processus nginx avec leurs PID s'affichent.",
      },
      {
        kind: "command",
        label: "Demander poliment l'arrêt",
        command: "kill 1234",
        why: "Sans option, `kill` envoie le signal TERM (15) : « termine-toi proprement ». Le programme peut alors sauvegarder son travail et libérer ses ressources. Remplacez 1234 par le vrai PID.",
        verify: "`ps -p 1234` ne retourne plus rien : le processus a disparu.",
      },
      {
        kind: "command",
        label: "Forcer l'arrêt en dernier recours",
        command: "kill -9 1234",
        why: "Le signal KILL (9) ne peut être ni ignoré ni intercepté : le noyau tue le processus immédiatement, sans lui laisser le temps de nettoyer. À réserver aux programmes totalement bloqués.",
        verify: "Le processus disparaît instantanément.",
      },
      {
        kind: "command",
        label: "Surveiller en temps réel",
        command: "top",
        why: "`top` affiche les processus triés par CPU, actualisés en continu (`q` pour quitter, `M` pour trier par mémoire). `htop`, plus lisible et coloré, s'installe via le gestionnaire de paquets.",
        verify: "Le tableau se rafraîchit toutes les quelques secondes.",
      },
      {
        kind: "fields",
        title: "Les processus en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`ps` observe, `kill` signale, `top` surveille : trois vues du même monde vivant.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`kill -9` en premier réflexe : les fichiers temporaires et verrous ne sont pas nettoyés, les bases de données peuvent corrompre des écritures en cours. Toujours TERM d'abord, KILL ensuite si nécessaire.",
          },
          {
            label: "Bonne pratique",
            value:
              "Avant de tuer, identifiez avec `ps`/`pgrep` : tuer le mauvais PID (surtout en root) peut arrêter un service critique. Et préférez `systemctl stop` pour les services gérés.",
          },
          {
            label: "Concepts liés",
            value:
              "Signaux (section suivante), jobs (`&`, `fg`, `bg`), `systemd`.",
          },
        ],
      },
    ],
  },
  {
    id: "signaux-jobs",
    title: "Signaux et tâches en arrière-plan",
    level: 3,
    intro:
      "Communiquer avec les processus : les suspendre, les relancer, les lancer en tâche de fond.",
    blocks: [
      {
        kind: "text",
        text: "Un signal est un message du noyau (ou d'un autre processus) vers un processus : « termine-toi » (TERM), « recharge ta config » (HUP), « arrête-toi net » (KILL). Parallèlement, le shell gère des « jobs » : des commandes lancées depuis ce terminal, que l'on peut passer en arrière-plan.",
      },
      {
        kind: "command",
        label: "Lancer en arrière-plan",
        command: "python3 serveur.py &",
        why: "L'esperluette `&` rend la main immédiatement : le programme tourne en tâche de fond et vous pouvez continuer à taper. Le shell affiche le numéro de job et le PID.",
        verify: "L'invite réapparaît aussitôt ; `jobs` liste la tâche.",
      },
      {
        kind: "command",
        label: "Suspendre puis reprendre",
        command: "Ctrl+Z puis bg",
        why: "`Ctrl+Z` suspend la commande au premier plan (elle s'arrête sans mourir), `bg` la relance en arrière-plan, `fg` la ramène au premier plan. Le trio de la multitâche au terminal.",
        verify: "`jobs` montre la tâche avec l'état Running ou Stopped selon l'étape.",
      },
      {
        kind: "table",
        headers: ["Signal", "Numéro", "Effet", "Usage typique"],
        rows: [
          ["TERM", "15", "Arrêt propre (interceptable)", "`kill <pid>` : toujours en premier"],
          ["HUP", "1", "Raccrochage ; souvent = recharger la config", "Relire une config sans redémarrer"],
          ["INT", "2", "Interruption (`Ctrl+C`)", "Stopper la commande au premier plan"],
          ["KILL", "9", "Arrêt immédiat (non interceptable)", "Dernier recours uniquement"],
        ],
      },
      {
        kind: "fields",
        title: "Signaux et jobs en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Les signaux parlent aux processus, les jobs organisent vos commandes dans le terminal.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Fermer le terminal en pensant que les jobs continuent : par défaut, ils reçoivent SIGHUP et meurent. Pour un programme qui survit à la déconnexion, utilisez `nohup`, `tmux` ou un service `systemd`.",
          },
          {
            label: "Bonne pratique",
            value:
              "`Ctrl+C` (INT) pour interrompre, `Ctrl+Z` + `bg` pour libérer le terminal sans tuer, `kill` TERM avant KILL : une gradation du doux vers le fort.",
          },
          {
            label: "Concepts liés",
            value:
              "`nohup`, `disown`, `tmux`/`screen`, services `systemd`.",
          },
        ],
      },
    ],
  },
  {
    id: "systemd-systemctl",
    title: "systemd et systemctl : gérer les services",
    level: 3,
    intro:
      "Le gestionnaire de services des distributions modernes : démarrer, arrêter, activer au boot un serveur web ou une base de données.",
    blocks: [
      {
        kind: "text",
        text: "`systemd` est le premier processus du système (PID 1) sur la plupart des distributions actuelles : il démarre la machine et supervise les services. `systemctl` est son interface : une seule commande pour l'état, le démarrage et l'activation au boot de n'importe quel service.",
      },
      {
        kind: "command",
        label: "Voir l'état d'un service",
        command: "systemctl status nginx",
        why: "Affiche si le service tourne (active), s'il démarrera au boot (enabled), son PID et ses derniers logs. Le premier diagnostic quand « le site ne répond plus ».",
        verify: "Des lignes `Active: active (running)` et les derniers logs apparaissent.",
      },
      {
        kind: "command",
        label: "Démarrer et activer au boot",
        command: "sudo systemctl enable --now nginx",
        why: "`enable` active le démarrage automatique au boot, `--now` démarre immédiatement : deux opérations en une. Sans `enable`, le service ne reviendrait pas après un redémarrage.",
        verify: "`systemctl is-enabled nginx` répond `enabled`.",
      },
      {
        kind: "command",
        label: "Redémarrer après un changement de config",
        command: "sudo systemctl restart nginx",
        why: "Après avoir modifié `/etc/nginx/nginx.conf`, `restart` applique la nouvelle configuration. `reload` (quand supporté) recharge la config sans couper les connexions en cours : préférez-le en production.",
        verify: "`systemctl status nginx` montre une heure de démarrage récente.",
      },
      {
        kind: "fields",
        title: "systemd en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`systemctl` pilote les services : `status` diagnostique, `start/stop/restart` agit, `enable/disable` persiste au boot.",
          },
          {
            label: "Pourquoi un superviseur",
            value:
              "Un serveur doit redémarrer ses services après un crash ou un reboot, dans le bon ordre, avec les bonnes dépendances : c'est le travail de `systemd`, pas le vôtre à 3h du matin.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Confondre `start` et `enable` : le service tourne jusqu'au prochain reboot puis disparaît. Sur un serveur, on veut presque toujours les deux (`enable --now`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Après chaque modification de config, `systemctl reload-or-restart` : recharge en douceur si possible, redémarre sinon. Et consultez toujours `status` après l'action.",
          },
          {
            label: "Concepts liés",
            value:
              "`journalctl` (les logs), fichiers unit sous `/etc/systemd/system`, `systemctl daemon-reload`.",
          },
        ],
      },
    ],
  },
  {
    id: "journalctl-logs",
    title: "Lire les logs avec journalctl",
    level: 3,
    intro:
      "Le journal centralisé de systemd : interroger les logs par service, par période, en suivi temps réel.",
    blocks: [
      {
        kind: "command",
        label: "Logs d'un service",
        command: "journalctl -u nginx --since \"1 hour ago\"",
        why: "`-u` filtre par unité (service), `--since` par période. Fini la chasse aux fichiers dans `/var/log` : le journal centralise et indexe tout ce que les services écrivent.",
        verify: "Les logs nginx de la dernière heure s'affichent.",
      },
      {
        kind: "command",
        label: "Suivre les logs en direct",
        command: "journalctl -f",
        why: "`-f` (follow) affiche les nouvelles entrées au fur et à mesure, comme `tail -f` mais sur tout le journal. Combinez avec `-u` pour suivre un seul service pendant un test.",
        verify: "Le curseur attend ; provoquez une requête et la ligne apparaît.",
      },
      {
        kind: "command",
        label: "Voir les erreurs du dernier boot",
        command: "journalctl -p err -b",
        why: "`-p err` ne garde que les priorités erreur et pire, `-b` limite au démarrage courant. Le filtre express pour « qu'est-ce qui a raté au dernier redémarrage ? ».",
        verify: "Seules les lignes d'erreur du boot actuel s'affichent.",
      },
      {
        kind: "fields",
        title: "journalctl en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`journalctl` interroge le journal système comme une base de données : par service, par temps, par gravité.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Service qui ne démarre pas, comportement bizarre après une mise à jour, audit post-incident. Premier réflexe avant de modifier une configuration au hasard.",
          },
          {
            label: "Bonne pratique",
            value:
              "Lisez les logs avant d'agir : 80 % des pannes de service s'expliquent dans les 20 dernières lignes (`journalctl -u <service> -n 20`).",
          },
          {
            label: "Concepts liés",
            value:
              "`/var/log` (logs classiques), `dmesg` (messages du noyau), rotation des logs.",
          },
        ],
      },
    ],
  },
  {
    id: "espace-disque",
    title: "Disque plein ? df et du",
    level: 3,
    intro:
      "Diagnostiquer un disque saturé : voir l'occupation globale, puis traquer les dossiers gloutons.",
    blocks: [
      {
        kind: "command",
        label: "Voir l'espace libre par partition",
        command: "df -h",
        why: "`df` (disk free) montre l'occupation de chaque système de fichiers monté ; `-h` (human) affiche en Go/Mo lisibles. Le « disque plein » est la première cause des écritures qui échouent mystérieusement.",
        verify: "Un tableau avec colonnes Taille, Utilisé, Dispo, Utilisation% s'affiche.",
      },
      {
        kind: "command",
        label: "Trouver les dossiers les plus lourds",
        command: "du -sh /* 2>/dev/null | sort -rh | head -n 10",
        why: "`du` (disk usage) mesure l'occupation ; `-s` résume par dossier, `-h` rend lisible. Trié par taille décroissante, on identifie en une commande le coupable d'un disque plein.",
        verify: "Les 10 plus gros dossiers de la racine s'affichent, le plus lourd en premier.",
      },
      {
        kind: "fields",
        title: "Le disque en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`df` dit s'il reste de la place, `du` dit qui la consomme.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Supprimer un fichier de log encore ouvert par un programme : `df` ne libère rien tant que le processus le garde ouvert. Redémarrez le service ou tronquez avec `: > /var/log/gros.log`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Surveillez aussi les inodes (`df -i`) : des millions de petits fichiers peuvent épuiser les inodes alors qu'il reste des gigaoctets libres.",
          },
          {
            label: "Concepts liés",
            value:
              "Inodes, rotation des logs (`logrotate`), `/tmp` nettoyé au boot.",
          },
        ],
      },
    ],
  },
  {
    id: "ssh-connexion",
    title: "SSH : se connecter à un serveur distant",
    level: 3,
    intro:
      "Le protocole d'administration à distance : un terminal sécurisé vers n'importe quelle machine du monde.",
    blocks: [
      {
        kind: "text",
        text: "SSH (Secure Shell) ouvre un shell chiffré sur une machine distante, par défaut sur le port 22. C'est l'outil central de l'administration : serveurs cloud, Raspberry Pi, machines de CI — tout s'administre en SSH. Il remplace les antiques `telnet`/`rsh`, qui transmettaient les mots de passe en clair.",
      },
      {
        kind: "command",
        label: "Se connecter à un serveur",
        command: "ssh marie@192.168.1.10",
        why: "La forme `utilisateur@hôte` ouvre une session interactive distante : votre terminal devient celui du serveur. Tout ce que vous avez appris (`ls`, `cd`, `systemctl`…) s'y applique.",
        verify: "L'invite change (`marie@serveur:~$`) : vous êtes sur la machine distante.",
      },
      {
        kind: "command",
        label: "Exécuter une commande sans session interactive",
        command: "ssh marie@192.168.1.10 \"df -h\"",
        why: "En passant la commande en argument, SSH l'exécute et rend la main : parfait dans les scripts qui interrogent plusieurs serveurs à la suite.",
        verify: "Le résultat de `df -h` du serveur s'affiche dans votre terminal local.",
      },
      {
        kind: "command",
        label: "Changer le port par défaut",
        command: "ssh -p 2222 marie@192.168.1.10",
        why: "L'option `-p` précise un port SSH non standard, fréquent sur les hébergeurs qui déplacent SSH pour réduire le bruit des scans automatiques.",
        verify: "La connexion s'établit sur le port indiqué.",
      },
      {
        kind: "fields",
        title: "SSH en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "SSH = un terminal distant chiffré, la télécommande universelle des serveurs Linux.",
          },
          {
            label: "Pourquoi chiffré",
            value:
              "Tout transite (identifiants, commandes, données) dans un tunnel chiffré vérifié par clés d'hôte : à la première connexion, vérifiez l'empreinte affichée par votre hébergeur avant d'accepter.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Taper `exit` en croyant fermer un onglet local alors qu'on est en SSH : on se déconnecte du serveur (c'est le but de `exit`), pas grave, mais surprenant la première fois.",
          },
          {
            label: "Bonne pratique",
            value:
              "Désactivez l'authentification par mot de passe au profit des clés (section suivante) sur tout serveur exposé à internet, et ne vous connectez jamais en `root` directement.",
          },
          {
            label: "Concepts liés",
            value:
              "Clés SSH, `scp`/`rsync`, tunnels SSH (`-L`), `~/.ssh/known_hosts`.",
          },
        ],
      },
    ],
  },
  {
    id: "cles-ssh",
    title: "Clés SSH : se connecter sans mot de passe",
    level: 3,
    intro:
      "Une paire de clés cryptographiques remplace le mot de passe : plus pratique et plus sûr, quand c'est bien fait.",
    blocks: [
      {
        kind: "text",
        text: "Le principe : vous gardez une clé privée sur votre poste (jamais partagée), et déposez la clé publique sur chaque serveur. Le serveur vérifie que vous possédez la privée sans jamais la voir. Fini les mots de passe tapés — et les attaques par force brute contre eux.",
      },
      {
        kind: "command",
        label: "Générer une paire de clés",
        command: "ssh-keygen -t ed25519 -C \"marie@poste\"",
        why: "`-t ed25519` choisit l'algorithme moderne recommandé (clés courtes, rapides, sûres) ; `-C` ajoute un commentaire d'identification. Acceptez le chemin par défaut `~/.ssh/id_ed25519`.",
        verify: "`ls ~/.ssh/` montre `id_ed25519` (privée) et `id_ed25519.pub` (publique).",
      },
      {
        kind: "command",
        label: "Copier la clé publique sur le serveur",
        command: "ssh-copy-id marie@192.168.1.10",
        why: "`ssh-copy-id` ajoute votre clé publique au fichier `~/.ssh/authorized_keys` du serveur, en créant le dossier avec les bonnes permissions. Une commande au lieu de manipulations manuelles error-prone.",
        verify: "La prochaine connexion `ssh marie@192.168.1.10` ne demande plus de mot de passe.",
      },
      {
        kind: "command",
        label: "Protéger la clé privée",
        command: "chmod 600 ~/.ssh/id_ed25519",
        why: "La clé privée ne doit être lisible que par vous : SSH refuse d'utiliser une clé trop permissive. `ssh-keygen` règle déjà cela, mais vérifiez après toute copie ou restauration.",
        verify: "`ls -l ~/.ssh/id_ed25519` affiche `-rw-------`.",
      },
      {
        kind: "fields",
        title: "Les clés SSH en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Privée chez vous, publique sur les serveurs : l'asymétrie cryptographique remplace les mots de passe.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Partager ou copier la clé privée sur plusieurs machines (ou pire, par email/messagerie). Une clé privée = une machine. Pour un nouvel appareil, générez une nouvelle paire.",
          },
          {
            label: "Bonne pratique",
            value:
              "Protégez la clé privée par une phrase de passe (demandée à la génération) et utilisez `ssh-agent` pour ne la taper qu'une fois par session.",
          },
          {
            label: "Concepts liés",
            value:
              "`ssh-agent`, `~/.ssh/config` (alias de connexion), cryptographie asymétrique.",
          },
        ],
      },
    ],
  },
  {
    id: "scp-rsync",
    title: "Copier des fichiers : scp et rsync",
    level: 3,
    intro:
      "Transférer des fichiers vers et depuis un serveur : `scp` pour l'occasionnel, `rsync` pour le sérieux.",
    blocks: [
      {
        kind: "command",
        label: "Envoyer un fichier sur le serveur",
        command: "scp rapport.pdf marie@192.168.1.10:/home/marie/",
        why: "`scp` (secure copy) utilise SSH pour copier : même syntaxe `utilisateur@hôte:chemin`, même sécurité. Avec `-r`, il copie un dossier entier.",
        verify: "En SSH sur le serveur, `ls /home/marie/` montre le fichier.",
      },
      {
        kind: "command",
        label: "Récupérer un fichier du serveur",
        command: "scp marie@192.168.1.10:/var/log/nginx/access.log .",
        why: "Le sens s'inverse simplement : la source distante d'abord, la destination locale (`.` = ici) ensuite. Typique pour rapatrier un log à analyser tranquillement.",
        verify: "`ls -l access.log` confirme la présence locale.",
      },
      {
        kind: "command",
        label: "Synchroniser un dossier (la bonne méthode)",
        command: "rsync -avz ~/site/ marie@192.168.1.10:/var/www/site/",
        why: "`rsync` ne transfère que les différences : rapide sur les gros dossiers. `-a` (archive : permissions, dates), `-v` (verbeux), `-z` (compression). La barre oblique finale sur la source synchronise le contenu du dossier.",
        verify: "Relancez la commande : presque rien n'est transféré (« tout est à jour »).",
      },
      {
        kind: "fields",
        title: "Transferts en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`scp` copie simplement via SSH ; `rsync` synchronise intelligemment et reprend là où ça s'était arrêté.",
          },
          {
            label: "Quand choisir rsync",
            value:
              "Déploiements, sauvegardes, gros dossiers : reprise sur échec, transfert différentiel, exclusion de motifs (`--exclude='.git'`). Pour un fichier isolé, `scp` suffit.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier la barre oblique : `rsync -av ~/site distant:/www/` crée `/www/site/`, tandis que `~/site/` synchronise le contenu dans `/www/`. Vérifiez avec `--dry-run` avant un transfert critique.",
          },
          {
            label: "Bonne pratique",
            value:
              "Testez avec `rsync -avz --dry-run` : il affiche ce qu'il ferait sans rien toucher. Indispensable avant d'ajouter `--delete` (qui supprime côté destination).",
          },
          {
            label: "Concepts liés",
            value:
              "Clés SSH (transferts sans mot de passe), `sftp`, sauvegardes automatisées.",
          },
        ],
      },
    ],
  },
  {
    id: "reseau-base",
    title: "Réseau de base : ip, ping, curl",
    level: 3,
    intro:
      "Vérifier la connectivité et interroger des services : le diagnostic réseau en trois commandes.",
    blocks: [
      {
        kind: "command",
        label: "Voir ses adresses IP",
        command: "ip -brief addr",
        why: "`ip` remplace l'ancien `ifconfig` : il affiche interfaces et adresses. `-brief` donne une vue compacte. `lo` (127.0.0.1) est l'interface locale, `eth0`/`enp0s3` la carte réseau.",
        verify: "Vos adresses IPv4/IPv6 s'affichent par interface.",
      },
      {
        kind: "command",
        label: "Tester la connectivité",
        command: "ping -c 4 8.8.8.8",
        why: "`ping` envoie des paquets ICMP et mesure les réponses. `-c 4` limite à 4 essais (sinon il ne s'arrête qu'avec `Ctrl+C`). Si ça échoue ici, le problème est réseau, pas applicatif.",
        verify: "Des lignes `64 bytes from 8.8.8.8` avec les temps de réponse.",
      },
      {
        kind: "command",
        label: "Interroger un service web",
        command: "curl -I https://example.com",
        why: "`curl` effectue des requêtes HTTP ; `-I` ne récupère que les en-têtes. Pour vérifier qu'un serveur web répond (et voir son code 200/404/500), c'est l'outil le plus direct.",
        verify: "Les en-têtes HTTP s'affichent, avec `HTTP/2 200` en première ligne.",
      },
      {
        kind: "fields",
        title: "Le diagnostic réseau en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`ip` décrit la configuration, `ping` teste la route, `curl` interroge le service : du bas vers le haut.",
          },
          {
            label: "Pourquoi cet ordre",
            value:
              "On isole la couche en panne : pas d'IP → config locale ; ping OK mais curl KO → le service est en cause, pas le réseau. C'est la méthode qui évite de chercher au mauvais endroit.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Conclure « le serveur est down » sur un ping bloqué : beaucoup de pare-feu filtrent l'ICMP alors que le web fonctionne. Testez le port réel (`curl`) avant de conclure.",
          },
          {
            label: "Bonne pratique",
            value:
              "Sur un serveur, vérifiez d'abord que le service écoute localement (`curl http://localhost:8080`) avant d'incriminer le réseau ou le pare-feu.",
          },
          {
            label: "Concepts liés",
            value:
              "`ss -tlnp` (ports en écoute), DNS (`dig`, `getent hosts`), pare-feu.",
          },
        ],
      },
    ],
  },
  {
    id: "nano-edition",
    title: "Éditer en terminal : nano",
    level: 3,
    intro:
      "Modifier un fichier de configuration sur un serveur sans interface graphique : `nano`, l'éditeur abordable.",
    blocks: [
      {
        kind: "text",
        text: "`nano` est un éditeur en mode texte : il occupe tout le terminal, affiche ses raccourcis en bas d'écran (`^X` = Ctrl+X), et se prend en main en deux minutes. C'est l'éditeur à connaître en premier — et celui à déclarer dans `EDITOR` en attendant de maîtriser `vim`.",
      },
      {
        kind: "command",
        label: "Ouvrir un fichier",
        command: "nano ~/.bashrc",
        why: "Ouvre le fichier dans l'éditeur. Si le fichier n'existe pas, `nano` le créera à l'enregistrement : pratique pour créer des configs.",
        verify: "Le contenu du fichier s'affiche, avec la barre de raccourcis en bas.",
      },
      {
        kind: "table",
        headers: ["Raccourci", "Action"],
        rows: [
          ["`Ctrl+O`", "Enregistrer (Write Out) — confirmez le nom avec Entrée"],
          ["`Ctrl+X`", "Quitter (propose d'enregistrer si modifié)"],
          ["`Ctrl+K`", "Couper la ligne courante"],
          ["`Ctrl+U`", "Coller la ligne coupée"],
          ["`Ctrl+W`", "Chercher un texte"],
          ["`Ctrl+G`", "Aide complète"],
        ],
      },
      {
        kind: "fields",
        title: "nano en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`nano` : l'éditeur terminal qui affiche ses raccourcis — impossible de rester coincé.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Éditer un fichier système sans `sudo` puis ne pas comprendre pourquoi l'enregistrement échoue : `nano` seul ouvre en lecture seule effective. Relancez avec `sudo nano /etc/...`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Sauvegardez avant de modifier (`cp fichier fichier.bak`) et n'éditez qu'une chose à la fois : si le service ne redémarre plus, vous savez quoi annuler.",
          },
          {
            label: "Concepts liés",
            value:
              "`vim` (section suivante), variable `EDITOR`, permissions d'écriture.",
          },
        ],
      },
    ],
  },
  {
    id: "vim-notions",
    title: "vim : les notions de survie",
    level: 3,
    intro:
      "L'éditeur que vous croiserez partout (y compris quand `git commit` l'ouvre par surprise) : les modes et comment en sortir.",
    blocks: [
      {
        kind: "text",
        text: "`vim` fonctionne par modes : en mode Normal les touches sont des commandes (`dd` supprime une ligne), en mode Insertion elles écrivent du texte. Cette idée déroute au début, puis devient redoutablement efficace — mais pour l'apprentissage, seules les notions de survie comptent.",
      },
      {
        kind: "table",
        headers: ["Touche / commande", "Effet"],
        rows: [
          ["`i`", "Passer en mode Insertion (écrire)"],
          ["`Échap`", "Revenir en mode Normal"],
          ["`:w`", "Enregistrer"],
          ["`:q`", "Quitter"],
          ["`:wq` ou `ZZ`", "Enregistrer et quitter"],
          ["`:q!`", "Quitter sans enregistrer (la sortie de secours)"],
          ["`dd`", "Supprimer la ligne (mode Normal)"],
          ["`u`", "Annuler (mode Normal)"],
          ["`/mot`", "Chercher « mot »"],
        ],
      },
      {
        kind: "fields",
        title: "vim en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Deux modes (Normal/Insertion), `:q!` pour fuir : le kit de survie tient en cinq commandes.",
          },
          {
            label: "Pourquoi il est partout",
            value:
              "Installé par défaut sur quasiment tous les Unix, utilisable sur les connexions les plus lentes, et ouvreur par défaut de `git`, `crontab` et `visudo` : on ne peut pas l'éviter, autant le connaître.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Taper du texte en mode Normal : chaque lettre déclenche une commande et le fichier se transforme en champ de bataille. Réflexe : `Échap`, `u` pour annuler, puis `i` pour écrire.",
          },
          {
            label: "Bonne pratique",
            value:
              "Tant que `vim` vous stresse, forcez `export EDITOR=nano` dans votre `~/.bashrc` : les outils ouvriront `nano`. Apprenez `vim` ensuite, sans pression.",
          },
          {
            label: "Concepts liés",
            value:
              "`vimtutor` (tutoriel interactif de 30 min), variable `EDITOR`, modes.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lancer le tutoriel interactif",
        command: "vimtutor",
        why: "Un cours guidé dans `vim` lui-même, environ 30 minutes : la méthode reconnue pour passer du mode survie au mode efficace, leçon par leçon.",
        verify: "Le tutoriel s'ouvre avec la leçon 1.",
      },
    ],
  },
  {
    id: "tmux-notion",
    title: "tmux : des sessions qui survivent",
    level: 3,
    intro:
      "Garder des programmes en vie après la déconnexion SSH et organiser son terminal en panneaux : la notion qui change l'administration distante.",
    blocks: [
      {
        kind: "text",
        text: "`tmux` (terminal multiplexer) crée des sessions de terminal persistantes côté serveur : vous vous détachez, vous vous déconnectez, la session continue de tourner. En vous reconnectant, vous la rattachez et retrouvez tout — logs en cours, éditeur ouvert, compilation lancée.",
      },
      {
        kind: "command",
        label: "Créer une session nommée",
        command: "tmux new -s deploiement",
        why: "Démarre une session `tmux` nommée : tout ce que vous y lancez appartient à la session, pas à votre connexion SSH. Le nom explicite permet de la retrouver parmi d'autres.",
        verify: "Une barre de statut verte apparaît en bas du terminal.",
      },
      {
        kind: "command",
        label: "Se détacher sans rien arrêter",
        command: "Ctrl+B puis D",
        why: "Le préfixe `Ctrl+B` suivi de `d` (detach) rend la main au shell d'origine : la session `tmux` continue en arrière-plan sur le serveur, insensible à la déconnexion.",
        verify: "Message `detached`, retour au shell normal.",
      },
      {
        kind: "command",
        label: "Retrouver sa session",
        command: "tmux attach -t deploiement",
        why: "Rattache la session nommée, même depuis une nouvelle connexion SSH : on retrouve exactement l'état laissé, y compris les programmes en cours.",
        verify: "Le contenu de la session réapparaît tel quel.",
      },
      {
        kind: "fields",
        title: "tmux en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`tmux` découple votre travail de votre connexion : le serveur garde tout, vous partez et revenez.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Déploiements longs, compilations, surveillance de logs sur serveur distant, travail réparti en plusieurs panneaux (`Ctrl+B %` divise verticalement, `Ctrl+B \"` horizontalement).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Multiplier les sessions sans les fermer (`tmux ls` révèle l'amas) : chacune consomme de la mémoire. Nettoyez avec `tmux kill-session -t nom`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Une session par tâche, nommée explicitement (`deploiement`, `logs`, `debug`) : dans six mois, `tmux ls` restera lisible.",
          },
          {
            label: "Concepts liés",
            value:
              "`screen` (l'ancêtre), `nohup`, jobs du shell.",
          },
        ],
      },
    ],
  },
  {
    id: "scripts-bash-variables",
    title: "Scripts bash : variables et premier script",
    level: 3,
    intro:
      "Transformer une suite de commandes en programme réutilisable : le shebang, les variables, l'exécution.",
    blocks: [
      {
        kind: "text",
        text: "Un script shell est un fichier texte contenant des commandes, exécutées ligne par ligne. La première ligne, le shebang (`#!/usr/bin/env bash`), indique quel interpréteur utiliser. C'est ainsi que naissent les outils d'administration : on automatise d'abord ce qu'on faisait à la main.",
      },
      {
        kind: "code",
        language: "bash",
        title: "sauvegarde.sh — premier script complet",
        code: "#!/usr/bin/env bash\n# Sauvegarde horodatée d'un dossier vers /tmp\n\nSOURCE=\"$HOME/Documents\"\nDEST=\"/tmp/sauvegarde-$(date +%Y%m%d)\"\n\nmkdir -p \"$DEST\"\ncp -r \"$SOURCE\" \"$DEST\"\necho \"Sauvegarde terminée dans $DEST\"",
      },
      {
        kind: "command",
        label: "Rendre le script exécutable et le lancer",
        command: "chmod +x sauvegarde.sh && ./sauvegarde.sh",
        why: "`chmod +x` donne le droit d'exécution, `./` lance le script du dossier courant (qui n'est généralement pas dans le `PATH`, par sécurité). Le `&&` n'exécute la suite que si la première commande réussit.",
        verify: "Le message de confirmation s'affiche et `/tmp/sauvegarde-<date>/` existe.",
      },
      {
        kind: "fields",
        title: "Le premier script en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Shebang + variables + commandes + `chmod +x` : un script est une session terminal rejouable.",
          },
          {
            label: "Pourquoi des guillemets autour des variables",
            value:
              "`\"$SOURCE\"` protège les espaces et caractères spéciaux des chemins. Sans guillemets, un dossier nommé « mes docs » serait découpé en deux arguments.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Écrire `NOM = \"valeur\"` avec des espaces autour du `=` : le shell cherche alors une commande nommée `NOM`. En affectation, aucun espace autour du `=`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commencez vos scripts par `set -euo pipefail` : arrêt à la première erreur (`-e`), erreur sur variable non définie (`-u`), échec propagé dans les pipes (`-o pipefail`).",
          },
          {
            label: "Concepts liés",
            value:
              "Variables spéciales (`$1`, `$#`, `$?`), conditions et boucles (section suivante).",
          },
        ],
      },
    ],
  },
  {
    id: "scripts-bash-conditions-boucles",
    title: "Scripts bash : conditions et boucles",
    level: 3,
    intro:
      "Rendre les scripts intelligents : tester des conditions et répéter des actions sur des listes de fichiers.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Conditions : tester avant d'agir",
        code: "#!/usr/bin/env bash\nset -euo pipefail\n\nFICHIER=\"/tmp/sauvegarde/rapport.txt\"\n\nif [ -f \"$FICHIER\" ]; then\n  echo \"Le fichier existe, on l'archive\"\n  gzip \"$FICHIER\"\nelse\n  echo \"Rien à archiver\" >&2\n  exit 1\nfi",
      },
      {
        kind: "code",
        language: "bash",
        title: "Boucle : agir sur chaque fichier",
        code: "#!/usr/bin/env bash\nset -euo pipefail\n\nfor img in ~/Images/*.jpg; do\n  echo \"Conversion de $img\"\n  convert \"$img\" \"${img%.jpg}.png\"\ndone\necho \"Terminé\"",
      },
      {
        kind: "fields",
        title: "Conditions et boucles en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`if [ test ]` décide, `for x in liste` répète : les deux structures couvrent 90 % des scripts d'administration.",
          },
          {
            label: "Tests courants",
            value:
              "`-f` fichier existe, `-d` dossier existe, `-z` chaîne vide, `=` égalité de chaînes, `-eq` égalité de nombres. Toujours des espaces après `[` et avant `]` : ce sont des commandes, pas de la ponctuation.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`if [ $var = \"x\" ]` sans guillemets quand `$var` est vide : le test devient `[ = \"x\" ]` et échoue avec une erreur de syntaxe. Toujours `\"$var\"`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Testez les scripts sur des copies ou des dossiers temporaires. Et préférez `[[ … ]]` (bash) à `[ … ]` pour des tests plus robustes quand la portabilité POSIX n'est pas requise.",
          },
          {
            label: "Concepts liés",
            value:
              "Codes de sortie (`$?`, 0 = succès), `while read` pour les fichiers ligne par ligne.",
          },
        ],
      },
    ],
  },
  {
    id: "scripts-bash-fonctions",
    title: "Scripts bash : arguments et fonctions",
    level: 3,
    intro:
      "Des scripts paramétrables et découpés : arguments positionnels, fonctions, codes de sortie.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "deploy.sh — arguments, fonction, code de sortie",
        code: "#!/usr/bin/env bash\nset -euo pipefail\n\n# $1 = premier argument, $# = nombre d'arguments\nDOSSIER=\"${1:-}\"\n\nusage() {\n  echo \"Usage: $0 <dossier>\"\n  exit 1\n}\n\n[ -z \"$DOSSIER\" ] && usage\n[ -d \"$DOSSIER\" ] || { echo \"Dossier introuvable\" >&2; exit 1; }\n\nsauvegarder() {\n  local src=\"$1\"\n  local dest=\"/tmp/$(basename \"$src\")-$(date +%Y%m%d).tar.gz\"\n  tar -czf \"$dest\" \"$src\"\n  echo \"Archive créée : $dest\"\n}\n\nsauvegarder \"$DOSSIER\"",
      },
      {
        kind: "fields",
        title: "Arguments et fonctions en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "`$1`, `$2` reçoivent les arguments, les fonctions découpent la logique, `exit N` signale le résultat.",
          },
          {
            label: "Variables spéciales",
            value:
              "`$0` nom du script, `$1…$9` arguments, `$#` leur nombre, `$@` tous les arguments, `$?` code de sortie de la dernière commande (0 = succès).",
          },
          {
            label: "Pourquoi `local` dans les fonctions",
            value:
              "Sans `local`, les variables d'une fonction sont globales et peuvent écraser celles du script principal : source classique de bugs mystérieux dans les longs scripts.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier de valider les arguments : un script lancé sans argument avec `rm -rf \"$1\"/` et `$1` vide devient catastrophique. Validez toujours avant d'agir.",
          },
          {
            label: "Bonne pratique",
            value:
              "Une fonction `usage()` qui explique l'appel, une validation des entrées en tête de script, des messages d'erreur vers stderr (`>&2`) avec un code de sortie non nul.",
          },
          {
            label: "Concepts liés",
            value:
              "`getopts` (options `-v`, `--help`), `shellcheck` (linter de scripts shell).",
          },
        ],
      },
      {
        kind: "command",
        label: "Vérifier un script avec shellcheck",
        command: "shellcheck deploy.sh",
        why: "`shellcheck` analyse statiquement les scripts et signale guillemets manquants, variables non protégées et pièges classiques. À installer via le gestionnaire de paquets ; c'est le linter de référence du shell.",
        verify: "La liste des avertissements (ou « aucun problème ») s'affiche avec les numéros de ligne.",
      },
    ],
  },
  {
    id: "cron-planification",
    title: "cron : planifier des tâches",
    level: 3,
    intro:
      "Exécuter des scripts automatiquement : sauvegardes nocturnes, nettoyages, rapports — le planificateur historique d'Unix.",
    blocks: [
      {
        kind: "text",
        text: "`cron` exécute des commandes selon un calendrier défini dans une « crontab ». Chaque ligne = une planification en cinq champs (minute, heure, jour du mois, mois, jour de semaine) suivie de la commande. C'est le mécanisme derrière les sauvegardes automatiques et les nettoyages réguliers.",
      },
      {
        kind: "command",
        label: "Éditer sa crontab",
        command: "crontab -e",
        why: "Ouvre votre table de planification dans l'éditeur défini par `EDITOR`. `-l` liste, `-r` supprime tout (dangereux : pas de confirmation). Chaque utilisateur a sa propre crontab.",
        verify: "L'éditeur s'ouvre, éventuellement sur une crontab vide.",
      },
      {
        kind: "table",
        headers: ["Planification", "Signification"],
        rows: [
          ["`0 2 * * * /home/marie/sauvegarde.sh`", "Tous les jours à 2h00"],
          ["`*/15 * * * * /opt/sonde.sh`", "Toutes les 15 minutes"],
          ["`0 9 * * 1 /home/marie/rapport-hebdo.sh`", "Tous les lundis à 9h00"],
          ["`30 4 1 * * /home/marie/menage-mensuel.sh`", "Le 1er de chaque mois à 4h30"],
        ],
      },
      {
        kind: "fields",
        title: "cron en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Cinq champs temporels + une commande = une tâche qui se répète sans vous.",
          },
          {
            label: "Les cinq champs",
            value:
              "Minute (0-59), heure (0-23), jour du mois (1-31), mois (1-12), jour de semaine (0-7, 0 et 7 = dimanche). `*` = toutes les valeurs, `*/15` = tous les quarts d'heure.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Chemins relatifs ou variables d'environnement dans la commande : `cron` s'exécute avec un environnement minimal (`PATH` réduit). Utilisez des chemins absolus et définissez les variables dans le script.",
          },
          {
            label: "Bonne pratique",
            value:
              "Redirigez la sortie vers un log (`… >> /var/log/sonde.log 2>&1`) : sinon `cron` envoie un email local à chaque exécution. Et testez le script à la main avant de le planifier.",
          },
          {
            label: "Concepts liés",
            value:
              "Timers `systemd` (l'alternative moderne avec journalisation intégrée), `/etc/cron.d`, `anacron` (machines non allumées 24h/24).",
          },
        ],
      },
    ],
  },
  {
    id: "alias-bashrc",
    title: "Alias et .bashrc : personnaliser son shell",
    level: 3,
    intro:
      "Raccourcis pour vos commandes fréquentes et réglages persistants : le fichier qui configure chaque nouveau terminal.",
    blocks: [
      {
        kind: "text",
        text: "`~/.bashrc` est exécuté à l'ouverture de chaque shell interactif : c'est là que vivent vos alias, vos réglages d'historique et vos variables. Les modifications s'appliquent aux nouveaux terminaux, ou immédiatement avec `source ~/.bashrc`.",
      },
      {
        kind: "command",
        label: "Créer un alias",
        command: "alias ll=\"ls -la\"",
        why: "Un alias remplace un mot par une commande : `ll` devient `ls -la`. Pour le rendre permanent, ajoutez la ligne à `~/.bashrc`. Les alias portent sur des noms simples, pas des logiques complexes (c'est le rôle des fonctions).",
        verify: "Tapez `ll` : le listing détaillé s'affiche.",
      },
      {
        kind: "command",
        label: "Recharger sa configuration",
        command: "source ~/.bashrc",
        why: "`source` exécute le fichier dans le shell courant : les nouveaux alias et variables sont disponibles sans rouvrir le terminal.",
        verify: "Les alias ajoutés sont utilisables immédiatement.",
      },
      {
        kind: "fields",
        title: "Alias utiles et sûrs",
        fields: [
          {
            label: "Exemples raisonnables",
            value:
              "`alias ll=\"ls -la\"`, `alias gs=\"git status\"`, `alias ..=\"cd ..\"`. Des raccourcis, pas des redéfinitions piégeuses.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Redéfinir `rm` en `rm -i` par alias : on s'habitue à la confirmation, puis sur un serveur sans l'alias, `rm` supprime sans demander. Mieux vaut apprendre la prudence que masquer le danger.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commentez votre `~/.bashrc` par sections (alias, variables, prompt) et versionnez-le avec Git : votre environnement vous suivra sur toutes vos machines.",
          },
          {
            label: "Concepts liés",
            value:
              "`~/.bash_profile` vs `~/.bashrc`, fonctions shell, prompt personnalisé (`PS1`).",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes et comment les éviter",
    level: 3,
    intro:
      "Les dix pièges qui attendent chaque débutant — et les réflexes qui les neutralisent.",
    blocks: [
      {
        kind: "fields",
        title: "Erreur 1 — rm -rf avec un joker non vérifié",
        fields: [
          {
            label: "Le problème",
            value:
              "`rm -rf *.bak` dans le mauvais dossier, ou avec une variable vide, supprime irrémédiablement des fichiers.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Le shell étend le joker avant l'exécution : on ne voit la liste réelle qu'en y pensant. Et `rm` ne demande rien.",
          },
          {
            label: "Mieux",
            value:
              "`ls *.bak` d'abord pour voir, `pwd` pour vérifier où l'on est, puis `rm` avec les noms explicites.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 2 — chmod 777 « pour que ça marche »",
        fields: [
          {
            label: "Le problème",
            value:
              "Donner tous les droits à tout le monde masque le vrai problème de propriété et ouvre une faille de sécurité.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Une erreur « Permission denied » frustre ; `777` la fait taire immédiatement.",
          },
          {
            label: "Mieux",
            value:
              "Identifier qui doit accéder au fichier (`ls -l`), ajuster propriétaire/groupe (`chown`) puis droits minimaux (`chmod 640`/`750`).",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 3 — > au lieu de >>",
        fields: [
          {
            label: "Le problème",
            value:
              "`echo \"ligne\" > journal.txt` écrase des mois de logs au lieu d'ajouter une ligne.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Un seul caractère de différence, aucune confirmation, effet immédiat.",
          },
          {
            label: "Mieux",
            value:
              "Par défaut, pensez `>>` pour les logs. L'option `set -o noclobber` fait échouer `>` sur un fichier existant (on force avec `>|`).",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 4 — Espaces dans les chemins sans guillemets",
        fields: [
          {
            label: "Le problème",
            value:
              "`rm -rf mon dossier/` supprime `mon` puis `dossier/` : deux cibles au lieu d'une.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Le shell découpe sur les espaces avant d'appeler la commande.",
          },
          {
            label: "Mieux",
            value:
              "Toujours des guillemets : `rm -rf \"mon dossier/\"`. Ou l'autocomplétion `Tab`, qui échappe automatiquement.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 5 — curl | sudo bash sans lecture",
        fields: [
          {
            label: "Le problème",
            value:
              "Exécuter un script téléchargé avec les pleins pouvoirs sans l'avoir lu : c'est confier `root` à un inconnu.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Les documentations pressées le suggèrent comme « installation en une ligne ».",
          },
          {
            label: "Mieux",
            value:
              "Téléchargez d'abord (`curl -o install.sh …`), lisez le script, puis exécutez. Préférez toujours le gestionnaire de paquets officiel.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 6 — sudo par réflexe",
        fields: [
          {
            label: "Le problème",
            value:
              "`sudo` devant chaque commande qui échoue crée des fichiers appartenant à `root` dans votre dossier personnel, inaccessibles ensuite sans `sudo`.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "« Permission denied » → réflexe `sudo` au lieu de diagnostic.",
          },
          {
            label: "Mieux",
            value:
              "Lisez l'erreur : mauvais dossier ? Fichier d'un autre utilisateur ? `sudo` ne se justifie que pour administrer le système.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 7 — Tuer avec kill -9 en premier",
        fields: [
          {
            label: "Le problème",
            value:
              "Les nettoyages (fichiers temporaires, verrous, écritures) sont sautés : bases de données corrompues, verrous orphelins.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "`-9` « marche à tous les coups », donc on l'adopte.",
          },
          {
            label: "Mieux",
            value:
              "Gradation : `kill` (TERM) → attendre → `kill -9` seulement si le processus survit. Pour les services : `systemctl stop`.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 8 — Mots de passe dans l'historique",
        fields: [
          {
            label: "Le problème",
            value:
              "`mysql -u root -pMonSecret` inscrit le secret en clair dans `~/.bash_history`.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Les options en ligne de commande sont pratiques… et persistantes.",
          },
          {
            label: "Mieux",
            value:
              "Laissez l'outil demander le secret interactivement (`-p` seul), ou passez par variables d'environnement et fichiers de configuration en `600`.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 9 — apt upgrade sans apt update",
        fields: [
          {
            label: "Le problème",
            value:
              "« Aucune mise à jour disponible » alors que des correctifs de sécurité existent : la liste locale des paquets est périmée.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "On oublie que `update` (synchroniser la liste) et `upgrade` (installer) sont deux étapes.",
          },
          {
            label: "Mieux",
            value:
              "Toujours `sudo apt update && sudo apt upgrade` ensemble. Sur Fedora/Arch, la synchronisation est intégrée à la commande de mise à jour.",
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
      "Quatre projets qui montent en difficulté et produisent chacun quelque chose d'utile : du script local au mini-serveur administré.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Trieur de téléchargements (débutant)",
        fields: [
          {
            label: "Objectif",
            value:
              "Un script `range.sh` qui déplace les fichiers de `~/Téléchargements` vers des dossiers par extension (images, documents, archives).",
          },
          {
            label: "Compétences mobilisées",
            value:
              "`ls`, `mkdir -p`, `mv` avec jokers, boucle `for`, tests `[ -f … ]`.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Structurer un script, manipuler des motifs, tester sans risque sur des copies.",
          },
          {
            label: "Difficulté",
            value: "1/4 — une soirée.",
          },
          {
            label: "Projet suivant",
            value:
              "Ajoutez une option `--dry-run` qui affiche les déplacements sans les effectuer.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Sauvegarde automatique (intermédiaire)",
        fields: [
          {
            label: "Objectif",
            value:
              "Sauvegarder `~/Documents` chaque nuit vers un disque externe avec `rsync`, journaliser dans un fichier, planifier avec `cron`.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "`rsync -av --delete`, redirection vers logs, `crontab`, lecture de `journalctl`/logs.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Automatisation fiable, journalisation, restauration (testez-la ! une sauvegarde non testée n'existe pas).",
          },
          {
            label: "Difficulté",
            value: "2/4 — un week-end.",
          },
          {
            label: "Projet suivant",
            value:
              "Envoyez un résumé par email en cas d'échec (code de sortie non nul → `mail`).",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Serveur web personnel (intermédiaire+)",
        fields: [
          {
            label: "Objectif",
            value:
              "Sur une VM ou un Raspberry Pi : installer `nginx` via `apt`, servir une page perso, gérer le service avec `systemctl`, durcir l'accès SSH (clés uniquement).",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Gestion de paquets, `systemctl enable --now`, `journalctl -u`, clés SSH, `ufw`/`pare-feu` en notion.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le cycle complet : installer → configurer → superviser → sécuriser un service réel.",
          },
          {
            label: "Difficulté",
            value: "3/4 — quelques soirées.",
          },
          {
            label: "Projet suivant",
            value:
              "Ajoutez HTTPS avec Certbot et surveillez les logs d'accès avec `goaccess` ou un script.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Sonde de supervision (avancé)",
        fields: [
          {
            label: "Objectif",
            value:
              "Un script `sonde.sh` qui vérifie toutes les 15 minutes (cron) : espace disque, mémoire, réponse d'un site (`curl`), et écrit une alerte dans un fichier si un seuil est dépassé.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "`df`, `free`, `curl -s -o /dev/null -w`, conditions, `cron`, redirections, codes de sortie.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Penser en seuils et en alertes, écrire des scripts robustes (`set -euo pipefail`), exploiter les codes de sortie Unix.",
          },
          {
            label: "Difficulté",
            value: "4/4 — une semaine en pointillés.",
          },
          {
            label: "Projet suivant",
            value:
              "Transformez la sonde en service `systemd` avec timer, et historisez les mesures pour tracer des courbes.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources officielles et fiables",
    level: 3,
    intro:
      "Les références à garder sous la main : documentation des auteurs, manuels, guides reconnus.",
    blocks: [
      {
        kind: "list",
        items: [
          "kernel.org — le site du noyau Linux : sources, documentation, liste des versions stables.",
          "kernel.org/doc/man-pages — les pages de manuel officielles en ligne (même contenu que `man` en local).",
          "debian.org/doc — manuels Debian, dont le « Guide de l'administrateur Debian » (en français).",
          "help.ubuntu.com — documentation officielle Ubuntu, très pédagogique pour débuter.",
          "docs.fedoraproject.org — documentation Fedora, claire sur `dnf` et `systemd`.",
          "wiki.archlinux.org — le wiki Arch : une référence technique d'une précision redoutable, utile bien au-delà d'Arch.",
          "openssh.com — documentation officielle d'OpenSSH (client et serveur).",
          "gnu.org/software/bash/manual — le manuel de référence de bash par ses auteurs.",
          "linuxcommand.org — « The Linux Command Line » de William Shotts : livre gratuit et légalement téléchargeable, la référence pour apprendre le shell.",
          "explainshell.com — décompose une ligne de commande et explique chaque option (pratique pour décrypter une commande trouvée en ligne).",
        ],
      },
      {
        kind: "fields",
        title: "Bien utiliser les ressources",
        fields: [
          {
            label: "En une phrase",
            value:
              "`man` d'abord (toujours à jour), wiki Arch pour la profondeur, TLCL pour l'apprentissage structuré.",
          },
          {
            label: "Bonne pratique",
            value:
              "Face à une commande inconnue trouvée en ligne : `explainshell.com` pour la décrypter, `man` pour vérifier sur votre version, jamais d'exécution aveugle avec `sudo`.",
          },
          {
            label: "Note d'honnêteté",
            value:
              "Les forums et blogs sont inégaux : une réponse acceptée en 2014 peut être obsolète ou dangereuse aujourd'hui. La documentation officielle prime toujours.",
          },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Linux maîtrisé en usage courant : les directions naturelles pour continuer, selon votre objectif.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes selon votre objectif",
        fields: [
          {
            label: "Devenir administrateur système",
            value:
              "Approfondissez `systemd` (units personnalisées, timers), la gestion réseau (`ip`, `ss`, pare-feu `nftables`/`ufw`), et la virtualisation (KVM, LXC).",
          },
          {
            label: "Aller vers DevOps",
            value:
              "Conteneurs (Docker, Podman), orchestration (Kubernetes), infrastructure as code (Ansible, Terraform), pipelines CI/CD : Linux est le socle de tout cela.",
          },
          {
            label: "Aller vers la cybersécurité",
            value:
              "Permissions avancées (ACL, SELinux/AppArmor en notion), analyse de logs, durcissement SSH/serveur, bases du réseau (TCP/IP, TLS).",
          },
          {
            label: "Aller vers le développement",
            value:
              "Git au terminal, Docker pour vos environnements, scripting Python pour ce qui dépasse bash, et un vrai workflow `tmux` + `vim` ou votre éditeur.",
          },
          {
            label: "Certifications (si visé professionnel)",
            value:
              "LPIC-1 / Linux+ pour les fondamentaux, RHCSA pour la famille Red Hat : elles valident exactement les compétences de ce guide.",
          },
          {
            label: "Le réflexe qui fait progresser",
            value:
              "Administrez un vrai serveur (VM, Raspberry Pi, VPS à quelques euros/mois) : la théorie s'ancre quand c'est votre machine qui doit rester en ligne.",
          },
        ],
      },
    ],
  },
];

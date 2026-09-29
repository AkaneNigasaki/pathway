import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du scripting Bash : automatiser le système,
 * enchaîner les commandes, écrire des scripts fiables et idempotents.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_SCRIPTING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le scripting shell : transformer des commandes tapées à la main en programmes automatiques, fiables et réutilisables.",
    blocks: [
      {
        kind: "text",
        text: "Le scripting consiste à écrire des programmes dans le langage du shell (Bash sur Linux/macOS) : au lieu de taper dix commandes à la main, on les écrit une fois dans un fichier et on les rejoue à volonté. Un script automatise les tâches répétitives : sauvegardes, déploiements, nettoyage, surveillance, traitement de fichiers. C'est le ciment de l'administration système et du DevOps.",
      },
      {
        kind: "text",
        text: "Pourquoi ça existe : tout ce qu'on fait plus de deux fois à la main mérite un script — la main se trompe, oublie des étapes, et ne laisse aucune trace. Un script s'exécute à l'identique, se planifie (cron), se versionne (Git) et se partage. La différence entre un administrateur et un bon administrateur se mesure souvent au nombre de tâches qu'il a automatisées.",
      },
      {
        kind: "text",
        text: "Écrire des programmes Bash qui enchaînent des commandes pour automatiser le système de façon fiable.",
      },
      {
        kind: "text",
        text: "Éliminer les tâches répétitives manuelles : plus rapides, sans erreur, planifiables et traçables.",
      },
      {
        kind: "text",
        text: "Dès qu'une séquence de commandes dépasse 2-3 étapes, se répète, ou doit tourner sans surveillance (sauvegarde nocturne, vérification périodique).",
      },
      {
        kind: "fields",
        title: "Le scripting : l'essentiel",
        fields: [
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un langage d'application (pour un vrai logiciel, préférez Python), ni une suite de commandes copiées-collées sans gestion d'erreur.",
          },
        ],
      },
    ],
  },
  {
    id: "philosophie-unix",
    title: "La philosophie Unix : composer",
    level: 1,
    intro:
      "L'idée fondatrice : des petits outils qui font une chose bien, assemblés par des pipes.",
    blocks: [
      {
        kind: "diagram",
        title: "Composer avec les pipes",
        lines: [
          "Chaque outil fait UNE chose :",
          "  ls → liste    grep → filtre    sort → trie",
          "  wc → compte   awk → extrait    cut → découpe",
          "",
          "Le pipe | relie la sortie de l'un à l'entrée du suivant :",
          "",
          "  ps aux | grep nginx | awk '{print $2}'",
          "     │          │              │",
          "  processus → garde nginx → extrait le PID",
          "",
          "Un script = des compositions nommées et réutilisables.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : Bash excelle à orchestrer des outils existants — le script n'a pas besoin de tout réinventer, il assemble. Cette philosophie explique pourquoi quelques lignes de shell remplacent des centaines de lignes dans un autre langage pour les tâches système.",
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
      "Le minimum vital avant d'écrire son premier script.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations",
        fields: [
          {
            label: "Terminal",
            value:
              "Naviguer (`cd`, `ls`), créer des fichiers, comprendre les chemins absolus/relatifs.",
          },
          {
            label: "Commandes de base",
            value:
              "`echo`, `cat`, `grep`, `chmod` : le vocabulaire que les scripts orchestrent.",
          },
          {
            label: "Éditeur de texte",
            value:
              "nano, VS Code, vim : écrire du texte brut, pas de traitement de texte.",
          },
          {
            label: "Droits d'exécution",
            value:
              "Comprendre `chmod +x` : un script est un fichier texte qu'on autorise à s'exécuter.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-script",
    title: "Premier script : shebang et exécution",
    level: 2,
    intro:
      "Le rituel de tout script Bash : l'en-tête, les droits, l'exécution.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "bonjour.sh",
        code: "#!/usr/bin/env bash\n\necho \"Bonjour, $USER !\"\necho \"Nous sommes le $(date +%F)\"",
      },
      {
        kind: "command",
        label: "Rendre exécutable et lancer",
        command: "chmod +x bonjour.sh && ./bonjour.sh",
        why: "`chmod +x` donne le droit d'exécution au fichier ; `./bonjour.sh` le lance. Le shebang `#!/usr/bin/env bash` (première ligne) dit au système quel interpréteur utiliser — sans lui, le fichier n'est qu'un texte. `$(...)` exécute une commande et insère son résultat : la substitution de commande.",
        verify: "ls -l bonjour.sh",
      },
      {
        kind: "text",
        text: "Trois choses à retenir : le shebang pointe vers `bash` via `env` (portable entre systèmes), le script doit être exécutable, et on le lance avec `./` (le répertoire courant n'est pas dans le PATH par sécurité).",
      },
    ],
  },
  {
    id: "variables",
    title: "Variables",
    level: 2,
    intro:
      "Stocker et réutiliser des valeurs : la base de tout script.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Variables",
        code: "nom=\"backup\"\ndossier=\"/var/www\"\n# Pas d'espaces autour du = !\n\necho \"Sauvegarde de $dossier\"\necho \"Sauvegarde de ${dossier}/html\"\n# ${...} délimite le nom de la variable\n\nreadonly APP=\"mon-app\"\n# readonly : la valeur ne changera plus",
      },
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          {
            label: "Pas d'espaces",
            value:
              "`nom=\"x\"` (affectation), pas `nom = \"x\"` (qui lance une commande `nom`). L'erreur n°1 des débutants.",
          },
          {
            label: "`${var}`",
            value:
              "Les accolades délimitent le nom : `${dossier}/html` fonctionne, `$dossier/html` aussi par chance — mais `${dossier}html` est indispensable.",
          },
          {
            label: "Variables d'environnement",
            value:
              "`$USER`, `$HOME`, `$PATH` existent déjà ; `export MA_VAR=\"x\"` rend une variable visible des programmes enfants.",
          },
        ],
      },
    ],
  },
  {
    id: "conditions",
    title: "Conditions : if",
    level: 2,
    intro:
      "Prendre des décisions : tester des fichiers, des chaînes, des nombres.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Tests courants",
        code: "fichier=\"/etc/hosts\"\n\nif [ -f \"$fichier\" ]; then\n  echo \"Le fichier existe\"\nfi\n\nif [ \"$1\" = \"prod\" ]; then\n  echo \"Mode production\"\nelif [ \"$1\" = \"dev\" ]; then\n  echo \"Mode développement\"\nelse\n  echo \"Mode inconnu : $1\"\nfi\n\n# Nombres : -eq -ne -lt -le -gt -ge\nif [ \"$#\" -lt 1 ]; then\n  echo \"Usage : $0 <environnement>\"\n  exit 1\nfi",
      },
      {
        kind: "fields",
        title: "Les tests à connaître",
        fields: [
          {
            label: "`-f`, `-d`, `-e`",
            value:
              "Fichier existe / répertoire existe / chemin existe (fichier ou répertoire).",
          },
          {
            label: "`-z`, `-n`",
            value:
              "Chaîne vide / chaîne non vide : `[ -z \"$var\" ]` teste qu'une variable est vide.",
          },
          {
            label: "`=`, `!=`",
            value:
              "Comparaison de chaînes. Nombres : `-eq` (égal), `-lt` (plus petit), `-gt` (plus grand).",
          },
          {
            label: "`$#`, `$0`, `$1`",
            value:
              "Nombre d'arguments, nom du script, premier argument. `exit 1` signale une erreur.",
          },
        ],
      },
      {
        kind: "text",
        text: "Toujours quoter les variables dans les tests : `[ -f \"$fichier\" ]`. Sans guillemets, une variable vide ou avec espaces casse la syntaxe du test — la moitié des bugs Bash viennent de là.",
      },
    ],
  },
  {
    id: "boucles",
    title: "Boucles : for et while",
    level: 2,
    intro:
      "Répéter : parcourir des fichiers, des listes, jusqu'à une condition.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Boucles",
        code: "# Parcourir des fichiers\nfor f in /var/log/*.log; do\n  echo \"Traitement de $f\"\ndone\n\n# Parcourir une liste\nfor env in dev staging prod; do\n  echo \"Déploiement vers $env\"\ndone\n\n# Compteur\nfor i in $(seq 1 5); do\n  echo \"Tentative $i\"\ndone\n\n# Tant qu'une condition est vraie\nn=3\nwhile [ \"$n\" -gt 0 ]; do\n  echo \"$n...\"\n  n=$((n - 1))\ndone",
      },
      {
        kind: "text",
        text: "Le `for ... in` avec un glob (`*.log`) est l'idiome le plus courant : traiter tous les fichiers d'un motif. `$((...))` fait du calcul arithmétique. Attention : un `while` sans progression vers la sortie = boucle infinie — vérifiez toujours que la condition évolue.",
      },
    ],
  },
  {
    id: "fonctions",
    title: "Fonctions",
    level: 2,
    intro:
      "Nommer des blocs réutilisables : structurer les scripts qui grandissent.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Fonctions",
        code: "log() {\n  echo \"[$(date +%H:%M:%S)] $*\"\n}\n\nsauvegarder() {\n  local src=\"$1\"\n  local dest=\"$2\"\n  log \"Sauvegarde $src -> $dest\"\n  cp -r \"$src\" \"$dest\"\n}\n\nlog \"Début\"\nsauvegarder \"/var/www\" \"/backup/www\"\nlog \"Fin\"",
      },
      {
        kind: "text",
        text: "Une fonction se définit puis s'appelle comme une commande. `$1`, `$2` sont ses arguments, `$*` tous les arguments. `local` rend les variables internes à la fonction — sans `local`, elles polluent le script entier. Convention : les fonctions en minuscules, les variables d'environnement en MAJUSCULES.",
      },
    ],
  },
  {
    id: "pipes-redirections",
    title: "Pipes et redirections",
    level: 2,
    intro:
      "Relier les commandes entre elles et avec les fichiers.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "L'essentiel",
        code: "# Redirections vers des fichiers\nls /var/log > liste.txt      # écrase\nls /var/log >> liste.txt     # ajoute\n./script.sh 2> erreurs.log   # stderr seul\n./script.sh > tout.log 2>&1  # stdout + stderr\n\n# Pipes entre commandes\ndmesg | grep -i erreur | head -5\ncat acces.log | cut -d' ' -f1 | sort | uniq -c | sort -rn | head",
      },
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          {
            label: "`>` vs `>>`",
            value:
              "`>` écrase le fichier (dangereux), `>>` ajoute. En cas de doute, `>>` ou vérifiez avant.",
          },
          {
            label: "`2>`",
            value:
              "Redirige les erreurs (stderr, descripteur 2) séparément de la sortie normale (stdout, 1).",
          },
          {
            label: "`2>&1`",
            value:
              "Fusionne stderr dans stdout : pour tout capturer dans un seul fichier de log.",
          },
          {
            label: "Le pipe `|`",
            value:
              "La sortie standard d'une commande devient l'entrée de la suivante : le cœur de la composition Unix.",
          },
        ],
      },
    ],
  },
  {
    id: "codes-retour",
    title: "Codes de retour : succès ou échec",
    level: 2,
    intro:
      "Chaque commande dit si elle a réussi : 0 = succès, le reste = échec.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Tester le succès",
        code: "grep -q \"erreur\" app.log\nif [ \"$?\" -eq 0 ]; then\n  echo \"Erreurs trouvées\"\nfi\n\n# Forme courte : && et ||\nmkdir -p /backup && echo \"OK\"\ncd /inexistant || exit 1\n\n# Enchaîner prudemment\n./sauvegarder.sh && ./nettoyer.sh && echo \"Terminé\"",
      },
      {
        kind: "text",
        text: "`$?` contient le code de retour de la dernière commande — à tester immédiatement, avant toute autre commande. `&&` n'exécute la suite que si ça a réussi, `||` seulement si ça a échoué. C'est la gestion d'erreur la plus simple et la plus lisible pour les enchaînements courts.",
      },
    ],
  },
  {
    id: "arguments",
    title: "Arguments et options",
    level: 2,
    intro:
      "Des scripts paramétrables : recevoir des arguments proprement.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Lire les arguments",
        code: "#!/usr/bin/env bash\n# Usage : deploy.sh <env> [version]\n\nenv=\"${1:?Environnement requis (dev/staging/prod)}\"\nversion=\"${2:-latest}\"\n\necho \"Déploiement de $version vers $env\"\n\n# Tous les arguments\nfor arg in \"$@\"; do\n  echo \"- $arg\"\ndone",
      },
      {
        kind: "text",
        text: "`${1:?...}` quitte avec un message si l'argument manque — validation en une ligne. `${2:-latest}` donne une valeur par défaut. `\"$@\"` (quoté) parcourt chaque argument intact, même avec des espaces. Tout script sérieux valide ses arguments en tête et affiche un usage.",
      },
    ],
  },
  {
    id: "planifier-cron",
    title: "Planifier avec cron",
    level: 2,
    intro:
      "Faire tourner les scripts sans surveillance : la syntaxe crontab.",
    blocks: [
      {
        kind: "command",
        label: "Éditer sa crontab",
        command: "crontab -e",
        why: "Ouvre l'éditeur pour planifier des tâches récurrentes de l'utilisateur courant. Chaque ligne = une planification. C'est le planificateur standard d'Unix : simple, fiable, présent partout.",
        verify: "crontab -l",
      },
      {
        kind: "code",
        language: "text",
        title: "Syntaxe : minute heure jour mois weekday commande",
        code: "# Sauvegarde tous les jours à 2h30\n30 2 * * * /home/user/scripts/backup.sh >> /var/log/backup.log 2>&1\n\n# Vérification toutes les 15 minutes\n*/15 * * * * /home/user/scripts/check.sh\n\n# Le lundi à 8h\n0 8 * * 1 /home/user/scripts/rapport.sh",
      },
      {
        kind: "list",
        items: [
          "Chemins ABSOLUS dans cron : l'environnement est minimal (pas votre PATH ni vos alias).",
          "Redirigez toujours la sortie vers un log : sinon les erreurs partent par email local, que personne ne lit.",
          "Testez le script à la main avant de le planifier : cron n'affiche rien en cas d'échec silencieux.",
        ],
      },
    ],
  },
  {
    id: "deboguer",
    title: "Déboguer : set -x et ShellCheck",
    level: 2,
    intro:
      "Voir ce que fait vraiment le script, et faire vérifier la syntaxe.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier la syntaxe sans exécuter",
        command: "bash -n monscript.sh",
        why: "`bash -n` lit le script et signale les erreurs de syntaxe (parenthèse oubliée, `fi` manquant) sans rien exécuter : le premier réflexe quand un script « ne marche pas ». Silencieux = syntaxe OK.",
      },
      {
        kind: "command",
        label: "Analyser avec ShellCheck",
        command: "shellcheck monscript.sh",
        why: "ShellCheck est l'analyseur statique de référence pour le shell : il détecte les variables non quotées, les usages dangereux, les erreurs classiques, avec des explications et des corrections. À passer systématiquement — il trouve ce que l'œil rate.",
        verify: "shellcheck --version",
      },
      {
        kind: "code",
        language: "bash",
        title: "Tracer l'exécution",
        code: "#!/usr/bin/env bash\nset -x   # affiche chaque commande avant de l'exécuter\n# ... code à déboguer ...\nset +x   # arrête le traçage",
      },
      {
        kind: "text",
        text: "`set -x` montre chaque commande après expansion des variables : on voit exactement ce qui s'exécute. Combinez : `bash -n` pour la syntaxe, `shellcheck` pour les pièges, `set -x` pour le comportement.",
      },
    ],
  },
  {
    id: "flux-automatisation",
    title: "Le flux d'automatisation sûr",
    level: 3,
    intro:
      "D'un script jetable à une automatisation de confiance : la méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Faire à la main d'abord",
            detail:
              "Exécutez les commandes une par une dans le terminal : validez qu'elles font ce qu'on veut avant de les figer.",
          },
          {
            title: "Écrire le script",
            detail:
              "Avec `set -euo pipefail` (voir niveau 3), des fonctions, des logs horodatés. Testez sur des données de test, jamais en production d'abord.",
          },
          {
            title: "Rendre idempotent",
            detail:
              "Le script doit pouvoir tourner deux fois sans dégât : `mkdir -p`, vérifications avant création, pas de doublons.",
          },
          {
            title: "Versionner",
            detail:
              "Git : l'historique dit qui a changé quoi et permet de revenir en arrière quand l'automatisation casse quelque chose.",
          },
          {
            title: "Planifier et superviser",
            detail:
              "cron + logs + alerte en cas d'échec (code de retour non nul → notification). Une automatisation non supervisée est une bombe à retardement.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "set-strict",
    title: "set -euo pipefail : le mode strict",
    level: 3,
    intro:
      "Trois options qui transforment Bash en langage à peu près sûr.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "L'en-tête de tout script sérieux",
        code: "#!/usr/bin/env bash\nset -euo pipefail\n\n# -e : quitte si une commande échoue\n# -u : quitte si une variable non définie est utilisée\n# -o pipefail : un pipe échoue si UNE commande du pipe échoue",
      },
      {
        kind: "fields",
        title: "Ce que chaque option empêche",
        fields: [
          {
            label: "`set -e`",
            value:
              "Le script s'arrête à la première erreur au lieu de continuer aveuglément (ex. `cd` raté puis `rm` dans le mauvais dossier — le scénario catastrophe classique).",
          },
          {
            label: "`set -u`",
            value:
              "Utiliser `$dest` au lieu de `$DEST` (faute de frappe) arrête le script au lieu d'effacer `/` par accident.",
          },
          {
            label: "`pipefail`",
            value:
              "Sans lui, `fausse_commande | grep x` « réussit » car seul le code de `grep` compte : les erreurs en début de pipe passent inaperçues.",
          },
          {
            label: "L'exception",
            value:
              "Dans un `if`, l'échec est attendu : `if grep -q x f; then` fonctionne normalement avec `set -e`.",
          },
        ],
      },
    ],
  },
  {
    id: "quoting",
    title: "Quoting : l'art des guillemets",
    level: 3,
    intro:
      "Le sujet qui cause 50 % des bugs Bash : quand et comment quoter.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Les trois quotings",
        code: "nom=\"Jean Dupont\"\n\n echo \"$nom\"    # → Jean Dupont (variable expansée, protégée)\n echo '$nom'    # → $nom (littéral, rien n'est expansé)\n echo `$nom`    # obsolète : préférez $(...)\n\nfichier=\"mon rapport.txt\"\ncat \"$fichier\"   # OK\ncat $fichier      # ERREUR : cherche \"mon\" puis \"rapport.txt\"",
      },
      {
        kind: "fields",
        title: "Règles",
        fields: [
          {
            label: "Toujours quoter les variables",
            value:
              "`\"$var\"` par défaut. Les rares exceptions (glob voulu, `$@`) se font en connaissance de cause.",
          },
          {
            label: "Doubles vs simples",
            value:
              "Doubles `\"\"` : les variables et `$(...)` sont expansés. Simples `''` : tout est littéral (utile pour les regex, les messages avec `$`).",
          },
          {
            label: "Le word splitting",
            value:
              "Sans guillemets, Bash découpe la valeur sur les espaces : c'est la cause racine, ShellCheck la signale (SC2086).",
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
      "Stocker des listes : les arrays Bash.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Arrays",
        code: "services=(\"api\" \"worker\" \"scheduler\")\n\n# Ajouter\nservices+=(\"cache\")\n\n# Parcourir (quoté !)\nfor s in \"${services[@]}\"; do\n  echo \"Redémarrage de $s\"\ndone\n\n# Taille et élément\necho \"Nombre : ${#services[@]}\"\necho \"Premier : ${services[0]}\"",
      },
      {
        kind: "text",
        text: "`\"${services[@]}\"` (quoté) préserve chaque élément intact, même avec des espaces — `${services[*]}` les fusionnerait. Les tableaux associatifs (`declare -A`) offrent des clés nommées, utiles pour les configurations.",
      },
    ],
  },
  {
    id: "getopts",
    title: "Options en ligne de commande : getopts",
    level: 3,
    intro:
      "Des scripts avec de vraies options `-v`, `-f fichier` : le parsing propre.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Parser les options",
        code: "#!/usr/bin/env bash\nverbose=0\nfichier=\"\"\n\nwhile getopts \"vf:\" opt; do\n  case \"$opt\" in\n    v) verbose=1 ;;\n    f) fichier=\"$OPTARG\" ;;\n    *) echo \"Usage : $0 [-v] [-f fichier]\"; exit 1 ;;\n  esac\ndone\n\n[ \"$verbose\" -eq 1 ] && echo \"Mode verbeux\"\n[ -n \"$fichier\" ] && echo \"Fichier : $fichier\"",
      },
      {
        kind: "text",
        text: "`getopts \"vf:\"` déclare `-v` (drapeau) et `-f` (avec argument, d'où le `:`). `$OPTARG` contient la valeur de `-f`. Le `case` aiguille. C'est le standard pour des scripts utilisés par d'autres : prévisible, documentable.",
      },
    ],
  },
  {
    id: "awk",
    title: "AWK : traiter les colonnes",
    level: 3,
    intro:
      "Le mini-langage roi du traitement de texte structuré en colonnes.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "AWK en action",
        code: "# 2e colonne (PID) des processus nginx\nps aux | grep nginx | awk '{print $2}'\n\n# Somme de la 3e colonne\nawk '{somme += $3} END {print somme}' donnees.txt\n\n# Lignes où la 1re colonne > 100\nawk '$1 > 100 {print $0}' mesures.txt\n\n# Séparateur personnalisé (:)\nawk -F: '{print $1}' /etc/passwd",
      },
      {
        kind: "text",
        text: "AWK découpe chaque ligne en champs (`$1`, `$2`…), applique des motifs et des actions. `{...}` sans motif = toutes les lignes ; `END {...}` = après la dernière. Pour l'extraction et l'agrégation simple en colonnes, rien ne bat sa concision.",
      },
    ],
  },
  {
    id: "sed",
    title: "SED : substituer en flux",
    level: 3,
    intro:
      "Rechercher-remplacer en masse : l'éditeur en ligne de commande.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "SED",
        code: "# Remplacer dans un fichier (avec sauvegarde .bak)\nsed -i.bak 's/ancien/nouveau/g' config.txt\n\n# Afficher seulement les lignes 10 à 20\nsed -n '10,20p' gros.log\n\n# Supprimer les lignes vides\nsed -i '/^$/d' fichier.txt\n\n# Remplacer seulement sur les lignes contenant \"prod\"\nsed -i '/prod/s/debug=false/debug=true/' app.conf",
      },
      {
        kind: "text",
        text: "`s/motif/remplacement/g` : le `g` remplace toutes les occurrences par ligne. `-i` modifie le fichier (toujours avec `.bak` la première fois). `-n` + `p` n'affiche que ce qu'on demande. Pour du multi-ligne complexe ou des structures, préférez un vrai langage.",
      },
    ],
  },
  {
    id: "grep-regex",
    title: "Grep et regex",
    level: 3,
    intro:
      "Chercher avec précision : les expressions régulières essentielles.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Grep avancé",
        code: "grep -r \"TODO\" src/                 # récursif\ngrep -i \"erreur\" app.log             # insensible à la casse\ngrep -v \"^#\" config.conf            # inverse : exclut les commentaires\ngrep -E \"^[0-9]{4}-[0-9]{2}\" f.log  # regex étendue : dates AAAA-MM\n\n# Compter les occurrences par fichier\ngrep -rc \"Exception\" logs/",
      },
      {
        kind: "fields",
        title: "Regex de survie",
        fields: [
          {
            label: "`^` `$`",
            value: "Début / fin de ligne : `^erreur` = lignes qui commencent par « erreur ».",
          },
          {
            label: "`.` `*` `+`",
            value: "N'importe quel caractère / zéro ou plus / un ou plus du précédent.",
          },
          {
            label: "`[0-9]` `[a-z]`",
            value: "Classes de caractères : `[0-9]{4}` = exactement 4 chiffres.",
          },
          {
            label: "`-E`",
            value: "Regex étendues (recommandé) : `+`, `?`, `|`, `()` sans antislash.",
          },
        ],
      },
    ],
  },
  {
    id: "find-xargs",
    title: "find et xargs",
    level: 3,
    intro:
      "Trouver des fichiers par critères, et agir dessus en masse.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "find + xargs",
        code: "# Fichiers .log modifiés il y a plus de 30 jours\nfind /var/log -name \"*.log\" -mtime +30\n\n# Les supprimer (d'abord afficher, puis agir)\nfind /var/log -name \"*.log\" -mtime +30 -delete\n\n# Agir avec une commande : guillemets + -print0 | xargs -0\nfind . -name \"*.tmp\" -print0 | xargs -0 rm -f\n\n# Exécuter par fichier\nfind src -name \"*.sh\" -exec chmod +x {} \\;",
      },
      {
        kind: "text",
        text: "`-print0 | xargs -0` : la forme sûre avec les noms de fichiers contenant espaces ou caractères spéciaux (le `0` = séparateur nul, jamais ambigu). `-delete` et `-exec` agissent directement. Règle : affichez d'abord (`find` seul), agissez ensuite.",
      },
    ],
  },
  {
    id: "parallelisme",
    title: "Parallélisme : xargs -P",
    level: 3,
    intro:
      "Accélérer les traitements : exécuter N tâches en parallèle.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Paralléliser",
        code: "# Télécharger 4 fichiers à la fois\ncat urls.txt | xargs -P 4 -I {} curl -sO {}\n\n# Compresser en parallèle (un par CPU)\nfind . -name \"*.log\" -print0 | xargs -0 -P \"$(nproc)\" gzip\n\n# Lancer en arrière-plan et attendre\nfor h in srv1 srv2 srv3; do\n  ssh \"$h\" \"uptime\" &\ndone\nwait",
      },
      {
        kind: "text",
        text: "`xargs -P N` lance N processus en parallèle : idéal pour les tâches indépendantes et limitées par le réseau ou les I/O. `&` lance en arrière-plan, `wait` attend la fin de tous. Attention : le parallélisme sur des écritures concurrentes vers le même fichier corrompt les données.",
      },
    ],
  },
  {
    id: "here-docs",
    title: "Here-docs et substitution",
    level: 3,
    intro:
      "Générer des fichiers et des configurations depuis un script.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Générer un fichier",
        code: "app=\"mon-app\"\nport=8080\n\ncat > /etc/mon-app.conf <<EOF\n# Généré automatiquement\napp_name=$app\nport=$port\nlog_level=info\nEOF\n\n# Sans expansion (littéral) : quoted delimiter\ncat > script.sh <<'EOF'\necho \"Le \\$HOME n'est pas expansé ici\"\nEOF",
      },
      {
        kind: "text",
        text: "Le here-doc (`<<EOF ... EOF`) injecte un bloc de texte : avec `EOF` nu les variables sont expansées (génération de config), avec `'EOF'` quoté tout reste littéral (génération de scripts). C'est la façon propre de créer des fichiers depuis un script d'installation.",
      },
    ],
  },
  {
    id: "traps",
    title: "Traps : nettoyer même en cas d'échec",
    level: 3,
    intro:
      "Garantir le nettoyage : fichiers temporaires supprimés même si le script plante.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Nettoyage garanti",
        code: "#!/usr/bin/env bash\nset -euo pipefail\n\ntmpdir=$(mktemp -d)\ncleanup() {\n  rm -rf \"$tmpdir\"\n}\ntrap cleanup EXIT\n\n# ... le script utilise $tmpdir ...\n# cleanup tourne TOUJOURS à la fin, même sur erreur",
      },
      {
        kind: "text",
        text: "`trap commande SIGNAL` exécute la commande à la réception du signal : `EXIT` (toujours, succès ou échec), `INT`/`TERM` (interruption). `mktemp -d` crée un répertoire temporaire unique. Le trio `mktemp` + `trap` + `EXIT` est le standard pour tout script manipulant des fichiers temporaires.",
      },
    ],
  },
  {
    id: "logging",
    title: "Logger proprement",
    level: 3,
    intro:
      "Des logs utiles : horodatés, niveaux, et redirection vers syslog.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Fonctions de log",
        code: "log_info()  { echo \"[$(date '+%F %T')] [INFO]  $*\"; }\nlog_warn()  { echo \"[$(date '+%F %T')] [WARN]  $*\" >&2; }\nlog_error() { echo \"[$(date '+%F %T')] [ERROR] $*\" >&2; }\n\nlog_info \"Sauvegarde démarrée\"\n# ...\nlog_info \"Sauvegarde terminée\"\n\n# Vers le journal système\nlogger -t backup \"Sauvegarde terminée\"",
      },
      {
        kind: "text",
        text: "Les erreurs (`WARN`, `ERROR`) vont sur stderr (`>&2`) : elles restent visibles même si stdout est redirigé vers un fichier. `logger` envoie au journal système (visible dans `journalctl`) : utile pour les scripts cron, dont la sortie est souvent perdue.",
      },
    ],
  },
  {
    id: "ssh-scripts",
    title: "Scripts sur SSH : automatiser à distance",
    level: 3,
    intro:
      "Exécuter des scripts sur des serveurs distants, sans mot de passe.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Boucle sur serveurs",
        code: "for srv in web1 web2 db1; do\n  echo \"=== $srv ===\"\n  ssh -o BatchMode=yes \"$srv\" \"uptime && df -h / | tail -1\"\ndone\n\n# Envoyer un script local et l'exécuter à distance\nssh user@serveur 'bash -s' < ./maintenance.sh",
      },
      {
        kind: "text",
        text: "Prérequis : authentification par clé SSH (pas de mot de passe interactif en script). `-o BatchMode=yes` échoue proprement au lieu de demander un mot de passe. `bash -s < script.sh` envoie le script via stdin : pas besoin de le copier d'abord. Pour des flottes entières, passez à Ansible — le shell a ses limites.",
      },
    ],
  },
  {
    id: "securite-scripts",
    title: "Sécurité des scripts",
    level: 3,
    intro:
      "Un script mal écrit est une faille : les règles de sécurité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne JAMAIS mettre de mot de passe en dur : variables d'environnement, fichiers à permissions restreintes (`chmod 600`), ou gestionnaire de secrets.",
          "Quoter toutes les variables : une injection via un nom de fichier piégé (`fichier; rm -rf ~`) est réelle.",
          "Ne pas faire confiance aux entrées : validez les arguments (formats attendus) avant usage.",
          "`curl ... | bash` : ne l'exécutez que depuis des sources officielles en HTTPS, après avoir lu le script.",
          "Permissions minimales : un script cron root n'a pas besoin d'être lisible par tout le monde s'il contient des chemins sensibles.",
          "`set -u` + validation : une variable vide dans `rm -rf \"$dir/\"` peut tout effacer si `$dir` est vide.",
        ],
      },
    ],
  },
  {
    id: "portabilite",
    title: "Portabilité : bash vs sh, Linux vs macOS",
    level: 3,
    intro:
      "Écrire des scripts qui tournent partout : les différences à connaître.",
    blocks: [
      {
        kind: "fields",
        title: "Les écarts",
        fields: [
          {
            label: "`#!/bin/sh` vs `#!/usr/bin/env bash`",
            value:
              "`sh` = shell POSIX minimal (pas de tableaux, pas de `[[ ]]`). Si le shebang dit `bash`, utilisez ses fonctionnalités ; si `sh`, restez POSIX.",
          },
          {
            label: "macOS : Bash 3.2",
            value:
              "Le Bash fourni par macOS est ancien : pas de tableaux associatifs (`declare -A`). Pour du Bash moderne sur Mac : `brew install bash`.",
          },
          {
            label: "GNU vs BSD",
            value:
              "`sed -i`, `date -d`, `grep -P` diffèrent entre Linux (GNU) et macOS (BSD). Testez sur les deux ou documentez « Linux requis ».",
          },
          {
            label: "`env` dans le shebang",
            value:
              "`#!/usr/bin/env bash` trouve Bash via le PATH : portable entre distributions (le chemin de bash varie).",
          },
        ],
      },
    ],
  },
  {
    id: "tests-bats",
    title: "Tester ses scripts : BATS",
    level: 3,
    intro:
      "Des tests automatisés pour les scripts critiques : le framework BATS.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "test_backup.bats",
        code: "#!/usr/bin/env bats\n\n@test \"le script accepte un dossier existant\" {\n  run ./backup.sh /tmp\n  [ \"$status\" -eq 0 ]\n}\n\n@test \"le script refuse un dossier inexistant\" {\n  run ./backup.sh /n/existe/pas\n  [ \"$status\" -ne 0 ]\n}",
      },
      {
        kind: "text",
        text: "BATS (Bash Automated Testing System) : chaque `@test` lance le script et vérifie le code de retour et la sortie. Indispensable pour les scripts critiques (sauvegarde, déploiement) : un test qui tourne en CI attrape les régressions avant la catastrophe.",
      },
    ],
  },
  {
    id: "idempotence",
    title: "Idempotence : rejouable sans risque",
    level: 3,
    intro:
      "La propriété qui sépare un script d'une automatisation : pouvoir le relancer sans dégât.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Idiomes idempotents",
        code: "mkdir -p /backup          # ne râle pas si ça existe\nln -sf src dst          # -f : remplace le lien existant\n# Créer seulement si absent\n[ -f /etc/mon-app.conf ] || cp modele.conf /etc/mon-app.conf\ngrep -q \"ma-ligne\" f || echo \"ma-ligne\" >> f",
      },
      {
        kind: "text",
        text: "Un script idempotent vérifie l'état avant d'agir : « si c'est déjà fait, ne rien faire ». C'est ce qui permet de le relancer après un échec à mi-parcours, de le mettre en cron, et de dormir tranquille. Testez toujours : lancez deux fois de suite, le second passage ne doit rien changer.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques du Bash, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Espaces autour du `=`",
            value:
              "Problem : `var = \"x\"` lance une commande `var`. Why : l'affectation n'accepte aucun espace. Better : `var=\"x\"`, toujours.",
          },
          {
            label: "Variables non quotées",
            value:
              "Problem : `rm $fichier` avec un nom contenant des espaces efface les mauvais fichiers. Why : word splitting. Better : `\"$fichier\"` systématique (ShellCheck SC2086).",
          },
          {
            label: "Sans `set -euo pipefail`",
            value:
              "Problem : le script continue après une erreur et fait des dégâts en aval. Why : par défaut Bash ignore les échecs. Better : l'en-tête strict dans chaque script.",
          },
          {
            label: "`cd` qui échoue",
            value:
              "Problem : `cd /dossier` rate, la suite s'exécute au mauvais endroit. Why : pas de vérification. Better : `cd \"$dir\" || exit 1` (ou `set -e`).",
          },
          {
            label: "Le pipe qui masque l'erreur",
            value:
              "Problem : `commande_ratee | grep x` semble réussir. Why : seul le dernier code compte. Better : `set -o pipefail`.",
          },
          {
            label: "`$?` testé trop tard",
            value:
              "Problem : `[ $? -eq 0 ]` après un `echo` teste l'`echo`. Why : `$?` = DERNIÈRE commande. Better : le capturer immédiatement ou utiliser `if commande; then`.",
          },
          {
            label: "Comparaison de nombres avec `=`",
            value:
              "Problem : `[ \"10\" = \"9\" ]` est vrai (ordre alphabétique). Why : `=` compare des chaînes. Better : `-eq`, `-lt`, `-gt` pour les nombres.",
          },
          {
            label: "`rm -rf` avec variable vide",
            value:
              "Problem : `rm -rf \"$dir/\"` avec `$dir` vide efface `/`. Why : `set -u` absent. Better : `set -u` + `${dir:?non défini}` + tests sur données jetables.",
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
      "Les règles qui distinguent un script jetable d'une automatisation fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "`set -euo pipefail` en tête de chaque script, sans exception.",
          "Quoter toutes les variables, passer ShellCheck avant chaque commit.",
          "Fonctions nommées, variables locales, usage affiché en cas d'arguments invalides.",
          "Idempotent : rejouable sans effet de bord indésirable.",
          "Logs horodatés, erreurs sur stderr, code de retour significatif.",
          "Jamais de secret en dur : environnement, fichier `chmod 600`, ou gestionnaire de secrets.",
          "Chemins absolus pour tout ce qui tourne en cron.",
          "Versionné en Git, testé (BATS) pour les scripts critiques.",
          "Commenter le POURQUOI, pas le QUOI : le code dit ce qu'il fait, le commentaire dit pourquoi.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 3,
    intro:
      "Quatre projets de difficulté croissante pour passer de la théorie à la pratique professionnelle.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Nettoyeur de logs",
        fields: [
          { label: "Compétences requises", value: "Variables, boucles, find" },
          { label: "Ce que vous construisez", value: "Script qui archive les logs de plus de 30 jours, les compresse, supprime les archives de plus d'un an, avec log horodaté" },
          { label: "Ce que vous apprenez", value: "find, idempotence, logging, cron" },
          { label: "Difficulté attendue", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "Sauvegarde complète" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Sauvegarde automatisée",
        fields: [
          { label: "Compétences requises", value: "Fonctions, getopts, traps, rsync" },
          { label: "Ce que vous construisez", value: "Script de backup avec options (`-s source -d dest`), rotation des sauvegardes, nettoyage garanti, notification en cas d'échec" },
          { label: "Ce que vous apprenez", value: "getopts, gestion d'erreur, mode strict, cron supervisé" },
          { label: "Difficulté attendue", value: "Moyenne — une semaine" },
          { label: "Projet suivant", value: "Supervision multi-serveurs" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Supervision multi-serveurs",
        fields: [
          { label: "Compétences requises", value: "SSH, parallélisme, AWK" },
          { label: "Ce que vous construisez", value: "Script qui interroge N serveurs en parallèle (disque, charge, services), agrège un rapport, alerte si seuils dépassés" },
          { label: "Ce que vous apprenez", value: "SSH non interactif, xargs -P, parsing, alerting artisanal" },
          { label: "Difficulté attendue", value: "Élevée — deux semaines" },
          { label: "Projet suivant", value: "Framework de déploiement" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Kit de déploiement",
        fields: [
          { label: "Compétences requises", value: "Tout le programme : tests, sécurité, idempotence" },
          { label: "Ce que vous construisez", value: "Suite de scripts versionnés et testés (BATS) : déploiement blue-green d'une app, health checks, rollback automatique, journalisation centralisée" },
          { label: "Ce que vous apprenez", value: "L'automatisation comme produit : testée, documentée, fiable" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "Passer à Ansible pour les flottes" },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "Manuel Bash (GNU)", value: "La référence complète : chaque builtin, chaque option, documentés." },
          { label: "ShellCheck (wiki)", value: "Chaque avertissement expliqué avec exemples de correction." },
          { label: "BashFAQ / Wooledge", value: "Les réponses aux questions que tout le monde se pose, par des experts." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : automatisez vos propres tâches répétitives — un vrai besoin enseigne mieux qu'un exercice.",
          "Référence : `man bash` en local, et `help <builtin>` pour l'aide rapide (`help test`).",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Scripting maîtrisé, voici les prolongements naturels dans la roadmap DevOps.",
    blocks: [
      {
        kind: "list",
        items: [
          "Industrialiser : `ci-cd` — les scripts deviennent des étapes de pipeline testées et versionnées.",
          "Gérer des flottes : `iac` — quand les scripts shell ne suffisent plus, Terraform et Ansible prennent le relais.",
          "Surveiller : `monitoring` — les scripts de check artisanaux évoluent vers Prometheus et l'alerting.",
          "Sécuriser l'exécution : `devsecops` — secrets, permissions et traçabilité des automatisations.",
          "Revenir à la roadmap : valider Scripting et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "jq-json",
    title: "jq : le JSON en shell",
    level: 3,
    intro:
      "Parser les API et les fichiers JSON sans Python : jq.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "jq en action",
        code: "# Extraire un champ\necho '{\"nom\":\"api\",\"port\":8080}' | jq -r '.port'\n\n# Lister les noms depuis une API\ncurl -s https://api.exemple.com/apps | jq -r '.[].nom'\n\n# Filtrer et reformater\ncat serveurs.json | jq '.[] | select(.cpu > 80) | .nom'\n\n# Construire du JSON\njq -n --arg v \"$version\" '{version: $v, date: now}'",
      },
      {
        kind: "command",
        label: "Installer jq",
        command: "sudo apt install -y jq",
        why: "jq est le processeur JSON du shell : extraction, filtrage, transformation. Indispensable dès qu'un script parle à une API REST — il remplace le parsing fragile au grep/sed.",
        verify: "jq --version",
      },
      {
        kind: "text",
        text: "`-r` sort le texte brut (sans guillemets JSON). Le filtre `.[]` itère les tableaux, `select(...)` filtre, les pipes `|` enchaînent. Pour du YAML, `yq` offre la même grammaire.",
      },
    ],
  },
  {
    id: "subshells-groupes",
    title: "Subshells et groupes",
    level: 3,
    intro:
      "Isoler ou partager l'environnement : `( )` vs `{ }`.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Parenthèses vs accolades",
        code: "# Subshell : les variables n'en sortent pas\n(cd /tmp && ls)      # le cd n'affecte pas le script\necho \"$PWD\"            # inchangé\n\n# Groupe : partage l'environnement\n{ echo \"début\"; date; } > rapport.txt\n\n# Capturer la sortie d'un bloc\nresultat=$( {\n  echo \"ligne 1\"\n  echo \"ligne 2\"\n} )",
      },
      {
        kind: "text",
        text: "`( )` lance un sous-shell : parfait pour changer de répertoire ou de variables temporairement sans effet de bord. `{ }` groupe des commandes dans le shell courant (notez les espaces et le `;` final obligatoires). Les deux se combinent avec les redirections pour structurer les scripts.",
      },
    ],
  },
  {
    id: "performance-bash",
    title: "Performance : éviter les forks",
    level: 3,
    intro:
      "Bash est lent quand il appelle des programmes externes en boucle : les optimiser.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Builtin vs externe",
        code: "# LENT : un processus cat/grep par ligne\ncat f.log | while read -r l; do echo \"$l\" | grep -q erreur; done\n\n# RAPIDE : builtins uniquement\nwhile read -r l; do\n  [[ \"$l\" == *erreur* ]] && echo \"$l\"\ndone < f.log",
      },
      {
        kind: "fields",
        title: "Règles de performance",
        fields: [
          {
            label: "Builtins d'abord",
            value:
              "`[[ ]]`, `${var/...}`, `$((...))` ne créent aucun processus : dans une boucle de 10 000 itérations, c'est le jour et la nuit.",
          },
          {
            label: "Un seul appel externe",
            value:
              "Un `awk` qui traite tout le fichier bat 1000 `grep` en boucle. Déplacez la boucle DANS l'outil, pas l'outil dans la boucle.",
          },
          {
            label: "Mesurez",
            value:
              "`time ./script.sh` : optimisez ce qui est mesuré lent, pas ce qui « semble » lent.",
          },
        ],
      },
    ],
  },
  {
    id: "aide-usage",
    title: "Documenter : --help intégré",
    level: 3,
    intro:
      "Un script utilisé par d'autres se documente lui-même.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Aide intégrée",
        code: "#!/usr/bin/env bash\nusage() {\n  cat <<EOF\nUsage : $(basename \"$0\") [-v] [-f fichier] <environnement>\n\n  -v            mode verbeux\n  -f fichier    fichier de configuration\n  environnement : dev, staging ou prod\nEOF\n}\n\n[[ \"${1:-}\" == \"-h\" || \"${1:-}\" == \"--help\" ]] && { usage; exit 0; }",
      },
      {
        kind: "text",
        text: "Tout script partagé affiche un usage clair avec `-h`/`--help` et en cas d'arguments invalides. Le here-doc garde la mise en forme. C'est la différence entre un script personnel et un outil d'équipe.",
      },
    ],
  },
];

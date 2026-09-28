import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Bash : du premier script à l'automatisation fiable.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_BASH: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Bash, où il vit et pourquoi il reste incontournable.",
    blocks: [
      {
        kind: "text",
        text: "Bash (Bourne Again SHell) est à la fois un interpréteur de commandes interactif — ce que vous utilisez dans le terminal — et un langage de script. Dans le premier cas, vous tapez des commandes une par une ; dans le second, vous écrivez ces mêmes commandes dans un fichier `.sh` qui s'exécute d'un bloc, de façon rejouable.",
      },
      {
        kind: "text",
        text: "Pourquoi Bash existe : les systèmes Linux et macOS exposent tout via des commandes texte. Un script Bash enchaîne ces commandes, manipule des fichiers, réagit aux erreurs et se planifie avec `cron`. C'est l'outil d'automatisation le plus direct qui soit : pas de compilation, pas de dépendances, le script s'exécute là où les outils vivent déjà.",
      },
      {
        kind: "text",
        text: "Où on le rencontre : serveurs (déploiements, sauvegardes, supervision), pipelines CI/CD (les étapes d'un workflow GitHub Actions sont souvent du Bash), conteneurs Docker (scripts d'entrée), et au quotidien du développeur (scripts `npm`, alias, traitement de fichiers en masse).",
      },
    ],
  },
  {
    id: "bash-n-est-pas-sh",
    title: "Bash n'est pas (tout à fait) sh",
    level: 1,
    intro:
      "La distinction la plus utile à comprendre avant d'écrire le premier script.",
    blocks: [
      {
        kind: "diagram",
        title: "La famille des shells",
        lines: [
          "sh (POSIX)",
          "     │",
          "     ├── le standard : syntaxe minimale garantie partout",
          "     │",
          "     ▼",
          "Bash",
          "     │",
          "     ├── sur-ensemble de sh : tableaux, [[ ]], <() ...",
          "     ├── le shell par défaut de la plupart des Linux",
          "     └── ce que vous apprenez ici",
          "     │",
          "     autres shells : zsh (macOS par défaut), fish, dash",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : `sh` désigne le standard POSIX — la syntaxe minimale que tout shell conforme comprend. Bash ajoute des extensions pratiques (tableaux, tests `[[ ]]`, substitution de processus). Un script qui n'utilise que la syntaxe POSIX tourne partout ; un script Bash profite d'un confort supérieur au prix d'exiger Bash.",
      },
      {
        kind: "list",
        items: [
          "La première ligne d'un script (`#!/usr/bin/env bash`, le « shebang ») déclare quel interpréteur l'exécute : c'est elle qui fait la différence entre un script sh et un script Bash.",
          "Sur macOS, le shell par défaut est `zsh`, mais Bash reste disponible : vos scripts `.sh` restent portables.",
          "Dans les conteneurs minimaux (Alpine), c'est souvent `sh` (via `dash` ou BusyBox) qui est présent, pas Bash : à garder en tête pour les scripts Docker.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "verifier-bash",
    title: "Vérifier Bash",
    level: 2,
    intro:
      "Bash est déjà installé sur Linux et macOS. Une seule commande suffit à le confirmer.",
    blocks: [
      {
        kind: "command",
        label: "Afficher la version de Bash",
        command: "bash --version",
        why: "Confirme que Bash est présent et affiche sa version (la 5.x est courante aujourd'hui). Les fonctionnalités décrites dans cette page supposent Bash 4+, disponible partout depuis des années — sauf la version 3.2 figée de macOS, détaillée au niveau 3.",
        verify: "bash --version | head -1",
      },
      {
        kind: "text",
        text: "Sur Windows, Bash n'est pas natif : utilisez WSL2 (`wsl --install`) pour un vrai Linux, ou Git Bash (fourni avec Git pour Windows) pour un environnement Bash léger. Les scripts écrits pour Linux fonctionnent dans les deux, à quelques détails de chemins près.",
      },
    ],
  },
  {
    id: "premier-script",
    title: "Premier script",
    level: 2,
    intro:
      "Écrire un script Bash, le rendre exécutable et le lancer : les trois gestes de base.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le fichier",
            detail:
              "Créez `bonjour.sh` contenant trois lignes : `#!/usr/bin/env bash` (le shebang, qui désigne l'interpréteur), puis `echo \"Bonjour\"`. Le shebang doit être la toute première ligne du fichier.",
          },
          {
            title: "Rendre le script exécutable",
            detail:
              "`chmod +x bonjour.sh` ajoute la permission d'exécution. Sans elle, le système refuse de lancer le fichier directement — c'est une sécurité, pas un bug.",
          },
          {
            title: "Exécuter le script",
            detail:
              "`./bonjour.sh` lance le script. Le `./` est obligatoire : par sécurité, le dossier courant n'est pas dans le `PATH`, le shell n'exécute jamais un programme du dossier courant sans chemin explicite.",
          },
          {
            title: "Alternative sans chmod",
            detail:
              "`bash bonjour.sh` exécute le script en passant le fichier à l'interpréteur : aucune permission d'exécution requise. Pratique pour tester, moins propre pour un script destiné à être réutilisé.",
          },
        ],
      },
      {
        kind: "code",
        language: "bash",
        title: "bonjour.sh",
        code: `#!/usr/bin/env bash\n\necho "Bonjour"`,
      },
      {
        kind: "text",
        text: "Le shebang `#!/usr/bin/env bash` plutôt que `#!/bin/bash` : `env` cherche Bash dans le `PATH`, ce qui rend le script portable entre systèmes où Bash n'est pas au même endroit (macOS avec Homebrew, par exemple).",
      },
    ],
  },
  {
    id: "variables",
    title: "Variables",
    level: 2,
    intro:
      "Stocker des valeurs et les réutiliser : la base de tout script paramétrable.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Déclarer et utiliser des variables",
        code: `nom="Akane"\n# Pas d'espace autour du = : c'est une affectation, pas une commande.\n\necho "Bonjour $nom"\n# $nom : le shell remplace par la valeur avant d'exécuter.\n\nprojet="pathway"\necho "Travail sur $projet"\n\n# Variable d'environnement existante\n echo "Utilisateur : $USER"\necho "Dossier courant : $PWD"`,
      },
      {
        kind: "list",
        items: [
          "Pas d'espace autour du `=` : `nom = \"x\"` exécute la commande `nom` avec des arguments, ce n'est pas une affectation.",
          "`$nom` lit la valeur. Dans une chaîne entre doubles quotes, l'expansion a lieu ; entre quotes simples, non.",
          "Quelques variables sont prédéfinies : `$USER`, `$HOME`, `$PWD`, `$PATH`, `$?` (code de sortie de la dernière commande).",
          "Convention : minuscules pour les variables de script, MAJUSCULES pour les variables d'environnement exportées.",
        ],
      },
    ],
  },
  {
    id: "afficher-et-lire",
    title: "Afficher et lire",
    level: 2,
    intro:
      "Communiquer avec l'utilisateur : afficher du texte et lire ses réponses.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "echo, printf et read",
        code: `echo "Message simple"\necho -n "Sans retour à la ligne : "\n\nprintf "Nom : %s, âge : %d\\n" "Akane" 25\n# printf : formatage précis, portable, recommandé pour les scripts sérieux.\n\nread -p "Votre nom : " nom\n# -p affiche l'invite, la saisie est stockée dans $nom.\necho "Bonjour $nom"\n\nread -s -p "Mot de passe : " mdp\n# -s : saisie masquée (rien ne s'affiche). Penser à echo ensuite.`,
      },
      {
        kind: "text",
        text: "`echo` suffit pour les messages simples. `printf` est préférable dès que le formatage compte (colonnes, nombres) : son comportement est identique partout, contrairement à `echo` dont les options varient selon les systèmes. `read` rend un script interactif — à éviter dans les scripts destinés à la CI, où personne ne répondra.",
      },
    ],
  },
  {
    id: "redirections",
    title: "Redirections",
    level: 2,
    intro:
      "Envoyer la sortie d'une commande vers un fichier, ou lire un fichier comme entrée.",
    blocks: [
      {
        kind: "table",
        headers: ["Opérateur", "Effet", "Exemple"],
        rows: [
          ["`>`", "Écrit la sortie dans un fichier (écrase)", "`echo \"x\" > notes.txt`"],
          ["`>>`", "Ajoute la sortie à la fin du fichier", "`echo \"y\" >> notes.txt`"],
          ["`<`", "Utilise un fichier comme entrée", "`sort < liste.txt`"],
          ["`2>`", "Redirige les erreurs (stderr)", "`cmd 2> erreurs.log`"],
          ["`2>&1`", "Fusionne erreurs et sortie standard", "`cmd > tout.log 2>&1`"],
          ["`|`", "Enchaîne deux commandes (pipe)", "`ls | grep \".txt\"`"],
        ],
      },
      {
        kind: "text",
        text: "Deux flux existent : la sortie standard (stdout, les résultats) et la sortie d'erreur (stderr, les messages d'erreur). Par défaut les deux s'affichent au terminal ; les redirections permettent de les séparer. L'erreur classique : `>` écrase sans prévenir — pour un log qu'on fait grandir, c'est toujours `>>`.",
      },
    ],
  },
  {
    id: "pipes",
    title: "Pipes",
    level: 2,
    intro:
      "La philosophie Unix : de petites commandes composées en pipelines puissants.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Composer des commandes",
        code: `ls -la | grep ".log"\n# Liste les fichiers, ne garde que les lignes contenant .log.\n\ncat acces.log | grep "404" | wc -l\n# Compte les lignes d'erreur 404 dans un log.\n\nps aux | grep node | grep -v grep\n# Processus node ; le second grep exclut la commande grep elle-même.\n\nls *.txt | sort | head -5\n# Les 5 premiers fichiers .txt par ordre alphabétique.`,
      },
      {
        kind: "text",
        text: "Un pipe `|` connecte la sortie standard d'une commande à l'entrée standard de la suivante. Les données circulent en flux : rien n'est stocké en mémoire d'un coup, ce qui permet de traiter des fichiers de plusieurs gigaoctets ligne par ligne. Lire un pipeline de gauche à droite raconte l'histoire du traitement.",
      },
    ],
  },
  {
    id: "conditions",
    title: "Conditions",
    level: 2,
    intro:
      "Prendre des décisions dans un script : la structure `if` et les tests.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "if, then, else",
        code: `if [ -f "rapport.txt" ]; then\n  echo "Le fichier existe"\nelse\n  echo "Fichier introuvable"\nfi\n\n# Comparaison de chaînes\nif [ "$nom" = "admin" ]; then\n  echo "Bienvenue admin"\nfi\n\n# Comparaison de nombres : -eq -ne -lt -le -gt -ge\nif [ "$tentatives" -ge 3 ]; then\n  echo "Trop de tentatives"\nfi`,
      },
      {
        kind: "table",
        headers: ["Test", "Signification"],
        rows: [
          ["`[ -f fichier ]`", "Le chemin existe et est un fichier régulier"],
          ["`[ -d dossier ]`", "Le chemin existe et est un dossier"],
          ["`[ -z \"$var\" ]`", "La variable est vide ou non définie"],
          ["`[ -n \"$var\" ]`", "La variable est non vide"],
          ["`[ \"$a\" = \"$b\" ]`", "Chaînes égales (`==` accepté en Bash)"],
          ["`[ \"$a\" -eq \"$b\" ]`", "Nombres égaux (jamais `=` pour les nombres)"],
        ],
      },
      {
        kind: "text",
        text: "Le `[` n'est pas de la syntaxe magique : c'est une commande (alias de `test`), d'où les espaces obligatoires autour des crochets. Les variables dans les tests se quotent toujours (`\"$var\"`) : une variable vide non quotée fait disparaître l'argument et casse le test.",
      },
    ],
  },
  {
    id: "boucles",
    title: "Boucles",
    level: 2,
    intro:
      "Répéter une action : parcourir des fichiers, des listes, des nombres.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "for et while",
        code: `# Parcourir des fichiers\nfor f in *.jpg; do\n  echo "Traitement de $f"\ndone\n\n# Parcourir une liste\nfor service in nginx postgres redis; do\n  echo "Redémarrage de $service"\ndone\n\n# Compter avec une boucle C\nfor ((i = 1; i <= 5; i++)); do\n  echo "Essai $i"\ndone\n\n# Tant qu'une condition est vraie\nn=1\nwhile [ $n -le 3 ]; do\n  echo "Tour $n"\n  n=$((n + 1))\ndone`,
      },
      {
        kind: "text",
        text: "`for ... in` est la boucle la plus utilisée en Bash : elle parcourt une liste de mots, souvent produite par un glob (`*.jpg`). `while` sert quand le nombre d'itérations n'est pas connu d'avance. Le piège classique : `for f in $(ls)` casse sur les noms de fichiers avec espaces — le glob `*.jpg` est toujours préférable.",
      },
    ],
  },
  {
    id: "fonctions",
    title: "Fonctions",
    level: 2,
    intro:
      "Regrouper des instructions réutilisables : structurer un script qui grandit.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Définir et appeler une fonction",
        code: `sauvegarder() {\n  local dossier="$1"\n  # $1 : premier argument. local : la variable reste dans la fonction.\n  echo "Sauvegarde de $dossier..."\n  tar -czf "backup.tar.gz" "$dossier"\n}\n\nsauvegarder "/home/akane/documents"\n# Appel : le nom seul, sans parenthèses ni mot-clé.\n\n# Valeur de retour : un code (0 = succès), pas une donnée.\nverifier() {\n  [ -f "$1" ]\n}\n\nif verifier "fichier.txt"; then\n  echo "Présent"\nfi`,
      },
      {
        kind: "text",
        text: "Une fonction Bash reçoit ses arguments en `$1`, `$2`… et `$#` donne leur nombre. Elle « retourne » un code de sortie (0 = succès), pas une valeur : pour produire une donnée, on affiche sur stdout et on capture avec `$(...)`. Le mot-clé `local` limite les variables à la fonction — sans lui, tout est global, source de bugs subtils.",
      },
    ],
  },
  {
    id: "debugger",
    title: "Déboguer un script",
    level: 2,
    intro:
      "Quand un script ne fait pas ce qu'on attend : les deux outils indispensables.",
    blocks: [
      {
        kind: "command",
        label: "Tracer l'exécution ligne par ligne",
        command: "bash -x monscript.sh",
        why: "Affiche chaque commande après expansion des variables (préfixée par `+`), juste avant de l'exécuter. On voit exactement ce que le shell voit : la cause d'un comportement étrange devient évidente. Équivalent dans le script : ajouter `set -x` en haut.",
        verify: "bash -x monscript.sh | head -20",
      },
      {
        kind: "command",
        label: "Analyser statiquement avec ShellCheck",
        command: "shellcheck monscript.sh",
        why: "ShellCheck lit le script sans l'exécuter et signale les erreurs classiques : variables non quotées, tests douteux, usages non portables. Chaque avertissement porte un code (SC2086…) documenté en ligne. C'est le linter de référence du shell.",
        verify: "shellcheck --version",
      },
      {
        kind: "text",
        text: "Réflexe de débogage : d'abord `bash -n` (vérifie la syntaxe sans exécuter), puis `bash -x` pour tracer, puis `shellcheck` pour les problèmes structurels. Ajouter des `echo \"DEBUG: var=$var\"` temporaires reste légitime pour les cas tordus — à retirer ensuite.",
      },
    ],
  },
  {
    id: "alias-et-personnalisation",
    title: "Alias et personnalisation",
    level: 2,
    intro:
      "Adapter le shell interactif à ses habitudes : alias, invite, rechargement.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Extraits typiques de ~/.bashrc",
        code: `# Raccourcis de commandes fréquentes\nalias ll='ls -la'\nalias maj='sudo apt update && sudo apt upgrade'\n\n# Fonction plutôt qu'alias dès qu'il y a des arguments ou de la logique\nmkcd() {\n  mkdir -p "$1" && cd "$1"\n}\n\n# Personnaliser l'invite : utilisateur, machine, dossier courant\nexport PS1='\\u@\\h:\\w\\$ '`,
      },
      {
        kind: "command",
        label: "Recharger la configuration",
        command: "source ~/.bashrc",
        why: "Re-exécute le fichier de configuration dans le shell courant : les nouveaux alias et fonctions sont disponibles immédiatement, sans fermer puis rouvrir le terminal. `source` (alias `.`) exécute dans le shell actuel, contrairement à `bash ~/.bashrc` qui lancerait un sous-shell éphémère.",
      },
      {
        kind: "text",
        text: "`~/.bashrc` est lu à chaque ouverture d'un shell interactif : c'est là que vivent alias, fonctions et variables d'environnement personnelles. Les alias ne sont pas disponibles dans les scripts non interactifs — pour du code réutilisable dans des scripts, écrire des fonctions ou des scripts séparés.",
      },
    ],
  },
  {
    id: "aide",
    title: "Trouver de l'aide",
    level: 2,
    intro:
      "Le shell documente ses propres commandes : savoir où chercher avant de chercher sur le web.",
    blocks: [
      {
        kind: "command",
        label: "Lire le manuel d'une commande",
        command: "man grep",
        why: "Affiche la documentation complète : synopsis, options, exemples. Navigation avec les flèches, `/motif` pour chercher, `q` pour quitter. C'est la référence exacte de la version installée sur la machine.",
      },
      {
        kind: "command",
        label: "Aide rapide d'une commande",
        command: "grep --help",
        why: "La plupart des commandes GNU acceptent `--help` : un résumé compact des options, plus rapide que le manuel pour vérifier un flag. Pour les commandes internes du shell (`cd`, `echo`), c'est `help cd`.",
      },
      {
        kind: "command",
        label: "Savoir ce qu'est vraiment une commande",
        command: "type -a python3",
        why: "Indique si un nom est un alias, une fonction, une commande interne ou un binaire — et où se trouve le binaire. Indispensable quand une commande ne se comporte pas comme prévu : on découvre souvent un alias masquant le vrai programme.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "quoting",
    title: "Le quoting : la règle d'or",
    level: 3,
    intro:
      "Guillemets simples, doubles ou rien : le choix qui détermine si un script survit aux espaces et aux caractères spéciaux.",
    blocks: [
      {
        kind: "table",
        headers: ["Écriture", "Expansion", "Usage"],
        rows: [
          ["`\"$var\"` (doubles)", "Variables, `$(...)` et arithmétique expansés", "Le défaut : toujours quoter les variables"],
          ["`'$var'` (simples)", "Aucune expansion, texte littéral", "Motifs, chaînes contenant des `$` à préserver"],
          ["`$var` (rien)", "Expansion + découpage en mots + glob", "À éviter, sauf effet voulu explicite"],
        ],
      },
      {
        kind: "code",
        language: "bash",
        title: "Pourquoi le quoting change tout",
        code: `fichier="mon rapport.pdf"\n\nrm $fichier\n# DANGER : devient rm mon rapport.pdf → supprime deux fichiers !\n\nrm "$fichier"\n# Sûr : un seul argument, le nom complet.\n\n# Règle pratique : si la valeur vient d'une variable, on la quote.\n# Seule exception courante : for f in *.txt (le glob DOIT rester non quoté).`,
      },
      {
        kind: "text",
        text: "Sans quotes, le shell applique le « word splitting » (découpage sur les espaces) puis l'expansion de globs (`*`) : une variable contenant des espaces devient plusieurs arguments. C'est la source numéro un des bugs de scripts. ShellCheck le signale systématiquement (SC2086).",
      },
    ],
  },
  {
    id: "expansions-accolades",
    title: "Expansions : accolades et tilde",
    level: 3,
    intro:
      "Générer des listes et des chemins sans les écrire un par un.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Brace expansion et tilde",
        code: `echo {1..5}\n# 1 2 3 4 5\n\nmkdir -p projet/{src,tests,docs}\n# Crée projet/src, projet/tests, projet/docs en une commande.\n\ncp rapport.txt{,.bak}\n# Copie vers rapport.txt.bak : la sauvegarde express.\n\ncd ~\n# ~ = dossier personnel ($HOME). ~/projets = $HOME/projets.\n\nmv *.log archive/{2024,2025}\n# Ici l'expansion produit deux destinations : à combiner avec une boucle.`,
      },
      {
        kind: "text",
        text: "L'expansion d'accolades `{a,b}` génère toutes les combinaisons avant l'exécution : c'est purement textuel, aucun fichier n'a besoin d'exister. Elle a lieu avant l'expansion des variables, donc `{$debut..$fin}` ne fonctionne pas — limitation connue à contourner avec une boucle C ou `seq`.",
      },
    ],
  },
  {
    id: "substitution-commande",
    title: "Substitution de commande",
    level: 3,
    intro:
      "Utiliser la sortie d'une commande comme valeur : le pont entre commandes et variables.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "$(...) : la forme moderne",
        code: `aujourdhui=$(date +%Y-%m-%d)\necho "Nous sommes le $aujourdhui"\n\nfichiers=$(ls *.txt | wc -l)\necho "$fichiers fichiers texte"\n\n# Imbrication lisible (impossible avec les backticks) :\nbase=$(basename "$(pwd)")\necho "Dossier : $base"`,
      },
      {
        kind: "text",
        text: "`$(...)` exécute la commande et capture sa sortie standard, en retirant les retours à la ligne finaux. L'ancienne forme avec backticks `` `...` `` fait la même chose mais s'imbrique mal et se confond visuellement avec les quotes : elle est déconseillée. À l'intérieur de `$(...)`, le quoting suit les règles normales — on quote comme d'habitude.",
      },
    ],
  },
  {
    id: "arithmetique",
    title: "Arithmétique",
    level: 3,
    intro:
      "Bash ne calcule qu'avec des entiers — mais il le fait bien.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "$(( )) pour les calculs entiers",
        code: `total=$((3 + 4 * 2))\necho "$total"   # 11\n\nn=5\nn=$((n + 1))   # incrémentation explicite\n((n++))        # forme courte : (( )) évalue une expression\n((n += 10))\n\n# Division entière : pas de décimales\n echo $((7 / 2))  # 2, pas 3.5`,
      },
      {
        kind: "text",
        text: "L'arithmétique Bash est entière uniquement : `7 / 2` vaut 2. Pour les décimales, on délègue à `bc` (`echo \"7 / 2\" | bc -l`) ou à `awk`. Dans `(( ))`, les variables s'écrivent sans `$` et l'expression retourne un code de sortie (0 si le résultat est non nul) — d'où son usage fréquent dans les conditions.",
      },
    ],
  },
  {
    id: "codes-de-sortie",
    title: "Codes de sortie",
    level: 3,
    intro:
      "Chaque commande rend un verdict numérique : 0 pour succès, le reste pour les échecs.",
    blocks: [
      {
        kind: "fields",
        title: "Lire les codes de sortie",
        fields: [
          {
            label: "`$?`",
            value:
              "Le code de sortie de la dernière commande exécutée. À lire immédiatement : la moindre commande suivante l'écrase.",
          },
          {
            label: "`0`",
            value:
              "Succès, par convention universelle. C'est ce que teste `if` : il exécute la branche `then` si la commande rend 0.",
          },
          {
            label: "`1`-`125`",
            value:
              "Échec applicatif : le sens dépend de la commande (`grep` rend 1 quand il ne trouve rien — ce n'est pas une erreur).",
          },
          {
            label: "`126`, `127`",
            value:
              "126 : commande trouvée mais non exécutable. 127 : commande introuvable (faute de frappe ou programme absent).",
          },
          {
            label: "`128+N`",
            value:
              "Mort par le signal N (ex. 130 = interrompu par Ctrl+C, signal 2). Utile pour diagnostiquer un script tué.",
          },
        ],
      },
      {
        kind: "code",
        language: "bash",
        title: "Exploiter les codes de sortie",
        code: `grep -q "erreur" app.log\nif [ $? -eq 0 ]; then\n  echo "Erreurs détectées"\nfi\n\n# Forme idiomatique : tester directement la commande\nif grep -q "erreur" app.log; then\n  echo "Erreurs détectées"\nfi\n\n# Chaînage : && si succès, || si échec\nmkdir -p sauvegarde && echo "OK"\ncd /chemin/inexistant || echo "Échec du cd"`,
      },
    ],
  },
  {
    id: "set-strict",
    title: "Mode strict : set -euo pipefail",
    level: 3,
    intro:
      "Trois options qui transforment un script silencieux en script qui échoue vite et fort.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "L'en-tête recommandé",
        code: `#!/usr/bin/env bash\nset -euo pipefail\n\n# -e : quitte dès qu'une commande échoue (code non nul).\n# -u : erreur si on utilise une variable non définie.\n# -o pipefail : un pipe échoue si UNE commande du pipe échoue.`,
      },
      {
        kind: "fields",
        title: "Ce que chaque option change",
        fields: [
          {
            label: "`set -e`",
            value:
              "Le script s'arrête à la première commande en échec au lieu de continuer sur une base cassée. Attention : ignoré dans certaines positions (conditions `if`, `&&`/`||`) — comportement subtil documenté dans `man bash`.",
          },
          {
            label: "`set -u`",
            value:
              "Utiliser une variable non définie devient une erreur au lieu de valoir chaîne vide. Attrape les fautes de frappe dans les noms de variables. Pour une variable optionnelle : `${VAR:-défaut}`.",
          },
          {
            label: "`set -o pipefail`",
            value:
              "Sans lui, le code de sortie d'un pipe est celui de la dernière commande : `grep motif fichier | wc -l` rend 0 même si le fichier n'existe pas. Avec lui, l'échec de `grep` fait échouer tout le pipe.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ces options ne rendent pas un script infaillible, mais elles éliminent la pire catégorie de bugs : le script qui continue après un échec et produit des dégâts en cascade. À placer en tête de tout script destiné à tourner sans surveillance (CI, cron, déploiement).",
      },
    ],
  },
  {
    id: "tests-avances",
    title: "Tests avancés avec [[ ]]",
    level: 3,
    intro:
      "La forme moderne des conditions : plus sûre et plus expressive que `[ ]`.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "[[ ]] : motifs et regex",
        code: `# Motif glob : le fichier est-il un .log ?\nif [[ "$fichier" == *.log ]]; then\n  echo "C'est un log"\nfi\n\n# Expression régulière : l'IP est-elle valide (forme simple) ?\nif [[ "$ip" =~ ^[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+$ ]]; then\n  echo "IP plausible"\nfi\n# Les groupes capturés sont dans \${BASH_REMATCH[1]}, \${BASH_REMATCH[2]}...\n\n# Et / ou logiques sans sous-shell\nif [[ -f "$f" && -r "$f" ]]; then\n  echo "Fichier lisible"\nfi`,
      },
      {
        kind: "text",
        text: "`[[ ]]` est une construction du shell (pas une commande) : pas de word splitting à l'intérieur, donc le quoting y est moins critique, et les opérateurs `&&`, `||`, `=~` y fonctionnent. Elle est spécifique à Bash (et zsh/ksh) : pour un script strictement POSIX, on reste sur `[ ]`.",
      },
    ],
  },
  {
    id: "case",
    title: "Choisir avec case",
    level: 3,
    intro:
      "L'alternative lisible aux longues chaînes de `if`/`elif` pour les choix multiples.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Structure case",
        code: `case "$1" in\n  start)\n    echo "Démarrage..."\n    ;;\n  stop|halt)\n    echo "Arrêt..."\n    ;;\n  status)\n    echo "État : en cours"\n    ;;\n  *)\n    echo "Usage : $0 {start|stop|status}"\n    exit 1\n    ;;\nesac`,
      },
      {
        kind: "text",
        text: "Chaque motif est un glob (`*`, `?`, `[abc]`, alternatives avec `|`) ; `;;` termine la branche. Le motif `*)` attrape tout le reste — l'équivalent du `default`. C'est la structure standard des scripts qui acceptent des sous-commandes (`start`, `stop`, `status`).",
      },
    ],
  },
  {
    id: "getopts",
    title: "Parser les options avec getopts",
    level: 3,
    intro:
      "Accepter `-v`, `-f fichier` proprement au lieu de bricoler `$1`, `$2`.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Options courtes avec arguments",
        code: `verbose=0\nfichier=""\n\nwhile getopts "vf:" opt; do\n  case "$opt" in\n    v) verbose=1 ;;\n    f) fichier="$OPTARG" ;;\n    *) echo "Usage : $0 [-v] [-f fichier]"; exit 1 ;;\n  esac\ndone\n# "vf:" : v sans argument, f: avec argument (dans $OPTARG).\n\nshift $((OPTIND - 1))\n# Décale les arguments : $@ ne contient plus que les positionnels restants.\n\n[ "$verbose" -eq 1 ] && echo "Mode verbeux, fichier=$fichier"`,
      },
      {
        kind: "text",
        text: "`getopts` est la commande interne standard pour les options courtes. Pour les options longues (`--verbose`), Bash natif ne propose rien : on les parse à la main avec un `case` dans une boucle, ou on accepte cette limitation. Au-delà d'une poignée d'options, un vrai langage (Python `argparse`) devient plus adapté.",
      },
    ],
  },
  {
    id: "boucles-avancees",
    title: "Boucles avancées",
    level: 3,
    intro:
      "Lire un fichier ligne par ligne sans tout casser, et autres motifs utiles.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "while read : la lecture ligne à ligne",
        code: `# La forme correcte : IFS vide + -r\nwhile IFS= read -r ligne; do\n  echo "Ligne : $ligne"\ndone < "fichier.txt"\n# IFS= : préserve les espaces en début/fin. -r : ne pas interpréter les \\.\n\n# Menu interactif simple\nselect choix in "Démarrer" "Arrêter" "Quitter"; do\n  case "$choix" in\n    "Démarrer") echo "Go" ; break ;;\n    "Arrêter") echo "Stop" ; break ;;\n    "Quitter") break ;;\n  esac\ndone`,
      },
      {
        kind: "text",
        text: "`while IFS= read -r ligne` est l'idiome canonique de lecture ligne par ligne : sans `IFS=`, les espaces de début et fin sont rognés ; sans `-r`, les backslashes sont interprétés. Et surtout : jamais `for ligne in $(cat fichier)` — le découpage en mots détruit les lignes contenant des espaces.",
      },
    ],
  },
  {
    id: "tableaux",
    title: "Tableaux indexés",
    level: 3,
    intro:
      "Stocker des listes sans les aplatir en chaînes : la fin des variables fourre-tout.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Créer, lire, parcourir",
        code: `services=("nginx" "postgres" "redis")\n\necho "\${services[0]}"      # nginx (indice 0)\necho "\${#services[@]}"     # 3 : nombre d'éléments\n\n# Parcourir SANS casser les éléments contenant des espaces :\nfor s in "\${services[@]}"; do\n  echo "Service : $s"\ndone\n\nservices+=("memcached")  # ajouter un élément\nunset 'services[1]'       # retirer l'élément d'indice 1`,
      },
      {
        kind: "text",
        text: "La forme quotée avec arobase — `${tableau[@]}` — est le seul parcours correct : chaque élément reste un argument distinct, même avec des espaces. La variante étoile `${tableau[*]}` fusionne tout en une seule chaîne — presque toujours une erreur. Les tableaux sont la réponse propre à « une variable contenant une liste ».",
      },
    ],
  },
  {
    id: "tableaux-associatifs",
    title: "Tableaux associatifs",
    level: 3,
    intro:
      "Des clés nommées plutôt que des indices : les dictionnaires de Bash.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "declare -A",
        code: `declare -A ports\nports["http"]=80\nports["https"]=443\nports["ssh"]=22\n\necho "\${ports[https]}"   # 443\n\n# Parcourir clés et valeurs\nfor proto in "\${!ports[@]}"; do\n  echo "$proto -> \${ports[$proto]}"\ndone`,
      },
      {
        kind: "text",
        text: "Les tableaux associatifs exigent `declare -A` avant usage et Bash 4+ — c'est la principale incompatibilité avec le Bash 3.2 de macOS (qui ne les supporte pas). Pour des correspondances clé/valeur simples, ils évitent des `case` interminables ou des fichiers de configuration ad hoc.",
      },
    ],
  },
  {
    id: "fonctions-avancees",
    title: "Fonctions : portée et retours",
    level: 3,
    intro:
      "Ce que les fonctions Bash font différemment des autres langages.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "local, return et capture",
        code: `compter_lignes() {\n  local fichier="$1"\n  local n\n  n=$(wc -l < "$fichier")\n  echo "$n"      # la « valeur de retour » passe par stdout\n  return 0       # le code de sortie : 0 = succès\n}\n\ntotal=$(compter_lignes "app.log")\necho "Lignes : $total"\n\n# $FUNCNAME : nom de la fonction courante (utile pour les messages d'erreur)\n# return > 255 : les codes sont modulo 256, ne pas y stocker des données.`,
      },
      {
        kind: "text",
        text: "Trois règles à retenir : `local` systématique pour les variables internes (sinon elles fuient dans le scope global), `return` réservé aux codes 0-255 (le succès ou l'échec, jamais une donnée), et les données renvoyées via `echo` + capture `$(...)`. Une fonction qui mélange les deux (messages de debug sur stdout) pollue sa propre valeur de retour : les diagnostics vont sur stderr (`echo \"...\" >&2`).",
      },
    ],
  },
  {
    id: "trap-signaux",
    title: "Nettoyage avec trap",
    level: 3,
    intro:
      "Garantir le nettoyage (fichiers temporaires, verrous) même si le script est interrompu.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Le motif du fichier temporaire sûr",
        code: `tmp=$(mktemp)\n# mktemp crée un fichier temporaire au nom unique et sûr.\n\ncleanup() {\n  rm -f "$tmp"\n}\ntrap cleanup EXIT\n# EXIT : exécuté à toute fin du script, normale ou par erreur.\n# INT TERM : pour réagir à Ctrl+C ou à un kill.\n\necho "données" > "$tmp"\n# ... traitement ...\n# Pas besoin de rm final : le trap s'en charge.`,
      },
      {
        kind: "text",
        text: "`trap commande SIGNAL` exécute une commande à la réception d'un signal. Le motif `mktemp` + `trap ... EXIT` est le standard pour les fichiers temporaires : sans lui, un script interrompu laisse des déchets dans `/tmp`. Ne jamais utiliser de nom de fichier temporaire prévisible (`/tmp/monscript.tmp`) : faille de sécurité classique (symlink attack).",
      },
    ],
  },
  {
    id: "process-substitution",
    title: "Substitution de processus",
    level: 3,
    intro:
      "Utiliser la sortie d'une commande là où un fichier est attendu.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "<(...) et diff sans fichiers temporaires",
        code: `# Comparer deux tris sans fichier intermédiaire\ndiff <(sort a.txt) <(sort b.txt)\n\n# Nourrir une commande qui exige un fichier\nwc -l <(ls)\n\n# Lire la sortie d'un pipe DANS le shell courant (pas de sous-shell) :\nwhile read -r ligne; do\n  compteur=$((compteur + 1))\ndone < <(grep "ERREUR" app.log)\necho "Erreurs : $compteur"`,
      },
      {
        kind: "text",
        text: "`<(cmd)` présente la sortie de la commande comme un fichier (en réalité un descripteur `/dev/fd`). Le dernier exemple résout un piège célèbre : dans `cmd | while read`, la boucle tourne dans un sous-shell et les variables modifiées y sont perdues à la fin du pipe. La substitution de processus garde tout dans le shell courant.",
      },
    ],
  },
  {
    id: "xargs",
    title: "xargs : construire des commandes",
    level: 3,
    intro:
      "Transformer des lignes de texte en arguments de commande, en masse.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Les usages sûrs de xargs",
        code: `# Supprimer les fichiers listés (noms avec espaces : -0 + -print0)\nfind . -name "*.tmp" -print0 | xargs -0 rm\n\n# Un argument à la fois, avec aperçu\ncat urls.txt | xargs -I{} echo "Téléchargement de {}"\n\n# Paralléliser : 4 processus simultanés\nfind images/ -name "*.png" -print0 | xargs -0 -P 4 -n 1 optipng`,
      },
      {
        kind: "text",
        text: "`xargs` lit des lignes sur stdin et les passe en arguments à une commande, en regroupant intelligemment pour ne pas dépasser la limite de taille de la ligne de commande. `-0` (avec `find -print0`) gère les noms de fichiers exotiques ; `-P` parallélise. Alternative moderne : `find -exec ... {} +`, qui fait le regroupement sans `xargs`.",
      },
    ],
  },
  {
    id: "find",
    title: "find : chercher des fichiers",
    level: 3,
    intro:
      "Le couteau suisse de la recherche de fichiers, bien au-delà du nom.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Critères et actions",
        code: `# Par nom (glob, sensible à la casse) et par type\nfind . -name "*.log" -type f\n\n# Modifiés il y a moins de 7 jours, de plus de 10 Mo\nfind /var/log -mtime -7 -size +10M\n\n# Exécuter une commande sur chaque résultat (regroupé, efficace)\nfind . -name "*.bak" -exec rm {} +\n\n# Permissions dangereuses : fichiers inscriptibles par tous\nfind . -type f -perm -o+w`,
      },
      {
        kind: "text",
        text: "`find` combine critères (`-name`, `-type`, `-mtime`, `-size`, `-perm`) avec des opérateurs logiques implicites (ET) ou explicites (`-o` pour OU, `!` pour NON). `-exec {} +` passe les fichiers par lots à la commande — bien plus efficace que `-exec {} \\;` (un appel par fichier). Jamais de `ls` parsé dans un script : `find` est l'outil prévu pour ça.",
      },
    ],
  },
  {
    id: "sed",
    title: "sed : l'éditeur en flux",
    level: 3,
    intro:
      "Substituer du texte ligne par ligne, sans ouvrir d'éditeur.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Substitutions courantes",
        code: `# Remplacer la première occurrence par ligne\nsed 's/ancien/nouveau/' fichier.txt\n\n# Toutes les occurrences (g = global)\nsed 's/ancien/nouveau/g' fichier.txt\n\n# Modifier le fichier sur place (avec sauvegarde .bak)\nsed -i.bak 's/localhost/db.internal/g' config.env\n\n# Supprimer les lignes vides et les commentaires\nsed -e '/^$/d' -e '/^#/d' config.txt\n\n# N'afficher que les lignes 10 à 20\nsed -n '10,20p' gros.log`,
      },
      {
        kind: "text",
        text: "`s/motif/remplacement/` est la commande reine de `sed` ; `-i` édite sur place (toujours avec une extension de sauvegarde en production). Les motifs sont des expressions régulières « basiques » par défaut — `-E` active la syntaxe étendue (`+`, `?`, `(...)` sans backslash). Pour tout ce qui dépasse la substitution ligne à ligne, `awk` ou un vrai langage est plus lisible.",
      },
    ],
  },
  {
    id: "awk",
    title: "awk : traiter des colonnes",
    level: 3,
    intro:
      "Le mini-langage pour les données en colonnes : logs, CSV simples, sorties de commandes.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Motifs essentiels",
        code: `# Afficher les colonnes 1 et 3 (séparateur = espaces)\nawk '{print $1, $3}' acces.log\n\n# Filtrer : lignes où la colonne 9 vaut 404\nawk '$9 == 404' acces.log\n\n# Somme de la colonne 2\nawk '{s += $2} END {print s}' ventes.txt\n\n# CSV : changer le séparateur\nawk -F',' '{print $2}' clients.csv\n\n# Compter les occurrences de chaque valeur de la colonne 1\nawk '{c[$1]++} END {for (k in c) print c[k], k}' acces.log`,
      },
      {
        kind: "text",
        text: "`awk` lit le fichier ligne par ligne, découpe chaque ligne en champs (`$1`, `$2`… ; `$0` = la ligne entière) et applique les actions aux lignes matching le motif. Le bloc `END` s'exécute après la dernière ligne — idéal pour les totaux. C'est un vrai langage (variables, tableaux associatifs, fonctions) : pour un rapport en une ligne, rien ne l'égale.",
      },
    ],
  },
  {
    id: "grep-regex",
    title: "grep et les expressions régulières",
    level: 3,
    intro:
      "Chercher des motifs dans du texte : l'outil le plus invoqué des pipelines.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Options qui changent la vie",
        code: `# Récursif, numéros de ligne, insensible à la casse\ngrep -rn "TODO" src/\n\n# Regex étendue (-E) : plus lisible\n grep -E "erreur|warning|critique" app.log\n\n# Inverser : tout sauf les lignes de debug\ngrep -v "DEBUG" app.log\n\n# Contexte : 3 lignes autour de chaque match\ngrep -C 3 "Exception" app.log\n\n# Compter les matchs, lister les fichiers concernés\ngrep -rc "import" src/ | grep -v ":0"`,
      },
      {
        kind: "table",
        headers: ["Motif", "Signification"],
        rows: [
          ["`^debut`", "Début de ligne"],
          ["`fin$`", "Fin de ligne"],
          ["`.`", "N'importe quel caractère"],
          ["`[0-9]`", "Un chiffre (classe)"],
          ["`a*`, `a+`", "Zéro ou plus / un ou plus (avec `-E` pour `+`)"],
          ["`(a|b)`", "Alternative (avec `-E`)"],
        ],
      },
    ],
  },
  {
    id: "here-doc",
    title: "Here-documents",
    level: 3,
    intro:
      "Nourrir une commande avec un bloc de texte multiligne sans fichier temporaire.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "<<EOF et sa variante quotée",
        code: `# Écrire un fichier de config depuis un script\ncat > config.env <<EOF\nDB_HOST=localhost\nDB_PORT=5432\n# Les variables SONT expansées ici :\nAPP_ENV=$env\nEOF\n\n# Texte littéral : le délimiteur quoté désactive l'expansion\ncat > script.sh <<'EOF'\necho "Le $HOME ne sera pas expansé"\nEOF\n\n# <<- autorise l'indentation par tabulations (pas des espaces)\nif [ "$ok" = 1 ]; then\n\tcat <<-EOF\n\tLigne indentée proprement\n\tEOF\nfi`,
      },
      {
        kind: "text",
        text: "Le here-doc `<<DELIM` envoie tout jusqu'à la ligne contenant exactement `DELIM` sur l'entrée standard de la commande. Non quoté, le contenu subit les expansions (pratique pour générer des configs) ; quoté (`<<'EOF'`), il reste littéral (indispensable pour générer… du Bash). Le délimiteur final doit être seul sur sa ligne, sans espaces autour (sauf avec `<<-` et des tabulations).",
      },
    ],
  },
  {
    id: "here-string",
    title: "Here-strings",
    level: 3,
    intro:
      "La version une-ligne du here-doc : nourrir une commande avec une variable.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "<<< : une chaîne en entrée standard",
        code: `grep "erreur" <<< "$contenu"\n# Équivaut à : echo "$contenu" | grep "erreur"\n# sans sous-shell ni pipe superflu.\n\n# Convertir une casse\ntr 'a-z' 'A-Z' <<< "bonjour"\n# BONJOUR\n\n# Nourrir read sans sous-shell\nIFS=',' read -r nom age <<< "Akane,25"`,
      },
      {
        kind: "text",
        text: "`<<<` est spécifique à Bash (et quelques autres shells) : il place la chaîne sur l'entrée standard de la commande. Plus lisible que `echo \"$var\" | cmd` pour une simple variable, et il évite le pipe — donc pas de sous-shell, donc les variables modifiées par la commande restent visibles.",
      },
    ],
  },
  {
    id: "job-control",
    title: "Contrôle des tâches",
    level: 3,
    intro:
      "Lancer en arrière-plan, suspendre, reprendre : gérer plusieurs processus depuis un terminal.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "&, jobs, fg, bg",
        code: `long_traitement.sh &\n# & : lance en arrière-plan, rend la main aussitôt.\n\njobs\n# Liste les tâches du shell : [1]+ Running long_traitement.sh\n\nfg %1\n# Ramène la tâche 1 au premier plan.\n\n# Ctrl+Z suspend la tâche courante, puis :\nbg %1\n# ... la relance en arrière-plan.`,
      },
      {
        kind: "text",
        text: "Le contrôle de tâches est une fonctionnalité du shell interactif : chaque tâche a un numéro (`%1`). `kill %1` termine la tâche 1. Pour un processus qui doit survivre à la fermeture du terminal, ce n'est pas `&` qu'il faut mais `nohup` ou un multiplexeur (`tmux`, `screen`) — `&` seul meurt avec le shell (SIGHUP).",
      },
    ],
  },
  {
    id: "subshells",
    title: "Sous-shells et groupes",
    level: 3,
    intro:
      "Parenthèses vs accolades : isoler ou non l'environnement d'un bloc.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "( ) isole, { } groupe",
        code: `cd /tmp\npwd  # /tmp : le cd a affecté le shell courant\n\n(cd /var/log && ls)\n# Le cd n'a lieu que dans le sous-shell : le shell courant ne bouge pas.\n\n# Grouper pour rediriger un bloc entier :\n{\n  echo "=== Rapport ==="\n  date\n  df -h\n} > rapport.txt`,
      },
      {
        kind: "text",
        text: "`( ... )` lance un sous-shell : variables modifiées, `cd`, `umask`… tout est oublié à la fin. C'est le moyen propre de « salir » temporairement l'environnement. `{ ...; }` groupe sans isoler (notez les espaces et le `;` final obligatoires) : utile pour appliquer une redirection à tout un bloc.",
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité des scripts",
    level: 3,
    intro:
      "Un script shell manipule le système : les règles qui évitent les catastrophes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne jamais `eval` une entrée non contrôlée : `eval` exécute du code arbitraire. Préférer les tableaux et `${!var}` (référence indirecte) pour les noms de variables dynamiques.",
          "Quoter toute variable contenant un chemin ou une entrée utilisateur : `rm -rf $dir` avec `dir` vide ou malicieux supprime le mauvais dossier.",
          "Ne pas ajouter `.` au `PATH`, ne pas exécuter de script téléchargé sans le lire : `curl ... | bash` exécute du code aveuglément.",
          "`set -u` contre les variables non définies ; vérifier l'existence des fichiers avant de les écraser ; sauvegarder avant `sed -i`.",
          "Fichiers temporaires via `mktemp` uniquement, jamais de noms prévisibles dans `/tmp`.",
          "Secrets (mots de passe, tokens) : jamais en dur dans le script ni en argument visible (`ps` les affiche) — variables d'environnement ou fichiers à permissions restreintes (`chmod 600`).",
        ],
      },
    ],
  },
  {
    id: "portabilite",
    title: "Portabilité",
    level: 3,
    intro:
      "Écrire des scripts qui survivent au changement de machine : macOS, Linux, conteneurs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Shebang `#!/usr/bin/env bash` : trouve Bash où qu'il soit installé.",
          "macOS livre Bash 3.2 (figé pour des raisons de licence) : pas de tableaux associatifs, pas de `**` récursif par défaut. Tester avec cette version si le script doit tourner sur Mac.",
          "Préférer les options POSIX des commandes (`grep`, `sed`, `find`) aux extensions GNU quand le script vise plusieurs OS — ou documenter la dépendance.",
          "Éviter les chemins en dur (`/bin/...`, `/usr/local/...`) : passer par `command -v` pour localiser les outils.",
          "ShellCheck signale les constructions non portables : l'exécuter fait partie de la recette.",
          "Tester le script dans un conteneur minimal proche de la cible avant de le déployer.",
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance des scripts",
    level: 3,
    intro:
      "Quand un script devient lent : où part le temps, et comment le récupérer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le coût dominant : lancer des processus externes. Une boucle qui appelle `grep`/`sed`/`cut` 10 000 fois est lente ; une seule invocation d'`awk` qui fait tout est rapide.",
          "Préférer les constructions internes (`[[ ]]`, `${var/...}`, `$(( ))`, `read`) aux appels externes équivalents.",
          "Éviter les pipes inutiles : `cat fichier | grep x` → `grep x fichier` (le « useless use of cat »).",
          "Pour les gros volumes, `xargs -P` ou `find -exec ... +` parallélisent et regroupent.",
          "Mesurer avant d'optimiser : `time ./script.sh` donne le réel / utilisateur / système.",
          "Au-delà de quelques centaines de lignes ou de traitements lourds, Python est souvent le meilleur « optimiseur » : plus lisible et plus rapide à écrire.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges que tout le monde rencontre — et comment les reconnaître.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Remède"],
        rows: [
          ["`command not found` sur une affectation", "Espace autour du `=` : `x = 1`", "Coller au `=` : `x=1`"],
          ["Fichier introuvable avec espaces", "Variable non quotée, découpage en mots", "Toujours `\"$var\"`"],
          ["`[: missing ]`", "Espace manquant dans `[` ou variable vide non quotée", "Espaces autour des crochets + quoting"],
          ["Boucle `while read` perd ses variables", "Pipe = sous-shell", "Redirection `< fichier` ou `< <(...)`"],
          ["Script Windows ne s'exécute pas", "Fins de ligne CRLF (`\\r` parasite)", "Convertir en LF (`dos2unix` ou éditeur)"],
          ["`Permission denied`", "Bit d'exécution manquant", "`chmod +x` ou `bash script.sh`"],
          ["Comparaison numérique fausse", "`=` utilisé au lieu de `-eq`", "Opérateurs numériques : `-eq -lt -gt`"],
          ["Glob non expansé dans une variable", "Expansion faite à l'affectation, pas à l'usage", "Stocker dans un tableau, pas une chaîne"],
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets progressifs pour ancrer les réflexes, du plus guidé au plus libre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Nettoyeur de téléchargements",
            detail:
              "Script qui parcourt `~/Téléchargements`, classe les fichiers par extension dans des sous-dossiers (`images/`, `documents/`, `archives/`) via une boucle `for` et un `case`, avec mode `set -euo pipefail` et un flag `-n` (dry-run) qui affiche sans déplacer.",
          },
          {
            title: "Projet 2 — Sauvegarde chiffrée planifiée",
            detail:
              "Archive `tar` d'un dossier, compression, nom horodaté via `$(date +%F)`, nettoyage des archives de plus de 7 jours avec `find -mtime +7 -delete`, fichier temporaire via `mktemp` + `trap`, puis entrée `cron` (`crontab -e`) pour l'exécution quotidienne et log des exécutions.",
          },
          {
            title: "Projet 3 — Mini-déploiement",
            detail:
              "Script `deploy.sh` avec sous-commandes `case` (`check`, `deploy`, `rollback`) : vérifie la syntaxe (`bash -n`), `git pull`, construit l'artefact, le copie avec sauvegarde de la version précédente, redémarre le service, vérifie qu'il répond (`curl -f`), rollback automatique en cas d'échec.",
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
            label: "Manuel GNU Bash",
            value:
              "gnu.org/software/bash/manual : la référence complète, du démarrage aux subtilités de l'expansion.",
          },
          {
            label: "Bash FAQ",
            value:
              "mywiki.wooledge.org/BashFAQ : les réponses aux questions récurrentes, avec les pièges expliqués.",
          },
          {
            label: "ShellCheck Wiki",
            value:
              "Chaque code SC2086… est documenté avec exemple fautif et correction : apprendre en corrigeant.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : `man bash` sur la machine — c'est la doc exacte de la version installée.",
          "Outils : ShellCheck (analyse statique), shfmt (formatage), bats (tests de scripts shell).",
          "Prochaine étape : lire des scripts réels (scripts d'installation, entrypoints Docker) pour voir les idiomes en contexte.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Bash maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir `linux` : le système que Bash pilote — permissions, processus, services.",
          "Automatiser proprement : `git` pour versionner les scripts, puis `docker` pour des environnements reproductibles.",
          "Passer à l'échelle : Python pour les scripts complexes, `ansible` pour l'automatisation multi-serveurs.",
          "Côté CI : écrire les étapes de pipelines (GitHub Actions) en Bash robuste (`set -euo pipefail`).",
          "Revenir à la roadmap : valider Bash et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

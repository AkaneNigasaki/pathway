import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Git : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : le modèle mental (snapshots, trois zones, graphe de commits)
 * avant la syntaxe ; chaque commande est expliquée avec son but et sa
 * vérification.
 */
export const LEARNING_GIT: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Git, ce qu'il n'est pas, et pourquoi il est devenu l'outil standard du travail en équipe.",
    blocks: [
      {
        kind: "text",
        text: "Git est un gestionnaire de versions distribué, créé par Linus Torvalds en 2005 pour le développement du noyau Linux. Il enregistre l'historique complet d'un projet : chaque modification est un instantané (un « commit ») que l'on peut consulter, comparer ou annuler. Si quelque chose casse, on peut revenir en arrière avec précision.",
      },
      {
        kind: "text",
        text: "Point essentiel : Git n'est pas GitHub. Git est l'outil local qui gère l'historique sur votre machine ; GitHub (comme GitLab ou Codeberg) est une plateforme d'hébergement qui stocke les dépôts Git en ligne et ajoute la collaboration (pull requests, revue de code, CI). On peut utiliser Git toute sa vie sans jamais toucher GitHub.",
      },
      {
        kind: "fields",
        title: "Git en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Git photographie l'état de vos fichiers à chaque étape et conserve toutes les photographies dans un historique navigable.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Avant Git, on sauvegardait `projet-final-v2-vraiment-final.zip`. En équipe, c'est ingérable : qui a changé quoi, quand, et comment revenir en arrière sans écraser le travail des autres ? Git répond à ces trois questions avec un historique partagé et fusionnable.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès qu'un projet dépasse quelques fichiers : code, documentation, configuration, site statique. En solo comme en équipe, dès le premier jour du projet — pas « quand ce sera sérieux ».",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un outil de sauvegarde automatique (chaque commit est un choix explicite), ni un cloud (le dépôt vit d'abord sur votre machine), ni un outil réservé au code : il versionne tout fichier texte.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : trois zones, un graphe",
    level: 1,
    intro:
      "Deux idées suffisent pour comprendre 80 % de Git : les trois zones et l'historique en graphe.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois zones, en une image",
        lines: [
          "Répertoire de travail          Zone de staging            Dépôt local",
          " (vos fichiers)                (le « panier »)            (l'historique)",
          "       │                              │                        │",
          "       │  git add                      │  git commit              │",
          "       └─────────────────────────────▶└────────────────────────▶│",
          "                                                             │",
          "                                              git push        │",
          "                                                             ▼",
          "                                                   Dépôt distant (GitHub…)",
        ],
      },
      {
        kind: "text",
        text: "Modifier un fichier ne suffit pas : `git add` place la modification dans la zone de staging (vous choisissez exactement ce qui part), puis `git commit` fige ce panier en un instantané daté et commenté. Cette étape intermédiaire est volontaire : elle permet des commits précis, fichier par fichier, voire ligne par ligne.",
      },
      {
        kind: "diagram",
        title: "L'historique est un graphe de commits",
        lines: [
          "A ── B ── C ── D   (branche main)",
          "          \\",
          "           E ── F   (branche fonctionnalité)",
          "                    \\",
          "                     G  (fusion : réunit les deux lignes)",
          "",
          "Chaque commit connaît son parent. Une branche n'est qu'une",
          "étiquette mobile qui pointe vers un commit.",
        ],
      },
      {
        kind: "text",
        text: "L'historique n'est pas une ligne droite : c'est un graphe où chaque commit pointe vers son parent. Les branches sont des lignes de développement parallèles — bon marché à créer, faites pour être fusionnées puis supprimées. C'est cette structure qui rend le travail en équipe possible sans écraser le code des autres.",
      },
      {
        kind: "fields",
        title: "Vocabulaire minimal",
        fields: [
          {
            label: "Dépôt (repository)",
            value:
              "Le dossier `.git/` caché à la racine du projet : il contient tout l'historique, les branches et la configuration. Supprimez-le et le projet redevient un simple dossier.",
          },
          {
            label: "Commit",
            value:
              "Un instantané daté, signé par un auteur, avec un message qui explique le « pourquoi ». Identifié par un hash comme `a3f9c1d`.",
          },
          {
            label: "Branche",
            value:
              "Une étiquette qui avance à chaque nouveau commit. `main` est la branche principale par convention.",
          },
          {
            label: "Distribué",
            value:
              "Chaque clone contient l'historique complet. Pas de serveur central obligatoire : le « distant » n'est qu'une convention pratique.",
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
    intro: "Ce qu'il faut avant de commencer — c'est très court.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un terminal (Terminal, PowerShell, ou le terminal intégré de votre éditeur) — Git est d'abord un outil en ligne de commande.",
          "Aucun langage de programmation requis : Git versionne du texte, quel qu'il soit.",
          "Pour la partie collaboration : un compte sur une forge (GitHub, GitLab, Codeberg — le choix dépend de votre contexte, pas d'une supériorité absolue).",
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : apprenez les commandes de base dans le terminal même si votre éditeur propose des boutons Git. Les boutons cachent le modèle mental ; le terminal le révèle, et il fonctionne partout.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro: "Installer Git et vérifier que tout fonctionne.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier si Git est déjà installé",
        command: "git --version",
        why: "Affiche la version installée. Sur macOS et beaucoup de distributions Linux, Git est déjà présent. Si la commande échoue, il faut l'installer.",
        verify: "Vous devez voir quelque chose comme `git version 2.4x.x`.",
      },
      {
        kind: "command",
        label: "Installer sur Debian / Ubuntu",
        command: "sudo apt update && sudo apt install git",
        why: "`apt` est le gestionnaire de paquets de ces distributions : il télécharge Git depuis les dépôts officiels de la distribution.",
      },
      {
        kind: "command",
        label: "Installer sur macOS",
        command: "brew install git",
        why: "Homebrew est le gestionnaire de paquets le plus courant sur macOS. Alternative : installer les outils en ligne de commande Xcode, qui incluent Git.",
      },
      {
        kind: "command",
        label: "Installer sur Windows",
        command: "winget install Git.Git",
        why: "`winget` est le gestionnaire de paquets intégré à Windows 10/11. Alternative : le programme d'installation officiel sur git-scm.com, qui inclut Git Bash (un terminal Unix-like très pratique).",
      },
      {
        kind: "text",
        text: "Quelle que soit la méthode, le résultat est identique : la commande `git` devient disponible dans le terminal. Aucune inscription, aucun compte n'est nécessaire pour utiliser Git en local.",
      },
    ],
  },
  {
    id: "config-identite",
    title: "Configuration : identité et réglages de base",
    level: 2,
    intro: "La seule configuration vraiment obligatoire : dire à Git qui vous êtes.",
    blocks: [
      {
        kind: "text",
        text: "Chaque commit enregistre un auteur. Sans identité configurée, Git refuse de commiter. Ces réglages sont stockés dans `~/.gitconfig` (niveau utilisateur, option `--global`) ou dans `.git/config` du projet (niveau dépôt, sans `--global`, prioritaire).",
      },
      {
        kind: "command",
        label: "Déclarer votre nom d'auteur",
        command: 'git config --global user.name "Votre Nom"',
        why: "Ce nom apparaîtra dans chaque commit que vous créez. Utilisez votre vrai nom ou votre pseudonyme habituel — c'est une information publique dans les projets partagés.",
        verify: "Vérifiez avec `git config user.name`.",
      },
      {
        kind: "command",
        label: "Déclarer votre e-mail d'auteur",
        command: 'git config --global user.email "vous@exemple.com"',
        why: "L'e-mail identifie l'auteur de façon unique. Sur GitHub, utilisez l'e-mail associé à votre compte pour que vos commits soient reliés à votre profil.",
        verify: "Vérifiez avec `git config user.email`.",
      },
      {
        kind: "command",
        label: "Nommer la branche principale `main` par défaut",
        command: "git config --global init.defaultBranch main",
        why: "Les nouvelles versions de Git créent encore parfois une branche `master` par défaut. Ce réglage harmonise vos nouveaux dépôts avec la convention actuelle (`main`), utilisée par GitHub et GitLab.",
      },
      {
        kind: "command",
        label: "Choisir votre éditeur pour les messages de commit",
        command: 'git config --global core.editor "code --wait"',
        why: "Quand vous faites `git commit` sans `-m`, Git ouvre un éditeur. Adaptez la valeur à votre éditeur (`nano`, `vim`, `code --wait` pour VS Code…). Sans ce réglage, Git utilise l'éditeur par défaut du système.",
      },
      {
        kind: "command",
        label: "Lister toute votre configuration",
        command: "git config --list --show-origin",
        why: "Affiche chaque réglage avec le fichier dont il provient. Indispensable pour comprendre pourquoi un réglage ne s'applique pas : un réglage de dépôt écrase toujours le réglage global.",
      },
    ],
  },
  {
    id: "premier-depot",
    title: "Premier dépôt : init, add, commit",
    level: 2,
    intro: "Créer un dépôt et enregistrer vos premiers commits, pas à pas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le dossier et l'initialiser",
            detail:
              "Créez un dossier de projet, placez-vous dedans, puis lancez `git init`. Git crée un sous-dossier caché `.git/` : c'est le dépôt. Vos fichiers existants ne sont pas modifiés.",
          },
          {
            title: "Créer un premier fichier",
            detail:
              "Ajoutez par exemple un `README.md` avec une ligne de description. Pour l'instant, Git le voit comme « non suivi » : il existe dans le répertoire de travail mais pas encore dans l'historique.",
          },
          {
            title: "Observer l'état avec git status",
            detail:
              "Lancez `git status` : Git liste le fichier en « untracked ». Prenez l'habitude de lancer cette commande avant chaque commit — c'est votre tableau de bord.",
          },
          {
            title: "Placer le fichier en staging",
            detail:
              "Lancez `git add README.md`. Le fichier passe en zone de staging : il est prêt à être photographié. `git status` le confirme (fichier en vert, « à commiter »).",
          },
          {
            title: "Créer le commit",
            detail:
              "Lancez `git commit -m \"Ajoute le README initial\"`. Le message décrit le changement à l'impératif, en une ligne. Vérifiez avec `git log --oneline` : votre premier commit apparaît.",
          },
        ],
      },
      {
        kind: "command",
        label: "Initialiser un dépôt dans le dossier courant",
        command: "git init",
        why: "Transforme le dossier courant en dépôt Git en créant `.git/`. À lancer une seule fois par projet, à sa racine.",
        verify: "`ls -a` doit montrer un dossier `.git/`, et `git status` ne doit plus répondre « not a git repository ».",
      },
      {
        kind: "command",
        label: "Ajouter tous les fichiers modifiés au staging",
        command: "git add .",
        why: "Le point signifie « tout le dossier courant ». Pratique pour un premier commit ; au quotidien, préférez ajouter fichier par fichier pour des commits précis.",
      },
      {
        kind: "command",
        label: "Créer un commit avec un message",
        command: 'git commit -m "Décrit le changement"',
        why: "Fige le contenu du staging en un commit. L'option `-m` passe le message directement ; sans elle, Git ouvre votre éditeur.",
        verify: "`git log --oneline` affiche le nouveau commit en tête.",
      },
    ],
  },
  {
    id: "commandes-quotidiennes",
    title: "Les trois commandes du quotidien : status, log, diff",
    level: 2,
    intro: "Celles que vous lancerez des dizaines de fois par jour.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois piliers",
        fields: [
          {
            label: "git status",
            value:
              "En une phrase : « où en suis-je ? ». Affiche la branche courante, les fichiers en staging, les fichiers modifiés non stagés et les fichiers non suivis. À lancer avant chaque `add` et chaque `commit`.",
          },
          {
            label: "git log",
            value:
              "En une phrase : « que s'est-il passé ? ». Affiche l'historique des commits (hash, auteur, date, message). `--oneline` pour une vue compacte, `--graph` pour visualiser les branches.",
          },
          {
            label: "git diff",
            value:
              "En une phrase : « qu'est-ce qui a changé exactement ? ». Affiche les modifications non stagées, ligne par ligne (`-` supprimé, `+` ajouté). `git diff --staged` montre ce qui est en staging.",
          },
        ],
      },
      {
        kind: "command",
        label: "Voir l'état du répertoire de travail",
        command: "git status",
        why: "C'est la boussole : elle indique ce qui sera commité, ce qui ne le sera pas, et sur quelle branche vous êtes. En cas de doute, commencez toujours par elle.",
      },
      {
        kind: "command",
        label: "Voir l'historique en une ligne par commit",
        command: "git log --oneline -10",
        why: "Affiche les 10 derniers commits en format compact (hash court + message). Suffisant dans 90 % des cas pour retrouver un commit.",
      },
      {
        kind: "command",
        label: "Voir les modifications non stagées",
        command: "git diff",
        why: "Montre précisément ce que `git add` va embarquer si vous stagez maintenant. À relire avant chaque commit : c'est votre relecture.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Lecture d'un diff",
        code: "diff --git a/app.py b/app.py\n--- a/app.py\n+++ b/app.py\n@@ -12,6 +12,7 @@ def calculer():\n     total = 0\n+    total += remise   # ligne ajoutée (préfixe +)\n-    total -= remise   # ligne supprimée (préfixe -)\n     return total",
      },
    ],
  },
  {
    id: "gitignore-bases",
    title: "Ignorer des fichiers : .gitignore",
    level: 2,
    intro: "Dire à Git ce qu'il ne doit jamais versionner.",
    blocks: [
      {
        kind: "text",
        text: "Certains fichiers n'ont rien à faire dans l'historique : dépendances installées (`node_modules/`), fichiers de build (`dist/`), caches (`.cache/`), fichiers d'environnement (`.env` avec vos secrets), fichiers d'éditeur (`.vscode/`). Le fichier `.gitignore`, placé à la racine du dépôt et lui-même versionné, liste les motifs à ignorer.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Exemple de .gitignore",
        code: "# Dépendances\nnode_modules/\n__pycache__/\n\n# Build\n/dist/\n/build/\n\n# Secrets et environnement local\n.env\n.env.local\n\n# Système et éditeurs\n.DS_Store\nThumbs.db",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Pourquoi ça existe",
            value:
              "Sans `.gitignore`, un `git add .` embarquerait des milliers de fichiers générés, des secrets, et des fichiers propres à votre machine — polluant l'historique et exposant des données sensibles.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès la création du dépôt, avant le premier commit. Ajoutez les motifs au fur et à mesure que de nouveaux fichiers générés apparaissent.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Ajouter un fichier au `.gitignore` après l'avoir commité ne le retire pas de l'historique : Git continue de suivre les fichiers déjà suivis. Il faut d'abord le retirer du suivi (voir la section `reset` et `git rm --cached`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Versionnez toujours le `.gitignore` lui-même : toute l'équipe doit ignorer les mêmes fichiers. Commentez les motifs par catégorie.",
          },
        ],
      },
      {
        kind: "command",
        label: "Vérifier ce qui est ignoré",
        command: "git status --ignored",
        why: "Affiche aussi les fichiers ignorés. Utile pour vérifier qu'un motif de `.gitignore` fait bien son travail — ou pour comprendre pourquoi un fichier n'apparaît pas dans `git status`.",
      },
    ],
  },
  {
    id: "branches-bases",
    title: "Les branches : créer, changer, fusionner",
    level: 2,
    intro: "Travailler en parallèle sans casser la branche principale.",
    blocks: [
      {
        kind: "text",
        text: "Une branche est une ligne de développement indépendante. En pratique : la branche `main` reste toujours dans un état qui fonctionne, et chaque nouvelle fonctionnalité se développe sur sa propre branche, fusionnée ensuite dans `main`. Créer une branche coûte quasiment rien : c'est juste un pointeur vers un commit.",
      },
      {
        kind: "command",
        label: "Créer une branche et basculer dessus",
        command: "git switch -c ma-fonctionnalite",
        why: "Crée la branche `ma-fonctionnalite` à partir du commit courant et bascule dessus en une seule commande. Tout commit créé ensuite appartiendra à cette branche, pas à `main`.",
        verify: "`git status` affiche « On branch ma-fonctionnalite », et `git branch` la marque d'une étoile.",
      },
      {
        kind: "command",
        label: "Lister les branches",
        command: "git branch",
        why: "Affiche les branches locales ; la branche courante est marquée d'une étoile. Ajoutez `-a` pour voir aussi les branches distantes.",
      },
      {
        kind: "command",
        label: "Revenir sur la branche principale",
        command: "git switch main",
        why: "`git switch` change de branche (la commande historique `git checkout` fait aussi cela, mais `switch` est plus claire et dédiée). Vos fichiers retrouvent l'état de `main`.",
      },
      {
        kind: "command",
        label: "Fusionner une branche dans la branche courante",
        command: "git merge ma-fonctionnalite",
        why: "À lancer depuis `main` : intègre les commits de `ma-fonctionnalite` dans `main` en créant un commit de fusion. Si les deux branches ont modifié les mêmes lignes, Git demande de résoudre un conflit (voir la section dédiée).",
        verify: "`git log --oneline --graph` montre la fusion des deux lignes.",
      },
      {
        kind: "command",
        label: "Supprimer une branche fusionnée",
        command: "git branch -d ma-fonctionnalite",
        why: "Nettoie les branches devenues inutiles après fusion. L'option `-d` refuse de supprimer une branche non fusionnée (sécurité) ; `-D` force la suppression.",
      },
      {
        kind: "text",
        text: "Bonne pratique : nommez vos branches de façon explicite (`ajout-authentification`, `correction-bug-panier`, `docs-installation`) et supprimez-les après fusion. Une liste de branches courte est une liste lisible.",
      },
    ],
  },
  {
    id: "github-compte-ssh",
    title: "GitHub : compte et clé SSH",
    level: 2,
    intro: "Relier votre machine à votre compte GitHub sans mot de passe à chaque fois.",
    blocks: [
      {
        kind: "text",
        text: "Pour envoyer (`push`) votre travail sur GitHub, il faut vous authentifier. La méthode recommandée est la clé SSH : une paire de clés (publique/privée) générée sur votre machine. La clé publique est déposée sur GitHub, la clé privée ne quitte jamais votre machine. Ensuite, plus aucun mot de passe n'est demandé.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un compte GitHub",
            detail:
              "Sur github.com, créez un compte (gratuit). Choisissez un nom d'utilisateur sobre : il apparaîtra dans les URLs de vos projets.",
          },
          {
            title: "Générer une paire de clés SSH",
            detail:
              "Sur votre machine, lancez `ssh-keygen -t ed25519 -C \"votre@email.com\"`. Acceptez le chemin par défaut. Choisissez une phrase de passe (recommandé) ou laissez vide.",
          },
          {
            title: "Copier la clé publique",
            detail:
              "Affichez `~/.ssh/id_ed25519.pub` et copiez tout son contenu (il commence par `ssh-ed25519`). Jamais la clé privée (`id_ed25519` sans `.pub`).",
          },
          {
            title: "L'ajouter sur GitHub",
            detail:
              "GitHub → Settings → SSH and GPG keys → New SSH key. Collez la clé publique, donnez-lui un nom (ex. « Laptop HP »).",
          },
          {
            title: "Tester la connexion",
            detail:
              "Lancez `ssh -T git@github.com`. Le premier message de bienvenue confirme que l'authentification fonctionne.",
          },
        ],
      },
      {
        kind: "command",
        label: "Générer une clé SSH moderne",
        command: 'ssh-keygen -t ed25519 -C "votre@email.com"',
        why: "`ed25519` est l'algorithme recommandé aujourd'hui : clés courtes, génération rapide, largement supporté. L'option `-C` ajoute un commentaire (votre e-mail) pour identifier la clé.",
        verify: "Deux fichiers apparaissent dans `~/.ssh/` : `id_ed25519` (privée) et `id_ed25519.pub` (publique).",
      },
      {
        kind: "command",
        label: "Tester la connexion SSH à GitHub",
        command: "ssh -T git@github.com",
        why: "Tente une connexion authentifiée sans ouvrir de session. GitHub répond par un message de bienvenue avec votre nom d'utilisateur si la clé est reconnue.",
        verify: "Vous devez voir « Hi <votre-pseudo>! You've successfully authenticated ».",
      },
      {
        kind: "text",
        text: "Alternative : l'authentification HTTPS avec un token d'accès personnel. Elle fonctionne aussi, mais demande de gérer le token comme un mot de passe. La clé SSH reste le réglage le plus confortable au quotidien.",
      },
    ],
  },
  {
    id: "push-pull-clone",
    title: "Collaborer : clone, push, pull, fetch",
    level: 2,
    intro: "Échanger du travail entre votre machine et le dépôt distant.",
    blocks: [
      {
        kind: "command",
        label: "Récupérer un dépôt existant",
        command: "git clone git@github.com:utilisateur/projet.git",
        why: "Télécharge le dépôt complet (tout l'historique) et crée un dossier `projet` configuré pour dialoguer avec ce distant, nommé `origin` par convention. C'est le point de départ pour contribuer à un projet existant.",
        verify: "`cd projet` puis `git log --oneline` : tout l'historique est là.",
      },
      {
        kind: "command",
        label: "Envoyer vos commits sur le distant",
        command: "git push -u origin ma-branche",
        why: "Envoie la branche locale vers le dépôt distant `origin`. L'option `-u` (upstream) lie la branche locale à sa contrepartie distante : les `git push` suivants se feront sans argument.",
      },
      {
        kind: "command",
        label: "Récupérer et fusionner le travail des autres",
        command: "git pull",
        why: "Fait deux choses : `fetch` (télécharge les nouveaux commits du distant) puis `merge` (les fusionne dans votre branche courante). À lancer avant de commencer à travailler et avant de pousser.",
      },
      {
        kind: "command",
        label: "Télécharger sans fusionner",
        command: "git fetch",
        why: "Met à jour votre copie des branches distantes (`origin/main`…) sans toucher à votre travail en cours. C'est la façon sûre de voir ce qui a changé ailleurs avant de décider de fusionner.",
        verify: "`git status` peut alors indiquer « your branch is behind origin/main by 3 commits ».",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Pourquoi ces quatre commandes",
            value:
              "`clone` pour commencer, `push` pour publier, `pull` pour se synchroniser, `fetch` pour observer sans risque. Tout le travail d'équipe tient dans ce carré.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Pousser sans avoir tiré d'abord : Git refuse (`rejected`) si le distant contient des commits que vous n'avez pas. La solution n'est jamais de forcer, mais de faire `git pull` puis de résoudre l'éventuel conflit.",
          },
          {
            label: "Bonne pratique",
            value:
              "Tirez (`pull`) au début de chaque session de travail. Poussez (`push`) à la fin de chaque fonctionnalité, pas une fois par semaine.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien, de bout en bout",
    level: 2,
    intro: "La boucle complète, telle qu'on la pratique chaque jour.",
    blocks: [
      {
        kind: "diagram",
        title: "Une journée type avec Git",
        lines: [
          "1. git pull                      ← se synchroniser",
          "2. git switch -c ma-fonction     ← créer une branche",
          "3. (modifier des fichiers)",
          "4. git status                    ← vérifier",
          "5. git diff                      ← relire",
          "6. git add <fichiers>            ← stager avec précision",
          "7. git commit -m \"message\"        ← commiter, petit et souvent",
          "8. (répéter 3 → 7)",
          "9. git push -u origin ma-fonction← publier la branche",
          "10. Pull request → revue → merge ← collaborer",
          "11. git switch main && git pull  ← revenir, se synchroniser",
          "12. git branch -d ma-fonction    ← nettoyer",
        ],
      },
      {
        kind: "text",
        text: "Retenez le rythme : petites boucles, commits fréquents, branches courtes. Un commit = une idée. Une branche = une fonctionnalité. Une pull request = une discussion. Ce rythme rend l'historique lisible et les retours en arrière indolores.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "anatomie-commit",
    title: "Anatomie d'un commit",
    level: 3,
    intro: "Ce que contient réellement un commit, au-delà du message.",
    blocks: [
      {
        kind: "text",
        text: "Un commit n'est pas une « différence » : c'est un instantané complet de l'état du projet à un instant T, accompagné de métadonnées. Git stocke chaque version de chaque fichier ; les différences ne sont calculées qu'à l'affichage, pour économiser de la place grâce à la compression et à la déduplication.",
      },
      {
        kind: "fields",
        title: "Les cinq pièces d'un commit",
        fields: [
          {
            label: "Le hash (SHA-1)",
            value:
              "Un identifiant unique de 40 caractères hexadécimaux (affiché en court : `a3f9c1d`). Il est calculé à partir du contenu : deux commits identiques ont le même hash, et la moindre modification change le hash.",
          },
          {
            label: "L'arbre (tree)",
            value:
              "La photographie : la liste de tous les fichiers et dossiers avec leur contenu exact à cet instant.",
          },
          {
            label: "Le(s) parent(s)",
            value:
              "Le hash du commit précédent (deux parents pour un commit de fusion). C'est ce chaînage qui forme le graphe de l'historique.",
          },
          {
            label: "L'auteur et le commiteur",
            value:
              "Qui a écrit le changement et qui l'a enregistré (souvent la même personne ; différents lors d'un rebase ou d'un patch appliqué par quelqu'un d'autre).",
          },
          {
            label: "Le message",
            value:
              "L'explication humaine du « pourquoi ». C'est la seule partie du commit destinée aux humains — d'où son importance.",
          },
        ],
      },
      {
        kind: "command",
        label: "Inspecter un commit en détail",
        command: "git show a3f9c1d",
        why: "Affiche les métadonnées du commit (auteur, date, message) puis la différence exacte qu'il introduit. Remplacez `a3f9c1d` par n'importe quel hash.",
      },
    ],
  },
  {
    id: "objets-git",
    title: "Les quatre objets de Git",
    level: 3,
    intro: "Le modèle de données interne : étonnamment simple.",
    blocks: [
      {
        kind: "text",
        text: "Tout l'historique Git tient dans quatre types d'objets, stockés comme fichiers dans `.git/objects/` et identifiés par leur hash. Comprendre ce modèle, c'est comprendre pourquoi les branches sont gratuites et pourquoi l'historique est infalsifiable en pratique.",
      },
      {
        kind: "fields",
        title: "Les quatre objets",
        fields: [
          {
            label: "blob",
            value:
              "Le contenu d'un fichier, sans son nom. Deux fichiers identiques partagent le même blob (déduplication automatique).",
          },
          {
            label: "tree",
            value:
              "Un dossier : la liste des blobs et sous-trees qu'il contient, avec leurs noms et permissions. Un commit pointe vers un tree racine.",
          },
          {
            label: "commit",
            value:
              "Le tree racine + les parents + l'auteur + le message. C'est l'unité d'historique.",
          },
          {
            label: "tag",
            value:
              "Une étiquette nommée et annotée posée sur un commit (ex. `v1.2.0`), avec son propre message et éventuellement une signature.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "Comment les objets s'emboîtent",
        lines: [
          "tag v1.2.0",
          "   │ pointe vers",
          "   ▼",
          "commit a3f9c1d ──parent──▶ commit 7b2e4aa ──parent──▶ …",
          "   │",
          "   │ tree",
          "   ▼",
          "tree racine ──┬──▶ blob « README.md » (contenu)",
          "             ├──▶ tree « src/ » ──▶ blob « app.py »",
          "             └──▶ blob « .gitignore »",
        ],
      },
      {
        kind: "text",
        text: "Conséquence pratique : une branche n'est qu'un petit fichier texte contenant un hash (dans `.git/refs/heads/`). La créer ne copie rien — d'où sa gratuité. Et comme chaque hash dépend du contenu, modifier l'historique change tous les hashs suivants : c'est détectable immédiatement.",
      },
    ],
  },
  {
    id: "trois-zones-detail",
    title: "Les trois zones, en détail",
    level: 3,
    intro: "Maîtriser le staging, c'est maîtriser la précision des commits.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de vie d'un fichier",
        lines: [
          "non suivi ──git add──▶ stagé ──git commit──▶ suivi (inchangé)",
          "                              │",
          "                         (modification)",
          "                              │",
          "                              ▼",
          "                    suivi modifié ──git add──▶ stagé ──git commit──▶ …",
          "                              │",
          "                    git restore └─────▶ annule la modification (dangereux)",
        ],
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Pourquoi une zone de staging",
            value:
              "Pour composer des commits précis : vous pouvez modifier dix fichiers mais ne commiter que trois, ou même ne commiter que certaines lignes d'un fichier (`git add -p`). L'historique raconte alors une histoire propre, pas un vrac.",
          },
          {
            label: "Quand s'en servir",
            value:
              "Toujours : `git add` n'est pas une formalité, c'est le moment où vous décidez du contenu du prochain commit. Relisez `git diff --staged` avant de commiter.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Confondre répertoire de travail et staging : `git diff` ne montre que le non-stagé, `git diff --staged` que le stagé. Si « le diff est vide » alors que vous avez modifié des fichiers, regardez du bon côté.",
          },
          {
            label: "Bonne pratique",
            value:
              "Stagez par intention, pas par réflexe : un `git add .` systématique annule le bénéfice du staging. Les commits atomiques naissent ici.",
          },
        ],
      },
      {
        kind: "command",
        label: "Stager interactivement, morceau par morceau",
        command: "git add -p",
        why: "Découpe vos modifications en « hunks » et vous demande pour chacun : stager (`y`), ignorer (`n`), ou découper plus fin (`s`). Idéal quand un fichier contient deux changements sans rapport.",
      },
      {
        kind: "command",
        label: "Retirer un fichier du staging sans perdre ses modifications",
        command: "git restore --staged <fichier>",
        why: "Annule le `git add` : le fichier repasse en « modifié non stagé », son contenu est intact. (La commande historique `git reset HEAD <fichier>` fait la même chose.)",
      },
    ],
  },
  {
    id: "commits-atomiques",
    title: "Commits atomiques et messages conventionnels",
    level: 3,
    intro: "L'art du commit qui se relit six mois plus tard.",
    blocks: [
      {
        kind: "text",
        text: "Un commit atomique fait une seule chose : une correction de bug, une fonctionnalité, un refactoring — jamais les trois mélangés. C'est ce qui permet de relire l'historique, de revert un changement sans dommage collatéral, et de faire du `bisect` (voir plus loin).",
      },
      {
        kind: "fields",
        title: "Écrire un bon message",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le message explique le pourquoi, pas le quoi : le diff montre déjà le quoi. « Corrige le calcul de la remise qui ignorait les coupons » plutôt que « modif app.py ».",
          },
          {
            label: "La convention Conventional Commits",
            value:
              "Un format largement adopté : `type(portée): description`. Types courants : `feat` (fonctionnalité), `fix` (correction), `docs`, `refactor`, `test`, `chore`. Exemple : `feat(panier): ajoute la remise fidélité`.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Des messages structurés permettent de générer des changelogs automatiquement, de filtrer l'historique par type, et donnent à toute l'équipe le même vocabulaire.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès qu'on travaille à plusieurs ou qu'on publie des versions. En solo, c'est un excellent entraînement à la clarté.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le commit fourre-tout : « divers », « wip », « fix » sans contexte. Six mois plus tard, personne — pas même vous — ne saura ce qu'il contient.",
          },
        ],
      },
      {
        kind: "code",
        language: "bash",
        title: "Mauvais vs bon message",
        code: "Mauvais :\n  git commit -m \"modifs\"\n  git commit -m \"fix bug\"\n  git commit -m \"WIP\"\n\nBons :\n  git commit -m \"feat(auth): ajoute la connexion via e-mail\"\n  git commit -m \"fix(panier): corrige le total quand un article est retiré\"\n  git commit -m \"docs: explique l'installation dans le README\"",
      },
      {
        kind: "command",
        label: "Amender le dernier commit (message ou contenu)",
        command: "git commit --amend",
        why: "Remplace le dernier commit par une version corrigée (nouveau message, ou nouveau contenu après un `git add`). Utile pour une coquille, à condition de ne pas avoir déjà poussé ce commit.",
      },
    ],
  },
  {
    id: "log-avance",
    title: "Lire l'historique comme un pro : git log",
    level: 3,
    intro: "Aller au-delà de `--oneline`.",
    blocks: [
      {
        kind: "command",
        label: "Historique graphique des branches",
        command: "git log --oneline --graph --all -15",
        why: "Dessine le graphe des commits avec les branches (`--all` inclut toutes les branches, pas seulement la courante). La vue la plus parlante pour comprendre « qui a fusionné quoi ».",
      },
      {
        kind: "command",
        label: "Chercher un commit par message",
        command: 'git log --oneline --grep="panier"',
        why: "Filtre l'historique sur le message. D'où l'importance des bons messages : un historique bien écrit est un historique cherchable.",
      },
      {
        kind: "command",
        label: "Voir qui a modifié un fichier et quand",
        command: "git log --oneline -- src/app.py",
        why: "Limite l'historique aux commits ayant touché ce chemin. Le `--` sépare les options des chemins pour éviter toute ambiguïté.",
      },
      {
        kind: "command",
        label: "Historique depuis une date ou un auteur",
        command: 'git log --since="2 weeks ago" --author="Marie"',
        why: "Filtre par période et par auteur. Pratique pour préparer une revue d'activité ou retrouver le travail de quelqu'un.",
      },
      {
        kind: "text",
        text: "Astuce durable : créez un alias `git config --global alias.lg \"log --oneline --graph --all -15\"` puis utilisez `git lg`. Les alias Git (section dédiée plus bas) transforment les longues commandes en réflexes.",
      },
    ],
  },
  {
    id: "diff-avance",
    title: "Comparer précisément : git diff",
    level: 3,
    intro: "Les quatre comparaisons à connaître.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre diff utiles",
        fields: [
          {
            label: "git diff",
            value: "Répertoire de travail vs staging : ce qui n'est pas encore stagé.",
          },
          {
            label: "git diff --staged",
            value: "Staging vs dernier commit : ce que le prochain commit contiendra.",
          },
          {
            label: "git diff main..ma-branche",
            value: "Deux branches entre elles : tout ce que la branche apporte par rapport à `main`. Idéal avant une pull request.",
          },
          {
            label: "git diff a3f9c1d 7b2e4aa",
            value: "Deux commits quelconques : la différence exacte entre deux instantanés.",
          },
        ],
      },
      {
        kind: "command",
        label: "Voir ce qu'une branche apporte par rapport à main",
        command: "git diff main..ma-branche --stat",
        why: "L'option `--stat` résume par fichier (lignes ajoutées/supprimées) au lieu d'afficher tout le diff. Parfait pour estimer la taille d'une fonctionnalité avant revue.",
      },
    ],
  },
  {
    id: "branches-avance",
    title: "Branches : HEAD et HEAD détachée",
    level: 3,
    intro: "Comprendre ce que « être sur une branche » signifie vraiment.",
    blocks: [
      {
        kind: "text",
        text: "`HEAD` est un pointeur vers « où vous êtes » : normalement, il pointe vers la branche courante, qui elle-même pointe vers un commit. Quand vous commitez, Git avance la branche, et `HEAD` suit. Simple et robuste.",
      },
      {
        kind: "diagram",
        title: "HEAD, branche, commit",
        lines: [
          "HEAD ──▶ main ──▶ commit D",
          "                  │",
          "               parent",
          "                  │",
          "                  ▼",
          "               commit C",
          "",
          "git commit  →  crée E, main ──▶ E, HEAD suit.",
        ],
      },
      {
        kind: "fields",
        title: "La HEAD détachée",
        fields: [
          {
            label: "En une phrase",
            value:
              "Si vous faites `git switch` vers un commit directement (pas une branche), `HEAD` pointe vers le commit lui-même : on dit qu'elle est « détachée ».",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Pour inspecter ou tester un état passé du projet sans créer de branche. Git vous prévient explicitement quand cela arrive.",
          },
          {
            label: "Le piège",
            value:
              "Les commits créés en HEAD détachée n'appartiennent à aucune branche : si vous changez de branche ensuite, ils deviennent difficiles à retrouver (le `reflog` peut les sauver — voir la section dédiée).",
          },
          {
            label: "Bonne pratique",
            value:
              "En HEAD détachée : regardez, testez, mais ne commitez pas. Si vous voulez travailler à partir de là, créez une branche avec `git switch -c ma-branche`.",
          },
        ],
      },
    ],
  },
  {
    id: "merge-detail",
    title: "Fusionner : git merge en détail",
    level: 3,
    intro: "Ce qui se passe vraiment lors d'une fusion.",
    blocks: [
      {
        kind: "text",
        text: "Un `merge` crée un commit à deux parents qui réunit deux lignes d'historique. Si la branche courante n'a pas divergé (aucun commit depuis la création de l'autre branche), Git fait un « fast-forward » : il avance simplement le pointeur, sans commit de fusion.",
      },
      {
        kind: "diagram",
        title: "Fast-forward vs vrai merge",
        lines: [
          "Fast-forward (pas de divergence) :",
          "  main : A ── B            autre : A ── B ── C",
          "  après merge : main ──▶ C (simple avance, pas de commit)",
          "",
          "Vrai merge (divergence) :",
          "  main : A ── B ── D",
          "                 \\",
          "                  C ── (branche)",
          "  après merge : A ── B ── D ── M",
          "                           \\       ╱",
          "                            C ─────╱   (M a deux parents)",
        ],
      },
      {
        kind: "command",
        label: "Forcer un commit de fusion même si le fast-forward est possible",
        command: "git merge --no-ff ma-branche",
        why: "Crée toujours un commit de fusion, ce qui conserve la trace visible de la branche dans l'historique. Certaines équipes l'imposent pour garder l'historique des fonctionnalités lisible.",
      },
      {
        kind: "command",
        label: "Annuler un merge en cours (avant de le valider)",
        command: "git merge --abort",
        why: "Si la fusion part en cacahuète (conflits partout), cette commande restaure l'état d'avant le merge. Filet de sécurité à connaître avant de fusionner.",
      },
    ],
  },
  {
    id: "rebase-vs-merge",
    title: "Rebase vs merge : comparaison factuelle",
    level: 3,
    intro: "Deux stratégies d'intégration, deux philosophies d'historique.",
    blocks: [
      {
        kind: "text",
        text: "Le `rebase` rejoue vos commits un par un au-dessus d'une autre branche, comme si vous aviez travaillé à partir de son état le plus récent. Le résultat est un historique linéaire, sans commit de fusion — mais les hashs des commits rejoués changent, car leur parent change.",
      },
      {
        kind: "table",
        headers: ["Critère", "merge", "rebase"],
        rows: [
          [
            "Historique produit",
            "Fidèle : montre quand le travail a vraiment eu lieu, avec commits de fusion",
            "Linéaire : comme si tout avait été fait à la suite, sans commits de fusion",
          ],
          [
            "Hashs des commits",
            "Inchangés",
            "Modifiés (les commits sont réécrits)",
          ],
          [
            "Conflits",
            "Résolus une fois, dans le commit de fusion",
            "Résolus commit par commit (potentiellement plusieurs fois)",
          ],
          [
            "Branches partagées",
            "Sûr : n'écrase jamais l'historique des autres",
            "Dangereux : réécrire une branche déjà poussée perturbe les collaborateurs",
          ],
          [
            "Usage typique",
            "Intégrer une fonctionnalité terminée dans `main`",
            "Mettre à jour sa branche locale avec les derniers changements de `main` avant de la proposer",
          ],
        ],
      },
      {
        kind: "fields",
        title: "La règle d'or",
        fields: [
          {
            label: "En une phrase",
            value:
              "Ne rebasez jamais une branche que d'autres personnes utilisent déjà (typiquement une branche poussée et partagée) : vous réécririez un historique sur lequel ils ont basé leur travail.",
          },
          {
            label: "En pratique",
            value:
              "`rebase` pour nettoyer et mettre à jour votre branche locale avant de la partager ; `merge` pour intégrer du travail partagé. Beaucoup d'équipes combinent les deux : rebase local, merge via pull request.",
          },
          {
            label: "Aucun camp à choisir",
            value:
              "Ce n'est pas une question de supériorité : c'est un choix d'équipe, documenté dans ses conventions. L'important est que toute l'équipe applique la même stratégie.",
          },
        ],
      },
      {
        kind: "command",
        label: "Rejouer ma branche sur les derniers changements de main",
        command: "git rebase main",
        why: "À lancer depuis votre branche : rejoue vos commits au-dessus de `main` à jour. Votre branche devient linéaire par rapport à `main`, ce qui simplifie la future fusion.",
      },
    ],
  },
  {
    id: "rebase-interactif",
    title: "Rebase interactif : nettoyer son historique local",
    level: 3,
    intro: "Réécrire ses propres commits avant de les partager.",
    blocks: [
      {
        kind: "text",
        text: "Le rebase interactif ouvre un éditeur listant vos derniers commits, chacun préfixé d'une action : `pick` (garder), `reword` (changer le message), `squash` (fusionner avec le précédent), `edit` (s'arrêter pour modifier), `drop` (supprimer). C'est l'outil pour transformer une série de commits « wip » en un historique propre.",
      },
      {
        kind: "command",
        label: "Réécrire les 3 derniers commits",
        command: "git rebase -i HEAD~3",
        why: "`HEAD~3` désigne le 3e ancêtre du commit courant. L'éditeur s'ouvre : changez `pick` en `squash` pour fusionner des commits, en `reword` pour corriger un message, puis sauvegardez.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Quand l'utiliser",
            value:
              "Avant de pousser une branche : fusionner 8 commits « wip » en 2 commits atomiques avec de bons messages. Jamais sur des commits déjà poussés et partagés.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Rebaser des commits déjà poussés, puis forcer le push (`--force`) : les collaborateurs qui avaient basé leur travail sur l'ancien historique se retrouvent avec des conflits fantômes.",
          },
          {
            label: "Bonne pratique",
            value:
              "Si vous devez pousser après un rebase local, préférez `git push --force-with-lease` à `--force` : il refuse d'écraser si quelqu'un a poussé entre-temps.",
          },
        ],
      },
    ],
  },
  {
    id: "conflits",
    title: "Résoudre les conflits de fusion",
    level: 3,
    intro: "Le moment que tout le monde redoute — et qui n'est pas grave.",
    blocks: [
      {
        kind: "text",
        text: "Un conflit survient quand deux branches modifient les mêmes lignes d'un même fichier : Git ne peut pas deviner quelle version garder, il vous demande. Ce n'est pas une erreur, c'est une question. Les fichiers en conflit contiennent des marqueurs que vous devez résoudre à la main.",
      },
      {
        kind: "code",
        language: "bash",
        title: "À quoi ressemble un conflit",
        code: "<<<<<<< HEAD\ntotal = prix * quantite\n=======\ntotal = prix * quantite * (1 - remise)\n>>>>>>> ma-branche",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier les fichiers en conflit",
            detail:
              "Lancez `git status` : les fichiers en conflit sont listés comme « unmerged ». Ouvrez-les un par un.",
          },
          {
            title: "Choisir le bon contenu",
            detail:
              "Entre `<<<<<<<` et `=======` : votre version (HEAD). Entre `=======` et `>>>>>>>` : la version de l'autre branche. Éditez le fichier pour obtenir le résultat correct — ce peut être l'une des deux, ou un mélange.",
          },
          {
            title: "Supprimer les marqueurs",
            detail:
              "Retirez toutes les lignes `<<<<<<<`, `=======`, `>>>>>>>`. Le fichier doit être valide et cohérent.",
          },
          {
            title: "Tester",
            detail:
              "Lancez vos tests ou vérifiez que le programme fonctionne : un conflit résolu « au hasard » est un bug en attente.",
          },
          {
            title: "Marquer comme résolu et commiter",
            detail:
              "`git add` sur chaque fichier résolu, puis `git commit` (ou `git rebase --continue` si vous êtes en plein rebase).",
          },
        ],
      },
      {
        kind: "fields",
        title: "Prévenir plutôt que guérir",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Tirez souvent (`git pull` / `git fetch` + rebase local), travaillez sur des branches courtes, et communiquez sur qui touche à quels fichiers. La plupart des conflits naissent de branches qui divergent trop longtemps.",
          },
          {
            label: "Outils d'aide",
            value:
              "Les éditeurs modernes (VS Code notamment) affichent les conflits avec des boutons « Accepter actuel / entrant / les deux ». Le réglage `git config --global merge.conflictStyle zdiff3` affiche aussi la version d'origine, ce qui aide à comprendre.",
          },
        ],
      },
    ],
  },
  {
    id: "stash",
    title: "Mettre de côté : git stash",
    level: 3,
    intro: "Ranger un travail en cours sans commiter.",
    blocks: [
      {
        kind: "text",
        text: "Vous êtes en plein milieu d'une modification, mais vous devez changer de branche d'urgence : commiter un travail à moitié fini polluerait l'historique. `git stash` remisée vos modifications dans une pile temporaire et restaure un répertoire propre ; vous les récupérez ensuite.",
      },
      {
        kind: "command",
        label: "Remiser les modifications en cours",
        command: 'git stash push -m "description du travail en cours"',
        why: "Sauvegarde les modifications non commitées dans la pile du stash et nettoie le répertoire de travail. Le message (`-m`) permet de retrouver ce que contient chaque entrée.",
      },
      {
        kind: "command",
        label: "Lister le contenu du stash",
        command: "git stash list",
        why: "Affiche la pile (`stash@{0}`, `stash@{1}`…). Le stash est une pile : on peut y empiler plusieurs remises.",
      },
      {
        kind: "command",
        label: "Récupérer la dernière remise",
        command: "git stash pop",
        why: "Réapplique la remise la plus récente et la retire de la pile. Si des conflits surviennent à l'application, la remise est conservée (sécurité).",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Quand l'utiliser",
            value:
              "Interruption urgente, besoin de tester quelque chose sur une base propre, ou de changer de branche sans commiter un brouillon.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier des remises dans le stash pendant des semaines : elles deviennent incompréhensibles. Le stash est un tiroir temporaire, pas un archivage.",
          },
          {
            label: "Alternative",
            value:
              "Pour un travail que vous voulez vraiment conserver, un commit « WIP » sur une branche dédiée est souvent plus explicite qu'un stash anonyme.",
          },
        ],
      },
    ],
  },
  {
    id: "reset",
    title: "Annuler : git reset et ses trois modes",
    level: 3,
    intro: "Revenir en arrière — en comprenant ce que chaque mode efface.",
    blocks: [
      {
        kind: "text",
        text: "`git reset` déplace la branche courante vers un autre commit. Le danger vient de ce qu'il fait des trois zones : selon le mode, il conserve ou détruit votre travail. D'où la nécessité de bien distinguer les trois modes.",
      },
      {
        kind: "table",
        headers: ["Mode", "Déplace la branche", "Staging", "Répertoire de travail"],
        rows: [
          [
            "--soft",
            "Oui",
            "Inchangé (vos modifications restent stagées)",
            "Inchangé",
          ],
          [
            "--mixed (défaut)",
            "Oui",
            "Réinitialisé (modifications conservées mais déstagées)",
            "Inchangé",
          ],
          [
            "--hard",
            "Oui",
            "Réinitialisé",
            "Écrasé : les modifications sont perdues",
          ],
        ],
      },
      {
        kind: "command",
        label: "Annuler le dernier commit en gardant les modifications",
        command: "git reset --soft HEAD~1",
        why: "`HEAD~1` = le commit parent. Le commit disparaît de la branche mais son contenu reste stagé : idéal pour refaire un commit (changer le message, ajouter un fichier oublié).",
      },
      {
        kind: "command",
        label: "Annuler le dernier commit en déstageant tout",
        command: "git reset HEAD~1",
        why: "Mode `--mixed` par défaut : le commit disparaît, les modifications restent dans vos fichiers mais ne sont plus stagées. Vous pouvez les re-trier avec `git add -p`.",
      },
      {
        kind: "fields",
        title: "L'avertissement --hard",
        fields: [
          {
            label: "Ce que fait --hard",
            value:
              "`git reset --hard <commit>` écrase le répertoire de travail : les modifications non commitées sont définitivement perdues. Aucune corbeille.",
          },
          {
            label: "Quand c'est utile",
            value:
              "Abandonner volontairement un travail en cours pour revenir à un état sain connu. À n'utiliser qu'en connaissance de cause, jamais « pour voir ».",
          },
          {
            label: "Règle d'or",
            value:
              "N'utilisez `reset` (surtout `--hard`) que sur des commits non poussés. Pour annuler un commit déjà partagé, utilisez `revert` (section suivante).",
          },
        ],
      },
    ],
  },
  {
    id: "revert",
    title: "Annuler proprement : git revert",
    level: 3,
    intro: "L'anti-commit : annuler sans réécrire l'historique.",
    blocks: [
      {
        kind: "text",
        text: "`git revert <commit>` crée un nouveau commit qui annule exactement les changements du commit visé. L'historique reste intact et linéaire : on voit le commit d'origine, puis son annulation. C'est la méthode sûre pour corriger un commit déjà poussé et partagé.",
      },
      {
        kind: "table",
        headers: ["Critère", "git reset", "git revert"],
        rows: [
          ["Modifie l'historique", "Oui (déplace la branche)", "Non (ajoute un commit)"],
          ["Commits déjà poussés", "Dangereux / interdit en équipe", "La méthode recommandée"],
          ["Commits locaux non poussés", "Parfait (nettoie l'historique)", "Possible mais inutilement verbeux"],
          ["Perte de données", "Possible avec --hard", "Non : tout reste dans l'historique"],
        ],
      },
      {
        kind: "command",
        label: "Annuler un commit déjà partagé",
        command: "git revert a3f9c1d",
        why: "Crée un commit qui inverse les changements de `a3f9c1d`. Poussable sans `--force`, sans perturber les collaborateurs : l'historique raconte « on a fait X, puis on l'a annulé ».",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Pourquoi ça existe",
            value:
              "Parce qu'en équipe, l'historique partagé est un contrat : on ne le réécrit pas, on le complète. `revert` est l'outil de l'honnêteté historique.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Faire un `reset --hard` puis un `push --force` sur `main` pour « effacer » une erreur : les collaborateurs qui avaient déjà tiré l'ancien historique se retrouvent désynchronisés.",
          },
        ],
      },
    ],
  },
  {
    id: "cherry-pick",
    title: "Cherry-pick : reprendre un commit ailleurs",
    level: 3,
    intro: "Copier un commit précis sur une autre branche.",
    blocks: [
      {
        kind: "text",
        text: "`git cherry-pick <commit>` applique les changements d'un commit existant sur la branche courante, en créant un nouveau commit (avec un nouveau hash). Utile pour rapatrier une correction urgente faite sur une branche vers une autre, sans fusionner toute la branche.",
      },
      {
        kind: "command",
        label: "Appliquer un commit précis sur la branche courante",
        command: "git cherry-pick a3f9c1d",
        why: "Recrée le changement de `a3f9c1d` ici. Si le même fichier a divergé, un conflit peut survenir — à résoudre comme un conflit de merge classique.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Quand l'utiliser",
            value:
              "Une correction faite sur `main` doit aussi exister sur la branche de maintenance `v1.x` : cherry-pick plutôt que merge complet.",
          },
          {
            label: "Le revers",
            value:
              "Le commit est dupliqué (deux hashs différents, même contenu) : l'historique contient deux fois le changement. À utiliser avec parcimonie, pas comme stratégie de synchronisation.",
          },
        ],
      },
    ],
  },
  {
    id: "tags",
    title: "Les tags : marquer les versions",
    level: 3,
    intro: "Des étiquettes stables pour les releases.",
    blocks: [
      {
        kind: "text",
        text: "Un tag est une étiquette immuable posée sur un commit, typiquement pour marquer une version (`v1.0.0`, `v2.3.1`). Contrairement aux branches, un tag ne bouge jamais : il désigne pour toujours le même commit. C'est la référence que les utilisateurs et les outils de déploiement utilisent.",
      },
      {
        kind: "command",
        label: "Créer un tag annoté",
        command: 'git tag -a v1.0.0 -m "Première version stable"',
        why: "L'option `-a` crée un tag annoté (avec message, date et auteur) plutôt qu'un simple pointeur. Les tags annotés sont la norme pour les releases.",
      },
      {
        kind: "command",
        label: "Pousser les tags sur le distant",
        command: "git push origin --tags",
        why: "`git push` seul n'envoie pas les tags : il faut le demander explicitement. Sans cela, vos versions restent locales.",
        verify: "Sur GitHub, l'onglet « Releases » ou « Tags » du dépôt les affiche.",
      },
      {
        kind: "command",
        label: "Lister les tags",
        command: "git tag --list \"v1.*\"",
        why: "Affiche les tags, filtrables par motif. Pratique pour retrouver la dernière version d'une série.",
      },
      {
        kind: "fields",
        title: "Versionnage sémantique (semver)",
        fields: [
          {
            label: "En une phrase",
            value:
              "La convention `MAJEUR.MINEUR.CORRECTIF` (ex. `2.4.1`) : on incrémente MAJEUR en cas de rupture de compatibilité, MINEUR pour une nouveauté compatible, CORRECTIF pour un bug.",
          },
          {
            label: "Pourquoi",
            value:
              "Un numéro de version lisible par les humains et les outils : les gestionnaires de paquets s'en servent pour résoudre les dépendances.",
          },
        ],
      },
    ],
  },
  {
    id: "remotes",
    title: "Les distants : origin, upstream et les autres",
    level: 3,
    intro: "Comprendre avec qui votre dépôt dialogue.",
    blocks: [
      {
        kind: "text",
        text: "Un « distant » (remote) est simplement un surnom pour l'URL d'un autre dépôt. `origin` est le nom donné automatiquement au dépôt d'où vous avez cloné. Vous pouvez en ajouter d'autres : c'est indispensable quand vous travaillez avec un fork (voir la section dédiée).",
      },
      {
        kind: "command",
        label: "Lister les distants et leurs URLs",
        command: "git remote -v",
        why: "Affiche chaque distant avec ses URLs de récupération (fetch) et d'envoi (push). Le premier diagnostic quand un `push` part au mauvais endroit.",
      },
      {
        kind: "command",
        label: "Ajouter un distant",
        command: "git remote add upstream git@github.com:original/projet.git",
        why: "Enregistre un second distant nommé `upstream` (convention pour le dépôt d'origine quand on travaille sur un fork). Vous pourrez ensuite tirer ses mises à jour avec `git fetch upstream`.",
      },
      {
        kind: "command",
        label: "Voir la branche suivie par défaut",
        command: "git branch -vv",
        why: "Affiche chaque branche locale avec sa branche distante suivie (`[origin/main]`) et son avance/retard. Clarifie la relation local/distant.",
      },
    ],
  },
  {
    id: "fetch-vs-pull-detail",
    title: "Fetch vs pull, et les branches distantes",
    level: 3,
    intro: "La distinction qui évite les mauvaises surprises.",
    blocks: [
      {
        kind: "text",
        text: "`git fetch` met à jour vos copies locales des branches distantes (`origin/main`, `origin/ma-branche`…) sans toucher à votre travail. Ces « remote-tracking branches » sont en lecture seule : des reflets du distant. `git pull`, lui, fait `fetch` + `merge` (ou `rebase` selon configuration) dans votre branche courante.",
      },
      {
        kind: "diagram",
        title: "Ce que voit votre dépôt après un fetch",
        lines: [
          "Distant (GitHub)          Votre dépôt local",
          "  main ──▶ D                origin/main ──▶ D   (reflet à jour)",
          "                            main ──▶ B          (vous êtes ici)",
          "",
          "git status : « your branch is behind origin/main by 2 commits »",
          "  → vous décidez : merge, rebase, ou attendre.",
        ],
      },
      {
        kind: "command",
        label: "Configurer pull pour rebaser au lieu de fusionner",
        command: "git config --global pull.rebase true",
        why: "Avec ce réglage, `git pull` rejoue vos commits locaux au-dessus des commits distants au lieu de créer un commit de fusion. Historique plus linéaire ; à coordonner avec les conventions de l'équipe.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Pourquoi deux commandes",
            value:
              "Parce qu'observer (`fetch`) et intégrer (`pull`) sont deux décisions différentes. Les développeurs expérimentés fetchent souvent et pullent quand ils sont prêts.",
          },
          {
            label: "Bonne pratique",
            value:
              "Avant un `push`, faites un `fetch` puis comparez : `git log main..origin/main` montre ce que les autres ont poussé pendant que vous travailliez.",
          },
        ],
      },
    ],
  },
  {
    id: "pull-requests",
    title: "Les pull requests : collaborer sur GitHub",
    level: 3,
    intro: "Le cœur du travail en équipe sur les forges.",
    blocks: [
      {
        kind: "text",
        text: "Une pull request (PR) est une proposition : « voici ma branche, avec ces commits ; je propose de la fusionner dans `main` ». Ce n'est pas une fonctionnalité de Git lui-même, mais des plateformes (GitHub, GitLab qui l'appelle « merge request »). C'est le lieu de la revue de code, des discussions et des vérifications automatiques.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Pousser la branche",
            detail:
              "`git push -u origin ma-fonctionnalite` : la branche devient visible sur GitHub.",
          },
          {
            title: "Ouvrir la pull request",
            detail:
              "Sur GitHub, bouton « Compare & pull request » : choisissez la branche de base (`main`) et la branche à fusionner. Rédigez un titre clair et une description : ce que ça fait, pourquoi, comment le tester.",
          },
          {
            title: "Revue de code",
            detail:
              "Les collègues commentent ligne par ligne, demandent des modifications. Vous poussez de nouveaux commits sur la même branche : la PR se met à jour automatiquement.",
          },
          {
            title: "Vérifications automatiques",
            detail:
              "La CI (tests, lint) s'exécute sur la PR. Une PR avec des tests rouges ne devrait pas être fusionnée.",
          },
          {
            title: "Fusion et nettoyage",
            detail:
              "Une fois approuvée, fusionnez (bouton Merge, ou en ligne de commande), supprimez la branche distante, puis nettoyez en local.",
          },
        ],
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Pourquoi ça existe",
            value:
              "Pour que rien n'arrive sur `main` sans relecture : la PR transforme l'intégration en discussion traçable plutôt qu'en action solitaire.",
          },
          {
            label: "Bonne pratique",
            value:
              "Petites PR, description soignée, tests qui passent. Une PR de 2000 lignes ne sera jamais bien relue : découpez.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Ouvrir une PR depuis `main` local au lieu d'une branche dédiée : tout commit ultérieur sur `main` pollue la PR.",
          },
        ],
      },
    ],
  },
  {
    id: "forks",
    title: "Les forks : contribuer à un projet qui n'est pas le vôtre",
    level: 3,
    intro: "Le workflow open source standard.",
    blocks: [
      {
        kind: "text",
        text: "Vous ne pouvez pas pousser directement sur le dépôt d'un projet open source : vous n'en avez pas les droits. Le fork est votre copie personnelle du dépôt sur la forge. Vous y travaillez librement, puis proposez vos changements au projet d'origine via une pull request inter-dépôts.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Forker sur la forge",
            detail:
              "Bouton « Fork » sur la page du projet : une copie apparaît sur votre compte.",
          },
          {
            title: "Cloner votre fork",
            detail:
              "`git clone` de VOTRE fork (pas l'original) : `origin` pointe vers votre copie.",
          },
          {
            title: "Ajouter l'original comme upstream",
            detail:
              "`git remote add upstream <url-du-projet-original>` : vous pourrez récupérer ses évolutions.",
          },
          {
            title: "Travailler sur une branche",
            detail:
              "Créez une branche, commitez, poussez vers votre fork (`origin`).",
          },
          {
            title: "Ouvrir la PR vers l'original",
            detail:
              "Depuis votre fork : pull request vers le dépôt d'origine, branche `main`. Les mainteneurs relisent et fusionnent (ou non).",
          },
          {
            title: "Rester synchronisé",
            detail:
              "`git fetch upstream` puis fusionnez `upstream/main` dans votre `main` local régulièrement : votre fork ne doit pas diverger.",
          },
        ],
      },
    ],
  },
  {
    id: "gitignore-avance",
    title: ".gitignore avancé : motifs et pièges",
    level: 3,
    intro: "La syntaxe des motifs d'exclusion, sans les pièges.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Syntaxe des motifs",
        code: "# Commentaire\n*.log            # tous les fichiers .log, partout\n/dist/           # le dossier dist à la racine uniquement\ndist/            # tout dossier nommé dist, à n'importe quel niveau\n!important.log   # négation : on ne l'ignore PAS (l'ordre compte)\n.env*            # .env, .env.local, .env.production…\n**/tmp/          # tout dossier tmp à n'importe quelle profondeur",
      },
      {
        kind: "fields",
        title: "Les trois pièges classiques",
        fields: [
          {
            label: "Fichier déjà suivi",
            value:
              "Le `.gitignore` n'affecte que les fichiers non suivis. Pour arrêter de suivre un fichier déjà commité : `git rm --cached <fichier>` (le retire de l'index mais le garde sur disque), puis commitez.",
          },
          {
            label: "La négation et l'ordre",
            value:
              "Les motifs sont évalués de haut en bas : une négation (`!`) ne peut pas ré-inclure un fichier si son dossier parent est exclu. On ne peut pas ré-inclure un fichier dans un dossier exclu.",
          },
          {
            label: "Le .gitignore global",
            value:
              "Pour les fichiers propres à votre machine (`.DS_Store`, dossiers d'éditeur), utilisez un gitignore global : `git config --global core.excludesFile ~/.gitignore_global`. Pas besoin de polluer chaque projet.",
          },
        ],
      },
      {
        kind: "command",
        label: "Retirer un fichier du suivi sans le supprimer",
        command: "git rm --cached .env",
        why: "Désindexe le fichier (Git ne le suit plus) tout en le conservant sur votre disque. À commiter ensuite, avec l'ajout du motif au `.gitignore` dans le même commit.",
      },
    ],
  },
  {
    id: "hooks",
    title: "Les hooks : automatiser les garde-fous",
    level: 3,
    intro: "Des scripts qui se déclenchent à des moments clés.",
    blocks: [
      {
        kind: "text",
        text: "Les hooks sont des scripts exécutés automatiquement par Git à certains événements : avant un commit (`pre-commit`), avant un push (`pre-push`), après un merge (`post-merge`)… Ils vivent dans `.git/hooks/` (non versionnés par défaut). Un hook qui échoue bloque l'opération — c'est un garde-fou, pas une suggestion.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Pourquoi ça existe",
            value:
              "Pour empêcher les erreurs bêtes avant qu'elles n'entrent dans l'historique : tests qui échouent, secrets committés par accident, message de commit mal formaté.",
          },
          {
            label: "Exemple concret",
            value:
              "Un hook `pre-commit` qui lance le linter et les tests rapides : si le lint échoue, le commit est refusé et vous corrigez immédiatement.",
          },
          {
            label: "La limite",
            value:
              "Les hooks sont locaux et contournables (`--no-verify`). Ils ne remplacent pas la CI côté serveur : c'est un filet local, pas une garantie d'équipe.",
          },
          {
            label: "Partage en équipe",
            value:
              "Comme `.git/hooks/` n'est pas versionné, les équipes partagent leurs hooks via des outils dédiés (ex. le framework `pre-commit`, ou des scripts dans le dépôt installés par une commande documentée).",
          },
        ],
      },
      {
        kind: "code",
        language: "bash",
        title: "Exemple : pre-commit qui bloque les secrets",
        code: "#!/bin/sh\n# .git/hooks/pre-commit — rend exécutable avec chmod +x\nif git diff --staged | grep -qi \"AKIA\\|secret_key\"; then\n  echo \"Motif suspect détecté dans le commit. Vérifiez avant de commiter.\"\n  exit 1\nfi",
      },
    ],
  },
  {
    id: "bisect",
    title: "Trouver le coupable : git bisect",
    level: 3,
    intro: "La recherche dichotomique dans l'historique.",
    blocks: [
      {
        kind: "text",
        text: "Un bug est apparu « à un moment » entre la version qui marchait et celle qui ne marche plus. Plutôt que de relire 50 commits, `git bisect` fait une recherche dichotomique : il vous place sur le commit du milieu, vous dites s'il est sain ou buggé, et il divise par deux à chaque fois. En ~6 étapes pour 50 commits.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Démarrer",
            detail: "`git bisect start` : entre en mode bisect.",
          },
          {
            title: "Marquer le mauvais",
            detail:
              "`git bisect bad` (le commit courant, buggé) ou `git bisect bad <hash>`.",
          },
          {
            title: "Marquer le bon",
            detail:
              "`git bisect good <hash-dune-version-saine>` : Git calcule le milieu et y bascule.",
          },
          {
            title: "Tester et répondre",
            detail:
              "Testez le bug ici, puis `git bisect good` ou `git bisect bad`. Répétez jusqu'à ce que Git désigne le commit fautif.",
          },
          {
            title: "Terminer",
            detail:
              "`git bisect reset` : revient sur la branche d'origine. Ne jamais l'oublier.",
          },
        ],
      },
      {
        kind: "command",
        label: "Automatiser le bisect avec un script de test",
        command: "git bisect run ./test-bug.sh",
        why: "Si vous avez un script qui retourne 0 quand tout va bien et non-zéro quand le bug est présent, `bisect run` fait toute la dichotomie seul, sans intervention.",
      },
      {
        kind: "text",
        text: "Pourquoi les commits atomiques comptent : `bisect` désigne un commit fautif. Si ce commit fait dix choses à la fois, vous n'êtes guère avancé. Avec des commits atomiques, le coupable est évident.",
      },
    ],
  },
  {
    id: "blame",
    title: "git blame : qui a écrit cette ligne, et pourquoi",
    level: 3,
    intro: "L'archéologie du code, à manier avec tact.",
    blocks: [
      {
        kind: "text",
        text: "`git blame <fichier>` annote chaque ligne avec le hash, l'auteur et la date du commit qui l'a introduite. C'est l'outil pour comprendre pourquoi une ligne étrange existe : on remonte au commit, on lit son message et sa pull request associée.",
      },
      {
        kind: "command",
        label: "Annoter un fichier ligne par ligne",
        command: "git blame -L 40,60 src/app.py",
        why: "L'option `-L` limite l'analyse aux lignes 40 à 60 : inutile de blâmer tout un fichier de 2000 lignes quand seule une fonction vous intrigue.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Quand l'utiliser",
            value:
              "Comprendre, pas accuser : « pourquoi ce comportement bizarre ? » → blame → commit → message → contexte. Jamais pour pointer du doigt un collègue.",
          },
          {
            label: "La limite",
            value:
              "Le blame montre le dernier commit ayant touché la ligne, pas forcément celui qui a introduit la logique (un reformatage peut masquer l'origine). L'option `-w` ignore les changements d'espaces.",
          },
        ],
      },
    ],
  },
  {
    id: "reflog",
    title: "Le filet de sécurité : git reflog",
    level: 3,
    intro: "Rien n'est vraiment perdu pendant 90 jours.",
    blocks: [
      {
        kind: "text",
        text: "Le `reflog` est le journal de tous les mouvements de `HEAD` : chaque commit, reset, rebase, merge y laisse une trace, même les commits « perdus » qui n'appartiennent plus à aucune branche. Par défaut, ces entrées sont conservées 90 jours. C'est la raison pour laquelle un `reset --hard` malheureux ou une branche supprimée par erreur sont presque toujours récupérables.",
      },
      {
        kind: "command",
        label: "Voir l'historique des mouvements de HEAD",
        command: "git reflog",
        why: "Affiche chaque position passée de HEAD avec l'action associée (`commit`, `reset`, `rebase`…). Chaque ligne a un identifiant comme `HEAD@{3}` utilisable pour revenir en arrière.",
      },
      {
        kind: "command",
        label: "Ressusciter une branche supprimée par erreur",
        command: "git switch -c ma-branche HEAD@{2}",
        why: "Si le reflog montre que `HEAD@{2}` pointait vers le dernier commit de la branche supprimée, cette commande recrée la branche à cet endroit. Vérifiez le hash avec `git show HEAD@{2}` avant.",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Pourquoi ça existe",
            value:
              "Parce que Git ne supprime presque jamais d'objets immédiatement : le reflog est la mémoire de secours qui rend les opérations destructrices annulables.",
          },
          {
            label: "Bonne pratique",
            value:
              "En cas de panique après un reset/rebase raté : ne touchez à rien d'autre, ouvrez `git reflog`, identifiez le bon état, et revenez-y. La précipitation aggrave tout.",
          },
        ],
      },
    ],
  },
  {
    id: "signer-commits",
    title: "Signer ses commits",
    level: 3,
    intro: "Prouver que vos commits viennent vraiment de vous.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, le nom et l'e-mail d'un commit sont de simples champs texte : n'importe qui peut commiter en votre nom. La signature cryptographique (GPG ou SSH) attache une preuve d'identité au commit. GitHub affiche alors un badge « Verified ».",
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Pourquoi ça existe",
            value:
              "Dans les projets sensibles ou très visibles, empêcher l'usurpation d'identité : un commit signé prouve qu'il a été créé par le détenteur de la clé.",
          },
          {
            label: "Les deux options",
            value:
              "GPG (le standard historique, clés gérées via `gpg`) ou SSH (plus simple si vous avez déjà une clé SSH : `git config --global gpg.format ssh`). Les deux sont reconnues par GitHub.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Recommandé pour les mainteneurs de projets open source et les environnements exigeants ; optionnel mais bon réflexe pour les autres.",
          },
          {
            label: "Concepts liés",
            value:
              "Clés SSH (section GitHub), identité des commits (`user.name`/`user.email`), badge Verified sur les forges.",
          },
        ],
      },
      {
        kind: "command",
        label: "Signer un commit avec votre clé",
        command: "git commit -S -m \"feat: ajoute la signature des commits\"",
        why: "L'option `-S` signe le commit avec votre clé configurée. Pour signer par défaut : `git config --global commit.gpgsign true`.",
      },
    ],
  },
  {
    id: "secrets-securite",
    title: "Secrets et sécurité : ce qu'il ne faut jamais commiter",
    level: 3,
    intro: "La règle absolue et comment la faire respecter.",
    blocks: [
      {
        kind: "text",
        text: "Mots de passe, clés API, tokens, certificats : une fois committés puis poussés, un secret est compromis. Le retirer de l'historique ne suffit pas — il a pu être copié entre-temps. La seule réaction correcte est de le révoquer et d'en générer un nouveau.",
      },
      {
        kind: "list",
        items: [
          "Ne commitez jamais de `.env`, de clés privées (`id_rsa`, `*.pem`), ni de tokens — même « temporairement ».",
          "Utilisez des variables d'environnement et des fichiers `.env` ignorés par Git (voir `.gitignore`).",
          "En cas de fuite : révoquez le secret immédiatement, puis nettoyez l'historique (outils comme `git filter-repo` — opération délicate, à coordonner avec l'équipe car elle réécrit l'historique).",
          "Activez la protection contre le push de secrets de votre forge (GitHub : secret scanning / push protection) : c'est le filet côté serveur.",
        ],
      },
      {
        kind: "fields",
        title: "En une phrase, par angle",
        fields: [
          {
            label: "Pourquoi c'est grave",
            value:
              "L'historique Git est répliqué : chaque clone contient le secret. « Supprimer le fichier » dans un commit suivant ne l'efface pas des commits précédents.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un hook `pre-commit` qui détecte les motifs suspects (voir la section hooks) + la protection de la forge + des `.env.example` versionnés (sans valeurs) à la place des vrais `.env`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Commiter le `.env` « juste pour tester » en se disant qu'on le retirera après. On l'oublie, on pousse, c'est trop tard.",
          },
        ],
      },
    ],
  },
  {
    id: "gh-cli",
    title: "GitHub CLI (gh) : la forge dans le terminal",
    level: 3,
    intro: "Un outil optionnel qui évite les allers-retours navigateur.",
    blocks: [
      {
        kind: "text",
        text: "`gh` est l'outil en ligne de commande officiel de GitHub. Il ne remplace pas Git : il le complète pour les opérations liées à la forge (pull requests, issues, releases) sans quitter le terminal. Son existence n'en fait ni un passage obligé ni un meilleur choix universel — c'est une commodité pour les utilisateurs réguliers de GitHub.",
      },
      {
        kind: "command",
        label: "Créer une pull request depuis le terminal",
        command: "gh pr create --title \"Ajoute l'authentification\" --body \"Description…\"",
        why: "Ouvre une PR pour la branche courante sans passer par le navigateur. Pratique quand on enchaîne les PR.",
      },
      {
        kind: "command",
        label: "Lister et consulter les PR",
        command: "gh pr list",
        why: "Affiche les pull requests ouvertes du dépôt courant avec leur statut. `gh pr view 42` affiche le détail, `gh pr checkout 42` bascule sur la branche d'une PR pour la tester localement.",
      },
      {
        kind: "command",
        label: "Cloner via gh",
        command: "gh repo clone utilisateur/projet",
        why: "Équivalent `gh` du `git clone`, avec authentification déjà gérée si vous êtes connecté via `gh auth login`.",
      },
    ],
  },
  {
    id: "alias-config",
    title: "Alias et configuration avancée",
    level: 3,
    intro: "Façonner Git à votre main, proprement.",
    blocks: [
      {
        kind: "text",
        text: "Les alias Git sont des raccourcis définis dans votre configuration. Ils transforment les commandes longues en réflexes et sont partageables (via documentation d'équipe) sans installer quoi que ce soit.",
      },
      {
        kind: "command",
        label: "Créer un alias pour l'historique graphique",
        command: 'git config --global alias.lg "log --oneline --graph --all -15"',
        why: "Définit `git lg` comme raccourci. Les alias vivent dans `~/.gitconfig` : versionnez ou sauvegardez ce fichier pour retrouver vos réglages sur une nouvelle machine.",
      },
      {
        kind: "command",
        label: "Alias : voir le dernier commit en détail",
        command: 'git config --global alias.dernier "show HEAD --stat"',
        why: "Exemple d'alias simple : `git dernier` affiche le contenu du commit le plus récent avec la liste des fichiers touchés.",
      },
      {
        kind: "command",
        label: "Activer les couleurs et le nom de branche dans le prompt",
        command: "git config --global color.ui auto",
        why: "Git colore sa sortie (branche en vert, fichiers modifiés en rouge…) : la lecture de `git status` devient instantanée. La plupart des installations modernes l'activent déjà.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Extrait de ~/.gitconfig",
        code: "[user]\n\tname = Votre Nom\n\temail = vous@exemple.com\n[init]\n\tdefaultBranch = main\n[pull]\n\trebase = true\n[alias]\n\tlg = log --oneline --graph --all -15\n\tdernier = show HEAD --stat\n\tannule-dernier = reset --soft HEAD~1",
      },
    ],
  },
  {
    id: "debugging-git",
    title: "Débugger avec Git : la méthode",
    level: 3,
    intro: "Quand quelque chose cloche, dans quel ordre regarder.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Où suis-je ?",
            detail:
              "`git status` et `git branch` : branche courante, fichiers modifiés, état du staging. 80 % des « Git est cassé » viennent d'une mauvaise branche ou d'un staging inattendu.",
          },
          {
            title: "Qu'est-ce qui a changé ?",
            detail:
              "`git diff` (non stagé), `git diff --staged` (stagé) : lisez ce qui va partir avant d'accuser l'outil.",
          },
          {
            title: "Que s'est-il passé ?",
            detail:
              "`git log --oneline -10` et `git reflog` : les derniers commits et les derniers mouvements. Le reflog révèle les reset/rebase récents.",
          },
          {
            title: "Par rapport à quoi ?",
            detail:
              "`git diff main..ma-branche`, `git log main..origin/main` : comparez votre état au distant pour comprendre les divergences avant de pousser.",
          },
          {
            title: "Quel commit a introduit le problème ?",
            detail:
              "`git bisect` (section dédiée) quand le bug est ancien, `git blame` quand une ligne précise est suspecte.",
          },
        ],
      },
      {
        kind: "text",
        text: "Principe général : Git ne perd presque jamais de données — il les déplace. Avant toute commande « réparatrice » (`reset --hard`, `checkout --`), assurez-vous de savoir où sont vos modifications (`git stash` d'abord en cas de doute).",
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques d'équipe",
    level: 3,
    intro: "Les conventions qui font un historique lisible et une équipe sereine.",
    blocks: [
      {
        kind: "list",
        items: [
          "Commitez tôt et souvent : des petits commits atomiques plutôt qu'un commit hebdomadaire fourre-tout.",
          "Écrivez des messages qui expliquent le pourquoi ; adoptez Conventional Commits si l'équipe le décide.",
          "Ne commitez jamais directement sur `main` : passez par des branches courtes et des pull requests relues.",
          "Tirez avant de pousser ; poussez à la fin de chaque fonctionnalité, pas une fois par mois.",
          "Ne réécrivez jamais l'historique partagé (`reset --hard` + `push --force` sur une branche d'équipe) : utilisez `revert`.",
          "Relisez `git diff --staged` avant chaque commit : c'est votre relecture personnelle.",
          "Gardez un `.gitignore` à jour dès le premier commit ; ne versionnez ni secrets ni fichiers générés.",
          "Supprimez les branches fusionnées, localement et sur le distant.",
          "Documentez la stratégie de l'équipe (merge ou rebase, nommage des branches) dans un `CONTRIBUTING.md`.",
        ],
      },
      {
        kind: "text",
        text: "Ces règles ne sont pas des dogmes universels : chaque équipe les adapte. Mais une équipe sans conventions Git produit un historique illisible — et un historique illisible coûte du temps à chaque débogage.",
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "8 erreurs fréquentes (et comment s'en sortir)",
    level: 3,
    intro: "Les classiques, avec la sortie de secours pour chacun.",
    blocks: [
      {
        kind: "fields",
        title: "Erreur 1 — Commiter sur la mauvaise branche",
        fields: [
          {
            label: "Symptôme",
            value:
              "Vous réalisez après `git commit` que vous étiez sur `main` au lieu de votre branche de fonctionnalité.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "On oublie de créer/basculer de branche avant de travailler. `git status` l'aurait montré.",
          },
          {
            label: "Solution",
            value:
              "Créez la branche ici : `git switch -c ma-branche` (elle contiendra le commit), rebasculez sur `main` puis `git reset --hard HEAD~1` pour retirer le commit de `main`. Si le commit était déjà poussé, préférez `git revert` sur `main` puis cherry-pick sur la branche.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 2 — « rejected » au push",
        fields: [
          {
            label: "Symptôme",
            value: "`git push` répond `rejected` : le distant contient des commits que vous n'avez pas.",
          },
          {
            label: "Pourquoi ça arrive",
            value:
              "Quelqu'un a poussé entre-temps, ou vous avez poussé depuis une autre machine.",
          },
          {
            label: "Solution",
            value:
              "`git pull` (ou `fetch` + `rebase`), résolvez l'éventuel conflit, puis repoussez. Jamais de `--force` sur une branche partagée.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 3 — Committer un fichier secret",
        fields: [
          {
            label: "Symptôme",
            value: "Un `.env` ou une clé API s'est retrouvé dans un commit.",
          },
          {
            label: "Pourquoi ça arrive",
            value: "`git add .` trop enthousiaste sans `.gitignore` à jour.",
          },
          {
            label: "Solution",
            value:
              "1) Révoquez le secret immédiatement. 2) Retirez-le du suivi (`git rm --cached`), ajoutez-le au `.gitignore`, commitez. 3) S'il a été poussé, nettoyez l'historique (`git filter-repo`, à coordonner avec l'équipe) — mais la révocation reste l'étape qui compte.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 4 — Message de commit bourré de fautes / faux fichier commité",
        fields: [
          {
            label: "Symptôme",
            value: "Le dernier commit contient une coquille ou un fichier oublié.",
          },
          {
            label: "Pourquoi ça arrive",
            value: "On committe vite, sans relire le diff stagé.",
          },
          {
            label: "Solution",
            value:
              "Tant que le commit n'est pas poussé : `git commit --amend` (après `git add` du fichier manquant si besoin). Déjà poussé : assumez avec un nouveau commit correctif, ou `revert` si c'est vraiment gênant.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 5 — Merge avec des conflits partout",
        fields: [
          {
            label: "Symptôme",
            value: "Des dizaines de fichiers en conflit après un `git merge`.",
          },
          {
            label: "Pourquoi ça arrive",
            value: "Branches divergées depuis trop longtemps, ou merge lancé sur la mauvaise base.",
          },
          {
            label: "Solution",
            value:
              "Si le merge n'est pas terminé : `git merge --abort` pour revenir en arrière, puis synchronisez d'abord les branches (`fetch`, comparez les diffs) avant de refusionner par petites étapes.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 6 — « detached HEAD » et commits perdus",
        fields: [
          {
            label: "Symptôme",
            value: "Commits créés en HEAD détachée, puis « disparus » après un changement de branche.",
          },
          {
            label: "Pourquoi ça arrive",
            value: "On a commité sans être sur une branche.",
          },
          {
            label: "Solution",
            value:
              "`git reflog` : retrouvez le hash du commit, puis `git switch -c recuperation <hash>` pour y attacher une branche. Rien n'est perdu tant que le reflog le référence.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 7 — git reset --hard destructeur",
        fields: [
          {
            label: "Symptôme",
            value: "Des modifications non commitées ont été écrasées par un `reset --hard`.",
          },
          {
            label: "Pourquoi ça arrive",
            value: "On voulait « annuler » sans distinguer les trois modes de reset.",
          },
          {
            label: "Solution",
            value:
              "Si des commits existaient : `git reflog` pour retrouver l'état précédent. Si seules des modifications non commitées ont été perdues et qu'aucun stash/commit ne les contient, elles sont malheureusement irrécupérables — d'où la règle : `stash` ou `commit` avant toute opération destructive.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 8 — Travailler sans jamais tirer (pull)",
        fields: [
          {
            label: "Symptôme",
            value: "Gros conflits au moment de pousser après une semaine sans `pull`.",
          },
          {
            label: "Pourquoi ça arrive",
            value: "On travaille en silo sur une branche qui diverge du `main` qui avance.",
          },
          {
            label: "Solution",
            value:
              "Synchronisez souvent : `git fetch` + `git rebase origin/main` (ou `merge`) sur votre branche, plusieurs fois par semaine. Les petits conflits fréquents valent mieux qu'un énorme conflit final.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "4 projets réalistes et progressifs",
    level: 3,
    intro: "Pour ancrer chaque notion dans la pratique, du plus simple au plus collaboratif.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Carnet de notes versionné (débutant)",
        fields: [
          {
            label: "Objectif",
            value:
              "Prendre le réflexe du commit quotidien sur un projet personnel sans enjeu.",
          },
          {
            label: "Déroulé",
            value:
              "Créez un dépôt pour vos notes en Markdown. Un commit par idée ou par séance (`docs: ajoute les notes sur les boucles`). Pratiquez `status`, `add`, `commit`, `log`.",
          },
          {
            label: "Compétences",
            value: "init, add, commit, status, log, messages de commit.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 2, pour ajouter les branches.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Site vitrine avec branches (intermédiaire)",
        fields: [
          {
            label: "Objectif",
            value: "Maîtriser les branches, les fusions et les conflits en conditions réelles.",
          },
          {
            label: "Déroulé",
            value:
              "Un petit site statique (HTML/CSS). Chaque page ou section se développe sur sa branche (`page-contact`, `style-sombre`), fusionnée dans `main` via `merge`. Provoquez volontairement un conflit (même ligne modifiée sur deux branches) et résolvez-le.",
          },
          {
            label: "Compétences",
            value: "branch, switch, merge, conflits, .gitignore, tags (`v1.0` à la mise en ligne).",
          },
          {
            label: "Projet suivant",
            value: "Le projet 3, pour la collaboration distante.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Projet à deux avec pull requests (intermédiaire+)",
        fields: [
          {
            label: "Objectif",
            value: "Expérimenter le workflow d'équipe complet sur GitHub.",
          },
          {
            label: "Déroulé",
            value:
              "À deux : l'un crée le dépôt, ajoute l'autre comme collaborateur. Chacun travaille sur ses branches, ouvre des pull requests, relit le code de l'autre, demande des modifications, fusionne. Instaurez Conventional Commits et une CI minimale (un linter).",
          },
          {
            label: "Compétences",
            value: "clone, push, pull, fetch, pull requests, revue de code, rebase local, résolution de conflits à deux.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 4, pour contribuer à l'open source.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Première contribution open source (avancé)",
        fields: [
          {
            label: "Objectif",
            value: "Appliquer le workflow fork dans un vrai projet.",
          },
          {
            label: "Déroulé",
            value:
              "Choisissez un petit projet avec des issues étiquetées « good first issue ». Forkez, clonez votre fork, créez une branche, corrigez (documentation, typo, petit bug), poussez, ouvrez la PR vers le dépôt d'origine. Gérez les retours des mainteneurs jusqu'à la fusion.",
          },
          {
            label: "Compétences",
            value: "fork, upstream, rebase sur upstream/main, PR inter-dépôts, échanges avec des mainteneurs, squash via rebase interactif si demandé.",
          },
          {
            label: "Projet suivant",
            value:
              "Approfondir : Git internals (plumbing), monorepos, ou stratégies de branching d'équipe (GitHub Flow, trunk-based).",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources officielles et de référence",
    level: 3,
    intro: "Les sources à garder sous la main — officielles d'abord.",
    blocks: [
      {
        kind: "list",
        items: [
          "Documentation officielle : https://git-scm.com/doc — la référence, incluant le livre « Pro Git » complet et gratuit (https://git-scm.com/book).",
          "Aide-mémoire officiel : https://git-scm.com/docs — une page par commande, avec exemples.",
          "GitHub Docs : https://docs.github.com — pour tout ce qui concerne les pull requests, les forks et la collaboration sur GitHub.",
          "Conventional Commits : https://conventionalcommits.org — la spécification des messages structurés.",
          "Learn Git Branching : https://learngitbranching.js.org — exercices interactifs visuels sur les branches (outil pédagogique tiers, très efficace).",
        ],
      },
      {
        kind: "text",
        text: "Réflexe durable : `git <commande> --help` ouvre la documentation complète de la commande dans votre terminal — souvent plus rapide qu'une recherche web, et toujours exacte pour votre version de Git.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Prolonger vers les pratiques d'équipe et l'automatisation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir Git : les commandes « plumbing » (`hash-object`, `cat-file`) pour comprendre les entrailles, et `git filter-repo` pour la réécriture d'historique avancée.",
          "CI/CD : connecter votre dépôt à des pipelines (GitHub Actions, GitLab CI) qui testent chaque pull request automatiquement.",
          "Stratégies de branches d'équipe : GitHub Flow (simple, branches courtes) vs trunk-based development — à choisir en équipe, pas seul.",
          "Revue de code : apprendre à relire efficacement (petites PR, commentaires constructifs) — la technique ne suffit pas, la collaboration s'apprend.",
          "Outils complémentaires : un gestionnaire de versions pour vos langages (nvm, pyenv…), et les conventions de votre écosystème (npm, Docker) pour des dépôts propres.",
        ],
      },
    ],
  },
];

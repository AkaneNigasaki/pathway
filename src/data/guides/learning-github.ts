import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de GitHub : de la création de compte à la
 * collaboration professionnelle (pull requests, code review, Actions).
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_GITHUB: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est GitHub et pourquoi tout le code open source ou presque y vit.",
    blocks: [
      {
        kind: "text",
        text: "GitHub est une plateforme qui héberge des dépôts Git et organise le travail autour du code : pull requests, code review, issues, automatisation (Actions), gestion de projet. Des millions de développeurs et d'organisations y collaborent ; c'est aussi une vitrine professionnelle — un profil actif y parle souvent plus qu'un CV.",
      },
      {
        kind: "text",
        text: "Pourquoi GitHub existe : Git seul gère l'historique en local, mais collaborer exige un point central pour partager le code, discuter des changements et automatiser les vérifications. GitHub fournit ce point central avec une interface web, une API et une CLI, et ajoute la couche sociale (revue, discussion, gouvernance) qui fait le travail d'équipe.",
      },
      {
        kind: "text",
        text: "Ce que GitHub n'est pas : ni un système de versions (c'est Git), ni un hébergeur générique de fichiers, ni un réseau social ordinaire — même si le graphe de contributions et les followers y ressemblent parfois.",
      },
    ],
  },
  {
    id: "github-n-est-pas-git",
    title: "GitHub n'est pas Git",
    level: 1,
    intro:
      "La distinction fondamentale : l'outil local contre la plateforme.",
    blocks: [
      {
        kind: "diagram",
        title: "Git (local) vs GitHub (plateforme)",
        lines: [
          "Git (sur votre machine)",
          "     │",
          "     ├── commits, branches, historique local",
          "     ├── fonctionne sans internet, sans compte",
          "     └── le moteur de versionnage",
          "     │",
          "     ▼  (push / pull / clone)",
          "     │",
          "GitHub (sur github.com)",
          "     │",
          "     ├── héberge les dépôts distants",
          "     ├── pull requests, issues, code review",
          "     ├── Actions (CI/CD), Pages, Packages",
          "     └── la couche collaboration",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : on peut utiliser Git toute une vie sans GitHub, mais dès qu'on veut partager du code, recevoir des contributions ou automatiser des vérifications à chaque push, il faut une forge — GitHub est la plus utilisée. Les pull requests, les issues et les Actions sont des concepts GitHub, pas Git : ils n'existent pas dans un dépôt local pur.",
      },
      {
        kind: "list",
        items: [
          "Git = le versionnage (commits, branches, fusions). GitHub = l'hébergement + la collaboration.",
          "Alternatives : GitLab, Bitbucket, forges auto-hébergées — les concepts (PR/MR, CI) sont transférables.",
          "La CLI officielle `gh` permet d'utiliser GitHub sans quitter le terminal.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "creer-un-compte",
    title: "Créer un compte",
    level: 2,
    intro:
      "Un compte gratuit suffit pour l'essentiel : dépôts, pull requests, Actions.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "S'inscrire sur github.com",
            detail:
              "Choisir un nom d'utilisateur sobre et durable : il apparaîtra dans les URLs des dépôts et les contributions. L'offre gratuite inclut les dépôts publics et privés illimités.",
          },
          {
            title: "Activer la double authentification (2FA)",
            detail:
              "GitHub l'exige pour les comptes actifs : application d'authentification (TOTP) ou clé de sécurité. Conserver les codes de récupération dans un endroit sûr.",
          },
          {
            title: "Configurer le profil",
            detail:
              "Nom, bio courte, lien : un profil soigné inspire confiance aux mainteneurs quand on propose des contributions. Le README de profil (dépôt au nom de l'utilisateur) est un bonus, pas une obligation.",
          },
        ],
      },
    ],
  },
  {
    id: "installer-gh",
    title: "Installer la CLI gh",
    level: 2,
    intro:
      "Piloter GitHub depuis le terminal : créer, cloner, suivre les PR sans navigateur.",
    blocks: [
      {
        kind: "command",
        label: "Se connecter à GitHub",
        command: "gh auth login",
        why: "Lance l'assistant de connexion interactif : choisit github.com, le protocole (HTTPS recommandé), puis authentifie via le navigateur. Le token est stocké de façon sécurisée par la CLI — plus besoin de coller de tokens à la main.",
        verify: "gh auth status",
      },
      {
        kind: "text",
        text: "Installation : `gh` est disponible via les gestionnaires de paquets (`winget install GitHub.cli`, `brew install gh`, `sudo apt install gh`). La CLI couvre l'essentiel du quotidien : dépôts, PR, issues, workflows, releases. Tout ce qui suit l'utilise en priorité.",
      },
    ],
  },
  {
    id: "premier-depot",
    title: "Premier dépôt",
    level: 2,
    intro:
      "Créer un dépôt sur GitHub et y pousser un projet existant.",
    blocks: [
      {
        kind: "command",
        label: "Créer le dépôt distant",
        command: "gh repo create mon-projet --public --source=. --push",
        why: "Crée le dépôt `mon-projet` sur GitHub (`--public`, ou `--private`), le lie au dossier courant (`--source=.`) et pousse le contenu (`--push`). En une commande, le projet local devient un dépôt distant versionné et partageable.",
        verify: "gh repo view --web",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Alternative : depuis le site",
            detail:
              "Bouton « New repository » sur github.com : nom, visibilité, puis les instructions affichées pour lier un dépôt local existant (`git remote add origin …` puis `git push -u origin main`).",
          },
          {
            title: "Vérifier le push",
            detail:
              "La page du dépôt affiche les fichiers, le README rendu et l'historique des commits. `git remote -v` en local confirme l'URL du distant.",
          },
        ],
      },
    ],
  },
  {
    id: "cloner",
    title: "Cloner un dépôt",
    level: 2,
    intro:
      "Récupérer un dépôt distant en local pour y travailler.",
    blocks: [
      {
        kind: "command",
        label: "Cloner avec la CLI",
        command: "gh repo clone utilisateur/depot",
        why: "Clone le dépôt dans un dossier du même nom, en configurant automatiquement le distant `origin` avec la bonne URL. Évite les erreurs de copier-coller d'URL — la forme `utilisateur/depot` suffit.",
        verify: "cd depot && git remote -v",
      },
      {
        kind: "text",
        text: "Équivalent Git pur : `git clone https://github.com/utilisateur/depot.git`. Le clonage récupère tout l'historique : on peut ensuite créer des branches, committer et pousser (avec les droits) ou forker (sans les droits).",
      },
    ],
  },
  {
    id: "cycle-quotidien",
    title: "Le cycle quotidien",
    level: 2,
    intro:
      "Le workflow standard : branche, commits, push, pull request.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Se synchroniser",
            detail:
              "`git pull` (ou `git pull --rebase`) sur `main` : partir d'une base à jour avant de travailler.",
          },
          {
            title: "Créer une branche",
            detail:
              "`git switch -c feature/ma-fonctionnalite` : on ne travaille jamais directement sur `main` dans un projet d'équipe.",
          },
          {
            title: "Commiter petit et souvent",
            detail:
              "`git add` puis `git commit -m \"message clair\"` : des commits atomiques avec des messages qui expliquent le pourquoi.",
          },
          {
            title: "Pousser la branche",
            detail:
              "`git push -u origin feature/ma-fonctionnalite` : la branche existe maintenant sur GitHub, prête pour la pull request.",
          },
          {
            title: "Ouvrir la pull request",
            detail:
              "`gh pr create` : titre, description, reviewers. La PR devient le lieu de discussion et de revue avant fusion.",
          },
        ],
      },
    ],
  },
  {
    id: "pull-requests",
    title: "Pull requests",
    level: 2,
    intro:
      "Proposer des changements : le cœur de la collaboration sur GitHub.",
    blocks: [
      {
        kind: "command",
        label: "Créer une pull request",
        command: "gh pr create --title \"Ajoute la pagination\" --body \"Découpe les listes en pages de 20 éléments.\"",
        why: "Ouvre une PR depuis la branche courante vers `main`. Un bon titre (impératif, précis) et un corps qui explique le pourquoi et le comment : c'est ce que le reviewer lit en premier.",
        verify: "gh pr status",
      },
      {
        kind: "diagram",
        title: "Le cycle de vie d'une PR",
        lines: [
          "[Branche feature]",
          "        │",
          "        ▼",
          "[PR ouverte : discussion]",
          "        │",
          "        ├── checks CI (tests, lint)",
          "        ├── code review (commentaires)",
          "        └── modifications poussées",
          "        │",
          "        ▼",
          "[Approbation]",
          "        │",
          "        ▼",
          "[Merge → main]",
        ],
      },
    ],
  },
  {
    id: "issues",
    title: "Issues",
    level: 2,
    intro:
      "Suivre bugs, idées et tâches : le tableau de bord du projet.",
    blocks: [
      {
        kind: "command",
        label: "Créer une issue",
        command: "gh issue create --title \"Le bouton reste bloqué après envoi\" --body \"Étapes pour reproduire : …\"",
        why: "Ouvre une issue avec un titre précis et un corps qui permet de reproduire. Une bonne issue contient : comportement attendu, comportement observé, étapes de reproduction, environnement.",
        verify: "gh issue list",
      },
      {
        kind: "list",
        items: [
          "Labels : `bug`, `enhancement`, `good first issue`… pour trier et prioriser.",
          "Assignation et milestones : qui s'en occupe, pour quelle version.",
          "Lier PR et issue : « Fixes #42 » dans la PR ferme automatiquement l'issue au merge.",
          "Templates d'issues : guident les rapporteurs vers les informations utiles.",
        ],
      },
    ],
  },
  {
    id: "fork",
    title: "Fork : contribuer sans droits",
    level: 2,
    intro:
      "Proposer des changements à un projet dont on n'est pas membre.",
    blocks: [
      {
        kind: "command",
        label: "Forker puis cloner",
        command: "gh repo fork utilisateur/depot --clone",
        why: "Crée une copie du dépôt sur votre compte puis la clone en local. Vous avez tous les droits sur votre fork : branches, commits, push — puis une PR depuis votre fork vers le dépôt d'origine propose vos changements.",
        verify: "git remote -v",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Le flux complet",
            detail:
              "Fork → clone du fork → branche → commits → push vers le fork → PR vers le dépôt d'origine (« compare across forks »). Le mainteneur relit, discute, fusionne.",
          },
          {
            title: "Rester synchronisé",
            detail:
              "Le dépôt d'origine évolue : `gh repo sync` (ou ajouter le distant `upstream` en Git pur) met le fork à jour avant de travailler.",
          },
        ],
      },
    ],
  },
  {
    id: "readme-gitignore-licence",
    title: "README, .gitignore, licence",
    level: 2,
    intro:
      "Les trois fichiers qui font un dépôt sérieux dès le premier commit.",
    blocks: [
      {
        kind: "fields",
        title: "Le trio de base",
        fields: [
          {
            label: "README.md",
            value:
              "La vitrine : ce que fait le projet, comment l'installer, comment l'utiliser, comment contribuer. Rendu automatiquement sur la page du dépôt.",
          },
          {
            label: ".gitignore",
            value:
              "Ce que Git doit ignorer : `node_modules/`, `.env`, `dist/`, fichiers d'éditeur. Les templates officiels par langage évitent les oublis.",
          },
          {
            label: "LICENSE",
            value:
              "Sans licence, le code n'est pas réutilisable légalement par défaut. MIT pour la permissivité simple, GPL si on veut imposer le partage.",
          },
        ],
      },
      {
        kind: "text",
        text: "GitHub propose ces fichiers à la création du dépôt (README, .gitignore par langage, licence). Les ajouter après coup fonctionne aussi, mais un dépôt sans README ni licence inspire moins confiance — surtout pour l'open source.",
      },
    ],
  },
  {
    id: "explorer",
    title: "Explorer et suivre",
    level: 2,
    intro:
      "Trouver des projets, suivre leur activité, rester informé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Recherche : par langage, étoiles, date de mise à jour — les filtres avancés (`language:typescript stars:>100`) affinent vite.",
          "Watch : être notifié des releases ou de toute activité d'un dépôt suivi.",
          "Star : marquer un dépôt en favori (et signaler son intérêt aux mainteneurs).",
          "Explore et les trending : découvrir ce qui bouge dans son écosystème.",
          "S'abonner aux releases d'une dépendance critique : anticiper les mises à jour au lieu de les subir.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "anatomie-pr",
    title: "Anatomie d'une bonne PR",
    level: 3,
    intro:
      "Ce qui distingue une PR fusionnée vite d'une PR qui moisit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Taille raisonnable : une PR fait une chose. Au-delà de quelques centaines de lignes, la revue devient superficielle — découper.",
          "Description qui explique le pourquoi, pas seulement le quoi : le diff montre le quoi tout seul.",
          "Contexte : issue liée, captures ou vidéos pour les changements visuels, notes de test (« testé avec… »).",
          "Commits propres ou squashés : l'historique de la branche doit se relire.",
          "CI verte avant de demander la revue : ne pas faire perdre de temps aux reviewers.",
          "Draft PR pour un travail en cours : visible sans solliciter de revue.",
        ],
      },
    ],
  },
  {
    id: "code-review",
    title: "Code review",
    level: 3,
    intro:
      "Relire utilement : l'art du commentaire qui fait progresser.",
    blocks: [
      {
        kind: "table",
        headers: ["Pratique", "Pourquoi"],
        rows: [
          ["Relire vite (sous 24h)", "Une PR en attente bloque son auteur ; la latence tue la vélocité"],
          ["Commenter le code, pas la personne", "« Cette fonction pourrait… » plutôt que « tu as… »"],
          ["Distinguer bloquant et suggestion", "Les suggestions (nit) ne doivent pas bloquer une bonne PR"],
          ["Proposer, pas seulement critiquer", "Un extrait de code suggéré vaut dix paragraphes"],
          ["Approuver explicitement", "Le silence n'est pas une approbation : le check « Approved » débloque"],
          ["Relire les tests aussi", "Du code non testé relu à moitié est une dette"],
        ],
      },
      {
        kind: "text",
        text: "En tant qu'auteur : répondre à chaque commentaire (même par « fait »), ne pas prendre les remarques pour des attaques, et re-demander une revue après des changements significatifs. La review est un transfert de connaissance autant qu'un contrôle qualité.",
      },
    ],
  },
  {
    id: "merge-strategies",
    title: "Stratégies de fusion",
    level: 3,
    intro:
      "Merge, squash, rebase : trois façons d'intégrer, trois historiques différents.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Résultat", "Quand l'utiliser"],
        rows: [
          ["Merge commit", "Conserve toute l'histoire de la branche + un commit de fusion", "Branches longues, besoin de traçabilité fine"],
          ["Squash", "Écrase la branche en un seul commit sur main", "PRs avec des commits de travail (« wip », « fix ») : historique propre"],
          ["Rebase", "Rejoue les commits de la branche sur main, sans commit de fusion", "Historique linéaire exigé par l'équipe"],
        ],
      },
      {
        kind: "command",
        label: "Fusionner une PR en squash",
        command: "gh pr merge 42 --squash",
        why: "Fusionne la PR numéro 42 en écrasant ses commits en un seul sur `main`. Le message du commit squashé reprend titre et description de la PR : d'où l'importance de bien les rédiger.",
      },
      {
        kind: "text",
        text: "Le choix se fait au niveau du dépôt (paramètres : autoriser ou interdire chaque stratégie). L'essentiel est la cohérence d'équipe : un historique prévisible se parcourt avec `git log`, un historique mélangé décourage l'archéologie.",
      },
    ],
  },
  {
    id: "branch-protection",
    title: "Protection de branches",
    level: 3,
    intro:
      "Verrouiller `main` : la qualité devient non négociable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Interdire le push direct sur `main` : tout passe par pull request.",
          "Exiger des checks CI verts avant fusion : tests, lint, build.",
          "Exiger au moins une approbation (voire deux, ou un code owner).",
          "Exiger des branches à jour avant fusion : la PR est testée telle qu'elle sera fusionnée.",
          "Restreindre qui peut pousser ou forcer : même les admins peuvent s'y soumettre.",
          "Les règles s'appliquent aussi aux mainteneurs : c'est le principe — personne ne contourne la qualité.",
        ],
      },
    ],
  },
  {
    id: "github-actions-intro",
    title: "GitHub Actions : l'automatisation intégrée",
    level: 3,
    intro:
      "CI/CD sans service tiers : des workflows YAML dans le dépôt.",
    blocks: [
      {
        kind: "diagram",
        title: "Les concepts d'Actions",
        lines: [
          "[Événement : push, PR, planning...]",
          "              │",
          "              ▼",
          "[Workflow (.github/workflows/*.yml)]",
          "              │",
          "              ▼",
          "[Jobs : s'exécutent (en parallèle par défaut)",
          " sur des runners]",
          "              │",
          "              ▼",
          "[Steps : chaque job = une séquence",
          " d'étapes (run / uses)]",
        ],
      },
      {
        kind: "text",
        text: "Un workflow est un fichier YAML dans `.github/workflows/` : il déclare sur quels événements il se déclenche, quels jobs il exécute et sur quels environnements (runners). Les runners hébergés par GitHub (Ubuntu, Windows, macOS) sont gratuits dans certaines limites pour les dépôts publics comme privés.",
      },
    ],
  },
  {
    id: "workflow-yaml",
    title: "Écrire un workflow",
    level: 3,
    intro:
      "Un pipeline CI minimal, ligne par ligne.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/ci.yml",
        code: `name: CI\n\non: [push, pull_request]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n        # Récupère le code du dépôt sur le runner.\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm test`,
      },
      {
        kind: "list",
        items: [
          "`on:` déclare les déclencheurs : push, pull_request, planning (`schedule` en cron), manuel (`workflow_dispatch`).",
          "`runs-on:` choisit le runner : `ubuntu-latest` est le défaut raisonnable.",
          "`uses:` réutilise une action du marketplace (checkout, setup-node…) ; `run:` exécute des commandes shell.",
          "Les secrets (`secrets.TOKEN`) se déclarent dans les paramètres du dépôt, jamais dans le YAML.",
        ],
      },
    ],
  },
  {
    id: "actions-avancees",
    title: "Actions avancées",
    level: 3,
    intro:
      "Matrices, cache, artefacts : les leviers d'un pipeline sérieux.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques de workflow",
        fields: [
          {
            label: "Matrix",
            value:
              "Exécuter un job sur plusieurs combinaisons (versions de Node, OS) : `strategy: matrix` multiplie les jobs automatiquement.",
          },
          {
            label: "Cache",
            value:
              "Mettre en cache les dépendances (`actions/cache`) entre exécutions : divise le temps de CI sur les gros projets.",
          },
          {
            label: "Artefacts",
            value:
              "Publier des fichiers produits (builds, rapports de tests) avec `actions/upload-artifact` : téléchargeables depuis l'onglet du workflow.",
          },
          {
            label: "Environnements",
            value:
              "Staging / production avec secrets distincts et approbations manuelles avant déploiement.",
          },
          {
            label: "Concurrency",
            value:
              "Annuler les exécutions obsolètes d'une même branche : évite de tester des commits déjà remplacés.",
          },
        ],
      },
      {
        kind: "command",
        label: "Déclencher un workflow manuellement",
        command: "gh workflow run CI",
        why: "Lance le workflow nommé « CI » à la demande (nécessite le déclencheur `workflow_dispatch` dans le YAML). Utile pour rejouer un déploiement ou tester sans pusher de commit vide.",
        verify: "gh workflow list",
      },
    ],
  },
  {
    id: "gh-cli-avance",
    title: "gh au quotidien avancé",
    level: 3,
    intro:
      "Les commandes qui évitent d'ouvrir le navigateur.",
    blocks: [
      {
        kind: "command",
        label: "Voir l'état des checks d'une PR",
        command: "gh pr checks",
        why: "Affiche les checks CI de la PR courante avec leur statut : on sait en un coup d'œil si la CI est verte sans ouvrir la page web.",
      },
      {
        kind: "command",
        label: "Lister et filtrer les issues",
        command: "gh issue list --label bug --assignee @me",
        why: "Liste les issues avec le label `bug` assignées à soi. Les filtres (`--label`, `--assignee`, `--search`) transforment la CLI en tableau de bord personnel.",
      },
      {
        kind: "command",
        label: "Créer une release",
        command: "gh release create v1.2.0 --generate-notes",
        why: "Crée le tag `v1.2.0` et la release GitHub associée, avec des notes générées depuis les PR fusionnées. Les releases sont le canal officiel de distribution des versions.",
      },
      {
        kind: "text",
        text: "Autres utiles : `gh pr diff` (voir le diff sans quitter le terminal), `gh pr view --web` (ouvrir la PR courante dans le navigateur), `gh search repos` (recherche depuis le terminal). La CLI est scriptable : `gh` en JSON (`--json`) s'enchaîne avec `jq`.",
      },
    ],
  },
  {
    id: "releases",
    title: "Releases et tags",
    level: 3,
    intro:
      "Marquer les versions : du tag Git à la release distribuée.",
    blocks: [
      {
        kind: "text",
        text: "Un tag Git (`v1.2.0`) marque un commit comme version. Une release GitHub s'appuie sur un tag et y ajoute : notes de version, binaires joints, statut (latest, pre-release). C'est l'unité de distribution : les utilisateurs téléchargent une release, pas un commit.",
      },
      {
        kind: "list",
        items: [
          "Versionnage sémantique (semver) : `MAJEUR.MINEUR.CORRECTIF` — un contrat avec les utilisateurs sur la compatibilité.",
          "Notes générées automatiquement depuis les PR : fiables si les titres de PR sont soignés.",
          "Pre-release pour les bêtas : visible sans être proposée comme « latest ».",
          "Automatiser : un workflow qui crée la release au push d'un tag (`on: push: tags: - 'v*'`).",
        ],
      },
    ],
  },
  {
    id: "organisations-equipes",
    title: "Organisations et équipes",
    level: 3,
    intro:
      "Structurer le travail collectif au-delà du dépôt individuel.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux d'organisation",
        fields: [
          {
            label: "Organisation",
            value:
              "Le compte collectif : regroupe dépôts, équipes, facturation. Les entreprises et les projets open source sérieux en ont une.",
          },
          {
            label: "Équipes",
            value:
              "Groupes de membres avec des droits par dépôt (lecture, écriture, administration). On donne les droits aux équipes, pas aux individus.",
          },
          {
            label: "Rôles",
            value:
              "Owner, member, outside collaborator : qui peut inviter, modifier les paramètres, voir les dépôts privés.",
          },
          {
            label: "CODEOWNERS",
            value:
              "Fichier qui désigne les reviewers automatiques par chemin : toute PR touchant `src/paiement/` réclame l'équipe paiement.",
          },
        ],
      },
    ],
  },
  {
    id: "securite-github",
    title: "Sécurité",
    level: 3,
    intro:
      "Protéger le compte, le code et les secrets : les réglages qui comptent.",
    blocks: [
      {
        kind: "list",
        items: [
          "2FA obligatoire pour tous les membres d'une organisation : non négociable.",
          "Ne jamais commiter de secrets (clés API, tokens, mots de passe) : une fois poussé, un secret est compromis — le révoquer, pas le supprimer du code.",
          "Secret scanning : GitHub détecte les tokens connus dans les dépôts publics et alerte.",
          "Dependabot : alertes et PR automatiques pour les dépendances vulnérables — à activer et à traiter.",
          "Branches protégées + reviews exigées : la sécurité du processus autant que du code.",
          "Commits signés (GPG/SSH) : prouvent l'authenticité de l'auteur, exigibles par policy.",
          "Auditer les accès : applications OAuth tierces, clés de déploiement, collaborateurs externes.",
        ],
      },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    level: 3,
    intro:
      "Piloter le travail : tableaux kanban reliés aux issues et PR.",
    blocks: [
      {
        kind: "text",
        text: "GitHub Projects organise issues et PR en vues (tableau, liste, roadmap) avec des champs personnalisés (priorité, taille, sprint). Les cartes se déplacent automatiquement selon le statut des éléments liés : une PR fusionnée fait avancer sa carte sans intervention.",
      },
      {
        kind: "list",
        items: [
          "Vues multiples sur les mêmes données : kanban pour le quotidien, roadmap pour la vision.",
          "Automatisation des colonnes : « Todo → In Progress → Done » suit les événements GitHub.",
          "Idéal pour les petites équipes : le suivi vit à côté du code, pas dans un outil séparé.",
        ],
      },
    ],
  },
  {
    id: "discussions",
    title: "Discussions",
    level: 3,
    intro:
      "Le forum du projet : questions, idées et annonces hors des issues.",
    blocks: [
      {
        kind: "text",
        text: "Les Discussions sont l'espace conversationnel d'un dépôt ou d'une organisation : questions d'usage, propositions d'idées, annonces — tout ce qui n'est pas un bug actionnable ni une tâche. Elles évitent de polluer les issues avec du support.",
      },
      {
        kind: "list",
        items: [
          "Catégories : Q&A, idées, annonces, sondages — structurées par les mainteneurs.",
          "Marquer une réponse comme solution : construit une base de connaissance consultable.",
          "Convertir une discussion en issue quand elle révèle un vrai bug : le tri reste net.",
        ],
      },
    ],
  },
  {
    id: "github-pages",
    title: "GitHub Pages",
    level: 3,
    intro:
      "Héberger un site statique gratuitement depuis un dépôt.",
    blocks: [
      {
        kind: "text",
        text: "GitHub Pages publie un site statique depuis une branche (souvent `gh-pages` ou `main` + dossier `docs`). Idéal pour la documentation, les portfolios, les sites de projet. Avec un workflow Actions, le site se reconstruit à chaque push.",
      },
      {
        kind: "list",
        items: [
          "Domaine `utilisateur.github.io/depot` gratuit, domaine personnalisé possible.",
          "Jekyll intégré par défaut, mais n'importe quel générateur statique fonctionne via Actions.",
          "Limites : sites statiques uniquement, pas de backend — pour du dynamique, une vraie plateforme d'hébergement.",
        ],
      },
    ],
  },
  {
    id: "templates",
    title: "Templates : issues, PR, dépôts",
    level: 3,
    intro:
      "Standardiser les contributions récurrentes avec des modèles.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois templates",
        fields: [
          {
            label: "Issue templates",
            value:
              "Formulaires dans `.github/ISSUE_TEMPLATE/` : bug report, feature request. Guident le rapporteur vers les infos utiles.",
          },
          {
            label: "Pull request template",
            value:
              "`PULL_REQUEST_TEMPLATE.md` : checklist pré-remplie à chaque PR (tests, doc, captures).",
          },
          {
            label: "Template repository",
            value:
              "Dépôt marqué comme modèle : « Use this template » crée un nouveau dépôt avec la même structure (CI, configs, docs).",
          },
        ],
      },
    ],
  },
  {
    id: "contribuer-open-source",
    title: "Contribuer à l'open source",
    level: 3,
    intro:
      "La méthode complète, du repérage à la PR fusionnée.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le projet",
            detail:
              "Un outil qu'on utilise vraiment : la motivation suit l'usage. Les labels `good first issue` et `help wanted` signalent les portes d'entrée.",
          },
          {
            title: "Lire CONTRIBUTING",
            detail:
              "Le fichier CONTRIBUTING.md donne les règles : setup, conventions de commits, processus de PR. L'ignorer est la première cause de PR rejetée.",
          },
          {
            title: "Commencer petit",
            detail:
              "Documentation, typo, petit bug : les premières contributions établissent la confiance avant les refontes.",
          },
          {
            title: "Fork, branche, PR",
            detail:
              "Le flux fork → branche → PR décrit au niveau 2. Décrire clairement le changement et son test.",
          },
          {
            title: "Accepter la revue",
            detail:
              "Les mainteneurs demandent des changements : c'est normal et formateur. Itérer avec courtoisie.",
          },
          {
            title: "Rester après la fusion",
            detail:
              "Suivre les retours, aider les suivants : la contribution durable vaut mieux que la PR unique.",
          },
        ],
      },
    ],
  },
  {
    id: "etiquette",
    title: "Étiquette et gouvernance",
    level: 3,
    intro:
      "Les règles non écrites (et écrites) des projets sains.",
    blocks: [
      {
        kind: "list",
        items: [
          "Code of Conduct : le contrat de bienveillance du projet — le lire avant de participer.",
          "Ne pas ouvrir une PR surprise sur une refonte : en discuter d'abord dans une issue.",
          "Un bug = une issue avec reproduction ; une question = une discussion.",
          "Respecter le rythme des mainteneurs (souvent bénévoles) : relancer poliment après une à deux semaines, pas après deux jours.",
          "Créditer le travail des autres : co-auteurs dans les commits collectifs.",
        ],
      },
    ],
  },
  {
    id: "fork-sync",
    title: "Synchroniser un fork",
    level: 3,
    intro:
      "Garder son fork à jour avec le dépôt d'origine.",
    blocks: [
      {
        kind: "command",
        label: "Synchroniser le fork",
        command: "gh repo sync",
        why: "Met à jour la branche courante du fork depuis le dépôt d'origine, en local comme sur le distant. À faire avant chaque nouvelle contribution pour partir d'une base à jour.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Équivalent en Git pur",
        code: `git remote add upstream https://github.com/origine/depot.git\ngit fetch upstream\ngit switch main\ngit merge upstream/main\ngit push origin main`,
      },
      {
        kind: "text",
        text: "Le distant `upstream` désigne le dépôt d'origine, `origin` votre fork. Ce double distant est le seul concept Git propre au workflow fork — le reste est du Git ordinaire.",
      },
    ],
  },
  {
    id: "wikis",
    title: "Wikis",
    level: 3,
    intro:
      "La documentation vivante du projet, à côté du code.",
    blocks: [
      {
        kind: "text",
        text: "Chaque dépôt peut activer un wiki : des pages Markdown versionnées dans un dépôt Git séparé, modifiables depuis l'interface web. Idéal pour les guides d'installation détaillés, les décisions d'architecture (ADR) et les FAQ qui n'ont pas leur place dans le README.",
      },
      {
        kind: "list",
        items: [
          "Le wiki a son propre historique Git : clonable et versionnable comme du code.",
          "Règle de répartition : README pour l'essentiel (5 minutes), wiki pour le détail.",
          "Restreindre l'édition aux collaborateurs pour éviter le spam sur les projets publics.",
        ],
      },
    ],
  },
  {
    id: "gists",
    title: "Gists",
    level: 3,
    intro:
      "Partager des extraits de code versionnés, sans créer de dépôt.",
    blocks: [
      {
        kind: "text",
        text: "Les gists sont des mini-dépôts pour un ou plusieurs fichiers : chaque gist est un dépôt Git à part entière (historique, forks, clones). Parfaits pour partager un extrait, un script utilitaire ou un exemple dans une issue.",
      },
      {
        kind: "list",
        items: [
          "Gists publics ou secrets (accessibles par URL, non listés) — jamais de données sensibles.",
          "Embarquables dans des pages web via le script d'intégration.",
          "`gh gist create fichier.sh` : créer un gist depuis le terminal.",
        ],
      },
    ],
  },
  {
    id: "code-search",
    title: "Recherche de code",
    level: 3,
    intro:
      "Chercher dans le code de millions de dépôts : apprendre par l'exemple à l'échelle.",
    blocks: [
      {
        kind: "text",
        text: "La recherche de code GitHub indexe le contenu des fichiers : on peut trouver comment une bibliothèque est réellement utilisée, comparer des implémentations, ou vérifier si une fonction est employée quelque part avant de la renommer.",
      },
      {
        kind: "list",
        items: [
          "Qualifieurs : `language:`, `path:`, `repo:`, `org:` pour cibler la recherche.",
          "Recherche d'abord dans ses propres dépôts et dépendances : le contexte connu répond plus vite.",
          "Usage avancé : auditer l'usage d'une API dépréciée dans toute une organisation avant migration.",
        ],
      },
    ],
  },
  {
    id: "github-packages",
    title: "GitHub Packages",
    level: 3,
    intro:
      "Publier des paquets (npm, Docker…) adossés au dépôt.",
    blocks: [
      {
        kind: "text",
        text: "GitHub Packages est le registre de paquets intégré : images Docker, paquets npm, Maven… publiés depuis un workflow Actions et versionnés avec le dépôt. Le contrôle d'accès suit celui du dépôt — un paquet privé reste privé.",
      },
      {
        kind: "list",
        items: [
          "Publication automatique à chaque release via un workflow : le paquet suit le code.",
          "Authentification via token GitHub : pas de compte séparé sur un registre tiers.",
          "Pour l'open source public, les registres communautaires (npmjs, Docker Hub) offrent plus de visibilité.",
        ],
      },
    ],
  },
  {
    id: "dependabot",
    title: "Dependabot",
    level: 3,
    intro:
      "Ne plus subir les dépendances : alertes et mises à jour automatiques.",
    blocks: [
      {
        kind: "text",
        text: "Dependabot surveille les dépendances du dépôt : alertes de sécurité en cas de vulnérabilité connue, et pull requests automatiques pour les mises à jour. C'est la maintenance préventive intégrée à la plateforme.",
      },
      {
        kind: "list",
        items: [
          "Alerts : notifient les vulnérabilités avec leur sévérité — à traiter selon la criticité, pas à ignorer.",
          "Updates : PR automatiques de montée de version, avec la CI qui valide chaque proposition.",
          "Configurer la fréquence et les plages horaires : les PR de dépendances arrivent quand l'équipe peut les relire.",
          "Regrouper les mises à jour mineures : moins de PR, moins de bruit.",
        ],
      },
    ],
  },
  {
    id: "code-scanning",
    title: "Code scanning",
    level: 3,
    intro:
      "L'analyse de sécurité automatique à chaque pull request.",
    blocks: [
      {
        kind: "text",
        text: "Le code scanning analyse le code à la recherche de vulnérabilités (injections, fuites de secrets, mauvaises pratiques crypto) et affiche les résultats comme des annotations dans la PR. Activé par défaut sur les dépôts publics via l'analyse CodeQL.",
      },
      {
        kind: "list",
        items: [
          "Les alertes bloquent la fusion si la protection de branche l'exige : la sécurité devient un check comme les tests.",
          "Trier par sévérité : corriger les critiques d'abord, planifier le reste.",
          "Complément, pas substitut : ne remplace ni la revue humaine ni les tests de pénétration.",
        ],
      },
    ],
  },
  {
    id: "actions-marketplace",
    title: "Marketplace Actions",
    level: 3,
    intro:
      "Réutiliser les actions de la communauté sans réinventer la roue.",
    blocks: [
      {
        kind: "text",
        text: "Le marketplace regroupe des milliers d'actions réutilisables (checkout, setup-node, déploiements, notifications). Épingler une version exacte (`@v4` ou mieux, un SHA) : une action est du code tiers qui s'exécute avec vos secrets.",
      },
      {
        kind: "list",
        items: [
          "Préférer les actions officielles (vérifiées) pour les étapes critiques.",
          "Épingler les versions : `@v4` suit les correctifs, un SHA fige tout — compromis selon la sensibilité.",
          "Auditer avant d'adopter : lire le code de l'action, vérifier sa maintenance.",
          "Créer ses propres actions pour les étapes répétées en interne (composite ou Docker).",
        ],
      },
    ],
  },
  {
    id: "milestones",
    title: "Milestones",
    level: 3,
    intro:
      "Regrouper issues et PR par objectif : suivre une version.",
    blocks: [
      {
        kind: "text",
        text: "Une milestone regroupe les issues et PR d'une version ou d'un jalon, avec une barre de progression automatique. C'est la réponse à « où en est la v2.1 ? » sans réunion de suivi.",
      },
      {
        kind: "list",
        items: [
          "Une milestone = un objectif daté : « v1.2.0 » ou « Beta publique ».",
          "La progression se calcule sur les éléments fermés : le suivi est honnête par construction.",
          "Combiner avec les Projects : la milestone dit le quoi, le tableau dit le qui et le quand.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques, côté plateforme.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Remède"],
        rows: [
          ["`gh` demande un mot de passe", "Token manquant ou expiré", "`gh auth login` pour se ré-authentifier"],
          ["PR impossible à merger : checks rouges", "CI en échec", "Lire les logs du workflow, corriger, repousser"],
          ["Push rejeté sur main", "Branche protégée", "Passer par une branche + PR, comme prévu"],
          ["Fork obsolète, conflits à la PR", "Fork non synchronisé", "`gh repo sync` avant de travailler"],
          ["Secret commité par erreur", "Fichier sensible versionné", "Révoquer le secret immédiatement, nettoyer l'historique"],
          ["PR vide ou sans diff", "Branche créée depuis une base périmée", "Rebaser sur main à jour"],
          ["Notifications noyées", "Watch trop large", "Ajuster : releases only, ou mentions uniquement"],
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets progressifs pour ancrer les réflexes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Dépôt vitrine",
            detail:
              "Créer un dépôt `mon-projet` avec README soigné (installation, usage, captures), `.gitignore` adapté, licence MIT, et un workflow Actions qui vérifie le projet à chaque push. Objectif : les fondamentaux d'un dépôt sérieux.",
          },
          {
            title: "Projet 2 — Collaboration simulée",
            detail:
              "Avec un second compte ou un collaborateur : issues, branches, PR avec review croisée, protection de `main`, merge en squash. Objectif : vivre le cycle complet de contribution.",
          },
          {
            title: "Projet 3 — Contribution open source",
            detail:
              "Choisir un vrai projet, corriger une `good first issue` via fork + PR, itérer sur la review jusqu'à la fusion. Objectif : la contribution réelle, avec ses codes et son rythme.",
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
            label: "GitHub Docs",
            value:
              "docs.github.com : la référence complète, des premiers pas aux Actions avancées, en français.",
          },
          {
            label: "GitHub Skills",
            value:
              "Les parcours interactifs officiels : on apprend en manipulant de vrais dépôts.",
          },
          {
            label: "gh manual",
            value:
              "`gh help` et les pages de manuel de chaque commande : la doc exacte de la version installée.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : contribuer à de petits projets open source reste le meilleur exercice.",
          "Veille : le changelog GitHub et les discussions de la communauté pour suivre les nouveautés.",
          "Complément : la compétence `git` pour le versionnage local, `github-actions` pour la CI/CD poussée.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "GitHub maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Consolider la base : `git` pour le versionnage local avancé (rebase, historique, dépannage).",
          "Industrialiser : `github-actions` puis `ci-cd` pour des pipelines complets.",
          "Comparer : `gitlab-ci` pour le pendant GitLab des pipelines.",
          "Sécuriser : durcir les dépôts (secrets, dépendances, branches protégées) en routine d'équipe.",
          "Revenir à la roadmap : valider GitHub et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];
